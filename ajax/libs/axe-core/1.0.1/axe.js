/*! aXe v1.0.1
 * Copyright (c) 2015 Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */
(function (global) {

/*exported clone */

/**
 * Deeply clones an object or array
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed}     A clone of the initial object or array
 */
function clone(obj) {
	'use strict';
	var index, length,
		out = obj;

	if (obj !== null && typeof obj === 'object') {
		if (Array.isArray(obj)) {
			out = [];
			for (index = 0, length = obj.length; index < length; index++) {
				out[index] = clone(obj[index]);
			}
		} else {
			out = {};
			// jshint forin: false
			for (index in obj) {
				out[index] = clone(obj[index]);
			}
		}
	}
	return out;
}
/*exported matchesSelector */
/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
var matchesSelector = (function () {
	'use strict';

	var method;

	function getMethod(win) {

		var index, candidate,
			elProto = win.Element.prototype,
			candidates = ['matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector'],
			length = candidates.length;

		for (index = 0; index < length; index++) {
			candidate = candidates[index];
			if (elProto[candidate]) {
				return candidate;
			}
		}
	}


	return function (node, selector) {

		if (!method || !node[method]) {
			method = getMethod(node.ownerDocument.defaultView);
		}

		return node[method](selector);
	};
}());
/*exported escapeSelector */
/**
 * Escapes a property value of a CSS selector
 * @see https://github.com/mathiasbynens/CSS.escape/
 * @see http://dev.w3.org/csswg/cssom/#serialize-an-identifier
 * @param  {String} value The piece of the selector to escape
 * @return {String}        The escaped selector
 */
var escapeSelector = function (value) {
	'use strict';
	/*jshint bitwise: true, eqeqeq: false, maxcomplexity: 14, maxstatements: 23, onevar: false, -W041: false */
	var string = String(value);
	var length = string.length;
	var index = -1;
	var codeUnit;
	var result = '';
	var firstCodeUnit = string.charCodeAt(0);
	while (++index < length) {
		codeUnit = string.charCodeAt(index);
		// Note: there’s no need to special-case astral symbols, surrogate
		// pairs, or lone surrogates.

		// If the character is NULL (U+0000), then throw an
		// `InvalidCharacterError` exception and terminate these steps.
		if (codeUnit == 0x0000) {
			throw new Error('INVALID_CHARACTER_ERR');
		}

		if (
			// If the character is in the range [\1-\1F] (U+0001 to U+001F) or
			// [\7F-\9F] (U+007F to U+009F), […]
			(codeUnit >= 0x0001 && codeUnit <= 0x001F) ||
			(codeUnit >= 0x007F && codeUnit <= 0x009F) ||
			// If the character is the first character and is in the range [0-9]
			// (U+0030 to U+0039), […]
			(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
			// If the character is the second character and is in the range [0-9]
			// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
			(index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D)
		) {
			// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
			result += '\\' + codeUnit.toString(16) + ' ';
			continue;
		}

		// If the character is the second character and is `-` (U+002D) and the
		// first character is `-` as well, […]
		if (index == 1 && codeUnit == 0x002D && firstCodeUnit == 0x002D) {
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);
			continue;
		}

		// If the character is not handled by one of the above rules and is
		// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
		// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
		// U+005A), or [a-z] (U+0061 to U+007A), […]
		if (
			codeUnit >= 0x0080 ||
			codeUnit == 0x002D ||
			codeUnit == 0x005F ||
			codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
			codeUnit >= 0x0041 && codeUnit <= 0x005A ||
			codeUnit >= 0x0061 && codeUnit <= 0x007A
		) {
			// the character itself
			result += string.charAt(index);
			continue;
		}

		// Otherwise, the escaped character.
		// http://dev.w3.org/csswg/cssom/#escape-a-character
		result += '\\' + string.charAt(index);

	}
	return result;
};
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(_global.require) == 'function') {
    try {
      var _rb = _global.require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(_global.Buffer) == 'function' ? _global.Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
 

  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);

/*exported axe, require, define, commons */
// exported namespace for aXe
var axe = {};

// local namespace for common functions
var commons;

// locally override require and define to prevent conflicts with pages utilizing RequireJS
var require, define;

/*global matchesSelector, escapeSelector, clone */
/*exported utils */
var utils = {};

utils.matchesSelector = matchesSelector;
utils.escapeSelector = escapeSelector;
utils.clone = clone;
/*exported helpers */
var helpers = {};

/*global Rule, Tool */

/**
 * Constructor which holds configured rules and information about the document under test
 */
function Audit(reporter) {
	'use strict';

	this.reporter = reporter;
	this.rules = [];
	this.tools = {};
}

/**
 * Adds a new rule to the Audit.  If a rule with specified ID already exists, it will be overridden
 * @param {Object} spec Rule specification object
 */
Audit.prototype.addRule = function (spec) {
	'use strict';

	var candidate;
	for (var i = 0, l = this.rules.length; i < l; i++) {
		candidate = this.rules[i];
		if (candidate.id === spec.id) {
			this.rules[i] = new Rule(spec);
			return;
		}
	}

	this.rules.push(new Rule(spec));
};

/**
 * Adds a new tool to the Audit.  If a tool with specified ID already exists, it will be overridden
 * @param {Object} spec Tool specification object
 */
Audit.prototype.addTool = function (spec) {
	'use strict';
	this.tools[spec.id] = new Tool(spec);
};

/**
 * Runs the Audit; which in turn should call `run` on each rule.
 * @async
 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Function} fn       Callback function to fire when audit is complete
 */
Audit.prototype.run = function (context, options, fn) {
	'use strict';

	var q = utils.queue();
	this.rules.forEach(function (rule) {
		if (utils.ruleShouldRun(rule, context, options)) {
			q.defer(function (cb) {
				rule.run(context, options, cb);
			});
		}
	});
	q.then(fn);
};

/**
 * Runs Rule `after` post processing functions
 * @param  {Array} results  Array of RuleResults to postprocess
 * @param  {Mixed} options  Options object to pass into rules and/or disable rules or checks
 */
Audit.prototype.after = function (results, options) {
	'use strict';

	var rules = this.rules;

	return results.map(function (ruleResult) {
		var rule = utils.findBy(rules, 'id', ruleResult.id);

		return rule.after(ruleResult, options);
	});
};

/*exported CheckResult */

/**
 * Constructor for the result of checks
 * @param {Object} check CheckResult specification
 */
function CheckResult(check) {
	'use strict';

	/**
	 * ID of the check.  Unique in the context of a rule.
	 * @type {String}
	 */
	this.id = check.id;

	/**
	 * Any data passed by Check (by calling `this.data()`)
	 * @type {Mixed}
	 */
	this.data = null;

	/**
	 * Any node that is related to the Check, specified by calling `this.relatedNodes([HTMLElement...])` inside the Check
	 * @type {Array}
	 */
	this.relatedNodes = [];

	/**
	 * The return value of the Check's evaluate function
	 * @type {Mixed}
	 */
	this.result = null;
}

/*global CheckResult */

function Check(spec) {
	'use strict';

	/**
	 * Unique ID for the check.  Checks may be re-used, so there may be additional instances of checks
	 * with the same ID.
	 * @type {String}
	 */
	this.id = spec.id;

	/**
	 * Free-form options that are passed as the second parameter to the `evaluate`
	 * @type {Mixed}
	 */
	this.options = spec.options;

	/**
	 * Optional. If specified, only nodes that match this CSS selector are tested
	 * @type {String}
	 */
	this.selector = spec.selector;

	/**
	 * The actual code, accepts 2 parameters: node (the node under test), options (see this.options).
	 * This function is run in the context of a checkHelper, which has the following methods
	 * - `async()` - if called, the check is considered to be asynchronous; returns a callback function
	 * - `data()` - free-form data object, associated to the `CheckResult` which is specific to each node
	 * @type {Function}
	 */
	this.evaluate = spec.evaluate;

	/**
	 * Optional. Filter and/or modify checks for all nodes
	 * @type {Function}
	 */
	if (spec.after) {
		this.after = spec.after;
	}

	if (spec.matches) {
		/**
		 * Optional function to test if check should be run against a node, overrides Check#matches
		 * @type {Function}
		 */
		this.matches = spec.matches;
	}

	/**
	 * enabled by default, if false, this check will not be included in the rule's evaluation
	 * @type {Boolean}
	 */
	this.enabled = spec.hasOwnProperty('enabled') ? spec.enabled : true;
}

/**
 * Determines whether the check should be run against a node
 * @param  {HTMLElement} node The node to test
 * @return {Boolean}      Whether the check should be run
 */
Check.prototype.matches = function (node) {
	'use strict';

	if (!this.selector || utils.matchesSelector(node, this.selector)) {
		return true;
	}

	return false;
};

/**
 * Run the check's evaluate function (call `this.evaluate(node, options)`)
 * @param  {HTMLElement} node  The node to test
 * @param  {Object} options    The options that override the defaults and provide additional
 *                             information for the check
 * @param  {Function} callback Function to fire when check is complete
 */
Check.prototype.run = function (node, options, callback) {
	'use strict';
	options = options || {};
	var enabled = options.hasOwnProperty('enabled') ? options.enabled : this.enabled,
		checkOptions = options.options || this.options;

	if (enabled && this.matches(node)) {
		var checkResult = new CheckResult(this);
		var checkHelper = utils.checkHelper(checkResult, callback);
		var result;

		try {
			result = this.evaluate.call(checkHelper, node, checkOptions);
		} catch (e) {
			axe.log(e.message, e.stack);
			callback(null);
			return;
		}

		if (!checkHelper.isAsync) {
			checkResult.result = result;
			setTimeout(function () {
				callback(checkResult);
			}, 0);
		}
	} else {
		callback(null);
	}
};

/*exported Context */

/**
 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
 * @private
 * @param  {Context} context The context object to operate on and assign to
 * @param  {HTMLElement} frame   The frame to push onto Context
 */
function pushUniqueFrame(context, frame) {
	'use strict';
	if (utils.isHidden(frame)) {
		return;
	}

	var fr = utils.findBy(context.frames, 'node', frame);

	if (!fr) {
		context.frames.push({
			node: frame,
			include: [],
			exclude: []
		});
	}

}

/**
 * Unshift selectors of matching iframes
 * @private
 * @param  {Context} context The context object to operate on and assign to
 * @param  {String} type          The "type" of context, 'include' or 'exclude'
 * @param  {Array} selectorArray  Array of CSS selectors, each element represents a frame;
 * where the last element is the actual node
 */
function pushUniqueFrameSelector(context, type, selectorArray) {
	'use strict';

	context.frames = context.frames || [];

	var result, frame;
	var frames = document.querySelectorAll(selectorArray.shift());

	frameloop:
	for (var i = 0, l = frames.length; i < l; i++) {
		frame = frames[i];
		for (var j = 0, l2 = context.frames.length; j < l2; j++) {
			if (context.frames[j].node === frame) {
				context.frames[j][type].push(selectorArray);
				break frameloop;
			}
		}
		result = {
			node: frame,
			include: [],
			exclude: []
		};

		if (selectorArray) {
			result[type].push(selectorArray);
		}

		context.frames.push(result);
	}
}

/**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} context  The configuration object passed to `Context`
 * @return {Object}         Normalized context spec to include both `include` and `exclude` arrays
 */
function normalizeContext(context) {
	'use strict';

	if (context && typeof context === 'object') {

		if (context instanceof Node) {
			return {
				include: [context],
				exclude: []
			};
		}

		if (context.hasOwnProperty('include') || context.hasOwnProperty('exclude')) {
			return {
				include: context.include || [],
				exclude: context.exclude || []
			};
		}

		if (context.length === +context.length) {
			return {
				include: context,
				exclude: []
			};
		}
	}

	if (typeof context === 'string') {
		return {
			include: [context],
			exclude: []
		};
	}

	return {
		include: [],
		exclude: []
	};
}

/**
 * Finds frames in context, converts selectors to Element references and pushes unique frames
 * @private
 * @param  {Context} context The instance of Context to operate on
 * @param  {String} type     The "type" of thing to parse, "include" or "exclude"
 * @return {Array}           Parsed array of matching elements
 */
function parseSelectorArray(context, type) {
	'use strict';

	var item,
		result = [];
	for (var i = 0, l = context[type].length; i < l; i++) {
		item = context[type][i];
		// selector
		if (typeof item === 'string') {
			result = result.concat(utils.toArray(document.querySelectorAll(item)));
			break;
		} else if (item && item.length) {

			if (item.length > 1) {
				pushUniqueFrameSelector(context, type, item);
			} else {
				result = result.concat(utils.toArray(document.querySelectorAll(item[0])));
			}
		} else {
			result.push(item);
		}
	}

	return result.filter(function (element) {

		if (element) {
			if ((element.nodeName === 'IFRAME' || element.nodeName === 'FRAME')) {
				pushUniqueFrame(context, element);
				return false;
			}
			utils.toArray(element.querySelectorAll('iframe, frame')).forEach(function (frame) {
				pushUniqueFrame(context, frame);
			});
		}
		return element;
	});
}

/**
 * Holds context of includes, excludes and frames for analysis.
 *
 * @todo  clarify and sync changes to design doc
 * Context : {IncludeStrings} || {
 *   // defaults to document/all
 *   include: {IncludeStrings},
 *   exclude : {ExcludeStrings}
 * }
 *
 * IncludeStrings : [{CSSSelectorArray}] || Node
 * ExcludeStrings : [{CSSSelectorArray}]
 * `CSSSelectorArray` an Array of selector strings that addresses a Node in a multi-frame document. All addresses
 * are in this form regardless of whether the document contains any frames.To evaluate the selectors to
 * find the node referenced by the array, evaluate the selectors in-order, starting in window.top. If N
 * is the length of the array, then the first N-1 selectors should result in an iframe and the last
 * selector should result in the specific node.
 *
 * @param {Object} spec Configuration or "specification" object
 */
function Context(spec) {
	'use strict';

	this.frames = [];
	this.page = (spec instanceof Node && spec.nodeType === Node.DOCUMENT_NODE) || !spec;
	this.initiator = (spec && typeof spec.initiator === 'boolean') ? spec.initiator : true;

	spec = normalizeContext(spec);
	this.exclude = spec.exclude;
	this.include = spec.include;

	this.include = parseSelectorArray(this, 'include');
	this.exclude = parseSelectorArray(this, 'exclude');

}

/*exported DqElement */

function truncate(str, maxLength, separator) {
	'use strict';

	maxLength = maxLength || 300;
	separator = separator || '...';

	if (str.length > maxLength) {
		var length = Math.floor((maxLength - separator.length) / 2);
		str = str.slice(0, length) + separator + str.slice(-length);
	}

	return str;
}

/**
 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 */
function DqElement(element, spec) {
	'use strict';
	spec = spec || {};

	/**
	 * A unique CSS selector for the element
	 * @type {String}
	 */
	this.selector = spec.selector || [utils.getSelector(element)];

	/**
	 * The generated HTML source code of the element
	 * @type {String}
	 */
	this.source = truncate(spec.source || element.outerHTML);

	/**
	 * The element which this object is based off or the containing frame, used for sorting.
	 * Excluded in toJSON method.
	 * @type {HTMLElement}
	 */
	this.element = element;
}

DqElement.prototype.toJSON = function () {
	'use strict';
	return {
		selector: this.selector,
		source: this.source
	};
};
/*exported RuleResult */

/**
 * Constructor for the result of Rules
 * @param {Object} rule RuleResult specification
 */
function RuleResult(rule) {
	'use strict';

	/**
	 * The ID of the Rule whom this result belongs to
	 * @type {String}
	 */
	this.id = rule.id;

	/**
	 * The calculated result of the Rule, either PASS, FAIL or NA
	 * @type {String}
	 */
	this.result = axe.constants.result.NA;

	/**
	 * Whether the Rule is a "pageLevel" rule
	 * @type {Boolean}
	 */
	this.pageLevel = rule.pageLevel;

	/**
	 * Impact of the violation
	 * @type {String}  Plain-english impact or null if rule passes
	 */
	this.impact = null;

	/**
	 * Holds information regarding nodes and individual CheckResults
	 * @type {Array}
	 */
	this.nodes = [];
}

/*global Check, RuleResult, DqElement */

/**
 * Unpacks and instantiates Checks
 * @private
 */
function unpackChecks(rule, spec) {
	'use strict';

	var i, l;
	if (spec.all) {
		for (i = 0, l = spec.all.length; i < l; i++) {
			rule.all.push(new Check(spec.all[i]));
		}
	}

	if (spec.none) {
		for (i = 0, l = spec.none.length; i < l; i++) {
			rule.none.push(new Check(spec.none[i]));
		}
	}

	if (spec.any) {
		for (i = 0, l = spec.any.length; i < l; i++) {
			rule.any.push(new Check(spec.any[i]));
		}
	}
}

function Rule(spec) {
	'use strict';

	/**
	 * The code, or string ID of the rule
	 * @type {String}
	 */
	this.id = spec.id;

	/**
	 * Selector that this rule applies to
	 * @type {String}
	 */
	this.selector = spec.selector || '*';

	/**
	 * Whether to exclude hiddden elements form analysis.  Defaults to true.
	 * @type {Boolean}
	 */
	this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;

	/**
	 * Flag to enable or disable rule
	 * @type {Boolean}
	 */
	this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;

	/**
	 * Denotes if the rule should be run if Context is not an entire page AND whether
	 * the Rule should be satisified regardless of Node
	 * @type {Boolean}
	 */
	this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;

	/**
	 * Checks that any may return true to satisfy rule
	 * @type {Array}
	 */
	this.any = [];

	/**
	 * Checks that must all return true to satisfy rule
	 * @type {Array}
	 */
	this.all = [];

	/**
	 * Checks that none may return true to satisfy rule
	 * @type {Array}
	 */
	this.none = [];

	unpackChecks(this, spec);

	/**
	 * Tags associated to this rule
	 * @type {Array}
	 */
	this.tags = spec.tags || [];

	if (spec.matches) {
		/**
		 * Optional function to test if rule should be run against a node, overrides Rule#matches
		 * @type {Function}
		 */
		this.matches = spec.matches;
	}

}

/**
 * Optionally test each node against a `matches` function to determine if the rule should run against
 * a given node.  Defaults to `true`.
 * @return {Boolean}    Whether the rule should run
 */
Rule.prototype.matches = function () {
	'use strict';

	return true;
};

/**
 * Selects `HTMLElement`s based on configured selector
 * @param  {Context} context The resolved Context object
 * @return {Array}           All matching `HTMLElement`s
 */
Rule.prototype.gather = function (context) {
	'use strict';
	var elements = utils.select(this.selector, context);
	if (this.excludeHidden) {
		return elements.filter(function (element) {
			return !utils.isHidden(element);
		});
	}
	return elements;
};

Rule.prototype.runChecks = function (type, node, options, callback) {
	'use strict';

	var self = this;
	var checkQueue = utils.queue();
	this[type].forEach(function (check) {
		var option = utils.getCheckOption(check, self.id, options);
		checkQueue.defer(function (done) {
			check.run(node, option, done);
		});
	});

	checkQueue.then(function (results) {
		results = results.filter(function (check) {
			return check;
		});
		callback({ type: type, results: results });
	});

};

/**
 * Runs the Rule's `evaluate` function
 * @param  {Context}   context  The resolved Context object
 * @param  {Mixed}   options  Options specific to this rule
 * @param  {Function} callback Function to call when evaluate is complete; receives a RuleResult instance
 */
Rule.prototype.run = function (context, options, callback) {
	'use strict';

	var nodes = this.gather(context);
	var q = utils.queue();
	var self = this;
	var ruleResult;

	ruleResult = new RuleResult(this);
	nodes.forEach(function (node) {
		if (self.matches(node)) {
			q.defer(function (nodeQueue) {
				var checkQueue = utils.queue();
				checkQueue.defer(function (done) {
					self.runChecks('any', node, options, done);
				});
				checkQueue.defer(function (done) {
					self.runChecks('all', node, options, done);
				});
				checkQueue.defer(function (done) {
					self.runChecks('none', node, options, done);
				});

				checkQueue.then(function (results) {
					if (results.length) {
						var hasResults = false,
							result = {
								node: new DqElement(node)
							};
						results.forEach(function (r) {
							var res = r.results.filter(function (result) {
								return result;
							});
							result[r.type] = res;
							if (res.length) {
								hasResults = true;
							}
						});
						if (hasResults) {
							ruleResult.nodes.push(result);
						}
					}
					nodeQueue();
				});

			});
		}
	});

	q.then(function () {
		callback(ruleResult);
	});

};

/**
 * Iterates the rule's Checks looking for ones that have an after function
 * @private
 * @param  {Rule} rule The rule to check for after checks
 * @return {Array}      Checks that have an after function
 */
function findAfterChecks(rule) {
	'use strict';

	return utils.getAllChecks(rule).filter(function (check) {
		return typeof check.after === 'function';
	});
}

/**
 * Finds and collates all results for a given Check on a specific Rule
 * @private
 * @param  {Array} nodes RuleResult#nodes; array of 'detail' objects
 * @param  {String} checkID The ID of the Check to find
 * @return {Array}         Matching CheckResults
 */
function findCheckResults(nodes, checkID) {
	'use strict';

	var checkResults = [];
	nodes.forEach(function (nodeResult) {
		var checks = utils.getAllChecks(nodeResult);
		checks.forEach(function (checkResult) {
			if (checkResult.id === checkID) {
				checkResults.push(checkResult);
			}
		});
	});
	return checkResults;
}

function filterChecks(checks) {
	'use strict';

	return checks.filter(function (check) {
		return check.filtered !== true;
	});
}

function sanitizeNodes(result) {
	'use strict';
	var checkTypes = ['any', 'all', 'none'];

	var nodes = result.nodes.filter(function (detail) {
		var length = 0;
		checkTypes.forEach(function (type) {
			detail[type] = filterChecks(detail[type]);
			length += detail[type].length;
		});
		return length > 0;
	});

	if (result.pageLevel && nodes.length) {
		nodes = [nodes.reduce(function (a, b) {
			if (a) {
				checkTypes.forEach(function (type) {
					a[type].push.apply(a[type], b[type]);
				});
				return a;
			}
		})];
	}
	return nodes;
}

/**
 * Runs all of the Rule's Check#after methods
 * @param  {RuleResult} result  The "pre-after" RuleResult
 * @param  {Mixed} options Options specific to the rule
 * @return {RuleResult}         The RuleResult as filtered by after functions
 */
Rule.prototype.after = function (result, options) {
	'use strict';

	var afterChecks = findAfterChecks(this);
	var ruleID = this.id;
	afterChecks.forEach(function (check) {
		var beforeResults = findCheckResults(result.nodes, check.id);
		var option = utils.getCheckOption(check, ruleID, options);

		var afterResults = check.after(beforeResults, option);
		beforeResults.forEach(function (item) {
			if (afterResults.indexOf(item) === -1) {
				item.filtered = true;
			}
		});
	});

	result.nodes = sanitizeNodes(result);
	return result;
};

/*exported Tool */

function Tool(spec) {
  'use strict';
  spec.source = spec.source || {};

  this.id = spec.id;
  this.options = spec.options;
  this._run = spec.source.run;
  this._cleanup = spec.source.cleanup;

  this.active = false;
}

Tool.prototype.run = function (element, options, callback) {
  'use strict';
  options = typeof options === 'undefined' ? this.options : options;

  this.active = true;
  this._run(element, options, callback);
};

Tool.prototype.cleanup = function (callback) {
  'use strict';

  this.active = false;
  this._cleanup(callback);
};


axe.constants = {};

axe.constants.result = {
	PASS: 'PASS',
	FAIL: 'FAIL',
	NA: 'NA'
};

axe.constants.raisedMetadata = {
	impact: ['minor', 'moderate', 'serious', 'critical']
};

/*global axe, global */
axe.version = 'dev';
global.axe = axe;

/*jshint devel: true */

/**
 * Logs a message to the developer console (if it exists and is active).
 */
axe.log = function () {
	'use strict';
	if (typeof console === 'object' && console.log) {
		// IE does not support console.log.apply
		Function.prototype.apply.call(console.log, console, arguments);
	}
};

function cleanupTools(callback) {
  'use strict';

  if (!axe._audit) {
    throw new Error('No audit configured');
  }

  var q = utils.queue();

  Object.keys(axe._audit.tools).forEach(function (key) {
    var tool = axe._audit.tools[key];
    if (tool.active) {
      q.defer(function (done) {
        tool.cleanup(done);
      });
    }
  });

  utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function (frame) {
    q.defer(function (done) {
      return utils.sendCommandToFrame(frame, {
        command: 'cleanup-tool'
      }, done);
    });
  });

  q.then(callback);
}
axe.cleanup = cleanupTools;

/*global reporters */
axe.configure = function (spec) {
	'use strict';

	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}

	if (spec.reporter && (typeof spec.reporter === 'function' || reporters[spec.reporter])) {
		audit.reporter = spec.reporter;
	}

};

