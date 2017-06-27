(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.arrayDiff = undefined;
exports. /*istanbul ignore end*/diffArrays = diffArrays;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var arrayDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/arrayDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
arrayDiff.tokenize = arrayDiff.join = function (value) {
  return value.slice();
};

function diffArrays(oldArr, newArr, callback) {
  return arrayDiff.diff(oldArr, newArr, callback);
}


},{"./base":5}],5:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports['default'] = /*istanbul ignore end*/Diff;
function Diff() {}

Diff.prototype = { /*istanbul ignore start*/
  /*istanbul ignore end*/diff: function diff(oldString, newString) {
    /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

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
    return left === right;
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

  // Special case handle for when one terminal is ignored. For this case we merge the
  // terminal into the prior string and drop the change.
  var lastComponent = components[componentLen - 1];
  if (componentLen > 1 && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
    components[componentLen - 2].value += lastComponent.value;
    components.pop();
  }

  return components;
}

function clonePath(path) {
  return { newPos: path.newPos, components: path.components.slice(0) };
}


},{}],6:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.characterDiff = undefined;
exports. /*istanbul ignore end*/diffChars = diffChars;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var characterDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/characterDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
function diffChars(oldStr, newStr, callback) {
  return characterDiff.diff(oldStr, newStr, callback);
}


},{"./base":5}],7:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.cssDiff = undefined;
exports. /*istanbul ignore end*/diffCss = diffCss;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var cssDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/cssDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
cssDiff.tokenize = function (value) {
  return value.split(/([{}:;,]|\s+)/);
};

function diffCss(oldStr, newStr, callback) {
  return cssDiff.diff(oldStr, newStr, callback);
}


},{"./base":5}],8:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.jsonDiff = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports. /*istanbul ignore end*/diffJson = diffJson;
/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = canonicalize;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_line = require('./line') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/

var objectPrototypeToString = Object.prototype.toString;

var jsonDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/jsonDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
// Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
jsonDiff.useLongestToken = true;

jsonDiff.tokenize = /*istanbul ignore start*/_line.lineDiff. /*istanbul ignore end*/tokenize;
jsonDiff.castInput = function (value) {
  /*istanbul ignore start*/var /*istanbul ignore end*/undefinedReplacement = this.options.undefinedReplacement;


  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value), function (k, v) {
    if (typeof v === 'undefined') {
      return undefinedReplacement;
    }

    return v;
  }, '  ');
};
jsonDiff.equals = function (left, right) {
  return (/*istanbul ignore start*/_base2['default']. /*istanbul ignore end*/prototype.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'))
  );
};

function diffJson(oldObj, newObj, options) {
  return jsonDiff.diff(oldObj, newObj, options);
}

// This function handles the presence of circular references by bailing out when encountering an
// object that is already on the "stack" of items being processed.
function canonicalize(obj, stack, replacementStack) {
  stack = stack || [];
  replacementStack = replacementStack || [];

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
      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
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
        key = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
    for (key in obj) {
      /* istanbul ignore else */
      if (obj.hasOwnProperty(key)) {
        sortedKeys.push(key);
      }
    }
    sortedKeys.sort();
    for (i = 0; i < sortedKeys.length; i += 1) {
      key = sortedKeys[i];
      canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
    }
    stack.pop();
    replacementStack.pop();
  } else {
    canonicalizedObj = obj;
  }
  return canonicalizedObj;
}


},{"./base":5,"./line":9}],9:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.lineDiff = undefined;
exports. /*istanbul ignore end*/diffLines = diffLines;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = diffTrimmedLines;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_params = require('../util/params') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var lineDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/lineDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
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


},{"../util/params":17,"./base":5}],10:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.sentenceDiff = undefined;
exports. /*istanbul ignore end*/diffSentences = diffSentences;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/var sentenceDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/sentenceDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
sentenceDiff.tokenize = function (value) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

function diffSentences(oldStr, newStr, callback) {
  return sentenceDiff.diff(oldStr, newStr, callback);
}


},{"./base":5}],11:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.wordDiff = undefined;
exports. /*istanbul ignore end*/diffWords = diffWords;
/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = diffWordsWithSpace;

var /*istanbul ignore start*/_base = require('./base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_params = require('../util/params') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/

// Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
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

var wordDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/wordDiff = new /*istanbul ignore start*/_base2['default']() /*istanbul ignore end*/;
wordDiff.equals = function (left, right) {
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

function diffWords(oldStr, newStr, callback) {
  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
  return wordDiff.diff(oldStr, newStr, options);
}
function diffWordsWithSpace(oldStr, newStr, callback) {
  return wordDiff.diff(oldStr, newStr, callback);
}


},{"../util/params":17,"./base":5}],12:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffArrays = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;
/*istanbul ignore end*/
var /*istanbul ignore start*/_base = require('./diff/base') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _base2 = _interopRequireDefault(_base);

