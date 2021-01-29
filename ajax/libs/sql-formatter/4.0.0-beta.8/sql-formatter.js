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
    this.OPERATOR_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__["createOperatorRegex"](['<>', '<=', '>='].concat(_toConsumableArray(cfg.operators || [])));
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
var reservedNewlineWords = ['AND', 'OR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN']; // For reference: https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_72/db2/rbafzintro.htm

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
        specialWordChars: ['#', '@'],
        operators: ['**', '!=', '!>', '!>', '||']
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
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard joins
'STRAIGHT_JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL RIGHT JOIN', 'NATURAL RIGHT OUTER JOIN']; // For reference: https://mariadb.com/kb/en/sql-statements-structure/

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
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard joins
'STRAIGHT_JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL RIGHT JOIN', 'NATURAL RIGHT OUTER JOIN'];

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
var reservedNewlineWords = ['AND', 'OR', 'XOR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN']; // For reference: http://docs.couchbase.com.s3-website-us-west-1.amazonaws.com/server/6.0/n1ql/n1ql-language-reference/index.html

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
        lineCommentTypes: ['#', '--'],
        operators: ['==', '!=']
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
var reservedNewlineWords = ['AND', 'CROSS APPLY', 'ELSE', 'END', 'OR', 'OUTER APPLY', 'WHEN', 'XOR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

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
        specialWordChars: ['_', '$', '#', '.', '@'],
        operators: ['||', '**', '!=', ':=']
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
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

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
        operators: ['!=', '<<', '>>', '||/', '|/', '::', '->>', '->', '~~*', '~~', '!~~*', '!~~', '~*', '!~*', '!~', '!!']
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RedshiftFormatter; });
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
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'OUTER APPLY', 'WHEN', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

var RedshiftFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(RedshiftFormatter, _Formatter);

  var _super = _createSuper(RedshiftFormatter);

  function RedshiftFormatter() {
    _classCallCheck(this, RedshiftFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(RedshiftFormatter, [{
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
        lineCommentTypes: ['--'],
        operators: ['|/', '||/', '<<', '>>', '!=', '||']
      });
    }
  }]);

  return RedshiftFormatter;
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
var reservedNewlineWords = ['AND', 'CREATE OR', 'CREATE', 'ELSE', 'LATERAL VIEW', 'OR', 'OUTER APPLY', 'WHEN', 'XOR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard-joins
'ANTI JOIN', 'SEMI JOIN', 'LEFT ANTI JOIN', 'LEFT SEMI JOIN', 'RIGHT OUTER JOIN', 'RIGHT SEMI JOIN', 'NATURAL ANTI JOIN', 'NATURAL FULL OUTER JOIN', 'NATURAL INNER JOIN', 'NATURAL LEFT ANTI JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL LEFT SEMI JOIN', 'NATURAL OUTER JOIN', 'NATURAL RIGHT OUTER JOIN', 'NATURAL RIGHT SEMI JOIN', 'NATURAL SEMI JOIN'];

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
        lineCommentTypes: ['--'],
        operators: ['!=', '<=>', '&&', '||', '==']
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


 // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word

