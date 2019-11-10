(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var proto = require('./Array.prototype');

module.exports = {
	prototype: proto,
	shim: function shimArray() {
		proto.shim();
	}
};

},{"./Array.prototype":3}],2:[function(require,module,exports){
'use strict';

module.exports = require('array-includes');

},{"array-includes":14}],3:[function(require,module,exports){
'use strict';

var includes = require('./Array.prototype.includes');

module.exports = {
	includes: includes,
	shim: function shimArrayPrototype() {
		includes.shim();
	}
};

},{"./Array.prototype.includes":2}],4:[function(require,module,exports){
'use strict';

var getDescriptors = require('object.getownpropertydescriptors');
var entries = require('object.entries');
var values = require('object.values');

module.exports = {
	entries: entries,
	getOwnPropertyDescriptors: getDescriptors,
	shim: function shimObject() {
		getDescriptors.shim();
		entries.shim();
		values.shim();
	},
	values: values
};

},{"object.entries":38,"object.getownpropertydescriptors":64,"object.values":89}],5:[function(require,module,exports){
'use strict';

var stringPrototype = require('./String.prototype');

module.exports = {
	prototype: stringPrototype,
	shim: function shimString() {
		stringPrototype.shim();
	}
};

},{"./String.prototype":7}],6:[function(require,module,exports){
'use strict';

module.exports = require('string-at');

},{"string-at":114}],7:[function(require,module,exports){
'use strict';

var at = require('./String.prototype.at');
var padStart = require('./String.prototype.padStart');
var padEnd = require('./String.prototype.padEnd');
var trimLeft = require('./String.prototype.trimLeft');
var trimRight = require('./String.prototype.trimRight');

module.exports = {
	at: at,
	padStart: padStart,
	padEnd: padEnd,
	trimLeft: trimLeft,
	trimRight: trimRight,
	shim: function shimStringPrototype() {
		at.shim();
		padStart.shim();
		padEnd.shim();
		trimLeft.shim();
		trimRight.shim();
	}
};

},{"./String.prototype.at":6,"./String.prototype.padEnd":8,"./String.prototype.padStart":9,"./String.prototype.trimLeft":10,"./String.prototype.trimRight":11}],8:[function(require,module,exports){
'use strict';

module.exports = require('string.prototype.padend');

},{"string.prototype.padend":137}],9:[function(require,module,exports){
'use strict';

module.exports = require('string.prototype.padstart');

},{"string.prototype.padstart":162}],10:[function(require,module,exports){
'use strict';

module.exports = require('string.prototype.trimleft');

},{"string.prototype.trimleft":187}],11:[function(require,module,exports){
'use strict';

module.exports = require('string.prototype.trimright');

},{"string.prototype.trimright":197}],12:[function(require,module,exports){
/*!
 * https://github.com/es-shims/es7-shim
 * @license es7-shim Copyright 2014 by contributors, MIT License
 * see https://github.com/es-shims/es7-shim/blob/master/LICENSE
 */

'use strict';

var $Array = require('./Array');
var $Object = require('./Object');
var $String = require('./String');

module.exports = {
	Array: $Array,
	Object: $Object,
	String: $String,
	shim: function shimES7() {
		$Array.shim();
		$Object.shim();
		$String.shim();
	}
};

},{"./Array":1,"./Object":4,"./String":5}],13:[function(require,module,exports){
(function (global){
'use strict';

var ES = require('es-abstract/es6');
var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = Number.isFinite || function (n) { return typeof n === 'number' && global.isFinite(n); };
var indexOf = Array.prototype.indexOf;

module.exports = function includes(searchElement) {
	var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
	if (indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
		return indexOf.apply(this, arguments) > -1;
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"es-abstract/es6":17}],14:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es6');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

var slice = Array.prototype.slice;

/* eslint-disable no-unused-vars */
var boundIncludesShim = function includes(array, searchElement) {
/* eslint-enable no-unused-vars */
	ES.RequireObjectCoercible(array);
	return polyfill.apply(array, slice.call(arguments, 1));
};
define(boundIncludesShim, {
	implementation: implementation,
	getPolyfill: getPolyfill,
	shim: shim
});

module.exports = boundIncludesShim;

},{"./implementation":13,"./polyfill":35,"./shim":36,"define-properties":15,"es-abstract/es6":17}],15:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
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
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":26,"object-keys":33}],16:[function(require,module,exports){
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
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
        return $isNaN(x) && $isNaN(y);
	}
};