/**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}   tags  Optional array of tags
 * @return {Array}  Array of rules
 */
axe.getRules = function (tags) {
	'use strict';

	tags = tags || [];
	var matchingRules = !tags.length ? axe._audit.rules : axe._audit.rules.filter(function (item) {
		return !!tags.filter(function (tag) {
			return item.tags.indexOf(tag) !== -1;
		}).length;
	});

	var ruleData = axe._audit.data.rules || {};
	return matchingRules.map(function (matchingRule) {
		var rd = ruleData[matchingRule.id] || {description: ''};
		return {ruleId: matchingRule.id, description: rd.description};
	});
};

/*global Audit, runRules, runTool, cleanupTools, commons: true */
function runCommand(data, callback) {
	'use strict';

	var context = (data && data.context) || {};
	if (context.include && !context.include.length) {
		context.include = [document];
	}
	var options = (data && data.options) || {};

	switch(data.command) {
		case 'rules':
			return runRules(context, options, callback);
		case 'run-tool':
			return runTool(data.parameter, data.selectorArray, options, callback);
		case 'cleanup-tool':
			return cleanupTools(callback);
	}
}

function setDefaultConfiguration(audit) {
	'use strict';

	var config = audit || {};
	config.rules = config.rules || [];
	config.tools = config.tools || [];
	config.data = config.data || {
		checks: {},
		rules: {}
	};

	return config;
}

var styleSheet;
function injectStyle(style) {
	'use strict';

	if (styleSheet && styleSheet.parentNode) {
		styleSheet.parentNode.removeChild(styleSheet);
		styleSheet = null;
	}
	if (!style) {
		return;
	}

	var head = document.head || document.getElementsByTagName('head')[0];
	styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';

	if (styleSheet.styleSheet === undefined) { // Not old IE
		styleSheet.appendChild(document.createTextNode(style));
	} else {
		styleSheet.styleSheet.cssText = style;
	}

	head.appendChild(styleSheet);

	return styleSheet;
}


/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specifcation" object
 * @private
 */
axe._load = function (audit) {
	'use strict';

	audit = setDefaultConfiguration(audit);

	axe._audit = new Audit(audit.reporter);
	commons = audit.commons;

	axe._audit.version = audit.version;
	var i, l;
	for (i = 0, l = audit.rules.length; i < l; i++) {
		axe._audit.addRule(audit.rules[i]);
	}
	for (i = 0, l = audit.tools.length; i < l; i++) {
		axe._audit.addTool(audit.tools[i]);
	}
	axe._audit.data = audit.data || {
		checks: {},
		rules: {}
	};

	injectStyle(audit.style);

	utils.respondable.subscribe('axe.ping', function (data, respond) {
		respond({axe: true});
	});

	utils.respondable.subscribe('axe.start', runCommand);
};

/*exported getReporter */
var reporters = {};
var defaultReporter;

function getReporter(reporter) {
	'use strict';

	if (typeof reporter === 'string' && reporters[reporter]) {
		return reporters[reporter];
	}

	if (typeof reporter === 'function') {
		return reporter;
	}

	return defaultReporter;
}

axe.reporter = function registerReporter(name, cb, isDefault) {
	'use strict';

	reporters[name] = cb;
	if (isDefault) {
		defaultReporter = cb;
	}
};

/*global Context, getReporter */
/*exported runRules */

/**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
function runRules(context, options, callback) {
	'use strict';
	context = new Context(context);

	var q = utils.queue();
	var audit = axe._audit;

	if (context.frames.length) {
		q.defer(function (done) {
			utils.collectResultsFromFrames(context, options, 'rules', null, done);
		});
	}
	q.defer(function (cb) {
		audit.run(context, options, cb);
	});
	q.then(function (data) {
		// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
		var results = utils.mergeResults(data.map(function (d) {
			return {
				results: d
			};
		}));

		// after should only run once, so ensure we are in the top level window
		if (context.initiator) {
			results = audit.after(results, options);
			results = results.map(utils.finalizeRuleResult);
		}

		callback(results);
	});
}

axe.a11yCheck = function (context, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!options || typeof options !== 'object') {
		options = {};
	}

	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	var reporter = getReporter(options.reporter || audit.reporter);
	runRules(context, options, function (results) {
		reporter(results, callback);
	});
};

/*exported runTool, cleanupTools */

function runTool(toolId, selectorArray, options, callback) {
  'use strict';

  if (!axe._audit) {
    throw new Error('No audit configured');
  }

  if (selectorArray.length > 1) {
    var frame = document.querySelector(selectorArray.shift());
    return utils.sendCommandToFrame(frame, {
      options: options,
      command: 'run-tool',
      parameter: toolId,
      selectorArray: selectorArray
    }, callback);
  }

  var node = document.querySelector(selectorArray.shift());
  axe._audit.tools[toolId].run(node, options, callback);
}
axe.tool = runTool;

/*global helpers */

/**
 * Finds failing Checks and combines each help message into an array
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {String}          failure messages
 */
helpers.failureSummary = function failureSummary(nodeData) {
	'use strict';

	var failingChecks = {};
	// combine "all" and "none" as messaging is the same
	failingChecks.none = nodeData.none.concat(nodeData.all);
	failingChecks.any = nodeData.any;

	return Object.keys(failingChecks).map(function (key) {
		if (!failingChecks[key].length) {
			return;
		}
		// @todo rm .failureMessage
		return axe._audit.data.failureSummaries[key].failureMessage(failingChecks[key].map(function (check) {
			return check.message || '';
		}));
	}).filter(function (i) {
		return i !== undefined;
	}).join('\n\n');
};

/*global helpers */
helpers.formatNode = function (node) {
	'use strict';

	return {
		target: node ? node.selector : null,
		html: node ? node.source : null
	};
};

/*global helpers */

helpers.splitResults = function (results, nodeDataMapper) {
	'use strict';

	var violations = [],
		passes = [];

	results.forEach(function (rr) {

		function mapNode(nodeData) {
			var result = nodeData.result || rr.result;
			var node = helpers.formatNode(nodeData.node);
			node.impact = nodeData.impact || null;

			return nodeDataMapper(node, nodeData, result);
		}

		var failResult,
			passResult = {
				id: rr.id,
				description: rr.description,
				help: rr.help,
				helpUrl: rr.helpUrl || null,
				impact: null,
				tags: rr.tags,
				nodes: []
			};

		failResult = utils.clone(passResult);
		failResult.impact = rr.impact || null;

		failResult.nodes = rr.violations.map(mapNode);
		passResult.nodes = rr.passes.map(mapNode);

		if (failResult.nodes.length) {
			violations.push(failResult);
		}
		if (passResult.nodes.length) {
			passes.push(passResult);
		}
	});

	return {
		violations: violations,
		passes: passes,
		url: window.location.href,
		timestamp: new Date()
	};
};

axe.reporter('raw', function (results, callback) {
	'use strict';
	callback(results);
});

/*global helpers */

axe.reporter('v1', function (results, callback) {
	'use strict';
	callback(helpers.splitResults(results, function (nodeResult, data, result) {
		if (result === axe.constants.result.FAIL) {
			nodeResult.failureSummary = helpers.failureSummary(data);
		}

		return nodeResult;
	}));
});

/*global helpers */


axe.reporter('v2', function (results, callback) {
	'use strict';

	function formatCheck(check) {
		return {
			id: check.id,
			impact: check.impact,
			message: check.message,
			data: check.data,
			relatedNodes: check.relatedNodes.map(helpers.formatNode)
		};
	}
	callback(helpers.splitResults(results, function (nodeResult, data) {
		nodeResult.any = data.any.map(formatCheck);
		nodeResult.all = data.all.map(formatCheck);
		nodeResult.none = data.none.map(formatCheck);
		return nodeResult;
	}));
}, true);

/*global DqElement */
/**
 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
 * @param  {CheckResult}   checkResult The target object
 * @param  {Function} callback    The callback to expose when `this.async()` is called
 * @return {Object}               Bound to `this` for a check's fn
 */
utils.checkHelper = function checkHelper(checkResult, callback) {
	'use strict';

	return {
		isAsync: false,
		async: function () {
			this.isAsync = true;
			return function (result) {
				checkResult.value = result;
				callback(checkResult);
			};
		},
		data: function (data) {
			checkResult.data = data;
		},
		relatedNodes: function (nodes) {
			nodes = Array.isArray(nodes) ? nodes : [nodes];
			checkResult.relatedNodes = nodes.map(function (element) {
				return new DqElement(element);
			});
		}
	};
};

/**
 * Sends a command to the sepecified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from all frames have returned
 */
utils.sendCommandToFrame = function(node, parameters, callback) {
  'use strict';

  var win = node.contentWindow;
  if (!win) {
    axe.log('Frame does not have a content window', node);
    return callback({});
  }

  var timeout = setTimeout(function () {
    timeout = setTimeout(function () {
      axe.log('No response from frame: ', node);
      callback(null);
    }, 0);
  }, 500);

  utils.respondable(win, 'axe.ping', null, function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      axe.log('Error returning results from frame: ', node);
      callback({});
      callback = null;
    }, 30000);
    utils.respondable(win, 'axe.start', parameters, function (data) {
      if (callback) {
        clearTimeout(timeout);
        callback(data);
      }
    });
  });

};


/**
* Sends a message to frames to start analysis and collate results (via `mergeResults`)
* @private
* @param  {Context}   context  The resolved Context object
* @param  {Object}   options   Options object (as passed to `runRules`)
* @param  {Function} callback  Function to call when results from all frames have returned
*/
utils.collectResultsFromFrames = function collectResultsFromFrames(context, options, command, parameter, callback) {
  'use strict';

  var q = utils.queue();
  var frames = context.frames;

  function defer(frame) {
    var params = {
      options: options,
      command: command,
      parameter: parameter,
      context: {
        initiator: false,
        page: context.page,
        include: frame.include || [],
        exclude: frame.exclude || []
      }
    };

    q.defer(function (done) {
      var node = frame.node;
      utils.sendCommandToFrame(node, params, function (data) {
        if (data) {
          return done({
            results: data,
            frameElement: node,
            frame: utils.getSelector(node)
          });
        }
        done(null);
      });
    });
  }

  for (var i = 0, l = frames.length; i < l; i++) {
    defer(frames[i]);
  }

  q.then(function (data) {
    callback(utils.mergeResults(data));
  });
};


/**
 * Wrapper for Node#contains; PhantomJS does not support Node#contains and erroneously reports that it does
 * @param  {HTMLElement} node      The candidate container node
 * @param  {HTMLElement} otherNode The node to test is contained by `node`
 * @return {Boolean}           Whether `node` contains `otherNode`
 */
utils.contains = function (node, otherNode) {
	//jshint bitwise: false
	'use strict';

	if (typeof node.contains === 'function') {
		return node.contains(otherNode);
	}

	return !!(node.compareDocumentPosition(otherNode) & 16);

};

/**
 * Extends metadata onto result object and executes any functions.  Will not deeply extend.
 * @param  {Object} to   The target of the extend
 * @param  {Object} from Metadata to extend
 * @param  {Array}  blacklist property names to exclude from resulting object
 */
utils.extendBlacklist = function (to, from, blacklist) {
	'use strict';
	blacklist = blacklist || [];

	for (var i in from) {
		if (from.hasOwnProperty(i) && blacklist.indexOf(i) === -1) {
			to[i] = from[i];
		}
	}

	return to;
};


/**
 * Extends metadata onto result object and executes any functions
 * @param  {Object} to   The target of the extend
 * @param  {Object} from Metadata to extend
 */
utils.extendMetaData = function (to, from) {
	'use strict';

	for (var i in from) {
		if (from.hasOwnProperty(i)) {
			if (typeof from[i] === 'function') {
				try {
					to[i] = from[i](to);
				} catch (e) {
					to[i] = null;
				}
			} else {
				to[i] = from[i];
			}
		}
	}
};


function raiseMetadata(obj, checks) {
	'use strict';

	Object.keys(axe.constants.raisedMetadata).forEach(function (key) {
		var collection = axe.constants.raisedMetadata[key];
		var highestIndex = checks.reduce(function (prevIndex, current) {
		  var currentIndex = collection.indexOf(current[key]);
		  return currentIndex > prevIndex ? currentIndex : prevIndex;
		}, -1);
		if (collection[highestIndex]) {
			obj[key] = collection[highestIndex];
		}
	});

}

/**
 * Calculates the result (PASS or FAIL) of a Node (node-level) or an entire Rule (page-level)
 * @private
 * @param  {Array} checks  Array of checks to calculate the result of
 * @return {String}        Either "PASS" or "FAIL"
 */
function calculateCheckResult(failingChecks) {
	'use strict';
	var isFailing = failingChecks.any.length || failingChecks.all.length || failingChecks.none.length;

	return isFailing ? axe.constants.result.FAIL : axe.constants.result.PASS;
}

/**
 * Iterates and calculates the results of each Node and then rolls the result up to the parent RuleResult
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculateRuleResult(ruleResult) {
	'use strict';
	function checkMap(check) {
		return utils.extendBlacklist({}, check, ['result']);
	}


	var newRuleResult = utils.extendBlacklist({
		violations: [],
		passes: []
	}, ruleResult, ['nodes']);

	ruleResult.nodes.forEach(function (detail) {

		var failingChecks = utils.getFailingChecks(detail);
		var result = calculateCheckResult(failingChecks);

		if (result === axe.constants.result.FAIL) {
			raiseMetadata(detail, utils.getAllChecks(failingChecks));
			detail.any = failingChecks.any.map(checkMap);
			detail.all = failingChecks.all.map(checkMap);
			detail.none = failingChecks.none.map(checkMap);
			newRuleResult.violations.push(detail);
			return;
		}

		detail.any = detail.any.filter(function (check) {
			return check.result;
		}).map(checkMap);
		// no need to filter `all` or `none` since we know they all pass
		detail.all = detail.all.map(checkMap);
		detail.none = detail.none.map(checkMap);

		newRuleResult.passes.push(detail);
	});
	raiseMetadata(newRuleResult, newRuleResult.violations);

	newRuleResult.result = newRuleResult.violations.length ? axe.constants.result.FAIL :
		(newRuleResult.passes.length ? axe.constants.result.PASS : newRuleResult.result);

	return newRuleResult;
}

utils.getFailingChecks = function (detail) {
	'use strict';

	var any = detail.any.filter(function (check) {
		return !check.result;
	});
	return {
		all: detail.all.filter(function (check) {
			return !check.result;
		}),
		any: any.length === detail.any.length ? any : [],
		none: detail.none.filter(function (check) {
			return !!check.result;
		})
	};
};


/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
utils.finalizeRuleResult = function (ruleResult) {
	'use strict';

	utils.publishMetaData(ruleResult);
	return calculateRuleResult(ruleResult);
};


/**
 * Iterates an array of objects looking for a property with a specific value
 * @param  {Array} array  The array of objects to iterate
 * @param  {String} key   The property name to test against
 * @param  {Mixed} value  The value to find
 * @return {Object}       The first matching object or `undefined` if no match
 */
utils.findBy = function (array, key, value) {
	'use strict';
	array = array || [];

	var index, length;
	for (index = 0, length = array.length; index < length; index++) {
		if (array[index][key] === value) {
			return array[index];
		}
	}
};

/**
 * Gets all Checks (or CheckResults) for a given Rule or RuleResult
 * @param {RuleResult|Rule} rule
 */
utils.getAllChecks = function getAllChecks(object) {
	'use strict';
	var result = [];
	return result.concat(object.any || []).concat(object.all || []).concat(object.none || []);
};


/**
 * Determines which CheckOption to use, either defined on the rule options, global check options or the check itself
 * @param  {Check} check    The Check object
 * @param  {String} ruleID  The ID of the rule
 * @param  {Object} options Options object as passed to main API
 * @return {Object}         The resolved object with `options` and `enabled` keys
 */
utils.getCheckOption = function (check, ruleID, options) {
	'use strict';
	var ruleCheckOption = ((options.rules && options.rules[ruleID] || {}).checks || {})[check.id];
	var checkOption = (options.checks || {})[check.id];

	var enabled = check.enabled;
	var opts = check.options;

	if (checkOption) {
		if (checkOption.hasOwnProperty('enabled')) {
			enabled = checkOption.enabled;
		}
		if (checkOption.hasOwnProperty('options')) {
			opts = checkOption.options;
		}

	}

	if (ruleCheckOption) {
		if (ruleCheckOption.hasOwnProperty('enabled')) {
			enabled = ruleCheckOption.enabled;
		}
		if (ruleCheckOption.hasOwnProperty('options')) {
			opts = ruleCheckOption.options;
		}
	}

	return {
		enabled: enabled,
		options: opts
	};
};
/**
 * Gets the index of element siblings that have the same nodeName
 * Intended for use with the CSS psuedo-class `:nth-of-type()` and xpath node index
 * @param  {HTMLElement} element The element to test
 * @return {Number}         The number of preceeding siblings with the same nodeName
 * @private
 */
function nthOfType(element) {
	'use strict';

	var index = 1,
		type = element.nodeName;

	/*jshint boss:true */
	while (element = element.previousElementSibling) {
		if (element.nodeName === type) {
			index++;
		}
	}

	return index;
}

/**
 * Checks if an element has siblings with the same selector
 * @param  {HTMLElement} node     The element to test
 * @param  {String} selector The CSS selector to test
 * @return {Boolean}          Whether any of element's siblings matches selector
 * @private
 */
function siblingsHaveSameSelector(node, selector) {
	'use strict';

	var index, sibling,
		siblings = node.parentNode.children;

	if (!siblings) {
		return false;
	}

	var length = siblings.length;

	for (index = 0; index < length; index++) {
		sibling = siblings[index];
		if (sibling !== node && utils.matchesSelector(sibling, selector)) {
			return true;
		}
	}
	return false;
}


/**
 * Gets a unique CSS selector
 * @param  {HTMLElement} node The element to get the selector for
 * @return {String}      Unique CSS selector for the node
 */
utils.getSelector = function getSelector(node) {
	//jshint maxstatements: 21
	'use strict';

	function escape(p) {
		return utils.escapeSelector(p);
	}

	var parts = [], part;

	while (node.parentNode) {
		part = '';

		if (node.id && document.querySelectorAll('#' + utils.escapeSelector(node.id)).length === 1) {
			parts.unshift('#' + utils.escapeSelector(node.id));
			break;
		}

		if (node.className && typeof node.className === 'string') {
			part = '.' + node.className.trim().split(/\s+/).map(escape).join('.');
			if (part === '.' || siblingsHaveSameSelector(node, part)) {
				part = '';
			}
		}

		if (!part) {
			part = utils.escapeSelector(node.nodeName).toLowerCase();
			if (part === 'html' || part === 'body') {
				parts.unshift(part);
				break;
			}
			if (siblingsHaveSameSelector(node, part)) {
				part += ':nth-of-type(' + nthOfType(node) + ')';
			}

		}

		parts.unshift(part);

		node = node.parentNode;
	}

	return parts.join(' > ');

};



/**
 * Determine whether an element is visible
 *
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's visibilty status
 */
utils.isHidden = function isHidden(el, recursed) {
	'use strict';

	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return false;
	}

	var style = el.ownerDocument.defaultView.getComputedStyle(el, null);

	if (!style || (!el.parentNode || (style.getPropertyValue('display') === 'none' ||

			(!recursed &&
				// visibility is only accurate on the first element
				(style.getPropertyValue('visibility') === 'hidden')) ||

			(el.getAttribute('aria-hidden') === 'true')))) {

		return true;
	}

	return utils.isHidden(el.parentNode, true);

};
/*global DqElement */

/**
* Adds the owning frame's CSS selector onto each instance of DqElement
* @private
* @param  {Array} resultSet `nodes` array on a `RuleResult`
* @param  {HTMLElement} frameElement  The frame element
* @param  {String} frameSelector     Unique CSS selector for the frame
*/
function pushFrame(resultSet, frameElement, frameSelector) {
  'use strict';
  resultSet.forEach(function (res) {
    res.node.selector.unshift(frameSelector);
    res.node = new DqElement(frameElement, res.node);
    var checks = utils.getAllChecks(res);
    if (checks.length) {
      checks.forEach(function (check) {
        check.relatedNodes.forEach(function (node) {
          node.selector.unshift(frameSelector);
          node = new DqElement(frameElement, node);
        });
      });
    }
  });
}