/*istanbul ignore end*/
var /*istanbul ignore start*/_character = require('./diff/character') /*istanbul ignore end*/;

var /*istanbul ignore start*/_word = require('./diff/word') /*istanbul ignore end*/;

var /*istanbul ignore start*/_line = require('./diff/line') /*istanbul ignore end*/;

var /*istanbul ignore start*/_sentence = require('./diff/sentence') /*istanbul ignore end*/;

var /*istanbul ignore start*/_css = require('./diff/css') /*istanbul ignore end*/;

var /*istanbul ignore start*/_json = require('./diff/json') /*istanbul ignore end*/;

var /*istanbul ignore start*/_array = require('./diff/array') /*istanbul ignore end*/;

var /*istanbul ignore start*/_apply = require('./patch/apply') /*istanbul ignore end*/;

var /*istanbul ignore start*/_parse = require('./patch/parse') /*istanbul ignore end*/;

var /*istanbul ignore start*/_create = require('./patch/create') /*istanbul ignore end*/;

var /*istanbul ignore start*/_dmp = require('./convert/dmp') /*istanbul ignore end*/;

var /*istanbul ignore start*/_xml = require('./convert/xml') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToDMP = _dmp.convertChangesToDMP;
/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToXML = _xml.convertChangesToXML;
/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = _json.canonicalize; /* See LICENSE file for terms of use */

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


},{"./convert/dmp":2,"./convert/xml":3,"./diff/array":4,"./diff/base":5,"./diff/character":6,"./diff/css":7,"./diff/json":8,"./diff/line":9,"./diff/sentence":10,"./diff/word":11,"./patch/apply":13,"./patch/create":14,"./patch/parse":15}],13:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports. /*istanbul ignore end*/applyPatch = applyPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = applyPatches;

var /*istanbul ignore start*/_parse = require('./parse') /*istanbul ignore end*/;

var /*istanbul ignore start*/_distanceIterator = require('../util/distance-iterator') /*istanbul ignore end*/;

