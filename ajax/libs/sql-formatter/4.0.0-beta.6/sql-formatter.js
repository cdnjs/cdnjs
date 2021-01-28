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
    "N''": "((N'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
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
        operators: [':=', '<<', '>>', '!=', '<>', '<=>', '&&', '||']
      });
    }
  }]);

  return MariaDbFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/MySqlFormatter.js":
/*!*****************************************!*\
  !*** ./src/languages/MySqlFormatter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MySqlFormatter; });
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



var reservedWords = ['ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELAYED', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'EMPTY', 'ENCLOSED', 'ESCAPED', 'EXCEPT', 'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST_VALUE', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT', 'FUNCTION', 'GENERATED', 'GET', 'GRANT', 'GROUP', 'GROUPING', 'GROUPS', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERVAL', 'INTO', 'IO_AFTER_GTIDS', 'IO_BEFORE_GTIDS', 'IS', 'ITERATE', 'JOIN', 'JSON_TABLE', 'KEY', 'KEYS', 'KILL', 'LAG', 'LAST_VALUE', 'LATERAL', 'LEAD', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER_BIND', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NTH_VALUE', 'NTILE', 'NULL', 'NUMERIC', 'OF', 'ON', 'OPTIMIZE', 'OPTIMIZER_COSTS', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'PARTITION', 'PERCENT_RANK', 'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE', 'RANGE', 'RANK', 'READ', 'READS', 'READ_WRITE', 'REAL', 'RECURSIVE', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL', 'RESTRICT', 'RETURN', 'REVOKE', 'RIGHT', 'RLIKE', 'ROW', 'ROWS', 'ROW_NUMBER', 'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STORED', 'STRAIGHT_JOIN', 'SYSTEM', 'TABLE', 'TERMINATED', 'THEN', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'VIRTUAL', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN'];

var MySqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(MySqlFormatter, _Formatter);

  var _super = _createSuper(MySqlFormatter);

  function MySqlFormatter() {
    _classCallCheck(this, MySqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(MySqlFormatter, [{
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
        operators: [':=', '<<', '>>', '!=', '<>', '<=>', '&&', '||', '->', '->>']
      });
    }
  }]);

  return MySqlFormatter;
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

/***/ "./src/languages/TSqlFormatter.js":
/*!****************************************!*\
  !*** ./src/languages/TSqlFormatter.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TSqlFormatter; });
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



var reservedWords = ['ADD', 'EXTERNAL', 'PROCEDURE', 'ALL', 'FETCH', 'PUBLIC', 'ALTER', 'FILE', 'RAISERROR', 'AND', 'FILLFACTOR', 'READ', 'ANY', 'FOR', 'READTEXT', 'AS', 'FOREIGN', 'RECONFIGURE', 'ASC', 'FREETEXT', 'REFERENCES', 'AUTHORIZATION', 'FREETEXTTABLE', 'REPLICATION', 'BACKUP', 'FROM', 'RESTORE', 'BEGIN', 'FULL', 'RESTRICT', 'BETWEEN', 'FUNCTION', 'RETURN', 'BREAK', 'GOTO', 'REVERT', 'BROWSE', 'GRANT', 'REVOKE', 'BULK', 'GROUP', 'RIGHT', 'BY', 'HAVING', 'ROLLBACK', 'CASCADE', 'HOLDLOCK', 'ROWCOUNT', 'CASE', 'IDENTITY', 'ROWGUIDCOL', 'CHECK', 'IDENTITY_INSERT', 'RULE', 'CHECKPOINT', 'IDENTITYCOL', 'SAVE', 'CLOSE', 'IF', 'SCHEMA', 'CLUSTERED', 'IN', 'SECURITYAUDIT', 'COALESCE', 'INDEX', 'SELECT', 'COLLATE', 'INNER', 'SEMANTICKEYPHRASETABLE', 'COLUMN', 'INSERT', 'SEMANTICSIMILARITYDETAILSTABLE', 'COMMIT', 'INTERSECT', 'SEMANTICSIMILARITYTABLE', 'COMPUTE', 'INTO', 'SESSION_USER', 'CONSTRAINT', 'IS', 'SET', 'CONTAINS', 'JOIN', 'SETUSER', 'CONTAINSTABLE', 'KEY', 'SHUTDOWN', 'CONTINUE', 'KILL', 'SOME', 'CONVERT', 'LEFT', 'STATISTICS', 'CREATE', 'LIKE', 'SYSTEM_USER', 'CROSS', 'LINENO', 'TABLE', 'CURRENT', 'LOAD', 'TABLESAMPLE', 'CURRENT_DATE', 'MERGE', 'TEXTSIZE', 'CURRENT_TIME', 'NATIONAL', 'THEN', 'CURRENT_TIMESTAMP', 'NOCHECK', 'TO', 'CURRENT_USER', 'NONCLUSTERED', 'TOP', 'CURSOR', 'NOT', 'TRAN', 'DATABASE', 'NULL', 'TRANSACTION', 'DBCC', 'NULLIF', 'TRIGGER', 'DEALLOCATE', 'OF', 'TRUNCATE', 'DECLARE', 'OFF', 'TRY_CONVERT', 'DEFAULT', 'OFFSETS', 'TSEQUAL', 'DELETE', 'ON', 'UNION', 'DENY', 'OPEN', 'UNIQUE', 'DESC', 'OPENDATASOURCE', 'UNPIVOT', 'DISK', 'OPENQUERY', 'UPDATE', 'DISTINCT', 'OPENROWSET', 'UPDATETEXT', 'DISTRIBUTED', 'OPENXML', 'USE', 'DOUBLE', 'OPTION', 'USER', 'DROP', 'OR', 'VALUES', 'DUMP', 'ORDER', 'VARYING', 'ELSE', 'OUTER', 'VIEW', 'END', 'OVER', 'WAITFOR', 'ERRLVL', 'PERCENT', 'WHEN', 'ESCAPE', 'PIVOT', 'WHERE', 'EXCEPT', 'PLAN', 'WHILE', 'EXEC', 'PRECISION', 'WITH', 'EXECUTE', 'PRIMARY', 'WITHIN GROUP', 'EXISTS', 'PRINT', 'WRITETEXT', 'EXIT', 'PROC'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS JOIN', 'ELSE', 'INNER JOIN', 'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'OR', 'OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'WHEN'];

var TSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(TSqlFormatter, _Formatter);

  var _super = _createSuper(TSqlFormatter);

  function TSqlFormatter() {
    _classCallCheck(this, TSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(TSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "N''", "''", '[]'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: [],
        namedPlaceholderTypes: ['@'],
        lineCommentTypes: ['--'],
        specialWordChars: ['#', '@'],
        operators: ['>=', '<=', '<>', '!=', '!<', '!>', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '^=', '::'] // TODO: Support for money constants

      });
    }
  }]);

  return TSqlFormatter;
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
/* harmony import */ var _languages_MySqlFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./languages/MySqlFormatter */ "./src/languages/MySqlFormatter.js");
/* harmony import */ var _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/N1qlFormatter */ "./src/languages/N1qlFormatter.js");
/* harmony import */ var _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./languages/PlSqlFormatter */ "./src/languages/PlSqlFormatter.js");
/* harmony import */ var _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/PostgreSqlFormatter */ "./src/languages/PostgreSqlFormatter.js");
/* harmony import */ var _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./languages/RedshiftFormatter */ "./src/languages/RedshiftFormatter.js");
/* harmony import */ var _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./languages/SparkSqlFormatter */ "./src/languages/SparkSqlFormatter.js");
/* harmony import */ var _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./languages/StandardSqlFormatter */ "./src/languages/StandardSqlFormatter.js");
/* harmony import */ var _languages_TSqlFormatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./languages/TSqlFormatter */ "./src/languages/TSqlFormatter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }











