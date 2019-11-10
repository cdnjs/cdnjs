/*!
 * json-schema-faker library v0.4.5
 * http://json-schema-faker.js.org
 * @preserve
 *
 * Copyright (c) 2014-2016 Alvaro Cabrera & Tomasz Ducin
 * Released under the MIT license
 *
 * Date: 2017-10-15 21:00:53.301Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.JSONSchemaFaker = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var types = {
  ROOT       : 0,
  GROUP      : 1,
  POSITION   : 2,
  SET        : 3,
  RANGE      : 4,
  REPETITION : 5,
  REFERENCE  : 6,
  CHAR       : 7,
};

var INTS = function() {
 return [{ type: types.RANGE , from: 48, to: 57 }];
};

var WORDS = function() {
 return [
    { type: types.CHAR, value: 95 },
    { type: types.RANGE, from: 97, to: 122 },
    { type: types.RANGE, from: 65, to: 90 }
  ].concat(INTS());
};

var WHITESPACE = function() {
 return [
    { type: types.CHAR, value: 9 },
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 11 },
    { type: types.CHAR, value: 12 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 32 },
    { type: types.CHAR, value: 160 },
    { type: types.CHAR, value: 5760 },
    { type: types.CHAR, value: 6158 },
    { type: types.CHAR, value: 8192 },
    { type: types.CHAR, value: 8193 },
    { type: types.CHAR, value: 8194 },
    { type: types.CHAR, value: 8195 },
    { type: types.CHAR, value: 8196 },
    { type: types.CHAR, value: 8197 },
    { type: types.CHAR, value: 8198 },
    { type: types.CHAR, value: 8199 },
    { type: types.CHAR, value: 8200 },
    { type: types.CHAR, value: 8201 },
    { type: types.CHAR, value: 8202 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
    { type: types.CHAR, value: 8239 },
    { type: types.CHAR, value: 8287 },
    { type: types.CHAR, value: 12288 },
    { type: types.CHAR, value: 65279 }
  ];
};

var NOTANYCHAR = function() {
  return [
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
  ];
};

// Predefined class objects.
var words = function() {
  return { type: types.SET, set: WORDS(), not: false };
};

var notWords = function() {
  return { type: types.SET, set: WORDS(), not: true };
};

var ints = function() {
  return { type: types.SET, set: INTS(), not: false };
};

var notInts = function() {
  return { type: types.SET, set: INTS(), not: true };
};

var whitespace = function() {
  return { type: types.SET, set: WHITESPACE(), not: false };
};

var notWhitespace = function() {
  return { type: types.SET, set: WHITESPACE(), not: true };
};

var anyChar = function() {
  return { type: types.SET, set: NOTANYCHAR(), not: true };
};

var sets = {
	words: words,
	notWords: notWords,
	ints: ints,
	notInts: notInts,
	whitespace: whitespace,
	notWhitespace: notWhitespace,
	anyChar: anyChar
};

var util = createCommonjsModule(function (module, exports) {
// All of these are private and only used by randexp.
// It's assumed that they will always be called with the correct input.

var CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
var SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 };

/**
 * Finds character representations in str and convert all to
 * their respective characters
 *
 * @param {String} str
 * @return {String}
 */
exports.strToChars = function(str) {
  /* jshint maxlen: false */
  var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
  str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
    if (lbs) {
      return s;
    }

    var code = b     ? 8 :
               a16   ? parseInt(a16, 16) :
               b16   ? parseInt(b16, 16) :
               c8    ? parseInt(c8,   8) :
               dctrl ? CTRL.indexOf(dctrl) :
               SLSH[eslsh];

    var c = String.fromCharCode(code);

    // Escape special regex characters.
    if (/[\[\]{}\^$.|?*+()]/.test(c)) {
      c = '\\' + c;
    }

    return c;
  });

  return str;
};


/**
 * turns class into tokens
 * reads str until it encounters a ] not preceeded by a \
 *
 * @param {String} str
 * @param {String} regexpStr
 * @return {Array.<Array.<Object>, Number>}
 */
exports.tokenizeClass = function(str, regexpStr) {
  /* jshint maxlen: false */
  var tokens = [];
  var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;
  var rs, c;


  while ((rs = regexp.exec(str)) != null) {
    if (rs[1]) {
      tokens.push(sets.words());

    } else if (rs[2]) {
      tokens.push(sets.ints());

    } else if (rs[3]) {
      tokens.push(sets.whitespace());

    } else if (rs[4]) {
      tokens.push(sets.notWords());

    } else if (rs[5]) {
      tokens.push(sets.notInts());

    } else if (rs[6]) {
      tokens.push(sets.notWhitespace());

    } else if (rs[7]) {
      tokens.push({
        type: types.RANGE,
        from: (rs[8] || rs[9]).charCodeAt(0),
          to: rs[10].charCodeAt(0),
      });

    } else if (c = rs[12]) {
      tokens.push({
        type: types.CHAR,
        value: c.charCodeAt(0),
      });

    } else {
      return [tokens, regexp.lastIndex];
    }
  }

  exports.error(regexpStr, 'Unterminated character class');
};


/**
 * Shortcut to throw errors.
 *
 * @param {String} regexp
 * @param {String} msg
 */
exports.error = function(regexp, msg) {
  throw new SyntaxError('Invalid regular expression: /' + regexp + '/: ' + msg);
};
});

var wordBoundary = function() {
  return { type: types.POSITION, value: 'b' };
};

var nonWordBoundary = function() {
  return { type: types.POSITION, value: 'B' };
};

var begin = function() {
  return { type: types.POSITION, value: '^' };
};

var end = function() {
  return { type: types.POSITION, value: '$' };
};

var positions = {
	wordBoundary: wordBoundary,
	nonWordBoundary: nonWordBoundary,
	begin: begin,
	end: end
};

