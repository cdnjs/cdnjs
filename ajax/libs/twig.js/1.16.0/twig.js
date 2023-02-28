(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Twig"] = factory();
	else
		root["Twig"] = factory();
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 228:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ 646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(228);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 713:
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ 318:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 860:
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 206:
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 319:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(646);

var iterableToArray = __webpack_require__(860);

var unsupportedIterableToArray = __webpack_require__(379);

var nonIterableSpread = __webpack_require__(206);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 8:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(228);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ 452:
/***/ ((module) => {

"use strict";


// ## twig.async.js
//
// This file handles asynchronous tasks within twig.
module.exports = function (Twig) {
  'use strict';

  var STATE_UNKNOWN = 0;
  var STATE_RESOLVED = 1;
  var STATE_REJECTED = 2;

  Twig.ParseState.prototype.parseAsync = function (tokens, context) {
    return this.parse(tokens, context, true);
  };

  Twig.expression.parseAsync = function (tokens, context, tokensAreParameters) {
    var state = this;
    return Twig.expression.parse.call(state, tokens, context, tokensAreParameters, true);
  };

  Twig.logic.parseAsync = function (token, context, chain) {
    var state = this;
    return Twig.logic.parse.call(state, token, context, chain, true);
  };

  Twig.Template.prototype.renderAsync = function (context, params) {
    return this.render(context, params, true);
  };

  Twig.async = {};
  /**
   * Checks for `thenable` objects
   */

  Twig.isPromise = function (obj) {
    return obj && obj.then && typeof obj.then === 'function';
  };
  /**
   * Handling of code paths that might either return a promise
   * or a value depending on whether async code is used.
   *
   * @see https://github.com/twigjs/twig.js/blob/master/ASYNC.md#detecting-asynchronous-behaviour
   */


  function potentiallyAsyncSlow(that, allowAsync, action) {
    var result = action.call(that);
    var err = null;
    var isAsync = true;

    if (!Twig.isPromise(result)) {
      return result;
    }

    result.then(function (res) {
      result = res;
      isAsync = false;
    })["catch"](function (error) {
      err = error;
    });

    if (err !== null) {
      throw err;
    }

    if (isAsync) {
      throw new Twig.Error('You are using Twig.js in sync mode in combination with async extensions.');
    }

    return result;
  }

  Twig.async.potentiallyAsync = function (that, allowAsync, action) {
    if (allowAsync) {
      return Twig.Promise.resolve(action.call(that));
    }

    return potentiallyAsyncSlow(that, allowAsync, action);
  };

  function run(fn, resolve, reject) {
    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  function pending(handlers, onResolved, onRejected) {
    var h = [onResolved, onRejected, -2]; // The promise has yet to be rejected or resolved.

    if (!handlers) {
      handlers = h;
    } else if (handlers[2] === -2) {
      // Only allocate an array when there are multiple handlers
      handlers = [handlers, h];
    } else {
      handlers.push(h);
    }

    return handlers;
  }
  /**
   * Really small thenable to represent promises that resolve immediately.
   *
   */


  Twig.Thenable = function (then, value, state) {
    this.then = then;
    this._value = state ? value : null;
    this._state = state || STATE_UNKNOWN;
  };

  Twig.Thenable.prototype["catch"] = function (onRejected) {
    // THe promise will not throw, it has already resolved.
    if (this._state === STATE_RESOLVED) {
      return this;
    }

    return this.then(null, onRejected);
  };
  /**
   * The `then` method attached to a Thenable when it has resolved.
   *
   */


  Twig.Thenable.resolvedThen = function (onResolved) {
    try {
      return Twig.Promise.resolve(onResolved(this._value));
    } catch (error) {
      return Twig.Promise.reject(error);
    }
  };
  /**
   * The `then` method attached to a Thenable when it has rejected.
   *
   */


  Twig.Thenable.rejectedThen = function (onResolved, onRejected) {
    // Shortcut for rejected twig promises
    if (!onRejected || typeof onRejected !== 'function') {
      return this;
    }

    var value = this._value;
    var result;

    try {
      result = onRejected(value);
    } catch (error) {
      result = Twig.Promise.reject(error);
    }

    return Twig.Promise.resolve(result);
  };
  /**
   * An alternate implementation of a Promise that does not fully follow
   * the spec, but instead works fully synchronous while still being
   * thenable.
   *
   * These promises can be mixed with regular promises at which point
   * the synchronous behaviour is lost.
   */


  Twig.Promise = function (executor) {
    var state = STATE_UNKNOWN;
    var value = null;

    var changeState = function changeState(nextState, nextValue) {
      state = nextState;
      value = nextValue;
    };

    function onReady(v) {
      changeState(STATE_RESOLVED, v);
    }

    function onReject(e) {
      changeState(STATE_REJECTED, e);
    }

    run(executor, onReady, onReject); // If the promise settles right after running the executor we can
    // return a Promise with it's state already set.
    //
    // Twig.Promise.resolve and Twig.Promise.reject both use the more
    // efficient `Twig.Thenable` for this purpose.

    if (state === STATE_RESOLVED) {
      return Twig.Promise.resolve(value);
    }

    if (state === STATE_REJECTED) {
      return Twig.Promise.reject(value);
    } // If we managed to get here our promise is going to resolve asynchronous.


    changeState = new Twig.FullPromise();
    return changeState.promise;
  };
  /**
   * Promise implementation that can handle being resolved at any later time.
   *
   */


  Twig.FullPromise = function () {
    var handlers = null; // The state has been changed to either resolve, or reject
    // which means we should call the handler.

    function resolved(onResolved) {
      onResolved(p._value);
    }

    function rejected(onResolved, onRejected) {
      onRejected(p._value);
    }

    var append = function append(onResolved, onRejected) {
      handlers = pending(handlers, onResolved, onRejected);
    };

    function changeState(newState, v) {
      if (p._state) {
        return;
      }

      p._value = v;
      p._state = newState;
      append = newState === STATE_RESOLVED ? resolved : rejected;

      if (!handlers) {
        return;
      }

      if (handlers[2] === -2) {
        append(handlers[0], handlers[1]);
        handlers = null;
        return;
      }

      handlers.forEach(function (h) {
        append(h[0], h[1]);
      });
      handlers = null;
    }

    var p = new Twig.Thenable(function (onResolved, onRejected) {
      var hasResolved = typeof onResolved === 'function'; // Shortcut for resolved twig promises

      if (p._state === STATE_RESOLVED && !hasResolved) {
        return Twig.Promise.resolve(p._value);
      }

      if (p._state === STATE_RESOLVED) {
        try {
          return Twig.Promise.resolve(onResolved(p._value));
        } catch (error) {
          return Twig.Promise.reject(error);
        }
      }

      var hasRejected = typeof onRejected === 'function';
      return new Twig.Promise(function (resolve, reject) {
        append(hasResolved ? function (result) {
          try {
            resolve(onResolved(result));
          } catch (error) {
            reject(error);
          }
        } : resolve, hasRejected ? function (err) {
          try {
            resolve(onRejected(err));
          } catch (error) {
            reject(error);
          }
        } : reject);
      });
    });
    changeState.promise = p;
    return changeState;
  };

  Twig.Promise.defaultResolved = new Twig.Thenable(Twig.Thenable.resolvedThen, undefined, STATE_RESOLVED);
  Twig.Promise.emptyStringResolved = new Twig.Thenable(Twig.Thenable.resolvedThen, '', STATE_RESOLVED);

  Twig.Promise.resolve = function (value) {
    if (arguments.length === 0 || typeof value === 'undefined') {
      return Twig.Promise.defaultResolved;
    }

    if (Twig.isPromise(value)) {
      return value;
    } // Twig often resolves with an empty string, we optimize for this
    // scenario by returning a fixed promise. This reduces the load on
    // garbage collection.


    if (value === '') {
      return Twig.Promise.emptyStringResolved;
    }

    return new Twig.Thenable(Twig.Thenable.resolvedThen, value, STATE_RESOLVED);
  };

  Twig.Promise.reject = function (e) {
    // `e` should never be a promise.
    return new Twig.Thenable(Twig.Thenable.rejectedThen, e, STATE_REJECTED);
  };

  Twig.Promise.all = function (promises) {
    var results = new Array(promises.length);
    return Twig.async.forEach(promises, function (p, index) {
      if (!Twig.isPromise(p)) {
        results[index] = p;
        return;
      }

      if (p._state === STATE_RESOLVED) {
        results[index] = p._value;
        return;
      }

      return p.then(function (v) {
        results[index] = v;
      });
    }).then(function () {
      return results;
    });
  };
  /**
  * Go over each item in a fashion compatible with Twig.forEach,
  * allow the function to return a promise or call the third argument
  * to signal it is finished.
  *
  * Each item in the array will be called sequentially.
  */


  Twig.async.forEach = function (arr, callback) {
    var len = arr ? arr.length : 0;
    var index = 0;

    function next() {
      var resp = null;

      do {
        if (index === len) {
          return Twig.Promise.resolve();
        }

        resp = callback(arr[index], index);
        index++; // While the result of the callback is not a promise or it is
        // a promise that has settled we can use a regular loop which
        // is much faster.
      } while (!resp || !Twig.isPromise(resp) || resp._state === STATE_RESOLVED);

      return resp.then(next);
    }

    return next();
  };

  return Twig;
};

/***/ }),

/***/ 383:
/***/ ((module) => {

"use strict";


// ## twig.compiler.js
//
// This file handles compiling templates into JS
module.exports = function (Twig) {
  /**
   * Namespace for compilation.
   */
  Twig.compiler = {
    module: {}
  }; // Compile a Twig Template to output.

  Twig.compiler.compile = function (template, options) {
    // Get tokens
    var tokens = JSON.stringify(template.tokens);
    var id = template.id;
    var output = null;

    if (options.module) {
      if (Twig.compiler.module[options.module] === undefined) {
        throw new Twig.Error('Unable to find module type ' + options.module);
      }

      output = Twig.compiler.module[options.module](id, tokens, options.twig);
    } else {
      output = Twig.compiler.wrap(id, tokens);
    }

    return output;
  };

  Twig.compiler.module = {
    amd: function amd(id, tokens, pathToTwig) {
      return 'define(["' + pathToTwig + '"], function (Twig) {\n\tvar twig, templates;\ntwig = Twig.twig;\ntemplates = ' + Twig.compiler.wrap(id, tokens) + '\n\treturn templates;\n});';
    },
    node: function node(id, tokens) {
      return 'var twig = require("twig").twig;\nexports.template = ' + Twig.compiler.wrap(id, tokens);
    },
    cjs2: function cjs2(id, tokens, pathToTwig) {
      return 'module.declare([{ twig: "' + pathToTwig + '" }], function (require, exports, module) {\n\tvar twig = require("twig").twig;\n\texports.template = ' + Twig.compiler.wrap(id, tokens) + '\n});';
    }
  };

  Twig.compiler.wrap = function (id, tokens) {
    return 'twig({id:"' + id.replace('"', '\\"') + '", data:' + tokens + ', precompiled: true});\n';
  };

  return Twig;
};

/***/ }),

/***/ 181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(713));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ## twig.core.js
//
// This file handles template level tokenizing, compiling and parsing.
module.exports = function (Twig) {
  'use strict';

  Twig.trace = false;
  Twig.debug = false; // Default caching to true for the improved performance it offers

  Twig.cache = true;

  Twig.noop = function () {};

  Twig.merge = function (target, source, onlyChanged) {
    Object.keys(source).forEach(function (key) {
      if (onlyChanged && !(key in target)) {
        return;
      }

      target[key] = source[key];
    });
    return target;
  };
  /**
   * Exception thrown by twig.js.
   */


  Twig.Error = function (message, file) {
    this.message = message;
    this.name = 'TwigException';
    this.type = 'TwigException';
    this.file = file;
  };
  /**
   * Get the string representation of a Twig error.
   */


  Twig.Error.prototype.toString = function () {
    var output = this.name + ': ' + this.message;
    return output;
  };
  /**
   * Wrapper for logging to the console.
   */


  Twig.log = {
    trace: function trace() {
      if (Twig.trace && console) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        console.log(Array.prototype.slice.call(args));
      }
    },
    debug: function debug() {
      if (Twig.debug && console) {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        console.log(Array.prototype.slice.call(args));
      }
    }
  };

  if (typeof console === 'undefined') {
    Twig.log.error = function () {};
  } else if (typeof console.error !== 'undefined') {
    Twig.log.error = function () {
      var _console;

      (_console = console).error.apply(_console, arguments);
    };
  } else if (typeof console.log !== 'undefined') {
    Twig.log.error = function () {
      var _console2;

      (_console2 = console).log.apply(_console2, arguments);
    };
  }
  /**
   * Container for methods related to handling high level template tokens
   *      (for example: {{ expression }}, {% logic %}, {# comment #}, raw data)
   */


  Twig.token = {};
  /**
   * Token types.
   */

  Twig.token.type = {
    output: 'output',
    logic: 'logic',
    comment: 'comment',
    raw: 'raw',
    outputWhitespacePre: 'output_whitespace_pre',
    outputWhitespacePost: 'output_whitespace_post',
    outputWhitespaceBoth: 'output_whitespace_both',
    logicWhitespacePre: 'logic_whitespace_pre',
    logicWhitespacePost: 'logic_whitespace_post',
    logicWhitespaceBoth: 'logic_whitespace_both'
  };
  /**
   * Token syntax definitions.
   */

  Twig.token.definitions = [{
    type: Twig.token.type.raw,
    open: '{% raw %}',
    close: '{% endraw %}'
  }, {
    type: Twig.token.type.raw,
    open: '{% verbatim %}',
    close: '{% endverbatim %}'
  }, // *Whitespace type tokens*
  //
  // These typically take the form `{{- expression -}}` or `{{- expression }}` or `{{ expression -}}`.
  {
    type: Twig.token.type.outputWhitespacePre,
    open: '{{-',
    close: '}}'
  }, {
    type: Twig.token.type.outputWhitespacePost,
    open: '{{',
    close: '-}}'
  }, {
    type: Twig.token.type.outputWhitespaceBoth,
    open: '{{-',
    close: '-}}'
  }, {
    type: Twig.token.type.logicWhitespacePre,
    open: '{%-',
    close: '%}'
  }, {
    type: Twig.token.type.logicWhitespacePost,
    open: '{%',
    close: '-%}'
  }, {
    type: Twig.token.type.logicWhitespaceBoth,
    open: '{%-',
    close: '-%}'
  }, // *Output type tokens*
  //
  // These typically take the form `{{ expression }}`.
  {
    type: Twig.token.type.output,
    open: '{{',
    close: '}}'
  }, // *Logic type tokens*
  //
  // These typically take a form like `{% if expression %}` or `{% endif %}`
  {
    type: Twig.token.type.logic,
    open: '{%',
    close: '%}'
  }, // *Comment type tokens*
  //
  // These take the form `{# anything #}`
  {
    type: Twig.token.type.comment,
    open: '{#',
    close: '#}'
  }];
  /**
   * What characters start "strings" in token definitions. We need this to ignore token close
   * strings inside an expression.
   */

  Twig.token.strings = ['"', '\''];

  Twig.token.findStart = function (template) {
    var output = {
      position: null,
      def: null
    };
    var closePosition = null;
    var len = Twig.token.definitions.length;
    var i;
    var tokenTemplate;
    var firstKeyPosition;
    var closeKeyPosition;

    for (i = 0; i < len; i++) {
      tokenTemplate = Twig.token.definitions[i];
      firstKeyPosition = template.indexOf(tokenTemplate.open);
      closeKeyPosition = template.indexOf(tokenTemplate.close);
      Twig.log.trace('Twig.token.findStart: ', 'Searching for ', tokenTemplate.open, ' found at ', firstKeyPosition); // Special handling for mismatched tokens

      if (firstKeyPosition >= 0) {
        // This token matches the template
        if (tokenTemplate.open.length !== tokenTemplate.close.length) {
          // This token has mismatched closing and opening tags
          if (closeKeyPosition < 0) {
            // This token's closing tag does not match the template
            continue;
          }
        }
      } // Does this token occur before any other types?


      if (firstKeyPosition >= 0 && (output.position === null || firstKeyPosition < output.position)) {
        output.position = firstKeyPosition;
        output.def = tokenTemplate;
        closePosition = closeKeyPosition;
      } else if (firstKeyPosition >= 0 && output.position !== null && firstKeyPosition === output.position) {
        /* This token exactly matches another token,
        greedily match to check if this token has a greater specificity */
        if (tokenTemplate.open.length > output.def.open.length) {
          // This token's opening tag is more specific than the previous match
          output.position = firstKeyPosition;
          output.def = tokenTemplate;
          closePosition = closeKeyPosition;
        } else if (tokenTemplate.open.length === output.def.open.length) {
          if (tokenTemplate.close.length > output.def.close.length) {
            // This token's opening tag is as specific as the previous match,
            // but the closing tag has greater specificity
            if (closeKeyPosition >= 0 && closeKeyPosition < closePosition) {
              // This token's closing tag exists in the template,
              // and it occurs sooner than the previous match
              output.position = firstKeyPosition;
              output.def = tokenTemplate;
              closePosition = closeKeyPosition;
            }
          } else if (closeKeyPosition >= 0 && closeKeyPosition < closePosition) {
            // This token's closing tag is not more specific than the previous match,
            // but it occurs sooner than the previous match
            output.position = firstKeyPosition;
            output.def = tokenTemplate;
            closePosition = closeKeyPosition;
          }
        }
      }
    }

    return output;
  };

  Twig.token.findEnd = function (template, tokenDef, start) {
    var end = null;
    var found = false;
    var offset = 0; // String position variables

    var strPos = null;
    var strFound = null;
    var pos = null;
    var endOffset = null;
    var thisStrPos = null;
    var endStrPos = null; // For loop variables

    var i;
    var l;

    while (!found) {
      strPos = null;
      strFound = null;
      pos = template.indexOf(tokenDef.close, offset);

      if (pos >= 0) {
        end = pos;
        found = true;
      } else {
        // Throw an exception
        throw new Twig.Error('Unable to find closing bracket \'' + tokenDef.close + '\' opened near template position ' + start);
      } // Ignore quotes within comments; just look for the next comment close sequence,
      // regardless of what comes before it. https://github.com/justjohn/twig.js/issues/95


      if (tokenDef.type === Twig.token.type.comment) {
        break;
      } // Ignore quotes within raw tag
      // Fixes #283


      if (tokenDef.type === Twig.token.type.raw) {
        break;
      }

      l = Twig.token.strings.length;

      for (i = 0; i < l; i += 1) {
        thisStrPos = template.indexOf(Twig.token.strings[i], offset);

        if (thisStrPos > 0 && thisStrPos < pos && (strPos === null || thisStrPos < strPos)) {
          strPos = thisStrPos;
          strFound = Twig.token.strings[i];
        }
      } // We found a string before the end of the token, now find the string's end and set the search offset to it


      if (strPos !== null) {
        endOffset = strPos + 1;
        end = null;
        found = false;

        for (;;) {
          endStrPos = template.indexOf(strFound, endOffset);

          if (endStrPos < 0) {
            throw Twig.Error('Unclosed string in template');
          } // Ignore escaped quotes


          if (template.slice(endStrPos - 1, endStrPos) === '\\') {
            endOffset = endStrPos + 1;
          } else {
            offset = endStrPos + 1;
            break;
          }
        }
      }
    }

    return end;
  };
  /**
   * Convert a template into high-level tokens.
   */


  Twig.tokenize = function (template) {
    var tokens = []; // An offset for reporting errors locations in the template.

    var errorOffset = 0; // The start and type of the first token found in the template.

    var foundToken = null; // The end position of the matched token.

    var end = null;

    while (template.length > 0) {
      // Find the first occurance of any token type in the template
      foundToken = Twig.token.findStart(template);
      Twig.log.trace('Twig.tokenize: ', 'Found token: ', foundToken);

      if (foundToken.position === null) {
        // No more tokens -> add the rest of the template as a raw-type token
        tokens.push({
          type: Twig.token.type.raw,
          value: template
        });
        template = '';
      } else {
        // Add a raw type token for anything before the start of the token
        if (foundToken.position > 0) {
          tokens.push({
            type: Twig.token.type.raw,
            value: template.slice(0, Math.max(0, foundToken.position))
          });
        }

        template = template.slice(foundToken.position + foundToken.def.open.length);
        errorOffset += foundToken.position + foundToken.def.open.length; // Find the end of the token

        end = Twig.token.findEnd(template, foundToken.def, errorOffset);
        Twig.log.trace('Twig.tokenize: ', 'Token ends at ', end);
        tokens.push({
          type: foundToken.def.type,
          value: template.slice(0, Math.max(0, end)).trim()
        });

        if (template.slice(end + foundToken.def.close.length, end + foundToken.def.close.length + 1) === '\n') {
          switch (foundToken.def.type) {
            case 'logic_whitespace_pre':
            case 'logic_whitespace_post':
            case 'logic_whitespace_both':
            case 'logic':
              // Newlines directly after logic tokens are ignored
              end += 1;
              break;

            default:
              break;
          }
        }

        template = template.slice(end + foundToken.def.close.length); // Increment the position in the template

        errorOffset += end + foundToken.def.close.length;
      }
    }

    return tokens;
  };

  Twig.compile = function (tokens) {
    var self = this;

    try {
      // Output and intermediate stacks
      var output = [];
      var stack = []; // The tokens between open and close tags

      var intermediateOutput = [];
      var token = null;
      var logicToken = null;
      var unclosedToken = null; // Temporary previous token.

      var prevToken = null; // Temporary previous output.

      var prevOutput = null; // Temporary previous intermediate output.

      var prevIntermediateOutput = null; // The previous token's template

      var prevTemplate = null; // Token lookahead

      var nextToken = null; // The output token

      var tokOutput = null; // Logic Token values

      var type = null;
      var open = null;
      var next = null;

      var compileOutput = function compileOutput(token) {
        Twig.expression.compile.call(self, token);

        if (stack.length > 0) {
          intermediateOutput.push(token);
        } else {
          output.push(token);
        }
      };

      var compileLogic = function compileLogic(token) {
        // Compile the logic token
        logicToken = Twig.logic.compile.call(self, token);
        type = logicToken.type;
        open = Twig.logic.handler[type].open;
        next = Twig.logic.handler[type].next;
        Twig.log.trace('Twig.compile: ', 'Compiled logic token to ', logicToken, ' next is: ', next, ' open is : ', open); // Not a standalone token, check logic stack to see if this is expected

        if (open !== undefined && !open) {
          prevToken = stack.pop();
          prevTemplate = Twig.logic.handler[prevToken.type];

          if (!prevTemplate.next.includes(type)) {
            throw new Error(type + ' not expected after a ' + prevToken.type);
          }

          prevToken.output = prevToken.output || [];
          prevToken.output = prevToken.output.concat(intermediateOutput);
          intermediateOutput = [];
          tokOutput = {
            type: Twig.token.type.logic,
            token: prevToken
          };

          if (stack.length > 0) {
            intermediateOutput.push(tokOutput);
          } else {
            output.push(tokOutput);
          }
        } // This token requires additional tokens to complete the logic structure.


        if (next !== undefined && next.length > 0) {
          Twig.log.trace('Twig.compile: ', 'Pushing ', logicToken, ' to logic stack.');

          if (stack.length > 0) {
            // Put any currently held output into the output list of the logic operator
            // currently at the head of the stack before we push a new one on.
            prevToken = stack.pop();
            prevToken.output = prevToken.output || [];
            prevToken.output = prevToken.output.concat(intermediateOutput);
            stack.push(prevToken);
            intermediateOutput = [];
          } // Push the new logic token onto the logic stack


          stack.push(logicToken);
        } else if (open !== undefined && open) {
          tokOutput = {
            type: Twig.token.type.logic,
            token: logicToken
          }; // Standalone token (like {% set ... %}

          if (stack.length > 0) {
            intermediateOutput.push(tokOutput);
          } else {
            output.push(tokOutput);
          }
        }
      };

      while (tokens.length > 0) {
        token = tokens.shift();
        prevOutput = output[output.length - 1];
        prevIntermediateOutput = intermediateOutput[intermediateOutput.length - 1];
        nextToken = tokens[0];
        Twig.log.trace('Compiling token ', token);

        switch (token.type) {
          case Twig.token.type.raw:
            if (stack.length > 0) {
              intermediateOutput.push(token);
            } else {
              output.push(token);
            }

            break;

          case Twig.token.type.logic:
            compileLogic.call(self, token);
            break;
          // Do nothing, comments should be ignored

          case Twig.token.type.comment:
            break;

          case Twig.token.type.output:
            compileOutput.call(self, token);
            break;
          // Kill whitespace ahead and behind this token

          case Twig.token.type.logicWhitespacePre:
          case Twig.token.type.logicWhitespacePost:
          case Twig.token.type.logicWhitespaceBoth:
          case Twig.token.type.outputWhitespacePre:
          case Twig.token.type.outputWhitespacePost:
          case Twig.token.type.outputWhitespaceBoth:
            if (token.type !== Twig.token.type.outputWhitespacePost && token.type !== Twig.token.type.logicWhitespacePost) {
              if (prevOutput) {
                // If the previous output is raw, pop it off
                if (prevOutput.type === Twig.token.type.raw) {
                  output.pop();
                  prevOutput.value = prevOutput.value.trimEnd(); // Repush the previous output

                  output.push(prevOutput);
                }
              }

              if (prevIntermediateOutput) {
                // If the previous intermediate output is raw, pop it off
                if (prevIntermediateOutput.type === Twig.token.type.raw) {
                  intermediateOutput.pop();
                  prevIntermediateOutput.value = prevIntermediateOutput.value.trimEnd(); // Repush the previous intermediate output

                  intermediateOutput.push(prevIntermediateOutput);
                }
              }
            } // Compile this token


            switch (token.type) {
              case Twig.token.type.outputWhitespacePre:
              case Twig.token.type.outputWhitespacePost:
              case Twig.token.type.outputWhitespaceBoth:
                compileOutput.call(self, token);
                break;

              case Twig.token.type.logicWhitespacePre:
              case Twig.token.type.logicWhitespacePost:
              case Twig.token.type.logicWhitespaceBoth:
                compileLogic.call(self, token);
                break;

              default:
                break;
            }

            if (token.type !== Twig.token.type.outputWhitespacePre && token.type !== Twig.token.type.logicWhitespacePre) {
              if (nextToken) {
                // If the next token is raw, shift it out
                if (nextToken.type === Twig.token.type.raw) {
                  tokens.shift();
                  nextToken.value = nextToken.value.trimStart(); // Unshift the next token

                  tokens.unshift(nextToken);
                }
              }
            }

            break;

          default:
            break;
        }

        Twig.log.trace('Twig.compile: ', ' Output: ', output, ' Logic Stack: ', stack, ' Pending Output: ', intermediateOutput);
      } // Verify that there are no logic tokens left in the stack.


      if (stack.length > 0) {
        unclosedToken = stack.pop();
        throw new Error('Unable to find an end tag for ' + unclosedToken.type + ', expecting one of ' + unclosedToken.next);
      }

      return output;
    } catch (error) {
      if (self.options.rethrow) {
        if (error.type === 'TwigException' && !error.file) {
          error.file = self.id;
        }

        throw error;
      } else {
        Twig.log.error('Error compiling twig template ' + self.id + ': ');

        if (error.stack) {
          Twig.log.error(error.stack);
        } else {
          Twig.log.error(error.toString());
        }
      }
    }
  };

  function handleException(state, ex) {
    if (state.template.options.rethrow) {
      if (typeof ex === 'string') {
        ex = new Twig.Error(ex);
      }

      if (ex.type === 'TwigException' && !ex.file) {
        ex.file = state.template.id;
      }

      throw ex;
    } else {
      Twig.log.error('Error parsing twig template ' + state.template.id + ': ');

      if (ex.stack) {
        Twig.log.error(ex.stack);
      } else {
        Twig.log.error(ex.toString());
      }

      if (Twig.debug) {
        return ex.toString();
      }
    }
  }
  /**
   * Tokenize and compile a string template.
   *
   * @param {string} data The template.
   *
   * @return {Array} The compiled tokens.
   */


  Twig.prepare = function (data) {
    // Tokenize
    Twig.log.debug('Twig.prepare: ', 'Tokenizing ', data);
    var rawTokens = Twig.tokenize.call(this, data); // Compile

    Twig.log.debug('Twig.prepare: ', 'Compiling ', rawTokens);
    var tokens = Twig.compile.call(this, rawTokens);
    Twig.log.debug('Twig.prepare: ', 'Compiled ', tokens);
    return tokens;
  };
  /**
   * Join the output token's stack and escape it if needed
   *
   * @param {Array} Output token's stack
   *
   * @return {string|String} Autoescaped output
   */


  Twig.output = function (output) {
    var autoescape = this.options.autoescape;

    if (!autoescape) {
      return output.join('');
    }

    var strategy = typeof autoescape === 'string' ? autoescape : 'html';
    var escapedOutput = output.map(function (str) {
      if (str && str.twigMarkup !== true && str.twigMarkup !== strategy && !(strategy === 'html' && str.twigMarkup === 'html_attr')) {
        str = Twig.filters.escape(str, [strategy]);
      }

      return str;
    });

    if (escapedOutput.length === 0) {
      return '';
    }

    var joinedOutput = escapedOutput.join('');

    if (joinedOutput.length === 0) {
      return '';
    }

    return new Twig.Markup(joinedOutput, true);
  }; // Namespace for template storage and retrieval


  Twig.Templates = {
    /**
     * Registered template loaders - use Twig.Templates.registerLoader to add supported loaders
     * @type {Object}
     */
    loaders: {},

    /**
     * Registered template parsers - use Twig.Templates.registerParser to add supported parsers
     * @type {Object}
     */
    parsers: {},

    /**
     * Cached / loaded templates
     * @type {Object}
     */
    registry: {}
  };
  /**
   * Is this id valid for a twig template?
   *
   * @param {string} id The ID to check.
   *
   * @throws {Twig.Error} If the ID is invalid or used.
   * @return {boolean} True if the ID is valid.
   */

  Twig.validateId = function (id) {
    if (id === 'prototype') {
      throw new Twig.Error(id + ' is not a valid twig identifier');
    } else if (Twig.cache && Object.hasOwnProperty.call(Twig.Templates.registry, id)) {
      throw new Twig.Error('There is already a template with the ID ' + id);
    }

    return true;
  };
  /**
   * Register a template loader
   *
   * @example
   * Twig.extend(function (Twig) {
   *    Twig.Templates.registerLoader('custom_loader', function (location, params, callback, errorCallback) {
   *        // ... load the template ...
   *        params.data = loadedTemplateData;
   *        // create and return the template
   *        var template = new Twig.Template(params);
   *        if (typeof callback === 'function') {
   *            callback(template);
   *        }
   *        return template;
   *    });
   * });
   *
   * @param {String} methodName The method this loader is intended for (ajax, fs)
   * @param {Function} func The function to execute when loading the template
   * @param {Object|undefined} scope Optional scope parameter to bind func to
   *
   * @throws Twig.Error
   *
   * @return {void}
   */


  Twig.Templates.registerLoader = function (methodName, func, scope) {
    if (typeof func !== 'function') {
      throw new Twig.Error('Unable to add loader for ' + methodName + ': Invalid function reference given.');
    }

    if (scope) {
      func = func.bind(scope);
    }

    this.loaders[methodName] = func;
  };
  /**
   * Remove a registered loader
   *
   * @param {String} methodName The method name for the loader you wish to remove
   *
   * @return {void}
   */


  Twig.Templates.unRegisterLoader = function (methodName) {
    if (this.isRegisteredLoader(methodName)) {
      delete this.loaders[methodName];
    }
  };
  /**
   * See if a loader is registered by its method name
   *
   * @param {String} methodName The name of the loader you are looking for
   *
   * @return {boolean}
   */


  Twig.Templates.isRegisteredLoader = function (methodName) {
    return Object.hasOwnProperty.call(this.loaders, methodName);
  };
  /**
   * Register a template parser
   *
   * @example
   * Twig.extend(function (Twig) {
   *    Twig.Templates.registerParser('custom_parser', function (params) {
   *        // this template source can be accessed in params.data
   *        var template = params.data
   *
   *        // ... custom process that modifies the template
   *
   *        // return the parsed template
   *        return template;
   *    });
   * });
   *
   * @param {String} methodName The method this parser is intended for (twig, source)
   * @param {Function} func The function to execute when parsing the template
   * @param {Object|undefined} scope Optional scope parameter to bind func to
   *
   * @throws Twig.Error
   *
   * @return {void}
   */


  Twig.Templates.registerParser = function (methodName, func, scope) {
    if (typeof func !== 'function') {
      throw new Twig.Error('Unable to add parser for ' + methodName + ': Invalid function regerence given.');
    }

    if (scope) {
      func = func.bind(scope);
    }

    this.parsers[methodName] = func;
  };
  /**
   * Remove a registered parser
   *
   * @param {String} methodName The method name for the parser you wish to remove
   *
   * @return {void}
   */


  Twig.Templates.unRegisterParser = function (methodName) {
    if (this.isRegisteredParser(methodName)) {
      delete this.parsers[methodName];
    }
  };
  /**
   * See if a parser is registered by its method name
   *
   * @param {String} methodName The name of the parser you are looking for
   *
   * @return {boolean}
   */


  Twig.Templates.isRegisteredParser = function (methodName) {
    return Object.hasOwnProperty.call(this.parsers, methodName);
  };
  /**
   * Save a template object to the store.
   *
   * @param {Twig.Template} template   The twig.js template to store.
   */


  Twig.Templates.save = function (template) {
    if (template.id === undefined) {
      throw new Twig.Error('Unable to save template with no id');
    }

    Twig.Templates.registry[template.id] = template;
  };
  /**
   * Load a previously saved template from the store.
   *
   * @param {string} id   The ID of the template to load.
   *
   * @return {Twig.Template} A twig.js template stored with the provided ID.
   */


  Twig.Templates.load = function (id) {
    if (!Object.hasOwnProperty.call(Twig.Templates.registry, id)) {
      return null;
    }

    return Twig.Templates.registry[id];
  };
  /**
   * Load a template from a remote location using AJAX and saves in with the given ID.
   *
   * Available parameters:
   *
   *      async:       Should the HTTP request be performed asynchronously.
   *                      Defaults to true.
   *      method:      What method should be used to load the template
   *                      (fs or ajax)
   *      parser:      What method should be used to parse the template
   *                      (twig or source)
   *      precompiled: Has the template already been compiled.
   *
   * @param {string} location  The remote URL to load as a template.
   * @param {Object} params The template parameters.
   * @param {function} callback  A callback triggered when the template finishes loading.
   * @param {function} errorCallback  A callback triggered if an error occurs loading the template.
   *
   *
   */


  Twig.Templates.loadRemote = function (location, params, callback, errorCallback) {
    // Default to the URL so the template is cached.
    var id = typeof params.id === 'undefined' ? location : params.id;
    var cached = Twig.Templates.registry[id]; // Check for existing template

    if (Twig.cache && typeof cached !== 'undefined') {
      // A template is already saved with the given id.
      if (typeof callback === 'function') {
        callback(cached);
      } // TODO: if async, return deferred promise


      return cached;
    } // If the parser name hasn't been set, default it to twig


    params.parser = params.parser || 'twig';
    params.id = id; // Default to async

    if (typeof params.async === 'undefined') {
      params.async = true;
    } // Assume 'fs' if the loader is not defined


    var loader = this.loaders[params.method] || this.loaders.fs;
    return loader.call(this, location, params, callback, errorCallback);
  }; // Determine object type


  function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }
  /**
   * A wrapper for template blocks.
   *
   * @param  {Twig.Template} The template that the block was originally defined in.
   * @param  {Object} The compiled block token.
   */


  Twig.Block = function (template, token) {
    this.template = template;
    this.token = token;
  };
  /**
   * Render the block using a specific parse state and context.
   *
   * @param  {Twig.ParseState} parseState
   * @param  {Object} context
   *
   * @return {Promise}
   */


  Twig.Block.prototype.render = function (parseState, context) {
    var originalTemplate = parseState.template;
    var promise;
    parseState.template = this.template;

    if (this.token.expression) {
      promise = Twig.expression.parseAsync.call(parseState, this.token.output, context);
    } else {
      promise = parseState.parseAsync(this.token.output, context);
    }

    return promise.then(function (value) {
      return Twig.expression.parseAsync.call(parseState, {
        type: Twig.expression.type.string,
        value: value
      }, context);
    }).then(function (output) {
      parseState.template = originalTemplate;
      return output;
    });
  };
  /**
   * Holds the state needed to parse a template.
   *
   * @param {Twig.Template} template The template that the tokens being parsed are associated with.
   * @param {Object} blockOverrides Any blocks that should override those defined in the associated template.
   */


  Twig.ParseState = function (template, blockOverrides, context) {
    this.renderedBlocks = {};
    this.overrideBlocks = blockOverrides === undefined ? {} : blockOverrides;
    this.context = context === undefined ? {} : context;
    this.macros = {};
    this.nestingStack = [];
    this.template = template;
  };
  /**
   * Get a block by its name, resolving in the following order:
   *     - override blocks specified when initialized (except when excluded)
   *     - blocks resolved from the associated template
   *     - blocks resolved from the parent template when extending
   *
   * @param {String} name The name of the block to return.
   * @param {Boolean} checkOnlyInheritedBlocks Whether to skip checking the overrides and associated template, will not skip by default.
   *
   * @return {Twig.Block|undefined}
   */


  Twig.ParseState.prototype.getBlock = function (name, checkOnlyInheritedBlocks) {
    var block;

    if (checkOnlyInheritedBlocks !== true) {
      // Blocks specified when initialized
      block = this.overrideBlocks[name];
    }

    if (block === undefined) {
      // Block defined by the associated template
      block = this.template.getBlock(name, checkOnlyInheritedBlocks);
    }

    if (block === undefined && this.template.parentTemplate !== null) {
      // Block defined in the parent template when extending
      block = this.template.parentTemplate.getBlock(name);
    }

    return block;
  };
  /**
   * Get all the available blocks, resolving in the following order:
   *     - override blocks specified when initialized
   *     - blocks resolved from the associated template
   *     - blocks resolved from the parent template when extending (except when excluded)
   *
   * @param {Boolean} includeParentBlocks Whether to get blocks from the parent template when extending, will always do so by default.
   *
   * @return {Object}
   */


  Twig.ParseState.prototype.getBlocks = function (includeParentBlocks) {
    var blocks = {};

    if (includeParentBlocks !== false && this.template.parentTemplate !== null && // Prevent infinite loop
    this.template.parentTemplate !== this.template) {
      // Blocks from the parent template when extending
      blocks = this.template.parentTemplate.getBlocks();
    }

    blocks = _objectSpread(_objectSpread(_objectSpread({}, blocks), this.template.getBlocks()), this.overrideBlocks);
    return blocks;
  };
  /**
   * Get the closest token of a specific type to the current nest level.
   *
   * @param  {String} type  The logic token type
   *
   * @return {Object}
   */


  Twig.ParseState.prototype.getNestingStackToken = function (type) {
    var matchingToken;
    this.nestingStack.forEach(function (token) {
      if (matchingToken === undefined && token.type === type) {
        matchingToken = token;
      }
    });
    return matchingToken;
  };
  /**
   * Parse a set of tokens using the current state.
   *
   * @param {Array} tokens The compiled tokens.
   * @param {Object} context The context to set the state to while parsing.
   * @param {Boolean} allowAsync Whether to parse asynchronously.
   * @param {Object} blocks Blocks that should override any defined while parsing.
   *
   * @return {String} The rendered tokens.
   *
   */


  Twig.ParseState.prototype.parse = function (tokens, context, allowAsync) {
    var state = this;
    var output = []; // Store any error that might be thrown by the promise chain.

    var err = null; // This will be set to isAsync if template renders synchronously

    var isAsync = true;
    var promise = null; // Track logic chains

    var chain = true;

    if (context) {
      state.context = context;
    }
    /*
     * Extracted into it's own function such that the function
     * does not get recreated over and over again in the `forEach`
     * loop below. This method can be compiled and optimized
     * a single time instead of being recreated on each iteration.
     */


    function outputPush(o) {
      output.push(o);
    }

    function parseTokenLogic(logic) {
      if (typeof logic.chain !== 'undefined') {
        chain = logic.chain;
      }

      if (typeof logic.context !== 'undefined') {
        state.context = logic.context;
      }

      if (typeof logic.output !== 'undefined') {
        output.push(logic.output);
      }
    }

    promise = Twig.async.forEach(tokens, function (token) {
      Twig.log.debug('Twig.ParseState.parse: ', 'Parsing token: ', token);

      switch (token.type) {
        case Twig.token.type.raw:
          output.push(Twig.filters.raw(token.value));
          break;

        case Twig.token.type.logic:
          return Twig.logic.parseAsync.call(state, token.token
          /* logicToken */
          , state.context, chain).then(parseTokenLogic);

        case Twig.token.type.comment:
          // Do nothing, comments should be ignored
          break;
        // Fall through whitespace to output

        case Twig.token.type.outputWhitespacePre:
        case Twig.token.type.outputWhitespacePost:
        case Twig.token.type.outputWhitespaceBoth:
        case Twig.token.type.output:
          Twig.log.debug('Twig.ParseState.parse: ', 'Output token: ', token.stack); // Parse the given expression in the given context

          return Twig.expression.parseAsync.call(state, token.stack, state.context).then(outputPush);

        default:
          break;
      }
    }).then(function () {
      output = Twig.output.call(state.template, output);
      isAsync = false;
      return output;
    })["catch"](function (error) {
      if (allowAsync) {
        handleException(state, error);
      }

      err = error;
    }); // If `allowAsync` we will always return a promise since we do not
    // know in advance if we are going to run asynchronously or not.

    if (allowAsync) {
      return promise;
    } // Handle errors here if we fail synchronously.


    if (err !== null) {
      return handleException(state, err);
    } // If `allowAsync` is not true we should not allow the user
    // to use asynchronous functions or filters.


    if (isAsync) {
      throw new Twig.Error('You are using Twig.js in sync mode in combination with async extensions.');
    }

    return output;
  };
  /**
   * Create a new twig.js template.
   *
   * Parameters: {
   *      data:   The template, either pre-compiled tokens or a string template
   *      id:     The name of this template
   * }
   *
   * @param {Object} params The template parameters.
   */


  Twig.Template = function (params) {
    var data = params.data,
        id = params.id,
        base = params.base,
        path = params.path,
        url = params.url,
        name = params.name,
        method = params.method,
        options = params.options; // # What is stored in a Twig.Template
    //
    // The Twig Template hold several chucks of data.
    //
    //     {
    //          id:     The token ID (if any)
    //          tokens: The list of tokens that makes up this template.
    //          base:   The base template (if any)
    //            options:  {
    //                Compiler/parser options
    //
    //                strict_variables: true/false
    //                    Should missing variable/keys emit an error message. If false, they default to null.
    //            }
    //     }
    //

    this.base = base;
    this.blocks = {
      defined: {},
      imported: {}
    };
    this.id = id;
    this.method = method;
    this.name = name;
    this.options = options;
    this.parentTemplate = null;
    this.path = path;
    this.url = url;

    if (is('String', data)) {
      this.tokens = Twig.prepare.call(this, data);
    } else {
      this.tokens = data;
    }

    if (id !== undefined) {
      Twig.Templates.save(this);
    }
  };
  /**
   * Get a block by its name, resolving in the following order:
   *     - blocks defined in the template itself
   *     - blocks imported from another template
   *
   * @param {String} name The name of the block to return.
   * @param {Boolean} checkOnlyInheritedBlocks Whether to skip checking the blocks defined in the template itself, will not skip by default.
   *
   * @return {Twig.Block|undefined}
   */


  Twig.Template.prototype.getBlock = function (name, checkOnlyInheritedBlocks) {
    var checkImports = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var block;

    if (checkOnlyInheritedBlocks !== true) {
      block = this.blocks.defined[name];
    }

    if (checkImports && block === undefined) {
      block = this.blocks.imported[name];
    }

    if (block === undefined && this.parentTemplate !== null) {
      /**
       * Block defined in the parent template when extending.
       * This recursion is useful to inherit from ascendants.
       * But take care of not considering ascendants' {% use %}
       */
      block = this.parentTemplate.getBlock(name, checkOnlyInheritedBlocks, checkImports = false);
    }

    return block;
  };
  /**
   * Get all the available blocks, resolving in the following order:
   *     - blocks defined in the template itself
   *     - blocks imported from other templates
   *
   * @return {Object}
   */


  Twig.Template.prototype.getBlocks = function () {
    var blocks = {};
    blocks = _objectSpread(_objectSpread(_objectSpread({}, blocks), this.blocks.imported), this.blocks.defined);
    return blocks;
  };

  Twig.Template.prototype.render = function (context, params, allowAsync) {
    var template = this;
    params = params || {};
    return Twig.async.potentiallyAsync(template, allowAsync, function () {
      var state = new Twig.ParseState(template, params.blocks, context);
      return state.parseAsync(template.tokens).then(function (output) {
        var parentTemplate;
        var url;

        if (template.parentTemplate !== null) {
          // This template extends another template
          if (template.options.allowInlineIncludes) {
            // The template is provided inline
            parentTemplate = Twig.Templates.load(template.parentTemplate);

            if (parentTemplate) {
              parentTemplate.options = template.options;
            }
          } // Check for the template file via include


          if (!parentTemplate) {
            url = Twig.path.parsePath(template, template.parentTemplate);
            parentTemplate = Twig.Templates.loadRemote(url, {
              method: template.getLoaderMethod(),
              base: template.base,
              async: false,
              id: url,
              options: template.options
            });
          }

          template.parentTemplate = parentTemplate;
          return template.parentTemplate.renderAsync(state.context, {
            blocks: state.getBlocks(false),
            isInclude: true
          });
        }

        if (params.isInclude === true) {
          return output;
        }

        return output.valueOf();
      });
    });
  };

  Twig.Template.prototype.importFile = function (file) {
    var url = null;
    var subTemplate;

    if (!this.url && this.options.allowInlineIncludes) {
      file = this.path ? Twig.path.parsePath(this, file) : file;
      subTemplate = Twig.Templates.load(file);

      if (!subTemplate) {
        subTemplate = Twig.Templates.loadRemote(url, {
          id: file,
          method: this.getLoaderMethod(),
          async: false,
          path: file,
          options: this.options
        });

        if (!subTemplate) {
          throw new Twig.Error('Unable to find the template ' + file);
        }
      }

      subTemplate.options = this.options;
      return subTemplate;
    }

    url = Twig.path.parsePath(this, file); // Load blocks from an external file

    subTemplate = Twig.Templates.loadRemote(url, {
      method: this.getLoaderMethod(),
      base: this.base,
      async: false,
      options: this.options,
      id: url
    });
    return subTemplate;
  };

  Twig.Template.prototype.getLoaderMethod = function () {
    if (this.path) {
      return 'fs';
    }

    if (this.url) {
      return 'ajax';
    }

    return this.method || 'fs';
  };

  Twig.Template.prototype.compile = function (options) {
    // Compile the template into raw JS
    return Twig.compiler.compile(this, options);
  };
  /**
   * Create safe output
   *
   * @param {string} Content safe to output
   *
   * @return {String} Content wrapped into a String
   */


  Twig.Markup = function (content, strategy) {
    if (typeof content !== 'string') {
      return content;
    }
    /* eslint-disable no-new-wrappers, unicorn/new-for-builtins */


    var output = new String(content);
    /* eslint-enable */

    output.twigMarkup = typeof strategy === 'undefined' ? true : strategy;
    return output;
  };

  return Twig;
};