var reservedWords = ['ABS', 'ALL', 'ALLOCATE', 'ALTER', 'AND', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASENSITIVE', 'ASYMMETRIC', 'AT', 'ATOMIC', 'AUTHORIZATION', 'AVG', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BY', 'CALL', 'CALLED', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CEIL', 'CEILING', 'CHAR', 'CHAR_LENGTH', 'CHARACTER', 'CHARACTER_LENGTH', 'CHECK', 'CLOB', 'CLOSE', 'COALESCE', 'COLLATE', 'COLLECT', 'COLUMN', 'COMMIT', 'CONDITION', 'CONNECT', 'CONSTRAINT', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DETERMINISTIC', 'DISCONNECT', 'DISTINCT', 'DOUBLE', 'DROP', 'DYNAMIC', 'EACH', 'ELEMENT', 'ELSE', 'END', 'END-EXEC', 'ESCAPE', 'EVERY', 'EXCEPT', 'EXEC', 'EXECUTE', 'EXISTS', 'EXP', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FILTER', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FROM', 'FULL', 'FUNCTION', 'FUSION', 'GET', 'GLOBAL', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'HOLD', 'HOUR', 'IDENTITY', 'IN', 'INDICATOR', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTERSECT', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LANGUAGE', 'LARGE', 'LATERAL', 'LEADING', 'LEFT', 'LIKE', 'LIKE_REGEX', 'LN', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOWER', 'MATCH', 'MAX', 'MEMBER', 'MERGE', 'METHOD', 'MIN', 'MINUTE', 'MOD', 'MODIFIES', 'MODULE', 'MONTH', 'MULTISET', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NO', 'NONE', 'NORMALIZE', 'NOT', 'NULL', 'NULLIF', 'NUMERIC', 'OCTET_LENGTH', 'OCCURRENCES_REGEX', 'OF', 'OLD', 'ON', 'ONLY', 'OPEN', 'OR', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'PARAMETER', 'PARTITION', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'POSITION', 'POSITION_REGEX', 'POWER', 'PRECISION', 'PREPARE', 'PRIMARY', 'PROCEDURE', 'RANGE', 'RANK', 'READS', 'REAL', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RESULT', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROW_NUMBER', 'ROWS', 'SAVEPOINT', 'SCOPE', 'SCROLL', 'SEARCH', 'SECOND', 'SELECT', 'SENSITIVE', 'SESSION_USER', 'SET', 'SIMILAR', 'SMALLINT', 'SOME', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'START', 'STATIC', 'STDDEV_POP', 'STDDEV_SAMP', 'SUBMULTISET', 'SUBSTRING', 'SUBSTRING_REGEX', 'SUM', 'SYMMETRIC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'UESCAPE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UPDATE', 'UPPER', 'USER', 'USING', 'VALUE', 'VALUES', 'VAR_POP', 'VAR_SAMP', 'VARBINARY', 'VARCHAR', 'VARYING', 'WHEN', 'WHENEVER', 'WHERE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'YEAR'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'FETCH FIRST', 'FETCH NEXT', 'FETCH PRIOR', 'FETCH LAST', 'FETCH ABSOLUTE', 'FETCH RELATIVE', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'LIMIT', 'ORDER BY', 'SELECT', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'INTERSECT DISTINCT', 'UNION', 'UNION ALL', 'UNION DISTINCT', 'EXCEPT', 'EXCEPT ALL', 'EXCEPT DISTINCT'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

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
        stringTypes: ["\"\"", "''"],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--']
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
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9NeVNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9UU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9zcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkZvcm1hdHRlciIsImNmZyIsImluZGVudGF0aW9uIiwiSW5kZW50YXRpb24iLCJpbmRlbnQiLCJpbmxpbmVCbG9jayIsIklubGluZUJsb2NrIiwicGFyYW1zIiwiUGFyYW1zIiwicHJldmlvdXNSZXNlcnZlZFRva2VuIiwidG9rZW5zIiwiaW5kZXgiLCJFcnJvciIsInRva2VuIiwicXVlcnkiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImZvcm1hdHRlZFF1ZXJ5IiwiZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zIiwidHJpbSIsImZvckVhY2giLCJ0b2tlbk92ZXJyaWRlIiwidHlwZSIsInRva2VuVHlwZXMiLCJMSU5FX0NPTU1FTlQiLCJmb3JtYXRMaW5lQ29tbWVudCIsIkJMT0NLX0NPTU1FTlQiLCJmb3JtYXRCbG9ja0NvbW1lbnQiLCJSRVNFUlZFRF9UT1BfTEVWRUwiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCIsIlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZE5vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORSIsImZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQiLCJSRVNFUlZFRCIsImZvcm1hdFdpdGhTcGFjZXMiLCJPUEVOX1BBUkVOIiwiZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzIiwiQ0xPU0VfUEFSRU4iLCJmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXMiLCJQTEFDRUhPTERFUiIsImZvcm1hdFBsYWNlaG9sZGVyIiwidmFsdWUiLCJmb3JtYXRDb21tYSIsImZvcm1hdFdpdGhTcGFjZUFmdGVyIiwiZm9ybWF0V2l0aG91dFNwYWNlcyIsImZvcm1hdFF1ZXJ5U2VwYXJhdG9yIiwiYWRkTmV3bGluZSIsInNob3ciLCJpbmRlbnRDb21tZW50IiwiY29tbWVudCIsInJlcGxhY2UiLCJnZXRJbmRlbnQiLCJkZWNyZWFzZVRvcExldmVsIiwiZXF1YWxpemVXaGl0ZXNwYWNlIiwiaW5jcmVhc2VUb3BMZXZlbCIsImlzQW5kIiwiaXNCZXR3ZWVuIiwidG9rZW5Mb29rQmVoaW5kIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJ3aGl0ZXNwYWNlQmVmb3JlIiwibGVuZ3RoIiwidHJpbVNwYWNlc0VuZCIsImJlZ2luSWZQb3NzaWJsZSIsImlzQWN0aXZlIiwiaW5jcmVhc2VCbG9ja0xldmVsIiwiZW5kIiwiZGVjcmVhc2VCbG9ja0xldmVsIiwiZ2V0IiwiaXNMaW1pdCIsInJlc2V0SW5kZW50YXRpb24iLCJyZXBlYXQiLCJsaW5lc0JldHdlZW5RdWVyaWVzIiwidXBwZXJjYXNlIiwidG9VcHBlckNhc2UiLCJlbmRzV2l0aCIsIm4iLCJJTkRFTlRfVFlQRV9UT1BfTEVWRUwiLCJJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCIsImluZGVudFR5cGVzIiwicHVzaCIsImxhc3QiLCJwb3AiLCJJTkxJTkVfTUFYX0xFTkdUSCIsImxldmVsIiwiaXNJbmxpbmVCbG9jayIsImkiLCJpc0ZvcmJpZGRlblRva2VuIiwiQ09NTUVOVCIsImtleSIsIlRva2VuaXplciIsIldISVRFU1BBQ0VfUkVHRVgiLCJOVU1CRVJfUkVHRVgiLCJPUEVSQVRPUl9SRUdFWCIsInJlZ2V4RmFjdG9yeSIsIm9wZXJhdG9ycyIsIkJMT0NLX0NPTU1FTlRfUkVHRVgiLCJMSU5FX0NPTU1FTlRfUkVHRVgiLCJsaW5lQ29tbWVudFR5cGVzIiwiUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCIsInJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORV9SRUdFWCIsInJlc2VydmVkTmV3bGluZVdvcmRzIiwiUkVTRVJWRURfUExBSU5fUkVHRVgiLCJyZXNlcnZlZFdvcmRzIiwiV09SRF9SRUdFWCIsInNwZWNpYWxXb3JkQ2hhcnMiLCJTVFJJTkdfUkVHRVgiLCJzdHJpbmdUeXBlcyIsIk9QRU5fUEFSRU5fUkVHRVgiLCJvcGVuUGFyZW5zIiwiQ0xPU0VfUEFSRU5fUkVHRVgiLCJjbG9zZVBhcmVucyIsIklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbmRleGVkUGxhY2Vob2xkZXJUeXBlcyIsIklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwibmFtZWRQbGFjZWhvbGRlclR5cGVzIiwiU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiaW5wdXQiLCJnZXRXaGl0ZXNwYWNlIiwic3Vic3RyaW5nIiwiZ2V0TmV4dFRva2VuIiwibWF0Y2hlcyIsIm1hdGNoIiwicHJldmlvdXNUb2tlbiIsImdldENvbW1lbnRUb2tlbiIsImdldFN0cmluZ1Rva2VuIiwiZ2V0T3BlblBhcmVuVG9rZW4iLCJnZXRDbG9zZVBhcmVuVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuIiwiZ2V0TnVtYmVyVG9rZW4iLCJnZXRSZXNlcnZlZFdvcmRUb2tlbiIsImdldFdvcmRUb2tlbiIsImdldE9wZXJhdG9yVG9rZW4iLCJnZXRMaW5lQ29tbWVudFRva2VuIiwiZ2V0QmxvY2tDb21tZW50VG9rZW4iLCJnZXRUb2tlbk9uRmlyc3RNYXRjaCIsInJlZ2V4IiwiU1RSSU5HIiwiZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5IiwicGFyc2VLZXkiLCJ2Iiwic2xpY2UiLCJnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkiLCJxdW90ZUNoYXIiLCJSZWdFeHAiLCJlc2NhcGVSZWdFeHAiLCJOVU1CRVIiLCJ1bmRlZmluZWQiLCJnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4iLCJnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbiIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50IiwiZ2V0UGxhaW5SZXNlcnZlZFRva2VuIiwiV09SRCIsImNyZWF0ZU9wZXJhdG9yUmVnZXgiLCJtdWx0aUxldHRlck9wZXJhdG9ycyIsInNvcnRCeUxlbmd0aERlc2MiLCJtYXAiLCJqb2luIiwiY3JlYXRlTGluZUNvbW1lbnRSZWdleCIsImMiLCJjcmVhdGVSZXNlcnZlZFdvcmRSZWdleCIsInJlc2VydmVkV29yZHNQYXR0ZXJuIiwiY3JlYXRlV29yZFJlZ2V4Iiwic3BlY2lhbENoYXJzIiwiY3JlYXRlU3RyaW5nUmVnZXgiLCJjcmVhdGVTdHJpbmdQYXR0ZXJuIiwicGF0dGVybnMiLCIkJCIsInQiLCJjcmVhdGVQYXJlblJlZ2V4IiwicGFyZW5zIiwiZXNjYXBlUGFyZW4iLCJwYXJlbiIsImNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgiLCJ0eXBlcyIsInBhdHRlcm4iLCJpc0VtcHR5IiwidHlwZXNSZWdleCIsImlzVG9rZW4iLCJ0ZXN0IiwiaXNTZXQiLCJpc0J5IiwiaXNXaW5kb3ciLCJpc0VuZCIsIkRiMkZvcm1hdHRlciIsIk1hcmlhRGJGb3JtYXR0ZXIiLCJNeVNxbEZvcm1hdHRlciIsIk4xcWxGb3JtYXR0ZXIiLCJQbFNxbEZvcm1hdHRlciIsIlBvc3RncmVTcWxGb3JtYXR0ZXIiLCJSZWRzaGlmdEZvcm1hdHRlciIsIlNwYXJrU3FsRm9ybWF0dGVyIiwiYWhlYWRUb2tlbiIsInRva2VuTG9va0FoZWFkIiwiYmFja1Rva2VuIiwiU3RhbmRhcmRTcWxGb3JtYXR0ZXIiLCJUU3FsRm9ybWF0dGVyIiwiZm9ybWF0dGVycyIsImRiMiIsIm1hcmlhZGIiLCJteXNxbCIsIm4xcWwiLCJwbHNxbCIsInBvc3RncmVzcWwiLCJyZWRzaGlmdCIsInNwYXJrIiwic3FsIiwidHNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Iiwic3RyaW5ncyIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxTO0FBQ25C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LENBQUNBLEdBQUcsQ0FBQy9KLE1BQUosR0FBYSxDQUFkLENBQVo7QUFBQSxDQUFiLEMsQ0FFUDs7QUFDTyxJQUFNeUgsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ3NDLEdBQUQ7QUFBQSxTQUFTLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQUQsSUFBdUJBLEdBQUcsQ0FBQy9KLE1BQUosS0FBZSxDQUEvQztBQUFBLENBQWhCLEMsQ0FFUDs7QUFDTyxJQUFNMEYsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQzlGLE1BQUQ7QUFBQSxTQUFZQSxNQUFNLENBQUNSLE9BQVAsQ0FBZSwwQkFBZixFQUF1QyxNQUF2QyxDQUFaO0FBQUEsQ0FBckIsQyxDQUVQO0FBQ0E7O0FBQ08sSUFBTWdILGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQzhELE9BQUQ7QUFBQSxTQUM5QkEsT0FBTyxDQUFDQyxJQUFSLENBQWEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDckIsV0FBT0EsQ0FBQyxDQUFDckssTUFBRixHQUFXb0ssQ0FBQyxDQUFDcEssTUFBYixJQUF1Qm9LLENBQUMsQ0FBQ0UsYUFBRixDQUFnQkQsQ0FBaEIsQ0FBOUI7QUFDRCxHQUZELENBRDhCO0FBQUEsQ0FBekIsQyIsImZpbGUiOiJzcWwtZm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic3FsRm9ybWF0dGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInNxbEZvcm1hdHRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc3FsRm9ybWF0dGVyLmpzXCIpO1xuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCBJbmRlbnRhdGlvbiBmcm9tICcuL0luZGVudGF0aW9uJztcbmltcG9ydCBJbmxpbmVCbG9jayBmcm9tICcuL0lubGluZUJsb2NrJztcbmltcG9ydCBQYXJhbXMgZnJvbSAnLi9QYXJhbXMnO1xuaW1wb3J0IHsgdHJpbVNwYWNlc0VuZCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGlzQW5kLCBpc0JldHdlZW4sIGlzTGltaXQgfSBmcm9tICcuL3Rva2VuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0dGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nfSBjZmcubGFuZ3VhZ2VcbiAgICogIEBwYXJhbSB7U3RyaW5nfSBjZmcuaW5kZW50XG4gICAqICBAcGFyYW0ge0Jvb2xlYW59IGNmZy51cHBlcmNhc2VcbiAgICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXNcbiAgICogIEBwYXJhbSB7T2JqZWN0fSBjZmcucGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZmcpIHtcbiAgICB0aGlzLmNmZyA9IGNmZztcbiAgICB0aGlzLmluZGVudGF0aW9uID0gbmV3IEluZGVudGF0aW9uKHRoaXMuY2ZnLmluZGVudCk7XG4gICAgdGhpcy5pbmxpbmVCbG9jayA9IG5ldyBJbmxpbmVCbG9jaygpO1xuICAgIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtcyh0aGlzLmNmZy5wYXJhbXMpO1xuICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0ge307XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTUUwgVG9rZW5pemVyIGZvciB0aGlzIGZvcm1hdHRlciwgcHJvdmlkZWQgYnkgc3ViY2xhc3Nlcy5cbiAgICovXG4gIHRva2VuaXplcigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rva2VuaXplcigpIG5vdCBpbXBsZW1lbnRlZCBieSBzdWJjbGFzcycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJvY2VzcyBhbmQgbW9kaWZ5IGEgdG9rZW4gYmFzZWQgb24gcGFyc2VkIGNvbnRleHQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbiBUaGUgdG9rZW4gdG8gbW9kaWZ5XG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqIEByZXR1cm4ge09iamVjdH0gbmV3IHRva2VuIG9yIHRoZSBvcmlnaW5hbFxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqL1xuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgLy8gc3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBtb2RpZnkgdG9rZW5zIGR1cmluZyBmb3JtYXR0aW5nXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgd2hpdGVzcGFjZSBpbiBhIFNRTCBzdHJpbmcgdG8gbWFrZSBpdCBlYXNpZXIgdG8gcmVhZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBTUUwgcXVlcnkgc3RyaW5nXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIHF1ZXJ5XG4gICAqL1xuICBmb3JtYXQocXVlcnkpIHtcbiAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5pemVyKCkudG9rZW5pemUocXVlcnkpO1xuICAgIGNvbnN0IGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5nZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWRRdWVyeS50cmltKCk7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWRRdWVyeUZyb21Ub2tlbnMoKSB7XG4gICAgbGV0IGZvcm1hdHRlZFF1ZXJ5ID0gJyc7XG5cbiAgICB0aGlzLnRva2Vucy5mb3JFYWNoKCh0b2tlbiwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcblxuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuT3ZlcnJpZGUodG9rZW4pO1xuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdExpbmVDb21tZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXROZXdsaW5lUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRPcGVuaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q2xvc2luZ1BhcmVudGhlc2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUExBQ0VIT0xERVIpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnLCcpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdENvbW1hKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnOicpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc7Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5O1xuICB9XG5cbiAgZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSArIHRoaXMuc2hvdyh0b2tlbikpO1xuICB9XG5cbiAgZm9ybWF0QmxvY2tDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUodGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuaW5kZW50Q29tbWVudCh0b2tlbi52YWx1ZSkpO1xuICB9XG5cbiAgaW5kZW50Q29tbWVudChjb21tZW50KSB7XG4gICAgcmV0dXJuIGNvbW1lbnQucmVwbGFjZSgvXFxuWyBcXHRdKi9ndSwgJ1xcbicgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpICsgJyAnKTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSk7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gIH1cblxuICBmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcblxuICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcblxuICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgKz0gdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSk7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gIH1cblxuICBmb3JtYXROZXdsaW5lUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIGlmIChpc0FuZCh0b2tlbikgJiYgaXNCZXR3ZWVuKHRoaXMudG9rZW5Mb29rQmVoaW5kKDIpKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgcXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRoaXMuc2hvdyh0b2tlbikpICsgJyAnO1xuICB9XG5cbiAgLy8gUmVwbGFjZSBhbnkgc2VxdWVuY2Ugb2Ygd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHdpdGggc2luZ2xlIHNwYWNlXG4gIGVxdWFsaXplV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1xccysvZ3UsICcgJyk7XG4gIH1cblxuICAvLyBPcGVuaW5nIHBhcmVudGhlc2VzIGluY3JlYXNlIHRoZSBibG9jayBpbmRlbnQgbGV2ZWwgYW5kIHN0YXJ0IGEgbmV3IGxpbmVcbiAgZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgIC8vIFRha2Ugb3V0IHRoZSBwcmVjZWRpbmcgc3BhY2UgdW5sZXNzIHRoZXJlIHdhcyB3aGl0ZXNwYWNlIHRoZXJlIGluIHRoZSBvcmlnaW5hbCBxdWVyeVxuICAgIC8vIG9yIGFub3RoZXIgb3BlbmluZyBwYXJlbnMgb3IgbGluZSBjb21tZW50XG4gICAgY29uc3QgcHJlc2VydmVXaGl0ZXNwYWNlRm9yID0ge1xuICAgICAgW3Rva2VuVHlwZXMuT1BFTl9QQVJFTl06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlRdOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuT1BFUkFUT1JdOiB0cnVlLFxuICAgIH07XG4gICAgaWYgKFxuICAgICAgdG9rZW4ud2hpdGVzcGFjZUJlZm9yZS5sZW5ndGggPT09IDAgJiZcbiAgICAgICFwcmVzZXJ2ZVdoaXRlc3BhY2VGb3JbdGhpcy50b2tlbkxvb2tCZWhpbmQoKT8udHlwZV1cbiAgICApIHtcbiAgICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgfVxuICAgIHF1ZXJ5ICs9IHRoaXMuc2hvdyh0b2tlbik7XG5cbiAgICB0aGlzLmlubGluZUJsb2NrLmJlZ2luSWZQb3NzaWJsZSh0aGlzLnRva2VucywgdGhpcy5pbmRleCk7XG5cbiAgICBpZiAoIXRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgLy8gQ2xvc2luZyBwYXJlbnRoZXNlcyBkZWNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsXG4gIGZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmlubGluZUJsb2NrLmVuZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZUJsb2NrTGV2ZWwoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHRoaXMuYWRkTmV3bGluZShxdWVyeSkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFBsYWNlaG9sZGVyKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeSArIHRoaXMucGFyYW1zLmdldCh0b2tlbikgKyAnICc7XG4gIH1cblxuICAvLyBDb21tYXMgc3RhcnQgYSBuZXcgbGluZSAodW5sZXNzIHdpdGhpbiBpbmxpbmUgcGFyZW50aGVzZXMgb3IgU1FMIFwiTElNSVRcIiBjbGF1c2UpXG4gIGZvcm1hdENvbW1hKHRva2VuLCBxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuXG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSBpZiAoaXNMaW1pdCh0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbikpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFdpdGhvdXRTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKTtcbiAgfVxuXG4gIGZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcbiAgfVxuXG4gIGZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24ucmVzZXRJbmRlbnRhdGlvbigpO1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnXFxuJy5yZXBlYXQodGhpcy5jZmcubGluZXNCZXR3ZWVuUXVlcmllcyB8fCAxKTtcbiAgfVxuXG4gIC8vIENvbnZlcnRzIHRva2VuIHRvIHN0cmluZyAodXBwZXJjYXNpbmcgaXQgaWYgbmVlZGVkKVxuICBzaG93KHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2ZnLnVwcGVyY2FzZSAmJlxuICAgICAgKHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRUQgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4gfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTilcbiAgICApIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgYWRkTmV3bGluZShxdWVyeSkge1xuICAgIHF1ZXJ5ID0gdHJpbVNwYWNlc0VuZChxdWVyeSk7XG4gICAgaWYgKCFxdWVyeS5lbmRzV2l0aCgnXFxuJykpIHtcbiAgICAgIHF1ZXJ5ICs9ICdcXG4nO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLmluZGVudGF0aW9uLmdldEluZGVudCgpO1xuICB9XG5cbiAgdG9rZW5Mb29rQmVoaW5kKG4gPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggLSBuXTtcbiAgfVxuXG4gIHRva2VuTG9va0FoZWFkKG4gPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXggKyBuXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbGFzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgSU5ERU5UX1RZUEVfVE9QX0xFVkVMID0gJ3RvcC1sZXZlbCc7XG5jb25zdCBJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCA9ICdibG9jay1sZXZlbCc7XG5cbi8qKlxuICogTWFuYWdlcyBpbmRlbnRhdGlvbiBsZXZlbHMuXG4gKlxuICogVGhlcmUgYXJlIHR3byB0eXBlcyBvZiBpbmRlbnRhdGlvbiBsZXZlbHM6XG4gKlxuICogLSBCTE9DS19MRVZFTCA6IGluY3JlYXNlZCBieSBvcGVuLXBhcmVudGhlc2lzXG4gKiAtIFRPUF9MRVZFTCA6IGluY3JlYXNlZCBieSBSRVNFUlZFRF9UT1BfTEVWRUwgd29yZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZW50YXRpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGluZGVudCBJbmRlbnQgdmFsdWUsIGRlZmF1bHQgaXMgXCIgIFwiICgyIHNwYWNlcylcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZGVudCkge1xuICAgIHRoaXMuaW5kZW50ID0gaW5kZW50IHx8ICcgICc7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudCBpbmRlbnRhdGlvbiBzdHJpbmcuXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGdldEluZGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRlbnQucmVwZWF0KHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZVRvcExldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9UT1BfTEVWRUwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKi9cbiAgaW5jcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMucHVzaChJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSB0b3AtbGV2ZWwgaW5kZW50LlxuICAgKiBEb2VzIG5vdGhpbmcgd2hlbiB0aGUgcHJldmlvdXMgaW5kZW50IGlzIG5vdCB0b3AtbGV2ZWwuXG4gICAqL1xuICBkZWNyZWFzZVRvcExldmVsKCkge1xuICAgIGlmICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDAgJiYgbGFzdCh0aGlzLmluZGVudFR5cGVzKSA9PT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICogSWYgdGhlcmUgYXJlIHRvcC1sZXZlbCBpbmRlbnRzIHdpdGhpbiB0aGUgYmxvY2stbGV2ZWwgaW5kZW50LFxuICAgKiB0aHJvd3MgYXdheSB0aGVzZSBhcyB3ZWxsLlxuICAgKi9cbiAgZGVjcmVhc2VCbG9ja0xldmVsKCkge1xuICAgIHdoaWxlICh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmluZGVudFR5cGVzLnBvcCgpO1xuICAgICAgaWYgKHR5cGUgIT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEluZGVudGF0aW9uKCkge1xuICAgIHRoaXMuaW5kZW50VHlwZXMgPSBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcblxuY29uc3QgSU5MSU5FX01BWF9MRU5HVEggPSA1MDtcblxuLyoqXG4gKiBCb29ra2VlcGVyIGZvciBpbmxpbmUgYmxvY2tzLlxuICpcbiAqIElubGluZSBibG9ja3MgYXJlIHBhcmVudGhpemVkIGV4cHJlc3Npb25zIHRoYXQgYXJlIHNob3J0ZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAqIFRoZXNlIGJsb2NrcyBhcmUgZm9ybWF0dGVkIG9uIGEgc2luZ2xlIGxpbmUsIHVubGlrZSBsb25nZXIgcGFyZW50aGl6ZWRcbiAqIGV4cHJlc3Npb25zIHdoZXJlIG9wZW4tcGFyZW50aGVzaXMgY2F1c2VzIG5ld2xpbmUgYW5kIGluY3JlYXNlIG9mIGluZGVudGF0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVCbG9jayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGV2ZWwgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyBpbmxpbmUgYmxvY2sgd2hlbiBsb29rYWhlYWQgdGhyb3VnaCB1cGNvbWluZyB0b2tlbnMgZGV0ZXJtaW5lc1xuICAgKiB0aGF0IHRoZSBibG9jayB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gICAqIEBwYXJhbSAge09iamVjdFtdfSB0b2tlbnMgQXJyYXkgb2YgYWxsIHRva2Vuc1xuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGluZGV4IEN1cnJlbnQgdG9rZW4gcG9zaXRpb25cbiAgICovXG4gIGJlZ2luSWZQb3NzaWJsZSh0b2tlbnMsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMubGV2ZWwgPT09IDAgJiYgdGhpcy5pc0lubGluZUJsb2NrKHRva2VucywgaW5kZXgpKSB7XG4gICAgICB0aGlzLmxldmVsID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICB0aGlzLmxldmVsKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBjdXJyZW50IGlubGluZSBibG9jay5cbiAgICogVGhlcmUgbWlnaHQgYmUgc2V2ZXJhbCBuZXN0ZWQgb25lcy5cbiAgICovXG4gIGVuZCgpIHtcbiAgICB0aGlzLmxldmVsLS07XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSB3aGVuIGluc2lkZSBhbiBpbmxpbmUgYmxvY2tcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmxldmVsID4gMDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgc2hvdWxkIGJlIGFuIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICAvLyBFeGFtcGxlcyBhcmUgXCJOT1coKVwiLCBcIkNPVU5UKCopXCIsIFwiaW50KDEwKVwiLCBrZXkoYHNvbWVjb2x1bW5gKSwgREVDSU1BTCg3LDIpXG4gIGlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBsZXZlbCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgbGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcblxuICAgICAgLy8gT3ZlcnJhbiBtYXggbGVuZ3RoXG4gICAgICBpZiAobGVuZ3RoID4gSU5MSU5FX01BWF9MRU5HVEgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOKSB7XG4gICAgICAgIGxldmVsKys7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwtLTtcbiAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNGb3JiaWRkZW5Ub2tlbih0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBSZXNlcnZlZCB3b3JkcyB0aGF0IGNhdXNlIG5ld2xpbmVzLCBjb21tZW50cyBhbmQgc2VtaWNvbG9uc1xuICAvLyBhcmUgbm90IGFsbG93ZWQgaW5zaWRlIGlubGluZSBwYXJlbnRoZXNlcyBibG9ja1xuICBpc0ZvcmJpZGRlblRva2VuKHsgdHlwZSwgdmFsdWUgfSkge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLkNPTU1FTlQgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCB8fFxuICAgICAgdmFsdWUgPT09ICc7J1xuICAgICk7XG4gIH1cbn1cbiIsIi8qKlxuICogSGFuZGxlcyBwbGFjZWhvbGRlciByZXBsYWNlbWVudCB3aXRoIGdpdmVuIHBhcmFtcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYW1zIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcGFyYW0gdmFsdWUgdGhhdCBtYXRjaGVzIGdpdmVuIHBsYWNlaG9sZGVyIHdpdGggcGFyYW0ga2V5LlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4ua2V5IFBsYWNlaG9sZGVyIGtleVxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi52YWx1ZSBQbGFjZWhvbGRlciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHBhcmFtIG9yIHRva2VuLnZhbHVlIHdoZW4gcGFyYW1zIGFyZSBtaXNzaW5nXG4gICAqL1xuICBnZXQoeyBrZXksIHZhbHVlIH0pIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmFtc1trZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYXJhbXNbdGhpcy5pbmRleCsrXTtcbiAgfVxufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcbmltcG9ydCAqIGFzIHJlZ2V4RmFjdG9yeSBmcm9tICcuL3JlZ2V4RmFjdG9yeSc7XG5pbXBvcnQgeyBlc2NhcGVSZWdFeHAgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuaXplciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRXb3JkcyBSZXNlcnZlZCB3b3JkcyBpbiBTUUxcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ldyBsaW5lIHNlcGFyYXRlbHlcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZE5ld2xpbmVXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3bGluZVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IFdvcmRzIHRoYXQgYXJlIHRvcCBsZXZlbCBidXQgaGF2ZSBubyBpbmRlbnRhdGlvblxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnN0cmluZ1R5cGVzIFN0cmluZyB0eXBlcyB0byBlbmFibGU6IFwiXCIsICcnLCBgYCwgW10sIE4nJ1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm9wZW5QYXJlbnMgT3BlbmluZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKCwgW1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmNsb3NlUGFyZW5zIENsb3NpbmcgcGFyZW50aGVzZXMgdG8gZW5hYmxlLCBsaWtlICksIF1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgaW5kZXhlZCBwbGFjZWhvbGRlcnMsIGxpa2UgP1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcyBQcmVmaXhlcyBmb3IgbmFtZWQgcGxhY2Vob2xkZXJzLCBsaWtlIEAgYW5kIDpcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5saW5lQ29tbWVudFR5cGVzIExpbmUgY29tbWVudHMgdG8gZW5hYmxlLCBsaWtlICMgYW5kIC0tXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3BlY2lhbFdvcmRDaGFycyBTcGVjaWFsIGNoYXJzIHRoYXQgY2FuIGJlIGZvdW5kIGluc2lkZSBvZiB3b3JkcywgbGlrZSBAIGFuZCAjXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBbY2ZnLm9wZXJhdG9yXSBBZGRpdGlvbmFsIG9wZXJhdG9ycyB0byByZWNvZ25pemVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuV0hJVEVTUEFDRV9SRUdFWCA9IC9eKFxccyspL3U7XG4gICAgdGhpcy5OVU1CRVJfUkVHRVggPSAvXigoLVxccyopP1swLTldKyhcXC5bMC05XSspPyhbZUVdLT9bMC05XSsoXFwuWzAtOV0rKT8pP3wweFswLTlhLWZBLUZdK3wwYlswMV0rKVxcYi91O1xuXG4gICAgdGhpcy5PUEVSQVRPUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVPcGVyYXRvclJlZ2V4KFtcbiAgICAgICc8PicsXG4gICAgICAnPD0nLFxuICAgICAgJz49JyxcbiAgICAgIC4uLihjZmcub3BlcmF0b3JzIHx8IFtdKSxcbiAgICBdKTtcblxuICAgIHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCA9IC9eKFxcL1xcKlteXSo/KD86XFwqXFwvfCQpKS91O1xuICAgIHRoaXMuTElORV9DT01NRU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZUxpbmVDb21tZW50UmVnZXgoY2ZnLmxpbmVDb21tZW50VHlwZXMpO1xuXG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KFxuICAgICAgY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50XG4gICAgKTtcbiAgICB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZFdvcmRzKTtcblxuICAgIHRoaXMuV09SRF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVXb3JkUmVnZXgoY2ZnLnNwZWNpYWxXb3JkQ2hhcnMpO1xuICAgIHRoaXMuU1RSSU5HX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1JlZ2V4KGNmZy5zdHJpbmdUeXBlcyk7XG5cbiAgICB0aGlzLk9QRU5fUEFSRU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGFyZW5SZWdleChjZmcub3BlblBhcmVucyk7XG4gICAgdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5jbG9zZVBhcmVucyk7XG5cbiAgICB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5pbmRleGVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgICdbMC05XSonXG4gICAgKTtcbiAgICB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1thLXpBLVowLTkuXyRdKydcbiAgICApO1xuICAgIHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgcmVnZXhGYWN0b3J5LmNyZWF0ZVN0cmluZ1BhdHRlcm4oY2ZnLnN0cmluZ1R5cGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBTUUwgc3RyaW5nIGFuZCBicmVha3MgaXQgaW50byB0b2tlbnMuXG4gICAqIEVhY2ggdG9rZW4gaXMgYW4gb2JqZWN0IHdpdGggdHlwZSBhbmQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgU1FMIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtPYmplY3RbXX0gdG9rZW5zIEFuIGFycmF5IG9mIHRva2Vucy5cbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi53aGl0ZXNwYWNlQmVmb3JlIFByZWNlZGluZyB3aGl0ZXNwYWNlXG4gICAqL1xuICB0b2tlbml6ZShpbnB1dCkge1xuICAgIGNvbnN0IHRva2VucyA9IFtdO1xuICAgIGxldCB0b2tlbjtcblxuICAgIC8vIEtlZXAgcHJvY2Vzc2luZyB0aGUgc3RyaW5nIHVudGlsIGl0IGlzIGVtcHR5XG4gICAgd2hpbGUgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgLy8gZ3JhYiBhbnkgcHJlY2VkaW5nIHdoaXRlc3BhY2VcbiAgICAgIGNvbnN0IHdoaXRlc3BhY2VCZWZvcmUgPSB0aGlzLmdldFdoaXRlc3BhY2UoaW5wdXQpO1xuICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcod2hpdGVzcGFjZUJlZm9yZS5sZW5ndGgpO1xuXG4gICAgICBpZiAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgbmV4dCB0b2tlbiBhbmQgdGhlIHRva2VuIHR5cGVcbiAgICAgICAgdG9rZW4gPSB0aGlzLmdldE5leHRUb2tlbihpbnB1dCwgdG9rZW4pO1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBzdHJpbmdcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcodG9rZW4udmFsdWUubGVuZ3RoKTtcblxuICAgICAgICB0b2tlbnMucHVzaCh7IC4uLnRva2VuLCB3aGl0ZXNwYWNlQmVmb3JlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZ2V0V2hpdGVzcGFjZShpbnB1dCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaCh0aGlzLldISVRFU1BBQ0VfUkVHRVgpO1xuICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6ICcnO1xuICB9XG5cbiAgZ2V0TmV4dFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0Q29tbWVudFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRTdHJpbmdUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB8fFxuICAgICAgdGhpcy5nZXRXb3JkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE9wZXJhdG9yVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldENvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHx8IHRoaXMuZ2V0QmxvY2tDb21tZW50VG9rZW4oaW5wdXQpO1xuICB9XG5cbiAgZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5MSU5FX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5CTE9DS19DT01NRU5ULFxuICAgICAgcmVnZXg6IHRoaXMuQkxPQ0tfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ1Rva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlNUUklORyxcbiAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9wZW5QYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRU5fUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5PUEVOX1BBUkVOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkNMT1NFX1BBUkVOLFxuICAgICAgcmVnZXg6IHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JREVOVF9OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN0cmluZ05hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PlxuICAgICAgICB0aGlzLmdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleTogdi5zbGljZSgyLCAtMSksIHF1b3RlQ2hhcjogdi5zbGljZSgtMSkgfSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT4gdi5zbGljZSgxKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHsgaW5wdXQsIHJlZ2V4LCBwYXJzZUtleSB9KSB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHJlZ2V4LCB0eXBlOiB0b2tlblR5cGVzLlBMQUNFSE9MREVSIH0pO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgdG9rZW4ua2V5ID0gcGFyc2VLZXkodG9rZW4udmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICBnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXksIHF1b3RlQ2hhciB9KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKCdcXFxcJyArIHF1b3RlQ2hhciksICdndScpLCBxdW90ZUNoYXIpO1xuICB9XG5cbiAgLy8gRGVjaW1hbCwgYmluYXJ5LCBvciBoZXggbnVtYmVyc1xuICBnZXROdW1iZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5OVU1CRVIsXG4gICAgICByZWdleDogdGhpcy5OVU1CRVJfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICAvLyBQdW5jdHVhdGlvbiBhbmQgc3ltYm9sc1xuICBnZXRPcGVyYXRvclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk9QRVJBVE9SLFxuICAgICAgcmVnZXg6IHRoaXMuT1BFUkFUT1JfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRSZXNlcnZlZFdvcmRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgIC8vIEEgcmVzZXJ2ZWQgd29yZCBjYW5ub3QgYmUgcHJlY2VkZWQgYnkgYSBcIi5cIlxuICAgIC8vIHRoaXMgbWFrZXMgaXQgc28gaW4gXCJteXRhYmxlLmZyb21cIiwgXCJmcm9tXCIgaXMgbm90IGNvbnNpZGVyZWQgYSByZXNlcnZlZCB3b3JkXG4gICAgaWYgKHByZXZpb3VzVG9rZW4gJiYgcHJldmlvdXNUb2tlbi52YWx1ZSAmJiBwcmV2aW91c1Rva2VuLnZhbHVlID09PSAnLicpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpXG4gICAgKTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FLFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50KGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfUExBSU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRXb3JkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuV09SRCxcbiAgICAgIHJlZ2V4OiB0aGlzLldPUkRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRUb2tlbk9uRmlyc3RNYXRjaCh7IGlucHV0LCB0eXBlLCByZWdleCB9KSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHJlZ2V4KTtcblxuICAgIHJldHVybiBtYXRjaGVzID8geyB0eXBlLCB2YWx1ZTogbWF0Y2hlc1sxXSB9IDogdW5kZWZpbmVkO1xuICB9XG59XG4iLCJpbXBvcnQgeyBlc2NhcGVSZWdFeHAsIGlzRW1wdHksIHNvcnRCeUxlbmd0aERlc2MgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcGVyYXRvclJlZ2V4KG11bHRpTGV0dGVyT3BlcmF0b3JzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFxuICAgIGBeKCR7c29ydEJ5TGVuZ3RoRGVzYyhtdWx0aUxldHRlck9wZXJhdG9ycykubWFwKGVzY2FwZVJlZ0V4cCkuam9pbignfCcpfXwuKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGxpbmVDb21tZW50VHlwZXMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oKD86JHtsaW5lQ29tbWVudFR5cGVzLm1hcCgoYykgPT4gZXNjYXBlUmVnRXhwKGMpKS5qb2luKCd8Jyl9KS4qPykoPzpcXHJcXG58XFxyfFxcbnwkKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXNlcnZlZFdvcmRSZWdleChyZXNlcnZlZFdvcmRzKSB7XG4gIGlmIChyZXNlcnZlZFdvcmRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeXFxiJGAsICd1Jyk7XG4gIH1cbiAgY29uc3QgcmVzZXJ2ZWRXb3Jkc1BhdHRlcm4gPSBzb3J0QnlMZW5ndGhEZXNjKHJlc2VydmVkV29yZHMpLmpvaW4oJ3wnKS5yZXBsYWNlKC8gL2d1LCAnXFxcXHMrJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKGBeKCR7cmVzZXJ2ZWRXb3Jkc1BhdHRlcm59KVxcXFxiYCwgJ2l1Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkUmVnZXgoc3BlY2lhbENoYXJzID0gW10pIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oW1xcXFxwe0FscGhhYmV0aWN9XFxcXHB7TWFya31cXFxccHtEZWNpbWFsX051bWJlcn1cXFxccHtDb25uZWN0b3JfUHVuY3R1YXRpb259XFxcXHB7Sm9pbl9Db250cm9sfSR7c3BlY2lhbENoYXJzLmpvaW4oXG4gICAgICAnJ1xuICAgICl9XSspYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1JlZ2V4KHN0cmluZ1R5cGVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSArICcpJywgJ3UnKTtcbn1cblxuLy8gVGhpcyBlbmFibGVzIHRoZSBmb2xsb3dpbmcgc3RyaW5nIHBhdHRlcm5zOlxuLy8gMS4gYmFja3RpY2sgcXVvdGVkIHN0cmluZyB1c2luZyBgYCB0byBlc2NhcGVcbi8vIDIuIHNxdWFyZSBicmFja2V0IHF1b3RlZCBzdHJpbmcgKFNRTCBTZXJ2ZXIpIHVzaW5nIF1dIHRvIGVzY2FwZVxuLy8gMy4gZG91YmxlIHF1b3RlZCBzdHJpbmcgdXNpbmcgXCJcIiBvciBcXFwiIHRvIGVzY2FwZVxuLy8gNC4gc2luZ2xlIHF1b3RlZCBzdHJpbmcgdXNpbmcgJycgb3IgXFwnIHRvIGVzY2FwZVxuLy8gNS4gbmF0aW9uYWwgY2hhcmFjdGVyIHF1b3RlZCBzdHJpbmcgdXNpbmcgTicnIG9yIE5cXCcgdG8gZXNjYXBlXG4vLyA2LiBVbmljb2RlIHNpbmdsZS1xdW90ZWQgc3RyaW5nIHVzaW5nIFxcJyB0byBlc2NhcGVcbi8vIDcuIFVuaWNvZGUgZG91YmxlLXF1b3RlZCBzdHJpbmcgdXNpbmcgXFxcIiB0byBlc2NhcGVcbi8vIDguIFBvc3RncmVTUUwgZG9sbGFyLXF1b3RlZCBzdHJpbmdzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykge1xuICBjb25zdCBwYXR0ZXJucyA9IHtcbiAgICAnYGAnOiAnKChgW15gXSooJHxgKSkrKScsXG4gICAgJ3t9JzogJygoXFxcXHtbXlxcXFx9XSooJHxcXFxcfSkpKyknLFxuICAgICdbXSc6ICcoKFxcXFxbW15cXFxcXV0qKCR8XFxcXF0pKShcXFxcXVteXFxcXF1dKigkfFxcXFxdKSkqKScsXG4gICAgJ1wiXCInOiAnKChcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgXCInJ1wiOiBcIigoJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIFwiTicnXCI6IFwiKChOJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgIFwiVSYnJ1wiOiBcIigoVSYnW14nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgJ1UmXCJcIic6ICcoKFUmXCJbXlwiXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteXCJcXFxcXFxcXF0qKSooXCJ8JCkpKyknLFxuICAgICQkOiAnKCg/PHRhZz5cXFxcJFxcXFx3KlxcXFwkKVtcXFxcc1xcXFxTXSo/KD86XFxcXGs8dGFnPnwkKSknLFxuICB9O1xuXG4gIHJldHVybiBzdHJpbmdUeXBlcy5tYXAoKHQpID0+IHBhdHRlcm5zW3RdKS5qb2luKCd8Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXJlblJlZ2V4KHBhcmVucykge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnXignICsgcGFyZW5zLm1hcChlc2NhcGVQYXJlbikuam9pbignfCcpICsgJyknLCAnaXUnKTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlUGFyZW4ocGFyZW4pIHtcbiAgaWYgKHBhcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIEEgc2luZ2xlIHB1bmN0dWF0aW9uIGNoYXJhY3RlclxuICAgIHJldHVybiBlc2NhcGVSZWdFeHAocGFyZW4pO1xuICB9IGVsc2Uge1xuICAgIC8vIGxvbmdlciB3b3JkXG4gICAgcmV0dXJuICdcXFxcYicgKyBwYXJlbiArICdcXFxcYic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgodHlwZXMsIHBhdHRlcm4pIHtcbiAgaWYgKGlzRW1wdHkodHlwZXMpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHR5cGVzUmVnZXggPSB0eXBlcy5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCd8Jyk7XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4oKD86JHt0eXBlc1JlZ2V4fSkoPzoke3BhdHRlcm59KSlgLCAndScpO1xufVxuIiwiaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi90b2tlblR5cGVzJztcblxuY29uc3QgaXNUb2tlbiA9ICh0eXBlLCByZWdleCkgPT4gKHRva2VuKSA9PiB0b2tlbj8udHlwZSA9PT0gdHlwZSAmJiByZWdleC50ZXN0KHRva2VuPy52YWx1ZSk7XG5cbmV4cG9ydCBjb25zdCBpc0FuZCA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FLCAvXkFORCQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNCZXR3ZWVuID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVELCAvXkJFVFdFRU4kL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzTGltaXQgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMLCAvXkxJTUlUJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc1NldCA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsIC9eU0VUJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0J5ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVELCAvXkJZJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc1dpbmRvdyA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsIC9eV0lORE9XJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0VuZCA9IGlzVG9rZW4odG9rZW5UeXBlcy5DTE9TRV9QQVJFTiwgL15FTkQkL2l1KTtcbiIsIi8qKlxuICogQ29uc3RhbnRzIGZvciB0b2tlbiB0eXBlc1xuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIFdPUkQ6ICd3b3JkJyxcbiAgU1RSSU5HOiAnc3RyaW5nJyxcbiAgUkVTRVJWRUQ6ICdyZXNlcnZlZCcsXG4gIFJFU0VSVkVEX1RPUF9MRVZFTDogJ3Jlc2VydmVkLXRvcC1sZXZlbCcsXG4gIFJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQ6ICdyZXNlcnZlZC10b3AtbGV2ZWwtbm8taW5kZW50JyxcbiAgUkVTRVJWRURfTkVXTElORTogJ3Jlc2VydmVkLW5ld2xpbmUnLFxuICBPUEVSQVRPUjogJ29wZXJhdG9yJyxcbiAgT1BFTl9QQVJFTjogJ29wZW4tcGFyZW4nLFxuICBDTE9TRV9QQVJFTjogJ2Nsb3NlLXBhcmVuJyxcbiAgTElORV9DT01NRU5UOiAnbGluZS1jb21tZW50JyxcbiAgQkxPQ0tfQ09NTUVOVDogJ2Jsb2NrLWNvbW1lbnQnLFxuICBOVU1CRVI6ICdudW1iZXInLFxuICBQTEFDRUhPTERFUjogJ3BsYWNlaG9sZGVyJyxcbn07XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUJTJyxcbiAgJ0FDVElWQVRFJyxcbiAgJ0FMSUFTJyxcbiAgJ0FMTCcsXG4gICdBTExPQ0FURScsXG4gICdBTExPVycsXG4gICdBTFRFUicsXG4gICdBTlknLFxuICAnQVJFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU0VOU0lUSVZFJyxcbiAgJ0FTU09DSUFURScsXG4gICdBU1VUSU1FJyxcbiAgJ0FTWU1NRVRSSUMnLFxuICAnQVQnLFxuICAnQVRPTUlDJyxcbiAgJ0FUVFJJQlVURVMnLFxuICAnQVVESVQnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdBVVgnLFxuICAnQVVYSUxJQVJZJyxcbiAgJ0FWRycsXG4gICdCRUZPUkUnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JVRkZFUlBPT0wnLFxuICAnQlknLFxuICAnQ0FDSEUnLFxuICAnQ0FMTCcsXG4gICdDQUxMRUQnLFxuICAnQ0FQVFVSRScsXG4gICdDQVJESU5BTElUWScsXG4gICdDQVNDQURFRCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0NTSUQnLFxuICAnQ0VJTCcsXG4gICdDRUlMSU5HJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJBQ1RFUl9MRU5HVEgnLFxuICAnQ0hBUl9MRU5HVEgnLFxuICAnQ0hFQ0snLFxuICAnQ0xPQicsXG4gICdDTE9ORScsXG4gICdDTE9TRScsXG4gICdDTFVTVEVSJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xMRUNUSU9OJyxcbiAgJ0NPTExJRCcsXG4gICdDT0xVTU4nLFxuICAnQ09NTUVOVCcsXG4gICdDT01NSVQnLFxuICAnQ09OQ0FUJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05ORUNUJyxcbiAgJ0NPTk5FQ1RJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NPUlInLFxuICAnQ09SUkVTUE9ORElORycsXG4gICdDT1VOVCcsXG4gICdDT1VOVF9CSUcnLFxuICAnQ09WQVJfUE9QJyxcbiAgJ0NPVkFSX1NBTVAnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVQkUnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfREVGQVVMVF9UUkFOU0ZPUk1fR1JPVVAnLFxuICAnQ1VSUkVOVF9MQ19DVFlQRScsXG4gICdDVVJSRU5UX1BBVEgnLFxuICAnQ1VSUkVOVF9ST0xFJyxcbiAgJ0NVUlJFTlRfU0NIRU1BJyxcbiAgJ0NVUlJFTlRfU0VSVkVSJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1RJTUVaT05FJyxcbiAgJ0NVUlJFTlRfVFJBTlNGT1JNX0dST1VQX0ZPUl9UWVBFJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFUQScsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBUEFSVElUSU9OTkFNRScsXG4gICdEQVRBUEFSVElUSU9OTlVNJyxcbiAgJ0RBVEUnLFxuICAnREFZJyxcbiAgJ0RBWVMnLFxuICAnREIyR0VORVJBTCcsXG4gICdEQjJHRU5STCcsXG4gICdEQjJTUUwnLFxuICAnREJJTkZPJyxcbiAgJ0RCUEFSVElUSU9OTkFNRScsXG4gICdEQlBBUlRJVElPTk5VTScsXG4gICdERUFMTE9DQVRFJyxcbiAgJ0RFQycsXG4gICdERUNJTUFMJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVGQVVMVCcsXG4gICdERUZBVUxUUycsXG4gICdERUZJTklUSU9OJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRVJBTksnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVJFRicsXG4gICdERVNDUklCRScsXG4gICdERVNDUklQVE9SJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElBR05PU1RJQ1MnLFxuICAnRElTQUJMRScsXG4gICdESVNBTExPVycsXG4gICdESVNDT05ORUNUJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPQ1VNRU5UJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RTU0laRScsXG4gICdEWU5BTUlDJyxcbiAgJ0VBQ0gnLFxuICAnRURJVFBST0MnLFxuICAnRUxFTUVOVCcsXG4gICdFTFNFJyxcbiAgJ0VMU0VJRicsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVElPTicsXG4gICdFTkQnLFxuICAnRU5ELUVYRUMnLFxuICAnRU5ESU5HJyxcbiAgJ0VSQVNFJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVSWScsXG4gICdFWENFUFRJT04nLFxuICAnRVhDTFVESU5HJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhQJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhURU5ERUQnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRU5DRUQnLFxuICAnRkVUQ0gnLFxuICAnRklFTERQUk9DJyxcbiAgJ0ZJTEUnLFxuICAnRklMVEVSJyxcbiAgJ0ZJTkFMJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT09SJyxcbiAgJ0ZPUicsXG4gICdGT1JFSUdOJyxcbiAgJ0ZSRUUnLFxuICAnRlVMTCcsXG4gICdGVU5DVElPTicsXG4gICdGVVNJT04nLFxuICAnR0VORVJBTCcsXG4gICdHRU5FUkFURUQnLFxuICAnR0VUJyxcbiAgJ0dMT0JBTCcsXG4gICdHT1RPJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQVBISUMnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnSEFORExFUicsXG4gICdIQVNIJyxcbiAgJ0hBU0hFRF9WQUxVRScsXG4gICdISU5UJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdIT1VSUycsXG4gICdJREVOVElUWScsXG4gICdJRicsXG4gICdJTU1FRElBVEUnLFxuICAnSU4nLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOQ0xVU0lWRScsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5ESUNBVE9SJyxcbiAgJ0lORElDQVRPUlMnLFxuICAnSU5GJyxcbiAgJ0lORklOSVRZJyxcbiAgJ0lOSEVSSVQnLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVHUklUWScsXG4gICdJTlRFUlNFQ1RJT04nLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdJU09CSUQnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0lURVJBVEUnLFxuICAnSkFSJyxcbiAgJ0pBVkEnLFxuICAnS0VFUCcsXG4gICdLRVknLFxuICAnTEFCRUwnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEFURVJBTCcsXG4gICdMQ19DVFlQRScsXG4gICdMRUFESU5HJyxcbiAgJ0xFQVZFJyxcbiAgJ0xFRlQnLFxuICAnTElLRScsXG4gICdMSU5LVFlQRScsXG4gICdMTicsXG4gICdMT0NBTCcsXG4gICdMT0NBTERBVEUnLFxuICAnTE9DQUxFJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NBVE9SJyxcbiAgJ0xPQ0FUT1JTJyxcbiAgJ0xPQ0snLFxuICAnTE9DS01BWCcsXG4gICdMT0NLU0laRScsXG4gICdMT05HJyxcbiAgJ0xPT1AnLFxuICAnTE9XRVInLFxuICAnTUFJTlRBSU5FRCcsXG4gICdNQVRDSCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUFYJyxcbiAgJ01BWFZBTFVFJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNRVRIT0QnLFxuICAnTUlDUk9TRUNPTkQnLFxuICAnTUlDUk9TRUNPTkRTJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTUlOVVRFUycsXG4gICdNSU5WQUxVRScsXG4gICdNT0QnLFxuICAnTU9ERScsXG4gICdNT0RJRklFUycsXG4gICdNT0RVTEUnLFxuICAnTU9OVEgnLFxuICAnTU9OVEhTJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BTicsXG4gICdOQVRJT05BTCcsXG4gICdOQVRVUkFMJyxcbiAgJ05DSEFSJyxcbiAgJ05DTE9CJyxcbiAgJ05FVycsXG4gICdORVdfVEFCTEUnLFxuICAnTkVYVFZBTCcsXG4gICdOTycsXG4gICdOT0NBQ0hFJyxcbiAgJ05PQ1lDTEUnLFxuICAnTk9ERU5BTUUnLFxuICAnTk9ERU5VTUJFUicsXG4gICdOT01BWFZBTFVFJyxcbiAgJ05PTUlOVkFMVUUnLFxuICAnTk9ORScsXG4gICdOT09SREVSJyxcbiAgJ05PUk1BTElaRScsXG4gICdOT1JNQUxJWkVEJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVUxMUycsXG4gICdOVU1FUklDJyxcbiAgJ05VTVBBUlRTJyxcbiAgJ09CSUQnLFxuICAnT0NURVRfTEVOR1RIJyxcbiAgJ09GJyxcbiAgJ09GRlNFVCcsXG4gICdPTEQnLFxuICAnT0xEX1RBQkxFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUFRJTUlaQVRJT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU9OJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnT1ZFUlJJRElORycsXG4gICdQQUNLQUdFJyxcbiAgJ1BBRERFRCcsXG4gICdQQUdFU0laRScsXG4gICdQQVJBTUVURVInLFxuICAnUEFSVCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFSVElUSU9ORUQnLFxuICAnUEFSVElUSU9OSU5HJyxcbiAgJ1BBUlRJVElPTlMnLFxuICAnUEFTU1dPUkQnLFxuICAnUEFUSCcsXG4gICdQRVJDRU5USUxFX0NPTlQnLFxuICAnUEVSQ0VOVElMRV9ESVNDJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQSUVDRVNJWkUnLFxuICAnUExBTicsXG4gICdQT1NJVElPTicsXG4gICdQT1dFUicsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUkVWVkFMJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJUVRZJyxcbiAgJ1BSSVZJTEVHRVMnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BST0dSQU0nLFxuICAnUFNJRCcsXG4gICdQVUJMSUMnLFxuICAnUVVFUlknLFxuICAnUVVFUllOTycsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFQUQnLFxuICAnUkVBRFMnLFxuICAnUkVBTCcsXG4gICdSRUNPVkVSWScsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVGRVJFTkNJTkcnLFxuICAnUkVGUkVTSCcsXG4gICdSRUdSX0FWR1gnLFxuICAnUkVHUl9BVkdZJyxcbiAgJ1JFR1JfQ09VTlQnLFxuICAnUkVHUl9JTlRFUkNFUFQnLFxuICAnUkVHUl9SMicsXG4gICdSRUdSX1NMT1BFJyxcbiAgJ1JFR1JfU1hYJyxcbiAgJ1JFR1JfU1hZJyxcbiAgJ1JFR1JfU1lZJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVCcsXG4gICdSRVNFVCcsXG4gICdSRVNJR05BTCcsXG4gICdSRVNUQVJUJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFU1VMVCcsXG4gICdSRVNVTFRfU0VUX0xPQ0FUT1InLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9MTFVQJyxcbiAgJ1JPVU5EX0NFSUxJTkcnLFxuICAnUk9VTkRfRE9XTicsXG4gICdST1VORF9GTE9PUicsXG4gICdST1VORF9IQUxGX0RPV04nLFxuICAnUk9VTkRfSEFMRl9FVkVOJyxcbiAgJ1JPVU5EX0hBTEZfVVAnLFxuICAnUk9VTkRfVVAnLFxuICAnUk9VVElORScsXG4gICdST1cnLFxuICAnUk9XTlVNQkVSJyxcbiAgJ1JPV1MnLFxuICAnUk9XU0VUJyxcbiAgJ1JPV19OVU1CRVInLFxuICAnUlJOJyxcbiAgJ1JVTicsXG4gICdTQVZFUE9JTlQnLFxuICAnU0NIRU1BJyxcbiAgJ1NDT1BFJyxcbiAgJ1NDUkFUQ0hQQUQnLFxuICAnU0NST0xMJyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VDT05EUycsXG4gICdTRUNRVFknLFxuICAnU0VDVVJJVFknLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NFU1NJT04nLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NJR05BTCcsXG4gICdTSU1JTEFSJyxcbiAgJ1NJTVBMRScsXG4gICdTTUFMTElOVCcsXG4gICdTTkFOJyxcbiAgJ1NPTUUnLFxuICAnU09VUkNFJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NQRUNJRklDVFlQRScsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTElEJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FSVCcsXG4gICdTVEFDS0VEJyxcbiAgJ1NUQU5EQVJEJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUQVRFTUVOVCcsXG4gICdTVEFUSUMnLFxuICAnU1RBVE1FTlQnLFxuICAnU1RBWScsXG4gICdTVERERVZfUE9QJyxcbiAgJ1NURERFVl9TQU1QJyxcbiAgJ1NUT0dST1VQJyxcbiAgJ1NUT1JFUycsXG4gICdTVFlMRScsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VNJyxcbiAgJ1NVTU1BUlknLFxuICAnU1lNTUVUUklDJyxcbiAgJ1NZTk9OWU0nLFxuICAnU1lTRlVOJyxcbiAgJ1NZU0lCTScsXG4gICdTWVNQUk9DJyxcbiAgJ1NZU1RFTScsXG4gICdTWVNURU1fVVNFUicsXG4gICdUQUJMRScsXG4gICdUQUJMRVNBTVBMRScsXG4gICdUQUJMRVNQQUNFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNMQVRFJyxcbiAgJ1RSQU5TTEFUSU9OJyxcbiAgJ1RSRUFUJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJJTScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVUVTQ0FQRScsXG4gICdVTkRPJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVTlRJTCcsXG4gICdVUFBFUicsXG4gICdVU0FHRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEUFJPQycsXG4gICdWQUxVRScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUklBQkxFJyxcbiAgJ1ZBUklBTlQnLFxuICAnVkFSWUlORycsXG4gICdWQVJfUE9QJyxcbiAgJ1ZBUl9TQU1QJyxcbiAgJ1ZDQVQnLFxuICAnVkVSU0lPTicsXG4gICdWSUVXJyxcbiAgJ1ZPTEFUSUxFJyxcbiAgJ1ZPTFVNRVMnLFxuICAnV0hFTicsXG4gICdXSEVORVZFUicsXG4gICdXSElMRScsXG4gICdXSURUSF9CVUNLRVQnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dJVEhPVVQnLFxuICAnV0xNJyxcbiAgJ1dSSVRFJyxcbiAgJ1hNTEVMRU1FTlQnLFxuICAnWE1MRVhJU1RTJyxcbiAgJ1hNTE5BTUVTUEFDRVMnLFxuICAnWUVBUicsXG4gICdZRUFSUycsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0dPJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlRFUlNFQ1QnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnT1InLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuXTtcblxuLy8gRm9yIHJlZmVyZW5jZTogaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9lbi9zc3dfaWJtX2lfNzIvZGIyL3JiYWZ6aW50cm8uaHRtXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYjJGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnLCAnW10nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKSddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnIycsICdAJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnKionLCAnIT0nLCAnIT4nLCAnIT4nLCAnfHwnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUREJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNFTlNJVElWRScsXG4gICdCRUZPUkUnLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFOR0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JQ1JPU0VDT05EJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMQVlFRCcsXG4gICdERUxFVEUnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdET19ET01BSU5fSURTJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVQUwnLFxuICAnRUFDSCcsXG4gICdFTFNFJyxcbiAgJ0VMU0VJRicsXG4gICdFTkNMT1NFRCcsXG4gICdFU0NBUEVEJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT0FUNCcsXG4gICdGTE9BVDgnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJPTScsXG4gICdGVUxMVEVYVCcsXG4gICdHRU5FUkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBVklORycsXG4gICdISUdIX1BSSU9SSVRZJyxcbiAgJ0hPVVJfTUlDUk9TRUNPTkQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lHTk9SRV9ET01BSU5fSURTJyxcbiAgJ0lHTk9SRV9TRVJWRVJfSURTJyxcbiAgJ0lOJyxcbiAgJ0lOREVYJyxcbiAgJ0lORklMRScsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVDEnLFxuICAnSU5UMicsXG4gICdJTlQzJyxcbiAgJ0lOVDQnLFxuICAnSU5UOCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lURVJBVEUnLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJTkVBUicsXG4gICdMSU5FUycsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTE9OR0JMT0InLFxuICAnTE9OR1RFWFQnLFxuICAnTE9PUCcsXG4gICdMT1dfUFJJT1JJVFknLFxuICAnTUFTVEVSX0hFQVJUQkVBVF9QRVJJT0QnLFxuICAnTUFTVEVSX1NTTF9WRVJJRllfU0VSVkVSX0NFUlQnLFxuICAnTUFUQ0gnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVESVVNQkxPQicsXG4gICdNRURJVU1JTlQnLFxuICAnTUVESVVNVEVYVCcsXG4gICdNSURETEVJTlQnLFxuICAnTUlOVVRFX01JQ1JPU0VDT05EJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTU9EJyxcbiAgJ01PRElGSUVTJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PX1dSSVRFX1RPX0JJTkxPRycsXG4gICdOVUxMJyxcbiAgJ05VTUVSSUMnLFxuICAnT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTkFMTFknLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09VVEZJTEUnLFxuICAnT1ZFUicsXG4gICdQQUdFX0NIRUNLU1VNJyxcbiAgJ1BBUlNFX1ZDT0xfRVhQUicsXG4gICdQQVJUSVRJT04nLFxuICAnUE9TSVRJT04nLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVUkdFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBRFMnLFxuICAnUkVBRF9XUklURScsXG4gICdSRUFMJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUZfU1lTVEVNX0lEJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVCcsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUVVJUkUnLFxuICAnUkVTSUdOQUwnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUkxJS0UnLFxuICAnUk9XUycsXG4gICdTQ0hFTUEnLFxuICAnU0NIRU1BUycsXG4gICdTRUNPTkRfTUlDUk9TRUNPTkQnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU0lHTkFMJyxcbiAgJ1NMT1cnLFxuICAnU01BTExJTlQnLFxuICAnU1BBVElBTCcsXG4gICdTUEVDSUZJQycsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FMX0JJR19SRVNVTFQnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NTTCcsXG4gICdTVEFSVElORycsXG4gICdTVEFUU19BVVRPX1JFQ0FMQycsXG4gICdTVEFUU19QRVJTSVNURU5UJyxcbiAgJ1NUQVRTX1NBTVBMRV9QQUdFUycsXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ1RBQkxFJyxcbiAgJ1RFUk1JTkFURUQnLFxuICAnVEhFTicsXG4gICdUSU5ZQkxPQicsXG4gICdUSU5ZSU5UJyxcbiAgJ1RJTllURVhUJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdVTkRPJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVBEQVRFJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRScsXG4gICdVU0lORycsXG4gICdVVENfREFURScsXG4gICdVVENfVElNRScsXG4gICdVVENfVElNRVNUQU1QJyxcbiAgJ1ZBTFVFUycsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSQUNURVInLFxuICAnVkFSWUlORycsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dSSVRFJyxcbiAgJ1hPUicsXG4gICdZRUFSX01PTlRIJyxcbiAgJ1pFUk9GSUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbiAgLy8gbm9uLXN0YW5kYXJkIGpvaW5zXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuXTtcblxuLy8gRm9yIHJlZmVyZW5jZTogaHR0cHM6Ly9tYXJpYWRiLmNvbS9rYi9lbi9zcWwtc3RhdGVtZW50cy1zdHJ1Y3R1cmUvXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJpYURiRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFsnYGAnLCBcIicnXCIsICdcIlwiJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJywgJyMnXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbJzo9JywgJzw8JywgJz4+JywgJyE9JywgJzw+JywgJzw9PicsICcmJicsICd8fCddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUNDRVNTSUJMRScsXG4gICdBREQnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU0VOU0lUSVZFJyxcbiAgJ0JFRk9SRScsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQU5HRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEVDSycsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTFVNTicsXG4gICdDT05ESVRJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVUJFJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSUNST1NFQ09ORCcsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEFZRUQnLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEVUFMJyxcbiAgJ0VBQ0gnLFxuICAnRUxTRScsXG4gICdFTFNFSUYnLFxuICAnRU1QVFknLFxuICAnRU5DTE9TRUQnLFxuICAnRVNDQVBFRCcsXG4gICdFWENFUFQnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhQTEFJTicsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSVJTVF9WQUxVRScsXG4gICdGTE9BVCcsXG4gICdGTE9BVDQnLFxuICAnRkxPQVQ4JyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZST00nLFxuICAnRlVMTFRFWFQnLFxuICAnRlVOQ1RJT04nLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dFVCcsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdHUk9VUFMnLFxuICAnSEFWSU5HJyxcbiAgJ0hJR0hfUFJJT1JJVFknLFxuICAnSE9VUl9NSUNST1NFQ09ORCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdJRicsXG4gICdJR05PUkUnLFxuICAnSU4nLFxuICAnSU5ERVgnLFxuICAnSU5GSUxFJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlQnLFxuICAnSU5UMScsXG4gICdJTlQyJyxcbiAgJ0lOVDMnLFxuICAnSU5UNCcsXG4gICdJTlQ4JyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJT19BRlRFUl9HVElEUycsXG4gICdJT19CRUZPUkVfR1RJRFMnLFxuICAnSVMnLFxuICAnSVRFUkFURScsXG4gICdKT0lOJyxcbiAgJ0pTT05fVEFCTEUnLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0lMTCcsXG4gICdMQUcnLFxuICAnTEFTVF9WQUxVRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xFQUQnLFxuICAnTEVBRElORycsXG4gICdMRUFWRScsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTElORUFSJyxcbiAgJ0xJTkVTJyxcbiAgJ0xPQUQnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0snLFxuICAnTE9ORycsXG4gICdMT05HQkxPQicsXG4gICdMT05HVEVYVCcsXG4gICdMT09QJyxcbiAgJ0xPV19QUklPUklUWScsXG4gICdNQVNURVJfQklORCcsXG4gICdNQVNURVJfU1NMX1ZFUklGWV9TRVJWRVJfQ0VSVCcsXG4gICdNQVRDSCcsXG4gICdNQVhWQUxVRScsXG4gICdNRURJVU1CTE9CJyxcbiAgJ01FRElVTUlOVCcsXG4gICdNRURJVU1URVhUJyxcbiAgJ01JRERMRUlOVCcsXG4gICdNSU5VVEVfTUlDUk9TRUNPTkQnLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNT0QnLFxuICAnTU9ESUZJRVMnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9fV1JJVEVfVE9fQklOTE9HJyxcbiAgJ05USF9WQUxVRScsXG4gICdOVElMRScsXG4gICdOVUxMJyxcbiAgJ05VTUVSSUMnLFxuICAnT0YnLFxuICAnT04nLFxuICAnT1BUSU1JWkUnLFxuICAnT1BUSU1JWkVSX0NPU1RTJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05BTExZJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVVRGSUxFJyxcbiAgJ09WRVInLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQUkVDSVNJT04nLFxuICAnUFJJTUFSWScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVSR0UnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUFEJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQURfV1JJVEUnLFxuICAnUkVBTCcsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUdFWFAnLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVRVUlSRScsXG4gICdSRVNJR05BTCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk4nLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JPV19OVU1CRVInLFxuICAnU0NIRU1BJyxcbiAgJ1NDSEVNQVMnLFxuICAnU0VDT05EX01JQ1JPU0VDT05EJyxcbiAgJ1NFTEVDVCcsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFVCcsXG4gICdTSE9XJyxcbiAgJ1NJR05BTCcsXG4gICdTTUFMTElOVCcsXG4gICdTUEFUSUFMJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUUxfQklHX1JFU1VMVCcsXG4gICdTUUxfQ0FMQ19GT1VORF9ST1dTJyxcbiAgJ1NRTF9TTUFMTF9SRVNVTFQnLFxuICAnU1NMJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUT1JFRCcsXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdURVJNSU5BVEVEJyxcbiAgJ1RIRU4nLFxuICAnVElOWUJMT0InLFxuICAnVElOWUlOVCcsXG4gICdUSU5ZVEVYVCcsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVU5ETycsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VQREFURScsXG4gICdVU0FHRScsXG4gICdVU0UnLFxuICAnVVNJTkcnLFxuICAnVVRDX0RBVEUnLFxuICAnVVRDX1RJTUUnLFxuICAnVVRDX1RJTUVTVEFNUCcsXG4gICdWQUxVRVMnLFxuICAnVkFSQklOQVJZJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSQ0hBUkFDVEVSJyxcbiAgJ1ZBUllJTkcnLFxuICAnVklSVFVBTCcsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dSSVRFJyxcbiAgJ1hPUicsXG4gICdZRUFSX01PTlRIJyxcbiAgJ1pFUk9GSUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbiAgLy8gbm9uLXN0YW5kYXJkIGpvaW5zXG4gICdTVFJBSUdIVF9KT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogWydgYCcsIFwiJydcIiwgJ1wiXCInXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nLCAnIyddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWydAJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnOj0nLCAnPDwnLCAnPj4nLCAnIT0nLCAnPD4nLCAnPD0+JywgJyYmJywgJ3x8JywgJy0+JywgJy0+PiddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSU5BUlknLFxuICAnQk9PTEVBTicsXG4gICdCUkVBSycsXG4gICdCVUNLRVQnLFxuICAnQlVJTEQnLFxuICAnQlknLFxuICAnQ0FMTCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0xVU1RFUicsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09NTUlUJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OVElOVUUnLFxuICAnQ09SUkVMQVRFJyxcbiAgJ0NPVkVSJyxcbiAgJ0NSRUFURScsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBU0VUJyxcbiAgJ0RBVEFTVE9SRScsXG4gICdERUNMQVJFJyxcbiAgJ0RFQ1JFTUVOVCcsXG4gICdERUxFVEUnLFxuICAnREVSSVZFRCcsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RST1AnLFxuICAnRUFDSCcsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENMVURFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklSU1QnLFxuICAnRkxBVFRFTicsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRlJPTScsXG4gICdGVU5DVElPTicsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdHU0knLFxuICAnSEFWSU5HJyxcbiAgJ0lGJyxcbiAgJ0lHTk9SRScsXG4gICdJTElLRScsXG4gICdJTicsXG4gICdJTkNMVURFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkZFUicsXG4gICdJTkxJTkUnLFxuICAnSU5ORVInLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0pPSU4nLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0VZU1BBQ0UnLFxuICAnS05PV04nLFxuICAnTEFTVCcsXG4gICdMRUZUJyxcbiAgJ0xFVCcsXG4gICdMRVRUSU5HJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTFNNJyxcbiAgJ01BUCcsXG4gICdNQVBQSU5HJyxcbiAgJ01BVENIRUQnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01FUkdFJyxcbiAgJ01JU1NJTkcnLFxuICAnTkFNRVNQQUNFJyxcbiAgJ05FU1QnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVNQkVSJyxcbiAgJ09CSkVDVCcsXG4gICdPRkZTRVQnLFxuICAnT04nLFxuICAnT1BUSU9OJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnUEFSU0UnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BBVEgnLFxuICAnUE9PTCcsXG4gICdQUkVQQVJFJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJVkFURScsXG4gICdQUklWSUxFR0UnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVQkxJQycsXG4gICdSQVcnLFxuICAnUkVBTE0nLFxuICAnUkVEVUNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1NBVElTRklFUycsXG4gICdTQ0hFTUEnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTEYnLFxuICAnU0VNSScsXG4gICdTRVQnLFxuICAnU0hPVycsXG4gICdTT01FJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRJU1RJQ1MnLFxuICAnU1RSSU5HJyxcbiAgJ1NZU1RFTScsXG4gICdUSEVOJyxcbiAgJ1RPJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdVTkRFUicsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTk5FU1QnLFxuICAnVU5TRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1VQU0VSVCcsXG4gICdVU0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJREFURScsXG4gICdWQUxVRScsXG4gICdWQUxVRUQnLFxuICAnVkFMVUVTJyxcbiAgJ1ZJQScsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJTEUnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV09SSycsXG4gICdYT1InLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnRVhQTEFJTiBERUxFVEUgRlJPTScsXG4gICdFWFBMQUlOIFVQREFURScsXG4gICdFWFBMQUlOIFVQU0VSVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTkZFUicsXG4gICdJTlNFUlQgSU5UTycsXG4gICdMRVQnLFxuICAnTElNSVQnLFxuICAnTUVSR0UnLFxuICAnTkVTVCcsXG4gICdPUkRFUiBCWScsXG4gICdQUkVQQVJFJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVU5ORVNUJyxcbiAgJ1VQREFURScsXG4gICdVUFNFUlQnLFxuICAnVVNFIEtFWVMnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnT1InLFxuICAnWE9SJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG5dO1xuXG4vLyBGb3IgcmVmZXJlbmNlOiBodHRwOi8vZG9jcy5jb3VjaGJhc2UuY29tLnMzLXdlYnNpdGUtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc2VydmVyLzYuMC9uMXFsL24xcWwtbGFuZ3VhZ2UtcmVmZXJlbmNlL2luZGV4Lmh0bWxcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE4xcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdbJywgJ3snXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnXScsICd9J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWycjJywgJy0tJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnPT0nLCAnIT0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgeyBpc0J5LCBpc1NldCB9IGZyb20gJy4uL2NvcmUvdG9rZW4nO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5pbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuLi9jb3JlL3Rva2VuVHlwZXMnO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQScsXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FHRU5UJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVCcsXG4gICdBVFRSSUJVVEUnLFxuICAnQVVUSElEJyxcbiAgJ0FWRycsXG4gICdCRVRXRUVOJyxcbiAgJ0JGSUxFX0JBU0UnLFxuICAnQklOQVJZX0lOVEVHRVInLFxuICAnQklOQVJZJyxcbiAgJ0JMT0JfQkFTRScsXG4gICdCTE9DSycsXG4gICdCT0RZJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCT1VORCcsXG4gICdCUkVBRFRIJyxcbiAgJ0JVTEsnLFxuICAnQlknLFxuICAnQllURScsXG4gICdDJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTElORycsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0UnLFxuICAnQ0hBUl9CQVNFJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJTRVQnLFxuICAnQ0hBUlNFVEZPUk0nLFxuICAnQ0hBUlNFVElEJyxcbiAgJ0NIRUNLJyxcbiAgJ0NMT0JfQkFTRScsXG4gICdDTE9ORScsXG4gICdDTE9TRScsXG4gICdDTFVTVEVSJyxcbiAgJ0NMVVNURVJTJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTEFVVEgnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTU1JVFRFRCcsXG4gICdDT01QSUxFRCcsXG4gICdDT01QUkVTUycsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlNUQU5UJyxcbiAgJ0NPTlNUUlVDVE9SJyxcbiAgJ0NPTlRFWFQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDT1VOVCcsXG4gICdDUkFTSCcsXG4gICdDUkVBVEUnLFxuICAnQ1JFREVOVElBTCcsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJWQUwnLFxuICAnQ1VSU09SJyxcbiAgJ0NVU1RPTURBVFVNJyxcbiAgJ0RBTkdMSU5HJyxcbiAgJ0RBVEEnLFxuICAnREFURV9CQVNFJyxcbiAgJ0RBVEUnLFxuICAnREFZJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVGQVVMVCcsXG4gICdERUZJTkUnLFxuICAnREVMRVRFJyxcbiAgJ0RFUFRIJyxcbiAgJ0RFU0MnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVJFQ1RPUlknLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFVSQVRJT04nLFxuICAnRUxFTUVOVCcsXG4gICdFTFNJRicsXG4gICdFTVBUWScsXG4gICdFTkQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYQ0VQVElPTlMnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhURU5EUycsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJTkFMJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZPUicsXG4gICdGT1JBTEwnLFxuICAnRk9SQ0UnLFxuICAnRlJPTScsXG4gICdGVU5DVElPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnSEFTSCcsXG4gICdIRUFQJyxcbiAgJ0hJRERFTicsXG4gICdIT1VSJyxcbiAgJ0lERU5USUZJRUQnLFxuICAnSUYnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVRElORycsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lORElDQVRPUicsXG4gICdJTkRJQ0VTJyxcbiAgJ0lORklOSVRFJyxcbiAgJ0lOU1RBTlRJQUJMRScsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUkZBQ0UnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZBTElEQVRFJyxcbiAgJ0lTJyxcbiAgJ0lTT0xBVElPTicsXG4gICdKQVZBJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVOR1RIJyxcbiAgJ0xFVkVMJyxcbiAgJ0xJQlJBUlknLFxuICAnTElLRScsXG4gICdMSUtFMicsXG4gICdMSUtFNCcsXG4gICdMSUtFQycsXG4gICdMSU1JVEVEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0snLFxuICAnTE9ORycsXG4gICdNQVAnLFxuICAnTUFYJyxcbiAgJ01BWExFTicsXG4gICdNRU1CRVInLFxuICAnTUVSR0UnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNTFNMQUJFTCcsXG4gICdNT0QnLFxuICAnTU9ERScsXG4gICdNT05USCcsXG4gICdNVUxUSVNFVCcsXG4gICdOQU1FJyxcbiAgJ05BTicsXG4gICdOQVRJT05BTCcsXG4gICdOQVRJVkUnLFxuICAnTkFUVVJBTCcsXG4gICdOQVRVUkFMTicsXG4gICdOQ0hBUicsXG4gICdORVcnLFxuICAnTkVYVFZBTCcsXG4gICdOT0NPTVBSRVNTJyxcbiAgJ05PQ09QWScsXG4gICdOT1QnLFxuICAnTk9XQUlUJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTUJFUl9CQVNFJyxcbiAgJ05VTUJFUicsXG4gICdPQkpFQ1QnLFxuICAnT0NJQ09MTCcsXG4gICdPQ0lEQVRFJyxcbiAgJ09DSURBVEVUSU1FJyxcbiAgJ09DSURVUkFUSU9OJyxcbiAgJ09DSUlOVEVSVkFMJyxcbiAgJ09DSUxPQkxPQ0FUT1InLFxuICAnT0NJTlVNQkVSJyxcbiAgJ09DSVJBVycsXG4gICdPQ0lSRUYnLFxuICAnT0NJUkVGQ1VSU09SJyxcbiAgJ09DSVJPV0lEJyxcbiAgJ09DSVNUUklORycsXG4gICdPQ0lUWVBFJyxcbiAgJ09GJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QQVFVRScsXG4gICdPUEVOJyxcbiAgJ09QRVJBVE9SJyxcbiAgJ09QVElPTicsXG4gICdPUkFDTEUnLFxuICAnT1JBREFUQScsXG4gICdPUkRFUicsXG4gICdPUkdBTklaQVRJT04nLFxuICAnT1JMQU5ZJyxcbiAgJ09STFZBUlknLFxuICAnT1RIRVJTJyxcbiAgJ09VVCcsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFSQUxMRUxfRU5BQkxFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJBTUVURVJTJyxcbiAgJ1BBUkVOVCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTQ0FMJyxcbiAgJ1BDVEZSRUUnLFxuICAnUElQRScsXG4gICdQSVBFTElORUQnLFxuICAnUExTX0lOVEVHRVInLFxuICAnUExVR0dBQkxFJyxcbiAgJ1BPU0lUSVZFJyxcbiAgJ1BPU0lUSVZFTicsXG4gICdQUkFHTUEnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSSU9SJyxcbiAgJ1BSSVZBVEUnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVQkxJQycsXG4gICdSQUlTRScsXG4gICdSQU5HRScsXG4gICdSQVcnLFxuICAnUkVBRCcsXG4gICdSRUFMJyxcbiAgJ1JFQ09SRCcsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVMSUVTX09OJyxcbiAgJ1JFTScsXG4gICdSRU1BSU5ERVInLFxuICAnUkVOQU1FJyxcbiAgJ1JFU09VUkNFJyxcbiAgJ1JFU1VMVF9DQUNIRScsXG4gICdSRVNVTFQnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZFUlNFJyxcbiAgJ1JFVk9LRScsXG4gICdST0xMQkFDSycsXG4gICdST1cnLFxuICAnUk9XSUQnLFxuICAnUk9XTlVNJyxcbiAgJ1JPV1RZUEUnLFxuICAnU0FNUExFJyxcbiAgJ1NBVkUnLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NCMScsXG4gICdTQjInLFxuICAnU0I0JyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VHTUVOVCcsXG4gICdTRUxGJyxcbiAgJ1NFUEFSQVRFJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NFUklBTElaQUJMRScsXG4gICdTSEFSRScsXG4gICdTSE9SVCcsXG4gICdTSVpFX1QnLFxuICAnU0laRScsXG4gICdTTUFMTElOVCcsXG4gICdTT01FJyxcbiAgJ1NQQUNFJyxcbiAgJ1NQQVJTRScsXG4gICdTUUwnLFxuICAnU1FMQ09ERScsXG4gICdTUUxEQVRBJyxcbiAgJ1NRTEVSUk0nLFxuICAnU1FMTkFNRScsXG4gICdTUUxTVEFURScsXG4gICdTVEFOREFSRCcsXG4gICdTVEFSVCcsXG4gICdTVEFUSUMnLFxuICAnU1REREVWJyxcbiAgJ1NUT1JFRCcsXG4gICdTVFJJTkcnLFxuICAnU1RSVUNUJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlBBUlRJVElPTicsXG4gICdTVUJTVElUVVRBQkxFJyxcbiAgJ1NVQlRZUEUnLFxuICAnU1VDQ0VTU0ZVTCcsXG4gICdTVU0nLFxuICAnU1lOT05ZTScsXG4gICdTWVNEQVRFJyxcbiAgJ1RBQkFVVEgnLFxuICAnVEFCTEUnLFxuICAnVERPJyxcbiAgJ1RIRScsXG4gICdUSEVOJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RJTUVaT05FX0FCQlInLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVElNRVpPTkVfUkVHSU9OJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSQU5TQUNUSU9OQUwnLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1RSVVNURUQnLFxuICAnVFlQRScsXG4gICdVQjEnLFxuICAnVUIyJyxcbiAgJ1VCNCcsXG4gICdVSUQnLFxuICAnVU5ERVInLFxuICAnVU5JUVVFJyxcbiAgJ1VOUExVRycsXG4gICdVTlNJR05FRCcsXG4gICdVTlRSVVNURUQnLFxuICAnVVNFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMSVNUJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSQ0hBUjInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOQ0UnLFxuICAnVkFSUkFZJyxcbiAgJ1ZBUllJTkcnLFxuICAnVklFVycsXG4gICdWSUVXUycsXG4gICdWT0lEJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJVEgnLFxuICAnV09SSycsXG4gICdXUkFQUEVEJyxcbiAgJ1dSSVRFJyxcbiAgJ1lFQVInLFxuICAnWk9ORScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0JFR0lOJyxcbiAgJ0NPTk5FQ1QgQlknLFxuICAnREVDTEFSRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdERUxFVEUnLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENFUFRJT04nLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ0xPT1AnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnU1RBUlQgV0lUSCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JPU1MgQVBQTFknLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnV0hFTicsXG4gICdYT1InLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCJOJydcIiwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnXycsICckJywgJyMnLCAnLicsICdAJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnfHwnLCAnKionLCAnIT0nLCAnOj0nXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICBpZiAoaXNTZXQodG9rZW4pICYmIGlzQnkodGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4pKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUJPUlQnLFxuICAnQUJTT0xVVEUnLFxuICAnQUNDRVNTJyxcbiAgJ0FDVElPTicsXG4gICdBREQnLFxuICAnQURNSU4nLFxuICAnQUZURVInLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMTCcsXG4gICdBTFNPJyxcbiAgJ0FMVEVSJyxcbiAgJ0FMV0FZUycsXG4gICdBTkFMWVNFJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNTRVJUSU9OJyxcbiAgJ0FTU0lHTk1FTlQnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVFRBQ0gnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQkFDS1dBUkQnLFxuICAnQkVGT1JFJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCSVQnLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBQ0hFJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTQ0FERUQnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NBVEFMT0cnLFxuICAnQ0hBSU4nLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSSVNUSUNTJyxcbiAgJ0NIRUNLJyxcbiAgJ0NIRUNLUE9JTlQnLFxuICAnQ0xBU1MnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExBVElPTicsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1FTlRTJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09OQ1VSUkVOVExZJyxcbiAgJ0NPTkZJR1VSQVRJT04nLFxuICAnQ09ORkxJQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlNUUkFJTlRTJyxcbiAgJ0NPTlRFTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSU0lPTicsXG4gICdDT1BZJyxcbiAgJ0NPU1QnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NTVicsXG4gICdDVUJFJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9DQVRBTE9HJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFUQScsXG4gICdEQVRBQkFTRScsXG4gICdEQVknLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGQVVMVFMnLFxuICAnREVGRVJSQUJMRScsXG4gICdERUZFUlJFRCcsXG4gICdERUZJTkVSJyxcbiAgJ0RFTEVURScsXG4gICdERUxJTUlURVInLFxuICAnREVMSU1JVEVSUycsXG4gICdERVBFTkRTJyxcbiAgJ0RFU0MnLFxuICAnREVUQUNIJyxcbiAgJ0RJQ1RJT05BUlknLFxuICAnRElTQUJMRScsXG4gICdESVNDQVJEJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPQ1VNRU5UJyxcbiAgJ0RPTUFJTicsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdFQUNIJyxcbiAgJ0VMU0UnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFTkQnLFxuICAnRU5VTScsXG4gICdFU0NBUEUnLFxuICAnRVZFTlQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhDTFVESU5HJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUFJFU1NJT04nLFxuICAnRVhURU5TSU9OJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkFNSUxZJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJTFRFUicsXG4gICdGSVJTVCcsXG4gICdGTE9BVCcsXG4gICdGT0xMT1dJTkcnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRk9SV0FSRCcsXG4gICdGUkVFWkUnLFxuICAnRlJPTScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVTkNUSU9OUycsXG4gICdHRU5FUkFURUQnLFxuICAnR0xPQkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dSQU5URUQnLFxuICAnR1JFQVRFU1QnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnR1JPVVBTJyxcbiAgJ0hBTkRMRVInLFxuICAnSEFWSU5HJyxcbiAgJ0hFQURFUicsXG4gICdIT0xEJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJVFknLFxuICAnSUYnLFxuICAnSUxJS0UnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lNTVVUQUJMRScsXG4gICdJTVBMSUNJVCcsXG4gICdJTVBPUlQnLFxuICAnSU4nLFxuICAnSU5DTFVERScsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5IRVJJVCcsXG4gICdJTkhFUklUUycsXG4gICdJTklUSUFMTFknLFxuICAnSU5MSU5FJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOUFVUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlNURUFEJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVk9LRVInLFxuICAnSVMnLFxuICAnSVNOVUxMJyxcbiAgJ0lTT0xBVElPTicsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVNUJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRElORycsXG4gICdMRUFLUFJPT0YnLFxuICAnTEVBU1QnLFxuICAnTEVGVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJU1RFTicsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NBVElPTicsXG4gICdMT0NLJyxcbiAgJ0xPQ0tFRCcsXG4gICdMT0dHRUQnLFxuICAnTUFQUElORycsXG4gICdNQVRDSCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVUSE9EJyxcbiAgJ01JTlVURScsXG4gICdNSU5WQUxVRScsXG4gICdNT0RFJyxcbiAgJ01PTlRIJyxcbiAgJ01PVkUnLFxuICAnTkFNRScsXG4gICdOQU1FUycsXG4gICdOQVRJT05BTCcsXG4gICdOQVRVUkFMJyxcbiAgJ05DSEFSJyxcbiAgJ05FVycsXG4gICdORVhUJyxcbiAgJ05GQycsXG4gICdORkQnLFxuICAnTkZLQycsXG4gICdORktEJyxcbiAgJ05PJyxcbiAgJ05PTkUnLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05PVEhJTkcnLFxuICAnTk9USUZZJyxcbiAgJ05PVE5VTEwnLFxuICAnTk9XQUlUJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnT0JKRUNUJyxcbiAgJ09GJyxcbiAgJ09GRicsXG4gICdPRkZTRVQnLFxuICAnT0lEUycsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OUycsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPUkRJTkFMSVRZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSTEFZJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnT1dORUQnLFxuICAnT1dORVInLFxuICAnUEFSQUxMRUwnLFxuICAnUEFSU0VSJyxcbiAgJ1BBUlRJQUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU1NJTkcnLFxuICAnUEFTU1dPUkQnLFxuICAnUExBQ0lORycsXG4gICdQTEFOUycsXG4gICdQT0xJQ1knLFxuICAnUE9TSVRJT04nLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVBBUkVEJyxcbiAgJ1BSRVNFUlZFJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJJT1InLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkFMJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9DRURVUkVTJyxcbiAgJ1BST0dSQU0nLFxuICAnUFVCTElDQVRJT04nLFxuICAnUVVPVEUnLFxuICAnUkFOR0UnLFxuICAnUkVBRCcsXG4gICdSRUFMJyxcbiAgJ1JFQVNTSUdOJyxcbiAgJ1JFQ0hFQ0snLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFRlJFU0gnLFxuICAnUkVJTkRFWCcsXG4gICdSRUxBVElWRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVRBQkxFJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVQTElDQScsXG4gICdSRVNFVCcsXG4gICdSRVNUQVJUJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVVRJTkVTJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1JVTEUnLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NDSEVNQScsXG4gICdTQ0hFTUFTJyxcbiAgJ1NDUk9MTCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVFVRU5DRScsXG4gICdTRVFVRU5DRVMnLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NFUlZFUicsXG4gICdTRVNTSU9OJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTRVQnLFxuICAnU0VUT0YnLFxuICAnU0VUUycsXG4gICdTSEFSRScsXG4gICdTSE9XJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NLSVAnLFxuICAnU01BTExJTlQnLFxuICAnU05BUFNIT1QnLFxuICAnU09NRScsXG4gICdTUUwnLFxuICAnU1RBQkxFJyxcbiAgJ1NUQU5EQUxPTkUnLFxuICAnU1RBUlQnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJU1RJQ1MnLFxuICAnU1RESU4nLFxuICAnU1RET1VUJyxcbiAgJ1NUT1JBR0UnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUklDVCcsXG4gICdTVFJJUCcsXG4gICdTVUJTQ1JJUFRJT04nLFxuICAnU1VCU1RSSU5HJyxcbiAgJ1NVUFBPUlQnLFxuICAnU1lNTUVUUklDJyxcbiAgJ1NZU0lEJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnVEFCTEVTUEFDRScsXG4gICdURU1QJyxcbiAgJ1RFTVBMQVRFJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdURVhUJyxcbiAgJ1RIRU4nLFxuICAnVElFUycsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFJVU1RFRCcsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VFU0NBUEUnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOQ09NTUlUVEVEJyxcbiAgJ1VORU5DUllQVEVEJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTElTVEVOJyxcbiAgJ1VOTE9HR0VEJyxcbiAgJ1VOVElMJyxcbiAgJ1VQREFURScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBQ1VVTScsXG4gICdWQUxJRCcsXG4gICdWQUxJREFURScsXG4gICdWQUxJREFUT1InLFxuICAnVkFMVUUnLFxuICAnVkFMVUVTJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFESUMnLFxuICAnVkFSWUlORycsXG4gICdWRVJCT1NFJyxcbiAgJ1ZFUlNJT04nLFxuICAnVklFVycsXG4gICdWSUVXUycsXG4gICdWT0xBVElMRScsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISVRFU1BBQ0UnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dJVEhPVVQnLFxuICAnV09SSycsXG4gICdXUkFQUEVSJyxcbiAgJ1dSSVRFJyxcbiAgJ1hNTCcsXG4gICdYTUxBVFRSSUJVVEVTJyxcbiAgJ1hNTENPTkNBVCcsXG4gICdYTUxFTEVNRU5UJyxcbiAgJ1hNTEVYSVNUUycsXG4gICdYTUxGT1JFU1QnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdYTUxQQVJTRScsXG4gICdYTUxQSScsXG4gICdYTUxST09UJyxcbiAgJ1hNTFNFUklBTElaRScsXG4gICdYTUxUQUJMRScsXG4gICdZRUFSJyxcbiAgJ1lFUycsXG4gICdaT05FJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdGdyZVNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsIFwiVSYnJ1wiLCAnVSZcIlwiJywgJyQkJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgJyE9JyxcbiAgICAgICAgJzw8JyxcbiAgICAgICAgJz4+JyxcbiAgICAgICAgJ3x8LycsXG4gICAgICAgICd8LycsXG4gICAgICAgICc6OicsXG4gICAgICAgICctPj4nLFxuICAgICAgICAnLT4nLFxuICAgICAgICAnfn4qJyxcbiAgICAgICAgJ35+JyxcbiAgICAgICAgJyF+fionLFxuICAgICAgICAnIX5+JyxcbiAgICAgICAgJ34qJyxcbiAgICAgICAgJyF+KicsXG4gICAgICAgICchficsXG4gICAgICAgICchIScsXG4gICAgICBdLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUVTMTI4JyxcbiAgJ0FFUzI1NicsXG4gICdBTExPV09WRVJXUklURScsXG4gICdBTkFMWVNFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0JBQ0tVUCcsXG4gICdCSU5BUlknLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JPVEgnLFxuICAnQllURURJQ1QnLFxuICAnQlpJUDInLFxuICAnQ0FTVCcsXG4gICdDSEVDSycsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTFVNTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NSRUFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJSRU5UX1VTRVJfSUQnLFxuICAnREVGQVVMVCcsXG4gICdERUZFUlJBQkxFJyxcbiAgJ0RFRkxBVEUnLFxuICAnREVGUkFHJyxcbiAgJ0RFTFRBJyxcbiAgJ0RFTFRBMzJLJyxcbiAgJ0RFU0MnLFxuICAnRElTQUJMRScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdFTFNFJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPREUnLFxuICAnRU5DUllQVCcsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFWFBMSUNJVCcsXG4gICdGQUxTRScsXG4gICdGT1InLFxuICAnRk9SRUlHTicsXG4gICdGUkVFWkUnLFxuICAnRlVMTCcsXG4gICdHTE9CQUxESUNUMjU2JyxcbiAgJ0dMT0JBTERJQ1Q2NEsnLFxuICAnR1JBTlQnLFxuICAnR1pJUCcsXG4gICdJREVOVElUWScsXG4gICdJR05PUkUnLFxuICAnSUxJS0UnLFxuICAnSU5JVElBTExZJyxcbiAgJ0lOVE8nLFxuICAnTEVBRElORycsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTFVOJyxcbiAgJ0xVTlMnLFxuICAnTFpPJyxcbiAgJ0xaT1AnLFxuICAnTUlOVVMnLFxuICAnTU9TVExZMTMnLFxuICAnTU9TVExZMzInLFxuICAnTU9TVExZOCcsXG4gICdOQVRVUkFMJyxcbiAgJ05FVycsXG4gICdOVUxMUycsXG4gICdPRkYnLFxuICAnT0ZGTElORScsXG4gICdPRkZTRVQnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUkRFUicsXG4gICdPVkVSTEFQUycsXG4gICdQQVJBTExFTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEVSQ0VOVCcsXG4gICdQRVJNSVNTSU9OUycsXG4gICdQTEFDSU5HJyxcbiAgJ1BSSU1BUlknLFxuICAnUkFXJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUNPVkVSJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVKRUNUTE9HJyxcbiAgJ1JFU09SVCcsXG4gICdSRVNUT1JFJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTSU1JTEFSJyxcbiAgJ1NZU0RBVEUnLFxuICAnU1lTVEVNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBRycsXG4gICdUREVTJyxcbiAgJ1RFWFQyNTUnLFxuICAnVEVYVDMySycsXG4gICdUSEVOJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUTycsXG4gICdUT1AnLFxuICAnVFJBSUxJTkcnLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnVU5JUVVFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkVSQk9TRScsXG4gICdXQUxMRVQnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1dJVEhPVVQnLFxuICAnUFJFRElDQVRFJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFJFU1NJT04nLFxuICAnQ09QWScsXG4gICdGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnQVZSTycsXG4gICdKU09OJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdCWklQMicsXG4gICdHWklQJyxcbiAgJ0xaT1AnLFxuICAnUEFSUVVFVCcsXG4gICdPUkMnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnREFURUZPUk1BVCcsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnTlVMTCBBUycsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnTUFOSUZFU1QnLFxuICAnUkVHSU9OJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ1NTSCcsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0FDQ0VTU19LRVlfSUQnLFxuICAnU0VDUkVUX0FDQ0VTU19LRVknLFxuICAnQVZSTycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQlpJUDInLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnRk9STUFUJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ0daSVAnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnSlNPTicsXG4gICdMWk9QJyxcbiAgJ01BTklGRVNUJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdOVUxMIEFTJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUdJT04nLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnU1NIJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnVElNRUZPUk1BVCcsXG4gICdTRVNTSU9OX1RPS0VOJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0RBVEEgQ0FUQUxPRycsXG4gICdISVZFIE1FVEFTVE9SRScsXG4gICdDQVRBTE9HX1JPTEUnLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0VWRU4nLFxuICAnQUxMJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVE9QJyxcbiAgJ0xJTUlUJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VOSU9OIEFMTCcsXG4gICdVTklPTicsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdBTkFMWVpFJyxcbiAgJ0FOQUxZU0UnLFxuICAnRElTVEtFWScsXG4gICdTT1JUS0VZJyxcbiAgJ0NPTVBPVU5EJyxcbiAgJ0lOVEVSTEVBVkVEJyxcbiAgJ0ZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRklYRURXSURUSCcsXG4gICdBVlJPJyxcbiAgJ0pTT04nLFxuICAnRU5DUllQVEVEJyxcbiAgJ0JaSVAyJyxcbiAgJ0daSVAnLFxuICAnTFpPUCcsXG4gICdQQVJRVUVUJyxcbiAgJ09SQycsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdOVUxMIEFTJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnU1RBVFVQREFURScsXG4gICdNQU5JRkVTVCcsXG4gICdSRUdJT04nLFxuICAnSUFNX1JPTEUnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnU1NIJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQUNDRVNTX0tFWV9JRCcsXG4gICdTRUNSRVRfQUNDRVNTX0tFWScsXG4gICdBVlJPJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCWklQMicsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnRklYRURXSURUSCcsXG4gICdGT1JNQVQnLFxuICAnSUFNX1JPTEUnLFxuICAnR1pJUCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdKU09OJyxcbiAgJ0xaT1AnLFxuICAnTUFOSUZFU1QnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFR0lPTicsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdTU0gnLFxuICAnU1RBVFVQREFURScsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1NFU1NJT05fVE9LRU4nLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnRVhURVJOQUwnLFxuICAnREFUQSBDQVRBTE9HJyxcbiAgJ0hJVkUgTUVUQVNUT1JFJyxcbiAgJ0NBVEFMT0dfUk9MRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFtdO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ1dIRU4nLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5BTFlTRScsXG4gICdESVNUS0VZJyxcbiAgJ1NPUlRLRVknLFxuICAnQ09NUE9VTkQnLFxuICAnSU5URVJMRUFWRUQnLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkc2hpZnRGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKSddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJ0AnLCAnIycsICckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnfC8nLCAnfHwvJywgJzw8JywgJz4+JywgJyE9JywgJ3x8J10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgaXNFbmQsIGlzV2luZG93IH0gZnJvbSAnLi4vY29yZS90b2tlbic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FSUkFZX1pJUCcsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEVDVF9MSVNUJyxcbiAgJ0NPTExFQ1RfU0VUJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UIFJPVycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBVEVfQUREJyxcbiAgJ0RBVEVfU1VCJyxcbiAgJ0RBVEVfVFJVTkMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RBWScsXG4gICdEQVlTJyxcbiAgJ0RFQ09ERScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RST1AnLFxuICAnRUxTRScsXG4gICdFTkNPREUnLFxuICAnRU5EJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUExPREVfT1VURVInLFxuICAnRVhQTE9ERScsXG4gICdGSUxURVInLFxuICAnRklSU1RfVkFMVUUnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxBVFRFTicsXG4gICdGT0xMT1dJTkcnLFxuICAnRlJPTV9VTklYVElNRScsXG4gICdGVUxMJyxcbiAgJ0dSRUFURVNUJyxcbiAgJ0dST1VQX0NPTkNBVCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lGJyxcbiAgJ0lGTlVMTCcsXG4gICdJTicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdMQUcnLFxuICAnTEFTVF9WQUxVRScsXG4gICdMQVNUJyxcbiAgJ0xFQUQnLFxuICAnTEVBRElORycsXG4gICdMRUFTVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ01BWCcsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5VVEUnLFxuICAnTU9OVEgnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9XKCknLFxuICAnTlRJTEUnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnT0ZGU0VUJyxcbiAgJ09OIERFTEVURScsXG4gICdPTiBVUERBVEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUFRJTUlaRScsXG4gICdPVkVSJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQUkVDRURJTkcnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUdFWFAnLFxuICAnUkVOQU1FJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1NFQ09ORCcsXG4gICdTRVBBUkFUT1InLFxuICAnU0VRVUVOQ0UnLFxuICAnU0laRScsXG4gICdTVFJJTkcnLFxuICAnU1RSVUNUJyxcbiAgJ1NVTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RIRU4nLFxuICAnVE9fREFURScsXG4gICdUT19KU09OJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TRk9STScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOSVFVRScsXG4gICdVTklYX1RJTUVTVEFNUCcsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBEQVRBQkFTRScsXG4gICdBTFRFUiBTQ0hFTUEnLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0xVU1RFUiBCWScsXG4gICdDTFVTVEVSRUQgQlknLFxuICAnREVMRVRFIEZST00nLFxuICAnRElTVFJJQlVURSBCWScsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1BUSU9OUycsXG4gICdPUkRFUiBCWScsXG4gICdQQVJUSVRJT04gQlknLFxuICAnUEFSVElUSU9ORUQgQlknLFxuICAnUkFOR0UnLFxuICAnUk9XUycsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1RCTFBST1BFUlRJRVMnLFxuICAnVVBEQVRFJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdXSU5ET1cnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdJTlRFUlNFQ1QgQUxMJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JFQVRFIE9SJyxcbiAgJ0NSRUFURScsXG4gICdFTFNFJyxcbiAgJ0xBVEVSQUwgVklFVycsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnRlVMTCBKT0lOJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG4gIC8vIG5vbi1zdGFuZGFyZC1qb2luc1xuICAnQU5USSBKT0lOJyxcbiAgJ1NFTUkgSk9JTicsXG4gICdMRUZUIEFOVEkgSk9JTicsXG4gICdMRUZUIFNFTUkgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIEZVTEwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIElOTkVSIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBTRU1JIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhcmtTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnLCAne30nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogWychPScsICc8PT4nLCAnJiYnLCAnfHwnLCAnPT0nXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIGZ1bmN0aW9uc1xuICAgIGlmIChpc1dpbmRvdyh0b2tlbikpIHtcbiAgICAgIGNvbnN0IGFoZWFkVG9rZW4gPSB0aGlzLnRva2VuTG9va0FoZWFkKCk7XG4gICAgICBpZiAoYWhlYWRUb2tlbiAmJiBhaGVhZFRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICAvLyBUaGlzIGlzIGEgZnVuY3Rpb24gY2FsbCwgdHJlYXQgaXQgYXMgYSByZXNlcnZlZCB3b3JkXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgcHJvcGVydGllc1xuICAgIGlmIChpc0VuZCh0b2tlbikpIHtcbiAgICAgIGNvbnN0IGJhY2tUb2tlbiA9IHRoaXMudG9rZW5Mb29rQmVoaW5kKCk7XG4gICAgICBpZiAoYmFja1Rva2VuICYmIGJhY2tUb2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRVJBVE9SICYmIGJhY2tUb2tlbi52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgd2luZG93KCkuZW5kIChvciBzaW1pbGFyKSBub3QgQ0FTRSAuLi4gRU5EXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuV09SRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG4vLyBodHRwczovL2pha2V3aGVhdC5naXRodWIuaW8vc3FsLW92ZXJ2aWV3L3NxbC0yMDA4LWZvdW5kYXRpb24tZ3JhbW1hci5odG1sI3Jlc2VydmVkLXdvcmRcbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMVEVSJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdBVkcnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT1NFJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xVTU4nLFxuICAnQ09NTUlUJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVkVSVCcsXG4gICdDT1JSJyxcbiAgJ0NPUlJFU1BPTkRJTkcnLFxuICAnQ09VTlQnLFxuICAnQ09WQVJfUE9QJyxcbiAgJ0NPVkFSX1NBTVAnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVQkUnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9DQVRBTE9HJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVFJBTlNGT1JNX0dST1VQX0ZPUl9UWVBFJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVSRUYnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNDT05ORUNUJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0VORC1FWEVDJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVSWScsXG4gICdFWENFUFQnLFxuICAnRVhFQycsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFAnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSUxURVInLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGUk9NJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVTSU9OJyxcbiAgJ0dFVCcsXG4gICdHTE9CQUwnLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnSEFWSU5HJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdJREVOVElUWScsXG4gICdJTicsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlNFQ1RJT04nLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdKT0lOJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRElORycsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElLRV9SRUdFWCcsXG4gICdMTicsXG4gICdMT0NBTCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9XRVInLFxuICAnTUFUQ0gnLFxuICAnTUFYJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNRVRIT0QnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNT0QnLFxuICAnTU9ESUZJRVMnLFxuICAnTU9EVUxFJyxcbiAgJ01PTlRIJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05PJyxcbiAgJ05PTkUnLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1FUklDJyxcbiAgJ09DVEVUX0xFTkdUSCcsXG4gICdPQ0NVUlJFTkNFU19SRUdFWCcsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUEVSQ0VOVElMRV9DT05UJyxcbiAgJ1BFUkNFTlRJTEVfRElTQycsXG4gICdQT1NJVElPTicsXG4gICdQT1NJVElPTl9SRUdFWCcsXG4gICdQT1dFUicsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUklNQVJZJyxcbiAgJ1BST0NFRFVSRScsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQUwnLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRVNVTFQnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1cnLFxuICAnUk9XX05VTUJFUicsXG4gICdST1dTJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ09QRScsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUxFQ1QnLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTRVQnLFxuICAnU0lNSUxBUicsXG4gICdTTUFMTElOVCcsXG4gICdTT01FJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NQRUNJRklDVFlQRScsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FSVCcsXG4gICdTVEFSVCcsXG4gICdTVEFUSUMnLFxuICAnU1REREVWX1BPUCcsXG4gICdTVERERVZfU0FNUCcsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VCU1RSSU5HX1JFR0VYJyxcbiAgJ1NVTScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNMQVRFJyxcbiAgJ1RSQU5TTEFURV9SRUdFWCcsXG4gICdUUkFOU0xBVElPTicsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVUERBVEUnLFxuICAnVVBQRVInLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxVRScsXG4gICdWQUxVRVMnLFxuICAnVkFSX1BPUCcsXG4gICdWQVJfU0FNUCcsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJZSU5HJyxcbiAgJ1dIRU4nLFxuICAnV0hFTkVWRVInLFxuICAnV0hFUkUnLFxuICAnV0lEVEhfQlVDS0VUJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1lFQVInLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGRVRDSCBORVhUJyxcbiAgJ0ZFVENIIFBSSU9SJyxcbiAgJ0ZFVENIIExBU1QnLFxuICAnRkVUQ0ggQUJTT0xVVEUnLFxuICAnRkVUQ0ggUkVMQVRJVkUnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QgRElTVElOQ1QnLFxuICAnVU5JT04nLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OIERJU1RJTkNUJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCBESVNUSU5DVCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdFWFRFUk5BTCcsXG4gICdQUk9DRURVUkUnLFxuICAnQUxMJyxcbiAgJ0ZFVENIJyxcbiAgJ1BVQkxJQycsXG4gICdBTFRFUicsXG4gICdGSUxFJyxcbiAgJ1JBSVNFUlJPUicsXG4gICdBTkQnLFxuICAnRklMTEZBQ1RPUicsXG4gICdSRUFEJyxcbiAgJ0FOWScsXG4gICdGT1InLFxuICAnUkVBRFRFWFQnLFxuICAnQVMnLFxuICAnRk9SRUlHTicsXG4gICdSRUNPTkZJR1VSRScsXG4gICdBU0MnLFxuICAnRlJFRVRFWFQnLFxuICAnUkVGRVJFTkNFUycsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0ZSRUVURVhUVEFCTEUnLFxuICAnUkVQTElDQVRJT04nLFxuICAnQkFDS1VQJyxcbiAgJ0ZST00nLFxuICAnUkVTVE9SRScsXG4gICdCRUdJTicsXG4gICdGVUxMJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ0JFVFdFRU4nLFxuICAnRlVOQ1RJT04nLFxuICAnUkVUVVJOJyxcbiAgJ0JSRUFLJyxcbiAgJ0dPVE8nLFxuICAnUkVWRVJUJyxcbiAgJ0JST1dTRScsXG4gICdHUkFOVCcsXG4gICdSRVZPS0UnLFxuICAnQlVMSycsXG4gICdHUk9VUCcsXG4gICdSSUdIVCcsXG4gICdCWScsXG4gICdIQVZJTkcnLFxuICAnUk9MTEJBQ0snLFxuICAnQ0FTQ0FERScsXG4gICdIT0xETE9DSycsXG4gICdST1dDT1VOVCcsXG4gICdDQVNFJyxcbiAgJ0lERU5USVRZJyxcbiAgJ1JPV0dVSURDT0wnLFxuICAnQ0hFQ0snLFxuICAnSURFTlRJVFlfSU5TRVJUJyxcbiAgJ1JVTEUnLFxuICAnQ0hFQ0tQT0lOVCcsXG4gICdJREVOVElUWUNPTCcsXG4gICdTQVZFJyxcbiAgJ0NMT1NFJyxcbiAgJ0lGJyxcbiAgJ1NDSEVNQScsXG4gICdDTFVTVEVSRUQnLFxuICAnSU4nLFxuICAnU0VDVVJJVFlBVURJVCcsXG4gICdDT0FMRVNDRScsXG4gICdJTkRFWCcsXG4gICdTRUxFQ1QnLFxuICAnQ09MTEFURScsXG4gICdJTk5FUicsXG4gICdTRU1BTlRJQ0tFWVBIUkFTRVRBQkxFJyxcbiAgJ0NPTFVNTicsXG4gICdJTlNFUlQnLFxuICAnU0VNQU5USUNTSU1JTEFSSVRZREVUQUlMU1RBQkxFJyxcbiAgJ0NPTU1JVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnU0VNQU5USUNTSU1JTEFSSVRZVEFCTEUnLFxuICAnQ09NUFVURScsXG4gICdJTlRPJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0lTJyxcbiAgJ1NFVCcsXG4gICdDT05UQUlOUycsXG4gICdKT0lOJyxcbiAgJ1NFVFVTRVInLFxuICAnQ09OVEFJTlNUQUJMRScsXG4gICdLRVknLFxuICAnU0hVVERPV04nLFxuICAnQ09OVElOVUUnLFxuICAnS0lMTCcsXG4gICdTT01FJyxcbiAgJ0NPTlZFUlQnLFxuICAnTEVGVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ0NSRUFURScsXG4gICdMSUtFJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ0NST1NTJyxcbiAgJ0xJTkVOTycsXG4gICdUQUJMRScsXG4gICdDVVJSRU5UJyxcbiAgJ0xPQUQnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ01FUkdFJyxcbiAgJ1RFWFRTSVpFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdOQVRJT05BTCcsXG4gICdUSEVOJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ05PQ0hFQ0snLFxuICAnVE8nLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ05PTkNMVVNURVJFRCcsXG4gICdUT1AnLFxuICAnQ1VSU09SJyxcbiAgJ05PVCcsXG4gICdUUkFOJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ05VTEwnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnREJDQycsXG4gICdOVUxMSUYnLFxuICAnVFJJR0dFUicsXG4gICdERUFMTE9DQVRFJyxcbiAgJ09GJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ0RFQ0xBUkUnLFxuICAnT0ZGJyxcbiAgJ1RSWV9DT05WRVJUJyxcbiAgJ0RFRkFVTFQnLFxuICAnT0ZGU0VUUycsXG4gICdUU0VRVUFMJyxcbiAgJ0RFTEVURScsXG4gICdPTicsXG4gICdVTklPTicsXG4gICdERU5ZJyxcbiAgJ09QRU4nLFxuICAnVU5JUVVFJyxcbiAgJ0RFU0MnLFxuICAnT1BFTkRBVEFTT1VSQ0UnLFxuICAnVU5QSVZPVCcsXG4gICdESVNLJyxcbiAgJ09QRU5RVUVSWScsXG4gICdVUERBVEUnLFxuICAnRElTVElOQ1QnLFxuICAnT1BFTlJPV1NFVCcsXG4gICdVUERBVEVURVhUJyxcbiAgJ0RJU1RSSUJVVEVEJyxcbiAgJ09QRU5YTUwnLFxuICAnVVNFJyxcbiAgJ0RPVUJMRScsXG4gICdPUFRJT04nLFxuICAnVVNFUicsXG4gICdEUk9QJyxcbiAgJ09SJyxcbiAgJ1ZBTFVFUycsXG4gICdEVU1QJyxcbiAgJ09SREVSJyxcbiAgJ1ZBUllJTkcnLFxuICAnRUxTRScsXG4gICdPVVRFUicsXG4gICdWSUVXJyxcbiAgJ0VORCcsXG4gICdPVkVSJyxcbiAgJ1dBSVRGT1InLFxuICAnRVJSTFZMJyxcbiAgJ1BFUkNFTlQnLFxuICAnV0hFTicsXG4gICdFU0NBUEUnLFxuICAnUElWT1QnLFxuICAnV0hFUkUnLFxuICAnRVhDRVBUJyxcbiAgJ1BMQU4nLFxuICAnV0hJTEUnLFxuICAnRVhFQycsXG4gICdQUkVDSVNJT04nLFxuICAnV0lUSCcsXG4gICdFWEVDVVRFJyxcbiAgJ1BSSU1BUlknLFxuICAnV0lUSElOIEdST1VQJyxcbiAgJ0VYSVNUUycsXG4gICdQUklOVCcsXG4gICdXUklURVRFWFQnLFxuICAnRVhJVCcsXG4gICdQUk9DJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ1tdJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJyMnLCAnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICc+PScsXG4gICAgICAgICc8PScsXG4gICAgICAgICc8PicsXG4gICAgICAgICchPScsXG4gICAgICAgICchPCcsXG4gICAgICAgICchPicsXG4gICAgICAgICcrPScsXG4gICAgICAgICctPScsXG4gICAgICAgICcqPScsXG4gICAgICAgICcvPScsXG4gICAgICAgICclPScsXG4gICAgICAgICd8PScsXG4gICAgICAgICcmPScsXG4gICAgICAgICdePScsXG4gICAgICAgICc6OicsXG4gICAgICBdLFxuICAgICAgLy8gVE9ETzogU3VwcG9ydCBmb3IgbW9uZXkgY29uc3RhbnRzXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBEYjJGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyJztcbmltcG9ydCBNYXJpYURiRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXInO1xuaW1wb3J0IE15U3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL015U3FsRm9ybWF0dGVyJztcbmltcG9ydCBOMXFsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFBsU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyJztcbmltcG9ydCBQb3N0Z3JlU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFJlZHNoaWZ0Rm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1JlZHNoaWZ0Rm9ybWF0dGVyJztcbmltcG9ydCBTcGFya1NxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TcGFya1NxbEZvcm1hdHRlcic7XG5pbXBvcnQgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFRTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvVFNxbEZvcm1hdHRlcic7XG5cbmNvbnN0IGZvcm1hdHRlcnMgPSB7XG4gIGRiMjogRGIyRm9ybWF0dGVyLFxuICBtYXJpYWRiOiBNYXJpYURiRm9ybWF0dGVyLFxuICBteXNxbDogTXlTcWxGb3JtYXR0ZXIsXG4gIG4xcWw6IE4xcWxGb3JtYXR0ZXIsXG4gICdwbC9zcWwnOiBQbFNxbEZvcm1hdHRlcixcbiAgcGxzcWw6IFBsU3FsRm9ybWF0dGVyLFxuICBwb3N0Z3Jlc3FsOiBQb3N0Z3JlU3FsRm9ybWF0dGVyLFxuICByZWRzaGlmdDogUmVkc2hpZnRGb3JtYXR0ZXIsXG4gIHNwYXJrOiBTcGFya1NxbEZvcm1hdHRlcixcbiAgc3FsOiBTdGFuZGFyZFNxbEZvcm1hdHRlcixcbiAgdHNxbDogVFNxbEZvcm1hdHRlcixcbn07XG5cbi8qKlxuICogRm9ybWF0IHdoaXRlc3BhY2UgaW4gYSBxdWVyeSB0byBtYWtlIGl0IGVhc2llciB0byByZWFkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICogIEBwYXJhbSB7U3RyaW5nfSBjZmcubGFuZ3VhZ2UgUXVlcnkgbGFuZ3VhZ2UsIGRlZmF1bHQgaXMgU3RhbmRhcmQgU1FMXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnQgQ2hhcmFjdGVycyB1c2VkIGZvciBpbmRlbnRhdGlvbiwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICogIEBwYXJhbSB7Qm9vbGVhbn0gY2ZnLnVwcGVyY2FzZSBDb252ZXJ0cyBrZXl3b3JkcyB0byB1cHBlcmNhc2VcbiAqICBAcGFyYW0ge0ludGVnZXJ9IGNmZy5saW5lc0JldHdlZW5RdWVyaWVzIEhvdyBtYW55IGxpbmUgYnJlYWtzIGJldHdlZW4gcXVlcmllc1xuICogIEBwYXJhbSB7T2JqZWN0fSBjZmcucGFyYW1zIENvbGxlY3Rpb24gb2YgcGFyYW1zIGZvciBwbGFjZWhvbGRlciByZXBsYWNlbWVudFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0ID0gKHF1ZXJ5LCBjZmcgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIHF1ZXJ5ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBxdWVyeSBhcmd1bWVudC4gRXh0ZWN0ZWQgc3RyaW5nLCBpbnN0ZWFkIGdvdCAnICsgdHlwZW9mIHF1ZXJ5KTtcbiAgfVxuXG4gIGxldCBGb3JtYXR0ZXIgPSBTdGFuZGFyZFNxbEZvcm1hdHRlcjtcbiAgaWYgKGNmZy5sYW5ndWFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgRm9ybWF0dGVyID0gZm9ybWF0dGVyc1tjZmcubGFuZ3VhZ2VdO1xuICB9XG4gIGlmIChGb3JtYXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IEVycm9yKGBVbnN1cHBvcnRlZCBTUUwgZGlhbGVjdDogJHtjZmcubGFuZ3VhZ2V9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBGb3JtYXR0ZXIoY2ZnKS5mb3JtYXQocXVlcnkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZERpYWxlY3RzID0gT2JqZWN0LmtleXMoZm9ybWF0dGVycyk7XG4iLCIvLyBPbmx5IHJlbW92ZXMgc3BhY2VzLCBub3QgbmV3bGluZXNcbmV4cG9ydCBjb25zdCB0cmltU3BhY2VzRW5kID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoL1sgXFx0XSskL3UsICcnKTtcblxuLy8gTGFzdCBlbGVtZW50IGZyb20gYXJyYXlcbmV4cG9ydCBjb25zdCBsYXN0ID0gKGFycikgPT4gYXJyW2Fyci5sZW5ndGggLSAxXTtcblxuLy8gVHJ1ZSBhcnJheSBpcyBlbXB0eSwgb3IgaXQncyBub3QgYW4gYXJyYXkgYXQgYWxsXG5leHBvcnQgY29uc3QgaXNFbXB0eSA9IChhcnIpID0+ICFBcnJheS5pc0FycmF5KGFycikgfHwgYXJyLmxlbmd0aCA9PT0gMDtcblxuLy8gRXNjYXBlcyByZWdleCBzcGVjaWFsIGNoYXJzXG5leHBvcnQgY29uc3QgZXNjYXBlUmVnRXhwID0gKHN0cmluZykgPT4gc3RyaW5nLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9ndSwgJ1xcXFwkJicpO1xuXG4vLyBTb3J0cyBzdHJpbmdzIGJ5IGxlbmd0aCwgc28gdGhhdCBsb25nZXIgb25lcyBhcmUgZmlyc3Rcbi8vIEFsc28gc29ydHMgYWxwaGFiZXRpY2FsbHkgYWZ0ZXIgc29ydGluZyBieSBsZW5ndGguXG5leHBvcnQgY29uc3Qgc29ydEJ5TGVuZ3RoRGVzYyA9IChzdHJpbmdzKSA9PlxuICBzdHJpbmdzLnNvcnQoKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aCB8fCBhLmxvY2FsZUNvbXBhcmUoYik7XG4gIH0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==