/**
* Adds `to` to `from` and then re-sorts by DOM order
* @private
* @param  {Array} target  `nodes` array on a `RuleResult`
* @param  {Array} to   `nodes` array on a `RuleResult`
* @return {Array}      The merged and sorted result
*/
function spliceNodes(target, to) {
  'use strict';

  var firstFromFrame = to[0].node,
  sorterResult, t;
  for (var i = 0, l = target.length; i < l; i++) {
    t = target[i].node;
    sorterResult = utils.nodeSorter(t.element, firstFromFrame.element);
    if (sorterResult > 0 || (sorterResult === 0 && firstFromFrame.selector.length < t.selector.length)) {
      target.splice.apply(target, [i, 0].concat(to));
      return;
    }
  }

  target.push.apply(target, to);
}

function normalizeResult(result) {
  'use strict';

  if (!result || !result.results) {
    return null;
  }

  if (!Array.isArray(result.results)) {
    return [result.results];
  }

  if (!result.results.length) {
    return null;
  }

  return result.results;

}

/**
* Merges one or more RuleResults (possibly from different frames) into one RuleResult
* @private
* @param  {Array} frameResults  Array of objects including the RuleResults as `results` and frame as `frame`
* @return {Array}              The merged RuleResults; should only have one result per rule
*/
utils.mergeResults = function mergeResults(frameResults) {
  'use strict';
  var result = [];
  frameResults.forEach(function (frameResult) {
    var results = normalizeResult(frameResult);
    if (!results || !results.length) {
      return;
    }

    results.forEach(function (ruleResult) {
      if (ruleResult.nodes && frameResult.frame) {
        pushFrame(ruleResult.nodes, frameResult.frameElement, frameResult.frame);
      }

      var res = utils.findBy(result, 'id', ruleResult.id);
      if (!res) {
        result.push(ruleResult);
      } else {
        if (ruleResult.nodes.length) {
          spliceNodes(res.nodes, ruleResult.nodes);
        }
      }
    });
  });
  return result;
};

/**
 * Array#sort callback to sort nodes by DOM order
 * @private
 * @param  {Node} a
 * @param  {Node} b
 * @return {Integer}   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort
 */
utils.nodeSorter = function nodeSorter(a, b) {
	/*jshint bitwise: false */

	'use strict';

	if (a === b) {
		return 0;
	}

	if (a.compareDocumentPosition(b) & 4) { // a before b
		return -1;
	}

	return 1; // b before a

};


/**
 * Publish metadata from axe._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
utils.publishMetaData = function (ruleResult) {
	'use strict';

	function extender(shouldBeTrue) {
		return function (check) {
			var sourceData = checksData[check.id] || {};
			var messages = sourceData.messages || {};
			var data = utils.extendBlacklist({}, sourceData, ['messages']);
			data.message = check.result === shouldBeTrue ? messages.pass : messages.fail;
			utils.extendMetaData(check, data);
		};
	}

	var checksData = axe._audit.data.checks || {};
	var rulesData = axe._audit.data.rules || {};
	var rule = utils.findBy(axe._audit.rules, 'id', ruleResult.id) || {};

	ruleResult.tags = utils.clone(rule.tags || []);

	var shouldBeTrue = extender(true);
	var shouldBeFalse = extender(false);
	ruleResult.nodes.forEach(function (detail) {
		detail.any.forEach(shouldBeTrue);
		detail.all.forEach(shouldBeTrue);
		detail.none.forEach(shouldBeFalse);
	});
	utils.extendMetaData(ruleResult, utils.clone(rulesData[ruleResult.id] || {}));
};

(function () {
	'use strict';
	function noop() {}

	/**
	 * Create an asyncronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order
	 * @return {Queue} The newly generated "queue"
	 */
	function queue() {
		var tasks = [],
			started = 0,
			remaining = 0, // number of tasks not yet finished
			await = noop;

		function pop() {
			var length = tasks.length;
			for (; started < length; started++) {
				var task = tasks[started],
					fn = task.shift();

				task.push(callback(started));
				fn.apply(null, task);
			}
		}

		function callback(i) {
			return function (r) {
				tasks[i] = r;
				if (!--remaining) {
					notify();
				}
			};
		}

		function notify() {
			await(tasks);
		}

		return {
			/**
			 * Defer a function that may or may not run asynchronously.
			 *
			 * First parameter should be the function to execute with subsequent
			 * parameters being passed as arguments to that function
			 */
			defer: function (fn) {
				tasks.push([fn]);
				++remaining;
				pop();
			},
			/**
			 * The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
			 * @param  {Function} f The callback, receives an array of the return/callbacked
			 * values of each of the "deferred" functions
			 */
			then: function (f) {
				await = f;
				if (!remaining) {
					notify();
				}
			},
			/**
			 * Abort the "queue" and prevent `then` function from firing
			 * @param  {Function} fn The callback to execute; receives an array of the results which have completed
			 */
			abort: function (fn) {
				await = noop;
				fn(tasks);
			}
		};
	}

	utils.queue = queue;
})();

/*global uuid */
(function (exports) {
	'use strict';
	var messages = {},
		subscribers = {};

	/**
	 * Verify the received message is from the "respondable" module
	 * @private
	 * @param  {Object} postedMessage The message received via postMessage
	 * @return {Boolean}              `true` if the message is verified from respondable
	 */
	function verify(postedMessage) {
		return typeof postedMessage === 'object' && typeof postedMessage.uuid === 'string' &&
			postedMessage._respondable === true;
	}

	/**
	 * Posts the message to correct frame.
	 * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
	 * @private
	 * @param  {Window}   win      The `window` to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {String}   uuid     The UUID, or pseudo-unique ID of the message
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function post(win, topic, message, uuid, callback) {

		var data = {
			uuid: uuid,
			topic: topic,
			message: message,
			_respondable: true
		};

		messages[uuid] = callback;
		win.postMessage(JSON.stringify(data), '*');
	}

	/**
	 * Post a message to a window who may or may not respond to it.
	 * @param  {Window}   win      The window to post the message to
	 * @param  {String}   topic    The topic of the message
	 * @param  {Object}   message  The message content
	 * @param  {Function} callback The function to invoke when/if the message is responded to
	 */
	function respondable(win, topic, message, callback) {
		var id = uuid.v1();
		post(win, topic, message, id, callback);
	}

	/**
	 * Subscribe to messages sent via the `respondable` module.
	 * @param  {String}   topic    The topic to listen to
	 * @param  {Function} callback The function to invoke when a message is received
	 */
	respondable.subscribe = function (topic, callback) {
		subscribers[topic] = callback;
	};

	/**
	 * Publishes the "respondable" message to the appropriate subscriber
	 * @private
	 * @param  {Event} event The event object of the postMessage
	 * @param  {Object} data  The data sent with the message
	 */
	function publish(event, data) {
		var topic = data.topic,
			message = data.message,
			subscriber = subscribers[topic];
		if (subscriber) {
			subscriber(message, createResponder(event.source, null, data.uuid));
		}
	}

	/**
	 * Helper closure to create a function that may be used to respond to a message
	 * @private
	 * @param  {Window} source The window from which the message originated
	 * @param  {String} topic  The topic of the message
	 * @param  {String} uuid   The "unique" ID of the original message
	 * @return {Function}      A function that may be invoked to respond to the message
	 */
	function createResponder(source, topic, uuid) {
		return function (message, callback) {
			post(source, topic, message, uuid, callback);
		};
	}

	window.addEventListener('message', function (e) {

		if (typeof e.data !== 'string') {
			return;
		}

		var data;
		try {
			data = JSON.parse(e.data);
		} catch(ex) {}

		if (!verify(data)) {
			return;
		}

		var uuid = data.uuid;
		if (messages[uuid]) {
			messages[uuid](data.message, createResponder(e.source, data.topic, uuid));
			messages[uuid] = null;
		}

		publish(e, data);
	}, false);

	exports.respondable = respondable;

}(utils));


/**
 * Determines whether a rule should run
 * @param  {Rule}    rule     The rule to test
 * @param  {Context} context  The context of the Audit
 * @param  {Object}  options  Options object
 * @return {Boolean}
 */
utils.ruleShouldRun = function (rule, context, options) {
	'use strict';
	if (rule.pageLevel && !context.page) {
		return false;
	}

	var runOnly = options.runOnly,
		ruleOptions = (options.rules || {})[rule.id];

	if (runOnly) {
		if (runOnly.type === 'rule') {
			return runOnly.values.indexOf(rule.id) !== -1;
		}

		return !!(runOnly.values || []).filter(function (item) {
			return rule.tags.indexOf(item) !== -1;
		}).length;
	}

	if ((ruleOptions && ruleOptions.hasOwnProperty('enabled')) ? !ruleOptions.enabled : !rule.enabled) {
		return false;
	}

	return true;
};
/**
 * Get the deepest node in a given collection
 * @private
 * @param  {Array} collection Array of nodes to test
 * @return {Node}             The deepest node
 */
function getDeepest(collection) {
	'use strict';

	return collection.sort(function (a, b) {
		if (utils.contains(a, b)) {
			return 1;
		}
		return -1;
	})[0];

}

/**
 * Determines if a node is included or excluded in a given context
 * @private
 * @param  {Node}  node     The node to test
 * @param  {Object}  context "Resolved" context object, @see resolveContext
 * @return {Boolean}         [description]
 */
function isNodeInContext(node, context) {
	'use strict';

	var include = context.include && getDeepest(context.include.filter(function (candidate) {
		return utils.contains(candidate, node);
	}));
	var exclude = context.exclude && getDeepest(context.exclude.filter(function (candidate) {
		return utils.contains(candidate, node);
	}));
	if ((!exclude && include) || (exclude && utils.contains(exclude, include))) {
		return true;
	}
	return false;
}

/**
 * Pushes unique nodes that are in context to an array
 * @private
 * @param  {Array} result  The array to push to
 * @param  {Array} nodes   The list of nodes to push
 * @param  {Object} context The "resolved" context object, @see resolveContext
 */
function pushNode(result, nodes, context) {
	'use strict';

	for (var i = 0, l = nodes.length; i < l; i++) {
		if (result.indexOf(nodes[i]) === -1 && isNodeInContext(nodes[i], context)) {
			result.push(nodes[i]);
		}
	}
}

/**
 * Selects elements which match `select` that are included and excluded via the `Context` object
 * @param  {String} selector  CSS selector of the HTMLElements to select
 * @param  {Context} context  The "resolved" context object, @see Context
 * @return {Array}            Matching nodes sorted by DOM order
 */
utils.select = function select(selector, context) {
	'use strict';

	var result = [];
	for (var i = 0, l = context.include.length; i < l; i++) {
		pushNode(result, context.include[i].querySelectorAll(selector), context);
	}

	return result.sort(utils.nodeSorter);
};

/**
 * Converts array-like (numerical indicies and `length` property) structures to actual, real arrays
 * @param  {Mixed} thing Array-like thing to convert
 * @return {Array}
 */
utils.toArray = function (thing) {
	'use strict';
	return Array.prototype.slice.call(thing);
};
/*! aXe Rules v1.0.2
 * Copyright (c) 2015 Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */

