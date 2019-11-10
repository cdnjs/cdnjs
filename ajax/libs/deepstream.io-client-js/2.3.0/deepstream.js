(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.deepstream = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || Object.create(null);
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || Object.create(null);

  // all
  if (0 == arguments.length) {
    this._callbacks = Object.create(null);
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks[event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || Object.create(null);

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks[event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || Object.create(null);
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

/**
 * Returns an array listing the events for which the emitter has registered listeners.
 *
 * @return {Array}
 * @api public
 */
Emitter.prototype.eventNames = function(){
  return this._callbacks ? Object.keys(this._callbacks) : [];
}

},{}],3:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],6:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],7:[function(_dereq_,module,exports){
'use strict';

exports.decode = exports.parse = _dereq_('./decode');
exports.encode = exports.stringify = _dereq_('./encode');

},{"./decode":5,"./encode":6}],8:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = _dereq_('punycode');
var util = _dereq_('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = _dereq_('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":9,"punycode":4,"querystring":7}],9:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],10:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('./constants/constants');
var MS = _dereq_('./constants/merge-strategies');
var Emitter = _dereq_('component-emitter2');
var Connection = _dereq_('./message/connection');
var EventHandler = _dereq_('./event/event-handler');
var RpcHandler = _dereq_('./rpc/rpc-handler');
var RecordHandler = _dereq_('./record/record-handler');
var PresenceHandler = _dereq_('./presence/presence-handler');
var defaultOptions = _dereq_('./default-options');
var AckTimeoutRegistry = _dereq_('./utils/ack-timeout-registry');

/**
 * deepstream.io javascript client
 *
 * @copyright 2016 deepstreamHub GmbH
 * @author deepstreamHub GmbH
 *
 *
 * @{@link http://deepstream.io}
 *
 *
 * @param {String} url     URL to connect to. The protocol can be ommited, e.g. <host>:<port>.
 * @param {Object} options A map of options that extend the ones specified in default-options.js
 *
 * @public
 * @constructor
 */
var Client = function Client(url, options) {
  this._url = url;
  this._options = this._getOptions(options || {});

  this._connection = new Connection(this, this._url, this._options);
  this._ackTimeoutRegistry = new AckTimeoutRegistry(this, this._options);

  this.event = new EventHandler(this._options, this._connection, this);
  this.rpc = new RpcHandler(this._options, this._connection, this);
  this.record = new RecordHandler(this._options, this._connection, this);
  this.presence = new PresenceHandler(this._options, this._connection, this);

  this._messageCallbacks = {};
  this._messageCallbacks[C.TOPIC.EVENT] = this.event._$handle.bind(this.event);
  this._messageCallbacks[C.TOPIC.RPC] = this.rpc._$handle.bind(this.rpc);
  this._messageCallbacks[C.TOPIC.RECORD] = this.record._$handle.bind(this.record);
  this._messageCallbacks[C.TOPIC.PRESENCE] = this.presence._$handle.bind(this.presence);
  this._messageCallbacks[C.TOPIC.ERROR] = this._onErrorMessage.bind(this);
};

Emitter(Client.prototype); // eslint-disable-line

/**
 * Send authentication parameters to the client to fully open
 * the connection.
 *
 * Please note: Authentication parameters are send over an already established
 * connection, rather than appended to the server URL. This means the parameters
 * will be encrypted when used with a WSS / HTTPS connection. If the deepstream server
 * on the other side has message logging enabled it will however be written to the logs in
 * plain text. If additional security is a requirement it might therefor make sense to hash
 * the password on the client.
 *
 * If the connection is not yet established the authentication parameter will be
 * stored and send once it becomes available
 *
 * authParams can be any JSON serializable data structure and its up for the
 * permission handler on the server to make sense of them, although something
 * like { username: 'someName', password: 'somePass' } will probably make the most sense.
 *
 * login can be called multiple times until either the connection is authenticated or
 * forcefully closed by the server since its maxAuthAttempts threshold has been exceeded
 *
 * @param   {Object}   authParams JSON.serializable authentication data
 * @param   {Function} callback   Will be called with either (true) or (false, data)
 *
 * @public
 * @returns {Client}
 */
Client.prototype.login = function (authParamsOrCallback, callback) {
  if (typeof authParamsOrCallback === 'function') {
    this._connection.authenticate({}, authParamsOrCallback);
  } else {
    this._connection.authenticate(authParamsOrCallback || {}, callback);
  }
  return this;
};

/**
 * Closes the connection to the server.
 *
 * @public
 * @returns {void}
 */
Client.prototype.close = function () {
  this._connection.close();
};

/**
 * Returns the current state of the connection.
 *
 * connectionState is one of CONSTANTS.CONNECTION_STATE
 *
 * @returns {[type]} [description]
 */
Client.prototype.getConnectionState = function () {
  return this._connection.getState();
};

/**
 * Returns a random string. The first block of characters
 * is a timestamp, in order to allow databases to optimize for semi-
 * sequentuel numberings
 *
 * @public
 * @returns {String} unique id
 */
Client.prototype.getUid = function () {
  var timestamp = new Date().getTime().toString(36);
  var randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');

  return timestamp + '-' + randomString;
};

/**
 * Package private ack timeout registry. This is how all classes can get access to
 * register timeouts.
 * (Well... that's the intention anyways)
 *
 * @package private
 * @returns {AckTimeoutRegistry}
 */
Client.prototype._$getAckTimeoutRegistry = function () {
  return this._ackTimeoutRegistry;
};

/**
 * Package private callback for parsed incoming messages. Will be invoked
 * by the connection class
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
Client.prototype._$onMessage = function (message) {
  if (this._messageCallbacks[message.topic]) {
    this._messageCallbacks[message.topic](message);
  } else {
    message.processedError = true;
    this._$onError(message.topic, C.EVENT.MESSAGE_PARSE_ERROR, 'Received message for unknown topic ' + message.topic);
  }

  if (message.action === C.ACTIONS.ERROR && !message.processedError) {
    this._$onError(message.topic, message.data[0], message.data.slice(0));
  }
};

/**
 * Package private error callback. This is the single point at which
 * errors are thrown in the client. (Well... that's the intention anyways)
 *
 * The expectations would be for implementations to subscribe
 * to the client's error event to prevent errors from being thrown
 * and then decide based on the event and topic parameters how
 * to handle the errors
 *
 * IMPORTANT: Errors that are specific to a request, e.g. a RPC
 * timing out or a record not being permissioned are passed directly
 * to the method that requested them
 *
 * @param   {String} topic One of CONSTANTS.TOPIC
 * @param   {String} event One of CONSTANTS.EVENT
 * @param   {String} msg   Error dependent message
 *
 * @package private
 * @returns {void}
 */
Client.prototype._$onError = function (topic, event, msg) {
  var errorMsg = void 0;

  /*
   * Help to diagnose the problem quicker by checking for
   * some common problems
   */
  if (event === C.EVENT.ACK_TIMEOUT || event === C.EVENT.RESPONSE_TIMEOUT) {
    if (this.getConnectionState() === C.CONNECTION_STATE.AWAITING_AUTHENTICATION) {
      errorMsg = 'Your message timed out because you\'re not authenticated. Have you called login()?';
      setTimeout(this._$onError.bind(this, C.EVENT.NOT_AUTHENTICATED, C.TOPIC.ERROR, errorMsg), 1);
    }
  }

  if (this.hasListeners('error')) {
    this.emit('error', msg, event, topic);
    this.emit(event, topic, msg);
  } else {
    console.log('--- You can catch all deepstream errors by subscribing to the error event ---');

    errorMsg = event + ': ' + msg;

    if (topic) {
      errorMsg += ' (' + topic + ')';
    }

    throw new Error(errorMsg);
  }
};

/**
 * Passes generic messages from the error topic
 * to the _$onError handler
 *
 * @param {Object} errorMessage parsed deepstream error message
 *
 * @private
 * @returns {void}
 */
Client.prototype._onErrorMessage = function (errorMessage) {
  this._$onError(errorMessage.topic, errorMessage.data[0], errorMessage.data[1]);
};

/**
 * Creates a new options map by extending default
 * options with the passed in options
 *
 * @param   {Object} options The user specified client configuration options
 *
 * @private
 * @returns {Object}  merged options
 */
Client.prototype._getOptions = function (options) {
  var mergedOptions = {};

  for (var key in defaultOptions) {
    if (typeof options[key] === 'undefined') {
      mergedOptions[key] = defaultOptions[key];
    } else {
      mergedOptions[key] = options[key];
    }
  }

  return mergedOptions;
};

/**
 * Exports factory function to adjust to the current JS style of
 * disliking 'new' :-)
 *
 * @param {String} url     URL to connect to. The protocol can be ommited, e.g. <host>:<port>.
 * @param {Object} options A map of options that extend the ones specified in default-options.js
 *
 * @public
 * @returns {void}
 */
function createDeepstream(url, options) {
  return new Client(url, options);
}

/**
 * Expose constants to allow consumers to access them
*/
Client.prototype.CONSTANTS = C;
createDeepstream.CONSTANTS = C;

/**
 * Expose merge strategies to allow consumers to access them
*/
Client.prototype.MERGE_STRATEGIES = MS;
createDeepstream.MERGE_STRATEGIES = MS;

module.exports = createDeepstream;

},{"./constants/constants":11,"./constants/merge-strategies":12,"./default-options":13,"./event/event-handler":14,"./message/connection":15,"./presence/presence-handler":18,"./record/record-handler":22,"./rpc/rpc-handler":24,"./utils/ack-timeout-registry":27,"component-emitter2":2}],11:[function(_dereq_,module,exports){
'use strict';

exports.CONNECTION_STATE = {};

exports.CONNECTION_STATE.CLOSED = 'CLOSED';
exports.CONNECTION_STATE.AWAITING_CONNECTION = 'AWAITING_CONNECTION';
exports.CONNECTION_STATE.CHALLENGING = 'CHALLENGING';
exports.CONNECTION_STATE.AWAITING_AUTHENTICATION = 'AWAITING_AUTHENTICATION';
exports.CONNECTION_STATE.AUTHENTICATING = 'AUTHENTICATING';
exports.CONNECTION_STATE.OPEN = 'OPEN';
exports.CONNECTION_STATE.ERROR = 'ERROR';
exports.CONNECTION_STATE.RECONNECTING = 'RECONNECTING';

exports.MESSAGE_SEPERATOR = String.fromCharCode(30); // ASCII Record Seperator 1E
exports.MESSAGE_PART_SEPERATOR = String.fromCharCode(31); // ASCII Unit Separator 1F

exports.TYPES = {};
exports.TYPES.STRING = 'S';
exports.TYPES.OBJECT = 'O';
exports.TYPES.NUMBER = 'N';
exports.TYPES.NULL = 'L';
exports.TYPES.TRUE = 'T';
exports.TYPES.FALSE = 'F';
exports.TYPES.UNDEFINED = 'U';

exports.TOPIC = {};
exports.TOPIC.CONNECTION = 'C';
exports.TOPIC.AUTH = 'A';
exports.TOPIC.ERROR = 'X';
exports.TOPIC.EVENT = 'E';
exports.TOPIC.RECORD = 'R';
exports.TOPIC.RPC = 'P';
exports.TOPIC.PRESENCE = 'U';
exports.TOPIC.PRIVATE = 'PRIVATE/';

exports.EVENT = {};
exports.EVENT.CONNECTION_ERROR = 'connectionError';
exports.EVENT.CONNECTION_STATE_CHANGED = 'connectionStateChanged';
exports.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED = 'MAX_RECONNECTION_ATTEMPTS_REACHED';
exports.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT = 'CONNECTION_AUTHENTICATION_TIMEOUT';
exports.EVENT.ACK_TIMEOUT = 'ACK_TIMEOUT';
exports.EVENT.NO_RPC_PROVIDER = 'NO_RPC_PROVIDER';
exports.EVENT.RESPONSE_TIMEOUT = 'RESPONSE_TIMEOUT';
exports.EVENT.DELETE_TIMEOUT = 'DELETE_TIMEOUT';
exports.EVENT.UNSOLICITED_MESSAGE = 'UNSOLICITED_MESSAGE';
exports.EVENT.MESSAGE_DENIED = 'MESSAGE_DENIED';
exports.EVENT.MESSAGE_PARSE_ERROR = 'MESSAGE_PARSE_ERROR';
exports.EVENT.VERSION_EXISTS = 'VERSION_EXISTS';
exports.EVENT.NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
exports.EVENT.MESSAGE_PERMISSION_ERROR = 'MESSAGE_PERMISSION_ERROR';
exports.EVENT.LISTENER_EXISTS = 'LISTENER_EXISTS';
exports.EVENT.NOT_LISTENING = 'NOT_LISTENING';
exports.EVENT.TOO_MANY_AUTH_ATTEMPTS = 'TOO_MANY_AUTH_ATTEMPTS';
exports.EVENT.INVALID_AUTH_MSG = 'INVALID_AUTH_MSG';
exports.EVENT.IS_CLOSED = 'IS_CLOSED';
exports.EVENT.RECORD_NOT_FOUND = 'RECORD_NOT_FOUND';
exports.EVENT.NOT_SUBSCRIBED = 'NOT_SUBSCRIBED';

exports.ACTIONS = {};
exports.ACTIONS.PING = 'PI';
exports.ACTIONS.PONG = 'PO';
exports.ACTIONS.ACK = 'A';
exports.ACTIONS.REDIRECT = 'RED';
exports.ACTIONS.CHALLENGE = 'CH';
exports.ACTIONS.CHALLENGE_RESPONSE = 'CHR';
exports.ACTIONS.READ = 'R';
exports.ACTIONS.CREATE = 'C';
exports.ACTIONS.UPDATE = 'U';
exports.ACTIONS.PATCH = 'P';
exports.ACTIONS.DELETE = 'D';
exports.ACTIONS.SUBSCRIBE = 'S';
exports.ACTIONS.UNSUBSCRIBE = 'US';
exports.ACTIONS.HAS = 'H';
exports.ACTIONS.SNAPSHOT = 'SN';
exports.ACTIONS.INVOKE = 'I';
exports.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND = 'SP';
exports.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED = 'SR';
exports.ACTIONS.SUBSCRIPTION_HAS_PROVIDER = 'SH';
exports.ACTIONS.LISTEN = 'L';
exports.ACTIONS.UNLISTEN = 'UL';
exports.ACTIONS.LISTEN_ACCEPT = 'LA';
exports.ACTIONS.LISTEN_REJECT = 'LR';
exports.ACTIONS.PROVIDER_UPDATE = 'PU';
exports.ACTIONS.QUERY = 'Q';
exports.ACTIONS.CREATEORREAD = 'CR';
exports.ACTIONS.CREATEANDUPDATE = 'CU';
exports.ACTIONS.EVENT = 'EVT';
exports.ACTIONS.ERROR = 'E';
exports.ACTIONS.REQUEST = 'REQ';
exports.ACTIONS.RESPONSE = 'RES';
exports.ACTIONS.REJECTION = 'REJ';
exports.ACTIONS.PRESENCE_JOIN = 'PNJ';
exports.ACTIONS.PRESENCE_LEAVE = 'PNL';
exports.ACTIONS.WRITE_ACKNOWLEDGEMENT = 'WA';

exports.CALL_STATE = {};
exports.CALL_STATE.INITIAL = 'INITIAL';
exports.CALL_STATE.CONNECTING = 'CONNECTING';
exports.CALL_STATE.ESTABLISHED = 'ESTABLISHED';
exports.CALL_STATE.ACCEPTED = 'ACCEPTED';
exports.CALL_STATE.DECLINED = 'DECLINED';
exports.CALL_STATE.ENDED = 'ENDED';
exports.CALL_STATE.ERROR = 'ERROR';

},{}],12:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  /**
  *  Choose the server's state over the client's
  **/
  REMOTE_WINS: function REMOTE_WINS(record, remoteValue, remoteVersion, callback) {
    callback(null, remoteValue);
  },

  /**
  *  Choose the local state over the server's
  **/
  LOCAL_WINS: function LOCAL_WINS(record, remoteValue, remoteVersion, callback) {
    callback(null, record.get());
  }
};

},{}],13:[function(_dereq_,module,exports){
'use strict';

var MERGE_STRATEGIES = _dereq_('./constants/merge-strategies');

module.exports = {
  /**
   * @param {Number} heartBeatInterval           How often you expect the heartbeat to be sent.
   *                                             If two heatbeats are missed in a row the client
   *                                             will consider the server to have disconnected
   *                                             and will close the connection in order to
   *                                             establish a new one.
   */
  heartbeatInterval: 30000,

  /**
   * @param {Number} reconnectIntervalIncrement  Specifies the number of milliseconds by
   *                                             which the time until the next reconnection
   *                                             attempt will be incremented after every
   *                                             unsuccesful attempt.
   *                                             E.g. for 1500: if the connection is lost,
   *                                             the client will attempt to reconnect immediatly,
   *                                             if that fails it will try again after 1.5 seconds,
   *                                             if that fails it will try again after 3 seconds
   *                                             and so on
   */
  reconnectIntervalIncrement: 4000,

  /**
   * @param {Number} maxReconnectInterval        Specifies the maximum number of milliseconds for
   *                                             the reconnectIntervalIncrement
   *                                             The amount of reconnections will reach this value
   *                                             then reconnectIntervalIncrement will be ignored.
   */
  maxReconnectInterval: 180000,

  /**
   * @param {Number} maxReconnectAttempts        The number of reconnection attempts until the
   *                                             client gives up and declares the connection closed
   */
  maxReconnectAttempts: 5,

  /**
   * @param {Number} rpcAckTimeout               The number of milliseconds after which a rpc will
   *                                             create an error if no Ack-message has been received
   */
  rpcAckTimeout: 6000,

  /**
   * @param {Number} rpcResponseTimeout          The number of milliseconds after which a rpc will
   *                                             create an error if no response-message has been
   *                                             received
   */
  rpcResponseTimeout: 10000,

  /**
   * @param {Number} subscriptionTimeout         The number of milliseconds that can pass after
   *                                             providing/unproviding a RPC or subscribing/
   *                                             unsubscribing/listening to a record before an
   *                                             error is thrown
   */
  subscriptionTimeout: 2000,

  /**
   * @param {Number} maxMessagesPerPacket        If the implementation tries to send a large
   *                                             number of messages at the same time, the deepstream
   *                                             client will try to split them into smaller packets
   *                                             and send these every
   *                                             <timeBetweenSendingQueuedPackages> ms.
   *
   *                                             This parameter specifies the number of messages
   *                                             after which deepstream sends the packet and
   *                                             queues the remaining messages.
   *                                             Set to Infinity to turn the feature off.
   *
   */
  maxMessagesPerPacket: 100,

  /**
   * @param {Number} timeBetweenSendingQueuedPackages
   *                                             Please see description for
   *                                             maxMessagesPerPacket. Sets the time in ms.
   */
  timeBetweenSendingQueuedPackages: 16,

  /**
   * @param {Number} recordReadAckTimeout       The number of milliseconds from the moment
   *                                            client.record.getRecord() is called until an error
   *                                            is thrown since no ack message has been received.
   */
  recordReadAckTimeout: 15000,

  /**
   * @param {Number} recordReadTimeout           The number of milliseconds from the moment
   *                                             client.record.getRecord() is called until an error
   *                                             is thrown since no data has been received.
   */
  recordReadTimeout: 15000,

  /**
   * @param {Number} recordDeleteTimeout         The number of milliseconds from the moment
   *                                             record.delete() is called until an error is
   *                                             thrown since no delete ack message had been
   *                                             received.
   *                                             Please take into account that the deletion is only
   *                                             complete after the record has been deleted from
   *                                             both cache and storage
   */
  recordDeleteTimeout: 15000,

  /**
   * @param {String} path path to connect to
   */
  path: '/deepstream',

  /**
   *  @param {Function} mergeStrategy            This provides the default strategy used to
   *                                             deal with merge conflicts.
   *                                             If the merge strategy is not succesfull it will
   *                                             set an error, else set the returned data as the
   *                                             latest revision. This can be overriden on a per
   *                                             record basis by setting the `setMergeStrategy`.
   */
  mergeStrategy: MERGE_STRATEGIES.REMOTE_WINS,

  /**
   * @param {Boolean} recordDeepCopy             Setting to false disabled deepcopying of record
   *                                             data when provided via `get()` in a `subscribe`
   *                                             callback. This improves speed at the expense of
   *                                             the user having to ensure object immutability.
   */
  recordDeepCopy: true,

  /**
   * https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketaddress-protocols-options
   *
   * @param {Object} nodeSocketOptions           Options to pass to the websocket constructor in
   *                                             node.
   * @default null
   */
  nodeSocketOptions: null
};

},{"./constants/merge-strategies":12}],14:[function(_dereq_,module,exports){
'use strict';

var messageBuilder = _dereq_('../message/message-builder');
var messageParser = _dereq_('../message/message-parser');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');
var C = _dereq_('../constants/constants');
var Listener = _dereq_('../utils/listener');
var EventEmitter = _dereq_('component-emitter2');

/**
 * This class handles incoming and outgoing messages in relation
 * to deepstream events. It basically acts like an event-hub that's
 * replicated across all connected clients.
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 * @public
 * @constructor
 */
var EventHandler = function EventHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._emitter = new EventEmitter();
  this._listener = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resubscribe.bind(this));
};

