module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * #logger
 * logger = require('logger').create()
 * logger.info("blah")
 * => [2011-3-3T20:24:4.810 info (5021)] blah
 * logger.debug("boom")
 * =>
 * logger.level = Logger.levels.debug
 * logger.debug(function() { return "booom" })
 * => [2011-3-3T20:24:4.810 error (5021)] booom
 */

function formatTime(timestamp) {
  var hh = timestamp.getUTCHours();
  var mm = timestamp.getUTCMinutes();
  var ss = timestamp.getSeconds();
  var ms = timestamp.getMilliseconds
  // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
  // if (hh > 12) {hh = hh % 12;}
  // These lines ensure you have two-digits
  ();if (hh < 10) {
    hh = '0' + hh;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (ss < 10) {
    ss = '0' + ss;
  }
  if (ms < 100) {
    ms = '0' + ms;
  }
  if (ms < 10) {
    ms = '00' + ms;
  }
  // This formats your string to HH:MM:SS
  var t = hh + ':' + mm + ':' + ss + ' (' + ms + ')';
  return t;
}

function format(level) {
  const time = formatTime(new Date());
  return '%c ' + time + ' :%c' + level + ': ';
}

var debug = function () {};
var info = function () {};
var warn = function () {};
var error = function () {};
var fatal = function () {};

/**
 * logLevel , decides the amount of logging to be used.
 *    * debug: 1
 *    * info: 2
 *    * warn: 3
 *    * error: 4
 *    * fatal: 5
 */
exports.setLogLevel = function (level) {
  if (level < 6) {
    exports.Log.fatal = console.log.bind(console, format('FATAL'), 'color:grey;', 'color: red;');
  }
  if (level < 5) {
    exports.Log.error = console.log.bind(console, format('ERROR'), 'color:grey;', 'color: red;');
  }
  if (level < 4) {
    exports.Log.warn = console.log.bind(console, format('WARN'), 'color:grey;', 'color: orange;');
  }
  if (level < 3) {
    exports.Log.info = console.log.bind(console, format('INFO'), 'color:grey;', 'color: info;');
  }
  if (level < 2) {
    exports.Log.debug = console.log.bind(console, format('DEBUG'), 'color:grey;', 'color: green;');
  }
};

exports.Log = {
  debug: debug,
  info: info,
  warn: warn,
  error: error,
  fatal: fatal
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const d3 = __webpack_require__(30);

module.exports = d3;

/*
 D3 Text Wrap
 By Vijith Assar
 http://www.vijithassar.com
 http://www.github.com/vijithassar
 @vijithassar

 Detailed instructions at http://www.github.com/vijithassar/d3textwrap
 */

(function () {
  // set this variable to a string value to always force a particular
  // wrap method for development purposes, for example to check tspan
  // rendering using a foreignobject-enabled browser. set to 'tspan' to
  // use tspans and 'foreignobject' to use foreignobject
  var forceWrapMethod = false; // by default no wrap method is forced
  forceWrapMethod = 'tspans'; // uncomment this statement to force tspans
  // force_wrap_method = 'foreignobjects'; // uncomment this statement to force foreignobjects

  // exit immediately if something in this location
  // has already been defined; the plugin will defer to whatever
  // else you're doing in your code
  if (d3.selection.prototype.textwrap) {
    return false;
  }

  // double check the force_wrap_method flag
  // and reset if someone screwed up the above
  // settings
  if (typeof forceWrapMethod === 'undefined') {
    forceWrapMethod = false;
  }

  // create the plugin method twice, both for regular use
  // and again for use inside the enter() selection
  d3.selection.prototype.textwrap = d3.selection.enter.prototype.textwrap = function (bounds, padding) {
    // default value of padding is zero if it's undefined
    padding = parseInt(padding) || 0;

    // save callee into a variable so we can continue to refer to it
    // as the function scope changes
    var selection = this;

    // create a variable to store desired return values in
    var returnValue;

    // extract wrap boundaries from any d3-selected rect and return them
    // in a format that matches the simpler object argument option
    var extractBounds = function (bounds) {
      // discard the nested array wrappers added by d3
      var boundingRect = bounds[0][0];
      // sanitize the svg element name so we can test against it
      var elementType = boundingRect.tagName.toString
      // if it's not a rect, exit
      ();if (elementType !== 'rect') {
        return false;
        // if it's a rect, proceed to extracting the position attributes
      } else {
        var boundsExtracted = {};
        boundsExtracted.x = d3.select(boundingRect).attr('x') || 0;
        boundsExtracted.y = d3.select(boundingRect).attr('y') || 0;
        boundsExtracted.width = d3.select(boundingRect).attr('width') || 0;
        boundsExtracted.height = d3.select(boundingRect).attr('height') || 0;
        // also pass along the getter function
        boundsExtracted.attr = bounds.attr;
      }
      return boundsExtracted;
    };

    // double check the input argument for the wrapping
    // boundaries to make sure it actually contains all
    // the information we'll need in order to wrap successfully
    var verifyBounds = function (bounds) {
      // quickly add a simple getter method so you can use either
      // bounds.x or bounds.attr('x') as your notation,
      // the latter being a common convention among D3
      // developers
      if (!bounds.attr) {
        bounds.attr = function (property) {
          if (this[property]) {
            return this[property];
          }
        };
      }
      // if it's an associative array, make sure it has all the
      // necessary properties represented directly
      if (typeof bounds === 'object' && typeof bounds.x !== 'undefined' && typeof bounds.y !== 'undefined' && typeof bounds.width !== 'undefined' && typeof bounds.height !== 'undefined'
      // if that's the case, then the bounds are fine
      ) {
          // return the lightly modified bounds
          return bounds;
          // if it's a numerically indexed array, assume it's a
          // d3-selected rect and try to extract the positions
        } else if (
      // first try to make sure it's an array using Array.isArray
      typeof Array.isArray === 'function' && Array.isArray(bounds) ||
      // but since Array.isArray isn't always supported, fall
      // back to casting to the object to string when it's not
      Object.prototype.toString.call(bounds) === '[object Array]') {
        // once you're sure it's an array, extract the boundaries
        // from the rect
        var extractedBounds = extractBounds(bounds);
        return extractedBounds;
      } else {
        // but if the bounds are neither an object nor a numerical
        // array, then the bounds argument is invalid and you'll
        // need to fix it
        return false;
      }
    };

    var applyPadding = function (bounds, padding) {
      var paddedBounds = bounds;
      if (padding !== 0) {
        paddedBounds.x = parseInt(paddedBounds.x) + padding;
        paddedBounds.y = parseInt(paddedBounds.y) + padding;
        paddedBounds.width -= padding * 2;
        paddedBounds.height -= padding * 2;
      }
      return paddedBounds;
    };

    // verify bounds
    var verifiedBounds = verifyBounds(bounds

    // modify bounds if a padding value is provided
    );if (padding) {
      verifiedBounds = applyPadding(verifiedBounds, padding);
    }

    // check that we have the necessary conditions for this function to operate properly
    if (
    // selection it's operating on cannot be not empty
    selection.length === 0 ||
    // d3 must be available
    !d3 ||
    // desired wrapping bounds must be provided as an input argument
    !bounds ||
    // input bounds must validate
    !verifiedBounds) {
      // try to return the calling selection if possible
      // so as not to interfere with methods downstream in the
      // chain
      if (selection) {
        return selection;
        // if all else fails, just return false. if you hit this point then you're
        // almost certainly trying to call the textwrap() method on something that
        // doesn't make sense!
      } else {
        return false;
      }
      // if we've validated everything then we can finally proceed
      // to the meat of this operation
    } else {
      // reassign the verified bounds as the set we want
      // to work with from here on; this ensures that we're
      // using the same data structure for our bounds regardless
      // of whether the input argument was a simple object or
      // a d3 selection
      bounds = verifiedBounds;

      // wrap using html and foreignObjects if they are supported
      var wrapWithForeignobjects = function (item) {
        // establish variables to quickly reference target nodes later
        var parent = d3.select(item[0].parentNode);
        var textNode = parent.select('text');
        var styledLineHeight = textNode.style('line-height'
        // extract our desired content from the single text element
        );var textToWrap = textNode.text
        // remove the text node and replace with a foreign object
        ();textNode.remove();
        var foreignObject = parent.append('foreignObject'
        // add foreign object and set dimensions, position, etc
        );foreignObject.attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility').attr('x', bounds.x).attr('y', bounds.y).attr('width', bounds.width).attr('height', bounds.height
        // insert an HTML div
        );var wrapDiv = foreignObject.append('xhtml:div'
        // this class is currently hardcoded
        // probably not necessary but easy to
        // override using .classed() and for now
        // it's nice to avoid a litany of input
        // arguments
        ).attr('class', 'wrapped'
        // set div to same dimensions as foreign object
        );wrapDiv.style('height', bounds.height).style('width', bounds.width
        // insert text content
        ).html(textToWrap);
        if (styledLineHeight) {
          wrapDiv.style('line-height', styledLineHeight);
        }
        returnValue = parent.select('foreignObject');
      };

      // wrap with tspans if foreignObject is undefined
      var wrapWithTspans = function (item) {
        // operate on the first text item in the selection
        var textNode = item[0];
        var parent = textNode.parentNode;
        var textNodeSelected = d3.select(textNode
        // measure initial size of the text node as rendered
        );var textNodeHeight = textNode.getBBox().height;
        var textNodeWidth = textNode.getBBox().width;
        // figure out the line height, either from rendered height
        // of the font or attached styling
        var lineHeight;
        var renderedLineHeight = textNodeHeight;
        var styledLineHeight = textNodeSelected.style('line-height');
        if (styledLineHeight && parseInt(styledLineHeight)) {
          lineHeight = parseInt(styledLineHeight.replace('px', ''));
        } else {
          lineHeight = renderedLineHeight;
        }
        // only fire the rest of this if the text content
        // overflows the desired dimensions
        if (textNodeWidth > bounds.width) {
          // store whatever is inside the text node
          // in a variable and then zero out the
          // initial content; we'll reinsert in a moment
          // using tspan elements.
          var textToWrap = textNodeSelected.text();
          textNodeSelected.text('');
          if (textToWrap) {
            // keep track of whether we are splitting by spaces
            // so we know whether to reinsert those spaces later
            var breakDelimiter;
            // split at spaces to create an array of individual words
            var textToWrapArray;
            if (textToWrap.indexOf(' ') !== -1) {
              breakDelimiter = ' ';
              textToWrapArray = textToWrap.split(' ');
            } else {
              // if there are no spaces, figure out the split
              // points by comparing rendered text width against
              // bounds and translating that into character position
              // cuts
              breakDelimiter = '';
              var stringLength = textToWrap.length;
              var numberOfSubstrings = Math.ceil(textNodeWidth / bounds.width);
              var spliceInterval = Math.floor(stringLength / numberOfSubstrings);
              if (!(spliceInterval * numberOfSubstrings >= stringLength)) {
                numberOfSubstrings++;
              }
              textToWrapArray = [];
              var substring;
              var startPosition;
              for (var i = 0; i < numberOfSubstrings; i++) {
                startPosition = i * spliceInterval;
                substring = textToWrap.substr(startPosition, spliceInterval);
                textToWrapArray.push(substring);
              }
            }

            // new array where we'll store the words re-assembled into
            // substrings that have been tested against the desired
            // maximum wrapping width
            var substrings = [];
            // computed text length is arguably incorrectly reported for
            // all tspans after the first one, in that they will include
            // the width of previous separate tspans. to compensate we need
            // to manually track the computed text length of all those
            // previous tspans and substrings, and then use that to offset
            // the miscalculation. this then gives us the actual correct
            // position we want to use in rendering the text in the SVG.
            var totalOffset = 0;
            // object for storing the results of text length computations later
            var temp = {};
            // loop through the words and test the computed text length
            // of the string against the maximum desired wrapping width
            for (i = 0; i < textToWrapArray.length; i++) {
              var word = textToWrapArray[i];
              var previousString = textNodeSelected.text();
              var previousWidth = textNode.getComputedTextLength
              // initialize the current word as the first word
              // or append to the previous string if one exists
              ();var newstring;
              if (previousString) {
                newstring = previousString + breakDelimiter + word;
              } else {
                newstring = word;
              }
              // add the newest substring back to the text node and
              // measure the length
              textNodeSelected.text(newstring);
              var newWidth = textNode.getComputedTextLength
              // adjust the length by the offset we've tracked
              // due to the misreported length discussed above

              // if our latest version of the string is too
              // big for the bounds, use the previous
              // version of the string (without the newest word
              // added) and use the latest word to restart the
              // process with a new tspan
              ();if (newWidth > bounds.width) {
                if (previousString && previousString !== '') {
                  totalOffset = totalOffset + previousWidth;
                  temp = { string: previousString, width: previousWidth, offset: totalOffset };
                  substrings.push(temp);
                  textNodeSelected.text('');
                  textNodeSelected.text(word
                  // Handle case where there is just one more word to be wrapped
                  );if (i === textToWrapArray.length - 1) {
                    newstring = word;
                    textNodeSelected.text(newstring);
                    newWidth = textNode.getComputedTextLength();
                  }
                }
              }
              // if we're up to the last word in the array,
              // get the computed length as is without
              // appending anything further to it
              if (i === textToWrapArray.length - 1) {
                textNodeSelected.text('');
                var finalString = newstring;
                if (finalString && finalString !== '') {
                  if (newWidth - totalOffset > 0) {
                    newWidth = newWidth - totalOffset;
                  }
                  temp = { string: finalString, width: newWidth, offset: totalOffset };
                  substrings.push(temp);
                }
              }
            }

            // append each substring as a tspan
            var currentTspan;
            // var tspanCount
            // double check that the text content has been removed
            // before we start appending tspans
            textNodeSelected.text('');
            for (i = 0; i < substrings.length; i++) {
              substring = substrings[i].string;
              // only append if we're sure it won't make the tspans
              // overflow the bounds.
              if (i * lineHeight < bounds.height - lineHeight * 1.5) {
                currentTspan = textNodeSelected.append('tspan').text(substring
                // vertical shift to all tspans after the first one
                );currentTspan.attr('dy', function (d) {
                  if (i > 0) {
                    return lineHeight;
                  }
                }
                // shift left from default position, which
                // is probably based on the full length of the
                // text string until we make this adjustment
                );currentTspan.attr('x', function () {
                  var xOffset = bounds.x;
                  if (padding) {
                    xOffset += padding;
                  }
                  return xOffset;
                });
              }
            }
          }
        }
        // position the overall text node, whether wrapped or not
        textNodeSelected.attr('y', function () {
          var yOffset = bounds.y;
          // shift by line-height to move the baseline into
          // the bounds – otherwise the text baseline would be
          // at the top of the bounds
          if (lineHeight) {
            yOffset += lineHeight;
          }
          // shift by padding, if it's there
          if (padding) {
            yOffset += padding;
          }
          return yOffset;
        }
        // shift to the right by the padding value
        );textNodeSelected.attr('x', function () {
          var xOffset = bounds.x;
          if (padding) {
            xOffset += padding;
          }
          return xOffset;
        }

        // assign our modified text node with tspans
        // to the return value
        );returnValue = d3.select(parent).selectAll('text');
      };

      // variable used to hold the functions that let us
      // switch between the wrap methods
      var wrapMethod;

      // if a wrap method if being forced, assign that
      // function
      if (forceWrapMethod) {
        if (forceWrapMethod === 'foreignobjects') {
          wrapMethod = wrapWithForeignobjects;
        } else if (forceWrapMethod === 'tspans') {
          wrapMethod = wrapWithTspans;
        }
      }

      // if no wrap method is being forced, then instead
      // test for browser support of foreignobject and
      // use whichever wrap method makes sense accordingly
      if (!forceWrapMethod) {
        if (typeof SVGForeignObjectElement !== 'undefined') {
          wrapMethod = wrapWithForeignobjects;
        } else {
          wrapMethod = wrapWithTspans;
        }
      }

      // run the desired wrap function for each item
      // in the d3 selection that called .textwrap()
      for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        wrapMethod(item);
      }

      // return the modified nodes so we can chain other
      // methods to them.
      return returnValue;
    }
  };
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Logger = __webpack_require__(0);
var log = Logger.Log;
var relations = [];

var classes;
classes = {};

/**
 * Function called by parser when a node definition has been found.
 * @param id
 * @param text
 * @param type
 * @param style
 */
exports.addClass = function (id) {
  if (typeof classes[id] === 'undefined') {
    classes[id] = {
      id: id,
      methods: [],
      members: []
    };
  }
};

exports.clear = function () {
  relations = [];
  classes = {};
};

module.exports.getClass = function (id) {
  return classes[id];
};
module.exports.getClasses = function () {
  return classes;
};

module.exports.getRelations = function () {
  return relations;
};

exports.addRelation = function (relation) {
  log.warn('Adding relation: ' + JSON.stringify(relation));
  exports.addClass(relation.id1);
  exports.addClass(relation.id2);

  relations.push(relation);
};

exports.addMembers = function (className, MembersArr) {
  var theClass = classes[className];
  if (typeof MembersArr === 'string') {
    if (MembersArr.substr(-1) === ')') {
      theClass.methods.push(MembersArr);
    } else {
      theClass.members.push(MembersArr);
    }
  }
};

exports.cleanupLabel = function (label) {
  if (label.substring(0, 1) === ':') {
    return label.substr(2).trim();
  } else {
    return label.trim();
  }
};

exports.lineType = {
  LINE: 0,
  DOTTED_LINE: 1
};

exports.relationType = {
  AGGREGATION: 0,
  EXTENSION: 1,
  COMPOSITION: 2,
  DEPENDENCY: 3
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [1, 11],
      $V1 = [1, 12],
      $V2 = [1, 13],
      $V3 = [1, 15],
      $V4 = [1, 16],
      $V5 = [1, 17],
      $V6 = [6, 8],
      $V7 = [1, 26],
      $V8 = [1, 27],
      $V9 = [1, 28],
      $Va = [1, 29],
      $Vb = [1, 30],
      $Vc = [1, 31],
      $Vd = [6, 8, 13, 17, 23, 26, 27, 28, 29, 30, 31],
      $Ve = [6, 8, 13, 17, 23, 26, 27, 28, 29, 30, 31, 45, 46, 47],
      $Vf = [23, 45, 46, 47],
      $Vg = [23, 30, 31, 45, 46, 47],
      $Vh = [23, 26, 27, 28, 29, 45, 46, 47],
      $Vi = [6, 8, 13],
      $Vj = [1, 46];
  var parser = { trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'mermaidDoc': 3, 'graphConfig': 4, 'CLASS_DIAGRAM': 5, 'NEWLINE': 6, 'statements': 7, 'EOF': 8, 'statement': 9, 'className': 10, 'alphaNumToken': 11, 'relationStatement': 12, 'LABEL': 13, 'classStatement': 14, 'methodStatement': 15, 'CLASS': 16, 'STRUCT_START': 17, 'members': 18, 'STRUCT_STOP': 19, 'MEMBER': 20, 'SEPARATOR': 21, 'relation': 22, 'STR': 23, 'relationType': 24, 'lineType': 25, 'AGGREGATION': 26, 'EXTENSION': 27, 'COMPOSITION': 28, 'DEPENDENCY': 29, 'LINE': 30, 'DOTTED_LINE': 31, 'commentToken': 32, 'textToken': 33, 'graphCodeTokens': 34, 'textNoTagsToken': 35, 'TAGSTART': 36, 'TAGEND': 37, '==': 38, '--': 39, 'PCT': 40, 'DEFAULT': 41, 'SPACE': 42, 'MINUS': 43, 'keywords': 44, 'UNICODE_TEXT': 45, 'NUM': 46, 'ALPHA': 47, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 5: 'CLASS_DIAGRAM', 6: 'NEWLINE', 8: 'EOF', 13: 'LABEL', 16: 'CLASS', 17: 'STRUCT_START', 19: 'STRUCT_STOP', 20: 'MEMBER', 21: 'SEPARATOR', 23: 'STR', 26: 'AGGREGATION', 27: 'EXTENSION', 28: 'COMPOSITION', 29: 'DEPENDENCY', 30: 'LINE', 31: 'DOTTED_LINE', 34: 'graphCodeTokens', 36: 'TAGSTART', 37: 'TAGEND', 38: '==', 39: '--', 40: 'PCT', 41: 'DEFAULT', 42: 'SPACE', 43: 'MINUS', 44: 'keywords', 45: 'UNICODE_TEXT', 46: 'NUM', 47: 'ALPHA' },
    productions_: [0, [3, 1], [4, 4], [7, 1], [7, 3], [10, 2], [10, 1], [9, 1], [9, 2], [9, 1], [9, 1], [14, 2], [14, 5], [18, 1], [18, 2], [15, 1], [15, 2], [15, 1], [15, 1], [12, 3], [12, 4], [12, 4], [12, 5], [22, 3], [22, 2], [22, 2], [22, 1], [24, 1], [24, 1], [24, 1], [24, 1], [25, 1], [25, 1], [32, 1], [32, 1], [33, 1], [33, 1], [33, 1], [33, 1], [33, 1], [33, 1], [33, 1], [35, 1], [35, 1], [35, 1], [35, 1], [11, 1], [11, 1], [11, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 5:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 6:
          this.$ = $$[$0];
          break;
        case 7:
          yy.addRelation($$[$0]);
          break;
        case 8:
          $$[$0 - 1].title = yy.cleanupLabel($$[$0]);yy.addRelation($$[$0 - 1]);
          break;
        case 12:
          /* console.log($$[$0-3],JSON.stringify($$[$0-1])); */yy.addMembers($$[$0 - 3], $$[$0 - 1]);
          break;
        case 13:
          this.$ = [$$[$0]];
          break;
        case 14:
          $$[$0].push($$[$0 - 1]);this.$ = $$[$0];
          break;
        case 15:
          /* console.log('Rel found',$$[$0]); */
          break;
        case 16:
          yy.addMembers($$[$0 - 1], yy.cleanupLabel($$[$0]));
          break;
        case 17:
          console.warn('Member', $$[$0]);
          break;
        case 18:
          /* console.log('sep found',$$[$0]); */
          break;
        case 19:
          this.$ = { 'id1': $$[$0 - 2], 'id2': $$[$0], relation: $$[$0 - 1], relationTitle1: 'none', relationTitle2: 'none' };
          break;
        case 20:
          this.$ = { id1: $$[$0 - 3], id2: $$[$0], relation: $$[$0 - 1], relationTitle1: $$[$0 - 2], relationTitle2: 'none' };
          break;
        case 21:
          this.$ = { id1: $$[$0 - 3], id2: $$[$0], relation: $$[$0 - 2], relationTitle1: 'none', relationTitle2: $$[$0 - 1] };
          break;
        case 22:
          this.$ = { id1: $$[$0 - 4], id2: $$[$0], relation: $$[$0 - 2], relationTitle1: $$[$0 - 3], relationTitle2: $$[$0 - 1] };
          break;
        case 23:
          this.$ = { type1: $$[$0 - 2], type2: $$[$0], lineType: $$[$0 - 1] };
          break;
        case 24:
          this.$ = { type1: 'none', type2: $$[$0], lineType: $$[$0 - 1] };
          break;
        case 25:
          this.$ = { type1: $$[$0 - 1], type2: 'none', lineType: $$[$0] };
          break;
        case 26:
          this.$ = { type1: 'none', type2: 'none', lineType: $$[$0] };
          break;
        case 27:
          this.$ = yy.relationType.AGGREGATION;
          break;
        case 28:
          this.$ = yy.relationType.EXTENSION;
          break;
        case 29:
          this.$ = yy.relationType.COMPOSITION;
          break;
        case 30:
          this.$ = yy.relationType.DEPENDENCY;
          break;
        case 31:
          this.$ = yy.lineType.LINE;
          break;
        case 32:
          this.$ = yy.lineType.DOTTED_LINE;
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: [1, 3] }, { 1: [3] }, { 1: [2, 1] }, { 6: [1, 4] }, { 7: 5, 9: 6, 10: 10, 11: 14, 12: 7, 14: 8, 15: 9, 16: $V0, 20: $V1, 21: $V2, 45: $V3, 46: $V4, 47: $V5 }, { 8: [1, 18] }, { 6: [1, 19], 8: [2, 3] }, o($V6, [2, 7], { 13: [1, 20] }), o($V6, [2, 9]), o($V6, [2, 10]), o($V6, [2, 15], { 22: 21, 24: 24, 25: 25, 13: [1, 23], 23: [1, 22], 26: $V7, 27: $V8, 28: $V9, 29: $Va, 30: $Vb, 31: $Vc }), { 10: 32, 11: 14, 45: $V3, 46: $V4, 47: $V5 }, o($V6, [2, 17]), o($V6, [2, 18]), o($Vd, [2, 6], { 11: 14, 10: 33, 45: $V3, 46: $V4, 47: $V5 }), o($Ve, [2, 46]), o($Ve, [2, 47]), o($Ve, [2, 48]), { 1: [2, 2] }, { 7: 34, 9: 6, 10: 10, 11: 14, 12: 7, 14: 8, 15: 9, 16: $V0, 20: $V1, 21: $V2, 45: $V3, 46: $V4, 47: $V5 }, o($V6, [2, 8]), { 10: 35, 11: 14, 23: [1, 36], 45: $V3, 46: $V4, 47: $V5 }, { 22: 37, 24: 24, 25: 25, 26: $V7, 27: $V8, 28: $V9, 29: $Va, 30: $Vb, 31: $Vc }, o($V6, [2, 16]), { 25: 38, 30: $Vb, 31: $Vc }, o($Vf, [2, 26], { 24: 39, 26: $V7, 27: $V8, 28: $V9, 29: $Va }), o($Vg, [2, 27]), o($Vg, [2, 28]), o($Vg, [2, 29]), o($Vg, [2, 30]), o($Vh, [2, 31]), o($Vh, [2, 32]), o($V6, [2, 11], { 17: [1, 40] }), o($Vd, [2, 5]), { 8: [2, 4] }, o($Vi, [2, 19]), { 10: 41, 11: 14, 45: $V3, 46: $V4, 47: $V5 }, { 10: 42, 11: 14, 23: [1, 43], 45: $V3, 46: $V4, 47: $V5 }, o($Vf, [2, 25], { 24: 44, 26: $V7, 27: $V8, 28: $V9, 29: $Va }), o($Vf, [2, 24]), { 18: 45, 20: $Vj }, o($Vi, [2, 21]), o($Vi, [2, 20]), { 10: 47, 11: 14, 45: $V3, 46: $V4, 47: $V5 }, o($Vf, [2, 23]), { 19: [1, 48] }, { 18: 49, 19: [2, 13], 20: $Vj }, o($Vi, [2, 22]), o($V6, [2, 12]), { 19: [2, 14] }],
    defaultActions: { 2: [2, 1], 18: [2, 2], 34: [2, 4], 49: [2, 14] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }

    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            /* do nothing */
            break;
          case 1:
            return 6;
            break;
          case 2:
            /* skip whitespace */
            break;
          case 3:
            return 5;
            break;
          case 4:
            this.begin('struct'); /* console.log('Starting struct'); */return 17;
            break;
          case 5:
            /* console.log('Ending struct'); */this.popState();return 19;
            break;
          case 6:
            /* nothing */
            break;
          case 7:
            return 'MEMBER';
            break;
          case 8:
            return 16;
            break;
          case 9:
            this.begin('string');
            break;
          case 10:
            this.popState();
            break;
          case 11:
            return 'STR';
            break;
          case 12:
            return 27;
            break;
          case 13:
            return 27;
            break;
          case 14:
            return 29;
            break;
          case 15:
            return 29;
            break;
          case 16:
            return 28;
            break;
          case 17:
            return 26;
            break;
          case 18:
            return 30;
            break;
          case 19:
            return 31;
            break;
          case 20:
            return 13;
            break;
          case 21:
            return 43;
            break;
          case 22:
            return 'DOT';
            break;
          case 23:
            return 'PLUS';
            break;
          case 24:
            return 40;
            break;
          case 25:
            return 'EQUALS';
            break;
          case 26:
            return 'EQUALS';
            break;
          case 27:
            return 47;
            break;
          case 28:
            return 'PUNCTUATION';
            break;
          case 29:
            return 46;
            break;
          case 30:
            return 45;
            break;
          case 31:
            return 42;
            break;
          case 32:
            return 8;
            break;
        }
      },
      rules: [/^(?:%%[^\n]*)/, /^(?:\n+)/, /^(?:\s+)/, /^(?:classDiagram\b)/, /^(?:[\{])/, /^(?:\})/, /^(?:[\n])/, /^(?:[^\{\}\n]*)/, /^(?:class\b)/, /^(?:["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:\s*<\|)/, /^(?:\s*\|>)/, /^(?:\s*>)/, /^(?:\s*<)/, /^(?:\s*\*)/, /^(?:\s*o\b)/, /^(?:--)/, /^(?:\.\.)/, /^(?::[^#\n;]+)/, /^(?:-)/, /^(?:\.)/, /^(?:\+)/, /^(?:%)/, /^(?:=)/, /^(?:=)/, /^(?:[A-Za-z]+)/, /^(?:[!"#$%&'*+,-.`?\\_\/])/, /^(?:[0-9]+)/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\s)/, /^(?:$)/],
      conditions: { 'string': { 'rules': [10, 11], 'inclusive': false }, 'struct': { 'rules': [5, 6, 7], 'inclusive': false }, 'INITIAL': { 'rules': [0, 1, 2, 3, 4, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 15-01-14.
 */
var Logger = __webpack_require__(0);
var log = Logger.Log;

var message = '';
var info = false;

exports.setMessage = function (txt) {
  log.debug('Setting message to: ' + txt);
  message = txt;
};

exports.getMessage = function () {
  return message;
};

exports.setInfo = function (inf) {
  info = inf;
};

exports.getInfo = function () {
  return info;
};

exports.parseError = function (err, hash) {
  global.mermaidAPI.parseError(err, hash);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [6, 9, 10, 12];
  var parser = { trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'start': 3, 'info': 4, 'document': 5, 'EOF': 6, 'line': 7, 'statement': 8, 'NL': 9, 'showInfo': 10, 'message': 11, 'say': 12, 'TXT': 13, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 4: 'info', 6: 'EOF', 9: 'NL', 10: 'showInfo', 12: 'say', 13: 'TXT' },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 1], [7, 1], [8, 1], [8, 1], [11, 2]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          return yy;
          break;
        case 4:

          break;
        case 6:
          yy.setInfo(true);
          break;
        case 7:
          yy.setMessage($$[$0]);
          break;
        case 8:
          this.$ = $$[$0 - 1].substring(1).trim().replace(/\\n/gm, '\n');
          break;
      }
    },
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, o($V0, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: 6, 9: [1, 7], 10: [1, 8], 11: 9, 12: [1, 10] }, { 1: [2, 1] }, o($V0, [2, 3]), o($V0, [2, 4]), o($V0, [2, 5]), o($V0, [2, 6]), o($V0, [2, 7]), { 13: [1, 11] }, o($V0, [2, 8])],
    defaultActions: { 4: [2, 1] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }
    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: { 'case-insensitive': true },
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        // Pre-lexer code can go here

        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            return 9;
            break;
          case 1:
            return 10;
            break;
          case 2:
            return 4;
            break;
          case 3:
            return 12;
            break;
          case 4:
            return 13;
            break;
          case 5:
            return 6;
            break;
          case 6:
            return 'INVALID';
            break;
        }
      },
      rules: [/^(?:[\n]+)/i, /^(?:showInfo\b)/i, /^(?:info\b)/i, /^(?:say\b)/i, /^(?::[^#\n;]+)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { 'INITIAL': { 'rules': [0, 1, 2, 3, 4, 5, 6], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-11-03.
 */
var Logger = __webpack_require__(0);
var log = Logger.Log;
var utils = __webpack_require__(18);

var d3 = __webpack_require__(1);
var vertices = {};
var edges = [];
var classes = [];
var subGraphs = [];
var tooltips = {};
var subCount = 0;
var direction;
// Functions to be run after graph rendering
var funs = [];
/**
 * Function called by parser when a node definition has been found
 * @param id
 * @param text
 * @param type
 * @param style
 */
exports.addVertex = function (id, text, type, style) {
  var txt;

  if (typeof id === 'undefined') {
    return;
  }
  if (id.trim().length === 0) {
    return;
  }

  if (typeof vertices[id] === 'undefined') {
    vertices[id] = { id: id, styles: [], classes: [] };
  }
  if (typeof text !== 'undefined') {
    txt = text.trim

    // strip quotes if string starts and exnds with a quote
    ();if (txt[0] === '"' && txt[txt.length - 1] === '"') {
      txt = txt.substring(1, txt.length - 1);
    }

    vertices[id].text = txt;
  }
  if (typeof type !== 'undefined') {
    vertices[id].type = type;
  }
  if (typeof type !== 'undefined') {
    vertices[id].type = type;
  }
  if (typeof style !== 'undefined') {
    if (style !== null) {
      style.forEach(function (s) {
        vertices[id].styles.push(s);
      });
    }
  }
};

/**
 * Function called by parser when a link/edge definition has been found
 * @param start
 * @param end
 * @param type
 * @param linktext
 */
exports.addLink = function (start, end, type, linktext) {
  log.info('Got edge...', start, end);
  var edge = { start: start, end: end, type: undefined, text: '' };
  linktext = type.text;

  if (typeof linktext !== 'undefined') {
    edge.text = linktext.trim

    // strip quotes if string starts and exnds with a quote
    ();if (edge.text[0] === '"' && edge.text[edge.text.length - 1] === '"') {
      edge.text = edge.text.substring(1, edge.text.length - 1);
    }
  }

  if (typeof type !== 'undefined') {
    edge.type = type.type;
    edge.stroke = type.stroke;
  }
  edges.push(edge);
};

/**
 * Updates a link's line interpolation algorithm
 * @param pos
 * @param interpolate
 */
exports.updateLinkInterpolate = function (pos, interp) {
  if (pos === 'default') {
    edges.defaultInterpolate = interp;
  } else {
    edges[pos].interpolate = interp;
  }
};

/**
 * Updates a link with a style
 * @param pos
 * @param style
 */
exports.updateLink = function (pos, style) {
  if (pos === 'default') {
    edges.defaultStyle = style;
  } else {
    if (utils.isSubstringInArray('fill', style) === -1) {
      style.push('fill:none');
    }
    edges[pos].style = style;
  }
};

exports.addClass = function (id, style) {
  if (typeof classes[id] === 'undefined') {
    classes[id] = { id: id, styles: [] };
  }

  if (typeof style !== 'undefined') {
    if (style !== null) {
      style.forEach(function (s) {
        classes[id].styles.push(s);
      });
    }
  }
};

/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 * @param dir
 */
exports.setDirection = function (dir) {
  direction = dir;
};

/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 * @param dir
 */
exports.setClass = function (id, className) {
  if (id.indexOf(',') > 0) {
    id.split(',').forEach(function (id2) {
      if (typeof vertices[id2] !== 'undefined') {
        vertices[id2].classes.push(className);
      }
    });
  } else {
    if (typeof vertices[id] !== 'undefined') {
      vertices[id].classes.push(className);
    }
  }
};

var setTooltip = function (id, tooltip) {
  if (typeof tooltip !== 'undefined') {
    tooltips[id] = tooltip;
  }
};

var setClickFun = function (id, functionName) {
  if (typeof functionName === 'undefined') {
    return;
  }
  if (typeof vertices[id] !== 'undefined') {
    funs.push(function (element) {
      var elem = d3.select(element).select('#' + id);
      if (elem !== null) {
        elem.on('click', function () {
          window[functionName](id);
        });
      }
    });
  }
};

var setLink = function (id, linkStr) {
  if (typeof linkStr === 'undefined') {
    return;
  }
  if (typeof vertices[id] !== 'undefined') {
    funs.push(function (element) {
      var elem = d3.select(element).select('#' + id);
      if (elem !== null) {
        elem.on('click', function () {
          window.open(linkStr, 'newTab');
        });
      }
    });
  }
};
exports.getTooltip = function (id) {
  return tooltips[id];
};

/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 * @param dir
 */
exports.setClickEvent = function (id, functionName, link, tooltip) {
  if (id.indexOf(',') > 0) {
    id.split(',').forEach(function (id2) {
      setTooltip(id2, tooltip);
      setClickFun(id2, functionName);
      setLink(id2, link);
    });
  } else {
    setTooltip(id, tooltip);
    setClickFun(id, functionName);
    setLink(id, link);
  }
};

exports.bindFunctions = function (element) {
  funs.forEach(function (fun) {
    fun(element);
  });
};
exports.getDirection = function () {
  return direction;
};
/**
 * Retrieval function for fetching the found nodes after parsing has completed.
 * @returns {{}|*|vertices}
 */
exports.getVertices = function () {
  return vertices;
};

/**
 * Retrieval function for fetching the found links after parsing has completed.
 * @returns {{}|*|edges}
 */
exports.getEdges = function () {
  return edges;
};

/**
 * Retrieval function for fetching the found class definitions after parsing has completed.
 * @returns {{}|*|classes}
 */
exports.getClasses = function () {
  return classes;
};

var setupToolTips = function (element) {
  var tooltipElem = d3.select('.mermaidTooltip');
  if (tooltipElem[0][0] === null) {
    tooltipElem = d3.select('body').append('div').attr('class', 'mermaidTooltip').style('opacity', 0);
  }

  var svg = d3.select(element).select('svg');

  var nodes = svg.selectAll('g.node');
  nodes.on('mouseover', function () {
    var el = d3.select(this);
    var title = el.attr('title'
    // Dont try to draw a tooltip if no data is provided
    );if (title === null) {
      return;
    }
    var rect = this.getBoundingClientRect();

    tooltipElem.transition().duration(200).style('opacity', '.9');
    tooltipElem.html(el.attr('title')).style('left', rect.left + (rect.right - rect.left) / 2 + 'px').style('top', rect.top - 14 + document.body.scrollTop + 'px');
    el.classed('hover', true);
  }).on('mouseout', function () {
    tooltipElem.transition().duration(500).style('opacity', 0);
    var el = d3.select(this);
    el.classed('hover', false);
  });
};
funs.push(setupToolTips

/**
 * Clears the internal graph db so that a new graph can be parsed.
 */
);exports.clear = function () {
  vertices = {};
  classes = {};
  edges = [];
  funs = [];
  funs.push(setupToolTips);
  subGraphs = [];
  subCount = 0;
  tooltips = [];
};
/**
 *
 * @returns {string}
 */
exports.defaultStyle = function () {
  return 'fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;';
};

/**
 * Clears the internal graph db so that a new graph can be parsed.
 */
exports.addSubGraph = function (list, title) {
  function uniq(a) {
    var prims = { 'boolean': {}, 'number': {}, 'string': {} };
    var objs = [];

    return a.filter(function (item) {
      var type = typeof item;
      if (item === ' ') {
        return false;
      }
      if (type in prims) {
        return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;
      } else {
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
      }
    });
  }

  var nodeList = [];

  nodeList = uniq(nodeList.concat.apply(nodeList, list));

  var subGraph = { id: 'subGraph' + subCount, nodes: nodeList, title: title };
  subGraphs.push(subGraph);
  subCount = subCount + 1;
  return subGraph.id;
};

var getPosForId = function (id) {
  var i;
  for (i = 0; i < subGraphs.length; i++) {
    if (subGraphs[i].id === id) {
      return i;
    }
  }
  return -1;
};
var secCount = -1;
var posCrossRef = [];
var indexNodes = function (id, pos) {
  var nodes = subGraphs[pos].nodes;
  secCount = secCount + 1;
  if (secCount > 2000) {
    return;
  }
  posCrossRef[secCount] = pos;
  // Check if match
  if (subGraphs[pos].id === id) {
    return {
      result: true,
      count: 0
    };
  }

  var count = 0;
  var posCount = 1;
  while (count < nodes.length) {
    var childPos = getPosForId(nodes[count]
    // Ignore regular nodes (pos will be -1)
    );if (childPos >= 0) {
      var res = indexNodes(id, childPos);
      if (res.result) {
        return {
          result: true,
          count: posCount + res.count
        };
      } else {
        posCount = posCount + res.count;
      }
    }
    count = count + 1;
  }

  return {
    result: false,
    count: posCount
  };
};

exports.getDepthFirstPos = function (pos) {
  return posCrossRef[pos];
};
exports.indexNodes = function () {
  secCount = -1;
  if (subGraphs.length > 0) {
    indexNodes('none', subGraphs.length - 1, 0);
  }
};

exports.getSubGraphs = function () {
  return subGraphs;
};

exports.parseError = function (err, hash) {
  global.mermaidAPI.parseError(err, hash);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [1, 5],
      $V1 = [1, 6],
      $V2 = [1, 12],
      $V3 = [1, 13],
      $V4 = [1, 14],
      $V5 = [1, 15],
      $V6 = [1, 16],
      $V7 = [1, 17],
      $V8 = [1, 18],
      $V9 = [1, 19],
      $Va = [1, 20],
      $Vb = [1, 21],
      $Vc = [1, 22],
      $Vd = [8, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      $Ve = [1, 37],
      $Vf = [1, 33],
      $Vg = [1, 34],
      $Vh = [1, 35],
      $Vi = [1, 36],
      $Vj = [8, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 32, 37, 39, 40, 45, 57, 58],
      $Vk = [10, 28],
      $Vl = [10, 28, 37, 57, 58],
      $Vm = [2, 49],
      $Vn = [1, 45],
      $Vo = [1, 48],
      $Vp = [1, 49],
      $Vq = [1, 52],
      $Vr = [2, 65],
      $Vs = [1, 65],
      $Vt = [1, 66],
      $Vu = [1, 67],
      $Vv = [1, 68],
      $Vw = [1, 69],
      $Vx = [1, 70],
      $Vy = [1, 71],
      $Vz = [1, 72],
      $VA = [1, 73],
      $VB = [8, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 47],
      $VC = [10, 28, 37];
  var parser = { trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'expressions': 3, 'graph': 4, 'EOF': 5, 'graphStatement': 6, 'idStatement': 7, '{': 8, 'stmt_list': 9, '}': 10, 'strict': 11, 'GRAPH': 12, 'DIGRAPH': 13, 'textNoTags': 14, 'textNoTagsToken': 15, 'ALPHA': 16, 'NUM': 17, 'COLON': 18, 'PLUS': 19, 'EQUALS': 20, 'MULT': 21, 'DOT': 22, 'BRKT': 23, 'SPACE': 24, 'MINUS': 25, 'keywords': 26, 'stmt': 27, ';': 28, 'node_stmt': 29, 'edge_stmt': 30, 'attr_stmt': 31, '=': 32, 'subgraph': 33, 'attr_list': 34, 'NODE': 35, 'EDGE': 36, '[': 37, 'a_list': 38, ']': 39, ',': 40, 'edgeRHS': 41, 'node_id': 42, 'edgeop': 43, 'port': 44, ':': 45, 'compass_pt': 46, 'SUBGRAPH': 47, 'n': 48, 'ne': 49, 'e': 50, 'se': 51, 's': 52, 'sw': 53, 'w': 54, 'nw': 55, 'c': 56, 'ARROW_POINT': 57, 'ARROW_OPEN': 58, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 5: 'EOF', 8: '{', 10: '}', 11: 'strict', 12: 'GRAPH', 13: 'DIGRAPH', 16: 'ALPHA', 17: 'NUM', 18: 'COLON', 19: 'PLUS', 20: 'EQUALS', 21: 'MULT', 22: 'DOT', 23: 'BRKT', 24: 'SPACE', 25: 'MINUS', 26: 'keywords', 28: ';', 32: '=', 35: 'NODE', 36: 'EDGE', 37: '[', 39: ']', 40: ',', 45: ':', 47: 'SUBGRAPH', 48: 'n', 49: 'ne', 50: 'e', 51: 'se', 52: 's', 53: 'sw', 54: 'w', 55: 'nw', 56: 'c', 57: 'ARROW_POINT', 58: 'ARROW_OPEN' },
    productions_: [0, [3, 2], [4, 5], [4, 6], [4, 4], [6, 1], [6, 1], [7, 1], [14, 1], [14, 2], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [15, 1], [9, 1], [9, 3], [27, 1], [27, 1], [27, 1], [27, 3], [27, 1], [31, 2], [31, 2], [31, 2], [34, 4], [34, 3], [34, 3], [34, 2], [38, 5], [38, 5], [38, 3], [30, 3], [30, 3], [30, 2], [30, 2], [41, 3], [41, 3], [41, 2], [41, 2], [29, 2], [29, 1], [42, 2], [42, 1], [44, 4], [44, 2], [44, 2], [33, 5], [33, 4], [33, 3], [46, 1], [46, 1], [46, 1], [46, 1], [46, 1], [46, 1], [46, 1], [46, 1], [46, 1], [46, 0], [43, 1], [43, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          this.$ = $$[$0 - 1];
          break;
        case 2:
          this.$ = $$[$0 - 4];
          break;
        case 3:
          this.$ = $$[$0 - 5];
          break;
        case 4:
          this.$ = $$[$0 - 3];
          break;
        case 8:case 10:case 11:
          this.$ = $$[$0];
          break;
        case 9:
          this.$ = $$[$0 - 1] + '' + $$[$0];
          break;
        case 12:case 13:case 14:case 15:case 16:case 18:case 19:case 20:
          this.$ = $$[$0];
          break;
        case 17:
          this.$ = '<br>';
          break;
        case 39:
          this.$ = 'oy';
          break;
        case 40:

          yy.addLink($$[$0 - 1], $$[$0].id, $$[$0].op);
          this.$ = 'oy';
          break;
        case 42:

          yy.addLink($$[$0 - 1], $$[$0].id, $$[$0].op);
          this.$ = { op: $$[$0 - 2], id: $$[$0 - 1] };

          break;
        case 44:

          this.$ = { op: $$[$0 - 1], id: $$[$0] };

          break;
        case 48:
          yy.addVertex($$[$0 - 1]);this.$ = $$[$0 - 1];
          break;
        case 49:
          yy.addVertex($$[$0]);this.$ = $$[$0];
          break;
        case 66:
          this.$ = 'arrow';
          break;
        case 67:
          this.$ = 'arrow_open';
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 6: 3, 11: [1, 4], 12: $V0, 13: $V1 }, { 1: [3] }, { 5: [1, 7] }, { 7: 8, 8: [1, 9], 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc }, { 6: 23, 12: $V0, 13: $V1 }, o($Vd, [2, 5]), o($Vd, [2, 6]), { 1: [2, 1] }, { 8: [1, 24] }, { 7: 30, 8: $Ve, 9: 25, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, o([8, 10, 28, 32, 37, 39, 40, 45, 57, 58], [2, 7], { 15: 38, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc }), o($Vj, [2, 8]), o($Vj, [2, 10]), o($Vj, [2, 11]), o($Vj, [2, 12]), o($Vj, [2, 13]), o($Vj, [2, 14]), o($Vj, [2, 15]), o($Vj, [2, 16]), o($Vj, [2, 17]), o($Vj, [2, 18]), o($Vj, [2, 19]), o($Vj, [2, 20]), { 7: 39, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc }, { 7: 30, 8: $Ve, 9: 40, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, { 10: [1, 41] }, { 10: [2, 21], 28: [1, 42] }, o($Vk, [2, 23]), o($Vk, [2, 24]), o($Vk, [2, 25]), o($Vl, $Vm, { 44: 44, 32: [1, 43], 45: $Vn }), o($Vk, [2, 27], { 41: 46, 43: 47, 57: $Vo, 58: $Vp }), o($Vk, [2, 47], { 43: 47, 34: 50, 41: 51, 37: $Vq, 57: $Vo, 58: $Vp }), { 34: 53, 37: $Vq }, { 34: 54, 37: $Vq }, { 34: 55, 37: $Vq }, { 7: 56, 8: [1, 57], 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc }, { 7: 30, 8: $Ve, 9: 58, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, o($Vj, [2, 9]), { 8: [1, 59] }, { 10: [1, 60] }, { 5: [2, 4] }, { 7: 30, 8: $Ve, 9: 61, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, { 7: 62, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc }, o($Vl, [2, 48]), o($Vl, $Vr, { 14: 10, 15: 11, 7: 63, 46: 64, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 48: $Vs, 49: $Vt, 50: $Vu, 51: $Vv, 52: $Vw, 53: $Vx, 54: $Vy, 55: $Vz, 56: $VA }), o($Vk, [2, 41], { 34: 74, 37: $Vq }), { 7: 77, 8: $Ve, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 33: 76, 42: 75, 47: $Vi }, o($VB, [2, 66]), o($VB, [2, 67]), o($Vk, [2, 46]), o($Vk, [2, 40], { 34: 78, 37: $Vq }), { 7: 81, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 38: 79, 39: [1, 80] }, o($Vk, [2, 28]), o($Vk, [2, 29]), o($Vk, [2, 30]), { 8: [1, 82] }, { 7: 30, 8: $Ve, 9: 83, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, { 10: [1, 84] }, { 7: 30, 8: $Ve, 9: 85, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, { 5: [2, 2] }, { 10: [2, 22] }, o($Vk, [2, 26]), o($Vl, [2, 51], { 45: [1, 86] }), o($Vl, [2, 52]), o($Vl, [2, 56]), o($Vl, [2, 57]), o($Vl, [2, 58]), o($Vl, [2, 59]), o($Vl, [2, 60]), o($Vl, [2, 61]), o($Vl, [2, 62]), o($Vl, [2, 63]), o($Vl, [2, 64]), o($Vk, [2, 38]), o($VC, [2, 44], { 43: 47, 41: 87, 57: $Vo, 58: $Vp }), o($VC, [2, 45], { 43: 47, 41: 88, 57: $Vo, 58: $Vp }), o($Vl, $Vm, { 44: 44, 45: $Vn }), o($Vk, [2, 39]), { 39: [1, 89] }, o($Vk, [2, 34], { 34: 90, 37: $Vq }), { 32: [1, 91] }, { 7: 30, 8: $Ve, 9: 92, 12: $Vf, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 27: 26, 29: 27, 30: 28, 31: 29, 33: 31, 35: $Vg, 36: $Vh, 42: 32, 47: $Vi }, { 10: [1, 93] }, o($Vl, [2, 55]), { 10: [1, 94] }, o($Vl, $Vr, { 46: 95, 48: $Vs, 49: $Vt, 50: $Vu, 51: $Vv, 52: $Vw, 53: $Vx, 54: $Vy, 55: $Vz, 56: $VA }), o($VC, [2, 42]), o($VC, [2, 43]), o($Vk, [2, 33], { 34: 96, 37: $Vq }), o($Vk, [2, 32]), { 7: 97, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc }, { 10: [1, 98] }, o($Vl, [2, 54]), { 5: [2, 3] }, o($Vl, [2, 50]), o($Vk, [2, 31]), { 28: [1, 99], 39: [2, 37], 40: [1, 100] }, o($Vl, [2, 53]), { 7: 81, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 38: 101 }, { 7: 81, 14: 10, 15: 11, 16: $V2, 17: $V3, 18: $V4, 19: $V5, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 24: $Va, 25: $Vb, 26: $Vc, 38: 102 }, { 39: [2, 35] }, { 39: [2, 36] }],
    defaultActions: { 7: [2, 1], 41: [2, 4], 60: [2, 2], 61: [2, 22], 94: [2, 3], 101: [2, 35], 102: [2, 36] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }

    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            return 'STYLE';
            break;
          case 1:
            return 'LINKSTYLE';
            break;
          case 2:
            return 'CLASSDEF';
            break;
          case 3:
            return 'CLASS';
            break;
          case 4:
            return 'CLICK';
            break;
          case 5:
            return 12;
            break;
          case 6:
            return 13;
            break;
          case 7:
            return 47;
            break;
          case 8:
            return 35;
            break;
          case 9:
            return 36;
            break;
          case 10:
            return 'DIR';
            break;
          case 11:
            return 'DIR';
            break;
          case 12:
            return 'DIR';
            break;
          case 13:
            return 'DIR';
            break;
          case 14:
            return 'DIR';
            break;
          case 15:
            return 'DIR';
            break;
          case 16:
            return 17;
            break;
          case 17:
            return 23;
            break;
          case 18:
            return 18;
            break;
          case 19:
            return 28;
            break;
          case 20:
            return 40;
            break;
          case 21:
            return 32;
            break;
          case 22:
            return 21;
            break;
          case 23:
            return 22;
            break;
          case 24:
            return 'ARROW_CROSS';
            break;
          case 25:
            return 57;
            break;
          case 26:
            return 'ARROW_CIRCLE';
            break;
          case 27:
            return 58;
            break;
          case 28:
            return 25;
            break;
          case 29:
            return 19;
            break;
          case 30:
            return 20;
            break;
          case 31:
            return 16;
            break;
          case 32:
            return 'PIPE';
            break;
          case 33:
            return 'PS';
            break;
          case 34:
            return 'PE';
            break;
          case 35:
            return 37;
            break;
          case 36:
            return 39;
            break;
          case 37:
            return 8;
            break;
          case 38:
            return 10;
            break;
          case 39:
            return 'QUOTE';
            break;
          case 40:
            return 24;
            break;
          case 41:
            return 'NEWLINE';
            break;
          case 42:
            return 5;
            break;
        }
      },
      rules: [/^(?:style\b)/, /^(?:linkStyle\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:click\b)/, /^(?:graph\b)/, /^(?:digraph\b)/, /^(?:subgraph\b)/, /^(?:node\b)/, /^(?:edge\b)/, /^(?:LR\b)/, /^(?:RL\b)/, /^(?:TB\b)/, /^(?:BT\b)/, /^(?:TD\b)/, /^(?:BR\b)/, /^(?:[0-9])/, /^(?:#)/, /^(?::)/, /^(?:;)/, /^(?:,)/, /^(?:=)/, /^(?:\*)/, /^(?:\.)/, /^(?:--[x])/, /^(?:->)/, /^(?:--[o])/, /^(?:--)/, /^(?:-)/, /^(?:\+)/, /^(?:=)/, /^(?:[\u0021-\u0027\u002A-\u002E\u003F\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC_])/, /^(?:\|)/, /^(?:\()/, /^(?:\))/, /^(?:\[)/, /^(?:\])/, /^(?:\{)/, /^(?:\})/, /^(?:")/, /^(?:\s)/, /^(?:\n)/, /^(?:$)/],
      conditions: { 'INITIAL': { 'rules': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [1, 4],
      $V1 = [1, 3],
      $V2 = [1, 5],
      $V3 = [1, 8, 9, 10, 11, 13, 18, 30, 46, 71, 72, 73, 74, 75, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $V4 = [2, 2],
      $V5 = [1, 12],
      $V6 = [1, 13],
      $V7 = [1, 14],
      $V8 = [1, 15],
      $V9 = [1, 31],
      $Va = [1, 33],
      $Vb = [1, 22],
      $Vc = [1, 34],
      $Vd = [1, 24],
      $Ve = [1, 25],
      $Vf = [1, 26],
      $Vg = [1, 27],
      $Vh = [1, 28],
      $Vi = [1, 38],
      $Vj = [1, 40],
      $Vk = [1, 35],
      $Vl = [1, 39],
      $Vm = [1, 45],
      $Vn = [1, 44],
      $Vo = [1, 36],
      $Vp = [1, 37],
      $Vq = [1, 41],
      $Vr = [1, 42],
      $Vs = [1, 43],
      $Vt = [1, 8, 9, 10, 11, 13, 18, 30, 32, 46, 71, 72, 73, 74, 75, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $Vu = [1, 53],
      $Vv = [1, 52],
      $Vw = [1, 54],
      $Vx = [1, 72],
      $Vy = [1, 80],
      $Vz = [1, 81],
      $VA = [1, 66],
      $VB = [1, 65],
      $VC = [1, 85],
      $VD = [1, 84],
      $VE = [1, 82],
      $VF = [1, 83],
      $VG = [1, 73],
      $VH = [1, 68],
      $VI = [1, 67],
      $VJ = [1, 63],
      $VK = [1, 75],
      $VL = [1, 76],
      $VM = [1, 77],
      $VN = [1, 78],
      $VO = [1, 79],
      $VP = [1, 70],
      $VQ = [1, 69],
      $VR = [8, 9, 11],
      $VS = [8, 9, 11, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
      $VT = [1, 115],
      $VU = [8, 9, 10, 11, 13, 15, 18, 36, 38, 40, 42, 46, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $VV = [8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 30, 32, 36, 37, 38, 39, 40, 41, 42, 43, 46, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 78, 81, 84, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $VW = [1, 117],
      $VX = [1, 118],
      $VY = [8, 9, 10, 11, 13, 18, 30, 32, 46, 71, 72, 73, 74, 75, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $VZ = [8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 30, 32, 37, 39, 41, 43, 46, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 78, 81, 84, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $V_ = [13, 18, 46, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $V$ = [13, 18, 46, 49, 65, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
      $V01 = [1, 191],
      $V11 = [1, 188],
      $V21 = [1, 195],
      $V31 = [1, 192],
      $V41 = [1, 189],
      $V51 = [1, 196],
      $V61 = [1, 186],
      $V71 = [1, 187],
      $V81 = [1, 190],
      $V91 = [1, 193],
      $Va1 = [1, 194],
      $Vb1 = [1, 213],
      $Vc1 = [8, 9, 11, 86],
      $Vd1 = [8, 9, 10, 11, 46, 71, 80, 81, 84, 86, 88, 89, 90, 91, 92];
  var parser = { trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'mermaidDoc': 3, 'graphConfig': 4, 'document': 5, 'line': 6, 'statement': 7, 'SEMI': 8, 'NEWLINE': 9, 'SPACE': 10, 'EOF': 11, 'GRAPH': 12, 'DIR': 13, 'FirstStmtSeperator': 14, 'TAGEND': 15, 'TAGSTART': 16, 'UP': 17, 'DOWN': 18, 'ending': 19, 'endToken': 20, 'spaceList': 21, 'spaceListNewline': 22, 'verticeStatement': 23, 'separator': 24, 'styleStatement': 25, 'linkStyleStatement': 26, 'classDefStatement': 27, 'classStatement': 28, 'clickStatement': 29, 'subgraph': 30, 'text': 31, 'end': 32, 'vertex': 33, 'link': 34, 'alphaNum': 35, 'SQS': 36, 'SQE': 37, 'PS': 38, 'PE': 39, '(-': 40, '-)': 41, 'DIAMOND_START': 42, 'DIAMOND_STOP': 43, 'alphaNumStatement': 44, 'alphaNumToken': 45, 'MINUS': 46, 'linkStatement': 47, 'arrowText': 48, 'TESTSTR': 49, '--': 50, 'ARROW_POINT': 51, 'ARROW_CIRCLE': 52, 'ARROW_CROSS': 53, 'ARROW_OPEN': 54, '-.': 55, 'DOTTED_ARROW_POINT': 56, 'DOTTED_ARROW_CIRCLE': 57, 'DOTTED_ARROW_CROSS': 58, 'DOTTED_ARROW_OPEN': 59, '==': 60, 'THICK_ARROW_POINT': 61, 'THICK_ARROW_CIRCLE': 62, 'THICK_ARROW_CROSS': 63, 'THICK_ARROW_OPEN': 64, 'PIPE': 65, 'textToken': 66, 'STR': 67, 'commentText': 68, 'commentToken': 69, 'keywords': 70, 'STYLE': 71, 'LINKSTYLE': 72, 'CLASSDEF': 73, 'CLASS': 74, 'CLICK': 75, 'textNoTags': 76, 'textNoTagsToken': 77, 'DEFAULT': 78, 'stylesOpt': 79, 'HEX': 80, 'NUM': 81, 'INTERPOLATE': 82, 'commentStatement': 83, 'PCT': 84, 'style': 85, 'COMMA': 86, 'styleComponent': 87, 'ALPHA': 88, 'COLON': 89, 'UNIT': 90, 'BRKT': 91, 'DOT': 92, 'graphCodeTokens': 93, 'PUNCTUATION': 94, 'UNICODE_TEXT': 95, 'PLUS': 96, 'EQUALS': 97, 'MULT': 98, 'TAG_START': 99, 'TAG_END': 100, 'QUOTE': 101, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 8: 'SEMI', 9: 'NEWLINE', 10: 'SPACE', 11: 'EOF', 12: 'GRAPH', 13: 'DIR', 15: 'TAGEND', 16: 'TAGSTART', 17: 'UP', 18: 'DOWN', 30: 'subgraph', 32: 'end', 36: 'SQS', 37: 'SQE', 38: 'PS', 39: 'PE', 40: '(-', 41: '-)', 42: 'DIAMOND_START', 43: 'DIAMOND_STOP', 46: 'MINUS', 49: 'TESTSTR', 50: '--', 51: 'ARROW_POINT', 52: 'ARROW_CIRCLE', 53: 'ARROW_CROSS', 54: 'ARROW_OPEN', 55: '-.', 56: 'DOTTED_ARROW_POINT', 57: 'DOTTED_ARROW_CIRCLE', 58: 'DOTTED_ARROW_CROSS', 59: 'DOTTED_ARROW_OPEN', 60: '==', 61: 'THICK_ARROW_POINT', 62: 'THICK_ARROW_CIRCLE', 63: 'THICK_ARROW_CROSS', 64: 'THICK_ARROW_OPEN', 65: 'PIPE', 67: 'STR', 71: 'STYLE', 72: 'LINKSTYLE', 73: 'CLASSDEF', 74: 'CLASS', 75: 'CLICK', 78: 'DEFAULT', 80: 'HEX', 81: 'NUM', 82: 'INTERPOLATE', 84: 'PCT', 86: 'COMMA', 88: 'ALPHA', 89: 'COLON', 90: 'UNIT', 91: 'BRKT', 92: 'DOT', 94: 'PUNCTUATION', 95: 'UNICODE_TEXT', 96: 'PLUS', 97: 'EQUALS', 98: 'MULT', 99: 'TAG_START', 100: 'TAG_END', 101: 'QUOTE' },
    productions_: [0, [3, 2], [5, 0], [5, 2], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [4, 2], [4, 2], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [19, 2], [19, 1], [20, 1], [20, 1], [20, 1], [14, 1], [14, 1], [14, 2], [22, 2], [22, 2], [22, 1], [22, 1], [21, 2], [21, 1], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 5], [7, 4], [24, 1], [24, 1], [24, 1], [23, 3], [23, 1], [33, 4], [33, 5], [33, 6], [33, 7], [33, 4], [33, 5], [33, 4], [33, 5], [33, 4], [33, 5], [33, 4], [33, 5], [33, 1], [33, 2], [35, 1], [35, 2], [44, 1], [44, 1], [44, 1], [44, 1], [34, 2], [34, 3], [34, 3], [34, 1], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [48, 3], [31, 1], [31, 2], [31, 1], [68, 1], [68, 2], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [76, 1], [76, 2], [27, 5], [27, 5], [28, 5], [29, 5], [29, 7], [29, 5], [29, 7], [25, 5], [25, 5], [26, 5], [26, 5], [26, 9], [26, 9], [26, 7], [26, 7], [83, 3], [79, 1], [79, 3], [85, 1], [85, 2], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [69, 1], [69, 1], [66, 1], [66, 1], [66, 1], [66, 1], [66, 1], [66, 1], [66, 1], [77, 1], [77, 1], [77, 1], [77, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 2:
          this.$ = [];
          break;
        case 3:

          if ($$[$0] !== []) {
            $$[$0 - 1].push($$[$0]);
          }
          this.$ = $$[$0 - 1];
          break;
        case 4:case 57:case 59:case 60:case 92:case 94:case 95:case 108:
          this.$ = $$[$0];
          break;
        case 11:
          yy.setDirection($$[$0 - 1]);this.$ = $$[$0 - 1];
          break;
        case 12:
          yy.setDirection('LR');this.$ = $$[$0 - 1];
          break;
        case 13:
          yy.setDirection('RL');this.$ = $$[$0 - 1];
          break;
        case 14:
          yy.setDirection('BT');this.$ = $$[$0 - 1];
          break;
        case 15:
          yy.setDirection('TB');this.$ = $$[$0 - 1];
          break;
        case 30:
          this.$ = $$[$0 - 1];
          break;
        case 31:case 32:case 33:case 34:case 35:
          this.$ = [];
          break;
        case 36:
          this.$ = yy.addSubGraph($$[$0 - 1], $$[$0 - 3]);
          break;
        case 37:
          this.$ = yy.addSubGraph($$[$0 - 1], undefined);
          break;
        case 41:
          yy.addLink($$[$0 - 2], $$[$0], $$[$0 - 1]);this.$ = [$$[$0 - 2], $$[$0]];
          break;
        case 42:
          this.$ = [$$[$0]];
          break;
        case 43:
          this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'square');
          break;
        case 44:
          this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'square');
          break;
        case 45:
          this.$ = $$[$0 - 5];yy.addVertex($$[$0 - 5], $$[$0 - 2], 'circle');
          break;
        case 46:
          this.$ = $$[$0 - 6];yy.addVertex($$[$0 - 6], $$[$0 - 3], 'circle');
          break;
        case 47:
          this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'ellipse');
          break;
        case 48:
          this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'ellipse');
          break;
        case 49:
          this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'round');
          break;
        case 50:
          this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'round');
          break;
        case 51:
          this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'diamond');
          break;
        case 52:
          this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'diamond');
          break;
        case 53:
          this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'odd');
          break;
        case 54:
          this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'odd');
          break;
        case 55:
          this.$ = $$[$0];yy.addVertex($$[$0]);
          break;
        case 56:
          this.$ = $$[$0 - 1];yy.addVertex($$[$0 - 1]);
          break;
        case 58:case 93:case 96:case 109:
          this.$ = $$[$0 - 1] + '' + $$[$0];
          break;
        case 61:
          this.$ = 'v';
          break;
        case 62:
          this.$ = '-';
          break;
        case 63:
          $$[$0 - 1].text = $$[$0];this.$ = $$[$0 - 1];
          break;
        case 64:case 65:
          $$[$0 - 2].text = $$[$0 - 1];this.$ = $$[$0 - 2];
          break;
        case 66:
          this.$ = $$[$0];
          break;
        case 67:
          this.$ = { 'type': 'arrow', 'stroke': 'normal', 'text': $$[$0 - 1] };
          break;
        case 68:
          this.$ = { 'type': 'arrow_circle', 'stroke': 'normal', 'text': $$[$0 - 1] };
          break;
        case 69:
          this.$ = { 'type': 'arrow_cross', 'stroke': 'normal', 'text': $$[$0 - 1] };
          break;
        case 70:
          this.$ = { 'type': 'arrow_open', 'stroke': 'normal', 'text': $$[$0 - 1] };
          break;
        case 71:
          this.$ = { 'type': 'arrow', 'stroke': 'dotted', 'text': $$[$0 - 1] };
          break;
        case 72:
          this.$ = { 'type': 'arrow_circle', 'stroke': 'dotted', 'text': $$[$0 - 1] };
          break;
        case 73:
          this.$ = { 'type': 'arrow_cross', 'stroke': 'dotted', 'text': $$[$0 - 1] };
          break;
        case 74:
          this.$ = { 'type': 'arrow_open', 'stroke': 'dotted', 'text': $$[$0 - 1] };
          break;
        case 75:
          this.$ = { 'type': 'arrow', 'stroke': 'thick', 'text': $$[$0 - 1] };
          break;
        case 76:
          this.$ = { 'type': 'arrow_circle', 'stroke': 'thick', 'text': $$[$0 - 1] };
          break;
        case 77:
          this.$ = { 'type': 'arrow_cross', 'stroke': 'thick', 'text': $$[$0 - 1] };
          break;
        case 78:
          this.$ = { 'type': 'arrow_open', 'stroke': 'thick', 'text': $$[$0 - 1] };
          break;
        case 79:
          this.$ = { 'type': 'arrow', 'stroke': 'normal' };
          break;
        case 80:
          this.$ = { 'type': 'arrow_circle', 'stroke': 'normal' };
          break;
        case 81:
          this.$ = { 'type': 'arrow_cross', 'stroke': 'normal' };
          break;
        case 82:
          this.$ = { 'type': 'arrow_open', 'stroke': 'normal' };
          break;
        case 83:
          this.$ = { 'type': 'arrow', 'stroke': 'dotted' };
          break;
        case 84:
          this.$ = { 'type': 'arrow_circle', 'stroke': 'dotted' };
          break;
        case 85:
          this.$ = { 'type': 'arrow_cross', 'stroke': 'dotted' };
          break;
        case 86:
          this.$ = { 'type': 'arrow_open', 'stroke': 'dotted' };
          break;
        case 87:
          this.$ = { 'type': 'arrow', 'stroke': 'thick' };
          break;
        case 88:
          this.$ = { 'type': 'arrow_circle', 'stroke': 'thick' };
          break;
        case 89:
          this.$ = { 'type': 'arrow_cross', 'stroke': 'thick' };
          break;
        case 90:
          this.$ = { 'type': 'arrow_open', 'stroke': 'thick' };
          break;
        case 91:
          this.$ = $$[$0 - 1];
          break;
        case 110:case 111:
          this.$ = $$[$0 - 4];yy.addClass($$[$0 - 2], $$[$0]);
          break;
        case 112:
          this.$ = $$[$0 - 4];yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 113:
          this.$ = $$[$0 - 4];yy.setClickEvent($$[$0 - 2], $$[$0], undefined, undefined);
          break;
        case 114:
          this.$ = $$[$0 - 6];yy.setClickEvent($$[$0 - 4], $$[$0 - 2], undefined, $$[$0]);
          break;
        case 115:
          this.$ = $$[$0 - 4];yy.setClickEvent($$[$0 - 2], undefined, $$[$0], undefined);
          break;
        case 116:
          this.$ = $$[$0 - 6];yy.setClickEvent($$[$0 - 4], undefined, $$[$0 - 2], $$[$0]);
          break;
        case 117:
          this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 2], undefined, undefined, $$[$0]);
          break;
        case 118:case 119:case 120:
          this.$ = $$[$0 - 4];yy.updateLink($$[$0 - 2], $$[$0]);
          break;
        case 121:case 122:
          this.$ = $$[$0 - 8];yy.updateLinkInterpolate($$[$0 - 6], $$[$0 - 2]);yy.updateLink($$[$0 - 6], $$[$0]);
          break;
        case 123:case 124:
          this.$ = $$[$0 - 6];yy.updateLinkInterpolate($$[$0 - 4], $$[$0]);
          break;
        case 126:
          this.$ = [$$[$0]];
          break;
        case 127:
          $$[$0 - 2].push($$[$0]);this.$ = $$[$0 - 2];
          break;
        case 129:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 9: $V0, 10: $V1, 12: $V2 }, { 1: [3] }, o($V3, $V4, { 5: 6 }), { 4: 7, 9: $V0, 10: $V1, 12: $V2 }, { 4: 8, 9: $V0, 10: $V1, 12: $V2 }, { 10: [1, 9] }, { 1: [2, 1], 6: 10, 7: 11, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 13: $V9, 18: $Va, 23: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: $Vb, 33: 23, 35: 29, 44: 30, 45: 32, 46: $Vc, 71: $Vd, 72: $Ve, 73: $Vf, 74: $Vg, 75: $Vh, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V3, [2, 9]), o($V3, [2, 10]), { 13: [1, 46], 15: [1, 47], 16: [1, 48], 17: [1, 49], 18: [1, 50] }, o($Vt, [2, 3]), o($Vt, [2, 4]), o($Vt, [2, 5]), o($Vt, [2, 6]), o($Vt, [2, 7]), o($Vt, [2, 8]), { 8: $Vu, 9: $Vv, 11: $Vw, 24: 51 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 55 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 56 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 57 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 58 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 59 }, { 8: $Vu, 9: $Vv, 10: $Vx, 11: $Vw, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 24: 61, 30: $VE, 31: 60, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VR, [2, 42], { 34: 86, 47: 87, 50: [1, 88], 51: [1, 91], 52: [1, 92], 53: [1, 93], 54: [1, 94], 55: [1, 89], 56: [1, 95], 57: [1, 96], 58: [1, 97], 59: [1, 98], 60: [1, 90], 61: [1, 99], 62: [1, 100], 63: [1, 101], 64: [1, 102] }), { 10: [1, 103] }, { 10: [1, 104] }, { 10: [1, 105] }, { 10: [1, 106] }, { 10: [1, 107] }, o($VS, [2, 55], { 45: 32, 21: 113, 44: 114, 10: $VT, 13: $V9, 15: [1, 112], 18: $Va, 36: [1, 108], 38: [1, 109], 40: [1, 110], 42: [1, 111], 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VU, [2, 57]), o($VU, [2, 59]), o($VU, [2, 60]), o($VU, [2, 61]), o($VU, [2, 62]), o($VV, [2, 154]), o($VV, [2, 155]), o($VV, [2, 156]), o($VV, [2, 157]), o($VV, [2, 158]), o($VV, [2, 159]), o($VV, [2, 160]), o($VV, [2, 161]), o($VV, [2, 162]), o($VV, [2, 163]), o($VV, [2, 164]), { 8: $VW, 9: $VX, 10: $VT, 14: 116, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 120, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 121, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 122, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 123, 21: 119 }, o($Vt, [2, 30]), o($Vt, [2, 38]), o($Vt, [2, 39]), o($Vt, [2, 40]), o($Vt, [2, 31]), o($Vt, [2, 32]), o($Vt, [2, 33]), o($Vt, [2, 34]), o($Vt, [2, 35]), { 8: $Vu, 9: $Vv, 10: $Vx, 11: $Vw, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 24: 124, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VY, $V4, { 5: 126 }), o($VZ, [2, 92]), o($VZ, [2, 94]), o($VZ, [2, 143]), o($VZ, [2, 144]), o($VZ, [2, 145]), o($VZ, [2, 146]), o($VZ, [2, 147]), o($VZ, [2, 148]), o($VZ, [2, 149]), o($VZ, [2, 150]), o($VZ, [2, 151]), o($VZ, [2, 152]), o($VZ, [2, 153]), o($VZ, [2, 97]), o($VZ, [2, 98]), o($VZ, [2, 99]), o($VZ, [2, 100]), o($VZ, [2, 101]), o($VZ, [2, 102]), o($VZ, [2, 103]), o($VZ, [2, 104]), o($VZ, [2, 105]), o($VZ, [2, 106]), o($VZ, [2, 107]), { 13: $V9, 18: $Va, 33: 127, 35: 29, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V_, [2, 66], { 48: 128, 49: [1, 129], 65: [1, 130] }), { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 131, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 132, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 133, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V$, [2, 79]), o($V$, [2, 80]), o($V$, [2, 81]), o($V$, [2, 82]), o($V$, [2, 83]), o($V$, [2, 84]), o($V$, [2, 85]), o($V$, [2, 86]), o($V$, [2, 87]), o($V$, [2, 88]), o($V$, [2, 89]), o($V$, [2, 90]), { 13: $V9, 18: $Va, 35: 134, 44: 30, 45: 32, 46: $Vc, 80: [1, 135], 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 78: [1, 136], 81: [1, 137] }, { 13: $V9, 18: $Va, 35: 139, 44: 30, 45: 32, 46: $Vc, 78: [1, 138], 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 140, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 141, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 142, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 144, 32: $VF, 38: [1, 143], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 145, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 146, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 147, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 56]), o($VU, [2, 58]), o($VS, [2, 29], { 21: 148, 10: $VT }), o($V3, [2, 11]), o($V3, [2, 21]), o($V3, [2, 22]), { 9: [1, 149] }, o($V3, [2, 12]), o($V3, [2, 13]), o($V3, [2, 14]), o($V3, [2, 15]), o($VY, $V4, { 5: 150 }), o($VZ, [2, 93]), { 6: 10, 7: 11, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 13: $V9, 18: $Va, 23: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: $Vb, 32: [1, 151], 33: 23, 35: 29, 44: 30, 45: 32, 46: $Vc, 71: $Vd, 72: $Ve, 73: $Vf, 74: $Vg, 75: $Vh, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VR, [2, 41]), o($V_, [2, 63], { 10: [1, 152] }), { 10: [1, 153] }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 154, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 51: [1, 155], 52: [1, 156], 53: [1, 157], 54: [1, 158], 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 56: [1, 159], 57: [1, 160], 58: [1, 161], 59: [1, 162], 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 61: [1, 163], 62: [1, 164], 63: [1, 165], 64: [1, 166], 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 167], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 168] }, { 10: [1, 169] }, { 10: [1, 170] }, { 10: [1, 171] }, { 10: [1, 172], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 173], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 174], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 37: [1, 175], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 176, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 39: [1, 177], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 41: [1, 178], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 43: [1, 179], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 37: [1, 180], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 28]), o($V3, [2, 23]), { 6: 10, 7: 11, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 13: $V9, 18: $Va, 23: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: $Vb, 32: [1, 181], 33: 23, 35: 29, 44: 30, 45: 32, 46: $Vc, 71: $Vd, 72: $Ve, 73: $Vf, 74: $Vg, 75: $Vh, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($Vt, [2, 37]), o($V_, [2, 65]), o($V_, [2, 64]), { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 65: [1, 182], 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V_, [2, 67]), o($V_, [2, 68]), o($V_, [2, 69]), o($V_, [2, 70]), o($V_, [2, 71]), o($V_, [2, 72]), o($V_, [2, 73]), o($V_, [2, 74]), o($V_, [2, 75]), o($V_, [2, 76]), o($V_, [2, 77]), o($V_, [2, 78]), { 10: $V01, 46: $V11, 71: $V21, 79: 183, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 197, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 198, 80: $V31, 81: $V41, 82: [1, 199], 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 200, 80: $V31, 81: $V41, 82: [1, 201], 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 202, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 203, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 13: $V9, 18: $Va, 35: 204, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 205, 44: 30, 45: 32, 46: $Vc, 67: [1, 206], 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 43], { 21: 207, 10: $VT }), { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 39: [1, 208], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 49], { 21: 209, 10: $VT }), o($VS, [2, 47], { 21: 210, 10: $VT }), o($VS, [2, 51], { 21: 211, 10: $VT }), o($VS, [2, 53], { 21: 212, 10: $VT }), o($Vt, [2, 36]), o([10, 13, 18, 46, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98], [2, 91]), o($VR, [2, 117], { 86: $Vb1 }), o($Vc1, [2, 126], { 87: 214, 10: $V01, 46: $V11, 71: $V21, 80: $V31, 81: $V41, 84: $V51, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }), o($Vd1, [2, 128]), o($Vd1, [2, 130]), o($Vd1, [2, 131]), o($Vd1, [2, 132]), o($Vd1, [2, 133]), o($Vd1, [2, 134]), o($Vd1, [2, 135]), o($Vd1, [2, 136]), o($Vd1, [2, 137]), o($Vd1, [2, 138]), o($Vd1, [2, 139]), o($Vd1, [2, 140]), o($VR, [2, 118], { 86: $Vb1 }), o($VR, [2, 119], { 86: $Vb1 }), { 10: [1, 215] }, o($VR, [2, 120], { 86: $Vb1 }), { 10: [1, 216] }, o($VR, [2, 110], { 86: $Vb1 }), o($VR, [2, 111], { 86: $Vb1 }), o($VR, [2, 112], { 45: 32, 44: 114, 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 113], { 45: 32, 44: 114, 10: [1, 217], 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 115], { 10: [1, 218] }), o($VS, [2, 44]), { 39: [1, 219] }, o($VS, [2, 50]), o($VS, [2, 48]), o($VS, [2, 52]), o($VS, [2, 54]), { 10: $V01, 46: $V11, 71: $V21, 80: $V31, 81: $V41, 84: $V51, 85: 220, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, o($Vd1, [2, 129]), { 13: $V9, 18: $Va, 35: 221, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 222, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 67: [1, 223] }, { 67: [1, 224] }, o($VS, [2, 45], { 21: 225, 10: $VT }), o($Vc1, [2, 127], { 87: 214, 10: $V01, 46: $V11, 71: $V21, 80: $V31, 81: $V41, 84: $V51, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }), o($VR, [2, 123], { 45: 32, 44: 114, 10: [1, 226], 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 124], { 45: 32, 44: 114, 10: [1, 227], 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 114]), o($VR, [2, 116]), o($VS, [2, 46]), { 10: $V01, 46: $V11, 71: $V21, 79: 228, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 229, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, o($VR, [2, 121], { 86: $Vb1 }), o($VR, [2, 122], { 86: $Vb1 })],
    defaultActions: {},
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }

    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            /* do nothing */
            break;
          case 1:
            this.begin('string');
            break;
          case 2:
            this.popState();
            break;
          case 3:
            return 'STR';
            break;
          case 4:
            return 71;
            break;
          case 5:
            return 78;
            break;
          case 6:
            return 72;
            break;
          case 7:
            return 82;
            break;
          case 8:
            return 73;
            break;
          case 9:
            return 74;
            break;
          case 10:
            return 75;
            break;
          case 11:
            return 12;
            break;
          case 12:
            return 30;
            break;
          case 13:
            return 32;
            break;
          case 14:
            return 13;
            break;
          case 15:
            return 13;
            break;
          case 16:
            return 13;
            break;
          case 17:
            return 13;
            break;
          case 18:
            return 13;
            break;
          case 19:
            return 13;
            break;
          case 20:
            return 81;
            break;
          case 21:
            return 91;
            break;
          case 22:
            return 89;
            break;
          case 23:
            return 8;
            break;
          case 24:
            return 86;
            break;
          case 25:
            return 98;
            break;
          case 26:
            return 16;
            break;
          case 27:
            return 15;
            break;
          case 28:
            return 17;
            break;
          case 29:
            return 18;
            break;
          case 30:
            return 53;
            break;
          case 31:
            return 51;
            break;
          case 32:
            return 52;
            break;
          case 33:
            return 54;
            break;
          case 34:
            return 58;
            break;
          case 35:
            return 56;
            break;
          case 36:
            return 57;
            break;
          case 37:
            return 59;
            break;
          case 38:
            return 58;
            break;
          case 39:
            return 56;
            break;
          case 40:
            return 57;
            break;
          case 41:
            return 59;
            break;
          case 42:
            return 63;
            break;
          case 43:
            return 61;
            break;
          case 44:
            return 62;
            break;
          case 45:
            return 64;
            break;
          case 46:
            return 50;
            break;
          case 47:
            return 55;
            break;
          case 48:
            return 60;
            break;
          case 49:
            return 40;
            break;
          case 50:
            return 41;
            break;
          case 51:
            return 46;
            break;
          case 52:
            return 92;
            break;
          case 53:
            return 96;
            break;
          case 54:
            return 84;
            break;
          case 55:
            return 97;
            break;
          case 56:
            return 97;
            break;
          case 57:
            return 88;
            break;
          case 58:
            return 94;
            break;
          case 59:
            return 95;
            break;
          case 60:
            return 65;
            break;
          case 61:
            return 38;
            break;
          case 62:
            return 39;
            break;
          case 63:
            return 36;
            break;
          case 64:
            return 37;
            break;
          case 65:
            return 42;
            break;
          case 66:
            return 43;
            break;
          case 67:
            return 101;
            break;
          case 68:
            return 9;
            break;
          case 69:
            return 10;
            break;
          case 70:
            return 11;
            break;
        }
      },
      rules: [/^(?:%%[^\n]*)/, /^(?:["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:style\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:click\b)/, /^(?:graph\b)/, /^(?:subgraph\b)/, /^(?:end\b\s*)/, /^(?:LR\b)/, /^(?:RL\b)/, /^(?:TB\b)/, /^(?:BT\b)/, /^(?:TD\b)/, /^(?:BR\b)/, /^(?:[0-9]+)/, /^(?:#)/, /^(?::)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:v\b)/, /^(?:\s*--[x]\s*)/, /^(?:\s*-->\s*)/, /^(?:\s*--[o]\s*)/, /^(?:\s*---\s*)/, /^(?:\s*-\.-[x]\s*)/, /^(?:\s*-\.->\s*)/, /^(?:\s*-\.-[o]\s*)/, /^(?:\s*-\.-\s*)/, /^(?:\s*.-[x]\s*)/, /^(?:\s*\.->\s*)/, /^(?:\s*\.-[o]\s*)/, /^(?:\s*\.-\s*)/, /^(?:\s*==[x]\s*)/, /^(?:\s*==>\s*)/, /^(?:\s*==[o]\s*)/, /^(?:\s*==[\=]\s*)/, /^(?:\s*--\s*)/, /^(?:\s*-\.\s*)/, /^(?:\s*==\s*)/, /^(?:\(-)/, /^(?:-\))/, /^(?:-)/, /^(?:\.)/, /^(?:\+)/, /^(?:%)/, /^(?:=)/, /^(?:=)/, /^(?:[A-Za-z]+)/, /^(?:[!"#$%&'*+,-.`?\\_\/])/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\|)/, /^(?:\()/, /^(?:\))/, /^(?:\[)/, /^(?:\])/, /^(?:\{)/, /^(?:\})/, /^(?:")/, /^(?:\n+)/, /^(?:\s)/, /^(?:$)/],
      conditions: { 'string': { 'rules': [2, 3], 'inclusive': false }, 'INITIAL': { 'rules': [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 15-01-14.
 */
var moment = __webpack_require__(20);
var Logger = __webpack_require__(0);
var log = Logger.Log;

var dateFormat = '';
var title = '';
var sections = [];
var tasks = [];
var currentSection = '';

exports.clear = function () {
  sections = [];
  tasks = [];
  currentSection = '';
  title = '';
  taskCnt = 0;
  lastTask = undefined;
  lastTaskID = undefined;
  rawTasks = [];
};

exports.setDateFormat = function (txt) {
  dateFormat = txt;
};

exports.getDateFormat = function () {
  return dateFormat;
};
exports.setTitle = function (txt) {
  title = txt;
};

exports.getTitle = function () {
  return title;
};

exports.addSection = function (txt) {
  currentSection = txt;
  sections.push(txt);
};

exports.getTasks = function () {
  var allItemsPricessed = compileTasks();
  var maxDepth = 10;
  var iterationCount = 0;
  while (!allItemsPricessed && iterationCount < maxDepth) {
    allItemsPricessed = compileTasks();
    iterationCount++;
  }

  tasks = rawTasks;

  return tasks;
};

var getStartDate = function (prevTime, dateFormat, str) {
  str = str.trim

  // Test for after
  ();var re = /^after\s+([\d\w-]+)/;
  var afterStatement = re.exec(str.trim());

  if (afterStatement !== null) {
    var task = exports.findTaskById(afterStatement[1]);

    if (typeof task === 'undefined') {
      var dt = new Date();
      dt.setHours(0, 0, 0, 0);
      return dt;
    }
    return task.endTime;
  }

  // Check for actual date set
  if (moment(str, dateFormat.trim(), true).isValid()) {
    return moment(str, dateFormat.trim(), true).toDate();
  } else {
    log.debug('Invalid date:' + str);
    log.debug('With date format:' + dateFormat.trim());
  }

  // Default date - now
  return new Date();
};

var getEndDate = function (prevTime, dateFormat, str) {
  str = str.trim

  // Check for actual date
  ();if (moment(str, dateFormat.trim(), true).isValid()) {
    return moment(str, dateFormat.trim()).toDate();
  }

  var d = moment(prevTime
  // Check for length
  );var re = /^([\d]+)([wdhms])/;
  var durationStatement = re.exec(str.trim());

  if (durationStatement !== null) {
    switch (durationStatement[2]) {
      case 's':
        d.add(durationStatement[1], 'seconds');
        break;
      case 'm':
        d.add(durationStatement[1], 'minutes');
        break;
      case 'h':
        d.add(durationStatement[1], 'hours');
        break;
      case 'd':
        d.add(durationStatement[1], 'days');
        break;
      case 'w':
        d.add(durationStatement[1], 'weeks');
        break;
    }
    return d.toDate();
  }
  // Default date - now
  return d.toDate();
};

var taskCnt = 0;
var parseId = function (idStr) {
  if (typeof idStr === 'undefined') {
    taskCnt = taskCnt + 1;
    return 'task' + taskCnt;
  }
  return idStr;
};
// id, startDate, endDate
// id, startDate, length
// id, after x, endDate
// id, after x, length
// startDate, endDate
// startDate, length
// after x, endDate
// after x, length
// endDate
// length

var compileData = function (prevTask, dataStr) {
  var ds;

  if (dataStr.substr(0, 1) === ':') {
    ds = dataStr.substr(1, dataStr.length);
  } else {
    ds = dataStr;
  }

  var data = ds.split(',');

  var task = {};
  var df = exports.getDateFormat

  // Get tags like active, done cand crit
  ();var matchFound = true;
  while (matchFound) {
    matchFound = false;
    if (data[0].match(/^\s*active\s*$/)) {
      task.active = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*done\s*$/)) {
      task.done = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*crit\s*$/)) {
      task.crit = true;
      data.shift(1);
      matchFound = true;
    }
  }
  var i;
  for (i = 0; i < data.length; i++) {
    data[i] = data[i].trim();
  }

  switch (data.length) {
    case 1:
      task.id = parseId();
      task.startTime = prevTask.endTime;
      task.endTime = getEndDate(task.startTime, df, data[0]);
      break;
    case 2:
      task.id = parseId();
      task.startTime = getStartDate(undefined, df, data[0]);
      task.endTime = getEndDate(task.startTime, df, data[1]);
      break;
    case 3:
      task.id = parseId(data[0]);
      task.startTime = getStartDate(undefined, df, data[1]);
      task.endTime = getEndDate(task.startTime, df, data[2]);
      break;
    default:
  }

  return task;
};

var parseData = function (prevTaskId, dataStr) {
  var ds;

  if (dataStr.substr(0, 1) === ':') {
    ds = dataStr.substr(1, dataStr.length);
  } else {
    ds = dataStr;
  }

  var data = ds.split(',');

  var task = {};

  // Get tags like active, done cand crit
  var matchFound = true;
  while (matchFound) {
    matchFound = false;
    if (data[0].match(/^\s*active\s*$/)) {
      task.active = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*done\s*$/)) {
      task.done = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*crit\s*$/)) {
      task.crit = true;
      data.shift(1);
      matchFound = true;
    }
  }
  var i;
  for (i = 0; i < data.length; i++) {
    data[i] = data[i].trim();
  }

  switch (data.length) {
    case 1:
      task.id = parseId();
      task.startTime = { type: 'prevTaskEnd', id: prevTaskId };
      task.endTime = { data: data[0] };
      break;
    case 2:
      task.id = parseId();
      task.startTime = { type: 'getStartDate', startData: data[0] };
      task.endTime = { data: data[1] };
      break;
    case 3:
      task.id = parseId(data[0]);
      task.startTime = { type: 'getStartDate', startData: data[1] };
      task.endTime = { data: data[2] };
      break;
    default:
  }

  return task;
};

var lastTask;
var lastTaskID;
var rawTasks = [];
var taskDb = {};
exports.addTask = function (descr, data) {
  var rawTask = {
    section: currentSection,
    type: currentSection,
    processed: false,
    raw: { data: data },
    task: descr
  };
  var taskInfo = parseData(lastTaskID, data);
  rawTask.raw.startTime = taskInfo.startTime;
  rawTask.raw.endTime = taskInfo.endTime;
  rawTask.id = taskInfo.id;
  rawTask.prevTaskId = lastTaskID;
  rawTask.active = taskInfo.active;
  rawTask.done = taskInfo.done;
  rawTask.crit = taskInfo.crit;

  var pos = rawTasks.push(rawTask);

  lastTaskID = rawTask.id;
  // Store cross ref
  taskDb[rawTask.id] = pos - 1;
};

exports.findTaskById = function (id) {
  var pos = taskDb[id];
  return rawTasks[pos];
};

exports.addTaskOrg = function (descr, data) {
  var newTask = {
    section: currentSection,
    type: currentSection,
    description: descr,
    task: descr
  };
  var taskInfo = compileData(lastTask, data);
  newTask.startTime = taskInfo.startTime;
  newTask.endTime = taskInfo.endTime;
  newTask.id = taskInfo.id;
  newTask.active = taskInfo.active;
  newTask.done = taskInfo.done;
  newTask.crit = taskInfo.crit;
  lastTask = newTask;
  tasks.push(newTask);
};

var compileTasks = function () {
  var df = exports.getDateFormat();

  var compileTask = function (pos) {
    var task = rawTasks[pos];
    var startTime = '';
    switch (rawTasks[pos].raw.startTime.type) {
      case 'prevTaskEnd':
        var prevTask = exports.findTaskById(task.prevTaskId);
        task.startTime = prevTask.endTime;
        break;
      case 'getStartDate':
        startTime = getStartDate(undefined, df, rawTasks[pos].raw.startTime.startData);
        if (startTime) {
          rawTasks[pos].startTime = startTime;
        }
        break;
    }

    if (rawTasks[pos].startTime) {
      rawTasks[pos].endTime = getEndDate(rawTasks[pos].startTime, df, rawTasks[pos].raw.endTime.data);
      if (rawTasks[pos].endTime) {
        rawTasks[pos].processed = true;
      }
    }

    return rawTasks[pos].processed;
  };

  var i;
  var allProcessed = true;
  for (i = 0; i < rawTasks.length; i++) {
    compileTask(i);

    allProcessed = allProcessed && rawTasks[i].processed;
  }
  return allProcessed;
};

exports.parseError = function (err, hash) {
  global.mermaidAPI.parseError(err, hash);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [6, 8, 10, 11, 12, 13, 14],
      $V1 = [1, 9],
      $V2 = [1, 10],
      $V3 = [1, 11],
      $V4 = [1, 12];
  var parser = {
    trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'start': 3, 'gantt': 4, 'document': 5, 'EOF': 6, 'line': 7, 'SPACE': 8, 'statement': 9, 'NL': 10, 'dateFormat': 11, 'title': 12, 'section': 13, 'taskTxt': 14, 'taskData': 15, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 4: 'gantt', 6: 'EOF', 8: 'SPACE', 10: 'NL', 11: 'dateFormat', 12: 'title', 13: 'section', 14: 'taskTxt', 15: 'taskData' },
    productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [9, 1], [9, 1], [9, 1], [9, 2]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          return $$[$0 - 1];
          break;
        case 2:
          this.$ = [];
          break;
        case 3:
          $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
          break;
        case 4:case 5:
          this.$ = $$[$0];
          break;
        case 6:case 7:
          this.$ = [];
          break;
        case 8:
          yy.setDateFormat($$[$0].substr(11));this.$ = $$[$0].substr(11);
          break;
        case 9:
          yy.setTitle($$[$0].substr(6));this.$ = $$[$0].substr(6);
          break;
        case 10:
          yy.addSection($$[$0].substr(8));this.$ = $$[$0].substr(8);
          break;
        case 11:
          yy.addTask($$[$0 - 1], $$[$0]);this.$ = 'task';
          break;
      }
    },
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, o($V0, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: $V1, 12: $V2, 13: $V3, 14: $V4 }, o($V0, [2, 7], { 1: [2, 1] }), o($V0, [2, 3]), { 9: 13, 11: $V1, 12: $V2, 13: $V3, 14: $V4 }, o($V0, [2, 5]), o($V0, [2, 6]), o($V0, [2, 8]), o($V0, [2, 9]), o($V0, [2, 10]), { 15: [1, 14] }, o($V0, [2, 4]), o($V0, [2, 11])],
    defaultActions: {},
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }
    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: { 'case-insensitive': true },
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        // Pre-lexer code can go here

        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            return 10;
            break;
          case 1:
            /* skip whitespace */
            break;
          case 2:
            /* skip comments */
            break;
          case 3:
            /* skip comments */
            break;
          case 4:
            return 4;
            break;
          case 5:
            return 11;
            break;
          case 6:
            return 'date';
            break;
          case 7:
            return 12;
            break;
          case 8:
            return 13;
            break;
          case 9:
            return 14;
            break;
          case 10:
            return 15;
            break;
          case 11:
            return ':';
            break;
          case 12:
            return 6;
            break;
          case 13:
            return 'INVALID';
            break;
        }
      },
      rules: [/^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:gantt\b)/i, /^(?:dateFormat\s[^#\n;]+)/i, /^(?:\d\d\d\d-\d\d-\d\d\b)/i, /^(?:title\s[^#\n;]+)/i, /^(?:section\s[^#:\n;]+)/i, /^(?:[^#:\n;]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { 'INITIAL': { 'rules': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Logger = __webpack_require__(0);
const log = Logger.Log;
const _ = __webpack_require__(19);

var commits = {};
var head = null;
var branches = { 'master': head };
var curBranch = 'master';
var direction = 'LR';
var seq = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getId() {
  var pool = '0123456789abcdef';
  var id = '';
  for (var i = 0; i < 7; i++) {
    id += pool[getRandomInt(0, 16)];
  }
  return id;
}

function isfastforwardable(currentCommit, otherCommit) {
  log.debug('Entering isfastforwardable:', currentCommit.id, otherCommit.id);
  while (currentCommit.seq <= otherCommit.seq && currentCommit !== otherCommit) {
    // only if other branch has more commits
    if (otherCommit.parent == null) break;
    if (Array.isArray(otherCommit.parent)) {
      log.debug('In merge commit:', otherCommit.parent);
      return isfastforwardable(currentCommit, commits[otherCommit.parent[0]]) || isfastforwardable(currentCommit, commits[otherCommit.parent[1]]);
    } else {
      otherCommit = commits[otherCommit.parent];
    }
  }
  log.debug(currentCommit.id, otherCommit.id);
  return currentCommit.id === otherCommit.id;
}

function isReachableFrom(currentCommit, otherCommit) {
  var currentSeq = currentCommit.seq;
  var otherSeq = otherCommit.seq;
  if (currentSeq > otherSeq) return isfastforwardable(otherCommit, currentCommit);
  return false;
}

exports.setDirection = function (dir) {
  direction = dir;
};
var options = {};
exports.setOptions = function (rawOptString) {
  log.debug('options str', rawOptString);
  rawOptString = rawOptString && rawOptString.trim();
  rawOptString = rawOptString || '{}';
  try {
    options = JSON.parse(rawOptString);
  } catch (e) {
    log.error('error while parsing gitGraph options', e.message);
  }
};

exports.getOptions = function () {
  return options;
};

exports.commit = function (msg) {
  var commit = {
    id: getId(),
    message: msg,
    seq: seq++,
    parent: head == null ? null : head.id
  };
  head = commit;
  commits[commit.id] = commit;
  branches[curBranch] = commit.id;
  log.debug('in pushCommit ' + commit.id);
};

exports.branch = function (name) {
  branches[name] = head != null ? head.id : null;
  log.debug('in createBranch');
};

exports.merge = function (otherBranch) {
  var currentCommit = commits[branches[curBranch]];
  var otherCommit = commits[branches[otherBranch]];
  if (isReachableFrom(currentCommit, otherCommit)) {
    log.debug('Already merged');
    return;
  }
  if (isfastforwardable(currentCommit, otherCommit)) {
    branches[curBranch] = branches[otherBranch];
    head = commits[branches[curBranch]];
  } else {
    // create merge commit
    var commit = {
      id: getId(),
      message: 'merged branch ' + otherBranch + ' into ' + curBranch,
      seq: seq++,
      parent: [head == null ? null : head.id, branches[otherBranch]]
    };
    head = commit;
    commits[commit.id] = commit;
    branches[curBranch] = commit.id;
  }
  log.debug(branches);
  log.debug('in mergeBranch');
};

exports.checkout = function (branch) {
  log.debug('in checkout');
  curBranch = branch;
  var id = branches[curBranch];
  head = commits[id];
};

exports.reset = function (commitRef) {
  log.debug('in reset', commitRef);
  var ref = commitRef.split(':')[0];
  var parentCount = parseInt(commitRef.split(':')[1]);
  var commit = ref === 'HEAD' ? head : commits[branches[ref]];
  log.debug(commit, parentCount);
  while (parentCount > 0) {
    commit = commits[commit.parent];
    parentCount--;
    if (!commit) {
      var err = 'Critical error - unique parent commit not found during reset';
      log.error(err);
      throw err;
    }
  }
  head = commit;
  branches[curBranch] = commit.id;
};

function upsert(arr, key, newval) {
  const index = arr.indexOf(key);
  if (index === -1) {
    arr.push(newval);
  } else {
    arr.splice(index, 1, newval);
  }
}

function prettyPrintCommitHistory(commitArr) {
  var commit = _.maxBy(commitArr, 'seq');
  var line = '';
  commitArr.forEach(function (c) {
    if (c === commit) {
      line += '\t*';
    } else {
      line += '\t|';
    }
  });
  var label = [line, commit.id, commit.seq];
  _.each(branches, function (value, key) {
    if (value === commit.id) label.push(key);
  });
  log.debug(label.join(' '));
  if (Array.isArray(commit.parent)) {
    var newCommit = commits[commit.parent[0]];
    upsert(commitArr, commit, newCommit);
    commitArr.push(commits[commit.parent[1]]);
  } else if (commit.parent == null) {
    return;
  } else {
    var nextCommit = commits[commit.parent];
    upsert(commitArr, commit, nextCommit);
  }
  commitArr = _.uniqBy(commitArr, 'id');
  prettyPrintCommitHistory(commitArr);
}

exports.prettyPrint = function () {
  log.debug(commits);
  var node = exports.getCommitsArray()[0];
  prettyPrintCommitHistory([node]);
};

exports.clear = function () {
  commits = {};
  head = null;
  branches = { 'master': head };
  curBranch = 'master';
  seq = 0;
};

exports.getBranchesAsObjArray = function () {
  const branchArr = _.map(branches, function (value, key) {
    return { 'name': key, 'commit': commits[value] };
  });
  return branchArr;
};

exports.getBranches = function () {
  return branches;
};
exports.getCommits = function () {
  return commits;
};
exports.getCommitsArray = function () {
  var commitArr = Object.keys(commits).map(function (key) {
    return commits[key];
  });
  commitArr.forEach(function (o) {
    log.debug(o.id);
  });
  return _.orderBy(commitArr, ['seq'], ['desc']);
};
exports.getCurrentBranch = function () {
  return curBranch;
};
exports.getDirection = function () {
  return direction;
};
exports.getHead = function () {
  return head;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [2, 3],
      $V1 = [1, 7],
      $V2 = [7, 12, 15, 17, 19, 20, 21],
      $V3 = [7, 11, 12, 15, 17, 19, 20, 21],
      $V4 = [2, 20],
      $V5 = [1, 32];
  var parser = { trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'start': 3, 'GG': 4, ':': 5, 'document': 6, 'EOF': 7, 'DIR': 8, 'options': 9, 'body': 10, 'OPT': 11, 'NL': 12, 'line': 13, 'statement': 14, 'COMMIT': 15, 'commit_arg': 16, 'BRANCH': 17, 'ID': 18, 'CHECKOUT': 19, 'MERGE': 20, 'RESET': 21, 'reset_arg': 22, 'STR': 23, 'HEAD': 24, 'reset_parents': 25, 'CARET': 26, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 4: 'GG', 5: ':', 7: 'EOF', 8: 'DIR', 11: 'OPT', 12: 'NL', 15: 'COMMIT', 17: 'BRANCH', 18: 'ID', 19: 'CHECKOUT', 20: 'MERGE', 21: 'RESET', 23: 'STR', 24: 'HEAD', 26: 'CARET' },
    productions_: [0, [3, 4], [3, 5], [6, 0], [6, 2], [9, 2], [9, 1], [10, 0], [10, 2], [13, 2], [13, 1], [14, 2], [14, 2], [14, 2], [14, 2], [14, 2], [16, 0], [16, 1], [22, 2], [22, 2], [25, 0], [25, 2]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          return $$[$0 - 1];
          break;
        case 2:
          yy.setDirection($$[$0 - 3]);return $$[$0 - 1];
          break;
        case 4:
          yy.setOptions($$[$0 - 1]);this.$ = $$[$0];
          break;
        case 5:
          $$[$0 - 1] += $$[$0];this.$ = $$[$0 - 1];
          break;
        case 7:
          this.$ = [];
          break;
        case 8:
          $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
          break;
        case 9:
          this.$ = $$[$0 - 1];
          break;
        case 11:
          yy.commit($$[$0]);
          break;
        case 12:
          yy.branch($$[$0]);
          break;
        case 13:
          yy.checkout($$[$0]);
          break;
        case 14:
          yy.merge($$[$0]);
          break;
        case 15:
          yy.reset($$[$0]);
          break;
        case 16:
          this.$ = '';
          break;
        case 17:
          this.$ = $$[$0];
          break;
        case 18:
          this.$ = $$[$0 - 1] + ':' + $$[$0];
          break;
        case 19:
          this.$ = $$[$0 - 1] + ':' + yy.count;yy.count = 0;
          break;
        case 20:
          yy.count = 0;
          break;
        case 21:
          yy.count += 1;
          break;
      }
    },
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3], 8: [1, 4] }, { 6: 5, 7: $V0, 9: 6, 12: $V1 }, { 5: [1, 8] }, { 7: [1, 9] }, o($V2, [2, 7], { 10: 10, 11: [1, 11] }), o($V3, [2, 6]), { 6: 12, 7: $V0, 9: 6, 12: $V1 }, { 1: [2, 1] }, { 7: [2, 4], 12: [1, 15], 13: 13, 14: 14, 15: [1, 16], 17: [1, 17], 19: [1, 18], 20: [1, 19], 21: [1, 20] }, o($V3, [2, 5]), { 7: [1, 21] }, o($V2, [2, 8]), { 12: [1, 22] }, o($V2, [2, 10]), { 12: [2, 16], 16: 23, 23: [1, 24] }, { 18: [1, 25] }, { 18: [1, 26] }, { 18: [1, 27] }, { 18: [1, 30], 22: 28, 24: [1, 29] }, { 1: [2, 2] }, o($V2, [2, 9]), { 12: [2, 11] }, { 12: [2, 17] }, { 12: [2, 12] }, { 12: [2, 13] }, { 12: [2, 14] }, { 12: [2, 15] }, { 12: $V4, 25: 31, 26: $V5 }, { 12: $V4, 25: 33, 26: $V5 }, { 12: [2, 18] }, { 12: $V4, 25: 34, 26: $V5 }, { 12: [2, 19] }, { 12: [2, 21] }],
    defaultActions: { 9: [2, 1], 21: [2, 2], 23: [2, 11], 24: [2, 17], 25: [2, 12], 26: [2, 13], 27: [2, 14], 28: [2, 15], 31: [2, 18], 33: [2, 19], 34: [2, 21] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        function _parseError(msg, hash) {
          this.message = msg;
          this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }
    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: { 'case-insensitive': true },
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            return 12;
            break;
          case 1:
            /* skip all whitespace */
            break;
          case 2:
            /* skip comments */
            break;
          case 3:
            /* skip comments */
            break;
          case 4:
            return 4;
            break;
          case 5:
            return 15;
            break;
          case 6:
            return 17;
            break;
          case 7:
            return 20;
            break;
          case 8:
            return 21;
            break;
          case 9:
            return 19;
            break;
          case 10:
            return 8;
            break;
          case 11:
            return 8;
            break;
          case 12:
            return 5;
            break;
          case 13:
            return 26;
            break;
          case 14:
            this.begin('options');
            break;
          case 15:
            this.popState();
            break;
          case 16:
            return 11;
            break;
          case 17:
            this.begin('string');
            break;
          case 18:
            this.popState();
            break;
          case 19:
            return 23;
            break;
          case 20:
            return 18;
            break;
          case 21:
            return 7;
            break;
        }
      },
      rules: [/^(?:(\r?\n)+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:gitGraph\b)/i, /^(?:commit\b)/i, /^(?:branch\b)/i, /^(?:merge\b)/i, /^(?:reset\b)/i, /^(?:checkout\b)/i, /^(?:LR\b)/i, /^(?:BT\b)/i, /^(?::)/i, /^(?:\^)/i, /^(?:options\r?\n)/i, /^(?:end\r?\n)/i, /^(?:[^\n]+\r?\n)/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:[a-zA-Z][a-zA-Z0-9_]+)/i, /^(?:$)/i],
      conditions: { 'options': { 'rules': [15, 16], 'inclusive': false }, 'string': { 'rules': [18, 19], 'inclusive': false }, 'INITIAL': { 'rules': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 20, 21], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }

  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }

  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
  var o = function (k, v, o, l) {
    for (o = o || {}, l = k.length; l--; o[k[l]] = v);return o;
  },
      $V0 = [1, 2],
      $V1 = [1, 3],
      $V2 = [1, 4],
      $V3 = [2, 4],
      $V4 = [1, 9],
      $V5 = [1, 11],
      $V6 = [1, 12],
      $V7 = [1, 14],
      $V8 = [1, 15],
      $V9 = [1, 17],
      $Va = [1, 18],
      $Vb = [1, 19],
      $Vc = [1, 20],
      $Vd = [1, 21],
      $Ve = [1, 23],
      $Vf = [1, 24],
      $Vg = [1, 4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 24, 25, 27, 28, 39],
      $Vh = [1, 32],
      $Vi = [4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 25, 28, 39],
      $Vj = [4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 25, 27, 28, 39],
      $Vk = [37, 38, 39];
  var parser = { trace: function trace() {},
    yy: {},
    symbols_: { 'error': 2, 'start': 3, 'SPACE': 4, 'NL': 5, 'SD': 6, 'document': 7, 'line': 8, 'statement': 9, 'participant': 10, 'actor': 11, 'AS': 12, 'restOfLine': 13, 'signal': 14, 'activate': 15, 'deactivate': 16, 'note_statement': 17, 'title': 18, 'text2': 19, 'loop': 20, 'end': 21, 'opt': 22, 'alt': 23, 'else': 24, 'par': 25, 'par_sections': 26, 'and': 27, 'note': 28, 'placement': 29, 'over': 30, 'actor_pair': 31, 'spaceList': 32, ',': 33, 'left_of': 34, 'right_of': 35, 'signaltype': 36, '+': 37, '-': 38, 'ACTOR': 39, 'SOLID_OPEN_ARROW': 40, 'DOTTED_OPEN_ARROW': 41, 'SOLID_ARROW': 42, 'DOTTED_ARROW': 43, 'SOLID_CROSS': 44, 'DOTTED_CROSS': 45, 'TXT': 46, '$accept': 0, '$end': 1 },
    terminals_: { 2: 'error', 4: 'SPACE', 5: 'NL', 6: 'SD', 10: 'participant', 12: 'AS', 13: 'restOfLine', 15: 'activate', 16: 'deactivate', 18: 'title', 20: 'loop', 21: 'end', 22: 'opt', 23: 'alt', 24: 'else', 25: 'par', 27: 'and', 28: 'note', 30: 'over', 33: ',', 34: 'left_of', 35: 'right_of', 37: '+', 38: '-', 39: 'ACTOR', 40: 'SOLID_OPEN_ARROW', 41: 'DOTTED_OPEN_ARROW', 42: 'SOLID_ARROW', 43: 'DOTTED_ARROW', 44: 'SOLID_CROSS', 45: 'DOTTED_CROSS', 46: 'TXT' },
    productions_: [0, [3, 2], [3, 2], [3, 2], [7, 0], [7, 2], [8, 2], [8, 1], [8, 1], [9, 5], [9, 3], [9, 2], [9, 3], [9, 3], [9, 2], [9, 3], [9, 4], [9, 4], [9, 7], [9, 4], [26, 1], [26, 4], [17, 4], [17, 4], [32, 2], [32, 1], [31, 3], [31, 1], [29, 1], [29, 1], [14, 5], [14, 5], [14, 4], [11, 1], [36, 1], [36, 1], [36, 1], [36, 1], [36, 1], [36, 1], [19, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 3:
          yy.apply($$[$0]);return $$[$0];
          break;
        case 4:
          this.$ = [];
          break;
        case 5:
          $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
          break;
        case 6:case 7:
          this.$ = $$[$0];
          break;
        case 8:
          this.$ = [];
          break;
        case 9:
          $$[$0 - 3].description = $$[$0 - 1];this.$ = $$[$0 - 3];
          break;
        case 10:
          this.$ = $$[$0 - 1];
          break;
        case 12:
          this.$ = { type: 'activeStart', signalType: yy.LINETYPE.ACTIVE_START, actor: $$[$0 - 1] };
          break;
        case 13:
          this.$ = { type: 'activeEnd', signalType: yy.LINETYPE.ACTIVE_END, actor: $$[$0 - 1] };
          break;
        case 15:
          this.$ = [{ type: 'setTitle', text: $$[$0 - 1] }];
          break;
        case 16:

          $$[$0 - 1].unshift({ type: 'loopStart', loopText: $$[$0 - 2], signalType: yy.LINETYPE.LOOP_START });
          $$[$0 - 1].push({ type: 'loopEnd', loopText: $$[$0 - 2], signalType: yy.LINETYPE.LOOP_END });
          this.$ = $$[$0 - 1];
          break;
        case 17:

          $$[$0 - 1].unshift({ type: 'optStart', optText: $$[$0 - 2], signalType: yy.LINETYPE.OPT_START });
          $$[$0 - 1].push({ type: 'optEnd', optText: $$[$0 - 2], signalType: yy.LINETYPE.OPT_END });
          this.$ = $$[$0 - 1];
          break;
        case 18:

          // Alt start
          $$[$0 - 4].unshift({ type: 'altStart', altText: $$[$0 - 5], signalType: yy.LINETYPE.ALT_START }
          // Content in alt is already in $$[$0-4]
          // Else
          );$$[$0 - 4].push({ type: 'else', altText: $$[$0 - 2], signalType: yy.LINETYPE.ALT_ELSE }
          // Content in other alt
          );$$[$0 - 4] = $$[$0 - 4].concat($$[$0 - 1]
          // End
          );$$[$0 - 4].push({ type: 'altEnd', signalType: yy.LINETYPE.ALT_END });

          this.$ = $$[$0 - 4];
          break;
        case 19:

          // Parallel start
          $$[$0 - 1].unshift({ type: 'parStart', parText: $$[$0 - 2], signalType: yy.LINETYPE.PAR_START }
          // Content in par is already in $$[$0-1]
          // End
          );$$[$0 - 1].push({ type: 'parEnd', signalType: yy.LINETYPE.PAR_END });
          this.$ = $$[$0 - 1];
          break;
        case 21:
          this.$ = $$[$0 - 3].concat([{ type: 'and', parText: $$[$0 - 1], signalType: yy.LINETYPE.PAR_AND }, $$[$0]]);
          break;
        case 22:

          this.$ = [$$[$0 - 1], { type: 'addNote', placement: $$[$0 - 2], actor: $$[$0 - 1].actor, text: $$[$0] }];
          break;
        case 23:

          // Coerce actor_pair into a [to, from, ...] array
          $$[$0 - 2] = [].concat($$[$0 - 1], $$[$0 - 1]).slice(0, 2);
          $$[$0 - 2][0] = $$[$0 - 2][0].actor;
          $$[$0 - 2][1] = $$[$0 - 2][1].actor;
          this.$ = [$$[$0 - 1], { type: 'addNote', placement: yy.PLACEMENT.OVER, actor: $$[$0 - 2].slice(0, 2), text: $$[$0] }];
          break;
        case 26:
          this.$ = [$$[$0 - 2], $$[$0]];
          break;
        case 27:
          this.$ = $$[$0];
          break;
        case 28:
          this.$ = yy.PLACEMENT.LEFTOF;
          break;
        case 29:
          this.$ = yy.PLACEMENT.RIGHTOF;
          break;
        case 30:
          this.$ = [$$[$0 - 4], $$[$0 - 1], { type: 'addMessage', from: $$[$0 - 4].actor, to: $$[$0 - 1].actor, signalType: $$[$0 - 3], msg: $$[$0] }, { type: 'activeStart', signalType: yy.LINETYPE.ACTIVE_START, actor: $$[$0 - 1] }];
          break;
        case 31:
          this.$ = [$$[$0 - 4], $$[$0 - 1], { type: 'addMessage', from: $$[$0 - 4].actor, to: $$[$0 - 1].actor, signalType: $$[$0 - 3], msg: $$[$0] }, { type: 'activeEnd', signalType: yy.LINETYPE.ACTIVE_END, actor: $$[$0 - 4] }];
          break;
        case 32:
          this.$ = [$$[$0 - 3], $$[$0 - 1], { type: 'addMessage', from: $$[$0 - 3].actor, to: $$[$0 - 1].actor, signalType: $$[$0 - 2], msg: $$[$0] }];
          break;
        case 33:
          this.$ = { type: 'addActor', actor: $$[$0] };
          break;
        case 34:
          this.$ = yy.LINETYPE.SOLID_OPEN;
          break;
        case 35:
          this.$ = yy.LINETYPE.DOTTED_OPEN;
          break;
        case 36:
          this.$ = yy.LINETYPE.SOLID;
          break;
        case 37:
          this.$ = yy.LINETYPE.DOTTED;
          break;
        case 38:
          this.$ = yy.LINETYPE.SOLID_CROSS;
          break;
        case 39:
          this.$ = yy.LINETYPE.DOTTED_CROSS;
          break;
        case 40:
          this.$ = $$[$0].substring(1).trim().replace(/\\n/gm, '\n');
          break;
      }
    },
    table: [{ 3: 1, 4: $V0, 5: $V1, 6: $V2 }, { 1: [3] }, { 3: 5, 4: $V0, 5: $V1, 6: $V2 }, { 3: 6, 4: $V0, 5: $V1, 6: $V2 }, o([1, 4, 5, 10, 15, 16, 18, 20, 22, 23, 25, 28, 39], $V3, { 7: 7 }), { 1: [2, 1] }, { 1: [2, 2] }, { 1: [2, 3], 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 22: $Vb, 23: $Vc, 25: $Vd, 28: $Ve, 39: $Vf }, o($Vg, [2, 5]), { 9: 25, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 22: $Vb, 23: $Vc, 25: $Vd, 28: $Ve, 39: $Vf }, o($Vg, [2, 7]), o($Vg, [2, 8]), { 11: 26, 39: $Vf }, { 5: [1, 27] }, { 11: 28, 39: $Vf }, { 11: 29, 39: $Vf }, { 5: [1, 30] }, { 19: 31, 46: $Vh }, { 13: [1, 33] }, { 13: [1, 34] }, { 13: [1, 35] }, { 13: [1, 36] }, { 36: 37, 40: [1, 38], 41: [1, 39], 42: [1, 40], 43: [1, 41], 44: [1, 42], 45: [1, 43] }, { 29: 44, 30: [1, 45], 34: [1, 46], 35: [1, 47] }, o([5, 12, 33, 40, 41, 42, 43, 44, 45, 46], [2, 33]), o($Vg, [2, 6]), { 5: [1, 49], 12: [1, 48] }, o($Vg, [2, 11]), { 5: [1, 50] }, { 5: [1, 51] }, o($Vg, [2, 14]), { 5: [1, 52] }, { 5: [2, 40] }, o($Vi, $V3, { 7: 53 }), o($Vi, $V3, { 7: 54 }), o([4, 5, 10, 15, 16, 18, 20, 22, 23, 24, 25, 28, 39], $V3, { 7: 55 }), o($Vj, $V3, { 26: 56, 7: 57 }), { 11: 60, 37: [1, 58], 38: [1, 59], 39: $Vf }, o($Vk, [2, 34]), o($Vk, [2, 35]), o($Vk, [2, 36]), o($Vk, [2, 37]), o($Vk, [2, 38]), o($Vk, [2, 39]), { 11: 61, 39: $Vf }, { 11: 63, 31: 62, 39: $Vf }, { 39: [2, 28] }, { 39: [2, 29] }, { 13: [1, 64] }, o($Vg, [2, 10]), o($Vg, [2, 12]), o($Vg, [2, 13]), o($Vg, [2, 15]), { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [1, 65], 22: $Vb, 23: $Vc, 25: $Vd, 28: $Ve, 39: $Vf }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [1, 66], 22: $Vb, 23: $Vc, 25: $Vd, 28: $Ve, 39: $Vf }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 22: $Vb, 23: $Vc, 24: [1, 67], 25: $Vd, 28: $Ve, 39: $Vf }, { 21: [1, 68] }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [2, 20], 22: $Vb, 23: $Vc, 25: $Vd, 27: [1, 69], 28: $Ve, 39: $Vf }, { 11: 70, 39: $Vf }, { 11: 71, 39: $Vf }, { 19: 72, 46: $Vh }, { 19: 73, 46: $Vh }, { 19: 74, 46: $Vh }, { 33: [1, 75], 46: [2, 27] }, { 5: [1, 76] }, o($Vg, [2, 16]), o($Vg, [2, 17]), { 13: [1, 77] }, o($Vg, [2, 19]), { 13: [1, 78] }, { 19: 79, 46: $Vh }, { 19: 80, 46: $Vh }, { 5: [2, 32] }, { 5: [2, 22] }, { 5: [2, 23] }, { 11: 81, 39: $Vf }, o($Vg, [2, 9]), o($Vi, $V3, { 7: 82 }), o($Vj, $V3, { 7: 57, 26: 83 }), { 5: [2, 30] }, { 5: [2, 31] }, { 46: [2, 26] }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [1, 84], 22: $Vb, 23: $Vc, 25: $Vd, 28: $Ve, 39: $Vf }, { 21: [2, 21] }, o($Vg, [2, 18])],
    defaultActions: { 5: [2, 1], 6: [2, 2], 32: [2, 40], 46: [2, 28], 47: [2, 29], 72: [2, 32], 73: [2, 22], 74: [2, 23], 79: [2, 30], 80: [2, 31], 81: [2, 26], 83: [2, 21] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function parse(input) {
      var self = this,
          stack = [0],
          tstack = [],
          vstack = [null],
          lstack = [],
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc === 'undefined') {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
          preErrorSymbol,
          state,
          action,
          a,
          r,
          yyval = {},
          p,
          len,
          newState,
          expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol === 'undefined') {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          var errStr = '';
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push('\'' + this.terminals_[p] + '\'');
            }
          }
          if (lexer.showPosition) {
            errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
          } else {
            errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
            if (typeof r !== 'undefined') {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }

    /* generated by jison-lex 0.3.4 */
  };var lexer = function () {
    var lexer = {

      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len
        // this.yyleng -= len;
        );this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join('-');
        return pre + this.upcomingInput() + '\n' + c + '^';
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === '') {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: '',
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions['INITIAL'].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return 'INITIAL';
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: { 'case-insensitive': true },
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            return 5;
            break;
          case 1:
            /* skip all whitespace */
            break;
          case 2:
            /* skip same-line whitespace */
            break;
          case 3:
            /* skip comments */
            break;
          case 4:
            /* skip comments */
            break;
          case 5:
            this.begin('ID');return 10;
            break;
          case 6:
            this.begin('ALIAS');return 39;
            break;
          case 7:
            this.popState();this.popState();this.begin('LINE');return 12;
            break;
          case 8:
            this.popState();this.popState();return 5;
            break;
          case 9:
            this.begin('LINE');return 20;
            break;
          case 10:
            this.begin('LINE');return 22;
            break;
          case 11:
            this.begin('LINE');return 23;
            break;
          case 12:
            this.begin('LINE');return 24;
            break;
          case 13:
            this.begin('LINE');return 25;
            break;
          case 14:
            this.begin('LINE');return 27;
            break;
          case 15:
            this.popState();return 13;
            break;
          case 16:
            return 21;
            break;
          case 17:
            return 34;
            break;
          case 18:
            return 35;
            break;
          case 19:
            return 30;
            break;
          case 20:
            return 28;
            break;
          case 21:
            this.begin('ID');return 15;
            break;
          case 22:
            this.begin('ID');return 16;
            break;
          case 23:
            return 18;
            break;
          case 24:
            return 6;
            break;
          case 25:
            return 33;
            break;
          case 26:
            return 5;
            break;
          case 27:
            yy_.yytext = yy_.yytext.trim();return 39;
            break;
          case 28:
            return 42;
            break;
          case 29:
            return 43;
            break;
          case 30:
            return 40;
            break;
          case 31:
            return 41;
            break;
          case 32:
            return 44;
            break;
          case 33:
            return 45;
            break;
          case 34:
            return 46;
            break;
          case 35:
            return 37;
            break;
          case 36:
            return 38;
            break;
          case 37:
            return 5;
            break;
          case 38:
            return 'INVALID';
            break;
        }
      },
      rules: [/^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:((?!\n)\s)+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:participant\b)/i, /^(?:[^\->:\n,;]+?(?=((?!\n)\s)+as(?!\n)\s|[#\n;]|$))/i, /^(?:as\b)/i, /^(?:(?:))/i, /^(?:loop\b)/i, /^(?:opt\b)/i, /^(?:alt\b)/i, /^(?:else\b)/i, /^(?:par\b)/i, /^(?:and\b)/i, /^(?:[^#\n;]*)/i, /^(?:end\b)/i, /^(?:left of\b)/i, /^(?:right of\b)/i, /^(?:over\b)/i, /^(?:note\b)/i, /^(?:activate\b)/i, /^(?:deactivate\b)/i, /^(?:title\b)/i, /^(?:sequenceDiagram\b)/i, /^(?:,)/i, /^(?:;)/i, /^(?:[^\+\->:\n,;]+)/i, /^(?:->>)/i, /^(?:-->>)/i, /^(?:->)/i, /^(?:-->)/i, /^(?:-[x])/i, /^(?:--[x])/i, /^(?::[^#\n;]+)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { 'LINE': { 'rules': [2, 3, 15], 'inclusive': false }, 'ALIAS': { 'rules': [2, 3, 7, 8], 'inclusive': false }, 'ID': { 'rules': [2, 3, 6], 'inclusive': false }, 'INITIAL': { 'rules': [0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], 'inclusive': true } }
    };
    return lexer;
  }();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser();
}();

