/**
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @file angular-data.js
 * @version 0.5.0 - Homepage <http://jmdobry.github.io/angular-data/>
 * @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/angular-data>
 * @license MIT <https://github.com/jmdobry/angular-data/blob/master/LICENSE>
 *
 * @overview Data store for Angular.js.
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"u+GZEJ":[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};// Copyright 2012 Google Inc.
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

},{}],"observejs":[function(require,module,exports){
module.exports=require('u+GZEJ');
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


    var arrSlice = Array.prototype.slice;

    /**
     * Create slice of source array or array-like object
     */
    function slice(arr, start, end){
        return arrSlice.call(arr, start, end);
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
            while (key = _dontEnums[i++]) {
                // since we aren't using hasOwn check we need to make sure the
                // property was overwritten
                if (obj[key] !== Object.prototype[key]) {
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



},{}],23:[function(require,module,exports){
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


},{"../lang/toString":19}],"clHM+W":[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services');

function _$http(deferred, config) {
	var start = new Date().getTime();

	services.$http(config).success(function (data, status, headers, config) {
		services.$log.debug(config.method + ' request:' + config.url + ' Time taken: ' + (new Date().getTime() - start) + 'ms', arguments);
		deferred.resolve(data);
	}).error(function (data, status, headers, config) {
			services.$log.error(arguments);
			deferred.reject(data);
		});
}

/**
 * @doc method
 * @id DS.async_methods:HTTP
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
function HTTP(config) {
	var deferred = services.$q.defer();

	try {
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				_$http(deferred, config);
			});
		} else {
			_$http(deferred, config);
		}
	} catch (err) {
		deferred.reject(new errors.UnhandledError(err));
	}

	return deferred.promise;
}

/**
 * @doc method
 * @id DS.async_methods:GET
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
function GET(url, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		method: 'GET'
	}));
}

/**
 * @doc method
 * @id DS.async_methods:PUT
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
function PUT(url, attrs, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		data: attrs,
		method: 'PUT'
	}));
}

/**
 * @doc method
 * @id DS.async_methods:POST
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
function POST(url, attrs, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		data: attrs,
		method: 'POST'
	}));
}

/**
 * @doc method
 * @id DS.async_methods:DEL
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
function DEL(url, config) {
	config = config || {};
	return HTTP(utils.deepMixIn(config, {
		url: url,
		method: 'DELETE'
	}));
}

module.exports = {
	/**
	 * @doc method
	 * @id DS.async_methods:HTTP
	 * @name HTTP
	 * @methodOf DS
	 * @description
	 * See [DS.HTTP](/documentation/api/api/DS.async_methods:HTTP).
	 */
	HTTP: HTTP,

	/**
	 * @doc method
	 * @id DS.async_methods:GET
	 * @name GET
	 * @methodOf DS
	 * @description
	 * See [DS.GET](/documentation/api/api/DS.async_methods:GET).
	 */
	GET: GET,

	/**
	 * @doc method
	 * @id DS.async_methods:POST
	 * @name POST
	 * @methodOf DS
	 * @description
	 * See [DS.POST](/documentation/api/api/DS.async_methods:POST).
	 */
	POST: POST,

	/**
	 * @doc method
	 * @id DS.async_methods:PUT
	 * @name PUT
	 * @methodOf DS
	 * @description
	 * See [DS.PUT](/documentation/api/api/DS.async_methods:PUT).
	 */
	PUT: PUT,

	/**
	 * @doc method
	 * @id DS.async_methods:DEL
	 * @name DEL
	 * @methodOf DS
	 * @description
	 * See [DS.DEL](/documentation/api/api/DS.async_methods:DEL).
	 */
	DEL: DEL
};

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],"HttpAdapter":[function(require,module,exports){
module.exports=require('clHM+W');
},{}],29:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.create(resourceName, attrs): ';

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
function create(resourceName, attrs) {
	var deferred = services.$q.defer(),
		promise = deferred.promise;

	if (!services.store[resourceName]) {
		deferred.reject(new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!utils.isObject(attrs)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'attrs: Must be an object!', { attrs: { actual: typeof attrs, expected: 'object' } }));
	} else {
		try {
			var resource = services.store[resourceName],
				_this = this;

			promise = promise
				.then(function (attrs) {
					return services.$q.promisify(resource.beforeValidate)(resourceName, attrs);
				})
				.then(function (attrs) {
					return services.$q.promisify(resource.validate)(resourceName, attrs);
				})
				.then(function (attrs) {
					return services.$q.promisify(resource.afterValidate)(resourceName, attrs);
				})
				.then(function (attrs) {
					return services.$q.promisify(resource.beforeCreate)(resourceName, attrs);
				})
				.then(function (attrs) {
					return services.adapters[resource.defaultAdapter].POST.apply(_this, [utils.makePath(resource.baseUrl, resource.endpoint), attrs, null]);
				})
				.then(function (data) {
					return services.$q.promisify(resource.afterCreate)(resourceName, data);
				})
				.then(function (data) {
					return _this.inject(resource.name, data);
				});

			deferred.resolve(attrs);
		} catch (err) {
			deferred.reject(new errors.UnhandledError(err));
		}
	}

	return promise;
}