/***/ }),

/***/ 858:
/***/ ((module) => {

"use strict";


// ## twig.exports.js
//
// This file provides extension points and other hooks into the twig functionality.
module.exports = function (Twig) {
  'use strict';

  Twig.exports = {
    VERSION: Twig.VERSION
  };
  /**
   * Create and compile a twig.js template.
   *
   * @param {Object} param Paramteres for creating a Twig template.
   *
   * @return {Twig.Template} A Twig template ready for rendering.
   */

  Twig.exports.twig = function (params) {
    'use strict';

    var id = params.id;
    var options = {
      strictVariables: params.strict_variables || false,
      // TODO: turn autoscape on in the next major version
      autoescape: params.autoescape !== null && params.autoescape || false,
      allowInlineIncludes: params.allowInlineIncludes || false,
      rethrow: params.rethrow || false,
      namespaces: params.namespaces
    };

    if (Twig.cache && id) {
      Twig.validateId(id);
    }

    if (params.debug !== undefined) {
      Twig.debug = params.debug;
    }

    if (params.trace !== undefined) {
      Twig.trace = params.trace;
    }

    if (params.data !== undefined) {
      return Twig.Templates.parsers.twig({
        data: params.data,
        path: Object.hasOwnProperty.call(params, 'path') ? params.path : undefined,
        module: params.module,
        id: id,
        options: options
      });
    }

    if (params.ref !== undefined) {
      if (params.id !== undefined) {
        throw new Twig.Error('Both ref and id cannot be set on a twig.js template.');
      }

      return Twig.Templates.load(params.ref);
    }

    if (params.method !== undefined) {
      if (!Twig.Templates.isRegisteredLoader(params.method)) {
        throw new Twig.Error('Loader for "' + params.method + '" is not defined.');
      }

      return Twig.Templates.loadRemote(params.name || params.href || params.path || id || undefined, {
        id: id,
        method: params.method,
        parser: params.parser || 'twig',
        base: params.base,
        module: params.module,
        precompiled: params.precompiled,
        async: params.async,
        options: options
      }, params.load, params.error);
    }

    if (params.href !== undefined) {
      return Twig.Templates.loadRemote(params.href, {
        id: id,
        method: 'ajax',
        parser: params.parser || 'twig',
        base: params.base,
        module: params.module,
        precompiled: params.precompiled,
        async: params.async,
        options: options
      }, params.load, params.error);
    }

    if (params.path !== undefined) {
      return Twig.Templates.loadRemote(params.path, {
        id: id,
        method: 'fs',
        parser: params.parser || 'twig',
        base: params.base,
        module: params.module,
        precompiled: params.precompiled,
        async: params.async,
        options: options
      }, params.load, params.error);
    }
  }; // Extend Twig with a new filter.


  Twig.exports.extendFilter = function (filter, definition) {
    Twig.filter.extend(filter, definition);
  }; // Extend Twig with a new function.


  Twig.exports.extendFunction = function (fn, definition) {
    Twig._function.extend(fn, definition);
  }; // Extend Twig with a new test.


  Twig.exports.extendTest = function (test, definition) {
    Twig.test.extend(test, definition);
  }; // Extend Twig with a new definition.


  Twig.exports.extendTag = function (definition) {
    Twig.logic.extend(definition);
  }; // Provide an environment for extending Twig core.
  // Calls fn with the internal Twig object.


  Twig.exports.extend = function (fn) {
    fn(Twig);
  };
  /**
   * Provide an extension for use with express 2.
   *
   * @param {string} markup The template markup.
   * @param {array} options The express options.
   *
   * @return {string} The rendered template.
   */


  Twig.exports.compile = function (markup, options) {
    var id = options.filename;
    var path = options.filename; // Try to load the template from the cache

    var template = new Twig.Template({
      data: markup,
      path: path,
      id: id,
      options: options.settings['twig options']
    }); // Twig.Templates.load(id) ||

    return function (context) {
      return template.render(context);
    };
  };
  /**
   * Provide an extension for use with express 3.
   *
   * @param {string} path The location of the template file on disk.
   * @param {Object|Function} The options or callback.
   * @param {Function} fn callback.
   *
   * @throws Twig.Error
   */


  Twig.exports.renderFile = function (path, options, fn) {
    // Handle callback in options
    if (typeof options === 'function') {
      fn = options;
      options = {};
    }

    options = options || {};
    var settings = options.settings || {}; // Mixin any options provided to the express app.

    var viewOptions = settings['twig options'];
    var params = {
      path: path,
      base: settings.views,
      load: function load(template) {
        // Render and return template as a simple string, see https://github.com/twigjs/twig.js/pull/348 for more information
        if (!viewOptions || !viewOptions.allowAsync) {
          fn(null, String(template.render(options)));
          return;
        }

        template.renderAsync(options).then(function (out) {
          return fn(null, out);
        }, fn);
      },
      error: function error(err) {
        fn(err);
      }
    };

    if (viewOptions) {
      for (var option in viewOptions) {
        if (Object.hasOwnProperty.call(viewOptions, option)) {
          params[option] = viewOptions[option];
        }
      }
    }

    Twig.exports.twig(params);
  }; // Express 3 handler


  Twig.exports.__express = Twig.exports.renderFile;
  /**
   * Shoud Twig.js cache templates.
   * Disable during development to see changes to templates without
   * reloading, and disable in production to improve performance.
   *
   * @param {boolean} cache
   */

  Twig.exports.cache = function (cache) {
    Twig.cache = cache;
  }; // We need to export the path module so we can effectively test it


  Twig.exports.path = Twig.path; // Export our filters.
  // Resolves #307

  Twig.exports.filters = Twig.filters; // Export our tests.

  Twig.exports.tests = Twig.tests; // Export our functions.

  Twig.exports.functions = Twig.functions;
  Twig.exports.Promise = Twig.Promise;
  return Twig;
};

/***/ }),

/***/ 769:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

var _typeof2 = _interopRequireDefault(__webpack_require__(8));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(319));

