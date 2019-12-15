(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/*!

 diff v3.5.0

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JsDiff"] = factory();
	else
		root["JsDiff"] = factory();
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

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.merge = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffArrays = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;

	/*istanbul ignore end*/var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_character = __webpack_require__(2) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_word = __webpack_require__(3) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_sentence = __webpack_require__(6) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_css = __webpack_require__(7) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_json = __webpack_require__(8) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_array = __webpack_require__(9) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_apply = __webpack_require__(10) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_merge = __webpack_require__(13) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_create = __webpack_require__(14) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_dmp = __webpack_require__(16) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_xml = __webpack_require__(17) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/* See LICENSE file for terms of use */

	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */
	exports. /*istanbul ignore end*/Diff = _base2['default'];
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffChars = _character.diffChars;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWords = _word.diffWords;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = _word.diffWordsWithSpace;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffLines = _line.diffLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = _line.diffTrimmedLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffSentences = _sentence.diffSentences;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffCss = _css.diffCss;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffJson = _json.diffJson;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffArrays = _array.diffArrays;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/structuredPatch = _create.structuredPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = _create.createTwoFilesPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = _create.createPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatch = _apply.applyPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = _apply.applyPatches;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/parsePatch = _parse.parsePatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = _merge.merge;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToDMP = _dmp.convertChangesToDMP;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToXML = _xml.convertChangesToXML;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = _json.canonicalize;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports['default'] = /*istanbul ignore end*/Diff;
	function Diff() {}

	Diff.prototype = {
	  /*istanbul ignore start*/ /*istanbul ignore end*/diff: function diff(oldString, newString) {
	    /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var callback = options.callback;
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    this.options = options;

	    var self = this;

	    function done(value) {
	      if (callback) {
	        setTimeout(function () {
	          callback(undefined, value);
	        }, 0);
	        return true;
	      } else {
	        return value;
	      }
	    }

	    // Allow subclasses to massage the input prior to running
	    oldString = this.castInput(oldString);
	    newString = this.castInput(newString);

	    oldString = this.removeEmpty(this.tokenize(oldString));
	    newString = this.removeEmpty(this.tokenize(newString));

	    var newLen = newString.length,
	        oldLen = oldString.length;
	    var editLength = 1;
	    var maxEditLength = newLen + oldLen;
	    var bestPath = [{ newPos: -1, components: [] }];

	    // Seed editLength = 0, i.e. the content starts with the same values
	    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
	    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	      // Identity per the equality and tokenizer
	      return done([{ value: this.join(newString), count: newString.length }]);
	    }

	    // Main worker method. checks all permutations of a given edit length for acceptance.
	    function execEditLength() {
	      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	        var basePath = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	        var addPath = bestPath[diagonalPath - 1],
	            removePath = bestPath[diagonalPath + 1],
	            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
	        if (addPath) {
	          // No one else is going to attempt to use this value, clear it
	          bestPath[diagonalPath - 1] = undefined;
	        }

	        var canAdd = addPath && addPath.newPos + 1 < newLen,
	            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
	        if (!canAdd && !canRemove) {
	          // If this path is a terminal then prune
	          bestPath[diagonalPath] = undefined;
	          continue;
	        }

	        // Select the diagonal that we want to branch from. We select the prior
	        // path whose position in the new string is the farthest from the origin
	        // and does not pass the bounds of the diff graph
	        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
	          basePath = clonePath(removePath);
	          self.pushComponent(basePath.components, undefined, true);
	        } else {
	          basePath = addPath; // No need to clone, we've pulled it from the list
	          basePath.newPos++;
	          self.pushComponent(basePath.components, true, undefined);
	        }

	        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

	        // If we have hit the end of both strings, then we are done
	        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
	          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
	        } else {
	          // Otherwise track this path as a potential candidate and continue.
	          bestPath[diagonalPath] = basePath;
	        }
	      }

	      editLength++;
	    }

	    // Performs the length of edit iteration. Is a bit fugly as this has to support the
	    // sync and async mode which is never fun. Loops over execEditLength until a value
	    // is produced.
	    if (callback) {
	      (function exec() {
	        setTimeout(function () {
	          // This should not happen, but we want to be safe.
	          /* istanbul ignore next */
	          if (editLength > maxEditLength) {
	            return callback();
	          }

	          if (!execEditLength()) {
	            exec();
	          }
	        }, 0);
	      })();
	    } else {
	      while (editLength <= maxEditLength) {
	        var ret = execEditLength();
	        if (ret) {
	          return ret;
	        }
	      }
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/pushComponent: function pushComponent(components, added, removed) {
	    var last = components[components.length - 1];
	    if (last && last.added === added && last.removed === removed) {
	      // We need to clone here as the component clone operation is just
	      // as shallow array clone
	      components[components.length - 1] = { count: last.count + 1, added: added, removed: removed };
	    } else {
	      components.push({ count: 1, added: added, removed: removed });
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
	    var newLen = newString.length,
	        oldLen = oldString.length,
	        newPos = basePath.newPos,
	        oldPos = newPos - diagonalPath,
	        commonCount = 0;
	    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	      newPos++;
	      oldPos++;
	      commonCount++;
	    }

	    if (commonCount) {
	      basePath.components.push({ count: commonCount });
	    }

	    basePath.newPos = newPos;
	    return oldPos;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/equals: function equals(left, right) {
	    if (this.options.comparator) {
	      return this.options.comparator(left, right);
	    } else {
	      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/removeEmpty: function removeEmpty(array) {
	    var ret = [];
	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }
	    return ret;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/castInput: function castInput(value) {
	    return value;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/tokenize: function tokenize(value) {
	    return value.split('');
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/join: function join(chars) {
	    return chars.join('');
	  }
	};

	function buildValues(diff, components, newString, oldString, useLongestToken) {
	  var componentPos = 0,
	      componentLen = components.length,
	      newPos = 0,
	      oldPos = 0;

	  for (; componentPos < componentLen; componentPos++) {
	    var component = components[componentPos];
	    if (!component.removed) {
	      if (!component.added && useLongestToken) {
	        var value = newString.slice(newPos, newPos + component.count);
	        value = value.map(function (value, i) {
	          var oldValue = oldString[oldPos + i];
	          return oldValue.length > value.length ? oldValue : value;
	        });

	        component.value = diff.join(value);
	      } else {
	        component.value = diff.join(newString.slice(newPos, newPos + component.count));
	      }
	      newPos += component.count;

	      // Common case
	      if (!component.added) {
	        oldPos += component.count;
	      }
	    } else {
	      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
	      oldPos += component.count;

	      // Reverse add and remove so removes are output first to match common convention
	      // The diffing algorithm is tied to add then remove output and this is the simplest
	      // route to get the desired output with minimal overhead.
	      if (componentPos && components[componentPos - 1].added) {
	        var tmp = components[componentPos - 1];
	        components[componentPos - 1] = components[componentPos];
	        components[componentPos] = tmp;
	      }
	    }
	  }

	  // Special case handle for when one terminal is ignored (i.e. whitespace).
	  // For this case we merge the terminal into the prior string and drop the change.
	  // This is only available for string mode.
	  var lastComponent = components[componentLen - 1];
	  if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
	    components[componentLen - 2].value += lastComponent.value;
	    components.pop();
	  }

	  return components;
	}

	function clonePath(path) {
	  return { newPos: path.newPos, components: path.components.slice(0) };
	}



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.characterDiff = undefined;
	exports. /*istanbul ignore end*/diffChars = diffChars;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var characterDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/characterDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	function diffChars(oldStr, newStr, options) {
	  return characterDiff.diff(oldStr, newStr, options);
	}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.wordDiff = undefined;
	exports. /*istanbul ignore end*/diffWords = diffWords;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = diffWordsWithSpace;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_params = __webpack_require__(4) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/ // Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
	//
	// Ranges and exceptions:
	// Latin-1 Supplement, 0080–00FF
	//  - U+00D7  × Multiplication sign
	//  - U+00F7  ÷ Division sign
	// Latin Extended-A, 0100–017F
	// Latin Extended-B, 0180–024F
	// IPA Extensions, 0250–02AF
	// Spacing Modifier Letters, 02B0–02FF
	//  - U+02C7  ˇ &#711;  Caron
	//  - U+02D8  ˘ &#728;  Breve
	//  - U+02D9  ˙ &#729;  Dot Above
	//  - U+02DA  ˚ &#730;  Ring Above
	//  - U+02DB  ˛ &#731;  Ogonek
	//  - U+02DC  ˜ &#732;  Small Tilde
	//  - U+02DD  ˝ &#733;  Double Acute Accent
	// Latin Extended Additional, 1E00–1EFF
	var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;

	var reWhitespace = /\S/;

	var wordDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/wordDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	wordDiff.equals = function (left, right) {
	  if (this.options.ignoreCase) {
	    left = left.toLowerCase();
	    right = right.toLowerCase();
	  }
	  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
	};
	wordDiff.tokenize = function (value) {
	  var tokens = value.split(/(\s+|\b)/);

	  // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
	  for (var i = 0; i < tokens.length - 1; i++) {
	    // If we have an empty string in the next field and we have only word chars before and after, merge
	    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
	      tokens[i] += tokens[i + 2];
	      tokens.splice(i + 1, 2);
	      i--;
	    }
	  }

	  return tokens;
	};

	function diffWords(oldStr, newStr, options) {
	  options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(options, { ignoreWhitespace: true });
	  return wordDiff.diff(oldStr, newStr, options);
	}

	function diffWordsWithSpace(oldStr, newStr, options) {
	  return wordDiff.diff(oldStr, newStr, options);
	}



/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/generateOptions = generateOptions;
	function generateOptions(options, defaults) {
	  if (typeof options === 'function') {
	    defaults.callback = options;
	  } else if (options) {
	    for (var name in options) {
	      /* istanbul ignore else */
	      if (options.hasOwnProperty(name)) {
	        defaults[name] = options[name];
	      }
	    }
	  }
	  return defaults;
	}



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.lineDiff = undefined;
	exports. /*istanbul ignore end*/diffLines = diffLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = diffTrimmedLines;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_params = __webpack_require__(4) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var lineDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/lineDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	lineDiff.tokenize = function (value) {
	  var retLines = [],
	      linesAndNewlines = value.split(/(\n|\r\n)/);

	  // Ignore the final empty token that occurs if the string ends with a new line
	  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	    linesAndNewlines.pop();
	  }

	  // Merge the content and line separators into single tokens
	  for (var i = 0; i < linesAndNewlines.length; i++) {
	    var line = linesAndNewlines[i];

	    if (i % 2 && !this.options.newlineIsToken) {
	      retLines[retLines.length - 1] += line;
	    } else {
	      if (this.options.ignoreWhitespace) {
	        line = line.trim();
	      }
	      retLines.push(line);
	    }
	  }

	  return retLines;
	};

	function diffLines(oldStr, newStr, callback) {
	  return lineDiff.diff(oldStr, newStr, callback);
	}
	function diffTrimmedLines(oldStr, newStr, callback) {
	  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
	  return lineDiff.diff(oldStr, newStr, options);
	}



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.sentenceDiff = undefined;
	exports. /*istanbul ignore end*/diffSentences = diffSentences;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var sentenceDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/sentenceDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	sentenceDiff.tokenize = function (value) {
	  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
	};

	function diffSentences(oldStr, newStr, callback) {
	  return sentenceDiff.diff(oldStr, newStr, callback);
	}



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.cssDiff = undefined;
	exports. /*istanbul ignore end*/diffCss = diffCss;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var cssDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/cssDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	cssDiff.tokenize = function (value) {
	  return value.split(/([{}:;,]|\s+)/);
	};

	function diffCss(oldStr, newStr, callback) {
	  return cssDiff.diff(oldStr, newStr, callback);
	}



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.jsonDiff = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports. /*istanbul ignore end*/diffJson = diffJson;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = canonicalize;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var objectPrototypeToString = Object.prototype.toString;

	var jsonDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/jsonDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	// Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
	jsonDiff.useLongestToken = true;

	jsonDiff.tokenize = /*istanbul ignore start*/_line.lineDiff /*istanbul ignore end*/.tokenize;
	jsonDiff.castInput = function (value) {
	  /*istanbul ignore start*/var _options = /*istanbul ignore end*/this.options,
	      undefinedReplacement = _options.undefinedReplacement,
	      _options$stringifyRep = _options.stringifyReplacer,
	      stringifyReplacer = _options$stringifyRep === undefined ? function (k, v) /*istanbul ignore start*/{
	    return (/*istanbul ignore end*/typeof v === 'undefined' ? undefinedReplacement : v
	    );
	  } : _options$stringifyRep;


	  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
	};
	jsonDiff.equals = function (left, right) {
	  return (/*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'))
	  );
	};

	function diffJson(oldObj, newObj, options) {
	  return jsonDiff.diff(oldObj, newObj, options);
	}

	// This function handles the presence of circular references by bailing out when encountering an
	// object that is already on the "stack" of items being processed. Accepts an optional replacer
	function canonicalize(obj, stack, replacementStack, replacer, key) {
	  stack = stack || [];
	  replacementStack = replacementStack || [];

	  if (replacer) {
	    obj = replacer(key, obj);
	  }

	  var i = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  for (i = 0; i < stack.length; i += 1) {
	    if (stack[i] === obj) {
	      return replacementStack[i];
	    }
	  }

	  var canonicalizedObj = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  if ('[object Array]' === objectPrototypeToString.call(obj)) {
	    stack.push(obj);
	    canonicalizedObj = new Array(obj.length);
	    replacementStack.push(canonicalizedObj);
	    for (i = 0; i < obj.length; i += 1) {
	      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
	    }
	    stack.pop();
	    replacementStack.pop();
	    return canonicalizedObj;
	  }

	  if (obj && obj.toJSON) {
	    obj = obj.toJSON();
	  }

	  if ( /*istanbul ignore start*/(typeof /*istanbul ignore end*/obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	    stack.push(obj);
	    canonicalizedObj = {};
	    replacementStack.push(canonicalizedObj);
	    var sortedKeys = [],
	        _key = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	    for (_key in obj) {
	      /* istanbul ignore else */
	      if (obj.hasOwnProperty(_key)) {
	        sortedKeys.push(_key);
	      }
	    }
	    sortedKeys.sort();
	    for (i = 0; i < sortedKeys.length; i += 1) {
	      _key = sortedKeys[i];
	      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
	    }
	    stack.pop();
	    replacementStack.pop();
	  } else {
	    canonicalizedObj = obj;
	  }
	  return canonicalizedObj;
	}



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.arrayDiff = undefined;
	exports. /*istanbul ignore end*/diffArrays = diffArrays;

	var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/var arrayDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/arrayDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();
	arrayDiff.tokenize = function (value) {
	  return value.slice();
	};
	arrayDiff.join = arrayDiff.removeEmpty = function (value) {
	  return value;
	};

	function diffArrays(oldArr, newArr, callback) {
	  return arrayDiff.diff(oldArr, newArr, callback);
	}



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/applyPatch = applyPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = applyPatches;

	var /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_distanceIterator = __webpack_require__(12) /*istanbul ignore end*/;

	/*istanbul ignore start*/var _distanceIterator2 = _interopRequireDefault(_distanceIterator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*istanbul ignore end*/function applyPatch(source, uniDiff) {
	  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (typeof uniDiff === 'string') {
	    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
	  }

	  if (Array.isArray(uniDiff)) {
	    if (uniDiff.length > 1) {
	      throw new Error('applyPatch only works with a single input.');
	    }

	    uniDiff = uniDiff[0];
	  }

	  // Apply the diff to the input
	  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
	      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
	      hunks = uniDiff.hunks,
	      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) /*istanbul ignore start*/{
	    return (/*istanbul ignore end*/line === patchContent
	    );
	  },
	      errorCount = 0,
	      fuzzFactor = options.fuzzFactor || 0,
	      minLine = 0,
	      offset = 0,
	      removeEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
	      addEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  /**
	   * Checks if the hunk exactly fits on the provided location
	   */
	  function hunkFits(hunk, toPos) {
	    for (var j = 0; j < hunk.lines.length; j++) {
	      var line = hunk.lines[j],
	          operation = line.length > 0 ? line[0] : ' ',
	          content = line.length > 0 ? line.substr(1) : line;

	      if (operation === ' ' || operation === '-') {
	        // Context sanity check
	        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
	          errorCount++;

	          if (errorCount > fuzzFactor) {
	            return false;
	          }
	        }
	        toPos++;
	      }
	    }

	    return true;
	  }

	  // Search best fit offsets for each hunk based on the previous ones
	  for (var i = 0; i < hunks.length; i++) {
	    var hunk = hunks[i],
	        maxLine = lines.length - hunk.oldLines,
	        localOffset = 0,
	        toPos = offset + hunk.oldStart - 1;

	    var iterator = /*istanbul ignore start*/(0, _distanceIterator2['default']) /*istanbul ignore end*/(toPos, minLine, maxLine);

	    for (; localOffset !== undefined; localOffset = iterator()) {
	      if (hunkFits(hunk, toPos + localOffset)) {
	        hunk.offset = offset += localOffset;
	        break;
	      }
	    }

	    if (localOffset === undefined) {
	      return false;
	    }

	    // Set lower text limit to end of the current hunk, so next ones don't try
	    // to fit over already patched text
	    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
	  }

	  // Apply patch hunks
	  var diffOffset = 0;
	  for (var _i = 0; _i < hunks.length; _i++) {
	    var _hunk = hunks[_i],
	        _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
	    diffOffset += _hunk.newLines - _hunk.oldLines;

	    if (_toPos < 0) {
	      // Creating a new file
	      _toPos = 0;
	    }

	    for (var j = 0; j < _hunk.lines.length; j++) {
	      var line = _hunk.lines[j],
	          operation = line.length > 0 ? line[0] : ' ',
	          content = line.length > 0 ? line.substr(1) : line,
	          delimiter = _hunk.linedelimiters[j];

	      if (operation === ' ') {
	        _toPos++;
	      } else if (operation === '-') {
	        lines.splice(_toPos, 1);
	        delimiters.splice(_toPos, 1);
	        /* istanbul ignore else */
	      } else if (operation === '+') {
	        lines.splice(_toPos, 0, content);
	        delimiters.splice(_toPos, 0, delimiter);
	        _toPos++;
	      } else if (operation === '\\') {
	        var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
	        if (previousOperation === '+') {
	          removeEOFNL = true;
	        } else if (previousOperation === '-') {
	          addEOFNL = true;
	        }
	      }
	    }
	  }

	  // Handle EOFNL insertion/removal
	  if (removeEOFNL) {
	    while (!lines[lines.length - 1]) {
	      lines.pop();
	      delimiters.pop();
	    }
	  } else if (addEOFNL) {
	    lines.push('');
	    delimiters.push('\n');
	  }
	  for (var _k = 0; _k < lines.length - 1; _k++) {
	    lines[_k] = lines[_k] + delimiters[_k];
	  }
	  return lines.join('');
	}

	// Wrapper that supports multiple file patches via callbacks.
	function applyPatches(uniDiff, options) {
	  if (typeof uniDiff === 'string') {
	    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
	  }

	  var currentIndex = 0;
	  function processIndex() {
	    var index = uniDiff[currentIndex++];
	    if (!index) {
	      return options.complete();
	    }

	    options.loadFile(index, function (err, data) {
	      if (err) {
	        return options.complete(err);
	      }

	      var updatedContent = applyPatch(data, index, options);
	      options.patched(index, updatedContent, function (err) {
	        if (err) {
	          return options.complete(err);
	        }

	        processIndex();
	      });
	    });
	  }
	  processIndex();
	}



/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/parsePatch = parsePatch;
	function parsePatch(uniDiff) {
	  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
	      delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
	      list = [],
	      i = 0;

	  function parseIndex() {
	    var index = {};
	    list.push(index);

	    // Parse diff metadata
	    while (i < diffstr.length) {
	      var line = diffstr[i];

	      // File header found, end parsing diff metadata
	      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
	        break;
	      }

	      // Diff index
	      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
	      if (header) {
	        index.index = header[1];
	      }

	      i++;
	    }

	    // Parse file headers if they are defined. Unified diff requires them, but
	    // there's no technical issues to have an isolated hunk without file header
	    parseFileHeader(index);
	    parseFileHeader(index);

	    // Parse hunks
	    index.hunks = [];

	    while (i < diffstr.length) {
	      var _line = diffstr[i];

	      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
	        break;
	      } else if (/^@@/.test(_line)) {
	        index.hunks.push(parseHunk());
	      } else if (_line && options.strict) {
	        // Ignore unexpected content unless in strict mode
	        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
	      } else {
	        i++;
	      }
	    }
	  }

	  // Parses the --- and +++ headers, if none are found, no lines
	  // are consumed.
	  function parseFileHeader(index) {
	    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
	    if (fileHeader) {
	      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
	      var data = fileHeader[2].split('\t', 2);
	      var fileName = data[0].replace(/\\\\/g, '\\');
	      if (/^".*"$/.test(fileName)) {
	        fileName = fileName.substr(1, fileName.length - 2);
	      }
	      index[keyPrefix + 'FileName'] = fileName;
	      index[keyPrefix + 'Header'] = (data[1] || '').trim();

	      i++;
	    }
	  }

	  // Parses a hunk
	  // This assumes that we are at the start of a hunk.
	  function parseHunk() {
	    var chunkHeaderIndex = i,
	        chunkHeaderLine = diffstr[i++],
	        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);

	    var hunk = {
	      oldStart: +chunkHeader[1],
	      oldLines: +chunkHeader[2] || 1,
	      newStart: +chunkHeader[3],
	      newLines: +chunkHeader[4] || 1,
	      lines: [],
	      linedelimiters: []
	    };

	    var addCount = 0,
	        removeCount = 0;
	    for (; i < diffstr.length; i++) {
	      // Lines starting with '---' could be mistaken for the "remove line" operation
	      // But they could be the header for the next file. Therefore prune such cases out.
	      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
	        break;
	      }
	      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

	      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
	        hunk.lines.push(diffstr[i]);
	        hunk.linedelimiters.push(delimiters[i] || '\n');

	        if (operation === '+') {
	          addCount++;
	        } else if (operation === '-') {
	          removeCount++;
	        } else if (operation === ' ') {
	          addCount++;
	          removeCount++;
	        }
	      } else {
	        break;
	      }
	    }

	    // Handle the empty block count case
	    if (!addCount && hunk.newLines === 1) {
	      hunk.newLines = 0;
	    }
	    if (!removeCount && hunk.oldLines === 1) {
	      hunk.oldLines = 0;
	    }

	    // Perform optional sanity checking
	    if (options.strict) {
	      if (addCount !== hunk.newLines) {
	        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	      if (removeCount !== hunk.oldLines) {
	        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	    }

	    return hunk;
	  }

	  while (i < diffstr.length) {
	    parseIndex();
	  }

	  return list;
	}



