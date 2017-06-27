(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        return new Notification('N', value);
    };

    Notification.createError = function createError(err) {
        return new Notification('E', undefined, err);
    };

    Notification.createComplete = function createComplete() {
        return new Notification('C');
    };

    return Notification;
})();

exports['default'] = Notification;
module.exports = exports['default'];
},{"./Observable":2}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

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
     * of a succesful completion.
     */

    function Observable(subscribe) {
        _classCallCheck(this, Observable);

        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }

    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature.
    /**
     * @static
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @returns {Observable} a new cold observable
     * @description creates a new cold Observable by calling the Observable constructor
     */

    /**
     * @method lift
     * @param {Operator} the operator defining the operation to take on the observable
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
     * @returns {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */

    Observable.prototype.forEach = function forEach(next) {
        var _this = this;

        return new Promise(function (resolve, reject) {
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
},{"./Subscriber":5,"./util/Symbol_observable":116}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Subject = require('./Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _schedulersVirtualTimeScheduler = require('./schedulers/VirtualTimeScheduler');

var _schedulersVirtualTimeScheduler2 = _interopRequireDefault(_schedulersVirtualTimeScheduler);

var _schedulersTestScheduler = require('./schedulers/TestScheduler');

var _schedulersTestScheduler2 = _interopRequireDefault(_schedulersTestScheduler);

var _schedulersImmediate = require('./schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var _schedulersNextTick = require('./schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

var _Observable = require('./Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _subjectsReplaySubject = require('./subjects/ReplaySubject');

var _subjectsReplaySubject2 = _interopRequireDefault(_subjectsReplaySubject);

var _subjectsBehaviorSubject = require('./subjects/BehaviorSubject');

var _subjectsBehaviorSubject2 = _interopRequireDefault(_subjectsBehaviorSubject);

var _observablesConnectableObservable = require('./observables/ConnectableObservable');

var _observablesConnectableObservable2 = _interopRequireDefault(_observablesConnectableObservable);

var _observablesArrayObservable = require('./observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _observablesDeferObservable = require('./observables/DeferObservable');

var _observablesDeferObservable2 = _interopRequireDefault(_observablesDeferObservable);

var _observablesEmptyObservable = require('./observables/EmptyObservable');

var _observablesEmptyObservable2 = _interopRequireDefault(_observablesEmptyObservable);

var _observablesErrorObservable = require('./observables/ErrorObservable');

var _observablesErrorObservable2 = _interopRequireDefault(_observablesErrorObservable);

var _observablesInfiniteObservable = require('./observables/InfiniteObservable');

var _observablesInfiniteObservable2 = _interopRequireDefault(_observablesInfiniteObservable);

var _observablesIntervalObservable = require('./observables/IntervalObservable');

var _observablesIntervalObservable2 = _interopRequireDefault(_observablesIntervalObservable);

var _observablesPromiseObservable = require('./observables/PromiseObservable');

var _observablesPromiseObservable2 = _interopRequireDefault(_observablesPromiseObservable);

var _observablesRangeObservable = require('./observables/RangeObservable');

var _observablesRangeObservable2 = _interopRequireDefault(_observablesRangeObservable);

var _observablesTimerObservable = require('./observables/TimerObservable');

var _observablesTimerObservable2 = _interopRequireDefault(_observablesTimerObservable);

var _observablesFromEventPatternObservable = require('./observables/FromEventPatternObservable');

var _observablesFromEventPatternObservable2 = _interopRequireDefault(_observablesFromEventPatternObservable);

var _observablesFromEventObservable = require('./observables/FromEventObservable');

var _observablesFromEventObservable2 = _interopRequireDefault(_observablesFromEventObservable);

var _observablesForkJoinObservable = require('./observables/ForkJoinObservable');

var _observablesForkJoinObservable2 = _interopRequireDefault(_observablesForkJoinObservable);

var _observablesFromObservable = require('./observables/FromObservable');

var _observablesFromObservable2 = _interopRequireDefault(_observablesFromObservable);

var _operatorsConcatStatic = require('./operators/concat-static');

var _operatorsConcatStatic2 = _interopRequireDefault(_operatorsConcatStatic);

var _operatorsConcat = require('./operators/concat');

var _operatorsConcat2 = _interopRequireDefault(_operatorsConcat);

var _operatorsConcatAll = require('./operators/concatAll');

var _operatorsConcatAll2 = _interopRequireDefault(_operatorsConcatAll);

var _operatorsConcatMap = require('./operators/concatMap');

var _operatorsConcatMap2 = _interopRequireDefault(_operatorsConcatMap);

var _operatorsConcatMapTo = require('./operators/concatMapTo');

var _operatorsConcatMapTo2 = _interopRequireDefault(_operatorsConcatMapTo);

var _operatorsMerge = require('./operators/merge');

var _operatorsMerge2 = _interopRequireDefault(_operatorsMerge);

var _operatorsMergeStatic = require('./operators/merge-static');

var _operatorsMergeStatic2 = _interopRequireDefault(_operatorsMergeStatic);

var _operatorsMergeAll = require('./operators/mergeAll');

var _operatorsMergeAll2 = _interopRequireDefault(_operatorsMergeAll);

var _operatorsFlatMap = require('./operators/flatMap');

var _operatorsFlatMap2 = _interopRequireDefault(_operatorsFlatMap);

var _operatorsFlatMapTo = require('./operators/flatMapTo');

var _operatorsFlatMapTo2 = _interopRequireDefault(_operatorsFlatMapTo);

var _operatorsSwitchAll = require('./operators/switchAll');

var _operatorsSwitchAll2 = _interopRequireDefault(_operatorsSwitchAll);

var _operatorsSwitchLatest = require('./operators/switchLatest');

var _operatorsSwitchLatest2 = _interopRequireDefault(_operatorsSwitchLatest);

var _operatorsSwitchLatestTo = require('./operators/switchLatestTo');

var _operatorsSwitchLatestTo2 = _interopRequireDefault(_operatorsSwitchLatestTo);

var _operatorsExpand = require('./operators/expand');

var _operatorsExpand2 = _interopRequireDefault(_operatorsExpand);

var _operatorsDo = require('./operators/do');

var _operatorsDo2 = _interopRequireDefault(_operatorsDo);

var _operatorsMap = require('./operators/map');

var _operatorsMap2 = _interopRequireDefault(_operatorsMap);

var _operatorsMapTo = require('./operators/mapTo');

var _operatorsMapTo2 = _interopRequireDefault(_operatorsMapTo);

var _operatorsToArray = require('./operators/toArray');

var _operatorsToArray2 = _interopRequireDefault(_operatorsToArray);

var _operatorsCount = require('./operators/count');

var _operatorsCount2 = _interopRequireDefault(_operatorsCount);

var _operatorsScan = require('./operators/scan');

var _operatorsScan2 = _interopRequireDefault(_operatorsScan);

var _operatorsReduce = require('./operators/reduce');

var _operatorsReduce2 = _interopRequireDefault(_operatorsReduce);

var _operatorsStartWith = require('./operators/startWith');

var _operatorsStartWith2 = _interopRequireDefault(_operatorsStartWith);

var _operatorsTake = require('./operators/take');

var _operatorsTake2 = _interopRequireDefault(_operatorsTake);

var _operatorsSkip = require('./operators/skip');

var _operatorsSkip2 = _interopRequireDefault(_operatorsSkip);

var _operatorsSkipUntil = require('./operators/skipUntil');

var _operatorsSkipUntil2 = _interopRequireDefault(_operatorsSkipUntil);

var _operatorsTakeUntil = require('./operators/takeUntil');

var _operatorsTakeUntil2 = _interopRequireDefault(_operatorsTakeUntil);

var _operatorsFilter = require('./operators/filter');

var _operatorsFilter2 = _interopRequireDefault(_operatorsFilter);

var _operatorsDistinctUntilChanged = require('./operators/distinctUntilChanged');

var _operatorsDistinctUntilChanged2 = _interopRequireDefault(_operatorsDistinctUntilChanged);

var _operatorsDistinctUntilKeyChanged = require('./operators/distinctUntilKeyChanged');

var _operatorsDistinctUntilKeyChanged2 = _interopRequireDefault(_operatorsDistinctUntilKeyChanged);

var _operatorsCombineLatest = require('./operators/combineLatest');

var _operatorsCombineLatest2 = _interopRequireDefault(_operatorsCombineLatest);

var _operatorsCombineLatestStatic = require('./operators/combineLatest-static');

var _operatorsCombineLatestStatic2 = _interopRequireDefault(_operatorsCombineLatestStatic);

var _operatorsCombineAll = require('./operators/combineAll');

var _operatorsCombineAll2 = _interopRequireDefault(_operatorsCombineAll);

var _operatorsWithLatestFrom = require('./operators/withLatestFrom');

var _operatorsWithLatestFrom2 = _interopRequireDefault(_operatorsWithLatestFrom);

var _operatorsZip = require('./operators/zip');

var _operatorsZip2 = _interopRequireDefault(_operatorsZip);

var _operatorsZipStatic = require('./operators/zip-static');

var _operatorsZipStatic2 = _interopRequireDefault(_operatorsZipStatic);

var _operatorsZipAll = require('./operators/zipAll');

var _operatorsZipAll2 = _interopRequireDefault(_operatorsZipAll);

var _operatorsPublish = require('./operators/publish');

var _operatorsPublish2 = _interopRequireDefault(_operatorsPublish);

var _operatorsPublishBehavior = require('./operators/publishBehavior');

var _operatorsPublishBehavior2 = _interopRequireDefault(_operatorsPublishBehavior);

var _operatorsPublishReplay = require('./operators/publishReplay');

var _operatorsPublishReplay2 = _interopRequireDefault(_operatorsPublishReplay);

var _operatorsMulticast = require('./operators/multicast');

var _operatorsMulticast2 = _interopRequireDefault(_operatorsMulticast);

var _operatorsObserveOn = require('./operators/observeOn');

var _operatorsObserveOn2 = _interopRequireDefault(_operatorsObserveOn);

var _operatorsSubscribeOn = require('./operators/subscribeOn');

var _operatorsSubscribeOn2 = _interopRequireDefault(_operatorsSubscribeOn);

var _operatorsPartition = require('./operators/partition');

var _operatorsPartition2 = _interopRequireDefault(_operatorsPartition);

var _operatorsToPromise = require('./operators/toPromise');

var _operatorsToPromise2 = _interopRequireDefault(_operatorsToPromise);

var _operatorsDefaultIfEmpty = require('./operators/defaultIfEmpty');

var _operatorsDefaultIfEmpty2 = _interopRequireDefault(_operatorsDefaultIfEmpty);

var _operatorsMaterialize = require('./operators/materialize');

var _operatorsMaterialize2 = _interopRequireDefault(_operatorsMaterialize);

var _operatorsCatch = require('./operators/catch');

var _operatorsCatch2 = _interopRequireDefault(_operatorsCatch);

var _operatorsRetry = require('./operators/retry');

var _operatorsRetry2 = _interopRequireDefault(_operatorsRetry);

var _operatorsRetryWhen = require('./operators/retryWhen');

var _operatorsRetryWhen2 = _interopRequireDefault(_operatorsRetryWhen);

var _operatorsRepeat = require('./operators/repeat');

var _operatorsRepeat2 = _interopRequireDefault(_operatorsRepeat);

var _operatorsFinally = require('./operators/finally');

var _operatorsFinally2 = _interopRequireDefault(_operatorsFinally);

var _operatorsTimeout = require('./operators/timeout');

var _operatorsTimeout2 = _interopRequireDefault(_operatorsTimeout);

var _operatorsTimeoutWith = require('./operators/timeoutWith');

var _operatorsTimeoutWith2 = _interopRequireDefault(_operatorsTimeoutWith);

var _operatorsGroupBy = require('./operators/groupBy');

var _operatorsGroupBy2 = _interopRequireDefault(_operatorsGroupBy);

var _operatorsWindow = require('./operators/window');

var _operatorsWindow2 = _interopRequireDefault(_operatorsWindow);

var _operatorsWindowWhen = require('./operators/windowWhen');

var _operatorsWindowWhen2 = _interopRequireDefault(_operatorsWindowWhen);

var _operatorsWindowToggle = require('./operators/windowToggle');

var _operatorsWindowToggle2 = _interopRequireDefault(_operatorsWindowToggle);

var _operatorsWindowTime = require('./operators/windowTime');

var _operatorsWindowTime2 = _interopRequireDefault(_operatorsWindowTime);

var _operatorsWindowCount = require('./operators/windowCount');

var _operatorsWindowCount2 = _interopRequireDefault(_operatorsWindowCount);

var _operatorsDelay = require('./operators/delay');

var _operatorsDelay2 = _interopRequireDefault(_operatorsDelay);

var _operatorsThrottle = require('./operators/throttle');

var _operatorsThrottle2 = _interopRequireDefault(_operatorsThrottle);

var _operatorsDebounce = require('./operators/debounce');

var _operatorsDebounce2 = _interopRequireDefault(_operatorsDebounce);

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

var _operatorsSample = require('./operators/sample');

var _operatorsSample2 = _interopRequireDefault(_operatorsSample);

var _operatorsSampleTime = require('./operators/sampleTime');

var _operatorsSampleTime2 = _interopRequireDefault(_operatorsSampleTime);

_Observable2['default'].defer = _observablesDeferObservable2['default'].create;
_Observable2['default'].from = _observablesFromObservable2['default'].create;
_Observable2['default'].fromArray = _observablesArrayObservable2['default'].create;
_Observable2['default'].fromPromise = _observablesPromiseObservable2['default'].create;
_Observable2['default'].of = _observablesArrayObservable2['default'].of;
_Observable2['default'].range = _observablesRangeObservable2['default'].create;
_Observable2['default'].fromEventPattern = _observablesFromEventPatternObservable2['default'].create;
_Observable2['default'].forkJoin = _observablesForkJoinObservable2['default'].create;
_Observable2['default']['throw'] = _observablesErrorObservable2['default'].create;
_Observable2['default'].empty = _observablesEmptyObservable2['default'].create;
_Observable2['default'].never = _observablesInfiniteObservable2['default'].create;
_Observable2['default'].timer = _observablesTimerObservable2['default'].create;
_Observable2['default'].interval = _observablesIntervalObservable2['default'].create;
_Observable2['default'].fromEvent = _observablesFromEventObservable2['default'].create;
var observableProto = _Observable2['default'].prototype;

_Observable2['default'].concat = _operatorsConcatStatic2['default'];
observableProto.concat = _operatorsConcat2['default'];
observableProto.concatAll = _operatorsConcatAll2['default'];
observableProto.concatMap = _operatorsConcatMap2['default'];
observableProto.concatMapTo = _operatorsConcatMapTo2['default'];

_Observable2['default'].merge = _operatorsMergeStatic2['default'];
observableProto.merge = _operatorsMerge2['default'];
observableProto.mergeAll = _operatorsMergeAll2['default'];
observableProto.flatMap = _operatorsFlatMap2['default'];
observableProto.flatMapTo = _operatorsFlatMapTo2['default'];
observableProto.switchAll = _operatorsSwitchAll2['default'];
observableProto.switchLatest = _operatorsSwitchLatest2['default'];
observableProto.switchLatestTo = _operatorsSwitchLatestTo2['default'];
observableProto.expand = _operatorsExpand2['default'];

observableProto['do'] = _operatorsDo2['default'];
observableProto.map = _operatorsMap2['default'];
observableProto.mapTo = _operatorsMapTo2['default'];
observableProto.toArray = _operatorsToArray2['default'];
observableProto.count = _operatorsCount2['default'];
observableProto.scan = _operatorsScan2['default'];
observableProto.reduce = _operatorsReduce2['default'];
observableProto.startWith = _operatorsStartWith2['default'];

observableProto.take = _operatorsTake2['default'];
observableProto.skip = _operatorsSkip2['default'];
observableProto.takeUntil = _operatorsTakeUntil2['default'];
observableProto.skipUntil = _operatorsSkipUntil2['default'];
observableProto.filter = _operatorsFilter2['default'];
observableProto.distinctUntilChanged = _operatorsDistinctUntilChanged2['default'];
observableProto.distinctUntilKeyChanged = _operatorsDistinctUntilKeyChanged2['default'];

_Observable2['default'].combineLatest = _operatorsCombineLatestStatic2['default'];
observableProto.combineLatest = _operatorsCombineLatest2['default'];
observableProto.combineAll = _operatorsCombineAll2['default'];
observableProto.withLatestFrom = _operatorsWithLatestFrom2['default'];

_Observable2['default'].zip = _operatorsZipStatic2['default'];
observableProto.zip = _operatorsZip2['default'];
observableProto.zipAll = _operatorsZipAll2['default'];

observableProto.publish = _operatorsPublish2['default'];
observableProto.publishBehavior = _operatorsPublishBehavior2['default'];
observableProto.publishReplay = _operatorsPublishReplay2['default'];
observableProto.multicast = _operatorsMulticast2['default'];

observableProto.observeOn = _operatorsObserveOn2['default'];
observableProto.subscribeOn = _operatorsSubscribeOn2['default'];

observableProto.partition = _operatorsPartition2['default'];
observableProto.toPromise = _operatorsToPromise2['default'];
observableProto.defaultIfEmpty = _operatorsDefaultIfEmpty2['default'];
observableProto.materialize = _operatorsMaterialize2['default'];

observableProto['catch'] = _operatorsCatch2['default'];
observableProto.retry = _operatorsRetry2['default'];
observableProto.retryWhen = _operatorsRetryWhen2['default'];
observableProto.repeat = _operatorsRepeat2['default'];

observableProto['finally'] = _operatorsFinally2['default'];
observableProto.timeout = _operatorsTimeout2['default'];
observableProto.timeoutWith = _operatorsTimeoutWith2['default'];

observableProto.groupBy = _operatorsGroupBy2['default'];
observableProto.window = _operatorsWindow2['default'];
observableProto.windowWhen = _operatorsWindowWhen2['default'];
observableProto.windowToggle = _operatorsWindowToggle2['default'];
observableProto.windowTime = _operatorsWindowTime2['default'];
observableProto.windowCount = _operatorsWindowCount2['default'];

observableProto.delay = _operatorsDelay2['default'];
observableProto.throttle = _operatorsThrottle2['default'];
observableProto.debounce = _operatorsDebounce2['default'];

observableProto.buffer = _operatorsBuffer2['default'];
observableProto.bufferCount = _operatorsBufferCount2['default'];
observableProto.bufferTime = _operatorsBufferTime2['default'];
observableProto.bufferToggle = _operatorsBufferToggle2['default'];
observableProto.bufferWhen = _operatorsBufferWhen2['default'];

observableProto.sample = _operatorsSample2['default'];
observableProto.sampleTime = _operatorsSampleTime2['default'];
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
exports.VirtualTimeScheduler = _schedulersVirtualTimeScheduler2['default'];
exports.TestScheduler = _schedulersTestScheduler2['default'];
},{"./Notification":1,"./Observable":2,"./Subject":4,"./Subscriber":5,"./Subscription":6,"./observables/ArrayObservable":7,"./observables/ConnectableObservable":8,"./observables/DeferObservable":9,"./observables/EmptyObservable":10,"./observables/ErrorObservable":11,"./observables/ForkJoinObservable":12,"./observables/FromEventObservable":13,"./observables/FromEventPatternObservable":14,"./observables/FromObservable":15,"./observables/InfiniteObservable":16,"./observables/IntervalObservable":17,"./observables/PromiseObservable":19,"./observables/RangeObservable":20,"./observables/TimerObservable":23,"./operators/buffer":24,"./operators/bufferCount":25,"./operators/bufferTime":26,"./operators/bufferToggle":27,"./operators/bufferWhen":28,"./operators/catch":29,"./operators/combineAll":30,"./operators/combineLatest":33,"./operators/combineLatest-static":31,"./operators/concat":35,"./operators/concat-static":34,"./operators/concatAll":36,"./operators/concatMap":37,"./operators/concatMapTo":38,"./operators/count":39,"./operators/debounce":40,"./operators/defaultIfEmpty":41,"./operators/delay":42,"./operators/distinctUntilChanged":43,"./operators/distinctUntilKeyChanged":44,"./operators/do":45,"./operators/expand":46,"./operators/filter":47,"./operators/finally":48,"./operators/flatMap":50,"./operators/flatMapTo":52,"./operators/groupBy":53,"./operators/map":54,"./operators/mapTo":55,"./operators/materialize":56,"./operators/merge":59,"./operators/merge-static":57,"./operators/mergeAll":60,"./operators/multicast":61,"./operators/observeOn":63,"./operators/partition":64,"./operators/publish":65,"./operators/publishBehavior":66,"./operators/publishReplay":67,"./operators/reduce":68,"./operators/repeat":69,"./operators/retry":70,"./operators/retryWhen":71,"./operators/sample":72,"./operators/sampleTime":73,"./operators/scan":74,"./operators/skip":75,"./operators/skipUntil":76,"./operators/startWith":77,"./operators/subscribeOn":78,"./operators/switchAll":79,"./operators/switchLatest":80,"./operators/switchLatestTo":81,"./operators/take":82,"./operators/takeUntil":83,"./operators/throttle":84,"./operators/timeout":85,"./operators/timeoutWith":86,"./operators/toArray":87,"./operators/toPromise":88,"./operators/window":89,"./operators/windowCount":90,"./operators/windowTime":91,"./operators/windowToggle":92,"./operators/windowWhen":93,"./operators/withLatestFrom":94,"./operators/zip":97,"./operators/zip-static":95,"./operators/zipAll":98,"./schedulers/TestScheduler":104,"./schedulers/VirtualTimeScheduler":105,"./schedulers/immediate":106,"./schedulers/nextTick":107,"./subjects/BehaviorSubject":108,"./subjects/ReplaySubject":110}],4:[function(require,module,exports){
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
var _observableSubscribe = _Observable3['default'].prototype._subscribe;

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
        return _observableSubscribe.call(this, subscriber);
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
},{"./Observable":2,"./Subscriber":5,"./Subscription":6,"./subjects/SubjectSubscription":111}],5:[function(require,module,exports){
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
},{"./Subscription":6,"./util/noop":121,"./util/throwError":124,"./util/tryOrOnError":126}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
    }

    ArrayObservable.create = function create(array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };

    ArrayObservable.of = function of() {
        for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
            array[_key] = arguments[_key];
        }

        var scheduler = array[array.length - 1];
        if (scheduler && typeof scheduler.schedule === "function") {
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
            do {
                if (index >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(array[index++]);
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    };

    return ArrayObservable;
})(_Observable3['default']);

exports['default'] = ArrayObservable;
module.exports = exports['default'];
},{"../Observable":2,"./EmptyObservable":10,"./ScalarObservable":21}],8:[function(require,module,exports){
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
},{"../Observable":2,"../Subscription":6}],9:[function(require,module,exports){
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
},{"../Observable":2,"../util/errorObject":118,"../util/tryCatch":125}],10:[function(require,module,exports){
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
},{"../Observable":2}],11:[function(require,module,exports){
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
},{"../Observable":2}],12:[function(require,module,exports){
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
},{"../Observable":2,"../Subscriber":5}],13:[function(require,module,exports){
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
},{"../Observable":2,"../Subscription":6,"../util/errorObject":118,"../util/tryCatch":125}],14:[function(require,module,exports){
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
        ;
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
},{"../Observable":2,"../Subscription":6,"../util/errorObject":118,"../util/tryCatch":125}],15:[function(require,module,exports){
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
},{"../Observable":2,"../operators/observeOn-support":62,"../schedulers/immediate":106,"../util/Symbol_iterator":115,"../util/Symbol_observable":116,"./ArrayObservable":7,"./IteratorObservable":18,"./PromiseObservable":19}],16:[function(require,module,exports){
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
},{"../Observable":2}],17:[function(require,module,exports){
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
        if (!scheduler || typeof scheduler.schedule !== "function") {
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
},{"../Observable":2,"../schedulers/nextTick":107,"../util/isNumeric":120}],18:[function(require,module,exports){
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
        if (project && typeof project !== "function") {
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
},{"../Observable":2,"../util/Symbol_iterator":115,"../util/errorObject":118,"../util/root":123,"../util/tryCatch":125}],19:[function(require,module,exports){
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
},{"../Observable":2,"../Subscription":6,"../schedulers/immediate":106}],20:[function(require,module,exports){
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
},{"../Observable":2}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('../Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var ScalarObservable = (function (_Observable) {
    _inherits(ScalarObservable, _Observable);

    function ScalarObservable(value, scheduler) {
        _classCallCheck(this, ScalarObservable);

        _Observable.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
    }

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
module.exports = exports['default'];
},{"../Observable":2}],22:[function(require,module,exports){
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
},{"../Observable":2,"../schedulers/nextTick":107}],23:[function(require,module,exports){
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
        } else if (period && typeof period.schedule === "function") {
            scheduler = period;
        }
        if (!scheduler || typeof scheduler.schedule !== "function") {
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
        if (typeof period === "undefined") {
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
},{"../Observable":2,"../schedulers/nextTick":107,"../util/isNumeric":120}],24:[function(require,module,exports){
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
        this.flushBuffer();
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
        // noop
    };

    return BufferClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":5}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bufferCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

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
},{"../Subscriber":5}],26:[function(require,module,exports){
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
            this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: this, buffer: buffer }));
            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler }));
        } else {
            this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, { subscriber: this, buffer: buffer, bufferTimeSpan: bufferTimeSpan }));
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
    this.schedule(state, state.bufferTimeSpan);
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval;
    var bufferTimeSpan = state.bufferTimeSpan;
    var subscriber = state.subscriber;
    var scheduler = state.scheduler;

    var buffer = subscriber.openBuffer();
    var action = this;
    action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
    action.schedule(state, bufferCreationInterval);
}
function dispatchBufferClose(_ref) {
    var subscriber = _ref.subscriber;
    var buffer = _ref.buffer;

    subscriber.closeBuffer(buffer);
}
module.exports = exports['default'];
},{"../Subscriber":5,"../schedulers/nextTick":107}],27:[function(require,module,exports){
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
            this.add(context.subscription.add(closingNotifier._subscribe(new BufferClosingNotifierSubscriber(this, context))));
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
},{"../Subscriber":5,"../Subscription":6,"../util/errorObject":118,"../util/tryCatch":125}],28:[function(require,module,exports){
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
        // noop
    };

    return BufferClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],29:[function(require,module,exports){
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
},{"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineAll;

var _combineLatestSupport = require('./combineLatest-support');

function combineAll(project) {
    return this.lift(new _combineLatestSupport.CombineLatestOperator(project));
}

module.exports = exports['default'];
},{"./combineLatest-support":32}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineLatest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _combineLatestSupport = require('./combineLatest-support');

function combineLatest() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var project = observables[observables.length - 1];
    if (typeof project === "function") {
        observables.pop();
    }
    return new _observablesArrayObservable2['default'](observables).lift(new _combineLatestSupport.CombineLatestOperator(project));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":7,"./combineLatest-support":32}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.combineLatest = combineLatest;
exports.combineLatestProto = combineLatestProto;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _zipSupport = require('./zip-support');

function combineLatest() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var project = observables[observables.length - 1];
    if (typeof project === "function") {
        observables.pop();
    }
    return new _observablesArrayObservable2['default'](observables).lift(new CombineLatestOperator(project));
}