axe._load({"data":{"rules":{"accesskeys":{"description":"Ensures that each element on the page with an accesskey attribute has a unique value","helpUrl":"https://dequeuniversity.com/courses/html-css/robust-compatibility/markup-validation","help":"accesskey attribute value must be unique"},"area-alt":{"helpUrl":"https://dequeuniversity.com/courses/html-css/images/image-maps","help":"Active <area> elements need alternate text","description":"Checks the <area> elements of image maps to ensure that they have an alternative text"},"aria-allowed-attr":{"helpUrl":"https://dequeuniversity.com/issues/aria-allowed-attr","help":"ARIA attributes not allowed for role assigned to this element","description":"Checks all attributes that start with 'aria-' to ensure that they are all official WAI-ARIA attributes"},"aria-required-attr":{"description":"Checks all elements that contain WAI-ARIA roles to ensure that all required aria- attributes are present","helpUrl":"https://dequeuniversity.com/courses/html-css/forms/special-input-attributes","help":"ARIA attribute not provided for element with given role"},"aria-required-children":{"helpUrl":"https://dequeuniversity.com/issues/aria-required-children","description":"Checks all elements that contain a WAI-ARIA role to ensure that all required children roles are present","help":"Certain ARIA roles must contain particular children"},"aria-required-parent":{"helpUrl":"https://dequeuniversity.com/issues/aria-required-parent","description":"Checks all elements that contain a WAI-ARIA role to ensure that all required parent roles are present","help":"Certain ARIA roles must be contained by particular parents"},"aria-roles":{"description":"Checks all elements that contain the WAI-ARIA role attribute to ensure that the role value is valid","help":"ARIA roles used must conform to valid values","helpUrl":"https://dequeuniversity.com/issues/aria-roles"},"aria-valid-attr-value":{"helpUrl":"https://dequeuniversity.com/issues/aria-valid-attr-value","description":"Checks all elements that contain WAI-ARIA atributes to ensure that the values of the attributes are valid","help":"ARIA attributes used must conform to valid values"},"aria-valid-attr":{"helpUrl":"https://dequeuniversity.com/issues/aria-valid-attr","description":"Checks all elements that contain WAI-ARIA attributes to ensure that the attributes are valid attributes","help":"ARIA attributes used must conform to valid names"},"audio-caption":{"helpUrl":"https://dequeuniversity.com/issues/audio-caption","description":"Checks the use of all <audio> element to ensure that the element contains a <caption> element","help":"HTML5 <audio> elements need a captions track"},"blink":{"description":"Checks to make sure that the <blink> tag is never used","helpUrl":"https://dequeuniversity.com/courses/html-css/visual-layout/fonts-and-typography#id55_avoid_blink_marquee","help":"The <blink> tag is deprecated and must not be used"},"button-name":{"description":"Checks all <button> elements to ensure that they have a discernable accessible name","helpUrl":"https://dequeuniversity.com/courses/html-css/forms/form-labels#id84_example_button","help":"<button> elements must have alternate text"},"bypass":{"description":"Ensures that each page has at least one mechanism for a keyboard-only user to bypass the navigation and jump straight to the content","helpUrl":"https://dequeuniversity.com/courses/html-css/navigation/","help":"Page must have means to bypass content"},"checkboxgroup":{"description":"Ensures that all checkbox groups have a group and that that group designation is consistent","helpUrl":"https://dequeuniversity.com/courses/html-css/forms/form-labels#id84_labels_for_checkboxes","help":"Checkbox inputs with the same name must be part of a group"},"color-contrast":{"description":"Checks all elements to ensure that the contrast between the foreground and the background meets the WCAG 2 AA contrast ratio thresholds.","help":"Elements must have sufficient color contrast","helpUrl":"https://dequeuniversity.com/courses/html-css/visual-layout/color-contrast"},"data-table":{"description":"Checks that data tables are marked up semantically and have the correct header structure","helpUrl":"https://dequeuniversity.com/courses/html-css/data-tables/","help":"Data tables should be marked up properly"},"definition-list":{"description":"Ensures that all <dl> elements are structured correctly","help":"<dl> elements must contain properly-ordered <dt> and <dd> elements","helpUrl":"https://dequeuniversity.com/issues/definition-list"},"dlitem":{"helpUrl":"https://dequeuniversity.com/issues/dlitem","description":"Ensures that all <dd> and <dt> elements have a <dl> as a parent","help":"<dd> and <dt> elements must be contained in a <dl>"},"document-title":{"description":"Ensures that each HTML document contains a title","helpUrl":"https://dequeuniversity.com/courses/html-css/structure-and-semantics/page-title","help":"Documents must have <title> element to aid in navigation"},"duplicate-id":{"description":"Ensures that each element on the page with an ID attribute has a unique ID attribute value","helpUrl":"https://dequeuniversity.com/courses/html-css/robust-compatibility/markup-validation","help":"ID attribute value must be unique"},"empty-heading":{"helpUrl":"https://dequeuniversity.com/issues/empty-heading","description":"Ensures that headings on the page do not contain empty text","help":"Headings should not be empty"},"frame-title":{"description":"Ensure that all iframe and frame elements contain a unique and non-empty title attribute","helpUrl":"https://dequeuniversity.com/courses/html-css/frames/titles","help":"Frames must have unique title attribute"},"heading-order":{"description":"Ensure that the order in which the headings appear in the DOM is semantically correct","helpUrl":"https://dequeuniversity.com/courses/html-css/structure-and-semantics/headings#id37_use_headings_in_order","help":"Heading levels must only increase by one"},"html-lang":{"description":"Ensures that every HTML document has a lang attribute and that it contains a valid value","helpUrl":"https://dequeuniversity.com/courses/html-css/structure-and-semantics/language","help":"documentElement (<html>) must have a valid 'lang' attribute"},"image-alt":{"description":"Ensures that every <img> element has alternative text or is marked as presentational","helpUrl":"https://dequeuniversity.com/courses/html-css/images/alt-text","help":"Images must have alternate text"},"input-image-alt":{"description":"Ensures that every <input> that represents an image button has an accessible name","helpUrl":"https://dequeuniversity.com/courses/html-css/images/alt-text#id57_active_images_links_and_buttons","help":"Image buttons must have alternate text"},"label-title-only":{"description":"Ensures that every <input> that requires a label is not only labeled using the title attribute","helpUrl":"https://dequeuniversity.com/courses/html-css/forms/form-labels","help":"Only title or aria-describedby used to generate label for form element"},"label":{"description":"Ensures that every input element that requires a label, has an appropriate label","helpUrl":"https://dequeuniversity.com/courses/html-css/forms/form-labels","help":"Form elements must have labels"},"layout-table":{"description":"Ensures that <table> elements that are being used for layout do not contain markup only relevant for data tables","help":"Layout tables must not use data table elements","helpUrl":"https://dequeuniversity.com/courses/html-css/data-tables/"},"link-name":{"description":"Ensures that every link has an accessible name","helpUrl":"https://dequeuniversity.com/courses/html-css/navigation/links","help":"Links must have alternate text"},"list":{"description":"Ensures that lists are structured correctly","helpUrl":"https://dequeuniversity.com/courses/html-css/structure-and-semantics/lists-links-blockquote#id38_lists","help":"<ul> and <ol> lists must contain only <li> listitems"},"listitem":{"description":"Ensures that every list item is used semantically","helpUrl":"https://dequeuniversity.com/courses/html-css/structure-and-semantics/lists-links-blockquote#id38_lists","help":"All <li> elements must be contained in a <ul> or <ol>"},"marquee":{"description":"Ensures that the deprecated <marquee> tag is not used","helpUrl":"https://dequeuniversity.com/courses/html-css/visual-layout/fonts-and-typography#id55_avoid_blink_marquee","help":"<marquee> elements are deprecated and must not be used"},"meta-refresh":{"description":"Ensures that <meta> refresh is not used","help":"Timed refresh must not exist"},"meta-viewport":{"description":"Ensures that when <meta> viewport is used, it does not cause text scaling problems","helpUrl":"https://dequeuniversity.com/courses/html-css/visual-layout/fonts-and-typography#id55_ensure_text_resize_to_200_percent","help":"Zooming and scaling must not disabled"},"object-alt":{"description":"Ensures that every <object> element has a text alternative","help":"An embedded object must have a text alternative","helpUrl":"https://dequeuniversity.com/issues/object-alt"},"radiogroup":{"description":"Ensures that radio button groups are part of a group structure","helpUrl":"https://dequeuniversity.com/courses/html-css/forms/form-labels#id84_labels_for_radio_buttons","help":"Radio inputs with the same name must be part of a group"},"region":{"description":"Ensures that all content on a page is contained within a landmark region","help":"Content must be contained in a region","helpUrl":"https://dequeuniversity.com/courses/html-css/navigation/html5-aria-landmarks"},"scope":{"description":"Ensures that the scope attribute is used correctly on tables","helpUrl":"https://dequeuniversity.com/courses/html-css/data-tables/row-and-column-headers#id81_associate_header_cells_with_data_cells","help":"scope attribute is used correctly"},"server-side-image-map":{"description":"Ensures that server-side image maps are never used","helpUrl":"https://dequeuniversity.com/courses/html-css/images/image-maps#id63_avoid_use_of_server_side_image_maps","help":"Server-side image maps should not be used"},"skip-link":{"description":"Ensures that the best practice of having a skip link as the very first link in a page, is adhered-to","helpUrl":"https://dequeuniversity.com/courses/html-css/navigation/skip-navigation","help":"The page must have a skip link as its first link"},"tabindex":{"description":"Ensures that explicit tabindex attributes that are greater than 0 are never used","helpUrl":"https://dequeuniversity.com/courses/html-css/device-independence/keyboard-tab-order","help":"Elements must not have tabindex greater than zero"},"valid-lang":{"description":"Ensures that when the 'lang' attribute is used, it has a valid value","helpUrl":"https://dequeuniversity.com/courses/html-css/structure-and-semantics/language#id35__language_codes","help":"lang attribute must have a valid value"},"video-caption":{"description":"Ensures that the HTML5 <video> tag is captioned","helpUrl":"https://dequeuniversity.com/courses/html-css/video-audio-multimedia/","help":"HTML5 video elements need captions"},"video-description":{"description":"Ensures that every <video> tag has an audio description","helpUrl":"https://dequeuniversity.com/courses/html-css/video-audio-multimedia/","help":"HTML5 video elements need an audio description track"}},"checks":{"accesskeys":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Accesskey attribute value is unique';return out;
},"fail":function anonymous(it) {
var out='Document has multiple elements with the same accesskey';return out;
}}},"non-empty-alt":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element has a non-empty alt attribute';return out;
},"fail":function anonymous(it) {
var out='Element has no alt attribute or the alt attribute is empty';return out;
}}},"aria-label":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='aria-label attribute exists and is not empty';return out;
},"fail":function anonymous(it) {
var out='aria-label attribute does not exist or is empty';return out;
}}},"aria-labelledby":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='aria-labelledby attribute exists and references elements that are visible to screen readers';return out;
},"fail":function anonymous(it) {
var out='aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty or not visible';return out;
}}},"aria-allowed-attr":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='ARIA attributes are used correctly for the defined role';return out;
},"fail":function anonymous(it) {
var out='ARIA attribute'+(it.data && it.data.length > 1 ? 's are' : ' is')+' not allowed:';var arr1=it.data;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' '+(value);} } return out;
}}},"aria-required-attr":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='All required ARIA attributes are present';return out;
},"fail":function anonymous(it) {
var out='Required ARIA attribute'+(it.data && it.data.length > 1 ? 's' : '')+' not present:';var arr1=it.data;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' '+(value);} } return out;
}}},"aria-required-children":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Required ARIA children are present';return out;
},"fail":function anonymous(it) {
var out='Required ARIA '+(it.data && it.data.length > 1 ? 'children' : 'child')+' role not present:';var arr1=it.data;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' '+(value);} } return out;
}}},"aria-required-parent":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Required ARIA parent role present';return out;
},"fail":function anonymous(it) {
var out='Required ARIA parent'+(it.data && it.data.length > 1 ? 's' : '')+' role not present:';var arr1=it.data;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' '+(value);} } return out;
}}},"invalidrole":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='ARIA role is valid';return out;
},"fail":function anonymous(it) {
var out='Role must be one of the valid ARIA roles';return out;
}}},"abstractrole":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Abstract roles are not used';return out;
},"fail":function anonymous(it) {
var out='Abstract roles cannot be directly used';return out;
}}},"aria-valid-attr-value":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='ARIA attribute values are valid';return out;
},"fail":function anonymous(it) {
var out='Invalid ARIA attribute value'+(it.data && it.data.length > 1 ? 's' : '')+':';var arr1=it.data;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' '+(value);} } return out;
}}},"aria-valid-attr":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='ARIA attribute name'+(it.data && it.data.length > 1 ? 's' : '')+' are valid';return out;
},"fail":function anonymous(it) {
var out='Invalid ARIA attribute name'+(it.data && it.data.length > 1 ? 's' : '')+':';var arr1=it.data;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+=' '+(value);} } return out;
}}},"caption":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='The multimedia element has a captions track';return out;
},"fail":function anonymous(it) {
var out='The multimedia element does not have a captions track';return out;
}}},"exists":{"impact":"minor","messages":{"pass":function anonymous(it) {
var out='Element does not exist';return out;
},"fail":function anonymous(it) {
var out='Element exists';return out;
}}},"non-empty-if-present":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element ';if(it.data){out+='has a non-empty value attribute';}else{out+='does not have a value attribute';}return out;
},"fail":function anonymous(it) {
var out='Element has a value attribute and the value attribute is empty';return out;
}}},"non-empty-value":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element has a non-empty value attribute';return out;
},"fail":function anonymous(it) {
var out='Element has no value attribute or the value attribute is empty';return out;
}}},"button-has-visible-text":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element has inner text that is visible to screen readers';return out;
},"fail":function anonymous(it) {
var out='Element does not have inner text that is visible to screen readers';return out;
}}},"role-presentation":{"impact":"moderate","messages":{"pass":function anonymous(it) {
var out='Element\'s default semantics were overriden with role="presentation"';return out;
},"fail":function anonymous(it) {
var out='Element\'s default semantics were not overridden with role="presentation"';return out;
}}},"duplicate-img-label":{"impact":"minor","messages":{"pass":function anonymous(it) {
var out='Element does not duplicate existing text in <img> alt text';return out;
},"fail":function anonymous(it) {
var out='Element contains <img> element with alt text that duplicates existing text';return out;
}}},"focusable-no-name":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Element is not in tab order or has accessible text';return out;
},"fail":function anonymous(it) {
var out='Element is in tab order and does not have accessible text';return out;
}}},"internal-link-present":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Valid skip link found';return out;
},"fail":function anonymous(it) {
var out='No valid skip link found';return out;
}}},"header-present":{"impact":"moderate","messages":{"pass":function anonymous(it) {
var out='Page has a header';return out;
},"fail":function anonymous(it) {
var out='Page does not have a header';return out;
}}},"landmark":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Page has a landmark region';return out;
},"fail":function anonymous(it) {
var out='Page does not have a landmark region';return out;
}}},"group-labelledby":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='All elements with the name "'+(it.data.name)+'" reference the same element with aria-labelledby';return out;
},"fail":function anonymous(it) {
var out='All elements with the name "'+(it.data.name)+'" do not reference the same element with aria-labelledby';return out;
}}},"fieldset":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element is contained in a fieldset';return out;
},"fail":function anonymous(it) {
var out='';if(it.data && it.data.failureCode){if(it.data.failureCode === 'no-legend'){out+='Fieldset does not have a legend as its first child';}else if(it.data.failureCode === 'empty-legend'){out+='Legend does not have text that is visible to screen readers';}else if(it.data.failureCode === 'mixed-inputs'){out+='Fieldset contains unrelated inputs';}else if(it.data.failureCode === 'no-group-label'){out+='ARIA group does not have aria-label or aria-labelledby';}else if(it.data.failureCode === 'group-mixed-inputs'){out+='ARIA group contains unrelated inputs';}}else{out+='Element does not have a containing fieldset or ARIA group';}return out;
}}},"color-contrast":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='';if(it.data && it.data.contrastRatio){out+='Element has sufficient color contrast of '+(it.data.contrastRatio);}else{out+='Unable to determine contrast ratio';}return out;
},"fail":function anonymous(it) {
var out='Element has insufficient color contrast of '+(it.data.contrastRatio)+' (foreground color: '+(it.data.fgColor)+', background color: '+(it.data.bgColor)+', font size: '+(it.data.fontSize)+', font weight: '+(it.data.fontWeight)+')';return out;
}}},"consistent-columns":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Table has consistent column widths';return out;
},"fail":function anonymous(it) {
var out='Table does not have the same number of columns in every row';return out;
}}},"cell-no-header":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='All data cells have table headers';return out;
},"fail":function anonymous(it) {
var out='Some data cells do not have table headers';return out;
}}},"headers-visible-text":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Header cell has visible text';return out;
},"fail":function anonymous(it) {
var out='Header cell does not have visible text';return out;
}}},"headers-attr-reference":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='headers attribute references elements that are visible to screen readers';return out;
},"fail":function anonymous(it) {
var out='headers attribute references element that is not visible to screen readers';return out;
}}},"th-scope":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='<th> elements use scope attribute';return out;
},"fail":function anonymous(it) {
var out='<th> elements must use scope attribute';return out;
}}},"no-caption":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Table has a <caption>';return out;
},"fail":function anonymous(it) {
var out='Table does not have a <caption>';return out;
}}},"th-headers-attr":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='<th> elements do not use headers attribute';return out;
},"fail":function anonymous(it) {
var out='<th> elements should not use headers attribute';return out;
}}},"th-single-row-column":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='<th> elements are used when there is only a single row and single column of headers';return out;
},"fail":function anonymous(it) {
var out='<th> elements should only be used when there is a single row and single column of headers';return out;
}}},"same-caption-summary":{"impact":"moderate","messages":{"pass":function anonymous(it) {
var out='Content of summary attribute and <caption> are not duplicated';return out;
},"fail":function anonymous(it) {
var out='Content of summary attribute and <caption> element are indentical';return out;
}}},"rowspan":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Table does not have cells with rowspan attribute greater than 1';return out;
},"fail":function anonymous(it) {
var out='Table has cells whose rowspan attribute is not equal to 1';return out;
}}},"has-dlitems":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Element has both <dt> and <dd> elements';return out;
},"fail":function anonymous(it) {
var out='Element does not have at least one <dt> element followed by at least one <dd> element';return out;
}}},"only-dlitems":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Element only has children that are <dt> or <dd> elements';return out;
},"fail":function anonymous(it) {
var out='Element has children that are not <dt> or <dd> elements';return out;
}}},"dlitem":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Description list item has a <dl> parent element';return out;
},"fail":function anonymous(it) {
var out='Description list item does not have a <dl> parent element';return out;
}}},"doc-has-title":{"impact":"moderate","messages":{"pass":function anonymous(it) {
var out='Document has a non-empty <title> element';return out;
},"fail":function anonymous(it) {
var out='Document does not have a non-empty <title> element';return out;
}}},"duplicate-id":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Document has no elements that share the same id attribute';return out;
},"fail":function anonymous(it) {
var out='Document has multiple elements with the same id attribute';return out;
}}},"has-visible-text":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element has text that is visible to screen readers';return out;
},"fail":function anonymous(it) {
var out='Element does not have text that is visible to screen readers';return out;
}}},"non-empty-title":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element has a title attribute';return out;
},"fail":function anonymous(it) {
var out='Element has no title attribute or the title attribute is empty';return out;
}}},"unique-frame-title":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Element\'s title attribute is unique';return out;
},"fail":function anonymous(it) {
var out='Element\'s title attribute is not unique';return out;
}}},"heading-order":{"impact":"minor","messages":{"pass":function anonymous(it) {
var out='Heading order valid';return out;
},"fail":function anonymous(it) {
var out='Heading order invalid';return out;
}}},"has-lang":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='The <html> element has a lang attribute';return out;
},"fail":function anonymous(it) {
var out='The <html> element does not have a lang attribute';return out;
}}},"valid-lang":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Value of lang attribute is included in the list of allowable languages';return out;
},"fail":function anonymous(it) {
var out='Value of lang attribute not included in the list of allowable languages';return out;
}}},"has-alt":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Element has an alt attribute';return out;
},"fail":function anonymous(it) {
var out='Element does not have an alt attribute';return out;
}}},"title-only":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Form element does not solely use title attribute for its label';return out;
},"fail":function anonymous(it) {
var out='Only title used to generate label for form element';return out;
}}},"implicit-label":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Form element has an implicit (wrapped) <label>';return out;
},"fail":function anonymous(it) {
var out='Form element does not have an implicit (wrapped) <label>';return out;
}}},"explicit-label":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Form element has an explicit <label>';return out;
},"fail":function anonymous(it) {
var out='Form element does not have an explicit <label>';return out;
}}},"help-same-as-label":{"impact":"minor","messages":{"pass":function anonymous(it) {
var out='Help text (title or aria-describedby) does not duplicate label text';return out;
},"fail":function anonymous(it) {
var out='Help text (title or aria-describedby) text is the same as the label text';return out;
}}},"multiple-label":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Form element does not have multiple <label> elements';return out;
},"fail":function anonymous(it) {
var out='Form element has multiple <label> elements';return out;
}}},"has-th":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Layout table does not use <th> elements';return out;
},"fail":function anonymous(it) {
var out='Layout table uses <th> elements';return out;
}}},"has-caption":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Layout table does not use <caption> element';return out;
},"fail":function anonymous(it) {
var out='Layout table uses <caption> element';return out;
}}},"has-summary":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Layout table does not use summary attribute';return out;
},"fail":function anonymous(it) {
var out='Layout table uses summary attribute';return out;
}}},"has-listitem":{"impact":"minor","messages":{"pass":function anonymous(it) {
var out='List element contains a <li> element';return out;
},"fail":function anonymous(it) {
var out='List element does not contain a <li> element';return out;
}}},"only-listitems":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='List element only has children that are <li> elements';return out;
},"fail":function anonymous(it) {
var out='List element has children that are not <li> elements';return out;
}}},"listitem":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='List item has a <ul> or <ol> parent element';return out;
},"fail":function anonymous(it) {
var out='List item does not have a <ul> or <ol> parent element';return out;
}}},"meta-refresh":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='<meta> tag does not immediately refresh the page';return out;
},"fail":function anonymous(it) {
var out='<meta> tag forces timed refresh of page';return out;
}}},"meta-viewport":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='<meta> tag does not disable zooming';return out;
},"fail":function anonymous(it) {
var out='<meta> tag disables zooming';return out;
}}},"region":{"impact":"moderate","messages":{"pass":function anonymous(it) {
var out='Content contained by ARIA landmark';return out;
},"fail":function anonymous(it) {
var out='Content not contained by an ARIA landmark';return out;
}}},"html5-scope":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Scope attribute is only used on table header elements (<th>)';return out;
},"fail":function anonymous(it) {
var out='In HTML 5, scope attributes may only be used on table header elements (<th>)';return out;
}}},"html4-scope":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Scope attribute is only used on table cell elements (<th> and <td>)';return out;
},"fail":function anonymous(it) {
var out='In HTML 4, the scope attribute may only be used on table cell elements (<th> and <td>)';return out;
}}},"scope-value":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Scope attribute is used correctly';return out;
},"fail":function anonymous(it) {
var out='The value of the scope attribute may only be \'row\' or \'col\'';return out;
}}},"skip-link":{"impact":"critical","messages":{"pass":function anonymous(it) {
var out='Valid skip link found';return out;
},"fail":function anonymous(it) {
var out='No valid skip link found';return out;
}}},"tabindex":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='Element does not have a tabindex greater than 0';return out;
},"fail":function anonymous(it) {
var out='Element has a tabindex greater than 0';return out;
}}},"description":{"impact":"serious","messages":{"pass":function anonymous(it) {
var out='The multimedia element has an audio description track';return out;
},"fail":function anonymous(it) {
var out='The multimedia element does not have an audio description track';return out;
}}}},"failureSummaries":{"any":{"failureMessage":function anonymous(it) {
var out='Fix any of the following:';var arr1=it;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+='\n  '+(value.split('\n').join('\n  '));} } return out;
}},"none":{"failureMessage":function anonymous(it) {
var out='Fix all of the following:';var arr1=it;if(arr1){var value,i1=-1,l1=arr1.length-1;while(i1<l1){value=arr1[i1+=1];out+='\n  '+(value.split('\n').join('\n  '));} } return out;
}}}},"rules":[{"id":"accesskeys","selector":"[accesskey]","tags":["wcag2a","wcag211"],"all":[],"any":[],"none":[{"id":"accesskeys","evaluate":function (node, options) {
this.data(node.getAttribute('accesskey'));
this.relatedNodes([node]);
return true;

},"after":function (results, options) {
var seen = {};
return results.filter(function (r) {
  if (!seen[r.data]) {
    seen[r.data] = r;
    r.relatedNodes = [];
    return true;
  }
  seen[r.data].relatedNodes.push(r.relatedNodes[0]);
  return false;
}).map(function (r) {
  r.result = !!r.relatedNodes.length;
  return r;
});

}}]},{"id":"area-alt","selector":"map area[href]","excludeHidden":false,"tags":["wcag2a","wcag111","section508","section508a"],"all":[],"any":[{"id":"non-empty-alt","evaluate":function (node, options) {
var label = node.getAttribute('alt');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-label","evaluate":function (node, options) {
var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-labelledby","evaluate":function (node, options) {
var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element).trim()) {
		return true;
	}
}

return false;

}}],"none":[]},{"id":"aria-allowed-attr","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"aria-allowed-attr","matches":function (node) {

var role = node.getAttribute('role');
if (!role) {
	role = commons.aria.implicitRole(node);
}
var allowed = commons.aria.allowedAttr(role);
if (role && allowed) {
	var aria = /^aria-/;
	if (node.hasAttributes()) {
		var attrs = node.attributes;
		for (var i = 0, l = attrs.length; i < l; i++) {
			if (aria.test(attrs[i].nodeName)) {
				return true;
			}
		}
	}
}

return false;
},"evaluate":function (node, options) {
var invalid = [];

var attr, attrName, allowed,
	role = node.getAttribute('role'),
	attrs = node.attributes;

if (!role) {
	role = commons.aria.implicitRole(node);
}
allowed = commons.aria.allowedAttr(role);
if (role && allowed) {
	for (var i = 0, l = attrs.length; i < l; i++) {
		attr = attrs[i];
		attrName = attr.nodeName;
		if (commons.aria.validateAttr(attrName) && allowed.indexOf(attrName) === -1) {
			invalid.push(attrName + '="' + attr.nodeValue + '"');
		}
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
}}],"none":[]},{"id":"aria-required-attr","selector":"[role]","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"aria-required-attr","evaluate":function (node, options) {
var missing = [];

if (node.hasAttributes()) {
	var attr,
		role = node.getAttribute('role'),
		required = commons.aria.requiredAttr(role);

	if (role && required) {
		for (var i = 0, l = required.length; i < l; i++) {
			attr = required[i];
			if (!node.getAttribute(attr)) {
				missing.push(attr);
			}
		}
	}
}

if (missing.length) {
	this.data(missing);
	return false;
}

return true;
}}],"none":[]},{"id":"aria-required-children","selector":"[role]","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"aria-required-children","evaluate":function (node, options) {
var requiredOwned = commons.aria.requiredOwned,
implicitNodes = commons.aria.implicitNodes,
matchesSelector = commons.utils.matchesSelector,
idrefs = commons.dom.idrefs;

function owns(node, role, ariaOwned) {
	if (node === null) { return false; }
	var implicit = implicitNodes(role),
	selector = ['[role="' + role + '"]'];

	if (implicit) {
		selector = selector.concat(implicit);
	}

	selector = selector.join(',');

	return ariaOwned ? (matchesSelector(node, selector) || !!node.querySelector(selector)) :
		!!node.querySelector(selector);
}

function ariaOwns(nodes, role) {
	var index, length;

	for (index = 0, length = nodes.length; index < length; index++) {
		if (nodes[index] === null) { continue; }
		if (owns(nodes[index], role, true)) {
			return true;
		}
	}
	return false;
}

function missingRequiredChildren(node, childRoles, all) {

	var i,
	l = childRoles.length,
	missing = [],
	ownedElements = idrefs(node, 'aria-owns');

	for (i = 0; i < l; i++) {
		var r = childRoles[i];
		if (owns(node, r) || ariaOwns(ownedElements, r)) {
			if (!all) { return null; }
		} else {
			if (all) { missing.push(r); }
		}
	}

	if (missing.length) { return missing; }
	if (!all && childRoles.length) { return childRoles; }
	return null;
}

var role = node.getAttribute('role');
var required = requiredOwned(role);

if (!required) { return true; }

var all = false;
var childRoles = required.one;
if (!childRoles) {
	var all = true;
	childRoles = required.all;
}

var missing = missingRequiredChildren(node, childRoles, all);

if (!missing) { return true; }

this.data(missing);
return false;

}}],"none":[]},{"id":"aria-required-parent","selector":"[role]","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"aria-required-parent","evaluate":function (node, options) {
function getSelector(role) {
	var impliedNative = commons.aria.implicitNodes(role) || [];
	return impliedNative.concat('[role="' + role + '"]').join(',');
}

function getMissingContext(element, requiredContext, includeElement) {
	var index, length,
	role = element.getAttribute('role'),
	missing = [];

	if (!requiredContext) {
		requiredContext = commons.aria.requiredContext(role);
	}

	if (!requiredContext) { return null; }

	for (index = 0, length = requiredContext.length; index < length; index++) {
		if (includeElement && commons.utils.matchesSelector(element, getSelector(requiredContext[index]))) {
			return null;
		}
		if (commons.dom.findUp(element, getSelector(requiredContext[index]))) {
			//if one matches, it passes
			return null;
		} else {
			missing.push(requiredContext[index]);
		}
	}

	return missing;
}

function getAriaOwners(element) {
	var owners = [],
		o = null;

	while (element) {
		if (element.id) {
			o = element.ownerDocument.querySelector('[aria-owns~=' + commons.utils.escapeSelector(element.id) + ']');
			if (o) { owners.push(o); }
		}
		element = element.parentNode;
	}

	return owners.length ? owners : null;
}

var missingParents = getMissingContext(node);

if (!missingParents) { return true; }

var owners = getAriaOwners(node);

if (owners) {
	for (var i = 0, l = owners.length; i < l; i++) {
		missingParents = getMissingContext(owners[i], missingParents, true);
		if (!missingParents) { return true; }
	}
}

this.data(missingParents);
return false;

}}],"none":[]},{"id":"aria-roles","selector":"[role]","tags":["wcag2a","wcag411"],"all":[],"any":[],"none":[{"id":"invalidrole","evaluate":function (node, options) {
return !commons.aria.isValidRole(node.getAttribute('role'));



}},{"id":"abstractrole","evaluate":function (node, options) {
return commons.aria.getRoleType(node.getAttribute('role')) === 'abstract';

}}]},{"id":"aria-valid-attr-value","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"aria-valid-attr-value","matches":function (node) {
var aria = /^aria-/;
if (node.hasAttributes()) {
	var attrs = node.attributes;
	for (var i = 0, l = attrs.length; i < l; i++) {
		if (aria.test(attrs[i].nodeName)) {
			return true;
		}
	}
}

return false;
},"evaluate":function (node, options) {
options = Array.isArray(options) ? options : [];

var invalid = [],
	aria = /^aria-/;

var attr, attrName,
	attrs = node.attributes;

for (var i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i];
	attrName = attr.nodeName;
	if (options.indexOf(attrName) === -1 && aria.test(attrName) &&
		!commons.aria.validateAttrValue(node, attrName)) {

		invalid.push(attrName + '="' + attr.nodeValue + '"');
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;

},"options":[]}],"none":[]},{"id":"aria-valid-attr","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"aria-valid-attr","matches":function (node) {
var aria = /^aria-/;
if (node.hasAttributes()) {
	var attrs = node.attributes;
	for (var i = 0, l = attrs.length; i < l; i++) {
		if (aria.test(attrs[i].nodeName)) {
			return true;
		}
	}
}

return false;
},"evaluate":function (node, options) {
options = Array.isArray(options) ? options : [];

var invalid = [],
	aria = /^aria-/;

var attr,
	attrs = node.attributes;

for (var i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i].nodeName;
	if (options.indexOf(attr) === -1 && aria.test(attr) && !commons.aria.validateAttr(attr)) {
		invalid.push(attr);
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;

},"options":[]}],"none":[]},{"id":"audio-caption","selector":"audio","excludeHidden":false,"tags":["wcag2a","wcag122","section508","section508a"],"all":[],"any":[],"none":[{"id":"caption","evaluate":function (node, options) {
return !(node.querySelector('track[kind=captions]'));

}}]},{"id":"blink","selector":"blink","tags":["wcag2a","wcag411"],"all":[],"any":[],"none":[{"id":"exists","evaluate":function (node, options) {
return true;
}}]},{"id":"button-name","selector":"button, [role=\"button\"], input[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"]","tags":["wcag2a","wcag111","section508","section508a"],"all":[],"any":[{"id":"non-empty-if-present","evaluate":function (node, options) {
var label = node.getAttribute('value');
this.data(label);
return label === null || commons.text.sanitize(label).trim() !== '';

},"selector":"[type=\"submit\"], [type=\"reset\"]"},{"id":"non-empty-value","evaluate":function (node, options) {
var label = node.getAttribute('value');
return !!(label ? commons.text.sanitize(label).trim() : '');

},"selector":"[type=\"button\"]"},{"id":"button-has-visible-text","evaluate":function (node, options) {
return commons.text.accessibleText(node).length > 0;

},"selector":"button, [role=\"button\"]:not(input)"},{"id":"aria-label","evaluate":function (node, options) {
var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-labelledby","evaluate":function (node, options) {
var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element).trim()) {
		return true;
	}
}