var lib$2 = function(regexpStr) {
  var i = 0, l, c,
      start = { type: types.ROOT, stack: []},

      // Keep track of last clause/group and stack.
      lastGroup = start,
      last = start.stack,
      groupStack = [];


  var repeatErr = function(i) {
    util.error(regexpStr, 'Nothing to repeat at column ' + (i - 1));
  };

  // Decode a few escaped characters.
  var str = util.strToChars(regexpStr);
  l = str.length;

  // Iterate through each character in string.
  while (i < l) {
    c = str[i++];

    switch (c) {
      // Handle escaped characters, inclues a few sets.
      case '\\':
        c = str[i++];

        switch (c) {
          case 'b':
            last.push(positions.wordBoundary());
            break;

          case 'B':
            last.push(positions.nonWordBoundary());
            break;

          case 'w':
            last.push(sets.words());
            break;

          case 'W':
            last.push(sets.notWords());
            break;

          case 'd':
            last.push(sets.ints());
            break;

          case 'D':
            last.push(sets.notInts());
            break;

          case 's':
            last.push(sets.whitespace());
            break;

          case 'S':
            last.push(sets.notWhitespace());
            break;

          default:
            // Check if c is integer.
            // In which case it's a reference.
            if (/\d/.test(c)) {
              last.push({ type: types.REFERENCE, value: parseInt(c, 10) });

            // Escaped character.
            } else {
              last.push({ type: types.CHAR, value: c.charCodeAt(0) });
            }
        }

        break;


      // Positionals.
      case '^':
          last.push(positions.begin());
        break;

      case '$':
          last.push(positions.end());
        break;


      // Handle custom sets.
      case '[':
        // Check if this class is 'anti' i.e. [^abc].
        var not;
        if (str[i] === '^') {
          not = true;
          i++;
        } else {
          not = false;
        }

        // Get all the characters in class.
        var classTokens = util.tokenizeClass(str.slice(i), regexpStr);

        // Increase index by length of class.
        i += classTokens[1];
        last.push({
          type: types.SET,
          set: classTokens[0],
          not: not,
        });

        break;


      // Class of any character except \n.
      case '.':
        last.push(sets.anyChar());
        break;


      // Push group onto stack.
      case '(':
        // Create group.
        var group = {
          type: types.GROUP,
          stack: [],
          remember: true,
        };

        c = str[i];

        // If if this is a special kind of group.
        if (c === '?') {
          c = str[i + 1];
          i += 2;

          // Match if followed by.
          if (c === '=') {
            group.followedBy = true;

          // Match if not followed by.
          } else if (c === '!') {
            group.notFollowedBy = true;

          } else if (c !== ':') {
            util.error(regexpStr,
              'Invalid group, character \'' + c +
              '\' after \'?\' at column ' + (i - 1));
          }

          group.remember = false;
        }

        // Insert subgroup into current group stack.
        last.push(group);

        // Remember the current group for when the group closes.
        groupStack.push(lastGroup);

        // Make this new group the current group.
        lastGroup = group;
        last = group.stack;
        break;


      // Pop group out of stack.
      case ')':
        if (groupStack.length === 0) {
          util.error(regexpStr, 'Unmatched ) at column ' + (i - 1));
        }
        lastGroup = groupStack.pop();

        // Check if this group has a PIPE.
        // To get back the correct last stack.
        last = lastGroup.options ?
          lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
        break;


      // Use pipe character to give more choices.
      case '|':
        // Create array where options are if this is the first PIPE
        // in this clause.
        if (!lastGroup.options) {
          lastGroup.options = [lastGroup.stack];
          delete lastGroup.stack;
        }

        // Create a new stack and add to options for rest of clause.
        var stack = [];
        lastGroup.options.push(stack);
        last = stack;
        break;


      // Repetition.
      // For every repetition, remove last element from last stack
      // then insert back a RANGE object.
      // This design is chosen because there could be more than
      // one repetition symbols in a regex i.e. `a?+{2,3}`.
      case '{':
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i);
          }
          min = parseInt(rs[1], 10);
          max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
          i += rs[0].length;

          last.push({
            type: types.REPETITION,
            min: min,
            max: max,
            value: last.pop(),
          });
        } else {
          last.push({
            type: types.CHAR,
            value: 123,
          });
        }
        break;

      case '?':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: 1,
          value: last.pop(),
        });
        break;

      case '+':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 1,
          max: Infinity,
          value: last.pop(),
        });
        break;

      case '*':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: Infinity,
          value: last.pop(),
        });
        break;


      // Default is a character that is not `\[](){}?+*^$`.
      default:
        last.push({
          type: types.CHAR,
          value: c.charCodeAt(0),
        });
    }

  }

  // Check if any groups have not been closed.
  if (groupStack.length !== 0) {
    util.error(regexpStr, 'Unterminated group');
  }

  return start;
};

var types_1 = types;

lib$2.types = types_1;

//protected helper class
function _SubRange(low, high) {
    this.low = low;
    this.high = high;
    this.length = 1 + high - low;
}

_SubRange.prototype.overlaps = function (range) {
    return !(this.high < range.low || this.low > range.high);
};

_SubRange.prototype.touches = function (range) {
    return !(this.high + 1 < range.low || this.low - 1 > range.high);
};

//returns inclusive combination of _SubRanges as a _SubRange
_SubRange.prototype.add = function (range) {
    return this.touches(range) && new _SubRange(Math.min(this.low, range.low), Math.max(this.high, range.high));
};

//returns subtraction of _SubRanges as an array of _SubRanges (there's a case where subtraction divides it in 2)
_SubRange.prototype.subtract = function (range) {
    if (!this.overlaps(range)) return false;
    if (range.low <= this.low && range.high >= this.high) return [];
    if (range.low > this.low && range.high < this.high) return [new _SubRange(this.low, range.low - 1), new _SubRange(range.high + 1, this.high)];
    if (range.low <= this.low) return [new _SubRange(range.high + 1, this.high)];
    return [new _SubRange(this.low, range.low - 1)];
};

_SubRange.prototype.toString = function () {
    if (this.low == this.high) return this.low.toString();
    return this.low + '-' + this.high;
};

_SubRange.prototype.clone = function () {
    return new _SubRange(this.low, this.high);
};




function DiscontinuousRange(a, b) {
    if (this instanceof DiscontinuousRange) {
        this.ranges = [];
        this.length = 0;
        if (a !== undefined) this.add(a, b);
    } else {
        return new DiscontinuousRange(a, b);
    }
}

function _update_length(self) {
    self.length = self.ranges.reduce(function (previous, range) {return previous + range.length}, 0);
}

DiscontinuousRange.prototype.add = function (a, b) {
    var self = this;
    function _add(subrange) {
        var new_ranges = [];
        var i = 0;
        while (i < self.ranges.length && !subrange.touches(self.ranges[i])) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        while (i < self.ranges.length && subrange.touches(self.ranges[i])) {
            subrange = subrange.add(self.ranges[i]);
            i++;
        }
        new_ranges.push(subrange);
        while (i < self.ranges.length) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        self.ranges = new_ranges;
        _update_length(self);
    }

    if (a instanceof DiscontinuousRange) {
        a.ranges.forEach(_add);
    } else {
        if (a instanceof _SubRange) {
            _add(a);
        } else {
            if (b === undefined) b = a;
            _add(new _SubRange(a, b));
        }
    }
    return this;
};

DiscontinuousRange.prototype.subtract = function (a, b) {
    var self = this;
    function _subtract(subrange) {
        var new_ranges = [];
        var i = 0;
        while (i < self.ranges.length && !subrange.overlaps(self.ranges[i])) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        while (i < self.ranges.length && subrange.overlaps(self.ranges[i])) {
            new_ranges = new_ranges.concat(self.ranges[i].subtract(subrange));
            i++;
        }
        while (i < self.ranges.length) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        self.ranges = new_ranges;
        _update_length(self);
    }
    if (a instanceof DiscontinuousRange) {
        a.ranges.forEach(_subtract);
    } else {
        if (a instanceof _SubRange) {
            _subtract(a);
        } else {
            if (b === undefined) b = a;
            _subtract(new _SubRange(a, b));
        }
    }
    return this;
};


DiscontinuousRange.prototype.index = function (index) {
    var i = 0;
    while (i < this.ranges.length && this.ranges[i].length <= index) {
        index -= this.ranges[i].length;
        i++;
    }
    if (i >= this.ranges.length) return null;
    return this.ranges[i].low + index;
};


DiscontinuousRange.prototype.toString = function () {
    return '[ ' + this.ranges.join(', ') + ' ]'
};

DiscontinuousRange.prototype.clone = function () {
    return new DiscontinuousRange(this);
};

var discontinuousRange = DiscontinuousRange;

