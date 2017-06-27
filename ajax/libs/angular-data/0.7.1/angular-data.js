/**
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @file angular-data.js
 * @version 0.7.1 - Homepage <http://angular-data.codetrain.io/>
 * @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>
 * @license MIT <https://github.com/jmdobry/angular-data/blob/master/LICENSE>
 *
 * @overview Data store for Angular.js.
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"QYwGEY":[function(require,module,exports){
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
},{}],"observejs":[function(require,module,exports){
module.exports=require('QYwGEY');
},{}],3:[function(require,module,exports){
var indexOf = require('./indexOf');

    /**
     * If array contains values.
     */
    function contains(arr, val) {
        return indexOf(arr, val) !== -1;
    }
    module.exports = contains;


},{"./indexOf":5}],4:[function(require,module,exports){
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



},{"../function/makeIterator_":11}],5:[function(require,module,exports){


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


},{"./filter":4}],7:[function(require,module,exports){


    /**
     * Create slice of source array or array-like object
     */
    function slice(arr, start, end){
        if (start == null) {
            start = 0;
        } else if (start < 0) {
            start = Math.max(arr.length + start, 0);
        }

        if (end == null) {
            end = arr.length;
        } else if (end < 0) {
            end = Math.max(arr.length + end, 0);
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


},{"../lang/isFunction":15}],10:[function(require,module,exports){


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



},{"../object/deepMatches":20,"./identity":10,"./prop":12}],12:[function(require,module,exports){


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


},{"./isKind":16}],14:[function(require,module,exports){
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



},{"../object/forOwn":23,"./isArray":13}],15:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isFunction(val) {
        return isKind(val, 'Function');
    }
    module.exports = isFunction;


},{"./isKind":16}],16:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":18}],17:[function(require,module,exports){


    /**
     * Checks if the value is created by the `Object` constructor.
     */
    function isPlainObject(value) {
        return (!!value && typeof value === 'object' &&
            value.constructor === Object);
    }

    module.exports = isPlainObject;



},{}],18:[function(require,module,exports){


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


},{}],19:[function(require,module,exports){


    /**
     * Typecast a value to a String, using an empty string value for null or
     * undefined.
     */
    function toString(val){
        return val == null ? '' : val.toString();
    }

    module.exports = toString;



},{}],20:[function(require,module,exports){
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



},{"../lang/isArray":13,"./forOwn":23}],21:[function(require,module,exports){
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



},{"../lang/isPlainObject":17,"./forOwn":23}],22:[function(require,module,exports){
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



},{"./hasOwn":24}],23:[function(require,module,exports){
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



},{"./forIn":22,"./hasOwn":24}],24:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],25:[function(require,module,exports){
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


},{"../array/join":6,"../array/slice":7}],26:[function(require,module,exports){
var toString = require('../lang/toString');
    /**
     * "Safer" String.toUpperCase()
     */
    function upperCase(str){
        str = toString(str);
        return str.toUpperCase();
    }
    module.exports = upperCase;


},{"../lang/toString":19}],27:[function(require,module,exports){
/**
 * @doc function
 * @id DSHttpAdapterProvider
 * @name DSHttpAdapterProvider
 */
function DSHttpAdapterProvider() {

	this.$get = ['$http', '$log', 'DSUtils', function ($http, $log, DSUtils) {

		/**
		 * @doc property
		 * @id DSHttpAdapterProvider.properties:defaults
		 * @name defaults
		 * @description
		 * Default configuration for this adapter.
		 *
		 * Properties:
		 *
		 * - `{function}` - `serialize` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
		 * - `{function}` - `deserialize` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
		 * - `{function}` - `queryTransform` - See [the guide](/documentation/guide/adapters/index). Default: No-op.
		 */
		var defaults = this.defaults = {
			/**
			 * @doc property
			 * @id DSHttpAdapterProvider.properties:defaults.serialize
			 * @name defaults.serialize
			 * @description
			 * Your server might expect a custom request object rather than the plain POJO payload. Use `serialize` to
			 * create your custom request object.
			 *
			 * @param {object} data Data to be sent to the server.
			 * @returns {*} Returns `data` as-is.
			 */
			serialize: function (data) {
				return data;
			},

			/**
			 * @doc property
			 * @id DSHttpAdapterProvider.properties:defaults.deserialize
			 * @name defaults.deserialize
			 * @description
			 * Your server might return a custom response object instead of the plain POJO payload. Use `deserialize` to
			 * pull the payload out of your response object so angular-data can use it.
			 *
			 * @param {object} data Response object from `$http()`.
			 * @returns {*} Returns `data.data`.
			 */
			deserialize: function (data) {
				return data.data;
			},

			/**
			 * @doc property
			 * @id DSHttpAdapterProvider.properties:defaults.queryTransform
			 * @name defaults.queryTransform
			 * @description
			 * Transform the angular-data query to something your server understands. You might just do this on the server instead.
			 *
			 * @param {object} query Response object from `$http()`.
			 * @returns {*} Returns `query` as-is.
			 */
			queryTransform: function (query) {
				return query;
			}
		};

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

			createMany: function () {
				throw new Error('Not yet implemented!');
			},

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

			updateMany: function () {
				throw new Error('Not yet implemented!');
			},

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
				return defaults.deserialize(data);
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

		function find(resourceConfig, id, options) {
			options = options || {};
			return this.GET(
				DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint, id),
				options
			);
		}

		function findAll(resourceConfig, params, options) {
			options = options || {};
			options.params = options.params || {};
			if (options.params.query) {
				options.params.query = defaults.queryTransform(options.params.query);
			}
			DSUtils.deepMixIn(options, params);
			return this.GET(
				DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint),
				options
			);
		}

		function create(resourceConfig, attrs, options) {
			options = options || {};
			return this.POST(
				DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint),
				defaults.serialize(attrs),
				options
			);
		}

		function update(resourceConfig, id, attrs, options) {
			return this.PUT(
				DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint, id),
				defaults.serialize(attrs),
				options
			);
		}

		function destroy(resourceConfig, id, options) {
			options = options || {};
			return this.DEL(
				DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint, id),
				options
			);
		}

		function destroyAll(resourceConfig, params, options) {
			options = options || {};
			options.params = options.params || {};
			if (options.params.query) {
				options.params.query = defaults.queryTransform(options.params.query);
			}
			DSUtils.deepMixIn(options, params);
			return this.DEL(
				DSUtils.makePath(resourceConfig.baseUrl, resourceConfig.endpoint),
				options
			);
		}
	}];
}