function combineLatestProto() {
    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        observables[_key2] = arguments[_key2];
    }

    var project = observables[observables.length - 1];
    if (typeof project === "function") {
        observables.pop();
    }
    observables.unshift(this);
    return new _observablesArrayObservable2['default'](observables).lift(new CombineLatestOperator(project));
}

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

var CombineLatestSubscriber = (function (_ZipSubscriber) {
    _inherits(CombineLatestSubscriber, _ZipSubscriber);

    function CombineLatestSubscriber(destination, project) {
        _classCallCheck(this, CombineLatestSubscriber);

        _ZipSubscriber.call(this, destination, project, []);
        this.limit = 0;
    }

    CombineLatestSubscriber.prototype._subscribeInner = function _subscribeInner(observable, values, index, total) {
        return observable._subscribe(new CombineLatestInnerSubscriber(this.destination, this, values, index, total));
    };

    CombineLatestSubscriber.prototype._innerComplete = function _innerComplete(innerSubscriber) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };

    return CombineLatestSubscriber;
})(_zipSupport.ZipSubscriber);

exports.CombineLatestSubscriber = CombineLatestSubscriber;

var CombineLatestInnerSubscriber = (function (_ZipInnerSubscriber) {
    _inherits(CombineLatestInnerSubscriber, _ZipInnerSubscriber);

    function CombineLatestInnerSubscriber(destination, parent, values, index, total) {
        _classCallCheck(this, CombineLatestInnerSubscriber);

        _ZipInnerSubscriber.call(this, destination, parent, values, index, total);
    }

    CombineLatestInnerSubscriber.prototype._next = function _next(x) {
        var index = this.index;
        var total = this.total;
        var parent = this.parent;
        var values = this.values;
        var valueBox = values[index];
        var limit = undefined;
        if (valueBox) {
            valueBox[0] = x;
            limit = parent.limit;
        } else {
            limit = parent.limit += 1;
            values[index] = [x];
        }
        if (limit >= total) {
            this._projectNext(values, parent.project);
        }
    };

    return CombineLatestInnerSubscriber;
})(_zipSupport.ZipInnerSubscriber);