module.exports = create;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],30:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.destroy(resourceName, id): ';

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
function destroy(resourceName, id) {
	var deferred = services.$q.defer(),
		promise = deferred.promise;

	if (!services.store[resourceName]) {
		deferred.reject(new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	} else {
		var resource = services.store[resourceName],
			_this = this;

		promise = promise
			.then(function (attrs) {
				return services.$q.promisify(resource.beforeDestroy)(resourceName, attrs);
			})
			.then(function () {
				return services.adapters[resource.defaultAdapter].DEL(utils.makePath(resource.baseUrl, resource.endpoint, id), null);
			})
			.then(function () {
				return services.$q.promisify(resource.afterDestroy)(resourceName, resource.index[id]);
			})
			.then(function () {
				_this.eject(resourceName, id);
				return id;
			});

		deferred.resolve(resource.index[id]);
	}

	return promise;
}

module.exports = destroy;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],31:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.find(resourceName, id[, options]): ';

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
 * - `{string=}` - `mergeStrategy` - If `findAll` is called, specify the merge strategy that should be used when the new
 * items are injected into the data store. Default: `"mergeWithExisting"`.
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
	var deferred = services.$q.defer(),
		promise = deferred.promise;

	options = options || {};

	if (!services.store[resourceName]) {
		deferred.reject(new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	} else if (!utils.isObject(options)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else {
		try {
			var resource = services.store[resourceName],
				_this = this;

			if (options.bypassCache) {
				delete resource.completedQueries[id];
			}

			if (!(id in resource.completedQueries)) {
				if (!(id in resource.pendingQueries)) {
					promise = resource.pendingQueries[id] = services.adapters[resource.defaultAdapter].GET(utils.makePath(resource.baseUrl, resource.endpoint, id), null)
						.then(function (data) {
							// Query is no longer pending
							delete resource.pendingQueries[id];
							resource.completedQueries[id] = new Date().getTime();
							return _this.inject(resourceName, data);
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

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],32:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.findAll(resourceName, params[, options]): ';

function processResults(data, resourceName, queryHash) {
	var resource = services.store[resourceName];

	data = data || [];

	// Query is no longer pending
	delete resource.pendingQueries[queryHash];
	resource.completedQueries[queryHash] = new Date().getTime();

	// Merge the new values into the cache
	for (var i = 0; i < data.length; i++) {
		this.inject(resourceName, data[i]);
	}

	// Update the data store's index for this resource
	resource.index = utils.toLookup(resource.collection, resource.idAttribute);

	// Update modified timestamp of collection
	resource.collectionModified = utils.updateTimestamp(resource.collectionModified);
	return data;
}

function _findAll(resourceName, params, options) {
	var resource = services.store[resourceName],
		_this = this,
		queryHash = utils.toJson(params);

	if (options.bypassCache) {
		delete resource.completedQueries[queryHash];
	}

	if (!(queryHash in resource.completedQueries)) {
		// This particular query has never been completed

		if (!(queryHash in resource.pendingQueries)) {

			// This particular query has never even been made
			resource.pendingQueries[queryHash] = services.adapters[resource.defaultAdapter].GET(utils.makePath(resource.baseUrl, resource.endpoint), { params: params })
				.then(function (data) {
					try {
						return processResults.apply(_this, [data, resourceName, queryHash]);
					} catch (err) {
						throw new errors.UnhandledError(err);
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
 * - `{string=}` - `mergeStrategy` - If `findAll` is called, specify the merge strategy that should be used when the new
 * items are injected into the data store. Default `"mergeWithExisting"`.
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
	var deferred = services.$q.defer(),
		promise = deferred.promise,
		_this = this;

	options = options || {};

	if (!services.store[resourceName]) {
		deferred.reject(new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!utils.isObject(params)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } }));
	} else if (!utils.isObject(options)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else {
		try {
			promise = promise.then(function () {
				return _findAll.apply(_this, [resourceName, params, options]);
			});
			deferred.resolve();
		} catch (err) {
			deferred.reject(new errors.UnhandledError(err));
		}
	}

	return promise;
}

module.exports = findAll;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],33:[function(require,module,exports){
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

},{"./create":29,"./destroy":30,"./find":31,"./findAll":32,"./refresh":34,"./save":35}],34:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.refresh(resourceName, id[, options]): ';

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
 * - `{string=}` - `mergeStrategy` - Specify what merge strategy is to be used when the fresh item returns from the
 * server and needs to be inserted into the data store. Default `"mergeWithExisting"`.
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

	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	} else if (!utils.isObject(options)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	} else {
		options.bypassCache = true;

		if (id in services.store[resourceName].index) {
			return this.find(resourceName, id, options);
		} else {
			return false;
		}
	}
}

module.exports = refresh;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],35:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.save(resourceName, id[, options]): ';

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
 * - `{string=}` - `mergeStrategy` - When the updated item returns from the server, specify the merge strategy that
 * should be used when the updated item is injected into the data store. Default: `"mergeWithExisting"`.
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
 * - `{UnhandledError}`
 */
function save(resourceName, id, options) {
	var deferred = services.$q.defer(),
		promise = deferred.promise;

	options = options || {};

	if (!services.store[resourceName]) {
		deferred.reject(new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!'));
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } }));
	} else if (!utils.isObject(options)) {
		deferred.reject(new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } }));
	} else if (!(id in services.store[resourceName].index)) {
		deferred.reject(new errors.RuntimeError(errorPrefix + 'id: "' + id + '" not found!'));
	} else {
		var resource = services.store[resourceName],
			_this = this;

		promise = promise
			.then(function (attrs) {
				return services.$q.promisify(resource.beforeValidate)(resourceName, attrs);
			})
			.then(function (attrs) {
				return services.$q.promisify(resource.validate)(resourceName, attrs);
			})
			.then(function (attrs) {
				return services.$q.promisify(resource.afterValidate)(resourceName, attrs);
			})
			.then(function (attrs) {
				return services.$q.promisify(resource.beforeUpdate)(resourceName, attrs);
			})
			.then(function (attrs) {
				return services.adapters[resource.defaultAdapter].PUT(utils.makePath(resource.baseUrl, resource.endpoint, id), attrs, null);
			})
			.then(function (data) {
				return services.$q.promisify(resource.afterUpdate)(resourceName, data);
			})
			.then(function (data) {
				var saved = _this.inject(resource.name, data, options);
				resource.previous_attributes[id] = utils.deepMixIn({}, data);
				resource.saved[id] = utils.updateTimestamp(resource.saved[id]);
				return saved;
			});

		deferred.resolve(resource.index[id]);
	}

	return promise;
}