var formatters = {
  db2: _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__["default"],
  mariadb: _languages_MariaDbFormatter__WEBPACK_IMPORTED_MODULE_1__["default"],
  mysql: _languages_MySqlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  n1ql: _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_3__["default"],
  'pl/sql': _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_4__["default"],
  plsql: _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_4__["default"],
  postgresql: _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_5__["default"],
  redshift: _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_6__["default"],
  spark: _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_7__["default"],
  sql: _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_8__["default"],
  tsql: _languages_TSqlFormatter__WEBPACK_IMPORTED_MODULE_9__["default"]
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

  var Formatter = _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_8__["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9NeVNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9UU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9zcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkZvcm1hdHRlciIsImNmZyIsImluZGVudGF0aW9uIiwiSW5kZW50YXRpb24iLCJpbmRlbnQiLCJpbmxpbmVCbG9jayIsIklubGluZUJsb2NrIiwicGFyYW1zIiwiUGFyYW1zIiwicHJldmlvdXNSZXNlcnZlZFRva2VuIiwidG9rZW5zIiwiaW5kZXgiLCJFcnJvciIsInRva2VuIiwicXVlcnkiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImZvcm1hdHRlZFF1ZXJ5IiwiZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zIiwidHJpbSIsImZvckVhY2giLCJ0b2tlbk92ZXJyaWRlIiwidHlwZSIsInRva2VuVHlwZXMiLCJMSU5FX0NPTU1FTlQiLCJmb3JtYXRMaW5lQ29tbWVudCIsIkJMT0NLX0NPTU1FTlQiLCJmb3JtYXRCbG9ja0NvbW1lbnQiLCJSRVNFUlZFRF9UT1BfTEVWRUwiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCIsIlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZE5vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORSIsImZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQiLCJSRVNFUlZFRCIsImZvcm1hdFdpdGhTcGFjZXMiLCJPUEVOX1BBUkVOIiwiZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzIiwiQ0xPU0VfUEFSRU4iLCJmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXMiLCJQTEFDRUhPTERFUiIsImZvcm1hdFBsYWNlaG9sZGVyIiwidmFsdWUiLCJmb3JtYXRDb21tYSIsImZvcm1hdFdpdGhTcGFjZUFmdGVyIiwiZm9ybWF0V2l0aG91dFNwYWNlcyIsImZvcm1hdFF1ZXJ5U2VwYXJhdG9yIiwiYWRkTmV3bGluZSIsInNob3ciLCJpbmRlbnRDb21tZW50IiwiY29tbWVudCIsInJlcGxhY2UiLCJnZXRJbmRlbnQiLCJkZWNyZWFzZVRvcExldmVsIiwiZXF1YWxpemVXaGl0ZXNwYWNlIiwiaW5jcmVhc2VUb3BMZXZlbCIsImlzQW5kIiwiaXNCZXR3ZWVuIiwidG9rZW5Mb29rQmVoaW5kIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJ3aGl0ZXNwYWNlQmVmb3JlIiwibGVuZ3RoIiwidHJpbVNwYWNlc0VuZCIsImJlZ2luSWZQb3NzaWJsZSIsImlzQWN0aXZlIiwiaW5jcmVhc2VCbG9ja0xldmVsIiwiZW5kIiwiZGVjcmVhc2VCbG9ja0xldmVsIiwiZ2V0IiwiaXNMaW1pdCIsInJlc2V0SW5kZW50YXRpb24iLCJyZXBlYXQiLCJsaW5lc0JldHdlZW5RdWVyaWVzIiwidXBwZXJjYXNlIiwidG9VcHBlckNhc2UiLCJlbmRzV2l0aCIsIm4iLCJJTkRFTlRfVFlQRV9UT1BfTEVWRUwiLCJJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCIsImluZGVudFR5cGVzIiwicHVzaCIsImxhc3QiLCJwb3AiLCJJTkxJTkVfTUFYX0xFTkdUSCIsImxldmVsIiwiaXNJbmxpbmVCbG9jayIsImkiLCJpc0ZvcmJpZGRlblRva2VuIiwiQ09NTUVOVCIsImtleSIsIlRva2VuaXplciIsIldISVRFU1BBQ0VfUkVHRVgiLCJOVU1CRVJfUkVHRVgiLCJPUEVSQVRPUl9SRUdFWCIsInJlZ2V4RmFjdG9yeSIsIm9wZXJhdG9ycyIsIkJMT0NLX0NPTU1FTlRfUkVHRVgiLCJMSU5FX0NPTU1FTlRfUkVHRVgiLCJsaW5lQ29tbWVudFR5cGVzIiwiUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCIsInJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORV9SRUdFWCIsInJlc2VydmVkTmV3bGluZVdvcmRzIiwiUkVTRVJWRURfUExBSU5fUkVHRVgiLCJyZXNlcnZlZFdvcmRzIiwiV09SRF9SRUdFWCIsInNwZWNpYWxXb3JkQ2hhcnMiLCJTVFJJTkdfUkVHRVgiLCJzdHJpbmdUeXBlcyIsIk9QRU5fUEFSRU5fUkVHRVgiLCJvcGVuUGFyZW5zIiwiQ0xPU0VfUEFSRU5fUkVHRVgiLCJjbG9zZVBhcmVucyIsIklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbmRleGVkUGxhY2Vob2xkZXJUeXBlcyIsIklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwibmFtZWRQbGFjZWhvbGRlclR5cGVzIiwiU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiaW5wdXQiLCJnZXRXaGl0ZXNwYWNlIiwic3Vic3RyaW5nIiwiZ2V0TmV4dFRva2VuIiwibWF0Y2hlcyIsIm1hdGNoIiwicHJldmlvdXNUb2tlbiIsImdldENvbW1lbnRUb2tlbiIsImdldFN0cmluZ1Rva2VuIiwiZ2V0T3BlblBhcmVuVG9rZW4iLCJnZXRDbG9zZVBhcmVuVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuIiwiZ2V0TnVtYmVyVG9rZW4iLCJnZXRSZXNlcnZlZFdvcmRUb2tlbiIsImdldFdvcmRUb2tlbiIsImdldE9wZXJhdG9yVG9rZW4iLCJnZXRMaW5lQ29tbWVudFRva2VuIiwiZ2V0QmxvY2tDb21tZW50VG9rZW4iLCJnZXRUb2tlbk9uRmlyc3RNYXRjaCIsInJlZ2V4IiwiU1RSSU5HIiwiZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5IiwicGFyc2VLZXkiLCJ2Iiwic2xpY2UiLCJnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkiLCJxdW90ZUNoYXIiLCJSZWdFeHAiLCJlc2NhcGVSZWdFeHAiLCJOVU1CRVIiLCJ1bmRlZmluZWQiLCJnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4iLCJnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbiIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50IiwiZ2V0UGxhaW5SZXNlcnZlZFRva2VuIiwiV09SRCIsImNyZWF0ZU9wZXJhdG9yUmVnZXgiLCJtdWx0aUxldHRlck9wZXJhdG9ycyIsInNvcnRCeUxlbmd0aERlc2MiLCJtYXAiLCJqb2luIiwiY3JlYXRlTGluZUNvbW1lbnRSZWdleCIsImMiLCJjcmVhdGVSZXNlcnZlZFdvcmRSZWdleCIsInJlc2VydmVkV29yZHNQYXR0ZXJuIiwiY3JlYXRlV29yZFJlZ2V4Iiwic3BlY2lhbENoYXJzIiwiY3JlYXRlU3RyaW5nUmVnZXgiLCJjcmVhdGVTdHJpbmdQYXR0ZXJuIiwicGF0dGVybnMiLCIkJCIsInQiLCJjcmVhdGVQYXJlblJlZ2V4IiwicGFyZW5zIiwiZXNjYXBlUGFyZW4iLCJwYXJlbiIsImNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgiLCJ0eXBlcyIsInBhdHRlcm4iLCJpc0VtcHR5IiwidHlwZXNSZWdleCIsImlzVG9rZW4iLCJ0ZXN0IiwiaXNTZXQiLCJpc0J5IiwiaXNXaW5kb3ciLCJpc0VuZCIsIkRiMkZvcm1hdHRlciIsIk1hcmlhRGJGb3JtYXR0ZXIiLCJNeVNxbEZvcm1hdHRlciIsIk4xcWxGb3JtYXR0ZXIiLCJQbFNxbEZvcm1hdHRlciIsIlBvc3RncmVTcWxGb3JtYXR0ZXIiLCJTdGFuZGFyZFNxbEZvcm1hdHRlciIsIlNwYXJrU3FsRm9ybWF0dGVyIiwiYWhlYWRUb2tlbiIsInRva2VuTG9va0FoZWFkIiwiYmFja1Rva2VuIiwiVFNxbEZvcm1hdHRlciIsImZvcm1hdHRlcnMiLCJkYjIiLCJtYXJpYWRiIiwibXlzcWwiLCJuMXFsIiwicGxzcWwiLCJwb3N0Z3Jlc3FsIiwicmVkc2hpZnQiLCJSZWRzaGlmdEZvcm1hdHRlciIsInNwYXJrIiwic3FsIiwidHNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Iiwic3RyaW5ncyIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxTO0FBQ25C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RDtBQUFBLFNBQVMsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFOLENBQWNGLEdBQWQsQ0FBRCxJQUF1QkEsR0FBRyxDQUFDL0osTUFBSixLQUFlLENBQS9DO0FBQUEsQ0FBaEIsQyxDQUVQOztBQUNPLElBQU0wRixZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDOUYsTUFBRDtBQUFBLFNBQVlBLE1BQU0sQ0FBQ1IsT0FBUCxDQUFlLDBCQUFmLEVBQXVDLE1BQXZDLENBQVo7QUFBQSxDQUFyQixDLENBRVA7QUFDQTs7QUFDTyxJQUFNZ0gsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDOEQsT0FBRDtBQUFBLFNBQzlCQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUNyQixXQUFPQSxDQUFDLENBQUNySyxNQUFGLEdBQVdvSyxDQUFDLENBQUNwSyxNQUFiLElBQXVCb0ssQ0FBQyxDQUFDRSxhQUFGLENBQWdCRCxDQUFoQixDQUE5QjtBQUNELEdBRkQsQ0FEOEI7QUFBQSxDQUF6QixDIiwiZmlsZSI6InNxbC1mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzcWxGb3JtYXR0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic3FsRm9ybWF0dGVyXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zcWxGb3JtYXR0ZXIuanNcIik7XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0IEluZGVudGF0aW9uIGZyb20gJy4vSW5kZW50YXRpb24nO1xuaW1wb3J0IElubGluZUJsb2NrIGZyb20gJy4vSW5saW5lQmxvY2snO1xuaW1wb3J0IFBhcmFtcyBmcm9tICcuL1BhcmFtcyc7XG5pbXBvcnQgeyB0cmltU3BhY2VzRW5kIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgaXNBbmQsIGlzQmV0d2VlbiwgaXNMaW1pdCB9IGZyb20gJy4vdG9rZW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXR0ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnRcbiAgICogIEBwYXJhbSB7Qm9vbGVhbn0gY2ZnLnVwcGVyY2FzZVxuICAgKiAgQHBhcmFtIHtJbnRlZ2VyfSBjZmcubGluZXNCZXR3ZWVuUXVlcmllc1xuICAgKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIHRoaXMuaW5kZW50YXRpb24gPSBuZXcgSW5kZW50YXRpb24odGhpcy5jZmcuaW5kZW50KTtcbiAgICB0aGlzLmlubGluZUJsb2NrID0gbmV3IElubGluZUJsb2NrKCk7XG4gICAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zKHRoaXMuY2ZnLnBhcmFtcyk7XG4gICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB7fTtcbiAgICB0aGlzLnRva2VucyA9IFtdO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNRTCBUb2tlbml6ZXIgZm9yIHRoaXMgZm9ybWF0dGVyLCBwcm92aWRlZCBieSBzdWJjbGFzc2VzLlxuICAgKi9cbiAgdG9rZW5pemVyKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndG9rZW5pemVyKCkgbm90IGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVwcm9jZXNzIGFuZCBtb2RpZnkgYSB0b2tlbiBiYXNlZCBvbiBwYXJzZWQgY29udGV4dC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuIFRoZSB0b2tlbiB0byBtb2RpZnlcbiAgICogIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICogQHJldHVybiB7T2JqZWN0fSBuZXcgdG9rZW4gb3IgdGhlIG9yaWdpbmFsXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICovXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBzdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIG1vZGlmeSB0b2tlbnMgZHVyaW5nIGZvcm1hdHRpbmdcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0cyB3aGl0ZXNwYWNlIGluIGEgU1FMIHN0cmluZyB0byBtYWtlIGl0IGVhc2llciB0byByZWFkLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIFNRTCBxdWVyeSBzdHJpbmdcbiAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgcXVlcnlcbiAgICovXG4gIGZvcm1hdChxdWVyeSkge1xuICAgIHRoaXMudG9rZW5zID0gdGhpcy50b2tlbml6ZXIoKS50b2tlbml6ZShxdWVyeSk7XG4gICAgY29uc3QgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5LnRyaW0oKTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpIHtcbiAgICBsZXQgZm9ybWF0dGVkUXVlcnkgPSAnJztcblxuICAgIHRoaXMudG9rZW5zLmZvckVhY2goKHRva2VuLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5PdmVycmlkZSh0b2tlbik7XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5QTEFDRUhPTERFUikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcsJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q29tbWEodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc6Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJzsnKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnk7XG4gIH1cblxuICBmb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSk7XG4gIH1cblxuICBmb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZSh0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5pbmRlbnRDb21tZW50KHRva2VuLnZhbHVlKSk7XG4gIH1cblxuICBpbmRlbnRDb21tZW50KGNvbW1lbnQpIHtcbiAgICByZXR1cm4gY29tbWVudC5yZXBsYWNlKC9cXG5bIFxcdF0qL2d1LCAnXFxuJyArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCkgKyAnICcpO1xuICB9XG5cbiAgZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcbiAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZVRvcExldmVsKCk7XG5cbiAgICBxdWVyeSArPSB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgaWYgKGlzQW5kKHRva2VuKSAmJiBpc0JldHdlZW4odGhpcy50b2tlbkxvb2tCZWhpbmQoMikpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSkgKyAnICc7XG4gIH1cblxuICAvLyBSZXBsYWNlIGFueSBzZXF1ZW5jZSBvZiB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgd2l0aCBzaW5nbGUgc3BhY2VcbiAgZXF1YWxpemVXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXFxzKy9ndSwgJyAnKTtcbiAgfVxuXG4gIC8vIE9wZW5pbmcgcGFyZW50aGVzZXMgaW5jcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbCBhbmQgc3RhcnQgYSBuZXcgbGluZVxuICBmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgLy8gVGFrZSBvdXQgdGhlIHByZWNlZGluZyBzcGFjZSB1bmxlc3MgdGhlcmUgd2FzIHdoaXRlc3BhY2UgdGhlcmUgaW4gdGhlIG9yaWdpbmFsIHF1ZXJ5XG4gICAgLy8gb3IgYW5vdGhlciBvcGVuaW5nIHBhcmVucyBvciBsaW5lIGNvbW1lbnRcbiAgICBjb25zdCBwcmVzZXJ2ZVdoaXRlc3BhY2VGb3IgPSB7XG4gICAgICBbdG9rZW5UeXBlcy5PUEVOX1BBUkVOXTogdHJ1ZSxcbiAgICAgIFt0b2tlblR5cGVzLkxJTkVfQ09NTUVOVF06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5PUEVSQVRPUl06IHRydWUsXG4gICAgfTtcbiAgICBpZiAoXG4gICAgICB0b2tlbi53aGl0ZXNwYWNlQmVmb3JlLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgIXByZXNlcnZlV2hpdGVzcGFjZUZvclt0aGlzLnRva2VuTG9va0JlaGluZCgpPy50eXBlXVxuICAgICkge1xuICAgICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KTtcbiAgICB9XG4gICAgcXVlcnkgKz0gdGhpcy5zaG93KHRva2VuKTtcblxuICAgIHRoaXMuaW5saW5lQmxvY2suYmVnaW5JZlBvc3NpYmxlKHRoaXMudG9rZW5zLCB0aGlzLmluZGV4KTtcblxuICAgIGlmICghdGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmluZGVudGF0aW9uLmluY3JlYXNlQmxvY2tMZXZlbCgpO1xuICAgICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICAvLyBDbG9zaW5nIHBhcmVudGhlc2VzIGRlY3JlYXNlIHRoZSBibG9jayBpbmRlbnQgbGV2ZWxcbiAgZm9ybWF0Q2xvc2luZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgIGlmICh0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuaW5saW5lQmxvY2suZW5kKCk7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlQmxvY2tMZXZlbCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5wYXJhbXMuZ2V0KHRva2VuKSArICcgJztcbiAgfVxuXG4gIC8vIENvbW1hcyBzdGFydCBhIG5ldyBsaW5lICh1bmxlc3Mgd2l0aGluIGlubGluZSBwYXJlbnRoZXNlcyBvciBTUUwgXCJMSU1JVFwiIGNsYXVzZSlcbiAgZm9ybWF0Q29tbWEodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnICc7XG5cbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfSBlbHNlIGlmIChpc0xpbWl0KHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuICB9XG5cbiAgZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pO1xuICB9XG5cbiAgZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuICB9XG5cbiAgZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5yZXNldEluZGVudGF0aW9uKCk7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICdcXG4nLnJlcGVhdCh0aGlzLmNmZy5saW5lc0JldHdlZW5RdWVyaWVzIHx8IDEpO1xuICB9XG5cbiAgLy8gQ29udmVydHMgdG9rZW4gdG8gc3RyaW5nICh1cHBlcmNhc2luZyBpdCBpZiBuZWVkZWQpXG4gIHNob3coeyB0eXBlLCB2YWx1ZSB9KSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jZmcudXBwZXJjYXNlICYmXG4gICAgICAodHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTiB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKVxuICAgICkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBhZGROZXdsaW5lKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KTtcbiAgICBpZiAoIXF1ZXJ5LmVuZHNXaXRoKCdcXG4nKSkge1xuICAgICAgcXVlcnkgKz0gJ1xcbic7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeSArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCk7XG4gIH1cblxuICB0b2tlbkxvb2tCZWhpbmQobiA9IDEpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCAtIG5dO1xuICB9XG5cbiAgdG9rZW5Mb29rQWhlYWQobiA9IDEpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCArIG5dO1xuICB9XG59XG4iLCJpbXBvcnQgeyBsYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBJTkRFTlRfVFlQRV9UT1BfTEVWRUwgPSAndG9wLWxldmVsJztcbmNvbnN0IElOREVOVF9UWVBFX0JMT0NLX0xFVkVMID0gJ2Jsb2NrLWxldmVsJztcblxuLyoqXG4gKiBNYW5hZ2VzIGluZGVudGF0aW9uIGxldmVscy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGluZGVudGF0aW9uIGxldmVsczpcbiAqXG4gKiAtIEJMT0NLX0xFVkVMIDogaW5jcmVhc2VkIGJ5IG9wZW4tcGFyZW50aGVzaXNcbiAqIC0gVE9QX0xFVkVMIDogaW5jcmVhc2VkIGJ5IFJFU0VSVkVEX1RPUF9MRVZFTCB3b3Jkc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRlbnRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaW5kZW50IEluZGVudCB2YWx1ZSwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5kZW50KSB7XG4gICAgdGhpcy5pbmRlbnQgPSBpbmRlbnQgfHwgJyAgJztcbiAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjdXJyZW50IGluZGVudGF0aW9uIHN0cmluZy5cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0SW5kZW50KCkge1xuICAgIHJldHVybiB0aGlzLmluZGVudC5yZXBlYXQodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgdG9wLWxldmVsIGluZGVudC5cbiAgICovXG4gIGluY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX1RPUF9MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSBibG9jay1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX0JMT0NLX0xFVkVMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqIERvZXMgbm90aGluZyB3aGVuIHRoZSBwcmV2aW91cyBpbmRlbnQgaXMgbm90IHRvcC1sZXZlbC5cbiAgICovXG4gIGRlY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgaWYgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCAmJiBsYXN0KHRoaXMuaW5kZW50VHlwZXMpID09PSBJTkRFTlRfVFlQRV9UT1BfTEVWRUwpIHtcbiAgICAgIHRoaXMuaW5kZW50VHlwZXMucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKiBJZiB0aGVyZSBhcmUgdG9wLWxldmVsIGluZGVudHMgd2l0aGluIHRoZSBibG9jay1sZXZlbCBpbmRlbnQsXG4gICAqIHRocm93cyBhd2F5IHRoZXNlIGFzIHdlbGwuXG4gICAqL1xuICBkZWNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgd2hpbGUgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuaW5kZW50VHlwZXMucG9wKCk7XG4gICAgICBpZiAodHlwZSAhPT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SW5kZW50YXRpb24oKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBJTkxJTkVfTUFYX0xFTkdUSCA9IDUwO1xuXG4vKipcbiAqIEJvb2trZWVwZXIgZm9yIGlubGluZSBibG9ja3MuXG4gKlxuICogSW5saW5lIGJsb2NrcyBhcmUgcGFyZW50aGl6ZWQgZXhwcmVzc2lvbnMgdGhhdCBhcmUgc2hvcnRlciB0aGFuIElOTElORV9NQVhfTEVOR1RILlxuICogVGhlc2UgYmxvY2tzIGFyZSBmb3JtYXR0ZWQgb24gYSBzaW5nbGUgbGluZSwgdW5saWtlIGxvbmdlciBwYXJlbnRoaXplZFxuICogZXhwcmVzc2lvbnMgd2hlcmUgb3Blbi1wYXJlbnRoZXNpcyBjYXVzZXMgbmV3bGluZSBhbmQgaW5jcmVhc2Ugb2YgaW5kZW50YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUJsb2NrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sZXZlbCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIGlubGluZSBibG9jayB3aGVuIGxvb2thaGVhZCB0aHJvdWdoIHVwY29taW5nIHRva2VucyBkZXRlcm1pbmVzXG4gICAqIHRoYXQgdGhlIGJsb2NrIHdvdWxkIGJlIHNtYWxsZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAgICogQHBhcmFtICB7T2JqZWN0W119IHRva2VucyBBcnJheSBvZiBhbGwgdG9rZW5zXG4gICAqIEBwYXJhbSAge051bWJlcn0gaW5kZXggQ3VycmVudCB0b2tlbiBwb3NpdGlvblxuICAgKi9cbiAgYmVnaW5JZlBvc3NpYmxlKHRva2VucywgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sZXZlbCA9PT0gMCAmJiB0aGlzLmlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkpIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sZXZlbCA+IDApIHtcbiAgICAgIHRoaXMubGV2ZWwrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZXZlbCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIGN1cnJlbnQgaW5saW5lIGJsb2NrLlxuICAgKiBUaGVyZSBtaWdodCBiZSBzZXZlcmFsIG5lc3RlZCBvbmVzLlxuICAgKi9cbiAgZW5kKCkge1xuICAgIHRoaXMubGV2ZWwtLTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gaW5zaWRlIGFuIGlubGluZSBibG9ja1xuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV2ZWwgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhpcyBzaG91bGQgYmUgYW4gaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gIC8vIEV4YW1wbGVzIGFyZSBcIk5PVygpXCIsIFwiQ09VTlQoKilcIiwgXCJpbnQoMTApXCIsIGtleShgc29tZWNvbHVtbmApLCBERUNJTUFMKDcsMilcbiAgaXNJbmxpbmVCbG9jayh0b2tlbnMsIGluZGV4KSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IGxldmVsID0gMDtcblxuICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBsZW5ndGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuXG4gICAgICAvLyBPdmVycmFuIG1heCBsZW5ndGhcbiAgICAgIGlmIChsZW5ndGggPiBJTkxJTkVfTUFYX0xFTkdUSCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwrKztcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTikge1xuICAgICAgICBsZXZlbC0tO1xuICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0ZvcmJpZGRlblRva2VuKHRva2VuKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFJlc2VydmVkIHdvcmRzIHRoYXQgY2F1c2UgbmV3bGluZXMsIGNvbW1lbnRzIGFuZCBzZW1pY29sb25zXG4gIC8vIGFyZSBub3QgYWxsb3dlZCBpbnNpZGUgaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gIGlzRm9yYmlkZGVuVG9rZW4oeyB0eXBlLCB2YWx1ZSB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQ09NTUVOVCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UIHx8XG4gICAgICB2YWx1ZSA9PT0gJzsnXG4gICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBIYW5kbGVzIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50IHdpdGggZ2l2ZW4gcGFyYW1zLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbXMge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBwYXJhbSB2YWx1ZSB0aGF0IG1hdGNoZXMgZ2l2ZW4gcGxhY2Vob2xkZXIgd2l0aCBwYXJhbSBrZXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi5rZXkgUGxhY2Vob2xkZXIga2V5XG4gICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlIFBsYWNlaG9sZGVyIHZhbHVlXG4gICAqIEByZXR1cm4ge1N0cmluZ30gcGFyYW0gb3IgdG9rZW4udmFsdWUgd2hlbiBwYXJhbXMgYXJlIG1pc3NpbmdcbiAgICovXG4gIGdldCh7IGtleSwgdmFsdWUgfSkge1xuICAgIGlmICghdGhpcy5wYXJhbXMpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhcmFtc1t0aGlzLmluZGV4KytdO1xuICB9XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0ICogYXMgcmVnZXhGYWN0b3J5IGZyb20gJy4vcmVnZXhGYWN0b3J5JztcbmltcG9ydCB7IGVzY2FwZVJlZ0V4cCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5pemVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFdvcmRzIFJlc2VydmVkIHdvcmRzIGluIFNRTFxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3IGxpbmUgc2VwYXJhdGVseVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzIFdvcmRzIHRoYXQgYXJlIHNldCB0byBuZXdsaW5lXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgV29yZHMgdGhhdCBhcmUgdG9wIGxldmVsIGJ1dCBoYXZlIG5vIGluZGVudGF0aW9uXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3RyaW5nVHlwZXMgU3RyaW5nIHR5cGVzIHRvIGVuYWJsZTogXCJcIiwgJycsIGBgLCBbXSwgTicnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcub3BlblBhcmVucyBPcGVuaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSAoLCBbXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuY2xvc2VQYXJlbnMgQ2xvc2luZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKSwgXVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBpbmRleGVkIHBsYWNlaG9sZGVycywgbGlrZSA/XG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBuYW1lZCBwbGFjZWhvbGRlcnMsIGxpa2UgQCBhbmQgOlxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmxpbmVDb21tZW50VHlwZXMgTGluZSBjb21tZW50cyB0byBlbmFibGUsIGxpa2UgIyBhbmQgLS1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5zcGVjaWFsV29yZENoYXJzIFNwZWNpYWwgY2hhcnMgdGhhdCBjYW4gYmUgZm91bmQgaW5zaWRlIG9mIHdvcmRzLCBsaWtlIEAgYW5kICNcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IFtjZmcub3BlcmF0b3JdIEFkZGl0aW9uYWwgb3BlcmF0b3JzIHRvIHJlY29nbml6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2ZnKSB7XG4gICAgdGhpcy5XSElURVNQQUNFX1JFR0VYID0gL14oXFxzKykvdTtcbiAgICB0aGlzLk5VTUJFUl9SRUdFWCA9IC9eKCgtXFxzKik/WzAtOV0rKFxcLlswLTldKyk/KFtlRV0tP1swLTldKyhcXC5bMC05XSspPyk/fDB4WzAtOWEtZkEtRl0rfDBiWzAxXSspXFxiL3U7XG5cbiAgICB0aGlzLk9QRVJBVE9SX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZU9wZXJhdG9yUmVnZXgoW1xuICAgICAgLi4uKGNmZy5vcGVyYXRvcnMgfHwgW10pLFxuICAgICAgJyE9JyxcbiAgICAgICc8PicsXG4gICAgICAnPT0nLFxuICAgICAgJzw9JyxcbiAgICAgICc+PScsXG4gICAgICAnITwnLFxuICAgICAgJyE+JyxcbiAgICAgICd8fCcsXG4gICAgICAnOj0nLFxuICAgIF0pO1xuXG4gICAgdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYID0gL14oXFwvXFwqW15dKj8oPzpcXCpcXC98JCkpL3U7XG4gICAgdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlTGluZUNvbW1lbnRSZWdleChjZmcubGluZUNvbW1lbnRUeXBlcyk7XG5cbiAgICB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlRfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoXG4gICAgICBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnRcbiAgICApO1xuICAgIHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMpO1xuICAgIHRoaXMuUkVTRVJWRURfUExBSU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkV29yZHMpO1xuXG4gICAgdGhpcy5XT1JEX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVdvcmRSZWdleChjZmcuc3BlY2lhbFdvcmRDaGFycyk7XG4gICAgdGhpcy5TVFJJTkdfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlU3RyaW5nUmVnZXgoY2ZnLnN0cmluZ1R5cGVzKTtcblxuICAgIHRoaXMuT1BFTl9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5vcGVuUGFyZW5zKTtcbiAgICB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBhcmVuUmVnZXgoY2ZnLmNsb3NlUGFyZW5zKTtcblxuICAgIHRoaXMuSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KFxuICAgICAgY2ZnLmluZGV4ZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1swLTldKidcbiAgICApO1xuICAgIHRoaXMuSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICAnW2EtekEtWjAtOS5fJF0rJ1xuICAgICk7XG4gICAgdGhpcy5TVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICByZWdleEZhY3RvcnkuY3JlYXRlU3RyaW5nUGF0dGVybihjZmcuc3RyaW5nVHlwZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIFNRTCBzdHJpbmcgYW5kIGJyZWFrcyBpdCBpbnRvIHRva2Vucy5cbiAgICogRWFjaCB0b2tlbiBpcyBhbiBvYmplY3Qgd2l0aCB0eXBlIGFuZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBTUUwgc3RyaW5nXG4gICAqIEByZXR1cm4ge09iamVjdFtdfSB0b2tlbnMgQW4gYXJyYXkgb2YgdG9rZW5zLlxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLndoaXRlc3BhY2VCZWZvcmUgUHJlY2VkaW5nIHdoaXRlc3BhY2VcbiAgICovXG4gIHRva2VuaXplKGlucHV0KSB7XG4gICAgY29uc3QgdG9rZW5zID0gW107XG4gICAgbGV0IHRva2VuO1xuXG4gICAgLy8gS2VlcCBwcm9jZXNzaW5nIHRoZSBzdHJpbmcgdW50aWwgaXQgaXMgZW1wdHlcbiAgICB3aGlsZSAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAvLyBncmFiIGFueSBwcmVjZWRpbmcgd2hpdGVzcGFjZVxuICAgICAgY29uc3Qgd2hpdGVzcGFjZUJlZm9yZSA9IHRoaXMuZ2V0V2hpdGVzcGFjZShpbnB1dCk7XG4gICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZyh3aGl0ZXNwYWNlQmVmb3JlLmxlbmd0aCk7XG5cbiAgICAgIGlmIChpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBuZXh0IHRva2VuIGFuZCB0aGUgdG9rZW4gdHlwZVxuICAgICAgICB0b2tlbiA9IHRoaXMuZ2V0TmV4dFRva2VuKGlucHV0LCB0b2tlbik7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIHN0cmluZ1xuICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZyh0b2tlbi52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgIHRva2Vucy5wdXNoKHsgLi4udG9rZW4sIHdoaXRlc3BhY2VCZWZvcmUgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBnZXRXaGl0ZXNwYWNlKGlucHV0KSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHRoaXMuV0hJVEVTUEFDRV9SRUdFWCk7XG4gICAgcmV0dXJuIG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogJyc7XG4gIH1cblxuICBnZXROZXh0VG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRDb21tZW50VG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ1Rva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXROdW1iZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHx8XG4gICAgICB0aGlzLmdldFdvcmRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlcmF0b3JUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0Q29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCk7XG4gIH1cblxuICBnZXRMaW5lQ29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLkxJTkVfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEJsb2NrQ29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkJMT0NLX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuU1RSSU5HLFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuT1BFTl9QQVJFTixcbiAgICAgIHJlZ2V4OiB0aGlzLk9QRU5fUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRDbG9zZVBhcmVuVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PiB2LnNsaWNlKDEpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5TVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+XG4gICAgICAgIHRoaXMuZ2V0RXNjYXBlZFBsYWNlaG9sZGVyS2V5KHsga2V5OiB2LnNsaWNlKDIsIC0xKSwgcXVvdGVDaGFyOiB2LnNsaWNlKC0xKSB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PiB2LnNsaWNlKDEpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoeyBpbnB1dCwgcmVnZXgsIHBhcnNlS2V5IH0pIHtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goeyBpbnB1dCwgcmVnZXgsIHR5cGU6IHRva2VuVHlwZXMuUExBQ0VIT0xERVIgfSk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICB0b2tlbi5rZXkgPSBwYXJzZUtleSh0b2tlbi52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleSwgcXVvdGVDaGFyIH0pIHtcbiAgICByZXR1cm4ga2V5LnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAoJ1xcXFwnICsgcXVvdGVDaGFyKSwgJ2d1JyksIHF1b3RlQ2hhcik7XG4gIH1cblxuICAvLyBEZWNpbWFsLCBiaW5hcnksIG9yIGhleCBudW1iZXJzXG4gIGdldE51bWJlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk5VTUJFUixcbiAgICAgIHJlZ2V4OiB0aGlzLk5VTUJFUl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1bmN0dWF0aW9uIGFuZCBzeW1ib2xzXG4gIGdldE9wZXJhdG9yVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuT1BFUkFUT1IsXG4gICAgICByZWdleDogdGhpcy5PUEVSQVRPUl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgLy8gQSByZXNlcnZlZCB3b3JkIGNhbm5vdCBiZSBwcmVjZWRlZCBieSBhIFwiLlwiXG4gICAgLy8gdGhpcyBtYWtlcyBpdCBzbyBpbiBcIm15dGFibGUuZnJvbVwiLCBcImZyb21cIiBpcyBub3QgY29uc2lkZXJlZCBhIHJlc2VydmVkIHdvcmRcbiAgICBpZiAocHJldmlvdXNUb2tlbiAmJiBwcmV2aW91c1Rva2VuLnZhbHVlICYmIHByZXZpb3VzVG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQoaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFBsYWluUmVzZXJ2ZWRUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE5ld2xpbmVSZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9ORVdMSU5FX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQoaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9QTEFJTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFdvcmRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5XT1JELFxuICAgICAgcmVnZXg6IHRoaXMuV09SRF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHR5cGUsIHJlZ2V4IH0pIHtcbiAgICBjb25zdCBtYXRjaGVzID0gaW5wdXQubWF0Y2gocmVnZXgpO1xuXG4gICAgcmV0dXJuIG1hdGNoZXMgPyB7IHR5cGUsIHZhbHVlOiBtYXRjaGVzWzFdIH0gOiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IGVzY2FwZVJlZ0V4cCwgaXNFbXB0eSwgc29ydEJ5TGVuZ3RoRGVzYyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wZXJhdG9yUmVnZXgobXVsdGlMZXR0ZXJPcGVyYXRvcnMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oJHtzb3J0QnlMZW5ndGhEZXNjKG11bHRpTGV0dGVyT3BlcmF0b3JzKS5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCd8Jyl9fC4pYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpbmVDb21tZW50UmVnZXgobGluZUNvbW1lbnRUeXBlcykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICBgXigoPzoke2xpbmVDb21tZW50VHlwZXMubWFwKChjKSA9PiBlc2NhcGVSZWdFeHAoYykpLmpvaW4oJ3wnKX0pLio/KSg/OlxcclxcbnxcXHJ8XFxufCQpYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KHJlc2VydmVkV29yZHMpIHtcbiAgaWYgKHJlc2VydmVkV29yZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYF5cXGIkYCwgJ3UnKTtcbiAgfVxuICBjb25zdCByZXNlcnZlZFdvcmRzUGF0dGVybiA9IHNvcnRCeUxlbmd0aERlc2MocmVzZXJ2ZWRXb3Jkcykuam9pbignfCcpLnJlcGxhY2UoLyAvZ3UsICdcXFxccysnKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4oJHtyZXNlcnZlZFdvcmRzUGF0dGVybn0pXFxcXGJgLCAnaXUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmRSZWdleChzcGVjaWFsQ2hhcnMgPSBbXSkge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICBgXihbXFxcXHB7QWxwaGFiZXRpY31cXFxccHtNYXJrfVxcXFxwe0RlY2ltYWxfTnVtYmVyfVxcXFxwe0Nvbm5lY3Rvcl9QdW5jdHVhdGlvbn1cXFxccHtKb2luX0NvbnRyb2x9JHtzcGVjaWFsQ2hhcnMuam9pbihcbiAgICAgICcnXG4gICAgKX1dKylgLFxuICAgICd1J1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUmVnZXgoc3RyaW5nVHlwZXMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14oJyArIGNyZWF0ZVN0cmluZ1BhdHRlcm4oc3RyaW5nVHlwZXMpICsgJyknLCAndScpO1xufVxuXG4vLyBUaGlzIGVuYWJsZXMgdGhlIGZvbGxvd2luZyBzdHJpbmcgcGF0dGVybnM6XG4vLyAxLiBiYWNrdGljayBxdW90ZWQgc3RyaW5nIHVzaW5nIGBgIHRvIGVzY2FwZVxuLy8gMi4gc3F1YXJlIGJyYWNrZXQgcXVvdGVkIHN0cmluZyAoU1FMIFNlcnZlcikgdXNpbmcgXV0gdG8gZXNjYXBlXG4vLyAzLiBkb3VibGUgcXVvdGVkIHN0cmluZyB1c2luZyBcIlwiIG9yIFxcXCIgdG8gZXNjYXBlXG4vLyA0LiBzaW5nbGUgcXVvdGVkIHN0cmluZyB1c2luZyAnJyBvciBcXCcgdG8gZXNjYXBlXG4vLyA1LiBuYXRpb25hbCBjaGFyYWN0ZXIgcXVvdGVkIHN0cmluZyB1c2luZyBOJycgb3IgTlxcJyB0byBlc2NhcGVcbi8vIDYuIFVuaWNvZGUgc2luZ2xlLXF1b3RlZCBzdHJpbmcgdXNpbmcgXFwnIHRvIGVzY2FwZVxuLy8gNy4gVW5pY29kZSBkb3VibGUtcXVvdGVkIHN0cmluZyB1c2luZyBcXFwiIHRvIGVzY2FwZVxuLy8gOC4gUG9zdGdyZVNRTCBkb2xsYXItcXVvdGVkIHN0cmluZ3NcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSB7XG4gIGNvbnN0IHBhdHRlcm5zID0ge1xuICAgICdgYCc6ICcoKGBbXmBdKigkfGApKSspJyxcbiAgICAne30nOiAnKChcXFxce1teXFxcXH1dKigkfFxcXFx9KSkrKScsXG4gICAgJ1tdJzogJygoXFxcXFtbXlxcXFxdXSooJHxcXFxcXSkpKFxcXFxdW15cXFxcXV0qKCR8XFxcXF0pKSopJyxcbiAgICAnXCJcIic6ICcoKFwiW15cIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlwiXFxcXFxcXFxdKikqKFwifCQpKSspJyxcbiAgICBcIicnXCI6IFwiKCgnW14nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJOJydcIjogXCIoKE4nW14nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJVJicnXCI6IFwiKChVJidbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICAnVSZcIlwiJzogJygoVSZcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgJCQ6ICcoKD88dGFnPlxcXFwkXFxcXHcqXFxcXCQpW1xcXFxzXFxcXFNdKj8oPzpcXFxcazx0YWc+fCQpKScsXG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ1R5cGVzLm1hcCgodCkgPT4gcGF0dGVybnNbdF0pLmpvaW4oJ3wnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBwYXJlbnMubWFwKGVzY2FwZVBhcmVuKS5qb2luKCd8JykgKyAnKScsICdpdScpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gQSBzaW5nbGUgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChwYXJlbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbG9uZ2VyIHdvcmRcbiAgICByZXR1cm4gJ1xcXFxiJyArIHBhcmVuICsgJ1xcXFxiJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXJSZWdleCh0eXBlcywgcGF0dGVybikge1xuICBpZiAoaXNFbXB0eSh0eXBlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKTtcblxuICByZXR1cm4gbmV3IFJlZ0V4cChgXigoPzoke3R5cGVzUmVnZXh9KSg/OiR7cGF0dGVybn0pKWAsICd1Jyk7XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBpc1Rva2VuID0gKHR5cGUsIHJlZ2V4KSA9PiAodG9rZW4pID0+IHRva2VuPy50eXBlID09PSB0eXBlICYmIHJlZ2V4LnRlc3QodG9rZW4/LnZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGlzQW5kID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsIC9eQU5EJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0JldHdlZW4gPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQkVUV0VFTiQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNMaW1pdCA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsIC9eTElNSVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzU2V0ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15TRVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzQnkgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQlkkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzV2luZG93ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15XSU5ET1ckL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzRW5kID0gaXNUb2tlbih0b2tlblR5cGVzLkNMT1NFX1BBUkVOLCAvXkVORCQvaXUpO1xuIiwiLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV09SRDogJ3dvcmQnLFxuICBTVFJJTkc6ICdzdHJpbmcnLFxuICBSRVNFUlZFRDogJ3Jlc2VydmVkJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMOiAncmVzZXJ2ZWQtdG9wLWxldmVsJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVDogJ3Jlc2VydmVkLXRvcC1sZXZlbC1uby1pbmRlbnQnLFxuICBSRVNFUlZFRF9ORVdMSU5FOiAncmVzZXJ2ZWQtbmV3bGluZScsXG4gIE9QRVJBVE9SOiAnb3BlcmF0b3InLFxuICBPUEVOX1BBUkVOOiAnb3Blbi1wYXJlbicsXG4gIENMT1NFX1BBUkVOOiAnY2xvc2UtcGFyZW4nLFxuICBMSU5FX0NPTU1FTlQ6ICdsaW5lLWNvbW1lbnQnLFxuICBCTE9DS19DT01NRU5UOiAnYmxvY2stY29tbWVudCcsXG4gIE5VTUJFUjogJ251bWJlcicsXG4gIFBMQUNFSE9MREVSOiAncGxhY2Vob2xkZXInLFxufTtcbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUNUSVZBVEUnLFxuICAnQUxJQVMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMTE9XJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUkUnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNTT0NJQVRFJyxcbiAgJ0FTVVRJTUUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVRUUklCVVRFUycsXG4gICdBVURJVCcsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0FVWCcsXG4gICdBVVhJTElBUlknLFxuICAnQVZHJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlVGRkVSUE9PTCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVBUVVJFJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQ1NJRCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09MTElEJyxcbiAgJ0NPTFVNTicsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05DQVQnLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09SUicsXG4gICdDT1JSRVNQT05ESU5HJyxcbiAgJ0NPVU5UJyxcbiAgJ0NPVU5UX0JJRycsXG4gICdDT1ZBUl9QT1AnLFxuICAnQ09WQVJfU0FNUCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VCRScsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ERUZBVUxUX1RSQU5TRk9STV9HUk9VUCcsXG4gICdDVVJSRU5UX0xDX0NUWVBFJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9TRVJWRVInLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVElNRVpPTkUnLFxuICAnQ1VSUkVOVF9UUkFOU0ZPUk1fR1JPVVBfRk9SX1RZUEUnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFQQVJUSVRJT05OQU1FJyxcbiAgJ0RBVEFQQVJUSVRJT05OVU0nLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdEQjJHRU5FUkFMJyxcbiAgJ0RCMkdFTlJMJyxcbiAgJ0RCMlNRTCcsXG4gICdEQklORk8nLFxuICAnREJQQVJUSVRJT05OQU1FJyxcbiAgJ0RCUEFSVElUSU9OTlVNJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRklOSVRJT04nLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFUkFOSycsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFUkVGJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFU0NSSVBUT1InLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESUFHTk9TVElDUycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0FMTE9XJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFNTSVpFJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFRElUUFJPQycsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFTkQtRVhFQycsXG4gICdFTkRJTkcnLFxuICAnRVJBU0UnLFxuICAnRVNDQVBFJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFAnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFTkNFRCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFBST0MnLFxuICAnRklMRScsXG4gICdGSUxURVInLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVU0lPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHRVQnLFxuICAnR0xPQkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JBUEhJQycsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBU0gnLFxuICAnSEFTSEVEX1ZBTFVFJyxcbiAgJ0hJTlQnLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DTFVTSVZFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNBVE9SUycsXG4gICdJTkYnLFxuICAnSU5GSU5JVFknLFxuICAnSU5IRVJJVCcsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URUdSSVRZJyxcbiAgJ0lOVEVSU0VDVElPTicsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lTT0JJRCcsXG4gICdJU09MQVRJT04nLFxuICAnSVRFUkFURScsXG4gICdKQVInLFxuICAnSkFWQScsXG4gICdLRUVQJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xDX0NUWVBFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTktUWVBFJyxcbiAgJ0xOJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMREFURScsXG4gICdMT0NBTEUnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUT1InLFxuICAnTE9DQVRPUlMnLFxuICAnTE9DSycsXG4gICdMT0NLTUFYJyxcbiAgJ0xPQ0tTSVpFJyxcbiAgJ0xPTkcnLFxuICAnTE9PUCcsXG4gICdMT1dFUicsXG4gICdNQUlOVEFJTkVEJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVgnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01FVEhPRCcsXG4gICdNSUNST1NFQ09ORCcsXG4gICdNSUNST1NFQ09ORFMnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVTJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PRElGSUVTJyxcbiAgJ01PRFVMRScsXG4gICdNT05USCcsXG4gICdNT05USFMnLFxuICAnTVVMVElTRVQnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05FV19UQUJMRScsXG4gICdORVhUVkFMJyxcbiAgJ05PJyxcbiAgJ05PQ0FDSEUnLFxuICAnTk9DWUNMRScsXG4gICdOT0RFTkFNRScsXG4gICdOT0RFTlVNQkVSJyxcbiAgJ05PTUFYVkFMVUUnLFxuICAnTk9NSU5WQUxVRScsXG4gICdOT05FJyxcbiAgJ05PT1JERVInLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnTlVNUEFSVFMnLFxuICAnT0JJRCcsXG4gICdPQ1RFVF9MRU5HVEgnLFxuICAnT0YnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTERfVEFCTEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpBVElPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFEREVEJyxcbiAgJ1BBR0VTSVpFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJUJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVJUSVRJT05FRCcsXG4gICdQQVJUSVRJT05JTkcnLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BFUkNFTlRJTEVfQ09OVCcsXG4gICdQRVJDRU5USUxFX0RJU0MnLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BJRUNFU0laRScsXG4gICdQTEFOJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BPV0VSJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVZWQUwnLFxuICAnUFJJTUFSWScsXG4gICdQUklRVFknLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPR1JBTScsXG4gICdQU0lEJyxcbiAgJ1BVQkxJQycsXG4gICdRVUVSWScsXG4gICdRVUVSWU5PJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFMJyxcbiAgJ1JFQ09WRVJZJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVTVUxUJyxcbiAgJ1JFU1VMVF9TRVRfTE9DQVRPUicsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VTkRfQ0VJTElORycsXG4gICdST1VORF9ET1dOJyxcbiAgJ1JPVU5EX0ZMT09SJyxcbiAgJ1JPVU5EX0hBTEZfRE9XTicsXG4gICdST1VORF9IQUxGX0VWRU4nLFxuICAnUk9VTkRfSEFMRl9VUCcsXG4gICdST1VORF9VUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVycsXG4gICdST1dOVU1CRVInLFxuICAnUk9XUycsXG4gICdST1dTRVQnLFxuICAnUk9XX05VTUJFUicsXG4gICdSUk4nLFxuICAnUlVOJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NPUEUnLFxuICAnU0NSQVRDSFBBRCcsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNPTkRTJyxcbiAgJ1NFQ1FUWScsXG4gICdTRUNVUklUWScsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lHTkFMJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQU4nLFxuICAnU09NRScsXG4gICdTT1VSQ0UnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1BFQ0lGSUNUWVBFJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMSUQnLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUVJUJyxcbiAgJ1NUQUNLRUQnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJQycsXG4gICdTVEFUTUVOVCcsXG4gICdTVEFZJyxcbiAgJ1NURERFVl9QT1AnLFxuICAnU1REREVWX1NBTVAnLFxuICAnU1RPR1JPVVAnLFxuICAnU1RPUkVTJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVU0nLFxuICAnU1VNTUFSWScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lOT05ZTScsXG4gICdTWVNGVU4nLFxuICAnU1lTSUJNJyxcbiAgJ1NZU1BST0MnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0xBVEUnLFxuICAnVFJBTlNMQVRJT04nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VORE8nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOVElMJyxcbiAgJ1VQUEVSJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURQUk9DJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOVCcsXG4gICdWQVJZSU5HJyxcbiAgJ1ZBUl9QT1AnLFxuICAnVkFSX1NBTVAnLFxuICAnVkNBVCcsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVk9MQVRJTEUnLFxuICAnVk9MVU1FUycsXG4gICdXSEVOJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJRFRIX0JVQ0tFVCcsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXTE0nLFxuICAnV1JJVEUnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdZRUFSJyxcbiAgJ1lFQVJTJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnR08nLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERiMkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUREJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNFTlNJVElWRScsXG4gICdCRUZPUkUnLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFOR0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JQ1JPU0VDT05EJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMQVlFRCcsXG4gICdERUxFVEUnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdET19ET01BSU5fSURTJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVQUwnLFxuICAnRUFDSCcsXG4gICdFTFNFJyxcbiAgJ0VMU0VJRicsXG4gICdFTkNMT1NFRCcsXG4gICdFU0NBUEVEJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT0FUNCcsXG4gICdGTE9BVDgnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJPTScsXG4gICdGVUxMVEVYVCcsXG4gICdHRU5FUkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBVklORycsXG4gICdISUdIX1BSSU9SSVRZJyxcbiAgJ0hPVVJfTUlDUk9TRUNPTkQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lHTk9SRV9ET01BSU5fSURTJyxcbiAgJ0lHTk9SRV9TRVJWRVJfSURTJyxcbiAgJ0lOJyxcbiAgJ0lOREVYJyxcbiAgJ0lORklMRScsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVDEnLFxuICAnSU5UMicsXG4gICdJTlQzJyxcbiAgJ0lOVDQnLFxuICAnSU5UOCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lURVJBVEUnLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJTkVBUicsXG4gICdMSU5FUycsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTE9OR0JMT0InLFxuICAnTE9OR1RFWFQnLFxuICAnTE9PUCcsXG4gICdMT1dfUFJJT1JJVFknLFxuICAnTUFTVEVSX0hFQVJUQkVBVF9QRVJJT0QnLFxuICAnTUFTVEVSX1NTTF9WRVJJRllfU0VSVkVSX0NFUlQnLFxuICAnTUFUQ0gnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVESVVNQkxPQicsXG4gICdNRURJVU1JTlQnLFxuICAnTUVESVVNVEVYVCcsXG4gICdNSURETEVJTlQnLFxuICAnTUlOVVRFX01JQ1JPU0VDT05EJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTU9EJyxcbiAgJ01PRElGSUVTJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PX1dSSVRFX1RPX0JJTkxPRycsXG4gICdOVUxMJyxcbiAgJ05VTUVSSUMnLFxuICAnT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTkFMTFknLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09VVEZJTEUnLFxuICAnT1ZFUicsXG4gICdQQUdFX0NIRUNLU1VNJyxcbiAgJ1BBUlNFX1ZDT0xfRVhQUicsXG4gICdQQVJUSVRJT04nLFxuICAnUE9TSVRJT04nLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVUkdFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBRFMnLFxuICAnUkVBRF9XUklURScsXG4gICdSRUFMJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUZfU1lTVEVNX0lEJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVCcsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUVVJUkUnLFxuICAnUkVTSUdOQUwnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUkxJS0UnLFxuICAnUk9XUycsXG4gICdTQ0hFTUEnLFxuICAnU0NIRU1BUycsXG4gICdTRUNPTkRfTUlDUk9TRUNPTkQnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU0lHTkFMJyxcbiAgJ1NMT1cnLFxuICAnU01BTExJTlQnLFxuICAnU1BBVElBTCcsXG4gICdTUEVDSUZJQycsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FMX0JJR19SRVNVTFQnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NTTCcsXG4gICdTVEFSVElORycsXG4gICdTVEFUU19BVVRPX1JFQ0FMQycsXG4gICdTVEFUU19QRVJTSVNURU5UJyxcbiAgJ1NUQVRTX1NBTVBMRV9QQUdFUycsXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ1RBQkxFJyxcbiAgJ1RFUk1JTkFURUQnLFxuICAnVEhFTicsXG4gICdUSU5ZQkxPQicsXG4gICdUSU5ZSU5UJyxcbiAgJ1RJTllURVhUJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdVTkRPJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVBEQVRFJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRScsXG4gICdVU0lORycsXG4gICdVVENfREFURScsXG4gICdVVENfVElNRScsXG4gICdVVENfVElNRVNUQU1QJyxcbiAgJ1ZBTFVFUycsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSQUNURVInLFxuICAnVkFSWUlORycsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dSSVRFJyxcbiAgJ1hPUicsXG4gICdZRUFSX01PTlRIJyxcbiAgJ1pFUk9GSUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJpYURiRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFsnYGAnLCBcIicnXCIsICdcIlwiJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJywgJyMnXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbJzo9JywgJzw8JywgJz4+JywgJyE9JywgJzw+JywgJzw9PicsICcmJicsICd8fCddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUNDRVNTSUJMRScsXG4gICdBREQnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU0VOU0lUSVZFJyxcbiAgJ0JFRk9SRScsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQU5HRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEVDSycsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTFVNTicsXG4gICdDT05ESVRJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVUJFJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSUNST1NFQ09ORCcsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEFZRUQnLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEVUFMJyxcbiAgJ0VBQ0gnLFxuICAnRUxTRScsXG4gICdFTFNFSUYnLFxuICAnRU1QVFknLFxuICAnRU5DTE9TRUQnLFxuICAnRVNDQVBFRCcsXG4gICdFWENFUFQnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhQTEFJTicsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSVJTVF9WQUxVRScsXG4gICdGTE9BVCcsXG4gICdGTE9BVDQnLFxuICAnRkxPQVQ4JyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZST00nLFxuICAnRlVMTFRFWFQnLFxuICAnRlVOQ1RJT04nLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dFVCcsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdHUk9VUFMnLFxuICAnSEFWSU5HJyxcbiAgJ0hJR0hfUFJJT1JJVFknLFxuICAnSE9VUl9NSUNST1NFQ09ORCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdJRicsXG4gICdJR05PUkUnLFxuICAnSU4nLFxuICAnSU5ERVgnLFxuICAnSU5GSUxFJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlQnLFxuICAnSU5UMScsXG4gICdJTlQyJyxcbiAgJ0lOVDMnLFxuICAnSU5UNCcsXG4gICdJTlQ4JyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJT19BRlRFUl9HVElEUycsXG4gICdJT19CRUZPUkVfR1RJRFMnLFxuICAnSVMnLFxuICAnSVRFUkFURScsXG4gICdKT0lOJyxcbiAgJ0pTT05fVEFCTEUnLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0lMTCcsXG4gICdMQUcnLFxuICAnTEFTVF9WQUxVRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xFQUQnLFxuICAnTEVBRElORycsXG4gICdMRUFWRScsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTElORUFSJyxcbiAgJ0xJTkVTJyxcbiAgJ0xPQUQnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0snLFxuICAnTE9ORycsXG4gICdMT05HQkxPQicsXG4gICdMT05HVEVYVCcsXG4gICdMT09QJyxcbiAgJ0xPV19QUklPUklUWScsXG4gICdNQVNURVJfQklORCcsXG4gICdNQVNURVJfU1NMX1ZFUklGWV9TRVJWRVJfQ0VSVCcsXG4gICdNQVRDSCcsXG4gICdNQVhWQUxVRScsXG4gICdNRURJVU1CTE9CJyxcbiAgJ01FRElVTUlOVCcsXG4gICdNRURJVU1URVhUJyxcbiAgJ01JRERMRUlOVCcsXG4gICdNSU5VVEVfTUlDUk9TRUNPTkQnLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNT0QnLFxuICAnTU9ESUZJRVMnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9fV1JJVEVfVE9fQklOTE9HJyxcbiAgJ05USF9WQUxVRScsXG4gICdOVElMRScsXG4gICdOVUxMJyxcbiAgJ05VTUVSSUMnLFxuICAnT0YnLFxuICAnT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU1JWkVSX0NPU1RTJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05BTExZJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVVRGSUxFJyxcbiAgJ09WRVInLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQUkVDSVNJT04nLFxuICAnUFJJTUFSWScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVSR0UnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUFEJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQURfV1JJVEUnLFxuICAnUkVBTCcsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUdFWFAnLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVRVUlSRScsXG4gICdSRVNJR05BTCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk4nLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JPV19OVU1CRVInLFxuICAnU0NIRU1BJyxcbiAgJ1NDSEVNQVMnLFxuICAnU0VDT05EX01JQ1JPU0VDT05EJyxcbiAgJ1NFTEVDVCcsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFVCcsXG4gICdTSE9XJyxcbiAgJ1NJR05BTCcsXG4gICdTTUFMTElOVCcsXG4gICdTUEFUSUFMJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUUxfQklHX1JFU1VMVCcsXG4gICdTUUxfQ0FMQ19GT1VORF9ST1dTJyxcbiAgJ1NRTF9TTUFMTF9SRVNVTFQnLFxuICAnU1NMJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUT1JFRCcsXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdURVJNSU5BVEVEJyxcbiAgJ1RIRU4nLFxuICAnVElOWUJMT0InLFxuICAnVElOWUlOVCcsXG4gICdUSU5ZVEVYVCcsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVU5ETycsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VQREFURScsXG4gICdVU0FHRScsXG4gICdVU0UnLFxuICAnVVNJTkcnLFxuICAnVVRDX0RBVEUnLFxuICAnVVRDX1RJTUUnLFxuICAnVVRDX1RJTUVTVEFNUCcsXG4gICdWQUxVRVMnLFxuICAnVkFSQklOQVJZJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSQ0hBUkFDVEVSJyxcbiAgJ1ZBUllJTkcnLFxuICAnVklSVFVBTCcsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dSSVRFJyxcbiAgJ1hPUicsXG4gICdZRUFSX01PTlRIJyxcbiAgJ1pFUk9GSUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbJ2BgJywgXCInJ1wiLCAnXCJcIiddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFtdLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLScsICcjJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogWyc6PScsICc8PCcsICc+PicsICchPScsICc8PicsICc8PT4nLCAnJiYnLCAnfHwnLCAnLT4nLCAnLT4+J10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJTkFSWScsXG4gICdCT09MRUFOJyxcbiAgJ0JSRUFLJyxcbiAgJ0JVQ0tFVCcsXG4gICdCVUlMRCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDTFVTVEVSJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVElPTicsXG4gICdDT01NSVQnLFxuICAnQ09OTkVDVCcsXG4gICdDT05USU5VRScsXG4gICdDT1JSRUxBVEUnLFxuICAnQ09WRVInLFxuICAnQ1JFQVRFJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFTRVQnLFxuICAnREFUQVNUT1JFJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVDUkVNRU5UJyxcbiAgJ0RFTEVURScsXG4gICdERVJJVkVEJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRFJPUCcsXG4gICdFQUNIJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnRVZFUlknLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSVJTVCcsXG4gICdGTEFUVEVOJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGUk9NJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0dTSScsXG4gICdIQVZJTkcnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lMSUtFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVREUnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lORkVSJyxcbiAgJ0lOTElORScsXG4gICdJTk5FUicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLRVlTUEFDRScsXG4gICdLTk9XTicsXG4gICdMQVNUJyxcbiAgJ0xFRlQnLFxuICAnTEVUJyxcbiAgJ0xFVFRJTkcnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMU00nLFxuICAnTUFQJyxcbiAgJ01BUFBJTkcnLFxuICAnTUFUQ0hFRCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUVSR0UnLFxuICAnTUlTU0lORycsXG4gICdOQU1FU1BBQ0UnLFxuICAnTkVTVCcsXG4gICdOT1QnLFxuICAnTlVMTCcsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09GRlNFVCcsXG4gICdPTicsXG4gICdPUFRJT04nLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdQQVJTRScsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTU1dPUkQnLFxuICAnUEFUSCcsXG4gICdQT09MJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJJTUFSWScsXG4gICdQUklWQVRFJyxcbiAgJ1BSSVZJTEVHRScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVCTElDJyxcbiAgJ1JBVycsXG4gICdSRUFMTScsXG4gICdSRURVQ0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnU0FUSVNGSUVTJyxcbiAgJ1NDSEVNQScsXG4gICdTRUxFQ1QnLFxuICAnU0VMRicsXG4gICdTRU1JJyxcbiAgJ1NFVCcsXG4gICdTSE9XJyxcbiAgJ1NPTUUnLFxuICAnU1RBUlQnLFxuICAnU1RBVElTVElDUycsXG4gICdTVFJJTkcnLFxuICAnU1lTVEVNJyxcbiAgJ1RIRU4nLFxuICAnVE8nLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVTlNFVCcsXG4gICdVUERBVEUnLFxuICAnVVBTRVJUJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBTFVFRCcsXG4gICdWQUxVRVMnLFxuICAnVklBJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXT1JLJyxcbiAgJ1hPUicsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWFBMQUlOIERFTEVURSBGUk9NJyxcbiAgJ0VYUExBSU4gVVBEQVRFJyxcbiAgJ0VYUExBSU4gVVBTRVJUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lORkVSJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0xFVCcsXG4gICdMSU1JVCcsXG4gICdNRVJHRScsXG4gICdORVNUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1BSRVBBUkUnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVTk5FU1QnLFxuICAnVVBEQVRFJyxcbiAgJ1VQU0VSVCcsXG4gICdVU0UgS0VZUycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTjFxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ1snLCAneyddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICddJywgJ30nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJyMnLCAnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgeyBpc0J5LCBpc1NldCB9IGZyb20gJy4uL2NvcmUvdG9rZW4nO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5pbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuLi9jb3JlL3Rva2VuVHlwZXMnO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQScsXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FHRU5UJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVCcsXG4gICdBVFRSSUJVVEUnLFxuICAnQVVUSElEJyxcbiAgJ0FWRycsXG4gICdCRVRXRUVOJyxcbiAgJ0JGSUxFX0JBU0UnLFxuICAnQklOQVJZX0lOVEVHRVInLFxuICAnQklOQVJZJyxcbiAgJ0JMT0JfQkFTRScsXG4gICdCTE9DSycsXG4gICdCT0RZJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCT1VORCcsXG4gICdCUkVBRFRIJyxcbiAgJ0JVTEsnLFxuICAnQlknLFxuICAnQllURScsXG4gICdDJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTElORycsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0UnLFxuICAnQ0hBUl9CQVNFJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJTRVQnLFxuICAnQ0hBUlNFVEZPUk0nLFxuICAnQ0hBUlNFVElEJyxcbiAgJ0NIRUNLJyxcbiAgJ0NMT0JfQkFTRScsXG4gICdDTE9ORScsXG4gICdDTE9TRScsXG4gICdDTFVTVEVSJyxcbiAgJ0NMVVNURVJTJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTEFVVEgnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTU1JVFRFRCcsXG4gICdDT01QSUxFRCcsXG4gICdDT01QUkVTUycsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlNUQU5UJyxcbiAgJ0NPTlNUUlVDVE9SJyxcbiAgJ0NPTlRFWFQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDT1VOVCcsXG4gICdDUkFTSCcsXG4gICdDUkVBVEUnLFxuICAnQ1JFREVOVElBTCcsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJWQUwnLFxuICAnQ1VSU09SJyxcbiAgJ0NVU1RPTURBVFVNJyxcbiAgJ0RBTkdMSU5HJyxcbiAgJ0RBVEEnLFxuICAnREFURV9CQVNFJyxcbiAgJ0RBVEUnLFxuICAnREFZJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVGQVVMVCcsXG4gICdERUZJTkUnLFxuICAnREVMRVRFJyxcbiAgJ0RFUFRIJyxcbiAgJ0RFU0MnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVJFQ1RPUlknLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFVSQVRJT04nLFxuICAnRUxFTUVOVCcsXG4gICdFTFNJRicsXG4gICdFTVBUWScsXG4gICdFTkQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYQ0VQVElPTlMnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhURU5EUycsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJTkFMJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZPUicsXG4gICdGT1JBTEwnLFxuICAnRk9SQ0UnLFxuICAnRlJPTScsXG4gICdGVU5DVElPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnSEFTSCcsXG4gICdIRUFQJyxcbiAgJ0hJRERFTicsXG4gICdIT1VSJyxcbiAgJ0lERU5USUZJRUQnLFxuICAnSUYnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVRElORycsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lORElDQVRPUicsXG4gICdJTkRJQ0VTJyxcbiAgJ0lORklOSVRFJyxcbiAgJ0lOU1RBTlRJQUJMRScsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUkZBQ0UnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZBTElEQVRFJyxcbiAgJ0lTJyxcbiAgJ0lTT0xBVElPTicsXG4gICdKQVZBJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVOR1RIJyxcbiAgJ0xFVkVMJyxcbiAgJ0xJQlJBUlknLFxuICAnTElLRScsXG4gICdMSUtFMicsXG4gICdMSUtFNCcsXG4gICdMSUtFQycsXG4gICdMSU1JVEVEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0snLFxuICAnTE9ORycsXG4gICdNQVAnLFxuICAnTUFYJyxcbiAgJ01BWExFTicsXG4gICdNRU1CRVInLFxuICAnTUVSR0UnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNTFNMQUJFTCcsXG4gICdNT0QnLFxuICAnTU9ERScsXG4gICdNT05USCcsXG4gICdNVUxUSVNFVCcsXG4gICdOQU1FJyxcbiAgJ05BTicsXG4gICdOQVRJT05BTCcsXG4gICdOQVRJVkUnLFxuICAnTkFUVVJBTCcsXG4gICdOQVRVUkFMTicsXG4gICdOQ0hBUicsXG4gICdORVcnLFxuICAnTkVYVFZBTCcsXG4gICdOT0NPTVBSRVNTJyxcbiAgJ05PQ09QWScsXG4gICdOT1QnLFxuICAnTk9XQUlUJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTUJFUl9CQVNFJyxcbiAgJ05VTUJFUicsXG4gICdPQkpFQ1QnLFxuICAnT0NJQ09MTCcsXG4gICdPQ0lEQVRFJyxcbiAgJ09DSURBVEVUSU1FJyxcbiAgJ09DSURVUkFUSU9OJyxcbiAgJ09DSUlOVEVSVkFMJyxcbiAgJ09DSUxPQkxPQ0FUT1InLFxuICAnT0NJTlVNQkVSJyxcbiAgJ09DSVJBVycsXG4gICdPQ0lSRUYnLFxuICAnT0NJUkVGQ1VSU09SJyxcbiAgJ09DSVJPV0lEJyxcbiAgJ09DSVNUUklORycsXG4gICdPQ0lUWVBFJyxcbiAgJ09GJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QQVFVRScsXG4gICdPUEVOJyxcbiAgJ09QRVJBVE9SJyxcbiAgJ09QVElPTicsXG4gICdPUkFDTEUnLFxuICAnT1JBREFUQScsXG4gICdPUkRFUicsXG4gICdPUkdBTklaQVRJT04nLFxuICAnT1JMQU5ZJyxcbiAgJ09STFZBUlknLFxuICAnT1RIRVJTJyxcbiAgJ09VVCcsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFSQUxMRUxfRU5BQkxFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJBTUVURVJTJyxcbiAgJ1BBUkVOVCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTQ0FMJyxcbiAgJ1BDVEZSRUUnLFxuICAnUElQRScsXG4gICdQSVBFTElORUQnLFxuICAnUExTX0lOVEVHRVInLFxuICAnUExVR0dBQkxFJyxcbiAgJ1BPU0lUSVZFJyxcbiAgJ1BPU0lUSVZFTicsXG4gICdQUkFHTUEnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSSU9SJyxcbiAgJ1BSSVZBVEUnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVQkxJQycsXG4gICdSQUlTRScsXG4gICdSQU5HRScsXG4gICdSQVcnLFxuICAnUkVBRCcsXG4gICdSRUFMJyxcbiAgJ1JFQ09SRCcsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVMSUVTX09OJyxcbiAgJ1JFTScsXG4gICdSRU1BSU5ERVInLFxuICAnUkVOQU1FJyxcbiAgJ1JFU09VUkNFJyxcbiAgJ1JFU1VMVF9DQUNIRScsXG4gICdSRVNVTFQnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZFUlNFJyxcbiAgJ1JFVk9LRScsXG4gICdST0xMQkFDSycsXG4gICdST1cnLFxuICAnUk9XSUQnLFxuICAnUk9XTlVNJyxcbiAgJ1JPV1RZUEUnLFxuICAnU0FNUExFJyxcbiAgJ1NBVkUnLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NCMScsXG4gICdTQjInLFxuICAnU0I0JyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VHTUVOVCcsXG4gICdTRUxGJyxcbiAgJ1NFUEFSQVRFJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NFUklBTElaQUJMRScsXG4gICdTSEFSRScsXG4gICdTSE9SVCcsXG4gICdTSVpFX1QnLFxuICAnU0laRScsXG4gICdTTUFMTElOVCcsXG4gICdTT01FJyxcbiAgJ1NQQUNFJyxcbiAgJ1NQQVJTRScsXG4gICdTUUwnLFxuICAnU1FMQ09ERScsXG4gICdTUUxEQVRBJyxcbiAgJ1NRTEVSUk0nLFxuICAnU1FMTkFNRScsXG4gICdTUUxTVEFURScsXG4gICdTVEFOREFSRCcsXG4gICdTVEFSVCcsXG4gICdTVEFUSUMnLFxuICAnU1REREVWJyxcbiAgJ1NUT1JFRCcsXG4gICdTVFJJTkcnLFxuICAnU1RSVUNUJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlBBUlRJVElPTicsXG4gICdTVUJTVElUVVRBQkxFJyxcbiAgJ1NVQlRZUEUnLFxuICAnU1VDQ0VTU0ZVTCcsXG4gICdTVU0nLFxuICAnU1lOT05ZTScsXG4gICdTWVNEQVRFJyxcbiAgJ1RBQkFVVEgnLFxuICAnVEFCTEUnLFxuICAnVERPJyxcbiAgJ1RIRScsXG4gICdUSEVOJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RJTUVaT05FX0FCQlInLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVElNRVpPTkVfUkVHSU9OJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSQU5TQUNUSU9OQUwnLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1RSVVNURUQnLFxuICAnVFlQRScsXG4gICdVQjEnLFxuICAnVUIyJyxcbiAgJ1VCNCcsXG4gICdVSUQnLFxuICAnVU5ERVInLFxuICAnVU5JUVVFJyxcbiAgJ1VOUExVRycsXG4gICdVTlNJR05FRCcsXG4gICdVTlRSVVNURUQnLFxuICAnVVNFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMSVNUJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSQ0hBUjInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOQ0UnLFxuICAnVkFSUkFZJyxcbiAgJ1ZBUllJTkcnLFxuICAnVklFVycsXG4gICdWSUVXUycsXG4gICdWT0lEJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJVEgnLFxuICAnV09SSycsXG4gICdXUkFQUEVEJyxcbiAgJ1dSSVRFJyxcbiAgJ1lFQVInLFxuICAnWk9ORScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0JFR0lOJyxcbiAgJ0NPTk5FQ1QgQlknLFxuICAnREVDTEFSRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdERUxFVEUnLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENFUFRJT04nLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ0xPT1AnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnU1RBUlQgV0lUSCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgQVBQTFknLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0VORCcsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIk4nJ1wiLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWydfJywgJyQnLCAnIycsICcuJywgJ0AnXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICBpZiAoaXNTZXQodG9rZW4pICYmIGlzQnkodGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4pKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUJPUlQnLFxuICAnQUJTT0xVVEUnLFxuICAnQUNDRVNTJyxcbiAgJ0FDVElPTicsXG4gICdBREQnLFxuICAnQURNSU4nLFxuICAnQUZURVInLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMTCcsXG4gICdBTFNPJyxcbiAgJ0FMVEVSJyxcbiAgJ0FMV0FZUycsXG4gICdBTkFMWVNFJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNTRVJUSU9OJyxcbiAgJ0FTU0lHTk1FTlQnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVFRBQ0gnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQkFDS1dBUkQnLFxuICAnQkVGT1JFJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCSVQnLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBQ0hFJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTQ0FERUQnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NBVEFMT0cnLFxuICAnQ0hBSU4nLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSSVNUSUNTJyxcbiAgJ0NIRUNLJyxcbiAgJ0NIRUNLUE9JTlQnLFxuICAnQ0xBU1MnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExBVElPTicsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1FTlRTJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09OQ1VSUkVOVExZJyxcbiAgJ0NPTkZJR1VSQVRJT04nLFxuICAnQ09ORkxJQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlNUUkFJTlRTJyxcbiAgJ0NPTlRFTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSU0lPTicsXG4gICdDT1BZJyxcbiAgJ0NPU1QnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NTVicsXG4gICdDVUJFJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9DQVRBTE9HJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFUQScsXG4gICdEQVRBQkFTRScsXG4gICdEQVknLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGQVVMVFMnLFxuICAnREVGRVJSQUJMRScsXG4gICdERUZFUlJFRCcsXG4gICdERUZJTkVSJyxcbiAgJ0RFTEVURScsXG4gICdERUxJTUlURVInLFxuICAnREVMSU1JVEVSUycsXG4gICdERVBFTkRTJyxcbiAgJ0RFU0MnLFxuICAnREVUQUNIJyxcbiAgJ0RJQ1RJT05BUlknLFxuICAnRElTQUJMRScsXG4gICdESVNDQVJEJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPQ1VNRU5UJyxcbiAgJ0RPTUFJTicsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdFQUNIJyxcbiAgJ0VMU0UnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFTkQnLFxuICAnRU5VTScsXG4gICdFU0NBUEUnLFxuICAnRVZFTlQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhDTFVESU5HJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUFJFU1NJT04nLFxuICAnRVhURU5TSU9OJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkFNSUxZJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJTFRFUicsXG4gICdGSVJTVCcsXG4gICdGTE9BVCcsXG4gICdGT0xMT1dJTkcnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRk9SV0FSRCcsXG4gICdGUkVFWkUnLFxuICAnRlJPTScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVTkNUSU9OUycsXG4gICdHRU5FUkFURUQnLFxuICAnR0xPQkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQU5URUQnLFxuICAnR1JFQVRFU1QnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnR1JPVVBTJyxcbiAgJ0hBTkRMRVInLFxuICAnSEFWSU5HJyxcbiAgJ0hFQURFUicsXG4gICdIT0xEJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJVFknLFxuICAnSUYnLFxuICAnSUxJS0UnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lNTVVUQUJMRScsXG4gICdJTVBMSUNJVCcsXG4gICdJTVBPUlQnLFxuICAnSU4nLFxuICAnSU5DTFVERScsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5IRVJJVCcsXG4gICdJTkhFUklUUycsXG4gICdJTklUSUFMTFknLFxuICAnSU5MSU5FJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOUFVUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlNURUFEJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVk9LRVInLFxuICAnSVMnLFxuICAnSVNOVUxMJyxcbiAgJ0lTT0xBVElPTicsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVNUJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRElORycsXG4gICdMRUFLUFJPT0YnLFxuICAnTEVBU1QnLFxuICAnTEVGVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJU1RFTicsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NBVElPTicsXG4gICdMT0NLJyxcbiAgJ0xPQ0tFRCcsXG4gICdMT0dHRUQnLFxuICAnTUFQUElORycsXG4gICdNQVRDSCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVUSE9EJyxcbiAgJ01JTlVURScsXG4gICdNSU5WQUxVRScsXG4gICdNT0RFJyxcbiAgJ01PTlRIJyxcbiAgJ01PVkUnLFxuICAnTkFNRScsXG4gICdOQU1FUycsXG4gICdOQVRJT05BTCcsXG4gICdOQVRVUkFMJyxcbiAgJ05DSEFSJyxcbiAgJ05FVycsXG4gICdORVhUJyxcbiAgJ05GQycsXG4gICdORkQnLFxuICAnTkZLQycsXG4gICdORktEJyxcbiAgJ05PJyxcbiAgJ05PTkUnLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05PVEhJTkcnLFxuICAnTk9USUZZJyxcbiAgJ05PVE5VTEwnLFxuICAnTk9XQUlUJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnT0JKRUNUJyxcbiAgJ09GJyxcbiAgJ09GRicsXG4gICdPRkZTRVQnLFxuICAnT0lEUycsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OUycsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPUkRJTkFMSVRZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSTEFZJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnT1dORUQnLFxuICAnT1dORVInLFxuICAnUEFSQUxMRUwnLFxuICAnUEFSU0VSJyxcbiAgJ1BBUlRJQUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU1NJTkcnLFxuICAnUEFTU1dPUkQnLFxuICAnUExBQ0lORycsXG4gICdQTEFOUycsXG4gICdQT0xJQ1knLFxuICAnUE9TSVRJT04nLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVBBUkVEJyxcbiAgJ1BSRVNFUlZFJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJT1InLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkFMJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9DRURVUkVTJyxcbiAgJ1BST0dSQU0nLFxuICAnUFVCTElDQVRJT04nLFxuICAnUVVPVEUnLFxuICAnUkFOR0UnLFxuICAnUkVBRCcsXG4gICdSRUFMJyxcbiAgJ1JFQVNTSUdOJyxcbiAgJ1JFQ0hFQ0snLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFRlJFU0gnLFxuICAnUkVJTkRFWCcsXG4gICdSRUxBVElWRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVRBQkxFJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVQTElDQScsXG4gICdSRVNFVCcsXG4gICdSRVNUQVJUJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVVRJTkVTJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JVTEUnLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NDSEVNQScsXG4gICdTQ0hFTUFTJyxcbiAgJ1NDUk9MTCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVFVRU5DRScsXG4gICdTRVFVRU5DRVMnLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NFUlZFUicsXG4gICdTRVNTSU9OJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTRVQnLFxuICAnU0VUT0YnLFxuICAnU0VUUycsXG4gICdTSEFSRScsXG4gICdTSE9XJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NLSVAnLFxuICAnU01BTExJTlQnLFxuICAnU05BUFNIT1QnLFxuICAnU09NRScsXG4gICdTUUwnLFxuICAnU1RBQkxFJyxcbiAgJ1NUQU5EQUxPTkUnLFxuICAnU1RBUlQnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJU1RJQ1MnLFxuICAnU1RESU4nLFxuICAnU1RET1VUJyxcbiAgJ1NUT1JBR0UnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUklDVCcsXG4gICdTVFJJUCcsXG4gICdTVUJTQ1JJUFRJT04nLFxuICAnU1VCU1RSSU5HJyxcbiAgJ1NVUFBPUlQnLFxuICAnU1lNTUVUUklDJyxcbiAgJ1NZU0lEJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnVEFCTEVTUEFDRScsXG4gICdURU1QJyxcbiAgJ1RFTVBMQVRFJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdURVhUJyxcbiAgJ1RIRU4nLFxuICAnVElFUycsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFJVU1RFRCcsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VFU0NBUEUnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOQ09NTUlUVEVEJyxcbiAgJ1VORU5DUllQVEVEJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTElTVEVOJyxcbiAgJ1VOTE9HR0VEJyxcbiAgJ1VOVElMJyxcbiAgJ1VQREFURScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBQ1VVTScsXG4gICdWQUxJRCcsXG4gICdWQUxJREFURScsXG4gICdWQUxJREFUT1InLFxuICAnVkFMVUUnLFxuICAnVkFMVUVTJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFESUMnLFxuICAnVkFSWUlORycsXG4gICdWRVJCT1NFJyxcbiAgJ1ZFUlNJT04nLFxuICAnVklFVycsXG4gICdWSUVXUycsXG4gICdWT0xBVElMRScsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISVRFU1BBQ0UnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dJVEhPVVQnLFxuICAnV09SSycsXG4gICdXUkFQUEVSJyxcbiAgJ1dSSVRFJyxcbiAgJ1hNTCcsXG4gICdYTUxBVFRSSUJVVEVTJyxcbiAgJ1hNTENPTkNBVCcsXG4gICdYTUxFTEVNRU5UJyxcbiAgJ1hNTEVYSVNUUycsXG4gICdYTUxGT1JFU1QnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdYTUxQQVJTRScsXG4gICdYTUxQSScsXG4gICdYTUxST09UJyxcbiAgJ1hNTFNFUklBTElaRScsXG4gICdYTUxUQUJMRScsXG4gICdZRUFSJyxcbiAgJ1lFUycsXG4gICdaT05FJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0Z3JlU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgXCJVJicnXCIsICdVJlwiXCInLCAnJCQnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnPDwnLFxuICAgICAgICAnPj4nLFxuICAgICAgICAnfHwvJyxcbiAgICAgICAgJ3wvJyxcbiAgICAgICAgJzo6JyxcbiAgICAgICAgJy0+PicsXG4gICAgICAgICctPicsXG4gICAgICAgICd+fionLFxuICAgICAgICAnfn4nLFxuICAgICAgICAnIX5+KicsXG4gICAgICAgICchfn4nLFxuICAgICAgICAnfionLFxuICAgICAgICAnIX4qJyxcbiAgICAgICAgJyF+JyxcbiAgICAgIF0sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBRVMxMjgnLFxuICAnQUVTMjU2JyxcbiAgJ0FMTE9XT1ZFUldSSVRFJyxcbiAgJ0FOQUxZU0UnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQkFDS1VQJyxcbiAgJ0JJTkFSWScsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQk9USCcsXG4gICdCWVRFRElDVCcsXG4gICdCWklQMicsXG4gICdDQVNUJyxcbiAgJ0NIRUNLJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlJFTlRfVVNFUl9JRCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkVSUkFCTEUnLFxuICAnREVGTEFURScsXG4gICdERUZSQUcnLFxuICAnREVMVEEnLFxuICAnREVMVEEzMksnLFxuICAnREVTQycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0VMU0UnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ERScsXG4gICdFTkNSWVBUJyxcbiAgJ0VOQ1JZUFRJT04nLFxuICAnRU5EJyxcbiAgJ0VYUExJQ0lUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZPUicsXG4gICdGT1JFSUdOJyxcbiAgJ0ZSRUVaRScsXG4gICdGVUxMJyxcbiAgJ0dMT0JBTERJQ1QyNTYnLFxuICAnR0xPQkFMRElDVDY0SycsXG4gICdHUkFOVCcsXG4gICdHWklQJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lHTk9SRScsXG4gICdJTElLRScsXG4gICdJTklUSUFMTFknLFxuICAnSU5UTycsXG4gICdMRUFESU5HJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMVU4nLFxuICAnTFVOUycsXG4gICdMWk8nLFxuICAnTFpPUCcsXG4gICdNSU5VUycsXG4gICdNT1NUTFkxMycsXG4gICdNT1NUTFkzMicsXG4gICdNT1NUTFk4JyxcbiAgJ05BVFVSQUwnLFxuICAnTkVXJyxcbiAgJ05VTExTJyxcbiAgJ09GRicsXG4gICdPRkZMSU5FJyxcbiAgJ09GRlNFVCcsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09SREVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ1BBUkFMTEVMJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UJyxcbiAgJ1BFUk1JU1NJT05TJyxcbiAgJ1BMQUNJTkcnLFxuICAnUFJJTUFSWScsXG4gICdSQVcnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFQ09WRVInLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUpFQ1RMT0cnLFxuICAnUkVTT1JUJyxcbiAgJ1JFU1RPUkUnLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NJTUlMQVInLFxuICAnU1lTREFURScsXG4gICdTWVNURU0nLFxuICAnVEFCTEUnLFxuICAnVEFHJyxcbiAgJ1RERVMnLFxuICAnVEVYVDI1NScsXG4gICdURVhUMzJLJyxcbiAgJ1RIRU4nLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RPJyxcbiAgJ1RPUCcsXG4gICdUUkFJTElORycsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdVTklRVUUnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWRVJCT1NFJyxcbiAgJ1dBTExFVCcsXG4gICdXSEVOJyxcbiAgJ1dJVEgnLFxuICAnV0lUSE9VVCcsXG4gICdQUkVESUNBVEUnLFxuICAnQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QUkVTU0lPTicsXG4gICdDT1BZJyxcbiAgJ0ZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRklYRURXSURUSCcsXG4gICdBVlJPJyxcbiAgJ0pTT04nLFxuICAnRU5DUllQVEVEJyxcbiAgJ0JaSVAyJyxcbiAgJ0daSVAnLFxuICAnTFpPUCcsXG4gICdQQVJRVUVUJyxcbiAgJ09SQycsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdOVUxMIEFTJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnU1RBVFVQREFURScsXG4gICdNQU5JRkVTVCcsXG4gICdSRUdJT04nLFxuICAnSUFNX1JPTEUnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnU1NIJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQUNDRVNTX0tFWV9JRCcsXG4gICdTRUNSRVRfQUNDRVNTX0tFWScsXG4gICdBVlJPJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCWklQMicsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnRklYRURXSURUSCcsXG4gICdGT1JNQVQnLFxuICAnSUFNX1JPTEUnLFxuICAnR1pJUCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdKU09OJyxcbiAgJ0xaT1AnLFxuICAnTUFOSUZFU1QnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFR0lPTicsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdTU0gnLFxuICAnU1RBVFVQREFURScsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1NFU1NJT05fVE9LRU4nLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnRVhURVJOQUwnLFxuICAnREFUQSBDQVRBTE9HJyxcbiAgJ0hJVkUgTUVUQVNUT1JFJyxcbiAgJ0NBVEFMT0dfUk9MRScsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnRVZFTicsXG4gICdBTEwnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdUT1AnLFxuICAnTElNSVQnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5BTFlTRScsXG4gICdESVNUS0VZJyxcbiAgJ1NPUlRLRVknLFxuICAnQ09NUE9VTkQnLFxuICAnSU5URVJMRUFWRUQnLFxuICAnRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0FWUk8nLFxuICAnSlNPTicsXG4gICdFTkNSWVBURUQnLFxuICAnQlpJUDInLFxuICAnR1pJUCcsXG4gICdMWk9QJyxcbiAgJ1BBUlFVRVQnLFxuICAnT1JDJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnVElNRUZPUk1BVCcsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ01BTklGRVNUJyxcbiAgJ1JFR0lPTicsXG4gICdJQU1fUk9MRScsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdTU0gnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdBQ0NFU1NfS0VZX0lEJyxcbiAgJ1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgJ0FWUk8nLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JaSVAyJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnREFURUZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0ZPUk1BVCcsXG4gICdJQU1fUk9MRScsXG4gICdHWklQJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ0pTT04nLFxuICAnTFpPUCcsXG4gICdNQU5JRkVTVCcsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnTlVMTCBBUycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVHSU9OJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1NTSCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnU0VTU0lPTl9UT0tFTicsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdFWFRFUk5BTCcsXG4gICdEQVRBIENBVEFMT0cnLFxuICAnSElWRSBNRVRBU1RPUkUnLFxuICAnQ0FUQUxPR19ST0xFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0pPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdBTkFMWVpFJyxcbiAgJ0FOQUxZU0UnLFxuICAnRElTVEtFWScsXG4gICdTT1JUS0VZJyxcbiAgJ0NPTVBPVU5EJyxcbiAgJ0lOVEVSTEVBVkVEJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5kYXJkU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJywgJyMnLCAnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCB7IGlzRW5kLCBpc1dpbmRvdyB9IGZyb20gJy4uL2NvcmUvdG9rZW4nO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5pbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuLi9jb3JlL3Rva2VuVHlwZXMnO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUlJBWV9aSVAnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FWRycsXG4gICdCRVRXRUVOJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExFQ1RfTElTVCcsXG4gICdDT0xMRUNUX1NFVCcsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDT1VOVCcsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCBST1cnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVRFX0FERCcsXG4gICdEQVRFX1NVQicsXG4gICdEQVRFX1RSVU5DJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdERUNPREUnLFxuICAnREVGQVVMVCcsXG4gICdERUxFVEUnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdEUk9QJyxcbiAgJ0VMU0UnLFxuICAnRU5DT0RFJyxcbiAgJ0VORCcsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFBMT0RFX09VVEVSJyxcbiAgJ0VYUExPREUnLFxuICAnRklMVEVSJyxcbiAgJ0ZJUlNUX1ZBTFVFJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9MTE9XSU5HJyxcbiAgJ0ZST01fVU5JWFRJTUUnLFxuICAnRlVMTCcsXG4gICdHUkVBVEVTVCcsXG4gICdHUk9VUF9DT05DQVQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSE9VUicsXG4gICdIT1VSUycsXG4gICdJRicsXG4gICdJRk5VTEwnLFxuICAnSU4nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnTEFHJyxcbiAgJ0xBU1RfVkFMVUUnLFxuICAnTEFTVCcsXG4gICdMRUFEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBU1QnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdNQVgnLFxuICAnTUVSR0UnLFxuICAnTUlOJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTUlOVVRFJyxcbiAgJ01PTlRIJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PVygpJyxcbiAgJ05USUxFJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BUSU1JWkUnLFxuICAnT1ZFUicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTkFNRScsXG4gICdSTElLRScsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdTRUNPTkQnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NJWkUnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVU0nLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdUSEVOJyxcbiAgJ1RPX0RBVEUnLFxuICAnVE9fSlNPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VOQk9VTkRFRCcsXG4gICdVTklRVUUnLFxuICAnVU5JWF9USU1FU1RBTVAnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBUklBQkxFUycsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdZRUFSX01PTlRIJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgREFUQUJBU0UnLFxuICAnQUxURVIgU0NIRU1BJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NMVVNURVIgQlknLFxuICAnQ0xVU1RFUkVEIEJZJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RJU1RSSUJVVEUgQlknLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09QVElPTlMnLFxuICAnT1JERVIgQlknLFxuICAnUEFSVElUSU9OIEJZJyxcbiAgJ1BBUlRJVElPTkVEIEJZJyxcbiAgJ1JBTkdFJyxcbiAgJ1JPV1MnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdUQkxQUk9QRVJUSUVTJyxcbiAgJ1VQREFURScsXG4gICdVU0lORycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnV0lORE9XJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW1xuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0FOVEkgSk9JTicsXG4gICdDUkVBVEUgT1InLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnRUxTRScsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xBVEVSQUwgVklFVycsXG4gICdMRUZUIEFOVEkgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ0xFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgQU5USSBKT0lOJyxcbiAgJ05BVFVSQUwgRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgSU5ORVIgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBTRU1JIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgU0VNSSBKT0lOJyxcbiAgJ1NFTUkgSk9JTicsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFya1NxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICd7fSddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgIH0pO1xuICB9XG5cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgZnVuY3Rpb25zXG4gICAgaWYgKGlzV2luZG93KHRva2VuKSkge1xuICAgICAgY29uc3QgYWhlYWRUb2tlbiA9IHRoaXMudG9rZW5Mb29rQWhlYWQoKTtcbiAgICAgIGlmIChhaGVhZFRva2VuICYmIGFoZWFkVG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYSBmdW5jdGlvbiBjYWxsLCB0cmVhdCBpdCBhcyBhIHJlc2VydmVkIHdvcmRcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRml4IGNhc2VzIHdoZXJlIG5hbWVzIGFyZSBhbWJpZ3VvdXNseSBrZXl3b3JkcyBvciBwcm9wZXJ0aWVzXG4gICAgaWYgKGlzRW5kKHRva2VuKSkge1xuICAgICAgY29uc3QgYmFja1Rva2VuID0gdGhpcy50b2tlbkxvb2tCZWhpbmQoKTtcbiAgICAgIGlmIChiYWNrVG9rZW4gJiYgYmFja1Rva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFUkFUT1IgJiYgYmFja1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB3aW5kb3coKS5lbmQgKG9yIHNpbWlsYXIpIG5vdCBDQVNFIC4uLiBFTkRcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5XT1JELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FDVElPTicsXG4gICdBR0FJTlNUJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEdPUklUSE0nLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVVUT0NPTU1JVCcsXG4gICdBVVRPX0lOQ1JFTUVOVCcsXG4gICdCQUNLVVAnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSU5MT0cnLFxuICAnQk9USCcsXG4gICdDQVNDQURFJyxcbiAgJ0NIQU5HRScsXG4gICdDSEFOR0VEJyxcbiAgJ0NIQVJBQ1RFUiBTRVQnLFxuICAnQ0hBUlNFVCcsXG4gICdDSEVDSycsXG4gICdDSEVDS1NVTScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExBVElPTicsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUFJFU1NFRCcsXG4gICdDT05DVVJSRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBWScsXG4gICdEQVlfSE9VUicsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREVGQVVMVCcsXG4gICdERUZJTkVSJyxcbiAgJ0RFTEFZRUQnLFxuICAnREVMRVRFJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNUSU5DVCcsXG4gICdESVNUSU5DVFJPVycsXG4gICdESVYnLFxuICAnRE8nLFxuICAnRFJPUCcsXG4gICdEVU1QRklMRScsXG4gICdEVVBMSUNBVEUnLFxuICAnRFlOQU1JQycsXG4gICdFTFNFJyxcbiAgJ0VOQ0xPU0VEJyxcbiAgJ0VOR0lORScsXG4gICdFTkdJTkVTJyxcbiAgJ0VOR0lORV9UWVBFJyxcbiAgJ0VTQ0FQRScsXG4gICdFU0NBUEVEJyxcbiAgJ0VWRU5UUycsXG4gICdFWEVDJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhURU5ERUQnLFxuICAnRkFTVCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFMnLFxuICAnRklMRScsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTFVTSCcsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGVUxMJyxcbiAgJ0ZVTExURVhUJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dMT0JBTCcsXG4gICdHUkFOVCcsXG4gICdHUkFOVFMnLFxuICAnR1JPVVBfQ09OQ0FUJyxcbiAgJ0hFQVAnLFxuICAnSElHSF9QUklPUklUWScsXG4gICdIT1NUUycsXG4gICdIT1VSJyxcbiAgJ0hPVVJfTUlOVVRFJyxcbiAgJ0hPVVJfU0VDT05EJyxcbiAgJ0lERU5USUZJRUQnLFxuICAnSUYnLFxuICAnSUZOVUxMJyxcbiAgJ0lHTk9SRScsXG4gICdJTicsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lORklMRScsXG4gICdJTlNFUlQnLFxuICAnSU5TRVJUX0lEJyxcbiAgJ0lOU0VSVF9NRVRIT0QnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZPS0VSJyxcbiAgJ0lTJyxcbiAgJ0lTT0xBVElPTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xBU1RfSU5TRVJUX0lEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdMSU5FQVInLFxuICAnTElORVMnLFxuICAnTE9BRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPQ0tTJyxcbiAgJ0xPR1MnLFxuICAnTE9XX1BSSU9SSVRZJyxcbiAgJ01BUklBJyxcbiAgJ01BU1RFUicsXG4gICdNQVNURVJfQ09OTkVDVF9SRVRSWScsXG4gICdNQVNURVJfSE9TVCcsXG4gICdNQVNURVJfTE9HX0ZJTEUnLFxuICAnTUFUQ0gnLFxuICAnTUFYX0NPTk5FQ1RJT05TX1BFUl9IT1VSJyxcbiAgJ01BWF9RVUVSSUVTX1BFUl9IT1VSJyxcbiAgJ01BWF9ST1dTJyxcbiAgJ01BWF9VUERBVEVTX1BFUl9IT1VSJyxcbiAgJ01BWF9VU0VSX0NPTk5FQ1RJT05TJyxcbiAgJ01FRElVTScsXG4gICdNRVJHRScsXG4gICdNSU5VVEUnLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5fUk9XUycsXG4gICdNT0RFJyxcbiAgJ01PRElGWScsXG4gICdNT05USCcsXG4gICdNUkdfTVlJU0FNJyxcbiAgJ01ZSVNBTScsXG4gICdOQU1FUycsXG4gICdOQVRVUkFMJyxcbiAgJ05PVCcsXG4gICdOT1coKScsXG4gICdOVUxMJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OQUxMWScsXG4gICdPVVRGSUxFJyxcbiAgJ1BBQ0tfS0VZUycsXG4gICdQQUdFJyxcbiAgJ1BBUlRJQUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBUlRJVElPTlMnLFxuICAnUEFTU1dPUkQnLFxuICAnUFJJTUFSWScsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9DRVNTJyxcbiAgJ1BST0NFU1NMSVNUJyxcbiAgJ1BVUkdFJyxcbiAgJ1FVSUNLJyxcbiAgJ1JBSUQwJyxcbiAgJ1JBSURfQ0hVTktTJyxcbiAgJ1JBSURfQ0hVTktTSVpFJyxcbiAgJ1JBSURfVFlQRScsXG4gICdSQU5HRScsXG4gICdSRUFEJyxcbiAgJ1JFQURfT05MWScsXG4gICdSRUFEX1dSSVRFJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTE9BRCcsXG4gICdSRU5BTUUnLFxuICAnUkVQQUlSJyxcbiAgJ1JFUEVBVEFCTEUnLFxuICAnUkVQTEFDRScsXG4gICdSRVBMSUNBVElPTicsXG4gICdSRVNFVCcsXG4gICdSRVNUT1JFJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSTElLRScsXG4gICdST0xMQkFDSycsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdST1dfRk9STUFUJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNVUklUWScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NFU1NJT04nLFxuICAnU0hBUkUnLFxuICAnU0hPVycsXG4gICdTSFVURE9XTicsXG4gICdTTEFWRScsXG4gICdTT05BTUUnLFxuICAnU09VTkRTJyxcbiAgJ1NRTCcsXG4gICdTUUxfQVVUT19JU19OVUxMJyxcbiAgJ1NRTF9CSUdfUkVTVUxUJyxcbiAgJ1NRTF9CSUdfU0VMRUNUUycsXG4gICdTUUxfQklHX1RBQkxFUycsXG4gICdTUUxfQlVGRkVSX1JFU1VMVCcsXG4gICdTUUxfQ0FDSEUnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfTE9HX0JJTicsXG4gICdTUUxfTE9HX09GRicsXG4gICdTUUxfTE9HX1VQREFURScsXG4gICdTUUxfTE9XX1BSSU9SSVRZX1VQREFURVMnLFxuICAnU1FMX01BWF9KT0lOX1NJWkUnLFxuICAnU1FMX05PX0NBQ0hFJyxcbiAgJ1NRTF9RVU9URV9TSE9XX0NSRUFURScsXG4gICdTUUxfU0FGRV9VUERBVEVTJyxcbiAgJ1NRTF9TRUxFQ1RfTElNSVQnLFxuICAnU1FMX1NMQVZFX1NLSVBfQ09VTlRFUicsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NRTF9XQVJOSU5HUycsXG4gICdTVEFSVCcsXG4gICdTVEFSVElORycsXG4gICdTVEFUVVMnLFxuICAnU1RPUCcsXG4gICdTVE9SQUdFJyxcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnU1RSSU5HJyxcbiAgJ1NUUklQRUQnLFxuICAnU1VQRVInLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdURVJNSU5BVEVEJyxcbiAgJ1RIRU4nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT05BTCcsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5DT01NSVRURUQnLFxuICAnVU5JUVVFJyxcbiAgJ1VOTE9DSycsXG4gICdVTlNJR05FRCcsXG4gICdVU0FHRScsXG4gICdVU0UnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0lUSCcsXG4gICdXT1JLJyxcbiAgJ1dSSVRFJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdHTycsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBBUFBMWScsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ0VMU0UnLFxuICAnSU5ORVIgSk9JTicsXG4gICdKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnV0hFTicsXG4gICdYT1InLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnLCAnW10nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJ0AnLCAnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWycjJywgJy0tJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBREQnLFxuICAnRVhURVJOQUwnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ0FMTCcsXG4gICdGRVRDSCcsXG4gICdQVUJMSUMnLFxuICAnQUxURVInLFxuICAnRklMRScsXG4gICdSQUlTRVJST1InLFxuICAnQU5EJyxcbiAgJ0ZJTExGQUNUT1InLFxuICAnUkVBRCcsXG4gICdBTlknLFxuICAnRk9SJyxcbiAgJ1JFQURURVhUJyxcbiAgJ0FTJyxcbiAgJ0ZPUkVJR04nLFxuICAnUkVDT05GSUdVUkUnLFxuICAnQVNDJyxcbiAgJ0ZSRUVURVhUJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdGUkVFVEVYVFRBQkxFJyxcbiAgJ1JFUExJQ0FUSU9OJyxcbiAgJ0JBQ0tVUCcsXG4gICdGUk9NJyxcbiAgJ1JFU1RPUkUnLFxuICAnQkVHSU4nLFxuICAnRlVMTCcsXG4gICdSRVNUUklDVCcsXG4gICdCRVRXRUVOJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ1JFVFVSTicsXG4gICdCUkVBSycsXG4gICdHT1RPJyxcbiAgJ1JFVkVSVCcsXG4gICdCUk9XU0UnLFxuICAnR1JBTlQnLFxuICAnUkVWT0tFJyxcbiAgJ0JVTEsnLFxuICAnR1JPVVAnLFxuICAnUklHSFQnLFxuICAnQlknLFxuICAnSEFWSU5HJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ0NBU0NBREUnLFxuICAnSE9MRExPQ0snLFxuICAnUk9XQ09VTlQnLFxuICAnQ0FTRScsXG4gICdJREVOVElUWScsXG4gICdST1dHVUlEQ09MJyxcbiAgJ0NIRUNLJyxcbiAgJ0lERU5USVRZX0lOU0VSVCcsXG4gICdSVUxFJyxcbiAgJ0NIRUNLUE9JTlQnLFxuICAnSURFTlRJVFlDT0wnLFxuICAnU0FWRScsXG4gICdDTE9TRScsXG4gICdJRicsXG4gICdTQ0hFTUEnLFxuICAnQ0xVU1RFUkVEJyxcbiAgJ0lOJyxcbiAgJ1NFQ1VSSVRZQVVESVQnLFxuICAnQ09BTEVTQ0UnLFxuICAnSU5ERVgnLFxuICAnU0VMRUNUJyxcbiAgJ0NPTExBVEUnLFxuICAnSU5ORVInLFxuICAnU0VNQU5USUNLRVlQSFJBU0VUQUJMRScsXG4gICdDT0xVTU4nLFxuICAnSU5TRVJUJyxcbiAgJ1NFTUFOVElDU0lNSUxBUklUWURFVEFJTFNUQUJMRScsXG4gICdDT01NSVQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ1NFTUFOVElDU0lNSUxBUklUWVRBQkxFJyxcbiAgJ0NPTVBVVEUnLFxuICAnSU5UTycsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnQ09OU1RSQUlOVCcsXG4gICdJUycsXG4gICdTRVQnLFxuICAnQ09OVEFJTlMnLFxuICAnSk9JTicsXG4gICdTRVRVU0VSJyxcbiAgJ0NPTlRBSU5TVEFCTEUnLFxuICAnS0VZJyxcbiAgJ1NIVVRET1dOJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0tJTEwnLFxuICAnU09NRScsXG4gICdDT05WRVJUJyxcbiAgJ0xFRlQnLFxuICAnU1RBVElTVElDUycsXG4gICdDUkVBVEUnLFxuICAnTElLRScsXG4gICdTWVNURU1fVVNFUicsXG4gICdDUk9TUycsXG4gICdMSU5FTk8nLFxuICAnVEFCTEUnLFxuICAnQ1VSUkVOVCcsXG4gICdMT0FEJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdNRVJHRScsXG4gICdURVhUU0laRScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnTkFUSU9OQUwnLFxuICAnVEhFTicsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdOT0NIRUNLJyxcbiAgJ1RPJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdOT05DTFVTVEVSRUQnLFxuICAnVE9QJyxcbiAgJ0NVUlNPUicsXG4gICdOT1QnLFxuICAnVFJBTicsXG4gICdEQVRBQkFTRScsXG4gICdOVUxMJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ0RCQ0MnLFxuICAnTlVMTElGJyxcbiAgJ1RSSUdHRVInLFxuICAnREVBTExPQ0FURScsXG4gICdPRicsXG4gICdUUlVOQ0FURScsXG4gICdERUNMQVJFJyxcbiAgJ09GRicsXG4gICdUUllfQ09OVkVSVCcsXG4gICdERUZBVUxUJyxcbiAgJ09GRlNFVFMnLFxuICAnVFNFUVVBTCcsXG4gICdERUxFVEUnLFxuICAnT04nLFxuICAnVU5JT04nLFxuICAnREVOWScsXG4gICdPUEVOJyxcbiAgJ1VOSVFVRScsXG4gICdERVNDJyxcbiAgJ09QRU5EQVRBU09VUkNFJyxcbiAgJ1VOUElWT1QnLFxuICAnRElTSycsXG4gICdPUEVOUVVFUlknLFxuICAnVVBEQVRFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ09QRU5ST1dTRVQnLFxuICAnVVBEQVRFVEVYVCcsXG4gICdESVNUUklCVVRFRCcsXG4gICdPUEVOWE1MJyxcbiAgJ1VTRScsXG4gICdET1VCTEUnLFxuICAnT1BUSU9OJyxcbiAgJ1VTRVInLFxuICAnRFJPUCcsXG4gICdPUicsXG4gICdWQUxVRVMnLFxuICAnRFVNUCcsXG4gICdPUkRFUicsXG4gICdWQVJZSU5HJyxcbiAgJ0VMU0UnLFxuICAnT1VURVInLFxuICAnVklFVycsXG4gICdFTkQnLFxuICAnT1ZFUicsXG4gICdXQUlURk9SJyxcbiAgJ0VSUkxWTCcsXG4gICdQRVJDRU5UJyxcbiAgJ1dIRU4nLFxuICAnRVNDQVBFJyxcbiAgJ1BJVk9UJyxcbiAgJ1dIRVJFJyxcbiAgJ0VYQ0VQVCcsXG4gICdQTEFOJyxcbiAgJ1dISUxFJyxcbiAgJ0VYRUMnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1dJVEgnLFxuICAnRVhFQ1VURScsXG4gICdQUklNQVJZJyxcbiAgJ1dJVEhJTiBHUk9VUCcsXG4gICdFWElTVFMnLFxuICAnUFJJTlQnLFxuICAnV1JJVEVURVhUJyxcbiAgJ0VYSVQnLFxuICAnUFJPQycsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NBU0UnLFxuICAnREVMRVRFIEZST00nLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgSk9JTicsXG4gICdFTFNFJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1dIRU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIk4nJ1wiLCBcIicnXCIsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnPj0nLFxuICAgICAgICAnPD0nLFxuICAgICAgICAnPD4nLFxuICAgICAgICAnIT0nLFxuICAgICAgICAnITwnLFxuICAgICAgICAnIT4nLFxuICAgICAgICAnKz0nLFxuICAgICAgICAnLT0nLFxuICAgICAgICAnKj0nLFxuICAgICAgICAnLz0nLFxuICAgICAgICAnJT0nLFxuICAgICAgICAnfD0nLFxuICAgICAgICAnJj0nLFxuICAgICAgICAnXj0nLFxuICAgICAgICAnOjonLFxuICAgICAgXSxcbiAgICAgIC8vIFRPRE86IFN1cHBvcnQgZm9yIG1vbmV5IGNvbnN0YW50c1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRGIyRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlcic7XG5pbXBvcnQgTWFyaWFEYkZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9NYXJpYURiRm9ybWF0dGVyJztcbmltcG9ydCBNeVNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9NeVNxbEZvcm1hdHRlcic7XG5pbXBvcnQgTjFxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9OMXFsRm9ybWF0dGVyJztcbmltcG9ydCBQbFNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlcic7XG5pbXBvcnQgUG9zdGdyZVNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9Qb3N0Z3JlU3FsRm9ybWF0dGVyJztcbmltcG9ydCBSZWRzaGlmdEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlcic7XG5pbXBvcnQgU3BhcmtTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3BhcmtTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFN0YW5kYXJkU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1N0YW5kYXJkU3FsRm9ybWF0dGVyJztcbmltcG9ydCBUU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1RTcWxGb3JtYXR0ZXInO1xuXG5jb25zdCBmb3JtYXR0ZXJzID0ge1xuICBkYjI6IERiMkZvcm1hdHRlcixcbiAgbWFyaWFkYjogTWFyaWFEYkZvcm1hdHRlcixcbiAgbXlzcWw6IE15U3FsRm9ybWF0dGVyLFxuICBuMXFsOiBOMXFsRm9ybWF0dGVyLFxuICAncGwvc3FsJzogUGxTcWxGb3JtYXR0ZXIsXG4gIHBsc3FsOiBQbFNxbEZvcm1hdHRlcixcbiAgcG9zdGdyZXNxbDogUG9zdGdyZVNxbEZvcm1hdHRlcixcbiAgcmVkc2hpZnQ6IFJlZHNoaWZ0Rm9ybWF0dGVyLFxuICBzcGFyazogU3BhcmtTcWxGb3JtYXR0ZXIsXG4gIHNxbDogU3RhbmRhcmRTcWxGb3JtYXR0ZXIsXG4gIHRzcWw6IFRTcWxGb3JtYXR0ZXIsXG59O1xuXG4vKipcbiAqIEZvcm1hdCB3aGl0ZXNwYWNlIGluIGEgcXVlcnkgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmxhbmd1YWdlIFF1ZXJ5IGxhbmd1YWdlLCBkZWZhdWx0IGlzIFN0YW5kYXJkIFNRTFxuICogIEBwYXJhbSB7U3RyaW5nfSBjZmcuaW5kZW50IENoYXJhY3RlcnMgdXNlZCBmb3IgaW5kZW50YXRpb24sIGRlZmF1bHQgaXMgXCIgIFwiICgyIHNwYWNlcylcbiAqICBAcGFyYW0ge0Jvb2xlYW59IGNmZy51cHBlcmNhc2UgQ29udmVydHMga2V5d29yZHMgdG8gdXBwZXJjYXNlXG4gKiAgQHBhcmFtIHtJbnRlZ2VyfSBjZmcubGluZXNCZXR3ZWVuUXVlcmllcyBIb3cgbWFueSBsaW5lIGJyZWFrcyBiZXR3ZWVuIHF1ZXJpZXNcbiAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtcyBDb2xsZWN0aW9uIG9mIHBhcmFtcyBmb3IgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdCA9IChxdWVyeSwgY2ZnID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBxdWVyeSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcXVlcnkgYXJndW1lbnQuIEV4dGVjdGVkIHN0cmluZywgaW5zdGVhZCBnb3QgJyArIHR5cGVvZiBxdWVyeSk7XG4gIH1cblxuICBsZXQgRm9ybWF0dGVyID0gU3RhbmRhcmRTcWxGb3JtYXR0ZXI7XG4gIGlmIChjZmcubGFuZ3VhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIEZvcm1hdHRlciA9IGZvcm1hdHRlcnNbY2ZnLmxhbmd1YWdlXTtcbiAgfVxuICBpZiAoRm9ybWF0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBFcnJvcihgVW5zdXBwb3J0ZWQgU1FMIGRpYWxlY3Q6ICR7Y2ZnLmxhbmd1YWdlfWApO1xuICB9XG4gIHJldHVybiBuZXcgRm9ybWF0dGVyKGNmZykuZm9ybWF0KHF1ZXJ5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdXBwb3J0ZWREaWFsZWN0cyA9IE9iamVjdC5rZXlzKGZvcm1hdHRlcnMpO1xuIiwiLy8gT25seSByZW1vdmVzIHNwYWNlcywgbm90IG5ld2xpbmVzXG5leHBvcnQgY29uc3QgdHJpbVNwYWNlc0VuZCA9IChzdHIpID0+IHN0ci5yZXBsYWNlKC9bIFxcdF0rJC91LCAnJyk7XG5cbi8vIExhc3QgZWxlbWVudCBmcm9tIGFycmF5XG5leHBvcnQgY29uc3QgbGFzdCA9IChhcnIpID0+IGFyclthcnIubGVuZ3RoIC0gMV07XG5cbi8vIFRydWUgYXJyYXkgaXMgZW1wdHksIG9yIGl0J3Mgbm90IGFuIGFycmF5IGF0IGFsbFxuZXhwb3J0IGNvbnN0IGlzRW1wdHkgPSAoYXJyKSA9PiAhQXJyYXkuaXNBcnJheShhcnIpIHx8IGFyci5sZW5ndGggPT09IDA7XG5cbi8vIEVzY2FwZXMgcmVnZXggc3BlY2lhbCBjaGFyc1xuZXhwb3J0IGNvbnN0IGVzY2FwZVJlZ0V4cCA9IChzdHJpbmcpID0+IHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZ3UsICdcXFxcJCYnKTtcblxuLy8gU29ydHMgc3RyaW5ncyBieSBsZW5ndGgsIHNvIHRoYXQgbG9uZ2VyIG9uZXMgYXJlIGZpcnN0XG4vLyBBbHNvIHNvcnRzIGFscGhhYmV0aWNhbGx5IGFmdGVyIHNvcnRpbmcgYnkgbGVuZ3RoLlxuZXhwb3J0IGNvbnN0IHNvcnRCeUxlbmd0aERlc2MgPSAoc3RyaW5ncykgPT5cbiAgc3RyaW5ncy5zb3J0KChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGggfHwgYS5sb2NhbGVDb21wYXJlKGIpO1xuICB9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=