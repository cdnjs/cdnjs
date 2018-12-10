(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RxPlayer"] = factory();
	else
		root["RxPlayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = __webpack_require__(353);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root_1 = __webpack_require__(15);
	var SymbolShim_1 = __webpack_require__(27);
	var toSubscriber_1 = __webpack_require__(341);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = function () {
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
	        var operator = this.operator;
	        var subscriber = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            subscriber.add(this._subscribe(this.operator.call(subscriber)));
	        } else {
	            subscriber.add(this._subscribe(subscriber));
	        }
	        return subscriber;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {any} [thisArg] a `this` context for the `next` handler function
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @returns {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, thisArg, PromiseCtor) {
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            } else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        var nextHandler;
	        if (thisArg) {
	            nextHandler = function nextHandlerFn(value) {
	                var _a = nextHandlerFn,
	                    thisArg = _a.thisArg,
	                    next = _a.next;
	                return next.call(thisArg, value);
	            };
	            nextHandler.thisArg = thisArg;
	            nextHandler.next = next;
	        } else {
	            nextHandler = next;
	        }
	        var promiseCallback = function promiseCallbackFn(resolve, reject) {
	            var _a = promiseCallbackFn,
	                source = _a.source,
	                nextHandler = _a.nextHandler;
	            source.subscribe(nextHandler, reject, resolve);
	        };
	        promiseCallback.source = this;
	        promiseCallback.nextHandler = nextHandler;
	        return new PromiseCtor(promiseCallback);
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * @method Symbol.observable
	     * @returns {Observable} this instance of the observable
	     * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     */
	    Observable.prototype[SymbolShim_1.SymbolShim.observable] = function () {
	        return this;
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
	}();
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var noop_1 = __webpack_require__(40);
	var throwError_1 = __webpack_require__(91);
	var tryOrThrowError_1 = __webpack_require__(342);
	var Subscription_1 = __webpack_require__(9);
	var rxSubscriber_1 = __webpack_require__(37);
	var Observer_1 = __webpack_require__(137);
	var Subscriber = function (_super) {
	    __extends(Subscriber, _super);
	    function Subscriber(destination) {
	        if (destination === void 0) {
	            destination = Observer_1.empty;
	        }
	        _super.call(this);
	        this.isStopped = false;
	        this.destination = destination;
	        if (!destination || destination instanceof Subscriber || destination === Observer_1.empty) {
	            return;
	        }
	        if (typeof destination.next !== 'function') {
	            destination.next = noop_1.noop;
	        }
	        if (typeof destination.error !== 'function') {
	            destination.error = throwError_1.throwError;
	        }
	        if (typeof destination.complete !== 'function') {
	            destination.complete = noop_1.noop;
	        }
	    }
	    Subscriber.create = function (next, error, complete) {
	        return new SafeSubscriber(next, error, complete);
	    };
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () {
	        return this;
	    };
	    return Subscriber;
	}(Subscription_1.Subscription);
	exports.Subscriber = Subscriber;
	var SafeSubscriber = function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(next, error, complete) {
	        _super.call(this);
	        this._next = typeof next === 'function' && tryOrThrowError_1.tryOrThrowError(next) || null;
	        this._error = typeof error === 'function' && tryOrThrowError_1.tryOrThrowError(error) || throwError_1.throwError;
	        this._complete = typeof complete === 'function' && tryOrThrowError_1.tryOrThrowError(complete) || null;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            this._next(value);
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            if (this._error) {
	                this._error(err);
	            }
	            this.unsubscribe();
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            if (this._complete) {
	                this._complete();
	            }
	            this.unsubscribe();
	        }
	    };
	    return SafeSubscriber;
	}(Subscriber);
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var errorObject_1 = __webpack_require__(3);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    } catch (e) {
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
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var OuterSubscriber = function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber);
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root_1 = __webpack_require__(15);
	var isArray_1 = __webpack_require__(14);
	var isPromise_1 = __webpack_require__(52);
	var Observable_1 = __webpack_require__(1);
	var SymbolShim_1 = __webpack_require__(27);
	var InnerSubscriber_1 = __webpack_require__(136);
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
	        } else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    } else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.isUnsubscribed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) {
	            return destination.error(err);
	        }).then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () {
	                throw err;
	            });
	        });
	        return destination;
	    } else if (typeof result[SymbolShim_1.SymbolShim.iterator] === 'function') {
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
	    } else if (typeof result[SymbolShim_1.SymbolShim.observable] === 'function') {
	        var obs = result[SymbolShim_1.SymbolShim.observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error('invalid observable');
	        } else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    } else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function AssertionError(message) {
	  this.name = "AssertionError";
	  this.message = message;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, AssertionError);
	  }
	}
	AssertionError.prototype = new Error();

	function assert(value, message) {
	  if (!value) throw new AssertionError(message);
	}

	assert.equal = function (a, b, message) {
	  return assert(a === b, message);
	};

	assert.iface = function (o, name, iface) {
	  assert(o, name + " should be an object");
	  for (var k in iface) {
	    assert.equal(_typeof(o[k]), iface[k], name + " should have property " + k + " as a " + iface[k]);
	  }
	};

	module.exports = assert;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* tslint:disable:no-unused-variable */
	// Subject imported before Observable to bypass circular dependency issue since
	// Subject extends Observable and Observable references Subject in it's
	// definition
	var Subject_1 = __webpack_require__(10);
	exports.Subject = Subject_1.Subject;
	/* tslint:enable:no-unused-variable */
	var Observable_1 = __webpack_require__(1);
	exports.Observable = Observable_1.Observable;
	// statics
	/* tslint:disable:no-use-before-declare */
	__webpack_require__(161);
	__webpack_require__(163);
	__webpack_require__(188);
	__webpack_require__(201);
	__webpack_require__(139);
	__webpack_require__(140);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(235);
	//operators
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(162);
	__webpack_require__(164);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(173);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(176);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(200);
	__webpack_require__(199);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(209);
	__webpack_require__(210);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(216);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(220);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(236);
	__webpack_require__(237);
	/* tslint:disable:no-unused-variable */
	var Operator_1 = __webpack_require__(138);
	exports.Operator = Operator_1.Operator;
	var Subscription_1 = __webpack_require__(9);
	exports.Subscription = Subscription_1.Subscription;
	var Subscriber_1 = __webpack_require__(2);
	exports.Subscriber = Subscriber_1.Subscriber;
	var AsyncSubject_1 = __webpack_require__(36);
	exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
	var ReplaySubject_1 = __webpack_require__(86);
	exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
	var BehaviorSubject_1 = __webpack_require__(85);
	exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
	var ConnectableObservable_1 = __webpack_require__(72);
	exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
	var Notification_1 = __webpack_require__(35);
	exports.Notification = Notification_1.Notification;
	var EmptyError_1 = __webpack_require__(38);
	exports.EmptyError = EmptyError_1.EmptyError;
	var ArgumentOutOfRangeError_1 = __webpack_require__(87);
	exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
	var ObjectUnsubscribedError_1 = __webpack_require__(88);
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
	var asap_1 = __webpack_require__(11);
	var queue_1 = __webpack_require__(84);
	var rxSubscriber_1 = __webpack_require__(37);
	/* tslint:enable:no-unused-variable */
	/* tslint:disable:no-var-keyword */
	var Scheduler = {
	    asap: asap_1.asap,
	    queue: queue_1.queue
	};
	exports.Scheduler = Scheduler;
	var _Symbol = {
	    rxSubscriber: rxSubscriber_1.rxSubscriber
	};
	exports.Symbol = _Symbol;
	/* tslint:enable:no-var-keyword */
	//# sourceMappingURL=Rx.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isArray_1 = __webpack_require__(14);
	var isObject_1 = __webpack_require__(90);
	var isFunction_1 = __webpack_require__(89);
	var Subscription = function () {
	    function Subscription(_unsubscribe) {
	        this.isUnsubscribed = false;
	        if (_unsubscribe) {
	            this._unsubscribe = _unsubscribe;
	        }
	    }
	    Subscription.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var _a = this,
	            _unsubscribe = _a._unsubscribe,
	            _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            _unsubscribe.call(this);
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var subscription = _subscriptions[index];
	                if (isObject_1.isObject(subscription)) {
	                    subscription.unsubscribe();
	                }
	            }
	        }
	    };
	    Subscription.prototype.add = function (subscription) {
	        // return early if:
	        //  1. the subscription is null
	        //  2. we're attempting to add our this
	        //  3. we're attempting to add the static `empty` Subscription
	        if (!subscription || subscription === this || subscription === Subscription.EMPTY) {
	            return;
	        }
	        var sub = subscription;
	        switch (typeof subscription === 'undefined' ? 'undefined' : _typeof(subscription)) {
	            case 'function':
	                sub = new Subscription(subscription);
	            case 'object':
	                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                } else if (this.isUnsubscribed) {
	                    sub.unsubscribe();
	                } else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
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
	    Subscription.EMPTY = function (empty) {
	        empty.isUnsubscribed = true;
	        return empty;
	    }(new Subscription());
	    return Subscription;
	}();
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var Subscriber_1 = __webpack_require__(2);
	var Subscription_1 = __webpack_require__(9);
	var SubjectSubscription_1 = __webpack_require__(335);
	var rxSubscriber_1 = __webpack_require__(37);
	var Subject = function (_super) {
	    __extends(Subject, _super);
	    function Subject(source, destination) {
	        _super.call(this);
	        this.observers = [];
	        this.isUnsubscribed = false;
	        this.isStopped = false;
	        this.hasErrored = false;
	        this.dispatching = false;
	        this.hasCompleted = false;
	        this.source = source;
	        this.destination = destination;
	    }
	    Subject.prototype.lift = function (operator) {
	        var subject = new Subject(this, this.destination || this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.add = function (subscription) {
	        Subscription_1.Subscription.prototype.add.call(this, subscription);
	    };
	    Subject.prototype.remove = function (subscription) {
	        Subscription_1.Subscription.prototype.remove.call(this, subscription);
	    };
	    Subject.prototype.unsubscribe = function () {
	        Subscription_1.Subscription.prototype.unsubscribe.call(this);
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.source) {
	            return this.source.subscribe(subscriber);
	        } else {
	            if (subscriber.isUnsubscribed) {
	                return;
	            } else if (this.hasErrored) {
	                return subscriber.error(this.errorValue);
	            } else if (this.hasCompleted) {
	                return subscriber.complete();
	            } else if (this.isUnsubscribed) {
	                throw new Error('Cannot subscribe to a disposed Subject.');
	            }
	            var subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	            this.observers.push(subscriber);
	            return subscription;
	        }
	    };
	    Subject.prototype._unsubscribe = function () {
	        this.source = null;
	        this.isStopped = true;
	        this.observers = null;
	        this.destination = null;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.isStopped) {
	            return;
	        }
	        this.dispatching = true;
	        this._next(value);
	        this.dispatching = false;
	        if (this.hasErrored) {
	            this._error(this.errorValue);
	        } else if (this.hasCompleted) {
	            this._complete();
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.isStopped) {
	            return;
	        }
	        this.isStopped = true;
	        this.hasErrored = true;
	        this.errorValue = err;
	        if (this.dispatching) {
	            return;
	        }
	        this._error(err);
	    };
	    Subject.prototype.complete = function () {
	        if (this.isStopped) {
	            return;
	        }
	        this.isStopped = true;
	        this.hasCompleted = true;
	        if (this.dispatching) {
	            return;
	        }
	        this._complete();
	    };
	    Subject.prototype._next = function (value) {
	        if (this.destination) {
	            this.destination.next(value);
	        } else {
	            this._finalNext(value);
	        }
	    };
	    Subject.prototype._finalNext = function (value) {
	        var index = -1;
	        var observers = this.observers.slice(0);
	        var len = observers.length;
	        while (++index < len) {
	            observers[index].next(value);
	        }
	    };
	    Subject.prototype._error = function (err) {
	        if (this.destination) {
	            this.destination.error(err);
	        } else {
	            this._finalError(err);
	        }
	    };
	    Subject.prototype._finalError = function (err) {
	        var index = -1;
	        var observers = this.observers;
	        // optimization to block our SubjectSubscriptions from
	        // splicing themselves out of the observers list one by one.
	        this.observers = null;
	        this.isUnsubscribed = true;
	        if (observers) {
	            var len = observers.length;
	            while (++index < len) {
	                observers[index].error(err);
	            }
	        }
	        this.isUnsubscribed = false;
	        this.unsubscribe();
	    };
	    Subject.prototype._complete = function () {
	        if (this.destination) {
	            this.destination.complete();
	        } else {
	            this._finalComplete();
	        }
	    };
	    Subject.prototype._finalComplete = function () {
	        var index = -1;
	        var observers = this.observers;
	        // optimization to block our SubjectSubscriptions from
	        // splicing themselves out of the observers list one by one.
	        this.observers = null;
	        this.isUnsubscribed = true;
	        if (observers) {
	            var len = observers.length;
	            while (++index < len) {
	                observers[index].complete();
	            }
	        }
	        this.isUnsubscribed = false;
	        this.unsubscribe();
	    };
	    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
	        return new Subscriber_1.Subscriber(this);
	    };
	    Subject.create = function (source, destination) {
	        return new Subject(source, destination);
	    };
	    return Subject;
	}(Observable_1.Observable);
	exports.Subject = Subject;
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AsapScheduler_1 = __webpack_require__(333);
	exports.asap = new AsapScheduler_1.AsapScheduler();
	//# sourceMappingURL=asap.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var ScalarObservable_1 = __webpack_require__(46);
	var empty_1 = __webpack_require__(25);
	var isScheduler_1 = __webpack_require__(19);
	var ArrayObservable = function (_super) {
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
	        } else {
	            scheduler = null;
	        }
	        var len = array.length;
	        if (len > 1) {
	            return new ArrayObservable(array, scheduler);
	        } else if (len === 1) {
	            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
	        } else {
	            return new empty_1.EmptyObservable(scheduler);
	        }
	    };
	    ArrayObservable.dispatch = function (state) {
	        var array = state.array,
	            index = state.index,
	            count = state.count,
	            subscriber = state.subscriber;
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
	            return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                array: array, index: index, count: count, subscriber: subscriber
	            });
	        } else {
	            for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1.Observable);
	exports.ArrayObservable = ArrayObservable;
	//# sourceMappingURL=fromArray.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	var Levels = {
	  NONE: 0,
	  ERROR: 1,
	  WARNING: 2,
	  INFO: 3,
	  DEBUG: 4
	};
	var noop = function noop() {};

	function log() {}
	log.error = noop;
	log.warn = noop;
	log.info = noop;
	log.debug = noop;
	log.setLevel = function (level) {
	  if (typeof level == "string") {
	    level = Levels[level];
	  }

	  log.error = level >= Levels.ERROR ? console.error.bind(console) : noop;
	  log.warn = level >= Levels.WARNING ? console.warn.bind(console) : noop;
	  log.info = level >= Levels.INFO ? console.info.bind(console) : noop;
	  log.debug = level >= Levels.DEBUG ? console.log.bind(console) : noop;
	};

	module.exports = log;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.isArray = Array.isArray || function (x) {
	  return x && typeof x.length === 'number';
	};
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self || objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window;
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global === 'undefined' ? 'undefined' : _typeof(global)] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(343)(module), (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(66),
	    isLength = __webpack_require__(22),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	exports.isScheduler = isScheduler;
	//# sourceMappingURL=isScheduler.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var flatten = __webpack_require__(43);
	var log = __webpack_require__(13);
	var EventEmitter = __webpack_require__(41);

	var _require = __webpack_require__(28);

	var bytesToStr = _require.bytesToStr;
	var strToBytes = _require.strToBytes;

	var assert = __webpack_require__(7);

	var _require2 = __webpack_require__(8);

	var Observable = _require2.Observable;
	var merge = Observable.merge;
	var never = Observable.never;
	var fromEvent = Observable.fromEvent;

	var _require3 = __webpack_require__(21);

	var on = _require3.on;

	var find = __webpack_require__(29);
	var castToObservable = __webpack_require__(96);

	var doc = document;
	var win = window;

	var PREFIXES = ["", "webkit", "moz", "ms"];

	var HTMLElement_ = win.HTMLElement;
	var HTMLVideoElement_ = win.HTMLVideoElement;

	var MediaSource_ = win.MediaSource || win.MozMediaSource || win.WebKitMediaSource || win.MSMediaSource;

	var MediaKeys_ = win.MediaKeys || win.MozMediaKeys || win.WebKitMediaKeys || win.MSMediaKeys;

	var isIE = navigator.appName == "Microsoft Internet Explorer" || navigator.appName == "Netscape" && /(Trident|Edge)\//.test(navigator.userAgent);

	var HAVE_METADATA = 1;
	var HAVE_ENOUGH_DATA = 4;

	var MockMediaKeys = function MockMediaKeys() {};

	var requestMediaKeySystemAccess = undefined;
	if (navigator.requestMediaKeySystemAccess) {
	  requestMediaKeySystemAccess = function requestMediaKeySystemAccess(a, b) {
	    return castToObservable(navigator.requestMediaKeySystemAccess(a, b));
	  };
	}

	// @implement interface MediaKeySystemAccess

	var KeySystemAccess = function () {
	  function KeySystemAccess(keyType, mediaKeys, mediaKeySystemConfiguration) {
	    _classCallCheck(this, KeySystemAccess);

	    this._keyType = keyType;
	    this._mediaKeys = mediaKeys;
	    this._configuration = mediaKeySystemConfiguration;
	  }

	  KeySystemAccess.prototype.createMediaKeys = function createMediaKeys() {
	    return Observable.of(this._mediaKeys);
	  };

	  KeySystemAccess.prototype.getConfiguration = function getConfiguration() {
	    return this._configuration;
	  };

	  _createClass(KeySystemAccess, [{
	    key: "keySystem",
	    get: function get() {
	      return this._keyType;
	    }
	  }]);

	  return KeySystemAccess;
	}();

	function isEventSupported(element, eventNameSuffix) {
	  var clone = document.createElement(element.tagName);
	  var eventName = "on" + eventNameSuffix;
	  if (eventName in clone) {
	    return true;
	  } else {
	    clone.setAttribute(eventName, "return;");
	    return typeof clone[eventName] == "function";
	  }
	}

	function eventPrefixed(eventNames, prefixes) {
	  return flatten(eventNames.map(function (name) {
	    return (prefixes || PREFIXES).map(function (p) {
	      return p + name;
	    });
	  }));
	}

	function findSupportedEvent(element, eventNames) {
	  return find(eventNames, function (name) {
	    return isEventSupported(element, name);
	  });
	}

	function compatibleListener(eventNames, prefixes) {
	  var mem = undefined;
	  eventNames = eventPrefixed(eventNames, prefixes);
	  return function (element) {
	    // if the element is a HTMLElement we can detect
	    // the supported event, and memoize it in `mem`
	    if (element instanceof HTMLElement_) {
	      if (typeof mem == "undefined") {
	        mem = findSupportedEvent(element, eventNames) || null;
	      }

	      if (mem) {
	        return fromEvent(element, mem);
	      } else {
	        if (false) {
	          log.warn("compat: element <" + element.tagName + "> does not support any of these events: " + eventNames.join(", "));
	        }
	        return never();
	      }
	    }

	    // otherwise, we need to listen to all the events
	    // and merge them into one observable sequence
	    return on(element, eventNames);
	  };
	}

	function isCodecSupported(codec) {
	  return !!MediaSource_ && MediaSource_.isTypeSupported(codec);
	}

	// On IE11, we use the "progress" instead of "loadedmetadata" to set
	// the "currentTime.
	//
	// Internet Explorer emits an error when setting the "currentTime"
	// before a "progress" event sent just after the "loadedmetadata"
	// after receiving the first init-segments. Other browsers do not
	// even send this "progress" before receiving the first data-segment.
	//
	// TODO(pierre): try to find a solution without "browser sniffing"...
	var loadedMetadataEvent = compatibleListener(["loadedmetadata"]);
	var sourceOpenEvent = compatibleListener(["sourceopen", "webkitsourceopen"]);
	var onEncrypted = compatibleListener(["encrypted", "needkey"]);
	var onKeyMessage = compatibleListener(["keymessage", "message"]);
	var onKeyAdded = compatibleListener(["keyadded", "ready"]);
	var onKeyError = compatibleListener(["keyerror", "error"]);
	var onKeyStatusesChange = compatibleListener(["keystatuseschange"]);
	var emeEvents = {
	  onEncrypted: onEncrypted,
	  onKeyMessage: onKeyMessage,
	  onKeyStatusesChange: onKeyStatusesChange,
	  onKeyError: onKeyError
	};

	function shouldRenewMediaKeys() {
	  return isIE;
	}

	function sourceOpen(mediaSource) {
	  if (mediaSource.readyState == "open") {
	    return Observable.of(null);
	  } else {
	    return sourceOpenEvent(mediaSource).take(1);
	  }
	}

	function canSeek(videoElement) {
	  if (videoElement.readyState >= HAVE_METADATA) {
	    return Observable.of(null);
	  } else {
	    return loadedMetadataEvent(videoElement).take(1);
	  }
	}

	function canPlay(videoElement) {
	  if (videoElement.readyState >= HAVE_ENOUGH_DATA) {
	    return Observable.of(null);
	  } else {
	    return on(videoElement, "canplay").take(1);
	  }
	}

	// Wrap "MediaKeys.prototype.update" form an event based system to a
	// Promise based function.
	function wrapUpdate(memUpdate, sessionObj) {

	  function KeySessionError() {
	    var err = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (err.errorCode) {
	      err = {
	        systemCode: err.systemCode,
	        code: err.errorCode.code
	      };
	    }
	    this.name = "KeySessionError";
	    this.mediaKeyError = err;
	    this.message = "MediaKeyError code:" + err.code + " and systemCode:" + err.systemCode;
	  }
	  KeySessionError.prototype = new Error();

	  return function (license, sessionId) {
	    var session = typeof sessionObj == "function" ? sessionObj.call(this) : this;

	    var keys = onKeyAdded(session);
	    var errs = onKeyError(session).map(function (evt) {
	      throw new KeySessionError(session.error || evt);
	    });

	    try {
	      memUpdate.call(this, license, sessionId);
	      return merge(keys, errs).take(1);
	    } catch (e) {
	      return Observable.throw(e);
	    }
	  };
	}

	// Browser without any MediaKeys object: A mock for MediaKey and
	// MediaKeySession are created, and the <video>.addKey api is used to
	// pass the license.
	//
	// This is for Chrome with unprefixed EME api
	if (!requestMediaKeySystemAccess && HTMLVideoElement_.prototype.webkitGenerateKeyRequest) {
	  (function () {

	    // Mock MediaKeySession interface for old chrome implementation
	    // of the EME specifications
	    var MockMediaKeySession = function MockMediaKeySession(video, keySystem) {
	      var _this = this;

	      EventEmitter.call(this);

	      this.sessionId = "";
	      this._vid = video;
	      this._key = keySystem;
	      this._con = merge(onKeyMessage(video), onKeyAdded(video), onKeyError(video)).subscribe(function (evt) {
	        return _this.trigger(evt.type, evt);
	      });
	    };

	    MockMediaKeySession.prototype = _extends({}, EventEmitter.prototype, {

	      generateRequest: function generateRequest(initDataType, initData) {
	        this._vid.webkitGenerateKeyRequest(this._key, initData);
	      },

	      update: wrapUpdate(function (license, sessionId) {
	        if (this._key.indexOf("clearkey") >= 0) {
	          var json = JSON.parse(bytesToStr(license));
	          var key = strToBytes(atob(json.keys[0].k));
	          var kid = strToBytes(atob(json.keys[0].kid));
	          this._vid.webkitAddKey(this._key, key, kid, sessionId);
	        } else {
	          this._vid.webkitAddKey(this._key, license, null, sessionId);
	        }
	        this.sessionId = sessionId;
	      }),

	      close: function close() {
	        if (this._con) {
	          this._con.unsubscribe();
	        }
	        this._con = null;
	        this._vid = null;
	      }
	    });

	    MockMediaKeys = function MockMediaKeys(keySystem) {
	      this.ks_ = keySystem;
	    };

	    MockMediaKeys.prototype = {
	      _setVideo: function _setVideo(vid) {
	        this._vid = vid;
	      },
	      createSession: function createSession() /* sessionType */{
	        return new MockMediaKeySession(this._vid, this.ks_);
	      }
	    };

	    var isTypeSupported = function isTypeSupported(keyType) {
	      // get any <video> element from the DOM or create one
	      // and try the `canPlayType` method
	      var video = doc.querySelector("video") || doc.createElement("video");
	      if (video && video.canPlayType) {
	        return !!video.canPlayType("video/mp4", keyType);
	      } else {
	        return false;
	      }
	    };

	    requestMediaKeySystemAccess = function requestMediaKeySystemAccess(keyType, keySystemConfigurations) {
	      if (!isTypeSupported(keyType)) {
	        return Observable.throw();
	      }

	      for (var i = 0; i < keySystemConfigurations.length; i++) {
	        var keySystemConfiguration = keySystemConfigurations[i];
	        var videoCapabilities = keySystemConfiguration.videoCapabilities;
	        var audioCapabilities = keySystemConfiguration.audioCapabilities;
	        var initDataTypes = keySystemConfiguration.initDataTypes;
	        var sessionTypes = keySystemConfiguration.sessionTypes;
	        var distinctiveIdentifier = keySystemConfiguration.distinctiveIdentifier;
	        var persistentState = keySystemConfiguration.persistentState;


	        var supported = true;
	        supported = supported && (!initDataTypes || !!find(initDataTypes, function (initDataType) {
	          return initDataType === "cenc";
	        }));
	        supported = supported && (!sessionTypes || sessionTypes.filter(function (sessionType) {
	          return sessionType === "temporary";
	        }).length === sessionTypes.length);
	        supported = supported && distinctiveIdentifier !== "required";
	        supported = supported && persistentState !== "required";

	        if (supported) {
	          var keySystemConfigurationResponse = {
	            videoCapabilities: videoCapabilities,
	            audioCapabilities: audioCapabilities,
	            initDataTypes: ["cenc"],
	            distinctiveIdentifier: "not-allowed",
	            persistentState: "not-allowed",
	            sessionTypes: ["temporary"]
	          };

	          return Observable.of(new KeySystemAccess(keyType, new MockMediaKeys(keyType), keySystemConfigurationResponse));
	        }
	      }

	      return Observable.throw();
	    };
	  })();
	}

	// A MediaKeys object exist (or a mock) but no create function is
	// available. We need to add recent apis using Promises to mock the
	// most recent MediaKeys apis.
	// This is for IE11
	else if (MediaKeys_ && !requestMediaKeySystemAccess) {
	    (function () {

	      var SessionProxy = function SessionProxy(mk) {
	        EventEmitter.call(this);
	        this.sessionId = "";
	        this._mk = mk;
	      };

	      SessionProxy.prototype = _extends({}, EventEmitter.prototype, {

	        generateRequest: function generateRequest(initDataType, initData) {
	          var _this2 = this;

	          this._ss = this._mk.memCreateSession("video/mp4", initData);
	          this._con = merge(onKeyMessage(this._ss), onKeyAdded(this._ss), onKeyError(this._ss)).subscribe(function (evt) {
	            return _this2.trigger(evt.type, evt);
	          });
	        },

	        update: wrapUpdate(function (license, sessionId) {
	          assert(this._ss);
	          this._ss.update(license, sessionId);
	          this.sessionId = sessionId;
	        }, function () {
	          return this._ss;
	        }),

	        close: function close() {
	          if (this._ss) {
	            this._ss.close();
	            this._ss = null;
	          }
	          if (this._con) {
	            this._con.unsubscribe();
	            this._con = null;
	          }
	        }
	      });

	      // on IE11, each created session needs to be created on a new
	      // MediaKeys object
	      MediaKeys_.prototype.alwaysRenew = true;
	      MediaKeys_.prototype.memCreateSession = MediaKeys_.prototype.createSession;
	      MediaKeys_.prototype.createSession = function () {
	        return new SessionProxy(this);
	      };

	      requestMediaKeySystemAccess = function requestMediaKeySystemAccess(keyType, keySystemConfigurations) {
	        if (!MediaKeys_.isTypeSupported(keyType)) {
	          return Observable.throw();
	        }

	        for (var i = 0; i < keySystemConfigurations.length; i++) {
	          var keySystemConfiguration = keySystemConfigurations[i];
	          var videoCapabilities = keySystemConfiguration.videoCapabilities;
	          var audioCapabilities = keySystemConfiguration.audioCapabilities;
	          var initDataTypes = keySystemConfiguration.initDataTypes;
	          var distinctiveIdentifier = keySystemConfiguration.distinctiveIdentifier;


	          var supported = true;
	          supported = supported && (!initDataTypes || find(initDataTypes, function (idt) {
	            return idt === "cenc";
	          }));
	          supported = supported && distinctiveIdentifier !== "required";

	          if (supported) {
	            var keySystemConfigurationResponse = {
	              videoCapabilities: videoCapabilities,
	              audioCapabilities: audioCapabilities,
	              initDataTypes: ["cenc"],
	              distinctiveIdentifier: "not-allowed",
	              persistentState: "required",
	              sessionTypes: ["temporary", "persistent-license"]
	            };

	            return Observable.of(new KeySystemAccess(keyType, new MediaKeys_(keyType), keySystemConfigurationResponse));
	          }
	        }

	        return Observable.throw();
	      };
	    })();
	  }

	if (!MediaKeys_) {
	  var noMediaKeys = function noMediaKeys() {
	    throw new Error("eme: MediaKeys is not available");
	  };

	  MediaKeys_ = {
	    create: noMediaKeys,
	    isTypeSupported: noMediaKeys
	  };
	}

	function _setMediaKeys(elt, mk) {
	  if (mk instanceof MockMediaKeys) {
	    return mk._setVideo(elt);
	  }

	  if (elt.setMediaKeys) {
	    return elt.setMediaKeys(mk);
	  }

	  if (mk === null) {
	    return;
	  }

	  if (elt.WebkitSetMediaKeys) {
	    return elt.WebkitSetMediaKeys(mk);
	  }

	  if (elt.mozSetMediaKeys) {
	    return elt.mozSetMediaKeys(mk);
	  }

	  if (elt.msSetMediaKeys) {
	    return elt.msSetMediaKeys(mk);
	  }

	  throw new Error("compat: cannot find setMediaKeys method");
	}

	var setMediaKeys = function setMediaKeys(elt, mk) {
	  return castToObservable(_setMediaKeys(elt, mk));
	};

	if (win.WebKitSourceBuffer && !win.WebKitSourceBuffer.prototype.addEventListener) {

	  var SourceBuffer = win.WebKitSourceBuffer;
	  var SBProto = SourceBuffer.prototype;

	  for (var fnNAme in EventEmitter.prototype) {
	    SBProto[fnNAme] = EventEmitter.prototype[fnNAme];
	  }

	  SBProto.__listeners = [];

	  SBProto.appendBuffer = function (data) {
	    if (this.updating) {
	      throw new Error("SourceBuffer updating");
	    }
	    this.trigger("updatestart");
	    this.updating = true;
	    try {
	      this.append(data);
	    } catch (err) {
	      this.__emitUpdate("error", err);
	      return;
	    }
	    this.__emitUpdate("update");
	  };

	  SBProto.__emitUpdate = function (eventName, val) {
	    var _this3 = this;

	    setTimeout(function () {
	      _this3.trigger(eventName, val);
	      _this3.updating = false;
	      _this3.trigger("updateend");
	    }, 0);
	  };
	}

	function requestFullscreen(elt) {
	  if (!isFullscreen()) {
	    if (elt.requestFullscreen) {
	      elt.requestFullscreen();
	    } else if (elt.msRequestFullscreen) {
	      elt.msRequestFullscreen();
	    } else if (elt.mozRequestFullScreen) {
	      elt.mozRequestFullScreen();
	    } else if (elt.webkitRequestFullscreen) {
	      elt.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	  }
	}

	function exitFullscreen() {
	  if (isFullscreen()) {
	    if (doc.exitFullscreen) {
	      doc.exitFullscreen();
	    } else if (doc.msExitFullscreen) {
	      doc.msExitFullscreen();
	    } else if (doc.mozCancelFullScreen) {
	      doc.mozCancelFullScreen();
	    } else if (doc.webkitExitFullscreen) {
	      doc.webkitExitFullscreen();
	    }
	  }
	}

	function isFullscreen() {
	  return !!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
	}

	function visibilityChange() {
	  var prefix = undefined;
	  if (doc.hidden != null) {
	    prefix = "";
	  } else if (doc.mozHidden != null) {
	    prefix = "moz";
	  } else if (doc.msHidden != null) {
	    prefix = "ms";
	  } else if (doc.webkitHidden != null) {
	    prefix = "webkit";
	  }

	  var hidden = prefix ? prefix + "Hidden" : "hidden";
	  var visibilityChangeEvent = prefix + "visibilitychange";

	  return on(doc, visibilityChangeEvent).map(function () {
	    return doc[hidden];
	  });
	}

	function videoSizeChange() {
	  return on(win, "resize");
	}

	function clearVideoSrc(video) {
	  // On IE11 / Edge,  video.src = ""
	  // does not clear properly current MediaKey Session
	  // Microsoft recommended use to use video.removeAttr("src")
	  // instead. Since, video.removeAttr is not supported on
	  // other platforms, we have to make a compat function.
	  if (isIE) {
	    video.removeAttribute("src");
	  } else {
	    video.src = "";
	  }
	}

	function addTextTrack(video) {
	  var track = undefined,
	      trackElement = undefined;
	  var kind = "subtitles";
	  if (isIE) {
	    track = video.addTextTrack(kind);
	    track.mode = track.SHOWING;
	  } else {
	    // there is no removeTextTrack method... so we need to reuse old
	    // text-tracks objects and clean all its pending cues
	    trackElement = document.createElement("track");
	    track = trackElement.track;
	    trackElement.kind = "subtitles";
	    track.mode = "showing";
	    video.appendChild(trackElement);
	  }
	  return { track: track, trackElement: trackElement };
	}

	function isVTTSupported() {
	  return !isIE;
	}

	// On IE11, fullscreen change events is called MSFullscreenChange
	var onFullscreenChange = compatibleListener(["fullscreenchange", "FullscreenChange"], PREFIXES.concat("MS"));

	module.exports = {
	  HTMLVideoElement_: HTMLVideoElement_,
	  MediaSource_: MediaSource_,
	  isCodecSupported: isCodecSupported,
	  sourceOpen: sourceOpen,
	  canSeek: canSeek,
	  canPlay: canPlay,

	  KeySystemAccess: KeySystemAccess,
	  requestMediaKeySystemAccess: requestMediaKeySystemAccess,
	  setMediaKeys: setMediaKeys,
	  emeEvents: emeEvents,
	  shouldRenewMediaKeys: shouldRenewMediaKeys,

	  isFullscreen: isFullscreen,
	  onFullscreenChange: onFullscreenChange,
	  requestFullscreen: requestFullscreen,
	  exitFullscreen: exitFullscreen,

	  videoSizeChange: videoSizeChange,
	  visibilityChange: visibilityChange,

	  clearVideoSrc: clearVideoSrc,

	  addTextTrack: addTextTrack,
	  isVTTSupported: isVTTSupported,
	  isIE: isIE
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var fromEvent = Observable.fromEvent;
	var merge = Observable.merge;
	var timer = Observable.timer;

	var _require2 = __webpack_require__(54);

	var getBackedoffDelay = _require2.getBackedoffDelay;

	var log = __webpack_require__(13);
	var debounce = __webpack_require__(55);

	var observableProto = Observable.prototype;

	observableProto.log = function (ns, fn) {
	  if (!ns) ns = "";
	  return this.do(function (x) {
	    return log.debug(ns, "next", fn ? fn(x) : x);
	  }, function (e) {
	    return log.debug(ns, "error", e);
	  }, function () {
	    return log.debug(ns, "completed");
	  });
	};

	function retryWithBackoff(fn, _ref) {
	  var retryDelay = _ref.retryDelay;
	  var totalRetry = _ref.totalRetry;
	  var shouldRetry = _ref.shouldRetry;
	  var resetDelay = _ref.resetDelay;

	  var retryCount = 0;
	  var debounceRetryCount;
	  if (resetDelay > 0) {
	    debounceRetryCount = debounce(function () {
	      return retryCount = 0;
	    }, resetDelay);
	  }

	  return function doRetry() {
	    // do not leak arguments
	    for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) {
	      args[i] = arguments[i];
	    }return fn.apply(null, args).catch(function (err) {
	      var wantRetry = !shouldRetry || shouldRetry(err, retryCount);
	      if (!wantRetry || retryCount++ >= totalRetry) {
	        throw err;
	      }

	      var fuzzedDelay = getBackedoffDelay(retryDelay, retryCount);
	      return timer(fuzzedDelay).flatMap(function () {
	        debounceRetryCount && debounceRetryCount();
	        return doRetry.apply(null, args);
	      });
	    });
	  };
	}

	function on(elt, evts) {
	  if (Array.isArray(evts)) {
	    return merge.apply(null, evts.map(function (evt) {
	      return fromEvent(elt, evt);
	    }));
	  } else {
	    return fromEvent(elt, evts);
	  }
	}

	function first(obs) {
	  return obs.take(1);
	}

	function only(x) {
	  return Observable.never().startWith(x);
	}

	module.exports = {
	  on: on,
	  first: first,
	  only: only,
	  retryWithBackoff: retryWithBackoff
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(66),
	    isArrayLike = __webpack_require__(34),
	    isObject = __webpack_require__(18),
	    shimKeys = __webpack_require__(128);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var EmptyObservable = function (_super) {
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
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        } else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable);
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=empty.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ConnectableObservable_1 = __webpack_require__(72);
	function multicast(subjectOrSubjectFactory) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    } else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
	}
	exports.multicast = multicast;
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var root_1 = __webpack_require__(15);
	function polyfillSymbol(root) {
	    var _Symbol = ensureSymbol(root);
	    ensureIterator(_Symbol, root);
	    ensureObservable(_Symbol);
	    ensureFor(_Symbol);
	    return _Symbol;
	}
	exports.polyfillSymbol = polyfillSymbol;
	function ensureFor(_Symbol2) {
	    if (!_Symbol2.for) {
	        _Symbol2.for = symbolForPolyfill;
	    }
	}
	exports.ensureFor = ensureFor;
	var id = 0;
	function ensureSymbol(root) {
	    if (!root.Symbol) {
	        root.Symbol = function symbolFuncPolyfill(description) {
	            return "@@Symbol(" + description + "):" + id++;
	        };
	    }
	    return root.Symbol;
	}
	exports.ensureSymbol = ensureSymbol;
	function symbolForPolyfill(key) {
	    return '@@' + key;
	}
	exports.symbolForPolyfill = symbolForPolyfill;
	function ensureIterator(_Symbol3, root) {
	    if (!_Symbol3.iterator) {
	        if (typeof _Symbol3.for === 'function') {
	            _Symbol3.iterator = _Symbol3.for('iterator');
	        } else if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	            // Bug for mozilla version
	            _Symbol3.iterator = '@@iterator';
	        } else if (root.Map) {
	            // es6-shim specific logic
	            var keys = Object.getOwnPropertyNames(root.Map.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (key !== 'entries' && key !== 'size' && root.Map.prototype[key] === root.Map.prototype['entries']) {
	                    _Symbol3.iterator = key;
	                    break;
	                }
	            }
	        } else {
	            _Symbol3.iterator = '@@iterator';
	        }
	    }
	}
	exports.ensureIterator = ensureIterator;
	function ensureObservable(_Symbol4) {
	    if (!_Symbol4.observable) {
	        if (typeof _Symbol4.for === 'function') {
	            _Symbol4.observable = _Symbol4.for('observable');
	        } else {
	            _Symbol4.observable = '@@observable';
	        }
	    }
	}
	exports.ensureObservable = ensureObservable;
	exports.SymbolShim = polyfillSymbol(root_1.root);
	//# sourceMappingURL=SymbolShim.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var assert = __webpack_require__(7);

	function totalBytes(arr) {
	  var tot = 0;
	  for (var i = 0; i < arr.length; i++) {
	    tot += arr[i].byteLength;
	  }
	  return tot;
	}

	function strToBytes(str) {
	  var len = str.length;
	  var arr = new Uint8Array(len);
	  for (var i = 0; i < len; i++) {
	    arr[i] = str.charCodeAt(i) & 0xFF;
	  }
	  return arr;
	}

	function bytesToStr(bytes) {
	  return String.fromCharCode.apply(null, bytes);
	}

	function bytesToUTF16Str(bytes) {
	  var str = "";
	  var len = bytes.length;
	  for (var i = 0; i < len; i += 2) {
	    str += String.fromCharCode(bytes[i]);
	  }return str;
	}

	function hexToBytes(str) {
	  var len = str.length;
	  var arr = new Uint8Array(len / 2);
	  for (var i = 0, j = 0; i < len; i += 2, j++) {
	    arr[j] = parseInt(str.substr(i, 2), 16) & 0xFF;
	  }
	  return arr;
	}

	function bytesToHex(bytes, sep) {
	  if (!sep) sep = "";
	  var hex = "";
	  for (var i = 0; i < bytes.byteLength; i++) {
	    hex += (bytes[i] >>> 4).toString(16);
	    hex += (bytes[i] & 0xF).toString(16);
	    if (sep.length) hex += sep;
	  }
	  return hex;
	}

	function concat() {
	  var l = arguments.length,
	      i = -1;
	  var len = 0,
	      arg;
	  while (++i < l) {
	    arg = arguments[i];
	    len += typeof arg === "number" ? arg : arg.length;
	  }
	  var arr = new Uint8Array(len);
	  var off = 0;
	  i = -1;
	  while (++i < l) {
	    arg = arguments[i];
	    if (typeof arg === "number") {
	      off += arg;
	    } else if (arg.length > 0) {
	      arr.set(arg, off);
	      off += arg.length;
	    }
	  }
	  return arr;
	}

	function be2toi(bytes, off) {
	  return (bytes[0 + off] << 8) + (bytes[1 + off] << 0);
	}

	function be4toi(bytes, off) {
	  return bytes[0 + off] * 0x1000000 + bytes[1 + off] * 0x0010000 + bytes[2 + off] * 0x0000100 + bytes[3 + off];
	}

	function be8toi(bytes, off) {
	  return (bytes[0 + off] * 0x1000000 + bytes[1 + off] * 0x0010000 + bytes[2 + off] * 0x0000100 + bytes[3 + off]) * 0x100000000 + bytes[4 + off] * 0x1000000 + bytes[5 + off] * 0x0010000 + bytes[6 + off] * 0x0000100 + bytes[7 + off];
	}

	function itobe2(num) {
	  return new Uint8Array([num >>> 8 & 0xFF, num & 0xFF]);
	}

	function itobe4(num) {
	  return new Uint8Array([num >>> 24 & 0xFF, num >>> 16 & 0xFF, num >>> 8 & 0xFF, num & 0xFF]);
	}

	function itobe8(num) {
	  var l = num % 0x100000000;
	  var h = (num - l) / 0x100000000;
	  return new Uint8Array([h >>> 24 & 0xFF, h >>> 16 & 0xFF, h >>> 8 & 0xFF, h & 0xFF, l >>> 24 & 0xFF, l >>> 16 & 0xFF, l >>> 8 & 0xFF, l & 0xFF]);
	}

	function le2toi(bytes, off) {
	  return (bytes[0 + off] << 0) + (bytes[1 + off] << 8);
	}

	function le4toi(bytes, off) {
	  return bytes[0 + off] + bytes[1 + off] * 0x0000100 + bytes[2 + off] * 0x0010000 + bytes[3 + off] * 0x1000000;
	}

	function le8toi(bytes, off) {
	  return bytes[0 + off] + bytes[1 + off] * 0x0000100 + bytes[2 + off] * 0x0010000 + bytes[3 + off] * 0x1000000 + (bytes[4 + off] + bytes[5 + off] * 0x0000100 + bytes[6 + off] * 0x0010000 + bytes[7 + off] * 0x1000000 * 0x100000000);
	}

	function itole2(num) {
	  return new Uint8Array([num & 0xFF, num >>> 8 & 0xFF]);
	}

	function itole4(num) {
	  return new Uint8Array([num & 0xFF, num >>> 8 & 0xFF, num >>> 16 & 0xFF, num >>> 24 & 0xFF]);
	}

	function itole8(num) {
	  var l = num % 0x100000000;
	  var h = (num - l) / 0x100000000;
	  return new Uint8Array([h & 0xFF, h >>> 8 & 0xFF, h >>> 16 & 0xFF, h >>> 24 & 0xFF, l & 0xFF, l >>> 8 & 0xFF, l >>> 16 & 0xFF, l >>> 24 & 0xFF]);
	}

	function guidToUuid(uuid) {
	  assert.equal(uuid.length, 16, "UUID length should be 16");
	  var buf = strToBytes(uuid);

	  var p1A = buf[0];
	  var p1B = buf[1];
	  var p1C = buf[2];
	  var p1D = buf[3];
	  var p2A = buf[4];
	  var p2B = buf[5];
	  var p3A = buf[6];
	  var p3B = buf[7];
	  var p4 = buf.subarray(8, 10);
	  var p5 = buf.subarray(10, 16);

	  var ord = new Uint8Array(16);
	  ord[0] = p1D;ord[1] = p1C;ord[2] = p1B;ord[3] = p1A; // swap32 BE -> LE
	  ord[4] = p2B;ord[5] = p2A; // swap16 BE -> LE
	  ord[6] = p3B;ord[7] = p3A; // swap16 BE -> LE
	  ord.set(p4, 8);
	  ord.set(p5, 10);

	  return bytesToHex(ord);
	}

	function toBase64URL(str) {
	  return btoa(str).replace(/\=+$/, "");
	}

	module.exports = {
	  totalBytes: totalBytes,
	  strToBytes: strToBytes,
	  bytesToStr: bytesToStr, bytesToUTF16Str: bytesToUTF16Str,
	  hexToBytes: hexToBytes,
	  bytesToHex: bytesToHex,
	  concat: concat,
	  be2toi: be2toi, be4toi: be4toi, be8toi: be8toi,
	  le2toi: le2toi, le4toi: le4toi, le8toi: le8toi,
	  itobe2: itobe2, itobe4: itobe4, itobe8: itobe8,
	  itole2: itole2, itole4: itole4, itole8: itole8,
	  guidToUuid: guidToUuid,
	  toBase64URL: toBase64URL
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEach = __webpack_require__(106),
	    createFind = __webpack_require__(64);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) {
	 *   return chr.age < 40;
	 * }), 'user');
	 * // => 'barney'
	 *
	 * // using the `_.matches` callback shorthand
	 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.result(_.find(users, 'active', false), 'user');
	 * // => 'fred'
	 *
	 * // using the `_.property` callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'barney'
	 */
	var find = createFind(baseEach);

	module.exports = find;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(132),
	    assignDefaults = __webpack_require__(101),
	    createDefaults = __webpack_require__(123);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object for all destination properties that resolve to `undefined`. Once a
	 * property is set, additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var defaults = createDefaults(assign, assignDefaults);

	module.exports = defaults;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	var MergeAllOperator = function () {
	    function MergeAllOperator(concurrent) {
	        this.concurrent = concurrent;
	    }
	    MergeAllOperator.prototype.call = function (observer) {
	        return new MergeAllSubscriber(observer, this.concurrent);
	    };
	    return MergeAllOperator;
	}();
	exports.MergeAllOperator = MergeAllOperator;
	var MergeAllSubscriber = function (_super) {
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
	            } else {
	                this.active++;
	                this.add(subscribeToResult_1.subscribeToResult(this, observable));
	            }
	        } else {
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
	        } else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeAllSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	exports.MergeAllSubscriber = MergeAllSubscriber;
	//# sourceMappingURL=mergeAll-support.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);

	// Factor for rounding errors
	var EPSILON = 1 / 60;

	function nearlyEqual(a, b) {
	  return Math.abs(a - b) < EPSILON;
	}

	function nearlyLt(a, b) {
	  return a - b <= EPSILON;
	}

	function bufferedToArray(ranges) {
	  if (Array.isArray(ranges)) {
	    return ranges;
	  }

	  var l = ranges.length;
	  var a = Array(l);
	  var i = -1;
	  while (++i < l) {
	    a[i] = { start: ranges.start(i), end: ranges.end(i), bitrate: 0 };
	  }
	  return a;
	}

	function isPointInRange(r, point) {
	  return r.start <= point && point < r.end;
	}

	function findOverlappingRange(range, others) {
	  for (var i = 0; i < others.length; i++) {
	    if (areOverlappingRanges(range, others[i])) {
	      return others[i];
	    }
	  }
	  return null;
	}

	function areOverlappingRanges(r1, r2) {
	  return isPointInRange(r1, r2.start) || isPointInRange(r1, r2.end) || isPointInRange(r2, r1.start);
	}

	function isContainedInto(r1, r2) {
	  return isPointInRange(r1, r2.start) && isPointInRange(r1, r2.end);
	}

	function areContiguousWithRanges(r1, r2) {
	  return nearlyEqual(r2.start, r1.end) || nearlyEqual(r2.end, r1.start);
	}

	function unionWithOverlappingOrContiguousRange(r1, r2, bitrate) {
	  var start = Math.min(r1.start, r2.start);
	  var end = Math.max(r1.end, r2.end);
	  return { start: start, end: end, bitrate: bitrate };
	}

	function isOrdered(r1, r2) {
	  return r1.end <= r2.start;
	}

	function sameBitrate(r1, r2) {
	  return r1.bitrate === r2.bitrate;
	}

	function removeEmptyRanges(ranges) {
	  for (var index = 0; index < ranges.length; index++) {
	    var range = ranges[index];
	    if (range.start === range.end) {
	      ranges.splice(index++, 1);
	    }
	  }
	  return ranges;
	}

	function mergeContiguousRanges(ranges) {
	  for (var index = 1; index < ranges.length; index++) {
	    var prevRange = ranges[index - 1];
	    var currRange = ranges[index];
	    if (sameBitrate(prevRange, currRange) && areContiguousWithRanges(prevRange, currRange)) {
	      var unionRange = unionWithOverlappingOrContiguousRange(prevRange, currRange, currRange.bitrate);
	      ranges.splice(--index, 2, unionRange);
	    }
	  }
	  return ranges;
	}

	function insertInto(ranges, bitrate, start, end) {
	  assert(start <= end);
	  if (start == end) {
	    return ranges;
	  }

	  var addedRange = { start: start, end: end, bitrate: bitrate };

	  // For each present range check if we need to:
	  // - In case we are overlapping or contiguous:
	  //   - if added range has the same bitrate as the overlapped or
	  //     contiguous one, we can merge them
	  //   - if added range has a different bitrate we need to insert it
	  //     in place
	  // - Need to insert in place, we we are completely, not overlapping
	  //   and not contiguous in between two ranges.

	  var index = 0;
	  for (; index < ranges.length; index++) {
	    var currentRange = ranges[index];

	    var overlapping = areOverlappingRanges(addedRange, currentRange);
	    var contiguous = areContiguousWithRanges(addedRange, currentRange);

	    // We assume ranges are ordered and two ranges can not be
	    // completely overlapping.
	    if (overlapping || contiguous) {
	      // We need to merge the addedRange and that range.
	      if (sameBitrate(addedRange, currentRange)) {
	        addedRange = unionWithOverlappingOrContiguousRange(addedRange, currentRange, currentRange.bitrate);
	        ranges.splice(index--, 1);
	      }
	      // Overlapping ranges with different bitrates.
	      else if (overlapping) {
	          // Added range is contained in on existing range
	          if (isContainedInto(currentRange, addedRange)) {
	            ranges.splice(++index, 0, addedRange);
	            var memCurrentEnd = currentRange.end;
	            currentRange.end = addedRange.start;
	            addedRange = {
	              start: addedRange.end,
	              end: memCurrentEnd,
	              bitrate: currentRange.bitrate
	            };
	          }
	          // Added range contains one existing range
	          else if (isContainedInto(addedRange, currentRange)) {
	              ranges.splice(index--, 1);
	            } else if (currentRange.start < addedRange.start) {
	              currentRange.end = addedRange.start;
	            } else {
	              currentRange.start = addedRange.end;
	              break;
	            }
	        }
	        // Contiguous ranges with different bitrates.
	        else {
	            // do nothing
	            break;
	          }
	    } else {
	      // Check the case for which there is no more to do
	      if (index === 0) {
	        if (isOrdered(addedRange, ranges[0])) {
	          // First index, and we are completely before that range (and
	          // not contiguous, nor overlapping). We just need to be
	          // inserted here.
	          break;
	        }
	      } else {
	        if (isOrdered(ranges[index - 1], addedRange) && isOrdered(addedRange, currentRange)) {
	          // We are exactly after the current previous range, and
	          // before the current range, while not overlapping with none
	          // of them. Insert here.
	          break;
	        }
	      }
	    }
	  }

	  // Now that we are sure we don't overlap with any range, just add it.
	  ranges.splice(index, 0, addedRange);

	  return mergeContiguousRanges(removeEmptyRanges(ranges));
	}

	function rangesIntersect(ranges, others) {
	  for (var i = 0; i < ranges.length; i++) {
	    var range = ranges[i];
	    var overlappingRange = findOverlappingRange(range, others);
	    if (!overlappingRange) {
	      ranges.splice(i--, 1);
	      continue;
	    }
	    if (overlappingRange.start > range.start) {
	      range.start = overlappingRange.start;
	    }
	    if (overlappingRange.end < range.end) {
	      range.end = overlappingRange.end;
	    }
	  }
	  return ranges;
	}

	function rangesEquals(ranges, others) {
	  for (var i = 0; i < ranges.length; i++) {
	    var range = ranges[i];
	    var overlappingRange = findOverlappingRange(range, others);
	    if (!overlappingRange || overlappingRange.start > range.start || overlappingRange.end < range.end) {
	      return false;
	    }
	  }
	  return true;
	}

	var BufferedRanges = function () {
	  function BufferedRanges(ranges) {
	    _classCallCheck(this, BufferedRanges);

	    this.ranges = ranges ? bufferedToArray(ranges) : [];
	    this.length = this.ranges.length;
	  }

	  BufferedRanges.prototype.start = function start(i) {
	    return this.ranges[i].start;
	  };

	  BufferedRanges.prototype.end = function end(i) {
	    return this.ranges[i].end;
	  };

	  BufferedRanges.prototype.hasRange = function hasRange(startTime, duration) {
	    var endTime = startTime + duration;

	    for (var i = 0; i < this.ranges.length; i++) {
	      var _ranges$i = this.ranges[i];
	      var start = _ranges$i.start;
	      var end = _ranges$i.end;


	      if (nearlyLt(start, startTime) && nearlyLt(startTime, end) && nearlyLt(start, endTime) && nearlyLt(endTime, end)) {
	        return this.ranges[i];
	      }
	    }

	    return null;
	  };

	  /**
	   * Get range associated to given time
	   */


	  BufferedRanges.prototype.getRange = function getRange(time) {
	    for (var i = 0; i < this.ranges.length; i++) {
	      if (isPointInRange(this.ranges[i], time)) {
	        return this.ranges[i];
	      }
	    }
	    return null;
	  };

	  BufferedRanges.prototype.getOuterRanges = function getOuterRanges(time) {
	    var ranges = [];
	    for (var i = 0; i < this.ranges.length; i++) {
	      if (!isPointInRange(this.ranges[i], time)) {
	        ranges.push(this.ranges[i]);
	      }
	    }
	    return ranges;
	  };

	  /**
	   * Returns the time-gap between the buffered
	   * end limit and the given timestamp
	   */


	  BufferedRanges.prototype.getGap = function getGap(time) {
	    var range = this.getRange(time);
	    return range ? range.end - time : Infinity;
	  };

	  /**
	   * Return the time gap between the current time
	   * and the start of current range.
	   */


	  BufferedRanges.prototype.getLoaded = function getLoaded(time) {
	    var range = this.getRange(time);
	    return range ? time - range.start : 0;
	  };

	  /**
	   * Returns the total size of the current range.
	   */


	  BufferedRanges.prototype.getSize = function getSize(time) {
	    var range = this.getRange(time);
	    return range ? range.end - range.start : 0;
	  };

	  BufferedRanges.prototype.getNextRangeGap = function getNextRangeGap(time) {
	    var ranges = this.ranges;

	    var i = -1,
	        nextRangeStart = undefined;
	    while (++i < ranges.length) {
	      var start = ranges[i].start;
	      if (start > time) {
	        nextRangeStart = start;
	        break;
	      }
	    }

	    if (nextRangeStart != null) {
	      return nextRangeStart - time;
	    } else {
	      return Infinity;
	    }
	  };

	  BufferedRanges.prototype.insert = function insert(bitrate, start, end) {
	    if (false) {
	      assert(start >= 0);
	      assert(end - start > 0);
	    }
	    insertInto(this.ranges, bitrate, start, end);
	    this.length = this.ranges.length;
	    return this.ranges;
	  };

	  BufferedRanges.prototype.remove = function remove(start, end) {
	    if (false) {
	      assert(start >= 0);
	      assert(end - start > 0);
	    }
	    this.intersect(new BufferedRanges([{ start: 0, end: start }, { start: end, end: Infinity }]));
	  };

	  BufferedRanges.prototype.equals = function equals(others) {
	    if (false) {
	      assert(others instanceof BufferedRanges);
	    }

	    return rangesEquals(this.ranges, others.ranges);
	  };

	  BufferedRanges.prototype.intersect = function intersect(others) {
	    if (false) {
	      assert(others instanceof BufferedRanges);
	    }

	    rangesIntersect(this.ranges, others.ranges);
	    this.length = this.ranges.length;
	    return this.ranges;
	  };

	  return BufferedRanges;
	}();

	module.exports = {
	  bufferedToArray: bufferedToArray,
	  BufferedRanges: BufferedRanges
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(42);

	var resolveURL = _require.resolveURL;

	var LRUCache = __webpack_require__(370);
	var CACHE_SIZE = 100;

	var segmentsCache = new LRUCache(CACHE_SIZE);

	function isNumber(val) {
	  return typeof val == "number" && !isNaN(val) || !isNaN(+val) ? true : false;
	}

	function clearSegmentCache() {
	  segmentsCache = new LRUCache(CACHE_SIZE);
	}

	var Segment = function () {
	  Segment.create = function create(adaptation, representation, id, media, time, duration, number, range, indexRange, init) {

	    var segId = adaptation.id + "_" + representation.id + "_" + id;
	    var cachedSegment = segmentsCache.get(segId);

	    if (cachedSegment) {
	      return cachedSegment;
	    }

	    var segment = new Segment(adaptation, representation, segId, media, time, duration, number, range, indexRange, init);

	    segmentsCache.set(segId, segment);
	    return segment;
	  };

	  function Segment(adaptation, representation, id, media, time, duration, number, range, indexRange, init) {
	    _classCallCheck(this, Segment);

	    this.id = id;
	    this.ada = adaptation;
	    this.rep = representation;
	    this.time = isNumber(time) ? +time : -1;
	    this.duration = isNumber(duration) ? +duration : -1;
	    this.number = isNumber(number) ? +number : -1;
	    this.media = media ? "" + media : "";
	    this.range = Array.isArray(range) ? range : null;
	    this.indexRange = Array.isArray(indexRange) ? indexRange : null;
	    this.init = !!init;
	  }

	  Segment.prototype.getId = function getId() {
	    return this.id;
	  };

	  Segment.prototype.getAdaptation = function getAdaptation() {
	    return this.ada;
	  };

	  Segment.prototype.getRepresentation = function getRepresentation() {
	    return this.rep;
	  };

	  Segment.prototype.getTime = function getTime() {
	    return this.time;
	  };

	  Segment.prototype.getDuration = function getDuration() {
	    return this.duration;
	  };

	  Segment.prototype.getNumber = function getNumber() {
	    return this.number;
	  };

	  Segment.prototype.getMedia = function getMedia() {
	    return this.media;
	  };

	  Segment.prototype.getRange = function getRange() {
	    return this.range;
	  };

	  Segment.prototype.getIndexRange = function getIndexRange() {
	    return this.indexRange;
	  };

	  Segment.prototype.isInitSegment = function isInitSegment() {
	    return this.init;
	  };

	  Segment.prototype.getResolvedURL = function getResolvedURL() {
	    return resolveURL(this.ada.rootURL, this.ada.baseURL, this.rep.baseURL);
	  };

	  return Segment;
	}();

	var InitSegment = function (_Segment) {
	  _inherits(InitSegment, _Segment);

	  function InitSegment(adaptation, representation, media, range, indexRange) {
	    _classCallCheck(this, InitSegment);

	    return _possibleConstructorReturn(this, _Segment.call(this, adaptation, representation, adaptation.id + "_" + representation.id + "_init",
	    /* id */
	    media, /* media */
	    -1, /* time */
	    -1, /* duration */
	    -1, /* number */
	    range, /* range */
	    indexRange, /* indexRange */
	    true /* init */
	    ));
	  }

	  return InitSegment;
	}(Segment);

	module.exports = {
	  Segment: Segment,
	  InitSegment: InitSegment,
	  clearSegmentCache: clearSegmentCache
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(65),
	    isLength = __webpack_require__(22);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Observable_1 = __webpack_require__(1);
	var Notification = function () {
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
	        } else {
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
	}();
	exports.Notification = Notification;
	//# sourceMappingURL=Notification.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(10);
	var AsyncSubject = function (_super) {
	    __extends(AsyncSubject, _super);
	    function AsyncSubject() {
	        _super.apply(this, arguments);
	        this.value = null;
	        this.hasNext = false;
	    }
	    AsyncSubject.prototype._subscribe = function (subscriber) {
	        if (this.hasCompleted && this.hasNext) {
	            subscriber.next(this.value);
	        }
	        return _super.prototype._subscribe.call(this, subscriber);
	    };
	    AsyncSubject.prototype._next = function (value) {
	        this.value = value;
	        this.hasNext = true;
	    };
	    AsyncSubject.prototype._complete = function () {
	        var index = -1;
	        var observers = this.observers;
	        var len = observers.length;
	        // optimization to block our SubjectSubscriptions from
	        // splicing themselves out of the observers list one by one.
	        this.isUnsubscribed = true;
	        if (this.hasNext) {
	            while (++index < len) {
	                var o = observers[index];
	                o.next(this.value);
	                o.complete();
	            }
	        } else {
	            while (++index < len) {
	                observers[index].complete();
	            }
	        }
	        this.isUnsubscribed = false;
	        this.unsubscribe();
	    };
	    return AsyncSubject;
	}(Subject_1.Subject);
	exports.AsyncSubject = AsyncSubject;
	//# sourceMappingURL=AsyncSubject.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolShim_1 = __webpack_require__(27);
	/**
	 * rxSubscriber symbol is a symbol for retreiving an "Rx safe" Observer from an object
	 * "Rx safety" can be defined as an object that has all of the traits of an Rx Subscriber,
	 * including the ability to add and remove subscriptions to the subscription chain and
	 * guarantees involving event triggering (can't "next" after unsubscription, etc).
	 */
	exports.rxSubscriber = SymbolShim_1.SymbolShim.for('rxSubscriber');
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	var EmptyError = function () {
	    function EmptyError() {
	        this.name = 'EmptyError';
	        this.message = 'no elements in sequence';
	    }
	    return EmptyError;
	}();
	exports.EmptyError = EmptyError;
	//# sourceMappingURL=EmptyError.js.map

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	function isDate(value) {
	    return value instanceof Date && !isNaN(+value);
	}
	exports.isDate = isDate;
	//# sourceMappingURL=isDate.js.map

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	/* tslint:disable:no-empty */
	function noop() {}
	exports.noop = noop;
	//# sourceMappingURL=noop.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var assert = __webpack_require__(7);

	function EventEmitter() {
	  this.__listeners = {};
	}

	EventEmitter.prototype.addEventListener = function (evt, fn) {
	  assert(typeof fn == "function", "eventemitter: second argument should be a function");
	  if (!this.__listeners[evt]) this.__listeners[evt] = [];
	  this.__listeners[evt].push(fn);
	};

	EventEmitter.prototype.removeEventListener = function (evt, fn) {
	  if (arguments.length === 0) {
	    this.__listeners = {};
	    return;
	  }
	  if (!this.__listeners.hasOwnProperty(evt)) return;
	  if (arguments.length === 1) {
	    delete this.__listeners[evt];
	    return;
	  }
	  var listeners = this.__listeners[evt];
	  var index = listeners.indexOf(fn);
	  if (~index) listeners.splice(index, 1);
	  if (!listeners.length) delete this.__listeners[evt];
	};

	EventEmitter.prototype.trigger = function (evt, arg) {
	  if (!this.__listeners.hasOwnProperty(evt)) return;
	  var listeners = this.__listeners[evt].slice();
	  listeners.forEach(function (listener) {
	    try {
	      listener(arg);
	    } catch (e) {
	      console.error(e, e.stack);
	    }
	  });
	};

	// aliases
	EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;
	EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;

	module.exports = EventEmitter;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	var schemeRe = /^(?:[a-z]+:)?\/\//i;
	var selfDirRe = /\/[\.]{1,2}\//;

	function _normalizeUrl(url) {
	  // fast path if no ./ or ../ are present in the url
	  if (!selfDirRe.test(url)) {
	    return url;
	  }

	  var newUrl = [];
	  var oldUrl = url.split("/");
	  for (var i = 0, l = oldUrl.length; i < l; i++) {
	    if (oldUrl[i] == "..") {
	      newUrl.pop();
	    } else if (oldUrl[i] == ".") {
	      continue;
	    } else {
	      newUrl.push(oldUrl[i]);
	    }
	  }

	  return newUrl.join("/");
	}

	function resolveURL() {
	  var len = arguments.length;
	  if (len === 0) return "";

	  var base = "";
	  for (var i = 0; i < len; i++) {
	    var part = arguments[i];
	    if (typeof part !== "string" || part === "") {
	      continue;
	    }
	    if (schemeRe.test(part)) {
	      base = part;
	    } else {
	      if (part[0] === "/") {
	        part = part.substr(1);
	      }

	      if (base[base.length - 1] === "/") {
	        base = base.substr(0, base.length - 1);
	      }

	      base = base + "/" + part;
	    }
	  }

	  return _normalizeUrl(base);
	}

	function parseBaseURL(url) {
	  var slash = url.lastIndexOf("/");
	  if (slash >= 0) {
	    return url.substring(0, slash + 1);
	  } else {
	    return url;
	  }
	}

	module.exports = {
	  resolveURL: resolveURL,
	  parseBaseURL: parseBaseURL
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFlatten = __webpack_require__(110),
	    isIterateeCall = __webpack_require__(67);

	/**
	 * Flattens a nested array. If `isDeep` is `true` the array is recursively
	 * flattened, otherwise it's only flattened a single level.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, 3, [4]]]);
	 * // => [1, 2, 3, [4]]
	 *
	 * // using `isDeep`
	 * _.flatten([1, [2, 3, [4]]], true);
	 * // => [1, 2, 3, 4]
	 */
	function flatten(array, isDeep, guard) {
	  var length = array ? array.length : 0;
	  if (guard && isIterateeCall(array, isDeep, guard)) {
	    isDeep = false;
	  }
	  return length ? baseFlatten(array, isDeep) : [];
	}

	module.exports = flatten;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(34),
	    isObjectLike = __webpack_require__(23);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	    return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var ScalarObservable = function (_super) {
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
	        var done = state.done,
	            value = state.value,
	            subscriber = state.subscriber;
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
	            return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                done: false, value: value, subscriber: subscriber
	            });
	        } else {
	            subscriber.next(value);
	            if (!subscriber.isUnsubscribed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1.Observable);
	exports.ScalarObservable = ScalarObservable;
	//# sourceMappingURL=ScalarObservable.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(15);
	var Observable_1 = __webpack_require__(1);
	var PromiseObservable = function (_super) {
	    __extends(PromiseObservable, _super);
	    function PromiseObservable(promise, scheduler) {
	        if (scheduler === void 0) {
	            scheduler = null;
	        }
	        _super.call(this);
	        this.promise = promise;
	        this.scheduler = scheduler;
	    }
	    PromiseObservable.create = function (promise, scheduler) {
	        if (scheduler === void 0) {
	            scheduler = null;
	        }
	        return new PromiseObservable(promise, scheduler);
	    };
	    PromiseObservable.prototype._subscribe = function (subscriber) {
	        var _this = this;
	        var promise = this.promise;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            if (this._isScalar) {
	                if (!subscriber.isUnsubscribed) {
	                    subscriber.next(this.value);
	                    subscriber.complete();
	                }
	            } else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.isUnsubscribed) {
	                        subscriber.next(value);
	                        subscriber.complete();
	                    }
	                }, function (err) {
	                    if (!subscriber.isUnsubscribed) {
	                        subscriber.error(err);
	                    }
	                }).then(null, function (err) {
	                    // escape the promise trap, throw unhandled errors
	                    root_1.root.setTimeout(function () {
	                        throw err;
	                    });
	                });
	            }
	        } else {
	            if (this._isScalar) {
	                if (!subscriber.isUnsubscribed) {
	                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
	                }
	            } else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.isUnsubscribed) {
	                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
	                    }
	                }, function (err) {
	                    if (!subscriber.isUnsubscribed) {
	                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
	                    }
	                }).then(null, function (err) {
	                    // escape the promise trap, throw unhandled errors
	                    root_1.root.setTimeout(function () {
	                        throw err;
	                    });
	                });
	            }
	        }
	    };
	    return PromiseObservable;
	}(Observable_1.Observable);
	exports.PromiseObservable = PromiseObservable;
	function dispatchNext(_a) {
	    var value = _a.value,
	        subscriber = _a.subscriber;
	    if (!subscriber.isUnsubscribed) {
	        subscriber.next(value);
	        subscriber.complete();
	    }
	}
	function dispatchError(_a) {
	    var err = _a.err,
	        subscriber = _a.subscriber;
	    if (!subscriber.isUnsubscribed) {
	        subscriber.error(err);
	    }
	}
	//# sourceMappingURL=fromPromise.js.map

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	var CombineLatestOperator = function () {
	    function CombineLatestOperator(project) {
	        this.project = project;
	    }
	    CombineLatestOperator.prototype.call = function (subscriber) {
	        return new CombineLatestSubscriber(subscriber, this.project);
	    };
	    return CombineLatestOperator;
	}();
	exports.CombineLatestOperator = CombineLatestOperator;
	var CombineLatestSubscriber = function (_super) {
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
	        } else {
	            this.active = len;
	            for (var i = 0; i < len; i++) {
	                var observable = observables[i];
	                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
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
	                } else {
	                    destination.next(result);
	                }
	            } else {
	                destination.next(values);
	            }
	        }
	    };
	    return CombineLatestSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	exports.CombineLatestSubscriber = CombineLatestSubscriber;
	//# sourceMappingURL=combineLatest-support.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Notification_1 = __webpack_require__(35);
	var ObserveOnOperator = function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber) {
	        return new ObserveOnSubscriber(subscriber, this.scheduler, this.delay);
	    };
	    return ObserveOnOperator;
	}();
	exports.ObserveOnOperator = ObserveOnOperator;
	var ObserveOnSubscriber = function (_super) {
	    __extends(ObserveOnSubscriber, _super);
	    function ObserveOnSubscriber(destination, scheduler, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnSubscriber.dispatch = function (_a) {
	        var notification = _a.notification,
	            destination = _a.destination;
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
	}(Subscriber_1.Subscriber);
	exports.ObserveOnSubscriber = ObserveOnSubscriber;
	var ObserveOnMessage = function () {
	    function ObserveOnMessage(notification, destination) {
	        this.notification = notification;
	        this.destination = destination;
	    }
	    return ObserveOnMessage;
	}();
	//# sourceMappingURL=observeOn-support.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(15);
	var Subscription_1 = __webpack_require__(9);
	var FutureAction = function (_super) {
	    __extends(FutureAction, _super);
	    function FutureAction(scheduler, work) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        this.work = work;
	    }
	    FutureAction.prototype.execute = function () {
	        if (this.isUnsubscribed) {
	            throw new Error('How did did we execute a canceled Action?');
	        }
	        this.work(this.state);
	    };
	    FutureAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        if (this.isUnsubscribed) {
	            return this;
	        }
	        return this._schedule(state, delay);
	    };
	    FutureAction.prototype._schedule = function (state, delay) {
	        var _this = this;
	        if (delay === void 0) {
	            delay = 0;
	        }
	        this.delay = delay;
	        this.state = state;
	        var id = this.id;
	        if (id != null) {
	            this.id = undefined;
	            root_1.root.clearTimeout(id);
	        }
	        this.id = root_1.root.setTimeout(function () {
	            _this.id = null;
	            var scheduler = _this.scheduler;
	            scheduler.actions.push(_this);
	            scheduler.flush();
	        }, delay);
	        return this;
	    };
	    FutureAction.prototype._unsubscribe = function () {
	        var _a = this,
	            id = _a.id,
	            scheduler = _a.scheduler;
	        var actions = scheduler.actions;
	        var index = actions.indexOf(this);
	        if (id != null) {
	            this.id = null;
	            root_1.root.clearTimeout(id);
	        }
	        if (index !== -1) {
	            actions.splice(index, 1);
	        }
	        this.work = null;
	        this.state = null;
	        this.scheduler = null;
	    };
	    return FutureAction;
	}(Subscription_1.Subscription);
	exports.FutureAction = FutureAction;
	//# sourceMappingURL=FutureAction.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray_1 = __webpack_require__(14);
	function isNumeric(val) {
	    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	    // subtraction forces infinities to NaN
	    // adding 1 corrects loss of precision from parseFloat (#15100)
	    return !isArray_1.isArray(val) && val - parseFloat(val) + 1 >= 0;
	}
	exports.isNumeric = isNumeric;
	;
	//# sourceMappingURL=isNumeric.js.map

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var log = __webpack_require__(13);
	var assert = __webpack_require__(7);
	var defaults = __webpack_require__(30);
	var flatten = __webpack_require__(43);

	var _require = __webpack_require__(42);

	var parseBaseURL = _require.parseBaseURL;

	var _require2 = __webpack_require__(20);

	var isCodecSupported = _require2.isCodecSupported;


	var representationBaseType = ["profiles", "width", "height", "frameRate", "audioSamplingRate", "mimeType", "segmentProfiles", "codecs", "maximumSAPPeriod", "maxPlayoutRate", "codingDependency", "index"];

	var uniqueId = 0;
	var SUPPORTED_ADAPTATIONS_TYPE = ["audio", "video", "text"];
	var DEFAULT_PRESENTATION_DELAY = 15;

	function parseType(mimeType) {
	  return mimeType.split("/")[0];
	}

	function normalizeManifest(location, manifest, subtitles) {
	  assert(manifest.transportType);

	  manifest.id = manifest.id || uniqueId++;
	  manifest.type = manifest.type || "static";

	  var locations = manifest.locations;
	  if (!locations || !locations.length) {
	    manifest.locations = [location];
	  }

	  manifest.isLive = manifest.type == "dynamic";

	  // TODO(pierre): support multi-locations/cdns
	  var urlBase = {
	    rootURL: parseBaseURL(manifest.locations[0]),
	    baseURL: manifest.baseURL,
	    isLive: manifest.isLive
	  };

	  if (subtitles) {
	    subtitles = normalizeSubtitles(subtitles);
	  }

	  var periods = manifest.periods.map(function (period) {
	    return normalizePeriod(period, urlBase, subtitles);
	  });

	  // TODO(pierre): support multiple periods
	  manifest = _extends({}, manifest, periods[0]);
	  manifest.periods = null;

	  if (!manifest.duration) {
	    manifest.duration = Infinity;
	  }

	  if (manifest.isLive) {
	    manifest.suggestedPresentationDelay = manifest.suggestedPresentationDelay || DEFAULT_PRESENTATION_DELAY;
	    manifest.availabilityStartTime = manifest.availabilityStartTime || 0;
	  }

	  return manifest;
	}

	function normalizePeriod(period, inherit, subtitles) {
	  period.id = period.id || uniqueId++;

	  var adaptations = period.adaptations;
	  adaptations = adaptations.concat(subtitles || []);
	  adaptations = adaptations.map(function (ada) {
	    return normalizeAdaptation(ada, inherit);
	  });
	  adaptations = adaptations.filter(function (adaptation) {
	    if (SUPPORTED_ADAPTATIONS_TYPE.indexOf(adaptation.type) < 0) {
	      log.info("not supported adaptation type", adaptation.type);
	      return false;
	    } else {
	      return true;
	    }
	  });

	  assert(adaptations.length > 0);

	  var adaptationsByType = {};
	  for (var i = 0; i < adaptations.length; i++) {
	    var adaptation = adaptations[i];
	    var adaptationType = adaptation.type;
	    adaptationsByType[adaptationType] = adaptationsByType[adaptationType] || [];
	    adaptationsByType[adaptationType].push(adaptation);
	  }

	  period.adaptations = adaptationsByType;
	  return period;
	}

	function normalizeAdaptation(adaptation, inherit) {
	  assert(typeof adaptation.id != "undefined");
	  defaults(adaptation, inherit);

	  var inheritedFromAdaptation = {};
	  representationBaseType.forEach(function (baseType) {
	    if (baseType in adaptation) {
	      inheritedFromAdaptation[baseType] = adaptation[baseType];
	    }
	  });

	  var representations = adaptation.representations.map(function (rep) {
	    return normalizeRepresentation(rep, inheritedFromAdaptation);
	  }).sort(function (a, b) {
	    return a.bitrate - b.bitrate;
	  });

	  var type = adaptation.type;
	  var mimeType = adaptation.mimeType;

	  if (!mimeType) {
	    mimeType = representations[0].mimeType;
	  }

	  assert(mimeType);

	  adaptation.mimeType = mimeType;

	  if (!type) {
	    type = adaptation.type = parseType(mimeType);
	  }

	  if (type == "video" || type == "audio") {
	    representations = representations.filter(function (rep) {
	      return isCodecSupported(getCodec(rep));
	    });
	  }

	  assert(representations.length > 0, "manifest: no compatible representation for this adaptation");
	  adaptation.representations = representations;
	  adaptation.bitrates = representations.map(function (rep) {
	    return rep.bitrate;
	  });
	  return adaptation;
	}

	function normalizeRepresentation(representation, inherit) {
	  assert(typeof representation.id != "undefined");
	  defaults(representation, inherit);

	  var index = representation.index;
	  assert(index);

	  if (!index.timescale) {
	    index.timescale = 1;
	  }

	  if (!representation.bitrate) {
	    representation.bitrate = 1;
	  }

	  // Fix issue in some packagers, like GPAC, generating a non
	  // compliant mimetype with RFC 6381. Other closed-source packagers
	  // maybe impacted.
	  if (representation.codecs == "mp4a.40.02") {
	    representation.codecs = "mp4a.40.2";
	  }

	  return representation;
	}

	function normalizeSubtitles(subtitles) {
	  if (!Array.isArray(subtitles)) {
	    subtitles = [subtitles];
	  }

	  return flatten(subtitles.map(function (_ref) {
	    var mimeType = _ref.mimeType;
	    var url = _ref.url;
	    var language = _ref.language;
	    var languages = _ref.languages;

	    if (language) {
	      languages = [language];
	    }

	    return languages.map(function (lang) {
	      return {
	        id: uniqueId++,
	        type: "text",
	        lang: lang,
	        mimeType: mimeType,
	        rootURL: url,
	        baseURL: "",
	        representations: [{
	          id: uniqueId++,
	          mimeType: mimeType,
	          index: {
	            indexType: "template",
	            duration: Number.MAX_VALUE,
	            timescale: 1,
	            startNumber: 0
	          }
	        }]
	      };
	    });
	  }));
	}

	function simpleMerge(source, dist) {
	  for (var attr in source) {
	    if (!dist.hasOwnProperty(attr)) {
	      continue;
	    }

	    var src = source[attr];
	    var dst = dist[attr];

	    if (typeof src == "string" || typeof src == "number" || (typeof src === "undefined" ? "undefined" : _typeof(src)) == "object" && src instanceof Date) {
	      source[attr] = dst;
	    } else if (Array.isArray(src)) {
	      src.length = 0;
	      Array.prototype.push.apply(src, dst);
	    } else {
	      source[attr] = simpleMerge(src, dst);
	    }
	  }

	  return source;
	}

	function mergeManifestsIndex(oldManifest, newManifest) {
	  var oldAdaptations = oldManifest.adaptations;
	  var newAdaptations = newManifest.adaptations;

	  var _loop = function _loop(type) {
	    var oldAdas = oldAdaptations[type];
	    var newAdas = newAdaptations[type];
	    oldAdas.forEach(function (a, i) {
	      simpleMerge(a.index, newAdas[i].index);
	    });
	  };

	  for (var type in oldAdaptations) {
	    _loop(type);
	  }
	  return oldManifest;
	}

	function mutateManifestLiveGap(manifest) {
	  var addedTime = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	  if (manifest.isLive) {
	    manifest.presentationLiveGap += addedTime;
	  }
	}

	function getCodec(representation) {
	  var codecs = representation.codecs;
	  var mimeType = representation.mimeType;

	  return mimeType + ";codecs=\"" + codecs + "\"";
	}

	function getAdaptations(manifest) {
	  var adaptationsByType = manifest.adaptations;
	  if (!adaptationsByType) {
	    return [];
	  }

	  var adaptationsList = [];
	  for (var type in adaptationsByType) {
	    var adaptations = adaptationsByType[type];
	    adaptationsList.push({
	      type: type,
	      adaptations: adaptations,
	      codec: getCodec(adaptations[0].representations[0])
	    });
	  }

	  return adaptationsList;
	}

	function getAdaptationsByType(manifest, type) {
	  var adaptations = manifest.adaptations;

	  var adaptationsForType = adaptations && adaptations[type];
	  if (adaptationsForType) {
	    return adaptationsForType;
	  } else {
	    return [];
	  }
	}

	function getAvailableLanguages(manifest) {
	  return getAdaptationsByType(manifest, "audio").map(function (ada) {
	    return ada.lang;
	  });
	}

	function getAvailableSubtitles(manifest) {
	  return getAdaptationsByType(manifest, "text").map(function (ada) {
	    return ada.lang;
	  });
	}

	module.exports = {
	  normalizeManifest: normalizeManifest,
	  mergeManifestsIndex: mergeManifestsIndex,
	  mutateManifestLiveGap: mutateManifestLiveGap,
	  getCodec: getCodec,
	  getAdaptations: getAdaptations,
	  getAdaptationsByType: getAdaptationsByType,
	  getAvailableSubtitles: getAvailableSubtitles,
	  getAvailableLanguages: getAvailableLanguages
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	var FUZZ_FACTOR = 0.3;

	function getFuzzedDelay(retryDelay) {
	  var fuzzingFactor = (Math.random() * 2 - 1) * FUZZ_FACTOR;
	  return retryDelay * (1.0 + fuzzingFactor);
	}

	function getBackedoffDelay(retryDelay) {
	  var retryCount = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1));
	}

	module.exports = {
	  getFuzzedDelay: getFuzzedDelay,
	  getBackedoffDelay: getBackedoffDelay
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (fn, wait, debounceOptions) {
	  var timer = null;
	  var stamp = 0;
	  var args = [];

	  var leading = !!(debounceOptions && debounceOptions.leading);
	  var calledOnce = false;

	  function onCall() {
	    var dt = stamp - Date.now();
	    if (dt > 0) {
	      timer = setTimeout(onCall, dt);
	    } else {
	      timer = null;
	      switch (args.length) {
	        case 0:
	          return fn();
	        case 1:
	          return fn(args[0]);
	        case 2:
	          return fn(args[0], args[1]);
	        case 3:
	          return fn(args[0], args[1], args[2]);
	        default:
	          return fn.apply(null, args);
	      }
	    }
	  }

	  function debounced() {
	    // do not leak arguments object to prevent de-optimizations
	    var l = arguments.length,
	        i = 0;
	    args = Array(l);
	    for (; i < l; i++) {
	      args[i] = arguments[i];
	    }if (leading && !calledOnce) {
	      calledOnce = true;
	      stamp = Date.now();
	      return onCall();
	    }

	    var t = stamp;
	    stamp = Date.now() + wait;

	    if (!timer || stamp < t) {
	      if (timer) clearTimeout(timer);
	      timer = setTimeout(onCall, wait);
	    }

	    return debounced;
	  }

	  debounced.isWaiting = function () {
	    return !!timer;
	  };

	  debounced.dispose = function () {
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	  };

	  return debounced;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;


	function RequestError(url, xhr, message) {
	  var reason = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  this.name = "RequestError";
	  this.url = url;
	  this.xhr = xhr;
	  this.code = xhr.status;
	  this.reason = reason;
	  this.message = "request: " + message + " (" + url + ")";
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, RequestError);
	  }
	}
	RequestError.prototype = new Error();

	function RestCallMethodError(url, _ref) {
	  var code = _ref.code;
	  var method = _ref.method;
	  var message = _ref.message;

	  this.name = "RestCallMethodError";
	  this.url = url;
	  this.code = code;
	  this.message = "restmethodcall: webservice error status " + code + " (" + url + ")" + (method ? " (" + method + ")" : "") + (message ? "\n" + message : "");
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, RestCallMethodError);
	  }
	}
	RestCallMethodError.prototype = new Error();

	function RestCallResult(response, url, scriptInfo) {
	  var restCallResult = response.querySelector("RestCallResult");
	  var status = +restCallResult.querySelector("Status").textContent;
	  if (status < 0) throw new RestCallMethodError(url, { code: status, method: scriptInfo });else return {
	    output: restCallResult.querySelector("Output"),
	    status: status
	  };
	}

	function toJSONForIE(blob) {
	  try {
	    return JSON.parse(blob);
	  } catch (e) {
	    return null;
	  }
	}

	function getResponseHeadersList(xhr, headersList) {
	  var headers = {},
	      header;
	  for (var i = 0; i < headersList.length; i++) {
	    header = headersList[i];
	    headers[header] = xhr.getResponseHeader(header);
	  }
	  return headers;
	}

	/**
	 * Creates an observable HTTP request.
	 * The options that can be passed are:
	 *
	 *    - url        Request's url
	 *    - [method]   HTTP method (defaults is "GET")
	 *    - [data]     Sent data for "POST", "UPDATE" or "PATCH" requests
	 *    - [headers]  Object containing headers key/value
	 *    - [format]   Format of the response, according to the XMLHttpRequest Level 2
	 *                 response type: "arraybuffer", "blob", "document", "json" or "text" (defaults)
	 */
	function request(options) {
	  if (options.format == "rest-call-method") {
	    return restCallMethod(options);
	  }

	  return Observable.create(function (observer) {
	    var url = options.url;
	    var method = options.method;
	    var data = options.data;
	    var headers = options.headers;
	    var format = options.format;
	    var withMetadata = options.withMetadata;
	    var responseHeaders = options.responseHeaders;


	    var xhr = new XMLHttpRequest();
	    xhr.open(method || "GET", url, true);

	    // Special case for document format: some manifests may have a
	    // null response because of wrongly namespaced XML file. Also the
	    // document format rely on specific Content-Type headers which may
	    // erroneous. Therefore we use a text responseType and parse the
	    // document with DOMParser.
	    if (format == "document") {
	      xhr.responseType = "text";
	    } else {
	      xhr.responseType = format || "text";
	    }

	    if (headers) {
	      for (var name in headers) {
	        xhr.setRequestHeader(name, headers[name]);
	      }
	    }

	    xhr.addEventListener("load", onLoad, false);
	    xhr.addEventListener("error", onError, false);

	    var sent = Date.now();

	    xhr.send(data);

	    function onLoad(evt) {
	      var x = evt.target;
	      var s = x.status;
	      if (s < 200 || s >= 300) {
	        return observer.error(new RequestError(url, x, x.statusText));
	      }

	      var duration = Date.now() - sent;
	      var blob;
	      if (format == "document") {
	        blob = new global.DOMParser().parseFromString(x.responseText, "text/xml");
	      } else {
	        blob = x.response;
	      }

	      if (format == "json" && typeof blob == "string") {
	        blob = toJSONForIE(blob);
	      }

	      if (blob == null) {
	        return observer.error(new RequestError(url, x, "null response with format \"" + format + "\" (error while parsing or wrong content-type)"));
	      }

	      // TODO(pierre): find a better API than this "withMetadata" flag
	      // (it is weird and collisions with responseHeaders)
	      if (withMetadata) {
	        var headers;
	        if (responseHeaders) {
	          headers = getResponseHeadersList(x, responseHeaders);
	        }

	        var size = evt.total;

	        observer.next({
	          blob: blob,
	          size: size,
	          duration: duration,
	          headers: headers,
	          url: x.responseURL || url,
	          xhr: x
	        });
	      } else {
	        observer.next(blob);
	      }

	      observer.complete();
	    }

	    function onError(e) {
	      observer.error(new RequestError(url, e, "error event"));
	    }

	    return function () {
	      var _xhr = xhr;
	      var readyState = _xhr.readyState;

	      if (0 < readyState && readyState < 4) {
	        xhr.removeEventListener("load", onLoad);
	        xhr.removeEventListener("error", onError);
	        xhr.abort();
	      }
	      xhr = null;
	    };
	  });
	}

	var ENTITIES_REG = /[&<>]/g;
	var ENTITIES = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;"
	};

	function escapeXml(xml) {
	  return (xml || "").toString().replace(ENTITIES_REG, function (tag) {
	    return ENTITIES[tag];
	  });
	}

	function objToXML(obj) {
	  var xml = "";
	  for (var attrName in obj) {
	    var attr = obj[attrName];
	    var inner = (typeof attr === "undefined" ? "undefined" : _typeof(attr)) == "object" ? objToXML(attr) : escapeXml(attr);
	    xml += "<" + attrName + ">" + inner + "</" + attrName + ">";
	  }
	  return xml;
	}

	function getNodeTextContent(root, name) {
	  var item = root.querySelector(name);
	  return item && item.textContent;
	}

	var METHOD_CALL_XML = "<RestCallMethod xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">{payload}</RestCallMethod>";

	function restCallMethod(options) {
	  options.method = "POST";
	  options.headers = { "Content-Type": "application/xml" };
	  options.data = METHOD_CALL_XML.replace("{payload}", objToXML(options.data));
	  options.format = "document";
	  // options.url = options.url.replace("RestPortalProvider", "JsonPortalProvider");
	  // options.headers = { "Content-Type": "application/json" };
	  // options.data = JSON.stringify(options.data);
	  // options.format = "json";
	  return request(options).map(function (data) {
	    return RestCallResult(data, options.url, options.ScriptInfo);
	  });
	}

	request.escapeXml = escapeXml;
	request.RequestError = RequestError;
	request.RestCallMethodError = RestCallMethodError;
	request.RestCallResult = RestCallResult;
	request.getNodeTextContent = getNodeTextContent;

	module.exports = request;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, rest);
	      case 1:
	        return func.call(this, args[0], rest);
	      case 2:
	        return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(16);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	module.exports = baseGet;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(115),
	    isObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(23);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;

/***/ },
/* 60 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(71);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(65),
	    isLength = __webpack_require__(22),
	    toObject = __webpack_require__(16);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(16);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while (fromRight ? index-- : ++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCallback = __webpack_require__(104),
	    baseFind = __webpack_require__(108),
	    baseFindIndex = __webpack_require__(109),
	    isArray = __webpack_require__(17);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(eachFunc, fromRight) {
	  return function (collection, predicate, thisArg) {
	    predicate = baseCallback(predicate, thisArg, 3);
	    if (isArray(collection)) {
	      var index = baseFindIndex(collection, predicate, fromRight);
	      return index > -1 ? collection[index] : undefined;
	    }
	    return baseFind(collection, predicate, eachFunc);
	  };
	}

	module.exports = createFind;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(60);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(130);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isArrayLike = __webpack_require__(34),
	    isIndex = __webpack_require__(44),
	    isObject = __webpack_require__(18);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    var other = object[index];
	    return value === value ? value === other : other !== other;
	  }
	  return false;
	}

	module.exports = isIterateeCall;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isArray = __webpack_require__(17),
	    toObject = __webpack_require__(16);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || object != null && value in toObject(object);
	}

	module.exports = isKey;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(121),
	    isArray = __webpack_require__(17);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	}

	module.exports = toPath;

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var Subscriber_1 = __webpack_require__(2);
	var Subscription_1 = __webpack_require__(9);
	var ConnectableObservable = function (_super) {
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
	        return this.subject = this.subjectFactory();
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var source = this.source;
	        var subscription = this.subscription;
	        if (subscription && !subscription.isUnsubscribed) {
	            return subscription;
	        }
	        subscription = source.subscribe(this._getSubject());
	        subscription.add(new ConnectableSubscription(this));
	        return this.subscription = subscription;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return new RefCountObservable(this);
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable);
	exports.ConnectableObservable = ConnectableObservable;
	var ConnectableSubscription = function (_super) {
	    __extends(ConnectableSubscription, _super);
	    function ConnectableSubscription(connectable) {
	        _super.call(this);
	        this.connectable = connectable;
	    }
	    ConnectableSubscription.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        connectable.subject = null;
	        connectable.subscription = null;
	        this.connectable = null;
	    };
	    return ConnectableSubscription;
	}(Subscription_1.Subscription);
	var RefCountObservable = function (_super) {
	    __extends(RefCountObservable, _super);
	    function RefCountObservable(connectable, refCount) {
	        if (refCount === void 0) {
	            refCount = 0;
	        }
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
	}(Observable_1.Observable);
	var RefCountSubscriber = function (_super) {
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
	            observable.connection = null;
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
	                observable.connection = null;
	            }
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var ErrorObservable = function (_super) {
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
	        var error = _a.error,
	            subscriber = _a.subscriber;
	        subscriber.error(error);
	    };
	    ErrorObservable.prototype._subscribe = function (subscriber) {
	        var error = this.error;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ErrorObservable.dispatch, 0, {
	                error: error, subscriber: subscriber
	            });
	        } else {
	            subscriber.error(error);
	        }
	    };
	    return ErrorObservable;
	}(Observable_1.Observable);
	exports.ErrorObservable = ErrorObservable;
	//# sourceMappingURL=throw.js.map

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeAll_support_1 = __webpack_require__(31);
	var fromArray_1 = __webpack_require__(12);
	var isScheduler_1 = __webpack_require__(19);
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
	    var scheduler = null;
	    var args = observables;
	    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
	        scheduler = args.pop();
	    }
	    return new fromArray_1.ArrayObservable(observables, scheduler).lift(new mergeAll_support_1.MergeAllOperator(1));
	}
	exports.concat = concat;
	//# sourceMappingURL=concat-static.js.map

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
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
	var FilterOperator = function () {
	    function FilterOperator(select, thisArg) {
	        this.select = select;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber) {
	        return new FilterSubscriber(subscriber, this.select, this.thisArg);
	    };
	    return FilterOperator;
	}();
	var FilterSubscriber = function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, select, thisArg) {
	        _super.call(this, destination);
	        this.select = select;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.select = select;
	    }
	    FilterSubscriber.prototype._next = function (x) {
	        var result = tryCatch_1.tryCatch(this.select).call(this.thisArg || this, x, this.count++);
	        if (result === errorObject_1.errorObject) {
	            this.destination.error(errorObject_1.errorObject.e);
	        } else if (Boolean(result)) {
	            this.destination.next(x);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=filter.js.map

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	/**
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the returned observable
	 *
	 * @param {Function} project the function to create projection
	 * @param {any} [thisArg] an optional argument to define what `this` is in the project function
	 * @returns {Observable} a observable of projected values
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber) {
	        return new MapSubscriber(subscriber, this.project, this.thisArg);
	    };
	    return MapOperator;
	}();
	var MapSubscriber = function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.thisArg = thisArg;
	        this.count = 0;
	    }
	    MapSubscriber.prototype._next = function (x) {
	        var result = tryCatch_1.tryCatch(this.project).call(this.thisArg || this, x, this.count++);
	        if (result === errorObject_1.errorObject) {
	            this.error(errorObject_1.errorObject.e);
	        } else {
	            this.destination.next(result);
	        }
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=map.js.map

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fromArray_1 = __webpack_require__(12);
	var mergeAll_support_1 = __webpack_require__(31);
	var isScheduler_1 = __webpack_require__(19);
	function merge() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var concurrent = Number.POSITIVE_INFINITY;
	    var scheduler = null;
	    var last = observables[observables.length - 1];
	    if (isScheduler_1.isScheduler(last)) {
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
	    return new fromArray_1.ArrayObservable(observables, scheduler).lift(new mergeAll_support_1.MergeAllOperator(concurrent));
	}
	exports.merge = merge;
	//# sourceMappingURL=merge-static.js.map

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var subscribeToResult_1 = __webpack_require__(6);
	var OuterSubscriber_1 = __webpack_require__(5);
	var MergeMapOperator = function () {
	    function MergeMapOperator(project, resultSelector, concurrent) {
	        if (concurrent === void 0) {
	            concurrent = Number.POSITIVE_INFINITY;
	        }
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapOperator.prototype.call = function (observer) {
	        return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
	    };
	    return MergeMapOperator;
	}();
	exports.MergeMapOperator = MergeMapOperator;
	var MergeMapSubscriber = function (_super) {
	    __extends(MergeMapSubscriber, _super);
	    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
	        if (concurrent === void 0) {
	            concurrent = Number.POSITIVE_INFINITY;
	        }
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
	                destination.error(errorObject_1.errorObject.e);
	            } else {
	                this.active++;
	                this._innerSub(ish, value, index);
	            }
	        } else {
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
	        var _a = this,
	            destination = _a.destination,
	            resultSelector = _a.resultSelector;
	        if (resultSelector) {
	            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
	            if (result === errorObject_1.errorObject) {
	                destination.error(errorObject_1.errorObject.e);
	            } else {
	                destination.next(result);
	            }
	        } else {
	            destination.next(innerValue);
	        }
	    };
	    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
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
	}(OuterSubscriber_1.OuterSubscriber);
	exports.MergeMapSubscriber = MergeMapSubscriber;
	//# sourceMappingURL=mergeMap-support.js.map

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	var MergeMapToOperator = function () {
	    function MergeMapToOperator(ish, resultSelector, concurrent) {
	        if (concurrent === void 0) {
	            concurrent = Number.POSITIVE_INFINITY;
	        }
	        this.ish = ish;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapToOperator.prototype.call = function (observer) {
	        return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
	    };
	    return MergeMapToOperator;
	}();
	exports.MergeMapToOperator = MergeMapToOperator;
	var MergeMapToSubscriber = function (_super) {
	    __extends(MergeMapToSubscriber, _super);
	    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
	        if (concurrent === void 0) {
	            concurrent = Number.POSITIVE_INFINITY;
	        }
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
	        } else {
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
	        var _a = this,
	            resultSelector = _a.resultSelector,
	            destination = _a.destination;
	        if (resultSelector) {
	            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
	            if (result === errorObject_1.errorObject) {
	                destination.error(errorObject_1.errorObject.e);
	            } else {
	                destination.next(result);
	            }
	        } else {
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
	        } else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeMapToSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	exports.MergeMapToSubscriber = MergeMapToSubscriber;
	//# sourceMappingURL=mergeMapTo-support.js.map

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fromArray_1 = __webpack_require__(12);
	var race_support_1 = __webpack_require__(295);
	var isArray_1 = __webpack_require__(14);
	/**
	 * Returns an Observable that mirrors the first source Observable to emit an item.
	 * @param {...Observables} ...observables sources used to race for which Observable emits first.
	 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
	 */
	function race() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    // if the only argument is an array, it was most likely called with
	    // `pair([obs1, obs2, ...])`
	    if (observables.length === 1) {
	        if (isArray_1.isArray(observables[0])) {
	            observables = observables[0];
	        } else {
	            return observables[0];
	        }
	    }
	    return new fromArray_1.ArrayObservable(observables).lift(new race_support_1.RaceOperator());
	}
	exports.race = race;
	//# sourceMappingURL=race-static.js.map

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fromArray_1 = __webpack_require__(12);
	var zip_support_1 = __webpack_require__(82);
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
	//# sourceMappingURL=zip-static.js.map

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1 = __webpack_require__(14);
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	var SymbolShim_1 = __webpack_require__(27);
	var ZipOperator = function () {
	    function ZipOperator(project) {
	        this.project = project;
	    }
	    ZipOperator.prototype.call = function (subscriber) {
	        return new ZipSubscriber(subscriber, this.project);
	    };
	    return ZipOperator;
	}();
	exports.ZipOperator = ZipOperator;
	var ZipSubscriber = function (_super) {
	    __extends(ZipSubscriber, _super);
	    function ZipSubscriber(destination, project, values) {
	        if (values === void 0) {
	            values = Object.create(null);
	        }
	        _super.call(this, destination);
	        this.index = 0;
	        this.iterators = [];
	        this.active = 0;
	        this.project = typeof project === 'function' ? project : null;
	        this.values = values;
	    }
	    ZipSubscriber.prototype._next = function (value) {
	        var iterators = this.iterators;
	        var index = this.index++;
	        if (isArray_1.isArray(value)) {
	            iterators.push(new StaticArrayIterator(value));
	        } else if (typeof value[SymbolShim_1.SymbolShim.iterator] === 'function') {
	            iterators.push(new StaticIterator(value[SymbolShim_1.SymbolShim.iterator]()));
	        } else {
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
	                this.add(iterator.subscribe(iterator, i));
	            } else {
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
	}(Subscriber_1.Subscriber);
	exports.ZipSubscriber = ZipSubscriber;
	var StaticIterator = function () {
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
	}();
	var StaticArrayIterator = function () {
	    function StaticArrayIterator(array) {
	        this.array = array;
	        this.index = 0;
	        this.length = 0;
	        this.length = array.length;
	    }
	    StaticArrayIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function () {
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
	}();
	var ZipBufferIterator = function (_super) {
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
	    ZipBufferIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function () {
	        return this;
	    };
	    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
	    //    this is legit because `next()` will never be called by a subscription in this case.
	    ZipBufferIterator.prototype.next = function () {
	        var buffer = this.buffer;
	        if (buffer.length === 0 && this.isComplete) {
	            return { done: true };
	        } else {
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
	        } else {
	            this.destination.complete();
	        }
	    };
	    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.buffer.push(innerValue);
	        this.parent.checkIterators();
	    };
	    ZipBufferIterator.prototype.subscribe = function (value, index) {
	        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
	    };
	    return ZipBufferIterator;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=zip-support.js.map

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QueueAction_1 = __webpack_require__(334);
	var FutureAction_1 = __webpack_require__(50);
	var QueueScheduler = function () {
	    function QueueScheduler() {
	        this.active = false;
	        this.actions = [];
	        this.scheduledId = null;
	    }
	    QueueScheduler.prototype.now = function () {
	        return Date.now();
	    };
	    QueueScheduler.prototype.flush = function () {
	        if (this.active || this.scheduledId) {
	            return;
	        }
	        this.active = true;
	        var actions = this.actions;
	        for (var action = void 0; action = actions.shift();) {
	            action.execute();
	        }
	        this.active = false;
	    };
	    QueueScheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        return delay <= 0 ? this.scheduleNow(work, state) : this.scheduleLater(work, delay, state);
	    };
	    QueueScheduler.prototype.scheduleNow = function (work, state) {
	        return new QueueAction_1.QueueAction(this, work).schedule(state);
	    };
	    QueueScheduler.prototype.scheduleLater = function (work, delay, state) {
	        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
	    };
	    return QueueScheduler;
	}();
	exports.QueueScheduler = QueueScheduler;
	//# sourceMappingURL=QueueScheduler.js.map

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var QueueScheduler_1 = __webpack_require__(83);
	exports.queue = new QueueScheduler_1.QueueScheduler();
	//# sourceMappingURL=queue.js.map

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(10);
	var throwError_1 = __webpack_require__(91);
	var ObjectUnsubscribedError_1 = __webpack_require__(88);
	var BehaviorSubject = function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasErrored) {
	            throwError_1.throwError(this.errorValue);
	        } else if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        } else {
	            return this._value;
	        }
	    };
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function get() {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.isUnsubscribed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype._next = function (value) {
	        _super.prototype._next.call(this, this._value = value);
	    };
	    BehaviorSubject.prototype._error = function (err) {
	        this.hasErrored = true;
	        _super.prototype._error.call(this, this.errorValue = err);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject);
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(10);
	var queue_1 = __webpack_require__(84);
	var observeOn_support_1 = __webpack_require__(49);
	var ReplaySubject = function (_super) {
	    __extends(ReplaySubject, _super);
	    function ReplaySubject(bufferSize, windowSize, scheduler) {
	        if (bufferSize === void 0) {
	            bufferSize = Number.POSITIVE_INFINITY;
	        }
	        if (windowSize === void 0) {
	            windowSize = Number.POSITIVE_INFINITY;
	        }
	        _super.call(this);
	        this.events = [];
	        this.scheduler = scheduler;
	        this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
	        this.windowSize = windowSize < 1 ? 1 : windowSize;
	    }
	    ReplaySubject.prototype._next = function (value) {
	        var now = this._getNow();
	        this.events.push(new ReplayEvent(now, value));
	        this._trimBufferThenGetEvents(now);
	        _super.prototype._next.call(this, value);
	    };
	    ReplaySubject.prototype._subscribe = function (subscriber) {
	        var events = this._trimBufferThenGetEvents(this._getNow());
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            subscriber.add(subscriber = new observeOn_support_1.ObserveOnSubscriber(subscriber, scheduler));
	        }
	        var index = -1;
	        var len = events.length;
	        while (++index < len && !subscriber.isUnsubscribed) {
	            subscriber.next(events[index].value);
	        }
	        return _super.prototype._subscribe.call(this, subscriber);
	    };
	    ReplaySubject.prototype._getNow = function () {
	        return (this.scheduler || queue_1.queue).now();
	    };
	    ReplaySubject.prototype._trimBufferThenGetEvents = function (now) {
	        var bufferSize = this.bufferSize;
	        var windowSize = this.windowSize;
	        var events = this.events;
	        var eventsCount = events.length;
	        var spliceCount = 0;
	        // Trim events that fall out of the time window.
	        // Start at the front of the list. Break early once
	        // we encounter an event that falls within the window.
	        while (spliceCount < eventsCount) {
	            if (now - events[spliceCount].time < windowSize) {
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
	}(Subject_1.Subject);
	exports.ReplaySubject = ReplaySubject;
	var ReplayEvent = function () {
	    function ReplayEvent(time, value) {
	        this.time = time;
	        this.value = value;
	    }
	    return ReplayEvent;
	}();
	//# sourceMappingURL=ReplaySubject.js.map

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	var ArgumentOutOfRangeError = function () {
	    function ArgumentOutOfRangeError() {
	        this.name = 'ArgumentOutOfRangeError';
	        this.message = 'argument out of range';
	    }
	    return ArgumentOutOfRangeError;
	}();
	exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
	//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * an error thrown when an action is invalid because the object
	 * has been unsubscribed
	 */
	var ObjectUnsubscribedError = function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        _super.call(this, 'object unsubscribed');
	        this.name = 'ObjectUnsubscribedError';
	    }
	    return ObjectUnsubscribedError;
	}(Error);
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function isObject(x) {
	    return x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";

	function throwError(e) {
	  throw e;
	}
	exports.throwError = throwError;
	//# sourceMappingURL=throwError.js.map

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var log = __webpack_require__(13);
	var assert = __webpack_require__(7);
	var find = __webpack_require__(29);
	var flatten = __webpack_require__(43);
	var castToObservable = __webpack_require__(96);

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var combineLatest = Observable.combineLatest;
	var empty = Observable.empty;
	var merge = Observable.merge;

	var _require2 = __webpack_require__(20);

	var KeySystemAccess = _require2.KeySystemAccess;
	var requestMediaKeySystemAccess = _require2.requestMediaKeySystemAccess;
	var setMediaKeys = _require2.setMediaKeys;
	var emeEvents = _require2.emeEvents;
	var shouldRenewMediaKeys = _require2.shouldRenewMediaKeys;
	var onEncrypted = emeEvents.onEncrypted;
	var onKeyMessage = emeEvents.onKeyMessage;
	var onKeyError = emeEvents.onKeyError;
	var onKeyStatusesChange = emeEvents.onKeyStatusesChange;


	var SYSTEMS = {
	  "clearkey": ["webkit-org.w3.clearkey", "org.w3.clearkey"],
	  "widevine": ["com.widevine.alpha"],
	  "playready": ["com.youtube.playready", "com.microsoft.playready"]
	};

	// Key statuses to error mapping. Taken from shaka-player.
	var KEY_STATUS_ERRORS = {
	  "expired": "eme: a required key has expired and the content cannot be decrypted.",
	  "internal-error": "eme: an unknown error has occurred in the CDM."
	};

	// "expired",
	// "released",
	// "output-restricted",
	// "output-downscaled",
	// "status-pending",
	function hashBuffer(buffer) {
	  var hash = 0;
	  var char = undefined;
	  for (var i = 0; i < buffer.length; i++) {
	    char = buffer[i];
	    hash = (hash << 5) - hash + char;
	    hash = hash & hash; // Convert to 32bit integer
	  }
	  return hash;
	}

	function hashInitData(initData) {
	  if (typeof initData == "number") {
	    return initData;
	  } else {
	    return hashBuffer(initData);
	  }
	}

	var NotSupportedKeySystemError = function NotSupportedKeySystemError() {
	  new Error("eme: could not find a compatible key system");
	};

	/**
	 * Set maintaining a representation of all currently loaded
	 * MediaKeySessions. This set allow to reuse sessions without re-
	 * negotiating a license exchange if the key is already used in a
	 * loaded session.
	 */

	var InMemorySessionsSet = function () {
	  function InMemorySessionsSet() {
	    _classCallCheck(this, InMemorySessionsSet);

	    this._entries = [];
	  }

	  InMemorySessionsSet.prototype.getFirst = function getFirst() {
	    if (this._entries.length > 0) {
	      return this._entries[0].session;
	    }
	  };

	  InMemorySessionsSet.prototype.get = function get(initData) {
	    initData = hashInitData(initData);
	    var entry = find(this._entries, function (entry) {
	      return entry.initData === initData;
	    });
	    if (entry) {
	      return entry.session;
	    }
	  };

	  InMemorySessionsSet.prototype.add = function add(initData, session, keySystem) {
	    initData = hashInitData(initData);
	    var currentSession = this.get(initData);
	    if (currentSession) {
	      this.deleteAndClose(currentSession);
	    }

	    var eventSubscription = sessionEventsHandler(session, keySystem).finally(function () {
	      $storedSessions.delete(initData);
	      $loadedSessions.deleteAndClose(session);
	    }).subscribe(null);

	    var entry = { session: session, initData: initData, eventSubscription: eventSubscription };
	    log.debug("eme-mem-store: add session", entry);
	    this._entries.push(entry);
	  };

	  InMemorySessionsSet.prototype.deleteById = function deleteById(sessionId) {
	    var entry = find(this._entries, function (e) {
	      return e.session.sessionId === sessionId;
	    });
	    if (entry) {
	      return this.delete(entry.session);
	    } else {
	      return null;
	    }
	  };

	  InMemorySessionsSet.prototype.delete = function _delete(session_) {
	    var entry = find(this._entries, function (e) {
	      return e.session === session_;
	    });
	    if (entry) {
	      log.debug("eme-mem-store: delete session", entry);
	      var idx = this._entries.indexOf(entry);
	      this._entries.splice(idx, 1);
	      entry.eventSubscription.unsubscribe();
	      return entry.session;
	    }
	  };

	  InMemorySessionsSet.prototype.deleteAndClose = function deleteAndClose(session_) {
	    var session = this.delete(session_);
	    if (session && session.sessionId) {
	      log.debug("eme-mem-store: close session", session);
	      return castToObservable(session.close()).catch(function () {
	        return Observable.of(null);
	      });
	    } else {
	      return Observable.of(null);
	    }
	  };

	  InMemorySessionsSet.prototype.dispose = function dispose() {
	    var _this = this;

	    var disposed = this._entries.map(function (e) {
	      return _this.deleteAndClose(e.session);
	    });
	    this._entries = [];
	    return merge.apply(null, disposed);
	  };

	  return InMemorySessionsSet;
	}();

	/**
	 * Set representing persisted licenses. Depends on a simple local-
	 * storage implementation with a `save`/`load` synchronous interface
	 * to persist informations on persisted sessions.
	 *
	 * This set is used only for a cdm/keysystem with license persistency
	 * supported.
	 */


	var PersistedSessionsSet = function () {
	  function PersistedSessionsSet(storage) {
	    _classCallCheck(this, PersistedSessionsSet);

	    this.setStorage(storage);
	  }

	  PersistedSessionsSet.prototype.setStorage = function setStorage(storage) {
	    if (this._storage === storage) {
	      return;
	    }

	    assert(storage, "eme: no licenseStorage given for keySystem with persistentLicense");

	    assert.iface(storage, "licenseStorage", { save: "function", load: "function" });

	    this._storage = storage;
	    try {
	      this._entries = this._storage.load();
	      assert(Array.isArray(this._entries));
	    } catch (e) {
	      log.warn("eme-persitent-store: could not get entries from license storage", e);
	      this.dispose();
	    }
	  };

	  PersistedSessionsSet.prototype.get = function get(initData) {
	    initData = hashInitData(initData);
	    var entry = find(this._entries, function (e) {
	      return e.initData === initData;
	    });
	    return entry || null;
	  };

	  PersistedSessionsSet.prototype.add = function add(initData, session) {
	    var sessionId = session && session.sessionId;
	    if (!sessionId) {
	      return;
	    }

	    initData = hashInitData(initData);
	    var currentEntry = this.get(initData);
	    if (currentEntry) {
	      this.delete(initData);
	    }

	    log.info("eme-persitent-store: add new session", sessionId, session);
	    this._entries.push({ sessionId: sessionId, initData: initData });
	    this._save();
	  };

	  PersistedSessionsSet.prototype.delete = function _delete(initData) {
	    initData = hashInitData(initData);

	    var entry = find(this._entries, function (e) {
	      return e.initData === initData;
	    });
	    if (entry) {
	      log.warn("eme-persitent-store: delete session from store", entry);

	      var idx = this._entries.indexOf(entry);
	      this._entries.splice(idx, 1);
	      this._save();
	    }
	  };

	  PersistedSessionsSet.prototype.dispose = function dispose() {
	    this._entries = [];
	    this._save();
	  };

	  PersistedSessionsSet.prototype._save = function _save() {
	    try {
	      this._storage.save(this._entries);
	    } catch (e) {
	      log.warn("eme-persitent-store: could not save licenses in localStorage");
	    }
	  };

	  return PersistedSessionsSet;
	}();

	var emptyStorage = {
	  load: function load() {
	    return [];
	  },
	  save: function save() {}
	};
	var $storedSessions = new PersistedSessionsSet(emptyStorage);
	var $loadedSessions = new InMemorySessionsSet();

	if (false) {
	  window.$loadedSessions = $loadedSessions;
	  window.$storedSessions = $storedSessions;
	}

	// Persisted singleton instance of MediaKeys. We do not allow multiple
	// CDM instances.
	var $mediaKeys = undefined;
	var $mediaKeySystemConfiguration = undefined;
	var $keySystem = undefined;
	var $videoElement = undefined;

	function getCachedKeySystemAccess(keySystems) {
	  // NOTE(pierre): alwaysRenew flag is used for IE11 which require the
	  // creation of a new MediaKeys instance for each session creation
	  if (!$keySystem || !$mediaKeys || shouldRenewMediaKeys()) {
	    return null;
	  }

	  var configuration = $mediaKeySystemConfiguration;
	  var foundKeySystem = find(keySystems, function (ks) {
	    if (ks.type !== $keySystem.type) {
	      return false;
	    }

	    if (ks.persistentLicense && configuration.persistentState != "required") {
	      return false;
	    }

	    if (ks.distinctiveIdentifierRequired && configuration.distinctiveIdentifier != "required") {
	      return false;
	    }

	    return true;
	  });

	  if (foundKeySystem) {
	    return {
	      keySystem: foundKeySystem,
	      keySystemAccess: new KeySystemAccess($keySystem, $mediaKeys, $mediaKeySystemConfiguration)
	    };
	  } else {
	    return null;
	  }
	}

	function buildKeySystemConfiguration(keySystem) {
	  var sessionTypes = ["temporary"];
	  var persistentState = "optional";
	  var distinctiveIdentifier = "optional";

	  if (keySystem.persistentLicense) {
	    persistentState = "required";
	    sessionTypes.push("persistent-license");
	  }

	  if (keySystem.persistentStateRequired) {
	    persistentState = "required";
	  }

	  if (keySystem.distinctiveIdentifierRequired) {
	    distinctiveIdentifier = "required";
	  }

	  return {
	    videoCapabilities: undefined,
	    audioCapabilities: undefined,
	    initDataTypes: ["cenc"],
	    distinctiveIdentifier: distinctiveIdentifier,
	    persistentState: persistentState,
	    sessionTypes: sessionTypes
	  };
	}

	function findCompatibleKeySystem(keySystems) {
	  // Fast way to find a compatible keySystem if the currently loaded
	  // one as exactly the same compatibility options.
	  var cachedKeySystemAccess = getCachedKeySystemAccess(keySystems);
	  if (cachedKeySystemAccess) {
	    log.debug("eme: found compatible keySystem quickly", cachedKeySystemAccess);
	    return Observable.of(cachedKeySystemAccess);
	  }

	  var keySystemsType = flatten(keySystems.map(function (keySystem) {
	    return SYSTEMS[keySystem.type].map(function (keyType) {
	      return { keyType: keyType, keySystem: keySystem };
	    });
	  }));

	  return Observable.create(function (obs) {
	    var disposed = false;
	    var sub = null;

	    function testKeySystem(index) {
	      if (disposed) {
	        return;
	      }

	      if (index >= keySystemsType.length) {
	        obs.onError(NotSupportedKeySystemError());
	        return;
	      }

	      var _keySystemsType$index = keySystemsType[index];
	      var keyType = _keySystemsType$index.keyType;
	      var keySystem = _keySystemsType$index.keySystem;

	      var keySystemConfigurations = [buildKeySystemConfiguration(keySystem)];

	      log.debug("eme: request keysystem access " + keyType + "," + (index + 1 + " of " + keySystemsType.length), keySystemConfigurations);

	      sub = requestMediaKeySystemAccess(keyType, keySystemConfigurations).subscribe(function (keySystemAccess) {
	        log.info("eme: found compatible keysystem", keyType, keySystemConfigurations);
	        obs.next({ keySystem: keySystem, keySystemAccess: keySystemAccess });
	        obs.complete();
	      }, function () {
	        log.debug("eme: rejected access to keysystem", keyType, keySystemConfigurations);
	        sub = null;
	        testKeySystem(index + 1);
	      });
	    }

	    testKeySystem(0);

	    (function () {
	      disposed = true;
	      if (sub) {
	        sub.unsubscribe();
	      }
	    });
	  });
	}

	function createAndSetMediaKeys(video, keySystem, keySystemAccess) {
	  var oldVideoElement = $videoElement;
	  var oldMediaKeys = $mediaKeys;

	  return castToObservable(keySystemAccess.createMediaKeys()).flatMap(function (mk) {
	    $mediaKeys = mk;
	    $mediaKeySystemConfiguration = keySystemAccess.getConfiguration();
	    $keySystem = keySystem;
	    $videoElement = video;

	    if (video.mediaKeys === mk) {
	      return Observable.of(mk);
	    }

	    if (oldMediaKeys && oldMediaKeys !== $mediaKeys) {
	      // if we change our mediaKeys singleton, we need to dispose all existing
	      // sessions linked to the previous one.
	      $loadedSessions.dispose();
	    }

	    var mediaKeysSetter = undefined;
	    if (oldVideoElement && oldVideoElement !== $videoElement) {
	      log.debug("eme: unlink old video element and set mediakeys");
	      mediaKeysSetter = setMediaKeys(oldVideoElement, null).concat(setMediaKeys($videoElement, mk));
	    } else {
	      log.debug("eme: set mediakeys");
	      mediaKeysSetter = setMediaKeys($videoElement, mk);
	    }

	    return mediaKeysSetter.mapTo(mk);
	  });
	}

	function createSession(mediaKeys, sessionType) {
	  log.debug("eme: create a new " + sessionType + " session");
	  return mediaKeys.createSession(sessionType);
	}

	function createSessionAndMakeNewKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData) {
	  var session = createSession(mediaKeys, sessionType);
	  $loadedSessions.add(initData, session, keySystem);

	  log.debug("eme: generate request", initDataType, initData);
	  return castToObservable(session.generateRequest(initDataType, initData)).do(function () {
	    if (sessionType == "persistent-license") {
	      $storedSessions.add(initData, session);
	    }
	  }).mapTo(session);
	}

	function createPersistedSessionAndLoad(mediaKeys, keySystem, storedSessionId, initDataType, initData) {
	  log.debug("eme: load persisted session", storedSessionId);

	  var sessionType = "persistent-license";
	  var session = createSession(mediaKeys, sessionType);
	  return castToObservable(session.load(storedSessionId)).map(function (success) {
	    if (success) {
	      $storedSessions.add(initData, session, keySystem);
	      $loadedSessions.add(initData, session);
	    } else {
	      log.warn("eme: no data stored for the loaded session, removing it", storedSessionId);

	      castToObservable(session.remove()).catch(function (err) {
	        return log.warn("eme: could not remove session", err);
	      });

	      $storedSessions.delete(initData);
	      $loadedSessions.deleteById(storedSessionId);
	    }
	    return { success: success, session: session };
	  }).catch(function (e) {
	    $storedSessions.delete(initData);
	    $loadedSessions.deleteById(storedSessionId);
	    throw e;
	  });
	}

	function makeNewSessionAndCreateKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData) {
	  return createSessionAndMakeNewKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData).catch(function (err) {
	    var firstLoadedSession = $loadedSessions.getFirst();
	    if (!firstLoadedSession) {
	      throw err;
	    }

	    log.warn("eme: could not create a new session, " + "retry after closing a currently loaded session", err);

	    return $loadedSessions.deleteAndClose(firstLoadedSession).flatMap(function () {
	      return createSessionAndMakeNewKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData);
	    });
	  });
	}

	function makeNewPersistentSessionAndLoad(mediaKeys, keySystem, storedSessionId, initDataType, initData) {
	  var sessionType = "persistent-license";

	  return createPersistedSessionAndLoad(mediaKeys, keySystem, storedSessionId, initDataType, initData).catch(function (err) {
	    log.warn("eme: failed to load persisted session, do fallback", storedSessionId, err);

	    var newSession = makeNewSessionAndCreateKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData);

	    return newSession.map(function (session) {
	      return { success: true, session: session };
	    });
	  }).flatMap(function (_ref) {
	    var success = _ref.success;
	    var session = _ref.session;

	    if (success) {
	      log.debug("eme: successfully loaded session");
	      return Observable.of(session);
	    }

	    return makeNewSessionAndCreateKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData);
	  });
	}

	// listen to "message" events from session containing a challenge
	// blob and map them to licenses using the getLicense method from
	// selected keySystem
	function sessionEventsHandler(session, keySystem) {
	  log.debug("eme: handle message events for session", session.sessionId);
	  var sessionId = undefined;

	  var keyErrors = onKeyError(session).map(function (err) {
	    return logAndThrow("eme: keyerror event " + err.errorCode + " / " + err.systemCode, err);
	  });

	  var keyStatusesChanges = onKeyStatusesChange(session).flatMap(function (keyStatusesEvent) {
	    sessionId = keyStatusesEvent.sessionId;
	    log.debug("eme: keystatuseschange event", sessionId, session, keyStatusesEvent);

	    // find out possible errors associated with this event
	    session.keyStatuses.forEach(function (keyId, keyStatus) {
	      // TODO: remove this hack present because the order of the
	      // arguments has changed in spec and is not the same between
	      // Edge and Chrome.
	      var errMessage = KEY_STATUS_ERRORS[keyStatus] || KEY_STATUS_ERRORS[keyId];
	      if (errMessage) {
	        logAndThrow(errMessage);
	      }
	    });

	    // otherwise use the keysystem handler if disponible
	    if (!keySystem.onKeyStatusesChange) {
	      log.warn("eme: keystatuseschange event not handled");
	      return empty();
	    }

	    var license = undefined;
	    try {
	      license = keySystem.onKeyStatusesChange(keyStatusesEvent, session);
	    } catch (e) {
	      license = Observable.throw(e);
	    }

	    return castToObservable(license).catch(function (err) {
	      return logAndThrow("eme: onKeyStatusesChange has failed " + ("(reason:" + (err && err.message || "unknown") + ")"), err);
	    });
	  });

	  var keyMessages = onKeyMessage(session).flatMap(function (messageEvent) {
	    sessionId = messageEvent.sessionId;

	    var message = new Uint8Array(messageEvent.message);
	    var messageType = messageEvent.messageType || "license-request";

	    log.debug("eme: event message type " + messageType, session, messageEvent);

	    var license = undefined;
	    try {
	      license = keySystem.getLicense(message, messageType);
	    } catch (e) {
	      license = Observable.throw(e);
	    }

	    return castToObservable(license).catch(function (err) {
	      return logAndThrow("eme: getLicense has failed " + ("(reason: " + (err && err.message || "unknown") + ")"), err);
	    });
	  });

	  var sessionUpdates = merge(keyMessages, keyStatusesChanges).concatMap(function (res) {
	    log.debug("eme: update session", sessionId, res);

	    return castToObservable(session.update(res, sessionId)).catch(function (err) {
	      return logAndThrow("eme: error on session update " + sessionId, err);
	    });
	  });

	  var sessionEvents = merge(sessionUpdates, keyErrors);
	  if (session.closed) {
	    return sessionEvents.takeUntil(castToObservable(session.closed));
	  } else {
	    return sessionEvents;
	  }
	}

	function manageSessionCreation(mediaKeys, mediaKeySystemConfiguration, keySystem, initDataType, initData) {
	  // reuse currently loaded sessions without making a new key
	  // request
	  var loadedSession = $loadedSessions.get(initData);
	  if (loadedSession && loadedSession.sessionId) {
	    log.debug("eme: reuse loaded session", loadedSession.sessionId);
	    return Observable.of(loadedSession);
	  }

	  var sessionTypes = mediaKeySystemConfiguration.sessionTypes;
	  var persistentLicenseSupported = sessionTypes && sessionTypes.indexOf("persistent-license") >= 0;

	  var sessionType = persistentLicenseSupported && keySystem.persistentLicense ? "persistent-license" : "temporary";

	  if (persistentLicenseSupported && keySystem.persistentLicense) {
	    var storedEntry = $storedSessions.get(initData);

	    // if a persisted session exists in the store associated to this
	    // initData, we reuse it without a new license request through
	    // the `load` method.
	    if (storedEntry) {
	      return makeNewPersistentSessionAndLoad(mediaKeys, keySystem, storedEntry.sessionId, initDataType, initData);
	    }
	  }

	  // we have a fresh session without persisted informations and need
	  // to make a new key request that we will associate to this
	  // session
	  return makeNewSessionAndCreateKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData);
	}

	function logAndThrow(errMessage, reason) {
	  var error = new Error(errMessage);
	  if (reason) {
	    error.reason = reason;
	  }
	  log.error(errMessage, reason);
	  throw error;
	}

	/**
	 * EME abstraction and event handler used to communicate with the Content-
	 * Description-Module (CDM).
	 *
	 * The communication with backend key-servers is not handled directly by this
	 * module but through the given "KeySystems".
	 *
	 * A system has to expose the given interface:
	 * interface KeySystem {
	 *   readonly attribute string type;
	 *
	 *   Promise<AB> getLicense((AB) challenge);
	 *   AB extractInitData(AB);
	 * }
	 * with AB = ArrayBuffer or ArrayBufferView
	 *
	 * The `extraInitData` method is not mandatory and used to pre-process the
	 * initData vector injected into the CDM. The `getLicense` method is used to
	 * serve the license encapsulated in a promise to support asynchronous license
	 * fetching. The challenge buffer sent by the CDM is directly passed as first
	 * argument of this method.
	 *
	 * The EME handler can be given one or multiple systems and will choose the
	 * appropriate one supported by the user's browser.
	 */
	function EME(video, keySystems) {
	  if (false) {
	    keySystems.forEach(function (ks) {
	      return assert.iface(ks, "keySystem", {
	        getLicense: "function",
	        type: "string"
	      });
	    });
	  }

	  function handleEncryptedEvents(encryptedEvent, _ref2) {
	    var keySystem = _ref2.keySystem;
	    var keySystemAccess = _ref2.keySystemAccess;

	    if (keySystem.persistentLicense) {
	      $storedSessions.setStorage(keySystem.licenseStorage);
	    }

	    log.info("eme: encrypted event", encryptedEvent);
	    return createAndSetMediaKeys(video, keySystem, keySystemAccess).flatMap(function (mediaKeys) {
	      return manageSessionCreation(mediaKeys, keySystemAccess.getConfiguration(), keySystem, encryptedEvent.initDataType, new Uint8Array(encryptedEvent.initData));
	    });
	  }

	  return combineLatest(onEncrypted(video), findCompatibleKeySystem(keySystems)).take(1).flatMap(function (_ref3) {
	    var evt = _ref3[0];
	    var ks = _ref3[1];
	    return handleEncryptedEvents(evt, ks);
	  });
	}

	EME.onEncrypted = onEncrypted;
	EME.getCurrentKeySystem = function () {
	  return $keySystem && $keySystem.type;
	};
	EME.dispose = function () {
	  $mediaKeys = null;
	  $keySystem = null;
	  $loadedSessions.dispose();
	};

	module.exports = EME;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);

	var _require = __webpack_require__(53);

	var getAdaptationsByType = _require.getAdaptationsByType;

	var _require2 = __webpack_require__(33);

	var InitSegment = _require2.InitSegment;

	var Template = __webpack_require__(351);
	var Timeline = __webpack_require__(94);
	var List = __webpack_require__(350);
	var Base = __webpack_require__(349);

	function OutOfIndexError(type) {
	  this.name = "OutOfIndexError";
	  this.type = type;
	  this.message = "out of range in index " + type;
	}
	OutOfIndexError.prototype = new Error();

	function selectIndexHandler(index) {
	  switch (index.indexType) {
	    case "template":
	      return Template;
	    case "timeline":
	      return Timeline;
	    case "list":
	      return List;
	    case "base":
	      return Base;
	    default:
	      throw new Error("index-handler: unrecognized indexType " + index.indexType);
	  }
	}

	function getLiveEdge(manifest) {
	  // TODO(pierre): improve index access ?
	  var videoAda = getAdaptationsByType(manifest, "video");
	  var videoIdx = videoAda[0].representations[0].index;
	  return selectIndexHandler(videoIdx).getLiveEdge(videoIdx, manifest);
	}

	var IndexHandler = function () {
	  function IndexHandler(adaptation, representation) {
	    _classCallCheck(this, IndexHandler);

	    this.adaptation = adaptation;
	    this.representation = representation;
	    this.index = representation.index;
	    this.handler = new (selectIndexHandler(this.index))(adaptation, representation, this.index);
	  }

	  IndexHandler.prototype.getInitSegment = function getInitSegment() {
	    var initialization = this.index.initialization || {};
	    return new InitSegment(this.adaptation, this.representation, initialization.media, initialization.range, this.index.indexRange);
	  };

	  IndexHandler.prototype.normalizeRange = function normalizeRange(ts, offset, bufSize) {
	    var presentationOffset = this.index.presentationTimeOffset || 0;
	    var timescale = this.index.timescale || 1;

	    if (!offset) {
	      offset = 0;
	    }
	    if (!bufSize) {
	      bufSize = 0;
	    }

	    offset = Math.min(offset, bufSize);

	    return {
	      time: ts * timescale - presentationOffset,
	      up: (ts + offset) * timescale - presentationOffset,
	      to: (ts + bufSize) * timescale - presentationOffset
	    };
	  };

	  IndexHandler.prototype.getSegments = function getSegments(ts, offset, bufSize) {
	    var _normalizeRange = this.normalizeRange(ts, offset, bufSize);

	    var time = _normalizeRange.time;
	    var up = _normalizeRange.up;
	    var to = _normalizeRange.to;

	    if (!this.handler.checkRange(time)) {
	      throw new OutOfIndexError(this.index.indexType);
	    }

	    return this.handler.getSegments(up, to);
	  };

	  IndexHandler.prototype.insertNewSegments = function insertNewSegments(nextSegments, currentSegment) {
	    var addedSegments = [];
	    for (var i = 0; i < nextSegments.length; i++) {
	      if (this.handler.addSegment(nextSegments[i], currentSegment)) {
	        addedSegments.push(nextSegments[i]);
	      }
	    }
	    return addedSegments;
	  };

	  IndexHandler.prototype.setTimescale = function setTimescale(timescale) {
	    var index = this.index;


	    if (false) {
	      assert(typeof timescale == "number");
	      assert(timescale > 0);
	    }

	    if (index.timescale !== timescale) {
	      index.timescale = timescale;
	      return true;
	    }

	    return false;
	  };

	  IndexHandler.prototype.scale = function scale(time) {
	    if (false) {
	      assert(this.index.timescale > 0);
	    }

	    return time / this.index.timescale;
	  };

	  return IndexHandler;
	}();

	module.exports = {
	  OutOfIndexError: OutOfIndexError,
	  IndexHandler: IndexHandler,
	  getLiveEdge: getLiveEdge
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(33);

	var Segment = _require.Segment;


	function getTimelineBound(_ref) {
	  var ts = _ref.ts;
	  var d = _ref.d;
	  var r = _ref.r;

	  if (d === -1) {
	    return ts;
	  } else {
	    return ts + (r + 1) * d;
	  }
	}

	var Timeline = function () {
	  function Timeline(adaptation, representation, index) {
	    _classCallCheck(this, Timeline);

	    this.adaptation = adaptation;
	    this.representation = representation;
	    this.index = index;
	    this.timeline = index.timeline;
	  }

	  Timeline.getLiveEdge = function getLiveEdge(videoIndex, manifest) {
	    var lastTimelineElement = videoIndex.timeline[videoIndex.timeline.length - 1];
	    var calculatedLiveEdge = getTimelineBound(lastTimelineElement) / videoIndex.timescale - manifest.suggestedPresentationDelay;
	    var minimumLiveEdge = videoIndex.timeline[0].ts / videoIndex.timescale + 1.0;

	    return Math.max(minimumLiveEdge, calculatedLiveEdge);
	  };

	  Timeline.prototype.createSegment = function createSegment(time, range, duration) {
	    var adaptation = this.adaptation;
	    var representation = this.representation;
	    var media = this.index.media;

	    return Segment.create(adaptation, /* adaptation */
	    representation, /* representation */
	    time, /* id */
	    media, /* media */
	    time, /* time */
	    duration, /* duration */
	    0, /* number */
	    range, /* range */
	    null, /* indexRange */
	    false /* init */
	    );
	  };

	  Timeline.prototype.calculateRepeat = function calculateRepeat(seg, nextSeg) {
	    var rep = seg.r || 0;

	    // A negative value of the @r attribute of the S element indicates
	    // that the duration indicated in @d attribute repeats until the
	    // start of the next S element, the end of the Period or until the
	    // next MPD update.
	    if (rep < 0) {
	      var repEnd = nextSeg ? nextSeg.t : Infinity;
	      rep = Math.ceil((repEnd - seg.ts) / seg.d) - 1;
	    }

	    return rep;
	  };

	  Timeline.prototype.checkRange = function checkRange(up) {
	    var last = this.timeline[this.timeline.length - 1];
	    if (!last) {
	      return true;
	    }

	    if (last.d < 0) {
	      last = { ts: last.ts, d: 0, r: last.r };
	    }

	    return up <= getTimelineBound(last);
	  };

	  Timeline.prototype.getSegmentIndex = function getSegmentIndex(ts) {
	    var timeline = this.timeline;
	    var low = 0;
	    var high = timeline.length;

	    while (low < high) {
	      var mid = low + high >>> 1;
	      if (timeline[mid].ts < ts) {
	        low = mid + 1;
	      } else {
	        high = mid;
	      }
	    }

	    return low > 0 ? low - 1 : low;
	  };

	  Timeline.prototype.getSegmentNumber = function getSegmentNumber(ts, up, duration) {
	    var diff = up - ts;
	    if (diff > 0) {
	      return Math.floor(diff / duration);
	    } else {
	      return 0;
	    }
	  };

	  Timeline.prototype.getSegments = function getSegments(up, to) {
	    var timeline = this.index.timeline;
	    var segments = [];

	    var timelineLength = timeline.length;
	    var timelineIndex = this.getSegmentIndex(up) - 1;
	    // TODO(pierre): use @maxSegmentDuration if possible
	    var maxDuration = timeline.length && timeline[0].d || 0;

	    loop: for (;;) {
	      if (++timelineIndex >= timelineLength) {
	        break;
	      }

	      var segmentRange = timeline[timelineIndex];
	      var d = segmentRange.d;
	      var ts = segmentRange.ts;
	      var range = segmentRange.range;

	      maxDuration = Math.max(maxDuration, d);

	      // live-added segments have @d attribute equals to -1
	      if (d < 0) {
	        if (ts + maxDuration < to) {
	          segments.push(this.createSegment(ts, range, undefined));
	        }
	        break;
	      }

	      var repeat = this.calculateRepeat(segmentRange, timeline[timelineIndex + 1]);
	      var segmentNumber = this.getSegmentNumber(ts, up, d);
	      var segmentTime = undefined;
	      while ((segmentTime = ts + segmentNumber * d) < to) {
	        if (segmentNumber++ <= repeat) {
	          segments.push(this.createSegment(segmentTime, range, d));
	        } else {
	          continue loop;
	        }
	      }

	      break;
	    }

	    return segments;
	  };

	  Timeline.prototype.addSegment = function addSegment(newSegment, currentSegment) {
	    var timeline = this.timeline;
	    var timelineLength = timeline.length;
	    var last = timeline[timelineLength - 1];

	    // in some circumstances, the new segment informations are only
	    // duration informations that we can use de deduct the ts of the
	    // next segment. this is the case where the new segment are
	    // associated to a current segment and have the same ts
	    var shouldDeductNextSegment = !!currentSegment && newSegment.ts === currentSegment.ts;
	    if (shouldDeductNextSegment) {
	      var newSegmentTs = newSegment.ts + newSegment.d;
	      var lastSegmentTs = last.ts + last.d * last.r;
	      var tsDiff = newSegmentTs - lastSegmentTs;

	      if (tsDiff <= 0) {
	        return false;
	      }

	      // try to use the compact notation with @r attribute on the last
	      // to elements of the timeline if we find out they have the same
	      // duration
	      if (last.d === -1) {
	        var prev = timeline[timelineLength - 2];
	        if (prev && prev.d === tsDiff) {
	          prev.r++;
	          timeline.pop();
	        } else {
	          last.d = tsDiff;
	        }
	      }

	      timeline.push({ d: -1, ts: newSegmentTs, r: 0 });
	      return true;
	    }

	    // if the given timing has a timestamp after le timeline bound we
	    // just need to push a new element in the timeline, or increase
	    // the @r attribute of the last element.
	    else if (newSegment.ts >= getTimelineBound(last)) {
	        if (last.d === newSegment.d) {
	          last.r++;
	        } else {
	          timeline.push({ d: newSegment.d, ts: newSegment.ts, r: 0 });
	        }
	        return true;
	      }

	    return false;
	  };

	  return Timeline;
	}();

	module.exports = Timeline;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var BehaviorSubject = _require.BehaviorSubject;

	var _require2 = __webpack_require__(32);

	var BufferedRanges = _require2.BufferedRanges;

	// time changes interval in milliseconds

	var TIMINGS_SAMPLING_INTERVAL = 1000;

	// time in seconds protecting live buffer to prevent ahead of time
	// buffering
	var LIVE_PROTECTION = 10;

	// stall gap in seconds
	var STALL_GAP = 0.5;
	var RESUME_GAP = 5;

	// seek gap in seconds
	var SEEK_GAP = 2;

	// waiting time differs between a "seeking" stall and
	// a buffering stall
	function resumeGap(stalled) {
	  return stalled.name == "seeking" ? STALL_GAP : RESUME_GAP;
	}

	function isEnding(gap, range, duration) {
	  if (range) {
	    return duration - (gap + range.end) <= STALL_GAP;
	  } else {
	    return false;
	  }
	}

	var Timings = function () {
	  function Timings(ts, buffered, duration, gap, name, playback, range, readyState, stalled) {
	    _classCallCheck(this, Timings);

	    this.ts = ts;
	    this.buffered = buffered;
	    this.duration = duration;
	    this.gap = gap;
	    this.name = name;
	    this.playback = playback;
	    this.range = range;
	    this.readyState = readyState;
	    this.stalled = stalled;
	  }

	  Timings.prototype.clone = function clone() {
	    return new Timings(this.ts, this.buffered, this.duration, this.gap, this.name, this.playback, this.range, this.readyState, this.stalled);
	  };

	  return Timings;
	}();

	function getEmptyTimings() {
	  return new Timings(0, new BufferedRanges(), 0, Infinity, "timeupdate", 1, null, 0, null);
	}

	function getTimings(video, name) {
	  var ts = video.currentTime;
	  var buffered = new BufferedRanges(video.buffered);
	  return new Timings(ts, buffered, video.duration, buffered.getGap(ts), name, video.playbackRate, buffered.getRange(ts), video.readyState, null);
	}

	/**
	 * Timings observable.
	 *
	 * This streams samples snapshots of player's current state:
	 *   * time position
	 *   * playback rate
	 *   * current buffered range
	 *   * gap with current buffered range ending
	 *   * video duration
	 *
	 * In addition to sampling, this stream also reacts to "seeking" and "play"
	 * events.
	 *
	 * Observable is shared for performance reason: reduces the number of event
	 * listeners and intervals/timeouts but also limit access to <video>
	 * properties and gap calculations.
	 *
	 * The sampling is manual instead of based on "timeupdate" to reduce the
	 * number of events.
	 */
	function timingsSampler(video) {

	  function scanTimingsSamples(prevTimings, timingEventType) {
	    var currentTimings = getTimings(video, timingEventType);

	    var wasStalled = prevTimings.stalled;
	    var currentGap = currentTimings.gap;

	    var hasStalled = timingEventType != "loadedmetadata" && !wasStalled && !isEnding(currentGap, currentTimings.range, currentTimings.duration) && (currentGap <= STALL_GAP || currentGap === Infinity);

	    var stalled = undefined;
	    if (hasStalled) {
	      stalled = {
	        name: currentTimings.name,
	        playback: currentTimings.playback
	      };
	    } else if (wasStalled && currentGap < Infinity && currentGap > resumeGap(wasStalled)) {
	      stalled = null;
	    } else {
	      stalled = wasStalled;
	    }

	    currentTimings.stalled = stalled;
	    return currentTimings;
	  }

	  return Observable.create(function (obs) {
	    var prevTimings = getTimings(video, "init");

	    function emitSample(evt) {
	      var timingEventType = evt && evt.type || "timeupdate";
	      prevTimings = scanTimingsSamples(prevTimings, timingEventType);
	      obs.next(prevTimings);
	    }

	    var samplerInterval = setInterval(emitSample, TIMINGS_SAMPLING_INTERVAL);

	    video.addEventListener("play", emitSample);
	    video.addEventListener("progress", emitSample);
	    video.addEventListener("seeking", emitSample);
	    video.addEventListener("seeked", emitSample);
	    video.addEventListener("loadedmetadata", emitSample);

	    obs.next(prevTimings);

	    return function () {
	      clearInterval(samplerInterval);

	      video.removeEventListener("play", emitSample);
	      video.removeEventListener("progress", emitSample);
	      video.removeEventListener("seeking", emitSample);
	      video.removeEventListener("seeked", emitSample);
	      video.removeEventListener("loadedmetadata", emitSample);
	    };
	  }).multicast(function () {
	    return new BehaviorSubject({ name: "init", stalled: null });
	  }).refCount();
	}

	function seekingsSampler(timingsSampling) {
	  return timingsSampling.filter(function (t) {
	    return t.name == "seeking" && (t.gap === Infinity || t.gap < -SEEK_GAP);
	  })
	  // skip the first seeking event generated by the set of the
	  // initial seeking time in the video
	  .skip(1).startWith(true);
	}

	function toWallClockTime(ts, manifest) {
	  return new Date((ts + manifest.availabilityStartTime) * 1000);
	}

	function fromWallClockTime(timeInMs, manifest) {
	  return normalizeWallClockTime(timeInMs, manifest) / 1000 - manifest.availabilityStartTime;
	}

	function normalizeWallClockTime(timeInMs, manifest) {
	  var suggestedPresentationDelay = manifest.suggestedPresentationDelay;
	  var presentationLiveGap = manifest.presentationLiveGap;
	  var timeShiftBufferDepth = manifest.timeShiftBufferDepth;


	  if (typeof timeInMs != "number") {
	    timeInMs = timeInMs.getTime();
	  }

	  var now = Date.now();
	  var max = now - (presentationLiveGap + suggestedPresentationDelay) * 1000;
	  var min = now - timeShiftBufferDepth * 1000;
	  return Math.max(Math.min(timeInMs, max), min);
	}

	function getLiveGap(ts, manifest) {
	  if (!manifest.isLive) {
	    return Infinity;
	  }

	  var availabilityStartTime = manifest.availabilityStartTime;
	  var presentationLiveGap = manifest.presentationLiveGap;


	  var liveGap = Date.now() / 1000 - ts;
	  return liveGap - (availabilityStartTime + presentationLiveGap + LIVE_PROTECTION);
	}

	module.exports = {
	  getEmptyTimings: getEmptyTimings,
	  getTimings: getTimings,
	  timingsSampler: timingsSampler,
	  seekingsSampler: seekingsSampler,
	  getLiveGap: getLiveGap,
	  toWallClockTime: toWallClockTime,
	  fromWallClockTime: fromWallClockTime
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var fromPromise = Observable.fromPromise;


	function castToObservable(value) {
	  if (value && typeof value.subscribe == "function") {
	    return value;
	  }

	  if (value && typeof value.then == "function") {
	    return fromPromise(value);
	  }

	  return Observable.of(value);
	}

	module.exports = castToObservable;

/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEachRight = __webpack_require__(107),
	    createFind = __webpack_require__(64);

	/**
	 * This method is like `_.find` except that it iterates over elements of
	 * `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * _.findLast([1, 2, 3, 4], function(n) {
	 *   return n % 2 == 1;
	 * });
	 * // => 3
	 */
	var findLast = createFind(baseEachRight, true);

	module.exports = findLast;

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;

/***/ },
/* 101 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Used by `_.defaults` to customize its `_.assign` use.
	 *
	 * @private
	 * @param {*} objectValue The destination object property value.
	 * @param {*} sourceValue The source object property value.
	 * @returns {*} Returns the value to assign to the destination object.
	 */
	function assignDefaults(objectValue, sourceValue) {
	  return objectValue === undefined ? sourceValue : objectValue;
	}

	module.exports = assignDefaults;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(24);

	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? result !== value : value === value) || value === undefined && !(key in object)) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	module.exports = assignWith;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCopy = __webpack_require__(105),
	    keys = __webpack_require__(24);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	    return source == null ? object : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var baseMatches = __webpack_require__(117),
	    baseMatchesProperty = __webpack_require__(118),
	    bindCallback = __webpack_require__(61),
	    identity = __webpack_require__(71),
	    property = __webpack_require__(135);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func === 'undefined' ? 'undefined' : _typeof(func);
	  if (type == 'function') {
	    return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;

/***/ },
/* 105 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(112),
	    createBaseEach = __webpack_require__(62);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwnRight = __webpack_require__(113),
	    createBaseEach = __webpack_require__(62);

	/**
	 * The base implementation of `_.forEachRight` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEachRight = createBaseEach(baseForOwnRight, true);

	module.exports = baseEachRight;

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function (value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while (fromRight ? index-- : ++index < length) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(99),
	    isArguments = __webpack_require__(45),
	    isArray = __webpack_require__(17),
	    isArrayLike = __webpack_require__(34),
	    isObjectLike = __webpack_require__(23);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(63);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(111),
	    keys = __webpack_require__(24);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForRight = __webpack_require__(114),
	    keys = __webpack_require__(24);

	/**
	 * The base implementation of `_.forOwnRight` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwnRight(object, iteratee) {
	  return baseForRight(object, iteratee, keys);
	}

	module.exports = baseForOwnRight;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(63);

	/**
	 * This function is like `baseFor` except that it iterates over properties
	 * in the opposite order.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseForRight = createBaseFor(true);

	module.exports = baseForRight;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var equalArrays = __webpack_require__(124),
	    equalByTag = __webpack_require__(125),
	    equalObjects = __webpack_require__(126),
	    isArray = __webpack_require__(17),
	    isTypedArray = __webpack_require__(131);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(59),
	    toObject = __webpack_require__(16);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(116),
	    getMatchData = __webpack_require__(127),
	    toObject = __webpack_require__(16);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function (object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || key in toObject(object));
	    };
	  }
	  return function (object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(58),
	    baseIsEqual = __webpack_require__(59),
	    baseSlice = __webpack_require__(120),
	    isArray = __webpack_require__(17),
	    isKey = __webpack_require__(68),
	    isStrictComparable = __webpack_require__(69),
	    last = __webpack_require__(97),
	    toObject = __webpack_require__(16),
	    toPath = __webpack_require__(70);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = path + '';

	  path = toPath(path);
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue ? srcValue !== undefined || key in object : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(58),
	    toPath = __webpack_require__(70);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = path + '';
	  path = toPath(path);
	  return function (object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;

/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : +start || 0;
	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end === undefined || end > length ? length : +end || 0;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;

/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : value + '';
	}

	module.exports = baseToString;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindCallback = __webpack_require__(61),
	    isIterateeCall = __webpack_require__(67),
	    restParam = __webpack_require__(57);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function (object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= customizer ? 1 : 0;
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var restParam = __webpack_require__(57);

	/**
	 * Creates a `_.defaults` or `_.defaultsDeep` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Function} Returns the new defaults function.
	 */
	function createDefaults(assigner, customizer) {
	  return restParam(function (args) {
	    var object = args[0];
	    if (object == null) {
	      return object;
	    }
	    args.push(customizer);
	    return assigner.apply(undefined, args);
	  });
	}

	module.exports = createDefaults;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arraySome = __webpack_require__(100);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	      })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;

/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == other + '';
	  }
	  return false;
	}

	module.exports = equalByTag;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(24);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStrictComparable = __webpack_require__(69),
	    pairs = __webpack_require__(134);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(45),
	    isArray = __webpack_require__(17),
	    isIndex = __webpack_require__(44),
	    isLength = __webpack_require__(22),
	    keysIn = __webpack_require__(133);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(18);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(129),
	    isObjectLike = __webpack_require__(23);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(22),
	    isObjectLike = __webpack_require__(23);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assignWith = __webpack_require__(102),
	    baseAssign = __webpack_require__(103),
	    createAssigner = __webpack_require__(122);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it's invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function (object, source, customizer) {
	    return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
	});

	module.exports = assign;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(45),
	    isArray = __webpack_require__(17),
	    isIndex = __webpack_require__(44),
	    isLength = __webpack_require__(22),
	    isObject = __webpack_require__(18);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(24),
	    toObject = __webpack_require__(16);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(60),
	    basePropertyDeep = __webpack_require__(119),
	    isKey = __webpack_require__(68);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var InnerSubscriber = function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber);
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 137 */
/***/ function(module, exports) {

	"use strict";

	exports.empty = {
	    isUnsubscribed: true,
	    next: function next(value) {},
	    error: function error(err) {
	        throw err;
	    },
	    complete: function complete() {}
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Subscriber_1 = __webpack_require__(2);
	var Operator = function () {
	    function Operator() {}
	    Operator.prototype.call = function (subscriber) {
	        return new Subscriber_1.Subscriber(subscriber);
	    };
	    return Operator;
	}();
	exports.Operator = Operator;
	//# sourceMappingURL=Operator.js.map

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var bindCallback_1 = __webpack_require__(240);
	Observable_1.Observable.bindCallback = bindCallback_1.BoundCallbackObservable.create;
	//# sourceMappingURL=bindCallback.js.map

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Observable_1 = __webpack_require__(1);
	var bindNodeCallback_1 = __webpack_require__(241);
	Observable_1.Observable.bindNodeCallback = bindNodeCallback_1.BoundNodeCallbackObservable.create;
	//# sourceMappingURL=bindNodeCallback.js.map

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var defer_1 = __webpack_require__(242);
	Observable_1.Observable.defer = defer_1.DeferObservable.create;
	//# sourceMappingURL=defer.js.map

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var empty_1 = __webpack_require__(25);
	Observable_1.Observable.empty = empty_1.EmptyObservable.create;
	//# sourceMappingURL=empty.js.map

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var forkJoin_1 = __webpack_require__(243);
	Observable_1.Observable.forkJoin = forkJoin_1.ForkJoinObservable.create;
	//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var from_1 = __webpack_require__(244);
	Observable_1.Observable.from = from_1.FromObservable.create;
	//# sourceMappingURL=from.js.map

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var fromArray_1 = __webpack_require__(12);
	Observable_1.Observable.fromArray = fromArray_1.ArrayObservable.create;
	Observable_1.Observable.of = fromArray_1.ArrayObservable.of;
	//# sourceMappingURL=fromArray.js.map

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var fromEvent_1 = __webpack_require__(245);
	Observable_1.Observable.fromEvent = fromEvent_1.FromEventObservable.create;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var fromEventPattern_1 = __webpack_require__(246);
	Observable_1.Observable.fromEventPattern = fromEventPattern_1.FromEventPatternObservable.create;
	//# sourceMappingURL=fromEventPattern.js.map

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var fromPromise_1 = __webpack_require__(47);
	Observable_1.Observable.fromPromise = fromPromise_1.PromiseObservable.create;
	//# sourceMappingURL=fromPromise.js.map

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var interval_1 = __webpack_require__(247);
	Observable_1.Observable.interval = interval_1.IntervalObservable.create;
	//# sourceMappingURL=interval.js.map

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var never_1 = __webpack_require__(248);
	Observable_1.Observable.never = never_1.InfiniteObservable.create;
	//# sourceMappingURL=never.js.map

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var range_1 = __webpack_require__(249);
	Observable_1.Observable.range = range_1.RangeObservable.create;
	//# sourceMappingURL=range.js.map

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var throw_1 = __webpack_require__(73);
	Observable_1.Observable.throw = throw_1.ErrorObservable.create;
	//# sourceMappingURL=throw.js.map

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var timer_1 = __webpack_require__(250);
	Observable_1.Observable.timer = timer_1.TimerObservable.create;
	//# sourceMappingURL=timer.js.map

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var buffer_1 = __webpack_require__(251);
	Observable_1.Observable.prototype.buffer = buffer_1.buffer;
	//# sourceMappingURL=buffer.js.map

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var bufferCount_1 = __webpack_require__(252);
	Observable_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
	//# sourceMappingURL=bufferCount.js.map

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var bufferTime_1 = __webpack_require__(253);
	Observable_1.Observable.prototype.bufferTime = bufferTime_1.bufferTime;
	//# sourceMappingURL=bufferTime.js.map

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var bufferToggle_1 = __webpack_require__(254);
	Observable_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
	//# sourceMappingURL=bufferToggle.js.map

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var bufferWhen_1 = __webpack_require__(255);
	Observable_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
	//# sourceMappingURL=bufferWhen.js.map

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var catch_1 = __webpack_require__(256);
	Observable_1.Observable.prototype.catch = catch_1._catch;
	//# sourceMappingURL=catch.js.map

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var combineAll_1 = __webpack_require__(257);
	Observable_1.Observable.prototype.combineAll = combineAll_1.combineAll;
	//# sourceMappingURL=combineAll.js.map

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var combineLatest_static_1 = __webpack_require__(258);
	Observable_1.Observable.combineLatest = combineLatest_static_1.combineLatest;
	//# sourceMappingURL=combineLatest-static.js.map

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var combineLatest_1 = __webpack_require__(259);
	Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var concat_static_1 = __webpack_require__(74);
	Observable_1.Observable.concat = concat_static_1.concat;
	//# sourceMappingURL=concat-static.js.map

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var concat_1 = __webpack_require__(260);
	Observable_1.Observable.prototype.concat = concat_1.concat;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var concatAll_1 = __webpack_require__(261);
	Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
	//# sourceMappingURL=concatAll.js.map

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var concatMap_1 = __webpack_require__(262);
	Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var concatMapTo_1 = __webpack_require__(263);
	Observable_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
	//# sourceMappingURL=concatMapTo.js.map

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var count_1 = __webpack_require__(264);
	Observable_1.Observable.prototype.count = count_1.count;
	//# sourceMappingURL=count.js.map

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var debounce_1 = __webpack_require__(265);
	Observable_1.Observable.prototype.debounce = debounce_1.debounce;
	//# sourceMappingURL=debounce.js.map

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var debounceTime_1 = __webpack_require__(266);
	Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
	//# sourceMappingURL=debounceTime.js.map

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var defaultIfEmpty_1 = __webpack_require__(267);
	Observable_1.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
	//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var delay_1 = __webpack_require__(268);
	Observable_1.Observable.prototype.delay = delay_1.delay;
	//# sourceMappingURL=delay.js.map

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var dematerialize_1 = __webpack_require__(269);
	Observable_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
	//# sourceMappingURL=dematerialize.js.map

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var distinctUntilChanged_1 = __webpack_require__(270);
	Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var do_1 = __webpack_require__(271);
	Observable_1.Observable.prototype.do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var every_1 = __webpack_require__(272);
	Observable_1.Observable.prototype.every = every_1.every;
	//# sourceMappingURL=every.js.map

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var expand_1 = __webpack_require__(274);
	Observable_1.Observable.prototype.expand = expand_1.expand;
	//# sourceMappingURL=expand.js.map

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var filter_1 = __webpack_require__(75);
	Observable_1.Observable.prototype.filter = filter_1.filter;
	//# sourceMappingURL=filter.js.map

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var finally_1 = __webpack_require__(275);
	Observable_1.Observable.prototype.finally = finally_1._finally;
	//# sourceMappingURL=finally.js.map

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var first_1 = __webpack_require__(276);
	Observable_1.Observable.prototype.first = first_1.first;
	//# sourceMappingURL=first.js.map

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var groupBy_1 = __webpack_require__(278);
	Observable_1.Observable.prototype.groupBy = groupBy_1.groupBy;
	//# sourceMappingURL=groupBy.js.map

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var ignoreElements_1 = __webpack_require__(279);
	Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
	//# sourceMappingURL=ignoreElements.js.map

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var last_1 = __webpack_require__(280);
	Observable_1.Observable.prototype.last = last_1.last;
	//# sourceMappingURL=last.js.map

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var let_1 = __webpack_require__(281);
	Observable_1.Observable.prototype.let = let_1.letProto;
	Observable_1.Observable.prototype.letBind = let_1.letProto;
	//# sourceMappingURL=let.js.map

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var map_1 = __webpack_require__(76);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var mapTo_1 = __webpack_require__(282);
	Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
	//# sourceMappingURL=mapTo.js.map

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var materialize_1 = __webpack_require__(283);
	Observable_1.Observable.prototype.materialize = materialize_1.materialize;
	//# sourceMappingURL=materialize.js.map

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var merge_static_1 = __webpack_require__(77);
	Observable_1.Observable.merge = merge_static_1.merge;
	//# sourceMappingURL=merge-static.js.map

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var merge_1 = __webpack_require__(284);
	Observable_1.Observable.prototype.merge = merge_1.merge;
	//# sourceMappingURL=merge.js.map

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var mergeAll_1 = __webpack_require__(285);
	Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var mergeMap_1 = __webpack_require__(286);
	Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
	Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
	//# sourceMappingURL=mergeMap.js.map

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var mergeMapTo_1 = __webpack_require__(287);
	Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
	//# sourceMappingURL=mergeMapTo.js.map

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var multicast_1 = __webpack_require__(26);
	Observable_1.Observable.prototype.multicast = multicast_1.multicast;
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var observeOn_1 = __webpack_require__(288);
	Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var partition_1 = __webpack_require__(289);
	Observable_1.Observable.prototype.partition = partition_1.partition;
	//# sourceMappingURL=partition.js.map

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var pluck_1 = __webpack_require__(290);
	Observable_1.Observable.prototype.pluck = pluck_1.pluck;
	//# sourceMappingURL=pluck.js.map

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var publish_1 = __webpack_require__(291);
	Observable_1.Observable.prototype.publish = publish_1.publish;
	//# sourceMappingURL=publish.js.map

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var publishBehavior_1 = __webpack_require__(292);
	Observable_1.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;
	//# sourceMappingURL=publishBehavior.js.map

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var publishLast_1 = __webpack_require__(293);
	Observable_1.Observable.prototype.publishLast = publishLast_1.publishLast;
	//# sourceMappingURL=publishLast.js.map

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var publishReplay_1 = __webpack_require__(294);
	Observable_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
	//# sourceMappingURL=publishReplay.js.map

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var race_static_1 = __webpack_require__(80);
	Observable_1.Observable.race = race_static_1.race;
	//# sourceMappingURL=race-static.js.map

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var race_1 = __webpack_require__(296);
	Observable_1.Observable.prototype.race = race_1.race;
	//# sourceMappingURL=race.js.map

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var reduce_1 = __webpack_require__(298);
	Observable_1.Observable.prototype.reduce = reduce_1.reduce;
	//# sourceMappingURL=reduce.js.map

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var repeat_1 = __webpack_require__(299);
	Observable_1.Observable.prototype.repeat = repeat_1.repeat;
	//# sourceMappingURL=repeat.js.map

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var retry_1 = __webpack_require__(300);
	Observable_1.Observable.prototype.retry = retry_1.retry;
	//# sourceMappingURL=retry.js.map

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var retryWhen_1 = __webpack_require__(301);
	Observable_1.Observable.prototype.retryWhen = retryWhen_1.retryWhen;
	//# sourceMappingURL=retryWhen.js.map

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var sample_1 = __webpack_require__(302);
	Observable_1.Observable.prototype.sample = sample_1.sample;
	//# sourceMappingURL=sample.js.map

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var sampleTime_1 = __webpack_require__(303);
	Observable_1.Observable.prototype.sampleTime = sampleTime_1.sampleTime;
	//# sourceMappingURL=sampleTime.js.map

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var scan_1 = __webpack_require__(304);
	Observable_1.Observable.prototype.scan = scan_1.scan;
	//# sourceMappingURL=scan.js.map

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var share_1 = __webpack_require__(305);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var single_1 = __webpack_require__(306);
	Observable_1.Observable.prototype.single = single_1.single;
	//# sourceMappingURL=single.js.map

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var skip_1 = __webpack_require__(307);
	Observable_1.Observable.prototype.skip = skip_1.skip;
	//# sourceMappingURL=skip.js.map

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var skipUntil_1 = __webpack_require__(308);
	Observable_1.Observable.prototype.skipUntil = skipUntil_1.skipUntil;
	//# sourceMappingURL=skipUntil.js.map

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var skipWhile_1 = __webpack_require__(309);
	Observable_1.Observable.prototype.skipWhile = skipWhile_1.skipWhile;
	//# sourceMappingURL=skipWhile.js.map

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var startWith_1 = __webpack_require__(310);
	Observable_1.Observable.prototype.startWith = startWith_1.startWith;
	//# sourceMappingURL=startWith.js.map

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var subscribeOn_1 = __webpack_require__(311);
	Observable_1.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;
	//# sourceMappingURL=subscribeOn.js.map

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var switch_1 = __webpack_require__(312);
	Observable_1.Observable.prototype.switch = switch_1._switch;
	//# sourceMappingURL=switch.js.map

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var switchMap_1 = __webpack_require__(313);
	Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var switchMapTo_1 = __webpack_require__(314);
	Observable_1.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;
	//# sourceMappingURL=switchMapTo.js.map

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var take_1 = __webpack_require__(315);
	Observable_1.Observable.prototype.take = take_1.take;
	//# sourceMappingURL=take.js.map

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var takeUntil_1 = __webpack_require__(316);
	Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
	//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var takeWhile_1 = __webpack_require__(317);
	Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
	//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var throttle_1 = __webpack_require__(318);
	Observable_1.Observable.prototype.throttle = throttle_1.throttle;
	//# sourceMappingURL=throttle.js.map

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var throttleTime_1 = __webpack_require__(319);
	Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
	//# sourceMappingURL=throttleTime.js.map

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var timeout_1 = __webpack_require__(320);
	Observable_1.Observable.prototype.timeout = timeout_1.timeout;
	//# sourceMappingURL=timeout.js.map

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var timeoutWith_1 = __webpack_require__(321);
	Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
	//# sourceMappingURL=timeoutWith.js.map

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var toArray_1 = __webpack_require__(322);
	Observable_1.Observable.prototype.toArray = toArray_1.toArray;
	//# sourceMappingURL=toArray.js.map

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var toPromise_1 = __webpack_require__(323);
	Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
	//# sourceMappingURL=toPromise.js.map

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var window_1 = __webpack_require__(324);
	Observable_1.Observable.prototype.window = window_1.window;
	//# sourceMappingURL=window.js.map

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var windowCount_1 = __webpack_require__(325);
	Observable_1.Observable.prototype.windowCount = windowCount_1.windowCount;
	//# sourceMappingURL=windowCount.js.map

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var windowTime_1 = __webpack_require__(326);
	Observable_1.Observable.prototype.windowTime = windowTime_1.windowTime;
	//# sourceMappingURL=windowTime.js.map

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var windowToggle_1 = __webpack_require__(327);
	Observable_1.Observable.prototype.windowToggle = windowToggle_1.windowToggle;
	//# sourceMappingURL=windowToggle.js.map

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var windowWhen_1 = __webpack_require__(328);
	Observable_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
	//# sourceMappingURL=windowWhen.js.map

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var withLatestFrom_1 = __webpack_require__(329);
	Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
	//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var zip_static_1 = __webpack_require__(81);
	Observable_1.Observable.zip = zip_static_1.zip;
	//# sourceMappingURL=zip-static.js.map

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var zip_1 = __webpack_require__(330);
	Observable_1.Observable.prototype.zip = zip_1.zipProto;
	//# sourceMappingURL=zip.js.map

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Everything in this file is generated by the 'tools/generate-operator-patches.ts' script.
	 * Any manual edits to this file will be lost next time the script is run.
	 **/
	var Observable_1 = __webpack_require__(1);
	var zipAll_1 = __webpack_require__(331);
	Observable_1.Observable.prototype.zipAll = zipAll_1.zipAll;
	//# sourceMappingURL=zipAll.js.map

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(15);
	var isObject_1 = __webpack_require__(90);
	var tryCatch_1 = __webpack_require__(4);
	var Observable_1 = __webpack_require__(1);
	var isFunction_1 = __webpack_require__(89);
	var SymbolShim_1 = __webpack_require__(27);
	var errorObject_1 = __webpack_require__(3);
	var IteratorObservable = function (_super) {
	    __extends(IteratorObservable, _super);
	    function IteratorObservable(iterator, project, thisArg, scheduler) {
	        _super.call(this);
	        if (iterator == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        if (isObject_1.isObject(project)) {
	            this.thisArg = project;
	            this.scheduler = thisArg;
	        } else if (isFunction_1.isFunction(project)) {
	            this.project = project;
	            this.thisArg = thisArg;
	            this.scheduler = scheduler;
	        } else if (project != null) {
	            throw new Error('When provided, `project` must be a function.');
	        }
	        this.iterator = getIterator(iterator);
	    }
	    IteratorObservable.create = function (iterator, project, thisArg, scheduler) {
	        return new IteratorObservable(iterator, project, thisArg, scheduler);
	    };
	    IteratorObservable.dispatch = function (state) {
	        var index = state.index,
	            hasError = state.hasError,
	            thisArg = state.thisArg,
	            project = state.project,
	            iterator = state.iterator,
	            subscriber = state.subscriber;
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
	    IteratorObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this,
	            iterator = _a.iterator,
	            project = _a.project,
	            thisArg = _a.thisArg,
	            scheduler = _a.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
	            });
	        } else {
	            do {
	                var result = iterator.next();
	                if (result.done) {
	                    subscriber.complete();
	                    break;
	                } else if (project) {
	                    result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
	                    if (result === errorObject_1.errorObject) {
	                        subscriber.error(errorObject_1.errorObject.e);
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
	}(Observable_1.Observable);
	exports.IteratorObservable = IteratorObservable;
	var StringIterator = function () {
	    function StringIterator(str, idx, len) {
	        if (idx === void 0) {
	            idx = 0;
	        }
	        if (len === void 0) {
	            len = str.length;
	        }
	        this.str = str;
	        this.idx = idx;
	        this.len = len;
	    }
	    StringIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function () {
	        return this;
	    };
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
	}();
	var ArrayIterator = function () {
	    function ArrayIterator(arr, idx, len) {
	        if (idx === void 0) {
	            idx = 0;
	        }
	        if (len === void 0) {
	            len = toLength(arr);
	        }
	        this.arr = arr;
	        this.idx = idx;
	        this.len = len;
	    }
	    ArrayIterator.prototype[SymbolShim_1.SymbolShim.iterator] = function () {
	        return this;
	    };
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
	}();
	function getIterator(obj) {
	    var i = obj[SymbolShim_1.SymbolShim.iterator];
	    if (!i && typeof obj === 'string') {
	        return new StringIterator(obj);
	    }
	    if (!i && obj.length !== undefined) {
	        return new ArrayIterator(obj);
	    }
	    if (!i) {
	        throw new TypeError('Object is not iterable');
	    }
	    return obj[SymbolShim_1.SymbolShim.iterator]();
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
	//# sourceMappingURL=IteratorObservable.js.map

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var asap_1 = __webpack_require__(11);
	var isNumeric_1 = __webpack_require__(51);
	var SubscribeOnObservable = function (_super) {
	    __extends(SubscribeOnObservable, _super);
	    function SubscribeOnObservable(source, delayTime, scheduler) {
	        if (delayTime === void 0) {
	            delayTime = 0;
	        }
	        if (scheduler === void 0) {
	            scheduler = asap_1.asap;
	        }
	        _super.call(this);
	        this.source = source;
	        this.delayTime = delayTime;
	        this.scheduler = scheduler;
	        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
	            this.delayTime = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            this.scheduler = asap_1.asap;
	        }
	    }
	    SubscribeOnObservable.create = function (source, delay, scheduler) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        if (scheduler === void 0) {
	            scheduler = asap_1.asap;
	        }
	        return new SubscribeOnObservable(source, delay, scheduler);
	    };
	    SubscribeOnObservable.dispatch = function (_a) {
	        var source = _a.source,
	            subscriber = _a.subscriber;
	        return source.subscribe(subscriber);
	    };
	    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
	        var delay = this.delayTime;
	        var source = this.source;
	        var scheduler = this.scheduler;
	        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
	            source: source, subscriber: subscriber
	        });
	    };
	    return SubscribeOnObservable;
	}(Observable_1.Observable);
	exports.SubscribeOnObservable = SubscribeOnObservable;
	//# sourceMappingURL=SubscribeOnObservable.js.map

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var AsyncSubject_1 = __webpack_require__(36);
	var BoundCallbackObservable = function (_super) {
	    __extends(BoundCallbackObservable, _super);
	    function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
	        _super.call(this);
	        this.callbackFunc = callbackFunc;
	        this.selector = selector;
	        this.args = args;
	        this.scheduler = scheduler;
	    }
	    BoundCallbackObservable.create = function (callbackFunc, selector, scheduler) {
	        if (selector === void 0) {
	            selector = undefined;
	        }
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            return new BoundCallbackObservable(callbackFunc, selector, args, scheduler);
	        };
	    };
	    BoundCallbackObservable.prototype._subscribe = function (subscriber) {
	        var callbackFunc = this.callbackFunc;
	        var args = this.args;
	        var scheduler = this.scheduler;
	        var subject = this.subject;
	        if (!scheduler) {
	            if (!subject) {
	                subject = this.subject = new AsyncSubject_1.AsyncSubject();
	                var handler = function handlerFn() {
	                    var innerArgs = [];
	                    for (var _i = 0; _i < arguments.length; _i++) {
	                        innerArgs[_i - 0] = arguments[_i];
	                    }
	                    var source = handlerFn.source;
	                    var selector = source.selector,
	                        subject = source.subject;
	                    if (selector) {
	                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
	                        if (result_1 === errorObject_1.errorObject) {
	                            subject.error(errorObject_1.errorObject.e);
	                        } else {
	                            subject.next(result_1);
	                            subject.complete();
	                        }
	                    } else {
	                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
	                        subject.complete();
	                    }
	                };
	                // use named function instance to avoid closure.
	                handler.source = this;
	                var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
	                if (result === errorObject_1.errorObject) {
	                    subject.error(errorObject_1.errorObject.e);
	                }
	            }
	            return subject.subscribe(subscriber);
	        } else {
	            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
	        }
	    };
	    return BoundCallbackObservable;
	}(Observable_1.Observable);
	exports.BoundCallbackObservable = BoundCallbackObservable;
	function dispatch(state) {
	    var self = this;
	    var source = state.source,
	        subscriber = state.subscriber;
	    var callbackFunc = source.callbackFunc,
	        args = source.args,
	        scheduler = source.scheduler;
	    var subject = source.subject;
	    if (!subject) {
	        subject = source.subject = new AsyncSubject_1.AsyncSubject();
	        var handler = function handlerFn() {
	            var innerArgs = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                innerArgs[_i - 0] = arguments[_i];
	            }
	            var source = handlerFn.source;
	            var selector = source.selector,
	                subject = source.subject;
	            if (selector) {
	                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
	                if (result_2 === errorObject_1.errorObject) {
	                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
	                } else {
	                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
	                }
	            } else {
	                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
	                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
	            }
	        };
	        // use named function to pass values in without closure
	        handler.source = source;
	        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
	        if (result === errorObject_1.errorObject) {
	            subject.error(errorObject_1.errorObject.e);
	        }
	    }
	    self.add(subject.subscribe(subscriber));
	}
	function dispatchNext(_a) {
	    var value = _a.value,
	        subject = _a.subject;
	    subject.next(value);
	    subject.complete();
	}
	function dispatchError(_a) {
	    var err = _a.err,
	        subject = _a.subject;
	    subject.error(err);
	}
	//# sourceMappingURL=bindCallback.js.map

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var AsyncSubject_1 = __webpack_require__(36);
	var BoundNodeCallbackObservable = function (_super) {
	    __extends(BoundNodeCallbackObservable, _super);
	    function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
	        _super.call(this);
	        this.callbackFunc = callbackFunc;
	        this.selector = selector;
	        this.args = args;
	        this.scheduler = scheduler;
	    }
	    BoundNodeCallbackObservable.create = function (callbackFunc, selector, scheduler) {
	        if (selector === void 0) {
	            selector = undefined;
	        }
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            return new BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler);
	        };
	    };
	    BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
	        var callbackFunc = this.callbackFunc;
	        var args = this.args;
	        var scheduler = this.scheduler;
	        var subject = this.subject;
	        if (!scheduler) {
	            if (!subject) {
	                subject = this.subject = new AsyncSubject_1.AsyncSubject();
	                var handler = function handlerFn() {
	                    var innerArgs = [];
	                    for (var _i = 0; _i < arguments.length; _i++) {
	                        innerArgs[_i - 0] = arguments[_i];
	                    }
	                    var source = handlerFn.source;
	                    var selector = source.selector,
	                        subject = source.subject;
	                    var err = innerArgs.shift();
	                    if (err) {
	                        subject.error(err);
	                    } else if (selector) {
	                        var result_1 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
	                        if (result_1 === errorObject_1.errorObject) {
	                            subject.error(errorObject_1.errorObject.e);
	                        } else {
	                            subject.next(result_1);
	                            subject.complete();
	                        }
	                    } else {
	                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
	                        subject.complete();
	                    }
	                };
	                // use named function instance to avoid closure.
	                handler.source = this;
	                var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
	                if (result === errorObject_1.errorObject) {
	                    subject.error(errorObject_1.errorObject.e);
	                }
	            }
	            return subject.subscribe(subscriber);
	        } else {
	            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
	        }
	    };
	    return BoundNodeCallbackObservable;
	}(Observable_1.Observable);
	exports.BoundNodeCallbackObservable = BoundNodeCallbackObservable;
	function dispatch(state) {
	    var self = this;
	    var source = state.source,
	        subscriber = state.subscriber;
	    var callbackFunc = source.callbackFunc,
	        args = source.args,
	        scheduler = source.scheduler;
	    var subject = source.subject;
	    if (!subject) {
	        subject = source.subject = new AsyncSubject_1.AsyncSubject();
	        var handler = function handlerFn() {
	            var innerArgs = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                innerArgs[_i - 0] = arguments[_i];
	            }
	            var source = handlerFn.source;
	            var selector = source.selector,
	                subject = source.subject;
	            var err = innerArgs.shift();
	            if (err) {
	                subject.error(err);
	            } else if (selector) {
	                var result_2 = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
	                if (result_2 === errorObject_1.errorObject) {
	                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject: subject }));
	                } else {
	                    self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
	                }
	            } else {
	                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
	                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
	            }
	        };
	        // use named function to pass values in without closure
	        handler.source = source;
	        var result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
	        if (result === errorObject_1.errorObject) {
	            subject.error(errorObject_1.errorObject.e);
	        }
	    }
	    self.add(subject.subscribe(subscriber));
	}
	function dispatchNext(_a) {
	    var value = _a.value,
	        subject = _a.subject;
	    subject.next(value);
	    subject.complete();
	}
	function dispatchError(_a) {
	    var err = _a.err,
	        subject = _a.subject;
	    subject.error(err);
	}
	//# sourceMappingURL=bindNodeCallback.js.map

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var DeferObservable = function (_super) {
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
	        } else {
	            result.subscribe(subscriber);
	        }
	    };
	    return DeferObservable;
	}(Observable_1.Observable);
	exports.DeferObservable = DeferObservable;
	//# sourceMappingURL=defer.js.map

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var Subscriber_1 = __webpack_require__(2);
	var fromPromise_1 = __webpack_require__(47);
	var empty_1 = __webpack_require__(25);
	var isPromise_1 = __webpack_require__(52);
	var isArray_1 = __webpack_require__(14);
	var ForkJoinObservable = function (_super) {
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
	}(Observable_1.Observable);
	exports.ForkJoinObservable = ForkJoinObservable;
	var AllSubscriber = function (_super) {
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
	            var value = context.selector ? context.selector.apply(this, values) : values;
	            destination.next(value);
	        }
	        destination.complete();
	    };
	    return AllSubscriber;
	}(Subscriber_1.Subscriber);
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
	//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1 = __webpack_require__(14);
	var isPromise_1 = __webpack_require__(52);
	var fromPromise_1 = __webpack_require__(47);
	var IteratorObservable_1 = __webpack_require__(238);
	var fromArray_1 = __webpack_require__(12);
	var SymbolShim_1 = __webpack_require__(27);
	var Observable_1 = __webpack_require__(1);
	var observeOn_support_1 = __webpack_require__(49);
	var FromObservable = function (_super) {
	    __extends(FromObservable, _super);
	    function FromObservable(ish, scheduler) {
	        _super.call(this, null);
	        this.ish = ish;
	        this.scheduler = scheduler;
	    }
	    FromObservable.create = function (ish, scheduler) {
	        if (scheduler === void 0) {
	            scheduler = null;
	        }
	        if (ish != null) {
	            if (typeof ish[SymbolShim_1.SymbolShim.observable] === 'function') {
	                if (ish instanceof Observable_1.Observable && !scheduler) {
	                    return ish;
	                }
	                return new FromObservable(ish, scheduler);
	            }
	            if (isArray_1.isArray(ish)) {
	                return new fromArray_1.ArrayObservable(ish, scheduler);
	            } else if (isPromise_1.isPromise(ish)) {
	                return new fromPromise_1.PromiseObservable(ish, scheduler);
	            } else if (typeof ish[SymbolShim_1.SymbolShim.iterator] === 'function' || typeof ish === 'string') {
	                return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
	            }
	        }
	        throw new TypeError((ish !== null && (typeof ish === 'undefined' ? 'undefined' : _typeof(ish)) || ish) + ' is not observable');
	    };
	    FromObservable.prototype._subscribe = function (subscriber) {
	        var ish = this.ish;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            return ish[SymbolShim_1.SymbolShim.observable]().subscribe(subscriber);
	        } else {
	            return ish[SymbolShim_1.SymbolShim.observable]().subscribe(new observeOn_support_1.ObserveOnSubscriber(subscriber, scheduler, 0));
	        }
	    };
	    return FromObservable;
	}(Observable_1.Observable);
	exports.FromObservable = FromObservable;
	//# sourceMappingURL=from.js.map

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var Subscription_1 = __webpack_require__(9);
	var FromEventObservable = function (_super) {
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
	        } else if (typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function') {
	            sourceObj.addEventListener(eventName, handler);
	            unsubscribe = function unsubscribe() {
	                return sourceObj.removeEventListener(eventName, handler);
	            };
	        } else if (typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function') {
	            sourceObj.on(eventName, handler);
	            unsubscribe = function unsubscribe() {
	                return sourceObj.off(eventName, handler);
	            };
	        } else if (typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function') {
	            sourceObj.addListener(eventName, handler);
	            unsubscribe = function unsubscribe() {
	                return sourceObj.removeListener(eventName, handler);
	            };
	        }
	        subscriber.add(new Subscription_1.Subscription(unsubscribe));
	    };
	    FromEventObservable.prototype._subscribe = function (subscriber) {
	        var sourceObj = this.sourceObj;
	        var eventName = this.eventName;
	        var selector = this.selector;
	        var handler = selector ? function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
	            if (result === errorObject_1.errorObject) {
	                subscriber.error(errorObject_1.errorObject.e);
	            } else {
	                subscriber.next(result);
	            }
	        } : function (e) {
	            return subscriber.next(e);
	        };
	        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
	    };
	    return FromEventObservable;
	}(Observable_1.Observable);
	exports.FromEventObservable = FromEventObservable;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var Subscription_1 = __webpack_require__(9);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var FromEventPatternObservable = function (_super) {
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
	            } else {
	                subscriber.next(result);
	            }
	        } : function (e) {
	            subscriber.next(e);
	        };
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
	}(Observable_1.Observable);
	exports.FromEventPatternObservable = FromEventPatternObservable;
	//# sourceMappingURL=fromEventPattern.js.map

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1 = __webpack_require__(51);
	var Observable_1 = __webpack_require__(1);
	var asap_1 = __webpack_require__(11);
	var IntervalObservable = function (_super) {
	    __extends(IntervalObservable, _super);
	    function IntervalObservable(period, scheduler) {
	        if (period === void 0) {
	            period = 0;
	        }
	        if (scheduler === void 0) {
	            scheduler = asap_1.asap;
	        }
	        _super.call(this);
	        this.period = period;
	        this.scheduler = scheduler;
	        if (!isNumeric_1.isNumeric(period) || period < 0) {
	            this.period = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            this.scheduler = asap_1.asap;
	        }
	    }
	    IntervalObservable.create = function (period, scheduler) {
	        if (period === void 0) {
	            period = 0;
	        }
	        if (scheduler === void 0) {
	            scheduler = asap_1.asap;
	        }
	        return new IntervalObservable(period, scheduler);
	    };
	    IntervalObservable.dispatch = function (state) {
	        var index = state.index,
	            subscriber = state.subscriber,
	            period = state.period;
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
	}(Observable_1.Observable);
	exports.IntervalObservable = IntervalObservable;
	//# sourceMappingURL=interval.js.map

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var noop_1 = __webpack_require__(40);
	var InfiniteObservable = function (_super) {
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
	}(Observable_1.Observable);
	exports.InfiniteObservable = InfiniteObservable;
	//# sourceMappingURL=never.js.map

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var RangeObservable = function (_super) {
	    __extends(RangeObservable, _super);
	    function RangeObservable(start, end, scheduler) {
	        _super.call(this);
	        this.start = start;
	        this.end = end;
	        this.scheduler = scheduler;
	    }
	    RangeObservable.create = function (start, end, scheduler) {
	        if (start === void 0) {
	            start = 0;
	        }
	        if (end === void 0) {
	            end = 0;
	        }
	        return new RangeObservable(start, end, scheduler);
	    };
	    RangeObservable.dispatch = function (state) {
	        var start = state.start,
	            index = state.index,
	            end = state.end,
	            subscriber = state.subscriber;
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
	            return scheduler.schedule(RangeObservable.dispatch, 0, {
	                index: index, end: end, start: start, subscriber: subscriber
	            });
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
	}(Observable_1.Observable);
	exports.RangeObservable = RangeObservable;
	//# sourceMappingURL=range.js.map

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1 = __webpack_require__(51);
	var Observable_1 = __webpack_require__(1);
	var asap_1 = __webpack_require__(11);
	var isScheduler_1 = __webpack_require__(19);
	var isDate_1 = __webpack_require__(39);
	var TimerObservable = function (_super) {
	    __extends(TimerObservable, _super);
	    function TimerObservable(dueTime, period, scheduler) {
	        if (dueTime === void 0) {
	            dueTime = 0;
	        }
	        _super.call(this);
	        this.period = -1;
	        this.dueTime = 0;
	        if (isNumeric_1.isNumeric(period)) {
	            this.period = Number(period) < 1 && 1 || Number(period);
	        } else if (isScheduler_1.isScheduler(period)) {
	            scheduler = period;
	        }
	        if (!isScheduler_1.isScheduler(scheduler)) {
	            scheduler = asap_1.asap;
	        }
	        this.scheduler = scheduler;
	        this.dueTime = isDate_1.isDate(dueTime) ? +dueTime - this.scheduler.now() : dueTime;
	    }
	    TimerObservable.create = function (dueTime, period, scheduler) {
	        if (dueTime === void 0) {
	            dueTime = 0;
	        }
	        return new TimerObservable(dueTime, period, scheduler);
	    };
	    TimerObservable.dispatch = function (state) {
	        var index = state.index,
	            period = state.period,
	            subscriber = state.subscriber;
	        var action = this;
	        subscriber.next(index);
	        if (subscriber.isUnsubscribed) {
	            return;
	        } else if (period === -1) {
	            return subscriber.complete();
	        }
	        state.index = index + 1;
	        action.schedule(state, period);
	    };
	    TimerObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this,
	            period = _a.period,
	            dueTime = _a.dueTime,
	            scheduler = _a.scheduler;
	        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
	            index: index, period: period, subscriber: subscriber
	        });
	    };
	    return TimerObservable;
	}(Observable_1.Observable);
	exports.TimerObservable = TimerObservable;
	//# sourceMappingURL=timer.js.map

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	/**
	 * Buffers the incoming observable values until the passed `closingNotifier`
	 * emits a value, at which point it emits the buffer on the returned observable
	 * and starts a new buffer internally, awaiting the next time `closingNotifier`
	 * emits.
	 *
	 * <img src="./img/buffer.png" width="100%">
	 *
	 * @param {Observable<any>} closingNotifier an Observable that signals the
	 * buffer to be emitted} from the returned observable.
	 * @returns {Observable<T[]>} an Observable of buffers, which are arrays of
	 * values.
	 */
	function buffer(closingNotifier) {
	    return this.lift(new BufferOperator(closingNotifier));
	}
	exports.buffer = buffer;
	var BufferOperator = function () {
	    function BufferOperator(closingNotifier) {
	        this.closingNotifier = closingNotifier;
	    }
	    BufferOperator.prototype.call = function (subscriber) {
	        return new BufferSubscriber(subscriber, this.closingNotifier);
	    };
	    return BufferOperator;
	}();
	var BufferSubscriber = function (_super) {
	    __extends(BufferSubscriber, _super);
	    function BufferSubscriber(destination, closingNotifier) {
	        _super.call(this, destination);
	        this.buffer = [];
	        this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
	    }
	    BufferSubscriber.prototype._next = function (value) {
	        this.buffer.push(value);
	    };
	    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var buffer = this.buffer;
	        this.buffer = [];
	        this.destination.next(buffer);
	    };
	    return BufferSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=buffer.js.map

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/**
	 * Buffers a number of values from the source observable by `bufferSize` then
	 * emits the buffer and clears it, and starts a new buffer each
	 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
	 * `null`, then new buffers are started immediately at the start of the source
	 * and when each buffer closes and is emitted.
	 *
	 * <img src="./img/bufferCount.png" width="100%">
	 *
	 * @param {number} bufferSize the maximum size of the buffer emitted.
	 * @param {number} [startBufferEvery] optional interval at which to start a new
	 * buffer. (e.g. if `startBufferEvery` is `2`, then a new buffer will be started
	 * on every other value from the source.) A new buffer is started at the
	 * beginning of the source by default.
	 * @returns {Observable<T[]>} an Observable of arrays of buffered values.
	 */
	function bufferCount(bufferSize, startBufferEvery) {
	    if (startBufferEvery === void 0) {
	        startBufferEvery = null;
	    }
	    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
	}
	exports.bufferCount = bufferCount;
	var BufferCountOperator = function () {
	    function BufferCountOperator(bufferSize, startBufferEvery) {
	        this.bufferSize = bufferSize;
	        this.startBufferEvery = startBufferEvery;
	    }
	    BufferCountOperator.prototype.call = function (subscriber) {
	        return new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery);
	    };
	    return BufferCountOperator;
	}();
	var BufferCountSubscriber = function (_super) {
	    __extends(BufferCountSubscriber, _super);
	    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
	        _super.call(this, destination);
	        this.bufferSize = bufferSize;
	        this.startBufferEvery = startBufferEvery;
	        this.buffers = [[]];
	        this.count = 0;
	    }
	    BufferCountSubscriber.prototype._next = function (value) {
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
	                destination.next(buffer);
	            }
	        }
	        if (remove !== -1) {
	            buffers.splice(remove, 1);
	        }
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
	        _super.prototype._complete.call(this);
	    };
	    return BufferCountSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=bufferCount.js.map

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var asap_1 = __webpack_require__(11);
	/**
	 * Buffers values from the source for a specific time period. Optionally allows
	 * new buffers to be set up at an interval.
	 *
	 * <img src="./img/bufferTime.png" width="100%">
	 *
	 * @param {number} bufferTimeSpan the amount of time to fill each buffer for
	 * before emitting them and clearing them.
	 * @param {number} [bufferCreationInterval] the interval at which to start new
	 * buffers.
	 * @param {Scheduler} [scheduler] (optional, defaults to `asap` scheduler) The
	 * scheduler on which to schedule the intervals that determine buffer
	 * boundaries.
	 * @returns {Observable<T[]>} an observable of arrays of buffered values.
	 */
	function bufferTime(bufferTimeSpan, bufferCreationInterval, scheduler) {
	    if (bufferCreationInterval === void 0) {
	        bufferCreationInterval = null;
	    }
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
	}
	exports.bufferTime = bufferTime;
	var BufferTimeOperator = function () {
	    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler) {
	        this.bufferTimeSpan = bufferTimeSpan;
	        this.bufferCreationInterval = bufferCreationInterval;
	        this.scheduler = scheduler;
	    }
	    BufferTimeOperator.prototype.call = function (subscriber) {
	        return new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler);
	    };
	    return BufferTimeOperator;
	}();
	var BufferTimeSubscriber = function (_super) {
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
	        } else {
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
	        _super.prototype._error.call(this, err);
	    };
	    BufferTimeSubscriber.prototype._complete = function () {
	        var _a = this,
	            buffers = _a.buffers,
	            destination = _a.destination;
	        while (buffers.length > 0) {
	            destination.next(buffers.shift());
	        }
	        _super.prototype._complete.call(this);
	    };
	    BufferTimeSubscriber.prototype._unsubscribe = function () {
	        this.buffers = null;
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
	}(Subscriber_1.Subscriber);
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
	    var bufferCreationInterval = state.bufferCreationInterval,
	        bufferTimeSpan = state.bufferTimeSpan,
	        subscriber = state.subscriber,
	        scheduler = state.scheduler;
	    var buffer = subscriber.openBuffer();
	    var action = this;
	    if (!subscriber.isUnsubscribed) {
	        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
	        action.schedule(state, bufferCreationInterval);
	    }
	}
	function dispatchBufferClose(_a) {
	    var subscriber = _a.subscriber,
	        buffer = _a.buffer;
	    subscriber.closeBuffer(buffer);
	}
	//# sourceMappingURL=bufferTime.js.map

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subscription_1 = __webpack_require__(9);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	/**
	 * Buffers values from the source by opening the buffer via signals from an
	 * Observable provided to `openings`, and closing and sending the buffers when
	 * an Observable returned by the `closingSelector` emits.
	 *
	 * <img src="./img/bufferToggle.png" width="100%">
	 *
	 * @param {Observable<O>} openings An observable of notifications to start new
	 * buffers.
	 * @param {Function} closingSelector a function that takes the value emitted by
	 * the `openings` observable and returns an Observable, which, when it emits,
	 * signals that the associated buffer should be emitted and cleared.
	 * @returns {Observable<T[]>} an observable of arrays of buffered values.
	 */
	function bufferToggle(openings, closingSelector) {
	    return this.lift(new BufferToggleOperator(openings, closingSelector));
	}
	exports.bufferToggle = bufferToggle;
	var BufferToggleOperator = function () {
	    function BufferToggleOperator(openings, closingSelector) {
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	    }
	    BufferToggleOperator.prototype.call = function (subscriber) {
	        return new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector);
	    };
	    return BufferToggleOperator;
	}();
	var BufferToggleSubscriber = function (_super) {
	    __extends(BufferToggleSubscriber, _super);
	    function BufferToggleSubscriber(destination, openings, closingSelector) {
	        _super.call(this, destination);
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	        this.contexts = [];
	        this.add(this.openings.subscribe(new BufferToggleOpeningsSubscriber(this)));
	    }
	    BufferToggleSubscriber.prototype._next = function (value) {
	        var contexts = this.contexts;
	        var len = contexts.length;
	        for (var i = 0; i < len; i++) {
	            contexts[i].buffer.push(value);
	        }
	    };
	    BufferToggleSubscriber.prototype._error = function (err) {
	        var contexts = this.contexts;
	        while (contexts.length > 0) {
	            var context = contexts.shift();
	            context.subscription.unsubscribe();
	            context.buffer = null;
	            context.subscription = null;
	        }
	        this.contexts = null;
	        _super.prototype._error.call(this, err);
	    };
	    BufferToggleSubscriber.prototype._complete = function () {
	        var contexts = this.contexts;
	        while (contexts.length > 0) {
	            var context = contexts.shift();
	            this.destination.next(context.buffer);
	            context.subscription.unsubscribe();
	            context.buffer = null;
	            context.subscription = null;
	        }
	        this.contexts = null;
	        _super.prototype._complete.call(this);
	    };
	    BufferToggleSubscriber.prototype.openBuffer = function (value) {
	        var closingSelector = this.closingSelector;
	        var contexts = this.contexts;
	        var closingNotifier = tryCatch_1.tryCatch(closingSelector)(value);
	        if (closingNotifier === errorObject_1.errorObject) {
	            this._error(errorObject_1.errorObject.e);
	        } else {
	            var context = {
	                buffer: [],
	                subscription: new Subscription_1.Subscription()
	            };
	            contexts.push(context);
	            var subscriber = new BufferToggleClosingsSubscriber(this, context);
	            var subscription = closingNotifier.subscribe(subscriber);
	            context.subscription.add(subscription);
	            this.add(subscription);
	        }
	    };
	    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
	        var contexts = this.contexts;
	        if (contexts === null) {
	            return;
	        }
	        var buffer = context.buffer,
	            subscription = context.subscription;
	        this.destination.next(buffer);
	        contexts.splice(contexts.indexOf(context), 1);
	        this.remove(subscription);
	        subscription.unsubscribe();
	    };
	    return BufferToggleSubscriber;
	}(Subscriber_1.Subscriber);
	var BufferToggleOpeningsSubscriber = function (_super) {
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
	}(Subscriber_1.Subscriber);
	var BufferToggleClosingsSubscriber = function (_super) {
	    __extends(BufferToggleClosingsSubscriber, _super);
	    function BufferToggleClosingsSubscriber(parent, context) {
	        _super.call(this, null);
	        this.parent = parent;
	        this.context = context;
	    }
	    BufferToggleClosingsSubscriber.prototype._next = function () {
	        this.parent.closeBuffer(this.context);
	    };
	    BufferToggleClosingsSubscriber.prototype._error = function (err) {
	        this.parent.error(err);
	    };
	    BufferToggleClosingsSubscriber.prototype._complete = function () {
	        this.parent.closeBuffer(this.context);
	    };
	    return BufferToggleClosingsSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=bufferToggle.js.map

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(9);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	/**
	 * Opens a buffer immediately, then closes the buffer when the observable
	 * returned by calling `closingSelector` emits a value. It that immediately
	 * opens a new buffer and repeats the process.
	 *
	 * <img src="./img/bufferWhen.png" width="100%">
	 *
	 * @param {function} closingSelector a function that takes no arguments and
	 * returns an Observable that signals buffer closure.
	 * @returns {Observable<T[]>} an observable of arrays of buffered values.
	 */
	function bufferWhen(closingSelector) {
	    return this.lift(new BufferWhenOperator(closingSelector));
	}
	exports.bufferWhen = bufferWhen;
	var BufferWhenOperator = function () {
	    function BufferWhenOperator(closingSelector) {
	        this.closingSelector = closingSelector;
	    }
	    BufferWhenOperator.prototype.call = function (subscriber) {
	        return new BufferWhenSubscriber(subscriber, this.closingSelector);
	    };
	    return BufferWhenOperator;
	}();
	var BufferWhenSubscriber = function (_super) {
	    __extends(BufferWhenSubscriber, _super);
	    function BufferWhenSubscriber(destination, closingSelector) {
	        _super.call(this, destination);
	        this.closingSelector = closingSelector;
	        this.subscribing = false;
	        this.openBuffer();
	    }
	    BufferWhenSubscriber.prototype._next = function (value) {
	        this.buffer.push(value);
	    };
	    BufferWhenSubscriber.prototype._complete = function () {
	        var buffer = this.buffer;
	        if (buffer) {
	            this.destination.next(buffer);
	        }
	        _super.prototype._complete.call(this);
	    };
	    BufferWhenSubscriber.prototype._unsubscribe = function () {
	        this.buffer = null;
	        this.subscribing = false;
	    };
	    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.openBuffer();
	    };
	    BufferWhenSubscriber.prototype.notifyComplete = function () {
	        if (this.subscribing) {
	            this.complete();
	        } else {
	            this.openBuffer();
	        }
	    };
	    BufferWhenSubscriber.prototype.openBuffer = function () {
	        var closingSubscription = this.closingSubscription;
	        if (closingSubscription) {
	            this.remove(closingSubscription);
	            closingSubscription.unsubscribe();
	        }
	        var buffer = this.buffer;
	        if (this.buffer) {
	            this.destination.next(buffer);
	        }
	        this.buffer = [];
	        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
	        if (closingNotifier === errorObject_1.errorObject) {
	            this.error(errorObject_1.errorObject.e);
	        } else {
	            closingSubscription = new Subscription_1.Subscription();
	            this.closingSubscription = closingSubscription;
	            this.add(closingSubscription);
	            this.subscribing = true;
	            closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
	            this.subscribing = false;
	        }
	    };
	    return BufferWhenSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=bufferWhen.js.map

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 */
	function _catch(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return operator.caught = caught;
	}
	exports._catch = _catch;
	var CatchOperator = function () {
	    function CatchOperator(selector) {
	        this.selector = selector;
	    }
	    CatchOperator.prototype.call = function (subscriber) {
	        return new CatchSubscriber(subscriber, this.selector, this.caught);
	    };
	    return CatchOperator;
	}();
	var CatchSubscriber = function (_super) {
	    __extends(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = tryCatch_1.tryCatch(this.selector)(err, this.caught);
	            if (result === errorObject_1.errorObject) {
	                _super.prototype.error.call(this, errorObject_1.errorObject.e);
	            } else {
	                var destination = this.destination;
	                this.unsubscribe();
	                destination.remove(this);
	                result.subscribe(this.destination);
	            }
	        }
	    };
	    return CatchSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=catch.js.map

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var combineLatest_support_1 = __webpack_require__(48);
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
	//# sourceMappingURL=combineAll.js.map

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fromArray_1 = __webpack_require__(12);
	var combineLatest_support_1 = __webpack_require__(48);
	var isScheduler_1 = __webpack_require__(19);
	var isArray_1 = __webpack_require__(14);
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
	//# sourceMappingURL=combineLatest-static.js.map

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fromArray_1 = __webpack_require__(12);
	var combineLatest_support_1 = __webpack_require__(48);
	var isArray_1 = __webpack_require__(14);
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
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isScheduler_1 = __webpack_require__(19);
	var fromArray_1 = __webpack_require__(12);
	var mergeAll_support_1 = __webpack_require__(31);
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
	//# sourceMappingURL=concat.js.map

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeAll_support_1 = __webpack_require__(31);
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
	//# sourceMappingURL=concatAll.js.map

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeMap_support_1 = __webpack_require__(78);
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
	 * @param {function} [resultSelector] an optional result selector that is applied to values before they're
	 * merged into the returned observable. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @returns {Observable} an observable of values merged from the projected Observables as they were subscribed to,
	 * one at a time. Optionally, these values may have been projected from a passed `projectResult` argument.
	 */
	function concatMap(project, resultSelector) {
	  return this.lift(new mergeMap_support_1.MergeMapOperator(project, resultSelector, 1));
	}
	exports.concatMap = concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeMapTo_support_1 = __webpack_require__(79);
	/**
	 * Maps values from the source to a specific observable, and merges them together in a serialized fashion.
	 *
	 * @param {Observable} observable the observable to map each source value to
	 * @param {function} [resultSelector] an optional result selector that is applied to values before they're
	 * merged into the returned observable. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @returns {Observable} an observable of values merged together by joining the passed observable
	 * with itself, one after the other, for each value emitted from the source.
	 */
	function concatMapTo(observable, resultSelector) {
	  return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, 1));
	}
	exports.concatMapTo = concatMapTo;
	//# sourceMappingURL=concatMapTo.js.map

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
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
	 * @returns {Observable} an observable of one number that represents the count as described
	 * above
	 */
	function count(predicate) {
	    return this.lift(new CountOperator(predicate, this));
	}
	exports.count = count;
	var CountOperator = function () {
	    function CountOperator(predicate, source) {
	        this.predicate = predicate;
	        this.source = source;
	    }
	    CountOperator.prototype.call = function (subscriber) {
	        return new CountSubscriber(subscriber, this.predicate, this.source);
	    };
	    return CountOperator;
	}();
	var CountSubscriber = function (_super) {
	    __extends(CountSubscriber, _super);
	    function CountSubscriber(destination, predicate, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.source = source;
	        this.count = 0;
	        this.index = 0;
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=count.js.map

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	/**
	 * Returns the source Observable delayed by the computed debounce duration,
	 * with the duration lengthened if a new source item arrives before the delay
	 * duration ends.
	 * In practice, for each item emitted on the source, this operator holds the
	 * latest item, waits for a silence as long as the `durationSelector` specifies,
	 * and only then emits the latest source item on the result Observable.
	 * @param {function} durationSelector function for computing the timeout duration for each item.
	 * @returns {Observable} an Observable the same as source Observable, but drops items.
	 */
	function debounce(durationSelector) {
	    return this.lift(new DebounceOperator(durationSelector));
	}
	exports.debounce = debounce;
	var DebounceOperator = function () {
	    function DebounceOperator(durationSelector) {
	        this.durationSelector = durationSelector;
	    }
	    DebounceOperator.prototype.call = function (subscriber) {
	        return new DebounceSubscriber(subscriber, this.durationSelector);
	    };
	    return DebounceOperator;
	}();
	var DebounceSubscriber = function (_super) {
	    __extends(DebounceSubscriber, _super);
	    function DebounceSubscriber(destination, durationSelector) {
	        _super.call(this, destination);
	        this.durationSelector = durationSelector;
	        this.hasValue = false;
	        this.durationSubscription = null;
	    }
	    DebounceSubscriber.prototype._next = function (value) {
	        var subscription = this.durationSubscription;
	        var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
	        if (duration === errorObject_1.errorObject) {
	            this.destination.error(errorObject_1.errorObject.e);
	        } else {
	            this.value = value;
	            this.hasValue = true;
	            if (subscription) {
	                subscription.unsubscribe();
	                this.remove(subscription);
	            }
	            subscription = subscribeToResult_1.subscribeToResult(this, duration);
	            if (!subscription.isUnsubscribed) {
	                this.add(this.durationSubscription = subscription);
	            }
	        }
	    };
	    DebounceSubscriber.prototype._complete = function () {
	        this.emitValue();
	        this.destination.complete();
	    };
	    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.emitValue();
	    };
	    DebounceSubscriber.prototype.notifyComplete = function () {
	        this.emitValue();
	    };
	    DebounceSubscriber.prototype.emitValue = function () {
	        if (this.hasValue) {
	            var value = this.value;
	            var subscription = this.durationSubscription;
	            if (subscription) {
	                this.durationSubscription = null;
	                subscription.unsubscribe();
	                this.remove(subscription);
	            }
	            this.value = null;
	            this.hasValue = false;
	            _super.prototype._next.call(this, value);
	        }
	    };
	    return DebounceSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=debounce.js.map

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var asap_1 = __webpack_require__(11);
	/**
	 * Returns the source Observable delayed by the computed debounce duration,
	 * with the duration lengthened if a new source item arrives before the delay
	 * duration ends.
	 * In practice, for each item emitted on the source, this operator holds the
	 * latest item, waits for a silence for the `dueTime` length, and only then
	 * emits the latest source item on the result Observable.
	 * Optionally takes a scheduler for manging timers.
	 * @param {number} dueTime the timeout value for the window of time required to not drop the item.
	 * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
	 * @returns {Observable} an Observable the same as source Observable, but drops items.
	 */
	function debounceTime(dueTime, scheduler) {
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
	}
	exports.debounceTime = debounceTime;
	var DebounceTimeOperator = function () {
	    function DebounceTimeOperator(dueTime, scheduler) {
	        this.dueTime = dueTime;
	        this.scheduler = scheduler;
	    }
	    DebounceTimeOperator.prototype.call = function (subscriber) {
	        return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
	    };
	    return DebounceTimeOperator;
	}();
	var DebounceTimeSubscriber = function (_super) {
	    __extends(DebounceTimeSubscriber, _super);
	    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
	        _super.call(this, destination);
	        this.dueTime = dueTime;
	        this.scheduler = scheduler;
	        this.debouncedSubscription = null;
	        this.lastValue = null;
	        this.hasValue = false;
	    }
	    DebounceTimeSubscriber.prototype._next = function (value) {
	        this.clearDebounce();
	        this.lastValue = value;
	        this.hasValue = true;
	        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
	    };
	    DebounceTimeSubscriber.prototype._complete = function () {
	        this.debouncedNext();
	        this.destination.complete();
	    };
	    DebounceTimeSubscriber.prototype.debouncedNext = function () {
	        this.clearDebounce();
	        if (this.hasValue) {
	            this.destination.next(this.lastValue);
	            this.lastValue = null;
	            this.hasValue = false;
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
	}(Subscriber_1.Subscriber);
	function dispatchNext(subscriber) {
	    subscriber.debouncedNext();
	}
	//# sourceMappingURL=debounceTime.js.map

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/**
	 * Returns an Observable that emits the elements of the source or a specified default value if empty.
	 * @param {any} defaultValue the default value used if source is empty; defaults to null.
	 * @returns {Observable} an Observable of the items emitted by the where empty values are replaced by the specified default value or null.
	 */
	function defaultIfEmpty(defaultValue) {
	    if (defaultValue === void 0) {
	        defaultValue = null;
	    }
	    return this.lift(new DefaultIfEmptyOperator(defaultValue));
	}
	exports.defaultIfEmpty = defaultIfEmpty;
	var DefaultIfEmptyOperator = function () {
	    function DefaultIfEmptyOperator(defaultValue) {
	        this.defaultValue = defaultValue;
	    }
	    DefaultIfEmptyOperator.prototype.call = function (subscriber) {
	        return new DefaultIfEmptySubscriber(subscriber, this.defaultValue);
	    };
	    return DefaultIfEmptyOperator;
	}();
	var DefaultIfEmptySubscriber = function (_super) {
	    __extends(DefaultIfEmptySubscriber, _super);
	    function DefaultIfEmptySubscriber(destination, defaultValue) {
	        _super.call(this, destination);
	        this.defaultValue = defaultValue;
	        this.isEmpty = true;
	    }
	    DefaultIfEmptySubscriber.prototype._next = function (value) {
	        this.isEmpty = false;
	        this.destination.next(value);
	    };
	    DefaultIfEmptySubscriber.prototype._complete = function () {
	        if (this.isEmpty) {
	            this.destination.next(this.defaultValue);
	        }
	        this.destination.complete();
	    };
	    return DefaultIfEmptySubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var asap_1 = __webpack_require__(11);
	var isDate_1 = __webpack_require__(39);
	var Subscriber_1 = __webpack_require__(2);
	var Notification_1 = __webpack_require__(35);
	/**
	 * Returns an Observable that delays the emission of items from the source Observable
	 * by a given timeout or until a given Date.
	 * @param {number|Date} delay the timeout value or date until which the emission of the source items is delayed.
	 * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
	 * @returns {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
	 */
	function delay(delay, scheduler) {
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    var absoluteDelay = isDate_1.isDate(delay);
	    var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
	    return this.lift(new DelayOperator(delayFor, scheduler));
	}
	exports.delay = delay;
	var DelayOperator = function () {
	    function DelayOperator(delay, scheduler) {
	        this.delay = delay;
	        this.scheduler = scheduler;
	    }
	    DelayOperator.prototype.call = function (subscriber) {
	        return new DelaySubscriber(subscriber, this.delay, this.scheduler);
	    };
	    return DelayOperator;
	}();
	var DelaySubscriber = function (_super) {
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
	        while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
	            queue.shift().notification.observe(destination);
	        }
	        if (queue.length > 0) {
	            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
	            this.schedule(state, delay_1);
	        } else {
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
	}(Subscriber_1.Subscriber);
	var DelayMessage = function () {
	    function DelayMessage(time, notification) {
	        this.time = time;
	        this.notification = notification;
	    }
	    return DelayMessage;
	}();
	//# sourceMappingURL=delay.js.map

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/**
	 * Returns an Observable that transforms Notification objects into the items or notifications they represent.
	 * @returns {Observable} an Observable that emits items and notifications embedded in Notification objects emitted by the source Observable.
	 */
	function dematerialize() {
	    return this.lift(new DeMaterializeOperator());
	}
	exports.dematerialize = dematerialize;
	var DeMaterializeOperator = function () {
	    function DeMaterializeOperator() {}
	    DeMaterializeOperator.prototype.call = function (subscriber) {
	        return new DeMaterializeSubscriber(subscriber);
	    };
	    return DeMaterializeOperator;
	}();
	var DeMaterializeSubscriber = function (_super) {
	    __extends(DeMaterializeSubscriber, _super);
	    function DeMaterializeSubscriber(destination) {
	        _super.call(this, destination);
	    }
	    DeMaterializeSubscriber.prototype._next = function (value) {
	        value.observe(this.destination);
	    };
	    return DeMaterializeSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=dematerialize.js.map

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	function distinctUntilChanged(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}
	exports.distinctUntilChanged = distinctUntilChanged;
	var DistinctUntilChangedOperator = function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        this.compare = compare;
	        this.keySelector = keySelector;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber) {
	        return new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector);
	    };
	    return DistinctUntilChangedOperator;
	}();
	var DistinctUntilChangedSubscriber = function (_super) {
	    __extends(DistinctUntilChangedSubscriber, _super);
	    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.hasKey = false;
	        if (typeof compare === 'function') {
	            this.compare = compare;
	        }
	    }
	    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	        return x === y;
	    };
	    DistinctUntilChangedSubscriber.prototype._next = function (value) {
	        var keySelector = this.keySelector;
	        var key = value;
	        if (keySelector) {
	            key = tryCatch_1.tryCatch(this.keySelector)(value);
	            if (key === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        var result = false;
	        if (this.hasKey) {
	            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
	            if (result === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        } else {
	            this.hasKey = true;
	        }
	        if (Boolean(result) === false) {
	            this.key = key;
	            this.destination.next(value);
	        }
	    };
	    return DistinctUntilChangedSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var noop_1 = __webpack_require__(40);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	/**
	 * Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called
	 * for every item emitted by the source.
	 * This operator is useful for debugging your observables for the correct values or performing other side effects.
	 * @param {Observer|function} [nextOrObserver] a normal observer callback or callback for onNext.
	 * @param {function} [error] callback for errors in the source.
	 * @param {function} [complete] callback for the completion of the source.
	 * @reurns {Observable} a mirrored Observable with the specified Observer or callback attached for each item.
	 */
	function _do(nextOrObserver, error, complete) {
	    var next;
	    if (nextOrObserver && (typeof nextOrObserver === 'undefined' ? 'undefined' : _typeof(nextOrObserver)) === 'object') {
	        next = nextOrObserver.next;
	        error = nextOrObserver.error;
	        complete = nextOrObserver.complete;
	    } else {
	        next = nextOrObserver;
	    }
	    return this.lift(new DoOperator(next || noop_1.noop, error || noop_1.noop, complete || noop_1.noop));
	}
	exports._do = _do;
	var DoOperator = function () {
	    function DoOperator(next, error, complete) {
	        this.next = next;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber) {
	        return new DoSubscriber(subscriber, this.next, this.error, this.complete);
	    };
	    return DoOperator;
	}();
	var DoSubscriber = function (_super) {
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
	        } else {
	            this.destination.next(x);
	        }
	    };
	    DoSubscriber.prototype._error = function (e) {
	        var result = tryCatch_1.tryCatch(this.__error)(e);
	        if (result === errorObject_1.errorObject) {
	            this.destination.error(errorObject_1.errorObject.e);
	        } else {
	            this.destination.error(e);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var result = tryCatch_1.tryCatch(this.__complete)();
	        if (result === errorObject_1.errorObject) {
	            this.destination.error(errorObject_1.errorObject.e);
	        } else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=do.js.map

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ScalarObservable_1 = __webpack_require__(46);
	var fromArray_1 = __webpack_require__(12);
	var throw_1 = __webpack_require__(73);
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	/**
	 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
	 * @param {function} predicate a function for determining if an item meets a specified condition.
	 * @param {any} [thisArg] optional object to use for `this` in the callback
	 * @returns {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
	 */
	function every(predicate, thisArg) {
	    var source = this;
	    if (source._isScalar) {
	        var result = tryCatch_1.tryCatch(predicate).call(thisArg || this, source.value, 0, source);
	        if (result === errorObject_1.errorObject) {
	            return new throw_1.ErrorObservable(errorObject_1.errorObject.e, source.scheduler);
	        } else {
	            return new ScalarObservable_1.ScalarObservable(result, source.scheduler);
	        }
	    }
	    if (source instanceof fromArray_1.ArrayObservable) {
	        var array = source.array;
	        var result = tryCatch_1.tryCatch(function (array, predicate, thisArg) {
	            return array.every(predicate, thisArg);
	        })(array, predicate, thisArg);
	        if (result === errorObject_1.errorObject) {
	            return new throw_1.ErrorObservable(errorObject_1.errorObject.e, source.scheduler);
	        } else {
	            return new ScalarObservable_1.ScalarObservable(result, source.scheduler);
	        }
	    }
	    return source.lift(new EveryOperator(predicate, thisArg, source));
	}
	exports.every = every;
	var EveryOperator = function () {
	    function EveryOperator(predicate, thisArg, source) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	    }
	    EveryOperator.prototype.call = function (observer) {
	        return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
	    };
	    return EveryOperator;
	}();
	var EverySubscriber = function (_super) {
	    __extends(EverySubscriber, _super);
	    function EverySubscriber(destination, predicate, thisArg, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	        this.index = 0;
	    }
	    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
	        this.destination.next(everyValueMatch);
	        this.destination.complete();
	    };
	    EverySubscriber.prototype._next = function (value) {
	        var result = tryCatch_1.tryCatch(this.predicate).call(this.thisArg || this, value, this.index++, this.source);
	        if (result === errorObject_1.errorObject) {
	            this.destination.error(result.e);
	        } else if (!result) {
	            this.notifyComplete(false);
	        }
	    };
	    EverySubscriber.prototype._complete = function () {
	        this.notifyComplete(true);
	    };
	    return EverySubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=every.js.map

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	var ExpandOperator = function () {
	    function ExpandOperator(project, concurrent, scheduler) {
	        this.project = project;
	        this.concurrent = concurrent;
	        this.scheduler = scheduler;
	    }
	    ExpandOperator.prototype.call = function (subscriber) {
	        return new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler);
	    };
	    return ExpandOperator;
	}();
	exports.ExpandOperator = ExpandOperator;
	var ExpandSubscriber = function (_super) {
	    __extends(ExpandSubscriber, _super);
	    function ExpandSubscriber(destination, project, concurrent, scheduler) {
	        _super.call(this, destination);
	        this.project = project;
	        this.concurrent = concurrent;
	        this.scheduler = scheduler;
	        this.index = 0;
	        this.active = 0;
	        this.hasCompleted = false;
	        if (concurrent < Number.POSITIVE_INFINITY) {
	            this.buffer = [];
	        }
	    }
	    ExpandSubscriber.dispatch = function (_a) {
	        var subscriber = _a.subscriber,
	            result = _a.result,
	            value = _a.value,
	            index = _a.index;
	        subscriber.subscribeToProjection(result, value, index);
	    };
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
	                destination.error(errorObject_1.errorObject.e);
	            } else if (!this.scheduler) {
	                this.subscribeToProjection(result, value, index);
	            } else {
	                var state = { subscriber: this, result: result, value: value, index: index };
	                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
	            }
	        } else {
	            this.buffer.push(value);
	        }
	    };
	    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
	        if (result._isScalar) {
	            this._next(result.value);
	        } else {
	            this.active++;
	            this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
	        }
	    };
	    ExpandSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.hasCompleted && this.active === 0) {
	            this.destination.complete();
	        }
	    };
	    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this._next(innerValue);
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
	    return ExpandSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	exports.ExpandSubscriber = ExpandSubscriber;
	//# sourceMappingURL=expand-support.js.map

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var expand_support_1 = __webpack_require__(273);
	/**
	 * Returns an Observable where for each item in the source Observable, the supplied function is applied to each item,
	 * resulting in a new value to then be applied again with the function.
	 * @param {function} project the function for projecting the next emitted item of the Observable.
	 * @param {number} [concurrent] the max number of observables that can be created concurrently. defaults to infinity.
	 * @param {Scheduler} [scheduler] The Scheduler to use for managing the expansions.
	 * @returns {Observable} an Observable containing the expansions of the source Observable.
	 */
	function expand(project, concurrent, scheduler) {
	  if (concurrent === void 0) {
	    concurrent = Number.POSITIVE_INFINITY;
	  }
	  if (scheduler === void 0) {
	    scheduler = undefined;
	  }
	  concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
	  return this.lift(new expand_support_1.ExpandOperator(project, concurrent, scheduler));
	}
	exports.expand = expand;
	//# sourceMappingURL=expand.js.map

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subscription_1 = __webpack_require__(9);
	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} finallySelector function to be called when source terminates.
	 * @returns {Observable} an Observable that mirrors the source, but will call the specified function on termination.
	 */
	function _finally(finallySelector) {
	    return this.lift(new FinallyOperator(finallySelector));
	}
	exports._finally = _finally;
	var FinallyOperator = function () {
	    function FinallyOperator(finallySelector) {
	        this.finallySelector = finallySelector;
	    }
	    FinallyOperator.prototype.call = function (subscriber) {
	        return new FinallySubscriber(subscriber, this.finallySelector);
	    };
	    return FinallyOperator;
	}();
	var FinallySubscriber = function (_super) {
	    __extends(FinallySubscriber, _super);
	    function FinallySubscriber(destination, finallySelector) {
	        _super.call(this, destination);
	        this.add(new Subscription_1.Subscription(finallySelector));
	    }
	    return FinallySubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=finally.js.map

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var EmptyError_1 = __webpack_require__(38);
	/**
	 * Returns an Observable that emits the first item of the source Observable that matches the specified condition.
	 * Throws an error if matching element is not found.
	 * @param {function} predicate function called with each item to test for condition matching.
	 * @returns {Observable} an Observable of the first item that matches the condition.
	 */
	function first(predicate, resultSelector, defaultValue) {
	    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
	}
	exports.first = first;
	var FirstOperator = function () {
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
	}();
	var FirstSubscriber = function (_super) {
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
	        var _a = this,
	            destination = _a.destination,
	            predicate = _a.predicate,
	            resultSelector = _a.resultSelector;
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
	            } else {
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
	        } else if (!this.hasCompleted) {
	            destination.error(new EmptyError_1.EmptyError());
	        }
	    };
	    return FirstSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=first.js.map

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(9);
	var Observable_1 = __webpack_require__(1);
	var RefCountSubscription = function (_super) {
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
	}(Subscription_1.Subscription);
	exports.RefCountSubscription = RefCountSubscription;
	var GroupedObservable = function (_super) {
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
	}(Observable_1.Observable);
	exports.GroupedObservable = GroupedObservable;
	var InnerRefCountSubscription = function (_super) {
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
	}(Subscription_1.Subscription);
	exports.InnerRefCountSubscription = InnerRefCountSubscription;
	//# sourceMappingURL=groupBy-support.js.map

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Observable_1 = __webpack_require__(1);
	var Subject_1 = __webpack_require__(10);
	var Map_1 = __webpack_require__(338);
	var FastMap_1 = __webpack_require__(336);
	var groupBy_support_1 = __webpack_require__(277);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	function groupBy(keySelector, elementSelector, durationSelector) {
	    return new GroupByObservable(this, keySelector, elementSelector, durationSelector);
	}
	exports.groupBy = groupBy;
	var GroupByObservable = function (_super) {
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
	}(Observable_1.Observable);
	exports.GroupByObservable = GroupByObservable;
	var GroupBySubscriber = function (_super) {
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
	            this.error(errorObject_1.errorObject.e);
	        } else {
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
	                        this.error(errorObject_1.errorObject.e);
	                    } else {
	                        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
	                    }
	                }
	                this.destination.next(groupedObservable);
	            }
	            if (elementSelector) {
	                var value = tryCatch_1.tryCatch(elementSelector)(x);
	                if (value === errorObject_1.errorObject) {
	                    this.error(errorObject_1.errorObject.e);
	                } else {
	                    group.next(value);
	                }
	            } else {
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
	                _this.removeGroup(key);
	            });
	        }
	        this.destination.complete();
	    };
	    GroupBySubscriber.prototype.removeGroup = function (key) {
	        this.groups.delete(key);
	    };
	    return GroupBySubscriber;
	}(Subscriber_1.Subscriber);
	var GroupDurationSubscriber = function (_super) {
	    __extends(GroupDurationSubscriber, _super);
	    function GroupDurationSubscriber(key, group, parent) {
	        _super.call(this);
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=groupBy.js.map

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var noop_1 = __webpack_require__(40);
	function ignoreElements() {
	    return this.lift(new IgnoreElementsOperator());
	}
	exports.ignoreElements = ignoreElements;
	;
	var IgnoreElementsOperator = function () {
	    function IgnoreElementsOperator() {}
	    IgnoreElementsOperator.prototype.call = function (subscriber) {
	        return new IgnoreElementsSubscriber(subscriber);
	    };
	    return IgnoreElementsOperator;
	}();
	var IgnoreElementsSubscriber = function (_super) {
	    __extends(IgnoreElementsSubscriber, _super);
	    function IgnoreElementsSubscriber() {
	        _super.apply(this, arguments);
	    }
	    IgnoreElementsSubscriber.prototype._next = function (unused) {
	        noop_1.noop();
	    };
	    return IgnoreElementsSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=ignoreElements.js.map

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var EmptyError_1 = __webpack_require__(38);
	function last(predicate, resultSelector, defaultValue) {
	    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
	}
	exports.last = last;
	var LastOperator = function () {
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
	}();
	var LastSubscriber = function (_super) {
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
	        var _a = this,
	            predicate = _a.predicate,
	            resultSelector = _a.resultSelector,
	            destination = _a.destination;
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
	                } else {
	                    this.lastValue = value;
	                }
	                this.hasValue = true;
	            }
	        } else {
	            this.lastValue = value;
	            this.hasValue = true;
	        }
	    };
	    LastSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (this.hasValue) {
	            destination.next(this.lastValue);
	            destination.complete();
	        } else {
	            destination.error(new EmptyError_1.EmptyError());
	        }
	    };
	    return LastSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=last.js.map

/***/ },
/* 281 */
/***/ function(module, exports) {

	"use strict";

	function letProto(func) {
	    return func(this);
	}
	exports.letProto = letProto;
	//# sourceMappingURL=let.js.map

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/**
	 * Maps every value to the same value every time.
	 * @param {any} value the value to map each incoming value to
	 * @returns {Observable} an observable of the passed value that emits everytime the source does
	 */
	function mapTo(value) {
	    return this.lift(new MapToOperator(value));
	}
	exports.mapTo = mapTo;
	var MapToOperator = function () {
	    function MapToOperator(value) {
	        this.value = value;
	    }
	    MapToOperator.prototype.call = function (subscriber) {
	        return new MapToSubscriber(subscriber, this.value);
	    };
	    return MapToOperator;
	}();
	var MapToSubscriber = function (_super) {
	    __extends(MapToSubscriber, _super);
	    function MapToSubscriber(destination, value) {
	        _super.call(this, destination);
	        this.value = value;
	    }
	    MapToSubscriber.prototype._next = function (x) {
	        this.destination.next(this.value);
	    };
	    return MapToSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=mapTo.js.map

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Notification_1 = __webpack_require__(35);
	function materialize() {
	    return this.lift(new MaterializeOperator());
	}
	exports.materialize = materialize;
	var MaterializeOperator = function () {
	    function MaterializeOperator() {}
	    MaterializeOperator.prototype.call = function (subscriber) {
	        return new MaterializeSubscriber(subscriber);
	    };
	    return MaterializeOperator;
	}();
	var MaterializeSubscriber = function (_super) {
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=materialize.js.map

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge_static_1 = __webpack_require__(77);
	function merge() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    observables.unshift(this);
	    return merge_static_1.merge.apply(this, observables);
	}
	exports.merge = merge;
	//# sourceMappingURL=merge.js.map

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeAll_support_1 = __webpack_require__(31);
	function mergeAll(concurrent) {
	    if (concurrent === void 0) {
	        concurrent = Number.POSITIVE_INFINITY;
	    }
	    return this.lift(new mergeAll_support_1.MergeAllOperator(concurrent));
	}
	exports.mergeAll = mergeAll;
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeMap_support_1 = __webpack_require__(78);
	function mergeMap(project, resultSelector, concurrent) {
	    if (concurrent === void 0) {
	        concurrent = Number.POSITIVE_INFINITY;
	    }
	    return this.lift(new mergeMap_support_1.MergeMapOperator(project, resultSelector, concurrent));
	}
	exports.mergeMap = mergeMap;
	//# sourceMappingURL=mergeMap.js.map

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mergeMapTo_support_1 = __webpack_require__(79);
	function mergeMapTo(observable, resultSelector, concurrent) {
	    if (concurrent === void 0) {
	        concurrent = Number.POSITIVE_INFINITY;
	    }
	    return this.lift(new mergeMapTo_support_1.MergeMapToOperator(observable, resultSelector, concurrent));
	}
	exports.mergeMapTo = mergeMapTo;
	//# sourceMappingURL=mergeMapTo.js.map

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var observeOn_support_1 = __webpack_require__(49);
	function observeOn(scheduler, delay) {
	    if (delay === void 0) {
	        delay = 0;
	    }
	    return this.lift(new observeOn_support_1.ObserveOnOperator(scheduler, delay));
	}
	exports.observeOn = observeOn;
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var not_1 = __webpack_require__(340);
	var filter_1 = __webpack_require__(75);
	function partition(predicate, thisArg) {
	    return [filter_1.filter.call(this, predicate), filter_1.filter.call(this, not_1.not(predicate, thisArg))];
	}
	exports.partition = partition;
	//# sourceMappingURL=partition.js.map

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var map_1 = __webpack_require__(76);
	/**
	 * Retrieves the value of a specified nested property from all elements in
	 * the Observable sequence. If a property can't be resolved, it will return
	 * `undefined` for that value.
	 *
	 * @param {...args} properties the nested properties to pluck
	 * @returns {Observable} Returns a new Observable sequence of property values
	 */
	function pluck() {
	    var properties = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        properties[_i - 0] = arguments[_i];
	    }
	    var length = properties.length;
	    if (length === 0) {
	        throw new Error('List of properties cannot be empty.');
	    }
	    return map_1.map.call(this, plucker(properties, length));
	}
	exports.pluck = pluck;
	function plucker(props, length) {
	    var mapper = function mapper(x) {
	        var currentProp = x;
	        for (var i = 0; i < length; i++) {
	            var p = currentProp[props[i]];
	            if (typeof p !== 'undefined') {
	                currentProp = p;
	            } else {
	                return undefined;
	            }
	        }
	        return currentProp;
	    };
	    return mapper;
	}
	//# sourceMappingURL=pluck.js.map

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Subject_1 = __webpack_require__(10);
	var multicast_1 = __webpack_require__(26);
	function publish() {
	    return multicast_1.multicast.call(this, new Subject_1.Subject());
	}
	exports.publish = publish;
	//# sourceMappingURL=publish.js.map

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BehaviorSubject_1 = __webpack_require__(85);
	var multicast_1 = __webpack_require__(26);
	function publishBehavior(value) {
	    return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
	}
	exports.publishBehavior = publishBehavior;
	//# sourceMappingURL=publishBehavior.js.map

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AsyncSubject_1 = __webpack_require__(36);
	var multicast_1 = __webpack_require__(26);
	function publishLast() {
	    return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
	}
	exports.publishLast = publishLast;
	//# sourceMappingURL=publishLast.js.map

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReplaySubject_1 = __webpack_require__(86);
	var multicast_1 = __webpack_require__(26);
	function publishReplay(bufferSize, windowTime, scheduler) {
	    if (bufferSize === void 0) {
	        bufferSize = Number.POSITIVE_INFINITY;
	    }
	    if (windowTime === void 0) {
	        windowTime = Number.POSITIVE_INFINITY;
	    }
	    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
	}
	exports.publishReplay = publishReplay;
	//# sourceMappingURL=publishReplay.js.map

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	var RaceOperator = function () {
	    function RaceOperator() {}
	    RaceOperator.prototype.call = function (subscriber) {
	        return new RaceSubscriber(subscriber);
	    };
	    return RaceOperator;
	}();
	exports.RaceOperator = RaceOperator;
	var RaceSubscriber = function (_super) {
	    __extends(RaceSubscriber, _super);
	    function RaceSubscriber(destination) {
	        _super.call(this, destination);
	        this.hasFirst = false;
	        this.observables = [];
	        this.subscriptions = [];
	    }
	    RaceSubscriber.prototype._next = function (observable) {
	        this.observables.push(observable);
	    };
	    RaceSubscriber.prototype._complete = function () {
	        var observables = this.observables;
	        var len = observables.length;
	        if (len === 0) {
	            this.destination.complete();
	        } else {
	            for (var i = 0; i < len; i++) {
	                var observable = observables[i];
	                var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
	                this.subscriptions.push(subscription);
	                this.add(subscription);
	            }
	            this.observables = null;
	        }
	    };
	    RaceSubscriber.prototype.notifyNext = function (observable, value, outerIndex) {
	        if (!this.hasFirst) {
	            this.hasFirst = true;
	            for (var i = 0; i < this.subscriptions.length; i++) {
	                if (i !== outerIndex) {
	                    var subscription = this.subscriptions[i];
	                    subscription.unsubscribe();
	                    this.remove(subscription);
	                }
	            }
	            this.subscriptions = null;
	        }
	        this.destination.next(value);
	    };
	    return RaceSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	exports.RaceSubscriber = RaceSubscriber;
	//# sourceMappingURL=race-support.js.map

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var race_static_1 = __webpack_require__(80);
	var isArray_1 = __webpack_require__(14);
	/**
	 * Returns an Observable that mirrors the first source Observable to emit an item
	 * from the combination of this Observable and supplied Observables
	 * @param {...Observables} ...observables sources used to race for which Observable emits first.
	 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
	 */
	function race() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    // if the only argument is an array, it was most likely called with
	    // `pair([obs1, obs2, ...])`
	    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    observables.unshift(this);
	    return race_static_1.race.apply(this, observables);
	}
	exports.race = race;
	//# sourceMappingURL=race.js.map

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var ReduceOperator = function () {
	    function ReduceOperator(project, seed) {
	        this.project = project;
	        this.seed = seed;
	    }
	    ReduceOperator.prototype.call = function (subscriber) {
	        return new ReduceSubscriber(subscriber, this.project, this.seed);
	    };
	    return ReduceOperator;
	}();
	exports.ReduceOperator = ReduceOperator;
	var ReduceSubscriber = function (_super) {
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
	            } else {
	                this.acc = result;
	            }
	        } else {
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
	}(Subscriber_1.Subscriber);
	exports.ReduceSubscriber = ReduceSubscriber;
	//# sourceMappingURL=reduce-support.js.map

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reduce_support_1 = __webpack_require__(297);
	function reduce(project, seed) {
	    return this.lift(new reduce_support_1.ReduceOperator(project, seed));
	}
	exports.reduce = reduce;
	//# sourceMappingURL=reduce.js.map

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var empty_1 = __webpack_require__(25);
	function repeat(count) {
	    if (count === void 0) {
	        count = -1;
	    }
	    if (count === 0) {
	        return new empty_1.EmptyObservable();
	    } else if (count < 0) {
	        return this.lift(new RepeatOperator(-1, this));
	    } else {
	        return this.lift(new RepeatOperator(count - 1, this));
	    }
	}
	exports.repeat = repeat;
	var RepeatOperator = function () {
	    function RepeatOperator(count, source) {
	        this.count = count;
	        this.source = source;
	    }
	    RepeatOperator.prototype.call = function (subscriber) {
	        return new RepeatSubscriber(subscriber, this.count, this.source);
	    };
	    return RepeatOperator;
	}();
	var RepeatSubscriber = function (_super) {
	    __extends(RepeatSubscriber, _super);
	    function RepeatSubscriber(destination, count, source) {
	        _super.call(this, destination);
	        this.count = count;
	        this.source = source;
	    }
	    RepeatSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _a = this,
	                source = _a.source,
	                count = _a.count;
	            if (count === 0) {
	                return _super.prototype.complete.call(this);
	            } else if (count > -1) {
	                this.count = count - 1;
	            }
	            this.unsubscribe();
	            this.isStopped = false;
	            this.isUnsubscribed = false;
	            source.subscribe(this);
	        }
	    };
	    return RepeatSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=repeat.js.map

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	function retry(count) {
	    if (count === void 0) {
	        count = -1;
	    }
	    return this.lift(new RetryOperator(count, this));
	}
	exports.retry = retry;
	var RetryOperator = function () {
	    function RetryOperator(count, source) {
	        this.count = count;
	        this.source = source;
	    }
	    RetryOperator.prototype.call = function (subscriber) {
	        return new RetrySubscriber(subscriber, this.count, this.source);
	    };
	    return RetryOperator;
	}();
	var RetrySubscriber = function (_super) {
	    __extends(RetrySubscriber, _super);
	    function RetrySubscriber(destination, count, source) {
	        _super.call(this, destination);
	        this.count = count;
	        this.source = source;
	    }
	    RetrySubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _a = this,
	                source = _a.source,
	                count = _a.count;
	            if (count === 0) {
	                return _super.prototype.error.call(this, err);
	            } else if (count > -1) {
	                this.count = count - 1;
	            }
	            this.unsubscribe();
	            this.isStopped = false;
	            this.isUnsubscribed = false;
	            source.subscribe(this);
	        }
	    };
	    return RetrySubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=retry.js.map

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(10);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function retryWhen(notifier) {
	    return this.lift(new RetryWhenOperator(notifier, this));
	}
	exports.retryWhen = retryWhen;
	var RetryWhenOperator = function () {
	    function RetryWhenOperator(notifier, source) {
	        this.notifier = notifier;
	        this.source = source;
	    }
	    RetryWhenOperator.prototype.call = function (subscriber) {
	        return new RetryWhenSubscriber(subscriber, this.notifier, this.source);
	    };
	    return RetryWhenOperator;
	}();
	var RetryWhenSubscriber = function (_super) {
	    __extends(RetryWhenSubscriber, _super);
	    function RetryWhenSubscriber(destination, notifier, source) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.source = source;
	    }
	    RetryWhenSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var errors = this.errors;
	            var retries = this.retries;
	            var retriesSubscription = this.retriesSubscription;
	            if (!retries) {
	                errors = new Subject_1.Subject();
	                retries = tryCatch_1.tryCatch(this.notifier)(errors);
	                if (retries === errorObject_1.errorObject) {
	                    return _super.prototype.error.call(this, errorObject_1.errorObject.e);
	                }
	                retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
	            } else {
	                this.errors = null;
	                this.retriesSubscription = null;
	            }
	            this.unsubscribe();
	            this.isUnsubscribed = false;
	            this.errors = errors;
	            this.retries = retries;
	            this.retriesSubscription = retriesSubscription;
	            errors.next(err);
	        }
	    };
	    RetryWhenSubscriber.prototype._unsubscribe = function () {
	        var _a = this,
	            errors = _a.errors,
	            retriesSubscription = _a.retriesSubscription;
	        if (errors) {
	            errors.unsubscribe();
	            this.errors = null;
	        }
	        if (retriesSubscription) {
	            retriesSubscription.unsubscribe();
	            this.retriesSubscription = null;
	        }
	        this.retries = null;
	    };
	    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var _a = this,
	            errors = _a.errors,
	            retries = _a.retries,
	            retriesSubscription = _a.retriesSubscription;
	        this.errors = null;
	        this.retries = null;
	        this.retriesSubscription = null;
	        this.unsubscribe();
	        this.isStopped = false;
	        this.isUnsubscribed = false;
	        this.errors = errors;
	        this.retries = retries;
	        this.retriesSubscription = retriesSubscription;
	        this.source.subscribe(this);
	    };
	    return RetryWhenSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=retryWhen.js.map

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function sample(notifier) {
	    return this.lift(new SampleOperator(notifier));
	}
	exports.sample = sample;
	var SampleOperator = function () {
	    function SampleOperator(notifier) {
	        this.notifier = notifier;
	    }
	    SampleOperator.prototype.call = function (subscriber) {
	        return new SampleSubscriber(subscriber, this.notifier);
	    };
	    return SampleOperator;
	}();
	var SampleSubscriber = function (_super) {
	    __extends(SampleSubscriber, _super);
	    function SampleSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.hasValue = false;
	        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
	    }
	    SampleSubscriber.prototype._next = function (value) {
	        this.value = value;
	        this.hasValue = true;
	    };
	    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.emitValue();
	    };
	    SampleSubscriber.prototype.notifyComplete = function () {
	        this.emitValue();
	    };
	    SampleSubscriber.prototype.emitValue = function () {
	        if (this.hasValue) {
	            this.hasValue = false;
	            this.destination.next(this.value);
	        }
	    };
	    return SampleSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=sample.js.map

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var asap_1 = __webpack_require__(11);
	function sampleTime(delay, scheduler) {
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    return this.lift(new SampleTimeOperator(delay, scheduler));
	}
	exports.sampleTime = sampleTime;
	var SampleTimeOperator = function () {
	    function SampleTimeOperator(delay, scheduler) {
	        this.delay = delay;
	        this.scheduler = scheduler;
	    }
	    SampleTimeOperator.prototype.call = function (subscriber) {
	        return new SampleTimeSubscriber(subscriber, this.delay, this.scheduler);
	    };
	    return SampleTimeOperator;
	}();
	var SampleTimeSubscriber = function (_super) {
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
	            this.hasValue = false;
	            this.destination.next(this.lastValue);
	        }
	    };
	    return SampleTimeSubscriber;
	}(Subscriber_1.Subscriber);
	function dispatchNotification(state) {
	    var subscriber = state.subscriber,
	        delay = state.delay;
	    subscriber.notifyNext();
	    this.schedule(state, delay);
	}
	//# sourceMappingURL=sampleTime.js.map

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	/**
	 * Returns an Observable that applies a specified accumulator function to each item emitted by the source Observable.
	 * If a seed value is specified, then that value will be used as the initial value for the accumulator.
	 * If no seed value is specified, the first item of the source is used as the seed.
	 * @param {function} accumulator The accumulator function called on each item.
	 * @param {any} [seed] The initial accumulator value.
	 * @returns {Obervable} An observable of the accumulated values.
	 */
	function scan(accumulator, seed) {
	    return this.lift(new ScanOperator(accumulator, seed));
	}
	exports.scan = scan;
	var ScanOperator = function () {
	    function ScanOperator(accumulator, seed) {
	        this.accumulator = accumulator;
	        this.seed = seed;
	    }
	    ScanOperator.prototype.call = function (subscriber) {
	        return new ScanSubscriber(subscriber, this.accumulator, this.seed);
	    };
	    return ScanOperator;
	}();
	var ScanSubscriber = function (_super) {
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
	        get: function get() {
	            return this._seed;
	        },
	        set: function set(value) {
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
	        } else {
	            var result = tryCatch_1.tryCatch(this.accumulator).call(this, this.seed, value);
	            if (result === errorObject_1.errorObject) {
	                this.destination.error(errorObject_1.errorObject.e);
	            } else {
	                this.seed = result;
	                this.destination.next(this.seed);
	            }
	        }
	    };
	    return ScanSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=scan.js.map

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var multicast_1 = __webpack_require__(26);
	var Subject_1 = __webpack_require__(10);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var EmptyError_1 = __webpack_require__(38);
	function single(predicate) {
	    return this.lift(new SingleOperator(predicate, this));
	}
	exports.single = single;
	var SingleOperator = function () {
	    function SingleOperator(predicate, source) {
	        this.predicate = predicate;
	        this.source = source;
	    }
	    SingleOperator.prototype.call = function (subscriber) {
	        return new SingleSubscriber(subscriber, this.predicate, this.source);
	    };
	    return SingleOperator;
	}();
	var SingleSubscriber = function (_super) {
	    __extends(SingleSubscriber, _super);
	    function SingleSubscriber(destination, predicate, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.source = source;
	        this.seenValue = false;
	        this.index = 0;
	    }
	    SingleSubscriber.prototype.applySingleValue = function (value) {
	        if (this.seenValue) {
	            this.destination.error('Sequence contains more than one element');
	        } else {
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
	                this.destination.error(errorObject_1.errorObject.e);
	            } else if (result) {
	                this.applySingleValue(value);
	            }
	        } else {
	            this.applySingleValue(value);
	        }
	    };
	    SingleSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (this.index > 0) {
	            destination.next(this.seenValue ? this.singleValue : undefined);
	            destination.complete();
	        } else {
	            destination.error(new EmptyError_1.EmptyError());
	        }
	    };
	    return SingleSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=single.js.map

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	function skip(total) {
	    return this.lift(new SkipOperator(total));
	}
	exports.skip = skip;
	var SkipOperator = function () {
	    function SkipOperator(total) {
	        this.total = total;
	    }
	    SkipOperator.prototype.call = function (subscriber) {
	        return new SkipSubscriber(subscriber, this.total);
	    };
	    return SkipOperator;
	}();
	var SkipSubscriber = function (_super) {
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=skip.js.map

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function skipUntil(notifier) {
	    return this.lift(new SkipUntilOperator(notifier));
	}
	exports.skipUntil = skipUntil;
	var SkipUntilOperator = function () {
	    function SkipUntilOperator(notifier) {
	        this.notifier = notifier;
	    }
	    SkipUntilOperator.prototype.call = function (subscriber) {
	        return new SkipUntilSubscriber(subscriber, this.notifier);
	    };
	    return SkipUntilOperator;
	}();
	var SkipUntilSubscriber = function (_super) {
	    __extends(SkipUntilSubscriber, _super);
	    function SkipUntilSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.hasValue = false;
	        this.isInnerStopped = false;
	        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
	    }
	    SkipUntilSubscriber.prototype._next = function (value) {
	        if (this.hasValue) {
	            _super.prototype._next.call(this, value);
	        }
	    };
	    SkipUntilSubscriber.prototype._complete = function () {
	        if (this.isInnerStopped) {
	            _super.prototype._complete.call(this);
	        } else {
	            this.unsubscribe();
	        }
	    };
	    SkipUntilSubscriber.prototype.notifyNext = function () {
	        this.hasValue = true;
	    };
	    SkipUntilSubscriber.prototype.notifyComplete = function () {
	        this.isInnerStopped = true;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    return SkipUntilSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=skipUntil.js.map

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	function skipWhile(predicate) {
	    return this.lift(new SkipWhileOperator(predicate));
	}
	exports.skipWhile = skipWhile;
	var SkipWhileOperator = function () {
	    function SkipWhileOperator(predicate) {
	        this.predicate = predicate;
	    }
	    SkipWhileOperator.prototype.call = function (subscriber) {
	        return new SkipWhileSubscriber(subscriber, this.predicate);
	    };
	    return SkipWhileOperator;
	}();
	var SkipWhileSubscriber = function (_super) {
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
	                destination.error(errorObject_1.errorObject.e);
	            } else {
	                this.skipping = Boolean(result);
	            }
	        }
	        if (this.skipping === false) {
	            destination.next(value);
	        }
	    };
	    return SkipWhileSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=skipWhile.js.map

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fromArray_1 = __webpack_require__(12);
	var ScalarObservable_1 = __webpack_require__(46);
	var empty_1 = __webpack_require__(25);
	var concat_static_1 = __webpack_require__(74);
	var isScheduler_1 = __webpack_require__(19);
	function startWith() {
	    var array = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        array[_i - 0] = arguments[_i];
	    }
	    var scheduler = array[array.length - 1];
	    if (isScheduler_1.isScheduler(scheduler)) {
	        array.pop();
	    } else {
	        scheduler = null;
	    }
	    var len = array.length;
	    if (len === 1) {
	        return concat_static_1.concat(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
	    } else if (len > 1) {
	        return concat_static_1.concat(new fromArray_1.ArrayObservable(array, scheduler), this);
	    } else {
	        return concat_static_1.concat(new empty_1.EmptyObservable(scheduler), this);
	    }
	}
	exports.startWith = startWith;
	//# sourceMappingURL=startWith.js.map

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SubscribeOnObservable_1 = __webpack_require__(239);
	function subscribeOn(scheduler, delay) {
	    if (delay === void 0) {
	        delay = 0;
	    }
	    return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
	}
	exports.subscribeOn = subscribeOn;
	//# sourceMappingURL=subscribeOn.js.map

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function _switch() {
	    return this.lift(new SwitchOperator());
	}
	exports._switch = _switch;
	var SwitchOperator = function () {
	    function SwitchOperator() {}
	    SwitchOperator.prototype.call = function (subscriber) {
	        return new SwitchSubscriber(subscriber);
	    };
	    return SwitchOperator;
	}();
	var SwitchSubscriber = function (_super) {
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
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=switch.js.map

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function switchMap(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}
	exports.switchMap = switchMap;
	var SwitchMapOperator = function () {
	    function SwitchMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapOperator.prototype.call = function (subscriber) {
	        return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
	    };
	    return SwitchMapOperator;
	}();
	var SwitchMapSubscriber = function (_super) {
	    __extends(SwitchMapSubscriber, _super);
	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        var destination = this.destination;
	        var result = tryCatch_1.tryCatch(this.project)(value, index);
	        if (result === errorObject_1.errorObject) {
	            destination.error(errorObject_1.errorObject.e);
	        } else {
	            var innerSubscription = this.innerSubscription;
	            if (innerSubscription) {
	                innerSubscription.unsubscribe();
	            }
	            this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
	        }
	    };
	    SwitchMapSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.isUnsubscribed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var _a = this,
	            resultSelector = _a.resultSelector,
	            destination = _a.destination;
	        if (resultSelector) {
	            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
	            if (result === errorObject_1.errorObject) {
	                destination.error(errorObject_1.errorObject.e);
	            } else {
	                destination.next(result);
	            }
	        } else {
	            destination.next(innerValue);
	        }
	    };
	    return SwitchMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function switchMapTo(observable, resultSelector) {
	    return this.lift(new SwitchMapToOperator(observable, resultSelector));
	}
	exports.switchMapTo = switchMapTo;
	var SwitchMapToOperator = function () {
	    function SwitchMapToOperator(observable, resultSelector) {
	        this.observable = observable;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapToOperator.prototype.call = function (subscriber) {
	        return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
	    };
	    return SwitchMapToOperator;
	}();
	var SwitchMapToSubscriber = function (_super) {
	    __extends(SwitchMapToSubscriber, _super);
	    function SwitchMapToSubscriber(destination, inner, resultSelector) {
	        _super.call(this, destination);
	        this.inner = inner;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapToSubscriber.prototype._next = function (value) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, this.inner, value, this.index++));
	    };
	    SwitchMapToSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.isUnsubscribed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapToSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapToSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var _a = this,
	            resultSelector = _a.resultSelector,
	            destination = _a.destination;
	        if (resultSelector) {
	            var result = tryCatch_1.tryCatch(resultSelector)(outerValue, innerValue, outerIndex, innerIndex);
	            if (result === errorObject_1.errorObject) {
	                destination.error(errorObject_1.errorObject.e);
	            } else {
	                destination.next(result);
	            }
	        } else {
	            destination.next(innerValue);
	        }
	    };
	    return SwitchMapToSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=switchMapTo.js.map

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var ArgumentOutOfRangeError_1 = __webpack_require__(87);
	var empty_1 = __webpack_require__(25);
	function take(total) {
	    if (total === 0) {
	        return new empty_1.EmptyObservable();
	    } else {
	        return this.lift(new TakeOperator(total));
	    }
	}
	exports.take = take;
	var TakeOperator = function () {
	    function TakeOperator(total) {
	        this.total = total;
	        if (this.total < 0) {
	            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
	        }
	    }
	    TakeOperator.prototype.call = function (subscriber) {
	        return new TakeSubscriber(subscriber, this.total);
	    };
	    return TakeOperator;
	}();
	var TakeSubscriber = function (_super) {
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=take.js.map

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function takeUntil(notifier) {
	    return this.lift(new TakeUntilOperator(notifier));
	}
	exports.takeUntil = takeUntil;
	var TakeUntilOperator = function () {
	    function TakeUntilOperator(notifier) {
	        this.notifier = notifier;
	    }
	    TakeUntilOperator.prototype.call = function (subscriber) {
	        return new TakeUntilSubscriber(subscriber, this.notifier);
	    };
	    return TakeUntilOperator;
	}();
	var TakeUntilSubscriber = function (_super) {
	    __extends(TakeUntilSubscriber, _super);
	    function TakeUntilSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
	    }
	    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.complete();
	    };
	    TakeUntilSubscriber.prototype.notifyComplete = function () {
	        // noop
	    };
	    return TakeUntilSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	function takeWhile(predicate) {
	    return this.lift(new TakeWhileOperator(predicate));
	}
	exports.takeWhile = takeWhile;
	var TakeWhileOperator = function () {
	    function TakeWhileOperator(predicate) {
	        this.predicate = predicate;
	    }
	    TakeWhileOperator.prototype.call = function (subscriber) {
	        return new TakeWhileSubscriber(subscriber, this.predicate);
	    };
	    return TakeWhileOperator;
	}();
	var TakeWhileSubscriber = function (_super) {
	    __extends(TakeWhileSubscriber, _super);
	    function TakeWhileSubscriber(destination, predicate) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.index = 0;
	    }
	    TakeWhileSubscriber.prototype._next = function (value) {
	        var destination = this.destination;
	        var result = tryCatch_1.tryCatch(this.predicate)(value, this.index++);
	        if (result == errorObject_1.errorObject) {
	            destination.error(errorObject_1.errorObject.e);
	        } else if (Boolean(result)) {
	            destination.next(value);
	        } else {
	            destination.complete();
	        }
	    };
	    return TakeWhileSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function throttle(durationSelector) {
	    return this.lift(new ThrottleOperator(durationSelector));
	}
	exports.throttle = throttle;
	var ThrottleOperator = function () {
	    function ThrottleOperator(durationSelector) {
	        this.durationSelector = durationSelector;
	    }
	    ThrottleOperator.prototype.call = function (subscriber) {
	        return new ThrottleSubscriber(subscriber, this.durationSelector);
	    };
	    return ThrottleOperator;
	}();
	var ThrottleSubscriber = function (_super) {
	    __extends(ThrottleSubscriber, _super);
	    function ThrottleSubscriber(destination, durationSelector) {
	        _super.call(this, destination);
	        this.durationSelector = durationSelector;
	    }
	    ThrottleSubscriber.prototype._next = function (value) {
	        if (!this.throttled) {
	            var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
	            if (duration === errorObject_1.errorObject) {
	                this.destination.error(errorObject_1.errorObject.e);
	            } else {
	                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
	                this.destination.next(value);
	            }
	        }
	    };
	    ThrottleSubscriber.prototype._unsubscribe = function () {
	        var throttled = this.throttled;
	        if (throttled) {
	            this.remove(throttled);
	            this.throttled = null;
	            throttled.unsubscribe();
	        }
	    };
	    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this._unsubscribe();
	    };
	    ThrottleSubscriber.prototype.notifyComplete = function () {
	        this._unsubscribe();
	    };
	    return ThrottleSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=throttle.js.map

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var asap_1 = __webpack_require__(11);
	function throttleTime(delay, scheduler) {
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    return this.lift(new ThrottleTimeOperator(delay, scheduler));
	}
	exports.throttleTime = throttleTime;
	var ThrottleTimeOperator = function () {
	    function ThrottleTimeOperator(delay, scheduler) {
	        this.delay = delay;
	        this.scheduler = scheduler;
	    }
	    ThrottleTimeOperator.prototype.call = function (subscriber) {
	        return new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler);
	    };
	    return ThrottleTimeOperator;
	}();
	var ThrottleTimeSubscriber = function (_super) {
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
	}(Subscriber_1.Subscriber);
	function dispatchNext(_a) {
	    var subscriber = _a.subscriber;
	    subscriber.clearThrottle();
	}
	//# sourceMappingURL=throttleTime.js.map

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var asap_1 = __webpack_require__(11);
	var isDate_1 = __webpack_require__(39);
	var Subscriber_1 = __webpack_require__(2);
	function timeout(due, errorToSend, scheduler) {
	    if (errorToSend === void 0) {
	        errorToSend = null;
	    }
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    var absoluteTimeout = isDate_1.isDate(due);
	    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
	    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
	}
	exports.timeout = timeout;
	var TimeoutOperator = function () {
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
	}();
	var TimeoutSubscriber = function (_super) {
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
	        get: function get() {
	            return this._previousIndex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TimeoutSubscriber.prototype, "hasCompleted", {
	        get: function get() {
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=timeout.js.map

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var asap_1 = __webpack_require__(11);
	var isDate_1 = __webpack_require__(39);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function timeoutWith(due, withObservable, scheduler) {
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    var absoluteTimeout = isDate_1.isDate(due);
	    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
	    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
	}
	exports.timeoutWith = timeoutWith;
	var TimeoutWithOperator = function () {
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
	}();
	var TimeoutWithSubscriber = function (_super) {
	    __extends(TimeoutWithSubscriber, _super);
	    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
	        _super.call(this);
	        this.destination = destination;
	        this.absoluteTimeout = absoluteTimeout;
	        this.waitFor = waitFor;
	        this.withObservable = withObservable;
	        this.scheduler = scheduler;
	        this.timeoutSubscription = undefined;
	        this.index = 0;
	        this._previousIndex = 0;
	        this._hasCompleted = false;
	        destination.add(this);
	        this.scheduleTimeout();
	    }
	    Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
	        get: function get() {
	            return this._previousIndex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
	        get: function get() {
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
	        this.destination.next(value);
	        if (!this.absoluteTimeout) {
	            this.scheduleTimeout();
	        }
	    };
	    TimeoutWithSubscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this._hasCompleted = true;
	    };
	    TimeoutWithSubscriber.prototype._complete = function () {
	        this.destination.complete();
	        this._hasCompleted = true;
	    };
	    TimeoutWithSubscriber.prototype.handleTimeout = function () {
	        if (!this.isUnsubscribed) {
	            var withObservable = this.withObservable;
	            this.unsubscribe();
	            this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
	        }
	    };
	    return TimeoutWithSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=timeoutWith.js.map

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	function toArray() {
	    return this.lift(new ToArrayOperator());
	}
	exports.toArray = toArray;
	var ToArrayOperator = function () {
	    function ToArrayOperator() {}
	    ToArrayOperator.prototype.call = function (subscriber) {
	        return new ToArraySubscriber(subscriber);
	    };
	    return ToArrayOperator;
	}();
	var ToArraySubscriber = function (_super) {
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=toArray.js.map

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root_1 = __webpack_require__(15);
	function toPromise(PromiseCtor) {
	    var _this = this;
	    if (!PromiseCtor) {
	        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	            PromiseCtor = root_1.root.Rx.config.Promise;
	        } else if (root_1.root.Promise) {
	            PromiseCtor = root_1.root.Promise;
	        }
	    }
	    if (!PromiseCtor) {
	        throw new Error('no Promise impl found');
	    }
	    return new PromiseCtor(function (resolve, reject) {
	        var value;
	        _this.subscribe(function (x) {
	            return value = x;
	        }, function (err) {
	            return reject(err);
	        }, function () {
	            return resolve(value);
	        });
	    });
	}
	exports.toPromise = toPromise;
	//# sourceMappingURL=toPromise.js.map

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subject_1 = __webpack_require__(10);
	function window(closingNotifier) {
	    return this.lift(new WindowOperator(closingNotifier));
	}
	exports.window = window;
	var WindowOperator = function () {
	    function WindowOperator(closingNotifier) {
	        this.closingNotifier = closingNotifier;
	    }
	    WindowOperator.prototype.call = function (subscriber) {
	        return new WindowSubscriber(subscriber, this.closingNotifier);
	    };
	    return WindowOperator;
	}();
	var WindowSubscriber = function (_super) {
	    __extends(WindowSubscriber, _super);
	    function WindowSubscriber(destination, closingNotifier) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.closingNotifier = closingNotifier;
	        this.add(closingNotifier.subscribe(new WindowClosingNotifierSubscriber(this)));
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
	        var destination = this.destination;
	        var newWindow = this.window = new Subject_1.Subject();
	        destination.add(newWindow);
	        destination.next(newWindow);
	    };
	    WindowSubscriber.prototype.errorWindow = function (err) {
	        this._error(err);
	    };
	    WindowSubscriber.prototype.completeWindow = function () {
	        this._complete();
	    };
	    return WindowSubscriber;
	}(Subscriber_1.Subscriber);
	var WindowClosingNotifierSubscriber = function (_super) {
	    __extends(WindowClosingNotifierSubscriber, _super);
	    function WindowClosingNotifierSubscriber(parent) {
	        _super.call(this);
	        this.parent = parent;
	    }
	    WindowClosingNotifierSubscriber.prototype._next = function () {
	        this.parent.openWindow();
	    };
	    WindowClosingNotifierSubscriber.prototype._error = function (err) {
	        this.parent.errorWindow(err);
	    };
	    WindowClosingNotifierSubscriber.prototype._complete = function () {
	        this.parent.completeWindow();
	    };
	    return WindowClosingNotifierSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=window.js.map

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subject_1 = __webpack_require__(10);
	function windowCount(windowSize, startWindowEvery) {
	    if (startWindowEvery === void 0) {
	        startWindowEvery = 0;
	    }
	    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
	}
	exports.windowCount = windowCount;
	var WindowCountOperator = function () {
	    function WindowCountOperator(windowSize, startWindowEvery) {
	        this.windowSize = windowSize;
	        this.startWindowEvery = startWindowEvery;
	    }
	    WindowCountOperator.prototype.call = function (subscriber) {
	        return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
	    };
	    return WindowCountOperator;
	}();
	var WindowCountSubscriber = function (_super) {
	    __extends(WindowCountSubscriber, _super);
	    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.windowSize = windowSize;
	        this.startWindowEvery = startWindowEvery;
	        this.windows = [new Subject_1.Subject()];
	        this.count = 0;
	        var firstWindow = this.windows[0];
	        destination.add(firstWindow);
	        destination.next(firstWindow);
	    }
	    WindowCountSubscriber.prototype._next = function (value) {
	        var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
	        var destination = this.destination;
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
	            destination.add(window_1);
	            destination.next(window_1);
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=windowCount.js.map

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subject_1 = __webpack_require__(10);
	var asap_1 = __webpack_require__(11);
	function windowTime(windowTimeSpan, windowCreationInterval, scheduler) {
	    if (windowCreationInterval === void 0) {
	        windowCreationInterval = null;
	    }
	    if (scheduler === void 0) {
	        scheduler = asap_1.asap;
	    }
	    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
	}
	exports.windowTime = windowTime;
	var WindowTimeOperator = function () {
	    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
	        this.windowTimeSpan = windowTimeSpan;
	        this.windowCreationInterval = windowCreationInterval;
	        this.scheduler = scheduler;
	    }
	    WindowTimeOperator.prototype.call = function (subscriber) {
	        return new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler);
	    };
	    return WindowTimeOperator;
	}();
	var WindowTimeSubscriber = function (_super) {
	    __extends(WindowTimeSubscriber, _super);
	    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
	        _super.call(this, destination);
	        this.destination = destination;
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
	        } else {
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
	        var destination = this.destination;
	        destination.add(window);
	        destination.next(window);
	        return window;
	    };
	    WindowTimeSubscriber.prototype.closeWindow = function (window) {
	        window.complete();
	        var windows = this.windows;
	        windows.splice(windows.indexOf(window), 1);
	    };
	    return WindowTimeSubscriber;
	}(Subscriber_1.Subscriber);
	function dispatchWindowTimeSpanOnly(state) {
	    var subscriber = state.subscriber,
	        windowTimeSpan = state.windowTimeSpan,
	        window = state.window;
	    if (window) {
	        window.complete();
	    }
	    state.window = subscriber.openWindow();
	    this.schedule(state, windowTimeSpan);
	}
	function dispatchWindowCreation(state) {
	    var windowTimeSpan = state.windowTimeSpan,
	        subscriber = state.subscriber,
	        scheduler = state.scheduler,
	        windowCreationInterval = state.windowCreationInterval;
	    var window = subscriber.openWindow();
	    var action = this;
	    var context = { action: action, subscription: null };
	    var timeSpanState = { subscriber: subscriber, window: window, context: context };
	    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
	    action.add(context.subscription);
	    action.schedule(state, windowCreationInterval);
	}
	function dispatchWindowClose(_a) {
	    var subscriber = _a.subscriber,
	        window = _a.window,
	        context = _a.context;
	    if (context && context.action && context.subscription) {
	        context.action.remove(context.subscription);
	    }
	    subscriber.closeWindow(window);
	}
	//# sourceMappingURL=windowTime.js.map

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(10);
	var Subscription_1 = __webpack_require__(9);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
	function windowToggle(openings, closingSelector) {
	    return this.lift(new WindowToggleOperator(openings, closingSelector));
	}
	exports.windowToggle = windowToggle;
	var WindowToggleOperator = function () {
	    function WindowToggleOperator(openings, closingSelector) {
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	    }
	    WindowToggleOperator.prototype.call = function (subscriber) {
	        return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
	    };
	    return WindowToggleOperator;
	}();
	var WindowToggleSubscriber = function (_super) {
	    __extends(WindowToggleSubscriber, _super);
	    function WindowToggleSubscriber(destination, openings, closingSelector) {
	        _super.call(this, destination);
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	        this.contexts = [];
	        this.add(this.openSubscription = subscribeToResult_1.subscribeToResult(this, openings, openings));
	    }
	    WindowToggleSubscriber.prototype._next = function (value) {
	        var contexts = this.contexts;
	        if (contexts) {
	            var len = contexts.length;
	            for (var i = 0; i < len; i++) {
	                contexts[i].window.next(value);
	            }
	        }
	    };
	    WindowToggleSubscriber.prototype._error = function (err) {
	        var contexts = this.contexts;
	        this.contexts = null;
	        if (contexts) {
	            var len = contexts.length;
	            var index = -1;
	            while (++index < len) {
	                var context = contexts[index];
	                context.window.error(err);
	                context.subscription.unsubscribe();
	            }
	        }
	        _super.prototype._error.call(this, err);
	    };
	    WindowToggleSubscriber.prototype._complete = function () {
	        var contexts = this.contexts;
	        this.contexts = null;
	        if (contexts) {
	            var len = contexts.length;
	            var index = -1;
	            while (++index < len) {
	                var context = contexts[index];
	                context.window.complete();
	                context.subscription.unsubscribe();
	            }
	        }
	        _super.prototype._complete.call(this);
	    };
	    WindowToggleSubscriber.prototype._unsubscribe = function () {
	        var contexts = this.contexts;
	        this.contexts = null;
	        if (contexts) {
	            var len = contexts.length;
	            var index = -1;
	            while (++index < len) {
	                var context = contexts[index];
	                context.window.unsubscribe();
	                context.subscription.unsubscribe();
	            }
	        }
	    };
	    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        if (outerValue === this.openings) {
	            var closingSelector = this.closingSelector;
	            var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
	            if (closingNotifier === errorObject_1.errorObject) {
	                return this.error(errorObject_1.errorObject.e);
	            } else {
	                var window_1 = new Subject_1.Subject();
	                var subscription = new Subscription_1.Subscription();
	                var context = { window: window_1, subscription: subscription };
	                this.contexts.push(context);
	                var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
	                innerSubscription.context = context;
	                subscription.add(innerSubscription);
	                this.destination.next(window_1);
	            }
	        } else {
	            this.closeWindow(this.contexts.indexOf(outerValue));
	        }
	    };
	    WindowToggleSubscriber.prototype.notifyError = function (err) {
	        this.error(err);
	    };
	    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
	        if (inner !== this.openSubscription) {
	            this.closeWindow(this.contexts.indexOf(inner.context));
	        }
	    };
	    WindowToggleSubscriber.prototype.closeWindow = function (index) {
	        var contexts = this.contexts;
	        var context = contexts[index];
	        var window = context.window,
	            subscription = context.subscription;
	        contexts.splice(index, 1);
	        window.complete();
	        subscription.unsubscribe();
	    };
	    return WindowToggleSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=windowToggle.js.map

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subject_1 = __webpack_require__(10);
	var Subscription_1 = __webpack_require__(9);
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	function windowWhen(closingSelector) {
	    return this.lift(new WindowOperator(closingSelector));
	}
	exports.windowWhen = windowWhen;
	var WindowOperator = function () {
	    function WindowOperator(closingSelector) {
	        this.closingSelector = closingSelector;
	    }
	    WindowOperator.prototype.call = function (subscriber) {
	        return new WindowSubscriber(subscriber, this.closingSelector);
	    };
	    return WindowOperator;
	}();
	var WindowSubscriber = function (_super) {
	    __extends(WindowSubscriber, _super);
	    function WindowSubscriber(destination, closingSelector) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.closingSelector = closingSelector;
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
	        var window = this.window = new Subject_1.Subject();
	        this.destination.next(window);
	        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
	        if (closingNotifier === errorObject_1.errorObject) {
	            var err = errorObject_1.errorObject.e;
	            this.destination.error(err);
	            this.window.error(err);
	        } else {
	            var closingNotification = this.closingNotification = new Subscription_1.Subscription();
	            closingNotification.add(closingNotifier.subscribe(new WindowClosingNotifierSubscriber(this)));
	            this.add(closingNotification);
	            this.add(window);
	        }
	    };
	    return WindowSubscriber;
	}(Subscriber_1.Subscriber);
	var WindowClosingNotifierSubscriber = function (_super) {
	    __extends(WindowClosingNotifierSubscriber, _super);
	    function WindowClosingNotifierSubscriber(parent) {
	        _super.call(this);
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
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=windowWhen.js.map

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1 = __webpack_require__(4);
	var errorObject_1 = __webpack_require__(3);
	var OuterSubscriber_1 = __webpack_require__(5);
	var subscribeToResult_1 = __webpack_require__(6);
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
	var WithLatestFromOperator = function () {
	    function WithLatestFromOperator(observables, project) {
	        this.observables = observables;
	        this.project = project;
	    }
	    WithLatestFromOperator.prototype.call = function (subscriber) {
	        return new WithLatestFromSubscriber(subscriber, this.observables, this.project);
	    };
	    return WithLatestFromOperator;
	}();
	var WithLatestFromSubscriber = function (_super) {
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
	                } else {
	                    destination.next(result);
	                }
	            } else {
	                destination.next(args);
	            }
	        }
	    };
	    return WithLatestFromSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var zip_static_1 = __webpack_require__(81);
	function zipProto() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    observables.unshift(this);
	    return zip_static_1.zip.apply(this, observables);
	}
	exports.zipProto = zipProto;
	//# sourceMappingURL=zip.js.map

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var zip_support_1 = __webpack_require__(82);
	function zipAll(project) {
	    return this.lift(new zip_support_1.ZipOperator(project));
	}
	exports.zipAll = zipAll;
	//# sourceMappingURL=zipAll.js.map

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Immediate_1 = __webpack_require__(337);
	var FutureAction_1 = __webpack_require__(50);
	var AsapAction = function (_super) {
	    __extends(AsapAction, _super);
	    function AsapAction() {
	        _super.apply(this, arguments);
	    }
	    AsapAction.prototype._schedule = function (state, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        if (delay > 0) {
	            return _super.prototype._schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        var scheduler = this.scheduler;
	        scheduler.actions.push(this);
	        if (!scheduler.scheduledId) {
	            scheduler.scheduledId = Immediate_1.Immediate.setImmediate(function () {
	                scheduler.scheduledId = null;
	                scheduler.flush();
	            });
	        }
	        return this;
	    };
	    AsapAction.prototype._unsubscribe = function () {
	        var scheduler = this.scheduler;
	        var scheduledId = scheduler.scheduledId,
	            actions = scheduler.actions;
	        _super.prototype._unsubscribe.call(this);
	        if (actions.length === 0) {
	            scheduler.active = false;
	            if (scheduledId != null) {
	                scheduler.scheduledId = null;
	                Immediate_1.Immediate.clearImmediate(scheduledId);
	            }
	        }
	    };
	    return AsapAction;
	}(FutureAction_1.FutureAction);
	exports.AsapAction = AsapAction;
	//# sourceMappingURL=AsapAction.js.map

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsapAction_1 = __webpack_require__(332);
	var QueueScheduler_1 = __webpack_require__(83);
	var AsapScheduler = function (_super) {
	    __extends(AsapScheduler, _super);
	    function AsapScheduler() {
	        _super.apply(this, arguments);
	    }
	    AsapScheduler.prototype.scheduleNow = function (work, state) {
	        return new AsapAction_1.AsapAction(this, work).schedule(state);
	    };
	    return AsapScheduler;
	}(QueueScheduler_1.QueueScheduler);
	exports.AsapScheduler = AsapScheduler;
	//# sourceMappingURL=AsapScheduler.js.map

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var FutureAction_1 = __webpack_require__(50);
	var QueueAction = function (_super) {
	    __extends(QueueAction, _super);
	    function QueueAction() {
	        _super.apply(this, arguments);
	    }
	    QueueAction.prototype._schedule = function (state, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        if (delay > 0) {
	            return _super.prototype._schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        var scheduler = this.scheduler;
	        scheduler.actions.push(this);
	        scheduler.flush();
	        return this;
	    };
	    return QueueAction;
	}(FutureAction_1.FutureAction);
	exports.QueueAction = QueueAction;
	//# sourceMappingURL=QueueAction.js.map

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(9);
	var SubjectSubscription = function (_super) {
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
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.observer);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription);
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 336 */
/***/ function(module, exports) {

	"use strict";

	var FastMap = function () {
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
	}();
	exports.FastMap = FastMap;
	//# sourceMappingURL=FastMap.js.map

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
	*/
	var root_1 = __webpack_require__(15);
	var ImmediateDefinition = function () {
	    function ImmediateDefinition(root) {
	        this.root = root;
	        if (root.setImmediate && typeof root.setImmediate === 'function') {
	            this.setImmediate = root.setImmediate.bind(root);
	            this.clearImmediate = root.clearImmediate.bind(root);
	        } else {
	            this.nextHandle = 1;
	            this.tasksByHandle = {};
	            this.currentlyRunningATask = false;
	            // Don't get fooled by e.g. browserify environments.
	            if (this.canUseProcessNextTick()) {
	                // For Node.js before 0.9
	                this.setImmediate = this.createProcessNextTickSetImmediate();
	            } else if (this.canUsePostMessage()) {
	                // For non-IE10 modern browsers
	                this.setImmediate = this.createPostMessageSetImmediate();
	            } else if (this.canUseMessageChannel()) {
	                // For web workers, where supported
	                this.setImmediate = this.createMessageChannelSetImmediate();
	            } else if (this.canUseReadyStateChange()) {
	                // For IE 6–8
	                this.setImmediate = this.createReadyStateChangeSetImmediate();
	            } else {
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
	            var _a = result,
	                handler = _a.handler,
	                args = _a.args;
	            if (typeof handler === 'function') {
	                handler.apply(undefined, args);
	            } else {
	                new Function('' + handler)();
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
	            if (event.source === root && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
	                instance.runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	        onGlobalMessage.instance = this;
	        root.addEventListener('message', onGlobalMessage, false);
	        var fn = function setImmediate() {
	            var _a = setImmediate,
	                messagePrefix = _a.messagePrefix,
	                instance = _a.instance;
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
	        } else {
	            var task = this.tasksByHandle[handle];
	            if (task) {
	                this.currentlyRunningATask = true;
	                try {
	                    task();
	                } finally {
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
	            var _a = setImmediate,
	                channel = _a.channel,
	                instance = _a.instance;
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
	}();
	exports.ImmediateDefinition = ImmediateDefinition;
	exports.Immediate = new ImmediateDefinition(root_1.root);
	//# sourceMappingURL=Immediate.js.map

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root_1 = __webpack_require__(15);
	var MapPolyfill_1 = __webpack_require__(339);
	exports.Map = root_1.root.Map || function () {
	  return MapPolyfill_1.MapPolyfill;
	}();
	//# sourceMappingURL=Map.js.map

/***/ },
/* 339 */
/***/ function(module, exports) {

	"use strict";

	var MapPolyfill = function () {
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
	        } else {
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
	}();
	exports.MapPolyfill = MapPolyfill;
	//# sourceMappingURL=MapPolyfill.js.map

/***/ },
/* 340 */
/***/ function(module, exports) {

	"use strict";

	function not(pred, thisArg) {
	    function notPred() {
	        return !notPred.pred.apply(notPred.thisArg, arguments);
	    }
	    notPred.pred = pred;
	    notPred.thisArg = thisArg;
	    return notPred;
	}
	exports.not = not;
	//# sourceMappingURL=not.js.map

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var Subscriber_1 = __webpack_require__(2);
	var rxSubscriber_1 = __webpack_require__(37);
	function toSubscriber(next, error, complete) {
	    if (next && (typeof next === 'undefined' ? 'undefined' : _typeof(next)) === 'object') {
	        if (next instanceof Subscriber_1.Subscriber) {
	            return next;
	        } else if (typeof next[rxSubscriber_1.rxSubscriber] === 'function') {
	            return next[rxSubscriber_1.rxSubscriber]();
	        } else {
	            return new Subscriber_1.Subscriber(next);
	        }
	    }
	    return Subscriber_1.Subscriber.create(next, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 342 */
/***/ function(module, exports) {

	"use strict";

	function tryOrThrowError(target) {
	    function tryCatcher() {
	        try {
	            tryCatcher.target.apply(this, arguments);
	        } catch (e) {
	            throw e;
	        }
	    }
	    tryCatcher.target = target;
	    return tryCatcher;
	}
	exports.tryOrThrowError = tryOrThrowError;
	//# sourceMappingURL=tryOrThrowError.js.map

/***/ },
/* 343 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 344 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Average bandwidth rule
	 */

	// Exponential moving-average
	// http://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
	function ema(a) {
	  return function (s, x) {
	    return s == null ? x : a * x + (1 - a) * s;
	  };
	}

	module.exports = function (metrics, options) {
	  return metrics.map(function (metric) {
	    return metric.value.response;
	  })
	  // do not take into account small chunks < 2KB. filters out init
	  // segments and small manifests in particular.
	  .filter(function (response) {
	    return response.size > 2000;
	  })
	  // converts response metadata in bits-per-seconds
	  .map(function (response) {
	    return response.size / response.duration * 8000;
	  }).scan(ema(options.alpha));
	};

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var log = __webpack_require__(13);

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var BehaviorSubject = _require.BehaviorSubject;
	var Subscription = _require.Subscription;
	var combineLatest = Observable.combineLatest;

	var _require2 = __webpack_require__(21);

	var only = _require2.only;

	var find = __webpack_require__(29);
	var findLast = __webpack_require__(98);
	var defaults = __webpack_require__(30);

	var AverageBitrate = __webpack_require__(344);

	var DEFAULTS = {
	  defaultLanguage: "fra",
	  defaultSubtitle: "",
	  // default buffer size in seconds
	  defaultBufferSize: 30,
	  // buffer threshold ratio used as a lower bound
	  // margin to find the suitable representation
	  defaultBufferThreshold: 0.3
	};

	function def(x, val) {
	  return typeof x == "number" && x > 0 ? x : val;
	}

	function getClosestBitrate(bitrates, btr) {
	  var threshold = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	  return findLast(bitrates, function (b) {
	    return b / btr <= 1 - threshold;
	  }) || bitrates[0];
	}

	function getClosestDisplayBitrate(reps, width) {
	  var rep = find(reps, function (r) {
	    return r.width >= width;
	  });
	  if (rep) {
	    return rep.bitrate;
	  } else {
	    return Infinity;
	  }
	}

	function findByLang(adaptations, lang) {
	  if (lang) {
	    return find(adaptations, function (a) {
	      return a.lang === lang;
	    });
	  } else {
	    return null;
	  }
	}

	function filterByType(stream, selectedType) {
	  return stream.filter(function (_ref) {
	    var type = _ref.type;
	    return type === selectedType;
	  });
	}

	module.exports = function (metrics, timings, deviceEvents) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var _defaults = defaults(options, DEFAULTS);

	  var defaultLanguage = _defaults.defaultLanguage;
	  var defaultSubtitle = _defaults.defaultSubtitle;
	  var defaultBufferSize = _defaults.defaultBufferSize;
	  var defaultBufferThreshold = _defaults.defaultBufferThreshold;
	  var initVideoBitrate = _defaults.initVideoBitrate;
	  var initAudioBitrate = _defaults.initAudioBitrate;
	  var videoWidth = deviceEvents.videoWidth;
	  var inBackground = deviceEvents.inBackground;


	  var $languages = new BehaviorSubject(defaultLanguage);
	  var $subtitles = new BehaviorSubject(defaultSubtitle);

	  var $averageBitrates = {
	    audio: new BehaviorSubject(initAudioBitrate || 0),
	    video: new BehaviorSubject(initVideoBitrate || 0)
	  };

	  var averageBitratesConns = [AverageBitrate(filterByType(metrics, "audio"), { alpha: 0.6 }).multicast($averageBitrates.audio), AverageBitrate(filterByType(metrics, "video"), { alpha: 0.6 }).multicast($averageBitrates.video)];

	  var conns = new Subscription();
	  averageBitratesConns.forEach(function (a) {
	    return conns.add(a.connect());
	  });

	  var $usrBitrates = {
	    audio: new BehaviorSubject(Infinity),
	    video: new BehaviorSubject(Infinity)
	  };

	  var $maxBitrates = {
	    audio: new BehaviorSubject(Infinity),
	    video: new BehaviorSubject(Infinity)
	  };

	  var $bufSizes = {
	    audio: new BehaviorSubject(defaultBufferSize),
	    video: new BehaviorSubject(defaultBufferSize),
	    text: new BehaviorSubject(defaultBufferSize)
	  };

	  function audioAdaptationChoice(adaptations) {
	    return $languages.distinctUntilChanged().map(function (lang) {
	      return findByLang(adaptations, lang) || adaptations[0];
	    });
	  }

	  function textAdaptationChoice(adaptations) {
	    return $subtitles.distinctUntilChanged().map(function (lang) {
	      return findByLang(adaptations, lang);
	    });
	  }

	  function getAdaptationsChoice(type, adaptations) {
	    if (type == "audio") {
	      return audioAdaptationChoice(adaptations);
	    }

	    if (type == "text") {
	      return textAdaptationChoice(adaptations);
	    }

	    if (adaptations.length == 1) {
	      return only(adaptations[0]);
	    }

	    throw new Error("adaptive: unknown type " + type + " for adaptation chooser");
	  }

	  function getBufferAdapters(adaptation) {
	    var type = adaptation.type;
	    var bitrates = adaptation.bitrates;
	    var representations = adaptation.representations;


	    var firstRep = representations[0];

	    var representationsObservable = undefined;
	    if (representations.length > 1) {
	      var usrBitrates = $usrBitrates[type];
	      var maxBitrates = $maxBitrates[type];

	      var avrBitrates = $averageBitrates[type].map(function (avrBitrate, count) {
	        // no threshold for the first value of the average bitrate
	        // stream corresponding to the selected initial video bitrate
	        var bufThreshold = undefined;
	        if (count === 0) {
	          bufThreshold = 0;
	        } else {
	          bufThreshold = defaultBufferThreshold;
	        }

	        return getClosestBitrate(bitrates, avrBitrate, bufThreshold);
	      }).distinctUntilChanged().debounceTime(2000).startWith(getClosestBitrate(bitrates, $averageBitrates[type].getValue(), 0));

	      if (type == "video") {
	        // To compute the bitrate upper-bound for video
	        // representations we need to combine multiple stream:
	        //   - user-based maximum bitrate (subject)
	        //   - maximum based on the video element width
	        //   - maximum based on the application visibility (background tab)
	        maxBitrates = combineLatest(maxBitrates, videoWidth, inBackground, function (bitrate, width, isHidden) {
	          if (isHidden) {
	            return bitrates[0];
	          }

	          var closestDisplayBitrate = getClosestDisplayBitrate(representations, width);
	          if (closestDisplayBitrate < bitrate) {
	            return closestDisplayBitrate;
	          }

	          return bitrate;
	        });
	      }

	      representationsObservable = combineLatest(usrBitrates, maxBitrates, avrBitrates, function (usr, max, avr) {
	        var btr = undefined;
	        if (usr < Infinity) {
	          btr = usr;
	        } else if (max < Infinity) {
	          btr = Math.min(max, avr);
	        } else {
	          btr = avr;
	        }
	        return find(representations, function (rep) {
	          return rep.bitrate === getClosestBitrate(bitrates, btr);
	        });
	      }).distinctUntilChanged(function (a, b) {
	        return a.id === b.id;
	      }).do(function (r) {
	        return log.info("bitrate", type, r.bitrate);
	      });
	    } else {
	      representationsObservable = only(firstRep);
	    }

	    return {
	      representations: representationsObservable,
	      bufferSizes: $bufSizes[type] || new BehaviorSubject(defaultBufferSize)
	    };
	  }

	  return {
	    setLanguage: function setLanguage(lng) {
	      $languages.next(lng);
	    },
	    setSubtitle: function setSubtitle(sub) {
	      $subtitles.next(sub);
	    },
	    getLanguage: function getLanguage() {
	      return $languages.value;
	    },
	    getSubtitle: function getSubtitle() {
	      return $subtitles.value;
	    },
	    getAverageBitrates: function getAverageBitrates() {
	      return $averageBitrates;
	    },
	    getAudioMaxBitrate: function getAudioMaxBitrate() {
	      return $maxBitrates.audio.value;
	    },
	    getVideoMaxBitrate: function getVideoMaxBitrate() {
	      return $maxBitrates.video.value;
	    },
	    getAudioBufferSize: function getAudioBufferSize() {
	      return $bufSizes.audio.value;
	    },
	    getVideoBufferSize: function getVideoBufferSize() {
	      return $bufSizes.video.value;
	    },
	    setAudioBitrate: function setAudioBitrate(x) {
	      $usrBitrates.audio.next(def(x, Infinity));
	    },
	    setVideoBitrate: function setVideoBitrate(x) {
	      $usrBitrates.video.next(def(x, Infinity));
	    },
	    setAudioMaxBitrate: function setAudioMaxBitrate(x) {
	      $maxBitrates.audio.next(def(x, Infinity));
	    },
	    setVideoMaxBitrate: function setVideoMaxBitrate(x) {
	      $maxBitrates.video.next(def(x, Infinity));
	    },
	    setAudioBufferSize: function setAudioBufferSize(x) {
	      $bufSizes.audio.next(def(x, defaultBufferSize));
	    },
	    setVideoBufferSize: function setVideoBufferSize(x) {
	      $bufSizes.video.next(def(x, defaultBufferSize));
	    },


	    getBufferAdapters: getBufferAdapters,
	    getAdaptationsChoice: getAdaptationsChoice,

	    unsubscribe: function unsubscribe() {
	      if (conns) {
	        conns.unsubscribe();
	        conns = null;
	      }
	    }
	  };
	};

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var log = __webpack_require__(13);
	var assert = __webpack_require__(7);

	var _require = __webpack_require__(32);

	var BufferedRanges = _require.BufferedRanges;

	var _require2 = __webpack_require__(8);

	var Observable = _require2.Observable;
	var Subject = _require2.Subject;
	var combineLatest = Observable.combineLatest;
	var defer = Observable.defer;
	var empty = Observable.empty;
	var from = Observable.from;
	var merge = Observable.merge;
	var timer = Observable.timer;

	var _require3 = __webpack_require__(21);

	var first = _require3.first;
	var on = _require3.on;

	var _require4 = __webpack_require__(368);

	var SimpleSet = _require4.SimpleSet;

	var _require5 = __webpack_require__(93);

	var IndexHandler = _require5.IndexHandler;
	var OutOfIndexError = _require5.OutOfIndexError;


	var BITRATE_REBUFFERING_RATIO = 1.5;

	var GC_GAP_CALM = 240;
	var GC_GAP_BEEFY = 30;

	function Buffer(_ref) // Seekings observable
	{
	  var bufferType = _ref.bufferType;
	  var // Buffer type (audio, video, text)
	  sourceBuffer = _ref.sourceBuffer;
	  var // SourceBuffer object
	  adaptation = _ref.adaptation;
	  var // Adaptation buffered
	  pipeline = _ref.pipeline;
	  var // Segment pipeline
	  adapters = _ref.adapters;
	  var // { representations, bufferSizes } observables
	  timings = _ref.timings;
	  var // Timings observable
	  seekings = _ref.seekings;


	  var isAVBuffer = bufferType == "audio" || bufferType == "video";

	  var outOfIndexStream = new Subject();

	  // safety level (low and high water mark) size of buffer that won't
	  // be flushed when switching representation for smooth transitions
	  // and avoiding buffer underflows
	  var LOW_WATER_MARK_PAD = bufferType == "video" ? 4 : 1;
	  var HIGH_WATER_MARK_PAD = bufferType == "video" ? 6 : 1;

	  var representations = adapters.representations;
	  var bufferSizes = adapters.bufferSizes;

	  var ranges = new BufferedRanges();

	  var updateEnd = merge(on(sourceBuffer, "update"), on(sourceBuffer, "error").map(function (evt) {
	    if (evt.target && evt.target.error) {
	      throw evt.target.error;
	    } else {
	      var errMessage = "buffer: error event";
	      log.error(errMessage, evt);
	      throw new Error(errMessage);
	    }
	  })).share();

	  // prevents unceasing add/remove event listeners by sharing an
	  // open updateEnd stream (hackish)
	  var mutedUpdateEnd = updateEnd.ignoreElements().startWith(true);

	  function appendBuffer(blob) {
	    sourceBuffer.appendBuffer(blob);
	    return first(updateEnd);
	  }

	  function removeBuffer(_ref2) {
	    var start = _ref2.start;
	    var end = _ref2.end;

	    sourceBuffer.remove(start, end);
	    return first(updateEnd);
	  }

	  function lockedBufferFunction(func) {
	    return function (data) {
	      return defer(function () {
	        if (sourceBuffer.updating) {
	          return first(updateEnd).flatMap(function () {
	            return func(data);
	          });
	        } else {
	          return func(data);
	        }
	      });
	    };
	  }

	  var lockedAppendBuffer = lockedBufferFunction(appendBuffer);
	  var lockedRemoveBuffer = lockedBufferFunction(removeBuffer);

	  // Buffer garbage collector algorithm. Tries to free up some part of
	  // the ranges that are distant from the current playing time.
	  // See: https://w3c.github.io/media-source/#sourcebuffer-prepare-append
	  function selectGCedRanges(_ref3, gcGap) {
	    var ts = _ref3.ts;
	    var buffered = _ref3.buffered;

	    var innerRange = buffered.getRange(ts);
	    var outerRanges = buffered.getOuterRanges(ts);

	    var cleanedupRanges = [];

	    // start by trying to remove all ranges that do not contain the
	    // current time and respect the gcGap
	    for (var i = 0; i < outerRanges.length; i++) {
	      var outerRange = outerRanges[i];
	      if (ts - gcGap < outerRange.end) {
	        cleanedupRanges.push(outerRange);
	      } else if (ts + gcGap > outerRange.start) {
	        cleanedupRanges.push(outerRange);
	      }
	    }

	    // try to clean up some space in the current range
	    if (innerRange) {
	      log.debug("buffer: gc removing part of inner range", cleanedupRanges);
	      if (ts - gcGap > innerRange.start) {
	        cleanedupRanges.push({
	          start: innerRange.start,
	          end: ts - gcGap
	        });
	      }

	      if (ts + gcGap < innerRange.end) {
	        cleanedupRanges.push({
	          start: ts + gcGap,
	          end: innerRange.end
	        });
	      }
	    }

	    return cleanedupRanges;
	  }

	  function bufferGarbageCollector() {
	    log.warn("buffer: running garbage collector");
	    return timings.take(1).flatMap(function (timing) {
	      var cleanedupRanges = selectGCedRanges(timing, GC_GAP_CALM);

	      // more aggressive GC if we could not find any range to clean
	      if (cleanedupRanges.length === 0) {
	        cleanedupRanges = selectGCedRanges(timing, GC_GAP_BEEFY);
	      }

	      log.debug("buffer: gc cleaning", cleanedupRanges);
	      return from(cleanedupRanges.map(lockedRemoveBuffer)).concatAll();
	    });
	  }

	  function doAppendBufferOrGC(pipelineData) {
	    var blob = pipelineData.parsed.blob;
	    return lockedAppendBuffer(blob).catch(function (err) {
	      // launch our garbage collector and retry on
	      // QuotaExceededError
	      if (err.name !== "QuotaExceededError") {
	        throw err;
	      }

	      return bufferGarbageCollector().flatMap(function () {
	        return lockedAppendBuffer(blob);
	      });
	    });
	  }

	  function getSegmentsListToInject(segmentIndex, adaptation, representation, buffered, timing, bufferSize, withInitSegment) {
	    var segments = [];

	    if (withInitSegment) {
	      log.debug("add init segment", bufferType);
	      segments.push(segmentIndex.getInitSegment());
	    }

	    if (timing.readyState === 0) {
	      return segments;
	    }

	    var timestamp = timing.ts;

	    // wanted buffer size calculates the actual size of the buffer
	    // we want to ensure, taking into account the duration and the
	    // potential live gap.
	    var endDiff = (timing.duration || Infinity) - timestamp;
	    var wantedBufferSize = Math.max(0, Math.min(bufferSize, timing.liveGap, endDiff));

	    // the ts padding is the actual time gap that we want to apply
	    // to our current timestamp in order to calculate the list of
	    // segments to inject.
	    var timestampPadding = undefined;
	    var bufferGap = buffered.getGap(timestamp);
	    if (bufferGap > LOW_WATER_MARK_PAD && bufferGap < Infinity) {
	      timestampPadding = Math.min(bufferGap, HIGH_WATER_MARK_PAD);
	    } else {
	      timestampPadding = 0;
	    }

	    // in case the current buffered range has the same bitrate as
	    // the requested representation, we can a optimistically discard
	    // all the already buffered data by using the
	    var currentRange = ranges.getRange(timestamp);
	    if (currentRange && currentRange.bitrate === representation.bitrate) {
	      var rangeEndGap = Math.floor(currentRange.end - timestamp);
	      if (rangeEndGap > timestampPadding) {
	        timestampPadding = rangeEndGap;
	      }
	    }

	    // given the current timestamp and the previously calculated
	    // time gap and wanted buffer size, we can retrieve the list of
	    // segments to inject in our pipelines.
	    var mediaSegments = segmentIndex.getSegments(timestamp, timestampPadding, wantedBufferSize);

	    return segments.concat(mediaSegments);
	  }

	  function createRepresentationBuffer(representation) {
	    var segmentIndex = new IndexHandler(adaptation, representation);
	    var queuedSegments = new SimpleSet();

	    function filterAlreadyLoaded(segment) {
	      // if this segment is already in the pipeline
	      var isInQueue = queuedSegments.test(segment.getId());
	      if (isInQueue) {
	        return false;
	      }

	      // segment without time info are usually init segments or some
	      // kind of metadata segment that we never filter out
	      if (segment.isInitSegment() || segment.getTime() < 0) {
	        return true;
	      }

	      var time = segmentIndex.scale(segment.getTime());
	      var duration = segmentIndex.scale(segment.getDuration());

	      var range = ranges.hasRange(time, duration);
	      if (range) {
	        return range.bitrate * BITRATE_REBUFFERING_RATIO < segment.getRepresentation().bitrate;
	      } else {
	        return true;
	      }
	    }

	    function doInjectSegments(_ref4, injectCount) {
	      var timing = _ref4[0];
	      var bufferSize = _ref4[1];

	      var nativeBufferedRanges = new BufferedRanges(sourceBuffer.buffered);

	      // makes sure our own buffered ranges representation stay in
	      // sync with the native one
	      if (isAVBuffer) {
	        if (!ranges.equals(nativeBufferedRanges)) {
	          log.debug("intersect new buffer", bufferType);
	          ranges.intersect(nativeBufferedRanges);
	        }
	      }

	      var injectedSegments = undefined;
	      try {
	        // filter out already loaded and already queued segments
	        var withInitSegment = injectCount === 0;
	        injectedSegments = getSegmentsListToInject(segmentIndex, adaptation, representation, nativeBufferedRanges, timing, bufferSize, withInitSegment);

	        injectedSegments = injectedSegments.filter(filterAlreadyLoaded);
	      } catch (err) {
	        // catch OutOfIndexError errors thrown by when we try to
	        // access to non available segments. Reinject this error
	        // into the main buffer observable so that it can be treated
	        // upstream
	        if (err instanceof OutOfIndexError) {
	          outOfIndexStream.next({ type: "out-of-index", value: err });
	          return empty();
	        } else {
	          throw err;
	        }

	        // unreachable
	        assert(false);
	      }

	      // queue all segments injected in the observable
	      for (var i = 0; i < injectedSegments.length; i++) {
	        queuedSegments.add(injectedSegments[i].getId());
	      }

	      return injectedSegments;
	    }

	    function doUnqueueAndUpdateRanges(pipelineData) {
	      var segment = pipelineData.segment;
	      var parsed = pipelineData.parsed;

	      queuedSegments.remove(segment.getId());

	      // change the timescale if one has been extracted from the
	      // parsed segment (SegmentBase)
	      var timescale = parsed.timescale;
	      if (timescale) {
	        segmentIndex.setTimescale(timescale);
	      }

	      var nextSegments = parsed.nextSegments;
	      var currentSegment = parsed.currentSegment;
	      // added segments are values parsed from the segment metadata
	      // that should be added to the segmentIndex.

	      var addedSegments = undefined;
	      if (nextSegments) {
	        addedSegments = segmentIndex.insertNewSegments(nextSegments, currentSegment);
	      } else {
	        addedSegments = [];
	      }

	      // current segment timings informations are used to update
	      // ranges informations
	      if (currentSegment) {
	        ranges.insert(representation.bitrate, segmentIndex.scale(currentSegment.ts), segmentIndex.scale(currentSegment.ts + currentSegment.d));
	      }

	      return {
	        type: "pipeline",
	        value: _extends({ bufferType: bufferType, addedSegments: addedSegments }, pipelineData)
	      };
	    }

	    var segmentsPipeline = combineLatest(timings, bufferSizes, mutedUpdateEnd).flatMap(doInjectSegments).concatMap(function (segment) {
	      return pipeline({ segment: segment });
	    }).concatMap(doAppendBufferOrGC, doUnqueueAndUpdateRanges);

	    return merge(segmentsPipeline, outOfIndexStream).catch(function (err) {
	      if (err.code !== 412) {
	        throw err;
	      }

	      // 412 Precondition Failed request errors do not cause the
	      // buffer to stop but are re-emitted in the stream as
	      // "precondition-failed" type. They should be handled re-
	      // adapting the live-gap that the player is holding
	      return Observable.of({ type: "precondition-failed", value: err }).concat(timer(2000)).concat(createRepresentationBuffer(representation));
	    }).startWith({
	      type: "buffer",
	      value: { bufferType: bufferType, adaptation: adaptation, representation: representation }
	    });
	  }

	  return combineLatest(representations, seekings, function (rep) {
	    return rep;
	  }).switchMap(createRepresentationBuffer);
	}

	function EmptyBuffer(bufferType) {
	  return Observable.of({
	    type: "buffer",
	    value: {
	      bufferType: bufferType,
	      adaptation: null,
	      representation: null
	    }
	  });
	}

	module.exports = {
	  Buffer: Buffer,
	  EmptyBuffer: EmptyBuffer
	};

/***/ },
/* 347 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Caching object used to cache initialization segments.
	 * This allow to have a faster representation switch and seeking.
	 */

	var InitializationSegmentCache = function () {
	  function InitializationSegmentCache() {
	    _classCallCheck(this, InitializationSegmentCache);

	    this.cache = {};
	  }

	  InitializationSegmentCache.prototype.add = function add(_ref, response) {
	    var segment = _ref.segment;

	    if (segment.isInitSegment()) {
	      this.cache[segment.getId()] = response;
	    }
	  };

	  InitializationSegmentCache.prototype.get = function get(_ref2) {
	    var segment = _ref2.segment;

	    if (segment.isInitSegment()) {
	      var value = this.cache[segment.getId()];
	      if (value != null) {
	        return value;
	      }
	    }
	    return null;
	  };

	  return InitializationSegmentCache;
	}();

	module.exports = {
	  InitializationSegmentCache: InitializationSegmentCache
	};

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var merge = Observable.merge;
	var interval = Observable.interval;

	var _require2 = __webpack_require__(20);

	var visibilityChange = _require2.visibilityChange;
	var videoSizeChange = _require2.videoSizeChange;


	var INACTIVITY_DELAY = 60 * 1000;

	var pixelRatio = window.devicePixelRatio || 1;

	function DeviceEvents(videoElement) {
	  var isVisible = visibilityChange().filter(function (x) {
	    return x === false;
	  });

	  var isHidden = visibilityChange().debounceTime(INACTIVITY_DELAY).filter(function (x) {
	    return x === true;
	  });

	  var inBackground = merge(isVisible, isHidden).startWith(false);

	  var videoWidth = merge(interval(20000), videoSizeChange().debounceTime(500)).startWith("init").map(function () {
	    return videoElement.clientWidth * pixelRatio;
	  }).distinctUntilChanged();

	  return {
	    videoWidth: videoWidth,
	    inBackground: inBackground
	  };
	}

	module.exports = DeviceEvents;

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var Timeline = __webpack_require__(94);

	var Base = function (_Timeline) {
	  _inherits(Base, _Timeline);

	  function Base(index) {
	    _classCallCheck(this, Base);

	    return _possibleConstructorReturn(this, _Timeline.call(this, index));
	  }

	  Base.getLiveEdge = function getLiveEdge() {
	    throw new Error("not implemented");
	  };

	  Base.prototype.addSegment = function addSegment(newSegment) {
	    this.index.timeline.push(newSegment);
	    return true;
	  };

	  return Base;
	}(Timeline);

	module.exports = Base;

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(33);

	var Segment = _require.Segment;

	var List = function () {
	  function List(adaptation, representation, index) {
	    _classCallCheck(this, List);

	    this.adaptation = adaptation;
	    this.representation = representation;
	    this.index = index;
	  }

	  List.getLiveEdge = function getLiveEdge() {
	    throw new Error("not implemented");
	  };

	  List.prototype.checkRange = function checkRange(up) {
	    var _index = this.index;
	    var duration = _index.duration;
	    var list = _index.list;

	    var i = Math.floor(up / duration);
	    return i >= 0 && i < list.length;
	  };

	  List.prototype.createSegment = function createSegment(segmentIndex, time) {
	    var adaptation = this.adaptation;
	    var representation = this.representation;
	    var _index2 = this.index;
	    var duration = _index2.duration;
	    var list = _index2.list;


	    var segment = list[segmentIndex];

	    return Segment.create(adaptation, /* adaptation */
	    representation, /* representation */
	    segmentIndex, /* id */
	    segment.media, /* media */
	    time, /* time */
	    duration, /* duration */
	    0, /* number */
	    segment.range, /* range */
	    null, /* indexRange */
	    false /* init */
	    );
	  };

	  List.prototype.getSegments = function getSegments(up, to) {
	    // TODO(pierre): use startNumber
	    var duration = this.index.duration;

	    var l = Math.floor(to / duration);
	    var segments = [];
	    var i = Math.floor(up / duration);
	    while (i < l) {
	      segments.push(this.createSegment(i, i * duration));
	      i++;
	    }
	    return segments;
	  };

	  List.prototype.addSegment = function addSegment() {
	    return false;
	  };

	  return List;
	}();

	module.exports = List;

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(33);

	var Segment = _require.Segment;

	var Template = function () {
	  function Template(adaptation, representation, index) {
	    _classCallCheck(this, Template);

	    this.adaptation = adaptation;
	    this.representation = representation;
	    this.index = index;
	  }

	  Template.getLiveEdge = function getLiveEdge(videoIndex, manifest) {
	    return Date.now() / 1000 - manifest.availabilityStartTime - manifest.suggestedPresentationDelay;
	  };

	  Template.prototype.checkRange = function checkRange() {
	    return true;
	  };

	  Template.prototype.createSegment = function createSegment(ts) {
	    var adaptation = this.adaptation;
	    var representation = this.representation;
	    var _index = this.index;
	    var startNumber = _index.startNumber;
	    var duration = _index.duration;


	    var number = Math.floor(ts / duration) + (startNumber == null ? 1 : startNumber);
	    var time = number * duration;

	    return Segment.create(adaptation, /* adaptation */
	    representation, /* representation */
	    number, /* id */
	    this.index.media, /* media */
	    time, /* time */
	    this.index.duration, /* duration */
	    number, /* number */
	    null, /* range */
	    null, /* indexRange */
	    false /* init */
	    );
	  };

	  Template.prototype.getSegments = function getSegments(up, to) {
	    var duration = this.index.duration;


	    var segments = [];
	    for (var time = up; time <= to; time += duration) {
	      segments.push(this.createSegment(time));
	    }

	    return segments;
	  };

	  Template.prototype.addSegment = function addSegment() {
	    return false;
	  };

	  return Template;
	}();

	module.exports = Template;

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var defaults = __webpack_require__(30);

	var _require = __webpack_require__(8);

	var Subject = _require.Subject;
	var Scheduler = _require.Scheduler;
	var Observable = _require.Observable;

	var _require2 = __webpack_require__(371);

	var retryWithBackoff = _require2.retryWithBackoff;


	var timeoutError = new Error("timeout");

	function isObservable(val) {
	  return !!val && typeof val.subscribe == "function";
	}

	var noCache = {
	  add: function add() {},
	  get: function get() {
	    return null;
	  }
	};

	var metricsScheduler = Scheduler.asap;

	/**
	 * Creates the following pipeline:
	 *   Infos
	 *      => [resolver] Infos -> ResolvedInfos
	 *      => [loader]   ResolvedInfos -> Response
	 *      => [parser]   (Response, ResolvedInfos) -> ParsedInfos
	 *      => { ...ResolvedInfos, ...ParsedInfos }
	 *
	 * TODO(pierre): create a pipeline patcher to work over a WebWorker
	 */
	function createPipeline(type, _ref, metrics) {
	  var resolver = _ref.resolver;
	  var loader = _ref.loader;
	  var parser = _ref.parser;
	  var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];


	  if (!parser) {
	    parser = Observable.of;
	  }
	  if (!loader) {
	    loader = Observable.of;
	  }
	  if (!resolver) {
	    resolver = Observable.of;
	  }

	  var _defaults = defaults(opts, {
	    totalRetry: 3,
	    timeout: 10 * 1000,
	    cache: noCache
	  });

	  var totalRetry = _defaults.totalRetry;
	  var timeout = _defaults.timeout;
	  var cache = _defaults.cache;


	  var backoffOptions = {
	    retryDelay: 500,
	    totalRetry: totalRetry,
	    shouldRetry: function shouldRetry(err) {
	      return err.code >= 500 || err.code < 200 || /timeout/.test(err.message) || /request: error event/.test(err.message);
	    }
	  };

	  function dispatchMetrics(value) {
	    metrics.next(value);
	  }

	  function schedulMetrics(value) {
	    metricsScheduler.schedule(dispatchMetrics, 0, value);
	  }

	  function loaderWithRetry(resolvedInfos) {
	    return retryWithBackoff(loader(resolvedInfos).timeout(timeout, timeoutError), backoffOptions);
	  }

	  function cacheOrLoader(resolvedInfos) {
	    var fromCache = cache.get(resolvedInfos);
	    if (fromCache === null) {
	      return loaderWithRetry(resolvedInfos);
	    } else if (isObservable(fromCache)) {
	      return fromCache.catch(function () {
	        return loaderWithRetry(resolvedInfos);
	      });
	    } else {
	      return Observable.of(fromCache);
	    }
	  }

	  function extendsResponseAndResolvedInfos(resolvedInfos, response) {
	    var loadedInfos = _extends({ response: response }, resolvedInfos);

	    // add loadedInfos to the pipeline cache and emits its value in
	    // the metrics observer.
	    cache.add(resolvedInfos, response);
	    schedulMetrics({ type: type, value: loadedInfos });

	    return loadedInfos;
	  }

	  function extendsParsedAndLoadedInfos(loadedInfos, parsed) {
	    return _extends({ parsed: parsed }, loadedInfos);
	  }

	  return function (data) {
	    return resolver(data).flatMap(cacheOrLoader, extendsResponseAndResolvedInfos).flatMap(parser, extendsParsedAndLoadedInfos);
	  };
	}

	function PipeLines() {
	  // the metrics observer/observable is used to calculate informations
	  // about loaded responsed in the loader part of pipelines
	  var metrics = new Subject();

	  var createPipelines = function createPipelines(transport) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var pipelines = {
	      requiresMediaSource: function requiresMediaSource() {
	        return transport.directFile !== true;
	      }
	    };

	    for (var pipelineType in transport) {
	      pipelines[pipelineType] = createPipeline(pipelineType, transport[pipelineType], metrics, options[pipelineType]);
	    }

	    return pipelines;
	  };

	  return { createPipelines: createPipelines, metrics: metrics };
	}

	module.exports = PipeLines;

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var log = __webpack_require__(13);
	var defaults = __webpack_require__(30);

	var _require = __webpack_require__(8);

	var Subscription = _require.Subscription;
	var BehaviorSubject = _require.BehaviorSubject;
	var Observable = _require.Observable;
	var Subject = _require.Subject;
	var combineLatest = Observable.combineLatest;

	var _require2 = __webpack_require__(21);

	var on = _require2.on;

	var EventEmitter = __webpack_require__(41);
	var debugPane = __webpack_require__(369);
	var assert = __webpack_require__(7);

	var _require3 = __webpack_require__(20);

	var HTMLVideoElement_ = _require3.HTMLVideoElement_;
	var exitFullscreen = _require3.exitFullscreen;
	var requestFullscreen = _require3.requestFullscreen;
	var _isFullscreen = _require3.isFullscreen;
	var onFullscreenChange = _require3.onFullscreenChange;

	var _require4 = __webpack_require__(95);

	var getEmptyTimings = _require4.getEmptyTimings;
	var timingsSampler = _require4.timingsSampler;
	var toWallClockTime = _require4.toWallClockTime;
	var fromWallClockTime = _require4.fromWallClockTime;
	var getLiveGap = _require4.getLiveGap;

	var _require5 = __webpack_require__(347);

	var InitializationSegmentCache = _require5.InitializationSegmentCache;

	var _require6 = __webpack_require__(32);

	var BufferedRanges = _require6.BufferedRanges;

	var _require7 = __webpack_require__(357);

	var parseTimeFragment = _require7.parseTimeFragment;

	var DeviceEvents = __webpack_require__(348);
	var manifestHelpers = __webpack_require__(53);
	// TODO(pierre): separate transports from main build
	var Transports = __webpack_require__(362);
	var PipeLines = __webpack_require__(352);
	var Adaptive = __webpack_require__(345);
	var Stream = __webpack_require__(355);
	var EME = __webpack_require__(92);

	var PLAYER_STOPPED = "STOPPED";
	var PLAYER_LOADED = "LOADED";
	var PLAYER_LOADING = "LOADING";
	var PLAYER_PLAYING = "PLAYING";
	var PLAYER_PAUSED = "PAUSED";
	var PLAYER_ENDED = "ENDED";
	var PLAYER_BUFFERING = "BUFFERING";
	var PLAYER_SEEKING = "SEEKING";

	function calcPlayerState(isPlaying, stalled) {
	  if (stalled) {
	    return stalled.name == "seeking" ? PLAYER_SEEKING : PLAYER_BUFFERING;
	  }

	  if (isPlaying) {
	    return PLAYER_PLAYING;
	  }

	  return PLAYER_PAUSED;
	}

	function noop() {}

	function assertMan(player) {
	  assert(player.man, "player: no manifest loaded");
	}

	function filterStreamByType(stream, type) {
	  return stream.filter(function (o) {
	    return o.type == type;
	  }).map(function (o) {
	    return o.value;
	  });
	}

	var Player = function (_EventEmitter) {
	  _inherits(Player, _EventEmitter);

	  function Player(options) {
	    _classCallCheck(this, Player);

	    var videoElement = options.videoElement;
	    var transport = options.transport;
	    var transportOptions = options.transportOptions;
	    var defaultLanguage = options.defaultLanguage;
	    var defaultSubtitle = options.defaultSubtitle;
	    var initVideoBitrate = options.initVideoBitrate;
	    var initAudioBitrate = options.initAudioBitrate;

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.defaultTransport = transport;
	    _this.defaultTransportOptions = transportOptions || {};

	    if (!videoElement) {
	      videoElement = document.createElement("video");
	    }

	    assert(videoElement instanceof HTMLVideoElement_, "requires an actual HTMLVideoElement");

	    // Workaroud to support Firefox autoplay on FF 42.
	    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1194624
	    videoElement.preload = "auto";

	    _this.version = ("2.0.0-alpha2");
	    _this.video = videoElement;

	    // fullscreen change
	    _this.fullscreen = onFullscreenChange(videoElement).subscribe(function () {
	      return _this.trigger("fullscreenChange", _this.isFullscreen());
	    });

	    // playing state change
	    _this.playing = new BehaviorSubject();

	    // multicaster forwarding all streams events
	    _this.stream = new Subject();

	    var _PipeLines = PipeLines();

	    var createPipelines = _PipeLines.createPipelines;
	    var metrics = _PipeLines.metrics;


	    var timings = timingsSampler(videoElement);
	    var deviceEvents = DeviceEvents(videoElement);

	    _this.createPipelines = createPipelines;
	    _this.metrics = metrics;
	    _this.timings = timings;

	    _this.adaptive = Adaptive(metrics, timings, deviceEvents, {
	      initVideoBitrate: initVideoBitrate,
	      initAudioBitrate: initAudioBitrate,
	      defaultLanguage: defaultLanguage,
	      defaultSubtitle: defaultSubtitle
	    });

	    // volume muted memory
	    _this.muted = 0.1;

	    // states
	    _this._setPlayerState(PLAYER_STOPPED);
	    _this._resetStates();

	    _this.log = log;
	    return _this;
	  }

	  Player.prototype._resetStates = function _resetStates() {
	    this.man = null;
	    this.reps = { video: null, audio: null, text: null };
	    this.adas = { video: null, audio: null, text: null };
	    this.evts = {};
	    this.frag = { start: null, end: null };
	  };

	  Player.prototype._unsubscribe = function _unsubscribe() {
	    if (this.subscriptions) {
	      this.subscriptions.unsubscribe();
	      this.subscriptions = null;
	    }
	  };

	  Player.prototype.stop = function stop() {
	    if (this.state !== PLAYER_STOPPED) {
	      this._resetStates();
	      this._unsubscribe();
	      this._setPlayerState(PLAYER_STOPPED);
	    }
	  };

	  Player.prototype.dispose = function dispose() {
	    this.stop();
	    this.metrics.unsubscribe();
	    this.adaptive.unsubscribe();
	    this.fullscreen.unsubscribe();
	    this.stream.unsubscribe();

	    this.metrics = null;
	    this.adaptive = null;
	    this.fullscreen = null;
	    this.stream = null;

	    this.timings = null;
	    this.createPipelines = null;
	    this.video = null;
	  };

	  Player.prototype._recordState = function _recordState(type, value) {
	    var prev = this.evts[type];
	    if (prev !== value) {
	      this.evts[type] = value;
	      this.trigger(type + "Change", value);
	    }
	  };

	  Player.prototype._parseOptions = function _parseOptions(opts) {
	    opts = defaults(_extends({}, opts), {
	      transport: this.defaultTransport,
	      transportOptions: {},
	      keySystems: [],
	      timeFragment: {},
	      subtitles: [],
	      autoPlay: false,
	      directFile: false
	    });

	    var _opts = opts;
	    var transport = _opts.transport;
	    var url = _opts.url;
	    var keySystems = _opts.keySystems;
	    var timeFragment = _opts.timeFragment;
	    var subtitles = _opts.subtitles;
	    var _opts2 = opts;
	    var transportOptions = _opts2.transportOptions;
	    var manifests = _opts2.manifests;
	    var autoPlay = _opts2.autoPlay;
	    var directFile = _opts2.directFile;


	    timeFragment = parseTimeFragment(timeFragment);

	    // compatibility with directFile api
	    if (directFile) {
	      transport = "directfile";
	    }

	    // compatibility with old API authorizing to pass multiple
	    // manifest url depending on the key system
	    assert(!!manifests ^ !!url, "player: you have to pass either a url or a list of manifests");
	    if (manifests) {
	      var firstManifest = manifests[0];
	      url = firstManifest.url;
	      subtitles = firstManifest.subtitles || [];
	      keySystems = manifests.map(function (man) {
	        return man.keySystem;
	      }).filter(Boolean);
	    }

	    if (typeof transport == "string") {
	      transport = Transports[transport];
	    }

	    if (typeof transport == "function") {
	      transport = transport(defaults(transportOptions, this.defaultTransportOptions));
	    }

	    assert(transport, "player: transport " + opts.transport + " is not supported");

	    return {
	      url: url,
	      keySystems: keySystems,
	      subtitles: subtitles,
	      timeFragment: timeFragment,
	      autoPlay: autoPlay,
	      transport: transport
	    };
	  };

	  Player.prototype.loadVideo = function loadVideo() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    options = this._parseOptions(options);
	    log.info("loadvideo", options);

	    var _options = options;
	    var url = _options.url;
	    var keySystems = _options.keySystems;
	    var subtitles = _options.subtitles;
	    var timeFragment = _options.timeFragment;
	    var autoPlay = _options.autoPlay;
	    var transport = _options.transport;


	    this.stop();
	    this.frag = timeFragment;
	    this.playing.next(autoPlay);

	    var pipelines = this.createPipelines(transport, {
	      audio: { cache: new InitializationSegmentCache() },
	      video: { cache: new InitializationSegmentCache() }
	    });

	    var adaptive = this.adaptive;
	    var timings = this.timings;
	    var videoElement = this.video;

	    var stream = Stream({
	      url: url,
	      keySystems: keySystems,
	      subtitles: subtitles,
	      timings: timings,
	      timeFragment: timeFragment,
	      adaptive: adaptive,
	      pipelines: pipelines,
	      videoElement: videoElement,
	      autoPlay: autoPlay
	    }).publish();

	    var stalled = filterStreamByType(stream, "stalled").startWith(null);
	    var loaded = filterStreamByType(stream, "loaded").take(1).share();

	    var stateChanges = loaded.mapTo(PLAYER_LOADED).concat(combineLatest(this.playing, stalled, calcPlayerState)).distinctUntilChanged().startWith(PLAYER_LOADING);

	    var playChanges = on(videoElement, ["play", "pause"]);

	    var subs = this.subscriptions = new Subscription();
	    subs.add(playChanges.subscribe(this._playPauseNext.bind(this), noop));
	    subs.add(stateChanges.subscribe(this._setPlayerState.bind(this), noop));
	    subs.add(timings.subscribe(this._triggerTimeChange.bind(this), noop));
	    subs.add(stream.subscribe(this._streamNext.bind(this), this._streamError.bind(this), this._streamComplete.bind(this)));
	    subs.add(stream.connect());

	    // _unsubscribe may have been called synchronously on early disposable
	    if (!this.subscriptions) {
	      subs.unsubscribe();
	    } else {
	      this._triggerTimeChange();
	    }

	    return loaded;
	  };

	  Player.prototype._streamNext = function _streamNext(streamInfos) {
	    var type = streamInfos.type;
	    var value = streamInfos.value;


	    if (type == "buffer") {
	      this._bufferNext(value);
	    }
	    if (type == "manifest") {
	      this._manifestNext(value);
	    }
	    if (type == "pipeline") {
	      this.trigger("progress", value.segment);
	    }

	    this.stream.next(streamInfos);
	  };

	  Player.prototype._streamError = function _streamError(error) {
	    this._resetStates();
	    this.trigger("error", error);
	    this._setPlayerState(PLAYER_STOPPED);
	    this._unsubscribe();
	    this.stream.next({ type: "error", value: error });
	  };

	  Player.prototype._streamComplete = function _streamComplete() {
	    this._resetStates();
	    this._setPlayerState(PLAYER_ENDED);
	    this._unsubscribe();
	    this.stream.next({ type: "ended", value: null });
	  };

	  Player.prototype._manifestNext = function _manifestNext(manifest) {
	    this.man = manifest;
	    this.trigger("manifestChange", manifest);
	  };

	  Player.prototype._bufferNext = function _bufferNext(_ref) {
	    var bufferType = _ref.bufferType;
	    var adaptation = _ref.adaptation;
	    var representation = _ref.representation;

	    this.reps[bufferType] = representation;
	    this.adas[bufferType] = adaptation;

	    if (bufferType == "text") {
	      this._recordState("subtitle", adaptation && adaptation.lang || "");
	    }

	    if (bufferType == "video") {
	      this._recordState("videoBitrate", representation && representation.bitrate || -1);
	    }

	    if (bufferType == "audio") {
	      this._recordState("language", adaptation && adaptation.lang || "");
	      this._recordState("audioBitrate", representation && representation.bitrate || -1);
	    }
	  };

	  Player.prototype._playPauseNext = function _playPauseNext(evt) {
	    this.playing.next(evt.type == "play");
	  };

	  Player.prototype._setPlayerState = function _setPlayerState(s) {
	    if (this.state !== s) {
	      this.state = s;
	      log.info("playerStateChange", s);
	      this.trigger("playerStateChange", s);
	    }
	  };

	  Player.prototype._triggerTimeChange = function _triggerTimeChange(t) {
	    if (!this.man || !t) {
	      this.trigger("currentTimeChange", getEmptyTimings());
	    } else {
	      if (this.man.isLive && t.ts > 0) {
	        t.wallClockTime = toWallClockTime(t.ts, this.man);
	        t.liveGap = getLiveGap(t.ts, this.man);
	      }
	      this.trigger("currentTimeChange", t);
	    }
	  };

	  Player.prototype.getManifest = function getManifest() {
	    return this.man;
	  };

	  Player.prototype.getVideoElement = function getVideoElement() {
	    return this.video;
	  };

	  Player.prototype.getNativeTextTrack = function getNativeTextTrack() {
	    var textTracks = this.video.textTracks;
	    if (textTracks.length > 0) {
	      return this.video.textTracks[0];
	    } else {
	      return null;
	    }
	  };

	  Player.prototype.getPlayerState = function getPlayerState() {
	    return this.state;
	  };

	  Player.prototype.isLive = function isLive() {
	    assertMan(this);
	    return this.man.isLive;
	  };

	  Player.prototype.getUrl = function getUrl() {
	    assertMan(this);
	    return this.man.locations[0];
	  };

	  Player.prototype.getVideoDuration = function getVideoDuration() {
	    return this.video.duration;
	  };

	  Player.prototype.getVideoLoadedTime = function getVideoLoadedTime() {
	    return new BufferedRanges(this.video.buffered).getSize(this.video.currentTime);
	  };

	  Player.prototype.getVideoPlayedTime = function getVideoPlayedTime() {
	    return new BufferedRanges(this.video.buffered).getLoaded(this.video.currentTime);
	  };

	  Player.prototype.getCurrentTime = function getCurrentTime() {
	    if (!this.man) {
	      return 0;
	    }

	    var ct = this.video.currentTime;
	    if (this.man.isLive) {
	      return toWallClockTime(ct, this.man);
	    } else {
	      return ct;
	    }
	  };

	  Player.prototype.getStartTime = function getStartTime() {
	    return this.frag.start;
	  };

	  Player.prototype.getEndTime = function getEndTime() {
	    return this.frag.end;
	  };

	  Player.prototype.getPlaybackRate = function getPlaybackRate() {
	    return this.video.playbackRate;
	  };

	  Player.prototype.getVolume = function getVolume() {
	    return this.video.volume;
	  };

	  Player.prototype.isFullscreen = function isFullscreen() {
	    return _isFullscreen();
	  };

	  Player.prototype.getAvailableLanguages = function getAvailableLanguages() {
	    return this.man && manifestHelpers.getAvailableLanguages(this.man) || [];
	  };

	  Player.prototype.getAvailableSubtitles = function getAvailableSubtitles() {
	    return this.man && manifestHelpers.getAvailableSubtitles(this.man) || [];
	  };

	  Player.prototype.getLanguage = function getLanguage() {
	    return this.adaptive.getLanguage();
	  };

	  Player.prototype.getSubtitle = function getSubtitle() {
	    return this.adaptive.getSubtitle();
	  };

	  Player.prototype.getAvailableVideoBitrates = function getAvailableVideoBitrates() {
	    var video = manifestHelpers.getAdaptationsByType(this.man, "video");
	    return video[0] && video[0].bitrates.slice() || [];
	  };

	  Player.prototype.getAvailableAudioBitrates = function getAvailableAudioBitrates() {
	    var audio = this.adas.audio;
	    return audio && audio.bitrates.slice() || [];
	  };

	  Player.prototype.getVideoBitrate = function getVideoBitrate() {
	    return this.evts.videoBitrate;
	  };

	  Player.prototype.getAudioBitrate = function getAudioBitrate() {
	    return this.evts.audioBitrate;
	  };

	  Player.prototype.getVideoMaxBitrate = function getVideoMaxBitrate() {
	    return this.adaptive.getVideoMaxBitrate();
	  };

	  Player.prototype.getAudioMaxBitrate = function getAudioMaxBitrate() {
	    return this.adaptive.getAudioMaxBitrate();
	  };

	  Player.prototype.getVideoBufferSize = function getVideoBufferSize() {
	    return this.adaptive.getVideoBufferSize();
	  };

	  Player.prototype.getAudioBufferSize = function getAudioBufferSize() {
	    return this.adaptive.getAudioBufferSize();
	  };

	  Player.prototype.getAverageBitrates = function getAverageBitrates() {
	    return this.adaptive.getAverageBitrates();
	  };

	  Player.prototype.getMetrics = function getMetrics() {
	    return this.metrics;
	  };

	  Player.prototype.getTimings = function getTimings() {
	    return this.timings;
	  };

	  Player.prototype.play = function play() {
	    this.video.play();
	  };

	  Player.prototype.pause = function pause() {
	    this.video.pause();
	  };

	  Player.prototype.setPlaybackRate = function setPlaybackRate(rate) {
	    this.video.playbackRate = rate;
	  };

	  Player.prototype.goToStart = function goToStart() {
	    return this.seekTo(this.getStartTime());
	  };

	  Player.prototype.seekTo = function seekTo(time) {
	    assert(this.man);
	    var currentTs = this.video.currentTime;
	    if (this.man.isLive) {
	      time = fromWallClockTime(time, this.man);
	    }
	    if (time !== currentTs) {
	      log.info("seek to", time);
	      return this.video.currentTime = time;
	    } else {
	      return currentTs;
	    }
	  };

	  Player.prototype.setFullscreen = function setFullscreen() {
	    var toggle = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	    if (toggle === false) {
	      exitFullscreen();
	    } else {
	      requestFullscreen(this.video);
	    }
	  };

	  Player.prototype.setVolume = function setVolume(volume) {
	    if (volume !== this.video.volume) {
	      this.video.volume = volume;
	      this.trigger("volumeChange", volume);
	    }
	  };

	  Player.prototype.mute = function mute() {
	    this.muted = this.getVolume() || 0.1;
	    this.setVolume(0);
	  };

	  Player.prototype.unMute = function unMute() {
	    var vol = this.getVolume();
	    if (vol === 0) {
	      this.setVolume(this.muted);
	    }
	  };

	  Player.prototype.setLanguage = function setLanguage(lng) {
	    assert(this.getAvailableLanguages().indexOf(lng) >= 0, "player: unknown language");
	    this.adaptive.setLanguage(lng);
	  };

	  Player.prototype.setSubtitle = function setSubtitle(sub) {
	    assert(!sub || this.getAvailableSubtitles().indexOf(sub) >= 0, "player: unknown subtitle");
	    this.adaptive.setSubtitle(sub || "");
	    if (!sub) {
	      this._recordState("subtitle", "");
	    }
	  };

	  Player.prototype.setVideoBitrate = function setVideoBitrate(btr) {
	    assert(btr === 0 || this.getAvailableVideoBitrates().indexOf(btr) >= 0, "player: video bitrate unavailable");
	    this.adaptive.setVideoBitrate(btr);
	  };

	  Player.prototype.setAudioBitrate = function setAudioBitrate(btr) {
	    assert(btr === 0 || this.getAvailableAudioBitrates().indexOf(btr) >= 0, "player: audio bitrate unavailable");
	    this.adaptive.setAudioBitrate(btr);
	  };

	  Player.prototype.setVideoMaxBitrate = function setVideoMaxBitrate(btr) {
	    this.adaptive.setVideoMaxBitrate(btr);
	  };

	  Player.prototype.setAudioMaxBitrate = function setAudioMaxBitrate(btr) {
	    this.adaptive.setAudioMaxBitrate(btr);
	  };

	  Player.prototype.setVideoBufferSize = function setVideoBufferSize(size) {
	    this.adaptive.setVideoBufferSize(size);
	  };

	  Player.prototype.setAudioBufferSize = function setAudioBufferSize(size) {
	    this.adaptive.setAudioBufferSize(size);
	  };

	  Player.prototype.asObservable = function asObservable() {
	    return this.stream;
	  };

	  Player.prototype.getDebug = function getDebug() {
	    return debugPane.getDebug(this);
	  };

	  Player.prototype.showDebug = function showDebug() {
	    debugPane.showDebug(this, this.video);
	  };

	  Player.prototype.hideDebug = function hideDebug() {
	    debugPane.hideDebug();
	  };

	  Player.prototype.toggleDebug = function toggleDebug() {
	    debugPane.toggleDebug(this, this.video);
	  };

	  Player.prototype.getCurrentKeySystem = function getCurrentKeySystem() {
	    return EME.getCurrentKeySystem();
	  };

	  return Player;
	}(EventEmitter);

	module.exports = Player;

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EventEmitter = __webpack_require__(41);

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var Scheduler = _require.Scheduler;

	var _require2 = __webpack_require__(32);

	var BufferedRanges = _require2.BufferedRanges;

	var assert = __webpack_require__(7);

	var AbstractSourceBuffer = function (_EventEmitter) {
	  _inherits(AbstractSourceBuffer, _EventEmitter);

	  function AbstractSourceBuffer(codec) {
	    _classCallCheck(this, AbstractSourceBuffer);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.codec = codec;
	    _this.updating = false;
	    _this.readyState = "opened";
	    _this.buffered = new BufferedRanges();
	    return _this;
	  }

	  AbstractSourceBuffer.prototype.appendBuffer = function appendBuffer(data) {
	    var _this2 = this;

	    this._lock(function () {
	      return _this2._append(data);
	    });
	  };

	  AbstractSourceBuffer.prototype.remove = function remove(from, to) {
	    var _this3 = this;

	    this._lock(function () {
	      return _this3._remove(from, to);
	    });
	  };

	  AbstractSourceBuffer.prototype.abort = function abort() {
	    this.remove(0, Infinity);
	    this.updating = false;
	    this.readyState = "closed";
	    this._abort();
	  };

	  AbstractSourceBuffer.prototype._append = function _append() /* data */{};

	  AbstractSourceBuffer.prototype._remove = function _remove() /* from, to */{};

	  AbstractSourceBuffer.prototype._abort = function _abort() {};

	  AbstractSourceBuffer.prototype._lock = function _lock(func) {
	    var _this4 = this;

	    assert(!this.updating, "text-buffer: cannot remove while updating");
	    this.updating = true;
	    this.trigger("updatestart");
	    var result = func();

	    if (!(result && result.subscribe == "function")) {
	      result = Observable.of(result);
	    }

	    result.subscribeOn(Scheduler.asap).subscribe(function () {
	      return _this4._unlock("update");
	    }, function (e) {
	      return _this4._unlock("error", e);
	    });
	  };

	  AbstractSourceBuffer.prototype._unlock = function _unlock(eventName, value) {
	    this.trigger(eventName, value);
	    this.updating = false;
	    this.trigger("updateend");
	  };

	  return AbstractSourceBuffer;
	}(EventEmitter);

	module.exports = AbstractSourceBuffer;

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var log = __webpack_require__(13);
	var assert = __webpack_require__(7);

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;

	var _require2 = __webpack_require__(21);

	var first = _require2.first;
	var on = _require2.on;

	var _require3 = __webpack_require__(95);

	var getLiveGap = _require3.getLiveGap;
	var seekingsSampler = _require3.seekingsSampler;
	var fromWallClockTime = _require3.fromWallClockTime;

	var _require4 = __webpack_require__(21);

	var retryWithBackoff = _require4.retryWithBackoff;
	var empty = Observable.empty;
	var merge = Observable.merge;
	var combineLatest = Observable.combineLatest;

	var min = Math.min;

	var _require5 = __webpack_require__(20);

	var MediaSource_ = _require5.MediaSource_;
	var sourceOpen = _require5.sourceOpen;
	var canPlay = _require5.canPlay;
	var canSeek = _require5.canSeek;
	var clearVideoSrc = _require5.clearVideoSrc;


	var TextSourceBuffer = __webpack_require__(356);

	var _require6 = __webpack_require__(93);

	var getLiveEdge = _require6.getLiveEdge;

	var _require7 = __webpack_require__(33);

	var clearSegmentCache = _require7.clearSegmentCache;

	var _require8 = __webpack_require__(346);

	var Buffer = _require8.Buffer;
	var EmptyBuffer = _require8.EmptyBuffer;

	var EME = __webpack_require__(92);

	var _require9 = __webpack_require__(53);

	var normalizeManifest = _require9.normalizeManifest;
	var mergeManifestsIndex = _require9.mergeManifestsIndex;
	var mutateManifestLiveGap = _require9.mutateManifestLiveGap;
	var getAdaptations = _require9.getAdaptations;


	var END_OF_PLAY = 0.2;

	var RETRY_OPTIONS = {
	  retryDelay: 3,
	  totalRetry: 250,
	  resetDelay: 60 * 1000,
	  shouldRetry: shouldRetry
	};

	// discontinuity threshold in seconds
	var DISCONTINUITY_THRESHOLD = 1;

	function isNativeBuffer(bufferType) {
	  return bufferType == "audio" || bufferType == "video";
	}

	function shouldRetry(err, tryCount) {
	  if (/MEDIA_ERR/.test(err.message)) {
	    return false;
	  } else {
	    log.warn("stream retry", err, tryCount);
	    return true;
	  }
	}

	function Stream(_ref) {
	  var url = _ref.url;
	  var keySystems = _ref.keySystems;
	  var subtitles = _ref.subtitles;
	  var timings = _ref.timings;
	  var timeFragment = _ref.timeFragment;
	  var adaptive = _ref.adaptive;
	  var pipelines = _ref.pipelines;
	  var videoElement = _ref.videoElement;
	  var autoPlay = _ref.autoPlay;


	  clearSegmentCache();

	  var fragStartTime = timeFragment.start;
	  var fragEndTimeIsFinite = fragEndTime < Infinity;
	  var fragEndTime = timeFragment.end;

	  var manifestPipeline = pipelines.manifest;

	  var nativeBuffers = {};
	  var customBuffers = {};

	  function createSourceBuffer(video, mediaSource, bufferInfos) {
	    var type = bufferInfos.type;
	    var codec = bufferInfos.codec;


	    var sourceBuffer = undefined;

	    if (isNativeBuffer(type)) {

	      if (nativeBuffers[type]) {
	        sourceBuffer = nativeBuffers[type];
	      } else {
	        log.info("add sourcebuffer", codec);
	        sourceBuffer = mediaSource.addSourceBuffer(codec);
	        nativeBuffers[type] = sourceBuffer;
	      }
	    } else {

	      var oldSourceBuffer = customBuffers[type];
	      if (oldSourceBuffer) {
	        try {
	          oldSourceBuffer.abort();
	        } catch (e) {
	          log.warn(e);
	        } finally {
	          delete customBuffers[type];
	        }
	      }

	      if (type == "text") {
	        log.info("add text sourcebuffer", codec);
	        sourceBuffer = new TextSourceBuffer(video, codec);
	      }
	      // else if (type == "image") {
	      //    ...
	      // }
	      else {
	          var errMessage = "stream: unknown buffer type " + type;
	          log.error(errMessage);
	          throw new Error(errMessage);
	        }

	      customBuffers[type] = sourceBuffer;
	    }

	    return sourceBuffer;
	  }

	  function disposeSourceBuffer(video, mediaSource, bufferInfos) {
	    var type = bufferInfos.type;


	    var oldSourceBuffer = undefined;

	    var isNative = isNativeBuffer(type);
	    if (isNative) {
	      oldSourceBuffer = nativeBuffers[type];
	      delete nativeBuffers[type];
	    } else {
	      oldSourceBuffer = customBuffers[type];
	      delete customBuffers[type];
	    }

	    if (oldSourceBuffer) {
	      try {
	        oldSourceBuffer.abort();

	        if (isNative) {
	          mediaSource.removeSourceBuffer(oldSourceBuffer);
	        }
	      } catch (e) {
	        log.warn(e);
	      }
	    }
	  }

	  function createAndPlugMediaSource(url, video) {
	    return Observable.create(function (observer) {
	      assert(MediaSource_, "player: browser is required to support MediaSource");

	      var mediaSource = undefined,
	          objectURL = undefined;

	      if (pipelines.requiresMediaSource()) {
	        mediaSource = new MediaSource_();
	        objectURL = URL.createObjectURL(mediaSource);
	      } else {
	        mediaSource = null;
	        objectURL = url;
	      }

	      video.src = objectURL;

	      observer.next({ url: url, mediaSource: mediaSource });
	      log.info("create mediasource object", objectURL);

	      return function () {

	        if (mediaSource && mediaSource.readyState != "closed") {
	          var _mediaSource = mediaSource;
	          var readyState = _mediaSource.readyState;
	          var sourceBuffers = _mediaSource.sourceBuffers;

	          for (var i = 0; i < sourceBuffers.length; i++) {
	            var sourceBuffer = sourceBuffers[i];
	            try {
	              if (readyState == "open") {
	                sourceBuffer.abort();
	              }

	              mediaSource.removeSourceBuffer(sourceBuffer);
	            } catch (e) {
	              log.warn("error while disposing souceBuffer", e);
	            }
	          }
	        }

	        Object.keys(customBuffers).forEach(function (sourceBufferType) {
	          var sourceBuffer = customBuffers[sourceBufferType];
	          try {
	            sourceBuffer.abort();
	          } catch (e) {
	            log.warn("error while disposing souceBuffer", e);
	          }
	        });

	        // clear video srcAttribute
	        clearVideoSrc(video);

	        if (objectURL) {
	          try {
	            URL.revokeObjectURL(objectURL);
	          } catch (e) {
	            log.warn("error while revoking ObjectURL", e);
	          }
	        }

	        nativeBuffers = null;
	        customBuffers = null;

	        mediaSource = null;
	        objectURL = null;
	      };
	    });
	  }

	  function createTimings(manifest) {
	    var augmentedTimings = timings.map(function (timing) {
	      var clonedTiming = undefined;
	      if (fragEndTimeIsFinite) {
	        clonedTiming = timing.clone();
	        clonedTiming.ts = min(timing.ts, fragEndTime);
	        clonedTiming.duration = min(timing.duration, fragEndTime);
	      } else {
	        clonedTiming = timing;
	      }
	      clonedTiming.liveGap = getLiveGap(timing.ts, manifest);
	      return clonedTiming;
	    });

	    var seekings = seekingsSampler(augmentedTimings);

	    return {
	      timings: augmentedTimings,
	      seekings: seekings
	    };
	  }

	  /**
	   * End-Of-Play stream popping a value when timings reaches the end of the
	   * video
	   */
	  var endOfPlay = timings.filter(function (_ref2) {
	    var ts = _ref2.ts;
	    var duration = _ref2.duration;
	    return duration > 0 && min(duration, fragEndTime) - ts < END_OF_PLAY;
	  });

	  /**
	   * Wait for manifest and media-source to open before initializing source
	   * duration and creating buffers
	   */
	  var createAllStream = retryWithBackoff(function (_ref3) {
	    var url = _ref3.url;
	    var mediaSource = _ref3.mediaSource;

	    var sourceOpening = mediaSource ? sourceOpen(mediaSource) : Observable.of(null);

	    return combineLatest(manifestPipeline({ url: url }), sourceOpening).flatMap(function (_ref4) {
	      var parsed = _ref4[0].parsed;

	      var manifest = normalizeManifest(parsed.url, parsed.manifest, subtitles);

	      if (mediaSource) {
	        setDuration(mediaSource, manifest);
	      }

	      return createStream(mediaSource, manifest);
	    });
	  }, RETRY_OPTIONS);

	  return createAndPlugMediaSource(url, videoElement).flatMap(createAllStream).takeUntil(endOfPlay);

	  /**
	   * Creates a stream of audio/video/text buffers given a set of
	   * adaptations and a codec information.
	   *
	   * For each buffer stream, a unique "sourceBuffer" observable is
	   * created that will be reused for each created buffer.
	   *
	   * An "adaptations choice" observable is also created and
	   * responsible for changing the video or audio adaptation choice in
	   * reaction to user choices (ie. changing the language).
	   */
	  function createBuffer(mediaSource, bufferInfos, timings, seekings) {
	    var bufferType = bufferInfos.type;

	    var adaptations = adaptive.getAdaptationsChoice(bufferType, bufferInfos.adaptations);

	    if (false) {
	      assert(pipelines[bufferType], "stream: no pipeline found for type " + bufferType);
	    }

	    return adaptations.switchMap(function (adaptation) {
	      if (!adaptation) {
	        disposeSourceBuffer(videoElement, mediaSource, bufferInfos);
	        return EmptyBuffer(bufferType);
	      }

	      var adapters = adaptive.getBufferAdapters(adaptation);
	      var buffer = Buffer({
	        bufferType: bufferType,
	        sourceBuffer: createSourceBuffer(videoElement, mediaSource, bufferInfos),
	        pipeline: pipelines[bufferType],
	        adaptation: adaptation,
	        timings: timings,
	        seekings: seekings,
	        adapters: adapters
	      });

	      // non native buffer should not impact on the stability of the
	      // player. ie: if a text buffer sends an error, we want to
	      // continue streaming without any subtitles
	      if (!isNativeBuffer(bufferType)) {
	        return buffer.catch(function (err) {
	          log.error("buffer", bufferType, "has crashed", err);
	          return empty();
	        });
	      }

	      return buffer;
	    });
	  }

	  /**
	   * Creates a stream waiting for the "loadedmetadata" and "canplay"
	   * events.
	   *
	   * This stream also the side effect of setting the initial time as soon as
	   * the loadedmetadata event pops up.
	   */
	  function createLoadedMetadata(manifest) {
	    var canSeek$ = canSeek(videoElement).do(function () {
	      return setInitialTime(manifest);
	    });

	    var canPlay$ = canPlay(videoElement).do(function () {
	      log.info("canplay event");
	      if (autoPlay) {
	        videoElement.play();
	      }
	      autoPlay = true;
	    });

	    return first(combineLatest(canSeek$, canPlay$)).mapTo({ type: "loaded", value: true });
	  }

	  function createEME() {
	    if (keySystems && keySystems.length) {
	      return EME(videoElement, keySystems);
	    } else {
	      return EME.onEncrypted(videoElement).map(function () {
	        var errMessage = "eme: ciphered media and no keySystem passed";
	        log.error(errMessage);
	        throw new Error(errMessage);
	      });
	    }
	  }

	  /**
	   * Extracted stalled info changing over-time from timings. This
	   * stream has a side-effect of the <video> playbackRate property.
	   *
	   * It mutates its value to stop the video when buffer is too low, or
	   * resume the video when the buffer has regained a decent size.
	   */
	  function createStalled(timings, _ref5) {
	    var _ref5$changePlaybackR = _ref5.changePlaybackRate;
	    var changePlaybackRate = _ref5$changePlaybackR === undefined ? true : _ref5$changePlaybackR;

	    return timings.distinctUntilChanged(function (prevTiming, timing) {
	      var isStalled = timing.stalled;
	      var wasStalled = prevTiming.stalled;

	      var isEqual = undefined;
	      if (!wasStalled && !isStalled) {
	        isEqual = true;
	      } else if (!wasStalled || !isStalled) {
	        isEqual = false;
	      } else {
	        isEqual = wasStalled.name == isStalled.name;
	      }

	      if (!isEqual && changePlaybackRate) {
	        if (wasStalled) {
	          log.info("resume playback", timing.ts, timing.name);
	          videoElement.playbackRate = wasStalled.playback;
	        } else {
	          log.info("stop playback", timing.ts, timing.name);
	          videoElement.playbackRate = 0;
	        }
	      }

	      // Discontinuity check in case we are close a buffer but still
	      // calculate a stalled state. This is useful for some
	      // implementation that might drop an injected segment, or in
	      // case of small discontinuity in the stream.
	      if (isStalled) {
	        var nextRangeGap = timing.buffered.getNextRangeGap(timing.ts);
	        if (nextRangeGap < DISCONTINUITY_THRESHOLD) {
	          var seekTo = timing.ts + nextRangeGap + 1 / 60;
	          videoElement.currentTime = seekTo;
	          log.warn("discontinuity seek", timing.ts, nextRangeGap, seekTo);
	        }
	      }

	      return isEqual;
	    }).map(function (timing) {
	      return { type: "stalled", value: timing.stalled };
	    });
	  }

	  function isOutOfIndexError(err) {
	    return err && err.type == "out-of-index";
	  }

	  function isPreconditionFailedError(err) {
	    return err && err.type == "precondition-failed";
	  }

	  function manifestAdapter(manifest, message) {
	    // out-of-index messages require a complete reloading of the
	    // manifest to refresh the current index
	    if (isOutOfIndexError(message)) {
	      log.info("out of index");
	      return manifestPipeline({ url: manifest.locations[0] }).map(function (_ref6) {
	        var parsed = _ref6.parsed;

	        var newManifest = mergeManifestsIndex(manifest, normalizeManifest(parsed.url, parsed.manifest, subtitles));
	        return { type: "manifest", value: newManifest };
	      });
	    }

	    // precondition-failed messages require a change of live-gap to
	    // calibrate the live representation of the player
	    // TODO(pierre): smarter converging algorithm
	    if (isPreconditionFailedError(message)) {
	      mutateManifestLiveGap(manifest, 1);
	      log.warn("precondition failed", manifest.presentationLiveGap);
	    }

	    return Observable.of(message);
	  }

	  function createAdaptationsBuffers(mediaSource, manifest, timings, seekings) {
	    var adaptationsBuffers = getAdaptations(manifest).map(function (adaptation) {
	      return createBuffer(mediaSource, adaptation, timings, seekings);
	    });

	    var buffers = merge.apply(null, adaptationsBuffers);

	    if (!manifest.isLive) {
	      return buffers;
	    }

	    // handle manifest reloading for live streamings using outofindex
	    // errors thrown when a buffer asks for a segment out of its
	    // current index
	    return buffers
	    // do not throw multiple times OutOfIndexErrors in order to have
	    // only one manifest reload for each error.
	    .distinctUntilChanged(function (a, b) {
	      return isOutOfIndexError(b) && isOutOfIndexError(a);
	    }).concatMap(function (message) {
	      return manifestAdapter(manifest, message);
	    });
	  }

	  function createMediaErrorStream() {
	    return on(videoElement, "error").flatMap(function () {
	      var errMessage = "stream: video element MEDIA_ERR code " + videoElement.error.code;
	      log.error(errMessage);
	      throw new Error(errMessage);
	    });
	  }

	  /**
	   * Creates a stream merging all observable that are required to make
	   * the system cooperate.
	   */
	  function createStream(mediaSource, manifest) {
	    var _createTimings = createTimings(manifest);

	    var timings = _createTimings.timings;
	    var seekings = _createTimings.seekings;

	    var justManifest = Observable.of({ type: "manifest", value: manifest });
	    var emeHandler = createEME();
	    var stalled = createStalled(timings, {
	      changePlayback: pipelines.requiresMediaSource()
	    });
	    var canPlay = createLoadedMetadata(manifest).concat(stalled);
	    var buffers = createAdaptationsBuffers(mediaSource, manifest, timings, seekings);
	    var mediaError = createMediaErrorStream();

	    return merge(justManifest, canPlay, emeHandler, buffers, mediaError);
	  }

	  /**
	   * Side effect the set the media duration in mediaSource. This side
	   * effect occurs when we receive the "sourceopen" from the
	   * mediaSource.
	   */
	  function setDuration(mediaSource, manifest) {
	    var duration = undefined;
	    if (manifest.duration === Infinity) {
	      // TODO(pierre): hack for Chrome 42
	      duration = Number.MAX_VALUE;
	    } else {
	      duration = manifest.duration;
	    }

	    if (mediaSource.duration !== duration) {
	      mediaSource.duration = duration;
	      log.info("set duration", mediaSource.duration);
	    }
	  }

	  /**
	   * Side effect to set the initial time of the video:
	   *   - if a start time is defined by user, set it as start time
	   *   - if video is live, use the live edge
	   *   - else set the start time to 0
	   *
	   * This side effect occurs when we receive the "loadedmetadata" event from
	   * the <video>.
	   *
	   * see: createLoadedMetadata(manifest)
	   */
	  function setInitialTime(manifest) {
	    var duration = manifest.duration;
	    var startTime = fragStartTime;
	    var endTime = fragEndTime;
	    var percentage = /^\d*(\.\d+)? ?%$/;

	    if (typeof startTime == "string" && percentage.test(startTime)) {
	      startTime = parseFloat(startTime) / 100 * duration;
	    }

	    if (typeof endTime == "string" && percentage.test(endTime)) {
	      fragEndTime = parseFloat(endTime) / 100 * duration;
	    }

	    if (endTime === Infinity || endTime === "100%") {
	      endTime = duration;
	    }

	    if (!manifest.isLive) {
	      assert(startTime < duration && endTime <= duration, "stream: bad startTime and endTime");
	    } else if (startTime) {
	      startTime = fromWallClockTime(startTime, manifest);
	    } else {
	      startTime = getLiveEdge(manifest);
	    }

	    log.info("set initial time", startTime);
	    // reset playbackRate to 1 in case we were at 0 (from a stalled
	    // retry for instance)
	    videoElement.playbackRate = 1;
	    videoElement.currentTime = startTime;
	  }
	}

	module.exports = Stream;

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var AbstractSourceBuffer = __webpack_require__(354);

	var _require = __webpack_require__(20);

	var addTextTrack = _require.addTextTrack;
	var isVTTSupported = _require.isVTTSupported;

	var log = __webpack_require__(13);

	var Cue = window.VTTCue || window.TextTrackCue;

	var TextSourceBuffer = function (_AbstractSourceBuffer) {
	  _inherits(TextSourceBuffer, _AbstractSourceBuffer);

	  function TextSourceBuffer(video, codec) {
	    _classCallCheck(this, TextSourceBuffer);

	    var _this = _possibleConstructorReturn(this, _AbstractSourceBuffer.call(this, codec));

	    _this.video = video;
	    _this.codec = codec;
	    _this.isVTT = /^text\/vtt/.test(codec);

	    var _addTextTrack = addTextTrack(video);

	    var track = _addTextTrack.track;
	    var trackElement = _addTextTrack.trackElement;

	    _this.track = track;
	    _this.trackElement = trackElement;
	    return _this;
	  }

	  TextSourceBuffer.prototype.createCuesFromArray = function createCuesFromArray(cues) {
	    var nativeCues = [];
	    for (var i = 0; i < cues.length; i++) {
	      var _cues$i = cues[i];
	      var start = _cues$i.start;
	      var end = _cues$i.end;
	      var text = _cues$i.text;

	      if (text) {
	        nativeCues.push(new Cue(start, end, text));
	      }
	    }
	    return nativeCues;
	  };

	  TextSourceBuffer.prototype._append = function _append(cues) {
	    var _this2 = this;

	    if (this.isVTT && isVTTSupported()) {
	      var blob = new Blob([cues], { type: "text/vtt" });
	      var url = URL.createObjectURL(blob);
	      if (this.trackElement) {
	        this.trackElement.src = url;
	        this.buffered.insert(0, Infinity);
	      } else {
	        log.warn("vtt subtitles not supported");
	      }
	    } else {
	      var newCues = this.createCuesFromArray(cues);
	      if (newCues.length > 0) {
	        var firstCue = newCues[0];
	        var lastCue = newCues[newCues.length - 1];

	        // NOTE(compat): cleanup all current cues if the newly added
	        // ones are in the past. this is supposed to fix an issue on
	        // IE/Edge.
	        var currentCues = this.track.cues;
	        if (currentCues.length > 0) {
	          if (firstCue.startTime < currentCues[currentCues.length - 1].endTime) {
	            this._remove(0, +Infinity);
	          }
	        }

	        newCues.forEach(function (cue) {
	          return _this2.track.addCue(cue);
	        });
	        this.buffered.insert(0, firstCue.startTime, lastCue.endTime);
	      }
	    }
	  };

	  TextSourceBuffer.prototype._remove = function _remove(from, to) {
	    var track = this.track;
	    var cues = track.cues;
	    for (var i = 0; i < cues.length; i++) {
	      var cue = cues[i];
	      var startTime = cue.startTime;
	      var endTime = cue.endTime;

	      if (startTime >= from && startTime <= to && endTime <= to) {
	        track.removeCue(cue);
	      }
	    }
	    this.buffered.remove(from, to);
	  };

	  TextSourceBuffer.prototype._abort = function _abort() {
	    var trackElement = this.trackElement;
	    var video = this.video;

	    if (trackElement && video && video.hasChildNodes(trackElement)) {
	      video.removeChild(trackElement);
	    }
	    this.track.mode = "disabled";
	    this.size = 0;
	    this.trackElement = null;
	    this.track = null;
	    this.video = null;
	  };

	  return TextSourceBuffer;
	}(AbstractSourceBuffer);

	module.exports = TextSourceBuffer;

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);

	function parseTimeFragment(timeFragment) {
	  if (typeof timeFragment == "string") {
	    timeFragment = temporalMediaFragmentParser(timeFragment);
	  } else {
	    timeFragment = {
	      start: timeFragment.start,
	      end: timeFragment.end
	    };
	  }

	  if (typeof timeFragment.start == "string" && typeof timeFragment.end == "string") {
	    if (!timeFragment.start) {
	      timeFragment.start = "0%";
	    }
	    if (!timeFragment.end) {
	      timeFragment.end = "100%";
	    }
	  } else {
	    if (!timeFragment.start) {
	      timeFragment.start = 0;
	    }
	    if (!timeFragment.end) {
	      timeFragment.end = Infinity;
	    }
	  }

	  if (typeof timeFragment.start == "string" && typeof timeFragment.end == "string") {
	    assert(parseFloat(timeFragment.start) >= 0 && parseFloat(timeFragment.start) <= 100, "player: startTime should be between 0% and 100%");
	    assert(parseFloat(timeFragment.end) >= 0 && parseFloat(timeFragment.end) <= 100, "player: endTime should be between 0% and 100%");
	  } else {
	    assert((typeof timeFragment.start == "number" || timeFragment.start instanceof Date) && (typeof timeFragment.end == "number" || timeFragment.end instanceof Date), "player: timeFragment should have interface { start, end } where start and end are numbers or dates");
	    assert(timeFragment.start < timeFragment.end, "player: startTime should be lower than endTime");
	    assert(timeFragment.start >= 0, "player: startTime should be greater than 0");
	  }

	  return timeFragment;
	}

	var errMessage = "Invalid MediaFragment";

	function normalizeNTPTime(time) {
	  if (!time) {
	    return false;
	  }

	  // replace a sole trailing dot, which is legal:
	  // npt-sec = 1*DIGIT [ "." *DIGIT ]
	  time = time.replace(/^npt\:/, "").replace(/\.$/, "");

	  // possible cases:
	  // 12:34:56.789
	  //    34:56.789
	  //       56.789
	  //       56
	  var hours = undefined;
	  var minutes = undefined;
	  var seconds = undefined;
	  time = time.split(":");
	  var length = time.length;
	  switch (length) {
	    case 3:
	      hours = parseInt(time[0], 10);
	      minutes = parseInt(time[1], 10);
	      seconds = parseFloat(time[2]);
	      break;
	    case 2:
	      hours = 0;
	      minutes = parseInt(time[0], 10);
	      seconds = parseFloat(time[1]);
	      break;
	    case 1:
	      hours = 0;
	      minutes = 0;
	      seconds = parseFloat(time[0]);
	      break;
	    default:
	      return false;
	  }
	  assert(hours <= 23, errMessage);
	  assert(minutes <= 59, errMessage);
	  assert(length <= 1 || seconds < 60, errMessage);
	  return hours * 3600 + minutes * 60 + seconds;
	}

	// we interpret frames as milliseconds, and further-subdivison-of-frames
	// as microseconds. this allows for relatively easy comparison.
	function normalizeSMPTETime(time) {
	  if (!time) {
	    return false;
	  }

	  // possible cases:
	  // 12:34:56
	  // 12:34:56:78
	  // 12:34:56:78.90
	  var hours = undefined;
	  var minutes = undefined;
	  var seconds = undefined;
	  var frames = undefined;
	  var subframes = undefined;
	  time = time.split(":");
	  var length = time.length;
	  switch (length) {
	    case 3:
	      hours = parseInt(time[0], 10);
	      minutes = parseInt(time[1], 10);
	      seconds = parseInt(time[2], 10);
	      frames = 0;
	      subframes = 0;
	      break;
	    case 4:
	      hours = parseInt(time[0], 10);
	      minutes = parseInt(time[1], 10);
	      seconds = parseInt(time[2], 10);
	      if (time[3].indexOf(".") === -1) {
	        frames = parseInt(time[3], 10);
	        subframes = 0;
	      } else {
	        var frameSubFrame = time[3].split(".");
	        frames = parseInt(frameSubFrame[0], 10);
	        subframes = parseInt(frameSubFrame[1], 10);
	      }
	      break;
	    default:
	      return false;
	  }
	  assert(hours <= 23, errMessage);
	  assert(minutes <= 59, errMessage);
	  assert(seconds <= 59, errMessage);
	  return hours * 3600 + minutes * 60 + seconds + frames * 0.001 + subframes * 0.000001;
	}

	function normalizeWallClockTime(time) {
	  return new Date(Date.parse(time));
	}

	function normalizePercentage(time) {
	  if (!time) {
	    return false;
	  }

	  return time;
	}

	// MediaFragment temporal parser.
	// adapted from: https://github.com/tomayac/Media-Fragments-URI
	// specification: http://www.w3.org/TR/media-frags/#naming-time
	function temporalMediaFragmentParser(value) {
	  var components = value.split(",");
	  assert(components.length <= 2, errMessage);

	  var start = components[0] ? components[0] : "";
	  var end = components[1] ? components[1] : "";
	  assert((start || end) && (!start || end || value.indexOf(",") === -1), errMessage);

	  start = start.replace(/^smpte(-25|-30|-30-drop)?\:/, "").replace("clock:", "");

	  // hours:minutes:seconds.milliseconds
	  var npt = /^((npt\:)?((\d+\:(\d\d)\:(\d\d))|((\d\d)\:(\d\d))|(\d+))(\.\d*)?)?$/;
	  // hours:minutes:seconds:frames.further-subdivison-of-frames
	  var smpte = /^(\d+\:\d\d\:\d\d(\:\d\d(\.\d\d)?)?)?$/;
	  // regexp adapted from http://delete.me.uk/2005/03/iso8601.html
	  var wallClock = /^((\d{4})(-(\d{2})(-(\d{2})(T(\d{2})\:(\d{2})(\:(\d{2})(\.(\d+))?)?(Z|(([-\+])(\d{2})\:(\d{2})))?)?)?)?)?$/;
	  // float%
	  var percentage = /^(\d*(\.\d+)? ?%)?$/;

	  var timeNormalizer = undefined;
	  if (npt.test(start) && npt.test(end)) {
	    timeNormalizer = normalizeNTPTime;
	  } else if (smpte.test(start) && smpte.test(end)) {
	    timeNormalizer = normalizeSMPTETime;
	  } else if (wallClock.test(start) && wallClock.test(end)) {
	    timeNormalizer = normalizeWallClockTime;
	  } else if (percentage.test(start) && percentage.test(end)) {
	    timeNormalizer = normalizePercentage;
	  } else {
	    throw new Error(errMessage);
	  }

	  start = timeNormalizer(start);
	  end = timeNormalizer(end);
	  assert(start !== false || end !== false, errMessage);
	  return {
	    start: start === false ? "" : start,
	    end: end === false ? "" : end
	  };
	}

	module.exports = { parseTimeFragment: parseTimeFragment };

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var empty = Observable.empty;
	var merge = Observable.merge;

	var assert = __webpack_require__(7);
	var request = __webpack_require__(56);

	var _require2 = __webpack_require__(42);

	var resolveURL = _require2.resolveURL;

	var _require3 = __webpack_require__(359);

	var parseSidx = _require3.parseSidx;
	var patchPssh = _require3.patchPssh;


	var dashManifestParser = __webpack_require__(360);

	function byteRange(_ref) {
	  var start = _ref[0];
	  var end = _ref[1];

	  if (!end || end === Infinity) {
	    return "bytes=" + +start + "-";
	  } else {
	    return "bytes=" + +start + "-" + +end;
	  }
	}

	function replaceTokens(path, segment) {
	  if (path.indexOf("$") === -1) {
	    return path;
	  } else {
	    var rep = segment.getRepresentation();
	    return path.replace(/\$\$/g, "$").replace(/\$RepresentationID\$/g, rep.id).replace(/\$Bandwidth\$/g, rep.bitrate).replace(/\$Number\$/g, segment.getNumber()).replace(/\$Time\$/g, segment.getTime());
	  }
	}

	var req = function req(reqOptions) {
	  reqOptions.withMetadata = true;
	  return request(reqOptions);
	};

	module.exports = function () {
	  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var contentProtectionParser = opts.contentProtectionParser;


	  if (!contentProtectionParser) {
	    contentProtectionParser = function contentProtectionParser() {};
	  }

	  var manifestPipeline = {
	    loader: function loader(_ref2) {
	      var url = _ref2.url;

	      return req({ url: url, format: "document" });
	    },
	    parser: function parser(_ref3) {
	      var response = _ref3.response;

	      return Observable.of({
	        manifest: dashManifestParser(response.blob, contentProtectionParser),
	        url: response.url
	      });
	    }
	  };

	  var segmentPipeline = {
	    loader: function loader(_ref4) {
	      var segment = _ref4.segment;

	      var media = segment.getMedia();
	      var range = segment.getRange();
	      var indexRange = segment.getIndexRange();

	      // init segment without initialization media/range/indexRange:
	      // we do nothing on the network
	      if (segment.isInitSegment() && !(media || range || indexRange)) {
	        return empty();
	      }

	      var mediaHeaders = undefined;
	      if (range) {
	        mediaHeaders = { "Range": byteRange(range) };
	      } else {
	        mediaHeaders = null;
	      }

	      var path = undefined;
	      if (media) {
	        path = replaceTokens(media, segment);
	      } else {
	        path = "";
	      }

	      var mediaUrl = resolveURL(segment.getResolvedURL(), path);
	      var mediaOrInitRequest = req({
	        url: mediaUrl,
	        format: "arraybuffer",
	        headers: mediaHeaders
	      });

	      // If init segment has indexRange metadata, we need to fetch
	      // both the initialization data and the index metadata. We do
	      // this in parallel and send the both blobs into the pipeline.
	      // TODO(pierre): we could fire both these requests as one if the
	      // init and index ranges are contiguous, which should be the
	      // case most of the time.
	      if (indexRange) {
	        var indexRequest = req({
	          url: mediaUrl,
	          format: "arraybuffer",
	          headers: { "Range": byteRange(indexRange) }
	        });
	        return merge(mediaOrInitRequest, indexRequest);
	      } else {
	        return mediaOrInitRequest;
	      }
	    },
	    parser: function parser(_ref5) {
	      var segment = _ref5.segment;
	      var response = _ref5.response;

	      var blob = new Uint8Array(response.blob);

	      // added segments and timescale informations are extracted from
	      // sidx atom
	      var nextSegments = undefined,
	          timescale = undefined,
	          currentSegment = undefined;

	      // added index (segments and timescale) informations are
	      // extracted from sidx atom
	      var indexRange = segment.getIndexRange();
	      var index = parseSidx(blob, indexRange ? indexRange[0] : 0);
	      if (index) {
	        nextSegments = index.segments;
	        timescale = index.timescale;
	      }

	      if (!segment.isInitSegment()) {
	        // current segment information may originate from the index
	        // itself in which case we don't have to use the index
	        // segments.
	        if (segment.getTime() >= 0 && segment.getDuration() >= 0) {
	          currentSegment = {
	            ts: segment.getTime(),
	            d: segment.getDuration()
	          };
	        } else if (index && index.segments.length === 1) {
	          currentSegment = {
	            ts: index.segments[0].ts,
	            d: index.segments[0].d
	          };
	        }

	        if (false) {
	          assert(currentSegment);
	        }
	      }

	      if (segment.isInitSegment()) {
	        var adaptation = segment.getAdaptatation();
	        if (adaptation.contentProtection) {
	          blob = patchPssh(blob, adaptation.contentProtection);
	        }
	      }

	      return Observable.of({
	        blob: blob,
	        currentSegment: currentSegment,
	        nextSegments: nextSegments,
	        timescale: timescale
	      });
	    }
	  };

	  var textTrackPipeline = {
	    loader: function loader() /* { segment } */{}
	  };

	  return {
	    directFile: false,
	    manifest: manifestPipeline,
	    audio: segmentPipeline,
	    video: segmentPipeline,
	    text: textTrackPipeline
	  };
	};

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);

	var _require = __webpack_require__(28);

	var itobe4 = _require.itobe4;
	var be8toi = _require.be8toi;
	var be4toi = _require.be4toi;
	var be2toi = _require.be2toi;
	var hexToBytes = _require.hexToBytes;
	var strToBytes = _require.strToBytes;
	var concat = _require.concat;


	function findAtom(buf, atomName) {
	  var l = buf.length;
	  var i = 0;

	  var name = undefined,
	      size = undefined;
	  while (i + 8 < l) {
	    size = be4toi(buf, i);
	    name = be4toi(buf, i + 4);
	    assert(size > 0, "dash: out of range size");
	    if (name === atomName) {
	      break;
	    } else {
	      i += size;
	    }
	  }

	  if (i >= l) {
	    return -1;
	  }

	  assert(i + size <= l, "dash: atom out of range");
	  return i;
	}

	function parseSidx(buf, offset) {
	  var index = findAtom(buf, 0x73696478 /* "sidx" */);
	  if (index == -1) {
	    return null;
	  }

	  var size = be4toi(buf, index);
	  var pos = index + /* size */4 + /* name */4;

	  /* version(8) */
	  /* flags(24) */
	  /* reference_ID(32); */
	  /* timescale(32); */
	  var version = buf[pos];pos += 4 + 4;
	  var timescale = be4toi(buf, pos);pos += 4;

	  /* earliest_presentation_time(32 / 64) */
	  /* first_offset(32 / 64) */
	  var time = undefined;
	  if (version === 0) {
	    time = be4toi(buf, pos);pos += 4;
	    offset += be4toi(buf, pos) + size;pos += 4;
	  } else if (version === 1) {
	    time = be8toi(buf, pos);pos += 8;
	    offset += be8toi(buf, pos) + size;pos += 8;
	  } else {
	    return null;
	  }

	  var segments = [];

	  /* reserved(16) */
	  /* reference_count(16) */
	  pos += 2;
	  var count = be2toi(buf, pos);
	  pos += 2;
	  while (--count >= 0) {
	    /* reference_type(1) */
	    /* reference_size(31) */
	    /* segment_duration(32) */
	    /* sap..(32) */
	    var refChunk = be4toi(buf, pos);
	    pos += 4;
	    var refType = (refChunk & 0x80000000) >>> 31;
	    var refSize = refChunk & 0x7fffffff;
	    if (refType == 1) {
	      throw new Error("not implemented");
	    }

	    var d = be4toi(buf, pos);
	    pos += 4;

	    // let sapChunk = be4toi(buf, pos + 8);
	    pos += 4;

	    // TODO(pierre): handle sap
	    // let startsWithSap = (sapChunk & 0x80000000) >>> 31;
	    // let sapType = (sapChunk & 0x70000000) >>> 28;
	    // let sapDelta = sapChunk & 0x0FFFFFFF;

	    var ts = time;
	    segments.push({
	      ts: ts, d: d, r: 0,
	      range: [offset, offset + refSize - 1]
	    });

	    time += d;
	    offset += refSize;
	  }

	  return { segments: segments, timescale: timescale };
	}

	function Atom(name, buff) {
	  var len = buff.length + 8;
	  return concat(itobe4(len), strToBytes(name), buff);
	}

	function createPssh(_ref) {
	  var systemId = _ref.systemId;
	  var privateData = _ref.privateData;

	  systemId = systemId.replace(/-/g, "");

	  assert(systemId.length === 32);
	  return Atom("pssh", concat(4, hexToBytes(systemId), itobe4(privateData.length), privateData));
	}

	function patchPssh(buf, pssList) {
	  if (!pssList || !pssList.length) {
	    return buf;
	  }

	  var pos = findAtom(buf, 0x6d6f6f76 /* = "moov" */);
	  if (pos == -1) {
	    return buf;
	  }

	  var size = be4toi(buf, pos);
	  var moov = buf.subarray(pos, pos + size);

	  var newmoov = [moov];
	  for (var i = 0; i < pssList.length; i++) {
	    newmoov.push(createPssh(pssList[i]));
	  }

	  newmoov = concat.apply(null, newmoov);
	  newmoov.set(itobe4(newmoov.length), 0);

	  return concat(buf.subarray(0, pos), newmoov, buf.subarray(pos + size));
	}

	module.exports = { parseSidx: parseSidx, patchPssh: patchPssh };

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	// XML-Schema
	// <http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd>

	var assert = __webpack_require__(7);
	var find = __webpack_require__(29);
	var defaults = __webpack_require__(30);

	var iso8601Duration = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/;
	var rangeRe = /([0-9]+)-([0-9]+)/;
	var frameRateRe = /([0-9]+)(\/([0-9]+))?/;

	// TODO(pierre): support more than juste timeline index type
	function calcLastRef(index) {
	  var _index$timeline = index.timeline[index.timeline.length - 1];
	  var ts = _index$timeline.ts;
	  var r = _index$timeline.r;
	  var d = _index$timeline.d;

	  return (ts + (r + 1) * d) / index.timescale;
	}

	function feedAttributes(node, base) {
	  var attrs = attributes[node.nodeName];

	  assert(attrs, "parser: no attributes for " + node.nodeName);

	  var obj = base || {};
	  for (var i = 0; i < attrs.length; i++) {
	    var _attrs$i = attrs[i];
	    var k = _attrs$i.k;
	    var fn = _attrs$i.fn;
	    var n = _attrs$i.n;
	    var def = _attrs$i.def;

	    if (node.hasAttribute(k)) {
	      obj[n || k] = fn(node.getAttribute(k));
	    } else if (def != null) {
	      obj[n || k] = def;
	    }
	  }
	  return obj;
	}

	function parseString(str) {
	  return str;
	}

	function parseBoolean(str) {
	  return str == "true";
	}

	function parseIntOrBoolean(str) {
	  if (str == "true") {
	    return true;
	  }
	  if (str == "false") {
	    return false;
	  }
	  return parseInt(str);
	}

	function parseDateTime(str) {
	  return new Date(Date.parse(str));
	}

	function parseDuration(date) {
	  if (!date) {
	    return 0;
	  }

	  var match = iso8601Duration.exec(date);
	  assert(match, "parser: " + date + " is not a valid ISO8601 duration");

	  return parseFloat(match[2] || 0) * 365 * 24 * 60 * 60 + parseFloat(match[4] || 0) * 30 * 24 * 60 * 60 + // not precise +
	  parseFloat(match[6] || 0) * 24 * 60 * 60 + parseFloat(match[8] || 0) * 60 * 60 + parseFloat(match[10] || 0) * 60 + parseFloat(match[12] || 0);
	}

	function parseFrameRate(str) {
	  var match = frameRateRe.exec(str);
	  if (!match) {
	    return -1;
	  }

	  var nom = parseInt(match[1]) || 0;
	  var den = parseInt(match[2]) || 0;
	  return den > 0 ? nom / den : nom;
	}

	function parseRatio(str) {
	  return str;
	}

	function parseByteRange(str) {
	  var match = rangeRe.exec(str);
	  if (!match) {
	    return null;
	  } else {
	    return [+match[1], +match[2]];
	  }
	}

	var RepresentationBaseType = [{ k: "profiles", fn: parseString }, { k: "width", fn: parseInt }, { k: "height", fn: parseInt }, { k: "frameRate", fn: parseFrameRate }, { k: "audioSamplingRate", fn: parseString }, { k: "mimeType", fn: parseString }, { k: "segmentProfiles", fn: parseString }, { k: "codecs", fn: parseString }, { k: "maximumSAPPeriod", fn: parseFloat }, { k: "maxPlayoutRate", fn: parseFloat }, { k: "codingDependency", fn: parseBoolean }];

	var SegmentBaseType = [{ k: "timescale", fn: parseInt }, { k: "presentationTimeOffset", fn: parseFloat, def: 0 }, { k: "indexRange", fn: parseByteRange }, { k: "indexRangeExact", fn: parseBoolean }, { k: "availabilityTimeOffset", fn: parseFloat }, { k: "availabilityTimeComplete", fn: parseBoolean }];

	var MultipleSegmentBaseType = SegmentBaseType.concat([{ k: "duration", fn: parseInt }, { k: "startNumber", fn: parseInt }]);

	var attributes = {
	  "ContentProtection": [{ k: "schemeIdUri", fn: parseString }, { k: "value", fn: parseString }],

	  "SegmentURL": [{ k: "media", fn: parseString }, { k: "mediaRange", fn: parseByteRange }, { k: "index", fn: parseString }, { k: "indexRange", fn: parseByteRange }],

	  "S": [{ k: "t", fn: parseInt, n: "ts" }, { k: "d", fn: parseInt }, { k: "r", fn: parseInt }],

	  "SegmentTimeline": [],
	  "SegmentBase": SegmentBaseType,
	  "SegmentTemplate": MultipleSegmentBaseType.concat([{ k: "initialization", fn: parseInitializationAttribute }, { k: "index", fn: parseString }, { k: "media", fn: parseString }, { k: "bitstreamSwitching", fn: parseString }]),
	  "SegmentList": MultipleSegmentBaseType,

	  "ContentComponent": [{ k: "id", fn: parseString }, { k: "lang", fn: parseString }, { k: "contentType", fn: parseString }, { k: "par", fn: parseRatio }],

	  "Representation": RepresentationBaseType.concat([{ k: "id", fn: parseString }, { k: "bandwidth", fn: parseInt, n: "bitrate" }, { k: "qualityRanking", fn: parseInt }]),

	  "AdaptationSet": RepresentationBaseType.concat([{ k: "id", fn: parseString }, { k: "group", fn: parseInt }, { k: "lang", fn: parseString }, { k: "contentType", fn: parseString }, { k: "par", fn: parseRatio }, { k: "minBandwidth", fn: parseInt, n: "minBitrate" }, { k: "maxBandwidth", fn: parseInt, n: "maxBitrate" }, { k: "minWidth", fn: parseInt }, { k: "maxWidth", fn: parseInt }, { k: "minHeight", fn: parseInt }, { k: "maxHeight", fn: parseInt }, { k: "minFrameRate", fn: parseFrameRate }, { k: "maxFrameRate", fn: parseFrameRate }, { k: "segmentAlignment", fn: parseIntOrBoolean }, { k: "subsegmentAlignment", fn: parseIntOrBoolean }, { k: "bitstreamSwitching", fn: parseBoolean }]),

	  "Period": [{ k: "id", fn: parseString }, { k: "start", fn: parseDuration }, { k: "duration", fn: parseDuration }, { k: "bitstreamSwitching", fn: parseBoolean }],

	  "MPD": [{ k: "id", fn: parseString }, { k: "profiles", fn: parseString }, { k: "type", fn: parseString }, { k: "availabilityStartTime", fn: parseDateTime }, { k: "availabilityEndTime", fn: parseDateTime }, { k: "publishTime", fn: parseDateTime }, { k: "mediaPresentationDuration", fn: parseDuration, n: "duration" }, { k: "minimumUpdatePeriod", fn: parseDuration }, { k: "minBufferTime", fn: parseDuration }, { k: "timeShiftBufferDepth", fn: parseDuration }, { k: "suggestedPresentationDelay", fn: parseDuration }, { k: "maxSegmentDuration", fn: parseDuration }, { k: "maxSubsegmentDuration", fn: parseDuration }]
	};

	function reduceChildren(root, fn, init) {
	  var node = root.firstElementChild,
	      r = init;
	  while (node) {
	    r = fn(r, node.nodeName, node);
	    node = node.nextElementSibling;
	  }
	  return r;
	}

	function parseContentProtection(root, contentProtectionParser) {
	  return contentProtectionParser(feedAttributes(root), root);
	}

	function parseSegmentBase(root) {
	  var index = reduceChildren(root, function (res, name, node) {
	    if (name == "Initialization") {
	      res.initialization = parseInitialization(node);
	    }
	    return res;
	  }, feedAttributes(root));
	  if (root.nodeName == "SegmentBase") {
	    index.indexType = "base";
	    index.timeline = [];
	  }
	  return index;
	}

	function parseMultipleSegmentBase(root) {
	  return reduceChildren(root, function (res, name, node) {
	    if (name == "SegmentTimeline") {
	      res.indexType = "timeline";
	      res.timeline = parseSegmentTimeline(node);
	    }
	    return res;
	  }, parseSegmentBase(root));
	}

	function parseSegmentTimeline(root) {
	  return reduceChildren(root, function (arr, name, node) {
	    var len = arr.length;
	    var seg = feedAttributes(node);
	    if (seg.ts == null) {
	      var prev = len > 0 && arr[len - 1];
	      seg.ts = prev ? prev.ts + prev.d * (prev.r + 1) : 0;
	    }
	    if (seg.r == null) {
	      seg.r = 0;
	    }
	    arr.push(seg);
	    return arr;
	  }, []);
	}

	function parseInitializationAttribute(attrValue) {
	  return { media: attrValue, range: undefined };
	}

	function parseInitialization(root) {
	  var range = undefined,
	      media = undefined;

	  if (root.hasAttribute("range")) {
	    range = parseByteRange(root.getAttribute("range"));
	  }

	  if (root.hasAttribute("sourceURL")) {
	    media = root.getAttribute("sourceURL");
	  }

	  return { range: range, media: media };
	}

	function parseSegmentTemplate(root) {
	  var base = parseMultipleSegmentBase(root);
	  if (!base.indexType) {
	    base.indexType = "template";
	  }
	  return base;
	}

	function parseSegmentList(root) {
	  var base = parseMultipleSegmentBase(root);
	  base.list = [];
	  base.indexType = "list";
	  return reduceChildren(root, function (res, name, node) {
	    if (name == "SegmentURL") {
	      res.list.push(feedAttributes(node));
	    }
	    return res;
	  }, base);
	}

	function parseRepresentation(root) {
	  var rep = reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      // case "FramePacking": break;
	      // case "AudioChannelConfiguration": break;
	      // case "ContentProtection": res.contentProtection = parseContentProtection(node); break;
	      // case "EssentialProperty": break;
	      // case "SupplementalProperty": break;
	      // case "InbandEventStream": break;
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      // case "SubRepresentation": break;
	      case "SegmentBase":
	        res.index = parseSegmentBase(node);break;
	      case "SegmentList":
	        res.index = parseSegmentList(node);break;
	      case "SegmentTemplate":
	        res.index = parseSegmentTemplate(node);break;
	    }
	    return res;
	  }, {});

	  return feedAttributes(root, rep);
	}

	function parseContentComponent(root) {
	  return feedAttributes(root);
	}

	function parseAdaptationSet(root, contentProtectionParser) {
	  var res = reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      // case "Accessibility": break;
	      // case "Role": break;
	      // case "Rating": break;
	      // case "Viewpoint": break;
	      case "ContentProtection":
	        res.contentProtection = parseContentProtection(node, contentProtectionParser);break;
	      case "ContentComponent":
	        res.contentComponent = parseContentComponent(node);break;
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      case "SegmentBase":
	        res.index = parseSegmentBase(node);break;
	      case "SegmentList":
	        res.index = parseSegmentList(node);break;
	      case "SegmentTemplate":
	        res.index = parseSegmentTemplate(node);break;
	      case "Representation":
	        var rep = parseRepresentation(node);
	        if (rep.id == null) {
	          rep.id = res.representations.length;
	        }
	        res.representations.push(rep);break;
	    }
	    return res;
	  }, { representations: [] });

	  return feedAttributes(root, res);
	}

	function parsePeriod(root, contentProtectionParser) {
	  var attrs = feedAttributes(root, reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      case "AdaptationSet":
	        var ada = parseAdaptationSet(node, contentProtectionParser);
	        if (ada.id == null) {
	          ada.id = res.adaptations.length;
	        }
	        res.adaptations.push(ada);break;
	    }
	    return res;
	  }, { adaptations: [] }));

	  if (attrs.baseURL) {
	    attrs.adaptations.forEach(function (adaptation) {
	      return defaults(adaptation, { baseURL: attrs.baseURL });
	    });
	  }

	  return attrs;
	}

	function parseFromDocument(document, contentProtectionParser) {
	  var root = document.documentElement;
	  assert.equal(root.nodeName, "MPD", "parser: document root should be MPD");

	  var manifest = reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      case "Location":
	        res.locations.push(node.textContent);break;
	      case "Period":
	        res.periods.push(parsePeriod(node, contentProtectionParser));break;
	    }
	    return res;
	  }, {
	    transportType: "dash",
	    periods: [],
	    locations: []
	  });

	  manifest = feedAttributes(root, manifest);

	  if (/isoff-live/.test(manifest.profiles)) {
	    var adaptations = manifest.periods[0].adaptations;
	    var videoAdaptation = find(adaptations, function (a) {
	      return a.mimeType == "video/mp4";
	    });

	    var videoIndex = videoAdaptation && videoAdaptation.index;

	    if (false) {
	      assert(videoIndex && (videoIndex.indexType == "timeline" || videoIndex.indexType == "template"));
	      assert(manifest.availabilityStartTime);
	    }

	    var lastRef = undefined;
	    if (videoIndex.timeline) {
	      lastRef = calcLastRef(videoIndex);
	    } else {
	      lastRef = Date.now() / 1000 - 60;
	    }

	    manifest.availabilityStartTime = manifest.availabilityStartTime.getTime() / 1000;
	    manifest.presentationLiveGap = Date.now() / 1000 - (lastRef + manifest.availabilityStartTime);
	  }

	  return manifest;
	}

	function parseFromString(manifest, contentProtectionParser) {
	  return parseFromDocument(new DOMParser().parseFromString(manifest, "application/xml"), contentProtectionParser);
	}

	function parser(manifest, contentProtectionParser) {
	  if (typeof manifest == "string") {
	    return parseFromString(manifest, contentProtectionParser);
	  } else {
	    return parseFromDocument(manifest, contentProtectionParser);
	  }
	}

	parser.parseFromString = parseFromString;
	parser.parseFromDocument = parseFromDocument;

	module.exports = parser;

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;


	var manifestPipeline = {
	  parser: function parser(_ref) {
	    var url = _ref.url;

	    var manifest = {
	      transportType: "directfile",
	      locations: [url],
	      periods: [],
	      isLive: false,
	      duration: Infinity,
	      adaptations: null
	    };

	    return Observable.of({ manifest: manifest, url: url });
	  }
	};

	module.exports = {
	  directFile: true,
	  manifest: manifestPipeline
	};

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	module.exports = {
	  "smooth": __webpack_require__(363),
	  "dash": __webpack_require__(358),
	  "directfile": __webpack_require__(361)
	};

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var empty = Observable.empty;

	var request = __webpack_require__(56);

	var _require2 = __webpack_require__(28);

	var bytesToStr = _require2.bytesToStr;

	var log = __webpack_require__(13);

	var createSmoothStreamingParser = __webpack_require__(365);

	var _require3 = __webpack_require__(364);

	var patchSegment = _require3.patchSegment;
	var createVideoInitSegment = _require3.createVideoInitSegment;
	var createAudioInitSegment = _require3.createAudioInitSegment;
	var getMdat = _require3.getMdat;
	var getTraf = _require3.getTraf;
	var parseTfrf = _require3.parseTfrf;
	var parseTfxd = _require3.parseTfxd;

	var _require4 = __webpack_require__(366);

	var parseSami = _require4.parseSami;

	var _require5 = __webpack_require__(367);

	var parseTTML = _require5.parseTTML;

	var TT_PARSERS = {
	  "application/x-sami": parseSami,
	  "application/smil": parseSami,
	  "application/ttml+xml": parseTTML,
	  "application/ttml+xml+mp4": parseTTML,
	  "text/vtt": function textVtt(text) {
	    return text;
	  }
	};

	var ISM_REG = /\.(isml?)(\?token=\S+)?$/;
	var WSX_REG = /\.wsx?(\?token=\S+)?/;
	var TOKEN_REG = /\?token=(\S+)/;

	function byteRange(_ref) {
	  var start = _ref[0];
	  var end = _ref[1];

	  if (!end || end === Infinity) {
	    return "bytes=" + +start + "-";
	  } else {
	    return "bytes=" + +start + "-" + +end;
	  }
	}

	function extractISML(doc) {
	  return doc.getElementsByTagName("media")[0].getAttribute("src");
	}

	function extractToken(url) {
	  var tokenMatch = url.match(TOKEN_REG);
	  return tokenMatch && tokenMatch[1] || "";
	}

	function replaceToken(url, token) {
	  if (token) {
	    return url.replace(TOKEN_REG, "?token=" + token);
	  } else {
	    return url.replace(TOKEN_REG, "");
	  }
	}

	function resolveManifest(url) {
	  var ismMatch = url.match(ISM_REG);
	  if (ismMatch) {
	    return url.replace(ismMatch[1], ismMatch[1] + "/manifest");
	  } else {
	    return url;
	  }
	}

	function buildSegmentURL(segment) {
	  return segment.getResolvedURL().replace(/\{bitrate\}/g, segment.getRepresentation().bitrate).replace(/\{start time\}/g, segment.getTime());
	}

	var req = function req(reqOptions) {
	  reqOptions.withMetadata = true;
	  return request(reqOptions);
	};

	module.exports = function () {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var smoothManifestParser = createSmoothStreamingParser(options);

	  var manifestPipeline = {
	    resolver: function resolver(_ref2) {
	      var url = _ref2.url;

	      var resolving = undefined;
	      var token = extractToken(url);

	      if (WSX_REG.test(url)) {
	        resolving = req({
	          url: replaceToken(url, ""),
	          format: "document"
	        }).map(function (_ref3) {
	          var blob = _ref3.blob;
	          return extractISML(blob);
	        });
	      } else {
	        resolving = Observable.of(url);
	      }

	      return resolving.map(function (url) {
	        return { url: replaceToken(resolveManifest(url), token) };
	      });
	    },
	    loader: function loader(_ref4) {
	      var url = _ref4.url;

	      return req({ url: url, format: "document" });
	    },
	    parser: function parser(_ref5) {
	      var response = _ref5.response;

	      return Observable.of({
	        manifest: smoothManifestParser(response.blob),
	        url: response.url
	      });
	    }
	  };

	  function extractTimingsInfos(blob, segment) {
	    var nextSegments = undefined;
	    var currentSegment = undefined;

	    if (segment.getAdaptation().isLive) {
	      var traf = getTraf(blob);
	      if (traf) {
	        nextSegments = parseTfrf(traf);
	        currentSegment = parseTfxd(traf);
	      } else {
	        log.warn("smooth: could not find traf atom");
	      }
	    } else {
	      nextSegments = null;
	    }

	    if (!currentSegment) {
	      currentSegment = {
	        d: segment.getDuration(),
	        ts: segment.getTime()
	      };
	    }

	    return { nextSegments: nextSegments, currentSegment: currentSegment };
	  }

	  var segmentPipeline = {
	    loader: function loader(_ref6) {
	      var segment = _ref6.segment;

	      if (segment.isInitSegment()) {
	        var adaptation = segment.getAdaptation();
	        var representation = segment.getRepresentation();

	        var blob = undefined;
	        var protection = adaptation.smoothProtection || {};
	        switch (adaptation.type) {
	          case "video":
	            blob = createVideoInitSegment(representation.index.timescale, representation.width, representation.height, 72, 72, 4, // vRes, hRes, nal
	            representation.codecPrivateData, protection.keyId, // keyId
	            protection.keySystems // pssList
	            );break;
	          case "audio":
	            blob = createAudioInitSegment(representation.index.timescale, representation.channels, representation.bitsPerSample, representation.packetSize, representation.samplingRate, representation.codecPrivateData, protection.keyId, // keyId
	            protection.keySystems // pssList
	            );break;
	        }

	        return Observable.of({ blob: blob, size: blob.length, duration: 100 });
	      } else {
	        var headers = undefined;

	        var range = segment.getRange();
	        if (range) {
	          headers = { "Range": byteRange(range) };
	        }

	        var url = buildSegmentURL(segment);
	        return req({ url: url, format: "arraybuffer", headers: headers });
	      }
	    },
	    parser: function parser(_ref7) {
	      var segment = _ref7.segment;
	      var response = _ref7.response;

	      if (segment.isInitSegment()) {
	        return Observable.of({ blob: response.blob, timings: null });
	      }

	      var blob = new Uint8Array(response.blob);

	      var _extractTimingsInfos = extractTimingsInfos(blob, segment);

	      var nextSegments = _extractTimingsInfos.nextSegments;
	      var currentSegment = _extractTimingsInfos.currentSegment;


	      return Observable.of({
	        blob: patchSegment(blob, currentSegment.ts),
	        nextSegments: nextSegments,
	        currentSegment: currentSegment
	      });
	    }
	  };

	  var textTrackPipeline = {
	    loader: function loader(_ref8) {
	      var segment = _ref8.segment;

	      if (segment.isInitSegment()) {
	        return empty();
	      }

	      var _segment$getRepresent = segment.getRepresentation();

	      var mimeType = _segment$getRepresent.mimeType;

	      var url = buildSegmentURL(segment);

	      if (mimeType.indexOf("mp4") >= 0) {
	        // in case of TTML declared inside
	        // playlists, the TTML file is embededded
	        // inside an mp4 fragment.
	        return req({ url: url, format: "arraybuffer" });
	      } else {
	        return req({ url: url, format: "text" });
	      }
	    },
	    parser: function parser(_ref9) {
	      var response = _ref9.response;
	      var segment = _ref9.segment;

	      var _segment$getAdaptatio = segment.getAdaptation();

	      var lang = _segment$getAdaptatio.lang;

	      var _segment$getRepresent2 = segment.getRepresentation();

	      var mimeType = _segment$getRepresent2.mimeType;
	      var index = _segment$getRepresent2.index;

	      var parser_ = TT_PARSERS[mimeType];
	      if (!parser_) {
	        throw new Error("smooth: could not find a text-track parser for the type " + mimeType);
	      }

	      var blob = response.blob;
	      var text = undefined;
	      // in case of TTML declared inside playlists, the TTML file is
	      // embededded inside an mp4 fragment.
	      if (mimeType.indexOf("mp4") >= 0) {
	        blob = new Uint8Array(blob);
	        text = bytesToStr(getMdat(blob));
	      } else {
	        // vod is simple WebVTT or TTML text
	        text = blob;
	      }

	      var _extractTimingsInfos2 = extractTimingsInfos(blob, segment);

	      var nextSegments = _extractTimingsInfos2.nextSegments;
	      var currentSegment = _extractTimingsInfos2.currentSegment;


	      return Observable.of({
	        blob: parser_(text, lang, segment.getTime() / index.timescale),
	        currentSegment: currentSegment,
	        nextSegments: nextSegments
	      });
	    }
	  };

	  return {
	    directFile: false,
	    manifest: manifestPipeline,
	    audio: segmentPipeline,
	    video: segmentPipeline,
	    text: textTrackPipeline
	  };
	};

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);

	var _require = __webpack_require__(20);

	var isIE = _require.isIE;

	var _require2 = __webpack_require__(28);

	var concat = _require2.concat;
	var strToBytes = _require2.strToBytes;
	var bytesToStr = _require2.bytesToStr;
	var hexToBytes = _require2.hexToBytes;
	var bytesToHex = _require2.bytesToHex;
	var be2toi = _require2.be2toi;
	var itobe2 = _require2.itobe2;
	var be4toi = _require2.be4toi;
	var itobe4 = _require2.itobe4;
	var be8toi = _require2.be8toi;
	var itobe8 = _require2.itobe8;


	var FREQS = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

	var boxNamesMem = {};
	function boxName(str) {
	  if (boxNamesMem[str]) {
	    return boxNamesMem[str];
	  }

	  var nameInBytes = strToBytes(str);
	  boxNamesMem[str] = nameInBytes;
	  return nameInBytes;
	}

	function Atom(name, buff) {
	  if (false) {
	    assert(name.length === 4);
	  }

	  var len = buff.length + 8;
	  return concat(itobe4(len), boxName(name), buff);
	}

	function readUuid(buf, id1, id2, id3, id4) {
	  var l = buf.length;
	  var i = 0,
	      len = undefined;
	  while (i < l) {
	    len = be4toi(buf, i);
	    if (be4toi(buf, i + 4) === 0x75756964 /* === "uuid" */ && be4toi(buf, i + 8) === id1 && be4toi(buf, i + 12) === id2 && be4toi(buf, i + 16) === id3 && be4toi(buf, i + 20) === id4) {
	      return buf.subarray(i + 24, i + len);
	    }
	    i += len;
	  }
	}

	function findAtom(buf, atomName) {
	  var l = buf.length;
	  var i = 0;

	  var name = undefined,
	      size = undefined;
	  while (i + 8 < l) {
	    size = be4toi(buf, i);
	    name = be4toi(buf, i + 4);
	    assert(size > 0, "dash: out of range size");
	    if (name === atomName) {
	      break;
	    } else {
	      i += size;
	    }
	  }

	  if (i < l) {
	    return buf.subarray(i + 8, i + size);
	  } else {
	    return null;
	  }
	}

	var atoms = {
	  mult: function mult(name, children) {
	    return Atom(name, concat.apply(null, children));
	  },


	  /**
	   * {String}     name ("avc1" or "encv")
	   * {Number}     drefIdx (shall be 1)
	   * {Number}     width
	   * {Number}     height
	   * {Number}     hRes (horizontal resolution, eg 72)
	   * {Number}     vRes (horizontal resolution, eg 72)
	   * {Number}     colorDepth (eg 24)
	   * {Uint8Array} avcc (Uint8Array representing the avcC atom)
	   * {Uint8Array} sinf (Uint8Array representing the sinf atom, only if name == "encv")
	   */
	  avc1encv: function avc1encv(name, drefIdx, width, height, hRes, vRes, encName, colorDepth, avcc, sinf) {
	    if (false) {
	      assert(name === "avc1" || name === "encv", "should be avc1 or encv atom");
	    }
	    return Atom(name, concat(6, // 6 bytes reserved
	    itobe2(drefIdx), 16, // drefIdx + QuickTime reserved, zeroes
	    itobe2(width), // size 2 w
	    itobe2(height), // size 2 h
	    itobe2(hRes), 2, // reso 4 h
	    itobe2(vRes), 2 + 4, // reso 4 v + QuickTime reserved, zeroes
	    [0, 1, encName.length], // frame count (default 1)
	    strToBytes(encName), // 1byte len + encoder name str
	    31 - encName.length, // + padding
	    itobe2(colorDepth), // color depth
	    [0xFF, 0xFF], // reserved ones
	    avcc, // avcc atom,
	    name === "encv" ? sinf : []));
	  },


	  /**
	   * {String} spsHex
	   * {String} ppsHex
	   * {Number} nalLen (NAL Unit length: 1, 2 or 4 bytes)
	   * eg: avcc(0x4d, 0x40, 0x0d, 4, 0xe1, "674d400d96560c0efcb80a70505050a0", 1, "68ef3880")
	   */
	  avcc: function avcc(sps, pps, nalLen) {
	    var nal = nalLen === 2 ? 0x1 : nalLen === 4 ? 0x3 : 0x0;

	    // Deduce AVC Profile from SPS
	    var h264Profile = sps[1];
	    var h264CompatibleProfile = sps[2];
	    var h264Level = sps[3];

	    return Atom("avcC", concat([1, h264Profile, h264CompatibleProfile, h264Level, 0x3F << 2 | nal, 0xE0 | 1], itobe2(sps.length), sps, [1], itobe2(pps.length), pps));
	  },
	  dref: function dref(url) {
	    // only one description here... FIXME
	    return Atom("dref", concat(7, [1], url));
	  },


	  /**
	   * {Number} stream
	   * {String} codecPrivateData (hex string)
	   * eg: esds(1, 98800, "1190")
	   */
	  esds: function esds(stream, codecPrivateData) {
	    return Atom("esds", concat(4, [0x03, 0x19], itobe2(stream), [0x00, 0x04, 0x11, 0x40, 0x15], 11, [0x05, 0x02], hexToBytes(codecPrivateData), [0x06, 0x01, 0x02]));
	  },


	  /**
	   * {String} dataFormat, four letters (eg "avc1")
	   */
	  frma: function frma(dataFormat) {
	    if (false) {
	      assert.equal(dataFormat.length, 4, "wrong data format length");
	    }
	    return Atom("frma", strToBytes(dataFormat));
	  },
	  free: function free(length) {
	    return Atom("free", new Uint8Array(length - 8));
	  },
	  ftyp: function ftyp(majorBrand, brands) {
	    return Atom("ftyp", concat.apply(null, [strToBytes(majorBrand), [0, 0, 0, 1]].concat(brands.map(strToBytes))));
	  },


	  /**
	   * {String} type ("video" or "audio")
	   */
	  hdlr: function hdlr(type) {
	    type = type === "audio" ? "soun" : // audio
	    "vide"; // video
	    return Atom("hdlr", concat(8, strToBytes(type), 12, strToBytes("Media Handler")));
	  },
	  mdhd: function mdhd(timescale) {
	    return Atom("mdhd", concat(12, itobe4(timescale), 8));
	  },
	  moof: function moof(mfhd, traf) {
	    return atoms.mult("moof", [mfhd, traf]);
	  },


	  /**
	   * {String}     name ("mp4a" or "enca")
	   * {Number}     drefIdx
	   * {Number}     channelsCount
	   * {Number}     sampleSize
	   * {Number}     packetSize
	   * {Number}     sampleRate
	   * {Uint8Array} esds (Uint8Array representing the esds atom)
	   * {Uint8Array} sinf (Uint8Array representing the sinf atom, only if name == "enca")
	   */
	  mp4aenca: function mp4aenca(name, drefIdx, channelsCount, sampleSize, packetSize, sampleRate, esds, sinf) {
	    return Atom(name, concat(6, itobe2(drefIdx), 8, itobe2(channelsCount), itobe2(sampleSize), 2, itobe2(packetSize), itobe2(sampleRate), 2, esds, name === "enca" ? sinf : []));
	  },
	  mvhd: function mvhd(timescale, trackId) {
	    return Atom("mvhd", concat(12, itobe4(timescale), 4, [0, 1], 2, // we assume rate = 1;
	    [1, 0], 10, // we assume volume = 100%;
	    [0, 1], 14, // default matrix
	    [0, 1], 14, // default matrix
	    [64, 0, 0, 0], 26, itobe2(trackId + 1) // next trackId (=trackId + 1);
	    ));
	  },


	  /**
	   * {String}       systemId    Hex string representing the CDM, 16 bytes.
	   * {Uint8Array}   privateData Data associated to protection specific system
	   * {[]Uint8Array} keyIds      List of key ids contained in the PSSH
	   */
	  pssh: function pssh(systemId) {
	    var privateData = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	    var keyIds = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    systemId = systemId.replace(/-/g, "");

	    assert(systemId.length === 32, "wrong system id length");

	    var version = undefined;
	    var kidList = undefined;
	    var kidCount = keyIds.length;
	    if (kidCount > 0) {
	      version = 1;
	      kidList = concat.apply(null, [itobe4(kidCount)].concat(keyIds));
	    } else {
	      version = 0;
	      kidList = [];
	    }

	    return Atom("pssh", concat([version, 0, 0, 0], hexToBytes(systemId), kidList, itobe4(privateData.length), privateData));
	  },
	  saio: function saio(mfhd, tfhd, tfdt, trun) {
	    return Atom("saio", concat(4, [0, 0, 0, 1], // ??
	    itobe4(mfhd.length + tfhd.length + tfdt.length + trun.length + 8 + 8 + 8 + 8)));
	  },


	  /**
	   * {Uint8Array} sencData (including 8 bytes flags and entries count)
	   */
	  saiz: function saiz(senc) {
	    if (senc.length === 0) {
	      return Atom("saiz", new Uint8Array());
	    }

	    var flags = be4toi(senc, 0);
	    var entries = be4toi(senc, 4);

	    var arr = new Uint8Array(9 + entries);
	    arr.set(itobe4(entries), 5);

	    var i = 9;
	    var j = 8;
	    var pairsCnt = undefined;
	    var pairsLen = undefined;
	    while (j < senc.length) {
	      j += 8; // assuming IV is 8 bytes TODO handle 16 bytes IV
	      // if we have extradata for each entry
	      if ((flags & 0x2) === 0x2) {
	        pairsLen = 2;
	        pairsCnt = be2toi(senc, j);
	        j += 2 + pairsCnt * 6;
	      } else {
	        pairsCnt = 0;
	        pairsLen = 0;
	      }
	      arr[i] = pairsCnt * 6 + 8 + pairsLen;
	      i++;
	    }

	    return Atom("saiz", arr);
	  },


	  /**
	   * {String} schemeType, four letters (eg "cenc" for Common Encryption)
	   * {Number} schemeVersion (eg 65536)
	   */
	  schm: function schm(schemeType, schemeVersion) {
	    if (false) {
	      assert.equal(schemeType.length, 4, "wrong scheme type length");
	    }
	    return Atom("schm", concat(4, strToBytes(schemeType), itobe4(schemeVersion)));
	  },
	  senc: function senc(buf) {
	    return Atom("senc", buf);
	  },
	  smhd: function smhd() {
	    return Atom("smhd", new Uint8Array(8));
	  },


	  /**
	   * {Array} representations (arrays of Uint8Array, typically [avc1] or [encv, avc1])
	   */
	  stsd: function stsd(reps) {
	    // only one description here... FIXME
	    return Atom("stsd", concat.apply(null, [7, [reps.length]].concat(reps)));
	  },
	  tkhd: function tkhd(width, height, trackId) {
	    return Atom("tkhd", concat(itobe4(1 + 2 + 4), 8, // we assume track is enabled, in media and in preview.
	    itobe4(trackId), 20, // we assume trackId = 1;
	    [1, 0, 0, 0], // we assume volume = 100%;
	    [0, 1, 0, 0], 12, // default matrix
	    [0, 1, 0, 0], 12, // default matrix
	    [64, 0, 0, 0], // ??
	    itobe2(width), 2, // width (TODO handle fixed)
	    itobe2(height), 2 // height (TODO handle fixed)
	    ));
	  },
	  trex: function trex(trackId) {
	    // default sample desc idx = 1
	    return Atom("trex", concat(4, itobe4(trackId), [0, 0, 0, 1], 12));
	  },
	  tfdt: function tfdt(decodeTime) {
	    return Atom("tfdt", concat([1, 0, 0, 0], itobe8(decodeTime)));
	  },


	  /**
	   * {Number} algId (eg 1)
	   * {Number} ivSize (eg 8)
	   * {String} keyId Hex KID 93789920e8d6520098577df8f2dd5546
	   */
	  tenc: function tenc(algId, ivSize, keyId) {
	    if (false) {
	      assert.equal(keyId.length, 32, "wrong default KID length");
	    }
	    return Atom("tenc", concat(6, [algId, ivSize], hexToBytes(keyId)));
	  },
	  traf: function traf(tfhd, tfdt, trun, senc, mfhd) {
	    var trafs = [tfhd, tfdt, trun];
	    if (senc) {
	      trafs.push(atoms.senc(senc), atoms.saiz(senc), atoms.saio(mfhd, tfhd, tfdt, trun));
	    }
	    return atoms.mult("traf", trafs);
	  },
	  vmhd: function vmhd() {
	    var arr = new Uint8Array(12);
	    arr[3] = 1; // QuickTime...
	    return Atom("vmhd", arr);
	  }
	};

	var reads = {
	  traf: function traf(buff) {
	    var moof = findAtom(buff, 0x6D6F6F66);
	    if (moof) {
	      return findAtom(moof, 0x74726166);
	    } else {
	      return null;
	    }
	  },


	  /**
	   * Extract senc data (derived from UUID MS Atom)
	   * {Uint8Array} traf
	   */
	  senc: function senc(traf) {
	    return readUuid(traf, 0xA2394F52, 0x5A9B4F14, 0xA2446C42, 0x7C648DF4);
	  },


	  /**
	   * Extract tfxd data (derived from UUID MS Atom)
	   * {Uint8Array} traf
	   */
	  tfxd: function tfxd(traf) {
	    return readUuid(traf, 0x6D1D9B05, 0x42D544E6, 0x80E2141D, 0xAFF757B2);
	  },


	  /**
	   * Extract tfrf data (derived from UUID MS Atom)
	   * {Uint8Array} traf
	   */
	  tfrf: function tfrf(traf) {
	    return readUuid(traf, 0xD4807EF2, 0XCA394695, 0X8E5426CB, 0X9E46A79F);
	  },
	  mdat: function mdat(buff) {
	    return findAtom(buff, 0x6D646174 /* "mdat" */);
	  }
	};

	/**
	 * Return AAC ES Header (hexstr form)
	 *
	 * {Number} type
	 *          1 = AAC Main
	 *          2 = AAC LC
	 *          cf http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio
	 * {Number} frequency
	 * {Number} chans (1 or 2)
	 */
	function aacesHeader(type, frequency, chans) {
	  var freq = FREQS.indexOf(frequency);
	  if (false) {
	    assert(freq >= 0, "non supported frequency"); // TODO : handle Idx = 15...
	  }
	  var val = undefined;
	  val = (type & 0x3F) << 0x4;
	  val = (val | freq & 0x1F) << 0x4;
	  val = (val | chans & 0x1F) << 0x3;
	  return bytesToHex(itobe2(val));
	}

	function moovChildren(mvhd, mvex, trak, pssList) {
	  var moov = [mvhd, mvex, trak];
	  pssList.forEach(function (pss) {
	    var pssh = atoms.pssh(pss.systemId, pss.privateData, pss.keyIds);
	    moov.push(pssh);
	  });
	  return moov;
	}

	function patchTrunDataOffset(segment, trunoffset, dataOffset) {
	  // patch trun dataoffset with new moof atom size
	  segment.set(itobe4(dataOffset), trunoffset + 16);
	}

	function createNewSegment(segment, newmoof, oldmoof, trunoffset) {
	  var segmentlen = segment.length;
	  var newmooflen = newmoof.length;
	  var oldmooflen = oldmoof.length;
	  var mdat = segment.subarray(oldmooflen, segmentlen);
	  var newSegment = new Uint8Array(newmooflen + (segmentlen - oldmooflen));
	  newSegment.set(newmoof, 0);
	  newSegment.set(mdat, newmooflen);
	  patchTrunDataOffset(newSegment, trunoffset, newmoof.length + 8);
	  return newSegment;
	}

	function patchSegmentInPlace(segment, newmoof, oldmoof, trunoffset) {
	  var free = oldmoof.length - newmoof.length;
	  segment.set(newmoof, 0);
	  segment.set(atoms.free(free), newmoof.length);
	  patchTrunDataOffset(segment, trunoffset, newmoof.length + 8 + free);
	  return segment;
	}

	function createInitSegment(timescale, type, stsd, mhd, width, height, pssList) {

	  var stbl = atoms.mult("stbl", [stsd, Atom("stts", new Uint8Array(0x08)), Atom("stsc", new Uint8Array(0x08)), Atom("stsz", new Uint8Array(0x0c)), Atom("stco", new Uint8Array(0x08))]);

	  var url = Atom("url ", new Uint8Array([0, 0, 0, 1]));
	  var dref = atoms.dref(url);
	  var dinf = atoms.mult("dinf", [dref]);
	  var minf = atoms.mult("minf", [mhd, dinf, stbl]);
	  var hdlr = atoms.hdlr(type);
	  var mdhd = atoms.mdhd(timescale); //this one is really important
	  var mdia = atoms.mult("mdia", [mdhd, hdlr, minf]);
	  var tkhd = atoms.tkhd(width, height, 1);
	  var trak = atoms.mult("trak", [tkhd, mdia]);
	  var trex = atoms.trex(1);
	  var mvex = atoms.mult("mvex", [trex]);
	  var mvhd = atoms.mvhd(timescale, 1); // in fact, we don"t give a shit about this value ;)

	  var moov = atoms.mult("moov", moovChildren(mvhd, mvex, trak, pssList));
	  var ftyp = atoms.ftyp("isom", ["isom", "iso2", "iso6", "avc1", "dash"]);

	  return concat(ftyp, moov);
	}

	module.exports = {
	  getMdat: reads.mdat,
	  getTraf: reads.traf,

	  parseTfrf: function parseTfrf(traf) {
	    var tfrf = reads.tfrf(traf);
	    if (!tfrf) {
	      return [];
	    }

	    var frags = [];
	    var version = tfrf[0];
	    var fragCount = tfrf[4];
	    for (var i = 0; i < fragCount; i++) {
	      var d = undefined,
	          ts = undefined;
	      if (version == 1) {
	        ts = be8toi(tfrf, 16 * i + 5);
	        d = be8toi(tfrf, 16 * i + 5 + 8);
	      } else {
	        ts = be4toi(tfrf, 8 * i + 5);
	        d = be4toi(tfrf, 8 * i + 5 + 4);
	      }
	      frags.push({ ts: ts, d: d });
	    }
	    return frags;
	  },
	  parseTfxd: function parseTfxd(traf) {
	    var tfxd = reads.tfxd(traf);
	    if (tfxd) {
	      return {
	        d: be8toi(tfxd, 12),
	        ts: be8toi(tfxd, 4)
	      };
	    }
	  },


	  /**
	   * Return full Init segment as Uint8Array
	   *
	   * Number   timescale (lowest number, this one will be set into mdhd, *10000 in mvhd) Eg 1000
	   * Number   width
	   * Number   height
	   * Number   hRes
	   * Number   vRes
	   * Number   nalLength (1, 2 or 4)
	   * String   SPShexstr
	   * String   PPShexstr
	   * Array    (optional) pssList. List of dict {systemId: "DEADBEEF", codecPrivateData: "DEAFBEEF}
	   * String   keyId (hex string representing the key Id, 32 chars. eg. a800dbed49c12c4cb8e0b25643844b9b)
	   *
	   *
	   */
	  createVideoInitSegment: function createVideoInitSegment(timescale, width, height, hRes, vRes, nalLength, codecPrivateData, keyId, pssList) {

	    if (!pssList) {
	      pssList = [];
	    }

	    var _codecPrivateData$spl = codecPrivateData.split("00000001");

	    var spsHex = _codecPrivateData$spl[1];
	    var ppsHex = _codecPrivateData$spl[2];

	    var sps = hexToBytes(spsHex);
	    var pps = hexToBytes(ppsHex);

	    // TODO NAL length is forced to 4
	    var avcc = atoms.avcc(sps, pps, nalLength);
	    var stsd = undefined;
	    if (!pssList.length) {
	      var avc1 = atoms.avc1encv("avc1", 1, width, height, hRes, vRes, "AVC Coding", 24, avcc);
	      stsd = atoms.stsd([avc1]);
	    } else {
	      var tenc = atoms.tenc(1, 8, keyId);
	      var schi = atoms.mult("schi", [tenc]);
	      var schm = atoms.schm("cenc", 65536);
	      var frma = atoms.frma("avc1");
	      var sinf = atoms.mult("sinf", [frma, schm, schi]);
	      var encv = atoms.avc1encv("encv", 1, width, height, hRes, vRes, "AVC Coding", 24, avcc, sinf);
	      stsd = atoms.stsd([encv]);
	    }

	    return createInitSegment(timescale, "video", stsd, atoms.vmhd(), width, height, pssList);
	  },


	  /**
	   * Return full Init segment as Uint8Array
	   *
	   * Number   channelsCount
	   * Number   sampleSize
	   * Number   packetSize
	   * Number   sampleRate
	   * String   codecPrivateData
	   * Array    (optional) pssList. List of dict {systemId: "DEADBEEF", codecPrivateData: "DEAFBEEF"}
	   * String   keyId (hex string representing the key Id, 32 chars. eg. a800dbed49c12c4cb8e0b25643844b9b)
	   *
	   *
	   */
	  createAudioInitSegment: function createAudioInitSegment(timescale, channelsCount, sampleSize, packetSize, sampleRate, codecPrivateData, keyId, pssList) {

	    if (!pssList) {
	      pssList = [];
	    }
	    if (!codecPrivateData) {
	      codecPrivateData = aacesHeader(2, sampleRate, channelsCount);
	    }

	    var esds = atoms.esds(1, codecPrivateData);
	    var stsd = undefined;
	    if (!pssList.length) {
	      var mp4a = atoms.mp4aenca("mp4a", 1, channelsCount, sampleSize, packetSize, sampleRate, esds);
	      stsd = atoms.stsd([mp4a]);
	    } else {
	      var tenc = atoms.tenc(1, 8, keyId);
	      var schi = atoms.mult("schi", [tenc]);
	      var schm = atoms.schm("cenc", 65536);
	      var frma = atoms.frma("mp4a");
	      var sinf = atoms.mult("sinf", [frma, schm, schi]);
	      var enca = atoms.mp4aenca("enca", 1, channelsCount, sampleSize, packetSize, sampleRate, esds, sinf);
	      stsd = atoms.stsd([enca]);
	    }

	    return createInitSegment(timescale, "audio", stsd, atoms.smhd(), 0, 0, pssList);
	  },
	  patchSegment: function patchSegment(segment, decodeTime) {
	    if (false) {
	      // TODO handle segments with styp/free...
	      var name = bytesToStr(segment.subarray(4, 8));
	      assert(name === "moof");
	    }

	    var oldmoof = segment.subarray(0, be4toi(segment, 0));
	    var newtfdt = atoms.tfdt(decodeTime);

	    // reads [moof[mfhd|traf[tfhd|trun|..]]]
	    var tfdtlen = newtfdt.length;
	    var mfhdlen = be4toi(oldmoof, 8);
	    var traflen = be4toi(oldmoof, 8 + mfhdlen);
	    var tfhdlen = be4toi(oldmoof, 8 + mfhdlen + 8);
	    var trunlen = be4toi(oldmoof, 8 + mfhdlen + 8 + tfhdlen);
	    var oldmfhd = oldmoof.subarray(8, 8 + mfhdlen);
	    var oldtraf = oldmoof.subarray(8 + mfhdlen + 8, 8 + mfhdlen + 8 + traflen - 8);
	    var oldtfhd = oldtraf.subarray(0, tfhdlen);
	    var oldtrun = oldtraf.subarray(tfhdlen, tfhdlen + trunlen);

	    // force trackId=1 since trackIds are not always reliable...
	    oldtfhd.set([0, 0, 0, 1], 12);

	    var oldsenc = reads.senc(oldtraf);

	    // writes [moof[mfhd|traf[tfhd|tfdt|trun|senc|saiz|saio]]]
	    var newtraf = atoms.traf(oldtfhd, newtfdt, oldtrun, oldsenc, oldmfhd);
	    var newmoof = atoms.moof(oldmfhd, newtraf);

	    var trunoffset = 8 + mfhdlen + 8 + tfhdlen + tfdtlen;
	    // TODO(pierre): fix patchSegmentInPlace to work with IE11. Maybe
	    // try to put free atom inside traf children
	    if (isIE) {
	      return createNewSegment(segment, newmoof, oldmoof, trunoffset);
	    } else {
	      if (oldmoof.length - newmoof.length >= 8 /* minimum "free" atom size */) {
	          return patchSegmentInPlace(segment, newmoof, oldmoof, trunoffset);
	        } else {
	        return createNewSegment(segment, newmoof, oldmoof, trunoffset);
	      }
	    }
	  }
	};

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);
	var find = __webpack_require__(29);
	var bytes = __webpack_require__(28);

	var DEFAULT_MIME_TYPES = {
	  audio: "audio/mp4",
	  video: "video/mp4",
	  text: "application/ttml+xml"
	};

	var DEFAULT_CODECS = {
	  audio: "mp4a.40.2",
	  video: "avc1.4D401E"
	};

	var MIME_TYPES = {
	  "AACL": "audio/mp4",
	  "AVC1": "video/mp4",
	  "H264": "video/mp4",
	  "TTML": "application/ttml+xml+mp4"
	};

	var CODECS = {
	  "AACL": "mp4a.40.5",
	  "AACH": "mp4a.40.5",
	  "AVC1": "avc1.4D401E",
	  "H264": "avc1.4D401E"
	};

	var profiles = {
	  audio: [["Bitrate", "bitrate", parseInt], ["AudioTag", "audiotag", parseInt], ["FourCC", "mimeType", MIME_TYPES], ["FourCC", "codecs", CODECS], ["Channels", "channels", parseInt], ["SamplingRate", "samplingRate", parseInt], ["BitsPerSample", "bitsPerSample", parseInt], ["PacketSize", "packetSize", parseInt], ["CodecPrivateData", "codecPrivateData", String]],
	  video: [["Bitrate", "bitrate", parseInt], ["FourCC", "mimeType", MIME_TYPES], ["FourCC", "codecs", CODECS], ["MaxWidth", "width", parseInt], ["MaxHeight", "height", parseInt], ["CodecPrivateData", "codecPrivateData", String]],
	  text: [["Bitrate", "bitrate", parseInt], ["FourCC", "mimeType", MIME_TYPES]]
	};

	function parseBoolean(val) {
	  if (typeof val == "boolean") {
	    return val;
	  } else if (typeof val == "string") {
	    return val.toUpperCase() === "TRUE";
	  } else {
	    return false;
	  }
	}

	function calcLastRef(index) {
	  var _index$timeline = index.timeline[index.timeline.length - 1];
	  var ts = _index$timeline.ts;
	  var r = _index$timeline.r;
	  var d = _index$timeline.d;

	  return (ts + (r + 1) * d) / index.timescale;
	}

	function getKeySystems(keyIdBytes) {
	  return [{
	    // Widevine
	    systemId: "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed",
	    privateData: bytes.concat([0x08, 0x01, 0x12, 0x10], keyIdBytes)
	  }];
	}

	// keyIds: [keyIdBytes],

	// {
	//   // Clearkey
	//   // (https://dvcs.w3.org/hg/html-media/raw-file/tip/encrypted-media/cenc-format.html)
	//   systemId: "1077efec-c0b2-4d02-ace3-3c1e52e2fb4b",
	//   privateData: bytes.strToBytes(JSON.stringify({
	//     kids: [bytes.toBase64URL(bytes.bytesToStr(keyIdBytes))],
	//     type: "temporary"
	//   }))
	// }
	function createSmoothStreamingParser() {
	  var parserOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


	  var SUGGESTED_PERSENTATION_DELAY = parserOptions.suggestedPresentationDelay || 20;
	  var REFERENCE_DATE_TIME = parserOptions.referenceDateTime || Date.UTC(1970, 0, 1, 0, 0, 0, 0) / 1000;
	  var MIN_REPRESENTATION_BITRATE = parserOptions.minRepresentationBitrate || 190000;

	  var keySystems = parserOptions.keySystems || getKeySystems;

	  function getHexKeyId(buf) {
	    var len = bytes.le2toi(buf, 8);
	    var xml = bytes.bytesToUTF16Str(buf.subarray(10, 10 + len));
	    var doc = new DOMParser().parseFromString(xml, "application/xml");
	    var kid = doc.querySelector("KID").textContent;
	    return bytes.guidToUuid(atob(kid)).toLowerCase();
	  }

	  function reduceChildren(root, fn, init) {
	    var node = root.firstElementChild,
	        r = init;
	    while (node) {
	      r = fn(r, node.nodeName, node);
	      node = node.nextElementSibling;
	    }
	    return r;
	  }

	  function parseProtection(root) {
	    var header = root.firstElementChild;
	    assert.equal(header.nodeName, "ProtectionHeader", "parser: Protection should have ProtectionHeader child");
	    var privateData = bytes.strToBytes(atob(header.textContent));
	    var keyId = getHexKeyId(privateData);
	    var keyIdBytes = bytes.hexToBytes(keyId);

	    // remove possible braces
	    var systemId = header.getAttribute("SystemID").toLowerCase().replace(/\{|\}/g, "");

	    return {
	      keyId: keyId,
	      keySystems: [{
	        systemId: systemId,
	        privateData: privateData
	      }]. // keyIds: [keyIdBytes],
	      concat(keySystems(keyIdBytes))
	    };
	  }

	  function parseC(node, timeline) {
	    var l = timeline.length;
	    var prev = l > 0 ? timeline[l - 1] : { d: 0, ts: 0, r: 0 };
	    var d = +node.getAttribute("d");
	    var t = node.getAttribute("t");
	    var r = +node.getAttribute("r");

	    // in smooth streaming format,
	    // r refers to number of same duration
	    // chunks, not repetitions (defers from DASH)
	    if (r) {
	      r--;
	    }

	    if (l > 0 && !prev.d) {
	      prev.d = t - prev.ts;
	      timeline[l - 1] = prev;
	    }

	    if (l > 0 && d == prev.d && t == null) {
	      prev.r += (r || 0) + 1;
	    } else {
	      var ts = t == null ? prev.ts + prev.d * (prev.r + 1) : +t;
	      timeline.push({ d: d, ts: ts, r: r });
	    }
	    return timeline;
	  }

	  function parseQualityLevel(q, prof) {
	    var obj = {};
	    for (var i = 0; i < prof.length; i++) {
	      var _prof$i = prof[i];
	      var key = _prof$i[0];
	      var name = _prof$i[1];
	      var parse = _prof$i[2];

	      obj[name] = typeof parse == "function" ? parse(q.getAttribute(key)) : parse[q.getAttribute(key)];
	    }
	    return obj;
	  }

	  // Parse the adaptations (<StreamIndex>) tree containing
	  // representations (<QualityLevels>) and timestamp indexes (<c>).
	  // Indexes can be quite huge, and this function needs to
	  // to be optimized.
	  function parseAdaptation(root, timescale) {
	    if (root.hasAttribute("Timescale")) {
	      timescale = +root.getAttribute("Timescale");
	    }

	    var type = root.getAttribute("Type");
	    var subType = root.getAttribute("Subtype");
	    var profile = profiles[type];

	    assert(profile, "parser: unrecognized QualityLevel type " + type);

	    var representationCount = 0;

	    var _reduceChildren = reduceChildren(root, function (res, name, node) {
	      switch (name) {
	        case "QualityLevel":
	          var rep = parseQualityLevel(node, profile);

	          // filter out video representations with small bitrates
	          if (type != "video" || rep.bitrate > MIN_REPRESENTATION_BITRATE) {
	            rep.id = representationCount++;
	            res.representations.push(rep);
	          }

	          break;
	        case "c":
	          res.index.timeline = parseC(node, res.index.timeline);
	          break;
	      }
	      return res;
	    }, {
	      representations: [],
	      index: {
	        timeline: [],
	        indexType: "timeline",
	        timescale: timescale,
	        initialization: {}
	      }
	    });

	    var representations = _reduceChildren.representations;
	    var index = _reduceChildren.index;

	    // we assume that all representations have the same
	    // codec and mimeType

	    assert(representations.length, "parser: adaptation should have at least one representation");

	    // apply default codec if non-supported
	    var codecs = representations[0].codecs;
	    if (!codecs) {
	      codecs = DEFAULT_CODECS[type];
	      representations.forEach(function (rep) {
	        return rep.codecs = codecs;
	      });
	    }

	    // apply default mimetype if non-supported
	    var mimeType = representations[0].mimeType;
	    if (!mimeType) {
	      mimeType = DEFAULT_MIME_TYPES[type];
	      representations.forEach(function (rep) {
	        return rep.mimeType = mimeType;
	      });
	    }

	    // TODO(pierre): real ad-insert support
	    if (subType == "ADVT") {
	      return null;
	    }

	    return {
	      type: type,
	      index: index,
	      representations: representations,
	      name: root.getAttribute("Name"),
	      lang: root.getAttribute("Language"),
	      baseURL: root.getAttribute("Url")
	    };
	  }

	  function parseFromString(manifest) {
	    return parseFromDocument(new DOMParser().parseFromString(manifest, "application/xml"));
	  }

	  function parseFromDocument(doc) {
	    var root = doc.documentElement;
	    assert.equal(root.nodeName, "SmoothStreamingMedia", "parser: document root should be SmoothStreamingMedia");
	    assert(/^[2]-[0-2]$/.test(root.getAttribute("MajorVersion") + "-" + root.getAttribute("MinorVersion")), "Version should be 2.0, 2.1 or 2.2");

	    var timescale = +root.getAttribute("Timescale") || 10000000;
	    var adaptationCount = 0;

	    var _reduceChildren2 = reduceChildren(root, function (res, name, node) {
	      switch (name) {
	        case "Protection":
	          res.protection = parseProtection(node);break;
	        case "StreamIndex":
	          var ada = parseAdaptation(node, timescale);
	          if (ada) {
	            ada.id = adaptationCount++;
	            res.adaptations.push(ada);
	          }
	          break;
	      }
	      return res;
	    }, {
	      protection: null,
	      adaptations: []
	    });

	    var protection = _reduceChildren2.protection;
	    var adaptations = _reduceChildren2.adaptations;


	    adaptations.forEach(function (a) {
	      return a.smoothProtection = protection;
	    });

	    var suggestedPresentationDelay = undefined,
	        presentationLiveGap = undefined,
	        timeShiftBufferDepth = undefined,
	        availabilityStartTime = undefined;

	    var isLive = parseBoolean(root.getAttribute("IsLive"));
	    if (isLive) {
	      suggestedPresentationDelay = SUGGESTED_PERSENTATION_DELAY;
	      timeShiftBufferDepth = +root.getAttribute("DVRWindowLength") / timescale;
	      availabilityStartTime = REFERENCE_DATE_TIME;
	      var video = find(adaptations, function (a) {
	        return a.type == "video";
	      });
	      var audio = find(adaptations, function (a) {
	        return a.type == "audio";
	      });
	      var lastRef = Math.min(calcLastRef(video.index), calcLastRef(audio.index));
	      presentationLiveGap = Date.now() / 1000 - (lastRef + availabilityStartTime);
	    }

	    return {
	      transportType: "smoothstreaming",
	      profiles: "",
	      type: isLive ? "dynamic" : "static",
	      suggestedPresentationDelay: suggestedPresentationDelay,
	      timeShiftBufferDepth: timeShiftBufferDepth,
	      presentationLiveGap: presentationLiveGap,
	      availabilityStartTime: availabilityStartTime,
	      periods: [{
	        duration: (+root.getAttribute("Duration") || Infinity) / timescale,
	        adaptations: adaptations,
	        laFragCount: +root.getAttribute("LookAheadFragmentCount")
	      }]
	    };
	  }

	  function parser(val) {
	    if (typeof val == "string") {
	      return parseFromString(val);
	    } else {
	      return parseFromDocument(val);
	    }
	  }

	  parser.parseFromString = parseFromString;
	  parser.parseFromDocument = parseFromDocument;

	  return parser;
	}

	module.exports = createSmoothStreamingParser;

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var assert = __webpack_require__(7);
	var HTML_ENTITIES = /&#([0-9]+);/g;
	var BR = /<br>/gi;
	var STYLE = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i;
	var PARAG = /\s*<p class=([^>]+)>(.*)/i;
	var START = /<sync[^>]+?start="?([0-9]*)"?[^0-9]/i;

	// Really basic CSS parsers using regular-expressions.
	function rulesCss(str) {
	  var ruleRe = /\.(\S+)\s*{([^}]*)}/gi;
	  var langs = {};
	  var m = undefined;
	  while (m = ruleRe.exec(str)) {
	    var name = m[1];
	    var lang = propCss(m[2], "lang");
	    if (name && lang) {
	      langs[lang] = name;
	    }
	  }
	  return langs;
	}

	function propCss(str, name) {
	  return str.match(new RegExp("\\s*" + name + ":\\s*(\\S+);", "i"))[1];
	}

	function decodeEntities(text) {
	  return text.replace(BR, "\n").replace(HTML_ENTITIES, function ($0, $1) {
	    return String.fromCharCode($1);
	  });
	}

	// Because sami is not really html... we have to use
	// some kind of regular expressions to parse it...
	// the cthulhu way :)
	// The specification being quite clunky, this parser
	// may not work for every sami input.
	function parseSami(smi, lang) {
	  var syncOp = /<sync[ >]/ig;
	  var syncCl = /<sync[ >]|<\/body>/ig;

	  var subs = [];

	  var _smi$match = smi.match(STYLE);

	  var css = _smi$match[1];

	  var up = undefined,
	      to = syncCl.exec(smi);

	  var langs = rulesCss(css);
	  var klass = langs[lang];

	  assert(klass, "sami: could not find lang " + lang + " in CSS");

	  for (;;) {
	    up = syncOp.exec(smi);
	    to = syncCl.exec(smi);
	    if (!up && !to) {
	      break;
	    }
	    if (!up || !to || up.index >= to.index) {
	      throw new Error("parse error");
	    }

	    var str = smi.slice(up.index, to.index);
	    var tim = str.match(START);
	    if (!tim) {
	      throw new Error("parse error: sync time attribute");
	    }

	    var start = +tim[1];
	    if (isNaN(start)) {
	      throw new Error("parse error: sync time attribute NaN");
	    }

	    appendSub(subs, str.split("\n"), start / 1000);
	  }

	  return subs;

	  function appendSub(subs, lines, start) {
	    var i = lines.length,
	        m = undefined;
	    while (--i >= 0) {
	      m = lines[i].match(PARAG);
	      if (!m) {
	        continue;
	      }

	      var _m = m;
	      var kl = _m[1];
	      var txt = _m[2];


	      if (klass !== kl) {
	        continue;
	      }

	      if (txt === "&nbsp;") {
	        subs[subs.length - 1].end = start;
	      } else {
	        subs.push({ text: decodeEntities(txt), start: start });
	      }
	    }
	  }
	}

	module.exports = { parseSami: parseSami };

/***/ },
/* 367 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var rBr = /<br[^>]+>/gm;
	var rAbsTime = /^(([0-9]+):)?([0-9]+):([0-9]+)(\.([0-9]+))?$/;
	var rRelTime = /(([0-9]+)(\.[0-9]+)?)(ms|h|m|s)/;

	var escape = window.escape;

	var MULTS = {
	  h: 3600,
	  m: 60,
	  s: 1,
	  ms: 0.001
	};

	function parseTTML(ttml, lang, offset) {
	  var doc = undefined;
	  if (typeof ttml == "string") {
	    doc = new DOMParser().parseFromString(ttml, "text/xml");
	  } else {
	    doc = ttml;
	  }

	  if (!(doc instanceof window.Document || doc instanceof window.HTMLElement)) {
	    throw new Error("ttml: needs a Document to parse");
	  }

	  var node = doc.querySelector("tt");
	  if (!node) {
	    throw new Error("ttml: could not find <tt> tag");
	  }

	  var subs = parseChildren(node.querySelector("body"), 0);
	  for (var i = 0; i < subs.length; i++) {
	    var s = subs[i];
	    s.start += offset;
	    s.end += offset;
	  }

	  return subs;
	}

	// Parse the children of the given node recursively
	function parseChildren(node, parentOffset) {
	  var siblingOffset = 0;
	  node = node.firstChild;
	  var arr = [];
	  var sub = undefined;

	  while (node) {
	    if (node.nodeType === 1) {
	      switch (node.tagName.toUpperCase()) {
	        case "P":
	          // p is a textual node, process contents as subtitle
	          sub = parseNode(node, parentOffset, siblingOffset);
	          siblingOffset = sub.end;
	          arr.push(sub);
	          break;
	        case "DIV":
	          // div is container for subtitles, recurse
	          var newOffset = parseTimestamp(node.getAttribute("begin"), 0);
	          if (newOffset == null) {
	            newOffset = parentOffset;
	          }
	          arr.push.apply(arr, parseChildren(node, newOffset));
	          break;
	      }
	    }
	    node = node.nextSibling;
	  }

	  return arr;
	}

	// Parse a node for text content
	function parseNode(node, parentOffset, siblingOffset) {
	  var start = parseTimestamp(node.getAttribute("begin"), parentOffset);
	  var end = parseTimestamp(node.getAttribute("end"), parentOffset);
	  var dur = parseTimestamp(node.getAttribute("dur"), 0);

	  if (!(typeof start === "undefined" ? "undefined" : _typeof(start)) == "number" && !(typeof end === "undefined" ? "undefined" : _typeof(end)) == "number" && !(typeof dur === "undefined" ? "undefined" : _typeof(dur)) == "number") {
	    throw new Error("ttml: unsupported timestamp format");
	  }

	  if (dur > 0) {
	    if (start == null) {
	      start = siblingOffset || parentOffset;
	    }
	    if (end == null) {
	      end = start + dur;
	    }
	  } else if (end == null) {
	    // No end given, infer duration if possible
	    // Otherwise, give end as MAX_VALUE
	    end = parseTimestamp(node.getAttribute("duration"), 0);
	    if (end >= 0) {
	      end += start;
	    } else {
	      end = Number.MAX_VALUE;
	    }
	  }

	  return {
	    // Trim left and right whitespace from text and convert non-explicit line breaks
	    id: node.getAttribute("xml:id") || node.getAttribute("id"),
	    text: decodeURIComponent(escape(node.innerHTML.replace(rBr, "\n"))),
	    start: start, end: end
	  };
	}

	// Time may be:
	//   * absolute to timeline (hh:mm:ss.ms)
	//   * relative (decimal followed by metric) ex: 3.4s, 5.7m
	function parseTimestamp(time, offset) {
	  if (!time) {
	    return null;
	  }

	  var match = undefined;

	  // Parse absolute times ISO 8601 format ([hh:]mm:ss[.mmm])
	  match = time.match(rAbsTime);
	  if (match) {
	    var _match = match;
	    var h = _match[2];
	    var m = _match[3];
	    var s = _match[4];
	    var ms = _match[6];

	    return parseInt(h || 0, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10) + parseFloat("0." + ms);
	  }

	  // Parse relative times (fraction followed by a unit metric d.ddu)
	  match = time.match(rRelTime);
	  if (match) {
	    var _match2 = match;
	    var n = _match2[1];
	    var metric = _match2[4];

	    return parseFloat(n) * MULTS[metric] + offset;
	  }

	  return null;
	}

	module.exports = { parseTTML: parseTTML };

/***/ },
/* 368 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var SimpleSet = function () {
	  function SimpleSet() {
	    _classCallCheck(this, SimpleSet);

	    this.hash = {};
	  }

	  SimpleSet.prototype.add = function add(x) {
	    this.hash[x] = true;
	  };

	  SimpleSet.prototype.remove = function remove(x) {
	    delete this.hash[x];
	  };

	  SimpleSet.prototype.test = function test(x) {
	    return this.hash[x] === true;
	  };

	  return SimpleSet;
	}();

	module.exports = { SimpleSet: SimpleSet };

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var _require = __webpack_require__(32);

	var bufferedToArray = _require.bufferedToArray;


	var interval = undefined;
	var closeBtn = undefined;

	var reUnescapedHtml = /[&<>"']/g;
	var htmlEscapes = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  "\"": "&quot;",
	  "'": "&#39;"
	};

	function escape(string) {
	  return string == null ? "" : String(string).replace(reUnescapedHtml, function (match) {
	    return htmlEscapes[match];
	  });
	}

	function bpsToKbps(b) {
	  return (b / 1000).toFixed(3);
	}

	function getDebug(player) {
	  var avr = player.getAverageBitrates();

	  var avrAudio = undefined,
	      avrVideo = undefined;
	  avr.video.take(1).subscribe(function (a) {
	    return avrVideo = a | 0;
	  });
	  avr.audio.take(1).subscribe(function (a) {
	    return avrAudio = a | 0;
	  });

	  return {
	    manifest: player.man,
	    version: player.version,
	    timeFragment: player.frag,
	    currentTime: player.getCurrentTime(),
	    state: player.getPlayerState(),
	    buffer: bufferedToArray(player.video.buffered),
	    volume: player.getVolume(),
	    video: {
	      adaptation: player.adas.video,
	      representation: player.reps.video,
	      maxBitrate: player.getVideoMaxBitrate(),
	      bufferSize: player.getVideoBufferSize(),
	      avrBitrate: avrVideo
	    },
	    audio: {
	      adaptation: player.adas.audio,
	      representation: player.reps.audio,
	      maxBitrate: player.getAudioMaxBitrate(),
	      bufferSize: player.getAudioBufferSize(),
	      avrBitrate: avrAudio
	    }
	  };
	}

	function update(player, videoElement) {
	  var infoElement = videoElement.parentNode.querySelector("#cp--debug-infos-content");
	  if (infoElement) {
	    var infos = undefined;
	    try {
	      infos = getDebug(player);
	    } catch (e) {
	      return;
	    }

	    var _infos = infos;
	    var video = _infos.video;
	    var audio = _infos.audio;
	    var manifest = _infos.manifest;


	    var secureHTML = "<b>Player v" + infos.version + "</b> (" + infos.state + ")<br>";

	    if (manifest && video && audio) {
	      secureHTML += ["Container: " + escape(manifest.transportType), "Live: " + escape("" + manifest.isLive),
	      // `Playing bitrate: ${video.representation.bitrate}/${audio.representation.bitrate}`,
	      "Downloading bitrate (Kbit/s):\n          " + bpsToKbps(video.representation.bitrate) + "/" + bpsToKbps(audio.representation.bitrate), "Estimated bandwidth (Kbit/s):\n          " + bpsToKbps(video.avrBitrate) + "/" + bpsToKbps(audio.avrBitrate), "Location: " + manifest.locations[0]].join("<br>");
	    }

	    // Representation: ${escape(video.adaptation.id + "/" + video.representation.id)}<br>
	    //  ${getCodec(video.representation)}<br>
	    // Buffered: ${escape(JSON.stringify(infos.buffer))}<br>
	    // <br><b>Audio</b><br>
	    // Representation: ${escape(audio.adaptation.id + "/" + audio.representation.id)}<br>
	    //  ${getCodec(audio.representation)}<br>`;
	    infoElement.innerHTML = secureHTML;
	  }
	}

	function showDebug(player, videoElement) {
	  var secureHTML = "<style>\n#cp--debug-infos {\n  position: absolute;\n  top: " + escape(videoElement.offsetTop + 10) + "px;\n  left: " + escape(videoElement.offsetLeft + 10) + "px;\n  width: 500px;\n  height: 300px;\n  background-color: rgba(10, 10, 10, 0.83);\n  overflow: hidden;\n  color: white;\n  text-align: left;\n  padding: 2em;\n  box-sizing: border-box;\n}\n#cp--debug-hide-infos {\n  float: right;\n  cursor: pointer;\n}\n</style>\n<div id=\"cp--debug-infos\">\n  <a id=\"cp--debug-hide-infos\">[x]</a>\n  <p id=\"cp--debug-infos-content\"></p>\n</div>";

	  var videoParent = videoElement.parentNode;

	  var container = videoParent.querySelector("#cp--debug-infos-container");
	  if (!container) {
	    container = document.createElement("div");
	    container.setAttribute("id", "cp--debug-infos-container");
	    videoParent.appendChild(container);
	  }
	  container.innerHTML = secureHTML;

	  if (!closeBtn) {
	    closeBtn = videoParent.querySelector("#cp--debug-hide-infos");
	    closeBtn.addEventListener("click", function () {
	      return hideDebug(videoElement);
	    });
	  }

	  if (interval) {
	    clearInterval(interval);
	  }
	  interval = setInterval(function () {
	    return update(player, videoElement);
	  }, 1000);

	  update(player, videoElement);
	}

	function hideDebug(videoElement) {
	  var container = videoElement.parentNode.querySelector("#cp--debug-infos-container");
	  if (container) {
	    container.parentNode.removeChild(container);
	  }
	  if (interval) {
	    clearInterval(interval);
	    interval = null;
	  }
	  if (closeBtn) {
	    closeBtn.removeEventListener("click", hideDebug);
	    closeBtn = null;
	  }
	}

	function toggleDebug(player, videoElement) {
	  var container = videoElement.parentNode.querySelector("#cp--debug-infos-container");
	  if (container) {
	    hideDebug(videoElement);
	  } else {
	    showDebug(player, videoElement);
	  }
	}

	module.exports = {
	  getDebug: getDebug,
	  showDebug: showDebug,
	  hideDebug: hideDebug,
	  toggleDebug: toggleDebug
	};

/***/ },
/* 370 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * A doubly linked list-based Least Recently Used (LRU) cache. Will
	 * keep most recently used items while discarding least recently used
	 * items when its limit is reached.
	 *
	 * Licensed under MIT. Copyright (c) 2010 Rasmus Andersson
	 * <http://hunch.se/> See README.md for details.
	 *
	 * Illustration of the design:
	 *
	 *       entry             entry             entry             entry
	 *       ______            ______            ______            ______
	 *      | head |.newer => |      |.newer => |      |.newer => | tail |
	 *      |  A   |          |  B   |          |  C   |          |  D   |
	 *      |______| <= older.|______| <= older.|______| <= older.|______|
	 *
	 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
	 */

	var LRUCache = function () {
	  function LRUCache(limit) {
	    _classCallCheck(this, LRUCache);

	    this.size = 0;
	    this.limit = limit;
	    this._keymap = {};
	    this.head = null;
	    this.tail = null;
	  }

	  LRUCache.prototype.set = function set(key, value) {
	    var entry = {
	      key: key,
	      value: value,
	      newer: null,
	      older: null
	    };

	    this._keymap[key] = entry;

	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }

	    this.tail = entry;

	    if (this.size === this.limit) {
	      return this.shift();
	    } else {
	      this.size++;
	      return null;
	    }
	  };

	  LRUCache.prototype.shift = function shift() {
	    var entry = this.head;
	    if (entry) {
	      if (this.head.newer) {
	        this.head = this.head.newer;
	        this.head.older = null;
	      } else {
	        this.head = null;
	      }
	      entry.newer = entry.older = null;
	      delete this._keymap[entry.key];
	    }

	    return entry;
	  };

	  LRUCache.prototype.get = function get(key) {
	    var entry = this._keymap[key];
	    if (entry == null) {
	      return;
	    }

	    if (entry === this.tail) {
	      return entry.value;
	    }

	    if (entry.newer) {
	      if (entry === this.head) {
	        this.head = entry.newer;
	      }
	      entry.newer.older = entry.older;
	    }
	    if (entry.older) {
	      entry.older.newer = entry.newer;
	    }

	    entry.newer = null;
	    entry.older = this.tail;

	    if (this.tail) {
	      this.tail.newer = entry;
	    }

	    this.tail = entry;
	    return entry.value;
	  };

	  return LRUCache;
	}();

	module.exports = LRUCache;

/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(8);

	var Observable = _require.Observable;
	var timer = Observable.timer;

	var _require2 = __webpack_require__(54);

	var getBackedoffDelay = _require2.getBackedoffDelay;

	var debounce = __webpack_require__(55);

	function retryWithBackoff(obs, _ref) {
	  var retryDelay = _ref.retryDelay;
	  var totalRetry = _ref.totalRetry;
	  var shouldRetry = _ref.shouldRetry;
	  var resetDelay = _ref.resetDelay;

	  var retryCount = 0;
	  var debounceRetryCount = undefined;
	  if (resetDelay > 0) {
	    debounceRetryCount = debounce(function () {
	      return retryCount = 0;
	    }, resetDelay);
	  }

	  return obs.catch(function (err, source) {
	    var wantRetry = !shouldRetry || shouldRetry(err, retryCount);
	    if (!wantRetry || retryCount++ >= totalRetry) {
	      throw err;
	    }

	    var fuzzedDelay = getBackedoffDelay(retryDelay, retryCount);
	    return timer(fuzzedDelay).flatMap(function () {
	      debounceRetryCount && debounceRetryCount();
	      return source;
	    });
	  });
	}

	module.exports = { retryWithBackoff: retryWithBackoff };

/***/ }
/******/ ])
});
;