if (true) {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () {
    return parser.parse.apply(parser, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log('Usage: ' + args[0] + ' FILE');
      process.exit(1);
    }
    var source = __webpack_require__(3).readFileSync(__webpack_require__(4).normalize(args[1]), 'utf8');
    return exports.parser.parse(source);
  };
  if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-11-19.
 */
var actors = {};
var messages = [];
var notes = [];
var title = '';
var Logger = __webpack_require__(0);
var log = Logger.Log;

exports.addActor = function (id, name, description) {
  // Don't allow description nulling
  var old = actors[id];
  if (old && name === old.name && description == null) return;

  // Don't allow null descriptions, either
  if (description == null) description = name;

  actors[id] = { name: name, description: description };
};

exports.addMessage = function (idFrom, idTo, message, answer) {
  messages.push({ from: idFrom, to: idTo, message: message, answer: answer });
};

exports.addSignal = function (idFrom, idTo, message, messageType) {
  log.debug('Adding message from=' + idFrom + ' to=' + idTo + ' message=' + message + ' type=' + messageType);
  messages.push({ from: idFrom, to: idTo, message: message, type: messageType });
};

exports.getMessages = function () {
  return messages;
};

exports.getActors = function () {
  return actors;
};
exports.getActor = function (id) {
  return actors[id];
};
exports.getActorKeys = function () {
  return Object.keys(actors);
};
exports.getTitle = function () {
  return title;
};

exports.clear = function () {
  actors = {};
  messages = [];
};

exports.LINETYPE = {
  SOLID: 0,
  DOTTED: 1,
  NOTE: 2,
  SOLID_CROSS: 3,
  DOTTED_CROSS: 4,
  SOLID_OPEN: 5,
  DOTTED_OPEN: 6,
  LOOP_START: 10,
  LOOP_END: 11,
  ALT_START: 12,
  ALT_ELSE: 13,
  ALT_END: 14,
  OPT_START: 15,
  OPT_END: 16,
  ACTIVE_START: 17,
  ACTIVE_END: 18,
  PAR_START: 19,
  PAR_AND: 20,
  PAR_END: 21
};

exports.ARROWTYPE = {
  FILLED: 0,
  OPEN: 1
};

exports.PLACEMENT = {
  LEFTOF: 0,
  RIGHTOF: 1,
  OVER: 2
};

exports.addNote = function (actor, placement, message) {
  var note = { actor: actor, placement: placement, message: message

    // Coerce actor into a [to, from, ...] array
  };var actors = [].concat(actor, actor);

  notes.push(note);
  messages.push({ from: actors[0], to: actors[1], message: message, type: exports.LINETYPE.NOTE, placement: placement });
};

exports.setTitle = function (titleText) {
  title = titleText;
};

exports.parseError = function (err, hash) {
  global.mermaidAPI.parseError(err, hash);
};

exports.apply = function (param) {
  if (param instanceof Array) {
    param.forEach(function (item) {
      exports.apply(item);
    });
  } else {
    switch (param.type) {
      case 'addActor':
        exports.addActor(param.actor, param.actor, param.description);
        break;
      case 'activeStart':
        exports.addSignal(param.actor, undefined, undefined, param.signalType);
        break;
      case 'activeEnd':
        exports.addSignal(param.actor, undefined, undefined, param.signalType);
        break;
      case 'addNote':
        exports.addNote(param.actor, param.placement, param.text);
        break;
      case 'addMessage':
        exports.addSignal(param.from, param.to, param.msg, param.signalType);
        break;
      case 'loopStart':
        exports.addSignal(undefined, undefined, param.loopText, param.signalType);
        break;
      case 'loopEnd':
        exports.addSignal(undefined, undefined, undefined, param.signalType);
        break;
      case 'optStart':
        exports.addSignal(undefined, undefined, param.optText, param.signalType);
        break;
      case 'optEnd':
        exports.addSignal(undefined, undefined, undefined, param.signalType);
        break;
      case 'altStart':
        exports.addSignal(undefined, undefined, param.altText, param.signalType);
        break;
      case 'else':
        exports.addSignal(undefined, undefined, param.altText, param.signalType);
        break;
      case 'altEnd':
        exports.addSignal(undefined, undefined, undefined, param.signalType);
        break;
      case 'setTitle':
        exports.setTitle(param.text);
        break;
      case 'parStart':
        exports.addSignal(undefined, undefined, param.parText, param.signalType);
        break;
      case 'and':
        exports.addSignal(undefined, undefined, param.parText, param.signalType);
        break;
      case 'parEnd':
        exports.addSignal(undefined, undefined, undefined, param.signalType);
        break;
    }
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-11-23.
 */
var Logger = __webpack_require__(0);
var log = Logger.Log;

/**
 * @function detectType
 * Detects the type of the graph text.
 * ```mermaid
 * graph LR
 *  a-->b
 *  b-->c
 *  c-->d
 *  d-->e
 *  e-->f
 *  f-->g
 *  g-->h
 * ```
 *
 * @param {string} text The text defining the graph
 * @returns {string} A graph definition key
 */
var detectType = function (text) {
  text = text.replace(/^\s*%%.*\n/g, '\n');
  if (text.match(/^\s*sequenceDiagram/)) {
    return 'sequenceDiagram';
  }

  if (text.match(/^\s*digraph/)) {
    return 'dotGraph';
  }

  if (text.match(/^\s*info/)) {
    return 'info';
  }

  if (text.match(/^\s*gantt/)) {
    return 'gantt';
  }

  if (text.match(/^\s*classDiagram/)) {
    log.debug('Detected classDiagram syntax');
    return 'classDiagram';
  }

  if (text.match(/^\s*gitGraph/)) {
    log.debug('Detected gitGraph syntax');
    return 'gitGraph';
  }
  return 'graph';
};
exports.detectType = detectType;

/**
 * Copies all relevant CSS content into the graph SVG.
 * This allows the SVG to be copied as is while keeping class based styling
 * @param {element} svg The root element of the SVG
 * @param {object} Hash table of class definitions from the graph definition
 */
var cloneCssStyles = function (svg, classes) {
  var usedStyles = '';
  var sheets = document.styleSheets;
  var rule;
  for (var i = 0; i < sheets.length; i++) {
    // Avoid multiple inclusion on pages with multiple graphs
    if (sheets[i].title !== 'mermaid-svg-internal-css') {
      try {
        var rules = sheets[i].cssRules;
        if (rules !== null) {
          for (var j = 0; j < rules.length; j++) {
            rule = rules[j];
            if (typeof rule.style !== 'undefined') {
              var elems;
              elems = svg.querySelectorAll(rule.selectorText);
              if (elems.length > 0) {
                usedStyles += rule.selectorText + ' { ' + rule.style.cssText + '}\n';
              }
            }
          }
        }
      } catch (err) {
        if (typeof rule !== 'undefined') {
          log.warn('Invalid CSS selector "' + rule.selectorText + '"', err);
        }
      }
    }
  }

  var defaultStyles = '';
  var embeddedStyles = '';

  for (var className in classes) {
    if (classes.hasOwnProperty(className) && typeof className !== 'undefined') {
      if (className === 'default') {
        if (classes.default.styles instanceof Array) {
          defaultStyles += '#' + svg.id.trim() + ' .node' + '>rect { ' + classes[className].styles.join('; ') + '; }\n';
        }
        if (classes.default.nodeLabelStyles instanceof Array) {
          defaultStyles += '#' + svg.id.trim() + ' .node text ' + ' { ' + classes[className].nodeLabelStyles.join('; ') + '; }\n';
        }
        if (classes.default.edgeLabelStyles instanceof Array) {
          defaultStyles += '#' + svg.id.trim() + ' .edgeLabel text ' + ' { ' + classes[className].edgeLabelStyles.join('; ') + '; }\n';
        }
        if (classes.default.clusterStyles instanceof Array) {
          defaultStyles += '#' + svg.id.trim() + ' .cluster rect ' + ' { ' + classes[className].clusterStyles.join('; ') + '; }\n';
        }
      } else {
        if (classes[className].styles instanceof Array) {
          embeddedStyles += '#' + svg.id.trim() + ' .' + className + '>rect, .' + className + '>polygon, .' + className + '>circle, .' + className + '>ellipse { ' + classes[className].styles.join('; ') + '; }\n';
        }
      }
    }
  }

  if (usedStyles !== '' || defaultStyles !== '' || embeddedStyles !== '') {
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('title', 'mermaid-svg-internal-css');
    s.innerHTML = '/* <![CDATA[ */\n';
    // Make this CSS local to this SVG
    if (defaultStyles !== '') {
      s.innerHTML += defaultStyles;
    }
    if (usedStyles !== '') {
      s.innerHTML += usedStyles;
    }
    if (embeddedStyles !== '') {
      s.innerHTML += embeddedStyles;
    }
    s.innerHTML += '/* ]]> */\n';
    svg.insertBefore(s, svg.firstChild);
  }
};

exports.cloneCssStyles = cloneCssStyles;

/**
 * @function isSubstringInArray
 * Detects whether a substring in present in a given array
 * @param {string} str The substring to detect
 * @param {array} arr The array to search
 * @returns {number} the array index containing the substring or -1 if not present
 **/
var isSubstringInArray = function (str, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].match(str)) return i;
  }
  return -1;
};