module.exports = save;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],36:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	HttpAdapter = require('HttpAdapter'),
	configErrorPrefix = 'DSProvider.config(options): ',
	registerAdapterErrorPrefix = 'DSProvider.registerAdapter(name, adapter): ';

/**
 * @doc method
 * @id DSProvider.methods:config
 * @name config
 * @description
 * Configure the DS service.
 *
 * ## Signature:
 * ```js
 * DSProvider.config(options)
 * ```
 *
 * ## Example:
 * ```js
 *  DSProvider.config({
 *      baseUrl: 'http://myapp.com/api',
 *      idAttribute: '_id',
 *      validate: function (resourceName, attrs, cb) {
 *          console.log('looks good to me');
 *          cb(null, attrs);
 *      }
 *  });
 * ```
 *
 * ## Throws:
 *
 * - `{IllegalArgumentError}`
 *
 * @param {object} options Global configuration for the data store. Properties:
 * - `{string=}` - `baseUrl` - The default base url to be used by the data store. Can be overridden via `DS.defineResource`.
 * - `{string=}` - `idAttribute` - The default property that specifies the primary key of an object. Default: `"id"`.
 * - `{function=}` - `beforeValidate` - Global lifecycle hook. Signature: `beforeValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `validate` - Global lifecycle hook. Signature: `validate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterValidate` - Global lifecycle hook. Signature: `afterValidate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeCreate` - Global lifecycle hook. Signature: `beforeCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterCreate` - Global lifecycle hook. Signature: `afterCreate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeUpdate` - Global lifecycle hook. Signature: `beforeUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterUpdate` - Global lifecycle hook. Signature: `afterUpdate(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `beforeDestroy` - Global lifecycle hook. Signature: `beforeDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 * - `{function=}` - `afterDestroy` - Global lifecycle hook. Signature: `afterDestroy(resourceName, attrs, cb)`. Callback signature: `cb(err, attrs)`.
 */
