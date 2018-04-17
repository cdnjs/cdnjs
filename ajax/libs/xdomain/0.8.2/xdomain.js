// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({31:[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};
},{}],26:[function(require,module,exports) {
'use strict';

// modified from https://github.com/es-shims/es5-shim

var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = function () {
	/* global window */
	if (typeof window === 'undefined') {
		return false;
	}
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
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
}();
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
		var keysWorksWithArguments = function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2);
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
},{"./isArguments":31}],27:[function(require,module,exports) {

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


},{}],12:[function(require,module,exports) {
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
		for (var _ in obj) {
			return false;
		}
		/* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) {
		/* this is IE 8. */
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
},{"object-keys":26,"foreach":27}],48:[function(require,module,exports) {
'use strict';

/* eslint no-invalid-this: 1 */

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

},{}],42:[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":48}],41:[function(require,module,exports) {
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
},{"function-bind":42}],43:[function(require,module,exports) {
module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && typeof value !== 'object';
};
},{}],44:[function(require,module,exports) {
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
		if (isES6ClassFn(value)) {
			return false;
		}
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
	if (!value) {
		return false;
	}
	if (typeof value !== 'function' && typeof value !== 'object') {
		return false;
	}
	if (hasToStringTag) {
		return tryFunctionObject(value);
	}
	if (isES6ClassFn(value)) {
		return false;
	}
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};
},{}],46:[function(require,module,exports) {
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
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};
},{}],45:[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
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
},{}],40:[function(require,module,exports) {
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
	if (typeof hint !== 'string' || hint !== 'number' && hint !== 'string') {
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
},{"./helpers/isPrimitive":43,"is-callable":44,"is-date-object":46,"is-symbol":45}],33:[function(require,module,exports) {
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};
},{}],34:[function(require,module,exports) {
var $isNaN = Number.isNaN || function (a) {
  return a !== a;
};

module.exports = Number.isFinite || function (x) {
  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
};
},{}],35:[function(require,module,exports) {
var has = Object.prototype.hasOwnProperty;
module.exports = function assign(target, source) {
	if (Object.assign) {
		return Object.assign(target, source);
	}
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};
},{}],36:[function(require,module,exports) {
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};
},{}],37:[function(require,module,exports) {
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};
},{}],47:[function(require,module,exports) {
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
},{"./helpers/isPrimitive":43,"is-callable":44}],32:[function(require,module,exports) {
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) {
			return 0;
		}
		if (number === 0 || !$isFinite(number)) {
			return number;
		}
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
		if ($isNaN(number) || number === 0 || !$isFinite(number)) {
			return 0;
		}
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
		if (x === y) {
			// 0 === -0, but they are not identical.
			if (x === 0) {
				return 1 / x === 1 / y;
			}
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) {
			// eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;
},{"./helpers/isNaN":33,"./helpers/isFinite":34,"./helpers/sign":36,"./helpers/mod":37,"is-callable":44,"es-to-primitive/es5":47,"has":41}],39:[function(require,module,exports) {
'use strict';

var has = require('has');
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};
},{"has":41}],30:[function(require,module,exports) {
'use strict';

var has = require('has');
var toPrimitive = require('es-to-primitive/es6');

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var SymbolIterator = hasSymbols ? Symbol.iterator : null;

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = require('./helpers/assign');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrimitive = require('./helpers/isPrimitive');
var parseInteger = parseInt;
var bind = require('function-bind');
var arraySlice = bind.call(Function.call, Array.prototype.slice);
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = ['\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003', '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028', '\u2029\uFEFF'].join('');
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
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, Number);
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
		if ($isNaN(number) || number === 0 || !$isFinite(number)) {
			return 0;
		}
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) {
			return 0;
		}
		if (number >= 0xFF) {
			return 0xFF;
		}
		var f = Math.floor(argument);
		if (f + 0.5 < number) {
			return f + 1;
		}
		if (number < f + 0.5) {
			return f;
		}
		if (f % 2 !== 0) {
			return f + 1;
		}
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
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) {
			return 0;
		} // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) {
			return MAX_SAFE_INTEGER;
		}
		return len;
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') {
			return -0;
		}
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) {
			return n;
		}
		return void 0;
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
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) {
			return true;
		}
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
			var isRegExp = argument[Symbol.match];
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
		return x === y || $isNaN(x) && $isNaN(y);
	},

	/**
  * 7.3.2 GetV (V, P)
  * 1. Assert: IsPropertyKey(P) is true.
  * 2. Let O be ToObject(V).
  * 3. ReturnIfAbrupt(O).
  * 4. Return O.[[Get]](P, V).
  */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
  * 7.3.9 - http://www.ecma-international.org/ecma-262/6.0/#sec-getmethod
  * 1. Assert: IsPropertyKey(P) is true.
  * 2. Let func be GetV(O, P).
  * 3. ReturnIfAbrupt(func).
  * 4. If func is either undefined or null, return undefined.
  * 5. If IsCallable(func) is false, throw a TypeError exception.
  * 6. Return func.
  */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
  * 7.3.1 Get (O, P) - http://www.ecma-international.org/ecma-262/6.0/#sec-get-o-p
  * 1. Assert: Type(O) is Object.
  * 2. Assert: IsPropertyKey(P) is true.
  * 3. Return O.[[Get]](P, O).
  */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && Symbol.species ? C[Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new TypeError('no constructor found');
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-getiterator
	GetIterator: function GetIterator(obj, method) {
		if (!hasSymbols) {
			throw new SyntaxError('ES.GetIterator depends on native iterator support.');
		}

		var actualMethod = method;
		if (arguments.length < 2) {
			actualMethod = this.GetMethod(obj, SymbolIterator);
		}
		var iterator = this.Call(actualMethod, obj);
		if (this.Type(iterator) !== 'Object') {
			throw new TypeError('iterator must return an object');
		}

		return iterator;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratornext
	IteratorNext: function IteratorNext(iterator, value) {
		var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
		if (this.Type(result) !== 'Object') {
			throw new TypeError('iterator next must return an object');
		}
		return result;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
	IteratorComplete: function IteratorComplete(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.ToBoolean(this.Get(iterResult, 'done'));
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
	IteratorValue: function IteratorValue(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.Get(iterResult, 'value');
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
	IteratorStep: function IteratorStep(iterator) {
		var result = this.IteratorNext(iterator);
		var done = this.IteratorComplete(result);
		return done === true ? false : result;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
	IteratorClose: function IteratorClose(iterator, completion) {
		if (this.Type(iterator) !== 'Object') {
			throw new TypeError('Assertion failed: Type(iterator) is not Object');
		}
		if (!this.IsCallable(completion)) {
			throw new TypeError('Assertion failed: completion is not a thunk for a Completion Record');
		}
		var completionThunk = completion;

		var iteratorReturn = this.GetMethod(iterator, 'return');

		if (typeof iteratorReturn === 'undefined') {
			return completionThunk();
		}

		var completionRecord;
		try {
			var innerResult = this.Call(iteratorReturn, iterator, []);
		} catch (e) {
			// if we hit here, then "e" is the innerResult completion that needs re-throwing

			// if the completion is of type "throw", this will throw.
			completionRecord = completionThunk();
			completionThunk = null; // ensure it's not called twice.

			// if not, then return the innerResult completion
			throw e;
		}
		completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
		completionThunk = null; // ensure it's not called twice.

		if (this.Type(innerResult) !== 'Object') {
			throw new TypeError('iterator .return must return an object');
		}

		return completionRecord;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && Symbol.species) {
				C = this.Get(C, Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = Object.getOwnPropertyDescriptor(O, P);
		var extensible = oldDesc || typeof Object.isExtensible !== 'function' || Object.isExtensible(O);
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new TypeError('unable to create data property');
		}
		return success;
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new TypeError('Assertion failed: Type(S) is not String');
		}
		if (!this.IsInteger(index)) {
			throw new TypeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (index < 0 || index > MAX_SAFE_INTEGER) {
			throw new RangeError('Assertion failed: length must be an integer >= 0 and <= (2**53 - 1)');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new TypeError('Assertion failed: Type(unicode) is not Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if (index + 1 >= length) {
			return index + 1;
		}
		var first = S.charCodeAt(index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}
		var second = S.charCodeAt(index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}
		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;
},{"has":41,"es-to-primitive/es6":40,"./helpers/isNaN":33,"./helpers/isFinite":34,"./helpers/assign":35,"./helpers/sign":36,"./helpers/mod":37,"./helpers/isPrimitive":43,"function-bind":42,"./es5":32,"is-regex":39}],25:[function(require,module,exports) {
'use strict';

module.exports = require('./es2015');
},{"./es2015":30}],9:[function(require,module,exports) {
'use strict';
var ES = require('es-abstract/es6');
var supportsDescriptors = require('define-properties').supportsDescriptors;

/*! https://mths.be/array-from v0.2.0 by @mathias */
module.exports = function from(arrayLike) {
	var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
		object[key] = descriptor.value;
	};
	var C = this;
	if (arrayLike === null || typeof arrayLike === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var items = ES.ToObject(arrayLike);

	var mapFn, T;
	if (typeof arguments[1] !== 'undefined') {
		mapFn = arguments[1];
		if (!ES.IsCallable(mapFn)) {
			throw new TypeError('When provided, the second argument to `Array.from` must be a function');
		}
		if (arguments.length > 2) {
			T = arguments[2];
		}
	}

	var len = ES.ToLength(items.length);
	var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
	var k = 0;
	var kValue, mappedValue;
	while (k < len) {
		kValue = items[k];
		if (mapFn) {
			mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
		} else {
			mappedValue = kValue;
		}
		defineProperty(A, k, {
			'configurable': true,
			'enumerable': true,
			'value': mappedValue,
			'writable': true
		});
		k += 1;
	}
	A.length = len;
	return A;
};

},{"es-abstract/es6":25,"define-properties":12}],10:[function(require,module,exports) {
'use strict';

var ES = require('es-abstract/es6');
var implementation = require('./implementation');

var tryCall = function (fn) {
	try {
		fn();
		return true;
	} catch (e) {
		return false;
	}
};

module.exports = function getPolyfill() {
	var implemented = ES.IsCallable(Array.from)
		&& tryCall(function () { Array.from({ 'length': -Infinity }); })
		&& !tryCall(function () { Array.from([], undefined); });

	return implemented ? Array.from : implementation;
};

},{"es-abstract/es6":25,"./implementation":9}],11:[function(require,module,exports) {
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayFrom() {
	var polyfill = getPolyfill();

	define(Array, { 'from': polyfill }, {
		'from': function () {
			return Array.from !== polyfill;
		}
	});

	return polyfill;
};

},{"define-properties":12,"./polyfill":10}],5:[function(require,module,exports) {
'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

// eslint-disable-next-line no-unused-vars
var boundFromShim = function from(array) {
    // eslint-disable-next-line no-invalid-this
	return implementation.apply(this || Array, arguments);
};

define(boundFromShim, {
	'getPolyfill': getPolyfill,
	'implementation': implementation,
	'shim': shim
});

module.exports = boundFromShim;

},{"define-properties":12,"./implementation":9,"./polyfill":10,"./shim":11}],4:[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// XHook - v1.3.5 - https://github.com/jpillora/xhook
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2016

var AFTER,
    BEFORE,
    COMMON_EVENTS,
    EventEmitter,
    FIRE,
    FormData,
    NativeFormData,
    NativeXMLHttp,
    OFF,
    ON,
    READY_STATE,
    UPLOAD_EVENTS,
    XHookFormData,
    XHookHttpRequest,
    XMLHTTP,
    convertHeaders,
    depricatedProp,
    document,
    fakeEvent,
    mergeObjects,
    msie,
    proxyEvents,
    slice,
    xhook,
    _base,
    __indexOf = [].indexOf || function (item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }
  return -1;
};

document = window.document;

BEFORE = "before";

AFTER = "after";

READY_STATE = "readyState";

ON = "addEventListener";

OFF = "removeEventListener";

FIRE = "dispatchEvent";

XMLHTTP = "XMLHttpRequest";

FormData = "FormData";

UPLOAD_EVENTS = ["load", "loadend", "loadstart"];

COMMON_EVENTS = ["progress", "abort", "error", "timeout"];

msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);

if (isNaN(msie)) {
  msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
}

(_base = Array.prototype).indexOf || (_base.indexOf = function (item) {
  var i, x, _i, _len;
  for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
    x = this[i];
    if (x === item) {
      return i;
    }
  }
  return -1;
});

slice = function slice(o, n) {
  return Array.prototype.slice.call(o, n);
};

depricatedProp = function depricatedProp(p) {
  return p === "returnValue" || p === "totalSize" || p === "position";
};

mergeObjects = function mergeObjects(src, dst) {
  var k, v;
  for (k in src) {
    v = src[k];
    if (depricatedProp(k)) {
      continue;
    }
    try {
      dst[k] = src[k];
    } catch (_error) {}
  }
  return dst;
};

proxyEvents = function proxyEvents(events, src, dst) {
  var event, p, _i, _len;
  p = function p(event) {
    return function (e) {
      var clone, k, val;
      clone = {};
      for (k in e) {
        if (depricatedProp(k)) {
          continue;
        }
        val = e[k];
        clone[k] = val === src ? dst : val;
      }
      return dst[FIRE](event, clone);
    };
  };
  for (_i = 0, _len = events.length; _i < _len; _i++) {
    event = events[_i];
    if (dst._has(event)) {
      src["on" + event] = p(event);
    }
  }
};

fakeEvent = function fakeEvent(type) {
  var msieEventObject;
  if (document.createEventObject != null) {
    msieEventObject = document.createEventObject();
    msieEventObject.type = type;
    return msieEventObject;
  } else {
    try {
      return new Event(type);
    } catch (_error) {
      return {
        type: type
      };
    }
  }
};

EventEmitter = function EventEmitter(nodeStyle) {
  var emitter, events, listeners;
  events = {};
  listeners = function listeners(event) {
    return events[event] || [];
  };
  emitter = {};
  emitter[ON] = function (event, callback, i) {
    events[event] = listeners(event);
    if (events[event].indexOf(callback) >= 0) {
      return;
    }
    i = i === undefined ? events[event].length : i;
    events[event].splice(i, 0, callback);
  };
  emitter[OFF] = function (event, callback) {
    var i;
    if (event === undefined) {
      events = {};
      return;
    }
    if (callback === undefined) {
      events[event] = [];
    }
    i = listeners(event).indexOf(callback);
    if (i === -1) {
      return;
    }
    listeners(event).splice(i, 1);
  };
  emitter[FIRE] = function () {
    var args, event, i, legacylistener, listener, _i, _len, _ref;
    args = slice(arguments);
    event = args.shift();
    if (!nodeStyle) {
      args[0] = mergeObjects(args[0], fakeEvent(event));
    }
    legacylistener = emitter["on" + event];
    if (legacylistener) {
      legacylistener.apply(emitter, args);
    }
    _ref = listeners(event).concat(listeners("*"));
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      listener = _ref[i];
      listener.apply(emitter, args);
    }
  };
  emitter._has = function (event) {
    return !!(events[event] || emitter["on" + event]);
  };
  if (nodeStyle) {
    emitter.listeners = function (event) {
      return slice(listeners(event));
    };
    emitter.on = emitter[ON];
    emitter.off = emitter[OFF];
    emitter.fire = emitter[FIRE];
    emitter.once = function (e, fn) {
      var _fire;
      _fire = function fire() {
        emitter.off(e, _fire);
        return fn.apply(null, arguments);
      };
      return emitter.on(e, _fire);
    };
    emitter.destroy = function () {
      return events = {};
    };
  }
  return emitter;
};

xhook = EventEmitter(true);

xhook.EventEmitter = EventEmitter;

xhook[BEFORE] = function (handler, i) {
  if (handler.length < 1 || handler.length > 2) {
    throw "invalid hook";
  }
  return xhook[ON](BEFORE, handler, i);
};

xhook[AFTER] = function (handler, i) {
  if (handler.length < 2 || handler.length > 3) {
    throw "invalid hook";
  }
  return xhook[ON](AFTER, handler, i);
};

xhook.enable = function () {
  window[XMLHTTP] = XHookHttpRequest;
  if (NativeFormData) {
    window[FormData] = XHookFormData;
  }
};

xhook.disable = function () {
  window[XMLHTTP] = xhook[XMLHTTP];
  if (NativeFormData) {
    window[FormData] = NativeFormData;
  }
};

convertHeaders = xhook.headers = function (h, dest) {
  var header, headers, k, name, v, value, _i, _len, _ref;
  if (dest == null) {
    dest = {};
  }
  switch (typeof h === "undefined" ? "undefined" : _typeof(h)) {
    case "object":
      headers = [];
      for (k in h) {
        v = h[k];
        name = k.toLowerCase();
        headers.push("" + name + ":\t" + v);
      }
      return headers.join("\n");
    case "string":
      headers = h.split("\n");
      for (_i = 0, _len = headers.length; _i < _len; _i++) {
        header = headers[_i];
        if (/([^:]+):\s*(.+)/.test(header)) {
          name = (_ref = RegExp.$1) != null ? _ref.toLowerCase() : void 0;
          value = RegExp.$2;
          if (dest[name] == null) {
            dest[name] = value;
          }
        }
      }
      return dest;
  }
};

NativeFormData = window[FormData];

XHookFormData = function XHookFormData(form) {
  var entries;
  this.fd = form ? new NativeFormData(form) : new NativeFormData();
  this.form = form;
  entries = [];
  Object.defineProperty(this, "entries", {
    get: function get() {
      var fentries;
      fentries = !form ? [] : slice(form.querySelectorAll("input,select")).filter(function (e) {
        var _ref;
        return (_ref = e.type) !== "checkbox" && _ref !== "radio" || e.checked;
      }).map(function (e) {
        return [e.name, e.type === "file" ? e.files : e.value];
      });
      return fentries.concat(entries);
    }
  });
  this.append = function (_this) {
    return function () {
      var args;
      args = slice(arguments);
      entries.push(args);
      return _this.fd.append.apply(_this.fd, args);
    };
  }(this);
};

if (NativeFormData) {
  xhook[FormData] = NativeFormData;
  window[FormData] = XHookFormData;
}

NativeXMLHttp = window[XMLHTTP];

xhook[XMLHTTP] = NativeXMLHttp;

XHookHttpRequest = window[XMLHTTP] = function () {
  var ABORTED, currentState, emitFinal, emitReadyState, event, facade, hasError, hasErrorHandler, readBody, readHead, request, response, setReadyState, status, transiting, writeBody, writeHead, xhr, _i, _len, _ref;
  ABORTED = -1;
  xhr = new xhook[XMLHTTP]();
  request = {};
  status = null;
  hasError = void 0;
  transiting = void 0;
  response = void 0;
  readHead = function readHead() {
    var key, name, val, _ref;
    response.status = status || xhr.status;
    if (!(status === ABORTED && msie < 10)) {
      response.statusText = xhr.statusText;
    }
    if (status !== ABORTED) {
      _ref = convertHeaders(xhr.getAllResponseHeaders());
      for (key in _ref) {
        val = _ref[key];
        if (!response.headers[key]) {
          name = key.toLowerCase();
          response.headers[name] = val;
        }
      }
    }
  };
  readBody = function readBody() {
    if (!xhr.responseType || xhr.responseType === "text") {
      response.text = xhr.responseText;
      response.data = xhr.responseText;
    } else if (xhr.responseType === "document") {
      response.xml = xhr.responseXML;
      response.data = xhr.responseXML;
    } else {
      response.data = xhr.response;
    }
    if ("responseURL" in xhr) {
      response.finalUrl = xhr.responseURL;
    }
  };
  writeHead = function writeHead() {
    facade.status = response.status;
    facade.statusText = response.statusText;
  };
  writeBody = function writeBody() {
    if ("text" in response) {
      facade.responseText = response.text;
    }
    if ("xml" in response) {
      facade.responseXML = response.xml;
    }
    if ("data" in response) {
      facade.response = response.data;
    }
    if ("finalUrl" in response) {
      facade.responseURL = response.finalUrl;
    }
  };
  emitReadyState = function emitReadyState(n) {
    while (n > currentState && currentState < 4) {
      facade[READY_STATE] = ++currentState;
      if (currentState === 1) {
        facade[FIRE]("loadstart", {});
      }
      if (currentState === 2) {
        writeHead();
      }
      if (currentState === 4) {
        writeHead();
        writeBody();
      }
      facade[FIRE]("readystatechange", {});
      if (currentState === 4) {
        setTimeout(emitFinal, 0);
      }
    }
  };
  emitFinal = function emitFinal() {
    if (!hasError) {
      facade[FIRE]("load", {});
    }
    facade[FIRE]("loadend", {});
    if (hasError) {
      facade[READY_STATE] = 0;
    }
  };
  currentState = 0;
  setReadyState = function setReadyState(n) {
    var hooks, _process;
    if (n !== 4) {
      emitReadyState(n);
      return;
    }
    hooks = xhook.listeners(AFTER);
    _process = function process() {
      var hook;
      if (!hooks.length) {
        return emitReadyState(4);
      }
      hook = hooks.shift();
      if (hook.length === 2) {
        hook(request, response);
        return _process();
      } else if (hook.length === 3 && request.async) {
        return hook(request, response, _process);
      } else {
        return _process();
      }
    };
    _process();
  };
  facade = request.xhr = EventEmitter();
  xhr.onreadystatechange = function (event) {
    try {
      if (xhr[READY_STATE] === 2) {
        readHead();
      }
    } catch (_error) {}
    if (xhr[READY_STATE] === 4) {
      transiting = false;
      readHead();
      readBody();
    }
    setReadyState(xhr[READY_STATE]);
  };
  hasErrorHandler = function hasErrorHandler() {
    hasError = true;
  };
  facade[ON]("error", hasErrorHandler);
  facade[ON]("timeout", hasErrorHandler);
  facade[ON]("abort", hasErrorHandler);
  facade[ON]("progress", function () {
    if (currentState < 3) {
      setReadyState(3);
    } else {
      facade[FIRE]("readystatechange", {});
    }
  });
  if ("withCredentials" in xhr || xhook.addWithCredentials) {
    facade.withCredentials = false;
  }
  facade.status = 0;
  _ref = COMMON_EVENTS.concat(UPLOAD_EVENTS);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    facade["on" + event] = null;
  }
  facade.open = function (method, url, async, user, pass) {
    currentState = 0;
    hasError = false;
    transiting = false;
    request.headers = {};
    request.headerNames = {};
    request.status = 0;
    response = {};
    response.headers = {};
    request.method = method;
    request.url = url;
    request.async = async !== false;
    request.user = user;
    request.pass = pass;
    setReadyState(1);
  };
  facade.send = function (body) {
    var hooks, k, modk, _process2, send, _j, _len1, _ref1;
    _ref1 = ["type", "timeout", "withCredentials"];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      modk = k === "type" ? "responseType" : k;
      if (modk in facade) {
        request[k] = facade[modk];
      }
    }
    request.body = body;
    send = function send() {
      var header, value, _k, _len2, _ref2, _ref3;
      proxyEvents(COMMON_EVENTS, xhr, facade);
      if (facade.upload) {
        proxyEvents(COMMON_EVENTS.concat(UPLOAD_EVENTS), xhr.upload, facade.upload);
      }
      transiting = true;
      xhr.open(request.method, request.url, request.async, request.user, request.pass);
      _ref2 = ["type", "timeout", "withCredentials"];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        k = _ref2[_k];
        modk = k === "type" ? "responseType" : k;
        if (k in request) {
          xhr[modk] = request[k];
        }
      }
      _ref3 = request.headers;
      for (header in _ref3) {
        value = _ref3[header];
        if (header) {
          xhr.setRequestHeader(header, value);
        }
      }
      if (request.body instanceof XHookFormData) {
        request.body = request.body.fd;
      }
      xhr.send(request.body);
    };
    hooks = xhook.listeners(BEFORE);
    _process2 = function process() {
      var done, hook;
      if (!hooks.length) {
        return send();
      }
      done = function done(userResponse) {
        if ((typeof userResponse === "undefined" ? "undefined" : _typeof(userResponse)) === "object" && (typeof userResponse.status === "number" || typeof response.status === "number")) {
          mergeObjects(userResponse, response);
          if (__indexOf.call(userResponse, "data") < 0) {
            userResponse.data = userResponse.response || userResponse.text;
          }
          setReadyState(4);
          return;
        }
        _process2();
      };
      done.head = function (userResponse) {
        mergeObjects(userResponse, response);
        return setReadyState(2);
      };
      done.progress = function (userResponse) {
        mergeObjects(userResponse, response);
        return setReadyState(3);
      };
      hook = hooks.shift();
      if (hook.length === 1) {
        return done(hook(request));
      } else if (hook.length === 2 && request.async) {
        return hook(request, done);
      } else {
        return done();
      }
    };
    _process2();
  };
  facade.abort = function () {
    status = ABORTED;
    if (transiting) {
      xhr.abort();
    } else {
      facade[FIRE]("abort", {});
    }
  };
  facade.setRequestHeader = function (header, value) {
    var lName, name;
    lName = header != null ? header.toLowerCase() : void 0;
    name = request.headerNames[lName] = request.headerNames[lName] || header;
    if (request.headers[name]) {
      value = request.headers[name] + ", " + value;
    }
    request.headers[name] = value;
  };
  facade.getResponseHeader = function (header) {
    var name;
    name = header != null ? header.toLowerCase() : void 0;
    return response.headers[name];
  };
  facade.getAllResponseHeaders = function () {
    return convertHeaders(response.headers);
  };
  if (xhr.overrideMimeType) {
    facade.overrideMimeType = function () {
      return xhr.overrideMimeType.apply(xhr, arguments);
    };
  }
  if (xhr.upload) {
    facade.upload = request.upload = EventEmitter();
  }
  return facade;
};