/**
 * Subscribe to an event. This will receive both locally emitted events
 * as well as events emitted by other connected clients.
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.subscribe = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (!this._emitter.hasListeners(name)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.ACTIONS.SUBSCRIBE,
      name: name
    });
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [name]);
  }

  this._emitter.on(name, callback);
};

/**
 * Removes a callback for a specified event. If all callbacks
 * for an event have been removed, the server will be notified
 * that the client is unsubscribed as a listener
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unsubscribe = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }
  this._emitter.off(name, callback);

  if (!this._emitter.hasListeners(name)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.ACTIONS.UNSUBSCRIBE,
      name: name
    });
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.UNSUBSCRIBE, [name]);
  }
};

/**
 * Emits an event locally and sends a message to the server to
 * broadcast the event to the other connected clients
 *
 * @param   {String} name
 * @param   {Mixed} data will be serialized and deserialized to its original type.
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.emit = function (name, data) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.EVENT, [name, messageBuilder.typed(data)]);
  this._emitter.emit(name, data);
};

/**
 * Allows to listen for event subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular event if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.listen = function (pattern, callback) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._listener[pattern] && !this._listener[pattern].destroyPending) {
    this._client._$onError(C.TOPIC.EVENT, C.EVENT.LISTENER_EXISTS, pattern);
    return;
  } else if (this._listener[pattern]) {
    this._listener[pattern].destroy();
  }

  this._listener[pattern] = new Listener(C.TOPIC.EVENT, pattern, callback, this._options, this._client, this._connection);
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unlisten = function (pattern) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }

  var listener = this._listener[pattern];

  if (listener && !listener.destroyPending) {
    listener.sendDestroy();
  } else if (this._listener[pattern]) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.EVENT.UNLISTEN,
      name: pattern
    });
    this._listener[pattern].destroy();
    delete this._listener[pattern];
  } else {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern);
  }
};

/**
 * Handles incoming messages from the server
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._$handle = function (message) {
  var name = message.data[message.action === C.ACTIONS.ACK ? 1 : 0];

  if (message.action === C.ACTIONS.EVENT) {
    if (message.data && message.data.length === 2) {
      this._emitter.emit(name, messageParser.convertTyped(message.data[1], this._client));
    } else {
      this._emitter.emit(name);
    }
    return;
  }

  if (message.action === C.ACTIONS.ACK && message.data[0] === C.ACTIONS.UNLISTEN && this._listener[name] && this._listener[name].destroyPending) {
    this._listener[name].destroy();
    delete this._listener[name];
    return;
  } else if (this._listener[name]) {
    this._listener[name]._$onMessage(message);
    return;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    // An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
    return;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    // record can receive a HAS_PROVIDER after discarding the record
    return;
  }

  if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
    return;
  }

  if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.EVENT,
        name: message.data[1],
        action: message.data[2]
      });
    } else if (message.data[0] === C.EVENT.NOT_SUBSCRIBED) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.EVENT,
        name: message.data[1],
        action: C.ACTIONS.UNSUBSCRIBE
      });
    }
    message.processedError = true;
    this._client._$onError(C.TOPIC.EVENT, message.data[0], message.data[1]);
    return;
  }

  this._client._$onError(C.TOPIC.EVENT, C.EVENT.UNSOLICITED_MESSAGE, name);
};

/**
 * Resubscribes to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._resubscribe = function () {
  var callbacks = this._emitter._callbacks;
  for (var eventName in callbacks) {
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [eventName]);
  }
};

module.exports = EventHandler;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/listener":28,"../utils/resubscribe-notifier":29,"component-emitter2":2}],15:[function(_dereq_,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket = _dereq_('ws');
var messageParser = _dereq_('./message-parser');
var messageBuilder = _dereq_('./message-builder');
var utils = _dereq_('../utils/utils');
var C = _dereq_('../constants/constants');

/**
 * Establishes a connection to a deepstream server using websockets
 *
 * @param {Client} client
 * @param {String} url     Short url, e.g. <host>:<port>. Deepstream works out the protocol
 * @param {Object} options connection options
 *
 * @constructor
 */
var Connection = function Connection(client, url, options) {
  this._client = client;
  this._options = options;
  this._authParams = null;
  this._authCallback = null;
  this._deliberateClose = false;
  this._redirecting = false;
  this._tooManyAuthAttempts = false;
  this._connectionAuthenticationTimeout = false;
  this._challengeDenied = false;
  this._queuedMessages = [];
  this._reconnectTimeout = null;
  this._reconnectionAttempt = 0;
  this._currentPacketMessageCount = 0;
  this._sendNextPacketTimeout = null;
  this._currentMessageResetTimeout = null;
  this._endpoint = null;
  this._lastHeartBeat = null;
  this._heartbeatInterval = null;

  this._originalUrl = utils.parseUrl(url, this._options.path);
  this._url = this._originalUrl;

  this._state = C.CONNECTION_STATE.CLOSED;
  this._createEndpoint();
};

/**
 * Returns the current connection state.
 * (One of constants.CONNECTION_STATE)
 *
 * @public
 * @returns {String} connectionState
 */
Connection.prototype.getState = function () {
  return this._state;
};

/**
 * Sends the specified authentication parameters
 * to the server. Can be called up to <maxAuthAttempts>
 * times for the same connection.
 *
 * @param   {Object}   authParams A map of user defined auth parameters.
 *                                E.g. { username:<String>, password:<String> }
 * @param   {Function} callback   A callback that will be invoked with the authenticationr result
 *
 * @public
 * @returns {void}
 */
Connection.prototype.authenticate = function (authParams, callback) {
  if ((typeof authParams === 'undefined' ? 'undefined' : _typeof(authParams)) !== 'object') {
    this._client._$onError(C.TOPIC.ERROR, C.EVENT.INVALID_AUTH_MSG, 'authParams is not an object');
    return;
  }

  this._authParams = authParams;
  this._authCallback = callback;

  if (this._tooManyAuthAttempts || this._challengeDenied || this._connectionAuthenticationTimeout) {
    this._client._$onError(C.TOPIC.ERROR, C.EVENT.IS_CLOSED, 'this client\'s connection was closed');
    return;
  } else if (this._deliberateClose === true && this._state === C.CONNECTION_STATE.CLOSED) {
    this._createEndpoint();
    this._deliberateClose = false;
    return;
  }

  if (this._state === C.CONNECTION_STATE.AWAITING_AUTHENTICATION) {
    this._sendAuthParams();
  }
};

/**
 * High level send message method. Creates a deepstream message
 * string and invokes the actual send method.
 *
 * @param   {String} topic  One of C.TOPIC
 * @param   {String} action One of C.ACTIONS
 * @param   {[Mixed]} data   Date that will be added to the message. Primitive values will
 *                          be appended directly, objects and arrays will be serialized as JSON
 *
 * @private
 * @returns {void}
 */
Connection.prototype.sendMsg = function (topic, action, data) {
  this.send(messageBuilder.getMsg(topic, action, data));
};

/**
 * Main method for sending messages. Doesn't send messages instantly,
 * but instead achieves conflation by adding them to the message
 * buffer that will be drained on the next tick
 *
 * @param   {String} message deepstream message
 *
 * @public
 * @returns {void}
 */
Connection.prototype.send = function (message) {
  this._queuedMessages.push(message);
  this._currentPacketMessageCount++;

  if (this._currentMessageResetTimeout === null) {
    this._currentMessageResetTimeout = utils.nextTick(this._resetCurrentMessageCount.bind(this));
  }

  if (this._state === C.CONNECTION_STATE.OPEN && this._queuedMessages.length < this._options.maxMessagesPerPacket && this._currentPacketMessageCount < this._options.maxMessagesPerPacket) {
    this._sendQueuedMessages();
  } else if (this._sendNextPacketTimeout === null) {
    this._queueNextPacket();
  }
};

/**
 * Closes the connection. Using this method
 * sets a _deliberateClose flag that will prevent the client from
 * reconnecting.
 *
 * @public
 * @returns {void}
 */
Connection.prototype.close = function () {
  clearInterval(this._heartbeatInterval);
  this._deliberateClose = true;
  this._endpoint.close();
};

/**
 * Creates the endpoint to connect to using the url deepstream
 * was initialised with.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._createEndpoint = function () {
  this._endpoint = BrowserWebSocket ? new BrowserWebSocket(this._url) : new NodeWebSocket(this._url, this._options.nodeSocketOptions);

  this._endpoint.onopen = this._onOpen.bind(this);
  this._endpoint.onerror = this._onError.bind(this);
  this._endpoint.onclose = this._onClose.bind(this);
  this._endpoint.onmessage = this._onMessage.bind(this);
};

/**
 * When the implementation tries to send a large
 * number of messages in one execution thread, the first
 * <maxMessagesPerPacket> are send straight away.
 *
 * _currentPacketMessageCount keeps track of how many messages
 * went into that first packet. Once this number has been exceeded
 * the remaining messages are written to a queue and this message
 * is invoked on a timeout to reset the count.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._resetCurrentMessageCount = function () {
  this._currentPacketMessageCount = 0;
  this._currentMessageResetTimeout = null;
};

/**
 * Concatenates the messages in the current message queue
 * and sends them as a single package. This will also
 * empty the message queue and conclude the send process.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._sendQueuedMessages = function () {
  if (this._state !== C.CONNECTION_STATE.OPEN || this._endpoint.readyState !== this._endpoint.OPEN) {
    return;
  }

  if (this._queuedMessages.length === 0) {
    this._sendNextPacketTimeout = null;
    return;
  }

  var message = this._queuedMessages.splice(0, this._options.maxMessagesPerPacket).join('');

  if (this._queuedMessages.length !== 0) {
    this._queueNextPacket();
  } else {
    this._sendNextPacketTimeout = null;
  }

  this._submit(message);
};

/**
 * Sends a message to over the endpoint connection directly
 *
 * Will generate a connection error if the websocket was closed
 * prior to an onclose event.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._submit = function (message) {
  if (this._endpoint.readyState === this._endpoint.OPEN) {
    this._endpoint.send(message);
  } else {
    this._onError('Tried to send message on a closed websocket connection');
  }
};

/**
 * Schedules the next packet whilst the connection is under
 * heavy load.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._queueNextPacket = function () {
  var fn = this._sendQueuedMessages.bind(this);
  var delay = this._options.timeBetweenSendingQueuedPackages;

  this._sendNextPacketTimeout = setTimeout(fn, delay);
};

/**
 * Sends authentication params to the server. Please note, this
 * doesn't use the queued message mechanism, but rather sends the message directly
 *
 * @private
 * @returns {void}
 */
Connection.prototype._sendAuthParams = function () {
  this._setState(C.CONNECTION_STATE.AUTHENTICATING);
  var authMessage = messageBuilder.getMsg(C.TOPIC.AUTH, C.ACTIONS.REQUEST, [this._authParams]);
  this._submit(authMessage);
};

