(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sqlFormatter"] = factory();
	else
		root["sqlFormatter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sqlFormatter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Formatter.js":
/*!*******************************!*\
  !*** ./src/core/Formatter.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Formatter; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
/* harmony import */ var _Indentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Indentation */ "./src/core/Indentation.js");
/* harmony import */ var _InlineBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InlineBlock */ "./src/core/InlineBlock.js");
/* harmony import */ var _Params__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Params */ "./src/core/Params.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token */ "./src/core/token.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var Formatter = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *  @param {String} cfg.language
   *  @param {String} cfg.indent
   *  @param {Boolean} cfg.uppercase
   *  @param {Integer} cfg.linesBetweenQueries
   *  @param {Object} cfg.params
   */
  function Formatter(cfg) {
    _classCallCheck(this, Formatter);

    this.cfg = cfg;
    this.indentation = new _Indentation__WEBPACK_IMPORTED_MODULE_1__["default"](this.cfg.indent);
    this.inlineBlock = new _InlineBlock__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.params = new _Params__WEBPACK_IMPORTED_MODULE_3__["default"](this.cfg.params);
    this.previousReservedToken = {};
    this.tokens = [];
    this.index = 0;
  }
  /**
   * SQL Tokenizer for this formatter, provided by subclasses.
   */


  _createClass(Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      throw new Error('tokenizer() not implemented by subclass');
    }
    /**
     * Reprocess and modify a token based on parsed context.
     *
     * @param {Object} token The token to modify
     *  @param {String} token.type
     *  @param {String} token.value
     * @return {Object} new token or the original
     *  @return {String} token.type
     *  @return {String} token.value
     */

  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // subclasses can override this to modify tokens during formatting
      return token;
    }
    /**
     * Formats whitespace in a SQL string to make it easier to read.
     *
     * @param {String} query The SQL query string
     * @return {String} formatted query
     */

  }, {
    key: "format",
    value: function format(query) {
      this.tokens = this.tokenizer().tokenize(query);
      var formattedQuery = this.getFormattedQueryFromTokens();
      return formattedQuery.trim();
    }
  }, {
    key: "getFormattedQueryFromTokens",
    value: function getFormattedQueryFromTokens() {
      var _this = this;

      var formattedQuery = '';
      this.tokens.forEach(function (token, index) {
        _this.index = index;
        token = _this.tokenOverride(token);

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT) {
          formattedQuery = _this.formatLineComment(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT) {
          formattedQuery = _this.formatBlockComment(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL) {
          formattedQuery = _this.formatTopLevelReservedWord(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT) {
          formattedQuery = _this.formatTopLevelReservedWordNoIndent(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE) {
          formattedQuery = _this.formatNewlineReservedWord(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED) {
          formattedQuery = _this.formatWithSpaces(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN) {
          formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN) {
          formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].PLACEHOLDER) {
          formattedQuery = _this.formatPlaceholder(token, formattedQuery);
        } else if (token.value === ',') {
          formattedQuery = _this.formatComma(token, formattedQuery);
        } else if (token.value === ':') {
          formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
        } else if (token.value === '.') {
          formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
        } else if (token.value === ';') {
          formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
        } else {
          formattedQuery = _this.formatWithSpaces(token, formattedQuery);
        }
      });
      return formattedQuery;
    }
  }, {
    key: "formatLineComment",
    value: function formatLineComment(token, query) {
      return this.addNewline(query + this.show(token));
    }
  }, {
    key: "formatBlockComment",
    value: function formatBlockComment(token, query) {
      return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
    }
  }, {
    key: "indentComment",
    value: function indentComment(comment) {
      return comment.replace(/\n[\t ]*/g, '\n' + this.indentation.getIndent() + ' ');
    }
  }, {
    key: "formatTopLevelReservedWordNoIndent",
    value: function formatTopLevelReservedWordNoIndent(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query) + this.equalizeWhitespace(this.show(token));
      return this.addNewline(query);
    }
  }, {
    key: "formatTopLevelReservedWord",
    value: function formatTopLevelReservedWord(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query);
      this.indentation.increaseTopLevel();
      query += this.equalizeWhitespace(this.show(token));
      return this.addNewline(query);
    }
  }, {
    key: "formatNewlineReservedWord",
    value: function formatNewlineReservedWord(token, query) {
      if (Object(_token__WEBPACK_IMPORTED_MODULE_5__["isAnd"])(token) && Object(_token__WEBPACK_IMPORTED_MODULE_5__["isBetween"])(this.tokenLookBehind(2))) {
        return this.formatWithSpaces(token, query);
      }

      return this.addNewline(query) + this.equalizeWhitespace(this.show(token)) + ' ';
    } // Replace any sequence of whitespace characters with single space

  }, {
    key: "equalizeWhitespace",
    value: function equalizeWhitespace(string) {
      return string.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, ' ');
    } // Opening parentheses increase the block indent level and start a new line

  }, {
    key: "formatOpeningParentheses",
    value: function formatOpeningParentheses(token, query) {
      var _preserveWhitespaceFo, _this$tokenLookBehind;

      // Take out the preceding space unless there was whitespace there in the original query
      // or another opening parens or line comment
      var preserveWhitespaceFor = (_preserveWhitespaceFo = {}, _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR, true), _preserveWhitespaceFo);

      if (token.whitespaceBefore.length === 0 && !preserveWhitespaceFor[(_this$tokenLookBehind = this.tokenLookBehind()) === null || _this$tokenLookBehind === void 0 ? void 0 : _this$tokenLookBehind.type]) {
        query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query);
      }

      query += this.show(token);
      this.inlineBlock.beginIfPossible(this.tokens, this.index);

      if (!this.inlineBlock.isActive()) {
        this.indentation.increaseBlockLevel();
        query = this.addNewline(query);
      }

      return query;
    } // Closing parentheses decrease the block indent level

  }, {
    key: "formatClosingParentheses",
    value: function formatClosingParentheses(token, query) {
      if (this.inlineBlock.isActive()) {
        this.inlineBlock.end();
        return this.formatWithSpaceAfter(token, query);
      } else {
        this.indentation.decreaseBlockLevel();
        return this.formatWithSpaces(token, this.addNewline(query));
      }
    }
  }, {
    key: "formatPlaceholder",
    value: function formatPlaceholder(token, query) {
      return query + this.params.get(token) + ' ';
    } // Commas start a new line (unless within inline parentheses or SQL "LIMIT" clause)

  }, {
    key: "formatComma",
    value: function formatComma(token, query) {
      query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token) + ' ';

      if (this.inlineBlock.isActive()) {
        return query;
      } else if (Object(_token__WEBPACK_IMPORTED_MODULE_5__["isLimit"])(this.previousReservedToken)) {
        return query;
      } else {
        return this.addNewline(query);
      }
    }
  }, {
    key: "formatWithSpaceAfter",
    value: function formatWithSpaceAfter(token, query) {
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token) + ' ';
    }
  }, {
    key: "formatWithoutSpaces",
    value: function formatWithoutSpaces(token, query) {
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token);
    }
  }, {
    key: "formatWithSpaces",
    value: function formatWithSpaces(token, query) {
      return query + this.show(token) + ' ';
    }
  }, {
    key: "formatQuerySeparator",
    value: function formatQuerySeparator(token, query) {
      this.indentation.resetIndentation();
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query) + this.show(token) + '\n'.repeat(this.cfg.linesBetweenQueries || 1);
    } // Converts token to string (uppercasing it if needed)

  }, {
    key: "show",
    value: function show(_ref) {
      var type = _ref.type,
          value = _ref.value;

      if (this.cfg.uppercase && (type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN)) {
        return value.toUpperCase();
      } else {
        return value;
      }
    }
  }, {
    key: "addNewline",
    value: function addNewline(query) {
      query = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["trimSpacesEnd"])(query);

      if (!query.endsWith('\n')) {
        query += '\n';
      }

      return query + this.indentation.getIndent();
    }
  }, {
    key: "tokenLookBehind",
    value: function tokenLookBehind() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index - n];
    }
  }, {
    key: "tokenLookAhead",
    value: function tokenLookAhead() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index + n];
    }
  }]);

  return Formatter;
}();



/***/ }),

/***/ "./src/core/Indentation.js":
/*!*********************************!*\
  !*** ./src/core/Indentation.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Indentation; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var INDENT_TYPE_TOP_LEVEL = 'top-level';
var INDENT_TYPE_BLOCK_LEVEL = 'block-level';
/**
 * Manages indentation levels.
 *
 * There are two types of indentation levels:
 *
 * - BLOCK_LEVEL : increased by open-parenthesis
 * - TOP_LEVEL : increased by RESERVED_TOP_LEVEL words
 */

var Indentation = /*#__PURE__*/function () {
  /**
   * @param {String} indent Indent value, default is "  " (2 spaces)
   */
  function Indentation(indent) {
    _classCallCheck(this, Indentation);

    this.indent = indent || '  ';
    this.indentTypes = [];
  }
  /**
   * Returns current indentation string.
   * @return {String}
   */


  _createClass(Indentation, [{
    key: "getIndent",
    value: function getIndent() {
      return this.indent.repeat(this.indentTypes.length);
    }
    /**
     * Increases indentation by one top-level indent.
     */

  }, {
    key: "increaseTopLevel",
    value: function increaseTopLevel() {
      this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    }
    /**
     * Increases indentation by one block-level indent.
     */

  }, {
    key: "increaseBlockLevel",
    value: function increaseBlockLevel() {
      this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    }
    /**
     * Decreases indentation by one top-level indent.
     * Does nothing when the previous indent is not top-level.
     */

  }, {
    key: "decreaseTopLevel",
    value: function decreaseTopLevel() {
      if (this.indentTypes.length > 0 && Object(_utils__WEBPACK_IMPORTED_MODULE_0__["last"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
        this.indentTypes.pop();
      }
    }
    /**
     * Decreases indentation by one block-level indent.
     * If there are top-level indents within the block-level indent,
     * throws away these as well.
     */

  }, {
    key: "decreaseBlockLevel",
    value: function decreaseBlockLevel() {
      while (this.indentTypes.length > 0) {
        var type = this.indentTypes.pop();

        if (type !== INDENT_TYPE_TOP_LEVEL) {
          break;
        }
      }
    }
  }, {
    key: "resetIndentation",
    value: function resetIndentation() {
      this.indentTypes = [];
    }
  }]);

  return Indentation;
}();



/***/ }),

/***/ "./src/core/InlineBlock.js":
/*!*********************************!*\
  !*** ./src/core/InlineBlock.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InlineBlock; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var INLINE_MAX_LENGTH = 50;
/**
 * Bookkeeper for inline blocks.
 *
 * Inline blocks are parenthized expressions that are shorter than INLINE_MAX_LENGTH.
 * These blocks are formatted on a single line, unlike longer parenthized
 * expressions where open-parenthesis causes newline and increase of indentation.
 */

var InlineBlock = /*#__PURE__*/function () {
  function InlineBlock() {
    _classCallCheck(this, InlineBlock);

    this.level = 0;
  }
  /**
   * Begins inline block when lookahead through upcoming tokens determines
   * that the block would be smaller than INLINE_MAX_LENGTH.
   * @param  {Object[]} tokens Array of all tokens
   * @param  {Number} index Current token position
   */


  _createClass(InlineBlock, [{
    key: "beginIfPossible",
    value: function beginIfPossible(tokens, index) {
      if (this.level === 0 && this.isInlineBlock(tokens, index)) {
        this.level = 1;
      } else if (this.level > 0) {
        this.level++;
      } else {
        this.level = 0;
      }
    }
    /**
     * Finishes current inline block.
     * There might be several nested ones.
     */

  }, {
    key: "end",
    value: function end() {
      this.level--;
    }
    /**
     * True when inside an inline block
     * @return {Boolean}
     */

  }, {
    key: "isActive",
    value: function isActive() {
      return this.level > 0;
    } // Check if this should be an inline parentheses block
    // Examples are "NOW()", "COUNT(*)", "int(10)", key(`somecolumn`), DECIMAL(7,2)

  }, {
    key: "isInlineBlock",
    value: function isInlineBlock(tokens, index) {
      var length = 0;
      var level = 0;

      for (var i = index; i < tokens.length; i++) {
        var token = tokens[i];
        length += token.value.length; // Overran max length

        if (length > INLINE_MAX_LENGTH) {
          return false;
        }

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN) {
          level++;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN) {
          level--;

          if (level === 0) {
            return true;
          }
        }

        if (this.isForbiddenToken(token)) {
          return false;
        }
      }

      return false;
    } // Reserved words that cause newlines, comments and semicolons
    // are not allowed inside inline parentheses block

  }, {
    key: "isForbiddenToken",
    value: function isForbiddenToken(_ref) {
      var type = _ref.type,
          value = _ref.value;
      return type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].COMMENT || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT || value === ';';
    }
  }]);

  return InlineBlock;
}();



/***/ }),

/***/ "./src/core/Params.js":
/*!****************************!*\
  !*** ./src/core/Params.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Params; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Handles placeholder replacement with given params.
 */
var Params = /*#__PURE__*/function () {
  /**
   * @param {Object} params
   */
  function Params(params) {
    _classCallCheck(this, Params);

    this.params = params;
    this.index = 0;
  }
  /**
   * Returns param value that matches given placeholder with param key.
   * @param {Object} token
   *   @param {String} token.key Placeholder key
   *   @param {String} token.value Placeholder value
   * @return {String} param or token.value when params are missing
   */


  _createClass(Params, [{
    key: "get",
    value: function get(_ref) {
      var key = _ref.key,
          value = _ref.value;

      if (!this.params) {
        return value;
      }

      if (key) {
        return this.params[key];
      }

      return this.params[this.index++];
    }
  }]);

  return Params;
}();



/***/ }),

/***/ "./src/core/Tokenizer.js":
/*!*******************************!*\
  !*** ./src/core/Tokenizer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tokenizer; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
/* harmony import */ var _regexFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regexFactory */ "./src/core/regexFactory.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Tokenizer = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *  @param {String[]} cfg.reservedWords Reserved words in SQL
   *  @param {String[]} cfg.reservedTopLevelWords Words that are set to new line separately
   *  @param {String[]} cfg.reservedNewlineWords Words that are set to newline
   *  @param {String[]} cfg.reservedTopLevelWordsNoIndent Words that are top level but have no indentation
   *  @param {String[]} cfg.stringTypes String types to enable: "", '', ``, [], N''
   *  @param {String[]} cfg.openParens Opening parentheses to enable, like (, [
   *  @param {String[]} cfg.closeParens Closing parentheses to enable, like ), ]
   *  @param {String[]} cfg.indexedPlaceholderTypes Prefixes for indexed placeholders, like ?
   *  @param {String[]} cfg.namedPlaceholderTypes Prefixes for named placeholders, like @ and :
   *  @param {String[]} cfg.lineCommentTypes Line comments to enable, like # and --
   *  @param {String[]} cfg.specialWordChars Special chars that can be found inside of words, like @ and #
   *  @param {String[]} [cfg.operator] Additional operators to recognize
   */
  function Tokenizer(cfg) {
    _classCallCheck(this, Tokenizer);

    this.WHITESPACE_REGEX = /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/;
    this.NUMBER_REGEX = /^((\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]+)?([Ee]\x2D?[0-9]+(\.[0-9]+)?)?|0x[0-9A-Fa-f]+|0b[01]+)\b/;
    this.OPERATOR_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createOperatorRegex"]([].concat(_toConsumableArray(cfg.operators || []), ['!=', '<>', '==', '<=', '>=', '!<', '!>', '||', ':=']));
    this.BLOCK_COMMENT_REGEX = /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/;
    this.LINE_COMMENT_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createLineCommentRegex"](cfg.lineCommentTypes);
    this.RESERVED_TOP_LEVEL_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedTopLevelWords);
    this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedTopLevelWordsNoIndent);
    this.RESERVED_NEWLINE_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedNewlineWords);
    this.RESERVED_PLAIN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createReservedWordRegex"](cfg.reservedWords);
    this.WORD_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createWordRegex"](cfg.specialWordChars);
    this.STRING_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createStringRegex"](cfg.stringTypes);
    this.OPEN_PAREN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createParenRegex"](cfg.openParens);
    this.CLOSE_PAREN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createParenRegex"](cfg.closeParens);
    this.INDEXED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createPlaceholderRegex"](cfg.indexedPlaceholderTypes, '[0-9]*');
    this.IDENT_NAMED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createPlaceholderRegex"](cfg.namedPlaceholderTypes, '[a-zA-Z0-9._$]+');
    this.STRING_NAMED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createPlaceholderRegex"](cfg.namedPlaceholderTypes, _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createStringPattern"](cfg.stringTypes));
  }
  /**
   * Takes a SQL string and breaks it into tokens.
   * Each token is an object with type and value.
   *
   * @param {String} input The SQL string
   * @return {Object[]} tokens An array of tokens.
   *  @return {String} token.type
   *  @return {String} token.value
   *  @return {String} token.whitespaceBefore Preceding whitespace
   */


  _createClass(Tokenizer, [{
    key: "tokenize",
    value: function tokenize(input) {
      var tokens = [];
      var token; // Keep processing the string until it is empty

      while (input.length) {
        // grab any preceding whitespace
        var whitespaceBefore = this.getWhitespace(input);
        input = input.substring(whitespaceBefore.length);

        if (input.length) {
          // Get the next token and the token type
          token = this.getNextToken(input, token); // Advance the string

          input = input.substring(token.value.length);
          tokens.push(_objectSpread(_objectSpread({}, token), {}, {
            whitespaceBefore: whitespaceBefore
          }));
        }
      }

      return tokens;
    }
  }, {
    key: "getWhitespace",
    value: function getWhitespace(input) {
      var matches = input.match(this.WHITESPACE_REGEX);
      return matches ? matches[1] : '';
    }
  }, {
    key: "getNextToken",
    value: function getNextToken(input, previousToken) {
      return this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
    }
  }, {
    key: "getCommentToken",
    value: function getCommentToken(input) {
      return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
    }
  }, {
    key: "getLineCommentToken",
    value: function getLineCommentToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT,
        regex: this.LINE_COMMENT_REGEX
      });
    }
  }, {
    key: "getBlockCommentToken",
    value: function getBlockCommentToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT,
        regex: this.BLOCK_COMMENT_REGEX
      });
    }
  }, {
    key: "getStringToken",
    value: function getStringToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].STRING,
        regex: this.STRING_REGEX
      });
    }
  }, {
    key: "getOpenParenToken",
    value: function getOpenParenToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN,
        regex: this.OPEN_PAREN_REGEX
      });
    }
  }, {
    key: "getCloseParenToken",
    value: function getCloseParenToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN,
        regex: this.CLOSE_PAREN_REGEX
      });
    }
  }, {
    key: "getPlaceholderToken",
    value: function getPlaceholderToken(input) {
      return this.getIdentNamedPlaceholderToken(input) || this.getStringNamedPlaceholderToken(input) || this.getIndexedPlaceholderToken(input);
    }
  }, {
    key: "getIdentNamedPlaceholderToken",
    value: function getIdentNamedPlaceholderToken(input) {
      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return v.slice(1);
        }
      });
    }
  }, {
    key: "getStringNamedPlaceholderToken",
    value: function getStringNamedPlaceholderToken(input) {
      var _this = this;

      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return _this.getEscapedPlaceholderKey({
            key: v.slice(2, -1),
            quoteChar: v.slice(-1)
          });
        }
      });
    }
  }, {
    key: "getIndexedPlaceholderToken",
    value: function getIndexedPlaceholderToken(input) {
      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.INDEXED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return v.slice(1);
        }
      });
    }
  }, {
    key: "getPlaceholderTokenWithKey",
    value: function getPlaceholderTokenWithKey(_ref) {
      var input = _ref.input,
          regex = _ref.regex,
          parseKey = _ref.parseKey;
      var token = this.getTokenOnFirstMatch({
        input: input,
        regex: regex,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].PLACEHOLDER
      });

      if (token) {
        token.key = parseKey(token.value);
      }

      return token;
    }
  }, {
    key: "getEscapedPlaceholderKey",
    value: function getEscapedPlaceholderKey(_ref2) {
      var key = _ref2.key,
          quoteChar = _ref2.quoteChar;
      return key.replace(new RegExp(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["escapeRegExp"])('\\' + quoteChar), 'gu'), quoteChar);
    } // Decimal, binary, or hex numbers

  }, {
    key: "getNumberToken",
    value: function getNumberToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].NUMBER,
        regex: this.NUMBER_REGEX
      });
    } // Punctuation and symbols

  }, {
    key: "getOperatorToken",
    value: function getOperatorToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR,
        regex: this.OPERATOR_REGEX
      });
    }
  }, {
    key: "getReservedWordToken",
    value: function getReservedWordToken(input, previousToken) {
      // A reserved word cannot be preceded by a "."
      // this makes it so in "mytable.from", "from" is not considered a reserved word
      if (previousToken && previousToken.value && previousToken.value === '.') {
        return undefined;
      }

      return this.getTopLevelReservedToken(input) || this.getNewlineReservedToken(input) || this.getTopLevelReservedTokenNoIndent(input) || this.getPlainReservedToken(input);
    }
  }, {
    key: "getTopLevelReservedToken",
    value: function getTopLevelReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL,
        regex: this.RESERVED_TOP_LEVEL_REGEX
      });
    }
  }, {
    key: "getNewlineReservedToken",
    value: function getNewlineReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE,
        regex: this.RESERVED_NEWLINE_REGEX
      });
    }
  }, {
    key: "getTopLevelReservedTokenNoIndent",
    value: function getTopLevelReservedTokenNoIndent(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT,
        regex: this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX
      });
    }
  }, {
    key: "getPlainReservedToken",
    value: function getPlainReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED,
        regex: this.RESERVED_PLAIN_REGEX
      });
    }
  }, {
    key: "getWordToken",
    value: function getWordToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].WORD,
        regex: this.WORD_REGEX
      });
    }
  }, {
    key: "getTokenOnFirstMatch",
    value: function getTokenOnFirstMatch(_ref3) {
      var input = _ref3.input,
          type = _ref3.type,
          regex = _ref3.regex;
      var matches = input.match(regex);
      return matches ? {
        type: type,
        value: matches[1]
      } : undefined;
    }
  }]);

  return Tokenizer;
}();



/***/ }),

/***/ "./src/core/regexFactory.js":
/*!**********************************!*\
  !*** ./src/core/regexFactory.js ***!
  \**********************************/
/*! exports provided: createOperatorRegex, createLineCommentRegex, createReservedWordRegex, createWordRegex, createStringRegex, createStringPattern, createParenRegex, createPlaceholderRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOperatorRegex", function() { return createOperatorRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLineCommentRegex", function() { return createLineCommentRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReservedWordRegex", function() { return createReservedWordRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWordRegex", function() { return createWordRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStringRegex", function() { return createStringRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStringPattern", function() { return createStringPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createParenRegex", function() { return createParenRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPlaceholderRegex", function() { return createPlaceholderRegex; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

function createOperatorRegex(multiLetterOperators) {
  return new RegExp("^(".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortByLengthDesc"])(multiLetterOperators).map(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"]).join('|'), "|.)"), 'u');
}
function createLineCommentRegex(lineCommentTypes) {
  return new RegExp("^((?:".concat(lineCommentTypes.map(function (c) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"])(c);
  }).join('|'), ").*?)(?:\r\n|\r|\n|$)"), 'u');
}
function createReservedWordRegex(reservedWords) {
  if (reservedWords.length === 0) {
    return new RegExp("^\b$", 'u');
  }

  var reservedWordsPattern = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortByLengthDesc"])(reservedWords).join('|').replace(/ /g, '\\s+');
  return new RegExp("^(".concat(reservedWordsPattern, ")\\b"), 'iu');
}
function createWordRegex() {
  var specialChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(specialChars.join(''), "]+)"), 'u');
}
function createStringRegex(stringTypes) {
  return new RegExp('^(' + createStringPattern(stringTypes) + ')', 'u');
} // This enables the following string patterns:
// 1. backtick quoted string using `` to escape
// 2. square bracket quoted string (SQL Server) using ]] to escape
// 3. double quoted string using "" or \" to escape
// 4. single quoted string using '' or \' to escape
// 5. national character quoted string using N'' or N\' to escape
// 6. Unicode single-quoted string using \' to escape
// 7. Unicode double-quoted string using \" to escape
// 8. PostgreSQL dollar-quoted strings

function createStringPattern(stringTypes) {
  var patterns = {
    '``': '((`[^`]*($|`))+)',
    '{}': '((\\{[^\\}]*($|\\}))+)',
    '[]': '((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)',
    '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)",
    "U&''": "((U&'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    'U&""': '((U&"[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    $$: '((?<tag>\\$\\w*\\$)[\\s\\S]*?(?:\\k<tag>|$))'
  };
  return stringTypes.map(function (t) {
    return patterns[t];
  }).join('|');
}
function createParenRegex(parens) {
  return new RegExp('^(' + parens.map(escapeParen).join('|') + ')', 'iu');
}

function escapeParen(paren) {
  if (paren.length === 1) {
    // A single punctuation character
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"])(paren);
  } else {
    // longer word
    return '\\b' + paren + '\\b';
  }
}

function createPlaceholderRegex(types, pattern) {
  if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(types)) {
    return false;
  }

  var typesRegex = types.map(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeRegExp"]).join('|');
  return new RegExp("^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"), 'u');
}

/***/ }),

/***/ "./src/core/token.js":
/*!***************************!*\
  !*** ./src/core/token.js ***!
  \***************************/
/*! exports provided: isAnd, isBetween, isLimit, isSet, isBy, isWindow, isEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAnd", function() { return isAnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBetween", function() { return isBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLimit", function() { return isLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSet", function() { return isSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBy", function() { return isBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnd", function() { return isEnd; });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");


var isToken = function isToken(type, regex) {
  return function (token) {
    return (token === null || token === void 0 ? void 0 : token.type) === type && regex.test(token === null || token === void 0 ? void 0 : token.value);
  };
};

var isAnd = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE, /^AND$/i);
var isBetween = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED, /^BETWEEN$/i);
var isLimit = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^LIMIT$/i);
var isSet = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^[S\u017F]ET$/i);
var isBy = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED, /^BY$/i);
var isWindow = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^WINDOW$/i);
var isEnd = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN, /^END$/i);

/***/ }),

/***/ "./src/core/tokenTypes.js":
/*!********************************!*\
  !*** ./src/core/tokenTypes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Constants for token types
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  WORD: 'word',
  STRING: 'string',
  RESERVED: 'reserved',
  RESERVED_TOP_LEVEL: 'reserved-top-level',
  RESERVED_TOP_LEVEL_NO_INDENT: 'reserved-top-level-no-indent',
  RESERVED_NEWLINE: 'reserved-newline',
  OPERATOR: 'operator',
  OPEN_PAREN: 'open-paren',
  CLOSE_PAREN: 'close-paren',
  LINE_COMMENT: 'line-comment',
  BLOCK_COMMENT: 'block-comment',
  NUMBER: 'number',
  PLACEHOLDER: 'placeholder'
});

/***/ }),

/***/ "./src/languages/Db2Formatter.js":
/*!***************************************!*\
  !*** ./src/languages/Db2Formatter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Db2Formatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ABS', 'ACTIVATE', 'ALIAS', 'ALL', 'ALLOCATE', 'ALLOW', 'ALTER', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASC', 'ASENSITIVE', 'ASSOCIATE', 'ASUTIME', 'ASYMMETRIC', 'AT', 'ATOMIC', 'ATTRIBUTES', 'AUDIT', 'AUTHORIZATION', 'AUX', 'AUXILIARY', 'AVG', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BUFFERPOOL', 'BY', 'CACHE', 'CALL', 'CALLED', 'CAPTURE', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CCSID', 'CEIL', 'CEILING', 'CHAR', 'CHARACTER', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHECK', 'CLOB', 'CLONE', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLECT', 'COLLECTION', 'COLLID', 'COLUMN', 'COMMENT', 'COMMIT', 'CONCAT', 'CONDITION', 'CONNECT', 'CONNECTION', 'CONSTRAINT', 'CONTAINS', 'CONTINUE', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COUNT_BIG', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_LC_CTYPE', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_SERVER', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DATAPARTITIONNAME', 'DATAPARTITIONNUM', 'DATE', 'DAY', 'DAYS', 'DB2GENERAL', 'DB2GENRL', 'DB2SQL', 'DBINFO', 'DBPARTITIONNAME', 'DBPARTITIONNUM', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFINITION', 'DELETE', 'DENSERANK', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DESCRIPTOR', 'DETERMINISTIC', 'DIAGNOSTICS', 'DISABLE', 'DISALLOW', 'DISCONNECT', 'DISTINCT', 'DO', 'DOCUMENT', 'DOUBLE', 'DROP', 'DSSIZE', 'DYNAMIC', 'EACH', 'EDITPROC', 'ELEMENT', 'ELSE', 'ELSEIF', 'ENABLE', 'ENCODING', 'ENCRYPTION', 'END', 'END-EXEC', 'ENDING', 'ERASE', 'ESCAPE', 'EVERY', 'EXCEPTION', 'EXCLUDING', 'EXCLUSIVE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXIT', 'EXP', 'EXPLAIN', 'EXTENDED', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FENCED', 'FETCH', 'FIELDPROC', 'FILE', 'FILTER', 'FINAL', 'FIRST', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FULL', 'FUNCTION', 'FUSION', 'GENERAL', 'GENERATED', 'GET', 'GLOBAL', 'GOTO', 'GRANT', 'GRAPHIC', 'GROUP', 'GROUPING', 'HANDLER', 'HASH', 'HASHED_VALUE', 'HINT', 'HOLD', 'HOUR', 'HOURS', 'IDENTITY', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INCLUSIVE', 'INCREMENT', 'INDEX', 'INDICATOR', 'INDICATORS', 'INF', 'INFINITY', 'INHERIT', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTEGRITY', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'ISOBID', 'ISOLATION', 'ITERATE', 'JAR', 'JAVA', 'KEEP', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LATERAL', 'LC_CTYPE', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LINKTYPE', 'LN', 'LOCAL', 'LOCALDATE', 'LOCALE', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATOR', 'LOCATORS', 'LOCK', 'LOCKMAX', 'LOCKSIZE', 'LONG', 'LOOP', 'LOWER', 'MAINTAINED', 'MATCH', 'MATERIALIZED', 'MAX', 'MAXVALUE', 'MEMBER', 'MERGE', 'METHOD', 'MICROSECOND', 'MICROSECONDS', 'MIN', 'MINUTE', 'MINUTES', 'MINVALUE', 'MOD', 'MODE', 'MODIFIES', 'MODULE', 'MONTH', 'MONTHS', 'MULTISET', 'NAN', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NEW_TABLE', 'NEXTVAL', 'NO', 'NOCACHE', 'NOCYCLE', 'NODENAME', 'NODENUMBER', 'NOMAXVALUE', 'NOMINVALUE', 'NONE', 'NOORDER', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'NUMPARTS', 'OBID', 'OCTET_LENGTH', 'OF', 'OFFSET', 'OLD', 'OLD_TABLE', 'ON', 'ONLY', 'OPEN', 'OPTIMIZATION', 'OPTIMIZE', 'OPTION', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'PACKAGE', 'PADDED', 'PAGESIZE', 'PARAMETER', 'PART', 'PARTITION', 'PARTITIONED', 'PARTITIONING', 'PARTITIONS', 'PASSWORD', 'PATH', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'PIECESIZE', 'PLAN', 'POSITION', 'POWER', 'PRECISION', 'PREPARE', 'PREVVAL', 'PRIMARY', 'PRIQTY', 'PRIVILEGES', 'PROCEDURE', 'PROGRAM', 'PSID', 'PUBLIC', 'QUERY', 'QUERYNO', 'RANGE', 'RANK', 'READ', 'READS', 'REAL', 'RECOVERY', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RENAME', 'REPEAT', 'RESET', 'RESIGNAL', 'RESTART', 'RESTRICT', 'RESULT', 'RESULT_SET_LOCATOR', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUND_CEILING', 'ROUND_DOWN', 'ROUND_FLOOR', 'ROUND_HALF_DOWN', 'ROUND_HALF_EVEN', 'ROUND_HALF_UP', 'ROUND_UP', 'ROUTINE', 'ROW', 'ROWNUMBER', 'ROWS', 'ROWSET', 'ROW_NUMBER', 'RRN', 'RUN', 'SAVEPOINT', 'SCHEMA', 'SCOPE', 'SCRATCHPAD', 'SCROLL', 'SEARCH', 'SECOND', 'SECONDS', 'SECQTY', 'SECURITY', 'SENSITIVE', 'SEQUENCE', 'SESSION', 'SESSION_USER', 'SIGNAL', 'SIMILAR', 'SIMPLE', 'SMALLINT', 'SNAN', 'SOME', 'SOURCE', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLID', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'STACKED', 'STANDARD', 'START', 'STARTING', 'STATEMENT', 'STATIC', 'STATMENT', 'STAY', 'STDDEV_POP', 'STDDEV_SAMP', 'STOGROUP', 'STORES', 'STYLE', 'SUBMULTISET', 'SUBSTRING', 'SUM', 'SUMMARY', 'SYMMETRIC', 'SYNONYM', 'SYSFUN', 'SYSIBM', 'SYSPROC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'TABLESPACE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSLATE', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TYPE', 'UESCAPE', 'UNDO', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNTIL', 'UPPER', 'USAGE', 'USER', 'USING', 'VALIDPROC', 'VALUE', 'VARCHAR', 'VARIABLE', 'VARIANT', 'VARYING', 'VAR_POP', 'VAR_SAMP', 'VCAT', 'VERSION', 'VIEW', 'VOLATILE', 'VOLUMES', 'WHEN', 'WHENEVER', 'WHILE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WLM', 'WRITE', 'XMLELEMENT', 'XMLEXISTS', 'XMLNAMESPACES', 'YEAR', 'YEARS'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'GO', 'HAVING', 'INSERT INTO', 'INTERSECT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN'];

var Db2Formatter = /*#__PURE__*/function (_Formatter) {
  _inherits(Db2Formatter, _Formatter);

  var _super = _createSuper(Db2Formatter);

  function Db2Formatter() {
    _classCallCheck(this, Db2Formatter);

    return _super.apply(this, arguments);
  }

  _createClass(Db2Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``', '[]'],
        openParens: ['('],
        closeParens: [')'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [':'],
        lineCommentTypes: ['--'],
        specialWordChars: ['#', '@']
      });
    }
  }]);

  return Db2Formatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/MariaDbFormatter.js":
/*!*******************************************!*\
  !*** ./src/languages/MariaDbFormatter.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MariaDbFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DO_DOMAIN_IDS', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'ENCLOSED', 'ESCAPED', 'EXCEPT', 'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT', 'GENERAL', 'GRANT', 'GROUP', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IGNORE_DOMAIN_IDS', 'IGNORE_SERVER_IDS', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'ITERATE', 'JOIN', 'KEY', 'KEYS', 'KILL', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER_HEARTBEAT_PERIOD', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NULL', 'NUMERIC', 'ON', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'PAGE_CHECKSUM', 'PARSE_VCOL_EXPR', 'PARTITION', 'POSITION', 'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE', 'RANGE', 'READ', 'READS', 'READ_WRITE', 'REAL', 'RECURSIVE', 'REF_SYSTEM_ID', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL', 'RESTRICT', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'RLIKE', 'ROWS', 'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SLOW', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STATS_AUTO_RECALC', 'STATS_PERSISTENT', 'STATS_SAMPLE_PAGES', 'STRAIGHT_JOIN', 'TABLE', 'TERMINATED', 'THEN', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN'];

var MariaDbFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(MariaDbFormatter, _Formatter);

  var _super = _createSuper(MariaDbFormatter);

  function MariaDbFormatter() {
    _classCallCheck(this, MariaDbFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(MariaDbFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ['``', "''", '""'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--', '#'],
        specialWordChars: ['@'],
        operators: [':=', '<<', '>>', '!=', '<=>', '&&', '||']
      });
    }
  }]);

  return MariaDbFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/N1qlFormatter.js":
/*!****************************************!*\
  !*** ./src/languages/N1qlFormatter.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return N1qlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ALL', 'ALTER', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'BEGIN', 'BETWEEN', 'BINARY', 'BOOLEAN', 'BREAK', 'BUCKET', 'BUILD', 'BY', 'CALL', 'CASE', 'CAST', 'CLUSTER', 'COLLATE', 'COLLECTION', 'COMMIT', 'CONNECT', 'CONTINUE', 'CORRELATE', 'COVER', 'CREATE', 'DATABASE', 'DATASET', 'DATASTORE', 'DECLARE', 'DECREMENT', 'DELETE', 'DERIVED', 'DESC', 'DESCRIBE', 'DISTINCT', 'DO', 'DROP', 'EACH', 'ELEMENT', 'ELSE', 'END', 'EVERY', 'EXCEPT', 'EXCLUDE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST', 'FLATTEN', 'FOR', 'FORCE', 'FROM', 'FUNCTION', 'GRANT', 'GROUP', 'GSI', 'HAVING', 'IF', 'IGNORE', 'ILIKE', 'IN', 'INCLUDE', 'INCREMENT', 'INDEX', 'INFER', 'INLINE', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JOIN', 'KEY', 'KEYS', 'KEYSPACE', 'KNOWN', 'LAST', 'LEFT', 'LET', 'LETTING', 'LIKE', 'LIMIT', 'LSM', 'MAP', 'MAPPING', 'MATCHED', 'MATERIALIZED', 'MERGE', 'MISSING', 'NAMESPACE', 'NEST', 'NOT', 'NULL', 'NUMBER', 'OBJECT', 'OFFSET', 'ON', 'OPTION', 'OR', 'ORDER', 'OUTER', 'OVER', 'PARSE', 'PARTITION', 'PASSWORD', 'PATH', 'POOL', 'PREPARE', 'PRIMARY', 'PRIVATE', 'PRIVILEGE', 'PROCEDURE', 'PUBLIC', 'RAW', 'REALM', 'REDUCE', 'RENAME', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'SATISFIES', 'SCHEMA', 'SELECT', 'SELF', 'SEMI', 'SET', 'SHOW', 'SOME', 'START', 'STATISTICS', 'STRING', 'SYSTEM', 'THEN', 'TO', 'TRANSACTION', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNDER', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNSET', 'UPDATE', 'UPSERT', 'USE', 'USER', 'USING', 'VALIDATE', 'VALUE', 'VALUED', 'VALUES', 'VIA', 'VIEW', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WITHIN', 'WORK', 'XOR'];
var reservedTopLevelWords = ['DELETE FROM', 'EXCEPT ALL', 'EXCEPT', 'EXPLAIN DELETE FROM', 'EXPLAIN UPDATE', 'EXPLAIN UPSERT', 'FROM', 'GROUP BY', 'HAVING', 'INFER', 'INSERT INTO', 'LET', 'LIMIT', 'MERGE', 'NEST', 'ORDER BY', 'PREPARE', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNNEST', 'UPDATE', 'UPSERT', 'USE KEYS', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'XOR'];

var N1qlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(N1qlFormatter, _Formatter);

  var _super = _createSuper(N1qlFormatter);

  function N1qlFormatter() {
    _classCallCheck(this, N1qlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(N1qlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``'],
        openParens: ['(', '[', '{'],
        closeParens: [')', ']', '}'],
        namedPlaceholderTypes: ['$'],
        lineCommentTypes: ['#', '--']
      });
    }
  }]);

  return N1qlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/PlSqlFormatter.js":
/*!*****************************************!*\
  !*** ./src/languages/PlSqlFormatter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/token */ "./src/core/token.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var reservedWords = ['A', 'ACCESSIBLE', 'AGENT', 'AGGREGATE', 'ALL', 'ALTER', 'ANY', 'ARRAY', 'AS', 'ASC', 'AT', 'ATTRIBUTE', 'AUTHID', 'AVG', 'BETWEEN', 'BFILE_BASE', 'BINARY_INTEGER', 'BINARY', 'BLOB_BASE', 'BLOCK', 'BODY', 'BOOLEAN', 'BOTH', 'BOUND', 'BREADTH', 'BULK', 'BY', 'BYTE', 'C', 'CALL', 'CALLING', 'CASCADE', 'CASE', 'CHAR_BASE', 'CHAR', 'CHARACTER', 'CHARSET', 'CHARSETFORM', 'CHARSETID', 'CHECK', 'CLOB_BASE', 'CLONE', 'CLOSE', 'CLUSTER', 'CLUSTERS', 'COALESCE', 'COLAUTH', 'COLLECT', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPILED', 'COMPRESS', 'CONNECT', 'CONSTANT', 'CONSTRUCTOR', 'CONTEXT', 'CONTINUE', 'CONVERT', 'COUNT', 'CRASH', 'CREATE', 'CREDENTIAL', 'CURRENT', 'CURRVAL', 'CURSOR', 'CUSTOMDATUM', 'DANGLING', 'DATA', 'DATE_BASE', 'DATE', 'DAY', 'DECIMAL', 'DEFAULT', 'DEFINE', 'DELETE', 'DEPTH', 'DESC', 'DETERMINISTIC', 'DIRECTORY', 'DISTINCT', 'DO', 'DOUBLE', 'DROP', 'DURATION', 'ELEMENT', 'ELSIF', 'EMPTY', 'END', 'ESCAPE', 'EXCEPTIONS', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXIT', 'EXTENDS', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FINAL', 'FIRST', 'FIXED', 'FLOAT', 'FOR', 'FORALL', 'FORCE', 'FROM', 'FUNCTION', 'GENERAL', 'GOTO', 'GRANT', 'GROUP', 'HASH', 'HEAP', 'HIDDEN', 'HOUR', 'IDENTIFIED', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INDEX', 'INDEXES', 'INDICATOR', 'INDICES', 'INFINITE', 'INSTANTIABLE', 'INT', 'INTEGER', 'INTERFACE', 'INTERVAL', 'INTO', 'INVALIDATE', 'IS', 'ISOLATION', 'JAVA', 'LANGUAGE', 'LARGE', 'LEADING', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE2', 'LIKE4', 'LIKEC', 'LIMITED', 'LOCAL', 'LOCK', 'LONG', 'MAP', 'MAX', 'MAXLEN', 'MEMBER', 'MERGE', 'MIN', 'MINUTE', 'MLSLABEL', 'MOD', 'MODE', 'MONTH', 'MULTISET', 'NAME', 'NAN', 'NATIONAL', 'NATIVE', 'NATURAL', 'NATURALN', 'NCHAR', 'NEW', 'NEXTVAL', 'NOCOMPRESS', 'NOCOPY', 'NOT', 'NOWAIT', 'NULL', 'NULLIF', 'NUMBER_BASE', 'NUMBER', 'OBJECT', 'OCICOLL', 'OCIDATE', 'OCIDATETIME', 'OCIDURATION', 'OCIINTERVAL', 'OCILOBLOCATOR', 'OCINUMBER', 'OCIRAW', 'OCIREF', 'OCIREFCURSOR', 'OCIROWID', 'OCISTRING', 'OCITYPE', 'OF', 'OLD', 'ON', 'ONLY', 'OPAQUE', 'OPEN', 'OPERATOR', 'OPTION', 'ORACLE', 'ORADATA', 'ORDER', 'ORGANIZATION', 'ORLANY', 'ORLVARY', 'OTHERS', 'OUT', 'OVERLAPS', 'OVERRIDING', 'PACKAGE', 'PARALLEL_ENABLE', 'PARAMETER', 'PARAMETERS', 'PARENT', 'PARTITION', 'PASCAL', 'PCTFREE', 'PIPE', 'PIPELINED', 'PLS_INTEGER', 'PLUGGABLE', 'POSITIVE', 'POSITIVEN', 'PRAGMA', 'PRECISION', 'PRIOR', 'PRIVATE', 'PROCEDURE', 'PUBLIC', 'RAISE', 'RANGE', 'RAW', 'READ', 'REAL', 'RECORD', 'REF', 'REFERENCE', 'RELEASE', 'RELIES_ON', 'REM', 'REMAINDER', 'RENAME', 'RESOURCE', 'RESULT_CACHE', 'RESULT', 'RETURN', 'RETURNING', 'REVERSE', 'REVOKE', 'ROLLBACK', 'ROW', 'ROWID', 'ROWNUM', 'ROWTYPE', 'SAMPLE', 'SAVE', 'SAVEPOINT', 'SB1', 'SB2', 'SB4', 'SEARCH', 'SECOND', 'SEGMENT', 'SELF', 'SEPARATE', 'SEQUENCE', 'SERIALIZABLE', 'SHARE', 'SHORT', 'SIZE_T', 'SIZE', 'SMALLINT', 'SOME', 'SPACE', 'SPARSE', 'SQL', 'SQLCODE', 'SQLDATA', 'SQLERRM', 'SQLNAME', 'SQLSTATE', 'STANDARD', 'START', 'STATIC', 'STDDEV', 'STORED', 'STRING', 'STRUCT', 'STYLE', 'SUBMULTISET', 'SUBPARTITION', 'SUBSTITUTABLE', 'SUBTYPE', 'SUCCESSFUL', 'SUM', 'SYNONYM', 'SYSDATE', 'TABAUTH', 'TABLE', 'TDO', 'THE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_ABBR', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TIMEZONE_REGION', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSACTIONAL', 'TRIGGER', 'TRUE', 'TRUSTED', 'TYPE', 'UB1', 'UB2', 'UB4', 'UID', 'UNDER', 'UNIQUE', 'UNPLUG', 'UNSIGNED', 'UNTRUSTED', 'USE', 'USER', 'USING', 'VALIDATE', 'VALIST', 'VALUE', 'VARCHAR', 'VARCHAR2', 'VARIABLE', 'VARIANCE', 'VARRAY', 'VARYING', 'VIEW', 'VIEWS', 'VOID', 'WHENEVER', 'WHILE', 'WITH', 'WORK', 'WRAPPED', 'WRITE', 'YEAR', 'ZONE'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'BEGIN', 'CONNECT BY', 'DECLARE', 'DELETE FROM', 'DELETE', 'END', 'EXCEPT', 'EXCEPTION', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'LOOP', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'START WITH', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS APPLY', 'CROSS JOIN', 'ELSE', 'END', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN', 'XOR'];

var PlSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PlSqlFormatter, _Formatter);

  var _super = _createSuper(PlSqlFormatter);

  function PlSqlFormatter() {
    _classCallCheck(this, PlSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PlSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "N''", "''", '``'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [':'],
        lineCommentTypes: ['--'],
        specialWordChars: ['_', '$', '#', '.', '@']
      });
    }
  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      if (Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isSet"])(token) && Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isBy"])(this.previousReservedToken)) {
        return {
          type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].RESERVED,
          value: token.value
        };
      }

      return token;
    }
  }]);

  return PlSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/PostgreSqlFormatter.js":
/*!**********************************************!*\
  !*** ./src/languages/PostgreSqlFormatter.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgreSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ABORT', 'ABSOLUTE', 'ACCESS', 'ACTION', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', 'AT', 'ATTACH', 'ATTRIBUTE', 'AUTHORIZATION', 'BACKWARD', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BIT', 'BOOLEAN', 'BOTH', 'BY', 'CACHE', 'CALL', 'CALLED', 'CASCADE', 'CASCADED', 'CASE', 'CAST', 'CATALOG', 'CHAIN', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHECK', 'CHECKPOINT', 'CLASS', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'CONCURRENTLY', 'CONFIGURATION', 'CONFLICT', 'CONNECTION', 'CONSTRAINT', 'CONSTRAINTS', 'CONTENT', 'CONTINUE', 'CONVERSION', 'COPY', 'COST', 'CREATE', 'CROSS', 'CSV', 'CUBE', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINER', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DEPENDS', 'DESC', 'DETACH', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISTINCT', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'EACH', 'ELSE', 'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', 'ENUM', 'ESCAPE', 'EVENT', 'EXCEPT', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FAMILY', 'FETCH', 'FILTER', 'FIRST', 'FLOAT', 'FOLLOWING', 'FOR', 'FORCE', 'FOREIGN', 'FORWARD', 'FREEZE', 'FROM', 'FULL', 'FUNCTION', 'FUNCTIONS', 'GENERATED', 'GLOBAL', 'GRANT', 'GRANTED', 'GREATEST', 'GROUP', 'GROUPING', 'GROUPS', 'HANDLER', 'HAVING', 'HEADER', 'HOLD', 'HOUR', 'IDENTITY', 'IF', 'ILIKE', 'IMMEDIATE', 'IMMUTABLE', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDE', 'INCLUDING', 'INCREMENT', 'INDEX', 'INDEXES', 'INHERIT', 'INHERITS', 'INITIALLY', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSTEAD', 'INT', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISNULL', 'ISOLATION', 'JOIN', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LAST', 'LATERAL', 'LEADING', 'LEAKPROOF', 'LEAST', 'LEFT', 'LEVEL', 'LIKE', 'LIMIT', 'LISTEN', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCK', 'LOCKED', 'LOGGED', 'MAPPING', 'MATCH', 'MATERIALIZED', 'MAXVALUE', 'METHOD', 'MINUTE', 'MINVALUE', 'MODE', 'MONTH', 'MOVE', 'NAME', 'NAMES', 'NATIONAL', 'NATURAL', 'NCHAR', 'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NO', 'NONE', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NOTHING', 'NOTIFY', 'NOTNULL', 'NOWAIT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'OBJECT', 'OF', 'OFF', 'OFFSET', 'OIDS', 'OLD', 'ON', 'ONLY', 'OPERATOR', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'OWNED', 'OWNER', 'PARALLEL', 'PARSER', 'PARTIAL', 'PARTITION', 'PASSING', 'PASSWORD', 'PLACING', 'PLANS', 'POLICY', 'POSITION', 'PRECEDING', 'PRECISION', 'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROCEDURES', 'PROGRAM', 'PUBLICATION', 'QUOTE', 'RANGE', 'READ', 'REAL', 'REASSIGN', 'RECHECK', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'RESET', 'RESTART', 'RESTRICT', 'RETURNING', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINES', 'ROW', 'ROWS', 'RULE', 'SAVEPOINT', 'SCHEMA', 'SCHEMAS', 'SCROLL', 'SEARCH', 'SECOND', 'SECURITY', 'SELECT', 'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SETS', 'SHARE', 'SHOW', 'SIMILAR', 'SIMPLE', 'SKIP', 'SMALLINT', 'SNAPSHOT', 'SOME', 'SQL', 'STABLE', 'STANDALONE', 'START', 'STATEMENT', 'STATISTICS', 'STDIN', 'STDOUT', 'STORAGE', 'STORED', 'STRICT', 'STRIP', 'SUBSCRIPTION', 'SUBSTRING', 'SUPPORT', 'SYMMETRIC', 'SYSID', 'SYSTEM', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TABLESPACE', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSFORM', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNENCRYPTED', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLISTEN', 'UNLOGGED', 'UNTIL', 'UPDATE', 'USER', 'USING', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VARCHAR', 'VARIADIC', 'VARYING', 'VERBOSE', 'VERSION', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', 'WHERE', 'WHITESPACE', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLATTRIBUTES', 'XMLCONCAT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLROOT', 'XMLSERIALIZE', 'XMLTABLE', 'YEAR', 'YES', 'ZONE'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN'];

var PostgreSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PostgreSqlFormatter, _Formatter);

  var _super = _createSuper(PostgreSqlFormatter);

  function PostgreSqlFormatter() {
    _classCallCheck(this, PostgreSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PostgreSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", "U&''", 'U&""', '$$'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['$'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--'],
        operators: ['<<', '>>', '||/', '|/', '::', '->>', '->', '~~*', '~~', '!~~*', '!~~', '~*', '!~*', '!~']
      });
    }
  }]);

  return PostgreSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/RedshiftFormatter.js":
/*!********************************************!*\
  !*** ./src/languages/RedshiftFormatter.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StandardSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['AES128', 'AES256', 'ALLOWOVERWRITE', 'ANALYSE', 'ARRAY', 'AS', 'ASC', 'AUTHORIZATION', 'BACKUP', 'BINARY', 'BLANKSASNULL', 'BOTH', 'BYTEDICT', 'BZIP2', 'CAST', 'CHECK', 'COLLATE', 'COLUMN', 'CONSTRAINT', 'CREATE', 'CREDENTIALS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURRENT_USER_ID', 'DEFAULT', 'DEFERRABLE', 'DEFLATE', 'DEFRAG', 'DELTA', 'DELTA32K', 'DESC', 'DISABLE', 'DISTINCT', 'DO', 'ELSE', 'EMPTYASNULL', 'ENABLE', 'ENCODE', 'ENCRYPT', 'ENCRYPTION', 'END', 'EXPLICIT', 'FALSE', 'FOR', 'FOREIGN', 'FREEZE', 'FULL', 'GLOBALDICT256', 'GLOBALDICT64K', 'GRANT', 'GZIP', 'IDENTITY', 'IGNORE', 'ILIKE', 'INITIALLY', 'INTO', 'LEADING', 'LOCALTIME', 'LOCALTIMESTAMP', 'LUN', 'LUNS', 'LZO', 'LZOP', 'MINUS', 'MOSTLY13', 'MOSTLY32', 'MOSTLY8', 'NATURAL', 'NEW', 'NULLS', 'OFF', 'OFFLINE', 'OFFSET', 'OLD', 'ON', 'ONLY', 'OPEN', 'ORDER', 'OVERLAPS', 'PARALLEL', 'PARTITION', 'PERCENT', 'PERMISSIONS', 'PLACING', 'PRIMARY', 'RAW', 'READRATIO', 'RECOVER', 'REFERENCES', 'REJECTLOG', 'RESORT', 'RESTORE', 'SESSION_USER', 'SIMILAR', 'SYSDATE', 'SYSTEM', 'TABLE', 'TAG', 'TDES', 'TEXT255', 'TEXT32K', 'THEN', 'TIMESTAMP', 'TO', 'TOP', 'TRAILING', 'TRUE', 'TRUNCATECOLUMNS', 'UNIQUE', 'USER', 'USING', 'VERBOSE', 'WALLET', 'WHEN', 'WITH', 'WITHOUT', 'PREDICATE', 'COLUMNS', 'COMPROWS', 'COMPRESSION', 'COPY', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE', 'VACUUM', 'COPY', 'UNLOAD', 'EVEN', 'ALL'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'INTERSECT', 'TOP', 'LIMIT', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNION ALL', 'UNION', 'UPDATE', 'VALUES', 'WHERE', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE'];
var reservedTopLevelWordsNoIndent = [];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED'];

var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(StandardSqlFormatter, _Formatter);

  var _super = _createSuper(StandardSqlFormatter);

  function StandardSqlFormatter() {
    _classCallCheck(this, StandardSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(StandardSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``'],
        openParens: ['('],
        closeParens: [')'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: ['@', '#', '$'],
        lineCommentTypes: ['--']
      });
    }
  }]);

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/SparkSqlFormatter.js":
/*!********************************************!*\
  !*** ./src/languages/SparkSqlFormatter.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SparkSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/token */ "./src/core/token.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var reservedWords = ['ALL', 'ALTER', 'ANALYSE', 'ANALYZE', 'ARRAY_ZIP', 'ARRAY', 'AS', 'ASC', 'AVG', 'BETWEEN', 'CASCADE', 'CASE', 'CAST', 'COALESCE', 'COLLECT_LIST', 'COLLECT_SET', 'COLUMN', 'COLUMNS', 'COMMENT', 'CONSTRAINT', 'CONTAINS', 'CONVERT', 'COUNT', 'CUME_DIST', 'CURRENT ROW', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'DATABASE', 'DATABASES', 'DATE_ADD', 'DATE_SUB', 'DATE_TRUNC', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DAY', 'DAYS', 'DECODE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DROP', 'ELSE', 'ENCODE', 'END', 'EXISTS', 'EXPLAIN', 'EXPLODE_OUTER', 'EXPLODE', 'FILTER', 'FIRST_VALUE', 'FIRST', 'FIXED', 'FLATTEN', 'FOLLOWING', 'FROM_UNIXTIME', 'FULL', 'GREATEST', 'GROUP_CONCAT', 'HOUR_MINUTE', 'HOUR_SECOND', 'HOUR', 'HOURS', 'IF', 'IFNULL', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS', 'LAG', 'LAST_VALUE', 'LAST', 'LEAD', 'LEADING', 'LEAST', 'LEVEL', 'LIKE', 'MAX', 'MERGE', 'MIN', 'MINUTE_SECOND', 'MINUTE', 'MONTH', 'NATURAL', 'NOT', 'NOW()', 'NTILE', 'NULL', 'NULLIF', 'OFFSET', 'ON DELETE', 'ON UPDATE', 'ON', 'ONLY', 'OPTIMIZE', 'OVER', 'PERCENT_RANK', 'PRECEDING', 'RANGE', 'RANK', 'REGEXP', 'RENAME', 'RLIKE', 'ROW', 'ROWS', 'SECOND', 'SEPARATOR', 'SEQUENCE', 'SIZE', 'STRING', 'STRUCT', 'SUM', 'TABLE', 'TABLES', 'TEMPORARY', 'THEN', 'TO_DATE', 'TO_JSON', 'TO', 'TRAILING', 'TRANSFORM', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNIQUE', 'UNIX_TIMESTAMP', 'UNLOCK', 'UNSIGNED', 'USING', 'VARIABLES', 'VIEW', 'WHEN', 'WITH', 'YEAR_MONTH'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER DATABASE', 'ALTER SCHEMA', 'ALTER TABLE', 'CLUSTER BY', 'CLUSTERED BY', 'DELETE FROM', 'DISTRIBUTE BY', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'OPTIONS', 'ORDER BY', 'PARTITION BY', 'PARTITIONED BY', 'RANGE', 'ROWS', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'TBLPROPERTIES', 'UPDATE', 'USING', 'VALUES', 'WHERE', 'WINDOW'];
var reservedTopLevelWordsNoIndent = ['EXCEPT ALL', 'EXCEPT', 'INTERSECT ALL', 'INTERSECT', 'UNION ALL', 'UNION'];
var reservedNewlineWords = ['AND', 'ANTI JOIN', 'CREATE OR', 'CREATE', 'CROSS JOIN', 'ELSE', 'FULL OUTER JOIN', 'INNER JOIN', 'JOIN', 'LATERAL VIEW', 'LEFT ANTI JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'LEFT SEMI JOIN', 'NATURAL ANTI JOIN', 'NATURAL FULL OUTER JOIN', 'NATURAL INNER JOIN', 'NATURAL JOIN', 'NATURAL LEFT ANTI JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL LEFT SEMI JOIN', 'NATURAL OUTER JOIN', 'NATURAL RIGHT OUTER JOIN', 'NATURAL RIGHT SEMI JOIN', 'NATURAL SEMI JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'RIGHT SEMI JOIN', 'SEMI JOIN', 'WHEN', 'XOR'];

var SparkSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SparkSqlFormatter, _Formatter);

  var _super = _createSuper(SparkSqlFormatter);

  function SparkSqlFormatter() {
    _classCallCheck(this, SparkSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SparkSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``', '{}'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: ['$'],
        lineCommentTypes: ['--']
      });
    }
  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // Fix cases where names are ambiguously keywords or functions
      if (Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isWindow"])(token)) {
        var aheadToken = this.tokenLookAhead();

        if (aheadToken && aheadToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].OPEN_PAREN) {
          // This is a function call, treat it as a reserved word
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].RESERVED,
            value: token.value
          };
        }
      } // Fix cases where names are ambiguously keywords or properties


      if (Object(_core_token__WEBPACK_IMPORTED_MODULE_1__["isEnd"])(token)) {
        var backToken = this.tokenLookBehind();

        if (backToken && backToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].OPERATOR && backToken.value === '.') {
          // This is window().end (or similar) not CASE ... END
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].WORD,
            value: token.value
          };
        }
      }

      return token;
    }
  }]);

  return SparkSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/StandardSqlFormatter.js":
/*!***********************************************!*\
  !*** ./src/languages/StandardSqlFormatter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StandardSqlFormatter; });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ACCESSIBLE', 'ACTION', 'AGAINST', 'AGGREGATE', 'ALGORITHM', 'ALL', 'ALTER', 'ANALYSE', 'ANALYZE', 'AS', 'ASC', 'AUTOCOMMIT', 'AUTO_INCREMENT', 'BACKUP', 'BEGIN', 'BETWEEN', 'BINLOG', 'BOTH', 'CASCADE', 'CHANGE', 'CHANGED', 'CHARACTER SET', 'CHARSET', 'CHECK', 'CHECKSUM', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPRESSED', 'CONCURRENT', 'CONSTRAINT', 'CONTAINS', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT_TIMESTAMP', 'DATABASE', 'DATABASES', 'DAY', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DEFAULT', 'DEFINER', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DO', 'DROP', 'DUMPFILE', 'DUPLICATE', 'DYNAMIC', 'ELSE', 'ENCLOSED', 'ENGINE', 'ENGINES', 'ENGINE_TYPE', 'ESCAPE', 'ESCAPED', 'EVENTS', 'EXEC', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'EXTENDED', 'FAST', 'FETCH', 'FIELDS', 'FILE', 'FIRST', 'FIXED', 'FLUSH', 'FOR', 'FORCE', 'FOREIGN', 'FULL', 'FULLTEXT', 'FUNCTION', 'GLOBAL', 'GRANT', 'GRANTS', 'GROUP_CONCAT', 'HEAP', 'HIGH_PRIORITY', 'HOSTS', 'HOUR', 'HOUR_MINUTE', 'HOUR_SECOND', 'IDENTIFIED', 'IF', 'IFNULL', 'IGNORE', 'IN', 'INDEX', 'INDEXES', 'INFILE', 'INSERT', 'INSERT_ID', 'INSERT_METHOD', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISOLATION', 'KEY', 'KEYS', 'KILL', 'LAST_INSERT_ID', 'LEADING', 'LEVEL', 'LIKE', 'LINEAR', 'LINES', 'LOAD', 'LOCAL', 'LOCK', 'LOCKS', 'LOGS', 'LOW_PRIORITY', 'MARIA', 'MASTER', 'MASTER_CONNECT_RETRY', 'MASTER_HOST', 'MASTER_LOG_FILE', 'MATCH', 'MAX_CONNECTIONS_PER_HOUR', 'MAX_QUERIES_PER_HOUR', 'MAX_ROWS', 'MAX_UPDATES_PER_HOUR', 'MAX_USER_CONNECTIONS', 'MEDIUM', 'MERGE', 'MINUTE', 'MINUTE_SECOND', 'MIN_ROWS', 'MODE', 'MODIFY', 'MONTH', 'MRG_MYISAM', 'MYISAM', 'NAMES', 'NATURAL', 'NOT', 'NOW()', 'NULL', 'OFFSET', 'ON DELETE', 'ON UPDATE', 'ON', 'ONLY', 'OPEN', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'OUTFILE', 'PACK_KEYS', 'PAGE', 'PARTIAL', 'PARTITION', 'PARTITIONS', 'PASSWORD', 'PRIMARY', 'PRIVILEGES', 'PROCEDURE', 'PROCESS', 'PROCESSLIST', 'PURGE', 'QUICK', 'RAID0', 'RAID_CHUNKS', 'RAID_CHUNKSIZE', 'RAID_TYPE', 'RANGE', 'READ', 'READ_ONLY', 'READ_WRITE', 'REFERENCES', 'REGEXP', 'RELOAD', 'RENAME', 'REPAIR', 'REPEATABLE', 'REPLACE', 'REPLICATION', 'RESET', 'RESTORE', 'RESTRICT', 'RETURN', 'RETURNS', 'REVOKE', 'RLIKE', 'ROLLBACK', 'ROW', 'ROWS', 'ROW_FORMAT', 'SECOND', 'SECURITY', 'SEPARATOR', 'SERIALIZABLE', 'SESSION', 'SHARE', 'SHOW', 'SHUTDOWN', 'SLAVE', 'SONAME', 'SOUNDS', 'SQL', 'SQL_AUTO_IS_NULL', 'SQL_BIG_RESULT', 'SQL_BIG_SELECTS', 'SQL_BIG_TABLES', 'SQL_BUFFER_RESULT', 'SQL_CACHE', 'SQL_CALC_FOUND_ROWS', 'SQL_LOG_BIN', 'SQL_LOG_OFF', 'SQL_LOG_UPDATE', 'SQL_LOW_PRIORITY_UPDATES', 'SQL_MAX_JOIN_SIZE', 'SQL_NO_CACHE', 'SQL_QUOTE_SHOW_CREATE', 'SQL_SAFE_UPDATES', 'SQL_SELECT_LIMIT', 'SQL_SLAVE_SKIP_COUNTER', 'SQL_SMALL_RESULT', 'SQL_WARNINGS', 'START', 'STARTING', 'STATUS', 'STOP', 'STORAGE', 'STRAIGHT_JOIN', 'STRING', 'STRIPED', 'SUPER', 'TABLE', 'TABLES', 'TEMPORARY', 'TERMINATED', 'THEN', 'TO', 'TRAILING', 'TRANSACTIONAL', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNCOMMITTED', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'USAGE', 'USE', 'USING', 'VARIABLES', 'VIEW', 'WITH', 'WORK', 'WRITE', 'YEAR_MONTH'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'GO', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS APPLY', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER APPLY', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN', 'XOR'];

var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(StandardSqlFormatter, _Formatter);

  var _super = _createSuper(StandardSqlFormatter);

  function StandardSqlFormatter() {
    _classCallCheck(this, StandardSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(StandardSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "N''", "''", '``', '[]'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: ['@', ':'],
        lineCommentTypes: ['#', '--']
      });
    }
  }]);

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/sqlFormatter.js":
/*!*****************************!*\
  !*** ./src/sqlFormatter.js ***!
  \*****************************/
/*! exports provided: format, supportedDialects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportedDialects", function() { return supportedDialects; });
/* harmony import */ var _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languages/Db2Formatter */ "./src/languages/Db2Formatter.js");
/* harmony import */ var _languages_MariaDbFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languages/MariaDbFormatter */ "./src/languages/MariaDbFormatter.js");
/* harmony import */ var _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./languages/N1qlFormatter */ "./src/languages/N1qlFormatter.js");
/* harmony import */ var _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/PlSqlFormatter */ "./src/languages/PlSqlFormatter.js");
/* harmony import */ var _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./languages/PostgreSqlFormatter */ "./src/languages/PostgreSqlFormatter.js");
/* harmony import */ var _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/RedshiftFormatter */ "./src/languages/RedshiftFormatter.js");
/* harmony import */ var _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./languages/SparkSqlFormatter */ "./src/languages/SparkSqlFormatter.js");
/* harmony import */ var _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./languages/StandardSqlFormatter */ "./src/languages/StandardSqlFormatter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }









var formatters = {
  db2: _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__["default"],
  mariadb: _languages_MariaDbFormatter__WEBPACK_IMPORTED_MODULE_1__["default"],
  n1ql: _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  'pl/sql': _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_3__["default"],
  plsql: _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_3__["default"],
  postgresql: _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_4__["default"],
  redshift: _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_5__["default"],
  spark: _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_6__["default"],
  sql: _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_7__["default"]
};
/**
 * Format whitespace in a query to make it easier to read.
 *
 * @param {String} query
 * @param {Object} cfg
 *  @param {String} cfg.language Query language, default is Standard SQL
 *  @param {String} cfg.indent Characters used for indentation, default is "  " (2 spaces)
 *  @param {Boolean} cfg.uppercase Converts keywords to uppercase
 *  @param {Integer} cfg.linesBetweenQueries How many line breaks between queries
 *  @param {Object} cfg.params Collection of params for placeholder replacement
 * @return {String}
 */

var format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof query !== 'string') {
    throw new Error('Invalid query argument. Extected string, instead got ' + _typeof(query));
  }

  var Formatter = _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_7__["default"];

  if (cfg.language !== undefined) {
    Formatter = formatters[cfg.language];
  }

  if (Formatter === undefined) {
    throw Error("Unsupported SQL dialect: ".concat(cfg.language));
  }

  return new Formatter(cfg).format(query);
};
var supportedDialects = Object.keys(formatters);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: trimSpacesEnd, last, isEmpty, escapeRegExp, sortByLengthDesc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimSpacesEnd", function() { return trimSpacesEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return escapeRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByLengthDesc", function() { return sortByLengthDesc; });
// Only removes spaces, not newlines
var trimSpacesEnd = function trimSpacesEnd(str) {
  return str.replace(/[\t ]+$/, '');
}; // Last element from array

var last = function last(arr) {
  return arr[arr.length - 1];
}; // True array is empty, or it's not an array at all

var isEmpty = function isEmpty(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}; // Escapes regex special chars

var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, '\\$&');
}; // Sorts strings by length, so that longer ones are first
// Also sorts alphabetically after sorting by length.

var sortByLengthDesc = function sortByLengthDesc(strings) {
  return strings.sort(function (a, b) {
    return b.length - a.length || a.localeCompare(b);
  });
};

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9OMXFsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvUGxTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9Qb3N0Z3JlU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvUmVkc2hpZnRGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9TcGFya1NxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1N0YW5kYXJkU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9zcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkZvcm1hdHRlciIsImNmZyIsImluZGVudGF0aW9uIiwiSW5kZW50YXRpb24iLCJpbmRlbnQiLCJpbmxpbmVCbG9jayIsIklubGluZUJsb2NrIiwicGFyYW1zIiwiUGFyYW1zIiwicHJldmlvdXNSZXNlcnZlZFRva2VuIiwidG9rZW5zIiwiaW5kZXgiLCJFcnJvciIsInRva2VuIiwicXVlcnkiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImZvcm1hdHRlZFF1ZXJ5IiwiZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zIiwidHJpbSIsImZvckVhY2giLCJ0b2tlbk92ZXJyaWRlIiwidHlwZSIsInRva2VuVHlwZXMiLCJMSU5FX0NPTU1FTlQiLCJmb3JtYXRMaW5lQ29tbWVudCIsIkJMT0NLX0NPTU1FTlQiLCJmb3JtYXRCbG9ja0NvbW1lbnQiLCJSRVNFUlZFRF9UT1BfTEVWRUwiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCIsIlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZE5vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORSIsImZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQiLCJSRVNFUlZFRCIsImZvcm1hdFdpdGhTcGFjZXMiLCJPUEVOX1BBUkVOIiwiZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzIiwiQ0xPU0VfUEFSRU4iLCJmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXMiLCJQTEFDRUhPTERFUiIsImZvcm1hdFBsYWNlaG9sZGVyIiwidmFsdWUiLCJmb3JtYXRDb21tYSIsImZvcm1hdFdpdGhTcGFjZUFmdGVyIiwiZm9ybWF0V2l0aG91dFNwYWNlcyIsImZvcm1hdFF1ZXJ5U2VwYXJhdG9yIiwiYWRkTmV3bGluZSIsInNob3ciLCJpbmRlbnRDb21tZW50IiwiY29tbWVudCIsInJlcGxhY2UiLCJnZXRJbmRlbnQiLCJkZWNyZWFzZVRvcExldmVsIiwiZXF1YWxpemVXaGl0ZXNwYWNlIiwiaW5jcmVhc2VUb3BMZXZlbCIsImlzQW5kIiwiaXNCZXR3ZWVuIiwidG9rZW5Mb29rQmVoaW5kIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJ3aGl0ZXNwYWNlQmVmb3JlIiwibGVuZ3RoIiwidHJpbVNwYWNlc0VuZCIsImJlZ2luSWZQb3NzaWJsZSIsImlzQWN0aXZlIiwiaW5jcmVhc2VCbG9ja0xldmVsIiwiZW5kIiwiZGVjcmVhc2VCbG9ja0xldmVsIiwiZ2V0IiwiaXNMaW1pdCIsInJlc2V0SW5kZW50YXRpb24iLCJyZXBlYXQiLCJsaW5lc0JldHdlZW5RdWVyaWVzIiwidXBwZXJjYXNlIiwidG9VcHBlckNhc2UiLCJlbmRzV2l0aCIsIm4iLCJJTkRFTlRfVFlQRV9UT1BfTEVWRUwiLCJJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCIsImluZGVudFR5cGVzIiwicHVzaCIsImxhc3QiLCJwb3AiLCJJTkxJTkVfTUFYX0xFTkdUSCIsImxldmVsIiwiaXNJbmxpbmVCbG9jayIsImkiLCJpc0ZvcmJpZGRlblRva2VuIiwiQ09NTUVOVCIsImtleSIsIlRva2VuaXplciIsIldISVRFU1BBQ0VfUkVHRVgiLCJOVU1CRVJfUkVHRVgiLCJPUEVSQVRPUl9SRUdFWCIsInJlZ2V4RmFjdG9yeSIsIm9wZXJhdG9ycyIsIkJMT0NLX0NPTU1FTlRfUkVHRVgiLCJMSU5FX0NPTU1FTlRfUkVHRVgiLCJsaW5lQ29tbWVudFR5cGVzIiwiUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCIsInJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORV9SRUdFWCIsInJlc2VydmVkTmV3bGluZVdvcmRzIiwiUkVTRVJWRURfUExBSU5fUkVHRVgiLCJyZXNlcnZlZFdvcmRzIiwiV09SRF9SRUdFWCIsInNwZWNpYWxXb3JkQ2hhcnMiLCJTVFJJTkdfUkVHRVgiLCJzdHJpbmdUeXBlcyIsIk9QRU5fUEFSRU5fUkVHRVgiLCJvcGVuUGFyZW5zIiwiQ0xPU0VfUEFSRU5fUkVHRVgiLCJjbG9zZVBhcmVucyIsIklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbmRleGVkUGxhY2Vob2xkZXJUeXBlcyIsIklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwibmFtZWRQbGFjZWhvbGRlclR5cGVzIiwiU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiaW5wdXQiLCJnZXRXaGl0ZXNwYWNlIiwic3Vic3RyaW5nIiwiZ2V0TmV4dFRva2VuIiwibWF0Y2hlcyIsIm1hdGNoIiwicHJldmlvdXNUb2tlbiIsImdldENvbW1lbnRUb2tlbiIsImdldFN0cmluZ1Rva2VuIiwiZ2V0T3BlblBhcmVuVG9rZW4iLCJnZXRDbG9zZVBhcmVuVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuIiwiZ2V0TnVtYmVyVG9rZW4iLCJnZXRSZXNlcnZlZFdvcmRUb2tlbiIsImdldFdvcmRUb2tlbiIsImdldE9wZXJhdG9yVG9rZW4iLCJnZXRMaW5lQ29tbWVudFRva2VuIiwiZ2V0QmxvY2tDb21tZW50VG9rZW4iLCJnZXRUb2tlbk9uRmlyc3RNYXRjaCIsInJlZ2V4IiwiU1RSSU5HIiwiZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5IiwicGFyc2VLZXkiLCJ2Iiwic2xpY2UiLCJnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkiLCJxdW90ZUNoYXIiLCJSZWdFeHAiLCJlc2NhcGVSZWdFeHAiLCJOVU1CRVIiLCJ1bmRlZmluZWQiLCJnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4iLCJnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbiIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50IiwiZ2V0UGxhaW5SZXNlcnZlZFRva2VuIiwiV09SRCIsImNyZWF0ZU9wZXJhdG9yUmVnZXgiLCJtdWx0aUxldHRlck9wZXJhdG9ycyIsInNvcnRCeUxlbmd0aERlc2MiLCJtYXAiLCJqb2luIiwiY3JlYXRlTGluZUNvbW1lbnRSZWdleCIsImMiLCJjcmVhdGVSZXNlcnZlZFdvcmRSZWdleCIsInJlc2VydmVkV29yZHNQYXR0ZXJuIiwiY3JlYXRlV29yZFJlZ2V4Iiwic3BlY2lhbENoYXJzIiwiY3JlYXRlU3RyaW5nUmVnZXgiLCJjcmVhdGVTdHJpbmdQYXR0ZXJuIiwicGF0dGVybnMiLCIkJCIsInQiLCJjcmVhdGVQYXJlblJlZ2V4IiwicGFyZW5zIiwiZXNjYXBlUGFyZW4iLCJwYXJlbiIsImNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgiLCJ0eXBlcyIsInBhdHRlcm4iLCJpc0VtcHR5IiwidHlwZXNSZWdleCIsImlzVG9rZW4iLCJ0ZXN0IiwiaXNTZXQiLCJpc0J5IiwiaXNXaW5kb3ciLCJpc0VuZCIsIkRiMkZvcm1hdHRlciIsIk1hcmlhRGJGb3JtYXR0ZXIiLCJOMXFsRm9ybWF0dGVyIiwiUGxTcWxGb3JtYXR0ZXIiLCJQb3N0Z3JlU3FsRm9ybWF0dGVyIiwiU3RhbmRhcmRTcWxGb3JtYXR0ZXIiLCJTcGFya1NxbEZvcm1hdHRlciIsImFoZWFkVG9rZW4iLCJ0b2tlbkxvb2tBaGVhZCIsImJhY2tUb2tlbiIsImZvcm1hdHRlcnMiLCJkYjIiLCJtYXJpYWRiIiwibjFxbCIsInBsc3FsIiwicG9zdGdyZXNxbCIsInJlZHNoaWZ0IiwiUmVkc2hpZnRGb3JtYXR0ZXIiLCJzcGFyayIsInNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Iiwic3RyaW5ncyIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxTO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWUMsR0FBWixFQUFpQjtBQUFBOztBQUNmLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsb0RBQUosQ0FBZ0IsS0FBS0YsR0FBTCxDQUFTRyxNQUF6QixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMsb0RBQUosRUFBbkI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMsK0NBQUosQ0FBVyxLQUFLUCxHQUFMLENBQVNNLE1BQXBCLENBQWQ7QUFDQSxTQUFLRSxxQkFBTCxHQUE2QixFQUE3QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7Ozs7Z0NBQ2M7QUFDVixZQUFNLElBQUlDLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztrQ0FDZ0JDLEssRUFBTztBQUNuQjtBQUNBLGFBQU9BLEtBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsyQkFDU0MsSyxFQUFPO0FBQ1osV0FBS0osTUFBTCxHQUFjLEtBQUtLLFNBQUwsR0FBaUJDLFFBQWpCLENBQTBCRixLQUExQixDQUFkO0FBQ0EsVUFBTUcsY0FBYyxHQUFHLEtBQUtDLDJCQUFMLEVBQXZCO0FBRUEsYUFBT0QsY0FBYyxDQUFDRSxJQUFmLEVBQVA7QUFDRDs7O2tEQUU2QjtBQUFBOztBQUM1QixVQUFJRixjQUFjLEdBQUcsRUFBckI7QUFFQSxXQUFLUCxNQUFMLENBQVlVLE9BQVosQ0FBb0IsVUFBQ1AsS0FBRCxFQUFRRixLQUFSLEVBQWtCO0FBQ3BDLGFBQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiO0FBRUFFLGFBQUssR0FBRyxLQUFJLENBQUNRLGFBQUwsQ0FBbUJSLEtBQW5CLENBQVI7O0FBRUEsWUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNDLFlBQTlCLEVBQTRDO0FBQzFDUCx3QkFBYyxHQUFHLEtBQUksQ0FBQ1EsaUJBQUwsQ0FBdUJaLEtBQXZCLEVBQThCSSxjQUE5QixDQUFqQjtBQUNELFNBRkQsTUFFTyxJQUFJSixLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ0csYUFBOUIsRUFBNkM7QUFDbERULHdCQUFjLEdBQUcsS0FBSSxDQUFDVSxrQkFBTCxDQUF3QmQsS0FBeEIsRUFBK0JJLGNBQS9CLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDSyxrQkFBOUIsRUFBa0Q7QUFDdkRYLHdCQUFjLEdBQUcsS0FBSSxDQUFDWSwwQkFBTCxDQUFnQ2hCLEtBQWhDLEVBQXVDSSxjQUF2QyxDQUFqQjtBQUNBLGVBQUksQ0FBQ1IscUJBQUwsR0FBNkJJLEtBQTdCO0FBQ0QsU0FITSxNQUdBLElBQUlBLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDTyw0QkFBOUIsRUFBNEQ7QUFDakViLHdCQUFjLEdBQUcsS0FBSSxDQUFDYyxrQ0FBTCxDQUF3Q2xCLEtBQXhDLEVBQStDSSxjQUEvQyxDQUFqQjtBQUNBLGVBQUksQ0FBQ1IscUJBQUwsR0FBNkJJLEtBQTdCO0FBQ0QsU0FITSxNQUdBLElBQUlBLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDUyxnQkFBOUIsRUFBZ0Q7QUFDckRmLHdCQUFjLEdBQUcsS0FBSSxDQUFDZ0IseUJBQUwsQ0FBK0JwQixLQUEvQixFQUFzQ0ksY0FBdEMsQ0FBakI7QUFDQSxlQUFJLENBQUNSLHFCQUFMLEdBQTZCSSxLQUE3QjtBQUNELFNBSE0sTUFHQSxJQUFJQSxLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ1csUUFBOUIsRUFBd0M7QUFDN0NqQix3QkFBYyxHQUFHLEtBQUksQ0FBQ2tCLGdCQUFMLENBQXNCdEIsS0FBdEIsRUFBNkJJLGNBQTdCLENBQWpCO0FBQ0EsZUFBSSxDQUFDUixxQkFBTCxHQUE2QkksS0FBN0I7QUFDRCxTQUhNLE1BR0EsSUFBSUEsS0FBSyxDQUFDUyxJQUFOLEtBQWVDLG1EQUFVLENBQUNhLFVBQTlCLEVBQTBDO0FBQy9DbkIsd0JBQWMsR0FBRyxLQUFJLENBQUNvQix3QkFBTCxDQUE4QnhCLEtBQTlCLEVBQXFDSSxjQUFyQyxDQUFqQjtBQUNELFNBRk0sTUFFQSxJQUFJSixLQUFLLENBQUNTLElBQU4sS0FBZUMsbURBQVUsQ0FBQ2UsV0FBOUIsRUFBMkM7QUFDaERyQix3QkFBYyxHQUFHLEtBQUksQ0FBQ3NCLHdCQUFMLENBQThCMUIsS0FBOUIsRUFBcUNJLGNBQXJDLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDaUIsV0FBOUIsRUFBMkM7QUFDaER2Qix3QkFBYyxHQUFHLEtBQUksQ0FBQ3dCLGlCQUFMLENBQXVCNUIsS0FBdkIsRUFBOEJJLGNBQTlCLENBQWpCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLEtBQUssQ0FBQzZCLEtBQU4sS0FBZ0IsR0FBcEIsRUFBeUI7QUFDOUJ6Qix3QkFBYyxHQUFHLEtBQUksQ0FBQzBCLFdBQUwsQ0FBaUI5QixLQUFqQixFQUF3QkksY0FBeEIsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDMkIsb0JBQUwsQ0FBMEIvQixLQUExQixFQUFpQ0ksY0FBakMsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDNEIsbUJBQUwsQ0FBeUJoQyxLQUF6QixFQUFnQ0ksY0FBaEMsQ0FBakI7QUFDRCxTQUZNLE1BRUEsSUFBSUosS0FBSyxDQUFDNkIsS0FBTixLQUFnQixHQUFwQixFQUF5QjtBQUM5QnpCLHdCQUFjLEdBQUcsS0FBSSxDQUFDNkIsb0JBQUwsQ0FBMEJqQyxLQUExQixFQUFpQ0ksY0FBakMsQ0FBakI7QUFDRCxTQUZNLE1BRUE7QUFDTEEsd0JBQWMsR0FBRyxLQUFJLENBQUNrQixnQkFBTCxDQUFzQnRCLEtBQXRCLEVBQTZCSSxjQUE3QixDQUFqQjtBQUNEO0FBQ0YsT0F0Q0Q7QUF1Q0EsYUFBT0EsY0FBUDtBQUNEOzs7c0NBRWlCSixLLEVBQU9DLEssRUFBTztBQUM5QixhQUFPLEtBQUtpQyxVQUFMLENBQWdCakMsS0FBSyxHQUFHLEtBQUtrQyxJQUFMLENBQVVuQyxLQUFWLENBQXhCLENBQVA7QUFDRDs7O3VDQUVrQkEsSyxFQUFPQyxLLEVBQU87QUFDL0IsYUFBTyxLQUFLaUMsVUFBTCxDQUFnQixLQUFLQSxVQUFMLENBQWdCakMsS0FBaEIsSUFBeUIsS0FBS21DLGFBQUwsQ0FBbUJwQyxLQUFLLENBQUM2QixLQUF6QixDQUF6QyxDQUFQO0FBQ0Q7OztrQ0FFYVEsTyxFQUFTO0FBQ3JCLGFBQU9BLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixXQUFoQixFQUE4QixPQUFPLEtBQUtqRCxXQUFMLENBQWlCa0QsU0FBakIsRUFBUCxHQUFzQyxHQUFwRSxDQUFQO0FBQ0Q7Ozt1REFFa0N2QyxLLEVBQU9DLEssRUFBTztBQUMvQyxXQUFLWixXQUFMLENBQWlCbUQsZ0JBQWpCO0FBQ0F2QyxXQUFLLEdBQUcsS0FBS2lDLFVBQUwsQ0FBZ0JqQyxLQUFoQixJQUF5QixLQUFLd0Msa0JBQUwsQ0FBd0IsS0FBS04sSUFBTCxDQUFVbkMsS0FBVixDQUF4QixDQUFqQztBQUNBLGFBQU8sS0FBS2tDLFVBQUwsQ0FBZ0JqQyxLQUFoQixDQUFQO0FBQ0Q7OzsrQ0FFMEJELEssRUFBT0MsSyxFQUFPO0FBQ3ZDLFdBQUtaLFdBQUwsQ0FBaUJtRCxnQkFBakI7QUFFQXZDLFdBQUssR0FBRyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVI7QUFFQSxXQUFLWixXQUFMLENBQWlCcUQsZ0JBQWpCO0FBRUF6QyxXQUFLLElBQUksS0FBS3dDLGtCQUFMLENBQXdCLEtBQUtOLElBQUwsQ0FBVW5DLEtBQVYsQ0FBeEIsQ0FBVDtBQUNBLGFBQU8sS0FBS2tDLFVBQUwsQ0FBZ0JqQyxLQUFoQixDQUFQO0FBQ0Q7Ozs4Q0FFeUJELEssRUFBT0MsSyxFQUFPO0FBQ3RDLFVBQUkwQyxvREFBSyxDQUFDM0MsS0FBRCxDQUFMLElBQWdCNEMsd0RBQVMsQ0FBQyxLQUFLQyxlQUFMLENBQXFCLENBQXJCLENBQUQsQ0FBN0IsRUFBd0Q7QUFDdEQsZUFBTyxLQUFLdkIsZ0JBQUwsQ0FBc0J0QixLQUF0QixFQUE2QkMsS0FBN0IsQ0FBUDtBQUNEOztBQUNELGFBQU8sS0FBS2lDLFVBQUwsQ0FBZ0JqQyxLQUFoQixJQUF5QixLQUFLd0Msa0JBQUwsQ0FBd0IsS0FBS04sSUFBTCxDQUFVbkMsS0FBVixDQUF4QixDQUF6QixHQUFxRSxHQUE1RTtBQUNELEssQ0FFRDs7Ozt1Q0FDbUI4QyxNLEVBQVE7QUFDekIsYUFBT0EsTUFBTSxDQUFDUixPQUFQLENBQWUsdUVBQWYsRUFBd0IsR0FBeEIsQ0FBUDtBQUNELEssQ0FFRDs7Ozs2Q0FDeUJ0QyxLLEVBQU9DLEssRUFBTztBQUFBOztBQUNyQztBQUNBO0FBQ0EsVUFBTThDLHFCQUFxQix1RUFDeEJyQyxtREFBVSxDQUFDYSxVQURhLEVBQ0EsSUFEQSwwQ0FFeEJiLG1EQUFVLENBQUNDLFlBRmEsRUFFRSxJQUZGLDBDQUd4QkQsbURBQVUsQ0FBQ3NDLFFBSGEsRUFHRixJQUhFLHlCQUEzQjs7QUFLQSxVQUNFaEQsS0FBSyxDQUFDaUQsZ0JBQU4sQ0FBdUJDLE1BQXZCLEtBQWtDLENBQWxDLElBQ0EsQ0FBQ0gscUJBQXFCLDBCQUFDLEtBQUtGLGVBQUwsRUFBRCwwREFBQyxzQkFBd0JwQyxJQUF6QixDQUZ4QixFQUdFO0FBQ0FSLGFBQUssR0FBR2tELDREQUFhLENBQUNsRCxLQUFELENBQXJCO0FBQ0Q7O0FBQ0RBLFdBQUssSUFBSSxLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUFUO0FBRUEsV0FBS1IsV0FBTCxDQUFpQjRELGVBQWpCLENBQWlDLEtBQUt2RCxNQUF0QyxFQUE4QyxLQUFLQyxLQUFuRDs7QUFFQSxVQUFJLENBQUMsS0FBS04sV0FBTCxDQUFpQjZELFFBQWpCLEVBQUwsRUFBa0M7QUFDaEMsYUFBS2hFLFdBQUwsQ0FBaUJpRSxrQkFBakI7QUFDQXJELGFBQUssR0FBRyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVI7QUFDRDs7QUFDRCxhQUFPQSxLQUFQO0FBQ0QsSyxDQUVEOzs7OzZDQUN5QkQsSyxFQUFPQyxLLEVBQU87QUFDckMsVUFBSSxLQUFLVCxXQUFMLENBQWlCNkQsUUFBakIsRUFBSixFQUFpQztBQUMvQixhQUFLN0QsV0FBTCxDQUFpQitELEdBQWpCO0FBQ0EsZUFBTyxLQUFLeEIsb0JBQUwsQ0FBMEIvQixLQUExQixFQUFpQ0MsS0FBakMsQ0FBUDtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUtaLFdBQUwsQ0FBaUJtRSxrQkFBakI7QUFDQSxlQUFPLEtBQUtsQyxnQkFBTCxDQUFzQnRCLEtBQXRCLEVBQTZCLEtBQUtrQyxVQUFMLENBQWdCakMsS0FBaEIsQ0FBN0IsQ0FBUDtBQUNEO0FBQ0Y7OztzQ0FFaUJELEssRUFBT0MsSyxFQUFPO0FBQzlCLGFBQU9BLEtBQUssR0FBRyxLQUFLUCxNQUFMLENBQVkrRCxHQUFaLENBQWdCekQsS0FBaEIsQ0FBUixHQUFpQyxHQUF4QztBQUNELEssQ0FFRDs7OztnQ0FDWUEsSyxFQUFPQyxLLEVBQU87QUFDeEJBLFdBQUssR0FBR2tELDREQUFhLENBQUNsRCxLQUFELENBQWIsR0FBdUIsS0FBS2tDLElBQUwsQ0FBVW5DLEtBQVYsQ0FBdkIsR0FBMEMsR0FBbEQ7O0FBRUEsVUFBSSxLQUFLUixXQUFMLENBQWlCNkQsUUFBakIsRUFBSixFQUFpQztBQUMvQixlQUFPcEQsS0FBUDtBQUNELE9BRkQsTUFFTyxJQUFJeUQsc0RBQU8sQ0FBQyxLQUFLOUQscUJBQU4sQ0FBWCxFQUF5QztBQUM5QyxlQUFPSyxLQUFQO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsZUFBTyxLQUFLaUMsVUFBTCxDQUFnQmpDLEtBQWhCLENBQVA7QUFDRDtBQUNGOzs7eUNBRW9CRCxLLEVBQU9DLEssRUFBTztBQUNqQyxhQUFPa0QsNERBQWEsQ0FBQ2xELEtBQUQsQ0FBYixHQUF1QixLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUF2QixHQUEwQyxHQUFqRDtBQUNEOzs7d0NBRW1CQSxLLEVBQU9DLEssRUFBTztBQUNoQyxhQUFPa0QsNERBQWEsQ0FBQ2xELEtBQUQsQ0FBYixHQUF1QixLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUE5QjtBQUNEOzs7cUNBRWdCQSxLLEVBQU9DLEssRUFBTztBQUM3QixhQUFPQSxLQUFLLEdBQUcsS0FBS2tDLElBQUwsQ0FBVW5DLEtBQVYsQ0FBUixHQUEyQixHQUFsQztBQUNEOzs7eUNBRW9CQSxLLEVBQU9DLEssRUFBTztBQUNqQyxXQUFLWixXQUFMLENBQWlCc0UsZ0JBQWpCO0FBQ0EsYUFBT1IsNERBQWEsQ0FBQ2xELEtBQUQsQ0FBYixHQUF1QixLQUFLa0MsSUFBTCxDQUFVbkMsS0FBVixDQUF2QixHQUEwQyxLQUFLNEQsTUFBTCxDQUFZLEtBQUt4RSxHQUFMLENBQVN5RSxtQkFBVCxJQUFnQyxDQUE1QyxDQUFqRDtBQUNELEssQ0FFRDs7OzsrQkFDc0I7QUFBQSxVQUFmcEQsSUFBZSxRQUFmQSxJQUFlO0FBQUEsVUFBVG9CLEtBQVMsUUFBVEEsS0FBUzs7QUFDcEIsVUFDRSxLQUFLekMsR0FBTCxDQUFTMEUsU0FBVCxLQUNDckQsSUFBSSxLQUFLQyxtREFBVSxDQUFDVyxRQUFwQixJQUNDWixJQUFJLEtBQUtDLG1EQUFVLENBQUNLLGtCQURyQixJQUVDTixJQUFJLEtBQUtDLG1EQUFVLENBQUNPLDRCQUZyQixJQUdDUixJQUFJLEtBQUtDLG1EQUFVLENBQUNTLGdCQUhyQixJQUlDVixJQUFJLEtBQUtDLG1EQUFVLENBQUNhLFVBSnJCLElBS0NkLElBQUksS0FBS0MsbURBQVUsQ0FBQ2UsV0FOdEIsQ0FERixFQVFFO0FBQ0EsZUFBT0ksS0FBSyxDQUFDa0MsV0FBTixFQUFQO0FBQ0QsT0FWRCxNQVVPO0FBQ0wsZUFBT2xDLEtBQVA7QUFDRDtBQUNGOzs7K0JBRVU1QixLLEVBQU87QUFDaEJBLFdBQUssR0FBR2tELDREQUFhLENBQUNsRCxLQUFELENBQXJCOztBQUNBLFVBQUksQ0FBQ0EsS0FBSyxDQUFDK0QsUUFBTixDQUFlLElBQWYsQ0FBTCxFQUEyQjtBQUN6Qi9ELGFBQUssSUFBSSxJQUFUO0FBQ0Q7O0FBQ0QsYUFBT0EsS0FBSyxHQUFHLEtBQUtaLFdBQUwsQ0FBaUJrRCxTQUFqQixFQUFmO0FBQ0Q7OztzQ0FFc0I7QUFBQSxVQUFQMEIsQ0FBTyx1RUFBSCxDQUFHO0FBQ3JCLGFBQU8sS0FBS3BFLE1BQUwsQ0FBWSxLQUFLQyxLQUFMLEdBQWFtRSxDQUF6QixDQUFQO0FBQ0Q7OztxQ0FFcUI7QUFBQSxVQUFQQSxDQUFPLHVFQUFILENBQUc7QUFDcEIsYUFBTyxLQUFLcEUsTUFBTCxDQUFZLEtBQUtDLEtBQUwsR0FBYW1FLENBQXpCLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelBIO0FBRUEsSUFBTUMscUJBQXFCLEdBQUcsV0FBOUI7QUFDQSxJQUFNQyx1QkFBdUIsR0FBRyxhQUFoQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ3FCN0UsVztBQUNuQjtBQUNGO0FBQ0E7QUFDRSx1QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLQSxNQUFMLEdBQWNBLE1BQU0sSUFBSSxJQUF4QjtBQUNBLFNBQUs2RSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7Z0NBQ2M7QUFDVixhQUFPLEtBQUs3RSxNQUFMLENBQVlxRSxNQUFaLENBQW1CLEtBQUtRLFdBQUwsQ0FBaUJsQixNQUFwQyxDQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7Ozs7dUNBQ3FCO0FBQ2pCLFdBQUtrQixXQUFMLENBQWlCQyxJQUFqQixDQUFzQkgscUJBQXRCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7Ozs7eUNBQ3VCO0FBQ25CLFdBQUtFLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCRix1QkFBdEI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7O3VDQUNxQjtBQUNqQixVQUFJLEtBQUtDLFdBQUwsQ0FBaUJsQixNQUFqQixHQUEwQixDQUExQixJQUErQm9CLG1EQUFJLENBQUMsS0FBS0YsV0FBTixDQUFKLEtBQTJCRixxQkFBOUQsRUFBcUY7QUFDbkYsYUFBS0UsV0FBTCxDQUFpQkcsR0FBakI7QUFDRDtBQUNGO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozt5Q0FDdUI7QUFDbkIsYUFBTyxLQUFLSCxXQUFMLENBQWlCbEIsTUFBakIsR0FBMEIsQ0FBakMsRUFBb0M7QUFDbEMsWUFBTXpDLElBQUksR0FBRyxLQUFLMkQsV0FBTCxDQUFpQkcsR0FBakIsRUFBYjs7QUFDQSxZQUFJOUQsSUFBSSxLQUFLeUQscUJBQWIsRUFBb0M7QUFDbEM7QUFDRDtBQUNGO0FBQ0Y7Ozt1Q0FFa0I7QUFDakIsV0FBS0UsV0FBTCxHQUFtQixFQUFuQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RUg7QUFFQSxJQUFNSSxpQkFBaUIsR0FBRyxFQUExQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUNxQi9FLFc7QUFDbkIseUJBQWM7QUFBQTs7QUFDWixTQUFLZ0YsS0FBTCxHQUFhLENBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7b0NBQ2tCNUUsTSxFQUFRQyxLLEVBQU87QUFDN0IsVUFBSSxLQUFLMkUsS0FBTCxLQUFlLENBQWYsSUFBb0IsS0FBS0MsYUFBTCxDQUFtQjdFLE1BQW5CLEVBQTJCQyxLQUEzQixDQUF4QixFQUEyRDtBQUN6RCxhQUFLMkUsS0FBTCxHQUFhLENBQWI7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLQSxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDekIsYUFBS0EsS0FBTDtBQUNELE9BRk0sTUFFQTtBQUNMLGFBQUtBLEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7OzBCQUNRO0FBQ0osV0FBS0EsS0FBTDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7K0JBQ2E7QUFDVCxhQUFPLEtBQUtBLEtBQUwsR0FBYSxDQUFwQjtBQUNELEssQ0FFRDtBQUNBOzs7O2tDQUNjNUUsTSxFQUFRQyxLLEVBQU87QUFDM0IsVUFBSW9ELE1BQU0sR0FBRyxDQUFiO0FBQ0EsVUFBSXVCLEtBQUssR0FBRyxDQUFaOztBQUVBLFdBQUssSUFBSUUsQ0FBQyxHQUFHN0UsS0FBYixFQUFvQjZFLENBQUMsR0FBRzlFLE1BQU0sQ0FBQ3FELE1BQS9CLEVBQXVDeUIsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxZQUFNM0UsS0FBSyxHQUFHSCxNQUFNLENBQUM4RSxDQUFELENBQXBCO0FBQ0F6QixjQUFNLElBQUlsRCxLQUFLLENBQUM2QixLQUFOLENBQVlxQixNQUF0QixDQUYwQyxDQUkxQzs7QUFDQSxZQUFJQSxNQUFNLEdBQUdzQixpQkFBYixFQUFnQztBQUM5QixpQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsWUFBSXhFLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDYSxVQUE5QixFQUEwQztBQUN4Q2tELGVBQUs7QUFDTixTQUZELE1BRU8sSUFBSXpFLEtBQUssQ0FBQ1MsSUFBTixLQUFlQyxtREFBVSxDQUFDZSxXQUE5QixFQUEyQztBQUNoRGdELGVBQUs7O0FBQ0wsY0FBSUEsS0FBSyxLQUFLLENBQWQsRUFBaUI7QUFDZixtQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJLEtBQUtHLGdCQUFMLENBQXNCNUUsS0FBdEIsQ0FBSixFQUFrQztBQUNoQyxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPLEtBQVA7QUFDRCxLLENBRUQ7QUFDQTs7OzsyQ0FDa0M7QUFBQSxVQUFmUyxJQUFlLFFBQWZBLElBQWU7QUFBQSxVQUFUb0IsS0FBUyxRQUFUQSxLQUFTO0FBQ2hDLGFBQ0VwQixJQUFJLEtBQUtDLG1EQUFVLENBQUNLLGtCQUFwQixJQUNBTixJQUFJLEtBQUtDLG1EQUFVLENBQUNTLGdCQURwQixJQUVBVixJQUFJLEtBQUtDLG1EQUFVLENBQUNtRSxPQUZwQixJQUdBcEUsSUFBSSxLQUFLQyxtREFBVSxDQUFDRyxhQUhwQixJQUlBZ0IsS0FBSyxLQUFLLEdBTFo7QUFPRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Rkg7QUFDQTtBQUNBO0lBQ3FCbEMsTTtBQUNuQjtBQUNGO0FBQ0E7QUFDRSxrQkFBWUQsTUFBWixFQUFvQjtBQUFBOztBQUNsQixTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLSSxLQUFMLEdBQWEsQ0FBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzhCQUNzQjtBQUFBLFVBQWRnRixHQUFjLFFBQWRBLEdBQWM7QUFBQSxVQUFUakQsS0FBUyxRQUFUQSxLQUFTOztBQUNsQixVQUFJLENBQUMsS0FBS25DLE1BQVYsRUFBa0I7QUFDaEIsZUFBT21DLEtBQVA7QUFDRDs7QUFDRCxVQUFJaUQsR0FBSixFQUFTO0FBQ1AsZUFBTyxLQUFLcEYsTUFBTCxDQUFZb0YsR0FBWixDQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFLcEYsTUFBTCxDQUFZLEtBQUtJLEtBQUwsRUFBWixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JIO0FBQ0E7QUFDQTs7SUFFcUJpRixTO0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZM0YsR0FBWixFQUFpQjtBQUFBOztBQUNmLFNBQUs0RixnQkFBTCxHQUF3Qix5RUFBeEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLHVKQUFwQjtBQUVBLFNBQUtDLGNBQUwsR0FBc0JDLGlFQUFBLDhCQUNoQi9GLEdBQUcsQ0FBQ2dHLFNBQUosSUFBaUIsRUFERCxJQUVwQixJQUZvQixFQUdwQixJQUhvQixFQUlwQixJQUpvQixFQUtwQixJQUxvQixFQU1wQixJQU5vQixFQU9wQixJQVBvQixFQVFwQixJQVJvQixFQVNwQixJQVRvQixFQVVwQixJQVZvQixHQUF0QjtBQWFBLFNBQUtDLG1CQUFMLEdBQTJCLHFDQUEzQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCSCxvRUFBQSxDQUFvQy9GLEdBQUcsQ0FBQ21HLGdCQUF4QyxDQUExQjtBQUVBLFNBQUtDLHdCQUFMLEdBQWdDTCxxRUFBQSxDQUFxQy9GLEdBQUcsQ0FBQ3FHLHFCQUF6QyxDQUFoQztBQUNBLFNBQUtDLGtDQUFMLEdBQTBDUCxxRUFBQSxDQUN4Qy9GLEdBQUcsQ0FBQ3VHLDZCQURvQyxDQUExQztBQUdBLFNBQUtDLHNCQUFMLEdBQThCVCxxRUFBQSxDQUFxQy9GLEdBQUcsQ0FBQ3lHLG9CQUF6QyxDQUE5QjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCWCxxRUFBQSxDQUFxQy9GLEdBQUcsQ0FBQzJHLGFBQXpDLENBQTVCO0FBRUEsU0FBS0MsVUFBTCxHQUFrQmIsNkRBQUEsQ0FBNkIvRixHQUFHLENBQUM2RyxnQkFBakMsQ0FBbEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CZiwrREFBQSxDQUErQi9GLEdBQUcsQ0FBQytHLFdBQW5DLENBQXBCO0FBRUEsU0FBS0MsZ0JBQUwsR0FBd0JqQiw4REFBQSxDQUE4Qi9GLEdBQUcsQ0FBQ2lILFVBQWxDLENBQXhCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJuQiw4REFBQSxDQUE4Qi9GLEdBQUcsQ0FBQ21ILFdBQWxDLENBQXpCO0FBRUEsU0FBS0MseUJBQUwsR0FBaUNyQixvRUFBQSxDQUMvQi9GLEdBQUcsQ0FBQ3FILHVCQUQyQixFQUUvQixRQUYrQixDQUFqQztBQUlBLFNBQUtDLDZCQUFMLEdBQXFDdkIsb0VBQUEsQ0FDbkMvRixHQUFHLENBQUN1SCxxQkFEK0IsRUFFbkMsaUJBRm1DLENBQXJDO0FBSUEsU0FBS0MsOEJBQUwsR0FBc0N6QixvRUFBQSxDQUNwQy9GLEdBQUcsQ0FBQ3VILHFCQURnQyxFQUVwQ3hCLGlFQUFBLENBQWlDL0YsR0FBRyxDQUFDK0csV0FBckMsQ0FGb0MsQ0FBdEM7QUFJRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs2QkFDV1UsSyxFQUFPO0FBQ2QsVUFBTWhILE1BQU0sR0FBRyxFQUFmO0FBQ0EsVUFBSUcsS0FBSixDQUZjLENBSWQ7O0FBQ0EsYUFBTzZHLEtBQUssQ0FBQzNELE1BQWIsRUFBcUI7QUFDbkI7QUFDQSxZQUFNRCxnQkFBZ0IsR0FBRyxLQUFLNkQsYUFBTCxDQUFtQkQsS0FBbkIsQ0FBekI7QUFDQUEsYUFBSyxHQUFHQSxLQUFLLENBQUNFLFNBQU4sQ0FBZ0I5RCxnQkFBZ0IsQ0FBQ0MsTUFBakMsQ0FBUjs7QUFFQSxZQUFJMkQsS0FBSyxDQUFDM0QsTUFBVixFQUFrQjtBQUNoQjtBQUNBbEQsZUFBSyxHQUFHLEtBQUtnSCxZQUFMLENBQWtCSCxLQUFsQixFQUF5QjdHLEtBQXpCLENBQVIsQ0FGZ0IsQ0FHaEI7O0FBQ0E2RyxlQUFLLEdBQUdBLEtBQUssQ0FBQ0UsU0FBTixDQUFnQi9HLEtBQUssQ0FBQzZCLEtBQU4sQ0FBWXFCLE1BQTVCLENBQVI7QUFFQXJELGdCQUFNLENBQUN3RSxJQUFQLGlDQUFpQnJFLEtBQWpCO0FBQXdCaUQsNEJBQWdCLEVBQWhCQTtBQUF4QjtBQUNEO0FBQ0Y7O0FBQ0QsYUFBT3BELE1BQVA7QUFDRDs7O2tDQUVhZ0gsSyxFQUFPO0FBQ25CLFVBQU1JLE9BQU8sR0FBR0osS0FBSyxDQUFDSyxLQUFOLENBQVksS0FBS2xDLGdCQUFqQixDQUFoQjtBQUNBLGFBQU9pQyxPQUFPLEdBQUdBLE9BQU8sQ0FBQyxDQUFELENBQVYsR0FBZ0IsRUFBOUI7QUFDRDs7O2lDQUVZSixLLEVBQU9NLGEsRUFBZTtBQUNqQyxhQUNFLEtBQUtDLGVBQUwsQ0FBcUJQLEtBQXJCLEtBQ0EsS0FBS1EsY0FBTCxDQUFvQlIsS0FBcEIsQ0FEQSxJQUVBLEtBQUtTLGlCQUFMLENBQXVCVCxLQUF2QixDQUZBLElBR0EsS0FBS1Usa0JBQUwsQ0FBd0JWLEtBQXhCLENBSEEsSUFJQSxLQUFLVyxtQkFBTCxDQUF5QlgsS0FBekIsQ0FKQSxJQUtBLEtBQUtZLGNBQUwsQ0FBb0JaLEtBQXBCLENBTEEsSUFNQSxLQUFLYSxvQkFBTCxDQUEwQmIsS0FBMUIsRUFBaUNNLGFBQWpDLENBTkEsSUFPQSxLQUFLUSxZQUFMLENBQWtCZCxLQUFsQixDQVBBLElBUUEsS0FBS2UsZ0JBQUwsQ0FBc0JmLEtBQXRCLENBVEY7QUFXRDs7O29DQUVlQSxLLEVBQU87QUFDckIsYUFBTyxLQUFLZ0IsbUJBQUwsQ0FBeUJoQixLQUF6QixLQUFtQyxLQUFLaUIsb0JBQUwsQ0FBMEJqQixLQUExQixDQUExQztBQUNEOzs7d0NBRW1CQSxLLEVBQU87QUFDekIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDQyxZQUZjO0FBRy9CcUgsYUFBSyxFQUFFLEtBQUsxQztBQUhtQixPQUExQixDQUFQO0FBS0Q7Ozt5Q0FFb0J1QixLLEVBQU87QUFDMUIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDRyxhQUZjO0FBRy9CbUgsYUFBSyxFQUFFLEtBQUszQztBQUhtQixPQUExQixDQUFQO0FBS0Q7OzttQ0FFY3dCLEssRUFBTztBQUNwQixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JwRyxZQUFJLEVBQUVDLG1EQUFVLENBQUN1SCxNQUZjO0FBRy9CRCxhQUFLLEVBQUUsS0FBSzlCO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3NDQUVpQlcsSyxFQUFPO0FBQ3ZCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ2EsVUFGYztBQUcvQnlHLGFBQUssRUFBRSxLQUFLNUI7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7dUNBRWtCUyxLLEVBQU87QUFDeEIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDZSxXQUZjO0FBRy9CdUcsYUFBSyxFQUFFLEtBQUsxQjtBQUhtQixPQUExQixDQUFQO0FBS0Q7Ozt3Q0FFbUJPLEssRUFBTztBQUN6QixhQUNFLEtBQUtxQiw2QkFBTCxDQUFtQ3JCLEtBQW5DLEtBQ0EsS0FBS3NCLDhCQUFMLENBQW9DdEIsS0FBcEMsQ0FEQSxJQUVBLEtBQUt1QiwwQkFBTCxDQUFnQ3ZCLEtBQWhDLENBSEY7QUFLRDs7O2tEQUU2QkEsSyxFQUFPO0FBQ25DLGFBQU8sS0FBS3dCLDBCQUFMLENBQWdDO0FBQ3JDeEIsYUFBSyxFQUFMQSxLQURxQztBQUVyQ21CLGFBQUssRUFBRSxLQUFLdEIsNkJBRnlCO0FBR3JDNEIsZ0JBQVEsRUFBRSxrQkFBQ0MsQ0FBRDtBQUFBLGlCQUFPQSxDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFSLENBQVA7QUFBQTtBQUgyQixPQUFoQyxDQUFQO0FBS0Q7OzttREFFOEIzQixLLEVBQU87QUFBQTs7QUFDcEMsYUFBTyxLQUFLd0IsMEJBQUwsQ0FBZ0M7QUFDckN4QixhQUFLLEVBQUxBLEtBRHFDO0FBRXJDbUIsYUFBSyxFQUFFLEtBQUtwQiw4QkFGeUI7QUFHckMwQixnQkFBUSxFQUFFLGtCQUFDQyxDQUFEO0FBQUEsaUJBQ1IsS0FBSSxDQUFDRSx3QkFBTCxDQUE4QjtBQUFFM0QsZUFBRyxFQUFFeUQsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBUixFQUFXLENBQUMsQ0FBWixDQUFQO0FBQXVCRSxxQkFBUyxFQUFFSCxDQUFDLENBQUNDLEtBQUYsQ0FBUSxDQUFDLENBQVQ7QUFBbEMsV0FBOUIsQ0FEUTtBQUFBO0FBSDJCLE9BQWhDLENBQVA7QUFNRDs7OytDQUUwQjNCLEssRUFBTztBQUNoQyxhQUFPLEtBQUt3QiwwQkFBTCxDQUFnQztBQUNyQ3hCLGFBQUssRUFBTEEsS0FEcUM7QUFFckNtQixhQUFLLEVBQUUsS0FBS3hCLHlCQUZ5QjtBQUdyQzhCLGdCQUFRLEVBQUUsa0JBQUNDLENBQUQ7QUFBQSxpQkFBT0EsQ0FBQyxDQUFDQyxLQUFGLENBQVEsQ0FBUixDQUFQO0FBQUE7QUFIMkIsT0FBaEMsQ0FBUDtBQUtEOzs7cURBRXNEO0FBQUEsVUFBMUIzQixLQUEwQixRQUExQkEsS0FBMEI7QUFBQSxVQUFuQm1CLEtBQW1CLFFBQW5CQSxLQUFtQjtBQUFBLFVBQVpNLFFBQVksUUFBWkEsUUFBWTtBQUNyRCxVQUFNdEksS0FBSyxHQUFHLEtBQUsrSCxvQkFBTCxDQUEwQjtBQUFFbEIsYUFBSyxFQUFMQSxLQUFGO0FBQVNtQixhQUFLLEVBQUxBLEtBQVQ7QUFBZ0J2SCxZQUFJLEVBQUVDLG1EQUFVLENBQUNpQjtBQUFqQyxPQUExQixDQUFkOztBQUNBLFVBQUkzQixLQUFKLEVBQVc7QUFDVEEsYUFBSyxDQUFDOEUsR0FBTixHQUFZd0QsUUFBUSxDQUFDdEksS0FBSyxDQUFDNkIsS0FBUCxDQUFwQjtBQUNEOztBQUNELGFBQU83QixLQUFQO0FBQ0Q7OztvREFFNEM7QUFBQSxVQUFsQjhFLEdBQWtCLFNBQWxCQSxHQUFrQjtBQUFBLFVBQWI0RCxTQUFhLFNBQWJBLFNBQWE7QUFDM0MsYUFBTzVELEdBQUcsQ0FBQ3hDLE9BQUosQ0FBWSxJQUFJcUcsTUFBSixDQUFXQywyREFBWSxDQUFDLE9BQU9GLFNBQVIsQ0FBdkIsRUFBMkMsSUFBM0MsQ0FBWixFQUE4REEsU0FBOUQsQ0FBUDtBQUNELEssQ0FFRDs7OzttQ0FDZTdCLEssRUFBTztBQUNwQixhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JwRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNtSSxNQUZjO0FBRy9CYixhQUFLLEVBQUUsS0FBSy9DO0FBSG1CLE9BQTFCLENBQVA7QUFLRCxLLENBRUQ7Ozs7cUNBQ2lCNEIsSyxFQUFPO0FBQ3RCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ3NDLFFBRmM7QUFHL0JnRixhQUFLLEVBQUUsS0FBSzlDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3lDQUVvQjJCLEssRUFBT00sYSxFQUFlO0FBQ3pDO0FBQ0E7QUFDQSxVQUFJQSxhQUFhLElBQUlBLGFBQWEsQ0FBQ3RGLEtBQS9CLElBQXdDc0YsYUFBYSxDQUFDdEYsS0FBZCxLQUF3QixHQUFwRSxFQUF5RTtBQUN2RSxlQUFPaUgsU0FBUDtBQUNEOztBQUNELGFBQ0UsS0FBS0Msd0JBQUwsQ0FBOEJsQyxLQUE5QixLQUNBLEtBQUttQyx1QkFBTCxDQUE2Qm5DLEtBQTdCLENBREEsSUFFQSxLQUFLb0MsZ0NBQUwsQ0FBc0NwQyxLQUF0QyxDQUZBLElBR0EsS0FBS3FDLHFCQUFMLENBQTJCckMsS0FBM0IsQ0FKRjtBQU1EOzs7NkNBRXdCQSxLLEVBQU87QUFDOUIsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDSyxrQkFGYztBQUcvQmlILGFBQUssRUFBRSxLQUFLeEM7QUFIbUIsT0FBMUIsQ0FBUDtBQUtEOzs7NENBRXVCcUIsSyxFQUFPO0FBQzdCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ1MsZ0JBRmM7QUFHL0I2RyxhQUFLLEVBQUUsS0FBS3BDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O3FEQUVnQ2lCLEssRUFBTztBQUN0QyxhQUFPLEtBQUtrQixvQkFBTCxDQUEwQjtBQUMvQmxCLGFBQUssRUFBTEEsS0FEK0I7QUFFL0JwRyxZQUFJLEVBQUVDLG1EQUFVLENBQUNPLDRCQUZjO0FBRy9CK0csYUFBSyxFQUFFLEtBQUt0QztBQUhtQixPQUExQixDQUFQO0FBS0Q7OzswQ0FFcUJtQixLLEVBQU87QUFDM0IsYUFBTyxLQUFLa0Isb0JBQUwsQ0FBMEI7QUFDL0JsQixhQUFLLEVBQUxBLEtBRCtCO0FBRS9CcEcsWUFBSSxFQUFFQyxtREFBVSxDQUFDVyxRQUZjO0FBRy9CMkcsYUFBSyxFQUFFLEtBQUtsQztBQUhtQixPQUExQixDQUFQO0FBS0Q7OztpQ0FFWWUsSyxFQUFPO0FBQ2xCLGFBQU8sS0FBS2tCLG9CQUFMLENBQTBCO0FBQy9CbEIsYUFBSyxFQUFMQSxLQUQrQjtBQUUvQnBHLFlBQUksRUFBRUMsbURBQVUsQ0FBQ3lJLElBRmM7QUFHL0JuQixhQUFLLEVBQUUsS0FBS2hDO0FBSG1CLE9BQTFCLENBQVA7QUFLRDs7O2dEQUU0QztBQUFBLFVBQXRCYSxLQUFzQixTQUF0QkEsS0FBc0I7QUFBQSxVQUFmcEcsSUFBZSxTQUFmQSxJQUFlO0FBQUEsVUFBVHVILEtBQVMsU0FBVEEsS0FBUztBQUMzQyxVQUFNZixPQUFPLEdBQUdKLEtBQUssQ0FBQ0ssS0FBTixDQUFZYyxLQUFaLENBQWhCO0FBRUEsYUFBT2YsT0FBTyxHQUFHO0FBQUV4RyxZQUFJLEVBQUpBLElBQUY7QUFBUW9CLGFBQUssRUFBRW9GLE9BQU8sQ0FBQyxDQUFEO0FBQXRCLE9BQUgsR0FBaUM2QixTQUEvQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzUkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLFNBQVNNLG1CQUFULENBQTZCQyxvQkFBN0IsRUFBbUQ7QUFDeEQsU0FBTyxJQUFJVixNQUFKLGFBQ0FXLCtEQUFnQixDQUFDRCxvQkFBRCxDQUFoQixDQUF1Q0UsR0FBdkMsQ0FBMkNYLG1EQUEzQyxFQUF5RFksSUFBekQsQ0FBOEQsR0FBOUQsQ0FEQSxVQUVMLEdBRkssQ0FBUDtBQUlEO0FBRU0sU0FBU0Msc0JBQVQsQ0FBZ0NsRSxnQkFBaEMsRUFBa0Q7QUFDdkQsU0FBTyxJQUFJb0QsTUFBSixnQkFDR3BELGdCQUFnQixDQUFDZ0UsR0FBakIsQ0FBcUIsVUFBQ0csQ0FBRDtBQUFBLFdBQU9kLDJEQUFZLENBQUNjLENBQUQsQ0FBbkI7QUFBQSxHQUFyQixFQUE2Q0YsSUFBN0MsQ0FBa0QsR0FBbEQsQ0FESCw0QkFFTCxHQUZLLENBQVA7QUFJRDtBQUVNLFNBQVNHLHVCQUFULENBQWlDNUQsYUFBakMsRUFBZ0Q7QUFDckQsTUFBSUEsYUFBYSxDQUFDN0MsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM5QixXQUFPLElBQUl5RixNQUFKLFNBQW1CLEdBQW5CLENBQVA7QUFDRDs7QUFDRCxNQUFNaUIsb0JBQW9CLEdBQUdOLCtEQUFnQixDQUFDdkQsYUFBRCxDQUFoQixDQUFnQ3lELElBQWhDLENBQXFDLEdBQXJDLEVBQTBDbEgsT0FBMUMsQ0FBa0QsSUFBbEQsRUFBeUQsTUFBekQsQ0FBN0I7QUFDQSxTQUFPLElBQUlxRyxNQUFKLGFBQWdCaUIsb0JBQWhCLFdBQTRDLElBQTVDLENBQVA7QUFDRDtBQUVNLFNBQVNDLGVBQVQsR0FBNEM7QUFBQSxNQUFuQkMsWUFBbUIsdUVBQUosRUFBSTtBQUNqRCxTQUFPLElBQUluQixNQUFKLG9HQUN1Rm1CLFlBQVksQ0FBQ04sSUFBYixDQUMxRixFQUQwRixDQUR2RixVQUlMLEdBSkssQ0FBUDtBQU1EO0FBRU0sU0FBU08saUJBQVQsQ0FBMkI1RCxXQUEzQixFQUF3QztBQUM3QyxTQUFPLElBQUl3QyxNQUFKLENBQVcsT0FBT3FCLG1CQUFtQixDQUFDN0QsV0FBRCxDQUExQixHQUEwQyxHQUFyRCxFQUEwRCxHQUExRCxDQUFQO0FBQ0QsQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxTQUFTNkQsbUJBQVQsQ0FBNkI3RCxXQUE3QixFQUEwQztBQUMvQyxNQUFNOEQsUUFBUSxHQUFHO0FBQ2YsVUFBTSxrQkFEUztBQUVmLFVBQU0sd0JBRlM7QUFHZixVQUFNLDJDQUhTO0FBSWYsVUFBTSx5Q0FKUztBQUtmLFVBQU0seUNBTFM7QUFNZixXQUFPLDRDQU5RO0FBT2YsWUFBUSwyQ0FQTztBQVFmLFlBQVEsMkNBUk87QUFTZkMsTUFBRSxFQUFFO0FBVFcsR0FBakI7QUFZQSxTQUFPL0QsV0FBVyxDQUFDb0QsR0FBWixDQUFnQixVQUFDWSxDQUFEO0FBQUEsV0FBT0YsUUFBUSxDQUFDRSxDQUFELENBQWY7QUFBQSxHQUFoQixFQUFvQ1gsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBUDtBQUNEO0FBRU0sU0FBU1ksZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO0FBQ3ZDLFNBQU8sSUFBSTFCLE1BQUosQ0FBVyxPQUFPMEIsTUFBTSxDQUFDZCxHQUFQLENBQVdlLFdBQVgsRUFBd0JkLElBQXhCLENBQTZCLEdBQTdCLENBQVAsR0FBMkMsR0FBdEQsRUFBMkQsSUFBM0QsQ0FBUDtBQUNEOztBQUVELFNBQVNjLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQUlBLEtBQUssQ0FBQ3JILE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEI7QUFDQSxXQUFPMEYsMkRBQVksQ0FBQzJCLEtBQUQsQ0FBbkI7QUFDRCxHQUhELE1BR087QUFDTDtBQUNBLFdBQU8sUUFBUUEsS0FBUixHQUFnQixLQUF2QjtBQUNEO0FBQ0Y7O0FBRU0sU0FBU0Msc0JBQVQsQ0FBZ0NDLEtBQWhDLEVBQXVDQyxPQUF2QyxFQUFnRDtBQUNyRCxNQUFJQyxzREFBTyxDQUFDRixLQUFELENBQVgsRUFBb0I7QUFDbEIsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsTUFBTUcsVUFBVSxHQUFHSCxLQUFLLENBQUNsQixHQUFOLENBQVVYLG1EQUFWLEVBQXdCWSxJQUF4QixDQUE2QixHQUE3QixDQUFuQjtBQUVBLFNBQU8sSUFBSWIsTUFBSixnQkFBbUJpQyxVQUFuQixpQkFBb0NGLE9BQXBDLFNBQWlELEdBQWpELENBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNuRkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUEsSUFBTUcsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ3BLLElBQUQsRUFBT3VILEtBQVA7QUFBQSxTQUFpQixVQUFDaEksS0FBRDtBQUFBLFdBQVcsQ0FBQUEsS0FBSyxTQUFMLElBQUFBLEtBQUssV0FBTCxZQUFBQSxLQUFLLENBQUVTLElBQVAsTUFBZ0JBLElBQWhCLElBQXdCdUgsS0FBSyxDQUFDOEMsSUFBTixDQUFXOUssS0FBWCxhQUFXQSxLQUFYLHVCQUFXQSxLQUFLLENBQUU2QixLQUFsQixDQUFuQztBQUFBLEdBQWpCO0FBQUEsQ0FBaEI7O0FBRU8sSUFBTWMsS0FBSyxHQUFHa0ksT0FBTyxDQUFDbkssbURBQVUsQ0FBQ1MsZ0JBQVosRUFBOEIsUUFBOUIsQ0FBckI7QUFFQSxJQUFNeUIsU0FBUyxHQUFHaUksT0FBTyxDQUFDbkssbURBQVUsQ0FBQ1csUUFBWixFQUFzQixZQUF0QixDQUF6QjtBQUVBLElBQU1xQyxPQUFPLEdBQUdtSCxPQUFPLENBQUNuSyxtREFBVSxDQUFDSyxrQkFBWixFQUFnQyxVQUFoQyxDQUF2QjtBQUVBLElBQU1nSyxLQUFLLEdBQUdGLE9BQU8sQ0FBQ25LLG1EQUFVLENBQUNLLGtCQUFaLEVBQWdDLGdCQUFoQyxDQUFyQjtBQUVBLElBQU1pSyxJQUFJLEdBQUdILE9BQU8sQ0FBQ25LLG1EQUFVLENBQUNXLFFBQVosRUFBc0IsT0FBdEIsQ0FBcEI7QUFFQSxJQUFNNEosUUFBUSxHQUFHSixPQUFPLENBQUNuSyxtREFBVSxDQUFDSyxrQkFBWixFQUFnQyxXQUFoQyxDQUF4QjtBQUVBLElBQU1tSyxLQUFLLEdBQUdMLE9BQU8sQ0FBQ25LLG1EQUFVLENBQUNlLFdBQVosRUFBeUIsUUFBekIsQ0FBckIsQzs7Ozs7Ozs7Ozs7O0FDaEJQO0FBQUE7QUFDQTtBQUNBO0FBQ2U7QUFDYjBILE1BQUksRUFBRSxNQURPO0FBRWJsQixRQUFNLEVBQUUsUUFGSztBQUdiNUcsVUFBUSxFQUFFLFVBSEc7QUFJYk4sb0JBQWtCLEVBQUUsb0JBSlA7QUFLYkUsOEJBQTRCLEVBQUUsOEJBTGpCO0FBTWJFLGtCQUFnQixFQUFFLGtCQU5MO0FBT2I2QixVQUFRLEVBQUUsVUFQRztBQVFiekIsWUFBVSxFQUFFLFlBUkM7QUFTYkUsYUFBVyxFQUFFLGFBVEE7QUFVYmQsY0FBWSxFQUFFLGNBVkQ7QUFXYkUsZUFBYSxFQUFFLGVBWEY7QUFZYmdJLFFBQU0sRUFBRSxRQVpLO0FBYWJsSCxhQUFXLEVBQUU7QUFiQSxDQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUVBLElBQU1vRSxhQUFhLEdBQUcsQ0FDcEIsS0FEb0IsRUFFcEIsVUFGb0IsRUFHcEIsT0FIb0IsRUFJcEIsS0FKb0IsRUFLcEIsVUFMb0IsRUFNcEIsT0FOb0IsRUFPcEIsT0FQb0IsRUFRcEIsS0FSb0IsRUFTcEIsS0FUb0IsRUFVcEIsT0FWb0IsRUFXcEIsSUFYb0IsRUFZcEIsS0Fab0IsRUFhcEIsWUFib0IsRUFjcEIsV0Fkb0IsRUFlcEIsU0Fmb0IsRUFnQnBCLFlBaEJvQixFQWlCcEIsSUFqQm9CLEVBa0JwQixRQWxCb0IsRUFtQnBCLFlBbkJvQixFQW9CcEIsT0FwQm9CLEVBcUJwQixlQXJCb0IsRUFzQnBCLEtBdEJvQixFQXVCcEIsV0F2Qm9CLEVBd0JwQixLQXhCb0IsRUF5QnBCLFFBekJvQixFQTBCcEIsT0ExQm9CLEVBMkJwQixTQTNCb0IsRUE0QnBCLFFBNUJvQixFQTZCcEIsUUE3Qm9CLEVBOEJwQixNQTlCb0IsRUErQnBCLFNBL0JvQixFQWdDcEIsTUFoQ29CLEVBaUNwQixZQWpDb0IsRUFrQ3BCLElBbENvQixFQW1DcEIsT0FuQ29CLEVBb0NwQixNQXBDb0IsRUFxQ3BCLFFBckNvQixFQXNDcEIsU0F0Q29CLEVBdUNwQixhQXZDb0IsRUF3Q3BCLFVBeENvQixFQXlDcEIsTUF6Q29CLEVBMENwQixNQTFDb0IsRUEyQ3BCLE9BM0NvQixFQTRDcEIsTUE1Q29CLEVBNkNwQixTQTdDb0IsRUE4Q3BCLE1BOUNvQixFQStDcEIsV0EvQ29CLEVBZ0RwQixrQkFoRG9CLEVBaURwQixhQWpEb0IsRUFrRHBCLE9BbERvQixFQW1EcEIsTUFuRG9CLEVBb0RwQixPQXBEb0IsRUFxRHBCLE9BckRvQixFQXNEcEIsU0F0RG9CLEVBdURwQixVQXZEb0IsRUF3RHBCLFNBeERvQixFQXlEcEIsU0F6RG9CLEVBMERwQixZQTFEb0IsRUEyRHBCLFFBM0RvQixFQTREcEIsUUE1RG9CLEVBNkRwQixTQTdEb0IsRUE4RHBCLFFBOURvQixFQStEcEIsUUEvRG9CLEVBZ0VwQixXQWhFb0IsRUFpRXBCLFNBakVvQixFQWtFcEIsWUFsRW9CLEVBbUVwQixZQW5Fb0IsRUFvRXBCLFVBcEVvQixFQXFFcEIsVUFyRW9CLEVBc0VwQixTQXRFb0IsRUF1RXBCLE1BdkVvQixFQXdFcEIsZUF4RW9CLEVBeUVwQixPQXpFb0IsRUEwRXBCLFdBMUVvQixFQTJFcEIsV0EzRW9CLEVBNEVwQixZQTVFb0IsRUE2RXBCLFFBN0VvQixFQThFcEIsT0E5RW9CLEVBK0VwQixNQS9Fb0IsRUFnRnBCLFdBaEZvQixFQWlGcEIsU0FqRm9CLEVBa0ZwQixjQWxGb0IsRUFtRnBCLGlDQW5Gb0IsRUFvRnBCLGtCQXBGb0IsRUFxRnBCLGNBckZvQixFQXNGcEIsY0F0Rm9CLEVBdUZwQixnQkF2Rm9CLEVBd0ZwQixnQkF4Rm9CLEVBeUZwQixjQXpGb0IsRUEwRnBCLG1CQTFGb0IsRUEyRnBCLGtCQTNGb0IsRUE0RnBCLGtDQTVGb0IsRUE2RnBCLGNBN0ZvQixFQThGcEIsUUE5Rm9CLEVBK0ZwQixPQS9Gb0IsRUFnR3BCLE1BaEdvQixFQWlHcEIsVUFqR29CLEVBa0dwQixtQkFsR29CLEVBbUdwQixrQkFuR29CLEVBb0dwQixNQXBHb0IsRUFxR3BCLEtBckdvQixFQXNHcEIsTUF0R29CLEVBdUdwQixZQXZHb0IsRUF3R3BCLFVBeEdvQixFQXlHcEIsUUF6R29CLEVBMEdwQixRQTFHb0IsRUEyR3BCLGlCQTNHb0IsRUE0R3BCLGdCQTVHb0IsRUE2R3BCLFlBN0dvQixFQThHcEIsS0E5R29CLEVBK0dwQixTQS9Hb0IsRUFnSHBCLFNBaEhvQixFQWlIcEIsU0FqSG9CLEVBa0hwQixVQWxIb0IsRUFtSHBCLFlBbkhvQixFQW9IcEIsUUFwSG9CLEVBcUhwQixXQXJIb0IsRUFzSHBCLFlBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixVQXhIb0IsRUF5SHBCLFlBekhvQixFQTBIcEIsZUExSG9CLEVBMkhwQixhQTNIb0IsRUE0SHBCLFNBNUhvQixFQTZIcEIsVUE3SG9CLEVBOEhwQixZQTlIb0IsRUErSHBCLFVBL0hvQixFQWdJcEIsSUFoSW9CLEVBaUlwQixVQWpJb0IsRUFrSXBCLFFBbElvQixFQW1JcEIsTUFuSW9CLEVBb0lwQixRQXBJb0IsRUFxSXBCLFNBcklvQixFQXNJcEIsTUF0SW9CLEVBdUlwQixVQXZJb0IsRUF3SXBCLFNBeElvQixFQXlJcEIsTUF6SW9CLEVBMElwQixRQTFJb0IsRUEySXBCLFFBM0lvQixFQTRJcEIsVUE1SW9CLEVBNklwQixZQTdJb0IsRUE4SXBCLEtBOUlvQixFQStJcEIsVUEvSW9CLEVBZ0pwQixRQWhKb0IsRUFpSnBCLE9BakpvQixFQWtKcEIsUUFsSm9CLEVBbUpwQixPQW5Kb0IsRUFvSnBCLFdBcEpvQixFQXFKcEIsV0FySm9CLEVBc0pwQixXQXRKb0IsRUF1SnBCLE1BdkpvQixFQXdKcEIsU0F4Sm9CLEVBeUpwQixRQXpKb0IsRUEwSnBCLE1BMUpvQixFQTJKcEIsS0EzSm9CLEVBNEpwQixTQTVKb0IsRUE2SnBCLFVBN0pvQixFQThKcEIsVUE5Sm9CLEVBK0pwQixTQS9Kb0IsRUFnS3BCLE9BaEtvQixFQWlLcEIsUUFqS29CLEVBa0twQixPQWxLb0IsRUFtS3BCLFdBbktvQixFQW9LcEIsTUFwS29CLEVBcUtwQixRQXJLb0IsRUFzS3BCLE9BdEtvQixFQXVLcEIsT0F2S29CLEVBd0twQixPQXhLb0IsRUF5S3BCLE9BektvQixFQTBLcEIsS0ExS29CLEVBMktwQixTQTNLb0IsRUE0S3BCLE1BNUtvQixFQTZLcEIsTUE3S29CLEVBOEtwQixVQTlLb0IsRUErS3BCLFFBL0tvQixFQWdMcEIsU0FoTG9CLEVBaUxwQixXQWpMb0IsRUFrTHBCLEtBbExvQixFQW1McEIsUUFuTG9CLEVBb0xwQixNQXBMb0IsRUFxTHBCLE9BckxvQixFQXNMcEIsU0F0TG9CLEVBdUxwQixPQXZMb0IsRUF3THBCLFVBeExvQixFQXlMcEIsU0F6TG9CLEVBMExwQixNQTFMb0IsRUEyTHBCLGNBM0xvQixFQTRMcEIsTUE1TG9CLEVBNkxwQixNQTdMb0IsRUE4THBCLE1BOUxvQixFQStMcEIsT0EvTG9CLEVBZ01wQixVQWhNb0IsRUFpTXBCLElBak1vQixFQWtNcEIsV0FsTW9CLEVBbU1wQixJQW5Nb0IsRUFvTXBCLFdBcE1vQixFQXFNcEIsV0FyTW9CLEVBc01wQixXQXRNb0IsRUF1TXBCLE9Bdk1vQixFQXdNcEIsV0F4TW9CLEVBeU1wQixZQXpNb0IsRUEwTXBCLEtBMU1vQixFQTJNcEIsVUEzTW9CLEVBNE1wQixTQTVNb0IsRUE2TXBCLE9BN01vQixFQThNcEIsT0E5TW9CLEVBK01wQixhQS9Nb0IsRUFnTnBCLFFBaE5vQixFQWlOcEIsS0FqTm9CLEVBa05wQixTQWxOb0IsRUFtTnBCLFdBbk5vQixFQW9OcEIsY0FwTm9CLEVBcU5wQixVQXJOb0IsRUFzTnBCLE1BdE5vQixFQXVOcEIsSUF2Tm9CLEVBd05wQixRQXhOb0IsRUF5TnBCLFdBek5vQixFQTBOcEIsU0ExTm9CLEVBMk5wQixLQTNOb0IsRUE0TnBCLE1BNU5vQixFQTZOcEIsTUE3Tm9CLEVBOE5wQixLQTlOb0IsRUErTnBCLE9BL05vQixFQWdPcEIsVUFoT29CLEVBaU9wQixPQWpPb0IsRUFrT3BCLFNBbE9vQixFQW1PcEIsVUFuT29CLEVBb09wQixTQXBPb0IsRUFxT3BCLE9Bck9vQixFQXNPcEIsTUF0T29CLEVBdU9wQixNQXZPb0IsRUF3T3BCLFVBeE9vQixFQXlPcEIsSUF6T29CLEVBME9wQixPQTFPb0IsRUEyT3BCLFdBM09vQixFQTRPcEIsUUE1T29CLEVBNk9wQixXQTdPb0IsRUE4T3BCLGdCQTlPb0IsRUErT3BCLFNBL09vQixFQWdQcEIsVUFoUG9CLEVBaVBwQixNQWpQb0IsRUFrUHBCLFNBbFBvQixFQW1QcEIsVUFuUG9CLEVBb1BwQixNQXBQb0IsRUFxUHBCLE1BclBvQixFQXNQcEIsT0F0UG9CLEVBdVBwQixZQXZQb0IsRUF3UHBCLE9BeFBvQixFQXlQcEIsY0F6UG9CLEVBMFBwQixLQTFQb0IsRUEyUHBCLFVBM1BvQixFQTRQcEIsUUE1UG9CLEVBNlBwQixPQTdQb0IsRUE4UHBCLFFBOVBvQixFQStQcEIsYUEvUG9CLEVBZ1FwQixjQWhRb0IsRUFpUXBCLEtBalFvQixFQWtRcEIsUUFsUW9CLEVBbVFwQixTQW5Rb0IsRUFvUXBCLFVBcFFvQixFQXFRcEIsS0FyUW9CLEVBc1FwQixNQXRRb0IsRUF1UXBCLFVBdlFvQixFQXdRcEIsUUF4UW9CLEVBeVFwQixPQXpRb0IsRUEwUXBCLFFBMVFvQixFQTJRcEIsVUEzUW9CLEVBNFFwQixLQTVRb0IsRUE2UXBCLFVBN1FvQixFQThRcEIsU0E5UW9CLEVBK1FwQixPQS9Rb0IsRUFnUnBCLE9BaFJvQixFQWlScEIsS0FqUm9CLEVBa1JwQixXQWxSb0IsRUFtUnBCLFNBblJvQixFQW9ScEIsSUFwUm9CLEVBcVJwQixTQXJSb0IsRUFzUnBCLFNBdFJvQixFQXVScEIsVUF2Um9CLEVBd1JwQixZQXhSb0IsRUF5UnBCLFlBelJvQixFQTBScEIsWUExUm9CLEVBMlJwQixNQTNSb0IsRUE0UnBCLFNBNVJvQixFQTZScEIsV0E3Um9CLEVBOFJwQixZQTlSb0IsRUErUnBCLEtBL1JvQixFQWdTcEIsTUFoU29CLEVBaVNwQixRQWpTb0IsRUFrU3BCLE9BbFNvQixFQW1TcEIsU0FuU29CLEVBb1NwQixVQXBTb0IsRUFxU3BCLE1BclNvQixFQXNTcEIsY0F0U29CLEVBdVNwQixJQXZTb0IsRUF3U3BCLFFBeFNvQixFQXlTcEIsS0F6U29CLEVBMFNwQixXQTFTb0IsRUEyU3BCLElBM1NvQixFQTRTcEIsTUE1U29CLEVBNlNwQixNQTdTb0IsRUE4U3BCLGNBOVNvQixFQStTcEIsVUEvU29CLEVBZ1RwQixRQWhUb0IsRUFpVHBCLE9BalRvQixFQWtUcEIsS0FsVG9CLEVBbVRwQixPQW5Ub0IsRUFvVHBCLE1BcFRvQixFQXFUcEIsVUFyVG9CLEVBc1RwQixTQXRUb0IsRUF1VHBCLFlBdlRvQixFQXdUcEIsU0F4VG9CLEVBeVRwQixRQXpUb0IsRUEwVHBCLFVBMVRvQixFQTJUcEIsV0EzVG9CLEVBNFRwQixNQTVUb0IsRUE2VHBCLFdBN1RvQixFQThUcEIsYUE5VG9CLEVBK1RwQixjQS9Ub0IsRUFnVXBCLFlBaFVvQixFQWlVcEIsVUFqVW9CLEVBa1VwQixNQWxVb0IsRUFtVXBCLGlCQW5Vb0IsRUFvVXBCLGlCQXBVb0IsRUFxVXBCLGNBclVvQixFQXNVcEIsV0F0VW9CLEVBdVVwQixNQXZVb0IsRUF3VXBCLFVBeFVvQixFQXlVcEIsT0F6VW9CLEVBMFVwQixXQTFVb0IsRUEyVXBCLFNBM1VvQixFQTRVcEIsU0E1VW9CLEVBNlVwQixTQTdVb0IsRUE4VXBCLFFBOVVvQixFQStVcEIsWUEvVW9CLEVBZ1ZwQixXQWhWb0IsRUFpVnBCLFNBalZvQixFQWtWcEIsTUFsVm9CLEVBbVZwQixRQW5Wb0IsRUFvVnBCLE9BcFZvQixFQXFWcEIsU0FyVm9CLEVBc1ZwQixPQXRWb0IsRUF1VnBCLE1BdlZvQixFQXdWcEIsTUF4Vm9CLEVBeVZwQixPQXpWb0IsRUEwVnBCLE1BMVZvQixFQTJWcEIsVUEzVm9CLEVBNFZwQixXQTVWb0IsRUE2VnBCLEtBN1ZvQixFQThWcEIsWUE5Vm9CLEVBK1ZwQixhQS9Wb0IsRUFnV3BCLFNBaFdvQixFQWlXcEIsV0FqV29CLEVBa1dwQixXQWxXb0IsRUFtV3BCLFlBbldvQixFQW9XcEIsZ0JBcFdvQixFQXFXcEIsU0FyV29CLEVBc1dwQixZQXRXb0IsRUF1V3BCLFVBdldvQixFQXdXcEIsVUF4V29CLEVBeVdwQixVQXpXb0IsRUEwV3BCLFNBMVdvQixFQTJXcEIsUUEzV29CLEVBNFdwQixRQTVXb0IsRUE2V3BCLE9BN1dvQixFQThXcEIsVUE5V29CLEVBK1dwQixTQS9Xb0IsRUFnWHBCLFVBaFhvQixFQWlYcEIsUUFqWG9CLEVBa1hwQixvQkFsWG9CLEVBbVhwQixRQW5Yb0IsRUFvWHBCLFNBcFhvQixFQXFYcEIsUUFyWG9CLEVBc1hwQixPQXRYb0IsRUF1WHBCLE1BdlhvQixFQXdYcEIsVUF4WG9CLEVBeVhwQixRQXpYb0IsRUEwWHBCLGVBMVhvQixFQTJYcEIsWUEzWG9CLEVBNFhwQixhQTVYb0IsRUE2WHBCLGlCQTdYb0IsRUE4WHBCLGlCQTlYb0IsRUErWHBCLGVBL1hvQixFQWdZcEIsVUFoWW9CLEVBaVlwQixTQWpZb0IsRUFrWXBCLEtBbFlvQixFQW1ZcEIsV0FuWW9CLEVBb1lwQixNQXBZb0IsRUFxWXBCLFFBcllvQixFQXNZcEIsWUF0WW9CLEVBdVlwQixLQXZZb0IsRUF3WXBCLEtBeFlvQixFQXlZcEIsV0F6WW9CLEVBMFlwQixRQTFZb0IsRUEyWXBCLE9BM1lvQixFQTRZcEIsWUE1WW9CLEVBNllwQixRQTdZb0IsRUE4WXBCLFFBOVlvQixFQStZcEIsUUEvWW9CLEVBZ1pwQixTQWhab0IsRUFpWnBCLFFBalpvQixFQWtacEIsVUFsWm9CLEVBbVpwQixXQW5ab0IsRUFvWnBCLFVBcFpvQixFQXFacEIsU0FyWm9CLEVBc1pwQixjQXRab0IsRUF1WnBCLFFBdlpvQixFQXdacEIsU0F4Wm9CLEVBeVpwQixRQXpab0IsRUEwWnBCLFVBMVpvQixFQTJacEIsTUEzWm9CLEVBNFpwQixNQTVab0IsRUE2WnBCLFFBN1pvQixFQThacEIsVUE5Wm9CLEVBK1pwQixjQS9ab0IsRUFnYXBCLEtBaGFvQixFQWlhcEIsY0FqYW9CLEVBa2FwQixPQWxhb0IsRUFtYXBCLFVBbmFvQixFQW9hcEIsWUFwYW9CLEVBcWFwQixNQXJhb0IsRUFzYXBCLFNBdGFvQixFQXVhcEIsVUF2YW9CLEVBd2FwQixPQXhhb0IsRUF5YXBCLFVBemFvQixFQTBhcEIsV0ExYW9CLEVBMmFwQixRQTNhb0IsRUE0YXBCLFVBNWFvQixFQTZhcEIsTUE3YW9CLEVBOGFwQixZQTlhb0IsRUErYXBCLGFBL2FvQixFQWdicEIsVUFoYm9CLEVBaWJwQixRQWpib0IsRUFrYnBCLE9BbGJvQixFQW1icEIsYUFuYm9CLEVBb2JwQixXQXBib0IsRUFxYnBCLEtBcmJvQixFQXNicEIsU0F0Ym9CLEVBdWJwQixXQXZib0IsRUF3YnBCLFNBeGJvQixFQXlicEIsUUF6Ym9CLEVBMGJwQixRQTFib0IsRUEyYnBCLFNBM2JvQixFQTRicEIsUUE1Ym9CLEVBNmJwQixhQTdib0IsRUE4YnBCLE9BOWJvQixFQSticEIsYUEvYm9CLEVBZ2NwQixZQWhjb0IsRUFpY3BCLE1BamNvQixFQWtjcEIsTUFsY29CLEVBbWNwQixXQW5jb0IsRUFvY3BCLGVBcGNvQixFQXFjcEIsaUJBcmNvQixFQXNjcEIsSUF0Y29CLEVBdWNwQixVQXZjb0IsRUF3Y3BCLGFBeGNvQixFQXljcEIsV0F6Y29CLEVBMGNwQixhQTFjb0IsRUEyY3BCLE9BM2NvQixFQTRjcEIsU0E1Y29CLEVBNmNwQixNQTdjb0IsRUE4Y3BCLE1BOWNvQixFQStjcEIsVUEvY29CLEVBZ2RwQixNQWhkb0IsRUFpZHBCLFNBamRvQixFQWtkcEIsTUFsZG9CLEVBbWRwQixRQW5kb0IsRUFvZHBCLFNBcGRvQixFQXFkcEIsUUFyZG9CLEVBc2RwQixPQXRkb0IsRUF1ZHBCLE9BdmRvQixFQXdkcEIsT0F4ZG9CLEVBeWRwQixNQXpkb0IsRUEwZHBCLE9BMWRvQixFQTJkcEIsV0EzZG9CLEVBNGRwQixPQTVkb0IsRUE2ZHBCLFNBN2RvQixFQThkcEIsVUE5ZG9CLEVBK2RwQixTQS9kb0IsRUFnZXBCLFNBaGVvQixFQWllcEIsU0FqZW9CLEVBa2VwQixVQWxlb0IsRUFtZXBCLE1BbmVvQixFQW9lcEIsU0FwZW9CLEVBcWVwQixNQXJlb0IsRUFzZXBCLFVBdGVvQixFQXVlcEIsU0F2ZW9CLEVBd2VwQixNQXhlb0IsRUF5ZXBCLFVBemVvQixFQTBlcEIsT0ExZW9CLEVBMmVwQixjQTNlb0IsRUE0ZXBCLFFBNWVvQixFQTZlcEIsTUE3ZW9CLEVBOGVwQixRQTllb0IsRUErZXBCLFNBL2VvQixFQWdmcEIsS0FoZm9CLEVBaWZwQixPQWpmb0IsRUFrZnBCLFlBbGZvQixFQW1mcEIsV0FuZm9CLEVBb2ZwQixlQXBmb0IsRUFxZnBCLE1BcmZvQixFQXNmcEIsT0F0Zm9CLENBQXRCO0FBeWZBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLGFBTDRCLEVBTTVCLFFBTjRCLEVBTzVCLGFBUDRCLEVBUTVCLE1BUjRCLEVBUzVCLFVBVDRCLEVBVTVCLElBVjRCLEVBVzVCLFFBWDRCLEVBWTVCLGFBWjRCLEVBYTVCLFdBYjRCLEVBYzVCLE9BZDRCLEVBZTVCLFVBZjRCLEVBZ0I1QixRQWhCNEIsRUFpQjVCLG9CQWpCNEIsRUFrQjVCLFlBbEI0QixFQW1CNUIsS0FuQjRCLEVBb0I1QixRQXBCNEIsRUFxQjVCLFFBckI0QixFQXNCNUIsT0F0QjRCLENBQTlCO0FBeUJBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsV0FBakQsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixZQUgyQixFQUkzQixNQUoyQixFQUszQixXQUwyQixFQU0zQixpQkFOMkIsRUFPM0IsSUFQMkIsRUFRM0IsWUFSMkIsRUFTM0IsWUFUMkIsRUFVM0Isa0JBVjJCLENBQTdCOztJQWFxQnNGLFk7Ozs7Ozs7Ozs7Ozs7Z0NBQ1A7QUFDVixhQUFPLElBQUlwRyx1REFBSixDQUFjO0FBQ25CZ0IscUJBQWEsRUFBYkEsYUFEbUI7QUFFbkJOLDZCQUFxQixFQUFyQkEscUJBRm1CO0FBR25CSSw0QkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkYscUNBQTZCLEVBQTdCQSw2QkFKbUI7QUFLbkJRLG1CQUFXLEVBQUUsU0FBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUxNO0FBTW5CRSxrQkFBVSxFQUFFLENBQUMsR0FBRCxDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsQ0FWQztBQVduQlUsd0JBQWdCLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTjtBQVhDLE9BQWQsQ0FBUDtBQWFEOzs7O0VBZnVDOUcsdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwaUIxQztBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixZQURvQixFQUVwQixLQUZvQixFQUdwQixLQUhvQixFQUlwQixPQUpvQixFQUtwQixTQUxvQixFQU1wQixLQU5vQixFQU9wQixJQVBvQixFQVFwQixLQVJvQixFQVNwQixZQVRvQixFQVVwQixRQVZvQixFQVdwQixTQVhvQixFQVlwQixRQVpvQixFQWFwQixRQWJvQixFQWNwQixNQWRvQixFQWVwQixNQWZvQixFQWdCcEIsSUFoQm9CLEVBaUJwQixNQWpCb0IsRUFrQnBCLFNBbEJvQixFQW1CcEIsTUFuQm9CLEVBb0JwQixRQXBCb0IsRUFxQnBCLE1BckJvQixFQXNCcEIsV0F0Qm9CLEVBdUJwQixPQXZCb0IsRUF3QnBCLFNBeEJvQixFQXlCcEIsUUF6Qm9CLEVBMEJwQixXQTFCb0IsRUEyQnBCLFlBM0JvQixFQTRCcEIsVUE1Qm9CLEVBNkJwQixTQTdCb0IsRUE4QnBCLFFBOUJvQixFQStCcEIsT0EvQm9CLEVBZ0NwQixjQWhDb0IsRUFpQ3BCLGNBakNvQixFQWtDcEIsY0FsQ29CLEVBbUNwQixtQkFuQ29CLEVBb0NwQixjQXBDb0IsRUFxQ3BCLFFBckNvQixFQXNDcEIsVUF0Q29CLEVBdUNwQixXQXZDb0IsRUF3Q3BCLFVBeENvQixFQXlDcEIsaUJBekNvQixFQTBDcEIsWUExQ29CLEVBMkNwQixZQTNDb0IsRUE0Q3BCLEtBNUNvQixFQTZDcEIsU0E3Q29CLEVBOENwQixTQTlDb0IsRUErQ3BCLFNBL0NvQixFQWdEcEIsU0FoRG9CLEVBaURwQixRQWpEb0IsRUFrRHBCLE1BbERvQixFQW1EcEIsVUFuRG9CLEVBb0RwQixlQXBEb0IsRUFxRHBCLFVBckRvQixFQXNEcEIsYUF0RG9CLEVBdURwQixLQXZEb0IsRUF3RHBCLGVBeERvQixFQXlEcEIsUUF6RG9CLEVBMERwQixNQTFEb0IsRUEyRHBCLE1BM0RvQixFQTREcEIsTUE1RG9CLEVBNkRwQixNQTdEb0IsRUE4RHBCLFFBOURvQixFQStEcEIsVUEvRG9CLEVBZ0VwQixTQWhFb0IsRUFpRXBCLFFBakVvQixFQWtFcEIsUUFsRW9CLEVBbUVwQixNQW5Fb0IsRUFvRXBCLFNBcEVvQixFQXFFcEIsT0FyRW9CLEVBc0VwQixPQXRFb0IsRUF1RXBCLE9BdkVvQixFQXdFcEIsUUF4RW9CLEVBeUVwQixRQXpFb0IsRUEwRXBCLEtBMUVvQixFQTJFcEIsT0EzRW9CLEVBNEVwQixTQTVFb0IsRUE2RXBCLE1BN0VvQixFQThFcEIsVUE5RW9CLEVBK0VwQixTQS9Fb0IsRUFnRnBCLE9BaEZvQixFQWlGcEIsT0FqRm9CLEVBa0ZwQixRQWxGb0IsRUFtRnBCLGVBbkZvQixFQW9GcEIsa0JBcEZvQixFQXFGcEIsYUFyRm9CLEVBc0ZwQixhQXRGb0IsRUF1RnBCLElBdkZvQixFQXdGcEIsUUF4Rm9CLEVBeUZwQixtQkF6Rm9CLEVBMEZwQixtQkExRm9CLEVBMkZwQixJQTNGb0IsRUE0RnBCLE9BNUZvQixFQTZGcEIsUUE3Rm9CLEVBOEZwQixPQTlGb0IsRUErRnBCLE9BL0ZvQixFQWdHcEIsYUFoR29CLEVBaUdwQixRQWpHb0IsRUFrR3BCLEtBbEdvQixFQW1HcEIsTUFuR29CLEVBb0dwQixNQXBHb0IsRUFxR3BCLE1BckdvQixFQXNHcEIsTUF0R29CLEVBdUdwQixNQXZHb0IsRUF3R3BCLFNBeEdvQixFQXlHcEIsV0F6R29CLEVBMEdwQixVQTFHb0IsRUEyR3BCLE1BM0dvQixFQTRHcEIsSUE1R29CLEVBNkdwQixTQTdHb0IsRUE4R3BCLE1BOUdvQixFQStHcEIsS0EvR29CLEVBZ0hwQixNQWhIb0IsRUFpSHBCLE1BakhvQixFQWtIcEIsU0FsSG9CLEVBbUhwQixPQW5Ib0IsRUFvSHBCLE1BcEhvQixFQXFIcEIsTUFySG9CLEVBc0hwQixPQXRIb0IsRUF1SHBCLFFBdkhvQixFQXdIcEIsT0F4SG9CLEVBeUhwQixNQXpIb0IsRUEwSHBCLFdBMUhvQixFQTJIcEIsZ0JBM0hvQixFQTRIcEIsTUE1SG9CLEVBNkhwQixNQTdIb0IsRUE4SHBCLFVBOUhvQixFQStIcEIsVUEvSG9CLEVBZ0lwQixNQWhJb0IsRUFpSXBCLGNBaklvQixFQWtJcEIseUJBbElvQixFQW1JcEIsK0JBbklvQixFQW9JcEIsT0FwSW9CLEVBcUlwQixVQXJJb0IsRUFzSXBCLFlBdElvQixFQXVJcEIsV0F2SW9CLEVBd0lwQixZQXhJb0IsRUF5SXBCLFdBeklvQixFQTBJcEIsb0JBMUlvQixFQTJJcEIsZUEzSW9CLEVBNElwQixLQTVJb0IsRUE2SXBCLFVBN0lvQixFQThJcEIsU0E5SW9CLEVBK0lwQixLQS9Jb0IsRUFnSnBCLG9CQWhKb0IsRUFpSnBCLE1BakpvQixFQWtKcEIsU0FsSm9CLEVBbUpwQixJQW5Kb0IsRUFvSnBCLFVBcEpvQixFQXFKcEIsUUFySm9CLEVBc0pwQixZQXRKb0IsRUF1SnBCLElBdkpvQixFQXdKcEIsT0F4Sm9CLEVBeUpwQixLQXpKb0IsRUEwSnBCLE9BMUpvQixFQTJKcEIsU0EzSm9CLEVBNEpwQixNQTVKb0IsRUE2SnBCLGVBN0pvQixFQThKcEIsaUJBOUpvQixFQStKcEIsV0EvSm9CLEVBZ0twQixVQWhLb0IsRUFpS3BCLFdBaktvQixFQWtLcEIsU0FsS29CLEVBbUtwQixXQW5Lb0IsRUFvS3BCLE9BcEtvQixFQXFLcEIsT0FyS29CLEVBc0twQixNQXRLb0IsRUF1S3BCLE9BdktvQixFQXdLcEIsWUF4S29CLEVBeUtwQixNQXpLb0IsRUEwS3BCLFdBMUtvQixFQTJLcEIsZUEzS29CLEVBNEtwQixZQTVLb0IsRUE2S3BCLFFBN0tvQixFQThLcEIsU0E5S29CLEVBK0twQixRQS9Lb0IsRUFnTHBCLFFBaExvQixFQWlMcEIsU0FqTG9CLEVBa0xwQixTQWxMb0IsRUFtTHBCLFVBbkxvQixFQW9McEIsVUFwTG9CLEVBcUxwQixRQXJMb0IsRUFzTHBCLFdBdExvQixFQXVMcEIsUUF2TG9CLEVBd0xwQixPQXhMb0IsRUF5THBCLE9BekxvQixFQTBMcEIsTUExTG9CLEVBMkxwQixRQTNMb0IsRUE0THBCLFNBNUxvQixFQTZMcEIsb0JBN0xvQixFQThMcEIsUUE5TG9CLEVBK0xwQixXQS9Mb0IsRUFnTXBCLFdBaE1vQixFQWlNcEIsS0FqTW9CLEVBa01wQixNQWxNb0IsRUFtTXBCLFFBbk1vQixFQW9NcEIsTUFwTW9CLEVBcU1wQixVQXJNb0IsRUFzTXBCLFNBdE1vQixFQXVNcEIsVUF2TW9CLEVBd01wQixLQXhNb0IsRUF5TXBCLGNBek1vQixFQTBNcEIsVUExTW9CLEVBMk1wQixZQTNNb0IsRUE0TXBCLGdCQTVNb0IsRUE2TXBCLHFCQTdNb0IsRUE4TXBCLGtCQTlNb0IsRUErTXBCLEtBL01vQixFQWdOcEIsVUFoTm9CLEVBaU5wQixtQkFqTm9CLEVBa05wQixrQkFsTm9CLEVBbU5wQixvQkFuTm9CLEVBb05wQixlQXBOb0IsRUFxTnBCLE9Bck5vQixFQXNOcEIsWUF0Tm9CLEVBdU5wQixNQXZOb0IsRUF3TnBCLFVBeE5vQixFQXlOcEIsU0F6Tm9CLEVBME5wQixVQTFOb0IsRUEyTnBCLElBM05vQixFQTROcEIsVUE1Tm9CLEVBNk5wQixTQTdOb0IsRUE4TnBCLE1BOU5vQixFQStOcEIsTUEvTm9CLEVBZ09wQixPQWhPb0IsRUFpT3BCLFFBak9vQixFQWtPcEIsUUFsT29CLEVBbU9wQixVQW5Pb0IsRUFvT3BCLFFBcE9vQixFQXFPcEIsT0FyT29CLEVBc09wQixLQXRPb0IsRUF1T3BCLE9Bdk9vQixFQXdPcEIsVUF4T29CLEVBeU9wQixVQXpPb0IsRUEwT3BCLGVBMU9vQixFQTJPcEIsUUEzT29CLEVBNE9wQixXQTVPb0IsRUE2T3BCLFNBN09vQixFQThPcEIsY0E5T29CLEVBK09wQixTQS9Pb0IsRUFnUHBCLE1BaFBvQixFQWlQcEIsT0FqUG9CLEVBa1BwQixPQWxQb0IsRUFtUHBCLFFBblBvQixFQW9QcEIsTUFwUG9CLEVBcVBwQixPQXJQb0IsRUFzUHBCLEtBdFBvQixFQXVQcEIsWUF2UG9CLEVBd1BwQixVQXhQb0IsQ0FBdEI7QUEyUEEsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsY0FGNEIsRUFHNUIsYUFINEIsRUFJNUIsYUFKNEIsRUFLNUIsUUFMNEIsRUFNNUIsTUFONEIsRUFPNUIsVUFQNEIsRUFRNUIsUUFSNEIsRUFTNUIsYUFUNEIsRUFVNUIsUUFWNEIsRUFXNUIsT0FYNEIsRUFZNUIsVUFaNEIsRUFhNUIsUUFiNEIsRUFjNUIsS0FkNEIsRUFlNUIsUUFmNEIsRUFnQjVCLFFBaEI0QixFQWlCNUIsT0FqQjRCLENBQTlCO0FBb0JBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsV0FBeEMsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixNQUgyQixFQUkzQixZQUoyQixFQUszQixNQUwyQixFQU0zQixXQU4yQixFQU8zQixpQkFQMkIsRUFRM0IsSUFSMkIsRUFTM0IsWUFUMkIsRUFVM0IsWUFWMkIsRUFXM0Isa0JBWDJCLEVBWTNCLE1BWjJCLENBQTdCOztJQWVxQnVGLGdCOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJckcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBTE07QUFNbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLEVBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsRUFBTyxHQUFQLENBVkM7QUFXbkJVLHdCQUFnQixFQUFFLENBQUMsR0FBRCxDQVhDO0FBWW5CYixpQkFBUyxFQUFFLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLEtBQXpCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDO0FBWlEsT0FBZCxDQUFQO0FBY0Q7Ozs7RUFoQjJDakcsdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuUzlDO0FBQ0E7QUFFQSxJQUFNNEcsYUFBYSxHQUFHLENBQ3BCLEtBRG9CLEVBRXBCLE9BRm9CLEVBR3BCLFNBSG9CLEVBSXBCLEtBSm9CLEVBS3BCLEtBTG9CLEVBTXBCLE9BTm9CLEVBT3BCLElBUG9CLEVBUXBCLEtBUm9CLEVBU3BCLE9BVG9CLEVBVXBCLFNBVm9CLEVBV3BCLFFBWG9CLEVBWXBCLFNBWm9CLEVBYXBCLE9BYm9CLEVBY3BCLFFBZG9CLEVBZXBCLE9BZm9CLEVBZ0JwQixJQWhCb0IsRUFpQnBCLE1BakJvQixFQWtCcEIsTUFsQm9CLEVBbUJwQixNQW5Cb0IsRUFvQnBCLFNBcEJvQixFQXFCcEIsU0FyQm9CLEVBc0JwQixZQXRCb0IsRUF1QnBCLFFBdkJvQixFQXdCcEIsU0F4Qm9CLEVBeUJwQixVQXpCb0IsRUEwQnBCLFdBMUJvQixFQTJCcEIsT0EzQm9CLEVBNEJwQixRQTVCb0IsRUE2QnBCLFVBN0JvQixFQThCcEIsU0E5Qm9CLEVBK0JwQixXQS9Cb0IsRUFnQ3BCLFNBaENvQixFQWlDcEIsV0FqQ29CLEVBa0NwQixRQWxDb0IsRUFtQ3BCLFNBbkNvQixFQW9DcEIsTUFwQ29CLEVBcUNwQixVQXJDb0IsRUFzQ3BCLFVBdENvQixFQXVDcEIsSUF2Q29CLEVBd0NwQixNQXhDb0IsRUF5Q3BCLE1BekNvQixFQTBDcEIsU0ExQ29CLEVBMkNwQixNQTNDb0IsRUE0Q3BCLEtBNUNvQixFQTZDcEIsT0E3Q29CLEVBOENwQixRQTlDb0IsRUErQ3BCLFNBL0NvQixFQWdEcEIsU0FoRG9CLEVBaURwQixRQWpEb0IsRUFrRHBCLFNBbERvQixFQW1EcEIsT0FuRG9CLEVBb0RwQixPQXBEb0IsRUFxRHBCLE9BckRvQixFQXNEcEIsU0F0RG9CLEVBdURwQixLQXZEb0IsRUF3RHBCLE9BeERvQixFQXlEcEIsTUF6RG9CLEVBMERwQixVQTFEb0IsRUEyRHBCLE9BM0RvQixFQTREcEIsT0E1RG9CLEVBNkRwQixLQTdEb0IsRUE4RHBCLFFBOURvQixFQStEcEIsSUEvRG9CLEVBZ0VwQixRQWhFb0IsRUFpRXBCLE9BakVvQixFQWtFcEIsSUFsRW9CLEVBbUVwQixTQW5Fb0IsRUFvRXBCLFdBcEVvQixFQXFFcEIsT0FyRW9CLEVBc0VwQixPQXRFb0IsRUF1RXBCLFFBdkVvQixFQXdFcEIsT0F4RW9CLEVBeUVwQixRQXpFb0IsRUEwRXBCLFdBMUVvQixFQTJFcEIsTUEzRW9CLEVBNEVwQixJQTVFb0IsRUE2RXBCLE1BN0VvQixFQThFcEIsS0E5RW9CLEVBK0VwQixNQS9Fb0IsRUFnRnBCLFVBaEZvQixFQWlGcEIsT0FqRm9CLEVBa0ZwQixNQWxGb0IsRUFtRnBCLE1BbkZvQixFQW9GcEIsS0FwRm9CLEVBcUZwQixTQXJGb0IsRUFzRnBCLE1BdEZvQixFQXVGcEIsT0F2Rm9CLEVBd0ZwQixLQXhGb0IsRUF5RnBCLEtBekZvQixFQTBGcEIsU0ExRm9CLEVBMkZwQixTQTNGb0IsRUE0RnBCLGNBNUZvQixFQTZGcEIsT0E3Rm9CLEVBOEZwQixTQTlGb0IsRUErRnBCLFdBL0ZvQixFQWdHcEIsTUFoR29CLEVBaUdwQixLQWpHb0IsRUFrR3BCLE1BbEdvQixFQW1HcEIsUUFuR29CLEVBb0dwQixRQXBHb0IsRUFxR3BCLFFBckdvQixFQXNHcEIsSUF0R29CLEVBdUdwQixRQXZHb0IsRUF3R3BCLElBeEdvQixFQXlHcEIsT0F6R29CLEVBMEdwQixPQTFHb0IsRUEyR3BCLE1BM0dvQixFQTRHcEIsT0E1R29CLEVBNkdwQixXQTdHb0IsRUE4R3BCLFVBOUdvQixFQStHcEIsTUEvR29CLEVBZ0hwQixNQWhIb0IsRUFpSHBCLFNBakhvQixFQWtIcEIsU0FsSG9CLEVBbUhwQixTQW5Ib0IsRUFvSHBCLFdBcEhvQixFQXFIcEIsV0FySG9CLEVBc0hwQixRQXRIb0IsRUF1SHBCLEtBdkhvQixFQXdIcEIsT0F4SG9CLEVBeUhwQixRQXpIb0IsRUEwSHBCLFFBMUhvQixFQTJIcEIsUUEzSG9CLEVBNEhwQixXQTVIb0IsRUE2SHBCLFFBN0hvQixFQThIcEIsT0E5SG9CLEVBK0hwQixNQS9Ib0IsRUFnSXBCLFVBaElvQixFQWlJcEIsV0FqSW9CLEVBa0lwQixRQWxJb0IsRUFtSXBCLFFBbklvQixFQW9JcEIsTUFwSW9CLEVBcUlwQixNQXJJb0IsRUFzSXBCLEtBdElvQixFQXVJcEIsTUF2SW9CLEVBd0lwQixNQXhJb0IsRUF5SXBCLE9BeklvQixFQTBJcEIsWUExSW9CLEVBMklwQixRQTNJb0IsRUE0SXBCLFFBNUlvQixFQTZJcEIsTUE3SW9CLEVBOElwQixJQTlJb0IsRUErSXBCLGFBL0lvQixFQWdKcEIsU0FoSm9CLEVBaUpwQixNQWpKb0IsRUFrSnBCLFVBbEpvQixFQW1KcEIsT0FuSm9CLEVBb0pwQixPQXBKb0IsRUFxSnBCLFFBckpvQixFQXNKcEIsU0F0Sm9CLEVBdUpwQixRQXZKb0IsRUF3SnBCLE9BeEpvQixFQXlKcEIsUUF6Sm9CLEVBMEpwQixRQTFKb0IsRUEySnBCLEtBM0pvQixFQTRKcEIsTUE1Sm9CLEVBNkpwQixPQTdKb0IsRUE4SnBCLFVBOUpvQixFQStKcEIsT0EvSm9CLEVBZ0twQixRQWhLb0IsRUFpS3BCLFFBaktvQixFQWtLcEIsS0FsS29CLEVBbUtwQixNQW5Lb0IsRUFvS3BCLE1BcEtvQixFQXFLcEIsT0FyS29CLEVBc0twQixPQXRLb0IsRUF1S3BCLE1BdktvQixFQXdLcEIsUUF4S29CLEVBeUtwQixNQXpLb0IsRUEwS3BCLEtBMUtvQixDQUF0QjtBQTZLQSxJQUFNTixxQkFBcUIsR0FBRyxDQUM1QixhQUQ0QixFQUU1QixZQUY0QixFQUc1QixRQUg0QixFQUk1QixxQkFKNEIsRUFLNUIsZ0JBTDRCLEVBTTVCLGdCQU40QixFQU81QixNQVA0QixFQVE1QixVQVI0QixFQVM1QixRQVQ0QixFQVU1QixPQVY0QixFQVc1QixhQVg0QixFQVk1QixLQVo0QixFQWE1QixPQWI0QixFQWM1QixPQWQ0QixFQWU1QixNQWY0QixFQWdCNUIsVUFoQjRCLEVBaUI1QixTQWpCNEIsRUFrQjVCLFFBbEI0QixFQW1CNUIsb0JBbkI0QixFQW9CNUIsWUFwQjRCLEVBcUI1QixLQXJCNEIsRUFzQjVCLFFBdEI0QixFQXVCNUIsUUF2QjRCLEVBd0I1QixRQXhCNEIsRUF5QjVCLFVBekI0QixFQTBCNUIsUUExQjRCLEVBMkI1QixPQTNCNEIsQ0FBOUI7QUE4QkEsSUFBTUUsNkJBQTZCLEdBQUcsQ0FBQyxXQUFELEVBQWMsZUFBZCxFQUErQixPQUEvQixFQUF3QyxPQUF4QyxFQUFpRCxXQUFqRCxDQUF0QztBQUVBLElBQU1FLG9CQUFvQixHQUFHLENBQzNCLEtBRDJCLEVBRTNCLFlBRjJCLEVBRzNCLE1BSDJCLEVBSTNCLFdBSjJCLEVBSzNCLGlCQUwyQixFQU0zQixJQU4yQixFQU8zQixZQVAyQixFQVEzQixZQVIyQixFQVMzQixrQkFUMkIsRUFVM0IsS0FWMkIsQ0FBN0I7O0lBYXFCd0YsYTs7Ozs7Ozs7Ozs7OztnQ0FDUDtBQUNWLGFBQU8sSUFBSXRHLHVEQUFKLENBQWM7QUFDbkJnQixxQkFBYSxFQUFiQSxhQURtQjtBQUVuQk4sNkJBQXFCLEVBQXJCQSxxQkFGbUI7QUFHbkJJLDRCQUFvQixFQUFwQkEsb0JBSG1CO0FBSW5CRixxQ0FBNkIsRUFBN0JBLDZCQUptQjtBQUtuQlEsbUJBQVcsRUFBRSxTQUFPLElBQVAsRUFBYSxJQUFiLENBTE07QUFNbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FOTztBQU9uQkUsbUJBQVcsRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQVBNO0FBUW5CSSw2QkFBcUIsRUFBRSxDQUFDLEdBQUQsQ0FSSjtBQVNuQnBCLHdCQUFnQixFQUFFLENBQUMsR0FBRCxFQUFNLElBQU47QUFUQyxPQUFkLENBQVA7QUFXRDs7OztFQWJ3Q3BHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TjNDO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixHQURvQixFQUVwQixZQUZvQixFQUdwQixPQUhvQixFQUlwQixXQUpvQixFQUtwQixLQUxvQixFQU1wQixPQU5vQixFQU9wQixLQVBvQixFQVFwQixPQVJvQixFQVNwQixJQVRvQixFQVVwQixLQVZvQixFQVdwQixJQVhvQixFQVlwQixXQVpvQixFQWFwQixRQWJvQixFQWNwQixLQWRvQixFQWVwQixTQWZvQixFQWdCcEIsWUFoQm9CLEVBaUJwQixnQkFqQm9CLEVBa0JwQixRQWxCb0IsRUFtQnBCLFdBbkJvQixFQW9CcEIsT0FwQm9CLEVBcUJwQixNQXJCb0IsRUFzQnBCLFNBdEJvQixFQXVCcEIsTUF2Qm9CLEVBd0JwQixPQXhCb0IsRUF5QnBCLFNBekJvQixFQTBCcEIsTUExQm9CLEVBMkJwQixJQTNCb0IsRUE0QnBCLE1BNUJvQixFQTZCcEIsR0E3Qm9CLEVBOEJwQixNQTlCb0IsRUErQnBCLFNBL0JvQixFQWdDcEIsU0FoQ29CLEVBaUNwQixNQWpDb0IsRUFrQ3BCLFdBbENvQixFQW1DcEIsTUFuQ29CLEVBb0NwQixXQXBDb0IsRUFxQ3BCLFNBckNvQixFQXNDcEIsYUF0Q29CLEVBdUNwQixXQXZDb0IsRUF3Q3BCLE9BeENvQixFQXlDcEIsV0F6Q29CLEVBMENwQixPQTFDb0IsRUEyQ3BCLE9BM0NvQixFQTRDcEIsU0E1Q29CLEVBNkNwQixVQTdDb0IsRUE4Q3BCLFVBOUNvQixFQStDcEIsU0EvQ29CLEVBZ0RwQixTQWhEb0IsRUFpRHBCLFNBakRvQixFQWtEcEIsU0FsRG9CLEVBbURwQixRQW5Eb0IsRUFvRHBCLFdBcERvQixFQXFEcEIsVUFyRG9CLEVBc0RwQixVQXREb0IsRUF1RHBCLFNBdkRvQixFQXdEcEIsVUF4RG9CLEVBeURwQixhQXpEb0IsRUEwRHBCLFNBMURvQixFQTJEcEIsVUEzRG9CLEVBNERwQixTQTVEb0IsRUE2RHBCLE9BN0RvQixFQThEcEIsT0E5RG9CLEVBK0RwQixRQS9Eb0IsRUFnRXBCLFlBaEVvQixFQWlFcEIsU0FqRW9CLEVBa0VwQixTQWxFb0IsRUFtRXBCLFFBbkVvQixFQW9FcEIsYUFwRW9CLEVBcUVwQixVQXJFb0IsRUFzRXBCLE1BdEVvQixFQXVFcEIsV0F2RW9CLEVBd0VwQixNQXhFb0IsRUF5RXBCLEtBekVvQixFQTBFcEIsU0ExRW9CLEVBMkVwQixTQTNFb0IsRUE0RXBCLFFBNUVvQixFQTZFcEIsUUE3RW9CLEVBOEVwQixPQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsZUFoRm9CLEVBaUZwQixXQWpGb0IsRUFrRnBCLFVBbEZvQixFQW1GcEIsSUFuRm9CLEVBb0ZwQixRQXBGb0IsRUFxRnBCLE1BckZvQixFQXNGcEIsVUF0Rm9CLEVBdUZwQixTQXZGb0IsRUF3RnBCLE9BeEZvQixFQXlGcEIsT0F6Rm9CLEVBMEZwQixLQTFGb0IsRUEyRnBCLFFBM0ZvQixFQTRGcEIsWUE1Rm9CLEVBNkZwQixXQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsUUEvRm9CLEVBZ0dwQixNQWhHb0IsRUFpR3BCLFNBakdvQixFQWtHcEIsVUFsR29CLEVBbUdwQixTQW5Hb0IsRUFvR3BCLE9BcEdvQixFQXFHcEIsT0FyR29CLEVBc0dwQixPQXRHb0IsRUF1R3BCLE9BdkdvQixFQXdHcEIsT0F4R29CLEVBeUdwQixPQXpHb0IsRUEwR3BCLEtBMUdvQixFQTJHcEIsUUEzR29CLEVBNEdwQixPQTVHb0IsRUE2R3BCLE1BN0dvQixFQThHcEIsVUE5R29CLEVBK0dwQixTQS9Hb0IsRUFnSHBCLE1BaEhvQixFQWlIcEIsT0FqSG9CLEVBa0hwQixPQWxIb0IsRUFtSHBCLE1BbkhvQixFQW9IcEIsTUFwSG9CLEVBcUhwQixRQXJIb0IsRUFzSHBCLE1BdEhvQixFQXVIcEIsWUF2SG9CLEVBd0hwQixJQXhIb0IsRUF5SHBCLFdBekhvQixFQTBIcEIsSUExSG9CLEVBMkhwQixXQTNIb0IsRUE0SHBCLE9BNUhvQixFQTZIcEIsU0E3SG9CLEVBOEhwQixXQTlIb0IsRUErSHBCLFNBL0hvQixFQWdJcEIsVUFoSW9CLEVBaUlwQixjQWpJb0IsRUFrSXBCLEtBbElvQixFQW1JcEIsU0FuSW9CLEVBb0lwQixXQXBJb0IsRUFxSXBCLFVBcklvQixFQXNJcEIsTUF0SW9CLEVBdUlwQixZQXZJb0IsRUF3SXBCLElBeElvQixFQXlJcEIsV0F6SW9CLEVBMElwQixNQTFJb0IsRUEySXBCLFVBM0lvQixFQTRJcEIsT0E1SW9CLEVBNklwQixTQTdJb0IsRUE4SXBCLFFBOUlvQixFQStJcEIsT0EvSW9CLEVBZ0pwQixTQWhKb0IsRUFpSnBCLE1BakpvQixFQWtKcEIsT0FsSm9CLEVBbUpwQixPQW5Kb0IsRUFvSnBCLE9BcEpvQixFQXFKcEIsU0FySm9CLEVBc0pwQixPQXRKb0IsRUF1SnBCLE1BdkpvQixFQXdKcEIsTUF4Sm9CLEVBeUpwQixLQXpKb0IsRUEwSnBCLEtBMUpvQixFQTJKcEIsUUEzSm9CLEVBNEpwQixRQTVKb0IsRUE2SnBCLE9BN0pvQixFQThKcEIsS0E5Sm9CLEVBK0pwQixRQS9Kb0IsRUFnS3BCLFVBaEtvQixFQWlLcEIsS0FqS29CLEVBa0twQixNQWxLb0IsRUFtS3BCLE9BbktvQixFQW9LcEIsVUFwS29CLEVBcUtwQixNQXJLb0IsRUFzS3BCLEtBdEtvQixFQXVLcEIsVUF2S29CLEVBd0twQixRQXhLb0IsRUF5S3BCLFNBektvQixFQTBLcEIsVUExS29CLEVBMktwQixPQTNLb0IsRUE0S3BCLEtBNUtvQixFQTZLcEIsU0E3S29CLEVBOEtwQixZQTlLb0IsRUErS3BCLFFBL0tvQixFQWdMcEIsS0FoTG9CLEVBaUxwQixRQWpMb0IsRUFrTHBCLE1BbExvQixFQW1McEIsUUFuTG9CLEVBb0xwQixhQXBMb0IsRUFxTHBCLFFBckxvQixFQXNMcEIsUUF0TG9CLEVBdUxwQixTQXZMb0IsRUF3THBCLFNBeExvQixFQXlMcEIsYUF6TG9CLEVBMExwQixhQTFMb0IsRUEyTHBCLGFBM0xvQixFQTRMcEIsZUE1TG9CLEVBNkxwQixXQTdMb0IsRUE4THBCLFFBOUxvQixFQStMcEIsUUEvTG9CLEVBZ01wQixjQWhNb0IsRUFpTXBCLFVBak1vQixFQWtNcEIsV0FsTW9CLEVBbU1wQixTQW5Nb0IsRUFvTXBCLElBcE1vQixFQXFNcEIsS0FyTW9CLEVBc01wQixJQXRNb0IsRUF1TXBCLE1Bdk1vQixFQXdNcEIsUUF4TW9CLEVBeU1wQixNQXpNb0IsRUEwTXBCLFVBMU1vQixFQTJNcEIsUUEzTW9CLEVBNE1wQixRQTVNb0IsRUE2TXBCLFNBN01vQixFQThNcEIsT0E5TW9CLEVBK01wQixjQS9Nb0IsRUFnTnBCLFFBaE5vQixFQWlOcEIsU0FqTm9CLEVBa05wQixRQWxOb0IsRUFtTnBCLEtBbk5vQixFQW9OcEIsVUFwTm9CLEVBcU5wQixZQXJOb0IsRUFzTnBCLFNBdE5vQixFQXVOcEIsaUJBdk5vQixFQXdOcEIsV0F4Tm9CLEVBeU5wQixZQXpOb0IsRUEwTnBCLFFBMU5vQixFQTJOcEIsV0EzTm9CLEVBNE5wQixRQTVOb0IsRUE2TnBCLFNBN05vQixFQThOcEIsTUE5Tm9CLEVBK05wQixXQS9Ob0IsRUFnT3BCLGFBaE9vQixFQWlPcEIsV0FqT29CLEVBa09wQixVQWxPb0IsRUFtT3BCLFdBbk9vQixFQW9PcEIsUUFwT29CLEVBcU9wQixXQXJPb0IsRUFzT3BCLE9BdE9vQixFQXVPcEIsU0F2T29CLEVBd09wQixXQXhPb0IsRUF5T3BCLFFBek9vQixFQTBPcEIsT0ExT29CLEVBMk9wQixPQTNPb0IsRUE0T3BCLEtBNU9vQixFQTZPcEIsTUE3T29CLEVBOE9wQixNQTlPb0IsRUErT3BCLFFBL09vQixFQWdQcEIsS0FoUG9CLEVBaVBwQixXQWpQb0IsRUFrUHBCLFNBbFBvQixFQW1QcEIsV0FuUG9CLEVBb1BwQixLQXBQb0IsRUFxUHBCLFdBclBvQixFQXNQcEIsUUF0UG9CLEVBdVBwQixVQXZQb0IsRUF3UHBCLGNBeFBvQixFQXlQcEIsUUF6UG9CLEVBMFBwQixRQTFQb0IsRUEyUHBCLFdBM1BvQixFQTRQcEIsU0E1UG9CLEVBNlBwQixRQTdQb0IsRUE4UHBCLFVBOVBvQixFQStQcEIsS0EvUG9CLEVBZ1FwQixPQWhRb0IsRUFpUXBCLFFBalFvQixFQWtRcEIsU0FsUW9CLEVBbVFwQixRQW5Rb0IsRUFvUXBCLE1BcFFvQixFQXFRcEIsV0FyUW9CLEVBc1FwQixLQXRRb0IsRUF1UXBCLEtBdlFvQixFQXdRcEIsS0F4UW9CLEVBeVFwQixRQXpRb0IsRUEwUXBCLFFBMVFvQixFQTJRcEIsU0EzUW9CLEVBNFFwQixNQTVRb0IsRUE2UXBCLFVBN1FvQixFQThRcEIsVUE5UW9CLEVBK1FwQixjQS9Rb0IsRUFnUnBCLE9BaFJvQixFQWlScEIsT0FqUm9CLEVBa1JwQixRQWxSb0IsRUFtUnBCLE1BblJvQixFQW9ScEIsVUFwUm9CLEVBcVJwQixNQXJSb0IsRUFzUnBCLE9BdFJvQixFQXVScEIsUUF2Um9CLEVBd1JwQixLQXhSb0IsRUF5UnBCLFNBelJvQixFQTBScEIsU0ExUm9CLEVBMlJwQixTQTNSb0IsRUE0UnBCLFNBNVJvQixFQTZScEIsVUE3Um9CLEVBOFJwQixVQTlSb0IsRUErUnBCLE9BL1JvQixFQWdTcEIsUUFoU29CLEVBaVNwQixRQWpTb0IsRUFrU3BCLFFBbFNvQixFQW1TcEIsUUFuU29CLEVBb1NwQixRQXBTb0IsRUFxU3BCLE9BclNvQixFQXNTcEIsYUF0U29CLEVBdVNwQixjQXZTb0IsRUF3U3BCLGVBeFNvQixFQXlTcEIsU0F6U29CLEVBMFNwQixZQTFTb0IsRUEyU3BCLEtBM1NvQixFQTRTcEIsU0E1U29CLEVBNlNwQixTQTdTb0IsRUE4U3BCLFNBOVNvQixFQStTcEIsT0EvU29CLEVBZ1RwQixLQWhUb0IsRUFpVHBCLEtBalRvQixFQWtUcEIsTUFsVG9CLEVBbVRwQixNQW5Ub0IsRUFvVHBCLFdBcFRvQixFQXFUcEIsZUFyVG9CLEVBc1RwQixlQXRUb0IsRUF1VHBCLGlCQXZUb0IsRUF3VHBCLGlCQXhUb0IsRUF5VHBCLElBelRvQixFQTBUcEIsVUExVG9CLEVBMlRwQixhQTNUb0IsRUE0VHBCLGVBNVRvQixFQTZUcEIsU0E3VG9CLEVBOFRwQixNQTlUb0IsRUErVHBCLFNBL1RvQixFQWdVcEIsTUFoVW9CLEVBaVVwQixLQWpVb0IsRUFrVXBCLEtBbFVvQixFQW1VcEIsS0FuVW9CLEVBb1VwQixLQXBVb0IsRUFxVXBCLE9BclVvQixFQXNVcEIsUUF0VW9CLEVBdVVwQixRQXZVb0IsRUF3VXBCLFVBeFVvQixFQXlVcEIsV0F6VW9CLEVBMFVwQixLQTFVb0IsRUEyVXBCLE1BM1VvQixFQTRVcEIsT0E1VW9CLEVBNlVwQixVQTdVb0IsRUE4VXBCLFFBOVVvQixFQStVcEIsT0EvVW9CLEVBZ1ZwQixTQWhWb0IsRUFpVnBCLFVBalZvQixFQWtWcEIsVUFsVm9CLEVBbVZwQixVQW5Wb0IsRUFvVnBCLFFBcFZvQixFQXFWcEIsU0FyVm9CLEVBc1ZwQixNQXRWb0IsRUF1VnBCLE9BdlZvQixFQXdWcEIsTUF4Vm9CLEVBeVZwQixVQXpWb0IsRUEwVnBCLE9BMVZvQixFQTJWcEIsTUEzVm9CLEVBNFZwQixNQTVWb0IsRUE2VnBCLFNBN1ZvQixFQThWcEIsT0E5Vm9CLEVBK1ZwQixNQS9Wb0IsRUFnV3BCLE1BaFdvQixDQUF0QjtBQW1XQSxJQUFNTixxQkFBcUIsR0FBRyxDQUM1QixLQUQ0QixFQUU1QixjQUY0QixFQUc1QixhQUg0QixFQUk1QixPQUo0QixFQUs1QixZQUw0QixFQU01QixTQU40QixFQU81QixhQVA0QixFQVE1QixRQVI0QixFQVM1QixLQVQ0QixFQVU1QixRQVY0QixFQVc1QixXQVg0QixFQVk1QixhQVo0QixFQWE1QixNQWI0QixFQWM1QixVQWQ0QixFQWU1QixRQWY0QixFQWdCNUIsYUFoQjRCLEVBaUI1QixRQWpCNEIsRUFrQjVCLE9BbEI0QixFQW1CNUIsTUFuQjRCLEVBb0I1QixRQXBCNEIsRUFxQjVCLFVBckI0QixFQXNCNUIsUUF0QjRCLEVBdUI1QixvQkF2QjRCLEVBd0I1QixZQXhCNEIsRUF5QjVCLEtBekI0QixFQTBCNUIsWUExQjRCLEVBMkI1QixRQTNCNEIsRUE0QjVCLFFBNUI0QixFQTZCNUIsT0E3QjRCLENBQTlCO0FBZ0NBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsV0FBakQsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixhQUYyQixFQUczQixZQUgyQixFQUkzQixNQUoyQixFQUszQixLQUwyQixFQU0zQixZQU4yQixFQU8zQixNQVAyQixFQVEzQixXQVIyQixFQVMzQixpQkFUMkIsRUFVM0IsSUFWMkIsRUFXM0IsYUFYMkIsRUFZM0IsWUFaMkIsRUFhM0IsWUFiMkIsRUFjM0Isa0JBZDJCLEVBZTNCLE1BZjJCLEVBZ0IzQixLQWhCMkIsQ0FBN0I7O0lBbUJxQnlGLGM7Ozs7Ozs7Ozs7Ozs7Z0NBQ1A7QUFDVixhQUFPLElBQUl2Ryx1REFBSixDQUFjO0FBQ25CZ0IscUJBQWEsRUFBYkEsYUFEbUI7QUFFbkJOLDZCQUFxQixFQUFyQkEscUJBRm1CO0FBR25CSSw0QkFBb0IsRUFBcEJBLG9CQUhtQjtBQUluQkYscUNBQTZCLEVBQTdCQSw2QkFKbUI7QUFLbkJRLG1CQUFXLEVBQUUsU0FBTyxLQUFQLEVBQWMsSUFBZCxFQUFvQixJQUFwQixDQUxNO0FBTW5CRSxrQkFBVSxFQUFFLENBQUMsR0FBRCxFQUFNLE1BQU4sQ0FOTztBQU9uQkUsbUJBQVcsRUFBRSxDQUFDLEdBQUQsRUFBTSxLQUFOLENBUE07QUFRbkJFLCtCQUF1QixFQUFFLENBQUMsR0FBRCxDQVJOO0FBU25CRSw2QkFBcUIsRUFBRSxDQUFDLEdBQUQsQ0FUSjtBQVVuQnBCLHdCQUFnQixFQUFFLENBQUMsSUFBRCxDQVZDO0FBV25CVSx3QkFBZ0IsRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQjtBQVhDLE9BQWQsQ0FBUDtBQWFEOzs7a0NBRWFqRyxLLEVBQU87QUFDbkIsVUFBSStLLHlEQUFLLENBQUMvSyxLQUFELENBQUwsSUFBZ0JnTCx3REFBSSxDQUFDLEtBQUtwTCxxQkFBTixDQUF4QixFQUFzRDtBQUNwRCxlQUFPO0FBQUVhLGNBQUksRUFBRUMsd0RBQVUsQ0FBQ1csUUFBbkI7QUFBNkJRLGVBQUssRUFBRTdCLEtBQUssQ0FBQzZCO0FBQTFDLFNBQVA7QUFDRDs7QUFDRCxhQUFPN0IsS0FBUDtBQUNEOzs7O0VBdEJ5Q2IsdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3WjVDO0FBQ0E7QUFFQSxJQUFNNEcsYUFBYSxHQUFHLENBQ3BCLE9BRG9CLEVBRXBCLFVBRm9CLEVBR3BCLFFBSG9CLEVBSXBCLFFBSm9CLEVBS3BCLEtBTG9CLEVBTXBCLE9BTm9CLEVBT3BCLE9BUG9CLEVBUXBCLFdBUm9CLEVBU3BCLEtBVG9CLEVBVXBCLE1BVm9CLEVBV3BCLE9BWG9CLEVBWXBCLFFBWm9CLEVBYXBCLFNBYm9CLEVBY3BCLFNBZG9CLEVBZXBCLEtBZm9CLEVBZ0JwQixLQWhCb0IsRUFpQnBCLE9BakJvQixFQWtCcEIsSUFsQm9CLEVBbUJwQixLQW5Cb0IsRUFvQnBCLFdBcEJvQixFQXFCcEIsWUFyQm9CLEVBc0JwQixZQXRCb0IsRUF1QnBCLElBdkJvQixFQXdCcEIsUUF4Qm9CLEVBeUJwQixXQXpCb0IsRUEwQnBCLGVBMUJvQixFQTJCcEIsVUEzQm9CLEVBNEJwQixRQTVCb0IsRUE2QnBCLE9BN0JvQixFQThCcEIsU0E5Qm9CLEVBK0JwQixRQS9Cb0IsRUFnQ3BCLFFBaENvQixFQWlDcEIsS0FqQ29CLEVBa0NwQixTQWxDb0IsRUFtQ3BCLE1BbkNvQixFQW9DcEIsSUFwQ29CLEVBcUNwQixPQXJDb0IsRUFzQ3BCLE1BdENvQixFQXVDcEIsUUF2Q29CLEVBd0NwQixTQXhDb0IsRUF5Q3BCLFVBekNvQixFQTBDcEIsTUExQ29CLEVBMkNwQixNQTNDb0IsRUE0Q3BCLFNBNUNvQixFQTZDcEIsT0E3Q29CLEVBOENwQixNQTlDb0IsRUErQ3BCLFdBL0NvQixFQWdEcEIsaUJBaERvQixFQWlEcEIsT0FqRG9CLEVBa0RwQixZQWxEb0IsRUFtRHBCLE9BbkRvQixFQW9EcEIsT0FwRG9CLEVBcURwQixTQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsU0F2RG9CLEVBd0RwQixXQXhEb0IsRUF5RHBCLFFBekRvQixFQTBEcEIsU0ExRG9CLEVBMkRwQixTQTNEb0IsRUE0RHBCLFVBNURvQixFQTZEcEIsUUE3RG9CLEVBOERwQixXQTlEb0IsRUErRHBCLGNBL0RvQixFQWdFcEIsZUFoRW9CLEVBaUVwQixVQWpFb0IsRUFrRXBCLFlBbEVvQixFQW1FcEIsWUFuRW9CLEVBb0VwQixhQXBFb0IsRUFxRXBCLFNBckVvQixFQXNFcEIsVUF0RW9CLEVBdUVwQixZQXZFb0IsRUF3RXBCLE1BeEVvQixFQXlFcEIsTUF6RW9CLEVBMEVwQixRQTFFb0IsRUEyRXBCLE9BM0VvQixFQTRFcEIsS0E1RW9CLEVBNkVwQixNQTdFb0IsRUE4RXBCLFNBOUVvQixFQStFcEIsaUJBL0VvQixFQWdGcEIsY0FoRm9CLEVBaUZwQixjQWpGb0IsRUFrRnBCLGdCQWxGb0IsRUFtRnBCLGNBbkZvQixFQW9GcEIsbUJBcEZvQixFQXFGcEIsY0FyRm9CLEVBc0ZwQixRQXRGb0IsRUF1RnBCLE9BdkZvQixFQXdGcEIsTUF4Rm9CLEVBeUZwQixVQXpGb0IsRUEwRnBCLEtBMUZvQixFQTJGcEIsWUEzRm9CLEVBNEZwQixLQTVGb0IsRUE2RnBCLFNBN0ZvQixFQThGcEIsU0E5Rm9CLEVBK0ZwQixTQS9Gb0IsRUFnR3BCLFVBaEdvQixFQWlHcEIsWUFqR29CLEVBa0dwQixVQWxHb0IsRUFtR3BCLFNBbkdvQixFQW9HcEIsUUFwR29CLEVBcUdwQixXQXJHb0IsRUFzR3BCLFlBdEdvQixFQXVHcEIsU0F2R29CLEVBd0dwQixNQXhHb0IsRUF5R3BCLFFBekdvQixFQTBHcEIsWUExR29CLEVBMkdwQixTQTNHb0IsRUE0R3BCLFNBNUdvQixFQTZHcEIsVUE3R29CLEVBOEdwQixJQTlHb0IsRUErR3BCLFVBL0dvQixFQWdIcEIsUUFoSG9CLEVBaUhwQixRQWpIb0IsRUFrSHBCLE1BbEhvQixFQW1IcEIsTUFuSG9CLEVBb0hwQixNQXBIb0IsRUFxSHBCLFFBckhvQixFQXNIcEIsVUF0SG9CLEVBdUhwQixXQXZIb0IsRUF3SHBCLEtBeEhvQixFQXlIcEIsTUF6SG9CLEVBMEhwQixRQTFIb0IsRUEySHBCLE9BM0hvQixFQTRIcEIsUUE1SG9CLEVBNkhwQixTQTdIb0IsRUE4SHBCLFdBOUhvQixFQStIcEIsV0EvSG9CLEVBZ0lwQixTQWhJb0IsRUFpSXBCLFFBaklvQixFQWtJcEIsU0FsSW9CLEVBbUlwQixZQW5Jb0IsRUFvSXBCLFdBcElvQixFQXFJcEIsVUFySW9CLEVBc0lwQixTQXRJb0IsRUF1SXBCLE9BdklvQixFQXdJcEIsUUF4SW9CLEVBeUlwQixPQXpJb0IsRUEwSXBCLFFBMUlvQixFQTJJcEIsT0EzSW9CLEVBNElwQixPQTVJb0IsRUE2SXBCLFdBN0lvQixFQThJcEIsS0E5SW9CLEVBK0lwQixPQS9Jb0IsRUFnSnBCLFNBaEpvQixFQWlKcEIsU0FqSm9CLEVBa0pwQixRQWxKb0IsRUFtSnBCLE1BbkpvQixFQW9KcEIsTUFwSm9CLEVBcUpwQixVQXJKb0IsRUFzSnBCLFdBdEpvQixFQXVKcEIsV0F2Sm9CLEVBd0pwQixRQXhKb0IsRUF5SnBCLE9BekpvQixFQTBKcEIsU0ExSm9CLEVBMkpwQixVQTNKb0IsRUE0SnBCLE9BNUpvQixFQTZKcEIsVUE3Sm9CLEVBOEpwQixRQTlKb0IsRUErSnBCLFNBL0pvQixFQWdLcEIsUUFoS29CLEVBaUtwQixRQWpLb0IsRUFrS3BCLE1BbEtvQixFQW1LcEIsTUFuS29CLEVBb0twQixVQXBLb0IsRUFxS3BCLElBcktvQixFQXNLcEIsT0F0S29CLEVBdUtwQixXQXZLb0IsRUF3S3BCLFdBeEtvQixFQXlLcEIsVUF6S29CLEVBMEtwQixRQTFLb0IsRUEyS3BCLElBM0tvQixFQTRLcEIsU0E1S29CLEVBNktwQixXQTdLb0IsRUE4S3BCLFdBOUtvQixFQStLcEIsT0EvS29CLEVBZ0xwQixTQWhMb0IsRUFpTHBCLFNBakxvQixFQWtMcEIsVUFsTG9CLEVBbUxwQixXQW5Mb0IsRUFvTHBCLFFBcExvQixFQXFMcEIsT0FyTG9CLEVBc0xwQixPQXRMb0IsRUF1THBCLE9BdkxvQixFQXdMcEIsYUF4TG9CLEVBeUxwQixRQXpMb0IsRUEwTHBCLFNBMUxvQixFQTJMcEIsS0EzTG9CLEVBNExwQixTQTVMb0IsRUE2THBCLFdBN0xvQixFQThMcEIsVUE5TG9CLEVBK0xwQixNQS9Mb0IsRUFnTXBCLFNBaE1vQixFQWlNcEIsSUFqTW9CLEVBa01wQixRQWxNb0IsRUFtTXBCLFdBbk1vQixFQW9NcEIsTUFwTW9CLEVBcU1wQixLQXJNb0IsRUFzTXBCLE9BdE1vQixFQXVNcEIsVUF2TW9CLEVBd01wQixPQXhNb0IsRUF5TXBCLE1Bek1vQixFQTBNcEIsU0ExTW9CLEVBMk1wQixTQTNNb0IsRUE0TXBCLFdBNU1vQixFQTZNcEIsT0E3TW9CLEVBOE1wQixNQTlNb0IsRUErTXBCLE9BL01vQixFQWdOcEIsTUFoTm9CLEVBaU5wQixPQWpOb0IsRUFrTnBCLFFBbE5vQixFQW1OcEIsTUFuTm9CLEVBb05wQixPQXBOb0IsRUFxTnBCLFdBck5vQixFQXNOcEIsZ0JBdE5vQixFQXVOcEIsVUF2Tm9CLEVBd05wQixNQXhOb0IsRUF5TnBCLFFBek5vQixFQTBOcEIsUUExTm9CLEVBMk5wQixTQTNOb0IsRUE0TnBCLE9BNU5vQixFQTZOcEIsY0E3Tm9CLEVBOE5wQixVQTlOb0IsRUErTnBCLFFBL05vQixFQWdPcEIsUUFoT29CLEVBaU9wQixVQWpPb0IsRUFrT3BCLE1BbE9vQixFQW1PcEIsT0FuT29CLEVBb09wQixNQXBPb0IsRUFxT3BCLE1Bck9vQixFQXNPcEIsT0F0T29CLEVBdU9wQixVQXZPb0IsRUF3T3BCLFNBeE9vQixFQXlPcEIsT0F6T29CLEVBME9wQixLQTFPb0IsRUEyT3BCLE1BM09vQixFQTRPcEIsS0E1T29CLEVBNk9wQixLQTdPb0IsRUE4T3BCLE1BOU9vQixFQStPcEIsTUEvT29CLEVBZ1BwQixJQWhQb0IsRUFpUHBCLE1BalBvQixFQWtQcEIsV0FsUG9CLEVBbVBwQixZQW5Qb0IsRUFvUHBCLEtBcFBvQixFQXFQcEIsU0FyUG9CLEVBc1BwQixRQXRQb0IsRUF1UHBCLFNBdlBvQixFQXdQcEIsUUF4UG9CLEVBeVBwQixNQXpQb0IsRUEwUHBCLFFBMVBvQixFQTJQcEIsT0EzUG9CLEVBNFBwQixTQTVQb0IsRUE2UHBCLFFBN1BvQixFQThQcEIsSUE5UG9CLEVBK1BwQixLQS9Qb0IsRUFnUXBCLFFBaFFvQixFQWlRcEIsTUFqUW9CLEVBa1FwQixLQWxRb0IsRUFtUXBCLElBblFvQixFQW9RcEIsTUFwUW9CLEVBcVFwQixVQXJRb0IsRUFzUXBCLFFBdFFvQixFQXVRcEIsU0F2UW9CLEVBd1FwQixJQXhRb0IsRUF5UXBCLE9BelFvQixFQTBRcEIsWUExUW9CLEVBMlFwQixRQTNRb0IsRUE0UXBCLEtBNVFvQixFQTZRcEIsT0E3UW9CLEVBOFFwQixNQTlRb0IsRUErUXBCLFVBL1FvQixFQWdScEIsU0FoUm9CLEVBaVJwQixZQWpSb0IsRUFrUnBCLE9BbFJvQixFQW1ScEIsT0FuUm9CLEVBb1JwQixVQXBSb0IsRUFxUnBCLFFBclJvQixFQXNScEIsU0F0Um9CLEVBdVJwQixXQXZSb0IsRUF3UnBCLFNBeFJvQixFQXlScEIsVUF6Um9CLEVBMFJwQixTQTFSb0IsRUEyUnBCLE9BM1JvQixFQTRScEIsUUE1Um9CLEVBNlJwQixVQTdSb0IsRUE4UnBCLFdBOVJvQixFQStScEIsV0EvUm9CLEVBZ1NwQixTQWhTb0IsRUFpU3BCLFVBalNvQixFQWtTcEIsVUFsU29CLEVBbVNwQixTQW5Tb0IsRUFvU3BCLE9BcFNvQixFQXFTcEIsWUFyU29CLEVBc1NwQixZQXRTb0IsRUF1U3BCLFdBdlNvQixFQXdTcEIsWUF4U29CLEVBeVNwQixTQXpTb0IsRUEwU3BCLGFBMVNvQixFQTJTcEIsT0EzU29CLEVBNFNwQixPQTVTb0IsRUE2U3BCLE1BN1NvQixFQThTcEIsTUE5U29CLEVBK1NwQixVQS9Tb0IsRUFnVHBCLFNBaFRvQixFQWlUcEIsV0FqVG9CLEVBa1RwQixLQWxUb0IsRUFtVHBCLFlBblRvQixFQW9UcEIsYUFwVG9CLEVBcVRwQixTQXJUb0IsRUFzVHBCLFNBdFRvQixFQXVUcEIsVUF2VG9CLEVBd1RwQixTQXhUb0IsRUF5VHBCLFFBelRvQixFQTBUcEIsWUExVG9CLEVBMlRwQixTQTNUb0IsRUE0VHBCLFNBNVRvQixFQTZUcEIsT0E3VG9CLEVBOFRwQixTQTlUb0IsRUErVHBCLFVBL1RvQixFQWdVcEIsV0FoVW9CLEVBaVVwQixTQWpVb0IsRUFrVXBCLFFBbFVvQixFQW1VcEIsT0FuVW9CLEVBb1VwQixNQXBVb0IsRUFxVXBCLFVBclVvQixFQXNVcEIsUUF0VW9CLEVBdVVwQixTQXZVb0IsRUF3VXBCLFVBeFVvQixFQXlVcEIsS0F6VW9CLEVBMFVwQixNQTFVb0IsRUEyVXBCLE1BM1VvQixFQTRVcEIsV0E1VW9CLEVBNlVwQixRQTdVb0IsRUE4VXBCLFNBOVVvQixFQStVcEIsUUEvVW9CLEVBZ1ZwQixRQWhWb0IsRUFpVnBCLFFBalZvQixFQWtWcEIsVUFsVm9CLEVBbVZwQixRQW5Wb0IsRUFvVnBCLFVBcFZvQixFQXFWcEIsV0FyVm9CLEVBc1ZwQixjQXRWb0IsRUF1VnBCLFFBdlZvQixFQXdWcEIsU0F4Vm9CLEVBeVZwQixjQXpWb0IsRUEwVnBCLEtBMVZvQixFQTJWcEIsT0EzVm9CLEVBNFZwQixNQTVWb0IsRUE2VnBCLE9BN1ZvQixFQThWcEIsTUE5Vm9CLEVBK1ZwQixTQS9Wb0IsRUFnV3BCLFFBaFdvQixFQWlXcEIsTUFqV29CLEVBa1dwQixVQWxXb0IsRUFtV3BCLFVBbldvQixFQW9XcEIsTUFwV29CLEVBcVdwQixLQXJXb0IsRUFzV3BCLFFBdFdvQixFQXVXcEIsWUF2V29CLEVBd1dwQixPQXhXb0IsRUF5V3BCLFdBeldvQixFQTBXcEIsWUExV29CLEVBMldwQixPQTNXb0IsRUE0V3BCLFFBNVdvQixFQTZXcEIsU0E3V29CLEVBOFdwQixRQTlXb0IsRUErV3BCLFFBL1dvQixFQWdYcEIsT0FoWG9CLEVBaVhwQixjQWpYb0IsRUFrWHBCLFdBbFhvQixFQW1YcEIsU0FuWG9CLEVBb1hwQixXQXBYb0IsRUFxWHBCLE9BclhvQixFQXNYcEIsUUF0WG9CLEVBdVhwQixPQXZYb0IsRUF3WHBCLFFBeFhvQixFQXlYcEIsYUF6WG9CLEVBMFhwQixZQTFYb0IsRUEyWHBCLE1BM1hvQixFQTRYcEIsVUE1WG9CLEVBNlhwQixXQTdYb0IsRUE4WHBCLE1BOVhvQixFQStYcEIsTUEvWG9CLEVBZ1lwQixNQWhZb0IsRUFpWXBCLE1BallvQixFQWtZcEIsV0FsWW9CLEVBbVlwQixJQW5Zb0IsRUFvWXBCLFVBcFlvQixFQXFZcEIsYUFyWW9CLEVBc1lwQixXQXRZb0IsRUF1WXBCLE9BdllvQixFQXdZcEIsU0F4WW9CLEVBeVlwQixNQXpZb0IsRUEwWXBCLE1BMVlvQixFQTJZcEIsVUEzWW9CLEVBNFlwQixTQTVZb0IsRUE2WXBCLE1BN1lvQixFQThZcEIsT0E5WW9CLEVBK1lwQixTQS9Zb0IsRUFnWnBCLFdBaFpvQixFQWlacEIsYUFqWm9CLEVBa1pwQixhQWxab0IsRUFtWnBCLE9BblpvQixFQW9acEIsUUFwWm9CLEVBcVpwQixTQXJab0IsRUFzWnBCLFVBdFpvQixFQXVacEIsVUF2Wm9CLEVBd1pwQixPQXhab0IsRUF5WnBCLFFBelpvQixFQTBacEIsTUExWm9CLEVBMlpwQixPQTNab0IsRUE0WnBCLFFBNVpvQixFQTZacEIsT0E3Wm9CLEVBOFpwQixVQTlab0IsRUErWnBCLFdBL1pvQixFQWdhcEIsT0FoYW9CLEVBaWFwQixRQWphb0IsRUFrYXBCLFNBbGFvQixFQW1hcEIsVUFuYW9CLEVBb2FwQixTQXBhb0IsRUFxYXBCLFNBcmFvQixFQXNhcEIsU0F0YW9CLEVBdWFwQixNQXZhb0IsRUF3YXBCLE9BeGFvQixFQXlhcEIsVUF6YW9CLEVBMGFwQixNQTFhb0IsRUEyYXBCLE9BM2FvQixFQTRhcEIsWUE1YW9CLEVBNmFwQixRQTdhb0IsRUE4YXBCLE1BOWFvQixFQSthcEIsUUEvYW9CLEVBZ2JwQixTQWhib0IsRUFpYnBCLE1BamJvQixFQWticEIsU0FsYm9CLEVBbWJwQixPQW5ib0IsRUFvYnBCLEtBcGJvQixFQXFicEIsZUFyYm9CLEVBc2JwQixXQXRib0IsRUF1YnBCLFlBdmJvQixFQXdicEIsV0F4Ym9CLEVBeWJwQixXQXpib0IsRUEwYnBCLGVBMWJvQixFQTJicEIsVUEzYm9CLEVBNGJwQixPQTVib0IsRUE2YnBCLFNBN2JvQixFQThicEIsY0E5Ym9CLEVBK2JwQixVQS9ib0IsRUFnY3BCLE1BaGNvQixFQWljcEIsS0FqY29CLEVBa2NwQixNQWxjb0IsQ0FBdEI7QUFxY0EsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsT0FGNEIsRUFHNUIsY0FINEIsRUFJNUIsYUFKNEIsRUFLNUIsTUFMNEIsRUFNNUIsYUFONEIsRUFPNUIsS0FQNEIsRUFRNUIsUUFSNEIsRUFTNUIsYUFUNEIsRUFVNUIsTUFWNEIsRUFXNUIsVUFYNEIsRUFZNUIsUUFaNEIsRUFhNUIsYUFiNEIsRUFjNUIsUUFkNEIsRUFlNUIsT0FmNEIsRUFnQjVCLFVBaEI0QixFQWlCNUIsUUFqQjRCLEVBa0I1QixvQkFsQjRCLEVBbUI1QixZQW5CNEIsRUFvQjVCLEtBcEI0QixFQXFCNUIsUUFyQjRCLEVBc0I1QixRQXRCNEIsRUF1QjVCLE9BdkI0QixDQUE5QjtBQTBCQSxJQUFNRSw2QkFBNkIsR0FBRyxDQUFDLFdBQUQsRUFBYyxlQUFkLEVBQStCLE9BQS9CLEVBQXdDLFdBQXhDLENBQXRDO0FBRUEsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsWUFGMkIsRUFHM0IsTUFIMkIsRUFJM0IsWUFKMkIsRUFLM0IsTUFMMkIsRUFNM0IsV0FOMkIsRUFPM0IsaUJBUDJCLEVBUTNCLElBUjJCLEVBUzNCLFlBVDJCLEVBVTNCLFlBVjJCLEVBVzNCLGtCQVgyQixFQVkzQixNQVoyQixDQUE3Qjs7SUFlcUIwRixtQjs7Ozs7Ozs7Ozs7OztnQ0FDUDtBQUNWLGFBQU8sSUFBSXhHLHVEQUFKLENBQWM7QUFDbkJnQixxQkFBYSxFQUFiQSxhQURtQjtBQUVuQk4sNkJBQXFCLEVBQXJCQSxxQkFGbUI7QUFHbkJJLDRCQUFvQixFQUFwQkEsb0JBSG1CO0FBSW5CRixxQ0FBNkIsRUFBN0JBLDZCQUptQjtBQUtuQlEsbUJBQVcsRUFBRSxTQUFPLElBQVAsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLElBQTdCLENBTE07QUFNbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLEVBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQsQ0FWQztBQVduQkgsaUJBQVMsRUFBRSxDQUNULElBRFMsRUFFVCxJQUZTLEVBR1QsS0FIUyxFQUlULElBSlMsRUFLVCxJQUxTLEVBTVQsS0FOUyxFQU9ULElBUFMsRUFRVCxLQVJTLEVBU1QsSUFUUyxFQVVULE1BVlMsRUFXVCxLQVhTLEVBWVQsSUFaUyxFQWFULEtBYlMsRUFjVCxJQWRTO0FBWFEsT0FBZCxDQUFQO0FBNEJEOzs7O0VBOUI4Q2pHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbmZqRDtBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixRQURvQixFQUVwQixRQUZvQixFQUdwQixnQkFIb0IsRUFJcEIsU0FKb0IsRUFLcEIsT0FMb0IsRUFNcEIsSUFOb0IsRUFPcEIsS0FQb0IsRUFRcEIsZUFSb0IsRUFTcEIsUUFUb0IsRUFVcEIsUUFWb0IsRUFXcEIsY0FYb0IsRUFZcEIsTUFab0IsRUFhcEIsVUFib0IsRUFjcEIsT0Fkb0IsRUFlcEIsTUFmb0IsRUFnQnBCLE9BaEJvQixFQWlCcEIsU0FqQm9CLEVBa0JwQixRQWxCb0IsRUFtQnBCLFlBbkJvQixFQW9CcEIsUUFwQm9CLEVBcUJwQixhQXJCb0IsRUFzQnBCLGNBdEJvQixFQXVCcEIsY0F2Qm9CLEVBd0JwQixtQkF4Qm9CLEVBeUJwQixjQXpCb0IsRUEwQnBCLGlCQTFCb0IsRUEyQnBCLFNBM0JvQixFQTRCcEIsWUE1Qm9CLEVBNkJwQixTQTdCb0IsRUE4QnBCLFFBOUJvQixFQStCcEIsT0EvQm9CLEVBZ0NwQixVQWhDb0IsRUFpQ3BCLE1BakNvQixFQWtDcEIsU0FsQ29CLEVBbUNwQixVQW5Db0IsRUFvQ3BCLElBcENvQixFQXFDcEIsTUFyQ29CLEVBc0NwQixhQXRDb0IsRUF1Q3BCLFFBdkNvQixFQXdDcEIsUUF4Q29CLEVBeUNwQixTQXpDb0IsRUEwQ3BCLFlBMUNvQixFQTJDcEIsS0EzQ29CLEVBNENwQixVQTVDb0IsRUE2Q3BCLE9BN0NvQixFQThDcEIsS0E5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFFBaERvQixFQWlEcEIsTUFqRG9CLEVBa0RwQixlQWxEb0IsRUFtRHBCLGVBbkRvQixFQW9EcEIsT0FwRG9CLEVBcURwQixNQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsUUF2RG9CLEVBd0RwQixPQXhEb0IsRUF5RHBCLFdBekRvQixFQTBEcEIsTUExRG9CLEVBMkRwQixTQTNEb0IsRUE0RHBCLFdBNURvQixFQTZEcEIsZ0JBN0RvQixFQThEcEIsS0E5RG9CLEVBK0RwQixNQS9Eb0IsRUFnRXBCLEtBaEVvQixFQWlFcEIsTUFqRW9CLEVBa0VwQixPQWxFb0IsRUFtRXBCLFVBbkVvQixFQW9FcEIsVUFwRW9CLEVBcUVwQixTQXJFb0IsRUFzRXBCLFNBdEVvQixFQXVFcEIsS0F2RW9CLEVBd0VwQixPQXhFb0IsRUF5RXBCLEtBekVvQixFQTBFcEIsU0ExRW9CLEVBMkVwQixRQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsSUE3RW9CLEVBOEVwQixNQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsT0FoRm9CLEVBaUZwQixVQWpGb0IsRUFrRnBCLFVBbEZvQixFQW1GcEIsV0FuRm9CLEVBb0ZwQixTQXBGb0IsRUFxRnBCLGFBckZvQixFQXNGcEIsU0F0Rm9CLEVBdUZwQixTQXZGb0IsRUF3RnBCLEtBeEZvQixFQXlGcEIsV0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLFlBM0ZvQixFQTRGcEIsV0E1Rm9CLEVBNkZwQixRQTdGb0IsRUE4RnBCLFNBOUZvQixFQStGcEIsY0EvRm9CLEVBZ0dwQixTQWhHb0IsRUFpR3BCLFNBakdvQixFQWtHcEIsUUFsR29CLEVBbUdwQixPQW5Hb0IsRUFvR3BCLEtBcEdvQixFQXFHcEIsTUFyR29CLEVBc0dwQixTQXRHb0IsRUF1R3BCLFNBdkdvQixFQXdHcEIsTUF4R29CLEVBeUdwQixXQXpHb0IsRUEwR3BCLElBMUdvQixFQTJHcEIsS0EzR29CLEVBNEdwQixVQTVHb0IsRUE2R3BCLE1BN0dvQixFQThHcEIsaUJBOUdvQixFQStHcEIsUUEvR29CLEVBZ0hwQixNQWhIb0IsRUFpSHBCLE9BakhvQixFQWtIcEIsU0FsSG9CLEVBbUhwQixRQW5Ib0IsRUFvSHBCLE1BcEhvQixFQXFIcEIsTUFySG9CLEVBc0hwQixTQXRIb0IsRUF1SHBCLFdBdkhvQixFQXdIcEIsU0F4SG9CLEVBeUhwQixVQXpIb0IsRUEwSHBCLGFBMUhvQixFQTJIcEIsTUEzSG9CLEVBNEhwQixRQTVIb0IsRUE2SHBCLFdBN0hvQixFQThIcEIsWUE5SG9CLEVBK0hwQixNQS9Ib0IsRUFnSXBCLE1BaElvQixFQWlJcEIsV0FqSW9CLEVBa0lwQixPQWxJb0IsRUFtSXBCLE1BbklvQixFQW9JcEIsTUFwSW9CLEVBcUlwQixTQXJJb0IsRUFzSXBCLEtBdElvQixFQXVJcEIsZUF2SW9CLEVBd0lwQixnQkF4SW9CLEVBeUlwQixjQXpJb0IsRUEwSXBCLFlBMUlvQixFQTJJcEIsYUEzSW9CLEVBNElwQixVQTVJb0IsRUE2SXBCLFFBN0lvQixFQThJcEIsY0E5SW9CLEVBK0lwQixZQS9Jb0IsRUFnSnBCLGtCQWhKb0IsRUFpSnBCLGNBakpvQixFQWtKcEIsU0FsSm9CLEVBbUpwQixjQW5Kb0IsRUFvSnBCLFNBcEpvQixFQXFKcEIsWUFySm9CLEVBc0pwQixZQXRKb0IsRUF1SnBCLGlCQXZKb0IsRUF3SnBCLFVBeEpvQixFQXlKcEIsWUF6Sm9CLEVBMEpwQixVQTFKb0IsRUEySnBCLFFBM0pvQixFQTRKcEIsWUE1Sm9CLEVBNkpwQixVQTdKb0IsRUE4SnBCLFFBOUpvQixFQStKcEIsVUEvSm9CLEVBZ0twQixzQkFoS29CLEVBaUtwQixLQWpLb0IsRUFrS3BCLGVBbEtvQixFQW1LcEIsZ0JBbktvQixFQW9LcEIsZUFwS29CLEVBcUtwQixtQkFyS29CLEVBc0twQixNQXRLb0IsRUF1S3BCLGNBdktvQixFQXdLcEIsT0F4S29CLEVBeUtwQixVQXpLb0IsRUEwS3BCLFlBMUtvQixFQTJLcEIsYUEzS29CLEVBNEtwQixZQTVLb0IsRUE2S3BCLFdBN0tvQixFQThLcEIsYUE5S29CLEVBK0twQixVQS9Lb0IsRUFnTHBCLFdBaExvQixFQWlMcEIsUUFqTG9CLEVBa0xwQixjQWxMb0IsRUFtTHBCLFlBbkxvQixFQW9McEIsWUFwTG9CLEVBcUxwQixRQXJMb0IsRUFzTHBCLFVBdExvQixFQXVMcEIsTUF2TG9CLEVBd0xwQixrQkF4TG9CLEVBeUxwQixjQXpMb0IsRUEwTHBCLE1BMUxvQixFQTJMcEIsTUEzTG9CLEVBNExwQixVQTVMb0IsRUE2THBCLHNCQTdMb0IsRUE4THBCLFVBOUxvQixFQStMcEIsUUEvTG9CLEVBZ01wQixTQWhNb0IsRUFpTXBCLFdBak1vQixFQWtNcEIsUUFsTW9CLEVBbU1wQixjQW5Nb0IsRUFvTXBCLFNBcE1vQixFQXFNcEIsS0FyTW9CLEVBc01wQixZQXRNb0IsRUF1TXBCLFlBdk1vQixFQXdNcEIsZUF4TW9CLEVBeU1wQixZQXpNb0IsRUEwTXBCLGlCQTFNb0IsRUEyTXBCLFVBM01vQixFQTRNcEIsY0E1TW9CLEVBNk1wQixnQkE3TW9CLEVBOE1wQixjQTlNb0IsRUErTXBCLFFBL01vQixFQWdOcEIsTUFoTm9CLEVBaU5wQixRQWpOb0IsRUFrTnBCLE1BbE5vQixFQW1OcEIsS0FuTm9CLENBQXRCO0FBc05BLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLGFBTDRCLEVBTTVCLFFBTjRCLEVBTzVCLE1BUDRCLEVBUTVCLFVBUjRCLEVBUzVCLFFBVDRCLEVBVTVCLGFBVjRCLEVBVzVCLFFBWDRCLEVBWTVCLFdBWjRCLEVBYTVCLEtBYjRCLEVBYzVCLE9BZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixVQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsb0JBbEI0QixFQW1CNUIsWUFuQjRCLEVBb0I1QixLQXBCNEIsRUFxQjVCLFdBckI0QixFQXNCNUIsT0F0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLFFBeEI0QixFQXlCNUIsT0F6QjRCLEVBMEI1QixRQTFCNEIsRUEyQjVCLE1BM0I0QixFQTRCNUIsUUE1QjRCLEVBNkI1QixTQTdCNEIsRUE4QjVCLFNBOUI0QixFQStCNUIsU0EvQjRCLEVBZ0M1QixTQWhDNEIsRUFpQzVCLFVBakM0QixFQWtDNUIsYUFsQzRCLEVBbUM1QixRQW5DNEIsRUFvQzVCLFdBcEM0QixFQXFDNUIsWUFyQzRCLEVBc0M1QixNQXRDNEIsRUF1QzVCLE1BdkM0QixFQXdDNUIsV0F4QzRCLEVBeUM1QixPQXpDNEIsRUEwQzVCLE1BMUM0QixFQTJDNUIsTUEzQzRCLEVBNEM1QixTQTVDNEIsRUE2QzVCLEtBN0M0QixFQThDNUIsZUE5QzRCLEVBK0M1QixnQkEvQzRCLEVBZ0Q1QixjQWhENEIsRUFpRDVCLFlBakQ0QixFQWtENUIsYUFsRDRCLEVBbUQ1QixVQW5ENEIsRUFvRDVCLFFBcEQ0QixFQXFENUIsY0FyRDRCLEVBc0Q1QixZQXRENEIsRUF1RDVCLGtCQXZENEIsRUF3RDVCLGNBeEQ0QixFQXlENUIsU0F6RDRCLEVBMEQ1QixjQTFENEIsRUEyRDVCLFNBM0Q0QixFQTRENUIsWUE1RDRCLEVBNkQ1QixZQTdENEIsRUE4RDVCLGlCQTlENEIsRUErRDVCLFVBL0Q0QixFQWdFNUIsWUFoRTRCLEVBaUU1QixVQWpFNEIsRUFrRTVCLFFBbEU0QixFQW1FNUIsWUFuRTRCLEVBb0U1QixVQXBFNEIsRUFxRTVCLFFBckU0QixFQXNFNUIsVUF0RTRCLEVBdUU1QixzQkF2RTRCLEVBd0U1QixLQXhFNEIsRUF5RTVCLGVBekU0QixFQTBFNUIsZ0JBMUU0QixFQTJFNUIsZUEzRTRCLEVBNEU1QixtQkE1RTRCLEVBNkU1QixNQTdFNEIsRUE4RTVCLGNBOUU0QixFQStFNUIsT0EvRTRCLEVBZ0Y1QixVQWhGNEIsRUFpRjVCLFlBakY0QixFQWtGNUIsYUFsRjRCLEVBbUY1QixZQW5GNEIsRUFvRjVCLFdBcEY0QixFQXFGNUIsYUFyRjRCLEVBc0Y1QixVQXRGNEIsRUF1RjVCLFdBdkY0QixFQXdGNUIsUUF4RjRCLEVBeUY1QixjQXpGNEIsRUEwRjVCLFlBMUY0QixFQTJGNUIsWUEzRjRCLEVBNEY1QixRQTVGNEIsRUE2RjVCLFVBN0Y0QixFQThGNUIsTUE5RjRCLEVBK0Y1QixrQkEvRjRCLEVBZ0c1QixjQWhHNEIsRUFpRzVCLE1Bakc0QixFQWtHNUIsTUFsRzRCLEVBbUc1QixVQW5HNEIsRUFvRzVCLHNCQXBHNEIsRUFxRzVCLFVBckc0QixFQXNHNUIsUUF0RzRCLEVBdUc1QixTQXZHNEIsRUF3RzVCLFdBeEc0QixFQXlHNUIsUUF6RzRCLEVBMEc1QixjQTFHNEIsRUEyRzVCLFNBM0c0QixFQTRHNUIsS0E1RzRCLEVBNkc1QixZQTdHNEIsRUE4RzVCLFlBOUc0QixFQStHNUIsZUEvRzRCLEVBZ0g1QixZQWhINEIsRUFpSDVCLGlCQWpINEIsRUFrSDVCLFVBbEg0QixFQW1INUIsY0FuSDRCLEVBb0g1QixnQkFwSDRCLEVBcUg1QixjQXJINEIsQ0FBOUI7QUF3SEEsSUFBTUUsNkJBQTZCLEdBQUcsRUFBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixZQUYyQixFQUczQixNQUgyQixFQUkzQixZQUoyQixFQUszQixNQUwyQixFQU0zQixXQU4yQixFQU8zQixpQkFQMkIsRUFRM0IsSUFSMkIsRUFTM0IsYUFUMkIsRUFVM0IsWUFWMkIsRUFXM0IsWUFYMkIsRUFZM0Isa0JBWjJCLEVBYTNCLE1BYjJCLEVBYzNCLFFBZDJCLEVBZTNCLE1BZjJCLEVBZ0IzQixRQWhCMkIsRUFpQjNCLFNBakIyQixFQWtCM0IsU0FsQjJCLEVBbUIzQixTQW5CMkIsRUFvQjNCLFNBcEIyQixFQXFCM0IsVUFyQjJCLEVBc0IzQixhQXRCMkIsQ0FBN0I7O0lBeUJxQjJGLG9COzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJekcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsQ0FOTztBQU9uQkUsbUJBQVcsRUFBRSxDQUFDLEdBQUQsQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQ7QUFWQyxPQUFkLENBQVA7QUFZRDs7OztFQWQrQ3BHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1V2xEO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTTRHLGFBQWEsR0FBRyxDQUNwQixLQURvQixFQUVwQixPQUZvQixFQUdwQixTQUhvQixFQUlwQixTQUpvQixFQUtwQixXQUxvQixFQU1wQixPQU5vQixFQU9wQixJQVBvQixFQVFwQixLQVJvQixFQVNwQixLQVRvQixFQVVwQixTQVZvQixFQVdwQixTQVhvQixFQVlwQixNQVpvQixFQWFwQixNQWJvQixFQWNwQixVQWRvQixFQWVwQixjQWZvQixFQWdCcEIsYUFoQm9CLEVBaUJwQixRQWpCb0IsRUFrQnBCLFNBbEJvQixFQW1CcEIsU0FuQm9CLEVBb0JwQixZQXBCb0IsRUFxQnBCLFVBckJvQixFQXNCcEIsU0F0Qm9CLEVBdUJwQixPQXZCb0IsRUF3QnBCLFdBeEJvQixFQXlCcEIsYUF6Qm9CLEVBMEJwQixjQTFCb0IsRUEyQnBCLG1CQTNCb0IsRUE0QnBCLFVBNUJvQixFQTZCcEIsV0E3Qm9CLEVBOEJwQixVQTlCb0IsRUErQnBCLFVBL0JvQixFQWdDcEIsWUFoQ29CLEVBaUNwQixVQWpDb0IsRUFrQ3BCLFlBbENvQixFQW1DcEIsWUFuQ29CLEVBb0NwQixLQXBDb0IsRUFxQ3BCLE1BckNvQixFQXNDcEIsUUF0Q29CLEVBdUNwQixTQXZDb0IsRUF3Q3BCLFFBeENvQixFQXlDcEIsWUF6Q29CLEVBMENwQixNQTFDb0IsRUEyQ3BCLFVBM0NvQixFQTRDcEIsVUE1Q29CLEVBNkNwQixhQTdDb0IsRUE4Q3BCLEtBOUNvQixFQStDcEIsTUEvQ29CLEVBZ0RwQixNQWhEb0IsRUFpRHBCLFFBakRvQixFQWtEcEIsS0FsRG9CLEVBbURwQixRQW5Eb0IsRUFvRHBCLFNBcERvQixFQXFEcEIsZUFyRG9CLEVBc0RwQixTQXREb0IsRUF1RHBCLFFBdkRvQixFQXdEcEIsYUF4RG9CLEVBeURwQixPQXpEb0IsRUEwRHBCLE9BMURvQixFQTJEcEIsU0EzRG9CLEVBNERwQixXQTVEb0IsRUE2RHBCLGVBN0RvQixFQThEcEIsTUE5RG9CLEVBK0RwQixVQS9Eb0IsRUFnRXBCLGNBaEVvQixFQWlFcEIsYUFqRW9CLEVBa0VwQixhQWxFb0IsRUFtRXBCLE1BbkVvQixFQW9FcEIsT0FwRW9CLEVBcUVwQixJQXJFb0IsRUFzRXBCLFFBdEVvQixFQXVFcEIsSUF2RW9CLEVBd0VwQixRQXhFb0IsRUF5RXBCLFVBekVvQixFQTBFcEIsTUExRW9CLEVBMkVwQixJQTNFb0IsRUE0RXBCLEtBNUVvQixFQTZFcEIsWUE3RW9CLEVBOEVwQixNQTlFb0IsRUErRXBCLE1BL0VvQixFQWdGcEIsU0FoRm9CLEVBaUZwQixPQWpGb0IsRUFrRnBCLE9BbEZvQixFQW1GcEIsTUFuRm9CLEVBb0ZwQixLQXBGb0IsRUFxRnBCLE9BckZvQixFQXNGcEIsS0F0Rm9CLEVBdUZwQixlQXZGb0IsRUF3RnBCLFFBeEZvQixFQXlGcEIsT0F6Rm9CLEVBMEZwQixTQTFGb0IsRUEyRnBCLEtBM0ZvQixFQTRGcEIsT0E1Rm9CLEVBNkZwQixPQTdGb0IsRUE4RnBCLE1BOUZvQixFQStGcEIsUUEvRm9CLEVBZ0dwQixRQWhHb0IsRUFpR3BCLFdBakdvQixFQWtHcEIsV0FsR29CLEVBbUdwQixJQW5Hb0IsRUFvR3BCLE1BcEdvQixFQXFHcEIsVUFyR29CLEVBc0dwQixNQXRHb0IsRUF1R3BCLGNBdkdvQixFQXdHcEIsV0F4R29CLEVBeUdwQixPQXpHb0IsRUEwR3BCLE1BMUdvQixFQTJHcEIsUUEzR29CLEVBNEdwQixRQTVHb0IsRUE2R3BCLE9BN0dvQixFQThHcEIsS0E5R29CLEVBK0dwQixNQS9Hb0IsRUFnSHBCLFFBaEhvQixFQWlIcEIsV0FqSG9CLEVBa0hwQixVQWxIb0IsRUFtSHBCLE1BbkhvQixFQW9IcEIsUUFwSG9CLEVBcUhwQixRQXJIb0IsRUFzSHBCLEtBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixRQXhIb0IsRUF5SHBCLFdBekhvQixFQTBIcEIsTUExSG9CLEVBMkhwQixTQTNIb0IsRUE0SHBCLFNBNUhvQixFQTZIcEIsSUE3SG9CLEVBOEhwQixVQTlIb0IsRUErSHBCLFdBL0hvQixFQWdJcEIsTUFoSW9CLEVBaUlwQixVQWpJb0IsRUFrSXBCLE1BbElvQixFQW1JcEIsT0FuSW9CLEVBb0lwQixXQXBJb0IsRUFxSXBCLFFBcklvQixFQXNJcEIsZ0JBdElvQixFQXVJcEIsUUF2SW9CLEVBd0lwQixVQXhJb0IsRUF5SXBCLE9BeklvQixFQTBJcEIsV0ExSW9CLEVBMklwQixNQTNJb0IsRUE0SXBCLE1BNUlvQixFQTZJcEIsTUE3SW9CLEVBOElwQixZQTlJb0IsQ0FBdEI7QUFpSkEsSUFBTU4scUJBQXFCLEdBQUcsQ0FDNUIsS0FENEIsRUFFNUIsT0FGNEIsRUFHNUIsY0FINEIsRUFJNUIsZ0JBSjRCLEVBSzVCLGNBTDRCLEVBTTVCLGFBTjRCLEVBTzVCLFlBUDRCLEVBUTVCLGNBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLGVBVjRCLEVBVzVCLE1BWDRCLEVBWTVCLFVBWjRCLEVBYTVCLFFBYjRCLEVBYzVCLGFBZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixPQWhCNEIsRUFpQjVCLFNBakI0QixFQWtCNUIsVUFsQjRCLEVBbUI1QixjQW5CNEIsRUFvQjVCLGdCQXBCNEIsRUFxQjVCLE9BckI0QixFQXNCNUIsTUF0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLG9CQXhCNEIsRUF5QjVCLFlBekI0QixFQTBCNUIsS0ExQjRCLEVBMkI1QixlQTNCNEIsRUE0QjVCLFFBNUI0QixFQTZCNUIsT0E3QjRCLEVBOEI1QixRQTlCNEIsRUErQjVCLE9BL0I0QixFQWdDNUIsUUFoQzRCLENBQTlCO0FBbUNBLElBQU1FLDZCQUE2QixHQUFHLENBQ3BDLFlBRG9DLEVBRXBDLFFBRm9DLEVBR3BDLGVBSG9DLEVBSXBDLFdBSm9DLEVBS3BDLFdBTG9DLEVBTXBDLE9BTm9DLENBQXRDO0FBU0EsSUFBTUUsb0JBQW9CLEdBQUcsQ0FDM0IsS0FEMkIsRUFFM0IsV0FGMkIsRUFHM0IsV0FIMkIsRUFJM0IsUUFKMkIsRUFLM0IsWUFMMkIsRUFNM0IsTUFOMkIsRUFPM0IsaUJBUDJCLEVBUTNCLFlBUjJCLEVBUzNCLE1BVDJCLEVBVTNCLGNBVjJCLEVBVzNCLGdCQVgyQixFQVkzQixXQVoyQixFQWEzQixpQkFiMkIsRUFjM0IsZ0JBZDJCLEVBZTNCLG1CQWYyQixFQWdCM0IseUJBaEIyQixFQWlCM0Isb0JBakIyQixFQWtCM0IsY0FsQjJCLEVBbUIzQix3QkFuQjJCLEVBb0IzQix5QkFwQjJCLEVBcUIzQix3QkFyQjJCLEVBc0IzQixvQkF0QjJCLEVBdUIzQiwwQkF2QjJCLEVBd0IzQix5QkF4QjJCLEVBeUIzQixtQkF6QjJCLEVBMEIzQixJQTFCMkIsRUEyQjNCLGFBM0IyQixFQTRCM0IsWUE1QjJCLEVBNkIzQixZQTdCMkIsRUE4QjNCLGtCQTlCMkIsRUErQjNCLGlCQS9CMkIsRUFnQzNCLFdBaEMyQixFQWlDM0IsTUFqQzJCLEVBa0MzQixLQWxDMkIsQ0FBN0I7O0lBcUNxQjRGLGlCOzs7Ozs7Ozs7Ozs7O2dDQUNQO0FBQ1YsYUFBTyxJQUFJMUcsdURBQUosQ0FBYztBQUNuQmdCLHFCQUFhLEVBQWJBLGFBRG1CO0FBRW5CTiw2QkFBcUIsRUFBckJBLHFCQUZtQjtBQUduQkksNEJBQW9CLEVBQXBCQSxvQkFIbUI7QUFJbkJGLHFDQUE2QixFQUE3QkEsNkJBSm1CO0FBS25CUSxtQkFBVyxFQUFFLFNBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FMTTtBQU1uQkUsa0JBQVUsRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBTk87QUFPbkJFLG1CQUFXLEVBQUUsQ0FBQyxHQUFELEVBQU0sS0FBTixDQVBNO0FBUW5CRSwrQkFBdUIsRUFBRSxDQUFDLEdBQUQsQ0FSTjtBQVNuQkUsNkJBQXFCLEVBQUUsQ0FBQyxHQUFELENBVEo7QUFVbkJwQix3QkFBZ0IsRUFBRSxDQUFDLElBQUQ7QUFWQyxPQUFkLENBQVA7QUFZRDs7O2tDQUVhdkYsSyxFQUFPO0FBQ25CO0FBQ0EsVUFBSWlMLDREQUFRLENBQUNqTCxLQUFELENBQVosRUFBcUI7QUFDbkIsWUFBTTBMLFVBQVUsR0FBRyxLQUFLQyxjQUFMLEVBQW5COztBQUNBLFlBQUlELFVBQVUsSUFBSUEsVUFBVSxDQUFDakwsSUFBWCxLQUFvQkMsd0RBQVUsQ0FBQ2EsVUFBakQsRUFBNkQ7QUFDM0Q7QUFDQSxpQkFBTztBQUFFZCxnQkFBSSxFQUFFQyx3REFBVSxDQUFDVyxRQUFuQjtBQUE2QlEsaUJBQUssRUFBRTdCLEtBQUssQ0FBQzZCO0FBQTFDLFdBQVA7QUFDRDtBQUNGLE9BUmtCLENBVW5COzs7QUFDQSxVQUFJcUoseURBQUssQ0FBQ2xMLEtBQUQsQ0FBVCxFQUFrQjtBQUNoQixZQUFNNEwsU0FBUyxHQUFHLEtBQUsvSSxlQUFMLEVBQWxCOztBQUNBLFlBQUkrSSxTQUFTLElBQUlBLFNBQVMsQ0FBQ25MLElBQVYsS0FBbUJDLHdEQUFVLENBQUNzQyxRQUEzQyxJQUF1RDRJLFNBQVMsQ0FBQy9KLEtBQVYsS0FBb0IsR0FBL0UsRUFBb0Y7QUFDbEY7QUFDQSxpQkFBTztBQUFFcEIsZ0JBQUksRUFBRUMsd0RBQVUsQ0FBQ3lJLElBQW5CO0FBQXlCdEgsaUJBQUssRUFBRTdCLEtBQUssQ0FBQzZCO0FBQXRDLFdBQVA7QUFDRDtBQUNGOztBQUVELGFBQU83QixLQUFQO0FBQ0Q7Ozs7RUFwQzRDYix1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZPL0M7QUFDQTtBQUVBLElBQU00RyxhQUFhLEdBQUcsQ0FDcEIsWUFEb0IsRUFFcEIsUUFGb0IsRUFHcEIsU0FIb0IsRUFJcEIsV0FKb0IsRUFLcEIsV0FMb0IsRUFNcEIsS0FOb0IsRUFPcEIsT0FQb0IsRUFRcEIsU0FSb0IsRUFTcEIsU0FUb0IsRUFVcEIsSUFWb0IsRUFXcEIsS0FYb0IsRUFZcEIsWUFab0IsRUFhcEIsZ0JBYm9CLEVBY3BCLFFBZG9CLEVBZXBCLE9BZm9CLEVBZ0JwQixTQWhCb0IsRUFpQnBCLFFBakJvQixFQWtCcEIsTUFsQm9CLEVBbUJwQixTQW5Cb0IsRUFvQnBCLFFBcEJvQixFQXFCcEIsU0FyQm9CLEVBc0JwQixlQXRCb0IsRUF1QnBCLFNBdkJvQixFQXdCcEIsT0F4Qm9CLEVBeUJwQixVQXpCb0IsRUEwQnBCLFNBMUJvQixFQTJCcEIsV0EzQm9CLEVBNEJwQixRQTVCb0IsRUE2QnBCLFNBN0JvQixFQThCcEIsU0E5Qm9CLEVBK0JwQixRQS9Cb0IsRUFnQ3BCLFdBaENvQixFQWlDcEIsWUFqQ29CLEVBa0NwQixZQWxDb0IsRUFtQ3BCLFlBbkNvQixFQW9DcEIsVUFwQ29CLEVBcUNwQixTQXJDb0IsRUFzQ3BCLFFBdENvQixFQXVDcEIsT0F2Q29CLEVBd0NwQixtQkF4Q29CLEVBeUNwQixVQXpDb0IsRUEwQ3BCLFdBMUNvQixFQTJDcEIsS0EzQ29CLEVBNENwQixVQTVDb0IsRUE2Q3BCLFlBN0NvQixFQThDcEIsWUE5Q29CLEVBK0NwQixTQS9Db0IsRUFnRHBCLFNBaERvQixFQWlEcEIsU0FqRG9CLEVBa0RwQixRQWxEb0IsRUFtRHBCLE1BbkRvQixFQW9EcEIsVUFwRG9CLEVBcURwQixlQXJEb0IsRUFzRHBCLFVBdERvQixFQXVEcEIsYUF2RG9CLEVBd0RwQixLQXhEb0IsRUF5RHBCLElBekRvQixFQTBEcEIsTUExRG9CLEVBMkRwQixVQTNEb0IsRUE0RHBCLFdBNURvQixFQTZEcEIsU0E3RG9CLEVBOERwQixNQTlEb0IsRUErRHBCLFVBL0RvQixFQWdFcEIsUUFoRW9CLEVBaUVwQixTQWpFb0IsRUFrRXBCLGFBbEVvQixFQW1FcEIsUUFuRW9CLEVBb0VwQixTQXBFb0IsRUFxRXBCLFFBckVvQixFQXNFcEIsTUF0RW9CLEVBdUVwQixTQXZFb0IsRUF3RXBCLFFBeEVvQixFQXlFcEIsU0F6RW9CLEVBMEVwQixVQTFFb0IsRUEyRXBCLE1BM0VvQixFQTRFcEIsT0E1RW9CLEVBNkVwQixRQTdFb0IsRUE4RXBCLE1BOUVvQixFQStFcEIsT0EvRW9CLEVBZ0ZwQixPQWhGb0IsRUFpRnBCLE9BakZvQixFQWtGcEIsS0FsRm9CLEVBbUZwQixPQW5Gb0IsRUFvRnBCLFNBcEZvQixFQXFGcEIsTUFyRm9CLEVBc0ZwQixVQXRGb0IsRUF1RnBCLFVBdkZvQixFQXdGcEIsUUF4Rm9CLEVBeUZwQixPQXpGb0IsRUEwRnBCLFFBMUZvQixFQTJGcEIsY0EzRm9CLEVBNEZwQixNQTVGb0IsRUE2RnBCLGVBN0ZvQixFQThGcEIsT0E5Rm9CLEVBK0ZwQixNQS9Gb0IsRUFnR3BCLGFBaEdvQixFQWlHcEIsYUFqR29CLEVBa0dwQixZQWxHb0IsRUFtR3BCLElBbkdvQixFQW9HcEIsUUFwR29CLEVBcUdwQixRQXJHb0IsRUFzR3BCLElBdEdvQixFQXVHcEIsT0F2R29CLEVBd0dwQixTQXhHb0IsRUF5R3BCLFFBekdvQixFQTBHcEIsUUExR29CLEVBMkdwQixXQTNHb0IsRUE0R3BCLGVBNUdvQixFQTZHcEIsVUE3R29CLEVBOEdwQixNQTlHb0IsRUErR3BCLFNBL0dvQixFQWdIcEIsSUFoSG9CLEVBaUhwQixXQWpIb0IsRUFrSHBCLEtBbEhvQixFQW1IcEIsTUFuSG9CLEVBb0hwQixNQXBIb0IsRUFxSHBCLGdCQXJIb0IsRUFzSHBCLFNBdEhvQixFQXVIcEIsT0F2SG9CLEVBd0hwQixNQXhIb0IsRUF5SHBCLFFBekhvQixFQTBIcEIsT0ExSG9CLEVBMkhwQixNQTNIb0IsRUE0SHBCLE9BNUhvQixFQTZIcEIsTUE3SG9CLEVBOEhwQixPQTlIb0IsRUErSHBCLE1BL0hvQixFQWdJcEIsY0FoSW9CLEVBaUlwQixPQWpJb0IsRUFrSXBCLFFBbElvQixFQW1JcEIsc0JBbklvQixFQW9JcEIsYUFwSW9CLEVBcUlwQixpQkFySW9CLEVBc0lwQixPQXRJb0IsRUF1SXBCLDBCQXZJb0IsRUF3SXBCLHNCQXhJb0IsRUF5SXBCLFVBeklvQixFQTBJcEIsc0JBMUlvQixFQTJJcEIsc0JBM0lvQixFQTRJcEIsUUE1SW9CLEVBNklwQixPQTdJb0IsRUE4SXBCLFFBOUlvQixFQStJcEIsZUEvSW9CLEVBZ0pwQixVQWhKb0IsRUFpSnBCLE1BakpvQixFQWtKcEIsUUFsSm9CLEVBbUpwQixPQW5Kb0IsRUFvSnBCLFlBcEpvQixFQXFKcEIsUUFySm9CLEVBc0pwQixPQXRKb0IsRUF1SnBCLFNBdkpvQixFQXdKcEIsS0F4Sm9CLEVBeUpwQixPQXpKb0IsRUEwSnBCLE1BMUpvQixFQTJKcEIsUUEzSm9CLEVBNEpwQixXQTVKb0IsRUE2SnBCLFdBN0pvQixFQThKcEIsSUE5Sm9CLEVBK0pwQixNQS9Kb0IsRUFnS3BCLE1BaEtvQixFQWlLcEIsVUFqS29CLEVBa0twQixRQWxLb0IsRUFtS3BCLFlBbktvQixFQW9LcEIsU0FwS29CLEVBcUtwQixXQXJLb0IsRUFzS3BCLE1BdEtvQixFQXVLcEIsU0F2S29CLEVBd0twQixXQXhLb0IsRUF5S3BCLFlBektvQixFQTBLcEIsVUExS29CLEVBMktwQixTQTNLb0IsRUE0S3BCLFlBNUtvQixFQTZLcEIsV0E3S29CLEVBOEtwQixTQTlLb0IsRUErS3BCLGFBL0tvQixFQWdMcEIsT0FoTG9CLEVBaUxwQixPQWpMb0IsRUFrTHBCLE9BbExvQixFQW1McEIsYUFuTG9CLEVBb0xwQixnQkFwTG9CLEVBcUxwQixXQXJMb0IsRUFzTHBCLE9BdExvQixFQXVMcEIsTUF2TG9CLEVBd0xwQixXQXhMb0IsRUF5THBCLFlBekxvQixFQTBMcEIsWUExTG9CLEVBMkxwQixRQTNMb0IsRUE0THBCLFFBNUxvQixFQTZMcEIsUUE3TG9CLEVBOExwQixRQTlMb0IsRUErTHBCLFlBL0xvQixFQWdNcEIsU0FoTW9CLEVBaU1wQixhQWpNb0IsRUFrTXBCLE9BbE1vQixFQW1NcEIsU0FuTW9CLEVBb01wQixVQXBNb0IsRUFxTXBCLFFBck1vQixFQXNNcEIsU0F0TW9CLEVBdU1wQixRQXZNb0IsRUF3TXBCLE9BeE1vQixFQXlNcEIsVUF6TW9CLEVBME1wQixLQTFNb0IsRUEyTXBCLE1BM01vQixFQTRNcEIsWUE1TW9CLEVBNk1wQixRQTdNb0IsRUE4TXBCLFVBOU1vQixFQStNcEIsV0EvTW9CLEVBZ05wQixjQWhOb0IsRUFpTnBCLFNBak5vQixFQWtOcEIsT0FsTm9CLEVBbU5wQixNQW5Ob0IsRUFvTnBCLFVBcE5vQixFQXFOcEIsT0FyTm9CLEVBc05wQixRQXROb0IsRUF1TnBCLFFBdk5vQixFQXdOcEIsS0F4Tm9CLEVBeU5wQixrQkF6Tm9CLEVBME5wQixnQkExTm9CLEVBMk5wQixpQkEzTm9CLEVBNE5wQixnQkE1Tm9CLEVBNk5wQixtQkE3Tm9CLEVBOE5wQixXQTlOb0IsRUErTnBCLHFCQS9Ob0IsRUFnT3BCLGFBaE9vQixFQWlPcEIsYUFqT29CLEVBa09wQixnQkFsT29CLEVBbU9wQiwwQkFuT29CLEVBb09wQixtQkFwT29CLEVBcU9wQixjQXJPb0IsRUFzT3BCLHVCQXRPb0IsRUF1T3BCLGtCQXZPb0IsRUF3T3BCLGtCQXhPb0IsRUF5T3BCLHdCQXpPb0IsRUEwT3BCLGtCQTFPb0IsRUEyT3BCLGNBM09vQixFQTRPcEIsT0E1T29CLEVBNk9wQixVQTdPb0IsRUE4T3BCLFFBOU9vQixFQStPcEIsTUEvT29CLEVBZ1BwQixTQWhQb0IsRUFpUHBCLGVBalBvQixFQWtQcEIsUUFsUG9CLEVBbVBwQixTQW5Qb0IsRUFvUHBCLE9BcFBvQixFQXFQcEIsT0FyUG9CLEVBc1BwQixRQXRQb0IsRUF1UHBCLFdBdlBvQixFQXdQcEIsWUF4UG9CLEVBeVBwQixNQXpQb0IsRUEwUHBCLElBMVBvQixFQTJQcEIsVUEzUG9CLEVBNFBwQixlQTVQb0IsRUE2UHBCLE1BN1BvQixFQThQcEIsVUE5UG9CLEVBK1BwQixNQS9Qb0IsRUFnUXBCLE9BaFFvQixFQWlRcEIsYUFqUW9CLEVBa1FwQixRQWxRb0IsRUFtUXBCLFFBblFvQixFQW9RcEIsVUFwUW9CLEVBcVFwQixPQXJRb0IsRUFzUXBCLEtBdFFvQixFQXVRcEIsT0F2UW9CLEVBd1FwQixXQXhRb0IsRUF5UXBCLE1BelFvQixFQTBRcEIsTUExUW9CLEVBMlFwQixNQTNRb0IsRUE0UXBCLE9BNVFvQixFQTZRcEIsWUE3UW9CLENBQXRCO0FBZ1JBLElBQU1OLHFCQUFxQixHQUFHLENBQzVCLEtBRDRCLEVBRTVCLE9BRjRCLEVBRzVCLGNBSDRCLEVBSTVCLGFBSjRCLEVBSzVCLE1BTDRCLEVBTTVCLGFBTjRCLEVBTzVCLEtBUDRCLEVBUTVCLFFBUjRCLEVBUzVCLGFBVDRCLEVBVTVCLE1BVjRCLEVBVzVCLFVBWDRCLEVBWTVCLElBWjRCLEVBYTVCLFFBYjRCLEVBYzVCLGFBZDRCLEVBZTVCLFFBZjRCLEVBZ0I1QixPQWhCNEIsRUFpQjVCLFFBakI0QixFQWtCNUIsVUFsQjRCLEVBbUI1QixRQW5CNEIsRUFvQjVCLG9CQXBCNEIsRUFxQjVCLFlBckI0QixFQXNCNUIsS0F0QjRCLEVBdUI1QixRQXZCNEIsRUF3QjVCLFFBeEI0QixFQXlCNUIsT0F6QjRCLENBQTlCO0FBNEJBLElBQU1FLDZCQUE2QixHQUFHLENBQUMsV0FBRCxFQUFjLGVBQWQsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsV0FBakQsQ0FBdEM7QUFFQSxJQUFNRSxvQkFBb0IsR0FBRyxDQUMzQixLQUQyQixFQUUzQixhQUYyQixFQUczQixZQUgyQixFQUkzQixNQUoyQixFQUszQixZQUwyQixFQU0zQixNQU4yQixFQU8zQixXQVAyQixFQVEzQixpQkFSMkIsRUFTM0IsSUFUMkIsRUFVM0IsYUFWMkIsRUFXM0IsWUFYMkIsRUFZM0IsWUFaMkIsRUFhM0Isa0JBYjJCLEVBYzNCLE1BZDJCLEVBZTNCLEtBZjJCLENBQTdCOztJQWtCcUIyRixvQjs7Ozs7Ozs7Ozs7OztnQ0FDUDtBQUNWLGFBQU8sSUFBSXpHLHVEQUFKLENBQWM7QUFDbkJnQixxQkFBYSxFQUFiQSxhQURtQjtBQUVuQk4sNkJBQXFCLEVBQXJCQSxxQkFGbUI7QUFHbkJJLDRCQUFvQixFQUFwQkEsb0JBSG1CO0FBSW5CRixxQ0FBNkIsRUFBN0JBLDZCQUptQjtBQUtuQlEsbUJBQVcsRUFBRSxTQUFPLEtBQVAsRUFBYyxJQUFkLEVBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBTE07QUFNbkJFLGtCQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixDQU5PO0FBT25CRSxtQkFBVyxFQUFFLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FQTTtBQVFuQkUsK0JBQXVCLEVBQUUsQ0FBQyxHQUFELENBUk47QUFTbkJFLDZCQUFxQixFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FUSjtBQVVuQnBCLHdCQUFnQixFQUFFLENBQUMsR0FBRCxFQUFNLElBQU47QUFWQyxPQUFkLENBQVA7QUFZRDs7OztFQWQrQ3BHLHVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuVWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNME0sVUFBVSxHQUFHO0FBQ2pCQyxLQUFHLEVBQUVYLCtEQURZO0FBRWpCWSxTQUFPLEVBQUVYLG1FQUZRO0FBR2pCWSxNQUFJLEVBQUVYLGdFQUhXO0FBSWpCLFlBQVVDLGlFQUpPO0FBS2pCVyxPQUFLLEVBQUVYLGlFQUxVO0FBTWpCWSxZQUFVLEVBQUVYLHNFQU5LO0FBT2pCWSxVQUFRLEVBQUVDLG9FQVBPO0FBUWpCQyxPQUFLLEVBQUVaLG9FQVJVO0FBU2pCYSxLQUFHLEVBQUVkLHVFQUFvQkE7QUFUUixDQUFuQjtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxJQUFNZSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFDdE0sS0FBRCxFQUFxQjtBQUFBLE1BQWJiLEdBQWEsdUVBQVAsRUFBTzs7QUFDekMsTUFBSSxPQUFPYSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLFVBQU0sSUFBSUYsS0FBSixDQUFVLGtFQUFpRUUsS0FBakUsQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsTUFBSWQsU0FBUyxHQUFHcU0sdUVBQWhCOztBQUNBLE1BQUlwTSxHQUFHLENBQUNvTixRQUFKLEtBQWlCMUQsU0FBckIsRUFBZ0M7QUFDOUIzSixhQUFTLEdBQUcwTSxVQUFVLENBQUN6TSxHQUFHLENBQUNvTixRQUFMLENBQXRCO0FBQ0Q7O0FBQ0QsTUFBSXJOLFNBQVMsS0FBSzJKLFNBQWxCLEVBQTZCO0FBQzNCLFVBQU0vSSxLQUFLLG9DQUE2QlgsR0FBRyxDQUFDb04sUUFBakMsRUFBWDtBQUNEOztBQUNELFNBQU8sSUFBSXJOLFNBQUosQ0FBY0MsR0FBZCxFQUFtQm1OLE1BQW5CLENBQTBCdE0sS0FBMUIsQ0FBUDtBQUNELENBYk07QUFlQSxJQUFNd00saUJBQWlCLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZZCxVQUFaLENBQTFCLEM7Ozs7Ozs7Ozs7OztBQ2hEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNPLElBQU0xSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUN5SixHQUFEO0FBQUEsU0FBU0EsR0FBRyxDQUFDdEssT0FBSixDQUFZLFNBQVosRUFBd0IsRUFBeEIsQ0FBVDtBQUFBLENBQXRCLEMsQ0FFUDs7QUFDTyxJQUFNZ0MsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQ3VJLEdBQUQ7QUFBQSxTQUFTQSxHQUFHLENBQUNBLEdBQUcsQ0FBQzNKLE1BQUosR0FBYSxDQUFkLENBQVo7QUFBQSxDQUFiLEMsQ0FFUDs7QUFDTyxJQUFNeUgsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ2tDLEdBQUQ7QUFBQSxTQUFTLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUQsSUFBdUJBLEdBQUcsQ0FBQzNKLE1BQUosS0FBZSxDQUEvQztBQUFBLENBQWhCLEMsQ0FFUDs7QUFDTyxJQUFNMEYsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQzlGLE1BQUQ7QUFBQSxTQUFZQSxNQUFNLENBQUNSLE9BQVAsQ0FBZSwwQkFBZixFQUF1QyxNQUF2QyxDQUFaO0FBQUEsQ0FBckIsQyxDQUVQO0FBQ0E7O0FBQ08sSUFBTWdILGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQzBELE9BQUQ7QUFBQSxTQUM5QkEsT0FBTyxDQUFDQyxJQUFSLENBQWEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDckIsV0FBT0EsQ0FBQyxDQUFDakssTUFBRixHQUFXZ0ssQ0FBQyxDQUFDaEssTUFBYixJQUF1QmdLLENBQUMsQ0FBQ0UsYUFBRixDQUFnQkQsQ0FBaEIsQ0FBOUI7QUFDRCxHQUZELENBRDhCO0FBQUEsQ0FBekIsQyIsImZpbGUiOiJzcWwtZm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic3FsRm9ybWF0dGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInNxbEZvcm1hdHRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc3FsRm9ybWF0dGVyLmpzXCIpO1xuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCBJbmRlbnRhdGlvbiBmcm9tICcuL0luZGVudGF0aW9uJztcbmltcG9ydCBJbmxpbmVCbG9jayBmcm9tICcuL0lubGluZUJsb2NrJztcbmltcG9ydCBQYXJhbXMgZnJvbSAnLi9QYXJhbXMnO1xuaW1wb3J0IHsgdHJpbVNwYWNlc0VuZCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGlzQW5kLCBpc0JldHdlZW4sIGlzTGltaXQgfSBmcm9tICcuL3Rva2VuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0dGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nfSBjZmcubGFuZ3VhZ2VcbiAgICogIEBwYXJhbSB7U3RyaW5nfSBjZmcuaW5kZW50XG4gICAqICBAcGFyYW0ge0Jvb2xlYW59IGNmZy51cHBlcmNhc2VcbiAgICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXNcbiAgICogIEBwYXJhbSB7T2JqZWN0fSBjZmcucGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZmcpIHtcbiAgICB0aGlzLmNmZyA9IGNmZztcbiAgICB0aGlzLmluZGVudGF0aW9uID0gbmV3IEluZGVudGF0aW9uKHRoaXMuY2ZnLmluZGVudCk7XG4gICAgdGhpcy5pbmxpbmVCbG9jayA9IG5ldyBJbmxpbmVCbG9jaygpO1xuICAgIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtcyh0aGlzLmNmZy5wYXJhbXMpO1xuICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0ge307XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTUUwgVG9rZW5pemVyIGZvciB0aGlzIGZvcm1hdHRlciwgcHJvdmlkZWQgYnkgc3ViY2xhc3Nlcy5cbiAgICovXG4gIHRva2VuaXplcigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rva2VuaXplcigpIG5vdCBpbXBsZW1lbnRlZCBieSBzdWJjbGFzcycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJvY2VzcyBhbmQgbW9kaWZ5IGEgdG9rZW4gYmFzZWQgb24gcGFyc2VkIGNvbnRleHQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbiBUaGUgdG9rZW4gdG8gbW9kaWZ5XG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqIEByZXR1cm4ge09iamVjdH0gbmV3IHRva2VuIG9yIHRoZSBvcmlnaW5hbFxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqL1xuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgLy8gc3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBtb2RpZnkgdG9rZW5zIGR1cmluZyBmb3JtYXR0aW5nXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgd2hpdGVzcGFjZSBpbiBhIFNRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBTUUwgcXVlcnkgc3RyaW5nXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIHF1ZXJ5XG4gICAqL1xuICBmb3JtYXQocXVlcnkpIHtcbiAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5pemVyKCkudG9rZW5pemUocXVlcnkpO1xuICAgIGNvbnN0IGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5nZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWRRdWVyeS50cmltKCk7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKSB7XG4gICAgbGV0IGZvcm1hdHRlZFF1ZXJ5ID0gJyc7XG5cbiAgICB0aGlzLnRva2Vucy5mb3JFYWNoKCh0b2tlbiwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcblxuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuT3ZlcnJpZGUodG9rZW4pO1xuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdExpbmVDb21tZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXROZXdsaW5lUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRPcGVuaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q2xvc2luZ1BhcmVudGhlc2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUExBQ0VIT0xERVIpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnLCcpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdENvbW1hKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnOicpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc7Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5O1xuICB9XG5cbiAgZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSArIHRoaXMuc2hvdyh0b2tlbikpO1xuICB9XG5cbiAgZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUodGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuaW5kZW50Q29tbWVudCh0b2tlbi52YWx1ZSkpO1xuICB9XG5cbiAgaW5kZW50Q29tbWVudChjb21tZW50KSB7XG4gICAgcmV0dXJuIGNvbW1lbnQucmVwbGFjZSgvXFxuWyBcXHRdKi9ndSwgJ1xcbicgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpICsgJyAnKTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSk7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gIH1cblxuICBmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcblxuICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcblxuICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgKz0gdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSk7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gIH1cblxuICBmb3JtYXROZXdsaW5lUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIGlmIChpc0FuZCh0b2tlbikgJiYgaXNCZXR3ZWVuKHRoaXMudG9rZW5Mb29rQmVoaW5kKDIpKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgcXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRoaXMuc2hvdyh0b2tlbikpICsgJyAnO1xuICB9XG5cbiAgLy8gUmVwbGFjZSBhbnkgc2VxdWVuY2Ugb2Ygd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHdpdGggc2luZ2xlIHNwYWNlXG4gIGVxdWFsaXplV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xccysvZ3UsICcgJyk7XG4gIH1cblxuICAvLyBPcGVuaW5nIHBhcmVudGhlc2VzIGluY3JlYXNlIHRoZSBibG9jayBpbmRlbnQgbGV2ZWwgYW5kIHN0YXJ0IGEgbmV3IGxpbmVcbiAgZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgIC8vIFRha2Ugb3V0IHRoZSBwcmVjZWRpbmcgc3BhY2UgdW5sZXNzIHRoZXJlIHdhcyB3aGl0ZXNwYWNlIHRoZXJlIGluIHRoZSBvcmlnaW5hbCBxdWVyeVxuICAgIC8vIG9yIGFub3RoZXIgb3BlbmluZyBwYXJlbnMgb3IgbGluZSBjb21tZW50XG4gICAgY29uc3QgcHJlc2VydmVXaGl0ZXNwYWNlRm9yID0ge1xuICAgICAgW3Rva2VuVHlwZXMuT1BFTl9QQVJFTl06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlRdOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuT1BFUkFUT1JdOiB0cnVlLFxuICAgIH07XG4gICAgaWYgKFxuICAgICAgdG9rZW4ud2hpdGVzcGFjZUJlZm9yZS5sZW5ndGggPT09IDAgJiZcbiAgICAgICFwcmVzZXJ2ZVdoaXRlc3BhY2VGb3JbdGhpcy50b2tlbkxvb2tCZWhpbmQoKT8udHlwZV1cbiAgICApIHtcbiAgICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgfVxuICAgIHF1ZXJ5ICs9IHRoaXMuc2hvdyh0b2tlbik7XG5cbiAgICB0aGlzLmlubGluZUJsb2NrLmJlZ2luSWZQb3NzaWJsZSh0aGlzLnRva2VucywgdGhpcy5pbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgLy8gQ2xvc2luZyBwYXJlbnRoZXNlcyBkZWNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsXG4gIGZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmlubGluZUJsb2NrLmVuZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHRoaXMuYWRkTmV3bGluZShxdWVyeSkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeSArIHRoaXMucGFyYW1zLmdldCh0b2tlbikgKyAnICc7XG4gIH1cblxuICAvLyBDb21tYXMgc3RhcnQgYSBuZXcgbGluZSAodW5sZXNzIHdpdGhpbiBpbmxpbmUgcGFyZW50aGVzZXMgb3IgU1FMIFwiTElNSVRcIiBjbGF1c2UpXG4gIGZvcm1hdENvbW1hKHRva2VuLCBxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuXG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSBpZiAoaXNMaW1pdCh0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbikpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKTtcbiAgfVxuXG4gIGZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24ucmVzZXRJbmRlbnRhdGlvbigpO1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnXFxuJy5yZXBlYXQodGhpcy5jZmcubGluZXNCZXR3ZWVuUXVlcmllcyB8fCAxKTtcbiAgfVxuXG4gIC8vIENvbnZlcnRzIHRva2VuIHRvIHN0cmluZyAodXBwZXJjYXNpbmcgaXQgaWYgbmVlZGVkKVxuICBzaG93KHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2ZnLnVwcGVyY2FzZSAmJlxuICAgICAgKHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4gfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTilcbiAgICApIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgYWRkTmV3bGluZShxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgaWYgKCFxdWVyeS5lbmRzV2l0aCgnXFxuJykpIHtcbiAgICAgIHF1ZXJ5ICs9ICdcXG4nO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpO1xuICB9XG5cbiAgdG9rZW5Mb29rQmVoaW5kKG4gPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggLSBuXTtcbiAgfVxuXG4gIHRva2VuTG9va0FoZWFkKG4gPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggKyBuXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGFzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgSU5ERU5UX1RZUEVfVE9QX0xFVkVMID0gJ3RvcC1sZXZlbCc7XG5jb25zdCBJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCA9ICdibG9jay1sZXZlbCc7XG5cbi8qKlxuICogTWFuYWdlcyBpbmRlbnRhdGlvbiBsZXZlbHMuXG4gKlxuICogVGhlcmUgYXJlIHR3byB0eXBlcyBvZiBpbmRlbnRhdGlvbiBsZXZlbHM6XG4gKlxuICogLSBCTE9DS19MRVZFTCA6IGluY3JlYXNlZCBieSBvcGVuLXBhcmVudGhlc2lzXG4gKiAtIFRPUF9MRVZFTCA6IGluY3JlYXNlZCBieSBSRVNFUlZFRF9UT1BfTEVWRUwgd29yZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZW50YXRpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGluZGVudCBJbmRlbnQgdmFsdWUsIGRlZmF1bHQgaXMgXCIgIFwiICgyIHNwYWNlcylcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZGVudCkge1xuICAgIHRoaXMuaW5kZW50ID0gaW5kZW50IHx8ICcgICc7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudCBpbmRlbnRhdGlvbiBzdHJpbmcuXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGdldEluZGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRlbnQucmVwZWF0KHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZVRvcExldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9UT1BfTEVWRUwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKi9cbiAgaW5jcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSB0b3AtbGV2ZWwgaW5kZW50LlxuICAgKiBEb2VzIG5vdGhpbmcgd2hlbiB0aGUgcHJldmlvdXMgaW5kZW50IGlzIG5vdCB0b3AtbGV2ZWwuXG4gICAqL1xuICBkZWNyZWFzZVRvcExldmVsKCkge1xuICAgIGlmICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDAgJiYgbGFzdCh0aGlzLmluZGVudFR5cGVzKSA9PT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICogSWYgdGhlcmUgYXJlIHRvcC1sZXZlbCBpbmRlbnRzIHdpdGhpbiB0aGUgYmxvY2stbGV2ZWwgaW5kZW50LFxuICAgKiB0aHJvd3MgYXdheSB0aGVzZSBhcyB3ZWxsLlxuICAgKi9cbiAgZGVjcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHdoaWxlICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgICAgaWYgKHR5cGUgIT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEluZGVudGF0aW9uKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcblxuY29uc3QgSU5MSU5FX01BWF9MRU5HVEggPSA1MDtcblxuLyoqXG4gKiBCb29ra2VlcGVyIGZvciBpbmxpbmUgYmxvY2tzLlxuICpcbiAqIElubGluZSBibG9ja3MgYXJlIHBhcmVudGhpemVkIGV4cHJlc3Npb25zIHRoYXQgYXJlIHNob3J0ZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAqIFRoZXNlIGJsb2NrcyBhcmUgZm9ybWF0dGVkIG9uIGEgc2luZ2xlIGxpbmUsIHVubGlrZSBsb25nZXIgcGFyZW50aGl6ZWRcbiAqIGV4cHJlc3Npb25zIHdoZXJlIG9wZW4tcGFyZW50aGVzaXMgY2F1c2VzIG5ld2xpbmUgYW5kIGluY3JlYXNlIG9mIGluZGVudGF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVCbG9jayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGV2ZWwgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyBpbmxpbmUgYmxvY2sgd2hlbiBsb29rYWhlYWQgdGhyb3VnaCB1cGNvbWluZyB0b2tlbnMgZGV0ZXJtaW5lc1xuICAgKiB0aGF0IHRoZSBibG9jayB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gICAqIEBwYXJhbSAge09iamVjdFtdfSB0b2tlbnMgQXJyYXkgb2YgYWxsIHRva2Vuc1xuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGluZGV4IEN1cnJlbnQgdG9rZW4gcG9zaXRpb25cbiAgICovXG4gIGJlZ2luSWZQb3NzaWJsZSh0b2tlbnMsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMubGV2ZWwgPT09IDAgJiYgdGhpcy5pc0lubGluZUJsb2NrKHRva2VucywgaW5kZXgpKSB7XG4gICAgICB0aGlzLmxldmVsID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICB0aGlzLmxldmVsKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBjdXJyZW50IGlubGluZSBibG9jay5cbiAgICogVGhlcmUgbWlnaHQgYmUgc2V2ZXJhbCBuZXN0ZWQgb25lcy5cbiAgICovXG4gIGVuZCgpIHtcbiAgICB0aGlzLmxldmVsLS07XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSB3aGVuIGluc2lkZSBhbiBpbmxpbmUgYmxvY2tcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmxldmVsID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgc2hvdWxkIGJlIGFuIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICAvLyBFeGFtcGxlcyBhcmUgXCJOT1coKVwiLCBcIkNPVU5UKCopXCIsIFwiaW50KDEwKVwiLCBrZXkoYHNvbWVjb2x1bW5gKSwgREVDSU1BTCg3LDIpXG4gIGlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgbGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcblxuICAgICAgLy8gT3ZlcnJhbiBtYXggbGVuZ3RoXG4gICAgICBpZiAobGVuZ3RoID4gSU5MSU5FX01BWF9MRU5HVEgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGxldmVsKys7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwtLTtcbiAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNGb3JiaWRkZW5Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBSZXNlcnZlZCB3b3JkcyB0aGF0IGNhdXNlIG5ld2xpbmVzLCBjb21tZW50cyBhbmQgc2VtaWNvbG9uc1xuICAvLyBhcmUgbm90IGFsbG93ZWQgaW5zaWRlIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICBpc0ZvcmJpZGRlblRva2VuKHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLkNPTU1FTlQgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCB8fFxuICAgICAgdmFsdWUgPT09ICc7J1xuICAgICk7XG4gIH1cbn1cbiIsIi8qKlxuICogSGFuZGxlcyBwbGFjZWhvbGRlciByZXBsYWNlbWVudCB3aXRoIGdpdmVuIHBhcmFtcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYW1zIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcGFyYW0gdmFsdWUgdGhhdCBtYXRjaGVzIGdpdmVuIHBsYWNlaG9sZGVyIHdpdGggcGFyYW0ga2V5LlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4ua2V5IFBsYWNlaG9sZGVyIGtleVxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi52YWx1ZSBQbGFjZWhvbGRlciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHBhcmFtIG9yIHRva2VuLnZhbHVlIHdoZW4gcGFyYW1zIGFyZSBtaXNzaW5nXG4gICAqL1xuICBnZXQoeyBrZXksIHZhbHVlIH0pIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmFtc1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJhbXNbdGhpcy5pbmRleCsrXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCAqIGFzIHJlZ2V4RmFjdG9yeSBmcm9tICcuL3JlZ2V4RmFjdG9yeSc7XG5pbXBvcnQgeyBlc2NhcGVSZWdFeHAgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuaXplciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRXb3JkcyBSZXNlcnZlZCB3b3JkcyBpbiBTUUxcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ldyBsaW5lIHNlcGFyYXRlbHlcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZE5ld2xpbmVXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3bGluZVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IFdvcmRzIHRoYXQgYXJlIHRvcCBsZXZlbCBidXQgaGF2ZSBubyBpbmRlbnRhdGlvblxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnN0cmluZ1R5cGVzIFN0cmluZyB0eXBlcyB0byBlbmFibGU6IFwiXCIsICcnLCBgYCwgW10sIE4nJ1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm9wZW5QYXJlbnMgT3BlbmluZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKCwgW1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmNsb3NlUGFyZW5zIENsb3NpbmcgcGFyZW50aGVzZXMgdG8gZW5hYmxlLCBsaWtlICksIF1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgaW5kZXhlZCBwbGFjZWhvbGRlcnMsIGxpa2UgP1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgbmFtZWQgcGxhY2Vob2xkZXJzLCBsaWtlIEAgYW5kIDpcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5saW5lQ29tbWVudFR5cGVzIExpbmUgY29tbWVudHMgdG8gZW5hYmxlLCBsaWtlICMgYW5kIC0tXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3BlY2lhbFdvcmRDaGFycyBTcGVjaWFsIGNoYXJzIHRoYXQgY2FuIGJlIGZvdW5kIGluc2lkZSBvZiB3b3JkcywgbGlrZSBAIGFuZCAjXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBbY2ZnLm9wZXJhdG9yXSBBZGRpdGlvbmFsIG9wZXJhdG9ycyB0byByZWNvZ25pemVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuV0hJVEVTUEFDRV9SRUdFWCA9IC9eKFxccyspL3U7XG4gICAgdGhpcy5OVU1CRVJfUkVHRVggPSAvXigoLVxccyopP1swLTldKyhcXC5bMC05XSspPyhbZUVdLT9bMC05XSsoXFwuWzAtOV0rKT8pP3wweFswLTlhLWZBLUZdK3wwYlswMV0rKVxcYi91O1xuXG4gICAgdGhpcy5PUEVSQVRPUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVPcGVyYXRvclJlZ2V4KFtcbiAgICAgIC4uLihjZmcub3BlcmF0b3JzIHx8IFtdKSxcbiAgICAgICchPScsXG4gICAgICAnPD4nLFxuICAgICAgJz09JyxcbiAgICAgICc8PScsXG4gICAgICAnPj0nLFxuICAgICAgJyE8JyxcbiAgICAgICchPicsXG4gICAgICAnfHwnLFxuICAgICAgJzo9JyxcbiAgICBdKTtcblxuICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS91O1xuICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZUxpbmVDb21tZW50UmVnZXgoY2ZnLmxpbmVDb21tZW50VHlwZXMpO1xuXG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KFxuICAgICAgY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50XG4gICAgKTtcbiAgICB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZFdvcmRzKTtcblxuICAgIHRoaXMuV09SRF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgIHRoaXMuU1RSSU5HX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1JlZ2V4KGNmZy5zdHJpbmdUeXBlcyk7XG5cbiAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGFyZW5SZWdleChjZmcub3BlblBhcmVucyk7XG4gICAgdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgICdbMC05XSonXG4gICAgKTtcbiAgICB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1thLXpBLVowLTkuXyRdKydcbiAgICApO1xuICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1BhdHRlcm4oY2ZnLnN0cmluZ1R5cGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBTUUwgc3RyaW5nIGFuZCBicmVha3MgaXQgaW50byB0b2tlbnMuXG4gICAqIEVhY2ggdG9rZW4gaXMgYW4gb2JqZWN0IHdpdGggdHlwZSBhbmQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgU1FMIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtPYmplY3RbXX0gdG9rZW5zIEFuIGFycmF5IG9mIHRva2Vucy5cbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi53aGl0ZXNwYWNlQmVmb3JlIFByZWNlZGluZyB3aGl0ZXNwYWNlXG4gICAqL1xuICB0b2tlbml6ZShpbnB1dCkge1xuICAgIGNvbnN0IHRva2VucyA9IFtdO1xuICAgIGxldCB0b2tlbjtcblxuICAgIC8vIEtlZXAgcHJvY2Vzc2luZyB0aGUgc3RyaW5nIHVudGlsIGl0IGlzIGVtcHR5XG4gICAgd2hpbGUgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgLy8gZ3JhYiBhbnkgcHJlY2VkaW5nIHdoaXRlc3BhY2VcbiAgICAgIGNvbnN0IHdoaXRlc3BhY2VCZWZvcmUgPSB0aGlzLmdldFdoaXRlc3BhY2UoaW5wdXQpO1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcod2hpdGVzcGFjZUJlZm9yZS5sZW5ndGgpO1xuXG4gICAgICBpZiAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgbmV4dCB0b2tlbiBhbmQgdGhlIHRva2VuIHR5cGVcbiAgICAgICAgdG9rZW4gPSB0aGlzLmdldE5leHRUb2tlbihpbnB1dCwgdG9rZW4pO1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBzdHJpbmdcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcodG9rZW4udmFsdWUubGVuZ3RoKTtcblxuICAgICAgICB0b2tlbnMucHVzaCh7IC4uLnRva2VuLCB3aGl0ZXNwYWNlQmVmb3JlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZ2V0V2hpdGVzcGFjZShpbnB1dCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaCh0aGlzLldISVRFU1BBQ0VfUkVHRVgpO1xuICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6ICcnO1xuICB9XG5cbiAgZ2V0TmV4dFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0Q29tbWVudFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRTdHJpbmdUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB8fFxuICAgICAgdGhpcy5nZXRXb3JkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE9wZXJhdG9yVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldENvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0QmxvY2tDb21tZW50VG9rZW4oaW5wdXQpO1xuICB9XG5cbiAgZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5CTE9DS19DT01NRU5ULFxuICAgICAgcmVnZXg6IHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ1Rva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlNUUklORyxcbiAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9wZW5QYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRU5fUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5PUEVOX1BBUkVOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkNMT1NFX1BBUkVOLFxuICAgICAgcmVnZXg6IHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JREVOVF9OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PlxuICAgICAgICB0aGlzLmdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleTogdi5zbGljZSgyLCAtMSksIHF1b3RlQ2hhcjogdi5zbGljZSgtMSkgfSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHsgaW5wdXQsIHJlZ2V4LCBwYXJzZUtleSB9KSB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHJlZ2V4LCB0eXBlOiB0b2tlblR5cGVzLlBMQUNFSE9MREVSIH0pO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgdG9rZW4ua2V5ID0gcGFyc2VLZXkodG9rZW4udmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICBnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXksIHF1b3RlQ2hhciB9KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKCdcXFxcJyArIHF1b3RlQ2hhciksICdndScpLCBxdW90ZUNoYXIpO1xuICB9XG5cbiAgLy8gRGVjaW1hbCwgYmluYXJ5LCBvciBoZXggbnVtYmVyc1xuICBnZXROdW1iZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5OVU1CRVIsXG4gICAgICByZWdleDogdGhpcy5OVU1CRVJfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICAvLyBQdW5jdHVhdGlvbiBhbmQgc3ltYm9sc1xuICBnZXRPcGVyYXRvclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRVJBVE9SLFxuICAgICAgcmVnZXg6IHRoaXMuT1BFUkFUT1JfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRSZXNlcnZlZFdvcmRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgIC8vIEEgcmVzZXJ2ZWQgd29yZCBjYW5ub3QgYmUgcHJlY2VkZWQgYnkgYSBcIi5cIlxuICAgIC8vIHRoaXMgbWFrZXMgaXQgc28gaW4gXCJteXRhYmxlLmZyb21cIiwgXCJmcm9tXCIgaXMgbm90IGNvbnNpZGVyZWQgYSByZXNlcnZlZCB3b3JkXG4gICAgaWYgKHByZXZpb3VzVG9rZW4gJiYgcHJldmlvdXNUb2tlbi52YWx1ZSAmJiBwcmV2aW91c1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FLFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfUExBSU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRXb3JkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuV09SRCxcbiAgICAgIHJlZ2V4OiB0aGlzLldPUkRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRUb2tlbk9uRmlyc3RNYXRjaCh7IGlucHV0LCB0eXBlLCByZWdleCB9KSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHJlZ2V4KTtcblxuICAgIHJldHVybiBtYXRjaGVzID8geyB0eXBlLCB2YWx1ZTogbWF0Y2hlc1sxXSB9IDogdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQgeyBlc2NhcGVSZWdFeHAsIGlzRW1wdHksIHNvcnRCeUxlbmd0aERlc2MgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcGVyYXRvclJlZ2V4KG11bHRpTGV0dGVyT3BlcmF0b3JzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFxuICAgIGBeKCR7c29ydEJ5TGVuZ3RoRGVzYyhtdWx0aUxldHRlck9wZXJhdG9ycykubWFwKGVzY2FwZVJlZ0V4cCkuam9pbignfCcpfXwuKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGxpbmVDb21tZW50VHlwZXMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oKD86JHtsaW5lQ29tbWVudFR5cGVzLm1hcCgoYykgPT4gZXNjYXBlUmVnRXhwKGMpKS5qb2luKCd8Jyl9KS4qPykoPzpcXHJcXG58XFxyfFxcbnwkKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNlcnZlZFdvcmRSZWdleChyZXNlcnZlZFdvcmRzKSB7XG4gIGlmIChyZXNlcnZlZFdvcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeXFxiJGAsICd1Jyk7XG4gIH1cbiAgY29uc3QgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSBzb3J0QnlMZW5ndGhEZXNjKHJlc2VydmVkV29yZHMpLmpvaW4oJ3wnKS5yZXBsYWNlKC8gL2d1LCAnXFxcXHMrJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKGBeKCR7cmVzZXJ2ZWRXb3Jkc1BhdHRlcm59KVxcXFxiYCwgJ2l1Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkUmVnZXgoc3BlY2lhbENoYXJzID0gW10pIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oW1xcXFxwe0FscGhhYmV0aWN9XFxcXHB7TWFya31cXFxccHtEZWNpbWFsX051bWJlcn1cXFxccHtDb25uZWN0b3JfUHVuY3R1YXRpb259XFxcXHB7Sm9pbl9Db250cm9sfSR7c3BlY2lhbENoYXJzLmpvaW4oXG4gICAgICAnJ1xuICAgICl9XSspYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSArICcpJywgJ3UnKTtcbn1cblxuLy8gVGhpcyBlbmFibGVzIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHBhdHRlcm5zOlxuLy8gMS4gYmFja3RpY2sgcXVvdGVkIHN0cmluZyB1c2luZyBgYCB0byBlc2NhcGVcbi8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuLy8gMy4gZG91YmxlIHF1b3RlZCBzdHJpbmcgdXNpbmcgXCJcIiBvciBcXFwiIHRvIGVzY2FwZVxuLy8gNC4gc2luZ2xlIHF1b3RlZCBzdHJpbmcgdXNpbmcgJycgb3IgXFwnIHRvIGVzY2FwZVxuLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG4vLyA2LiBVbmljb2RlIHNpbmdsZS1xdW90ZWQgc3RyaW5nIHVzaW5nIFxcJyB0byBlc2NhcGVcbi8vIDcuIFVuaWNvZGUgZG91YmxlLXF1b3RlZCBzdHJpbmcgdXNpbmcgXFxcIiB0byBlc2NhcGVcbi8vIDguIFBvc3RncmVTUUwgZG9sbGFyLXF1b3RlZCBzdHJpbmdzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykge1xuICBjb25zdCBwYXR0ZXJucyA9IHtcbiAgICAnYGAnOiAnKChgW15gXSooJHxgKSkrKScsXG4gICAgJ3t9JzogJygoXFxcXHtbXlxcXFx9XSooJHxcXFxcfSkpKyknLFxuICAgICdbXSc6ICcoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKScsXG4gICAgJ1wiXCInOiAnKChcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIFwiTicnXCI6IFwiKChOJ1teTidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15OJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJVJicnXCI6IFwiKChVJidbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICAnVSZcIlwiJzogJygoVSZcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgJCQ6ICcoKD88dGFnPlxcXFwkXFxcXHcqXFxcXCQpW1xcXFxzXFxcXFNdKj8oPzpcXFxcazx0YWc+fCQpKScsXG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ1R5cGVzLm1hcCgodCkgPT4gcGF0dGVybnNbdF0pLmpvaW4oJ3wnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBwYXJlbnMubWFwKGVzY2FwZVBhcmVuKS5qb2luKCd8JykgKyAnKScsICdpdScpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gQSBzaW5nbGUgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChwYXJlbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbG9uZ2VyIHdvcmRcbiAgICByZXR1cm4gJ1xcXFxiJyArIHBhcmVuICsgJ1xcXFxiJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXJSZWdleCh0eXBlcywgcGF0dGVybikge1xuICBpZiAoaXNFbXB0eSh0eXBlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKTtcblxuICByZXR1cm4gbmV3IFJlZ0V4cChgXigoPzoke3R5cGVzUmVnZXh9KSg/OiR7cGF0dGVybn0pKWAsICd1Jyk7XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBpc1Rva2VuID0gKHR5cGUsIHJlZ2V4KSA9PiAodG9rZW4pID0+IHRva2VuPy50eXBlID09PSB0eXBlICYmIHJlZ2V4LnRlc3QodG9rZW4/LnZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGlzQW5kID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsIC9eQU5EJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0JldHdlZW4gPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQkVUV0VFTiQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNMaW1pdCA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsIC9eTElNSVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzU2V0ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15TRVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzQnkgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQlkkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzV2luZG93ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15XSU5ET1ckL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzRW5kID0gaXNUb2tlbih0b2tlblR5cGVzLkNMT1NFX1BBUkVOLCAvXkVORCQvaXUpO1xuIiwiLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV09SRDogJ3dvcmQnLFxuICBTVFJJTkc6ICdzdHJpbmcnLFxuICBSRVNFUlZFRDogJ3Jlc2VydmVkJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMOiAncmVzZXJ2ZWQtdG9wLWxldmVsJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVDogJ3Jlc2VydmVkLXRvcC1sZXZlbC1uby1pbmRlbnQnLFxuICBSRVNFUlZFRF9ORVdMSU5FOiAncmVzZXJ2ZWQtbmV3bGluZScsXG4gIE9QRVJBVE9SOiAnb3BlcmF0b3InLFxuICBPUEVOX1BBUkVOOiAnb3Blbi1wYXJlbicsXG4gIENMT1NFX1BBUkVOOiAnY2xvc2UtcGFyZW4nLFxuICBMSU5FX0NPTU1FTlQ6ICdsaW5lLWNvbW1lbnQnLFxuICBCTE9DS19DT01NRU5UOiAnYmxvY2stY29tbWVudCcsXG4gIE5VTUJFUjogJ251bWJlcicsXG4gIFBMQUNFSE9MREVSOiAncGxhY2Vob2xkZXInLFxufTtcbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUNUSVZBVEUnLFxuICAnQUxJQVMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMTE9XJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUkUnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNTT0NJQVRFJyxcbiAgJ0FTVVRJTUUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVRUUklCVVRFUycsXG4gICdBVURJVCcsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0FVWCcsXG4gICdBVVhJTElBUlknLFxuICAnQVZHJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlVGRkVSUE9PTCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVBUVVJFJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQ1NJRCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09MTElEJyxcbiAgJ0NPTFVNTicsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05DQVQnLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09SUicsXG4gICdDT1JSRVNQT05ESU5HJyxcbiAgJ0NPVU5UJyxcbiAgJ0NPVU5UX0JJRycsXG4gICdDT1ZBUl9QT1AnLFxuICAnQ09WQVJfU0FNUCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VCRScsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ERUZBVUxUX1RSQU5TRk9STV9HUk9VUCcsXG4gICdDVVJSRU5UX0xDX0NUWVBFJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9TRVJWRVInLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVElNRVpPTkUnLFxuICAnQ1VSUkVOVF9UUkFOU0ZPUk1fR1JPVVBfRk9SX1RZUEUnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFQQVJUSVRJT05OQU1FJyxcbiAgJ0RBVEFQQVJUSVRJT05OVU0nLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdEQjJHRU5FUkFMJyxcbiAgJ0RCMkdFTlJMJyxcbiAgJ0RCMlNRTCcsXG4gICdEQklORk8nLFxuICAnREJQQVJUSVRJT05OQU1FJyxcbiAgJ0RCUEFSVElUSU9OTlVNJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRklOSVRJT04nLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFUkFOSycsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFUkVGJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFU0NSSVBUT1InLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESUFHTk9TVElDUycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0FMTE9XJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFNTSVpFJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFRElUUFJPQycsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFTkQtRVhFQycsXG4gICdFTkRJTkcnLFxuICAnRVJBU0UnLFxuICAnRVNDQVBFJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFAnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFTkNFRCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFBST0MnLFxuICAnRklMRScsXG4gICdGSUxURVInLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVU0lPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHRVQnLFxuICAnR0xPQkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JBUEhJQycsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBU0gnLFxuICAnSEFTSEVEX1ZBTFVFJyxcbiAgJ0hJTlQnLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DTFVTSVZFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNBVE9SUycsXG4gICdJTkYnLFxuICAnSU5GSU5JVFknLFxuICAnSU5IRVJJVCcsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URUdSSVRZJyxcbiAgJ0lOVEVSU0VDVElPTicsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lTT0JJRCcsXG4gICdJU09MQVRJT04nLFxuICAnSVRFUkFURScsXG4gICdKQVInLFxuICAnSkFWQScsXG4gICdLRUVQJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xDX0NUWVBFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTktUWVBFJyxcbiAgJ0xOJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMREFURScsXG4gICdMT0NBTEUnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUT1InLFxuICAnTE9DQVRPUlMnLFxuICAnTE9DSycsXG4gICdMT0NLTUFYJyxcbiAgJ0xPQ0tTSVpFJyxcbiAgJ0xPTkcnLFxuICAnTE9PUCcsXG4gICdMT1dFUicsXG4gICdNQUlOVEFJTkVEJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVgnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01FVEhPRCcsXG4gICdNSUNST1NFQ09ORCcsXG4gICdNSUNST1NFQ09ORFMnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVTJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PRElGSUVTJyxcbiAgJ01PRFVMRScsXG4gICdNT05USCcsXG4gICdNT05USFMnLFxuICAnTVVMVElTRVQnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05FV19UQUJMRScsXG4gICdORVhUVkFMJyxcbiAgJ05PJyxcbiAgJ05PQ0FDSEUnLFxuICAnTk9DWUNMRScsXG4gICdOT0RFTkFNRScsXG4gICdOT0RFTlVNQkVSJyxcbiAgJ05PTUFYVkFMVUUnLFxuICAnTk9NSU5WQUxVRScsXG4gICdOT05FJyxcbiAgJ05PT1JERVInLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnTlVNUEFSVFMnLFxuICAnT0JJRCcsXG4gICdPQ1RFVF9MRU5HVEgnLFxuICAnT0YnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTERfVEFCTEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpBVElPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFEREVEJyxcbiAgJ1BBR0VTSVpFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJUJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVJUSVRJT05FRCcsXG4gICdQQVJUSVRJT05JTkcnLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BFUkNFTlRJTEVfQ09OVCcsXG4gICdQRVJDRU5USUxFX0RJU0MnLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BJRUNFU0laRScsXG4gICdQTEFOJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BPV0VSJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVZWQUwnLFxuICAnUFJJTUFSWScsXG4gICdQUklRVFknLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPR1JBTScsXG4gICdQU0lEJyxcbiAgJ1BVQkxJQycsXG4gICdRVUVSWScsXG4gICdRVUVSWU5PJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFMJyxcbiAgJ1JFQ09WRVJZJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVTVUxUJyxcbiAgJ1JFU1VMVF9TRVRfTE9DQVRPUicsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VTkRfQ0VJTElORycsXG4gICdST1VORF9ET1dOJyxcbiAgJ1JPVU5EX0ZMT09SJyxcbiAgJ1JPVU5EX0hBTEZfRE9XTicsXG4gICdST1VORF9IQUxGX0VWRU4nLFxuICAnUk9VTkRfSEFMRl9VUCcsXG4gICdST1VORF9VUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVycsXG4gICdST1dOVU1CRVInLFxuICAnUk9XUycsXG4gICdST1dTRVQnLFxuICAnUk9XX05VTUJFUicsXG4gICdSUk4nLFxuICAnUlVOJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NPUEUnLFxuICAnU0NSQVRDSFBBRCcsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNPTkRTJyxcbiAgJ1NFQ1FUWScsXG4gICdTRUNVUklUWScsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lHTkFMJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQU4nLFxuICAnU09NRScsXG4gICdTT1VSQ0UnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1BFQ0lGSUNUWVBFJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMSUQnLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUVJUJyxcbiAgJ1NUQUNLRUQnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJQycsXG4gICdTVEFUTUVOVCcsXG4gICdTVEFZJyxcbiAgJ1NURERFVl9QT1AnLFxuICAnU1REREVWX1NBTVAnLFxuICAnU1RPR1JPVVAnLFxuICAnU1RPUkVTJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVU0nLFxuICAnU1VNTUFSWScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lOT05ZTScsXG4gICdTWVNGVU4nLFxuICAnU1lTSUJNJyxcbiAgJ1NZU1BST0MnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0xBVEUnLFxuICAnVFJBTlNMQVRJT04nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VORE8nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOVElMJyxcbiAgJ1VQUEVSJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURQUk9DJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOVCcsXG4gICdWQVJZSU5HJyxcbiAgJ1ZBUl9QT1AnLFxuICAnVkFSX1NBTVAnLFxuICAnVkNBVCcsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVk9MQVRJTEUnLFxuICAnVk9MVU1FUycsXG4gICdXSEVOJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJRFRIX0JVQ0tFVCcsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXTE0nLFxuICAnV1JJVEUnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdZRUFSJyxcbiAgJ1lFQVJTJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnR08nLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERiMkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUREJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNFTlNJVElWRScsXG4gICdCRUZPUkUnLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFOR0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JQ1JPU0VDT05EJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMQVlFRCcsXG4gICdERUxFVEUnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdET19ET01BSU5fSURTJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVQUwnLFxuICAnRUFDSCcsXG4gICdFTFNFJyxcbiAgJ0VMU0VJRicsXG4gICdFTkNMT1NFRCcsXG4gICdFU0NBUEVEJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT0FUNCcsXG4gICdGTE9BVDgnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJPTScsXG4gICdGVUxMVEVYVCcsXG4gICdHRU5FUkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBVklORycsXG4gICdISUdIX1BSSU9SSVRZJyxcbiAgJ0hPVVJfTUlDUk9TRUNPTkQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lHTk9SRV9ET01BSU5fSURTJyxcbiAgJ0lHTk9SRV9TRVJWRVJfSURTJyxcbiAgJ0lOJyxcbiAgJ0lOREVYJyxcbiAgJ0lORklMRScsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVDEnLFxuICAnSU5UMicsXG4gICdJTlQzJyxcbiAgJ0lOVDQnLFxuICAnSU5UOCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lURVJBVEUnLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJTkVBUicsXG4gICdMSU5FUycsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTE9OR0JMT0InLFxuICAnTE9OR1RFWFQnLFxuICAnTE9PUCcsXG4gICdMT1dfUFJJT1JJVFknLFxuICAnTUFTVEVSX0hFQVJUQkVBVF9QRVJJT0QnLFxuICAnTUFTVEVSX1NTTF9WRVJJRllfU0VSVkVSX0NFUlQnLFxuICAnTUFUQ0gnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVESVVNQkxPQicsXG4gICdNRURJVU1JTlQnLFxuICAnTUVESVVNVEVYVCcsXG4gICdNSURETEVJTlQnLFxuICAnTUlOVVRFX01JQ1JPU0VDT05EJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTU9EJyxcbiAgJ01PRElGSUVTJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PX1dSSVRFX1RPX0JJTkxPRycsXG4gICdOVUxMJyxcbiAgJ05VTUVSSUMnLFxuICAnT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTkFMTFknLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09VVEZJTEUnLFxuICAnT1ZFUicsXG4gICdQQUdFX0NIRUNLU1VNJyxcbiAgJ1BBUlNFX1ZDT0xfRVhQUicsXG4gICdQQVJUSVRJT04nLFxuICAnUE9TSVRJT04nLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVUkdFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBRFMnLFxuICAnUkVBRF9XUklURScsXG4gICdSRUFMJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUZfU1lTVEVNX0lEJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVCcsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUVVJUkUnLFxuICAnUkVTSUdOQUwnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUkxJS0UnLFxuICAnUk9XUycsXG4gICdTQ0hFTUEnLFxuICAnU0NIRU1BUycsXG4gICdTRUNPTkRfTUlDUk9TRUNPTkQnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU0lHTkFMJyxcbiAgJ1NMT1cnLFxuICAnU01BTExJTlQnLFxuICAnU1BBVElBTCcsXG4gICdTUEVDSUZJQycsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FMX0JJR19SRVNVTFQnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NTTCcsXG4gICdTVEFSVElORycsXG4gICdTVEFUU19BVVRPX1JFQ0FMQycsXG4gICdTVEFUU19QRVJTSVNURU5UJyxcbiAgJ1NUQVRTX1NBTVBMRV9QQUdFUycsXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ1RBQkxFJyxcbiAgJ1RFUk1JTkFURUQnLFxuICAnVEhFTicsXG4gICdUSU5ZQkxPQicsXG4gICdUSU5ZSU5UJyxcbiAgJ1RJTllURVhUJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdVTkRPJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVBEQVRFJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRScsXG4gICdVU0lORycsXG4gICdVVENfREFURScsXG4gICdVVENfVElNRScsXG4gICdVVENfVElNRVNUQU1QJyxcbiAgJ1ZBTFVFUycsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSQUNURVInLFxuICAnVkFSWUlORycsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dSSVRFJyxcbiAgJ1hPUicsXG4gICdZRUFSX01PTlRIJyxcbiAgJ1pFUk9GSUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJpYURiRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFsnYGAnLCBcIicnXCIsICdcIlwiJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJywgJyMnXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbJzo9JywgJzw8JywgJz4+JywgJyE9JywgJzw9PicsICcmJicsICd8fCddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSU5BUlknLFxuICAnQk9PTEVBTicsXG4gICdCUkVBSycsXG4gICdCVUNLRVQnLFxuICAnQlVJTEQnLFxuICAnQlknLFxuICAnQ0FMTCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0xVU1RFUicsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09NTUlUJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OVElOVUUnLFxuICAnQ09SUkVMQVRFJyxcbiAgJ0NPVkVSJyxcbiAgJ0NSRUFURScsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBU0VUJyxcbiAgJ0RBVEFTVE9SRScsXG4gICdERUNMQVJFJyxcbiAgJ0RFQ1JFTUVOVCcsXG4gICdERUxFVEUnLFxuICAnREVSSVZFRCcsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RST1AnLFxuICAnRUFDSCcsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENMVURFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklSU1QnLFxuICAnRkxBVFRFTicsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRlJPTScsXG4gICdGVU5DVElPTicsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdHU0knLFxuICAnSEFWSU5HJyxcbiAgJ0lGJyxcbiAgJ0lHTk9SRScsXG4gICdJTElLRScsXG4gICdJTicsXG4gICdJTkNMVURFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkZFUicsXG4gICdJTkxJTkUnLFxuICAnSU5ORVInLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0pPSU4nLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0VZU1BBQ0UnLFxuICAnS05PV04nLFxuICAnTEFTVCcsXG4gICdMRUZUJyxcbiAgJ0xFVCcsXG4gICdMRVRUSU5HJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTFNNJyxcbiAgJ01BUCcsXG4gICdNQVBQSU5HJyxcbiAgJ01BVENIRUQnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01FUkdFJyxcbiAgJ01JU1NJTkcnLFxuICAnTkFNRVNQQUNFJyxcbiAgJ05FU1QnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVNQkVSJyxcbiAgJ09CSkVDVCcsXG4gICdPRkZTRVQnLFxuICAnT04nLFxuICAnT1BUSU9OJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnUEFSU0UnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BBVEgnLFxuICAnUE9PTCcsXG4gICdQUkVQQVJFJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJVkFURScsXG4gICdQUklWSUxFR0UnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVQkxJQycsXG4gICdSQVcnLFxuICAnUkVBTE0nLFxuICAnUkVEVUNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1NBVElTRklFUycsXG4gICdTQ0hFTUEnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTEYnLFxuICAnU0VNSScsXG4gICdTRVQnLFxuICAnU0hPVycsXG4gICdTT01FJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRJU1RJQ1MnLFxuICAnU1RSSU5HJyxcbiAgJ1NZU1RFTScsXG4gICdUSEVOJyxcbiAgJ1RPJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdVTkRFUicsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTk5FU1QnLFxuICAnVU5TRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1VQU0VSVCcsXG4gICdVU0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJREFURScsXG4gICdWQUxVRScsXG4gICdWQUxVRUQnLFxuICAnVkFMVUVTJyxcbiAgJ1ZJQScsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJTEUnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV09SSycsXG4gICdYT1InLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnRVhQTEFJTiBERUxFVEUgRlJPTScsXG4gICdFWFBMQUlOIFVQREFURScsXG4gICdFWFBMQUlOIFVQU0VSVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTkZFUicsXG4gICdJTlNFUlQgSU5UTycsXG4gICdMRVQnLFxuICAnTElNSVQnLFxuICAnTUVSR0UnLFxuICAnTkVTVCcsXG4gICdPUkRFUiBCWScsXG4gICdQUkVQQVJFJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVU5ORVNUJyxcbiAgJ1VQREFURScsXG4gICdVUFNFUlQnLFxuICAnVVNFIEtFWVMnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE4xcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdbJywgJ3snXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnXScsICd9J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWycjJywgJy0tJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgaXNCeSwgaXNTZXQgfSBmcm9tICcuLi9jb3JlL3Rva2VuJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi4vY29yZS90b2tlblR5cGVzJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0EnLFxuICAnQUNDRVNTSUJMRScsXG4gICdBR0VOVCcsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVQnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhJRCcsXG4gICdBVkcnLFxuICAnQkVUV0VFTicsXG4gICdCRklMRV9CQVNFJyxcbiAgJ0JJTkFSWV9JTlRFR0VSJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CX0JBU0UnLFxuICAnQkxPQ0snLFxuICAnQk9EWScsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQk9VTkQnLFxuICAnQlJFQURUSCcsXG4gICdCVUxLJyxcbiAgJ0JZJyxcbiAgJ0JZVEUnLFxuICAnQycsXG4gICdDQUxMJyxcbiAgJ0NBTExJTkcnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQVJfQkFTRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSU0VUJyxcbiAgJ0NIQVJTRVRGT1JNJyxcbiAgJ0NIQVJTRVRJRCcsXG4gICdDSEVDSycsXG4gICdDTE9CX0JBU0UnLFxuICAnQ0xPTkUnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDTFVTVEVSUycsXG4gICdDT0FMRVNDRScsXG4gICdDT0xBVVRIJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUElMRUQnLFxuICAnQ09NUFJFU1MnLFxuICAnQ09OTkVDVCcsXG4gICdDT05TVEFOVCcsXG4gICdDT05TVFJVQ1RPUicsXG4gICdDT05URVhUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09VTlQnLFxuICAnQ1JBU0gnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUwnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSVkFMJyxcbiAgJ0NVUlNPUicsXG4gICdDVVNUT01EQVRVTScsXG4gICdEQU5HTElORycsXG4gICdEQVRBJyxcbiAgJ0RBVEVfQkFTRScsXG4gICdEQVRFJyxcbiAgJ0RBWScsXG4gICdERUNJTUFMJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGSU5FJyxcbiAgJ0RFTEVURScsXG4gICdERVBUSCcsXG4gICdERVNDJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElSRUNUT1JZJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVUkFUSU9OJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTSUYnLFxuICAnRU1QVFknLFxuICAnRU5EJyxcbiAgJ0VTQ0FQRScsXG4gICdFWENFUFRJT05TJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYVEVORFMnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSU5BTCcsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTE9BVCcsXG4gICdGT1InLFxuICAnRk9SQUxMJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR0VORVJBTCcsXG4gICdHT1RPJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBU0gnLFxuICAnSEVBUCcsXG4gICdISURERU4nLFxuICAnSE9VUicsXG4gICdJREVOVElGSUVEJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNFUycsXG4gICdJTkZJTklURScsXG4gICdJTlNUQU5USUFCTEUnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJGQUNFJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WQUxJREFURScsXG4gICdJUycsXG4gICdJU09MQVRJT04nLFxuICAnSkFWQScsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMRUFESU5HJyxcbiAgJ0xFTkdUSCcsXG4gICdMRVZFTCcsXG4gICdMSUJSQVJZJyxcbiAgJ0xJS0UnLFxuICAnTElLRTInLFxuICAnTElLRTQnLFxuICAnTElLRUMnLFxuICAnTElNSVRFRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTUFQJyxcbiAgJ01BWCcsXG4gICdNQVhMRU4nLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTUxTTEFCRUwnLFxuICAnTU9EJyxcbiAgJ01PREUnLFxuICAnTU9OVEgnLFxuICAnTVVMVElTRVQnLFxuICAnTkFNRScsXG4gICdOQU4nLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUSVZFJyxcbiAgJ05BVFVSQUwnLFxuICAnTkFUVVJBTE4nLFxuICAnTkNIQVInLFxuICAnTkVXJyxcbiAgJ05FWFRWQUwnLFxuICAnTk9DT01QUkVTUycsXG4gICdOT0NPUFknLFxuICAnTk9UJyxcbiAgJ05PV0FJVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1CRVJfQkFTRScsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09DSUNPTEwnLFxuICAnT0NJREFURScsXG4gICdPQ0lEQVRFVElNRScsXG4gICdPQ0lEVVJBVElPTicsXG4gICdPQ0lJTlRFUlZBTCcsXG4gICdPQ0lMT0JMT0NBVE9SJyxcbiAgJ09DSU5VTUJFUicsXG4gICdPQ0lSQVcnLFxuICAnT0NJUkVGJyxcbiAgJ09DSVJFRkNVUlNPUicsXG4gICdPQ0lST1dJRCcsXG4gICdPQ0lTVFJJTkcnLFxuICAnT0NJVFlQRScsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEFRVUUnLFxuICAnT1BFTicsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1JBQ0xFJyxcbiAgJ09SQURBVEEnLFxuICAnT1JERVInLFxuICAnT1JHQU5JWkFUSU9OJyxcbiAgJ09STEFOWScsXG4gICdPUkxWQVJZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUlJJRElORycsXG4gICdQQUNLQUdFJyxcbiAgJ1BBUkFMTEVMX0VOQUJMRScsXG4gICdQQVJBTUVURVInLFxuICAnUEFSQU1FVEVSUycsXG4gICdQQVJFTlQnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU0NBTCcsXG4gICdQQ1RGUkVFJyxcbiAgJ1BJUEUnLFxuICAnUElQRUxJTkVEJyxcbiAgJ1BMU19JTlRFR0VSJyxcbiAgJ1BMVUdHQUJMRScsXG4gICdQT1NJVElWRScsXG4gICdQT1NJVElWRU4nLFxuICAnUFJBR01BJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUklPUicsXG4gICdQUklWQVRFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFJU0UnLFxuICAnUkFOR0UnLFxuICAnUkFXJyxcbiAgJ1JFQUQnLFxuICAnUkVBTCcsXG4gICdSRUNPUkQnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTElFU19PTicsXG4gICdSRU0nLFxuICAnUkVNQUlOREVSJyxcbiAgJ1JFTkFNRScsXG4gICdSRVNPVVJDRScsXG4gICdSRVNVTFRfQ0FDSEUnLFxuICAnUkVTVUxUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWRVJTRScsXG4gICdSRVZPS0UnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9XJyxcbiAgJ1JPV0lEJyxcbiAgJ1JPV05VTScsXG4gICdST1dUWVBFJyxcbiAgJ1NBTVBMRScsXG4gICdTQVZFJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQjEnLFxuICAnU0IyJyxcbiAgJ1NCNCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFR01FTlQnLFxuICAnU0VMRicsXG4gICdTRVBBUkFURScsXG4gICdTRVFVRU5DRScsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0hBUkUnLFxuICAnU0hPUlQnLFxuICAnU0laRV9UJyxcbiAgJ1NJWkUnLFxuICAnU01BTExJTlQnLFxuICAnU09NRScsXG4gICdTUEFDRScsXG4gICdTUEFSU0UnLFxuICAnU1FMJyxcbiAgJ1NRTENPREUnLFxuICAnU1FMREFUQScsXG4gICdTUUxFUlJNJyxcbiAgJ1NRTE5BTUUnLFxuICAnU1FMU1RBVEUnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBVElDJyxcbiAgJ1NURERFVicsXG4gICdTVE9SRUQnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVFlMRScsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJQQVJUSVRJT04nLFxuICAnU1VCU1RJVFVUQUJMRScsXG4gICdTVUJUWVBFJyxcbiAgJ1NVQ0NFU1NGVUwnLFxuICAnU1VNJyxcbiAgJ1NZTk9OWU0nLFxuICAnU1lTREFURScsXG4gICdUQUJBVVRIJyxcbiAgJ1RBQkxFJyxcbiAgJ1RETycsXG4gICdUSEUnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9BQkJSJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RJTUVaT05FX1JFR0lPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0FDVElPTkFMJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVTVEVEJyxcbiAgJ1RZUEUnLFxuICAnVUIxJyxcbiAgJ1VCMicsXG4gICdVQjQnLFxuICAnVUlEJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSVFVRScsXG4gICdVTlBMVUcnLFxuICAnVU5TSUdORUQnLFxuICAnVU5UUlVTVEVEJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTElTVCcsXG4gICdWQUxVRScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUkNIQVIyJyxcbiAgJ1ZBUklBQkxFJyxcbiAgJ1ZBUklBTkNFJyxcbiAgJ1ZBUlJBWScsXG4gICdWQVJZSU5HJyxcbiAgJ1ZJRVcnLFxuICAnVklFV1MnLFxuICAnVk9JRCcsXG4gICdXSEVORVZFUicsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dPUksnLFxuICAnV1JBUFBFRCcsXG4gICdXUklURScsXG4gICdZRUFSJyxcbiAgJ1pPTkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdCRUdJTicsXG4gICdDT05ORUNUIEJZJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVMRVRFIEZST00nLFxuICAnREVMRVRFJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRVhDRVBUSU9OJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdMT09QJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1NUQVJUIFdJVEgnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEFQUExZJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnXycsICckJywgJyMnLCAnLicsICdAJ10sXG4gICAgfSk7XG4gIH1cblxuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgaWYgKGlzU2V0KHRva2VuKSAmJiBpc0J5KHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuKSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FCT1JUJyxcbiAgJ0FCU09MVVRFJyxcbiAgJ0FDQ0VTUycsXG4gICdBQ1RJT04nLFxuICAnQUREJyxcbiAgJ0FETUlOJyxcbiAgJ0FGVEVSJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEwnLFxuICAnQUxTTycsXG4gICdBTFRFUicsXG4gICdBTFdBWVMnLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTU0VSVElPTicsXG4gICdBU1NJR05NRU5UJyxcbiAgJ0FTWU1NRVRSSUMnLFxuICAnQVQnLFxuICAnQVRUQUNIJyxcbiAgJ0FUVFJJQlVURScsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0JBQ0tXQVJEJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQklUJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQVRBTE9HJyxcbiAgJ0NIQUlOJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJBQ1RFUklTVElDUycsXG4gICdDSEVDSycsXG4gICdDSEVDS1BPSU5UJyxcbiAgJ0NMQVNTJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMQVRJT04nLFxuICAnQ09MVU1OJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT01NRU5UUycsXG4gICdDT01NSVQnLFxuICAnQ09NTUlUVEVEJyxcbiAgJ0NPTkNVUlJFTlRMWScsXG4gICdDT05GSUdVUkFUSU9OJyxcbiAgJ0NPTkZMSUNUJyxcbiAgJ0NPTk5FQ1RJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05TVFJBSU5UUycsXG4gICdDT05URU5UJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlNJT04nLFxuICAnQ09QWScsXG4gICdDT1NUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDU1YnLFxuICAnQ1VCRScsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJFTlRfQ0FUQUxPRycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ST0xFJyxcbiAgJ0NVUlJFTlRfU0NIRU1BJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0NZQ0xFJyxcbiAgJ0RBVEEnLFxuICAnREFUQUJBU0UnLFxuICAnREFZJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRkVSUkFCTEUnLFxuICAnREVGRVJSRUQnLFxuICAnREVGSU5FUicsXG4gICdERUxFVEUnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0RFTElNSVRFUlMnLFxuICAnREVQRU5EUycsXG4gICdERVNDJyxcbiAgJ0RFVEFDSCcsXG4gICdESUNUSU9OQVJZJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTQ0FSRCcsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET0NVTUVOVCcsXG4gICdET01BSU4nLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRUFDSCcsXG4gICdFTFNFJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRU5EJyxcbiAgJ0VOVU0nLFxuICAnRVNDQVBFJyxcbiAgJ0VWRU5UJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENMVURFJyxcbiAgJ0VYQ0xVRElORycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFBSRVNTSU9OJyxcbiAgJ0VYVEVOU0lPTicsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZBTUlMWScsXG4gICdGRVRDSCcsXG4gICdGSUxURVInLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRk9MTE9XSU5HJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZPUldBUkQnLFxuICAnRlJFRVpFJyxcbiAgJ0ZST00nLFxuICAnRlVMTCcsXG4gICdGVU5DVElPTicsXG4gICdGVU5DVElPTlMnLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dMT0JBTCcsXG4gICdHUkFOVCcsXG4gICdHUkFOVEVEJyxcbiAgJ0dSRUFURVNUJyxcbiAgJ0dST1VQJyxcbiAgJ0dST1VQSU5HJyxcbiAgJ0dST1VQUycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBVklORycsXG4gICdIRUFERVInLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lMSUtFJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTU1VVEFCTEUnLFxuICAnSU1QTElDSVQnLFxuICAnSU1QT1JUJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVREUnLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lOSEVSSVQnLFxuICAnSU5IRVJJVFMnLFxuICAnSU5JVElBTExZJyxcbiAgJ0lOTElORScsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlBVVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5TVEVBRCcsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZPS0VSJyxcbiAgJ0lTJyxcbiAgJ0lTTlVMTCcsXG4gICdJU09MQVRJT04nLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnTEFCRUwnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEFTVCcsXG4gICdMQVRFUkFMJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBS1BST09GJyxcbiAgJ0xFQVNUJyxcbiAgJ0xFRlQnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMSVNURU4nLFxuICAnTE9BRCcsXG4gICdMT0NBTCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9DQVRJT04nLFxuICAnTE9DSycsXG4gICdMT0NLRUQnLFxuICAnTE9HR0VEJyxcbiAgJ01BUFBJTkcnLFxuICAnTUFUQ0gnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01BWFZBTFVFJyxcbiAgJ01FVEhPRCcsXG4gICdNSU5VVEUnLFxuICAnTUlOVkFMVUUnLFxuICAnTU9ERScsXG4gICdNT05USCcsXG4gICdNT1ZFJyxcbiAgJ05BTUUnLFxuICAnTkFNRVMnLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUVVJBTCcsXG4gICdOQ0hBUicsXG4gICdORVcnLFxuICAnTkVYVCcsXG4gICdORkMnLFxuICAnTkZEJyxcbiAgJ05GS0MnLFxuICAnTkZLRCcsXG4gICdOTycsXG4gICdOT05FJyxcbiAgJ05PUk1BTElaRScsXG4gICdOT1JNQUxJWkVEJyxcbiAgJ05PVCcsXG4gICdOT1RISU5HJyxcbiAgJ05PVElGWScsXG4gICdOT1ROVUxMJyxcbiAgJ05PV0FJVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVUxMUycsXG4gICdOVU1FUklDJyxcbiAgJ09CSkVDVCcsXG4gICdPRicsXG4gICdPRkYnLFxuICAnT0ZGU0VUJyxcbiAgJ09JRFMnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFUkFUT1InLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTlMnLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1JESU5BTElUWScsXG4gICdPVEhFUlMnLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ09XTkVEJyxcbiAgJ09XTkVSJyxcbiAgJ1BBUkFMTEVMJyxcbiAgJ1BBUlNFUicsXG4gICdQQVJUSUFMJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNTSU5HJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BMQUNJTkcnLFxuICAnUExBTlMnLFxuICAnUE9MSUNZJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BSRUNFRElORycsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUkVQQVJFRCcsXG4gICdQUkVTRVJWRScsXG4gICdQUklNQVJZJyxcbiAgJ1BSSU9SJyxcbiAgJ1BSSVZJTEVHRVMnLFxuICAnUFJPQ0VEVVJBTCcsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPQ0VEVVJFUycsXG4gICdQUk9HUkFNJyxcbiAgJ1BVQkxJQ0FUSU9OJyxcbiAgJ1FVT1RFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBTCcsXG4gICdSRUFTU0lHTicsXG4gICdSRUNIRUNLJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFSU5ERVgnLFxuICAnUkVMQVRJVkUnLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUQUJMRScsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUExJQ0EnLFxuICAnUkVTRVQnLFxuICAnUkVTVEFSVCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VVElORScsXG4gICdST1VUSU5FUycsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdSVUxFJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NIRU1BUycsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNVUklUWScsXG4gICdTRUxFQ1QnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VRVUVOQ0VTJyxcbiAgJ1NFUklBTElaQUJMRScsXG4gICdTRVJWRVInLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0VUJyxcbiAgJ1NFVE9GJyxcbiAgJ1NFVFMnLFxuICAnU0hBUkUnLFxuICAnU0hPVycsXG4gICdTSU1JTEFSJyxcbiAgJ1NJTVBMRScsXG4gICdTS0lQJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQVBTSE9UJyxcbiAgJ1NPTUUnLFxuICAnU1FMJyxcbiAgJ1NUQUJMRScsXG4gICdTVEFOREFMT05FJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRFTUVOVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ1NURElOJyxcbiAgJ1NURE9VVCcsXG4gICdTVE9SQUdFJyxcbiAgJ1NUT1JFRCcsXG4gICdTVFJJQ1QnLFxuICAnU1RSSVAnLFxuICAnU1VCU0NSSVBUSU9OJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVVBQT1JUJyxcbiAgJ1NZTU1FVFJJQycsXG4gICdTWVNJRCcsXG4gICdTWVNURU0nLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEVNUCcsXG4gICdURU1QTEFURScsXG4gICdURU1QT1JBUlknLFxuICAnVEVYVCcsXG4gICdUSEVOJyxcbiAgJ1RJRVMnLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNGT1JNJyxcbiAgJ1RSRUFUJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJJTScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RSVVNURUQnLFxuICAnVFlQRScsXG4gICdUWVBFUycsXG4gICdVRVNDQVBFJyxcbiAgJ1VOQk9VTkRFRCcsXG4gICdVTkNPTU1JVFRFRCcsXG4gICdVTkVOQ1JZUFRFRCcsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTkxJU1RFTicsXG4gICdVTkxPR0dFRCcsXG4gICdVTlRJTCcsXG4gICdVUERBVEUnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUNVVU0nLFxuICAnVkFMSUQnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMSURBVE9SJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBTFVFUycsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUklBRElDJyxcbiAgJ1ZBUllJTkcnLFxuICAnVkVSQk9TRScsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVklFV1MnLFxuICAnVk9MQVRJTEUnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElURVNQQUNFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1dPUksnLFxuICAnV1JBUFBFUicsXG4gICdXUklURScsXG4gICdYTUwnLFxuICAnWE1MQVRUUklCVVRFUycsXG4gICdYTUxDT05DQVQnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MRk9SRVNUJyxcbiAgJ1hNTE5BTUVTUEFDRVMnLFxuICAnWE1MUEFSU0UnLFxuICAnWE1MUEknLFxuICAnWE1MUk9PVCcsXG4gICdYTUxTRVJJQUxJWkUnLFxuICAnWE1MVEFCTEUnLFxuICAnWUVBUicsXG4gICdZRVMnLFxuICAnWk9ORScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NBU0UnLFxuICAnREVMRVRFIEZST00nLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdGdyZVNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsIFwiVSYnJ1wiLCAnVSZcIlwiJywgJyQkJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgJzw8JyxcbiAgICAgICAgJz4+JyxcbiAgICAgICAgJ3x8LycsXG4gICAgICAgICd8LycsXG4gICAgICAgICc6OicsXG4gICAgICAgICctPj4nLFxuICAgICAgICAnLT4nLFxuICAgICAgICAnfn4qJyxcbiAgICAgICAgJ35+JyxcbiAgICAgICAgJyF+fionLFxuICAgICAgICAnIX5+JyxcbiAgICAgICAgJ34qJyxcbiAgICAgICAgJyF+KicsXG4gICAgICAgICchficsXG4gICAgICBdLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUVTMTI4JyxcbiAgJ0FFUzI1NicsXG4gICdBTExPV09WRVJXUklURScsXG4gICdBTkFMWVNFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0JBQ0tVUCcsXG4gICdCSU5BUlknLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JPVEgnLFxuICAnQllURURJQ1QnLFxuICAnQlpJUDInLFxuICAnQ0FTVCcsXG4gICdDSEVDSycsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTFVNTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NSRUFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJSRU5UX1VTRVJfSUQnLFxuICAnREVGQVVMVCcsXG4gICdERUZFUlJBQkxFJyxcbiAgJ0RFRkxBVEUnLFxuICAnREVGUkFHJyxcbiAgJ0RFTFRBJyxcbiAgJ0RFTFRBMzJLJyxcbiAgJ0RFU0MnLFxuICAnRElTQUJMRScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdFTFNFJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPREUnLFxuICAnRU5DUllQVCcsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFWFBMSUNJVCcsXG4gICdGQUxTRScsXG4gICdGT1InLFxuICAnRk9SRUlHTicsXG4gICdGUkVFWkUnLFxuICAnRlVMTCcsXG4gICdHTE9CQUxESUNUMjU2JyxcbiAgJ0dMT0JBTERJQ1Q2NEsnLFxuICAnR1JBTlQnLFxuICAnR1pJUCcsXG4gICdJREVOVElUWScsXG4gICdJR05PUkUnLFxuICAnSUxJS0UnLFxuICAnSU5JVElBTExZJyxcbiAgJ0lOVE8nLFxuICAnTEVBRElORycsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTFVOJyxcbiAgJ0xVTlMnLFxuICAnTFpPJyxcbiAgJ0xaT1AnLFxuICAnTUlOVVMnLFxuICAnTU9TVExZMTMnLFxuICAnTU9TVExZMzInLFxuICAnTU9TVExZOCcsXG4gICdOQVRVUkFMJyxcbiAgJ05FVycsXG4gICdOVUxMUycsXG4gICdPRkYnLFxuICAnT0ZGTElORScsXG4gICdPRkZTRVQnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUkRFUicsXG4gICdPVkVSTEFQUycsXG4gICdQQVJBTExFTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEVSQ0VOVCcsXG4gICdQRVJNSVNTSU9OUycsXG4gICdQTEFDSU5HJyxcbiAgJ1BSSU1BUlknLFxuICAnUkFXJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUNPVkVSJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVKRUNUTE9HJyxcbiAgJ1JFU09SVCcsXG4gICdSRVNUT1JFJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTSU1JTEFSJyxcbiAgJ1NZU0RBVEUnLFxuICAnU1lTVEVNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBRycsXG4gICdUREVTJyxcbiAgJ1RFWFQyNTUnLFxuICAnVEVYVDMySycsXG4gICdUSEVOJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUTycsXG4gICdUT1AnLFxuICAnVFJBSUxJTkcnLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnVU5JUVVFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkVSQk9TRScsXG4gICdXQUxMRVQnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1dJVEhPVVQnLFxuICAnUFJFRElDQVRFJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFJFU1NJT04nLFxuICAnQ09QWScsXG4gICdGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnQVZSTycsXG4gICdKU09OJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdCWklQMicsXG4gICdHWklQJyxcbiAgJ0xaT1AnLFxuICAnUEFSUVVFVCcsXG4gICdPUkMnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnREFURUZPUk1BVCcsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnTlVMTCBBUycsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnTUFOSUZFU1QnLFxuICAnUkVHSU9OJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ1NTSCcsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0FDQ0VTU19LRVlfSUQnLFxuICAnU0VDUkVUX0FDQ0VTU19LRVknLFxuICAnQVZSTycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQlpJUDInLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnRk9STUFUJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ0daSVAnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnSlNPTicsXG4gICdMWk9QJyxcbiAgJ01BTklGRVNUJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdOVUxMIEFTJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUdJT04nLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnU1NIJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnVElNRUZPUk1BVCcsXG4gICdTRVNTSU9OX1RPS0VOJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0RBVEEgQ0FUQUxPRycsXG4gICdISVZFIE1FVEFTVE9SRScsXG4gICdDQVRBTE9HX1JPTEUnLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0VWRU4nLFxuICAnQUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVE9QJyxcbiAgJ0xJTUlUJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VOSU9OIEFMTCcsXG4gICdVTklPTicsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdBTkFMWVpFJyxcbiAgJ0FOQUxZU0UnLFxuICAnRElTVEtFWScsXG4gICdTT1JUS0VZJyxcbiAgJ0NPTVBPVU5EJyxcbiAgJ0lOVEVSTEVBVkVEJyxcbiAgJ0ZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRklYRURXSURUSCcsXG4gICdBVlJPJyxcbiAgJ0pTT04nLFxuICAnRU5DUllQVEVEJyxcbiAgJ0JaSVAyJyxcbiAgJ0daSVAnLFxuICAnTFpPUCcsXG4gICdQQVJRVUVUJyxcbiAgJ09SQycsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdOVUxMIEFTJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnU1RBVFVQREFURScsXG4gICdNQU5JRkVTVCcsXG4gICdSRUdJT04nLFxuICAnSUFNX1JPTEUnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnU1NIJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQUNDRVNTX0tFWV9JRCcsXG4gICdTRUNSRVRfQUNDRVNTX0tFWScsXG4gICdBVlJPJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCWklQMicsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnRklYRURXSURUSCcsXG4gICdGT1JNQVQnLFxuICAnSUFNX1JPTEUnLFxuICAnR1pJUCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdKU09OJyxcbiAgJ0xaT1AnLFxuICAnTUFOSUZFU1QnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFR0lPTicsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdTU0gnLFxuICAnU1RBVFVQREFURScsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1NFU1NJT05fVE9LRU4nLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnRVhURVJOQUwnLFxuICAnREFUQSBDQVRBTE9HJyxcbiAgJ0hJVkUgTUVUQVNUT1JFJyxcbiAgJ0NBVEFMT0dfUk9MRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFtdO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnQU5BTFlaRScsXG4gICdBTkFMWVNFJyxcbiAgJ0RJU1RLRVknLFxuICAnU09SVEtFWScsXG4gICdDT01QT1VORCcsXG4gICdJTlRFUkxFQVZFRCcsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGFyZFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCcsICcjJywgJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgeyBpc0VuZCwgaXNXaW5kb3cgfSBmcm9tICcuLi9jb3JlL3Rva2VuJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi4vY29yZS90b2tlblR5cGVzJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVNFJyxcbiAgJ0FOQUxZWkUnLFxuICAnQVJSQVlfWklQJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVkcnLFxuICAnQkVUV0VFTicsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMRUNUX0xJU1QnLFxuICAnQ09MTEVDVF9TRVQnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09VTlQnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlQgUk9XJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFURV9BREQnLFxuICAnREFURV9TVUInLFxuICAnREFURV9UUlVOQycsXG4gICdEQVlfSE9VUicsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREFZJyxcbiAgJ0RBWVMnLFxuICAnREVDT0RFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdESVNUSU5DVCcsXG4gICdESVNUSU5DVFJPVycsXG4gICdESVYnLFxuICAnRFJPUCcsXG4gICdFTFNFJyxcbiAgJ0VOQ09ERScsXG4gICdFTkQnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhQTE9ERV9PVVRFUicsXG4gICdFWFBMT0RFJyxcbiAgJ0ZJTFRFUicsXG4gICdGSVJTVF9WQUxVRScsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTEFUVEVOJyxcbiAgJ0ZPTExPV0lORycsXG4gICdGUk9NX1VOSVhUSU1FJyxcbiAgJ0ZVTEwnLFxuICAnR1JFQVRFU1QnLFxuICAnR1JPVVBfQ09OQ0FUJyxcbiAgJ0hPVVJfTUlOVVRFJyxcbiAgJ0hPVVJfU0VDT05EJyxcbiAgJ0hPVVInLFxuICAnSE9VUlMnLFxuICAnSUYnLFxuICAnSUZOVUxMJyxcbiAgJ0lOJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0xBRycsXG4gICdMQVNUX1ZBTFVFJyxcbiAgJ0xBU1QnLFxuICAnTEVBRCcsXG4gICdMRUFESU5HJyxcbiAgJ0xFQVNUJyxcbiAgJ0xFVkVMJyxcbiAgJ0xJS0UnLFxuICAnTUFYJyxcbiAgJ01FUkdFJyxcbiAgJ01JTicsXG4gICdNSU5VVEVfU0VDT05EJyxcbiAgJ01JTlVURScsXG4gICdNT05USCcsXG4gICdOQVRVUkFMJyxcbiAgJ05PVCcsXG4gICdOT1coKScsXG4gICdOVElMRScsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdPRkZTRVQnLFxuICAnT04gREVMRVRFJyxcbiAgJ09OIFVQREFURScsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09WRVInLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BSRUNFRElORycsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFR0VYUCcsXG4gICdSRU5BTUUnLFxuICAnUkxJS0UnLFxuICAnUk9XJyxcbiAgJ1JPV1MnLFxuICAnU0VDT05EJyxcbiAgJ1NFUEFSQVRPUicsXG4gICdTRVFVRU5DRScsXG4gICdTSVpFJyxcbiAgJ1NUUklORycsXG4gICdTVFJVQ1QnLFxuICAnU1VNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFUycsXG4gICdURU1QT1JBUlknLFxuICAnVEhFTicsXG4gICdUT19EQVRFJyxcbiAgJ1RPX0pTT04nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNGT1JNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdUWVBFUycsXG4gICdVTkJPVU5ERUQnLFxuICAnVU5JUVVFJyxcbiAgJ1VOSVhfVElNRVNUQU1QJyxcbiAgJ1VOTE9DSycsXG4gICdVTlNJR05FRCcsXG4gICdVU0lORycsXG4gICdWQVJJQUJMRVMnLFxuICAnVklFVycsXG4gICdXSEVOJyxcbiAgJ1dJVEgnLFxuICAnWUVBUl9NT05USCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIERBVEFCQVNFJyxcbiAgJ0FMVEVSIFNDSEVNQScsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDTFVTVEVSIEJZJyxcbiAgJ0NMVVNURVJFRCBCWScsXG4gICdERUxFVEUgRlJPTScsXG4gICdESVNUUklCVVRFIEJZJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUFRJT05TJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1BBUlRJVElPTiBCWScsXG4gICdQQVJUSVRJT05FRCBCWScsXG4gICdSQU5HRScsXG4gICdST1dTJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVEJMUFJPUEVSVElFUycsXG4gICdVUERBVEUnLFxuICAnVVNJTkcnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbiAgJ1dJTkRPVycsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFtcbiAgJ0VYQ0VQVCBBTEwnLFxuICAnRVhDRVBUJyxcbiAgJ0lOVEVSU0VDVCBBTEwnLFxuICAnSU5URVJTRUNUJyxcbiAgJ1VOSU9OIEFMTCcsXG4gICdVTklPTicsXG5dO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdBTlRJIEpPSU4nLFxuICAnQ1JFQVRFIE9SJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMQVRFUkFMIFZJRVcnLFxuICAnTEVGVCBBTlRJIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdMRUZUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIEZVTEwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIElOTkVSIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBBTlRJIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgU0VNSSBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIFNFTUkgSk9JTicsXG4gICdTRU1JIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhcmtTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnLCAne30nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIGZ1bmN0aW9uc1xuICAgIGlmIChpc1dpbmRvdyh0b2tlbikpIHtcbiAgICAgIGNvbnN0IGFoZWFkVG9rZW4gPSB0aGlzLnRva2VuTG9va0FoZWFkKCk7XG4gICAgICBpZiAoYWhlYWRUb2tlbiAmJiBhaGVhZFRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICAvLyBUaGlzIGlzIGEgZnVuY3Rpb24gY2FsbCwgdHJlYXQgaXQgYXMgYSByZXNlcnZlZCB3b3JkXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgcHJvcGVydGllc1xuICAgIGlmIChpc0VuZCh0b2tlbikpIHtcbiAgICAgIGNvbnN0IGJhY2tUb2tlbiA9IHRoaXMudG9rZW5Mb29rQmVoaW5kKCk7XG4gICAgICBpZiAoYmFja1Rva2VuICYmIGJhY2tUb2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRVJBVE9SICYmIGJhY2tUb2tlbi52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgd2luZG93KCkuZW5kIChvciBzaW1pbGFyKSBub3QgQ0FTRSAuLi4gRU5EXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuV09SRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUNDRVNTSUJMRScsXG4gICdBQ1RJT04nLFxuICAnQUdBSU5TVCcsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxHT1JJVEhNJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVNFJyxcbiAgJ0FOQUxZWkUnLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FVVE9DT01NSVQnLFxuICAnQVVUT19JTkNSRU1FTlQnLFxuICAnQkFDS1VQJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklOTE9HJyxcbiAgJ0JPVEgnLFxuICAnQ0FTQ0FERScsXG4gICdDSEFOR0UnLFxuICAnQ0hBTkdFRCcsXG4gICdDSEFSQUNURVIgU0VUJyxcbiAgJ0NIQVJTRVQnLFxuICAnQ0hFQ0snLFxuICAnQ0hFQ0tTVU0nLFxuICAnQ09MTEFURScsXG4gICdDT0xMQVRJT04nLFxuICAnQ09MVU1OJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT01NSVQnLFxuICAnQ09NTUlUVEVEJyxcbiAgJ0NPTVBSRVNTRUQnLFxuICAnQ09OQ1VSUkVOVCcsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVknLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGSU5FUicsXG4gICdERUxBWUVEJyxcbiAgJ0RFTEVURScsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RPJyxcbiAgJ0RST1AnLFxuICAnRFVNUEZJTEUnLFxuICAnRFVQTElDQVRFJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUxTRScsXG4gICdFTkNMT1NFRCcsXG4gICdFTkdJTkUnLFxuICAnRU5HSU5FUycsXG4gICdFTkdJTkVfVFlQRScsXG4gICdFU0NBUEUnLFxuICAnRVNDQVBFRCcsXG4gICdFVkVOVFMnLFxuICAnRVhFQycsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYVEVOREVEJyxcbiAgJ0ZBU1QnLFxuICAnRkVUQ0gnLFxuICAnRklFTERTJyxcbiAgJ0ZJTEUnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxVU0gnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlVMTCcsXG4gICdGVUxMVEVYVCcsXG4gICdGVU5DVElPTicsXG4gICdHTE9CQUwnLFxuICAnR1JBTlQnLFxuICAnR1JBTlRTJyxcbiAgJ0dST1VQX0NPTkNBVCcsXG4gICdIRUFQJyxcbiAgJ0hJR0hfUFJJT1JJVFknLFxuICAnSE9TVFMnLFxuICAnSE9VUicsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdJREVOVElGSUVEJyxcbiAgJ0lGJyxcbiAgJ0lGTlVMTCcsXG4gICdJR05PUkUnLFxuICAnSU4nLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkZJTEUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOU0VSVF9JRCcsXG4gICdJTlNFUlRfTUVUSE9EJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WT0tFUicsXG4gICdJUycsXG4gICdJU09MQVRJT04nLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0lMTCcsXG4gICdMQVNUX0lOU0VSVF9JRCcsXG4gICdMRUFESU5HJyxcbiAgJ0xFVkVMJyxcbiAgJ0xJS0UnLFxuICAnTElORUFSJyxcbiAgJ0xJTkVTJyxcbiAgJ0xPQUQnLFxuICAnTE9DQUwnLFxuICAnTE9DSycsXG4gICdMT0NLUycsXG4gICdMT0dTJyxcbiAgJ0xPV19QUklPUklUWScsXG4gICdNQVJJQScsXG4gICdNQVNURVInLFxuICAnTUFTVEVSX0NPTk5FQ1RfUkVUUlknLFxuICAnTUFTVEVSX0hPU1QnLFxuICAnTUFTVEVSX0xPR19GSUxFJyxcbiAgJ01BVENIJyxcbiAgJ01BWF9DT05ORUNUSU9OU19QRVJfSE9VUicsXG4gICdNQVhfUVVFUklFU19QRVJfSE9VUicsXG4gICdNQVhfUk9XUycsXG4gICdNQVhfVVBEQVRFU19QRVJfSE9VUicsXG4gICdNQVhfVVNFUl9DT05ORUNUSU9OUycsXG4gICdNRURJVU0nLFxuICAnTUVSR0UnLFxuICAnTUlOVVRFJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTUlOX1JPV1MnLFxuICAnTU9ERScsXG4gICdNT0RJRlknLFxuICAnTU9OVEgnLFxuICAnTVJHX01ZSVNBTScsXG4gICdNWUlTQU0nLFxuICAnTkFNRVMnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9XKCknLFxuICAnTlVMTCcsXG4gICdPRkZTRVQnLFxuICAnT04gREVMRVRFJyxcbiAgJ09OIFVQREFURScsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRU4nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTkFMTFknLFxuICAnT1VURklMRScsXG4gICdQQUNLX0tFWVMnLFxuICAnUEFHRScsXG4gICdQQVJUSUFMJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVJUSVRJT05TJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPQ0VTUycsXG4gICdQUk9DRVNTTElTVCcsXG4gICdQVVJHRScsXG4gICdRVUlDSycsXG4gICdSQUlEMCcsXG4gICdSQUlEX0NIVU5LUycsXG4gICdSQUlEX0NIVU5LU0laRScsXG4gICdSQUlEX1RZUEUnLFxuICAnUkFOR0UnLFxuICAnUkVBRCcsXG4gICdSRUFEX09OTFknLFxuICAnUkVBRF9XUklURScsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFR0VYUCcsXG4gICdSRUxPQUQnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEFJUicsXG4gICdSRVBFQVRBQkxFJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVQTElDQVRJT04nLFxuICAnUkVTRVQnLFxuICAnUkVTVE9SRScsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUkxJS0UnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9XJyxcbiAgJ1JPV1MnLFxuICAnUk9XX0ZPUk1BVCcsXG4gICdTRUNPTkQnLFxuICAnU0VDVVJJVFknLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFUklBTElaQUJMRScsXG4gICdTRVNTSU9OJyxcbiAgJ1NIQVJFJyxcbiAgJ1NIT1cnLFxuICAnU0hVVERPV04nLFxuICAnU0xBVkUnLFxuICAnU09OQU1FJyxcbiAgJ1NPVU5EUycsXG4gICdTUUwnLFxuICAnU1FMX0FVVE9fSVNfTlVMTCcsXG4gICdTUUxfQklHX1JFU1VMVCcsXG4gICdTUUxfQklHX1NFTEVDVFMnLFxuICAnU1FMX0JJR19UQUJMRVMnLFxuICAnU1FMX0JVRkZFUl9SRVNVTFQnLFxuICAnU1FMX0NBQ0hFJyxcbiAgJ1NRTF9DQUxDX0ZPVU5EX1JPV1MnLFxuICAnU1FMX0xPR19CSU4nLFxuICAnU1FMX0xPR19PRkYnLFxuICAnU1FMX0xPR19VUERBVEUnLFxuICAnU1FMX0xPV19QUklPUklUWV9VUERBVEVTJyxcbiAgJ1NRTF9NQVhfSk9JTl9TSVpFJyxcbiAgJ1NRTF9OT19DQUNIRScsXG4gICdTUUxfUVVPVEVfU0hPV19DUkVBVEUnLFxuICAnU1FMX1NBRkVfVVBEQVRFUycsXG4gICdTUUxfU0VMRUNUX0xJTUlUJyxcbiAgJ1NRTF9TTEFWRV9TS0lQX0NPVU5URVInLFxuICAnU1FMX1NNQUxMX1JFU1VMVCcsXG4gICdTUUxfV0FSTklOR1MnLFxuICAnU1RBUlQnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVFVTJyxcbiAgJ1NUT1AnLFxuICAnU1RPUkFHRScsXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ1NUUklORycsXG4gICdTVFJJUEVEJyxcbiAgJ1NVUEVSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFUycsXG4gICdURU1QT1JBUlknLFxuICAnVEVSTUlOQVRFRCcsXG4gICdUSEVOJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OQUwnLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VOQ09NTUlUVEVEJyxcbiAgJ1VOSVFVRScsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVNBR0UnLFxuICAnVVNFJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBUklBQkxFUycsXG4gICdWSUVXJyxcbiAgJ1dJVEgnLFxuICAnV09SSycsXG4gICdXUklURScsXG4gICdZRUFSX01PTlRIJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnR08nLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgQVBQTFknLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuICAnWE9SJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5kYXJkU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ2BgJywgJ1tdJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJywgJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnIycsICctLSddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRGIyRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlcic7XG5pbXBvcnQgTWFyaWFEYkZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9NYXJpYURiRm9ybWF0dGVyJztcbmltcG9ydCBOMXFsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFBsU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyJztcbmltcG9ydCBQb3N0Z3JlU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFJlZHNoaWZ0Rm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1JlZHNoaWZ0Rm9ybWF0dGVyJztcbmltcG9ydCBTcGFya1NxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TcGFya1NxbEZvcm1hdHRlcic7XG5pbXBvcnQgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXInO1xuXG5jb25zdCBmb3JtYXR0ZXJzID0ge1xuICBkYjI6IERiMkZvcm1hdHRlcixcbiAgbWFyaWFkYjogTWFyaWFEYkZvcm1hdHRlcixcbiAgbjFxbDogTjFxbEZvcm1hdHRlcixcbiAgJ3BsL3NxbCc6IFBsU3FsRm9ybWF0dGVyLFxuICBwbHNxbDogUGxTcWxGb3JtYXR0ZXIsXG4gIHBvc3RncmVzcWw6IFBvc3RncmVTcWxGb3JtYXR0ZXIsXG4gIHJlZHNoaWZ0OiBSZWRzaGlmdEZvcm1hdHRlcixcbiAgc3Bhcms6IFNwYXJrU3FsRm9ybWF0dGVyLFxuICBzcWw6IFN0YW5kYXJkU3FsRm9ybWF0dGVyLFxufTtcblxuLyoqXG4gKiBGb3JtYXQgd2hpdGVzcGFjZSBpbiBhIHF1ZXJ5IHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudCBDaGFyYWN0ZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlIENvbnZlcnRzIGtleXdvcmRzIHRvIHVwcGVyY2FzZVxuICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgSG93IG1hbnkgbGluZSBicmVha3MgYmV0d2VlbiBxdWVyaWVzXG4gKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXMgQ29sbGVjdGlvbiBvZiBwYXJhbXMgZm9yIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXQgPSAocXVlcnksIGNmZyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHF1ZXJ5IGFyZ3VtZW50LiBFeHRlY3RlZCBzdHJpbmcsIGluc3RlYWQgZ290ICcgKyB0eXBlb2YgcXVlcnkpO1xuICB9XG5cbiAgbGV0IEZvcm1hdHRlciA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xuICBpZiAoY2ZnLmxhbmd1YWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBGb3JtYXR0ZXIgPSBmb3JtYXR0ZXJzW2NmZy5sYW5ndWFnZV07XG4gIH1cbiAgaWYgKEZvcm1hdHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVuc3VwcG9ydGVkIFNRTCBkaWFsZWN0OiAke2NmZy5sYW5ndWFnZX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEZvcm1hdHRlcihjZmcpLmZvcm1hdChxdWVyeSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRGlhbGVjdHMgPSBPYmplY3Qua2V5cyhmb3JtYXR0ZXJzKTtcbiIsIi8vIE9ubHkgcmVtb3ZlcyBzcGFjZXMsIG5vdCBuZXdsaW5lc1xuZXhwb3J0IGNvbnN0IHRyaW1TcGFjZXNFbmQgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvWyBcXHRdKyQvdSwgJycpO1xuXG4vLyBMYXN0IGVsZW1lbnQgZnJvbSBhcnJheVxuZXhwb3J0IGNvbnN0IGxhc3QgPSAoYXJyKSA9PiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuXG4vLyBUcnVlIGFycmF5IGlzIGVtcHR5LCBvciBpdCdzIG5vdCBhbiBhcnJheSBhdCBhbGxcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gKGFycikgPT4gIUFycmF5LmlzQXJyYXkoYXJyKSB8fCBhcnIubGVuZ3RoID09PSAwO1xuXG4vLyBFc2NhcGVzIHJlZ2V4IHNwZWNpYWwgY2hhcnNcbmV4cG9ydCBjb25zdCBlc2NhcGVSZWdFeHAgPSAoc3RyaW5nKSA9PiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2d1LCAnXFxcXCQmJyk7XG5cbi8vIFNvcnRzIHN0cmluZ3MgYnkgbGVuZ3RoLCBzbyB0aGF0IGxvbmdlciBvbmVzIGFyZSBmaXJzdFxuLy8gQWxzbyBzb3J0cyBhbHBoYWJldGljYWxseSBhZnRlciBzb3J0aW5nIGJ5IGxlbmd0aC5cbmV4cG9ydCBjb25zdCBzb3J0QnlMZW5ndGhEZXNjID0gKHN0cmluZ3MpID0+XG4gIHN0cmluZ3Muc29ydCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoIHx8IGEubG9jYWxlQ29tcGFyZShiKTtcbiAgfSk7XG4iXSwic291cmNlUm9vdCI6IiJ9