exports.isSubstringInArray = isSubstringInArray;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-11-23.
 */

var cd = __webpack_require__(6).parser;
var cDDb = __webpack_require__(5);
cd.yy = cDDb;
var d3 = __webpack_require__(1);
var Logger = __webpack_require__(0);
var log = Logger.Log;
var dagre = __webpack_require__(31);

var idCache;
idCache = {};

var classCnt = 0;
var conf = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10

  // Todo optimize
};var getGraphId = function (label) {
  var keys = Object.keys(idCache);

  var i;
  for (i = 0; i < keys.length; i++) {
    if (idCache[keys[i]].label === label) {
      return keys[i];
    }
  }

  return undefined;
};

/**
 * Setup arrow head and define the marker. The result is appended to the svg.
 */
var insertMarkers = function (elem) {
  elem.append('defs').append('marker').attr('id', 'extensionStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 1,7 L18,13 V 1 Z');

  elem.append('defs').append('marker').attr('id', 'extensionEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 1,1 V 13 L18,7 Z' // this is actual shape for arrowhead

  );elem.append('defs').append('marker').attr('id', 'compositionStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'compositionEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'aggregationStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'aggregationEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'dependencyStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 5,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'dependencyEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L14,7 L9,1 Z');
};

var edgeCount = 0;
var drawEdge = function (elem, path, relation) {
  var getRelationType = function (type) {
    switch (type) {
      case cDDb.relationType.AGGREGATION:
        return 'aggregation';
      case cDDb.relationType.EXTENSION:
        return 'extension';
      case cDDb.relationType.COMPOSITION:
        return 'composition';
      case cDDb.relationType.DEPENDENCY:
        return 'dependency';
    }
  };

  // The data for our line
  var lineData = path.points;

  // This is the accessor function we talked about above
  var lineFunction = d3.svg.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).interpolate('basis');

  var svgPath = elem.append('path').attr('d', lineFunction(lineData)).attr('id', 'edge' + edgeCount).attr('class', 'relation');
  var url = '';
  if (conf.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, '\\(');
    url = url.replace(/\)/g, '\\)');
  }

  if (relation.relation.type1 !== 'none') {
    svgPath.attr('marker-start', 'url(' + url + '#' + getRelationType(relation.relation.type1) + 'Start' + ')');
  }
  if (relation.relation.type2 !== 'none') {
    svgPath.attr('marker-end', 'url(' + url + '#' + getRelationType(relation.relation.type2) + 'End' + ')');
  }

  var x, y;
  var l = path.points.length;
  if (l % 2 !== 0) {
    var p1 = path.points[Math.floor(l / 2)];
    var p2 = path.points[Math.ceil(l / 2)];
    x = (p1.x + p2.x) / 2;
    y = (p1.y + p2.y) / 2;
  } else {
    var p = path.points[Math.floor(l / 2)];
    x = p.x;
    y = p.y;
  }

  if (typeof relation.title !== 'undefined') {
    var g = elem.append('g').attr('class', 'classLabel');
    var label = g.append('text').attr('class', 'label').attr('x', x).attr('y', y).attr('fill', 'red').attr('text-anchor', 'middle').text(relation.title);

    window.label = label;
    var bounds = label.node().getBBox();

    g.insert('rect', ':first-child').attr('class', 'box').attr('x', bounds.x - conf.padding / 2).attr('y', bounds.y - conf.padding / 2).attr('width', bounds.width + conf.padding).attr('height', bounds.height + conf.padding);
  }

  edgeCount++;
};