// ## twig.expression.js
//
// This file handles tokenizing, compiling and parsing expressions.
module.exports = function (Twig) {
  'use strict';

  function parseParams(state, params, context) {
    if (params) {
      return Twig.expression.parseAsync.call(state, params, context);
    }

    return Twig.Promise.resolve(false);
  }
  /**
   * Namespace for expression handling.
   */


  Twig.expression = {};

  __webpack_require__(35)(Twig);
  /**
   * Reserved word that can't be used as variable names.
   */


  Twig.expression.reservedWords = ['true', 'false', 'null', 'TRUE', 'FALSE', 'NULL', '_context', 'and', 'b-and', 'or', 'b-or', 'b-xor', 'in', 'not in', 'if', 'matches', 'starts', 'ends', 'with'];
  /**
   * The type of tokens used in expressions.
   */

  Twig.expression.type = {
    comma: 'Twig.expression.type.comma',
    operator: {
      unary: 'Twig.expression.type.operator.unary',
      binary: 'Twig.expression.type.operator.binary'
    },
    string: 'Twig.expression.type.string',
    bool: 'Twig.expression.type.bool',
    slice: 'Twig.expression.type.slice',
    array: {
      start: 'Twig.expression.type.array.start',
      end: 'Twig.expression.type.array.end'
    },
    object: {
      start: 'Twig.expression.type.object.start',
      end: 'Twig.expression.type.object.end'
    },
    parameter: {
      start: 'Twig.expression.type.parameter.start',
      end: 'Twig.expression.type.parameter.end'
    },
    subexpression: {
      start: 'Twig.expression.type.subexpression.start',
      end: 'Twig.expression.type.subexpression.end'
    },
    key: {
      period: 'Twig.expression.type.key.period',
      brackets: 'Twig.expression.type.key.brackets'
    },
    filter: 'Twig.expression.type.filter',
    _function: 'Twig.expression.type._function',
    variable: 'Twig.expression.type.variable',
    number: 'Twig.expression.type.number',
    _null: 'Twig.expression.type.null',
    context: 'Twig.expression.type.context',
    test: 'Twig.expression.type.test'
  };
  Twig.expression.set = {
    // What can follow an expression (in general)
    operations: [Twig.expression.type.filter, Twig.expression.type.operator.unary, Twig.expression.type.operator.binary, Twig.expression.type.array.end, Twig.expression.type.object.end, Twig.expression.type.parameter.end, Twig.expression.type.subexpression.end, Twig.expression.type.comma, Twig.expression.type.test],
    expressions: [Twig.expression.type._function, Twig.expression.type.bool, Twig.expression.type.string, Twig.expression.type.variable, Twig.expression.type.number, Twig.expression.type._null, Twig.expression.type.context, Twig.expression.type.parameter.start, Twig.expression.type.array.start, Twig.expression.type.object.start, Twig.expression.type.subexpression.start, Twig.expression.type.operator.unary]
  }; // Most expressions allow a '.' or '[' after them, so we provide a convenience set

  Twig.expression.set.operationsExtended = Twig.expression.set.operations.concat([Twig.expression.type.key.period, Twig.expression.type.key.brackets, Twig.expression.type.slice]); // Some commonly used compile and parse functions.

  Twig.expression.fn = {
    compile: {
      push: function push(token, stack, output) {
        output.push(token);
      },
      pushBoth: function pushBoth(token, stack, output) {
        output.push(token);
        stack.push(token);
      }
    },
    parse: {
      push: function push(token, stack) {
        stack.push(token);
      },
      pushValue: function pushValue(token, stack) {
        stack.push(token.value);
      }
    }
  }; // The regular expressions and compile/parse logic used to match tokens in expressions.
  //
  // Properties:
  //
  //      type:  The type of expression this matches
  //
  //      regex: One or more regular expressions that matche the format of the token.
  //
  //      next:  Valid tokens that can occur next in the expression.
  //
  // Functions:
  //
  //      compile: A function that compiles the raw regular expression match into a token.
  //
  //      parse:   A function that parses the compiled token into output.
  //

  Twig.expression.definitions = [{
    type: Twig.expression.type.test,
    regex: /^is\s+(not)?\s*([a-zA-Z_]\w*(\s?(?:as|by))?)/,
    next: Twig.expression.set.operations.concat([Twig.expression.type.parameter.start]),
    compile: function compile(token, stack, output) {
      token.filter = token.match[2];
      token.modifier = token.match[1];
      delete token.match;
      delete token.value;
      output.push(token);
    },
    parse: function parse(token, stack, context) {
      var value = stack.pop();
      var state = this;
      return parseParams(state, token.params, context).then(function (params) {
        var result = Twig.test(token.filter, value, params);

        if (token.modifier === 'not') {
          stack.push(!result);
        } else {
          stack.push(result);
        }
      });
    }
  }, {
    type: Twig.expression.type.comma,
    // Match a comma
    regex: /^,/,
    next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end, Twig.expression.type.object.end]),
    compile: function compile(token, stack, output) {
      var i = stack.length - 1;
      var stackToken;
      delete token.match;
      delete token.value; // Pop tokens off the stack until the start of the object

      for (; i >= 0; i--) {
        stackToken = stack.pop();

        if (stackToken.type === Twig.expression.type.object.start || stackToken.type === Twig.expression.type.parameter.start || stackToken.type === Twig.expression.type.array.start) {
          stack.push(stackToken);
          break;
        }

        output.push(stackToken);
      }

      output.push(token);
    }
  }, {
    /**
     * Match a number (integer or decimal)
     */
    type: Twig.expression.type.number,
    // Match a number
    regex: /^-?\d+(\.\d+)?/,
    next: Twig.expression.set.operations,
    compile: function compile(token, stack, output) {
      token.value = Number(token.value);
      output.push(token);
    },
    parse: Twig.expression.fn.parse.pushValue
  }, {
    type: Twig.expression.type.operator.binary,
    // Match any of ??, ?:, +, *, /, -, %, ~, <, <=, >, >=, !=, ==, **, ?, :, and, b-and, or, b-or, b-xor, in, not in
    // and, or, in, not in, matches, starts with, ends with can be followed by a space or parenthesis
    regex: /(^\?\?|^\?:|^(b-and)|^(b-or)|^(b-xor)|^[+\-~%?]|^[:](?!\d\])|^[!=]==?|^[!<>]=?|^\*\*?|^\/\/?|^(and)[(|\s+]|^(or)[(|\s+]|^(in)[(|\s+]|^(not in)[(|\s+]|^(matches)|^(starts with)|^(ends with)|^\.\.)/,
    next: Twig.expression.set.expressions,
    transform: function transform(match, tokens) {
      switch (match[0]) {
        case 'and(':
        case 'or(':
        case 'in(':
        case 'not in(':
          // Strip off the ( if it exists
          tokens[tokens.length - 1].value = match[2];
          return match[0];

        default:
          return '';
      }
    },
    compile: function compile(token, stack, output) {
      delete token.match;
      token.value = token.value.trim();
      var value = token.value;
      var operator = Twig.expression.operator.lookup(value, token);
      Twig.log.trace('Twig.expression.compile: ', 'Operator: ', operator, ' from ', value);

      while (stack.length > 0 && (stack[stack.length - 1].type === Twig.expression.type.operator.unary || stack[stack.length - 1].type === Twig.expression.type.operator.binary) && (operator.associativity === Twig.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
        var temp = stack.pop();
        output.push(temp);
      }

      if (value === ':') {
        // Check if this is a ternary or object key being set
        if (stack[stack.length - 1] && stack[stack.length - 1].value === '?') {// Continue as normal for a ternary
        } else {
          // This is not a ternary so we push the token to the output where it can be handled
          //   when the assocated object is closed.
          var keyToken = output.pop();

          if (keyToken.type === Twig.expression.type.string || keyToken.type === Twig.expression.type.variable) {
            token.key = keyToken.value;
          } else if (keyToken.type === Twig.expression.type.number) {
            // Convert integer keys into string keys
            token.key = keyToken.value.toString();
          } else if (keyToken.expression && (keyToken.type === Twig.expression.type.parameter.end || keyToken.type === Twig.expression.type.subexpression.end)) {
            token.params = keyToken.params;
          } else {
            throw new Twig.Error('Unexpected value before \':\' of ' + keyToken.type + ' = ' + keyToken.value);
          }

          output.push(token);
        }
      } else {
        stack.push(operator);
      }
    },
    parse: function parse(token, stack, context) {
      var state = this;

      if (token.key) {
        // Handle ternary ':' operator
        stack.push(token);
      } else if (token.params) {
        // Handle "{(expression):value}"
        return Twig.expression.parseAsync.call(state, token.params, context).then(function (key) {
          token.key = key;
          stack.push(token); // If we're in a loop, we might need token.params later, especially in this form of "(expression):value"

          if (!context.loop) {
            delete token.params;
          }
        });
      } else {
        Twig.expression.operator.parse(token.value, stack);
      }
    }
  }, {
    type: Twig.expression.type.operator.unary,
    // Match any of not
    regex: /(^not\s+)/,
    next: Twig.expression.set.expressions,
    compile: function compile(token, stack, output) {
      delete token.match;
      token.value = token.value.trim();
      var value = token.value;
      var operator = Twig.expression.operator.lookup(value, token);
      Twig.log.trace('Twig.expression.compile: ', 'Operator: ', operator, ' from ', value);

      while (stack.length > 0 && (stack[stack.length - 1].type === Twig.expression.type.operator.unary || stack[stack.length - 1].type === Twig.expression.type.operator.binary) && (operator.associativity === Twig.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
        var temp = stack.pop();
        output.push(temp);
      }

      stack.push(operator);
    },
    parse: function parse(token, stack) {
      Twig.expression.operator.parse(token.value, stack);
    }
  }, {
    /**
     * Match a string. This is anything between a pair of single or double quotes.
     */
    type: Twig.expression.type.string,
    // See: http://blog.stevenlevithan.com/archives/match-quoted-string
    regex: /^(["'])(?:(?=(\\?))\2[\s\S])*?\1/,
    next: Twig.expression.set.operationsExtended,
    compile: function compile(token, stack, output) {
      var value = token.value;
      delete token.match; // Remove the quotes from the string

      if (value.slice(0, 1) === '"') {
        value = value.replace('\\"', '"');
      } else {
        value = value.replace('\\\'', '\'');
      }

      token.value = value.slice(1, -1).replace(/\\n/g, '\n').replace(/\\r/g, '\r');
      Twig.log.trace('Twig.expression.compile: ', 'String value: ', token.value);
      output.push(token);
    },
    parse: Twig.expression.fn.parse.pushValue
  }, {
    /**
     * Match a subexpression set start.
     */
    type: Twig.expression.type.subexpression.start,
    regex: /^\(/,
    next: Twig.expression.set.expressions.concat([Twig.expression.type.subexpression.end]),
    compile: function compile(token, stack, output) {
      token.value = '(';
      output.push(token);
      stack.push(token);
    },
    parse: Twig.expression.fn.parse.push
  }, {
    /**
     * Match a subexpression set end.
     */
    type: Twig.expression.type.subexpression.end,
    regex: /^\)/,
    next: Twig.expression.set.operationsExtended,
    validate: function validate(match, tokens) {
      // Iterate back through previous tokens to ensure we follow a subexpression start
      var i = tokens.length - 1;
      var foundSubexpressionStart = false;
      var nextSubexpressionStartInvalid = false;
      var unclosedParameterCount = 0;

      while (!foundSubexpressionStart && i >= 0) {
        var token = tokens[i];
        foundSubexpressionStart = token.type === Twig.expression.type.subexpression.start; // If we have previously found a subexpression end, then this subexpression start is the start of
        // that subexpression, not the subexpression we are searching for

        if (foundSubexpressionStart && nextSubexpressionStartInvalid) {
          nextSubexpressionStartInvalid = false;
          foundSubexpressionStart = false;
        } // Count parameter tokens to ensure we dont return truthy for a parameter opener


        if (token.type === Twig.expression.type.parameter.start) {
          unclosedParameterCount++;
        } else if (token.type === Twig.expression.type.parameter.end) {
          unclosedParameterCount--;
        } else if (token.type === Twig.expression.type.subexpression.end) {
          nextSubexpressionStartInvalid = true;
        }

        i--;
      } // If we found unclosed parameters, return false
      // If we didnt find subexpression start, return false
      // Otherwise return true


      return foundSubexpressionStart && unclosedParameterCount === 0;
    },
    compile: function compile(token, stack, output) {
      // This is basically a copy of parameter end compilation
      var stackToken;
      var endToken = token;
      stackToken = stack.pop();

      while (stack.length > 0 && stackToken.type !== Twig.expression.type.subexpression.start) {
        output.push(stackToken);
        stackToken = stack.pop();
      } // Move contents of parens into preceding filter


      var paramStack = [];

      while (token.type !== Twig.expression.type.subexpression.start) {
        // Add token to arguments stack
        paramStack.unshift(token);
        token = output.pop();
      }

      paramStack.unshift(token); // If the token at the top of the *stack* is a function token, pop it onto the output queue.
      // Get the token preceding the parameters

      stackToken = stack[stack.length - 1];

      if (stackToken === undefined || stackToken.type !== Twig.expression.type._function && stackToken.type !== Twig.expression.type.filter && stackToken.type !== Twig.expression.type.test && stackToken.type !== Twig.expression.type.key.brackets) {
        endToken.expression = true; // Remove start and end token from stack

        paramStack.pop();
        paramStack.shift();
        endToken.params = paramStack;
        output.push(endToken);
      } else {
        // This should never be hit
        endToken.expression = false;
        stackToken.params = paramStack;
      }
    },
    parse: function parse(token, stack, context) {
      var state = this;

      if (token.expression) {
        return Twig.expression.parseAsync.call(state, token.params, context).then(function (value) {
          stack.push(value);
        });
      }

      throw new Twig.Error('Unexpected subexpression end when token is not marked as an expression');
    }
  }, {
    /**
     * Match a parameter set start.
     */
    type: Twig.expression.type.parameter.start,
    regex: /^\(/,
    next: Twig.expression.set.expressions.concat([Twig.expression.type.parameter.end]),
    validate: function validate(match, tokens) {
      var lastToken = tokens[tokens.length - 1]; // We can't use the regex to test if we follow a space because expression is trimmed

      return lastToken && !Twig.expression.reservedWords.includes(lastToken.value.trim());
    },
    compile: Twig.expression.fn.compile.pushBoth,
    parse: Twig.expression.fn.parse.push
  }, {
    /**
     * Match a parameter set end.
     */
    type: Twig.expression.type.parameter.end,
    regex: /^\)/,
    next: Twig.expression.set.operationsExtended,
    compile: function compile(token, stack, output) {
      var stackToken;
      var endToken = token;
      stackToken = stack.pop();

      while (stack.length > 0 && stackToken.type !== Twig.expression.type.parameter.start) {
        output.push(stackToken);
        stackToken = stack.pop();
      } // Move contents of parens into preceding filter


      var paramStack = [];

      while (token.type !== Twig.expression.type.parameter.start) {
        // Add token to arguments stack
        paramStack.unshift(token);
        token = output.pop();
      }

      paramStack.unshift(token); // Get the token preceding the parameters

      token = output[output.length - 1];

      if (token === undefined || token.type !== Twig.expression.type._function && token.type !== Twig.expression.type.filter && token.type !== Twig.expression.type.test && token.type !== Twig.expression.type.key.brackets) {
        endToken.expression = true; // Remove start and end token from stack

        paramStack.pop();
        paramStack.shift();
        endToken.params = paramStack;
        output.push(endToken);
      } else {
        endToken.expression = false;
        token.params = paramStack;
      }
    },
    parse: function parse(token, stack, context) {
      var newArray = [];
      var arrayEnded = false;
      var value = null;
      var state = this;

      if (token.expression) {
        return Twig.expression.parseAsync.call(state, token.params, context).then(function (value) {
          stack.push(value);
        });
      }

      while (stack.length > 0) {
        value = stack.pop(); // Push values into the array until the start of the array

        if (value && value.type && value.type === Twig.expression.type.parameter.start) {
          arrayEnded = true;
          break;
        }

        newArray.unshift(value);
      }

      if (!arrayEnded) {
        throw new Twig.Error('Expected end of parameter set.');
      }

      stack.push(newArray);
    }
  }, {
    type: Twig.expression.type.slice,
    regex: /^\[(\d*:\d*)\]/,
    next: Twig.expression.set.operationsExtended,
    compile: function compile(token, stack, output) {
      var sliceRange = token.match[1].split(':'); // SliceStart can be undefined when we pass parameters to the slice filter later

      var sliceStart = sliceRange[0] ? parseInt(sliceRange[0], 10) : undefined;
      var sliceEnd = sliceRange[1] ? parseInt(sliceRange[1], 10) : undefined;
      token.value = 'slice';
      token.params = [sliceStart, sliceEnd]; // SliceEnd can't be undefined as the slice filter doesn't check for this, but it does check the length
      // of the params array, so just shorten it.

      if (!sliceEnd) {
        token.params = [sliceStart];
      }

      output.push(token);
    },
    parse: function parse(token, stack) {
      var input = stack.pop();
      var params = token.params;
      var state = this;
      stack.push(Twig.filter.call(state, token.value, input, params));
    }
  }, {
    /**
     * Match an array start.
     */
    type: Twig.expression.type.array.start,
    regex: /^\[/,
    next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end]),
    compile: Twig.expression.fn.compile.pushBoth,
    parse: Twig.expression.fn.parse.push
  }, {
    /**
     * Match an array end.
     */
    type: Twig.expression.type.array.end,
    regex: /^\]/,
    next: Twig.expression.set.operationsExtended,
    compile: function compile(token, stack, output) {
      var i = stack.length - 1;
      var stackToken; // Pop tokens off the stack until the start of the object

      for (; i >= 0; i--) {
        stackToken = stack.pop();

        if (stackToken.type === Twig.expression.type.array.start) {
          break;
        }

        output.push(stackToken);
      }

      output.push(token);
    },
    parse: function parse(token, stack) {
      var newArray = [];
      var arrayEnded = false;
      var value = null;

      while (stack.length > 0) {
        value = stack.pop(); // Push values into the array until the start of the array

        if (value && value.type && value.type === Twig.expression.type.array.start) {
          arrayEnded = true;
          break;
        }

        newArray.unshift(value);
      }

      if (!arrayEnded) {
        throw new Twig.Error('Expected end of array.');
      }

      stack.push(newArray);
    }
  }, // Token that represents the start of a hash map '}'
  //
  // Hash maps take the form:
  //    { "key": 'value', "another_key": item }
  //
  // Keys must be quoted (either single or double) and values can be any expression.
  {
    type: Twig.expression.type.object.start,
    regex: /^\{/,
    next: Twig.expression.set.expressions.concat([Twig.expression.type.object.end]),
    compile: Twig.expression.fn.compile.pushBoth,
    parse: Twig.expression.fn.parse.push
  }, // Token that represents the end of a Hash Map '}'
  //
  // This is where the logic for building the internal
  // representation of a hash map is defined.
  {
    type: Twig.expression.type.object.end,
    regex: /^\}/,
    next: Twig.expression.set.operationsExtended,
    compile: function compile(token, stack, output) {
      var i = stack.length - 1;
      var stackToken; // Pop tokens off the stack until the start of the object

      for (; i >= 0; i--) {
        stackToken = stack.pop();

        if (stackToken && stackToken.type === Twig.expression.type.object.start) {
          break;
        }

        output.push(stackToken);
      }

      output.push(token);
    },
    parse: function parse(endToken, stack) {
      var newObject = {};
      var objectEnded = false;
      var token = null;
      var hasValue = false;
      var value = null;

      while (stack.length > 0) {
        token = stack.pop(); // Push values into the array until the start of the object

        if (token && token.type && token.type === Twig.expression.type.object.start) {
          objectEnded = true;
          break;
        }

        if (token && token.type && (token.type === Twig.expression.type.operator.binary || token.type === Twig.expression.type.operator.unary) && token.key) {
          if (!hasValue) {
            throw new Twig.Error('Missing value for key \'' + token.key + '\' in object definition.');
          }

          newObject[token.key] = value; // Preserve the order that elements are added to the map
          // This is necessary since JavaScript objects don't
          // guarantee the order of keys

          if (newObject._keys === undefined) {
            newObject._keys = [];
          }

          newObject._keys.unshift(token.key); // Reset value check


          value = null;
          hasValue = false;
        } else {
          hasValue = true;
          value = token;
        }
      }

      if (!objectEnded) {
        throw new Twig.Error('Unexpected end of object.');
      }

      stack.push(newObject);
    }
  }, // Token representing a filter
  //
  // Filters can follow any expression and take the form:
  //    expression|filter(optional, args)
  //
  // Filter parsing is done in the Twig.filters namespace.
  {
    type: Twig.expression.type.filter,
    // Match a | then a letter or _, then any number of letters, numbers, _ or -
    regex: /^\|\s?([a-zA-Z_][a-zA-Z0-9_-]*)/,
    next: Twig.expression.set.operationsExtended.concat([Twig.expression.type.parameter.start]),
    compile: function compile(token, stack, output) {
      token.value = token.match[1];
      output.push(token);
    },
    parse: function parse(token, stack, context) {
      var input = stack.pop();
      var state = this;
      return parseParams(state, token.params, context).then(function (params) {
        return Twig.filter.call(state, token.value, input, params);
      }).then(function (value) {
        stack.push(value);
      });
    }
  }, {
    type: Twig.expression.type._function,
    // Match any letter or _, then any number of letters, numbers, _ or - followed by (
    regex: /^([a-zA-Z_]\w*)\s*\(/,
    next: Twig.expression.type.parameter.start,
    validate: function validate(match) {
      // Make sure this function is not a reserved word
      return match[1] && !Twig.expression.reservedWords.includes(match[1]);
    },
    transform: function transform() {
      return '(';
    },
    compile: function compile(token, stack, output) {
      var fn = token.match[1];
      token.fn = fn; // Cleanup token

      delete token.match;
      delete token.value;
      output.push(token);
    },
    parse: function parse(token, stack, context) {
      var state = this;
      var fn = token.fn;
      var value;
      return parseParams(state, token.params, context).then(function (params) {
        if (Twig.functions[fn]) {
          // Get the function from the built-in functions
          value = Twig.functions[fn].apply(state, params);
        } else if (typeof context[fn] === 'function') {
          // Get the function from the user/context defined functions
          value = context[fn].apply(context, (0, _toConsumableArray2["default"])(params));
        } else {
          throw new Twig.Error(fn + ' function does not exist and is not defined in the context');
        }

        return value;
      }).then(function (result) {
        stack.push(result);
      });
    }
  }, // Token representing a variable.
  //
  // Variables can contain letters, numbers, underscores and
  // dashes, but must start with a letter or underscore.
  //
  // Variables are retrieved from the render context and take
  // the value of 'undefined' if the given variable doesn't
  // exist in the context.
  {
    type: Twig.expression.type.variable,
    // Match any letter or _, then any number of letters, numbers, _ or -
    regex: /^[a-zA-Z_]\w*/,
    next: Twig.expression.set.operationsExtended.concat([Twig.expression.type.parameter.start]),
    compile: Twig.expression.fn.compile.push,
    validate: function validate(match) {
      return !Twig.expression.reservedWords.includes(match[0]);
    },
    parse: function parse(token, stack, context) {
      var state = this; // Get the variable from the context

      return Twig.expression.resolveAsync.call(state, context[token.value], context).then(function (value) {
        if (state.template.options.strictVariables && value === undefined) {
          throw new Twig.Error('Variable "' + token.value + '" does not exist.');
        }

        stack.push(value);
      });
    }
  }, {
    type: Twig.expression.type.key.period,
    regex: /^\.(\w+)/,
    next: Twig.expression.set.operationsExtended.concat([Twig.expression.type.parameter.start]),
    compile: function compile(token, stack, output) {
      token.key = token.match[1];
      delete token.match;
      delete token.value;
      output.push(token);
    },
    parse: function parse(token, stack, context, nextToken) {
      var state = this;
      var key = token.key;
      var object = stack.pop();
      var value;

      if (object && !Object.prototype.hasOwnProperty.call(object, key) && state.template.options.strictVariables) {
        var keys = Object.keys(object);

        if (keys.length > 0) {
          throw new Twig.Error('Key "' + key + '" for object with keys "' + Object.keys(object).join(', ') + '" does not exist.');
        } else {
          throw new Twig.Error('Key "' + key + '" does not exist as the object is empty.');
        }
      }

      return parseParams(state, token.params, context).then(function (params) {
        if (object === null || object === undefined) {
          value = undefined;
        } else {
          var capitalize = function capitalize(value) {
            return value.slice(0, 1).toUpperCase() + value.slice(1);
          }; // Get the variable from the context


          if ((0, _typeof2["default"])(object) === 'object' && key in object) {
            value = object[key];
          } else if (object['get' + capitalize(key)]) {
            value = object['get' + capitalize(key)];
          } else if (object['is' + capitalize(key)]) {
            value = object['is' + capitalize(key)];
          } else {
            value = undefined;
          }
        } // When resolving an expression we need to pass nextToken in case the expression is a function


        return Twig.expression.resolveAsync.call(state, value, context, params, nextToken, object);
      }).then(function (result) {
        stack.push(result);
      });
    }
  }, {
    type: Twig.expression.type.key.brackets,
    regex: /^\[([^\]:]*)\]/,
    next: Twig.expression.set.operationsExtended.concat([Twig.expression.type.parameter.start]),
    compile: function compile(token, stack, output) {
      var match = token.match[1];
      delete token.value;
      delete token.match; // The expression stack for the key

      token.stack = Twig.expression.compile({
        value: match
      }).stack;
      output.push(token);
    },
    parse: function parse(token, stack, context, nextToken) {
      // Evaluate key
      var state = this;
      var params = null;
      var object;
      var value;
      return parseParams(state, token.params, context).then(function (parameters) {
        params = parameters;
        return Twig.expression.parseAsync.call(state, token.stack, context);
      }).then(function (key) {
        object = stack.pop();

        if (object && !Object.prototype.hasOwnProperty.call(object, key) && state.template.options.strictVariables) {
          var keys = Object.keys(object);

          if (keys.length > 0) {
            throw new Twig.Error('Key "' + key + '" for array with keys "' + keys.join(', ') + '" does not exist.');
          } else {
            throw new Twig.Error('Key "' + key + '" does not exist as the array is empty.');
          }
        } else if (object === null || object === undefined) {
          return null;
        } // Get the variable from the context


        if ((0, _typeof2["default"])(object) === 'object' && key in object) {
          value = object[key];
        } else {
          value = null;
        } // When resolving an expression we need to pass nextToken in case the expression is a function


        return Twig.expression.resolveAsync.call(state, value, object, params, nextToken);
      }).then(function (result) {
        stack.push(result);
      });
    }
  }, {
    /**
     * Match a null value.
     */
    type: Twig.expression.type._null,
    // Match a number
    regex: /^(null|NULL|none|NONE)/,
    next: Twig.expression.set.operations,
    compile: function compile(token, stack, output) {
      delete token.match;
      token.value = null;
      output.push(token);
    },
    parse: Twig.expression.fn.parse.pushValue
  }, {
    /**
     * Match the context
     */
    type: Twig.expression.type.context,
    regex: /^_context/,
    next: Twig.expression.set.operationsExtended.concat([Twig.expression.type.parameter.start]),
    compile: Twig.expression.fn.compile.push,
    parse: function parse(token, stack, context) {
      stack.push(context);
    }
  }, {
    /**
     * Match a boolean
     */
    type: Twig.expression.type.bool,
    regex: /^(true|TRUE|false|FALSE)/,
    next: Twig.expression.set.operations,
    compile: function compile(token, stack, output) {
      token.value = token.match[0].toLowerCase() === 'true';
      delete token.match;
      output.push(token);
    },
    parse: Twig.expression.fn.parse.pushValue
  }];
  /**
   * Resolve a context value.
   *
   * If the value is a function, it is executed with a context parameter.
   *
   * @param {string} key The context object key.
   * @param {Object} context The render context.
   */

  Twig.expression.resolveAsync = function (value, context, params, nextToken, object) {
    var state = this;

    if (typeof value !== 'function') {
      return Twig.Promise.resolve(value);
    }

    var promise = Twig.Promise.resolve(params);
    /*
    If value is a function, it will have been impossible during the compile stage to determine that a following
    set of parentheses were parameters for this function.
     Those parentheses will have therefore been marked as an expression, with their own parameters, which really
    belong to this function.
     Those parameters will also need parsing in case they are actually an expression to pass as parameters.
        */

    if (nextToken && nextToken.type === Twig.expression.type.parameter.end) {
      // When parsing these parameters, we need to get them all back, not just the last item on the stack.
      var tokensAreParameters = true;
      promise = promise.then(function () {
        return nextToken.params && Twig.expression.parseAsync.call(state, nextToken.params, context, tokensAreParameters);
      }).then(function (p) {
        // Clean up the parentheses tokens on the next loop
        nextToken.cleanup = true;
        return p;
      });
    }

    return promise.then(function (params) {
      return value.apply(object || context, params || []);
    });
  };

  Twig.expression.resolve = function (value, context, params, nextToken, object) {
    return Twig.async.potentiallyAsync(this, false, function () {
      return Twig.expression.resolveAsync.call(this, value, context, params, nextToken, object);
    });
  };
  /**
   * Registry for logic handlers.
   */


  Twig.expression.handler = {};
  /**
   * Define a new expression type, available at Twig.logic.type.{type}
   *
   * @param {string} type The name of the new type.
   */

  Twig.expression.extendType = function (type) {
    Twig.expression.type[type] = 'Twig.expression.type.' + type;
  };
  /**
   * Extend the expression parsing functionality with a new definition.
   *
   * Token definitions follow this format:
   *  {
   *      type:     One of Twig.expression.type.[type], either pre-defined or added using
   *                    Twig.expression.extendType
   *
   *      next:     Array of types from Twig.expression.type that can follow this token,
   *
   *      regex:    A regex or array of regex's that should match the token.
   *
   *      compile: function(token, stack, output) called when this token is being compiled.
   *                   Should return an object with stack and output set.
   *
   *      parse:   function(token, stack, context) called when this token is being parsed.
   *                   Should return an object with stack and context set.
   *  }
   *
   * @param {Object} definition A token definition.
   */


  Twig.expression.extend = function (definition) {
    if (!definition.type) {
      throw new Twig.Error('Unable to extend logic definition. No type provided for ' + definition);
    }

    Twig.expression.handler[definition.type] = definition;
  }; // Extend with built-in expressions


  while (Twig.expression.definitions.length > 0) {
    Twig.expression.extend(Twig.expression.definitions.shift());
  }
  /**
   * Break an expression into tokens defined in Twig.expression.definitions.
   *
   * @param {string} expression The string to tokenize.
   *
   * @return {Array} An array of tokens.
   */


  Twig.expression.tokenize = function (expression) {
    var tokens = []; // Keep an offset of the location in the expression for error messages.

    var expOffset = 0; // The valid next tokens of the previous token

    var next = null; // Match information

    var type;
    var regex;
    var regexI; // The possible next token for the match

    var tokenNext; // Has a match been found from the definitions

    var matchFound;
    var invalidMatches = [];

    var matchFunction = function matchFunction() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Don't pass arguments to `Array.slice`, that is a performance killer
      var matchI = arguments.length - 2;
      var match = new Array(matchI);

      while (matchI-- > 0) {
        match[matchI] = args[matchI];
      }

      Twig.log.trace('Twig.expression.tokenize', 'Matched a ', type, ' regular expression of ', match);

      if (next && !next.includes(type)) {
        invalidMatches.push(type + ' cannot follow a ' + tokens[tokens.length - 1].type + ' at template:' + expOffset + ' near \'' + match[0].slice(0, 20) + '...\''); // Not a match, don't change the expression

        return match[0];
      }

      var handler = Twig.expression.handler[type]; // Validate the token if a validation function is provided

      if (handler.validate && !handler.validate(match, tokens)) {
        return match[0];
      }

      invalidMatches = [];
      tokens.push({
        type: type,
        value: match[0],
        match: match
      });
      matchFound = true;
      next = tokenNext;
      expOffset += match[0].length; // Does the token need to return output back to the expression string
      // e.g. a function match of cycle( might return the '(' back to the expression
      // This allows look-ahead to differentiate between token types (e.g. functions and variable names)

      if (handler.transform) {
        return handler.transform(match, tokens);
      }

      return '';
    };

    Twig.log.debug('Twig.expression.tokenize', 'Tokenizing expression ', expression);

    while (expression.length > 0) {
      expression = expression.trim();

      for (type in Twig.expression.handler) {
        if (Object.hasOwnProperty.call(Twig.expression.handler, type)) {
          tokenNext = Twig.expression.handler[type].next;
          regex = Twig.expression.handler[type].regex;
          Twig.log.trace('Checking type ', type, ' on ', expression);
          matchFound = false;

          if (Array.isArray(regex)) {
            regexI = regex.length;

            while (regexI-- > 0) {
              expression = expression.replace(regex[regexI], matchFunction);
            }
          } else {
            expression = expression.replace(regex, matchFunction);
          } // An expression token has been matched. Break the for loop and start trying to
          //  match the next template (if expression isn't empty.)


          if (matchFound) {
            break;
          }
        }
      }

      if (!matchFound) {
        if (invalidMatches.length > 0) {
          throw new Twig.Error(invalidMatches.join(' OR '));
        } else {
          throw new Twig.Error('Unable to parse \'' + expression + '\' at template position' + expOffset);
        }
      }
    }

    Twig.log.trace('Twig.expression.tokenize', 'Tokenized to ', tokens);
    return tokens;
  };
  /**
   * Compile an expression token.
   *
   * @param {Object} rawToken The uncompiled token.
   *
   * @return {Object} The compiled token.
   */


  Twig.expression.compile = function (rawToken) {
    var expression = rawToken.value; // Tokenize expression

    var tokens = Twig.expression.tokenize(expression);
    var token = null;
    var output = [];
    var stack = [];
    var tokenTemplate = null;
    Twig.log.trace('Twig.expression.compile: ', 'Compiling ', expression); // Push tokens into RPN stack using the Shunting-yard algorithm
    // See http://en.wikipedia.org/wiki/Shunting_yard_algorithm

    while (tokens.length > 0) {
      token = tokens.shift();
      tokenTemplate = Twig.expression.handler[token.type];
      Twig.log.trace('Twig.expression.compile: ', 'Compiling ', token); // Compile the template

      tokenTemplate.compile(token, stack, output);
      Twig.log.trace('Twig.expression.compile: ', 'Stack is', stack);
      Twig.log.trace('Twig.expression.compile: ', 'Output is', output);
    }

    while (stack.length > 0) {
      output.push(stack.pop());
    }

    Twig.log.trace('Twig.expression.compile: ', 'Final output is', output);
    rawToken.stack = output;
    delete rawToken.value;
    return rawToken;
  };
  /**
   * Parse an RPN expression stack within a context.
   *
   * @param {Array} tokens An array of compiled expression tokens.
   * @param {Object} context The render context to parse the tokens with.
   *
   * @return {Object} The result of parsing all the tokens. The result
   *                  can be anything, String, Array, Object, etc... based on
   *                  the given expression.
   */


  Twig.expression.parse = function (tokens, context, tokensAreParameters, allowAsync) {
    var state = this; // If the token isn't an array, make it one.

    if (!Array.isArray(tokens)) {
      tokens = [tokens];
    } // The output stack


    var stack = [];
    var loopTokenFixups = [];
    var binaryOperator = Twig.expression.type.operator.binary;
    return Twig.async.potentiallyAsync(state, allowAsync, function () {
      return Twig.async.forEach(tokens, function (token, index) {
        var tokenTemplate = null;
        var nextToken = null;
        var result; // If the token is marked for cleanup, we don't need to parse it

        if (token.cleanup) {
          return;
        } // Determine the token that follows this one so that we can pass it to the parser


        if (tokens.length > index + 1) {
          nextToken = tokens[index + 1];
        }

        tokenTemplate = Twig.expression.handler[token.type];

        if (tokenTemplate.parse) {
          result = tokenTemplate.parse.call(state, token, stack, context, nextToken);
        } // Store any binary tokens for later if we are in a loop.


        if (token.type === binaryOperator && context.loop) {
          loopTokenFixups.push(token);
        }

        return result;
      }).then(function () {
        // Check every fixup and remove "key" as long as they still have "params". This covers the use case where
        // a ":" operator is used in a loop with a "(expression):" statement. We need to be able to evaluate the expression
        var len = loopTokenFixups.length;
        var loopTokenFixup = null;

        while (len-- > 0) {
          loopTokenFixup = loopTokenFixups[len];

          if (loopTokenFixup.params && loopTokenFixup.key) {
            delete loopTokenFixup.key;
          }
        } // If parse has been called with a set of tokens that are parameters, we need to return the whole stack,
        // wrapped in an Array.


        if (tokensAreParameters) {
          var params = stack.splice(0);
          stack.push(params);
        } // Pop the final value off the stack


        return stack.pop();
      });
    });
  };

  return Twig;
};

/***/ }),