exports.CombineLatestInnerSubscriber = CombineLatestInnerSubscriber;
},{"../observables/ArrayObservable":7,"./zip-support":96}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineLatest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _combineLatestSupport = require('./combineLatest-support');

function combineLatest() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var project = observables[observables.length - 1];
    if (typeof project === "function") {
        observables.pop();
    }
    observables.unshift(this);
    return new _observablesArrayObservable2['default'](observables).lift(new _combineLatestSupport.CombineLatestOperator(project));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":7,"./combineLatest-support":32}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concat;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mergeStatic = require('./merge-static');

var _mergeStatic2 = _interopRequireDefault(_mergeStatic);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

function concat() {
    var scheduler = _schedulersImmediate2['default'];

    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var len = observables.length;
    if (typeof observables[observables.length - 1].schedule === 'function') {
        scheduler = observables.pop();
        observables.push(1, scheduler);
    }
    return _mergeStatic2['default'].apply(this, observables);
}

module.exports = exports['default'];
},{"../schedulers/immediate":106,"./merge-static":57}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatProto;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mergeStatic = require('./merge-static');

var _mergeStatic2 = _interopRequireDefault(_mergeStatic);

function concatProto() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    observables.unshift(this);
    observables.push(1);
    return _mergeStatic2['default'].apply(this, observables);
}

