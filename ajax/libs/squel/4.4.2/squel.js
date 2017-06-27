'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Copyright (c) [Ramesh Nair](http://www.hiddentao.com/)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return root.returnExportsGlobal = factory();
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.squel = factory();
  }
})(undefined, function () {

  // for-of (temporary fix for #219 until v5 is released)
  function _forOf(arr, cb) {
    if (arr && arr.length) {
      for (var i = 0; i < arr.length; ++i) {
        cb(arr[i]);
      }
    }
  };
  function _forOfStr(str, cb) {
    if (str && str.length) {
      for (var i = 0; i < str.length; ++i) {
        cb(str.charAt(i));
      }
    }
  };

  // Extend given object's with other objects' properties, overriding existing ones if necessary
  function _extend(dst) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (sources) {
      _forOf(sources, function (src) {
        if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object') {
          Object.getOwnPropertyNames(src).forEach(function (key) {
            if (typeof src[key] !== 'function') {
              dst[key] = src[key];
            }
          });
        }
      });
    }

    return dst;
  };

  // get whether object is a plain object
  function _isPlainObject(obj) {
    return obj && obj.constructor.prototype === Object.prototype;
  };

  // get whether object is an array
  function _isArray(obj) {
    return obj && obj.constructor.prototype === Array.prototype;
  };

  // get class name of given object
  function _getObjectClassName(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
      var arr = obj.constructor.toString().match(/function\s*(\w+)/);

      if (arr && 2 === arr.length) {
        return arr[1];
      }
    }
  }

  // clone given item
  function _clone(src) {
    if (!src) {
      return src;
    }

    if (typeof src.clone === 'function') {
      return src.clone();
    } else if (_isPlainObject(src) || _isArray(src)) {
      var _ret = function () {
        var ret = new src.constructor();

        Object.getOwnPropertyNames(src).forEach(function (key) {
          if (typeof src[key] !== 'function') {
            ret[key] = _clone(src[key]);
          }
        });

        return {
          v: ret
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return JSON.parse(JSON.stringify(src));
    }
  };

  /**
   * Register a value type handler
   *
   * Note: this will override any existing handler registered for this value type.
   */
  function _registerValueHandler(handlers, type, handler) {
    var typeofType = typeof type === 'undefined' ? 'undefined' : _typeof(type);

    if (typeofType !== 'function' && typeofType !== 'string') {
      throw new Error("type must be a class constructor or string");
    }

    if (typeof handler !== 'function') {
      throw new Error("handler must be a function");
    }

    for (var idx in handlers) {
      var typeHandler = handlers[idx];

      if (typeHandler.type === type) {
        typeHandler.handler = handler;

        return;
      }
    }

    handlers.push({
      type: type,
      handler: handler
    });
  };

  /**
   * Get value type handler for given type
   */
  function getValueHandler(value) {
    for (var _len2 = arguments.length, handlerLists = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      handlerLists[_key2 - 1] = arguments[_key2];
    }

    for (var listIdx in handlerLists) {
      var handlers = handlerLists[listIdx];

      for (var handlerIdx in handlers) {
        var typeHandler = handlers[handlerIdx];

        // if type is a string then use `typeof` or else use `instanceof`
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === typeHandler.type || typeof typeHandler.type !== 'string' && value instanceof typeHandler.type) {
          return typeHandler.handler;
        }
      }
    }
  };

  /**
   * Build base squel classes and methods
   */
  function _buildSquel() {
    var flavour = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    var cls = {
      _getObjectClassName: _getObjectClassName
    };

    // default query builder options
    cls.DefaultQueryBuilderOptions = {
      // If true then table names will be rendered inside quotes. The quote character used is configurable via the nameQuoteCharacter option.
      autoQuoteTableNames: false,
      // If true then field names will rendered inside quotes. The quote character used is configurable via the nameQuoteCharacter option.
      autoQuoteFieldNames: false,
      // If true then alias names will rendered inside quotes. The quote character used is configurable via the `tableAliasQuoteCharacter` and `fieldAliasQuoteCharacter` options.
      autoQuoteAliasNames: true,
      // If true then table alias names will rendered after AS keyword.
      useAsForTableAliasNames: false,
      // The quote character used for when quoting table and field names
      nameQuoteCharacter: '`',
      // The quote character used for when quoting table alias names
      tableAliasQuoteCharacter: '`',
      // The quote character used for when quoting table alias names
      fieldAliasQuoteCharacter: '"',
      // Custom value handlers where key is the value type and the value is the handler function
      valueHandlers: [],
      // Character used to represent a parameter value
      parameterCharacter: '?',
      // Numbered parameters returned from toParam() as $1, $2, etc.
      numberedParameters: false,
      // Numbered parameters prefix character(s)
      numberedParametersPrefix: '$',
      // Numbered parameters start at this number.
      numberedParametersStartAt: 1,
      // If true then replaces all single quotes within strings. The replacement string used is configurable via the `singleQuoteReplacement` option.
      replaceSingleQuotes: false,
      // The string to replace single quotes with in query strings
      singleQuoteReplacement: '\'\'',
      // String used to join individual blocks in a query when it's stringified
      separator: ' '
    };

    // Global custom value handlers for all instances of builder
    cls.globalValueHandlers = [];

    /*
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    # Custom value types
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
     */

    // Register a new value handler
    cls.registerValueHandler = function (type, handler) {
      _registerValueHandler(cls.globalValueHandlers, type, handler);
    };

    /*
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    # Base classes
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    */

    // Base class for cloneable builders
    cls.Cloneable = function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: 'clone',

        /**
         * Clone this builder
         */
        value: function clone() {
          var newInstance = new this.constructor();

          return _extend(newInstance, _clone(_extend({}, this)));
        }
      }]);

      return _class;
    }();

    // Base class for all builders
    cls.BaseBuilder = function (_cls$Cloneable) {
      _inherits(_class2, _cls$Cloneable);

      /**
       * Constructor.
       * this.param  {Object} options Overriding one or more of `cls.DefaultQueryBuilderOptions`.
       */

      function _class2(options) {
        _classCallCheck(this, _class2);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).call(this));

        var defaults = JSON.parse(JSON.stringify(cls.DefaultQueryBuilderOptions));

        _this.options = _extend({}, defaults, options);
        return _this;
      }

      /**
       * Register a custom value handler for this builder instance.
       *
       * Note: this will override any globally registered handler for this value type.
       */


      _createClass(_class2, [{
        key: 'registerValueHandler',
        value: function registerValueHandler(type, handler) {
          _registerValueHandler(this.options.valueHandlers, type, handler);

          return this;
        }

        /**
         * Sanitize the given condition. 
         */

      }, {
        key: '_sanitizeCondition',
        value: function _sanitizeCondition(condition) {
          // If it's not an Expression builder instance
          if (!(condition instanceof cls.Expression)) {
            // It must then be a string
            if (typeof condition !== "string") {
              throw new Error("condition must be a string or Expression instance");
            }
          }

          return condition;
        }

        /**
         * Sanitize the given name.
         *
         * The 'type' parameter is used to construct a meaningful error message in case validation fails.
         */

      }, {
        key: '_sanitizeName',
        value: function _sanitizeName(value, type) {
          if (typeof value !== "string") {
            throw new Error(type + ' must be a string');
          }

          return value;
        }
      }, {
        key: '_sanitizeField',
        value: function _sanitizeField(item) {
          var _this2 = this;

          var formattingOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          if (item instanceof cls.QueryBuilder) {
            item = '(' + item + ')';
          } else {
            item = this._sanitizeName(item, "field name");

            if (this.options.autoQuoteFieldNames) {
              (function () {
                var quoteChar = _this2.options.nameQuoteCharacter;

                if (formattingOptions.ignorePeriodsForFieldNameQuotes) {
                  // a.b.c -> `a.b.c`
                  item = '' + quoteChar + item + quoteChar;
                } else {
                  // a.b.c -> `a`.`b`.`c`
                  item = item.split('.').map(function (v) {
                    // treat '*' as special case (#79)
                    return '*' === v ? v : '' + quoteChar + v + quoteChar;
                  }).join('.');
                }
              })();
            }
          }

          return item;
        }
      }, {
        key: '_sanitizeNestableQuery',
        value: function _sanitizeNestableQuery(item) {
          if (item instanceof cls.QueryBuilder && item.isNestable()) {
            return item;
          }

          throw new Error("must be a nestable query, e.g. SELECT");
        }
      }, {
        key: '_sanitizeTable',
        value: function _sanitizeTable(item) {
          var allowNested = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          if (allowNested) {
            if (typeof item !== "string") {
              try {
                item = this._sanitizeNestableQuery(item);
              } catch (e) {
                throw new Error("table name must be a string or a nestable query instance");
              }
            }
          } else {
            item = this._sanitizeName(item, 'table name');
          }

          if (this.options.autoQuoteTableNames) {
            var quoteChar = this.options.nameQuoteCharacter;

            return '' + quoteChar + item + quoteChar;
          } else {
            return item;
          }
        }
      }, {
        key: '_sanitizeTableAlias',
        value: function _sanitizeTableAlias(item) {
          var sanitized = this._sanitizeName(item, "table alias");

          if (this.options.autoQuoteAliasNames) {
            var quoteChar = this.options.tableAliasQuoteCharacter;

            sanitized = '' + quoteChar + sanitized + quoteChar;
          }

          if (this.options.useAsForTableAliasNames) {
            return 'AS ' + sanitized;
          } else {
            return sanitized;
          }
        }
      }, {
        key: '_sanitizeFieldAlias',
        value: function _sanitizeFieldAlias(item) {
          var sanitized = this._sanitizeName(item, "field alias");

          if (this.options.autoQuoteAliasNames) {
            var quoteChar = this.options.fieldAliasQuoteCharacter;

            return '' + quoteChar + sanitized + quoteChar;
          } else {
            return sanitized;
          }
        }

        // Sanitize the given limit/offset value.

      }, {
        key: '_sanitizeLimitOffset',
        value: function _sanitizeLimitOffset(value) {
          value = parseInt(value);

          if (0 > value || isNaN(value)) {
            throw new Error("limit/offset must be >= 0");
          }

          return value;
        }

        // Santize the given field value

      }, {
        key: '_sanitizeValue',
        value: function _sanitizeValue(item) {
          var itemType = typeof item === 'undefined' ? 'undefined' : _typeof(item);

          if (null === item) {
            // null is allowed
          } else if ("string" === itemType || "number" === itemType || "boolean" === itemType) {
              // primitives are allowed
            } else if (item instanceof cls.QueryBuilder && item.isNestable()) {
                // QueryBuilder instances allowed
              } else if (item instanceof cls.FunctionBlock) {
                  // FunctionBlock instances allowed
                } else {
                    var typeIsValid = !!getValueHandler(item, this.options.valueHandlers, cls.globalValueHandlers);

                    if (!typeIsValid) {
                      throw new Error("field value must be a string, number, boolean, null or one of the registered custom value types");
                    }
                  }

          return item;
        }

        // Escape a string value, e.g. escape quotes and other characters within it.

      }, {
        key: '_escapeValue',
        value: function _escapeValue(value) {
          return !this.options.replaceSingleQuotes ? value : value.replace(/\'/g, this.options.singleQuoteReplacement);
        }

        // Format the given custom value

      }, {
        key: '_formatCustomValue',
        value: function _formatCustomValue(value) {
          var asParam = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          // user defined custom handlers takes precedence
          var customHandler = getValueHandler(value, this.options.valueHandlers, cls.globalValueHandlers);

          // use the custom handler if available
          if (customHandler) {
            value = customHandler(value, asParam);
          }

          return value;
        }

        // Format the given field value for inclusion into query parameter array

      }, {
        key: '_formatValueAsParam',
        value: function _formatValueAsParam(value) {
          var _this3 = this;

          if (_isArray(value)) {
            return value.map(function (v) {
              return _this3._formatValueAsParam(v);
            });
          } else {
            if (value instanceof cls.QueryBuilder && value.isNestable()) {
              value.updateOptions({
                "nestedBuilder": true
              });

              return value.toParam();
            } else if (value instanceof cls.Expression) {
              return value.toParam();
            } else {
              return this._formatCustomValue(value, true);
            }
          }
        }

        // Format the given field value for inclusion into the query string

      }, {
        key: '_formatValue',
        value: function _formatValue(value) {
          var _this4 = this;

          var formattingOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var customFormattedValue = this._formatCustomValue(value);

          // if formatting took place then return it directly
          if (customFormattedValue !== value) {
            return '(' + customFormattedValue + ')';
          }

          // if it's an array then format each element separately
          if (_isArray(value)) {
            value = value.map(function (v) {
              return _this4._formatValue(v);
            });

            value = '(' + value.join(', ') + ')';
          } else {
            var typeofValue = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (null === value) {
              value = "NULL";
            } else if (typeofValue === "boolean") {
              value = value ? "TRUE" : "FALSE";
            } else if (value instanceof cls.QueryBuilder) {
              value = '(' + value + ')';
            } else if (value instanceof cls.Expression) {
              value = '(' + value + ')';
            } else if (typeofValue !== "number") {
              if (formattingOptions.dontQuote) {
                value = '' + value;
              } else {
                var escapedValue = this._escapeValue(value);

                value = '\'' + escapedValue + '\'';
              }
            }
          }

          return value;
        }
      }]);

      return _class2;
    }(cls.Cloneable);

    /*
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    # cls.Expressions
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    */

    /*
    # An SQL expression builder.
    #
    # SQL expressions are used in WHERE and ON clauses to filter data by various criteria.
    #
    # This builder works by building up the expression as a hierarchical tree of nodes. The toString() method then
    # traverses this tree in order to build the final expression string.
    #
    # cls.Expressions can be nested. Nested expression contains can themselves contain nested expressions.
    # When rendered a nested expression will be fully contained within brackets.
    #
    # All the build methods in this object return the object instance for chained method calling purposes.
     */
    cls.Expression = function (_cls$BaseBuilder) {
      _inherits(_class3, _cls$BaseBuilder);

      // Initialise the expression.

      function _class3(options) {
        _classCallCheck(this, _class3);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).call(this));

        var defaults = JSON.parse(JSON.stringify(cls.DefaultQueryBuilderOptions));

        _this5.options = _extend({}, defaults, options);

        _this5.tree = {
          nodes: []
        };

        _this5.stack = [];
        return _this5;
      }

      // Begin a nested expression and combine it with the current expression using the given operator.


      _createClass(_class3, [{
        key: '_begin',
        value: function _begin(op) {
          var newNode = {
            type: op,
            nodes: []
          };

          var current = this._current();

          this.stack.push(current.nodes.length);

          current.nodes.push(newNode);

          return this;
        }

        // Getting current node from tree

      }, {
        key: '_current',
        value: function _current() {
          var current = this.tree;

          _forOf(this.stack, function (num) {
            current = current.nodes[num];
          });

          return current;
        }

        // Begin a nested expression and combine it with the current expression using the intersection operator (AND).

      }, {
        key: 'and_begin',
        value: function and_begin() {
          return this._begin('AND');
        }

        // Begin a nested expression and combine it with the current expression using the union operator (OR).

      }, {
        key: 'or_begin',
        value: function or_begin() {
          return this._begin('OR');
        }

        /**
         * End the current compound expression. 
         *
         * This will throw an error if begin() hasn't been called yet.
         */

      }, {
        key: 'end',
        value: function end() {
          if (!this.stack.length) {
            throw new Error("begin() needs to be called");
          }

          this.stack.pop();

          return this;
        }

        // Combine the current expression with the given expression using the intersection operator (AND).

      }, {
        key: 'and',
        value: function and(expr, param) {
          if (!expr || typeof expr !== "string") {
            throw new Error("expr must be a string");
          } else {
            this._current().nodes.push({
              type: 'AND',
              expr: expr,
              para: param
            });
          }

          return this;
        }

        // Combine the current expression with the given expression using the union operator (OR).

      }, {
        key: 'or',
        value: function or(expr, param) {
          if (!expr || typeof expr !== "string") {
            throw new Error("expr must be a string");
          } else {
            this._current().nodes.push({
              type: 'OR',
              expr: expr,
              para: param
            });
          }

          return this;
        }

        // Get the final fully constructed expression string.

      }, {
        key: 'toString',
        value: function toString() {
          if (this.stack.length) {
            throw new Error("end() needs to be called");
          }

          return this._toString(this.tree);
        }

        // Get the final fully constructed expression string.

      }, {
        key: 'toParam',
        value: function toParam() {
          if (this.stack.length) {
            throw new Error("end() needs to be called");
          }

          return this._toString(this.tree, true);
        }

        // Get a string representation of the given expression tree node.

      }, {
        key: '_toString',
        value: function _toString(node) {
          var _this6 = this;

          var paramMode = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          var str = "";
          var params = [];

          _forOf(node.nodes, function (child) {
            var nodeStr = void 0;

            if (undefined !== child.expr) {
              nodeStr = child.expr;

              // have param
              if (undefined !== child.para) {
                if (!paramMode) {
                  nodeStr = nodeStr.replace(_this6.options.parameterCharacter, _this6._formatValue(child.para));
                } else {
                  var cv = _this6._formatValueAsParam(child.para);

                  if (cv && cv.text) {
                    params = params.concat(cv.values);

                    nodeStr = nodeStr.replace(_this6.options.parameterCharacter, '(' + cv.text + ')');
                  } else {
                    params = params.concat(cv);
                  }

                  // IN ? -> IN (?, ?, ..., ?)
                  if (_isArray(child.para)) {
                    var arr = Array.apply(null, new Array(child.para.length));

                    var inStr = arr.map(function () {
                      return _this6.options.parameterCharacter;
                    });

                    nodeStr = nodeStr.replace(_this6.options.parameterCharacter, '(' + inStr.join(', ') + ')');
                  }
                }
              }
            } else {
              nodeStr = _this6._toString(child, paramMode);

              if (paramMode) {
                params = params.concat(nodeStr.values);

                nodeStr = nodeStr.text;
              }

              // wrap nested expressions in brackets
              if (nodeStr.length) {
                nodeStr = '(' + nodeStr + ')';
              }
            }

            if (nodeStr.length) {
              // if this isn't first expression then add the operator
              if (str.length) {
                str += " " + child.type + " ";
              }

              str += nodeStr;
            }
          }); // for-each child

          if (paramMode) return {
            text: str,
            values: params
          };else {
            return str;
          }
        }
      }]);

      return _class3;
    }(cls.BaseBuilder);

    /*
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    # cls.Case
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    */

    /**
     * An SQL CASE expression builder.
     *
     * SQL cases are used to select proper values based on specific criteria.
     */
    cls.Case = function (_cls$BaseBuilder2) {
      _inherits(_class4, _cls$BaseBuilder2);

      function _class4(fieldName) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, _class4);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).call(this));

        if (_isPlainObject(fieldName)) {
          options = fieldName;

          fieldName = null;
        }

        if (fieldName) {
          _this7.fieldName = _this7._sanitizeField(fieldName);
        }

        _this7.options = _extend({}, cls.DefaultQueryBuilderOptions, options);

        _this7.cases = [];
        _this7.elseValue = null;
        return _this7;
      }

      _createClass(_class4, [{
        key: 'when',
        value: function when(expression) {
          for (var _len3 = arguments.length, values = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            values[_key3 - 1] = arguments[_key3];
          }

          this.cases.unshift({
            expression: expression,
            values: values
          });

          return this;
        }
      }, {
        key: 'then',
        value: function then(result) {
          if (this.cases.length == 0) {
            throw new Error("when() needs to be called first");
          }

          this.cases[0].result = result;

          return this;
        }
      }, {
        key: 'else',
        value: function _else(elseValue) {
          this.elseValue = elseValue;

          return this;
        }

        // Get the final fully constructed expression string.

      }, {
        key: 'toString',
        value: function toString() {
          return this._toString(this.cases, this.elseValue);
        }

        // Get the final fully constructed expression string.

      }, {
        key: 'toParam',
        value: function toParam() {
          return this._toString(this.cases, this.elseValue, true);
        }

        // Get a string representation of the given expression tree node.

      }, {
        key: '_toString',
        value: function _toString(cases, elseValue) {
          var _this8 = this;

          var paramMode = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

          if (cases.length == 0) {
            return this._formatValue(elseValue);
          }

          var values = [];

          cases = cases.map(function (part) {
            var condition = new cls.AbstractConditionBlock("WHEN");

            condition._condition.apply(condition, [part.expression].concat(part.values));

            var str = '';

            if (!paramMode) {
              str = condition.buildStr();
            } else {
              condition = condition.buildParam();
              str = condition.text;
              values = values.concat(condition.values);
            }

            return str + ' THEN ' + _this8._formatValue(part.result);
          });

          var str = cases.join(" ") + ' ELSE ' + this._formatValue(elseValue) + ' END';

          if (this.fieldName) {
            str = this.fieldName + " " + str;
          }

          str = "CASE " + str;

          if (paramMode) {
            return {
              text: str,
              values: values
            };
          } else {
            return str;
          }
        }
      }]);

      return _class4;
    }(cls.BaseBuilder);

    /*
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    # Building blocks
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    */

    /*
    # A building block represents a single build-step within a query building process.
    #
    # Query builders consist of one or more building blocks which get run in a particular order. Building blocks can
    # optionally specify methods to expose through the query builder interface. They can access all the input data for
    # the query builder and manipulate it as necessary, as well as append to the final query string output.
    #
    # If you wish to customize how queries get built or add proprietary query phrases and content then it is recommended
    # that you do so using one or more custom building blocks.
    #
    # Original idea posted in https://github.com/hiddentao/export/issues/10#issuecomment-15016427
    */
    cls.Block = function (_cls$BaseBuilder3) {
      _inherits(_class5, _cls$BaseBuilder3);

      function _class5(options) {
        _classCallCheck(this, _class5);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class5).call(this, options));
      }

      /**
      # Get input methods to expose within the query builder.
      #
      # By default all methods except the following get returned:
      #   methods prefixed with _
      #   constructor and buildStr()
      #
      # @return Object key -> function pairs
      */


      _createClass(_class5, [{
        key: 'exposedMethods',
        value: function exposedMethods() {
          var ret = {};

          var obj = this;

          while (obj) {
            Object.getOwnPropertyNames(obj).forEach(function (prop) {
              if ('constructor' !== prop && typeof obj[prop] === "function" && prop.charAt(0) !== '_' && !cls.Block.prototype[prop]) {
                ret[prop] = obj[prop];
              }
            });

            obj = Object.getPrototypeOf(obj);
          };

          return ret;
        }

        /**
         # Build this block.
         #
         # Subclasses may override this method.
         #
         # @param queryBuilder cls.QueryBuilder a reference to the query builder that owns this block.
         #
         # @return String the string representing this block
         */

      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return '';
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          return { text: this.buildStr(queryBuilder), values: [] };
        }
      }]);

      return _class5;
    }(cls.BaseBuilder);

    // A String which always gets output
    cls.StringBlock = function (_cls$Block) {
      _inherits(_class6, _cls$Block);

      function _class6(options, str) {
        _classCallCheck(this, _class6);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class6).call(this, options));

        _this10.str = str;
        return _this10;
      }

      _createClass(_class6, [{
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this.str;
        }
      }]);

      return _class6;
    }(cls.Block);

    // An arbitrary value or db function with parameters
    cls.AbstractValueBlock = function (_cls$Block2) {
      _inherits(_class7, _cls$Block2);

      // Constructor

      function _class7(options) {
        _classCallCheck(this, _class7);

        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class7).call(this, options));

        _this11._str = '';
        _this11._values = [];
        return _this11;
      }

      _createClass(_class7, [{
        key: '_setValue',
        value: function _setValue(str) {
          this._str = str;

          for (var _len4 = arguments.length, values = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            values[_key4 - 1] = arguments[_key4];
          }

          this._values = values;
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          var _this12 = this;

          var str = this._str;
          var finalStr = '';
          var values = [].concat(this._values);

          _forOfStr(str, function (c) {
            if (_this12.options.parameterCharacter === c && 0 < values.length) {
              c = values.shift();
            }

            finalStr += c;
          });

          return finalStr;
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          return { text: this._str, values: this._values };
        }
      }]);

      return _class7;
    }(cls.Block);

    // A function string block
    cls.FunctionBlock = function (_cls$AbstractValueBlo) {
      _inherits(_class8, _cls$AbstractValueBlo);

      function _class8() {
        _classCallCheck(this, _class8);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class8).apply(this, arguments));
      }

      _createClass(_class8, [{
        key: 'function',
        value: function _function(str) {
          for (var _len5 = arguments.length, values = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            values[_key5 - 1] = arguments[_key5];
          }

          this._setValue.apply(this, [str].concat(values));
        }
      }]);

      return _class8;
    }(cls.AbstractValueBlock);

    // Construct a FunctionValueBlock object for use as a value
    cls.fval = function () {
      var inst = new cls.FunctionBlock();
      inst.function.apply(inst, arguments);
      return inst;
    };

    // value handler for FunctionValueBlock objects
    cls.registerValueHandler(cls.FunctionBlock, function (value) {
      var asParam = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return asParam ? value.buildParam() : value.buildStr();
    });

    /*
    # Table specifier base class
    #
    # Additional options
    #  - singleTable - only allow one table to be specified  (default: false)
    #  - allowNested - allow nested query to be specified as a table    (default: false)
    */
    cls.AbstractTableBlock = function (_cls$Block3) {
      _inherits(_class9, _cls$Block3);

      function _class9(options) {
        _classCallCheck(this, _class9);

        var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class9).call(this, options));

        _this14.tables = [];
        return _this14;
      }

      /**
      # Update given table.
      #
      # An alias may also be specified for the table.
      #
      # Concrete subclasses should provide a method which calls this
      */


      _createClass(_class9, [{
        key: '_table',
        value: function _table(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

          if (alias) {
            alias = this._sanitizeTableAlias(alias);
          }

          table = this._sanitizeTable(table, !!this.options.allowNested);

          if (this.options.singleTable) {
            this.tables = [];
          }

          this.tables.push({
            table: table,
            alias: alias
          });
        }

        // get whether a table has been set

      }, {
        key: '_hasTable',
        value: function _hasTable() {
          return 0 < this.tables.length;
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (!this._hasTable()) {
            return "";
          }

          var tables = "";

          _forOf(this.tables, function (table) {
            if (tables.length) {
              tables += ", ";
            }

            if ("string" === typeof table.table) {
              tables += table.table;
            } else {
              // building a nested query
              tables += '(' + table.table + ')';
            }

            if (table.alias) {
              // add the table alias
              tables += ' ' + table.alias;
            }
          });

          return tables;
        }
      }, {
        key: '_buildParam',
        value: function _buildParam(queryBuilder) {
          var _this15 = this;

          var prefix = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

          var ret = {
            text: "",
            values: []
          };

          var params = [];
          var paramStr = "";

          if (!this._hasTable()) {
            return ret;
          }

          // retrieve the parameterised queries
          _forOf(this.tables, function (blk) {
            var p = void 0;

            if ("string" === typeof blk.table) {
              p = { "text": '' + blk.table, "values": [] };
            } else if (blk.table instanceof cls.QueryBuilder) {
              // building a nested query
              blk.table.updateOptions({ "nestedBuilder": true });
              p = blk.table.toParam();
            } else {
              // building a nested query
              blk.updateOptions({ "nestedBuilder": true });
              p = blk.buildParam(queryBuilder);
            }

            p.table = blk;

            params.push(p);
          });

          // join the queries and their parameters
          // this is the last building block processed so always add UNION if there are any UNION blocks
          _forOf(params, function (p) {
            if (paramStr.length) {
              paramStr += ", ";
            } else {
              if (!!prefix && prefix.length) {
                paramStr += prefix + ' ' + paramStr;
              }
            }

            if ("string" === typeof p.table.table) {
              paramStr += '' + p.text;
            } else {
              paramStr += '(' + p.text + ')';
            }

            // add the table alias, the AS keyword is optional
            if (!!p.table.alias) {
              paramStr += ' ' + p.table.alias;
            }

            _forOf(p.values, function (v) {
              ret.values.push(_this15._formatCustomValue(v));
            });
          });

          ret.text += paramStr;

          return ret;
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          return this._buildParam(queryBuilder);
        }
      }]);

      return _class9;
    }(cls.Block);

    // Update Table
    cls.UpdateTableBlock = function (_cls$AbstractTableBlo) {
      _inherits(_class10, _cls$AbstractTableBlo);

      function _class10() {
        _classCallCheck(this, _class10);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class10).apply(this, arguments));
      }

      _createClass(_class10, [{
        key: 'table',
        value: function table(_table2) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

          this._table(_table2, alias);
        }
      }]);

      return _class10;
    }(cls.AbstractTableBlock);

    // FROM table
    cls.FromTableBlock = function (_cls$AbstractTableBlo2) {
      _inherits(_class11, _cls$AbstractTableBlo2);

      function _class11() {
        _classCallCheck(this, _class11);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class11).apply(this, arguments));
      }

      _createClass(_class11, [{
        key: 'from',
        value: function from(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

          this._table(table, alias);
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          var tables = _get(Object.getPrototypeOf(_class11.prototype), 'buildStr', this).call(this, queryBuilder);

          return tables.length ? 'FROM ' + tables : "";
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          return this._buildParam(queryBuilder, "FROM");
        }
      }]);

      return _class11;
    }(cls.AbstractTableBlock);

    // INTO table
    cls.IntoTableBlock = function (_cls$Block4) {
      _inherits(_class12, _cls$Block4);

      function _class12(options) {
        _classCallCheck(this, _class12);

        var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class12).call(this, options));

        _this18.table = null;
        return _this18;
      }

      // Into given table.


      _createClass(_class12, [{
        key: 'into',
        value: function into(table) {
          // do not allow nested table to be the target
          this.table = this._sanitizeTable(table, false);
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (!this.table) {
            throw new Error("into() needs to be called");
          }

          return 'INTO ' + this.table;
        }
      }]);

      return _class12;
    }(cls.Block);

    // (SELECT) Get field
    cls.GetFieldBlock = function (_cls$Block5) {
      _inherits(_class13, _cls$Block5);

      function _class13(options) {
        _classCallCheck(this, _class13);

        var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class13).call(this, options));

        _this19._fieldAliases = {};
        _this19._fields = [];
        return _this19;
      }

      /**
      # Add the given fields to the final result set.
      #
      # The parameter is an Object containing field names (or database functions) as the keys and aliases for the fields
      # as the values. If the value for a key is null then no alias is set for that field.
      #
      # Internally this method simply calls the field() method of this block to add each individual field.
      #
      # options.ignorePeriodsForFieldNameQuotes - whether to ignore period (.) when automatically quoting the field name
      */


      _createClass(_class13, [{
        key: 'fields',
        value: function fields(_fields) {
          var _this20 = this;

          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          if (_isArray(_fields)) {
            _forOf(_fields, function (field) {
              _this20.field(field, null, options);
            });
          } else {
            for (var field in _fields) {
              var alias = _fields[field];

              this.field(field, alias, options);
            }
          }
        }

        /**
        # Add the given field to the final result set.
        #
        # The 'field' parameter does not necessarily have to be a fieldname. It can use database functions too,
        # e.g. DATE_FORMAT(a.started, "%H")
        #
        # An alias may also be specified for this field.
        #
        # options.ignorePeriodsForFieldNameQuotes - whether to ignore period (.) when automatically quoting the field name
        */

      }, {
        key: 'field',
        value: function field(_field) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          if (alias) {
            alias = this._sanitizeFieldAlias(alias);
          }

          // if field-alias already present then don't add
          if (this._fieldAliases.hasOwnProperty(_field) && this._fieldAliases[_field] === alias) {
            return this;
          }

          var fieldRec = {
            alias: alias
          };

          if (_field instanceof cls.Case) {
            fieldRec.func = _field;
          } else {
            fieldRec.name = this._sanitizeField(_field, options);
          }

          if (options.aggregation) {
            fieldRec.aggregation = options.aggregation;
          }

          this._fieldAliases[_field] = alias;
          this._fields.push(fieldRec);
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this._build(queryBuilder);
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          return this._build(queryBuilder, true);
        }
      }, {
        key: '_build',
        value: function _build(queryBuilder) {
          var paramMode = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

          if (!queryBuilder.getBlock(cls.FromTableBlock)._hasTable()) {
            if (paramMode) {
              return {
                text: "",
                values: []
              };
            } else {
              return "";
            }
          }

          var fields = "";
          var values = [];

          _forOf(this._fields, function (field) {
            if (fields.length) {
              fields += ", ";
            }
            if (field.aggregation) {
              fields += field.aggregation + "(";
            }
            if (field.func) {
              if (paramMode) {
                var caseExpr = field.func.toParam();
                fields += caseExpr.text;
                values = values.concat(caseExpr.values);
              } else {
                fields += field.func.toString();
              }
            } else {
              fields += field.name;
            }
            if (field.aggregation) {
              fields += ")";
            }

            if (field.alias) {
              fields += ' AS ' + field.alias;
            }
          });

          if (!fields.length) {
            fields = "*";
          }

          if (paramMode) {
            return { text: fields, values: values };
          } else {
            return fields;
          }
        }
      }]);

      return _class13;
    }(cls.Block);

    // Base class for setting fields to values (used for INSERT and UPDATE queries)
    cls.AbstractSetFieldBlock = function (_cls$Block6) {
      _inherits(_class14, _cls$Block6);

      function _class14(options) {
        _classCallCheck(this, _class14);

        var _this21 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class14).call(this, options));

        _this21.fieldOptions = [];
        _this21.fields = [];
        _this21.values = [];
        return _this21;
      }

      // Update the given field with the given value.
      // This will override any previously set value for the given field.


      _createClass(_class14, [{
        key: '_set',
        value: function _set(field, value) {
          var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          if (this.values.length > 1) {
            throw new Error("Cannot call set or setFields on multiple rows of fields.");
          }

          if (undefined !== value) {
            value = this._sanitizeValue(value);
          }

          // Explicity overwrite existing fields
          var index = this.fields.indexOf(this._sanitizeField(field, options));

          if (index !== -1) {
            this.values[0][index] = value;
            this.fieldOptions[0][index] = options;
          } else {
            this.fields.push(this._sanitizeField(field, options));
            index = this.fields.length - 1;

            // The first value added needs to create the array of values for the row
            if (_isArray(this.values[0])) {
              this.values[0][index] = value;
              this.fieldOptions[0][index] = options;
            } else {
              this.values.push([value]);
              this.fieldOptions.push([options]);
            }
          }
        }

        // Insert fields based on the key/value pairs in the given object

      }, {
        key: '_setFields',
        value: function _setFields(fields) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          if ((typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) !== 'object') {
            throw new Error("Expected an object but got " + (typeof fields === 'undefined' ? 'undefined' : _typeof(fields)));
          }

          for (var field in fields) {
            this._set(field, fields[field], options);
          }
        }

        // Insert multiple rows for the given fields. Accepts an array of objects.
        // This will override all previously set values for every field.

      }, {
        key: '_setFieldsRows',
        value: function _setFieldsRows(fieldsRows) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          if (!_isArray(fieldsRows)) {
            throw new Error("Expected an array of objects but got " + (typeof fieldsRows === 'undefined' ? 'undefined' : _typeof(fieldsRows)));
          }

          // Reset the objects stored fields and values
          this.fields = [];
          this.values = [];

          for (var i in fieldsRows) {
            var fieldRow = fieldsRows[i];

            for (var field in fieldRow) {
              var value = fieldRow[field];

              var index = this.fields.indexOf(this._sanitizeField(field, options));

              if (0 < i && -1 === index) {
                throw new Error('All fields in subsequent rows must match the fields in the first row');
              }

              // Add field only if it hasn't been added before
              if (-1 === index) {
                this.fields.push(this._sanitizeField(field, options));
                index = this.fields.length - 1;
              }

              value = this._sanitizeValue(value);

              // The first value added needs to add the array
              if (_isArray(this.values[i])) {
                this.values[i][index] = value;
                this.fieldOptions[i][index] = options;
              } else {
                this.values[i] = [value];
                this.fieldOptions[i] = [options];
              }
            }
          }
        }
      }, {
        key: 'buildStr',
        value: function buildStr() {
          throw new Error('Not yet implemented');
        }
      }, {
        key: 'buildParam',
        value: function buildParam() {
          throw new Error('Not yet implemented');
        }
      }]);

      return _class14;
    }(cls.Block);

    // (UPDATE) SET field=value
    cls.SetFieldBlock = function (_cls$AbstractSetField) {
      _inherits(_class15, _cls$AbstractSetField);

      function _class15() {
        _classCallCheck(this, _class15);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class15).apply(this, arguments));
      }

      _createClass(_class15, [{
        key: 'set',
        value: function set(field, value, options) {
          this._set(field, value, options);
        }
      }, {
        key: 'setFields',
        value: function setFields(fields, options) {
          this._setFields(fields, options);
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (0 >= this.fields.length) {
            throw new Error("set() needs to be called");
          }

          var str = "";

          for (var i in this.fields) {
            if (str.length) {
              str += ", ";
            }

            var field = this.fields[i];

            var value = this.values[0][i];

            var fieldOptions = this.fieldOptions[0][i];

            // e.g. if field is an expression such as: count = count + 1
            if (typeof value === 'undefined') {
              str += field;
            } else {
              str += field + ' = ' + this._formatValue(value, fieldOptions);
            }
          }

          return 'SET ' + str;
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          if (0 >= this.fields.length) {
            throw new Error("set() needs to be called");
          }

          var str = "";
          var vals = [];

          for (var i in this.fields) {
            if (str.length) {
              str += ", ";
            }

            var field = this.fields[i];

            var value = this.values[0][i];

            // e.g. if field is an expression such as: count = count + 1
            if (typeof value === 'undefined') {
              str += field;
            } else {
              var p = this._formatValueAsParam(value);

              if (!!p && !!p.text) {
                str += field + ' = (' + p.text + ')';

                _forOf(p.values, function (v) {
                  vals.push(v);
                });
              } else {
                str += field + ' = ' + this.options.parameterCharacter;

                vals.push(p);
              }
            }
          }

          return { text: 'SET ' + str, values: vals };
        }
      }]);

      return _class15;
    }(cls.AbstractSetFieldBlock);

    // (INSERT INTO) ... field ... value
    cls.InsertFieldValueBlock = function (_cls$AbstractSetField2) {
      _inherits(_class16, _cls$AbstractSetField2);

      function _class16() {
        _classCallCheck(this, _class16);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class16).apply(this, arguments));
      }

      _createClass(_class16, [{
        key: 'set',
        value: function set(field, value) {
          var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          this._set(field, value, options);
        }
      }, {
        key: 'setFields',
        value: function setFields(fields, options) {
          this._setFields(fields, options);
        }
      }, {
        key: 'setFieldsRows',
        value: function setFieldsRows(fieldsRows, options) {
          this._setFieldsRows(fieldsRows, options);
        }
      }, {
        key: '_buildVals',
        value: function _buildVals() {
          var vals = [];

          for (var i in this.values) {
            for (var j in this.values[i]) {
              var formattedValue = this._formatValue(this.values[i][j], this.fieldOptions[i][j]);

              if ('string' === typeof vals[i]) {
                vals[i] += ', ' + formattedValue;
              } else {
                vals[i] = '' + formattedValue;
              }
            }
          }

          return vals;
        }
      }, {
        key: '_buildValParams',
        value: function _buildValParams() {
          var vals = [];
          var params = [];

          for (var i in this.values) {
            for (var j in this.values[i]) {
              var p = this._formatValueAsParam(this.values[i][j]);
              var str = void 0;

              if (!!p && !!p.text) {
                str = p.text;

                _forOf(p.values, function (v) {
                  params.push(v);
                });
              } else {
                str = this.options.parameterCharacter;
                params.push(p);
              }

              if ('string' === typeof vals[i]) {
                vals[i] += ', ' + str;
              } else {
                vals[i] = str;
              }
            }
          }

          return {
            vals: vals,
            params: params
          };
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (0 >= this.fields.length) {
            return '';
          }

          return '(' + this.fields.join(', ') + ') VALUES (' + this._buildVals().join('), (') + ')';
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          if (0 >= this.fields.length) {
            return { text: '', values: [] };
          }

          // fields
          var str = "";

          var _buildValParams2 = this._buildValParams();

          var vals = _buildValParams2.vals;
          var params = _buildValParams2.params;

          for (var i in this.fields) {
            if (str.length) {
              str += ', ';
            }
            str += this.fields[i];
          }

          return { text: '(' + str + ') VALUES (' + vals.join('), (') + ')', values: params };
        }
      }]);

      return _class16;
    }(cls.AbstractSetFieldBlock);

    // (INSERT INTO) ... field ... (SELECT ... FROM ...)
    cls.InsertFieldsFromQueryBlock = function (_cls$Block7) {
      _inherits(_class17, _cls$Block7);

      function _class17(options) {
        _classCallCheck(this, _class17);

        var _this24 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class17).call(this, options));

        _this24._fields = [];
        _this24._query = null;
        return _this24;
      }

      _createClass(_class17, [{
        key: 'fromQuery',
        value: function fromQuery(fields, selectQuery) {
          var _this25 = this;

          this._fields = fields.map(function (v) {
            return _this25._sanitizeField(v);
          });

          this._query = this._sanitizeNestableQuery(selectQuery);
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (0 >= this._fields.length) {
            return '';
          }

          return '(' + this._fields.join(', ') + ') (' + this._query.toString() + ')';
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          if (0 >= this._fields.length) {
            return { text: '', values: [] };
          }

          this._query.updateOptions({ "nestedBuilder": true });
          var qryParam = this._query.toParam();

          return {
            text: '(' + this._fields.join(', ') + ') (' + qryParam.text + ')',
            values: qryParam.values
          };
        }
      }]);

      return _class17;
    }(cls.Block);

    // DISTINCT
    cls.DistinctBlock = function (_cls$Block8) {
      _inherits(_class18, _cls$Block8);

      function _class18(options) {
        _classCallCheck(this, _class18);

        var _this26 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class18).call(this, options));

        _this26.useDistinct = false;
        return _this26;
      }

      // Add the DISTINCT keyword to the query.


      _createClass(_class18, [{
        key: 'distinct',
        value: function distinct() {
          this.useDistinct = true;
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this.useDistinct ? "DISTINCT" : "";
        }
      }]);

      return _class18;
    }(cls.Block);

    // GROUP BY
    cls.GroupByBlock = function (_cls$Block9) {
      _inherits(_class19, _cls$Block9);

      function _class19(options) {
        _classCallCheck(this, _class19);

        var _this27 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class19).call(this, options));

        _this27.groups = [];
        return _this27;
      }

      // Add a GROUP BY transformation for the given field.


      _createClass(_class19, [{
        key: 'group',
        value: function group(field) {
          field = this._sanitizeField(field);
          this.groups.push(field);
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (0 < this.groups.length) {
            var groups = this.groups.join(', ');

            return 'GROUP BY ' + groups;
          } else {
            return "";
          }
        }
      }]);

      return _class19;
    }(cls.Block);

    // OFFSET x
    cls.OffsetBlock = function (_cls$Block10) {
      _inherits(_class20, _cls$Block10);

      function _class20(options) {
        _classCallCheck(this, _class20);

        var _this28 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class20).call(this, options));

        _this28.offsets = null;
        return _this28;
      }

      /**
      # Set the OFFSET transformation.
      #
      # Call this will override the previously set offset for this query. Also note that Passing 0 for 'max' will remove
      # the offset.
      */


      _createClass(_class20, [{
        key: 'offset',
        value: function offset(start) {
          start = this._sanitizeLimitOffset(start);
          this.offsets = start;
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this.offsets ? 'OFFSET ' + this.offsets : '';
        }
      }]);

      return _class20;
    }(cls.Block);

    // Abstract condition base class
    cls.AbstractConditionBlock = function (_cls$Block11) {
      _inherits(_class21, _cls$Block11);

      function _class21(verb, options) {
        _classCallCheck(this, _class21);

        var _this29 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class21).call(this, options));

        _this29.conditionVerb = verb;
        _this29.conditions = [];
        return _this29;
      }

      /**
      # Add a condition.
      #
      # When the final query is constructed all the conditions are combined using the intersection (AND) operator.
      #
      # Concrete subclasses should provide a method which calls this
      */


      _createClass(_class21, [{
        key: '_condition',
        value: function _condition(condition) {
          var _this30 = this;

          for (var _len6 = arguments.length, values = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            values[_key6 - 1] = arguments[_key6];
          }

          condition = this._sanitizeCondition(condition);

          var finalCondition = "";
          var finalValues = [];

          // if it's an Expression instance then convert to text and values
          if (condition instanceof cls.Expression) {
            var t = condition.toParam();
            finalCondition = t.text;
            finalValues = t.values;
          } else {
            _forOfStr(condition, function (c) {
              if (_this30.options.parameterCharacter === c && 0 < values.length) {
                var nextValue = values.shift();
                // # where b in (?, ? ?)
                if (_isArray(nextValue)) {
                  (function () {
                    var inValues = [];
                    _forOf(nextValue, function (item) {
                      inValues.push(_this30._sanitizeValue(item));
                    });
                    finalValues = finalValues.concat(inValues);
                    var paramChars = inValues.map(function () {
                      return _this30.options.parameterCharacter;
                    });
                    finalCondition += '(' + paramChars.join(', ') + ')';
                  })();
                } else {
                  finalCondition += _this30.options.parameterCharacter;
                  finalValues.push(_this30._sanitizeValue(nextValue));
                }
              } else {
                finalCondition += c;
              }
            });
          }

          if (finalCondition.length) {
            this.conditions.push({
              text: finalCondition,
              values: finalValues
            });
          }
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          var _this31 = this;

          if (0 >= this.conditions.length) {
            return "";
          }

          var condStr = "";

          _forOf(this.conditions, function (cond) {
            if (condStr.length) {
              condStr += ") AND (";
            }

            if (0 < cond.values.length) {
              (function () {
                // replace placeholders with actual parameter values
                var pIndex = 0;
                _forOfStr(cond.text, function (c) {
                  if (_this31.options.parameterCharacter === c) {
                    condStr += _this31._formatValue(cond.values[pIndex++]);
                  } else {
                    condStr += c;
                  }
                });
              })();
            } else {
              condStr += cond.text;
            }
          });

          return this.conditionVerb + ' (' + condStr + ')';
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          var _this32 = this;

          var ret = {
            text: "",
            values: []
          };

          if (0 >= this.conditions.length) {
            return ret;
          }

          var condStr = "";

          _forOf(this.conditions, function (cond) {
            if (condStr.length) {
              condStr += ") AND (";
            }

            var str = cond.text.split(_this32.options.parameterCharacter);
            var i = 0;
            _forOf(cond.values, function (v) {
              if (undefined !== str[i]) {
                condStr += str[i];
              }

              var p = _this32._formatValueAsParam(v);
              if (!!p && !!p.text) {
                condStr += '(' + p.text + ')';
                _forOf(p.values, function (qv) {
                  ret.values.push(qv);
                });
              } else {
                condStr += _this32.options.parameterCharacter;
                ret.values.push(p);
              }
              i = i + 1;
            });

            if (undefined !== str[i]) {
              condStr += str[i];
            }
          });

          ret.text = this.conditionVerb + ' (' + condStr + ')';
          return ret;
        }
      }]);

      return _class21;
    }(cls.Block);

    // WHERE
    cls.WhereBlock = function (_cls$AbstractConditio) {
      _inherits(_class22, _cls$AbstractConditio);

      function _class22(options) {
        _classCallCheck(this, _class22);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class22).call(this, 'WHERE', options));
      }

      _createClass(_class22, [{
        key: 'where',
        value: function where(condition) {
          for (var _len7 = arguments.length, values = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
            values[_key7 - 1] = arguments[_key7];
          }

          this._condition.apply(this, [condition].concat(values));
        }
      }]);

      return _class22;
    }(cls.AbstractConditionBlock);

    // HAVING
    cls.HavingBlock = function (_cls$AbstractConditio2) {
      _inherits(_class23, _cls$AbstractConditio2);

      function _class23(options) {
        _classCallCheck(this, _class23);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class23).call(this, 'HAVING', options));
      }

      _createClass(_class23, [{
        key: 'having',
        value: function having(condition) {
          for (var _len8 = arguments.length, values = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
            values[_key8 - 1] = arguments[_key8];
          }

          this._condition.apply(this, [condition].concat(values));
        }
      }]);

      return _class23;
    }(cls.AbstractConditionBlock);

    // ORDER BY
    cls.OrderByBlock = function (_cls$Block12) {
      _inherits(_class24, _cls$Block12);

      function _class24(options) {
        _classCallCheck(this, _class24);

        var _this35 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class24).call(this, options));

        _this35.orders = [];
        _this35._values = [];
        return _this35;
      }

      /**
      # Add an ORDER BY transformation for the given field in the given order.
      #
      # To specify descending order pass false for the 'asc' parameter.
      */


      _createClass(_class24, [{
        key: 'order',
        value: function order(field, asc) {
          field = this._sanitizeField(field);

          if (asc === undefined) {
            asc = true;
          }

          if (asc !== null) {
            asc = !!asc;
          }

          for (var _len9 = arguments.length, values = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
            values[_key9 - 2] = arguments[_key9];
          }

          this._values = values;

          this.orders.push({
            field: field,
            dir: asc
          });
        }
      }, {
        key: '_buildStr',
        value: function _buildStr() {
          var _this36 = this;

          var toParam = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

          if (0 < this.orders.length) {
            var _ret5 = function () {
              var pIndex = 0;
              var orders = "";
              _forOf(_this36.orders, function (o) {
                if (orders.length) {
                  orders += ", ";
                }

                var fstr = "";

                if (!toParam) {
                  _forOf(o.field, function (c) {
                    if (_this36.options.parameterCharacter === c) {
                      fstr += _this36._formatValue(_this36._values[pIndex++]);
                    } else {
                      fstr += c;
                    }
                  });
                } else {
                  fstr = o.field;
                }

                orders += fstr;

                if (o.dir !== null) {
                  orders += ' ' + (o.dir ? 'ASC' : 'DESC');
                }
              });

              return {
                v: 'ORDER BY ' + orders
              };
            }();

            if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
          } else {
            return "";
          }
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this._buildStr();
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          var _this37 = this;

          return {
            text: this._buildStr(true),
            values: this._values.map(function (v) {
              return _this37._formatValueAsParam(v);
            })
          };
        }
      }]);

      return _class24;
    }(cls.Block);

    // LIMIT
    cls.LimitBlock = function (_cls$Block13) {
      _inherits(_class25, _cls$Block13);

      function _class25(options) {
        _classCallCheck(this, _class25);

        var _this38 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class25).call(this, options));

        _this38.limits = null;
        return _this38;
      }

      /**
      # Set the LIMIT transformation.
      #
      # Call this will override the previously set limit for this query. Also note that Passing 0 for 'max' will remove
      # the limit.
      */


      _createClass(_class25, [{
        key: 'limit',
        value: function limit(max) {
          max = this._sanitizeLimitOffset(max);
          this.limits = max;
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this.limits || this.limits == 0 ? 'LIMIT ' + this.limits : "";
        }
      }]);

      return _class25;
    }(cls.Block);

    // JOIN
    cls.JoinBlock = function (_cls$Block14) {
      _inherits(_class26, _cls$Block14);

      function _class26(options) {
        _classCallCheck(this, _class26);

        var _this39 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class26).call(this, options));

        _this39.joins = [];
        return _this39;
      }

      /**
      # Add a JOIN with the given table.
      #
      # 'table' is the name of the table to join with.
      #
      # 'alias' is an optional alias for the table name.
      #
      # 'condition' is an optional condition (containing an SQL expression) for the JOIN. If this is an instance of
      # an expression builder then it gets evaluated straight away.
      #
      # 'type' must be either one of INNER, OUTER, LEFT or RIGHT. Default is 'INNER'.
      #
      */


      _createClass(_class26, [{
        key: 'join',
        value: function join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
          var type = arguments.length <= 3 || arguments[3] === undefined ? 'INNER' : arguments[3];

          table = this._sanitizeTable(table, true);
          alias = alias ? this._sanitizeTableAlias(alias) : alias;
          condition = condition ? this._sanitizeCondition(condition) : condition;

          this.joins.push({
            type: type,
            table: table,
            alias: alias,
            condition: condition
          });
        }
      }, {
        key: 'left_join',
        value: function left_join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

          this.join(table, alias, condition, 'LEFT');
        }
      }, {
        key: 'right_join',
        value: function right_join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

          this.join(table, alias, condition, 'RIGHT');
        }
      }, {
        key: 'outer_join',
        value: function outer_join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

          this.join(table, alias, condition, 'OUTER');
        }
      }, {
        key: 'left_outer_join',
        value: function left_outer_join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

          this.join(table, alias, condition, 'LEFT OUTER');
        }
      }, {
        key: 'full_join',
        value: function full_join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

          this.join(table, alias, condition, 'FULL');
        }
      }, {
        key: 'cross_join',
        value: function cross_join(table) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

          this.join(table, alias, condition, 'CROSS');
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          var joins = "";

          _forOf(this.joins || [], function (j) {
            if (joins.length) {
              joins += " ";
            }

            joins += j.type + ' JOIN ';
            if ("string" === typeof j.table) {
              joins += j.table;
            } else {
              joins += '(' + j.table + ')';
            }
            if (j.alias) {
              joins += ' ' + j.alias;
            }
            if (j.condition) {
              joins += ' ON (' + j.condition + ')';
            }
          });

          return joins;
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          var _this40 = this;

          var ret = {
            text: "",
            values: []
          };

          var params = [];
          var joinStr = "";

          if (0 >= this.joins.length) {
            return ret;
          }

          // retrieve the parameterised queries
          _forOf(this.joins, function (blk) {
            var p = void 0;
            if ("string" === typeof blk.table) {
              p = { "text": '' + blk.table, "values": [] };
            } else if (blk.table instanceof cls.QueryBuilder) {
              // building a nested query
              blk.table.updateOptions({ "nestedBuilder": true });
              p = blk.table.toParam();
            } else {
              // building a nested query
              blk.updateOptions({ "nestedBuilder": true });
              p = blk.buildParam(queryBuilder);
            }

            if (blk.condition instanceof cls.Expression) {
              var cp = blk.condition.toParam();
              p.condition = cp.text;
              p.values = p.values.concat(cp.values);
            } else {
              p.condition = blk.condition;
            }

            p.join = blk;
            params.push(p);
          });

          // join the queries and their parameters
          // this is the last building block processed so always add UNION if there are any UNION blocks
          _forOf(params, function (p) {
            if (joinStr.length) {
              joinStr += " ";
            }

            joinStr += p.join.type + ' JOIN ';

            if ("string" === typeof p.join.table) {
              joinStr += p.text;
            } else {
              joinStr += '(' + p.text + ')';
            }
            if (p.join.alias) {
              joinStr += ' ' + p.join.alias;
            }
            if (p.condition) {
              joinStr += ' ON (' + p.condition + ')';
            }

            _forOf(p.values, function (v) {
              ret.values.push(_this40._formatCustomValue(v));
            });
          });

          ret.text += joinStr;

          return ret;
        }
      }]);

      return _class26;
    }(cls.Block);

    // UNION
    cls.UnionBlock = function (_cls$Block15) {
      _inherits(_class27, _cls$Block15);

      function _class27(options) {
        _classCallCheck(this, _class27);

        var _this41 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class27).call(this, options));

        _this41.unions = [];
        return _this41;
      }

      /**
      # Add a UNION with the given table/query.
      #
      # 'table' is the name of the table or query to union with.
      #
      #
      # 'type' must be either one of UNION or UNION ALL.... Default is 'UNION'.
      #
      */


      _createClass(_class27, [{
        key: 'union',
        value: function union(table) {
          var type = arguments.length <= 1 || arguments[1] === undefined ? 'UNION' : arguments[1];

          table = this._sanitizeTable(table, true);

          this.unions.push({
            type: type,
            table: table
          });
        }

        // Add a UNION ALL with the given table/query.

      }, {
        key: 'union_all',
        value: function union_all(table) {
          this.union(table, 'UNION ALL');
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          var unionStr = "";

          _forOf(this.unions || [], function (j) {
            if (unionStr.length) {
              unionStr += " ";
            }
            unionStr += j.type + ' ';
            if ("string" === typeof j.table) {
              unionStr += j.table;
            } else {
              unionStr += '(' + j.table + ')';
            }
          });

          return unionStr;
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          var _this42 = this;

          var ret = {
            text: "",
            values: []
          };

          var params = [];
          var unionStr = "";

          if (0 >= this.unions.length) {
            return ret;
          }

          // retrieve the parameterised queries
          _forOf(this.unions || [], function (blk) {
            var p = void 0;
            if ("string" === typeof blk.table) {
              p = { "text": blk.table, "values": [] };
            } else if (blk.table instanceof cls.QueryBuilder) {
              // building a nested query
              blk.table.updateOptions({ "nestedBuilder": true });
              p = blk.table.toParam();
            } else {
              // building a nested query
              blk.updateOptions({ "nestedBuilder": true });
              p = blk.buildParam(queryBuilder);
            }
            p.type = blk.type;
            params.push(p);
          });

          // join the queries and their parameters
          // this is the last building block processed so always add UNION if there are any UNION blocks
          _forOf(params, function (p) {
            if (unionStr.length) {
              unionStr += " ";
            }
            unionStr += p.type + ' (' + p.text + ')';
            _forOf(p.values, function (v) {
              ret.values.push(_this42._formatCustomValue(v));
            });
          });

          ret.text += unionStr;

          return ret;
        }
      }]);

      return _class27;
    }(cls.Block);

    /*
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    # Query builders
    # ---------------------------------------------------------------------------------------------------------
    # ---------------------------------------------------------------------------------------------------------
    */

    /**
    # Query builder base class
    #
    # Note that the query builder does not check the final query string for correctness.
    #
    # All the build methods in this object return the object instance for chained method calling purposes.
    */
    cls.QueryBuilder = function (_cls$BaseBuilder4) {
      _inherits(_class28, _cls$BaseBuilder4);

      /**
      # Constructor
      #
      # blocks - array of cls.BaseBuilderBlock instances to build the query with.
      */

      function _class28(options, blocks) {
        _classCallCheck(this, _class28);

        var _this43 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class28).call(this, options));

        _this43.blocks = blocks || [];

        // Copy exposed methods into myself
        _forOf(_this43.blocks, function (block) {
          var exposedMethods = block.exposedMethods();

          for (var methodName in exposedMethods) {
            var methodBody = exposedMethods[methodName];

            if (undefined !== _this43[methodName]) {
              throw new Error('Builder already has a builder method called: ' + methodName);
            }

            (function (block, name, body) {
              _this43[name] = function () {
                for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                  args[_key10] = arguments[_key10];
                }

                body.call.apply(body, [block].concat(args));

                return _this43;
              };
            })(block, methodName, methodBody);
          }
        });
        return _this43;
      }

      /**
      # Register a custom value handler for this query builder and all its contained blocks.
      #
      # Note: This will override any globally registered handler for this value type.
      */


      _createClass(_class28, [{
        key: 'registerValueHandler',
        value: function registerValueHandler(type, handler) {
          _forOf(this.blocks, function (block) {
            block.registerValueHandler(type, handler);
          });

          _get(Object.getPrototypeOf(_class28.prototype), 'registerValueHandler', this).call(this, type, handler);

          return this;
        }

        /**
        # Update query builder options
        #
        # This will update the options for all blocks too. Use this method with caution as it allows you to change the
        # behaviour of your query builder mid-build.
        */

      }, {
        key: 'updateOptions',
        value: function updateOptions(options) {
          this.options = _extend({}, this.options, options);

          _forOf(this.blocks, function (block) {
            block.options = _extend({}, block.options, options);
          });
        }

        // Get the final fully constructed query string.

      }, {
        key: 'toString',
        value: function toString() {
          var _this44 = this;

          var blockStr = this.blocks.map(function (blk) {
            return blk.buildStr(_this44);
          });

          return blockStr.filter(function (v) {
            return 0 < v.length;
          }).join(this.options.separator);
        }

        // Get the final fully constructed query param obj.

      }, {
        key: 'toParam',
        value: function toParam() {
          var _this45 = this,
              _ref;

          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          var old = this.options;
          if (!!options) {
            this.options = _extend({}, this.options, options);
          }
          var result = { text: '', values: [] };
          var blocks = this.blocks.map(function (v) {
            return v.buildParam(_this45);
          });
          var blockTexts = blocks.map(function (v) {
            return v.text;
          });
          var blockValues = blocks.map(function (v) {
            return v.values;
          });
          result.text = blockTexts.filter(function (v) {
            return 0 < v.length;
          }).join(this.options.separator);

          result.values = (_ref = []).concat.apply(_ref, _toConsumableArray(blockValues));

          if (!this.options.nestedBuilder) {
            if (this.options.numberedParameters) {
              (function () {
                var i = undefined !== _this45.options.numberedParametersStartAt ? _this45.options.numberedParametersStartAt : 1;
                var regex = new RegExp("\\" + _this45.options.parameterCharacter, 'g');
                result.text = result.text.replace(regex, function () {
                  return '' + _this45.options.numberedParametersPrefix + i++;
                });
              })();
            }
          }
          this.options = old;
          return result;
        }

        // Deep clone

      }, {
        key: 'clone',
        value: function clone() {
          var blockClones = this.blocks.map(function (v) {
            return v.clone();
          });

          return new this.constructor(this.options, blockClones);
        }

        // Get whether queries built with this builder can be nested within other queries

      }, {
        key: 'isNestable',
        value: function isNestable() {
          return false;
        }

        // Get a specific block

      }, {
        key: 'getBlock',
        value: function getBlock(blockType) {
          var filtered = this.blocks.filter(function (b) {
            return b instanceof blockType;
          });

          return filtered[0];
        }
      }]);

      return _class28;
    }(cls.BaseBuilder);

    // SELECT query builder.
    cls.Select = function (_cls$QueryBuilder) {
      _inherits(_class29, _cls$QueryBuilder);

      function _class29(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class29);

        blocks = blocks || [new cls.StringBlock(options, 'SELECT'), new cls.FunctionBlock(options), new cls.DistinctBlock(options), new cls.GetFieldBlock(options), new cls.FromTableBlock(_extend({}, options, { allowNested: true })), new cls.JoinBlock(_extend({}, options, { allowNested: true })), new cls.WhereBlock(options), new cls.GroupByBlock(options), new cls.HavingBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.OffsetBlock(options), new cls.UnionBlock(_extend({}, options, { allowNested: true }))];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class29).call(this, options, blocks));
      }

      _createClass(_class29, [{
        key: 'isNestable',
        value: function isNestable() {
          return true;
        }
      }]);

      return _class29;
    }(cls.QueryBuilder);

    // UPDATE query builder.
    cls.Update = function (_cls$QueryBuilder2) {
      _inherits(_class30, _cls$QueryBuilder2);

      function _class30(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class30);

        blocks = blocks || [new cls.StringBlock(options, 'UPDATE'), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class30).call(this, options, blocks));
      }

      return _class30;
    }(cls.QueryBuilder);

    // DELETE query builder.
    cls.Delete = function (_cls$QueryBuilder3) {
      _inherits(_class31, _cls$QueryBuilder3);

      function _class31(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class31);

        blocks = blocks || [new cls.StringBlock(options, 'DELETE'), new cls.FromTableBlock(_extend({}, options, { singleTable: true })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class31).call(this, options, blocks));
      }

      return _class31;
    }(cls.QueryBuilder);

    // An INSERT query builder.
    cls.Insert = function (_cls$QueryBuilder4) {
      _inherits(_class32, _cls$QueryBuilder4);

      function _class32(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class32);

        blocks = blocks || [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class32).call(this, options, blocks));
      }

      return _class32;
    }(cls.QueryBuilder);

    var _squel = {
      VERSION: '4.4.2',
      flavour: flavour,
      expr: function expr(options) {
        return new cls.Expression(options);
      },
      case: function _case(name, options) {
        return new cls.Case(name, options);
      },
      select: function select(options, blocks) {
        return new cls.Select(options, blocks);
      },
      update: function update(options, blocks) {
        return new cls.Update(options, blocks);
      },
      insert: function insert(options, blocks) {
        return new cls.Insert(options, blocks);
      },
      delete: function _delete(options, blocks) {
        return new cls.Delete(options, blocks);
      },
      registerValueHandler: cls.registerValueHandler,
      fval: cls.fval
    };

    // aliases
    _squel.remove = _squel.delete;

    // classes
    _squel.cls = cls;

    return _squel;
  }

  /**
  # ---------------------------------------------------------------------------------------------------------
  # ---------------------------------------------------------------------------------------------------------
  # Exported instance (and for use by flavour definitions further down).
  # ---------------------------------------------------------------------------------------------------------
  # ---------------------------------------------------------------------------------------------------------
  */

  var squel = _buildSquel();

  /**
  # ---------------------------------------------------------------------------------------------------------
  # ---------------------------------------------------------------------------------------------------------
  # Squel SQL flavours
  # ---------------------------------------------------------------------------------------------------------
  # ---------------------------------------------------------------------------------------------------------
  */

  // Available flavours
  squel.flavours = {};

  // Setup Squel for a particular SQL flavour
  squel.useFlavour = function () {
    var flavour = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    if (!flavour) {
      return squel;
    }

    if (squel.flavours[flavour] instanceof Function) {
      var s = _buildSquel(flavour);

      squel.flavours[flavour].call(null, s);

      // add in flavour methods
      s.flavours = squel.flavours;
      s.useFlavour = squel.useFlavour;

      return s;
    } else {
      throw new Error('Flavour not available: ' + flavour);
    }
  };

  squel.flavours['mssql'] = function (_squel) {
    var cls = _squel.cls;

    cls.DefaultQueryBuilderOptions.replaceSingleQuotes = true;
    cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = false;
    cls.DefaultQueryBuilderOptions.numberedParametersPrefix = '@';

    _squel.registerValueHandler(Date, function (date) {
      return '\'' + date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() + '\'';
    });

    //�LIMIT,  OFFSET x and TOP x
    cls.MssqlLimitOffsetTopBlock = function (_cls$Block16) {
      _inherits(_class33, _cls$Block16);

      function _class33(options) {
        _classCallCheck(this, _class33);

        var _this50 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class33).call(this, options));

        _this50.limits = null;
        _this50.offsets = null;

        // This is setup as one block to return many as they all have to use each others data at different times
        // The build String of EITHER LIMIT OR TOP should execute, never both.

        /**
        # Set the LIMIT/TOP transformation.
        #
        # Call this will override the previously set limit for this query. Also note that Passing 0 for 'max' will remove
        # the limit.
        */
        var _limit = function _limit(max) {
          max = this._sanitizeLimitOffset(max);
          this._parent.limits = max;
        };

        _this50.ParentBlock = function (_cls$Block17) {
          _inherits(_class34, _cls$Block17);

          function _class34(parent) {
            _classCallCheck(this, _class34);

            var _this51 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class34).call(this, parent.options));

            _this51._parent = parent;
            return _this51;
          }

          return _class34;
        }(cls.Block);

        _this50.LimitBlock = function (_this50$ParentBlock) {
          _inherits(_class35, _this50$ParentBlock);

          function _class35(parent) {
            _classCallCheck(this, _class35);

            var _this52 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class35).call(this, parent));

            _this52.limit = _limit;
            return _this52;
          }

          _createClass(_class35, [{
            key: 'buildStr',
            value: function buildStr(queryBuilder) {
              if (this._parent.limits && this._parent.offsets) {
                return 'FETCH NEXT ' + this._parent.limits + ' ROWS ONLY';
              } else {
                return "";
              }
            }
          }]);

          return _class35;
        }(_this50.ParentBlock);

        _this50.TopBlock = function (_this50$ParentBlock2) {
          _inherits(_class36, _this50$ParentBlock2);

          function _class36(parent) {
            _classCallCheck(this, _class36);

            var _this53 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class36).call(this, parent));

            _this53.top = _limit;
            return _this53;
          }

          _createClass(_class36, [{
            key: 'buildStr',
            value: function buildStr(queryBuilder) {
              if (this._parent.limits && !this._parent.offsets) {
                return 'TOP (' + this._parent.limits + ')';
              } else {
                return "";
              }
            }
          }]);

          return _class36;
        }(_this50.ParentBlock);

        _this50.OffsetBlock = function (_this50$ParentBlock3) {
          _inherits(_class37, _this50$ParentBlock3);

          function _class37() {
            _classCallCheck(this, _class37);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class37).apply(this, arguments));
          }

          _createClass(_class37, [{
            key: 'offset',
            value: function offset(start) {
              this._parent.offsets = this._sanitizeLimitOffset(start);
            }
          }, {
            key: 'buildStr',
            value: function buildStr(queryBuilder) {
              if (this._parent.offsets) {
                return 'OFFSET ' + this._parent.offsets + ' ROWS';
              } else {
                return "";
              }
            }
          }]);

          return _class37;
        }(_this50.ParentBlock);
        return _this50;
      }

      _createClass(_class33, [{
        key: 'LIMIT',
        value: function LIMIT() {
          return new this.LimitBlock(this);
        }
      }, {
        key: 'TOP',
        value: function TOP() {
          return new this.TopBlock(this);
        }
      }, {
        key: 'OFFSET',
        value: function OFFSET() {
          return new this.OffsetBlock(this);
        }
      }]);

      return _class33;
    }(cls.Block);

    cls.MssqlUpdateTopBlock = function (_cls$Block18) {
      _inherits(_class38, _cls$Block18);

      function _class38(options) {
        _classCallCheck(this, _class38);

        var _this55 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class38).call(this, options));

        _this55.limits = null;

        _this55.limit = _this55.top = function (max) {
          _this55.limits = _this55._sanitizeLimitOffset(max);
        };
        return _this55;
      }

      _createClass(_class38, [{
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          return this.limits ? 'TOP (' + this.limits + ')' : "";
        }
      }]);

      return _class38;
    }(cls.Block);

    cls.MssqlInsertFieldValueBlock = function (_cls$InsertFieldValue) {
      _inherits(_class39, _cls$InsertFieldValue);

      function _class39(options) {
        _classCallCheck(this, _class39);

        var _this56 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class39).call(this, options));

        _this56.outputs = [];
        return _this56;
      }

      // add fields to the output clause


      _createClass(_class39, [{
        key: 'output',
        value: function output(fields) {
          var _this57 = this;

          if ('string' === typeof fields) {
            this.outputs.push('INSERTED.' + this._sanitizeField(fields));
          } else {
            fields.forEach(function (f) {
              _this57.outputs.push('INSERTED.' + _this57._sanitizeField(f));
            });
          }
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          if (0 >= this.fields.length) {
            throw new Error("set() needs to be called");
          }

          var innerStr = this.outputs.length != 0 ? 'OUTPUT ' + this.outputs.join(', ') + ' ' : '';

          return '(' + this.fields.join(', ') + ') ' + innerStr + 'VALUES (' + this._buildVals().join('), (') + ')';
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          if (0 >= this.fields.length) {
            throw new Error("set() needs to be called");
          }

          // fields
          var str = "";

          var _buildValParams3 = this._buildValParams();

          var vals = _buildValParams3.vals;
          var params = _buildValParams3.params;


          _forOf(this.fields, function (field) {
            if (str.length) {
              str += ", ";
            }

            str += field;
          });

          var innerStr = this.outputs.length != 0 ? 'OUTPUT ' + this.outputs.join(', ') + ' ' : '';

          return {
            text: '(' + str + ') ' + innerStr + ' VALUES (' + vals.join('), (') + ')',
            values: params
          };
        }
      }]);

      return _class39;
    }(cls.InsertFieldValueBlock);

    cls.MssqlUpdateDeleteOutputBlock = function (_cls$Block19) {
      _inherits(_class40, _cls$Block19);

      function _class40(options) {
        _classCallCheck(this, _class40);

        var _this58 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class40).call(this, options));

        _this58._outputs = [];
        return _this58;
      }

      /**
      # Add the given fields to the final result set.
      #
      # The parameter is an Object containing field names (or database functions) as the keys and aliases for the fields
      # as the values. If the value for a key is null then no alias is set for that field.
      #
      # Internally this method simply calls the field() method of this block to add each individual field.
      */


      _createClass(_class40, [{
        key: 'outputs',
        value: function outputs(_outputs) {
          for (var output in _outputs) {
            this.output(output, _outputs[output]);
          }
        }

        /**
        # Add the given field to the final result set.
        #
        # The 'field' parameter does not necessarily have to be a fieldname. It can use database functions too,
        # e.g. DATE_FORMAT(a.started, "%H")
        #
        # An alias may also be specified for this field.
        */

      }, {
        key: 'output',
        value: function output(_output) {
          var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

          _output = this._sanitizeField(_output);
          alias = alias ? this._sanitizeFieldAlias(alias) : alias;

          this._outputs.push({
            name: this.options.forDelete ? 'DELETED.' + _output : 'INSERTED.' + _output,
            alias: alias
          });
        }
      }, {
        key: 'buildStr',
        value: function buildStr(queryBuilder) {
          var outputs = "";

          if (this._outputs.length > 0) {
            _forOf(this._outputs, function (output) {
              if (outputs.length) {
                outputs += ", ";
              }
              outputs += output.name;

              if (output.alias) {
                outputs += ' AS ' + output.alias;
              }
            });

            outputs = 'OUTPUT ' + outputs;
          }

          return outputs;
        }
      }]);

      return _class40;
    }(cls.Block);

    // SELECT query builder.
    cls.Select = function (_cls$QueryBuilder5) {
      _inherits(_class41, _cls$QueryBuilder5);

      function _class41(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class41);

        var limitOffsetTopBlock = new cls.MssqlLimitOffsetTopBlock(options);

        blocks = blocks || [new cls.StringBlock(options, 'SELECT'), new cls.DistinctBlock(options), limitOffsetTopBlock.TOP(), new cls.GetFieldBlock(options), new cls.FromTableBlock(_extend({}, options, { allowNested: true })), new cls.JoinBlock(_extend({}, options, { allowNested: true })), new cls.WhereBlock(options), new cls.GroupByBlock(options), new cls.OrderByBlock(options), limitOffsetTopBlock.OFFSET(), limitOffsetTopBlock.LIMIT(), new cls.UnionBlock(_extend({}, options, { allowNested: true }))];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class41).call(this, options, blocks));
      }

      _createClass(_class41, [{
        key: 'isNestable',
        value: function isNestable() {
          return true;
        }
      }]);

      return _class41;
    }(cls.QueryBuilder);

    // Order By in update requires subquery

    // UPDATE query builder.
    cls.Update = function (_cls$QueryBuilder6) {
      _inherits(_class42, _cls$QueryBuilder6);

      function _class42(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class42);

        blocks = blocks || [new cls.StringBlock(options, 'UPDATE'), new cls.MssqlUpdateTopBlock(options), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.MssqlUpdateDeleteOutputBlock(options), new cls.WhereBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class42).call(this, options, blocks));
      }

      return _class42;
    }(cls.QueryBuilder);

    // Order By and Limit/Top in delete requires subquery

    // DELETE query builder.
    cls.Delete = function (_cls$QueryBuilder7) {
      _inherits(_class43, _cls$QueryBuilder7);

      function _class43(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class43);

        blocks = blocks || [new cls.StringBlock(options, 'DELETE'), new cls.FromTableBlock(_extend({}, options, { singleTable: true })), new cls.JoinBlock(options), new cls.MssqlUpdateDeleteOutputBlock(_extend({}, options, { forDelete: true })), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class43).call(this, options, blocks));
      }

      return _class43;
    }(cls.QueryBuilder);

    // An INSERT query builder.
    cls.Insert = function (_cls$QueryBuilder8) {
      _inherits(_class44, _cls$QueryBuilder8);

      function _class44(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class44);

        blocks = blocks || [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.MssqlInsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class44).call(this, options, blocks));
      }

      return _class44;
    }(cls.QueryBuilder);
  };

  // This file contains additional Squel commands for use with MySQL

  squel.flavours['mysql'] = function (_squel) {
    var cls = _squel.cls;

    // target <table> in DELETE <table> FROM ...
    cls.TargetTableBlock = function (_cls$AbstractValueBlo2) {
      _inherits(_class45, _cls$AbstractValueBlo2);

      function _class45() {
        _classCallCheck(this, _class45);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class45).apply(this, arguments));
      }

      _createClass(_class45, [{
        key: 'target',
        value: function target(table) {
          this._setValue(this._sanitizeTable(table));
        }
      }]);

      return _class45;
    }(cls.AbstractValueBlock);

    // ON DUPLICATE KEY UPDATE ...
    cls.MysqlOnDuplicateKeyUpdateBlock = function (_cls$AbstractSetField3) {
      _inherits(_class46, _cls$AbstractSetField3);

      function _class46() {
        _classCallCheck(this, _class46);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class46).apply(this, arguments));
      }

      _createClass(_class46, [{
        key: 'onDupUpdate',
        value: function onDupUpdate(field, value, options) {
          this._set(field, value, options);
        }
      }, {
        key: 'buildStr',
        value: function buildStr() {
          var str = "";

          for (var i in this.fields) {
            var field = this.fields[i];

            if (str.length) {
              str += ", ";
            }

            var value = this.values[0][i];

            var fieldOptions = this.fieldOptions[0][i];

            // e.g. if field is an expression such as: count = count + 1
            if (typeof value === 'undefined') {
              str += field;
            } else {
              str += field + ' = ' + this._formatValue(value, fieldOptions);
            }
          }

          return !str.length ? "" : 'ON DUPLICATE KEY UPDATE ' + str;
        }
      }, {
        key: 'buildParam',
        value: function buildParam(queryBuilder) {
          var str = "",
              vals = [];

          for (var i in this.fields) {
            var field = this.fields[i];

            if (str.length) {
              str += ", ";
            }

            var value = this.values[0][i];

            var fieldOptions = this.fieldOptions[0][i];

            // e.g. if field is an expression such as: count = count + 1
            if (typeof value === 'undefined') {
              str += field;
            } else {
              str += field + ' = ' + this.options.parameterCharacter;
              vals.push(this._formatValueAsParam(value));
            }
          }

          return {
            text: !str.length ? "" : 'ON DUPLICATE KEY UPDATE ' + str,
            values: vals
          };
        }
      }]);

      return _class46;
    }(cls.AbstractSetFieldBlock);

    // INSERT query builder.
    cls.Insert = function (_cls$QueryBuilder9) {
      _inherits(_class47, _cls$QueryBuilder9);

      function _class47(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class47);

        blocks = blocks || [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options), new cls.MysqlOnDuplicateKeyUpdateBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class47).call(this, options, blocks));
      }

      return _class47;
    }(cls.QueryBuilder);

    cls.Delete = function (_cls$QueryBuilder10) {
      _inherits(_class48, _cls$QueryBuilder10);

      function _class48(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class48);

        blocks = blocks || [new cls.StringBlock(options, 'DELETE'), new cls.TargetTableBlock(options), new cls.FromTableBlock(_extend({}, options, { singleTable: true })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class48).call(this, options, blocks));
      }

      return _class48;
    }(cls.QueryBuilder);
  };

  // This file contains additional Squel commands for use with the Postgres DB engine
  squel.flavours['postgres'] = function (_squel) {
    var cls = _squel.cls;

    cls.DefaultQueryBuilderOptions.numberedParameters = true;
    cls.DefaultQueryBuilderOptions.numberedParametersStartAt = 1;
    cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = false;
    cls.DefaultQueryBuilderOptions.useAsForTableAliasNames = true;

    // RETURNING
    cls.ReturningBlock = function (_cls$Block20) {
      _inherits(_class49, _cls$Block20);

      function _class49(options) {
        _classCallCheck(this, _class49);

        var _this67 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class49).call(this, options));

        _this67._str = null;
        return _this67;
      }

      _createClass(_class49, [{
        key: 'returning',
        value: function returning(ret) {
          this._str = this._sanitizeField(ret);
        }
      }, {
        key: 'buildStr',
        value: function buildStr() {
          return this._str ? 'RETURNING ' + this._str : '';
        }
      }]);

      return _class49;
    }(cls.Block);

    // INSERT query builder
    cls.Insert = function (_cls$QueryBuilder11) {
      _inherits(_class50, _cls$QueryBuilder11);

      function _class50(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class50);

        blocks = blocks || [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options), new cls.ReturningBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class50).call(this, options, blocks));
      }

      return _class50;
    }(cls.QueryBuilder);

    // UPDATE query builder
    cls.Update = function (_cls$QueryBuilder12) {
      _inherits(_class51, _cls$QueryBuilder12);

      function _class51(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class51);

        blocks = blocks || [new cls.StringBlock(options, 'UPDATE'), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.FromTableBlock(_extend({}, options, { allowNested: true })), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.ReturningBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class51).call(this, options, blocks));
      }

      return _class51;
    }(cls.QueryBuilder);

    // DELETE query builder
    cls.Delete = function (_cls$QueryBuilder13) {
      _inherits(_class52, _cls$QueryBuilder13);

      function _class52(options) {
        var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, _class52);

        blocks = blocks || [new cls.StringBlock(options, 'DELETE'), new cls.FromTableBlock(_extend({}, options, { singleTable: true })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.ReturningBlock(options)];

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class52).call(this, options, blocks));
      }

      return _class52;
    }(cls.QueryBuilder);
  };

  return squel;
});