/**
 * Ensures that a heartbeat was not missed more than once, otherwise it considers the connection
 * to have been lost and closes it for reconnection.
 * @return {void}
 */
Connection.prototype._checkHeartBeat = function () {
  var heartBeatTolerance = this._options.heartbeatInterval * 2;

  if (Date.now() - this._lastHeartBeat > heartBeatTolerance) {
    clearInterval(this._heartbeatInterval);
    this._endpoint.close();
    this._client._$onError(C.TOPIC.CONNECTION, C.EVENT.CONNECTION_ERROR, 'heartbeat not received in the last ' + heartBeatTolerance + ' milliseconds');
  }
};

/**
 * Will be invoked once the connection is established. The client
 * can't send messages yet, and needs to get a connection ACK or REDIRECT
 * from the server before authenticating
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onOpen = function () {
  this._clearReconnect();
  this._lastHeartBeat = Date.now();
  this._heartbeatInterval = utils.setInterval(this._checkHeartBeat.bind(this), this._options.heartbeatInterval);
  this._setState(C.CONNECTION_STATE.AWAITING_CONNECTION);
};

/**
 * Callback for generic connection errors. Forwards
 * the error to the client.
 *
 * The connection is considered broken once this method has been
 * invoked.
 *
 * @param   {String|Error} error connection error
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onError = function (error) {
  var _this = this;

  clearInterval(this._heartbeatInterval);
  this._setState(C.CONNECTION_STATE.ERROR);

  /*
   * If the implementation isn't listening on the error event this will throw
   * an error. So let's defer it to allow the reconnection to kick in.
   */
  setTimeout(function () {
    var msg = void 0;
    if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
      msg = 'Can\'t connect! Deepstream server unreachable on ' + _this._originalUrl;
    } else {
      try {
        msg = JSON.stringify(error);
      } catch (e) {
        msg = error.toString();
      }
    }
    _this._client._$onError(C.TOPIC.CONNECTION, C.EVENT.CONNECTION_ERROR, msg);
  }, 1);
};

/**
 * Callback when the connection closes. This might have been a deliberate
 * close triggered by the client or the result of the connection getting
 * lost.
 *
 * In the latter case the client will try to reconnect using the configured
 * strategy.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onClose = function () {
  clearInterval(this._heartbeatInterval);

  if (this._redirecting === true) {
    this._redirecting = false;
    this._createEndpoint();
  } else if (this._deliberateClose === true) {
    this._setState(C.CONNECTION_STATE.CLOSED);
  } else {
    this._tryReconnect();
  }
};

/**
 * Callback for messages received on the connection.
 *
 * @param   {String} message deepstream message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onMessage = function (message) {
  var parsedMessages = messageParser.parse(message.data, this._client);

  for (var i = 0; i < parsedMessages.length; i++) {
    if (parsedMessages[i] === null) {
      continue;
    } else if (parsedMessages[i].topic === C.TOPIC.CONNECTION) {
      this._handleConnectionResponse(parsedMessages[i]);
    } else if (parsedMessages[i].topic === C.TOPIC.AUTH) {
      this._handleAuthResponse(parsedMessages[i]);
    } else {
      this._client._$onMessage(parsedMessages[i]);
    }
  }
};

/**
 * The connection response will indicate whether the deepstream connection
 * can be used or if it should be forwarded to another instance. This
 * allows us to introduce load-balancing if needed.
 *
 * If authentication parameters are already provided this will kick of
 * authentication immediately. The actual 'open' event won't be emitted
 * by the client until the authentication is successful.
 *
 * If a challenge is recieved, the user will send the url to the server
 * in response to get the appropriate redirect. If the URL is invalid the
 * server will respond with a REJECTION resulting in the client connection
 * being permanently closed.
 *
 * If a redirect is recieved, this connection is closed and updated with
 * a connection to the url supplied in the message.
 *
 * @param   {Object} message parsed connection message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._handleConnectionResponse = function (message) {
  if (message.action === C.ACTIONS.PING) {
    this._lastHeartBeat = Date.now();
    this._submit(messageBuilder.getMsg(C.TOPIC.CONNECTION, C.ACTIONS.PONG));
  } else if (message.action === C.ACTIONS.ACK) {
    this._setState(C.CONNECTION_STATE.AWAITING_AUTHENTICATION);
    if (this._authParams) {
      this._sendAuthParams();
    }
  } else if (message.action === C.ACTIONS.CHALLENGE) {
    this._setState(C.CONNECTION_STATE.CHALLENGING);
    this._submit(messageBuilder.getMsg(C.TOPIC.CONNECTION, C.ACTIONS.CHALLENGE_RESPONSE, [this._originalUrl]));
  } else if (message.action === C.ACTIONS.REJECTION) {
    this._challengeDenied = true;
    this.close();
  } else if (message.action === C.ACTIONS.REDIRECT) {
    this._url = message.data[0];
    this._redirecting = true;
    this._endpoint.close();
  } else if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT) {
      this._deliberateClose = true;
      this._connectionAuthenticationTimeout = true;
      this._client._$onError(C.TOPIC.CONNECTION, message.data[0], message.data[1]);
    }
  }
};

/**
 * Callback for messages received for the AUTH topic. If
 * the authentication was successful this method will
 * open the connection and send all messages that the client
 * tried to send so far.
 *
 * @param   {Object} message parsed auth message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._handleAuthResponse = function (message) {
  if (message.action === C.ACTIONS.ERROR) {

    if (message.data[0] === C.EVENT.TOO_MANY_AUTH_ATTEMPTS) {
      this._deliberateClose = true;
      this._tooManyAuthAttempts = true;
    } else if (message.data[0] === C.EVENT.INVALID_AUTH_MSG) {
      this._deliberateClose = true;

      if (this._authCallback) {
        this._authCallback(false, 'invalid authentication message');
      }

      return;
    } else {
      this._setState(C.CONNECTION_STATE.AWAITING_AUTHENTICATION);
    }

    if (this._authCallback) {
      this._authCallback(false, this._getAuthData(message.data[1]));
    }
  } else if (message.action === C.ACTIONS.ACK) {
    this._setState(C.CONNECTION_STATE.OPEN);

    if (this._authCallback) {
      this._authCallback(true, this._getAuthData(message.data[0]));
    }

    this._sendQueuedMessages();
  }
};

/**
 * Checks if data is present with login ack and converts it
 * to the correct type
 *
 * @param {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {object}
 */
Connection.prototype._getAuthData = function (data) {
  if (data === undefined) {
    return null;
  }
  return messageParser.convertTyped(data, this._client);
};

/**
 * Updates the connection state and emits the
 * connectionStateChanged event on the client
 *
 * @private
 * @returns {void}
 */
Connection.prototype._setState = function (state) {
  this._state = state;
  this._client.emit(C.EVENT.CONNECTION_STATE_CHANGED, state);
};

/**
 * If the connection drops or is closed in error this
 * method schedules increasing reconnection intervals
 *
 * If the number of failed reconnection attempts exceeds
 * options.maxReconnectAttempts the connection is closed
 *
 * @private
 * @returns {void}
 */
Connection.prototype._tryReconnect = function () {
  if (this._reconnectTimeout !== null) {
    return;
  }

  if (this._reconnectionAttempt < this._options.maxReconnectAttempts) {
    this._setState(C.CONNECTION_STATE.RECONNECTING);
    this._reconnectTimeout = setTimeout(this._tryOpen.bind(this), Math.min(this._options.maxReconnectInterval, this._options.reconnectIntervalIncrement * this._reconnectionAttempt));
    this._reconnectionAttempt++;
  } else {
    this._clearReconnect();
    this.close();
    this._client.emit(C.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED, this._reconnectionAttempt);
  }
};

/**
 * Attempts to open a errourosly closed connection
 *
 * @private
 * @returns {void}
 */
Connection.prototype._tryOpen = function () {
  if (this._originalUrl !== this._url) {
    this._url = this._originalUrl;
  }
  this._createEndpoint();
  this._reconnectTimeout = null;
};

/**
 * Stops all further reconnection attempts,
 * either because the connection is open again
 * or because the maximal number of reconnection
 * attempts has been exceeded
 *
 * @private
 * @returns {void}
 */
Connection.prototype._clearReconnect = function () {
  clearTimeout(this._reconnectTimeout);
  this._reconnectTimeout = null;
  this._reconnectionAttempt = 0;
};

module.exports = Connection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants/constants":11,"../utils/utils":31,"./message-builder":16,"./message-parser":17,"ws":1}],16:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var C = _dereq_('../constants/constants');

var SEP = C.MESSAGE_PART_SEPERATOR;

/**
 * Creates a deepstream message string, based on the
 * provided parameters
 *
 * @param   {String} topic  One of CONSTANTS.TOPIC
 * @param   {String} action One of CONSTANTS.ACTIONS
 * @param   {Array} data An array of strings or JSON-serializable objects
 *
 * @returns {String} deepstream message string
 */
exports.getMsg = function (topic, action, data) {
  if (data && !(data instanceof Array)) {
    throw new Error('data must be an array');
  }
  var sendData = [topic, action];

  if (data) {
    for (var i = 0; i < data.length; i++) {
      if (_typeof(data[i]) === 'object') {
        sendData.push(JSON.stringify(data[i]));
      } else {
        sendData.push(data[i]);
      }
    }
  }

  return sendData.join(SEP) + C.MESSAGE_SEPERATOR;
};

/**
 * Converts a serializable value into its string-representation and adds
 * a flag that provides instructions on how to deserialize it.
 *
 * Please see messageParser.convertTyped for the counterpart of this method
 *
 * @param {Mixed} value
 *
 * @public
 * @returns {String} string representation of the value
 */
exports.typed = function (value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  if (type === 'string') {
    return C.TYPES.STRING + value;
  }

  if (value === null) {
    return C.TYPES.NULL;
  }

  if (type === 'object') {
    return C.TYPES.OBJECT + JSON.stringify(value);
  }

  if (type === 'number') {
    return C.TYPES.NUMBER + value.toString();
  }

  if (value === true) {
    return C.TYPES.TRUE;
  }

  if (value === false) {
    return C.TYPES.FALSE;
  }

  if (value === undefined) {
    return C.TYPES.UNDEFINED;
  }

  throw new Error('Can\'t serialize type ' + value);
};

},{"../constants/constants":11}],17:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');

/**
 * Parses ASCII control character seperated
 * message strings into digestable maps
 *
 * @constructor
 */
var MessageParser = function MessageParser() {
  this._actions = this._getActions();
};

/**
 * Main interface method. Receives a raw message
 * string, containing one or more messages
 * and returns an array of parsed message objects
 * or null for invalid messages
 *
 * @param   {String} message raw message
 *
 * @public
 *
 * @returns {Array} array of parsed message objects
 *                  following the format
 *                  {
 *                    raw: <original message string>
 *                    topic: <string>
 *                    action: <string - shortcode>
 *                    data: <array of strings>
 *                  }
 */
MessageParser.prototype.parse = function (message, client) {
  var parsedMessages = [];
  var rawMessages = message.split(C.MESSAGE_SEPERATOR);

  for (var i = 0; i < rawMessages.length; i++) {
    if (rawMessages[i].length > 2) {
      parsedMessages.push(this._parseMessage(rawMessages[i], client));
    }
  }

  return parsedMessages;
};

/**
 * Deserializes values created by MessageBuilder.typed to
 * their original format
 *
 * @param {String} value
 *
 * @public
 * @returns {Mixed} original value
 */
MessageParser.prototype.convertTyped = function (value, client) {
  var type = value.charAt(0);

  if (type === C.TYPES.STRING) {
    return value.substr(1);
  }

  if (type === C.TYPES.OBJECT) {
    try {
      return JSON.parse(value.substr(1));
    } catch (e) {
      client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, e.toString() + '(' + value + ')');
      return undefined;
    }
  }

  if (type === C.TYPES.NUMBER) {
    return parseFloat(value.substr(1));
  }

  if (type === C.TYPES.NULL) {
    return null;
  }

  if (type === C.TYPES.TRUE) {
    return true;
  }

  if (type === C.TYPES.FALSE) {
    return false;
  }

  if (type === C.TYPES.UNDEFINED) {
    return undefined;
  }

  client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'UNKNOWN_TYPE (' + value + ')');
  return undefined;
};

/**
 * Turns the ACTION:SHORTCODE constants map
 * around to facilitate shortcode lookup
 *
 * @private
 *
 * @returns {Object} actions
 */
MessageParser.prototype._getActions = function () {
  var actions = {};

  for (var key in C.ACTIONS) {
    actions[C.ACTIONS[key]] = key;
  }

  return actions;
};

/**
 * Parses an individual message (as oppnosed to a
 * block of multiple messages as is processed by .parse())
 *
 * @param   {String} message
 *
 * @private
 *
 * @returns {Object} parsedMessage
 */
MessageParser.prototype._parseMessage = function (message, client) {
  var parts = message.split(C.MESSAGE_PART_SEPERATOR);
  var messageObject = {};

  if (parts.length < 2) {
    client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Insufficiant message parts');
    return null;
  }

  if (this._actions[parts[1]] === undefined) {
    client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Unknown action ' + parts[1]);
    return null;
  }

  messageObject.raw = message;
  messageObject.topic = parts[0];
  messageObject.action = parts[1];
  messageObject.data = parts.splice(2);

  return messageObject;
};

module.exports = new MessageParser();

},{"../constants/constants":11}],18:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = _dereq_('component-emitter2');
var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');

function validateArguments(userId, callback, defaultAction) {
  if (typeof userId === 'function' && callback === undefined) {
    callback = userId; // eslint-disable-line
    userId = defaultAction; // eslint-disable-line
  } else {
    userId = [userId]; // eslint-disable-line
  }

  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  return { userId: userId, callback: callback };
}