module.exports = DSHttpAdapterProvider;

},{}],28:[function(require,module,exports){
var errorPrefix = 'DS.create(resourceName, attrs): ';

/**
 * @doc method
 * @id DS.async_methods:create
 * @name create
 * @description
 * Create a new resource and save it to the server.
 *
 * ## Signature:
 * ```js
 * DS.create(resourceName, attrs)
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
 * @param {object=} options Configuration options.
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Resolves with:
 *
 * - `{object}` - `item` - A reference to the newly created item.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 */
function create(resourceName, attrs, options) {
	var deferred = this.$q.defer(),
		promise = deferred.promise;

	options = options || {};

	if (!this.definitions[resourceName]) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!this.utils.isObject(attrs)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'attrs: Must be an object!', { attrs: { actual: typeof attrs, expected: 'object' } }));
	} else {
		try {
			var definition = this.definitions[resourceName],
				resource = this.store[resourceName],
				_this = this;

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
					return _this.adapters[options.adapter || definition.defaultAdapter].create(definition, attrs, options);
				})
				.then(function (data) {
					return _this.$q.promisify(definition.afterCreate)(resourceName, data);
				})
				.then(function (data) {
					var created = _this.inject(definition.name, data),
						id = created[definition.idAttribute];
					resource.previousAttributes[id] = _this.utils.deepMixIn({}, created);
					resource.saved[id] = _this.utils.updateTimestamp(resource.saved[id]);
					return _this.get(definition.name, id);
				});

			deferred.resolve(attrs);
		} catch (err) {
			deferred.reject(new this.errors.UnhandledError(err));
		}
	}

	return promise;
}

module.exports = create;

},{}],29:[function(require,module,exports){
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
 * - `{UnhandledError}`
 */
function destroy(resourceName, id, options) {
	var deferred = this.$q.defer(),
		promise = deferred.promise;

	options = options || {};

	if (!this.definitions[resourceName]) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	} else if (!(id in this.store[resourceName].index)) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + 'id: "' + id + '" not found!'));
	} else {
		var definition = this.definitions[resourceName],
			resource = this.store[resourceName],
			_this = this;

		if (id in resource.index) {
			promise = promise
				.then(function (attrs) {
					return _this.$q.promisify(definition.beforeDestroy)(resourceName, attrs);
				})
				.then(function () {
					return _this.adapters[options.adapter || definition.defaultAdapter].destroy(definition, id, options);
				})
				.then(function () {
					return _this.$q.promisify(definition.afterDestroy)(resourceName, resource.index[id]);
				})
				.then(function () {
					_this.eject(resourceName, id);
					return id;
				});
			deferred.resolve(resource.index[id]);
		} else {
			deferred.resolve();
		}
	}

	return promise;
}

