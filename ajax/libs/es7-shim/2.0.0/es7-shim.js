(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var proto = require('./Array.prototype');

module.exports = {
	prototype: proto,
	shim: function shimArray() {
		proto.shim();
	}
};

},{"./Array.prototype":3}],2:[function(require,module,exports){
module.exports = require('array-includes');

},{"array-includes":15}],3:[function(require,module,exports){
var includes = require('./Array.prototype.includes');

module.exports = {
	includes: includes,
	shim: function shimArrayPrototype() {
		includes.shim();
	}
};

},{"./Array.prototype.includes":2}],4:[function(require,module,exports){
var proto = require('./Map.prototype');

module.exports = {
	prototype: proto,
	shim: function shimMap() {
		proto.shim();
	}
};

},{"./Map.prototype":5}],5:[function(require,module,exports){
var toJSON = require('./Map.prototype.toJSON');

module.exports = {
	toJSON: toJSON,
	shim: function shimMapPrototype() {
		toJSON.shim();
	}
};

},{"./Map.prototype.toJSON":6}],6:[function(require,module,exports){
module.exports = require('map-tojson');

},{"map-tojson":33}],7:[function(require,module,exports){
var getDescriptors = require('object.getownpropertydescriptors');

module.exports = {
	getOwnPropertyDescriptors: getDescriptors,
	shim: function shimObject() {
		getDescriptors.shim();
	}
};

},{"object.getownpropertydescriptors":52}],8:[function(require,module,exports){
var proto = require('./Set.prototype');

module.exports = {
	prototype: proto,
	shim: function shimSet() {
		proto.shim();
	}
};

},{"./Set.prototype":9}],9:[function(require,module,exports){
var toJSON = require('./Set.prototype.toJSON');

module.exports = {
	toJSON: toJSON,
	shim: function shimSetPrototype() {
		toJSON.shim();
	}
};

},{"./Set.prototype.toJSON":10}],10:[function(require,module,exports){
module.exports = require('set-tojson');

},{"set-tojson":71}],11:[function(require,module,exports){
var stringPrototype = require('./String.prototype');

module.exports = {
	prototype: stringPrototype,
	shim: function shimString() {
		stringPrototype.shim();
	}
};

},{"./String.prototype":13}],12:[function(require,module,exports){
module.exports = require('string-at');

},{"string-at":90}],13:[function(require,module,exports){
var at = require('./String.prototype.at');

module.exports = {
	at: at,
	shim: function shimStringPrototype() {
		at.shim();
	}
};

},{"./String.prototype.at":12}],14:[function(require,module,exports){
/*!
 * https://github.com/es-shims/es7-shim
 * @license es7-shim Copyright 2014 by contributors, MIT License
 * see https://github.com/es-shims/es7-shim/blob/master/LICENSE
 */

var $Array = require('./Array');
var $Map = require('./Map');
var $Object = require('./Object');
var $Set = require('./Set');
var $String = require('./String');

module.exports = {
	Array: $Array,
	Map: $Map,
	Object: $Object,
	Set: $Set,
	String: $String,
	shim: function shimES7() {
		$Array.shim();
		$Map.shim();
		$Object.shim();
		$Set.shim();
		$String.shim();
	}
};

},{"./Array":1,"./Map":4,"./Object":7,"./Set":8,"./String":11}],15:[function(require,module,exports){
(function (global){
'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es6');
var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = Number.isFinite || function (n) { return typeof n === 'number' && global.isFinite(n); };

var includesShim = function includes(searchElement) {
	var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
	if (Array.prototype.indexOf && !$isNaN(searchElement) && $isFinite(fromIndex)) {
		return Array.prototype.indexOf.apply(this, arguments) > -1;
	}

	var O = ES.ToObject(this);
	var length = ES.ToLength(O.length);
	if (length === 0) {
		return false;
	}
	var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
	while (k < length) {
		if (ES.SameValueZero(searchElement, O[k])) {
			return true;
		}
		k += 1;
	}
	return false;
};

/*eslint-disable no-unused-vars */
var boundIncludesShim = function includes(array, searchElement) {
/*eslint-enable no-unused-vars */
	ES.RequireObjectCoercible(array);
	return includesShim.apply(array, Array.prototype.slice.call(arguments, 1));
};
define(boundIncludesShim, {
	method: includesShim,
	shim: function shimArrayPrototypeIncludes() {
		define(Array.prototype, {
			includes: includesShim
		});
		return Array.prototype.includes || includesShim;
	}
});

module.exports = boundIncludesShim;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"define-properties":16,"es-abstract/es6":20}],16:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { value: obj });
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: value
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	foreach(keys(map), function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":32,"object-keys":17}],17:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var isArgs = require('./isArguments');
var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var ctor = object.constructor;
		var skipConstructor = ctor && ctor.prototype === object;

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (!Object.keys) {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":18}],18:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]'
			&& value !== null
			&& typeof value === 'object'
			&& typeof value.length === 'number'
			&& value.length >= 0
			&& toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],19:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) {
			// 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
        return $isNaN(x) && $isNaN(y);
	}
};

