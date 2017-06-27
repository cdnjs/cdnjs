;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.squel = factory();
  }
}(this, function() {
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// append to string if non-empty
function _pad(str, pad) {
  return str.length ? str + pad : str;
}

// Extend given object's with other objects' properties, overriding existing ones if necessary
function _extend(dst) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (dst && sources) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var src = _step.value;

        if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object') {
          Object.getOwnPropertyNames(src).forEach(function (key) {
            dst[key] = src[key];
          });
        }
      };

      for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
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

// clone given item
function _clone(src) {
  if (!src) {
    return src;
  }

  if (typeof src.clone === 'function') {
    return src.clone();
  } else if (_isPlainObject(src) || _isArray(src)) {
    var _ret2 = function () {
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

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = handlers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var typeHandler = _step2.value;

      if (typeHandler.type === type) {
        typeHandler.handler = handler;

        return;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = handlerLists[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var handlers = _step3.value;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = handlers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var typeHandler = _step4.value;

          // if type is a string then use `typeof` or else use `instanceof`
          if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === typeHandler.type || typeof typeHandler.type !== 'string' && value instanceof typeHandler.type) {
            return typeHandler.handler;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
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
    _isSquelBuilder: function _isSquelBuilder(obj) {
      return obj && !!obj._toParamString;
    }
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
    separator: ' ',
    // Function for formatting string values prior to insertion into query string
    stringFormatter: null
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
       * Sanitize given expression.
       */

    }, {
      key: '_sanitizeExpression',
      value: function _sanitizeExpression(expr) {
        // If it's not a base builder instance
        if (!cls._isSquelBuilder(expr)) {
          // It must then be a string
          if (typeof expr !== "string") {
            throw new Error("expression must be a string or builder instance");
          }
        }

        return expr;
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
        if (!cls._isSquelBuilder(item)) {
          item = this._sanitizeName(item, "field name");
        }

        return item;
      }
    }, {
      key: '_sanitizeBaseBuilder',
      value: function _sanitizeBaseBuilder(item) {
        if (cls._isSquelBuilder(item)) {
          return item;
        }

        throw new Error("must be a builder instance");
      }
    }, {
      key: '_sanitizeTable',
      value: function _sanitizeTable(item) {
        if (typeof item !== "string") {
          try {
            item = this._sanitizeBaseBuilder(item);
          } catch (e) {
            throw new Error("table name must be a string or a builder");
          }
        } else {
          item = this._sanitizeName(item, 'table');
        }

        return item;
      }
    }, {
      key: '_sanitizeTableAlias',
      value: function _sanitizeTableAlias(item) {
        return this._sanitizeName(item, "table alias");
      }
    }, {
      key: '_sanitizeFieldAlias',
      value: function _sanitizeFieldAlias(item) {
        return this._sanitizeName(item, "field alias");
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
          } else if (cls._isSquelBuilder(item)) {
              // Builders allowed
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
    }, {
      key: '_formatTableName',
      value: function _formatTableName(item) {
        if (this.options.autoQuoteTableNames) {
          var quoteChar = this.options.nameQuoteCharacter;

          item = '' + quoteChar + item + quoteChar;
        }

        return item;
      }
    }, {
      key: '_formatFieldAlias',
      value: function _formatFieldAlias(item) {
        if (this.options.autoQuoteAliasNames) {
          var quoteChar = this.options.fieldAliasQuoteCharacter;

          item = '' + quoteChar + item + quoteChar;
        }

        return item;
      }
    }, {
      key: '_formatTableAlias',
      value: function _formatTableAlias(item) {
        if (this.options.autoQuoteAliasNames) {
          var quoteChar = this.options.tableAliasQuoteCharacter;

          item = '' + quoteChar + item + quoteChar;
        }

        return this.options.useAsForTableAliasNames ? 'AS ' + item : item;
      }
    }, {
      key: '_formatFieldName',
      value: function _formatFieldName(item) {
        var _this2 = this;

        var formattingOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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

        return item;
      }

      // Format the given custom value

    }, {
      key: '_formatCustomValue',
      value: function _formatCustomValue(value, asParam, formattingOptions) {
        // user defined custom handlers takes precedence
        var customHandler = getValueHandler(value, this.options.valueHandlers, cls.globalValueHandlers);

        // use the custom handler if available
        if (customHandler) {
          value = customHandler(value, asParam, formattingOptions);
        }

        return {
          formatted: !!customHandler,
          value: value
        };
      }

      /**
       * Format given value for inclusion into parameter values array.
       */

    }, {
      key: '_formatValueForParamArray',
      value: function _formatValueForParamArray(value) {
        var _this3 = this;

        var formattingOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (_isArray(value)) {
          return value.map(function (v) {
            return _this3._formatValueForParamArray(v, formattingOptions);
          });
        } else {
          return this._formatCustomValue(value, true, formattingOptions).value;
        }
      }

      /**
       * Format the given field value for inclusion into the query string
       */

    }, {
      key: '_formatValueForQueryString',
      value: function _formatValueForQueryString(initialValue) {
        var _this4 = this;

        var formattingOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _formatCustomValue2 = this._formatCustomValue(initialValue, false, formattingOptions);

        var formatted = _formatCustomValue2.formatted;
        var value = _formatCustomValue2.value;

        // if formatting took place then return it directly

        if (formatted) {
          return this._applyNestingFormatting(value);
        }

        // if it's an array then format each element separately
        if (_isArray(value)) {
          value = value.map(function (v) {
            return _this4._formatValueForQueryString(v);
          });

          value = this._applyNestingFormatting(value.join(', '));
        } else {
          var typeofValue = typeof value === 'undefined' ? 'undefined' : _typeof(value);

          if (null === value) {
            value = "NULL";
          } else if (typeofValue === "boolean") {
            value = value ? "TRUE" : "FALSE";
          } else if (cls._isSquelBuilder(value)) {
            value = this._applyNestingFormatting(value.toString());
          } else if (typeofValue !== "number") {
            // if it's a string and we have custom string formatting turned on then use that
            if ('string' === typeofValue && this.options.stringFormatter) {
              return this.options.stringFormatter(value);
            }

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
    }, {
      key: '_applyNestingFormatting',
      value: function _applyNestingFormatting(str) {
        var nesting = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        if (str && typeof str === 'string' && nesting) {
          // don't want to apply twice
          if ('(' !== str.charAt(0) || ')' !== str.charAt(str.length - 1)) {
            return '(' + str + ')';
          }
        }

        return str;
      }

      /**
       * Build given string and its corresponding parameter values into
       * output.
       *
       * @param {String} str
       * @param {Array}  values
       * @param {Object} [options] Additional options.
       * @param {Boolean} [options.buildParameterized] Whether to build paramterized string. Default is false.
       * @param {Boolean} [options.nested] Whether this expression is nested within another.
       * @param {Boolean} [options.formattingOptions] Formatting options for values in query string.
       * @return {Object}
       */

    }, {
      key: '_buildString',
      value: function _buildString(str, values) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var nested = options.nested;
        var buildParameterized = options.buildParameterized;
        var formattingOptions = options.formattingOptions;


        values = values || [];
        str = str || '';

        var formattedStr = '',
            curValue = -1,
            formattedValues = [];

        var paramChar = this.options.parameterCharacter;

        var idx = 0;

        while (str.length > idx) {
          // param char?
          if (str.substr(idx, paramChar.length) === paramChar) {
            var value = values[++curValue];

            if (buildParameterized) {
              if (cls._isSquelBuilder(value)) {
                var ret = value._toParamString({
                  buildParameterized: buildParameterized,
                  nested: true
                });

                formattedStr += ret.text;
                formattedValues.push.apply(formattedValues, _toConsumableArray(ret.values));
              } else {
                value = this._formatValueForParamArray(value, formattingOptions);

                if (_isArray(value)) {
                  // Array(6) -> "(??, ??, ??, ??, ??, ??)"
                  var tmpStr = value.map(function () {
                    return paramChar;
                  }).join(', ');

                  formattedStr += '(' + tmpStr + ')';

                  formattedValues.push.apply(formattedValues, _toConsumableArray(value));
                } else {
                  formattedStr += paramChar;

                  formattedValues.push(value);
                }
              }
            } else {
              formattedStr += this._formatValueForQueryString(value, formattingOptions);
            }

            idx += paramChar.length;
          } else {
            formattedStr += str.charAt(idx);

            idx++;
          }
        }

        return {
          text: this._applyNestingFormatting(formattedStr, !!nested),
          values: formattedValues
        };
      }

      /**
       * Build all given strings and their corresponding parameter values into
       * output.
       *
       * @param {Array} strings
       * @param {Array}  strValues array of value arrays corresponding to each string.
       * @param {Object} [options] Additional options.
       * @param {Boolean} [options.buildParameterized] Whether to build paramterized string. Default is false.
       * @param {Boolean} [options.nested] Whether this expression is nested within another.
       * @return {Object}
       */

    }, {
      key: '_buildManyStrings',
      value: function _buildManyStrings(strings, strValues) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var totalStr = [],
            totalValues = [];

        for (var idx = 0; strings.length > idx; ++idx) {
          var inputString = strings[idx],
              inputValues = strValues[idx];

          var _buildString2 = this._buildString(inputString, inputValues, {
            buildParameterized: options.buildParameterized,
            nested: false
          });

          var text = _buildString2.text;
          var values = _buildString2.values;


          totalStr.push(text);
          totalValues.push.apply(totalValues, _toConsumableArray(values));
        }

        totalStr = totalStr.join(this.options.separator);

        return {
          text: totalStr.length ? this._applyNestingFormatting(totalStr, !!options.nested) : '',
          values: totalValues
        };
      }

      /**
       * Get parameterized representation of this instance.
       *
       * @param {Object} [options] Options.
       * @param {Boolean} [options.buildParameterized] Whether to build paramterized string. Default is false.
       * @param {Boolean} [options.nested] Whether this expression is nested within another.
       * @return {Object}
       */

    }, {
      key: '_toParamString',
      value: function _toParamString(options) {
        throw new Error('Not yet implemented');
      }

      /**
       * Get the expression string.
       * @return {String}
       */

    }, {
      key: 'toString',
      value: function toString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return this._toParamString(options).text;
      }

      /**
       * Get the parameterized expression string.
       * @return {Object}
       */

    }, {
      key: 'toParam',
      value: function toParam() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return this._toParamString(_extend({}, options, {
          buildParameterized: true
        }));
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

  /**
   * An SQL expression builder.
   *
   * SQL expressions are used in WHERE and ON clauses to filter data by various criteria.
   *
   * Expressions can be nested. Nested expression contains can themselves
   * contain nested expressions. When rendered a nested expression will be
   * fully contained within brackets.
   *
   * All the build methods in this object return the object instance for chained method calling purposes.
   */
  cls.Expression = function (_cls$BaseBuilder) {
    _inherits(_class3, _cls$BaseBuilder);

    // Initialise the expression.

    function _class3(options) {
      _classCallCheck(this, _class3);

      var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).call(this, options));

      _this5._nodes = [];
      return _this5;
    }

    // Combine the current expression with the given expression using the intersection operator (AND).


    _createClass(_class3, [{
      key: 'and',
      value: function and(expr) {
        for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          params[_key3 - 1] = arguments[_key3];
        }

        expr = this._sanitizeExpression(expr);

        this._nodes.push({
          type: 'AND',
          expr: expr,
          para: params
        });

        return this;
      }

      // Combine the current expression with the given expression using the union operator (OR).

    }, {
      key: 'or',
      value: function or(expr) {
        for (var _len4 = arguments.length, params = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          params[_key4 - 1] = arguments[_key4];
        }

        expr = this._sanitizeExpression(expr);

        this._nodes.push({
          type: 'OR',
          expr: expr,
          para: params
        });

        return this;
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = [],
            totalValues = [];

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var node = _step5.value;
            var type = node.type;
            var expr = node.expr;
            var para = node.para;

            var _ref = cls._isSquelBuilder(expr) ? expr._toParamString({
              buildParameterized: options.buildParameterized,
              nested: true
            }) : this._buildString(expr, para, {
              buildParameterized: options.buildParameterized
            });

            var text = _ref.text;
            var values = _ref.values;


            if (totalStr.length) {
              totalStr.push(type);
            }

            totalStr.push(text);
            totalValues.push.apply(totalValues, _toConsumableArray(values));
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        totalStr = totalStr.join(' ');

        return {
          text: this._applyNestingFormatting(totalStr, !!options.nested),
          values: totalValues
        };
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

      var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).call(this, options));

      if (_isPlainObject(fieldName)) {
        options = fieldName;

        fieldName = null;
      }

      if (fieldName) {
        _this6._fieldName = _this6._sanitizeField(fieldName);
      }

      _this6.options = _extend({}, cls.DefaultQueryBuilderOptions, options);

      _this6._cases = [];
      _this6._elseValue = null;
      return _this6;
    }

    _createClass(_class4, [{
      key: 'when',
      value: function when(expression) {
        for (var _len5 = arguments.length, values = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          values[_key5 - 1] = arguments[_key5];
        }

        this._cases.unshift({
          expression: expression,
          values: values
        });

        return this;
      }
    }, {
      key: 'then',
      value: function then(result) {
        if (this._cases.length == 0) {
          throw new Error("when() needs to be called first");
        }

        this._cases[0].result = result;

        return this;
      }
    }, {
      key: 'else',
      value: function _else(elseValue) {
        this._elseValue = elseValue;

        return this;
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = '',
            totalValues = [];

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this._cases[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _step6$value = _step6.value;
            var expression = _step6$value.expression;
            var values = _step6$value.values;
            var result = _step6$value.result;

            totalStr = _pad(totalStr, ' ');

            var ret = this._buildString(expression, values, {
              buildParameterized: options.buildParameterized,
              nested: true
            });

            totalStr += 'WHEN ' + ret.text + ' THEN ' + this._formatValueForQueryString(result);
            totalValues.push.apply(totalValues, _toConsumableArray(ret.values));
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        if (totalStr.length) {
          totalStr += ' ELSE ' + this._formatValueForQueryString(this._elseValue) + ' END';

          if (this._fieldName) {
            totalStr = this._fieldName + ' ' + totalStr;
          }

          totalStr = 'CASE ' + totalStr;
        } else {
          totalStr = this._formatValueForQueryString(this._elseValue);
        }

        return {
          text: totalStr,
          values: totalValues
        };
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
    #   constructor and toString()
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
    }]);

    return _class5;
  }(cls.BaseBuilder);

  // A fixed string which always gets output
  cls.StringBlock = function (_cls$Block) {
    _inherits(_class6, _cls$Block);

    function _class6(options, str) {
      _classCallCheck(this, _class6);

      var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class6).call(this, options));

      _this8._str = str;
      return _this8;
    }

    _createClass(_class6, [{
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return {
          text: this._str,
          values: []
        };
      }
    }]);

    return _class6;
  }(cls.Block);

  // A function string block
  cls.FunctionBlock = function (_cls$Block2) {
    _inherits(_class7, _cls$Block2);

    function _class7(options) {
      _classCallCheck(this, _class7);

      var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class7).call(this, options));

      _this9._strings = [];
      _this9._values = [];
      return _this9;
    }

    _createClass(_class7, [{
      key: 'function',
      value: function _function(str) {
        this._strings.push(str);

        for (var _len6 = arguments.length, values = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          values[_key6 - 1] = arguments[_key6];
        }

        this._values.push(values);
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return this._buildManyStrings(this._strings, this._values, options);
      }
    }]);

    return _class7;
  }(cls.Block);

  // value handler for FunctionValueBlock objects
  cls.registerValueHandler(cls.FunctionBlock, function (value) {
    var asParam = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    return asParam ? value.toParam() : value.toString();
  });

  /*
  # Table specifier base class
  */
  cls.AbstractTableBlock = function (_cls$Block3) {
    _inherits(_class8, _cls$Block3);

    /**
     * @param {Boolean} [options.singleTable] If true then only allow one table spec.
     * @param {String} [options.prefix] String prefix for output.
     */

    function _class8(options, prefix) {
      _classCallCheck(this, _class8);

      var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class8).call(this, options));

      _this10._tables = [];
      return _this10;
    }

    /**
    # Update given table.
    #
    # An alias may also be specified for the table.
    #
    # Concrete subclasses should provide a method which calls this
    */


    _createClass(_class8, [{
      key: '_table',
      value: function _table(table) {
        var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        alias = alias ? this._sanitizeTableAlias(alias) : alias;
        table = this._sanitizeTable(table);

        if (this.options.singleTable) {
          this._tables = [];
        }

        this._tables.push({
          table: table,
          alias: alias
        });
      }

      // get whether a table has been set

    }, {
      key: '_hasTable',
      value: function _hasTable() {
        return 0 < this._tables.length;
      }

      /**
       * @override
       */

    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = '',
            totalValues = [];

        if (this._hasTable()) {
          // retrieve the parameterised queries
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = this._tables[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _step7$value = _step7.value;
              var table = _step7$value.table;
              var alias = _step7$value.alias;

              totalStr = _pad(totalStr, ', ');

              var tableStr = void 0;

              if (cls._isSquelBuilder(table)) {
                var _table$_toParamString = table._toParamString({
                  buildParameterized: options.buildParameterized,
                  nested: true
                });

                var text = _table$_toParamString.text;
                var values = _table$_toParamString.values;


                tableStr = text;
                totalValues.push.apply(totalValues, _toConsumableArray(values));
              } else {
                tableStr = this._formatTableName(table);
              }

              if (alias) {
                tableStr += ' ' + this._formatTableAlias(alias);
              }

              totalStr += tableStr;
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          if (this.options.prefix) {
            totalStr = this.options.prefix + ' ' + totalStr;
          }
        }

        return {
          text: totalStr,
          values: totalValues
        };
      }
    }]);

    return _class8;
  }(cls.Block);

  // target table for DELETE queries, DELETE <??> FROM
  cls.TargetTableBlock = function (_cls$AbstractTableBlo) {
    _inherits(_class9, _cls$AbstractTableBlo);

    function _class9() {
      _classCallCheck(this, _class9);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class9).apply(this, arguments));
    }

    _createClass(_class9, [{
      key: 'target',
      value: function target(table) {
        this._table(table);
      }
    }]);

    return _class9;
  }(cls.AbstractTableBlock);

  // Update Table
  cls.UpdateTableBlock = function (_cls$AbstractTableBlo2) {
    _inherits(_class10, _cls$AbstractTableBlo2);

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
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        if (!this._hasTable()) {
          throw new Error("table() needs to be called");
        }

        return _get(Object.getPrototypeOf(_class10.prototype), '_toParamString', this).call(this, options);
      }
    }]);

    return _class10;
  }(cls.AbstractTableBlock);

  // FROM table
  cls.FromTableBlock = function (_cls$AbstractTableBlo3) {
    _inherits(_class11, _cls$AbstractTableBlo3);

    function _class11(options) {
      _classCallCheck(this, _class11);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class11).call(this, _extend({}, options, {
        prefix: 'FROM'
      })));
    }

    _createClass(_class11, [{
      key: 'from',
      value: function from(table) {
        var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        this._table(table, alias);
      }
    }]);

    return _class11;
  }(cls.AbstractTableBlock);

  // INTO table
  cls.IntoTableBlock = function (_cls$AbstractTableBlo4) {
    _inherits(_class12, _cls$AbstractTableBlo4);

    function _class12(options) {
      _classCallCheck(this, _class12);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class12).call(this, _extend({}, options, {
        prefix: 'INTO',
        singleTable: true
      })));
    }

    _createClass(_class12, [{
      key: 'into',
      value: function into(table) {
        this._table(table);
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        if (!this._hasTable()) {
          throw new Error("into() needs to be called");
        }

        return _get(Object.getPrototypeOf(_class12.prototype), '_toParamString', this).call(this, options);
      }
    }]);

    return _class12;
  }(cls.AbstractTableBlock);

  // (SELECT) Get field
  cls.GetFieldBlock = function (_cls$Block4) {
    _inherits(_class13, _cls$Block4);

    function _class13(options) {
      _classCallCheck(this, _class13);

      var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class13).call(this, options));

      _this15._fields = [];
      return _this15;
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
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (_isArray(_fields)) {
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = _fields[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var field = _step8.value;

              this.field(field, null, options);
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        } else {
          for (var _field2 in _fields) {
            var alias = _fields[_field2];

            this.field(_field2, alias, options);
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

        alias = alias ? this._sanitizeFieldAlias(alias) : alias;
        _field = this._sanitizeField(_field);

        // if field-alias combo already present then don't add
        var existingField = this._fields.filter(function (f) {
          return f.name === _field && f.alias === alias;
        });
        if (existingField.length) {
          return this;
        }

        this._fields.push({
          name: _field,
          alias: alias,
          options: options
        });
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var queryBuilder = options.queryBuilder;
        var buildParameterized = options.buildParameterized;


        var totalStr = '',
            totalValues = [];

        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this._fields[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var field = _step9.value;

            totalStr = _pad(totalStr, ", ");

            var name = field.name;
            var alias = field.alias;
            var _options = field.options;


            if (typeof name === 'string') {
              totalStr += this._formatFieldName(name, _options);
            } else {
              var ret = name._toParamString({
                nested: true,
                buildParameterized: buildParameterized
              });

              totalStr += ret.text;
              totalValues.push.apply(totalValues, _toConsumableArray(ret.values));
            }

            if (alias) {
              totalStr += ' AS ' + this._formatFieldAlias(alias);
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        if (!totalStr.length) {
          // if select query and a table is set then all fields wanted
          var fromTableBlock = queryBuilder && queryBuilder.getBlock(cls.FromTableBlock);
          if (fromTableBlock && fromTableBlock._hasTable()) {
            totalStr = "*";
          }
        }

        return {
          text: totalStr,
          values: totalValues
        };
      }
    }]);

    return _class13;
  }(cls.Block);

  // Base class for setting fields to values (used for INSERT and UPDATE queries)
  cls.AbstractSetFieldBlock = function (_cls$Block5) {
    _inherits(_class14, _cls$Block5);

    function _class14(options) {
      _classCallCheck(this, _class14);

      var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class14).call(this, options));

      _this16._reset();
      return _this16;
    }

    _createClass(_class14, [{
      key: '_reset',
      value: function _reset() {
        this._fields = [];
        this._values = [[]];
        this._valueOptions = [[]];
      }

      // Update the given field with the given value.
      // This will override any previously set value for the given field.

    }, {
      key: '_set',
      value: function _set(field, value) {
        var valueOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        if (this._values.length > 1) {
          throw new Error("Cannot set multiple rows of fields this way.");
        }

        if (typeof value !== 'undefined') {
          value = this._sanitizeValue(value);
        }

        field = this._sanitizeField(field);

        // Explicity overwrite existing fields
        var index = this._fields.indexOf(field);

        // if field not defined before
        if (-1 === index) {
          this._fields.push(field);
          index = this._fields.length - 1;
        }

        this._values[0][index] = value;
        this._valueOptions[0][index] = valueOptions;
      }

      // Insert fields based on the key/value pairs in the given object

    }, {
      key: '_setFields',
      value: function _setFields(fields) {
        var valueOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if ((typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) !== 'object') {
          throw new Error("Expected an object but got " + (typeof fields === 'undefined' ? 'undefined' : _typeof(fields)));
        }

        for (var field in fields) {
          this._set(field, fields[field], valueOptions);
        }
      }

      // Insert multiple rows for the given fields. Accepts an array of objects.
      // This will override all previously set values for every field.

    }, {
      key: '_setFieldsRows',
      value: function _setFieldsRows(fieldsRows) {
        var valueOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (!_isArray(fieldsRows)) {
          throw new Error("Expected an array of objects but got " + (typeof fieldsRows === 'undefined' ? 'undefined' : _typeof(fieldsRows)));
        }

        // Reset the objects stored fields and values
        this._reset();

        // for each row
        for (var i = 0; fieldsRows.length > i; ++i) {
          var fieldRow = fieldsRows[i];

          // for each field
          for (var field in fieldRow) {
            var value = fieldRow[field];

            field = this._sanitizeField(field);
            value = this._sanitizeValue(value);

            var index = this._fields.indexOf(field);

            if (0 < i && -1 === index) {
              throw new Error('All fields in subsequent rows must match the fields in the first row');
            }

            // Add field only if it hasn't been added before
            if (-1 === index) {
              this._fields.push(field);
              index = this._fields.length - 1;
            }

            // The first value added needs to add the array
            if (!_isArray(this._values[i])) {
              this._values[i] = [];
              this._valueOptions[i] = [];
            }

            this._values[i][index] = value;
            this._valueOptions[i][index] = valueOptions;
          }
        }
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
      value: function setFields(fields, valueOptions) {
        this._setFields(fields, valueOptions);
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var buildParameterized = options.buildParameterized;


        if (0 >= this._fields.length) {
          throw new Error("set() needs to be called");
        }

        var totalStr = '',
            totalValues = [];

        for (var i = 0; i < this._fields.length; ++i) {
          totalStr = _pad(totalStr, ', ');

          var field = this._formatFieldName(this._fields[i]);
          var value = this._values[0][i];

          // e.g. field can be an expression such as `count = count + 1`
          if (0 > field.indexOf('=')) {
            field = field + ' = ' + this.options.parameterCharacter;
          }

          var ret = this._buildString(field, [value], {
            buildParameterized: buildParameterized,
            formattingOptions: this._valueOptions[0][i]
          });

          totalStr += ret.text;
          totalValues.push.apply(totalValues, _toConsumableArray(ret.values));
        }

        return {
          text: 'SET ' + totalStr,
          values: totalValues
        };
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
      value: function setFields(fields, valueOptions) {
        this._setFields(fields, valueOptions);
      }
    }, {
      key: 'setFieldsRows',
      value: function setFieldsRows(fieldsRows, valueOptions) {
        this._setFieldsRows(fieldsRows, valueOptions);
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var _this19 = this;

        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var buildParameterized = options.buildParameterized;


        var fieldString = this._fields.map(function (f) {
          return _this19._formatFieldName(f);
        }).join(', ');

        var valueStrings = [],
            totalValues = [];

        for (var i = 0; i < this._values.length; ++i) {
          valueStrings[i] = '';

          for (var j = 0; j < this._values[i].length; ++j) {
            var ret = this._buildString(this.options.parameterCharacter, [this._values[i][j]], {
              buildParameterized: buildParameterized,
              formattingOptions: this._valueOptions[i][j]
            });

            totalValues.push.apply(totalValues, _toConsumableArray(ret.values));

            valueStrings[i] = _pad(valueStrings[i], ', ');
            valueStrings[i] += ret.text;
          }
        }

        return {
          text: fieldString.length ? '(' + fieldString + ') VALUES (' + valueStrings.join('), (') + ')' : '',
          values: totalValues
        };
      }
    }]);

    return _class16;
  }(cls.AbstractSetFieldBlock);

  // (INSERT INTO) ... field ... (SELECT ... FROM ...)
  cls.InsertFieldsFromQueryBlock = function (_cls$Block6) {
    _inherits(_class17, _cls$Block6);

    function _class17(options) {
      _classCallCheck(this, _class17);

      var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class17).call(this, options));

      _this20._fields = [];
      _this20._query = null;
      return _this20;
    }

    _createClass(_class17, [{
      key: 'fromQuery',
      value: function fromQuery(fields, selectQuery) {
        var _this21 = this;

        this._fields = fields.map(function (v) {
          return _this21._sanitizeField(v);
        });

        this._query = this._sanitizeBaseBuilder(selectQuery);
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = '',
            totalValues = [];

        if (this._fields.length && this._query) {
          var _query$_toParamString = this._query._toParamString({
            buildParameterized: options.buildParameterized,
            nested: true
          });

          var text = _query$_toParamString.text;
          var values = _query$_toParamString.values;


          totalStr = '(' + this._fields.join(', ') + ') ' + this._applyNestingFormatting(text);
          totalValues = values;
        }

        return {
          text: totalStr,
          values: totalValues
        };
      }
    }]);

    return _class17;
  }(cls.Block);

  // DISTINCT
  cls.DistinctBlock = function (_cls$Block7) {
    _inherits(_class18, _cls$Block7);

    function _class18() {
      _classCallCheck(this, _class18);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class18).apply(this, arguments));
    }

    _createClass(_class18, [{
      key: 'distinct',

      // Add the DISTINCT keyword to the query.
      value: function distinct() {
        this._useDistinct = true;
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        return {
          text: this._useDistinct ? "DISTINCT" : "",
          values: []
        };
      }
    }]);

    return _class18;
  }(cls.Block);

  // GROUP BY
  cls.GroupByBlock = function (_cls$Block8) {
    _inherits(_class19, _cls$Block8);

    function _class19(options) {
      _classCallCheck(this, _class19);

      var _this23 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class19).call(this, options));

      _this23._groups = [];
      return _this23;
    }

    // Add a GROUP BY transformation for the given field.


    _createClass(_class19, [{
      key: 'group',
      value: function group(field) {
        this._groups.push(this._sanitizeField(field));
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return {
          text: this._groups.length ? 'GROUP BY ' + this._groups.join(', ') : '',
          values: []
        };
      }
    }]);

    return _class19;
  }(cls.Block);

  cls.AbstractVerbSingleValueBlock = function (_cls$Block9) {
    _inherits(_class20, _cls$Block9);

    /**
     * @param options.verb The prefix verb string.
     */

    function _class20(options) {
      _classCallCheck(this, _class20);

      var _this24 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class20).call(this, options));

      _this24._value = 0;
      return _this24;
    }

    _createClass(_class20, [{
      key: '_setValue',
      value: function _setValue(value) {
        this._value = this._sanitizeLimitOffset(value);
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var expr = 0 < this._value ? this.options.verb + ' ' + this.options.parameterCharacter : '';

        var values = null !== this._value ? [this._value] : [];

        return this._buildString(expr, values, options);
      }
    }]);

    return _class20;
  }(cls.Block);

  // OFFSET x
  cls.OffsetBlock = function (_cls$AbstractVerbSing) {
    _inherits(_class21, _cls$AbstractVerbSing);

    function _class21(options) {
      _classCallCheck(this, _class21);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class21).call(this, _extend({}, options, {
        verb: 'OFFSET'
      })));
    }

    /**
    # Set the OFFSET transformation.
    #
    # Call this will override the previously set offset for this query. Also note that Passing 0 for 'max' will remove
    # the offset.
    */


    _createClass(_class21, [{
      key: 'offset',
      value: function offset(start) {
        this._setValue(start);
      }
    }]);

    return _class21;
  }(cls.AbstractVerbSingleValueBlock);

  // LIMIT
  cls.LimitBlock = function (_cls$AbstractVerbSing2) {
    _inherits(_class22, _cls$AbstractVerbSing2);

    function _class22(options) {
      _classCallCheck(this, _class22);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class22).call(this, _extend({}, options, {
        verb: 'LIMIT'
      })));
    }

    /**
    # Set the LIMIT transformation.
    #
    # Call this will override the previously set limit for this query. Also note that Passing 0 for 'max' will remove
    # the limit.
    */


    _createClass(_class22, [{
      key: 'limit',
      value: function limit(_limit) {
        this._setValue(_limit);
      }
    }]);

    return _class22;
  }(cls.AbstractVerbSingleValueBlock);

  // Abstract condition base class
  cls.AbstractConditionBlock = function (_cls$Block10) {
    _inherits(_class23, _cls$Block10);

    /**
     * @param {String} options.verb The condition verb.
     */

    function _class23(options) {
      _classCallCheck(this, _class23);

      var _this27 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class23).call(this, options));

      _this27._conditions = [];
      return _this27;
    }

    /**
    # Add a condition.
    #
    # When the final query is constructed all the conditions are combined using the intersection (AND) operator.
    #
    # Concrete subclasses should provide a method which calls this
    */


    _createClass(_class23, [{
      key: '_condition',
      value: function _condition(condition) {
        for (var _len7 = arguments.length, values = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          values[_key7 - 1] = arguments[_key7];
        }

        condition = this._sanitizeExpression(condition);

        this._conditions.push({
          expr: condition,
          values: values
        });
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = [],
            totalValues = [];

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = this._conditions[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _step10$value = _step10.value;
            var expr = _step10$value.expr;
            var values = _step10$value.values;

            var ret = cls._isSquelBuilder(expr) ? expr._toParamString({
              buildParameterized: options.buildParameterized
            }) : this._buildString(expr, values, {
              buildParameterized: options.buildParameterized
            });

            if (ret.text.length) {
              totalStr.push(ret.text);
            }

            totalValues.push.apply(totalValues, _toConsumableArray(ret.values));
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        if (totalStr.length) {
          totalStr = totalStr.join(') AND (');
        }

        return {
          text: totalStr.length ? this.options.verb + ' (' + totalStr + ')' : '',
          values: totalValues
        };
      }
    }]);

    return _class23;
  }(cls.Block);

  // WHERE
  cls.WhereBlock = function (_cls$AbstractConditio) {
    _inherits(_class24, _cls$AbstractConditio);

    function _class24(options) {
      _classCallCheck(this, _class24);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class24).call(this, _extend({}, options, {
        verb: 'WHERE'
      })));
    }

    _createClass(_class24, [{
      key: 'where',
      value: function where(condition) {
        for (var _len8 = arguments.length, values = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
          values[_key8 - 1] = arguments[_key8];
        }

        this._condition.apply(this, [condition].concat(values));
      }
    }]);

    return _class24;
  }(cls.AbstractConditionBlock);

  // HAVING
  cls.HavingBlock = function (_cls$AbstractConditio2) {
    _inherits(_class25, _cls$AbstractConditio2);

    function _class25(options) {
      _classCallCheck(this, _class25);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class25).call(this, _extend({}, options, {
        verb: 'HAVING'
      })));
    }

    _createClass(_class25, [{
      key: 'having',
      value: function having(condition) {
        for (var _len9 = arguments.length, values = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
          values[_key9 - 1] = arguments[_key9];
        }

        this._condition.apply(this, [condition].concat(values));
      }
    }]);

    return _class25;
  }(cls.AbstractConditionBlock);

  // ORDER BY
  cls.OrderByBlock = function (_cls$Block11) {
    _inherits(_class26, _cls$Block11);

    function _class26(options) {
      _classCallCheck(this, _class26);

      var _this30 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class26).call(this, options));

      _this30._orders = [];
      return _this30;
    }

    /**
    # Add an ORDER BY transformation for the given field in the given order.
    #
    # To specify descending order pass false for the 'dir' parameter.
    */


    _createClass(_class26, [{
      key: 'order',
      value: function order(field, dir) {
        for (var _len10 = arguments.length, values = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
          values[_key10 - 2] = arguments[_key10];
        }

        field = this._sanitizeField(field);

        if (!(typeof dir === 'string')) {
          if (dir === undefined) {
            dir = 'ASC'; // Default to asc
          } else if (dir !== null) {
              dir = dir ? 'ASC' : 'DESC'; // Convert truthy to asc
            }
        }

        this._orders.push({
          field: field,
          dir: dir,
          values: values
        });
      }
    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = '',
            totalValues = [];

        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = this._orders[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _step11$value = _step11.value;
            var field = _step11$value.field;
            var dir = _step11$value.dir;
            var values = _step11$value.values;

            totalStr = _pad(totalStr, ', ');

            var ret = this._buildString(field, values, {
              buildParameterized: options.buildParameterized
            });

            totalStr += ret.text, totalValues.push.apply(totalValues, _toConsumableArray(ret.values));

            if (dir !== null) {
              totalStr += ' ' + dir;
            }
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
              _iterator11.return();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        return {
          text: totalStr.length ? 'ORDER BY ' + totalStr : '',
          values: totalValues
        };
      }
    }]);

    return _class26;
  }(cls.Block);

  // JOIN
  cls.JoinBlock = function (_cls$Block12) {
    _inherits(_class27, _cls$Block12);

    function _class27(options) {
      _classCallCheck(this, _class27);

      var _this31 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class27).call(this, options));

      _this31._joins = [];
      return _this31;
    }

    /**
    # Add a JOIN with the given table.
    #
    # 'table' is the name of the table to join with.
    #
    # 'alias' is an optional alias for the table name.
    #
    # 'condition' is an optional condition (containing an SQL expression) for the JOIN.
    #
    # 'type' must be either one of INNER, OUTER, LEFT or RIGHT. Default is 'INNER'.
    #
    */


    _createClass(_class27, [{
      key: 'join',
      value: function join(table) {
        var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var condition = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
        var type = arguments.length <= 3 || arguments[3] === undefined ? 'INNER' : arguments[3];

        table = this._sanitizeTable(table, true);
        alias = alias ? this._sanitizeTableAlias(alias) : alias;
        condition = condition ? this._sanitizeExpression(condition) : condition;

        this._joins.push({
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
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = "",
            totalValues = [];

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = this._joins[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var _step12$value = _step12.value;
            var type = _step12$value.type;
            var table = _step12$value.table;
            var alias = _step12$value.alias;
            var condition = _step12$value.condition;

            totalStr = _pad(totalStr, this.options.separator);

            var tableStr = void 0;

            if (cls._isSquelBuilder(table)) {
              var ret = table._toParamString({
                buildParameterized: options.buildParameterized,
                nested: true
              });

              totalValues.push.apply(totalValues, _toConsumableArray(ret.values));
              tableStr = ret.text;
            } else {
              tableStr = this._formatTableName(table);
            }

            totalStr += type + ' JOIN ' + tableStr;

            if (alias) {
              totalStr += ' ' + this._formatTableAlias(alias);
            }

            if (condition) {
              totalStr += ' ON ';

              var _ret4 = void 0;

              if (cls._isSquelBuilder(condition)) {
                _ret4 = condition._toParamString({
                  buildParameterized: options.buildParameterized
                });
              } else {
                _ret4 = this._buildString(condition, [], {
                  buildParameterized: options.buildParameterized
                });
              }

              totalStr += this._applyNestingFormatting(_ret4.text);
              totalValues.push.apply(totalValues, _toConsumableArray(_ret4.values));
            }
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
              _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }

        return {
          text: totalStr,
          values: totalValues
        };
      }
    }]);

    return _class27;
  }(cls.Block);

  // UNION
  cls.UnionBlock = function (_cls$Block13) {
    _inherits(_class28, _cls$Block13);

    function _class28(options) {
      _classCallCheck(this, _class28);

      var _this32 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class28).call(this, options));

      _this32._unions = [];
      return _this32;
    }

    /**
    # Add a UNION with the given table/query.
    #
    # 'table' is the name of the table or query to union with.
    #
    # 'type' must be either one of UNION or UNION ALL.... Default is 'UNION'.
    */


    _createClass(_class28, [{
      key: 'union',
      value: function union(table) {
        var type = arguments.length <= 1 || arguments[1] === undefined ? 'UNION' : arguments[1];

        table = this._sanitizeTable(table);

        this._unions.push({
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
      key: '_toParamString',
      value: function _toParamString() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var totalStr = '',
            totalValues = [];

        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = this._unions[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var _step13$value = _step13.value;
            var type = _step13$value.type;
            var table = _step13$value.table;

            totalStr = _pad(totalStr, this.options.separator);

            var tableStr = void 0;

            if (table instanceof cls.BaseBuilder) {
              var ret = table._toParamString({
                buildParameterized: options.buildParameterized,
                nested: true
              });

              tableStr = ret.text;
              totalValues.push.apply(totalValues, _toConsumableArray(ret.values));
            } else {
              totalStr = this._formatTableName(table);
            }

            totalStr += type + ' ' + tableStr;
          }
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
              _iterator13.return();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }

        return {
          text: totalStr,
          values: totalValues
        };
      }
    }]);

    return _class28;
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
    _inherits(_class29, _cls$BaseBuilder4);

    /**
    # Constructor
    #
    # blocks - array of cls.BaseBuilderBlock instances to build the query with.
    */

    function _class29(options, blocks) {
      _classCallCheck(this, _class29);

      var _this33 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class29).call(this, options));

      _this33.blocks = blocks || [];

      // Copy exposed methods into myself
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = _this33.blocks[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var block = _step14.value;

          var exposedMethods = block.exposedMethods();

          for (var methodName in exposedMethods) {
            var methodBody = exposedMethods[methodName];

            if (undefined !== _this33[methodName]) {
              throw new Error('Builder already has a builder method called: ' + methodName);
            }

            (function (block, name, body) {
              _this33[name] = function () {
                for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                  args[_key11] = arguments[_key11];
                }

                body.call.apply(body, [block].concat(args));

                return _this33;
              };
            })(block, methodName, methodBody);
          }
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14.return) {
            _iterator14.return();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }

      return _this33;
    }

    /**
    # Register a custom value handler for this query builder and all its contained blocks.
    #
    # Note: This will override any globally registered handler for this value type.
    */


    _createClass(_class29, [{
      key: 'registerValueHandler',
      value: function registerValueHandler(type, handler) {
        var _iteratorNormalCompletion15 = true;
        var _didIteratorError15 = false;
        var _iteratorError15 = undefined;

        try {
          for (var _iterator15 = this.blocks[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            var block = _step15.value;

            block.registerValueHandler(type, handler);
          }
        } catch (err) {
          _didIteratorError15 = true;
          _iteratorError15 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion15 && _iterator15.return) {
              _iterator15.return();
            }
          } finally {
            if (_didIteratorError15) {
              throw _iteratorError15;
            }
          }
        }

        _get(Object.getPrototypeOf(_class29.prototype), 'registerValueHandler', this).call(this, type, handler);

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

        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = this.blocks[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var block = _step16.value;

            block.options = _extend({}, block.options, options);
          }
        } catch (err) {
          _didIteratorError16 = true;
          _iteratorError16 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion16 && _iterator16.return) {
              _iterator16.return();
            }
          } finally {
            if (_didIteratorError16) {
              throw _iteratorError16;
            }
          }
        }
      }

      // Get the final fully constructed query param obj.

    }, {
      key: '_toParamString',
      value: function _toParamString() {
        var _this34 = this,
            _ref2;

        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        options = _extend({}, this.options, options);

        var blockResults = this.blocks.map(function (b) {
          return b._toParamString({
            buildParameterized: options.buildParameterized,
            queryBuilder: _this34
          });
        });

        var blockTexts = blockResults.map(function (b) {
          return b.text;
        });
        var blockValues = blockResults.map(function (b) {
          return b.values;
        });

        var totalStr = blockTexts.filter(function (v) {
          return 0 < v.length;
        }).join(options.separator);

        var totalValues = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(blockValues));

        if (!options.nested) {
          if (options.numberedParameters) {
            (function () {
              var i = undefined !== options.numberedParametersStartAt ? options.numberedParametersStartAt : 1;

              // construct regex for searching
              var regex = options.parameterCharacter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

              totalStr = totalStr.replace(new RegExp(regex, 'g'), function () {
                return '' + options.numberedParametersPrefix + i++;
              });
            })();
          }
        }

        return {
          text: this._applyNestingFormatting(totalStr, !!options.nested),
          values: totalValues
        };
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

    return _class29;
  }(cls.BaseBuilder);

  // SELECT query builder.
  cls.Select = function (_cls$QueryBuilder) {
    _inherits(_class30, _cls$QueryBuilder);

    function _class30(options) {
      var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      _classCallCheck(this, _class30);

      blocks = blocks || [new cls.StringBlock(options, 'SELECT'), new cls.FunctionBlock(options), new cls.DistinctBlock(options), new cls.GetFieldBlock(options), new cls.FromTableBlock(options), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.GroupByBlock(options), new cls.HavingBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.OffsetBlock(options), new cls.UnionBlock(options)];

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class30).call(this, options, blocks));
    }

    return _class30;
  }(cls.QueryBuilder);

  // UPDATE query builder.
  cls.Update = function (_cls$QueryBuilder2) {
    _inherits(_class31, _cls$QueryBuilder2);

    function _class31(options) {
      var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      _classCallCheck(this, _class31);

      blocks = blocks || [new cls.StringBlock(options, 'UPDATE'), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class31).call(this, options, blocks));
    }

    return _class31;
  }(cls.QueryBuilder);

  // DELETE query builder.
  cls.Delete = function (_cls$QueryBuilder3) {
    _inherits(_class32, _cls$QueryBuilder3);

    function _class32(options) {
      var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      _classCallCheck(this, _class32);

      blocks = blocks || [new cls.StringBlock(options, 'DELETE'), new cls.TargetTableBlock(options), new cls.FromTableBlock(_extend({}, options, {
        singleTable: true
      })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)];

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class32).call(this, options, blocks));
    }

    return _class32;
  }(cls.QueryBuilder);

  // An INSERT query builder.
  cls.Insert = function (_cls$QueryBuilder4) {
    _inherits(_class33, _cls$QueryBuilder4);

    function _class33(options) {
      var blocks = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      _classCallCheck(this, _class33);

      blocks = blocks || [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options)];

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class33).call(this, options, blocks));
    }

    return _class33;
  }(cls.QueryBuilder);

  var _squel = {
    VERSION: '5.5.1',
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
    str: function str() {
      var inst = new cls.FunctionBlock();
      inst.function.apply(inst, arguments);
      return inst;
    },
    registerValueHandler: cls.registerValueHandler
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
return squel;
}));