return false;

}},{"id":"role-presentation","evaluate":function (node, options) {
return node.getAttribute('role') === 'presentation';
}}],"none":[{"id":"duplicate-img-label","evaluate":function (node, options) {
var imgs = node.querySelectorAll('img');
var text = commons.text.visible(node, true);

for (var i = 0, len = imgs.length; i < len; i++) {
	var imgAlt = commons.text.accessibleText(imgs[i]);
	if (imgAlt === text && text !== '') { return true; }
}

return false;

},"enabled":false},{"id":"focusable-no-name","evaluate":function (node, options) {
var tabIndex = node.getAttribute('tabindex'),
	isFocusable = commons.dom.isFocusable(node) && tabIndex > -1;
if (!isFocusable) {
	return false;
}
return !commons.text.accessibleText(node);

}}]},{"id":"bypass","selector":"html","pageLevel":true,"matches":function (node) {
return !!node.querySelector('a[href]');

},"tags":["wcag2a","wcag241","section508","section508o"],"all":[],"any":[{"id":"internal-link-present","selector":"html","evaluate":function (node, options) {
return !!node.querySelector('a[href^="#"]');

}},{"id":"header-present","selector":"html","evaluate":function (node, options) {
return !!node.querySelector('h1, h2, h3, h4, h5, h6, [role="heading"]');

}},{"id":"landmark","selector":"html","evaluate":function (node, options) {
return !!node.querySelector('[role="main"]');

}}],"none":[]},{"id":"checkboxgroup","selector":"input[type=checkbox][name]","tags":["wcag2a","wcag131"],"all":[],"any":[{"id":"group-labelledby","evaluate":function (node, options) {
this.data({
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
});

var matchingNodes = node.ownerDocument.querySelectorAll('input[type="' +
	commons.utils.escapeSelector(node.type) + '"][name="' + commons.utils.escapeSelector(node.name) + '"]');
if (matchingNodes.length <= 1) {
	return true;
}

// Check to see if there's an aria-labelledby value that all nodes have in common
return [].map.call(matchingNodes, function (m) {
	var l = m.getAttribute('aria-labelledby');
	return l ? l.split(/\s+/) : [];
}).reduce(function (prev, curr) {
	return prev.filter(function (n) {
		return curr.indexOf(n) !== -1;
	});
}).filter(function (n) {
	var labelNode = node.ownerDocument.getElementById(n);
	return labelNode && commons.text.accessibleText(labelNode);
}).length !== 0;

},"after":function (results, options) {
var seen = {};

return results.filter(function (result) {
	var data = result.data;
	if (data) {
		seen[data.type] = seen[data.type] || {};
		if (!seen[data.type][data.name]) {
			seen[data.type][data.name] = true;
			return true;
		}
	}
	return false;
});
}},{"id":"fieldset","evaluate":function (node, options) {
var failureCode,
	self = this;


function getUnrelatedElements(parent, name) {
	return commons.utils.toArray(parent.querySelectorAll('select,textarea,button,input:not([name="' + name +
		'"]):not([type="hidden"])'));
}

function checkFieldset(group, name) {

	var firstNode = group.firstElementChild;
	if (!firstNode || firstNode.nodeName !== 'LEGEND') {
		self.relatedNodes([group]);
		failureCode = 'no-legend';
		return false;
	}
	if (!commons.text.accessibleText(firstNode)) {
		self.relatedNodes([firstNode]);
		failureCode = 'empty-legend';
		return false;
	}
	var otherElements = getUnrelatedElements(group, name);
	if (otherElements.length) {
		self.relatedNodes(otherElements);
		failureCode = 'mixed-inputs';
		return false;
	}
	return true;
}

function checkARIAGroup(group, name) {

	var hasLabelledByText = commons.dom.idrefs(group, 'aria-labelledby').some(function (element) {
		return element && commons.text.accessibleText(element);
	});
	var ariaLabel = group.getAttribute('aria-label');
	if (!hasLabelledByText && !(ariaLabel && commons.text.sanitize(ariaLabel))) {
		self.relatedNodes(group);
		failureCode = 'no-group-label';
		return false;
	}

	var otherElements = getUnrelatedElements(group, name);
	if (otherElements.length) {
		self.relatedNodes(otherElements);
		failureCode = 'group-mixed-inputs';
		return false;
	}
	return true;
}

function spliceCurrentNode(nodes, current) {
	return commons.utils.toArray(nodes).filter(function (candidate) {
		return candidate !== current;
	});
}

function runCheck(element) {
	var name = commons.utils.escapeSelector(node.name);
	var matchingNodes = node.ownerDocument.querySelectorAll('input[type="' +
		commons.utils.escapeSelector(node.type) + '"][name="' + name + '"]');
	if (matchingNodes.length < 2) {
		return true;
	}
	var fieldset = commons.dom.findUp(element, 'fieldset');
	var group = commons.dom.findUp(element, '[role="group"]' + (node.type === 'radio' ? ',[role="radiogroup"]' : ''));
	if (!group && !fieldset) {
		failureCode = 'no-group';
		self.relatedNodes(spliceCurrentNode(matchingNodes, element));
		return false;
	}
	return fieldset ? checkFieldset(fieldset, name) : checkARIAGroup(group, name);

}

var data = {
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
};

var result = runCheck(node);
if (!result) {
	data.failureCode = failureCode;
}
this.data(data);

return result;

},"after":function (results, options) {
var seen = {};

return results.filter(function (result) {
	// passes can pass through
	if (result.result) {
		return true;
	}
	var data = result.data;
	if (data) {
		seen[data.type] = seen[data.type] || {};
		if (!seen[data.type][data.name]) {
			seen[data.type][data.name] = [data];
			return true;
		}
		var hasBeenSeen = seen[data.type][data.name].some(function (candidate) {
			return candidate.failureCode === data.failureCode;
		});
		if (!hasBeenSeen) {
			seen[data.type][data.name].push(data);
		}

		return !hasBeenSeen;

	}
	return false;
});

}}],"none":[]},{"id":"color-contrast","selector":"*","tags":["wcag2aa","wcag143"],"all":[],"any":[{"id":"color-contrast","matches":function (node) {
var nodeName = node.nodeName,
	nodeType = node.type;

if (nodeName === 'INPUT') {
	return ['hidden', 'range', 'color', 'checkbox', 'radio', 'image'].indexOf(nodeType) === -1 && !node.disabled;
}

if (nodeName === 'SELECT') {
	return !!node.options.length && !node.disabled;
}

if (nodeName === 'TEXTAREA') {
	return !node.disabled;
}

if (nodeName === 'OPTION') {
	return false;
}

if (nodeName === 'BUTTON' && node.disabled) {
	return false;
}

if (commons.text.visible(node, false, true) === '') {
	return false;
}

var range = node.ownerDocument.createRange(),
	childNodes = node.childNodes,
	length = childNodes.length,
	child, index;

for (index = 0; index < length; index++) {
	child = childNodes[index];

	if (child.nodeType === 3 && commons.text.sanitize(child.nodeValue) !== '') {
		range.selectNodeContents(child);
	}
}

var rects = range.getClientRects();
length = rects.length;

for (index = 0; index < length; index++) {
	//check to see if the rectangle impinges
	if (commons.dom.visuallyOverlaps(rects[index], node)) {
		return true;
	}
}

return false;

},"evaluate":function (node, options) {
var bgNodes = [],
	bgColor = commons.color.getBackgroundColor(node, bgNodes),
	fgColor = commons.color.getForegroundColor(node);

//We don't know, so we'll pass it provisionally
if (fgColor === null || bgColor === null) {
	return true;
}

var dv = node.ownerDocument.defaultView,
	nodeStyle = dv.getComputedStyle(node);
var fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
var fontWeight = nodeStyle.getPropertyValue('font-weight');
var bold = (['bold', 'bolder', '600', '700', '800', '900'].indexOf(fontWeight) !== -1);

var cr = commons.color.hasValidContrastRatio(bgColor, fgColor, fontSize, bold);

this.data({
	fgColor: fgColor.toHexString(),
	bgColor: bgColor.toHexString(),
	contrastRatio: cr.contrastRatio.toFixed(2),
	fontSize: (fontSize * 72 / 96).toFixed(1) + 'pt',
	fontWeight: bold ? 'bold' : 'normal',
});

if (!cr.isValid) {
	this.relatedNodes(bgNodes);
}
return cr.isValid;

}}],"none":[]},{"id":"data-table","selector":"table","matches":function (node) {
return commons.table.isDataTable(node);
},"tags":["wcag2a","wcag131"],"all":[],"any":[{"id":"consistent-columns","evaluate":function (node, options) {
var table = commons.table.toArray(node);
var relatedNodes = [];
var expectedWidth;
for (var i = 0, length = table.length; i < length; i++) {
	if (i === 0) {
		expectedWidth = table[i].length;
	} else if (expectedWidth !== table[i].length) {
		relatedNodes.push(node.rows[i]);
	}
}

return !relatedNodes.length;

}}],"none":[{"id":"cell-no-header","evaluate":function (node, options) {


var row, cell,
	badCells = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (commons.table.isDataCell(cell) && (!commons.aria.label(cell) && !commons.table.getHeaders(cell).length)) {
			badCells.push(cell);
		}
	}
}

if (badCells.length) {
	this.relatedNodes(badCells);
	return true;
}

return false;

}},{"id":"headers-visible-text","evaluate":function (node, options) {

var row, cell,
	badHeaders = [];
for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (commons.table.isHeader(cell) && !commons.text.accessibleText(cell)) {
			badHeaders.push(cell);
		}
	}
}

if (badHeaders.length) {
	this.relatedNodes(badHeaders);
	return true;
}

return false;

}},{"id":"headers-attr-reference","evaluate":function (node, options) {
var row, cell, headerCells,
	badHeaders = [];

function checkHeader(header) {
	if (!header || !commons.text.accessibleText(header)) {
		badHeaders.push(cell);
	}
}

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		headerCells = commons.dom.idrefs(cell, 'headers');
		if (headerCells.length) {
			headerCells.forEach(checkHeader);
		}
	}
}

if (badHeaders.length) {
	this.relatedNodes(badHeaders);
	return true;
}

return false;

}},{"id":"th-scope","evaluate":function (node, options) {

var row, cell,
	noScopeTH = [];
for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeName === 'TH' && !cell.getAttribute('scope')) {
			noScopeTH.push(cell);
		}
	}
}

if (noScopeTH.length) {
	this.relatedNodes(noScopeTH);
	return true;
}

return false;
}},{"id":"no-caption","evaluate":function (node, options) {
return !(node.caption || {}).textContent;
},"enabled":false},{"id":"th-headers-attr","evaluate":function (node, options) {

var row, cell,
	headersTH = [];
for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeName === 'TH' && cell.getAttribute('headers')) {
			headersTH.push(cell);
		}
	}
}

if (headersTH.length) {
	this.relatedNodes(headersTH);
	return true;
}

return false;
}},{"id":"th-single-row-column","evaluate":function (node, options) {

var row, cell, position,
	rowHeaders = [],
	columnHeaders = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeName) {
			if (commons.table.isColumnHeader(cell) && columnHeaders.indexOf(rowIndex) === -1) {
				columnHeaders.push(rowIndex);
			} else if (commons.table.isRowHeader(cell)) {
				position = commons.table.getCellPosition(cell);
				if (rowHeaders.indexOf(position.x) === -1) {
					rowHeaders.push(position.x);
				}
			}
		}
	}
}

if (columnHeaders.length > 1 || rowHeaders.length > 1) {
	return true;
}

return false;
}},{"id":"same-caption-summary","selector":"table","evaluate":function (node, options) {
return !!(node.summary && node.caption) && node.summary === commons.text.accessibleText(node.caption);

}},{"id":"rowspan","evaluate":function (node, options) {
var row, cell,
	badCells = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.rowSpan !== 1) {
			badCells.push(cell);
		}
	}
}

if (badCells.length) {
	this.relatedNodes(badCells);
	return true;
}

