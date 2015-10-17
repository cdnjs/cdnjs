/**
* @author Jason Dobry <jason.dobry@gmail.com>
* @file angular-data.js
* @version 0.10.0 - Homepage <http://angular-data.pseudobry.com/>
* @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>
* @license MIT <https://github.com/jmdobry/angular-data/blob/master/LICENSE>
*
* @overview Data store for Angular.js.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Modifications
// Copyright 2014 Jason Dobry
//
// Summary of modifications:
// Removed all code related to:
// - ArrayObserver
// - ArraySplice
// - PathObserver
// - CompoundObserver
// - Path
// - ObserverTransform
(function(global) {
	'use strict';

	function detectObjectObserve() {
		if (typeof Object.observe !== 'function' ||
			typeof Array.observe !== 'function') {
			return false;
		}

		var gotSplice = false;
		function callback(records) {
			if (records[0].type === 'splice' && records[1].type === 'splice')
				gotSplice = true;
		}

		var test = [0];
		Array.observe(test, callback);
		test[1] = 1;
		test.length = 0;
		Object.deliverChangeRecords(callback);
		return gotSplice;
	}

	var hasObserve = detectObjectObserve();

	var hasEval = false;
	try {
		var f = new Function('', 'return true;');
		hasEval = f();
	} catch (ex) {
	}

	function isObject(obj) {
		return obj === Object(obj);
	}

	var numberIsNaN = global.Number.isNaN || function isNaN(value) {
		return typeof value === 'number' && global.isNaN(value);
	}

	var createObject = ('__proto__' in {}) ?
		function(obj) { return obj; } :
		function(obj) {
			var proto = obj.__proto__;
			if (!proto)
				return obj;
			var newObject = Object.create(proto);
			Object.getOwnPropertyNames(obj).forEach(function(name) {
				Object.defineProperty(newObject, name,
					Object.getOwnPropertyDescriptor(obj, name));
			});
			return newObject;
		};

	var MAX_DIRTY_CHECK_CYCLES = 1000;

	function dirtyCheck(observer) {
		var cycles = 0;
		while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check()) {
			observer.report();
			cycles++;
		}
	}

	function objectIsEmpty(object) {
		for (var prop in object)
			return false;
		return true;
	}

	function diffIsEmpty(diff) {
		return objectIsEmpty(diff.added) &&
			objectIsEmpty(diff.removed) &&
			objectIsEmpty(diff.changed);
	}

	function diffObjectFromOldObject(object, oldObject) {
		var added = {};
		var removed = {};
		var changed = {};
		var oldObjectHas = {};

		for (var prop in oldObject) {
			var newValue = object[prop];

			if (newValue !== undefined && newValue === oldObject[prop])
				continue;

			if (!(prop in object)) {
				removed[prop] = undefined;
				continue;
			}

			if (newValue !== oldObject[prop])
				changed[prop] = newValue;
		}

		for (var prop in object) {
			if (prop in oldObject)
				continue;

			added[prop] = object[prop];
		}

		if (Array.isArray(object) && object.length !== oldObject.length)
			changed.length = object.length;

		return {
			added: added,
			removed: removed,
			changed: changed
		};
	}

	function copyObject(object, opt_copy) {
		var copy = opt_copy || (Array.isArray(object) ? [] : {});
		for (var prop in object) {
			copy[prop] = object[prop];
		};
		if (Array.isArray(object))
			copy.length = object.length;
		return copy;
	}

	function Observer(object, callback, target, token) {
		this.closed = false;
		this.object = object;
		this.callback = callback;
		// TODO(rafaelw): Hold this.target weakly when WeakRef is available.
		this.target = target;
		this.token = token;
		this.reporting = true;
		if (hasObserve) {
			var self = this;
			this.boundInternalCallback = function(records) {
				self.internalCallback(records);
			};
		}

		addToAll(this);
		this.connect();
		this.sync(true);
	}

	Observer.prototype = {
		internalCallback: function(records) {
			if (this.closed)
				return;
			if (this.reporting && this.check(records)) {
				this.report();
				if (this.testingResults)
					this.testingResults.anyChanged = true;
			}
		},

		close: function() {
			if (this.closed)
				return;
			if (this.object && typeof this.object.unobserved === 'function')
				this.object.unobserved();

			this.disconnect();
			this.object = undefined;
			this.closed = true;
		},

		deliver: function(testingResults) {
			if (this.closed)
				return;
			if (hasObserve) {
				this.testingResults = testingResults;
				Object.deliverChangeRecords(this.boundInternalCallback);
				this.testingResults = undefined;
			} else {
				dirtyCheck(this);
			}
		},

		report: function() {
			if (!this.reporting)
				return;

			this.sync(false);
			this.reportArgs.push(this.token);
			this.invokeCallback(this.reportArgs);
			this.reportArgs = undefined;
		},

		invokeCallback: function(args) {
			try {
				this.callback.apply(this.target, args);
			} catch (ex) {
				Observer._errorThrownDuringCallback = true;
				console.error('Exception caught during observer callback: ' + ex);
			}
		},

		reset: function() {
			if (this.closed)
				return;

			if (hasObserve) {
				this.reporting = false;
				Object.deliverChangeRecords(this.boundInternalCallback);
				this.reporting = true;
			}

			this.sync(true);
		}
	}

	var collectObservers = !hasObserve || global.forceCollectObservers;
	var allObservers;
	Observer._allObserversCount = 0;

	if (collectObservers) {
		allObservers = [];
	}

	function addToAll(observer) {
		if (!collectObservers)
			return;

		allObservers.push(observer);
		Observer._allObserversCount++;
	}

	var runningMicrotaskCheckpoint = false;

	var hasDebugForceFullDelivery = typeof Object.deliverAllChangeRecords == 'function';

	global.Platform = global.Platform || {};

	global.Platform.performMicrotaskCheckpoint = function() {
		if (runningMicrotaskCheckpoint)
			return;

		if (hasDebugForceFullDelivery) {
			Object.deliverAllChangeRecords();
			return;
		}

		if (!collectObservers)
			return;

		runningMicrotaskCheckpoint = true;

		var cycles = 0;
		var results = {};

		do {
			cycles++;
			var toCheck = allObservers;
			allObservers = [];
			results.anyChanged = false;

			for (var i = 0; i < toCheck.length; i++) {
				var observer = toCheck[i];
				if (observer.closed)
					continue;

				if (hasObserve) {
					observer.deliver(results);
				} else if (observer.check()) {
					results.anyChanged = true;
					observer.report();
				}

				allObservers.push(observer);
			}
		} while (cycles < MAX_DIRTY_CHECK_CYCLES && results.anyChanged);

		Observer._allObserversCount = allObservers.length;
		runningMicrotaskCheckpoint = false;
	};

	if (collectObservers) {
		global.Platform.clearObservers = function() {
			allObservers = [];
		};
	}

	function ObjectObserver(object, callback, target, token) {
		Observer.call(this, object, callback, target, token);
	}

	ObjectObserver.prototype = createObject({
		__proto__: Observer.prototype,

		connect: function() {
			if (hasObserve)
				Object.observe(this.object, this.boundInternalCallback);
		},

		sync: function(hard) {
			if (!hasObserve)
				this.oldObject = copyObject(this.object);
		},

		check: function(changeRecords) {
			var diff;
			var oldValues;
			if (hasObserve) {
				if (!changeRecords)
					return false;

				oldValues = {};
				diff = diffObjectFromChangeRecords(this.object, changeRecords,
					oldValues);
			} else {
				oldValues = this.oldObject;
				diff = diffObjectFromOldObject(this.object, this.oldObject);
			}

			if (diffIsEmpty(diff))
				return false;

			this.reportArgs =
				[diff.added || {}, diff.removed || {}, diff.changed || {}];
			this.reportArgs.push(function(property) {
				return oldValues[property];
			});

			return true;
		},

		disconnect: function() {
			if (!hasObserve)
				this.oldObject = undefined;
			else if (this.object)
				Object.unobserve(this.object, this.boundInternalCallback);
		}
	});

	function ObservedSet(callback) {
		this.arr = [];
		this.callback = callback;
		this.isObserved = true;
	}

	var objProto = Object.getPrototypeOf({});
	var arrayProto = Object.getPrototypeOf([]);
	ObservedSet.prototype = {
		reset: function() {
			this.isObserved = !this.isObserved;
		},

		observe: function(obj) {
			if (!isObject(obj) || obj === objProto || obj === arrayProto)
				return;
			var i = this.arr.indexOf(obj);
			if (i >= 0 && this.arr[i+1] === this.isObserved)
				return;

			if (i < 0) {
				i = this.arr.length;
				this.arr[i] = obj;
				Object.observe(obj, this.callback);
			}

			this.arr[i+1] = this.isObserved;
			this.observe(Object.getPrototypeOf(obj));
		},

		cleanup: function() {
			var i = 0, j = 0;
			var isObserved = this.isObserved;
			while(j < this.arr.length) {
				var obj = this.arr[j];
				if (this.arr[j + 1] == isObserved) {
					if (i < j) {
						this.arr[i] = obj;
						this.arr[i + 1] = isObserved;
					}
					i += 2;
				} else {
					Object.unobserve(obj, this.callback);
				}
				j += 2;
			}

			this.arr.length = i;
		}
	};

	var knownRecordTypes = {
		'new': true,
		'updated': true,
		'deleted': true
	};

	function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
		var added = {};
		var removed = {};

		for (var i = 0; i < changeRecords.length; i++) {
			var record = changeRecords[i];
			if (!knownRecordTypes[record.type]) {
				console.error('Unknown changeRecord type: ' + record.type);
				console.error(record);
				continue;
			}

			if (!(record.name in oldValues))
				oldValues[record.name] = record.oldValue;

			if (record.type == 'updated')
				continue;

			if (record.type == 'new') {
				if (record.name in removed)
					delete removed[record.name];
				else
					added[record.name] = true;

				continue;
			}

			// type = 'deleted'
			if (record.name in added) {
				delete added[record.name];
				delete oldValues[record.name];
			} else {
				removed[record.name] = true;
			}
		}

		for (var prop in added)
			added[prop] = object[prop];

		for (var prop in removed)
			removed[prop] = undefined;

		var changed = {};
		for (var prop in oldValues) {
			if (prop in added || prop in removed)
				continue;

			var newValue = object[prop];
			if (oldValues[prop] !== newValue)
				changed[prop] = newValue;
		}

		return {
			added: added,
			removed: removed,
			changed: changed
		};
	}

	global.Observer = Observer;
	global.Observer.hasObjectObserve = hasObserve;
	global.ObjectObserver = ObjectObserver;
})((exports.Number = { isNaN: window.isNaN }) ? exports : exports);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * If array contains values.
     */
    function contains(arr, val) {
        return indexOf(arr, val) !== -1;
    }
    module.exports = contains;


},{"./indexOf":5}],3:[function(require,module,exports){
var makeIterator = require('../function/makeIterator_');

    /**
     * Array filter
     */
    function filter(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var results = [];
        if (arr == null) {
            return results;
        }

        var i = -1, len = arr.length, value;
        while (++i < len) {
            value = arr[i];
            if (callback(value, i, arr)) {
                results.push(value);
            }
        }

        return results;
    }

    module.exports = filter;



},{"../function/makeIterator_":11}],4:[function(require,module,exports){


    /**
     * Array forEach
     */
    function forEach(arr, callback, thisObj) {
        if (arr == null) {
            return;
        }
        var i = -1,
            len = arr.length;
        while (++i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if ( callback.call(thisObj, arr[i], i, arr) === false ) {
                break;
            }
        }
    }

    module.exports = forEach;



},{}],5:[function(require,module,exports){


    /**
     * Array.indexOf
     */
    function indexOf(arr, item, fromIndex) {
        fromIndex = fromIndex || 0;
        if (arr == null) {
            return -1;
        }

        var len = arr.length,
            i = fromIndex < 0 ? len + fromIndex : fromIndex;
        while (i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if (arr[i] === item) {
                return i;
            }

            i++;
        }

        return -1;
    }

    module.exports = indexOf;


},{}],6:[function(require,module,exports){
var filter = require('./filter');

    function isValidString(val) {
        return (val != null && val !== '');
    }

    /**
     * Joins strings with the specified separator inserted between each value.
     * Null values and empty strings will be excluded.
     */
    function join(items, separator) {
        separator = separator || '';
        return filter(items, isValidString).join(separator);
    }

    module.exports = join;


},{"./filter":3}],7:[function(require,module,exports){


    /**
     * Create slice of source array or array-like object
     */
    function slice(arr, start, end){
        var len = arr.length;

        if (start == null) {
            start = 0;
        } else if (start < 0) {
            start = Math.max(len + start, 0);
        } else {
            start = Math.min(start, len);
        }

        if (end == null) {
            end = len;
        } else if (end < 0) {
            end = Math.max(len + end, 0);
        } else {
            end = Math.min(end, len);
        }

        var result = [];
        while (start < end) {
            result.push(arr[start++]);
        }

        return result;
    }

    module.exports = slice;



},{}],8:[function(require,module,exports){


    /**
     * Merge sort (http://en.wikipedia.org/wiki/Merge_sort)
     */
    function mergeSort(arr, compareFn) {
        if (arr == null) {
            return [];
        } else if (arr.length < 2) {
            return arr;
        }

        if (compareFn == null) {
            compareFn = defaultCompare;
        }

        var mid, left, right;

        mid   = ~~(arr.length / 2);
        left  = mergeSort( arr.slice(0, mid), compareFn );
        right = mergeSort( arr.slice(mid, arr.length), compareFn );

        return merge(left, right, compareFn);
    }

    function defaultCompare(a, b) {
        return a < b ? -1 : (a > b? 1 : 0);
    }

    function merge(left, right, compareFn) {
        var result = [];

        while (left.length && right.length) {
            if (compareFn(left[0], right[0]) <= 0) {
                // if 0 it should preserve same order (stable)
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }

        if (left.length) {
            result.push.apply(result, left);
        }

        if (right.length) {
            result.push.apply(result, right);
        }

        return result;
    }

    module.exports = mergeSort;



},{}],9:[function(require,module,exports){
var isFunction = require('../lang/isFunction');

    /**
     * Creates an object that holds a lookup for the objects in the array.
     */
    function toLookup(arr, key) {
        var result = {};
        if (arr == null) {
            return result;
        }

        var i = -1, len = arr.length, value;
        if (isFunction(key)) {
            while (++i < len) {
                value = arr[i];
                result[key(value)] = value;
            }
        } else {
            while (++i < len) {
                value = arr[i];
                result[value[key]] = value;
            }
        }

        return result;
    }
    module.exports = toLookup;


},{"../lang/isFunction":16}],10:[function(require,module,exports){


    /**
     * Returns the first argument provided to it.
     */
    function identity(val){
        return val;
    }

    module.exports = identity;



},{}],11:[function(require,module,exports){
var identity = require('./identity');
var prop = require('./prop');
var deepMatches = require('../object/deepMatches');

    /**
     * Converts argument into a valid iterator.
     * Used internally on most array/object/collection methods that receives a
     * callback/iterator providing a shortcut syntax.
     */
    function makeIterator(src, thisObj){
        if (src == null) {
            return identity;
        }
        switch(typeof src) {
            case 'function':
                // function is the first to improve perf (most common case)
                // also avoid using `Function#call` if not needed, which boosts
                // perf a lot in some cases
                return (typeof thisObj !== 'undefined')? function(val, i, arr){
                    return src.call(thisObj, val, i, arr);
                } : src;
            case 'object':
                return function(val){
                    return deepMatches(val, src);
                };
            case 'string':
            case 'number':
                return prop(src);
        }
    }

    module.exports = makeIterator;



},{"../object/deepMatches":21,"./identity":10,"./prop":12}],12:[function(require,module,exports){


    /**
     * Returns a function that gets a property of the passed object
     */
    function prop(name){
        return function(obj){
            return obj[name];
        };
    }

    module.exports = prop;



},{}],13:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":17}],14:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isBoolean(val) {
        return isKind(val, 'Boolean');
    }
    module.exports = isBoolean;


},{"./isKind":17}],15:[function(require,module,exports){
var forOwn = require('../object/forOwn');
var isArray = require('./isArray');

    function isEmpty(val){
        if (val == null) {
            // typeof null == 'object' so we check it first
            return false;
        } else if ( typeof val === 'string' || isArray(val) ) {
            return !val.length;
        } else if ( typeof val === 'object' || typeof val === 'function' ) {
            var result = true;
            forOwn(val, function(){
                result = false;
                return false; // break loop
            });
            return result;
        } else {
            return false;
        }
    }

    module.exports = isEmpty;



},{"../object/forOwn":24,"./isArray":13}],16:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isFunction(val) {
        return isKind(val, 'Function');
    }
    module.exports = isFunction;


},{"./isKind":17}],17:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":19}],18:[function(require,module,exports){


    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value && typeof value === 'object' &&
            value.constructor === Object);
    }

    module.exports = isPlainObject;



},{}],19:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],20:[function(require,module,exports){


    /**
     * Typecast a value to a String, using an empty string value for null or
     * undefined.
     */
    function toString(val){
        return val == null ? '' : val.toString();
    }

    module.exports = toString;



},{}],21:[function(require,module,exports){
var forOwn = require('./forOwn');
var isArray = require('../lang/isArray');

    function containsMatch(array, pattern) {
        var i = -1, length = array.length;
        while (++i < length) {
            if (deepMatches(array[i], pattern)) {
                return true;
            }
        }

        return false;
    }

    function matchArray(target, pattern) {
        var i = -1, patternLength = pattern.length;
        while (++i < patternLength) {
            if (!containsMatch(target, pattern[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObject(target, pattern) {
        var result = true;
        forOwn(pattern, function(val, key) {
            if (!deepMatches(target[key], val)) {
                // Return false to break out of forOwn early
                return (result = false);
            }
        });

        return result;
    }

    /**
     * Recursively check if the objects match.
     */
    function deepMatches(target, pattern){
        if (target && typeof target === 'object') {
            if (isArray(target) && isArray(pattern)) {
                return matchArray(target, pattern);
            } else {
                return matchObject(target, pattern);
            }
        } else {
            return target === pattern;
        }
    }

    module.exports = deepMatches;



},{"../lang/isArray":13,"./forOwn":24}],22:[function(require,module,exports){
var forOwn = require('./forOwn');
var isPlainObject = require('../lang/isPlainObject');

    /**
     * Mixes objects into the target object, recursively mixing existing child
     * objects.
     */
    function deepMixIn(target, objects) {
        var i = 0,
            n = arguments.length,
            obj;

        while(++i < n){
            obj = arguments[i];
            if (obj) {
                forOwn(obj, copyProp, target);
            }
        }

        return target;
    }

    function copyProp(val, key) {
        var existing = this[key];
        if (isPlainObject(val) && isPlainObject(existing)) {
            deepMixIn(existing, val);
        } else {
            this[key] = val;
        }
    }

    module.exports = deepMixIn;



},{"../lang/isPlainObject":18,"./forOwn":24}],23:[function(require,module,exports){
var hasOwn = require('./hasOwn');

    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }


        if (_hasDontEnumBug) {
            var ctor = obj.constructor,
                isProto = !!ctor && obj === ctor.prototype;

            while (key = _dontEnums[i++]) {
                // For constructor, if it is a prototype object the constructor
                // is always non-enumerable unless defined otherwise (and
                // enumerated above).  For non-prototype objects, it will have
                // to be defined on this object, since it cannot be defined on
                // any prototype objects.
                //
                // For other [[DontEnum]] properties, check if the value is
                // different than Object prototype value.
                if (
                    (key !== 'constructor' ||
                        (!isProto && hasOwn(obj, key))) &&
                    obj[key] !== Object.prototype[key]
                ) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    module.exports = forIn;



},{"./hasOwn":25}],24:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    module.exports = forOwn;



},{"./forIn":23,"./hasOwn":25}],25:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],26:[function(require,module,exports){
var forEach = require('../array/forEach');

    /**
     * Create nested object if non-existent
     */
    function namespace(obj, path){
        if (!path) return obj;
        forEach(path.split('.'), function(key){
            if (!obj[key]) {
                obj[key] = {};
            }
            obj = obj[key];
        });
        return obj;
    }

    module.exports = namespace;



},{"../array/forEach":4}],27:[function(require,module,exports){
var slice = require('../array/slice');

    /**
     * Return a copy of the object, filtered to only have values for the whitelisted keys.
     */
    function pick(obj, var_keys){
        var keys = typeof arguments[1] !== 'string'? arguments[1] : slice(arguments, 1),
            out = {},
            i = 0, key;
        while (key = keys[i++]) {
            out[key] = obj[key];
        }
        return out;
    }

    module.exports = pick;



},{"../array/slice":7}],28:[function(require,module,exports){
var namespace = require('./namespace');

    /**
     * set "nested" object property
     */
    function set(obj, prop, val){
        var parts = (/^(.+)\.(.+)$/).exec(prop);
        if (parts){
            namespace(obj, parts[1])[parts[2]] = val;
        } else {
            obj[prop] = val;
        }
    }

    module.exports = set;



},{"./namespace":26}],29:[function(require,module,exports){
var join = require('../array/join');
var slice = require('../array/slice');

    /**
     * Group arguments as path segments, if any of the args is `null` or an
     * empty string it will be ignored from resulting path.
     */
    function makePath(var_args){
        var result = join(slice(arguments), '/');
        // need to disconsider duplicate '/' after protocol (eg: 'http://')
        return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
    }

    module.exports = makePath;


},{"../array/join":6,"../array/slice":7}],30:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toUpperCase()
     */
    function upperCase(str){
        str = toString(str);
        return str.toUpperCase();
    }
    module.exports = upperCase;


},{"../lang/toString":20}],31:[function(require,module,exports){
/**
 * @doc function
 * @id DSHttpAdapterProvider
 * @name DSHttpAdapterProvider
 */
function DSHttpAdapterProvider() {

  /**
   * @doc property
   * @id DSHttpAdapterProvider.properties:defaults
   * @name defaults
   * @description
   * Default configuration for this adapter.
   *
   * Properties:
   *
   * - `{function}` - `queryTransform` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
   */
  var defaults = this.defaults = {
    /**
     * @doc property
     * @id DSHttpAdapterProvider.properties:defaults.queryTransform
     * @name defaults.queryTransform
     * @description
     * Transform the angular-data query to something your server understands. You might just do this on the server instead.
     *
     * @param {string} resourceName The name of the resource.
     * @param {object} params Params sent through from `$http()`.
     * @returns {*} Returns `params` as-is.
     */
    queryTransform: function (resourceName, params) {
      return params;
    }
  };

  this.$get = ['$http', '$log', 'DSUtils', function ($http, $log, DSUtils) {

    /**
     * @doc interface
     * @id DSHttpAdapter
     * @name DSHttpAdapter
     * @description
     * Default adapter used by angular-data. This adapter uses AJAX and JSON to send/retrieve data to/from a server.
     * Developers may provide custom adapters that implement the adapter interface.
     */
    return {
      /**
       * @doc property
       * @id DSHttpAdapter.properties:defaults
       * @name defaults
       * @description
       * Reference to [DSHttpAdapterProvider.defaults](/documentation/api/api/DSHttpAdapterProvider.properties:defaults).
       */
      defaults: defaults,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:HTTP
       * @name HTTP
       * @description
       * Wrapper for `$http()`.
       *
       * ## Signature:
       * ```js
       * DS.HTTP(config)
       * ```
       *
       * ## Example:
       *
       * ```js
       * works the same as $http()
       * ```
       *
       * @param {object} config Configuration for the request.
       * @returns {Promise} Promise produced by the `$q` service.
       */
      HTTP: HTTP,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:GET
       * @name GET
       * @description
       * Wrapper for `$http.get()`.
       *
       * ## Signature:
       * ```js
       * DS.GET(url[, config])
       * ```
       *
       * ## Example:
       *
       * ```js
       * Works the same as $http.get()
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} config Configuration for the request.
       * @returns {Promise} Promise produced by the `$q` service.
       */
      GET: GET,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:POST
       * @name POST
       * @description
       * Wrapper for `$http.post()`.
       *
       * ## Signature:
       * ```js
       * DS.POST(url[, attrs][, config])
       * ```
       *
       * ## Example:
       *
       * ```js
       * Works the same as $http.post()
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} attrs Request payload.
       * @param {object=} config Configuration for the request.
       * @returns {Promise} Promise produced by the `$q` service.
       */
      POST: POST,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:PUT
       * @name PUT
       * @description
       * Wrapper for `$http.put()`.
       *
       * ## Signature:
       * ```js
       * DS.PUT(url[, attrs][, config])
       * ```
       *
       * ## Example:
       *
       * ```js
       * Works the same as $http.put()
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object=} attrs Request payload.
       * @param {object=} config Configuration for the request.
       * @returns {Promise} Promise produced by the `$q` service.
       */
      PUT: PUT,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:DEL
       * @name DEL
       * @description
       * Wrapper for `$http.delete()`.
       *
       * ## Signature:
       * ```js
       * DS.DEL(url[, config])
       * ```
       *
       * ## Example:
       *
       * ```js
       * Works the same as $http.delete
       * ```
       *
       * @param {string} url The url of the request.
       * @param {object} config Configuration for the request.
       * @returns {Promise} Promise produced by the `$q` service.
       */
      DEL: DEL,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:find
       * @name find
       * @description
       * Retrieve a single entity from the server.
       *
       * Sends a `GET` request to `:baseUrl/:endpoint/:id`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {string|number} id The primary key of the entity to retrieve.
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.get`.
       * @returns {Promise} Promise.
       */
      find: find,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:findAll
       * @name findAll
       * @description
       * Retrieve a collection of entities from the server.
       *
       * Sends a `GET` request to `:baseUrl/:endpoint`.
       *
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.get`.
       * @returns {Promise} Promise.
       */
      findAll: findAll,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:findAll
       * @name find
       * @description
       * Create a new entity on the server.
       *
       * Sends a `POST` request to `:baseUrl/:endpoint`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.post`.
       * @returns {Promise} Promise.
       */
      create: create,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:update
       * @name update
       * @description
       * Update an entity on the server.
       *
       * Sends a `PUT` request to `:baseUrl/:endpoint/:id`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {string|number} id The primary key of the entity to update.
       * @param {object} attrs The attributes with which to update the entity. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.put`.
       * @returns {Promise} Promise.
       */
      update: update,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:updateAll
       * @name updateAll
       * @description
       * Update a collection of entities on the server.
       *
       * Sends a `PUT` request to `:baseUrl/:endpoint`.
       *
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.put`.
       * @returns {Promise} Promise.
       */
      updateAll: updateAll,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:destroy
       * @name destroy
       * @description
       * destroy an entity on the server.
       *
       * Sends a `PUT` request to `:baseUrl/:endpoint/:id`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {string|number} id The primary key of the entity to destroy.
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.delete`.
       * @returns {Promise} Promise.
       */
      destroy: destroy,

      /**
       * @doc method
       * @id DSHttpAdapter.methods:destroyAll
       * @name destroyAll
       * @description
       * Retrieve a collection of entities from the server.
       *
       * Sends a `DELETE` request to `:baseUrl/:endpoint`.
       *
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {object=} params Search query parameters. See the [query guide](/documentation/guide/queries/index).
       * @param {object=} options Optional configuration. Refer to the documentation for `$http.delete`.
       * @returns {Promise} Promise.
       */
      destroyAll: destroyAll
    };

    function HTTP(config) {
      var start = new Date().getTime();

      return $http(config).then(function (data) {
        $log.debug(data.config.method + ' request:' + data.config.url + ' Time taken: ' + (new Date().getTime() - start) + 'ms', arguments);
        return data;
      });
    }

    function GET(url, config) {
      config = config || {};
      return HTTP(DSUtils.deepMixIn(config, {
        url: url,
        method: 'GET'
      }));
    }

    function POST(url, attrs, config) {
      config = config || {};
      return HTTP(DSUtils.deepMixIn(config, {
        url: url,
        data: attrs,
        method: 'POST'
      }));
    }

    function PUT(url, attrs, config) {
      config = config || {};
      return HTTP(DSUtils.deepMixIn(config, {
        url: url,
        data: attrs,
        method: 'PUT'
      }));
    }

    function DEL(url, config) {
      config = config || {};
      return this.HTTP(DSUtils.deepMixIn(config, {
        url: url,
        method: 'DELETE'
      }));
    }

    function create(resourceConfig, attrs, options) {
      options = options || {};
      return this.POST(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint),
        attrs,
        options
      );
    }

    function destroy(resourceConfig, id, options) {
      options = options || {};
      return this.DEL(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
        options
      );
    }

    function destroyAll(resourceConfig, params, options) {
      options = options || {};
      options.params = options.params || {};
      if (params) {
        params = defaults.queryTransform(resourceConfig.name, params);
        DSUtils.deepMixIn(options.params, params);
      }
      return this.DEL(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint),
        options
      );
    }

    function find(resourceConfig, id, options) {
      options = options || {};
      return this.GET(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
        options
      );
    }

    function findAll(resourceConfig, params, options) {
      options = options || {};
      options.params = options.params || {};
      if (params) {
        params = defaults.queryTransform(resourceConfig.name, params);
        DSUtils.deepMixIn(options.params, params);
      }
      return this.GET(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint),
        options
      );
    }

    function update(resourceConfig, id, attrs, options) {
      options = options || {};
      return this.PUT(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
        attrs,
        options
      );
    }

    function updateAll(resourceConfig, attrs, params, options) {
      options = options || {};
      options.params = options.params || {};
      if (params) {
        params = defaults.queryTransform(resourceConfig.name, params);
        DSUtils.deepMixIn(options.params, params);
      }
      return this.PUT(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint),
        attrs,
        options
      );
    }
  }];
}

module.exports = DSHttpAdapterProvider;

},{}],32:[function(require,module,exports){
/**
 * @doc function
 * @id DSLocalStorageProvider
 * @name DSLocalStorageProvider
 */
function DSLocalStorageProvider() {

  this.$get = ['$q', 'DSUtils', function ($q, DSUtils) {

    /**
     * @doc interface
     * @id DSLocalStorage
     * @name DSLocalStorage
     * @description
     * Default adapter used by angular-data. This adapter uses AJAX and JSON to send/retrieve data to/from a server.
     * Developers may provide custom adapters that implement the adapter interface.
     */
    return {
      /**
       * @doc method
       * @id DSLocalStorage.methods:find
       * @name find
       * @description
       * Retrieve a single entity from localStorage.
       *
       * Calls `localStorage.getItem(key)`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `namespace` - Namespace path for the resource.
       * @param {string|number} id The primary key of the entity to retrieve.
       * @returns {Promise} Promise.
       */
      find: find,

      /**
       * @doc method
       * @id DSLocalStorage.methods:findAll
       * @name findAll
       * @description
       * Not supported.
       */
      findAll: function () {
        throw new Error('Not supported!');
      },

      /**
       * @doc method
       * @id DSLocalStorage.methods:findAll
       * @name find
       * @description
       * Not supported.
       */
      create: function () {
        throw new Error('Not supported!');
      },

      /**
       * @doc method
       * @id DSLocalStorage.methods:update
       * @name update
       * @description
       * Update an entity in localStorage.
       *
       * Calls `localStorage.setItem(key, value)`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `namespace` - Namespace path for the resource.
       * @param {string|number} id The primary key of the entity to update.
       * @param {object} attrs The attributes with which to update the entity.
       * @returns {Promise} Promise.
       */
      update: update,

      /**
       * @doc method
       * @id DSLocalStorage.methods:updateAll
       * @name updateAll
       * @description
       * Not supported.
       */
      updateAll: function () {
        throw new Error('Not supported!');
      },

      /**
       * @doc method
       * @id DSLocalStorage.methods:destroy
       * @name destroy
       * @description
       * Destroy an entity from localStorage.
       *
       * Calls `localStorage.removeItem(key)`.
       *
       * @param {object} resourceConfig Properties:
       * - `{string}` - `baseUrl` - Base url.
       * - `{string=}` - `endpoint` - Endpoint path for the resource.
       * @param {string|number} id The primary key of the entity to destroy.
       * @returns {Promise} Promise.
       */
      destroy: destroy,

      /**
       * @doc method
       * @id DSLocalStorage.methods:destroyAll
       * @name destroyAll
       * @description
       * Not supported.
       */
      destroyAll: function () {
        throw new Error('Not supported!');
      }
    };

    function GET(key) {
      var deferred = $q.defer();
      try {
        var item = localStorage.getItem(key);
        deferred.resolve(item ? angular.fromJson(item) : undefined);
      } catch (err) {
        deferred.reject(err);
      }
      return deferred.promise;
    }

    function PUT(key, value) {
      var deferred = $q.defer();
      try {
        var item = localStorage.getItem(key);
        if (item) {
          item = angular.fromJson(item);
          DSUtils.deepMixIn(item, value);
          deferred.resolve(localStorage.setItem(key, angular.toJson(item)));
        } else {
          deferred.resolve(localStorage.setItem(key, angular.toJson(value)));
        }
      } catch (err) {
        deferred.reject(err);
      }
      return deferred.promise;
    }

    function DEL(key) {
      var deferred = $q.defer();
      try {
        deferred.resolve(localStorage.removeItem(key));
      } catch (err) {
        deferred.reject(err);
      }
      return deferred.promise;
    }

    function destroy(resourceConfig, id, options) {
      options = options || {};
      return DEL(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
        options
      );
    }

    function find(resourceConfig, id, options) {
      options = options || {};
      return GET(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
        options
      );
    }

    function update(resourceConfig, id, attrs, options) {
      options = options || {};
      return PUT(
        DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id),
        attrs,
        options
      ).then(function () {
          return GET(DSUtils.makePath(options.baseUrl || resourceConfig.baseUrl, resourceConfig.endpoint, id));
        });
    }
  }];
}

module.exports = DSLocalStorageProvider;

},{}],33:[function(require,module,exports){
var errorPrefix = 'DS.create(resourceName, attrs[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:create
 * @name create
 * @description
 * Create a new resource and save it to the server.
 *
 * ## Signature:
 * ```js
 * DS.create(resourceName, attrs[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.create('document', { author: 'John Anderson' })
 *  .then(function (document) {
 *      document; // { id: 'aab7ff66-e21e-46e2-8be8-264d82aee535', author: 'John Anderson' }
 *
 *      // The new document is already in the data store
 *      DS.get('document', document.id); // { id: 'aab7ff66-e21e-46e2-8be8-264d82aee535', author: 'John Anderson' }
 *  }, function (err) {
 *      // handle error
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} attrs The attributes with which to update the item of the type specified by `resourceName` that has
 * the primary key specified by `id`.
 * @param {object=} options Configuration options. Properties:
 *
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the server into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the newly created item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function create(resourceName, attrs, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isObject(attrs)) {
      throw new this.errors.IA(errorPrefix + 'attrs: Must be an object!');
    }
    var definition = this.definitions[resourceName];
    var resource = this.store[resourceName];
    var _this = this;

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    promise = promise
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.validate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.afterValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeCreate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.adapters[options.adapter || definition.defaultAdapter].create(definition, definition.serialize(resourceName, attrs), options);
      })
      .then(function (res) {
        return _this.$q.promisify(definition.afterCreate)(resourceName, definition.deserialize(resourceName, res));
      })
      .then(function (data) {
        if (options.cacheResponse) {
          var created = _this.inject(definition.name, data);
          var id = created[definition.idAttribute];
          resource.previousAttributes[id] = _this.utils.deepMixIn({}, created);
          resource.saved[id] = _this.utils.updateTimestamp(resource.saved[id]);
          return _this.get(definition.name, id);
        } else {
          return data;
        }
      });

    deferred.resolve(attrs);
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = create;

},{}],34:[function(require,module,exports){
var errorPrefix = 'DS.destroy(resourceName, id): ';

/**
 * @doc method
 * @id DS.async_methods:destroy
 * @name destroy
 * @description
 * Delete the item of the type specified by `resourceName` with the primary key specified by `id` from the data store
 * and the server.
 *
 * ## Signature:
 * ```js
 * DS.destroy(resourceName, id);
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.destroy('document', 'aab7ff66-e21e-46e2-8be8-264d82aee535')
 *  .then(function (id) {
 *      id; // 'aab7ff66-e21e-46e2-8be8-264d82aee535'
 *
 *      // The document is gone
 *      DS.get('document', 'aab7ff66-e21e-46e2-8be8-264d82aee535'); // undefined
 *  }, function (err) {
 *      // Handle error
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to remove.
 * @param {object=} options Configuration options.
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{string|number}` - `id` - The primary key of the destroyed item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{NonexistentResourceError}`
 */
function destroy(resourceName, id, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
      throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
    }

    var item = this.get(resourceName, id);
    if (!item) {
      throw new this.errors.R(errorPrefix + 'id: "' + id + '" not found!');
    }

    var definition = this.definitions[resourceName];
    var _this = this;

    promise = promise
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeDestroy)(resourceName, attrs);
      })
      .then(function () {
        return _this.adapters[options.adapter || definition.defaultAdapter].destroy(definition, id, options);
      })
      .then(function () {
        return _this.$q.promisify(definition.afterDestroy)(resourceName, item);
      })
      .then(function () {
        _this.eject(resourceName, id);
        return id;
      });
    deferred.resolve(item);
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = destroy;

},{}],35:[function(require,module,exports){
var errorPrefix = 'DS.destroyAll(resourceName, params[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:destroyAll
 * @name destroyAll
 * @description
 * Asynchronously return the resource from the server filtered by the query. The results will be added to the data
 * store when it returns from the server.
 *
 * ## Signature:
 * ```js
 * DS.destroyAll(resourceName, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  var params = {
 *      where: {
 *          author: {
 *              '==': 'John Anderson'
 *          }
 *      }
 *  };
 *
 *  DS.destroyAll('document', params).then(function (documents) {
 *      // The documents are gone from the data store
 *      DS.filter('document', params); // []
 *
 *  }, function (err) {
 *      // handle error
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function destroyAll(resourceName, params, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var _this = this;
    var IA = this.errors.IA;

    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isObject(params)) {
      throw new IA(errorPrefix + 'params: Must be an object!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    var definition = this.definitions[resourceName];

    promise = promise
      .then(function () {
        return _this.adapters[options.adapter || definition.defaultAdapter].destroyAll(definition, params, options);
      })
      .then(function () {
        return _this.ejectAll(resourceName, params);
      });
    deferred.resolve();
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = destroyAll;

},{}],36:[function(require,module,exports){
var errorPrefix = 'DS.find(resourceName, id[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:find
 * @name find
 * @description
 * Asynchronously return the resource with the given id from the server. The result will be added to the data
 * store when it returns from the server.
 *
 * ## Signature:
 * ```js
 * DS.find(resourceName, id[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.get('document', 5); // undefined
 *  DS.find('document', 5).then(function (document) {
 *      document; // { id: 5, author: 'John Anderson' }
 *
 *      DS.get('document', 5); // { id: 5, author: 'John Anderson' }
 *  }, function (err) {
 *      // Handled errors
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {object=} options Optional configuration. Properties:
 *
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the server into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - The item with the primary key specified by `id`.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function find(resourceName, id, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = this.errors.IA;

    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
      throw new IA(errorPrefix + 'id: Must be a string or a number!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    var definition = this.definitions[resourceName];
    var resource = this.store[resourceName];
    var _this = this;

    if (options.bypassCache) {
      delete resource.completedQueries[id];
    }

    if (!(id in resource.completedQueries)) {
      if (!(id in resource.pendingQueries)) {
        promise = resource.pendingQueries[id] = _this.adapters[options.adapter || definition.defaultAdapter].find(definition, id, options)
          .then(function (res) {
            var data = definition.deserialize(resourceName, res);
            if (options.cacheResponse) {
              // Query is no longer pending
              delete resource.pendingQueries[id];
              resource.completedQueries[id] = new Date().getTime();
              return _this.inject(resourceName, data);
            } else {
              return data;
            }
          }, function (err) {
            delete resource.pendingQueries[id];
            return _this.$q.reject(err);
          });
      }

      return resource.pendingQueries[id];
    } else {
      deferred.resolve(_this.get(resourceName, id));
    }
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = find;

},{}],37:[function(require,module,exports){
var errorPrefix = 'DS.findAll(resourceName, params[, options]): ';

function processResults(utils, data, resourceName, queryHash) {
  var resource = this.store[resourceName];

  data = data || [];

  // Query is no longer pending
  delete resource.pendingQueries[queryHash];
  resource.completedQueries[queryHash] = new Date().getTime();

  // Update modified timestamp of collection
  resource.collectionModified = utils.updateTimestamp(resource.collectionModified);

  // Merge the new values into the cache
  return this.inject(resourceName, data);
}

function _findAll(utils, resourceName, params, options) {
  var definition = this.definitions[resourceName],
    resource = this.store[resourceName],
    _this = this,
    queryHash = utils.toJson(params);

  if (options.bypassCache) {
    delete resource.completedQueries[queryHash];
  }

  if (!(queryHash in resource.completedQueries)) {
    // This particular query has never been completed

    if (!(queryHash in resource.pendingQueries)) {

      // This particular query has never even been made
      resource.pendingQueries[queryHash] = _this.adapters[options.adapter || definition.defaultAdapter].findAll(definition, params, options)
        .then(function (res) {
          var data = definition.deserialize(resourceName, res);
          if (options.cacheResponse) {
            try {
              return processResults.apply(_this, [utils, data, resourceName, queryHash]);
            } catch (err) {
              return _this.$q.reject(err);
            }
          } else {
            return data;
          }
        }, function (err) {
          delete resource.pendingQueries[queryHash];
          return _this.$q.reject(err);
        });
    }

    return resource.pendingQueries[queryHash];
  } else {
    return this.filter(resourceName, params, options);
  }
}

/**
 * @doc method
 * @id DS.async_methods:findAll
 * @name findAll
 * @description
 * Asynchronously return the resource from the server filtered by the query. The results will be added to the data
 * store when it returns from the server.
 *
 * ## Signature:
 * ```js
 * DS.findAll(resourceName, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  var params = {
 *      where: {
 *          author: {
 *              '==': 'John Anderson'
 *          }
 *      }
 *  };
 *
 *  DS.findAll('document', params).then(function (documents) {
 *      documents;  // [{ id: '1', author: 'John Anderson', title: 'How to cook' },
 *                  //  { id: '2', author: 'John Anderson', title: 'How NOT to cook' }]
 *
 *      // The documents are now in the data store
 *      DS.filter('document', params); // [{ id: '1', author: 'John Anderson', title: 'How to cook' },
 *                                     //  { id: '2', author: 'John Anderson', title: 'How NOT to cook' }]
 *
 *  }, function (err) {
 *      // handle error
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `where` - Where clause.
 * - `{number=}` - `limit` - Limit clause.
 * - `{number=}` - `skip` - Skip clause.
 * - `{number=}` - `offset` - Same as skip.
 * - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 *
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the server into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{array}` - `items` - The collection of items returned by the server.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function findAll(resourceName, params, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = this.errors.IA;
    var _this = this;

    options = options || {};
    params = params || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isObject(params)) {
      throw new IA(errorPrefix + 'params: Must be an object!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    promise = promise.then(function () {
      return _findAll.apply(_this, [_this.utils, resourceName, params, options]);
    });
    deferred.resolve();
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = findAll;

},{}],38:[function(require,module,exports){
module.exports = {
  /**
   * @doc method
   * @id DS.async_methods:create
   * @name create
   * @methodOf DS
   * @description
   * See [DS.create](/documentation/api/api/DS.async_methods:create).
   */
  create: require('./create'),

  /**
   * @doc method
   * @id DS.async_methods:destroy
   * @name destroy
   * @methodOf DS
   * @description
   * See [DS.destroy](/documentation/api/api/DS.async_methods:destroy).
   */
  destroy: require('./destroy'),

  /**
   * @doc method
   * @id DS.async_methods:destroyAll
   * @name destroyAll
   * @methodOf DS
   * @description
   * See [DS.destroyAll](/documentation/api/api/DS.async_methods:destroyAll).
   */
  destroyAll: require('./destroyAll'),

  /**
   * @doc method
   * @id DS.async_methods:find
   * @name find
   * @methodOf DS
   * @description
   * See [DS.find](/documentation/api/api/DS.async_methods:find).
   */
  find: require('./find'),

  /**
   * @doc method
   * @id DS.async_methods:findAll
   * @name findAll
   * @methodOf DS
   * @description
   * See [DS.findAll](/documentation/api/api/DS.async_methods:findAll).
   */
  findAll: require('./findAll'),

  /**
   * @doc method
   * @id DS.async_methods:loadRelations
   * @name loadRelations
   * @methodOf DS
   * @description
   * See [DS.loadRelations](/documentation/api/api/DS.async_methods:loadRelations).
   */
  loadRelations: require('./loadRelations'),

  /**
   * @doc method
   * @id DS.async_methods:refresh
   * @name refresh
   * @methodOf DS
   * @description
   * See [DS.refresh](/documentation/api/api/DS.async_methods:refresh).
   */
  refresh: require('./refresh'),

  /**
   * @doc method
   * @id DS.async_methods:save
   * @name save
   * @methodOf DS
   * @description
   * See [DS.save](/documentation/api/api/DS.async_methods:save).
   */
  save: require('./save'),

  /**
   * @doc method
   * @id DS.async_methods:update
   * @name update
   * @methodOf DS
   * @description
   * See [DS.update](/documentation/api/api/DS.async_methods:update).
   */
  update: require('./update'),

  /**
   * @doc method
   * @id DS.async_methods:updateAll
   * @name updateAll
   * @methodOf DS
   * @description
   * See [DS.updateAll](/documentation/api/api/DS.async_methods:updateAll).
   */
  updateAll: require('./updateAll')
};

},{"./create":33,"./destroy":34,"./destroyAll":35,"./find":36,"./findAll":37,"./loadRelations":39,"./refresh":40,"./save":41,"./update":42,"./updateAll":43}],39:[function(require,module,exports){
var errorPrefix = 'DS.loadRelations(resourceName, instance(Id), relations[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:loadRelations
 * @name loadRelations
 * @description
 * Asynchronously load the indicated relations of the given instance.
 *
 * ## Signature:
 * ```js
 * DS.loadRelations(resourceName, instance(Id), relations[, options])
 * ```
 *
 * ## Examples:
 *
 * ```js
 * DS.loadRelations('user', 10, ['profile']).then(function (user) {
 *   user.profile; // object
 *   assert.deepEqual(user.profile, DS.filter('profile', { userId: 10 })[0]);
 * });
 * ```
 *
 * ```js
 * var user = DS.get('user', 10);
 *
 * DS.loadRelations('user', user, ['profile']).then(function (user) {
 *   user.profile; // object
 *   assert.deepEqual(user.profile, DS.filter('profile', { userId: 10 })[0]);
 * });
 * ```
 *
 * ```js
 * DS.loadRelations('user', 10, ['profile'], { cacheResponse: false }).then(function (user) {
 *   user.profile; // object
 *   assert.equal(DS.filter('profile', { userId: 10 }).length, 0);
 * });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number|object} instance The instance or the id of the instance for which relations are to be loaded.
 * @param {string|array=} relations The relation(s) to load.
 * @param {object=} options Optional configuration that is passed to the `find` and `findAll` methods that may be called.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - The instance with its loaded relations.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function loadRelations(resourceName, instance, relations, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = this.errors.IA;

    options = options || {};

    if (angular.isString(instance) || angular.isNumber(instance)) {
      instance = this.get(resourceName, instance);
    }

    if (angular.isString(relations)) {
      relations = [relations];
    }

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isObject(instance)) {
      throw new IA(errorPrefix + 'instance(Id): Must be a string, number or object!');
    } else if (!this.utils.isArray(relations)) {
      throw new IA(errorPrefix + 'relations: Must be a string or an array!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    var definition = this.definitions[resourceName];
    var _this = this;
    var tasks = [];
    var fields = [];

    _this.utils.forOwn(definition.relations, function (relation, type) {
      _this.utils.forOwn(relation, function (def, relationName) {
        if (_this.utils.contains(relations, relationName)) {
          var task;
          var params = {};
          params[def.foreignKey] = instance[definition.idAttribute];

          if (type === 'hasMany') {
            task = _this.findAll(relationName, params, options);
          } else if (type === 'hasOne') {
            if (def.localKey && instance[def.localKey]) {
              task = _this.find(relationName, instance[def.localKey], options);
            } else if (def.foreignKey) {
              task = _this.findAll(relationName, params, options);
            }
          } else {
            task = _this.find(relationName, instance[def.localKey], options);
          }

          if (task) {
            tasks.push(task);
            fields.push(def.localField);
          }
        }
      });
    });

    promise = promise
      .then(function () {
        return _this.$q.all(tasks);
      })
      .then(function (loadedRelations) {
        angular.forEach(fields, function (field, index) {
          instance[field] = loadedRelations[index];
        });
        return instance;
      });

    deferred.resolve();
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = loadRelations;

},{}],40:[function(require,module,exports){
var errorPrefix = 'DS.refresh(resourceName, id[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:refresh
 * @name refresh
 * @description
 * Like find(), except the resource is only refreshed from the server if it already exists in the data store.
 *
 * ## Signature:
 * ```js
 * DS.refresh(resourceName, id)
 * ```
 * ## Example:
 *
 * ```js
 *  // Exists in the data store, but we want a fresh copy
 *  DS.get('document', 'ee7f3f4d-98d5-4934-9e5a-6a559b08479f');
 *
 *  DS.refresh('document', 'ee7f3f4d-98d5-4934-9e5a-6a559b08479f')
 *  .then(function (document) {
 *      document; // The fresh copy
 *  });
 *
 *  // Does not exist in the data store
 *  DS.get('document', 'aab7ff66-e21e-46e2-8be8-264d82aee535');
 *
 *  DS.refresh('document', 'aab7ff66-e21e-46e2-8be8-264d82aee535'); // false
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to refresh from the server.
 * @param {object=} options Optional configuration passed through to `DS.find` if it is called.
 * @returns {false|Promise} `false` if the item doesn't already exist in the data store. A `Promise` if the item does
 * exist in the data store and is being refreshed.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the refreshed item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function refresh(resourceName, id, options) {
  var IA = this.errors.IA;

  options = options || {};

  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new IA(errorPrefix + 'id: Must be a string or a number!');
  } else if (!this.utils.isObject(options)) {
    throw new IA(errorPrefix + 'options: Must be an object!');
  } else {
    options.bypassCache = true;

    if (this.get(resourceName, id)) {
      return this.find(resourceName, id, options);
    } else {
      return false;
    }
  }
}

module.exports = refresh;

},{}],41:[function(require,module,exports){
var errorPrefix = 'DS.save(resourceName, id[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:save
 * @name save
 * @description
 * Save the item of the type specified by `resourceName` that has the primary key specified by `id`.
 *
 * ## Signature:
 * ```js
 * DS.save(resourceName, id[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  var document = DS.get('document', 'ee7f3f4d-98d5-4934-9e5a-6a559b08479f');
 *
 *  document.title = 'How to cook in style';
 *
 *  DS.save('document', 'ee7f3f4d-98d5-4934-9e5a-6a559b08479f')
 *  .then(function (document) {
 *      document; // A reference to the document that's been saved to the server
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {object=} options Optional configuration. Properties::
 *
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the server into the data store. Default: `true`.
 * - `{boolean=}` - `changesOnly` - Only send changed and added values back to the server.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the newly saved item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{NonexistentResourceError}`
 */
function save(resourceName, id, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = this.errors.IA;

    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
      throw new IA(errorPrefix + 'id: Must be a string or a number!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    var item = this.get(resourceName, id);
    if (!item) {
      throw new this.errors.R(errorPrefix + 'id: "' + id + '" not found!');
    }

    var definition = this.definitions[resourceName];
    var resource = this.store[resourceName];
    var _this = this;

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    promise = promise
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.validate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.afterValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeUpdate)(resourceName, attrs);
      })
      .then(function (attrs) {
        if (options.changesOnly) {
          resource.observers[id].deliver();
          var toKeep = [],
            changes = _this.changes(resourceName, id);

          for (var key in changes.added) {
            toKeep.push(key);
          }
          for (key in changes.changed) {
            toKeep.push(key);
          }
          changes = _this.utils.pick(attrs, toKeep);
          if (_this.utils.isEmpty(changes)) {
            // no changes, return
            return attrs;
          } else {
            attrs = changes;
          }
        }
        return _this.adapters[options.adapter || definition.defaultAdapter].update(definition, id, definition.serialize(resourceName, attrs), options);
      })
      .then(function (res) {
        return _this.$q.promisify(definition.afterUpdate)(resourceName, definition.deserialize(resourceName, res));
      })
      .then(function (data) {
        if (options.cacheResponse) {
          var saved = _this.inject(definition.name, data, options);
          resource.previousAttributes[id] = _this.utils.deepMixIn({}, saved);
          resource.saved[id] = _this.utils.updateTimestamp(resource.saved[id]);
          return _this.get(resourceName, id);
        } else {
          return data;
        }
      });

    deferred.resolve(item);
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = save;

},{}],42:[function(require,module,exports){
var errorPrefix = 'DS.update(resourceName, id, attrs[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:update
 * @name update
 * @description
 * Update the item of type `resourceName` and primary key `id` with `attrs`. This is useful when you want to update an
 * item that isn't already in the data store, or you don't want to update the item that's in the data store until the
 * server-side operation succeeds. This differs from `DS.save` which simply saves items in their current form that
 * already reside in the data store.
 *
 * ## Signature:
 * ```js
 * DS.update(resourceName, id, attrs[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.get('document', 5); // undefined
 *
 *  DS.update('document', 5, { title: 'How to cook in style' })
 *  .then(function (document) {
 *      document; // A reference to the document that's been saved to the server
 *                // and now resides in the data store
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to update.
 * @param {object} attrs The attributes with which to update the item.
 * @param {object=} options Optional configuration. Properties:
 *
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the server into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the newly saved item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function update(resourceName, id, attrs, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = this.errors.IA;

    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
      throw new IA(errorPrefix + 'id: Must be a string or a number!');
    } else if (!this.utils.isObject(attrs)) {
      throw new IA(errorPrefix + 'attrs: Must be an object!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    var definition = this.definitions[resourceName];
    var resource = this.store[resourceName];
    var _this = this;

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    promise = promise
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.validate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.afterValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeUpdate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.adapters[options.adapter || definition.defaultAdapter].update(definition, id, definition.serialize(resourceName, attrs), options);
      })
      .then(function (res) {
        return _this.$q.promisify(definition.afterUpdate)(resourceName, definition.deserialize(resourceName, res));
      })
      .then(function (data) {
        if (options.cacheResponse) {
          var updated = _this.inject(definition.name, data, options);
          var id = updated[definition.idAttribute];
          resource.previousAttributes[id] = _this.utils.deepMixIn({}, updated);
          resource.saved[id] = _this.utils.updateTimestamp(resource.saved[id]);
          return _this.get(definition.name, id);
        } else {
          return data;
        }
      });

    deferred.resolve(attrs);
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = update;

},{}],43:[function(require,module,exports){
var errorPrefix = 'DS.updateAll(resourceName, attrs, params[, options]): ';

/**
 * @doc method
 * @id DS.async_methods:updateAll
 * @name updateAll
 * @description
 * Update items of type `resourceName` with `attrs` according to the criteria specified by `params`. This is useful when
 * you want to update multiple items with the same attributes that aren't already in the data store, or you don't want
 * to update the items that are in the data store until the server-side operation succeeds.
 *
 * ## Signature:
 * ```js
 * DS.updateAll(resourceName, attrs, params[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.filter('document'); // []
 *
 *  DS.updateAll('document', 5, { author: 'Sally' }, {
 *      where: {
 *          author: {
 *              '==': 'John Anderson'
 *          }
 *      }
 *  })
 *  .then(function (documents) {
 *      documents; // The documents that were updated on the server
 *                 // and now reside in the data store
 *
 *      documents[0].author; // "Sally"
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} attrs The attributes with which to update the items.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 *
 * - `{boolean=}` - `cacheResponse` - Inject the data returned by the server into the data store. Default: `true`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the newly saved item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 */
function updateAll(resourceName, attrs, params, options) {
  var deferred = this.$q.defer();
  var promise = deferred.promise;

  try {
    var IA = this.errors.IA;

    options = options || {};

    if (!this.definitions[resourceName]) {
      throw new this.errors.NER(errorPrefix + resourceName);
    } else if (!this.utils.isObject(attrs)) {
      throw new IA(errorPrefix + 'attrs: Must be an object!');
    } else if (!this.utils.isObject(params)) {
      throw new IA(errorPrefix + 'params: Must be an object!');
    } else if (!this.utils.isObject(options)) {
      throw new IA(errorPrefix + 'options: Must be an object!');
    }

    var definition = this.definitions[resourceName];
    var _this = this;

    if (!('cacheResponse' in options)) {
      options.cacheResponse = true;
    }

    promise = promise
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.validate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.afterValidate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.$q.promisify(definition.beforeUpdate)(resourceName, attrs);
      })
      .then(function (attrs) {
        return _this.adapters[options.adapter || definition.defaultAdapter].updateAll(definition, definition.serialize(resourceName, attrs), params, options);
      })
      .then(function (res) {
        return _this.$q.promisify(definition.afterUpdate)(resourceName, definition.deserialize(resourceName, res));
      })
      .then(function (data) {
        if (options.cacheResponse) {
          return _this.inject(definition.name, data, options);
        } else {
          return data;
        }
      });

    deferred.resolve(attrs);
  } catch (err) {
    deferred.reject(err);
  }

  return promise;
}

module.exports = updateAll;

},{}],44:[function(require,module,exports){
var utils = require('../utils')[0]();

function lifecycleNoop(resourceName, attrs, cb) {
  cb(null, attrs);
}

function Defaults() {
}

Defaults.prototype.idAttribute = 'id';
Defaults.prototype.defaultAdapter = 'DSHttpAdapter';
Defaults.prototype.filter = function (collection, resourceName, params, options) {
  var _this = this;
  var filtered = collection;
  var where = null;
  var reserved = {
    skip: '',
    offset: '',
    where: '',
    limit: '',
    orderBy: '',
    sort: ''
  };

  if (this.utils.isObject(params.where)) {
    where = params.where;
  } else {
    where = {};
  }

  if (options.allowSimpleWhere) {
    this.utils.forOwn(params, function (value, key) {
      if (!(key in reserved) && !(key in where)) {
        where[key] = {
          '==': value
        };
      }
    });
  }

  if (this.utils.isEmpty(where)) {
    where = null;
  }

  if (where) {
    filtered = this.utils.filter(filtered, function (attrs) {
      var first = true;
      var keep = true;
      _this.utils.forOwn(where, function (clause, field) {
        if (_this.utils.isString(clause)) {
          clause = {
            '===': clause
          };
        } else if (_this.utils.isNumber(clause) || _this.utils.isBoolean(clause)) {
          clause = {
            '==': clause
          };
        }
        if (_this.utils.isObject(clause)) {
          _this.utils.forOwn(clause, function (val, op) {
            if (op === '==') {
              keep = first ? (attrs[field] == val) : keep && (attrs[field] == val);
            } else if (op === '===') {
              keep = first ? (attrs[field] === val) : keep && (attrs[field] === val);
            } else if (op === '!=') {
              keep = first ? (attrs[field] != val) : keep && (attrs[field] != val);
            } else if (op === '!==') {
              keep = first ? (attrs[field] !== val) : keep && (attrs[field] !== val);
            } else if (op === '>') {
              keep = first ? (attrs[field] > val) : keep && (attrs[field] > val);
            } else if (op === '>=') {
              keep = first ? (attrs[field] >= val) : keep && (attrs[field] >= val);
            } else if (op === '<') {
              keep = first ? (attrs[field] < val) : keep && (attrs[field] < val);
            } else if (op === '<=') {
              keep = first ? (attrs[field] <= val) : keep && (attrs[field] <= val);
            } else if (op === 'in') {
              keep = first ? _this.utils.contains(val, attrs[field]) : keep && _this.utils.contains(val, attrs[field]);
            } else if (op === '|==') {
              keep = first ? (attrs[field] == val) : keep || (attrs[field] == val);
            } else if (op === '|===') {
              keep = first ? (attrs[field] === val) : keep || (attrs[field] === val);
            } else if (op === '|!=') {
              keep = first ? (attrs[field] != val) : keep || (attrs[field] != val);
            } else if (op === '|!==') {
              keep = first ? (attrs[field] !== val) : keep || (attrs[field] !== val);
            } else if (op === '|>') {
              keep = first ? (attrs[field] > val) : keep || (attrs[field] > val);
            } else if (op === '|>=') {
              keep = first ? (attrs[field] >= val) : keep || (attrs[field] >= val);
            } else if (op === '|<') {
              keep = first ? (attrs[field] < val) : keep || (attrs[field] < val);
            } else if (op === '|<=') {
              keep = first ? (attrs[field] <= val) : keep || (attrs[field] <= val);
            } else if (op === '|in') {
              keep = first ? _this.utils.contains(val, attrs[field]) : keep || _this.utils.contains(val, attrs[field]);
            }
            first = false;
          });
        }
      });
      return keep;
    });
  }

  var orderBy = null;

  if (this.utils.isString(params.orderBy)) {
    orderBy = [
      [params.orderBy, 'ASC']
    ];
  } else if (this.utils.isArray(params.orderBy)) {
    orderBy = params.orderBy;
  }

  if (!orderBy && this.utils.isString(params.sort)) {
    orderBy = [
      [params.sort, 'ASC']
    ];
  } else if (!orderBy && this.utils.isArray(params.sort)) {
    orderBy = params.sort;
  }

  // Apply 'orderBy'
  if (orderBy) {
    angular.forEach(orderBy, function (def) {
      if (_this.utils.isString(def)) {
        def = [def, 'ASC'];
      } else if (!_this.utils.isArray(def)) {
        throw new _this.errors.IllegalArgumentError('DS.filter(resourceName[, params][, options]): ' + angular.toJson(def) + ': Must be a string or an array!', { params: { 'orderBy[i]': { actual: typeof def, expected: 'string|array' } } });
      }
      filtered = _this.utils.sort(filtered, function (a, b) {
        var cA = a[def[0]], cB = b[def[0]];
        if (_this.utils.isString(cA)) {
          cA = _this.utils.upperCase(cA);
        }
        if (_this.utils.isString(cB)) {
          cB = _this.utils.upperCase(cB);
        }
        if (def[1] === 'DESC') {
          if (cB < cA) {
            return -1;
          } else if (cB > cA) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (cA < cB) {
            return -1;
          } else if (cA > cB) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    });
  }

  var limit = angular.isNumber(params.limit) ? params.limit : null;
  var skip = null;

  if (angular.isNumber(params.skip)) {
    skip = params.skip;
  } else if (angular.isNumber(params.offset)) {
    skip = params.offset;
  }

  // Apply 'limit' and 'skip'
  if (limit && skip) {
    filtered = this.utils.slice(filtered, skip, Math.min(filtered.length, skip + limit));
  } else if (this.utils.isNumber(limit)) {
    filtered = this.utils.slice(filtered, 0, Math.min(filtered.length, limit));
  } else if (this.utils.isNumber(skip)) {
    if (skip < filtered.length) {
      filtered = this.utils.slice(filtered, skip);
    } else {
      filtered = [];
    }
  }

  return filtered;
};
Defaults.prototype.baseUrl = '';
Defaults.prototype.endpoint = '';
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeValidate
 * @name defaults.beforeValidate
 * @description
 * Called before the `validate` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeValidate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeValidate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeValidate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.validate
 * @name defaults.validate
 * @description
 * Called before the `afterValidate` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * validate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.validate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.validate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterValidate
 * @name defaults.afterValidate
 * @description
 * Called before the `beforeCreate` or `beforeUpdate` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterValidate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterValidate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterValidate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeCreate
 * @name defaults.beforeCreate
 * @description
 * Called before the `create` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeCreate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeCreate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeCreate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterCreate
 * @name defaults.afterCreate
 * @description
 * Called after the `create` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterCreate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterCreate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterCreate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeUpdate
 * @name defaults.beforeUpdate
 * @description
 * Called before the `update` or `save` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeUpdate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeUpdate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeUpdate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterUpdate
 * @name defaults.afterUpdate
 * @description
 * Called after the `update` or `save` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterUpdate(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterUpdate = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterUpdate = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeDestroy
 * @name defaults.beforeDestroy
 * @description
 * Called before the `destroy` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeDestroy(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeDestroy = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeDestroy = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterDestroy
 * @name defaults.afterDestroy
 * @description
 * Called after the `destroy` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterDestroy(resourceName, attrs, cb)
 * ```
 *
 * ## Callback signature:
 * ```js
 * cb(err, attrs)
 * ```
 * Remember to pass the attributes along to the next step. Passing a first argument to the callback will abort the
 * lifecycle and reject the promise.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterDestroy = function (resourceName, attrs, cb) {
 *      // do somthing/inspect attrs
 *      cb(null, attrs);
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterDestroy = lifecycleNoop;
/**
 * @doc property
 * @id DSProvider.properties:defaults.beforeInject
 * @name defaults.beforeInject
 * @description
 * Called before the `inject` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * beforeInject(resourceName, attrs)
 * ```
 *
 * Throwing an error inside this step will cancel the injection.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.beforeInject = function (resourceName, attrs) {
 *      // do somthing/inspect/modify attrs
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.beforeInject = function (resourceName, attrs) {
  return attrs;
};
/**
 * @doc property
 * @id DSProvider.properties:defaults.afterInject
 * @name defaults.afterInject
 * @description
 * Called after the `inject` lifecycle step. Can be overridden per resource as well.
 *
 * ## Signature:
 * ```js
 * afterInject(resourceName, attrs)
 * ```
 *
 * Throwing an error inside this step will cancel the injection.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.afterInject = function (resourceName, attrs) {
 *      // do somthing/inspect/modify attrs
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource moving through the lifecycle.
 * @param {object} attrs Attributes of the item moving through the lifecycle.
 */
Defaults.prototype.afterInject = function (resourceName, attrs) {
  return attrs;
};
/**
 * @doc property
 * @id DSProvider.properties:defaults.serialize
 * @name defaults.serialize
 * @description
 * Your server might expect a custom request object rather than the plain POJO payload. Use `serialize` to
 * create your custom request object.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.serialize = function (resourceName, data) {
 *      return {
 *          payload: data
 *      };
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource to serialize.
 * @param {object} data Data to be sent to the server.
 * @returns {*} By default returns `data` as-is.
 */
Defaults.prototype.serialize = function (resourceName, data) {
  return data;
};

/**
 * @doc property
 * @id DSProvider.properties:defaults.deserialize
 * @name DSProvider.properties:defaults.deserialize
 * @description
 * Your server might return a custom response object instead of the plain POJO payload. Use `deserialize` to
 * pull the payload out of your response object so angular-data can use it.
 *
 * ## Example:
 * ```js
 *  DSProvider.defaults.deserialize = function (resourceName, data) {
 *      return data ? data.payload : data;
 *  };
 * ```
 *
 * @param {string} resourceName The name of the resource to deserialize.
 * @param {object} data Response object from `$http()`.
 * @returns {*} By default returns `data.data`.
 */
Defaults.prototype.deserialize = function (resourceName, data) {
  return data.data;
};

/**
 * @doc function
 * @id DSProvider
 * @name DSProvider
 */
function DSProvider() {

  /**
   * @doc property
   * @id DSProvider.properties:defaults
   * @name defaults
   * @description
   * See the [configuration guide](/documentation/guide/configure/global).
   *
   * Properties:
   *
   * - `{string}` - `baseUrl` - The url relative to which all AJAX requests will be made.
   * - `{string}` - `idAttribute` - Default: `"id"` - The attribute that specifies the primary key for resources.
   * - `{string}` - `defaultAdapter` - Default: `"DSHttpAdapter"`
   * - `{function}` - `filter` - Default: See [angular-data query language](/documentation/guide/queries/custom).
   * - `{function}` - `beforeValidate` - See [DSProvider.defaults.beforeValidate](/documentation/api/angular-data/DSProvider.properties:defaults.beforeValidate). Default: No-op
   * - `{function}` - `validate` - See [DSProvider.defaults.validate](/documentation/api/angular-data/DSProvider.properties:defaults.validate). Default: No-op
   * - `{function}` - `afterValidate` - See [DSProvider.defaults.afterValidate](/documentation/api/angular-data/DSProvider.properties:defaults.afterValidate). Default: No-op
   * - `{function}` - `beforeCreate` - See [DSProvider.defaults.beforeCreate](/documentation/api/angular-data/DSProvider.properties:defaults.beforeCreate). Default: No-op
   * - `{function}` - `afterCreate` - See [DSProvider.defaults.afterCreate](/documentation/api/angular-data/DSProvider.properties:defaults.afterCreate). Default: No-op
   * - `{function}` - `beforeUpdate` - See [DSProvider.defaults.beforeUpdate](/documentation/api/angular-data/DSProvider.properties:defaults.beforeUpdate). Default: No-op
   * - `{function}` - `afterUpdate` - See [DSProvider.defaults.afterUpdate](/documentation/api/angular-data/DSProvider.properties:defaults.afterUpdate). Default: No-op
   * - `{function}` - `beforeDestroy` - See [DSProvider.defaults.beforeDestroy](/documentation/api/angular-data/DSProvider.properties:defaults.beforeDestroy). Default: No-op
   * - `{function}` - `afterDestroy` - See [DSProvider.defaults.afterDestroy](/documentation/api/angular-data/DSProvider.properties:defaults.afterDestroy). Default: No-op
   * - `{function}` - `afterInject` - See [DSProvider.defaults.afterInject](/documentation/api/angular-data/DSProvider.properties:defaults.afterInject). Default: No-op
   * - `{function}` - `beforeInject` - See [DSProvider.defaults.beforeInject](/documentation/api/angular-data/DSProvider.properties:defaults.beforeInject). Default: No-op
   * - `{function}` - `serialize` - See [DSProvider.defaults.serialize](/documentation/api/angular-data/DSProvider.properties:defaults.serialize). Default: No-op
   * - `{function}` - `deserialize` - See [DSProvider.defaults.deserialize](/documentation/api/angular-data/DSProvider.properties:defaults.deserialize). Default: No-op
   */
  var defaults = this.defaults = new Defaults();

  this.$get = [
    '$rootScope', '$log', '$q', 'DSHttpAdapter', 'DSLocalStorageAdapter', 'DSUtils', 'DSErrors',
    function ($rootScope, $log, $q, DSHttpAdapter, DSLocalStorageAdapter, DSUtils, DSErrors) {

      var syncMethods = require('./sync_methods'),
        asyncMethods = require('./async_methods'),
        cache;

      try {
        cache = angular.injector(['angular-data.DSCacheFactory']).get('DSCacheFactory');
      } catch (err) {
        $log.warn(err);
        $log.warn('DSCacheFactory is unavailable. Resorting to the lesser capabilities of $cacheFactory.');
        cache = angular.injector(['ng']).get('$cacheFactory');
      }

      /**
       * @doc interface
       * @id DS
       * @name DS
       * @description
       * Public data store interface. Consists of several properties and a number of methods. Injectable as `DS`.
       *
       * See the [guide](/documentation/guide/overview/index).
       */
      var DS = {
        $rootScope: $rootScope,
        $log: $log,
        $q: $q,

        cacheFactory: cache,

        /**
         * @doc property
         * @id DS.properties:defaults
         * @name defaults
         * @description
         * Reference to [DSProvider.defaults](/documentation/api/api/DSProvider.properties:defaults).
         */
        defaults: defaults,

        /*!
         * @doc property
         * @id DS.properties:store
         * @name store
         * @description
         * Meta data for each registered resource.
         */
        store: {},

        /*!
         * @doc property
         * @id DS.properties:definitions
         * @name definitions
         * @description
         * Registered resource definitions available to the data store.
         */
        definitions: {},

        /**
         * @doc property
         * @id DS.properties:adapters
         * @name adapters
         * @description
         * Registered adapters available to the data store. Object consists of key-values pairs where the key is
         * the name of the adapter and the value is the adapter itself.
         */
        adapters: {
          DSHttpAdapter: DSHttpAdapter,
          DSLocalStorageAdapter: DSLocalStorageAdapter
        },

        /**
         * @doc property
         * @id DS.properties:errors
         * @name errors
         * @description
         * References to the various [error types](/documentation/api/api/errors) used by angular-data.
         */
        errors: DSErrors,

        /*!
         * @doc property
         * @id DS.properties:utils
         * @name utils
         * @description
         * Utility functions used internally by angular-data.
         */
        utils: DSUtils
      };

      DSUtils.deepFreeze(syncMethods);
      DSUtils.deepFreeze(asyncMethods);

      DSUtils.deepMixIn(DS, syncMethods);
      DSUtils.deepMixIn(DS, asyncMethods);

      DSUtils.deepFreeze(DS.errors);
      DSUtils.deepFreeze(DS.utils);

      var $dirtyCheckScope = $rootScope.$new();

      $dirtyCheckScope.$watch(function () {
        // Throttle angular-data's digest loop to tenths of a second
        // TODO: Is this okay?
        return new Date().getTime() / 100 | 0;
      }, function () {
        DS.digest();
      });

      return DS;
    }
  ];
}

module.exports = DSProvider;

},{"../utils":62,"./async_methods":38,"./sync_methods":55}],45:[function(require,module,exports){
var errorPrefix = 'DS.bindAll(scope, expr, resourceName, params[, cb]): ';

/**
 * @doc method
 * @id DS.sync_methods:bindAll
 * @name bindAll
 * @description
 * Bind a collection of items in the data store to `scope` under the property specified by `expr` filtered by `params`.
 *
 * ## Signature:
 * ```js
 * DS.bindAll(scope, expr, resourceName, params[, cb])
 * ```
 *
 * ## Example:
 *
 * ```js
 * // bind the documents with ownerId of 5 to the 'docs' property of the $scope
 * var deregisterFunc = DS.bindAll($scope, 'docs', 'document', {
 *      where: {
 *          ownerId: 5
 *      }
 * });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {object} scope The scope to bind to.
 * @param {string} expr An expression used to bind to the scope. Can be used to set nested keys, i.e. `"user.comments"`.
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is used in filtering the collection. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {function=} cb Optional callback executed on change. Signature: `cb(err, items)`.
 *
 * @returns {function} Scope $watch deregistration function.
 */
function bindOne(scope, expr, resourceName, params, cb) {
  var IA = this.errors.IA;

  if (!this.utils.isObject(scope)) {
    throw new IA(errorPrefix + 'scope: Must be an object!');
  } else if (!this.utils.isString(expr)) {
    throw new IA(errorPrefix + 'expr: Must be a string!');
  } else if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isObject(params)) {
    throw new IA(errorPrefix + 'params: Must be an object!');
  }

  var _this = this;

  try {
    return scope.$watch(function () {
      return _this.lastModified(resourceName);
    }, function () {
      var items = _this.filter(resourceName, params);
      _this.utils.set(scope, expr, items);
      if (cb) {
        cb(null, items);
      }
    });
  } catch (err) {
    if (cb) {
      cb(err);
    } else {
      throw err;
    }
  }
}

module.exports = bindOne;

},{}],46:[function(require,module,exports){
var errorPrefix = 'DS.bindOne(scope, expr, resourceName, id[, cb]): ';

/**
 * @doc method
 * @id DS.sync_methods:bindOne
 * @name bindOne
 * @description
 * Bind an item in the data store to `scope` under the property specified by `expr`.
 *
 * ## Signature:
 * ```js
 * DS.bindOne(scope, expr, resourceName, id[, cb])
 * ```
 *
 * ## Example:
 *
 * ```js
 * // bind the document with id 5 to the 'doc' property of the $scope
 * var deregisterFunc = DS.bindOne($scope, 'doc', 'document', 5);
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {object} scope The scope to bind to.
 * @param {string} expr An expression used to bind to the scope. Can be used to set nested keys, i.e. `"user.profile"`.
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to bind.
 * @param {function=} cb Optional callback executed on change. Signature: `cb(err, item)`.
 * @returns {function} Scope $watch deregistration function.
 */
function bindOne(scope, expr, resourceName, id, cb) {
  var IA = this.errors.IA;

  if (!this.utils.isObject(scope)) {
    throw new IA(errorPrefix + 'scope: Must be an object!');
  } else if (!this.utils.isString(expr)) {
    throw new IA(errorPrefix + 'expr: Must be a string!');
  } else if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new IA(errorPrefix + 'id: Must be a string or a number!');
  }

  var _this = this;

  try {
    return scope.$watch(function () {
      return _this.lastModified(resourceName, id);
    }, function () {
      var item = _this.get(resourceName, id);
      _this.utils.set(scope, expr, item);
      if (cb) {
        cb(null, item);
      }
    });
  } catch (err) {
    if (cb) {
      cb(err);
    } else {
      throw err;
    }
  }
}

module.exports = bindOne;

},{}],47:[function(require,module,exports){
var errorPrefix = 'DS.changes(resourceName, id): ';

/**
 * @doc method
 * @id DS.sync_methods:changes
 * @name changes
 * @description
 * Synchronously return the changes object of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the diff between the item in its current state and the state of the item
 * the last time it was saved via an async adapter.
 *
 * ## Signature:
 * ```js
 * DS.changes(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * DS.changes('document', 5); // {...} Object describing changes
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item of the changes to retrieve.
 * @returns {object} The changes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function changes(resourceName, id) {
  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
  }

  var item = this.get(resourceName, id);
  if (item) {
    this.store[resourceName].observers[id].deliver();
    return this.utils.diffObjectFromOldObject(item, this.store[resourceName].previousAttributes[id]);
  }
}

module.exports = changes;

},{}],48:[function(require,module,exports){
/*jshint evil:true*/
var errorPrefix = 'DS.defineResource(definition): ';

function Resource(utils, options) {

  utils.deepMixIn(this, options);

  if ('endpoint' in options) {
    this.endpoint = options.endpoint;
  } else {
    this.endpoint = this.name;
  }
}

/**
 * @doc method
 * @id DS.sync_methods:defineResource
 * @name defineResource
 * @description
 * Define a resource and register it with the data store.
 *
 * ## Signature:
 * ```js
 * DS.defineResource(definition)
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.defineResource({
 *      name: 'document',
 *      idAttribute: '_id',
 *      endpoint: '/documents
 *      baseUrl: 'http://myapp.com/api',
 *      beforeDestroy: function (resourceName attrs, cb) {
 *          console.log('looks good to me');
 *          cb(null, attrs);
 *      }
 *  });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 *
 * @param {string|object} definition Name of resource or resource definition object: Properties:
 *
 * - `{string}` - `name` - The name by which this resource will be identified.
 * - `{string="id"}` - `idAttribute` - The attribute that specifies the primary key for this resource.
 * - `{string=}` - `endpoint` - The attribute that specifies the primary key for this resource. Default is the value of `name`.
 * - `{string=}` - `baseUrl` - The url relative to which all AJAX requests will be made.
 * - `{*=}` - `meta` - A property reserved for developer use. This will never be used by the API.
 * - `{object=}` - `methods` - If provided, items of this resource will be wrapped in a constructor function that is
 * empty save for the attributes in this option which will be mixed in to the constructor function prototype. Enabling
 * this feature for this resource will incur a slight performance penalty, but allows you to give custom behavior to what
 * are now "instances" of this resource.
 * - `{function=}` - `beforeValidate` - Lifecycle hook. Overrides global. Signature: `beforeValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `validate` - Lifecycle hook. Overrides global. Signature: `validate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterValidate` - Lifecycle hook. Overrides global. Signature: `afterValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeCreate` - Lifecycle hook. Overrides global. Signature: `beforeCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterCreate` - Lifecycle hook. Overrides global. Signature: `afterCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeUpdate` - Lifecycle hook. Overrides global. Signature: `beforeUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterUpdate` - Lifecycle hook. Overrides global. Signature: `afterUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeDestroy` - Lifecycle hook. Overrides global. Signature: `beforeDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterDestroy` - Lifecycle hook. Overrides global. Signature: `afterDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeInject` - Lifecycle hook. Overrides global. Signature: `beforeInject(resourceName, attrs)`.
 * - `{function=}` - `afterInject` - Lifecycle hook. Overrides global. Signature: `afterInject(resourceName, attrs)`.
 * - `{function=}` - `serialize` - Serialization hook. Overrides global. Signature: `serialize(resourceName, attrs)`.
 * - `{function=}` - `deserialize` - Deserialization hook. Overrides global. Signature: `deserialize(resourceName, attrs)`.
 *
 * See [DSProvider.defaults](/documentation/api/angular-data/DSProvider.properties:defaults).
 */
function defineResource(definition) {
  var IA = this.errors.IA;

  if (this.utils.isString(definition)) {
    definition = {
      name: definition
    };
  }
  if (!this.utils.isObject(definition)) {
    throw new IA(errorPrefix + 'definition: Must be an object!');
  } else if (!this.utils.isString(definition.name)) {
    throw new IA(errorPrefix + 'definition.name: Must be a string!');
  } else if (definition.idAttribute && !this.utils.isString(definition.idAttribute)) {
    throw new IA(errorPrefix + 'definition.idAttribute: Must be a string!');
  } else if (definition.endpoint && !this.utils.isString(definition.endpoint)) {
    throw new IA(errorPrefix + 'definition.endpoint: Must be a string!');
  } else if (this.store[definition.name]) {
    throw new this.errors.R(errorPrefix + definition.name + ' is already registered!');
  }

  try {
    Resource.prototype = this.defaults;
    this.definitions[definition.name] = new Resource(this.utils, definition);

    var _this = this;
    var def = this.definitions[definition.name];

    var cache = this.cacheFactory('DS.' + def.name, {
      maxAge: def.maxAge || null,
      recycleFreq: def.recycleFreq || 1000,
      cacheFlushInterval: def.cacheFlushInterval || null,
      deleteOnExpire: def.deleteOnExpire || 'none',
      onExpire: function (id) {
        _this.eject(def.name, id);
      },
      capacity: Number.MAX_VALUE,
      storageMode: 'memory',
      storageImpl: null,
      disabled: false,
      storagePrefix: 'DS.' + def.name
    });

    if (def.methods) {
      def.class = definition.name[0].toUpperCase() + definition.name.substring(1);
      eval('function ' + def.class + '() {}');
      def[def.class] = eval(def.class);
      this.utils.deepMixIn(def[def.class].prototype, def.methods);
    }

    if (def.computed) {
      this.utils.forOwn(def.computed, function (fn, field) {
        if (def.methods && field in def.methods) {
          _this.$log.warn(errorPrefix + 'Computed property "' + field + '" conflicts with previously defined prototype method!');
        }
        var match = fn.toString().match(/function.*?\(([\s\S]*?)\)/);
        var deps = match[1].split(',');
        fn.deps = _this.utils.filter(deps, function (dep) {
          return !!dep;
        });
        angular.forEach(fn.deps, function (val, index) {
          fn.deps[index] = val.trim();
        });
      });
    }

    this.store[def.name] = {
      collection: [],
      completedQueries: {},
      pendingQueries: {},
      index: cache,
      modified: {},
      saved: {},
      previousAttributes: {},
      observers: {},
      collectionModified: 0
    };
  }
  catch
    (err) {
    delete this.definitions[definition.name];
    delete this.store[definition.name];
    throw err;
  }
}

module.exports = defineResource;

},{}],49:[function(require,module,exports){
var observe = require('../../../lib/observe-js/observe-js');

/**
 * @doc method
 * @id DS.sync_methods:digest
 * @name digest
 * @description
 * Trigger a digest loop that checks for changes and updates the `lastModified` timestamp if an object has changed.
 * Anything $watching `DS.lastModified(...)` will detect the updated timestamp and execute the callback function.
 *
 * ## Signature:
 * ```js
 * DS.digest()
 * ```
 *
 * ## Example:
 *
 * ```js
 * Works like $scope.$apply()
 * ```
 *
 */
function digest() {
  if (!this.$rootScope.$$phase) {
    this.$rootScope.$apply(function () {
      observe.Platform.performMicrotaskCheckpoint();
    });
  } else {
    observe.Platform.performMicrotaskCheckpoint();
  }
}

module.exports = digest;

},{"../../../lib/observe-js/observe-js":1}],50:[function(require,module,exports){
var errorPrefix = 'DS.eject(resourceName, id): ';

function _eject(definition, resource, id) {
  var found = false;
  for (var i = 0; i < resource.collection.length; i++) {
    if (resource.collection[i][definition.idAttribute] == id) {
      found = true;
      break;
    }
  }
  if (found) {
    resource.collection.splice(i, 1);
    resource.observers[id].close();
    delete resource.observers[id];

    resource.index.remove(id);
    delete resource.previousAttributes[id];
    delete resource.modified[id];
    delete resource.saved[id];
  }
}

/**
 * @doc method
 * @id DS.sync_methods:eject
 * @name eject
 * @description
 * Eject the item of the specified type that has the given primary key from the data store. Ejection only removes items
 * from the data store and does not attempt to delete items on the server.
 *
 * ## Signature:
 * ```js
 * DS.eject(resourceName[, id])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 *
 * DS.eject('document', 45);
 *
 * DS.get('document', 45); // undefined
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to eject.
 */
function eject(resourceName, id) {
  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
  }

  var resource = this.store[resourceName];
  var _this = this;

  if (!this.$rootScope.$$phase) {
    this.$rootScope.$apply(function () {
      _eject(_this.definitions[resourceName], resource, id);
      resource.collectionModified = _this.utils.updateTimestamp(resource.collectionModified);
    });
  } else {
    _eject(_this.definitions[resourceName], resource, id);
    resource.collectionModified = _this.utils.updateTimestamp(resource.collectionModified);
  }
  delete this.store[resourceName].completedQueries[id];
}

module.exports = eject;

},{}],51:[function(require,module,exports){
var errorPrefix = 'DS.ejectAll(resourceName[, params]): ';

function _ejectAll(definition, resource, params) {
  var queryHash = this.utils.toJson(params);
  var items = this.filter(definition.name, params);
  var ids = this.utils.toLookup(items, definition.idAttribute);
  var _this = this;

  angular.forEach(ids, function (item, id) {
    _this.eject(definition.name, id);
  });

  delete resource.completedQueries[queryHash];
}

/**
 * @doc method
 * @id DS.sync_methods:ejectAll
 * @name ejectAll
 * @description
 * Eject all matching items of the specified type from the data store. If query is specified then all items of the
 * specified type will be removed. Ejection only removes items from the data store and does not attempt to delete items
 * on the server.
 *
 * ## Signature:
 * ```js
 * DS.ejectAll(resourceName[, params])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 *
 * DS.eject('document', 45);
 *
 * DS.get('document', 45); // undefined
 * ```
 *
 * Eject all items of the specified type that match the criteria from the data store.
 *
 * ```js
 * DS.filter('document');   // [ { title: 'How to Cook', id: 45, author: 'John Anderson' },
 *                          //   { title: 'How to Eat', id: 46, author: 'Sally Jane' } ]
 *
 * DS.ejectAll('document', { where: { author: 'Sally Jane' } });
 *
 * DS.filter('document'); // [ { title: 'How to Cook', id: 45, author: 'John Anderson' } ]
 * ```
 *
 * Eject all items of the specified type from the data store.
 *
 * ```js
 * DS.filter('document');   // [ { title: 'How to Cook', id: 45, author: 'John Anderson' },
 *                          //   { title: 'How to Eat', id: 46, author: 'Sally Jane' } ]
 *
 * DS.ejectAll('document');
 *
 * DS.filter('document'); // [ ]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 */
function ejectAll(resourceName, params) {
  params = params || {};

  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isObject(params)) {
    throw new this.errors.IA(errorPrefix + 'params: Must be an object!');
  }

  var _this = this;
  var resource = this.store[resourceName];
  var queryHash = this.utils.toJson(params);

  delete resource.completedQueries[queryHash];

  if (this.utils.isEmpty(params)) {
    resource.completedQueries = {};
  }

  if (!this.$rootScope.$$phase) {
    this.$rootScope.$apply(function () {
      _ejectAll.apply(_this, [_this.definitions[resourceName], resource, params]);
      resource.collectionModified = _this.utils.updateTimestamp(resource.collectionModified);
    });
  } else {
    _ejectAll.apply(_this, [_this.definitions[resourceName], resource, params]);
    resource.collectionModified = this.utils.updateTimestamp(resource.collectionModified);
  }
}

module.exports = ejectAll;

},{}],52:[function(require,module,exports){
var errorPrefix = 'DS.filter(resourceName[, params][, options]): ';

/**
 * @doc method
 * @id DS.sync_methods:filter
 * @name filter
 * @description
 * Synchronously filter items in the data store of the type specified by `resourceName`.
 *
 * ## Signature:
 * ```js
 * DS.filter(resourceName[, params][, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * TODO: filter(resourceName, params[, options]) example
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object=} params Parameter object that is serialized into the query string. Properties:
 *
 *  - `{object=}` - `where` - Where clause.
 *  - `{number=}` - `limit` - Limit clause.
 *  - `{number=}` - `skip` - Skip clause.
 *  - `{number=}` - `offset` - Same as skip.
 *  - `{string|array=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 * - `{boolean=}` - `loadFromServer` - Send the query to server if it has not been sent yet. Default: `false`.
 * - `{boolean=}` - `allowSimpleWhere` - Treat top-level fields on the `params` argument as simple "where" equality clauses. Default: `true`.
 * @returns {array} The filtered collection of items of the type specified by `resourceName`.
 */
function filter(resourceName, params, options) {
  var IA = this.errors.IA;

  options = options || {};

  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (params && !this.utils.isObject(params)) {
    throw new IA(errorPrefix + 'params: Must be an object!');
  } else if (!this.utils.isObject(options)) {
    throw new IA(errorPrefix + 'options: Must be an object!');
  }

  var definition = this.definitions[resourceName];
  var resource = this.store[resourceName];

  // Protect against null
  params = params || {};

  if ('allowSimpleWhere' in options) {
    options.allowSimpleWhere = !!options.allowSimpleWhere;
  } else {
    options.allowSimpleWhere = true;
  }

  var queryHash = this.utils.toJson(params);

  if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
    // This particular query has never been completed

    if (!resource.pendingQueries[queryHash]) {
      // This particular query has never even been started
      this.findAll(resourceName, params, options);
    }
  }

  return definition.filter.call(this, resource.collection, resourceName, params, options);
}

module.exports = filter;

},{}],53:[function(require,module,exports){
var errorPrefix = 'DS.get(resourceName, id[, options]): ';

/**
 * @doc method
 * @id DS.sync_methods:get
 * @name get
 * @description
 * Synchronously return the resource with the given id. The data store will forward the request to the server if the
 * item is not in the cache and `loadFromServer` is set to `true` in the options hash.
 *
 * ## Signature:
 * ```js
 * DS.get(resourceName, id[, options])
 * ```
 *
 * ## Example:
 *
 * ```js
 * DS.get('document', 5'); // { author: 'John Anderson', id: 5 }
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {object=} options Optional configuration. Properties:
 * - `{boolean=}` - `loadFromServer` - Send the query to server if it has not been sent yet. Default: `false`.
 * @returns {object} The item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function get(resourceName, id, options) {
  var IA = this.errors.IA;

  options = options || {};

  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new IA(errorPrefix + 'id: Must be a string or a number!');
  } else if (!this.utils.isObject(options)) {
    throw new IA(errorPrefix + 'options: Must be an object!');
  }
  var _this = this;

  // cache miss, request resource from server
  var item = this.store[resourceName].index.get(id);
  if (!item && options.loadFromServer) {
    this.find(resourceName, id).then(null, function (err) {
      return _this.$q.reject(err);
    });
  }

  // return resource from cache
  return item;
}

module.exports = get;

},{}],54:[function(require,module,exports){
var errorPrefix = 'DS.hasChanges(resourceName, id): ';

function diffIsEmpty(utils, diff) {
  return !(utils.isEmpty(diff.added) &&
    utils.isEmpty(diff.removed) &&
    utils.isEmpty(diff.changed));
}

/**
 * @doc method
 * @id DS.sync_methods:hasChanges
 * @name hasChanges
 * @description
 * Synchronously return whether object of the item of the type specified by `resourceName` that has the primary key
 * specified by `id` has changes.
 *
 * ## Signature:
 * ```js
 * DS.hasChanges(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * DS.hasChanges('document', 5); // true
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item.
 * @returns {boolean} Whether the item of the type specified by `resourceName` with the primary key specified by `id` has changes.
 */
function hasChanges(resourceName, id) {
  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
  }

  // return resource from cache
  if (this.get(resourceName, id)) {
    return diffIsEmpty(this.utils, this.changes(resourceName, id));
  } else {
    return false;
  }
}

module.exports = hasChanges;

},{}],55:[function(require,module,exports){
module.exports = {
  /**
   * @doc method
   * @id DS.sync_methods:defineResource
   * @name defineResource
   * @methodOf DS
   * @description
   * See [DS.defineResource](/documentation/api/api/DS.sync_methods:defineResource).
   */
  defineResource: require('./defineResource'),

  /**
   * @doc method
   * @id DS.sync_methods:bindOne
   * @name bindOne
   * @methodOf DS
   * @description
   * See [DS.bindOne](/documentation/api/api/DS.sync_methods:bindOne).
   */
  bindOne: require('./bindOne'),

  /**
   * @doc method
   * @id DS.sync_methods:bindAll
   * @name bindAll
   * @methodOf DS
   * @description
   * See [DS.bindAll](/documentation/api/api/DS.sync_methods:bindAll).
   */
  bindAll: require('./bindAll'),

  /**
   * @doc method
   * @id DS.sync_methods:eject
   * @name eject
   * @methodOf DS
   * @description
   * See [DS.eject](/documentation/api/api/DS.sync_methods:eject).
   */
  eject: require('./eject'),

  /**
   * @doc method
   * @id DS.sync_methods:ejectAll
   * @name ejectAll
   * @methodOf DS
   * @description
   * See [DS.ejectAll](/documentation/api/api/DS.sync_methods:ejectAll).
   */
  ejectAll: require('./ejectAll'),

  /**
   * @doc method
   * @id DS.sync_methods:filter
   * @name filter
   * @methodOf DS
   * @description
   * See [DS.filter](/documentation/api/api/DS.sync_methods:filter).
   */
  filter: require('./filter'),

  /**
   * @doc method
   * @id DS.sync_methods:get
   * @name get
   * @methodOf DS
   * @description
   * See [DS.get](/documentation/api/api/DS.sync_methods:get).
   */
  get: require('./get'),

  /**
   * @doc method
   * @id DS.sync_methods:inject
   * @name inject
   * @methodOf DS
   * @description
   * See [DS.inject](/documentation/api/api/DS.sync_methods:inject).
   */
  inject: require('./inject'),

  /**
   * @doc method
   * @id DS.sync_methods:lastModified
   * @name lastModified
   * @methodOf DS
   * @description
   * See [DS.lastModified](/documentation/api/api/DS.sync_methods:lastModified).
   */
  lastModified: require('./lastModified'),

  /**
   * @doc method
   * @id DS.sync_methods:lastSaved
   * @name lastSaved
   * @methodOf DS
   * @description
   * See [DS.lastSaved](/documentation/api/api/DS.sync_methods:lastSaved).
   */
  lastSaved: require('./lastSaved'),

  /**
   * @doc method
   * @id DS.sync_methods:digest
   * @name digest
   * @methodOf DS
   * @description
   * See [DS.digest](/documentation/api/api/DS.sync_methods:digest).
   */
  digest: require('./digest'),

  /**
   * @doc method
   * @id DS.sync_methods:changes
   * @name changes
   * @methodOf DS
   * @description
   * See [DS.changes](/documentation/api/api/DS.sync_methods:changes).
   */
  changes: require('./changes'),

  /**
   * @doc method
   * @id DS.sync_methods:previous
   * @name previous
   * @methodOf DS
   * @description
   * See [DS.previous](/documentation/api/api/DS.sync_methods:previous).
   */
  previous: require('./previous'),

  /**
   * @doc method
   * @id DS.sync_methods:hasChanges
   * @name hasChanges
   * @methodOf DS
   * @description
   * See [DS.hasChanges](/documentation/api/api/DS.sync_methods:hasChanges).
   */
  hasChanges: require('./hasChanges')
};

},{"./bindAll":45,"./bindOne":46,"./changes":47,"./defineResource":48,"./digest":49,"./eject":50,"./ejectAll":51,"./filter":52,"./get":53,"./hasChanges":54,"./inject":56,"./lastModified":57,"./lastSaved":58,"./previous":59}],56:[function(require,module,exports){
var observe = require('../../../lib/observe-js/observe-js');
var errorPrefix = 'DS.inject(resourceName, attrs[, options]): ';

function _inject(definition, resource, attrs) {
  var _this = this;
  var $log = _this.$log;

  function _react(added, removed, changed, getOldValueFn) {
    var innerId = getOldValueFn(definition.idAttribute);

    resource.modified[innerId] = _this.utils.updateTimestamp(resource.modified[innerId]);
    resource.collectionModified = _this.utils.updateTimestamp(resource.collectionModified);

    if (definition.computed) {
      var item = _this.get(definition.name, innerId);
      _this.utils.forOwn(definition.computed, function (fn, field) {
        var compute = false;
        // check if required fields changed
        angular.forEach(fn.deps, function (dep) {
          if (dep in changed || dep in removed || dep in changed || !(field in item)) {
            compute = true;
          }
        });
        if (compute) {
          var args = [];
          angular.forEach(fn.deps, function (dep) {
            args.push(item[dep]);
          });
          // recompute property
          item[field] = fn.apply(item, args);
        }
      });
    }

    if (definition.idAttribute in changed) {
      $log.error('Doh! You just changed the primary key of an object! ' +
        'I don\'t know how to handle this yet, so your data for the "' + definition.name +
        '" resource is now in an undefined (probably broken) state.');
    }
  }

  var injected;
  if (_this.utils.isArray(attrs)) {
    injected = [];
    for (var i = 0; i < attrs.length; i++) {
      injected.push(_inject.call(_this, definition, resource, attrs[i]));
    }
  } else {
    // check if "idAttribute" is a computed property
    if (definition.computed && definition.computed[definition.idAttribute]) {
      var args = [];
      angular.forEach(definition.computed[definition.idAttribute].deps, function (dep) {
        args.push(attrs[dep]);
      });
      attrs[definition.idAttribute] = definition.computed[definition.idAttribute].apply(attrs, args);
    }
    if (!(definition.idAttribute in attrs)) {
      throw new _this.errors.R(errorPrefix + 'attrs: Must contain the property specified by `idAttribute`!');
    } else {
      try {
        definition.beforeInject(definition.name, attrs);
        var id = attrs[definition.idAttribute],
          item = this.get(definition.name, id);

        if (!item) {
          if (definition.class) {
            if (attrs instanceof definition[definition.class]) {
              item = attrs;
            } else {
              item = new definition[definition.class]();
            }
          } else {
            item = {};
          }
          resource.previousAttributes[id] = {};

          _this.utils.deepMixIn(item, attrs);
          _this.utils.deepMixIn(resource.previousAttributes[id], attrs);

          resource.collection.push(item);

          resource.observers[id] = new observe.ObjectObserver(item, _react);
          resource.index.put(id, item);

          _react({}, {}, {}, function () {
            return id;
          });
        } else {
          _this.utils.deepMixIn(item, attrs);
          if (typeof resource.index.touch === 'function') {
            resource.index.touch(id);
          } else {
            resource.index.put(id, resource.index.get(id));
          }
          resource.observers[id].deliver();
        }
        resource.saved[id] = _this.utils.updateTimestamp(resource.saved[id]);
        definition.afterInject(definition.name, item);
        injected = item;
      } catch (err) {
        $log.error(err);
        $log.error('inject failed!', definition.name, attrs);
      }
    }
  }
  return injected;
}

function _injectRelations(definition, injected) {
  var _this = this;
  _this.utils.forOwn(definition.relations, function (relation, type) {
    _this.utils.forOwn(relation, function (def, relationName) {
      if (_this.definitions[relationName] && injected[def.localField]) {
        try {
          injected[def.localField] = _this.inject(relationName, injected[def.localField]);
        } catch (err) {
          _this.$log.error(errorPrefix + 'Failed to inject ' + type + ' relation: "' + relationName + '"!', err);
        }
      }
    });
  });
}

/**
 * @doc method
 * @id DS.sync_methods:inject
 * @name inject
 * @description
 * Inject the given item into the data store as the specified type. If `attrs` is an array, inject each item into the
 * data store. Injecting an item into the data store does not save it to the server.
 *
 * ## Signature:
 * ```js
 * DS.inject(resourceName, attrs[, options])
 * ```
 *
 * ## Examples:
 *
 * ```js
 * DS.get('document', 45); // undefined
 *
 * DS.inject('document', { title: 'How to Cook', id: 45 });
 *
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 * ```
 *
 * Inject a collection into the data store:
 *
 * ```js
 * DS.filter('document'); // [ ]
 *
 * DS.inject('document', [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]);
 *
 * DS.filter('document'); // [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object|array} attrs The item or collection of items to inject into the data store.
 * @param {object=} options Optional configuration. Properties:
 * @returns {object|array} A reference to the item that was injected into the data store or an array of references to
 * the items that were injected into the data store.
 */
function inject(resourceName, attrs, options) {
  var IA = this.errors.IA;

  options = options || {};

  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isObject(attrs) && !this.utils.isArray(attrs)) {
    throw new IA(errorPrefix + 'attrs: Must be an object or an array!');
  } else if (!this.utils.isObject(options)) {
    throw new IA(errorPrefix + 'options: Must be an object!');
  }

  var definition = this.definitions[resourceName];
  var resource = this.store[resourceName];
  var _this = this;

  var injected;
  if (!this.$rootScope.$$phase) {
    this.$rootScope.$apply(function () {
      injected = _inject.call(_this, definition, resource, attrs);
    });
  } else {
    injected = _inject.call(_this, definition, resource, attrs);
  }
  if (definition.relations) {
    _injectRelations.call(_this, definition, injected);
  }

  return injected;
}

module.exports = inject;

},{"../../../lib/observe-js/observe-js":1}],57:[function(require,module,exports){
var errorPrefix = 'DS.lastModified(resourceName[, id]): ';

/**
 * @doc method
 * @id DS.sync_methods:lastModified
 * @name lastModified
 * @description
 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
 * with the given primary key was modified.
 *
 * ## Signature:
 * ```js
 * DS.lastModified(resourceName[, id])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.lastModified('document', 5); // undefined
 *
 *  DS.find('document', 5).then(function (document) {
 *      DS.lastModified('document', 5); // 1234235825494
 *  });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item to remove.
 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
 * `resourceName` with the given primary key was modified.
 */
function lastModified(resourceName, id) {
  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (id && !this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
  }
  if (id) {
    if (!(id in this.store[resourceName].modified)) {
      this.store[resourceName].modified[id] = 0;
    }
    return this.store[resourceName].modified[id];
  }
  return this.store[resourceName].collectionModified;
}

module.exports = lastModified;

},{}],58:[function(require,module,exports){
var errorPrefix = 'DS.lastSaved(resourceName[, id]): ';

/**
 * @doc method
 * @id DS.sync_methods:lastSaved
 * @name lastSaved
 * @description
 * Return the timestamp of the last time either the collection for `resourceName` or the item of type `resourceName`
 * with the given primary key was saved via an async adapter.
 *
 * ## Signature:
 * ```js
 * DS.lastSaved(resourceName[, id])
 * ```
 *
 * ## Example:
 *
 * ```js
 *  DS.lastModified('document', 5); // undefined
 *  DS.lastSaved('document', 5); // undefined
 *
 *  DS.find('document', 5).then(function (document) {
 *      DS.lastModified('document', 5); // 1234235825494
 *      DS.lastSaved('document', 5); // 1234235825494
 *
 *      document.author = 'Sally';
 *
 *      DS.lastModified('document', 5); // 1234304985344 - something different
 *      DS.lastSaved('document', 5); // 1234235825494 - still the same
 *  });
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item for which to retrieve the lastSaved timestamp.
 * @returns {number} The timestamp of the last time the item of type `resourceName` with the given primary key was saved.
 */
function lastSaved(resourceName, id) {
  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
  }
  if (!(id in this.store[resourceName].saved)) {
    this.store[resourceName].saved[id] = 0;
  }
  return this.store[resourceName].saved[id];
}

module.exports = lastSaved;

},{}],59:[function(require,module,exports){
var errorPrefix = 'DS.previous(resourceName, id): ';

/**
 * @doc method
 * @id DS.sync_methods:previous
 * @name previous
 * @description
 * Synchronously return the previous attributes of the item of the type specified by `resourceName` that has the primary key
 * specified by `id`. This object represents the state of the item the last time it was saved via an async adapter.
 *
 * ## Signature:
 * ```js
 * DS.previous(resourceName, id)
 * ```
 *
 * ## Example:
 *
 * ```js
 * var d = DS.get('document', 5); // { author: 'John Anderson', id: 5 }
 *
 * d.author = 'Sally';
 *
 * d; // { author: 'Sally', id: 5 }
 *
 * DS.previous('document', 5); // { author: 'John Anderson', id: 5 }
 * ```
 *
 * ## Throws
 *
 * - `{IllegalArgumentError}`
 * - `{NonexistentResourceError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item whose previous attributes are to be retrieved.
 * @returns {object} The previous attributes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function previous(resourceName, id) {
  if (!this.definitions[resourceName]) {
    throw new this.errors.NER(errorPrefix + resourceName);
  } else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
    throw new this.errors.IA(errorPrefix + 'id: Must be a string or a number!');
  }

  // return resource from cache
  return angular.copy(this.store[resourceName].previousAttributes[id]);
}

module.exports = previous;

},{}],60:[function(require,module,exports){
/**
 * @doc function
 * @id errors.types:IllegalArgumentError
 * @name IllegalArgumentError
 * @description Error that is thrown/returned when a caller does not honor the pre-conditions of a method/function.
 * @param {string=} message Error message. Default: `"Illegal Argument!"`.
 * @returns {IllegalArgumentError} A new instance of `IllegalArgumentError`.
 */
function IllegalArgumentError(message) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @doc property
   * @id errors.types:IllegalArgumentError.type
   * @name type
   * @propertyOf errors.types:IllegalArgumentError
   * @description Name of error type. Default: `"IllegalArgumentError"`.
   */
  this.type = this.constructor.name;

  /**
   * @doc property
   * @id errors.types:IllegalArgumentError.message
   * @name message
   * @propertyOf errors.types:IllegalArgumentError
   * @description Error message. Default: `"Illegal Argument!"`.
   */
  this.message = message || 'Illegal Argument!';
}

IllegalArgumentError.prototype = Object.create(Error.prototype);
IllegalArgumentError.prototype.constructor = IllegalArgumentError;

/**
 * @doc function
 * @id errors.types:RuntimeError
 * @name RuntimeError
 * @description Error that is thrown/returned for invalid state during runtime.
 * @param {string=} message Error message. Default: `"Runtime Error!"`.
 * @returns {RuntimeError} A new instance of `RuntimeError`.
 */
function RuntimeError(message) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @doc property
   * @id errors.types:RuntimeError.type
   * @name type
   * @propertyOf errors.types:RuntimeError
   * @description Name of error type. Default: `"RuntimeError"`.
   */
  this.type = this.constructor.name;

  /**
   * @doc property
   * @id errors.types:RuntimeError.message
   * @name message
   * @propertyOf errors.types:RuntimeError
   * @description Error message. Default: `"Runtime Error!"`.
   */
  this.message = message || 'RuntimeError Error!';
}

RuntimeError.prototype = Object.create(Error.prototype);
RuntimeError.prototype.constructor = RuntimeError;

/**
 * @doc function
 * @id errors.types:NonexistentResourceError
 * @name NonexistentResourceError
 * @description Error that is thrown/returned when trying to access a resource that does not exist.
 * @param {string=} resourceName Name of non-existent resource.
 * @returns {NonexistentResourceError} A new instance of `NonexistentResourceError`.
 */
function NonexistentResourceError(resourceName) {
  Error.call(this);
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @doc property
   * @id errors.types:NonexistentResourceError.type
   * @name type
   * @propertyOf errors.types:NonexistentResourceError
   * @description Name of error type. Default: `"NonexistentResourceError"`.
   */
  this.type = this.constructor.name;

  /**
   * @doc property
   * @id errors.types:NonexistentResourceError.message
   * @name message
   * @propertyOf errors.types:NonexistentResourceError
   * @description Error message. Default: `"Runtime Error!"`.
   */
  this.message = (resourceName || '') + ' is not a registered resource!';
}

NonexistentResourceError.prototype = Object.create(Error.prototype);
NonexistentResourceError.prototype.constructor = NonexistentResourceError;

/**
 * @doc interface
 * @id errors
 * @name angular-data error types
 * @description
 * Various error types that may be thrown by angular-data.
 *
 * - [IllegalArgumentError](/documentation/api/api/errors.types:IllegalArgumentError)
 * - [RuntimeError](/documentation/api/api/errors.types:RuntimeError)
 * - [NonexistentResourceError](/documentation/api/api/errors.types:NonexistentResourceError)
 *
 * References to the constructor functions of these errors can be found in `DS.errors`.
 */
module.exports = [function () {
  return {
    IllegalArgumentError: IllegalArgumentError,
    IA: IllegalArgumentError,
    RuntimeError: RuntimeError,
    R: RuntimeError,
    NonexistentResourceError: NonexistentResourceError,
    NER: NonexistentResourceError
  };
}];

},{}],61:[function(require,module,exports){
(function (window, angular, undefined) {
  'use strict';

  /**
   * @doc overview
   * @id angular-data
   * @name angular-data
   * @description
   * __Version:__ 0.10.0
   *
   * ## Install
   *
   * #### Bower
   * ```text
   * bower install angular-data
   * ```
   *
   * Load `dist/angular-data.js` or `dist/angular-data.min.js` onto your web page after Angular.js.
   *
   * #### Npm
   * ```text
   * npm install angular-data
   * ```
   *
   * Load `dist/angular-data.js` or `dist/angular-data.min.js` onto your web page after Angular.js.
   *
   * #### Manual download
   * Download angular-data-<%= pkg.version %>.js from the [Releases](https://github.com/jmdobry/angular-data/releases)
   * section of the angular-data GitHub project.
   *
   * ## Load into Angular
   * Your Angular app must depend on the module `"angular-data.DS"` in order to use angular-data. Loading
   * angular-data into your app allows you to inject the following:
   *
   * - `DS`
   * - `DSHttpAdapter`
   * - `DSUtils`
   * - `DSErrors`
   *
   * [DS](/documentation/api/api/DS) is the Data Store itself, which you will inject often.
   * [DSHttpAdapter](/documentation/api/api/DSHttpAdapter) is useful as a wrapper for `$http` and is configurable.
   * [DSUtils](/documentation/api/api/DSUtils) has some useful utility methods.
   * [DSErrors](/documentation/api/api/DSErrors) provides references to the various errors thrown by the data store.
   */
  angular.module('angular-data.DS', ['ng'])
    .factory('DSUtils', require('./utils'))
    .factory('DSErrors', require('./errors'))
    .provider('DSHttpAdapter', require('./adapters/http'))
    .provider('DSLocalStorageAdapter', require('./adapters/localStorage'))
    .provider('DS', require('./datastore'))
    .config(['$provide', function ($provide) {
      $provide.decorator('$q', ['$delegate', function ($delegate) {
        // do whatever you you want
        $delegate.promisify = function (fn, target) {
          var _this = this;
          return function () {
            var deferred = _this.defer(),
              args = Array.prototype.slice.apply(arguments);

            args.push(function (err, result) {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(result);
              }
            });

            try {
              fn.apply(target || this, args);
            } catch (err) {
              deferred.reject(err);
            }

            return deferred.promise;
          };
        };
        return $delegate;
      }]);
    }]);

})(window, window.angular);

},{"./adapters/http":31,"./adapters/localStorage":32,"./datastore":44,"./errors":60,"./utils":62}],62:[function(require,module,exports){
module.exports = [function () {
  return {
    isBoolean: require('mout/lang/isBoolean'),
    isString: angular.isString,
    isArray: angular.isArray,
    isObject: angular.isObject,
    isNumber: angular.isNumber,
    isFunction: angular.isFunction,
    isEmpty: require('mout/lang/isEmpty'),
    toJson: angular.toJson,
    makePath: require('mout/string/makePath'),
    upperCase: require('mout/string/upperCase'),
    deepMixIn: require('mout/object/deepMixIn'),
    forOwn: require('mout/object/forOwn'),
    pick: require('mout/object/pick'),
    set: require('mout/object/set'),
    contains: require('mout/array/contains'),
    filter: require('mout/array/filter'),
    toLookup: require('mout/array/toLookup'),
    slice: require('mout/array/slice'),
    sort: require('mout/array/sort'),
    updateTimestamp: function (timestamp) {
      var newTimestamp = typeof Date.now === 'function' ? Date.now() : new Date().getTime();
      if (timestamp && newTimestamp <= timestamp) {
        return timestamp + 1;
      } else {
        return newTimestamp;
      }
    },
    deepFreeze: function deepFreeze(o) {
      if (typeof Object.freeze === 'function') {
        var prop, propKey;
        Object.freeze(o); // First freeze the object.
        for (propKey in o) {
          prop = o[propKey];
          if (!o.hasOwnProperty(propKey) || typeof prop !== 'object' || Object.isFrozen(prop)) {
            // If the object is on the prototype, not an object, or is already frozen,
            // skip it. Note that this might leave an unfrozen reference somewhere in the
            // object if there is an already frozen object containing an unfrozen object.
            continue;
          }

          deepFreeze(prop); // Recursively call deepFreeze.
        }
      }
    },
    diffObjectFromOldObject: function (object, oldObject) {
      var added = {};
      var removed = {};
      var changed = {};

      for (var prop in oldObject) {
        var newValue = object[prop];

        if (newValue !== undefined && newValue === oldObject[prop])
          continue;

        if (!(prop in object)) {
          removed[prop] = undefined;
          continue;
        }

        if (newValue !== oldObject[prop])
          changed[prop] = newValue;
      }

      for (var prop2 in object) {
        if (prop2 in oldObject)
          continue;

        added[prop2] = object[prop2];
      }

      return {
        added: added,
        removed: removed,
        changed: changed
      };
    }
  };
}];

},{"mout/array/contains":2,"mout/array/filter":3,"mout/array/slice":7,"mout/array/sort":8,"mout/array/toLookup":9,"mout/lang/isBoolean":14,"mout/lang/isEmpty":15,"mout/object/deepMixIn":22,"mout/object/forOwn":24,"mout/object/pick":27,"mout/object/set":28,"mout/string/makePath":29,"mout/string/upperCase":30}]},{},[61])