/***/ 35:
/***/ ((module) => {

"use strict";


// ## twig.expression.operator.js
//
// This file handles operator lookups and parsing.
module.exports = function (Twig) {
  'use strict';
  /**
   * Operator associativity constants.
   */

  Twig.expression.operator = {
    leftToRight: 'leftToRight',
    rightToLeft: 'rightToLeft'
  };

  var containment = function containment(a, b) {
    if (b === undefined || b === null) {
      return null;
    }

    if (b.indexOf !== undefined) {
      // String
      return (a === b || a !== '') && b.includes(a);
    }

    var el;

    for (el in b) {
      if (Object.hasOwnProperty.call(b, el) && b[el] === a) {
        return true;
      }
    }

    return false;
  };
  /**
   * Get the precidence and associativity of an operator. These follow the order that C/C++ use.
   * See http://en.wikipedia.org/wiki/Operators_in_C_and_C++ for the table of values.
   */


  Twig.expression.operator.lookup = function (operator, token) {
    switch (operator) {
      case '..':
        token.precidence = 20;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case ',':
        token.precidence = 18;
        token.associativity = Twig.expression.operator.leftToRight;
        break;
      // Ternary

      case '?:':
      case '?':
      case ':':
        token.precidence = 16;
        token.associativity = Twig.expression.operator.rightToLeft;
        break;
      // Null-coalescing operator

      case '??':
        token.precidence = 15;
        token.associativity = Twig.expression.operator.rightToLeft;
        break;

      case 'or':
        token.precidence = 14;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'and':
        token.precidence = 13;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'b-or':
        token.precidence = 12;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'b-xor':
        token.precidence = 11;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'b-and':
        token.precidence = 10;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case '==':
      case '!=':
        token.precidence = 9;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case '<':
      case '<=':
      case '>':
      case '>=':
      case 'not in':
      case 'in':
        token.precidence = 8;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case '~': // String concatination

      case '+':
      case '-':
        token.precidence = 6;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case '//':
      case '**':
      case '*':
      case '/':
      case '%':
        token.precidence = 5;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'not':
        token.precidence = 3;
        token.associativity = Twig.expression.operator.rightToLeft;
        break;

      case 'matches':
        token.precidence = 8;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'starts with':
        token.precidence = 8;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      case 'ends with':
        token.precidence = 8;
        token.associativity = Twig.expression.operator.leftToRight;
        break;

      default:
        throw new Twig.Error('Failed to lookup operator: ' + operator + ' is an unknown operator.');
    }

    token.operator = operator;
    return token;
  };
  /**
   * Handle operations on the RPN stack.
   *
   * Returns the updated stack.
   */


  Twig.expression.operator.parse = function (operator, stack) {
    Twig.log.trace('Twig.expression.operator.parse: ', 'Handling ', operator);
    var a;
    var b;
    var c;

    if (operator === '?') {
      c = stack.pop();
    }

    b = stack.pop();

    if (operator !== 'not') {
      a = stack.pop();
    }

    if (operator !== 'in' && operator !== 'not in' && operator !== '??') {
      if (a && Array.isArray(a)) {
        a = a.length;
      }

      if (operator !== '?' && b && Array.isArray(b)) {
        b = b.length;
      }
    }

    if (operator === 'matches') {
      if (b && typeof b === 'string') {
        var reParts = b.match(/^\/(.*)\/([gims]?)$/);
        var reBody = reParts[1];
        var reFlags = reParts[2];
        b = new RegExp(reBody, reFlags);
      }
    }

    switch (operator) {
      case ':':
        // Ignore
        break;

      case '??':
        if (a === undefined) {
          a = b;
          b = c;
          c = undefined;
        }

        if (a !== undefined && a !== null) {
          stack.push(a);
        } else {
          stack.push(b);
        }

        break;

      case '?:':
        if (Twig.lib.boolval(a)) {
          stack.push(a);
        } else {
          stack.push(b);
        }

        break;

      case '?':
        if (a === undefined) {
          // An extended ternary.
          a = b;
          b = c;
          c = undefined;
        }

        if (Twig.lib.boolval(a)) {
          stack.push(b);
        } else {
          stack.push(c);
        }

        break;

      case '+':
        b = parseFloat(b);
        a = parseFloat(a);
        stack.push(a + b);
        break;

      case '-':
        b = parseFloat(b);
        a = parseFloat(a);
        stack.push(a - b);
        break;

      case '*':
        b = parseFloat(b);
        a = parseFloat(a);
        stack.push(a * b);
        break;

      case '/':
        b = parseFloat(b);
        a = parseFloat(a);
        stack.push(a / b);
        break;

      case '//':
        b = parseFloat(b);
        a = parseFloat(a);
        stack.push(Math.floor(a / b));
        break;

      case '%':
        b = parseFloat(b);
        a = parseFloat(a);
        stack.push(a % b);
        break;

      case '~':
        stack.push((typeof a !== 'undefined' && a !== null ? a.toString() : '') + (typeof b !== 'undefined' && b !== null ? b.toString() : ''));
        break;

      case 'not':
      case '!':
        stack.push(!Twig.lib.boolval(b));
        break;

      case '<':
        stack.push(a < b);
        break;

      case '<=':
        stack.push(a <= b);
        break;

      case '>':
        stack.push(a > b);
        break;

      case '>=':
        stack.push(a >= b);
        break;

      case '===':
        stack.push(a === b);
        break;

      case '==':
        /* eslint-disable-next-line eqeqeq */
        stack.push(a == b);
        break;

      case '!==':
        stack.push(a !== b);
        break;

      case '!=':
        /* eslint-disable-next-line eqeqeq */
        stack.push(a != b);
        break;

      case 'or':
        stack.push(Twig.lib.boolval(a) || Twig.lib.boolval(b));
        break;

      case 'b-or':
        stack.push(a | b);
        break;

      case 'b-xor':
        stack.push(a ^ b);
        break;

      case 'and':
        stack.push(Twig.lib.boolval(a) && Twig.lib.boolval(b));
        break;

      case 'b-and':
        stack.push(a & b);
        break;

      case '**':
        stack.push(Math.pow(a, b));
        break;

      case 'not in':
        stack.push(!containment(a, b));
        break;

      case 'in':
        stack.push(containment(a, b));
        break;

      case 'matches':
        stack.push(b.test(a));
        break;

      case 'starts with':
        stack.push(typeof a === 'string' && a.indexOf(b) === 0);
        break;

      case 'ends with':
        stack.push(typeof a === 'string' && a.includes(b, a.length - b.length));
        break;

      case '..':
        stack.push(Twig.functions.range(a, b));
        break;

      default:
        throw new Twig.Error('Failed to parse operator: ' + operator + ' is an unknown operator.');
    }
  };

  return Twig;
};

/***/ }),

/***/ 617:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// ## twig.factory.js
//
// This file handles creating the Twig library
module.exports = function factory() {
  var Twig = {
    VERSION: '1.16.0'
  };

  __webpack_require__(181)(Twig);

  __webpack_require__(383)(Twig);

  __webpack_require__(769)(Twig);

  __webpack_require__(213)(Twig);

  __webpack_require__(799)(Twig);

  __webpack_require__(773)(Twig);

  __webpack_require__(854)(Twig);

  __webpack_require__(188)(Twig);

  __webpack_require__(341)(Twig);

  __webpack_require__(402)(Twig);

  __webpack_require__(847)(Twig);

  __webpack_require__(148)(Twig);

  __webpack_require__(439)(Twig);

  __webpack_require__(452)(Twig);

  __webpack_require__(858)(Twig);

  Twig.exports.factory = factory;
  return Twig.exports;
};

/***/ }),

/***/ 213:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

var _typeof2 = _interopRequireDefault(__webpack_require__(8));

// ## twig.filters.js
//
// This file handles parsing filters.
module.exports = function (Twig) {
  // Determine object type
  function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }

  Twig.filters = {
    // String Filters
    upper: function upper(value) {
      if (typeof value !== 'string') {
        return value;
      }

      return value.toUpperCase();
    },
    lower: function lower(value) {
      if (typeof value !== 'string') {
        return value;
      }

      return value.toLowerCase();
    },
    capitalize: function capitalize(value) {
      if (typeof value !== 'string') {
        return value;
      }

      return value.slice(0, 1).toUpperCase() + value.toLowerCase().slice(1);
    },
    title: function title(value) {
      if (typeof value !== 'string') {
        return value;
      }

      return value.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
      });
    },
    length: function length(value) {
      if (Twig.lib.is('Array', value) || typeof value === 'string') {
        return value.length;
      }

      if (Twig.lib.is('Object', value)) {
        if (value._keys === undefined) {
          return Object.keys(value).length;
        }

        return value._keys.length;
      }

      return 0;
    },
    // Array/Object Filters
    reverse: function reverse(value) {
      if (is('Array', value)) {
        return value.reverse();
      }

      if (is('String', value)) {
        return value.split('').reverse().join('');
      }

      if (is('Object', value)) {
        var keys = value._keys || Object.keys(value).reverse();
        value._keys = keys;
        return value;
      }
    },
    sort: function sort(value) {
      if (is('Array', value)) {
        return value.sort();
      }

      if (is('Object', value)) {
        // Sorting objects isn't obvious since the order of
        // returned keys isn't guaranteed in JavaScript.
        // Because of this we use a "hidden" key called _keys to
        // store the keys in the order we want to return them.
        delete value._keys;
        var keys = Object.keys(value);
        var sortedKeys = keys.sort(function (a, b) {
          var a1;
          var b1; // If a and b are comparable, we're fine :-)

          if (value[a] > value[b] === !(value[a] <= value[b])) {
            return value[a] > value[b] ? 1 : value[a] < value[b] ? -1 : 0;
          } // If a and b can be parsed as numbers, we can compare
          // their numeric value


          if (!isNaN(a1 = parseFloat(value[a])) && !isNaN(b1 = parseFloat(value[b]))) {
            return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
          } // If one of the values is a string, we convert the
          // other value to string as well


          if (typeof value[a] === 'string') {
            return value[a] > value[b].toString() ? 1 : value[a] < value[b].toString() ? -1 : 0;
          }

          if (typeof value[b] === 'string') {
            return value[a].toString() > value[b] ? 1 : value[a].toString() < value[b] ? -1 : 0;
          } // Everything failed - return 'null' as sign, that
          // the values are not comparable


          return null;
        });
        value._keys = sortedKeys;
        return value;
      }
    },
    keys: function keys(value) {
      if (value === undefined || value === null) {
        return;
      }

      var keyset = value._keys || Object.keys(value);
      var output = [];
      keyset.forEach(function (key) {
        if (key === '_keys') {
          return;
        } // Ignore the _keys property


        if (Object.hasOwnProperty.call(value, key)) {
          output.push(key);
        }
      });
      return output;
    },

    /* eslint-disable-next-line camelcase */
    url_encode: function url_encode(value) {
      if (value === undefined || value === null) {
        return;
      }

      if (Twig.lib.is('Object', value)) {
        var serialize = function serialize(obj, prefix) {
          var result = [];
          var keyset = obj._keys || Object.keys(obj);
          keyset.forEach(function (key) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
              return;
            }

            var resultKey = prefix ? prefix + '[' + key + ']' : key;
            var resultValue = obj[key];
            result.push(Twig.lib.is('Object', resultValue) || Array.isArray(resultValue) ? serialize(resultValue, resultKey) : encodeURIComponent(resultKey) + '=' + encodeURIComponent(resultValue));
          });
          return result.join('&amp;');
        };

        return serialize(value);
      }

      var result = encodeURIComponent(value);
      result = result.replace('\'', '%27');
      return result;
    },
    join: function join(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      var joinStr = '';
      var output = [];
      var keyset = null;

      if (params && params[0]) {
        joinStr = params[0];
      }

      if (is('Array', value)) {
        output = value;
      } else {
        keyset = value._keys || Object.keys(value);
        keyset.forEach(function (key) {
          if (key === '_keys') {
            return;
          } // Ignore the _keys property


          if (Object.hasOwnProperty.call(value, key)) {
            output.push(value[key]);
          }
        });
      }

      return output.join(joinStr);
    },
    "default": function _default(value, params) {
      if (params !== undefined && params.length > 1) {
        throw new Twig.Error('default filter expects one argument');
      }

      if (value === undefined || value === null || value === '') {
        if (params === undefined) {
          return '';
        }

        return params[0];
      }

      return value;
    },

    /* eslint-disable-next-line camelcase */
    json_encode: function json_encode(value) {
      if (value === undefined || value === null) {
        return 'null';
      }

      if ((0, _typeof2["default"])(value) === 'object' && is('Array', value)) {
        var output = [];
        value.forEach(function (v) {
          output.push(Twig.filters.json_encode(v));
        });
        return '[' + output.join(',') + ']';
      }

      if ((0, _typeof2["default"])(value) === 'object' && is('Date', value)) {
        return '"' + value.toISOString() + '"';
      }

      if ((0, _typeof2["default"])(value) === 'object') {
        var keyset = value._keys || Object.keys(value);
        var _output = [];
        keyset.forEach(function (key) {
          _output.push(JSON.stringify(key) + ':' + Twig.filters.json_encode(value[key]));
        });
        return '{' + _output.join(',') + '}';
      }

      return JSON.stringify(value);
    },
    merge: function merge(value, params) {
      var obj = [];
      var arrIndex = 0;
      var keyset = []; // Check to see if all the objects being merged are arrays

      if (is('Array', value)) {
        params.forEach(function (param) {
          if (!is('Array', param)) {
            obj = {};
          }
        });
      } else {
        // Create obj as an Object
        obj = {};
      }

      if (!is('Array', obj)) {
        obj._keys = [];
      }

      if (is('Array', value)) {
        value.forEach(function (val) {
          if (obj._keys) {
            obj._keys.push(arrIndex);
          }

          obj[arrIndex] = val;
          arrIndex++;
        });
      } else {
        keyset = value._keys || Object.keys(value);
        keyset.forEach(function (key) {
          obj[key] = value[key];

          obj._keys.push(key); // Handle edge case where a number index in an object is greater than
          //   the array counter. In such a case, the array counter is increased
          //   one past the index.
          //
          // Example {{ ["a", "b"]|merge({"4":"value"}, ["c", "d"])
          // Without this, d would have an index of "4" and overwrite the value
          //   of "value"


          var intKey = parseInt(key, 10);

          if (!isNaN(intKey) && intKey >= arrIndex) {
            arrIndex = intKey + 1;
          }
        });
      } // Mixin the merge arrays


      params.forEach(function (param) {
        if (is('Array', param)) {
          param.forEach(function (val) {
            if (obj._keys) {
              obj._keys.push(arrIndex);
            }

            obj[arrIndex] = val;
            arrIndex++;
          });
        } else {
          keyset = param._keys || Object.keys(param);
          keyset.forEach(function (key) {
            if (!obj[key]) {
              obj._keys.push(key);
            }

            obj[key] = param[key];
            var intKey = parseInt(key, 10);

            if (!isNaN(intKey) && intKey >= arrIndex) {
              arrIndex = intKey + 1;
            }
          });
        }
      });

      if (params.length === 0) {
        throw new Twig.Error('Filter merge expects at least one parameter');
      }

      return obj;
    },
    date: function date(value, params) {
      var date = Twig.functions.date(value);
      var format = params && Boolean(params.length) ? params[0] : 'F j, Y H:i';
      return Twig.lib.date(format.replace(/\\\\/g, '\\'), date);
    },

    /* eslint-disable-next-line camelcase */
    date_modify: function date_modify(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      if (params === undefined || params.length !== 1) {
        throw new Twig.Error('date_modify filter expects 1 argument');
      }

      var modifyText = params[0];
      var time;

      if (Twig.lib.is('Date', value)) {
        time = Twig.lib.strtotime(modifyText, value.getTime() / 1000);
      }

      if (Twig.lib.is('String', value)) {
        time = Twig.lib.strtotime(modifyText, Twig.lib.strtotime(value));
      }

      if (Twig.lib.is('Number', value)) {
        time = Twig.lib.strtotime(modifyText, value);
      }

      return new Date(time * 1000);
    },
    replace: function replace(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      var pairs = params[0];
      var tag;

      for (tag in pairs) {
        if (Object.hasOwnProperty.call(pairs, tag) && tag !== '_keys') {
          value = Twig.lib.replaceAll(value, tag, pairs[tag]);
        }
      }

      return value;
    },
    format: function format(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      return Twig.lib.vsprintf(value, params);
    },
    striptags: function striptags(value, allowed) {
      if (value === undefined || value === null) {
        return;
      }

      return Twig.lib.stripTags(value, allowed);
    },
    escape: function escape(value, params) {
      if (value === undefined || value === null || value === '') {
        return;
      }

      var strategy = 'html';

      if (params && Boolean(params.length) && params[0] !== true) {
        strategy = params[0];
      }

      if (strategy === 'html') {
        var rawValue = value.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        return new Twig.Markup(rawValue, 'html');
      }

      if (strategy === 'js') {
        var _rawValue = value.toString();

        var result = '';

        for (var i = 0; i < _rawValue.length; i++) {
          if (_rawValue[i].match(/^[a-zA-Z0-9,._]$/)) {
            result += _rawValue[i];
          } else {
            var _char = _rawValue.charAt(i);

            var charCode = _rawValue.charCodeAt(i); // A few characters have short escape sequences in JSON and JavaScript.
            // Escape sequences supported only by JavaScript, not JSON, are ommitted.
            // \" is also supported but omitted, because the resulting string is not HTML safe.


            var shortMap = {
              '\\': '\\\\',
              '/': '\\/',
              "\b": '\\b',
              "\f": '\\f',
              "\n": '\\n',
              "\r": '\\r',
              "\t": '\\t'
            };

            if (shortMap[_char]) {
              result += shortMap[_char];
            } else {
              result += Twig.lib.sprintf("\\u%04s", charCode.toString(16).toUpperCase());
            }
          }
        }

        return new Twig.Markup(result, 'js');
      }

      if (strategy === 'css') {
        var _rawValue2 = value.toString();

        var _result = '';

        for (var _i = 0; _i < _rawValue2.length; _i++) {
          if (_rawValue2[_i].match(/^[a-zA-Z0-9]$/)) {
            _result += _rawValue2[_i];
          } else {
            var _charCode = _rawValue2.charCodeAt(_i);

            _result += '\\' + _charCode.toString(16).toUpperCase() + ' ';
          }
        }

        return new Twig.Markup(_result, 'css');
      }

      if (strategy === 'url') {
        var _result2 = Twig.filters.url_encode(value);

        return new Twig.Markup(_result2, 'url');
      }

      if (strategy === 'html_attr') {
        var _rawValue3 = value.toString();

        var _result3 = '';

        for (var _i2 = 0; _i2 < _rawValue3.length; _i2++) {
          if (_rawValue3[_i2].match(/^[a-zA-Z0-9,.\-_]$/)) {
            _result3 += _rawValue3[_i2];
          } else if (_rawValue3[_i2].match(/^[&<>"]$/)) {
            _result3 += _rawValue3[_i2].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          } else {
            var _charCode2 = _rawValue3.charCodeAt(_i2); // The following replaces characters undefined in HTML with
            // the hex entity for the Unicode replacement character.


            if (_charCode2 <= 0x1F && _charCode2 !== 0x09 && _charCode2 !== 0x0A && _charCode2 !== 0x0D) {
              _result3 += '&#xFFFD;';
            } else if (_charCode2 < 0x80) {
              _result3 += Twig.lib.sprintf('&#x%02s;', _charCode2.toString(16).toUpperCase());
            } else {
              _result3 += Twig.lib.sprintf('&#x%04s;', _charCode2.toString(16).toUpperCase());
            }
          }
        }

        return new Twig.Markup(_result3, 'html_attr');
      }

      throw new Twig.Error('escape strategy unsupported');
    },

    /* Alias of escape */
    e: function e(value, params) {
      return Twig.filters.escape(value, params);
    },
    nl2br: function nl2br(value) {
      if (value === undefined || value === null || value === '') {
        return;
      }

      var linebreakTag = 'BACKSLASH_n_replace';
      var br = '<br />' + linebreakTag;
      value = Twig.filters.escape(value).replace(/\r\n/g, br).replace(/\r/g, br).replace(/\n/g, br);
      value = Twig.lib.replaceAll(value, linebreakTag, '\n');
      return new Twig.Markup(value);
    },

    /**
     * Adapted from: http://phpjs.org/functions/number_format:481
     */

    /* eslint-disable-next-line camelcase */
    number_format: function number_format(value, params) {
      var number = value;
      var decimals = params && params[0] ? params[0] : undefined;
      var dec = params && params[1] !== undefined ? params[1] : '.';
      var sep = params && params[2] !== undefined ? params[2] : ',';
      number = String(number).replace(/[^0-9+\-Ee.]/g, '');
      var n = isFinite(Number(number)) ? Number(number) : 0;
      var prec = isFinite(Number(decimals)) ? Math.abs(decimals) : 0;
      var s = '';

      var toFixedFix = function toFixedFix(n, prec) {
        var k = Math.pow(10, prec);
        return String(Math.round(n * k) / k);
      }; // Fix for IE parseFloat(0.55).toFixed(0) = 0;


      s = (prec ? toFixedFix(n, prec) : String(Math.round(n))).split('.');

      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }

      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }

      return s.join(dec);
    },
    trim: function trim(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      var str = String(value);
      var whitespace;

      if (params && params[0]) {
        whitespace = String(params[0]);
      } else {
        whitespace = " \n\r\t\f\x0B\xA0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u3000";
      }

      for (var i = 0; i < str.length; i++) {
        if (!whitespace.includes(str.charAt(i))) {
          str = str.slice(Math.max(0, i));
          break;
        }
      }

      for (var _i3 = str.length - 1; _i3 >= 0; _i3--) {
        if (!whitespace.includes(str.charAt(_i3))) {
          str = str.slice(0, Math.max(0, _i3 + 1));
          break;
        }
      }

      return whitespace.includes(str.charAt(0)) ? '' : str;
    },
    truncate: function truncate(value, params) {
      var length = 30;
      var preserve = false;
      var separator = '...';
      value = String(value);

      if (params) {
        if (params[0]) {
          length = params[0];
        }

        if (params[1]) {
          preserve = params[1];
        }

        if (params[2]) {
          separator = params[2];
        }
      }

      if (value.length > length) {
        if (preserve) {
          length = value.indexOf(' ', length);

          if (length === -1) {
            return value;
          }
        }

        value = value.slice(0, length) + separator;
      }

      return value;
    },
    slice: function slice(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      if (params === undefined || params.length === 0) {
        throw new Twig.Error('slice filter expects at least 1 argument');
      } // Default to start of string


      var start = params[0] || 0; // Default to length of string

      var length = params.length > 1 ? params[1] : value.length; // Handle negative start values

      var startIndex = start >= 0 ? start : Math.max(value.length + start, 0);

      if (Twig.lib.is('Array', value)) {
        var output = [];

        for (var i = startIndex; i < startIndex + length && i < value.length; i++) {
          output.push(value[i]);
        }

        return output;
      }

      if (Twig.lib.is('String', value)) {
        return value.slice(startIndex, startIndex + length);
      }

      throw new Twig.Error('slice filter expects value to be an array or string');
    },
    abs: function abs(value) {
      if (value === undefined || value === null) {
        return;
      }

      return Math.abs(value);
    },
    first: function first(value) {
      if (is('Array', value)) {
        return value[0];
      }

      if (is('Object', value)) {
        if ('_keys' in value) {
          return value[value._keys[0]];
        }
      } else if (typeof value === 'string') {
        return value.slice(0, 1);
      }
    },
    split: function split(value, params) {
      if (value === undefined || value === null) {
        return;
      }

      if (params === undefined || params.length === 0 || params.length > 2) {
        throw new Twig.Error('split filter expects 1 or 2 argument');
      }

      if (Twig.lib.is('String', value)) {
        var delimiter = params[0];
        var limit = params[1];
        var split = value.split(delimiter);

        if (limit === undefined) {
          return split;
        }

        if (limit < 0) {
          return value.split(delimiter, split.length + limit);
        }

        var limitedSplit = [];

        if (delimiter === '') {
          // Empty delimiter
          // "aabbcc"|split('', 2)
          //     -> ['aa', 'bb', 'cc']
          while (split.length > 0) {
            var temp = '';

            for (var i = 0; i < limit && split.length > 0; i++) {
              temp += split.shift();
            }

            limitedSplit.push(temp);
          }
        } else {
          // Non-empty delimiter
          // "one,two,three,four,five"|split(',', 3)
          //     -> ['one', 'two', 'three,four,five']
          for (var _i4 = 0; _i4 < limit - 1 && split.length > 0; _i4++) {
            limitedSplit.push(split.shift());
          }

          if (split.length > 0) {
            limitedSplit.push(split.join(delimiter));
          }
        }

        return limitedSplit;
      }

      throw new Twig.Error('split filter expects value to be a string');
    },
    last: function last(value) {
      if (Twig.lib.is('Object', value)) {
        var keys;

        if (value._keys === undefined) {
          keys = Object.keys(value);
        } else {
          keys = value._keys;
        }

        return value[keys[keys.length - 1]];
      }

      if (Twig.lib.is('Number', value)) {
        return value.toString().slice(-1);
      } // String|array


      return value[value.length - 1];
    },
    raw: function raw(value) {
      return new Twig.Markup(value || '');
    },
    batch: function batch(items, params) {
      var size = params.shift();
      var fill = params.shift();
      var last;
      var missing;

      if (!Twig.lib.is('Array', items)) {
        throw new Twig.Error('batch filter expects items to be an array');
      }

      if (!Twig.lib.is('Number', size)) {
        throw new Twig.Error('batch filter expects size to be a number');
      }

      size = Math.ceil(size);
      var result = Twig.lib.chunkArray(items, size);

      if (fill && items.length % size !== 0) {
        last = result.pop();
        missing = size - last.length;

        while (missing--) {
          last.push(fill);
        }

        result.push(last);
      }

      return result;
    },
    round: function round(value, params) {
      params = params || [];
      var precision = params.length > 0 ? params[0] : 0;
      var method = params.length > 1 ? params[1] : 'common';
      value = parseFloat(value);

      if (precision && !Twig.lib.is('Number', precision)) {
        throw new Twig.Error('round filter expects precision to be a number');
      }

      if (method === 'common') {
        return Twig.lib.round(value, precision);
      }

      if (!Twig.lib.is('Function', Math[method])) {
        throw new Twig.Error('round filter expects method to be \'floor\', \'ceil\', or \'common\'');
      }

      return Math[method](value * Math.pow(10, precision)) / Math.pow(10, precision);
    },
    spaceless: function spaceless(value) {
      return value.replace(/>\s+</g, '><').trim();
    }
  };

  Twig.filter = function (filter, value, params) {
    var state = this;

    if (!Twig.filters[filter]) {
      throw new Twig.Error('Unable to find filter ' + filter);
    }

    return Twig.filters[filter].call(state, value, params);
  };

  Twig.filter.extend = function (filter, definition) {
    Twig.filters[filter] = definition;
  };

  return Twig;
};