module.exports = exports['default'];
},{"./merge-static":57}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatAll;

var _mergeSupport = require('./merge-support');

function concatAll() {
    return this.lift(new _mergeSupport.MergeOperator(1));
}

module.exports = exports['default'];
},{"./merge-support":58}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatMap;

var _flatMapSupport = require('./flatMap-support');

function concatMap(project, projectResult) {
    return this.lift(new _flatMapSupport.FlatMapOperator(project, projectResult, 1));
}

module.exports = exports['default'];
},{"./flatMap-support":49}],38:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = concatMapTo;

var _flatMapToSupport = require('./flatMapTo-support');

function concatMapTo(observable, projectResult) {
    return this.lift(new _flatMapToSupport.FlatMapToOperator(observable, projectResult, 1));
}

module.exports = exports['default'];
},{"./flatMapTo-support":51}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = count;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

function count() {
    return this.lift(new CountOperator());
}

var CountOperator = (function () {
    function CountOperator() {
        _classCallCheck(this, CountOperator);
    }

    CountOperator.prototype.call = function call(subscriber) {
        return new CountSubscriber(subscriber);
    };

    return CountOperator;
})();

var CountSubscriber = (function (_Subscriber) {
    _inherits(CountSubscriber, _Subscriber);

    function CountSubscriber(destination) {
        _classCallCheck(this, CountSubscriber);

        _Subscriber.call(this, destination);
        this.count = 0;
    }

    CountSubscriber.prototype._next = function _next(x) {
        this.count += 1;
    };

    CountSubscriber.prototype._complete = function _complete() {
        this.destination.next(this.count);
        this.destination.complete();
    };

    return CountSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subscriber":5}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = debounce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersNextTick = require('../schedulers/nextTick');

var _schedulersNextTick2 = _interopRequireDefault(_schedulersNextTick);

function debounce(dueTime) {
    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _schedulersNextTick2['default'] : arguments[1];

    return this.lift(new DebounceOperator(dueTime, scheduler));
}

var DebounceOperator = (function () {
    function DebounceOperator(dueTime, scheduler) {
        _classCallCheck(this, DebounceOperator);

        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }

    DebounceOperator.prototype.call = function call(subscriber) {
        return new DebounceSubscriber(subscriber, this.dueTime, this.scheduler);
    };

    return DebounceOperator;
})();

var DebounceSubscriber = (function (_Subscriber) {
    _inherits(DebounceSubscriber, _Subscriber);

    function DebounceSubscriber(destination, dueTime, scheduler) {
        _classCallCheck(this, DebounceSubscriber);

        _Subscriber.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }

    DebounceSubscriber.prototype._next = function _next(value) {
        if (!this.debounced) {
            this.add(this.debounced = this.scheduler.schedule(dispatchNext, this.dueTime, { value: value, subscriber: this }));
        }
    };

    DebounceSubscriber.prototype.clearDebounce = function clearDebounce() {
        var debounced = this.debounced;
        if (debounced) {
            debounced.unsubscribe();
            this.remove(debounced);
        }
    };

    DebounceSubscriber.prototype.debouncedNext = function debouncedNext(value) {
        this.clearDebounce();
        this.destination.next(value);
    };

    return DebounceSubscriber;
})(_Subscriber3['default']);

function dispatchNext(_ref) {
    var value = _ref.value;
    var subscriber = _ref.subscriber;

    subscriber.debouncedNext(value);
}
module.exports = exports['default'];
},{"../Subscriber":5,"../schedulers/nextTick":107}],41:[function(require,module,exports){
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
},{"../Subscriber":5}],42:[function(require,module,exports){
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
},{"../Notification":1,"../Subscriber":5,"../schedulers/immediate":106}],43:[function(require,module,exports){
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
        if (typeof compare === "function") {
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
},{"../Subscriber":5,"../util/bindCallback":117,"../util/errorObject":118,"../util/tryCatch":125}],44:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = distinctUntilKeyChanged;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _distinctUntilChanged = require('./distinctUntilChanged');

var _distinctUntilChanged2 = _interopRequireDefault(_distinctUntilChanged);

function distinctUntilKeyChanged(key, compare, thisArg) {
    return _distinctUntilChanged2['default'].call(this, function (x, y) {
        if (compare) {
            return compare.call(thisArg, x[key], y[key]);
        }
        return x[key] === y[key];
    });
}

module.exports = exports['default'];
},{"./distinctUntilChanged":43}],45:[function(require,module,exports){
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

function _do(next, error, complete) {
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
},{"../Subscriber":5,"../util/errorObject":118,"../util/noop":121,"../util/tryCatch":125}],46:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = expand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mergeSupport = require('./merge-support');

var _observablesEmptyObservable = require('../observables/EmptyObservable');

var _observablesEmptyObservable2 = _interopRequireDefault(_observablesEmptyObservable);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function expand(project) {
    return this.lift(new ExpandOperator(project));
}

var ExpandOperator = (function () {
    function ExpandOperator(project) {
        _classCallCheck(this, ExpandOperator);

        this.project = project;
    }

    ExpandOperator.prototype.call = function call(subscriber) {
        return new ExpandSubscriber(subscriber, this.project);
    };

    return ExpandOperator;
})();

var ExpandSubscriber = (function (_MergeSubscriber) {
    _inherits(ExpandSubscriber, _MergeSubscriber);

    function ExpandSubscriber(destination, project) {
        _classCallCheck(this, ExpandSubscriber);

        _MergeSubscriber.call(this, destination, Number.POSITIVE_INFINITY);
        this.project = project;
    }

    ExpandSubscriber.prototype._project = function _project(value, index) {
        var observable = _utilTryCatch2['default'](this.project).call(this, value, index);
        if (observable === _utilErrorObject.errorObject) {
            this.error(_utilErrorObject.errorObject.e);
            return null;
        }
        return observable;
    };

    ExpandSubscriber.prototype._subscribeInner = function _subscribeInner(observable, value, index) {
        if (observable._isScalar) {
            this.destination.next(observable.value);
            this._innerComplete();
            this._next(observable.value);
        } else if (observable instanceof _observablesEmptyObservable2['default']) {
            this._innerComplete();
        } else {
            return observable._subscribe(new ExpandInnerSubscriber(this.destination, this));
        }
    };

    return ExpandSubscriber;
})(_mergeSupport.MergeSubscriber);

var ExpandInnerSubscriber = (function (_MergeInnerSubscriber) {
    _inherits(ExpandInnerSubscriber, _MergeInnerSubscriber);

    function ExpandInnerSubscriber(destination, parent) {
        _classCallCheck(this, ExpandInnerSubscriber);

        _MergeInnerSubscriber.call(this, destination, parent);
    }

    ExpandInnerSubscriber.prototype._next = function _next(value) {
        this.destination.next(value);
        this.parent.next(value);
    };

    return ExpandInnerSubscriber;
})(_mergeSupport.MergeInnerSubscriber);

module.exports = exports['default'];
},{"../observables/EmptyObservable":10,"../util/errorObject":118,"../util/tryCatch":125,"./merge-support":58}],47:[function(require,module,exports){
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
},{"../Subscriber":5,"../util/bindCallback":117,"../util/errorObject":118,"../util/tryCatch":125}],48:[function(require,module,exports){
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
},{"../Subscriber":5,"../Subscription":6,"../util/bindCallback":117}],49:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mergeSupport = require('./merge-support');

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

var FlatMapOperator = (function () {
    function FlatMapOperator(project, projectResult) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, FlatMapOperator);

        this.project = project;
        this.projectResult = projectResult;
        this.concurrent = concurrent;
    }

    FlatMapOperator.prototype.call = function call(subscriber) {
        return new FlatMapSubscriber(subscriber, this.concurrent, this.project, this.projectResult);
    };

    return FlatMapOperator;
})();

exports.FlatMapOperator = FlatMapOperator;

var FlatMapSubscriber = (function (_MergeSubscriber) {
    _inherits(FlatMapSubscriber, _MergeSubscriber);

    function FlatMapSubscriber(destination, concurrent, project, projectResult) {
        _classCallCheck(this, FlatMapSubscriber);

        _MergeSubscriber.call(this, destination, concurrent);
        this.project = project;
        this.projectResult = projectResult;
    }

    FlatMapSubscriber.prototype._project = function _project(value, index) {
        var observable = _utilTryCatch2['default'](this.project).call(this, value, index);
        if (observable === _utilErrorObject.errorObject) {
            this.error(_utilErrorObject.errorObject.e);
            return null;
        }
        return observable;
    };

    FlatMapSubscriber.prototype._subscribeInner = function _subscribeInner(observable, value, index) {
        var projectResult = this.projectResult;
        if (projectResult) {
            return observable._subscribe(new FlatMapInnerSubscriber(this.destination, this, value, index, projectResult));
        } else if (observable._isScalar) {
            this.destination.next(observable.value);
            this._innerComplete();
        } else {
            return observable._subscribe(new _mergeSupport.MergeInnerSubscriber(this.destination, this));
        }
    };

    return FlatMapSubscriber;
})(_mergeSupport.MergeSubscriber);

exports.FlatMapSubscriber = FlatMapSubscriber;

var FlatMapInnerSubscriber = (function (_MergeInnerSubscriber) {
    _inherits(FlatMapInnerSubscriber, _MergeInnerSubscriber);

    function FlatMapInnerSubscriber(destination, parent, value, index, project) {
        _classCallCheck(this, FlatMapInnerSubscriber);

        _MergeInnerSubscriber.call(this, destination, parent);
        this.count = 0;
        this.value = value;
        this.index = index;
        this.project = project;
    }

    FlatMapInnerSubscriber.prototype._next = function _next(value) {
        var result = value;
        var index = this.count++;
        result = _utilTryCatch2['default'](this.project).call(this, this.value, value, this.index, index);
        if (result === _utilErrorObject.errorObject) {
            this.destination.error(_utilErrorObject.errorObject.e);
        } else {
            this.destination.next(result);
        }
    };

    return FlatMapInnerSubscriber;
})(_mergeSupport.MergeInnerSubscriber);