module.exports = xhook;
},{}],19:[function(require,module,exports) {
var config = function config(o) {
  if (o) {
    if (o.masters) {
      config.masters(o.masters);
    }
    if (o.slaves) {
      config.slaves(o.slaves);
    }
  }
};

//default config
config.debug = false;
config.timeout = 15e3;
config.cookies = {
  master: "Master-Cookie",
  slave: "Slave-Cookie"
};
//extras are also attached to config

module.exports = config;
},{}],16:[function(require,module,exports) {
var global = (1,eval)("this");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var xhook = require("../vendor/xhook");

var config = require("./config");

exports.COMPAT_VERSION = "V1";

var _window = window,
    location = _window.location;

exports.currentOrigin = location.protocol + "//" + location.host;
config.origin = exports.currentOrigin;

//emits 'warn' 'log' and 'timeout' events
exports.globalEmitter = xhook.EventEmitter(true);

exports.console = window.console || {};

var counter = 0;
exports.guid = function () {
  if (counter >= 1e6) counter = 0;
  var n = String(++counter);
  while (n.length < 6) {
    n = "0" + n;
  }return "xdomain-" + n;
};

exports.slice = function (o, n) {
  return Array.prototype.slice.call(o, n);
};

//create a logger of type
var newLogger = function newLogger(type) {
  return function (msg) {
    msg = "xdomain (" + exports.currentOrigin + "): " + msg;
    //emit event
    exports.globalEmitter.fire(type, msg);
    //skip logs when debug isnt enabled
    if (type === "log" && !config.debug) {
      return;
    }
    //user provided log/warn functions
    if (type in config) {
      config[type](msg);
      //fallback console
    } else if (type in console) {
      console[type](msg);
      //fallbackback alert
    } else if (type === "warn") {
      alert(msg);
    }
  };
};

exports.log = newLogger("log");
exports.warn = newLogger("warn");

exports.instOf = function (obj, global) {
  return global in window && obj instanceof window[global];
};

//absolute url parser (relative urls aren't crossdomain)
exports.parseUrl = function (url) {
  if (/^((https?:)?\/\/[^\/\?]+)(\/.*)?/.test(url)) {
    return {
      origin: (RegExp.$2 ? "" : location.protocol) + RegExp.$1,
      path: RegExp.$3
    };
  } else {
    exports.log("failed to parse absolute url: " + url);
    return null;
  }
};
config.parseUrl = exports.parseUrl;

exports.toRegExp = function (obj) {
  if (obj instanceof RegExp) {
    return obj;
  }
  var str = obj.toString().replace(/\W/g, function (str) {
    return "\\" + str;
  }).replace(/\\\*/g, ".*");
  return new RegExp("^" + str + "$");
};

//strip functions and objects from an object
exports.strip = function (src) {
  var dst = {};
  for (var k in src) {
    if (k === "returnValue") {
      continue;
    }
    var v = src[k];
    var t = typeof v === "undefined" ? "undefined" : _typeof(v);
    if (t !== "function" && t !== "object") {
      dst[k] = v;
    }
  }
  return dst;
};
},{"../vendor/xhook":4,"./config":19}],28:[function(require,module,exports) {
var xhook = require("../vendor/xhook");
var config = require("./config");

var _require = require("./util"),
    log = _require.log,
    warn = _require.warn,
    toRegExp = _require.toRegExp,
    strip = _require.strip,
    parseUrl = _require.parseUrl,
    COMPAT_VERSION = _require.COMPAT_VERSION;

//when you add masters, this node
//enables slave listeners

var enabled = false;
var masters = {};

exports.addMasters = function (config) {
  //validate iframe
  if (window === window.parent) {
    warn("slaves must be in an iframe");
    return;
  }
  //enable slave handler
  if (!enabled) {
    enabled = true;
    log("now handling incoming sockets...");
    window.parent.postMessage("XDPING_" + COMPAT_VERSION, "*");
  }
  //white-list the provided set of masters
  for (var origin in config) {
    var path = config[origin];
    if (origin === "file://" && path !== "*") {
      warn("file protocol only supports the * path");
      path = "*";
    }
    log("adding master: " + origin);
    masters[origin] = path;
  }
};

config.masters = exports.addMasters;

exports.handleSocket = function (origin, socket) {
  if (!enabled) {
    return;
  }
  //null means no origin can be determined,
  //this is true for file:// and data:// URIs.
  //html data:// URI are now blocked, they can
  //only be copy-and-pasted into the URL bar.
  if (origin === "null" || origin === "file:") {
    origin = "file://";
  }
  log("handle socket for \"" + origin + "\"");
  var pathRegex = null;
  for (var master in masters) {
    var regex = masters[master];
    try {
      var masterRegex = toRegExp(master);
      if (masterRegex.test(origin)) {
        pathRegex = toRegExp(regex);
        break;
      }
    } catch (error) {}
  }
  if (!pathRegex) {
    warn("blocked request from: '" + origin + "'");
    return;
  }
  socket.once("request", function (req) {
    log("request: " + req.method + " " + req.url);
    var p = parseUrl(req.url);
    if (!p || !pathRegex.test(p.path)) {
      warn("blocked request to path: '" + p.path + "' by regex: " + pathRegex);
      socket.close();
      return;
    }
    //perform real XHR here!
    //pass results to the socket
    var xhr = new XMLHttpRequest();
    xhr.open(req.method, req.url);
    xhr.addEventListener("*", function (e) {
      return socket.emit("xhr-event", e.type, strip(e));
    });
    if (xhr.upload) {
      xhr.upload.addEventListener("*", function (e) {
        return socket.emit("xhr-upload-event", e.type, strip(e));
      });
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      //extract properties
      var resp = {
        status: xhr.status,
        statusText: xhr.statusText,
        data: xhr.response,
        headers: xhook.headers(xhr.getAllResponseHeaders())
      };
      try {
        resp.text = xhr.responseText;
      } catch (error1) {}
      // XML over postMessage not supported
      // try resp.xml = xhr.responseXML
      return socket.emit("response", resp);
    };
    //allow aborts from the facade
    socket.once("abort", function () {
      return xhr.abort();
    });
    // document.cookie (Cookie header) can't be set inside an iframe
    // as many browsers have 3rd party cookies disabled. slaveCookie
    // contains the 'xdomain.cookie.slave' string set on the master.
    if (req.withCredentials) {
      xhr.withCredentials = true;
      if (req.slaveCookie) {
        req.headers[req.slaveCookie] = document.cookie;
      }
    }
    if (req.timeout) {
      xhr.timeout = req.timeout;
    }
    if (req.type) {
      xhr.responseType = req.type;
    }
    for (var k in req.headers) {
      var v = req.headers[k];
      xhr.setRequestHeader(k, v);
    }
    //deserialize FormData
    if (req.body instanceof Array && req.body[0] === "XD_FD") {
      var fd = new xhook.FormData();
      var entries = req.body[1];
      Array.from(entries).forEach(function (arg) {
        //deserialize blobs from arraybuffs
        //[0:marker, 1:real-args, 2:arraybuffer, 3:type]
        if (args[0] === "XD_BLOB" && args.length === 4) {
          var blob = new Blob([args[2]], { type: args[3] });
          args = args[1];
          args[1] = blob;
        }
        fd.append.apply(fd, args);
      });
      req.body = fd;
    }
    //fire off request
    xhr.send(req.body || null);
  });
  log("slave listening for requests on socket: " + socket.id);
};
},{"../vendor/xhook":4,"./config":19,"./util":16}],17:[function(require,module,exports) {
var xhook = require("../vendor/xhook");

var config = require("./config");

var _require = require("./util"),
    globalEmitter = _require.globalEmitter,
    log = _require.log,
    warn = _require.warn,
    COMPAT_VERSION = _require.COMPAT_VERSION;

var _require2 = require("./slave"),
    handleSocket = _require2.handleSocket;

//constants


var CHECK_STRING = "XD_CHECK";
var CHECK_INTERVAL = 100;
//state
var sockets = {};
var jsonEncode = true;

//a 'sock' is a two-way event-emitter,
//each side listens for messages with on()
//and the other side sends messages with emit()
exports.createSocket = function (id, frame) {
  var ready = false;
  var socket = xhook.EventEmitter(true);
  sockets[id] = socket;
  socket.id = id;
  socket.once("close", function () {
    socket.destroy();
    socket.close();
  });
  var pendingEmits = [];
  socket.emit = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var extra = typeof args[1] === "string" ? " -> " + args[1] : "";
    log("send socket: " + id + ": " + args[0] + extra);
    args.unshift(id);
    if (ready) {
      emit(args);
    } else {
      pendingEmits.push(args);
    }
  };
  var emit = function emit(args) {
    //convert to string when necessary
    if (jsonEncode) {
      args = JSON.stringify(args);
    }
    //send!
    frame.postMessage(args, "*");
  };

  socket.close = function () {
    socket.emit("close");
    log("close socket: " + id);
    sockets[id] = null;
  };

  socket.once(CHECK_STRING, function (obj) {
    jsonEncode = typeof obj === "string";
    ready = socket.ready = true;
    socket.emit("ready");
    log("ready socket: " + id + " (emit #" + pendingEmits.length + " pending)");
    while (pendingEmits.length) {
      emit(pendingEmits.shift());
    }
  });

  //start checking connectivitiy
  var checks = 0;
  var check = function check() {
    // send test message NO ENCODING
    frame.postMessage([id, CHECK_STRING, {}], "*");
    if (ready) {
      return;
    }
    if (checks++ >= config.timeout / CHECK_INTERVAL) {
      warn("Timeout waiting on iframe socket");
      globalEmitter.fire("timeout");
      socket.fire("abort"); //self-emit "abort"
    } else {
      log("check again in " + CHECK_INTERVAL + "ms...");
      setTimeout(check, CHECK_INTERVAL);
    }
  };
  setTimeout(check);

  log("new socket: " + id);
  return socket;
};

//ONE WINDOW LISTENER!
//double purpose:
//  creates new sockets by passing incoming events to the 'handler'
//  passes events to existing sockets (created by connect or by the server)
exports.initialise = function () {
  var handle = function handle(e) {
    var d = e.data;
    //return if not a json string
    if (typeof d === "string") {
      //only old versions of xdomain send XPINGs...
      if (/^XDPING(_(V\d+))?$/.test(d) && RegExp.$2 !== COMPAT_VERSION) {
        return warn("your master is not compatible with your slave, check your xdomain.js version");
        //IE will "toString()" the array, this reverses that action
      } else if (/^xdomain-/.test(d)) {
        d = d.split(",");
        //this browser must json encode postmessages
      } else if (jsonEncode) {
        try {
          d = JSON.parse(d);
        } catch (error) {
          return;
        }
      }
    }
    //return if not an array
    if (!(d instanceof Array)) {
      return;
    }
    //return unless lead by an xdomain id
    var id = d.shift();
    if (!/^xdomain-/.test(id)) {
      return;
    }
    //finally, create/get socket
    var socket = sockets[id];
    //closed
    if (socket === null) {
      return;
    }
    //needs creation
    if (socket === undefined) {
      //send unsolicited requests to the listening server
      if (!handleSocket) {
        return;
      }
      socket = exports.createSocket(id, e.source);
      handleSocket(e.origin, socket);
    }
    var extra = typeof d[1] === "string" ? " -> " + d[1] : "";
    log("receive socket: " + id + ": " + d[0] + extra);
    //emit data
    socket.fire.apply(socket, d);
  };
  if (document.addEventListener) {
    return window.addEventListener("message", handle);
  } else {
    return window.attachEvent("onmessage", handle);
  }
};
},{"../vendor/xhook":4,"./config":19,"./util":16,"./slave":28}],29:[function(require,module,exports) {
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var xhook = require("../vendor/xhook");
var config = require("./config");

var _require = require("./util"),
    currentOrigin = _require.currentOrigin,
    log = _require.log,
    warn = _require.warn,
    parseUrl = _require.parseUrl,
    guid = _require.guid,
    strip = _require.strip,
    instOf = _require.instOf;

var socketlib = require("./socket");
var createSocket = socketlib.createSocket;

//when you add slaves, this node
//enables master listeners

var enabled = false;
var slaves = {};

exports.addSlaves = function (newSlaves) {
  //register master xhook handler
  if (!enabled) {
    enabled = true;
    //unless already set, add withCredentials to xhrs to trick jquery
    //in older browsers into thinking cors is allowed
    if (!("addWithCredentials" in xhook)) {
      xhook.addWithCredentials = true;
    }
    //hook XHR calls
    xhook.before(beforeXHR);
  }
  //include the provided set of slave
  for (var origin in newSlaves) {
    var path = newSlaves[origin];
    log("adding slave: " + origin);
    slaves[origin] = path;
  }
};

config.slaves = exports.addSlaves;

var beforeXHR = function beforeXHR(request, callback) {
  //allow unless we have a slave domain
  var p = parseUrl(request.url);
  if (!p || p.origin === currentOrigin) {
    callback();
    return;
  }
  if (!slaves[p.origin]) {
    if (p) {
      log("no slave matching: '" + p.origin + "'");
    }
    callback();
    return;
  }
  log("proxying request to slave: '" + p.origin + "'");
  if (request.async === false) {
    warn("sync not supported because postmessage is async");
    callback();
    return;
  }
  //get or insert frame
  var frame = getFrame(p.origin, slaves[p.origin]);
  //connect to slave
  var socket = createSocket(guid(), frame);
  //queue callback
  socket.on("response", function (resp) {
    callback(resp);
    socket.close();
  });
  //user wants to abort
  request.xhr.addEventListener("abort", function () {
    return socket.emit("abort");
  });
  //kick off
  if (socket.ready) {
    handleRequest(request, socket);
  } else {
    socket.once("ready", function () {
      return handleRequest(request, socket);
    });
  }
};

var frames = {};
var getFrame = function getFrame(origin, proxyPath) {
  //cache origin
  if (frames[origin]) {
    return frames[origin];
  }
  var frame = document.createElement("iframe");
  frame.id = frame.name = guid();
  log("creating iframe " + frame.id);
  frame.src = "" + origin + proxyPath;
  frame.setAttribute("style", "display:none;");
  document.body.appendChild(frame);
  return frames[origin] = frame.contentWindow;
};

var convertToArrayBuffer = function convertToArrayBuffer(args, done) {
  var _Array$from = Array.from(args),
      _Array$from2 = _slicedToArray(_Array$from, 2),
      name = _Array$from2[0],
      obj = _Array$from2[1];

  var isBlob = instOf(obj, "Blob");
  var isFile = instOf(obj, "File");
  if (!isBlob && !isFile) {
    return 0;
  }
  var reader = new FileReader();
  reader.onload = function () {
    // clear value
    args[1] = null;
    // formdata.append(name, value, **filename**)
    if (isFile) {
      args[2] = obj.name;
    }
    return done(["XD_BLOB", args, this.result, obj.type]);
  };
  reader.readAsArrayBuffer(obj);
  return 1;
};

//this FormData is actually XHooks custom FormData `fd`,
//which exposes all `entries` added, where each entry
//is the arguments object
var convertFormData = function convertFormData(entries, send) {
  //expand FileList -> [File, File, File]
  entries.forEach(function (args, i) {
    var _Array$from3 = Array.from(args),
        _Array$from4 = _slicedToArray(_Array$from3, 2),
        name = _Array$from4[0],
        value = _Array$from4[1];

    if (instOf(value, "FileList")) {
      entries.splice(i, 1);
      Array.from(value).forEach(function (file) {
        entries.splice(i, 0, [name, file]);
      });
    }
  });
  //basically: async.parallel([filter:files], send)
  var c = 0;
  entries.forEach(function (args, i) {
    c += convertToArrayBuffer(args, function (newargs) {
      entries[i] = newargs;
      if (--c === 0) {
        send();
      }
    });
  });
  if (c === 0) {
    send();
  }
};

var handleRequest = function handleRequest(request, socket) {
  socket.on("xhr-event", function () {
    return request.xhr.dispatchEvent.apply(null, arguments);
  });
  socket.on("xhr-upload-event", function () {
    return request.xhr.upload.dispatchEvent.apply(null, arguments);
  });

  var obj = strip(request);
  obj.headers = request.headers;
  //add master cookie
  if (request.withCredentials) {
    if (config.cookies.master) {
      obj.headers[config.cookies.master] = document.cookie;
    }
    obj.slaveCookie = config.cookies.slave;
  }

  var send = function send() {
    return socket.emit("request", obj);
  };

  if (request.body) {
    obj.body = request.body;
    //async serialize formdata
    if (instOf(obj.body, "FormData")) {
      var entries = obj.body.entries;

      obj.body = ["XD_FD", entries];
      convertFormData(entries, send);
      return;
    }
  }
  send();
};
},{"../vendor/xhook":4,"./config":19,"./util":16,"./socket":17}],18:[function(require,module,exports) {
var config = require("./config");

var _require = require("./util"),
    parseUrl = _require.parseUrl;

var _require2 = require("./master"),
    addSlaves = _require2.addSlaves;

var _require3 = require("./slave"),
    addMasters = _require3.addMasters;

var _window = window,
    document = _window.document;
//auto init using attributes

exports.initialise = function () {
  //attribute handlers
  var attrs = {
    debug: function debug(value) {
      config.debug = value !== "false";
    },
    slave: function slave(value) {
      var p = parseUrl(value);
      if (!p) {
        return;
      }
      var s = {};
      s[p.origin] = p.path;
      addSlaves(s);
    },
    master: function master(value) {
      var p = void 0;
      if (value === "*") {
        p = { origin: "*", path: "*" };
      } else if (value === "file://*") {
        p = { origin: "file://", path: "*" };
      } else {
        p = parseUrl(value);
      }
      if (!p) {
        return;
      }
      var m = {};
      m[p.origin] = p.path.replace(/^\//, "") ? p.path : "*";
      addMasters(m);
    }
  };
  //find all script tags referencing 'xdomain' and then
  //find all attributes with handlers registered
  Array.from(document.getElementsByTagName("script")).forEach(function (script) {
    if (!/xdomain/.test(script.src)) {
      return;
    }
    ["", "data-"].forEach(function (prefix) {
      for (var k in attrs) {
        var value = script.getAttribute(prefix + k);
        if (value) {
          var fn = attrs[k];
          fn(value);
        }
      }
    });
  });
};
},{"./config":19,"./util":16,"./master":29,"./slave":28}],3:[function(require,module,exports) {
"use strict";

//feature detect

var _require = require("./lib/util"),
    warn = _require.warn;

["postMessage", "JSON"].forEach(function (feature) {
  if (!window[feature]) {
    warn("requires '" + feature + "' and this browser does not support it");
  }
});

//init socket (post message mini-library)
var socket = require("./lib/socket");
socket.initialise();

//initialise script (load config from script tag)
var script = require("./lib/script");
script.initialise();

//public api
var initialise = require("./lib/config");
//config is also the primary intialise function
module.exports = initialise;
},{"./lib/util":16,"./lib/socket":17,"./lib/script":18,"./lib/config":19}],1:[function(require,module,exports) {
if (!Array.from) {
  Array.from = require("array.from").getPolyfill();
}
var xhook = require("./vendor/xhook");
window.xhook = xhook;
var xdomain = require("./index");
window.xdomain = xdomain;
},{"array.from":5,"./vendor/xhook":4,"./index":3}]},{},[1])
//# sourceMappingURL=xdomain.map