var drawClass = function (elem, classDef) {
  log.info('Rendering class ' + classDef);

  var addTspan = function (textEl, txt, isFirst) {
    var tSpan = textEl.append('tspan').attr('x', conf.padding).text(txt);
    if (!isFirst) {
      tSpan.attr('dy', conf.textHeight);
    }
  };

  var id = 'classId' + classCnt;
  var classInfo = {
    id: id,
    label: classDef.id,
    width: 0,
    height: 0
  };

  var g = elem.append('g').attr('id', id).attr('class', 'classGroup');
  var title = g.append('text').attr('x', conf.padding).attr('y', conf.textHeight + conf.padding).text(classDef.id);

  var titleHeight = title.node().getBBox().height;

  var membersLine = g.append('line' // text label for the x axis
  ).attr('x1', 0).attr('y1', conf.padding + titleHeight + conf.dividerMargin / 2).attr('y2', conf.padding + titleHeight + conf.dividerMargin / 2);

  var members = g.append('text' // text label for the x axis
  ).attr('x', conf.padding).attr('y', titleHeight + conf.dividerMargin + conf.textHeight).attr('fill', 'white').attr('class', 'classText');

  var isFirst = true;

  classDef.members.forEach(function (member) {
    addTspan(members, member, isFirst);
    isFirst = false;
  });

  var membersBox = members.node().getBBox();

  var methodsLine = g.append('line' // text label for the x axis
  ).attr('x1', 0).attr('y1', conf.padding + titleHeight + conf.dividerMargin + membersBox.height).attr('y2', conf.padding + titleHeight + conf.dividerMargin + membersBox.height);

  var methods = g.append('text' // text label for the x axis
  ).attr('x', conf.padding).attr('y', titleHeight + 2 * conf.dividerMargin + membersBox.height + conf.textHeight).attr('fill', 'white').attr('class', 'classText');

  isFirst = true;

  classDef.methods.forEach(function (method) {
    addTspan(methods, method, isFirst);
    isFirst = false;
  });

  var classBox = g.node().getBBox();
  g.insert('rect', ':first-child').attr('x', 0).attr('y', 0).attr('width', classBox.width + 2 * conf.padding).attr('height', classBox.height + conf.padding + 0.5 * conf.dividerMargin);

  membersLine.attr('x2', classBox.width + 2 * conf.padding);
  methodsLine.attr('x2', classBox.width + 2 * conf.padding);

  classInfo.width = classBox.width + 2 * conf.padding;
  classInfo.height = classBox.height + conf.padding + 0.5 * conf.dividerMargin;

  idCache[id] = classInfo;
  classCnt++;
  return classInfo;
};