var randexp$1$1 = createCommonjsModule(function (module) {
var types = lib$2.types;


/**
 * If code is alphabetic, converts to other case.
 * If not alphabetic, returns back code.
 *
 * @param {Number} code
 * @return {Number}
 */
function toOtherCase(code) {
  return code + (97 <= code && code <= 122 ? -32 :
                 65 <= code && code <= 90  ?  32 : 0);
}


/**
 * Randomly returns a true or false value.
 *
 * @return {Boolean}
 */
function randBool() {
  return !this.randInt(0, 1);
}


/**
 * Randomly selects and returns a value from the array.
 *
 * @param {Array.<Object>} arr
 * @return {Object}
 */
function randSelect(arr) {
  if (arr instanceof discontinuousRange) {
    return arr.index(this.randInt(0, arr.length - 1));
  }
  return arr[this.randInt(0, arr.length - 1)];
}


/**
 * expands a token to a DiscontinuousRange of characters which has a
 * length and an index function (for random selecting)
 *
 * @param {Object} token
 * @return {DiscontinuousRange}
 */
function expand(token) {
  if (token.type === lib$2.types.CHAR) {
    return new discontinuousRange(token.value);
  } else if (token.type === lib$2.types.RANGE) {
    return new discontinuousRange(token.from, token.to);
  } else {
    var drange = new discontinuousRange();
    for (var i = 0; i < token.set.length; i++) {
      var subrange = expand.call(this, token.set[i]);
      drange.add(subrange);
      if (this.ignoreCase) {
        for (var j = 0; j < subrange.length; j++) {
          var code = subrange.index(j);
          var otherCaseCode = toOtherCase(code);
          if (code !== otherCaseCode) {
            drange.add(otherCaseCode);
          }
        }
      }
    }
    if (token.not) {
      return this.defaultRange.clone().subtract(drange);
    } else {
      return drange;
    }
  }
}


/**
 * Checks if some custom properties have been set for this regexp.
 *
 * @param {RandExp} randexp
 * @param {RegExp} regexp
 */
function checkCustom(randexp, regexp) {
  if (typeof regexp.max === 'number') {
    randexp.max = regexp.max;
  }
  if (regexp.defaultRange instanceof discontinuousRange) {
    randexp.defaultRange = regexp.defaultRange;
  }
  if (typeof regexp.randInt === 'function') {
    randexp.randInt = regexp.randInt;
  }
}


/**
 * @constructor
 * @param {RegExp|String} regexp
 * @param {String} m
 */
var RandExp = module.exports = function(regexp, m) {
  this.defaultRange = this.defaultRange.clone();
  if (regexp instanceof RegExp) {
    this.ignoreCase = regexp.ignoreCase;
    this.multiline = regexp.multiline;
    checkCustom(this, regexp);
    regexp = regexp.source;

  } else if (typeof regexp === 'string') {
    this.ignoreCase = m && m.indexOf('i') !== -1;
    this.multiline = m && m.indexOf('m') !== -1;
  } else {
    throw new Error('Expected a regexp or string');
  }

  this.tokens = lib$2(regexp);
};


// When a repetitional token has its max set to Infinite,
// randexp won't actually generate a random amount between min and Infinite
// instead it will see Infinite as min + 100.
RandExp.prototype.max = 100;


// Generates the random string.
RandExp.prototype.gen = function() {
  return gen.call(this, this.tokens, []);
};


// Enables use of randexp with a shorter call.
RandExp.randexp = function(regexp, m) {
  var randexp;
  if (regexp._randexp === undefined) {
    randexp = new RandExp(regexp, m);
    regexp._randexp = randexp;
  } else {
    randexp = regexp._randexp;
  }
  checkCustom(randexp, regexp);
  return randexp.gen();
};


// This enables sugary /regexp/.gen syntax.
RandExp.sugar = function() {
  /* jshint freeze:false */
  RegExp.prototype.gen = function() {
    return RandExp.randexp(this);
  };
};

// This allows expanding to include additional characters
// for instance: RandExp.defaultRange.add(0, 65535);
RandExp.prototype.defaultRange = new discontinuousRange(32, 126);


/**
 * Randomly generates and returns a number between a and b (inclusive).
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 */
RandExp.prototype.randInt = function(a, b) {
  return a + Math.floor(Math.random() * (1 + b - a));
};


/**
 * Generate random string modeled after given tokens.
 *
 * @param {Object} token
 * @param {Array.<String>} groups
 * @return {String}
 */
function gen(token, groups) {
  var stack, str, n, i, l;

  switch (token.type) {


    case types.ROOT:
    case types.GROUP:
      // Ignore lookaheads for now.
      if (token.followedBy || token.notFollowedBy) { return ''; }

      // Insert placeholder until group string is generated.
      if (token.remember && token.groupNumber === undefined) {
        token.groupNumber = groups.push(null) - 1;
      }

      stack = token.options ?
        randSelect.call(this, token.options) : token.stack;

      str = '';
      for (i = 0, l = stack.length; i < l; i++) {
        str += gen.call(this, stack[i], groups);
      }

      if (token.remember) {
        groups[token.groupNumber] = str;
      }
      return str;


    case types.POSITION:
      // Do nothing for now.
      return '';


    case types.SET:
      var expandedSet = expand.call(this, token);
      if (!expandedSet.length) { return ''; }
      return String.fromCharCode(randSelect.call(this, expandedSet));


    case types.REPETITION:
      // Randomly generate number between min and max.
      n = this.randInt(token.min,
              token.max === Infinity ? token.min + this.max : token.max);

      str = '';
      for (i = 0; i < n; i++) {
        str += gen.call(this, token.value, groups);
      }

      return str;


    case types.REFERENCE:
      return groups[token.value - 1] || '';


    case types.CHAR:
      var code = this.ignoreCase && randBool.call(this) ?
        toOtherCase(token.value) : token.value;
      return String.fromCharCode(code);
  }
}
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}


var tslib_es6 = Object.freeze({
	__extends: __extends,
	__assign: __assign,
	__rest: __rest,
	__decorate: __decorate,
	__param: __param,
	__metadata: __metadata,
	__awaiter: __awaiter,
	__generator: __generator,
	__exportStar: __exportStar,
	__values: __values,
	__read: __read,
	__spread: __spread,
	__await: __await,
	__asyncGenerator: __asyncGenerator,
	__asyncDelegator: __asyncDelegator,
	__asyncValues: __asyncValues,
	__makeTemplateObject: __makeTemplateObject
});

'use strict';

// https://gist.github.com/pjt33/efb2f1134bab986113fd

function URLUtils(url, baseURL) {
  // remove leading ./
  url = url.replace(/^\.\//, '');

  var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@]*)(?::([^:@]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
  if (!m) {
    throw new RangeError();
  }
  var href = m[0] || '';
  var protocol = m[1] || '';
  var username = m[2] || '';
  var password = m[3] || '';
  var host = m[4] || '';
  var hostname = m[5] || '';
  var port = m[6] || '';
  var pathname = m[7] || '';
  var search = m[8] || '';
  var hash = m[9] || '';
  if (baseURL !== undefined) {
    var base = new URLUtils(baseURL);
    var flag = protocol === '' && host === '' && username === '';
    if (flag && pathname === '' && search === '') {
      search = base.search;
    }
    if (flag && pathname.charAt(0) !== '/') {
      pathname = (pathname !== '' ? (base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + pathname) : base.pathname);
    }
    // dot segments removal
    var output = [];

    pathname.replace(/\/?[^\/]+/g, function(p) {
      if (p === '/..') {
        output.pop();
      } else {
        output.push(p);
      }
    });

    pathname = output.join('') || '/';

    if (flag) {
      port = base.port;
      hostname = base.hostname;
      host = base.host;
      password = base.password;
      username = base.username;
    }
    if (protocol === '') {
      protocol = base.protocol;
    }
    href = protocol + (host !== '' ? '//' : '') + (username !== '' ? username + (password !== '' ? ':' + password : '') + '@' : '') + host + pathname + search + hash;
  }
  this.href = href;
  this.origin = protocol + (host !== '' ? '//' + host : '');
  this.protocol = protocol;
  this.username = username;
  this.password = password;
  this.host = host;
  this.hostname = hostname;
  this.port = port;
  this.pathname = pathname;
  this.search = search;
  this.hash = hash;
}

function isURL(path) {
  if (typeof path === 'string' && /^\w+:\/\//.test(path)) {
    return true;
  }
}

function parseURI(href, base) {
  return new URLUtils(href, base);
}

function resolveURL(base, href) {
  base = base || 'http://json-schema.org/schema#';

  href = parseURI(href, base);
  base = parseURI(base);

  if (base.hash && !href.hash) {
    return href.href + base.hash;
  }

  return href.href;
}

function getDocumentURI(uri) {
  return typeof uri === 'string' && uri.split('#')[0];
}

function isKeyword(prop) {
  return prop === 'enum' || prop === 'default' || prop === 'required';
}

var helpers = {
  isURL: isURL,
  parseURI: parseURI,
  isKeyword: isKeyword,
  resolveURL: resolveURL,
  getDocumentURI: getDocumentURI
};

var findReference = createCommonjsModule(function (module) {
'use strict';



function get(obj, path) {
  var hash = path.split('#')[1];

  var parts = hash.split('/').slice(1);

  while (parts.length) {
    var key = decodeURIComponent(parts.shift()).replace(/~1/g, '/').replace(/~0/g, '~');

    if (typeof obj[key] === 'undefined') {
      throw new Error('JSON pointer not found: ' + path);
    }

    obj = obj[key];
  }

  return obj;
}

var find = module.exports = function(id, refs) {
  var target = refs[id] || refs[id.split('#')[1]] || refs[helpers.getDocumentURI(id)];

  if (target) {
    target = id.indexOf('#/') > -1 ? get(target, id) : target;
  } else {
    for (var key in refs) {
      if (helpers.resolveURL(refs[key].id, id) === refs[key].id) {
        target = refs[key];
        break;
      }
    }
  }

  if (!target) {
    throw new Error('Reference not found: ' + id);
  }

  while (target.$ref) {
    target = find(target.$ref, refs);
  }

  return target;
};
});

var deepExtend_1 = createCommonjsModule(function (module) {
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2015 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

function isSpecificValue(val) {
	return (
		val instanceof Buffer
		|| val instanceof Date
		|| val instanceof RegExp
	) ? true : false;
}

function cloneSpecificValue(val) {
	if (val instanceof Buffer) {
		var x = new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = target[key]; // source value
			val = obj[key]; // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};
});

'use strict';







function copy(_, obj, refs, parent, resolve) {
  var target =  Array.isArray(obj) ? [] : {};

  if (typeof obj.$ref === 'string') {
    var id = obj.$ref;
    var base = helpers.getDocumentURI(id);
    var local = id.indexOf('#/') > -1;

    if (local || (resolve && base !== parent)) {
      var fixed = findReference(id, refs);

      deepExtend_1(obj, fixed);

      delete obj.$ref;
      delete obj.id;
    }

    if (_[id]) {
      return obj;
    }

    _[id] = 1;
  }

  for (var prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null && !helpers.isKeyword(prop)) {
      target[prop] = copy(_, obj[prop], refs, parent, resolve);
    } else {
      target[prop] = obj[prop];
    }
  }

  return target;
}

var resolveSchema = function(obj, refs, resolve) {
  var fixedId = helpers.resolveURL(obj.$schema, obj.id),
      parent = helpers.getDocumentURI(fixedId);

  return copy({}, obj, refs, parent, resolve);
};

var cloneObj = createCommonjsModule(function (module) {
'use strict';

var clone = module.exports = function(obj, seen) {
  seen = seen || [];

  if (seen.indexOf(obj) > -1) {
    throw new Error('unable dereference circular structures');
  }

  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  seen = seen.concat([obj]);

  var target = Array.isArray(obj) ? [] : {};

  function copy(key, value) {
    target[key] = clone(value, seen);
  }

  if (Array.isArray(target)) {
    obj.forEach(function(value, key) {
      copy(key, value);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(function(key) {
      copy(key, obj[key]);
    });
  }

  return target;
};
});

'use strict';





var SCHEMA_URI = [
  'http://json-schema.org/schema#',
  'http://json-schema.org/draft-04/schema#'
];

function expand(obj, parent, callback) {
  if (obj) {
    var id = typeof obj.id === 'string' ? obj.id : '#';

    if (!helpers.isURL(id)) {
      id = helpers.resolveURL(parent === id ? null : parent, id);
    }

    if (typeof obj.$ref === 'string' && !helpers.isURL(obj.$ref)) {
      obj.$ref = helpers.resolveURL(id, obj.$ref);
    }

    if (typeof obj.id === 'string') {
      obj.id = parent = id;
    }
  }

  for (var key in obj) {
    var value = obj[key];

    if (typeof value === 'object' && value !== null && !helpers.isKeyword(key)) {
      expand(value, parent, callback);
    }
  }

  if (typeof callback === 'function') {
    callback(obj);
  }
}

var normalizeSchema = function(fakeroot, schema, push) {
  if (typeof fakeroot === 'object') {
    push = schema;
    schema = fakeroot;
    fakeroot = null;
  }

  var base = fakeroot || '',
      copy = cloneObj(schema);

  if (copy.$schema && SCHEMA_URI.indexOf(copy.$schema) === -1) {
    throw new Error('Unsupported schema version (v4 only)');
  }

  base = helpers.resolveURL(copy.$schema || SCHEMA_URI[0], base);

  expand(copy, helpers.resolveURL(copy.id || '#', base), push);

  copy.id = copy.id || base;

  return copy;
};

var lib$4 = createCommonjsModule(function (module) {
'use strict';



helpers.findByRef = findReference;
helpers.resolveSchema = resolveSchema;
helpers.normalizeSchema = normalizeSchema;

var instance = module.exports = function() {
  function $ref(fakeroot, schema, refs, ex) {
    if (typeof fakeroot === 'object') {
      ex = refs;
      refs = schema;
      schema = fakeroot;
      fakeroot = undefined;
    }

    if (typeof schema !== 'object') {
      throw new Error('schema must be an object');
    }

    if (typeof refs === 'object' && refs !== null) {
      var aux = refs;

      refs = [];

      for (var k in aux) {
        aux[k].id = aux[k].id || k;
        refs.push(aux[k]);
      }
    }

    if (typeof refs !== 'undefined' && !Array.isArray(refs)) {
      ex = !!refs;
      refs = [];
    }

    function push(ref) {
      if (typeof ref.id === 'string') {
        var id = helpers.resolveURL(fakeroot, ref.id).replace(/\/#?$/, '');

        if (id.indexOf('#') > -1) {
          var parts = id.split('#');

          if (parts[1].charAt() === '/') {
            id = parts[0];
          } else {
            id = parts[1] || parts[0];
          }
        }

        if (!$ref.refs[id]) {
          $ref.refs[id] = ref;
        }
      }
    }

    (refs || []).concat([schema]).forEach(function(ref) {
      schema = helpers.normalizeSchema(fakeroot, ref, push);
      push(schema);
    });

    return helpers.resolveSchema(schema, $ref.refs, ex);
  }

  $ref.refs = {};
  $ref.util = helpers;

  return $ref;
};

instance.util = helpers;
});

var tslib_1 = ( tslib_es6 && undefined ) || tslib_es6;

function _interopDefault$1 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var RandExp = _interopDefault$1(randexp$1$1);

var deref = _interopDefault$1(lib$4);

/**
 * This class defines a registry for custom formats used within JSF.
 */
var Registry = /** @class */ (function () {
    function Registry() {
        // empty by default
        this.data = {};
    }
    /**
     * Registers custom format
     */
    Registry.prototype.register = function (name, callback) {
        this.data[name] = callback;
    };
    /**
     * Register many formats at one shot
     */
    Registry.prototype.registerMany = function (formats) {
        for (var name in formats) {
            this.data[name] = formats[name];
        }
    };
    /**
     * Returns element by registry key
     */
    Registry.prototype.get = function (name) {
        var format = this.data[name];
        if (typeof format === 'undefined') {
            throw new Error('unknown registry key ' + JSON.stringify(name));
        }
        return format;
    };
    /**
     * Returns the whole registry content
     */
    Registry.prototype.list = function () {
        return this.data;
    };
    return Registry;
}());

/**
 * This class defines a registry for custom formats used within JSF.
 */
var OptionRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(OptionRegistry, _super);
    function OptionRegistry() {
        var _this = _super.call(this) || this;
        _this.data['failOnInvalidTypes'] = true;
        _this.data['defaultInvalidTypeProduct'] = null;
        _this.data['useDefaultValue'] = false;
        _this.data['requiredOnly'] = false;
        _this.data['maxItems'] = null;
        _this.data['maxLength'] = null;
        _this.data['defaultMinItems'] = 0;
        _this.data['defaultRandExpMax'] = 10;
        _this.data['alwaysFakeOptionals'] = false;
        _this.data['random'] = Math.random;
        return _this;
    }
    return OptionRegistry;
}(Registry));

// instantiate
var registry = new OptionRegistry();
/**
 * Custom option API
 *
 * @param nameOrOptionMap
 * @returns {any}
 */
function optionAPI(nameOrOptionMap) {
    if (typeof nameOrOptionMap === 'string') {
        return registry.get(nameOrOptionMap);
    }
    else {
        return registry.registerMany(nameOrOptionMap);
    }
}

// set maximum default, see #193
RandExp.prototype.max = 10;
// same implementation as the original except using our random
RandExp.prototype.randInt = function (a, b) {
    return a + Math.floor(optionAPI('random')() * (1 + b - a));
};
/**
 * Container is used to wrap external libraries (faker, chance, casual, randexp) that are used among the whole codebase. These
 * libraries might be configured, customized, etc. and each internal JSF module needs to access those instances instead
 * of pure npm module instances. This class supports consistent access to these instances.
 */
var Container = /** @class */ (function () {
    function Container() {
        // static requires - handle both initial dependency load (deps will be available
        // among other modules) as well as they will be included by browserify AST
        this.registry = {
            faker: null,
            chance: null,
            casual: null,
            // randexp is required for "pattern" values
            randexp: RandExp
        };
    }
    /**
     * Override dependency given by name
     * @param name
     * @param callback
     */
    Container.prototype.extend = function (name, callback) {
        if (typeof this.registry[name] === 'undefined') {
            throw new ReferenceError('"' + name + '" dependency is not allowed.');
        }
        this.registry[name] = callback(this.registry[name]);
    };
    /**
     * Returns dependency given by name
     * @param name
     * @returns {Dependency}
     */
    Container.prototype.get = function (name) {
        if (typeof this.registry[name] === 'undefined') {
            throw new ReferenceError('"' + name + '" dependency doesn\'t exist.');
        }
        else if (name === 'randexp') {
            var RandExp_ = this.registry['randexp'];
            // wrapped generator
            return function (pattern) {
                var re = new RandExp_(pattern);
                // apply given setting
                re.max = optionAPI('defaultRandExpMax');
                return re.gen();
            };
        }
        return this.registry[name];
    };
    /**
     * Returns all dependencies
     *
     * @returns {Registry}
     */
    Container.prototype.getAll = function () {
        return {
            faker: this.get('faker'),
            chance: this.get('chance'),
            randexp: this.get('randexp'),
            casual: this.get('casual')
        };
    };
    return Container;
}());
// TODO move instantiation somewhere else (out from class file)
// instantiate
var container = new Container();

// instantiate
var registry$1 = new Registry();
/**
 * Custom format API
 *
 * @see https://github.com/json-schema-faker/json-schema-faker#custom-formats
 * @param nameOrFormatMap
 * @param callback
 * @returns {any}
 */
function formatAPI(nameOrFormatMap, callback) {
    if (typeof nameOrFormatMap === 'undefined') {
        return registry$1.list();
    }
    else if (typeof nameOrFormatMap === 'string') {
        if (typeof callback === 'function') {
            registry$1.register(nameOrFormatMap, callback);
        }
        else {
            return registry$1.get(nameOrFormatMap);
        }
    }
    else {
        registry$1.registerMany(nameOrFormatMap);
    }
}

/// <reference path="../index.d.ts" />
/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */
function pick(collection) {
    return collection[Math.floor(optionAPI('random')() * collection.length)];
}
/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */
function shuffle(collection) {
    var tmp, key, copy = collection.slice(), length = collection.length;
    for (; length > 0;) {
        key = Math.floor(optionAPI('random')() * length);
        // swap
        tmp = copy[--length];
        copy[length] = copy[key];
        copy[key] = tmp;
    }
    return copy;
}
/**
 * These values determine default range for random.number function
 *
 * @type {number}
 */
var MIN_NUMBER = -100;
var MAX_NUMBER = 100;
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @see http://stackoverflow.com/a/1527820/769384
 */
function getRandomInt(min, max) {
    return Math.floor(optionAPI('random')() * (max - min + 1)) + min;
}
/**
 * Generates random number according to parameters passed
 *
 * @param min
 * @param max
 * @param defMin
 * @param defMax
 * @param hasPrecision
 * @returns {number}
 */
function number(min, max, defMin, defMax, hasPrecision) {
    if (hasPrecision === void 0) { hasPrecision = false; }
    defMin = typeof defMin === 'undefined' ? MIN_NUMBER : defMin;
    defMax = typeof defMax === 'undefined' ? MAX_NUMBER : defMax;
    min = typeof min === 'undefined' ? defMin : min;
    max = typeof max === 'undefined' ? defMax : max;
    if (max < min) {
        max += min;
    }
    var result = getRandomInt(min, max);
    if (!hasPrecision) {
        return parseInt(result + '', 10);
    }
    return result;
}
var random = {
    pick: pick,
    shuffle: shuffle,
    number: number,
};

var ParseError = /** @class */ (function (_super) {
    tslib_1.__extends(ParseError, _super);
    function ParseError(message, path) {
        var _this = _super.call(this) || this;
        _this.path = path;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = 'ParseError';
        _this.message = message;
        _this.path = path;
        return _this;
    }
    return ParseError;
}(Error));

var inferredProperties = {
    array: [
        'additionalItems',
        'items',
        'maxItems',
        'minItems',
        'uniqueItems'
    ],
    integer: [
        'exclusiveMaximum',
        'exclusiveMinimum',
        'maximum',
        'minimum',
        'multipleOf'
    ],
    object: [
        'additionalProperties',
        'dependencies',
        'maxProperties',
        'minProperties',
        'patternProperties',
        'properties',
        'required'
    ],
    string: [
        'maxLength',
        'minLength',
        'pattern'
    ]
};
inferredProperties.number = inferredProperties.integer;
var subschemaProperties = [
    'additionalItems',
    'items',
    'additionalProperties',
    'dependencies',
    'patternProperties',
    'properties'
];
/**
 * Iterates through all keys of `obj` and:
 * - checks whether those keys match properties of a given inferred type
 * - makes sure that `obj` is not a subschema; _Do not attempt to infer properties named as subschema containers. The
 * reason for this is that any property name within those containers that matches one of the properties used for
 * inferring missing type values causes the container itself to get processed which leads to invalid output. (Issue 62)_
 *
 * @returns {boolean}
 */
function matchesType(obj, lastElementInPath, inferredTypeProperties) {
    return Object.keys(obj).filter(function (prop) {
        var isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1, inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;
        if (inferredPropertyFound && !isSubschema) {
            return true;
        }
    }).length > 0;
}
/**
 * Checks whether given `obj` type might be inferred. The mechanism iterates through all inferred types definitions,
 * tries to match allowed properties with properties of given `obj`. Returns type name, if inferred, or null.
 *
 * @returns {string|null}
 */
function inferType(obj, schemaPath) {
    for (var typeName in inferredProperties) {
        var lastElementInPath = schemaPath[schemaPath.length - 1];
        if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
            return typeName;
        }
    }
}

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator() {
    return optionAPI('random')() > 0.5;
}

var booleanType = booleanGenerator;

/**
 * Generates null value.
 *
 * @returns {null}
 */
function nullGenerator() {
    return null;
}

var nullType = nullGenerator;

function getSubAttribute(obj, dotSeparatedKey) {
    var keyElements = dotSeparatedKey.split('.');
    while (keyElements.length) {
        var prop = keyElements.shift();
        if (!obj[prop]) {
            break;
        }
        obj = obj[prop];
    }
    return obj;
}
/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @param properties
 * @returns {boolean}
 */
function hasProperties(obj) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return properties.filter(function (key) {
        return typeof obj[key] !== 'undefined';
    }).length > 0;
}
/**
 * Returns typecasted value.
 * External generators (faker, chance, casual) may return data in non-expected formats, such as string, when you might expect an
 * integer. This function is used to force the typecast.
 *
 * @param value
 * @param targetType
 * @returns {any}
 */
function typecast(value, targetType) {
    switch (targetType) {
        case 'integer':
            return parseInt(value, 10);
        case 'number':
            return parseFloat(value);
        case 'string':
            return '' + value;
        case 'boolean':
            return !!value;
        default:
            return value;
    }
}
function clone(arr) {
    var out = [];
    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            out[index] = Array.isArray(item) ? clone(item) : merge({}, item);
        }
        else {
            out[index] = item;
        }
    });
    return out;
}
// TODO refactor merge function
function merge(a, b) {
    for (var key in b) {
        if (typeof b[key] !== 'object' || b[key] === null) {
            a[key] = b[key];
        }
        else if (Array.isArray(b[key])) {
            a[key] = (a[key] || []).concat(clone(b[key]));
        }
        else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
            a[key] = merge({}, b[key]);
        }
        else {
            a[key] = merge(a[key], b[key]);
        }
    }
    return a;
}
var utils = {
    getSubAttribute: getSubAttribute,
    hasProperties: hasProperties,
    typecast: typecast,
    clone: clone,
    merge: merge
};