/***/ }),

/***/ 799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

var _typeof2 = _interopRequireDefault(__webpack_require__(8));

// ## twig.functions.js
//
// This file handles parsing filters.
module.exports = function (Twig) {
  /**
   * @constant
   * @type {string}
   */
  var TEMPLATE_NOT_FOUND_MESSAGE = 'Template "{name}" is not defined.';
  Twig.functions = {
    //  Attribute, block, constant, date, dump, parent, random,.
    // Range function from http://phpjs.org/functions/range:499
    // Used under an MIT License
    range: function range(low, high, step) {
      // http://kevin.vanzonneveld.net
      // +   original by: Waldo Malqui Silva
      // *     example 1: range ( 0, 12 );
      // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      // *     example 2: range( 0, 100, 10 );
      // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      // *     example 3: range( 'a', 'i' );
      // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
      // *     example 4: range( 'c', 'a' );
      // *     returns 4: ['c', 'b', 'a']
      var matrix = [];
      var inival;
      var endval;
      var walker = step || 1;
      var chars = false;

      if (!isNaN(low) && !isNaN(high)) {
        inival = parseInt(low, 10);
        endval = parseInt(high, 10);
      } else if (isNaN(low) && isNaN(high)) {
        chars = true;
        inival = low.charCodeAt(0);
        endval = high.charCodeAt(0);
      } else {
        inival = isNaN(low) ? 0 : low;
        endval = isNaN(high) ? 0 : high;
      }

      var plus = !(inival > endval);

      if (plus) {
        while (inival <= endval) {
          matrix.push(chars ? String.fromCharCode(inival) : inival);
          inival += walker;
        }
      } else {
        while (inival >= endval) {
          matrix.push(chars ? String.fromCharCode(inival) : inival);
          inival -= walker;
        }
      }

      return matrix;
    },
    cycle: function cycle(arr, i) {
      var pos = i % arr.length;
      return arr[pos];
    },
    dump: function dump() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Don't pass arguments to `Array.slice`, that is a performance killer
      var argsCopy = [].concat(args);
      var state = this;
      var EOL = '\n';
      var indentChar = '  ';
      var indentTimes = 0;
      var out = '';

      var indent = function indent(times) {
        var ind = '';

        while (times > 0) {
          times--;
          ind += indentChar;
        }

        return ind;
      };

      var displayVar = function displayVar(variable) {
        out += indent(indentTimes);

        if ((0, _typeof2["default"])(variable) === 'object') {
          dumpVar(variable);
        } else if (typeof variable === 'function') {
          out += 'function()' + EOL;
        } else if (typeof variable === 'string') {
          out += 'string(' + variable.length + ') "' + variable + '"' + EOL;
        } else if (typeof variable === 'number') {
          out += 'number(' + variable + ')' + EOL;
        } else if (typeof variable === 'boolean') {
          out += 'bool(' + variable + ')' + EOL;
        }
      };

      var dumpVar = function dumpVar(variable) {
        var i;

        if (variable === null) {
          out += 'NULL' + EOL;
        } else if (variable === undefined) {
          out += 'undefined' + EOL;
        } else if ((0, _typeof2["default"])(variable) === 'object') {
          out += indent(indentTimes) + (0, _typeof2["default"])(variable);
          indentTimes++;

          out += '(' + function (obj) {
            var size = 0;
            var key;

            for (key in obj) {
              if (Object.hasOwnProperty.call(obj, key)) {
                size++;
              }
            }

            return size;
          }(variable) + ') {' + EOL;

          for (i in variable) {
            if (Object.hasOwnProperty.call(variable, i)) {
              out += indent(indentTimes) + '[' + i + ']=> ' + EOL;
              displayVar(variable[i]);
            }
          }

          indentTimes--;
          out += indent(indentTimes) + '}' + EOL;
        } else {
          displayVar(variable);
        }
      }; // Handle no argument case by dumping the entire render context


      if (argsCopy.length === 0) {
        argsCopy.push(state.context);
      }

      argsCopy.forEach(function (variable) {
        dumpVar(variable);
      });
      return out;
    },
    date: function date(_date) {
      var dateObj;

      if (_date === undefined || _date === null || _date === '') {
        dateObj = new Date();
      } else if (Twig.lib.is('Date', _date)) {
        dateObj = _date;
      } else if (Twig.lib.is('String', _date)) {
        if (_date.match(/^\d+$/)) {
          dateObj = new Date(_date * 1000);
        } else {
          dateObj = new Date(Twig.lib.strtotime(_date) * 1000);
        }
      } else if (Twig.lib.is('Number', _date)) {
        // Timestamp
        dateObj = new Date(_date * 1000);
      } else {
        throw new Twig.Error('Unable to parse date ' + _date);
      }

      return dateObj;
    },
    block: function block(blockName) {
      var state = this;
      var block = state.getBlock(blockName);

      if (block !== undefined) {
        return block.render(state, state.context);
      }
    },
    parent: function parent() {
      var state = this;
      return state.getBlock(state.getNestingStackToken(Twig.logic.type.block).blockName, true).render(state, state.context);
    },
    attribute: function attribute(object, method, params) {
      if (Twig.lib.is('Object', object)) {
        if (Object.hasOwnProperty.call(object, method)) {
          if (typeof object[method] === 'function') {
            return object[method].apply(undefined, params);
          }

          return object[method];
        }
      } // Array will return element 0-index


      return object ? object[method] || undefined : undefined;
    },
    max: function max(values) {
      if (Twig.lib.is('Object', values)) {
        delete values._keys;
        return Twig.lib.max(values);
      }

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return Reflect.apply(Twig.lib.max, null, [values].concat(args));
    },
    min: function min(values) {
      if (Twig.lib.is('Object', values)) {
        delete values._keys;
        return Twig.lib.min(values);
      }

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return Reflect.apply(Twig.lib.min, null, [values].concat(args));
    },

    /* eslint-disable-next-line camelcase */
    template_from_string: function template_from_string(template) {
      var state = this;

      if (template === undefined) {
        template = '';
      }

      return Twig.Templates.parsers.twig({
        options: state.template.options,
        data: template
      });
    },
    random: function random(value) {
      var LIMIT_INT31 = 0x80000000;

      function getRandomNumber(n) {
        var random = Math.floor(Math.random() * LIMIT_INT31);
        var min = Math.min.call(null, 0, n);
        var max = Math.max.call(null, 0, n);
        return min + Math.floor((max - min + 1) * random / LIMIT_INT31);
      }

      if (Twig.lib.is('Number', value)) {
        return getRandomNumber(value);
      }

      if (Twig.lib.is('String', value)) {
        return value.charAt(getRandomNumber(value.length - 1));
      }

      if (Twig.lib.is('Array', value)) {
        return value[getRandomNumber(value.length - 1)];
      }

      if (Twig.lib.is('Object', value)) {
        var keys = Object.keys(value);
        return value[keys[getRandomNumber(keys.length - 1)]];
      }

      return getRandomNumber(LIMIT_INT31 - 1);
    },

    /**
     * Returns the content of a template without rendering it
     * @param {string} name
     * @param {boolean} [ignoreMissing=false]
     * @returns {string}
     */
    source: function source(name, ignoreMissing) {
      var state = this;
      var namespaces = state.template.options.namespaces;
      var templateSource;
      var templateFound = false;
      var isNodeEnvironment =  true && typeof module.exports !== 'undefined' && typeof window === 'undefined';
      var loader;
      var path = name;

      if (namespaces && (0, _typeof2["default"])(namespaces) === 'object') {
        path = Twig.path.expandNamespace(namespaces, path);
      } // If we are running in a node.js environment, set the loader to 'fs'.


      if (isNodeEnvironment) {
        loader = 'fs';
      } else {
        loader = 'ajax';
      } // Build the params object


      var params = {
        id: name,
        path: path,
        method: loader,
        parser: 'source',
        async: false,
        fetchTemplateSource: true
      }; // Default ignoreMissing to false

      if (typeof ignoreMissing === 'undefined') {
        ignoreMissing = false;
      } // Try to load the remote template
      //
      // on exception, log it


      try {
        templateSource = Twig.Templates.loadRemote(name, params); // If the template is undefined or null, set the template to an empty string and do NOT flip the
        // boolean indicating we found the template
        //
        // else, all is good! flip the boolean indicating we found the template

        if (typeof templateSource === 'undefined' || templateSource === null) {
          templateSource = '';
        } else {
          templateFound = true;
        }
      } catch (error) {
        Twig.log.debug('Twig.functions.source: ', 'Problem loading template  ', error);
      } // If the template was NOT found AND we are not ignoring missing templates, return the same message
      // that is returned by the PHP implementation of the twig source() function
      //
      // else, return the template source


      if (!templateFound && !ignoreMissing) {
        return TEMPLATE_NOT_FOUND_MESSAGE.replace('{name}', name);
      }

      return templateSource;
    }
  };

  Twig._function = function (_function, value, params) {
    if (!Twig.functions[_function]) {
      throw new Twig.Error('Unable to find function ' + _function);
    }

    return Twig.functions[_function](value, params);
  };

  Twig._function.extend = function (_function, definition) {
    Twig.functions[_function] = definition;
  };

  return Twig;
};

/***/ }),

/***/ 209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * Twig.js
 *
 * @copyright 2011-2020 John Roepke and the Twig.js Contributors
 * @license   Available under the BSD 2-Clause License
 * @link      https://github.com/twigjs/twig.js
 */
module.exports = __webpack_require__(617)();

/***/ }),

/***/ 773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// ## twig.lib.js
//
// This file contains 3rd party libraries used within twig.
//
// Copies of the licenses for the code included here can be found in the
// LICENSES.md file.
//
module.exports = function (Twig) {
  // Namespace for libraries
  Twig.lib = {};
  Twig.lib.sprintf = __webpack_require__(296);
  Twig.lib.vsprintf = __webpack_require__(436);
  Twig.lib.round = __webpack_require__(718);
  Twig.lib.max = __webpack_require__(673);
  Twig.lib.min = __webpack_require__(4);
  Twig.lib.stripTags = __webpack_require__(359);
  Twig.lib.strtotime = __webpack_require__(195);
  Twig.lib.date = __webpack_require__(190);
  Twig.lib.boolval = __webpack_require__(315);

  Twig.lib.is = function (type, obj) {
    if (typeof obj === 'undefined' || obj === null) {
      return false;
    }

    switch (type) {
      case 'Array':
        return Array.isArray(obj);

      case 'Date':
        return obj instanceof Date;

      case 'String':
        return typeof obj === 'string' || obj instanceof String;

      case 'Number':
        return typeof obj === 'number' || obj instanceof Number;

      case 'Function':
        return typeof obj === 'function';

      case 'Object':
        return obj instanceof Object;

      default:
        return false;
    }
  };

  Twig.lib.replaceAll = function (string, search, replace) {
    // Convert type to string if needed
    var stringToChange = typeof string === 'string' ? string : string.toString(); // Escape possible regular expression syntax

    var searchEscaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return stringToChange.replace(new RegExp(searchEscaped, 'g'), replace);
  }; // Chunk an array (arr) into arrays of (size) items, returns an array of arrays, or an empty array on invalid input


  Twig.lib.chunkArray = function (arr, size) {
    var returnVal = [];
    var x = 0;
    var len = arr.length;

    if (size < 1 || !Array.isArray(arr)) {
      return [];
    }

    while (x < len) {
      returnVal.push(arr.slice(x, x += size));
    }

    return returnVal;
  };

  return Twig;
};

/***/ }),

/***/ 854:
/***/ ((module) => {

"use strict";


module.exports = function (Twig) {
  'use strict';

  Twig.Templates.registerLoader('ajax', function (location, params, callback, errorCallback) {
    var template;
    var precompiled = params.precompiled;
    var parser = this.parsers[params.parser] || this.parser.twig;

    if (typeof XMLHttpRequest === 'undefined') {
      throw new Twig.Error('Unsupported platform: Unable to do ajax requests ' + 'because there is no "XMLHTTPRequest" implementation');
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      var data = null;

      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200 || window.cordova && xmlhttp.status === 0) {
          Twig.log.debug('Got template ', xmlhttp.responseText);

          if (precompiled === true) {
            data = JSON.parse(xmlhttp.responseText);
          } else {
            data = xmlhttp.responseText;
          }

          params.url = location;
          params.data = data;
          template = parser.call(this, params);

          if (typeof callback === 'function') {
            callback(template);
          }
        } else if (typeof errorCallback === 'function') {
          errorCallback(xmlhttp);
        }
      }
    };

    xmlhttp.open('GET', location, Boolean(params.async));
    xmlhttp.overrideMimeType('text/plain');
    xmlhttp.send();

    if (params.async) {
      // TODO: return deferred promise
      return true;
    }

    return template;
  });
};

/***/ }),

/***/ 188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function (Twig) {
  'use strict';

  var fs;
  var path;

  try {
    // Require lib dependencies at runtime
    fs = __webpack_require__(147);
    path = __webpack_require__(17);
  } catch (error) {
    // NOTE: this is in a try/catch to avoid errors cross platform
    console.warn('Missing fs and path modules. ' + error);
  }

  Twig.Templates.registerLoader('fs', function (location, params, callback, errorCallback) {
    var template;
    var data = null;
    var precompiled = params.precompiled;
    var parser = this.parsers[params.parser] || this.parser.twig;

    if (!fs || !path) {
      throw new Twig.Error('Unsupported platform: Unable to load from file ' + 'because there is no "fs" or "path" implementation');
    }

    var loadTemplateFn = function loadTemplateFn(err, data) {
      if (err) {
        if (typeof errorCallback === 'function') {
          errorCallback(err);
        }

        return;
      }

      if (precompiled === true) {
        data = JSON.parse(data);
      }

      params.data = data;
      params.path = params.path || location; // Template is in data

      template = parser.call(this, params);

      if (typeof callback === 'function') {
        callback(template);
      }
    };

    params.path = params.path || location;

    if (params.async) {
      fs.stat(params.path, function (err, stats) {
        if (err || !stats.isFile()) {
          if (typeof errorCallback === 'function') {
            errorCallback(new Twig.Error('Unable to find template file ' + params.path));
          }

          return;
        }

        fs.readFile(params.path, 'utf8', loadTemplateFn);
      }); // TODO: return deferred promise

      return true;
    }

    try {
      if (!fs.statSync(params.path).isFile()) {
        throw new Twig.Error('Unable to find template file ' + params.path);
      }
    } catch (error) {
      throw new Twig.Error('Unable to find template file ' + params.path + '. ' + error);
    }

    data = fs.readFileSync(params.path, 'utf8');
    loadTemplateFn(undefined, data);
    return template;
  });
};

/***/ }),