module.exports.setConf = function (cnf) {
  var keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};
/**
 * Draws a flowchart in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
module.exports.draw = function (text, id) {
  cd.yy.clear();
  cd.parse(text);

  log.info('Rendering diagram ' + text

  /// / Fetch the default direction, use TD if none was found
  );var diagram = d3.select('#' + id);
  insertMarkers(diagram

  // Layout graph, Create a new directed graph
  );var g = new dagre.graphlib.Graph({
    multigraph: true
  });

  // Set an object for the graph label
  g.setGraph({
    isMultiGraph: true
  }

  // Default to assigning a new object as a label for each new edge.
  );g.setDefaultEdgeLabel(function () {
    return {};
  });

  var classes = cDDb.getClasses();
  var keys = Object.keys(classes);
  var i;
  for (i = 0; i < keys.length; i++) {
    var classDef = classes[keys[i]];
    var node = drawClass(diagram, classDef
    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    );g.setNode(node.id, node);
    log.info('Org height: ' + node.height);
  }

  var relations = cDDb.getRelations();
  relations.forEach(function (relation) {
    log.info('tjoho' + getGraphId(relation.id1) + getGraphId(relation.id2) + JSON.stringify(relation));
    g.setEdge(getGraphId(relation.id1), getGraphId(relation.id2), { relation: relation });
  });
  dagre.layout(g);
  g.nodes().forEach(function (v) {
    if (typeof v !== 'undefined') {
      log.debug('Node ' + v + ': ' + JSON.stringify(g.node(v)));
      d3.select('#' + v).attr('transform', 'translate(' + (g.node(v).x - g.node(v).width / 2) + ',' + (g.node(v).y - g.node(v).height / 2) + ' )');
    }
  });
  g.edges().forEach(function (e) {
    log.debug('Edge ' + e.v + ' -> ' + e.w + ': ' + JSON.stringify(g.edge(e)));
    drawEdge(diagram, g.edge(e), g.edge(e).relation);
  });

  diagram.attr('height', '100%');
  diagram.attr('width', '100%');
  diagram.attr('viewBox', '0 0 ' + (g.graph().width + 20) + ' ' + (g.graph().height + 20));
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-12-11.
 */