// TODO provide types
function unique(path, items, value, sample, resolve, traverseCallback) {
    var tmp = [], seen = [];
    function walk(obj) {
        var json = JSON.stringify(obj);
        if (seen.indexOf(json) === -1) {
            seen.push(json);
            tmp.push(obj);
        }
    }
    items.forEach(walk);
    // TODO: find a better solution?
    var limit = 100;
    while (tmp.length !== items.length) {
        walk(traverseCallback(value.items || sample, path, resolve));
        if (!limit--) {
            break;
        }
    }
    return tmp;
}
// TODO provide types
var arrayType = function arrayType(value, path, resolve, traverseCallback) {
    var items = [];
    if (!(value.items || value.additionalItems)) {
        if (utils.hasProperties(value, 'minItems', 'maxItems', 'uniqueItems')) {
            throw new ParseError('missing items for ' + JSON.stringify(value), path);
        }
        return items;
    }
    // see http://stackoverflow.com/a/38355228/769384
    // after type guards support subproperties (in TS 2.0) we can simplify below to (value.items instanceof Array)
    // so that value.items.map becomes recognized for typescript compiler
    var tmpItems = value.items;
    if (tmpItems instanceof Array) {
        return Array.prototype.concat.apply(items, tmpItems.map(function (item, key) {
            var itemSubpath = path.concat(['items', key + '']);
            return traverseCallback(item, itemSubpath, resolve);
        }));
    }
    var minItems = value.minItems;
    var maxItems = value.maxItems;
    if (optionAPI('defaultMinItems') && minItems === undefined) {
        // fix boundaries
        minItems = !maxItems
            ? optionAPI('defaultMinItems')
            : Math.min(optionAPI('defaultMinItems'), maxItems);
    }
    if (optionAPI('maxItems')) {
        // Don't allow user to set max items above our maximum
        if (maxItems && maxItems > optionAPI('maxItems')) {
            maxItems = optionAPI('maxItems');
        }
        // Don't allow user to set min items above our maximum
        if (minItems && minItems > optionAPI('maxItems')) {
            minItems = maxItems;
        }
    }
    var length = random.number(minItems, maxItems, 1, 5), 
    // TODO below looks bad. Should additionalItems be copied as-is?
    sample = typeof value.additionalItems === 'object' ? value.additionalItems : {};
    for (var current = items.length; current < length; current++) {
        var itemSubpath = path.concat(['items', current + '']);
        var element = traverseCallback(value.items || sample, itemSubpath, resolve);
        items.push(element);
    }
    if (value.uniqueItems) {
        return unique(path.concat(['items']), items, value, sample, resolve, traverseCallback);
    }
    return items;
};