/**
 * The main class for presence in deepstream
 *
 * Provides the presence interface and handles incoming messages
 * on the presence topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
module.exports = function () {
  function PresenceHandler(options, connection, client) {
    _classCallCheck(this, PresenceHandler);

    this._options = options;
    this._connection = connection;
    this._client = client;
    this._queryEmitter = new EventEmitter();
    this._subscribeEmitter = new EventEmitter();
    this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
    this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resubscribe.bind(this));
    this._counter = 1;

    this._flush = this._flush.bind(this);
    this._flushTimeout = null;
    this._pendingSubscribes = {};
    this._pendingUnsubscribes = {};
  }
  /**
   * Queries for clients logged into deepstream.
   *
   * @param   {Function} callback Will be invoked with an array of clients
   *
   * @public
   * @returns {void}
   */


  _createClass(PresenceHandler, [{
    key: 'getAll',
    value: function getAll(users, callback) {
      if (typeof users === 'function') {
        this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.QUERY, [C.ACTIONS.QUERY]);
        this._queryEmitter.once(C.ACTIONS.QUERY, users);
      } else {
        var queryId = this._counter++;
        this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.QUERY, [queryId, users]);
        this._queryEmitter.once(queryId, callback);
      }
    }

    /**
     * Subscribes to client logins or logouts in deepstream
     *
     * @param   {Function} callback Will be invoked with the username of a client,
     *                              and a boolean to indicate if it was a login or
     *                              logout event
     * @public
     * @returns {void}
     */

  }, {
    key: 'subscribe',
    value: function subscribe(userId, callback) {
      var args = validateArguments(userId, callback, C.ACTIONS.SUBSCRIBE);
      if (!this._subscribeEmitter.hasListeners(args.userId)) {
        if (args.userId === C.ACTIONS.SUBSCRIBE) {
          this._sendGlobalSubscription(C.ACTIONS.SUBSCRIBE);
          this._subscribeEmitter.on(C.ACTIONS.SUBSCRIBE, args.callback);
        } else {
          delete this._pendingUnsubscribes[args.userId];
          this._pendingSubscribes[args.userId] = true;
          if (!this._flushTimeout) {
            this._flushTimeout = setTimeout(this._flush, 0);
          }
          this._subscribeEmitter.on(args.userId, args.callback);
        }
      }
    }

    /**
     * Removes a callback for a specified presence event
     *
     * @param   {Function} callback The callback to unregister via {PresenceHandler#unsubscribe}
     *
     * @public
     * @returns {void}
     */

  }, {
    key: 'unsubscribe',
    value: function unsubscribe(userId, callback) {
      var args = validateArguments(userId, callback, C.ACTIONS.UNSUBSCRIBE);

      if (args.userId === C.ACTIONS.UNSUBSCRIBE) {
        this._subscribeEmitter.off(C.ACTIONS.SUBSCRIBE, args.callback);
      } else {
        this._subscribeEmitter.off(args.userId, args.callback);
      }

      if (!this._subscribeEmitter.hasListeners(args.userId)) {
        if (args.userId === C.ACTIONS.UNSUBSCRIBE) {
          this._sendGlobalSubscription(C.ACTIONS.UNSUBSCRIBE);
        } else {
          delete this._pendingSubscribes[args.userId];
          this._pendingUnsubscribes[args.userId] = true;
          if (!this._flushTimeout) {
            this._flushTimeout = setTimeout(this._flush, 0);
          }
        }
      }
    }

    /**
     * Handles incoming messages from the server
     *
     * @param   {Object} message parsed deepstream message
     *
     * @package private
     * @returns {void}
     */

  }, {
    key: '_$handle',
    value: function _$handle(message) {
      if (message.action === C.ACTIONS.ERROR && message.data[0] === C.EVENT.MESSAGE_DENIED) {
        this._ackTimeoutRegistry.remove(C.TOPIC.PRESENCE, message.data[1]);
        message.processedError = true;
        this._client._$onError(C.TOPIC.PRESENCE, C.EVENT.MESSAGE_DENIED, message.data[1]);
      } else if (message.action === C.ACTIONS.ACK) {
        this._ackTimeoutRegistry.clear(message);
      } else if (message.action === C.ACTIONS.PRESENCE_JOIN) {
        this._subscribeEmitter.emit(C.ACTIONS.SUBSCRIBE, message.data[0], true);
        this._subscribeEmitter.emit(message.data[0], true, message.data[0]);
      } else if (message.action === C.ACTIONS.PRESENCE_LEAVE) {
        this._subscribeEmitter.emit(C.ACTIONS.SUBSCRIBE, message.data[0], false);
        this._subscribeEmitter.emit(message.data[0], false, message.data[0]);
      } else if (message.action === C.ACTIONS.QUERY) {
        try {
          var data = JSON.parse(message.data[1]);
          if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            this._queryEmitter.emit(message.data[0], data);
            return;
          }
        } catch (e) {
          // not json, old event
        }
        this._queryEmitter.emit(C.ACTIONS.QUERY, message.data);
      } else {
        this._client._$onError(C.TOPIC.PRESENCE, C.EVENT.UNSOLICITED_MESSAGE, message.action);
      }
    }

    /**
     * Resubscribes to presence subscription when connection is lost
     *
     * @package private
     * @returns {void}
     */

  }, {
    key: '_resubscribe',
    value: function _resubscribe() {
      var callbacks = Object.keys(this._subscribeEmitter._callbacks || {});
      if (callbacks.indexOf(C.ACTIONS.SUBSCRIBE) > -1) {
        callbacks.splice(callbacks.indexOf(C.ACTIONS.SUBSCRIBE), 1);
        this._sendGlobalSubscription(C.ACTIONS.SUBSCRIBE);
      }
      if (callbacks.length > 0) {
        this._sendSubscriptionBulk(C.ACTIONS.SUBSCRIBE, callbacks);
      }
    }
  }, {
    key: '_flush',
    value: function _flush() {
      var pendingSubscribes = Object.keys(this._pendingSubscribes);
      if (pendingSubscribes.length > 0) {
        this._sendSubscriptionBulk(C.ACTIONS.SUBSCRIBE, pendingSubscribes);
        this._pendingSubscribes = {};
      }
      var pendingUnsubscribes = Object.keys(this._pendingUnsubscribes);
      if (pendingUnsubscribes.length > 0) {
        this._sendSubscriptionBulk(C.ACTIONS.UNSUBSCRIBE, pendingUnsubscribes);
        this._pendingUnsubscribes = {};
      }
      this._flushTimeout = null;
    }
  }, {
    key: '_sendSubscriptionBulk',
    value: function _sendSubscriptionBulk(action, names) {
      var correlationId = this._counter++;
      this._ackTimeoutRegistry.add({
        topic: C.TOPIC.PRESENCE,
        action: action,
        name: correlationId
      });
      this._connection.sendMsg(C.TOPIC.PRESENCE, action, [correlationId, names]);
    }
  }, {
    key: '_sendGlobalSubscription',
    value: function _sendGlobalSubscription(action) {
      this._ackTimeoutRegistry.add({
        topic: C.TOPIC.PRESENCE,
        action: action,
        name: action
      });
      this._connection.sendMsg(C.TOPIC.PRESENCE, action, [action]);
    }
  }]);

  return PresenceHandler;
}();

},{"../constants/constants":11,"../utils/resubscribe-notifier":29,"component-emitter2":2}],19:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable prefer-rest-params, prefer-spread */

var Record = _dereq_('./record');
var EventEmitter = _dereq_('component-emitter2');

/**
 * An AnonymousRecord is a record without a predefined name. It
 * acts like a wrapper around an actual record that can
 * be swapped out for another one whilst keeping all bindings intact.
 *
 * Imagine a customer relationship management system with a list of users
 * on the left and a user detail panel on the right. The user detail
 * panel could use the anonymous record to set up its bindings, yet whenever
 * a user is chosen from the list of existing users the anonymous record's
 * setName method is called and the detail panel will update to
 * show the selected user's details
 *
 * @param {RecordHandler} recordHandler
 *
 * @constructor
 */
var AnonymousRecord = function AnonymousRecord(recordHandler) {
  this.name = null;
  this._recordHandler = recordHandler;
  this._record = null;
  this._subscriptions = [];
  this._proxyMethod('delete');
  this._proxyMethod('set');
  this._proxyMethod('discard');
};

EventEmitter(AnonymousRecord.prototype); // eslint-disable-line

/**
 * Proxies the actual record's get method. It is valid
 * to call get prior to setName - if no record exists,
 * the method returns undefined
 *
 * @param   {[String]} path A json path. If non is provided,
 *                          the entire record is returned.
 *
 * @public
 * @returns {mixed}    the value of path or the entire object
 */
AnonymousRecord.prototype.get = function (path) {
  if (this._record === null) {
    return undefined;
  }

  return this._record.get(path);
};

/**
 * Proxies the actual record's subscribe method. The same parameters
 * can be used. Can be called prior to setName(). Please note, triggerIfReady
 * will always be set to true to reflect changes in the underlying record.
 *
 * @param   {[String]} path   A json path. If non is provided,
 *                              it subscribes to changes for the entire record.
 *
 * @param   {Function} callback A callback function that will be invoked whenever
 *                              the subscribed path or record updates
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.subscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);
  parameters.triggerNow = true;
  this._subscriptions.push(parameters);

  if (this._record !== null) {
    this._record.subscribe(parameters);
  }
};

/**
 * Proxies the actual record's unsubscribe method. The same parameters
 * can be used. Can be called prior to setName()
 *
 * @param   {[String]} path   A json path. If non is provided,
 *                              it subscribes to changes for the entire record.
 *
 * @param   {Function} callback A callback function that will be invoked whenever
 *                              the subscribed path or record updates
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.unsubscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);
  var subscriptions = [];
  var i = void 0;

  for (i = 0; i < this._subscriptions.length; i++) {
    if (this._subscriptions[i].path !== parameters.path || this._subscriptions[i].callback !== parameters.callback) {
      subscriptions.push(this._subscriptions[i]);
    }
  }

  this._subscriptions = subscriptions;

  if (this._record !== null) {
    this._record.unsubscribe(parameters);
  }
};

/**
 * Sets the underlying record the anonymous record is bound
 * to. Can be called multiple times.
 *
 * @param {String} recordName
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.setName = function (recordName) {
  if (this.name === recordName) {
    return;
  }

  this.name = recordName;

  var i = void 0;

  if (this._record !== null && !this._record.isDestroyed) {
    for (i = 0; i < this._subscriptions.length; i++) {
      this._record.unsubscribe(this._subscriptions[i]);
    }
    this._record.discard();
  }

  this._record = this._recordHandler.getRecord(recordName);

  for (i = 0; i < this._subscriptions.length; i++) {
    this._record.subscribe(this._subscriptions[i]);
  }

  this._record.whenReady(this.emit.bind(this, 'ready'));
  this.emit('nameChanged', recordName);
};

/**
 * Adds the specified method to this method and forwards it
 * to _callMethodOnRecord
 *
 * @param   {String} methodName
 *
 * @private
 * @returns {void}
 */
AnonymousRecord.prototype._proxyMethod = function (methodName) {
  this[methodName] = this._callMethodOnRecord.bind(this, methodName);
};

/**
 * Invokes the specified method with the provided parameters on
 * the underlying record. Throws erros if the method is not
 * specified yet or doesn't expose the method in question
 *
 * @param   {String} methodName
 *
 * @private
 * @returns {Mixed} the return value of the actual method
 */
AnonymousRecord.prototype._callMethodOnRecord = function (methodName) {
  if (this._record === null) {
    throw new Error('Can`t invoke ' + methodName + '. AnonymousRecord not initialised. Call setName first');
  }

  if (typeof this._record[methodName] !== 'function') {
    throw new Error(methodName + ' is not a method on the record');
  }

  var args = Array.prototype.slice.call(arguments, 1);

  return this._record[methodName].apply(this._record, args);
};

module.exports = AnonymousRecord;

},{"./record":23,"component-emitter2":2}],20:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = _dereq_('../utils/utils');

var PARTS_REG_EXP = /([^.[\]\s]+)/g;
var cache = Object.create(null);

/**
 * Returns the value of the path or
 * undefined if the path can't be resolved
 *
 * @public
 * @returns {Mixed}
 */
module.exports.get = function (data, path, deepCopy) {
  var tokens = tokenize(path);
  var value = data;
  for (var i = 0; i < tokens.length; i++) {
    if (value === undefined) {
      return undefined;
    }
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
      throw new Error('invalid data or path');
    }
    value = value[tokens[i]];
  }

  return deepCopy !== false ? utils.deepCopy(value) : value;
};

/**
 * Sets the value of the path. If the path (or parts
 * of it) doesn't exist yet, it will be created
 *
 * @param {Mixed} value
 *
 * @public
 * @returns {Mixed} updated value
 */
module.exports.set = function (data, path, value, deepCopy) {
  var tokens = tokenize(path);

  if (tokens.length === 0) {
    return patch(data, value, deepCopy);
  }

  var oldValue = module.exports.get(data, path, false);
  var newValue = patch(oldValue, value, deepCopy);

  if (newValue === oldValue) {
    return data;
  }

  var result = utils.shallowCopy(data);

  var node = result;
  for (var i = 0; i < tokens.length; i++) {
    if (i === tokens.length - 1) {
      node[tokens[i]] = newValue;
    } else if (node[tokens[i]] !== undefined) {
      node = node[tokens[i]] = utils.shallowCopy(node[tokens[i]]);
    } else if (tokens[i + 1] && !isNaN(tokens[i + 1])) {
      node = node[tokens[i]] = [];
    } else {
      node = node[tokens[i]] = Object.create(null);
    }
  }

  return result;
};

/**
 * Merge the new value into the old value
 * @param  {Mixed} oldValue
 * @param  {Mixed} newValue
 * @param  {boolean} deepCopy
 * @return {Mixed}
 */
function patch(oldValue, newValue, deepCopy) {
  var i = void 0;
  var j = void 0;
  if (oldValue === null || newValue === null) {
    return newValue;
  } else if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    var arr = void 0;
    for (i = 0; i < newValue.length; i++) {
      var value = patch(oldValue[i], newValue[i], false);
      if (!arr) {
        if (value === oldValue[i]) {
          continue;
        }
        arr = [];
        for (j = 0; j < i; ++j) {
          arr[j] = oldValue[j];
        }
      }
      arr[i] = value;
    }
    arr = arr && deepCopy !== false ? utils.deepCopy(arr) : arr;
    arr = arr || (oldValue.length === newValue.length ? oldValue : newValue);
    return arr;
  } else if (!Array.isArray(newValue) && (typeof oldValue === 'undefined' ? 'undefined' : _typeof(oldValue)) === 'object' && (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object') {
    var obj = void 0;
    var props = Object.keys(newValue);
    for (i = 0; i < props.length; i++) {
      var _value = patch(oldValue[props[i]], newValue[props[i]], false);
      if (!obj) {
        if (_value === oldValue[props[i]]) {
          continue;
        }
        obj = Object.create(null);
        for (j = 0; j < i; ++j) {
          obj[props[j]] = oldValue[props[j]];
        }
      }
      obj[props[i]] = newValue[props[i]];
    }
    obj = obj && deepCopy !== false ? utils.deepCopy(obj) : obj;
    obj = obj || (Object.keys(oldValue).length === props.length ? oldValue : newValue);
    return obj;
  } else if (newValue !== oldValue) {
    return deepCopy !== false ? utils.deepCopy(newValue) : newValue;
  }

  return oldValue;
}

/**
 * Parses the path. Splits it into
 * keys for objects and indices for arrays.
 *
 * @returns Array of tokens
 */
function tokenize(path) {
  if (cache[path]) {
    return cache[path];
  }

  var parts = String(path) !== 'undefined' ? String(path).match(PARTS_REG_EXP) : [];

  if (!parts) {
    throw new Error('invalid path ' + path);
  }

  cache[path] = parts;
  return cache[path];
}

},{"../utils/utils":31}],21:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable prefer-rest-params */

var EventEmitter = _dereq_('component-emitter2');
var Record = _dereq_('./record');
var C = _dereq_('../constants/constants');

var ENTRY_ADDED_EVENT = 'entry-added';
var ENTRY_REMOVED_EVENT = 'entry-removed';
var ENTRY_MOVED_EVENT = 'entry-moved';

/**
 * A List is a specialised Record that contains
 * an Array of recordNames and provides a number
 * of convinience methods for interacting with them.
 *
 * @param {RecordHanlder} recordHandler
 * @param {String} name    The name of the list
 *
 * @constructor
 */
var List = function List(recordHandler, name, options) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this._recordHandler = recordHandler;
  this._record = this._recordHandler.getRecord(name, options);
  this._record._applyUpdate = this._applyUpdate.bind(this);

  this._record.on('delete', this.emit.bind(this, 'delete'));
  this._record.on('discard', this._onDiscard.bind(this));
  this._record.on('ready', this._onReady.bind(this));

  this.isDestroyed = this._record.isDestroyed;
  this.isReady = this._record.isReady;
  this.name = name;
  this._queuedMethods = [];
  this._beforeStructure = null;
  this._hasAddListener = null;
  this._hasRemoveListener = null;
  this._hasMoveListener = null;

  this.delete = this._record.delete.bind(this._record);
  this.discard = this._record.discard.bind(this._record);
  this.whenReady = this._record.whenReady.bind(this);
};

EventEmitter(List.prototype); // eslint-disable-line

/**
 * Returns the array of list entries or an
 * empty array if the list hasn't been populated yet.
 *
 * @public
 * @returns {Array} entries
 */
List.prototype.getEntries = function () {
  var entries = this._record.get();

  if (!(entries instanceof Array)) {
    return [];
  }

  return entries;
};

/**
 * Returns true if the list is empty
 *
 * @public
 * @returns {Boolean} isEmpty
 */
List.prototype.isEmpty = function () {
  return this.getEntries().length === 0;
};

/**
 * Updates the list with a new set of entries
 *
 * @public
 * @param {Array} entries
 */
List.prototype.setEntries = function (entries) {
  var errorMsg = 'entries must be an array of record names';
  var i = void 0;

  if (!(entries instanceof Array)) {
    throw new Error(errorMsg);
  }

  for (i = 0; i < entries.length; i++) {
    if (typeof entries[i] !== 'string') {
      throw new Error(errorMsg);
    }
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.setEntries.bind(this, entries));
  } else {
    this._beforeChange();
    this._record.set(entries);
    this._afterChange();
  }
};

/**
 * Removes an entry from the list
 *
 * @param {String} entry
 * @param {Number} [index]
 *
 * @public
 * @returns {void}
 */