module.exports = ES5;

},{"./helpers/isFinite":19,"./helpers/mod":21,"./helpers/sign":22,"es-to-primitive/es5":23,"is-callable":29}],17:[function(require,module,exports){
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
var parseInteger = parseInt;
var bind = require('function-bind');
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = require('./es5');

var hasRegExpMatcher = require('is-regex');

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

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
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
		return this.IsCallable(argument); // unfortunately there's no way to truly check this without try/catch `new argument`
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

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = RegExp[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
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

},{"./es5":16,"./helpers/assign":18,"./helpers/isFinite":19,"./helpers/isPrimitive":20,"./helpers/mod":21,"./helpers/sign":22,"es-to-primitive/es6":24,"function-bind":28,"is-regex":31}],18:[function(require,module,exports){
var has = Object.prototype.hasOwnProperty;
module.exports = Object.assign || function assign(target, source) {
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

},{}],19:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],20:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],21:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],22:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],23:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
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
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":25,"is-callable":29}],24:[function(require,module,exports){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = require('./helpers/isPrimitive');
var isCallable = require('is-callable');
var isDate = require('is-date-object');
var isSymbol = require('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
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

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
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
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
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

},{"./helpers/isPrimitive":25,"is-callable":29,"is-date-object":30,"is-symbol":32}],25:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],26:[function(require,module,exports){

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


},{}],27:[function(require,module,exports){
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

    var bound;
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

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],28:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":27}],29:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
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
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],30:[function(require,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{}],31:[function(require,module,exports){
'use strict';

var regexExec = RegExp.prototype.exec;
var tryRegexExec = function tryRegexExec(value) {
	try {
		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
};

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
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
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var blacklistedKeys = {
	$console: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$parent: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

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
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":34}],34:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],35:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return Array.prototype.includes || implementation;
};

},{"./implementation":13}],36:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeIncludes() {
	var polyfill = getPolyfill();
	if (Array.prototype.includes !== polyfill) {
		define(Array.prototype, { includes: polyfill });
	}
	return polyfill;
};

},{"./polyfill":35,"define-properties":15}],37:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es7');
var has = require('has');
var bind = require('function-bind');
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

module.exports = function entries(O) {
	var obj = ES.RequireObjectCoercible(O);
	var entrys = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			entrys.push([key, obj[key]]);
		}
	}
	return entrys;
};

},{"es-abstract/es7":42,"function-bind":53,"has":54}],38:[function(require,module,exports){
'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

define(implementation, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = implementation;

},{"./implementation":37,"./polyfill":61,"./shim":62,"define-properties":39}],39:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":51,"object-keys":59}],40:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./helpers/isFinite":44,"./helpers/mod":46,"./helpers/sign":47,"dup":16,"es-to-primitive/es5":48,"is-callable":55}],41:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./es5":40,"./helpers/assign":43,"./helpers/isFinite":44,"./helpers/isPrimitive":45,"./helpers/mod":46,"./helpers/sign":47,"dup":17,"es-to-primitive/es6":49,"function-bind":53,"is-regex":57}],42:[function(require,module,exports){
'use strict';

var ES6 = require('./es6');
var assign = require('./helpers/assign');

var ES7 = assign(ES6, {
	// https://github.com/tc39/ecma262/pull/60
	SameValueNonNumber: function SameValueNonNumber(x, y) {
		if (typeof x === 'number' || typeof x !== typeof y) {
			throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
		}
		return this.SameValue(x, y);
	}
});

module.exports = ES7;

},{"./es6":41,"./helpers/assign":43}],43:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],44:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],45:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],46:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],47:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],48:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./helpers/isPrimitive":50,"dup":23,"is-callable":55}],49:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./helpers/isPrimitive":50,"dup":24,"is-callable":55,"is-date-object":56,"is-symbol":58}],50:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],51:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],52:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],53:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":52,"dup":28}],54:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":53}],55:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],56:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],57:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],58:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],59:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":60,"dup":33}],60:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],61:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};

},{"./implementation":37}],62:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimEntries() {
	var polyfill = getPolyfill();
	define(Object, { entries: polyfill }, { entries: function () { return Object.entries !== polyfill; } });
	return polyfill;
};

},{"./polyfill":61,"define-properties":39}],63:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es7');