exports.FlatMapInnerSubscriber = FlatMapInnerSubscriber;
},{"../util/errorObject":118,"../util/tryCatch":125,"./merge-support":58}],50:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = flatMap;

var _flatMapSupport = require('./flatMap-support');

function flatMap(project, projectResult, concurrent) {
    return this.lift(new _flatMapSupport.FlatMapOperator(project, projectResult, concurrent));
}

module.exports = exports['default'];
},{"./flatMap-support":49}],51:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _flatMapSupport = require('./flatMap-support');

var FlatMapToOperator = (function () {
    function FlatMapToOperator(observable, projectResult) {
        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

        _classCallCheck(this, FlatMapToOperator);

        this.observable = observable;
        this.projectResult = projectResult;
        this.concurrent = concurrent;
    }

    FlatMapToOperator.prototype.call = function call(subscriber) {
        return new FlatMapToSubscriber(subscriber, this.concurrent, this.observable, this.projectResult);
    };

    return FlatMapToOperator;
})();

exports.FlatMapToOperator = FlatMapToOperator;

var FlatMapToSubscriber = (function (_FlatMapSubscriber) {
    _inherits(FlatMapToSubscriber, _FlatMapSubscriber);

    function FlatMapToSubscriber(destination, concurrent, observable, projectResult) {
        _classCallCheck(this, FlatMapToSubscriber);

        _FlatMapSubscriber.call(this, destination, concurrent, null, projectResult);
        this.observable = observable;
    }

    FlatMapToSubscriber.prototype._project = function _project(value, index) {
        return this.observable;
    };

    return FlatMapToSubscriber;
})(_flatMapSupport.FlatMapSubscriber);

exports.FlatMapToSubscriber = FlatMapToSubscriber;
},{"./flatMap-support":49}],52:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = flatMapTo;

var _flatMapToSupport = require('./flatMapTo-support');

function flatMapTo(observable, projectResult, concurrent) {
    return this.lift(new _flatMapToSupport.FlatMapToOperator(observable, projectResult, concurrent));
}

module.exports = exports['default'];
},{"./flatMapTo-support":51}],53:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = groupBy;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _utilMap = require('../util/Map');

var _utilMap2 = _interopRequireDefault(_utilMap);

var _utilFastMap = require('../util/FastMap');

var _utilFastMap2 = _interopRequireDefault(_utilFastMap);

var _subjectsGroupSubject = require('../subjects/GroupSubject');

var _subjectsGroupSubject2 = _interopRequireDefault(_subjectsGroupSubject);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function groupBy(keySelector, elementSelector, durationSelector) {
    return this.lift(new GroupByOperator(keySelector, durationSelector, elementSelector));
}

var GroupByOperator = (function () {
    function GroupByOperator(keySelector, durationSelector, elementSelector) {
        _classCallCheck(this, GroupByOperator);

        this.keySelector = keySelector;
        this.durationSelector = durationSelector;
        this.elementSelector = elementSelector;
    }

    GroupByOperator.prototype.call = function call(subscriber) {
        return new GroupBySubscriber(subscriber, this.keySelector, this.durationSelector, this.elementSelector);
    };

    return GroupByOperator;
})();

var GroupBySubscriber = (function (_Subscriber) {
    _inherits(GroupBySubscriber, _Subscriber);

    function GroupBySubscriber(destination, keySelector, durationSelector, elementSelector) {
        _classCallCheck(this, GroupBySubscriber);

        _Subscriber.call(this, destination);
        this.keySelector = keySelector;
        this.durationSelector = durationSelector;
        this.elementSelector = elementSelector;
        this.groups = null;
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
                groups.set(key, group = new _subjectsGroupSubject2['default'](key));
                if (durationSelector) {
                    var duration = _utilTryCatch2['default'](durationSelector)(group);
                    if (duration === _utilErrorObject.errorObject) {
                        this.error(duration.e);
                    } else {
                        this.add(duration._subscribe(new GroupDurationSubscriber(group, this)));
                    }
                }
                this.destination.next(group);
            }
            if (elementSelector) {
                var value = _utilTryCatch2['default'](elementSelector)(x);
                if (value === _utilErrorObject.errorObject) {
                    group.error(value.e);
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
        this.groups[key] = null;
    };

    return GroupBySubscriber;
})(_Subscriber4['default']);

var GroupDurationSubscriber = (function (_Subscriber2) {
    _inherits(GroupDurationSubscriber, _Subscriber2);

    function GroupDurationSubscriber(group, parent) {
        _classCallCheck(this, GroupDurationSubscriber);

        _Subscriber2.call(this, null);
        this.group = group;
        this.parent = parent;
    }

    GroupDurationSubscriber.prototype._next = function _next(value) {
        var group = this.group;
        group.complete();
        this.parent.removeGroup(group.key);
    };

    GroupDurationSubscriber.prototype._error = function _error(err) {
        var group = this.group;
        group.error(err);
        this.parent.removeGroup(group.key);
    };

    GroupDurationSubscriber.prototype._complete = function _complete() {
        var group = this.group;
        group.complete();
        this.parent.removeGroup(group.key);
    };

    return GroupDurationSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":5,"../subjects/GroupSubject":109,"../util/FastMap":112,"../util/Map":114,"../util/errorObject":118,"../util/tryCatch":125}],54:[function(require,module,exports){
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
},{"../Subscriber":5,"../util/bindCallback":117,"../util/errorObject":118,"../util/tryCatch":125}],55:[function(require,module,exports){
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
},{"../Subscriber":5}],56:[function(require,module,exports){
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
},{"../Notification":1,"../Subscriber":5}],57:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = merge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesArrayObservable = require('../observables/ArrayObservable');

var _observablesArrayObservable2 = _interopRequireDefault(_observablesArrayObservable);

var _mergeSupport = require('./merge-support');

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
    return new _observablesArrayObservable2['default'](observables, scheduler).lift(new _mergeSupport.MergeOperator(concurrent));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":7,"../schedulers/immediate":106,"./merge-support":58}],58:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var MergeOperator = (function () {
    function MergeOperator() {
        var concurrent = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];

        _classCallCheck(this, MergeOperator);

        this.concurrent = concurrent;
    }

    MergeOperator.prototype.call = function call(subscriber) {
        return new MergeSubscriber(subscriber, this.concurrent);
    };

    return MergeOperator;
})();

exports.MergeOperator = MergeOperator;

var MergeSubscriber = (function (_Subscriber) {
    _inherits(MergeSubscriber, _Subscriber);

    function MergeSubscriber(destination, concurrent) {
        _classCallCheck(this, MergeSubscriber);

        _Subscriber.call(this, destination);
        this.count = 0;
        this.active = 0;
        this.stopped = false;
        this.buffer = [];
        this.concurrent = concurrent;
    }

    MergeSubscriber.prototype._next = function _next(value) {
        var active = this.active;
        if (active < this.concurrent) {
            var index = this.count;
            var observable = this._project(value, index);
            if (observable) {
                this.count = index + 1;
                this.active = active + 1;
                this.add(this._subscribeInner(observable, value, index));
            }
        } else {
            this._buffer(value);
        }
    };

    MergeSubscriber.prototype.complete = function complete() {
        this.stopped = true;
        if (this.active === 0 && this.buffer.length === 0) {
            _Subscriber.prototype.complete.call(this);
        }
    };

    MergeSubscriber.prototype._unsubscribe = function _unsubscribe() {
        this.buffer = void 0;
    };

    MergeSubscriber.prototype._project = function _project(value, index) {
        return value;
    };

    MergeSubscriber.prototype._buffer = function _buffer(value) {
        this.buffer.push(value);
    };

    MergeSubscriber.prototype._subscribeInner = function _subscribeInner(observable, value, index) {
        var destination = this.destination;
        if (observable._isScalar) {
            destination.next(observable.value);
            this._innerComplete();
        } else {
            var subscriber = new MergeInnerSubscriber(destination, this);
            observable._subscribe(subscriber);
            return subscriber;
        }
    };

    MergeSubscriber.prototype._innerComplete = function _innerComplete() {
        var buffer = this.buffer;
        var active = this.active -= 1;
        var stopped = this.stopped;
        var pending = buffer.length;
        if (stopped && active === 0 && pending === 0) {
            _Subscriber.prototype.complete.call(this);
        } else if (active < this.concurrent && pending > 0) {
            this._next(buffer.shift());
        }
    };

    return MergeSubscriber;
})(_Subscriber4['default']);

exports.MergeSubscriber = MergeSubscriber;

var MergeInnerSubscriber = (function (_Subscriber2) {
    _inherits(MergeInnerSubscriber, _Subscriber2);

    function MergeInnerSubscriber(destination, parent) {
        _classCallCheck(this, MergeInnerSubscriber);

        _Subscriber2.call(this, destination);
        this.parent = parent;
    }

    MergeInnerSubscriber.prototype._complete = function _complete() {
        this.parent._innerComplete();
    };

    return MergeInnerSubscriber;
})(_Subscriber4['default']);

exports.MergeInnerSubscriber = MergeInnerSubscriber;
},{"../Subscriber":5}],59:[function(require,module,exports){
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
},{"./merge-static":57}],60:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = mergeAll;

var _mergeSupport = require('./merge-support');

function mergeAll(concurrent) {
    return this.lift(new _mergeSupport.MergeOperator(concurrent));
}

module.exports = exports['default'];
},{"./merge-support":58}],61:[function(require,module,exports){
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
},{"../observables/ConnectableObservable":8}],62:[function(require,module,exports){
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
},{"../Notification":1,"../Subscriber":5}],63:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = observeOn;

var _observeOnSupport = require('./observeOn-support');

function observeOn(scheduler) {
    var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return this.lift(new _observeOnSupport.ObserveOnOperator(scheduler, delay));
}