var db = __webpack_require__(7);
var exampleParser = __webpack_require__(8);
var d3 = __webpack_require__(1);

var Logger = __webpack_require__(0);
var log = Logger.Log;

/**
 * Draws a an info picture in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
exports.draw = function (txt, id, ver) {
  var parser;
  parser = exampleParser.parser;
  parser.yy = db;
  log.debug('Renering example diagram'
  // Parse the graph definition
  );parser.parse(txt

  // Fetch the default direction, use TD if none was found
  );var svg = d3.select('#' + id);

  var g = svg.append('g');

  g.append('text' // text label for the x axis
  ).attr('x', 100).attr('y', 40).attr('class', 'version').attr('font-size', '32px').style('text-anchor', 'middle').text('mermaid ' + ver);

  svg.attr('height', 100);
  svg.attr('width', 400);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-12-11.
 */
var graph = __webpack_require__(9);
var flow = __webpack_require__(11);
var dot = __webpack_require__(10);
var d3 = __webpack_require__(1);
var dagreD3 = __webpack_require__(32);
var Logger = __webpack_require__(0);
var log = Logger.Log;

var conf = {};
module.exports.setConf = function (cnf) {
  var keys = Object.keys(cnf);
  var i;
  for (i = 0; i < keys.length; i++) {
    conf[keys[i]] = cnf[keys[i]];
  }
};

/**
 * Function that adds the vertices found in the graph definition to the graph to be rendered.
 * @param vert Object containing the vertices.
 * @param g The graph that is to be drawn.
 */
exports.addVertices = function (vert, g) {
  var keys = Object.keys(vert);

  var styleFromStyleArr = function (styleStr, arr) {
    var i;
    // Create a compound style definition from the style definitions found for the node in the graph definition
    for (i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== 'undefined') {
        styleStr = styleStr + arr[i] + ';';
      }
    }

    return styleStr;
  };

  // Iterate through each item in the vertice object (containing all the vertices found) in the graph definition
  keys.forEach(function (id) {
    var vertice = vert[id];
    var verticeText;

    /**
     * Variable for storing the classes for the vertice
     * @type {string}
     */
    var classStr = '';

    if (vertice.classes.length > 0) {
      classStr = vertice.classes.join(' ');
    }

    /**
     * Variable for storing the extracted style for the vertice
     * @type {string}
     */
    var style = '';
    // Create a compound style definition from the style definitions found for the node in the graph definition
    style = styleFromStyleArr(style, vertice.styles

    // Use vertice id as text in the box if no text is provided by the graph definition
    );if (typeof vertice.text === 'undefined') {
      verticeText = vertice.id;
    } else {
      verticeText = vertice.text;
    }

    var labelTypeStr = '';
    if (conf.htmlLabels) {
      labelTypeStr = 'html';
      verticeText = verticeText.replace(/fa:fa[\w-]+/g, function (s) {
        return '<i class="fa ' + s.substring(3) + '"></i>';
      });
    } else {
      var svgLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');

      var rows = verticeText.split(/<br>/);

      var j = 0;
      for (j = 0; j < rows.length; j++) {
        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
        tspan.setAttribute('dy', '1em');
        tspan.setAttribute('x', '1');
        tspan.textContent = rows[j];
        svgLabel.appendChild(tspan);
      }

      labelTypeStr = 'svg';
      verticeText = svgLabel;
    }

    var radious = 0;
    var _shape = '';

    // Set the shape based parameters
    switch (vertice.type) {
      case 'round':
        radious = 5;
        _shape = 'rect';
        break;
      case 'square':
        _shape = 'rect';
        break;
      case 'diamond':
        _shape = 'question';
        break;
      case 'odd':
        _shape = 'rect_left_inv_arrow';
        break;
      case 'odd_right':
        _shape = 'rect_left_inv_arrow';
        break;
      case 'circle':
        _shape = 'circle';
        break;
      case 'ellipse':
        _shape = 'ellipse';
        break;
      case 'group':
        _shape = 'rect';
        // Need to create a text node if using svg labels, see #367
        verticeText = conf.htmlLabels ? '' : document.createElementNS('http://www.w3.org/2000/svg', 'text');
        break;
      default:
        _shape = 'rect';
    }
    // Add the node
    g.setNode(vertice.id, { labelType: labelTypeStr, shape: _shape, label: verticeText, rx: radious, ry: radious, 'class': classStr, style: style, id: vertice.id });
  });
};

/**
 * Add edges to graph based on parsed graph defninition
 * @param {Object} edges The edges to add to the graph
 * @param {Object} g The graph object
 */
exports.addEdges = function (edges, g) {
  var cnt = 0;

  var defaultStyle;
  if (typeof edges.defaultStyle !== 'undefined') {
    defaultStyle = edges.defaultStyle.toString().replace(/,/g, ';');
  }

  edges.forEach(function (edge) {
    cnt++;
    var edgeData = {};

    // Set link type for rendering
    if (edge.type === 'arrow_open') {
      edgeData.arrowhead = 'none';
    } else {
      edgeData.arrowhead = 'normal';
    }

    var style = '';

    if (typeof edge.style !== 'undefined') {
      edge.style.forEach(function (s) {
        style = style + s + ';';
      });
    } else {
      switch (edge.stroke) {
        case 'normal':
          style = 'fill:none';
          if (typeof defaultStyle !== 'undefined') {
            style = defaultStyle;
          }
          break;
        case 'dotted':
          style = 'stroke: #333; fill:none;stroke-width:2px;stroke-dasharray:3;';
          break;
        case 'thick':
          style = 'stroke: #333; stroke-width: 3.5px;fill:none';
          break;
      }
    }
    edgeData.style = style;

    if (typeof edge.interpolate !== 'undefined') {
      edgeData.lineInterpolate = edge.interpolate;
    } else {
      if (typeof edges.defaultInterpolate !== 'undefined') {
        edgeData.lineInterpolate = edges.defaultInterpolate;
      }
    }

    if (typeof edge.text === 'undefined') {
      if (typeof edge.style !== 'undefined') {
        edgeData.arrowheadStyle = 'fill: #333';
      }
    } else {
      edgeData.arrowheadStyle = 'fill: #333';
      if (typeof edge.style === 'undefined') {
        edgeData.labelpos = 'c';
        if (conf.htmlLabels) {
          edgeData.labelType = 'html';
          edgeData.label = '<span class="edgeLabel">' + edge.text + '</span>';
        } else {
          edgeData.labelType = 'text';
          edgeData.style = 'stroke: #333; stroke-width: 1.5px;fill:none';
          edgeData.label = edge.text.replace(/<br>/g, '\n');
        }
      } else {
        edgeData.label = edge.text.replace(/<br>/g, '\n');
      }
    }
    // Add the edge to the graph
    g.setEdge(edge.start, edge.end, edgeData, cnt);
  });
};

/**
 * Returns the all the styles from classDef statements in the graph definition.
 * @returns {object} classDef styles
 */
exports.getClasses = function (text, isDot) {
  var parser;
  graph.clear();
  if (isDot) {
    parser = dot.parser;
  } else {
    parser = flow.parser;
  }
  parser.yy = graph;

  // Parse the graph definition
  parser.parse(text);

  var classes = graph.getClasses

  // Add default class if undefined
  ();if (typeof classes.default === 'undefined') {
    classes.default = { id: 'default' };
    classes.default.styles = [];
    classes.default.clusterStyles = ['rx:4px', 'fill: rgb(255, 255, 222)', 'rx: 4px', 'stroke: rgb(170, 170, 51)', 'stroke-width: 1px'];
    classes.default.nodeLabelStyles = ['fill:#000', 'stroke:none', 'font-weight:300', 'font-family:"Helvetica Neue",Helvetica,Arial,sans-serf', 'font-size:14px'];
    classes.default.edgeLabelStyles = ['fill:#000', 'stroke:none', 'font-weight:300', 'font-family:"Helvetica Neue",Helvetica,Arial,sans-serf', 'font-size:14px'];
  }
  return classes;
};

/**
 * Draws a flowchart in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
exports.draw = function (text, id, isDot) {
  log.debug('Drawing flowchart');
  var parser;
  graph.clear();
  if (isDot) {
    parser = dot.parser;
  } else {
    parser = flow.parser;
  }
  parser.yy = graph;

  // Parse the graph definition
  try {
    parser.parse(text);
  } catch (err) {
    log.debug('Parsing failed');
  }

  // Fetch the default direction, use TD if none was found
  var dir;
  dir = graph.getDirection();
  if (typeof dir === 'undefined') {
    dir = 'TD';
  }

  // Create the input mermaid.graph
  var g = new dagreD3.graphlib.Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: dir,
    marginx: 20,
    marginy: 20

  }).setDefaultEdgeLabel(function () {
    return {};
  });

  var subG;
  var subGraphs = graph.getSubGraphs();
  var i = 0;
  for (i = subGraphs.length - 1; i >= 0; i--) {
    subG = subGraphs[i];
    graph.addVertex(subG.id, subG.title, 'group', undefined);
  }

  // Fetch the verices/nodes and edges/links from the parsed graph definition
  var vert = graph.getVertices();

  var edges = graph.getEdges();

  i = 0;
  var j;
  for (i = subGraphs.length - 1; i >= 0; i--) {
    subG = subGraphs[i];

    d3.selectAll('cluster').append('text');

    for (j = 0; j < subG.nodes.length; j++) {
      g.setParent(subG.nodes[j], subG.id);
    }
  }
  exports.addVertices(vert, g);
  exports.addEdges(edges, g

  // Create the renderer
  );var Render = dagreD3.render;
  var render = new Render();

  // Add custom shape for rhombus type of boc (decision)
  render.shapes().question = function (parent, bbox, node) {
    var w = bbox.width;
    var h = bbox.height;
    var s = (w + h) * 0.8;
    var points = [{ x: s / 2, y: 0 }, { x: s, y: -s / 2 }, { x: s / 2, y: -s }, { x: 0, y: -s / 2 }];
    var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (d) {
      return d.x + ',' + d.y;
    }).join(' ')).attr('rx', 5).attr('ry', 5).attr('transform', 'translate(' + -s / 2 + ',' + s * 2 / 4 + ')');
    node.intersect = function (point) {
      return dagreD3.intersect.polygon(node, points, point);
    };
    return shapeSvg;
  };

  // Add custom shape for box with inverted arrow on left side
  render.shapes().rect_left_inv_arrow = function (parent, bbox, node) {
    var w = bbox.width;
    var h = bbox.height;
    var points = [{ x: -h / 2, y: 0 }, { x: w, y: 0 }, { x: w, y: -h }, { x: -h / 2, y: -h }, { x: 0, y: -h / 2 }];
    var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (d) {
      return d.x + ',' + d.y;
    }).join(' ')).attr('transform', 'translate(' + -w / 2 + ',' + h * 2 / 4 + ')');
    node.intersect = function (point) {
      return dagreD3.intersect.polygon(node, points, point);
    };
    return shapeSvg;
  };

  // Add custom shape for box with inverted arrow on right side
  render.shapes().rect_right_inv_arrow = function (parent, bbox, node) {
    var w = bbox.width;
    var h = bbox.height;
    var points = [{ x: 0, y: 0 }, { x: w + h / 2, y: 0 }, { x: w, y: -h / 2 }, { x: w + h / 2, y: -h }, { x: 0, y: -h }];
    var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (d) {
      return d.x + ',' + d.y;
    }).join(' ')).attr('transform', 'translate(' + -w / 2 + ',' + h * 2 / 4 + ')');
    node.intersect = function (point) {
      return dagreD3.intersect.polygon(node, points, point);
    };
    return shapeSvg;
  };

  // Add our custom arrow - an empty arrowhead
  render.arrows().none = function normal(parent, id, edge, type) {
    var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

    var path = marker.append('path').attr('d', 'M 0 0 L 0 0 L 0 0 z');
    dagreD3.util.applyStyle(path, edge[type + 'Style']);
  };

  // Override normal arrowhead defined in d3. Remove style & add class to allow css styling.
  render.arrows().normal = function normal(parent, id, edge, type) {
    var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

    marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('class', 'arrowheadPath').style('stroke-width', 1).style('stroke-dasharray', '1,0');
  };

  // Set up an SVG group so that we can translate the final graph.
  var svg = d3.select('#' + id

  // Run the renderer. This is what draws the final graph.
  );var element = d3.select('#' + id + ' g');
  render(element, g);

  element.selectAll('g.node').attr('title', function () {
    return graph.getTooltip(this.id);
  });

  if (conf.useMaxWidth) {
    // Center the graph
    svg.attr('height', '100%');
    svg.attr('width', conf.width);
    svg.attr('viewBox', '0 0 ' + (g.graph().width + 20) + ' ' + (g.graph().height + 20));
    svg.attr('style', 'max-width:' + (g.graph().width + 20) + 'px;');
  } else {
    // Center the graph
    svg.attr('height', g.graph().height);
    if (typeof conf.width === 'undefined') {
      svg.attr('width', g.graph().width);
    } else {
      svg.attr('width', conf.width);
    }
    svg.attr('viewBox', '0 0 ' + (g.graph().width + 20) + ' ' + (g.graph().height + 20));
  }

  // Index nodes
  graph.indexNodes('subGraph' + i);

  for (i = 0; i < subGraphs.length; i++) {
    subG = subGraphs[i];

    if (subG.title !== 'undefined') {
      var clusterRects = document.querySelectorAll('#' + id + ' #' + subG.id + ' rect');
      var clusterEl = document.querySelectorAll('#' + id + ' #' + subG.id);

      var xPos = clusterRects[0].x.baseVal.value;
      var yPos = clusterRects[0].y.baseVal.value;
      var width = clusterRects[0].width.baseVal.value;
      var cluster = d3.select(clusterEl[0]);
      var te = cluster.append('text');
      te.attr('x', xPos + width / 2);
      te.attr('y', yPos + 14);
      te.attr('fill', 'black');
      te.attr('stroke', 'none');
      te.attr('id', id + 'Text');
      te.style('text-anchor', 'middle');

      if (typeof subG.title === 'undefined') {
        te.text('Undef');
      } else {
        te.text(subG.title);
      }
    }
  }

  // Add label rects for non html labels
  if (!conf.htmlLabels) {
    var labels = document.querySelectorAll('#' + id + ' .edgeLabel .label');
    var k;
    for (k = 0; k < labels.length; k++) {
      var label = labels[i];

      // Get dimensions of label
      var dim = label.getBBox();

      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('rx', 0);
      rect.setAttribute('ry', 0);
      rect.setAttribute('width', dim.width);
      rect.setAttribute('height', dim.height);
      rect.setAttribute('style', 'fill:#e8e8e8;');

      label.insertBefore(rect, label.firstChild);
    }
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var gantt = __webpack_require__(13).parser;
gantt.yy = __webpack_require__(12);
var d3 = __webpack_require__(1);
var moment = __webpack_require__(20);

var daysInChart;
var conf = {
  titleTopMargin: 25,
  barHeight: 20,
  barGap: 4,
  topPadding: 50,
  rightPadding: 75,
  leftPadding: 75,
  gridLineStartPadding: 35,
  fontSize: 11,
  fontFamily: '"Open-Sans", "sans-serif"'
};
module.exports.setConf = function (cnf) {
  var keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};
var w;
module.exports.draw = function (text, id) {
  gantt.yy.clear();
  gantt.parse(text);

  var elem = document.getElementById(id);
  w = elem.parentElement.offsetWidth;

  if (typeof w === 'undefined') {
    w = 1200;
  }

  if (typeof conf.useWidth !== 'undefined') {
    w = conf.useWidth;
  }

  var taskArray = gantt.yy.getTasks

  // Set height based on number of tasks
  ();var h = taskArray.length * (conf.barHeight + conf.barGap) + 2 * conf.topPadding;

  elem.setAttribute('height', '100%'
  // Set viewBox
  );elem.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  var svg = d3.select('#' + id);

  var startDate = d3.min(taskArray, function (d) {
    return d.startTime;
  });
  var endDate = d3.max(taskArray, function (d) {
    return d.endTime;
  }

  // Set timescale
  );var timeScale = d3.time.scale().domain([d3.min(taskArray, function (d) {
    return d.startTime;
  }), d3.max(taskArray, function (d) {
    return d.endTime;
  })]).rangeRound([0, w - conf.leftPadding - conf.rightPadding]);

  var categories = [];

  daysInChart = moment.duration(endDate - startDate).asDays();

  for (var i = 0; i < taskArray.length; i++) {
    categories.push(taskArray[i].type);
  }

  var catsUnfiltered = categories; // for vert labels

  categories = checkUnique(categories);

  makeGant(taskArray, w, h);
  if (typeof conf.useWidth !== 'undefined') {
    elem.setAttribute('width', w);
  }

  svg.append('text').text(gantt.yy.getTitle()).attr('x', w / 2).attr('y', conf.titleTopMargin).attr('class', 'titleText');

  function makeGant(tasks, pageWidth, pageHeight) {
    var barHeight = conf.barHeight;
    var gap = barHeight + conf.barGap;
    var topPadding = conf.topPadding;
    var leftPadding = conf.leftPadding;

    var colorScale = d3.scale.linear().domain([0, categories.length]).range(['#00B9FA', '#F95002']).interpolate(d3.interpolateHcl);

    makeGrid(leftPadding, topPadding, pageWidth, pageHeight);
    drawRects(tasks, gap, topPadding, leftPadding, barHeight, colorScale, pageWidth, pageHeight);
    vertLabels(gap, topPadding, leftPadding, barHeight, colorScale);
    drawToday(leftPadding, topPadding, pageWidth, pageHeight);
  }

  function drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h) {
    svg.append('g').selectAll('rect').data(theArray).enter().append('rect').attr('x', 0).attr('y', function (d, i) {
      return i * theGap + theTopPad - 2;
    }).attr('width', function () {
      return w - conf.rightPadding / 2;
    }).attr('height', theGap).attr('class', function (d) {
      for (var i = 0; i < categories.length; i++) {
        if (d.type === categories[i]) {
          return 'section section' + i % conf.numberSectionStyles;
        }
      }
      return 'section section0';
    });

    var rectangles = svg.append('g').selectAll('rect').data(theArray).enter();

    rectangles.append('rect').attr('rx', 3).attr('ry', 3).attr('x', function (d) {
      return timeScale(d.startTime) + theSidePad;
    }).attr('y', function (d, i) {
      return i * theGap + theTopPad;
    }).attr('width', function (d) {
      return timeScale(d.endTime) - timeScale(d.startTime);
    }).attr('height', theBarHeight).attr('class', function (d) {
      var res = 'task ';

      var secNum = 0;
      for (var i = 0; i < categories.length; i++) {
        if (d.type === categories[i]) {
          secNum = i % conf.numberSectionStyles;
        }
      }

      if (d.active) {
        if (d.crit) {
          return res + ' activeCrit' + secNum;
        } else {
          return res + ' active' + secNum;
        }
      }

      if (d.done) {
        if (d.crit) {
          return res + ' doneCrit' + secNum;
        } else {
          return res + ' done' + secNum;
        }
      }

      if (d.crit) {
        return res + ' crit' + secNum;
      }

      return res + ' task' + secNum;
    });

    rectangles.append('text').text(function (d) {
      return d.task;
    }).attr('font-size', conf.fontSize).attr('x', function (d) {
      var startX = timeScale(d.startTime);
      var endX = timeScale(d.endTime);
      var textWidth = this.getBBox().width;

      // Check id text width > width of rectangle
      if (textWidth > endX - startX) {
        if (endX + textWidth + 1.5 * conf.leftPadding > w) {
          return startX + theSidePad - 5;
        } else {
          return endX + theSidePad + 5;
        }
      } else {
        return (endX - startX) / 2 + startX + theSidePad;
      }
    }).attr('y', function (d, i) {
      return i * theGap + conf.barHeight / 2 + (conf.fontSize / 2 - 2) + theTopPad;
    }).attr('text-height', theBarHeight).attr('class', function (d) {
      var startX = timeScale(d.startTime);
      var endX = timeScale(d.endTime);
      var textWidth = this.getBBox().width;
      var secNum = 0;
      for (var i = 0; i < categories.length; i++) {
        if (d.type === categories[i]) {
          secNum = i % conf.numberSectionStyles;
        }
      }

      var taskType = '';
      if (d.active) {
        if (d.crit) {
          taskType = 'activeCritText' + secNum;
        } else {
          taskType = 'activeText' + secNum;
        }
      }

      if (d.done) {
        if (d.crit) {
          taskType = taskType + ' doneCritText' + secNum;
        } else {
          taskType = taskType + ' doneText' + secNum;
        }
      } else {
        if (d.crit) {
          taskType = taskType + ' critText' + secNum;
        }
      }

      // Check id text width > width of rectangle
      if (textWidth > endX - startX) {
        if (endX + textWidth + 1.5 * conf.leftPadding > w) {
          return 'taskTextOutsideLeft taskTextOutside' + secNum + ' ' + taskType;
        } else {
          return 'taskTextOutsideRight taskTextOutside' + secNum + ' ' + taskType;
        }
      } else {
        return 'taskText taskText' + secNum + ' ' + taskType;
      }
    });
  }

  function makeGrid(theSidePad, theTopPad, w, h) {
    var pre = [['.%L', function (d) {
      return d.getMilliseconds();
    }], [':%S', function (d) {
      return d.getSeconds();
    }],
    // Within a hour
    ['h1 %I:%M', function (d) {
      return d.getMinutes();
    }]];
    var post = [['%Y', function () {
      return true;
    }]];

    var mid = [
    // Within a day
    ['%I:%M', function (d) {
      return d.getHours();
    }],
    // Day within a week (not monday)
    ['%a %d', function (d) {
      return d.getDay() && d.getDate() !== 1;
    }],
    // within a month
    ['%b %d', function (d) {
      return d.getDate() !== 1;
    }],
    // Month
    ['%B', function (d) {
      return d.getMonth();
    }]];
    var formatter;
    if (typeof conf.axisFormatter !== 'undefined') {
      mid = [];
      conf.axisFormatter.forEach(function (item) {
        var n = [];
        n[0] = item[0];
        n[1] = item[1];
        mid.push(n);
      });
    }
    formatter = pre.concat(mid).concat(post);

    var xAxis = d3.svg.axis().scale(timeScale).orient('bottom').tickSize(-h + theTopPad + conf.gridLineStartPadding, 0, 0).tickFormat(d3.time.format.multi(formatter));

    if (daysInChart > 7 && daysInChart < 230) {
      xAxis = xAxis.ticks(d3.time.monday.range);
    }

    svg.append('g').attr('class', 'grid').attr('transform', 'translate(' + theSidePad + ', ' + (h - 50) + ')').call(xAxis).selectAll('text').style('text-anchor', 'middle').attr('fill', '#000').attr('stroke', 'none').attr('font-size', 10).attr('dy', '1em');
  }

  function vertLabels(theGap, theTopPad) {
    var numOccurances = [];
    var prevGap = 0;

    for (var i = 0; i < categories.length; i++) {
      numOccurances[i] = [categories[i], getCount(categories[i], catsUnfiltered)];
    }

    svg.append('g' // without doing this, impossible to put grid lines behind text
    ).selectAll('text').data(numOccurances).enter().append('text').text(function (d) {
      return d[0];
    }).attr('x', 10).attr('y', function (d, i) {
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          prevGap += numOccurances[i - 1][1];
          return d[1] * theGap / 2 + prevGap * theGap + theTopPad;
        }
      } else {
        return d[1] * theGap / 2 + theTopPad;
      }
    }).attr('class', function (d) {
      for (var i = 0; i < categories.length; i++) {
        if (d[0] === categories[i]) {
          return 'sectionTitle sectionTitle' + i % conf.numberSectionStyles;
        }
      }
      return 'sectionTitle';
    });
  }

  function drawToday(theSidePad, theTopPad, w, h) {
    var todayG = svg.append('g').attr('class', 'today');

    var today = new Date();

    todayG.append('line').attr('x1', timeScale(today) + theSidePad).attr('x2', timeScale(today) + theSidePad).attr('y1', conf.titleTopMargin).attr('y2', h - conf.titleTopMargin).attr('class', 'today');
  }

  // from this stackexchange question: http://stackoverflow.com/questions/1890203/unique-for-arrays-in-javascript
  function checkUnique(arr) {
    var hash = {};
    var result = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
      if (!hash.hasOwnProperty(arr[i])) {
        // it works with objects! in FF, at least
        hash[arr[i]] = true;
        result.push(arr[i]);
      }
    }
    return result;
  }

  // from this stackexchange question: http://stackoverflow.com/questions/14227981/count-how-many-strings-in-an-array-have-duplicates-in-the-same-array
  function getCounts(arr) {
    var i = arr.length; // var to loop over
    var obj = {}; // obj to store results
    while (i) {
      obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
    }
    return obj;
  }

  // get specific from everything
  function getCount(word, arr) {
    return getCounts(arr)[word] || 0;
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const db = __webpack_require__(14);
const _ = __webpack_require__(19);
const gitGraphParser = __webpack_require__(15);
const d3 = __webpack_require__(1);
const Logger = __webpack_require__(0);
const log = Logger.Log;

var allCommitsDict = {};
var branchNum;
var config = {
  nodeSpacing: 150,
  nodeFillColor: 'yellow',
  nodeStrokeWidth: 2,
  nodeStrokeColor: 'grey',
  lineStrokeWidth: 4,
  branchOffset: 50,
  lineColor: 'grey',
  leftMargin: 50,
  branchColors: ['#442f74', '#983351', '#609732', '#AA9A39'],
  nodeRadius: 10,
  nodeLabel: {
    width: 75,
    height: 100,
    x: -25,
    y: 0
  }
};
var apiConfig = {};
exports.setConf = function (c) {
  apiConfig = c;
};

function svgCreateDefs(svg) {
  svg.append('defs').append('g').attr('id', 'def-commit').append('circle').attr('r', config.nodeRadius).attr('cx', 0).attr('cy', 0);
  svg.select('#def-commit').append('foreignObject').attr('width', config.nodeLabel.width).attr('height', config.nodeLabel.height).attr('x', config.nodeLabel.x).attr('y', config.nodeLabel.y).attr('class', 'node-label').attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility').append('xhtml:p').html('');
}

function svgDrawLine(svg, points, colorIdx, interpolate) {
  interpolate = interpolate || 'basis';
  var color = config.branchColors[colorIdx % config.branchColors.length];
  var lineGen = d3.svg.line().x(function (d) {
    return Math.round(d.x);
  }).y(function (d) {
    return Math.round(d.y);
  }).interpolate(interpolate);

  svg.append('svg:path').attr('d', lineGen(points)).style('stroke', color).style('stroke-width', config.lineStrokeWidth).style('fill', 'none');
}
// Pass in the element and its pre-transform coords
function getElementCoords(element, coords) {
  coords = coords || element.node().getBBox();
  var ctm = element.node().getCTM();
  var xn = ctm.e + coords.x * ctm.a;
  var yn = ctm.f + coords.y * ctm.d;
  return {
    left: xn,
    top: yn,
    width: coords.width,
    height: coords.height
  };
}

function svgDrawLineForCommits(svg, fromId, toId, direction, color) {
  log.debug('svgDrawLineForCommits: ', fromId, toId);
  var fromBbox = getElementCoords(svg.select('#node-' + fromId + ' circle'));
  var toBbox = getElementCoords(svg.select('#node-' + toId + ' circle'));
  switch (direction) {
    case 'LR':
      // (toBbox)
      //  +--------
      //          + (fromBbox)
      if (fromBbox.left - toBbox.left > config.nodeSpacing) {
        var lineStart = { x: fromBbox.left - config.nodeSpacing, y: toBbox.top + toBbox.height / 2 };
        var lineEnd = { x: toBbox.left + toBbox.width, y: toBbox.top + toBbox.height / 2 };
        svgDrawLine(svg, [lineStart, lineEnd], color, 'linear');
        svgDrawLine(svg, [{ x: fromBbox.left, y: fromBbox.top + fromBbox.height / 2 }, { x: fromBbox.left - config.nodeSpacing / 2, y: fromBbox.top + fromBbox.height / 2 }, { x: fromBbox.left - config.nodeSpacing / 2, y: lineStart.y }, lineStart], color);
      } else {
        svgDrawLine(svg, [{
          'x': fromBbox.left,
          'y': fromBbox.top + fromBbox.height / 2
        }, {
          'x': fromBbox.left - config.nodeSpacing / 2,
          'y': fromBbox.top + fromBbox.height / 2
        }, {
          'x': fromBbox.left - config.nodeSpacing / 2,
          'y': toBbox.top + toBbox.height / 2
        }, {
          'x': toBbox.left + toBbox.width,
          'y': toBbox.top + toBbox.height / 2
        }], color);
      }
      break;
    case 'BT':
      //      +           (fromBbox)
      //      |
      //      |
      //              +   (toBbox)
      if (toBbox.top - fromBbox.top > config.nodeSpacing) {
        lineStart = { x: toBbox.left + toBbox.width / 2, y: fromBbox.top + fromBbox.height + config.nodeSpacing };
        lineEnd = { x: toBbox.left + toBbox.width / 2, y: toBbox.top };
        svgDrawLine(svg, [lineStart, lineEnd], color, 'linear');
        svgDrawLine(svg, [{ x: fromBbox.left + fromBbox.width / 2, y: fromBbox.top + fromBbox.height }, { x: fromBbox.left + fromBbox.width / 2, y: fromBbox.top + fromBbox.height + config.nodeSpacing / 2 }, { x: toBbox.left + toBbox.width / 2, y: lineStart.y - config.nodeSpacing / 2 }, lineStart], color);
      } else {
        svgDrawLine(svg, [{
          'x': fromBbox.left + fromBbox.width / 2,
          'y': fromBbox.top + fromBbox.height
        }, {
          'x': fromBbox.left + fromBbox.width / 2,
          'y': fromBbox.top + config.nodeSpacing / 2
        }, {
          'x': toBbox.left + toBbox.width / 2,
          'y': toBbox.top - config.nodeSpacing / 2
        }, {
          'x': toBbox.left + toBbox.width / 2,
          'y': toBbox.top
        }], color);
      }
      break;
  }
}

function cloneNode(svg, selector) {
  return svg.select(selector).node().cloneNode(true);
}

function renderCommitHistory(svg, commitid, branches, direction) {
  var commit;
  var numCommits = Object.keys(allCommitsDict).length;
  if (_.isString(commitid)) {
    do {
      commit = allCommitsDict[commitid];
      log.debug('in renderCommitHistory', commit.id, commit.seq);
      if (svg.select('#node-' + commitid).size() > 0) {
        return;
      }
      svg.append(function () {
        return cloneNode(svg, '#def-commit');
      }).attr('class', 'commit').attr('id', function () {
        return 'node-' + commit.id;
      }).attr('transform', function () {
        switch (direction) {
          case 'LR':
            return 'translate(' + (commit.seq * config.nodeSpacing + config.leftMargin) + ', ' + branchNum * config.branchOffset + ')';
          case 'BT':
            return 'translate(' + (branchNum * config.branchOffset + config.leftMargin) + ', ' + (numCommits - commit.seq) * config.nodeSpacing + ')';
        }
      }).attr('fill', config.nodeFillColor).attr('stroke', config.nodeStrokeColor).attr('stroke-width', config.nodeStrokeWidth);

      var branch = _.find(branches, ['commit', commit]);
      if (branch) {
        log.debug('found branch ', branch.name);
        svg.select('#node-' + commit.id + ' p').append('xhtml:span').attr('class', 'branch-label').text(branch.name + ', ');
      }
      svg.select('#node-' + commit.id + ' p').append('xhtml:span').attr('class', 'commit-id').text(commit.id);
      if (commit.message !== '' && direction === 'BT') {
        svg.select('#node-' + commit.id + ' p').append('xhtml:span').attr('class', 'commit-msg').text(', ' + commit.message);
      }
      commitid = commit.parent;
    } while (commitid && allCommitsDict[commitid]);
  }

  if (_.isArray(commitid)) {
    log.debug('found merge commmit', commitid);
    renderCommitHistory(svg, commitid[0], branches, direction);
    branchNum++;
    renderCommitHistory(svg, commitid[1], branches, direction);
    branchNum--;
  }
}

function renderLines(svg, commit, direction, branchColor) {
  branchColor = branchColor || 0;
  while (commit.seq > 0 && !commit.lineDrawn) {
    if (_.isString(commit.parent)) {
      svgDrawLineForCommits(svg, commit.id, commit.parent, direction, branchColor);
      commit.lineDrawn = true;
      commit = allCommitsDict[commit.parent];
    } else if (_.isArray(commit.parent)) {
      svgDrawLineForCommits(svg, commit.id, commit.parent[0], direction, branchColor);
      svgDrawLineForCommits(svg, commit.id, commit.parent[1], direction, branchColor + 1);
      renderLines(svg, allCommitsDict[commit.parent[1]], direction, branchColor + 1);
      commit.lineDrawn = true;
      commit = allCommitsDict[commit.parent[0]];
    }
  }
}

exports.draw = function (txt, id, ver) {
  try {
    var parser;
    parser = gitGraphParser.parser;
    parser.yy = db;

    log.debug('in gitgraph renderer', txt, id, ver
    // Parse the graph definition
    );parser.parse(txt + '\n');

    config = _.extend(config, apiConfig, db.getOptions());
    log.debug('effective options', config);
    var direction = db.getDirection();
    allCommitsDict = db.getCommits();
    var branches = db.getBranchesAsObjArray();
    if (direction === 'BT') {
      config.nodeLabel.x = branches.length * config.branchOffset;
      config.nodeLabel.width = '100%';
      config.nodeLabel.y = -1 * 2 * config.nodeRadius;
    }
    var svg = d3.select('#' + id);
    svgCreateDefs(svg);
    branchNum = 1;
    _.each(branches, function (v) {
      renderCommitHistory(svg, v.commit.id, branches, direction);
      renderLines(svg, v.commit, direction);
      branchNum++;
    });
    svg.attr('height', function () {
      if (direction === 'BT') return Object.keys(allCommitsDict).length * config.nodeSpacing;
      return (branches.length + 1) * config.branchOffset;
    });
  } catch (e) {
    log.error('Error while rendering gitgraph');
    log.error(e.message);
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-11-23.
 */