var MIN_INTEGER = -100000000;
var MAX_INTEGER = 100000000;
var numberType = function numberType(value) {
    var min = typeof value.minimum === 'undefined' ? MIN_INTEGER : value.minimum, max = typeof value.maximum === 'undefined' ? MAX_INTEGER : value.maximum, multipleOf = value.multipleOf;
    if (multipleOf) {
        max = Math.floor(max / multipleOf) * multipleOf;
        min = Math.ceil(min / multipleOf) * multipleOf;
    }
    if (value.exclusiveMinimum && value.minimum && min === value.minimum) {
        min += multipleOf || 1;
    }
    if (value.exclusiveMaximum && value.maximum && max === value.maximum) {
        max -= multipleOf || 1;
    }
    if (min > max) {
        return NaN;
    }
    if (multipleOf) {
        return Math.floor(random.number(min, max) / multipleOf) * multipleOf;
    }
    return random.number(min, max, undefined, undefined, true);
};

// The `integer` type is just a wrapper for the `number` type. The `number` type
// returns floating point numbers, and `integer` type truncates the fraction
// part, leaving the result as an integer.
var integerType = function integerType(value) {
    var generated = numberType(value);
    // whether the generated number is positive or negative, need to use either
    // floor (positive) or ceil (negative) function to get rid of the fraction
    return generated > 0 ? Math.floor(generated) : Math.ceil(generated);
};