module.exports = exports['default'];
},{"./observeOn-support":62}],64:[function(require,module,exports){
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
},{"../util/not":122,"./filter":47}],65:[function(require,module,exports){
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
},{"../Subject":4,"./multicast":61}],66:[function(require,module,exports){
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
},{"../subjects/BehaviorSubject":108,"./multicast":61}],67:[function(require,module,exports){
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
},{"../subjects/ReplaySubject":110,"./multicast":61}],68:[function(require,module,exports){
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
        this.hasSeed = typeof acc !== "undefined";
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
},{"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],69:[function(require,module,exports){
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
},{"../Subscriber":5}],70:[function(require,module,exports){
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
},{"../Subscriber":5}],71:[function(require,module,exports){
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
},{"../Subject":4,"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],72:[function(require,module,exports){
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
},{"../Subscriber":5}],73:[function(require,module,exports){
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
},{"../Subscriber":5,"../schedulers/nextTick":107}],74:[function(require,module,exports){
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
        this.hasSeed = typeof acc !== "undefined";
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
},{"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],75:[function(require,module,exports){
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
},{"../Subscriber":5}],76:[function(require,module,exports){
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
        this.notificationSubscriber = new NotificationSubscriber();
        this.add(this.notifier.subscribe(this.notificationSubscriber));
    }

    SkipUntilSubscriber.prototype._next = function _next(x) {
        if (this.notificationSubscriber.hasNotified) {
            this.destination.next(x);
        }
    };

    return SkipUntilSubscriber;
})(_Subscriber4['default']);

var NotificationSubscriber = (function (_Subscriber2) {
    _inherits(NotificationSubscriber, _Subscriber2);

    function NotificationSubscriber() {
        _classCallCheck(this, NotificationSubscriber);

        _Subscriber2.call(this, null);
        this.hasNotified = false;
    }

    NotificationSubscriber.prototype._next = function _next() {
        this.hasNotified = true;
        this.unsubscribe();
    };

    return NotificationSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":5}],77:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = startWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observablesScalarObservable = require('../observables/ScalarObservable');

var _observablesScalarObservable2 = _interopRequireDefault(_observablesScalarObservable);

var _concatStatic = require('./concat-static');

var _concatStatic2 = _interopRequireDefault(_concatStatic);

function startWith(x) {
    return _concatStatic2['default'](new _observablesScalarObservable2['default'](x), this);
}

module.exports = exports['default'];
},{"../observables/ScalarObservable":21,"./concat-static":34}],78:[function(require,module,exports){
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
},{"../observables/SubscribeOnObservable":22}],79:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = switchAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _mergeSupport = require('./merge-support');

function switchAll() {
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

var SwitchSubscriber = (function (_MergeSubscriber) {
    _inherits(SwitchSubscriber, _MergeSubscriber);

    function SwitchSubscriber(destination) {
        _classCallCheck(this, SwitchSubscriber);

        _MergeSubscriber.call(this, destination, 1);
    }

    SwitchSubscriber.prototype._buffer = function _buffer(value) {
        var active = this.active;
        if (active > 0) {
            this.active = active - 1;
            var inner = this.innerSubscription;
            if (inner) {
                inner.unsubscribe();
                this.innerSubscription = null;
            }
        }
        this._next(value);
    };

    SwitchSubscriber.prototype._subscribeInner = function _subscribeInner(observable, value, index) {
        this.innerSubscription = new _Subscription2['default']();
        this.innerSubscription.add(_MergeSubscriber.prototype._subscribeInner.call(this, observable, value, index));
        return this.innerSubscription;
    };

    return SwitchSubscriber;
})(_mergeSupport.MergeSubscriber);

module.exports = exports['default'];
},{"../Subscription":6,"./merge-support":58}],80:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = switchLatest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscription = require('../Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _flatMapSupport = require('./flatMap-support');

function switchLatest(project, projectResult) {
    return this.lift(new SwitchLatestOperator(project, projectResult));
}

var SwitchLatestOperator = (function (_FlatMapOperator) {
    _inherits(SwitchLatestOperator, _FlatMapOperator);

    function SwitchLatestOperator(project, projectResult) {
        _classCallCheck(this, SwitchLatestOperator);

        _FlatMapOperator.call(this, project, projectResult, 1);
    }

    SwitchLatestOperator.prototype.call = function call(subscriber) {
        return new SwitchLatestSubscriber(subscriber, this.project, this.projectResult);
    };

    return SwitchLatestOperator;
})(_flatMapSupport.FlatMapOperator);

var SwitchLatestSubscriber = (function (_FlatMapSubscriber) {
    _inherits(SwitchLatestSubscriber, _FlatMapSubscriber);

    function SwitchLatestSubscriber(destination, project, projectResult) {
        _classCallCheck(this, SwitchLatestSubscriber);

        _FlatMapSubscriber.call(this, destination, 1, project, projectResult);
    }

    SwitchLatestSubscriber.prototype._buffer = function _buffer(value) {
        var active = this.active;
        if (active > 0) {
            this.active = active - 1;
            var inner = this.innerSubscription;
            if (inner) {
                inner.unsubscribe();
            }
        }
        this._next(value);
    };

    SwitchLatestSubscriber.prototype._subscribeInner = function _subscribeInner(observable, value, index) {
        this.innerSubscription = new _Subscription2['default']();
        this.innerSubscription.add(_FlatMapSubscriber.prototype._subscribeInner.call(this, observable, value, index));
        return this.innerSubscription;
    };

    return SwitchLatestSubscriber;
})(_flatMapSupport.FlatMapSubscriber);

module.exports = exports['default'];
},{"../Subscription":6,"./flatMap-support":49}],81:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = switchLatestTo;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _flatMapToSupport = require('./flatMapTo-support');

function switchLatestTo(observable, projectResult) {
    return this.lift(new SwitchLatestToOperator(observable, projectResult));
}

var SwitchLatestToOperator = (function (_FlatMapToOperator) {
    _inherits(SwitchLatestToOperator, _FlatMapToOperator);

    function SwitchLatestToOperator(observable, projectResult) {
        _classCallCheck(this, SwitchLatestToOperator);

        _FlatMapToOperator.call(this, observable, projectResult, 1);
    }

    SwitchLatestToOperator.prototype.call = function call(subscriber) {
        return new SwitchLatestToSubscriber(subscriber, this.observable, this.projectResult);
    };

    return SwitchLatestToOperator;
})(_flatMapToSupport.FlatMapToOperator);

var SwitchLatestToSubscriber = (function (_FlatMapToSubscriber) {
    _inherits(SwitchLatestToSubscriber, _FlatMapToSubscriber);

    function SwitchLatestToSubscriber(destination, observable, projectResult) {
        _classCallCheck(this, SwitchLatestToSubscriber);

        _FlatMapToSubscriber.call(this, destination, 1, observable, projectResult);
    }

    SwitchLatestToSubscriber.prototype._buffer = function _buffer(value) {
        var active = this.active;
        if (active > 0) {
            this.active = active - 1;
            var inner = this.innerSubscription;
            if (inner) {
                inner.unsubscribe();
            }
        }
        this._next(value);
    };

    SwitchLatestToSubscriber.prototype._subscribeInner = function _subscribeInner(observable, value, index) {
        return this.innerSubscription = _FlatMapToSubscriber.prototype._subscribeInner.call(this, observable, value, index);
    };

    return SwitchLatestToSubscriber;
})(_flatMapToSupport.FlatMapToSubscriber);

module.exports = exports['default'];
},{"./flatMapTo-support":51}],82:[function(require,module,exports){
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
},{"../Subscriber":5}],83:[function(require,module,exports){
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
},{"../Subscriber":5}],84:[function(require,module,exports){
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

    ThrottleSubscriber.prototype._next = function _next(x) {
        this.clearThrottle();
        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { value: x, subscriber: this }));
    };

    ThrottleSubscriber.prototype.throttledNext = function throttledNext(x) {
        this.clearThrottle();
        this.destination.next(x);
    };

    ThrottleSubscriber.prototype.clearThrottle = function clearThrottle() {
        var throttled = this.throttled;
        if (throttled) {
            this.remove(throttled);
            throttled.unsubscribe();
            this.throttled = null;
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
},{"../Subscriber":5,"../schedulers/nextTick":107}],85:[function(require,module,exports){
'use strict';

exports.__esModule = true;
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

    var waitFor = _utilIsDate2['default'](due) ? +due - Date.now() : due;
    return this.lift(new TimeoutOperator(waitFor, errorToSend, scheduler));
}

var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, errorToSend, scheduler) {
        _classCallCheck(this, TimeoutOperator);

        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
    }

    TimeoutOperator.prototype.call = function call(subscriber) {
        return new TimeoutSubscriber(subscriber, this.waitFor, this.errorToSend, this.scheduler);
    };

    return TimeoutOperator;
})();

var TimeoutSubscriber = (function (_Subscriber) {
    _inherits(TimeoutSubscriber, _Subscriber);

    function TimeoutSubscriber(destination, waitFor, errorToSend, scheduler) {
        _classCallCheck(this, TimeoutSubscriber);

        _Subscriber.call(this, destination);
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        var delay = waitFor;
        scheduler.schedule(dispatchTimeout, delay, { subscriber: this });
    }

    TimeoutSubscriber.prototype.sendTimeoutError = function sendTimeoutError() {
        this.error(this.errorToSend || new Error('timeout'));
    };

    return TimeoutSubscriber;
})(_Subscriber3['default']);

function dispatchTimeout(state) {
    var subscriber = state.subscriber;
    subscriber.sendTimeoutError();
}
module.exports = exports['default'];
},{"../Subscriber":5,"../schedulers/immediate":106,"../util/isDate":119}],86:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = timeoutWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber2 = require('../Subscriber');

var _Subscriber3 = _interopRequireDefault(_Subscriber2);

var _schedulersImmediate = require('../schedulers/immediate');

var _schedulersImmediate2 = _interopRequireDefault(_schedulersImmediate);

var _utilIsDate = require('../util/isDate');

var _utilIsDate2 = _interopRequireDefault(_utilIsDate);

function timeoutWith(due, withObservable) {
    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _schedulersImmediate2['default'] : arguments[2];

    var waitFor = _utilIsDate2['default'](due) ? +due - Date.now() : due;
    return this.lift(new TimeoutWithOperator(waitFor, withObservable, scheduler));
}