function config(options) {
	options = options || {};

	if (!utils.isObject(options)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options: Must be an object!', { actual: typeof options, expected: 'object' });
	} else if ('baseUrl' in options && !utils.isString(options.baseUrl)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.baseUrl: Must be a string!', { baseUrl: { actual: typeof options.baseUrl, expected: 'string' } });
	} else if ('idAttribute' in options && !utils.isString(options.idAttribute)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.idAttribute: Must be a string!', { idAttribute: { actual: typeof options.idAttribute, expected: 'string' } });
	} else if ('mergeStrategy' in options && !utils.isString(options.mergeStrategy)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.mergeStrategy: Must be a string!', { mergeStrategy: { actual: typeof options.mergeStrategy, expected: 'string' } });
	} else if ('beforeValidate' in options && !utils.isFunction(options.beforeValidate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.beforeValidate: Must be a function!', { beforeValidate: { actual: typeof options.beforeValidate, expected: 'function' } });
	} else if ('validate' in options && !utils.isFunction(options.validate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.validate: Must be a function!', { validate: { actual: typeof options.validate, expected: 'function' } });
	} else if ('afterValidate' in options && !utils.isFunction(options.afterValidate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.afterValidate: Must be a function!', { afterValidate: { actual: typeof options.afterValidate, expected: 'function' } });
	} else if ('beforeCreate' in options && !utils.isFunction(options.beforeCreate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.beforeCreate: Must be a function!', { beforeCreate: { actual: typeof options.beforeCreate, expected: 'function' } });
	} else if ('afterCreate' in options && !utils.isFunction(options.afterCreate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.afterCreate: Must be a function!', { afterCreate: { actual: typeof options.afterCreate, expected: 'function' } });
	} else if ('beforeUpdate' in options && !utils.isFunction(options.beforeUpdate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.beforeUpdate: Must be a function!', { beforeUpdate: { actual: typeof options.beforeUpdate, expected: 'function' } });
	} else if ('afterUpdate' in options && !utils.isFunction(options.afterUpdate)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.afterUpdate: Must be a function!', { afterUpdate: { actual: typeof options.afterUpdate, expected: 'function' } });
	} else if ('beforeDestroy' in options && !utils.isFunction(options.beforeDestroy)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.beforeDestroy: Must be a function!', { beforeDestroy: { actual: typeof options.beforeDestroy, expected: 'function' } });
	} else if ('afterDestroy' in options && !utils.isFunction(options.afterDestroy)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.afterDestroy: Must be a function!', { afterDestroy: { actual: typeof options.afterDestroy, expected: 'function' } });
	} else if ('defaultAdapter' in options && !utils.isString(options.defaultAdapter)) {
		throw new errors.IllegalArgumentError(configErrorPrefix + 'options.defaultAdapter: Must be a function!', { defaultAdapter: { actual: typeof options.defaultAdapter, expected: 'string' } });
	}

	services.config = new services.BaseConfig(options);
}

/**
 * @doc method
 * @id DSProvider.methods:registerAdapter
 * @name registerAdapter
 * @description
 * Register a new adapter.
 *
 * ## Signature:
 * ```js
 * DSProvider.registerAdapter(name, adapter);
 * ```
 *
 * ## Example:
 * ```js
 *  DSProvider.registerAdapter('IndexedDBAdapter', {...});
 * ```
 *
 * ## Throws:
 *
 * - `{IllegalArgumentError}`
 * - `{RuntimeError}`
 *
 * @param {string} name The name of the new adapter.
 * @param {object} adapter New adapter.
 */
function registerAdapter(name, adapter) {

	if (!utils.isString(name)) {
		throw new errors.IllegalArgumentError(registerAdapterErrorPrefix + 'name: Must be a string!', { actual: typeof name, expected: 'string' });
	} else if (!utils.isObject(adapter)) {
		throw new errors.IllegalArgumentError(registerAdapterErrorPrefix + 'adapter: Must be an object!', { actual: typeof adapter, expected: 'object' });
	} else if (services.adapters[name]) {
		throw new errors.RuntimeError(registerAdapterErrorPrefix + name + ' is already registered!');
	}

	services.adapters[name] = adapter;
}

/**
 * @doc interface
 * @id DSProvider
 * @name DSProvider
 */
function DSProvider() {

	/**
	 * @doc method
	 * @id DSProvider.methods:config
	 * @name config
	 * @methodOf DSProvider
	 * @description
	 * See [DSProvider.config](/documentation/api/api/DSProvider.methods:config).
	 */
	this.config = config;

	config({});

	/**
	 * @doc method
	 * @id DSProvider.methods:registerAdapter
	 * @name config
	 * @methodOf DSProvider
	 * @description
	 * See [DSProvider.registerAdapter](/documentation/api/api/DSProvider.methods:registerAdapter).
	 */
	this.registerAdapter = registerAdapter;

	this.$get = ['$rootScope', '$log', '$http', '$q', function ($rootScope, $log, $http, $q) {

		services.$rootScope = $rootScope;
		services.$log = $log;
		services.$http = $http;
		services.$q = $q;
		services.store = {};
		services.adapters = {};

		registerAdapter('HttpAdapter', HttpAdapter);

		/**
		 * @doc interface
		 * @id DS
		 * @name DS
		 * @description
		 * Data store
		 */
		var DS = {
			HttpAdapter: HttpAdapter,
			errors: errors
		};

		utils.deepMixIn(DS, require('./sync_methods'));
		utils.deepMixIn(DS, require('./async_methods'));

		utils.deepFreeze(DS);

		var $dirtyCheckScope = $rootScope.$new();

		$dirtyCheckScope.$watch(function () {
			// Throttle angular-data's digest loop to tenths of a second
			return new Date().getTime() / 100 | 0;
		}, function () {
			DS.digest();
		});

		return DS;
	}];
}

module.exports = DSProvider;

},{"./async_methods":33,"./sync_methods":46,"HttpAdapter":"clHM+W","errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],"cX8q+p":[function(require,module,exports){
function lifecycleNoop(resourceName, attrs, cb) {
	cb(null, attrs);
}

var services = module.exports = {
	store: {},
	BaseConfig: function (options) {
		if ('idAttribute' in options) {
			this.idAttribute = options.idAttribute;
		}

		if ('baseUrl' in options) {
			this.baseUrl = options.baseUrl;
		}

		if ('beforeValidate' in options) {
			this.beforeValidate = options.beforeValidate;
		}

		if ('validate' in options) {
			this.validate = options.validate;
		}

		if ('afterValidate' in options) {
			this.afterValidate = options.afterValidate;
		}

		if ('beforeCreate' in options) {
			this.beforeCreate = options.beforeCreate;
		}

		if ('afterCreate' in options) {
			this.afterCreate = options.afterCreate;
		}

		if ('beforeUpdate' in options) {
			this.beforeUpdate = options.beforeUpdate;
		}

		if ('afterUpdate' in options) {
			this.afterUpdate = options.afterUpdate;
		}

		if ('beforeDestroy' in options) {
			this.beforeDestroy = options.beforeDestroy;
		}

		if ('afterDestroy' in options) {
			this.afterDestroy = options.afterDestroy;
		}

		if ('defaultAdapter' in options) {
			this.defaultAdapter = options.defaultAdapter;
		}
	}
};

services.BaseConfig.prototype.idAttribute = 'id';
services.BaseConfig.prototype.defaultAdapter = 'HttpAdapter';
services.BaseConfig.prototype.baseUrl = '';
services.BaseConfig.prototype.endpoint = '';
services.BaseConfig.prototype.beforeValidate = lifecycleNoop;
services.BaseConfig.prototype.validate = lifecycleNoop;
services.BaseConfig.prototype.afterValidate = lifecycleNoop;
services.BaseConfig.prototype.beforeCreate = lifecycleNoop;
services.BaseConfig.prototype.afterCreate = lifecycleNoop;
services.BaseConfig.prototype.beforeUpdate = lifecycleNoop;
services.BaseConfig.prototype.afterUpdate = lifecycleNoop;
services.BaseConfig.prototype.beforeDestroy = lifecycleNoop;
services.BaseConfig.prototype.afterDestroy = lifecycleNoop;

},{}],"services":[function(require,module,exports){
module.exports=require('cX8q+p');
},{}],39:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.changes(resourceName, id): ';

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
	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		return angular.copy(services.store[resourceName].changes[id]);
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = changes;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],40:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.defineResource(definition): ';

function Resource(options) {
	services.BaseConfig.apply(this, [options]);

	if ('name' in options) {
		this.name = options.name;
	}

	if ('endpoint' in options) {
		this.endpoint = options.endpoint;
	} else {
		this.endpoint = this.name;
	}

	this.collection = [];
	this.completedQueries = {};
	this.pendingQueries = {};
	this.index = {};
	this.modified = {};
	this.changes = {};
	this.previous_attributes = {};
	this.saved = {};
	this.observers = {};
	this.collectionModified = 0;
}

Resource.prototype = services.config;

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
	if (utils.isString(definition)) {
		definition = {
			name: definition
		};
	}
	if (!utils.isObject(definition)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'definition: Must be an object!', { definition: { actual: typeof definition, expected: 'object' } });
	} else if (!utils.isString(definition.name)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'definition.name: Must be a string!', { definition: { name: { actual: typeof definition.name, expected: 'string' } } });
	} else if (definition.idAttribute && !utils.isString(definition.idAttribute)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'definition.idAttribute: Must be a string!', { definition: { idAttribute: { actual: typeof definition.idAttribute, expected: 'string' } } });
	} else if (definition.endpoint && !utils.isString(definition.endpoint)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'definition.endpoint: Must be a string!', { definition: { endpoint: { actual: typeof definition.endpoint, expected: 'string' } } });
	} else if (services.store[definition.name]) {
		throw new errors.RuntimeError(errorPrefix + definition.name + ' is already registered!');
	}

	try {
		services.store[definition.name] = new Resource(definition);
	} catch (err) {
		delete services.store[definition.name];
		throw new errors.UnhandledError(err);
	}
}