var sq = __webpack_require__(16).parser;
sq.yy = __webpack_require__(17);
var svgDraw = __webpack_require__(28);
var d3 = __webpack_require__(1);
var Logger = __webpack_require__(0);
var log = Logger.Log;

var conf = {

  diagramMarginX: 50,
  diagramMarginY: 30,
  // Margin between actors
  actorMargin: 50,
  // Width of actor boxes
  width: 150,
  // Height of actor boxes
  height: 65,
  // Margin around loop boxes
  boxMargin: 10,
  boxTextMargin: 5,
  noteMargin: 10,
  // Space between messages
  messageMargin: 35,
  // mirror actors under diagram
  mirrorActors: false,
  // Depending on css styling this might need adjustment
  // Prolongs the edge of the diagram downwards
  bottomMarginAdj: 1,

  // width of activation box
  activationWidth: 10,

  // text placement as: tspan | fo | old only text as before
  textPlacement: 'tspan'
};

exports.bounds = {
  data: {
    startx: undefined,
    stopx: undefined,
    starty: undefined,
    stopy: undefined
  },
  verticalPos: 0,

  sequenceItems: [],
  activations: [],
  init: function () {
    this.sequenceItems = [];
    this.activations = [];
    this.data = {
      startx: undefined,
      stopx: undefined,
      starty: undefined,
      stopy: undefined
    };
    this.verticalPos = 0;
  },
  updateVal: function (obj, key, val, fun) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = val;
    } else {
      obj[key] = fun(val, obj[key]);
    }
  },
  updateBounds: function (startx, starty, stopx, stopy) {
    var _self = this;
    var cnt = 0;
    function updateFn(type) {
      return function updateItemBounds(item) {
        cnt++;
        // The loop sequenceItems is a stack so the biggest margins in the beginning of the sequenceItems
        var n = _self.sequenceItems.length - cnt + 1;

        _self.updateVal(item, 'starty', starty - n * conf.boxMargin, Math.min);
        _self.updateVal(item, 'stopy', stopy + n * conf.boxMargin, Math.max);

        _self.updateVal(exports.bounds.data, 'startx', startx - n * conf.boxMargin, Math.min);
        _self.updateVal(exports.bounds.data, 'stopx', stopx + n * conf.boxMargin, Math.max);

        if (!(type === 'activation')) {
          _self.updateVal(item, 'startx', startx - n * conf.boxMargin, Math.min);
          _self.updateVal(item, 'stopx', stopx + n * conf.boxMargin, Math.max);

          _self.updateVal(exports.bounds.data, 'starty', starty - n * conf.boxMargin, Math.min);
          _self.updateVal(exports.bounds.data, 'stopy', stopy + n * conf.boxMargin, Math.max);
        }
      };
    }

    this.sequenceItems.forEach(updateFn());
    this.activations.forEach(updateFn('activation'));
  },
  insert: function (startx, starty, stopx, stopy) {
    var _startx, _starty, _stopx, _stopy;

    _startx = Math.min(startx, stopx);
    _stopx = Math.max(startx, stopx);
    _starty = Math.min(starty, stopy);
    _stopy = Math.max(starty, stopy);

    this.updateVal(exports.bounds.data, 'startx', _startx, Math.min);
    this.updateVal(exports.bounds.data, 'starty', _starty, Math.min);
    this.updateVal(exports.bounds.data, 'stopx', _stopx, Math.max);
    this.updateVal(exports.bounds.data, 'stopy', _stopy, Math.max);

    this.updateBounds(_startx, _starty, _stopx, _stopy);
  },
  newActivation: function (message, diagram) {
    var actorRect = sq.yy.getActors()[message.from.actor];
    var stackedSize = actorActivations(message.from.actor).length;
    var x = actorRect.x + conf.width / 2 + (stackedSize - 1) * conf.activationWidth / 2;
    this.activations.push({
      startx: x,
      starty: this.verticalPos + 2,
      stopx: x + conf.activationWidth,
      stopy: undefined,
      actor: message.from.actor,
      anchored: svgDraw.anchorElement(diagram)
    });
  },
  endActivation: function (message) {
    // find most recent activation for given actor
    var lastActorActivationIdx = this.activations.map(function (activation) {
      return activation.actor;
    }).lastIndexOf(message.from.actor);
    var activation = this.activations.splice(lastActorActivationIdx, 1)[0];
    return activation;
  },
  newLoop: function (title) {
    this.sequenceItems.push({ startx: undefined, starty: this.verticalPos, stopx: undefined, stopy: undefined, title: title });
  },
  endLoop: function () {
    var loop = this.sequenceItems.pop();
    return loop;
  },
  addSectionToLoop: function (message) {
    var loop = this.sequenceItems.pop();
    loop.sections = loop.sections || [];
    loop.sectionTitles = loop.sectionTitles || [];
    loop.sections.push(exports.bounds.getVerticalPos());
    loop.sectionTitles.push(message);
    this.sequenceItems.push(loop);
  },
  bumpVerticalPos: function (bump) {
    this.verticalPos = this.verticalPos + bump;
    this.data.stopy = this.verticalPos;
  },
  getVerticalPos: function () {
    return this.verticalPos;
  },
  getBounds: function () {
    return this.data;
  }

  /**
   * Draws an actor in the diagram with the attaced line
   * @param center - The center of the the actor
   * @param pos The position if the actor in the liost of actors
   * @param description The text in the box
   */
};var drawNote = function (elem, startx, verticalPos, msg, forceWidth) {
  var rect = svgDraw.getNoteRect();
  rect.x = startx;
  rect.y = verticalPos;
  rect.width = forceWidth || conf.width;
  rect.class = 'note';

  var g = elem.append('g');
  var rectElem = svgDraw.drawRect(g, rect);

  var textObj = svgDraw.getTextObj();
  textObj.x = startx - 4;
  textObj.y = verticalPos - 13;
  textObj.textMargin = conf.noteMargin;
  textObj.dy = '1em';
  textObj.text = msg.message;
  textObj.class = 'noteText';

  var textElem = svgDraw.drawText(g, textObj, rect.width - conf.noteMargin);

  var textHeight = textElem[0][0].getBBox().height;
  if (!forceWidth && textHeight > conf.width) {
    textElem.remove();
    g = elem.append('g');

    textElem = svgDraw.drawText(g, textObj, 2 * rect.width - conf.noteMargin);
    textHeight = textElem[0][0].getBBox().height;
    rectElem.attr('width', 2 * rect.width);
    exports.bounds.insert(startx, verticalPos, startx + 2 * rect.width, verticalPos + 2 * conf.noteMargin + textHeight);
  } else {
    exports.bounds.insert(startx, verticalPos, startx + rect.width, verticalPos + 2 * conf.noteMargin + textHeight);
  }

  rectElem.attr('height', textHeight + 2 * conf.noteMargin);
  exports.bounds.bumpVerticalPos(textHeight + 2 * conf.noteMargin);
};

/**
 * Draws a message
 * @param elem
 * @param startx
 * @param stopx
 * @param verticalPos
 * @param txtCenter
 * @param msg
 */
var drawMessage = function (elem, startx, stopx, verticalPos, msg) {
  var g = elem.append('g');
  var txtCenter = startx + (stopx - startx) / 2;

  var textElem = g.append('text' // text label for the x axis
  ).attr('x', txtCenter).attr('y', verticalPos - 7).style('text-anchor', 'middle').attr('class', 'messageText').text(msg.message);

  var textWidth;

  if (typeof textElem[0][0].getBBox !== 'undefined') {
    textWidth = textElem[0][0].getBBox().width;
  } else {
    textWidth = textElem[0][0].getBoundingClientRect();
  }

  var line;

  if (startx === stopx) {
    line = g.append('path').attr('d', 'M ' + startx + ',' + verticalPos + ' C ' + (startx + 60) + ',' + (verticalPos - 10) + ' ' + (startx + 60) + ',' + (verticalPos + 30) + ' ' + startx + ',' + (verticalPos + 20));

    exports.bounds.bumpVerticalPos(30);
    var dx = Math.max(textWidth / 2, 100);
    exports.bounds.insert(startx - dx, exports.bounds.getVerticalPos() - 10, stopx + dx, exports.bounds.getVerticalPos());
  } else {
    line = g.append('line');
    line.attr('x1', startx);
    line.attr('y1', verticalPos);
    line.attr('x2', stopx);
    line.attr('y2', verticalPos);
    exports.bounds.insert(startx, exports.bounds.getVerticalPos() - 10, stopx, exports.bounds.getVerticalPos());
  }
  // Make an SVG Container
  // Draw the line
  if (msg.type === sq.yy.LINETYPE.DOTTED || msg.type === sq.yy.LINETYPE.DOTTED_CROSS || msg.type === sq.yy.LINETYPE.DOTTED_OPEN) {
    line.style('stroke-dasharray', '3, 3');
    line.attr('class', 'messageLine1');
  } else {
    line.attr('class', 'messageLine0');
  }

  var url = '';
  if (conf.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, '\\(');
    url = url.replace(/\)/g, '\\)');
  }

  line.attr('stroke-width', 2);
  line.attr('stroke', 'black');
  line.style('fill', 'none' // remove any fill colour
  );if (msg.type === sq.yy.LINETYPE.SOLID || msg.type === sq.yy.LINETYPE.DOTTED) {
    line.attr('marker-end', 'url(' + url + '#arrowhead)');
  }

  if (msg.type === sq.yy.LINETYPE.SOLID_CROSS || msg.type === sq.yy.LINETYPE.DOTTED_CROSS) {
    line.attr('marker-end', 'url(' + url + '#crosshead)');
  }
};

module.exports.drawActors = function (diagram, actors, actorKeys, verticalPos) {
  var i;
  // Draw the actors
  for (i = 0; i < actorKeys.length; i++) {
    var key = actorKeys[i];

    // Add some rendering data to the object
    actors[key].x = i * conf.actorMargin + i * conf.width;
    actors[key].y = verticalPos;
    actors[key].width = conf.diagramMarginX;
    actors[key].height = conf.diagramMarginY;

    // Draw the box with the attached line
    svgDraw.drawActor(diagram, actors[key].x, verticalPos, actors[key].description, conf);
    exports.bounds.insert(actors[key].x, verticalPos, actors[key].x + conf.width, conf.height);
  }

  // Add a margin between the actor boxes and the first arrow
  exports.bounds.bumpVerticalPos(conf.height);
};

module.exports.setConf = function (cnf) {
  var keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};

var actorActivations = function (actor) {
  return module.exports.bounds.activations.filter(function (activation) {
    return activation.actor === actor;
  });
};

var actorFlowVerticaBounds = function (actor) {
  // handle multiple stacked activations for same actor
  var actors = sq.yy.getActors();
  var activations = actorActivations(actor);

  var left = activations.reduce(function (acc, activation) {
    return Math.min(acc, activation.startx);
  }, actors[actor].x + conf.width / 2);
  var right = activations.reduce(function (acc, activation) {
    return Math.max(acc, activation.stopx);
  }, actors[actor].x + conf.width / 2);
  return [left, right];
};

/**
 * Draws a flowchart in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
module.exports.draw = function (text, id) {
  sq.yy.clear();
  sq.parse(text + '\n');

  exports.bounds.init();
  var diagram = d3.select('#' + id);

  var startx;
  var stopx;
  var forceWidth;

  // Fetch data from the parsing
  var actors = sq.yy.getActors();
  var actorKeys = sq.yy.getActorKeys();
  var messages = sq.yy.getMessages();
  var title = sq.yy.getTitle();
  module.exports.drawActors(diagram, actors, actorKeys, 0

  // The arrow head definition is attached to the svg once
  );svgDraw.insertArrowHead(diagram);
  svgDraw.insertArrowCrossHead(diagram);

  function activeEnd(msg, verticalPos) {
    var activationData = exports.bounds.endActivation(msg);
    if (activationData.starty + 18 > verticalPos) {
      activationData.starty = verticalPos - 6;
      verticalPos += 12;
    }
    svgDraw.drawActivation(diagram, activationData, verticalPos, conf);

    exports.bounds.insert(activationData.startx, verticalPos - 10, activationData.stopx, verticalPos);
  }

  // var lastMsg

  // Draw the messages/signals
  messages.forEach(function (msg) {
    var loopData;

    switch (msg.type) {
      case sq.yy.LINETYPE.NOTE:
        exports.bounds.bumpVerticalPos(conf.boxMargin);

        startx = actors[msg.from].x;
        stopx = actors[msg.to].x;

        if (msg.placement === sq.yy.PLACEMENT.RIGHTOF) {
          drawNote(diagram, startx + (conf.width + conf.actorMargin) / 2, exports.bounds.getVerticalPos(), msg);
        } else if (msg.placement === sq.yy.PLACEMENT.LEFTOF) {
          drawNote(diagram, startx - (conf.width + conf.actorMargin) / 2, exports.bounds.getVerticalPos(), msg);
        } else if (msg.to === msg.from) {
          // Single-actor over
          drawNote(diagram, startx, exports.bounds.getVerticalPos(), msg);
        } else {
          // Multi-actor over
          forceWidth = Math.abs(startx - stopx) + conf.actorMargin;
          drawNote(diagram, (startx + stopx + conf.width - forceWidth) / 2, exports.bounds.getVerticalPos(), msg, forceWidth);
        }
        break;
      case sq.yy.LINETYPE.ACTIVE_START:
        exports.bounds.newActivation(msg, diagram);
        break;
      case sq.yy.LINETYPE.ACTIVE_END:
        activeEnd(msg, exports.bounds.getVerticalPos());
        break;
      case sq.yy.LINETYPE.LOOP_START:
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        exports.bounds.newLoop(msg.message);
        exports.bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case sq.yy.LINETYPE.LOOP_END:
        loopData = exports.bounds.endLoop();

        svgDraw.drawLoop(diagram, loopData, 'loop', conf);
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case sq.yy.LINETYPE.OPT_START:
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        exports.bounds.newLoop(msg.message);
        exports.bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case sq.yy.LINETYPE.OPT_END:
        loopData = exports.bounds.endLoop();

        svgDraw.drawLoop(diagram, loopData, 'opt', conf);
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case sq.yy.LINETYPE.ALT_START:
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        exports.bounds.newLoop(msg.message);
        exports.bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case sq.yy.LINETYPE.ALT_ELSE:
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        loopData = exports.bounds.addSectionToLoop(msg.message);
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case sq.yy.LINETYPE.ALT_END:
        loopData = exports.bounds.endLoop();

        svgDraw.drawLoop(diagram, loopData, 'alt', conf);
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case sq.yy.LINETYPE.PAR_START:
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        exports.bounds.newLoop(msg.message);
        exports.bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case sq.yy.LINETYPE.PAR_AND:
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        loopData = exports.bounds.addSectionToLoop(msg.message);
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case sq.yy.LINETYPE.PAR_END:
        loopData = exports.bounds.endLoop();
        svgDraw.drawLoop(diagram, loopData, 'par', conf);
        exports.bounds.bumpVerticalPos(conf.boxMargin);
        break;
      default:
        try {
          // lastMsg = msg
          exports.bounds.bumpVerticalPos(conf.messageMargin);
          var fromBounds = actorFlowVerticaBounds(msg.from);
          var toBounds = actorFlowVerticaBounds(msg.to);
          var fromIdx = fromBounds[0] <= toBounds[0] ? 1 : 0;
          var toIdx = fromBounds[0] < toBounds[0] ? 0 : 1;
          startx = fromBounds[fromIdx];
          stopx = toBounds[toIdx];

          var verticalPos = exports.bounds.getVerticalPos();
          drawMessage(diagram, startx, stopx, verticalPos, msg);
          var allBounds = fromBounds.concat(toBounds);
          exports.bounds.insert(Math.min.apply(null, allBounds), verticalPos, Math.max.apply(null, allBounds), verticalPos);
        } catch (e) {
          console.error('error while drawing message', e);
        }
    }
  });

  if (conf.mirrorActors) {
    // Draw actors below diagram
    exports.bounds.bumpVerticalPos(conf.boxMargin * 2);
    module.exports.drawActors(diagram, actors, actorKeys, exports.bounds.getVerticalPos());
  }

  var box = exports.bounds.getBounds

  // Adjust line height of actor lines now that the height of the diagram is known
  ();log.debug('For line height fix Querying: #' + id + ' .actor-line');
  var actorLines = d3.selectAll('#' + id + ' .actor-line');
  actorLines.attr('y2', box.stopy);

  var height = box.stopy - box.starty + 2 * conf.diagramMarginY;

  if (conf.mirrorActors) {
    height = height - conf.boxMargin + conf.bottomMarginAdj;
  }

  var width = box.stopx - box.startx + 2 * conf.diagramMarginX;

  if (title) {
    diagram.append('text').text(title).attr('x', (box.stopx - box.startx) / 2 - 2 * conf.diagramMarginX).attr('y', -25);
  }

  if (conf.useMaxWidth) {
    diagram.attr('height', '100%');
    diagram.attr('width', '100%');
    diagram.attr('style', 'max-width:' + width + 'px;');
  } else {
    diagram.attr('height', height);
    diagram.attr('width', width);
  }
  var extraVertForTitle = title ? 40 : 0;
  diagram.attr('viewBox', box.startx - conf.diagramMarginX + ' -' + (conf.diagramMarginY + extraVertForTitle) + ' ' + width + ' ' + (height + extraVertForTitle));
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {
	"name": "mermaid",
	"version": "7.0.3",
	"description": "Markdownish syntax for generating flowcharts, sequence diagrams, class diagrams, gantt charts and git graphs.",
	"main": "src/mermaid.js",
	"keywords": [
		"diagram",
		"markdown",
		"flowchart",
		"sequence diagram",
		"gantt",
		"class diagram",
		"git graph"
	],
	"bin": {
		"mermaid": "./bin/mermaid.js"
	},
	"scripts": {
		"watch": "yarn build -- --watch",
		"build": "node -r babel-register ./node_modules/.bin/webpack --progress --colors",
		"dist": "node -r babel-register ./node_modules/.bin/webpack --progress --colors -p --config webpack.config.prod.js",
		"upgrade": "rm -rf node_modules && rm yarn.lock && yarn install && ncu -ua && yarn upgrade && yarn remove d3 && yarn add d3@3.5.17",
		"lint": "node_modules/.bin/standard",
		"karma": "node node_modules/karma/bin/karma start karma.conf.js --single-run",
		"tape": "node node_modules/tape/bin/tape test/cli_test-*.js",
		"test": "yarn tape && yarn karma",
		"live": "live-server ./test/examples",
		"jison": "gulp jison_legacy",
		"live_server": "gulp live-server",
		"doc": "rm -r build;rm -r dist/www;gulp vartree;cp dist/www/all.html ../mermaid-pages/index.html;cp dist/mermaid.js ../mermaid-pages/javascripts/lib;cp dist/mermaid.forest.css ../mermaid-pages/stylesheets",
		"pretest": "yarn lint",
		"prepublishOnly": "yarn build && yarn dist && yarn test"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/knsv/mermaid"
	},
	"author": "Knut Sveidqvist",
	"license": "MIT",
	"standard": {
		"ignore": [
			"**/parser/*.js",
			"dist/**/*.js",
			"docs/**/*.js",
			"editor/**/*.js"
		]
	},
	"dependencies": {
		"chalk": "^1.1.3",
		"d3": "3.5.17",
		"dagre": "^0.7.4",
		"dagre-d3-renderer": "0.1.6",
		"he": "^1.1.1",
		"lodash": "^4.17.4",
		"minimist": "^1.2.0",
		"mkdirp": "^0.5.1",
		"moment": "^2.18.1",
		"semver": "^5.3.0",
		"which": "^1.2.14"
	},
	"devDependencies": {
		"async": "^2.4.1",
		"babel-core": "^6.24.1",
		"babel-loader": "^7.0.0",
		"babel-plugin-transform-remove-strict-mode": "^0.0.2",
		"babel-preset-env": "^1.5.1",
		"clone": "^2.1.1",
		"codeclimate-test-reporter": "0.4.1",
		"css-loader": "^0.28.4",
		"dox": "^0.9.0",
		"event-stream": "^3.3.4",
		"extract-text-webpack-plugin": "^2.1.0",
		"front-matter": "^2.1.2",
		"gulp": "~3.9.1",
		"gulp-bower": "0.0.13",
		"gulp-bump": "^2.7.0",
		"gulp-concat": "~2.6.1",
		"gulp-data": "^1.2.1",
		"gulp-dox": "^0.1.6",
		"gulp-ext-replace": "^0.3.0",
		"gulp-filelog": "^0.4.1",
		"gulp-front-matter": "^1.3.0",
		"gulp-hogan": "^2.0.0",
		"gulp-if": "^2.0.2",
		"gulp-insert": "^0.5.0",
		"gulp-istanbul": "^1.1.1",
		"gulp-jasmine": "~2.4.2",
		"gulp-jasmine-browser": "^1.7.1",
		"gulp-jison": "~1.2.0",
		"gulp-less": "^3.3.0",
		"gulp-livereload": "^3.8.1",
		"gulp-marked": "^1.0.0",
		"gulp-mdvars": "^2.0.0",
		"gulp-qunit": "~1.5.0",
		"gulp-rename": "~1.2.2",
		"gulp-shell": "^0.6.3",
		"gulp-tag-version": "^1.3.0",
		"gulp-util": "^3.0.8",
		"gulp-vartree": "^2.0.1",
		"hogan.js": "^3.0.2",
		"inject-loader": "^3.0.0",
		"jasmine": "2.6.0",
		"jasmine-es6": "0.4.0",
		"jison": "^0.4.17",
		"jsdom": "^11.0.0",
		"karma": "^1.7.0",
		"karma-chrome-launcher": "^2.1.1",
		"karma-jasmine": "^1.1.0",
		"karma-webpack": "^2.0.3",
		"less": "^2.7.2",
		"less-loader": "^4.0.4",
		"live-server": "^1.2.0",
		"map-stream": "0.0.7",
		"marked": "^0.3.6",
		"mock-browser": "^0.92.14",
		"npm-check-updates": "^2.11.2",
		"phantomjs-prebuilt": "^2.1.14",
		"require-dir": "^0.3.1",
		"rimraf": "^2.6.1",
		"standard": "^10.0.2",
		"style-loader": "^0.18.1",
		"tape": "^4.6.3",
		"webpack": "^2.6.1",
		"webpack-node-externals": "^1.6.0"
	},
	"files": [
		"bin",
		"dist",
		"lib",
		"src"
	]
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by knut on 14-12-20.
 */