var TimeoutWithOperator = (function () {
    function TimeoutWithOperator(waitFor, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithOperator);

        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }

    TimeoutWithOperator.prototype.call = function call(subscriber) {
        return new TimeoutWithSubscriber(subscriber, this.waitFor, this.withObservable, this.scheduler);
    };

    return TimeoutWithOperator;
})();

var TimeoutWithSubscriber = (function (_Subscriber) {
    _inherits(TimeoutWithSubscriber, _Subscriber);

    function TimeoutWithSubscriber(destination, waitFor, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithSubscriber);

        _Subscriber.call(this, destination);
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        var delay = waitFor;
        scheduler.schedule(dispatchTimeout, delay, { subscriber: this });
    }

    TimeoutWithSubscriber.prototype.handleTimeout = function handleTimeout() {
        var withObservable = this.withObservable;
        this.add(withObservable.subscribe(this));
    };

    return TimeoutWithSubscriber;
})(_Subscriber3['default']);

function dispatchTimeout(state) {
    var subscriber = state.subscriber;
    subscriber.handleTimeout();
}
module.exports = exports['default'];
},{"../Subscriber":5,"../schedulers/immediate":106,"../util/isDate":119}],87:[function(require,module,exports){
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
},{"../Subscriber":5}],88:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = toPromise;

function toPromise() {
    var _this = this;

    var PromiseCtor = arguments.length <= 0 || arguments[0] === undefined ? Promise : arguments[0];

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

module.exports = exports["default"];
},{}],89:[function(require,module,exports){
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

    return WindowClosingNotifierSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subject":4,"../Subscriber":5}],90:[function(require,module,exports){
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
        this.windows = [{ count: 0, notified: false, window: new _Subject2['default']() }];
        this.count = 0;
    }

    WindowCountSubscriber.prototype._next = function _next(value) {
        var count = this.count += 1;
        var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        if (count % startWindowEvery === 0) {
            var _window = new _Subject2['default']();
            windows.push({ count: 0, notified: false, window: _window });
        }
        for (var i = 0; i < len; i++) {
            var w = windows[i];
            var _window2 = w.window;
            if (!w.notified) {
                w.notified = true;
                this.destination.next(_window2);
            }
            _window2.next(value);
            if (windowSize === (w.count += 1)) {
                _window2.complete();
            }
        }
    };

    WindowCountSubscriber.prototype._error = function _error(err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().window.error(err);
        }
        this.destination.error(err);
    };

    WindowCountSubscriber.prototype._complete = function _complete() {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().window.complete();
        }
        this.destination.complete();
    };

    return WindowCountSubscriber;
})(_Subscriber3['default']);

module.exports = exports['default'];
},{"../Subject":4,"../Subscriber":5}],91:[function(require,module,exports){
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
            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, { subscriber: this, window: _window, context: null }));
            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler }));
        } else {
            var _window2 = this.openWindow();
            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, { subscriber: this, window: _window2, windowTimeSpan: windowTimeSpan }));
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
    action.add(context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, { subscriber: subscriber, window: window, context: context }));
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
},{"../Subject":4,"../Subscriber":5,"../schedulers/nextTick":107}],92:[function(require,module,exports){
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
            this.add(windowContext.subscription.add(closingNotifier._subscribe(new WindowClosingNotifierSubscriber(this, windowContext))));
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
},{"../Subject":4,"../Subscriber":5,"../Subscription":6,"../util/errorObject":118,"../util/tryCatch":125}],93:[function(require,module,exports){
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
},{"../Subject":4,"../Subscriber":5,"../Subscription":6,"../util/errorObject":118,"../util/tryCatch":125}],94:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = withLatestFrom;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

function withLatestFrom() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var project = args.pop();
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

var WithLatestFromSubscriber = (function (_Subscriber) {
    _inherits(WithLatestFromSubscriber, _Subscriber);

    function WithLatestFromSubscriber(destination, observables, project) {
        _classCallCheck(this, WithLatestFromSubscriber);

        _Subscriber.call(this, destination);
        this.observables = observables;
        this.project = project;
        var len = observables.length;
        this.values = new Array(len);
        this.toSet = len;
        for (var i = 0; i < len; i++) {
            this.add(observables[i]._subscribe(new WithLatestInnerSubscriber(this, i)));
        }
    }

    WithLatestFromSubscriber.prototype.notifyValue = function notifyValue(index, value) {
        this.values[index] = value;
        this.toSet--;
    };

    WithLatestFromSubscriber.prototype._next = function _next(value) {
        if (this.toSet === 0) {
            var values = this.values;
            var result = _utilTryCatch2['default'](this.project)([value].concat(values));
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(result.e);
            } else {
                this.destination.next(result);
            }
        }
    };

    return WithLatestFromSubscriber;
})(_Subscriber4['default']);

var WithLatestInnerSubscriber = (function (_Subscriber2) {
    _inherits(WithLatestInnerSubscriber, _Subscriber2);

    function WithLatestInnerSubscriber(parent, valueIndex) {
        _classCallCheck(this, WithLatestInnerSubscriber);

        _Subscriber2.call(this, null);
        this.parent = parent;
        this.valueIndex = valueIndex;
    }

    WithLatestInnerSubscriber.prototype._next = function _next(value) {
        this.parent.notifyValue(this.valueIndex, value);
    };

    WithLatestInnerSubscriber.prototype._error = function _error(err) {
        this.parent.error(err);
    };

    WithLatestInnerSubscriber.prototype._complete = function _complete() {
        // noop
    };

    return WithLatestInnerSubscriber;
})(_Subscriber4['default']);

module.exports = exports['default'];
},{"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],95:[function(require,module,exports){
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
    if (typeof project === "function") {
        observables.pop();
    }
    return new _observablesArrayObservable2['default'](observables).lift(new _zipSupport.ZipOperator(project));
}

module.exports = exports['default'];
},{"../observables/ArrayObservable":7,"./zip-support":96}],96:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.mapValue = mapValue;
exports.hasValue = hasValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber3 = require('../Subscriber');

var _Subscriber4 = _interopRequireDefault(_Subscriber3);

var _utilTryCatch = require('../util/tryCatch');

var _utilTryCatch2 = _interopRequireDefault(_utilTryCatch);

var _utilErrorObject = require('../util/errorObject');

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
        this.active = 0;
        this.observables = [];
        this.limit = Number.POSITIVE_INFINITY;
        this.project = typeof project === "function" ? project : null;
        this.values = values;
    }

    ZipSubscriber.prototype._next = function _next(observable) {
        this.observables.push(observable);
    };

    ZipSubscriber.prototype._complete = function _complete() {
        var values = this.values;
        var observables = this.observables;
        var index = -1;
        var len = observables.length;
        this.active = len;
        while (++index < len) {
            this.add(this._subscribeInner(observables[index], values, index, len));
        }
    };

    ZipSubscriber.prototype._subscribeInner = function _subscribeInner(observable, values, index, total) {
        return observable._subscribe(new ZipInnerSubscriber(this.destination, this, values, index, total));
    };

    ZipSubscriber.prototype._innerComplete = function _innerComplete(innerSubscriber) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        } else {
            this.limit = innerSubscriber.events;
        }
    };

    return ZipSubscriber;
})(_Subscriber4['default']);

exports.ZipSubscriber = ZipSubscriber;

function arrayInitialize(length) {
    var arr = Array(length);
    for (var i = 0; i < length; i++) {
        arr[i] = null;
    }
    return arr;
}

var ZipInnerSubscriber = (function (_Subscriber2) {
    _inherits(ZipInnerSubscriber, _Subscriber2);

    function ZipInnerSubscriber(destination, parent, values, index, total) {
        _classCallCheck(this, ZipInnerSubscriber);

        _Subscriber2.call(this, destination);
        this.events = 0;
        this.parent = parent;
        this.values = values;
        this.index = index;
        this.total = total;
    }

    ZipInnerSubscriber.prototype._next = function _next(x) {
        var parent = this.parent;
        var events = this.events;
        var total = this.total;
        var limit = parent.limit;
        if (events >= limit) {
            this.destination.complete();
            return;
        }
        var index = this.index;
        var values = this.values;
        var zipped = values[events] || (values[events] = arrayInitialize(total));
        zipped[index] = [x];
        if (zipped.every(hasValue)) {
            this._projectNext(zipped, parent.project);
            values[events] = undefined;
        }
        this.events = events + 1;
    };

    ZipInnerSubscriber.prototype._projectNext = function _projectNext(values, project) {
        if (project && typeof project === "function") {
            var result = _utilTryCatch2['default'](project).apply(null, values.map(mapValue));
            if (result === _utilErrorObject.errorObject) {
                this.destination.error(_utilErrorObject.errorObject.e);
                return;
            } else {
                this.destination.next(result);
            }
        } else {
            this.destination.next(values.map(mapValue));
        }
    };

    ZipInnerSubscriber.prototype._complete = function _complete() {
        this.parent._innerComplete(this);
    };

    return ZipInnerSubscriber;
})(_Subscriber4['default']);

exports.ZipInnerSubscriber = ZipInnerSubscriber;

function mapValue(xs) {
    return xs[0];
}

function hasValue(xs) {
    return xs && xs.length === 1;
}
},{"../Subscriber":5,"../util/errorObject":118,"../util/tryCatch":125}],97:[function(require,module,exports){
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
},{"./zip-static":95}],98:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = zipAll;

var _zipSupport = require('./zip-support');

function zipAll(project) {
    return this.lift(new _zipSupport.ZipOperator(project));
}

module.exports = exports['default'];
},{"./zip-support":96}],99:[function(require,module,exports){
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
},{"./ImmediateAction":100}],100:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            throw new Error("How did did we execute a canceled Action?");
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
})(_Subscription3["default"]);

exports["default"] = ImmediateAction;
module.exports = exports["default"];
},{"../Subscription":6}],101:[function(require,module,exports){
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
},{"./FutureAction":99,"./ImmediateAction":100}],102:[function(require,module,exports){
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
},{"../util/Immediate":113,"./ImmediateAction":100}],103:[function(require,module,exports){
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
},{"./ImmediateAction":100,"./ImmediateScheduler":101,"./NextTickAction":102}],104:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable = require('../Observable');

var _Observable2 = _interopRequireDefault(_Observable);

var _VirtualTimeScheduler2 = require('./VirtualTimeScheduler');