/***/ 341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(713));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ## twig.logic.js
//
// This file handles tokenizing, compiling and parsing logic tokens. {% ... %}
module.exports = function (Twig) {
  'use strict';
  /**
   * Namespace for logic handling.
   */

  Twig.logic = {};
  /**
   * Logic token types.
   */

  Twig.logic.type = {
    if_: 'Twig.logic.type.if',
    endif: 'Twig.logic.type.endif',
    for_: 'Twig.logic.type.for',
    endfor: 'Twig.logic.type.endfor',
    else_: 'Twig.logic.type.else',
    elseif: 'Twig.logic.type.elseif',
    set: 'Twig.logic.type.set',
    setcapture: 'Twig.logic.type.setcapture',
    endset: 'Twig.logic.type.endset',
    filter: 'Twig.logic.type.filter',
    endfilter: 'Twig.logic.type.endfilter',
    apply: 'Twig.logic.type.apply',
    endapply: 'Twig.logic.type.endapply',
    "do": 'Twig.logic.type.do',
    shortblock: 'Twig.logic.type.shortblock',
    block: 'Twig.logic.type.block',
    endblock: 'Twig.logic.type.endblock',
    extends_: 'Twig.logic.type.extends',
    use: 'Twig.logic.type.use',
    include: 'Twig.logic.type.include',
    spaceless: 'Twig.logic.type.spaceless',
    endspaceless: 'Twig.logic.type.endspaceless',
    macro: 'Twig.logic.type.macro',
    endmacro: 'Twig.logic.type.endmacro',
    import_: 'Twig.logic.type.import',
    from: 'Twig.logic.type.from',
    embed: 'Twig.logic.type.embed',
    endembed: 'Twig.logic.type.endembed',
    "with": 'Twig.logic.type.with',
    endwith: 'Twig.logic.type.endwith',
    deprecated: 'Twig.logic.type.deprecated'
  }; // Regular expressions for handling logic tokens.
  //
  // Properties:
  //
  //      type:  The type of expression this matches
  //
  //      regex: A regular expression that matches the format of the token
  //
  //      next:  What logic tokens (if any) pop this token off the logic stack. If empty, the
  //             logic token is assumed to not require an end tag and isn't push onto the stack.
  //
  //      open:  Does this tag open a logic expression or is it standalone. For example,
  //             {% endif %} cannot exist without an opening {% if ... %} tag, so open = false.
  //
  //  Functions:
  //
  //      compile: A function that handles compiling the token into an output token ready for
  //               parsing with the parse function.
  //
  //      parse:   A function that parses the compiled token into output (HTML / whatever the
  //               template represents).

  Twig.logic.definitions = [{
    /**
     * If type logic tokens.
     *
     *  Format: {% if expression %}
     */
    type: Twig.logic.type.if_,
    regex: /^if\s?([\s\S]+)$/,
    next: [Twig.logic.type.else_, Twig.logic.type.elseif, Twig.logic.type.endif],
    open: true,
    compile: function compile(token) {
      var expression = token.match[1]; // Compile the expression.

      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      return Twig.expression.parseAsync.call(state, token.stack, context).then(function (result) {
        chain = true;

        if (Twig.lib.boolval(result)) {
          chain = false;
          return state.parseAsync(token.output, context);
        }

        return '';
      }).then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    /**
     * Else if type logic tokens.
     *
     *  Format: {% elseif expression %}
     */
    type: Twig.logic.type.elseif,
    regex: /^elseif\s?([^\s].*)$/,
    next: [Twig.logic.type.else_, Twig.logic.type.elseif, Twig.logic.type.endif],
    open: false,
    compile: function compile(token) {
      var expression = token.match[1]; // Compile the expression.

      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      return Twig.expression.parseAsync.call(state, token.stack, context).then(function (result) {
        if (chain && Twig.lib.boolval(result)) {
          chain = false;
          return state.parseAsync(token.output, context);
        }

        return '';
      }).then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    /**
     * Else type logic tokens.
     *
     *  Format: {% else %}
     */
    type: Twig.logic.type.else_,
    regex: /^else$/,
    next: [Twig.logic.type.endif, Twig.logic.type.endfor],
    open: false,
    parse: function parse(token, context, chain) {
      var promise = Twig.Promise.resolve('');
      var state = this;

      if (chain) {
        promise = state.parseAsync(token.output, context);
      }

      return promise.then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    /**
     * End if type logic tokens.
     *
     *  Format: {% endif %}
     */
    type: Twig.logic.type.endif,
    regex: /^endif$/,
    next: [],
    open: false
  }, {
    /**
     * For type logic tokens.
     *
     *  Format: {% for expression %}
     */
    type: Twig.logic.type.for_,
    regex: /^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([\S\s]+?)(?:\s+if\s+([^\s].*))?$/,
    next: [Twig.logic.type.else_, Twig.logic.type.endfor],
    open: true,
    compile: function compile(token) {
      var keyValue = token.match[1];
      var expression = token.match[2];
      var conditional = token.match[3];
      var kvSplit = null;
      token.keyVar = null;
      token.valueVar = null;

      if (keyValue.includes(',')) {
        kvSplit = keyValue.split(',');

        if (kvSplit.length === 2) {
          token.keyVar = kvSplit[0].trim();
          token.valueVar = kvSplit[1].trim();
        } else {
          throw new Twig.Error('Invalid expression in for loop: ' + keyValue);
        }
      } else {
        token.valueVar = keyValue.trim();
      } // Valid expressions for a for loop
      //   for item     in expression
      //   for key,item in expression
      // Compile the expression.


      token.expression = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack; // Compile the conditional (if available)

      if (conditional) {
        token.conditional = Twig.expression.compile.call(this, {
          type: Twig.expression.type.expression,
          value: conditional
        }).stack;
      }

      delete token.match;
      return token;
    },
    parse: function parse(token, context, continueChain) {
      // Parse expression
      var output = [];
      var len;
      var index = 0;
      var keyset;
      var state = this;
      var conditional = token.conditional;

      var buildLoop = function buildLoop(index, len) {
        var isConditional = conditional !== undefined;
        return {
          index: index + 1,
          index0: index,
          revindex: isConditional ? undefined : len - index,
          revindex0: isConditional ? undefined : len - index - 1,
          first: index === 0,
          last: isConditional ? undefined : index === len - 1,
          length: isConditional ? undefined : len,
          parent: context
        };
      }; // Run once for each iteration of the loop


      var loop = function loop(key, value) {
        var innerContext = _objectSpread({}, context);

        innerContext[token.valueVar] = value;

        if (token.keyVar) {
          innerContext[token.keyVar] = key;
        } // Loop object


        innerContext.loop = buildLoop(index, len);
        var promise = conditional === undefined ? Twig.Promise.resolve(true) : Twig.expression.parseAsync.call(state, conditional, innerContext);
        return promise.then(function (condition) {
          if (!condition) {
            return;
          }

          return state.parseAsync(token.output, innerContext).then(function (tokenOutput) {
            output.push(tokenOutput);
            index += 1;
          });
        }).then(function () {
          // Delete loop-related variables from the context
          delete innerContext.loop;
          delete innerContext[token.valueVar];
          delete innerContext[token.keyVar]; // Merge in values that exist in context but have changed
          // in inner_context.

          Twig.merge(context, innerContext, true);
        });
      };

      return Twig.expression.parseAsync.call(state, token.expression, context).then(function (result) {
        if (Array.isArray(result)) {
          len = result.length;
          return Twig.async.forEach(result, function (value) {
            var key = index;
            return loop(key, value);
          });
        }

        if (Twig.lib.is('Object', result)) {
          if (result._keys === undefined) {
            keyset = Object.keys(result);
          } else {
            keyset = result._keys;
          }

          len = keyset.length;
          return Twig.async.forEach(keyset, function (key) {
            // Ignore the _keys property, it's internal to twig.js
            if (key === '_keys') {
              return;
            }

            return loop(key, result[key]);
          });
        }
      }).then(function () {
        // Only allow else statements if no output was generated
        continueChain = output.length === 0;
        return {
          chain: continueChain,
          context: context,
          output: Twig.output.call(state.template, output)
        };
      });
    }
  }, {
    /**
     * End for type logic tokens.
     *
     *  Format: {% endfor %}
     */
    type: Twig.logic.type.endfor,
    regex: /^endfor$/,
    next: [],
    open: false
  }, {
    /**
     * Set type logic tokens.
     *
     *  Format: {% set key = expression %}
     */
    type: Twig.logic.type.set,
    regex: /^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*([\s\S]+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      //
      var key = token.match[1].trim();
      var expression = token.match[2]; // Compile the expression.

      var expressionStack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      token.key = key;
      token.expression = expressionStack;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, continueChain) {
      var key = token.key;
      var state = this;
      return Twig.expression.parseAsync.call(state, token.expression, context).then(function (value) {
        if (value === context) {
          /*  If storing the context in a variable, it needs to be a clone of the current state of context.
              Otherwise we have a context with infinite recursion.
              Fixes #341
          */
          value = _objectSpread({}, value);
        }

        context[key] = value;
        return {
          chain: continueChain,
          context: context
        };
      });
    }
  }, {
    /**
     * Set capture type logic tokens.
     *
     *  Format: {% set key %}
     */
    type: Twig.logic.type.setcapture,
    regex: /^set\s+([a-zA-Z0-9_,\s]+)$/,
    next: [Twig.logic.type.endset],
    open: true,
    compile: function compile(token) {
      var key = token.match[1].trim();
      token.key = key;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, continueChain) {
      var state = this;
      var key = token.key;
      return state.parseAsync(token.output, context).then(function (output) {
        // Set on both the global and local context
        state.context[key] = output;
        context[key] = output;
        return {
          chain: continueChain,
          context: context
        };
      });
    }
  }, {
    /**
     * End set type block logic tokens.
     *
     *  Format: {% endset %}
     */
    type: Twig.logic.type.endset,
    regex: /^endset$/,
    next: [],
    open: false
  }, {
    /**
     * Filter logic tokens.
     *
     *  Format: {% filter upper %} or {% filter lower|escape %}
     */
    type: Twig.logic.type.filter,
    regex: /^filter\s+(.+)$/,
    next: [Twig.logic.type.endfilter],
    open: true,
    compile: function compile(token) {
      var expression = '|' + token.match[1].trim(); // Compile the expression.

      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      return state.parseAsync(token.output, context).then(function (output) {
        var stack = [{
          type: Twig.expression.type.string,
          value: output
        }].concat(token.stack);
        return Twig.expression.parseAsync.call(state, stack, context);
      }).then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    /**
     * End filter logic tokens.
     *
     *  Format: {% endfilter %}
     */
    type: Twig.logic.type.endfilter,
    regex: /^endfilter$/,
    next: [],
    open: false
  }, {
    /**
     * Apply logic tokens.
     *
     *  Format: {% apply upper %} or {% apply lower|escape %}
     */
    type: Twig.logic.type.apply,
    regex: /^apply\s+(.+)$/,
    next: [Twig.logic.type.endapply],
    open: true,
    compile: function compile(token) {
      var expression = '|' + token.match[1].trim(); // Compile the expression.

      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      return state.parseAsync(token.output, context).then(function (output) {
        var stack = [{
          type: Twig.expression.type.string,
          value: output
        }].concat(token.stack);
        return Twig.expression.parseAsync.call(state, stack, context);
      }).then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    /**
     * End apply logic tokens.
     *
     *  Format: {% endapply %}
     */
    type: Twig.logic.type.endapply,
    regex: /^endapply$/,
    next: [],
    open: false
  }, {
    /**
     * Set type logic tokens.
     *
     *  Format: {% do expression %}
     */
    type: Twig.logic.type["do"],
    regex: /^do\s+([\S\s]+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      //
      var expression = token.match[1]; // Compile the expression.

      var expressionStack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      token.expression = expressionStack;
      delete token.match;
      return token;
    },
    parse: function parse(token, context, continueChain) {
      var state = this;
      return Twig.expression.parseAsync.call(state, token.expression, context).then(function () {
        return {
          chain: continueChain,
          context: context
        };
      });
    }
  }, {
    /**
     * Block logic tokens.
     *
     *  Format: {% block title %}
     */
    type: Twig.logic.type.block,
    regex: /^block\s+(\w+)$/,
    next: [Twig.logic.type.endblock],
    open: true,
    compile: function compile(token) {
      token.blockName = token.match[1].trim();
      delete token.match;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      var promise = Twig.Promise.resolve();
      state.template.blocks.defined[token.blockName] = new Twig.Block(state.template, token);

      if (state.template.parentTemplate === null || state.template.parentTemplate instanceof Twig.Template) {
        promise = state.getBlock(token.blockName).render(state, context);
      }

      return promise.then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    /**
     * Block shorthand logic tokens.
     *
     *  Format: {% block title expression %}
     */
    type: Twig.logic.type.shortblock,
    regex: /^block\s+(\w+)\s+(.+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      var template = this;
      token.expression = token.match[2].trim();
      token.output = Twig.expression.compile({
        type: Twig.expression.type.expression,
        value: token.expression
      }).stack;
      return Twig.logic.handler[Twig.logic.type.block].compile.apply(template, [token]);
    },
    parse: function parse() {
      var state = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Twig.logic.handler[Twig.logic.type.block].parse.apply(state, args);
    }
  }, {
    /**
     * End block logic tokens.
     *
     *  Format: {% endblock %}
     */
    type: Twig.logic.type.endblock,
    regex: /^endblock(?:\s+(\w+))?$/,
    next: [],
    open: false
  }, {
    /**
     * Block logic tokens.
     *
     *  Format: {% extends "template.twig" %}
     */
    type: Twig.logic.type.extends_,
    regex: /^extends\s+(.+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      var expression = token.match[1].trim();
      delete token.match;
      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      return Twig.expression.parseAsync.call(state, token.stack, context).then(function (fileName) {
        if (Array.isArray(fileName)) {
          var result = fileName.reverse().reduce(function (acc, file) {
            try {
              return {
                render: state.template.importFile(file),
                fileName: file
              };
              /* eslint-disable-next-line no-unused-vars */
            } catch (error) {
              return acc;
            }
          }, {
            render: null,
            fileName: null
          });

          if (result.fileName !== null) {
            state.template.parentTemplate = result.fileName;
          }
        } else {
          state.template.parentTemplate = fileName;
        }

        return {
          chain: chain,
          output: ''
        };
      });
    }
  }, {
    /**
     * Block logic tokens.
     *
     *  Format: {% use "template.twig" %}
     */
    type: Twig.logic.type.use,
    regex: /^use\s+(.+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      var expression = token.match[1].trim();
      delete token.match;
      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      return Twig.expression.parseAsync.call(state, token.stack, context).then(function (filePath) {
        // Create a new state instead of using the current state
        // any defined blocks will be created in isolation
        var useTemplate = state.template.importFile(filePath);
        var useState = new Twig.ParseState(useTemplate);
        return useState.parseAsync(useTemplate.tokens).then(function () {
          state.template.blocks.imported = _objectSpread(_objectSpread({}, state.template.blocks.imported), useState.getBlocks());
        });
      }).then(function () {
        return {
          chain: chain,
          output: ''
        };
      });
    }
  }, {
    /**
     * Block logic tokens.
     *
     *  Format: {% includes "template.twig" [with {some: 'values'} only] %}
     */
    type: Twig.logic.type.include,
    regex: /^include\s+(.+?)(?:\s|$)(ignore missing(?:\s|$))?(?:with\s+([\S\s]+?))?(?:\s|$)(only)?$/,
    next: [],
    open: true,
    compile: function compile(token) {
      var match = token.match;
      var expression = match[1].trim();
      var ignoreMissing = match[2] !== undefined;
      var withContext = match[3];
      var only = match[4] !== undefined && match[4].length;
      delete token.match;
      token.only = only;
      token.ignoreMissing = ignoreMissing;
      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;

      if (withContext !== undefined) {
        token.withStack = Twig.expression.compile.call(this, {
          type: Twig.expression.type.expression,
          value: withContext.trim()
        }).stack;
      }

      return token;
    },
    parse: function parse(token, context, chain) {
      // Resolve filename
      var innerContext = token.only ? {} : _objectSpread({}, context);
      var ignoreMissing = token.ignoreMissing;
      var state = this;
      var promise = null;
      var result = {
        chain: chain,
        output: ''
      };

      if (typeof token.withStack === 'undefined') {
        promise = Twig.Promise.resolve();
      } else {
        promise = Twig.expression.parseAsync.call(state, token.withStack, context).then(function (withContext) {
          innerContext = _objectSpread(_objectSpread({}, innerContext), withContext);
        });
      }

      return promise.then(function () {
        return Twig.expression.parseAsync.call(state, token.stack, context);
      }).then(function (file) {
        var files;

        if (Array.isArray(file)) {
          files = file;
        } else {
          files = [file];
        }

        var result = files.reduce(function (acc, file) {
          if (acc.render === null) {
            if (file instanceof Twig.Template) {
              return {
                render: file.renderAsync(innerContext, {
                  isInclude: true
                }),
                lastError: null
              };
            }

            try {
              return {
                render: state.template.importFile(file).renderAsync(innerContext, {
                  isInclude: true
                }),
                lastError: null
              };
            } catch (error) {
              return {
                render: null,
                lastError: error
              };
            }
          }

          return acc;
        }, {
          render: null,
          lastError: null
        });

        if (result.render !== null) {
          return result.render;
        }

        if (result.render === null && ignoreMissing) {
          return '';
        }

        throw result.lastError;
      }).then(function (output) {
        if (output !== '') {
          result.output = output;
        }

        return result;
      });
    }
  }, {
    type: Twig.logic.type.spaceless,
    regex: /^spaceless$/,
    next: [Twig.logic.type.endspaceless],
    open: true,
    // Parse the html and return it without any spaces between tags
    parse: function parse(token, context, chain) {
      var state = this; // Parse the output without any filter

      return state.parseAsync(token.output, context).then(function (tokenOutput) {
        var // A regular expression to find closing and opening tags with spaces between them
        rBetweenTagSpaces = />\s+</g; // Replace all space between closing and opening html tags

        var output = tokenOutput.replace(rBetweenTagSpaces, '><').trim(); // Rewrap output as a Twig.Markup

        output = new Twig.Markup(output);
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, // Add the {% endspaceless %} token
  {
    type: Twig.logic.type.endspaceless,
    regex: /^endspaceless$/,
    next: [],
    open: false
  }, {
    /**
     * Macro logic tokens.
     *
     * Format: {% macro input(name = default, value, type, size) %}
     *
     */
    type: Twig.logic.type.macro,
    regex: /^macro\s+(\w+)\s*\(\s*((?:\w+(?:\s*=\s*([\s\S]+))?(?:,\s*)?)*)\s*\)$/,
    next: [Twig.logic.type.endmacro],
    open: true,
    compile: function compile(token) {
      var macroName = token.match[1];
      var rawParameters = token.match[2].split(/\s*,\s*/);
      var parameters = rawParameters.map(function (rawParameter) {
        return rawParameter.split(/\s*=\s*/)[0];
      });
      var parametersCount = parameters.length; // Duplicate check

      if (parametersCount > 1) {
        var uniq = {};

        for (var i = 0; i < parametersCount; i++) {
          var parameter = parameters[i];

          if (uniq[parameter]) {
            throw new Twig.Error('Duplicate arguments for parameter: ' + parameter);
          } else {
            uniq[parameter] = 1;
          }
        }
      }

      token.macroName = macroName;
      token.parameters = parameters;
      token.defaults = rawParameters.reduce(function (defaults, rawParameter) {
        var pair = rawParameter.split(/\s*=\s*/);
        var key = pair[0];
        var expression = pair[1];

        if (expression) {
          defaults[key] = Twig.expression.compile.call(this, {
            type: Twig.expression.type.expression,
            value: expression
          }).stack;
        } else {
          defaults[key] = undefined;
        }

        return defaults;
      }, {});
      delete token.match;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;

      state.macros[token.macroName] = function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        // Pass global context and other macros
        var macroContext = _objectSpread(_objectSpread({}, state.context), {}, {
          _self: state.macros
        }); // Save arguments


        return Twig.async.forEach(token.parameters, function (prop, i) {
          // Add parameters from context to macroContext
          if (typeof args[i] !== 'undefined') {
            macroContext[prop] = args[i];
            return true;
          }

          if (typeof token.defaults[prop] !== 'undefined') {
            return Twig.expression.parseAsync.call(this, token.defaults[prop], context).then(function (value) {
              macroContext[prop] = value;
              return Twig.Promise.resolve();
            });
          }

          macroContext[prop] = undefined;
          return true;
        }).then(function () {
          // Render
          return state.parseAsync(token.output, macroContext);
        });
      };

      return {
        chain: chain,
        output: ''
      };
    }
  }, {
    /**
     * End macro logic tokens.
     *
     * Format: {% endmacro %}
     */
    type: Twig.logic.type.endmacro,
    regex: /^endmacro$/,
    next: [],
    open: false
  }, {
    /*
    * Import logic tokens.
    *
    * Format: {% import "template.twig" as form %}
    */
    type: Twig.logic.type.import_,
    regex: /^import\s+(.+)\s+as\s+(\w+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      var expression = token.match[1].trim();
      var contextName = token.match[2].trim();
      delete token.match;
      token.expression = expression;
      token.contextName = contextName;
      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      var output = {
        chain: chain,
        output: ''
      };

      if (token.expression === '_self') {
        context[token.contextName] = state.macros;
        return output;
      }

      return Twig.expression.parseAsync.call(state, token.stack, context).then(function (filePath) {
        return state.template.importFile(filePath || token.expression);
      }).then(function (importTemplate) {
        var importState = new Twig.ParseState(importTemplate);
        return importState.parseAsync(importTemplate.tokens).then(function () {
          context[token.contextName] = importState.macros;
          return output;
        });
      });
    }
  }, {
    /*
    * From logic tokens.
    *
    * Format: {% from "template.twig" import func as form %}
    */
    type: Twig.logic.type.from,
    regex: /^from\s+(.+)\s+import\s+([a-zA-Z0-9_, ]+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      var expression = token.match[1].trim();
      var macroExpressions = token.match[2].trim().split(/\s*,\s*/);
      var macroNames = {};

      var _iterator = _createForOfIteratorHelper(macroExpressions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var res = _step.value;
          // Match function as variable
          var macroMatch = res.match(/^(\w+)\s+as\s+(\w+)$/);

          if (macroMatch) {
            macroNames[macroMatch[1].trim()] = macroMatch[2].trim();
          } else if (res.match(/^(\w+)$/)) {
            macroNames[res] = res;
          } else {// ignore import
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      delete token.match;
      token.expression = expression;
      token.macroNames = macroNames;
      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;
      return token;
    },
    parse: function parse(token, context, chain) {
      var state = this;
      var promise;

      if (token.expression === '_self') {
        promise = Twig.Promise.resolve(state.macros);
      } else {
        promise = Twig.expression.parseAsync.call(state, token.stack, context).then(function (filePath) {
          return state.template.importFile(filePath || token.expression);
        }).then(function (importTemplate) {
          var importState = new Twig.ParseState(importTemplate);
          return importState.parseAsync(importTemplate.tokens).then(function () {
            return importState.macros;
          });
        });
      }

      return promise.then(function (macros) {
        for (var macroName in token.macroNames) {
          if (macros[macroName] !== undefined) {
            context[token.macroNames[macroName]] = macros[macroName];
          }
        }

        return {
          chain: chain,
          output: ''
        };
      });
    }
  }, {
    /**
     * The embed tag combines the behaviour of include and extends.
     * It allows you to include another template's contents, just like include does.
     *
     *  Format: {% embed "template.twig" [with {some: 'values'} only] %}
     */
    type: Twig.logic.type.embed,
    regex: /^embed\s+(.+?)(?:\s+(ignore missing))?(?:\s+with\s+([\S\s]+?))?(?:\s+(only))?$/,
    next: [Twig.logic.type.endembed],
    open: true,
    compile: function compile(token) {
      var match = token.match;
      var expression = match[1].trim();
      var ignoreMissing = match[2] !== undefined;
      var withContext = match[3];
      var only = match[4] !== undefined && match[4].length;
      delete token.match;
      token.only = only;
      token.ignoreMissing = ignoreMissing;
      token.stack = Twig.expression.compile.call(this, {
        type: Twig.expression.type.expression,
        value: expression
      }).stack;

      if (withContext !== undefined) {
        token.withStack = Twig.expression.compile.call(this, {
          type: Twig.expression.type.expression,
          value: withContext.trim()
        }).stack;
      }

      return token;
    },
    parse: function parse(token, context, chain) {
      var embedContext = {};
      var promise = Twig.Promise.resolve();
      var state = this;

      if (!token.only) {
        embedContext = _objectSpread({}, context);
      }

      if (token.withStack !== undefined) {
        promise = Twig.expression.parseAsync.call(state, token.withStack, context).then(function (withContext) {
          embedContext = _objectSpread(_objectSpread({}, embedContext), withContext);
        });
      }

      return promise.then(function () {
        return Twig.expression.parseAsync.call(state, token.stack, embedContext);
      }).then(function (fileName) {
        var embedOverrideTemplate = new Twig.Template({
          data: token.output,
          base: state.template.base,
          path: state.template.path,
          url: state.template.url,
          name: state.template.name,
          method: state.template.method,
          options: state.template.options
        });

        try {
          embedOverrideTemplate.importFile(fileName);
        } catch (error) {
          if (token.ignoreMissing) {
            return '';
          } // Errors preserve references to variables in scope,
          // this removes `this` from the scope.


          state = null;
          throw error;
        }

        embedOverrideTemplate.parentTemplate = fileName;
        return embedOverrideTemplate.renderAsync(embedContext, {
          isInclude: true
        });
      }).then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  },
  /* Add the {% endembed %} token
   *
   */
  {
    type: Twig.logic.type.endembed,
    regex: /^endembed$/,
    next: [],
    open: false
  }, {
    /**
     * Block logic tokens.
     *
     *  Format: {% with {some: 'values'} [only] %}
     */
    type: Twig.logic.type["with"],
    regex: /^(?:with(?:\s+([\S\s]+?))?)(?:\s|$)(only)?$/,
    next: [Twig.logic.type.endwith],
    open: true,
    compile: function compile(token) {
      var match = token.match;
      var withContext = match[1];
      var only = match[2] !== undefined && match[2].length;
      delete token.match;
      token.only = only;

      if (withContext !== undefined) {
        token.withStack = Twig.expression.compile.call(this, {
          type: Twig.expression.type.expression,
          value: withContext.trim()
        }).stack;
      }

      return token;
    },
    parse: function parse(token, context, chain) {
      // Resolve filename
      var innerContext = {};
      var i;
      var state = this;
      var promise = Twig.Promise.resolve();

      if (!token.only) {
        innerContext = _objectSpread({}, context);
      }

      if (token.withStack !== undefined) {
        promise = Twig.expression.parseAsync.call(state, token.withStack, context).then(function (withContext) {
          for (i in withContext) {
            if (Object.hasOwnProperty.call(withContext, i)) {
              innerContext[i] = withContext[i];
            }
          }
        });
      }

      var isolatedState = new Twig.ParseState(state.template, undefined, innerContext);
      return promise.then(function () {
        return isolatedState.parseAsync(token.output);
      }).then(function (output) {
        return {
          chain: chain,
          output: output
        };
      });
    }
  }, {
    type: Twig.logic.type.endwith,
    regex: /^endwith$/,
    next: [],
    open: false
  }, {
    /**
     * Deprecated type logic tokens.
     *
     *  Format: {% deprecated 'Description' %}
     */
    type: Twig.logic.type.deprecated,
    regex: /^deprecated\s+(.+)$/,
    next: [],
    open: true,
    compile: function compile(token) {
      console.warn('Deprecation notice: ' + token.match[1]);
      return token;
    },
    parse: function parse() {
      return {};
    }
  }];
  /**
   * Registry for logic handlers.
   */

  Twig.logic.handler = {};
  /**
   * Define a new token type, available at Twig.logic.type.{type}
   */

  Twig.logic.extendType = function (type, value) {
    value = value || 'Twig.logic.type' + type;
    Twig.logic.type[type] = value;
  };
  /**
   * Extend the logic parsing functionality with a new token definition.
   *
   * // Define a new tag
   * Twig.logic.extend({
   *     type: Twig.logic.type.{type},
   *     // The pattern to match for this token
   *     regex: ...,
   *     // What token types can follow this token, leave blank if any.
   *     next: [ ... ]
   *     // Create and return compiled version of the token
   *     compile: function(token) { ... }
   *     // Parse the compiled token with the context provided by the render call
   *     //   and whether this token chain is complete.
   *     parse: function(token, context, chain) { ... }
   * });
   *
   * @param {Object} definition The new logic expression.
   */


  Twig.logic.extend = function (definition) {
    if (definition.type) {
      Twig.logic.extendType(definition.type);
    } else {
      throw new Twig.Error('Unable to extend logic definition. No type provided for ' + definition);
    }

    Twig.logic.handler[definition.type] = definition;
  }; // Extend with built-in expressions


  while (Twig.logic.definitions.length > 0) {
    Twig.logic.extend(Twig.logic.definitions.shift());
  }
  /**
   * Compile a logic token into an object ready for parsing.
   *
   * @param {Object} rawToken An uncompiled logic token.
   *
   * @return {Object} A compiled logic token, ready for parsing.
   */


  Twig.logic.compile = function (rawToken) {
    var expression = rawToken.value.trim();
    var token = Twig.logic.tokenize.call(this, expression);
    var tokenTemplate = Twig.logic.handler[token.type]; // Check if the token needs compiling

    if (tokenTemplate.compile) {
      token = tokenTemplate.compile.call(this, token);
      Twig.log.trace('Twig.logic.compile: ', 'Compiled logic token to ', token);
    }

    return token;
  };
  /**
   * Tokenize logic expressions. This function matches token expressions against regular
   * expressions provided in token definitions provided with Twig.logic.extend.
   *
   * @param {string} expression the logic token expression to tokenize
   *                (i.e. what's between {% and %})
   *
   * @return {Object} The matched token with type set to the token type and match to the regex match.
   */


  Twig.logic.tokenize = function (expression) {
    var tokenTemplateType = null;
    var tokenType = null;
    var tokenRegex = null;
    var regexArray = null;
    var regexLen = null;
    var regexI = null;
    var match = null; // Ignore whitespace around expressions.

    expression = expression.trim();

    for (tokenTemplateType in Twig.logic.handler) {
      if (Object.hasOwnProperty.call(Twig.logic.handler, tokenTemplateType)) {
        // Get the type and regex for this template type
        tokenType = Twig.logic.handler[tokenTemplateType].type;
        tokenRegex = Twig.logic.handler[tokenTemplateType].regex; // Handle multiple regular expressions per type.

        regexArray = tokenRegex;

        if (!Array.isArray(tokenRegex)) {
          regexArray = [tokenRegex];
        }

        regexLen = regexArray.length; // Check regular expressions in the order they were specified in the definition.

        for (regexI = 0; regexI < regexLen; regexI++) {
          match = regexArray[regexI].exec(expression);

          if (match !== null) {
            Twig.log.trace('Twig.logic.tokenize: ', 'Matched a ', tokenType, ' regular expression of ', match);
            return {
              type: tokenType,
              match: match
            };
          }
        }
      }
    } // No regex matches


    throw new Twig.Error('Unable to parse \'' + expression.trim() + '\'');
  };
  /**
   * Parse a logic token within a given context.
   *
   * What are logic chains?
   *      Logic chains represent a series of tokens that are connected,
   *          for example:
   *          {% if ... %} {% else %} {% endif %}
   *
   *      The chain parameter is used to signify if a chain is open of closed.
   *      open:
   *          More tokens in this chain should be parsed.
   *      closed:
   *          This token chain has completed parsing and any additional
   *          tokens (else, elseif, etc...) should be ignored.
   *
   * @param {Object} token The compiled token.
   * @param {Object} context The render context.
   * @param {boolean} chain Is this an open logic chain. If false, that means a
   *                        chain is closed and no further cases should be parsed.
   */


  Twig.logic.parse = function (token, context, chain, allowAsync) {
    return Twig.async.potentiallyAsync(this, allowAsync, function () {
      Twig.log.debug('Twig.logic.parse: ', 'Parsing logic token ', token);
      var tokenTemplate = Twig.logic.handler[token.type];
      var result;
      var state = this;

      if (!tokenTemplate.parse) {
        return '';
      }

      state.nestingStack.unshift(token);
      result = tokenTemplate.parse.call(state, token, context || {}, chain);

      if (Twig.isPromise(result)) {
        result = result.then(function (result) {
          state.nestingStack.shift();
          return result;
        });
      } else {
        state.nestingStack.shift();
      }

      return result;
    });
  };

  return Twig;
};

/***/ }),

/***/ 402:
/***/ ((module) => {

"use strict";


module.exports = function (Twig) {
  'use strict';

  Twig.Templates.registerParser('source', function (params) {
    return params.data || '';
  });
};

/***/ }),

/***/ 847:
/***/ ((module) => {

"use strict";


module.exports = function (Twig) {
  'use strict';

  Twig.Templates.registerParser('twig', function (params) {
    return new Twig.Template(params);
  });
};

/***/ }),

/***/ 148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

var _typeof2 = _interopRequireDefault(__webpack_require__(8));

// ## twig.path.js
//
// This file handles path parsing
module.exports = function (Twig) {
  'use strict';
  /**
   * Namespace for path handling.
   */

  Twig.path = {};
  /**
   * @param {Twig.Template} template
   * @param {string} path
   */

  Twig.path.expandNamespace = function (namespaces, path) {
    var namespaceIdentifiers = Object.keys(namespaces);
    var pattern = new RegExp("^(?:@(".concat(namespaceIdentifiers.join('|'), ")/|(").concat(namespaceIdentifiers.join('|'), ")::)"));
    return path.replace(pattern, function (wholeMatch, atNamespace, colonNamespace) {
      var namespaceIdentifier = atNamespace === undefined ? colonNamespace : atNamespace;
      return "".concat(namespaces[namespaceIdentifier], "/");
    });
  };
  /**
   * Generate the canonical version of a url based on the given base path and file path and in
   * the previously registered namespaces.
   *
   * @param  {string} template The Twig Template
   * @param  {string} _file    The file path, may be relative and may contain namespaces.
   *
   * @return {string}          The canonical version of the path
   */


  Twig.path.parsePath = function (template, _file) {
    var namespaces = template.options.namespaces;
    var file = _file || '';
    var hasNamespaces = namespaces && (0, _typeof2["default"])(namespaces) === 'object';
    var path = hasNamespaces ? Twig.path.expandNamespace(namespaces, file) : file;

    if (path === file) {
      path = Twig.path.relativePath(template, file);
    }

    return path;
  };
  /**
   * Generate the relative canonical version of a url based on the given base path and file path.
   *
   * @param {Twig.Template} template The Twig.Template.
   * @param {string} _file The file path, relative to the base path.
   *
   * @return {string} The canonical version of the path.
   */


  Twig.path.relativePath = function (template, _file) {
    var base;
    var basePath;
    var sepChr = '/';
    var newPath = [];
    var file = _file || '';
    var val;

    if (template.url) {
      if (typeof template.base === 'undefined') {
        base = template.url;
      } else {
        // Add slash to the end of path
        base = template.base.replace(/([^/])$/, '$1/');
      }
    } else if (template.path) {
      // Get the system-specific path separator
      var path = __webpack_require__(17);

      var sep = path.sep || sepChr;
      var relative = new RegExp('^\\.{1,2}' + sep.replace('\\', '\\\\'));
      file = file.replace(/\//g, sep);

      if (template.base !== undefined && file.match(relative) === null) {
        file = file.replace(template.base, '');
        base = template.base + sep;
      } else {
        base = path.normalize(template.path);
      }

      base = base.replace(sep + sep, sep);
      sepChr = sep;
    } else if ((template.name || template.id) && template.method && template.method !== 'fs' && template.method !== 'ajax') {
      // Custom registered loader
      base = template.base || template.name || template.id;
    } else {
      throw new Twig.Error('Cannot extend an inline template.');
    }

    basePath = base.split(sepChr); // Remove file from url

    basePath.pop();
    basePath = basePath.concat(file.split(sepChr));

    while (basePath.length > 0) {
      val = basePath.shift();

      if (val === '.') {// Ignore
      } else if (val === '..' && newPath.length > 0 && newPath[newPath.length - 1] !== '..') {
        newPath.pop();
      } else {
        newPath.push(val);
      }
    }

    return newPath.join(sepChr);
  };

  return Twig;
};

/***/ }),

/***/ 439:
/***/ ((module) => {

"use strict";


// ## twig.tests.js
//
// This file handles expression tests. (is empty, is not defined, etc...)
module.exports = function (Twig) {
  'use strict';

  Twig.tests = {
    empty: function empty(value) {
      if (value === null || value === undefined) {
        return true;
      } // Handler numbers


      if (typeof value === 'number') {
        return false;
      } // Numbers are never "empty"
      // Handle strings and arrays


      if (value.length > 0) {
        return false;
      } // Handle objects


      for (var key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          return false;
        }
      }

      return true;
    },
    odd: function odd(value) {
      return value % 2 === 1;
    },
    even: function even(value) {
      return value % 2 === 0;
    },
    'divisible by': function divisibleBy(value, params) {
      return value % params[0] === 0;
    },
    divisibleby: function divisibleby(value, params) {
      console.warn('`divisibleby` is deprecated use `divisible by`');
      return Twig.tests['divisible by'](value, params);
    },
    defined: function defined(value) {
      return value !== undefined;
    },
    none: function none(value) {
      return value === null;
    },
    "null": function _null(value) {
      return this.none(value); // Alias of none
    },
    'same as': function sameAs(value, params) {
      return value === params[0];
    },
    sameas: function sameas(value, params) {
      console.warn('`sameas` is deprecated use `same as`');
      return Twig.tests['same as'](value, params);
    },
    iterable: function iterable(value) {
      return value && (Twig.lib.is('Array', value) || Twig.lib.is('Object', value));
    }
    /*
    Constant ?
     */

  };

  Twig.test = function (test, value, params) {
    if (!Twig.tests[test]) {
      throw Twig.Error('Test ' + test + ' is not defined.');
    }

    return Twig.tests[test](value, params);
  };

  Twig.test.extend = function (test, definition) {
    Twig.tests[test] = definition;
  };

  return Twig;
};

/***/ }),

/***/ 521:
/***/ ((module) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function _phpCastString(value) {
  // original by: Rafał Kukawski
  //   example 1: _phpCastString(true)
  //   returns 1: '1'
  //   example 2: _phpCastString(false)
  //   returns 2: ''
  //   example 3: _phpCastString('foo')
  //   returns 3: 'foo'
  //   example 4: _phpCastString(0/0)
  //   returns 4: 'NAN'
  //   example 5: _phpCastString(1/0)
  //   returns 5: 'INF'
  //   example 6: _phpCastString(-1/0)
  //   returns 6: '-INF'
  //   example 7: _phpCastString(null)
  //   returns 7: ''
  //   example 8: _phpCastString(undefined)
  //   returns 8: ''
  //   example 9: _phpCastString([])
  //   returns 9: 'Array'
  //   example 10: _phpCastString({})
  //   returns 10: 'Object'
  //   example 11: _phpCastString(0)
  //   returns 11: '0'
  //   example 12: _phpCastString(1)
  //   returns 12: '1'
  //   example 13: _phpCastString(3.14)
  //   returns 13: '3.14'

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  switch (type) {
    case 'boolean':
      return value ? '1' : '';
    case 'string':
      return value;
    case 'number':
      if (isNaN(value)) {
        return 'NAN';
      }

      if (!isFinite(value)) {
        return (value < 0 ? '-' : '') + 'INF';
      }

      return value + '';
    case 'undefined':
      return '';
    case 'object':
      if (Array.isArray(value)) {
        return 'Array';
      }

      if (value !== null) {
        return 'Object';
      }

      return '';
    case 'function':
    // fall through
    default:
      throw new Error('Unsupported value type');
  }
};
//# sourceMappingURL=_phpCastString.js.map

/***/ }),

/***/ 892:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function _php_cast_float(value) {
  // eslint-disable-line camelcase
  // original by: Rafał Kukawski
  //   example 1: _php_cast_float(false)
  //   returns 1: 0
  //   example 2: _php_cast_float(true)
  //   returns 2: 1
  //   example 3: _php_cast_float(0)
  //   returns 3: 0
  //   example 4: _php_cast_float(1)
  //   returns 4: 1
  //   example 5: _php_cast_float(3.14)
  //   returns 5: 3.14
  //   example 6: _php_cast_float('')
  //   returns 6: 0
  //   example 7: _php_cast_float('0')
  //   returns 7: 0
  //   example 8: _php_cast_float('abc')
  //   returns 8: 0
  //   example 9: _php_cast_float(null)
  //   returns 9: 0
  //  example 10: _php_cast_float(undefined)
  //  returns 10: 0
  //  example 11: _php_cast_float('123abc')
  //  returns 11: 123
  //  example 12: _php_cast_float('123e4')
  //  returns 12: 1230000
  //  example 13: _php_cast_float(0x200000001)
  //  returns 13: 8589934593
  //  example 14: _php_cast_float('3.14abc')
  //  returns 14: 3.14

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  switch (type) {
    case 'number':
      return value;
    case 'string':
      return parseFloat(value) || 0;
    case 'boolean':
    // fall through
    default:
      // PHP docs state, that for types other than string
      // conversion is {input type}->int->float
      return __webpack_require__(791)(value);
  }
};
//# sourceMappingURL=_php_cast_float.js.map

/***/ }),

/***/ 791:
/***/ ((module) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function _php_cast_int(value) {
  // eslint-disable-line camelcase
  // original by: Rafał Kukawski
  //   example 1: _php_cast_int(false)
  //   returns 1: 0
  //   example 2: _php_cast_int(true)
  //   returns 2: 1
  //   example 3: _php_cast_int(0)
  //   returns 3: 0
  //   example 4: _php_cast_int(1)
  //   returns 4: 1
  //   example 5: _php_cast_int(3.14)
  //   returns 5: 3
  //   example 6: _php_cast_int('')
  //   returns 6: 0
  //   example 7: _php_cast_int('0')
  //   returns 7: 0
  //   example 8: _php_cast_int('abc')
  //   returns 8: 0
  //   example 9: _php_cast_int(null)
  //   returns 9: 0
  //  example 10: _php_cast_int(undefined)
  //  returns 10: 0
  //  example 11: _php_cast_int('123abc')
  //  returns 11: 123
  //  example 12: _php_cast_int('123e4')
  //  returns 12: 123
  //  example 13: _php_cast_int(0x200000001)
  //  returns 13: 8589934593

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  switch (type) {
    case 'number':
      if (isNaN(value) || !isFinite(value)) {
        // from PHP 7, NaN and Infinity are casted to 0
        return 0;
      }

      return value < 0 ? Math.ceil(value) : Math.floor(value);
    case 'string':
      return parseInt(value, 10) || 0;
    case 'boolean':
    // fall through
    default:
      // Behaviour for types other than float, string, boolean
      // is undefined and can change any time.
      // To not invent complex logic
      // that mimics PHP 7.0 behaviour
      // casting value->bool->number is used
      return +!!value;
  }
};
//# sourceMappingURL=_php_cast_int.js.map

/***/ }),

/***/ 190:
/***/ ((module) => {

"use strict";


module.exports = function date(format, timestamp) {
  //  discuss at: https://locutus.io/php/date/
  // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
  // original by: gettimeofday
  //    parts by: Peter-Paul Koch (https://www.quirksmode.org/js/beat.html)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: MeEtc (https://yass.meetcweb.com)
  // improved by: Brad Touesnard
  // improved by: Tim Wiel
  // improved by: Bryan Elliott
  // improved by: David Randall
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Thomas Beaucourt (https://www.webapp.fr)
  // improved by: JT
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  // improved by: Theriault (https://github.com/Theriault)
  //    input by: Brett Zamir (https://brett-zamir.me)
  //    input by: majak
  //    input by: Alex
  //    input by: Martin
  //    input by: Alex Wilson
  //    input by: Haravikk
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: majak
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: omid (https://locutus.io/php/380:380#comment_137122)
  // bugfixed by: Chris (https://www.devotis.nl/)
  //      note 1: Uses global: locutus to store the default timezone
  //      note 1: Although the function potentially allows timezone info
  //      note 1: (see notes), it currently does not set
  //      note 1: per a timezone specified by date_default_timezone_set(). Implementers might use
  //      note 1: $locutus.currentTimezoneOffset and
  //      note 1: $locutus.currentTimezoneDST set by that function
  //      note 1: in order to adjust the dates in this function
  //      note 1: (or our other date functions!) accordingly
  //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
  //   returns 1: '07:09:40 m is month'
  //   example 2: date('F j, Y, g:i a', 1062462400)
  //   returns 2: 'September 2, 2003, 12:26 am'
  //   example 3: date('Y W o', 1062462400)
  //   returns 3: '2003 36 2003'
  //   example 4: var $x = date('Y m d', (new Date()).getTime() / 1000)
  //   example 4: $x = $x + ''
  //   example 4: var $result = $x.length // 2009 01 09
  //   returns 4: 10
  //   example 5: date('W', 1104534000)
  //   returns 5: '52'
  //   example 6: date('B t', 1104534000)
  //   returns 6: '999 31'
  //   example 7: date('W U', 1293750000.82); // 2010-12-31
  //   returns 7: '52 1293750000'
  //   example 8: date('W', 1293836400); // 2011-01-01
  //   returns 8: '52'
  //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  //   returns 9: '52 2011-01-02'
  //        test: skip-1 skip-2 skip-5

  var jsdate = void 0,
      f = void 0;
  // Keep this here (works, but for code commented-out below for file size reasons)
  // var tal= [];
  var txtWords = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // trailing backslash -> (dropped)
  // a backslash followed by any character (including backslash) -> the character
  // empty string -> empty string
  var formatChr = /\\?(.?)/gi;
  var formatChrCb = function formatChrCb(t, s) {
    return f[t] ? f[t]() : s;
  };
  var _pad = function _pad(n, c) {
    n = String(n);
    while (n.length < c) {
      n = '0' + n;
    }
    return n;
  };
  f = {
    // Day
    d: function d() {
      // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function D() {
      // Shorthand day name; Mon...Sun
      return f.l().slice(0, 3);
    },
    j: function j() {
      // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function l() {
      // Full day name; Monday...Sunday
      return txtWords[f.w()] + 'day';
    },
    N: function N() {
      // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function S() {
      // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j();
      var i = j % 10;
      if (i <= 3 && parseInt(j % 100 / 10, 10) === 1) {
        i = 0;
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th';
    },
    w: function w() {
      // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function z() {
      // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j());
      var b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function W() {
      // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
      var b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function F() {
      // Full month name; January...December
      return txtWords[6 + f.n()];
    },
    m: function m() {
      // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function M() {
      // Shorthand month name; Jan...Dec
      return f.F().slice(0, 3);
    },
    n: function n() {
      // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function t() {
      // Days in month; 28...31
      return new Date(f.Y(), f.n(), 0).getDate();
    },

    // Year
    L: function L() {
      // Is leap year?; 0 or 1
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
    },
    o: function o() {
      // ISO-8601 year
      var n = f.n();
      var W = f.W();
      var Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function Y() {
      // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function y() {
      // Last two digits of year; 00...99
      return f.Y().toString().slice(-2);
    },

    // Time
    a: function a() {
      // am or pm
      return jsdate.getHours() > 11 ? 'pm' : 'am';
    },
    A: function A() {
      // AM or PM
      return f.a().toUpperCase();
    },
    B: function B() {
      // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2;
      // Hours
      var i = jsdate.getUTCMinutes() * 60;
      // Minutes
      // Seconds
      var s = jsdate.getUTCSeconds();
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function g() {
      // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function G() {
      // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function h() {
      // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function H() {
      // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function i() {
      // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function s() {
      // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function u() {
      // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function e() {
      // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      var msg = 'Not supported (see source code of date() for timezone on how to add support)';
      throw new Error(msg);
    },
    I: function I() {
      // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0);
      // Jan 1
      var c = Date.UTC(f.Y(), 0);
      // Jan 1 UTC
      var b = new Date(f.Y(), 6);
      // Jul 1
      // Jul 1 UTC
      var d = Date.UTC(f.Y(), 6);
      return a - c !== b - d ? 1 : 0;
    },
    O: function O() {
      // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset();
      var a = Math.abs(tzo);
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function P() {
      // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return O.substr(0, 3) + ':' + O.substr(3, 2);
    },
    T: function T() {
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
      /*              var abbr, i, os, _default;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if ($locutus && $locutus.default_timezone) {
        _default = $locutus.default_timezone;
        for (abbr in tal) {
          for (i = 0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === _default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
      */
      return 'UTC';
    },
    Z: function Z() {
      // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function c() {
      // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function r() {
      // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function U() {
      // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };

  var _date = function _date(format, timestamp) {
    jsdate = timestamp === undefined ? new Date() // Not provided
    : timestamp instanceof Date ? new Date(timestamp) // JS Date()
    : new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    ;
    return format.replace(formatChr, formatChrCb);
  };

  return _date(format, timestamp);
};
//# sourceMappingURL=date.js.map

/***/ }),

/***/ 195:
/***/ ((module) => {

"use strict";


var reSpace = '[ \\t]+';
var reSpaceOpt = '[ \\t]*';
var reMeridian = '(?:([ap])\\.?m\\.?([\\t ]|$))';
var reHour24 = '(2[0-4]|[01]?[0-9])';
var reHour24lz = '([01][0-9]|2[0-4])';
var reHour12 = '(0?[1-9]|1[0-2])';
var reMinute = '([0-5]?[0-9])';
var reMinutelz = '([0-5][0-9])';
var reSecond = '(60|[0-5]?[0-9])';
var reSecondlz = '(60|[0-5][0-9])';
var reFrac = '(?:\\.([0-9]+))';

var reDayfull = 'sunday|monday|tuesday|wednesday|thursday|friday|saturday';
var reDayabbr = 'sun|mon|tue|wed|thu|fri|sat';
var reDaytext = reDayfull + '|' + reDayabbr + '|weekdays?';

var reReltextnumber = 'first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth';
var reReltexttext = 'next|last|previous|this';
var reReltextunit = '(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|' + reDaytext;

var reYear = '([0-9]{1,4})';
var reYear2 = '([0-9]{2})';
var reYear4 = '([0-9]{4})';
var reYear4withSign = '([+-]?[0-9]{4})';
var reMonth = '(1[0-2]|0?[0-9])';
var reMonthlz = '(0[0-9]|1[0-2])';
var reDay = '(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)';
var reDaylz = '(0[0-9]|[1-2][0-9]|3[01])';

var reMonthFull = 'january|february|march|april|may|june|july|august|september|october|november|december';
var reMonthAbbr = 'jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec';
var reMonthroman = 'i[vx]|vi{0,3}|xi{0,2}|i{1,3}';
var reMonthText = '(' + reMonthFull + '|' + reMonthAbbr + '|' + reMonthroman + ')';

var reTzCorrection = '((?:GMT)?([+-])' + reHour24 + ':?' + reMinute + '?)';
var reTzAbbr = '\\(?([a-zA-Z]{1,6})\\)?';
var reDayOfYear = '(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])';
var reWeekOfYear = '(0[1-9]|[1-4][0-9]|5[0-3])';

var reDateNoYear = reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]*';

function processMeridian(hour, meridian) {
  meridian = meridian && meridian.toLowerCase();

  switch (meridian) {
    case 'a':
      hour += hour === 12 ? -12 : 0;
      break;
    case 'p':
      hour += hour !== 12 ? 12 : 0;
      break;
  }

  return hour;
}

function processYear(yearStr) {
  var year = +yearStr;

  if (yearStr.length < 4 && year < 100) {
    year += year < 70 ? 2000 : 1900;
  }

  return year;
}

function lookupMonth(monthStr) {
  return {
    jan: 0,
    january: 0,
    i: 0,
    feb: 1,
    february: 1,
    ii: 1,
    mar: 2,
    march: 2,
    iii: 2,
    apr: 3,
    april: 3,
    iv: 3,
    may: 4,
    v: 4,
    jun: 5,
    june: 5,
    vi: 5,
    jul: 6,
    july: 6,
    vii: 6,
    aug: 7,
    august: 7,
    viii: 7,
    sep: 8,
    sept: 8,
    september: 8,
    ix: 8,
    oct: 9,
    october: 9,
    x: 9,
    nov: 10,
    november: 10,
    xi: 10,
    dec: 11,
    december: 11,
    xii: 11
  }[monthStr.toLowerCase()];
}

function lookupWeekday(dayStr) {
  var desiredSundayNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var dayNumbers = {
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
    sun: 0,
    sunday: 0
  };

  return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber;
}

function lookupRelative(relText) {
  var relativeNumbers = {
    last: -1,
    previous: -1,
    this: 0,
    first: 1,
    next: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eight: 8,
    eighth: 8,
    ninth: 9,
    tenth: 10,
    eleventh: 11,
    twelfth: 12
  };

  var relativeBehavior = {
    this: 1
  };

  var relTextLower = relText.toLowerCase();

  return {
    amount: relativeNumbers[relTextLower],
    behavior: relativeBehavior[relTextLower] || 0
  };
}

function processTzCorrection(tzOffset, oldValue) {
  var reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i;
  tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose);

  if (!tzOffset) {
    return oldValue;
  }

  var sign = tzOffset[1] === '-' ? -1 : 1;
  var hours = +tzOffset[2];
  var minutes = +tzOffset[4];

  if (!tzOffset[4] && !tzOffset[3]) {
    minutes = Math.floor(hours % 100);
    hours = Math.floor(hours / 100);
  }

  // timezone offset in seconds
  return sign * (hours * 60 + minutes) * 60;
}

// tz abbrevation : tz offset in seconds
var tzAbbrOffsets = {
  acdt: 37800,
  acst: 34200,
  addt: -7200,
  adt: -10800,
  aedt: 39600,
  aest: 36000,
  ahdt: -32400,
  ahst: -36000,
  akdt: -28800,
  akst: -32400,
  amt: -13840,
  apt: -10800,
  ast: -14400,
  awdt: 32400,
  awst: 28800,
  awt: -10800,
  bdst: 7200,
  bdt: -36000,
  bmt: -14309,
  bst: 3600,
  cast: 34200,
  cat: 7200,
  cddt: -14400,
  cdt: -18000,
  cemt: 10800,
  cest: 7200,
  cet: 3600,
  cmt: -15408,
  cpt: -18000,
  cst: -21600,
  cwt: -18000,
  chst: 36000,
  dmt: -1521,
  eat: 10800,
  eddt: -10800,
  edt: -14400,
  eest: 10800,
  eet: 7200,
  emt: -26248,
  ept: -14400,
  est: -18000,
  ewt: -14400,
  ffmt: -14660,
  fmt: -4056,
  gdt: 39600,
  gmt: 0,
  gst: 36000,
  hdt: -34200,
  hkst: 32400,
  hkt: 28800,
  hmt: -19776,
  hpt: -34200,
  hst: -36000,
  hwt: -34200,
  iddt: 14400,
  idt: 10800,
  imt: 25025,
  ist: 7200,
  jdt: 36000,
  jmt: 8440,
  jst: 32400,
  kdt: 36000,
  kmt: 5736,
  kst: 30600,
  lst: 9394,
  mddt: -18000,
  mdst: 16279,
  mdt: -21600,
  mest: 7200,
  met: 3600,
  mmt: 9017,
  mpt: -21600,
  msd: 14400,
  msk: 10800,
  mst: -25200,
  mwt: -21600,
  nddt: -5400,
  ndt: -9052,
  npt: -9000,
  nst: -12600,
  nwt: -9000,
  nzdt: 46800,
  nzmt: 41400,
  nzst: 43200,
  pddt: -21600,
  pdt: -25200,
  pkst: 21600,
  pkt: 18000,
  plmt: 25590,
  pmt: -13236,
  ppmt: -17340,
  ppt: -25200,
  pst: -28800,
  pwt: -25200,
  qmt: -18840,
  rmt: 5794,
  sast: 7200,
  sdmt: -16800,
  sjmt: -20173,
  smt: -13884,
  sst: -39600,
  tbmt: 10751,
  tmt: 12344,
  uct: 0,
  utc: 0,
  wast: 7200,
  wat: 3600,
  wemt: 7200,
  west: 3600,
  wet: 0,
  wib: 25200,
  wita: 28800,
  wit: 32400,
  wmt: 5040,
  yddt: -25200,
  ydt: -28800,
  ypt: -28800,
  yst: -32400,
  ywt: -28800,
  a: 3600,
  b: 7200,
  c: 10800,
  d: 14400,
  e: 18000,
  f: 21600,
  g: 25200,
  h: 28800,
  i: 32400,
  k: 36000,
  l: 39600,
  m: 43200,
  n: -3600,
  o: -7200,
  p: -10800,
  q: -14400,
  r: -18000,
  s: -21600,
  t: -25200,
  u: -28800,
  v: -32400,
  w: -36000,
  x: -39600,
  y: -43200,
  z: 0
};

var formats = {
  yesterday: {
    regex: /^yesterday/i,
    name: 'yesterday',
    callback: function callback() {
      this.rd -= 1;
      return this.resetTime();
    }
  },

  now: {
    regex: /^now/i,
    name: 'now'
    // do nothing
  },

  noon: {
    regex: /^noon/i,
    name: 'noon',
    callback: function callback() {
      return this.resetTime() && this.time(12, 0, 0, 0);
    }
  },

  midnightOrToday: {
    regex: /^(midnight|today)/i,
    name: 'midnight | today',
    callback: function callback() {
      return this.resetTime();
    }
  },

  tomorrow: {
    regex: /^tomorrow/i,
    name: 'tomorrow',
    callback: function callback() {
      this.rd += 1;
      return this.resetTime();
    }
  },

  timestamp: {
    regex: /^@(-?\d+)/i,
    name: 'timestamp',
    callback: function callback(match, timestamp) {
      this.rs += +timestamp;
      this.y = 1970;
      this.m = 0;
      this.d = 1;
      this.dates = 0;

      return this.resetTime() && this.zone(0);
    }
  },

  firstOrLastDay: {
    regex: /^(first|last) day of/i,
    name: 'firstdayof | lastdayof',
    callback: function callback(match, day) {
      if (day.toLowerCase() === 'first') {
        this.firstOrLastDayOfMonth = 1;
      } else {
        this.firstOrLastDayOfMonth = -1;
      }
    }
  },

  backOrFrontOf: {
    regex: RegExp('^(back|front) of ' + reHour24 + reSpaceOpt + reMeridian + '?', 'i'),
    name: 'backof | frontof',
    callback: function callback(match, side, hours, meridian) {
      var back = side.toLowerCase() === 'back';
      var hour = +hours;
      var minute = 15;

      if (!back) {
        hour -= 1;
        minute = 45;
      }

      hour = processMeridian(hour, meridian);

      return this.resetTime() && this.time(hour, minute, 0, 0);
    }
  },

  weekdayOf: {
    regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reDayfull + '|' + reDayabbr + ')' + reSpace + 'of', 'i'),
    name: 'weekdayof'
    // todo
  },

  mssqltime: {
    regex: RegExp('^' + reHour12 + ':' + reMinutelz + ':' + reSecondlz + '[:.]([0-9]+)' + reMeridian, 'i'),
    name: 'mssqltime',
    callback: function callback(match, hour, minute, second, frac, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3));
    }
  },

  timeLong12: {
    regex: RegExp('^' + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
    name: 'timelong12',
    callback: function callback(match, hour, minute, second, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, +second, 0);
    }
  },

  timeShort12: {
    regex: RegExp('^' + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
    name: 'timeshort12',
    callback: function callback(match, hour, minute, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, 0, 0);
    }
  },

  timeTiny12: {
    regex: RegExp('^' + reHour12 + reSpaceOpt + reMeridian, 'i'),
    name: 'timetiny12',
    callback: function callback(match, hour, meridian) {
      return this.time(processMeridian(+hour, meridian), 0, 0, 0);
    }
  },

  soap: {
    regex: RegExp('^' + reYear4 + '-' + reMonthlz + '-' + reDaylz + 'T' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reFrac + reTzCorrection + '?', 'i'),
    name: 'soap',
    callback: function callback(match, year, month, day, hour, minute, second, frac, tzCorrection) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, +frac.substr(0, 3)) && this.zone(processTzCorrection(tzCorrection));
    }
  },

  wddx: {
    regex: RegExp('^' + reYear4 + '-' + reMonth + '-' + reDay + 'T' + reHour24 + ':' + reMinute + ':' + reSecond),
    name: 'wddx',
    callback: function callback(match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
    }
  },

  exif: {
    regex: RegExp('^' + reYear4 + ':' + reMonthlz + ':' + reDaylz + ' ' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz, 'i'),
    name: 'exif',
    callback: function callback(match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
    }
  },

  xmlRpc: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + 'T' + reHour24 + ':' + reMinutelz + ':' + reSecondlz),
    name: 'xmlrpc',
    callback: function callback(match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
    }
  },

  xmlRpcNoColon: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + '[Tt]' + reHour24 + reMinutelz + reSecondlz),
    name: 'xmlrpcnocolon',
    callback: function callback(match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
    }
  },

  clf: {
    regex: RegExp('^' + reDay + '/(' + reMonthAbbr + ')/' + reYear4 + ':' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reSpace + reTzCorrection, 'i'),
    name: 'clf',
    callback: function callback(match, day, month, year, hour, minute, second, tzCorrection) {
      return this.ymd(+year, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0) && this.zone(processTzCorrection(tzCorrection));
    }
  },

  iso8601long: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond + reFrac, 'i'),
    name: 'iso8601long',
    callback: function callback(match, hour, minute, second, frac) {
      return this.time(+hour, +minute, +second, +frac.substr(0, 3));
    }
  },

  dateTextual: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]+' + reYear, 'i'),
    name: 'datetextual',
    callback: function callback(match, month, day, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day);
    }
  },

  pointedDate4: {
    regex: RegExp('^' + reDay + '[.\\t-]' + reMonth + '[.-]' + reYear4),
    name: 'pointeddate4',
    callback: function callback(match, day, month, year) {
      return this.ymd(+year, month - 1, +day);
    }
  },

  pointedDate2: {
    regex: RegExp('^' + reDay + '[.\\t]' + reMonth + '\\.' + reYear2),
    name: 'pointeddate2',
    callback: function callback(match, day, month, year) {
      return this.ymd(processYear(year), month - 1, +day);
    }
  },

  timeLong24: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond),
    name: 'timelong24',
    callback: function callback(match, hour, minute, second) {
      return this.time(+hour, +minute, +second, 0);
    }
  },

  dateNoColon: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz),
    name: 'datenocolon',
    callback: function callback(match, year, month, day) {
      return this.ymd(+year, month - 1, +day);
    }
  },

  pgydotd: {
    regex: RegExp('^' + reYear4 + '\\.?' + reDayOfYear),
    name: 'pgydotd',
    callback: function callback(match, year, day) {
      return this.ymd(+year, 0, +day);
    }
  },

  timeShort24: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute, 'i'),
    name: 'timeshort24',
    callback: function callback(match, hour, minute) {
      return this.time(+hour, +minute, 0, 0);
    }
  },

  iso8601noColon: {
    regex: RegExp('^t?' + reHour24lz + reMinutelz + reSecondlz, 'i'),
    name: 'iso8601nocolon',
    callback: function callback(match, hour, minute, second) {
      return this.time(+hour, +minute, +second, 0);
    }
  },

  iso8601dateSlash: {
    // eventhough the trailing slash is optional in PHP
    // here it's mandatory and inputs without the slash
    // are handled by dateslash
    regex: RegExp('^' + reYear4 + '/' + reMonthlz + '/' + reDaylz + '/'),
    name: 'iso8601dateslash',
    callback: function callback(match, year, month, day) {
      return this.ymd(+year, month - 1, +day);
    }
  },

  dateSlash: {
    regex: RegExp('^' + reYear4 + '/' + reMonth + '/' + reDay),
    name: 'dateslash',
    callback: function callback(match, year, month, day) {
      return this.ymd(+year, month - 1, +day);
    }
  },

  american: {
    regex: RegExp('^' + reMonth + '/' + reDay + '/' + reYear),
    name: 'american',
    callback: function callback(match, month, day, year) {
      return this.ymd(processYear(year), month - 1, +day);
    }
  },

  americanShort: {
    regex: RegExp('^' + reMonth + '/' + reDay),
    name: 'americanshort',
    callback: function callback(match, month, day) {
      return this.ymd(this.y, month - 1, +day);
    }
  },

  gnuDateShortOrIso8601date2: {
    // iso8601date2 is complete subset of gnudateshort
    regex: RegExp('^' + reYear + '-' + reMonth + '-' + reDay),
    name: 'gnudateshort | iso8601date2',
    callback: function callback(match, year, month, day) {
      return this.ymd(processYear(year), month - 1, +day);
    }
  },

  iso8601date4: {
    regex: RegExp('^' + reYear4withSign + '-' + reMonthlz + '-' + reDaylz),
    name: 'iso8601date4',
    callback: function callback(match, year, month, day) {
      return this.ymd(+year, month - 1, +day);
    }
  },

  gnuNoColon: {
    regex: RegExp('^t?' + reHour24lz + reMinutelz, 'i'),
    name: 'gnunocolon',
    callback: function callback(match, hour, minute) {
      // this rule is a special case
      // if time was already set once by any preceding rule, it sets the captured value as year
      switch (this.times) {
        case 0:
          return this.time(+hour, +minute, 0, this.f);
        case 1:
          this.y = hour * 100 + +minute;
          this.times++;

          return true;
        default:
          return false;
      }
    }
  },

  gnuDateShorter: {
    regex: RegExp('^' + reYear4 + '-' + reMonth),
    name: 'gnudateshorter',
    callback: function callback(match, year, month) {
      return this.ymd(+year, month - 1, 1);
    }
  },

  pgTextReverse: {
    // note: allowed years are from 32-9999
    // years below 32 should be treated as days in datefull
    regex: RegExp('^' + '(\\d{3,4}|[4-9]\\d|3[2-9])-(' + reMonthAbbr + ')-' + reDaylz, 'i'),
    name: 'pgtextreverse',
    callback: function callback(match, year, month, day) {
      return this.ymd(processYear(year), lookupMonth(month), +day);
    }
  },

  dateFull: {
    regex: RegExp('^' + reDay + '[ \\t.-]*' + reMonthText + '[ \\t.-]*' + reYear, 'i'),
    name: 'datefull',
    callback: function callback(match, day, month, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day);
    }
  },

  dateNoDay: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reYear4, 'i'),
    name: 'datenoday',
    callback: function callback(match, month, year) {
      return this.ymd(+year, lookupMonth(month), 1);
    }
  },

  dateNoDayRev: {
    regex: RegExp('^' + reYear4 + '[ .\\t-]*' + reMonthText, 'i'),
    name: 'datenodayrev',
    callback: function callback(match, year, month) {
      return this.ymd(+year, lookupMonth(month), 1);
    }
  },

  pgTextShort: {
    regex: RegExp('^(' + reMonthAbbr + ')-' + reDaylz + '-' + reYear, 'i'),
    name: 'pgtextshort',
    callback: function callback(match, month, day, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day);
    }
  },

  dateNoYear: {
    regex: RegExp('^' + reDateNoYear, 'i'),
    name: 'datenoyear',
    callback: function callback(match, month, day) {
      return this.ymd(this.y, lookupMonth(month), +day);
    }
  },

  dateNoYearRev: {
    regex: RegExp('^' + reDay + '[ .\\t-]*' + reMonthText, 'i'),
    name: 'datenoyearrev',
    callback: function callback(match, day, month) {
      return this.ymd(this.y, lookupMonth(month), +day);
    }
  },

  isoWeekDay: {
    regex: RegExp('^' + reYear4 + '-?W' + reWeekOfYear + '(?:-?([0-7]))?'),
    name: 'isoweekday | isoweek',
    callback: function callback(match, year, week, day) {
      day = day ? +day : 1;

      if (!this.ymd(+year, 0, 1)) {
        return false;
      }

      // get day of week for Jan 1st
      var dayOfWeek = new Date(this.y, this.m, this.d).getDay();

      // and use the day to figure out the offset for day 1 of week 1
      dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek);

      this.rd += dayOfWeek + (week - 1) * 7 + day;
    }
  },

  relativeText: {
    regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reReltextunit + ')', 'i'),
    name: 'relativetext',
    callback: function callback(match, relValue, relUnit) {
      // todo: implement handling of 'this time-unit'
      // eslint-disable-next-line no-unused-vars
      var _lookupRelative = lookupRelative(relValue),
          amount = _lookupRelative.amount,
          behavior = _lookupRelative.behavior;

      switch (relUnit.toLowerCase()) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
          this.rs += amount;
          break;
        case 'min':
        case 'mins':
        case 'minute':
        case 'minutes':
          this.ri += amount;
          break;
        case 'hour':
        case 'hours':
          this.rh += amount;
          break;
        case 'day':
        case 'days':
          this.rd += amount;
          break;
        case 'fortnight':
        case 'fortnights':
        case 'forthnight':
        case 'forthnights':
          this.rd += amount * 14;
          break;
        case 'week':
        case 'weeks':
          this.rd += amount * 7;
          break;
        case 'month':
        case 'months':
          this.rm += amount;
          break;
        case 'year':
        case 'years':
          this.ry += amount;
          break;
        case 'mon':case 'monday':
        case 'tue':case 'tuesday':
        case 'wed':case 'wednesday':
        case 'thu':case 'thursday':
        case 'fri':case 'friday':
        case 'sat':case 'saturday':
        case 'sun':case 'sunday':
          this.resetTime();
          this.weekday = lookupWeekday(relUnit, 7);
          this.weekdayBehavior = 1;
          this.rd += (amount > 0 ? amount - 1 : amount) * 7;
          break;
        case 'weekday':
        case 'weekdays':
          // todo
          break;
      }
    }
  },

  relative: {
    regex: RegExp('^([+-]*)[ \\t]*(\\d+)' + reSpaceOpt + '(' + reReltextunit + '|week)', 'i'),
    name: 'relative',
    callback: function callback(match, signs, relValue, relUnit) {
      var minuses = signs.replace(/[^-]/g, '').length;

      var amount = +relValue * Math.pow(-1, minuses);

      switch (relUnit.toLowerCase()) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
          this.rs += amount;
          break;
        case 'min':
        case 'mins':
        case 'minute':
        case 'minutes':
          this.ri += amount;
          break;
        case 'hour':
        case 'hours':
          this.rh += amount;
          break;
        case 'day':
        case 'days':
          this.rd += amount;
          break;
        case 'fortnight':
        case 'fortnights':
        case 'forthnight':
        case 'forthnights':
          this.rd += amount * 14;
          break;
        case 'week':
        case 'weeks':
          this.rd += amount * 7;
          break;
        case 'month':
        case 'months':
          this.rm += amount;
          break;
        case 'year':
        case 'years':
          this.ry += amount;
          break;
        case 'mon':case 'monday':
        case 'tue':case 'tuesday':
        case 'wed':case 'wednesday':
        case 'thu':case 'thursday':
        case 'fri':case 'friday':
        case 'sat':case 'saturday':
        case 'sun':case 'sunday':
          this.resetTime();
          this.weekday = lookupWeekday(relUnit, 7);
          this.weekdayBehavior = 1;
          this.rd += (amount > 0 ? amount - 1 : amount) * 7;
          break;
        case 'weekday':
        case 'weekdays':
          // todo
          break;
      }
    }
  },

  dayText: {
    regex: RegExp('^(' + reDaytext + ')', 'i'),
    name: 'daytext',
    callback: function callback(match, dayText) {
      this.resetTime();
      this.weekday = lookupWeekday(dayText, 0);

      if (this.weekdayBehavior !== 2) {
        this.weekdayBehavior = 1;
      }
    }
  },

  relativeTextWeek: {
    regex: RegExp('^(' + reReltexttext + ')' + reSpace + 'week', 'i'),
    name: 'relativetextweek',
    callback: function callback(match, relText) {
      this.weekdayBehavior = 2;

      switch (relText.toLowerCase()) {
        case 'this':
          this.rd += 0;
          break;
        case 'next':
          this.rd += 7;
          break;
        case 'last':
        case 'previous':
          this.rd -= 7;
          break;
      }

      if (isNaN(this.weekday)) {
        this.weekday = 1;
      }
    }
  },

  monthFullOrMonthAbbr: {
    regex: RegExp('^(' + reMonthFull + '|' + reMonthAbbr + ')', 'i'),
    name: 'monthfull | monthabbr',
    callback: function callback(match, month) {
      return this.ymd(this.y, lookupMonth(month), this.d);
    }
  },

  tzCorrection: {
    regex: RegExp('^' + reTzCorrection, 'i'),
    name: 'tzcorrection',
    callback: function callback(tzCorrection) {
      return this.zone(processTzCorrection(tzCorrection));
    }
  },

  tzAbbr: {
    regex: RegExp('^' + reTzAbbr),
    name: 'tzabbr',
    callback: function callback(match, abbr) {
      var offset = tzAbbrOffsets[abbr.toLowerCase()];

      if (isNaN(offset)) {
        return false;
      }

      return this.zone(offset);
    }
  },

  ago: {
    regex: /^ago/i,
    name: 'ago',
    callback: function callback() {
      this.ry = -this.ry;
      this.rm = -this.rm;
      this.rd = -this.rd;
      this.rh = -this.rh;
      this.ri = -this.ri;
      this.rs = -this.rs;
      this.rf = -this.rf;
    }
  },

  year4: {
    regex: RegExp('^' + reYear4),
    name: 'year4',
    callback: function callback(match, year) {
      this.y = +year;
      return true;
    }
  },

  whitespace: {
    regex: /^[ .,\t]+/,
    name: 'whitespace'
    // do nothing
  },

  dateShortWithTimeLong: {
    regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond, 'i'),
    name: 'dateshortwithtimelong',
    callback: function callback(match, month, day, hour, minute, second) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0);
    }
  },

  dateShortWithTimeLong12: {
    regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
    name: 'dateshortwithtimelong12',
    callback: function callback(match, month, day, hour, minute, second, meridian) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, +second, 0);
    }
  },

  dateShortWithTimeShort: {
    regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute, 'i'),
    name: 'dateshortwithtimeshort',
    callback: function callback(match, month, day, hour, minute) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, 0, 0);
    }
  },

  dateShortWithTimeShort12: {
    regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
    name: 'dateshortwithtimeshort12',
    callback: function callback(match, month, day, hour, minute, meridian) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, 0, 0);
    }
  }
};