var LIPSUM_WORDS = ('Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore'
    + ' et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'
    + ' commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'
    + ' pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est'
    + ' laborum').split(' ');
/**
 * Generates randomized array of single lorem ipsum words.
 *
 * @param length
 * @returns {Array.<string>}
 */
function wordsGenerator(length) {
    var words = random.shuffle(LIPSUM_WORDS);
    return words.slice(0, length);
}

// TODO: tsify
function isArray(obj) {
    return obj && Array.isArray(obj);
}
function isObject(obj) {
    return obj && obj !== null && typeof obj === 'object';
}
function hasNothing(obj) {
    if (isArray(obj)) {
        return obj.length === 0;
    }
    if (isObject(obj)) {
        return Object.keys(obj).length === 0;
    }
    return typeof obj === 'undefined' || obj === null;
}
function removeProps(obj, key, parent, required) {
    var i, value, isFullyEmpty = true;
    if (isArray(obj)) {
        for (i = 0; i < obj.length; ++i) {
            value = obj[i];
            if (isObject(value)) {
                removeProps(value, i, obj);
            }
            if (hasNothing(value)) {
                obj.splice(i--, 1);
            }
            else {
                isFullyEmpty = false;
            }
        }
    }
    else {
        for (i in obj) {
            value = obj[i];
            if (required && required.indexOf(i) > -1) {
                isFullyEmpty = false;
                removeProps(value);
                continue;
            }
            if (isObject(value)) {
                removeProps(value, i, obj);
            }
            if (hasNothing(value)) {
                delete obj[i];
            }
            else {
                isFullyEmpty = false;
            }
        }
    }
    if (typeof key !== 'undefined' && isFullyEmpty) {
        delete parent[key];
        removeProps(obj);
    }
}
var clean = function (obj, required) {
    removeProps(obj, undefined, undefined, required);
    return obj;
};