module.exports = destroy;

},{}],30:[function(require,module,exports){
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
 *  var query = {
 *      where: {
 *          author: {
 *              '==': 'John Anderson'
 *          }
 *      }
 *  };
 *
 *  DS.destroyAll('document', {
 *      query: query
 *  }).then(function (documents) {
 *      // The documents are gone from the data store
 *      DS.filter('document', {
 *          query: query
 *      }); // []
 *
 *  }, function (err) {
 *      // handle error
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
 *      - `{object=}` - `where` - Where clause.
 *      - `{number=}` - `limit` - Limit clause.
 *      - `{skip=}` - `skip` - Skip clause.
 *      - `{orderBy=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 * - `{boolean=}` - `bypassCache` - Bypass the cache. Default: `false`.
 *
 * @returns {Promise} Promise produced by the `$q` service.
 *
 * ## Rejects with:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 */
function destroyAll(resourceName, params, options) {
	var deferred = this.$q.defer(),
		promise = deferred.promise,
		_this = this;

	options = options || {};

	if (!this.definitions[resourceName]) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!this.utils.isObject(params)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } }));
	} else if (!this.utils.isObject(options)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else {
		try {
			var definition = this.definitions[resourceName];

			promise = promise
				.then(function () {
					return _this.adapters[options.adapter || definition.defaultAdapter].destroyAll(definition, { params: params }, options);
				})
				.then(function () {
					return _this.ejectAll(resourceName, params);
				});
			deferred.resolve();
		} catch (err) {
			deferred.reject(new this.errors.UnhandledError(err));
		}
	}

	return promise;
}

module.exports = destroyAll;

},{}],31:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 */
function find(resourceName, id, options) {
	var deferred = this.$q.defer(),
		promise = deferred.promise;

	options = options || {};

	if (!this.definitions[resourceName]) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	} else if (!this.utils.isObject(options)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else {
		if (!('cacheResponse' in options)) {
			options.cacheResponse = true;
		} else {
			options.cacheResponse = !!options.cacheResponse;
		}
		try {
			var definition = this.definitions[resourceName],
				resource = this.store[resourceName],
				_this = this;

			if (options.bypassCache) {
				delete resource.completedQueries[id];
			}

			if (!(id in resource.completedQueries)) {
				if (!(id in resource.pendingQueries)) {
					promise = resource.pendingQueries[id] = _this.adapters[options.adapter || definition.defaultAdapter].find(definition, id, options)
						.then(function (data) {
							if (options.cacheResponse) {
								// Query is no longer pending
								delete resource.pendingQueries[id];
								resource.completedQueries[id] = new Date().getTime();
								return _this.inject(resourceName, data);
							} else {
								return data;
							}
						});
				}

				return resource.pendingQueries[id];
			} else {
				deferred.resolve(_this.get(resourceName, id));
			}
		} catch (err) {
			deferred.reject(err);
		}
	}

	return promise;
}

module.exports = find;

},{}],32:[function(require,module,exports){
var errorPrefix = 'DS.findAll(resourceName, params[, options]): ';

function processResults(utils, data, resourceName, queryHash) {
	var resource = this.store[resourceName];

	data = data || [];

	// Query is no longer pending
	delete resource.pendingQueries[queryHash];
	resource.completedQueries[queryHash] = new Date().getTime();

	// Merge the new values into the cache
	for (var i = 0; i < data.length; i++) {
		this.inject(resourceName, data[i]);
	}

	// Update the data store's index for this resource
	resource.index = utils.toLookup(resource.collection, this.definitions[resourceName].idAttribute);

	// Update modified timestamp of collection
	resource.collectionModified = utils.updateTimestamp(resource.collectionModified);
	return data;
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
			resource.pendingQueries[queryHash] = _this.adapters[options.adapter || definition.defaultAdapter].findAll(definition, { params: params }, options)
				.then(function (data) {
					if (options.cacheResponse) {
						try {
							return processResults.apply(_this, [utils, data, resourceName, queryHash]);
						} catch (err) {
							throw new _this.errors.UnhandledError(err);
						}
					} else {
						return data;
					}
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
 *  var query = {
 *      where: {
 *          author: {
 *              '==': 'John Anderson'
 *          }
 *      }
 *  };
 *
 *  DS.findAll('document', {
 *      query: query
 *  }).then(function (documents) {
 *      documents;  // [{ id: 'aab7ff66-e21e-46e2-8be8-264d82aee535', author: 'John Anderson', title: 'How to cook' },
 *                  //  { id: 'ee7f3f4d-98d5-4934-9e5a-6a559b08479f', author: 'John Anderson', title: 'How NOT to cook' }]
 *
 *      // The documents are now in the data store
 *      DS.filter('document', {
 *          query: query
 *      }); // [{ id: 'aab7ff66-e21e-46e2-8be8-264d82aee535', author: 'John Anderson', title: 'How to cook' },
 *          //  { id: 'ee7f3f4d-98d5-4934-9e5a-6a559b08479f', author: 'John Anderson', title: 'How NOT to cook' }]
 *
 *  }, function (err) {
 *      // handle error
 *  });
 * ```
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
 *      - `{object=}` - `where` - Where clause.
 *      - `{number=}` - `limit` - Limit clause.
 *      - `{skip=}` - `skip` - Skip clause.
 *      - `{orderBy=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 */
function findAll(resourceName, params, options) {
	var deferred = this.$q.defer(),
		promise = deferred.promise,
		_this = this;

	options = options || {};

	if (!this.definitions[resourceName]) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!this.utils.isObject(params)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } }));
	} else if (!this.utils.isObject(options)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else {
		if (!('cacheResponse' in options)) {
			options.cacheResponse = true;
		} else {
			options.cacheResponse = !!options.cacheResponse;
		}
		try {
			promise = promise.then(function () {
				return _findAll.apply(_this, [_this.utils, resourceName, params, options]);
			});
			deferred.resolve();
		} catch (err) {
			deferred.reject(new this.errors.UnhandledError(err));
		}
	}

	return promise;
}

module.exports = findAll;

},{}],33:[function(require,module,exports){
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
	save: require('./save')
};

},{"./create":28,"./destroy":29,"./destroyAll":30,"./find":31,"./findAll":32,"./refresh":34,"./save":35}],34:[function(require,module,exports){
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
 * - `{RuntimeError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to refresh from the server.
 * @param {object=} options Optional configuration. Properties:
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 */
function refresh(resourceName, id, options) {
	options = options || {};

	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	} else if (!this.utils.isObject(options)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	} else {
		options.bypassCache = true;

		if (id in this.store[resourceName].index) {
			return this.find(resourceName, id, options);
		} else {
			return false;
		}
	}
}

module.exports = refresh;

},{}],35:[function(require,module,exports){
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
 * @param {object=} options Optional configuration. Properties:
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
 * - `{UnhandledError}`
 */
function save(resourceName, id, options) {
	var deferred = this.$q.defer(),
		promise = deferred.promise;

	options = options || {};

	if (!this.definitions[resourceName]) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	} else if (!this.utils.isObject(options)) {
		deferred.reject(new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else if (!(id in this.store[resourceName].index)) {
		deferred.reject(new this.errors.RuntimeError(errorPrefix + 'id: "' + id + '" not found!'));
	} else {
		var definition = this.definitions[resourceName],
			resource = this.store[resourceName],
			_this = this;

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
				return _this.adapters[options.adapter || definition.defaultAdapter].update(definition, id, attrs, options);
			})
			.then(function (data) {
				return _this.$q.promisify(definition.afterUpdate)(resourceName, data);
			})
			.then(function (data) {
				_this.inject(definition.name, data, options);
				resource.previousAttributes[id] = _this.utils.deepMixIn({}, data);
				resource.saved[id] = _this.utils.updateTimestamp(resource.saved[id]);
				return _this.get(resourceName, id);
			});

		deferred.resolve(resource.index[id]);
	}

	return promise;
}

module.exports = save;

},{}],36:[function(require,module,exports){
var utils = require('../utils')[0]();

function lifecycleNoop(resourceName, attrs, cb) {
	cb(null, attrs);
}

function BaseConfig() {
}

BaseConfig.prototype.idAttribute = 'id';
BaseConfig.prototype.defaultAdapter = 'DSHttpAdapter';
BaseConfig.prototype.filter = function (resourceName, where, attrs) {
	var keep = true;
	utils.forOwn(where, function (clause, field) {
		if (utils.isString(clause)) {
			clause = {
				'===': clause
			};
		} else if (utils.isNumber(clause)) {
			clause = {
				'==': clause
			};
		}
		if ('==' in clause) {
			keep = keep && (attrs[field] == clause['==']);
		} else if ('===' in clause) {
			keep = keep && (attrs[field] === clause['===']);
		} else if ('!=' in clause) {
			keep = keep && (attrs[field] != clause['!=']);
		} else if ('>' in clause) {
			keep = keep && (attrs[field] > clause['>']);
		} else if ('>=' in clause) {
			keep = keep && (attrs[field] >= clause['>=']);
		} else if ('<' in clause) {
			keep = keep && (attrs[field] < clause['<']);
		} else if ('<=' in clause) {
			keep = keep && (attrs[field] <= clause['<=']);
		} else if ('in' in clause) {
			keep = keep && utils.contains(clause['in'], attrs[field]);
		}
	});
	return keep;
};
BaseConfig.prototype.baseUrl = '';
BaseConfig.prototype.endpoint = '';
BaseConfig.prototype.beforeValidate = lifecycleNoop;
BaseConfig.prototype.validate = lifecycleNoop;
BaseConfig.prototype.afterValidate = lifecycleNoop;
BaseConfig.prototype.beforeCreate = lifecycleNoop;
BaseConfig.prototype.afterCreate = lifecycleNoop;
BaseConfig.prototype.beforeUpdate = lifecycleNoop;
BaseConfig.prototype.afterUpdate = lifecycleNoop;
BaseConfig.prototype.beforeDestroy = lifecycleNoop;
BaseConfig.prototype.afterDestroy = lifecycleNoop;

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
	 * - `{string}` - `baseUrl`
	 * - `{string}` - `idAttribute` - Default: `"id"`
	 * - `{string}` - `defaultAdapter` - Default: `"DSHttpAdapter"`
	 * - `{function}` - `filter` - Default: See [angular-data query language](/documentation/guide/queries/custom).
	 * - `{function}` - `beforeValidate` - See [](). Default: No-op
	 * - `{function}` - `validate` - See [](). Default: No-op
	 * - `{function}` - `afterValidate` - See [](). Default: No-op
	 * - `{function}` - `beforeCreate` - See [](). Default: No-op
	 * - `{function}` - `afterCreate` - See [](). Default: No-op
	 * - `{function}` - `beforeUpdate` - See [](). Default: No-op
	 * - `{function}` - `afterUpdate` - See [](). Default: No-op
	 * - `{function}` - `beforeDestroy` - See [](). Default: No-op
	 * - `{function}` - `afterDestroy` - See [](). Default: No-op
	 */
	var defaults = this.defaults = new BaseConfig();

	this.$get = [
		'$rootScope', '$log', '$q', 'DSHttpAdapter', 'DSUtils', 'DSErrors',
		function ($rootScope, $log, $q, DSHttpAdapter, DSUtils, DSErrors) {

			var syncMethods = require('./sync_methods'),
				asyncMethods = require('./async_methods');

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
					DSHttpAdapter: DSHttpAdapter
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
		}];
}

module.exports = DSProvider;

},{"../utils":"iWjGJZ","./async_methods":33,"./sync_methods":45}],37:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item of the changes to retrieve.
 * @returns {object} The changes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function changes(resourceName, id) {
	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		return angular.copy(this.store[resourceName].changes[id]);
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = changes;

},{}],38:[function(require,module,exports){
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
 * - `{UnhandledError}`
 *
 * @param {string|object} definition Name of resource or resource definition object: Properties:
 *
 * - `{string}` - `name` - The name by which this resource will be identified.
 * - `{string="id"}` - `idAttribute` - The attribute that specifies the primary key for this resource.
 * - `{string=}` - `endpoint` - The attribute that specifies the primary key for this resource. Default is the value of `name`.
 * - `{string=}` - `baseUrl` - The url relative to which all AJAX requests will be made.
 * - `{function=}` - `beforeValidate` - Lifecycle hook. Overrides global. Signature: `beforeValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `validate` - Lifecycle hook. Overrides global. Signature: `validate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterValidate` - Lifecycle hook. Overrides global. Signature: `afterValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeCreate` - Lifecycle hook. Overrides global. Signature: `beforeCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterCreate` - Lifecycle hook. Overrides global. Signature: `afterCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeUpdate` - Lifecycle hook. Overrides global. Signature: `beforeUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterUpdate` - Lifecycle hook. Overrides global. Signature: `afterUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeDestroy` - Lifecycle hook. Overrides global. Signature: `beforeDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterDestroy` - Lifecycle hook. Overrides global. Signature: `afterDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 */
function defineResource(definition) {
	if (this.utils.isString(definition)) {
		definition = {
			name: definition
		};
	}
	if (!this.utils.isObject(definition)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'definition: Must be an object!', { definition: { actual: typeof definition, expected: 'object' } });
	} else if (!this.utils.isString(definition.name)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'definition.name: Must be a string!', { definition: { name: { actual: typeof definition.name, expected: 'string' } } });
	} else if (definition.idAttribute && !this.utils.isString(definition.idAttribute)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'definition.idAttribute: Must be a string!', { definition: { idAttribute: { actual: typeof definition.idAttribute, expected: 'string' } } });
	} else if (definition.endpoint && !this.utils.isString(definition.endpoint)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'definition.endpoint: Must be a string!', { definition: { endpoint: { actual: typeof definition.endpoint, expected: 'string' } } });
	} else if (this.store[definition.name]) {
		throw new this.errors.RuntimeError(errorPrefix + definition.name + ' is already registered!');
	}

	try {
		Resource.prototype = this.defaults;
		this.definitions[definition.name] = new Resource(this.utils, definition);

		this.store[definition.name] = {
			collection: [],
			completedQueries: {},
			pendingQueries: {},
			index: {},
			changes: {},
			modified: {},
			saved: {},
			previousAttributes: {},
			observers: {},
			collectionModified: 0
		};
	} catch (err) {
		delete this.definitions[definition.name];
		delete this.store[definition.name];
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = defineResource;

},{}],39:[function(require,module,exports){
var observe = require('observejs');

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
 * ## Throws
 *
 * - `{UnhandledError}`
 */
function digest() {
	try {
		if (!this.$rootScope.$$phase) {
			this.$rootScope.$apply(function () {
				observe.Platform.performMicrotaskCheckpoint();
			});
		} else {
			observe.Platform.performMicrotaskCheckpoint();
		}
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = digest;

},{"observejs":"QYwGEY"}],40:[function(require,module,exports){
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
		delete resource.index[id];
		delete resource.changes[id];
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to eject.
 */
function eject(resourceName, id) {
	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	var resource = this.store[resourceName],
		_this = this;

	try {
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
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = eject;

},{}],41:[function(require,module,exports){
var errorPrefix = 'DS.ejectAll(resourceName[, params]): ';

function _ejectAll(definition, resource, params) {
	var queryHash = this.utils.toJson(params),
		items = this.filter(definition.name, params);

	for (var i = 0; i < items.length; i++) {
		this.eject(definition.name, items[i][definition.idAttribute]);
	}

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
 * DS.ejectAll('document', { query: { where: { author: 'Sally Jane' } } });
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
 *      - `{object=}` - `where` - Where clause.
 *      - `{number=}` - `limit` - Limit clause.
 *      - `{skip=}` - `skip` - Skip clause.
 *      - `{orderBy=}` - `orderBy` - OrderBy clause.
 */
function ejectAll(resourceName, params) {
	params = params || {};

	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isObject(params)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } });
	}

	var resource = this.store[resourceName],
		_this = this;

	try {
		if (!this.$rootScope.$$phase) {
			this.$rootScope.$apply(function () {
				_ejectAll.apply(_this, [_this.definitions[resourceName], resource, params]);
				resource.collectionModified = _this.utils.updateTimestamp(resource.collectionModified);
			});
		} else {
			_ejectAll.apply(_this, [_this.definitions[resourceName], resource, params]);
			resource.collectionModified = this.utils.updateTimestamp(resource.collectionModified);
		}
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = ejectAll;

},{}],42:[function(require,module,exports){
/* jshint loopfunc: true */
var errorPrefix = 'DS.filter(resourceName, params[, options]): ';

/**
 * @doc method
 * @id DS.sync_methods:filter
 * @name filter
 * @description
 * Synchronously filter items in the data store of the type specified by `resourceName`.
 *
 * ## Signature:
 * ```js
 * DS.filter(resourceName, params[, options])
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object} params Parameter object that is serialized into the query string. Properties:
 *
 * - `{object=}` - `query` - The query object by which to filter items of the type specified by `resourceName`. Properties:
 *      - `{object=}` - `where` - Where clause.
 *      - `{number=}` - `limit` - Limit clause.
 *      - `{skip=}` - `skip` - Skip clause.
 *      - `{orderBy=}` - `orderBy` - OrderBy clause.
 *
 * @param {object=} options Optional configuration. Properties:
 * - `{boolean=}` - `loadFromServer` - Send the query to server if it has not been sent yet. Default: `false`.
 * @returns {array} The filtered collection of items of the type specified by `resourceName`.
 */
function filter(resourceName, params, options) {
	options = options || {};

	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isObject(params)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } });
	} else if (!this.utils.isObject(options)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	try {
		var definition = this.definitions[resourceName],
			resource = this.store[resourceName],
			_this = this;

		// Protect against null
		params.query = params.query || {};

		var queryHash = this.utils.toJson(params);

		if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
			// This particular query has never been completed

			if (!resource.pendingQueries[queryHash]) {
				// This particular query has never even been started
				this.findAll(resourceName, params, options);
			}
		}

		// The query has been completed, so hit the cache with the query
		var filtered = this.utils.filter(resource.collection, function (attrs) {
			var keep = true,
				where = params.query.where;

			// Apply 'where' clauses
			if (where) {
				if (!_this.utils.isObject(where)) {
					throw new _this.errors.IllegalArgumentError(errorPrefix + 'params.query.where: Must be an object!', { params: { query: { where: { actual: typeof params.query.where, expected: 'object' } } } });
				}
				keep = definition.filter(resourceName, where, attrs);
			}
			return keep;
		});

		// Apply 'orderBy'
		if (params.query.orderBy) {
			if (this.utils.isString(params.query.orderBy)) {
				params.query.orderBy = [
					[params.query.orderBy, 'ASC']
				];
			}
			if (this.utils.isArray(params.query.orderBy)) {
				for (var i = 0; i < params.query.orderBy.length; i++) {
					if (this.utils.isString(params.query.orderBy[i])) {
						params.query.orderBy[i] = [params.query.orderBy[i], 'ASC'];
					} else if (!this.utils.isArray(params.query.orderBy[i])) {
						throw new this.errors.IllegalArgumentError(errorPrefix + 'params.query.orderBy[' + i + ']: Must be a string or an array!', { params: { query: { 'orderBy[i]': { actual: typeof params.query.orderBy[i], expected: 'string|array' } } } });
					}
					filtered = this.utils.sort(filtered, function (a, b) {
						var cA = a[params.query.orderBy[i][0]], cB = b[params.query.orderBy[i][0]];
						if (_this.utils.isString(cA)) {
							cA = _this.utils.upperCase(cA);
						}
						if (_this.utils.isString(cB)) {
							cB = _this.utils.upperCase(cB);
						}
						if (params.query.orderBy[i][1] === 'DESC') {
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
				}
			} else {
				throw new this.errors.IllegalArgumentError(errorPrefix + 'params.query.orderBy: Must be a string or an array!', { params: { query: { orderBy: { actual: typeof params.query.orderBy, expected: 'string|array' } } } });
			}
		}

		// Apply 'limit' and 'skip'
		if (this.utils.isNumber(params.query.limit) && this.utils.isNumber(params.query.skip)) {
			filtered = this.utils.slice(filtered, params.query.skip, Math.min(filtered.length, params.query.skip + params.query.limit));
		} else if (this.utils.isNumber(params.query.limit)) {
			filtered = this.utils.slice(filtered, 0, Math.min(filtered.length, params.query.limit));
		} else if (this.utils.isNumber(params.query.skip)) {
			if (params.query.skip < filtered.length) {
				filtered = this.utils.slice(filtered, params.query.skip);
			} else {
				filtered = [];
			}
		}

		return filtered;
	} catch (err) {
		if (err instanceof this.errors.IllegalArgumentError) {
			throw err;
		} else {
			throw new this.errors.UnhandledError(err);
		}
	}
}

module.exports = filter;

},{}],43:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item to retrieve.
 * @param {object=} options Optional configuration. Properties:
 * - `{boolean=}` - `loadFromServer` - Send the query to server if it has not been sent yet. Default: `false`.
 * @returns {object} The item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function get(resourceName, id, options) {
	options = options || {};

	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	} else if (!this.utils.isObject(options)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	try {
		// cache miss, request resource from server
		if (!(id in this.store[resourceName].index) && options.loadFromServer) {
			this.find(resourceName, id).then(null, function (err) {
				throw err;
			});
		}

		// return resource from cache
		return this.store[resourceName].index[id];
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = get;

},{}],44:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item.
 * @returns {boolean} Whether the item of the type specified by `resourceName` with the primary key specified by `id` has changes.
 */
function hasChanges(resourceName, id) {
	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		if (id in this.store[resourceName].changes) {
			return diffIsEmpty(this.utils, this.store[resourceName].changes[id]);
		} else {
			return false;
		}
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = hasChanges;

},{}],45:[function(require,module,exports){
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

},{"./changes":37,"./defineResource":38,"./digest":39,"./eject":40,"./ejectAll":41,"./filter":42,"./get":43,"./hasChanges":44,"./inject":46,"./lastModified":47,"./lastSaved":48,"./previous":49}],46:[function(require,module,exports){
var observe = require('observejs'),
	errorPrefix = 'DS.inject(resourceName, attrs[, options]): ';

function _inject(definition, resource, attrs) {
	var _this = this;

	function _react(added, removed, changed, getOldValueFn) {
		try {
			var innerId = getOldValueFn(definition.idAttribute);

			resource.changes[innerId] = _this.utils.diffObjectFromOldObject(resource.index[innerId], resource.previousAttributes[innerId]);
			resource.modified[innerId] = _this.utils.updateTimestamp(resource.modified[innerId]);
			resource.collectionModified = _this.utils.updateTimestamp(resource.collectionModified);

			if (definition.idAttribute in changed) {
				$log.error('Doh! You just changed the primary key of an object! ' +
					'I don\'t know how to handle this yet, so your data for the "' + definition.name +
					'" resource is now in an undefined (probably broken) state.');
			}
		} catch (err) {
			throw new _this.errors.UnhandledError(err);
		}
	}

	if (_this.utils.isArray(attrs)) {
		for (var i = 0; i < attrs.length; i++) {
			_inject.call(_this, definition, resource, attrs[i]);
		}
	} else {
		if (!(definition.idAttribute in attrs)) {
			throw new _this.errors.RuntimeError(errorPrefix + 'attrs: Must contain the property specified by `idAttribute`!');
		} else {
			var id = attrs[definition.idAttribute];

			if (!(id in resource.index)) {
				resource.index[id] = {};
				resource.previousAttributes[id] = {};

				_this.utils.deepMixIn(resource.index[id], attrs);
				_this.utils.deepMixIn(resource.previousAttributes[id], attrs);

				resource.collection.push(resource.index[id]);

				resource.observers[id] = new observe.ObjectObserver(resource.index[id], _react);

				_react({}, {}, {}, function () {
					return id;
				});
			} else {
				_this.utils.deepMixIn(resource.index[id], attrs);
				resource.observers[id].deliver();
			}
		}
	}
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
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {object|array} attrs The item or collection of items to inject into the data store.
 * @param {object=} options Optional configuration. Properties:
 * @returns {object|array} A reference to the item that was injected into the data store or an array of references to
 * the items that were injected into the data store.
 */
function inject(resourceName, attrs, options) {
	options = options || {};

	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isObject(attrs) && !this.utils.isArray(attrs)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'attrs: Must be an object or an array!', { attrs: { actual: typeof attrs, expected: 'object|array' } });
	} else if (!this.utils.isObject(options)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	var definition = this.definitions[resourceName],
		resource = this.store[resourceName],
		_this = this;

	try {
		if (!this.$rootScope.$$phase) {
			this.$rootScope.$apply(function () {
				_inject.apply(_this, [definition, resource, attrs]);
			});
		} else {
			_inject.apply(_this, [definition, resource, attrs]);
		}
		return attrs;
	} catch (err) {
		if (!(err instanceof this.errors.RuntimeError)) {
			throw new this.errors.UnhandledError(err);
		} else {
			throw err;
		}
	}
}

module.exports = inject;

},{"observejs":"QYwGEY"}],47:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item to remove.
 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
 * `resourceName` with the given primary key was modified.
 */
function lastModified(resourceName, id) {
	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (id && !this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}
	try {
		if (id) {
			if (!(id in this.store[resourceName].modified)) {
				this.store[resourceName].modified[id] = 0;
			}
			return this.store[resourceName].modified[id];
		}
		return this.store[resourceName].collectionModified;
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = lastModified;

},{}],48:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number=} id The primary key of the item to remove.
 * @returns {number} The timestamp of the last time either the collection for `resourceName` or the item of type
 * `resourceName` with the given primary key was modified.
 */