/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;

	exports["default"] = /*istanbul ignore end*/function (start, minLine, maxLine) {
	  var wantForward = true,
	      backwardExhausted = false,
	      forwardExhausted = false,
	      localOffset = 1;

	  return function iterator() {
	    if (wantForward && !forwardExhausted) {
	      if (backwardExhausted) {
	        localOffset++;
	      } else {
	        wantForward = false;
	      }

	      // Check if trying to fit beyond text length, and if not, check it fits
	      // after offset location (or desired location on first iteration)
	      if (start + localOffset <= maxLine) {
	        return localOffset;
	      }

	      forwardExhausted = true;
	    }

	    if (!backwardExhausted) {
	      if (!forwardExhausted) {
	        wantForward = true;
	      }

	      // Check if trying to fit before text beginning, and if not, check it fits
	      // before offset location
	      if (minLine <= start - localOffset) {
	        return -localOffset++;
	      }

	      backwardExhausted = true;
	      return iterator();
	    }

	    // We tried to fit hunk before text beginning and beyond text length, then
	    // hunk can't fit on the text. Return undefined
	  };
	};



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/calcLineCount = calcLineCount;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = merge;

	var /*istanbul ignore start*/_create = __webpack_require__(14) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_array = __webpack_require__(15) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/*istanbul ignore end*/function calcLineCount(hunk) {
	  /*istanbul ignore start*/var _calcOldNewLineCount = /*istanbul ignore end*/calcOldNewLineCount(hunk.lines),
	      oldLines = _calcOldNewLineCount.oldLines,
	      newLines = _calcOldNewLineCount.newLines;

	  if (oldLines !== undefined) {
	    hunk.oldLines = oldLines;
	  } else {
	    delete hunk.oldLines;
	  }

	  if (newLines !== undefined) {
	    hunk.newLines = newLines;
	  } else {
	    delete hunk.newLines;
	  }
	}

	function merge(mine, theirs, base) {
	  mine = loadPatch(mine, base);
	  theirs = loadPatch(theirs, base);

	  var ret = {};

	  // For index we just let it pass through as it doesn't have any necessary meaning.
	  // Leaving sanity checks on this to the API consumer that may know more about the
	  // meaning in their own context.
	  if (mine.index || theirs.index) {
	    ret.index = mine.index || theirs.index;
	  }

	  if (mine.newFileName || theirs.newFileName) {
	    if (!fileNameChanged(mine)) {
	      // No header or no change in ours, use theirs (and ours if theirs does not exist)
	      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
	      ret.newFileName = theirs.newFileName || mine.newFileName;
	      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
	      ret.newHeader = theirs.newHeader || mine.newHeader;
	    } else if (!fileNameChanged(theirs)) {
	      // No header or no change in theirs, use ours
	      ret.oldFileName = mine.oldFileName;
	      ret.newFileName = mine.newFileName;
	      ret.oldHeader = mine.oldHeader;
	      ret.newHeader = mine.newHeader;
	    } else {
	      // Both changed... figure it out
	      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
	      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
	      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
	      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
	    }
	  }

	  ret.hunks = [];

	  var mineIndex = 0,
	      theirsIndex = 0,
	      mineOffset = 0,
	      theirsOffset = 0;

	  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
	    var mineCurrent = mine.hunks[mineIndex] || { oldStart: Infinity },
	        theirsCurrent = theirs.hunks[theirsIndex] || { oldStart: Infinity };

	    if (hunkBefore(mineCurrent, theirsCurrent)) {
	      // This patch does not overlap with any of the others, yay.
	      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
	      mineIndex++;
	      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
	    } else if (hunkBefore(theirsCurrent, mineCurrent)) {
	      // This patch does not overlap with any of the others, yay.
	      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
	      theirsIndex++;
	      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
	    } else {
	      // Overlap, merge as best we can
	      var mergedHunk = {
	        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
	        oldLines: 0,
	        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
	        newLines: 0,
	        lines: []
	      };
	      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
	      theirsIndex++;
	      mineIndex++;

	      ret.hunks.push(mergedHunk);
	    }
	  }

	  return ret;
	}

	function loadPatch(param, base) {
	  if (typeof param === 'string') {
	    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
	      return (/*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(param)[0]
	      );
	    }

	    if (!base) {
	      throw new Error('Must provide a base reference or pass in a patch');
	    }
	    return (/*istanbul ignore start*/(0, _create.structuredPatch) /*istanbul ignore end*/(undefined, undefined, base, param)
	    );
	  }

	  return param;
	}

	function fileNameChanged(patch) {
	  return patch.newFileName && patch.newFileName !== patch.oldFileName;
	}

	function selectField(index, mine, theirs) {
	  if (mine === theirs) {
	    return mine;
	  } else {
	    index.conflict = true;
	    return { mine: mine, theirs: theirs };
	  }
	}

	function hunkBefore(test, check) {
	  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
	}

	function cloneHunk(hunk, offset) {
	  return {
	    oldStart: hunk.oldStart, oldLines: hunk.oldLines,
	    newStart: hunk.newStart + offset, newLines: hunk.newLines,
	    lines: hunk.lines
	  };
	}

	function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
	  // This will generally result in a conflicted hunk, but there are cases where the context
	  // is the only overlap where we can successfully merge the content here.
	  var mine = { offset: mineOffset, lines: mineLines, index: 0 },
	      their = { offset: theirOffset, lines: theirLines, index: 0 };

	  // Handle any leading content
	  insertLeading(hunk, mine, their);
	  insertLeading(hunk, their, mine);

	  // Now in the overlap content. Scan through and select the best changes from each.
	  while (mine.index < mine.lines.length && their.index < their.lines.length) {
	    var mineCurrent = mine.lines[mine.index],
	        theirCurrent = their.lines[their.index];

	    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
	      // Both modified ...
	      mutualChange(hunk, mine, their);
	    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
	      /*istanbul ignore start*/var _hunk$lines;

	      /*istanbul ignore end*/ // Mine inserted
	      /*istanbul ignore start*/(_hunk$lines = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(mine)));
	    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
	      /*istanbul ignore start*/var _hunk$lines2;

	      /*istanbul ignore end*/ // Theirs inserted
	      /*istanbul ignore start*/(_hunk$lines2 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(their)));
	    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
	      // Mine removed or edited
	      removal(hunk, mine, their);
	    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
	      // Their removed or edited
	      removal(hunk, their, mine, true);
	    } else if (mineCurrent === theirCurrent) {
	      // Context identity
	      hunk.lines.push(mineCurrent);
	      mine.index++;
	      their.index++;
	    } else {
	      // Context mismatch
	      conflict(hunk, collectChange(mine), collectChange(their));
	    }
	  }

	  // Now push anything that may be remaining
	  insertTrailing(hunk, mine);
	  insertTrailing(hunk, their);

	  calcLineCount(hunk);
	}

	function mutualChange(hunk, mine, their) {
	  var myChanges = collectChange(mine),
	      theirChanges = collectChange(their);

	  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
	    // Special case for remove changes that are supersets of one another
	    if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
	      /*istanbul ignore start*/var _hunk$lines3;

	      /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines3 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));
	      return;
	    } else if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
	      /*istanbul ignore start*/var _hunk$lines4;

	      /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines4 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines4 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges));
	      return;
	    }
	  } else if ( /*istanbul ignore start*/(0, _array.arrayEqual) /*istanbul ignore end*/(myChanges, theirChanges)) {
	    /*istanbul ignore start*/var _hunk$lines5;

	    /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines5 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines5 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));
	    return;
	  }

	  conflict(hunk, myChanges, theirChanges);
	}

	function removal(hunk, mine, their, swap) {
	  var myChanges = collectChange(mine),
	      theirChanges = collectContext(their, myChanges);
	  if (theirChanges.merged) {
	    /*istanbul ignore start*/var _hunk$lines6;

	    /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines6 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines6 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges.merged));
	  } else {
	    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
	  }
	}

	function conflict(hunk, mine, their) {
	  hunk.conflict = true;
	  hunk.lines.push({
	    conflict: true,
	    mine: mine,
	    theirs: their
	  });
	}

	function insertLeading(hunk, insert, their) {
	  while (insert.offset < their.offset && insert.index < insert.lines.length) {
	    var line = insert.lines[insert.index++];
	    hunk.lines.push(line);
	    insert.offset++;
	  }
	}
	function insertTrailing(hunk, insert) {
	  while (insert.index < insert.lines.length) {
	    var line = insert.lines[insert.index++];
	    hunk.lines.push(line);
	  }
	}

	function collectChange(state) {
	  var ret = [],
	      operation = state.lines[state.index][0];
	  while (state.index < state.lines.length) {
	    var line = state.lines[state.index];

	    // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.
	    if (operation === '-' && line[0] === '+') {
	      operation = '+';
	    }

	    if (operation === line[0]) {
	      ret.push(line);
	      state.index++;
	    } else {
	      break;
	    }
	  }

	  return ret;
	}
	function collectContext(state, matchChanges) {
	  var changes = [],
	      merged = [],
	      matchIndex = 0,
	      contextChanges = false,
	      conflicted = false;
	  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
	    var change = state.lines[state.index],
	        match = matchChanges[matchIndex];

	    // Once we've hit our add, then we are done
	    if (match[0] === '+') {
	      break;
	    }

	    contextChanges = contextChanges || change[0] !== ' ';

	    merged.push(match);
	    matchIndex++;

	    // Consume any additions in the other block as a conflict to attempt
	    // to pull in the remaining context after this
	    if (change[0] === '+') {
	      conflicted = true;

	      while (change[0] === '+') {
	        changes.push(change);
	        change = state.lines[++state.index];
	      }
	    }

	    if (match.substr(1) === change.substr(1)) {
	      changes.push(change);
	      state.index++;
	    } else {
	      conflicted = true;
	    }
	  }

	  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
	    conflicted = true;
	  }

	  if (conflicted) {
	    return changes;
	  }

	  while (matchIndex < matchChanges.length) {
	    merged.push(matchChanges[matchIndex++]);
	  }

	  return {
	    merged: merged,
	    changes: changes
	  };
	}

	function allRemoves(changes) {
	  return changes.reduce(function (prev, change) {
	    return prev && change[0] === '-';
	  }, true);
	}
	function skipRemoveSuperset(state, removeChanges, delta) {
	  for (var i = 0; i < delta; i++) {
	    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
	    if (state.lines[state.index + i] !== ' ' + changeContent) {
	      return false;
	    }
	  }

	  state.index += delta;
	  return true;
	}

	function calcOldNewLineCount(lines) {
	  var oldLines = 0;
	  var newLines = 0;

	  lines.forEach(function (line) {
	    if (typeof line !== 'string') {
	      var myCount = calcOldNewLineCount(line.mine);
	      var theirCount = calcOldNewLineCount(line.theirs);

	      if (oldLines !== undefined) {
	        if (myCount.oldLines === theirCount.oldLines) {
	          oldLines += myCount.oldLines;
	        } else {
	          oldLines = undefined;
	        }
	      }

	      if (newLines !== undefined) {
	        if (myCount.newLines === theirCount.newLines) {
	          newLines += myCount.newLines;
	        } else {
	          newLines = undefined;
	        }
	      }
	    } else {
	      if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
	        newLines++;
	      }
	      if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
	        oldLines++;
	      }
	    }
	  });

	  return { oldLines: oldLines, newLines: newLines };
	}



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/structuredPatch = structuredPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;

	var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;

	/*istanbul ignore start*/function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/*istanbul ignore end*/function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  if (!options) {
	    options = {};
	  }
	  if (typeof options.context === 'undefined') {
	    options.context = 4;
	  }

	  var diff = /*istanbul ignore start*/(0, _line.diffLines) /*istanbul ignore end*/(oldStr, newStr, options);
	  diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier

	  function contextLines(lines) {
	    return lines.map(function (entry) {
	      return ' ' + entry;
	    });
	  }

	  var hunks = [];
	  var oldRangeStart = 0,
	      newRangeStart = 0,
	      curRange = [],
	      oldLine = 1,
	      newLine = 1;

	  /*istanbul ignore start*/var _loop = function _loop( /*istanbul ignore end*/i) {
	    var current = diff[i],
	        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	    current.lines = lines;

	    if (current.added || current.removed) {
	      /*istanbul ignore start*/var _curRange;

	      /*istanbul ignore end*/ // If we have previous context, start with that
	      if (!oldRangeStart) {
	        var prev = diff[i - 1];
	        oldRangeStart = oldLine;
	        newRangeStart = newLine;

	        if (prev) {
	          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
	          oldRangeStart -= curRange.length;
	          newRangeStart -= curRange.length;
	        }
	      }

	      // Output our changes
	      /*istanbul ignore start*/(_curRange = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/lines.map(function (entry) {
	        return (current.added ? '+' : '-') + entry;
	      })));

	      // Track the updated file position
	      if (current.added) {
	        newLine += lines.length;
	      } else {
	        oldLine += lines.length;
	      }
	    } else {
	      // Identical context lines. Track line changes
	      if (oldRangeStart) {
	        // Close out any changes that have been output (or join overlapping)
	        if (lines.length <= options.context * 2 && i < diff.length - 2) {
	          /*istanbul ignore start*/var _curRange2;

	          /*istanbul ignore end*/ // Overlapping
	          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));
	        } else {
	          /*istanbul ignore start*/var _curRange3;

	          /*istanbul ignore end*/ // end the range and output
	          var contextSize = Math.min(lines.length, options.context);
	          /*istanbul ignore start*/(_curRange3 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines.slice(0, contextSize))));

	          var hunk = {
	            oldStart: oldRangeStart,
	            oldLines: oldLine - oldRangeStart + contextSize,
	            newStart: newRangeStart,
	            newLines: newLine - newRangeStart + contextSize,
	            lines: curRange
	          };
	          if (i >= diff.length - 2 && lines.length <= options.context) {
	            // EOF is inside this hunk
	            var oldEOFNewline = /\n$/.test(oldStr);
	            var newEOFNewline = /\n$/.test(newStr);
	            if (lines.length == 0 && !oldEOFNewline) {
	              // special case: old has no eol and no trailing context; no-nl can end up before adds
	              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
	            } else if (!oldEOFNewline || !newEOFNewline) {
	              curRange.push('\\ No newline at end of file');
	            }
	          }
	          hunks.push(hunk);

	          oldRangeStart = 0;
	          newRangeStart = 0;
	          curRange = [];
	        }
	      }
	      oldLine += lines.length;
	      newLine += lines.length;
	    }
	  };

	  for (var i = 0; i < diff.length; i++) {
	    /*istanbul ignore start*/_loop( /*istanbul ignore end*/i);
	  }

	  return {
	    oldFileName: oldFileName, newFileName: newFileName,
	    oldHeader: oldHeader, newHeader: newHeader,
	    hunks: hunks
	  };
	}

	function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);

	  var ret = [];
	  if (oldFileName == newFileName) {
	    ret.push('Index: ' + oldFileName);
	  }
	  ret.push('===================================================================');
	  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
	  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

	  for (var i = 0; i < diff.hunks.length; i++) {
	    var hunk = diff.hunks[i];
	    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
	    ret.push.apply(ret, hunk.lines);
	  }

	  return ret.join('\n') + '\n';
	}

	function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
	  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
	}