return false;
}}]},{"id":"definition-list","selector":"dl","tags":["wcag2a","wcag131"],"all":[],"any":[],"none":[{"id":"has-dlitems","evaluate":function (node, options) {
var children = node.children;
if (children.length === 0) { return true; }

var hasDt = false;
for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName === 'DT') { hasDt = true; }
	if (hasDt && children[i].nodeName === 'DD') { return false; }
}

return true;

}},{"id":"only-dlitems","evaluate":function (node, options) {
var child,
	bad = [],
	children = node.childNodes,
	hasNonEmptyTextNode = false;

for (var i = 0; i < children.length; i++) {
	child = children[i];
	if (child.nodeType === 1 && (child.nodeName !== 'DT' && child.nodeName !== 'DD')) {
		bad.push(child);
	} else if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
}
if (bad.length) {
	this.relatedNodes(bad);
}

return !!bad.length || hasNonEmptyTextNode;

}}]},{"id":"dlitem","selector":"dd, dt","tags":["wcag2a","wcag131"],"all":[],"any":[{"id":"dlitem","evaluate":function (node, options) {
return node.parentNode.tagName === 'DL';


}}],"none":[]},{"id":"document-title","selector":"html","tags":["wcag2a","wcag242"],"all":[],"any":[{"id":"doc-has-title","evaluate":function (node, options) {
var title = node.ownerDocument.title;
return !!(title ? commons.text.sanitize(title).trim() : '');
}}],"none":[]},{"id":"duplicate-id","selector":"[id]","tags":["wcag2a","wcag411"],"all":[],"any":[{"id":"duplicate-id","evaluate":function (node, options) {
var matchingNodes = node.ownerDocument.querySelectorAll('[id="' + commons.utils.escapeSelector(node.id) + '"]');
var related = [];
for (var i = 0; i < matchingNodes.length; i++) {
	if (matchingNodes[i] !== node) {
		related.push(matchingNodes[i]);
	}
}
if (related.length) {
	this.relatedNodes(related);
}
this.data(node.getAttribute('id'));

return (matchingNodes.length <= 1);

},"after":function (results, options) {
var uniqueIds = [];
return results.filter(function (r) {
	if (uniqueIds.indexOf(r.data) === -1) {
		uniqueIds.push(r.data);
		return true;
	}
	return false;
});

}}],"none":[]},{"id":"empty-heading","selector":"h1, h2, h3, h4, h5, h6, [role=\"heading\"]","tags":["wcag2a","wcag131"],"all":[],"any":[{"id":"has-visible-text","evaluate":function (node, options) {
return commons.text.accessibleText(node).length > 0;

}}],"none":[]},{"id":"frame-title","selector":"frame, iframe","tags":["wcag2a","wcag241"],"all":[],"any":[{"id":"non-empty-title","evaluate":function (node, options) {
var title = node.getAttribute('title');
return !!(title ? commons.text.sanitize(title).trim() : '');

}}],"none":[{"id":"unique-frame-title","evaluate":function (node, options) {
this.data(node.title);
return true;
},"after":function (results, options) {
var titles = {};
results.forEach(function (r) {
	titles[r.data] = titles[r.data] !== undefined ? ++titles[r.data] : 0;
});

return results.filter(function (r) {
	return !!titles[r.data];
});
}}]},{"id":"heading-order","selector":"h1,h2,h3,h4,h5,h6,[role=heading]","enabled":false,"tags":["best-practice"],"all":[],"any":[{"id":"heading-order","evaluate":function (node, options) {
var ariaHeadingLevel = node.getAttribute('aria-level');

if (ariaHeadingLevel !== null) {
	this.data(parseInt(ariaHeadingLevel, 10));
	return true;
}

var headingLevel = node.tagName.match(/H(\d)/);

if (headingLevel) {
	this.data(parseInt(headingLevel[1], 10));
	return true;
}

return true;

},"after":function (results, options) {
if (results.length < 2) { return results; }

var prevLevel = results[0].data;

for (var i = 1; i < results.length; i++) {
	if (results[i].result && results[i].data > (prevLevel + 1)) { results[i].result = false; }
	prevLevel = results[i].data;
}

return results;

}}],"none":[]},{"id":"html-lang","selector":"html","tags":["wcag2a","wcag311"],"all":[],"any":[{"id":"has-lang","evaluate":function (node, options) {
return node.hasAttribute('lang') || node.hasAttribute('xml:lang');
}}],"none":[{"id":"valid-lang","options":["en","es","ja"],"evaluate":function (node, options) {
var lang = (node.getAttribute('lang') || '').trim().toLowerCase();
var xmlLang = (node.getAttribute('xml:lang') || '').trim().toLowerCase();
var invalid = [];

(options || []).forEach(function (cc) {
	cc = cc.toLowerCase();
	if (lang && (lang === cc || lang.indexOf(cc.toLowerCase() + '-') === 0)) {
		lang = null;
	}
	if (xmlLang && (xmlLang === cc || xmlLang.indexOf(cc.toLowerCase() + '-') === 0)) {
		xmlLang = null;
	}
});

if (xmlLang) {
	invalid.push('xml:lang="' + xmlLang + '"');
}
if (lang) {
	invalid.push('lang="' + lang + '"');
}

if (invalid.length) {
	this.data(invalid);
	return true;
}

return false;
}}]},{"id":"image-alt","selector":"img","tags":["wcag2a","wcag111","section508","section508a"],"all":[],"any":[{"id":"has-alt","evaluate":function (node, options) {
return node.hasAttribute('alt');
}},{"id":"aria-label","evaluate":function (node, options) {
var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-labelledby","evaluate":function (node, options) {
var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element).trim()) {
		return true;
	}
}

return false;

}},{"id":"non-empty-title","evaluate":function (node, options) {
var title = node.getAttribute('title');
return !!(title ? commons.text.sanitize(title).trim() : '');

}}],"none":[]},{"id":"input-image-alt","selector":"input[type=\"image\"]","tags":["wcag2a","wcag111","section508","section508a"],"all":[],"any":[{"id":"non-empty-alt","evaluate":function (node, options) {
var label = node.getAttribute('alt');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-label","evaluate":function (node, options) {
var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-labelledby","evaluate":function (node, options) {
var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element).trim()) {
		return true;
	}
}

return false;

}}],"none":[]},{"id":"label-title-only","selector":"input:not([type='hidden']):not([type='image']):not([type='button']):not([type='submit']):not([type='reset']), select, textarea","enabled":false,"tags":["best-practice"],"all":[],"any":[],"none":[{"id":"title-only","evaluate":function (node, options) {
var labelText = commons.text.label(node);
return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));
}}]},{"id":"label","selector":"input:not([type='hidden']):not([type='image']):not([type='button']):not([type='submit']):not([type='reset']), select, textarea","tags":["wcag2a","wcag332","wcag131","section508","section508n"],"all":[],"any":[{"id":"aria-label","evaluate":function (node, options) {
var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-labelledby","evaluate":function (node, options) {
var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element).trim()) {
		return true;
	}
}

return false;

}},{"id":"implicit-label","evaluate":function (node, options) {

var label = commons.dom.findUp(node, 'label');
if (label) {
	return !!commons.text.accessibleText(label);
}
return false;

}},{"id":"explicit-label","evaluate":function (node, options) {

var label = node.ownerDocument.querySelector('label[for="' + commons.utils.escapeSelector(node.id) + '"]');
if (label) {
	return !!commons.text.accessibleText(label);
}
return false;

},"selector":"[id]"},{"id":"non-empty-title","evaluate":function (node, options) {
var title = node.getAttribute('title');
return !!(title ? commons.text.sanitize(title).trim() : '');

}}],"none":[{"id":"help-same-as-label","evaluate":function (node, options) {

var labelText = commons.text.label(node),
	check = node.getAttribute('title');

if (!labelText) {
	return false;
}

if (!check) {
	check = '';

	if (node.getAttribute('aria-describedby')) {
		var ref = commons.dom.idrefs(node, 'aria-describedby');
		check = ref.map(function (thing) {
			return thing ? commons.text.accessibleText(thing) : '';
		}).join('');
	}
}

return commons.text.sanitize(check) === commons.text.sanitize(labelText);

},"enabled":false},{"id":"multiple-label","evaluate":function (node, options) {
var labels = [].slice.call(node.ownerDocument.querySelectorAll('label[for="' +
	commons.utils.escapeSelector(node.id) + '"]')),
	parent = node.parentNode;

while (parent) {
	if (parent.tagName === 'LABEL' && labels.indexOf(parent) === -1) {
		labels.push(parent);
	}
	parent = parent.parentNode;
}

this.relatedNodes(labels);
return labels.length > 1;

}}]},{"id":"layout-table","selector":"table","matches":function (node) {
return !commons.table.isDataTable(node);
},"tags":["wcag2a","wcag131"],"all":[],"any":[],"none":[{"id":"has-th","evaluate":function (node, options) {

var row, cell,
	badCells = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeName === 'TH') {
			badCells.push(cell);
		}
	}
}

if (badCells.length) {
	this.relatedNodes(badCells);
	return true;
}

return false;
}},{"id":"has-caption","evaluate":function (node, options) {
return !!node.caption;
}},{"id":"has-summary","evaluate":function (node, options) {
return !!node.summary;
}}]},{"id":"link-name","selector":"a[href]:not([role=\"button\"]), [role=link][href]","tags":["wcag2a","wcag111","wcag412","section508","section508a"],"all":[],"any":[{"id":"has-visible-text","evaluate":function (node, options) {
return commons.text.accessibleText(node).length > 0;

}},{"id":"aria-label","evaluate":function (node, options) {
var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
}},{"id":"aria-labelledby","evaluate":function (node, options) {
var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element).trim()) {
		return true;
	}
}

return false;

}},{"id":"role-presentation","evaluate":function (node, options) {
return node.getAttribute('role') === 'presentation';
}}],"none":[{"id":"duplicate-img-label","evaluate":function (node, options) {
var imgs = node.querySelectorAll('img');
var text = commons.text.visible(node, true);

for (var i = 0, len = imgs.length; i < len; i++) {
	var imgAlt = commons.text.accessibleText(imgs[i]);
	if (imgAlt === text && text !== '') { return true; }
}

return false;

},"enabled":false},{"id":"focusable-no-name","evaluate":function (node, options) {
var tabIndex = node.getAttribute('tabindex'),
	isFocusable = commons.dom.isFocusable(node) && tabIndex > -1;
if (!isFocusable) {
	return false;
}
return !commons.text.accessibleText(node);

}}]},{"id":"list","selector":"ul, ol","tags":["wcag2a","wcag131"],"all":[],"any":[],"none":[{"id":"has-listitem","evaluate":function (node, options) {
var children = node.children;
if (children.length === 0) { return true; }

for (var i = 0; i < children.length; i++) {
	if (children[i].nodeName === 'LI') { return false; }
}

return true;


}},{"id":"only-listitems","evaluate":function (node, options) {
var child,
	bad = [],
	children = node.childNodes,
	hasNonEmptyTextNode = false;

for (var i = 0; i < children.length; i++) {
	child = children[i];
	if (child.nodeType === 1 && child.nodeName !== 'LI') {
		bad.push(child);
	} else if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
}
if (bad.length) {
	this.relatedNodes(bad);
}

return !!bad.length || hasNonEmptyTextNode;

}}]},{"id":"listitem","selector":"li","tags":["wcag2a","wcag131"],"all":[],"any":[{"id":"listitem","evaluate":function (node, options) {
return ['UL', 'OL'].indexOf(node.parentNode.tagName) !== -1;


}}],"none":[]},{"id":"marquee","selector":"marquee","tags":["wcag2a","wcag222","section508","section508j"],"all":[],"any":[],"none":[{"id":"exists","evaluate":function (node, options) {
return true;
}}]},{"id":"meta-refresh","selector":"meta[http-equiv=\"refresh\"]","excludeHidden":false,"tags":["wcag2a","wcag2aaa","wcag221","wcag224","wcag325"],"all":[],"any":[{"id":"meta-refresh","evaluate":function (node, options) {
var content = node.getAttribute('content') || '',
	parsedParams = content.split(/[;,]/);

return (content === '' || parsedParams[0] === '0');

}}],"none":[]},{"id":"meta-viewport","selector":"meta[name=\"viewport\"]","excludeHidden":false,"tags":["wcag2aa","wcag144"],"all":[],"any":[{"id":"meta-viewport","evaluate":function (node, options) {
var params,
	content = node.getAttribute('content') || '',
	parsedParams = content.split(/[;,]/),
	result = {};

for (var i = 0, l = parsedParams.length; i < l; i++) {
	params = parsedParams[i].split('=');
	var key = params.shift();
	if (key && params.length) {
		result[key.trim()] = params.join('=').trim();
	}
}

if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < 5) {
	return false;
}

if (result['user-scalable'] === 'no') {
	return false;
}


return true;
}}],"none":[]},{"id":"object-alt","selector":"object","tags":["wcag2a","wcag111"],"all":[],"any":[{"id":"has-visible-text","evaluate":function (node, options) {
return commons.text.accessibleText(node).length > 0;

}}],"none":[]},{"id":"radiogroup","selector":"input[type=radio][name]","tags":["wcag2a","wcag131"],"all":[],"any":[{"id":"group-labelledby","evaluate":function (node, options) {
this.data({
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
});

var matchingNodes = node.ownerDocument.querySelectorAll('input[type="' +
	commons.utils.escapeSelector(node.type) + '"][name="' + commons.utils.escapeSelector(node.name) + '"]');
if (matchingNodes.length <= 1) {
	return true;
}

// Check to see if there's an aria-labelledby value that all nodes have in common
return [].map.call(matchingNodes, function (m) {
	var l = m.getAttribute('aria-labelledby');
	return l ? l.split(/\s+/) : [];
}).reduce(function (prev, curr) {
	return prev.filter(function (n) {
		return curr.indexOf(n) !== -1;
	});
}).filter(function (n) {
	var labelNode = node.ownerDocument.getElementById(n);
	return labelNode && commons.text.accessibleText(labelNode);
}).length !== 0;

},"after":function (results, options) {
var seen = {};

return results.filter(function (result) {
	var data = result.data;
	if (data) {
		seen[data.type] = seen[data.type] || {};
		if (!seen[data.type][data.name]) {
			seen[data.type][data.name] = true;
			return true;
		}
	}
	return false;
});
}},{"id":"fieldset","evaluate":function (node, options) {
var failureCode,
	self = this;


function getUnrelatedElements(parent, name) {
	return commons.utils.toArray(parent.querySelectorAll('select,textarea,button,input:not([name="' + name +
		'"]):not([type="hidden"])'));
}

function checkFieldset(group, name) {

	var firstNode = group.firstElementChild;
	if (!firstNode || firstNode.nodeName !== 'LEGEND') {
		self.relatedNodes([group]);
		failureCode = 'no-legend';
		return false;
	}
	if (!commons.text.accessibleText(firstNode)) {
		self.relatedNodes([firstNode]);
		failureCode = 'empty-legend';
		return false;
	}
	var otherElements = getUnrelatedElements(group, name);
	if (otherElements.length) {
		self.relatedNodes(otherElements);
		failureCode = 'mixed-inputs';
		return false;
	}
	return true;
}

function checkARIAGroup(group, name) {

	var hasLabelledByText = commons.dom.idrefs(group, 'aria-labelledby').some(function (element) {
		return element && commons.text.accessibleText(element);
	});
	var ariaLabel = group.getAttribute('aria-label');
	if (!hasLabelledByText && !(ariaLabel && commons.text.sanitize(ariaLabel))) {
		self.relatedNodes(group);
		failureCode = 'no-group-label';
		return false;
	}

	var otherElements = getUnrelatedElements(group, name);
	if (otherElements.length) {
		self.relatedNodes(otherElements);
		failureCode = 'group-mixed-inputs';
		return false;
	}
	return true;
}

function spliceCurrentNode(nodes, current) {
	return commons.utils.toArray(nodes).filter(function (candidate) {
		return candidate !== current;
	});
}

function runCheck(element) {
	var name = commons.utils.escapeSelector(node.name);
	var matchingNodes = node.ownerDocument.querySelectorAll('input[type="' +
		commons.utils.escapeSelector(node.type) + '"][name="' + name + '"]');
	if (matchingNodes.length < 2) {
		return true;
	}
	var fieldset = commons.dom.findUp(element, 'fieldset');
	var group = commons.dom.findUp(element, '[role="group"]' + (node.type === 'radio' ? ',[role="radiogroup"]' : ''));
	if (!group && !fieldset) {
		failureCode = 'no-group';
		self.relatedNodes(spliceCurrentNode(matchingNodes, element));
		return false;
	}
	return fieldset ? checkFieldset(fieldset, name) : checkARIAGroup(group, name);

}

var data = {
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
};

var result = runCheck(node);
if (!result) {
	data.failureCode = failureCode;
}
this.data(data);

return result;

},"after":function (results, options) {
var seen = {};

return results.filter(function (result) {
	// passes can pass through
	if (result.result) {
		return true;
	}
	var data = result.data;
	if (data) {
		seen[data.type] = seen[data.type] || {};
		if (!seen[data.type][data.name]) {
			seen[data.type][data.name] = [data];
			return true;
		}
		var hasBeenSeen = seen[data.type][data.name].some(function (candidate) {
			return candidate.failureCode === data.failureCode;
		});
		if (!hasBeenSeen) {
			seen[data.type][data.name].push(data);
		}

		return !hasBeenSeen;

	}
	return false;
});

}}],"none":[]},{"id":"region","selector":"html","pageLevel":true,"enabled":false,"tags":["best-practice"],"all":[],"any":[{"id":"region","evaluate":function (node, options) {
//jshint latedef: false

var landmarkRoles = commons.aria.getRolesByType('landmark'),
	firstLink = node.querySelector('a[href]');

function isSkipLink(n) {
	return firstLink &&
		commons.dom.isFocusable(commons.dom.getElementByReference(firstLink, 'href')) &&
		firstLink === n;
}

function isLandmark(n) {
	var role = n.getAttribute('role');
	return role && (landmarkRoles.indexOf(role) !== -1);
}

function checkRegion(n) {
	if (isLandmark(n)) { return null; }
	if (isSkipLink(n)) { return getViolatingChildren(n); }
	if (commons.dom.isVisible(n, true) &&
		(commons.text.visible(n, true, true) || commons.dom.isVisualContent(n))) { return n; }
	return getViolatingChildren(n);
}
function getViolatingChildren(n) {
	var children =  commons.utils.toArray(n.children);
	if (children.length === 0) { return []; }
	return children.map(checkRegion)
		.filter(function (c) { return c !== null; })
		.reduce(function (a, b) { return a.concat(b); }, []);
}

var v = getViolatingChildren(node);
this.relatedNodes(v);
return !v.length;

},"after":function (results, options) {
return [results[0]];

}}],"none":[]},{"id":"scope","selector":"[scope]","tags":["wcag2a","wcag411","wcag131"],"all":[],"any":[{"id":"html5-scope","evaluate":function (node, options) {

if (!commons.dom.isHTML5(node.ownerDocument)) {
	return false;
}

return node.nodeName === 'TH';
}},{"id":"html4-scope","evaluate":function (node, options) {

if (commons.dom.isHTML5(node.ownerDocument)) {
	return false;
}

return node.nodeName === 'TH' || node.nodeName === 'TD';
}}],"none":[{"id":"scope-value","evaluate":function (node, options) {
var value = node.getAttribute('scope');
return value !== 'row' && value !== 'col';
}}]},{"id":"server-side-image-map","selector":"img[ismap]","tags":["wcag2a","wcag211","section508","section508f"],"all":[],"any":[],"none":[{"id":"exists","evaluate":function (node, options) {
return true;
}}]},{"id":"skip-link","selector":"a[href]","pageLevel":true,"enabled":false,"tags":["best-practice"],"all":[],"any":[{"id":"skip-link","selector":"a[href]","evaluate":function (node, options) {
return commons.dom.isFocusable(commons.dom.getElementByReference(node, 'href'));

},"after":function (results, options) {
return [results[0]];

}}],"none":[]},{"id":"tabindex","selector":"[tabindex]","tags":["wcag2a","wcag243"],"all":[],"any":[{"id":"tabindex","evaluate":function (node, options) {
return node.tabIndex <= 0;


}}],"none":[]},{"id":"valid-lang","selector":"[lang]:not(html), [xml\\:lang]:not(html)","tags":["wcag2aa","wcag312"],"all":[],"any":[],"none":[{"id":"valid-lang","options":["en","es","ja"],"evaluate":function (node, options) {
var lang = (node.getAttribute('lang') || '').trim().toLowerCase();
var xmlLang = (node.getAttribute('xml:lang') || '').trim().toLowerCase();
var invalid = [];

(options || []).forEach(function (cc) {
	cc = cc.toLowerCase();
	if (lang && (lang === cc || lang.indexOf(cc.toLowerCase() + '-') === 0)) {
		lang = null;
	}
	if (xmlLang && (xmlLang === cc || xmlLang.indexOf(cc.toLowerCase() + '-') === 0)) {
		xmlLang = null;
	}
});

if (xmlLang) {
	invalid.push('xml:lang="' + xmlLang + '"');
}
if (lang) {
	invalid.push('lang="' + lang + '"');
}

if (invalid.length) {
	this.data(invalid);
	return true;
}

return false;
}}]},{"id":"video-caption","selector":"video","tags":["wcag2a","wcag122","wcag123","section508","section508a"],"all":[],"any":[],"none":[{"id":"caption","evaluate":function (node, options) {
return !(node.querySelector('track[kind=captions]'));

}}]},{"id":"video-description","selector":"video","tags":["wcag2aa","wcag125","section508","section508a"],"all":[],"any":[],"none":[{"id":"description","evaluate":function (node, options) {
return !(node.querySelector('track[kind=descriptions]'));

}}]}],"commons":(function () {

var commons = {};
commons.version = 'dev';

/*exported clone */

/**
 * Deeply clones an object or array
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed}     A clone of the initial object or array
 */
function clone(obj) {
	'use strict';
	var index, length,
		out = obj;

	if (obj !== null && typeof obj === 'object') {
		if (Array.isArray(obj)) {
			out = [];
			for (index = 0, length = obj.length; index < length; index++) {
				out[index] = clone(obj[index]);
			}
		} else {
			out = {};
			// jshint forin: false
			for (index in obj) {
				out[index] = clone(obj[index]);
			}
		}
	}
	return out;
}
/*exported matchesSelector */
/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
var matchesSelector = (function () {
	'use strict';

	var method;

	function getMethod(win) {

		var index, candidate,
			elProto = win.Element.prototype,
			candidates = ['matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector'],
			length = candidates.length;

		for (index = 0; index < length; index++) {
			candidate = candidates[index];
			if (elProto[candidate]) {
				return candidate;
			}
		}
	}


	return function (node, selector) {

		if (!method || !node[method]) {
			method = getMethod(node.ownerDocument.defaultView);
		}

		return node[method](selector);
	};
}());
/*exported escapeSelector */
/**
 * Escapes a property value of a CSS selector
 * @see https://github.com/mathiasbynens/CSS.escape/
 * @see http://dev.w3.org/csswg/cssom/#serialize-an-identifier
 * @param  {String} value The piece of the selector to escape
 * @return {String}        The escaped selector
 */
var escapeSelector = function (value) {
	'use strict';
	/*jshint bitwise: true, eqeqeq: false, maxcomplexity: 14, maxstatements: 23, onevar: false, -W041: false */
	var string = String(value);
	var length = string.length;
	var index = -1;
	var codeUnit;
	var result = '';
	var firstCodeUnit = string.charCodeAt(0);
	while (++index < length) {
		codeUnit = string.charCodeAt(index);
		// Note: there’s no need to special-case astral symbols, surrogate
		// pairs, or lone surrogates.

		// If the character is NULL (U+0000), then throw an
		// `InvalidCharacterError` exception and terminate these steps.
		if (codeUnit == 0x0000) {
			throw new Error('INVALID_CHARACTER_ERR');
		}

		if (
			// If the character is in the range [\1-\1F] (U+0001 to U+001F) or
			// [\7F-\9F] (U+007F to U+009F), […]
			(codeUnit >= 0x0001 && codeUnit <= 0x001F) ||
			(codeUnit >= 0x007F && codeUnit <= 0x009F) ||
			// If the character is the first character and is in the range [0-9]
			// (U+0030 to U+0039), […]
			(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
			// If the character is the second character and is in the range [0-9]
			// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
			(index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D)
		) {
			// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
			result += '\\' + codeUnit.toString(16) + ' ';
			continue;
		}

		// If the character is the second character and is `-` (U+002D) and the
		// first character is `-` as well, […]
		if (index == 1 && codeUnit == 0x002D && firstCodeUnit == 0x002D) {
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);
			continue;
		}

		// If the character is not handled by one of the above rules and is
		// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
		// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
		// U+005A), or [a-z] (U+0061 to U+007A), […]
		if (
			codeUnit >= 0x0080 ||
			codeUnit == 0x002D ||
			codeUnit == 0x005F ||
			codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
			codeUnit >= 0x0041 && codeUnit <= 0x005A ||
			codeUnit >= 0x0061 && codeUnit <= 0x007A
		) {
			// the character itself
			result += string.charAt(index);
			continue;
		}

		// Otherwise, the escaped character.
		// http://dev.w3.org/csswg/cssom/#escape-a-character
		result += '\\' + string.charAt(index);

	}
	return result;
};
var aria = commons.aria = {},
	lookupTables = aria._lut = {};

lookupTables.attributes = {
	'aria-activedescendant': {
		type: 'http://www.w3.org/2001/XMLSchema#idref'
	},
	'aria-atomic': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-autocomplete': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['inline', 'list', 'both', 'none']
	},
	'aria-busy': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-checked': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'mixed', 'undefined']
	},
	'aria-controls': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-describedby': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-disabled': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-dropeffect': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtokens',
		values: ['copy', 'move', 'reference', 'execute', 'popup', 'none']
	},
	'aria-expanded': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-flowto': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-grabbed': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-haspopup': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-hidden': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-invalid': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'spelling', 'grammar']
	},
	'aria-label': {
		type: 'http://www.w3.org/2001/XMLSchema#string'
	},
	'aria-labelledby': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-level': {
		type: 'http://www.w3.org/2001/XMLSchema#int'
	},
	'aria-live': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['off', 'polite', 'assertive']
	},
	'aria-multiline': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-multiselectable': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-orientation' : {
		type : 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values : ['horizontal', 'vertical']
	},
	'aria-owns': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-posinset': {
		type: 'http://www.w3.org/2001/XMLSchema#int'
	},
	'aria-pressed': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'mixed', 'undefined']
	},
	'aria-readonly': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-relevant': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtokens',
		values: ['additions', 'removals', 'text', 'all']
	},
	'aria-required': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-selected': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-setsize': {
		type: 'http://www.w3.org/2001/XMLSchema#int'
	},
	'aria-sort': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['ascending', 'descending', 'other', 'none']
	},
	'aria-valuemax': {
		type: 'http://www.w3.org/2001/XMLSchema#decimal'
	},
	'aria-valuemin': {
		type: 'http://www.w3.org/2001/XMLSchema#decimal'
	},
	'aria-valuenow': {
		type: 'http://www.w3.org/2001/XMLSchema#decimal'
	},
	'aria-valuetext': {
		type: 'http://www.w3.org/2001/XMLSchema#string'
	}
};

lookupTables.globalAttributes = [
	'aria-atomic', 'aria-busy', 'aria-controls', 'aria-describedby',
	'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed',
	'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-label',
	'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant'
];