function lastSaved(resourceName, id) {
	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (id && !this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}
	try {
		if (id) {
			if (!(id in this.store[resourceName].saved)) {
				this.store[resourceName].saved[id] = 0;
			}
			return this.store[resourceName].saved[id];
		}
		return this.store[resourceName].collectionModified;
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = lastSaved;

},{}],49:[function(require,module,exports){
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
 * - `{RuntimeError}`
 * - `{UnhandledError}`
 *
 * @param {string} resourceName The resource type, e.g. 'user', 'comment', etc.
 * @param {string|number} id The primary key of the item whose previous attributes are to be retrieved.
 * @returns {object} The previous attributes of the item of the type specified by `resourceName` with the primary key specified by `id`.
 */
function previous(resourceName, id) {
	if (!this.definitions[resourceName]) {
		throw new this.errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!this.utils.isString(id) && !this.utils.isNumber(id)) {
		throw new this.errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		return angular.copy(this.store[resourceName].previousAttributes[id]);
	} catch (err) {
		throw new this.errors.UnhandledError(err);
	}
}

module.exports = previous;

},{}],"errors":[function(require,module,exports){
module.exports=require('ht0wMj');
},{}],"ht0wMj":[function(require,module,exports){
/**
 * @doc function
 * @id errors.types:UnhandledError
 * @name UnhandledError
 * @description Error that is thrown/returned when Reheat encounters an uncaught/unknown exception.
 * @param {Error} error The originally thrown error.
 * @returns {UnhandledError} A new instance of `UnhandledError`.
 */
function UnhandledError(error) {
	Error.call(this);
	if (typeof Error.captureStackTrace === 'function') {
		Error.captureStackTrace(this, this.constructor);
	}

	error = error || {};

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.type
	 * @name type
	 * @propertyOf errors.types:UnhandledError
	 * @description Name of error type. Default: `"UnhandledError"`.
	 */
	this.type = this.constructor.name;

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.originalError
	 * @name originalError
	 * @propertyOf errors.types:UnhandledError
	 * @description A reference to the original error that was thrown.
	 */
	this.originalError = error;

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.message
	 * @name message
	 * @propertyOf errors.types:UnhandledError
	 * @description Message and stack trace. Same as `UnhandledError#stack`.
	 */
	this.message = 'UnhandledError: This is an uncaught exception. Please consider submitting an issue at https://github.com/jmdobry/angular-data/issues.\n\n' +
		'Original Uncaught Exception:\n' + (error.stack ? error.stack.toString() : error.stack);

	/**
	 * @doc property
	 * @id errors.types:UnhandledError.stack
	 * @name stack
	 * @propertyOf errors.types:UnhandledError
	 * @description Message and stack trace. Same as `UnhandledError#message`.
	 */
	this.stack = this.message;
}

UnhandledError.prototype = Object.create(Error.prototype);
UnhandledError.prototype.constructor = UnhandledError;

/**
 * @doc function
 * @id errors.types:IllegalArgumentError
 * @name IllegalArgumentError
 * @description Error that is thrown/returned when a caller does not honor the pre-conditions of a method/function.
 * @param {string=} message Error message. Default: `"Illegal Argument!"`.
 * @param {object=} errors Object containing information about the error.
 * @returns {IllegalArgumentError} A new instance of `IllegalArgumentError`.
 */
function IllegalArgumentError(message, errors) {
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
	 * @id errors.types:IllegalArgumentError.errors
	 * @name errors
	 * @propertyOf errors.types:IllegalArgumentError
	 * @description Object containing information about the error.
	 */
	this.errors = errors || {};

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
 * @param {object=} errors Object containing information about the error.
 * @returns {RuntimeError} A new instance of `RuntimeError`.
 */
function RuntimeError(message, errors) {
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
	 * @id errors.types:RuntimeError.errors
	 * @name errors
	 * @propertyOf errors.types:RuntimeError
	 * @description Object containing information about the error.
	 */
	this.errors = errors || {};

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
 * @doc interface
 * @id errors
 * @name angular-data error types
 * @description
 * Various error types that may be thrown by angular-data.
 *
 * - [UnhandledError](/documentation/api/api/errors.types:UnhandledError)
 * - [IllegalArgumentError](/documentation/api/api/errors.types:IllegalArgumentError)
 * - [RuntimeError](/documentation/api/api/errors.types:RuntimeError)
 *
 * References to the constructor functions of these errors can be found in `DS.errors`.
 */
module.exports = [function () {
	return {
		UnhandledError: UnhandledError,
		IllegalArgumentError: IllegalArgumentError,
		RuntimeError: RuntimeError
	};
}];

},{}],52:[function(require,module,exports){
(function (window, angular, undefined) {
	'use strict';

	/**
	 * @doc overview
	 * @id angular-data
	 * @name angular-data
	 * @description
	 * __Version:__ 0.7.1
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
	 * Download angular-data.0.7.1.js from the [Releases](https://github.com/jmdobry/angular-data/releases)
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
		.service('DSUtils', require('./utils'))
		.service('DSErrors', require('./errors'))
		.provider('DSHttpAdapter', require('./adapters/http'))
		.provider('DS', require('./datastore'))
		.config(['$provide', function ($provide) {
			$provide.decorator('$q', function ($delegate) {
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
			});
		}]);

})(window, window.angular);

},{"./adapters/http":27,"./datastore":36,"./errors":"ht0wMj","./utils":"iWjGJZ"}],"utils":[function(require,module,exports){
module.exports=require('iWjGJZ');
},{}],"iWjGJZ":[function(require,module,exports){
module.exports = [function () {
	return {
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

},{"mout/array/contains":3,"mout/array/filter":4,"mout/array/slice":7,"mout/array/sort":8,"mout/array/toLookup":9,"mout/lang/isEmpty":14,"mout/object/deepMixIn":21,"mout/object/forOwn":23,"mout/string/makePath":25,"mout/string/upperCase":26}]},{},[52])