var defineProperty = Object.defineProperty;
var getDescriptor = Object.getOwnPropertyDescriptor;
var getOwnNames = Object.getOwnPropertyNames;
var getSymbols = Object.getOwnPropertySymbols;
var concat = Function.call.bind(Array.prototype.concat);
var reduce = Function.call.bind(Array.prototype.reduce);
var getAll = getSymbols ? function (obj) {
	return concat(getOwnNames(obj), getSymbols(obj));
} : getOwnNames;

var isES5 = ES.IsCallable(getDescriptor) && ES.IsCallable(getOwnNames);

var safePut = function put(obj, prop, val) {
	if (defineProperty && prop in obj) {
		defineProperty(obj, prop, {
			configurable: true,
			enumerable: true,
			value: val,
			writable: true
		});
	} else {
		obj[prop] = val;
	}
};

module.exports = function getOwnPropertyDescriptors(value) {
	ES.RequireObjectCoercible(value);
	if (!isES5) { throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor'); }

	var O = ES.ToObject(value);
	return reduce(getAll(O), function (acc, key) {
		safePut(acc, key, getDescriptor(O, key));
		return acc;
	}, {});
};

},{"es-abstract/es7":68}],64:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./implementation":63,"./polyfill":86,"./shim":87,"define-properties":65,"dup":38}],65:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":77,"object-keys":84}],66:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./helpers/isFinite":70,"./helpers/mod":72,"./helpers/sign":73,"dup":16,"es-to-primitive/es5":74,"is-callable":80}],67:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./es5":66,"./helpers/assign":69,"./helpers/isFinite":70,"./helpers/isPrimitive":71,"./helpers/mod":72,"./helpers/sign":73,"dup":17,"es-to-primitive/es6":75,"function-bind":79,"is-regex":82}],68:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./es6":67,"./helpers/assign":69,"dup":42}],69:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],70:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],71:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],72:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],73:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],74:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./helpers/isPrimitive":76,"dup":23,"is-callable":80}],75:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./helpers/isPrimitive":76,"dup":24,"is-callable":80,"is-date-object":81,"is-symbol":83}],76:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],77:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],78:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],79:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":78,"dup":28}],80:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],81:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],82:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],83:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],84:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":85,"dup":33}],85:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],86:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Object.getOwnPropertyDescriptors === 'function' ? Object.getOwnPropertyDescriptors : implementation;
};

},{"./implementation":63}],87:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimGetOwnPropertyDescriptors() {
	var polyfill = getPolyfill();
	define(Object, { getOwnPropertyDescriptors: polyfill }, {
		getOwnPropertyDescriptors: function () { return Object.getOwnPropertyDescriptors !== polyfill; }
	});
	return polyfill;
};

},{"./polyfill":86,"define-properties":65}],88:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es7');
var has = require('has');
var bind = require('function-bind');
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

module.exports = function values(O) {
	var obj = ES.RequireObjectCoercible(O);
	var vals = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			vals.push(obj[key]);
		}
	}
	return vals;
};

},{"es-abstract/es7":93,"function-bind":104,"has":105}],89:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./implementation":88,"./polyfill":112,"./shim":113,"define-properties":90,"dup":38}],90:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":102,"object-keys":110}],91:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./helpers/isFinite":95,"./helpers/mod":97,"./helpers/sign":98,"dup":16,"es-to-primitive/es5":99,"is-callable":106}],92:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./es5":91,"./helpers/assign":94,"./helpers/isFinite":95,"./helpers/isPrimitive":96,"./helpers/mod":97,"./helpers/sign":98,"dup":17,"es-to-primitive/es6":100,"function-bind":104,"is-regex":108}],93:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./es6":92,"./helpers/assign":94,"dup":42}],94:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],95:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],96:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],97:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],98:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],99:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./helpers/isPrimitive":101,"dup":23,"is-callable":106}],100:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./helpers/isPrimitive":101,"dup":24,"is-callable":106,"is-date-object":107,"is-symbol":109}],101:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],102:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],103:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],104:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":103,"dup":28}],105:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54,"function-bind":104}],106:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],107:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],108:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],109:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],110:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":111,"dup":33}],111:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],112:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Object.values === 'function' ? Object.values : implementation;
};

},{"./implementation":88}],113:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimValues() {
	var polyfill = getPolyfill();
	define(Object, { values: polyfill }, { values: function () { return Object.values !== polyfill; } });
	return polyfill;
};

},{"./polyfill":112,"define-properties":90}],114:[function(require,module,exports){
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

},{"define-properties":115,"es-abstract/es7":118,"function-bind":129}],115:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":127,"object-keys":134}],116:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./helpers/isFinite":120,"./helpers/mod":122,"./helpers/sign":123,"dup":16,"es-to-primitive/es5":124,"is-callable":130}],117:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./es5":116,"./helpers/assign":119,"./helpers/isFinite":120,"./helpers/isPrimitive":121,"./helpers/mod":122,"./helpers/sign":123,"dup":17,"es-to-primitive/es6":125,"function-bind":129,"is-regex":132}],118:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./es6":117,"./helpers/assign":119,"dup":42}],119:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],120:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],121:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],122:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],123:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],124:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./helpers/isPrimitive":126,"dup":23,"is-callable":130}],125:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./helpers/isPrimitive":126,"dup":24,"is-callable":130,"is-date-object":131,"is-symbol":133}],126:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],127:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],128:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],129:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":128,"dup":28}],130:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],131:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],132:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],133:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],134:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":135,"dup":33}],135:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],136:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es7');
var slice = bind.call(Function.call, String.prototype.slice);