/*istanbul ignore start*/
var _distanceIterator2 = _interopRequireDefault(_distanceIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*istanbul ignore end*/function applyPatch(source, uniDiff) {
  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

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
          operation = line[0],
          content = line.substr(1);

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
  for (var _i = 0; _i < hunks.length; _i++) {
    var _hunk = hunks[_i],
        _toPos = _hunk.offset + _hunk.newStart - 1;
    if (_hunk.newLines == 0) {
      _toPos++;
    }

    for (var j = 0; j < _hunk.lines.length; j++) {
      var line = _hunk.lines[j],
          operation = line[0],
          content = line.substr(1),
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


},{"../util/distance-iterator":16,"./parse":15}],14:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports. /*istanbul ignore end*/structuredPatch = structuredPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;
/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;

var /*istanbul ignore start*/_line = require('../diff/line') /*istanbul ignore end*/;

/*istanbul ignore start*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  /*istanbul ignore start*/
  var _loop = function _loop( /*istanbul ignore end*/i) {
    var current = diff[i],
        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
    current.lines = lines;

    if (current.added || current.removed) {
      /*istanbul ignore start*/
      var _curRange;

      /*istanbul ignore end*/
      // If we have previous context, start with that
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
          /*istanbul ignore start*/
          var _curRange2;

          /*istanbul ignore end*/
          // Overlapping
          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));
        } else {
          /*istanbul ignore start*/
          var _curRange3;

          /*istanbul ignore end*/
          // end the range and output
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
    /*istanbul ignore start*/
    _loop( /*istanbul ignore end*/i);
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


},{"../diff/line":9}],15:[function(require,module,exports){
/*istanbul ignore start*/'use strict';

exports.__esModule = true;
exports. /*istanbul ignore end*/parsePatch = parsePatch;
function parsePatch(uniDiff) {
  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
    var headerPattern = /^(---|\+\+\+)\s+([\S ]*)(?:\t(.*?)\s*)?$/;
    var fileHeader = headerPattern.exec(diffstr[i]);
    if (fileHeader) {
      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
      index[keyPrefix + 'FileName'] = fileHeader[2];
      index[keyPrefix + 'Header'] = fileHeader[3];

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
      var operation = diffstr[i][0];

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


},{}],16:[function(require,module,exports){
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

    // We tried to fit hunk before text beginning and beyond text lenght, then
    // hunk can't fit on the text. Return undefined
  };
};


},{}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./compiler":18,"./template":20}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
},{"_process":22}],22:[function(require,module,exports){
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],23:[function(require,module,exports){
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
      filename = filename.replace(/\s+\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)? \+\d{4}.*$/, '');
    }

    return filename;
  }

  module.exports.DiffParser = new DiffParser();
})();

},{"./utils.js":33}],24:[function(require,module,exports){
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

  function Diff2Html() {
  }

  /*
   * Line diff type configuration
   var config = {
   'wordByWord': true, // (default)
   // OR
   'charByChar': true
   };
   */

  /*
   * Generates json object from string diff input
   */
  Diff2Html.prototype.getJsonFromDiff = function(diffInput, config) {
    var configOrEmpty = config || {};
    return diffParser.generateDiffJson(diffInput, configOrEmpty);
  };

  /*
   * Generates the html diff. The config parameter configures the output/input formats and other options
   */
  Diff2Html.prototype.getPrettyHtml = function(diffInput, config) {
    var configOrEmpty = config || {};

    var diffJson = diffInput;
    if (!configOrEmpty.inputFormat || configOrEmpty.inputFormat === 'diff') {
      diffJson = diffParser.generateDiffJson(diffInput, configOrEmpty);
    }

    var fileList = '';
    if (configOrEmpty.showFiles === true) {
      fileList = htmlPrinter.generateFileListSummary(diffJson, configOrEmpty);
    }

    var diffOutput = '';
    if (configOrEmpty.outputFormat === 'side-by-side') {
      diffOutput = htmlPrinter.generateSideBySideJsonHtml(diffJson, configOrEmpty);
    } else {
      diffOutput = htmlPrinter.generateLineByLineJsonHtml(diffJson, configOrEmpty);
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
    var configOrEmpty = config || {};
    configOrEmpty.inputFormat = 'diff';
    configOrEmpty.outputFormat = 'line-by-line';
    return this.getPrettyHtml(diffInput, configOrEmpty);
  };

  /*
   * Generates pretty html from a json object
   */
  Diff2Html.prototype.getPrettyHtmlFromJson = function(diffJson, config) {
    var configOrEmpty = config || {};
    configOrEmpty.inputFormat = 'json';
    configOrEmpty.outputFormat = 'line-by-line';
    return this.getPrettyHtml(diffJson, configOrEmpty);
  };

  /*
   * Generates pretty side by side html from string diff input
   */
  Diff2Html.prototype.getPrettySideBySideHtmlFromDiff = function(diffInput, config) {
    var configOrEmpty = config || {};
    configOrEmpty.inputFormat = 'diff';
    configOrEmpty.outputFormat = 'side-by-side';
    return this.getPrettyHtml(diffInput, configOrEmpty);
  };

  /*
   * Generates pretty side by side html from a json object
   */
  Diff2Html.prototype.getPrettySideBySideHtmlFromJson = function(diffJson, config) {
    var configOrEmpty = config || {};
    configOrEmpty.inputFormat = 'json';
    configOrEmpty.outputFormat = 'side-by-side';
    return this.getPrettyHtml(diffJson, configOrEmpty);
  };

  var diffObject = new Diff2Html();
  module.exports.Diff2Html = diffObject;

  // Expose diff2html in the browser
  global.Diff2Html = diffObject;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./diff-parser.js":23,"./html-printer.js":27}],25:[function(require,module,exports){
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

},{"./hoganjs-utils.js":26,"./printer-utils.js":29}],26:[function(require,module,exports){
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
},{"./templates/diff2html-templates.js":32,"fs":1,"hogan.js":19,"path":21}],27:[function(require,module,exports){
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

},{"./file-list-printer.js":25,"./line-by-line-printer.js":28,"./side-by-side-printer.js":31}],28:[function(require,module,exports){
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

},{"./diff-parser.js":23,"./hoganjs-utils.js":26,"./printer-utils.js":29,"./rematch.js":30,"./utils.js":33}],29:[function(require,module,exports){
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

},{"./rematch.js":30,"./utils.js":33,"diff":12}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

    if (!prefix) {
      var lineWithPrefix = printerUtils.separatePrefix(isCombined, content);
      prefix = lineWithPrefix.prefix;
      lineWithoutPrefix = lineWithPrefix.line;
    }

    return hoganUtils.render(genericTemplatesPath, 'line',
      {
        type: type,
        lineClass: 'd2h-code-side-linenumber',
        contentClass: 'd2h-code-side-line',
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

},{"./diff-parser.js":23,"./hoganjs-utils.js":26,"./printer-utils.js":29,"./rematch.js":30,"./utils.js":33}],32:[function(require,module,exports){
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
},{"hogan.js":19}],33:[function(require,module,exports){
/*
 *
 * Utils (utils.js)
 * Author: rtfpessoa
 *
 */

(function() {
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

  module.exports.Utils = new Utils();
})();

},{}]},{},[24]);