var randexp = container.get('randexp');
// fallback generator
var anyType = { type: ['string', 'number', 'integer', 'boolean'] };
// TODO provide types
var objectType = function objectType(value, path, resolve, traverseCallback) {
    var props = {};
    var properties = value.properties || {};
    var patternProperties = value.patternProperties || {};
    var requiredProperties = (value.required || []).slice();
    var allowsAdditional = value.additionalProperties === false ? false : true;
    var propertyKeys = Object.keys(properties);
    var patternPropertyKeys = Object.keys(patternProperties);
    var additionalProperties = allowsAdditional
        ? (value.additionalProperties === true ? {} : value.additionalProperties)
        : null;
    if (!allowsAdditional &&
        propertyKeys.length === 0 &&
        patternPropertyKeys.length === 0 &&
        utils.hasProperties(value, 'minProperties', 'maxProperties', 'dependencies', 'required')) {
        throw new ParseError('missing properties for:\n' + JSON.stringify(value, null, '  '), path);
    }
    if (optionAPI('requiredOnly') === true) {
        requiredProperties.forEach(function (key) {
            if (properties[key]) {
                props[key] = properties[key];
            }
        });
        return clean(traverseCallback(props, path.concat(['properties']), resolve), value.required);
    }
    var min = Math.max(value.minProperties || 0, requiredProperties.length);
    var max = Math.max(value.maxProperties || random.number(min, min + 5));
    random.shuffle(patternPropertyKeys.concat(propertyKeys)).forEach(function (_key) {
        if (requiredProperties.indexOf(_key) === -1) {
            requiredProperties.push(_key);
        }
    });
    // properties are read from right-to-left
    var _props = optionAPI('alwaysFakeOptionals') ? requiredProperties
        : requiredProperties.slice(0, random.number(min, max));
    _props.forEach(function (key) {
        // first ones are the required properies
        if (properties[key]) {
            props[key] = properties[key];
        }
        else {
            var found;
            // then try patternProperties
            patternPropertyKeys.forEach(function (_key) {
                if (key.match(new RegExp(_key))) {
                    found = true;
                    props[randexp(key)] = patternProperties[_key];
                }
            });
            if (!found) {
                // try patternProperties again,
                var subschema = patternProperties[key] || additionalProperties;
                if (subschema) {
                    // otherwise we can use additionalProperties?
                    props[patternProperties[key] ? randexp(key) : key] = subschema;
                }
            }
        }
    });
    var current = Object.keys(props).length;
    while (true) {
        if (!(patternPropertyKeys.length || allowsAdditional)) {
            break;
        }
        if (current >= min) {
            break;
        }
        if (allowsAdditional) {
            var word = wordsGenerator(1) + randexp('[a-f\\d]{1,3}');
            if (!props[word]) {
                props[word] = additionalProperties || anyType;
                current += 1;
            }
        }
        patternPropertyKeys.forEach(function (_key) {
            var word = randexp(_key);
            if (!props[word]) {
                props[word] = patternProperties[_key];
                current += 1;
            }
        });
    }
    if (!allowsAdditional && current < min) {
        throw new ParseError('properties constraints were too strong to successfully generate a valid object for:\n' +
            JSON.stringify(value, null, '  '), path);
    }
    return clean(traverseCallback(props, path.concat(['properties']), resolve), value.required);
};

/**
 * Helper function used by thunkGenerator to produce some words for the final result.
 *
 * @returns {string}
 */
function produce() {
    var length = random.number(1, 5);
    return wordsGenerator(length).join(' ');
}
/**
 * Generates randomized concatenated string based on words generator.
 *
 * @returns {string}
 */
function thunkGenerator(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 140; }
    var min = Math.max(0, min), max = random.number(min, max), result = produce();
    // append until length is reached
    while (result.length < min) {
        result += produce();
    }
    // cut if needed
    if (result.length > max) {
        result = result.substr(0, max);
    }
    return result;
}

/**
 * Generates randomized ipv4 address.
 *
 * @returns {string}
 */
function ipv4Generator() {
    return [0, 0, 0, 0].map(function () {
        return random.number(0, 255);
    }).join('.');
}

/**
 * Generates randomized date time ISO format string.
 *
 * @returns {string}
 */
function dateTimeGenerator() {
    return new Date(random.number(0, 100000000000000)).toISOString();
}

var randexp$2 = container.get('randexp');
/**
 * Predefined core formats
 * @type {[key: string]: string}
 */
var regexps = {
    email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
    hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
    ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
    uri: '[a-zA-Z][a-zA-Z0-9+-.]*'
};
/**
 * Generates randomized string basing on a built-in regex format
 *
 * @param coreFormat
 * @returns {string}
 */
function coreFormatGenerator(coreFormat) {
    return randexp$2(regexps[coreFormat]).replace(/\{(\w+)\}/, function (match, key) {
        return randexp$2(regexps[key]);
    });
}