module.exports = function padEnd(maxLength) {
	var O = ES.RequireObjectCoercible(this);
	var S = ES.ToString(O);
	var stringLength = ES.ToLength(S.length);
	var fillString;
	if (arguments.length > 1) {
		fillString = arguments[1];
	}
	var filler = typeof fillString === 'undefined' ? '' : ES.ToString(fillString);
	if (filler === '') {
		filler = ' ';
	}
	var intMaxLength = ES.ToLength(maxLength);
	if (intMaxLength <= stringLength) {
		return S;
	}
	var fillLen = intMaxLength - stringLength;
	while (filler.length < fillLen) {
		var fLen = filler.length;
		var remainingCodeUnits = fillLen - fLen;
		filler += fLen > remainingCodeUnits ? slice(filler, 0, remainingCodeUnits) : filler;
	}

	var truncatedStringFiller = filler.length > fillLen ? slice(filler, 0, fillLen) : filler;
	return S + truncatedStringFiller;
};

},{"es-abstract/es7":141,"function-bind":152}],137:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');
var ES = require('es-abstract/es7');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = bind.call(Function.apply, implementation);

var boundPadEnd = function padEnd(str, maxLength) {
	ES.RequireObjectCoercible(str);
	var args = [maxLength];
	if (arguments.length > 2) {
		args.push(arguments[2]);
	}
	return bound(str, args);
};

define(boundPadEnd, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundPadEnd;

},{"./implementation":136,"./polyfill":159,"./shim":160,"define-properties":138,"es-abstract/es7":141,"function-bind":152}],138:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":150,"object-keys":157}],139:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./helpers/isFinite":143,"./helpers/mod":145,"./helpers/sign":146,"dup":16,"es-to-primitive/es5":147,"is-callable":153}],140:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./es5":139,"./helpers/assign":142,"./helpers/isFinite":143,"./helpers/isPrimitive":144,"./helpers/mod":145,"./helpers/sign":146,"dup":17,"es-to-primitive/es6":148,"function-bind":152,"is-regex":155}],141:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./es6":140,"./helpers/assign":142,"dup":42}],142:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],143:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],144:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],145:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],146:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],147:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./helpers/isPrimitive":149,"dup":23,"is-callable":153}],148:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./helpers/isPrimitive":149,"dup":24,"is-callable":153,"is-date-object":154,"is-symbol":156}],149:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],150:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],151:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],152:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":151,"dup":28}],153:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],154:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],155:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],156:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],157:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":158,"dup":33}],158:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],159:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof String.prototype.padEnd === 'function' ? String.prototype.padEnd : implementation;
};

},{"./implementation":136}],160:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimPadEnd() {
	var polyfill = getPolyfill();
	define(String.prototype, { padEnd: polyfill }, { padEnd: function () { return String.prototype.padEnd !== polyfill; } });
	return polyfill;
};

},{"./polyfill":159,"define-properties":138}],161:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es7');
var slice = bind.call(Function.call, String.prototype.slice);