module.exports = defineResource;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],41:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	observe = require('observejs');

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
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				observe.Platform.performMicrotaskCheckpoint();
			});
		} else {
			observe.Platform.performMicrotaskCheckpoint();
		}
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = digest;

},{"errors":"hIh4e1","observejs":"u+GZEJ","services":"cX8q+p","utils":"uE/lJt"}],42:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.eject(resourceName, id): ';

function _eject(resource, id) {
	if (id) {
		var found = false;
		for (var i = 0; i < resource.collection.length; i++) {
			if (resource.collection[i][resource.idAttribute] == id) {
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
			delete resource.previous_attributes[id];
			delete resource.modified[id];
			delete resource.saved[id];
		}
	} else {
		resource.collection = [];
		resource.index = {};
		resource.modified = {};
		resource.saved = {};
		resource.changes = {};
		resource.previous_attributes = {};
	}
	resource.collectionModified = utils.updateTimestamp(resource.collectionModified);
}

/**
 * @doc method
 * @id DS.sync_methods:eject
 * @name eject
 * @description
 * Eject the item of the specified type that has the given primary key from the data store. If no primary key is
 * provided, eject all items of the specified type from the data store. Ejection only removes items from the data store
 * and does not attempt to delete items on the server.
 *
 * ## Signature:
 * ```js
 * DS.eject(resourceName[, id])
 * ```
 *
 * ## Examples:
 *
 * ```js
 * DS.get('document', 45); // { title: 'How to Cook', id: 45 }
 *
 * DS.eject('document', 45);
 *
 * DS.get('document', 45); // undefined
 * ```
 *
 * Eject all items of the specified type from the data store.
 *
 * ```js
 * DS.filter('document'); // [ { title: 'How to Cook', id: 45 }, { title: 'How to Eat', id: 46 } ]
 *
 * DS.eject('document');
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
 * @param {string|number=} id The primary key of the item to eject.
 */
function eject(resourceName, id) {
	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (id && !utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				_eject(services.store[resourceName], id);
			});
		} else {
			_eject(services.store[resourceName], id);
		}
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = eject;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],43:[function(require,module,exports){
/* jshint loopfunc: true */
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.filter(resourceName, params[, options]): ';

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
 * - `{string=}` - `mergeStrategy` - If `findAll` is called, specify the merge strategy that should be used when the new
 * items are injected into the data store. Default: `"mergeWithExisting"`.
 *
 * @returns {array} The filtered collection of items of the type specified by `resourceName`.
 */
function filter(resourceName, params, options) {
	options = options || {};

	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isObject(params)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'params: Must be an object!', { params: { actual: typeof params, expected: 'object' } });
	} else if (!utils.isObject(options)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	try {
		var resource = services.store[resourceName];

		// Protect against null
		params.query = params.query || {};

		var queryHash = utils.toJson(params);

		if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
			// This particular query has never been completed

			if (!resource.pendingQueries[queryHash]) {
				// This particular query has never even been started
				this.findAll(resourceName, params, options);
			}
		}

		// The query has been completed, so hit the cache with the query
		var filtered = utils.filter(resource.collection, function (value) {
			var keep = true;

			// Apply 'where' clauses
			if (params.query.where) {
				if (!utils.isObject(params.query.where)) {
					throw new errors.IllegalArgumentError(errorPrefix + 'params.query.where: Must be an object!', { params: { query: { where: { actual: typeof params.query.where, expected: 'object' } } } });
				}
				utils.forOwn(params.query.where, function (value2, key2) {
					if (utils.isString(value2)) {
						value2 = {
							'===': value2
						};
					}
					if ('==' in value2) {
						keep = keep && (value[key2] == value2['==']);
					} else if ('===' in value2) {
						keep = keep && (value[key2] === value2['===']);
					} else if ('!=' in value2) {
						keep = keep && (value[key2] != value2['!=']);
					} else if ('>' in value2) {
						keep = keep && (value[key2] > value2['>']);
					} else if ('>=' in value2) {
						keep = keep && (value[key2] >= value2['>=']);
					} else if ('<' in value2) {
						keep = keep && (value[key2] < value2['<']);
					} else if ('<=' in value2) {
						keep = keep && (value[key2] <= value2['<=']);
					} else if ('in' in value2) {
						keep = keep && utils.contains(value2['in'], value[key2]);
					}
				});
			}
			return keep;
		});

		// Apply 'orderBy'
		if (params.query.orderBy) {
			if (utils.isString(params.query.orderBy)) {
				params.query.orderBy = [
					[params.query.orderBy, 'ASC']
				];
			}
			if (utils.isArray(params.query.orderBy)) {
				for (var i = 0; i < params.query.orderBy.length; i++) {
					if (utils.isString(params.query.orderBy[i])) {
						params.query.orderBy[i] = [params.query.orderBy[i], 'ASC'];
					} else if (!utils.isArray(params.query.orderBy[i])) {
						throw new errors.IllegalArgumentError(errorPrefix + 'params.query.orderBy[' + i + ']: Must be a string or an array!', { params: { query: { 'orderBy[i]': { actual: typeof params.query.orderBy[i], expected: 'string|array' } } } });
					}
					filtered = utils.sort(filtered, function (a, b) {
						var cA = a[params.query.orderBy[i][0]], cB = b[params.query.orderBy[i][0]];
						if (utils.isString(cA)) {
							cA = utils.upperCase(cA);
						}
						if (utils.isString(cB)) {
							cB = utils.upperCase(cB);
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
				throw new errors.IllegalArgumentError(errorPrefix + 'params.query.orderBy: Must be a string or an array!', { params: { query: { orderBy: { actual: typeof params.query.orderBy, expected: 'string|array' } } } });
			}
		}

		// Apply 'limit' and 'skip'
		if (utils.isNumber(params.query.limit) && utils.isNumber(params.query.skip)) {
			filtered = utils.slice(filtered, params.query.skip, params.query.skip + params.query.limit);
		} else if (utils.isNumber(params.query.limit)) {
			filtered = utils.slice(filtered, 0, params.query.limit);
		} else if (utils.isNumber(params.query.skip)) {
			filtered = utils.slice(filtered, params.query.skip);
		}

		return filtered;
	} catch (err) {
		if (err instanceof errors.IllegalArgumentError) {
			throw err;
		} else {
			throw new errors.UnhandledError(err);
		}
	}
}

module.exports = filter;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],44:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.get(resourceName, id[, options]): ';

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

	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	} else if (!utils.isObject(options)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	try {
		// cache miss, request resource from server
		if (!(id in services.store[resourceName].index) && options.loadFromServer) {
			this.find(resourceName, id).then(null, function (err) {
				throw err;
			});
		}

		// return resource from cache
		return services.store[resourceName].index[id];
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = get;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],45:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.hasChanges(resourceName, id): ';

function diffIsEmpty(diff) {
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
	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		if (id in services.store[resourceName].changes) {
			return diffIsEmpty(services.store[resourceName].changes[id]);
		} else {
			return false;
		}
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = hasChanges;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],46:[function(require,module,exports){
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

},{"./changes":39,"./defineResource":40,"./digest":41,"./eject":42,"./filter":43,"./get":44,"./hasChanges":45,"./inject":47,"./lastModified":48,"./lastSaved":49,"./previous":50}],47:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	observe = require('observejs'),
	errorPrefix = 'DS.inject(resourceName, attrs[, options]): ';

function _inject(resource, attrs) {
	var _this = this;

	function _react(added, removed, changed, getOldValueFn) {
		try {
			var innerId = getOldValueFn(resource.idAttribute);

			resource.changes[innerId] = utils.diffObjectFromOldObject(resource.index[innerId], resource.previous_attributes[innerId]);
			resource.modified[innerId] = utils.updateTimestamp(resource.modified[innerId]);
			resource.collectionModified = utils.updateTimestamp(resource.collectionModified);

			if (resource.idAttribute in changed) {
				services.$log.error('Doh! You just changed the primary key of an object! ' +
					'I don\'t know how to handle this yet, so your data for the "' + resource.name +
					'" resource is now in an undefined (probably broken) state.');
			}
		} catch (err) {
			throw new errors.UnhandledError(err);
		}
	}

	if (utils.isArray(attrs)) {
		for (var i = 0; i < attrs.length; i++) {
			_inject.call(_this, resource, attrs[i]);
		}
	} else {
		if (!(resource.idAttribute in attrs)) {
			throw new errors.RuntimeError(errorPrefix + 'attrs: Must contain the property specified by `idAttribute`!');
		} else {
			var id = attrs[resource.idAttribute];

			if (!(id in resource.index)) {
				resource.index[id] = {};
				resource.previous_attributes[id] = {};

				utils.deepMixIn(resource.index[id], attrs);
				utils.deepMixIn(resource.previous_attributes[id], attrs);

				resource.collection.push(resource.index[id]);

				resource.observers[id] = new observe.ObjectObserver(resource.index[id], _react);

				_react({}, {}, {}, function () {
					return id;
				});
			} else {
				utils.deepMixIn(resource.index[id], attrs);
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
 * - `{string=}` - `mergeStrategy` - Specify the merge strategy to use if the item is already in the cache. Default: `"mergeWithExisting"`.
 * @returns {object|array} A reference to the item that was injected into the data store or an array of references to
 * the items that were injected into the data store.
 */
function inject(resourceName, attrs, options) {
	options = options || {};

	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isObject(attrs) && !utils.isArray(attrs)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'attrs: Must be an object or an array!', { attrs: { actual: typeof attrs, expected: 'object|array' } });
	} else if (!utils.isObject(options)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'options: Must be an object!', { options: { actual: typeof options, expected: 'object' } });
	}

	var resource = services.store[resourceName],
		_this = this;

	try {
		if (!services.$rootScope.$$phase) {
			services.$rootScope.$apply(function () {
				_inject.apply(_this, [services.store[resourceName], attrs]);
			});
		} else {
			_inject.apply(_this, [services.store[resourceName], attrs]);
		}
		return attrs;
	} catch (err) {
		if (!(err instanceof errors.RuntimeError)) {
			throw new errors.UnhandledError(err);
		} else {
			throw err;
		}
	}
}

module.exports = inject;

},{"errors":"hIh4e1","observejs":"u+GZEJ","services":"cX8q+p","utils":"uE/lJt"}],48:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.lastModified(resourceName[, id]): ';

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
	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (id && !utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}
	try {
		if (id) {
			if (!(id in services.store[resourceName].modified)) {
				services.store[resourceName].modified[id] = 0;
			}
			return services.store[resourceName].modified[id];
		}
		return services.store[resourceName].collectionModified;
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = lastModified;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],49:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.lastSaved(resourceName[, id]): ';

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
	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (id && !utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}
	try {
		if (id) {
			if (!(id in services.store[resourceName].saved)) {
				services.store[resourceName].saved[id] = 0;
			}
			return services.store[resourceName].saved[id];
		}
		return services.store[resourceName].collectionModified;
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = lastSaved;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],50:[function(require,module,exports){
var utils = require('utils'),
	errors = require('errors'),
	services = require('services'),
	errorPrefix = 'DS.previous(resourceName, id): ';

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
	if (!services.store[resourceName]) {
		throw new errors.RuntimeError(errorPrefix + resourceName + ' is not a registered resource!');
	} else if (!utils.isString(id) && !utils.isNumber(id)) {
		throw new errors.IllegalArgumentError(errorPrefix + 'id: Must be a string or a number!', { id: { actual: typeof id, expected: 'string|number' } });
	}

	try {
		// return resource from cache
		return angular.copy(services.store[resourceName].previous_attributes[id]);
	} catch (err) {
		throw new errors.UnhandledError(err);
	}
}

module.exports = previous;

},{"errors":"hIh4e1","services":"cX8q+p","utils":"uE/lJt"}],"errors":[function(require,module,exports){
module.exports=require('hIh4e1');
},{}],"hIh4e1":[function(require,module,exports){
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
 * @id errors.types:ValidationError
 * @name ValidationError
 * @description Error that is thrown/returned when validation of a schema fails.
 * @param {string=} message Error message. Default: `"Validation Error!"`.
 * @param {object=} errors Object containing information about the error.
 * @returns {ValidationError} A new instance of `ValidationError`.
 */
function ValidationError(message, errors) {
	Error.call(this);
	if (typeof Error.captureStackTrace === 'function') {
		Error.captureStackTrace(this, this.constructor);
	}

	/**
	 * @doc property
	 * @id errors.types:ValidationError.type
	 * @name type
	 * @propertyOf errors.types:ValidationError
	 * @description Name of error type. Default: `"ValidationError"`.
	 */
	this.type = this.constructor.name;

	/**
	 * @doc property
	 * @id errors.types:ValidationError.errors
	 * @name errors
	 * @propertyOf errors.types:ValidationError
	 * @description Object containing information about the error.
	 */
	this.errors = errors || {};

	/**
	 * @doc property
	 * @id errors.types:ValidationError.message
	 * @name message
	 * @propertyOf errors.types:ValidationError
	 * @description Error message. Default: `"Validation Error!"`.
	 */
	this.message = message || 'Validation Error!';
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

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
 * `UnhandledError`, `IllegalArgumentError`, `RuntimeError` and `ValidationError`.
 *
 * References to the constructor functions of these errors can be found at `DS.errors`.
 */
module.exports = {
	UnhandledError: UnhandledError,
	IllegalArgumentError: IllegalArgumentError,
	ValidationError: ValidationError,
	RuntimeError: RuntimeError
};

},{}],53:[function(require,module,exports){
(function (window, angular, undefined) {
	'use strict';

//	angular.module('jmdobry.binary-heap', []);
//
//	/**
//	 * @doc interface
//	 * @id BinaryHeapProvider
//	 * @name BinaryHeapProvider
//	 */
//	function BinaryHeapProvider() {
//
//		var defaults = require('./binaryHeap/defaults');
//
//		/**
//		 * @doc method
//		 * @id BinaryHeapProvider.methods:setDefaultWeightFunction
//		 * @name setDefaultWeightFunction
//		 * @param {function} weightFunc New default weight function.
//		 */
//		function setDefaultWeightFunction(weightFunc) {
//			if (!angular.isFunction(weightFunc)) {
//				throw new Error('BinaryHeapProvider.setDefaultWeightFunction(weightFunc): weightFunc: Must be a function!');
//			}
//			defaults.userProvidedDefaultWeightFunc = weightFunc;
//		}
//
//		/**
//		 * @doc method
//		 * @id BinaryHeapProvider.methods:setDefaultWeightFunction
//		 * @name setDefaultWeightFunction
//		 * @methodOf BinaryHeapProvider
//		 * @param {function} weightFunc New default weight function.
//		 */
//		this.setDefaultWeightFunction = setDefaultWeightFunction;
//
//		this.$get = function () {
//			return require('./binaryHeap');
//		};
//	}
//	angular.module('jmdobry.binary-heap').provider('BinaryHeap', BinaryHeapProvider);

	angular.module('jmdobry.angular-data', ['ng'/*, 'jmdobry.binary-heap'*/]).config(['$provide', function ($provide) {
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
	angular.module('jmdobry.angular-data').provider('DS', require('./datastore'));

})(window, window.angular);

},{"./datastore":36}],"uE/lJt":[function(require,module,exports){
module.exports = {
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

},{"mout/array/contains":3,"mout/array/filter":4,"mout/array/slice":7,"mout/array/sort":8,"mout/array/toLookup":9,"mout/lang/isEmpty":14,"mout/object/deepMixIn":21,"mout/object/forOwn":23,"mout/string/makePath":25,"mout/string/upperCase":26}],"utils":[function(require,module,exports){
module.exports=require('uE/lJt');
},{}]},{},[53])