var resultProto = {
  // date
  y: NaN,
  m: NaN,
  d: NaN,
  // time
  h: NaN,
  i: NaN,
  s: NaN,
  f: NaN,

  // relative shifts
  ry: 0,
  rm: 0,
  rd: 0,
  rh: 0,
  ri: 0,
  rs: 0,
  rf: 0,

  // weekday related shifts
  weekday: NaN,
  weekdayBehavior: 0,

  // first or last day of month
  // 0 none, 1 first, -1 last
  firstOrLastDayOfMonth: 0,

  // timezone correction in minutes
  z: NaN,

  // counters
  dates: 0,
  times: 0,
  zones: 0,

  // helper functions
  ymd: function ymd(y, m, d) {
    if (this.dates > 0) {
      return false;
    }

    this.dates++;
    this.y = y;
    this.m = m;
    this.d = d;
    return true;
  },
  time: function time(h, i, s, f) {
    if (this.times > 0) {
      return false;
    }

    this.times++;
    this.h = h;
    this.i = i;
    this.s = s;
    this.f = f;

    return true;
  },
  resetTime: function resetTime() {
    this.h = 0;
    this.i = 0;
    this.s = 0;
    this.f = 0;
    this.times = 0;

    return true;
  },
  zone: function zone(minutes) {
    if (this.zones <= 1) {
      this.zones++;
      this.z = minutes;
      return true;
    }

    return false;
  },
  toDate: function toDate(relativeTo) {
    if (this.dates && !this.times) {
      this.h = this.i = this.s = this.f = 0;
    }

    // fill holes
    if (isNaN(this.y)) {
      this.y = relativeTo.getFullYear();
    }

    if (isNaN(this.m)) {
      this.m = relativeTo.getMonth();
    }

    if (isNaN(this.d)) {
      this.d = relativeTo.getDate();
    }

    if (isNaN(this.h)) {
      this.h = relativeTo.getHours();
    }

    if (isNaN(this.i)) {
      this.i = relativeTo.getMinutes();
    }

    if (isNaN(this.s)) {
      this.s = relativeTo.getSeconds();
    }

    if (isNaN(this.f)) {
      this.f = relativeTo.getMilliseconds();
    }

    // adjust special early
    switch (this.firstOrLastDayOfMonth) {
      case 1:
        this.d = 1;
        break;
      case -1:
        this.d = 0;
        this.m += 1;
        break;
    }

    if (!isNaN(this.weekday)) {
      var date = new Date(relativeTo.getTime());
      date.setFullYear(this.y, this.m, this.d);
      date.setHours(this.h, this.i, this.s, this.f);

      var dow = date.getDay();

      if (this.weekdayBehavior === 2) {
        // To make "this week" work, where the current day of week is a "sunday"
        if (dow === 0 && this.weekday !== 0) {
          this.weekday = -6;
        }

        // To make "sunday this week" work, where the current day of week is not a "sunday"
        if (this.weekday === 0 && dow !== 0) {
          this.weekday = 7;
        }

        this.d -= dow;
        this.d += this.weekday;
      } else {
        var diff = this.weekday - dow;

        // some PHP magic
        if (this.rd < 0 && diff < 0 || this.rd >= 0 && diff <= -this.weekdayBehavior) {
          diff += 7;
        }

        if (this.weekday >= 0) {
          this.d += diff;
        } else {
          this.d -= 7 - (Math.abs(this.weekday) - dow);
        }

        this.weekday = NaN;
      }
    }

    // adjust relative
    this.y += this.ry;
    this.m += this.rm;
    this.d += this.rd;

    this.h += this.rh;
    this.i += this.ri;
    this.s += this.rs;
    this.f += this.rf;

    this.ry = this.rm = this.rd = 0;
    this.rh = this.ri = this.rs = this.rf = 0;

    var result = new Date(relativeTo.getTime());
    // since Date constructor treats years <= 99 as 1900+
    // it can't be used, thus this weird way
    result.setFullYear(this.y, this.m, this.d);
    result.setHours(this.h, this.i, this.s, this.f);

    // note: this is done twice in PHP
    // early when processing special relatives
    // and late
    // todo: check if the logic can be reduced
    // to just one time action
    switch (this.firstOrLastDayOfMonth) {
      case 1:
        result.setDate(1);
        break;
      case -1:
        result.setMonth(result.getMonth() + 1, 0);
        break;
    }

    // adjust timezone
    if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
      result.setUTCFullYear(result.getFullYear(), result.getMonth(), result.getDate());

      result.setUTCHours(result.getHours(), result.getMinutes(), result.getSeconds() - this.z, result.getMilliseconds());
    }

    return result;
  }
};

