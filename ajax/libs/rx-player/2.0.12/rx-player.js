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
/***/ (function(module, exports, __webpack_require__) {

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

	if (typeof Object.assign != "function") {
	  (function () {
	    Object.assign = function (target) {
	      if (target === undefined || target === null) {
	        throw new TypeError("Cannot convert undefined or null to object");
	      }

	      var output = Object(target);
	      for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (var nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  })();
	}

	__webpack_require__(62);
	__webpack_require__(63);

	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(70);
	__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(83);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(86);

	module.exports = __webpack_require__(140);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var root_1 = __webpack_require__(6);
	var toSubscriber_1 = __webpack_require__(128);
	var observable_1 = __webpack_require__(30);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        } else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
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
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    } catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                } else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}();
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(32);
	var Subscription_1 = __webpack_require__(4);
	var Observer_1 = __webpack_require__(38);
	var rxSubscriber_1 = __webpack_require__(31);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if ((typeof destinationOrNext === 'undefined' ? 'undefined' : _typeof(destinationOrNext)) === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    } else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return this;
	    };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
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
	    return Subscriber;
	}(Subscription_1.Subscription);
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        } else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            } else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                } else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            } else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            } else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                } else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            } else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        } catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        } catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber);
	//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function AssertionError(message) {
	  this.name = "AssertionError";
	  this.message = message;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, AssertionError);
	  }
	}
	AssertionError.prototype = new Error();

	function assert(value, message) {
	  if (!value) {
	    throw new AssertionError(message);
	  }
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var isArray_1 = __webpack_require__(16);
	var isObject_1 = __webpack_require__(127);
	var isFunction_1 = __webpack_require__(32);
	var tryCatch_1 = __webpack_require__(33);
	var errorObject_1 = __webpack_require__(23);
	var UnsubscriptionError_1 = __webpack_require__(126);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this,
	            _unsubscribe = _a._unsubscribe,
	            _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        } else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || teardown === Subscription.EMPTY) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown === 'undefined' ? 'undefined' : _typeof(teardown)) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                } else if (this.closed) {
	                    sub.unsubscribe();
	                } else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
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
	        empty.closed = true;
	        return empty;
	    }(new Subscription());
	    return Subscription;
	}();
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
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
	//# sourceMappingURL=EmptyObservable.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * window: browser in DOM main thread
	 * self: browser in WebWorker
	 * global: Node.js/other
	 */

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.root = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window.window === window && window || (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global.global === global && global;
	if (!exports.root) {
	    throw new Error('RxJS could not find any global context (window, self, global)');
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	function listToMap(list) {
	  var map = list.reduce(function (map, name) {
	    map[name] = name;
	    return map;
	  }, {});

	  map.keys = list;
	  return map;
	}

	var ErrorTypes = listToMap(["NETWORK_ERROR", "MEDIA_ERROR", "ENCRYPTED_MEDIA_ERROR", "INDEX_ERROR", "OTHER_ERROR"]);

	var RequestErrorTypes = listToMap(["TIMEOUT", "ERROR_EVENT", "ERROR_HTTP_CODE", "PARSE_ERROR"]);

	var ErrorCodes = listToMap(["PIPELINE_RESOLVE_ERROR", "PIPELINE_LOAD_ERROR", "PIPELINE_PARSING_ERROR", "MANIFEST_PARSE_ERROR", "MANIFEST_INCOMPATIBLE_CODECS_ERROR", "MEDIA_IS_ENCRYPTED_ERROR", "KEY_ERROR", "KEY_STATUS_CHANGE_ERROR", "KEY_UPDATE_ERROR", "KEY_LOAD_ERROR", "KEY_LOAD_TIMEOUT", "KEY_GENERATE_REQUEST_ERROR", "INCOMPATIBLE_KEYSYSTEMS", "BUFFER_APPEND_ERROR", "BUFFER_FULL_ERROR", "BUFFER_TYPE_UNKNOWN", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_SOURCE_NOT_SUPPORTED", "MEDIA_KEYS_NOT_SUPPORTED", "OUT_OF_INDEX_ERROR", "UNKNOWN_INDEX"]);

	function errorMessage(name, code, reason) {
	  return name + "(" + code + ")" + (reason ? ": " + reason.message : "");
	}

	function MediaError(code, reason, fatal) {
	  this.name = "MediaError";
	  this.type = ErrorTypes.MEDIA_ERROR;

	  this.reason = reason;
	  this.code = ErrorCodes[code];
	  this.fatal = fatal;
	  this.message = errorMessage(this.name, this.code, this.reason);
	}
	MediaError.prototype = new Error();

	function NetworkError(code, reason, fatal) {
	  this.name = "NetworkError";
	  this.type = ErrorTypes.NETWORK_ERROR;

	  this.xhr = reason.xhr;
	  this.url = reason.url;
	  this.status = reason.status;
	  this.reqType = reason.type;

	  this.reason = reason;
	  this.code = ErrorCodes[code];
	  this.fatal = fatal;
	  if (this.reason) {
	    this.message = errorMessage(this.name, this.code, this.reason);
	  } else {
	    var reasonMessage = "" + this.reqType + (this.status > 0 ? "(" + this.status + ")" : "") + " on " + this.url;
	    this.message = errorMessage(this.name, this.code, { message: reasonMessage });
	  }
	}
	NetworkError.prototype = new Error();

	NetworkError.prototype.isHttpError = function (httpErrorCode) {
	  return this.reqType == RequestErrorTypes.ERROR_HTTP_CODE && this.status == httpErrorCode;
	};

	function EncryptedMediaError(code, reason, fatal) {
	  this.name = "EncryptedMediaError";
	  this.type = ErrorTypes.ENCRYPTED_MEDIA_ERROR;

	  this.reason = reason;
	  this.code = ErrorCodes[code];
	  this.fatal = fatal;
	  this.message = errorMessage(this.name, this.code, this.reason);
	}
	EncryptedMediaError.prototype = new Error();

	function IndexError(code, indexType, fatal) {
	  this.name = "IndexError";
	  this.type = ErrorTypes.INDEX_ERROR;

	  this.indexType = indexType;

	  this.reason = null;
	  this.code = ErrorCodes[code];
	  this.fatal = fatal;
	  this.message = errorMessage(this.name, this.code, null);
	}
	IndexError.prototype = new Error();

	function OtherError(code, reason, fatal) {
	  this.name = "OtherError";
	  this.type = ErrorTypes.OTHER_ERROR;

	  this.reason = reason;
	  this.code = ErrorCodes[code];
	  this.fatal = fatal;
	  this.message = errorMessage(this.name, this.code, this.reason);
	}
	OtherError.prototype = new Error();

	function RequestError(xhr, request, type) {
	  this.name = "RequestError";
	  this.url = request.url;
	  this.xhr = xhr;
	  this.status = xhr.status;
	  this.type = type;
	  this.message = type;
	}
	RequestError.prototype = new Error();

	function isKnownError(error) {
	  return !!error && !!error.type && ErrorTypes.keys.indexOf(error.type) >= 0;
	}

	module.exports = {
	  ErrorTypes: ErrorTypes,
	  ErrorCodes: ErrorCodes,

	  MediaError: MediaError,
	  NetworkError: NetworkError,
	  EncryptedMediaError: EncryptedMediaError,
	  IndexError: IndexError,
	  OtherError: OtherError,

	  RequestError: RequestError,
	  RequestErrorTypes: RequestErrorTypes,
	  isKnownError: isKnownError
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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
	var Subscription_1 = __webpack_require__(4);
	var ObjectUnsubscribedError_1 = __webpack_require__(47);
	var SubjectSubscription_1 = __webpack_require__(61);
	var rxSubscriber_1 = __webpack_require__(31);
	/**
	 * @class SubjectSubscriber<T>
	 */
	var SubjectSubscriber = function (_super) {
	    __extends(SubjectSubscriber, _super);
	    function SubjectSubscriber(destination) {
	        _super.call(this, destination);
	        this.destination = destination;
	    }
	    return SubjectSubscriber;
	}(Subscriber_1.Subscriber);
	exports.SubjectSubscriber = SubjectSubscriber;
	/**
	 * @class Subject<T>
	 */
	var Subject = function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        _super.call(this);
	        this.observers = [];
	        this.closed = false;
	        this.isStopped = false;
	        this.hasError = false;
	        this.thrownError = null;
	    }
	    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return new SubjectSubscriber(this);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        if (!this.isStopped) {
	            var observers = this.observers;
	            var len = observers.length;
	            var copy = observers.slice();
	            for (var i = 0; i < len; i++) {
	                copy[i].next(value);
	            }
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.hasError = true;
	        this.thrownError = err;
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].error(err);
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.complete = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].complete();
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = true;
	        this.closed = true;
	        this.observers = null;
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        } else if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1.Subscription.EMPTY;
	        } else if (this.isStopped) {
	            subscriber.complete();
	            return Subscription_1.Subscription.EMPTY;
	        } else {
	            this.observers.push(subscriber);
	            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable);
	exports.Subject = Subject;
	/**
	 * @class AnonymousSubject<T>
	 */
	var AnonymousSubject = function (_super) {
	    __extends(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var destination = this.destination;
	        if (destination && destination.next) {
	            destination.next(value);
	        }
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var destination = this.destination;
	        if (destination && destination.error) {
	            this.destination.error(err);
	        }
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var destination = this.destination;
	        if (destination && destination.complete) {
	            this.destination.complete();
	        }
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var source = this.source;
	        if (source) {
	            return this.source.subscribe(subscriber);
	        } else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    return AnonymousSubject;
	}(Subject);
	exports.AnonymousSubject = AnonymousSubject;
	//# sourceMappingURL=Subject.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var ScalarObservable_1 = __webpack_require__(26);
	var EmptyObservable_1 = __webpack_require__(5);
	var isScheduler_1 = __webpack_require__(17);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
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
	    /**
	     * Creates an Observable that emits some values you specify as arguments,
	     * immediately one after the other, and then emits a complete notification.
	     *
	     * <span class="informal">Emits the arguments you provide, then completes.
	     * </span>
	     *
	     * <img src="./img/of.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the arguments given, and the complete notification thereafter. It can
	     * be used for composing with other Observables, such as with {@link concat}.
	     * By default, it uses a `null` Scheduler, which means the `next`
	     * notifications are sent synchronously, although with a different Scheduler
	     * it is possible to determine when those notifications will be delivered.
	     *
	     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
	     * var numbers = Rx.Observable.of(10, 20, 30);
	     * var letters = Rx.Observable.of('a', 'b', 'c');
	     * var interval = Rx.Observable.interval(1000);
	     * var result = numbers.concat(letters).concat(interval);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link throw}
	     *
	     * @param {...T} values Arguments that represent `next` values to be emitted.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emissions of the `next` notifications.
	     * @return {Observable<T>} An Observable that emits each given input value.
	     * @static true
	     * @name of
	     * @owner Observable
	     */
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
	            return new EmptyObservable_1.EmptyObservable(scheduler);
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
	        if (subscriber.closed) {
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
	            for (var i = 0; i < count && !subscriber.closed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1.Observable);
	exports.ArrayObservable = ArrayObservable;
	//# sourceMappingURL=ArrayObservable.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var merge_1 = __webpack_require__(108);
	exports.merge = merge_1.mergeStatic;
	//# sourceMappingURL=merge.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var root_1 = __webpack_require__(6);
	var isArray_1 = __webpack_require__(16);
	var isPromise_1 = __webpack_require__(50);
	var Observable_1 = __webpack_require__(1);
	var iterator_1 = __webpack_require__(29);
	var InnerSubscriber_1 = __webpack_require__(58);
	var observable_1 = __webpack_require__(30);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.closed) {
	        return null;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return null;
	        } else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.closed) {
	            destination.complete();
	        }
	    } else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.closed) {
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
	    } else if (typeof result[iterator_1.$$iterator] === 'function') {
	        var iterator = result[iterator_1.$$iterator]();
	        do {
	            var item = iterator.next();
	            if (item.done) {
	                destination.complete();
	                break;
	            }
	            destination.next(item.value);
	            if (destination.closed) {
	                break;
	            }
	        } while (true);
	    } else if (typeof result[observable_1.$$observable] === 'function') {
	        var obs = result[observable_1.$$observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error(new Error('invalid observable'));
	        } else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    } else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	    return null;
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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

	var log = __webpack_require__(9);
	var EventEmitter = __webpack_require__(35);

	var _require = __webpack_require__(18),
	    bytesToStr = _require.bytesToStr,
	    strToBytes = _require.strToBytes;

	var assert = __webpack_require__(3);

	var _require2 = __webpack_require__(1),
	    Observable = _require2.Observable;

	var _require3 = __webpack_require__(12),
	    merge = _require3.merge;

	var fromEvent = __webpack_require__(40).FromEventObservable.create;
	var never = __webpack_require__(93).NeverObservable.create;
	var defer = __webpack_require__(39).DeferObservable.create;

	var _require4 = __webpack_require__(15),
	    on = _require4.on,
	    castToObservable = _require4.castToObservable;

	var _require5 = __webpack_require__(7),
	    MediaError = _require5.MediaError;

	var doc = document;
	var win = window;

	var PREFIXES = ["", "webkit", "moz", "ms"];

	var HTMLElement_ = win.HTMLElement;
	var HTMLVideoElement_ = win.HTMLVideoElement;

	var MediaSource_ = win.MediaSource || win.MozMediaSource || win.WebKitMediaSource || win.MSMediaSource;

	var MediaKeys_ = win.MediaKeys || win.MozMediaKeys || win.WebKitMediaKeys || win.MSMediaKeys;

	var isIE = navigator.appName == "Microsoft Internet Explorer" || navigator.appName == "Netscape" && /(Trident|Edge)\//.test(navigator.userAgent);

	var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;

	var HAVE_METADATA = 1;
	var HAVE_ENOUGH_DATA = 4;

	var MockMediaKeys = function MockMediaKeys() {};

	var requestMediaKeySystemAccess = void 0;
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
	  return eventNames.reduce(function (parent, name) {
	    return parent.concat((prefixes || PREFIXES).map(function (p) {
	      return p + name;
	    }));
	  }, []);
	}

	function findSupportedEvent(element, eventNames) {
	  return eventNames.filter(function (name) {
	    return isEventSupported(element, name);
	  })[0];
	}

	function compatibleListener(eventNames, prefixes) {
	  var mem = void 0;
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
	    var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

	  MockMediaKeySession.prototype = Object.assign({
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
	  }, EventEmitter.prototype);

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
	      var videoCapabilities = keySystemConfiguration.videoCapabilities,
	          audioCapabilities = keySystemConfiguration.audioCapabilities,
	          initDataTypes = keySystemConfiguration.initDataTypes,
	          sessionTypes = keySystemConfiguration.sessionTypes,
	          distinctiveIdentifier = keySystemConfiguration.distinctiveIdentifier,
	          persistentState = keySystemConfiguration.persistentState;


	      var supported = true;
	      supported = supported && (!initDataTypes || !!initDataTypes.filter(function (initDataType) {
	        return initDataType === "cenc";
	      })[0]);
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
	}

	// A MediaKeys object exist (or a mock) but no create function is
	// available. We need to add recent apis using Promises to mock the
	// most recent MediaKeys apis.
	// This is for IE11
	else if (MediaKeys_ && !requestMediaKeySystemAccess) {

	    var SessionProxy = function SessionProxy(mk) {
	      EventEmitter.call(this);
	      this.sessionId = "";
	      this._mk = mk;
	    };

	    SessionProxy.prototype = Object.assign({
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
	    }, EventEmitter.prototype);

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
	        var videoCapabilities = keySystemConfiguration.videoCapabilities,
	            audioCapabilities = keySystemConfiguration.audioCapabilities,
	            initDataTypes = keySystemConfiguration.initDataTypes,
	            distinctiveIdentifier = keySystemConfiguration.distinctiveIdentifier;


	        var supported = true;
	        supported = supported && (!initDataTypes || !!initDataTypes.filter(function (idt) {
	          return idt === "cenc";
	        })[0]);
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
	  }

	if (!MediaKeys_) {
	  var noMediaKeys = function noMediaKeys() {
	    throw new MediaError("MEDIA_KEYS_NOT_SUPPORTED", null, true);
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
	}

	var setMediaKeys = function setMediaKeys(elt, mk) {
	  return defer(function () {
	    return castToObservable(_setMediaKeys(elt, mk));
	  });
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
	      throw new Error("updating");
	    }
	    this.trigger("updatestart");
	    this.updating = true;
	    try {
	      this.append(data);
	    } catch (error) {
	      this.__emitUpdate("error", error);
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
	  var prefix = void 0;
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

	function addTextTrack(video, hideNativeSubtitle) {
	  var track = void 0,
	      trackElement = void 0;
	  var kind = "subtitles";
	  if (isIE) {
	    var tracksLength = video.textTracks.length;
	    track = tracksLength > 0 ? video.textTracks[tracksLength - 1] : video.addTextTrack(kind);
	    track.mode = hideNativeSubtitle ? track.HIDDEN : track.SHOWING;
	  } else {
	    // there is no removeTextTrack method... so we need to reuse old
	    // text-tracks objects and clean all its pending cues
	    trackElement = document.createElement("track");
	    video.appendChild(trackElement);
	    track = trackElement.track;
	    trackElement.kind = kind;
	    track.mode = hideNativeSubtitle ? "hidden" : "showing";
	  }
	  return { track: track, trackElement: trackElement };
	}

	function isVTTSupported() {
	  return !isIE;
	}

	function isPlaybackStuck(timing) {
	  // firefox fix: sometimes, the stream can be stalled, even if we are in a buffer.
	  var FREEZE_THRESHOLD = 10; // video freeze threshold in seconds
	  return isFirefox && timing.name === "timeupdate" && timing.range && timing.range.end - timing.ts > FREEZE_THRESHOLD;
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

	  addTextTrack: addTextTrack,
	  isVTTSupported: isVTTSupported,
	  isPlaybackStuck: isPlaybackStuck,
	  isIE: isIE,
	  isFirefox: isFirefox
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(1),
	    Observable = _require.Observable;

	var _require2 = __webpack_require__(12),
	    merge = _require2.merge;

	var fromEvent = __webpack_require__(40).FromEventObservable.create;
	var fromPromise = __webpack_require__(41).PromiseObservable.create;

	function on(elt, evts) {
	  if (Array.isArray(evts)) {
	    return merge.apply(null, evts.map(function (evt) {
	      return fromEvent(elt, evt);
	    }));
	  } else {
	    return fromEvent(elt, evts);
	  }
	}

	function castToObservable(value) {
	  if (value instanceof Observable) {
	    return value;
	  }

	  if (value && typeof value.subscribe == "function") {
	    return new Observable(function (obs) {
	      var sub = value.subscribe(function (val) {
	        return obs.next(val);
	      }, function (err) {
	        return obs.error(err);
	      }, function () {
	        return obs.complete();
	      });

	      return function () {
	        if (sub && sub.dispose) {
	          sub.dispose();
	        } else if (sub && sub.unsubscribe) {
	          sub.unsubscribe();
	        }
	      };
	    });
	  }

	  if (value && typeof value.then == "function") {
	    return fromPromise(value);
	  }

	  return Observable.of(value);
	}

	var OnlyObservable = function (_Observable) {
	  _inherits(OnlyObservable, _Observable);

	  function OnlyObservable(value) {
	    _classCallCheck(this, OnlyObservable);

	    var _this = _possibleConstructorReturn(this, _Observable.call(this));

	    _this.value = value;
	    return _this;
	  }

	  OnlyObservable.prototype._subscribe = function _subscribe(subscriber) {
	    subscriber.next(this.value);
	  };

	  return OnlyObservable;
	}(Observable);

	function only(value) {
	  return new OnlyObservable(value);
	}

	function tryCatch(func, args) {
	  try {
	    return func(args);
	  } catch (e) {
	    return Observable.throw(e);
	  }
	}

	module.exports = {
	  on: on,
	  only: only,
	  tryCatch: tryCatch,
	  castToObservable: castToObservable
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	exports.isArray = Array.isArray || function (x) {
	  return x && typeof x.length === 'number';
	};
	//# sourceMappingURL=isArray.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";

	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	exports.isScheduler = isScheduler;
	//# sourceMappingURL=isScheduler.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var assert = __webpack_require__(3);

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
	  }
	  return str;
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
	  if (!sep) {
	    sep = "";
	  }

	  var hex = "";
	  for (var i = 0; i < bytes.byteLength; i++) {
	    hex += (bytes[i] >>> 4).toString(16);
	    hex += (bytes[i] & 0xF).toString(16);
	    if (sep.length) {
	      hex += sep;
	    }
	  }
	  return hex;
	}

	function concat() {
	  var l = arguments.length;
	  var i = -1;
	  var len = 0;
	  var arg = void 0;
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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isScheduler_1 = __webpack_require__(17);
	var isArray_1 = __webpack_require__(16);
	var ArrayObservable_1 = __webpack_require__(11);
	var combineLatest_1 = __webpack_require__(97);
	/* tslint:enable:max-line-length */
	/**
	 * Combines multiple Observables to create an Observable whose values are
	 * calculated from the latest values of each of its input Observables.
	 *
	 * <span class="informal">Whenever any input Observable emits a value, it
	 * computes a formula using the latest values from all the inputs, then emits
	 * the output of that formula.</span>
	 *
	 * <img src="./img/combineLatest.png" width="100%">
	 *
	 * `combineLatest` combines the values from all the Observables passed as
	 * arguments. This is done by subscribing to each Observable, in order, and
	 * collecting an array of each of the most recent values any time any of the
	 * input Observables emits, then either taking that array and passing it as
	 * arguments to an optional `project` function and emitting the return value of
	 * that, or just emitting the array of recent values directly if there is no
	 * `project` function.
	 *
	 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
	 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
	 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
	 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
	 * bmi.subscribe(x => console.log('BMI is ' + x));
	 *
	 * @see {@link combineAll}
	 * @see {@link merge}
	 * @see {@link withLatestFrom}
	 *
	 * @param {Observable} observable1 An input Observable to combine with the
	 * source Observable.
	 * @param {Observable} observable2 An input Observable to combine with the
	 * source Observable. More than one input Observables may be given as argument.
	 * @param {function} [project] An optional function to project the values from
	 * the combined latest values into a new value on the output Observable.
	 * @param {Scheduler} [scheduler=null] The Scheduler to use for subscribing to
	 * each input Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @static true
	 * @name combineLatest
	 * @owner Observable
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
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
	}
	exports.combineLatest = combineLatest;
	//# sourceMappingURL=combineLatest.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);

	// Factor for rounding errors
	var EPSILON = 1 / 60;

	function nearlyEqual(a, b) {
	  return Math.abs(a - b) < EPSILON;
	}

	function nearlyLt(a, b) {
	  return a - b <= EPSILON;
	}

	function bufferedToRanges(ranges) {
	  var l = ranges.length;
	  var a = [];
	  for (var i = 0; i < l; i++) {
	    a.push(new Range(ranges.start(i), ranges.end(i), 0));
	  }
	  return a;
	}

	function cloneRanges(ranges) {
	  var l = ranges.length;
	  var a = [];
	  for (var i = 0; i < l; i++) {
	    a.push(ranges[i].clone());
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
	  return new Range(start, end, bitrate);
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
	    if (range.isNil()) {
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

	function insertInto(ranges, addedRange) {
	  if (addedRange.isNil()) {
	    return ranges;
	  }

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
	            addedRange = new Range(addedRange.end, memCurrentEnd, currentRange.bitrate);
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

	function normalizeRanges(ranges) {
	  var clonedRanges = cloneRanges(ranges);
	  for (var i = 0; i < clonedRanges.length; i++) {
	    clonedRanges[i].bitrate = 0;
	  }
	  return mergeContiguousRanges(clonedRanges);
	}

	function rangesEquals(ranges, others) {
	  ranges = normalizeRanges(ranges);
	  others = normalizeRanges(ranges);
	  for (var i = 0; i < ranges.length; i++) {
	    var range = ranges[i];
	    var overlappingRange = findOverlappingRange(range, others);
	    if (!overlappingRange || !nearlyEqual(overlappingRange.start, range.start) || !nearlyEqual(overlappingRange.end, range.end)) {
	      return false;
	    }
	  }
	  return true;
	}

	var Range = function () {
	  function Range(start, end, bitrate) {
	    _classCallCheck(this, Range);

	    this.start = start;
	    this.end = end;
	    this.bitrate = bitrate;
	  }

	  Range.prototype.isNil = function isNil() {
	    return this.start === this.end;
	  };

	  Range.prototype.clone = function clone() {
	    return new Range(this.start, this.end, this.bitrate);
	  };

	  return Range;
	}();

	var BufferedRanges = function () {
	  function BufferedRanges(ranges) {
	    _classCallCheck(this, BufferedRanges);

	    var _ranges = void 0;
	    if (!ranges) {
	      _ranges = [];
	    } else if (Array.isArray(ranges)) {
	      _ranges = cloneRanges(ranges);
	    } else {
	      _ranges = bufferedToRanges(ranges);
	    }
	    this.ranges = _ranges;
	    this.length = _ranges.length;
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
	      var _ranges$i = this.ranges[i],
	          start = _ranges$i.start,
	          end = _ranges$i.end;


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
	        nextRangeStart = void 0;
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
	    insertInto(this.ranges, new Range(start, end, bitrate));
	    this.length = this.ranges.length;
	    return this.ranges;
	  };

	  BufferedRanges.prototype.remove = function remove(start, end) {
	    if (false) {
	      assert(start >= 0);
	      assert(end - start > 0);
	    }
	    this.intersect(new BufferedRanges([new Range(0, start, 0), new Range(end, Infinity, 0)]));
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
	  bufferedToRanges: bufferedToRanges,
	  BufferedRanges: BufferedRanges
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	"use strict";

	var MATCH_LEVELS = {
	  PERFECT_MATCH: 0,
	  BASE_LANG_MATCH: 1,
	  OTHER_SUBLANG_MATCH: 2
	};

	var HIGHER_MATCH_LEVEL = MATCH_LEVELS.PERFECT_MATCH;
	var LOSER_MATCH_LEVEL = MATCH_LEVELS.OTHER_SUBLANG_MATCH;

	function match(lang1, lang2, level) {
	  // langs should be normalized
	  if (lang1 === lang2) {
	    return true;
	  }

	  var _lang1$split = lang1.split("-"),
	      base1 = _lang1$split[0];

	  var _lang2$split = lang2.split("-"),
	      base2 = _lang2$split[0];

	  if (level >= MATCH_LEVELS.BASE_LANG_MATCH && lang1 === base2) {
	    return true;
	  }

	  if (level >= MATCH_LEVELS.OTHER_SUBLANG_MATCH && base1 === base2) {
	    return true;
	  }

	  return false;
	}

	function findBetterMatchIndex(langs, lang) {
	  if (!lang) {
	    return -1;
	  }

	  lang = normalize(lang);

	  var level = HIGHER_MATCH_LEVEL;
	  for (; level <= LOSER_MATCH_LEVEL; level++) {
	    for (var i = 0; i < langs.length; i++) {
	      if (match(normalize(langs[i]), lang, level)) {
	        return i;
	      }
	    }
	  }

	  return -1;
	}

	function normalize(lang) {
	  if (lang === null || lang === "") {
	    return "";
	  }
	  var fields = ("" + lang).toLowerCase().split("-");
	  var base = fields[0];
	  var norm = normalizeBase(base);
	  if (norm) {
	    fields[0] = norm;
	  }
	  return fields.join("-");
	}

	function normalizeBase(base) {
	  var result = void 0;
	  if (base.length === 2) {
	    result = ISO_MAP_2_3[base];
	  }
	  if (base.length === 3) {
	    result = ISO_MAP_3_3[base];
	  }
	  return result || base;
	}

	var ISO_MAP_2_3 = {
	  "aa": "aar", "ab": "abk", "ae": "ave", "af": "afr", "ak": "aka", "am": "amh", "an": "arg", "ar": "ara",
	  "as": "asm", "av": "ava", "ay": "aym", "az": "aze", "ba": "bak", "be": "bel", "bg": "bul", "bh": "bih",
	  "bi": "bis", "bm": "bam", "bn": "ben", "bo": "bod", "br": "bre", "bs": "bos", "ca": "cat", "ce": "che",
	  "ch": "cha", "co": "cos", "cr": "cre", "cs": "ces", "cu": "chu", "cv": "chv", "cy": "cym", "da": "dan",
	  "de": "deu", "dv": "div", "dz": "dzo", "ee": "ewe", "el": "ell", "en": "eng", "eo": "epo", "es": "spa",
	  "et": "est", "eu": "baq", "fa": "fas", "ff": "ful", "fi": "fin", "fj": "fij", "fo": "fao", "fr": "fre",
	  "fy": "fry", "ga": "gle", "gd": "gla", "gl": "glg", "gn": "grn", "gu": "guj", "gv": "glv", "ha": "hau",
	  "he": "heb", "hi": "hin", "ho": "hmo", "hr": "hrv", "ht": "hat", "hu": "hun", "hy": "arm", "hz": "her",
	  "ia": "ina", "id": "ind", "ie": "ile", "ig": "ibo", "ii": "iii", "ik": "ipk", "io": "ido", "is": "ice",
	  "it": "ita", "iu": "iku", "ja": "jpn", "jv": "jav", "ka": "geo", "kg": "kon", "ki": "kik", "kj": "kua",
	  "kk": "kaz", "kl": "kal", "km": "khm", "kn": "kan", "ko": "kor", "kr": "kau", "ks": "kas", "ku": "kur",
	  "kv": "kom", "kw": "cor", "ky": "kir", "la": "lat", "lb": "ltz", "lg": "lug", "li": "lim", "ln": "lin",
	  "lo": "lao", "lt": "lit", "lu": "lub", "lv": "lav", "mg": "mlg", "mh": "mah", "mi": "mao", "mk": "mac",
	  "ml": "mal", "mn": "mon", "mr": "mar", "ms": "may", "mt": "mlt", "my": "bur", "na": "nau", "nb": "nob",
	  "nd": "nde", "ne": "nep", "ng": "ndo", "nl": "dut", "nn": "nno", "no": "nor", "nr": "nbl", "nv": "nav",
	  "ny": "nya", "oc": "oci", "oj": "oji", "om": "orm", "or": "ori", "os": "oss", "pa": "pan", "pi": "pli",
	  "pl": "pol", "ps": "pus", "pt": "por", "qu": "que", "rm": "roh", "rn": "run", "ro": "ron", "ru": "rus",
	  "rw": "kin", "sa": "san", "sc": "srd", "sd": "snd", "se": "sme", "sg": "sag", "si": "sin", "sk": "slk",
	  "sl": "slv", "sm": "smo", "sn": "sna", "so": "som", "sq": "alb", "sr": "srp", "ss": "ssw", "st": "sot",
	  "su": "sun", "sv": "swe", "sw": "swa", "ta": "tam", "te": "tel", "tg": "tgk", "th": "tha", "ti": "tir",
	  "tk": "tuk", "tl": "tgl", "tn": "tsn", "to": "ton", "tr": "tur", "ts": "tso", "tt": "tat", "tw": "twi",
	  "ty": "tah", "ug": "uig", "uk": "ukr", "ur": "urd", "uz": "uzb", "ve": "ven", "vi": "vie", "vo": "vol",
	  "wa": "wln", "wo": "wol", "xh": "xho", "yi": "yid", "yo": "yor", "za": "zha", "zh": "chi", "zu": "zul"
	};

	var ISO_MAP_3_3 = {
	  "tib": "bod", "cze": "ces", "wel": "cym", "ger": "deu", "gre": "ell", "eus": "baq", "per": "fas",
	  "fra": "fre", "hye": "arm", "isl": "ice", "kat": "geo", "mri": "mao", "mkd": "mac", "msa": "may",
	  "mya": "bur", "nld": "dut", "rum": "ron", "slo": "slk", "sqi": "alb", "zho": "chi"
	};

	module.exports = {
	  match: match,
	  normalize: normalize,
	  findBetterMatchIndex: findBetterMatchIndex
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var AsyncAction_1 = __webpack_require__(45);
	var AsyncScheduler_1 = __webpack_require__(46);
	exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
	//# sourceMappingURL=async.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object

	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(37),
	    resolveURL = _require.resolveURL;

	function isNumber(val) {
	  return typeof val == "number" && !isNaN(val) || !isNaN(+val) ? true : false;
	}

	var Segment = function () {
	  Segment.create = function create(adaptation, representation, id, media, time, duration, number, range, indexRange, init) {

	    var segId = adaptation.id + "_" + representation.id + "_" + id;
	    var segment = new Segment(adaptation, representation, segId, media, time, duration, number, range, indexRange, init);
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
	  InitSegment: InitSegment
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(8);
	var ObjectUnsubscribedError_1 = __webpack_require__(47);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function get() {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.closed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throw this.thrownError;
	        } else if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        } else {
	            return this._value;
	        }
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject);
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ScalarObservable = function (_super) {
	    __extends(ScalarObservable, _super);
	    function ScalarObservable(value, scheduler) {
	        _super.call(this);
	        this.value = value;
	        this.scheduler = scheduler;
	        this._isScalar = true;
	        if (scheduler) {
	            this._isScalar = false;
	        }
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
	        if (subscriber.closed) {
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
	            if (!subscriber.closed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1.Observable);
	exports.ScalarObservable = ScalarObservable;
	//# sourceMappingURL=ScalarObservable.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(10);
	var subscribeToResult_1 = __webpack_require__(13);
	/**
	 * Converts a higher-order Observable into a first-order Observable which
	 * concurrently delivers all values that are emitted on the inner Observables.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables.</span>
	 *
	 * <img src="./img/mergeAll.png" width="100%">
	 *
	 * `mergeAll` subscribes to an Observable that emits Observables, also known as
	 * a higher-order Observable. Each time it observes one of these emitted inner
	 * Observables, it subscribes to that and delivers all the values from the
	 * inner Observable on the output Observable. The output Observable only
	 * completes once all inner Observables have completed. Any error delivered by
	 * a inner Observable will be immediately emitted on the output Observable.
	 *
	 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
	 * var firstOrder = higherOrder.mergeAll();
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
	 * var firstOrder = higherOrder.mergeAll(2);
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concatAll}
	 * @see {@link exhaust}
	 * @see {@link merge}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switch}
	 * @see {@link zipAll}
	 *
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits values coming from all the
	 * inner Observables emitted by the source Observable.
	 * @method mergeAll
	 * @owner Observable
	 */
	function mergeAll(concurrent) {
	    if (concurrent === void 0) {
	        concurrent = Number.POSITIVE_INFINITY;
	    }
	    return this.lift(new MergeAllOperator(concurrent));
	}
	exports.mergeAll = mergeAll;
	var MergeAllOperator = function () {
	    function MergeAllOperator(concurrent) {
	        this.concurrent = concurrent;
	    }
	    MergeAllOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
	    };
	    return MergeAllOperator;
	}();
	exports.MergeAllOperator = MergeAllOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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
	            this.active++;
	            this.add(subscribeToResult_1.subscribeToResult(this, observable));
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
	//# sourceMappingURL=mergeAll.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var ConnectableObservable_1 = __webpack_require__(88);
	/* tslint:disable:max-line-length */
	function multicast(subjectOrSubjectFactory, selector) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    } else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    if (typeof selector === 'function') {
	        return this.lift(new MulticastOperator(subjectFactory, selector));
	    }
	    var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
	    connectable.source = this;
	    connectable.subjectFactory = subjectFactory;
	    return connectable;
	}
	exports.multicast = multicast;
	var MulticastOperator = function () {
	    function MulticastOperator(subjectFactory, selector) {
	        this.subjectFactory = subjectFactory;
	        this.selector = selector;
	    }
	    MulticastOperator.prototype.call = function (subscriber, self) {
	        var selector = this.selector;
	        var connectable = new ConnectableObservable_1.ConnectableObservable(self.source, this.subjectFactory);
	        var subscription = selector(connectable).subscribe(subscriber);
	        subscription.add(connectable.connect());
	        return subscription;
	    };
	    return MulticastOperator;
	}();
	exports.MulticastOperator = MulticastOperator;
	//# sourceMappingURL=multicast.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var root_1 = __webpack_require__(6);
	var _Symbol = root_1.root.Symbol;
	if (typeof _Symbol === 'function') {
	    if (_Symbol.iterator) {
	        exports.$$iterator = _Symbol.iterator;
	    } else if (typeof _Symbol.for === 'function') {
	        exports.$$iterator = _Symbol.for('iterator');
	    }
	} else {
	    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
	        // Bug for mozilla version
	        exports.$$iterator = '@@iterator';
	    } else if (root_1.root.Map) {
	        // es6-shim specific logic
	        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
	                exports.$$iterator = key;
	                break;
	            }
	        }
	    } else {
	        exports.$$iterator = '@@iterator';
	    }
	}
	//# sourceMappingURL=iterator.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var root_1 = __webpack_require__(6);
	function getSymbolObservable(context) {
	    var $$observable;
	    var _Symbol = context.Symbol;
	    if (typeof _Symbol === 'function') {
	        if (_Symbol.observable) {
	            $$observable = _Symbol.observable;
	        } else {
	            $$observable = _Symbol('observable');
	            _Symbol.observable = $$observable;
	        }
	    } else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var root_1 = __webpack_require__(6);
	var _Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = typeof _Symbol === 'function' && typeof _Symbol.for === 'function' ? _Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var errorObject_1 = __webpack_require__(23);
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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

	var log = __webpack_require__(9);

	var _require = __webpack_require__(37),
	    normalizeBaseURL = _require.normalizeBaseURL;

	var _require2 = __webpack_require__(14),
	    isCodecSupported = _require2.isCodecSupported;

	var _require3 = __webpack_require__(7),
	    MediaError = _require3.MediaError;

	var _require4 = __webpack_require__(21),
	    normalizeLang = _require4.normalize;

	var representationBaseType = ["profiles", "width", "height", "frameRate", "audioSamplingRate", "mimeType", "segmentProfiles", "codecs", "maximumSAPPeriod", "maxPlayoutRate", "codingDependency", "index"];

	var uniqueId = 0;
	var SUPPORTED_ADAPTATIONS_TYPE = ["audio", "video", "text", "image"];
	var DEFAULT_PRESENTATION_DELAY = 15;

	function parseType(mimeType) {
	  return mimeType.split("/")[0];
	}

	function parseBaseURL(manifest) {
	  var baseURL = normalizeBaseURL(manifest.locations[0]);
	  var period = manifest.periods[0];
	  if (period && period.baseURL) {
	    baseURL += "" + period.baseURL;
	  }
	  return baseURL;
	}

	function normalizeManifest(location, manifest, subtitles, images) {
	  if (!manifest.transportType) {
	    throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
	  }

	  manifest.id = manifest.id || uniqueId++;
	  manifest.type = manifest.type || "static";

	  var locations = manifest.locations;
	  if (!locations || !locations.length) {
	    manifest.locations = [location];
	  }

	  manifest.isLive = manifest.type == "dynamic";

	  var rootURL = parseBaseURL(manifest);

	  // TODO(pierre): support multi-locations/cdns
	  var urlBase = {
	    rootURL: rootURL,
	    baseURL: manifest.baseURL,
	    isLive: manifest.isLive
	  };

	  if (subtitles) {
	    subtitles = normalizeSubtitles(subtitles);
	  }

	  if (images) {
	    images = normalizeImages(images);
	  }

	  var periods = manifest.periods.map(function (period) {
	    return normalizePeriod(period, urlBase, subtitles, images);
	  });

	  // TODO(pierre): support multiple periods
	  manifest = Object.assign({}, manifest, periods[0]);
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

	function normalizePeriod(period, inherit, subtitles, images) {
	  period.id = period.id || uniqueId++;

	  var adaptations = period.adaptations;
	  adaptations = adaptations.concat(subtitles || []);
	  adaptations = adaptations.concat(images || []);
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

	  if (adaptations.length === 0) {
	    throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
	  }

	  var adaptationsByType = {};
	  for (var i = 0; i < adaptations.length; i++) {
	    var adaptation = adaptations[i];
	    var adaptationType = adaptation.type;
	    var adaptationReps = adaptation.representations;
	    adaptationsByType[adaptationType] = adaptationsByType[adaptationType] || [];

	    // only keep adaptations that have at least one representation
	    if (adaptationReps.length > 0) {
	      adaptationsByType[adaptationType].push(adaptation);
	    }
	  }

	  for (var _adaptationType in adaptationsByType) {
	    if (adaptationsByType[_adaptationType].length === 0) {
	      throw new MediaError("MANIFEST_INCOMPATIBLE_CODECS_ERROR", null, true);
	    }
	  }

	  period.adaptations = adaptationsByType;
	  return period;
	}

	function normalizeAdaptation(adaptation, inherit) {
	  if (typeof adaptation.id == "undefined") {
	    throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
	  }

	  adaptation = Object.assign({}, inherit, adaptation);

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

	  var _adaptation = adaptation,
	      type = _adaptation.type,
	      mimeType = _adaptation.mimeType;

	  if (!mimeType) {
	    mimeType = representations[0].mimeType;
	  }

	  if (!mimeType) {
	    throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
	  }

	  adaptation.mimeType = mimeType;

	  if (!type) {
	    type = adaptation.type = parseType(mimeType);
	  }

	  if (type == "video" || type == "audio") {
	    representations = representations.filter(function (rep) {
	      return isCodecSupported(getCodec(rep));
	    });
	  }

	  adaptation.representations = representations;
	  adaptation.bitrates = representations.map(function (rep) {
	    return rep.bitrate;
	  });
	  return adaptation;
	}

	function normalizeRepresentation(representation, inherit) {
	  if (typeof representation.id == "undefined") {
	    throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
	  }

	  representation = Object.assign({}, inherit, representation);

	  var index = representation.index;
	  if (!index) {
	    throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
	  }

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

	  return subtitles.reduce(function (allSubs, _ref) {
	    var mimeType = _ref.mimeType,
	        url = _ref.url,
	        language = _ref.language,
	        languages = _ref.languages;

	    if (language) {
	      languages = [language];
	    }

	    return allSubs.concat(languages.map(function (lang) {
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
	    }));
	  }, []);
	}

	function normalizeImages(images) {
	  if (!Array.isArray(images)) {
	    images = [images];
	  }

	  return images.map(function (_ref2) {
	    var mimeType = _ref2.mimeType,
	        url = _ref2.url;

	    return {
	      id: uniqueId++,
	      type: "image",
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
	  var addedTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	  if (manifest.isLive) {
	    manifest.presentationLiveGap += addedTime;
	  }
	}

	function getCodec(representation) {
	  var codecs = representation.codecs,
	      mimeType = representation.mimeType;

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
	    return normalizeLang(ada.lang);
	  });
	}

	function getAvailableSubtitles(manifest) {
	  return getAdaptationsByType(manifest, "text").map(function (ada) {
	    return normalizeLang(ada.lang);
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

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var assert = __webpack_require__(3);

	function EventEmitter() {
	  this.__listeners = {};
	}

	EventEmitter.prototype.addEventListener = function (evt, fn) {
	  assert(typeof fn == "function", "eventemitter: second argument should be a function");
	  if (!this.__listeners[evt]) {
	    this.__listeners[evt] = [];
	  }
	  this.__listeners[evt].push(fn);
	};

	EventEmitter.prototype.removeEventListener = function (evt, fn) {
	  if (arguments.length === 0) {
	    this.__listeners = {};
	    return;
	  }
	  if (!this.__listeners.hasOwnProperty(evt)) {
	    return;
	  }
	  if (arguments.length === 1) {
	    delete this.__listeners[evt];
	    return;
	  }
	  var listeners = this.__listeners[evt];
	  var index = listeners.indexOf(fn);
	  if (~index) {
	    listeners.splice(index, 1);
	  }
	  if (!listeners.length) {
	    delete this.__listeners[evt];
	  }
	};

	EventEmitter.prototype.trigger = function (evt, arg) {
	  if (!this.__listeners.hasOwnProperty(evt)) {
	    return;
	  }
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

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(155),
	    getBackedoffDelay = _require.getBackedoffDelay;

	var timer = __webpack_require__(42).TimerObservable.create;

	function debounce(fn, delay) {
	  var timer = 0;
	  return function () {
	    if (timer) {
	      clearTimeout(timer);
	    }
	    timer = setTimeout(fn, delay);
	  };
	}

	function retryWithBackoff(obs, options) {
	  var retryDelay = options.retryDelay,
	      totalRetry = options.totalRetry,
	      shouldRetry = options.shouldRetry,
	      resetDelay = options.resetDelay,
	      errorSelector = options.errorSelector,
	      onRetry = options.onRetry;


	  var retryCount = 0;
	  var debounceRetryCount = void 0;
	  if (resetDelay > 0) {
	    debounceRetryCount = debounce(function () {
	      return retryCount = 0;
	    }, resetDelay);
	  }

	  return obs.catch(function (error, source) {
	    var wantRetry = !shouldRetry || shouldRetry(error);
	    if (!wantRetry || retryCount++ >= totalRetry) {
	      if (errorSelector) {
	        throw errorSelector(error, retryCount);
	      } else {
	        throw error;
	      }
	    }

	    if (onRetry) {
	      onRetry(error, retryCount);
	    }

	    var fuzzedDelay = getBackedoffDelay(retryDelay, retryCount);
	    return timer(fuzzedDelay).mergeMap(function () {
	      debounceRetryCount && debounceRetryCount();
	      return source;
	    });
	  });
	}

	function retryableFuncWithBackoff(fn, options) {
	  var retryDelay = options.retryDelay,
	      totalRetry = options.totalRetry,
	      shouldRetry = options.shouldRetry,
	      resetDelay = options.resetDelay,
	      errorSelector = options.errorSelector,
	      onRetry = options.onRetry;


	  var retryCount = 0;
	  var debounceRetryCount = void 0;
	  if (resetDelay > 0) {
	    debounceRetryCount = debounce(function () {
	      return retryCount = 0;
	    }, resetDelay);
	  }

	  return function doRetry() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return fn.apply(undefined, args).catch(function (error) {
	      var wantRetry = !shouldRetry || shouldRetry(error);
	      if (!wantRetry || retryCount++ >= totalRetry) {
	        if (errorSelector) {
	          throw errorSelector(error, retryCount);
	        } else {
	          throw error;
	        }
	      }

	      if (onRetry) {
	        onRetry(error, retryCount);
	      }

	      var fuzzedDelay = getBackedoffDelay(retryDelay, retryCount);
	      return timer(fuzzedDelay).mergeMap(function () {
	        debounceRetryCount && debounceRetryCount();
	        return doRetry.apply(undefined, args);
	      });
	    });
	  };
	}

	module.exports = {
	  retryWithBackoff: retryWithBackoff,
	  retryableFuncWithBackoff: retryableFuncWithBackoff
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

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
	  if (len === 0) {
	    return "";
	  }

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

	function normalizeBaseURL(url) {
	  var slash = url.lastIndexOf("/");
	  if (slash >= 0) {
	    return url.substring(0, slash + 1);
	  } else {
	    return url;
	  }
	}

	module.exports = {
	  resolveURL: resolveURL,
	  normalizeBaseURL: normalizeBaseURL
	};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	"use strict";

	exports.empty = {
	    closed: true,
	    next: function next(value) {},
	    error: function error(err) {
	        throw err;
	    },
	    complete: function complete() {}
	};
	//# sourceMappingURL=Observer.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var subscribeToResult_1 = __webpack_require__(13);
	var OuterSubscriber_1 = __webpack_require__(10);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var DeferObservable = function (_super) {
	    __extends(DeferObservable, _super);
	    function DeferObservable(observableFactory) {
	        _super.call(this);
	        this.observableFactory = observableFactory;
	    }
	    /**
	     * Creates an Observable that, on subscribe, calls an Observable factory to
	     * make an Observable for each new Observer.
	     *
	     * <span class="informal">Creates the Observable lazily, that is, only when it
	     * is subscribed.
	     * </span>
	     *
	     * <img src="./img/defer.png" width="100%">
	     *
	     * `defer` allows you to create the Observable only when the Observer
	     * subscribes, and create a fresh Observable for each Observer. It waits until
	     * an Observer subscribes to it, and then it generates an Observable,
	     * typically with an Observable factory function. It does this afresh for each
	     * subscriber, so although each subscriber may think it is subscribing to the
	     * same Observable, in fact each subscriber gets its own individual
	     * Observable.
	     *
	     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
	     * var clicksOrInterval = Rx.Observable.defer(function () {
	     *   if (Math.random() > 0.5) {
	     *     return Rx.Observable.fromEvent(document, 'click');
	     *   } else {
	     *     return Rx.Observable.interval(1000);
	     *   }
	     * });
	     * clicksOrInterval.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     *
	     * @param {function(): Observable|Promise} observableFactory The Observable
	     * factory function to invoke for each Observer that subscribes to the output
	     * Observable. May also return a Promise, which will be converted on the fly
	     * to an Observable.
	     * @return {Observable} An Observable whose Observers' subscriptions trigger
	     * an invocation of the given Observable factory function.
	     * @static true
	     * @name defer
	     * @owner Observable
	     */
	    DeferObservable.create = function (observableFactory) {
	        return new DeferObservable(observableFactory);
	    };
	    DeferObservable.prototype._subscribe = function (subscriber) {
	        return new DeferSubscriber(subscriber, this.observableFactory);
	    };
	    return DeferObservable;
	}(Observable_1.Observable);
	exports.DeferObservable = DeferObservable;
	var DeferSubscriber = function (_super) {
	    __extends(DeferSubscriber, _super);
	    function DeferSubscriber(destination, factory) {
	        _super.call(this, destination);
	        this.factory = factory;
	        this.tryDefer();
	    }
	    DeferSubscriber.prototype.tryDefer = function () {
	        try {
	            this._callFactory();
	        } catch (err) {
	            this._error(err);
	        }
	    };
	    DeferSubscriber.prototype._callFactory = function () {
	        var result = this.factory();
	        if (result) {
	            this.add(subscribeToResult_1.subscribeToResult(this, result));
	        }
	    };
	    return DeferSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=DeferObservable.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var tryCatch_1 = __webpack_require__(33);
	var isFunction_1 = __webpack_require__(32);
	var errorObject_1 = __webpack_require__(23);
	var Subscription_1 = __webpack_require__(4);
	function isNodeStyleEventEmmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
	}
	function isJQueryStyleEventEmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
	}
	function isNodeList(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
	}
	function isHTMLCollection(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
	}
	function isEventTarget(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
	}
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromEventObservable = function (_super) {
	    __extends(FromEventObservable, _super);
	    function FromEventObservable(sourceObj, eventName, selector, options) {
	        _super.call(this);
	        this.sourceObj = sourceObj;
	        this.eventName = eventName;
	        this.selector = selector;
	        this.options = options;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * Creates an Observable that emits events of a specific type coming from the
	     * given event target.
	     *
	     * <span class="informal">Creates an Observable from DOM events, or Node
	     * EventEmitter events or others.</span>
	     *
	     * <img src="./img/fromEvent.png" width="100%">
	     *
	     * Creates an Observable by attaching an event listener to an "event target",
	     * which may be an object with `addEventListener` and `removeEventListener`,
	     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
	     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
	     * the output Observable is subscribed, and removed when the Subscription is
	     * unsubscribed.
	     *
	     * @example <caption>Emits clicks happening on the DOM document</caption>
	     * var clicks = Rx.Observable.fromEvent(document, 'click');
	     * clicks.subscribe(x => console.log(x));
	     *
	     * @see {@link from}
	     * @see {@link fromEventPattern}
	     *
	     * @param {EventTargetLike} target The DOMElement, event target, Node.js
	     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
	     * @param {string} eventName The event name of interest, being emitted by the
	     * `target`.
	     * @parm {EventListenerOptions} [options] Options to pass through to addEventListener
	     * @param {SelectorMethodSignature<T>} [selector] An optional function to
	     * post-process results. It takes the arguments from the event handler and
	     * should return a single value.
	     * @return {Observable<T>}
	     * @static true
	     * @name fromEvent
	     * @owner Observable
	     */
	    FromEventObservable.create = function (target, eventName, options, selector) {
	        if (isFunction_1.isFunction(options)) {
	            selector = options;
	            options = undefined;
	        }
	        return new FromEventObservable(target, eventName, selector, options);
	    };
	    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
	        var unsubscribe;
	        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
	            for (var i = 0, len = sourceObj.length; i < len; i++) {
	                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
	            }
	        } else if (isEventTarget(sourceObj)) {
	            var source_1 = sourceObj;
	            sourceObj.addEventListener(eventName, handler, options);
	            unsubscribe = function unsubscribe() {
	                return source_1.removeEventListener(eventName, handler);
	            };
	        } else if (isJQueryStyleEventEmitter(sourceObj)) {
	            var source_2 = sourceObj;
	            sourceObj.on(eventName, handler);
	            unsubscribe = function unsubscribe() {
	                return source_2.off(eventName, handler);
	            };
	        } else if (isNodeStyleEventEmmitter(sourceObj)) {
	            var source_3 = sourceObj;
	            sourceObj.addListener(eventName, handler);
	            unsubscribe = function unsubscribe() {
	                return source_3.removeListener(eventName, handler);
	            };
	        }
	        subscriber.add(new Subscription_1.Subscription(unsubscribe));
	    };
	    FromEventObservable.prototype._subscribe = function (subscriber) {
	        var sourceObj = this.sourceObj;
	        var eventName = this.eventName;
	        var options = this.options;
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
	        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
	    };
	    return FromEventObservable;
	}(Observable_1.Observable);
	exports.FromEventObservable = FromEventObservable;
	//# sourceMappingURL=FromEventObservable.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(6);
	var Observable_1 = __webpack_require__(1);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var PromiseObservable = function (_super) {
	    __extends(PromiseObservable, _super);
	    function PromiseObservable(promise, scheduler) {
	        _super.call(this);
	        this.promise = promise;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Converts a Promise to an Observable.
	     *
	     * <span class="informal">Returns an Observable that just emits the Promise's
	     * resolved value, then completes.</span>
	     *
	     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
	     * Observable. If the Promise resolves with a value, the output Observable
	     * emits that resolved value as a `next`, and then completes. If the Promise
	     * is rejected, then the output Observable emits the corresponding Error.
	     *
	     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
	     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @see {@link bindCallback}
	     * @see {@link from}
	     *
	     * @param {Promise<T>} promise The promise to be converted.
	     * @param {Scheduler} [scheduler] An optional Scheduler to use for scheduling
	     * the delivery of the resolved value (or the rejection).
	     * @return {Observable<T>} An Observable which wraps the Promise.
	     * @static true
	     * @name fromPromise
	     * @owner Observable
	     */
	    PromiseObservable.create = function (promise, scheduler) {
	        return new PromiseObservable(promise, scheduler);
	    };
	    PromiseObservable.prototype._subscribe = function (subscriber) {
	        var _this = this;
	        var promise = this.promise;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            if (this._isScalar) {
	                if (!subscriber.closed) {
	                    subscriber.next(this.value);
	                    subscriber.complete();
	                }
	            } else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.closed) {
	                        subscriber.next(value);
	                        subscriber.complete();
	                    }
	                }, function (err) {
	                    if (!subscriber.closed) {
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
	                if (!subscriber.closed) {
	                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
	                }
	            } else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.closed) {
	                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
	                    }
	                }, function (err) {
	                    if (!subscriber.closed) {
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
	function dispatchNext(arg) {
	    var value = arg.value,
	        subscriber = arg.subscriber;
	    if (!subscriber.closed) {
	        subscriber.next(value);
	        subscriber.complete();
	    }
	}
	function dispatchError(arg) {
	    var err = arg.err,
	        subscriber = arg.subscriber;
	    if (!subscriber.closed) {
	        subscriber.error(err);
	    }
	}
	//# sourceMappingURL=PromiseObservable.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1 = __webpack_require__(49);
	var Observable_1 = __webpack_require__(1);
	var async_1 = __webpack_require__(22);
	var isScheduler_1 = __webpack_require__(17);
	var isDate_1 = __webpack_require__(48);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
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
	            scheduler = async_1.async;
	        }
	        this.scheduler = scheduler;
	        this.dueTime = isDate_1.isDate(dueTime) ? +dueTime - this.scheduler.now() : dueTime;
	    }
	    /**
	     * Creates an Observable that starts emitting after an `initialDelay` and
	     * emits ever increasing numbers after each `period` of time thereafter.
	     *
	     * <span class="informal">Its like {@link interval}, but you can specify when
	     * should the emissions start.</span>
	     *
	     * <img src="./img/timer.png" width="100%">
	     *
	     * `timer` returns an Observable that emits an infinite sequence of ascending
	     * integers, with a constant interval of time, `period` of your choosing
	     * between those emissions. The first emission happens after the specified
	     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
	     * operator uses the `async` Scheduler to provide a notion of time, but you
	     * may pass any Scheduler to it. If `period` is not specified, the output
	     * Observable emits only one value, `0`. Otherwise, it emits an infinite
	     * sequence.
	     *
	     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
	     * var numbers = Rx.Observable.timer(3000, 1000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @example <caption>Emits one number after five seconds</caption>
	     * var numbers = Rx.Observable.timer(5000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @see {@link interval}
	     * @see {@link delay}
	     *
	     * @param {number|Date} initialDelay The initial delay time to wait before
	     * emitting the first value of `0`.
	     * @param {number} [period] The period of time between emissions of the
	     * subsequent numbers.
	     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
	     * the emission of values, and providing a notion of "time".
	     * @return {Observable} An Observable that emits a `0` after the
	     * `initialDelay` and ever increasing numbers after each `period` of time
	     * thereafter.
	     * @static true
	     * @name timer
	     * @owner Observable
	     */
	    TimerObservable.create = function (initialDelay, period, scheduler) {
	        if (initialDelay === void 0) {
	            initialDelay = 0;
	        }
	        return new TimerObservable(initialDelay, period, scheduler);
	    };
	    TimerObservable.dispatch = function (state) {
	        var index = state.index,
	            period = state.period,
	            subscriber = state.subscriber;
	        var action = this;
	        subscriber.next(index);
	        if (subscriber.closed) {
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
	//# sourceMappingURL=TimerObservable.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isScheduler_1 = __webpack_require__(17);
	var ArrayObservable_1 = __webpack_require__(11);
	var mergeAll_1 = __webpack_require__(27);
	/* tslint:disable:max-line-length */
	function concat() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return this.lift.call(concatStatic.apply(void 0, [this].concat(observables)));
	}
	exports.concat = concat;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which sequentially emits all values from every
	 * given input Observable after the current Observable.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * Joins multiple Observables together by subscribing to them one at a time and
	 * merging their results into the output Observable. Will wait for each
	 * Observable to complete before moving on to the next.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = Rx.Observable.concat(timer, sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Concatenate 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = Rx.Observable.concat(timer1, timer2, timer3);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {Observable} input1 An input Observable to concatenate with others.
	 * @param {Observable} input2 An input Observable to concatenate with others.
	 * More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @static true
	 * @name concat
	 * @owner Observable
	 */
	function concatStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var scheduler = null;
	    var args = observables;
	    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
	        scheduler = args.pop();
	    }
	    if (scheduler === null && observables.length === 1) {
	        return observables[0];
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
	}
	exports.concatStatic = concatStatic;
	//# sourceMappingURL=concat.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var subscribeToResult_1 = __webpack_require__(13);
	var OuterSubscriber_1 = __webpack_require__(10);
	/* tslint:disable:max-line-length */
	function mergeMap(project, resultSelector, concurrent) {
	    if (concurrent === void 0) {
	        concurrent = Number.POSITIVE_INFINITY;
	    }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	        resultSelector = null;
	    }
	    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
	}
	exports.mergeMap = mergeMap;
	var MergeMapOperator = function () {
	    function MergeMapOperator(project, resultSelector, concurrent) {
	        if (concurrent === void 0) {
	            concurrent = Number.POSITIVE_INFINITY;
	        }
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
	    };
	    return MergeMapOperator;
	}();
	exports.MergeMapOperator = MergeMapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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
	            this._tryNext(value);
	        } else {
	            this.buffer.push(value);
	        }
	    };
	    MergeMapSubscriber.prototype._tryNext = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        } catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.active++;
	        this._innerSub(result, value, index);
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
	    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        } else {
	            this.destination.next(innerValue);
	        }
	    };
	    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        } catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
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
	//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(6);
	var Action_1 = __webpack_require__(119);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AsyncAction = function (_super) {
	    __extends(AsyncAction, _super);
	    function AsyncAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	        this.pending = false;
	    }
	    AsyncAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        if (this.closed) {
	            return this;
	        }
	        // Always replace the current state with the new state.
	        this.state = state;
	        // Set the pending flag indicating that this action has been scheduled, or
	        // has recursively rescheduled itself.
	        this.pending = true;
	        var id = this.id;
	        var scheduler = this.scheduler;
	        //
	        // Important implementation note:
	        //
	        // Actions only execute once by default, unless rescheduled from within the
	        // scheduled callback. This allows us to implement single and repeat
	        // actions via the same code path, without adding API surface area, as well
	        // as mimic traditional recursion but across asynchronous boundaries.
	        //
	        // However, JS runtimes and timers distinguish between intervals achieved by
	        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
	        // serial `setTimeout` calls can be individually delayed, which delays
	        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
	        // guarantee the interval callback will be invoked more precisely to the
	        // interval period, regardless of load.
	        //
	        // Therefore, we use `setInterval` to schedule single and repeat actions.
	        // If the action reschedules itself with the same delay, the interval is not
	        // canceled. If the action doesn't reschedule, or reschedules with a
	        // different delay, the interval will be canceled after scheduled callback
	        // execution.
	        //
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, delay);
	        }
	        this.delay = delay;
	        // If this action has already an async Id, don't request a new one.
	        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
	        return this;
	    };
	    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
	    };
	    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        // If this action is rescheduled with the same delay time, don't clear the interval id.
	        if (delay !== null && this.delay === delay) {
	            return id;
	        }
	        // Otherwise, if the action's delay time is different from the current delay,
	        // clear the interval id
	        return root_1.root.clearInterval(id) && undefined || undefined;
	    };
	    /**
	     * Immediately executes this action and the `work` it contains.
	     * @return {any}
	     */
	    AsyncAction.prototype.execute = function (state, delay) {
	        if (this.closed) {
	            return new Error('executing a cancelled action');
	        }
	        this.pending = false;
	        var error = this._execute(state, delay);
	        if (error) {
	            return error;
	        } else if (this.pending === false && this.id != null) {
	            // Dequeue if the action didn't reschedule itself. Don't call
	            // unsubscribe(), because the action could reschedule later.
	            // For example:
	            // ```
	            // scheduler.schedule(function doWork(counter) {
	            //   /* ... I'm a busy worker bee ... */
	            //   var originalAction = this;
	            //   /* wait 100ms before rescheduling the action */
	            //   setTimeout(function () {
	            //     originalAction.schedule(counter + 1);
	            //   }, 100);
	            // }, 1000);
	            // ```
	            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	        }
	    };
	    AsyncAction.prototype._execute = function (state, delay) {
	        var errored = false;
	        var errorValue = undefined;
	        try {
	            this.work(state);
	        } catch (e) {
	            errored = true;
	            errorValue = !!e && e || new Error(e);
	        }
	        if (errored) {
	            this.unsubscribe();
	            return errorValue;
	        }
	    };
	    AsyncAction.prototype._unsubscribe = function () {
	        var id = this.id;
	        var scheduler = this.scheduler;
	        var actions = scheduler.actions;
	        var index = actions.indexOf(this);
	        this.work = null;
	        this.delay = null;
	        this.state = null;
	        this.pending = false;
	        this.scheduler = null;
	        if (index !== -1) {
	            actions.splice(index, 1);
	        }
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, null);
	        }
	    };
	    return AsyncAction;
	}(Action_1.Action);
	exports.AsyncAction = AsyncAction;
	//# sourceMappingURL=AsyncAction.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Scheduler_1 = __webpack_require__(60);
	var AsyncScheduler = function (_super) {
	    __extends(AsyncScheduler, _super);
	    function AsyncScheduler() {
	        _super.apply(this, arguments);
	        this.actions = [];
	        /**
	         * A flag to indicate whether the Scheduler is currently executing a batch of
	         * queued actions.
	         * @type {boolean}
	         */
	        this.active = false;
	        /**
	         * An internal ID used to track the latest asynchronous task such as those
	         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
	         * others.
	         * @type {any}
	         */
	        this.scheduled = undefined;
	    }
	    AsyncScheduler.prototype.flush = function (action) {
	        var actions = this.actions;
	        if (this.active) {
	            actions.push(action);
	            return;
	        }
	        var error;
	        this.active = true;
	        do {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        } while (action = actions.shift()); // exhaust the scheduler queue
	        this.active = false;
	        if (error) {
	            while (action = actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsyncScheduler;
	}(Scheduler_1.Scheduler);
	exports.AsyncScheduler = AsyncScheduler;
	//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError = function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        var err = _super.call(this, 'object unsubscribed');
	        this.name = err.name = 'ObjectUnsubscribedError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ObjectUnsubscribedError;
	}(Error);
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	"use strict";

	function isDate(value) {
	    return value instanceof Date && !isNaN(+value);
	}
	exports.isDate = isDate;
	//# sourceMappingURL=isDate.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var isArray_1 = __webpack_require__(16);
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

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	"use strict";

	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	"use strict";
	/* tslint:disable:no-empty */

	function noop() {}
	exports.noop = noop;
	//# sourceMappingURL=noop.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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

	var log = __webpack_require__(9);
	var assert = __webpack_require__(3);

	var _require = __webpack_require__(15),
	    tryCatch = _require.tryCatch,
	    castToObservable = _require.castToObservable;

	var _require2 = __webpack_require__(36),
	    retryWithBackoff = _require2.retryWithBackoff;

	var _require3 = __webpack_require__(1),
	    Observable = _require3.Observable;

	var empty = __webpack_require__(5).EmptyObservable.create;
	var defer = __webpack_require__(39).DeferObservable.create;

	var _require4 = __webpack_require__(19),
	    combineLatest = _require4.combineLatest;

	var _require5 = __webpack_require__(12),
	    merge = _require5.merge;

	var _require6 = __webpack_require__(14),
	    KeySystemAccess = _require6.KeySystemAccess,
	    requestMediaKeySystemAccess = _require6.requestMediaKeySystemAccess,
	    setMediaKeys = _require6.setMediaKeys,
	    emeEvents = _require6.emeEvents,
	    shouldRenewMediaKeys = _require6.shouldRenewMediaKeys;

	var _require7 = __webpack_require__(7),
	    ErrorTypes = _require7.ErrorTypes,
	    ErrorCodes = _require7.ErrorCodes,
	    EncryptedMediaError = _require7.EncryptedMediaError;

	var onEncrypted = emeEvents.onEncrypted,
	    onKeyMessage = emeEvents.onKeyMessage,
	    onKeyError = emeEvents.onKeyError,
	    onKeyStatusesChange = emeEvents.onKeyStatusesChange;


	var SYSTEMS = {
	  "clearkey": ["webkit-org.w3.clearkey", "org.w3.clearkey"],
	  "widevine": ["com.widevine.alpha"],
	  "playready": ["com.microsoft.playready", "com.chromecast.playready", "com.youtube.playready"]
	};

	// List of all eme security robustnesses from highest to lowest
	var ROBUSTNESSES = ["HW_SECURE_ALL", "HW_SECURE_DECODE", "HW_SECURE_CRYPTO", "SW_SECURE_DECODE", "SW_SECURE_CRYPTO"];

	var KEY_STATUS_ERRORS = {
	  "expired": true,
	  "internal-error": true
	};

	function hashBuffer(buffer) {
	  var hash = 0;
	  var char = void 0;
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

	var SessionSet = function () {
	  function SessionSet() {
	    _classCallCheck(this, SessionSet);

	    this._entries = [];
	  }

	  SessionSet.prototype.find = function find(func) {
	    for (var i = 0; i < this._entries.length; i++) {
	      if (func(this._entries[i]) === true) {
	        return this._entries[i];
	      }
	    }
	    return null;
	  };

	  return SessionSet;
	}();

	/**
	 * Set maintaining a representation of all currently loaded
	 * MediaKeySessions. This set allow to reuse sessions without re-
	 * negotiating a license exchange if the key is already used in a
	 * loaded session.
	 */


	var InMemorySessionsSet = function (_SessionSet) {
	  _inherits(InMemorySessionsSet, _SessionSet);

	  function InMemorySessionsSet() {
	    _classCallCheck(this, InMemorySessionsSet);

	    return _possibleConstructorReturn(this, _SessionSet.apply(this, arguments));
	  }

	  InMemorySessionsSet.prototype.getFirst = function getFirst() {
	    if (this._entries.length > 0) {
	      return this._entries[0].session;
	    }
	  };

	  InMemorySessionsSet.prototype.find = function find(func) {
	    for (var i = 0; i < this._entries.length; i++) {
	      if (func(this._entries[i]) === true) {
	        return this._entries[i];
	      }
	    }
	    return null;
	  };

	  InMemorySessionsSet.prototype.get = function get(initData) {
	    initData = hashInitData(initData);
	    var entry = this.find(function (e) {
	      return e.initData === initData;
	    });
	    if (entry) {
	      return entry.session;
	    } else {
	      return null;
	    }
	  };

	  InMemorySessionsSet.prototype.add = function add(initData, session, sessionEvents) {
	    initData = hashInitData(initData);
	    var currentSession = this.get(initData);
	    if (currentSession) {
	      this.deleteAndClose(currentSession);
	    }

	    var eventSubscription = sessionEvents.connect();
	    var entry = { session: session, initData: initData, eventSubscription: eventSubscription };
	    log.debug("eme-mem-store: add session", entry);
	    this._entries.push(entry);
	  };

	  InMemorySessionsSet.prototype.deleteById = function deleteById(sessionId) {
	    var entry = this.find(function (e) {
	      return e.session.sessionId === sessionId;
	    });
	    if (entry) {
	      return this.delete(entry.session);
	    } else {
	      return null;
	    }
	  };

	  InMemorySessionsSet.prototype.delete = function _delete(session_) {
	    var entry = this.find(function (e) {
	      return e.session === session_;
	    });
	    if (!entry) {
	      return null;
	    }

	    var session = entry.session,
	        eventSubscription = entry.eventSubscription;

	    log.debug("eme-mem-store: delete session", entry);
	    var idx = this._entries.indexOf(entry);
	    this._entries.splice(idx, 1);
	    eventSubscription.unsubscribe();
	    return session;
	  };

	  InMemorySessionsSet.prototype.deleteAndClose = function deleteAndClose(session_) {
	    var session = this.delete(session_);
	    if (session) {
	      log.debug("eme-mem-store: close session", session);
	      return castToObservable(session.close()).catch(function () {
	        return Observable.of(null);
	      });
	    } else {
	      return Observable.of(null);
	    }
	  };

	  InMemorySessionsSet.prototype.dispose = function dispose() {
	    var _this2 = this;

	    var disposed = this._entries.map(function (e) {
	      return _this2.deleteAndClose(e.session);
	    });
	    this._entries = [];
	    return merge.apply(null, disposed);
	  };

	  return InMemorySessionsSet;
	}(SessionSet);

	/**
	 * Set representing persisted licenses. Depends on a simple local-
	 * storage implementation with a `save`/`load` synchronous interface
	 * to persist informations on persisted sessions.
	 *
	 * This set is used only for a cdm/keysystem with license persistency
	 * supported.
	 */


	var PersistedSessionsSet = function (_SessionSet2) {
	  _inherits(PersistedSessionsSet, _SessionSet2);

	  function PersistedSessionsSet(storage) {
	    _classCallCheck(this, PersistedSessionsSet);

	    var _this3 = _possibleConstructorReturn(this, _SessionSet2.call(this));

	    _this3.setStorage(storage);
	    return _this3;
	  }

	  PersistedSessionsSet.prototype.setStorage = function setStorage(storage) {
	    if (this._storage === storage) {
	      return;
	    }

	    assert(storage, "no licenseStorage given for keySystem with persistentLicense");

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
	    var entry = this.find(function (e) {
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
	    if (currentEntry && currentEntry.sessionId === sessionId) {
	      return;
	    }

	    if (currentEntry) {
	      this.delete(initData);
	    }

	    log.info("eme-persitent-store: add new session", sessionId, session);
	    this._entries.push({ sessionId: sessionId, initData: initData });
	    this._save();
	  };

	  PersistedSessionsSet.prototype.delete = function _delete(initData) {
	    initData = hashInitData(initData);

	    var entry = this.find(function (e) {
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
	}(SessionSet);

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
	var $mediaKeys = void 0;
	var $mediaKeySystemConfiguration = void 0;
	var $keySystem = void 0;
	var $videoElement = void 0;

	function createMessage(name, session, options) {
	  return { type: "eme", value: Object.assign({ name: name, session: session }, options) };
	}

	function getCachedKeySystemAccess(keySystems) {
	  // NOTE(pierre): alwaysRenew flag is used for IE11 which require the
	  // creation of a new MediaKeys instance for each session creation
	  if (!$keySystem || !$mediaKeys || shouldRenewMediaKeys()) {
	    return null;
	  }

	  var configuration = $mediaKeySystemConfiguration;
	  var foundKeySystem = keySystems.filter(function (ks) {
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
	  })[0];

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

	  // From chrome 58, you must specify at least one videoCapabilities and one audioCapabilities
	  // These capabilities must specify a codec (even though your stream can use a completely
	  // different codec afterward). It is also strongly recommended to specify the required
	  // security robustness. As we do not want to forbide any security level, we specify
	  // every existing security level from highest to lowest so that the best security level is selected.
	  // More details here: https://storage.googleapis.com/wvdocs/Chrome_EME_Changes_and_Best_Practices.pdf
	  // TODO: enable the user to specify which codec and robustness he wants
	  var videoCapabilities = [],
	      audioCapabilities = [];
	  ROBUSTNESSES.forEach(function (robustness) {
	    videoCapabilities.push({
	      contentType: "video/mp4;codecs=\"avc1.4d401e\"", // standard mp4 codec
	      robustness: robustness
	    });
	    audioCapabilities.push({
	      contentType: "audio/mp4;codecs=\"mp4a.40.2\"", // standard mp4 codec
	      robustness: robustness
	    });
	  });

	  return {
	    initDataTypes: ["cenc"],
	    videoCapabilities: videoCapabilities,
	    audioCapabilities: audioCapabilities,
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

	  var keySystemsType = keySystems.reduce(function (parent, keySystem) {
	    return parent.concat((SYSTEMS[keySystem.type] || []).map(function (keyType) {
	      return { keyType: keyType, keySystem: keySystem };
	    }));
	  }, []);

	  return Observable.create(function (obs) {
	    var disposed = false;
	    var sub = null;

	    function testKeySystem(index) {
	      if (disposed) {
	        return;
	      }

	      if (index >= keySystemsType.length) {
	        obs.error(new EncryptedMediaError("INCOMPATIBLE_KEYSYSTEMS", null, true));
	        return;
	      }

	      var _keySystemsType$index = keySystemsType[index],
	          keyType = _keySystemsType$index.keyType,
	          keySystem = _keySystemsType$index.keySystem;

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

	    return function () {
	      disposed = true;
	      if (sub) {
	        sub.unsubscribe();
	      }
	    };
	  });
	}

	function createAndSetMediaKeys(video, keySystem, keySystemAccess) {
	  var oldVideoElement = $videoElement;
	  var oldMediaKeys = $mediaKeys;

	  return castToObservable(keySystemAccess.createMediaKeys()).mergeMap(function (mk) {
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

	    var mediaKeysSetter = void 0;
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

	function createSession(mediaKeys, sessionType, keySystem, initData, errorStream) {
	  log.debug("eme: create a new " + sessionType + " session");
	  var session = mediaKeys.createSession(sessionType);
	  var sessionEvents = sessionEventsHandler(session, keySystem, errorStream).finally(function () {
	    $loadedSessions.deleteAndClose(session);
	    $storedSessions.delete(initData);
	  }).publish();

	  return { session: session, sessionEvents: sessionEvents };
	}

	function createSessionAndKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream) {
	  var _createSession = createSession(mediaKeys, sessionType, keySystem, initData, errorStream),
	      session = _createSession.session,
	      sessionEvents = _createSession.sessionEvents;

	  $loadedSessions.add(initData, session, sessionEvents);

	  log.debug("eme: generate request", initDataType, initData);

	  var generateRequest = castToObservable(session.generateRequest(initDataType, initData)).catch(function (error) {
	    throw new EncryptedMediaError("KEY_GENERATE_REQUEST_ERROR", error, false);
	  }).do(function () {
	    if (sessionType == "persistent-license") {
	      $storedSessions.add(initData, session);
	    }
	  }).mapTo(createMessage("generated-request", session, { initData: initData, initDataType: initDataType }));

	  return merge(sessionEvents, generateRequest);
	}

	function createSessionAndKeyRequestWithRetry(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream) {
	  return createSessionAndKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream).catch(function (error) {
	    if (error.code !== ErrorCodes.KEY_GENERATE_REQUEST_ERROR) {
	      throw error;
	    }

	    var firstLoadedSession = $loadedSessions.getFirst();
	    if (!firstLoadedSession) {
	      throw error;
	    }

	    log.warn("eme: could not create a new session, " + "retry after closing a currently loaded session", error);

	    return $loadedSessions.deleteAndClose(firstLoadedSession).mergeMap(function () {
	      return createSessionAndKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream);
	    });
	  });
	}

	function createPersistentSessionAndLoad(mediaKeys, keySystem, storedSessionId, initDataType, initData, errorStream) {
	  log.debug("eme: load persisted session", storedSessionId);

	  var sessionType = "persistent-license";

	  var _createSession2 = createSession(mediaKeys, sessionType, keySystem, initData, errorStream),
	      session = _createSession2.session,
	      sessionEvents = _createSession2.sessionEvents;

	  return castToObservable(session.load(storedSessionId)).catch(function () {
	    return Observable.of(false);
	  }).mergeMap(function (success) {
	    if (success) {
	      $loadedSessions.add(initData, session, sessionEvents);
	      $storedSessions.add(initData, session);
	      return sessionEvents.startWith(createMessage("loaded-session", session, { storedSessionId: storedSessionId }));
	    } else {
	      log.warn("eme: no data stored for the loaded session, do fallback", storedSessionId);

	      $loadedSessions.deleteById(storedSessionId);
	      $storedSessions.delete(initData);

	      if (session.sessionId) {
	        session.remove();
	      }

	      return createSessionAndKeyRequestWithRetry(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream).startWith(createMessage("loaded-session-failed", session, { storedSessionId: storedSessionId }));
	    }
	  });
	}

	function manageSessionCreation(mediaKeys, mediaKeySystemConfiguration, keySystem, initDataType, initData, errorStream) {
	  // reuse currently loaded sessions without making a new key
	  // request
	  var loadedSession = $loadedSessions.get(initData);
	  if (loadedSession && loadedSession.sessionId) {
	    log.debug("eme: reuse loaded session", loadedSession.sessionId);
	    return Observable.of(createMessage("reuse-session", loadedSession));
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
	      return createPersistentSessionAndLoad(mediaKeys, keySystem, storedEntry.sessionId, initDataType, initData, errorStream);
	    }
	  }

	  // we have a fresh session without persisted informations and need
	  // to make a new key request that we will associate to this
	  // session
	  return createSessionAndKeyRequestWithRetry(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream);
	}

	// listen to "message" events from session containing a challenge
	// blob and map them to licenses using the getLicense method from
	// selected keySystem
	function sessionEventsHandler(session, keySystem, errorStream) {
	  log.debug("eme: handle message events", session);
	  var sessionId = void 0;

	  function licenseErrorSelector(error, fatal) {
	    if (error.type === ErrorTypes.ENCRYPTED_MEDIA_ERROR) {
	      error.fatal = fatal;
	      return error;
	    } else {
	      return new EncryptedMediaError("KEY_LOAD_ERROR", error, fatal);
	    }
	  }

	  var getLicenseRetryOptions = {
	    totalRetry: 2,
	    retryDelay: 200,
	    errorSelector: function errorSelector(error) {
	      return licenseErrorSelector(error, true);
	    },
	    onRetry: function onRetry(error) {
	      return errorStream.next(licenseErrorSelector(error, false));
	    }
	  };

	  var keyErrors = onKeyError(session).map(function (error) {
	    throw new EncryptedMediaError("KEY_ERROR", error, true);
	  });

	  var keyStatusesChanges = onKeyStatusesChange(session).mergeMap(function (keyStatusesEvent) {
	    sessionId = keyStatusesEvent.sessionId;
	    log.debug("eme: keystatuseschange event", sessionId, session, keyStatusesEvent);

	    // find out possible errors associated with this event
	    session.keyStatuses.forEach(function (keyId, keyStatus) {
	      // TODO: remove this hack present because the order of the
	      // arguments has changed in spec and is not the same between
	      // Edge and Chrome.
	      var reason = KEY_STATUS_ERRORS[keyStatus] || KEY_STATUS_ERRORS[keyId];
	      if (reason) {
	        throw new EncryptedMediaError("KEY_STATUS_CHANGE_ERROR", keyStatus, true);
	      }
	    });

	    // otherwise use the keysystem handler if disponible
	    if (!keySystem.onKeyStatusesChange) {
	      log.info("eme: keystatuseschange event not handled");
	      return empty();
	    }

	    var license = tryCatch(function () {
	      return castToObservable(keySystem.onKeyStatusesChange(keyStatusesEvent, session));
	    });

	    return license.catch(function (error) {
	      throw new EncryptedMediaError("KEY_STATUS_CHANGE_ERROR", error, true);
	    });
	  });

	  var keyMessages = onKeyMessage(session).mergeMap(function (messageEvent) {
	    sessionId = messageEvent.sessionId;

	    var message = new Uint8Array(messageEvent.message);
	    var messageType = messageEvent.messageType || "license-request";

	    log.debug("eme: event message type " + messageType, session, messageEvent);

	    var getLicense = defer(function () {
	      return castToObservable(keySystem.getLicense(message, messageType)).timeout(10 * 1000, new EncryptedMediaError("KEY_LOAD_TIMEOUT", null, false));
	    });

	    return retryWithBackoff(getLicense, getLicenseRetryOptions);
	  });

	  var sessionUpdates = merge(keyMessages, keyStatusesChanges).concatMap(function (res) {
	    log.debug("eme: update session", sessionId, res);

	    return castToObservable(session.update(res, sessionId)).catch(function (error) {
	      throw new EncryptedMediaError("KEY_UPDATE_ERROR", error, true);
	    }).mapTo(createMessage("session-update", session, { updatedWith: res }));
	  });

	  var sessionEvents = merge(sessionUpdates, keyErrors);
	  if (session.closed) {
	    return sessionEvents.takeUntil(castToObservable(session.closed));
	  } else {
	    return sessionEvents;
	  }
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
	function createEME(video, keySystems, errorStream) {
	  if (false) {
	    keySystems.forEach(function (ks) {
	      return assert.iface(ks, "keySystem", {
	        getLicense: "function",
	        type: "string"
	      });
	    });
	  }

	  function handleEncryptedEvents(encryptedEvent, _ref) {
	    var keySystem = _ref.keySystem,
	        keySystemAccess = _ref.keySystemAccess;

	    if (keySystem.persistentLicense) {
	      $storedSessions.setStorage(keySystem.licenseStorage);
	    }

	    log.info("eme: encrypted event", encryptedEvent);
	    return createAndSetMediaKeys(video, keySystem, keySystemAccess).mergeMap(function (mediaKeys) {
	      return manageSessionCreation(mediaKeys, keySystemAccess.getConfiguration(), keySystem, encryptedEvent.initDataType, new Uint8Array(encryptedEvent.initData), errorStream);
	    });
	  }

	  return combineLatest(onEncrypted(video), findCompatibleKeySystem(keySystems)).take(1).mergeMap(function (_ref2) {
	    var evt = _ref2[0],
	        ks = _ref2[1];
	    return handleEncryptedEvents(evt, ks);
	  });
	}

	function getCurrentKeySystem() {
	  return $keySystem && $keySystem.type;
	}

	function dispose() {
	  // Remove MediaKey before to prevent MediaKey error
	  // if other instance is creating after dispose
	  if ($videoElement) {
	    setMediaKeys($videoElement, null).subscribe(function () {});
	  }
	  $mediaKeys = null;
	  $keySystem = null;
	  $videoElement = null;
	  $loadedSessions.dispose();
	}

	module.exports = {
	  createEME: createEME,
	  getCurrentKeySystem: getCurrentKeySystem,
	  onEncrypted: onEncrypted,
	  dispose: dispose
	};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);

	var _require = __webpack_require__(34),
	    getAdaptationsByType = _require.getAdaptationsByType;

	var _require2 = __webpack_require__(24),
	    InitSegment = _require2.InitSegment;

	var Template = __webpack_require__(138);
	var Timeline = __webpack_require__(54);
	var List = __webpack_require__(137);
	var Base = __webpack_require__(136);

	var _require3 = __webpack_require__(7),
	    IndexError = _require3.IndexError;

	function selectIndexHandler(index) {
	  var indexType = index.indexType;

	  switch (indexType) {
	    case "template":
	      return Template;
	    case "timeline":
	      return Timeline;
	    case "list":
	      return List;
	    case "base":
	      return Base;
	    default:
	      throw new IndexError("UNKNOWN_INDEX", indexType, true);
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

	  IndexHandler.prototype.checkDiscontinuity = function checkDiscontinuity(time) {
	    if (!this.adaptation.isLive) {
	      return null;
	    }
	    var timescale = this.index.timescale || 1;
	    var ts = this.handler.checkDiscontinuity(time * timescale);
	    if (ts > 0) {
	      return { ts: ts / timescale + 1 };
	    }
	    return null;
	  };

	  IndexHandler.prototype.getSegments = function getSegments(ts, offset, bufSize) {
	    var _normalizeRange = this.normalizeRange(ts, offset, bufSize),
	        time = _normalizeRange.time,
	        up = _normalizeRange.up,
	        to = _normalizeRange.to;

	    if (!this.handler.checkRange(time)) {
	      throw new IndexError("OUT_OF_INDEX_ERROR", this.index.indexType, false);
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
	  IndexHandler: IndexHandler,
	  getLiveEdge: getLiveEdge
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(24),
	    Segment = _require.Segment;

	function getTimelineBound(_ref) {
	  var ts = _ref.ts,
	      d = _ref.d,
	      r = _ref.r;

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
	    var adaptation = this.adaptation,
	        representation = this.representation;
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

	  Timeline.prototype.checkDiscontinuity = function checkDiscontinuity(time) {
	    if (time <= 0) {
	      return -1;
	    }

	    var index = this.getSegmentIndex(time);
	    if (index < 0 || index >= this.timeline.length - 1) {
	      return -1;
	    }

	    var range = this.timeline[index];
	    if (range.d === -1) {
	      return -1;
	    }

	    var rangeUp = range.ts;
	    var rangeTo = getTimelineBound(range);
	    var nextRange = this.timeline[index + 1];

	    var timescale = this.index.timescale || 1;
	    // when we are actually inside the found range and this range has
	    // an explicit discontinuity with the next one
	    if (rangeTo !== nextRange.ts && time >= rangeUp && time <= rangeTo && rangeTo - time < timescale) {
	      return nextRange.ts;
	    }

	    return -1;
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
	      var d = segmentRange.d,
	          ts = segmentRange.ts,
	          range = segmentRange.range;

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
	      var segmentTime = void 0;
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

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EventEmitter = __webpack_require__(35);

	var _require = __webpack_require__(20),
	    BufferedRanges = _require.BufferedRanges;

	var assert = __webpack_require__(3);

	var _require2 = __webpack_require__(15),
	    tryCatch = _require2.tryCatch,
	    castToObservable = _require2.castToObservable;

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

	    assert(!this.updating, "updating");
	    this.updating = true;
	    this.trigger("updatestart");
	    var result = tryCatch(function () {
	      return castToObservable(func());
	    });
	    result.subscribe(function () {
	      return setTimeout(function () {
	        return _this4._unlock("update");
	      }, 0);
	    }, function (e) {
	      return setTimeout(function () {
	        return _this4._unlock("error", e);
	      }, 0);
	    });
	  };

	  AbstractSourceBuffer.prototype._unlock = function _unlock(eventName, value) {
	    this.updating = false;
	    this.trigger(eventName, value);
	    this.trigger("updateend");
	  };

	  return AbstractSourceBuffer;
	}(EventEmitter);

	module.exports = {
	  AbstractSourceBuffer: AbstractSourceBuffer
	};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(1),
	    Observable = _require.Observable;

	var _require2 = __webpack_require__(25),
	    BehaviorSubject = _require2.BehaviorSubject;

	var _require3 = __webpack_require__(20),
	    BufferedRanges = _require3.BufferedRanges;

	// time changes interval in milliseconds


	var SAMPLING_INTERVAL_MEDIASOURCE = 1000;
	var SAMPLING_INTERVAL_NO_MEDIASOURCE = 500;

	// time in seconds protecting live buffer to prevent ahead of time
	// buffering
	var LIVE_PROTECTION = 10;

	// stall gap in seconds
	var STALL_GAP = 0.5;
	var RESUME_GAP = 5;

	// seek gap in seconds
	var SEEK_GAP = 2;

	var SCANNED_VIDEO_EVENTS = ["canplay", "play", "progress", "seeking", "seeked", "loadedmetadata"];

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
	  function Timings(ts, buffered, duration, gap, name, playback, range, readyState, stalled, paused) {
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
	    this.paused = paused;
	  }

	  Timings.prototype.clone = function clone() {
	    return new Timings(this.ts, this.buffered, this.duration, this.gap, this.name, this.playback, this.range, this.readyState, this.stalled, this.paused);
	  };

	  return Timings;
	}();

	function getEmptyTimings() {
	  return new Timings(0, new BufferedRanges(), 0, Infinity, "timeupdate", 1, null, 0, null, null);
	}

	function getTimings(video, name) {
	  var ts = video.currentTime;
	  var paused = video.paused;
	  var buffered = new BufferedRanges(video.buffered);
	  return new Timings(ts, buffered, video.duration, buffered.getGap(ts), name, video.playbackRate, buffered.getRange(ts), video.readyState, null, paused);
	}

	function scanTimings(prevTimings, currentTimings, requiresMediaSource) {
	  var currentName = currentTimings.name,
	      currentTs = currentTimings.ts,
	      gap = currentTimings.gap,
	      range = currentTimings.range,
	      duration = currentTimings.duration,
	      paused = currentTimings.paused,
	      readyState = currentTimings.readyState,
	      playback = currentTimings.playback;
	  var prevStalled = prevTimings.stalled,
	      prevName = prevTimings.name,
	      prevTs = prevTimings.ts;


	  var ending = isEnding(gap, range, duration);

	  var mayStall = readyState >= 1 && currentName != "loadedmetadata" && !prevStalled && !ending;

	  var shouldStall = void 0,
	      shouldUnstall = void 0;

	  // when using a direct file, the video will stall and unstall on its
	  // own, so we only try to detect when the video timestamp has not changed
	  // between two consecutive timeupdates
	  if (requiresMediaSource) {
	    shouldStall = mayStall && (gap <= STALL_GAP || gap === Infinity || readyState === 1);

	    shouldUnstall = prevStalled && readyState > 1 && gap < Infinity && (gap > resumeGap(prevStalled) || ending);
	  } else {
	    shouldStall = mayStall && (!paused && currentName == "timeupdate" && prevName == "timeupdate" && currentTs === prevTs || currentName == "seeking" && gap === Infinity);

	    shouldUnstall = prevStalled && (currentName != "seeking" && currentTs !== prevTs || currentName == "canplay" || gap < Infinity && (gap > resumeGap(prevStalled) || ending));
	  }

	  var stalled = void 0;
	  if (shouldStall) {
	    stalled = { name: currentName, playback: playback };
	  } else if (shouldUnstall) {
	    stalled = null;
	  } else {
	    stalled = prevStalled;
	  }

	  currentTimings.stalled = stalled;
	  return currentTimings;
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
	function createTimingsSampler(video, _ref) {
	  var requiresMediaSource = _ref.requiresMediaSource;

	  return Observable.create(function (obs) {
	    var prevTimings = getTimings(video, "init");

	    function emitSample(evt) {
	      var timingEventType = evt && evt.type || "timeupdate";
	      var currentTimings = getTimings(video, timingEventType);
	      prevTimings = scanTimings(prevTimings, currentTimings, requiresMediaSource);
	      obs.next(prevTimings);
	    }

	    var samplerTimeInterval = requiresMediaSource ? SAMPLING_INTERVAL_MEDIASOURCE : SAMPLING_INTERVAL_NO_MEDIASOURCE;

	    var timeUpdateHandler = setInterval(emitSample, samplerTimeInterval);
	    SCANNED_VIDEO_EVENTS.forEach(function (eventName) {
	      return video.addEventListener(eventName, emitSample);
	    });

	    obs.next(prevTimings);

	    return function () {
	      clearInterval(timeUpdateHandler);
	      SCANNED_VIDEO_EVENTS.forEach(function (eventName) {
	        return video.removeEventListener(eventName, emitSample);
	      });
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
	  var suggestedPresentationDelay = manifest.suggestedPresentationDelay,
	      presentationLiveGap = manifest.presentationLiveGap,
	      timeShiftBufferDepth = manifest.timeShiftBufferDepth;


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

	  var availabilityStartTime = manifest.availabilityStartTime,
	      presentationLiveGap = manifest.presentationLiveGap;


	  var liveGap = Date.now() / 1000 - ts;
	  return liveGap - (availabilityStartTime + presentationLiveGap + LIVE_PROTECTION);
	}

	module.exports = {
	  getEmptyTimings: getEmptyTimings,
	  getTimings: getTimings,
	  createTimingsSampler: createTimingsSampler,
	  seekingsSampler: seekingsSampler,
	  getLiveGap: getLiveGap,
	  toWallClockTime: toWallClockTime,
	  fromWallClockTime: fromWallClockTime
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(1),
	    Observable = _require.Observable;

	var _require2 = __webpack_require__(2),
	    Subscriber = _require2.Subscriber;

	var _require3 = __webpack_require__(7),
	    RequestError = _require3.RequestError,
	    RequestErrorTypes = _require3.RequestErrorTypes;

	function createXHRDefault() {
	  return new XMLHttpRequest();
	}

	function toJSONForIE(data) {
	  try {
	    return JSON.parse(data);
	  } catch (e) {
	    return null;
	  }
	}

	var RequestResponse = function RequestResponse(status, url, responseType, sentTime, receivedTime, size, responseData) {
	  _classCallCheck(this, RequestResponse);

	  this.status = status;
	  this.url = url;
	  this.responseType = responseType;
	  this.sentTime = sentTime;
	  this.receivedTime = receivedTime;
	  this.duration = this.receivedTime - this.sentTime;
	  this.size = size;
	  this.responseData = responseData;
	};

	var RequestObservable = function (_Observable) {
	  _inherits(RequestObservable, _Observable);

	  function RequestObservable(options) {
	    _classCallCheck(this, RequestObservable);

	    var _this = _possibleConstructorReturn(this, _Observable.call(this));

	    var request = {
	      url: "",
	      createXHR: createXHRDefault,
	      headers: null,
	      method: "GET",
	      responseType: "json",
	      timeout: 10 * 1000,
	      resultSelector: null,
	      body: null
	    };

	    for (var prop in options) {
	      request[prop] = options[prop];
	    }

	    _this.request = request;
	    return _this;
	  }

	  RequestObservable.prototype._subscribe = function _subscribe(subscriber) {
	    return new RequestSubscriber(subscriber, this.request);
	  };

	  return RequestObservable;
	}(Observable);

	var RequestSubscriber = function (_Subscriber) {
	  _inherits(RequestSubscriber, _Subscriber);

	  function RequestSubscriber(destination, request) {
	    _classCallCheck(this, RequestSubscriber);

	    var _this2 = _possibleConstructorReturn(this, _Subscriber.call(this, destination));

	    _this2.request = request;
	    _this2.sentTime = Date.now();
	    _this2.receivedTime = 0;

	    _this2.xhr = null;
	    _this2.done = false;
	    _this2.resultSelector = request.resultSelector;
	    _this2.send();
	    return _this2;
	  }

	  RequestSubscriber.prototype.next = function next() {
	    this.done = true;
	    var resultSelector = this.resultSelector,
	        xhr = this.xhr,
	        request = this.request,
	        destination = this.destination;


	    var status = xhr.status;
	    var responseType = this.responseType;
	    var size = this.totalSize;
	    var sentTime = this.sentTime;
	    var receivedTime = this.receivedTime;
	    var url = xhr.responseURL || request.url;

	    var responseData = void 0;
	    if (request.responseType == "json") {
	      // IE bug where response is string with responseType json
	      if (typeof xhr.response != "string") {
	        responseData = xhr.response;
	      } else {
	        responseData = toJSONForIE(xhr.responseText);
	      }
	    } else {
	      responseData = xhr.response;
	    }

	    if (responseData == null) {
	      destination.error(new RequestError(this, request, RequestErrorTypes.PARSE_ERROR));
	      return;
	    }

	    var response = new RequestResponse(status, url, responseType, sentTime, receivedTime, size, responseData);

	    if (resultSelector) {
	      destination.next(resultSelector(response));
	    } else {
	      destination.next(response);
	    }
	  };

	  RequestSubscriber.prototype.setHeaders = function setHeaders(xhr, headers) {
	    for (var key in headers) {
	      xhr.setRequestHeader(key, headers[key]);
	    }
	  };

	  RequestSubscriber.prototype.setupEvents = function setupEvents(xhr, request) {
	    xhr.ontimeout = function xhrTimeout() {
	      var subscriber = xhrTimeout.subscriber,
	          request = xhrTimeout.request;

	      subscriber.error(new RequestError(this, request, RequestErrorTypes.TIMEOUT));
	    };
	    xhr.ontimeout.request = request;
	    xhr.ontimeout.subscriber = this;

	    xhr.onerror = function xhrError() {
	      var subscriber = xhrError.subscriber,
	          request = xhrError.request;

	      subscriber.error(new RequestError(this, request, RequestErrorTypes.ERROR_EVENT));
	    };
	    xhr.onerror.request = request;
	    xhr.onerror.subscriber = this;

	    xhr.onload = function xhrOnLoad(e) {
	      if (this.readyState === 4) {
	        var subscriber = xhrOnLoad.subscriber,
	            _request = xhrOnLoad.request;

	        subscriber.receivedTime = Date.now();
	        subscriber.totalSize = e.total;
	        var status = this.status;
	        if (200 <= status && status < 300) {
	          subscriber.next(e);
	          subscriber.complete();
	        } else {
	          subscriber.error(new RequestError(this, _request, RequestErrorTypes.ERROR_HTTP_CODE));
	        }
	      }
	    };
	    xhr.onload.subscriber = this;
	    xhr.onload.request = request;
	  };

	  RequestSubscriber.prototype.send = function send() {
	    var request = this.request,
	        _request2 = this.request,
	        method = _request2.method,
	        url = _request2.url,
	        headers = _request2.headers,
	        body = _request2.body,
	        responseType = _request2.responseType,
	        timeout = _request2.timeout;


	    var xhr = (request.createXHR || createXHRDefault)(request);

	    this.xhr = xhr;
	    xhr.open(method, url, true);

	    xhr.timeout = timeout;
	    xhr.responseType = responseType;

	    if (responseType == "document") {
	      xhr.overrideMimeType("text/xml");
	    }

	    if (headers) {
	      this.setHeaders(xhr, headers);
	    }

	    this.setupEvents(xhr, request);

	    if (body) {
	      xhr.send(body);
	    } else {
	      xhr.send();
	    }
	  };

	  RequestSubscriber.prototype.unsubscribe = function unsubscribe() {
	    var done = this.done,
	        xhr = this.xhr;

	    if (!done && xhr && xhr.readyState !== 4) {
	      xhr.abort();
	    }
	    xhr.ontimeout = null;
	    xhr.onerror = null;
	    xhr.onload = null;
	    _Subscriber.prototype.unsubscribe.call(this);
	  };

	  return RequestSubscriber;
	}(Subscriber);

	/**
	 * Creates an observable HTTP request.
	 * The options that can be passed are:
	 *
	 *    - url            Request's url
	 *    - [method]       HTTP method (defaults is "GET")
	 *    - [data]         Sent data for "POST", "UPDATE" or "PATCH" requests
	 *    - [headers]      Object containing headers key/value
	 *    - [responseType] Format of the response, according to the XMLHttpRequest Level 2
	 *                     response type: "arraybuffer", "blob", "document", "json" or "text" (defaults)
	 */


	function request(options) {
	  return new RequestObservable(options);
	}

	request.RequestObservable = RequestObservable;
	request.RequestError = RequestError;
	request.RequestResponse = RequestResponse;
	request.RequestErrorTypes = RequestErrorTypes;

	module.exports = request;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
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

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	/**
	 * Represents a push-based event or value that an {@link Observable} can emit.
	 * This class is particularly useful for operators that manage notifications,
	 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
	 * others. Besides wrapping the actual delivered value, it also annotates it
	 * with metadata of, for instance, what type of push message it is (`next`,
	 * `error`, or `complete`).
	 *
	 * @see {@link materialize}
	 * @see {@link dematerialize}
	 * @see {@link observeOn}
	 *
	 * @class Notification<T>
	 */
	var Notification = function () {
	    function Notification(kind, value, exception) {
	        this.kind = kind;
	        this.value = value;
	        this.exception = exception;
	        this.hasValue = kind === 'N';
	    }
	    /**
	     * Delivers to the given `observer` the value wrapped by this Notification.
	     * @param {Observer} observer
	     * @return
	     */
	    Notification.prototype.observe = function (observer) {
	        switch (this.kind) {
	            case 'N':
	                return observer.next && observer.next(this.value);
	            case 'E':
	                return observer.error && observer.error(this.exception);
	            case 'C':
	                return observer.complete && observer.complete();
	        }
	    };
	    /**
	     * Given some {@link Observer} callbacks, deliver the value represented by the
	     * current Notification to the correctly corresponding callback.
	     * @param {function(value: T): void} next An Observer `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.do = function (next, error, complete) {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return next && next(this.value);
	            case 'E':
	                return error && error(this.exception);
	            case 'C':
	                return complete && complete();
	        }
	    };
	    /**
	     * Takes an Observer or its individual callback functions, and calls `observe`
	     * or `do` methods accordingly.
	     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
	     * the `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	            return this.observe(nextOrObserver);
	        } else {
	            return this.do(nextOrObserver, error, complete);
	        }
	    };
	    /**
	     * Returns a simple Observable that just delivers the notification represented
	     * by this Notification instance.
	     * @return {any}
	     */
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
	        throw new Error('unexpected notification kind value');
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `next` from a
	     * given value.
	     * @param {T} value The `next` value.
	     * @return {Notification<T>} The "next" Notification representing the
	     * argument.
	     */
	    Notification.createNext = function (value) {
	        if (typeof value !== 'undefined') {
	            return new Notification('N', value);
	        }
	        return this.undefinedValueNotification;
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `error` from a
	     * given error.
	     * @param {any} [err] The `error` exception.
	     * @return {Notification<T>} The "error" Notification representing the
	     * argument.
	     */
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `complete`.
	     * @return {Notification<any>} The valueless "complete" Notification.
	     */
	    Notification.createComplete = function () {
	        return this.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    Notification.undefinedValueNotification = new Notification('N', undefined);
	    return Notification;
	}();
	exports.Notification = Notification;
	//# sourceMappingURL=Notification.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	"use strict";
	/**
	 * An execution context and a data structure to order tasks and schedule their
	 * execution. Provides a notion of (potentially virtual) time, through the
	 * `now()` getter method.
	 *
	 * Each unit of work in a Scheduler is called an {@link Action}.
	 *
	 * ```ts
	 * class Scheduler {
	 *   now(): number;
	 *   schedule(work, delay?, state?): Subscription;
	 * }
	 * ```
	 *
	 * @class Scheduler
	 */

	var Scheduler = function () {
	    function Scheduler(SchedulerAction, now) {
	        if (now === void 0) {
	            now = Scheduler.now;
	        }
	        this.SchedulerAction = SchedulerAction;
	        this.now = now;
	    }
	    /**
	     * Schedules a function, `work`, for execution. May happen at some point in
	     * the future, according to the `delay` parameter, if specified. May be passed
	     * some context object, `state`, which will be passed to the `work` function.
	     *
	     * The given arguments will be processed an stored as an Action object in a
	     * queue of actions.
	     *
	     * @param {function(state: ?T): ?Subscription} work A function representing a
	     * task, or some unit of work to be executed by the Scheduler.
	     * @param {number} [delay] Time to wait before executing the work, where the
	     * time unit is implicit and defined by the Scheduler itself.
	     * @param {T} [state] Some contextual data that the `work` function uses when
	     * called by the Scheduler.
	     * @return {Subscription} A subscription in order to be able to unsubscribe
	     * the scheduled work.
	     */
	    Scheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        return new this.SchedulerAction(this, work).schedule(state, delay);
	    };
	    Scheduler.now = Date.now ? Date.now : function () {
	        return +new Date();
	    };
	    return Scheduler;
	}();
	exports.Scheduler = Scheduler;
	//# sourceMappingURL=Scheduler.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(4);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = function (_super) {
	    __extends(SubjectSubscription, _super);
	    function SubjectSubscription(subject, subscriber) {
	        _super.call(this);
	        this.subject = subject;
	        this.subscriber = subscriber;
	        this.closed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.subscriber);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription);
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var of_1 = __webpack_require__(94);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var throw_1 = __webpack_require__(95);
	Observable_1.Observable.throw = throw_1._throw;
	//# sourceMappingURL=throw.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var catch_1 = __webpack_require__(96);
	Observable_1.Observable.prototype.catch = catch_1._catch;
	Observable_1.Observable.prototype._catch = catch_1._catch;
	//# sourceMappingURL=catch.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var concat_1 = __webpack_require__(43);
	Observable_1.Observable.prototype.concat = concat_1.concat;
	//# sourceMappingURL=concat.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var concatAll_1 = __webpack_require__(98);
	Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
	//# sourceMappingURL=concatAll.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var concatMap_1 = __webpack_require__(99);
	Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var debounceTime_1 = __webpack_require__(100);
	Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
	//# sourceMappingURL=debounceTime.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var distinctUntilChanged_1 = __webpack_require__(101);
	Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var do_1 = __webpack_require__(102);
	Observable_1.Observable.prototype.do = do_1._do;
	Observable_1.Observable.prototype._do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var filter_1 = __webpack_require__(103);
	Observable_1.Observable.prototype.filter = filter_1.filter;
	//# sourceMappingURL=filter.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var finally_1 = __webpack_require__(104);
	Observable_1.Observable.prototype.finally = finally_1._finally;
	Observable_1.Observable.prototype._finally = finally_1._finally;
	//# sourceMappingURL=finally.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var ignoreElements_1 = __webpack_require__(105);
	Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
	//# sourceMappingURL=ignoreElements.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var map_1 = __webpack_require__(106);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var mapTo_1 = __webpack_require__(107);
	Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
	//# sourceMappingURL=mapTo.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var mergeMap_1 = __webpack_require__(44);
	Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
	Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
	//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var multicast_1 = __webpack_require__(28);
	Observable_1.Observable.prototype.multicast = multicast_1.multicast;
	//# sourceMappingURL=multicast.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var publish_1 = __webpack_require__(110);
	Observable_1.Observable.prototype.publish = publish_1.publish;
	//# sourceMappingURL=publish.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var scan_1 = __webpack_require__(111);
	Observable_1.Observable.prototype.scan = scan_1.scan;
	//# sourceMappingURL=scan.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var share_1 = __webpack_require__(112);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var skip_1 = __webpack_require__(113);
	Observable_1.Observable.prototype.skip = skip_1.skip;
	//# sourceMappingURL=skip.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var startWith_1 = __webpack_require__(114);
	Observable_1.Observable.prototype.startWith = startWith_1.startWith;
	//# sourceMappingURL=startWith.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var switchMap_1 = __webpack_require__(115);
	Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
	//# sourceMappingURL=switchMap.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var take_1 = __webpack_require__(116);
	Observable_1.Observable.prototype.take = take_1.take;
	//# sourceMappingURL=take.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var takeUntil_1 = __webpack_require__(117);
	Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
	//# sourceMappingURL=takeUntil.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Observable_1 = __webpack_require__(1);
	var timeout_1 = __webpack_require__(118);
	Observable_1.Observable.prototype.timeout = timeout_1.timeout;
	//# sourceMappingURL=timeout.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var ScalarObservable_1 = __webpack_require__(26);
	var EmptyObservable_1 = __webpack_require__(5);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayLikeObservable = function (_super) {
	    __extends(ArrayLikeObservable, _super);
	    function ArrayLikeObservable(arrayLike, scheduler) {
	        _super.call(this);
	        this.arrayLike = arrayLike;
	        this.scheduler = scheduler;
	        if (!scheduler && arrayLike.length === 1) {
	            this._isScalar = true;
	            this.value = arrayLike[0];
	        }
	    }
	    ArrayLikeObservable.create = function (arrayLike, scheduler) {
	        var length = arrayLike.length;
	        if (length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        } else if (length === 1) {
	            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
	        } else {
	            return new ArrayLikeObservable(arrayLike, scheduler);
	        }
	    };
	    ArrayLikeObservable.dispatch = function (state) {
	        var arrayLike = state.arrayLike,
	            index = state.index,
	            length = state.length,
	            subscriber = state.subscriber;
	        if (subscriber.closed) {
	            return;
	        }
	        if (index >= length) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(arrayLike[index]);
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this,
	            arrayLike = _a.arrayLike,
	            scheduler = _a.scheduler;
	        var length = arrayLike.length;
	        if (scheduler) {
	            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
	                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
	            });
	        } else {
	            for (var i = 0; i < length && !subscriber.closed; i++) {
	                subscriber.next(arrayLike[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayLikeObservable;
	}(Observable_1.Observable);
	exports.ArrayLikeObservable = ArrayLikeObservable;
	//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(8);
	var Observable_1 = __webpack_require__(1);
	var Subscriber_1 = __webpack_require__(2);
	var Subscription_1 = __webpack_require__(4);
	/**
	 * @class ConnectableObservable<T>
	 */
	var ConnectableObservable = function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	        this._refCount = 0;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var connection = this._connection;
	        if (!connection) {
	            connection = this._connection = new Subscription_1.Subscription();
	            connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
	            if (connection.closed) {
	                this._connection = null;
	                connection = Subscription_1.Subscription.EMPTY;
	            } else {
	                this._connection = connection;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return this.lift(new RefCountOperator(this));
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable);
	exports.ConnectableObservable = ConnectableObservable;
	exports.connectableObservableDescriptor = {
	    operator: { value: null },
	    _refCount: { value: 0, writable: true },
	    _subscribe: { value: ConnectableObservable.prototype._subscribe },
	    getSubject: { value: ConnectableObservable.prototype.getSubject },
	    connect: { value: ConnectableObservable.prototype.connect },
	    refCount: { value: ConnectableObservable.prototype.refCount }
	};
	var ConnectableSubscriber = function (_super) {
	    __extends(ConnectableSubscriber, _super);
	    function ConnectableSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    ConnectableSubscriber.prototype._error = function (err) {
	        this._unsubscribe();
	        _super.prototype._error.call(this, err);
	    };
	    ConnectableSubscriber.prototype._complete = function () {
	        this._unsubscribe();
	        _super.prototype._complete.call(this);
	    };
	    ConnectableSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (connectable) {
	            this.connectable = null;
	            var connection = connectable._connection;
	            connectable._refCount = 0;
	            connectable._subject = null;
	            connectable._connection = null;
	            if (connection) {
	                connection.unsubscribe();
	            }
	        }
	    };
	    return ConnectableSubscriber;
	}(Subject_1.SubjectSubscriber);
	var RefCountOperator = function () {
	    function RefCountOperator(connectable) {
	        this.connectable = connectable;
	    }
	    RefCountOperator.prototype.call = function (subscriber, source) {
	        var connectable = this.connectable;
	        connectable._refCount++;
	        var refCounter = new RefCountSubscriber(subscriber, connectable);
	        var subscription = source._subscribe(refCounter);
	        if (!refCounter.closed) {
	            refCounter.connection = connectable.connect();
	        }
	        return subscription;
	    };
	    return RefCountOperator;
	}();
	var RefCountSubscriber = function (_super) {
	    __extends(RefCountSubscriber, _super);
	    function RefCountSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    RefCountSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (!connectable) {
	            this.connection = null;
	            return;
	        }
	        this.connectable = null;
	        var refCount = connectable._refCount;
	        if (refCount <= 0) {
	            this.connection = null;
	            return;
	        }
	        connectable._refCount = refCount - 1;
	        if (refCount > 1) {
	            this.connection = null;
	            return;
	        }
	        ///
	        // Compare the local RefCountSubscriber's connection Subscription to the
	        // connection Subscription on the shared ConnectableObservable. In cases
	        // where the ConnectableObservable source synchronously emits values, and
	        // the RefCountSubscriber's dowstream Observers synchronously unsubscribe,
	        // execution continues to here before the RefCountOperator has a chance to
	        // supply the RefCountSubscriber with the shared connection Subscription.
	        // For example:
	        // ```
	        // Observable.range(0, 10)
	        //   .publish()
	        //   .refCount()
	        //   .take(5)
	        //   .subscribe();
	        // ```
	        // In order to account for this case, RefCountSubscriber should only dispose
	        // the ConnectableObservable's shared connection Subscription if the
	        // connection Subscription exists, *and* either:
	        //   a. RefCountSubscriber doesn't have a reference to the shared connection
	        //      Subscription yet, or,
	        //   b. RefCountSubscriber's connection Subscription reference is identical
	        //      to the shared connection Subscription
	        ///
	        var connection = this.connection;
	        var sharedConnection = connectable._connection;
	        this.connection = null;
	        if (sharedConnection && (!connection || sharedConnection === connection)) {
	            sharedConnection.unsubscribe();
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ErrorObservable = function (_super) {
	    __extends(ErrorObservable, _super);
	    function ErrorObservable(error, scheduler) {
	        _super.call(this);
	        this.error = error;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits an error notification.
	     *
	     * <span class="informal">Just emits 'error', and nothing else.
	     * </span>
	     *
	     * <img src="./img/throw.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the error notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then emit an error.</caption>
	     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @example <caption>Map and flattens numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x === 13 ?
	     *     Rx.Observable.throw('Thirteens are bad') :
	     *     Rx.Observable.of('a', 'b', 'c')
	     * );
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link of}
	     *
	     * @param {any} error The particular Error to pass to the error notification.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the error notification.
	     * @return {Observable} An error Observable: emits only the error notification
	     * using the given error argument.
	     * @static true
	     * @name throw
	     * @owner Observable
	     */
	    ErrorObservable.create = function (error, scheduler) {
	        return new ErrorObservable(error, scheduler);
	    };
	    ErrorObservable.dispatch = function (arg) {
	        var error = arg.error,
	            subscriber = arg.subscriber;
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
	//# sourceMappingURL=ErrorObservable.js.map

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1 = __webpack_require__(16);
	var isPromise_1 = __webpack_require__(50);
	var PromiseObservable_1 = __webpack_require__(41);
	var IteratorObservable_1 = __webpack_require__(92);
	var ArrayObservable_1 = __webpack_require__(11);
	var ArrayLikeObservable_1 = __webpack_require__(87);
	var iterator_1 = __webpack_require__(29);
	var Observable_1 = __webpack_require__(1);
	var observeOn_1 = __webpack_require__(109);
	var observable_1 = __webpack_require__(30);
	var isArrayLike = function isArrayLike(x) {
	    return x && typeof x.length === 'number';
	};
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromObservable = function (_super) {
	    __extends(FromObservable, _super);
	    function FromObservable(ish, scheduler) {
	        _super.call(this, null);
	        this.ish = ish;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable from an Array, an array-like object, a Promise, an
	     * iterable object, or an Observable-like object.
	     *
	     * <span class="informal">Converts almost anything to an Observable.</span>
	     *
	     * <img src="./img/from.png" width="100%">
	     *
	     * Convert various other objects and data types into Observables. `from`
	     * converts a Promise or an array-like or an
	     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
	     * object into an Observable that emits the items in that promise or array or
	     * iterable. A String, in this context, is treated as an array of characters.
	     * Observable-like objects (contains a function named with the ES2015 Symbol
	     * for Observable) can also be converted through this operator.
	     *
	     * @example <caption>Converts an array to an Observable</caption>
	     * var array = [10, 20, 30];
	     * var result = Rx.Observable.from(array);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
	     * function* generateDoubles(seed) {
	     *   var i = seed;
	     *   while (true) {
	     *     yield i;
	     *     i = 2 * i; // double it
	     *   }
	     * }
	     *
	     * var iterator = generateDoubles(3);
	     * var result = Rx.Observable.from(iterator).take(10);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link fromEvent}
	     * @see {@link fromEventPattern}
	     * @see {@link fromPromise}
	     *
	     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
	     * Observable-like, an Array, an iterable or an array-like object to be
	     * converted.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * emissions of values.
	     * @return {Observable<T>} The Observable whose values are originally from the
	     * input object that was converted.
	     * @static true
	     * @name from
	     * @owner Observable
	     */
	    FromObservable.create = function (ish, scheduler) {
	        if (ish != null) {
	            if (typeof ish[observable_1.$$observable] === 'function') {
	                if (ish instanceof Observable_1.Observable && !scheduler) {
	                    return ish;
	                }
	                return new FromObservable(ish, scheduler);
	            } else if (isArray_1.isArray(ish)) {
	                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
	            } else if (isPromise_1.isPromise(ish)) {
	                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
	            } else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
	                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
	            } else if (isArrayLike(ish)) {
	                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
	            }
	        }
	        throw new TypeError((ish !== null && (typeof ish === 'undefined' ? 'undefined' : _typeof(ish)) || ish) + ' is not observable');
	    };
	    FromObservable.prototype._subscribe = function (subscriber) {
	        var ish = this.ish;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            return ish[observable_1.$$observable]().subscribe(subscriber);
	        } else {
	            return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
	        }
	    };
	    return FromObservable;
	}(Observable_1.Observable);
	exports.FromObservable = FromObservable;
	//# sourceMappingURL=FromObservable.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1 = __webpack_require__(49);
	var Observable_1 = __webpack_require__(1);
	var async_1 = __webpack_require__(22);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IntervalObservable = function (_super) {
	    __extends(IntervalObservable, _super);
	    function IntervalObservable(period, scheduler) {
	        if (period === void 0) {
	            period = 0;
	        }
	        if (scheduler === void 0) {
	            scheduler = async_1.async;
	        }
	        _super.call(this);
	        this.period = period;
	        this.scheduler = scheduler;
	        if (!isNumeric_1.isNumeric(period) || period < 0) {
	            this.period = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            this.scheduler = async_1.async;
	        }
	    }
	    /**
	     * Creates an Observable that emits sequential numbers every specified
	     * interval of time, on a specified Scheduler.
	     *
	     * <span class="informal">Emits incremental numbers periodically in time.
	     * </span>
	     *
	     * <img src="./img/interval.png" width="100%">
	     *
	     * `interval` returns an Observable that emits an infinite sequence of
	     * ascending integers, with a constant interval of time of your choosing
	     * between those emissions. The first emission is not sent immediately, but
	     * only after the first period has passed. By default, this operator uses the
	     * `async` Scheduler to provide a notion of time, but you may pass any
	     * Scheduler to it.
	     *
	     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
	     * var numbers = Rx.Observable.interval(1000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @see {@link timer}
	     * @see {@link delay}
	     *
	     * @param {number} [period=0] The interval size in milliseconds (by default)
	     * or the time unit determined by the scheduler's clock.
	     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
	     * the emission of values, and providing a notion of "time".
	     * @return {Observable} An Observable that emits a sequential number each time
	     * interval.
	     * @static true
	     * @name interval
	     * @owner Observable
	     */
	    IntervalObservable.create = function (period, scheduler) {
	        if (period === void 0) {
	            period = 0;
	        }
	        if (scheduler === void 0) {
	            scheduler = async_1.async;
	        }
	        return new IntervalObservable(period, scheduler);
	    };
	    IntervalObservable.dispatch = function (state) {
	        var index = state.index,
	            subscriber = state.subscriber,
	            period = state.period;
	        subscriber.next(index);
	        if (subscriber.closed) {
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
	//# sourceMappingURL=IntervalObservable.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(6);
	var Observable_1 = __webpack_require__(1);
	var iterator_1 = __webpack_require__(29);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IteratorObservable = function (_super) {
	    __extends(IteratorObservable, _super);
	    function IteratorObservable(iterator, scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        if (iterator == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        this.iterator = getIterator(iterator);
	    }
	    IteratorObservable.create = function (iterator, scheduler) {
	        return new IteratorObservable(iterator, scheduler);
	    };
	    IteratorObservable.dispatch = function (state) {
	        var index = state.index,
	            hasError = state.hasError,
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
	        subscriber.next(result.value);
	        state.index = index + 1;
	        if (subscriber.closed) {
	            return;
	        }
	        this.schedule(state);
	    };
	    IteratorObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this,
	            iterator = _a.iterator,
	            scheduler = _a.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                index: index, iterator: iterator, subscriber: subscriber
	            });
	        } else {
	            do {
	                var result = iterator.next();
	                if (result.done) {
	                    subscriber.complete();
	                    break;
	                } else {
	                    subscriber.next(result.value);
	                }
	                if (subscriber.closed) {
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
	    StringIterator.prototype[iterator_1.$$iterator] = function () {
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
	    ArrayIterator.prototype[iterator_1.$$iterator] = function () {
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
	    var i = obj[iterator_1.$$iterator];
	    if (!i && typeof obj === 'string') {
	        return new StringIterator(obj);
	    }
	    if (!i && obj.length !== undefined) {
	        return new ArrayIterator(obj);
	    }
	    if (!i) {
	        throw new TypeError('object is not iterable');
	    }
	    return obj[iterator_1.$$iterator]();
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

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(1);
	var noop_1 = __webpack_require__(51);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var NeverObservable = function (_super) {
	    __extends(NeverObservable, _super);
	    function NeverObservable() {
	        _super.call(this);
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer.
	     *
	     * <span class="informal">An Observable that never emits anything.</span>
	     *
	     * <img src="./img/never.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that emits
	     * neither values nor errors nor the completion notification. It can be used
	     * for testing purposes or for composing with other Observables. Please not
	     * that by never emitting a complete notification, this Observable keeps the
	     * subscription from being disposed automatically. Subscriptions need to be
	     * manually disposed.
	     *
	     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
	     * function info() {
	     *   console.log('Will not be called');
	     * }
	     * var result = Rx.Observable.never().startWith(7);
	     * result.subscribe(x => console.log(x), info, info);
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @return {Observable} A "never" Observable: never emits anything.
	     * @static true
	     * @name never
	     * @owner Observable
	     */
	    NeverObservable.create = function () {
	        return new NeverObservable();
	    };
	    NeverObservable.prototype._subscribe = function (subscriber) {
	        noop_1.noop();
	    };
	    return NeverObservable;
	}(Observable_1.Observable);
	exports.NeverObservable = NeverObservable;
	//# sourceMappingURL=NeverObservable.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var ArrayObservable_1 = __webpack_require__(11);
	exports.of = ArrayObservable_1.ArrayObservable.of;
	//# sourceMappingURL=of.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var ErrorObservable_1 = __webpack_require__(89);
	exports._throw = ErrorObservable_1.ErrorObservable.create;
	//# sourceMappingURL=throw.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(10);
	var subscribeToResult_1 = __webpack_require__(13);
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 * @method catch
	 * @owner Observable
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
	    CatchOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
	    };
	    return CatchOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CatchSubscriber = function (_super) {
	    __extends(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`.
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = void 0;
	            try {
	                result = this.selector(err, this.caught);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.unsubscribe();
	            this.destination.remove(this);
	            subscribeToResult_1.subscribeToResult(this, result);
	        }
	    };
	    return CatchSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=catch.js.map

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ArrayObservable_1 = __webpack_require__(11);
	var isArray_1 = __webpack_require__(16);
	var OuterSubscriber_1 = __webpack_require__(10);
	var subscribeToResult_1 = __webpack_require__(13);
	var none = {};
	/* tslint:disable:max-line-length */
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
	    return this.lift.call(new ArrayObservable_1.ArrayObservable(observables), new CombineLatestOperator(project));
	}
	exports.combineLatest = combineLatest;
	var CombineLatestOperator = function () {
	    function CombineLatestOperator(project) {
	        this.project = project;
	    }
	    CombineLatestOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
	    };
	    return CombineLatestOperator;
	}();
	exports.CombineLatestOperator = CombineLatestOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CombineLatestSubscriber = function (_super) {
	    __extends(CombineLatestSubscriber, _super);
	    function CombineLatestSubscriber(destination, project) {
	        _super.call(this, destination);
	        this.project = project;
	        this.active = 0;
	        this.values = [];
	        this.observables = [];
	    }
	    CombineLatestSubscriber.prototype._next = function (observable) {
	        this.values.push(none);
	        this.observables.push(observable);
	    };
	    CombineLatestSubscriber.prototype._complete = function () {
	        var observables = this.observables;
	        var len = observables.length;
	        if (len === 0) {
	            this.destination.complete();
	        } else {
	            this.active = len;
	            this.toRespond = len;
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
	    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var values = this.values;
	        var oldVal = values[outerIndex];
	        var toRespond = !this.toRespond ? 0 : oldVal === none ? --this.toRespond : this.toRespond;
	        values[outerIndex] = innerValue;
	        if (toRespond === 0) {
	            if (this.project) {
	                this._tryProject(values);
	            } else {
	                this.destination.next(values.slice());
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype._tryProject = function (values) {
	        var result;
	        try {
	            result = this.project.apply(this, values);
	        } catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return CombineLatestSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	exports.CombineLatestSubscriber = CombineLatestSubscriber;
	//# sourceMappingURL=combineLatest.js.map

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var mergeAll_1 = __webpack_require__(27);
	/* tslint:disable:max-line-length */
	function concatAll() {
	    return this.lift(new mergeAll_1.MergeAllOperator(1));
	}
	exports.concatAll = concatAll;
	//# sourceMappingURL=concatAll.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var mergeMap_1 = __webpack_require__(44);
	/* tslint:disable:max-line-length */
	function concatMap(project, resultSelector) {
	    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
	}
	exports.concatMap = concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var async_1 = __webpack_require__(22);
	/**
	 * Emits a value from the source Observable only after a particular time span
	 * has passed without another source emission.
	 *
	 * <span class="informal">It's like {@link delay}, but passes only the most
	 * recent value from each burst of emissions.</span>
	 *
	 * <img src="./img/debounceTime.png" width="100%">
	 *
	 * `debounceTime` delays values emitted by the source Observable, but drops
	 * previous pending delayed emissions if a new value arrives on the source
	 * Observable. This operator keeps track of the most recent value from the
	 * source Observable, and emits that only when `dueTime` enough time has passed
	 * without any other value appearing on the source Observable. If a new value
	 * appears before `dueTime` silence occurs, the previous value will be dropped
	 * and will not be emitted on the output Observable.
	 *
	 * This is a rate-limiting operator, because it is impossible for more than one
	 * value to be emitted in any time window of duration `dueTime`, but it is also
	 * a delay-like operator since output emissions do not occur at the same time as
	 * they did on the source Observable. Optionally takes a {@link Scheduler} for
	 * managing timers.
	 *
	 * @example <caption>Emit the most recent click after a burst of clicks</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.debounceTime(1000);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link auditTime}
	 * @see {@link debounce}
	 * @see {@link delay}
	 * @see {@link sampleTime}
	 * @see {@link throttleTime}
	 *
	 * @param {number} dueTime The timeout duration in milliseconds (or the time
	 * unit determined internally by the optional `scheduler`) for the window of
	 * time required to wait for emission silence before emitting the most recent
	 * source value.
	 * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
	 * managing the timers that handle the timeout for each value.
	 * @return {Observable} An Observable that delays the emissions of the source
	 * Observable by the specified `dueTime`, and may drop some values if they occur
	 * too frequently.
	 * @method debounceTime
	 * @owner Observable
	 */
	function debounceTime(dueTime, scheduler) {
	    if (scheduler === void 0) {
	        scheduler = async_1.async;
	    }
	    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
	}
	exports.debounceTime = debounceTime;
	var DebounceTimeOperator = function () {
	    function DebounceTimeOperator(dueTime, scheduler) {
	        this.dueTime = dueTime;
	        this.scheduler = scheduler;
	    }
	    DebounceTimeOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
	    };
	    return DebounceTimeOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var tryCatch_1 = __webpack_require__(33);
	var errorObject_1 = __webpack_require__(23);
	/* tslint:disable:max-line-length */
	function distinctUntilChanged(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}
	exports.distinctUntilChanged = distinctUntilChanged;
	var DistinctUntilChangedOperator = function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        this.compare = compare;
	        this.keySelector = keySelector;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
	    };
	    return DistinctUntilChangedOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/* tslint:disable:max-line-length */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        } else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        } else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        } else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=do.js.map

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/* tslint:disable:max-line-length */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        } catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=filter.js.map

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Subscription_1 = __webpack_require__(4);
	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} callback function to be called when source terminates.
	 * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
	 * @method finally
	 * @owner Observable
	 */
	function _finally(callback) {
	    return this.lift(new FinallyOperator(callback));
	}
	exports._finally = _finally;
	var FinallyOperator = function () {
	    function FinallyOperator(callback) {
	        this.callback = callback;
	    }
	    FinallyOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FinallySubscriber(subscriber, this.callback));
	    };
	    return FinallyOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FinallySubscriber = function (_super) {
	    __extends(FinallySubscriber, _super);
	    function FinallySubscriber(destination, callback) {
	        _super.call(this, destination);
	        this.add(new Subscription_1.Subscription(callback));
	    }
	    return FinallySubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=finally.js.map

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var noop_1 = __webpack_require__(51);
	/**
	 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
	 *
	 * <img src="./img/ignoreElements.png" width="100%">
	 *
	 * @return {Observable} an empty Observable that only calls `complete`
	 * or `error`, based on which one is called by the source Observable.
	 * @method ignoreElements
	 * @owner Observable
	 */
	function ignoreElements() {
	    return this.lift(new IgnoreElementsOperator());
	}
	exports.ignoreElements = ignoreElements;
	;
	var IgnoreElementsOperator = function () {
	    function IgnoreElementsOperator() {}
	    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new IgnoreElementsSubscriber(subscriber));
	    };
	    return IgnoreElementsOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
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
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}();
	exports.MapOperator = MapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        } catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=map.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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
	 * Emits the given constant value on the output Observable every time the source
	 * Observable emits a value.
	 *
	 * <span class="informal">Like {@link map}, but it maps every source value to
	 * the same output value every time.</span>
	 *
	 * <img src="./img/mapTo.png" width="100%">
	 *
	 * Takes a constant `value` as argument, and emits that whenever the source
	 * Observable emits a value. In other words, ignores the actual source value,
	 * and simply uses the emission moment to know when to emit the given `value`.
	 *
	 * @example <caption>Map every every click to the string 'Hi'</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var greetings = clicks.mapTo('Hi');
	 * greetings.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 *
	 * @param {any} value The value to map each source value to.
	 * @return {Observable} An Observable that emits the given `value` every time
	 * the source Observable emits something.
	 * @method mapTo
	 * @owner Observable
	 */
	function mapTo(value) {
	    return this.lift(new MapToOperator(value));
	}
	exports.mapTo = mapTo;
	var MapToOperator = function () {
	    function MapToOperator(value) {
	        this.value = value;
	    }
	    MapToOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapToSubscriber(subscriber, this.value));
	    };
	    return MapToOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var ArrayObservable_1 = __webpack_require__(11);
	var mergeAll_1 = __webpack_require__(27);
	var isScheduler_1 = __webpack_require__(17);
	/* tslint:disable:max-line-length */
	function merge() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
	}
	exports.merge = merge;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which concurrently emits all values from every
	 * given input Observable.
	 *
	 * <span class="informal">Flattens multiple Observables together by blending
	 * their values into one Observable.</span>
	 *
	 * <img src="./img/merge.png" width="100%">
	 *
	 * `merge` subscribes to each given input Observable (as arguments), and simply
	 * forwards (without doing any transformation) all the values from all the input
	 * Observables to the output Observable. The output Observable only completes
	 * once all input Observables have completed. Any error delivered by an input
	 * Observable will be immediately emitted on the output Observable.
	 *
	 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var timer = Rx.Observable.interval(1000);
	 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
	 * clicksOrTimer.subscribe(x => console.log(x));
	 *
	 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var concurrent = 2; // the argument
	 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
	 * merged.subscribe(x => console.log(x));
	 *
	 * @see {@link mergeAll}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 *
	 * @param {...Observable} observables Input Observables to merge together.
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
	 * concurrency of input Observables.
	 * @return {Observable} an Observable that emits items that are the result of
	 * every input Observable.
	 * @static true
	 * @name merge
	 * @owner Observable
	 */
	function mergeStatic() {
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
	    if (scheduler === null && observables.length === 1) {
	        return observables[0];
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
	}
	exports.mergeStatic = mergeStatic;
	//# sourceMappingURL=merge.js.map

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var Notification_1 = __webpack_require__(59);
	/**
	 * @see {@link Notification}
	 *
	 * @param scheduler
	 * @param delay
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method observeOn
	 * @owner Observable
	 */
	function observeOn(scheduler, delay) {
	    if (delay === void 0) {
	        delay = 0;
	    }
	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}
	exports.observeOn = observeOn;
	var ObserveOnOperator = function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
	    };
	    return ObserveOnOperator;
	}();
	exports.ObserveOnOperator = ObserveOnOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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
	    ObserveOnSubscriber.dispatch = function (arg) {
	        var notification = arg.notification,
	            destination = arg.destination;
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
	exports.ObserveOnMessage = ObserveOnMessage;
	//# sourceMappingURL=observeOn.js.map

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Subject_1 = __webpack_require__(8);
	var multicast_1 = __webpack_require__(28);
	/* tslint:disable:max-line-length */
	function publish(selector) {
	    return selector ? multicast_1.multicast.call(this, function () {
	        return new Subject_1.Subject();
	    }, selector) : multicast_1.multicast.call(this, new Subject_1.Subject());
	}
	exports.publish = publish;
	//# sourceMappingURL=publish.js.map

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	/* tslint:disable:max-line-length */
	function scan(accumulator, seed) {
	    return this.lift(new ScanOperator(accumulator, seed));
	}
	exports.scan = scan;
	var ScanOperator = function () {
	    function ScanOperator(accumulator, seed) {
	        this.accumulator = accumulator;
	        this.seed = seed;
	    }
	    ScanOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
	    };
	    return ScanOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ScanSubscriber = function (_super) {
	    __extends(ScanSubscriber, _super);
	    function ScanSubscriber(destination, accumulator, seed) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this.index = 0;
	        this.accumulatorSet = false;
	        this.seed = seed;
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
	            return this._tryNext(value);
	        }
	    };
	    ScanSubscriber.prototype._tryNext = function (value) {
	        var index = this.index++;
	        var result;
	        try {
	            result = this.accumulator(this.seed, value, index);
	        } catch (err) {
	            this.destination.error(err);
	        }
	        this.seed = result;
	        this.destination.next(result);
	    };
	    return ScanSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=scan.js.map

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var multicast_1 = __webpack_require__(28);
	var Subject_1 = __webpack_require__(8);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 * @method share
	 * @owner Observable
	 */
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

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
	 * Returns an Observable that skips `n` items emitted by an Observable.
	 *
	 * <img src="./img/skip.png" width="100%">
	 *
	 * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
	 * @return {Observable} an Observable that skips values emitted by the source Observable.
	 *
	 * @method skip
	 * @owner Observable
	 */
	function skip(total) {
	    return this.lift(new SkipOperator(total));
	}
	exports.skip = skip;
	var SkipOperator = function () {
	    function SkipOperator(total) {
	        this.total = total;
	    }
	    SkipOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new SkipSubscriber(subscriber, this.total));
	    };
	    return SkipOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var ArrayObservable_1 = __webpack_require__(11);
	var ScalarObservable_1 = __webpack_require__(26);
	var EmptyObservable_1 = __webpack_require__(5);
	var concat_1 = __webpack_require__(43);
	var isScheduler_1 = __webpack_require__(17);
	/* tslint:disable:max-line-length */
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
	        return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
	    } else if (len > 1) {
	        return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
	    } else {
	        return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
	    }
	}
	exports.startWith = startWith;
	//# sourceMappingURL=startWith.js.map

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(10);
	var subscribeToResult_1 = __webpack_require__(13);
	/* tslint:disable:max-line-length */
	function switchMap(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}
	exports.switchMap = switchMap;
	var SwitchMapOperator = function () {
	    function SwitchMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
	    };
	    return SwitchMapOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchMapSubscriber = function (_super) {
	    __extends(SwitchMapSubscriber, _super);
	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapSubscriber.prototype._next = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        } catch (error) {
	            this.destination.error(error);
	            return;
	        }
	        this._innerSub(result, value, index);
	    };
	    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
	    };
	    SwitchMapSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.closed) {
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
	    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
	        } else {
	            this.destination.next(innerValue);
	        }
	    };
	    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        } catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return SwitchMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=switchMap.js.map

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(2);
	var ArgumentOutOfRangeError_1 = __webpack_require__(123);
	var EmptyObservable_1 = __webpack_require__(5);
	/**
	 * Emits only the first `count` values emitted by the source Observable.
	 *
	 * <span class="informal">Takes the first `count` values from the source, then
	 * completes.</span>
	 *
	 * <img src="./img/take.png" width="100%">
	 *
	 * `take` returns an Observable that emits only the first `count` values emitted
	 * by the source Observable. If the source emits fewer than `count` values then
	 * all of its values are emitted. After that, it completes, regardless if the
	 * source completes.
	 *
	 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var five = interval.take(5);
	 * five.subscribe(x => console.log(x));
	 *
	 * @see {@link takeLast}
	 * @see {@link takeUntil}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
	 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
	 *
	 * @param {number} count The maximum number of `next` values to emit.
	 * @return {Observable<T>} An Observable that emits only the first `count`
	 * values emitted by the source Observable, or all of the values from the source
	 * if the source emits fewer than `count` values.
	 * @method take
	 * @owner Observable
	 */
	function take(count) {
	    if (count === 0) {
	        return new EmptyObservable_1.EmptyObservable();
	    } else {
	        return this.lift(new TakeOperator(count));
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
	    TakeOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TakeSubscriber(subscriber, this.total));
	    };
	    return TakeOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeSubscriber = function (_super) {
	    __extends(TakeSubscriber, _super);
	    function TakeSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.count = 0;
	    }
	    TakeSubscriber.prototype._next = function (value) {
	        var total = this.total;
	        var count = ++this.count;
	        if (count <= total) {
	            this.destination.next(value);
	            if (count === total) {
	                this.destination.complete();
	                this.unsubscribe();
	            }
	        }
	    };
	    return TakeSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=take.js.map

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(10);
	var subscribeToResult_1 = __webpack_require__(13);
	/**
	 * Emits the values emitted by the source Observable until a `notifier`
	 * Observable emits a value.
	 *
	 * <span class="informal">Lets values pass until a second Observable,
	 * `notifier`, emits something. Then, it completes.</span>
	 *
	 * <img src="./img/takeUntil.png" width="100%">
	 *
	 * `takeUntil` subscribes and begins mirroring the source Observable. It also
	 * monitors a second Observable, `notifier` that you provide. If the `notifier`
	 * emits a value or a complete notification, the output Observable stops
	 * mirroring the source Observable and completes.
	 *
	 * @example <caption>Tick every second until the first click happens</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = interval.takeUntil(clicks);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link take}
	 * @see {@link takeLast}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @param {Observable} notifier The Observable whose first emitted value will
	 * cause the output Observable of `takeUntil` to stop emitting values from the
	 * source Observable.
	 * @return {Observable<T>} An Observable that emits the values from the source
	 * Observable until such time as `notifier` emits its first value.
	 * @method takeUntil
	 * @owner Observable
	 */
	function takeUntil(notifier) {
	    return this.lift(new TakeUntilOperator(notifier));
	}
	exports.takeUntil = takeUntil;
	var TakeUntilOperator = function () {
	    function TakeUntilOperator(notifier) {
	        this.notifier = notifier;
	    }
	    TakeUntilOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
	    };
	    return TakeUntilOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeUntilSubscriber = function (_super) {
	    __extends(TakeUntilSubscriber, _super);
	    function TakeUntilSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
	    }
	    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.complete();
	    };
	    TakeUntilSubscriber.prototype.notifyComplete = function () {
	        // noop
	    };
	    return TakeUntilSubscriber;
	}(OuterSubscriber_1.OuterSubscriber);
	//# sourceMappingURL=takeUntil.js.map

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1 = __webpack_require__(22);
	var isDate_1 = __webpack_require__(48);
	var Subscriber_1 = __webpack_require__(2);
	var TimeoutError_1 = __webpack_require__(125);
	/**
	 * @param due
	 * @param errorToSend
	 * @param scheduler
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method timeout
	 * @owner Observable
	 */
	function timeout(due, errorToSend, scheduler) {
	    if (errorToSend === void 0) {
	        errorToSend = null;
	    }
	    if (scheduler === void 0) {
	        scheduler = async_1.async;
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
	    TimeoutOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler));
	    };
	    return TimeoutOperator;
	}();
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
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
	        this.error(this.errorToSend || new TimeoutError_1.TimeoutError());
	    };
	    return TimeoutSubscriber;
	}(Subscriber_1.Subscriber);
	//# sourceMappingURL=timeout.js.map

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(4);
	/**
	 * A unit of work to be executed in a {@link Scheduler}. An action is typically
	 * created from within a Scheduler and an RxJS user does not need to concern
	 * themselves about creating and manipulating an Action.
	 *
	 * ```ts
	 * class Action<T> extends Subscription {
	 *   new (scheduler: Scheduler, work: (state?: T) => void);
	 *   schedule(state?: T, delay: number = 0): Subscription;
	 * }
	 * ```
	 *
	 * @class Action<T>
	 */
	var Action = function (_super) {
	    __extends(Action, _super);
	    function Action(scheduler, work) {
	        _super.call(this);
	    }
	    /**
	     * Schedules this action on its parent Scheduler for execution. May be passed
	     * some context object, `state`. May happen at some point in the future,
	     * according to the `delay` parameter, if specified.
	     * @param {T} [state] Some contextual data that the `work` function uses when
	     * called by the Scheduler.
	     * @param {number} [delay] Time to wait before executing the work, where the
	     * time unit is implicit and defined by the Scheduler.
	     * @return {void}
	     */
	    Action.prototype.schedule = function (state, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        return this;
	    };
	    return Action;
	}(Subscription_1.Subscription);
	exports.Action = Action;
	//# sourceMappingURL=Action.js.map

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Immediate_1 = __webpack_require__(124);
	var AsyncAction_1 = __webpack_require__(45);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AsapAction = function (_super) {
	    __extends(AsapAction, _super);
	    function AsapAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	    }
	    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        // If delay is greater than 0, request as an async action.
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        // Push the action to the end of the scheduler queue.
	        scheduler.actions.push(this);
	        // If a microtask has already been scheduled, don't schedule another
	        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
	        // the current scheduled microtask id.
	        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
	    };
	    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) {
	            delay = 0;
	        }
	        // If delay exists and is greater than 0, or if the delay is null (the
	        // action wasn't rescheduled) but was originally scheduled as an async
	        // action, then recycle as an async action.
	        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        // If the scheduler queue is empty, cancel the requested microtask and
	        // set the scheduled flag to undefined so the next AsapAction will schedule
	        // its own.
	        if (scheduler.actions.length === 0) {
	            Immediate_1.Immediate.clearImmediate(id);
	            scheduler.scheduled = undefined;
	        }
	        // Return undefined so the action knows to request a new async id if it's rescheduled.
	        return undefined;
	    };
	    return AsapAction;
	}(AsyncAction_1.AsyncAction);
	exports.AsapAction = AsapAction;
	//# sourceMappingURL=AsapAction.js.map

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncScheduler_1 = __webpack_require__(46);
	var AsapScheduler = function (_super) {
	    __extends(AsapScheduler, _super);
	    function AsapScheduler() {
	        _super.apply(this, arguments);
	    }
	    AsapScheduler.prototype.flush = function (action) {
	        this.active = true;
	        this.scheduled = undefined;
	        var actions = this.actions;
	        var error;
	        var index = -1;
	        var count = actions.length;
	        action = action || actions.shift();
	        do {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        } while (++index < count && (action = actions.shift()));
	        this.active = false;
	        if (error) {
	            while (++index < count && (action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsapScheduler;
	}(AsyncScheduler_1.AsyncScheduler);
	exports.AsapScheduler = AsapScheduler;
	//# sourceMappingURL=AsapScheduler.js.map

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var AsapAction_1 = __webpack_require__(120);
	var AsapScheduler_1 = __webpack_require__(121);
	exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
	//# sourceMappingURL=asap.js.map

/***/ }),
/* 123 */
/***/ (function(module, exports) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an element was queried at a certain index of an
	 * Observable, but no such index or position exists in that sequence.
	 *
	 * @see {@link elementAt}
	 * @see {@link take}
	 * @see {@link takeLast}
	 *
	 * @class ArgumentOutOfRangeError
	 */
	var ArgumentOutOfRangeError = function (_super) {
	    __extends(ArgumentOutOfRangeError, _super);
	    function ArgumentOutOfRangeError() {
	        var err = _super.call(this, 'argument out of range');
	        this.name = err.name = 'ArgumentOutOfRangeError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ArgumentOutOfRangeError;
	}(Error);
	exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
	//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
	*/
	"use strict";

	var root_1 = __webpack_require__(6);
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
	            var postMessageIsAsynchronous_1 = true;
	            var oldOnMessage = root.onmessage;
	            root.onmessage = function () {
	                postMessageIsAsynchronous_1 = false;
	            };
	            root.postMessage('', '*');
	            root.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous_1;
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

/***/ }),
/* 125 */
/***/ (function(module, exports) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when duetime elapses.
	 *
	 * @see {@link timeout}
	 *
	 * @class TimeoutError
	 */
	var TimeoutError = function (_super) {
	    __extends(TimeoutError, _super);
	    function TimeoutError() {
	        var err = _super.call(this, 'Timeout has occurred');
	        this.name = err.name = 'TimeoutError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return TimeoutError;
	}(Error);
	exports.TimeoutError = TimeoutError;
	//# sourceMappingURL=TimeoutError.js.map

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) {
	            return i + 1 + ") " + err.toString();
	        }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error);
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 127 */
/***/ (function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function isObject(x) {
	    return x != null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Subscriber_1 = __webpack_require__(2);
	var rxSubscriber_1 = __webpack_require__(31);
	var Observer_1 = __webpack_require__(38);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber(Observer_1.empty);
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 129 */
/***/ (function(module, exports) {

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
	  // segments and small manifests in particular, but keep loading errors (timeout).
	  .filter(function (response) {
	    return !response || response.size > 2000;
	  })
	  // converts response metadata in bits-per-seconds
	  .map(function (response) {
	    return response ? response.size / response.duration * 8000 : 0;
	  }).scan(ema(options.alpha));
	};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(4),
	    Subscription = _require.Subscription;

	var _require2 = __webpack_require__(25),
	    BehaviorSubject = _require2.BehaviorSubject;

	var _require3 = __webpack_require__(19),
	    combineLatest = _require3.combineLatest;

	var _require4 = __webpack_require__(15),
	    only = _require4.only;

	var _require5 = __webpack_require__(21),
	    findBetterMatchIndex = _require5.findBetterMatchIndex;

	var AverageBitrate = __webpack_require__(129);

	var DEFAULTS = {
	  defaultLanguage: "fra",
	  defaultSubtitle: "",
	  // default buffer size in seconds
	  defaultBufferSize: 30,
	  // buffer threshold ratio used as a lower bound
	  // margin to find the suitable representation
	  defaultBufferThreshold: 0.3,
	  initVideoBitrate: 0,
	  initAudioBitrate: 0,
	  maxVideoBitrate: Infinity,
	  maxAudioBitrate: Infinity
	};

	function find(array, predicate) {
	  for (var i = 0; i < array.length; i++) {
	    if (predicate(array[i], i, array) === true) {
	      return array[i];
	    }
	  }
	  return null;
	}

	function def(x, val) {
	  return typeof x == "number" && x > 0 ? x : val;
	}

	function getClosestBitrate(bitrates, btr) {
	  var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	  for (var i = bitrates.length - 1; i >= 0; i--) {
	    if (bitrates[i] / btr <= 1 - threshold) {
	      return bitrates[i];
	    }
	  }
	  return bitrates[0];
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

	function findAdaptationByLang(adaptations, lang) {
	  var index = findBetterMatchIndex(adaptations.map(function (a) {
	    return a.lang;
	  }), lang);
	  if (index >= 0) {
	    return adaptations[index];
	  }
	  return null;
	}

	function filterByType(stream, selectedType) {
	  return stream.filter(function (_ref) {
	    var type = _ref.type;
	    return type === selectedType;
	  });
	}

	module.exports = function (metrics, deviceEvents) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  Object.keys(options).forEach(function (key) {
	    return options[key] === undefined && delete options[key];
	  });

	  var _Object$assign = Object.assign({}, DEFAULTS, options),
	      defaultLanguage = _Object$assign.defaultLanguage,
	      defaultSubtitle = _Object$assign.defaultSubtitle,
	      defaultBufferSize = _Object$assign.defaultBufferSize,
	      defaultBufferThreshold = _Object$assign.defaultBufferThreshold,
	      initVideoBitrate = _Object$assign.initVideoBitrate,
	      initAudioBitrate = _Object$assign.initAudioBitrate,
	      maxVideoBitrate = _Object$assign.maxVideoBitrate,
	      maxAudioBitrate = _Object$assign.maxAudioBitrate;

	  var videoWidth = deviceEvents.videoWidth,
	      inBackground = deviceEvents.inBackground;


	  var $languages = new BehaviorSubject(defaultLanguage);
	  var $subtitles = new BehaviorSubject(defaultSubtitle);

	  var $averageBitrates = {
	    audio: new BehaviorSubject(initAudioBitrate),
	    video: new BehaviorSubject(initVideoBitrate)
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
	    audio: new BehaviorSubject(maxAudioBitrate),
	    video: new BehaviorSubject(maxVideoBitrate)
	  };

	  var $bufSizes = {
	    audio: new BehaviorSubject(defaultBufferSize),
	    video: new BehaviorSubject(defaultBufferSize),
	    text: new BehaviorSubject(defaultBufferSize)
	  };

	  function audioAdaptationChoice(adaptations) {
	    return $languages.distinctUntilChanged().map(function (lang) {
	      return findAdaptationByLang(adaptations, lang) || adaptations[0];
	    });
	  }

	  function textAdaptationChoice(adaptations) {
	    return $subtitles.distinctUntilChanged().map(function (lang) {
	      return findAdaptationByLang(adaptations, lang);
	    });
	  }

	  function getAdaptationsChoice(type, adaptations) {
	    if (type == "audio") {
	      return audioAdaptationChoice(adaptations);
	    }

	    if (type == "text") {
	      return textAdaptationChoice(adaptations);
	    }

	    return only(adaptations[0]);
	  }

	  function getBufferAdapters(adaptation) {
	    var type = adaptation.type,
	        bitrates = adaptation.bitrates,
	        representations = adaptation.representations;


	    var firstRep = representations[0];

	    var representationsObservable = void 0;
	    if (representations.length > 1) {
	      var usrBitrates = $usrBitrates[type];
	      var maxBitrates = $maxBitrates[type];

	      var avrBitrates = $averageBitrates[type].map(function (avrBitrate, count) {
	        // no threshold for the first value of the average bitrate
	        // stream corresponding to the selected initial video bitrate
	        var bufThreshold = void 0;
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
	        var btr = void 0;
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
	      return $languages.getValue();
	    },
	    getSubtitle: function getSubtitle() {
	      return $subtitles.getValue();
	    },
	    getAverageBitrates: function getAverageBitrates() {
	      return $averageBitrates;
	    },
	    getAudioMaxBitrate: function getAudioMaxBitrate() {
	      return $maxBitrates.audio.getValue();
	    },
	    getVideoMaxBitrate: function getVideoMaxBitrate() {
	      return $maxBitrates.video.getValue();
	    },
	    getAudioBufferSize: function getAudioBufferSize() {
	      return $bufSizes.audio.getValue();
	    },
	    getVideoBufferSize: function getVideoBufferSize() {
	      return $bufSizes.video.getValue();
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

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

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

	var log = __webpack_require__(9);

	var _require = __webpack_require__(132),
	    BufferingQueue = _require.BufferingQueue;

	var _require2 = __webpack_require__(20),
	    BufferedRanges = _require2.BufferedRanges;

	var _require3 = __webpack_require__(1),
	    Observable = _require3.Observable;

	var _require4 = __webpack_require__(8),
	    Subject = _require4.Subject;

	var _require5 = __webpack_require__(19),
	    combineLatest = _require5.combineLatest;

	var _require6 = __webpack_require__(12),
	    merge = _require6.merge;

	var empty = __webpack_require__(5).EmptyObservable.create;
	var from = __webpack_require__(90).FromObservable.create;
	var timer = __webpack_require__(42).TimerObservable.create;

	var _require7 = __webpack_require__(156),
	    SimpleSet = _require7.SimpleSet;

	var _require8 = __webpack_require__(53),
	    IndexHandler = _require8.IndexHandler;

	var _require9 = __webpack_require__(7),
	    MediaError = _require9.MediaError,
	    ErrorTypes = _require9.ErrorTypes,
	    ErrorCodes = _require9.ErrorCodes;

	var BITRATE_REBUFFERING_RATIO = 1.5;

	var GC_GAP_CALM = 240;
	var GC_GAP_BEEFY = 30;

	function Buffer(_ref) {
	  var bufferType = _ref.bufferType,
	      sourceBuffer = _ref.sourceBuffer,
	      adaptation = _ref.adaptation,
	      pipeline = _ref.pipeline,
	      adapters = _ref.adapters,
	      timings = _ref.timings,
	      seekings = _ref.seekings;


	  var isAVBuffer = bufferType == "audio" || bufferType == "video";

	  var messageSubject = new Subject();

	  // safety level (low and high water mark) size of buffer that won't
	  // be flushed when switching representation for smooth transitions
	  // and avoiding buffer underflows
	  var LOW_WATER_MARK_PAD = bufferType == "video" ? 4 : 1;
	  var HIGH_WATER_MARK_PAD = bufferType == "video" ? 6 : 1;

	  var representations = adapters.representations,
	      bufferSizes = adapters.bufferSizes;

	  var ranges = new BufferedRanges();
	  var bufferingQueue = new BufferingQueue(sourceBuffer);

	  // Buffer garbage collector algorithm. Tries to free up some part of
	  // the ranges that are distant from the current playing time.
	  // See: https://w3c.github.io/media-source/#sourcebuffer-prepare-append
	  function selectGCedRanges(_ref2, gcGap) {
	    var ts = _ref2.ts,
	        buffered = _ref2.buffered;

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
	    return timings.take(1).mergeMap(function (timing) {
	      var cleanedupRanges = selectGCedRanges(timing, GC_GAP_CALM);

	      // more aggressive GC if we could not find any range to clean
	      if (cleanedupRanges.length === 0) {
	        cleanedupRanges = selectGCedRanges(timing, GC_GAP_BEEFY);
	      }

	      log.debug("buffer: gc cleaning", cleanedupRanges);
	      return from(cleanedupRanges.map(function (range) {
	        return bufferingQueue.removeBuffer(range);
	      })).concatAll();
	    });
	  }

	  function doAppendBufferOrGC(pipelineData) {
	    var segmentData = pipelineData.parsed.segmentData;
	    return bufferingQueue.appendBuffer(segmentData).catch(function (error) {
	      if (error.name != "QuotaExceededError") {
	        throw new MediaError("BUFFER_APPEND_ERROR", error, false);
	      }

	      // launch our garbage collector and retry on
	      // QuotaExceededError and throw a fatal error if we still have
	      // an error.
	      return bufferGarbageCollector().mergeMap(function () {
	        return bufferingQueue.appendBuffer(segmentData);
	      }).catch(function (error) {
	        throw new MediaError("BUFFER_FULL_ERROR", error, true);
	      });
	    });
	  }

	  function getSegmentsListToInject(segmentIndex, adaptation, representation, buffered, timing, bufferSize, withInitSegment) {
	    var initSegment = null;

	    if (withInitSegment) {
	      log.debug("add init segment", bufferType);
	      initSegment = segmentIndex.getInitSegment();
	    }

	    if (timing.readyState === 0) {
	      return initSegment ? [initSegment] : [];
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
	    var timestampPadding = void 0;
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

	    if (initSegment) {
	      mediaSegments.unshift(initSegment);
	    }

	    return mediaSegments;
	  }

	  function createRepresentationBuffer(representation) {
	    log.info("bitrate", bufferType, representation.bitrate);

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

	    function doInjectSegments(_ref3, injectCount) {
	      var timing = _ref3[0],
	          bufferSize = _ref3[1];

	      var nativeBufferedRanges = new BufferedRanges(sourceBuffer.buffered);

	      // makes sure our own buffered ranges representation stay in
	      // sync with the native one
	      if (isAVBuffer) {
	        if (!ranges.equals(nativeBufferedRanges)) {
	          log.debug("intersect new buffer", bufferType);
	          ranges.intersect(nativeBufferedRanges);
	        }
	      }

	      // send a message downstream when bumping on an explicit
	      // discontinuity announced in the segment index.
	      if (timing.stalled) {
	        var discontinuity = segmentIndex.checkDiscontinuity(timing.ts);
	        if (discontinuity) {
	          messageSubject.next({ type: "index-discontinuity", value: discontinuity });
	        }
	      }

	      var injectedSegments = void 0;
	      try {
	        // filter out already loaded and already queued segments
	        var withInitSegment = injectCount === 0;
	        injectedSegments = getSegmentsListToInject(segmentIndex, adaptation, representation, nativeBufferedRanges, timing, bufferSize, withInitSegment);

	        injectedSegments = injectedSegments.filter(filterAlreadyLoaded);
	      } catch (error) {
	        // catch IndexError errors thrown by when we try to access to
	        // non available segments. Reinject this error into the main
	        // buffer observable so that it can be treated upstream
	        var isOutOfIndexError = error.type === ErrorTypes.INDEX_ERROR && error.code === ErrorCodes.OUT_OF_INDEX_ERROR;

	        if (isOutOfIndexError) {
	          messageSubject.next({ type: "out-of-index", value: error });
	          return empty();
	        }

	        throw error;
	      }

	      // queue all segments injected in the observable
	      for (var i = 0; i < injectedSegments.length; i++) {
	        queuedSegments.add(injectedSegments[i].getId());
	      }

	      return injectedSegments;
	    }

	    function doUnqueueAndUpdateRanges(pipelineData) {
	      var segment = pipelineData.segment,
	          parsed = pipelineData.parsed;

	      queuedSegments.remove(segment.getId());

	      // change the timescale if one has been extracted from the
	      // parsed segment (SegmentBase)
	      var timescale = parsed.timescale;
	      if (timescale) {
	        segmentIndex.setTimescale(timescale);
	      }

	      var nextSegments = parsed.nextSegments,
	          currentSegment = parsed.currentSegment;
	      // added segments are values parsed from the segment metadata
	      // that should be added to the segmentIndex.

	      var addedSegments = void 0;
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
	        value: Object.assign({ bufferType: bufferType, addedSegments: addedSegments }, pipelineData)
	      };
	    }

	    var segmentsPipeline = combineLatest(timings, bufferSizes).mergeMap(doInjectSegments).concatMap(function (segment) {
	      return pipeline({ segment: segment });
	    }).concatMap(doAppendBufferOrGC, doUnqueueAndUpdateRanges);

	    return merge(segmentsPipeline, messageSubject).catch(function (error) {
	      // For live adaptations, handle 412 errors as precondition-
	      // failed errors, ie: we are requesting for segments before they
	      // exist
	      var isPreconditionFailedError = adaptation.isLive && error.type == ErrorTypes.NETWORK_ERROR && error.isHttpError(412);

	      if (!isPreconditionFailedError) {
	        throw error;
	      }

	      // 412 Precondition Failed request errors do not cause the
	      // buffer to stop but are re-emitted in the stream as
	      // "precondition-failed" type. They should be handled re-
	      // adapting the live-gap that the player is holding
	      return Observable.of({ type: "precondition-failed", value: error }).concat(timer(2000)).concat(createRepresentationBuffer(representation));
	    }).startWith({
	      type: "buffer",
	      value: { bufferType: bufferType, adaptation: adaptation, representation: representation }
	    });
	  }

	  return combineLatest(representations, seekings, function (rep) {
	    return rep;
	  }).switchMap(createRepresentationBuffer).finally(function () {
	    return bufferingQueue.dispose();
	  });
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

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(8),
	    Subject = _require.Subject;

	var BUFFER_APPEND = "append";
	var BUFFER_REMOVE = "remove";
	var BUFFER_STREAM = "stream";

	var BufferingQueue = function () {
	  function BufferingQueue(sourceBuffer) {
	    _classCallCheck(this, BufferingQueue);

	    this.buffer = sourceBuffer;
	    this.queue = [];
	    this.flushing = null;

	    this._onUpdate = this.onUpdate.bind(this);
	    this._onError = this.onError.bind(this);
	    this._flush = this.flush.bind(this);

	    this.buffer.addEventListener("update", this._onUpdate);
	    this.buffer.addEventListener("error", this._onError);
	    this.buffer.addEventListener("updateend", this._flush);
	  }

	  BufferingQueue.prototype.dispose = function dispose() {
	    this.buffer.removeEventListener("update", this._onUpdate);
	    this.buffer.removeEventListener("error", this._onError);
	    this.buffer.removeEventListener("updateend", this._flush);
	    this.buffer = null;
	    this.queue.length = 0;
	    this.flushing = null;
	  };

	  BufferingQueue.prototype.onUpdate = function onUpdate(evt) {
	    if (this.flushing) {
	      this.flushing.next(evt);
	      this.flushing.complete();
	      this.flushing = null;
	    }
	  };

	  BufferingQueue.prototype.onError = function onError(error) {
	    if (this.flushing) {
	      this.flushing.error(error);
	      this.flushing = null;
	    }
	  };

	  BufferingQueue.prototype.queueAction = function queueAction(type, args) {
	    var subj = new Subject();
	    var length = this.queue.unshift({ type: type, args: args, subj: subj });
	    if (length === 1) {
	      this.flush();
	    }
	    return subj;
	  };

	  BufferingQueue.prototype.appendBuffer = function appendBuffer(buffer) {
	    return this.queueAction(BUFFER_APPEND, buffer);
	  };

	  BufferingQueue.prototype.removeBuffer = function removeBuffer(_ref) {
	    var start = _ref.start,
	        end = _ref.end;

	    return this.queueAction(BUFFER_REMOVE, { start: start, end: end });
	  };

	  BufferingQueue.prototype.appendStream = function appendStream(stream) {
	    return this.queueAction(BUFFER_STREAM, stream);
	  };

	  BufferingQueue.prototype.flush = function flush() {
	    if (this.flushing || this.queue.length === 0 || this.buffer.updating) {
	      return;
	    }

	    var _queue$pop = this.queue.pop(),
	        type = _queue$pop.type,
	        args = _queue$pop.args,
	        subj = _queue$pop.subj;

	    this.flushing = subj;
	    try {
	      switch (type) {
	        case BUFFER_APPEND:
	          this.buffer.appendBuffer(args);break;
	        case BUFFER_STREAM:
	          this.buffer.appendStream(args);break;
	        case BUFFER_REMOVE:
	          this.buffer.remove(args.start, args.end);break;
	      }
	    } catch (e) {
	      this.onError(e);
	    }
	  };

	  return BufferingQueue;
	}();

	module.exports = {
	  BufferingQueue: BufferingQueue
	};

/***/ }),
/* 133 */
/***/ (function(module, exports) {

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

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(12),
	    merge = _require.merge;

	var interval = __webpack_require__(91).IntervalObservable.create;

	var _require2 = __webpack_require__(14),
	    visibilityChange = _require2.visibilityChange,
	    videoSizeChange = _require2.videoSizeChange;

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

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(55),
	    AbstractSourceBuffer = _require.AbstractSourceBuffer;

	var ImageSourceBuffer = function (_AbstractSourceBuffer) {
	  _inherits(ImageSourceBuffer, _AbstractSourceBuffer);

	  function ImageSourceBuffer() {
	    _classCallCheck(this, ImageSourceBuffer);

	    return _possibleConstructorReturn(this, _AbstractSourceBuffer.apply(this, arguments));
	  }

	  ImageSourceBuffer.prototype._append = function _append() {
	    // TODO: handle live case we suppose here the first receive bsi
	    // includes all images
	    this.buffered.insert(0, 0, Infinity);
	  };

	  return ImageSourceBuffer;
	}(AbstractSourceBuffer);

	module.exports = ImageSourceBuffer;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

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

	var Timeline = __webpack_require__(54);

	var Base = function (_Timeline) {
	  _inherits(Base, _Timeline);

	  function Base() {
	    _classCallCheck(this, Base);

	    return _possibleConstructorReturn(this, _Timeline.apply(this, arguments));
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

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(24),
	    Segment = _require.Segment;

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

	  List.prototype.checkDiscontinuity = function checkDiscontinuity() {
	    return -1;
	  };

	  List.prototype.checkRange = function checkRange(up) {
	    var _index = this.index,
	        duration = _index.duration,
	        list = _index.list;

	    var i = Math.floor(up / duration);
	    return i >= 0 && i < list.length;
	  };

	  List.prototype.createSegment = function createSegment(segmentIndex, time) {
	    var adaptation = this.adaptation,
	        representation = this.representation;
	    var _index2 = this.index,
	        duration = _index2.duration,
	        list = _index2.list;


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
	    var _index3 = this.index,
	        duration = _index3.duration,
	        list = _index3.list;

	    var length = Math.min(list.length - 1, Math.floor(to / duration));
	    var segments = [];
	    var i = Math.floor(up / duration);
	    while (i <= length) {
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

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(24),
	    Segment = _require.Segment;

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

	  Template.prototype.checkDiscontinuity = function checkDiscontinuity() {
	    return -1;
	  };

	  Template.prototype.checkRange = function checkRange() {
	    return true;
	  };

	  Template.prototype.createSegment = function createSegment(ts) {
	    var adaptation = this.adaptation,
	        representation = this.representation;
	    var _index = this.index,
	        startNumber = _index.startNumber,
	        duration = _index.duration;


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

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(8),
	    Subject = _require.Subject;

	var _require2 = __webpack_require__(122),
	    asap = _require2.asap;

	var _require3 = __webpack_require__(1),
	    Observable = _require3.Observable;

	var _require4 = __webpack_require__(36),
	    retryWithBackoff = _require4.retryWithBackoff;

	var _require5 = __webpack_require__(15),
	    tryCatch = _require5.tryCatch,
	    castToObservable = _require5.castToObservable;

	var _require6 = __webpack_require__(7),
	    RequestError = _require6.RequestError,
	    NetworkError = _require6.NetworkError,
	    OtherError = _require6.OtherError,
	    RequestErrorTypes = _require6.RequestErrorTypes,
	    isKnownError = _require6.isKnownError;

	function errorSelector(code, pipelineType, error) {
	  var fatal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	  if (!isKnownError(error)) {
	    var ErrorType = error instanceof RequestError ? NetworkError : OtherError;

	    error = new ErrorType(code, error, fatal);
	  }

	  error.pipelineType = pipelineType;
	  return error;
	}

	function loaderShouldRetry(error) {
	  if (!(error instanceof RequestError)) {
	    return false;
	  }
	  if (error.type === RequestErrorTypes.ERROR_HTTP_CODE) {
	    return error.status >= 500 || error.status == 404;
	  }
	  return error.type === RequestErrorTypes.TIMEOUT || error.type === RequestErrorTypes.ERROR_EVENT;
	}

	var metricsScheduler = asap;

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
	function createPipeline(pipelineType, _ref, metrics, errorStream) {
	  var resolver = _ref.resolver,
	      loader = _ref.loader,
	      parser = _ref.parser;
	  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


	  if (!resolver) {
	    resolver = Observable.of;
	  }
	  if (!loader) {
	    loader = Observable.of;
	  }
	  if (!parser) {
	    parser = Observable.of;
	  }

	  var totalRetry = options.totalRetry,
	      cache = options.cache;


	  function resolverErrorSelector(error) {
	    throw errorSelector("PIPELINE_RESOLVE_ERROR", pipelineType, error);
	  }

	  function loaderErrorSelector(error) {
	    throw errorSelector("PIPELINE_LOAD_ERROR", pipelineType, error);
	  }

	  function parserErrorSelector(error) {
	    throw errorSelector("PIPELINE_PARSING_ERROR", pipelineType, error);
	  }

	  var loaderBackoffOptions = {
	    retryDelay: 200,
	    errorSelector: loaderErrorSelector,
	    totalRetry: totalRetry || 4,
	    shouldRetry: loaderShouldRetry,
	    onRetry: function onRetry(error) {
	      schedulMetrics({ type: pipelineType, value: error.xhr });
	      errorStream.next(errorSelector("PIPELINE_LOAD_ERROR", pipelineType, error, false));
	    }
	  };

	  function dispatchMetrics(value) {
	    metrics.next(value);
	  }

	  function schedulMetrics(value) {
	    metricsScheduler.schedule(dispatchMetrics, 0, value);
	  }

	  function resolverWithCatch(pipelineInputData) {
	    return tryCatch(resolver, pipelineInputData).catch(resolverErrorSelector);
	  }

	  function loaderWithRetry(resolvedInfos) {
	    return retryWithBackoff(tryCatch(loader, resolvedInfos), loaderBackoffOptions);
	  }

	  function loaderWithCache(resolvedInfos) {
	    var fromCache = cache ? cache.get(resolvedInfos) : null;
	    if (fromCache === null) {
	      return loaderWithRetry(resolvedInfos);
	    } else {
	      return castToObservable(fromCache).catch(function () {
	        return loaderWithRetry(resolvedInfos);
	      });
	    }
	  }

	  function parserWithCatch(loadedInfos) {
	    return tryCatch(parser, loadedInfos).catch(parserErrorSelector);
	  }

	  function extendsResponseAndResolvedInfos(resolvedInfos, response) {
	    var loadedInfos = Object.assign({ response: response }, resolvedInfos);

	    // add loadedInfos to the pipeline cache
	    if (cache) {
	      cache.add(resolvedInfos, response);
	    }

	    // emits its value in the metrics observer
	    schedulMetrics({ type: pipelineType, value: loadedInfos });

	    return loadedInfos;
	  }

	  function extendsParsedAndLoadedInfos(loadedInfos, parsed) {
	    return Object.assign({ parsed: parsed }, loadedInfos);
	  }

	  return function (pipelineInputData) {
	    return resolverWithCatch(pipelineInputData).mergeMap(loaderWithCache, extendsResponseAndResolvedInfos).mergeMap(parserWithCatch, extendsParsedAndLoadedInfos);
	  };
	}

	function PipeLines() {
	  // the metrics observer/observable is used to calculate informations
	  // about loaded responsed in the loader part of pipelines
	  var metrics = new Subject();

	  var createPipelines = function createPipelines(transport) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var pipelines = {
	      requiresMediaSource: function requiresMediaSource() {
	        return transport.directFile !== true;
	      }
	    };

	    for (var pipelineType in transport) {
	      pipelines[pipelineType] = createPipeline(pipelineType, transport[pipelineType], metrics, options.errorStream, options[pipelineType]);
	    }

	    return pipelines;
	  };

	  return { createPipelines: createPipelines, metrics: metrics };
	}

	module.exports = PipeLines;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

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

	var log = __webpack_require__(9);

	var _require = __webpack_require__(4),
	    Subscription = _require.Subscription;

	var _require2 = __webpack_require__(8),
	    Subject = _require2.Subject;

	var _require3 = __webpack_require__(25),
	    BehaviorSubject = _require3.BehaviorSubject;

	var _require4 = __webpack_require__(19),
	    combineLatest = _require4.combineLatest;

	var _require5 = __webpack_require__(15),
	    on = _require5.on;

	var _require6 = __webpack_require__(21),
	    normalizeLang = _require6.normalize;

	var EventEmitter = __webpack_require__(35);
	var debugPane = __webpack_require__(157);
	var assert = __webpack_require__(3);

	var _require7 = __webpack_require__(14),
	    HTMLVideoElement_ = _require7.HTMLVideoElement_,
	    exitFullscreen = _require7.exitFullscreen,
	    requestFullscreen = _require7.requestFullscreen,
	    _isFullscreen = _require7.isFullscreen,
	    onFullscreenChange = _require7.onFullscreenChange;

	var _require8 = __webpack_require__(56),
	    getEmptyTimings = _require8.getEmptyTimings,
	    createTimingsSampler = _require8.createTimingsSampler,
	    toWallClockTime = _require8.toWallClockTime,
	    fromWallClockTime = _require8.fromWallClockTime,
	    getLiveGap = _require8.getLiveGap;

	var _require9 = __webpack_require__(7),
	    ErrorTypes = _require9.ErrorTypes,
	    ErrorCodes = _require9.ErrorCodes;

	var _require10 = __webpack_require__(133),
	    InitializationSegmentCache = _require10.InitializationSegmentCache;

	var _require11 = __webpack_require__(20),
	    BufferedRanges = _require11.BufferedRanges;

	var _require12 = __webpack_require__(143),
	    parseTimeFragment = _require12.parseTimeFragment;

	var DeviceEvents = __webpack_require__(134);
	var manifestHelpers = __webpack_require__(34);
	// TODO(pierre): separate transports from main build
	var Transports = __webpack_require__(149);
	var PipeLines = __webpack_require__(139);
	var Adaptive = __webpack_require__(130);
	var Stream = __webpack_require__(141);
	var EME = __webpack_require__(52);

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

	  Player.getErrorTypes = function getErrorTypes() {
	    return ErrorTypes;
	  };

	  Player.getErrorCodes = function getErrorCodes() {
	    return ErrorCodes;
	  };

	  function Player(options) {
	    _classCallCheck(this, Player);

	    var videoElement = options.videoElement;
	    var transport = options.transport,
	        transportOptions = options.transportOptions,
	        defaultLanguage = options.defaultLanguage,
	        defaultSubtitle = options.defaultSubtitle,
	        initVideoBitrate = options.initVideoBitrate,
	        initAudioBitrate = options.initAudioBitrate,
	        maxVideoBitrate = options.maxVideoBitrate,
	        maxAudioBitrate = options.maxAudioBitrate;

	    // auto-bindings
	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this._playPauseNext$ = _this._playPauseNext.bind(_this);
	    _this._textTrackChanges$ = _this._textTrackChanges.bind(_this);
	    _this._setPlayerState$ = _this._setPlayerState.bind(_this);
	    _this._triggerTimeChange$ = _this._triggerTimeChange.bind(_this);
	    _this._streamNext$ = _this._streamNext.bind(_this);
	    _this._streamError$ = _this._streamError.bind(_this);
	    _this._streamFatalError$ = _this._streamFatalError.bind(_this);
	    _this._streamComplete$ = _this._streamComplete.bind(_this);

	    _this.defaultTransport = transport;
	    _this.defaultTransportOptions = transportOptions || {};

	    if (!videoElement) {
	      videoElement = document.createElement("video");
	    }

	    assert(videoElement instanceof HTMLVideoElement_, "requires an actual HTMLVideoElement");

	    // Workaroud to support Firefox autoplay on FF 42.
	    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1194624
	    videoElement.preload = "auto";

	    _this.version = /*PLAYER_VERSION*/"2.0.12";
	    _this.video = videoElement;

	    // fullscreen change
	    _this.fullscreen = onFullscreenChange(videoElement).subscribe(function () {
	      return _this.trigger("fullscreenChange", _this.isFullscreen());
	    });

	    // playing state change
	    _this.playing = new BehaviorSubject();

	    // multicaster forwarding all streams events
	    _this.stream = new Subject();
	    _this.images = new Subject();
	    _this.errorStream = new Subject();

	    var _PipeLines = PipeLines(),
	        createPipelines = _PipeLines.createPipelines,
	        metrics = _PipeLines.metrics;

	    var deviceEvents = DeviceEvents(videoElement);

	    _this.createPipelines = createPipelines;
	    _this.metrics = metrics;

	    _this.adaptive = Adaptive(metrics, deviceEvents, {
	      initVideoBitrate: initVideoBitrate,
	      initAudioBitrate: initAudioBitrate,
	      maxVideoBitrate: maxVideoBitrate,
	      maxAudioBitrate: maxAudioBitrate,
	      defaultLanguage: normalizeLang(defaultLanguage),
	      defaultSubtitle: normalizeLang(defaultSubtitle)
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
	    this.reps = { video: null, audio: null, text: null, images: null };
	    this.adas = { video: null, audio: null, text: null, images: null };
	    this.evts = {};
	    this.frag = { start: null, end: null };
	    this.error = null;
	    this.images.next(null);
	  };

	  Player.prototype._unsubscribe = function _unsubscribe() {
	    if (this.subscriptions) {
	      var subscriptions = this.subscriptions;
	      this.subscriptions = null;
	      subscriptions.unsubscribe();
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
	    EME.dispose();

	    this.metrics = null;
	    this.adaptive = null;
	    this.fullscreen = null;
	    this.stream = null;

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
	    opts = Object.assign({
	      transport: this.defaultTransport,
	      transportOptions: {},
	      keySystems: [],
	      timeFragment: {},
	      subtitles: [],
	      images: [],
	      autoPlay: false,
	      hideNativeSubtitle: false,
	      directFile: false
	    }, opts);

	    var _opts = opts,
	        transport = _opts.transport,
	        url = _opts.url,
	        keySystems = _opts.keySystems,
	        timeFragment = _opts.timeFragment,
	        subtitles = _opts.subtitles,
	        images = _opts.images;
	    var _opts2 = opts,
	        transportOptions = _opts2.transportOptions,
	        manifests = _opts2.manifests,
	        autoPlay = _opts2.autoPlay,
	        directFile = _opts2.directFile,
	        defaultLanguage = _opts2.defaultLanguage,
	        defaultSubtitle = _opts2.defaultSubtitle,
	        hideNativeSubtitle = _opts2.hideNativeSubtitle;


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
	      images = firstManifest.images || [];
	      keySystems = manifests.map(function (man) {
	        return man.keySystem;
	      }).filter(Boolean);
	    }

	    if (typeof transport == "string") {
	      transport = Transports[transport];
	    }

	    if (typeof transport == "function") {
	      transport = transport(Object.assign({}, this.defaultTransportOptions, transportOptions));
	    }

	    assert(transport, "player: transport " + opts.transport + " is not supported");

	    return {
	      url: url,
	      keySystems: keySystems,
	      subtitles: subtitles,
	      hideNativeSubtitle: hideNativeSubtitle,
	      images: images,
	      timeFragment: timeFragment,
	      autoPlay: autoPlay,
	      defaultLanguage: defaultLanguage,
	      defaultSubtitle: defaultSubtitle,
	      transport: transport
	    };
	  };

	  Player.prototype.loadVideo = function loadVideo() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    options = this._parseOptions(options);
	    log.info("loadvideo", options);

	    var _options = options,
	        url = _options.url,
	        keySystems = _options.keySystems,
	        subtitles = _options.subtitles,
	        hideNativeSubtitle = _options.hideNativeSubtitle,
	        images = _options.images,
	        timeFragment = _options.timeFragment,
	        autoPlay = _options.autoPlay,
	        transport = _options.transport,
	        defaultLanguage = _options.defaultLanguage,
	        defaultSubtitle = _options.defaultSubtitle;


	    this.stop();
	    this.frag = timeFragment;
	    this.playing.next(autoPlay);

	    if (defaultLanguage) {
	      this.adaptive.setLanguage(normalizeLang(defaultLanguage));
	    }
	    if (defaultSubtitle) {
	      this.adaptive.setSubtitle(normalizeLang(defaultSubtitle));
	    }

	    var videoElement = this.video,
	        adaptive = this.adaptive,
	        errorStream = this.errorStream;


	    var pipelines = this.createPipelines(transport, {
	      errorStream: errorStream,
	      audio: { cache: new InitializationSegmentCache() },
	      video: { cache: new InitializationSegmentCache() }
	    });

	    var timings = createTimingsSampler(videoElement, { requiresMediaSource: pipelines.requiresMediaSource() });
	    var stream = Stream({
	      url: url,
	      errorStream: errorStream,
	      keySystems: keySystems,
	      subtitles: subtitles,
	      hideNativeSubtitle: hideNativeSubtitle,
	      timings: timings,
	      images: images,
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
	    var textTracksChanges = on(videoElement.textTracks, ["addtrack"]);

	    var subs = this.subscriptions = new Subscription();
	    subs.add(playChanges.subscribe(this._playPauseNext$, noop));
	    subs.add(textTracksChanges.subscribe(this._textTrackChanges$, noop));
	    subs.add(stateChanges.subscribe(this._setPlayerState$, noop));
	    subs.add(timings.subscribe(this._triggerTimeChange$, noop));
	    subs.add(stream.subscribe(this._streamNext$, this._streamFatalError$, this._streamComplete$));
	    subs.add(errorStream.subscribe(this._streamError$));
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
	    var type = streamInfos.type,
	        value = streamInfos.value;


	    if (type == "buffer") {
	      this._bufferNext(value);
	    }
	    if (type == "manifest") {
	      this._manifestNext(value);
	    }
	    if (type == "pipeline") {
	      this.trigger("progress", value.segment);
	      var bufferType = value.bufferType,
	          parsed = value.parsed;

	      if (bufferType === "image") {
	        this.images.next(parsed.segmentData);
	      }
	    }

	    this.stream.next(streamInfos);
	  };

	  Player.prototype._streamError = function _streamError(error) {
	    this.trigger("warning", error);
	    this.stream.next({ type: "warning", value: error });
	  };

	  Player.prototype._streamFatalError = function _streamFatalError(error) {
	    this._resetStates();
	    this.error = error;
	    this._setPlayerState(PLAYER_STOPPED);
	    this._unsubscribe();
	    this.trigger("error", error);
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
	    var bufferType = _ref.bufferType,
	        adaptation = _ref.adaptation,
	        representation = _ref.representation;

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
	    if (this.video.ended !== true) {
	      this.playing.next(evt.type == "play");
	    }
	  };

	  Player.prototype._textTrackChanges = function _textTrackChanges(_ref2) {
	    var _ref2$target = _ref2.target,
	        trackElement = _ref2$target[0];

	    if (trackElement) {
	      this.trigger("nativeTextTrackChange", trackElement);
	    }
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

	  Player.prototype.getError = function getError() {
	    return this.error;
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

	  Player.prototype.getImageTrack = function getImageTrack() {
	    return this.images.distinctUntilChanged();
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
	    var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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

	  Player.prototype.normalizeLanguageCode = function normalizeLanguageCode(lng) {
	    return normalizeLang(lng);
	  };

	  Player.prototype.isLanguageAvailable = function isLanguageAvailable(lng) {
	    return this.getAvailableLanguages().indexOf(normalizeLang(lng)) >= 0;
	  };

	  Player.prototype.isSubtitleAvailable = function isSubtitleAvailable(sub) {
	    return this.getAvailableSubtitles().indexOf(normalizeLang(sub)) >= 0;
	  };

	  Player.prototype.setLanguage = function setLanguage(lng) {
	    lng = normalizeLang(lng);
	    assert(this.isLanguageAvailable(lng), "player: unknown language");
	    this.adaptive.setLanguage(lng);
	  };

	  Player.prototype.setSubtitle = function setSubtitle(sub) {
	    sub = normalizeLang(sub);
	    assert(!sub || this.isSubtitleAvailable(sub), "player: unknown subtitle");
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

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

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

	var log = __webpack_require__(9);
	var assert = __webpack_require__(3);

	var _require = __webpack_require__(56),
	    getLiveGap = _require.getLiveGap,
	    seekingsSampler = _require.seekingsSampler,
	    fromWallClockTime = _require.fromWallClockTime;

	var _require2 = __webpack_require__(36),
	    retryableFuncWithBackoff = _require2.retryableFuncWithBackoff;

	var _require3 = __webpack_require__(1),
	    Observable = _require3.Observable;

	var _require4 = __webpack_require__(15),
	    on = _require4.on;

	var empty = __webpack_require__(5).EmptyObservable.create;

	var _require5 = __webpack_require__(12),
	    merge = _require5.merge;

	var _require6 = __webpack_require__(19),
	    combineLatest = _require6.combineLatest;

	var min = Math.min;

	var _require7 = __webpack_require__(14),
	    MediaSource_ = _require7.MediaSource_,
	    sourceOpen = _require7.sourceOpen,
	    canPlay = _require7.canPlay,
	    canSeek = _require7.canSeek,
	    isPlaybackStuck = _require7.isPlaybackStuck;

	var TextSourceBuffer = __webpack_require__(142);
	var ImageSourceBuffer = __webpack_require__(135);

	var _require8 = __webpack_require__(53),
	    getLiveEdge = _require8.getLiveEdge;

	var _require9 = __webpack_require__(131),
	    Buffer = _require9.Buffer,
	    EmptyBuffer = _require9.EmptyBuffer;

	var _require10 = __webpack_require__(52),
	    createEME = _require10.createEME,
	    onEncrypted = _require10.onEncrypted;

	var _require11 = __webpack_require__(7),
	    MediaError = _require11.MediaError,
	    OtherError = _require11.OtherError,
	    EncryptedMediaError = _require11.EncryptedMediaError,
	    isKnownError = _require11.isKnownError;

	var _require12 = __webpack_require__(34),
	    normalizeManifest = _require12.normalizeManifest,
	    mergeManifestsIndex = _require12.mergeManifestsIndex,
	    mutateManifestLiveGap = _require12.mutateManifestLiveGap,
	    getAdaptations = _require12.getAdaptations;

	// Stop stream 0.5 second before the end of video
	// It happens often that the video gets stuck 100 to 300 ms before the end, especially on IE11 and Edge


	var END_OF_PLAY = 0.5;

	var DISCONTINUITY_THRESHOLD = 1; // discontinuity threshold in seconds

	function isNativeBuffer(bufferType) {
	  return bufferType == "audio" || bufferType == "video";
	}

	function Stream(_ref) {
	  var url = _ref.url,
	      errorStream = _ref.errorStream,
	      keySystems = _ref.keySystems,
	      subtitles = _ref.subtitles,
	      hideNativeSubtitle = _ref.hideNativeSubtitle,
	      images = _ref.images,
	      timings = _ref.timings,
	      timeFragment = _ref.timeFragment,
	      adaptive = _ref.adaptive,
	      pipelines = _ref.pipelines,
	      videoElement = _ref.videoElement,
	      autoPlay = _ref.autoPlay;


	  var fragStartTime = timeFragment.start;
	  var fragEndTimeIsFinite = fragEndTime < Infinity;
	  var fragEndTime = timeFragment.end;

	  var manifestPipeline = pipelines.manifest;

	  var nativeBuffers = {};
	  var customBuffers = {};

	  var retryOptions = {
	    totalRetry: 3,
	    retryDelay: 250,
	    resetDelay: 60 * 1000,
	    shouldRetry: function shouldRetry(error) {
	      return error.fatal !== true;
	    },
	    errorSelector: function errorSelector(error) {
	      if (!isKnownError(error)) {
	        error = new OtherError("NONE", error, true);
	      }
	      error.fatal = true;
	      return error;
	    },
	    onRetry: function onRetry(error, tryCount) {
	      log.warn("stream retry", error, tryCount);
	      errorStream.next(error);
	    }
	  };

	  function addNativeSourceBuffer(mediaSource, type, codec) {
	    if (!nativeBuffers[type]) {
	      log.info("add sourcebuffer", codec);
	      nativeBuffers[type] = mediaSource.addSourceBuffer(codec);
	    }
	    return nativeBuffers[type];
	  }

	  function createSourceBuffer(video, mediaSource, bufferInfos) {
	    var type = bufferInfos.type,
	        codec = bufferInfos.codec;


	    var sourceBuffer = void 0;

	    if (isNativeBuffer(type)) {
	      sourceBuffer = addNativeSourceBuffer(mediaSource, type, codec);
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
	        sourceBuffer = new TextSourceBuffer(video, codec, hideNativeSubtitle);
	      } else if (type == "image") {
	        log.info("add image sourcebuffer", codec);
	        sourceBuffer = new ImageSourceBuffer(codec);
	      } else {
	        log.error("unknown buffer type " + type);
	        throw new MediaError("BUFFER_TYPE_UNKNOWN", null, true);
	      }

	      customBuffers[type] = sourceBuffer;
	    }

	    return sourceBuffer;
	  }

	  function disposeSourceBuffer(video, mediaSource, bufferInfos) {
	    var type = bufferInfos.type;


	    var oldSourceBuffer = void 0;

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
	      var mediaSource = void 0,
	          objectURL = void 0;

	      function resetMediaElement() {
	        if (mediaSource && mediaSource.readyState != "closed") {
	          var _mediaSource = mediaSource,
	              readyState = _mediaSource.readyState,
	              sourceBuffers = _mediaSource.sourceBuffers;

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

	        // Clear video src attribute.
	        // On IE11,  video.src = "" is not sufficient as it
	        // does not clear properly the current MediaKey Session.
	        // Microsoft recommended to use video.removeAttr("src").
	        video.src = "";
	        video.removeAttribute("src");

	        if (objectURL) {
	          try {
	            URL.revokeObjectURL(objectURL);
	          } catch (e) {
	            log.warn("error while revoking ObjectURL", e);
	          }
	        }

	        nativeBuffers = {};
	        customBuffers = {};

	        mediaSource = null;
	        objectURL = null;
	      }

	      // make sure the media has been correctly reset
	      resetMediaElement();

	      if (pipelines.requiresMediaSource()) {
	        if (!MediaSource_) {
	          throw new MediaError("MEDIA_SOURCE_NOT_SUPPORTED", null, true);
	        }
	        mediaSource = new MediaSource_();
	        objectURL = URL.createObjectURL(mediaSource);
	      } else {
	        mediaSource = null;
	        objectURL = url;
	      }

	      video.src = objectURL;

	      observer.next({ url: url, mediaSource: mediaSource });
	      log.info("create mediasource object", objectURL);

	      return resetMediaElement;
	    });
	  }

	  function createTimings(manifest) {
	    var augmentedTimings = timings.map(function (timing) {
	      var clonedTiming = void 0;
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
	    var ts = _ref2.ts,
	        duration = _ref2.duration;
	    return duration > 0 && min(duration, fragEndTime) - ts < END_OF_PLAY;
	  });

	  /**
	   * Wait for manifest and media-source to open before initializing source
	   * duration and creating buffers
	   */
	  var createAllStream = retryableFuncWithBackoff(function (_ref3) {
	    var url = _ref3.url,
	        mediaSource = _ref3.mediaSource;

	    var sourceOpening = mediaSource ? sourceOpen(mediaSource) : Observable.of(null);

	    return combineLatest(manifestPipeline({ url: url }), sourceOpening).mergeMap(function (_ref4) {
	      var parsed = _ref4[0].parsed;

	      var manifest = normalizeManifest(parsed.url, parsed.manifest, subtitles, images);

	      if (mediaSource) {
	        setDuration(mediaSource, manifest);
	      }

	      return createStream(mediaSource, manifest);
	    });
	  }, retryOptions);

	  return createAndPlugMediaSource(url, videoElement).mergeMap(createAllStream).takeUntil(endOfPlay);

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
	        return buffer.catch(function (error) {
	          log.error("buffer", bufferType, "has crashed", error);
	          errorStream.next(error);
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

	    return combineLatest(canSeek$, canPlay$).take(1).mapTo({ type: "loaded", value: true });
	  }

	  function createEMEIfKeySystems() {
	    if (keySystems && keySystems.length) {
	      return createEME(videoElement, keySystems, errorStream);
	    } else {
	      return onEncrypted(videoElement).map(function () {
	        log.error("eme: ciphered media and no keySystem passed");
	        throw new EncryptedMediaError("MEDIA_IS_ENCRYPTED_ERROR", null, true);
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
	    var _ref5$changePlaybackR = _ref5.changePlaybackRate,
	        changePlaybackRate = _ref5$changePlaybackR === undefined ? true : _ref5$changePlaybackR;

	    return timings.distinctUntilChanged(function (prevTiming, timing) {
	      var isStalled = timing.stalled;
	      var wasStalled = prevTiming.stalled;

	      var isEqual = void 0;
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

	        if (isPlaybackStuck(timing)) {
	          videoElement.currentTime = timing.ts;
	          log.warn("after freeze seek", timing.ts, timing.range);
	        } else if (nextRangeGap < DISCONTINUITY_THRESHOLD) {
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

	  function messageHandler(message, manifest) {
	    switch (message.type) {
	      case "index-discontinuity":
	        log.warn("explicit discontinuity seek", message.value.ts);
	        videoElement.currentTime = message.value.ts;
	        break;

	      // precondition-failed messages require a change of live-gap to
	      // calibrate the live representation of the player
	      // TODO(pierre): smarter converging algorithm
	      case "precondition-failed":
	        mutateManifestLiveGap(manifest, 1);
	        log.warn("precondition failed", manifest.presentationLiveGap);
	        break;

	      case "out-of-index":
	        // out-of-index messages require a complete reloading of the
	        // manifest to refresh the current index
	        log.info("out of index");
	        return manifestPipeline({ url: manifest.locations[0] }).map(function (_ref6) {
	          var parsed = _ref6.parsed;

	          var newManifest = mergeManifestsIndex(manifest, normalizeManifest(parsed.url, parsed.manifest, subtitles));
	          return { type: "manifest", value: newManifest };
	        });
	    }

	    return Observable.of(message);
	  }

	  function isErrorMessage(message) {
	    return message.type == "out-of-index" || message.type == "index-discontinuity";
	  }

	  function createAdaptationsBuffers(mediaSource, manifest, timings, seekings) {
	    var adaptations = getAdaptations(manifest);

	    // Initialize all native source buffer at the same time. We cannot
	    // lazily create native sourcebuffers since the spec does not
	    // allow adding them during playback.
	    //
	    // From https://w3c.github.io/media-source/#methods
	    //    For example, a user agent may throw a QuotaExceededError
	    //    exception if the media element has reached the HAVE_METADATA
	    //    readyState. This can occur if the user agent's media engine
	    //    does not support adding more tracks during playback.
	    adaptations.forEach(function (_ref7) {
	      var type = _ref7.type,
	          codec = _ref7.codec;

	      if (isNativeBuffer(type)) {
	        addNativeSourceBuffer(mediaSource, type, codec);
	      }
	    });

	    var adaptationsBuffers = adaptations.map(function (adaptation) {
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
	      return isErrorMessage(b) && isErrorMessage(a);
	    }).concatMap(function (message) {
	      return messageHandler(message, manifest);
	    });
	  }

	  function createMediaErrorStream() {
	    return on(videoElement, "error").mergeMap(function () {
	      var errorCode = videoElement.error.code;
	      var errorDetail = void 0;
	      switch (errorCode) {
	        case 1:
	          errorDetail = "MEDIA_ERR_ABORTED";break;
	        case 2:
	          errorDetail = "MEDIA_ERR_NETWORK";break;
	        case 3:
	          errorDetail = "MEDIA_ERR_DECODE";break;
	        case 4:
	          errorDetail = "MEDIA_ERR_SRC_NOT_SUPPORTED";break;
	      }
	      log.error("stream: video element MEDIA_ERR(" + errorDetail + ")");
	      throw new MediaError(errorDetail, null, true);
	    });
	  }

	  /**
	   * Creates a stream merging all observable that are required to make
	   * the system cooperate.
	   */
	  function createStream(mediaSource, manifest) {
	    var _createTimings = createTimings(manifest),
	        timings = _createTimings.timings,
	        seekings = _createTimings.seekings;

	    var justManifest = Observable.of({ type: "manifest", value: manifest });
	    var emeHandler = createEMEIfKeySystems();
	    var stalled = createStalled(timings, {
	      changePlaybackRate: pipelines.requiresMediaSource()
	    });
	    var canPlay = createLoadedMetadata(manifest);
	    var buffers = createAdaptationsBuffers(mediaSource, manifest, timings, seekings);
	    var mediaError = createMediaErrorStream();

	    return merge(justManifest, canPlay, stalled, emeHandler, buffers, mediaError);
	  }

	  /**
	   * Side effect the set the media duration in mediaSource. This side
	   * effect occurs when we receive the "sourceopen" from the
	   * mediaSource.
	   */
	  function setDuration(mediaSource, manifest) {
	    var duration = void 0;
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

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(55),
	    AbstractSourceBuffer = _require.AbstractSourceBuffer;

	var _require2 = __webpack_require__(14),
	    addTextTrack = _require2.addTextTrack,
	    isVTTSupported = _require2.isVTTSupported;

	var log = __webpack_require__(9);

	var Cue = window.VTTCue || window.TextTrackCue;

	var TextSourceBuffer = function (_AbstractSourceBuffer) {
	  _inherits(TextSourceBuffer, _AbstractSourceBuffer);

	  function TextSourceBuffer(video, codec, hideNativeSubtitle) {
	    _classCallCheck(this, TextSourceBuffer);

	    var _this = _possibleConstructorReturn(this, _AbstractSourceBuffer.call(this, codec));

	    _this.video = video;
	    _this.codec = codec;
	    _this.isVTT = /^text\/vtt/.test(codec);

	    var _addTextTrack = addTextTrack(video, hideNativeSubtitle),
	        track = _addTextTrack.track,
	        trackElement = _addTextTrack.trackElement;

	    _this.track = track;
	    _this.trackElement = trackElement;
	    return _this;
	  }

	  TextSourceBuffer.prototype.createCuesFromArray = function createCuesFromArray(cues) {
	    var nativeCues = [];
	    for (var i = 0; i < cues.length; i++) {
	      var _cues$i = cues[i],
	          start = _cues$i.start,
	          end = _cues$i.end,
	          text = _cues$i.text;

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
	          if (firstCue.startTime < currentCues[currentCues.length - 1].startTime) {
	            this._remove(firstCue.startTime, +Infinity);
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
	    for (var i = cues.length - 1; i >= 0; i--) {
	      var cue = cues[i];
	      var startTime = cue.startTime,
	          endTime = cue.endTime;

	      if (startTime >= from && startTime <= to && endTime <= to) {
	        track.removeCue(cue);
	      }
	    }
	    this.buffered.remove(from, to);
	  };

	  TextSourceBuffer.prototype._abort = function _abort() {
	    var trackElement = this.trackElement,
	        video = this.video;

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

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);

	function parseTimeFragment(timeFragment) {
	  if (typeof timeFragment == "string") {
	    timeFragment = temporalMediaFragmentParser(timeFragment);
	  } else if (!timeFragment) {
	    timeFragment = {};
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

	var errMessage = "invalid MediaFragment";

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
	  var hours = void 0;
	  var minutes = void 0;
	  var seconds = void 0;
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
	  var hours = void 0;
	  var minutes = void 0;
	  var seconds = void 0;
	  var frames = void 0;
	  var subframes = void 0;
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

	  var timeNormalizer = void 0;
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

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(18),
	    le2toi = _require.le2toi,
	    le4toi = _require.le4toi,
	    bytesToStr = _require.bytesToStr;

	function parseBif(buf) {
	  var pos = 0;

	  var length = buf.length;
	  var fileFormat = bytesToStr(buf.subarray(pos, pos + 8));pos += 8;

	  var minorVersion = buf[pos];pos += 1;
	  var majorVersion = buf[pos];pos += 1;
	  var patchVersion = buf[pos];pos += 1;
	  var increVersion = buf[pos];pos += 1;

	  var version = [minorVersion, majorVersion, patchVersion, increVersion].join(".");

	  var imageCount = buf[pos] + le4toi(buf, pos + 1);pos += 4;
	  var timescale = le4toi(buf, pos);pos += 4;

	  var format = bytesToStr(buf.subarray(pos, pos + 4));pos += 4;

	  var width = le2toi(buf, pos);pos += 2;
	  var height = le2toi(buf, pos);pos += 2;

	  var aspectRatio = [buf[pos], buf[pos + 1]].join(":");pos += 2;

	  var isVod = buf[pos] === 1;pos += 1;

	  // bytes 0x1F to 0x40 is unused data for now
	  pos = 0x40;

	  var thumbs = [];
	  var currentImage = void 0,
	      currentTs = 0;

	  if (!imageCount) {
	    throw new Error("bif: no images to parse");
	  }

	  while (pos < length) {
	    var currentImageIndex = le4toi(buf, pos);pos += 4;
	    var currentImageOffset = le4toi(buf, pos);pos += 4;

	    if (currentImage) {
	      var index = currentImage.index;
	      var duration = timescale;
	      var ts = currentTs;
	      var data = buf.subarray(currentImage.offset, currentImageOffset);

	      thumbs.push({ index: index, duration: duration, ts: ts, data: data });

	      currentTs += timescale;
	    }

	    if (currentImageIndex === 0xffffffff) {
	      break;
	    }

	    currentImage = {
	      index: currentImageIndex,
	      offset: currentImageOffset
	    };
	  }

	  return {
	    fileFormat: fileFormat,
	    version: version,
	    imageCount: imageCount,
	    timescale: timescale,
	    format: format,
	    width: width,
	    height: height,
	    aspectRatio: aspectRatio,
	    isVod: isVod,
	    thumbs: thumbs
	  };
	}

	module.exports = {
	  parseBif: parseBif
	};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(1),
	    Observable = _require.Observable;

	var empty = __webpack_require__(5).EmptyObservable.create;

	var _require2 = __webpack_require__(12),
	    merge = _require2.merge;

	var assert = __webpack_require__(3);

	var _require3 = __webpack_require__(37),
	    resolveURL = _require3.resolveURL;

	var _require4 = __webpack_require__(146),
	    parseSidx = _require4.parseSidx,
	    patchPssh = _require4.patchPssh;

	var request = __webpack_require__(57);
	var dashManifestParser = __webpack_require__(147);

	function pad(n, l) {
	  n = n.toString();
	  if (n.length >= l) {
	    return n;
	  }
	  var arr = new Array(l + 1).join("0") + n;
	  return arr.slice(-l);
	}

	function byteRange(_ref) {
	  var start = _ref[0],
	      end = _ref[1];

	  if (!end || end === Infinity) {
	    return "bytes=" + +start + "-";
	  } else {
	    return "bytes=" + +start + "-" + +end;
	  }
	}

	function processFormatedToken(replacer) {
	  return function (match, format, widthStr) {
	    var width = widthStr ? parseInt(widthStr, 10) : 1;
	    return pad("" + replacer, width);
	  };
	}

	function replaceTokens(path, segment) {
	  if (path.indexOf("$") === -1) {
	    return path;
	  } else {
	    var rep = segment.getRepresentation();
	    return path.replace(/\$\$/g, "$").replace(/\$RepresentationID\$/g, rep.id).replace(/\$Bandwidth(|\%0(\d+)d)\$/g, processFormatedToken(rep.bitrate)).replace(/\$Number(|\%0(\d+)d)\$/g, processFormatedToken(segment.getNumber())).replace(/\$Time(|\%0(\d+)d)\$/g, processFormatedToken(segment.getTime()));
	  }
	}

	module.exports = function () {
	  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var contentProtectionParser = opts.contentProtectionParser;


	  if (!contentProtectionParser) {
	    contentProtectionParser = function contentProtectionParser() {};
	  }

	  var createXHR = opts.createXHR;

	  var manifestPipeline = {
	    loader: function loader(_ref2) {
	      var url = _ref2.url;

	      return request({
	        url: url,
	        responseType: "document",
	        createXHR: createXHR
	      });
	    },
	    parser: function parser(_ref3) {
	      var response = _ref3.response;

	      return Observable.of({
	        manifest: dashManifestParser(response.responseData, contentProtectionParser),
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

	      var mediaHeaders = void 0;
	      if (range) {
	        mediaHeaders = { "Range": byteRange(range) };
	      } else {
	        mediaHeaders = null;
	      }

	      var path = void 0;
	      if (media) {
	        path = replaceTokens(media, segment);
	      } else {
	        path = "";
	      }

	      var mediaUrl = resolveURL(segment.getResolvedURL(), path);
	      var mediaOrInitRequest = request({
	        url: mediaUrl,
	        responseType: "arraybuffer",
	        headers: mediaHeaders,
	        createXHR: createXHR
	      });

	      // If init segment has indexRange metadata, we need to fetch
	      // both the initialization data and the index metadata. We do
	      // this in parallel and send the both blobs into the pipeline.
	      // TODO(pierre): we could fire both these requests as one if the
	      // init and index ranges are contiguous, which should be the
	      // case most of the time.
	      if (indexRange) {
	        var indexRequest = request({
	          url: mediaUrl,
	          responseType: "arraybuffer",
	          headers: { "Range": byteRange(indexRange) },
	          createXHR: createXHR
	        });
	        return merge(mediaOrInitRequest, indexRequest);
	      } else {
	        return mediaOrInitRequest;
	      }
	    },
	    parser: function parser(_ref5) {
	      var segment = _ref5.segment,
	          response = _ref5.response;

	      var responseData = new Uint8Array(response.responseData);

	      // added segments and timescale informations are extracted from
	      // sidx atom
	      var nextSegments = void 0,
	          timescale = void 0,
	          currentSegment = void 0;

	      // added index (segments and timescale) informations are
	      // extracted from sidx atom
	      var indexRange = segment.getIndexRange();
	      var index = parseSidx(responseData, indexRange ? indexRange[0] : 0);
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

	      var segmentData = responseData;
	      if (segment.isInitSegment()) {
	        var adaptation = segment.getAdaptation();
	        if (adaptation.contentProtection) {
	          segmentData = patchPssh(responseData, adaptation.contentProtection);
	        }
	      }

	      return Observable.of({
	        segmentData: segmentData,
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

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);

	var _require = __webpack_require__(18),
	    itobe4 = _require.itobe4,
	    be8toi = _require.be8toi,
	    be4toi = _require.be4toi,
	    be2toi = _require.be2toi,
	    hexToBytes = _require.hexToBytes,
	    strToBytes = _require.strToBytes,
	    concat = _require.concat;

	function findAtom(buf, atomName) {
	  var l = buf.length;
	  var i = 0;

	  var name = void 0,
	      size = void 0;
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
	  var time = void 0;
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
	  var systemId = _ref.systemId,
	      privateData = _ref.privateData;

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

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);

	var _require = __webpack_require__(21),
	    normalizeLang = _require.normalize;

	var iso8601Duration = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/;
	var rangeRe = /([0-9]+)-([0-9]+)/;
	var frameRateRe = /([0-9]+)(\/([0-9]+))?/;

	// TODO(pierre): support more than juste timeline index type
	function calcLastRef(index) {
	  var _index$timeline = index.timeline[index.timeline.length - 1],
	      ts = _index$timeline.ts,
	      r = _index$timeline.r,
	      d = _index$timeline.d;

	  return (ts + (r + 1) * d) / index.timescale;
	}

	function feedAttributes(node, base) {
	  var attrs = attributes[node.nodeName];

	  assert(attrs, "no attributes for " + node.nodeName);

	  var obj = base || {};
	  for (var i = 0; i < attrs.length; i++) {
	    var _attrs$i = attrs[i],
	        k = _attrs$i.k,
	        fn = _attrs$i.fn,
	        n = _attrs$i.n,
	        def = _attrs$i.def;

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
	  assert(match, date + " is not a valid ISO8601 duration");

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

	  "ContentComponent": [{ k: "id", fn: parseString }, { k: "lang", fn: normalizeLang }, { k: "contentType", fn: parseString }, { k: "par", fn: parseRatio }],

	  "Representation": RepresentationBaseType.concat([{ k: "id", fn: parseString }, { k: "bandwidth", fn: parseInt, n: "bitrate" }, { k: "qualityRanking", fn: parseInt }]),

	  "AdaptationSet": RepresentationBaseType.concat([{ k: "id", fn: parseString }, { k: "group", fn: parseInt }, { k: "lang", fn: normalizeLang }, { k: "contentType", fn: parseString }, { k: "par", fn: parseRatio }, { k: "minBandwidth", fn: parseInt, n: "minBitrate" }, { k: "maxBandwidth", fn: parseInt, n: "maxBitrate" }, { k: "minWidth", fn: parseInt }, { k: "maxWidth", fn: parseInt }, { k: "minHeight", fn: parseInt }, { k: "maxHeight", fn: parseInt }, { k: "minFrameRate", fn: parseFrameRate }, { k: "maxFrameRate", fn: parseFrameRate }, { k: "segmentAlignment", fn: parseIntOrBoolean }, { k: "subsegmentAlignment", fn: parseIntOrBoolean }, { k: "bitstreamSwitching", fn: parseBoolean }]),

	  "Period": [{ k: "id", fn: parseString }, { k: "start", fn: parseDuration }, { k: "duration", fn: parseDuration }, { k: "bitstreamSwitching", fn: parseBoolean }],

	  "MPD": [{ k: "id", fn: parseString }, { k: "profiles", fn: parseString }, { k: "type", fn: parseString, def: "static" }, { k: "availabilityStartTime", fn: parseDateTime }, { k: "availabilityEndTime", fn: parseDateTime }, { k: "publishTime", fn: parseDateTime }, { k: "mediaPresentationDuration", fn: parseDuration, n: "duration" }, { k: "minimumUpdatePeriod", fn: parseDuration }, { k: "minBufferTime", fn: parseDuration }, { k: "timeShiftBufferDepth", fn: parseDuration }, { k: "suggestedPresentationDelay", fn: parseDuration }, { k: "maxSegmentDuration", fn: parseDuration }, { k: "maxSubsegmentDuration", fn: parseDuration }]
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
	  var range = void 0,
	      media = void 0;

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
	      return Object.assign({ baseURL: attrs.baseURL }, adaptation);
	    });
	  }

	  return attrs;
	}

	function parseFromDocument(document, contentProtectionParser) {
	  var root = document.documentElement;
	  assert.equal(root.nodeName, "MPD", "document root should be MPD");

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

	  if (/dynamic/.test(manifest.type)) {
	    var adaptations = manifest.periods[0].adaptations;
	    var videoAdaptation = adaptations.filter(function (a) {
	      return a.mimeType == "video/mp4";
	    })[0];

	    var videoIndex = videoAdaptation && videoAdaptation.index;

	    if (false) {
	      assert(videoIndex && (videoIndex.indexType == "timeline" || videoIndex.indexType == "template"));
	      assert(manifest.availabilityStartTime);
	    }

	    var lastRef = void 0;
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

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(1),
	    Observable = _require.Observable;

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

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

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
	  "smooth": __webpack_require__(150),
	  "dash": __webpack_require__(145),
	  "directfile": __webpack_require__(148)
	};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(1),
	    Observable = _require.Observable;

	var empty = __webpack_require__(5).EmptyObservable.create;

	var _require2 = __webpack_require__(18),
	    bytesToStr = _require2.bytesToStr;

	var log = __webpack_require__(9);

	var request = __webpack_require__(57);
	var RequestResponse = request.RequestResponse;

	var createSmoothStreamingParser = __webpack_require__(152);

	var _require3 = __webpack_require__(151),
	    patchSegment = _require3.patchSegment,
	    createVideoInitSegment = _require3.createVideoInitSegment,
	    createAudioInitSegment = _require3.createAudioInitSegment,
	    getMdat = _require3.getMdat,
	    getTraf = _require3.getTraf,
	    parseTfrf = _require3.parseTfrf,
	    parseTfxd = _require3.parseTfxd;

	var _require4 = __webpack_require__(144),
	    parseBif = _require4.parseBif;

	var _require5 = __webpack_require__(153),
	    parseSami = _require5.parseSami;

	var _require6 = __webpack_require__(154),
	    parseTTML = _require6.parseTTML;

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
	  var start = _ref[0],
	      end = _ref[1];

	  if (!end || end === Infinity) {
	    return "bytes=" + +start + "-";
	  } else {
	    return "bytes=" + +start + "-" + +end;
	  }
	}

	function extractISML(_ref2) {
	  var responseData = _ref2.responseData;

	  return responseData.getElementsByTagName("media")[0].getAttribute("src");
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

	module.exports = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var smoothManifestParser = createSmoothStreamingParser(options);
	  var createXHR = options.createXHR;

	  var manifestPipeline = {
	    resolver: function resolver(_ref3) {
	      var url = _ref3.url;

	      var resolving = void 0;
	      var token = extractToken(url);

	      if (WSX_REG.test(url)) {
	        resolving = request({
	          url: replaceToken(url, ""),
	          responseType: "document",
	          resultSelector: extractISML,
	          createXHR: createXHR
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

	      return request({
	        url: url,
	        responseType: "document",
	        createXHR: createXHR
	      });
	    },
	    parser: function parser(_ref5) {
	      var response = _ref5.response;

	      return Observable.of({
	        manifest: smoothManifestParser(response.responseData),
	        url: response.url
	      });
	    }
	  };

	  function extractTimingsInfos(responseData, segment) {
	    var nextSegments = void 0;
	    var currentSegment = void 0;

	    if (segment.getAdaptation().isLive) {
	      var traf = getTraf(responseData);
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

	        var responseData = void 0;
	        var protection = adaptation.smoothProtection || {};
	        switch (adaptation.type) {
	          case "video":
	            responseData = createVideoInitSegment(representation.index.timescale, representation.width, representation.height, 72, 72, 4, // vRes, hRes, nal
	            representation.codecPrivateData, protection.keyId, // keyId
	            protection.keySystems // pssList
	            );break;
	          case "audio":
	            responseData = createAudioInitSegment(representation.index.timescale, representation.channels, representation.bitsPerSample, representation.packetSize, representation.samplingRate, representation.codecPrivateData, protection.keyId, // keyId
	            protection.keySystems // pssList
	            );break;
	        }

	        return Observable.of(new RequestResponse(200, "", "arraybuffer", Date.now() - 100, Date.now(), responseData.length, responseData));
	      } else {
	        var headers = void 0;

	        var range = segment.getRange();
	        if (range) {
	          headers = { "Range": byteRange(range) };
	        }

	        var url = buildSegmentURL(segment);
	        return request({
	          url: url,
	          responseType: "arraybuffer",
	          headers: headers,
	          createXHR: createXHR
	        });
	      }
	    },
	    parser: function parser(_ref7) {
	      var segment = _ref7.segment,
	          response = _ref7.response;
	      var responseData = response.responseData;


	      if (segment.isInitSegment()) {
	        return Observable.of({
	          segmentData: responseData,
	          timings: null
	        });
	      }

	      var responseBuffer = new Uint8Array(responseData);

	      var _extractTimingsInfos = extractTimingsInfos(responseBuffer, segment),
	          nextSegments = _extractTimingsInfos.nextSegments,
	          currentSegment = _extractTimingsInfos.currentSegment;

	      var segmentData = patchSegment(responseBuffer, currentSegment.ts);

	      return Observable.of({
	        segmentData: segmentData,
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

	      var _segment$getRepresent = segment.getRepresentation(),
	          mimeType = _segment$getRepresent.mimeType;

	      var url = buildSegmentURL(segment);

	      if (mimeType.indexOf("mp4") >= 0) {
	        // in case of TTML declared inside playlists, the TTML file is
	        // embededded inside an mp4 fragment.
	        return request({ url: url, responseType: "arraybuffer", createXHR: createXHR });
	      } else {
	        return request({ url: url, responseType: "text", createXHR: createXHR });
	      }
	    },
	    parser: function parser(_ref9) {
	      var response = _ref9.response,
	          segment = _ref9.segment;

	      var _segment$getAdaptatio = segment.getAdaptation(),
	          lang = _segment$getAdaptatio.lang;

	      var _segment$getRepresent2 = segment.getRepresentation(),
	          mimeType = _segment$getRepresent2.mimeType,
	          index = _segment$getRepresent2.index;

	      var ttParser = TT_PARSERS[mimeType];
	      if (!ttParser) {
	        throw new Error("could not find a text-track parser for the type " + mimeType);
	      }

	      var responseData = response.responseData;
	      var text = void 0;
	      // in case of TTML declared inside playlists, the TTML file is
	      // embededded inside an mp4 fragment.
	      if (mimeType.indexOf("mp4") >= 0) {
	        responseData = new Uint8Array(responseData);
	        text = bytesToStr(getMdat(responseData));
	      } else {
	        // vod is simple WebVTT or TTML text
	        text = responseData;
	      }

	      var _extractTimingsInfos2 = extractTimingsInfos(responseData, segment),
	          nextSegments = _extractTimingsInfos2.nextSegments,
	          currentSegment = _extractTimingsInfos2.currentSegment;

	      var segmentData = ttParser(text, lang, segment.getTime() / index.timescale);

	      return Observable.of({
	        segmentData: segmentData,
	        currentSegment: currentSegment,
	        nextSegments: nextSegments
	      });
	    }
	  };

	  var imageTrackPipeline = {
	    loader: function loader(_ref10) {
	      var segment = _ref10.segment;

	      if (segment.init) {
	        return empty();
	      } else {
	        var url = buildSegmentURL(segment);
	        return request({ url: url, responseType: "arraybuffer", createXHR: createXHR });
	      }
	    },
	    parser: function parser(_ref11) {
	      var response = _ref11.response;

	      var responseData = response.responseData;
	      var blob = new Uint8Array(responseData);

	      var currentSegment = {
	        ts: 0,
	        d: Infinity
	      };

	      var segmentData = void 0,
	          timescale = void 0;
	      if (blob) {
	        var bif = parseBif(blob);
	        segmentData = bif.thumbs;
	        timescale = bif.timescale;

	        // var firstThumb = blob[0];
	        // var lastThumb  = blob[blob.length - 1];

	        // currentSegment = {
	        //   ts: firstThumb.ts,
	        //   d:  lastThumb.ts
	        // };
	      }

	      return Observable.of({
	        segmentData: segmentData,
	        currentSegment: currentSegment,
	        timescale: timescale
	      });
	    }
	  };

	  return {
	    directFile: false,
	    manifest: manifestPipeline,
	    audio: segmentPipeline,
	    video: segmentPipeline,
	    text: textTrackPipeline,
	    image: imageTrackPipeline
	  };
	};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);

	var _require = __webpack_require__(14),
	    isIE = _require.isIE;

	var _require2 = __webpack_require__(18),
	    concat = _require2.concat,
	    strToBytes = _require2.strToBytes,
	    bytesToStr = _require2.bytesToStr,
	    hexToBytes = _require2.hexToBytes,
	    bytesToHex = _require2.bytesToHex,
	    be2toi = _require2.be2toi,
	    itobe2 = _require2.itobe2,
	    be4toi = _require2.be4toi,
	    itobe4 = _require2.itobe4,
	    be8toi = _require2.be8toi,
	    itobe8 = _require2.itobe8;

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
	      len = void 0;
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

	  var name = void 0,
	      size = void 0;
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
	    var name = void 0,
	        handlerName = void 0;

	    switch (type) {
	      case "video":
	        name = "vide";
	        handlerName = "VideoHandler";
	        break;
	      case "audio":
	        name = "soun";
	        handlerName = "SoundHandler";
	        break;
	      default:
	        name = "hint";
	        handlerName = "";
	        break;
	    }

	    return Atom("hdlr", concat(8, strToBytes(name), 12, strToBytes(handlerName), 1 // handler name is C-style string (0 terminated)
	    ));
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
	    var privateData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var keyIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	    systemId = systemId.replace(/-/g, "");

	    assert(systemId.length === 32, "wrong system id length");

	    var version = void 0;
	    var kidList = void 0;
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
	    var pairsCnt = void 0;
	    var pairsLen = void 0;
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
	  trun: function trun(oldtrun) {
	    var headersLast = oldtrun[11];
	    var hasDataOffset = headersLast & 0x01;
	    if (hasDataOffset) {
	      return oldtrun;
	    }

	    // If no dataoffset is present, we change the headers and add one
	    var trun = new Uint8Array(oldtrun.length + 4);
	    trun.set(itobe4(oldtrun.length + 4), 0);
	    trun.set(oldtrun.subarray(4, 16), 4); // name + (version + headers) + samplecount
	    trun[11] = trun[11] | 0x01; // add data offset header info
	    trun.set([0, 0, 0, 0], 16); // data offset
	    trun.set(oldtrun.subarray(16, oldtrun.length), 20);
	    return trun;
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
	  var val = void 0;
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
	      var d = void 0,
	          ts = void 0;
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

	    var _codecPrivateData$spl = codecPrivateData.split("00000001"),
	        spsHex = _codecPrivateData$spl[1],
	        ppsHex = _codecPrivateData$spl[2];

	    var sps = hexToBytes(spsHex);
	    var pps = hexToBytes(ppsHex);

	    // TODO NAL length is forced to 4
	    var avcc = atoms.avcc(sps, pps, nalLength);
	    var stsd = void 0;
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
	    var stsd = void 0;
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
	    var newtrun = atoms.trun(oldtrun);
	    var newtraf = atoms.traf(oldtfhd, newtfdt, newtrun, oldsenc, oldmfhd);
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

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);
	var bytes = __webpack_require__(18);

	var _require = __webpack_require__(21),
	    normalizeLang = _require.normalize;

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

	var profiles = {
	  audio: [["Bitrate", "bitrate", parseInt], ["AudioTag", "audiotag", parseInt], ["FourCC", "mimeType", MIME_TYPES], ["Channels", "channels", parseInt], ["SamplingRate", "samplingRate", parseInt], ["BitsPerSample", "bitsPerSample", parseInt], ["PacketSize", "packetSize", parseInt], ["CodecPrivateData", "codecPrivateData", String]],
	  video: [["Bitrate", "bitrate", parseInt], ["FourCC", "mimeType", MIME_TYPES], ["CodecPrivateData", "codecs", extractVideoCodecs], ["MaxWidth", "width", parseInt], ["MaxHeight", "height", parseInt], ["CodecPrivateData", "codecPrivateData", String]],
	  text: [["Bitrate", "bitrate", parseInt], ["FourCC", "mimeType", MIME_TYPES]]
	};

	function extractVideoCodecs(codecPrivateData) {
	  // we can extract codes only if fourCC is on of "H264", "X264", "DAVC", "AVC1"
	  var _ref = /00000001\d7([0-9a-fA-F]{6})/.exec(codecPrivateData) || [],
	      avcProfile = _ref[1];

	  return avcProfile ? "avc1." + avcProfile : "";
	}

	function extractAudioCodecs(fourCC, codecPrivateData) {
	  var mpProfile = void 0;
	  if (fourCC == "AACH") {
	    mpProfile = 5; // High Efficiency AAC Profile
	  } else {
	    if (codecPrivateData) {
	      mpProfile = (parseInt(codecPrivateData.substr(0, 2), 16) & 0xF8) >> 3;
	    } else {
	      mpProfile = 2; // AAC Main Low Complexity
	    }
	  }
	  return mpProfile ? "mp4a.40." + mpProfile : "";
	}

	function parseBoolean(val) {
	  if (typeof val == "boolean") {
	    return val;
	  } else if (typeof val == "string") {
	    return val.toUpperCase() === "TRUE";
	  } else {
	    return false;
	  }
	}

	function calcLastRef(adaptation) {
	  if (!adaptation) {
	    return Infinity;
	  }
	  var index = adaptation.index;
	  var _index$timeline = index.timeline[index.timeline.length - 1],
	      ts = _index$timeline.ts,
	      r = _index$timeline.r,
	      d = _index$timeline.d;

	  return (ts + (r + 1) * d) / index.timescale;
	}

	function getKeySystems(keyIdBytes) {
	  return [{
	    // Widevine
	    systemId: "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed",
	    privateData: bytes.concat([0x08, 0x01, 0x12, 0x10], keyIdBytes)
	  }];
	}

	function createSmoothStreamingParser() {
	  var parserOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


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
	    assert.equal(header.nodeName, "ProtectionHeader", "Protection should have ProtectionHeader child");
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
	      }].concat(keySystems(keyIdBytes))
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
	      var _prof$i = prof[i],
	          key = _prof$i[0],
	          name = _prof$i[1],
	          parse = _prof$i[2];

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
	    var name = root.getAttribute("Name");
	    var lang = normalizeLang(root.getAttribute("Language"));
	    var baseURL = root.getAttribute("Url");
	    var profile = profiles[type];

	    assert(profile, "unrecognized QualityLevel type " + type);

	    var representationCount = 0;

	    var _reduceChildren = reduceChildren(root, function (res, name, node) {
	      switch (name) {
	        case "QualityLevel":
	          var rep = parseQualityLevel(node, profile);

	          if (type == "audio") {
	            var fourCC = node.getAttribute("FourCC") || "";
	            rep.codecs = extractAudioCodecs(fourCC, rep.codecPrivateData);
	          }

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
	    }),
	        representations = _reduceChildren.representations,
	        index = _reduceChildren.index;

	    // we assume that all representations have the same
	    // codec and mimeType


	    assert(representations.length, "adaptation should have at least one representation");

	    // apply default codec if non-supported
	    representations.forEach(function (rep) {
	      return rep.codecs = rep.codecs || DEFAULT_CODECS[type];
	    });

	    // apply default mimetype if non-supported
	    representations.forEach(function (rep) {
	      return rep.mimeType = rep.mimeType || DEFAULT_MIME_TYPES[type];
	    });

	    // TODO(pierre): real ad-insert support
	    if (subType == "ADVT") {
	      return null;
	    }

	    return {
	      type: type,
	      index: index,
	      representations: representations,
	      name: name,
	      lang: lang,
	      baseURL: baseURL
	    };
	  }

	  function parseFromString(manifest) {
	    return parseFromDocument(new DOMParser().parseFromString(manifest, "application/xml"));
	  }

	  function parseFromDocument(doc) {
	    var root = doc.documentElement;
	    assert.equal(root.nodeName, "SmoothStreamingMedia", "document root should be SmoothStreamingMedia");
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
	    }),
	        protection = _reduceChildren2.protection,
	        adaptations = _reduceChildren2.adaptations;

	    adaptations.forEach(function (a) {
	      return a.smoothProtection = protection;
	    });

	    var suggestedPresentationDelay = void 0,
	        presentationLiveGap = void 0,
	        timeShiftBufferDepth = void 0,
	        availabilityStartTime = void 0;

	    var isLive = parseBoolean(root.getAttribute("IsLive"));
	    if (isLive) {
	      suggestedPresentationDelay = SUGGESTED_PERSENTATION_DELAY;
	      timeShiftBufferDepth = +root.getAttribute("DVRWindowLength") / timescale;
	      availabilityStartTime = REFERENCE_DATE_TIME;
	      var video = adaptations.filter(function (a) {
	        return a.type == "video";
	      })[0];
	      var audio = adaptations.filter(function (a) {
	        return a.type == "audio";
	      })[0];
	      var lastRef = Math.min(calcLastRef(video), calcLastRef(audio));
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

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

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

	var assert = __webpack_require__(3);
	var HTML_ENTITIES = /&#([0-9]+);/g;
	var BR = /<br>/gi;
	var STYLE = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i;
	var PARAG = /\s*<p class=([^>]+)>(.*)/i;
	var START = /<sync[^>]+?start="?([0-9]*)"?[^0-9]/i;

	// Really basic CSS parsers using regular-expressions.
	function rulesCss(str) {
	  var ruleRe = /\.(\S+)\s*{([^}]*)}/gi;
	  var langs = {};
	  var m = void 0;
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

	  var _smi$match = smi.match(STYLE),
	      css = _smi$match[1];

	  var up = void 0,
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
	      throw new Error("parse error (sync time attribute)");
	    }

	    var start = +tim[1];
	    if (isNaN(start)) {
	      throw new Error("parse error (sync time attribute NaN)");
	    }

	    appendSub(subs, str.split("\n"), start / 1000);
	  }

	  return subs;

	  function appendSub(subs, lines, start) {
	    var i = lines.length,
	        m = void 0;
	    while (--i >= 0) {
	      m = lines[i].match(PARAG);
	      if (!m) {
	        continue;
	      }

	      var _m = m,
	          kl = _m[1],
	          txt = _m[2];


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

/***/ }),
/* 154 */
/***/ (function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

	var rBr = /<br.*?>/gm;
	var rAbsTime = /^(([0-9]+):)?([0-9]+):([0-9]+)(\.([0-9]+))?$/;
	var rRelTime = /(([0-9]+)(\.[0-9]+)?)(ms|h|m|s)/;

	var MULTS = {
	  h: 3600,
	  m: 60,
	  s: 1,
	  ms: 0.001
	};

	function parseTTML(ttml, lang, offset) {
	  var doc = void 0;
	  if (typeof ttml == "string") {
	    doc = new DOMParser().parseFromString(ttml, "text/xml");
	  } else {
	    doc = ttml;
	  }

	  if (!(doc instanceof window.Document || doc instanceof window.HTMLElement)) {
	    throw new Error("ttml needs a Document to parse");
	  }

	  var node = doc.querySelector("tt");
	  if (!node) {
	    throw new Error("ttml could not find <tt> tag");
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
	  var sub = void 0;

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
	    throw new Error("ttml unsupported timestamp format");
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

	  var innerHTML = node.innerHTML;

	  // NOTE(compat): on IE xml nodes do not have an innerHTML property.
	  // we have to re-serialize and re-parse as text/html to access the
	  // <p>'s innerHTML
	  if (innerHTML === undefined || innerHTML === null) {
	    var serializedXML = new XMLSerializer().serializeToString(node);
	    innerHTML = new DOMParser().parseFromString(serializedXML, "text/html").body.firstChild.innerHTML;
	  }

	  // Trim left and right whitespace from text and convert non-explicit line breaks.
	  // Using deprecated escape all together with decodeURIComponent to convert unicode characters
	  innerHTML = window.escape(innerHTML.replace(rBr, "\r\n"));

	  // TODO(guillaume): find out if we have an encoding issue when
	  // receiving TTML files to explain the problem with the "à"
	  innerHTML = innerHTML.replace(/%C3%26nbsp%3B/gm, "%C3%A0");

	  return {
	    id: node.getAttribute("xml:id") || node.getAttribute("id"),
	    text: decodeURIComponent(innerHTML),
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

	  var match = void 0;

	  // Parse absolute times ISO 8601 format ([hh:]mm:ss[.mmm])
	  match = time.match(rAbsTime);
	  if (match) {
	    var _match = match,
	        h = _match[2],
	        m = _match[3],
	        s = _match[4],
	        ms = _match[6];

	    return parseInt(h || 0, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10) + parseFloat("0." + ms);
	  }

	  // Parse relative times (fraction followed by a unit metric d.ddu)
	  match = time.match(rRelTime);
	  if (match) {
	    var _match2 = match,
	        n = _match2[1],
	        metric = _match2[4];

	    return parseFloat(n) * MULTS[metric] + offset;
	  }

	  return null;
	}

	module.exports = { parseTTML: parseTTML };

/***/ }),
/* 155 */
/***/ (function(module, exports) {

	"use strict";

	var FUZZ_FACTOR = 0.3;

	function getFuzzedDelay(retryDelay) {
	  var fuzzingFactor = (Math.random() * 2 - 1) * FUZZ_FACTOR;
	  return retryDelay * (1.0 + fuzzingFactor);
	}

	function getBackedoffDelay(retryDelay) {
	  var retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1));
	}

	module.exports = {
	  getFuzzedDelay: getFuzzedDelay,
	  getBackedoffDelay: getBackedoffDelay
	};

/***/ }),
/* 156 */
/***/ (function(module, exports) {

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

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(20),
	    bufferedToRanges = _require.bufferedToRanges;

	var interval = void 0;
	var closeBtn = void 0;

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

	  var avrAudio = void 0,
	      avrVideo = void 0;
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
	    buffer: bufferedToRanges(player.video.buffered),
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
	    var infos = void 0;
	    try {
	      infos = getDebug(player);
	    } catch (e) {
	      return;
	    }

	    var _infos = infos,
	        video = _infos.video,
	        audio = _infos.audio,
	        manifest = _infos.manifest;


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

/***/ })
/******/ ])
});
;