var _VirtualTimeScheduler3 = _interopRequireDefault(_VirtualTimeScheduler2);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Subject = require('../Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var TestScheduler = (function (_VirtualTimeScheduler) {
    _inherits(TestScheduler, _VirtualTimeScheduler);

    function TestScheduler(assertDeepEqual) {
        _classCallCheck(this, TestScheduler);

        _VirtualTimeScheduler.call(this);
        this.assertDeepEqual = assertDeepEqual;
        this.flushTests = [];
    }

    TestScheduler.prototype.createColdObservable = function createColdObservable(marbles, values, error) {
        var _this = this;

        if (marbles.indexOf('^') !== -1) {
            throw new Error('cold observable cannot have subscription offset "^"');
        }
        var messages = TestScheduler.parseMarbles(marbles, values, error);
        return _Observable2['default'].create(function (subscriber) {
            messages.forEach(function (_ref) {
                var notification = _ref.notification;
                var frame = _ref.frame;

                _this.schedule(function () {
                    notification.observe(subscriber);
                }, frame);
            }, _this);
        });
    };

    TestScheduler.prototype.createHotObservable = function createHotObservable(marbles, values, error) {
        var _this2 = this;

        var messages = TestScheduler.parseMarbles(marbles, values, error);
        var subject = new _Subject2['default']();
        messages.forEach(function (_ref2) {
            var notification = _ref2.notification;
            var frame = _ref2.frame;

            _this2.schedule(function () {
                notification.observe(subject);
            }, frame);
        }, this);
        return subject;
    };

    TestScheduler.prototype.expect = function expect(observable) {
        var _this3 = this;

        var actual = [];
        var flushTest = {
            observable: observable, actual: actual, marbles: null, ready: false
        };
        this.schedule(function () {
            observable.subscribe(function (value) {
                actual.push({ frame: _this3.frame, notification: _Notification2['default'].createNext(value) });
            }, function (err) {
                actual.push({ frame: _this3.frame, notification: _Notification2['default'].createError(err) });
            }, function () {
                actual.push({ frame: _this3.frame, notification: _Notification2['default'].createComplete() });
            });
        }, 0);
        this.flushTests.push(flushTest);
        return {
            toBe: function toBe(marbles, values, errorValue) {
                flushTest.ready = true;
                flushTest.marbles = marbles;
                flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue);
            }
        };
    };

    TestScheduler.prototype.flush = function flush() {
        _VirtualTimeScheduler.prototype.flush.call(this);
        var flushTests = this.flushTests.filter(function (test) {
            return test.ready;
        });
        while (flushTests.length > 0) {
            var test = flushTests.shift();
            this.assertDeepEqual(test.actual, test.expected);
        }
    };

    TestScheduler.parseMarbles = function parseMarbles(marbles, values, errorValue) {
        var len = marbles.length;
        var results = [];
        var subIndex = marbles.indexOf('^');
        var frameOffset = subIndex === -1 ? 0 : subIndex * -10;
        for (var i = 0; i < len; i++) {
            var frame = i * 10;
            var notification = undefined;
            var c = marbles[i];
            switch (c) {
                case '-':
                    break;
                case '|':
                    notification = _Notification2['default'].createComplete();
                    break;
                case '^':
                    break;
                case '#':
                    notification = _Notification2['default'].createError(errorValue || 'error');
                    break;
                default:
                    notification = _Notification2['default'].createNext(values[c]);
                    break;
            }
            frame += frameOffset;
            if (notification) {
                results.push({ notification: notification, frame: frame });
            }
        }
        return results;
    };

    return TestScheduler;
})(_VirtualTimeScheduler3['default']);

exports['default'] = TestScheduler;
module.exports = exports['default'];
},{"../Notification":1,"../Observable":2,"../Subject":4,"./VirtualTimeScheduler":105}],105:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Subscription2 = require('../Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var VirtualTimeScheduler = (function () {
    function VirtualTimeScheduler() {
        _classCallCheck(this, VirtualTimeScheduler);

        this.actions = [];
        this.active = false;
        this.scheduled = false;
        this.index = 0;
        this.sorted = false;
        this.frame = 0;
    }

    VirtualTimeScheduler.prototype.now = function now() {
        return 0;
    };

    VirtualTimeScheduler.prototype.sortActions = function sortActions() {
        if (!this.sorted) {
            this.actions.sort(function (a, b) {
                return a.delay === b.delay ? a.index > b.index ? 1 : -1 : a.delay > b.delay ? 1 : -1;
            });
            this.sorted = true;
        }
    };

    VirtualTimeScheduler.prototype.flush = function flush() {
        this.sortActions();
        var actions = this.actions;
        while (actions.length > 0) {
            var action = actions.shift();
            this.frame = action.delay;
            action.execute();
        }
        this.frame = 0;
    };

    VirtualTimeScheduler.prototype.schedule = function schedule(work, delay, state) {
        if (delay === undefined) delay = 0;

        this.sorted = false;
        return new VirtualAction(this, work, this.index++).schedule(state, delay);
    };

    return VirtualTimeScheduler;
})();

exports["default"] = VirtualTimeScheduler;

var VirtualAction = (function (_Subscription) {
    _inherits(VirtualAction, _Subscription);

    function VirtualAction(scheduler, work, index) {
        _classCallCheck(this, VirtualAction);

        _Subscription.call(this);
        this.scheduler = scheduler;
        this.work = work;
        this.index = index;
    }

    VirtualAction.prototype.schedule = function schedule(state) {
        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        if (this.isUnsubscribed) {
            return this;
        }
        var scheduler = this.scheduler;
        var action = scheduler.frame === this.delay ? this : new VirtualAction(scheduler, this.work, scheduler.index += 1);
        action.state = state;
        action.delay = scheduler.frame + delay;
        scheduler.actions.push(action);
        return this;
    };

    VirtualAction.prototype.execute = function execute() {
        if (this.isUnsubscribed) {
            throw new Error("How did did we execute a canceled Action?");
        }
        this.work(this.state);
    };

    VirtualAction.prototype.unsubscribe = function unsubscribe() {
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

    return VirtualAction;
})(_Subscription3["default"]);

module.exports = exports["default"];
},{"../Subscription":6}],106:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ImmediateScheduler = require('./ImmediateScheduler');

var _ImmediateScheduler2 = _interopRequireDefault(_ImmediateScheduler);

exports['default'] = new _ImmediateScheduler2['default']();
module.exports = exports['default'];
},{"./ImmediateScheduler":101}],107:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NextTickScheduler = require('./NextTickScheduler');

var _NextTickScheduler2 = _interopRequireDefault(_NextTickScheduler);

exports['default'] = new _NextTickScheduler2['default']();
module.exports = exports['default'];
},{"./NextTickScheduler":103}],108:[function(require,module,exports){
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
},{"../Subject":4}],109:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subject2 = require('../Subject');

var _Subject3 = _interopRequireDefault(_Subject2);

var GroupSubject = (function (_Subject) {
    _inherits(GroupSubject, _Subject);

    function GroupSubject(key) {
        _classCallCheck(this, GroupSubject);

        _Subject.call(this);
        this.key = key;
    }

    return GroupSubject;
})(_Subject3['default']);

exports['default'] = GroupSubject;
module.exports = exports['default'];
},{"../Subject":4}],110:[function(require,module,exports){
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
        this._getEvents(now);
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
},{"../Subject":4,"../schedulers/immediate":106}],111:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscription2 = require('../Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

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
        var subscriberIndex = observers.indexOf(this.observer);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };

    return SubjectSubscription;
})(_Subscription3['default']);

exports['default'] = SubjectSubscription;
module.exports = exports['default'];
},{"../Subscription":6}],112:[function(require,module,exports){
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
            if (values.hasOwnProperty(key)) {
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
},{}],113:[function(require,module,exports){
/**
All credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
"use strict";

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
            setImmediate;
        // Don't get fooled by e.g. browserify environments.
        if (({}).toString.call(global.process) === "[object process]") {
            // For Node.js before 0.9
            setImmediate = installNextTickImplementation();
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            setImmediate = installPostMessageImplementation();
        } else if (global.MessageChannel) {
            // For web workers, where supported
            setImmediate = installMessageChannelImplementation();
        } else if (doc && "onreadystatechange" in doc.createElement("script")) {
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
                if (typeof handler === "function") {
                    handler.apply(undefined, args);
                } else {
                    new Function("" + handler)();
                }
            };
        }
        function runIfPresent(handle) {
            // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
            // So if we're currently running a task, we'll need to delay this invocation.
            if (currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // "too much recursion" error.
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
                global.postMessage("", "*");
                global.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
        }
        function installPostMessageImplementation() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
            var messagePrefix = "setImmediate$" + Math.random() + "$";
            var onGlobalMessage = function onGlobalMessage(event) {
                if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };
            if (global.addEventListener) {
                global.addEventListener("message", onGlobalMessage, false);
            } else {
                global.attachEvent("onmessage", onGlobalMessage);
            }
            return function setImmediate() {
                var handle = addFromSetImmediateArguments(arguments);
                global.postMessage(messagePrefix + handle, "*");
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
                var script = doc.createElement("script");
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
},{"./root":123}],114:[function(require,module,exports){
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
},{"./root":123}],115:[function(require,module,exports){
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
},{"./root":123}],116:[function(require,module,exports){
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
},{"./root":123}],117:[function(require,module,exports){
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
},{}],118:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var errorObject = { e: {} };
exports.errorObject = errorObject;
},{}],119:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = isDate;

function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}

module.exports = exports["default"];
},{}],120:[function(require,module,exports){
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
},{}],121:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = noop;

function noop() {}

module.exports = exports["default"];
},{}],122:[function(require,module,exports){
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
},{}],123:[function(require,module,exports){
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
},{}],124:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = throwError;

function throwError(e) {
  throw e;
}

module.exports = exports["default"];
},{}],125:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = tryCatch;

var _errorObject = require('./errorObject');

var tryCatchTarget;
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
},{"./errorObject":118}],126:[function(require,module,exports){
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
},{}],127:[function(require,module,exports){
(function (global){
(function(root, factory) {
    root.Rx = factory();
} (window || global || this, function() {
    return require('../dist/cjs/Rx');
}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../dist/cjs/Rx":3}]},{},[127]);