lookupTables.role = {
	'alert': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'alertdialog': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'application': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'article': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['article']
	},
	'banner': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'button': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['button', 'input[type="button"]', 'input[type="image"]']
	},
	'checkbox': {
		type: 'widget',
		attributes:  {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="checkbox"]']
	},
	'columnheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-sort', 'aria-readonly', 'aria-selected', 'aria-required']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row']
	},
	'combobox': {
		type: 'composite',
		attributes:  {
			required: ['aria-expanded'],
			allowed: ['aria-autocomplete', 'aria-required', 'aria-activedescendant']
		},
		owned: {
			all: ['listbox', 'textbox']
		},
		nameFrom: ['author'],
		context: null
	},
	'command': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'complementary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['aside']
	},
	'composite': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'contentinfo': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'definition': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'dialog': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dialog']
	},
	'directory': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'document': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['body']
	},
	'form': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'grid': {
		type: 'composite',
		attributes: {
			allowed: ['aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null
	},
	'gridcell': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-readonly', 'aria-expanded', 'aria-required']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row']
	},
	'group': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['details']
	},
	'heading': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	},
	'img': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['img']
	},
	'input': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'landmark': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'link': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['a[href]']
	},
	'list': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: {
			all: ['listitem']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['ol', 'ul']
	},
	'listbox': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['option']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['select']
	},
	'listitem': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['list'],
		implicit: ['li']
	},
	'log': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'main': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'marquee': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'math': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'menu': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['menuitem', 'menuitemradio', 'menuitemcheckbox']
		},
		nameFrom: ['author'],
		context: null
	},
	'menubar': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'menuitem': {
		type: 'widget',
		attributes: null,
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar']
	},
	'menuitemcheckbox': {
		type: 'widget',
		attributes: {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar']
	},
	'menuitemradio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar']
	},
	'navigation': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'note': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'option': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize', 'aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['listbox']
	},
	'presentation': {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'progressbar': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'radio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="radio"]']
	},
	'radiogroup': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['radio']
		},
		nameFrom: ['author'],
		context: null
	},
	'range': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'region': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['section']
	},
	'roletype': {
		type: 'abstract'
	},
	'row': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-selected', 'aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['columnheader', 'rowheader', 'gridcell']
		},
		nameFrom: ['author', 'contents'],
		context:  ['rowgroup', 'grid', 'treegrid']
	},
	'rowgroup': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			all: ['row']
		},
		nameFrom: ['author', 'contents'],
		context:  ['grid']
	},
	'rowheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-sort', 'aria-required', 'aria-readonly', 'aria-expanded', 'aria-selected']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row']
	},
	'scrollbar': {
		type: 'widget',
		attributes: {
			required: ['aria-controls', 'aria-orientation', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin'],
			allowed: ['aria-valuetext']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'search': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'section': {
		nameFrom: ['author', 'contents'],
		type: 'abstract'
	},
	'sectionhead': {
		nameFrom: ['author', 'contents'],
		type: 'abstract'
	},
	'select': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'separator': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-orientation']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'slider': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-orientation'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'spinbutton': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-required'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'status': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['output']
	},
	'structure': {
		type: 'abstract'
	},
	'tab': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['tablist']
	},
	'tablist': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable']
		},
		owned: {
			all: ['tab']
		},
		nameFrom: ['author'],
		context: null
	},
	'tabpanel': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'textbox': {
		type: 'widget',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="text"]', 'input:not([type])']
	},
	'timer': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'toolbar': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="toolbar"]']
	},
	'tooltip': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'tree': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['treeitem']
		},
		nameFrom: ['author'],
		context: null
	},
	'treegrid': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable',
				'aria-readonly', 'aria-required']
		},
		owned: {
			all: ['treeitem']
		},
		nameFrom: ['author'],
		context: null
	},
	'treeitem': {
		type: 'widget',
		attributes: {
			allowed: ['aria-checked', 'aria-selected', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['treegrid', 'tree']
	},
	'widget': {
		type: 'abstract'
	},
	'window': {
		nameFrom: ['author'],
		type: 'abstract'
	}
};

var color = {};
commons.color = color;

/*exported dom */
var dom = commons.dom = {};

/*exported table */
var table = commons.table = {};

/*exported text */
var text = commons.text = {};
/*exported utils */
/*global escapeSelector, matchesSelector, clone */
var utils = commons.utils = {};

utils.escapeSelector = escapeSelector;
utils.matchesSelector = matchesSelector;
utils.clone = clone;
/*global aria, utils, lookupTables */

/**
 * Get required attributes for a given role
 * @param  {String} role The role to check
 * @return {Array}
 */
aria.requiredAttr = function (role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
};

/**
 * Get allowed attributes for a given role
 * @param  {String} role The role to check
 * @return {Array}
 */
aria.allowedAttr = function (role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = (roles && roles.attributes && roles.attributes.allowed) || [],
		requiredAttr = (roles && roles.attributes && roles.attributes.required) || [];
	return attr.concat(lookupTables.globalAttributes).concat(requiredAttr);
};

/**
 * Check if an aria- attribute name is valid
 * @param  {String} att The attribute name
 * @return {Boolean}
 */
aria.validateAttr = function (att) {
	'use strict';
	return !!lookupTables.attributes[att];
};

/**
 * Validate the value of an ARIA attribute
 * @param  {HTMLElement} node The element to check
 * @param  {String} attr The name of the attribute
 * @return {Boolean}
 */
aria.validateAttrValue = function (node, attr) {
	//jshint maxcomplexity: 12
	'use strict';
	var ids, index, length, matches,
		doc = node.ownerDocument,
		value = node.getAttribute(attr),
		attrInfo = lookupTables.attributes[attr];

	if (!attrInfo) {
		return true;

	} else if (attrInfo.values) {
		if (typeof value === 'string' && attrInfo.values.indexOf(value.toLowerCase()) !== -1) {
			return true;
		}
		return false;
	}

	switch (attrInfo.type) {
	case 'http://www.w3.org/2001/XMLSchema#idref':
		return !!(value && doc.getElementById(value));

	case 'http://www.w3.org/2001/XMLSchema#idrefs':
		ids = utils.tokenList(value);
		for (index = 0, length = ids.length; index < length; index++) {
			if (ids[index] && !doc.getElementById(ids[index])) {
				return false;
			}
		}
		// not valid if there are no elements
		return !!ids.length;

	case 'http://www.w3.org/2001/XMLSchema#string':
		// anything goes
		return true;

	case 'http://www.w3.org/2001/XMLSchema#decimal':
		matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
		return !!(matches && (matches[1] || matches[2]));

	case 'http://www.w3.org/2001/XMLSchema#int':
		return (/^[-+]?[0-9]+$/).test(value);
	}
};

/*global aria, dom, text */
/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {HTMLElement} node The element to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
aria.label = function (node) {
	var ref, candidate;

	if (node.getAttribute('aria-labelledby')) {
		// aria-labelledby
		ref = dom.idrefs(node, 'aria-labelledby');
		candidate = ref.map(function (thing) {
			return thing ? text.visible(thing, true) : '';
		}).join(' ').trim();

		if (candidate) {
			return candidate;
		}
	}

	// aria-label
	candidate = node.getAttribute('aria-label');
	if (candidate) {
		candidate = text.sanitize(candidate).trim();
		if (candidate) {
			return candidate;
		}
	}

	return null;
};

/*global aria, lookupTables, utils */

/**
 * Check if a given role is valid
 * @param  {String}  role The role to check
 * @return {Boolean}
 */
aria.isValidRole = function (role) {
	'use strict';
	if (lookupTables.role[role]) {
		return true;
	}

	return false;
};

/**
 * Get the roles that get name from contents
 * @return {Array}           Array of roles that match the type
 */
aria.getRolesWithNameFromContents = function () {
	return Object.keys(lookupTables.role).filter(function (r) {
		return lookupTables.role[r].nameFrom &&
			lookupTables.role[r].nameFrom.indexOf('contents') !== -1;
	});
};

/**
 * Get the roles that have a certain "type"
 * @param  {String} roleType The roletype to check
 * @return {Array}           Array of roles that match the type
 */
aria.getRolesByType = function (roleType) {
	return Object.keys(lookupTables.role).filter(function (r) {
		return lookupTables.role[r].type === roleType;
	});
};

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @param  {String} role The role to check
 * @return {Mixed}       String if a matching role and its type are found, otherwise `null`
 */
aria.getRoleType = function (role) {
	var r = lookupTables.role[role];

	return (r && r.type) || null;
};

/**
 * Get the required owned (children) roles for a given role
 * @param  {String} role The role to check
 * @return {Mixed}       Either an Array of required owned elements or `null` if there are none
 */
aria.requiredOwned = function (role) {
	'use strict';
	var owned = null,
		roles = lookupTables.role[role];

	if (roles) {
		owned = utils.clone(roles.owned);
	}
	return owned;
};

/**
 * Get the required context (parent) roles for a given role
 * @param  {String} role The role to check
 * @return {Mixed}       Either an Array of required context elements or `null` if there are none
 */
aria.requiredContext = function (role) {
	'use strict';
	var context = null,
		roles = lookupTables.role[role];

	if (roles) {
		context = utils.clone(roles.context);
	}
	return context;
};

/**
 * Get a list of CSS selectors of nodes that have an implicit role
 * @param  {String} role The role to check
 * @return {Mixed}       Either an Array of CSS selectors or `null` if there are none
 */
aria.implicitNodes = function (role) {
	'use strict';

	var implicit = null,
		roles = lookupTables.role[role];

	if (roles && roles.implicit) {
		implicit = utils.clone(roles.implicit);
	}
	return implicit;
};

/**
 * Get the implicit role for a given node
 * @param  {HTMLElement} node The node to test
 * @return {Mixed}      Either the role or `null` if there is none
 */
aria.implicitRole = function (node) {
	'use strict';

	var role, r, candidate,
		roles = lookupTables.role;

	for (role in roles) {
		if (roles.hasOwnProperty(role)) {
			r = roles[role];
			if (r.implicit) {
				for (var index = 0, length = r.implicit.length; index < length; index++) {
					candidate = r.implicit[index];
					if (utils.matchesSelector(node, candidate)) {
						return role;
					}
				}
			}
		}
	}

	return null;
};

/*global color */

/**
 * @constructor
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
color.Color = function (red, green, blue, alpha) {
	/** @type {number} */
	this.red = red;

	/** @type {number} */
	this.green = green;

	/** @type {number} */
	this.blue = blue;

	/** @type {number} */
	this.alpha = alpha;

	/**
	 * Provide the hex string value for the color
	 * @return {string}
	 */
	this.toHexString = function () {
		var redString = Math.round(this.red).toString(16);
		var greenString = Math.round(this.green).toString(16);
		var blueString = Math.round(this.blue).toString(16);
		return '#' + (this.red > 15.5 ? redString : '0' + redString) +
			(this.green > 15.5 ? greenString : '0' + greenString) +
			(this.blue > 15.5 ? blueString : '0' + blueString);
	};
	
	var rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;
	var rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/;

	/** 
	 * Set the color value based on a CSS RGB/RGBA string
	 * @param  {string}  rgb  The string value
	 */
	this.parseRgbString = function (colorString) {
		var match = colorString.match(rgbRegex);

		if (match) {
			this.red = parseInt(match[1], 10);
			this.green = parseInt(match[2], 10);
			this.blue = parseInt(match[3], 10);
			this.alpha = 1;
			return;
		}

		match = colorString.match(rgbaRegex);
		if (match) {
			this.red = parseInt(match[1], 10);
			this.green = parseInt(match[2], 10);
			this.blue = parseInt(match[3], 10);
			this.alpha = parseFloat(match[4]);
			return;
		}
	};

	/**
	 * Get the relative luminance value
	 * using algorithm from http://www.w3.org/WAI/GL/wiki/Relative_luminance
	 * @return {number} The luminance value, ranges from 0 to 1
	 */
	this.getRelativeLuminance = function () {
		var rSRGB = this.red / 255;
		var gSRGB = this.green / 255;
		var bSRGB = this.blue / 255;

		var r = rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow(((rSRGB + 0.055) / 1.055), 2.4);
		var g = gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow(((gSRGB + 0.055) / 1.055), 2.4);
		var b = bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow(((bSRGB + 0.055) / 1.055), 2.4);

		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
};

/**
 * Combine the two given color according to alpha blending.
 * @param {Color} fgColor
 * @param {Color} bgColor
 * @return {Color}
 */
color.flattenColors = function (fgColor, bgColor) {
	var alpha = fgColor.alpha;
	var r = ((1 - alpha) * bgColor.red) + (alpha * fgColor.red);
	var g  = ((1 - alpha) * bgColor.green) + (alpha * fgColor.green);
	var b = ((1 - alpha) * bgColor.blue) + (alpha * fgColor.blue);
	var a = fgColor.alpha + (bgColor.alpha * (1 - fgColor.alpha));

	return new color.Color(r, g, b, a);
};

/**
 * Get the contrast of two colors
 * @param  {Color}  bgcolor  Background color
 * @param  {Color}  fgcolor  Foreground color
 * @return {number} The contrast ratio
 */
color.getContrast = function (bgColor, fgColor) {
	if (!fgColor || !bgColor) { return null; }

	if (fgColor.alpha < 1) {
		fgColor = color.flattenColors(fgColor, bgColor);
	}

	var bL = bgColor.getRelativeLuminance();
	var fL = fgColor.getRelativeLuminance();

	return (Math.max(fL, bL) + 0.05) / (Math.min(fL, bL) + 0.05);
};

/**
 * Check whether certain text properties meet WCAG contrast rules
 * @param  {Color}  bgcolor  Background color
 * @param  {Color}  fgcolor  Foreground color
 * @param  {number}  fontSize  Font size of text, in pixels
 * @param  {boolean}  isBold  Whether the text is bold
 * @return {{isValid: boolean, contrastRatio: number}} 
 */
color.hasValidContrastRatio = function (bg, fg, fontSize, isBold) {
	var contrast = color.getContrast(bg, fg);
	var isSmallFont = (isBold && (Math.ceil(fontSize * 72) / 96) < 14) || (!isBold && (Math.ceil(fontSize * 72) / 96) < 18);

	return {
		isValid: (isSmallFont && contrast >= 4.5) || (!isSmallFont && contrast >= 3),
		contrastRatio: contrast
	};

};

/*global dom, color */
/* jshint maxstatements: 29, maxcomplexity: 13 */

/**
 * Returns the non-alpha-blended background color of a node, null if it's an image
 * @param {Element} node
 * @return {Color}
 */
var getBackgroundForSingleNode = function (node) {
	var bgColor,
		dv = node.ownerDocument.defaultView,
		nodeStyle = dv.getComputedStyle(node);

	if (nodeStyle.getPropertyValue('background-image') !== 'none') {
		return null;
	}

	var bgColorString = nodeStyle.getPropertyValue('background-color');
	//Firefox exposes unspecified background as 'transparent' rather than rgba(0,0,0,0)
	if (bgColorString === 'transparent') {
		bgColor = new color.Color(0, 0, 0, 0);
	} else {
		bgColor = new color.Color();
		bgColor.parseRgbString(bgColorString);
	}
	var opacity = nodeStyle.getPropertyValue('opacity');
	bgColor.alpha = bgColor.alpha * opacity;

	return bgColor;
};

/**
 * Determines whether an element has a fully opaque background, whether solid color or an image
 * @param {Element} node
 * @return {Boolean} false if the background is transparent, true otherwise
 */
dom.isOpaque = function (node) {
	var bgColor = getBackgroundForSingleNode(node);
	if (bgColor === null || bgColor.alpha === 1) { return true; }
	return false;
};

/**
 * Returns the elements that are visually "above" this one in z-index order where
 * supported at the position given inside the top-left corner of the provided
 * rectangle. Where not supported (IE < 10), returns the DOM parents.
 * @param {Element} node
 * @param {DOMRect} rect rectangle containing dimensions to consider
 * @return {Array} array of elements
 */
var getVisualParents = function (node, rect) {
	var visualParents,
		thisIndex,
		parents = [],
		fallbackToVisual = false,
		dv = node.ownerDocument.defaultView,
		currentNode = node,
		nodeStyle = dv.getComputedStyle(currentNode),
		posVal, topVal, bottomVal, leftVal, rightVal;

	while (currentNode !== null && (!dom.isOpaque(currentNode) || parseInt(nodeStyle.getPropertyValue('height'), 10) === 0)) {
		posVal = nodeStyle.getPropertyValue('position');
		topVal = nodeStyle.getPropertyValue('top');
		bottomVal = nodeStyle.getPropertyValue('bottom');
		leftVal = nodeStyle.getPropertyValue('left');
		rightVal = nodeStyle.getPropertyValue('right');
		if ((posVal !== 'static' && posVal !== 'relative') ||
			(posVal === 'relative' &&
			(leftVal !== 'auto' ||
			rightVal !== 'auto' ||
			topVal !== 'auto' ||
			bottomVal !== 'auto'))) {
			fallbackToVisual = true;
		}
		currentNode = currentNode.parentElement;
		if (currentNode !== null) {
			nodeStyle = dv.getComputedStyle(currentNode);
			if (parseInt(nodeStyle.getPropertyValue('height'), 10) !==0) { parents.push(currentNode); }
		}
	}

	if (fallbackToVisual && dom.supportsElementsFromPoint(node.ownerDocument)) {
		visualParents = dom.elementsFromPoint(node.ownerDocument,
									Math.ceil(rect.left + 1),
									Math.ceil(rect.top + 1));
		if (visualParents && (thisIndex = visualParents.indexOf(node)) < visualParents.length - 1) {
			parents = visualParents.slice(thisIndex + 1);
		}
	}

	return parents;
};


/**
 * Returns the flattened background color of an element, or null if it can't be determined because
 * there is no opaque ancestor element visually containing it, or because background images are used.
 * @param {Element} node
 * @param {Array} bgNodes array to which all encountered nodes should be appended
 * @return {Color}
 */
color.getBackgroundColor = function (node, bgNodes) {
	var parent, parentColor;

	var bgColor = getBackgroundForSingleNode(node);
	if (bgNodes && (bgColor === null || bgColor.alpha !== 0)) { bgNodes.push(node); }
	if (bgColor === null || bgColor.alpha === 1) { return bgColor; }

	node.scrollIntoView();
	var rect = node.getBoundingClientRect(),
		currentNode = node,
		colorStack = [{color: bgColor, node: node}],
		parents = getVisualParents(currentNode, rect);

	while (bgColor.alpha !== 1) {
		parent = parents.shift();


		if (!parent && currentNode.tagName !== 'HTML') {
			return null;
		}

		//Assume white if top level is not specified
		if (!parent && currentNode.tagName === 'HTML') {
			parentColor = new color.Color(255, 255, 255, 1);
		} else {

			if (!dom.visuallyContains(node, parent)) { return null; }

			parentColor = getBackgroundForSingleNode(parent);
			if (bgNodes && (parentColor === null || parentColor.alpha !== 0)) { bgNodes.push(parent); }
			if (parentColor === null) { return null; }
		}
		currentNode = parent;
		bgColor = parentColor;
		colorStack.push({color: bgColor, node: currentNode });
	}

	var currColorNode = colorStack.pop();
	var flattenedColor = currColorNode.color;

	while ((currColorNode = colorStack.pop()) !== undefined) {
		flattenedColor = color.flattenColors(currColorNode.color, flattenedColor);
	}
	return flattenedColor;
};

/*global color */

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @param {Element} node
 * @return {Color}
 */
color.getForegroundColor = function (node) {
	var dv = node.ownerDocument.defaultView,
		nodeStyle = dv.getComputedStyle(node);

	var fgColor = new color.Color();
	fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
	var opacity = nodeStyle.getPropertyValue('opacity');
	fgColor.alpha = fgColor.alpha * opacity;
	if (fgColor.alpha === 1) { return fgColor; }

	var bgColor = color.getBackgroundColor(node);
	if (bgColor === null) { return null; }

	return color.flattenColors(fgColor, bgColor);
};

/*global dom, utils */
/**
 * recusively walk up the DOM, checking for a node which matches a selector
 *
 * **WARNING:** this should be used sparingly, as it's not even close to being performant
 *
 * @param {HTMLElement|String} element The starting HTMLElement
 * @param {String} selector The selector for the HTMLElement
 * @return {HTMLElement|null} Either the matching HTMLElement or `null` if there was no match
 */
dom.findUp = function (element, target) {
	'use strict';
	/*jslint browser:true*/

	var parent,
		doc = element.ownerDocument,
		matches = doc.querySelectorAll(target),
		length = matches.length;

	if (!length) {
		return null;
	}

	matches = utils.toArray(matches);

	parent = element.parentNode;
	// recrusively walk up the DOM, checking each parent node
	while (parent && matches.indexOf(parent) === -1) {
		parent = parent.parentNode;
	}

	return parent;
};
/*global dom */

dom.getElementByReference = function (node, attr) {
	'use strict';

	var candidate,
		fragment = node.getAttribute(attr),
		doc = node.ownerDocument;

	if (fragment && fragment.charAt(0) === '#') {
		fragment = fragment.substring(1);

		candidate = doc.getElementById(fragment);
		if (candidate) {
			return candidate;
		}

		candidate = doc.getElementsByName(fragment);
		if (candidate.length) {
			return candidate[0];
		}

	}

	return null;
};
/*global dom */
/**
 * Get the coordinates of the element passed into the function relative to the document
 *
 * #### Returns
 *
 * Returns a `Object` with the following properties, which
 * each hold a value representing the pixels for each of the
 * respective coordinates:
 *
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 * - `width`
 * - `height`
 *
 * @param {HTMLElement} el The HTMLElement
 */
dom.getElementCoordinates = function (element) {
	'use strict';

	var doc = element.ownerDocument,
		scrollOffset = dom.getScrollOffset(doc),
		xOffset = scrollOffset.left,
		yOffset = scrollOffset.top,
		coords = element.getBoundingClientRect();

	return {
		top: coords.top + yOffset,
		right: coords.right + xOffset,
		bottom: coords.bottom + yOffset,
		left: coords.left + xOffset,

		width: coords.right - coords.left,
		height: coords.bottom - coords.top
	};
};
/* global dom */

/**
 * Returns true if the browser supports one of the methods to get elements from point
 * @param {Document} doc The HTML document 
 * @return {Boolean}
 */
dom.supportsElementsFromPoint = function (doc) {
	var element = doc.createElement('x');
	element.style.cssText = 'pointer-events:auto';
	return element.style.pointerEvents === 'auto' || !!doc.msElementsFromPoint;
};


/**
 * Returns the elements at a particular point in the viewport, in z-index order
 * @param {Document} doc The HTML document 
 * @param {Element} x The x coordinate, as an integer
 * @param {Element} y The y coordinate, as an integer
 * @return {Array} Array of Elements
 */
dom.elementsFromPoint = function (doc, x, y) {
	var elements = [], previousPointerEvents = [], current, i, d;

	if (doc.msElementsFromPoint) {
		var nl = doc.msElementsFromPoint(x, y);
		return nl ? Array.prototype.slice.call(nl) : null;
	}

	// get all elements via elementFromPoint, and remove them from hit-testing in order
	while ((current = doc.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null) {

		// push the element and its current style
		elements.push(current);

		previousPointerEvents.push({
			value: current.style.getPropertyValue('pointer-events'),
			priority: current.style.getPropertyPriority('pointer-events')
		});

		// add "pointer-events: none", to get to the underlying element
		current.style.setProperty('pointer-events', 'none', 'important');

		if (dom.isOpaque(current)) { break; }
	}

	// restore the previous pointer-events values
	for (i = previousPointerEvents.length; !!(d = previousPointerEvents[--i]);) {
		elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
	}

	// return our results
	return elements;
};

/*global dom */
/**
 * Get the scroll offset of the document passed in
 *
 * @param {Document} element The element to evaluate, defaults to document
 * @return {Object} Contains the attributes `x` and `y` which contain the scroll offsets
 */
dom.getScrollOffset = function (element) {
	'use strict';

	if (!element.nodeType && element.document) {
		element = element.document;
	}

	// 9 === Node.DOCUMENT_NODE
	if (element.nodeType === 9) {
		var docElement = element.documentElement,
			body = element.body;

		return {
			left: (docElement && docElement.scrollLeft || body && body.scrollLeft || 0),
			top: (docElement && docElement.scrollTop || body && body.scrollTop || 0)
		};
	}

	return {
		left: element.scrollLeft,
		top: element.scrollTop
	};
};
/*global dom */
/**
 * Gets the width and height of the viewport; used to calculate the right and bottom boundaries of the viewable area.
 *
 * @api private
 * @param  {Object}  window The `window` object that should be measured
 * @return {Object}  Object with the `width` and `height` of the viewport
 */
dom.getViewportSize = function (win) {
	'use strict';

	var body,
		doc = win.document,
		docElement = doc.documentElement;

	if (win.innerWidth) {
		return {
			width: win.innerWidth,
			height: win.innerHeight
		};
	}

	if (docElement) {
		return {
			width: docElement.clientWidth,
			height: docElement.clientHeight
		};

	}

	body = doc.body;

	return {
		width: body.clientWidth,
		height: body.clientHeight
	};
};
/*global dom, utils */

/**
 * Get elements referenced via a space-separated token attribute; it will insert `null` for any Element that is not found
 * @param  {HTMLElement} node
 * @param  {String} attr The name of attribute
 * @return {Array}      Array of elements (or `null` if not found)
 */
dom.idrefs = function (node, attr) {
	'use strict';

	var index, length,
		doc = node.ownerDocument,
		result = [],
		idrefs = node.getAttribute(attr);

	if (idrefs) {
		idrefs = utils.tokenList(idrefs);
		for (index = 0, length = idrefs.length; index < length; index++) {
			result.push(doc.getElementById(idrefs[index]));
		}
	}

	return result;
};
/*global dom */
/* jshint maxcomplexity: 20 */
/**
 * Determines if an element is focusable
 * @param {HTMLelement} element The HTMLelement
 * @return {Boolean} The element's focusability status
 */

dom.isFocusable = function (el) {
	'use strict';

	if (!el ||
		el.disabled ||
		(!dom.isVisible(el) && el.nodeName !== 'AREA')) {
		return false;
	}

	switch (el.nodeName) {
		case 'A':
		case 'AREA':
			if (el.href) {
				return true;
			}
			break;
		case 'INPUT':
			return el.type !== 'hidden';
		case 'TEXTAREA':
		case 'SELECT':
		case 'DETAILS':
		case 'BUTTON':
			return true;
	}

	// check if the tabindex is specified and a parseable number
	var tabindex = el.getAttribute('tabindex');
	if (tabindex && !isNaN(parseInt(tabindex, 10))) {
		return true;
	}

	return false;
};

/*global dom */
dom.isHTML5 = function (doc) {
	var node = doc.doctype;
	if (node === null) {
		return false;
	}
	return node.name === 'html' && !node.publicId && !node.systemId;
};
/*global dom */
dom.isNode = function (candidate) {
	'use strict';
	var doc = (candidate && candidate.ownerDocument) || candidate,
		win = doc && doc.defaultView;

	return !!win && candidate instanceof win.Node;
};
/*global dom */

dom.isOffscreen = function (element) {
	'use strict';

	var leftBoundary,
		doc = element.ownerDocument,
		win = doc.defaultView,
		docElement = doc.documentElement,
		dir = win.getComputedStyle(doc.body || docElement)
			.getPropertyValue('direction'),
		coords = dom.getElementCoordinates(element);

	// bottom edge beyond
	if (coords.bottom < 0) {
		return true;
	}

	if (dir === 'ltr') {
		if (coords.right < 0) {
			return true;
		}
	} else {

		leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(win).width);
		if (coords.left > leftBoundary) {
			return true;
		}
	}

	return false;

};
/*global dom */
/*jshint maxcomplexity: 11 */

/**
 * Determines if an element is hidden with the clip rect technique
 * @param  {String}  clip Computed property value of clip
 * @return {Boolean}
 */
function isClipped(clip) {
	'use strict';

	var matches = clip.match(/rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/);
	if (matches && matches.length === 5) {
		return matches[3] - matches[1] <= 0 && matches[2] - matches[4] <= 0;
	}

	return false;

}

/**
 * Determine whether an element is visible
 *
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @return {Boolean} The element's visibilty status
 */
dom.isVisible = function (el, screenReader, recursed) {
	'use strict';
	var style,
		nodeName = el.nodeName,
		parent = el.parentNode;

	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return true;
	}

	style = el.ownerDocument.defaultView.getComputedStyle(el, null);
	if (style === null) {
		return false;
	}

	if (style.getPropertyValue('display') === 'none' ||

		nodeName === 'STYLE' || nodeName === 'SCRIPT' ||

		(!screenReader && (isClipped(style.getPropertyValue('clip')))) ||

		(!recursed &&
			// visibility is only accurate on the first element
			(style.getPropertyValue('visibility') === 'hidden' ||
			// position does not matter if it was already calculated
			!screenReader && dom.isOffscreen(el))) ||

		(screenReader && el.getAttribute('aria-hidden') === 'true')) {

		return false;
	}

	if (parent) {
		return dom.isVisible(parent, screenReader, true);
	}

	return false;

};
/*global dom */
/*jshint maxcomplexity: 20 */