exports.drawRect = function (elem, rectData) {
  var rectElem = elem.append('rect');
  rectElem.attr('x', rectData.x);
  rectElem.attr('y', rectData.y);
  rectElem.attr('fill', rectData.fill);
  rectElem.attr('stroke', rectData.stroke);
  rectElem.attr('width', rectData.width);
  rectElem.attr('height', rectData.height);
  rectElem.attr('rx', rectData.rx);
  rectElem.attr('ry', rectData.ry);

  if (typeof rectData.class !== 'undefined') {
    rectElem.attr('class', rectData.class);
  }

  return rectElem;
};

exports.drawText = function (elem, textData, width) {
  // Remove and ignore br:s
  var nText = textData.text.replace(/<br\/?>/ig, ' ');

  var textElem = elem.append('text');
  textElem.attr('x', textData.x);
  textElem.attr('y', textData.y);
  textElem.style('text-anchor', textData.anchor);
  textElem.attr('fill', textData.fill);
  if (typeof textData.class !== 'undefined') {
    textElem.attr('class', textData.class);
  }

  var span = textElem.append('tspan');
  span.attr('x', textData.x + textData.textMargin * 2);
  span.attr('fill', textData.fill);
  span.text(nText);
  if (typeof textElem.textwrap !== 'undefined') {
    textElem.textwrap({
      x: textData.x, // bounding box is 300 pixels from the left
      y: textData.y, // bounding box is 400 pixels from the top
      width: width, // bounding box is 500 pixels across
      height: 1800 // bounding box is 600 pixels tall
    }, textData.textMargin);
  }

  return textElem;
};

exports.drawLabel = function (elem, txtObject) {
  function genPoints(x, y, width, height, cut) {
    return x + ',' + y + ' ' + (x + width) + ',' + y + ' ' + (x + width) + ',' + (y + height - cut) + ' ' + (x + width - cut * 1.2) + ',' + (y + height) + ' ' + x + ',' + (y + height);
  }
  var polygon = elem.append('polygon');
  polygon.attr('points', genPoints(txtObject.x, txtObject.y, 50, 20, 7));
  polygon.attr('class', 'labelBox');

  txtObject.y = txtObject.y + txtObject.labelMargin;
  txtObject.x = txtObject.x + 0.5 * txtObject.labelMargin;
  exports.drawText(elem, txtObject);
};
var actorCnt = -1;
/**
 * Draws an actor in the diagram with the attaced line
 * @param center - The center of the the actor
 * @param pos The position if the actor in the liost of actors
 * @param description The text in the box
 */
exports.drawActor = function (elem, left, verticalPos, description, conf) {
  var center = left + conf.width / 2;
  var g = elem.append('g');
  if (verticalPos === 0) {
    actorCnt++;
    g.append('line').attr('id', 'actor' + actorCnt).attr('x1', center).attr('y1', 5).attr('x2', center).attr('y2', 2000).attr('class', 'actor-line').attr('stroke-width', '0.5px').attr('stroke', '#999');
  }

  var rect = exports.getNoteRect();
  rect.x = left;
  rect.y = verticalPos;
  rect.fill = '#eaeaea';
  rect.width = conf.width;
  rect.height = conf.height;
  rect.class = 'actor';
  rect.rx = 3;
  rect.ry = 3;
  exports.drawRect(g, rect);

  _drawTextCandidateFunc(conf)(description, g, rect.x, rect.y, rect.width, rect.height, { 'class': 'actor' });
};

exports.anchorElement = function (elem) {
  return elem.append('g');
};
/**
 * Draws an actor in the diagram with the attaced line
 * @param elem - element to append activation rect
 * @param bounds - activation box bounds
 * @param verticalPos - precise y cooridnate of bottom activation box edge
 */
exports.drawActivation = function (elem, bounds, verticalPos) {
  var rect = exports.getNoteRect();
  var g = bounds.anchored;
  rect.x = bounds.startx;
  rect.y = bounds.starty;
  rect.fill = '#f4f4f4';
  rect.width = bounds.stopx - bounds.startx;
  rect.height = verticalPos - bounds.starty;
  exports.drawRect(g, rect);
};

/**
 * Draws an actor in the diagram with the attaced line
 * @param center - The center of the the actor
 * @param pos The position if the actor in the list of actors
 * @param description The text in the box
 */
exports.drawLoop = function (elem, bounds, labelText, conf) {
  var g = elem.append('g');
  var drawLoopLine = function (startx, starty, stopx, stopy) {
    return g.append('line').attr('x1', startx).attr('y1', starty).attr('x2', stopx).attr('y2', stopy).attr('class', 'loopLine');
  };
  drawLoopLine(bounds.startx, bounds.starty, bounds.stopx, bounds.starty);
  drawLoopLine(bounds.stopx, bounds.starty, bounds.stopx, bounds.stopy);
  drawLoopLine(bounds.startx, bounds.stopy, bounds.stopx, bounds.stopy);
  drawLoopLine(bounds.startx, bounds.starty, bounds.startx, bounds.stopy);
  if (typeof bounds.sections !== 'undefined') {
    bounds.sections.forEach(function (item) {
      drawLoopLine(bounds.startx, item, bounds.stopx, item).style('stroke-dasharray', '3, 3');
    });
  }

  var txt = exports.getTextObj();
  txt.text = labelText;
  txt.x = bounds.startx;
  txt.y = bounds.starty;
  txt.labelMargin = 1.5 * 10; // This is the small box that says "loop"
  txt.class = 'labelText'; // Its size & position are fixed.

  exports.drawLabel(g, txt);

  txt = exports.getTextObj();
  txt.text = '[ ' + bounds.title + ' ]';
  txt.x = bounds.startx + (bounds.stopx - bounds.startx) / 2;
  txt.y = bounds.starty + 1.5 * conf.boxMargin;
  txt.anchor = 'middle';
  txt.class = 'loopText';

  exports.drawText(g, txt);

  if (typeof bounds.sectionTitles !== 'undefined') {
    bounds.sectionTitles.forEach(function (item, idx) {
      if (item !== '') {
        txt.text = '[ ' + item + ' ]';
        txt.y = bounds.sections[idx] + 1.5 * conf.boxMargin;
        exports.drawText(g, txt);
      }
    });
  }
};

/**
 * Setup arrow head and define the marker. The result is appended to the svg.
 */
exports.insertArrowHead = function (elem) {
  elem.append('defs').append('marker').attr('id', 'arrowhead').attr('refX', 5).attr('refY', 2).attr('markerWidth', 6).attr('markerHeight', 4).attr('orient', 'auto').append('path').attr('d', 'M 0,0 V 4 L6,2 Z' // this is actual shape for arrowhead
  );
};
/**
 * Setup arrow head and define the marker. The result is appended to the svg.
 */
exports.insertArrowCrossHead = function (elem) {
  var defs = elem.append('defs');
  var marker = defs.append('marker').attr('id', 'crosshead').attr('markerWidth', 15).attr('markerHeight', 8).attr('orient', 'auto').attr('refX', 16).attr('refY', 4

  // The arrow
  );marker.append('path').attr('fill', 'black').attr('stroke', '#000000').style('stroke-dasharray', '0, 0').attr('stroke-width', '1px').attr('d', 'M 9,2 V 6 L16,4 Z'

  // The cross
  );marker.append('path').attr('fill', 'none').attr('stroke', '#000000').style('stroke-dasharray', '0, 0').attr('stroke-width', '1px').attr('d', 'M 0,1 L 6,7 M 6,1 L 0,7'
  // this is actual shape for arrowhead
  );
};

exports.getTextObj = function () {
  var txt = {
    x: 0,
    y: 0,
    'fill': 'black',
    'text-anchor': 'start',
    style: '#666',
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0
  };
  return txt;
};

exports.getNoteRect = function () {
  var rect = {
    x: 0,
    y: 0,
    fill: '#EDF2AE',
    stroke: '#666',
    width: 100,
    anchor: 'start',
    height: 100,
    rx: 0,
    ry: 0
  };
  return rect;
};

var _drawTextCandidateFunc = function () {
  function byText(content, g, x, y, width, height, textAttrs) {
    var text = g.append('text').attr('x', x + width / 2).attr('y', y + height / 2 + 5).style('text-anchor', 'middle').text(content);
    _setTextAttrs(text, textAttrs);
  }

  function byTspan(content, g, x, y, width, height, textAttrs) {
    var text = g.append('text').attr('x', x + width / 2).attr('y', y).style('text-anchor', 'middle');
    text.append('tspan').attr('x', x + width / 2).attr('dy', '0').text(content);

    if (typeof text.textwrap !== 'undefined') {
      text.textwrap({ // d3textwrap
        x: x + width / 2, y: y, width: width, height: height
      }, 0
      // vertical aligment after d3textwrap expans tspan to multiple tspans
      );var tspans = text.selectAll('tspan');
      if (tspans.length > 0 && tspans[0].length > 0) {
        tspans = tspans[0];
        // set y of <text> to the mid y of the first line
        text.attr('y', y + (height / 2.0 - text[0][0].getBBox().height * (1 - 1.0 / tspans.length) / 2.0)).attr('dominant-baseline', 'central').attr('alignment-baseline', 'central');
      }
    }
    _setTextAttrs(text, textAttrs);
  }

  function byFo(content, g, x, y, width, height, textAttrs) {
    var s = g.append('switch');
    var f = s.append('foreignObject').attr('x', x).attr('y', y).attr('width', width).attr('height', height);

    var text = f.append('div').style('display', 'table').style('height', '100%').style('width', '100%');

    text.append('div').style('display', 'table-cell').style('text-align', 'center').style('vertical-align', 'middle').text(content);

    byTspan(content, s, x, y, width, height, textAttrs);
    _setTextAttrs(text, textAttrs);
  }

  function _setTextAttrs(toText, fromTextAttrsDict) {
    for (var key in fromTextAttrsDict) {
      if (fromTextAttrsDict.hasOwnProperty(key)) {
        toText.attr(key, fromTextAttrsDict[key]);
      }
    }
  }

  return function (conf) {
    return conf.textPlacement === 'fo' ? byFo : conf.textPlacement === 'old' ? byText : byTspan;
  };
}();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * ---
 * title: mermaidAPI
 * order: 5
 * ---
 * # mermaidAPI
 * This is the api to be used when handling the integration with the web page instead of using the default integration
 * (mermaid.js).
 *
 * The core of this api is the **render** function that given a graph definitionas text renders the graph/diagram and
 * returns a svg element for the graph. It is is then up to the user of the API to make use of the svg, either insert it
 * somewhere in the page or something completely different.
 */
var Logger = __webpack_require__(0);
var log = Logger.Log;

var graph = __webpack_require__(9);
var utils = __webpack_require__(18);
var flowRenderer = __webpack_require__(23);
var seq = __webpack_require__(26);
var info = __webpack_require__(22);
var infoParser = __webpack_require__(8);
var flowParser = __webpack_require__(11);
var dotParser = __webpack_require__(10);
var sequenceParser = __webpack_require__(16);
var sequenceDb = __webpack_require__(17);
var infoDb = __webpack_require__(7);
var gantt = __webpack_require__(24);
var ganttParser = __webpack_require__(13);
var ganttDb = __webpack_require__(12);
var classParser = __webpack_require__(6);
var classRenderer = __webpack_require__(21);
var classDb = __webpack_require__(5);
var gitGraphParser = __webpack_require__(15);
var gitGraphRenderer = __webpack_require__(25);
var gitGraphAst = __webpack_require__(14);
var d3 = __webpack_require__(1

/**
 * ## Configuration
 * These are the default options which can be overridden with the initialization call as in the example below:
 * ```
 * mermaid.initialize({
 *   flowchart:{
 *      htmlLabels: false
 *   }
 * });
 * ```
 */
);var config = {
  /**
   * logLevel , decides the amount of logging to be used.
   *    * debug: 1
   *    * info: 2
   *    * warn: 3
   *    * error: 4
   *    * fatal: 5
   */
  logLevel: 5,
  /**
   * **cloneCssStyles** - This options controls whether or not the css rules should be copied into the generated svg
   */
  cloneCssStyles: true,

  /**
   * **startOnLoad** - This options controls whether or mermaid starts when the page loads
   */
  startOnLoad: true,

  /**
   * **arrowMarkerAbsolute** - This options controls whether or arrow markers in html code will be absolute paths or
   * an anchor, #. This matters if you are using base tag settings.
   */
  arrowMarkerAbsolute: false,

  /**
   * ### flowchart
   * *The object containing configurations specific for flowcharts*
   */
  flowchart: {
    /**
     * **htmlLabels** - Flag for setting whether or not a html tag should be used for rendering labels
     * on the edges
     */
    htmlLabels: true,
    /**
     * **useMaxWidth** - Flag for setting whether or not a all available width should be used for
     * the diagram.
     */
    useMaxWidth: true
  },

  /**
   * ###  sequenceDiagram
   * The object containing configurations specific for sequence diagrams
   */
  sequenceDiagram: {

    /**
     * **diagramMarginX** - margin to the right and left of the sequence diagram
     */
    diagramMarginX: 50,

    /**
     * **diagramMarginY** - margin to the over and under the sequence diagram
     */
    diagramMarginY: 10,

    /**
     * **actorMargin** - Margin between actors
     */
    actorMargin: 50,

    /**
     * **width** - Width of actor boxes
     */
    width: 150,

    /**
     * **height** - Height of actor boxes
     */
    height: 65,

    /**
     * **boxMargin** - Margin around loop boxes
     */
    boxMargin: 10,

    /**
     * **boxTextMargin** - margin around the text in loop/alt/opt boxes
     */
    boxTextMargin: 5,

    /**
     * **noteMargin** - margin around notes
     */
    noteMargin: 10,

    /**
     * **messageMargin** - Space between messages
     */
    messageMargin: 35,

    /**
     * **mirrorActors** - mirror actors under diagram
     */
    mirrorActors: true,

    /**
     * **bottomMarginAdj** - Depending on css styling this might need adjustment.
     * Prolongs the edge of the diagram downwards
     */
    bottomMarginAdj: 1,

    /**
     * **useMaxWidth** - when this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used
     */
    useMaxWidth: true
  },

  /** ### gantt
   * The object containing configurations specific for gantt diagrams*
   */
  gantt: {
    /**
     * **titleTopMargin** - margin top for the text over the gantt diagram
     */
    titleTopMargin: 25,

    /**
     * **barHeight** - the height of the bars in the graph
     */
    barHeight: 20,

    /**
     * **barGap** - the margin between the different activities in the gantt diagram
     */
    barGap: 4,

    /**
     *  **topPadding** - margin between title and gantt diagram and between axis and gantt diagram.
     */
    topPadding: 50,

    /**
     *  **leftPadding** - the space allocated for the section name to the left of the activities.
     */
    leftPadding: 75,

    /**
     *  **gridLineStartPadding** - Vertical starting position of the grid lines
     */
    gridLineStartPadding: 35,

    /**
     *  **fontSize** - font size ...
     */
    fontSize: 11,

    /**
     * **fontFamily** - font family ...
     */
    fontFamily: '"Open-Sans", "sans-serif"',

    /**
     * **numberSectionStyles** - the number of alternating section styles
     */
    numberSectionStyles: 3,

    /**
     * **axisFormatter** - formatting of the axis, this might need adjustment to match your locale and preferences
     */
    axisFormatter: [

    // Within a day
    ['%I:%M', function (d) {
      return d.getHours();
    }],
    // Monday a week
    ['w. %U', function (d) {
      return d.getDay() === 1;
    }],
    // Day within a week (not monday)
    ['%a %d', function (d) {
      return d.getDay() && d.getDate() !== 1;
    }],
    // within a month
    ['%b %d', function (d) {
      return d.getDate() !== 1;
    }],
    // Month
    ['%m-%y', function (d) {
      return d.getMonth();
    }]]
  },
  classDiagram: {},
  gitGraph: {},
  info: {}
};

Logger.setLogLevel(config.logLevel

/**
 * ## parse
 * Function that parses a mermaid diagram definition. If parsing fails the parseError callback is called and an error is
 * thrown and
 * @param text
 */
);var parse = function (text) {
  var graphType = utils.detectType(text);
  var parser;

  switch (graphType) {
    case 'gitGraph':
      parser = gitGraphParser;
      parser.parser.yy = gitGraphAst;
      break;
    case 'graph':
      parser = flowParser;
      parser.parser.yy = graph;
      break;
    case 'dotGraph':
      parser = dotParser;
      parser.parser.yy = graph;
      break;
    case 'sequenceDiagram':
      parser = sequenceParser;
      parser.parser.yy = sequenceDb;
      break;
    case 'info':
      parser = infoParser;
      parser.parser.yy = infoDb;
      break;
    case 'gantt':
      parser = ganttParser;
      parser.parser.yy = ganttDb;
      break;
    case 'classDiagram':
      parser = classParser;
      parser.parser.yy = classDb;
      break;
  }

  try {
    parser.parse(text);
    return true;
  } catch (err) {
    return false;
  }
};
exports.parse = parse;

/**
 * ## version
 * Function returning version information
 * @returns {string} A string containing the version info
 */
exports.version = function () {
  return __webpack_require__(27).version;
};

exports.encodeEntities = function (text) {
  var txt = text;

  txt = txt.replace(/style.*:\S*#.*;/g, function (s) {
    var innerTxt = s.substring(0, s.length - 1);
    return innerTxt;
  });
  txt = txt.replace(/classDef.*:\S*#.*;/g, function (s) {
    var innerTxt = s.substring(0, s.length - 1);
    return innerTxt;
  });

  txt = txt.replace(/#\w+;/g, function (s) {
    var innerTxt = s.substring(1, s.length - 1);

    var isInt = /^\+?\d+$/.test(innerTxt);
    if (isInt) {
      return 'ﬂ°°' + innerTxt + '¶ß';
    } else {
      return 'ﬂ°' + innerTxt + '¶ß';
    }
  });

  return txt;
};

exports.decodeEntities = function (text) {
  var txt = text;

  txt = txt.replace(/ﬂ°°/g, function () {
    return '&#';
  });
  txt = txt.replace(/ﬂ°/g, function () {
    return '&';
  });
  txt = txt.replace(/¶ß/g, function () {
    return ';';
  });

  return txt;
};
/**
 * ##render
 * Function that renders an svg with a graph from a chart definition. Usage example below.
 *
 * ```
 * mermaidAPI.initialize({
 *      startOnLoad:true
 *  });
 *  $(function(){
 *      var graphDefinition = 'graph TB\na-->b';
 *      var cb = function(svgGraph){
 *          console.log(svgGraph);
 *      };
 *      mermaidAPI.render('id1',graphDefinition,cb);
 *  });
 *```
 * @param id the id of the element to be rendered
 * @param txt the graph definition
 * @param cb callback which is called after rendering is finished with the svg code as inparam.
 * @param container selector to element in which a div with the graph temporarily will be inserted. In one is
 * provided a hidden div will be inserted in the body of the page instead. The element will be removed when rendering is
 * completed.
 */
var render = function (id, txt, cb, container) {
  if (typeof container !== 'undefined') {
    container.innerHTML = '';

    d3.select(container).append('div').attr('id', 'd' + id).append('svg').attr('id', id).attr('width', '100%').attr('xmlns', 'http://www.w3.org/2000/svg').append('g');
  } else {
    const element = document.querySelector('#' + 'd' + id);
    if (element) {
      element.innerHTML = '';
    }

    d3.select('body').append('div').attr('id', 'd' + id).append('svg').attr('id', id).attr('width', '100%').attr('xmlns', 'http://www.w3.org/2000/svg').append('g');
  }

  window.txt = txt;
  txt = exports.encodeEntities(txt);

  var element = d3.select('#d' + id).node();
  var graphType = utils.detectType(txt);
  var classes = {};
  switch (graphType) {
    case 'gitGraph':
      config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      gitGraphRenderer.setConf(config.gitGraph);
      gitGraphRenderer.draw(txt, id, false);
      break;
    case 'graph':
      config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      flowRenderer.setConf(config.flowchart);
      flowRenderer.draw(txt, id, false);
      if (config.cloneCssStyles) {
        classes = flowRenderer.getClasses(txt, false);
        utils.cloneCssStyles(element.firstChild, classes);
      }
      break;
    case 'dotGraph':
      config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      flowRenderer.setConf(config.flowchart);
      flowRenderer.draw(txt, id, true);
      if (config.cloneCssStyles) {
        classes = flowRenderer.getClasses(txt, true);
        utils.cloneCssStyles(element.firstChild, classes);
      }
      break;
    case 'sequenceDiagram':
      config.sequenceDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      seq.setConf(config.sequenceDiagram);
      seq.draw(txt, id);
      if (config.cloneCssStyles) {
        utils.cloneCssStyles(element.firstChild, []);
      }
      break;
    case 'gantt':
      config.gantt.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      gantt.setConf(config.gantt);
      gantt.draw(txt, id);
      if (config.cloneCssStyles) {
        utils.cloneCssStyles(element.firstChild, []);
      }
      break;
    case 'classDiagram':
      config.classDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      classRenderer.setConf(config.classDiagram);
      classRenderer.draw(txt, id);
      if (config.cloneCssStyles) {
        utils.cloneCssStyles(element.firstChild, []);
      }
      break;
    case 'info':
      config.info.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      info.draw(txt, id, exports.version());
      if (config.cloneCssStyles) {
        utils.cloneCssStyles(element.firstChild, []);
      }
      break;
  }

  d3.select('#d' + id).selectAll('foreignobject div').attr('xmlns', 'http://www.w3.org/1999/xhtml');

  var url = '';
  if (config.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, '\\(');
    url = url.replace(/\)/g, '\\)');
  }

  // Fix for when the base tag is used
  var svgCode = d3.select('#d' + id).node().innerHTML.replace(/url\(#arrowhead/g, 'url(' + url + '#arrowhead', 'g');

  svgCode = exports.decodeEntities(svgCode);

  if (typeof cb !== 'undefined') {
    cb(svgCode, graph.bindFunctions);
  } else {
    log.warn('CB = undefined!');
  }

  var node = d3.select('#d' + id).node();
  if (node !== null && typeof node.remove === 'function') {
    d3.select('#d' + id).node().remove();
  }

  return svgCode;
};

exports.render = function (id, text, cb, containerElement) {
  try {
    if (arguments.length === 1) {
      text = id;
      id = 'mermaidId0';
    }

    if (typeof document === 'undefined') {
      // Todo handle rendering serverside using phantomjs
    } else {
      // In browser
      return render(id, text, cb, containerElement);
    }
  } catch (e) {
    log.warn(e);
  }
};

var setConf = function (cnf) {
  // Top level initially mermaid, gflow, sequenceDiagram and gantt
  var lvl1Keys = Object.keys(cnf);
  var i;
  for (i = 0; i < lvl1Keys.length; i++) {
    if (typeof cnf[lvl1Keys[i]] === 'object') {
      var lvl2Keys = Object.keys(cnf[lvl1Keys[i]]);

      var j;
      for (j = 0; j < lvl2Keys.length; j++) {
        log.debug('Setting conf ', lvl1Keys[i], '-', lvl2Keys[j]);
        if (typeof config[lvl1Keys[i]] === 'undefined') {
          config[lvl1Keys[i]] = {};
        }
        log.debug('Setting config: ' + lvl1Keys[i] + ' ' + lvl2Keys[j] + ' to ' + cnf[lvl1Keys[i]][lvl2Keys[j]]);
        config[lvl1Keys[i]][lvl2Keys[j]] = cnf[lvl1Keys[i]][lvl2Keys[j]];
      }
    } else {
      config[lvl1Keys[i]] = cnf[lvl1Keys[i]];
    }
  }
};

exports.initialize = function (options) {
  log.debug('Initializing mermaidAPI'
  // Update default config with options supplied at initialization
  );if (typeof options === 'object') {
    setConf(options);
  }
  Logger.setLogLevel(config.logLevel);
};
exports.getConfig = function () {
  return config;
};

exports.parseError = function (err, hash) {
  if (typeof mermaid !== 'undefined') {
    global.mermaid.parseError(err, hash);
  } else {
    log.debug('Mermaid Syntax error:');
    log.debug(err);
  }
};
global.mermaidAPI = {
  render: exports.render,
  parse: exports.parse,
  initialize: exports.initialize,
  detectType: utils.detectType,
  parseError: exports.parseError,
  getConfig: exports.getConfig
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("d3");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("dagre");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("dagre-d3-renderer");

/***/ })
/******/ ]);