module.exports = function padStart(maxLength) {
	var O = ES.RequireObjectCoercible(this);
	var S = ES.ToString(O);
	var stringLength = ES.ToLength(S.length);
	var fillString;
	if (arguments.length > 1) {
		fillString = arguments[1];
	}
	var filler = typeof fillString === 'undefined' ? '' : ES.ToString(fillString);
	if (filler === '') {
		filler = ' ';
	}
	var intMaxLength = ES.ToLength(maxLength);
	if (intMaxLength <= stringLength) {
		return S;
	}
	var fillLen = intMaxLength - stringLength;
	while (filler.length < fillLen) {
		var fLen = filler.length;
		var remainingCodeUnits = fillLen - fLen;
		filler += fLen > remainingCodeUnits ? slice(filler, 0, remainingCodeUnits) : filler;
	}

	var truncatedStringFiller = filler.length > fillLen ? slice(filler, 0, fillLen) : filler;
	return truncatedStringFiller + S;
};

},{"es-abstract/es7":166,"function-bind":177}],162:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');
var ES = require('es-abstract/es7');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = bind.call(Function.apply, implementation);

var boundPadStart = function padStart(str, maxLength) {
	ES.RequireObjectCoercible(str);
	var args = [maxLength];
	if (arguments.length > 2) {
		args.push(arguments[2]);
	}
	return bound(str, args);
};

define(boundPadStart, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundPadStart;

},{"./implementation":161,"./polyfill":184,"./shim":185,"define-properties":163,"es-abstract/es7":166,"function-bind":177}],163:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":175,"object-keys":182}],164:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./helpers/isFinite":168,"./helpers/mod":170,"./helpers/sign":171,"dup":16,"es-to-primitive/es5":172,"is-callable":178}],165:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./es5":164,"./helpers/assign":167,"./helpers/isFinite":168,"./helpers/isPrimitive":169,"./helpers/mod":170,"./helpers/sign":171,"dup":17,"es-to-primitive/es6":173,"function-bind":177,"is-regex":180}],166:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"./es6":165,"./helpers/assign":167,"dup":42}],167:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],168:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],169:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],170:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],171:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],172:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"./helpers/isPrimitive":174,"dup":23,"is-callable":178}],173:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./helpers/isPrimitive":174,"dup":24,"is-callable":178,"is-date-object":179,"is-symbol":181}],174:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],175:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],176:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],177:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":176,"dup":28}],178:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29}],179:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],180:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],181:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],182:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":183,"dup":33}],183:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],184:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof String.prototype.padStart === 'function' ? String.prototype.padStart : implementation;
};

},{"./implementation":161}],185:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimPadStart() {
	var polyfill = getPolyfill();
	define(String.prototype, { padStart: polyfill }, { padStart: function () { return String.prototype.padStart !== polyfill; } });
	return polyfill;
};

},{"./polyfill":184,"define-properties":163}],186:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;

module.exports = function trimLeft() {
	return replace(this, leftWhitespace, '');
};

},{"function-bind":191}],187:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = bind.call(Function.call, getPolyfill());

define(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;

},{"./implementation":186,"./polyfill":194,"./shim":195,"define-properties":188,"function-bind":191}],188:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":189,"object-keys":192}],189:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],190:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],191:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":190,"dup":28}],192:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":193,"dup":33}],193:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],194:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (!String.prototype.trimLeft) {
		return implementation;
	}
	var zeroWidthSpace = '\u200b';
	if (zeroWidthSpace.trimLeft() !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimLeft;
};

},{"./implementation":186}],195:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimTrimLeft() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ trimLeft: polyfill },
		{ trimLeft: function () { return String.prototype.trimLeft !== polyfill; } }
	);
	return polyfill;
};

},{"./polyfill":194,"define-properties":188}],196:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var replace = bind.call(Function.call, String.prototype.replace);

var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;

module.exports = function trimRight() {
	return replace(this, rightWhitespace, '');
};

},{"function-bind":201}],197:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"./implementation":196,"./polyfill":204,"./shim":205,"define-properties":198,"dup":187,"function-bind":201}],198:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"foreach":199,"object-keys":202}],199:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],200:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],201:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"./implementation":200,"dup":28}],202:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./isArguments":203,"dup":33}],203:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"dup":34}],204:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (!String.prototype.trimRight) {
		return implementation;
	}
	var zeroWidthSpace = '\u200b';
	if (zeroWidthSpace.trimRight() !== zeroWidthSpace) {
		return implementation;
	}
	return String.prototype.trimRight;
};

},{"./implementation":196}],205:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimTrimRight() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ trimRight: polyfill },
		{ trimRight: function () { return String.prototype.trimRight !== polyfill; } }
	);
	return polyfill;
};

},{"./polyfill":204,"define-properties":198}],206:[function(require,module,exports){
'use strict';

module.exports = require('./es7-shim').shim();

},{"./es7-shim":12}]},{},[206]);
