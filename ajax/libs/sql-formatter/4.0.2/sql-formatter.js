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
        namedPlaceholderTypes: [':'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NxbEZvcm1hdHRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9NeVNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9UU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9zcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbIkZvcm1hdHRlciIsImNmZyIsImluZGVudGF0aW9uIiwiSW5kZW50YXRpb24iLCJpbmRlbnQiLCJpbmxpbmVCbG9jayIsIklubGluZUJsb2NrIiwicGFyYW1zIiwiUGFyYW1zIiwicHJldmlvdXNSZXNlcnZlZFRva2VuIiwidG9rZW5zIiwiaW5kZXgiLCJFcnJvciIsInRva2VuIiwicXVlcnkiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImZvcm1hdHRlZFF1ZXJ5IiwiZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zIiwidHJpbSIsImZvckVhY2giLCJ0b2tlbk92ZXJyaWRlIiwidHlwZSIsInRva2VuVHlwZXMiLCJMSU5FX0NPTU1FTlQiLCJmb3JtYXRMaW5lQ29tbWVudCIsIkJMT0NLX0NPTU1FTlQiLCJmb3JtYXRCbG9ja0NvbW1lbnQiLCJSRVNFUlZFRF9UT1BfTEVWRUwiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZCIsIlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQiLCJmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZE5vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORSIsImZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQiLCJSRVNFUlZFRCIsImZvcm1hdFdpdGhTcGFjZXMiLCJPUEVOX1BBUkVOIiwiZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzIiwiQ0xPU0VfUEFSRU4iLCJmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXMiLCJQTEFDRUhPTERFUiIsImZvcm1hdFBsYWNlaG9sZGVyIiwidmFsdWUiLCJmb3JtYXRDb21tYSIsImZvcm1hdFdpdGhTcGFjZUFmdGVyIiwiZm9ybWF0V2l0aG91dFNwYWNlcyIsImZvcm1hdFF1ZXJ5U2VwYXJhdG9yIiwiYWRkTmV3bGluZSIsInNob3ciLCJpbmRlbnRDb21tZW50IiwiY29tbWVudCIsInJlcGxhY2UiLCJnZXRJbmRlbnQiLCJkZWNyZWFzZVRvcExldmVsIiwiZXF1YWxpemVXaGl0ZXNwYWNlIiwiaW5jcmVhc2VUb3BMZXZlbCIsImlzQW5kIiwiaXNCZXR3ZWVuIiwidG9rZW5Mb29rQmVoaW5kIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJ3aGl0ZXNwYWNlQmVmb3JlIiwibGVuZ3RoIiwidHJpbVNwYWNlc0VuZCIsImJlZ2luSWZQb3NzaWJsZSIsImlzQWN0aXZlIiwiaW5jcmVhc2VCbG9ja0xldmVsIiwiZW5kIiwiZGVjcmVhc2VCbG9ja0xldmVsIiwiZ2V0IiwiaXNMaW1pdCIsInJlc2V0SW5kZW50YXRpb24iLCJyZXBlYXQiLCJsaW5lc0JldHdlZW5RdWVyaWVzIiwidXBwZXJjYXNlIiwidG9VcHBlckNhc2UiLCJlbmRzV2l0aCIsIm4iLCJJTkRFTlRfVFlQRV9UT1BfTEVWRUwiLCJJTkRFTlRfVFlQRV9CTE9DS19MRVZFTCIsImluZGVudFR5cGVzIiwicHVzaCIsImxhc3QiLCJwb3AiLCJJTkxJTkVfTUFYX0xFTkdUSCIsImxldmVsIiwiaXNJbmxpbmVCbG9jayIsImkiLCJpc0ZvcmJpZGRlblRva2VuIiwiQ09NTUVOVCIsImtleSIsIlRva2VuaXplciIsIldISVRFU1BBQ0VfUkVHRVgiLCJOVU1CRVJfUkVHRVgiLCJPUEVSQVRPUl9SRUdFWCIsInJlZ2V4RmFjdG9yeSIsIm9wZXJhdG9ycyIsIkJMT0NLX0NPTU1FTlRfUkVHRVgiLCJMSU5FX0NPTU1FTlRfUkVHRVgiLCJsaW5lQ29tbWVudFR5cGVzIiwiUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCIsInJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50IiwiUkVTRVJWRURfTkVXTElORV9SRUdFWCIsInJlc2VydmVkTmV3bGluZVdvcmRzIiwiUkVTRVJWRURfUExBSU5fUkVHRVgiLCJyZXNlcnZlZFdvcmRzIiwiV09SRF9SRUdFWCIsInNwZWNpYWxXb3JkQ2hhcnMiLCJTVFJJTkdfUkVHRVgiLCJzdHJpbmdUeXBlcyIsIk9QRU5fUEFSRU5fUkVHRVgiLCJvcGVuUGFyZW5zIiwiQ0xPU0VfUEFSRU5fUkVHRVgiLCJjbG9zZVBhcmVucyIsIklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgiLCJpbmRleGVkUGxhY2Vob2xkZXJUeXBlcyIsIklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwibmFtZWRQbGFjZWhvbGRlclR5cGVzIiwiU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiaW5wdXQiLCJnZXRXaGl0ZXNwYWNlIiwic3Vic3RyaW5nIiwiZ2V0TmV4dFRva2VuIiwibWF0Y2hlcyIsIm1hdGNoIiwicHJldmlvdXNUb2tlbiIsImdldENvbW1lbnRUb2tlbiIsImdldFN0cmluZ1Rva2VuIiwiZ2V0T3BlblBhcmVuVG9rZW4iLCJnZXRDbG9zZVBhcmVuVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuIiwiZ2V0TnVtYmVyVG9rZW4iLCJnZXRSZXNlcnZlZFdvcmRUb2tlbiIsImdldFdvcmRUb2tlbiIsImdldE9wZXJhdG9yVG9rZW4iLCJnZXRMaW5lQ29tbWVudFRva2VuIiwiZ2V0QmxvY2tDb21tZW50VG9rZW4iLCJnZXRUb2tlbk9uRmlyc3RNYXRjaCIsInJlZ2V4IiwiU1RSSU5HIiwiZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbiIsImdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5IiwicGFyc2VLZXkiLCJ2Iiwic2xpY2UiLCJnZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkiLCJxdW90ZUNoYXIiLCJSZWdFeHAiLCJlc2NhcGVSZWdFeHAiLCJOVU1CRVIiLCJ1bmRlZmluZWQiLCJnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4iLCJnZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbiIsImdldFRvcExldmVsUmVzZXJ2ZWRUb2tlbk5vSW5kZW50IiwiZ2V0UGxhaW5SZXNlcnZlZFRva2VuIiwiV09SRCIsImNyZWF0ZU9wZXJhdG9yUmVnZXgiLCJtdWx0aUxldHRlck9wZXJhdG9ycyIsInNvcnRCeUxlbmd0aERlc2MiLCJtYXAiLCJqb2luIiwiY3JlYXRlTGluZUNvbW1lbnRSZWdleCIsImMiLCJjcmVhdGVSZXNlcnZlZFdvcmRSZWdleCIsInJlc2VydmVkV29yZHNQYXR0ZXJuIiwiY3JlYXRlV29yZFJlZ2V4Iiwic3BlY2lhbENoYXJzIiwiY3JlYXRlU3RyaW5nUmVnZXgiLCJjcmVhdGVTdHJpbmdQYXR0ZXJuIiwicGF0dGVybnMiLCIkJCIsInQiLCJjcmVhdGVQYXJlblJlZ2V4IiwicGFyZW5zIiwiZXNjYXBlUGFyZW4iLCJwYXJlbiIsImNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgiLCJ0eXBlcyIsInBhdHRlcm4iLCJpc0VtcHR5IiwidHlwZXNSZWdleCIsImlzVG9rZW4iLCJ0ZXN0IiwiaXNTZXQiLCJpc0J5IiwiaXNXaW5kb3ciLCJpc0VuZCIsIkRiMkZvcm1hdHRlciIsIk1hcmlhRGJGb3JtYXR0ZXIiLCJNeVNxbEZvcm1hdHRlciIsIk4xcWxGb3JtYXR0ZXIiLCJQbFNxbEZvcm1hdHRlciIsIlBvc3RncmVTcWxGb3JtYXR0ZXIiLCJSZWRzaGlmdEZvcm1hdHRlciIsIlNwYXJrU3FsRm9ybWF0dGVyIiwiYWhlYWRUb2tlbiIsInRva2VuTG9va0FoZWFkIiwiYmFja1Rva2VuIiwiU3RhbmRhcmRTcWxGb3JtYXR0ZXIiLCJUU3FsRm9ybWF0dGVyIiwiZm9ybWF0dGVycyIsImRiMiIsIm1hcmlhZGIiLCJteXNxbCIsIm4xcWwiLCJwbHNxbCIsInBvc3RncmVzcWwiLCJyZWRzaGlmdCIsInNwYXJrIiwic3FsIiwidHNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIiwic3RyIiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5Iiwic3RyaW5ncyIsInNvcnQiLCJhIiwiYiIsImxvY2FsZUNvbXBhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxTO0FBQ25C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QUFHLENBQUMvSixNQUFKLEdBQWEsQ0FBZCxDQUFaO0FBQUEsQ0FBYixDLENBRVA7O0FBQ08sSUFBTXlILE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNzQyxHQUFEO0FBQUEsU0FBUyxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBZCxDQUFELElBQXVCQSxHQUFHLENBQUMvSixNQUFKLEtBQWUsQ0FBL0M7QUFBQSxDQUFoQixDLENBRVA7O0FBQ08sSUFBTTBGLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUM5RixNQUFEO0FBQUEsU0FBWUEsTUFBTSxDQUFDUixPQUFQLENBQWUsMEJBQWYsRUFBdUMsTUFBdkMsQ0FBWjtBQUFBLENBQXJCLEMsQ0FFUDtBQUNBOztBQUNPLElBQU1nSCxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUM4RCxPQUFEO0FBQUEsU0FDOUJBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3JCLFdBQU9BLENBQUMsQ0FBQ3JLLE1BQUYsR0FBV29LLENBQUMsQ0FBQ3BLLE1BQWIsSUFBdUJvSyxDQUFDLENBQUNFLGFBQUYsQ0FBZ0JELENBQWhCLENBQTlCO0FBQ0QsR0FGRCxDQUQ4QjtBQUFBLENBQXpCLEMiLCJmaWxlIjoic3FsLWZvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInNxbEZvcm1hdHRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzcWxGb3JtYXR0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NxbEZvcm1hdHRlci5qc1wiKTtcbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5pbXBvcnQgSW5kZW50YXRpb24gZnJvbSAnLi9JbmRlbnRhdGlvbic7XG5pbXBvcnQgSW5saW5lQmxvY2sgZnJvbSAnLi9JbmxpbmVCbG9jayc7XG5pbXBvcnQgUGFyYW1zIGZyb20gJy4vUGFyYW1zJztcbmltcG9ydCB7IHRyaW1TcGFjZXNFbmQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBpc0FuZCwgaXNCZXR3ZWVuLCBpc0xpbWl0IH0gZnJvbSAnLi90b2tlbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdHRlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gICAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmxhbmd1YWdlXG4gICAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudFxuICAgKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlXG4gICAqICBAcGFyYW0ge0ludGVnZXJ9IGNmZy5saW5lc0JldHdlZW5RdWVyaWVzXG4gICAqICBAcGFyYW0ge09iamVjdH0gY2ZnLnBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IoY2ZnKSB7XG4gICAgdGhpcy5jZmcgPSBjZmc7XG4gICAgdGhpcy5pbmRlbnRhdGlvbiA9IG5ldyBJbmRlbnRhdGlvbih0aGlzLmNmZy5pbmRlbnQpO1xuICAgIHRoaXMuaW5saW5lQmxvY2sgPSBuZXcgSW5saW5lQmxvY2soKTtcbiAgICB0aGlzLnBhcmFtcyA9IG5ldyBQYXJhbXModGhpcy5jZmcucGFyYW1zKTtcbiAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHt9O1xuICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogU1FMIFRva2VuaXplciBmb3IgdGhpcyBmb3JtYXR0ZXIsIHByb3ZpZGVkIGJ5IHN1YmNsYXNzZXMuXG4gICAqL1xuICB0b2tlbml6ZXIoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0b2tlbml6ZXIoKSBub3QgaW1wbGVtZW50ZWQgYnkgc3ViY2xhc3MnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByb2Nlc3MgYW5kIG1vZGlmeSBhIHRva2VuIGJhc2VkIG9uIHBhcnNlZCBjb250ZXh0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW4gVGhlIHRva2VuIHRvIG1vZGlmeVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IG5ldyB0b2tlbiBvciB0aGUgb3JpZ2luYWxcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udHlwZVxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi52YWx1ZVxuICAgKi9cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIC8vIHN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gbW9kaWZ5IHRva2VucyBkdXJpbmcgZm9ybWF0dGluZ1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXRzIHdoaXRlc3BhY2UgaW4gYSBTUUwgc3RyaW5nIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgU1FMIHF1ZXJ5IHN0cmluZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBxdWVyeVxuICAgKi9cbiAgZm9ybWF0KHF1ZXJ5KSB7XG4gICAgdGhpcy50b2tlbnMgPSB0aGlzLnRva2VuaXplcigpLnRva2VuaXplKHF1ZXJ5KTtcbiAgICBjb25zdCBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zKCk7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnkudHJpbSgpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zKCkge1xuICAgIGxldCBmb3JtYXR0ZWRRdWVyeSA9ICcnO1xuXG4gICAgdGhpcy50b2tlbnMuZm9yRWFjaCgodG9rZW4sIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgIHRva2VuID0gdGhpcy50b2tlbk92ZXJyaWRlKHRva2VuKTtcblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuTElORV9DT01NRU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkJMT0NLX0NPTU1FTlQpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdEJsb2NrQ29tbWVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZE5vSW5kZW50KHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0T3BlbmluZ1BhcmVudGhlc2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlBMQUNFSE9MREVSKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRQbGFjZWhvbGRlcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJywnKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRDb21tYSh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJzonKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRXaXRob3V0U3BhY2VzKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnOycpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFF1ZXJ5U2VwYXJhdG9yKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3JtYXR0ZWRRdWVyeTtcbiAgfVxuXG4gIGZvcm1hdExpbmVDb21tZW50KHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkgKyB0aGlzLnNob3codG9rZW4pKTtcbiAgfVxuXG4gIGZvcm1hdEJsb2NrQ29tbWVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmluZGVudENvbW1lbnQodG9rZW4udmFsdWUpKTtcbiAgfVxuXG4gIGluZGVudENvbW1lbnQoY29tbWVudCkge1xuICAgIHJldHVybiBjb21tZW50LnJlcGxhY2UoL1xcblsgXFx0XSovZ3UsICdcXG4nICsgdGhpcy5pbmRlbnRhdGlvbi5nZXRJbmRlbnQoKSArICcgJyk7XG4gIH1cblxuICBmb3JtYXRUb3BMZXZlbFJlc2VydmVkV29yZE5vSW5kZW50KHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VUb3BMZXZlbCgpO1xuICAgIHF1ZXJ5ID0gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSArIHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRoaXMuc2hvdyh0b2tlbikpO1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICB9XG5cbiAgZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5kZWNyZWFzZVRvcExldmVsKCk7XG5cbiAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG5cbiAgICB0aGlzLmluZGVudGF0aW9uLmluY3JlYXNlVG9wTGV2ZWwoKTtcblxuICAgIHF1ZXJ5ICs9IHRoaXMuZXF1YWxpemVXaGl0ZXNwYWNlKHRoaXMuc2hvdyh0b2tlbikpO1xuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICB9XG5cbiAgZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCh0b2tlbiwgcXVlcnkpIHtcbiAgICBpZiAoaXNBbmQodG9rZW4pICYmIGlzQmV0d2Vlbih0aGlzLnRva2VuTG9va0JlaGluZCgyKSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKSArICcgJztcbiAgfVxuXG4gIC8vIFJlcGxhY2UgYW55IHNlcXVlbmNlIG9mIHdoaXRlc3BhY2UgY2hhcmFjdGVycyB3aXRoIHNpbmdsZSBzcGFjZVxuICBlcXVhbGl6ZVdoaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9cXHMrL2d1LCAnICcpO1xuICB9XG5cbiAgLy8gT3BlbmluZyBwYXJlbnRoZXNlcyBpbmNyZWFzZSB0aGUgYmxvY2sgaW5kZW50IGxldmVsIGFuZCBzdGFydCBhIG5ldyBsaW5lXG4gIGZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICAvLyBUYWtlIG91dCB0aGUgcHJlY2VkaW5nIHNwYWNlIHVubGVzcyB0aGVyZSB3YXMgd2hpdGVzcGFjZSB0aGVyZSBpbiB0aGUgb3JpZ2luYWwgcXVlcnlcbiAgICAvLyBvciBhbm90aGVyIG9wZW5pbmcgcGFyZW5zIG9yIGxpbmUgY29tbWVudFxuICAgIGNvbnN0IHByZXNlcnZlV2hpdGVzcGFjZUZvciA9IHtcbiAgICAgIFt0b2tlblR5cGVzLk9QRU5fUEFSRU5dOiB0cnVlLFxuICAgICAgW3Rva2VuVHlwZXMuTElORV9DT01NRU5UXTogdHJ1ZSxcbiAgICAgIFt0b2tlblR5cGVzLk9QRVJBVE9SXTogdHJ1ZSxcbiAgICB9O1xuICAgIGlmIChcbiAgICAgIHRva2VuLndoaXRlc3BhY2VCZWZvcmUubGVuZ3RoID09PSAwICYmXG4gICAgICAhcHJlc2VydmVXaGl0ZXNwYWNlRm9yW3RoaXMudG9rZW5Mb29rQmVoaW5kKCk/LnR5cGVdXG4gICAgKSB7XG4gICAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpO1xuICAgIH1cbiAgICBxdWVyeSArPSB0aGlzLnNob3codG9rZW4pO1xuXG4gICAgdGhpcy5pbmxpbmVCbG9jay5iZWdpbklmUG9zc2libGUodGhpcy50b2tlbnMsIHRoaXMuaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuaW5kZW50YXRpb24uaW5jcmVhc2VCbG9ja0xldmVsKCk7XG4gICAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIC8vIENsb3NpbmcgcGFyZW50aGVzZXMgZGVjcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbFxuICBmb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgaWYgKHRoaXMuaW5saW5lQmxvY2suaXNBY3RpdmUoKSkge1xuICAgICAgdGhpcy5pbmxpbmVCbG9jay5lbmQoKTtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VCbG9ja0xldmVsKCk7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCB0aGlzLmFkZE5ld2xpbmUocXVlcnkpKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRQbGFjZWhvbGRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnBhcmFtcy5nZXQodG9rZW4pICsgJyAnO1xuICB9XG5cbiAgLy8gQ29tbWFzIHN0YXJ0IGEgbmV3IGxpbmUgKHVubGVzcyB3aXRoaW4gaW5saW5lIHBhcmVudGhlc2VzIG9yIFNRTCBcIkxJTUlUXCIgY2xhdXNlKVxuICBmb3JtYXRDb21tYSh0b2tlbiwgcXVlcnkpIHtcbiAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICcgJztcblxuICAgIGlmICh0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9IGVsc2UgaWYgKGlzTGltaXQodGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4pKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFdpdGhTcGFjZUFmdGVyKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnICc7XG4gIH1cblxuICBmb3JtYXRXaXRob3V0U3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbik7XG4gIH1cblxuICBmb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeSArIHRoaXMuc2hvdyh0b2tlbikgKyAnICc7XG4gIH1cblxuICBmb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLnJlc2V0SW5kZW50YXRpb24oKTtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJ1xcbicucmVwZWF0KHRoaXMuY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgfHwgMSk7XG4gIH1cblxuICAvLyBDb252ZXJ0cyB0b2tlbiB0byBzdHJpbmcgKHVwcGVyY2FzaW5nIGl0IGlmIG5lZWRlZClcbiAgc2hvdyh7IHR5cGUsIHZhbHVlIH0pIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNmZy51cHBlcmNhc2UgJiZcbiAgICAgICh0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVOX1BBUkVOIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGFkZE5ld2xpbmUocXVlcnkpIHtcbiAgICBxdWVyeSA9IHRyaW1TcGFjZXNFbmQocXVlcnkpO1xuICAgIGlmICghcXVlcnkuZW5kc1dpdGgoJ1xcbicpKSB7XG4gICAgICBxdWVyeSArPSAnXFxuJztcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5pbmRlbnRhdGlvbi5nZXRJbmRlbnQoKTtcbiAgfVxuXG4gIHRva2VuTG9va0JlaGluZChuID0gMSkge1xuICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmluZGV4IC0gbl07XG4gIH1cblxuICB0b2tlbkxvb2tBaGVhZChuID0gMSkge1xuICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmluZGV4ICsgbl07XG4gIH1cbn1cbiIsImltcG9ydCB7IGxhc3QgfSBmcm9tICcuLi91dGlscyc7XG5cbmNvbnN0IElOREVOVF9UWVBFX1RPUF9MRVZFTCA9ICd0b3AtbGV2ZWwnO1xuY29uc3QgSU5ERU5UX1RZUEVfQkxPQ0tfTEVWRUwgPSAnYmxvY2stbGV2ZWwnO1xuXG4vKipcbiAqIE1hbmFnZXMgaW5kZW50YXRpb24gbGV2ZWxzLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gdHlwZXMgb2YgaW5kZW50YXRpb24gbGV2ZWxzOlxuICpcbiAqIC0gQkxPQ0tfTEVWRUwgOiBpbmNyZWFzZWQgYnkgb3Blbi1wYXJlbnRoZXNpc1xuICogLSBUT1BfTEVWRUwgOiBpbmNyZWFzZWQgYnkgUkVTRVJWRURfVE9QX0xFVkVMIHdvcmRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGVudGF0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbmRlbnQgSW5kZW50IHZhbHVlLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbmRlbnQpIHtcbiAgICB0aGlzLmluZGVudCA9IGluZGVudCB8fCAnICAnO1xuICAgIHRoaXMuaW5kZW50VHlwZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGN1cnJlbnQgaW5kZW50YXRpb24gc3RyaW5nLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICBnZXRJbmRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZW50LnJlcGVhdCh0aGlzLmluZGVudFR5cGVzLmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSB0b3AtbGV2ZWwgaW5kZW50LlxuICAgKi9cbiAgaW5jcmVhc2VUb3BMZXZlbCgpIHtcbiAgICB0aGlzLmluZGVudFR5cGVzLnB1c2goSU5ERU5UX1RZUEVfVE9QX0xFVkVMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIGJsb2NrLWxldmVsIGluZGVudC5cbiAgICovXG4gIGluY3JlYXNlQmxvY2tMZXZlbCgpIHtcbiAgICB0aGlzLmluZGVudFR5cGVzLnB1c2goSU5ERU5UX1RZUEVfQkxPQ0tfTEVWRUwpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgdG9wLWxldmVsIGluZGVudC5cbiAgICogRG9lcyBub3RoaW5nIHdoZW4gdGhlIHByZXZpb3VzIGluZGVudCBpcyBub3QgdG9wLWxldmVsLlxuICAgKi9cbiAgZGVjcmVhc2VUb3BMZXZlbCgpIHtcbiAgICBpZiAodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGggPiAwICYmIGxhc3QodGhpcy5pbmRlbnRUeXBlcykgPT09IElOREVOVF9UWVBFX1RPUF9MRVZFTCkge1xuICAgICAgdGhpcy5pbmRlbnRUeXBlcy5wb3AoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVjcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSBibG9jay1sZXZlbCBpbmRlbnQuXG4gICAqIElmIHRoZXJlIGFyZSB0b3AtbGV2ZWwgaW5kZW50cyB3aXRoaW4gdGhlIGJsb2NrLWxldmVsIGluZGVudCxcbiAgICogdGhyb3dzIGF3YXkgdGhlc2UgYXMgd2VsbC5cbiAgICovXG4gIGRlY3JlYXNlQmxvY2tMZXZlbCgpIHtcbiAgICB3aGlsZSAodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0eXBlID0gdGhpcy5pbmRlbnRUeXBlcy5wb3AoKTtcbiAgICAgIGlmICh0eXBlICE9PSBJTkRFTlRfVFlQRV9UT1BfTEVWRUwpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRJbmRlbnRhdGlvbigpIHtcbiAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gIH1cbn1cbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5cbmNvbnN0IElOTElORV9NQVhfTEVOR1RIID0gNTA7XG5cbi8qKlxuICogQm9va2tlZXBlciBmb3IgaW5saW5lIGJsb2Nrcy5cbiAqXG4gKiBJbmxpbmUgYmxvY2tzIGFyZSBwYXJlbnRoaXplZCBleHByZXNzaW9ucyB0aGF0IGFyZSBzaG9ydGVyIHRoYW4gSU5MSU5FX01BWF9MRU5HVEguXG4gKiBUaGVzZSBibG9ja3MgYXJlIGZvcm1hdHRlZCBvbiBhIHNpbmdsZSBsaW5lLCB1bmxpa2UgbG9uZ2VyIHBhcmVudGhpemVkXG4gKiBleHByZXNzaW9ucyB3aGVyZSBvcGVuLXBhcmVudGhlc2lzIGNhdXNlcyBuZXdsaW5lIGFuZCBpbmNyZWFzZSBvZiBpbmRlbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lQmxvY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxldmVsID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCZWdpbnMgaW5saW5lIGJsb2NrIHdoZW4gbG9va2FoZWFkIHRocm91Z2ggdXBjb21pbmcgdG9rZW5zIGRldGVybWluZXNcbiAgICogdGhhdCB0aGUgYmxvY2sgd291bGQgYmUgc21hbGxlciB0aGFuIElOTElORV9NQVhfTEVOR1RILlxuICAgKiBAcGFyYW0gIHtPYmplY3RbXX0gdG9rZW5zIEFycmF5IG9mIGFsbCB0b2tlbnNcbiAgICogQHBhcmFtICB7TnVtYmVyfSBpbmRleCBDdXJyZW50IHRva2VuIHBvc2l0aW9uXG4gICAqL1xuICBiZWdpbklmUG9zc2libGUodG9rZW5zLCBpbmRleCkge1xuICAgIGlmICh0aGlzLmxldmVsID09PSAwICYmIHRoaXMuaXNJbmxpbmVCbG9jayh0b2tlbnMsIGluZGV4KSkge1xuICAgICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxldmVsID4gMCkge1xuICAgICAgdGhpcy5sZXZlbCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxldmVsID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoZXMgY3VycmVudCBpbmxpbmUgYmxvY2suXG4gICAqIFRoZXJlIG1pZ2h0IGJlIHNldmVyYWwgbmVzdGVkIG9uZXMuXG4gICAqL1xuICBlbmQoKSB7XG4gICAgdGhpcy5sZXZlbC0tO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgd2hlbiBpbnNpZGUgYW4gaW5saW5lIGJsb2NrXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sZXZlbCA+IDA7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGlzIHNob3VsZCBiZSBhbiBpbmxpbmUgcGFyZW50aGVzZXMgYmxvY2tcbiAgLy8gRXhhbXBsZXMgYXJlIFwiTk9XKClcIiwgXCJDT1VOVCgqKVwiLCBcImludCgxMClcIiwga2V5KGBzb21lY29sdW1uYCksIERFQ0lNQUwoNywyKVxuICBpc0lubGluZUJsb2NrKHRva2VucywgaW5kZXgpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgbGV2ZWwgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIGxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG5cbiAgICAgIC8vIE92ZXJyYW4gbWF4IGxlbmd0aFxuICAgICAgaWYgKGxlbmd0aCA+IElOTElORV9NQVhfTEVOR1RIKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICBsZXZlbCsrO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGxldmVsLS07XG4gICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzRm9yYmlkZGVuVG9rZW4odG9rZW4pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUmVzZXJ2ZWQgd29yZHMgdGhhdCBjYXVzZSBuZXdsaW5lcywgY29tbWVudHMgYW5kIHNlbWljb2xvbnNcbiAgLy8gYXJlIG5vdCBhbGxvd2VkIGluc2lkZSBpbmxpbmUgcGFyZW50aGVzZXMgYmxvY2tcbiAgaXNGb3JiaWRkZW5Ub2tlbih7IHR5cGUsIHZhbHVlIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5DT01NRU5UIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLkJMT0NLX0NPTU1FTlQgfHxcbiAgICAgIHZhbHVlID09PSAnOydcbiAgICApO1xuICB9XG59XG4iLCIvKipcbiAqIEhhbmRsZXMgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnQgd2l0aCBnaXZlbiBwYXJhbXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFtcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHBhcmFtIHZhbHVlIHRoYXQgbWF0Y2hlcyBnaXZlbiBwbGFjZWhvbGRlciB3aXRoIHBhcmFtIGtleS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLmtleSBQbGFjZWhvbGRlciBrZXlcbiAgICogICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udmFsdWUgUGxhY2Vob2xkZXIgdmFsdWVcbiAgICogQHJldHVybiB7U3RyaW5nfSBwYXJhbSBvciB0b2tlbi52YWx1ZSB3aGVuIHBhcmFtcyBhcmUgbWlzc2luZ1xuICAgKi9cbiAgZ2V0KHsga2V5LCB2YWx1ZSB9KSB7XG4gICAgaWYgKCF0aGlzLnBhcmFtcykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpZiAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJhbXNba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zW3RoaXMuaW5kZXgrK107XG4gIH1cbn1cbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5pbXBvcnQgKiBhcyByZWdleEZhY3RvcnkgZnJvbSAnLi9yZWdleEZhY3RvcnknO1xuaW1wb3J0IHsgZXNjYXBlUmVnRXhwIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2tlbml6ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkV29yZHMgUmVzZXJ2ZWQgd29yZHMgaW4gU1FMXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzIFdvcmRzIHRoYXQgYXJlIHNldCB0byBuZXcgbGluZSBzZXBhcmF0ZWx5XG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMgV29yZHMgdGhhdCBhcmUgc2V0IHRvIG5ld2xpbmVcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCBXb3JkcyB0aGF0IGFyZSB0b3AgbGV2ZWwgYnV0IGhhdmUgbm8gaW5kZW50YXRpb25cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5zdHJpbmdUeXBlcyBTdHJpbmcgdHlwZXMgdG8gZW5hYmxlOiBcIlwiLCAnJywgYGAsIFtdLCBOJydcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5vcGVuUGFyZW5zIE9wZW5pbmcgcGFyZW50aGVzZXMgdG8gZW5hYmxlLCBsaWtlICgsIFtcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5jbG9zZVBhcmVucyBDbG9zaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSApLCBdXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXMgUHJlZml4ZXMgZm9yIGluZGV4ZWQgcGxhY2Vob2xkZXJzLCBsaWtlID9cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMgUHJlZml4ZXMgZm9yIG5hbWVkIHBsYWNlaG9sZGVycywgbGlrZSBAIGFuZCA6XG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubGluZUNvbW1lbnRUeXBlcyBMaW5lIGNvbW1lbnRzIHRvIGVuYWJsZSwgbGlrZSAjIGFuZCAtLVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnNwZWNpYWxXb3JkQ2hhcnMgU3BlY2lhbCBjaGFycyB0aGF0IGNhbiBiZSBmb3VuZCBpbnNpZGUgb2Ygd29yZHMsIGxpa2UgQCBhbmQgI1xuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gW2NmZy5vcGVyYXRvcl0gQWRkaXRpb25hbCBvcGVyYXRvcnMgdG8gcmVjb2duaXplXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjZmcpIHtcbiAgICB0aGlzLldISVRFU1BBQ0VfUkVHRVggPSAvXihcXHMrKS91O1xuICAgIHRoaXMuTlVNQkVSX1JFR0VYID0gL14oKC1cXHMqKT9bMC05XSsoXFwuWzAtOV0rKT8oW2VFXS0/WzAtOV0rKFxcLlswLTldKyk/KT98MHhbMC05YS1mQS1GXSt8MGJbMDFdKylcXGIvdTtcblxuICAgIHRoaXMuT1BFUkFUT1JfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlT3BlcmF0b3JSZWdleChbXG4gICAgICAnPD4nLFxuICAgICAgJzw9JyxcbiAgICAgICc+PScsXG4gICAgICAuLi4oY2ZnLm9wZXJhdG9ycyB8fCBbXSksXG4gICAgXSk7XG5cbiAgICB0aGlzLkJMT0NLX0NPTU1FTlRfUkVHRVggPSAvXihcXC9cXCpbXl0qPyg/OlxcKlxcL3wkKSkvdTtcbiAgICB0aGlzLkxJTkVfQ09NTUVOVF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVMaW5lQ29tbWVudFJlZ2V4KGNmZy5saW5lQ29tbWVudFR5cGVzKTtcblxuICAgIHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHMpO1xuICAgIHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChcbiAgICAgIGNmZy5yZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudFxuICAgICk7XG4gICAgdGhpcy5SRVNFUlZFRF9ORVdMSU5FX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KGNmZy5yZXNlcnZlZE5ld2xpbmVXb3Jkcyk7XG4gICAgdGhpcy5SRVNFUlZFRF9QTEFJTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRXb3Jkcyk7XG5cbiAgICB0aGlzLldPUkRfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlV29yZFJlZ2V4KGNmZy5zcGVjaWFsV29yZENoYXJzKTtcbiAgICB0aGlzLlNUUklOR19SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVTdHJpbmdSZWdleChjZmcuc3RyaW5nVHlwZXMpO1xuXG4gICAgdGhpcy5PUEVOX1BBUkVOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBhcmVuUmVnZXgoY2ZnLm9wZW5QYXJlbnMpO1xuICAgIHRoaXMuQ0xPU0VfUEFSRU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGFyZW5SZWdleChjZmcuY2xvc2VQYXJlbnMpO1xuXG4gICAgdGhpcy5JTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgoXG4gICAgICBjZmcuaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICAnWzAtOV0qJ1xuICAgICk7XG4gICAgdGhpcy5JREVOVF9OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KFxuICAgICAgY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgICdbYS16QS1aMC05Ll8kXSsnXG4gICAgKTtcbiAgICB0aGlzLlNUUklOR19OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KFxuICAgICAgY2ZnLm5hbWVkUGxhY2Vob2xkZXJUeXBlcyxcbiAgICAgIHJlZ2V4RmFjdG9yeS5jcmVhdGVTdHJpbmdQYXR0ZXJuKGNmZy5zdHJpbmdUeXBlcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgU1FMIHN0cmluZyBhbmQgYnJlYWtzIGl0IGludG8gdG9rZW5zLlxuICAgKiBFYWNoIHRva2VuIGlzIGFuIG9iamVjdCB3aXRoIHR5cGUgYW5kIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFNRTCBzdHJpbmdcbiAgICogQHJldHVybiB7T2JqZWN0W119IHRva2VucyBBbiBhcnJheSBvZiB0b2tlbnMuXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4ud2hpdGVzcGFjZUJlZm9yZSBQcmVjZWRpbmcgd2hpdGVzcGFjZVxuICAgKi9cbiAgdG9rZW5pemUoaW5wdXQpIHtcbiAgICBjb25zdCB0b2tlbnMgPSBbXTtcbiAgICBsZXQgdG9rZW47XG5cbiAgICAvLyBLZWVwIHByb2Nlc3NpbmcgdGhlIHN0cmluZyB1bnRpbCBpdCBpcyBlbXB0eVxuICAgIHdoaWxlIChpbnB1dC5sZW5ndGgpIHtcbiAgICAgIC8vIGdyYWIgYW55IHByZWNlZGluZyB3aGl0ZXNwYWNlXG4gICAgICBjb25zdCB3aGl0ZXNwYWNlQmVmb3JlID0gdGhpcy5nZXRXaGl0ZXNwYWNlKGlucHV0KTtcbiAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKHdoaXRlc3BhY2VCZWZvcmUubGVuZ3RoKTtcblxuICAgICAgaWYgKGlucHV0Lmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIG5leHQgdG9rZW4gYW5kIHRoZSB0b2tlbiB0eXBlXG4gICAgICAgIHRva2VuID0gdGhpcy5nZXROZXh0VG9rZW4oaW5wdXQsIHRva2VuKTtcbiAgICAgICAgLy8gQWR2YW5jZSB0aGUgc3RyaW5nXG4gICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKHRva2VuLnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgdG9rZW5zLnB1c2goeyAuLi50b2tlbiwgd2hpdGVzcGFjZUJlZm9yZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIGdldFdoaXRlc3BhY2UoaW5wdXQpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gaW5wdXQubWF0Y2godGhpcy5XSElURVNQQUNFX1JFR0VYKTtcbiAgICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiAnJztcbiAgfVxuXG4gIGdldE5leHRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldENvbW1lbnRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE9wZW5QYXJlblRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRDbG9zZVBhcmVuVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE51bWJlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRSZXNlcnZlZFdvcmRUb2tlbihpbnB1dCwgcHJldmlvdXNUb2tlbikgfHxcbiAgICAgIHRoaXMuZ2V0V29yZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRPcGVyYXRvclRva2VuKGlucHV0KVxuICAgICk7XG4gIH1cblxuICBnZXRDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMaW5lQ29tbWVudFRva2VuKGlucHV0KSB8fCB0aGlzLmdldEJsb2NrQ29tbWVudFRva2VuKGlucHV0KTtcbiAgfVxuXG4gIGdldExpbmVDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuTElORV9DT01NRU5ULFxuICAgICAgcmVnZXg6IHRoaXMuTElORV9DT01NRU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QmxvY2tDb21tZW50VG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuQkxPQ0tfQ09NTUVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLkJMT0NLX0NPTU1FTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRTdHJpbmdUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5TVFJJTkcsXG4gICAgICByZWdleDogdGhpcy5TVFJJTkdfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5PUEVOX1BBUkVOLFxuICAgICAgcmVnZXg6IHRoaXMuT1BFTl9QQVJFTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsb3NlUGFyZW5Ub2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5DTE9TRV9QQVJFTixcbiAgICAgIHJlZ2V4OiB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KVxuICAgICk7XG4gIH1cblxuICBnZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyVG9rZW5XaXRoS2V5KHtcbiAgICAgIGlucHV0LFxuICAgICAgcmVnZXg6IHRoaXMuSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+IHYuc2xpY2UoMSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRTdHJpbmdOYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLlNUUklOR19OQU1FRF9QTEFDRUhPTERFUl9SRUdFWCxcbiAgICAgIHBhcnNlS2V5OiAodikgPT5cbiAgICAgICAgdGhpcy5nZXRFc2NhcGVkUGxhY2Vob2xkZXJLZXkoeyBrZXk6IHYuc2xpY2UoMiwgLTEpLCBxdW90ZUNoYXI6IHYuc2xpY2UoLTEpIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLklOREVYRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+IHYuc2xpY2UoMSksXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7IGlucHV0LCByZWdleCwgcGFyc2VLZXkgfSkge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7IGlucHV0LCByZWdleCwgdHlwZTogdG9rZW5UeXBlcy5QTEFDRUhPTERFUiB9KTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHRva2VuLmtleSA9IHBhcnNlS2V5KHRva2VuLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgZ2V0RXNjYXBlZFBsYWNlaG9sZGVyS2V5KHsga2V5LCBxdW90ZUNoYXIgfSkge1xuICAgIHJldHVybiBrZXkucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCgnXFxcXCcgKyBxdW90ZUNoYXIpLCAnZ3UnKSwgcXVvdGVDaGFyKTtcbiAgfVxuXG4gIC8vIERlY2ltYWwsIGJpbmFyeSwgb3IgaGV4IG51bWJlcnNcbiAgZ2V0TnVtYmVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuTlVNQkVSLFxuICAgICAgcmVnZXg6IHRoaXMuTlVNQkVSX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUHVuY3R1YXRpb24gYW5kIHN5bWJvbHNcbiAgZ2V0T3BlcmF0b3JUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5PUEVSQVRPUixcbiAgICAgIHJlZ2V4OiB0aGlzLk9QRVJBVE9SX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICAvLyBBIHJlc2VydmVkIHdvcmQgY2Fubm90IGJlIHByZWNlZGVkIGJ5IGEgXCIuXCJcbiAgICAvLyB0aGlzIG1ha2VzIGl0IHNvIGluIFwibXl0YWJsZS5mcm9tXCIsIFwiZnJvbVwiIGlzIG5vdCBjb25zaWRlcmVkIGEgcmVzZXJ2ZWQgd29yZFxuICAgIGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4udmFsdWUgJiYgcHJldmlvdXNUb2tlbi52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldE5ld2xpbmVSZXNlcnZlZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRUb3BMZXZlbFJlc2VydmVkVG9rZW5Ob0luZGVudChpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UGxhaW5SZXNlcnZlZFRva2VuKGlucHV0KVxuICAgICk7XG4gIH1cblxuICBnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMLFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX05FV0xJTkVfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW5Ob0luZGVudChpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5ULFxuICAgICAgcmVnZXg6IHRoaXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWluUmVzZXJ2ZWRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1BMQUlOX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0V29yZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLldPUkQsXG4gICAgICByZWdleDogdGhpcy5XT1JEX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9rZW5PbkZpcnN0TWF0Y2goeyBpbnB1dCwgdHlwZSwgcmVnZXggfSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBpbnB1dC5tYXRjaChyZWdleCk7XG5cbiAgICByZXR1cm4gbWF0Y2hlcyA/IHsgdHlwZSwgdmFsdWU6IG1hdGNoZXNbMV0gfSA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZXNjYXBlUmVnRXhwLCBpc0VtcHR5LCBzb3J0QnlMZW5ndGhEZXNjIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3BlcmF0b3JSZWdleChtdWx0aUxldHRlck9wZXJhdG9ycykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICBgXigke3NvcnRCeUxlbmd0aERlc2MobXVsdGlMZXR0ZXJPcGVyYXRvcnMpLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKX18LilgLFxuICAgICd1J1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGluZUNvbW1lbnRSZWdleChsaW5lQ29tbWVudFR5cGVzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFxuICAgIGBeKCg/OiR7bGluZUNvbW1lbnRUeXBlcy5tYXAoKGMpID0+IGVzY2FwZVJlZ0V4cChjKSkuam9pbignfCcpfSkuKj8pKD86XFxyXFxufFxccnxcXG58JClgLFxuICAgICd1J1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgocmVzZXJ2ZWRXb3Jkcykge1xuICBpZiAocmVzZXJ2ZWRXb3Jkcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChgXlxcYiRgLCAndScpO1xuICB9XG4gIGNvbnN0IHJlc2VydmVkV29yZHNQYXR0ZXJuID0gc29ydEJ5TGVuZ3RoRGVzYyhyZXNlcnZlZFdvcmRzKS5qb2luKCd8JykucmVwbGFjZSgvIC9ndSwgJ1xcXFxzKycpO1xuICByZXR1cm4gbmV3IFJlZ0V4cChgXigke3Jlc2VydmVkV29yZHNQYXR0ZXJufSlcXFxcYmAsICdpdScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZFJlZ2V4KHNwZWNpYWxDaGFycyA9IFtdKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFxuICAgIGBeKFtcXFxccHtBbHBoYWJldGljfVxcXFxwe01hcmt9XFxcXHB7RGVjaW1hbF9OdW1iZXJ9XFxcXHB7Q29ubmVjdG9yX1B1bmN0dWF0aW9ufVxcXFxwe0pvaW5fQ29udHJvbH0ke3NwZWNpYWxDaGFycy5qb2luKFxuICAgICAgJydcbiAgICApfV0rKWAsXG4gICAgJ3UnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJpbmdSZWdleChzdHJpbmdUeXBlcykge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnXignICsgY3JlYXRlU3RyaW5nUGF0dGVybihzdHJpbmdUeXBlcykgKyAnKScsICd1Jyk7XG59XG5cbi8vIFRoaXMgZW5hYmxlcyB0aGUgZm9sbG93aW5nIHN0cmluZyBwYXR0ZXJuczpcbi8vIDEuIGJhY2t0aWNrIHF1b3RlZCBzdHJpbmcgdXNpbmcgYGAgdG8gZXNjYXBlXG4vLyAyLiBzcXVhcmUgYnJhY2tldCBxdW90ZWQgc3RyaW5nIChTUUwgU2VydmVyKSB1c2luZyBdXSB0byBlc2NhcGVcbi8vIDMuIGRvdWJsZSBxdW90ZWQgc3RyaW5nIHVzaW5nIFwiXCIgb3IgXFxcIiB0byBlc2NhcGVcbi8vIDQuIHNpbmdsZSBxdW90ZWQgc3RyaW5nIHVzaW5nICcnIG9yIFxcJyB0byBlc2NhcGVcbi8vIDUuIG5hdGlvbmFsIGNoYXJhY3RlciBxdW90ZWQgc3RyaW5nIHVzaW5nIE4nJyBvciBOXFwnIHRvIGVzY2FwZVxuLy8gNi4gVW5pY29kZSBzaW5nbGUtcXVvdGVkIHN0cmluZyB1c2luZyBcXCcgdG8gZXNjYXBlXG4vLyA3LiBVbmljb2RlIGRvdWJsZS1xdW90ZWQgc3RyaW5nIHVzaW5nIFxcXCIgdG8gZXNjYXBlXG4vLyA4LiBQb3N0Z3JlU1FMIGRvbGxhci1xdW90ZWQgc3RyaW5nc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1BhdHRlcm4oc3RyaW5nVHlwZXMpIHtcbiAgY29uc3QgcGF0dGVybnMgPSB7XG4gICAgJ2BgJzogJygoYFteYF0qKCR8YCkpKyknLFxuICAgICd7fSc6ICcoKFxcXFx7W15cXFxcfV0qKCR8XFxcXH0pKSspJyxcbiAgICAnW10nOiAnKChcXFxcW1teXFxcXF1dKigkfFxcXFxdKSkoXFxcXF1bXlxcXFxdXSooJHxcXFxcXSkpKiknLFxuICAgICdcIlwiJzogJygoXCJbXlwiXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteXCJcXFxcXFxcXF0qKSooXCJ8JCkpKyknLFxuICAgIFwiJydcIjogXCIoKCdbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICBcIk4nJ1wiOiBcIigoTidbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICBcIlUmJydcIjogXCIoKFUmJ1teJ1xcXFxcXFxcXSooPzpcXFxcXFxcXC5bXidcXFxcXFxcXF0qKSooJ3wkKSkrKVwiLFxuICAgICdVJlwiXCInOiAnKChVJlwiW15cIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlwiXFxcXFxcXFxdKikqKFwifCQpKSspJyxcbiAgICAkJDogJygoPzx0YWc+XFxcXCRcXFxcdypcXFxcJClbXFxcXHNcXFxcU10qPyg/OlxcXFxrPHRhZz58JCkpJyxcbiAgfTtcblxuICByZXR1cm4gc3RyaW5nVHlwZXMubWFwKCh0KSA9PiBwYXR0ZXJuc1t0XSkuam9pbignfCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFyZW5SZWdleChwYXJlbnMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14oJyArIHBhcmVucy5tYXAoZXNjYXBlUGFyZW4pLmpvaW4oJ3wnKSArICcpJywgJ2l1Jyk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVBhcmVuKHBhcmVuKSB7XG4gIGlmIChwYXJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBBIHNpbmdsZSBwdW5jdHVhdGlvbiBjaGFyYWN0ZXJcbiAgICByZXR1cm4gZXNjYXBlUmVnRXhwKHBhcmVuKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBsb25nZXIgd29yZFxuICAgIHJldHVybiAnXFxcXGInICsgcGFyZW4gKyAnXFxcXGInO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGFjZWhvbGRlclJlZ2V4KHR5cGVzLCBwYXR0ZXJuKSB7XG4gIGlmIChpc0VtcHR5KHR5cGVzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCB0eXBlc1JlZ2V4ID0gdHlwZXMubWFwKGVzY2FwZVJlZ0V4cCkuam9pbignfCcpO1xuXG4gIHJldHVybiBuZXcgUmVnRXhwKGBeKCg/OiR7dHlwZXNSZWdleH0pKD86JHtwYXR0ZXJufSkpYCwgJ3UnKTtcbn1cbiIsImltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4vdG9rZW5UeXBlcyc7XG5cbmNvbnN0IGlzVG9rZW4gPSAodHlwZSwgcmVnZXgpID0+ICh0b2tlbikgPT4gdG9rZW4/LnR5cGUgPT09IHR5cGUgJiYgcmVnZXgudGVzdCh0b2tlbj8udmFsdWUpO1xuXG5leHBvcnQgY29uc3QgaXNBbmQgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRURfTkVXTElORSwgL15BTkQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzQmV0d2VlbiA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRCwgL15CRVRXRUVOJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0xpbWl0ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15MSU1JVCQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNTZXQgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMLCAvXlNFVCQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNCeSA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRCwgL15CWSQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNXaW5kb3cgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMLCAvXldJTkRPVyQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNFbmQgPSBpc1Rva2VuKHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4sIC9eRU5EJC9pdSk7XG4iLCIvKipcbiAqIENvbnN0YW50cyBmb3IgdG9rZW4gdHlwZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBXT1JEOiAnd29yZCcsXG4gIFNUUklORzogJ3N0cmluZycsXG4gIFJFU0VSVkVEOiAncmVzZXJ2ZWQnLFxuICBSRVNFUlZFRF9UT1BfTEVWRUw6ICdyZXNlcnZlZC10b3AtbGV2ZWwnLFxuICBSRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UOiAncmVzZXJ2ZWQtdG9wLWxldmVsLW5vLWluZGVudCcsXG4gIFJFU0VSVkVEX05FV0xJTkU6ICdyZXNlcnZlZC1uZXdsaW5lJyxcbiAgT1BFUkFUT1I6ICdvcGVyYXRvcicsXG4gIE9QRU5fUEFSRU46ICdvcGVuLXBhcmVuJyxcbiAgQ0xPU0VfUEFSRU46ICdjbG9zZS1wYXJlbicsXG4gIExJTkVfQ09NTUVOVDogJ2xpbmUtY29tbWVudCcsXG4gIEJMT0NLX0NPTU1FTlQ6ICdibG9jay1jb21tZW50JyxcbiAgTlVNQkVSOiAnbnVtYmVyJyxcbiAgUExBQ0VIT0xERVI6ICdwbGFjZWhvbGRlcicsXG59O1xuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FCUycsXG4gICdBQ1RJVkFURScsXG4gICdBTElBUycsXG4gICdBTEwnLFxuICAnQUxMT0NBVEUnLFxuICAnQUxMT1cnLFxuICAnQUxURVInLFxuICAnQU5ZJyxcbiAgJ0FSRScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNFTlNJVElWRScsXG4gICdBU1NPQ0lBVEUnLFxuICAnQVNVVElNRScsXG4gICdBU1lNTUVUUklDJyxcbiAgJ0FUJyxcbiAgJ0FUT01JQycsXG4gICdBVFRSSUJVVEVTJyxcbiAgJ0FVRElUJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQVVYJyxcbiAgJ0FVWElMSUFSWScsXG4gICdBVkcnLFxuICAnQkVGT1JFJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCVUZGRVJQT09MJyxcbiAgJ0JZJyxcbiAgJ0NBQ0hFJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBUFRVUkUnLFxuICAnQ0FSRElOQUxJVFknLFxuICAnQ0FTQ0FERUQnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NDU0lEJyxcbiAgJ0NFSUwnLFxuICAnQ0VJTElORycsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSQUNURVJfTEVOR1RIJyxcbiAgJ0NIQVJfTEVOR1RIJyxcbiAgJ0NIRUNLJyxcbiAgJ0NMT0InLFxuICAnQ0xPTkUnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MTEVDVElPTicsXG4gICdDT0xMSUQnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTkNBVCcsXG4gICdDT05ESVRJT04nLFxuICAnQ09OTkVDVCcsXG4gICdDT05ORUNUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDT1JSJyxcbiAgJ0NPUlJFU1BPTkRJTkcnLFxuICAnQ09VTlQnLFxuICAnQ09VTlRfQklHJyxcbiAgJ0NPVkFSX1BPUCcsXG4gICdDT1ZBUl9TQU1QJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVUJFJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQJyxcbiAgJ0NVUlJFTlRfTENfQ1RZUEUnLFxuICAnQ1VSUkVOVF9QQVRIJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1NDSEVNQScsXG4gICdDVVJSRU5UX1NFUlZFUicsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9USU1FWk9ORScsXG4gICdDVVJSRU5UX1RSQU5TRk9STV9HUk9VUF9GT1JfVFlQRScsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0NZQ0xFJyxcbiAgJ0RBVEEnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQVBBUlRJVElPTk5BTUUnLFxuICAnREFUQVBBUlRJVElPTk5VTScsXG4gICdEQVRFJyxcbiAgJ0RBWScsXG4gICdEQVlTJyxcbiAgJ0RCMkdFTkVSQUwnLFxuICAnREIyR0VOUkwnLFxuICAnREIyU1FMJyxcbiAgJ0RCSU5GTycsXG4gICdEQlBBUlRJVElPTk5BTUUnLFxuICAnREJQQVJUSVRJT05OVU0nLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGQVVMVFMnLFxuICAnREVGSU5JVElPTicsXG4gICdERUxFVEUnLFxuICAnREVOU0VSQU5LJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVSRUYnLFxuICAnREVTQ1JJQkUnLFxuICAnREVTQ1JJUFRPUicsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJQUdOT1NUSUNTJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTQUxMT1cnLFxuICAnRElTQ09OTkVDVCcsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET0NVTUVOVCcsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEU1NJWkUnLFxuICAnRFlOQU1JQycsXG4gICdFQUNIJyxcbiAgJ0VESVRQUk9DJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTRScsXG4gICdFTFNFSUYnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRJT04nLFxuICAnRU5EJyxcbiAgJ0VORC1FWEVDJyxcbiAgJ0VORElORycsXG4gICdFUkFTRScsXG4gICdFU0NBUEUnLFxuICAnRVZFUlknLFxuICAnRVhDRVBUSU9OJyxcbiAgJ0VYQ0xVRElORycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQycsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYUCcsXG4gICdFWFBMQUlOJyxcbiAgJ0VYVEVOREVEJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkVOQ0VEJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJRUxEUFJPQycsXG4gICdGSUxFJyxcbiAgJ0ZJTFRFUicsXG4gICdGSU5BTCcsXG4gICdGSVJTVCcsXG4gICdGTE9BVCcsXG4gICdGTE9PUicsXG4gICdGT1InLFxuICAnRk9SRUlHTicsXG4gICdGUkVFJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVTSU9OJyxcbiAgJ0dFTkVSQUwnLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dFVCcsXG4gICdHTE9CQUwnLFxuICAnR09UTycsXG4gICdHUkFOVCcsXG4gICdHUkFQSElDJyxcbiAgJ0dST1VQJyxcbiAgJ0dST1VQSU5HJyxcbiAgJ0hBTkRMRVInLFxuICAnSEFTSCcsXG4gICdIQVNIRURfVkFMVUUnLFxuICAnSElOVCcsXG4gICdIT0xEJyxcbiAgJ0hPVVInLFxuICAnSE9VUlMnLFxuICAnSURFTlRJVFknLFxuICAnSUYnLFxuICAnSU1NRURJQVRFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVRElORycsXG4gICdJTkNMVVNJVkUnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lORElDQVRPUicsXG4gICdJTkRJQ0FUT1JTJyxcbiAgJ0lORicsXG4gICdJTkZJTklUWScsXG4gICdJTkhFUklUJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFR1JJVFknLFxuICAnSU5URVJTRUNUSU9OJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSVNPQklEJyxcbiAgJ0lTT0xBVElPTicsXG4gICdJVEVSQVRFJyxcbiAgJ0pBUicsXG4gICdKQVZBJyxcbiAgJ0tFRVAnLFxuICAnS0VZJyxcbiAgJ0xBQkVMJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBVEVSQUwnLFxuICAnTENfQ1RZUEUnLFxuICAnTEVBRElORycsXG4gICdMRUFWRScsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElOS1RZUEUnLFxuICAnTE4nLFxuICAnTE9DQUwnLFxuICAnTE9DQUxEQVRFJyxcbiAgJ0xPQ0FMRScsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9DQVRPUicsXG4gICdMT0NBVE9SUycsXG4gICdMT0NLJyxcbiAgJ0xPQ0tNQVgnLFxuICAnTE9DS1NJWkUnLFxuICAnTE9ORycsXG4gICdMT09QJyxcbiAgJ0xPV0VSJyxcbiAgJ01BSU5UQUlORUQnLFxuICAnTUFUQ0gnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01BWCcsXG4gICdNQVhWQUxVRScsXG4gICdNRU1CRVInLFxuICAnTUVSR0UnLFxuICAnTUVUSE9EJyxcbiAgJ01JQ1JPU0VDT05EJyxcbiAgJ01JQ1JPU0VDT05EUycsXG4gICdNSU4nLFxuICAnTUlOVVRFJyxcbiAgJ01JTlVURVMnLFxuICAnTUlOVkFMVUUnLFxuICAnTU9EJyxcbiAgJ01PREUnLFxuICAnTU9ESUZJRVMnLFxuICAnTU9EVUxFJyxcbiAgJ01PTlRIJyxcbiAgJ01PTlRIUycsXG4gICdNVUxUSVNFVCcsXG4gICdOQU4nLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUVVJBTCcsXG4gICdOQ0hBUicsXG4gICdOQ0xPQicsXG4gICdORVcnLFxuICAnTkVXX1RBQkxFJyxcbiAgJ05FWFRWQUwnLFxuICAnTk8nLFxuICAnTk9DQUNIRScsXG4gICdOT0NZQ0xFJyxcbiAgJ05PREVOQU1FJyxcbiAgJ05PREVOVU1CRVInLFxuICAnTk9NQVhWQUxVRScsXG4gICdOT01JTlZBTFVFJyxcbiAgJ05PTkUnLFxuICAnTk9PUkRFUicsXG4gICdOT1JNQUxJWkUnLFxuICAnTk9STUFMSVpFRCcsXG4gICdOT1QnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVMTFMnLFxuICAnTlVNRVJJQycsXG4gICdOVU1QQVJUUycsXG4gICdPQklEJyxcbiAgJ09DVEVUX0xFTkdUSCcsXG4gICdPRicsXG4gICdPRkZTRVQnLFxuICAnT0xEJyxcbiAgJ09MRF9UQUJMRScsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRU4nLFxuICAnT1BUSU1JWkFUSU9OJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09QVElPTicsXG4gICdPUkRFUicsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSTEFZJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnUEFDS0FHRScsXG4gICdQQURERUQnLFxuICAnUEFHRVNJWkUnLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUlQnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBUlRJVElPTkVEJyxcbiAgJ1BBUlRJVElPTklORycsXG4gICdQQVJUSVRJT05TJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BBVEgnLFxuICAnUEVSQ0VOVElMRV9DT05UJyxcbiAgJ1BFUkNFTlRJTEVfRElTQycsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUElFQ0VTSVpFJyxcbiAgJ1BMQU4nLFxuICAnUE9TSVRJT04nLFxuICAnUE9XRVInLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJFVlZBTCcsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVFUWScsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQUk9HUkFNJyxcbiAgJ1BTSUQnLFxuICAnUFVCTElDJyxcbiAgJ1FVRVJZJyxcbiAgJ1FVRVJZTk8nLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUFEJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQUwnLFxuICAnUkVDT1ZFUlknLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFRlJFU0gnLFxuICAnUkVHUl9BVkdYJyxcbiAgJ1JFR1JfQVZHWScsXG4gICdSRUdSX0NPVU5UJyxcbiAgJ1JFR1JfSU5URVJDRVBUJyxcbiAgJ1JFR1JfUjInLFxuICAnUkVHUl9TTE9QRScsXG4gICdSRUdSX1NYWCcsXG4gICdSRUdSX1NYWScsXG4gICdSRUdSX1NZWScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVQnLFxuICAnUkVTRVQnLFxuICAnUkVTSUdOQUwnLFxuICAnUkVTVEFSVCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVNVTFQnLFxuICAnUkVTVUxUX1NFVF9MT0NBVE9SJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1VORF9DRUlMSU5HJyxcbiAgJ1JPVU5EX0RPV04nLFxuICAnUk9VTkRfRkxPT1InLFxuICAnUk9VTkRfSEFMRl9ET1dOJyxcbiAgJ1JPVU5EX0hBTEZfRVZFTicsXG4gICdST1VORF9IQUxGX1VQJyxcbiAgJ1JPVU5EX1VQJyxcbiAgJ1JPVVRJTkUnLFxuICAnUk9XJyxcbiAgJ1JPV05VTUJFUicsXG4gICdST1dTJyxcbiAgJ1JPV1NFVCcsXG4gICdST1dfTlVNQkVSJyxcbiAgJ1JSTicsXG4gICdSVU4nLFxuICAnU0FWRVBPSU5UJyxcbiAgJ1NDSEVNQScsXG4gICdTQ09QRScsXG4gICdTQ1JBVENIUEFEJyxcbiAgJ1NDUk9MTCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFQ09ORFMnLFxuICAnU0VDUVRZJyxcbiAgJ1NFQ1VSSVRZJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVFVRU5DRScsXG4gICdTRVNTSU9OJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTSUdOQUwnLFxuICAnU0lNSUxBUicsXG4gICdTSU1QTEUnLFxuICAnU01BTExJTlQnLFxuICAnU05BTicsXG4gICdTT01FJyxcbiAgJ1NPVVJDRScsXG4gICdTUEVDSUZJQycsXG4gICdTUEVDSUZJQ1RZUEUnLFxuICAnU1FMJyxcbiAgJ1NRTEVYQ0VQVElPTicsXG4gICdTUUxJRCcsXG4gICdTUUxTVEFURScsXG4gICdTUUxXQVJOSU5HJyxcbiAgJ1NRUlQnLFxuICAnU1RBQ0tFRCcsXG4gICdTVEFOREFSRCcsXG4gICdTVEFSVCcsXG4gICdTVEFSVElORycsXG4gICdTVEFURU1FTlQnLFxuICAnU1RBVElDJyxcbiAgJ1NUQVRNRU5UJyxcbiAgJ1NUQVknLFxuICAnU1REREVWX1BPUCcsXG4gICdTVERERVZfU0FNUCcsXG4gICdTVE9HUk9VUCcsXG4gICdTVE9SRVMnLFxuICAnU1RZTEUnLFxuICAnU1VCTVVMVElTRVQnLFxuICAnU1VCU1RSSU5HJyxcbiAgJ1NVTScsXG4gICdTVU1NQVJZJyxcbiAgJ1NZTU1FVFJJQycsXG4gICdTWU5PTllNJyxcbiAgJ1NZU0ZVTicsXG4gICdTWVNJQk0nLFxuICAnU1lTUFJPQycsXG4gICdTWVNURU0nLFxuICAnU1lTVEVNX1VTRVInLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnVEFCTEVTUEFDRScsXG4gICdUSEVOJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSQU5TTEFURScsXG4gICdUUkFOU0xBVElPTicsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1VFU0NBUEUnLFxuICAnVU5ETycsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTk5FU1QnLFxuICAnVU5USUwnLFxuICAnVVBQRVInLFxuICAnVVNBR0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJRFBST0MnLFxuICAnVkFMVUUnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJJQUJMRScsXG4gICdWQVJJQU5UJyxcbiAgJ1ZBUllJTkcnLFxuICAnVkFSX1BPUCcsXG4gICdWQVJfU0FNUCcsXG4gICdWQ0FUJyxcbiAgJ1ZFUlNJT04nLFxuICAnVklFVycsXG4gICdWT0xBVElMRScsXG4gICdWT0xVTUVTJyxcbiAgJ1dIRU4nLFxuICAnV0hFTkVWRVInLFxuICAnV0hJTEUnLFxuICAnV0lEVEhfQlVDS0VUJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1dMTScsXG4gICdXUklURScsXG4gICdYTUxFTEVNRU5UJyxcbiAgJ1hNTEVYSVNUUycsXG4gICdYTUxOQU1FU1BBQ0VTJyxcbiAgJ1lFQVInLFxuICAnWUVBUlMnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdHTycsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5URVJTRUNUJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ09SJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdGVUxMIEpPSU4nLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbl07XG5cbi8vIEZvciByZWZlcmVuY2U6IGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvZW4vc3N3X2libV9pXzcyL2RiMi9yYmFmemludHJvLmh0bVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGIyRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJywgJ1tdJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyc6J10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJyMnLCAnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbJyoqJywgJyE9JywgJyE+JywgJyE+JywgJ3x8J10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FERCcsXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQkVGT1JFJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CJyxcbiAgJ0JPVEgnLFxuICAnQlknLFxuICAnQ0FMTCcsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0UnLFxuICAnQ0hBTkdFJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIRUNLJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSUNST1NFQ09ORCcsXG4gICdEQVlfTUlOVVRFJyxcbiAgJ0RBWV9TRUNPTkQnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEFZRUQnLFxuICAnREVMRVRFJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNUSU5DVCcsXG4gICdESVNUSU5DVFJPVycsXG4gICdESVYnLFxuICAnRE9fRE9NQUlOX0lEUycsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEVUFMJyxcbiAgJ0VBQ0gnLFxuICAnRUxTRScsXG4gICdFTFNFSUYnLFxuICAnRU5DTE9TRUQnLFxuICAnRVNDQVBFRCcsXG4gICdFWENFUFQnLFxuICAnRVhJU1RTJyxcbiAgJ0VYSVQnLFxuICAnRVhQTEFJTicsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGTE9BVCcsXG4gICdGTE9BVDQnLFxuICAnRkxPQVQ4JyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZST00nLFxuICAnRlVMTFRFWFQnLFxuICAnR0VORVJBTCcsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdIQVZJTkcnLFxuICAnSElHSF9QUklPUklUWScsXG4gICdIT1VSX01JQ1JPU0VDT05EJyxcbiAgJ0hPVVJfTUlOVVRFJyxcbiAgJ0hPVVJfU0VDT05EJyxcbiAgJ0lGJyxcbiAgJ0lHTk9SRScsXG4gICdJR05PUkVfRE9NQUlOX0lEUycsXG4gICdJR05PUkVfU0VSVkVSX0lEUycsXG4gICdJTicsXG4gICdJTkRFWCcsXG4gICdJTkZJTEUnLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlQxJyxcbiAgJ0lOVDInLFxuICAnSU5UMycsXG4gICdJTlQ0JyxcbiAgJ0lOVDgnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdJVEVSQVRFJyxcbiAgJ0pPSU4nLFxuICAnS0VZJyxcbiAgJ0tFWVMnLFxuICAnS0lMTCcsXG4gICdMRUFESU5HJyxcbiAgJ0xFQVZFJyxcbiAgJ0xFRlQnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMSU5FQVInLFxuICAnTElORVMnLFxuICAnTE9BRCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9DSycsXG4gICdMT05HJyxcbiAgJ0xPTkdCTE9CJyxcbiAgJ0xPTkdURVhUJyxcbiAgJ0xPT1AnLFxuICAnTE9XX1BSSU9SSVRZJyxcbiAgJ01BU1RFUl9IRUFSVEJFQVRfUEVSSU9EJyxcbiAgJ01BU1RFUl9TU0xfVkVSSUZZX1NFUlZFUl9DRVJUJyxcbiAgJ01BVENIJyxcbiAgJ01BWFZBTFVFJyxcbiAgJ01FRElVTUJMT0InLFxuICAnTUVESVVNSU5UJyxcbiAgJ01FRElVTVRFWFQnLFxuICAnTUlERExFSU5UJyxcbiAgJ01JTlVURV9NSUNST1NFQ09ORCcsXG4gICdNSU5VVEVfU0VDT05EJyxcbiAgJ01PRCcsXG4gICdNT0RJRklFUycsXG4gICdOQVRVUkFMJyxcbiAgJ05PVCcsXG4gICdOT19XUklURV9UT19CSU5MT0cnLFxuICAnTlVMTCcsXG4gICdOVU1FUklDJyxcbiAgJ09OJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05BTExZJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVVRGSUxFJyxcbiAgJ09WRVInLFxuICAnUEFHRV9DSEVDS1NVTScsXG4gICdQQVJTRV9WQ09MX0VYUFInLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUklNQVJZJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVVJHRScsXG4gICdSQU5HRScsXG4gICdSRUFEJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQURfV1JJVEUnLFxuICAnUkVBTCcsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGX1NZU1RFTV9JRCcsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFR0VYUCcsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVQnLFxuICAnUkVQTEFDRScsXG4gICdSRVFVSVJFJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPV1MnLFxuICAnU0NIRU1BJyxcbiAgJ1NDSEVNQVMnLFxuICAnU0VDT05EX01JQ1JPU0VDT05EJyxcbiAgJ1NFTEVDVCcsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFVCcsXG4gICdTSE9XJyxcbiAgJ1NJR05BTCcsXG4gICdTTE9XJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NQQVRJQUwnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1FMJyxcbiAgJ1NRTEVYQ0VQVElPTicsXG4gICdTUUxTVEFURScsXG4gICdTUUxXQVJOSU5HJyxcbiAgJ1NRTF9CSUdfUkVTVUxUJyxcbiAgJ1NRTF9DQUxDX0ZPVU5EX1JPV1MnLFxuICAnU1FMX1NNQUxMX1JFU1VMVCcsXG4gICdTU0wnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVFNfQVVUT19SRUNBTEMnLFxuICAnU1RBVFNfUEVSU0lTVEVOVCcsXG4gICdTVEFUU19TQU1QTEVfUEFHRVMnLFxuICAnU1RSQUlHSFRfSk9JTicsXG4gICdUQUJMRScsXG4gICdURVJNSU5BVEVEJyxcbiAgJ1RIRU4nLFxuICAnVElOWUJMT0InLFxuICAnVElOWUlOVCcsXG4gICdUSU5ZVEVYVCcsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVU5ETycsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VQREFURScsXG4gICdVU0FHRScsXG4gICdVU0UnLFxuICAnVVNJTkcnLFxuICAnVVRDX0RBVEUnLFxuICAnVVRDX1RJTUUnLFxuICAnVVRDX1RJTUVTVEFNUCcsXG4gICdWQUxVRVMnLFxuICAnVkFSQklOQVJZJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSQ0hBUkFDVEVSJyxcbiAgJ1ZBUllJTkcnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElMRScsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXUklURScsXG4gICdYT1InLFxuICAnWUVBUl9NT05USCcsXG4gICdaRVJPRklMTCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnRUxTRScsXG4gICdPUicsXG4gICdXSEVOJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG4gIC8vIG5vbi1zdGFuZGFyZCBqb2luc1xuICAnU1RSQUlHSFRfSk9JTicsXG4gICdOQVRVUkFMIExFRlQgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbi8vIEZvciByZWZlcmVuY2U6IGh0dHBzOi8vbWFyaWFkYi5jb20va2IvZW4vc3FsLXN0YXRlbWVudHMtc3RydWN0dXJlL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFyaWFEYkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbJ2BgJywgXCInJ1wiLCAnXCJcIiddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFtdLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLScsICcjJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogWyc6PScsICc8PCcsICc+PicsICchPScsICc8PicsICc8PT4nLCAnJiYnLCAnfHwnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUREJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVNFTlNJVElWRScsXG4gICdCRUZPUkUnLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFOR0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVElOVUUnLFxuICAnQ09OVkVSVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VCRScsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVlfSE9VUicsXG4gICdEQVlfTUlDUk9TRUNPTkQnLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RFQycsXG4gICdERUNJTUFMJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVGQVVMVCcsXG4gICdERUxBWUVEJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNUSU5DVCcsXG4gICdESVNUSU5DVFJPVycsXG4gICdESVYnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFVBTCcsXG4gICdFQUNIJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VNUFRZJyxcbiAgJ0VOQ0xPU0VEJyxcbiAgJ0VTQ0FQRUQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYUExBSU4nLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklSU1RfVkFMVUUnLFxuICAnRkxPQVQnLFxuICAnRkxPQVQ0JyxcbiAgJ0ZMT0FUOCcsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGUk9NJyxcbiAgJ0ZVTExURVhUJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHRVQnLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnR1JPVVBTJyxcbiAgJ0hBVklORycsXG4gICdISUdIX1BSSU9SSVRZJyxcbiAgJ0hPVVJfTUlDUk9TRUNPTkQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lOJyxcbiAgJ0lOREVYJyxcbiAgJ0lORklMRScsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVDEnLFxuICAnSU5UMicsXG4gICdJTlQzJyxcbiAgJ0lOVDQnLFxuICAnSU5UOCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU9fQUZURVJfR1RJRFMnLFxuICAnSU9fQkVGT1JFX0dUSURTJyxcbiAgJ0lTJyxcbiAgJ0lURVJBVEUnLFxuICAnSk9JTicsXG4gICdKU09OX1RBQkxFJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tJTEwnLFxuICAnTEFHJyxcbiAgJ0xBU1RfVkFMVUUnLFxuICAnTEFURVJBTCcsXG4gICdMRUFEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xJTkVBUicsXG4gICdMSU5FUycsXG4gICdMT0FEJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTE9OR0JMT0InLFxuICAnTE9OR1RFWFQnLFxuICAnTE9PUCcsXG4gICdMT1dfUFJJT1JJVFknLFxuICAnTUFTVEVSX0JJTkQnLFxuICAnTUFTVEVSX1NTTF9WRVJJRllfU0VSVkVSX0NFUlQnLFxuICAnTUFUQ0gnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVESVVNQkxPQicsXG4gICdNRURJVU1JTlQnLFxuICAnTUVESVVNVEVYVCcsXG4gICdNSURETEVJTlQnLFxuICAnTUlOVVRFX01JQ1JPU0VDT05EJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTU9EJyxcbiAgJ01PRElGSUVTJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PX1dSSVRFX1RPX0JJTkxPRycsXG4gICdOVEhfVkFMVUUnLFxuICAnTlRJTEUnLFxuICAnTlVMTCcsXG4gICdOVU1FUklDJyxcbiAgJ09GJyxcbiAgJ09OJyxcbiAgJ09QVElNSVpFJyxcbiAgJ09QVElNSVpFUl9DT1NUUycsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OQUxMWScsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1VURklMRScsXG4gICdPVkVSJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSSU1BUlknLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BVUkdFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFEX1dSSVRFJyxcbiAgJ1JFQUwnLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVCcsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUVVJUkUnLFxuICAnUkVTSUdOQUwnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdSTElLRScsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdST1dfTlVNQkVSJyxcbiAgJ1NDSEVNQScsXG4gICdTQ0hFTUFTJyxcbiAgJ1NFQ09ORF9NSUNST1NFQ09ORCcsXG4gICdTRUxFQ1QnLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFUEFSQVRPUicsXG4gICdTRVQnLFxuICAnU0hPVycsXG4gICdTSUdOQUwnLFxuICAnU01BTExJTlQnLFxuICAnU1BBVElBTCcsXG4gICdTUEVDSUZJQycsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FMX0JJR19SRVNVTFQnLFxuICAnU1FMX0NBTENfRk9VTkRfUk9XUycsXG4gICdTUUxfU01BTExfUkVTVUxUJyxcbiAgJ1NTTCcsXG4gICdTVEFSVElORycsXG4gICdTVE9SRUQnLFxuICAnU1RSQUlHSFRfSk9JTicsXG4gICdTWVNURU0nLFxuICAnVEFCTEUnLFxuICAnVEVSTUlOQVRFRCcsXG4gICdUSEVOJyxcbiAgJ1RJTllCTE9CJyxcbiAgJ1RJTllJTlQnLFxuICAnVElOWVRFWFQnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1VORE8nLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOTE9DSycsXG4gICdVTlNJR05FRCcsXG4gICdVUERBVEUnLFxuICAnVVNBR0UnLFxuICAnVVNFJyxcbiAgJ1VTSU5HJyxcbiAgJ1VUQ19EQVRFJyxcbiAgJ1VUQ19USU1FJyxcbiAgJ1VUQ19USU1FU1RBTVAnLFxuICAnVkFMVUVTJyxcbiAgJ1ZBUkJJTkFSWScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUkNIQVJBQ1RFUicsXG4gICdWQVJZSU5HJyxcbiAgJ1ZJUlRVQUwnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElMRScsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXUklURScsXG4gICdYT1InLFxuICAnWUVBUl9NT05USCcsXG4gICdaRVJPRklMTCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnRUxTRScsXG4gICdPUicsXG4gICdXSEVOJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG4gIC8vIG5vbi1zdGFuZGFyZCBqb2luc1xuICAnU1RSQUlHSFRfSk9JTicsXG4gICdOQVRVUkFMIExFRlQgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFsnYGAnLCBcIicnXCIsICdcIlwiJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJywgJyMnXSxcbiAgICAgIHNwZWNpYWxXb3JkQ2hhcnM6IFsnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbJzo9JywgJzw8JywgJz4+JywgJyE9JywgJzw+JywgJzw9PicsICcmJicsICd8fCcsICctPicsICctPj4nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklOQVJZJyxcbiAgJ0JPT0xFQU4nLFxuICAnQlJFQUsnLFxuICAnQlVDS0VUJyxcbiAgJ0JVSUxEJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NMVVNURVInLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUSU9OJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPUlJFTEFURScsXG4gICdDT1ZFUicsXG4gICdDUkVBVEUnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQVNFVCcsXG4gICdEQVRBU1RPUkUnLFxuICAnREVDTEFSRScsXG4gICdERUNSRU1FTlQnLFxuICAnREVMRVRFJyxcbiAgJ0RFUklWRUQnLFxuICAnREVTQycsXG4gICdERVNDUklCRScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdEUk9QJyxcbiAgJ0VBQ0gnLFxuICAnRUxFTUVOVCcsXG4gICdFTFNFJyxcbiAgJ0VORCcsXG4gICdFVkVSWScsXG4gICdFWENFUFQnLFxuICAnRVhDTFVERScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1NJJyxcbiAgJ0hBVklORycsXG4gICdJRicsXG4gICdJR05PUkUnLFxuICAnSUxJS0UnLFxuICAnSU4nLFxuICAnSU5DTFVERScsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5GRVInLFxuICAnSU5MSU5FJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tFWVNQQUNFJyxcbiAgJ0tOT1dOJyxcbiAgJ0xBU1QnLFxuICAnTEVGVCcsXG4gICdMRVQnLFxuICAnTEVUVElORycsXG4gICdMSUtFJyxcbiAgJ0xJTUlUJyxcbiAgJ0xTTScsXG4gICdNQVAnLFxuICAnTUFQUElORycsXG4gICdNQVRDSEVEJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNRVJHRScsXG4gICdNSVNTSU5HJyxcbiAgJ05BTUVTUEFDRScsXG4gICdORVNUJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTUJFUicsXG4gICdPQkpFQ1QnLFxuICAnT0ZGU0VUJyxcbiAgJ09OJyxcbiAgJ09QVElPTicsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ1BBUlNFJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BPT0wnLFxuICAnUFJFUEFSRScsXG4gICdQUklNQVJZJyxcbiAgJ1BSSVZBVEUnLFxuICAnUFJJVklMRUdFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFXJyxcbiAgJ1JFQUxNJyxcbiAgJ1JFRFVDRScsXG4gICdSRU5BTUUnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTklORycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdTQVRJU0ZJRVMnLFxuICAnU0NIRU1BJyxcbiAgJ1NFTEVDVCcsXG4gICdTRUxGJyxcbiAgJ1NFTUknLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU09NRScsXG4gICdTVEFSVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ1NUUklORycsXG4gICdTWVNURU0nLFxuICAnVEhFTicsXG4gICdUTycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVU5ERVInLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOU0VUJyxcbiAgJ1VQREFURScsXG4gICdVUFNFUlQnLFxuICAnVVNFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMVUUnLFxuICAnVkFMVUVEJyxcbiAgJ1ZBTFVFUycsXG4gICdWSUEnLFxuICAnVklFVycsXG4gICdXSEVOJyxcbiAgJ1dIRVJFJyxcbiAgJ1dISUxFJyxcbiAgJ1dJVEgnLFxuICAnV0lUSElOJyxcbiAgJ1dPUksnLFxuICAnWE9SJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCBBTEwnLFxuICAnRVhDRVBUJyxcbiAgJ0VYUExBSU4gREVMRVRFIEZST00nLFxuICAnRVhQTEFJTiBVUERBVEUnLFxuICAnRVhQTEFJTiBVUFNFUlQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5GRVInLFxuICAnSU5TRVJUIElOVE8nLFxuICAnTEVUJyxcbiAgJ0xJTUlUJyxcbiAgJ01FUkdFJyxcbiAgJ05FU1QnLFxuICAnT1JERVIgQlknLFxuICAnUFJFUEFSRScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VOTkVTVCcsXG4gICdVUERBVEUnLFxuICAnVVBTRVJUJyxcbiAgJ1VTRSBLRVlTJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ09SJyxcbiAgJ1hPUicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuXTtcblxuLy8gRm9yIHJlZmVyZW5jZTogaHR0cDovL2RvY3MuY291Y2hiYXNlLmNvbS5zMy13ZWJzaXRlLXVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NlcnZlci82LjAvbjFxbC9uMXFsLWxhbmd1YWdlLXJlZmVyZW5jZS9pbmRleC5odG1sXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOMXFsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnWycsICd7J10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ10nLCAnfSddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnIycsICctLSddLFxuICAgICAgb3BlcmF0b3JzOiBbJz09JywgJyE9J10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgaXNCeSwgaXNTZXQgfSBmcm9tICcuLi9jb3JlL3Rva2VuJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuaW1wb3J0IHRva2VuVHlwZXMgZnJvbSAnLi4vY29yZS90b2tlblR5cGVzJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0EnLFxuICAnQUNDRVNTSUJMRScsXG4gICdBR0VOVCcsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVQnLFxuICAnQVRUUklCVVRFJyxcbiAgJ0FVVEhJRCcsXG4gICdBVkcnLFxuICAnQkVUV0VFTicsXG4gICdCRklMRV9CQVNFJyxcbiAgJ0JJTkFSWV9JTlRFR0VSJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CX0JBU0UnLFxuICAnQkxPQ0snLFxuICAnQk9EWScsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQk9VTkQnLFxuICAnQlJFQURUSCcsXG4gICdCVUxLJyxcbiAgJ0JZJyxcbiAgJ0JZVEUnLFxuICAnQycsXG4gICdDQUxMJyxcbiAgJ0NBTExJTkcnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQVJfQkFTRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSU0VUJyxcbiAgJ0NIQVJTRVRGT1JNJyxcbiAgJ0NIQVJTRVRJRCcsXG4gICdDSEVDSycsXG4gICdDTE9CX0JBU0UnLFxuICAnQ0xPTkUnLFxuICAnQ0xPU0UnLFxuICAnQ0xVU1RFUicsXG4gICdDTFVTVEVSUycsXG4gICdDT0FMRVNDRScsXG4gICdDT0xBVVRIJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT01NSVRURUQnLFxuICAnQ09NUElMRUQnLFxuICAnQ09NUFJFU1MnLFxuICAnQ09OTkVDVCcsXG4gICdDT05TVEFOVCcsXG4gICdDT05TVFJVQ1RPUicsXG4gICdDT05URVhUJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09VTlQnLFxuICAnQ1JBU0gnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUwnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSVkFMJyxcbiAgJ0NVUlNPUicsXG4gICdDVVNUT01EQVRVTScsXG4gICdEQU5HTElORycsXG4gICdEQVRBJyxcbiAgJ0RBVEVfQkFTRScsXG4gICdEQVRFJyxcbiAgJ0RBWScsXG4gICdERUNJTUFMJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGSU5FJyxcbiAgJ0RFTEVURScsXG4gICdERVBUSCcsXG4gICdERVNDJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElSRUNUT1JZJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVUkFUSU9OJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTSUYnLFxuICAnRU1QVFknLFxuICAnRU5EJyxcbiAgJ0VTQ0FQRScsXG4gICdFWENFUFRJT05TJyxcbiAgJ0VYQ0xVU0lWRScsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYVEVORFMnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSU5BTCcsXG4gICdGSVJTVCcsXG4gICdGSVhFRCcsXG4gICdGTE9BVCcsXG4gICdGT1InLFxuICAnRk9SQUxMJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZST00nLFxuICAnRlVOQ1RJT04nLFxuICAnR0VORVJBTCcsXG4gICdHT1RPJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0hBU0gnLFxuICAnSEVBUCcsXG4gICdISURERU4nLFxuICAnSE9VUicsXG4gICdJREVOVElGSUVEJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNFUycsXG4gICdJTkZJTklURScsXG4gICdJTlNUQU5USUFCTEUnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJGQUNFJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WQUxJREFURScsXG4gICdJUycsXG4gICdJU09MQVRJT04nLFxuICAnSkFWQScsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMRUFESU5HJyxcbiAgJ0xFTkdUSCcsXG4gICdMRVZFTCcsXG4gICdMSUJSQVJZJyxcbiAgJ0xJS0UnLFxuICAnTElLRTInLFxuICAnTElLRTQnLFxuICAnTElLRUMnLFxuICAnTElNSVRFRCcsXG4gICdMT0NBTCcsXG4gICdMT0NLJyxcbiAgJ0xPTkcnLFxuICAnTUFQJyxcbiAgJ01BWCcsXG4gICdNQVhMRU4nLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTUxTTEFCRUwnLFxuICAnTU9EJyxcbiAgJ01PREUnLFxuICAnTU9OVEgnLFxuICAnTVVMVElTRVQnLFxuICAnTkFNRScsXG4gICdOQU4nLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUSVZFJyxcbiAgJ05BVFVSQUwnLFxuICAnTkFUVVJBTE4nLFxuICAnTkNIQVInLFxuICAnTkVXJyxcbiAgJ05FWFRWQUwnLFxuICAnTk9DT01QUkVTUycsXG4gICdOT0NPUFknLFxuICAnTk9UJyxcbiAgJ05PV0FJVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1CRVJfQkFTRScsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09DSUNPTEwnLFxuICAnT0NJREFURScsXG4gICdPQ0lEQVRFVElNRScsXG4gICdPQ0lEVVJBVElPTicsXG4gICdPQ0lJTlRFUlZBTCcsXG4gICdPQ0lMT0JMT0NBVE9SJyxcbiAgJ09DSU5VTUJFUicsXG4gICdPQ0lSQVcnLFxuICAnT0NJUkVGJyxcbiAgJ09DSVJFRkNVUlNPUicsXG4gICdPQ0lST1dJRCcsXG4gICdPQ0lTVFJJTkcnLFxuICAnT0NJVFlQRScsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEFRVUUnLFxuICAnT1BFTicsXG4gICdPUEVSQVRPUicsXG4gICdPUFRJT04nLFxuICAnT1JBQ0xFJyxcbiAgJ09SQURBVEEnLFxuICAnT1JERVInLFxuICAnT1JHQU5JWkFUSU9OJyxcbiAgJ09STEFOWScsXG4gICdPUkxWQVJZJyxcbiAgJ09USEVSUycsXG4gICdPVVQnLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUlJJRElORycsXG4gICdQQUNLQUdFJyxcbiAgJ1BBUkFMTEVMX0VOQUJMRScsXG4gICdQQVJBTUVURVInLFxuICAnUEFSQU1FVEVSUycsXG4gICdQQVJFTlQnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BBU0NBTCcsXG4gICdQQ1RGUkVFJyxcbiAgJ1BJUEUnLFxuICAnUElQRUxJTkVEJyxcbiAgJ1BMU19JTlRFR0VSJyxcbiAgJ1BMVUdHQUJMRScsXG4gICdQT1NJVElWRScsXG4gICdQT1NJVElWRU4nLFxuICAnUFJBR01BJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUklPUicsXG4gICdQUklWQVRFJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVUJMSUMnLFxuICAnUkFJU0UnLFxuICAnUkFOR0UnLFxuICAnUkFXJyxcbiAgJ1JFQUQnLFxuICAnUkVBTCcsXG4gICdSRUNPUkQnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRScsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTElFU19PTicsXG4gICdSRU0nLFxuICAnUkVNQUlOREVSJyxcbiAgJ1JFTkFNRScsXG4gICdSRVNPVVJDRScsXG4gICdSRVNVTFRfQ0FDSEUnLFxuICAnUkVTVUxUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWRVJTRScsXG4gICdSRVZPS0UnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9XJyxcbiAgJ1JPV0lEJyxcbiAgJ1JPV05VTScsXG4gICdST1dUWVBFJyxcbiAgJ1NBTVBMRScsXG4gICdTQVZFJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQjEnLFxuICAnU0IyJyxcbiAgJ1NCNCcsXG4gICdTRUFSQ0gnLFxuICAnU0VDT05EJyxcbiAgJ1NFR01FTlQnLFxuICAnU0VMRicsXG4gICdTRVBBUkFURScsXG4gICdTRVFVRU5DRScsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0hBUkUnLFxuICAnU0hPUlQnLFxuICAnU0laRV9UJyxcbiAgJ1NJWkUnLFxuICAnU01BTExJTlQnLFxuICAnU09NRScsXG4gICdTUEFDRScsXG4gICdTUEFSU0UnLFxuICAnU1FMJyxcbiAgJ1NRTENPREUnLFxuICAnU1FMREFUQScsXG4gICdTUUxFUlJNJyxcbiAgJ1NRTE5BTUUnLFxuICAnU1FMU1RBVEUnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBVElDJyxcbiAgJ1NURERFVicsXG4gICdTVE9SRUQnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVFlMRScsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJQQVJUSVRJT04nLFxuICAnU1VCU1RJVFVUQUJMRScsXG4gICdTVUJUWVBFJyxcbiAgJ1NVQ0NFU1NGVUwnLFxuICAnU1VNJyxcbiAgJ1NZTk9OWU0nLFxuICAnU1lTREFURScsXG4gICdUQUJBVVRIJyxcbiAgJ1RBQkxFJyxcbiAgJ1RETycsXG4gICdUSEUnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9BQkJSJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RJTUVaT05FX1JFR0lPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0FDVElPTkFMJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdUUlVTVEVEJyxcbiAgJ1RZUEUnLFxuICAnVUIxJyxcbiAgJ1VCMicsXG4gICdVQjQnLFxuICAnVUlEJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSVFVRScsXG4gICdVTlBMVUcnLFxuICAnVU5TSUdORUQnLFxuICAnVU5UUlVTVEVEJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTElTVCcsXG4gICdWQUxVRScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUkNIQVIyJyxcbiAgJ1ZBUklBQkxFJyxcbiAgJ1ZBUklBTkNFJyxcbiAgJ1ZBUlJBWScsXG4gICdWQVJZSU5HJyxcbiAgJ1ZJRVcnLFxuICAnVklFV1MnLFxuICAnVk9JRCcsXG4gICdXSEVORVZFUicsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dPUksnLFxuICAnV1JBUFBFRCcsXG4gICdXUklURScsXG4gICdZRUFSJyxcbiAgJ1pPTkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdCRUdJTicsXG4gICdDT05ORUNUIEJZJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVMRVRFIEZST00nLFxuICAnREVMRVRFJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRVhDRVBUSU9OJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdMT09QJyxcbiAgJ01PRElGWScsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1NUQVJUIFdJVEgnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnTUlOVVMnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NST1NTIEFQUExZJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ09SJyxcbiAgJ09VVEVSIEFQUExZJyxcbiAgJ1dIRU4nLFxuICAnWE9SJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdGVUxMIEpPSU4nLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyc6J10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJ18nLCAnJCcsICcjJywgJy4nLCAnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbJ3x8JywgJyoqJywgJyE9JywgJzo9J10sXG4gICAgfSk7XG4gIH1cblxuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgaWYgKGlzU2V0KHRva2VuKSAmJiBpc0J5KHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuKSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogdG9rZW5UeXBlcy5SRVNFUlZFRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FCT1JUJyxcbiAgJ0FCU09MVVRFJyxcbiAgJ0FDQ0VTUycsXG4gICdBQ1RJT04nLFxuICAnQUREJyxcbiAgJ0FETUlOJyxcbiAgJ0FGVEVSJyxcbiAgJ0FHR1JFR0FURScsXG4gICdBTEwnLFxuICAnQUxTTycsXG4gICdBTFRFUicsXG4gICdBTFdBWVMnLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTU0VSVElPTicsXG4gICdBU1NJR05NRU5UJyxcbiAgJ0FTWU1NRVRSSUMnLFxuICAnQVQnLFxuICAnQVRUQUNIJyxcbiAgJ0FUVFJJQlVURScsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0JBQ0tXQVJEJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQklUJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQVRBTE9HJyxcbiAgJ0NIQUlOJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJBQ1RFUklTVElDUycsXG4gICdDSEVDSycsXG4gICdDSEVDS1BPSU5UJyxcbiAgJ0NMQVNTJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMQVRJT04nLFxuICAnQ09MVU1OJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT01NRU5UUycsXG4gICdDT01NSVQnLFxuICAnQ09NTUlUVEVEJyxcbiAgJ0NPTkNVUlJFTlRMWScsXG4gICdDT05GSUdVUkFUSU9OJyxcbiAgJ0NPTkZMSUNUJyxcbiAgJ0NPTk5FQ1RJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05TVFJBSU5UUycsXG4gICdDT05URU5UJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlNJT04nLFxuICAnQ09QWScsXG4gICdDT1NUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDU1YnLFxuICAnQ1VCRScsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJFTlRfQ0FUQUxPRycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ST0xFJyxcbiAgJ0NVUlJFTlRfU0NIRU1BJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0NZQ0xFJyxcbiAgJ0RBVEEnLFxuICAnREFUQUJBU0UnLFxuICAnREFZJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRkVSUkFCTEUnLFxuICAnREVGRVJSRUQnLFxuICAnREVGSU5FUicsXG4gICdERUxFVEUnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0RFTElNSVRFUlMnLFxuICAnREVQRU5EUycsXG4gICdERVNDJyxcbiAgJ0RFVEFDSCcsXG4gICdESUNUSU9OQVJZJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTQ0FSRCcsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET0NVTUVOVCcsXG4gICdET01BSU4nLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRUFDSCcsXG4gICdFTFNFJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRU5EJyxcbiAgJ0VOVU0nLFxuICAnRVNDQVBFJyxcbiAgJ0VWRU5UJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENMVURFJyxcbiAgJ0VYQ0xVRElORycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFBSRVNTSU9OJyxcbiAgJ0VYVEVOU0lPTicsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZBTUlMWScsXG4gICdGRVRDSCcsXG4gICdGSUxURVInLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRk9MTE9XSU5HJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGT1JFSUdOJyxcbiAgJ0ZPUldBUkQnLFxuICAnRlJFRVpFJyxcbiAgJ0ZST00nLFxuICAnRlVMTCcsXG4gICdGVU5DVElPTicsXG4gICdGVU5DVElPTlMnLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dMT0JBTCcsXG4gICdHUkFOVCcsXG4gICdHUkFOVEVEJyxcbiAgJ0dSRUFURVNUJyxcbiAgJ0dST1VQJyxcbiAgJ0dST1VQSU5HJyxcbiAgJ0dST1VQUycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBVklORycsXG4gICdIRUFERVInLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lMSUtFJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTU1VVEFCTEUnLFxuICAnSU1QTElDSVQnLFxuICAnSU1QT1JUJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVREUnLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRFWEVTJyxcbiAgJ0lOSEVSSVQnLFxuICAnSU5IRVJJVFMnLFxuICAnSU5JVElBTExZJyxcbiAgJ0lOTElORScsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlBVVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5TVEVBRCcsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJTlZPS0VSJyxcbiAgJ0lTJyxcbiAgJ0lTTlVMTCcsXG4gICdJU09MQVRJT04nLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnTEFCRUwnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEFTVCcsXG4gICdMQVRFUkFMJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBS1BST09GJyxcbiAgJ0xFQVNUJyxcbiAgJ0xFRlQnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMSVNURU4nLFxuICAnTE9BRCcsXG4gICdMT0NBTCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9DQVRJT04nLFxuICAnTE9DSycsXG4gICdMT0NLRUQnLFxuICAnTE9HR0VEJyxcbiAgJ01BUFBJTkcnLFxuICAnTUFUQ0gnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ01BWFZBTFVFJyxcbiAgJ01FVEhPRCcsXG4gICdNSU5VVEUnLFxuICAnTUlOVkFMVUUnLFxuICAnTU9ERScsXG4gICdNT05USCcsXG4gICdNT1ZFJyxcbiAgJ05BTUUnLFxuICAnTkFNRVMnLFxuICAnTkFUSU9OQUwnLFxuICAnTkFUVVJBTCcsXG4gICdOQ0hBUicsXG4gICdORVcnLFxuICAnTkVYVCcsXG4gICdORkMnLFxuICAnTkZEJyxcbiAgJ05GS0MnLFxuICAnTkZLRCcsXG4gICdOTycsXG4gICdOT05FJyxcbiAgJ05PUk1BTElaRScsXG4gICdOT1JNQUxJWkVEJyxcbiAgJ05PVCcsXG4gICdOT1RISU5HJyxcbiAgJ05PVElGWScsXG4gICdOT1ROVUxMJyxcbiAgJ05PV0FJVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVUxMUycsXG4gICdOVU1FUklDJyxcbiAgJ09CSkVDVCcsXG4gICdPRicsXG4gICdPRkYnLFxuICAnT0ZGU0VUJyxcbiAgJ09JRFMnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFUkFUT1InLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTlMnLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1JESU5BTElUWScsXG4gICdPVEhFUlMnLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ09XTkVEJyxcbiAgJ09XTkVSJyxcbiAgJ1BBUkFMTEVMJyxcbiAgJ1BBUlNFUicsXG4gICdQQVJUSUFMJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNTSU5HJyxcbiAgJ1BBU1NXT1JEJyxcbiAgJ1BMQUNJTkcnLFxuICAnUExBTlMnLFxuICAnUE9MSUNZJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BSRUNFRElORycsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUkVQQVJFRCcsXG4gICdQUkVTRVJWRScsXG4gICdQUklNQVJZJyxcbiAgJ1BSSU9SJyxcbiAgJ1BSSVZJTEVHRVMnLFxuICAnUFJPQ0VEVVJBTCcsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPQ0VEVVJFUycsXG4gICdQUk9HUkFNJyxcbiAgJ1BVQkxJQ0FUSU9OJyxcbiAgJ1FVT1RFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JFQUQnLFxuICAnUkVBTCcsXG4gICdSRUFTU0lHTicsXG4gICdSRUNIRUNLJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFSU5ERVgnLFxuICAnUkVMQVRJVkUnLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUQUJMRScsXG4gICdSRVBMQUNFJyxcbiAgJ1JFUExJQ0EnLFxuICAnUkVTRVQnLFxuICAnUkVTVEFSVCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VVElORScsXG4gICdST1VUSU5FUycsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdSVUxFJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NIRU1BUycsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNVUklUWScsXG4gICdTRUxFQ1QnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VRVUVOQ0VTJyxcbiAgJ1NFUklBTElaQUJMRScsXG4gICdTRVJWRVInLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0VUJyxcbiAgJ1NFVE9GJyxcbiAgJ1NFVFMnLFxuICAnU0hBUkUnLFxuICAnU0hPVycsXG4gICdTSU1JTEFSJyxcbiAgJ1NJTVBMRScsXG4gICdTS0lQJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQVBTSE9UJyxcbiAgJ1NPTUUnLFxuICAnU1FMJyxcbiAgJ1NUQUJMRScsXG4gICdTVEFOREFMT05FJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRFTUVOVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ1NURElOJyxcbiAgJ1NURE9VVCcsXG4gICdTVE9SQUdFJyxcbiAgJ1NUT1JFRCcsXG4gICdTVFJJQ1QnLFxuICAnU1RSSVAnLFxuICAnU1VCU0NSSVBUSU9OJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVVBQT1JUJyxcbiAgJ1NZTU1FVFJJQycsXG4gICdTWVNJRCcsXG4gICdTWVNURU0nLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEVNUCcsXG4gICdURU1QTEFURScsXG4gICdURU1QT1JBUlknLFxuICAnVEVYVCcsXG4gICdUSEVOJyxcbiAgJ1RJRVMnLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNGT1JNJyxcbiAgJ1RSRUFUJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJJTScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RSVVNURUQnLFxuICAnVFlQRScsXG4gICdUWVBFUycsXG4gICdVRVNDQVBFJyxcbiAgJ1VOQk9VTkRFRCcsXG4gICdVTkNPTU1JVFRFRCcsXG4gICdVTkVOQ1JZUFRFRCcsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTkxJU1RFTicsXG4gICdVTkxPR0dFRCcsXG4gICdVTlRJTCcsXG4gICdVUERBVEUnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUNVVU0nLFxuICAnVkFMSUQnLFxuICAnVkFMSURBVEUnLFxuICAnVkFMSURBVE9SJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBTFVFUycsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUklBRElDJyxcbiAgJ1ZBUllJTkcnLFxuICAnVkVSQk9TRScsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVklFV1MnLFxuICAnVk9MQVRJTEUnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElURVNQQUNFJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1dPUksnLFxuICAnV1JBUFBFUicsXG4gICdXUklURScsXG4gICdYTUwnLFxuICAnWE1MQVRUUklCVVRFUycsXG4gICdYTUxDT05DQVQnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MRk9SRVNUJyxcbiAgJ1hNTE5BTUVTUEFDRVMnLFxuICAnWE1MUEFSU0UnLFxuICAnWE1MUEknLFxuICAnWE1MUk9PVCcsXG4gICdYTUxTRVJJQUxJWkUnLFxuICAnWE1MVEFCTEUnLFxuICAnWUVBUicsXG4gICdZRVMnLFxuICAnWk9ORScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NBU0UnLFxuICAnREVMRVRFIEZST00nLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnRUxTRScsXG4gICdPUicsXG4gICdXSEVOJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdGVUxMIEpPSU4nLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RncmVTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCBcIlUmJydcIiwgJ1UmXCJcIicsICckJCddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyckJ10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICchPScsXG4gICAgICAgICc8PCcsXG4gICAgICAgICc+PicsXG4gICAgICAgICd8fC8nLFxuICAgICAgICAnfC8nLFxuICAgICAgICAnOjonLFxuICAgICAgICAnLT4+JyxcbiAgICAgICAgJy0+JyxcbiAgICAgICAgJ35+KicsXG4gICAgICAgICd+ficsXG4gICAgICAgICchfn4qJyxcbiAgICAgICAgJyF+ficsXG4gICAgICAgICd+KicsXG4gICAgICAgICchfionLFxuICAgICAgICAnIX4nLFxuICAgICAgICAnISEnLFxuICAgICAgXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FFUzEyOCcsXG4gICdBRVMyNTYnLFxuICAnQUxMT1dPVkVSV1JJVEUnLFxuICAnQU5BTFlTRScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdCQUNLVVAnLFxuICAnQklOQVJZJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCT1RIJyxcbiAgJ0JZVEVESUNUJyxcbiAgJ0JaSVAyJyxcbiAgJ0NBU1QnLFxuICAnQ0hFQ0snLFxuICAnQ09MTEFURScsXG4gICdDT0xVTU4nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSUkVOVF9VU0VSX0lEJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVGRVJSQUJMRScsXG4gICdERUZMQVRFJyxcbiAgJ0RFRlJBRycsXG4gICdERUxUQScsXG4gICdERUxUQTMySycsXG4gICdERVNDJyxcbiAgJ0RJU0FCTEUnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRUxTRScsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RFJyxcbiAgJ0VOQ1JZUFQnLFxuICAnRU5DUllQVElPTicsXG4gICdFTkQnLFxuICAnRVhQTElDSVQnLFxuICAnRkFMU0UnLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRVpFJyxcbiAgJ0ZVTEwnLFxuICAnR0xPQkFMRElDVDI1NicsXG4gICdHTE9CQUxESUNUNjRLJyxcbiAgJ0dSQU5UJyxcbiAgJ0daSVAnLFxuICAnSURFTlRJVFknLFxuICAnSUdOT1JFJyxcbiAgJ0lMSUtFJyxcbiAgJ0lOSVRJQUxMWScsXG4gICdJTlRPJyxcbiAgJ0xFQURJTkcnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xVTicsXG4gICdMVU5TJyxcbiAgJ0xaTycsXG4gICdMWk9QJyxcbiAgJ01JTlVTJyxcbiAgJ01PU1RMWTEzJyxcbiAgJ01PU1RMWTMyJyxcbiAgJ01PU1RMWTgnLFxuICAnTkFUVVJBTCcsXG4gICdORVcnLFxuICAnTlVMTFMnLFxuICAnT0ZGJyxcbiAgJ09GRkxJTkUnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRU4nLFxuICAnT1JERVInLFxuICAnT1ZFUkxBUFMnLFxuICAnUEFSQUxMRUwnLFxuICAnUEFSVElUSU9OJyxcbiAgJ1BFUkNFTlQnLFxuICAnUEVSTUlTU0lPTlMnLFxuICAnUExBQ0lORycsXG4gICdQUklNQVJZJyxcbiAgJ1JBVycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVDT1ZFUicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFSkVDVExPRycsXG4gICdSRVNPUlQnLFxuICAnUkVTVE9SRScsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lNSUxBUicsXG4gICdTWVNEQVRFJyxcbiAgJ1NZU1RFTScsXG4gICdUQUJMRScsXG4gICdUQUcnLFxuICAnVERFUycsXG4gICdURVhUMjU1JyxcbiAgJ1RFWFQzMksnLFxuICAnVEhFTicsXG4gICdUSU1FU1RBTVAnLFxuICAnVE8nLFxuICAnVE9QJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ1VOSVFVRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZFUkJPU0UnLFxuICAnV0FMTEVUJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdXSVRIT1VUJyxcbiAgJ1BSRURJQ0FURScsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBSRVNTSU9OJyxcbiAgJ0NPUFknLFxuICAnRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0FWUk8nLFxuICAnSlNPTicsXG4gICdFTkNSWVBURUQnLFxuICAnQlpJUDInLFxuICAnR1pJUCcsXG4gICdMWk9QJyxcbiAgJ1BBUlFVRVQnLFxuICAnT1JDJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnVElNRUZPUk1BVCcsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ01BTklGRVNUJyxcbiAgJ1JFR0lPTicsXG4gICdJQU1fUk9MRScsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdTU0gnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdBQ0NFU1NfS0VZX0lEJyxcbiAgJ1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgJ0FWUk8nLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JaSVAyJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnREFURUZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0ZPUk1BVCcsXG4gICdJQU1fUk9MRScsXG4gICdHWklQJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ0pTT04nLFxuICAnTFpPUCcsXG4gICdNQU5JRkVTVCcsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnTlVMTCBBUycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVHSU9OJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1NTSCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnU0VTU0lPTl9UT0tFTicsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdFWFRFUk5BTCcsXG4gICdEQVRBIENBVEFMT0cnLFxuICAnSElWRSBNRVRBU1RPUkUnLFxuICAnQ0FUQUxPR19ST0xFJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdFVkVOJyxcbiAgJ0FMTCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUZURVInLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ1RPUCcsXG4gICdMSU1JVCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnQU5BTFlaRScsXG4gICdBTkFMWVNFJyxcbiAgJ0RJU1RLRVknLFxuICAnU09SVEtFWScsXG4gICdDT01QT1VORCcsXG4gICdJTlRFUkxFQVZFRCcsXG4gICdGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnQVZSTycsXG4gICdKU09OJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdCWklQMicsXG4gICdHWklQJyxcbiAgJ0xaT1AnLFxuICAnUEFSUVVFVCcsXG4gICdPUkMnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnREFURUZPUk1BVCcsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnTlVMTCBBUycsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnTUFOSUZFU1QnLFxuICAnUkVHSU9OJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ1NTSCcsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0FDQ0VTU19LRVlfSUQnLFxuICAnU0VDUkVUX0FDQ0VTU19LRVknLFxuICAnQVZSTycsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQlpJUDInLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdDUkVERU5USUFMUycsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdFTVBUWUFTTlVMTCcsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBURUQnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0ZJWEVEV0lEVEgnLFxuICAnRk9STUFUJyxcbiAgJ0lBTV9ST0xFJyxcbiAgJ0daSVAnLFxuICAnSUdOT1JFQkxBTktMSU5FUycsXG4gICdJR05PUkVIRUFERVInLFxuICAnSlNPTicsXG4gICdMWk9QJyxcbiAgJ01BTklGRVNUJyxcbiAgJ01BU1RFUl9TWU1NRVRSSUNfS0VZJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdOVUxMIEFTJyxcbiAgJ1JFQURSQVRJTycsXG4gICdSRUdJT04nLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnU1NIJyxcbiAgJ1NUQVRVUERBVEUnLFxuICAnVElNRUZPUk1BVCcsXG4gICdTRVNTSU9OX1RPS0VOJyxcbiAgJ1RSSU1CTEFOS1MnLFxuICAnVFJVTkNBVEVDT0xVTU5TJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0RBVEEgQ0FUQUxPRycsXG4gICdISVZFIE1FVEFTVE9SRScsXG4gICdDQVRBTE9HX1JPTEUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnRUxTRScsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdXSEVOJyxcbiAgJ1ZBQ1VVTScsXG4gICdDT1BZJyxcbiAgJ1VOTE9BRCcsXG4gICdBTkFMWVpFJyxcbiAgJ0FOQUxZU0UnLFxuICAnRElTVEtFWScsXG4gICdTT1JUS0VZJyxcbiAgJ0NPTVBPVU5EJyxcbiAgJ0lOVEVSTEVBVkVEJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdGVUxMIEpPSU4nLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZHNoaWZ0Rm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJywgJyMnLCAnJCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgb3BlcmF0b3JzOiBbJ3wvJywgJ3x8LycsICc8PCcsICc+PicsICchPScsICd8fCddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCB7IGlzRW5kLCBpc1dpbmRvdyB9IGZyb20gJy4uL2NvcmUvdG9rZW4nO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5pbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuLi9jb3JlL3Rva2VuVHlwZXMnO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBUlJBWV9aSVAnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FWRycsXG4gICdCRVRXRUVOJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDQVNUJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExFQ1RfTElTVCcsXG4gICdDT0xMRUNUX1NFVCcsXG4gICdDT0xVTU4nLFxuICAnQ09MVU1OUycsXG4gICdDT01NRU5UJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVEFJTlMnLFxuICAnQ09OVkVSVCcsXG4gICdDT1VOVCcsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCBST1cnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVRFX0FERCcsXG4gICdEQVRFX1NVQicsXG4gICdEQVRFX1RSVU5DJyxcbiAgJ0RBWV9IT1VSJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdERUNPREUnLFxuICAnREVGQVVMVCcsXG4gICdERUxFVEUnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RJU1RJTkNUUk9XJyxcbiAgJ0RJVicsXG4gICdEUk9QJyxcbiAgJ0VMU0UnLFxuICAnRU5DT0RFJyxcbiAgJ0VORCcsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdFWFBMT0RFX09VVEVSJyxcbiAgJ0VYUExPREUnLFxuICAnRklMVEVSJyxcbiAgJ0ZJUlNUX1ZBTFVFJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZJWEVEJyxcbiAgJ0ZMQVRURU4nLFxuICAnRk9MTE9XSU5HJyxcbiAgJ0ZST01fVU5JWFRJTUUnLFxuICAnRlVMTCcsXG4gICdHUkVBVEVTVCcsXG4gICdHUk9VUF9DT05DQVQnLFxuICAnSE9VUl9NSU5VVEUnLFxuICAnSE9VUl9TRUNPTkQnLFxuICAnSE9VUicsXG4gICdIT1VSUycsXG4gICdJRicsXG4gICdJRk5VTEwnLFxuICAnSU4nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnTEFHJyxcbiAgJ0xBU1RfVkFMVUUnLFxuICAnTEFTVCcsXG4gICdMRUFEJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBU1QnLFxuICAnTEVWRUwnLFxuICAnTElLRScsXG4gICdNQVgnLFxuICAnTUVSR0UnLFxuICAnTUlOJyxcbiAgJ01JTlVURV9TRUNPTkQnLFxuICAnTUlOVVRFJyxcbiAgJ01PTlRIJyxcbiAgJ05BVFVSQUwnLFxuICAnTk9UJyxcbiAgJ05PVygpJyxcbiAgJ05USUxFJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ09GRlNFVCcsXG4gICdPTiBERUxFVEUnLFxuICAnT04gVVBEQVRFJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BUSU1JWkUnLFxuICAnT1ZFUicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUFJFQ0VESU5HJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVHRVhQJyxcbiAgJ1JFTkFNRScsXG4gICdSTElLRScsXG4gICdST1cnLFxuICAnUk9XUycsXG4gICdTRUNPTkQnLFxuICAnU0VQQVJBVE9SJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NJWkUnLFxuICAnU1RSSU5HJyxcbiAgJ1NUUlVDVCcsXG4gICdTVU0nLFxuICAnVEFCTEUnLFxuICAnVEFCTEVTJyxcbiAgJ1RFTVBPUkFSWScsXG4gICdUSEVOJyxcbiAgJ1RPX0RBVEUnLFxuICAnVE9fSlNPTicsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0ZPUk0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUWVBFJyxcbiAgJ1RZUEVTJyxcbiAgJ1VOQk9VTkRFRCcsXG4gICdVTklRVUUnLFxuICAnVU5JWF9USU1FU1RBTVAnLFxuICAnVU5MT0NLJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBUklBQkxFUycsXG4gICdWSUVXJyxcbiAgJ1dIRU4nLFxuICAnV0lUSCcsXG4gICdZRUFSX01PTlRIJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgREFUQUJBU0UnLFxuICAnQUxURVIgU0NIRU1BJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NMVVNURVIgQlknLFxuICAnQ0xVU1RFUkVEIEJZJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RJU1RSSUJVVEUgQlknLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09QVElPTlMnLFxuICAnT1JERVIgQlknLFxuICAnUEFSVElUSU9OIEJZJyxcbiAgJ1BBUlRJVElPTkVEIEJZJyxcbiAgJ1JBTkdFJyxcbiAgJ1JPV1MnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdUQkxQUk9QRVJUSUVTJyxcbiAgJ1VQREFURScsXG4gICdVU0lORycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnV0lORE9XJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW1xuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0NSRUFURSBPUicsXG4gICdDUkVBVEUnLFxuICAnRUxTRScsXG4gICdMQVRFUkFMIFZJRVcnLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnV0hFTicsXG4gICdYT1InLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAvLyBub24tc3RhbmRhcmQtam9pbnNcbiAgJ0FOVEkgSk9JTicsXG4gICdTRU1JIEpPSU4nLFxuICAnTEVGVCBBTlRJIEpPSU4nLFxuICAnTEVGVCBTRU1JIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBBTlRJIEpPSU4nLFxuICAnTkFUVVJBTCBGVUxMIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBJTk5FUiBKT0lOJyxcbiAgJ05BVFVSQUwgTEVGVCBBTlRJIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgU0VNSSBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYXJrU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgJ2BgJywgJ3t9J10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnIT0nLCAnPD0+JywgJyYmJywgJ3x8JywgJz09J10sXG4gICAgfSk7XG4gIH1cblxuICB0b2tlbk92ZXJyaWRlKHRva2VuKSB7XG4gICAgLy8gRml4IGNhc2VzIHdoZXJlIG5hbWVzIGFyZSBhbWJpZ3VvdXNseSBrZXl3b3JkcyBvciBmdW5jdGlvbnNcbiAgICBpZiAoaXNXaW5kb3codG9rZW4pKSB7XG4gICAgICBjb25zdCBhaGVhZFRva2VuID0gdGhpcy50b2tlbkxvb2tBaGVhZCgpO1xuICAgICAgaWYgKGFoZWFkVG9rZW4gJiYgYWhlYWRUb2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIGNhbGwsIHRyZWF0IGl0IGFzIGEgcmVzZXJ2ZWQgd29yZFxuICAgICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVELCB2YWx1ZTogdG9rZW4udmFsdWUgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIHByb3BlcnRpZXNcbiAgICBpZiAoaXNFbmQodG9rZW4pKSB7XG4gICAgICBjb25zdCBiYWNrVG9rZW4gPSB0aGlzLnRva2VuTG9va0JlaGluZCgpO1xuICAgICAgaWYgKGJhY2tUb2tlbiAmJiBiYWNrVG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5PUEVSQVRPUiAmJiBiYWNrVG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICAvLyBUaGlzIGlzIHdpbmRvdygpLmVuZCAob3Igc2ltaWxhcikgbm90IENBU0UgLi4uIEVORFxuICAgICAgICByZXR1cm4geyB0eXBlOiB0b2tlblR5cGVzLldPUkQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuLy8gaHR0cHM6Ly9qYWtld2hlYXQuZ2l0aHViLmlvL3NxbC1vdmVydmlldy9zcWwtMjAwOC1mb3VuZGF0aW9uLWdyYW1tYXIuaHRtbCNyZXNlcnZlZC13b3JkXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUJTJyxcbiAgJ0FMTCcsXG4gICdBTExPQ0FURScsXG4gICdBTFRFUicsXG4gICdBTkQnLFxuICAnQU5ZJyxcbiAgJ0FSRScsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0VOU0lUSVZFJyxcbiAgJ0FTWU1NRVRSSUMnLFxuICAnQVQnLFxuICAnQVRPTUlDJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQVZHJyxcbiAgJ0JFR0lOJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CJyxcbiAgJ0JPT0xFQU4nLFxuICAnQk9USCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVJESU5BTElUWScsXG4gICdDQVNDQURFRCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0VJTCcsXG4gICdDRUlMSU5HJyxcbiAgJ0NIQVInLFxuICAnQ0hBUl9MRU5HVEgnLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIQVJBQ1RFUl9MRU5HVEgnLFxuICAnQ0hFQ0snLFxuICAnQ0xPQicsXG4gICdDTE9TRScsXG4gICdDT0FMRVNDRScsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTExFQ1QnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05ESVRJT04nLFxuICAnQ09OTkVDVCcsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09SUicsXG4gICdDT1JSRVNQT05ESU5HJyxcbiAgJ0NPVU5UJyxcbiAgJ0NPVkFSX1BPUCcsXG4gICdDT1ZBUl9TQU1QJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVUJFJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UJyxcbiAgJ0NVUlJFTlRfQ0FUQUxPRycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ERUZBVUxUX1RSQU5TRk9STV9HUk9VUCcsXG4gICdDVVJSRU5UX1BBVEgnLFxuICAnQ1VSUkVOVF9ST0xFJyxcbiAgJ0NVUlJFTlRfU0NIRU1BJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1RSQU5TRk9STV9HUk9VUF9GT1JfVFlQRScsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0NZQ0xFJyxcbiAgJ0RBVEUnLFxuICAnREFZJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFUkVGJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElTQ09OTkVDVCcsXG4gICdESVNUSU5DVCcsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEWU5BTUlDJyxcbiAgJ0VBQ0gnLFxuICAnRUxFTUVOVCcsXG4gICdFTFNFJyxcbiAgJ0VORCcsXG4gICdFTkQtRVhFQycsXG4gICdFU0NBUEUnLFxuICAnRVZFUlknLFxuICAnRVhDRVBUJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklMVEVSJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT09SJyxcbiAgJ0ZPUicsXG4gICdGT1JFSUdOJyxcbiAgJ0ZSRUUnLFxuICAnRlJPTScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVU0lPTicsXG4gICdHRVQnLFxuICAnR0xPQkFMJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0dST1VQSU5HJyxcbiAgJ0hBVklORycsXG4gICdIT0xEJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJVFknLFxuICAnSU4nLFxuICAnSU5ESUNBVE9SJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlQnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJTRUNUSU9OJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSk9JTicsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJS0VfUkVHRVgnLFxuICAnTE4nLFxuICAnTE9DQUwnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPV0VSJyxcbiAgJ01BVENIJyxcbiAgJ01BWCcsXG4gICdNRU1CRVInLFxuICAnTUVSR0UnLFxuICAnTUVUSE9EJyxcbiAgJ01JTicsXG4gICdNSU5VVEUnLFxuICAnTU9EJyxcbiAgJ01PRElGSUVTJyxcbiAgJ01PRFVMRScsXG4gICdNT05USCcsXG4gICdNVUxUSVNFVCcsXG4gICdOQVRJT05BTCcsXG4gICdOQVRVUkFMJyxcbiAgJ05DSEFSJyxcbiAgJ05DTE9CJyxcbiAgJ05FVycsXG4gICdOTycsXG4gICdOT05FJyxcbiAgJ05PUk1BTElaRScsXG4gICdOT1QnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVNRVJJQycsXG4gICdPQ1RFVF9MRU5HVEgnLFxuICAnT0NDVVJSRU5DRVNfUkVHRVgnLFxuICAnT0YnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BFTicsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdPVkVSTEFQUycsXG4gICdPVkVSTEFZJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJUSVRJT04nLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BFUkNFTlRJTEVfQ09OVCcsXG4gICdQRVJDRU5USUxFX0RJU0MnLFxuICAnUE9TSVRJT04nLFxuICAnUE9TSVRJT05fUkVHRVgnLFxuICAnUE9XRVInLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJJTUFSWScsXG4gICdQUk9DRURVUkUnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUFEUycsXG4gICdSRUFMJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUdSX0FWR1gnLFxuICAnUkVHUl9BVkdZJyxcbiAgJ1JFR1JfQ09VTlQnLFxuICAnUkVHUl9JTlRFUkNFUFQnLFxuICAnUkVHUl9SMicsXG4gICdSRUdSX1NMT1BFJyxcbiAgJ1JFR1JfU1hYJyxcbiAgJ1JFR1JfU1hZJyxcbiAgJ1JFR1JfU1lZJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVTVUxUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5TJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9XJyxcbiAgJ1JPV19OVU1CRVInLFxuICAnUk9XUycsXG4gICdTQVZFUE9JTlQnLFxuICAnU0NPUEUnLFxuICAnU0NST0xMJyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0VUJyxcbiAgJ1NJTUlMQVInLFxuICAnU01BTExJTlQnLFxuICAnU09NRScsXG4gICdTUEVDSUZJQycsXG4gICdTUEVDSUZJQ1RZUEUnLFxuICAnU1FMJyxcbiAgJ1NRTEVYQ0VQVElPTicsXG4gICdTUUxTVEFURScsXG4gICdTUUxXQVJOSU5HJyxcbiAgJ1NRUlQnLFxuICAnU1RBUlQnLFxuICAnU1RBVElDJyxcbiAgJ1NURERFVl9QT1AnLFxuICAnU1REREVWX1NBTVAnLFxuICAnU1VCTVVMVElTRVQnLFxuICAnU1VCU1RSSU5HJyxcbiAgJ1NVQlNUUklOR19SRUdFWCcsXG4gICdTVU0nLFxuICAnU1lNTUVUUklDJyxcbiAgJ1NZU1RFTScsXG4gICdTWVNURU1fVVNFUicsXG4gICdUQUJMRScsXG4gICdUQUJMRVNBTVBMRScsXG4gICdUSEVOJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RJTUVaT05FX0hPVVInLFxuICAnVElNRVpPTkVfTUlOVVRFJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TTEFURScsXG4gICdUUkFOU0xBVEVfUkVHRVgnLFxuICAnVFJBTlNMQVRJT04nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVUVTQ0FQRScsXG4gICdVTklPTicsXG4gICdVTklRVUUnLFxuICAnVU5LTk9XTicsXG4gICdVTk5FU1QnLFxuICAnVVBEQVRFJyxcbiAgJ1VQUEVSJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMVUUnLFxuICAnVkFMVUVTJyxcbiAgJ1ZBUl9QT1AnLFxuICAnVkFSX1NBTVAnLFxuICAnVkFSQklOQVJZJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSWUlORycsXG4gICdXSEVOJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dIRVJFJyxcbiAgJ1dJRFRIX0JVQ0tFVCcsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdZRUFSJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRkVUQ0ggTkVYVCcsXG4gICdGRVRDSCBQUklPUicsXG4gICdGRVRDSCBMQVNUJyxcbiAgJ0ZFVENIIEFCU09MVVRFJyxcbiAgJ0ZFVENIIFJFTEFUSVZFJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW1xuICAnSU5URVJTRUNUJyxcbiAgJ0lOVEVSU0VDVCBBTEwnLFxuICAnSU5URVJTRUNUIERJU1RJTkNUJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSU9OIEFMTCcsXG4gICdVTklPTiBESVNUSU5DVCcsXG4gICdFWENFUFQnLFxuICAnRVhDRVBUIEFMTCcsXG4gICdFWENFUFQgRElTVElOQ1QnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnRUxTRScsXG4gICdPUicsXG4gICdXSEVOJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdGVUxMIEpPSU4nLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuICAnTkFUVVJBTCBKT0lOJyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5kYXJkU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIl0sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBREQnLFxuICAnRVhURVJOQUwnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ0FMTCcsXG4gICdGRVRDSCcsXG4gICdQVUJMSUMnLFxuICAnQUxURVInLFxuICAnRklMRScsXG4gICdSQUlTRVJST1InLFxuICAnQU5EJyxcbiAgJ0ZJTExGQUNUT1InLFxuICAnUkVBRCcsXG4gICdBTlknLFxuICAnRk9SJyxcbiAgJ1JFQURURVhUJyxcbiAgJ0FTJyxcbiAgJ0ZPUkVJR04nLFxuICAnUkVDT05GSUdVUkUnLFxuICAnQVNDJyxcbiAgJ0ZSRUVURVhUJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdGUkVFVEVYVFRBQkxFJyxcbiAgJ1JFUExJQ0FUSU9OJyxcbiAgJ0JBQ0tVUCcsXG4gICdGUk9NJyxcbiAgJ1JFU1RPUkUnLFxuICAnQkVHSU4nLFxuICAnRlVMTCcsXG4gICdSRVNUUklDVCcsXG4gICdCRVRXRUVOJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ1JFVFVSTicsXG4gICdCUkVBSycsXG4gICdHT1RPJyxcbiAgJ1JFVkVSVCcsXG4gICdCUk9XU0UnLFxuICAnR1JBTlQnLFxuICAnUkVWT0tFJyxcbiAgJ0JVTEsnLFxuICAnR1JPVVAnLFxuICAnUklHSFQnLFxuICAnQlknLFxuICAnSEFWSU5HJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ0NBU0NBREUnLFxuICAnSE9MRExPQ0snLFxuICAnUk9XQ09VTlQnLFxuICAnQ0FTRScsXG4gICdJREVOVElUWScsXG4gICdST1dHVUlEQ09MJyxcbiAgJ0NIRUNLJyxcbiAgJ0lERU5USVRZX0lOU0VSVCcsXG4gICdSVUxFJyxcbiAgJ0NIRUNLUE9JTlQnLFxuICAnSURFTlRJVFlDT0wnLFxuICAnU0FWRScsXG4gICdDTE9TRScsXG4gICdJRicsXG4gICdTQ0hFTUEnLFxuICAnQ0xVU1RFUkVEJyxcbiAgJ0lOJyxcbiAgJ1NFQ1VSSVRZQVVESVQnLFxuICAnQ09BTEVTQ0UnLFxuICAnSU5ERVgnLFxuICAnU0VMRUNUJyxcbiAgJ0NPTExBVEUnLFxuICAnSU5ORVInLFxuICAnU0VNQU5USUNLRVlQSFJBU0VUQUJMRScsXG4gICdDT0xVTU4nLFxuICAnSU5TRVJUJyxcbiAgJ1NFTUFOVElDU0lNSUxBUklUWURFVEFJTFNUQUJMRScsXG4gICdDT01NSVQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ1NFTUFOVElDU0lNSUxBUklUWVRBQkxFJyxcbiAgJ0NPTVBVVEUnLFxuICAnSU5UTycsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnQ09OU1RSQUlOVCcsXG4gICdJUycsXG4gICdTRVQnLFxuICAnQ09OVEFJTlMnLFxuICAnSk9JTicsXG4gICdTRVRVU0VSJyxcbiAgJ0NPTlRBSU5TVEFCTEUnLFxuICAnS0VZJyxcbiAgJ1NIVVRET1dOJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0tJTEwnLFxuICAnU09NRScsXG4gICdDT05WRVJUJyxcbiAgJ0xFRlQnLFxuICAnU1RBVElTVElDUycsXG4gICdDUkVBVEUnLFxuICAnTElLRScsXG4gICdTWVNURU1fVVNFUicsXG4gICdDUk9TUycsXG4gICdMSU5FTk8nLFxuICAnVEFCTEUnLFxuICAnQ1VSUkVOVCcsXG4gICdMT0FEJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdNRVJHRScsXG4gICdURVhUU0laRScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnTkFUSU9OQUwnLFxuICAnVEhFTicsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdOT0NIRUNLJyxcbiAgJ1RPJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdOT05DTFVTVEVSRUQnLFxuICAnVE9QJyxcbiAgJ0NVUlNPUicsXG4gICdOT1QnLFxuICAnVFJBTicsXG4gICdEQVRBQkFTRScsXG4gICdOVUxMJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ0RCQ0MnLFxuICAnTlVMTElGJyxcbiAgJ1RSSUdHRVInLFxuICAnREVBTExPQ0FURScsXG4gICdPRicsXG4gICdUUlVOQ0FURScsXG4gICdERUNMQVJFJyxcbiAgJ09GRicsXG4gICdUUllfQ09OVkVSVCcsXG4gICdERUZBVUxUJyxcbiAgJ09GRlNFVFMnLFxuICAnVFNFUVVBTCcsXG4gICdERUxFVEUnLFxuICAnT04nLFxuICAnVU5JT04nLFxuICAnREVOWScsXG4gICdPUEVOJyxcbiAgJ1VOSVFVRScsXG4gICdERVNDJyxcbiAgJ09QRU5EQVRBU09VUkNFJyxcbiAgJ1VOUElWT1QnLFxuICAnRElTSycsXG4gICdPUEVOUVVFUlknLFxuICAnVVBEQVRFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ09QRU5ST1dTRVQnLFxuICAnVVBEQVRFVEVYVCcsXG4gICdESVNUUklCVVRFRCcsXG4gICdPUEVOWE1MJyxcbiAgJ1VTRScsXG4gICdET1VCTEUnLFxuICAnT1BUSU9OJyxcbiAgJ1VTRVInLFxuICAnRFJPUCcsXG4gICdPUicsXG4gICdWQUxVRVMnLFxuICAnRFVNUCcsXG4gICdPUkRFUicsXG4gICdWQVJZSU5HJyxcbiAgJ0VMU0UnLFxuICAnT1VURVInLFxuICAnVklFVycsXG4gICdFTkQnLFxuICAnT1ZFUicsXG4gICdXQUlURk9SJyxcbiAgJ0VSUkxWTCcsXG4gICdQRVJDRU5UJyxcbiAgJ1dIRU4nLFxuICAnRVNDQVBFJyxcbiAgJ1BJVk9UJyxcbiAgJ1dIRVJFJyxcbiAgJ0VYQ0VQVCcsXG4gICdQTEFOJyxcbiAgJ1dISUxFJyxcbiAgJ0VYRUMnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1dJVEgnLFxuICAnRVhFQ1VURScsXG4gICdQUklNQVJZJyxcbiAgJ1dJVEhJTiBHUk9VUCcsXG4gICdFWElTVFMnLFxuICAnUFJJTlQnLFxuICAnV1JJVEVURVhUJyxcbiAgJ0VYSVQnLFxuICAnUFJPQycsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdBREQnLFxuICAnQUxURVIgQ09MVU1OJyxcbiAgJ0FMVEVSIFRBQkxFJyxcbiAgJ0NBU0UnLFxuICAnREVMRVRFIEZST00nLFxuICAnRU5EJyxcbiAgJ0VYQ0VQVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVUERBVEUnLFxuICAnVkFMVUVTJyxcbiAgJ1dIRVJFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gWydJTlRFUlNFQ1QnLCAnSU5URVJTRUNUIEFMTCcsICdNSU5VUycsICdVTklPTicsICdVTklPTiBBTEwnXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnRUxTRScsXG4gICdPUicsXG4gICdXSEVOJyxcbiAgLy8gam9pbnNcbiAgJ0pPSU4nLFxuICAnSU5ORVIgSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIEpPSU4nLFxuICAnUklHSFQgT1VURVIgSk9JTicsXG4gICdGVUxMIEpPSU4nLFxuICAnRlVMTCBPVVRFUiBKT0lOJyxcbiAgJ0NST1NTIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIk4nJ1wiLCBcIicnXCIsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnPj0nLFxuICAgICAgICAnPD0nLFxuICAgICAgICAnPD4nLFxuICAgICAgICAnIT0nLFxuICAgICAgICAnITwnLFxuICAgICAgICAnIT4nLFxuICAgICAgICAnKz0nLFxuICAgICAgICAnLT0nLFxuICAgICAgICAnKj0nLFxuICAgICAgICAnLz0nLFxuICAgICAgICAnJT0nLFxuICAgICAgICAnfD0nLFxuICAgICAgICAnJj0nLFxuICAgICAgICAnXj0nLFxuICAgICAgICAnOjonLFxuICAgICAgXSxcbiAgICAgIC8vIFRPRE86IFN1cHBvcnQgZm9yIG1vbmV5IGNvbnN0YW50c1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRGIyRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlcic7XG5pbXBvcnQgTWFyaWFEYkZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9NYXJpYURiRm9ybWF0dGVyJztcbmltcG9ydCBNeVNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9NeVNxbEZvcm1hdHRlcic7XG5pbXBvcnQgTjFxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9OMXFsRm9ybWF0dGVyJztcbmltcG9ydCBQbFNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlcic7XG5pbXBvcnQgUG9zdGdyZVNxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9Qb3N0Z3JlU3FsRm9ybWF0dGVyJztcbmltcG9ydCBSZWRzaGlmdEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlcic7XG5pbXBvcnQgU3BhcmtTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3BhcmtTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFN0YW5kYXJkU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1N0YW5kYXJkU3FsRm9ybWF0dGVyJztcbmltcG9ydCBUU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1RTcWxGb3JtYXR0ZXInO1xuXG5jb25zdCBmb3JtYXR0ZXJzID0ge1xuICBkYjI6IERiMkZvcm1hdHRlcixcbiAgbWFyaWFkYjogTWFyaWFEYkZvcm1hdHRlcixcbiAgbXlzcWw6IE15U3FsRm9ybWF0dGVyLFxuICBuMXFsOiBOMXFsRm9ybWF0dGVyLFxuICBwbHNxbDogUGxTcWxGb3JtYXR0ZXIsXG4gIHBvc3RncmVzcWw6IFBvc3RncmVTcWxGb3JtYXR0ZXIsXG4gIHJlZHNoaWZ0OiBSZWRzaGlmdEZvcm1hdHRlcixcbiAgc3Bhcms6IFNwYXJrU3FsRm9ybWF0dGVyLFxuICBzcWw6IFN0YW5kYXJkU3FsRm9ybWF0dGVyLFxuICB0c3FsOiBUU3FsRm9ybWF0dGVyLFxufTtcblxuLyoqXG4gKiBGb3JtYXQgd2hpdGVzcGFjZSBpbiBhIHF1ZXJ5IHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudCBDaGFyYWN0ZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlIENvbnZlcnRzIGtleXdvcmRzIHRvIHVwcGVyY2FzZVxuICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgSG93IG1hbnkgbGluZSBicmVha3MgYmV0d2VlbiBxdWVyaWVzXG4gKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXMgQ29sbGVjdGlvbiBvZiBwYXJhbXMgZm9yIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXQgPSAocXVlcnksIGNmZyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHF1ZXJ5IGFyZ3VtZW50LiBFeHRlY3RlZCBzdHJpbmcsIGluc3RlYWQgZ290ICcgKyB0eXBlb2YgcXVlcnkpO1xuICB9XG5cbiAgbGV0IEZvcm1hdHRlciA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xuICBpZiAoY2ZnLmxhbmd1YWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBGb3JtYXR0ZXIgPSBmb3JtYXR0ZXJzW2NmZy5sYW5ndWFnZV07XG4gIH1cbiAgaWYgKEZvcm1hdHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVuc3VwcG9ydGVkIFNRTCBkaWFsZWN0OiAke2NmZy5sYW5ndWFnZX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEZvcm1hdHRlcihjZmcpLmZvcm1hdChxdWVyeSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRGlhbGVjdHMgPSBPYmplY3Qua2V5cyhmb3JtYXR0ZXJzKTtcbiIsIi8vIE9ubHkgcmVtb3ZlcyBzcGFjZXMsIG5vdCBuZXdsaW5lc1xuZXhwb3J0IGNvbnN0IHRyaW1TcGFjZXNFbmQgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvWyBcXHRdKyQvdSwgJycpO1xuXG4vLyBMYXN0IGVsZW1lbnQgZnJvbSBhcnJheVxuZXhwb3J0IGNvbnN0IGxhc3QgPSAoYXJyKSA9PiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuXG4vLyBUcnVlIGFycmF5IGlzIGVtcHR5LCBvciBpdCdzIG5vdCBhbiBhcnJheSBhdCBhbGxcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gKGFycikgPT4gIUFycmF5LmlzQXJyYXkoYXJyKSB8fCBhcnIubGVuZ3RoID09PSAwO1xuXG4vLyBFc2NhcGVzIHJlZ2V4IHNwZWNpYWwgY2hhcnNcbmV4cG9ydCBjb25zdCBlc2NhcGVSZWdFeHAgPSAoc3RyaW5nKSA9PiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2d1LCAnXFxcXCQmJyk7XG5cbi8vIFNvcnRzIHN0cmluZ3MgYnkgbGVuZ3RoLCBzbyB0aGF0IGxvbmdlciBvbmVzIGFyZSBmaXJzdFxuLy8gQWxzbyBzb3J0cyBhbHBoYWJldGljYWxseSBhZnRlciBzb3J0aW5nIGJ5IGxlbmd0aC5cbmV4cG9ydCBjb25zdCBzb3J0QnlMZW5ndGhEZXNjID0gKHN0cmluZ3MpID0+XG4gIHN0cmluZ3Muc29ydCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoIHx8IGEubG9jYWxlQ29tcGFyZShiKTtcbiAgfSk7XG4iXSwic291cmNlUm9vdCI6IiJ9