/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;
	exports. /*istanbul ignore end*/arrayEqual = arrayEqual;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/arrayStartsWith = arrayStartsWith;
	function arrayEqual(a, b) {
	  if (a.length !== b.length) {
	    return false;
	  }

	  return arrayStartsWith(a, b);
	}

	function arrayStartsWith(array, start) {
	  if (start.length > array.length) {
	    return false;
	  }

	  for (var i = 0; i < start.length; i++) {
	    if (start[i] !== array[i]) {
	      return false;
	    }
	  }

	  return true;
	}



/***/ }),
/* 16 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;
	exports. /*istanbul ignore end*/convertChangesToDMP = convertChangesToDMP;
	// See: http://code.google.com/p/google-diff-match-patch/wiki/API
	function convertChangesToDMP(changes) {
	  var ret = [],
	      change = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
	      operation = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	  for (var i = 0; i < changes.length; i++) {
	    change = changes[i];
	    if (change.added) {
	      operation = 1;
	    } else if (change.removed) {
	      operation = -1;
	    } else {
	      operation = 0;
	    }

	    ret.push([operation, change.value]);
	  }
	  return ret;
	}



/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/convertChangesToXML = convertChangesToXML;
	function convertChangesToXML(changes) {
	  var ret = [];
	  for (var i = 0; i < changes.length; i++) {
	    var change = changes[i];
	    if (change.added) {
	      ret.push('<ins>');
	    } else if (change.removed) {
	      ret.push('<del>');
	    }

	    ret.push(escapeHTML(change.value));

	    if (change.added) {
	      ret.push('</ins>');
	    } else if (change.removed) {
	      ret.push('</del>');
	    }
	  }
	  return ret.join('');
	}

	function escapeHTML(s) {
	  var n = s;
	  n = n.replace(/&/g, '&amp;');
	  n = n.replace(/</g, '&lt;');
	  n = n.replace(/>/g, '&gt;');
	  n = n.replace(/"/g, '&quot;');

	  return n;
	}



/***/ })
/******/ ])
});
;
},{}],3:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})(typeof exports !== 'undefined' ? exports : Hogan);

},{}],4:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = require('./compiler');
Hogan.Template = require('./template').Template;
Hogan.template = Hogan.Template;
module.exports = Hogan;

},{"./compiler":3,"./template":5}],5:[function(require,module,exports){
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);

},{}],6:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":47,"./_hashDelete":48,"./_hashGet":49,"./_hashHas":50,"./_hashSet":51}],7:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":58,"./_listCacheDelete":59,"./_listCacheGet":60,"./_listCacheHas":61,"./_listCacheSet":62}],8:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":43,"./_root":74}],9:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":63,"./_mapCacheDelete":64,"./_mapCacheGet":65,"./_mapCacheHas":66,"./_mapCacheSet":67}],10:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":7,"./_stackClear":78,"./_stackDelete":79,"./_stackGet":80,"./_stackHas":81,"./_stackSet":82}],11:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":74}],12:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":74}],13:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],14:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":30,"./_isIndex":53,"./isArguments":87,"./isArray":88,"./isBuffer":91,"./isTypedArray":97}],15:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

},{"./_baseAssignValue":18,"./eq":85}],16:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":18,"./eq":85}],17:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":85}],18:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":40}],19:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":94}],20:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":39}],21:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":11,"./_getRawTag":45,"./_objectToString":71}],22:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":21,"./isObjectLike":95}],23:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":56,"./_toSource":83,"./isFunction":92,"./isObject":94}],24:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":21,"./isLength":93,"./isObjectLike":95}],25:[function(require,module,exports){
var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

},{"./_isPrototype":57,"./_nativeKeysIn":69,"./isObject":94}],26:[function(require,module,exports){
var Stack = require('./_Stack'),
    assignMergeValue = require('./_assignMergeValue'),
    baseFor = require('./_baseFor'),
    baseMergeDeep = require('./_baseMergeDeep'),
    isObject = require('./isObject'),
    keysIn = require('./keysIn'),
    safeGet = require('./_safeGet');

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

},{"./_Stack":10,"./_assignMergeValue":15,"./_baseFor":20,"./_baseMergeDeep":27,"./_safeGet":75,"./isObject":94,"./keysIn":98}],27:[function(require,module,exports){
var assignMergeValue = require('./_assignMergeValue'),
    cloneBuffer = require('./_cloneBuffer'),
    cloneTypedArray = require('./_cloneTypedArray'),
    copyArray = require('./_copyArray'),
    initCloneObject = require('./_initCloneObject'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    isBuffer = require('./isBuffer'),
    isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    isPlainObject = require('./isPlainObject'),
    isTypedArray = require('./isTypedArray'),
    safeGet = require('./_safeGet'),
    toPlainObject = require('./toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

},{"./_assignMergeValue":15,"./_cloneBuffer":33,"./_cloneTypedArray":34,"./_copyArray":35,"./_initCloneObject":52,"./_safeGet":75,"./isArguments":87,"./isArray":88,"./isArrayLikeObject":90,"./isBuffer":91,"./isFunction":92,"./isObject":94,"./isPlainObject":96,"./isTypedArray":97,"./toPlainObject":101}],28:[function(require,module,exports){
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./_overRest":73,"./_setToString":76,"./identity":86}],29:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":40,"./constant":84,"./identity":86}],30:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],31:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],32:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":12}],33:[function(require,module,exports){
var root = require('./_root');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{"./_root":74}],34:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":32}],35:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],36:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":16,"./_baseAssignValue":18}],37:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":74}],38:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_baseRest":28,"./_isIterateeCall":54}],39:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],40:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":43}],41:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":55}],43:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":23,"./_getValue":46}],44:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":72}],45:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":11}],46:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],47:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":68}],48:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],49:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":68}],50:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":68}],51:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":68}],52:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":19,"./_getPrototype":44,"./_isPrototype":57}],53:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],54:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":53,"./eq":85,"./isArrayLike":89,"./isObject":94}],55:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],56:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":37}],57:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],58:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],59:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":17}],60:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":17}],61:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":17}],62:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":17}],63:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":6,"./_ListCache":7,"./_Map":8}],64:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":42}],65:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":42}],66:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":42}],67:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":42}],68:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":43}],69:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

},{}],70:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":41}],71:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],72:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],73:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":13}],74:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":41}],75:[function(require,module,exports){
/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;

},{}],76:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":29,"./_shortOut":77}],77:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],78:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":7}],79:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],80:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],81:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],82:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":7,"./_Map":8,"./_MapCache":9}],83:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],84:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],85:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],86:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],87:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":22,"./isObjectLike":95}],88:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],89:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":92,"./isLength":93}],90:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":89,"./isObjectLike":95}],91:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":74,"./stubFalse":100}],92:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":21,"./isObject":94}],93:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],94:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],95:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],96:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":21,"./_getPrototype":44,"./isObjectLike":95}],97:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":24,"./_baseUnary":31,"./_nodeUtil":70}],98:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

},{"./_arrayLikeKeys":14,"./_baseKeysIn":25,"./isArrayLike":89}],99:[function(require,module,exports){
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;

},{"./_baseMerge":26,"./_createAssigner":38}],100:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],101:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

},{"./_copyObject":36,"./keysIn":98}],102:[function(require,module,exports){
(function (process){
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":103}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
/*
 *
 * Diff Parser (diff-parser.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var utils = require('./utils.js').Utils;

  var LINE_TYPE = {
    INSERTS: 'd2h-ins',
    DELETES: 'd2h-del',
    INSERT_CHANGES: 'd2h-ins d2h-change',
    DELETE_CHANGES: 'd2h-del d2h-change',
    CONTEXT: 'd2h-cntx',
    INFO: 'd2h-info'
  };

  function DiffParser() {
  }

  DiffParser.prototype.LINE_TYPE = LINE_TYPE;

  DiffParser.prototype.generateDiffJson = function(diffInput, configuration) {
    var config = configuration || {};

    var files = [];
    var currentFile = null;
    var currentBlock = null;
    var oldLine = null;
    var oldLine2 = null; // Used for combined diff
    var newLine = null;

    var possibleOldName;
    var possibleNewName;

    /* Diff Header */
    var oldFileNameHeader = '--- ';
    var newFileNameHeader = '+++ ';
    var hunkHeaderPrefix = '@@';

    /* Add previous block(if exists) before start a new file */
    function saveBlock() {
      if (currentBlock) {
        currentFile.blocks.push(currentBlock);
        currentBlock = null;
      }
    }

    /*
     * Add previous file(if exists) before start a new one
     * if it has name (to avoid binary files errors)
     */
    function saveFile() {
      if (currentFile) {
        if (!currentFile.oldName) {
          currentFile.oldName = possibleOldName;
        }

        if (!currentFile.newName) {
          currentFile.newName = possibleNewName;
        }

        if (currentFile.newName) {
          files.push(currentFile);
          currentFile = null;
        }
      }

      possibleOldName = undefined;
      possibleNewName = undefined;
    }

    /* Create file structure */
    function startFile() {
      saveBlock();
      saveFile();

      currentFile = {};
      currentFile.blocks = [];
      currentFile.deletedLines = 0;
      currentFile.addedLines = 0;
    }

    function startBlock(line) {
      saveBlock();

      var values;

      /**
       * From Range:
       * -<start line>[,<number of lines>]
       *
       * To Range:
       * +<start line>[,<number of lines>]
       *
       * @@ from-file-range to-file-range @@
       *
       * @@@ from-file-range from-file-range to-file-range @@@
       *
       * number of lines is optional, if omited consider 0
       */

      if ((values = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@.*/.exec(line))) {
        currentFile.isCombined = false;
        oldLine = values[1];
        newLine = values[2];
      } else if ((values = /^@@@ -(\d+)(?:,\d+)? -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@@.*/.exec(line))) {
        currentFile.isCombined = true;
        oldLine = values[1];
        oldLine2 = values[2];
        newLine = values[3];
      } else {
        if (utils.startsWith(line, hunkHeaderPrefix)) {
          console.error('Failed to parse lines, starting in 0!');
        }

        oldLine = 0;
        newLine = 0;
        currentFile.isCombined = false;
      }

      /* Create block metadata */
      currentBlock = {};
      currentBlock.lines = [];
      currentBlock.oldStartLine = oldLine;
      currentBlock.oldStartLine2 = oldLine2;
      currentBlock.newStartLine = newLine;
      currentBlock.header = line;
    }

    function createLine(line) {
      var currentLine = {};
      currentLine.content = line;

      var newLinePrefixes = !currentFile.isCombined ? ['+'] : ['+', ' +'];
      var delLinePrefixes = !currentFile.isCombined ? ['-'] : ['-', ' -'];

      /* Fill the line data */
      if (utils.startsWith(line, newLinePrefixes)) {
        currentFile.addedLines++;

        currentLine.type = LINE_TYPE.INSERTS;
        currentLine.oldNumber = null;
        currentLine.newNumber = newLine++;

        currentBlock.lines.push(currentLine);
      } else if (utils.startsWith(line, delLinePrefixes)) {
        currentFile.deletedLines++;

        currentLine.type = LINE_TYPE.DELETES;
        currentLine.oldNumber = oldLine++;
        currentLine.newNumber = null;

        currentBlock.lines.push(currentLine);
      } else {
        currentLine.type = LINE_TYPE.CONTEXT;
        currentLine.oldNumber = oldLine++;
        currentLine.newNumber = newLine++;

        currentBlock.lines.push(currentLine);
      }
    }

    /*
     * Checks if there is a hunk header coming before a new file starts
     *
     * Hunk header is a group of three lines started by ( `--- ` , `+++ ` , `@@` )
     */
    function existHunkHeader(line, lineIdx) {
      var idx = lineIdx;

      while (idx < diffLines.length - 3) {
        if (utils.startsWith(line, 'diff')) {
          return false;
        }

        if (
          utils.startsWith(diffLines[idx], oldFileNameHeader) &&
          utils.startsWith(diffLines[idx + 1], newFileNameHeader) &&
          utils.startsWith(diffLines[idx + 2], hunkHeaderPrefix)
        ) {
          return true;
        }

        idx++;
      }

      return false;
    }

    var diffLines =
      diffInput.replace(/\\ No newline at end of file/g, '')
        .replace(/\r\n?/g, '\n')
        .split('\n');

    /* Diff */
    var oldMode = /^old mode (\d{6})/;
    var newMode = /^new mode (\d{6})/;
    var deletedFileMode = /^deleted file mode (\d{6})/;
    var newFileMode = /^new file mode (\d{6})/;

    var copyFrom = /^copy from "?(.+)"?/;
    var copyTo = /^copy to "?(.+)"?/;

    var renameFrom = /^rename from "?(.+)"?/;
    var renameTo = /^rename to "?(.+)"?/;

    var similarityIndex = /^similarity index (\d+)%/;
    var dissimilarityIndex = /^dissimilarity index (\d+)%/;
    var index = /^index ([0-9a-z]+)\.\.([0-9a-z]+)\s*(\d{6})?/;

    var binaryFiles = /^Binary files (.*) and (.*) differ/;
    var binaryDiff = /^GIT binary patch/;

    /* Combined Diff */
    var combinedIndex = /^index ([0-9a-z]+),([0-9a-z]+)\.\.([0-9a-z]+)/;
    var combinedMode = /^mode (\d{6}),(\d{6})\.\.(\d{6})/;
    var combinedNewFile = /^new file mode (\d{6})/;
    var combinedDeletedFile = /^deleted file mode (\d{6}),(\d{6})/;

    diffLines.forEach(function(line, lineIndex) {
      // Unmerged paths, and possibly other non-diffable files
      // https://github.com/scottgonzalez/pretty-diff/issues/11
      // Also, remove some useless lines
      if (!line || utils.startsWith(line, '*')) {
        return;
      }

      // Used to store regex capture groups
      var values;

      var prevLine = diffLines[lineIndex - 1];
      var nxtLine = diffLines[lineIndex + 1];
      var afterNxtLine = diffLines[lineIndex + 2];

      if (utils.startsWith(line, 'diff')) {
        startFile();

        // diff --git a/blocked_delta_results.png b/blocked_delta_results.png
        var gitDiffStart = /^diff --git "?(.+)"? "?(.+)"?/;
        if ((values = gitDiffStart.exec(line))) {
          possibleOldName = _getFilename(null, values[1], config.dstPrefix);
          possibleNewName = _getFilename(null, values[2], config.srcPrefix);
        }

        currentFile.isGitDiff = true;
        return;
      }

      if (!currentFile || // If we do not have a file yet, we should crete one
        (
          !currentFile.isGitDiff && currentFile && // If we already have some file in progress and
          (
            utils.startsWith(line, oldFileNameHeader) && // If we get to an old file path header line
            // And is followed by the new file path header line and the hunk header line
            utils.startsWith(nxtLine, newFileNameHeader) && utils.startsWith(afterNxtLine, hunkHeaderPrefix)
          )
        )
      ) {
        startFile();
      }

      /*
       * We need to make sure that we have the three lines of the header.
       * This avoids cases like the ones described in:
       *   - https://github.com/rtfpessoa/diff2html/issues/87
       */
      if (
        (utils.startsWith(line, oldFileNameHeader) &&
        utils.startsWith(nxtLine, newFileNameHeader)) ||

        (utils.startsWith(line, newFileNameHeader) &&
        utils.startsWith(prevLine, oldFileNameHeader))
      ) {
        /*
         * --- Date Timestamp[FractionalSeconds] TimeZone
         * --- 2002-02-21 23:30:39.942229878 -0800
         */
        if (currentFile && !currentFile.oldName &&
          utils.startsWith(line, '--- ') && (values = getSrcFilename(line, config))) {
          currentFile.oldName = values;
          currentFile.language = getExtension(currentFile.oldName, currentFile.language);
          return;
        }

        /*
         * +++ Date Timestamp[FractionalSeconds] TimeZone
         * +++ 2002-02-21 23:30:39.942229878 -0800
         */
        if (currentFile && !currentFile.newName &&
          utils.startsWith(line, '+++ ') && (values = getDstFilename(line, config))) {
          currentFile.newName = values;
          currentFile.language = getExtension(currentFile.newName, currentFile.language);
          return;
        }
      }

      if (
        (currentFile && utils.startsWith(line, hunkHeaderPrefix)) ||
        (currentFile.isGitDiff && currentFile && currentFile.oldName && currentFile.newName && !currentBlock)
      ) {
        startBlock(line);
        return;
      }

      /*
       * There are three types of diff lines. These lines are defined by the way they start.
       * 1. New line     starts with: +
       * 2. Old line     starts with: -
       * 3. Context line starts with: <SPACE>
       */
      if (currentBlock && (utils.startsWith(line, '+') || utils.startsWith(line, '-') || utils.startsWith(line, ' '))) {
        createLine(line);
        return;
      }

      var doesNotExistHunkHeader = !existHunkHeader(line, lineIndex);

      /*
       * Git diffs provide more information regarding files modes, renames, copies,
       * commits between changes and similarity indexes
       */
      if ((values = oldMode.exec(line))) {
        currentFile.oldMode = values[1];
      } else if ((values = newMode.exec(line))) {
        currentFile.newMode = values[1];
      } else if ((values = deletedFileMode.exec(line))) {
        currentFile.deletedFileMode = values[1];
        currentFile.isDeleted = true;
      } else if ((values = newFileMode.exec(line))) {
        currentFile.newFileMode = values[1];
        currentFile.isNew = true;
      } else if ((values = copyFrom.exec(line))) {
        if (doesNotExistHunkHeader) {
          currentFile.oldName = values[1];
        }
        currentFile.isCopy = true;
      } else if ((values = copyTo.exec(line))) {
        if (doesNotExistHunkHeader) {
          currentFile.newName = values[1];
        }
        currentFile.isCopy = true;
      } else if ((values = renameFrom.exec(line))) {
        if (doesNotExistHunkHeader) {
          currentFile.oldName = values[1];
        }
        currentFile.isRename = true;
      } else if ((values = renameTo.exec(line))) {
        if (doesNotExistHunkHeader) {
          currentFile.newName = values[1];
        }
        currentFile.isRename = true;
      } else if ((values = binaryFiles.exec(line))) {
        currentFile.isBinary = true;
        currentFile.oldName = _getFilename(null, values[1], config.srcPrefix);
        currentFile.newName = _getFilename(null, values[2], config.dstPrefix);
        startBlock('Binary file');
      } else if ((values = binaryDiff.exec(line))) {
        currentFile.isBinary = true;
        startBlock(line);
      } else if ((values = similarityIndex.exec(line))) {
        currentFile.unchangedPercentage = values[1];
      } else if ((values = dissimilarityIndex.exec(line))) {
        currentFile.changedPercentage = values[1];
      } else if ((values = index.exec(line))) {
        currentFile.checksumBefore = values[1];
        currentFile.checksumAfter = values[2];
        values[3] && (currentFile.mode = values[3]);
      } else if ((values = combinedIndex.exec(line))) {
        currentFile.checksumBefore = [values[2], values[3]];
        currentFile.checksumAfter = values[1];
      } else if ((values = combinedMode.exec(line))) {
        currentFile.oldMode = [values[2], values[3]];
        currentFile.newMode = values[1];
      } else if ((values = combinedNewFile.exec(line))) {
        currentFile.newFileMode = values[1];
        currentFile.isNew = true;
      } else if ((values = combinedDeletedFile.exec(line))) {
        currentFile.deletedFileMode = values[1];
        currentFile.isDeleted = true;
      }
    });

    saveBlock();
    saveFile();

    return files;
  };

  function getExtension(filename, language) {
    var nameSplit = filename.split('.');
    if (nameSplit.length > 1) {
      return nameSplit[nameSplit.length - 1];
    }

    return language;
  }

  function getSrcFilename(line, cfg) {
    return _getFilename('---', line, cfg.srcPrefix);
  }

  function getDstFilename(line, cfg) {
    return _getFilename('\\+\\+\\+', line, cfg.dstPrefix);
  }

  function _getFilename(linePrefix, line, extraPrefix) {
    var prefixes = ['a/', 'b/', 'i/', 'w/', 'c/', 'o/'];
    if (extraPrefix) {
      prefixes.push(extraPrefix);
    }

    var FilenameRegExp;
    if (linePrefix) {
      FilenameRegExp = new RegExp('^' + linePrefix + ' "?(.+?)"?$');
    } else {
      FilenameRegExp = new RegExp('^"?(.+?)"?$');
    }

    var filename;
    var values = FilenameRegExp.exec(line);
    if (values && values[1]) {
      filename = values[1];
      var matchingPrefixes = prefixes.filter(function(p) {
        return filename.indexOf(p) === 0;
      });

      if (matchingPrefixes[0]) {
        // Remove prefix if exists
        filename = filename.slice(matchingPrefixes[0].length);
      }

      // Cleanup timestamps generated by the unified diff (diff command) as specified in
      // https://www.gnu.org/software/diffutils/manual/html_node/Detailed-Unified.html
      // Ie: 2016-10-25 11:37:14.000000000 +0200
      filename = filename.replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? [-+]\d{4}.*$/, '');
    }

    return filename;
  }

  module.exports.DiffParser = new DiffParser();
})();

},{"./utils.js":114}],105:[function(require,module,exports){
(function (global){
/*
 *
 * Diff to HTML (diff2html.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var diffParser = require('./diff-parser.js').DiffParser;
  var htmlPrinter = require('./html-printer.js').HtmlPrinter;
  var utils = require('./utils.js').Utils;

  function Diff2Html() {
  }

  var defaultConfig = {
    wordByWord: true,
    outputFormat: 'line-by-line',
    matching: 'none',
    matchWordsThreshold: 0.25,
    matchingMaxComparisons: 2500,
    maxLineLengthHighlight: 10000
  };

  /*
   * Generates json object from string diff input
   */
  Diff2Html.prototype.getJsonFromDiff = function(diffInput, config) {
    var cfg = utils.safeConfig(config, defaultConfig);
    return diffParser.generateDiffJson(diffInput, cfg);
  };

  /*
   * Generates the html diff. The config parameter configures the output/input formats and other options
   */
  Diff2Html.prototype.getPrettyHtml = function(diffInput, config) {
    var cfg = utils.safeConfig(config, defaultConfig);

    var diffJson = diffInput;
    if (!cfg.inputFormat || cfg.inputFormat === 'diff') {
      diffJson = diffParser.generateDiffJson(diffInput, cfg);
    }

    var fileList = '';
    if (cfg.showFiles === true) {
      fileList = htmlPrinter.generateFileListSummary(diffJson, cfg);
    }

    var diffOutput = '';
    if (cfg.outputFormat === 'side-by-side') {
      diffOutput = htmlPrinter.generateSideBySideJsonHtml(diffJson, cfg);
    } else {
      diffOutput = htmlPrinter.generateLineByLineJsonHtml(diffJson, cfg);
    }

    return fileList + diffOutput;
  };

  /*
   * Deprecated methods - The following methods exist only to maintain compatibility with previous versions
   */

  /*
   * Generates pretty html from string diff input
   */
  Diff2Html.prototype.getPrettyHtmlFromDiff = function(diffInput, config) {
    var cfg = utils.safeConfig(config, defaultConfig);
    cfg.inputFormat = 'diff';
    cfg.outputFormat = 'line-by-line';
    return this.getPrettyHtml(diffInput, cfg);
  };

  /*
   * Generates pretty html from a json object
   */
  Diff2Html.prototype.getPrettyHtmlFromJson = function(diffJson, config) {
    var cfg = utils.safeConfig(config, defaultConfig);
    cfg.inputFormat = 'json';
    cfg.outputFormat = 'line-by-line';
    return this.getPrettyHtml(diffJson, cfg);
  };

  /*
   * Generates pretty side by side html from string diff input
   */
  Diff2Html.prototype.getPrettySideBySideHtmlFromDiff = function(diffInput, config) {
    var cfg = utils.safeConfig(config, defaultConfig);
    cfg.inputFormat = 'diff';
    cfg.outputFormat = 'side-by-side';
    return this.getPrettyHtml(diffInput, cfg);
  };

  /*
   * Generates pretty side by side html from a json object
   */
  Diff2Html.prototype.getPrettySideBySideHtmlFromJson = function(diffJson, config) {
    var cfg = utils.safeConfig(config, defaultConfig);
    cfg.inputFormat = 'json';
    cfg.outputFormat = 'side-by-side';
    return this.getPrettyHtml(diffJson, cfg);
  };

  var diffObject = new Diff2Html();
  module.exports.Diff2Html = diffObject;

  // Expose diff2html in the browser
  global.Diff2Html = diffObject;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./diff-parser.js":104,"./html-printer.js":108,"./utils.js":114}],106:[function(require,module,exports){
/*
 *
 * FileListPrinter (file-list-printer.js)
 * Author: nmatpt
 *
 */

(function() {
  var printerUtils = require('./printer-utils.js').PrinterUtils;

  var hoganUtils;

  var baseTemplatesPath = 'file-summary';
  var iconsBaseTemplatesPath = 'icon';

  function FileListPrinter(config) {
    this.config = config;

    var HoganJsUtils = require('./hoganjs-utils.js').HoganJsUtils;
    hoganUtils = new HoganJsUtils(config);
  }

  FileListPrinter.prototype.generateFileList = function(diffFiles) {
    var lineTemplate = hoganUtils.template(baseTemplatesPath, 'line');

    var files = diffFiles.map(function(file) {
      var fileTypeName = printerUtils.getFileTypeIcon(file);
      var iconTemplate = hoganUtils.template(iconsBaseTemplatesPath, fileTypeName);

      return lineTemplate.render({
        fileHtmlId: printerUtils.getHtmlId(file),
        fileName: printerUtils.getDiffName(file),
        deletedLines: '-' + file.deletedLines,
        addedLines: '+' + file.addedLines
      }, {
        fileIcon: iconTemplate
      });
    }).join('\n');

    return hoganUtils.render(baseTemplatesPath, 'wrapper', {
      filesNumber: diffFiles.length,
      files: files
    });
  };

  module.exports.FileListPrinter = FileListPrinter;
})();

},{"./hoganjs-utils.js":107,"./printer-utils.js":110}],107:[function(require,module,exports){
(function (__dirname){
/*
 *
 * Utils (hoganjs-utils.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var fs = require('fs');
  var path = require('path');
  var hogan = require('hogan.js');

  var hoganTemplates = require('./templates/diff2html-templates.js');

  var extraTemplates;

  function HoganJsUtils(configuration) {
    this.config = configuration || {};
    extraTemplates = this.config.templates || {};

    var rawTemplates = this.config.rawTemplates || {};
    for (var templateName in rawTemplates) {
      if (rawTemplates.hasOwnProperty(templateName)) {
        if (!extraTemplates[templateName]) extraTemplates[templateName] = this.compile(rawTemplates[templateName]);
      }
    }
  }

  HoganJsUtils.prototype.render = function(namespace, view, params) {
    var template = this.template(namespace, view);
    if (template) {
      return template.render(params);
    }

    return null;
  };

  HoganJsUtils.prototype.template = function(namespace, view) {
    var templateKey = this._templateKey(namespace, view);

    return this._getTemplate(templateKey);
  };

  HoganJsUtils.prototype._getTemplate = function(templateKey) {
    var template;

    if (!this.config.noCache) {
      template = this._readFromCache(templateKey);
    }

    if (!template) {
      template = this._loadTemplate(templateKey);
    }

    return template;
  };

  HoganJsUtils.prototype._loadTemplate = function(templateKey) {
    var template;

    try {
      if (fs.readFileSync) {
        var templatesPath = path.resolve(__dirname, 'templates');
        var templatePath = path.join(templatesPath, templateKey);
        var templateContent = fs.readFileSync(templatePath + '.mustache', 'utf8');
        template = hogan.compile(templateContent);
        hoganTemplates[templateKey] = template;
      }
    } catch (e) {
      console.error('Failed to read (template: ' + templateKey + ') from fs: ' + e.message);
    }

    return template;
  };

  HoganJsUtils.prototype._readFromCache = function(templateKey) {
    return extraTemplates[templateKey] || hoganTemplates[templateKey];
  };

  HoganJsUtils.prototype._templateKey = function(namespace, view) {
    return namespace + '-' + view;
  };

  HoganJsUtils.prototype.compile = function(templateStr) {
    return hogan.compile(templateStr);
  };

  module.exports.HoganJsUtils = HoganJsUtils;
})();

}).call(this,"/src")
},{"./templates/diff2html-templates.js":113,"fs":1,"hogan.js":4,"path":102}],108:[function(require,module,exports){
/*
 *
 * HtmlPrinter (html-printer.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var LineByLinePrinter = require('./line-by-line-printer.js').LineByLinePrinter;
  var SideBySidePrinter = require('./side-by-side-printer.js').SideBySidePrinter;
  var FileListPrinter = require('./file-list-printer.js').FileListPrinter;

  function HtmlPrinter() {
  }

  HtmlPrinter.prototype.generateLineByLineJsonHtml = function(diffFiles, config) {
    var lineByLinePrinter = new LineByLinePrinter(config);
    return lineByLinePrinter.generateLineByLineJsonHtml(diffFiles);
  };

  HtmlPrinter.prototype.generateSideBySideJsonHtml = function(diffFiles, config) {
    var sideBySidePrinter = new SideBySidePrinter(config);
    return sideBySidePrinter.generateSideBySideJsonHtml(diffFiles);
  };

  HtmlPrinter.prototype.generateFileListSummary = function(diffJson, config) {
    var fileListPrinter = new FileListPrinter(config);
    return fileListPrinter.generateFileList(diffJson);
  };

  module.exports.HtmlPrinter = new HtmlPrinter();
})();

},{"./file-list-printer.js":106,"./line-by-line-printer.js":109,"./side-by-side-printer.js":112}],109:[function(require,module,exports){
/*
 *
 * LineByLinePrinter (line-by-line-printer.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var diffParser = require('./diff-parser.js').DiffParser;
  var printerUtils = require('./printer-utils.js').PrinterUtils;
  var utils = require('./utils.js').Utils;
  var Rematch = require('./rematch.js').Rematch;

  var hoganUtils;

  var genericTemplatesPath = 'generic';
  var baseTemplatesPath = 'line-by-line';
  var iconsBaseTemplatesPath = 'icon';
  var tagsBaseTemplatesPath = 'tag';

  function LineByLinePrinter(config) {
    this.config = config;

    var HoganJsUtils = require('./hoganjs-utils.js').HoganJsUtils;
    hoganUtils = new HoganJsUtils(config);
  }

  LineByLinePrinter.prototype.makeFileDiffHtml = function(file, diffs) {
    var fileDiffTemplate = hoganUtils.template(baseTemplatesPath, 'file-diff');
    var filePathTemplate = hoganUtils.template(genericTemplatesPath, 'file-path');
    var fileIconTemplate = hoganUtils.template(iconsBaseTemplatesPath, 'file');
    var fileTagTemplate = hoganUtils.template(tagsBaseTemplatesPath, printerUtils.getFileTypeIcon(file));

    return fileDiffTemplate.render({
      file: file,
      fileHtmlId: printerUtils.getHtmlId(file),
      diffs: diffs,
      filePath: filePathTemplate.render({
        fileDiffName: printerUtils.getDiffName(file)
      }, {
        fileIcon: fileIconTemplate,
        fileTag: fileTagTemplate
      })
    });
  };

  LineByLinePrinter.prototype.makeLineByLineHtmlWrapper = function(content) {
    return hoganUtils.render(genericTemplatesPath, 'wrapper', {'content': content});
  };

  LineByLinePrinter.prototype.generateLineByLineJsonHtml = function(diffFiles) {
    var that = this;
    var htmlDiffs = diffFiles.map(function(file) {
      var diffs;
      if (file.blocks.length) {
        diffs = that._generateFileHtml(file);
      } else {
        diffs = that._generateEmptyDiff();
      }
      return that.makeFileDiffHtml(file, diffs);
    });

    return this.makeLineByLineHtmlWrapper(htmlDiffs.join('\n'));
  };

  var matcher = Rematch.rematch(function(a, b) {
    var amod = a.content.substr(1);
    var bmod = b.content.substr(1);

    return Rematch.distance(amod, bmod);
  });

  LineByLinePrinter.prototype.makeColumnLineNumberHtml = function(block) {
    return hoganUtils.render(genericTemplatesPath, 'column-line-number', {
      diffParser: diffParser,
      blockHeader: utils.escape(block.header),
      lineClass: 'd2h-code-linenumber',
      contentClass: 'd2h-code-line'
    });
  };

  LineByLinePrinter.prototype._generateFileHtml = function(file) {
    var that = this;
    return file.blocks.map(function(block) {
      var lines = that.makeColumnLineNumberHtml(block);
      var oldLines = [];
      var newLines = [];

      function processChangeBlock() {
        var matches;
        var insertType;
        var deleteType;

        var comparisons = oldLines.length * newLines.length;
        var maxComparisons = that.config.matchingMaxComparisons || 2500;
        var doMatching = comparisons < maxComparisons && (that.config.matching === 'lines' ||
          that.config.matching === 'words');

        if (doMatching) {
          matches = matcher(oldLines, newLines);
          insertType = diffParser.LINE_TYPE.INSERT_CHANGES;
          deleteType = diffParser.LINE_TYPE.DELETE_CHANGES;
        } else {
          matches = [[oldLines, newLines]];
          insertType = diffParser.LINE_TYPE.INSERTS;
          deleteType = diffParser.LINE_TYPE.DELETES;
        }

        matches.forEach(function(match) {
          oldLines = match[0];
          newLines = match[1];

          var processedOldLines = [];
          var processedNewLines = [];

          var common = Math.min(oldLines.length, newLines.length);

          var oldLine, newLine;
          for (var j = 0; j < common; j++) {
            oldLine = oldLines[j];
            newLine = newLines[j];

            that.config.isCombined = file.isCombined;
            var diff = printerUtils.diffHighlight(oldLine.content, newLine.content, that.config);

            processedOldLines +=
              that.makeLineHtml(file.isCombined, deleteType, oldLine.oldNumber, oldLine.newNumber,
                diff.first.line, diff.first.prefix);
            processedNewLines +=
              that.makeLineHtml(file.isCombined, insertType, newLine.oldNumber, newLine.newNumber,
                diff.second.line, diff.second.prefix);
          }

          lines += processedOldLines + processedNewLines;
          lines += that._processLines(file.isCombined, oldLines.slice(common), newLines.slice(common));
        });

        oldLines = [];
        newLines = [];
      }

      for (var i = 0; i < block.lines.length; i++) {
        var line = block.lines[i];
        var escapedLine = utils.escape(line.content);

        if (line.type !== diffParser.LINE_TYPE.INSERTS &&
          (newLines.length > 0 || (line.type !== diffParser.LINE_TYPE.DELETES && oldLines.length > 0))) {
          processChangeBlock();
        }

        if (line.type === diffParser.LINE_TYPE.CONTEXT) {
          lines += that.makeLineHtml(file.isCombined, line.type, line.oldNumber, line.newNumber, escapedLine);
        } else if (line.type === diffParser.LINE_TYPE.INSERTS && !oldLines.length) {
          lines += that.makeLineHtml(file.isCombined, line.type, line.oldNumber, line.newNumber, escapedLine);
        } else if (line.type === diffParser.LINE_TYPE.DELETES) {
          oldLines.push(line);
        } else if (line.type === diffParser.LINE_TYPE.INSERTS && Boolean(oldLines.length)) {
          newLines.push(line);
        } else {
          console.error('Unknown state in html line-by-line generator');
          processChangeBlock();
        }
      }

      processChangeBlock();

      return lines;
    }).join('\n');
  };

  LineByLinePrinter.prototype._processLines = function(isCombined, oldLines, newLines) {
    var lines = '';

    for (var i = 0; i < oldLines.length; i++) {
      var oldLine = oldLines[i];
      var oldEscapedLine = utils.escape(oldLine.content);
      lines += this.makeLineHtml(isCombined, oldLine.type, oldLine.oldNumber, oldLine.newNumber, oldEscapedLine);
    }

    for (var j = 0; j < newLines.length; j++) {
      var newLine = newLines[j];
      var newEscapedLine = utils.escape(newLine.content);
      lines += this.makeLineHtml(isCombined, newLine.type, newLine.oldNumber, newLine.newNumber, newEscapedLine);
    }

    return lines;
  };

  LineByLinePrinter.prototype.makeLineHtml = function(isCombined, type, oldNumber, newNumber, content, possiblePrefix) {
    var lineNumberTemplate = hoganUtils.render(baseTemplatesPath, 'numbers', {
      oldNumber: utils.valueOrEmpty(oldNumber),
      newNumber: utils.valueOrEmpty(newNumber)
    });

    var lineWithoutPrefix = content;
    var prefix = possiblePrefix;

    if (!prefix) {
      var lineWithPrefix = printerUtils.separatePrefix(isCombined, content);
      prefix = lineWithPrefix.prefix;
      lineWithoutPrefix = lineWithPrefix.line;
    }

    return hoganUtils.render(genericTemplatesPath, 'line',
      {
        type: type,
        lineClass: 'd2h-code-linenumber',
        contentClass: 'd2h-code-line',
        prefix: prefix,
        content: lineWithoutPrefix,
        lineNumber: lineNumberTemplate
      });
  };

  LineByLinePrinter.prototype._generateEmptyDiff = function() {
    return hoganUtils.render(genericTemplatesPath, 'empty-diff', {
      contentClass: 'd2h-code-line',
      diffParser: diffParser
    });
  };

  module.exports.LineByLinePrinter = LineByLinePrinter;
})();

},{"./diff-parser.js":104,"./hoganjs-utils.js":107,"./printer-utils.js":110,"./rematch.js":111,"./utils.js":114}],110:[function(require,module,exports){
/*
 *
 * PrinterUtils (printer-utils.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var jsDiff = require('diff');
  var utils = require('./utils.js').Utils;
  var Rematch = require('./rematch.js').Rematch;

  var separator = '/';

  function PrinterUtils() {
  }

  PrinterUtils.prototype.separatePrefix = function(isCombined, line) {
    var prefix;
    var lineWithoutPrefix;

    if (isCombined) {
      prefix = line.substring(0, 2);
      lineWithoutPrefix = line.substring(2);
    } else {
      prefix = line.substring(0, 1);
      lineWithoutPrefix = line.substring(1);
    }

    return {
      'prefix': prefix,
      'line': lineWithoutPrefix
    };
  };

  PrinterUtils.prototype.getHtmlId = function(file) {
    var hashCode = function(text) {
      var i, chr, len;
      var hash = 0;

      for (i = 0, len = text.length; i < len; i++) {
        chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }

      return hash;
    };

    return 'd2h-' + hashCode(this.getDiffName(file)).toString().slice(-6);
  };

  PrinterUtils.prototype.getDiffName = function(file) {
    var oldFilename = unifyPath(file.oldName);
    var newFilename = unifyPath(file.newName);

    if (oldFilename && newFilename && oldFilename !== newFilename && !isDevNullName(oldFilename) && !isDevNullName(newFilename)) {
      var prefixPaths = [];
      var suffixPaths = [];

      var oldFilenameParts = oldFilename.split(separator);
      var newFilenameParts = newFilename.split(separator);

      var oldFilenamePartsSize = oldFilenameParts.length;
      var newFilenamePartsSize = newFilenameParts.length;

      var i = 0;
      var j = oldFilenamePartsSize - 1;
      var k = newFilenamePartsSize - 1;

      while (i < j && i < k) {
        if (oldFilenameParts[i] === newFilenameParts[i]) {
          prefixPaths.push(newFilenameParts[i]);
          i += 1;
        } else {
          break;
        }
      }

      while (j > i && k > i) {
        if (oldFilenameParts[j] === newFilenameParts[k]) {
          suffixPaths.unshift(newFilenameParts[k]);
          j -= 1;
          k -= 1;
        } else {
          break;
        }
      }

      var finalPrefix = prefixPaths.join(separator);
      var finalSuffix = suffixPaths.join(separator);

      var oldRemainingPath = oldFilenameParts.slice(i, j + 1).join(separator);
      var newRemainingPath = newFilenameParts.slice(i, k + 1).join(separator);

      if (finalPrefix.length && finalSuffix.length) {
        return finalPrefix + separator + '{' + oldRemainingPath + ' → ' + newRemainingPath + '}' + separator + finalSuffix;
      } else if (finalPrefix.length) {
        return finalPrefix + separator + '{' + oldRemainingPath + ' → ' + newRemainingPath + '}';
      } else if (finalSuffix.length) {
        return '{' + oldRemainingPath + ' → ' + newRemainingPath + '}' + separator + finalSuffix;
      }

      return oldFilename + ' → ' + newFilename;
    } else if (newFilename && !isDevNullName(newFilename)) {
      return newFilename;
    } else if (oldFilename) {
      return oldFilename;
    }

    return 'unknown/file/path';
  };

  PrinterUtils.prototype.getFileTypeIcon = function(file) {
    var templateName = 'file-changed';

    if (file.isRename) {
      templateName = 'file-renamed';
    } else if (file.isCopy) {
      templateName = 'file-renamed';
    } else if (file.isNew) {
      templateName = 'file-added';
    } else if (file.isDeleted) {
      templateName = 'file-deleted';
    } else if (file.newName !== file.oldName) {
      // If file is not Added, not Deleted and the names changed it must be a rename :)
      templateName = 'file-renamed';
    }

    return templateName;
  };

  PrinterUtils.prototype.diffHighlight = function(diffLine1, diffLine2, config) {
    var linePrefix1, linePrefix2, unprefixedLine1, unprefixedLine2;

    var prefixSize = 1;

    if (config.isCombined) {
      prefixSize = 2;
    }

    linePrefix1 = diffLine1.substr(0, prefixSize);
    linePrefix2 = diffLine2.substr(0, prefixSize);
    unprefixedLine1 = diffLine1.substr(prefixSize);
    unprefixedLine2 = diffLine2.substr(prefixSize);

    if (unprefixedLine1.length > config.maxLineLengthHighlight ||
      unprefixedLine2.length > config.maxLineLengthHighlight) {
      return {
        first: {
          prefix: linePrefix1,
          line: utils.escape(unprefixedLine1)
        },
        second: {
          prefix: linePrefix2,
          line: utils.escape(unprefixedLine2)
        }
      };
    }

    var diff;
    if (config.charByChar) {
      diff = jsDiff.diffChars(unprefixedLine1, unprefixedLine2);
    } else {
      diff = jsDiff.diffWordsWithSpace(unprefixedLine1, unprefixedLine2);
    }

    var highlightedLine = '';

    var changedWords = [];
    if (!config.charByChar && config.matching === 'words') {
      var treshold = 0.25;

      if (typeof (config.matchWordsThreshold) !== 'undefined') {
        treshold = config.matchWordsThreshold;
      }

      var matcher = Rematch.rematch(function(a, b) {
        var amod = a.value;
        var bmod = b.value;

        return Rematch.distance(amod, bmod);
      });

      var removed = diff.filter(function isRemoved(element) {
        return element.removed;
      });

      var added = diff.filter(function isAdded(element) {
        return element.added;
      });

      var chunks = matcher(added, removed);
      chunks.forEach(function(chunk) {
        if (chunk[0].length === 1 && chunk[1].length === 1) {
          var dist = Rematch.distance(chunk[0][0].value, chunk[1][0].value);
          if (dist < treshold) {
            changedWords.push(chunk[0][0]);
            changedWords.push(chunk[1][0]);
          }
        }
      });
    }

    diff.forEach(function(part) {
      var addClass = changedWords.indexOf(part) > -1 ? ' class="d2h-change"' : '';
      var elemType = part.added ? 'ins' : part.removed ? 'del' : null;
      var escapedValue = utils.escape(part.value);

      if (elemType !== null) {
        highlightedLine += '<' + elemType + addClass + '>' + escapedValue + '</' + elemType + '>';
      } else {
        highlightedLine += escapedValue;
      }
    });

    return {
      first: {
        prefix: linePrefix1,
        line: removeIns(highlightedLine)
      },
      second: {
        prefix: linePrefix2,
        line: removeDel(highlightedLine)
      }
    };
  };

  function unifyPath(path) {
    if (path) {
      return path.replace('\\', '/');
    }

    return path;
  }

  function isDevNullName(name) {
    return name.indexOf('dev/null') !== -1;
  }

  function removeIns(line) {
    return line.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g, '');
  }

  function removeDel(line) {
    return line.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g, '');
  }

  module.exports.PrinterUtils = new PrinterUtils();
})();

},{"./rematch.js":111,"./utils.js":114,"diff":2}],111:[function(require,module,exports){
/*
 *
 * Rematch (rematch.js)
 * Matching two sequences of objects by similarity
 * Author: W. Illmeyer, Nexxar GmbH
 *
 */

(function() {
  var Rematch = {};

  /*
   Copyright (c) 2011 Andrei Mackenzie
   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
   documentation files (the "Software"), to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
   and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
   THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
   TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  function levenshtein(a, b) {
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }

    var matrix = [];

    // Increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // Increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // Substitution
            Math.min(matrix[i][j - 1] + 1, // Insertion
              matrix[i - 1][j] + 1)); // Deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }

  Rematch.levenshtein = levenshtein;

  Rematch.distance = function distance(x, y) {
    x = x.trim();
    y = y.trim();
    var lev = levenshtein(x, y);
    var score = lev / (x.length + y.length);

    return score;
  };

  Rematch.rematch = function rematch(distanceFunction) {
    function findBestMatch(a, b, cache) {
      var bestMatchDist = Infinity;
      var bestMatch;
      for (var i = 0; i < a.length; ++i) {
        for (var j = 0; j < b.length; ++j) {
          var cacheKey = JSON.stringify([a[i], b[j]]);
          var md;
          if (cache.hasOwnProperty(cacheKey)) {
            md = cache[cacheKey];
          } else {
            md = distanceFunction(a[i], b[j]);
            cache[cacheKey] = md;
          }
          if (md < bestMatchDist) {
            bestMatchDist = md;
            bestMatch = {indexA: i, indexB: j, score: bestMatchDist};
          }
        }
      }

      return bestMatch;
    }

    function group(a, b, level, cache) {
      if (typeof (cache) === 'undefined') {
        cache = {};
      }

      var bm = findBestMatch(a, b, cache);

      if (!level) {
        level = 0;
      }

      if (!bm || (a.length + b.length < 3)) {
        return [[a, b]];
      }

      var a1 = a.slice(0, bm.indexA);
      var b1 = b.slice(0, bm.indexB);
      var aMatch = [a[bm.indexA]];
      var bMatch = [b[bm.indexB]];
      var tailA = bm.indexA + 1;
      var tailB = bm.indexB + 1;
      var a2 = a.slice(tailA);
      var b2 = b.slice(tailB);

      var group1 = group(a1, b1, level + 1, cache);
      var groupMatch = group(aMatch, bMatch, level + 1, cache);
      var group2 = group(a2, b2, level + 1, cache);
      var result = groupMatch;

      if (bm.indexA > 0 || bm.indexB > 0) {
        result = group1.concat(result);
      }

      if (a.length > tailA || b.length > tailB) {
        result = result.concat(group2);
      }

      return result;
    }

    return group;
  };

  module.exports.Rematch = Rematch;
})();

},{}],112:[function(require,module,exports){
/*
 *
 * HtmlPrinter (html-printer.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var diffParser = require('./diff-parser.js').DiffParser;
  var printerUtils = require('./printer-utils.js').PrinterUtils;
  var utils = require('./utils.js').Utils;
  var Rematch = require('./rematch.js').Rematch;

  var hoganUtils;

  var genericTemplatesPath = 'generic';
  var baseTemplatesPath = 'side-by-side';
  var iconsBaseTemplatesPath = 'icon';
  var tagsBaseTemplatesPath = 'tag';

  var matcher = Rematch.rematch(function(a, b) {
    var amod = a.content.substr(1);
    var bmod = b.content.substr(1);

    return Rematch.distance(amod, bmod);
  });

  function SideBySidePrinter(config) {
    this.config = config;

    var HoganJsUtils = require('./hoganjs-utils.js').HoganJsUtils;
    hoganUtils = new HoganJsUtils(config);
  }

  SideBySidePrinter.prototype.makeDiffHtml = function(file, diffs) {
    var fileDiffTemplate = hoganUtils.template(baseTemplatesPath, 'file-diff');
    var filePathTemplate = hoganUtils.template(genericTemplatesPath, 'file-path');
    var fileIconTemplate = hoganUtils.template(iconsBaseTemplatesPath, 'file');
    var fileTagTemplate = hoganUtils.template(tagsBaseTemplatesPath, printerUtils.getFileTypeIcon(file));

    return fileDiffTemplate.render({
      file: file,
      fileHtmlId: printerUtils.getHtmlId(file),
      diffs: diffs,
      filePath: filePathTemplate.render({
        fileDiffName: printerUtils.getDiffName(file)
      }, {
        fileIcon: fileIconTemplate,
        fileTag: fileTagTemplate
      })
    });
  };

  SideBySidePrinter.prototype.generateSideBySideJsonHtml = function(diffFiles) {
    var that = this;

    var content = diffFiles.map(function(file) {
      var diffs;
      if (file.blocks.length) {
        diffs = that.generateSideBySideFileHtml(file);
      } else {
        diffs = that.generateEmptyDiff();
      }

      return that.makeDiffHtml(file, diffs);
    }).join('\n');

    return hoganUtils.render(genericTemplatesPath, 'wrapper', {'content': content});
  };

  SideBySidePrinter.prototype.makeSideHtml = function(blockHeader) {
    return hoganUtils.render(genericTemplatesPath, 'column-line-number', {
      diffParser: diffParser,
      blockHeader: utils.escape(blockHeader),
      lineClass: 'd2h-code-side-linenumber',
      contentClass: 'd2h-code-side-line'
    });
  };

  SideBySidePrinter.prototype.generateSideBySideFileHtml = function(file) {
    var that = this;
    var fileHtml = {};
    fileHtml.left = '';
    fileHtml.right = '';

    file.blocks.forEach(function(block) {
      fileHtml.left += that.makeSideHtml(block.header);
      fileHtml.right += that.makeSideHtml('');

      var oldLines = [];
      var newLines = [];

      function processChangeBlock() {
        var matches;
        var insertType;
        var deleteType;

        var comparisons = oldLines.length * newLines.length;
        var maxComparisons = that.config.matchingMaxComparisons || 2500;
        var doMatching = comparisons < maxComparisons && (that.config.matching === 'lines' ||
          that.config.matching === 'words');

        if (doMatching) {
          matches = matcher(oldLines, newLines);
          insertType = diffParser.LINE_TYPE.INSERT_CHANGES;
          deleteType = diffParser.LINE_TYPE.DELETE_CHANGES;
        } else {
          matches = [[oldLines, newLines]];
          insertType = diffParser.LINE_TYPE.INSERTS;
          deleteType = diffParser.LINE_TYPE.DELETES;
        }

        matches.forEach(function(match) {
          oldLines = match[0];
          newLines = match[1];

          var common = Math.min(oldLines.length, newLines.length);
          var max = Math.max(oldLines.length, newLines.length);

          for (var j = 0; j < common; j++) {
            var oldLine = oldLines[j];
            var newLine = newLines[j];

            that.config.isCombined = file.isCombined;

            var diff = printerUtils.diffHighlight(oldLine.content, newLine.content, that.config);

            fileHtml.left +=
              that.generateSingleLineHtml(file.isCombined, deleteType, oldLine.oldNumber,
                diff.first.line, diff.first.prefix);
            fileHtml.right +=
              that.generateSingleLineHtml(file.isCombined, insertType, newLine.newNumber,
                diff.second.line, diff.second.prefix);
          }

          if (max > common) {
            var oldSlice = oldLines.slice(common);
            var newSlice = newLines.slice(common);

            var tmpHtml = that.processLines(file.isCombined, oldSlice, newSlice);
            fileHtml.left += tmpHtml.left;
            fileHtml.right += tmpHtml.right;
          }
        });

        oldLines = [];
        newLines = [];
      }

      for (var i = 0; i < block.lines.length; i++) {
        var line = block.lines[i];
        var prefix = line.content[0];
        var escapedLine = utils.escape(line.content.substr(1));

        if (line.type !== diffParser.LINE_TYPE.INSERTS &&
          (newLines.length > 0 || (line.type !== diffParser.LINE_TYPE.DELETES && oldLines.length > 0))) {
          processChangeBlock();
        }

        if (line.type === diffParser.LINE_TYPE.CONTEXT) {
          fileHtml.left += that.generateSingleLineHtml(file.isCombined, line.type, line.oldNumber, escapedLine, prefix);
          fileHtml.right += that.generateSingleLineHtml(file.isCombined, line.type, line.newNumber, escapedLine, prefix);
        } else if (line.type === diffParser.LINE_TYPE.INSERTS && !oldLines.length) {
          fileHtml.left += that.generateSingleLineHtml(file.isCombined, diffParser.LINE_TYPE.CONTEXT, '', '', '');
          fileHtml.right += that.generateSingleLineHtml(file.isCombined, line.type, line.newNumber, escapedLine, prefix);
        } else if (line.type === diffParser.LINE_TYPE.DELETES) {
          oldLines.push(line);
        } else if (line.type === diffParser.LINE_TYPE.INSERTS && Boolean(oldLines.length)) {
          newLines.push(line);
        } else {
          console.error('unknown state in html side-by-side generator');
          processChangeBlock();
        }
      }

      processChangeBlock();
    });

    return fileHtml;
  };

  SideBySidePrinter.prototype.processLines = function(isCombined, oldLines, newLines) {
    var that = this;
    var fileHtml = {};
    fileHtml.left = '';
    fileHtml.right = '';

    var maxLinesNumber = Math.max(oldLines.length, newLines.length);
    for (var i = 0; i < maxLinesNumber; i++) {
      var oldLine = oldLines[i];
      var newLine = newLines[i];
      var oldContent;
      var newContent;
      var oldPrefix;
      var newPrefix;

      if (oldLine) {
        oldContent = utils.escape(oldLine.content.substr(1));
        oldPrefix = oldLine.content[0];
      }

      if (newLine) {
        newContent = utils.escape(newLine.content.substr(1));
        newPrefix = newLine.content[0];
      }

      if (oldLine && newLine) {
        fileHtml.left += that.generateSingleLineHtml(isCombined, oldLine.type, oldLine.oldNumber, oldContent, oldPrefix);
        fileHtml.right += that.generateSingleLineHtml(isCombined, newLine.type, newLine.newNumber, newContent, newPrefix);
      } else if (oldLine) {
        fileHtml.left += that.generateSingleLineHtml(isCombined, oldLine.type, oldLine.oldNumber, oldContent, oldPrefix);
        fileHtml.right += that.generateSingleLineHtml(isCombined, diffParser.LINE_TYPE.CONTEXT, '', '', '');
      } else if (newLine) {
        fileHtml.left += that.generateSingleLineHtml(isCombined, diffParser.LINE_TYPE.CONTEXT, '', '', '');
        fileHtml.right += that.generateSingleLineHtml(isCombined, newLine.type, newLine.newNumber, newContent, newPrefix);
      } else {
        console.error('How did it get here?');
      }
    }

    return fileHtml;
  };

  SideBySidePrinter.prototype.generateSingleLineHtml = function(isCombined, type, number, content, possiblePrefix) {
    var lineWithoutPrefix = content;
    var prefix = possiblePrefix;
    var lineClass = 'd2h-code-side-linenumber';
    var contentClass = 'd2h-code-side-line';

    if (!number && !content) {
      lineClass += ' d2h-code-side-emptyplaceholder';
      contentClass += ' d2h-code-side-emptyplaceholder';
      type += ' d2h-emptyplaceholder';
    }

    if (!prefix) {
      var lineWithPrefix = printerUtils.separatePrefix(isCombined, content);
      prefix = lineWithPrefix.prefix;
      lineWithoutPrefix = lineWithPrefix.line;
    }

    return hoganUtils.render(genericTemplatesPath, 'line',
      {
        type: type,
        lineClass: lineClass,
        contentClass: contentClass,
        prefix: prefix,
        content: lineWithoutPrefix,
        lineNumber: number
      });
  };

  SideBySidePrinter.prototype.generateEmptyDiff = function() {
    var fileHtml = {};
    fileHtml.right = '';

    fileHtml.left = hoganUtils.render(genericTemplatesPath, 'empty-diff', {
      contentClass: 'd2h-code-side-line',
      diffParser: diffParser
    });

    return fileHtml;
  };

  module.exports.SideBySidePrinter = SideBySidePrinter;
})();

},{"./diff-parser.js":104,"./hoganjs-utils.js":107,"./printer-utils.js":110,"./rematch.js":111,"./utils.js":114}],113:[function(require,module,exports){
(function (global){
(function() {
if (!!!global.browserTemplates) global.browserTemplates = {};
var Hogan = require("hogan.js");global.browserTemplates["file-summary-line"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"d2h-file-list-line\">");t.b("\n" + i);t.b("    <span class=\"d2h-file-name-wrapper\">");t.b("\n" + i);t.b("      <span>");t.b(t.rp("<fileIcon0",c,p,""));t.b("</span>");t.b("\n" + i);t.b("      <a href=\"#");t.b(t.v(t.f("fileHtmlId",c,p,0)));t.b("\" class=\"d2h-file-name\">");t.b(t.v(t.f("fileName",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("      <span class=\"d2h-file-stats\">");t.b("\n" + i);t.b("          <span class=\"d2h-lines-added\">");t.b(t.v(t.f("addedLines",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("          <span class=\"d2h-lines-deleted\">");t.b(t.v(t.f("deletedLines",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("      </span>");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("</li>");return t.fl(); },partials: {"<fileIcon0":{name:"fileIcon", partials: {}, subs: {  }}}, subs: {  }});
global.browserTemplates["file-summary-wrapper"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"d2h-file-list-wrapper\">");t.b("\n" + i);t.b("    <div class=\"d2h-file-list-header\">");t.b("\n" + i);t.b("        <span class=\"d2h-file-list-title\">Files changed (");t.b(t.v(t.f("filesNumber",c,p,0)));t.b(")</span>");t.b("\n" + i);t.b("        <a class=\"d2h-file-switch d2h-hide\">hide</a>");t.b("\n" + i);t.b("        <a class=\"d2h-file-switch d2h-show\">show</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <ol class=\"d2h-file-list\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("files",c,p,0)));t.b("\n" + i);t.b("    </ol>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["generic-column-line-number"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr>");t.b("\n" + i);t.b("    <td class=\"");t.b(t.v(t.f("lineClass",c,p,0)));t.b(" ");t.b(t.v(t.d("diffParser.LINE_TYPE.INFO",c,p,0)));t.b("\"></td>");t.b("\n" + i);t.b("    <td class=\"");t.b(t.v(t.d("diffParser.LINE_TYPE.INFO",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("contentClass",c,p,0)));t.b(" ");t.b(t.v(t.d("diffParser.LINE_TYPE.INFO",c,p,0)));t.b("\">");t.b(t.t(t.f("blockHeader",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    </td>");t.b("\n" + i);t.b("</tr>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["generic-empty-diff"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr>");t.b("\n" + i);t.b("    <td class=\"");t.b(t.v(t.d("diffParser.LINE_TYPE.INFO",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("contentClass",c,p,0)));t.b(" ");t.b(t.v(t.d("diffParser.LINE_TYPE.INFO",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            File without changes");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </td>");t.b("\n" + i);t.b("</tr>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["generic-file-path"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"d2h-file-name-wrapper\">");t.b("\n" + i);t.b("    <span class=\"d2h-icon-wrapper\">");t.b(t.rp("<fileIcon0",c,p,""));t.b("</span>");t.b("\n" + i);t.b("    <span class=\"d2h-file-name\">");t.b(t.v(t.f("fileDiffName",c,p,0)));t.b("</span>");t.b("\n" + i);t.b(t.rp("<fileTag1",c,p,"    "));t.b("</span>");return t.fl(); },partials: {"<fileIcon0":{name:"fileIcon", partials: {}, subs: {  }},"<fileTag1":{name:"fileTag", partials: {}, subs: {  }}}, subs: {  }});
global.browserTemplates["generic-line"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<tr>");t.b("\n" + i);t.b("    <td class=\"");t.b(t.v(t.f("lineClass",c,p,0)));t.b(" ");t.b(t.v(t.f("type",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      ");t.b(t.t(t.f("lineNumber",c,p,0)));t.b("\n" + i);t.b("    </td>");t.b("\n" + i);t.b("    <td class=\"");t.b(t.v(t.f("type",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div class=\"");t.b(t.v(t.f("contentClass",c,p,0)));t.b(" ");t.b(t.v(t.f("type",c,p,0)));t.b("\">");t.b("\n" + i);if(t.s(t.f("prefix",c,p,1),c,p,0,171,247,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <span class=\"d2h-code-line-prefix\">");t.b(t.t(t.f("prefix",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}if(t.s(t.f("content",c,p,1),c,p,0,279,353,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <span class=\"d2h-code-line-ctn\">");t.b(t.t(t.f("content",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}t.b("        </div>");t.b("\n" + i);t.b("    </td>");t.b("\n" + i);t.b("</tr>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["generic-wrapper"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"d2h-wrapper\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("content",c,p,0)));t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["icon-file-added"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-added\" height=\"16\" title=\"added\" version=\"1.1\" viewBox=\"0 0 14 16\"");t.b("\n" + i);t.b("     width=\"14\">");t.b("\n" + i);t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z\"></path>");t.b("\n" + i);t.b("</svg>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["icon-file-changed"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-changed\" height=\"16\" title=\"modified\" version=\"1.1\"");t.b("\n" + i);t.b("     viewBox=\"0 0 14 16\" width=\"14\">");t.b("\n" + i);t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z\"></path>");t.b("\n" + i);t.b("</svg>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["icon-file-deleted"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-deleted\" height=\"16\" title=\"removed\" version=\"1.1\"");t.b("\n" + i);t.b("     viewBox=\"0 0 14 16\" width=\"14\">");t.b("\n" + i);t.b("    <path d=\"M13 1H1C0.45 1 0 1.45 0 2v12c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1V2c0-0.55-0.45-1-1-1z m0 13H1V2h12v12zM11 9H3V7h8v2z\"></path>");t.b("\n" + i);t.b("</svg>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["icon-file-renamed"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<svg aria-hidden=\"true\" class=\"d2h-icon d2h-moved\" height=\"16\" title=\"renamed\" version=\"1.1\"");t.b("\n" + i);t.b("     viewBox=\"0 0 14 16\" width=\"14\">");t.b("\n" + i);t.b("    <path d=\"M6 9H3V7h3V4l5 4-5 4V9z m8-7v12c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h12c0.55 0 1 0.45 1 1z m-1 0H1v12h12V2z\"></path>");t.b("\n" + i);t.b("</svg>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["icon-file"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<svg aria-hidden=\"true\" class=\"d2h-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\">");t.b("\n" + i);t.b("    <path d=\"M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z\"></path>");t.b("\n" + i);t.b("</svg>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["line-by-line-file-diff"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"");t.b(t.v(t.f("fileHtmlId",c,p,0)));t.b("\" class=\"d2h-file-wrapper\" data-lang=\"");t.b(t.v(t.d("file.language",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div class=\"d2h-file-header\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("filePath",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"d2h-file-diff\">");t.b("\n" + i);t.b("        <div class=\"d2h-code-wrapper\">");t.b("\n" + i);t.b("            <table class=\"d2h-diff-table\">");t.b("\n" + i);t.b("                <tbody class=\"d2h-diff-tbody\">");t.b("\n" + i);t.b("                ");t.b(t.t(t.f("diffs",c,p,0)));t.b("\n" + i);t.b("                </tbody>");t.b("\n" + i);t.b("            </table>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["line-by-line-numbers"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"line-num1\">");t.b(t.v(t.f("oldNumber",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("<div class=\"line-num2\">");t.b(t.v(t.f("newNumber",c,p,0)));t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["side-by-side-file-diff"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"");t.b(t.v(t.f("fileHtmlId",c,p,0)));t.b("\" class=\"d2h-file-wrapper\" data-lang=\"");t.b(t.v(t.d("file.language",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div class=\"d2h-file-header\">");t.b("\n" + i);t.b("      ");t.b(t.t(t.f("filePath",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"d2h-files-diff\">");t.b("\n" + i);t.b("        <div class=\"d2h-file-side-diff\">");t.b("\n" + i);t.b("            <div class=\"d2h-code-wrapper\">");t.b("\n" + i);t.b("                <table class=\"d2h-diff-table\">");t.b("\n" + i);t.b("                    <tbody class=\"d2h-diff-tbody\">");t.b("\n" + i);t.b("                    ");t.b(t.t(t.d("diffs.left",c,p,0)));t.b("\n" + i);t.b("                    </tbody>");t.b("\n" + i);t.b("                </table>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"d2h-file-side-diff\">");t.b("\n" + i);t.b("            <div class=\"d2h-code-wrapper\">");t.b("\n" + i);t.b("                <table class=\"d2h-diff-table\">");t.b("\n" + i);t.b("                    <tbody class=\"d2h-diff-tbody\">");t.b("\n" + i);t.b("                    ");t.b(t.t(t.d("diffs.right",c,p,0)));t.b("\n" + i);t.b("                    </tbody>");t.b("\n" + i);t.b("                </table>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["tag-file-added"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"d2h-tag d2h-added d2h-added-tag\">ADDED</span>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["tag-file-changed"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"d2h-tag d2h-changed d2h-changed-tag\">CHANGED</span>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["tag-file-deleted"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"d2h-tag d2h-deleted d2h-deleted-tag\">DELETED</span>");return t.fl(); },partials: {}, subs: {  }});
global.browserTemplates["tag-file-renamed"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"d2h-tag d2h-moved d2h-moved-tag\">RENAMED</span>");return t.fl(); },partials: {}, subs: {  }});
module.exports = global.browserTemplates;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"hogan.js":4}],114:[function(require,module,exports){
/*
 *
 * Utils (utils.js)
 * Author: rtfpessoa
 *
 */

(function() {
  var merge = require('lodash/merge');

  function Utils() {
  }

  Utils.prototype.escape = function(str) {
    return str.slice(0)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/\t/g, '    ');
  };

  Utils.prototype.startsWith = function(str, start) {
    if (typeof start === 'object') {
      var result = false;
      start.forEach(function(s) {
        if (str.indexOf(s) === 0) {
          result = true;
        }
      });

      return result;
    }

    return str && str.indexOf(start) === 0;
  };

  Utils.prototype.valueOrEmpty = function(value) {
    return value || '';
  };

  Utils.prototype.safeConfig = function(cfg, defaultConfig) {
    var newCfg = {};
    merge(newCfg, defaultConfig, cfg);
    return newCfg;
  };

  module.exports.Utils = new Utils();
})();

},{"lodash/merge":99}]},{},[105]);