module.exports = ES5;

},{"./helpers/isFinite":22,"./helpers/mod":24,"./helpers/sign":25,"es-to-primitive/es5":26,"is-callable":31}],20:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = require('./helpers/isFinite');
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = require('./helpers/assign');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrimitive = require('./helpers/isPrimitive');
var toPrimitive = require('es-to-primitive/es6');

var ES5 = require('./es5');

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tonumber
	ToNumber: function ToNumber(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		return Number(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument`
		return this.IsCallable(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		return toStr.call(argument) === '[object RegExp]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible
module.exports = ES6;

},{"./es5":19,"./helpers/assign":21,"./helpers/isFinite":22,"./helpers/isPrimitive":23,"./helpers/mod":24,"./helpers/sign":25,"es-to-primitive/es6":27}],21:[function(require,module,exports){
var has = Object.prototype.hasOwnProperty;
module.exports = Object.assign || function assign(target, source) {
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

},{}],22:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],23:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],24:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],25:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],26:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		if (!hint) {
			hint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (hint === String || hint === Number) {
			var methods = hint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length < 2) {
		PreferredType = toStr.call(input) === '[object Date]' ? String : Number;
	}
	if (PreferredType === String) {
		return String(input);
	} else if (PreferredType === Number) {
		return Number(input);
	} else {
		throw new TypeError('invalid PreferredType supplied');
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":28,"is-callable":31}],27:[function(require,module,exports){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = require('./helpers/isPrimitive');
var isCallable = require('is-callable');
var isDate = require('is-date-object');
var isSymbol = require('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (O == null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			throw new TypeError('Symbol.toPrimitive not supported yet');
			// exoticToPrim = this.GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

},{"./helpers/isPrimitive":28,"is-callable":31,"is-date-object":29,"is-symbol":30}],28:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],29:[function(require,module,exports){
'use strict';

var getDay = Date.prototype.getDay;

module.exports = function isDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

},{}],30:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],31:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var tryFunctionObject = function tryFunctionObject(value) {
	try {
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (typeof value !== 'function') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],32:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],33:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es7');
var define = require('define-properties');

var hasMaps = typeof Map !== 'undefined' && ES.IsCallable(Map);

var mapEntries;
if (hasMaps) { mapEntries = Map.prototype.entries; }

// polyfilled Maps with es6-shim might exist without for..of
var iterateWithWhile = function (map, receive) {
	var entries = mapEntries.call(map);
	var next;
	do {
		next = entries.next();
	} while (!next.done && receive(next.value));
};

var iterate = (function () {
	try {
		// Safari 8's native Map can't be iterated except with for..of
		return Function('mapEntries', 'map', 'receive', 'for (var entry of mapEntries.call(map)) { receive(entry); }').bind(null, mapEntries);
	} catch (e) {
		/* for..of seems to not be supported */
	}
	return iterateWithWhile;
}());

var requireMap = function requireMap() {
	if (!hasMaps) {
		throw new TypeError('Map.prototype.toJSON requires Map (either native, or polyfilled with es6-shim)');
	}
};

var mapToJSONshim = function toJSON() {
	ES.RequireObjectCoercible(this);
	requireMap();
	var entries = [];
	iterate(this, Array.prototype.push.bind(entries));
	return entries;
};

var boundMapToJSON = function mapToJSON(map) {
	ES.RequireObjectCoercible(map);
	return mapToJSONshim.call(map);
};
define(boundMapToJSON, {
	method: mapToJSONshim,
	shim: function shimMapPrototypeToJSON() {
		requireMap();
		define(Map.prototype, {
			toJSON: mapToJSONshim
		});
		return Map.prototype.toJSON;
	}
});
module.exports = boundMapToJSON;

},{"define-properties":34,"es-abstract/es7":40}],34:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16,"foreach":35,"object-keys":36}],35:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],36:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./isArguments":37,"dup":17}],37:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],38:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"./helpers/isFinite":42,"./helpers/mod":44,"./helpers/sign":45,"dup":19,"es-to-primitive/es5":46,"is-callable":51}],39:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./es5":38,"./helpers/assign":41,"./helpers/isFinite":42,"./helpers/isPrimitive":43,"./helpers/mod":44,"./helpers/sign":45,"dup":20,"es-to-primitive/es6":47}],40:[function(require,module,exports){
var ES6 = require('./es6');
var assign = require('./helpers/assign');

var ES7 = assign(ES6, {});

module.exports = ES7;

},{"./es6":39,"./helpers/assign":41}],41:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],42:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],43:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],44:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],45:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],46:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./helpers/isPrimitive":48,"dup":26,"is-callable":51}],47:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./helpers/isPrimitive":48,"dup":27,"is-callable":51,"is-date-object":49,"is-symbol":50}],48:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],49:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],50:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],51:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],52:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es7');

var getDescriptor = Object.getOwnPropertyDescriptor;
var getOwnNames = Object.getOwnPropertyNames;
var getSymbols = Object.getOwnPropertySymbols;
var getAll = !getSymbols ? getOwnNames : function (obj) {
	return getOwnNames(obj).concat(getSymbols(obj));
};

var isES5 = ES.IsCallable(getDescriptor) && ES.IsCallable(getOwnNames);

var getDescriptorsShim = function getOwnPropertyDescriptors(value) {
	ES.RequireObjectCoercible(value);
	if (!isES5) { throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor'); }

	var O = ES.ToObject(value);
	return getAll(O).reduce(function (acc, key) {
		acc[key] = getDescriptor(O, key);
		return acc;
	}, {});
};

define(getDescriptorsShim, {
	method: getDescriptorsShim,
	shim: function shimGetOwnPropertyDescriptors() {
		if (isES5) {
			define(Object, {
				getOwnPropertyDescriptors: getDescriptorsShim
			});
			return Object.getOwnPropertyDescriptors || getDescriptorsShim;
		}
	}
});

module.exports = getDescriptorsShim;

},{"define-properties":53,"es-abstract/es7":59}],53:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16,"foreach":54,"object-keys":55}],54:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],55:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./isArguments":56,"dup":17}],56:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],57:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"./helpers/isFinite":61,"./helpers/mod":63,"./helpers/sign":64,"dup":19,"es-to-primitive/es5":65,"is-callable":70}],58:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./es5":57,"./helpers/assign":60,"./helpers/isFinite":61,"./helpers/isPrimitive":62,"./helpers/mod":63,"./helpers/sign":64,"dup":20,"es-to-primitive/es6":66}],59:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"./es6":58,"./helpers/assign":60,"dup":40}],60:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],61:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],62:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],63:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],64:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],65:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./helpers/isPrimitive":67,"dup":26,"is-callable":70}],66:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./helpers/isPrimitive":67,"dup":27,"is-callable":70,"is-date-object":68,"is-symbol":69}],67:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],68:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],69:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],70:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],71:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es7');
var define = require('define-properties');

var hasSets = typeof Set !== 'undefined' && ES.IsCallable(Set);

var setValues;
if (hasSets) { setValues = Set.prototype.values; }
var push = Array.prototype.push;

// polyfilled Sets with es6-shim might exist without for..of
var iterateWithWhile = function (set, receive) {
	var values = setValues.call(set);
	var next;
	do {
		next = values.next();
	} while (!next.done && receive(next.value));
};

var iterate = (function () {
	try {
		// Safari 8's native Set can't be iterated except with for..of
		return Function('setValues', 'set', 'receive', 'for (var value of setValues.call(set)) { receive(value); }').bind(null, setValues);
	} catch (e) {
		/* for..of seems to not be supported */
	}
	return iterateWithWhile;
}());

var requireSet = function requireSet() {
	if (!hasSets) {
		throw new TypeError('Set.prototype.toJSON requires Set (either native, or polyfilled with es6-shim)');
	}
};

var setToJSONshim = function toJSON() {
	ES.RequireObjectCoercible(this);
	requireSet();
	var values = [];
	iterate(this, push.bind(values));
	return values;
};

var boundSetToJSON = function setToJSON(set) {
	ES.RequireObjectCoercible(set);
	return setToJSONshim.call(set);
};
define(boundSetToJSON, {
	method: setToJSONshim,
	shim: function shimSetPrototypeToJSON() {
		requireSet();
		define(Set.prototype, {
			toJSON: setToJSONshim
		});
		return Set.prototype.toJSON;
	}
});
module.exports = boundSetToJSON;

},{"define-properties":72,"es-abstract/es7":78}],72:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16,"foreach":73,"object-keys":74}],73:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],74:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./isArguments":75,"dup":17}],75:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],76:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"./helpers/isFinite":80,"./helpers/mod":82,"./helpers/sign":83,"dup":19,"es-to-primitive/es5":84,"is-callable":89}],77:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./es5":76,"./helpers/assign":79,"./helpers/isFinite":80,"./helpers/isPrimitive":81,"./helpers/mod":82,"./helpers/sign":83,"dup":20,"es-to-primitive/es6":85}],78:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"./es6":77,"./helpers/assign":79,"dup":40}],79:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],80:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],81:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],82:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],83:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],84:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./helpers/isPrimitive":86,"dup":26,"is-callable":89}],85:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./helpers/isPrimitive":86,"dup":27,"is-callable":89,"is-date-object":87,"is-symbol":88}],86:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],87:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],88:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],89:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],90:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es7');
var bind = require('function-bind');

var atShim = function at(pos) {
	ES.RequireObjectCoercible(this);
	var O = ES.ToObject(this);
	var S = ES.ToString(O);
	var position = ES.ToInteger(pos);
	var size = S.length;
	if (position < 0 || position >= size) {
		return '';
	}
	// Get the first code unit and code unit value
	var cuFirst = S.charCodeAt(position);
	var cuSecond;
	var nextIndex = position + 1;
	var len = 1;
	// Check if it’s the start of a surrogate pair.
	var isHighSurrogate = cuFirst >= 0xD800 && cuFirst <= 0xDBFF;
	if (isHighSurrogate && size > nextIndex /* there is a next code unit */) {
		cuSecond = S.charCodeAt(nextIndex);
		if (cuSecond >= 0xDC00 && cuSecond <= 0xDFFF) { // low surrogate
			len = 2;
		}
	}
	return S.slice(position, position + len);
};

var at = bind.call(Function.call, atShim);
define(at, {
	method: atShim,
	shim: function shimStringPrototypeAt() {
		define(String.prototype, {
			at: atShim
		});
		return String.prototype.at;
	}
});

module.exports = at;

},{"define-properties":91,"es-abstract/es7":97,"function-bind":109}],91:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16,"foreach":92,"object-keys":93}],92:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],93:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./isArguments":94,"dup":17}],94:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],95:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"./helpers/isFinite":99,"./helpers/mod":101,"./helpers/sign":102,"dup":19,"es-to-primitive/es5":103,"is-callable":108}],96:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./es5":95,"./helpers/assign":98,"./helpers/isFinite":99,"./helpers/isPrimitive":100,"./helpers/mod":101,"./helpers/sign":102,"dup":20,"es-to-primitive/es6":104}],97:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"./es6":96,"./helpers/assign":98,"dup":40}],98:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],99:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],100:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],101:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24}],102:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],103:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./helpers/isPrimitive":105,"dup":26,"is-callable":108}],104:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./helpers/isPrimitive":105,"dup":27,"is-callable":108,"is-date-object":106,"is-symbol":107}],105:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],106:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],107:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],108:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],109:[function(require,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


},{}],110:[function(require,module,exports){
module.exports = require('./es7-shim').shim();

},{"./es7-shim":14}]},{},[110]);