List.prototype.removeEntry = function (entry, index) {
  if (this._record.isReady === false) {
    this._queuedMethods.push(this.removeEntry.bind(this, entry, index));
    return;
  }

  var currentEntries = this._record.get();
  var hasIndex = this._hasIndex(index);
  var entries = [];
  var i = void 0;

  for (i = 0; i < currentEntries.length; i++) {
    if (currentEntries[i] !== entry || hasIndex && index !== i) {
      entries.push(currentEntries[i]);
    }
  }
  this._beforeChange();
  this._record.set(entries);
  this._afterChange();
};

/**
 * Adds an entry to the list
 *
 * @param {String} entry
 * @param {Number} [index]
 *
 * @public
 * @returns {void}
 */
List.prototype.addEntry = function (entry, index) {
  if (typeof entry !== 'string') {
    throw new Error('Entry must be a recordName');
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.addEntry.bind(this, entry, index));
    return;
  }

  var hasIndex = this._hasIndex(index);
  var entries = this.getEntries();
  if (hasIndex) {
    entries.splice(index, 0, entry);
  } else {
    entries.push(entry);
  }
  this._beforeChange();
  this._record.set(entries);
  this._afterChange();
};

/**
 * Proxies the underlying Record's subscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.subscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);

  if (parameters.path) {
    throw new Error('path is not supported for List.subscribe');
  }

  // Make sure the callback is invoked with an empty array for new records
  var listCallback = function (callback) {
    callback(this.getEntries());
  }.bind(this, parameters.callback);

  /**
  * Adding a property onto a function directly is terrible practice,
  * and we will change this as soon as we have a more seperate approach
  * of creating lists that doesn't have records default state.
  *
  * The reason we are holding a referencing to wrapped array is so that
  * on unsubscribe it can provide a reference to the actual method the
  * record is subscribed too.
  **/
  parameters.callback.wrappedCallback = listCallback;
  parameters.callback = listCallback;

  this._record.subscribe(parameters);
};

/**
 * Proxies the underlying Record's unsubscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.unsubscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);

  if (parameters.path) {
    throw new Error('path is not supported for List.unsubscribe');
  }

  parameters.callback = parameters.callback.wrappedCallback;
  this._record.unsubscribe(parameters);
};

/**
 * Listens for changes in the Record's ready state
 * and applies them to this list
 *
 * @private
 * @returns {void}
 */
List.prototype._onReady = function () {
  this.isReady = true;

  for (var i = 0; i < this._queuedMethods.length; i++) {
    this._queuedMethods[i]();
  }

  this._queuedMethods = [];
  this.emit('ready');
};

/**
 * Listens for the record discard event and applies
 * changes to list
 *
 * @private
 * @returns {void}
 */
List.prototype._onDiscard = function () {
  this.isDestroyed = true;
  this.emit('discard');
};

/**
 * Proxies the underlying Record's _update method. Set's
 * data to an empty array if no data is provided.
 *
 * @param   {null}   path must (should :-)) be null
 * @param   {Array}  data
 *
 * @private
 * @returns {void}
 */
List.prototype._applyUpdate = function (message) {
  if (message.action === C.ACTIONS.PATCH) {
    throw new Error('PATCH is not supported for Lists');
  }

  if (message.data[2].charAt(0) !== '[') {
    message.data[2] = '[]';
  }

  this._beforeChange();
  Record.prototype._applyUpdate.call(this._record, message);
  this._afterChange();
};

/**
 * Validates that the index provided is within the current set of entries.
 *
 * @param {Number} index
 *
 * @private
 * @returns {Number}
 */
List.prototype._hasIndex = function (index) {
  var hasIndex = false;
  var entries = this.getEntries();
  if (index !== undefined) {
    if (isNaN(index)) {
      throw new Error('Index must be a number');
    }
    if (index !== entries.length && (index >= entries.length || index < 0)) {
      throw new Error('Index must be within current entries');
    }
    hasIndex = true;
  }
  return hasIndex;
};

/**
 * Establishes the current structure of the list, provided the client has attached any
 * add / move / remove listener
 *
 * This will be called before any change to the list, regardsless if the change was triggered
 * by an incoming message from the server or by the client
 *
 * @private
 * @returns {void}
 */
List.prototype._beforeChange = function () {
  this._hasAddListener = this.listeners(ENTRY_ADDED_EVENT).length > 0;
  this._hasRemoveListener = this.listeners(ENTRY_REMOVED_EVENT).length > 0;
  this._hasMoveListener = this.listeners(ENTRY_MOVED_EVENT).length > 0;

  if (this._hasAddListener || this._hasRemoveListener || this._hasMoveListener) {
    this._beforeStructure = this._getStructure();
  } else {
    this._beforeStructure = null;
  }
};

/**
 * Compares the structure of the list after a change to its previous structure and notifies
 * any add / move / remove listener. Won't do anything if no listeners are attached.
 *
 * @private
 * @returns {void}
 */
List.prototype._afterChange = function () {
  if (this._beforeStructure === null) {
    return;
  }

  var after = this._getStructure();
  var before = this._beforeStructure;
  var entry = void 0;
  var i = void 0;

  if (this._hasRemoveListener) {
    for (entry in before) {
      for (i = 0; i < before[entry].length; i++) {
        if (after[entry] === undefined || after[entry][i] === undefined) {
          this.emit(ENTRY_REMOVED_EVENT, entry, before[entry][i]);
        }
      }
    }
  }

  if (this._hasAddListener || this._hasMoveListener) {
    for (entry in after) {
      if (before[entry] === undefined) {
        for (i = 0; i < after[entry].length; i++) {
          this.emit(ENTRY_ADDED_EVENT, entry, after[entry][i]);
        }
      } else {
        for (i = 0; i < after[entry].length; i++) {
          if (before[entry][i] !== after[entry][i]) {
            if (before[entry][i] === undefined) {
              this.emit(ENTRY_ADDED_EVENT, entry, after[entry][i]);
            } else {
              this.emit(ENTRY_MOVED_EVENT, entry, after[entry][i]);
            }
          }
        }
      }
    }
  }
};

/**
 * Iterates through the list and creates a map with the entry as a key
 * and an array of its position(s) within the list as a value, e.g.
 *
 * {
 *   'recordA': [ 0, 3 ],
 *   'recordB': [ 1 ],
 *   'recordC': [ 2 ]
 * }
 *
 * @private
 * @returns {Array} structure
 */
List.prototype._getStructure = function () {
  var structure = {};
  var i = void 0;
  var entries = this._record.get();

  for (i = 0; i < entries.length; i++) {
    if (structure[entries[i]] === undefined) {
      structure[entries[i]] = [i];
    } else {
      structure[entries[i]].push(i);
    }
  }

  return structure;
};

module.exports = List;

},{"../constants/constants":11,"./record":23,"component-emitter2":2}],22:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Record = _dereq_('./record');
var AnonymousRecord = _dereq_('./anonymous-record');
var List = _dereq_('./list');
var Listener = _dereq_('../utils/listener');
var SingleNotifier = _dereq_('../utils/single-notifier');
var C = _dereq_('../constants/constants');
var messageParser = _dereq_('../message/message-parser');
var messageBuilder = _dereq_('../message/message-builder');
var EventEmitter = _dereq_('component-emitter2');

/**
 * A collection of factories for records. This class
 * is exposed as client.record
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 */
var RecordHandler = function RecordHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._records = {};
  this._lists = {};
  this._listener = {};
  this._writeCallbacks = {};
  this._destroyEventEmitter = new EventEmitter();

  this._hasRegistry = new SingleNotifier(client, connection, C.TOPIC.RECORD, C.ACTIONS.HAS, this._options.recordReadTimeout);
  this._snapshotRegistry = new SingleNotifier(client, connection, C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, this._options.recordReadTimeout);
};

/**
 * Returns an existing record or creates a new one.
 *
 * @param   {String} name              the unique name of the record
 * @param   {[Object]} recordOptions   A map of parameters for this particular record.
 *                                      { persist: true }
 *
 * @public
 * @returns {Record}
 */
RecordHandler.prototype.getRecord = function (name, recordOptions) {
  if (!this._records[name]) {
    this._records[name] = new Record(name, recordOptions || {}, this._connection, this._options, this._client);
    this._records[name].on('error', this._onRecordError.bind(this, name));
    this._records[name].on('destroyPending', this._onDestroyPending.bind(this, name));
    this._records[name].on('delete', this._removeRecord.bind(this, name));
    this._records[name].on('discard', this._removeRecord.bind(this, name));
  }

  this._records[name].usages++;

  return this._records[name];
};

/**
 * Returns an existing List or creates a new one. A list is a specialised
 * type of record that holds an array of recordNames.
 *
 * @param   {String} name       the unique name of the list
 * @param   {[Object]} options   A map of parameters for this particular list.
 *                              { persist: true }
 *
 * @public
 * @returns {List}
 */
RecordHandler.prototype.getList = function (name, options) {
  if (!this._lists[name]) {
    this._lists[name] = new List(this, name, options);
  } else {
    this._records[name].usages++;
  }
  return this._lists[name];
};

/**
 * Returns an anonymous record. A anonymous record is effectively
 * a wrapper that mimicks the API of a record, but allows for the
 * underlying record to be swapped without loosing subscriptions etc.
 *
 * This is particularly useful when selecting from a number of similarly
 * structured records. E.g. a list of users that can be choosen from a list
 *
 * The only API difference to a normal record is an additional setName( name ) method.
 *
 *
 * @public
 * @returns {AnonymousRecord}
 */
RecordHandler.prototype.getAnonymousRecord = function () {
  return new AnonymousRecord(this);
};

/**
 * Allows to listen for record subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular record if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
RecordHandler.prototype.listen = function (pattern, callback) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._listener[pattern] && !this._listener[pattern].destroyPending) {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.LISTENER_EXISTS, pattern);
    return;
  }

  if (this._listener[pattern]) {
    this._listener[pattern].destroy();
  }

  this._listener[pattern] = new Listener(C.TOPIC.RECORD, pattern, callback, this._options, this._client, this._connection);
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
RecordHandler.prototype.unlisten = function (pattern) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }

  var listener = this._listener[pattern];
  if (listener && !listener.destroyPending) {
    listener.sendDestroy();
  } else if (this._listener[pattern]) {
    this._listener[pattern].destroy();
    delete this._listener[pattern];
  } else {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern);
  }
};

/**
 * Retrieve the current record data without subscribing to changes
 *
 * @param   {String}  name the unique name of the record
 * @param   {Function}  callback
 *
 * @public
 */
RecordHandler.prototype.snapshot = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument: name');
  }

  if (typeof callback !== 'function') {
    throw new Error('invalid argument: callback');
  }

  if (this._records[name] && this._records[name].isReady) {
    callback(null, this._records[name].get());
  } else {
    this._snapshotRegistry.request(name, callback);
  }
};

/**
 * Allows the user to query to see whether or not the record exists.
 *
 * @param   {String}  name the unique name of the record
 * @param   {Function}  callback
 *
 * @public
 */
RecordHandler.prototype.has = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument: name');
  }

  if (typeof callback !== 'function') {
    throw new Error('invalid argument: callback');
  }

  if (this._records[name]) {
    callback(null, true);
  } else {
    this._hasRegistry.request(name, callback);
  }
};

/**
 * Allows setting the data for a record without being subscribed to it. If
 * the client is subscribed to the record locally, the update will be proxied
 * through the record object like a normal call to Record.set. Otherwise a force
 * write will be performed that overwrites any remote data.
 *
 * @param {String} recordName the name of the record to write to
 * @param {String|Object} pathOrData either the path to write data to or the data to
 *                                   set the record to
 * @param {Object|Primitive|Function} dataOrCallback either the data to write to the
 *                                                   record or a callback function
 *                                                   indicating write success
 * @param {Function} callback if provided this will be called with the result of the
 *                            write
 */
RecordHandler.prototype.setData = function (recordName, pathOrData, dataOrCallback, callback) {
  var path = void 0;
  var data = void 0;
  var cb = void 0;

  if (arguments.length === 4) {
    // setData(recordName, path, data, cb)
    path = pathOrData;
    data = dataOrCallback;
    cb = callback;
  } else if (arguments.length === 3) {
    if (typeof dataOrCallback !== 'function') {
      // setData(recordName, path, data)
      path = pathOrData;
      data = dataOrCallback;
    } else {
      // setData(recordName, data, callback)
      path = null;
      data = pathOrData;
      cb = dataOrCallback;
    }
  } else if (arguments.length === 2) {
    // setData(recordName, data)
    data = pathOrData;
  }

  if (typeof recordName !== 'string' || recordName.length === 0) {
    throw new Error('invalid argument: recordName');
  }

  if (callback && typeof callback !== 'function') {
    throw new Error('invalid argument: callback');
  }

  if (path && (typeof path !== 'string' || path.length === 0)) {
    throw new Error('invalid argument: path');
  }

  if (!path && (data === null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object')) {
    throw new Error('invalid argument: data must be an object when no path is provided');
  }

  var record = this._records[recordName];
  if (record) {
    if (path && cb) {
      record.set(path, data, cb);
    } else if (path) {
      record.set(path, data);
    } else if (cb) {
      record.set(data, cb);
    } else {
      record.set(data);
    }
  } else {
    var recordData = path ? [recordName, -1, path, messageBuilder.typed(data)] : [recordName, -1, data];
    var config = {};
    if (cb) {
      config.writeSuccess = true;
      this._writeCallbacks[recordName] = {};
      this._writeCallbacks[recordName][-1] = cb;
    }
    recordData.push(config);
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.CREATEANDUPDATE, recordData);
  }
};

/**
 * Will be called by the client for incoming messages on the RECORD topic
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
RecordHandler.prototype._$handle = function (message) {
  var name = void 0;

  if (message.action === C.ACTIONS.ERROR && message.data[0] !== C.EVENT.VERSION_EXISTS && message.data[0] !== C.ACTIONS.SNAPSHOT && message.data[0] !== C.ACTIONS.HAS && message.data[0] !== C.EVENT.MESSAGE_DENIED) {
    message.processedError = true;
    this._client._$onError(C.TOPIC.RECORD, message.data[0], message.data[1]);
    return;
  }

  if (message.action === C.ACTIONS.ACK || message.action === C.ACTIONS.ERROR) {
    name = message.data[1];

    /*
     * The following prevents errors that occur when a record is discarded or deleted and
     * recreated before the discard / delete ack message is received.
     *
     * A (presumably unsolvable) problem remains when a client deletes a record in the exact moment
     * between another clients creation and read message for the same record
     */
    if (message.data[0] === C.ACTIONS.DELETE || message.data[0] === C.ACTIONS.UNSUBSCRIBE || message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.DELETE) {
      this._destroyEventEmitter.emit('destroy_ack_' + name, message);

      if (message.data[0] === C.ACTIONS.DELETE && this._records[name]) {
        this._records[name]._$onMessage(message);
      }

      return;
    }

    if (message.data[0] === C.ACTIONS.SNAPSHOT) {
      message.processedError = true;
      this._snapshotRegistry.recieve(name, message.data[2]);
      return;
    }

    if (message.data[0] === C.ACTIONS.HAS) {
      message.processedError = true;
      this._snapshotRegistry.recieve(name, message.data[2]);
      return;
    }
  } else {
    name = message.data[0];
  }

  var processed = false;

  var record = this._records[name];
  if (record) {
    processed = true;
    record._$onMessage(message);
  }

  if (message.action === C.ACTIONS.READ && this._snapshotRegistry.hasRequest(name)) {
    processed = true;
    this._snapshotRegistry.recieve(name, null, JSON.parse(message.data[2]));
  } else if (message.action === C.ACTIONS.HAS && this._hasRegistry.hasRequest(name)) {
    processed = true;
    this._hasRegistry.recieve(name, null, messageParser.convertTyped(message.data[1]));
  } else if (message.action === C.ACTIONS.WRITE_ACKNOWLEDGEMENT && !record) {
    processed = true;
    Record._handleWriteAcknowledgements(message, this._writeCallbacks[name], this._client);
  } else if (message.action === C.ACTIONS.ACK && message.data[0] === C.ACTIONS.UNLISTEN && this._listener[name] && this._listener[name].destroyPending) {
    processed = true;
    this._listener[name].destroy();
    delete this._listener[name];
  } else if (this._listener[name]) {
    processed = true;
    this._listener[name]._$onMessage(message);
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    // An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
    processed = true;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    // record can receive a HAS_PROVIDER after discarding the record
    processed = true;
  }

  if (!processed) {
    message.processedError = true;
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.UNSOLICITED_MESSAGE, name);
  }
};