module.exports = function strtotime(str, now) {
  //       discuss at: https://locutus.io/php/strtotime/
  //      original by: Caio Ariede (https://caioariede.com)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Caio Ariede (https://caioariede.com)
  //      improved by: A. Matías Quezada (https://amatiasq.com)
  //      improved by: preuter
  //      improved by: Brett Zamir (https://brett-zamir.me)
  //      improved by: Mirko Faber
  //         input by: David
  //      bugfixed by: Wagner B. Soares
  //      bugfixed by: Artur Tchernychev
  //      bugfixed by: Stephan Bösch-Plepelits (https://github.com/plepe)
  // reimplemented by: Rafał Kukawski
  //           note 1: Examples all have a fixed timestamp to prevent
  //           note 1: tests to fail because of variable time(zones)
  //        example 1: strtotime('+1 day', 1129633200)
  //        returns 1: 1129719600
  //        example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200)
  //        returns 2: 1130425202
  //        example 3: strtotime('last month', 1129633200)
  //        returns 3: 1127041200
  //        example 4: strtotime('2009-05-04 08:30:00+00')
  //        returns 4: 1241425800
  //        example 5: strtotime('2009-05-04 08:30:00+02:00')
  //        returns 5: 1241418600
  //        example 6: strtotime('2009-05-04 08:30:00 YWT')
  //        returns 6: 1241454600

  if (now == null) {
    now = Math.floor(Date.now() / 1000);
  }

  // the rule order is important
  // if multiple rules match, the longest match wins
  // if multiple rules match the same string, the first match wins
  var rules = [formats.yesterday, formats.now, formats.noon, formats.midnightOrToday, formats.tomorrow, formats.timestamp, formats.firstOrLastDay, formats.backOrFrontOf,
  // formats.weekdayOf, // not yet implemented
  formats.timeTiny12, formats.timeShort12, formats.timeLong12, formats.mssqltime, formats.timeShort24, formats.timeLong24, formats.iso8601long, formats.gnuNoColon, formats.iso8601noColon, formats.americanShort, formats.american, formats.iso8601date4, formats.iso8601dateSlash, formats.dateSlash, formats.gnuDateShortOrIso8601date2, formats.gnuDateShorter, formats.dateFull, formats.pointedDate4, formats.pointedDate2, formats.dateNoDay, formats.dateNoDayRev, formats.dateTextual, formats.dateNoYear, formats.dateNoYearRev, formats.dateNoColon, formats.xmlRpc, formats.xmlRpcNoColon, formats.soap, formats.wddx, formats.exif, formats.pgydotd, formats.isoWeekDay, formats.pgTextShort, formats.pgTextReverse, formats.clf, formats.year4, formats.ago, formats.dayText, formats.relativeTextWeek, formats.relativeText, formats.monthFullOrMonthAbbr, formats.tzCorrection, formats.tzAbbr, formats.dateShortWithTimeShort12, formats.dateShortWithTimeLong12, formats.dateShortWithTimeShort, formats.dateShortWithTimeLong, formats.relative, formats.whitespace];

  var result = Object.create(resultProto);

  while (str.length) {
    var longestMatch = null;
    var finalRule = null;

    for (var i = 0, l = rules.length; i < l; i++) {
      var format = rules[i];

      var match = str.match(format.regex);

      if (match) {
        if (!longestMatch || match[0].length > longestMatch[0].length) {
          longestMatch = match;
          finalRule = format;
        }
      }
    }

    if (!finalRule || finalRule.callback && finalRule.callback.apply(result, longestMatch) === false) {
      return false;
    }

    str = str.substr(longestMatch[0].length);
    finalRule = null;
    longestMatch = null;
  }

  return Math.floor(result.toDate(new Date(now * 1000)) / 1000);
};
//# sourceMappingURL=strtotime.js.map

/***/ }),

/***/ 673:
/***/ ((module) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function max() {
  //  discuss at: https://locutus.io/php/max/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Jack
  //      note 1: Long code cause we're aiming for maximum PHP compatibility
  //   example 1: max(1, 3, 5, 6, 7)
  //   returns 1: 7
  //   example 2: max([2, 4, 5])
  //   returns 2: 5
  //   example 3: max(0, 'hello')
  //   returns 3: 0
  //   example 4: max('hello', 0)
  //   returns 4: 'hello'
  //   example 5: max(-1, 'hello')
  //   returns 5: 'hello'
  //   example 6: max([2, 4, 8], [2, 5, 7])
  //   returns 6: [2, 5, 7]

  var ar = void 0;
  var retVal = void 0;
  var i = 0;
  var n = 0;
  var argv = arguments;
  var argc = argv.length;
  var _obj2Array = function _obj2Array(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      return obj;
    } else {
      var _ar = [];
      for (var _i in obj) {
        if (obj.hasOwnProperty(_i)) {
          _ar.push(obj[_i]);
        }
      }
      return _ar;
    }
  };
  var _compare = function _compare(current, next) {
    var i = 0;
    var n = 0;
    var tmp = 0;
    var nl = 0;
    var cl = 0;

    if (current === next) {
      return 0;
    } else if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) === 'object') {
      if ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) === 'object') {
        current = _obj2Array(current);
        next = _obj2Array(next);
        cl = current.length;
        nl = next.length;
        if (nl > cl) {
          return 1;
        } else if (nl < cl) {
          return -1;
        }
        for (i = 0, n = cl; i < n; ++i) {
          tmp = _compare(current[i], next[i]);
          if (tmp === 1) {
            return 1;
          } else if (tmp === -1) {
            return -1;
          }
        }
        return 0;
      }
      return -1;
    } else if ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) === 'object') {
      return 1;
    } else if (isNaN(next) && !isNaN(current)) {
      if (current === 0) {
        return 0;
      }
      return current < 0 ? 1 : -1;
    } else if (isNaN(current) && !isNaN(next)) {
      if (next === 0) {
        return 0;
      }
      return next > 0 ? 1 : -1;
    }

    if (next === current) {
      return 0;
    }

    return next > current ? 1 : -1;
  };

  if (argc === 0) {
    throw new Error('At least one value should be passed to max()');
  } else if (argc === 1) {
    if (_typeof(argv[0]) === 'object') {
      ar = _obj2Array(argv[0]);
    } else {
      throw new Error('Wrong parameter count for max()');
    }
    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for max()');
    }
  } else {
    ar = argv;
  }

  retVal = ar[0];
  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) === 1) {
      retVal = ar[i];
    }
  }

  return retVal;
};
//# sourceMappingURL=max.js.map

/***/ }),

/***/ 4:
/***/ ((module) => {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function min() {
  //  discuss at: https://locutus.io/php/min/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Jack
  //      note 1: Long code cause we're aiming for maximum PHP compatibility
  //   example 1: min(1, 3, 5, 6, 7)
  //   returns 1: 1
  //   example 2: min([2, 4, 5])
  //   returns 2: 2
  //   example 3: min(0, 'hello')
  //   returns 3: 0
  //   example 4: min('hello', 0)
  //   returns 4: 'hello'
  //   example 5: min(-1, 'hello')
  //   returns 5: -1
  //   example 6: min([2, 4, 8], [2, 5, 7])
  //   returns 6: [2, 4, 8]

  var ar = void 0;
  var retVal = void 0;
  var i = 0;
  var n = 0;
  var argv = arguments;
  var argc = argv.length;
  var _obj2Array = function _obj2Array(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      return obj;
    }
    var ar = [];
    for (var _i in obj) {
      if (obj.hasOwnProperty(_i)) {
        ar.push(obj[_i]);
      }
    }
    return ar;
  };

  var _compare = function _compare(current, next) {
    var i = 0;
    var n = 0;
    var tmp = 0;
    var nl = 0;
    var cl = 0;

    if (current === next) {
      return 0;
    } else if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) === 'object') {
      if ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) === 'object') {
        current = _obj2Array(current);
        next = _obj2Array(next);
        cl = current.length;
        nl = next.length;
        if (nl > cl) {
          return 1;
        } else if (nl < cl) {
          return -1;
        }
        for (i = 0, n = cl; i < n; ++i) {
          tmp = _compare(current[i], next[i]);
          if (tmp === 1) {
            return 1;
          } else if (tmp === -1) {
            return -1;
          }
        }
        return 0;
      }
      return -1;
    } else if ((typeof next === 'undefined' ? 'undefined' : _typeof(next)) === 'object') {
      return 1;
    } else if (isNaN(next) && !isNaN(current)) {
      if (current === 0) {
        return 0;
      }
      return current < 0 ? 1 : -1;
    } else if (isNaN(current) && !isNaN(next)) {
      if (next === 0) {
        return 0;
      }
      return next > 0 ? 1 : -1;
    }

    if (next === current) {
      return 0;
    }

    return next > current ? 1 : -1;
  };

  if (argc === 0) {
    throw new Error('At least one value should be passed to min()');
  } else if (argc === 1) {
    if (_typeof(argv[0]) === 'object') {
      ar = _obj2Array(argv[0]);
    } else {
      throw new Error('Wrong parameter count for min()');
    }

    if (ar.length === 0) {
      throw new Error('Array must contain at least one element for min()');
    }
  } else {
    ar = argv;
  }

  retVal = ar[0];

  for (i = 1, n = ar.length; i < n; ++i) {
    if (_compare(retVal, ar[i]) === -1) {
      retVal = ar[i];
    }
  }

  return retVal;
};
//# sourceMappingURL=min.js.map

/***/ }),

/***/ 718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function roundToInt(value, mode) {
  var tmp = Math.floor(Math.abs(value) + 0.5);

  if (mode === 'PHP_ROUND_HALF_DOWN' && value === tmp - 0.5 || mode === 'PHP_ROUND_HALF_EVEN' && value === 0.5 + 2 * Math.floor(tmp / 2) || mode === 'PHP_ROUND_HALF_ODD' && value === 0.5 + 2 * Math.floor(tmp / 2) - 1) {
    tmp -= 1;
  }

  return value < 0 ? -tmp : tmp;
}

module.exports = function round(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'PHP_ROUND_HALF_UP';

  //  discuss at: https://locutus.io/php/round/
  // original by: Philip Peterson
  //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: T.Wild
  //  revised by: Rafał Kukawski (https://blog.kukawski.pl)
  //    input by: Greenseed
  //    input by: meo
  //    input by: William
  //    input by: Josep Sanz (https://www.ws3.es/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Rafał Kukawski
  //   example 1: round(1241757, -3)
  //   returns 1: 1242000
  //   example 2: round(3.6)
  //   returns 2: 4
  //   example 3: round(2.835, 2)
  //   returns 3: 2.84
  //   example 4: round(1.1749999999999, 2)
  //   returns 4: 1.17
  //   example 5: round(58551.799999999996, 2)
  //   returns 5: 58551.8
  //   example 6: round(4096.485, 2)
  //   returns 6: 4096.49

  var floatCast = __webpack_require__(892);
  var intCast = __webpack_require__(791);
  var p = void 0;

  // the code is heavily based on the native PHP implementation
  // https://github.com/php/php-src/blob/PHP-7.4/ext/standard/math.c#L355

  value = floatCast(value);
  precision = intCast(precision);
  p = Math.pow(10, precision);

  if (isNaN(value) || !isFinite(value)) {
    return value;
  }

  // if value already integer and positive precision
  // then nothing to do, return early
  if (Math.trunc(value) === value && precision >= 0) {
    return value;
  }

  // PHP does a pre-rounding before rounding to desired precision
  // https://wiki.php.net/rfc/rounding#pre-rounding_to_the_value_s_precision_if_possible
  var preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)));

  if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
    value = roundToInt(value * Math.pow(10, preRoundPrecision), mode);
    value /= Math.pow(10, Math.abs(precision - preRoundPrecision));
  } else {
    value *= p;
  }

  value = roundToInt(value, mode);

  return value / p;
};
//# sourceMappingURL=round.js.map

/***/ }),

/***/ 296:
/***/ ((module) => {

"use strict";


module.exports = function sprintf() {
  //  discuss at: https://locutus.io/php/sprintf/
  // original by: Ash Searle (https://hexmen.com/blog/)
  // improved by: Michael White (https://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Dj
  // improved by: Allidylls
  //    input by: Paulo Freitas
  //    input by: Brett Zamir (https://brett-zamir.me)
  // improved by: Rafał Kukawski (https://kukawski.pl)
  //   example 1: sprintf("%01.2f", 123.1)
  //   returns 1: '123.10'
  //   example 2: sprintf("[%10s]", 'monkey')
  //   returns 2: '[    monkey]'
  //   example 3: sprintf("[%'#10s]", 'monkey')
  //   returns 3: '[####monkey]'
  //   example 4: sprintf("%d", 123456789012345)
  //   returns 4: '123456789012345'
  //   example 5: sprintf('%-03s', 'E')
  //   returns 5: 'E00'
  //   example 6: sprintf('%+010d', 9)
  //   returns 6: '+000000009'
  //   example 7: sprintf('%+0\'@10d', 9)
  //   returns 7: '@@@@@@@@+9'
  //   example 8: sprintf('%.f', 3.14)
  //   returns 8: '3.140000'
  //   example 9: sprintf('%% %2$d', 1, 2)
  //   returns 9: '% 2'

  var regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g;
  var args = arguments;
  var i = 0;
  var format = args[i++];

  var _pad = function _pad(str, len, chr, leftJustify) {
    if (!chr) {
      chr = ' ';
    }
    var padding = str.length >= len ? '' : new Array(1 + len - str.length >>> 0).join(chr);
    return leftJustify ? str + padding : padding + str;
  };

  var justify = function justify(value, prefix, leftJustify, minWidth, padChar) {
    var diff = minWidth - value.length;
    if (diff > 0) {
      // when padding with zeros
      // on the left side
      // keep sign (+ or -) in front
      if (!leftJustify && padChar === '0') {
        value = [value.slice(0, prefix.length), _pad('', diff, '0', true), value.slice(prefix.length)].join('');
      } else {
        value = _pad(value, minWidth, padChar, leftJustify);
      }
    }
    return value;
  };

  var _formatBaseX = function _formatBaseX(value, base, leftJustify, minWidth, precision, padChar) {
    // Note: casts negative numbers to positive ones
    var number = value >>> 0;
    value = _pad(number.toString(base), precision || 0, '0', false);
    return justify(value, '', leftJustify, minWidth, padChar);
  };

  // _formatString()
  var _formatString = function _formatString(value, leftJustify, minWidth, precision, customPadChar) {
    if (precision !== null && precision !== undefined) {
      value = value.slice(0, precision);
    }
    return justify(value, '', leftJustify, minWidth, customPadChar);
  };

  // doFormat()
  var doFormat = function doFormat(substring, argIndex, modifiers, minWidth, precision, specifier) {
    var number = void 0,
        prefix = void 0,
        method = void 0,
        textTransform = void 0,
        value = void 0;

    if (substring === '%%') {
      return '%';
    }

    // parse modifiers
    var padChar = ' '; // pad with spaces by default
    var leftJustify = false;
    var positiveNumberPrefix = '';
    var j = void 0,
        l = void 0;

    for (j = 0, l = modifiers.length; j < l; j++) {
      switch (modifiers.charAt(j)) {
        case ' ':
        case '0':
          padChar = modifiers.charAt(j);
          break;
        case '+':
          positiveNumberPrefix = '+';
          break;
        case '-':
          leftJustify = true;
          break;
        case "'":
          if (j + 1 < l) {
            padChar = modifiers.charAt(j + 1);
            j++;
          }
          break;
      }
    }

    if (!minWidth) {
      minWidth = 0;
    } else {
      minWidth = +minWidth;
    }

    if (!isFinite(minWidth)) {
      throw new Error('Width must be finite');
    }

    if (!precision) {
      precision = specifier === 'd' ? 0 : 'fFeE'.indexOf(specifier) > -1 ? 6 : undefined;
    } else {
      precision = +precision;
    }

    if (argIndex && +argIndex === 0) {
      throw new Error('Argument number must be greater than zero');
    }

    if (argIndex && +argIndex >= args.length) {
      throw new Error('Too few arguments');
    }

    value = argIndex ? args[+argIndex] : args[i++];

    switch (specifier) {
      case '%':
        return '%';
      case 's':
        return _formatString(value + '', leftJustify, minWidth, precision, padChar);
      case 'c':
        return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, padChar);
      case 'b':
        return _formatBaseX(value, 2, leftJustify, minWidth, precision, padChar);
      case 'o':
        return _formatBaseX(value, 8, leftJustify, minWidth, precision, padChar);
      case 'x':
        return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar);
      case 'X':
        return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar).toUpperCase();
      case 'u':
        return _formatBaseX(value, 10, leftJustify, minWidth, precision, padChar);
      case 'i':
      case 'd':
        number = +value || 0;
        // Plain Math.round doesn't just truncate
        number = Math.round(number - number % 1);
        prefix = number < 0 ? '-' : positiveNumberPrefix;
        value = prefix + _pad(String(Math.abs(number)), precision, '0', false);

        if (leftJustify && padChar === '0') {
          // can't right-pad 0s on integers
          padChar = ' ';
        }
        return justify(value, prefix, leftJustify, minWidth, padChar);
      case 'e':
      case 'E':
      case 'f': // @todo: Should handle locales (as per setlocale)
      case 'F':
      case 'g':
      case 'G':
        number = +value;
        prefix = number < 0 ? '-' : positiveNumberPrefix;
        method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(specifier.toLowerCase())];
        textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(specifier) % 2];
        value = prefix + Math.abs(number)[method](precision);
        return justify(value, prefix, leftJustify, minWidth, padChar)[textTransform]();
      default:
        // unknown specifier, consume that char and return empty
        return '';
    }
  };

  try {
    return format.replace(regex, doFormat);
  } catch (err) {
    return false;
  }
};
//# sourceMappingURL=sprintf.js.map

/***/ }),

/***/ 359:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function strip_tags(input, allowed) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/strip_tags/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Luke Godfrey
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Pul
  //    input by: Alex
  //    input by: Marc Palau
  //    input by: Brett Zamir (https://brett-zamir.me)
  //    input by: Bobby Drake
  //    input by: Evertjan Garretsen
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Eric Nagel
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Tomasz Wesolowski
  // bugfixed by: Tymon Sturgeon (https://scryptonite.com)
  // bugfixed by: Tim de Koning (https://www.kingsquare.nl)
  //  revised by: Rafał Kukawski (https://blog.kukawski.pl)
  //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>')
  //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
  //   example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>')
  //   returns 2: '<p>Kevin van Zonneveld</p>'
  //   example 3: strip_tags("<a href='https://kvz.io'>Kevin van Zonneveld</a>", "<a>")
  //   returns 3: "<a href='https://kvz.io'>Kevin van Zonneveld</a>"
  //   example 4: strip_tags('1 < 5 5 > 1')
  //   returns 4: '1 < 5 5 > 1'
  //   example 5: strip_tags('1 <br/> 1')
  //   returns 5: '1  1'
  //   example 6: strip_tags('1 <br/> 1', '<br>')
  //   returns 6: '1 <br/> 1'
  //   example 7: strip_tags('1 <br/> 1', '<br><br/>')
  //   returns 7: '1 <br/> 1'
  //   example 8: strip_tags('<i>hello</i> <<foo>script>world<</foo>/script>')
  //   returns 8: 'hello world'
  //   example 9: strip_tags(4)
  //   returns 9: '4'

  var _phpCastString = __webpack_require__(521);

  // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

  var tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
  var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

  var after = _phpCastString(input);
  // removes tha '<' char at the end of the string to replicate PHP's behaviour
  after = after.substring(after.length - 1) === '<' ? after.substring(0, after.length - 1) : after;

  // recursively remove tags to ensure that the returned string doesn't contain forbidden tags after previous passes (e.g. '<<bait/>switch/>')
  while (true) {
    var before = after;
    after = before.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });

    // return once no more tags are removed
    if (before === after) {
      return after;
    }
  }
};
//# sourceMappingURL=strip_tags.js.map

/***/ }),

/***/ 436:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = function vsprintf(format, args) {
  //  discuss at: https://locutus.io/php/vsprintf/
  // original by: ejsanders
  //   example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
  //   returns 1: '1988-08-01'

  var sprintf = __webpack_require__(296);

  return sprintf.apply(this, [format].concat(args));
};
//# sourceMappingURL=vsprintf.js.map

/***/ }),

/***/ 315:
/***/ ((module) => {

"use strict";


module.exports = function boolval(mixedVar) {
  // original by: Will Rowe
  //   example 1: boolval(true)
  //   returns 1: true
  //   example 2: boolval(false)
  //   returns 2: false
  //   example 3: boolval(0)
  //   returns 3: false
  //   example 4: boolval(0.0)
  //   returns 4: false
  //   example 5: boolval('')
  //   returns 5: false
  //   example 6: boolval('0')
  //   returns 6: false
  //   example 7: boolval([])
  //   returns 7: false
  //   example 8: boolval('')
  //   returns 8: false
  //   example 9: boolval(null)
  //   returns 9: false
  //   example 10: boolval(undefined)
  //   returns 10: false
  //   example 11: boolval('true')
  //   returns 11: true

  if (mixedVar === false) {
    return false;
  }

  if (mixedVar === 0 || mixedVar === 0.0) {
    return false;
  }

  if (mixedVar === '' || mixedVar === '0') {
    return false;
  }

  if (Array.isArray(mixedVar) && mixedVar.length === 0) {
    return false;
  }

  if (mixedVar === null || mixedVar === undefined) {
    return false;
  }

  return true;
};
//# sourceMappingURL=boolval.js.map

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(209);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});