var randexp$1 = container.get('randexp');
function generateFormat(value) {
    switch (value.format) {
        case 'date-time':
            return dateTimeGenerator();
        case 'ipv4':
            return ipv4Generator();
        case 'regex':
            // TODO: discuss
            return '.+?';
        case 'email':
        case 'hostname':
        case 'ipv6':
        case 'uri':
            return coreFormatGenerator(value.format);
        default:
            var callback = formatAPI(value.format);
            return callback(container.getAll(), value);
    }
}
var stringType = function stringType(value) {
    var output;
    var minLength = value.minLength;
    var maxLength = value.maxLength;
    if (optionAPI('maxLength')) {
        // Don't allow user to set max length above our maximum
        if (maxLength && maxLength > optionAPI('maxLength')) {
            maxLength = optionAPI('maxLength');
        }
        // Don't allow user to set min length above our maximum
        if (minLength && minLength > optionAPI('maxLength')) {
            minLength = optionAPI('maxLength');
        }
    }
    if (value.format) {
        output = generateFormat(value);
    }
    else if (value.pattern) {
        output = randexp$1(value.pattern);
    }
    else {
        output = thunkGenerator(minLength, maxLength);
    }
    while (output.length < minLength) {
        output += optionAPI('random')() > 0.7 ? thunkGenerator() : randexp$1('.+');
    }
    if (output.length > maxLength) {
        output = output.substr(0, maxLength);
    }
    return output;
};

var externalType = function externalType(value, path) {
    var libraryName = value.faker ? 'faker' : (value.chance ? 'chance' : 'casual'), libraryModule = container.get(libraryName), key = value.faker || value.chance || value.casual, path = key, args = [];
    if (typeof path === 'object') {
        path = Object.keys(path)[0];
        if (Array.isArray(key[path])) {
            args = key[path];
        }
        else {
            args.push(key[path]);
        }
    }
    var genFunction = utils.getSubAttribute(libraryModule, path);
    try {
        // see #116, #117 - faker.js 3.1.0 introduced local dependencies between generators
        // making jsf break after upgrading from 3.0.1
        var contextObject = libraryModule;
        if (libraryName === 'faker') {
            var parts = path.split('.');
            while (parts.length > 1) {
                contextObject = libraryModule[parts.shift()];
            }
            genFunction = contextObject[parts[0]];
        }
    }
    catch (e) {
        throw new Error('cannot resolve ' + libraryName + '-generator for ' + JSON.stringify(key));
    }
    if (typeof genFunction !== 'function') {
        if (libraryName === 'casual') {
            return utils.typecast(genFunction, value.type);
        }
        throw new Error('unknown ' + libraryName + '-generator for ' + JSON.stringify(key));
    }
    var result = genFunction.apply(contextObject, args);
    return utils.typecast(result, value.type);
};

var typeMap = {
    boolean: booleanType,
    null: nullType,
    array: arrayType,
    integer: integerType,
    number: numberType,
    object: objectType,
    string: stringType,
    external: externalType
};

function isExternal(schema) {
    return schema.faker || schema.chance || schema.casual;
}
function reduceExternal(schema, path) {
    if (schema['x-faker']) {
        schema.faker = schema['x-faker'];
    }
    if (schema['x-chance']) {
        schema.chance = schema['x-chance'];
    }
    if (schema['x-casual']) {
        schema.casual = schema['x-casual'];
    }
    var count = (schema.faker !== undefined ? 1 : 0) +
        (schema.chance !== undefined ? 1 : 0) +
        (schema.casual !== undefined ? 1 : 0);
    if (count > 1) {
        throw new ParseError('ambiguous generator mixing faker, chance or casual: ' + JSON.stringify(schema), path);
    }
    return schema;
}
// TODO provide types
function traverse(schema, path, resolve) {
    resolve(schema);
    if (Array.isArray(schema.enum)) {
        return random.pick(schema.enum);
    }
    if (optionAPI('useDefaultValue') && 'default' in schema) {
        return schema.default;
    }
    // TODO remove the ugly overcome
    var type = schema.type;
    if (Array.isArray(type)) {
        type = random.pick(type);
    }
    else if (typeof type === 'undefined') {
        // Attempt to infer the type
        type = inferType(schema, path) || type;
    }
    schema = reduceExternal(schema, path);
    if (isExternal(schema)) {
        type = 'external';
    }
    if (typeof type === 'string') {
        if (!typeMap[type]) {
            if (optionAPI('failOnInvalidTypes')) {
                throw new ParseError('unknown primitive ' + JSON.stringify(type), path.concat(['type']));
            }
            else {
                return optionAPI('defaultInvalidTypeProduct');
            }
        }
        else {
            try {
                return typeMap[type](schema, path, resolve, traverse);
            }
            catch (e) {
                if (typeof e.path === 'undefined') {
                    throw new ParseError(e.message, path);
                }
                throw e;
            }
        }
    }
    var copy = {};
    if (Array.isArray(schema)) {
        copy = [];
    }
    for (var prop in schema) {
        if (typeof schema[prop] === 'object' && prop !== 'definitions') {
            copy[prop] = traverse(schema[prop], path.concat([prop]), resolve);
        }
        else {
            copy[prop] = schema[prop];
        }
    }
    return copy;
}

function isKey(prop) {
    return prop === 'enum' || prop === 'default' || prop === 'required' || prop === 'definitions';
}
// TODO provide types
function run(schema, refs, ex) {
    var $ = deref();
    var _ = {};
    try {
        return traverse($(schema, refs, ex), [], function reduce(sub, maxReduceDepth) {
            if (typeof maxReduceDepth === 'undefined') {
                maxReduceDepth = random.number(1, 3);
            }
            if (!sub) {
                return null;
            }
            if (typeof sub.$ref === 'string') {
                var id = sub.$ref;
                // match and increment seen references
                if (!_[id]) {
                    _[id] = 0;
                }
                _[id] += 1;
                // cleanup
                delete sub.$ref;
                if (_[id] > maxReduceDepth) {
                    delete sub.oneOf;
                    delete sub.anyOf;
                    delete sub.allOf;
                    return sub;
                }
                utils.merge(sub, $.util.findByRef(id, $.refs));
            }
            if (Array.isArray(sub.allOf)) {
                var schemas = sub.allOf;
                delete sub.allOf;
                // this is the only case where all sub-schemas
                // must be resolved before any merge
                schemas.forEach(function (schema) {
                    utils.merge(sub, reduce(schema, maxReduceDepth + 1));
                });
            }
            if (Array.isArray(sub.oneOf || sub.anyOf)) {
                var mix = sub.oneOf || sub.anyOf;
                delete sub.anyOf;
                delete sub.oneOf;
                utils.merge(sub, random.pick(mix));
            }
            for (var prop in sub) {
                if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !isKey(prop)) {
                    sub[prop] = reduce(sub[prop], maxReduceDepth);
                }
            }
            return sub;
        });
    }
    catch (e) {
        if (e.path) {
            throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
        }
        else {
            throw e;
        }
    }
}

var jsf = function (schema, refs) {
    return run(schema, refs);
};
jsf.format = formatAPI;
jsf.option = optionAPI;
// returns itself for chaining
jsf.extend = function (name, cb) {
    container.extend(name, cb);
    return jsf;
};
var VERSION="0.4.5";
jsf.version = VERSION;

var lib = jsf;

return lib;

})));