/**
 * Callback for 'error' events from the record.
 *
 * @param   {String} recordName
 * @param   {String} error
 *
 * @private
 * @returns {void}
 */
RecordHandler.prototype._onRecordError = function (recordName, error) {
  this._client._$onError(C.TOPIC.RECORD, error, recordName);
};

/**
 * When the client calls discard or delete on a record, there is a short delay
 * before the corresponding ACK message is received from the server. To avoid
 * race conditions if the record is re-requested straight away the old record is
 * removed from the cache straight awy and will only listen for one last ACK message
 *
 * @param   {String} recordName The name of the record that was just deleted / discarded
 *
 * @private
 * @returns {void}
 */
RecordHandler.prototype._onDestroyPending = function (recordName) {
  if (!this._records[recordName]) {
    this._client._$onError(C.TOPIC.RECORD, 'Record attempted to be destroyed but does not exists', recordName);
    return;
  }
  var onMessage = this._records[recordName]._$onMessage.bind(this._records[recordName]);
  this._destroyEventEmitter.once('destroy_ack_' + recordName, onMessage);
  this._removeRecord(recordName);
};

/**
 * Callback for 'deleted' and 'discard' events from a record. Removes the record from
 * the registry
 *
 * @param   {String} recordName
 *
 * @returns {void}
 */
RecordHandler.prototype._removeRecord = function (recordName) {
  delete this._records[recordName];
  delete this._lists[recordName];
};

module.exports = RecordHandler;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/listener":28,"../utils/single-notifier":30,"./anonymous-record":19,"./list":21,"./record":23,"component-emitter2":2}],23:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable prefer-spread, prefer-rest-params */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var jsonPath = _dereq_('./json-path');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');
var EventEmitter = _dereq_('component-emitter2');
var C = _dereq_('../constants/constants');
var messageBuilder = _dereq_('../message/message-builder');
var messageParser = _dereq_('../message/message-parser');
var utils = _dereq_('../utils/utils');

/**
 * This class represents a single record - an observable
 * dataset returned by client.record.getRecord()
 *
 * @extends {EventEmitter}
 *
 * @param {String} name              The unique name of the record
 * @param {Object} recordOptions     A map of options, e.g. { persist: true }
 * @param {Connection} Connection    The instance of the server connection
 * @param {Object} options        Deepstream options
 * @param {Client} client        deepstream.io client
 *
 * @constructor
 */
var Record = function Record(name, recordOptions, connection, options, client) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this.name = name;
  this.usages = 0;
  this._recordOptions = recordOptions;
  this._connection = connection;
  this._client = client;
  this._options = options;
  this.isReady = false;
  this.isDestroyed = false;
  this.hasProvider = false;
  this._$data = Object.create(null);
  this.version = null;
  this._eventEmitter = new EventEmitter();
  this._queuedMethodCalls = [];
  this._writeCallbacks = {};

  this._mergeStrategy = null;
  if (options.mergeStrategy) {
    this.setMergeStrategy(options.mergeStrategy);
  }

  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._sendRead.bind(this));

  this._readAckTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RECORD,
    name: name,
    action: C.ACTIONS.SUBSCRIBE,
    timeout: this._options.recordReadAckTimeout
  });
  this._responseTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RECORD,
    name: name,
    action: C.ACTIONS.READ,
    event: C.EVENT.RESPONSE_TIMEOUT,
    timeout: this._options.recordReadTimeout
  });
  this._sendRead();
};

EventEmitter(Record.prototype); // eslint-disable-line

/**
 * Set a merge strategy to resolve any merge conflicts that may occur due
 * to offline work or write conflicts. The function will be called with the
 * local record, the remote version/data and a callback to call once the merge has
 * completed or if an error occurs ( which leaves it in an inconsistent state until
 * the next update merge attempt ).
 *
 * @param   {Function} mergeStrategy A Function that can resolve merge issues.
 *
 * @public
 * @returns {void}
 */
Record.prototype.setMergeStrategy = function (mergeStrategy) {
  if (typeof mergeStrategy === 'function') {
    this._mergeStrategy = mergeStrategy;
  } else {
    throw new Error('Invalid merge strategy: Must be a Function');
  }
};

/**
 * Returns a copy of either the entire dataset of the record
 * or - if called with a path - the value of that path within
 * the record's dataset.
 *
 * Returning a copy rather than the actual value helps to prevent
 * the record getting out of sync due to unintentional changes to
 * its data
 *
 * @param   {[String]} path A JSON path, e.g. users[ 2 ].firstname
 *
 * @public
 * @returns {Mixed} value
 */
Record.prototype.get = function (path) {
  return jsonPath.get(this._$data, path, this._options.recordDeepCopy);
};

/**
 * Sets the value of either the entire dataset
 * or of a specific path within the record
 * and submits the changes to the server
 *
 * If the new data is equal to the current data, nothing will happen
 *
 * @param {[String|Object]} pathOrData Either a JSON path when called with
 *                                     two arguments or the data itself
 * @param {Object} data     The data that should be stored in the record
 *
 * @public
 * @returns {void}
 */
Record.prototype.set = function (pathOrData, dataOrCallback, callback) {
  var path = void 0;
  var data = void 0;
  if (arguments.length === 1) {
    // set( object )
    if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) !== 'object') {
      throw new Error('invalid argument data');
    }
    data = pathOrData;
  } else if (arguments.length === 2) {
    if (typeof pathOrData === 'string' && pathOrData.length !== 0 && typeof dataOrCallback !== 'function') {
      // set( path, data )
      path = pathOrData;
      data = dataOrCallback;
    } else if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) === 'object' && typeof dataOrCallback === 'function') {
      // set( data, callback )
      data = pathOrData;
      callback = dataOrCallback; // eslint-disable-line
    } else {
      throw new Error('invalid argument path');
    }
  } else if (arguments.length === 3) {
    // set( path, data, callback )
    if (typeof pathOrData !== 'string' || pathOrData.length === 0 || typeof callback !== 'function') {
      throw new Error('invalid arguments, must pass in a string, a value and a function');
    }
    path = pathOrData;
    data = dataOrCallback;
  }

  if (!path && (data === null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object')) {
    throw new Error('invalid arguments, scalar values cannot be set without path');
  }

  if (this._checkDestroyed('set')) {
    return this;
  }

  if (!this.isReady) {
    this._queuedMethodCalls.push({ method: 'set', args: arguments });
    return this;
  }

  var oldValue = this._$data;
  var newValue = jsonPath.set(oldValue, path, data, this._options.recordDeepCopy);

  if (oldValue === newValue) {
    if (typeof callback === 'function') {
      var errorMessage = null;
      if (!utils.isConnected(this._client)) {
        errorMessage = 'Connection error: error updating record as connection was closed';
      }
      utils.requestIdleCallback(function () {
        return callback(errorMessage);
      });
    }
    return this;
  }

  var config = void 0;
  if (typeof callback === 'function') {
    config = {};
    config.writeSuccess = true;
    if (!utils.isConnected(this._client)) {
      utils.requestIdleCallback(function () {
        return callback('Connection error: error updating record as connection was closed');
      });
    } else {
      this._setUpCallback(this.version, callback);
    }
  }
  this._sendUpdate(path, data, config);
  this._applyChange(newValue);
  return this;
};

/**
 * Subscribes to changes to the records dataset.
 *
 * Callback is the only mandatory argument.
 *
 * When called with a path, it will only subscribe to updates
 * to that path, rather than the entire record
 *
 * If called with true for triggerNow, the callback will
 * be called immediatly with the current value
 *
 * @param   {[String]}    path      A JSON path within the record to subscribe to
 * @param   {Function}    callback         Callback function to notify on changes
 * @param   {[Boolean]}   triggerNow      A flag to specify whether the callback should
 *                                         be invoked immediatly with the current value
 *
 * @public
 * @returns {void}
 */
// eslint-disable-next-line
Record.prototype.subscribe = function (path, callback, triggerNow) {
  var _this = this;

  var args = this._normalizeArguments(arguments);

  if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
    throw new Error('invalid argument path');
  }
  if (typeof args.callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._checkDestroyed('subscribe')) {
    return;
  }

  if (args.triggerNow) {
    this.whenReady(function () {
      _this._eventEmitter.on(args.path, args.callback);
      args.callback(_this.get(args.path));
    });
  } else {
    this._eventEmitter.on(args.path, args.callback);
  }
};

/**
 * Removes a subscription that was previously made using record.subscribe()
 *
 * Can be called with a path to remove the callback for this specific
 * path or only with a callback which removes it from the generic subscriptions
 *
 * Please Note: unsubscribe is a purely client side operation. If the app is no longer
 * interested in receiving updates for this record from the server it needs to call
 * discard instead
 *
 * @param   {[String|Function]}   pathOrCallback A JSON path
 * @param   {Function}         callback     The callback method. Please note, if a bound
 *                                          method was passed to subscribe, the same method
 *                                          must be passed to unsubscribe as well.
 *
 * @public
 * @returns {void}
 */
// eslint-disable-next-line
Record.prototype.unsubscribe = function (pathOrCallback, callback) {
  var args = this._normalizeArguments(arguments);

  if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
    throw new Error('invalid argument path');
  }
  if (args.callback !== undefined && typeof args.callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._checkDestroyed('unsubscribe')) {
    return;
  }
  this._eventEmitter.off(args.path, args.callback);
};

/**
 * Removes all change listeners and notifies the server that the client is
 * no longer interested in updates for this record
 *
 * @public
 * @returns {void}
 */
Record.prototype.discard = function () {
  var _this2 = this;

  if (this._checkDestroyed('discard')) {
    return;
  }
  this.whenReady(function () {
    _this2.usages--;
    if (_this2.usages <= 0) {
      _this2.emit('destroyPending');
      _this2._discardTimeout = _this2._ackTimeoutRegistry.add({
        topic: C.TOPIC.RECORD,
        name: _this2.name,
        action: C.ACTIONS.UNSUBSCRIBE
      });
      _this2._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.UNSUBSCRIBE, [_this2.name]);
    }
  });
};

/**
 * Deletes the record on the server.
 *
 * @public
 * @returns {void}
 */
Record.prototype.delete = function () {
  var _this3 = this;

  if (this._checkDestroyed('delete')) {
    return;
  }
  this.whenReady(function () {
    _this3.emit('destroyPending');
    _this3._deleteAckTimeout = _this3._ackTimeoutRegistry.add({
      topic: C.TOPIC.RECORD,
      name: _this3.name,
      action: C.ACTIONS.DELETE,
      event: C.EVENT.DELETE_TIMEOUT,
      timeout: _this3._options.recordDeleteTimeout
    });
    _this3._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.DELETE, [_this3.name]);
  });
};

/**
 * Convenience method, similar to promises. Executes callback
 * whenever the record is ready, either immediatly or once the ready
 * event is fired
 *
 * @param   {Function} callback Will be called when the record is ready
 *
 * @returns {void}
 */
Record.prototype.whenReady = function (callback) {
  if (this.isReady === true) {
    callback(this);
  } else {
    this.once('ready', callback.bind(this, this));
  }
};

/**
 * Callback for incoming messages from the message handler
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
Record.prototype._$onMessage = function (message) {
  if (message.action === C.ACTIONS.READ) {
    if (this.version === null) {
      this._ackTimeoutRegistry.clear(message);
      this._onRead(message);
    } else {
      this._applyUpdate(message, this._client);
    }
  } else if (message.action === C.ACTIONS.ACK) {
    this._processAckMessage(message);
  } else if (message.action === C.ACTIONS.UPDATE || message.action === C.ACTIONS.PATCH) {
    this._applyUpdate(message, this._client);
  } else if (message.action === C.ACTIONS.WRITE_ACKNOWLEDGEMENT) {
    Record._handleWriteAcknowledgements(message, this._writeCallbacks, this._client);
  } else if (message.data[0] === C.EVENT.VERSION_EXISTS) {
    // Otherwise it should be an error, and dealt with accordingly
    this._recoverRecord(message.data[2], JSON.parse(message.data[3]), message);
  } else if (message.data[0] === C.EVENT.MESSAGE_DENIED) {
    this._clearTimeouts();
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    var hasProvider = messageParser.convertTyped(message.data[1], this._client);
    this.hasProvider = hasProvider;
    this.emit('hasProviderChanged', hasProvider);
  }
};

Record._handleWriteAcknowledgements = function (message, callbacks, client) {
  var versions = JSON.parse(message.data[1]);
  for (var i = 0; i < versions.length; i++) {
    var callback = callbacks[versions[i]];
    if (callback !== undefined) {
      callback(messageParser.convertTyped(message.data[2], client));
      delete callbacks[versions[i]];
    }
  }
};

/**
 * Called when a merge conflict is detected by a VERSION_EXISTS error or if an update recieved
 * is directly after the clients. If no merge strategy is configure it will emit a VERSION_EXISTS
 * error and the record will remain in an inconsistent state.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._recoverRecord = function (remoteVersion, remoteData, message) {
  message.processedError = true;
  if (this._mergeStrategy) {
    this._mergeStrategy(this, remoteData, remoteVersion, this._onRecordRecovered.bind(this, remoteVersion, remoteData, message));
  } else {
    this.emit('error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version);
  }
};

Record.prototype._sendUpdate = function (path, data, config) {
  this.version++;
  var msgData = void 0;
  if (!path) {
    msgData = config === undefined ? [this.name, this.version, data] : [this.name, this.version, data, config];
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.UPDATE, msgData);
  } else {
    msgData = config === undefined ? [this.name, this.version, path, messageBuilder.typed(data)] : [this.name, this.version, path, messageBuilder.typed(data), config];
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.PATCH, msgData);
  }
};

/**
 * Callback once the record merge has completed. If successful it will set the
 * record state, else emit and error and the record will remain in an
 * inconsistent state until the next update.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRecordRecovered = function (remoteVersion, remoteData, message, error, data) {
  if (!error) {
    var oldVersion = this.version;
    this.version = remoteVersion;

    var oldValue = this._$data;

    if (utils.deepEquals(oldValue, remoteData)) {
      return;
    }

    var newValue = jsonPath.set(oldValue, undefined, data, false);

    if (utils.deepEquals(data, remoteData)) {
      this._applyChange(data);

      var callback = this._writeCallbacks[remoteVersion];
      if (callback !== undefined) {
        callback(null);
        delete this._writeCallbacks[remoteVersion];
      }
      return;
    }

    var config = message.data[4];
    if (config && JSON.parse(config).writeSuccess) {
      var _callback = this._writeCallbacks[oldVersion];
      delete this._writeCallbacks[oldVersion];
      this._setUpCallback(this.version, _callback);
    }
    this._sendUpdate(undefined, data, config);
    this._applyChange(newValue);
  } else {
    this.emit('error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version);
  }
};

/**
 * Callback for ack-messages. Acks can be received for
 * subscriptions, discards and deletes
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._processAckMessage = function (message) {
  var acknowledgedAction = message.data[0];

  if (acknowledgedAction === C.ACTIONS.SUBSCRIBE) {
    this._ackTimeoutRegistry.clear(message);
  } else if (acknowledgedAction === C.ACTIONS.DELETE) {
    this.emit('delete');
    this._destroy();
  } else if (acknowledgedAction === C.ACTIONS.UNSUBSCRIBE) {
    this.emit('discard');
    this._destroy();
  }
};

/**
 * Applies incoming updates and patches to the record's dataset
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyUpdate = function (message) {
  var version = parseInt(message.data[1], 10);
  var data = void 0;
  if (message.action === C.ACTIONS.PATCH) {
    data = messageParser.convertTyped(message.data[3], this._client);
  } else {
    data = JSON.parse(message.data[2]);
  }

  if (this.version === null) {
    this.version = version;
  } else if (this.version + 1 !== version) {
    if (message.action === C.ACTIONS.PATCH) {
      /**
      * Request a snapshot so that a merge can be done with the read reply which contains
      * the full state of the record
      **/
      this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, [this.name]);
    } else {
      this._recoverRecord(version, data, message);
    }
    return;
  }

  this.version = version;
  this._applyChange(jsonPath.set(this._$data, message.action === C.ACTIONS.PATCH ? message.data[2] : undefined, data));
};