/**
 * Check if an element is an inherently visual element
 * @param  {object}  candidate The node to check
 * @return {Boolean}
 */
dom.isVisualContent = function (candidate) {
	'use strict';
	switch (candidate.tagName.toUpperCase()) {
		case 'IMG':
		case 'IFRAME':
		case 'OBJECT':
		case 'VIDEO':
		case 'AUDIO':
		case 'CANVAS':
		case 'SVG':
		case 'MATH':
		case 'BUTTON':
		case 'SELECT':
		case 'TEXTAREA':
		case 'KEYGEN':
		case 'PROGRESS':
		case 'METER':
			return true;
		case 'INPUT':
			return candidate.type !== 'hidden';
		default:
			return false;
	}

};

/* global dom */
/* jshint maxcomplexity: 11 */

/**
 * Checks whether a parent element visually contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
dom.visuallyContains = function (node, parent) {
	var rect = node.getBoundingClientRect();
	var parentRect = parent.getBoundingClientRect();
	var parentTop = parentRect.top;
	var parentLeft = parentRect.left;
	var parentScrollArea = {
		top: parentTop - parent.scrollTop,
		bottom: parentTop - parent.scrollTop + parent.scrollHeight,
		left: parentLeft - parent.scrollLeft,
		right: parentLeft - parent.scrollLeft + parent.scrollWidth
	};

	//In theory, we should just be able to look at the scroll area as a superset of the parentRect,
	//but that's not true in Firefox
	if ((rect.left < parentScrollArea.left && rect.left < parentRect.left) ||
		(rect.top < parentScrollArea.top && rect.top < parentRect.top) ||
		(rect.right > parentScrollArea.right && rect.right > parentRect.right) ||
		(rect.bottom > parentScrollArea.bottom && rect.bottom > parentRect.bottom)) {
		return false;
	}

	var defaultView = node.ownerDocument.defaultView;
	var style = defaultView.getComputedStyle(parent);

	if (rect.right > parentRect.right || rect.bottom > parentRect.bottom) {
		return (style.overflow === 'scroll' || style.overflow === 'auto' ||
				style.overflow === 'hidden' || parent instanceof defaultView.HTMLBodyElement ||
				parent instanceof defaultView.HTMLHtmlElement);
	}

	return true;
};


/* global dom */
/* jshint maxcomplexity: 11 */

/**
 * Checks whether a parent element visually overlaps a rectangle, either directly or via scrolling.
 * @param {DOMRect} rect
 * @param {Element} parent
 * @return {boolean} True if rect is visually contained within parent
 */
dom.visuallyOverlaps = function (rect, parent) {
	var parentRect = parent.getBoundingClientRect();
	var parentTop = parentRect.top;
	var parentLeft = parentRect.left;
	var parentScrollArea = {
		top: parentTop - parent.scrollTop,
		bottom: parentTop - parent.scrollTop + parent.scrollHeight,
		left: parentLeft - parent.scrollLeft,
		right: parentLeft - parent.scrollLeft + parent.scrollWidth
	};

	//In theory, we should just be able to look at the scroll area as a superset of the parentRect,
	//but that's not true in Firefox
	if ((rect.left > parentScrollArea.right && rect.left > parentRect.right) ||
		(rect.top > parentScrollArea.bottom && rect.top > parentRect.bottom) ||
		(rect.right < parentScrollArea.left && rect.right < parentRect.left) ||
		(rect.bottom < parentScrollArea.top && rect.bottom < parentRect.top)) {
		return false;
	}

	var defaultView = parent.ownerDocument.defaultView;
	var style = defaultView.getComputedStyle(parent);

	if (rect.left > parentRect.right || rect.top > parentRect.bottom) {
		return (style.overflow === 'scroll' || style.overflow === 'auto' ||
				parent instanceof defaultView.HTMLBodyElement ||
				parent instanceof defaultView.HTMLHtmlElement);
	}

	return true;
};


/*global table, dom */

/**
 * Get the x, y coordinates of a table cell; normalized for rowspan and colspan
 * @param  {HTMLTableCelLElement} cell The table cell of which to get the position
 * @return {Object}      Object with `x` and `y` properties of the coordinates
 */
table.getCellPosition = function (cell) {

	var tbl = table.toArray(dom.findUp(cell, 'table')),
		index;

	for (var rowIndex = 0; rowIndex < tbl.length; rowIndex++) {
		if (tbl[rowIndex]) {
			index = tbl[rowIndex].indexOf(cell);
			if (index !== -1) {
				return {
					x: index,
					y: rowIndex
				};
			}
		}
	}

};
/*global table */

/**
 * Get any associated table headers for a `HTMLTableCellElement`
 * @param  {HTMLTableCellElement} cell The cell of which to get headers
 * @return {Array}      Array of headers associated to the table cell
 */
table.getHeaders = function (cell) {

	if (cell.getAttribute('headers')) {
		return commons.dom.idrefs(cell, 'headers');
	}

	var headers = [], currentCell,
		tbl = commons.table.toArray(commons.dom.findUp(cell, 'table')),
		position = commons.table.getCellPosition(cell);

	//
	for (var x = position.x - 1; x >= 0; x--) {
		currentCell = tbl[position.y][x];

		if (commons.table.isRowHeader(currentCell)) {
			headers.unshift(currentCell);
		}
	}

	for (var y = position.y - 1; y >= 0; y--) {
		currentCell = tbl[y][position.x];

		if (currentCell && commons.table.isColumnHeader(currentCell)) {
			headers.unshift(currentCell);
		}
	}

	return headers;

};
/*global table, dom */

/**
 * Determine if a `HTMLTableCellElement` is a column header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isColumnHeader = function (node) {

	var scope = node.getAttribute('scope');
	if (scope === 'col') {
		return true;
	} else if (scope || node.nodeName !== 'TH') {
		return false;
	}

	var currentCell,
		position = table.getCellPosition(node),
		tbl = table.toArray(dom.findUp(node, 'table')),
		cells = tbl[position.y];

	for (var cellIndex = 0, cellLength = cells.length; cellIndex < cellLength; cellIndex++) {
		currentCell = cells[cellIndex];
		if (currentCell !== node) {
			if (table.isDataCell(currentCell)) {
				return false;
			}
		}
	}

	return true;

};
/*global table */

/**
 * Determine if a `HTMLTableCellElement` is a data cell
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isDataCell = function (cell) {
	// @see http://www.whatwg.org/specs/web-apps/current-work/multipage/tables.html#empty-cell
	if (!cell.children.length && !cell.textContent.trim()) {
		return false;
	}
	return cell.nodeName === 'TD';
};
/*global table, dom */
/*jshint maxstatements: 65, maxcomplexity: 35 */

/**
 * Determines whether a table is a data table
 * @param  {HTMLTableElement}  node The table to test
 * @return {Boolean}
 */
table.isDataTable = function (node) {

	var win = node.ownerDocument.defaultView;
	var role = node.getAttribute('role');

	// The element is not focusable and has role=presentation
	if (role === 'presentation' && !dom.isFocusable(node)) {
		return false;
	}

	// Table inside editable area is data table always since the table structure is crucial for table editing
	if (node.getAttribute('contenteditable') === 'true' || dom.findUp(node, '[contenteditable="true"]')) {
		return true;
	}

	// Table having ARIA table related role is data table
	if (role === 'grid' || role === 'treegrid') {
		return true;
	}

	// Table having ARIA landmark role is data table
	if (commons.aria.getRoleType(role) === 'landmark') {
		return true;
	}

	// Table having datatable="0" attribute is layout table
	if (node.getAttribute('datatable') === '0') {
		return false;
	}

	// Table having summary attribute is data table
	if (node.getAttribute('summary')) {
		return true;

	}

	// Table having legitimate data table structures is data table
	if (node.tHead || node.tFoot || node.caption) {
		return true;
	}
	// colgroup / col - colgroup is magically generated
	for (var childIndex = 0, childLength = node.children.length; childIndex < childLength; childIndex++) {
		if (node.children[childIndex].nodeName === 'COLGROUP') {
			return true;
		}
	}

	var cells = 0;
	var rowLength = node.rows.length;
	var row, cell;
	var hasBorder = false;
	for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		row = node.rows[rowIndex];
		for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
			cell = row.cells[cellIndex];
			if (!hasBorder && (cell.offsetWidth !== cell.clientWidth || cell.offsetHeight !== cell.clientHeight)) {
				hasBorder = true;
			}
			if (cell.getAttribute('scope') || cell.getAttribute('headers') || cell.getAttribute('abbr')) {
				return true;
			}
			if (cell.nodeName === 'TH') {
				return true;
			}
			// abbr element as a single child element of table cell
			if (cell.children.length === 1 && cell.children[0].nodeName === 'ABBR') {
				return true;
			}
			cells++;
		}
	}

	// Table having nested table is layout table
	if (node.getElementsByTagName('table').length) {
		return false;
	}

	// Table having only one row or column is layout table (row)
	if (rowLength < 2) {
		return false;
	}

	// Table having only one row or column is layout table (column)
	var sampleRow = node.rows[Math.ceil(rowLength / 2)];
	if (sampleRow.cells.length === 1 && sampleRow.cells[0].colSpan === 1) {
		return false;
	}

	// Table having many columns (>= 5) is data table
	if (sampleRow.cells.length >= 5) {
		return true;
	}

	// Table having borders around cells is data table
	if (hasBorder) {
		return true;
	}

	// Table having differently colored rows is data table
	var bgColor, bgImage;
	for (rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		row = node.rows[rowIndex];
		if (bgColor && bgColor !== win.getComputedStyle(row).getPropertyValue('background-color')) {
			return true;
		} else {
			bgColor = win.getComputedStyle(row).getPropertyValue('background-color');
		}
		if (bgImage && bgImage !== win.getComputedStyle(row).getPropertyValue('background-image')) {
			return true;
		} else {
			bgImage = win.getComputedStyle(row).getPropertyValue('background-image');
		}

	}

	// Table having many rows (>= 20) is data table
	if (rowLength >= 20) {
		return true;
	}

	// Wide table (more than 95% of the document width) is layout table
	if (dom.getElementCoordinates(node).width > dom.getViewportSize(win).width * 0.95) {
		return false;
	}

	// Table having small amount of cells (<= 10) is layout table
	if (cells < 10) {
		return false;
	}

	// Table containing embed, object, applet of iframe elements (typical advertisements elements) is layout table
	if (node.querySelector('object, embed, iframe, applet')) {
		return false;
	}

	// Otherwise it's data table
	return true;
};

/*global table, utils */

/**
 * Determine if a `HTMLTableCellElement` is a header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isHeader = function (cell) {
	if (table.isColumnHeader(cell) || table.isRowHeader(cell)) {
		return true;
	}

	if (cell.id) {
		return !!cell.ownerDocument.querySelector('[headers~="' + utils.escapeSelector(cell.id) + '"]');
	}

	return false;
};
/*global table, dom */

/**
 * Determine if a `HTMLTableCellElement` is a row header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isRowHeader = function (node) {


	var scope = node.getAttribute('scope');
	if (scope === 'row') {
		return true;
	} else if (scope || node.nodeName !== 'TH') {
		return false;
	}

	if (table.isColumnHeader(node)) {
		return false;
	}

	var currentCell,
		position = table.getCellPosition(node),
		tbl = table.toArray(dom.findUp(node, 'table'));

	for (var rowIndex = 0, rowLength = tbl.length; rowIndex < rowLength; rowIndex++) {
		currentCell = tbl[rowIndex][position.x];
		if (currentCell !== node) {
			if (table.isDataCell(currentCell)) {
				return false;
			}
		}
	}

	return true;

};
/*global table */

/**
 * Converts a table to an Array, normalized for row and column spans
 * @param  {HTMLTableElement} node The table to convert
 * @return {Array}      Array of rows and cells
 */
table.toArray = function (node) {
	var table = [];
	var rows = node.rows;
	for (var i = 0, rowLength = rows.length; i < rowLength; i++) {
		var cells = rows[i].cells;
		table[i] = table[i] || [];

		var columnIndex = 0;

		for (var j = 0, cellLength = cells.length; j < cellLength; j++) {
			for (var colSpan = 0; colSpan < cells[j].colSpan; colSpan++) {
				for (var rowSpan = 0; rowSpan < cells[j].rowSpan; rowSpan++) {
					table[i + rowSpan] = table[i + rowSpan] || [];
					while (table[i + rowSpan][columnIndex]) {
						columnIndex++;
					}
					table[i + rowSpan][columnIndex] = cells[j];
				}
				columnIndex++;
			}
		}
	}

	return table;
};

/*global text, dom, aria, utils */
/*jshint maxstatements: 25, maxcomplexity: 19 */

var defaultButtonValues = {
	submit: 'Submit',
	reset: 'Reset'
};

var inputTypes = ['text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color'];
var phrasingElements = ['a', 'em', 'strong', 'small', 'mark', 'abbr', 'dfn', 'i', 'b', 's', 'u', 'code',
	'var', 'samp', 'kbd', 'sup', 'sub', 'q', 'cite', 'span', 'bdo', 'bdi', 'br', 'wbr', 'ins', 'del', 'img',
	'embed', 'object', 'iframe', 'map', 'area', 'script', 'noscript', 'ruby', 'video', 'audio', 'input',
	'textarea', 'select', 'button', 'label', 'output', 'datalist', 'keygen', 'progress', 'command',
	'canvas', 'time', 'meter'];

/**
 * Find a non-ARIA label for an element
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {HTMLElement} The label element, or null if none is found
 */
function findLabel(element) {
	var ref = null;
	if (element.id) {
		ref = element.ownerDocument.querySelector('label[for="' + utils.escapeSelector(element.id) + '"]');
		if (ref) {
			return ref;
		}
	}
	ref = dom.findUp(element, 'label');
	return ref;
}

function isButton(element) {
	return ['button', 'reset', 'submit'].indexOf(element.type) !== -1;
}

function isInput(element) {
	return (element.nodeName === 'TEXTAREA' || element.nodeName === 'SELECT') ||
		(element.nodeName === 'INPUT' && element.type !== 'hidden');
}

function shouldCheckSubtree(element) {
	return ['BUTTON', 'SUMMARY', 'A'].indexOf(element.nodeName) !== -1;
}

function shouldNeverCheckSubtree(element) {
	return ['TABLE', 'FIGURE'].indexOf(element.nodeName) !== -1;
}

/**
 * Calculate value of a form element when treated as a value
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string} The calculated value
 */
function formValueText(element) {
	if (element.nodeName === 'INPUT') {
		if (!element.hasAttribute('type') || (inputTypes.indexOf(element.getAttribute('type')) !== -1) && element.value) {
			return element.value;
		}
		return '';
	}

	if (element.nodeName === 'SELECT') {
		var opts = element.options;
		if (opts && opts.length) {
			var returnText = '';
			for (var i = 0; i < opts.length; i++) {
				if (opts[i].selected) {
					returnText += ' ' + opts[i].text;
				}
			}
			return text.sanitize(returnText);
		}
		return '';
	}

	if (element.nodeName === 'TEXTAREA' && element.value) {
		return element.value;
	}
	return '';
}

function checkDescendant(element, nodeName) {
	var candidate = element.querySelector(nodeName);
	if (candidate) {
		return text.accessibleText(candidate);
	}

	return '';
}


/**
 * Determine whether an element can be an embedded control
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {boolean} True if embedded control
 */
function isEmbeddedControl(e) {
	if (!e) {
		return false;
	}
	switch (e.nodeName) {
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		case 'INPUT':
			return !e.hasAttribute('type') || (inputTypes.indexOf(e.getAttribute('type')) !== -1);
		default:
			return false;
	}
}

function shouldCheckAlt(element) {
	return (element.nodeName === 'INPUT' && element.type === 'image') ||
		['IMG', 'APPLET', 'AREA'].indexOf(element.nodeName) !== -1;
}

function nonEmptyText(t) {
	return !!text.sanitize(t);
}

/**
 * Determine the accessible text of an element, using logic from ARIA:
 * http://www.w3.org/TR/html-aam-1.0/
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string}
 */
text.accessibleText = function(element) {

	function checkNative(element, inLabelledByContext, inControlContext) {
		var returnText = '';
		if (shouldCheckSubtree(element)) {
			returnText = getInnerText(element, false, false) || '';
			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}
		if (element.nodeName === 'FIGURE') {
			returnText = checkDescendant(element, 'figcaption');

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		if (element.nodeName === 'TABLE') {
			returnText = checkDescendant(element, 'caption');

			if (nonEmptyText(returnText)) {
				return returnText;
			}

			returnText = element.getAttribute('title') || element.getAttribute('summary') || '';

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		if (shouldCheckAlt(element)) {
			return element.getAttribute('alt') || '';
		}

		if (isInput(element) && !inControlContext) {
			if (isButton(element)) {
				return element.value || element.title || defaultButtonValues[element.type] || '';
			}

			var labelElement = findLabel(element);
			if (labelElement) {
				return accessibleNameComputation(labelElement, inLabelledByContext, true);
			}
		}

		return '';
	}

	function checkARIA(element, inLabelledByContext, inControlContext) {

		if (!inLabelledByContext && element.hasAttribute('aria-labelledby')) {
			return text.sanitize(dom.idrefs(element, 'aria-labelledby').map(function(l) {
				if (element === l) {
					encounteredNodes.pop();
				} //let element be encountered twice
				return accessibleNameComputation(l, true, element !== l);
			}).join(' '));
		}

		if (!(inControlContext && isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
			return text.sanitize(element.getAttribute('aria-label'));
		}

		return '';
	}

	function getInnerText(element, inLabelledByContext, inControlContext) {

		var nodes = element.childNodes;
		var returnText = '';
		var node;

		for (var i = 0; i < nodes.length; i++) {
			node = nodes[i];
			if (node.nodeType === 3) {
				returnText += node.textContent;
			} else if (node.nodeType === 1) {
				if (phrasingElements.indexOf(node.nodeName.toLowerCase()) === -1) {
					returnText += ' ';
				}
				returnText += accessibleNameComputation(nodes[i], inLabelledByContext, inControlContext);
			}
		}

		return returnText;

	}


	var encounteredNodes = [];

	/**
	 * Determine the accessible text of an element, using logic from ARIA:
	 * http://www.w3.org/TR/accname-aam-1.1/#mapping_additional_nd_name
	 *
	 * @param {HTMLElement} element The HTMLElement
	 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
	 * @param {Boolean} inControlContext True when in the context of textifying a widget
	 * @return {string}
	 */
	function accessibleNameComputation(element, inLabelledByContext, inControlContext) {
		'use strict';

		var returnText = '';

		//Step 2a
		if (element === null || !dom.isVisible(element, true) || (encounteredNodes.indexOf(element) !== -1)) {
			return '';
		}
		encounteredNodes.push(element);
		var role = element.getAttribute('role');

		//Step 2b & 2c
		returnText += checkARIA(element, inLabelledByContext, inControlContext);
		if (nonEmptyText(returnText)) {
			return returnText;
		}

		//Step 2d - native attribute or elements
		returnText = checkNative(element, inLabelledByContext, inControlContext);
		if (nonEmptyText(returnText)) {
			return returnText;
		}

		//Step 2e
		if (inControlContext) {
			returnText += formValueText(element);
			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		//Step 2f
		if (!shouldNeverCheckSubtree(element) && (!role || aria.getRolesWithNameFromContents().indexOf(role) !== -1)) {

			returnText = getInnerText(element, inLabelledByContext, inControlContext);

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		//Step 2g - if text node, return value (handled in getInnerText)

		//Step 2h
		if (element.hasAttribute('title')) {
			return element.getAttribute('title');
		}

		return '';
	}

	return text.sanitize(accessibleNameComputation(element));
};

/*global text, dom, utils, aria */
/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {HTMLElement} node The input to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
text.label = function (node) {
	var ref, candidate;

	candidate = aria.label(node);
	if (candidate) {
		return candidate;
	}

	// explicit label
	if (node.id) {
		ref = node.ownerDocument.querySelector('label[for="' + utils.escapeSelector(node.id) + '"]');
		candidate = ref && text.visible(ref, true);
		if (candidate) {
			return candidate;
		}
	}

	ref = dom.findUp(node, 'label');
	candidate = ref && text.visible(ref, true);
	if (candidate) {
		return candidate;
	}

	return null;
};

/*global text */
text.sanitize = function (str) {
	'use strict';
	return str
		.replace(/\r\n/g, '\n')
		.replace(/\u00A0/g, ' ')
		.replace(/[\s]{2,}/g, ' ')
		.trim();
};

/*global text, dom */

text.visible = function (element, screenReader, noRecursing) {
	'use strict';

	var index, child, nodeValue,
		childNodes = element.childNodes,
		length = childNodes.length,
		result = '';

	for (index = 0; index < length; index++) {
		child = childNodes[index];

		if (child.nodeType === 3) {
			nodeValue = child.nodeValue;
			if (nodeValue && dom.isVisible(element, screenReader)) {
				result += child.nodeValue;
			}
		} else if (!noRecursing) {
			result += text.visible(child, screenReader);
		}
	}

	return text.sanitize(result);
};

/*global utils */
utils.toArray = function (thing) {
	'use strict';
	return Array.prototype.slice.call(thing);
};
/*global utils */


utils.tokenList = function (str) {
	'use strict';

	return str.trim().replace(/\s{2,}/g, ' ').split(' ');
};
	return commons;
}())
,"version":"1.0.2"});

	axe.version = '1.0.1';
}(this));