/**
 * Callback for incoming read messages
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRead = function (message) {
  this.version = parseInt(message.data[1], 10);
  this._applyChange(jsonPath.set(this._$data, undefined, JSON.parse(message.data[2])));
  this._setReady();
};

/**
 * Invokes method calls that where queued while the record wasn't ready
 * and emits the ready event
 *
 * @private
 * @returns {void}
 */
Record.prototype._setReady = function () {
  this.isReady = true;
  for (var i = 0; i < this._queuedMethodCalls.length; i++) {
    this[this._queuedMethodCalls[i].method].apply(this, this._queuedMethodCalls[i].args);
  }
  this._queuedMethodCalls = [];
  this.emit('ready');
};

Record.prototype._setUpCallback = function (currentVersion, callback) {
  var newVersion = Number(this.version) + 1;
  this._writeCallbacks[newVersion] = callback;
};

/**
 * Sends the read message, either initially at record
 * creation or after a lost connection has been re-established
 *
 * @private
 * @returns {void}
 */
Record.prototype._sendRead = function () {
  this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.CREATEORREAD, [this.name]);
};

/**
 * Compares the new values for every path with the previously stored ones and
 * updates the subscribers if the value has changed
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyChange = function (newData) {
  if (this.isDestroyed) {
    return;
  }

  var oldData = this._$data;
  this._$data = newData;

  var paths = this._eventEmitter.eventNames();
  for (var i = 0; i < paths.length; i++) {
    var newValue = jsonPath.get(newData, paths[i], false);
    var oldValue = jsonPath.get(oldData, paths[i], false);

    if (newValue !== oldValue) {
      this._eventEmitter.emit(paths[i], this.get(paths[i]));
    }
  }
};

/**
 * Creates a map based on the types of the provided arguments
 *
 * @param {Arguments} args
 *
 * @private
 * @returns {Object} arguments map
 */
Record.prototype._normalizeArguments = function (args) {
  // If arguments is already a map of normalized parameters
  // (e.g. when called by AnonymousRecord), just return it.
  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return args[0];
  }

  var result = Object.create(null);

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === 'string') {
      result.path = args[i];
    } else if (typeof args[i] === 'function') {
      result.callback = args[i];
    } else if (typeof args[i] === 'boolean') {
      result.triggerNow = args[i];
    }
  }

  return result;
};

/**
 * Clears all timeouts that are set when the record is created
 *
 * @private
 * @returns {void}
 */
Record.prototype._clearTimeouts = function () {
  this._ackTimeoutRegistry.remove({ ackId: this._readAckTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._responseTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._deleteAckTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._discardTimeout, silent: true });
};

/**
 * A quick check that's carried out by most methods that interact with the record
 * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
 *
 * @param   {String} methodName The name of the method that invoked this check
 *
 * @private
 * @returns {Boolean} is destroyed
 */
Record.prototype._checkDestroyed = function (methodName) {
  if (this.isDestroyed) {
    this.emit('error', 'Can\'t invoke \'' + methodName + '\'. Record \'' + this.name + '\' is already destroyed');
    return true;
  }

  return false;
};

/**
 * Destroys the record and nulls all
 * its dependencies
 *
 * @private
 * @returns {void}
 */
Record.prototype._destroy = function () {
  this._clearTimeouts();
  this._eventEmitter.off();
  this._resubscribeNotifier.destroy();
  this.isDestroyed = true;
  this.isReady = false;
  this._client = null;
  this._eventEmitter = null;
  this._connection = null;
};

module.exports = Record;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/resubscribe-notifier":29,"../utils/utils":31,"./json-path":20,"component-emitter2":2}],24:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');
var RpcResponse = _dereq_('./rpc-response');
var Rpc = _dereq_('./rpc');
var messageParser = _dereq_('../message/message-parser');
var messageBuilder = _dereq_('../message/message-builder');

/**
 * The main class for remote procedure calls
 *
 * Provides the rpc interface and handles incoming messages
 * on the rpc topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
var RpcHandler = function RpcHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._rpcs = {};
  this._providers = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._reprovide.bind(this));
};

/**
 * Registers a callback function as a RPC provider. If another connected client calls
 * client.rpc.make() the request will be routed to this method
 *
 * The callback will be invoked with two arguments:
 *     {Mixed} data The data passed to the client.rpc.make function
 *     {RpcResponse} rpcResponse An object with methods to response,
 *                               acknowledge or reject the request
 *
 * Only one callback can be registered for a RPC at a time
 *
 * Please note: Deepstream tries to deliver data in its original format.
 * Data passed to client.rpc.make as a String will arrive as a String,
 * numbers or implicitly JSON serialized objects will arrive in their
 * respective format as well
 *
 * @public
 * @returns void
 */
RpcHandler.prototype.provide = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (this._providers[name]) {
    throw new Error('RPC ' + name + ' already registered');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    name: name,
    action: C.ACTIONS.SUBSCRIBE
  });
  this._providers[name] = callback;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [name]);
};

/**
 * Unregisters this client as a provider for a remote procedure call
 *
 * @param   {String} name the name of the rpc
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.unprovide = function (name) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  if (this._providers[name]) {
    delete this._providers[name];
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.RPC,
      name: name,
      action: C.ACTIONS.UNSUBSCRIBE
    });
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.UNSUBSCRIBE, [name]);
  }
};

/**
 * Executes the actual remote procedure call
 *
 * @param   {String}   name     The name of the rpc
 * @param   {Mixed}    data     Serializable data that will be passed to the provider
 * @param   {Function} callback Will be invoked with the returned result or if the rpc failed
 *                              receives to arguments: error or null and the result
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.make = function (name, data, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  var uid = this._client.getUid();
  var typedData = messageBuilder.typed(data);

  this._rpcs[uid] = new Rpc(name, callback, this._options, this._client);
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REQUEST, [name, uid, typedData]);
};

/**
 * Retrieves a RPC instance for a correlationId or throws an error
 * if it can't be found (which should never happen)
 *
 * @param {String} correlationId
 * @param {String} rpcName
 *
 * @private
 * @returns {Rpc}
 */
RpcHandler.prototype._getRpc = function (correlationId, rpcName, rawMessage) {
  var rpc = this._rpcs[correlationId];

  if (!rpc) {
    this._client._$onError(C.TOPIC.RPC, C.EVENT.UNSOLICITED_MESSAGE, rawMessage);
    return null;
  }

  return rpc;
};

/**
 * Handles incoming rpc REQUEST messages. Instantiates a new response object
 * and invokes the provider callback or rejects the request if no rpc provider
 * is present (which shouldn't really happen, but might be the result of a race condition
 * if this client sends a unprovide message whilst an incoming request is already in flight)
 *
 * @param   {Object} message The parsed deepstream RPC request message.
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._respondToRpc = function (message) {
  var name = message.data[0];
  var correlationId = message.data[1];
  var data = null;
  var response = void 0;

  if (message.data[2]) {
    data = messageParser.convertTyped(message.data[2], this._client);
  }

  if (this._providers[name]) {
    response = new RpcResponse(this._connection, name, correlationId);
    this._providers[name](data, response);
  } else {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REJECTION, [name, correlationId]);
  }
};

/**
 * Distributes incoming messages from the server
 * based on their action
 *
 * @param   {Object} message A parsed deepstream message
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._$handle = function (message) {
  var rpcName = void 0;
  var correlationId = void 0;

  // RPC Requests
  if (message.action === C.ACTIONS.REQUEST) {
    this._respondToRpc(message);
    return;
  }

  // RPC subscription Acks
  if (message.action === C.ACTIONS.ACK && (message.data[0] === C.ACTIONS.SUBSCRIBE || message.data[0] === C.ACTIONS.UNSUBSCRIBE)) {
    this._ackTimeoutRegistry.clear(message);
    return;
  }

  // handle auth/denied subscription errors
  if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.MESSAGE_PERMISSION_ERROR) {
      return;
    }
    if (message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.SUBSCRIBE) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.RPC,
        action: C.ACTIONS.SUBSCRIBE,
        name: message.data[1]
      });
      return;
    }
  }

  /*
   * Error messages always have the error as first parameter. So the
   * order is different to ack and response messages
   */
  if (message.action === C.ACTIONS.ERROR || message.action === C.ACTIONS.ACK) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.REQUEST) {
      correlationId = message.data[3];
    } else {
      correlationId = message.data[2];
    }
    rpcName = message.data[1];
  } else {
    rpcName = message.data[0];
    correlationId = message.data[1];
  }

  /*
  * Retrieve the rpc object
  */
  var rpc = this._getRpc(correlationId, rpcName, message.raw);
  if (rpc === null) {
    return;
  }

  // RPC Responses
  if (message.action === C.ACTIONS.ACK) {
    rpc.ack();
  } else if (message.action === C.ACTIONS.RESPONSE) {
    rpc.respond(message.data[2]);
    delete this._rpcs[correlationId];
  } else if (message.action === C.ACTIONS.ERROR) {
    message.processedError = true;
    rpc.error(message.data[0]);
    delete this._rpcs[correlationId];
  }
};

/**
 * Reregister providers to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
RpcHandler.prototype._reprovide = function () {
  for (var rpcName in this._providers) {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [rpcName]);
  }
};

module.exports = RpcHandler;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/resubscribe-notifier":29,"./rpc":26,"./rpc-response":25}],25:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var utils = _dereq_('../utils/utils');
var messageBuilder = _dereq_('../message/message-builder');

/**
 * This object provides a number of methods that allow a rpc provider
 * to respond to a request
 *
 * @param {Connection} connection - the clients connection object
 * @param {String} name the name of the rpc
 * @param {String} correlationId the correlationId for the RPC
 */
var RpcResponse = function RpcResponse(connection, name, correlationId) {
  this._connection = connection;
  this._name = name;
  this._correlationId = correlationId;
  this._isAcknowledged = false;
  this._isComplete = false;
  this.autoAck = true;
  utils.nextTick(this._performAutoAck.bind(this));
};

/**
 * Acknowledges the receipt of the request. This
 * will happen implicitly unless the request callback
 * explicitly sets autoAck to false
 *
 * @public
 * @returns   {void}
 */
RpcResponse.prototype.ack = function () {
  if (this._isAcknowledged === false) {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.ACK, [C.ACTIONS.REQUEST, this._name, this._correlationId]);
    this._isAcknowledged = true;
  }
};

/**
 * Reject the request. This might be necessary if the client
 * is already processing a large number of requests. If deepstream
 * receives a rejection message it will try to route the request to
 * another provider - or return a NO_RPC_PROVIDER error if there are no
 * providers left
 *
 * @public
 * @returns  {void}
 */
RpcResponse.prototype.reject = function () {
  this.autoAck = false;
  this._isComplete = true;
  this._isAcknowledged = true;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REJECTION, [this._name, this._correlationId]);
};

/**
 * Notifies the server that an error has occured while trying to process the request.
 * This will complete the rpc.
 *
 * @param {String} errorMsg the message used to describe the error that occured
 * @public
 * @returns  {void}
 */
RpcResponse.prototype.error = function (errorMsg) {
  this.autoAck = false;
  this._isComplete = true;
  this._isAcknowledged = true;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.ERROR, [errorMsg, this._name, this._correlationId]);
};

/**
 * Completes the request by sending the response data
 * to the server. If data is an array or object it will
 * automatically be serialised.
 * If autoAck is disabled and the response is sent before
 * the ack message the request will still be completed and the
 * ack message ignored
 *
 * @param {String} data the data send by the provider. Might be JSON serialized
 *
 * @public
 * @returns {void}
 */
RpcResponse.prototype.send = function (data) {
  if (this._isComplete === true) {
    throw new Error('Rpc ' + this._name + ' already completed');
  }
  this.ack();

  var typedData = messageBuilder.typed(data);
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.RESPONSE, [this._name, this._correlationId, typedData]);
  this._isComplete = true;
};

/**
 * Callback for the autoAck timeout. Executes ack
 * if autoAck is not disabled
 *
 * @private
 * @returns {void}
 */
RpcResponse.prototype._performAutoAck = function () {
  if (this.autoAck === true) {
    this.ack();
  }
};

module.exports = RpcResponse;

},{"../constants/constants":11,"../message/message-builder":16,"../utils/utils":31}],26:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var messageParser = _dereq_('../message/message-parser');

/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 *
 * @param {Object}   options           deepstream client config
 * @param {Function} callback          the function that will be called once the request
 *                                     is complete or failed
 * @param {Client} client
 *
 * @constructor
 */
var Rpc = function Rpc(name, callback, options, client) {
  this._options = options;
  this._callback = callback;
  this._client = client;
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._ackTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    action: C.ACTIONS.ACK,
    name: name,
    timeout: this._options.rpcAckTimeout,
    callback: this.error.bind(this)
  });
  this._responseTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    action: C.ACTIONS.REQUEST,
    name: name,
    event: C.EVENT.RESPONSE_TIMEOUT,
    timeout: this._options.rpcResponseTimeout,
    callback: this.error.bind(this)
  });
};

/**
 * Called once an ack message is received from the server
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.ack = function () {
  this._ackTimeoutRegistry.remove({
    ackId: this._ackTimeout
  });
};

/**
 * Called once a response message is received from the server.
 * Converts the typed data and completes the request
 *
 * @param   {String} data typed value
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.respond = function (data) {
  var convertedData = messageParser.convertTyped(data, this._client);
  this._callback(null, convertedData);
  this._complete();
};

/**
 * Callback for error messages received from the server. Once
 * an error is received the request is considered completed. Even
 * if a response arrives later on it will be ignored / cause an
 * UNSOLICITED_MESSAGE error
 *
 * @param   {String} errorMsg @TODO should be CODE and message
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.error = function (timeout) {
  this._callback(timeout.event || timeout);
  this._complete();
};

/**
 * Called after either an error or a response
 * was received
 *
 * @private
 * @returns {void}
 */
Rpc.prototype._complete = function () {
  this._ackTimeoutRegistry.remove({
    ackId: this._ackTimeout
  });
  this._ackTimeoutRegistry.remove({
    ackId: this._responseTimeout
  });
};

module.exports = Rpc;

},{"../constants/constants":11,"../message/message-parser":17}],27:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var EventEmitter = _dereq_('component-emitter2');

/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 *
 * @param {Client} client          The deepstream client
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @extends {EventEmitter}
 * @constructor
 */
var AckTimeoutRegistry = function AckTimeoutRegistry(client, options) {
  this._options = options;
  this._client = client;
  this._register = {};
  this._counter = 1;
  client.on('connectionStateChanged', this._onConnectionStateChanged.bind(this));
};

EventEmitter(AckTimeoutRegistry.prototype); // eslint-disable-line

/**
 * Add an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name or an event name.
 *
 * @public
 * @returns {Number} The timeout identifier
 */
AckTimeoutRegistry.prototype.add = function (timeout) {
  var timeoutDuration = timeout.timeout || this._options.subscriptionTimeout;

  if (this._client.getConnectionState() !== C.CONNECTION_STATE.OPEN || timeoutDuration < 1) {
    return -1;
  }

  this.remove(timeout);
  timeout.ackId = this._counter++;
  timeout.event = timeout.event || C.EVENT.ACK_TIMEOUT;
  timeout.__timeout = setTimeout(this._onTimeout.bind(this, timeout), timeoutDuration);
  this._register[this._getUniqueName(timeout)] = timeout;
  return timeout.ackId;
};

/**
 * Remove an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name or an event name.
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.remove = function (timeout) {
  if (timeout.ackId) {
    for (var uniqueName in this._register) {
      if (timeout.ackId === this._register[uniqueName].ackId) {
        this.clear({
          topic: this._register[uniqueName].topic,
          action: this._register[uniqueName].action,
          data: [this._register[uniqueName].name]
        });
      }
    }
  }

  if (this._register[this._getUniqueName(timeout)]) {
    this.clear({
      topic: timeout.topic,
      action: timeout.action,
      data: [timeout.name]
    });
  }
};

/**
 * Processes an incoming ACK-message and removes the corresponding subscription
 *
 * @param   {Object} message A parsed deepstream ACK message
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.clear = function (message) {
  var uniqueName = void 0;
  if (message.action === C.ACTIONS.ACK && message.data.length > 1) {
    uniqueName = message.topic + message.data[0] + (message.data[1] ? message.data[1] : '');
  } else {
    uniqueName = message.topic + message.action + message.data[0];
  }

  if (this._register[uniqueName]) {
    clearTimeout(this._register[uniqueName].__timeout);
  }

  delete this._register[uniqueName];
};

/**
 * Will be invoked if the timeout has occured before the ack message was received
 *
 * @param {Object} name The timeout object registered
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onTimeout = function (timeout) {
  delete this._register[this._getUniqueName(timeout)];

  if (timeout.callback) {
    delete timeout.__timeout;
    delete timeout.timeout;
    timeout.callback(timeout);
  } else {
    var msg = 'No ACK message received in time' + (timeout.name ? ' for ' + timeout.name : '');
    this._client._$onError(timeout.topic, timeout.event, msg);
  }
};

/**
 * Returns a unique name from the timeout
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._getUniqueName = function (timeout) {
  return timeout.topic + timeout.action + (timeout.name ? timeout.name : '');
};

/**
 * Remote all timeouts when connection disconnects
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onConnectionStateChanged = function (connectionState) {
  if (connectionState !== C.CONNECTION_STATE.OPEN) {
    for (var uniqueName in this._register) {
      clearTimeout(this._register[uniqueName].__timeout);
    }
  }
};

module.exports = AckTimeoutRegistry;

},{"../constants/constants":11,"component-emitter2":2}],28:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('./resubscribe-notifier');

/*
 * Creates a listener instance which is usedby deepstream Records and Events.
 *
 * @param {String} topic                 One of CONSTANTS.TOPIC
 * @param {String} pattern              A pattern that can be compiled via new RegExp(pattern)
 * @param {Function} callback           The function which is called when pattern was found and
 *                                      removed
 * @param {Connection} Connection       The instance of the server connection
 * @param {Object} options              Deepstream options
 * @param {Client} client               deepstream.io client
 *
 * @constructor
 */
var Listener = function Listener(topic, pattern, callback, options, client, connection) {
  this._topic = topic;
  this._callback = callback;
  this._pattern = pattern;
  this._options = options;
  this._client = client;
  this._connection = connection;
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._ackTimeoutRegistry.add({
    topic: this._topic,
    name: pattern,
    action: C.ACTIONS.LISTEN
  });

  this._resubscribeNotifier = new ResubscribeNotifier(client, this._sendListen.bind(this));
  this._sendListen();
  this.destroyPending = false;
};

Listener.prototype.sendDestroy = function () {
  this.destroyPending = true;
  this._connection.sendMsg(this._topic, C.ACTIONS.UNLISTEN, [this._pattern]);
  this._resubscribeNotifier.destroy();
};

/*
 * Resets internal properties. Is called when provider cals unlisten.
 *
 * @returns {void}
 */
Listener.prototype.destroy = function () {
  this._callback = null;
  this._pattern = null;
  this._client = null;
  this._connection = null;
};

/*
 * Accepting a listener request informs deepstream that the current provider is willing to
 * provide the record or event matching the subscriptionName . This will establish the current
 * provider as the only publisher for the actual subscription with the deepstream cluster.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a
 * deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.accept = function (name) {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN_ACCEPT, [this._pattern, name]);
};

/*
 * Rejecting a listener request informs deepstream that the current provider is not willing
 * to provide the record or event matching the subscriptionName . This will result in deepstream
 * requesting another provider to do so instead. If no other provider accepts or exists, the
 * record will remain unprovided.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a
 * deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.reject = function (name) {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN_REJECT, [this._pattern, name]);
};

/*
 * Wraps accept and reject as an argument for the callback function.
 *
 * @private
 * @returns {Object}
 */
Listener.prototype._createCallbackResponse = function (message) {
  return {
    accept: this.accept.bind(this, message.data[1]),
    reject: this.reject.bind(this, message.data[1])
  };
};

/*
 * Handles the incomming message.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._$onMessage = function (message) {
  if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND) {
    this._callback(message.data[1], true, this._createCallbackResponse(message));
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    this._callback(message.data[1], false);
  } else {
    this._client._$onError(this._topic, C.EVENT.UNSOLICITED_MESSAGE, message.data[0] + '|' + message.data[1]);
  }
};

/*
 * Sends a C.ACTIONS.LISTEN to deepstream.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._sendListen = function () {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN, [this._pattern]);
};

module.exports = Listener;

},{"../constants/constants":11,"./resubscribe-notifier":29}],29:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');

/**
 * Makes sure that all functionality is resubscribed on reconnect. Subscription is called
 * when the connection drops - which seems counterintuitive, but in fact just means
 * that the re-subscription message will be added to the queue of messages that
 * need re-sending as soon as the connection is re-established.
 *
 * Resubscribe logic should only occur once per connection loss
 *
 * @param {Client} client          The deepstream client
 * @param {Function} reconnect     Function to call to allow resubscribing
 *
 * @constructor
 */
var ResubscribeNotifier = function ResubscribeNotifier(client, resubscribe) {
  this._client = client;
  this._resubscribe = resubscribe;

  this._isReconnecting = false;
  this._connectionStateChangeHandler = this._handleConnectionStateChanges.bind(this);
  this._client.on('connectionStateChanged', this._connectionStateChangeHandler);
};

/**
 * Call this whenever this functionality is no longer needed to remove links
 *
 * @returns {void}
 */
ResubscribeNotifier.prototype.destroy = function () {
  this._client.removeListener('connectionStateChanged', this._connectionStateChangeHandler);
  this._connectionStateChangeHandler = null;
  this._client = null;
};

/**
* Check whenever the connection state changes if it is in reconnecting to resubscribe
* @private
* @returns {void}
*/
ResubscribeNotifier.prototype._handleConnectionStateChanges = function () {
  var state = this._client.getConnectionState();

  if (state === C.CONNECTION_STATE.RECONNECTING && this._isReconnecting === false) {
    this._isReconnecting = true;
  }
  if (state === C.CONNECTION_STATE.OPEN && this._isReconnecting === true) {
    this._isReconnecting = false;
    this._resubscribe();
  }
};

module.exports = ResubscribeNotifier;

},{"../constants/constants":11}],30:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('./resubscribe-notifier');

/**
 * Provides a scaffold for subscriptionless requests to deepstream, such as the SNAPSHOT
 * and HAS functionality. The SingleNotifier multiplexes all the client requests so
 * that they can can be notified at once, and also includes reconnection funcionality
 * incase the connection drops.
 *
 * @param {Client} client          The deepstream client
 * @param {Connection} connection  The deepstream connection
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {String} action          Constant. One of C.ACTIONS
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @constructor
 */
var SingleNotifier = function SingleNotifier(client, connection, topic, action, timeoutDuration) {
  this._client = client;
  this._connection = connection;
  this._topic = topic;
  this._action = action;
  this._timeoutDuration = timeoutDuration;
  this._requests = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resendRequests.bind(this));
  this._onResponseTimeout = this._onResponseTimeout.bind(this);
};

/**
 * Check if there is a request pending with a specified name
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.hasRequest = function (name) {
  return !!this._requests[name];
};

/**
 * Add a request. If one has already been made it will skip the server request
 * and multiplex the response
 *
 * @param {String} name An identifier for the request, e.g. a record name

 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.request = function (name, callback) {
  if (!this._requests[name]) {
    this._requests[name] = [];
    this._connection.sendMsg(this._topic, this._action, [name]);
  }

  var ackId = this._ackTimeoutRegistry.add({
    topic: this._topic,
    event: C.EVENT.RESPONSE_TIMEOUT,
    name: name,
    action: this._action,
    timeout: this._timeoutDuration,
    callback: this._onResponseTimeout
  });
  this._requests[name].push({ callback: callback, ackId: ackId });
};

/**
 * Process a response for a request. This has quite a flexible API since callback functions
 * differ greatly and helps maximise reuse.
 *
 * @param {String} name An identifier for the request, e.g. a record name
 * @param {String} error Error message
 * @param {Object} data If successful, the response data
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.recieve = function (name, error, data) {
  var entries = this._requests[name];

  if (!entries) {
    this._client._$onError(this._topic, C.EVENT.UNSOLICITED_MESSAGE, 'no entry for ' + name);
    return;
  }

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    this._ackTimeoutRegistry.remove({
      ackId: entry.ackId
    });
    entry.callback(error, data);
  }
  delete this._requests[name];
};

/**
 * Will be invoked if a timeout occurs before a response arrives from the server
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._onResponseTimeout = function (timeout) {
  var msg = 'No response received in time for ' + this._topic + '|' + this._action + '|' + timeout.name;
  this._client._$onError(this._topic, C.EVENT.RESPONSE_TIMEOUT, msg);
};

/**
 * Resends all the requests once the connection is back up
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._resendRequests = function () {
  for (var request in this._requests) {
    this._connection.sendMsg(this._topic, this._action, [request]);
  }
};

module.exports = SingleNotifier;

},{"../constants/constants":11,"./resubscribe-notifier":29}],31:[function(_dereq_,module,exports){
(function (process){
'use strict';
/* eslint-disable valid-typeof */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var C = _dereq_('../constants/constants');

/**
 * A regular expression that matches whitespace on either side, but
 * not in the center of a string
 *
 * @type {RegExp}
 */
var TRIM_REGULAR_EXPRESSION = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * Used in typeof comparisons
 *
 * @type {String}
 */
var OBJECT = 'object';

/**
 * True if environment is node, false if it's a browser
 * This seems somewhat inelegant, if anyone knows a better solution,
 * let's change this (must identify browserify's pseudo node implementation though)
 *
 * @public
 * @type {Boolean}
 */
exports.isNode = typeof process !== 'undefined' && process.toString() === '[object process]';

/**
 * Provides as soon as possible async execution in a cross
 * platform way
 *
 * @param   {Function} fn the function to be executed in an asynchronous fashion
 *
 * @public
 * @returns {void}
 */
exports.nextTick = function (fn) {
  if (exports.isNode) {
    process.nextTick(fn);
  } else {
    setTimeout(fn, 0);
  }
};

/**
 * Removes whitespace from the beginning and end of a string
 *
 * @param   {String} inputString
 *
 * @public
 * @returns {String} trimmedString
 */
exports.trim = function (inputString) {
  if (inputString.trim) {
    return inputString.trim();
  }
  return inputString.replace(TRIM_REGULAR_EXPRESSION, '');
};

/**
 * Compares two objects for deep (recoursive) equality
 *
 * This used to be a significantly more complex custom implementation,
 * but JSON.stringify has gotten so fast that it now outperforms the custom
 * way by a factor of 1.5 to 3.
 *
 * In IE11 / Edge the custom implementation is still slightly faster, but for
 * consistencies sake and the upsides of leaving edge-case handling to the native
 * browser / node implementation we'll go for JSON.stringify from here on.
 *
 * Please find performance test results here
 *
 * http://jsperf.com/deep-equals-code-vs-json
 *
 * @param   {Mixed} objA
 * @param   {Mixed} objB
 *
 * @public
 * @returns {Boolean} isEqual
 */
exports.deepEquals = function (objA, objB) {
  if (objA === objB) {
    return true;
  } else if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== OBJECT || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== OBJECT) {
    return false;
  }

  return JSON.stringify(objA) === JSON.stringify(objB);
};

/**
 * Similar to deepEquals above, tests have shown that JSON stringify outperforms any attempt of
 * a code based implementation by 50% - 100% whilst also handling edge-cases and keeping
 * implementation complexity low.
 *
 * If ES6/7 ever decides to implement deep copying natively (what happened to Object.clone?
 * that was briefly a thing...), let's switch it for the native implementation. For now though,
 * even Object.assign({}, obj) only provides a shallow copy.
 *
 * Please find performance test results backing these statements here:
 *
 * http://jsperf.com/object-deep-copy-assign
 *
 * @param   {Mixed} obj the object that should be cloned
 *
 * @public
 * @returns {Mixed} clone
 */
exports.deepCopy = function (obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === OBJECT) {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
};

/**
 * Copy the top level of items, but do not copy its items recourisvely. This
 * is much quicker than deepCopy does not guarantee the object items are new/unique.
 * Mainly used to change the reference to the actual object itself, but not its children.
 *
 * @param   {Mixed} obj the object that should cloned
 *
 * @public
 * @returns {Mixed} clone
 */
exports.shallowCopy = function (obj) {
  if (Array.isArray(obj)) {
    return obj.slice(0);
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === OBJECT) {
    var copy = Object.create(null);
    var props = Object.keys(obj);
    for (var i = 0; i < props.length; i++) {
      copy[props[i]] = obj[props[i]];
    }
    return copy;
  }
  return obj;
};

/**
 * Set timeout utility that adds support for disabling a timeout
 * by passing null
 *
 * @param {Function} callback        the function that will be called after the given time
 * @param {Number}   timeoutDuration the duration of the timeout in milliseconds
 *
 * @public
 * @returns {Number} timeoutId
 */
exports.setTimeout = function (callback, timeoutDuration) {
  if (timeoutDuration !== null) {
    return setTimeout(callback, timeoutDuration);
  }
  return -1;
};

/**
 * Set Interval utility that adds support for disabling an interval
 * by passing null
 *
 * @param {Function} callback        the function that will be called after the given time
 * @param {Number}   intervalDuration the duration of the interval in milliseconds
 *
 * @public
 * @returns {Number} intervalId
 */
exports.setInterval = function (callback, intervalDuration) {
  if (intervalDuration !== null) {
    return setInterval(callback, intervalDuration);
  }
  return -1;
};

/**
 * This method is used to break up long running operations and run a callback function immediately
 * after the browser has completed other operations such as events and display updates.
 *
 * @param {Function} callback        the function that will be called after the given time
 * @param {...*}     param1, ..., paramN additional parameters which are passed through to the
 *                                     callback
 *
 * @public
 */
exports.requestIdleCallback = !exports.isNode && window.requestIdleCallback && window.requestIdleCallback.bind(window) || function (cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.cancelIdleCallback = !exports.isNode && window.cancelIdleCallback && window.cancelIdleCallback.bind(window) || function (id) {
  clearTimeout(id);
};

/**
 * Used to see if a protocol is specified within the url
 * @type {RegExp}
 */
var hasUrlProtocol = /^wss:|^ws:|^\/\//;

/**
 * Used to see if the protocol contains any unsupported protocols
 * @type {RegExp}
 */
var unsupportedProtocol = /^http:|^https:/;

var URL = _dereq_('url');

/**
 * Take the url passed when creating the client and ensure the correct
 * protocol is provided
 * @param  {String} url Url passed in by client
 * @return {String} Url with supported protocol
 */
exports.parseUrl = function (initialURl, defaultPath) {
  var url = initialURl;
  if (unsupportedProtocol.test(url)) {
    throw new Error('Only ws and wss are supported');
  }
  if (!hasUrlProtocol.test(url)) {
    url = 'ws://' + url;
  } else if (url.indexOf('//') === 0) {
    url = 'ws:' + url;
  }
  var serverUrl = URL.parse(url);
  if (!serverUrl.host) {
    throw new Error('invalid url, missing host');
  }
  serverUrl.protocol = serverUrl.protocol ? serverUrl.protocol : 'ws:';
  serverUrl.pathname = serverUrl.pathname ? serverUrl.pathname : defaultPath;
  return URL.format(serverUrl);
};

/**
 * Returns true is the connection state is OPEN
 * @return {Boolean}
 */
exports.isConnected = function (client) {
  var connectionState = client.getConnectionState();
  return connectionState === C.CONNECTION_STATE.OPEN;
};

}).call(this,_dereq_('_process'))
},{"../constants/constants":11,"_process":3,"url":8}]},{},[10])(10)
});