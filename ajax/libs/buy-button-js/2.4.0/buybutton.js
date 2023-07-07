var ShopifyBuy = (function () {
  'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /*
  @license
  The MIT License (MIT)

  Copyright (c) 2016 Shopify Inc.

  Permission is hereby granted, free of charge, to any person obtaining a
  copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  */

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };











  var classCallCheck$1 = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass$1 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();









  var inherits$1 = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };











  var possibleConstructorReturn$1 = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /*
  The MIT License (MIT)
  Copyright (c) 2016 Shopify Inc.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
  OR OTHER DEALINGS IN THE SOFTWARE.


  */
  function join() {
    for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
      fields[_key] = arguments[_key];
    }

    return fields.join(' ');
  }

  function isObject(value) {
    return Boolean(value) && Object.prototype.toString.call(value.valueOf()) === '[object Object]';
  }

  function deepFreezeCopyExcept(predicate, structure) {
    if (predicate(structure)) {
      return structure;
    } else if (isObject(structure)) {
      return Object.freeze(Object.keys(structure).reduce(function (copy, key) {
        copy[key] = deepFreezeCopyExcept(predicate, structure[key]);

        return copy;
      }, {}));
    } else if (Array.isArray(structure)) {
      return Object.freeze(structure.map(function (item) {
        return deepFreezeCopyExcept(predicate, item);
      }));
    } else {
      return structure;
    }
  }

  function schemaForType(typeBundle, typeName) {
    var typeSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var type = typeBundle.types[typeName];

    if (type) {
      return type;
    } else if (typeSchema && typeSchema.kind === 'INTERFACE') {
      return typeSchema;
    }

    throw new Error('No type of ' + typeName + ' found in schema');
  }

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var VariableDefinition = function () {

    /**
     * This constructor should not be invoked directly.
     * Use the factory function {@link Client#variable} to create a VariableDefinition.
     *
     * @param {String} name The name of the variable.
     * @param {String} type The GraphQL type of the variable.
     * @param {*} [defaultValue] The default value of the variable.
     */
    function VariableDefinition(name, type, defaultValue) {
      classCallCheck(this, VariableDefinition);

      this.name = name;
      this.type = type;
      this.defaultValue = defaultValue;
      Object.freeze(this);
    }

    /**
     * Returns the GraphQL query string for the variable as an input value (e.g. `$variableName`).
     *
     * @return {String} The GraphQL query string for the variable as an input value.
     */

    createClass(VariableDefinition, [{
      key: 'toInputValueString',
      value: function toInputValueString() {
        return '$' + this.name;
      }

      /**
       * Returns the GraphQL query string for the variable (e.g. `$variableName:VariableType = defaultValue`).
       *
       * @return {String} The GraphQL query string for the variable.
       */

    }, {
      key: 'toString',
      value: function toString() {
        var defaultValueString = this.defaultValue ? ' = ' + formatInputValue(this.defaultValue) : '';

        return '$' + this.name + ':' + this.type + defaultValueString;
      }
    }]);
    return VariableDefinition;
  }();

  function isVariable(value) {
    return VariableDefinition.prototype.isPrototypeOf(value);
  }

  function variable(name, type, defaultValue) {
    return new VariableDefinition(name, type, defaultValue);
  }

  var Enum = function () {

    /**
     * This constructor should not be invoked directly.
     * Use the factory function {@link Client#enum} to create an Enum.
     *
     * @param {String} key The key of the enum.
     */
    function Enum(key) {
      classCallCheck(this, Enum);

      this.key = key;
    }

    /**
     * Returns the GraphQL query string for the enum (e.g. `enumKey`).
     *
     * @return {String} The GraphQL query string for the enum.
     */

    createClass(Enum, [{
      key: "toString",
      value: function toString() {
        return this.key;
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.key.valueOf();
      }
    }]);
    return Enum;
  }();

  var enumFunction = function enumFunction(key) {
    return new Enum(key);
  };

  var Scalar = function () {
    function Scalar(value) {
      classCallCheck(this, Scalar);

      this.value = value;
    }

    createClass(Scalar, [{
      key: "toString",
      value: function toString() {
        return this.value.toString();
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.value.valueOf();
      }
    }, {
      key: "unwrapped",
      get: function get$$1() {
        return this.value;
      }
    }]);
    return Scalar;
  }();

  function formatInputValue(value) {
    if (VariableDefinition.prototype.isPrototypeOf(value)) {
      return value.toInputValueString();
    } else if (Enum.prototype.isPrototypeOf(value)) {
      return String(value);
    } else if (Scalar.prototype.isPrototypeOf(value)) {
      return JSON.stringify(value.valueOf());
    } else if (Array.isArray(value)) {
      return '[' + join.apply(undefined, toConsumableArray(value.map(formatInputValue))) + ']';
    } else if (isObject(value)) {
      return formatObject(value, '{', '}');
    } else {
      return JSON.stringify(value);
    }
  }

  function formatObject(value) {
    var openChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var closeChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var argPairs = Object.keys(value).map(function (key) {
      return key + ': ' + formatInputValue(value[key]);
    });

    return '' + openChar + join.apply(undefined, toConsumableArray(argPairs)) + closeChar;
  }

  function formatArgs(args) {
    if (!Object.keys(args).length) {
      return '';
    }

    return ' (' + formatObject(args) + ')';
  }

  function formatDirectives(directives) {
    if (!Object.keys(directives).length) {
      return '';
    }

    var directiveStrings = Object.keys(directives).map(function (key) {
      var directiveArgs = directives[key];
      var arg = directiveArgs && Object.keys(directiveArgs).length ? '(' + formatObject(directiveArgs) + ')' : '';

      return '@' + key + arg;
    });

    return ' ' + join.apply(undefined, toConsumableArray(directiveStrings));
  }

  // eslint-disable-next-line no-empty-function
  var noop = function noop() {};

  var Profiler = {
    trackTypeDependency: noop,
    trackFieldDependency: noop
  };

  var trackTypeDependency = Profiler.trackTypeDependency;
  var trackFieldDependency = Profiler.trackFieldDependency;

  function parseFieldCreationArgs(creationArgs) {
    var callback = noop;
    var options = {};
    var selectionSet = null;

    if (creationArgs.length === 2) {
      if (typeof creationArgs[1] === 'function') {
        var _creationArgs = slicedToArray(creationArgs, 2);

        options = _creationArgs[0];
        callback = _creationArgs[1];
      } else {
        var _creationArgs2 = slicedToArray(creationArgs, 2);

        options = _creationArgs2[0];
        selectionSet = _creationArgs2[1];
      }
    } else if (creationArgs.length === 1) {
      // SelectionSet is defined before this function is called since it's
      // called by SelectionSet
      // eslint-disable-next-line no-use-before-define
      if (SelectionSet.prototype.isPrototypeOf(creationArgs[0])) {
        selectionSet = creationArgs[0];
      } else if (typeof creationArgs[0] === 'function') {
        callback = creationArgs[0];
      } else {
        options = creationArgs[0];
      }
    }

    return { options: options, selectionSet: selectionSet, callback: callback };
  }

  var emptyArgs = Object.freeze({});
  var emptyDirectives = Object.freeze({});

  var Field = function () {

    /**
     * This constructor should not be invoked directly.
     * Fields are added to a selection by {@link SelectionSetBuilder#add}, {@link SelectionSetBuilder#addConnection}
     * and {@link SelectionSetBuilder#addInlineFragmentOn}.
     *
     * @param {String} name The name of the field.
     * @param {Object} [options] An options object containing:
     *   @param {Object} [options.args] Arguments for the field.
     *   @param {String} [options.alias] An alias for the field.
     *   @param {Object} [options.directives] Directives for the field.
     * @param {SelectionSet} selectionSet The selection set on the field.
     */
    function Field(name, options, selectionSet) {
      classCallCheck(this, Field);

      this.name = name;
      this.alias = options.alias || null;
      this.responseKey = this.alias || this.name;
      this.args = options.args ? deepFreezeCopyExcept(isVariable, options.args) : emptyArgs;
      this.directives = options.directives ? deepFreezeCopyExcept(isVariable, options.directives) : emptyDirectives;
      this.selectionSet = selectionSet;
      Object.freeze(this);
    }

    /**
     * Returns the GraphQL query string for the Field (e.g. `catAlias: cat(size: 'small') { name }` or `name`).
     *
     * @return {String} The GraphQL query string for the Field.
     */

    createClass(Field, [{
      key: 'toString',
      value: function toString() {
        var aliasPrefix = this.alias ? this.alias + ': ' : '';

        return '' + aliasPrefix + this.name + formatArgs(this.args) + formatDirectives(this.directives) + this.selectionSet;
      }
    }]);
    return Field;
  }();

  // This is an interface that defines a usage, and simplifies type checking
  var Spread = function Spread() {
    classCallCheck(this, Spread);
  };

  var InlineFragment = function (_Spread) {
    inherits(InlineFragment, _Spread);

    /**
     * This constructor should not be invoked directly.
     * Use the factory function {@link SelectionSetBuilder#addInlineFragmentOn} to create an InlineFragment.
     *
     * @param {String} typeName The type of the fragment.
     * @param {SelectionSet} selectionSet The selection set on the fragment.
     */
    function InlineFragment(typeName, selectionSet) {
      classCallCheck(this, InlineFragment);

      var _this = possibleConstructorReturn(this, (InlineFragment.__proto__ || Object.getPrototypeOf(InlineFragment)).call(this));

      _this.typeName = typeName;
      _this.selectionSet = selectionSet;
      Object.freeze(_this);
      return _this;
    }

    /**
     * Returns the GraphQL query string for the InlineFragment (e.g. `... on Cat { name }`).
     *
     * @return {String} The GraphQL query string for the InlineFragment.
     */

    createClass(InlineFragment, [{
      key: 'toString',
      value: function toString() {
        return '... on ' + this.typeName + this.selectionSet;
      }
    }]);
    return InlineFragment;
  }(Spread);

  var FragmentSpread = function (_Spread2) {
    inherits(FragmentSpread, _Spread2);

    /**
     * This constructor should not be invoked directly.
     * Use the factory function {@link Document#defineFragment} to create a FragmentSpread.
     *
     * @param {FragmentDefinition} fragmentDefinition The corresponding fragment definition.
     */
    function FragmentSpread(fragmentDefinition) {
      classCallCheck(this, FragmentSpread);

      var _this2 = possibleConstructorReturn(this, (FragmentSpread.__proto__ || Object.getPrototypeOf(FragmentSpread)).call(this));

      _this2.name = fragmentDefinition.name;
      _this2.selectionSet = fragmentDefinition.selectionSet;
      Object.freeze(_this2);
      return _this2;
    }

    /**
     * Returns the GraphQL query string for the FragmentSpread (e.g. `...catName`).
     *
     * @return {String} The GraphQL query string for the FragmentSpread.
     */

    createClass(FragmentSpread, [{
      key: 'toString',
      value: function toString() {
        return '...' + this.name;
      }
    }, {
      key: 'toDefinition',
      value: function toDefinition() {
        // eslint-disable-next-line no-use-before-define
        return new FragmentDefinition(this.name, this.selectionSet.typeSchema.name, this.selectionSet);
      }
    }]);
    return FragmentSpread;
  }(Spread);

  var FragmentDefinition = function () {

    /**
     * This constructor should not be invoked directly.
     * Use the factory function {@link Document#defineFragment} to create a FragmentDefinition on a {@link Document}.
     *
     * @param {String} name The name of the fragment definition.
     * @param {String} typeName The type of the fragment.
     */
    function FragmentDefinition(name, typeName, selectionSet) {
      classCallCheck(this, FragmentDefinition);

      this.name = name;
      this.typeName = typeName;
      this.selectionSet = selectionSet;
      this.spread = new FragmentSpread(this);
      Object.freeze(this);
    }

    /**
     * Returns the GraphQL query string for the FragmentDefinition (e.g. `fragment catName on Cat { name }`).
     *
     * @return {String} The GraphQL query string for the FragmentDefinition.
     */

    createClass(FragmentDefinition, [{
      key: 'toString',
      value: function toString() {
        return 'fragment ' + this.name + ' on ' + this.typeName + ' ' + this.selectionSet;
      }
    }]);
    return FragmentDefinition;
  }();

  function selectionsHaveIdField(selections) {
    return selections.some(function (fieldOrFragment) {
      if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
        return fieldOrFragment.name === 'id';
      } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
        return selectionsHaveIdField(fieldOrFragment.selectionSet.selections);
      }

      return false;
    });
  }

  function selectionsHaveTypenameField(selections) {
    return selections.some(function (fieldOrFragment) {
      if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
        return fieldOrFragment.name === '__typename';
      } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
        return selectionsHaveTypenameField(fieldOrFragment.selectionSet.selections);
      }

      return false;
    });
  }

  function indexSelectionsByResponseKey(selections) {
    function assignOrPush(obj, key, value) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [value];
      }
    }
    var unfrozenObject = selections.reduce(function (acc, selection) {
      if (selection.responseKey) {
        assignOrPush(acc, selection.responseKey, selection);
      } else {
        var responseKeys = Object.keys(selection.selectionSet.selectionsByResponseKey);

        responseKeys.forEach(function (responseKey) {
          assignOrPush(acc, responseKey, selection);
        });
      }

      return acc;
    }, {});

    Object.keys(unfrozenObject).forEach(function (key) {
      Object.freeze(unfrozenObject[key]);
    });

    return Object.freeze(unfrozenObject);
  }

  /**
   * Class that specifies the full selection of data to query.
   */

  var SelectionSet = function () {

    /**
     * This constructor should not be invoked directly. SelectionSets are created when building queries/mutations.
     *
     * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
     * @param {(Object|String)} type The type of the current selection.
     * @param {Function} builderFunction Callback function used to build the SelectionSet.
     *   The callback takes a {@link SelectionSetBuilder} as its argument.
     */
    function SelectionSet(typeBundle, type, builderFunction) {
      classCallCheck(this, SelectionSet);

      if (typeof type === 'string') {
        this.typeSchema = schemaForType(typeBundle, type);
      } else {
        this.typeSchema = type;
      }

      trackTypeDependency(this.typeSchema.name);

      this.typeBundle = typeBundle;
      this.selections = [];
      if (builderFunction) {
        // eslint-disable-next-line no-use-before-define
        builderFunction(new SelectionSetBuilder(this.typeBundle, this.typeSchema, this.selections));
      }

      if (this.typeSchema.implementsNode || this.typeSchema.name === 'Node') {
        if (!selectionsHaveIdField(this.selections)) {
          this.selections.unshift(new Field('id', {}, new SelectionSet(typeBundle, 'ID')));
        }
      }

      if (this.typeSchema.kind === 'INTERFACE') {
        if (!selectionsHaveTypenameField(this.selections)) {
          this.selections.unshift(new Field('__typename', {}, new SelectionSet(typeBundle, 'String')));
        }
      }

      this.selectionsByResponseKey = indexSelectionsByResponseKey(this.selections);
      Object.freeze(this.selections);
      Object.freeze(this);
    }

    /**
     * Returns the GraphQL query string for the SelectionSet (e.g. `{ cat { name } }`).
     *
     * @return {String} The GraphQL query string for the SelectionSet.
     */

    createClass(SelectionSet, [{
      key: 'toString',
      value: function toString() {
        if (this.typeSchema.kind === 'SCALAR' || this.typeSchema.kind === 'ENUM') {
          return '';
        } else {
          return ' { ' + join(this.selections) + ' }';
        }
      }
    }]);
    return SelectionSet;
  }();

  var SelectionSetBuilder = function () {

    /**
     * This constructor should not be invoked directly. SelectionSetBuilders are created when building queries/mutations.
     *
     * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
     * @param {Object} typeSchema The schema object for the type of the current selection.
     * @param {Field[]} selections The fields on the current selection.
     */
    function SelectionSetBuilder(typeBundle, typeSchema, selections) {
      classCallCheck(this, SelectionSetBuilder);

      this.typeBundle = typeBundle;
      this.typeSchema = typeSchema;
      this.selections = selections;
    }

    createClass(SelectionSetBuilder, [{
      key: 'hasSelectionWithResponseKey',
      value: function hasSelectionWithResponseKey(responseKey) {
        return this.selections.some(function (field) {
          return field.responseKey === responseKey;
        });
      }

      /**
       * Adds a field to be queried on the current selection.
       *
       * @example
       * client.query((root) => {
       *   root.add('cat', {args: {id: '123456'}, alias: 'meow'}, (cat) => {
       *     cat.add('name');
       *   });
       * });
       *
       * @param {SelectionSet|String} selectionOrFieldName The selection or name of the field to add.
       * @param {Object} [options] Options on the query including:
       *   @param {Object} [options.args] Arguments on the query (e.g. `{id: '123456'}`).
       *   @param {String} [options.alias] Alias for the field being added.
       * @param {Function|SelectionSet} [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       */

    }, {
      key: 'add',
      value: function add(selectionOrFieldName) {
        var selection = void 0;

        if (Object.prototype.toString.call(selectionOrFieldName) === '[object String]') {
          trackFieldDependency(this.typeSchema.name, selectionOrFieldName);

          for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }

          selection = this.field.apply(this, [selectionOrFieldName].concat(rest));
        } else {
          if (Field.prototype.isPrototypeOf(selectionOrFieldName)) {
            trackFieldDependency(this.typeSchema.name, selectionOrFieldName.name);
          }

          selection = selectionOrFieldName;
        }

        if (selection.responseKey && this.hasSelectionWithResponseKey(selection.responseKey)) {
          throw new Error('The field name or alias \'' + selection.responseKey + '\' has already been added.');
        }
        this.selections.push(selection);
      }
    }, {
      key: 'field',
      value: function field(name) {
        for (var _len2 = arguments.length, creationArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          creationArgs[_key2 - 1] = arguments[_key2];
        }

        var parsedArgs = parseFieldCreationArgs(creationArgs);
        var options = parsedArgs.options,
            callback = parsedArgs.callback;
        var selectionSet = parsedArgs.selectionSet;

        if (!selectionSet) {
          if (!this.typeSchema.fieldBaseTypes[name]) {
            throw new Error('No field of name "' + name + '" found on type "' + this.typeSchema.name + '" in schema');
          }

          var fieldBaseType = schemaForType(this.typeBundle, this.typeSchema.fieldBaseTypes[name]);

          selectionSet = new SelectionSet(this.typeBundle, fieldBaseType, callback);
        }

        return new Field(name, options, selectionSet);
      }

      /**
       * Creates an inline fragment.
       *
       * @access private
       * @param {String} typeName The type  the inline fragment.
       * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       * @return {InlineFragment} An inline fragment.
       */

    }, {
      key: 'inlineFragmentOn',
      value: function inlineFragmentOn(typeName) {
        var builderFunctionOrSelectionSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

        var selectionSet = void 0;

        if (SelectionSet.prototype.isPrototypeOf(builderFunctionOrSelectionSet)) {
          selectionSet = builderFunctionOrSelectionSet;
        } else {
          selectionSet = new SelectionSet(this.typeBundle, schemaForType(this.typeBundle, typeName), builderFunctionOrSelectionSet);
        }

        return new InlineFragment(typeName, selectionSet);
      }

      /**
       * Adds a field to be queried on the current selection.
       *
       * @access private
       * @param {String}    name The name of the field to add to the query.
       * @param {Object} [options] Options on the query including:
       *   @param {Object} [options.args] Arguments on the query (e.g. `{id: '123456'}`).
       *   @param {String} [options.alias] Alias for the field being added.
       * @param {Function}  [callback] Callback which will be used to create a new {@link SelectionSet} for the field added.
       */

    }, {
      key: 'addField',
      value: function addField(name) {
        for (var _len3 = arguments.length, creationArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          creationArgs[_key3 - 1] = arguments[_key3];
        }

        this.add.apply(this, [name].concat(creationArgs));
      }

      /**
       * Adds a connection to be queried on the current selection.
       * This adds all the fields necessary for pagination.
       *
       * @example
       * client.query((root) => {
       *   root.add('cat', (cat) => {
       *     cat.addConnection('friends', {args: {first: 10}, alias: 'coolCats'}, (friends) => {
       *       friends.add('name');
       *     });
       *   });
       * });
       *
       * @param {String}    name The name of the connection to add to the query.
       * @param {Object} [options] Options on the query including:
       *   @param {Object} [options.args] Arguments on the query (e.g. `{first: 10}`).
       *   @param {String} [options.alias] Alias for the field being added.
       * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       */

    }, {
      key: 'addConnection',
      value: function addConnection(name) {
        for (var _len4 = arguments.length, creationArgs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          creationArgs[_key4 - 1] = arguments[_key4];
        }

        var _parseFieldCreationAr = parseFieldCreationArgs(creationArgs),
            options = _parseFieldCreationAr.options,
            callback = _parseFieldCreationAr.callback,
            selectionSet = _parseFieldCreationAr.selectionSet;

        this.add(name, options, function (connection) {
          connection.add('pageInfo', {}, function (pageInfo) {
            pageInfo.add('hasNextPage');
            pageInfo.add('hasPreviousPage');
          });
          connection.add('edges', {}, function (edges) {
            edges.add('cursor');
            edges.addField('node', {}, selectionSet || callback); // This is bad. Don't do this
          });
        });
      }

      /**
       * Adds an inline fragment on the current selection.
       *
       * @example
       * client.query((root) => {
       *   root.add('animal', (animal) => {
       *     animal.addInlineFragmentOn('cat', (cat) => {
       *       cat.add('name');
       *     });
       *   });
       * });
       *
       * @param {String} typeName The name of the type of the inline fragment.
       * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       */

    }, {
      key: 'addInlineFragmentOn',
      value: function addInlineFragmentOn(typeName) {
        var fieldTypeCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

        this.add(this.inlineFragmentOn(typeName, fieldTypeCb));
      }

      /**
       * Adds a fragment spread on the current selection.
       *
       * @example
       * client.query((root) => {
       *   root.addFragment(catFragmentSpread);
       * });
       *
       * @param {FragmentSpread} fragmentSpread The fragment spread to add.
       */

    }, {
      key: 'addFragment',
      value: function addFragment(fragmentSpread) {
        this.add(fragmentSpread);
      }
    }]);
    return SelectionSetBuilder;
  }();

  function parseArgs(args) {
    var name = void 0;
    var variables = void 0;
    var selectionSetCallback = void 0;

    if (args.length === 3) {
      var _args = slicedToArray(args, 3);

      name = _args[0];
      variables = _args[1];
      selectionSetCallback = _args[2];
    } else if (args.length === 2) {
      if (Object.prototype.toString.call(args[0]) === '[object String]') {
        name = args[0];
        variables = null;
      } else if (Array.isArray(args[0])) {
        variables = args[0];
        name = null;
      }

      selectionSetCallback = args[1];
    } else {
      selectionSetCallback = args[0];
      name = null;
    }

    return { name: name, variables: variables, selectionSetCallback: selectionSetCallback };
  }

  var VariableDefinitions = function () {
    function VariableDefinitions(variableDefinitions) {
      classCallCheck(this, VariableDefinitions);

      this.variableDefinitions = variableDefinitions ? [].concat(toConsumableArray(variableDefinitions)) : [];
      Object.freeze(this.variableDefinitions);
      Object.freeze(this);
    }

    createClass(VariableDefinitions, [{
      key: 'toString',
      value: function toString() {
        if (this.variableDefinitions.length === 0) {
          return '';
        }

        return ' (' + join(this.variableDefinitions) + ') ';
      }
    }]);
    return VariableDefinitions;
  }();

  /**
   * Base class for {@link Query} and {@link Mutation}.
   * @abstract
   */

  var Operation = function () {

    /**
     * This constructor should not be invoked. The subclasses {@link Query} and {@link Mutation} should be used instead.
     */
    function Operation(typeBundle, operationType) {
      classCallCheck(this, Operation);

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var _parseArgs = parseArgs(args),
          name = _parseArgs.name,
          variables = _parseArgs.variables,
          selectionSetCallback = _parseArgs.selectionSetCallback;

      this.typeBundle = typeBundle;
      this.name = name;
      this.variableDefinitions = new VariableDefinitions(variables);
      this.operationType = operationType;
      if (operationType === 'query') {
        this.selectionSet = new SelectionSet(typeBundle, typeBundle.queryType, selectionSetCallback);
        this.typeSchema = schemaForType(typeBundle, typeBundle.queryType);
      } else {
        this.selectionSet = new SelectionSet(typeBundle, typeBundle.mutationType, selectionSetCallback);
        this.typeSchema = schemaForType(typeBundle, typeBundle.mutationType);
      }
      Object.freeze(this);
    }

    /**
     * Whether the operation is anonymous (i.e. has no name).
     */

    createClass(Operation, [{
      key: 'toString',

      /**
       * Returns the GraphQL query or mutation string (e.g. `query myQuery { cat { name } }`).
       *
       * @return {String} The GraphQL query or mutation string.
       */
      value: function toString() {
        var nameString = this.name ? ' ' + this.name : '';

        return '' + this.operationType + nameString + this.variableDefinitions + this.selectionSet;
      }
    }, {
      key: 'isAnonymous',
      get: function get$$1() {
        return !this.name;
      }
    }]);
    return Operation;
  }();

  /**
   * GraphQL Query class.
   * @extends Operation
   */

  var Query = function (_Operation) {
    inherits(Query, _Operation);

    /**
     * This constructor should not be invoked directly.
     * Use the factory functions {@link Client#query} or {@link Document#addQuery} to create a Query.
     *
     * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
     * @param {String} [name] A name for the query.
     * @param {Object[]} [variables] A list of variables in the query. See {@link Client#variable}.
     * @param {Function} selectionSetCallback The query builder callback.
     *   A {@link SelectionSet} is created using this callback.
     */
    function Query(typeBundle) {
      var _ref;

      classCallCheck(this, Query);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return possibleConstructorReturn(this, (_ref = Query.__proto__ || Object.getPrototypeOf(Query)).call.apply(_ref, [this, typeBundle, 'query'].concat(args)));
    }

    return Query;
  }(Operation);

  /**
   * GraphQL Mutation class.
   * @extends Operation
   */

  var Mutation = function (_Operation) {
    inherits(Mutation, _Operation);

    /**
     * This constructor should not be invoked directly.
     * Use the factory functions {@link Client#mutation} or {@link Document#addMutation} to create a Mutation.
     *
     * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
     * @param {String} [name] A name for the mutation.
     * @param {Object[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
     * @param {Function} selectionSetCallback The mutation builder callback.
     *   A {@link SelectionSet} is created using this callback.
     */
    function Mutation(typeBundle) {
      var _ref;

      classCallCheck(this, Mutation);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return possibleConstructorReturn(this, (_ref = Mutation.__proto__ || Object.getPrototypeOf(Mutation)).call.apply(_ref, [this, typeBundle, 'mutation'].concat(args)));
    }

    return Mutation;
  }(Operation);

  function isAnonymous(operation) {
    return operation.isAnonymous;
  }

  function hasAnonymousOperations(operations) {
    return operations.some(isAnonymous);
  }

  function hasDuplicateOperationNames(operations) {
    var names = operations.map(function (operation) {
      return operation.name;
    });

    return names.reduce(function (hasDuplicates, name, index) {
      return hasDuplicates || names.indexOf(name) !== index;
    }, false);
  }

  function extractOperation(typeBundle, operationType) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (Operation.prototype.isPrototypeOf(args[0])) {
      return args[0];
    }

    if (operationType === 'query') {
      return new (Function.prototype.bind.apply(Query, [null].concat([typeBundle], args)))();
    } else {
      return new (Function.prototype.bind.apply(Mutation, [null].concat([typeBundle], args)))();
    }
  }

  function isInvalidOperationCombination(operations) {
    if (operations.length === 1) {
      return false;
    }

    return hasAnonymousOperations(operations) || hasDuplicateOperationNames(operations);
  }

  function fragmentNameIsNotUnique(existingDefinitions, name) {
    return existingDefinitions.some(function (definition) {
      return definition.name === name;
    });
  }

  var Document = function () {

    /**
     * This constructor should not be invoked directly.
     * Use the factory function {@link Client#document} to create a Document.
     * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
     */
    function Document(typeBundle) {
      classCallCheck(this, Document);

      this.typeBundle = typeBundle;
      this.definitions = [];
    }

    /**
     * Returns the GraphQL query string for the Document (e.g. `query queryOne { ... } query queryTwo { ... }`).
     *
     * @return {String} The GraphQL query string for the Document.
     */

    createClass(Document, [{
      key: 'toString',
      value: function toString() {
        return join(this.definitions);
      }

      /**
       * Adds an operation to the Document.
       *
       * @private
       * @param {String} operationType The type of the operation. Either 'query' or 'mutation'.
       * @param {(Operation|String)} [query|queryName] Either an instance of an operation
       *   object, or the name of an operation. Both are optional.
       * @param {Object[]} [variables] A list of variables in the operation. See {@link Client#variable}.
       * @param {Function} [callback] The query builder callback. If an operation
       *   instance is passed, this callback will be ignored.
       *   A {@link SelectionSet} is created using this callback.
        */

    }, {
      key: 'addOperation',
      value: function addOperation(operationType) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var operation = extractOperation.apply(undefined, [this.typeBundle, operationType].concat(args));

        if (isInvalidOperationCombination(this.operations.concat(operation))) {
          throw new Error('All operations must be uniquely named on a multi-operation document');
        }

        this.definitions.push(operation);
      }

      /**
       * Adds a query to the Document.
       *
       * @example
       * document.addQuery('myQuery', (root) => {
       *   root.add('cat', (cat) => {
       *    cat.add('name');
       *   });
       * });
       *
       * @param {(Query|String)} [query|queryName] Either an instance of a query
       *   object, or the name of a query. Both are optional.
       * @param {Object[]} [variables] A list of variables in the query. See {@link Client#variable}.
       * @param {Function} [callback] The query builder callback. If a query
       *   instance is passed, this callback will be ignored.
       *   A {@link SelectionSet} is created using this callback.
       */

    }, {
      key: 'addQuery',
      value: function addQuery() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        this.addOperation.apply(this, ['query'].concat(args));
      }

      /**
       * Adds a mutation to the Document.
       *
       * @example
       * const input = client.variable('input', 'CatCreateInput!');
       *
       * document.addMutation('myMutation', [input], (root) => {
       *   root.add('catCreate', {args: {input}}, (catCreate) => {
       *     catCreate.add('cat', (cat) => {
       *       cat.add('name');
       *     });
       *   });
       * });
       *
       * @param {(Mutation|String)} [mutation|mutationName] Either an instance of a mutation
       *   object, or the name of a mutation. Both are optional.
       * @param {Object[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
       * @param {Function} [callback] The mutation builder callback. If a mutation
       *   instance is passed, this callback will be ignored.
       *   A {@link SelectionSet} is created using this callback.
       */

    }, {
      key: 'addMutation',
      value: function addMutation() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        this.addOperation.apply(this, ['mutation'].concat(args));
      }

      /**
       * Defines a fragment on the Document.
       *
       * @param {String} name The name of the fragment.
       * @param {String} onType The type the fragment is on.
       * @param {Function} [builderFunction] The query builder callback.
       *   A {@link SelectionSet} is created using this callback.
       * @return {FragmentSpread} A {@link FragmentSpread} to be used with {@link SelectionSetBuilder#addFragment}.
       */

    }, {
      key: 'defineFragment',
      value: function defineFragment(name, onType, builderFunction) {
        if (fragmentNameIsNotUnique(this.fragmentDefinitions, name)) {
          throw new Error('All fragments must be uniquely named on a multi-fragment document');
        }

        var selectionSet = new SelectionSet(this.typeBundle, onType, builderFunction);
        var fragment = new FragmentDefinition(name, onType, selectionSet);

        this.definitions.push(fragment);

        return fragment.spread;
      }

      /**
       * All operations ({@link Query} and {@link Mutation}) on the Document.
       */

    }, {
      key: 'operations',
      get: function get$$1() {
        return this.definitions.filter(function (definition) {
          return Operation.prototype.isPrototypeOf(definition);
        });
      }

      /**
       * All {@link FragmentDefinition}s on the Document.
       */

    }, {
      key: 'fragmentDefinitions',
      get: function get$$1() {
        return this.definitions.filter(function (definition) {
          return FragmentDefinition.prototype.isPrototypeOf(definition);
        });
      }
    }]);
    return Document;
  }();

  /**
   * The base class used when deserializing response data.
   * Provides rich features, like functions to generate queries to refetch a node or fetch the next page.
   *
   * @class
   */
  var GraphModel =

  /**
   * @param {Object} attrs Attributes on the GraphModel.
   */
  function GraphModel(attrs) {
    var _this = this;

    classCallCheck(this, GraphModel);

    Object.defineProperty(this, 'attrs', { value: attrs, enumerable: false });

    Object.keys(this.attrs).filter(function (key) {
      return !(key in _this);
    }).forEach(function (key) {
      var descriptor = void 0;

      if (attrs[key] === null) {
        descriptor = {
          enumerable: true,
          get: function get$$1() {
            return null;
          }
        };
      } else {
        descriptor = {
          enumerable: true,
          get: function get$$1() {
            return this.attrs[key].valueOf();
          }
        };
      }
      Object.defineProperty(_this, key, descriptor);
    });
  };

  /**
   * A registry of classes used to deserialize the response data. Uses {@link GraphModel} by default.
   */

  var ClassRegistry = function () {
    function ClassRegistry() {
      classCallCheck(this, ClassRegistry);

      this.classStore = {};
    }

    /**
     * Registers a class for a GraphQL type in the registry.
     *
     * @param {Class} constructor The constructor of the class.
     * @param {String} type The GraphQL type of the object to deserialize into the class.
     */

    createClass(ClassRegistry, [{
      key: 'registerClassForType',
      value: function registerClassForType(constructor, type) {
        this.classStore[type] = constructor;
      }

      /**
       * Unregisters a class for a GraphQL type in the registry.
       *
       * @param {String} type The GraphQL type to unregister.
       */

    }, {
      key: 'unregisterClassForType',
      value: function unregisterClassForType(type) {
        delete this.classStore[type];
      }

      /**
       * Returns the class for the given GraphQL type.
       *
       * @param {String} type The GraphQL type to look up.
       * @return {Class|GraphModel} The class for the given GraphQL type. Defaults to {@link GraphModel} if no class is registered for the GraphQL type.
       */

    }, {
      key: 'classForType',
      value: function classForType(type) {
        return this.classStore[type] || GraphModel;
      }
    }]);
    return ClassRegistry;
  }();

  function isValue(arg) {
    return Object.prototype.toString.call(arg) !== '[object Null]' && Object.prototype.toString.call(arg) !== '[object Undefined]';
  }

  function isNodeContext(context) {
    return context.selection.selectionSet.typeSchema.implementsNode;
  }

  function isConnection(context) {
    return context.selection.selectionSet.typeSchema.name.endsWith('Connection');
  }

  function nearestNode(context) {
    if (context == null) {
      return null;
    } else if (isNodeContext(context)) {
      return context;
    } else {
      return nearestNode(context.parent);
    }
  }

  function contextsFromRoot(context) {
    if (context.parent) {
      return contextsFromRoot(context.parent).concat(context);
    } else {
      return [context];
    }
  }

  function contextsFromNearestNode(context) {
    if (context.selection.selectionSet.typeSchema.implementsNode) {
      return [context];
    } else {
      return contextsFromNearestNode(context.parent).concat(context);
    }
  }

  function initializeDocumentAndVars(currentContext, contextChain) {
    var lastInChain = contextChain[contextChain.length - 1];
    var first = lastInChain.selection.args.first;
    var variableDefinitions = Object.keys(lastInChain.selection.args).filter(function (key) {
      return isVariable(lastInChain.selection.args[key]);
    }).map(function (key) {
      return lastInChain.selection.args[key];
    });

    var firstVar = variableDefinitions.find(function (definition) {
      return definition.name === 'first';
    });

    if (!firstVar) {
      if (isVariable(first)) {
        firstVar = first;
      } else {
        firstVar = variable('first', 'Int', first);
        variableDefinitions.push(firstVar);
      }
    }

    var document = new Document(currentContext.selection.selectionSet.typeBundle);

    return [document, variableDefinitions, firstVar];
  }

  function addNextFieldTo(currentSelection, contextChain, path, cursor) {
    // There are always at least two. When we start, it's the root context, and the first set
    var nextContext = contextChain.shift();

    path.push(nextContext.selection.responseKey);

    if (contextChain.length) {
      currentSelection.add(nextContext.selection.name, { alias: nextContext.selection.alias, args: nextContext.selection.args }, function (newSelection) {
        addNextFieldTo(newSelection, contextChain, path, cursor);
      });
    } else {
      var edgesField = nextContext.selection.selectionSet.selections.find(function (field) {
        return field.name === 'edges';
      });
      var nodeField = edgesField.selectionSet.selections.find(function (field) {
        return field.name === 'node';
      });
      var first = void 0;

      if (isVariable(nextContext.selection.args.first)) {
        first = nextContext.selection.args.first;
      } else {
        first = variable('first', 'Int', nextContext.selection.args.first);
      }

      var options = {
        alias: nextContext.selection.alias,
        args: Object.assign({}, nextContext.selection.args, { after: cursor, first: first })
      };

      currentSelection.addConnection(nextContext.selection.name, options, nodeField.selectionSet);
    }
  }

  function collectFragments(selections) {
    return selections.reduce(function (fragmentDefinitions, field) {
      if (FragmentSpread.prototype.isPrototypeOf(field)) {
        fragmentDefinitions.push(field.toDefinition());
      }

      fragmentDefinitions.push.apply(fragmentDefinitions, toConsumableArray(collectFragments(field.selectionSet.selections)));

      return fragmentDefinitions;
    }, []);
  }

  function nextPageQueryAndPath(context, cursor) {
    var nearestNodeContext = nearestNode(context);

    if (nearestNodeContext) {
      return function () {
        var _document$definitions;

        var path = [];
        var nodeType = nearestNodeContext.selection.selectionSet.typeSchema;
        var nodeId = nearestNodeContext.responseData.id;
        var contextChain = contextsFromNearestNode(context);

        var _initializeDocumentAn = initializeDocumentAndVars(context, contextChain),
            _initializeDocumentAn2 = slicedToArray(_initializeDocumentAn, 2),
            document = _initializeDocumentAn2[0],
            variableDefinitions = _initializeDocumentAn2[1];

        document.addQuery(variableDefinitions, function (root) {
          path.push('node');
          root.add('node', { args: { id: nodeId } }, function (node) {
            node.addInlineFragmentOn(nodeType.name, function (fragment) {
              addNextFieldTo(fragment, contextChain.slice(1), path, cursor);
            });
          });
        });

        var fragments = collectFragments(document.operations[0].selectionSet.selections);

        (_document$definitions = document.definitions).unshift.apply(_document$definitions, toConsumableArray(fragments));

        return [document, path];
      };
    } else {
      return function () {
        var _document$definitions2;

        var path = [];
        var contextChain = contextsFromRoot(context);

        var _initializeDocumentAn3 = initializeDocumentAndVars(context, contextChain),
            _initializeDocumentAn4 = slicedToArray(_initializeDocumentAn3, 2),
            document = _initializeDocumentAn4[0],
            variableDefinitions = _initializeDocumentAn4[1];

        document.addQuery(variableDefinitions, function (root) {
          addNextFieldTo(root, contextChain.slice(1), path, cursor);
        });

        var fragments = collectFragments(document.operations[0].selectionSet.selections);

        (_document$definitions2 = document.definitions).unshift.apply(_document$definitions2, toConsumableArray(fragments));

        return [document, path];
      };
    }
  }

  function hasNextPage$1(connection, edge) {
    if (edge !== connection.edges[connection.edges.length - 1]) {
      return new Scalar(true);
    }

    return connection.pageInfo.hasNextPage;
  }

  function hasPreviousPage(connection, edge) {
    if (edge !== connection.edges[0]) {
      return new Scalar(true);
    }

    return connection.pageInfo.hasPreviousPage;
  }

  function transformConnections(variableValues) {
    return function (context, value) {
      if (isConnection(context)) {
        if (!(value.pageInfo && value.pageInfo.hasOwnProperty('hasNextPage') && value.pageInfo.hasOwnProperty('hasPreviousPage'))) {
          throw new Error('Connections must include the selections "pageInfo { hasNextPage, hasPreviousPage }".');
        }

        return value.edges.map(function (edge) {
          return Object.assign(edge.node, {
            nextPageQueryAndPath: nextPageQueryAndPath(context, edge.cursor),
            hasNextPage: hasNextPage$1(value, edge),
            hasPreviousPage: hasPreviousPage(value, edge),
            variableValues: variableValues
          });
        });
      } else {
        return value;
      }
    };
  }

  /* eslint-disable no-warning-comments */
  var DecodingContext = function () {
    function DecodingContext(selection, responseData) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      classCallCheck(this, DecodingContext);

      this.selection = selection;
      this.responseData = responseData;
      this.parent = parent;
      Object.freeze(this);
    }

    createClass(DecodingContext, [{
      key: 'contextForObjectProperty',
      value: function contextForObjectProperty(responseKey) {
        var nestedSelections = this.selection.selectionSet.selectionsByResponseKey[responseKey];
        var nextSelection = nestedSelections && nestedSelections[0];
        var nextContext = void 0;

        // fragment spreads operate inside the current context, so we recurse to get the proper
        // selection set, but retain the current response context
        if (Spread.prototype.isPrototypeOf(nextSelection)) {
          nextContext = new DecodingContext(nextSelection, this.responseData, this.parent);
        } else {
          nextContext = new DecodingContext(nextSelection, this.responseData[responseKey], this);
        }

        if (!nextSelection) {
          throw new Error('Unexpected response key "' + responseKey + '", not found in selection set: ' + this.selection.selectionSet);
        }

        if (Field.prototype.isPrototypeOf(nextSelection)) {
          return nextContext;
        } else {
          return nextContext.contextForObjectProperty(responseKey);
        }
      }
    }, {
      key: 'contextForArrayItem',
      value: function contextForArrayItem(item) {
        return new DecodingContext(this.selection, item, this.parent);
      }
    }]);
    return DecodingContext;
  }();

  function decodeArrayItems(context, transformers) {
    return context.responseData.map(function (item) {
      return decodeContext(context.contextForArrayItem(item), transformers);
    });
  }

  function decodeObjectValues(context, transformers) {
    return Object.keys(context.responseData).reduce(function (acc, responseKey) {
      acc[responseKey] = decodeContext(context.contextForObjectProperty(responseKey), transformers);

      return acc;
    }, {});
  }

  function runTransformers(transformers, context, value) {
    return transformers.reduce(function (acc, transformer) {
      return transformer(context, acc);
    }, value);
  }

  function decodeContext(context, transformers) {
    var value = context.responseData;

    if (Array.isArray(value)) {
      value = decodeArrayItems(context, transformers);
    } else if (isObject(value)) {
      value = decodeObjectValues(context, transformers);
    }

    return runTransformers(transformers, context, value);
  }

  function generateRefetchQueries(context, value) {
    if (isValue(value) && isNodeContext(context)) {
      value.refetchQuery = function () {
        return new Query(context.selection.selectionSet.typeBundle, function (root) {
          root.add('node', { args: { id: context.responseData.id } }, function (node) {
            node.addInlineFragmentOn(context.selection.selectionSet.typeSchema.name, context.selection.selectionSet);
          });
        });
      };
    }

    return value;
  }

  function transformPojosToClassesWithRegistry(classRegistry) {
    return function transformPojosToClasses(context, value) {
      if (isObject(value)) {
        var Klass = classRegistry.classForType(context.selection.selectionSet.typeSchema.name);

        return new Klass(value);
      } else {
        return value;
      }
    };
  }

  function transformScalars(context, value) {
    if (isValue(value)) {
      if (context.selection.selectionSet.typeSchema.kind === 'SCALAR') {
        return new Scalar(value);
      } else if (context.selection.selectionSet.typeSchema.kind === 'ENUM') {
        return new Enum(value);
      }
    }

    return value;
  }

  function recordTypeInformation(context, value) {
    var _context$selection$se = context.selection.selectionSet,
        typeBundle = _context$selection$se.typeBundle,
        typeSchema = _context$selection$se.typeSchema;

    if (isValue(value)) {
      if (value.__typename) {
        value.type = schemaForType(typeBundle, value.__typename, typeSchema);
      } else {
        value.type = typeSchema;
      }
    }

    return value;
  }

  function defaultTransformers(_ref) {
    var _ref$classRegistry = _ref.classRegistry,
        classRegistry = _ref$classRegistry === undefined ? new ClassRegistry() : _ref$classRegistry,
        variableValues = _ref.variableValues;

    return [transformScalars, generateRefetchQueries, transformConnections(variableValues), recordTypeInformation, transformPojosToClassesWithRegistry(classRegistry)];
  }

  /**
   * A function used to decode the response data.
   *
   * @function decode
   * @param {SelectionSet} selection The selection set used to query the response data.
   * @param {Object} responseData The response data returned.
   * @param {Object} [options] Options to use when decoding including:
   *   @param {ClassRegistry} [options.classRegistry] A class registry to use when deserializing the data into classes.
   * @return {GraphModel} The decoded response data.
   */
  function decode(selection, responseData) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var transformers = options.transformers || defaultTransformers(options);
    var context = new DecodingContext(selection, responseData);

    return decodeContext(context, transformers);
  }

  function httpFetcher(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function fetcher(graphQLParams, headers) {
      return fetch(url, _extends({
        body: JSON.stringify(graphQLParams),
        method: 'POST',
        mode: 'cors'
      }, options, {
        headers: _extends({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }, options.headers, headers)
      })).then(function (response) {
        var contentType = response.headers.get('content-type');

        if (contentType.indexOf('application/json') > -1) {
          return response.json();
        }

        return response.text().then(function (text) {
          return { text: text };
        });
      });
    };
  }

  function hasNextPage(paginatedModels) {
    return paginatedModels && paginatedModels.length && paginatedModels[paginatedModels.length - 1].hasNextPage;
  }

  /**
   * The Client class used to create and send GraphQL documents, fragments, queries and mutations.
   */

  var Client$2 = function () {

    /**
     * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
     * @param {Object} options An options object. Must include either `url` and optional `fetcherOptions` OR a `fetcher` function.
     *   @param {(String|Function)} options.url|fetcher Either the URL of the GraphQL API endpoint, or a custom fetcher function for further customization.
     *   @param {Object} [options.fetcherOptions] Additional options to use with `fetch`, like headers. Do not specify this argument if `fetcher` is specified.
     *   @param {ClassRegistry} [options.registry=new ClassRegistry()] A {@link ClassRegistry} used to decode the response data.
     */
    function Client(typeBundle, _ref) {
      var url = _ref.url,
          fetcherOptions = _ref.fetcherOptions,
          fetcher = _ref.fetcher,
          _ref$registry = _ref.registry,
          registry = _ref$registry === undefined ? new ClassRegistry() : _ref$registry;
      classCallCheck(this, Client);

      this.typeBundle = typeBundle;
      this.classRegistry = registry;

      if (url && fetcher) {
        throw new Error('Arguments not supported: supply either `url` and optional `fetcherOptions` OR use a `fetcher` function for further customization.');
      }

      if (url) {
        this.fetcher = httpFetcher(url, fetcherOptions);
      } else if (fetcher) {
        if (fetcherOptions) {
          throw new Error('Arguments not supported: when specifying your own `fetcher`, set options through it and not with `fetcherOptions`');
        }

        this.fetcher = fetcher;
      } else {
        throw new Error('Invalid arguments: one of `url` or `fetcher` is needed.');
      }
    }

    /**
     * Creates a GraphQL document.
     *
     * @example
     * const document = client.document();
     *
     * @return {Document} A GraphQL document.
     */

    createClass(Client, [{
      key: 'document',
      value: function document() {
        return new Document(this.typeBundle);
      }

      /**
       * Creates a GraphQL query.
       *
       * @example
       * const query = client.query('myQuery', (root) => {
       *   root.add('cat', (cat) => {
       *    cat.add('name');
       *   });
       * });
       *
       * @param {String} [name] A name for the query.
       * @param {VariableDefinition[]} [variables] A list of variables in the query. See {@link Client#variable}.
       * @param {Function} selectionSetCallback The query builder callback.
       *   A {@link SelectionSet} is created using this callback.
       * @return {Query} A GraphQL query.
       */

    }, {
      key: 'query',
      value: function query() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(Query, [null].concat([this.typeBundle], args)))();
      }

      /**
       * Creates a GraphQL mutation.
       *
       * @example
       * const input = client.variable('input', 'CatCreateInput!');
       *
       * const mutation = client.mutation('myMutation', [input], (root) => {
       *   root.add('catCreate', {args: {input}}, (catCreate) => {
       *     catCreate.add('cat', (cat) => {
       *       cat.add('name');
       *     });
       *   });
       * });
       *
       * @param {String} [name] A name for the mutation.
       * @param {VariableDefinition[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
       * @param {Function} selectionSetCallback The mutation builder callback.
       *   A {@link SelectionSet} is created using this callback.
       * @return {Mutation} A GraphQL mutation.
       */

    }, {
      key: 'mutation',
      value: function mutation() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return new (Function.prototype.bind.apply(Mutation, [null].concat([this.typeBundle], args)))();
      }

      /**
       * Sends a GraphQL operation (query or mutation) or a document.
       *
       * @example
       * client.send(query, {id: '12345'}).then((result) => {
       *   // Do something with the returned result
       *   console.log(result);
       * });
       *
       * @param {(Query|Mutation|Document|Function)} request The operation or document to send. If represented
       * as a function, it must return `Query`, `Mutation`, or `Document` and recieve the client as the only param.
       * @param {Object} [variableValues] The values for variables in the operation or document.
       * @param {Object} [otherProperties] Other properties to send with the query. For example, a custom operation name.
       * @param {Object} [headers] Additional headers to be applied on a request by request basis.
       * @return {Promise.<Object>} A promise resolving to an object containing the response data.
       */

    }, {
      key: 'send',
      value: function send(request) {
        var variableValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var _this = this;

        var otherProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var operationOrDocument = void 0;

        if (Function.prototype.isPrototypeOf(request)) {
          operationOrDocument = request(this);
        } else {
          operationOrDocument = request;
        }

        var graphQLParams = { query: operationOrDocument.toString() };

        if (variableValues) {
          graphQLParams.variables = variableValues;
        }

        Object.assign(graphQLParams, otherProperties);

        var operation = void 0;

        if (Operation.prototype.isPrototypeOf(operationOrDocument)) {
          operation = operationOrDocument;
        } else {
          var document = operationOrDocument;

          if (document.operations.length === 1) {
            operation = document.operations[0];
          } else if (otherProperties.operationName) {
            operation = document.operations.find(function (documentOperation) {
              return documentOperation.name === otherProperties.operationName;
            });
          } else {
            throw new Error('\n          A document must contain exactly one operation, or an operationName\n          must be specified. Example:\n\n            client.send(document, null, {operationName: \'myFancyQuery\'});\n        ');
          }
        }

        return this.fetcher(graphQLParams, headers).then(function (response) {
          if (response.data) {
            response.model = decode(operation, response.data, {
              classRegistry: _this.classRegistry,
              variableValues: variableValues
            });
          }

          return response;
        });
      }

      /**
       * Fetches the next page of a paginated node or array of nodes.
       *
       * @example
       * client.fetchNextPage(node, {first: 10}).then((result) => {
       *   // Do something with the next page
       *   console.log(result);
       * });
       *
       * @param {(GraphModel|GraphModel[])} nodeOrNodes The node or list of nodes on which to fetch the next page.
       * @param {Object} [options] Options object containing:
       *   @param {Integer} [options.first] The number of nodes to query on the next page. Defaults to the page size of the previous query.
       * @return {Promise.<GraphModel[]>} A promise resolving with the next page of {@link GraphModel}s.
       */

    }, {
      key: 'fetchNextPage',
      value: function fetchNextPage(nodeOrNodes, options) {
        var node = void 0;

        if (Array.isArray(nodeOrNodes)) {
          node = nodeOrNodes[nodeOrNodes.length - 1];
        } else {
          node = nodeOrNodes;
        }

        var _node$nextPageQueryAn = node.nextPageQueryAndPath(),
            _node$nextPageQueryAn2 = slicedToArray(_node$nextPageQueryAn, 2),
            query = _node$nextPageQueryAn2[0],
            path = _node$nextPageQueryAn2[1];

        var variableValues = void 0;

        if (node.variableValues || options) {
          variableValues = Object.assign({}, node.variableValues, options);
        }

        return this.send(query, variableValues).then(function (response) {
          response.model = path.reduce(function (object, key) {
            return object[key];
          }, response.model);

          return response;
        });
      }

      /**
       * Fetches all subsequent pages of a paginated array of nodes.
       *
       * @example
       * client.fetchAllPages(nodes, {pageSize: 20}).then((result) => {
       *   // Do something with all the models
       *   console.log(result);
       * });
       *
       * @param {GraphModel[]} paginatedModels The list of nodes on which to fetch all pages.
       * @param {Object} options Options object containing:
       *   @param {Integer} options.pageSize The number of nodes to query on each page.
       * @return {Promise.<GraphModel[]>} A promise resolving with all pages of {@link GraphModel}s, including the original list.
       */

    }, {
      key: 'fetchAllPages',
      value: function fetchAllPages(paginatedModels, _ref2) {
        var _this2 = this;

        var pageSize = _ref2.pageSize;

        if (hasNextPage(paginatedModels)) {
          return this.fetchNextPage(paginatedModels, { first: pageSize }).then(function (_ref3) {
            var model = _ref3.model;

            var pages = paginatedModels.concat(model);

            return _this2.fetchAllPages(pages, { pageSize: pageSize });
          });
        }

        return Promise.resolve(paginatedModels);
      }

      /**
       * Refetches a {@link GraphModel} whose type implements `Node`.
       *
       * @example
       * client.refetch(node).then((result) => {
       *   // Do something with the refetched node
       *   console.log(result);
       * });
       *
       * @param {GraphModel} nodeType A {@link GraphModel} whose type implements `Node`.
       * @return {Promise.<GraphModel>} The refetched {@link GraphModel}.
       */

    }, {
      key: 'refetch',
      value: function refetch(nodeType) {
        if (!nodeType) {
          throw new Error('\'client#refetch\' must be called with a non-null instance of a Node.');
        } else if (!nodeType.type.implementsNode) {
          throw new Error('\'client#refetch\' must be called with a type that implements Node. Received ' + nodeType.type.name + '.');
        }

        return this.send(nodeType.refetchQuery()).then(function (_ref4) {
          var model = _ref4.model;
          return model.node;
        });
      }

      /**
       * Creates a variable to be used in a {@link Query} or {@link Mutation}.
       *
       * @example
       * const idVariable = client.variable('id', 'ID!', '12345');
       *
       * @param {String} name The name of the variable.
       * @param {String} type The GraphQL type of the variable.
       * @param {*} [defaultValue] The default value of the variable.
       * @return {VariableDefinition} A variable object that can be used in a {@link Query} or {@link Mutation}.
       */

    }, {
      key: 'variable',
      value: function variable$$1(name, type, defaultValue) {
        return variable(name, type, defaultValue);
      }

      /**
       * Creates an enum to be used in a {@link Query} or {@link Mutation}.
       *
       * @example
       * const titleEnum = client.enum('TITLE');
       *
       * @param {String} key The key of the enum.
       * @return {Enum} An enum object that can be used in a {@link Query} or {@link Mutation}.
       */

    }, {
      key: 'enum',
      value: function _enum(key) {
        return enumFunction(key);
      }
    }]);
    return Client;
  }();

  /**
   * The class used to configure the JS Buy SDK Client.
   * @class
   */
  var Config = function () {
    createClass$1(Config, [{
      key: 'requiredProperties',


      /**
       * Properties that must be set on initializations
       * @attribute requiredProperties
       * @default ['storefrontAccessToken', 'domain']
       * @type Array
       * @private
       */
      get: function get$$1() {
        return ['storefrontAccessToken', 'domain'];
      }

      /**
       * Deprecated properties that map directly to required properties
       * @attribute deprecatedProperties
       * @default {'accessToken': 'storefrontAccessToken', 'apiKey': 'storefrontAccessToken'}
       * @type Object
       * @private
       */

    }, {
      key: 'deprecatedProperties',
      get: function get$$1() {
        return {
          accessToken: 'storefrontAccessToken',
          apiKey: 'storefrontAccessToken'
        };
      }

      /**
       * @constructs Config
       * @param {Object} attrs An object specifying the configuration. Requires the following properties:
       *   @param {String} attrs.storefrontAccessToken The {@link https://help.shopify.com/api/reference/storefront_access_token|Storefront access token} for the shop.
       *   @param {String} attrs.domain The `myshopify` domain for the shop (e.g. `graphql.myshopify.com`).
       */

    }]);

    function Config(attrs) {
      var _this = this;

      classCallCheck$1(this, Config);

      Object.keys(this.deprecatedProperties).forEach(function (key) {
        if (!attrs.hasOwnProperty(key)) {
          return;
        }
        // eslint-disable-next-line no-console
        console.warn('[ShopifyBuy] Config property ' + key + ' is deprecated as of v1.0, please use ' + _this.deprecatedProperties[key] + ' instead.');
        attrs[_this.deprecatedProperties[key]] = attrs[key];
      });

      this.requiredProperties.forEach(function (key) {
        if (attrs.hasOwnProperty(key)) {
          _this[key] = attrs[key];
        } else {
          throw new Error('new Config() requires the option \'' + key + '\'');
        }
      });

      if (attrs.hasOwnProperty('apiVersion')) {
        this.apiVersion = attrs.apiVersion;
      } else {
        this.apiVersion = '2023-07';
      }

      if (attrs.hasOwnProperty('source')) {
        this.source = attrs.source;
      }

      if (attrs.hasOwnProperty('language')) {
        this.language = attrs.language;
      }
    }

    return Config;
  }();

  var Resource = function Resource(client) {
    classCallCheck$1(this, Resource);

    this.graphQLClient = client;
  };

  var defaultErrors = [{ message: 'an unknown error has occurred.' }];

  function defaultResolver(path) {
    var keys = path.split('.');

    return function (_ref) {
      var model = _ref.model,
          errors = _ref.errors;

      return new Promise(function (resolve, reject) {
        try {
          var result = keys.reduce(function (ref, key) {
            return ref[key];
          }, model);

          resolve(result);
        } catch (_) {
          if (errors) {
            reject(errors);
          } else {
            reject(defaultErrors);
          }
        }
      });
    };
  }

  function fetchResourcesForProducts(productOrProduct, client) {
    var products = [].concat(productOrProduct);

    return Promise.all(products.reduce(function (promiseAcc, product) {

      // If the graphql query doesn't find a match, skip fetching variants and images.
      if (product === null) {
        return promiseAcc;
      }

      // Fetch the rest of the images and variants for this product
      promiseAcc.push(client.fetchAllPages(product.images, { pageSize: 250 }).then(function (images) {
        product.attrs.images = images;
      }));

      promiseAcc.push(client.fetchAllPages(product.variants, { pageSize: 250 }).then(function (variants) {
        product.attrs.variants = variants;
      }));

      return promiseAcc;
    }, []));
  }

  function paginateProductConnectionsAndResolve(client) {
    return function (products) {
      return fetchResourcesForProducts(products, client).then(function () {
        return products;
      });
    };
  }

  function paginateCollectionsProductConnectionsAndResolve(client) {
    return function (collectionOrCollections) {
      var collections = [].concat(collectionOrCollections);

      return Promise.all(collections.reduce(function (promiseAcc, collection) {
        return promiseAcc.concat(fetchResourcesForProducts(collection.products, client));
      }, [])).then(function () {
        return collectionOrCollections;
      });
    };
  }

  /**
   * @namespace ProductHelpers
   */
  var productHelpers = {

    /**
     * Returns the variant of a product corresponding to the options given.
     *
     * @example
     * const selectedVariant = client.product.helpers.variantForOptions(product, {
     *   size: "Small",
     *   color: "Red"
     * });
     *
     * @memberof ProductHelpers
     * @method variantForOptions
     * @param {GraphModel} product The product to find the variant on. Must include `variants`.
     * @param {Object} options An object containing the options for the variant.
     * @return {GraphModel} The variant corresponding to the options given.
     */
    variantForOptions: function variantForOptions(product, options) {
      return product.variants.find(function (variant) {
        return variant.selectedOptions.every(function (selectedOption) {
          return options[selectedOption.name] === selectedOption.value.valueOf();
        });
      });
    }
  };

  function query(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.id = client.variable("id", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.id], function (root) {
      root.add("node", {
        args: {
          id: variables.__defaultOperation__.id
        }
      }, function (node) {
        node.addFragment(spreads.ProductFragment);
      });
    });
    return document;
  }

  function query$1(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.ids = client.variable("ids", "[ID!]!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.ids], function (root) {
      root.add("nodes", {
        args: {
          ids: variables.__defaultOperation__.ids
        }
      }, function (nodes) {
        nodes.addFragment(spreads.ProductFragment);
      });
    });
    return document;
  }

  function query$2(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.first = client.variable("first", "Int!");
    variables.__defaultOperation__.query = client.variable("query", "String");
    variables.__defaultOperation__.sortKey = client.variable("sortKey", "ProductSortKeys");
    variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse], function (root) {
      root.add("products", {
        args: {
          first: variables.__defaultOperation__.first,
          query: variables.__defaultOperation__.query,
          sortKey: variables.__defaultOperation__.sortKey,
          reverse: variables.__defaultOperation__.reverse
        }
      }, function (products) {
        products.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        products.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.ProductFragment);
          });
        });
      });
    });
    return document;
  }

  function query$3(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.handle = client.variable("handle", "String!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.handle], function (root) {
      root.add("productByHandle", {
        args: {
          handle: variables.__defaultOperation__.handle
        }
      }, function (productByHandle) {
        productByHandle.addFragment(spreads.ProductFragment);
      });
    });
    return document;
  }

  function query$4(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.productId = client.variable("productId", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.productId], function (root) {
      root.add("productRecommendations", {
        args: {
          productId: variables.__defaultOperation__.productId
        }
      }, function (productRecommendations) {
        productRecommendations.addFragment(spreads.ProductFragment);
      });
    });
    return document;
  }

  // GraphQL
  /**
   * The JS Buy SDK product resource
   * @class
   */

  var ProductResource = function (_Resource) {
    inherits$1(ProductResource, _Resource);

    function ProductResource() {
      classCallCheck$1(this, ProductResource);
      return possibleConstructorReturn$1(this, (ProductResource.__proto__ || Object.getPrototypeOf(ProductResource)).apply(this, arguments));
    }

    createClass$1(ProductResource, [{
      key: 'fetchAll',


      /**
       * Fetches all products on the shop.
       *
       * @example
       * client.product.fetchAll().then((products) => {
       *   // Do something with the products
       * });
       *
       * @param {Int} [pageSize] The number of products to fetch per page
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
       */
      value: function fetchAll() {
        var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

        return this.graphQLClient.send(query$2, { first: first }).then(defaultResolver('products')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Fetches a single product by ID on the shop.
       *
       * @example
       * client.product.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==').then((product) => {
       *   // Do something with the product
       * });
       *
       * @param {String} id The id of the product to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the product.
       */

    }, {
      key: 'fetch',
      value: function fetch(id) {
        return this.graphQLClient.send(query, { id: id }).then(defaultResolver('node')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Fetches multiple products by ID on the shop.
       *
       * @example
       * const ids = ['Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==', 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ='];
       * client.product.fetchMultiple(ids).then((products) => {
       *   // Do something with the products
       * });
       *
       * @param {String[]} ids The ids of the products to fetch
       * @return {Promise|GraphModel[]} A promise resolving with a `GraphModel` of the product.
       */

    }, {
      key: 'fetchMultiple',
      value: function fetchMultiple(ids) {
        return this.graphQLClient.send(query$1, { ids: ids }).then(defaultResolver('nodes')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Fetches a single product by handle on the shop.
       *
       * @example
       * client.product.fetchByHandle('my-product').then((product) => {
       *   // Do something with the product
       * });
       *
       * @param {String} handle The handle of the product to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the product.
       */

    }, {
      key: 'fetchByHandle',
      value: function fetchByHandle(handle) {
        return this.graphQLClient.send(query$3, { handle: handle }).then(defaultResolver('productByHandle')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Fetches all products on the shop that match the query.
       *
       * @example
       * client.product.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((products) => {
       *   // Do something with the first 10 products sorted by title in ascending order
       * });
       *
       * @param {Object} [args] An object specifying the query data containing zero or more of:
       *   @param {Int} [args.first=20] The relay `first` param. This specifies page size.
       *   @param {String} [args.sortKey=ID] The key to sort results by. Available values are
       *   documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/productsortkeys|Product Sort Keys}.
       *   @param {String} [args.query] A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#products|here}
       *   @param {Boolean} [args.reverse] Whether or not to reverse the sort order of the results
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
       */

    }, {
      key: 'fetchQuery',
      value: function fetchQuery() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$first = _ref.first,
            first = _ref$first === undefined ? 20 : _ref$first,
            _ref$sortKey = _ref.sortKey,
            sortKey = _ref$sortKey === undefined ? 'ID' : _ref$sortKey,
            query$$1 = _ref.query,
            reverse = _ref.reverse;

        return this.graphQLClient.send(query$2, {
          first: first,
          sortKey: sortKey,
          query: query$$1,
          reverse: reverse
        }).then(defaultResolver('products')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Find recommended products related to a given productId.
       * To learn more about how recommendations are generated, see https://shopify.dev/themes/product-merchandising/recommendations.
       *
       * @example
       * const productId 'Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==';
       * client.product.fetchProductRecommendations(productId).then((products) => {
       *   // Do something with the products
       * });
       *
       * @param {String} productId The id of the product to fetch.
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
       */

    }, {
      key: 'fetchRecommendations',
      value: function fetchRecommendations(productId) {
        return this.graphQLClient.send(query$4, { productId: productId }).then(defaultResolver('productRecommendations')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
      }
    }, {
      key: 'helpers',
      get: function get$$1() {
        return productHelpers;
      }
    }]);
    return ProductResource;
  }(Resource);

  function query$5(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.id = client.variable("id", "ID!");
    spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
      root.add("id");
      root.add("handle");
      root.add("description");
      root.add("descriptionHtml");
      root.add("updatedAt");
      root.add("title");
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
      });
    });
    document.addQuery([variables.__defaultOperation__.id], function (root) {
      root.add("node", {
        args: {
          id: variables.__defaultOperation__.id
        }
      }, function (node) {
        node.addFragment(spreads.CollectionFragment);
      });
    });
    return document;
  }

  function query$6(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.id = client.variable("id", "ID!");
    variables.__defaultOperation__.productsFirst = client.variable("productsFirst", "Int!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
      root.add("id");
      root.add("handle");
      root.add("description");
      root.add("descriptionHtml");
      root.add("updatedAt");
      root.add("title");
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.id, variables.__defaultOperation__.productsFirst], function (root) {
      root.add("node", {
        args: {
          id: variables.__defaultOperation__.id
        }
      }, function (node) {
        node.addFragment(spreads.CollectionFragment);
        node.addInlineFragmentOn("Collection", function (Collection) {
          Collection.add("products", {
            args: {
              first: variables.__defaultOperation__.productsFirst
            }
          }, function (products) {
            products.add("pageInfo", function (pageInfo) {
              pageInfo.add("hasNextPage");
              pageInfo.add("hasPreviousPage");
            });
            products.add("edges", function (edges) {
              edges.add("cursor");
              edges.add("node", function (node) {
                node.addFragment(spreads.ProductFragment);
              });
            });
          });
        });
      });
    });
    return document;
  }

  function query$7(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.first = client.variable("first", "Int!");
    variables.__defaultOperation__.query = client.variable("query", "String");
    variables.__defaultOperation__.sortKey = client.variable("sortKey", "CollectionSortKeys");
    variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
    spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
      root.add("id");
      root.add("handle");
      root.add("description");
      root.add("descriptionHtml");
      root.add("updatedAt");
      root.add("title");
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
      });
    });
    document.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse], function (root) {
      root.add("collections", {
        args: {
          first: variables.__defaultOperation__.first,
          query: variables.__defaultOperation__.query,
          sortKey: variables.__defaultOperation__.sortKey,
          reverse: variables.__defaultOperation__.reverse
        }
      }, function (collections) {
        collections.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        collections.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.CollectionFragment);
          });
        });
      });
    });
    return document;
  }

  function query$8(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.first = client.variable("first", "Int!");
    variables.__defaultOperation__.query = client.variable("query", "String");
    variables.__defaultOperation__.sortKey = client.variable("sortKey", "CollectionSortKeys");
    variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
    variables.__defaultOperation__.productsFirst = client.variable("productsFirst", "Int!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
      root.add("id");
      root.add("handle");
      root.add("description");
      root.add("descriptionHtml");
      root.add("updatedAt");
      root.add("title");
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse, variables.__defaultOperation__.productsFirst], function (root) {
      root.add("collections", {
        args: {
          first: variables.__defaultOperation__.first,
          query: variables.__defaultOperation__.query,
          sortKey: variables.__defaultOperation__.sortKey,
          reverse: variables.__defaultOperation__.reverse
        }
      }, function (collections) {
        collections.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        collections.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.CollectionFragment);
            node.add("products", {
              args: {
                first: variables.__defaultOperation__.productsFirst
              }
            }, function (products) {
              products.add("pageInfo", function (pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              products.add("edges", function (edges) {
                edges.add("cursor");
                edges.add("node", function (node) {
                  node.addFragment(spreads.ProductFragment);
                });
              });
            });
          });
        });
      });
    });
    return document;
  }

  function query$9(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.handle = client.variable("handle", "String!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
      root.add("id");
      root.add("availableForSale");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("descriptionHtml");
      root.add("description");
      root.add("handle");
      root.add("productType");
      root.add("title");
      root.add("vendor");
      root.add("publishedAt");
      root.add("onlineStoreUrl");
      root.add("options", function (options) {
        options.add("name");
        options.add("values");
      });
      root.add("images", {
        args: {
          first: 250
        }
      }, function (images) {
        images.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        images.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("url", {
              alias: "src"
            });
            node.add("altText");
            node.add("width");
            node.add("height");
          });
        });
      });
      root.add("variants", {
        args: {
          first: 250
        }
      }, function (variants) {
        variants.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        variants.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.VariantFragment);
          });
        });
      });
    });
    spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
      root.add("id");
      root.add("handle");
      root.add("description");
      root.add("descriptionHtml");
      root.add("updatedAt");
      root.add("title");
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
      });
    });
    spreads.CollectionsProductsFragment = document.defineFragment("CollectionsProductsFragment", "Collection", function (root) {
      root.add("products", {
        args: {
          first: 20
        }
      }, function (products) {
        products.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        products.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.ProductFragment);
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.handle], function (root) {
      root.add("collectionByHandle", {
        args: {
          handle: variables.__defaultOperation__.handle
        }
      }, function (collectionByHandle) {
        collectionByHandle.addFragment(spreads.CollectionFragment);
        collectionByHandle.addFragment(spreads.CollectionsProductsFragment);
      });
    });
    return document;
  }

  // GraphQL
  /**
   * The JS Buy SDK collection resource
   * @class
   */

  var CollectionResource = function (_Resource) {
    inherits$1(CollectionResource, _Resource);

    function CollectionResource() {
      classCallCheck$1(this, CollectionResource);
      return possibleConstructorReturn$1(this, (CollectionResource.__proto__ || Object.getPrototypeOf(CollectionResource)).apply(this, arguments));
    }

    createClass$1(CollectionResource, [{
      key: 'fetchAll',


      /**
       * Fetches all collections on the shop, not including products.
       * To fetch collections with products use [fetchAllsWithProducts]{@link Client#fetchAllsWithProducts}.
       *
       * @example
       * client.collection.fetchAll().then((collections) => {
       *   // Do something with the collections
       * });
       *
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
       */
      value: function fetchAll() {
        var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

        return this.graphQLClient.send(query$7, { first: first }).then(defaultResolver('collections'));
      }

      /**
       * Fetches all collections on the shop, including products.
       *
       * @example
       * client.collection.fetchAllWithProducts().then((collections) => {
       *   // Do something with the collections
       * });
       *
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
       */

    }, {
      key: 'fetchAllWithProducts',
      value: function fetchAllWithProducts() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$first = _ref.first,
            first = _ref$first === undefined ? 20 : _ref$first,
            _ref$productsFirst = _ref.productsFirst,
            productsFirst = _ref$productsFirst === undefined ? 20 : _ref$productsFirst;

        return this.graphQLClient.send(query$8, { first: first, productsFirst: productsFirst }).then(defaultResolver('collections')).then(paginateCollectionsProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Fetches a single collection by ID on the shop, not including products.
       * To fetch the collection with products use [fetchWithProducts]{@link Client#fetchWithProducts}.
       *
       * @example
       * client.collection.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
       *   // Do something with the collection
       * });
       *
       * @param {String} id The id of the collection to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
       */

    }, {
      key: 'fetch',
      value: function fetch(id) {
        return this.graphQLClient.send(query$5, { id: id }).then(defaultResolver('node'));
      }

      /**
       * Fetches a single collection by ID on the shop, including products.
       *
       * @example
       * client.collection.fetchWithProducts('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
       *   // Do something with the collection
       * });
       *
       * @param {String} id The id of the collection to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
       */

    }, {
      key: 'fetchWithProducts',
      value: function fetchWithProducts(id) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$productsFirst = _ref2.productsFirst,
            productsFirst = _ref2$productsFirst === undefined ? 20 : _ref2$productsFirst;

        return this.graphQLClient.send(query$6, { id: id, productsFirst: productsFirst }).then(defaultResolver('node')).then(paginateCollectionsProductConnectionsAndResolve(this.graphQLClient));
      }

      /**
       * Fetches a collection by handle on the shop.
       *
       * @example
       * client.collection.fetchByHandle('my-collection').then((collection) => {
       *   // Do something with the collection
       * });
       *
       * @param {String} handle The handle of the collection to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
       */

    }, {
      key: 'fetchByHandle',
      value: function fetchByHandle(handle) {
        return this.graphQLClient.send(query$9, { handle: handle }).then(defaultResolver('collectionByHandle'));
      }

      /**
       * Fetches all collections on the shop that match the query.
       *
       * @example
       * client.collection.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((collections) => {
       *   // Do something with the first 10 collections sorted by title in ascending order
       * });
       *
       * @param {Object} [args] An object specifying the query data containing zero or more of:
       *   @param {Int} [args.first=20] The relay `first` param. This specifies page size.
       *   @param {String} [args.sortKey=ID] The key to sort results by. Available values are
       *   documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/collectionsortkeys|Collection Sort Keys}.
       *   @param {String} [args.query] A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#collections|here}
       *   @param {Boolean} [args.reverse] Whether or not to reverse the sort order of the results
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
       */

    }, {
      key: 'fetchQuery',
      value: function fetchQuery() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref3$first = _ref3.first,
            first = _ref3$first === undefined ? 20 : _ref3$first,
            _ref3$sortKey = _ref3.sortKey,
            sortKey = _ref3$sortKey === undefined ? 'ID' : _ref3$sortKey,
            query = _ref3.query,
            reverse = _ref3.reverse;

        return this.graphQLClient.send(query$7, {
          first: first,
          sortKey: sortKey,
          query: query,
          reverse: reverse
        }).then(defaultResolver('collections'));
      }
    }]);
    return CollectionResource;
  }(Resource);

  function query$10(client) {
    var document = client.document();
    document.addQuery(function (root) {
      root.add("shop", function (shop) {
        shop.add("paymentSettings", function (paymentSettings) {
          paymentSettings.add("enabledPresentmentCurrencies");
        });
        shop.add("description");
        shop.add("moneyFormat");
        shop.add("name");
        shop.add("primaryDomain", function (primaryDomain) {
          primaryDomain.add("host");
          primaryDomain.add("sslEnabled");
          primaryDomain.add("url");
        });
      });
    });
    return document;
  }

  function query$11(client) {
    var document = client.document();
    var spreads = {};
    spreads.PolicyFragment = document.defineFragment("PolicyFragment", "ShopPolicy", function (root) {
      root.add("id");
      root.add("title");
      root.add("url");
      root.add("body");
    });
    document.addQuery(function (root) {
      root.add("shop", function (shop) {
        shop.add("privacyPolicy", function (privacyPolicy) {
          privacyPolicy.addFragment(spreads.PolicyFragment);
        });
        shop.add("termsOfService", function (termsOfService) {
          termsOfService.addFragment(spreads.PolicyFragment);
        });
        shop.add("refundPolicy", function (refundPolicy) {
          refundPolicy.addFragment(spreads.PolicyFragment);
        });
      });
    });
    return document;
  }

  // GraphQL
  /**
   * The JS Buy SDK shop resource
   * @class
   */

  var ShopResource = function (_Resource) {
    inherits$1(ShopResource, _Resource);

    function ShopResource() {
      classCallCheck$1(this, ShopResource);
      return possibleConstructorReturn$1(this, (ShopResource.__proto__ || Object.getPrototypeOf(ShopResource)).apply(this, arguments));
    }

    createClass$1(ShopResource, [{
      key: 'fetchInfo',


      /**
       * Fetches shop information (`currencyCode`, `description`, `moneyFormat`, `name`, and `primaryDomain`).
       * See the {@link https://help.shopify.com/api/storefront-api/reference/object/shop|Storefront API reference} for more information.
       *
       * @example
       * client.shop.fetchInfo().then((shop) => {
       *   // Do something with the shop
       * });
       *
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the shop.
       */
      value: function fetchInfo() {
        return this.graphQLClient.send(query$10).then(defaultResolver('shop'));
      }

      /**
       * Fetches shop policies (privacy policy, terms of service and refund policy).
       *
       * @example
       * client.shop.fetchPolicies().then((shop) => {
       *   // Do something with the shop
       * });
       *
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the shop.
       */

    }, {
      key: 'fetchPolicies',
      value: function fetchPolicies() {
        return this.graphQLClient.send(query$11).then(defaultResolver('shop'));
      }
    }]);
    return ShopResource;
  }(Resource);

  function handleCheckoutMutation(mutationRootKey, client) {
    return function (_ref) {
      var _ref$data = _ref.data,
          data = _ref$data === undefined ? {} : _ref$data,
          errors = _ref.errors,
          _ref$model = _ref.model,
          model = _ref$model === undefined ? {} : _ref$model;

      var rootData = data[mutationRootKey];
      var rootModel = model[mutationRootKey];

      if (rootData && rootData.checkout) {
        return client.fetchAllPages(rootModel.checkout.lineItems, { pageSize: 250 }).then(function (lineItems) {
          rootModel.checkout.attrs.lineItems = lineItems;
          rootModel.checkout.errors = errors;
          rootModel.checkout.userErrors = rootModel.userErrors;

          return rootModel.checkout;
        });
      }

      if (errors && errors.length) {
        return Promise.reject(new Error(JSON.stringify(errors)));
      }

      if (rootData && rootData.checkoutUserErrors && rootData.checkoutUserErrors.length) {
        return Promise.reject(new Error(JSON.stringify(rootData.checkoutUserErrors)));
      }

      if (rootData && rootData.userErrors && rootData.userErrors.length) {
        return Promise.reject(new Error(JSON.stringify(rootData.userErrors)));
      }

      return Promise.reject(new Error("The " + mutationRootKey + " mutation failed due to an unknown error."));
    };
  }

  function query$12(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.id = client.variable("id", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addQuery([variables.__defaultOperation__.id], function (root) {
      root.add("node", {
        args: {
          id: variables.__defaultOperation__.id
        }
      }, function (node) {
        node.addFragment(spreads.CheckoutFragment);
      });
    });
    return document;
  }

  function query$13(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.input = client.variable("input", "CheckoutCreateInput!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation([variables.__defaultOperation__.input], function (root) {
      root.add("checkoutCreate", {
        args: {
          input: variables.__defaultOperation__.input
        }
      }, function (checkoutCreate) {
        checkoutCreate.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutCreate.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutCreate.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$14(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
    variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemInput!]!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function (root) {
      root.add("checkoutLineItemsAdd", {
        args: {
          checkoutId: variables.__defaultOperation__.checkoutId,
          lineItems: variables.__defaultOperation__.lineItems
        }
      }, function (checkoutLineItemsAdd) {
        checkoutLineItemsAdd.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutLineItemsAdd.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutLineItemsAdd.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$15(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
    variables.__defaultOperation__.lineItemIds = client.variable("lineItemIds", "[ID!]!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItemIds], function (root) {
      root.add("checkoutLineItemsRemove", {
        args: {
          checkoutId: variables.__defaultOperation__.checkoutId,
          lineItemIds: variables.__defaultOperation__.lineItemIds
        }
      }, function (checkoutLineItemsRemove) {
        checkoutLineItemsRemove.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutLineItemsRemove.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutLineItemsRemove.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$16(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
    variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemInput!]!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function (root) {
      root.add("checkoutLineItemsReplace", {
        args: {
          checkoutId: variables.__defaultOperation__.checkoutId,
          lineItems: variables.__defaultOperation__.lineItems
        }
      }, function (checkoutLineItemsReplace) {
        checkoutLineItemsReplace.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutLineItemsReplace.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$17(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.__defaultOperation__ = {};
    variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
    variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemUpdateInput!]!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function (root) {
      root.add("checkoutLineItemsUpdate", {
        args: {
          checkoutId: variables.__defaultOperation__.checkoutId,
          lineItems: variables.__defaultOperation__.lineItems
        }
      }, function (checkoutLineItemsUpdate) {
        checkoutLineItemsUpdate.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutLineItemsUpdate.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutLineItemsUpdate.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$18(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutAttributesUpdateV2 = {};
    variables.checkoutAttributesUpdateV2.checkoutId = client.variable("checkoutId", "ID!");
    variables.checkoutAttributesUpdateV2.input = client.variable("input", "CheckoutAttributesUpdateV2Input!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutAttributesUpdateV2", [variables.checkoutAttributesUpdateV2.checkoutId, variables.checkoutAttributesUpdateV2.input], function (root) {
      root.add("checkoutAttributesUpdateV2", {
        args: {
          checkoutId: variables.checkoutAttributesUpdateV2.checkoutId,
          input: variables.checkoutAttributesUpdateV2.input
        }
      }, function (checkoutAttributesUpdateV2) {
        checkoutAttributesUpdateV2.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutAttributesUpdateV2.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutAttributesUpdateV2.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$19(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutDiscountCodeApplyV2 = {};
    variables.checkoutDiscountCodeApplyV2.discountCode = client.variable("discountCode", "String!");
    variables.checkoutDiscountCodeApplyV2.checkoutId = client.variable("checkoutId", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutDiscountCodeApplyV2", [variables.checkoutDiscountCodeApplyV2.discountCode, variables.checkoutDiscountCodeApplyV2.checkoutId], function (root) {
      root.add("checkoutDiscountCodeApplyV2", {
        args: {
          discountCode: variables.checkoutDiscountCodeApplyV2.discountCode,
          checkoutId: variables.checkoutDiscountCodeApplyV2.checkoutId
        }
      }, function (checkoutDiscountCodeApplyV2) {
        checkoutDiscountCodeApplyV2.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutDiscountCodeApplyV2.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutDiscountCodeApplyV2.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$20(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutDiscountCodeRemove = {};
    variables.checkoutDiscountCodeRemove.checkoutId = client.variable("checkoutId", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutDiscountCodeRemove", [variables.checkoutDiscountCodeRemove.checkoutId], function (root) {
      root.add("checkoutDiscountCodeRemove", {
        args: {
          checkoutId: variables.checkoutDiscountCodeRemove.checkoutId
        }
      }, function (checkoutDiscountCodeRemove) {
        checkoutDiscountCodeRemove.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutDiscountCodeRemove.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutDiscountCodeRemove.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$21(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutGiftCardsAppend = {};
    variables.checkoutGiftCardsAppend.giftCardCodes = client.variable("giftCardCodes", "[String!]!");
    variables.checkoutGiftCardsAppend.checkoutId = client.variable("checkoutId", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutGiftCardsAppend", [variables.checkoutGiftCardsAppend.giftCardCodes, variables.checkoutGiftCardsAppend.checkoutId], function (root) {
      root.add("checkoutGiftCardsAppend", {
        args: {
          giftCardCodes: variables.checkoutGiftCardsAppend.giftCardCodes,
          checkoutId: variables.checkoutGiftCardsAppend.checkoutId
        }
      }, function (checkoutGiftCardsAppend) {
        checkoutGiftCardsAppend.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutGiftCardsAppend.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutGiftCardsAppend.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$22(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutGiftCardRemoveV2 = {};
    variables.checkoutGiftCardRemoveV2.appliedGiftCardId = client.variable("appliedGiftCardId", "ID!");
    variables.checkoutGiftCardRemoveV2.checkoutId = client.variable("checkoutId", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutGiftCardRemoveV2", [variables.checkoutGiftCardRemoveV2.appliedGiftCardId, variables.checkoutGiftCardRemoveV2.checkoutId], function (root) {
      root.add("checkoutGiftCardRemoveV2", {
        args: {
          appliedGiftCardId: variables.checkoutGiftCardRemoveV2.appliedGiftCardId,
          checkoutId: variables.checkoutGiftCardRemoveV2.checkoutId
        }
      }, function (checkoutGiftCardRemoveV2) {
        checkoutGiftCardRemoveV2.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutGiftCardRemoveV2.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutGiftCardRemoveV2.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$23(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutEmailUpdateV2 = {};
    variables.checkoutEmailUpdateV2.checkoutId = client.variable("checkoutId", "ID!");
    variables.checkoutEmailUpdateV2.email = client.variable("email", "String!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutEmailUpdateV2", [variables.checkoutEmailUpdateV2.checkoutId, variables.checkoutEmailUpdateV2.email], function (root) {
      root.add("checkoutEmailUpdateV2", {
        args: {
          checkoutId: variables.checkoutEmailUpdateV2.checkoutId,
          email: variables.checkoutEmailUpdateV2.email
        }
      }, function (checkoutEmailUpdateV2) {
        checkoutEmailUpdateV2.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutEmailUpdateV2.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutEmailUpdateV2.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  function query$24(client) {
    var document = client.document();
    var spreads = {};
    var variables = {};
    variables.checkoutShippingAddressUpdateV2 = {};
    variables.checkoutShippingAddressUpdateV2.shippingAddress = client.variable("shippingAddress", "MailingAddressInput!");
    variables.checkoutShippingAddressUpdateV2.checkoutId = client.variable("checkoutId", "ID!");
    spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
      root.add("id");
      root.add("title");
      root.add("price", function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("price", {
        alias: "priceV2"
      }, function (price) {
        price.add("amount");
        price.add("currencyCode");
      });
      root.add("weight");
      root.add("availableForSale", {
        alias: "available"
      });
      root.add("sku");
      root.add("compareAtPrice", function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("compareAtPrice", {
        alias: "compareAtPriceV2"
      }, function (compareAtPrice) {
        compareAtPrice.add("amount");
        compareAtPrice.add("currencyCode");
      });
      root.add("image", function (image) {
        image.add("id");
        image.add("url", {
          alias: "src"
        });
        image.add("altText");
        image.add("width");
        image.add("height");
      });
      root.add("selectedOptions", function (selectedOptions) {
        selectedOptions.add("name");
        selectedOptions.add("value");
      });
      root.add("unitPrice", function (unitPrice) {
        unitPrice.add("amount");
        unitPrice.add("currencyCode");
      });
      root.add("unitPriceMeasurement", function (unitPriceMeasurement) {
        unitPriceMeasurement.add("measuredType");
        unitPriceMeasurement.add("quantityUnit");
        unitPriceMeasurement.add("quantityValue");
        unitPriceMeasurement.add("referenceUnit");
        unitPriceMeasurement.add("referenceValue");
      });
    });
    spreads.DiscountApplicationFragment = document.defineFragment("DiscountApplicationFragment", "DiscountApplication", function (root) {
      root.add("targetSelection");
      root.add("allocationMethod");
      root.add("targetType");
      root.add("value", function (value) {
        value.addInlineFragmentOn("MoneyV2", function (MoneyV2) {
          MoneyV2.add("amount");
          MoneyV2.add("currencyCode");
        });
        value.addInlineFragmentOn("PricingPercentageValue", function (PricingPercentageValue) {
          PricingPercentageValue.add("percentage");
        });
      });
      root.addInlineFragmentOn("ManualDiscountApplication", function (ManualDiscountApplication) {
        ManualDiscountApplication.add("title");
        ManualDiscountApplication.add("description");
      });
      root.addInlineFragmentOn("DiscountCodeApplication", function (DiscountCodeApplication) {
        DiscountCodeApplication.add("code");
        DiscountCodeApplication.add("applicable");
      });
      root.addInlineFragmentOn("ScriptDiscountApplication", function (ScriptDiscountApplication) {
        ScriptDiscountApplication.add("title");
      });
      root.addInlineFragmentOn("AutomaticDiscountApplication", function (AutomaticDiscountApplication) {
        AutomaticDiscountApplication.add("title");
      });
    });
    spreads.AppliedGiftCardFragment = document.defineFragment("AppliedGiftCardFragment", "AppliedGiftCard", function (root) {
      root.add("amountUsed", function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("amountUsed", {
        alias: "amountUsedV2"
      }, function (amountUsed) {
        amountUsed.add("amount");
        amountUsed.add("currencyCode");
      });
      root.add("balance", function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("balance", {
        alias: "balanceV2"
      }, function (balance) {
        balance.add("amount");
        balance.add("currencyCode");
      });
      root.add("presentmentAmountUsed", function (presentmentAmountUsed) {
        presentmentAmountUsed.add("amount");
        presentmentAmountUsed.add("currencyCode");
      });
      root.add("id");
      root.add("lastCharacters");
    });
    spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
      root.addFragment(spreads.VariantFragment);
      root.add("product", function (product) {
        product.add("id");
        product.add("handle");
      });
    });
    spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
      root.add("field");
      root.add("message");
    });
    spreads.CheckoutUserErrorFragment = document.defineFragment("CheckoutUserErrorFragment", "CheckoutUserError", function (root) {
      root.add("field");
      root.add("message");
      root.add("code");
    });
    spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
      root.add("id");
      root.add("address1");
      root.add("address2");
      root.add("city");
      root.add("company");
      root.add("country");
      root.add("firstName");
      root.add("formatted");
      root.add("lastName");
      root.add("latitude");
      root.add("longitude");
      root.add("phone");
      root.add("province");
      root.add("zip");
      root.add("name");
      root.add("countryCodeV2", {
        alias: "countryCode"
      });
      root.add("provinceCode");
    });
    spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
      root.add("id");
      root.add("ready");
      root.add("requiresShipping");
      root.add("note");
      root.add("paymentDue", function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("paymentDue", {
        alias: "paymentDueV2"
      }, function (paymentDue) {
        paymentDue.add("amount");
        paymentDue.add("currencyCode");
      });
      root.add("webUrl");
      root.add("orderStatusUrl");
      root.add("taxExempt");
      root.add("taxesIncluded");
      root.add("currencyCode");
      root.add("totalTax", function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("totalTax", {
        alias: "totalTaxV2"
      }, function (totalTax) {
        totalTax.add("amount");
        totalTax.add("currencyCode");
      });
      root.add("lineItemsSubtotalPrice", function (lineItemsSubtotalPrice) {
        lineItemsSubtotalPrice.add("amount");
        lineItemsSubtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("subtotalPrice", {
        alias: "subtotalPriceV2"
      }, function (subtotalPrice) {
        subtotalPrice.add("amount");
        subtotalPrice.add("currencyCode");
      });
      root.add("totalPrice", function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("totalPrice", {
        alias: "totalPriceV2"
      }, function (totalPrice) {
        totalPrice.add("amount");
        totalPrice.add("currencyCode");
      });
      root.add("completedAt");
      root.add("createdAt");
      root.add("updatedAt");
      root.add("email");
      root.add("discountApplications", {
        args: {
          first: 10
        }
      }, function (discountApplications) {
        discountApplications.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        discountApplications.add("edges", function (edges) {
          edges.add("node", function (node) {
            node.addFragment(spreads.DiscountApplicationFragment);
          });
        });
      });
      root.add("appliedGiftCards", function (appliedGiftCards) {
        appliedGiftCards.addFragment(spreads.AppliedGiftCardFragment);
      });
      root.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      root.add("shippingLine", function (shippingLine) {
        shippingLine.add("handle");
        shippingLine.add("price", function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("price", {
          alias: "priceV2"
        }, function (price) {
          price.add("amount");
          price.add("currencyCode");
        });
        shippingLine.add("title");
      });
      root.add("customAttributes", function (customAttributes) {
        customAttributes.add("key");
        customAttributes.add("value");
      });
      root.add("order", function (order) {
        order.add("id");
        order.add("processedAt");
        order.add("orderNumber");
        order.add("subtotalPrice", function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("subtotalPrice", {
          alias: "subtotalPriceV2"
        }, function (subtotalPrice) {
          subtotalPrice.add("amount");
          subtotalPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalShippingPrice", {
          alias: "totalShippingPriceV2"
        }, function (totalShippingPrice) {
          totalShippingPrice.add("amount");
          totalShippingPrice.add("currencyCode");
        });
        order.add("totalTax", function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalTax", {
          alias: "totalTaxV2"
        }, function (totalTax) {
          totalTax.add("amount");
          totalTax.add("currencyCode");
        });
        order.add("totalPrice", function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("totalPrice", {
          alias: "totalPriceV2"
        }, function (totalPrice) {
          totalPrice.add("amount");
          totalPrice.add("currencyCode");
        });
        order.add("currencyCode");
        order.add("totalRefunded", function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("totalRefunded", {
          alias: "totalRefundedV2"
        }, function (totalRefunded) {
          totalRefunded.add("amount");
          totalRefunded.add("currencyCode");
        });
        order.add("customerUrl");
        order.add("shippingAddress", function (shippingAddress) {
          shippingAddress.addFragment(spreads.MailingAddressFragment);
        });
        order.add("lineItems", {
          args: {
            first: 250
          }
        }, function (lineItems) {
          lineItems.add("pageInfo", function (pageInfo) {
            pageInfo.add("hasNextPage");
            pageInfo.add("hasPreviousPage");
          });
          lineItems.add("edges", function (edges) {
            edges.add("cursor");
            edges.add("node", function (node) {
              node.add("title");
              node.add("variant", function (variant) {
                variant.addFragment(spreads.VariantWithProductFragment);
              });
              node.add("quantity");
              node.add("customAttributes", function (customAttributes) {
                customAttributes.add("key");
                customAttributes.add("value");
              });
            });
          });
        });
      });
      root.add("lineItems", {
        args: {
          first: 250
        }
      }, function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("id");
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
            node.add("discountAllocations", function (discountAllocations) {
              discountAllocations.add("allocatedAmount", function (allocatedAmount) {
                allocatedAmount.add("amount");
                allocatedAmount.add("currencyCode");
              });
              discountAllocations.add("discountApplication", function (discountApplication) {
                discountApplication.addFragment(spreads.DiscountApplicationFragment);
              });
            });
          });
        });
      });
    });
    document.addMutation("checkoutShippingAddressUpdateV2", [variables.checkoutShippingAddressUpdateV2.shippingAddress, variables.checkoutShippingAddressUpdateV2.checkoutId], function (root) {
      root.add("checkoutShippingAddressUpdateV2", {
        args: {
          shippingAddress: variables.checkoutShippingAddressUpdateV2.shippingAddress,
          checkoutId: variables.checkoutShippingAddressUpdateV2.checkoutId
        }
      }, function (checkoutShippingAddressUpdateV2) {
        checkoutShippingAddressUpdateV2.add("userErrors", function (userErrors) {
          userErrors.addFragment(spreads.UserErrorFragment);
        });
        checkoutShippingAddressUpdateV2.add("checkoutUserErrors", function (checkoutUserErrors) {
          checkoutUserErrors.addFragment(spreads.CheckoutUserErrorFragment);
        });
        checkoutShippingAddressUpdateV2.add("checkout", function (checkout) {
          checkout.addFragment(spreads.CheckoutFragment);
        });
      });
    });
    return document;
  }

  // GraphQL
  /**
   * The JS Buy SDK checkout resource
   * @class
   */

  var CheckoutResource = function (_Resource) {
    inherits$1(CheckoutResource, _Resource);

    function CheckoutResource() {
      classCallCheck$1(this, CheckoutResource);
      return possibleConstructorReturn$1(this, (CheckoutResource.__proto__ || Object.getPrototypeOf(CheckoutResource)).apply(this, arguments));
    }

    createClass$1(CheckoutResource, [{
      key: 'fetch',


      /**
       * Fetches a checkout by ID.
       *
       * @example
       * client.checkout.fetch('FlZj9rZXlN5MDY4ZDFiZTUyZTUwNTE2MDNhZjg=').then((checkout) => {
       *   // Do something with the checkout
       * });
       *
       * @param {String} id The id of the checkout to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the checkout.
       */
      value: function fetch(id) {
        var _this2 = this;

        return this.graphQLClient.send(query$12, { id: id }).then(defaultResolver('node')).then(function (checkout) {
          if (!checkout) {
            return null;
          }

          return _this2.graphQLClient.fetchAllPages(checkout.lineItems, { pageSize: 250 }).then(function (lineItems) {
            checkout.attrs.lineItems = lineItems;

            return checkout;
          });
        });
      }

      /**
       * Creates a checkout.
       *
       * @example
       * const input = {
       *   lineItems: [
       *     {variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}
       *   ]
       * };
       *
       * client.checkout.create(input).then((checkout) => {
       *   // Do something with the newly created checkout
       * });
       *
       * @param {Object} [input] An input object containing zero or more of:
       *   @param {String} [input.email] An email connected to the checkout.
       *   @param {Object[]} [input.lineItems] A list of line items in the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
       *   @param {Object} [input.shippingAddress] A shipping address. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/mailingaddressinput|Storefront API reference} for valid input fields.
       *   @param {String} [input.note] A note for the checkout.
       *   @param {Object[]} [input.customAttributes] A list of custom attributes for the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/attributeinput|Storefront API reference} for valid input fields.
       *   @param {String} [input.presentmentCurrencyCode ] A presentment currency code. See the {@link https://help.shopify.com/en/api/storefront-api/reference/enum/currencycode|Storefront API reference} for valid currency code values.
       * @return {Promise|GraphModel} A promise resolving with the created checkout.
       */

    }, {
      key: 'create',
      value: function create() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return this.graphQLClient.send(query$13, { input: input }).then(handleCheckoutMutation('checkoutCreate', this.graphQLClient));
      }

      /**
       * Replaces the value of checkout's custom attributes and/or note with values defined in the input
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const input = {customAttributes: [{key: "MyKey", value: "MyValue"}]};
       *
       * client.checkout.updateAttributes(checkoutId, input).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to update.
       * @param {Object} [input] An input object containing zero or more of:
       *   @param {Boolean} [input.allowPartialAddresses] An email connected to the checkout.
       *   @param {Object[]} [input.customAttributes] A list of custom attributes for the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/attributeinput|Storefront API reference} for valid input fields.
       *   @param {String} [input.note] A note for the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'updateAttributes',
      value: function updateAttributes(checkoutId) {
        var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this.graphQLClient.send(query$18, { checkoutId: checkoutId, input: input }).then(handleCheckoutMutation('checkoutAttributesUpdateV2', this.graphQLClient));
      }

      /**
       * Replaces the value of checkout's email address
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const email = 'user@example.com';
       *
       * client.checkout.updateEmail(checkoutId, email).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to update.
       * @param {String} email The email address to apply to the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'updateEmail',
      value: function updateEmail(checkoutId, email) {
        return this.graphQLClient.send(query$23, { checkoutId: checkoutId, email: email }).then(handleCheckoutMutation('checkoutEmailUpdateV2', this.graphQLClient));
      }

      /**
       * Adds line items to an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
       *
       * client.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add line items to.
       * @param {Object[]} lineItems A list of line items to add to the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'addLineItems',
      value: function addLineItems(checkoutId, lineItems) {
        return this.graphQLClient.send(query$14, { checkoutId: checkoutId, lineItems: lineItems }).then(handleCheckoutMutation('checkoutLineItemsAdd', this.graphQLClient));
      }

      /**
       * Applies a discount to an existing checkout using a discount code.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const discountCode = 'best-discount-ever';
       *
       * client.checkout.addDiscount(checkoutId, discountCode).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add discount to.
       * @param {String} discountCode The discount code to apply to the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'addDiscount',
      value: function addDiscount(checkoutId, discountCode) {
        return this.graphQLClient.send(query$19, { checkoutId: checkoutId, discountCode: discountCode }).then(handleCheckoutMutation('checkoutDiscountCodeApplyV2', this.graphQLClient));
      }

      /**
       * Removes the applied discount from an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       *
       * client.checkout.removeDiscount(checkoutId).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to remove the discount from.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'removeDiscount',
      value: function removeDiscount(checkoutId) {
        return this.graphQLClient.send(query$20, { checkoutId: checkoutId }).then(handleCheckoutMutation('checkoutDiscountCodeRemove', this.graphQLClient));
      }

      /**
       * Applies gift cards to an existing checkout using a list of gift card codes
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const giftCardCodes = ['6FD8853DAGAA949F'];
       *
       * client.checkout.addGiftCards(checkoutId, giftCardCodes).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add gift cards to.
       * @param {String[]} giftCardCodes The gift card codes to apply to the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'addGiftCards',
      value: function addGiftCards(checkoutId, giftCardCodes) {
        return this.graphQLClient.send(query$21, { checkoutId: checkoutId, giftCardCodes: giftCardCodes }).then(handleCheckoutMutation('checkoutGiftCardsAppend', this.graphQLClient));
      }

      /**
       * Remove a gift card from an existing checkout
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const appliedGiftCardId = 'Z2lkOi8vc2hvcGlmeS9BcHBsaWVkR2lmdENhcmQvNDI4NTQ1ODAzMTI=';
       *
       * client.checkout.removeGiftCard(checkoutId, appliedGiftCardId).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add gift cards to.
       * @param {String} appliedGiftCardId The gift card id to remove from the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'removeGiftCard',
      value: function removeGiftCard(checkoutId, appliedGiftCardId) {
        return this.graphQLClient.send(query$22, { checkoutId: checkoutId, appliedGiftCardId: appliedGiftCardId }).then(handleCheckoutMutation('checkoutGiftCardRemoveV2', this.graphQLClient));
      }

      /**
       * Removes line items from an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItemIds = ['TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU='];
       *
       * client.checkout.removeLineItems(checkoutId, lineItemIds).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to remove line items from.
       * @param {String[]} lineItemIds A list of the ids of line items to remove from the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'removeLineItems',
      value: function removeLineItems(checkoutId, lineItemIds) {
        return this.graphQLClient.send(query$15, { checkoutId: checkoutId, lineItemIds: lineItemIds }).then(handleCheckoutMutation('checkoutLineItemsRemove', this.graphQLClient));
      }

      /**
       * Replace line items on an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
       *
       * client.checkout.replaceLineItems(checkoutId, lineItems).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add line items to.
       * @param {Object[]} lineItems A list of line items to set on the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'replaceLineItems',
      value: function replaceLineItems(checkoutId, lineItems) {
        return this.graphQLClient.send(query$16, { checkoutId: checkoutId, lineItems: lineItems }).then(handleCheckoutMutation('checkoutLineItemsReplace', this.graphQLClient));
      }

      /**
       * Updates line items on an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItems = [
       *   {
       *     id: 'TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU=',
       *     quantity: 5,
       *     variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg=='
       *   }
       * ];
       *
       * client.checkout.updateLineItems(checkoutId, lineItems).then(checkout => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to update a line item on.
       * @param {Object[]} lineItems A list of line item information to update. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineitemupdateinput|Storefront API reference} for valid input fields for each line item.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'updateLineItems',
      value: function updateLineItems(checkoutId, lineItems) {
        return this.graphQLClient.send(query$17, { checkoutId: checkoutId, lineItems: lineItems }).then(handleCheckoutMutation('checkoutLineItemsUpdate', this.graphQLClient));
      }

      /**
       * Updates shipping address on an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const shippingAddress = {
       *    address1: 'Chestnut Street 92',
       *    address2: 'Apartment 2',
       *    city: 'Louisville',
       *    company: null,
       *    country: 'United States',
       *    firstName: 'Bob',
       *    lastName: 'Norman',
       *    phone: '555-625-1199',
       *    province: 'Kentucky',
       *    zip: '40202'
       *  };
       *
       * client.checkout.updateShippingAddress(checkoutId, shippingAddress).then(checkout => {
       *   // Do something with the updated checkout
       * });
       *
       * @param  {String} checkoutId The ID of the checkout to update shipping address.
       * @param  {Object} shippingAddress A shipping address.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */

    }, {
      key: 'updateShippingAddress',
      value: function updateShippingAddress(checkoutId, shippingAddress) {
        return this.graphQLClient.send(query$24, { checkoutId: checkoutId, shippingAddress: shippingAddress }).then(handleCheckoutMutation('checkoutShippingAddressUpdateV2', this.graphQLClient));
      }
    }]);
    return CheckoutResource;
  }(Resource);

  /**
   * @namespace ImageHelpers
   */
  var imageHelpers = {

    /**
     * Generates the image src for a resized image with maximum dimensions `maxWidth` and `maxHeight`.
     * Images do not scale up.
     *
     * @example
     * const url = client.image.helpers.imageForSize(product.variants[0].image, {maxWidth: 50, maxHeight: 50});
     *
     * @memberof ImageHelpers
     * @method imageForSize
     * @param {Object} image The original image model to generate the image src for.
     * @param {Object} options An options object containing:
     *  @param {Integer} options.maxWidth The maximum width for the image.
     *  @param {Integer} options.maxHeight The maximum height for the image.
     * @return {String} The image src for the resized image.
     */
    imageForSize: function imageForSize(image, _ref) {
      var maxWidth = _ref.maxWidth,
          maxHeight = _ref.maxHeight;

      var splitUrl = image.src.split('?');
      var notQuery = splitUrl[0];
      var query = splitUrl[1] ? '?' + splitUrl[1] : '';

      // Use the section before the query
      var imageTokens = notQuery.split('.');

      // Take the token before the file extension and append the dimensions
      var imagePathIndex = imageTokens.length - 2;

      imageTokens[imagePathIndex] = imageTokens[imagePathIndex] + '_' + maxWidth + 'x' + maxHeight;

      return '' + imageTokens.join('.') + query;
    }
  };

  /**
   * The JS Buy SDK image resource
   * @class
   */

  var ImageResource = function (_Resource) {
    inherits$1(ImageResource, _Resource);

    function ImageResource() {
      classCallCheck$1(this, ImageResource);
      return possibleConstructorReturn$1(this, (ImageResource.__proto__ || Object.getPrototypeOf(ImageResource)).apply(this, arguments));
    }

    createClass$1(ImageResource, [{
      key: 'helpers',
      get: function get$$1() {
        return imageHelpers;
      }
    }]);
    return ImageResource;
  }(Resource);

  var version = "2.20.0";

  var AppliedGiftCard = {
    "name": "AppliedGiftCard",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "amountUsed": "MoneyV2",
      "balance": "MoneyV2",
      "id": "ID",
      "lastCharacters": "String",
      "presentmentAmountUsed": "MoneyV2"
    },
    "implementsNode": true
  };

  var Attribute = {
    "name": "Attribute",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "key": "String",
      "value": "String"
    },
    "implementsNode": false
  };

  var AutomaticDiscountApplication = {
    "name": "AutomaticDiscountApplication",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "title": "String"
    },
    "implementsNode": false
  };

  var Boolean$1 = {
    "name": "Boolean",
    "kind": "SCALAR"
  };

  var Checkout = {
    "name": "Checkout",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "appliedGiftCards": "AppliedGiftCard",
      "completedAt": "DateTime",
      "createdAt": "DateTime",
      "currencyCode": "CurrencyCode",
      "customAttributes": "Attribute",
      "discountApplications": "DiscountApplicationConnection",
      "email": "String",
      "id": "ID",
      "lineItems": "CheckoutLineItemConnection",
      "lineItemsSubtotalPrice": "MoneyV2",
      "note": "String",
      "order": "Order",
      "orderStatusUrl": "URL",
      "paymentDue": "MoneyV2",
      "ready": "Boolean",
      "requiresShipping": "Boolean",
      "shippingAddress": "MailingAddress",
      "shippingLine": "ShippingRate",
      "subtotalPrice": "MoneyV2",
      "taxExempt": "Boolean",
      "taxesIncluded": "Boolean",
      "totalPrice": "MoneyV2",
      "totalTax": "MoneyV2",
      "updatedAt": "DateTime",
      "webUrl": "URL"
    },
    "implementsNode": true
  };

  var CheckoutAttributesUpdateV2Payload = {
    "name": "CheckoutAttributesUpdateV2Payload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutCreatePayload = {
    "name": "CheckoutCreatePayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutDiscountCodeApplyV2Payload = {
    "name": "CheckoutDiscountCodeApplyV2Payload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutDiscountCodeRemovePayload = {
    "name": "CheckoutDiscountCodeRemovePayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutEmailUpdateV2Payload = {
    "name": "CheckoutEmailUpdateV2Payload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutErrorCode = {
    "name": "CheckoutErrorCode",
    "kind": "ENUM"
  };

  var CheckoutGiftCardRemoveV2Payload = {
    "name": "CheckoutGiftCardRemoveV2Payload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutGiftCardsAppendPayload = {
    "name": "CheckoutGiftCardsAppendPayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutLineItem = {
    "name": "CheckoutLineItem",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "customAttributes": "Attribute",
      "discountAllocations": "DiscountAllocation",
      "id": "ID",
      "quantity": "Int",
      "title": "String",
      "variant": "ProductVariant"
    },
    "implementsNode": true
  };

  var CheckoutLineItemConnection = {
    "name": "CheckoutLineItemConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "CheckoutLineItemEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var CheckoutLineItemEdge = {
    "name": "CheckoutLineItemEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "cursor": "String",
      "node": "CheckoutLineItem"
    },
    "implementsNode": false
  };

  var CheckoutLineItemsAddPayload = {
    "name": "CheckoutLineItemsAddPayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutLineItemsRemovePayload = {
    "name": "CheckoutLineItemsRemovePayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutLineItemsReplacePayload = {
    "name": "CheckoutLineItemsReplacePayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "userErrors": "CheckoutUserError"
    },
    "implementsNode": false
  };

  var CheckoutLineItemsUpdatePayload = {
    "name": "CheckoutLineItemsUpdatePayload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutShippingAddressUpdateV2Payload = {
    "name": "CheckoutShippingAddressUpdateV2Payload",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkout": "Checkout",
      "checkoutUserErrors": "CheckoutUserError",
      "userErrors": "UserError"
    },
    "implementsNode": false
  };

  var CheckoutUserError = {
    "name": "CheckoutUserError",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "code": "CheckoutErrorCode",
      "field": "String",
      "message": "String"
    },
    "implementsNode": false
  };

  var Collection = {
    "name": "Collection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "description": "String",
      "descriptionHtml": "HTML",
      "handle": "String",
      "id": "ID",
      "image": "Image",
      "products": "ProductConnection",
      "title": "String",
      "updatedAt": "DateTime"
    },
    "implementsNode": true
  };

  var CollectionConnection = {
    "name": "CollectionConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "CollectionEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var CollectionEdge = {
    "name": "CollectionEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "cursor": "String",
      "node": "Collection"
    },
    "implementsNode": false
  };

  var CountryCode = {
    "name": "CountryCode",
    "kind": "ENUM"
  };

  var CurrencyCode = {
    "name": "CurrencyCode",
    "kind": "ENUM"
  };

  var DateTime = {
    "name": "DateTime",
    "kind": "SCALAR"
  };

  var Decimal = {
    "name": "Decimal",
    "kind": "SCALAR"
  };

  var DiscountAllocation = {
    "name": "DiscountAllocation",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "allocatedAmount": "MoneyV2",
      "discountApplication": "DiscountApplication"
    },
    "implementsNode": false
  };

  var DiscountApplication = {
    "name": "DiscountApplication",
    "kind": "INTERFACE",
    "fieldBaseTypes": {
      "allocationMethod": "DiscountApplicationAllocationMethod",
      "targetSelection": "DiscountApplicationTargetSelection",
      "targetType": "DiscountApplicationTargetType",
      "value": "PricingValue"
    },
    "possibleTypes": ["AutomaticDiscountApplication", "DiscountCodeApplication", "ManualDiscountApplication", "ScriptDiscountApplication"]
  };

  var DiscountApplicationAllocationMethod = {
    "name": "DiscountApplicationAllocationMethod",
    "kind": "ENUM"
  };

  var DiscountApplicationConnection = {
    "name": "DiscountApplicationConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "DiscountApplicationEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var DiscountApplicationEdge = {
    "name": "DiscountApplicationEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "node": "DiscountApplication"
    },
    "implementsNode": false
  };

  var DiscountApplicationTargetSelection = {
    "name": "DiscountApplicationTargetSelection",
    "kind": "ENUM"
  };

  var DiscountApplicationTargetType = {
    "name": "DiscountApplicationTargetType",
    "kind": "ENUM"
  };

  var DiscountCodeApplication = {
    "name": "DiscountCodeApplication",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "applicable": "Boolean",
      "code": "String"
    },
    "implementsNode": false
  };

  var Domain = {
    "name": "Domain",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "host": "String",
      "sslEnabled": "Boolean",
      "url": "URL"
    },
    "implementsNode": false
  };

  var Float = {
    "name": "Float",
    "kind": "SCALAR"
  };

  var HTML = {
    "name": "HTML",
    "kind": "SCALAR"
  };

  var ID = {
    "name": "ID",
    "kind": "SCALAR"
  };

  var Image = {
    "name": "Image",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "altText": "String",
      "height": "Int",
      "id": "ID",
      "url": "URL",
      "width": "Int"
    },
    "implementsNode": false
  };

  var ImageConnection = {
    "name": "ImageConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "ImageEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var ImageEdge = {
    "name": "ImageEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "cursor": "String",
      "node": "Image"
    },
    "implementsNode": false
  };

  var Int = {
    "name": "Int",
    "kind": "SCALAR"
  };

  var MailingAddress = {
    "name": "MailingAddress",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "address1": "String",
      "address2": "String",
      "city": "String",
      "company": "String",
      "country": "String",
      "countryCodeV2": "CountryCode",
      "firstName": "String",
      "formatted": "String",
      "id": "ID",
      "lastName": "String",
      "latitude": "Float",
      "longitude": "Float",
      "name": "String",
      "phone": "String",
      "province": "String",
      "provinceCode": "String",
      "zip": "String"
    },
    "implementsNode": true
  };

  var ManualDiscountApplication = {
    "name": "ManualDiscountApplication",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "description": "String",
      "title": "String"
    },
    "implementsNode": false
  };

  var MoneyV2 = {
    "name": "MoneyV2",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "amount": "Decimal",
      "currencyCode": "CurrencyCode"
    },
    "implementsNode": false
  };

  var Mutation$1 = {
    "name": "Mutation",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "checkoutAttributesUpdateV2": "CheckoutAttributesUpdateV2Payload",
      "checkoutCreate": "CheckoutCreatePayload",
      "checkoutDiscountCodeApplyV2": "CheckoutDiscountCodeApplyV2Payload",
      "checkoutDiscountCodeRemove": "CheckoutDiscountCodeRemovePayload",
      "checkoutEmailUpdateV2": "CheckoutEmailUpdateV2Payload",
      "checkoutGiftCardRemoveV2": "CheckoutGiftCardRemoveV2Payload",
      "checkoutGiftCardsAppend": "CheckoutGiftCardsAppendPayload",
      "checkoutLineItemsAdd": "CheckoutLineItemsAddPayload",
      "checkoutLineItemsRemove": "CheckoutLineItemsRemovePayload",
      "checkoutLineItemsReplace": "CheckoutLineItemsReplacePayload",
      "checkoutLineItemsUpdate": "CheckoutLineItemsUpdatePayload",
      "checkoutShippingAddressUpdateV2": "CheckoutShippingAddressUpdateV2Payload"
    },
    "implementsNode": false,
    "relayInputObjectBaseTypes": {
      "cartCreate": "CartInput",
      "cartMetafieldDelete": "CartMetafieldDeleteInput",
      "checkoutAttributesUpdateV2": "CheckoutAttributesUpdateV2Input",
      "checkoutCreate": "CheckoutCreateInput",
      "customerAccessTokenCreate": "CustomerAccessTokenCreateInput",
      "customerActivate": "CustomerActivateInput",
      "customerCreate": "CustomerCreateInput",
      "customerReset": "CustomerResetInput"
    }
  };

  var Node = {
    "name": "Node",
    "kind": "INTERFACE",
    "fieldBaseTypes": {},
    "possibleTypes": ["AppliedGiftCard", "Article", "Blog", "Cart", "CartLine", "Checkout", "CheckoutLineItem", "Collection", "Comment", "ExternalVideo", "GenericFile", "Location", "MailingAddress", "Market", "MediaImage", "MediaPresentation", "Menu", "MenuItem", "Metafield", "Metaobject", "Model3d", "Order", "Page", "Payment", "Product", "ProductOption", "ProductVariant", "Shop", "ShopPolicy", "UrlRedirect", "Video"]
  };

  var Order = {
    "name": "Order",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "currencyCode": "CurrencyCode",
      "customerUrl": "URL",
      "id": "ID",
      "lineItems": "OrderLineItemConnection",
      "orderNumber": "Int",
      "processedAt": "DateTime",
      "shippingAddress": "MailingAddress",
      "subtotalPrice": "MoneyV2",
      "totalPrice": "MoneyV2",
      "totalRefunded": "MoneyV2",
      "totalShippingPrice": "MoneyV2",
      "totalTax": "MoneyV2"
    },
    "implementsNode": true
  };

  var OrderLineItem = {
    "name": "OrderLineItem",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "customAttributes": "Attribute",
      "quantity": "Int",
      "title": "String",
      "variant": "ProductVariant"
    },
    "implementsNode": false
  };

  var OrderLineItemConnection = {
    "name": "OrderLineItemConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "OrderLineItemEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var OrderLineItemEdge = {
    "name": "OrderLineItemEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "cursor": "String",
      "node": "OrderLineItem"
    },
    "implementsNode": false
  };

  var PageInfo = {
    "name": "PageInfo",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "hasNextPage": "Boolean",
      "hasPreviousPage": "Boolean"
    },
    "implementsNode": false
  };

  var PaymentSettings = {
    "name": "PaymentSettings",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "enabledPresentmentCurrencies": "CurrencyCode"
    },
    "implementsNode": false
  };

  var PricingPercentageValue = {
    "name": "PricingPercentageValue",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "percentage": "Float"
    },
    "implementsNode": false
  };

  var PricingValue = {
    "name": "PricingValue",
    "kind": "UNION"
  };

  var Product = {
    "name": "Product",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "availableForSale": "Boolean",
      "createdAt": "DateTime",
      "description": "String",
      "descriptionHtml": "HTML",
      "handle": "String",
      "id": "ID",
      "images": "ImageConnection",
      "onlineStoreUrl": "URL",
      "options": "ProductOption",
      "productType": "String",
      "publishedAt": "DateTime",
      "title": "String",
      "updatedAt": "DateTime",
      "variants": "ProductVariantConnection",
      "vendor": "String"
    },
    "implementsNode": true
  };

  var ProductConnection = {
    "name": "ProductConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "ProductEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var ProductEdge = {
    "name": "ProductEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "cursor": "String",
      "node": "Product"
    },
    "implementsNode": false
  };

  var ProductOption = {
    "name": "ProductOption",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "name": "String",
      "values": "String"
    },
    "implementsNode": true
  };

  var ProductVariant = {
    "name": "ProductVariant",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "availableForSale": "Boolean",
      "compareAtPrice": "MoneyV2",
      "id": "ID",
      "image": "Image",
      "price": "MoneyV2",
      "product": "Product",
      "selectedOptions": "SelectedOption",
      "sku": "String",
      "title": "String",
      "unitPrice": "MoneyV2",
      "unitPriceMeasurement": "UnitPriceMeasurement",
      "weight": "Float"
    },
    "implementsNode": true
  };

  var ProductVariantConnection = {
    "name": "ProductVariantConnection",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "edges": "ProductVariantEdge",
      "pageInfo": "PageInfo"
    },
    "implementsNode": false
  };

  var ProductVariantEdge = {
    "name": "ProductVariantEdge",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "cursor": "String",
      "node": "ProductVariant"
    },
    "implementsNode": false
  };

  var QueryRoot = {
    "name": "QueryRoot",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "collectionByHandle": "Collection",
      "collections": "CollectionConnection",
      "node": "Node",
      "nodes": "Node",
      "productByHandle": "Product",
      "productRecommendations": "Product",
      "products": "ProductConnection",
      "shop": "Shop"
    },
    "implementsNode": false
  };

  var ScriptDiscountApplication = {
    "name": "ScriptDiscountApplication",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "title": "String"
    },
    "implementsNode": false
  };

  var SelectedOption = {
    "name": "SelectedOption",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "name": "String",
      "value": "String"
    },
    "implementsNode": false
  };

  var ShippingRate = {
    "name": "ShippingRate",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "handle": "String",
      "price": "MoneyV2",
      "title": "String"
    },
    "implementsNode": false
  };

  var Shop = {
    "name": "Shop",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "description": "String",
      "moneyFormat": "String",
      "name": "String",
      "paymentSettings": "PaymentSettings",
      "primaryDomain": "Domain",
      "privacyPolicy": "ShopPolicy",
      "refundPolicy": "ShopPolicy",
      "termsOfService": "ShopPolicy"
    },
    "implementsNode": true
  };

  var ShopPolicy = {
    "name": "ShopPolicy",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "body": "String",
      "id": "ID",
      "title": "String",
      "url": "URL"
    },
    "implementsNode": true
  };

  var String$1 = {
    "name": "String",
    "kind": "SCALAR"
  };

  var URL = {
    "name": "URL",
    "kind": "SCALAR"
  };

  var UnitPriceMeasurement = {
    "name": "UnitPriceMeasurement",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "measuredType": "UnitPriceMeasurementMeasuredType",
      "quantityUnit": "UnitPriceMeasurementMeasuredUnit",
      "quantityValue": "Float",
      "referenceUnit": "UnitPriceMeasurementMeasuredUnit",
      "referenceValue": "Int"
    },
    "implementsNode": false
  };

  var UnitPriceMeasurementMeasuredType = {
    "name": "UnitPriceMeasurementMeasuredType",
    "kind": "ENUM"
  };

  var UnitPriceMeasurementMeasuredUnit = {
    "name": "UnitPriceMeasurementMeasuredUnit",
    "kind": "ENUM"
  };

  var UserError = {
    "name": "UserError",
    "kind": "OBJECT",
    "fieldBaseTypes": {
      "field": "String",
      "message": "String"
    },
    "implementsNode": false
  };

  var Types = {
    types: {}
  };
  Types.types["AppliedGiftCard"] = AppliedGiftCard;
  Types.types["Attribute"] = Attribute;
  Types.types["AutomaticDiscountApplication"] = AutomaticDiscountApplication;
  Types.types["Boolean"] = Boolean$1;
  Types.types["Checkout"] = Checkout;
  Types.types["CheckoutAttributesUpdateV2Payload"] = CheckoutAttributesUpdateV2Payload;
  Types.types["CheckoutCreatePayload"] = CheckoutCreatePayload;
  Types.types["CheckoutDiscountCodeApplyV2Payload"] = CheckoutDiscountCodeApplyV2Payload;
  Types.types["CheckoutDiscountCodeRemovePayload"] = CheckoutDiscountCodeRemovePayload;
  Types.types["CheckoutEmailUpdateV2Payload"] = CheckoutEmailUpdateV2Payload;
  Types.types["CheckoutErrorCode"] = CheckoutErrorCode;
  Types.types["CheckoutGiftCardRemoveV2Payload"] = CheckoutGiftCardRemoveV2Payload;
  Types.types["CheckoutGiftCardsAppendPayload"] = CheckoutGiftCardsAppendPayload;
  Types.types["CheckoutLineItem"] = CheckoutLineItem;
  Types.types["CheckoutLineItemConnection"] = CheckoutLineItemConnection;
  Types.types["CheckoutLineItemEdge"] = CheckoutLineItemEdge;
  Types.types["CheckoutLineItemsAddPayload"] = CheckoutLineItemsAddPayload;
  Types.types["CheckoutLineItemsRemovePayload"] = CheckoutLineItemsRemovePayload;
  Types.types["CheckoutLineItemsReplacePayload"] = CheckoutLineItemsReplacePayload;
  Types.types["CheckoutLineItemsUpdatePayload"] = CheckoutLineItemsUpdatePayload;
  Types.types["CheckoutShippingAddressUpdateV2Payload"] = CheckoutShippingAddressUpdateV2Payload;
  Types.types["CheckoutUserError"] = CheckoutUserError;
  Types.types["Collection"] = Collection;
  Types.types["CollectionConnection"] = CollectionConnection;
  Types.types["CollectionEdge"] = CollectionEdge;
  Types.types["CountryCode"] = CountryCode;
  Types.types["CurrencyCode"] = CurrencyCode;
  Types.types["DateTime"] = DateTime;
  Types.types["Decimal"] = Decimal;
  Types.types["DiscountAllocation"] = DiscountAllocation;
  Types.types["DiscountApplication"] = DiscountApplication;
  Types.types["DiscountApplicationAllocationMethod"] = DiscountApplicationAllocationMethod;
  Types.types["DiscountApplicationConnection"] = DiscountApplicationConnection;
  Types.types["DiscountApplicationEdge"] = DiscountApplicationEdge;
  Types.types["DiscountApplicationTargetSelection"] = DiscountApplicationTargetSelection;
  Types.types["DiscountApplicationTargetType"] = DiscountApplicationTargetType;
  Types.types["DiscountCodeApplication"] = DiscountCodeApplication;
  Types.types["Domain"] = Domain;
  Types.types["Float"] = Float;
  Types.types["HTML"] = HTML;
  Types.types["ID"] = ID;
  Types.types["Image"] = Image;
  Types.types["ImageConnection"] = ImageConnection;
  Types.types["ImageEdge"] = ImageEdge;
  Types.types["Int"] = Int;
  Types.types["MailingAddress"] = MailingAddress;
  Types.types["ManualDiscountApplication"] = ManualDiscountApplication;
  Types.types["MoneyV2"] = MoneyV2;
  Types.types["Mutation"] = Mutation$1;
  Types.types["Node"] = Node;
  Types.types["Order"] = Order;
  Types.types["OrderLineItem"] = OrderLineItem;
  Types.types["OrderLineItemConnection"] = OrderLineItemConnection;
  Types.types["OrderLineItemEdge"] = OrderLineItemEdge;
  Types.types["PageInfo"] = PageInfo;
  Types.types["PaymentSettings"] = PaymentSettings;
  Types.types["PricingPercentageValue"] = PricingPercentageValue;
  Types.types["PricingValue"] = PricingValue;
  Types.types["Product"] = Product;
  Types.types["ProductConnection"] = ProductConnection;
  Types.types["ProductEdge"] = ProductEdge;
  Types.types["ProductOption"] = ProductOption;
  Types.types["ProductVariant"] = ProductVariant;
  Types.types["ProductVariantConnection"] = ProductVariantConnection;
  Types.types["ProductVariantEdge"] = ProductVariantEdge;
  Types.types["QueryRoot"] = QueryRoot;
  Types.types["ScriptDiscountApplication"] = ScriptDiscountApplication;
  Types.types["SelectedOption"] = SelectedOption;
  Types.types["ShippingRate"] = ShippingRate;
  Types.types["Shop"] = Shop;
  Types.types["ShopPolicy"] = ShopPolicy;
  Types.types["String"] = String$1;
  Types.types["URL"] = URL;
  Types.types["UnitPriceMeasurement"] = UnitPriceMeasurement;
  Types.types["UnitPriceMeasurementMeasuredType"] = UnitPriceMeasurementMeasuredType;
  Types.types["UnitPriceMeasurementMeasuredUnit"] = UnitPriceMeasurementMeasuredUnit;
  Types.types["UserError"] = UserError;
  Types.queryType = "QueryRoot";
  Types.mutationType = "Mutation";
  Types.subscriptionType = null;

  function recursivelyFreezeObject(structure) {
    Object.getOwnPropertyNames(structure).forEach(function (key) {
      var value = structure[key];
      if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
        recursivelyFreezeObject(value);
      }
    });
    Object.freeze(structure);
    return structure;
  }

  var types = recursivelyFreezeObject(Types);

  // GraphQL
  /**
   * The JS Buy SDK Client.
   * @class
   *
   * @property {ProductResource} product The property under which product fetching methods live.
   * @property {CollectionResource} collection The property under which collection fetching methods live.
   * @property {ShopResource} shop The property under which shop fetching methods live.
   * @property {CheckoutResource} checkout The property under which shop fetching and mutating methods live.
   * @property {ImageResource} image The property under which image helper methods live.
   */

  var Client = function () {
    createClass$1(Client, null, [{
      key: 'buildClient',


      /**
       * Primary entry point for building a new Client.
       */
      value: function buildClient(config, fetchFunction) {
        var newConfig = new Config(config);
        var client = new Client(newConfig, Client$2, fetchFunction);

        client.config = newConfig;

        return client;
      }

      /**
       * @constructs Client
       * @param {Config} config An instance of {@link Config} used to configure the Client.
       */

    }]);

    function Client(config) {
      var GraphQLClientClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Client$2;
      var fetchFunction = arguments[2];
      classCallCheck$1(this, Client);

      var url = 'https://' + config.domain + '/api/' + config.apiVersion + '/graphql';

      var headers = {
        'X-SDK-Variant': 'javascript',
        'X-SDK-Version': version,
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken
      };

      if (config.source) {
        headers['X-SDK-Variant-Source'] = config.source;
      }

      var languageHeader = config.language ? config.language : '*';

      headers['Accept-Language'] = languageHeader;

      if (fetchFunction) {
        headers['Content-Type'] = 'application/json';
        headers.Accept = 'application/json';

        this.graphQLClient = new GraphQLClientClass(types, {
          fetcher: function fetcher(graphQLParams) {
            return fetchFunction(url, {
              body: JSON.stringify(graphQLParams),
              method: 'POST',
              mode: 'cors',
              headers: headers
            }).then(function (response) {
              return response.json();
            });
          }
        });
      } else {
        this.graphQLClient = new GraphQLClientClass(types, {
          url: url,
          fetcherOptions: { headers: headers }
        });
      }

      this.product = new ProductResource(this.graphQLClient);
      this.collection = new CollectionResource(this.graphQLClient);
      this.shop = new ShopResource(this.graphQLClient);
      this.checkout = new CheckoutResource(this.graphQLClient);
      this.image = new ImageResource(this.graphQLClient);
    }

    /**
     * Fetches the next page of models
     *
     * @example
     * client.fetchNextPage(products).then((nextProducts) => {
     *   // Do something with the products
     * });
     *
     * @param {models} [Array] The paginated set to fetch the next page of
     * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the type provided.
     */


    createClass$1(Client, [{
      key: 'fetchNextPage',
      value: function fetchNextPage(models) {
        return this.graphQLClient.fetchNextPage(models);
      }
    }]);
    return Client;
  }();

  var shopifyBuy = Client;

  function merge(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (source) {
      if (source) {
        Object.keys(source).forEach(function (key) {
          if (Object.prototype.toString.call(source[key]) === '[object Object]') {
            target[key] = merge(target[key] || {}, source[key]);
          } else {
            target[key] = source[key];
          }
        });
      }
    });
    return target;
  }

  function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  var quantityTemplate = "<div class=\"{{data.classes.product.quantity}} {{data.quantityClass}}\" data-element=\"product.quantity\">\n            {{#data.contents.quantityDecrement}}\n              <button class=\"{{data.classes.product.quantityButton}} {{data.classes.product.quantityDecrement}}\" type=\"button\" data-element=\"product.quantityDecrement\"><span>-</span><span class=\"visuallyhidden\">Decrement</span></button>\n            {{/data.contents.quantityDecrement}}\n            {{#data.contents.quantityInput}}\n              <input class=\"{{data.classes.product.quantityInput}}\" type=\"number\" min=\"0\" aria-label=\"Quantity\" value=\"{{data.selectedQuantity}}\" data-element=\"product.quantityInput\">\n            {{/data.contents.quantityInput}}\n            {{#data.contents.quantityIncrement}}\n              <button class=\"{{data.classes.product.quantityButton}} {{data.classes.product.quantityIncrement}}\" type=\"button\" data-element=\"product.quantityIncrement\"><span>+</span><span class=\"visuallyhidden\">Increment</span></button>\n            {{/data.contents.quantityIncrement}}\n           </div>";
  var buttonTemplate = '<div class="{{data.classes.product.buttonWrapper}}" data-element="product.buttonWrapper"><button {{#data.buttonDisabled}}disabled{{/data.buttonDisabled}} class="{{data.classes.product.button}} {{data.buttonClass}}" data-element="product.button">{{data.buttonText}}</button></div>';
  var productTemplate = {
    img: '{{#data.currentImage.srcLarge}}<div class="{{data.classes.product.imgWrapper}}" data-element="product.imgWrapper"><img alt="{{data.currentImage.altText}}" data-element="product.img" class="{{data.classes.product.img}}" src="{{data.currentImage.srcLarge}}" /></div>{{/data.currentImage.srcLarge}}',
    imgWithCarousel: "<div class=\"{{data.classes.product.imgWrapper}}\" data-element=\"product.imageWrapper\">\n                      <div class=\"main-image-wrapper\">\n                        <button type=\"button\" class=\"carousel-button carousel-button--previous\">\n                          Left\n                          <img class=\"carousel-button-arrow\" src=\"//sdks.shopifycdn.com/buy-button/latest/arrow.svg\" alt=\"Carousel Arrow\"/>\n                        </button>\n                        <img class=\"{{data.classes.product.img}}\" alt=\"{{data.currentImage.altText}}\" src=\"{{data.currentImage.src}}\" data-element=\"product.img\" />\n                        <button type=\"button\" class=\"carousel-button carousel-button--next\">\n                          Right\n                          <img class=\"carousel-button-arrow\" src=\"//sdks.shopifycdn.com/buy-button/latest/arrow.svg\" alt=\"Carousel Arrow\"/>\n                        </button>\n                      </div>\n                      <div class=\"{{data.classes.product.carousel}}\">\n                        {{#data.carouselImages}}\n                        <a data-element=\"product.carouselitem\" aria-label=\"{{altText}}\" href=\"{{src}}\" class=\"{{data.classes.product.carouselItem}} {{#isSelected}} {{data.classes.product.carouselItemSelected}} {{/isSelected}}\" data-image-id=\"{{id}}\" style=\"background-image: url({{carouselSrc}})\"></a>\n                        {{/data.carouselImages}}\n                      </div>\n                    </div>",
    title: '<h1 class="{{data.classes.product.title}}" data-element="product.title">{{data.title}}</h1>',
    variantTitle: '{{#data.hasVariants}}<h2 class="{{data.classes.product.variantTitle}}" data-element="product.variantTitle">{{data.selectedVariant.title}}</h2>{{/data.hasVariants}}',
    options: '{{#data.hasVariants}}<div class="{{data.classes.product.options}}" data-element="product.options">{{{data.optionsHtml}}}</div>{{/data.hasVariants}}',
    price: "<div class=\"{{data.classes.product.prices}}\" data-element=\"product.prices\">\n            {{#data.selectedVariant}}\n            <span class=\"visuallyhidden\">{{data.priceAccessibilityLabel}}&nbsp;</span>\n            <span class=\"{{data.classes.product.price}} {{data.priceClass}}\" data-element=\"product.price\">{{data.formattedPrice}}</span>\n            {{#data.hasCompareAtPrice}}\n            <span class=\"visuallyhidden\">{{data.compareAtPriceAccessibilityLabel}}&nbsp;</span>\n            <span class=\"{{data.classes.product.compareAt}}\" data-element=\"product.compareAt\">{{data.formattedCompareAtPrice}}</span>\n            {{/data.hasCompareAtPrice}}\n            {{#data.showUnitPrice}}\n            <div class=\"{{data.classes.product.unitPrice}}\" data-element=\"product.unitPrice\">\n              <span class=\"visuallyhidden\">{{data.text.unitPriceAccessibilityLabel}}</span>\n              {{data.formattedUnitPrice}}<span aria-hidden=\"true\">/</span><span class=\"visuallyhidden\">&nbsp;{{data.text.unitPriceAccessibilitySeparator}}&nbsp;</span>{{data.formattedUnitPriceBaseUnit}}\n            </div>\n            {{/data.showUnitPrice}}\n            {{/data.selectedVariant}}\n          </div>",
    description: '<div class="{{data.classes.product.description}}" data-element="product.description">{{{data.descriptionHtml}}}</div>',
    button: buttonTemplate,
    quantity: quantityTemplate,
    buttonWithQuantity: "<div class=\"{{data.classes.product.buttonWithQuantity}}\" data-element=\"product.buttonWithQuantity\">".concat(quantityTemplate).concat(buttonTemplate, "</div>")
  };

  var cartTemplates = {
    title: "<div class=\"{{data.classes.cart.header}}\" data-element=\"cart.header\">\n            <h2 class=\"{{data.classes.cart.title}}\" data-element=\"cart.title\">{{data.text.title}}</h2>\n            <button class=\"{{data.classes.cart.close}}\" data-element=\"cart.close\">\n              <span aria-hidden=\"true\">&times;</span>\n              <span class=\"visuallyhidden\">{{data.text.closeAccessibilityLabel}}</span>\n             </button>\n          </div>",
    lineItems: "<div class=\"{{data.classes.cart.cartScroll}}{{#data.contents.note}} {{data.classes.cart.cartScrollWithCartNote}}{{/data.contents.note}}{{#data.discounts}} {{data.classes.cart.cartScrollWithDiscounts}}{{/data.discounts}}\" data-element=\"cart.cartScroll\">\n                {{#data.isEmpty}}<p class=\"{{data.classes.cart.empty}} {{data.classes.cart.emptyCart}}\" data-element=\"cart.empty\">{{data.text.empty}}</p>{{/data.isEmpty}}\n                <ul role=\"list\" class=\"{{data.classes.cart.lineItems}}\" data-element=\"cart.lineItems\">{{{data.lineItemsHtml}}}</ul>\n              </div>",
    footer: "{{^data.isEmpty}}\n            <div class=\"{{data.classes.cart.footer}}\" data-element=\"cart.footer\">\n              {{#data.discounts}}\n                <div class=\"{{data.classes.cart.discount}}\" data-element=\"cart.discount\">\n                  <span class=\"{{data.classes.cart.discountText}}\" data-element=\"cart.discountText\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" class=\"{{data.classes.cart.discountIcon}}\" data-element=\"cart.discountIcon\" aria-hidden=\"true\">\n                      <path d=\"M10.001 2.99856C9.80327 2.99856 9.61002 2.93994 9.44565 2.83011C9.28128 2.72029 9.15317 2.56418 9.07752 2.38155C9.00187 2.19891 8.98207 1.99794 9.02064 1.80405C9.05921 1.61016 9.1544 1.43207 9.29419 1.29228C9.43397 1.1525 9.61207 1.0573 9.80596 1.01874C9.99984 0.980171 10.2008 0.999965 10.3834 1.07562C10.5661 1.15127 10.7222 1.27938 10.832 1.44375C10.9418 1.60812 11.0005 1.80136 11.0005 1.99905C11.0005 2.26414 10.8952 2.51837 10.7077 2.70581C10.5203 2.89326 10.266 2.99856 10.001 2.99856ZM10.001 1.67062e-05H7.0024C6.87086 -0.000743818 6.74046 0.024469 6.61868 0.0742095C6.49691 0.12395 6.38614 0.19724 6.29275 0.289876L0.295655 6.28697C0.201972 6.37989 0.127614 6.49044 0.0768697 6.61224C0.0261256 6.73404 0 6.86468 0 6.99663C0 7.12857 0.0261256 7.25922 0.0768697 7.38102C0.127614 7.50282 0.201972 7.61336 0.295655 7.70628L4.29372 11.7043C4.38664 11.798 4.49718 11.8724 4.61898 11.9231C4.74078 11.9739 4.87143 12 5.00337 12C5.13532 12 5.26596 11.9739 5.38776 11.9231C5.50956 11.8724 5.62011 11.798 5.71303 11.7043C5.90294 11.5044 11.5102 5.89716 11.7101 5.70725C11.8028 5.61386 11.876 5.50309 11.9258 5.38132C11.9755 5.25954 12.0007 5.12914 12 4.99759V1.99905C12 1.46887 11.7894 0.96041 11.4145 0.585519C11.0396 0.210628 10.5311 1.67062e-05 10.001 1.67062e-05Z\" />\n                    </svg>\n                    <span class=\"visuallyhidden\">Discount:</span>\n                    {{text}}\n                  </span>\n                  <span class=\"{{data.classes.cart.discountAmount}}\" data-element=\"cart.discountAmount\">{{amount}}</span>\n                </div>\n              {{/data.discounts}}\n              <p class=\"{{data.classes.cart.subtotalText}}\" data-element=\"cart.total\">{{data.text.total}}</p>\n              <p class=\"{{data.classes.cart.subtotal}}\" data-element=\"cart.subtotal\">{{data.formattedTotal}}</p>\n              {{#data.contents.note}}\n                <div class=\"{{data.classes.cart.note}}\" data-element=\"cart.note\">\n                  <label for=\"{{data.cartNoteId}}\" class=\"{{data.classes.cart.noteDescription}}\" data-element=\"cart.noteDescription\">{{data.text.noteDescription}}</label>\n                  <textarea id=\"{{data.cartNoteId}}\" class=\"{{data.classes.cart.noteTextArea}}\" data-element=\"cart.noteTextArea\" rows=\"3\"/>{{data.cartNote}}</textarea>\n                </div>\n              {{/data.contents.note}}\n              <p class=\"{{data.classes.cart.notice}}\" data-element=\"cart.notice\">{{data.text.notice}}</p>\n              <button class=\"{{data.classes.cart.button}}\" type=\"button\" data-element=\"cart.button\">{{data.text.button}}</button>\n            </div>\n           {{/data.isEmpty}}"
  };

  var optionTemplates = {
    option: "<div class=\"{{data.classes.option.option}}\" data-element=\"option.option\">\n    <label for=\"{{data.selectId}}\" class=\"{{data.classes.option.label}} {{#data.onlyOption}}{{data.classes.option.hiddenLabel}}{{/data.onlyOption}}\" data-element=\"option.label\">{{data.name}}</label>\n      <div class=\"{{data.classes.option.wrapper}}\" data-element=\"option.wrapper\">\n      <select id=\"{{data.selectId}}\" class=\"{{data.classes.option.select}}\" name=\"{{data.name}}\" data-element=\"option.select\">\n        {{#data.values}}\n          <option {{#selected}}selected{{/selected}} value=\"{{name}}\">{{name}}</option>\n        {{/data.values}}\n      </select>\n      <svg class=\"{{data.classes.option.selectIcon}}\" data-element=\"option.selectIcon\" viewBox=\"0 0 24 24\"><path d=\"M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z\"></path></svg>\n    </div>\n  </div>"
  };

  var toggleTemplates = {
    title: '<h5 class="{{data.classes.toggle.title}}" data-element="toggle.title">{{data.text.title}}</h5>',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="{{data.classes.toggle.icon}}" data-element="toggle.icon" viewBox="0 0 25 25" enable-background="new 0 0 25 25"><g class="{{data.classes.toggle.iconPath}}"><path d="M24.6 3.6c-.3-.4-.8-.6-1.3-.6h-18.4l-.1-.5c-.3-1.5-1.7-1.5-2.5-1.5h-1.3c-.6 0-1 .4-1 1s.4 1 1 1h1.8l3 13.6c.2 1.2 1.3 2.4 2.5 2.4h12.7c.6 0 1-.4 1-1s-.4-1-1-1h-12.7c-.2 0-.5-.4-.6-.8l-.2-1.2h12.6c1.3 0 2.3-1.4 2.5-2.4l2.4-7.4v-.2c.1-.5-.1-1-.4-1.4zm-4 8.5v.2c-.1.3-.4.8-.5.8h-13l-1.8-8.1h17.6l-2.3 7.1z"/><circle cx="9" cy="22" r="2"/><circle cx="19" cy="22" r="2"/></g></svg>',
    count: '<div class="{{data.classes.toggle.count}}" data-element="toggle.count">{{data.count}}</div>'
  };

  var lineItemTemplates = {
    image: '<div class="{{data.classes.lineItem.image}}" style="background-image: url({{data.lineItemImage}})" data-element="lineItem.image"></div>',
    variantTitle: '<div class="{{data.classes.lineItem.variantTitle}}" data-element="lineItem.variantTitle">{{data.variantTitle}}</div>',
    title: '<span class="{{data.classes.lineItem.itemTitle}}" data-element="lineItem.itemTitle">{{data.title}}</span>',
    price: '<span class="{{data.classes.lineItem.price}}" data-element="lineItem.price">{{data.formattedPrice}}</span>',
    priceWithDiscounts: "<div class=\"{{data.classes.lineItem.priceWithDiscounts}}\" data-element=\"lineItem.price\">\n                        {{#data.formattedFullPrice}}\n                          <span class=\"visuallyhidden\">Regular price</span>\n                          <del class=\"{{data.classes.lineItem.fullPrice}}\" data-element=\"lineItem.fullPrice\">{{data.formattedFullPrice}}</del>\n                          <span class=\"visuallyhidden\">Sale price</span>\n                        {{/data.formattedFullPrice}}\n                        <div class=\"{{data.classes.lineItem.price}}\" data-element=\"lineItem.price\">{{data.formattedActualPrice}}</div>\n                        {{#data.discounts}}\n                          <div class=\"{{data.classes.lineItem.discount}}\" data-element=\"lineItem.discount\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" class=\"{{data.classes.lineItem.discountIcon}}\" data-element=\"lineItem.discountIcon\" aria-hidden=\"true\">\n                              <path d=\"M10.001 2.99856C9.80327 2.99856 9.61002 2.93994 9.44565 2.83011C9.28128 2.72029 9.15317 2.56418 9.07752 2.38155C9.00187 2.19891 8.98207 1.99794 9.02064 1.80405C9.05921 1.61016 9.1544 1.43207 9.29419 1.29228C9.43397 1.1525 9.61207 1.0573 9.80596 1.01874C9.99984 0.980171 10.2008 0.999965 10.3834 1.07562C10.5661 1.15127 10.7222 1.27938 10.832 1.44375C10.9418 1.60812 11.0005 1.80136 11.0005 1.99905C11.0005 2.26414 10.8952 2.51837 10.7077 2.70581C10.5203 2.89326 10.266 2.99856 10.001 2.99856ZM10.001 1.67062e-05H7.0024C6.87086 -0.000743818 6.74046 0.024469 6.61868 0.0742095C6.49691 0.12395 6.38614 0.19724 6.29275 0.289876L0.295655 6.28697C0.201972 6.37989 0.127614 6.49044 0.0768697 6.61224C0.0261256 6.73404 0 6.86468 0 6.99663C0 7.12857 0.0261256 7.25922 0.0768697 7.38102C0.127614 7.50282 0.201972 7.61336 0.295655 7.70628L4.29372 11.7043C4.38664 11.798 4.49718 11.8724 4.61898 11.9231C4.74078 11.9739 4.87143 12 5.00337 12C5.13532 12 5.26596 11.9739 5.38776 11.9231C5.50956 11.8724 5.62011 11.798 5.71303 11.7043C5.90294 11.5044 11.5102 5.89716 11.7101 5.70725C11.8028 5.61386 11.876 5.50309 11.9258 5.38132C11.9755 5.25954 12.0007 5.12914 12 4.99759V1.99905C12 1.46887 11.7894 0.96041 11.4145 0.585519C11.0396 0.210628 10.5311 1.67062e-05 10.001 1.67062e-05Z\" />\n                            </svg>\n                            <span class=\"visuallyhidden\">Discount:</span>\n                            {{discount}}\n                          </div>\n                        {{/data.discounts}}\n                      </div>",
    quantity: "<div class=\"{{data.classes.lineItem.quantity}}\" data-element=\"lineItem.quantity\">\n              <button class=\"{{data.classes.lineItem.quantityButton}} {{data.classes.lineItem.quantityDecrement}}\" type=\"button\" data-line-item-id=\"{{data.id}}\" data-element=\"lineItem.quantityDecrement\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path d=\"M4 7h8v2H4z\"/></svg><span class=\"visuallyhidden\">{{data.text.quantityDecrementAccessibilityLabel}}</span>\n              </button>\n              <input class=\"{{data.classes.lineItem.quantityInput}}\" type=\"number\" min=\"0\" aria-label=\"{{data.text.quantityInputAccessibilityLabel}}\" data-line-item-id=\"{{data.id}}\" value=\"{{data.quantity}}\" data-element=\"lineItem.quantityInput\">\n              <button class=\"{{data.classes.lineItem.quantityButton}} {{data.classes.lineItem.quantityIncrement}}\" type=\"button\" data-line-item-id=\"{{data.id}}\" data-element=\"lineItem.quantityIncrement\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path d=\"M12 7H9V4H7v3H4v2h3v3h2V9h3z\"/></svg><span class=\"visuallyhidden\">{{data.text.quantityIncrementAccessibilityLabel}}</span>\n              </button>\n            </div>"
  };

  var modalTemplates = {
    contents: "\n              <button class=\"{{data.classes.modal.close}}\" data-element=\"modal.close\">\n                <span aria-role=\"hidden\">&times;</span>\n                <span class=\"visuallyhidden\">Close</span>\n              </button>\n            "
  };

  var defaults = {
    product: {
      iframe: true,
      buttonDestination: 'cart',
      isButton: false,
      layout: 'vertical',
      manifest: ['product', 'option'],
      width: '280px',
      order: ['img', 'imgWithCarousel', 'title', 'variantTitle', 'price', 'options', 'quantity', 'button', 'buttonWithQuantity', 'description'],
      contents: {
        img: true,
        imgWithCarousel: false,
        title: true,
        variantTitle: false,
        price: true,
        unitPrice: true,
        options: true,
        quantity: false,
        quantityIncrement: false,
        quantityDecrement: false,
        quantityInput: true,
        button: true,
        buttonWithQuantity: false,
        description: false
      },
      templates: productTemplate,
      classes: {
        wrapper: 'shopify-buy__product-wrapper',
        product: 'shopify-buy__product',
        img: 'shopify-buy__product__variant-img',
        imgWrapper: 'shopify-buy__product-img-wrapper',
        carousel: 'shopify-buy__carousel',
        carouselNext: 'carousel-button--next',
        carouselPrevious: 'carousel-button--previous',
        carouselItem: 'shopify-buy__carousel-item',
        carouselItemSelected: 'shopify-buy__carousel-item--selected',
        blockButton: 'shopify-buy__btn--parent',
        button: 'shopify-buy__btn',
        buttonWrapper: 'shopify-buy__btn-wrapper',
        title: 'shopify-buy__product__title',
        prices: 'shopify-buy__product__price',
        price: 'shopify-buy__product__actual-price',
        compareAt: 'shopify-buy__product__compare-price',
        unitPrice: 'shopify-buy__product__unit-price',
        loweredPrice: 'shopify-buy__price--lowered',
        variantTitle: 'shopify-buy__product__variant-title',
        description: 'shopify-buy__product-description',
        options: 'shopify-buy__product__variant-selectors',
        disabled: 'shopify-buy__btn-disabled',
        buttonBesideQty: 'shopify-buy__beside-quantity',
        quantity: 'shopify-buy__quantity-container',
        quantityInput: 'shopify-buy__quantity',
        quantityButton: 'shopify-buy__btn--seamless',
        quantityIncrement: 'shopify-buy__quantity-increment',
        quantityDecrement: 'shopify-buy__quantity-decrement',
        buttonWithQuantity: 'shopify-buy__btn-and-quantity',
        quantityWithButtons: 'shopify-buy__quantity-with-btns',
        vertical: 'shopify-buy__layout-vertical',
        horizontal: 'shopify-buy__layout-horizontal'
      },
      text: {
        button: 'ADD TO CART',
        outOfStock: 'Out of stock',
        unavailable: 'Unavailable',
        unitPriceAccessibilityLabel: 'Unit price',
        unitPriceAccessibilitySeparator: 'per',
        regularPriceAccessibilityLabel: 'Regular price',
        salePriceAccessibilityLabel: 'Sale price'
      }
    },
    modalProduct: {
      iframe: false,
      layout: 'horizontal',
      contents: {
        img: true,
        imgWithCarousel: false,
        title: true,
        variantTitle: false,
        price: true,
        unitPrice: true,
        options: true,
        button: true,
        buttonWithQuantity: false,
        quantity: false,
        quantityIncrement: false,
        quantityDecrement: false,
        description: true
      },
      order: ['img', 'imgWithCarousel', 'title', 'variantTitle', 'price', 'options', 'buttonWithQuantity', 'button', 'description'],
      classes: {
        wrapper: 'shopify-buy__modal-product-wrapper',
        hasImage: 'has-image'
      },
      buttonDestination: 'cart',
      text: {
        button: 'ADD TO CART'
      }
    },
    modal: {
      iframe: true,
      manifest: ['modal', 'product', 'option'],
      classes: {
        overlay: 'shopify-buy__modal-overlay',
        modal: 'shopify-buy__modal',
        contents: 'shopify-buy__modal-contents',
        close: 'shopify-buy__btn--close',
        wrapper: 'shopify-buy__modal-wrapper',
        product: 'shopify-buy__product-modal',
        img: 'shopify-buy__modal-img',
        imgWithCarousel: 'shopify-buy__modal-img',
        footer: 'shopify-buy__modal-footer',
        footerWithImg: 'shopify-buy__modal-footer--has-img',
        imgWithImg: 'shopify-buy__modal-img--has-img',
        contentsWithImg: 'shopify-buy__modal-contents--has-img',
        scrollContents: 'shopify-buy__modal-scroll-contents'
      },
      contents: {
        contents: true
      },
      order: ['contents'],
      templates: modalTemplates
    },
    productSet: {
      iframe: true,
      manifest: ['product', 'option', 'productSet'],
      contents: {
        title: false,
        products: true,
        pagination: true
      },
      order: ['title', 'products', 'pagination'],
      templates: {
        title: '<h2 class="{{data.classes.productSet.title}}">{{data.collection.attrs.title}}</h2>',
        products: '<div class="{{data.classes.productSet.products}}"></div>',
        pagination: '<button class="{{data.classes.productSet.paginationButton}} {{data.nextButtonClass}}">{{data.text.nextPageButton}}</button>'
      },
      classes: {
        wrapper: 'shopify-buy__collection-wrapper',
        productSet: 'shopify-buy__collection',
        title: 'shopify-buy__collection__title',
        collection: 'shopify-buy__collection',
        products: 'shopify-buy__collection-products',
        product: 'shopify-buy__collection-product',
        paginationButton: 'shopify-buy__collection-pagination-button shopify-buy__btn'
      },
      text: {
        nextPageButton: 'Next page'
      }
    },
    option: {
      templates: optionTemplates,
      contents: {
        option: true
      },
      order: ['option'],
      classes: {
        option: 'shopify-buy__option-select',
        wrapper: 'shopify-buy__option-select-wrapper',
        select: 'shopify-buy__option-select__select',
        label: 'shopify-buy__option-select__label',
        optionDisabled: 'shopify-buy__option--disabled',
        optionSelected: 'shopify-buy__option--selected',
        selectIcon: 'shopify-buy__select-icon',
        hiddenLabel: 'visuallyhidden'
      }
    },
    cart: {
      iframe: true,
      templates: cartTemplates,
      startOpen: false,
      popup: true,
      manifest: ['cart', 'lineItem', 'toggle'],
      contents: {
        title: true,
        lineItems: true,
        footer: true,
        note: false,
        discounts: true
      },
      order: ['title', 'lineItems', 'footer'],
      classes: {
        wrapper: 'shopify-buy__cart-wrapper',
        cart: 'shopify-buy__cart',
        header: 'shopify-buy__cart__header',
        title: 'shopify-buy__cart__title',
        lineItems: 'shopify-buy__cart-items',
        footer: 'shopify-buy__cart-bottom',
        discount: 'shopify-buy__cart__discount',
        discountText: 'shopify-buy__cart__discount__text',
        discountIcon: 'shopify-buy__cart__discount__text__icon',
        discountAmount: 'shopify-buy__cart__discount__amount',
        subtotalText: 'shopify-buy__cart__subtotal__text',
        subtotal: 'shopify-buy__cart__subtotal__price',
        notice: 'shopify-buy__cart__notice',
        currency: 'shopify-buy__cart__currency',
        button: 'shopify-buy__btn shopify-buy__btn--cart-checkout',
        close: 'shopify-buy__btn--close',
        cartScroll: 'shopify-buy__cart-scroll',
        cartScrollWithDiscounts: 'shopify-buy__cart-scroll--discounts',
        cartScrollWithCartNote: 'shopify-buy__cart-scroll--cart-note',
        empty: 'shopify-buy__cart-empty-text',
        note: 'shopify-buy__cart__note',
        noteDescription: 'shopify-buy__cart__note__description',
        noteTextArea: 'shopify-buy__cart__note__text-area'
      },
      text: {
        title: 'Cart',
        empty: 'Your cart is empty.',
        button: 'CHECKOUT',
        total: 'SUBTOTAL',
        currency: 'CAD',
        notice: 'Shipping and discount codes are added at checkout.',
        noteDescription: 'Special instructions for seller',
        closeAccessibilityLabel: 'Close cart'
      }
    },
    lineItem: {
      templates: lineItemTemplates,
      contents: {
        image: true,
        variantTitle: true,
        title: true,
        price: false,
        priceWithDiscounts: true,
        quantity: true,
        quantityIncrement: true,
        quantityDecrement: true,
        quantityInput: true
      },
      order: ['image', 'title', 'variantTitle', 'price', 'priceWithDiscounts', 'quantity'],
      classes: {
        lineItem: 'shopify-buy__cart-item',
        image: 'shopify-buy__cart-item__image',
        variantTitle: 'shopify-buy__cart-item__variant-title',
        itemTitle: 'shopify-buy__cart-item__title',
        price: 'shopify-buy__cart-item__price',
        priceWithDiscounts: 'shopify-buy__cart-item__price-and-discounts',
        fullPrice: 'shopify-buy__cart-item__full-price',
        discount: 'shopify-buy__cart-item__discount',
        discountIcon: 'shopify-buy__cart-item__discount__icon',
        quantity: 'shopify-buy__quantity-container clearfix',
        quantityInput: 'shopify-buy__quantity shopify-buy__cart-item__quantity-input',
        quantityButton: 'shopify-buy__btn--seamless',
        quantityIncrement: 'shopify-buy__quantity-increment',
        quantityDecrement: 'shopify-buy__quantity-decrement'
      },
      text: {
        quantityInputAccessibilityLabel: 'Quantity',
        quantityDecrementAccessibilityLabel: 'Reduce item quantity by one',
        quantityIncrementAccessibilityLabel: 'Increase item quantity by one'
      }
    },
    toggle: {
      templates: toggleTemplates,
      manifest: ['toggle'],
      iframe: true,
      sticky: true,
      contents: {
        count: true,
        icon: true,
        title: false
      },
      order: ['count', 'icon', 'title'],
      classes: {
        wrapper: 'shopify-buy__cart-toggle-wrapper',
        toggle: 'shopify-buy__cart-toggle',
        title: 'shopify-buy__cart-toggle__title',
        count: 'shopify-buy__cart-toggle__count',
        icon: 'shopify-buy__icon-cart shopify-buy__icon-cart--side',
        iconPath: 'shopify-buy__icon-cart__group'
      },
      text: {
        title: 'cart'
      }
    },
    window: {
      height: 600,
      width: 400,
      toolbar: 0,
      scrollbars: 1,
      status: 0,
      resizable: 1,
      center: 0,
      createnew: 1,
      location: 0,
      menubar: 0,
      onUnload: null,
      titlebar: 'yes'
    }
  };

  function wrapConsole(logCommand) {
    var logMethod = function logMethod() {
      var hostConsole = window.console;
      var args = Array.prototype.slice.apply(arguments).join(' ');
      /* eslint-disable no-console */

      if (hostConsole) {
        hostConsole[logCommand](args);
      }
      /* eslint-enable no-console */

    };

    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[SHOPIFY-BUY-UI]: ');
      logMethod.apply(void 0, _toConsumableArray(args));
    };
  }

  var logger = {
    debug: wrapConsole('debug'),
    info: wrapConsole('info'),
    warn: wrapConsole('warn'),
    error: wrapConsole('error'),
    log: wrapConsole('log')
  };

  function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }

  function logNotFound(component) {
    var errInfo = '';

    if (component.id) {
      if (isArray(component.id)) {
        errInfo = "for ids ".concat(component.id.join(', '), ".");
      } else {
        errInfo = "for id ".concat(component.id, ".");
      }
    } else if (component.handle) {
      errInfo = "for handle \"".concat(component.handle, "\".");
    }

    var message = "Not Found: ".concat(component.typeKey, " not found ").concat(errInfo);
    logger.warn(message);
  }

  var defaultMoneyFormat = '${{amount}}';

  var DOCUMENT_FRAGMENT_NODE = 11;

  function morphAttrs(fromNode, toNode) {
      var toNodeAttrs = toNode.attributes;
      var attr;
      var attrName;
      var attrNamespaceURI;
      var attrValue;
      var fromValue;

      // document-fragments dont have attributes so lets not do anything
      if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
        return;
      }

      // update attributes on original DOM element
      for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
          attr = toNodeAttrs[i];
          attrName = attr.name;
          attrNamespaceURI = attr.namespaceURI;
          attrValue = attr.value;

          if (attrNamespaceURI) {
              attrName = attr.localName || attrName;
              fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

              if (fromValue !== attrValue) {
                  if (attr.prefix === 'xmlns'){
                      attrName = attr.name; // It's not allowed to set an attribute with the XMLNS namespace without specifying the `xmlns` prefix
                  }
                  fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
              }
          } else {
              fromValue = fromNode.getAttribute(attrName);

              if (fromValue !== attrValue) {
                  fromNode.setAttribute(attrName, attrValue);
              }
          }
      }

      // Remove any extra attributes found on the original DOM element that
      // weren't found on the target element.
      var fromNodeAttrs = fromNode.attributes;

      for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
          attr = fromNodeAttrs[d];
          attrName = attr.name;
          attrNamespaceURI = attr.namespaceURI;

          if (attrNamespaceURI) {
              attrName = attr.localName || attrName;

              if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
                  fromNode.removeAttributeNS(attrNamespaceURI, attrName);
              }
          } else {
              if (!toNode.hasAttribute(attrName)) {
                  fromNode.removeAttribute(attrName);
              }
          }
      }
  }

  var range; // Create a range object for efficently rendering strings to elements.
  var NS_XHTML = 'http://www.w3.org/1999/xhtml';

  var doc = typeof document === 'undefined' ? undefined : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && 'content' in doc.createElement('template');
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && 'createContextualFragment' in doc.createRange();

  function createFragmentFromTemplate(str) {
      var template = doc.createElement('template');
      template.innerHTML = str;
      return template.content.childNodes[0];
  }

  function createFragmentFromRange(str) {
      if (!range) {
          range = doc.createRange();
          range.selectNode(doc.body);
      }

      var fragment = range.createContextualFragment(str);
      return fragment.childNodes[0];
  }

  function createFragmentFromWrap(str) {
      var fragment = doc.createElement('body');
      fragment.innerHTML = str;
      return fragment.childNodes[0];
  }

  /**
   * This is about the same
   * var html = new DOMParser().parseFromString(str, 'text/html');
   * return html.body.firstChild;
   *
   * @method toElement
   * @param {String} str
   */
  function toElement(str) {
      str = str.trim();
      if (HAS_TEMPLATE_SUPPORT) {
        // avoid restrictions on content for things like `<tr><th>Hi</th></tr>` which
        // createContextualFragment doesn't support
        // <template> support not available in IE
        return createFragmentFromTemplate(str);
      } else if (HAS_RANGE_SUPPORT) {
        return createFragmentFromRange(str);
      }

      return createFragmentFromWrap(str);
  }

  /**
   * Returns true if two node's names are the same.
   *
   * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
   *       nodeName and different namespace URIs.
   *
   * @param {Element} a
   * @param {Element} b The target element
   * @return {boolean}
   */
  function compareNodeNames(fromEl, toEl) {
      var fromNodeName = fromEl.nodeName;
      var toNodeName = toEl.nodeName;
      var fromCodeStart, toCodeStart;

      if (fromNodeName === toNodeName) {
          return true;
      }

      fromCodeStart = fromNodeName.charCodeAt(0);
      toCodeStart = toNodeName.charCodeAt(0);

      // If the target element is a virtual DOM node or SVG node then we may
      // need to normalize the tag name before comparing. Normal HTML elements that are
      // in the "http://www.w3.org/1999/xhtml"
      // are converted to upper case
      if (fromCodeStart <= 90 && toCodeStart >= 97) { // from is upper and to is lower
          return fromNodeName === toNodeName.toUpperCase();
      } else if (toCodeStart <= 90 && fromCodeStart >= 97) { // to is upper and from is lower
          return toNodeName === fromNodeName.toUpperCase();
      } else {
          return false;
      }
  }

  /**
   * Create an element, optionally with a known namespace URI.
   *
   * @param {string} name the element name, e.g. 'div' or 'svg'
   * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
   * its `xmlns` attribute or its inferred namespace.
   *
   * @return {Element}
   */
  function createElementNS(name, namespaceURI) {
      return !namespaceURI || namespaceURI === NS_XHTML ?
          doc.createElement(name) :
          doc.createElementNS(namespaceURI, name);
  }

  /**
   * Copies the children of one DOM element to another DOM element
   */
  function moveChildren(fromEl, toEl) {
      var curChild = fromEl.firstChild;
      while (curChild) {
          var nextChild = curChild.nextSibling;
          toEl.appendChild(curChild);
          curChild = nextChild;
      }
      return toEl;
  }

  function syncBooleanAttrProp(fromEl, toEl, name) {
      if (fromEl[name] !== toEl[name]) {
          fromEl[name] = toEl[name];
          if (fromEl[name]) {
              fromEl.setAttribute(name, '');
          } else {
              fromEl.removeAttribute(name);
          }
      }
  }

  var specialElHandlers = {
      OPTION: function(fromEl, toEl) {
          var parentNode = fromEl.parentNode;
          if (parentNode) {
              var parentName = parentNode.nodeName.toUpperCase();
              if (parentName === 'OPTGROUP') {
                  parentNode = parentNode.parentNode;
                  parentName = parentNode && parentNode.nodeName.toUpperCase();
              }
              if (parentName === 'SELECT' && !parentNode.hasAttribute('multiple')) {
                  if (fromEl.hasAttribute('selected') && !toEl.selected) {
                      // Workaround for MS Edge bug where the 'selected' attribute can only be
                      // removed if set to a non-empty value:
                      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12087679/
                      fromEl.setAttribute('selected', 'selected');
                      fromEl.removeAttribute('selected');
                  }
                  // We have to reset select element's selectedIndex to -1, otherwise setting
                  // fromEl.selected using the syncBooleanAttrProp below has no effect.
                  // The correct selectedIndex will be set in the SELECT special handler below.
                  parentNode.selectedIndex = -1;
              }
          }
          syncBooleanAttrProp(fromEl, toEl, 'selected');
      },
      /**
       * The "value" attribute is special for the <input> element since it sets
       * the initial value. Changing the "value" attribute without changing the
       * "value" property will have no effect since it is only used to the set the
       * initial value.  Similar for the "checked" attribute, and "disabled".
       */
      INPUT: function(fromEl, toEl) {
          syncBooleanAttrProp(fromEl, toEl, 'checked');
          syncBooleanAttrProp(fromEl, toEl, 'disabled');

          if (fromEl.value !== toEl.value) {
              fromEl.value = toEl.value;
          }

          if (!toEl.hasAttribute('value')) {
              fromEl.removeAttribute('value');
          }
      },

      TEXTAREA: function(fromEl, toEl) {
          var newValue = toEl.value;
          if (fromEl.value !== newValue) {
              fromEl.value = newValue;
          }

          var firstChild = fromEl.firstChild;
          if (firstChild) {
              // Needed for IE. Apparently IE sets the placeholder as the
              // node value and vise versa. This ignores an empty update.
              var oldValue = firstChild.nodeValue;

              if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                  return;
              }

              firstChild.nodeValue = newValue;
          }
      },
      SELECT: function(fromEl, toEl) {
          if (!toEl.hasAttribute('multiple')) {
              var selectedIndex = -1;
              var i = 0;
              // We have to loop through children of fromEl, not toEl since nodes can be moved
              // from toEl to fromEl directly when morphing.
              // At the time this special handler is invoked, all children have already been morphed
              // and appended to / removed from fromEl, so using fromEl here is safe and correct.
              var curChild = fromEl.firstChild;
              var optgroup;
              var nodeName;
              while(curChild) {
                  nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
                  if (nodeName === 'OPTGROUP') {
                      optgroup = curChild;
                      curChild = optgroup.firstChild;
                  } else {
                      if (nodeName === 'OPTION') {
                          if (curChild.hasAttribute('selected')) {
                              selectedIndex = i;
                              break;
                          }
                          i++;
                      }
                      curChild = curChild.nextSibling;
                      if (!curChild && optgroup) {
                          curChild = optgroup.nextSibling;
                          optgroup = null;
                      }
                  }
              }

              fromEl.selectedIndex = selectedIndex;
          }
      }
  };

  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;

  function noop$1() {}

  function defaultGetNodeKey(node) {
    if (node) {
        return (node.getAttribute && node.getAttribute('id')) || node.id;
    }
  }

  function morphdomFactory(morphAttrs) {

      return function morphdom(fromNode, toNode, options) {
          if (!options) {
              options = {};
          }

          if (typeof toNode === 'string') {
              if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML' || fromNode.nodeName === 'BODY') {
                  var toNodeHtml = toNode;
                  toNode = doc.createElement('html');
                  toNode.innerHTML = toNodeHtml;
              } else {
                  toNode = toElement(toNode);
              }
          }

          var getNodeKey = options.getNodeKey || defaultGetNodeKey;
          var onBeforeNodeAdded = options.onBeforeNodeAdded || noop$1;
          var onNodeAdded = options.onNodeAdded || noop$1;
          var onBeforeElUpdated = options.onBeforeElUpdated || noop$1;
          var onElUpdated = options.onElUpdated || noop$1;
          var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop$1;
          var onNodeDiscarded = options.onNodeDiscarded || noop$1;
          var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop$1;
          var childrenOnly = options.childrenOnly === true;

          // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
          var fromNodesLookup = Object.create(null);
          var keyedRemovalList = [];

          function addKeyedRemoval(key) {
              keyedRemovalList.push(key);
          }

          function walkDiscardedChildNodes(node, skipKeyedNodes) {
              if (node.nodeType === ELEMENT_NODE) {
                  var curChild = node.firstChild;
                  while (curChild) {

                      var key = undefined;

                      if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                          // If we are skipping keyed nodes then we add the key
                          // to a list so that it can be handled at the very end.
                          addKeyedRemoval(key);
                      } else {
                          // Only report the node as discarded if it is not keyed. We do this because
                          // at the end we loop through all keyed elements that were unmatched
                          // and then discard them in one final pass.
                          onNodeDiscarded(curChild);
                          if (curChild.firstChild) {
                              walkDiscardedChildNodes(curChild, skipKeyedNodes);
                          }
                      }

                      curChild = curChild.nextSibling;
                  }
              }
          }

          /**
           * Removes a DOM node out of the original DOM
           *
           * @param  {Node} node The node to remove
           * @param  {Node} parentNode The nodes parent
           * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
           * @return {undefined}
           */
          function removeNode(node, parentNode, skipKeyedNodes) {
              if (onBeforeNodeDiscarded(node) === false) {
                  return;
              }

              if (parentNode) {
                  parentNode.removeChild(node);
              }

              onNodeDiscarded(node);
              walkDiscardedChildNodes(node, skipKeyedNodes);
          }

          // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
          // function indexTree(root) {
          //     var treeWalker = document.createTreeWalker(
          //         root,
          //         NodeFilter.SHOW_ELEMENT);
          //
          //     var el;
          //     while((el = treeWalker.nextNode())) {
          //         var key = getNodeKey(el);
          //         if (key) {
          //             fromNodesLookup[key] = el;
          //         }
          //     }
          // }

          // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
          //
          // function indexTree(node) {
          //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
          //     var el;
          //     while((el = nodeIterator.nextNode())) {
          //         var key = getNodeKey(el);
          //         if (key) {
          //             fromNodesLookup[key] = el;
          //         }
          //     }
          // }

          function indexTree(node) {
              if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
                  var curChild = node.firstChild;
                  while (curChild) {
                      var key = getNodeKey(curChild);
                      if (key) {
                          fromNodesLookup[key] = curChild;
                      }

                      // Walk recursively
                      indexTree(curChild);

                      curChild = curChild.nextSibling;
                  }
              }
          }

          indexTree(fromNode);

          function handleNodeAdded(el) {
              onNodeAdded(el);

              var curChild = el.firstChild;
              while (curChild) {
                  var nextSibling = curChild.nextSibling;

                  var key = getNodeKey(curChild);
                  if (key) {
                      var unmatchedFromEl = fromNodesLookup[key];
                      // if we find a duplicate #id node in cache, replace `el` with cache value
                      // and morph it to the child node.
                      if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                          curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                          morphEl(unmatchedFromEl, curChild);
                      } else {
                        handleNodeAdded(curChild);
                      }
                  } else {
                    // recursively call for curChild and it's children to see if we find something in
                    // fromNodesLookup
                    handleNodeAdded(curChild);
                  }

                  curChild = nextSibling;
              }
          }

          function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
              // We have processed all of the "to nodes". If curFromNodeChild is
              // non-null then we still have some from nodes left over that need
              // to be removed
              while (curFromNodeChild) {
                  var fromNextSibling = curFromNodeChild.nextSibling;
                  if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                      // Since the node is keyed it might be matched up later so we defer
                      // the actual removal to later
                      addKeyedRemoval(curFromNodeKey);
                  } else {
                      // NOTE: we skip nested keyed nodes from being removed since there is
                      //       still a chance they will be matched up later
                      removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                  }
                  curFromNodeChild = fromNextSibling;
              }
          }

          function morphEl(fromEl, toEl, childrenOnly) {
              var toElKey = getNodeKey(toEl);

              if (toElKey) {
                  // If an element with an ID is being morphed then it will be in the final
                  // DOM so clear it out of the saved elements collection
                  delete fromNodesLookup[toElKey];
              }

              if (!childrenOnly) {
                  // optional
                  if (onBeforeElUpdated(fromEl, toEl) === false) {
                      return;
                  }

                  // update attributes on original DOM element first
                  morphAttrs(fromEl, toEl);
                  // optional
                  onElUpdated(fromEl);

                  if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                      return;
                  }
              }

              if (fromEl.nodeName !== 'TEXTAREA') {
                morphChildren(fromEl, toEl);
              } else {
                specialElHandlers.TEXTAREA(fromEl, toEl);
              }
          }

          function morphChildren(fromEl, toEl) {
              var curToNodeChild = toEl.firstChild;
              var curFromNodeChild = fromEl.firstChild;
              var curToNodeKey;
              var curFromNodeKey;

              var fromNextSibling;
              var toNextSibling;
              var matchingFromEl;

              // walk the children
              outer: while (curToNodeChild) {
                  toNextSibling = curToNodeChild.nextSibling;
                  curToNodeKey = getNodeKey(curToNodeChild);

                  // walk the fromNode children all the way through
                  while (curFromNodeChild) {
                      fromNextSibling = curFromNodeChild.nextSibling;

                      if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                          curToNodeChild = toNextSibling;
                          curFromNodeChild = fromNextSibling;
                          continue outer;
                      }

                      curFromNodeKey = getNodeKey(curFromNodeChild);

                      var curFromNodeType = curFromNodeChild.nodeType;

                      // this means if the curFromNodeChild doesnt have a match with the curToNodeChild
                      var isCompatible = undefined;

                      if (curFromNodeType === curToNodeChild.nodeType) {
                          if (curFromNodeType === ELEMENT_NODE) {
                              // Both nodes being compared are Element nodes

                              if (curToNodeKey) {
                                  // The target node has a key so we want to match it up with the correct element
                                  // in the original DOM tree
                                  if (curToNodeKey !== curFromNodeKey) {
                                      // The current element in the original DOM tree does not have a matching key so
                                      // let's check our lookup to see if there is a matching element in the original
                                      // DOM tree
                                      if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                          if (fromNextSibling === matchingFromEl) {
                                              // Special case for single element removals. To avoid removing the original
                                              // DOM node out of the tree (since that can break CSS transitions, etc.),
                                              // we will instead discard the current node and wait until the next
                                              // iteration to properly match up the keyed target element with its matching
                                              // element in the original tree
                                              isCompatible = false;
                                          } else {
                                              // We found a matching keyed element somewhere in the original DOM tree.
                                              // Let's move the original DOM node into the current position and morph
                                              // it.

                                              // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                              // the `removeNode()` function for the node that is being discarded so that
                                              // all lifecycle hooks are correctly invoked
                                              fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                              // fromNextSibling = curFromNodeChild.nextSibling;

                                              if (curFromNodeKey) {
                                                  // Since the node is keyed it might be matched up later so we defer
                                                  // the actual removal to later
                                                  addKeyedRemoval(curFromNodeKey);
                                              } else {
                                                  // NOTE: we skip nested keyed nodes from being removed since there is
                                                  //       still a chance they will be matched up later
                                                  removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                              }

                                              curFromNodeChild = matchingFromEl;
                                          }
                                      } else {
                                          // The nodes are not compatible since the "to" node has a key and there
                                          // is no matching keyed node in the source tree
                                          isCompatible = false;
                                      }
                                  }
                              } else if (curFromNodeKey) {
                                  // The original has a key
                                  isCompatible = false;
                              }

                              isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                              if (isCompatible) {
                                  // We found compatible DOM elements so transform
                                  // the current "from" node to match the current
                                  // target DOM node.
                                  // MORPH
                                  morphEl(curFromNodeChild, curToNodeChild);
                              }

                          } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                              // Both nodes being compared are Text or Comment nodes
                              isCompatible = true;
                              // Simply update nodeValue on the original node to
                              // change the text value
                              if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                  curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                              }

                          }
                      }

                      if (isCompatible) {
                          // Advance both the "to" child and the "from" child since we found a match
                          // Nothing else to do as we already recursively called morphChildren above
                          curToNodeChild = toNextSibling;
                          curFromNodeChild = fromNextSibling;
                          continue outer;
                      }

                      // No compatible match so remove the old node from the DOM and continue trying to find a
                      // match in the original DOM. However, we only do this if the from node is not keyed
                      // since it is possible that a keyed node might match up with a node somewhere else in the
                      // target tree and we don't want to discard it just yet since it still might find a
                      // home in the final DOM tree. After everything is done we will remove any keyed nodes
                      // that didn't find a home
                      if (curFromNodeKey) {
                          // Since the node is keyed it might be matched up later so we defer
                          // the actual removal to later
                          addKeyedRemoval(curFromNodeKey);
                      } else {
                          // NOTE: we skip nested keyed nodes from being removed since there is
                          //       still a chance they will be matched up later
                          removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                      }

                      curFromNodeChild = fromNextSibling;
                  } // END: while(curFromNodeChild) {}

                  // If we got this far then we did not find a candidate match for
                  // our "to node" and we exhausted all of the children "from"
                  // nodes. Therefore, we will just append the current "to" node
                  // to the end
                  if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                      fromEl.appendChild(matchingFromEl);
                      // MORPH
                      morphEl(matchingFromEl, curToNodeChild);
                  } else {
                      var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                      if (onBeforeNodeAddedResult !== false) {
                          if (onBeforeNodeAddedResult) {
                              curToNodeChild = onBeforeNodeAddedResult;
                          }

                          if (curToNodeChild.actualize) {
                              curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                          }
                          fromEl.appendChild(curToNodeChild);
                          handleNodeAdded(curToNodeChild);
                      }
                  }

                  curToNodeChild = toNextSibling;
                  curFromNodeChild = fromNextSibling;
              }

              cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);

              var specialElHandler = specialElHandlers[fromEl.nodeName];
              if (specialElHandler) {
                  specialElHandler(fromEl, toEl);
              }
          } // END: morphChildren(...)

          var morphedNode = fromNode;
          var morphedNodeType = morphedNode.nodeType;
          var toNodeType = toNode.nodeType;

          if (!childrenOnly) {
              // Handle the case where we are given two DOM nodes that are not
              // compatible (e.g. <div> --> <span> or <div> --> TEXT)
              if (morphedNodeType === ELEMENT_NODE) {
                  if (toNodeType === ELEMENT_NODE) {
                      if (!compareNodeNames(fromNode, toNode)) {
                          onNodeDiscarded(fromNode);
                          morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                      }
                  } else {
                      // Going from an element node to a text node
                      morphedNode = toNode;
                  }
              } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                  if (toNodeType === morphedNodeType) {
                      if (morphedNode.nodeValue !== toNode.nodeValue) {
                          morphedNode.nodeValue = toNode.nodeValue;
                      }

                      return morphedNode;
                  } else {
                      // Text node to something else
                      morphedNode = toNode;
                  }
              }
          }

          if (morphedNode === toNode) {
              // The "to node" was not compatible with the "from node" so we had to
              // toss out the "from node" and use the "to node"
              onNodeDiscarded(fromNode);
          } else {
              if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
                  return;
              }

              morphEl(morphedNode, toNode, childrenOnly);

              // We now need to loop over any keyed nodes that might need to be
              // removed. We only do the removal if we know that the keyed node
              // never found a match. When a keyed node is matched up we remove
              // it out of fromNodesLookup and we use fromNodesLookup to determine
              // if a keyed node has been matched up or not
              if (keyedRemovalList) {
                  for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                      var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                      if (elToRemove) {
                          removeNode(elToRemove, elToRemove.parentNode, false);
                      }
                  }
              }
          }

          if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
              if (morphedNode.actualize) {
                  morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
              }
              // If we had to swap out the from node with a new node because the old
              // node was not compatible with the target node then we need to
              // replace the old DOM node in the original DOM tree. This is only
              // possible if the original DOM node was part of a DOM tree which
              // we know is the case if it has a parent node.
              fromNode.parentNode.replaceChild(morphedNode, fromNode);
          }

          return morphedNode;
      };
  }

  var morphdom = morphdomFactory(morphAttrs);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var mustache = createCommonjsModule(function (module, exports) {
  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */

  /*global define: false Mustache: true*/

  (function defineMustache (global, factory) {
    if ( exports && typeof exports.nodeName !== 'string') {
      factory(exports); // CommonJS
    } else {
      global.Mustache = {};
      factory(global.Mustache); // script, wsh, asp
    }
  }(commonjsGlobal, function mustacheFactory (mustache) {

    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill (object) {
      return objectToString.call(object) === '[object Array]';
    };

    function isFunction (object) {
      return typeof object === 'function';
    }

    /**
     * More correct typeof string handling array
     * which normally returns typeof 'object'
     */
    function typeStr (obj) {
      return isArray(obj) ? 'array' : typeof obj;
    }

    function escapeRegExp (string) {
      return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }

    /**
     * Null safe way of checking whether or not an object,
     * including its prototype, has a given property
     */
    function hasProperty (obj, propName) {
      return obj != null && typeof obj === 'object' && (propName in obj);
    }

    /**
     * Safe way of detecting whether or not the given thing is a primitive and
     * whether it has the given property
     */
    function primitiveHasOwnProperty (primitive, propName) {  
      return (
        primitive != null
        && typeof primitive !== 'object'
        && primitive.hasOwnProperty
        && primitive.hasOwnProperty(propName)
      );
    }

    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp (re, string) {
      return regExpTest.call(re, string);
    }

    var nonSpaceRe = /\S/;
    function isWhitespace (string) {
      return !testRegExp(nonSpaceRe, string);
    }

    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };

    function escapeHtml (string) {
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
        return entityMap[s];
      });
    }

    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;

    /**
     * Breaks up the given `template` string into a tree of tokens. If the `tags`
     * argument is given here it must be an array with two string values: the
     * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
     * course, the default is to use mustaches (i.e. mustache.tags).
     *
     * A token is an array with at least 4 elements. The first element is the
     * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
     * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
     * all text that appears outside a symbol this element is "text".
     *
     * The second element of a token is its "value". For mustache tags this is
     * whatever else was inside the tag besides the opening symbol. For text tokens
     * this is the text itself.
     *
     * The third and fourth elements of the token are the start and end indices,
     * respectively, of the token in the original template.
     *
     * Tokens that are the root node of a subtree contain two more elements: 1) an
     * array of tokens in the subtree and 2) the index in the original template at
     * which the closing tag for that section begins.
     */
    function parseTemplate (template, tags) {
      if (!template)
        return [];

      var sections = [];     // Stack to hold section tokens
      var tokens = [];       // Buffer to hold the tokens
      var spaces = [];       // Indices of whitespace tokens on the current line
      var hasTag = false;    // Is there a {{tag}} on the current line?
      var nonSpace = false;  // Is there a non-space char on the current line?

      // Strips all whitespace tokens array for the current line
      // if there was a {{#tag}} on it and otherwise only space.
      function stripSpace () {
        if (hasTag && !nonSpace) {
          while (spaces.length)
            delete tokens[spaces.pop()];
        } else {
          spaces = [];
        }

        hasTag = false;
        nonSpace = false;
      }

      var openingTagRe, closingTagRe, closingCurlyRe;
      function compileTags (tagsToCompile) {
        if (typeof tagsToCompile === 'string')
          tagsToCompile = tagsToCompile.split(spaceRe, 2);

        if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
          throw new Error('Invalid tags: ' + tagsToCompile);

        openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
        closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
        closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
      }

      compileTags(tags || mustache.tags);

      var scanner = new Scanner(template);

      var start, type, value, chr, token, openSection;
      while (!scanner.eos()) {
        start = scanner.pos;

        // Match any text between tags.
        value = scanner.scanUntil(openingTagRe);

        if (value) {
          for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
            chr = value.charAt(i);

            if (isWhitespace(chr)) {
              spaces.push(tokens.length);
            } else {
              nonSpace = true;
            }

            tokens.push([ 'text', chr, start, start + 1 ]);
            start += 1;

            // Check for whitespace on the current line.
            if (chr === '\n')
              stripSpace();
          }
        }

        // Match the opening tag.
        if (!scanner.scan(openingTagRe))
          break;

        hasTag = true;

        // Get the tag type.
        type = scanner.scan(tagRe) || 'name';
        scanner.scan(whiteRe);

        // Get the tag value.
        if (type === '=') {
          value = scanner.scanUntil(equalsRe);
          scanner.scan(equalsRe);
          scanner.scanUntil(closingTagRe);
        } else if (type === '{') {
          value = scanner.scanUntil(closingCurlyRe);
          scanner.scan(curlyRe);
          scanner.scanUntil(closingTagRe);
          type = '&';
        } else {
          value = scanner.scanUntil(closingTagRe);
        }

        // Match the closing tag.
        if (!scanner.scan(closingTagRe))
          throw new Error('Unclosed tag at ' + scanner.pos);

        token = [ type, value, start, scanner.pos ];
        tokens.push(token);

        if (type === '#' || type === '^') {
          sections.push(token);
        } else if (type === '/') {
          // Check section nesting.
          openSection = sections.pop();

          if (!openSection)
            throw new Error('Unopened section "' + value + '" at ' + start);

          if (openSection[1] !== value)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        } else if (type === 'name' || type === '{' || type === '&') {
          nonSpace = true;
        } else if (type === '=') {
          // Set the tags for the next time around.
          compileTags(value);
        }
      }

      // Make sure there are no open sections when we're done.
      openSection = sections.pop();

      if (openSection)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

      return nestTokens(squashTokens(tokens));
    }

    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens (tokens) {
      var squashedTokens = [];

      var token, lastToken;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];

        if (token) {
          if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
            lastToken[1] += token[1];
            lastToken[3] = token[3];
          } else {
            squashedTokens.push(token);
            lastToken = token;
          }
        }
      }

      return squashedTokens;
    }

    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have two additional items: 1) an array of
     * all tokens that appear in that section and 2) the index in the original
     * template that represents the end of that section.
     */
    function nestTokens (tokens) {
      var nestedTokens = [];
      var collector = nestedTokens;
      var sections = [];

      var token, section;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        token = tokens[i];

        switch (token[0]) {
          case '#':
          case '^':
            collector.push(token);
            sections.push(token);
            collector = token[4] = [];
            break;
          case '/':
            section = sections.pop();
            section[5] = token[2];
            collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
            break;
          default:
            collector.push(token);
        }
      }

      return nestedTokens;
    }

    /**
     * A simple string scanner that is used by the template parser to find
     * tokens in template strings.
     */
    function Scanner (string) {
      this.string = string;
      this.tail = string;
      this.pos = 0;
    }

    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function eos () {
      return this.tail === '';
    };

    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function scan (re) {
      var match = this.tail.match(re);

      if (!match || match.index !== 0)
        return '';

      var string = match[0];

      this.tail = this.tail.substring(string.length);
      this.pos += string.length;

      return string;
    };

    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function scanUntil (re) {
      var index = this.tail.search(re), match;

      switch (index) {
        case -1:
          match = this.tail;
          this.tail = '';
          break;
        case 0:
          match = '';
          break;
        default:
          match = this.tail.substring(0, index);
          this.tail = this.tail.substring(index);
      }

      this.pos += match.length;

      return match;
    };

    /**
     * Represents a rendering context by wrapping a view object and
     * maintaining a reference to the parent context.
     */
    function Context (view, parentContext) {
      this.view = view;
      this.cache = { '.': this.view };
      this.parent = parentContext;
    }

    /**
     * Creates a new context using the given view with this context
     * as the parent.
     */
    Context.prototype.push = function push (view) {
      return new Context(view, this);
    };

    /**
     * Returns the value of the given name in this context, traversing
     * up the context hierarchy if the value is absent in this context's view.
     */
    Context.prototype.lookup = function lookup (name) {
      var cache = this.cache;

      var value;
      if (cache.hasOwnProperty(name)) {
        value = cache[name];
      } else {
        var context = this, intermediateValue, names, index, lookupHit = false;

        while (context) {
          if (name.indexOf('.') > 0) {
            intermediateValue = context.view;
            names = name.split('.');
            index = 0;

            /**
             * Using the dot notion path in `name`, we descend through the
             * nested objects.
             *
             * To be certain that the lookup has been successful, we have to
             * check if the last object in the path actually has the property
             * we are looking for. We store the result in `lookupHit`.
             *
             * This is specially necessary for when the value has been set to
             * `undefined` and we want to avoid looking up parent contexts.
             *
             * In the case where dot notation is used, we consider the lookup
             * to be successful even if the last "object" in the path is
             * not actually an object but a primitive (e.g., a string, or an
             * integer), because it is sometimes useful to access a property
             * of an autoboxed primitive, such as the length of a string.
             **/
            while (intermediateValue != null && index < names.length) {
              if (index === names.length - 1)
                lookupHit = (
                  hasProperty(intermediateValue, names[index]) 
                  || primitiveHasOwnProperty(intermediateValue, names[index])
                );

              intermediateValue = intermediateValue[names[index++]];
            }
          } else {
            intermediateValue = context.view[name];

            /**
             * Only checking against `hasProperty`, which always returns `false` if
             * `context.view` is not an object. Deliberately omitting the check
             * against `primitiveHasOwnProperty` if dot notation is not used.
             *
             * Consider this example:
             * ```
             * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
             * ```
             *
             * If we were to check also against `primitiveHasOwnProperty`, as we do
             * in the dot notation case, then render call would return:
             *
             * "The length of a football field is 9."
             *
             * rather than the expected:
             *
             * "The length of a football field is 100 yards."
             **/
            lookupHit = hasProperty(context.view, name);
          }

          if (lookupHit) {
            value = intermediateValue;
            break;
          }

          context = context.parent;
        }

        cache[name] = value;
      }

      if (isFunction(value))
        value = value.call(this.view);

      return value;
    };

    /**
     * A Writer knows how to take a stream of tokens and render them to a
     * string, given a context. It also maintains a cache of templates to
     * avoid the need to parse the same template twice.
     */
    function Writer () {
      this.cache = {};
    }

    /**
     * Clears all cached templates in this writer.
     */
    Writer.prototype.clearCache = function clearCache () {
      this.cache = {};
    };

    /**
     * Parses and caches the given `template` according to the given `tags` or
     * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
     * that is generated from the parse.
     */
    Writer.prototype.parse = function parse (template, tags) {
      var cache = this.cache;
      var cacheKey = template + ':' + (tags || mustache.tags).join(':');
      var tokens = cache[cacheKey];

      if (tokens == null)
        tokens = cache[cacheKey] = parseTemplate(template, tags);

      return tokens;
    };

    /**
     * High-level method that is used to render the given `template` with
     * the given `view`.
     *
     * The optional `partials` argument may be an object that contains the
     * names and templates of partials that are used in the template. It may
     * also be a function that is used to load partial templates on the fly
     * that takes a single argument: the name of the partial.
     *
     * If the optional `tags` argument is given here it must be an array with two
     * string values: the opening and closing tags used in the template (e.g.
     * [ "<%", "%>" ]). The default is to mustache.tags.
     */
    Writer.prototype.render = function render (template, view, partials, tags) {
      var tokens = this.parse(template, tags);
      var context = (view instanceof Context) ? view : new Context(view);
      return this.renderTokens(tokens, context, partials, template, tags);
    };

    /**
     * Low-level method that renders the given array of `tokens` using
     * the given `context` and `partials`.
     *
     * Note: The `originalTemplate` is only ever used to extract the portion
     * of the original template that was contained in a higher-order section.
     * If the template doesn't use higher-order sections, this argument may
     * be omitted.
     */
    Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, tags) {
      var buffer = '';

      var token, symbol, value;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        value = undefined;
        token = tokens[i];
        symbol = token[0];

        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
        else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
        else if (symbol === '>') value = this.renderPartial(token, context, partials, tags);
        else if (symbol === '&') value = this.unescapedValue(token, context);
        else if (symbol === 'name') value = this.escapedValue(token, context);
        else if (symbol === 'text') value = this.rawValue(token);

        if (value !== undefined)
          buffer += value;
      }

      return buffer;
    };

    Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
      var self = this;
      var buffer = '';
      var value = context.lookup(token[1]);

      // This function is used to render an arbitrary template
      // in the current context by higher-order sections.
      function subRender (template) {
        return self.render(template, context, partials);
      }

      if (!value) return;

      if (isArray(value)) {
        for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
        }
      } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
        buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
      } else if (isFunction(value)) {
        if (typeof originalTemplate !== 'string')
          throw new Error('Cannot use higher-order sections without the original template');

        // Extract the portion of the original template that the section contains.
        value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

        if (value != null)
          buffer += value;
      } else {
        buffer += this.renderTokens(token[4], context, partials, originalTemplate);
      }
      return buffer;
    };

    Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
      var value = context.lookup(token[1]);

      // Use JavaScript's definition of falsy. Include empty arrays.
      // See https://github.com/janl/mustache.js/issues/186
      if (!value || (isArray(value) && value.length === 0))
        return this.renderTokens(token[4], context, partials, originalTemplate);
    };

    Writer.prototype.renderPartial = function renderPartial (token, context, partials, tags) {
      if (!partials) return;

      var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
      if (value != null)
        return this.renderTokens(this.parse(value, tags), context, partials, value);
    };

    Writer.prototype.unescapedValue = function unescapedValue (token, context) {
      var value = context.lookup(token[1]);
      if (value != null)
        return value;
    };

    Writer.prototype.escapedValue = function escapedValue (token, context) {
      var value = context.lookup(token[1]);
      if (value != null)
        return mustache.escape(value);
    };

    Writer.prototype.rawValue = function rawValue (token) {
      return token[1];
    };

    mustache.name = 'mustache.js';
    mustache.version = '3.0.1';
    mustache.tags = [ '{{', '}}' ];

    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();

    /**
     * Clears all cached templates in the default writer.
     */
    mustache.clearCache = function clearCache () {
      return defaultWriter.clearCache();
    };

    /**
     * Parses and caches the given template in the default writer and returns the
     * array of tokens it contains. Doing this ahead of time avoids the need to
     * parse templates on the fly as they are rendered.
     */
    mustache.parse = function parse (template, tags) {
      return defaultWriter.parse(template, tags);
    };

    /**
     * Renders the `template` with the given `view` and `partials` using the
     * default writer. If the optional `tags` argument is given here it must be an
     * array with two string values: the opening and closing tags used in the
     * template (e.g. [ "<%", "%>" ]). The default is to mustache.tags.
     */
    mustache.render = function render (template, view, partials, tags) {
      if (typeof template !== 'string') {
        throw new TypeError('Invalid template! Template should be a "string" ' +
                            'but "' + typeStr(template) + '" was given as the first ' +
                            'argument for mustache#render(template, view, partials)');
      }

      return defaultWriter.render(template, view, partials, tags);
    };

    // This is here for backwards compatibility with 0.4.x.,
    /*eslint-disable */ // eslint wants camel cased function name
    mustache.to_html = function to_html (template, view, partials, send) {
      /*eslint-enable*/

      var result = mustache.render(template, view, partials);

      if (isFunction(send)) {
        send(result);
      } else {
        return result;
      }
    };

    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;

    // Export these mainly for testing, but also for advanced usage.
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;

    return mustache;
  }));
  });

  var Template =
  /*#__PURE__*/
  function () {
    function Template(templates, contents, order) {
      this.templates = templates;
      this.contents = contents;
      this.order = order;
    }

    var _proto = Template.prototype;

    _proto.render = function render(data, cb) {
      var output = mustache.render(this.masterTemplate, data);

      if (!cb) {
        return output;
      }

      return cb(output);
    };

    _createClass(Template, [{
      key: "masterTemplate",
      get: function get() {
        var _this = this;

        return this.order.reduce(function (acc, key) {
          var string = '';

          if (_this.contents[key]) {
            string = _this.templates[key] || '';
          }

          return acc + string;
        }, '');
      }
    }]);

    return Template;
  }();

  var stylesTemplate = '{{#selectors}}' + '{{#media}} {{media}} { {{/media}}' + '{{selector}} { ' + '{{#declarations}}' + '{{property}}: {{{value}}};' + '{{/declarations}}' + ' } ' + '{{#media}} } {{/media}}' + '{{/selectors}}';

  var conditionalStyles = ".shopify-buy__modal {\n  display: none;\n}\n\n.is-active .shopify-buy__modal {\n    display: block;\n    opacity: 1;\n    margin-left: auto;\n    margin-right: auto;\n  }\n";

  function addClassToElement(className, element) {
    if (!className) {
      return;
    }

    if (element.classList) {
      element.classList.add(className);
    } else {
      var classes = element.className.split(' ');

      if (classes.indexOf(className) > -1) {
        return;
      }

      element.setAttribute('class', "".concat(element.className, " ").concat(className));
    }
  }
  function removeClassFromElement(className, element) {
    if (!className) {
      return;
    }

    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.setAttribute('class', element.className.replace(className, ''));
    }
  }

  var iframeStyles = {
    width: '100%',
    overflow: 'hidden',
    border: 'none'
  };
  var iframeAttrs = {
    horizontalscrolling: 'no',
    verticalscrolling: 'no',
    allowTransparency: 'true',
    frameBorder: '0',
    scrolling: 'no'
  };
  var webfontScript = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';

  function isPseudoSelector(key) {
    return key.charAt(0) === ':';
  }

  function isMedia(key) {
    return key.charAt(0) === '@';
  }

  function isValue$1(test) {
    return typeof test === 'string' || typeof test === 'number';
  }

  function ruleDeclarations(rule) {
    return Object.keys(rule).filter(function (key) {
      return isValue$1(rule[key]);
    }).map(function (key) {
      return {
        property: key,
        value: rule[key]
      };
    });
  }

  function selectorStyleGroup(selector, selectorClass, classes) {
    var styleGroup = [];

    if (selector && selectorClass) {
      var formattedSelector = selectorClass.split(' ').join('.');

      if (!isPseudoSelector(formattedSelector)) {
        formattedSelector = ".".concat(formattedSelector);
      }

      styleGroup = Object.keys(selector).filter(function (decKey) {
        return !isValue$1(selector[decKey]);
      }).reduce(function (acc, decKey) {
        var className = classes[decKey] || decKey;
        return acc.concat(selectorStyleGroup(selector[decKey], className, classes).map(function (group) {
          var groupSelector = '';

          if (isPseudoSelector(group.selector)) {
            groupSelector = "".concat(formattedSelector).concat(group.selector);
          } else if (isMedia(decKey)) {
            groupSelector = formattedSelector;
          } else {
            groupSelector = "".concat(formattedSelector, " ").concat(group.selector);
          }

          return {
            selector: groupSelector,
            declarations: group.declarations,
            media: isMedia(decKey) ? decKey : null
          };
        }));
      }, []);
      var declarations = ruleDeclarations(selector);

      if (declarations.length) {
        styleGroup.push({
          selector: "".concat(formattedSelector),
          declarations: declarations
        });
      }
    }

    return styleGroup;
  }

  var iframe =
  /*#__PURE__*/
  function () {
    function iframe(node, config) {
      var _this = this;

      this.el = document.createElement('iframe');
      this.parent = node;
      this.stylesheet = config.stylesheet;
      this.customStylesHash = config.customStyles || {};
      this.classes = config.classes;
      this.browserFeatures = config.browserFeatures;
      this.googleFonts = config.googleFonts || [];
      this.name = config.name;

      if (config.width) {
        this.setWidth(config.width);
      }

      Object.keys(iframeStyles).forEach(function (key) {
        _this.el.style[key] = iframeStyles[key];
      });
      Object.keys(iframeAttrs).forEach(function (key) {
        return _this.el.setAttribute(key, iframeAttrs[key]);
      });
      this.el.setAttribute('name', config.name);
      this.styleTag = null;
    }

    var _proto = iframe.prototype;

    _proto.load = function load() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.el.onload = function () {
          return _this2.loadFonts().then(function () {
            _this2.appendStyleTag();

            return resolve();
          });
        };

        _this2.parent.appendChild(_this2.el);
      });
    };

    _proto.loadFonts = function loadFonts() {
      var _this3 = this;

      if (!this.googleFonts || !this.googleFonts.length) {
        return Promise.resolve(true);
      }

      return this.loadFontScript().then(function () {
        return new Promise(function (resolve) {
          if (!window.WebFont) {
            return resolve();
          }

          window.WebFont.load({
            google: {
              families: _this3.googleFonts
            },
            fontactive: function fontactive() {
              return resolve();
            },
            context: _this3.el.contentWindow || frames[_this3.name]
          });
          return window.setTimeout(function () {
            return resolve();
          }, 1000);
        });
      });
    };

    _proto.loadFontScript = function loadFontScript() {
      if (window.WebFont) {
        return Promise.resolve();
      }

      var fontScript = document.createElement('script');
      return new Promise(function (resolve) {
        fontScript.onload = function () {
          resolve();
        };

        fontScript.src = webfontScript;
        document.head.appendChild(fontScript);
        setTimeout(function () {
          resolve();
        }, 500);
      });
    };

    _proto.setWidth = function setWidth(width) {
      this.parent.style['max-width'] = width;
    };

    _proto.addClass = function addClass(className) {
      addClassToElement(className, this.parent);
    };

    _proto.removeClass = function removeClass(className) {
      removeClassFromElement(className, this.parent);
    };

    _proto.setName = function setName(name) {
      this.el.setAttribute('name', name);
    };

    _proto.updateStyles = function updateStyles(customStyles, googleFonts) {
      var _this4 = this;

      this.googleFonts = googleFonts;
      return this.loadFonts().then(function () {
        _this4.customStylesHash = customStyles;
        _this4.styleTag.innerHTML = _this4.css;
        return;
      });
    };

    _proto.appendStyleTag = function appendStyleTag() {
      if (!this.document.head) {
        return;
      }

      this.styleTag = this.document.createElement('style');

      if (this.styleTag.styleSheet) {
        this.styleTag.styleSheet.cssText = this.css;
      } else {
        this.styleTag.appendChild(this.document.createTextNode(this.css));
      }

      this.document.head.appendChild(this.styleTag);
    };

    _createClass(iframe, [{
      key: "width",
      get: function get() {
        return this.parent.style['max-width'];
      }
    }, {
      key: "document",
      get: function get() {
        var doc;

        if (this.el.contentWindow && this.el.contentWindow.document.body) {
          doc = this.el.contentWindow.document;
        } else if (this.el.document && this.el.document.body) {
          doc = this.el.document;
        } else if (this.el.contentDocument && this.el.contentDocument.body) {
          doc = this.el.contentDocument;
        }

        return doc;
      }
    }, {
      key: "customStyles",
      get: function get() {
        var _this5 = this;

        var customStyles = [];
        Object.keys(this.customStylesHash).forEach(function (typeKey) {
          if (_this5.customStylesHash[typeKey]) {
            Object.keys(_this5.customStylesHash[typeKey]).forEach(function (key) {
              var styleGroup = selectorStyleGroup(_this5.customStylesHash[typeKey][key], _this5.classes[typeKey][key], _this5.classes[typeKey]);
              customStyles = customStyles.concat(styleGroup);
            });
          }
        });
        return customStyles;
      }
    }, {
      key: "conditionalCSS",
      get: function get() {
        if (this.browserFeatures.transition && this.browserFeatures.transform && this.browserFeatures.animation) {
          return '';
        }

        return conditionalStyles;
      }
    }, {
      key: "css",
      get: function get() {
        var compiled = mustache.render(stylesTemplate, {
          selectors: this.customStyles
        });
        return "".concat(this.stylesheet, " \n ").concat(compiled, " \n ").concat(this.conditionalCSS);
      }
    }]);

    return iframe;
  }();

  var styles = {};
  styles.cart = 'html, body, h1, h2, h3, h4, h5, p {   padding: 0;   margin: 0; } * {   -webkit-box-sizing: border-box;           box-sizing: border-box; } body, html {   min-height: 100%; } html {   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   font-size: 14px;   line-height: 1.2;   color: #4c4c4c;   text-rendering: optimizeLegibility;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; } select {   text-rendering: auto !important; } ul {   list-style: none;   padding-left: 0;   margin: 0; } img {   display: block;   max-width: 100%; } input {   -webkit-appearance: textfield;   margin: 0; } .clearfix:after {     content: "";     display: table;     clear: both;   } .visuallyhidden {   border: 0;   height: 1px;   margin: -1px;   overflow: hidden;   padding: 0;   position: absolute;   width: 1px; } .component-container {   overflow: hidden; } .shopify-buy__type--center {   text-align: center; } .shopify-buy--visually-hidden {   position: absolute !important;   clip: rect(1px, 1px, 1px, 1px);   padding:0 !important;   border:0 !important;   height: 1px !important;   width: 1px !important;   overflow: hidden; } .shopify-buy__btn {   color: #fff;   font-size: 15px;   background-color: #78b657;   padding: 12px 40px;   letter-spacing: .3px;   display: block;   border-radius: 3px;   cursor: pointer;   -webkit-transition: background 200ms ease;   transition: background 200ms ease;   max-width: 100%;   text-overflow: ellipsis;   overflow: hidden;   line-height: 1.2;   border: 0;   -moz-appearance: none;   -webkit-appearance: none } .shopify-buy__btn:hover,   .shopify-buy__btn:focus {     background-color: #5f9d3e;   } .shopify-buy__btn--parent {   background-color: transparent;   border: 0;   padding: 0;   cursor: pointer } .shopify-buy__btn--parent:hover .product__variant-img, .shopify-buy__btn--parent:focus .product__variant-img {       opacity: .7;     } .shopify-buy__btn--cart-tab {   padding: 5px 11px;   border-radius: 3px 0 0 3px;   position: fixed;   right: 0;   top: 50%;   -webkit-transform: translate(100%, -50%);           transform: translate(100%, -50%);   opacity: 0;   min-width: inherit;   width: auto;   height: auto;   z-index: 2147483647 } .shopify-buy__btn--cart-tab.is-active {     -webkit-transform: translateY(-50%);             transform: translateY(-50%);     opacity: 1;   } .shopify-buy__btn__counter {   display: block;   margin: 0 auto 10px auto;   font-size: 18px; } .shopify-buy__icon-cart--side {   height: 20px;   width: 20px; } .shopify-buy__btn[disabled] {   background-color: #999;   pointer-events: none; } .shopify-buy__btn--close {   position: absolute;   right: 9px;   top: 8px;   font-size: 35px;   color: #767676;   border: none;   background-color: transparent;   -webkit-transition: color 100ms ease, -webkit-transform 100ms ease;   transition: color 100ms ease, -webkit-transform 100ms ease;   transition: transform 100ms ease, color 100ms ease;   transition: transform 100ms ease, color 100ms ease, -webkit-transform 100ms ease;   cursor: pointer;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   padding-right: 9px } .shopify-buy__btn--close:hover {     -webkit-transform: scale(1.2);             transform: scale(1.2);     color: hsl(0, 0%, 41.2745098039%);   } @-webkit-keyframes flipIn {   from {     max-height: 0;     -webkit-transform: rotatex(90deg) translatey(-50%);             transform: rotatex(90deg) translatey(-50%);     margin-bottom: -65px;     opacity: 0;   }    to {     max-height: none;     -webkit-transform: none;             transform: none;     margin-bottom: 20px;     opacity: 1;   } } @keyframes flipIn {   from {     max-height: 0;     -webkit-transform: rotatex(90deg) translatey(-50%);             transform: rotatex(90deg) translatey(-50%);     margin-bottom: -65px;     opacity: 0;   }    to {     max-height: none;     -webkit-transform: none;             transform: none;     margin-bottom: 20px;     opacity: 1;   } } @-webkit-keyframes flipOut {   from {     max-height: none;     -webkit-transform: none;             transform: none;     margin-bottom: 20px;     opacity: 1;   }    to {     max-height: 0;     -webkit-transform: rotatex(90deg) translatey(-50%);             transform: rotatex(90deg) translatey(-50%);     margin-bottom: -65px;     opacity: 0;   } } @keyframes flipOut {   from {     max-height: none;     -webkit-transform: none;             transform: none;     margin-bottom: 20px;     opacity: 1;   }    to {     max-height: 0;     -webkit-transform: rotatex(90deg) translatey(-50%);             transform: rotatex(90deg) translatey(-50%);     margin-bottom: -65px;     opacity: 0;   } } .shopify-buy__cart-wrapper {   height: 100%;   padding-left: 10px; } .shopify-buy__cart {   height: 100%;   background-color: #fff;   width: calc(100% - 10px);   position: absolute;   right: 0;   -webkit-box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);           box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1); } .shopify-buy__cart__header {   padding: 20px;   padding-right: 40px;   position: relative;   z-index: 2147483647;   background-color: inherit; } .shopify-buy__cart__title {   font-size: 18px;   color: #767676;   font-weight: normal;   overflow: hidden;   text-overflow: ellipsis; } .shopify-buy__cart-scroll {   padding: 70px 0 135px 0;   position: absolute;   top: 0;   height: 100%;   width: 100%; } .shopify-buy__cart-scroll--discounts {   padding-bottom: 170px; } .shopify-buy__cart-scroll--cart-note {   padding-bottom: 200px; } .shopify-buy__cart-scroll--cart-note.shopify-buy__cart-scroll--discounts {   padding-bottom: 230px; } .shopify-buy__cart-items {   overflow: hidden;   overflow-y: auto;   height: 100%;   position: relative;   padding: 0 20px 20px;   -webkit-overflow-scrolling: touch;   -webkit-perspective: 400px;           perspective: 400px;   -webkit-perspective-origin: 50% 0px;           perspective-origin: 50% 0px; } .shopify-buy__cart-item {   min-height: 65px;   margin-bottom: 20px;   overflow: hidden;   position: relative;   -webkit-backface-visibility: visible;           backface-visibility: visible;   -webkit-animation: 200ms flipIn forwards;           animation: 200ms flipIn forwards; } .shopify-buy__cart-item.is-hidden {   -webkit-animation-name: flipOut;           animation-name: flipOut; } .shopify-buy__cart-item__image {   width: 65px;   height: 65px;   background-size: contain;   background-repeat: no-repeat;   background-position: center center;   background-color: transparent;   position: absolute;   left: 0;   top: 0; } .shopify-buy__cart-item__title {   font-size: 14px;   margin-left: 80px;   margin-bottom: 3px;   display: block; } .shopify-buy__cart-item__price {   float: right;   font-size: 14px;   font-weight: bold;   line-height: 26px; } .shopify-buy__cart-item__price-and-discounts {   float: right;   text-align: right;   max-width: 100px } .shopify-buy__cart-item__price-and-discounts .shopify-buy__cart-item__price {     float: none;   } .shopify-buy__cart-item__full-price {   font-size: 12px;   line-height: 12px; } .shopify-buy__cart-item__discount {   font-size: 12px;   word-wrap: break-word;   text-transform: uppercase } .shopify-buy__cart-item__discount + .shopify-buy__cart-item__discount {     margin-top: 5px;   } .shopify-buy__cart-item__discount__icon {   width: 12px;   height: 12px;   vertical-align: top;   fill: currentColor; } .shopify-buy__cart-item__variant-title {   margin-left: 80px;   margin-bottom: 10px;   color: #4c4c4c;   font-size: 12px;   max-width: 220px;   overflow: hidden;   text-overflow: ellipsis; } .shopify-buy__cart-bottom {   background-color: #fff;   position: absolute;   width: 100%;   bottom: 0;   padding: 15px 20px 20px 20px; } .shopify-buy__cart__subtotal__text {   text-transform: uppercase;   float: left;   font-size: 11px;   color: #4c4c4c; } .shopify-buy__cart__subtotal__price {   float: right; } .shopify-buy__cart__discount {   display: -webkit-box;   display: -webkit-flex;   display: -ms-flexbox;   display: flex;   margin-bottom: 10px;   color: #4c4c4c; } .shopify-buy__cart__discount__text {   font-size: 11px;   text-transform: uppercase;   margin-right: 10px;   -webkit-box-flex: 1;   -webkit-flex-grow: 1;       -ms-flex-positive: 1;           flex-grow: 1; } .shopify-buy__cart__discount__text__icon {   width: 11px;   height: 11px;   vertical-align: top;   fill: currentColor; } .shopify-buy__cart__discount__amount {   font-size: 12px;   line-height: 12px;   -webkit-flex-shrink: 0;       -ms-flex-negative: 0;           flex-shrink: 0; } .shopify-buy__cart__currency {   font-size: 12px; } .shopify-buy__cart__notice {   font-size: 11px;   clear: both;   padding-top: 10px;   text-align: center;   color: #4c4c4c; } .shopify-buy__cart__note {   clear: both;   padding-top: 10px; } .shopify-buy__cart__note__description {   font-size: 11px;   color: #4c4c4c; } .shopify-buy__cart__note__text-area {   resize: none;   font-size: 11px;   width: 100%;   color: #4c4c4c; } .shopify-buy__cart-empty-text {   padding: 10px 15px;   text-align: center; } .shopify-buy__btn--cart-checkout {   clear: both;   margin-top: 15px;   width: 100%;   padding: 10px 5px;   font-size: 16px; } .shopify-buy__quantity-container {   margin-left: 80px;   margin-right: 100px;   height: 26px;   line-height: 26px; } .shopify-buy__quantity-container.is-loading {   opacity: 0.65;   pointer-events: none; } .shopify-buy__cart-item__quantity-input {   float: left;   background: transparent; } @media (max-width: 330px) {   .shopify-buy__cart-item__price-and-discounts {     max-width: 90px;   }    .shopify-buy__quantity-container {     margin-right: 90px;   } } .shopify-buy__quantity-decrement, .shopify-buy__quantity-increment {   color: #4c4c4c;   display: block;   height: 30px;   float: left;   line-height: 16px;   font-family: monospace;   width: 26px;   padding: 0;   border: none;   background: transparent;   -webkit-box-shadow: none;           box-shadow: none;   cursor: pointer;   font-size: 18px;   text-align: center;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   border: 1px solid #767676;   position: relative } .shopify-buy__quantity-decrement svg, .shopify-buy__quantity-increment svg {     width: 14px;     height: 14px;     position: absolute;     top: 50%;     left: 50%;     margin-top: -6px;     margin-left: -7px;     fill: currentColor;   } .shopify-buy__quantity-decrement {   border-radius: 3px 0 0 3px; } .shopify-buy__quantity-increment {   border-radius: 0 3px 3px 0; } .shopify-buy__quantity {   color: black;   width: 45px;   height: 30px;   font-size: 16px;   border: none;   text-align: center;   -webkit-appearance: none;   -moz-appearance: textfield;   display: inline-block;   padding: 0;   border-radius: 0;   border-top: 1px solid #767676;   border-bottom: 1px solid #767676; } input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {   -webkit-appearance: none;   margin: 0; } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns {   overflow: hidden } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns .shopify-buy__quantity {     border-left: 0;     border-right: 0;     float: left;   } ';
  styles.modal = 'html, body, h1, h2, h3, h4, h5, p {   padding: 0;   margin: 0; } * {   -webkit-box-sizing: border-box;           box-sizing: border-box; } body, html {   min-height: 100%; } html {   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   font-size: 14px;   line-height: 1.2;   color: #4c4c4c;   text-rendering: optimizeLegibility;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; } select {   text-rendering: auto !important; } ul {   list-style: none;   padding-left: 0;   margin: 0; } img {   display: block;   max-width: 100%; } input {   -webkit-appearance: textfield;   margin: 0; } .clearfix:after {     content: "";     display: table;     clear: both;   } .visuallyhidden {   border: 0;   height: 1px;   margin: -1px;   overflow: hidden;   padding: 0;   position: absolute;   width: 1px; } .component-container {   overflow: hidden; } .shopify-buy__type--center {   text-align: center; } .shopify-buy--visually-hidden {   position: absolute !important;   clip: rect(1px, 1px, 1px, 1px);   padding:0 !important;   border:0 !important;   height: 1px !important;   width: 1px !important;   overflow: hidden; } .shopify-buy__quantity-decrement, .shopify-buy__quantity-increment {   color: #4c4c4c;   display: block;   height: 30px;   float: left;   line-height: 16px;   font-family: monospace;   width: 26px;   padding: 0;   border: none;   background: transparent;   -webkit-box-shadow: none;           box-shadow: none;   cursor: pointer;   font-size: 18px;   text-align: center;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   border: 1px solid #767676;   position: relative } .shopify-buy__quantity-decrement svg, .shopify-buy__quantity-increment svg {     width: 14px;     height: 14px;     position: absolute;     top: 50%;     left: 50%;     margin-top: -6px;     margin-left: -7px;     fill: currentColor;   } .shopify-buy__quantity-decrement {   border-radius: 3px 0 0 3px; } .shopify-buy__quantity-increment {   border-radius: 0 3px 3px 0; } .shopify-buy__quantity {   color: black;   width: 45px;   height: 30px;   font-size: 16px;   border: none;   text-align: center;   -webkit-appearance: none;   -moz-appearance: textfield;   display: inline-block;   padding: 0;   border-radius: 0;   border-top: 1px solid #767676;   border-bottom: 1px solid #767676; } input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {   -webkit-appearance: none;   margin: 0; } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns {   overflow: hidden } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns .shopify-buy__quantity {     border-left: 0;     border-right: 0;     float: left;   } .shopify-buy__btn {   color: #fff;   font-size: 15px;   background-color: #78b657;   padding: 12px 40px;   letter-spacing: .3px;   display: block;   border-radius: 3px;   cursor: pointer;   -webkit-transition: background 200ms ease;   transition: background 200ms ease;   max-width: 100%;   text-overflow: ellipsis;   overflow: hidden;   line-height: 1.2;   border: 0;   -moz-appearance: none;   -webkit-appearance: none } .shopify-buy__btn:hover,   .shopify-buy__btn:focus {     background-color: #5f9d3e;   } .shopify-buy__btn--parent {   background-color: transparent;   border: 0;   padding: 0;   cursor: pointer } .shopify-buy__btn--parent:hover .product__variant-img, .shopify-buy__btn--parent:focus .product__variant-img {       opacity: .7;     } .shopify-buy__btn--cart-tab {   padding: 5px 11px;   border-radius: 3px 0 0 3px;   position: fixed;   right: 0;   top: 50%;   -webkit-transform: translate(100%, -50%);           transform: translate(100%, -50%);   opacity: 0;   min-width: inherit;   width: auto;   height: auto;   z-index: 2147483647 } .shopify-buy__btn--cart-tab.is-active {     -webkit-transform: translateY(-50%);             transform: translateY(-50%);     opacity: 1;   } .shopify-buy__btn__counter {   display: block;   margin: 0 auto 10px auto;   font-size: 18px; } .shopify-buy__icon-cart--side {   height: 20px;   width: 20px; } .shopify-buy__btn[disabled] {   background-color: #999;   pointer-events: none; } .shopify-buy__btn--close {   position: absolute;   right: 9px;   top: 8px;   font-size: 35px;   color: #767676;   border: none;   background-color: transparent;   -webkit-transition: color 100ms ease, -webkit-transform 100ms ease;   transition: color 100ms ease, -webkit-transform 100ms ease;   transition: transform 100ms ease, color 100ms ease;   transition: transform 100ms ease, color 100ms ease, -webkit-transform 100ms ease;   cursor: pointer;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   padding-right: 9px } .shopify-buy__btn--close:hover {     -webkit-transform: scale(1.2);             transform: scale(1.2);     color: hsl(0, 0%, 41.2745098039%);   } .shopify-buy__option-select-wrapper {   border: 1px solid #d3dbe2;   border-radius: 3px;   -webkit-box-sizing: border-box;           box-sizing: border-box;   position: relative;   background: #fff;   vertical-align: bottom; } .shopify-buy__select-icon {   cursor: pointer;   display: block;   fill: #798c9c;   position: absolute;   right: 10px;   top: 50%;   margin-top: -6px;   pointer-events: none;   width: 12px;   height: 12px;   vertical-align: middle; } .shopify-buy__option-select + .shopify-buy__option-select {     margin-top: 7.5px;   } .shopify-buy__option-select__label {   display: block;   font-size: 14px;   margin-top: 15px;   margin-bottom: 5px; } .shopify-buy__btn--parent .shopify-buy__option-select__label {     cursor: pointer;   } .shopify-buy__option-select__select {   font-size: inherit;   padding: 7px 10px;   padding-right: 32px;   border: 0;   width: 100%;   background: transparent;   -webkit-appearance: none;   -moz-appearance: none } .shopify-buy__option-select__select::-ms-expand {     display: none;   } .shopify-buy__btn--parent .shopify-buy__option-select__select {     cursor: pointer;   } .shopify-buy__product {   overflow: hidden;   width: 100%; } .shopify-buy__product__variant-img {   margin: 0 auto 15px auto;   -webkit-transition: opacity 0.3s ease;   transition: opacity 0.3s ease;   opacity: 1 } .shopify-buy__product__variant-img.is-transitioning {     opacity: 0;   } .shopify-buy__is-button {   cursor: pointer; } .shopify-buy__no-image .shopify-buy__product__variant-img {     display: none;   } .shopify-buy__product__title {   font-size: 18px;   line-height: 1.2;   color: #4a4a4a;   margin-bottom: 15px;   font-weight: 700; } .shopify-buy__layout-horizontal .shopify-buy__product__title {     margin-top: 10px;   } .shopify-buy__product__variant-title {   font-size: 18px;   color: #666;   font-weight: 400;   text-align: center;   margin-bottom: 15px; } .shopify-buy__product__price {   margin-bottom: 15px; } .shopify-buy__product-description {   margin-top: 30px;   line-height: 1.65;   color: #4a4a4a } .shopify-buy__product-description p,   .shopify-buy__product-description ul,   .shopify-buy__product-description ol,   .shopify-buy__product-description img {     margin-bottom: 10px   } .shopify-buy__product-description p:last-child, .shopify-buy__product-description ul:last-child, .shopify-buy__product-description ol:last-child, .shopify-buy__product-description img:last-child {       margin-bottom: 0;     } .shopify-buy__product-description a {     color: inherit;   } .shopify-buy__product-description img {     max-width: 100%;   } .shopify-buy__product-description h1 {     font-size: 20px;   } .shopify-buy__product-description h2 {     font-size: 18px;   } .shopify-buy__product-description h3 {     font-size: 17px;   } .shopify-buy__product-description ul,   .shopify-buy__product-description ol {     margin-left: 2em;   } .shopify-buy__product-description ul {     list-style-type: disc;   } .shopify-buy__layout-vertical {   text-align: center; } .shopify-buy__product__actual-price, .shopify-buy__product__compare-price {   color: #4a4a4a;   display: inline-block; } .shopify-buy__product__actual-price {   font-size: 14px; } .shopify-buy__product__compare-price {   font-size: 12px;   text-decoration: line-through;   padding-left: 5px;   opacity: 0.76; } .shopify-buy__product__unit-price {   color: #4a4a4a;   padding-top: 5px;   font-size: 12px;   opacity: 0.8; } .shopify-buy__product__variant-selectors {   text-align: left;   font-size: 14px; } .shopify-buy__layout-vertical .shopify-buy__product__variant-selectors {     width: 100%;     max-width: 280px;     display: inline-block;   } .shopify-buy__quantity {   border-left: 1px solid;   border-right: 1px solid;   border-radius: 3px; } .shopify-buy__quantity, .shopify-buy__quantity-increment, .shopify-buy__quantity-decrement {   border-color: #d3dbe2;   line-height: 1.2;   font-size: 15px;   height: auto;   padding-top: 12px;   padding-bottom: 12px; } .shopify-buy__btn {   display: inline-block; } .shopify-buy__btn-wrapper {   margin-top: 20px; } .shopify-buy__btn.shopify-buy__beside-quantity {   display: inline-block;   vertical-align: top;   border-top-left-radius: 0;   border-bottom-left-radius: 0;   border: 1px solid transparent; } .shopify-buy__btn-and-quantity .shopify-buy__quantity {     border-right: 0;     border-top-right-radius: 0;     border-bottom-right-radius: 0;     background: #fff;   } .shopify-buy__btn-and-quantity .shopify-buy__quantity-container {     display: inline-block;     vertical-align: top;   } .shopify-buy__btn-and-quantity .shopify-buy__btn-wrapper {     display: inline-block;     vertical-align: top;     margin: 0;   } .shopify-buy__cart-item__quantity-container {   margin-top: 20px;   display: inline-block; } .shopify-buy__layout-vertical .shopify-buy__btn,   .shopify-buy__layout-vertical .shopify-buy__quantity-container,   .shopify-buy__layout-horizontal .shopify-buy__btn,   .shopify-buy__layout-horizontal .shopify-buy__quantity-container {     margin: 20px auto 0;   } .shopify-buy__layout-vertical .shopify-buy__btn:first-child, .shopify-buy__layout-horizontal .shopify-buy__btn:first-child {     margin-top: 0;   } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity, .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity {     margin: 20px auto 0   } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity .shopify-buy__btn,     .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity .shopify-buy__btn,     .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity .shopify-buy__quantity-container {       margin: 0 auto;     } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity:first-child, .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity:first-child {     margin: 0 auto;   } .shopify-buy__layout-vertical .shopify-buy__product__variant-img, .shopify-buy__layout-horizontal .shopify-buy__product__variant-img {     max-width: 100%;   } @media (min-width: 500px) {   .shopify-buy__layout-horizontal:not(.no-image) {     text-align: left;     margin-bottom: 0;     margin-left: 0   }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-img-wrapper {       float: left;       width: 40%;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title {       text-align: left;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__price,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-description,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__btn-and-quantity,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__btn-wrapper,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-selectors {       margin-left: calc(40% + 25px);     } } @media (min-width: 680px) {     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-img-wrapper {       float: left;       width: 60%;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__price,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-description,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__btn-and-quantity,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__btn-wrapper,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-selectors {       margin-left: calc(60% + 25px);     } } .no-image .shopify-buy__product-img-wrapper {     display: none;   } @-webkit-keyframes dash {   to {     stroke-dashoffset: 0;   } } @keyframes dash {   to {     stroke-dashoffset: 0;   } } .shopify-buy__carousel {   font-size: 0;   text-align: center;   min-height: 90px;   margin-left: -15px;   margin-top: 15px; } .shopify-buy__carousel-item {   width: calc(16.666% - 15px);   margin-left: 15px;   display: inline-block;   vertical-align: middle;   cursor: pointer;   position: relative;   background-size: cover;   background-position: center;   padding: 0;   border: none } .shopify-buy__carousel-item:nth-child(n+7) {     margin-top: 15px;   } .shopify-buy__carousel-item:before {     content: "";     display: block;     padding-top: 100%;   } .main-image-wrapper {   position: relative; } .carousel-button {   position: absolute;   width: 75px;   top: 0;   height: 100%;   border: none;   font-size: 0;   background-color: transparent;   opacity: 0.4;   cursor: pointer } .carousel-button:hover,   .carousel-button:focus {     opacity: 0.9;     outline: none;   } .carousel-button-arrow {   width: 20px;   display: inline-block;   margin-left: 25px; } .carousel-button--previous {   left: 0;   -webkit-transform: rotate(180deg);           transform: rotate(180deg); } .carousel-button--next {   right: 0; } .shopify-buy__carousel-item--selected {   opacity: 0.4; } .shopify-buy__btn--close {   right: 0px;   font-size: 45px;   font-weight: 100;   z-index: 2147483647;   padding: 0 10px; } .shopify-buy__modal {   background: #fff;   width: calc(100% - 20px);   position: absolute;   left: 0;   right: 0;   z-index: 2147483646; } .shopify-buy__product {   text-align: left; } .shopify-buy__product__title, .shopify-buy__product__price, .shopify-buy__product__variant-title {   text-align: left; } .shopify-buy__product__title {   font-size: 26px;   font-weight: 700;   line-height: 1.4; } .shopify-buy__product__compare-price {   display: inline-block;   margin-right: 5px; } .shopify-buy__product__actual-price {   display: inline-block; } .shopify-buy__modal .shopify-buy__modal-product-wrapper {   width: 100%; } .shopify-buy__product__variant-image {   margin: 0; } @media (max-width: 499px) {   body.is-active {     overflow: hidden;     position: fixed;     height: 100vh;     -webkit-transition: all 0s;     transition: all 0s;   }    .shopify-buy__modal {     width: 100%;     min-height: 100vh;     position: fixed;     overflow-y: auto;   }    .shopify-buy__product {     padding: 15px;     position: absolute;     top: 0;     left: 0;   }    .shopify-buy__product__variant-img {     max-height: 60vh;     margin: 0 auto;     width: auto;     max-width: 100%;   }    .shopify-buy__btn--close {     position: fixed;     top: 0;     right: 0;   } } @-webkit-keyframes slideIn {   from {     opacity: 0;     transform: translateY(-200px);     -webkit-transform: translateY(-200px);   }    to {     opacity: 1;     transform: translateY(0);     -webkit-transform: translateY(0);   } } @keyframes slideIn {   from {     opacity: 0;     transform: translateY(-200px);     -webkit-transform: translateY(-200px);   }    to {     opacity: 1;     transform: translateY(0);     -webkit-transform: translateY(0);   } } @-webkit-keyframes slideOut {   from {     opacity: 1;     transform: translateY(0);     -webkit-transform: translateY(0);   }    to {     opacity: 0;     transform: translateY(-200px);     -webkit-transform: translateY(-200px);   } } @keyframes slideOut {   from {     opacity: 1;     transform: translateY(0);     -webkit-transform: translateY(0);   }    to {     opacity: 0;     transform: translateY(-200px);     -webkit-transform: translateY(-200px);   } } @media (min-width: 500px) {   html,   body.is-active {     height: 100%;   }    .shopify-buy__modal-overlay {     width: 100%;     height: 100%;     position: fixed;     overflow-y: scroll;   }    .shopify-buy__modal {     margin: 100px auto 40px auto;     opacity: 0;     border-radius: 2px;     border: 1px solid rgba(0, 0, 0, 0.72);     -webkit-transform: translateY(-200px);             transform: translateY(-200px);     max-width: 1000px;     -webkit-animation: 200ms slideOut forwards;             animation: 200ms slideOut forwards;   }     .is-active .shopify-buy__modal {       -webkit-animation-name: slideIn;               animation-name: slideIn;     }    .shopify-buy__product {     padding: 30px;   }    .shopify-buy__product-img-wrapper {     height: 100%;     padding-right: 30px;   }    .shopify-buy__product__variant-img {     margin: 0 auto;   }    .shopify-buy__btn--close {     top: -60px;     color: hsl(0, 0%, 100%)   }      .shopify-buy__btn--close:hover {       color: #fff;     } } @media (min-width: 680px) {   .shopify-buy__product {     padding: 45px;   } } ';
  styles.product = 'html, body, h1, h2, h3, h4, h5, p {   padding: 0;   margin: 0; } * {   -webkit-box-sizing: border-box;           box-sizing: border-box; } body, html {   min-height: 100%; } html {   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   font-size: 14px;   line-height: 1.2;   color: #4c4c4c;   text-rendering: optimizeLegibility;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; } select {   text-rendering: auto !important; } ul {   list-style: none;   padding-left: 0;   margin: 0; } img {   display: block;   max-width: 100%; } input {   -webkit-appearance: textfield;   margin: 0; } .clearfix:after {     content: "";     display: table;     clear: both;   } .visuallyhidden {   border: 0;   height: 1px;   margin: -1px;   overflow: hidden;   padding: 0;   position: absolute;   width: 1px; } .component-container {   overflow: hidden; } .shopify-buy__type--center {   text-align: center; } .shopify-buy--visually-hidden {   position: absolute !important;   clip: rect(1px, 1px, 1px, 1px);   padding:0 !important;   border:0 !important;   height: 1px !important;   width: 1px !important;   overflow: hidden; } .shopify-buy__quantity-decrement, .shopify-buy__quantity-increment {   color: #4c4c4c;   display: block;   height: 30px;   float: left;   line-height: 16px;   font-family: monospace;   width: 26px;   padding: 0;   border: none;   background: transparent;   -webkit-box-shadow: none;           box-shadow: none;   cursor: pointer;   font-size: 18px;   text-align: center;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   border: 1px solid #767676;   position: relative } .shopify-buy__quantity-decrement svg, .shopify-buy__quantity-increment svg {     width: 14px;     height: 14px;     position: absolute;     top: 50%;     left: 50%;     margin-top: -6px;     margin-left: -7px;     fill: currentColor;   } .shopify-buy__quantity-decrement {   border-radius: 3px 0 0 3px; } .shopify-buy__quantity-increment {   border-radius: 0 3px 3px 0; } .shopify-buy__quantity {   color: black;   width: 45px;   height: 30px;   font-size: 16px;   border: none;   text-align: center;   -webkit-appearance: none;   -moz-appearance: textfield;   display: inline-block;   padding: 0;   border-radius: 0;   border-top: 1px solid #767676;   border-bottom: 1px solid #767676; } input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {   -webkit-appearance: none;   margin: 0; } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns {   overflow: hidden } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns .shopify-buy__quantity {     border-left: 0;     border-right: 0;     float: left;   } .shopify-buy__btn {   color: #fff;   font-size: 15px;   background-color: #78b657;   padding: 12px 40px;   letter-spacing: .3px;   display: block;   border-radius: 3px;   cursor: pointer;   -webkit-transition: background 200ms ease;   transition: background 200ms ease;   max-width: 100%;   text-overflow: ellipsis;   overflow: hidden;   line-height: 1.2;   border: 0;   -moz-appearance: none;   -webkit-appearance: none } .shopify-buy__btn:hover,   .shopify-buy__btn:focus {     background-color: #5f9d3e;   } .shopify-buy__btn--parent {   background-color: transparent;   border: 0;   padding: 0;   cursor: pointer } .shopify-buy__btn--parent:hover .product__variant-img, .shopify-buy__btn--parent:focus .product__variant-img {       opacity: .7;     } .shopify-buy__btn--cart-tab {   padding: 5px 11px;   border-radius: 3px 0 0 3px;   position: fixed;   right: 0;   top: 50%;   -webkit-transform: translate(100%, -50%);           transform: translate(100%, -50%);   opacity: 0;   min-width: inherit;   width: auto;   height: auto;   z-index: 2147483647 } .shopify-buy__btn--cart-tab.is-active {     -webkit-transform: translateY(-50%);             transform: translateY(-50%);     opacity: 1;   } .shopify-buy__btn__counter {   display: block;   margin: 0 auto 10px auto;   font-size: 18px; } .shopify-buy__icon-cart--side {   height: 20px;   width: 20px; } .shopify-buy__btn[disabled] {   background-color: #999;   pointer-events: none; } .shopify-buy__btn--close {   position: absolute;   right: 9px;   top: 8px;   font-size: 35px;   color: #767676;   border: none;   background-color: transparent;   -webkit-transition: color 100ms ease, -webkit-transform 100ms ease;   transition: color 100ms ease, -webkit-transform 100ms ease;   transition: transform 100ms ease, color 100ms ease;   transition: transform 100ms ease, color 100ms ease, -webkit-transform 100ms ease;   cursor: pointer;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   padding-right: 9px } .shopify-buy__btn--close:hover {     -webkit-transform: scale(1.2);             transform: scale(1.2);     color: hsl(0, 0%, 41.2745098039%);   } .shopify-buy__option-select-wrapper {   border: 1px solid #d3dbe2;   border-radius: 3px;   -webkit-box-sizing: border-box;           box-sizing: border-box;   position: relative;   background: #fff;   vertical-align: bottom; } .shopify-buy__select-icon {   cursor: pointer;   display: block;   fill: #798c9c;   position: absolute;   right: 10px;   top: 50%;   margin-top: -6px;   pointer-events: none;   width: 12px;   height: 12px;   vertical-align: middle; } .shopify-buy__option-select + .shopify-buy__option-select {     margin-top: 7.5px;   } .shopify-buy__option-select__label {   display: block;   font-size: 14px;   margin-top: 15px;   margin-bottom: 5px; } .shopify-buy__btn--parent .shopify-buy__option-select__label {     cursor: pointer;   } .shopify-buy__option-select__select {   font-size: inherit;   padding: 7px 10px;   padding-right: 32px;   border: 0;   width: 100%;   background: transparent;   -webkit-appearance: none;   -moz-appearance: none } .shopify-buy__option-select__select::-ms-expand {     display: none;   } .shopify-buy__btn--parent .shopify-buy__option-select__select {     cursor: pointer;   } .shopify-buy__product {   overflow: hidden;   width: 100%; } .shopify-buy__product__variant-img {   margin: 0 auto 15px auto;   -webkit-transition: opacity 0.3s ease;   transition: opacity 0.3s ease;   opacity: 1 } .shopify-buy__product__variant-img.is-transitioning {     opacity: 0;   } .shopify-buy__is-button {   cursor: pointer; } .shopify-buy__no-image .shopify-buy__product__variant-img {     display: none;   } .shopify-buy__product__title {   font-size: 18px;   line-height: 1.2;   color: #4a4a4a;   margin-bottom: 15px;   font-weight: 700; } .shopify-buy__layout-horizontal .shopify-buy__product__title {     margin-top: 10px;   } .shopify-buy__product__variant-title {   font-size: 18px;   color: #666;   font-weight: 400;   text-align: center;   margin-bottom: 15px; } .shopify-buy__product__price {   margin-bottom: 15px; } .shopify-buy__product-description {   margin-top: 30px;   line-height: 1.65;   color: #4a4a4a } .shopify-buy__product-description p,   .shopify-buy__product-description ul,   .shopify-buy__product-description ol,   .shopify-buy__product-description img {     margin-bottom: 10px   } .shopify-buy__product-description p:last-child, .shopify-buy__product-description ul:last-child, .shopify-buy__product-description ol:last-child, .shopify-buy__product-description img:last-child {       margin-bottom: 0;     } .shopify-buy__product-description a {     color: inherit;   } .shopify-buy__product-description img {     max-width: 100%;   } .shopify-buy__product-description h1 {     font-size: 20px;   } .shopify-buy__product-description h2 {     font-size: 18px;   } .shopify-buy__product-description h3 {     font-size: 17px;   } .shopify-buy__product-description ul,   .shopify-buy__product-description ol {     margin-left: 2em;   } .shopify-buy__product-description ul {     list-style-type: disc;   } .shopify-buy__layout-vertical {   text-align: center; } .shopify-buy__product__actual-price, .shopify-buy__product__compare-price {   color: #4a4a4a;   display: inline-block; } .shopify-buy__product__actual-price {   font-size: 14px; } .shopify-buy__product__compare-price {   font-size: 12px;   text-decoration: line-through;   padding-left: 5px;   opacity: 0.76; } .shopify-buy__product__unit-price {   color: #4a4a4a;   padding-top: 5px;   font-size: 12px;   opacity: 0.8; } .shopify-buy__product__variant-selectors {   text-align: left;   font-size: 14px; } .shopify-buy__layout-vertical .shopify-buy__product__variant-selectors {     width: 100%;     max-width: 280px;     display: inline-block;   } .shopify-buy__quantity {   border-left: 1px solid;   border-right: 1px solid;   border-radius: 3px; } .shopify-buy__quantity, .shopify-buy__quantity-increment, .shopify-buy__quantity-decrement {   border-color: #d3dbe2;   line-height: 1.2;   font-size: 15px;   height: auto;   padding-top: 12px;   padding-bottom: 12px; } .shopify-buy__btn {   display: inline-block; } .shopify-buy__btn-wrapper {   margin-top: 20px; } .shopify-buy__btn.shopify-buy__beside-quantity {   display: inline-block;   vertical-align: top;   border-top-left-radius: 0;   border-bottom-left-radius: 0;   border: 1px solid transparent; } .shopify-buy__btn-and-quantity .shopify-buy__quantity {     border-right: 0;     border-top-right-radius: 0;     border-bottom-right-radius: 0;     background: #fff;   } .shopify-buy__btn-and-quantity .shopify-buy__quantity-container {     display: inline-block;     vertical-align: top;   } .shopify-buy__btn-and-quantity .shopify-buy__btn-wrapper {     display: inline-block;     vertical-align: top;     margin: 0;   } .shopify-buy__cart-item__quantity-container {   margin-top: 20px;   display: inline-block; } .shopify-buy__layout-vertical .shopify-buy__btn,   .shopify-buy__layout-vertical .shopify-buy__quantity-container,   .shopify-buy__layout-horizontal .shopify-buy__btn,   .shopify-buy__layout-horizontal .shopify-buy__quantity-container {     margin: 20px auto 0;   } .shopify-buy__layout-vertical .shopify-buy__btn:first-child, .shopify-buy__layout-horizontal .shopify-buy__btn:first-child {     margin-top: 0;   } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity, .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity {     margin: 20px auto 0   } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity .shopify-buy__btn,     .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity .shopify-buy__btn,     .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity .shopify-buy__quantity-container {       margin: 0 auto;     } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity:first-child, .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity:first-child {     margin: 0 auto;   } .shopify-buy__layout-vertical .shopify-buy__product__variant-img, .shopify-buy__layout-horizontal .shopify-buy__product__variant-img {     max-width: 100%;   } @media (min-width: 500px) {   .shopify-buy__layout-horizontal:not(.no-image) {     text-align: left;     margin-bottom: 0;     margin-left: 0   }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-img-wrapper {       float: left;       width: 40%;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title {       text-align: left;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__price,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-description,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__btn-and-quantity,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__btn-wrapper,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-selectors {       margin-left: calc(40% + 25px);     } } @media (min-width: 680px) {     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-img-wrapper {       float: left;       width: 60%;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__price,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-description,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__btn-and-quantity,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__btn-wrapper,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-selectors {       margin-left: calc(60% + 25px);     } } .no-image .shopify-buy__product-img-wrapper {     display: none;   } @-webkit-keyframes dash {   to {     stroke-dashoffset: 0;   } } @keyframes dash {   to {     stroke-dashoffset: 0;   } } .shopify-buy__carousel {   font-size: 0;   text-align: center;   min-height: 90px;   margin-left: -15px;   margin-top: 15px; } .shopify-buy__carousel-item {   width: calc(16.666% - 15px);   margin-left: 15px;   display: inline-block;   vertical-align: middle;   cursor: pointer;   position: relative;   background-size: cover;   background-position: center;   padding: 0;   border: none } .shopify-buy__carousel-item:nth-child(n+7) {     margin-top: 15px;   } .shopify-buy__carousel-item:before {     content: "";     display: block;     padding-top: 100%;   } .main-image-wrapper {   position: relative; } .carousel-button {   position: absolute;   width: 75px;   top: 0;   height: 100%;   border: none;   font-size: 0;   background-color: transparent;   opacity: 0.4;   cursor: pointer } .carousel-button:hover,   .carousel-button:focus {     opacity: 0.9;     outline: none;   } .carousel-button-arrow {   width: 20px;   display: inline-block;   margin-left: 25px; } .carousel-button--previous {   left: 0;   -webkit-transform: rotate(180deg);           transform: rotate(180deg); } .carousel-button--next {   right: 0; } .shopify-buy__carousel-item--selected {   opacity: 0.4; } ';
  styles.productSet = 'html, body, h1, h2, h3, h4, h5, p {   padding: 0;   margin: 0; } * {   -webkit-box-sizing: border-box;           box-sizing: border-box; } body, html {   min-height: 100%; } html {   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   font-size: 14px;   line-height: 1.2;   color: #4c4c4c;   text-rendering: optimizeLegibility;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; } select {   text-rendering: auto !important; } ul {   list-style: none;   padding-left: 0;   margin: 0; } img {   display: block;   max-width: 100%; } input {   -webkit-appearance: textfield;   margin: 0; } .clearfix:after {     content: "";     display: table;     clear: both;   } .visuallyhidden {   border: 0;   height: 1px;   margin: -1px;   overflow: hidden;   padding: 0;   position: absolute;   width: 1px; } .component-container {   overflow: hidden; } .shopify-buy__type--center {   text-align: center; } .shopify-buy--visually-hidden {   position: absolute !important;   clip: rect(1px, 1px, 1px, 1px);   padding:0 !important;   border:0 !important;   height: 1px !important;   width: 1px !important;   overflow: hidden; } .shopify-buy__btn {   color: #fff;   font-size: 15px;   background-color: #78b657;   padding: 12px 40px;   letter-spacing: .3px;   display: block;   border-radius: 3px;   cursor: pointer;   -webkit-transition: background 200ms ease;   transition: background 200ms ease;   max-width: 100%;   text-overflow: ellipsis;   overflow: hidden;   line-height: 1.2;   border: 0;   -moz-appearance: none;   -webkit-appearance: none } .shopify-buy__btn:hover,   .shopify-buy__btn:focus {     background-color: #5f9d3e;   } .shopify-buy__btn--parent {   background-color: transparent;   border: 0;   padding: 0;   cursor: pointer } .shopify-buy__btn--parent:hover .product__variant-img, .shopify-buy__btn--parent:focus .product__variant-img {       opacity: .7;     } .shopify-buy__btn--cart-tab {   padding: 5px 11px;   border-radius: 3px 0 0 3px;   position: fixed;   right: 0;   top: 50%;   -webkit-transform: translate(100%, -50%);           transform: translate(100%, -50%);   opacity: 0;   min-width: inherit;   width: auto;   height: auto;   z-index: 2147483647 } .shopify-buy__btn--cart-tab.is-active {     -webkit-transform: translateY(-50%);             transform: translateY(-50%);     opacity: 1;   } .shopify-buy__btn__counter {   display: block;   margin: 0 auto 10px auto;   font-size: 18px; } .shopify-buy__icon-cart--side {   height: 20px;   width: 20px; } .shopify-buy__btn[disabled] {   background-color: #999;   pointer-events: none; } .shopify-buy__btn--close {   position: absolute;   right: 9px;   top: 8px;   font-size: 35px;   color: #767676;   border: none;   background-color: transparent;   -webkit-transition: color 100ms ease, -webkit-transform 100ms ease;   transition: color 100ms ease, -webkit-transform 100ms ease;   transition: transform 100ms ease, color 100ms ease;   transition: transform 100ms ease, color 100ms ease, -webkit-transform 100ms ease;   cursor: pointer;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   padding-right: 9px } .shopify-buy__btn--close:hover {     -webkit-transform: scale(1.2);             transform: scale(1.2);     color: hsl(0, 0%, 41.2745098039%);   } .shopify-buy__quantity-decrement, .shopify-buy__quantity-increment {   color: #4c4c4c;   display: block;   height: 30px;   float: left;   line-height: 16px;   font-family: monospace;   width: 26px;   padding: 0;   border: none;   background: transparent;   -webkit-box-shadow: none;           box-shadow: none;   cursor: pointer;   font-size: 18px;   text-align: center;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   border: 1px solid #767676;   position: relative } .shopify-buy__quantity-decrement svg, .shopify-buy__quantity-increment svg {     width: 14px;     height: 14px;     position: absolute;     top: 50%;     left: 50%;     margin-top: -6px;     margin-left: -7px;     fill: currentColor;   } .shopify-buy__quantity-decrement {   border-radius: 3px 0 0 3px; } .shopify-buy__quantity-increment {   border-radius: 0 3px 3px 0; } .shopify-buy__quantity {   color: black;   width: 45px;   height: 30px;   font-size: 16px;   border: none;   text-align: center;   -webkit-appearance: none;   -moz-appearance: textfield;   display: inline-block;   padding: 0;   border-radius: 0;   border-top: 1px solid #767676;   border-bottom: 1px solid #767676; } input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {   -webkit-appearance: none;   margin: 0; } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns {   overflow: hidden } .shopify-buy__quantity-container.shopify-buy__quantity-with-btns .shopify-buy__quantity {     border-left: 0;     border-right: 0;     float: left;   } .shopify-buy__option-select-wrapper {   border: 1px solid #d3dbe2;   border-radius: 3px;   -webkit-box-sizing: border-box;           box-sizing: border-box;   position: relative;   background: #fff;   vertical-align: bottom; } .shopify-buy__select-icon {   cursor: pointer;   display: block;   fill: #798c9c;   position: absolute;   right: 10px;   top: 50%;   margin-top: -6px;   pointer-events: none;   width: 12px;   height: 12px;   vertical-align: middle; } .shopify-buy__option-select + .shopify-buy__option-select {     margin-top: 7.5px;   } .shopify-buy__option-select__label {   display: block;   font-size: 14px;   margin-top: 15px;   margin-bottom: 5px; } .shopify-buy__btn--parent .shopify-buy__option-select__label {     cursor: pointer;   } .shopify-buy__option-select__select {   font-size: inherit;   padding: 7px 10px;   padding-right: 32px;   border: 0;   width: 100%;   background: transparent;   -webkit-appearance: none;   -moz-appearance: none } .shopify-buy__option-select__select::-ms-expand {     display: none;   } .shopify-buy__btn--parent .shopify-buy__option-select__select {     cursor: pointer;   } .shopify-buy__product {   overflow: hidden;   width: 100%; } .shopify-buy__product__variant-img {   margin: 0 auto 15px auto;   -webkit-transition: opacity 0.3s ease;   transition: opacity 0.3s ease;   opacity: 1 } .shopify-buy__product__variant-img.is-transitioning {     opacity: 0;   } .shopify-buy__is-button {   cursor: pointer; } .shopify-buy__no-image .shopify-buy__product__variant-img {     display: none;   } .shopify-buy__product__title {   font-size: 18px;   line-height: 1.2;   color: #4a4a4a;   margin-bottom: 15px;   font-weight: 700; } .shopify-buy__layout-horizontal .shopify-buy__product__title {     margin-top: 10px;   } .shopify-buy__product__variant-title {   font-size: 18px;   color: #666;   font-weight: 400;   text-align: center;   margin-bottom: 15px; } .shopify-buy__product__price {   margin-bottom: 15px; } .shopify-buy__product-description {   margin-top: 30px;   line-height: 1.65;   color: #4a4a4a } .shopify-buy__product-description p,   .shopify-buy__product-description ul,   .shopify-buy__product-description ol,   .shopify-buy__product-description img {     margin-bottom: 10px   } .shopify-buy__product-description p:last-child, .shopify-buy__product-description ul:last-child, .shopify-buy__product-description ol:last-child, .shopify-buy__product-description img:last-child {       margin-bottom: 0;     } .shopify-buy__product-description a {     color: inherit;   } .shopify-buy__product-description img {     max-width: 100%;   } .shopify-buy__product-description h1 {     font-size: 20px;   } .shopify-buy__product-description h2 {     font-size: 18px;   } .shopify-buy__product-description h3 {     font-size: 17px;   } .shopify-buy__product-description ul,   .shopify-buy__product-description ol {     margin-left: 2em;   } .shopify-buy__product-description ul {     list-style-type: disc;   } .shopify-buy__layout-vertical {   text-align: center; } .shopify-buy__product__actual-price, .shopify-buy__product__compare-price {   color: #4a4a4a;   display: inline-block; } .shopify-buy__product__actual-price {   font-size: 14px; } .shopify-buy__product__compare-price {   font-size: 12px;   text-decoration: line-through;   padding-left: 5px;   opacity: 0.76; } .shopify-buy__product__unit-price {   color: #4a4a4a;   padding-top: 5px;   font-size: 12px;   opacity: 0.8; } .shopify-buy__product__variant-selectors {   text-align: left;   font-size: 14px; } .shopify-buy__layout-vertical .shopify-buy__product__variant-selectors {     width: 100%;     max-width: 280px;     display: inline-block;   } .shopify-buy__quantity {   border-left: 1px solid;   border-right: 1px solid;   border-radius: 3px; } .shopify-buy__quantity, .shopify-buy__quantity-increment, .shopify-buy__quantity-decrement {   border-color: #d3dbe2;   line-height: 1.2;   font-size: 15px;   height: auto;   padding-top: 12px;   padding-bottom: 12px; } .shopify-buy__btn {   display: inline-block; } .shopify-buy__btn-wrapper {   margin-top: 20px; } .shopify-buy__btn.shopify-buy__beside-quantity {   display: inline-block;   vertical-align: top;   border-top-left-radius: 0;   border-bottom-left-radius: 0;   border: 1px solid transparent; } .shopify-buy__btn-and-quantity .shopify-buy__quantity {     border-right: 0;     border-top-right-radius: 0;     border-bottom-right-radius: 0;     background: #fff;   } .shopify-buy__btn-and-quantity .shopify-buy__quantity-container {     display: inline-block;     vertical-align: top;   } .shopify-buy__btn-and-quantity .shopify-buy__btn-wrapper {     display: inline-block;     vertical-align: top;     margin: 0;   } .shopify-buy__cart-item__quantity-container {   margin-top: 20px;   display: inline-block; } .shopify-buy__layout-vertical .shopify-buy__btn,   .shopify-buy__layout-vertical .shopify-buy__quantity-container,   .shopify-buy__layout-horizontal .shopify-buy__btn,   .shopify-buy__layout-horizontal .shopify-buy__quantity-container {     margin: 20px auto 0;   } .shopify-buy__layout-vertical .shopify-buy__btn:first-child, .shopify-buy__layout-horizontal .shopify-buy__btn:first-child {     margin-top: 0;   } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity, .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity {     margin: 20px auto 0   } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity .shopify-buy__btn,     .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity .shopify-buy__btn,     .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity .shopify-buy__quantity-container {       margin: 0 auto;     } .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity:first-child, .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity:first-child {     margin: 0 auto;   } .shopify-buy__layout-vertical .shopify-buy__product__variant-img, .shopify-buy__layout-horizontal .shopify-buy__product__variant-img {     max-width: 100%;   } @media (min-width: 500px) {   .shopify-buy__layout-horizontal:not(.no-image) {     text-align: left;     margin-bottom: 0;     margin-left: 0   }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-img-wrapper {       float: left;       width: 40%;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title {       text-align: left;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__price,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-description,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__btn-and-quantity,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__btn-wrapper,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-selectors {       margin-left: calc(40% + 25px);     } } @media (min-width: 680px) {     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-img-wrapper {       float: left;       width: 60%;     }      .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-title,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__price,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product-description,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__btn-and-quantity,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__btn-wrapper,     .shopify-buy__layout-horizontal:not(.no-image) > .shopify-buy__quantity-container,     .shopify-buy__layout-horizontal:not(.no-image) .shopify-buy__product__variant-selectors {       margin-left: calc(60% + 25px);     } } .no-image .shopify-buy__product-img-wrapper {     display: none;   } @-webkit-keyframes dash {   to {     stroke-dashoffset: 0;   } } @keyframes dash {   to {     stroke-dashoffset: 0;   } } .shopify-buy__carousel {   font-size: 0;   text-align: center;   min-height: 90px;   margin-left: -15px;   margin-top: 15px; } .shopify-buy__carousel-item {   width: calc(16.666% - 15px);   margin-left: 15px;   display: inline-block;   vertical-align: middle;   cursor: pointer;   position: relative;   background-size: cover;   background-position: center;   padding: 0;   border: none } .shopify-buy__carousel-item:nth-child(n+7) {     margin-top: 15px;   } .shopify-buy__carousel-item:before {     content: "";     display: block;     padding-top: 100%;   } .main-image-wrapper {   position: relative; } .carousel-button {   position: absolute;   width: 75px;   top: 0;   height: 100%;   border: none;   font-size: 0;   background-color: transparent;   opacity: 0.4;   cursor: pointer } .carousel-button:hover,   .carousel-button:focus {     opacity: 0.9;     outline: none;   } .carousel-button-arrow {   width: 20px;   display: inline-block;   margin-left: 25px; } .carousel-button--previous {   left: 0;   -webkit-transform: rotate(180deg);           transform: rotate(180deg); } .carousel-button--next {   right: 0; } .shopify-buy__carousel-item--selected {   opacity: 0.4; } .shopify-buy__collection {   overflow: hidden; } .shopify-buy__collection-products {   margin-left: -15px;   text-align: center } @media(min-width: 601px) { .shopify-buy__collection-products {     margin-left: -20px }   } .shopify-buy__product {   min-width: 240px;   width: auto;   margin-left: 15px;   display: inline-block;   vertical-align: top } .shopify-buy__product + .shopify-buy__product {     margin-top: 15px;   } @media(min-width: 601px) { .shopify-buy__product {     width: calc(25% - 20px);     margin-left: 20px;     margin-bottom: 50px }      .shopify-buy__product + .shopify-buy__product {       margin-top: 0;     }   } .shopify-buy__btn.shopify-buy__collection-pagination-button  {   display: none;   margin: 15px auto } .shopify-buy__btn.shopify-buy__collection-pagination-button.is-active {     display: block;   }  ';
  styles.toggle = 'html, body, h1, h2, h3, h4, h5, p {   padding: 0;   margin: 0; } * {   -webkit-box-sizing: border-box;           box-sizing: border-box; } body, html {   min-height: 100%; } html {   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   font-size: 14px;   line-height: 1.2;   color: #4c4c4c;   text-rendering: optimizeLegibility;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; } select {   text-rendering: auto !important; } ul {   list-style: none;   padding-left: 0;   margin: 0; } img {   display: block;   max-width: 100%; } input {   -webkit-appearance: textfield;   margin: 0; } .clearfix:after {     content: "";     display: table;     clear: both;   } .visuallyhidden {   border: 0;   height: 1px;   margin: -1px;   overflow: hidden;   padding: 0;   position: absolute;   width: 1px; } .component-container {   overflow: hidden; } .shopify-buy__type--center {   text-align: center; } .shopify-buy--visually-hidden {   position: absolute !important;   clip: rect(1px, 1px, 1px, 1px);   padding:0 !important;   border:0 !important;   height: 1px !important;   width: 1px !important;   overflow: hidden; } .shopify-buy__btn {   color: #fff;   font-size: 15px;   background-color: #78b657;   padding: 12px 40px;   letter-spacing: .3px;   display: block;   border-radius: 3px;   cursor: pointer;   -webkit-transition: background 200ms ease;   transition: background 200ms ease;   max-width: 100%;   text-overflow: ellipsis;   overflow: hidden;   line-height: 1.2;   border: 0;   -moz-appearance: none;   -webkit-appearance: none } .shopify-buy__btn:hover,   .shopify-buy__btn:focus {     background-color: #5f9d3e;   } .shopify-buy__btn--parent {   background-color: transparent;   border: 0;   padding: 0;   cursor: pointer } .shopify-buy__btn--parent:hover .product__variant-img, .shopify-buy__btn--parent:focus .product__variant-img {       opacity: .7;     } .shopify-buy__btn--cart-tab {   padding: 5px 11px;   border-radius: 3px 0 0 3px;   position: fixed;   right: 0;   top: 50%;   -webkit-transform: translate(100%, -50%);           transform: translate(100%, -50%);   opacity: 0;   min-width: inherit;   width: auto;   height: auto;   z-index: 2147483647 } .shopify-buy__btn--cart-tab.is-active {     -webkit-transform: translateY(-50%);             transform: translateY(-50%);     opacity: 1;   } .shopify-buy__btn__counter {   display: block;   margin: 0 auto 10px auto;   font-size: 18px; } .shopify-buy__icon-cart--side {   height: 20px;   width: 20px; } .shopify-buy__btn[disabled] {   background-color: #999;   pointer-events: none; } .shopify-buy__btn--close {   position: absolute;   right: 9px;   top: 8px;   font-size: 35px;   color: #767676;   border: none;   background-color: transparent;   -webkit-transition: color 100ms ease, -webkit-transform 100ms ease;   transition: color 100ms ease, -webkit-transform 100ms ease;   transition: transform 100ms ease, color 100ms ease;   transition: transform 100ms ease, color 100ms ease, -webkit-transform 100ms ease;   cursor: pointer;   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;   padding-right: 9px } .shopify-buy__btn--close:hover {     -webkit-transform: scale(1.2);             transform: scale(1.2);     color: hsl(0, 0%, 41.2745098039%);   } .shopify-buy__cart-toggle-wrapper {   display: inline-block; } .shopify-buy__cart-toggle {   background-color: #78b657;   color: #fff;   border-radius: 3px 0 0 3px;;   padding: 8px 10px;   text-align: center;   display: inline-block;   min-width: 46px;   margin-right: 0;   cursor: pointer;   -webkit-transition: background 200ms ease;   transition: background 200ms ease } .shopify-buy__cart-toggle:hover {     background-color: #5f9d3e;   } .shopify-buy__cart-toggle__count {   font-size: 18px;   margin-bottom: 10px; } .shopify-buy__icon-cart__group {   fill: #fff; } .is-inline .shopify-buy__icon-cart,   .is-inline .shopify-buy__cart-toggle__title,   .is-inline .shopify-buy__cart-toggle__count {     display: inline-block;     vertical-align: middle;   } .is-inline {    .shopify-buy__icon-cart {     margin-right: 5px;   }    .shopify-buy__cart-toggle__title {     font-size: 16px;     font-weight: normal;   }    .shopify-buy__cart-toggle__count {     margin-left: 21px;     margin-bottom: 0;     position: relative   }      .shopify-buy__cart-toggle__count:before {       content: "";       display: block;       position: absolute;       left: -12px;       height: 100%;       width: 1px;       background-color: #fff;       opacity: 0.3;     } } .is-inline.shopify-buy__cart-toggle {     border-radius: 3px;     padding: 5px 10px;   } ';

  var TAB_KEY = 9;
  var trapFocusHandlers = {};
  function removeTrapFocus(container) {
    if (trapFocusHandlers.focusin) {
      container.removeEventListener("focusin", trapFocusHandlers.focusin);
    }

    if (trapFocusHandlers.focusout) {
      container.removeEventListener("focusout", trapFocusHandlers.focusout);
    }

    if (trapFocusHandlers.keydown) {
      container.removeEventListener("keydown", trapFocusHandlers.keydown);
    }
  }
  function trapFocus(container) {
    var focusableElements = container.querySelectorAll("a, button:enabled, input:enabled, select:enabled");
    var firstElement = focusableElements[0];
    var lastElement = focusableElements[focusableElements.length - 1];
    removeTrapFocus(container);

    trapFocusHandlers.focusin = function (event) {
      if (event.target !== firstElement && event.target !== lastElement) {
        return;
      }

      container.addEventListener("keydown", trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
      container.removeEventListener("keydown", trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
      if (event.keyCode !== TAB_KEY) {
        return;
      }

      if (event.target === lastElement && !event.shiftKey) {
        event.preventDefault();
        firstElement.focus();
      }

      if (event.target === firstElement && event.shiftKey) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    container.addEventListener("focusout", trapFocusHandlers.focusout);
    container.addEventListener("focusin", trapFocusHandlers.focusin);
    firstElement.focus();
  }

  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  var ESC_KEY = 27;

  var View =
  /*#__PURE__*/
  function () {
    function View(component) {
      this.component = component;
      this.iframe = null;
      this.node = this.component.node;
      this.template = new Template(this.component.options.templates, this.component.options.contents, this.component.options.order);
      this.eventsBound = false;
    }

    var _proto = View.prototype;

    _proto.init = function init() {
      this.component.node.className += " shopify-buy-frame shopify-buy-frame--".concat(this.component.typeKey);

      if (this.iframe || !this.component.options.iframe) {
        return Promise.resolve(this.iframe);
      }

      this.iframe = new iframe(this.component.node, {
        classes: this.component.classes,
        customStyles: this.component.styles,
        stylesheet: styles[this.component.typeKey],
        browserFeatures: this.component.props.browserFeatures,
        googleFonts: this.component.googleFonts,
        name: this.component.name,
        width: this.component.options.layout === 'vertical' ? this.component.options.width : null
      });
      this.iframe.addClass(this.className);
      return this.iframe.load();
    }
    /**
     * renders string template using viewData to wrapper element.
     */
    ;

    _proto.render = function render() {
      var _this = this;

      this.component._userEvent('beforeRender');

      var html = this.template.render({
        data: this.component.viewData
      }, function (data) {
        return _this.wrapTemplate(data);
      });

      if (!this.wrapper) {
        this.wrapper = this._createWrapper();
      }

      this.updateNode(this.wrapper, html);
      this.resize();

      this.component._userEvent('afterRender');
    }
    /**
     * delegates DOM events to event listeners.
     */
    ;

    _proto.delegateEvents = function delegateEvents() {
      var _this2 = this;

      if (this.eventsBound) {
        return;
      }

      this.closeComponentsOnEsc();
      Object.keys(this.component.DOMEvents).forEach(function (key) {
        var _key$match = key.match(delegateEventSplitter),
            _key$match2 = _slicedToArray(_key$match, 3),
            eventName = _key$match2[1],
            selectorString = _key$match2[2];

        if (selectorString) {
          _this2._on(eventName, selectorString, function (evt, target) {
            _this2.component.DOMEvents[key].call(_this2, evt, target);
          });
        } else {
          _this2.wrapper.addEventListener('click', function (evt) {
            _this2.component.DOMEvents[key].call(_this2, evt);
          });
        }
      });

      if (this.iframe) {
        this.iframe.el.onload = function () {
          _this2.iframe.el.onload = null;

          _this2.reloadIframe();
        };
      }

      this.eventsBound = true;
    };

    _proto.reloadIframe = function reloadIframe() {
      this.node.removeChild(this.iframe.el);
      this.wrapper = null;
      this.iframe = null;
      this.component.init();
    };

    _proto.append = function append(wrapper) {
      if (this.iframe) {
        this.document.body.appendChild(wrapper);
      } else {
        this.component.node.appendChild(wrapper);
      }
    };

    _proto.addClass = function addClass(className) {
      if (this.iframe) {
        this.iframe.addClass(className);
      } else {
        addClassToElement(className, this.component.node);
      }
    };

    _proto.removeClass = function removeClass(className) {
      if (this.iframe) {
        this.iframe.removeClass(className);
      } else {
        removeClassFromElement(className, this.component.node);
      }
    };

    _proto.destroy = function destroy() {
      this.node.parentNode.removeChild(this.node);
    }
    /**
     * update the contents of a DOM node with template
     * @param {String} className - class name to select node.
     * @param {Object} template - template to be rendered.
     */
    ;

    _proto.renderChild = function renderChild(className, template) {
      var selector = ".".concat(className.split(' ').join('.'));
      var node = this.wrapper.querySelector(selector);
      var html = template.render({
        data: this.component.viewData
      });
      this.updateNode(node, html);
    }
    /**
     * call morpdom on a node with new HTML
     * @param {Object} node - DOM node to be updated.
     * @param {String} html - HTML to update DOM node with.
     */
    ;

    _proto.updateNode = function updateNode(node, html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      morphdom(node, div.firstElementChild);
    }
    /**
     * wrap HTML string in containing elements.
     * May be defined in subclass.
     * @param {String} html - HTML string.
     * @return {String} wrapped string.
     */
    ;

    _proto.wrapTemplate = function wrapTemplate(html) {
      return "<div class=\"".concat(this.component.classes[this.component.typeKey][this.component.typeKey], "\">").concat(html, "</div>");
    }
    /**
     * resize iframe if necessary.
     */
    ;

    _proto.resize = function resize() {
      if (!this.iframe || !this.wrapper) {
        return;
      }

      if (this.shouldResizeX) {
        this._resizeX();
      }

      if (this.shouldResizeY) {
        this._resizeY();
      }
    }
    /**
     * get total height of iframe contents
     * @return {String} value in pixels.
     */
    ;

    /**
     * Trap focus in the wrapper.
     */
    _proto.setFocus = function setFocus() {
      trapFocus(this.wrapper);
    }
    /**
     * determines if iframe will require horizontal resizing to contain its children.
     * May be defined in subclass.
     * @return {Boolean}
     */
    ;

    _proto.closeComponentsOnEsc = function closeComponentsOnEsc() {
      var _this3 = this;

      if (!this.iframe) {
        return;
      }

      this.document.addEventListener('keydown', function (evt) {
        if (evt.keyCode !== ESC_KEY) {
          return;
        }

        _this3.component.props.closeModal();

        _this3.component.props.closeCart();
      });
    };

    _proto.animateRemoveNode = function animateRemoveNode(id) {
      var _this4 = this;

      var el = this.document.getElementById(id);
      addClassToElement('is-hidden', el);

      if (this.component.props.browserFeatures.animation) {
        el.addEventListener('animationend', function () {
          if (!el.parentNode) {
            return;
          }

          _this4.removeNode(el);
        });
      } else {
        this.removeNode(el);
      }
    };

    _proto.removeNode = function removeNode(el) {
      el.parentNode.removeChild(el);
      this.render();
    };

    _proto._createWrapper = function _createWrapper() {
      var wrapper = document.createElement('div');
      wrapper.className = this.component.classes[this.component.typeKey][this.component.typeKey];
      this.append(wrapper);
      return wrapper;
    };

    _proto._resizeX = function _resizeX() {
      this.iframe.el.style.width = "".concat(this.document.body.clientWidth, "px");
    };

    _proto._resizeY = function _resizeY(value) {
      var newHeight = value || this.outerHeight;
      this.iframe.el.style.height = newHeight;
    };

    _proto._on = function _on(eventName, selector, fn) {
      var _this5 = this;

      this.wrapper.addEventListener(eventName, function (evt) {
        var possibleTargets = Array.prototype.slice.call(_this5.wrapper.querySelectorAll(selector));
        var target = evt.target;
        possibleTargets.forEach(function (possibleTarget) {
          var el = target;

          while (el && el !== _this5.wrapper) {
            if (el === possibleTarget) {
              return fn.call(possibleTarget, evt, possibleTarget);
            }

            el = el.parentNode;
          }

          return el;
        });
      }, eventName === 'blur');
    };

    _createClass(View, [{
      key: "outerHeight",
      get: function get() {
        var style = window.getComputedStyle(this.wrapper, '');

        if (!style) {
          return "".concat(this.wrapper.clientHeight, "px");
        }

        var height = style.getPropertyValue('height');

        if (!height || height === '0px' || height === 'auto') {
          var clientHeight = this.wrapper.clientHeight;
          height = style.getPropertyValue('height') || "".concat(clientHeight, "px");
        }

        return height;
      }
    }, {
      key: "className",
      get: function get() {
        return '';
      }
    }, {
      key: "shouldResizeX",
      get: function get() {
        return false;
      }
      /**
       * determines if iframe will require vertical resizing to contain its children.
       * May be defined in subclass.
       * @return {Boolean}
       */

    }, {
      key: "shouldResizeY",
      get: function get() {
        return false;
      }
      /**
       * get reference to document object.
       * @return {Objcet} instance of Document.
       */

    }, {
      key: "document",
      get: function get() {
        return this.iframe ? this.iframe.document : window.document;
      }
    }]);

    return View;
  }();

  var Updater =
  /*#__PURE__*/
  function () {
    function Updater(component) {
      this.component = component;
    }

    var _proto = Updater.prototype;

    _proto.updateConfig = function updateConfig(config) {
      this.component.config = merge(this.component.config, config.options);
      this.component.view.template = new Template(this.component.options.templates, this.component.options.contents, this.component.options.order);

      if (this.component.view.iframe) {
        this.component.view.iframe.updateStyles(this.component.styles, this.component.googleFonts);
      }

      this.component.view.render();
      this.component.view.resize();
    };

    return Updater;
  }();

  function moneyFormat() {
    var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMoneyFormat;
    return decodeURIComponent(format);
  }
  /**
   * Manages rendering, lifecycle, and data fetching of a cmoponent.
   */


  var Component =
  /*#__PURE__*/
  function () {
    /**
     * creates a component.
     * @param {Object} config - configuration object.
     * @param {Object} props - data and utilities passed down from UI instance.
     */
    function Component(config, props) {
      this.id = config.id;
      this.storefrontId = config.storefrontId;
      this.handle = config.handle;
      this.node = config.node;
      this.globalConfig = {
        debug: config.debug,
        moneyFormat: moneyFormat(config.moneyFormat),
        cartNode: config.cartNode,
        modalNode: config.modalNode,
        toggles: config.toggles
      };
      this.config = merge({}, defaults, config.options || {});
      this.props = props;
      this.model = {};
      this.updater = new Updater(this);
      this.view = new View(this);
    }
    /**
     * get unique name for component.
     * @return {String} component name.
     */


    var _proto = Component.prototype;

    /**
     * initializes component by creating model and rendering view.
     * @param {Object} [data] - data to initialize model with.
     * @return {Promise} promise resolving to instance.
     */
    _proto.init = function init(data) {
      var _this = this;

      this._userEvent('beforeInit');

      return this.view.init().then(function () {
        return _this.setupModel(data);
      }).then(function (model) {
        _this.model = model;

        _this.view.render();

        _this.view.delegateEvents();

        _this._userEvent('afterInit');

        return _this;
      }).catch(function (err) {
        if (err.message.indexOf('Not Found') > -1) {
          logNotFound(_this);
        }

        throw err;
      });
    }
    /**
     * fetches data if necessary
     * @param {Object} [data] - data to initialize model with.
     */
    ;

    _proto.setupModel = function setupModel(data) {
      if (data) {
        return Promise.resolve(data);
      } else {
        return this.fetchData();
      }
    }
    /**
     * re-assign configuration and re-render component.
     * @param {Object} config - new configuration object.
     */
    ;

    _proto.updateConfig = function updateConfig(config) {
      return this.updater.updateConfig(config);
    }
    /**
     * remove node from DOM.
     */
    ;

    _proto.destroy = function destroy() {
      this.view.destroy();
    };

    _proto._userEvent = function _userEvent(methodName) {
      if (this.globalConfig.debug) {
        logger.info("EVENT: ".concat(methodName, " (").concat(this.typeKey, ")"));
      }

      if (isFunction(this.events[methodName])) {
        this.events[methodName].call(this, this);
      }
    };

    _createClass(Component, [{
      key: "name",
      get: function get() {
        var uniqueHandle = '';

        if (this.id) {
          uniqueHandle = "-".concat(this.id);
        } else if (this.handle) {
          uniqueHandle = "-".concat(this.handle);
        }

        return "frame-".concat(this.typeKey).concat(uniqueHandle);
      }
      /**
       * get configuration options specific to this component.
       * @return {Object} options object.
       */

    }, {
      key: "options",
      get: function get() {
        return merge({}, this.config[this.typeKey]);
      }
      /**
       * get events to be bound to DOM.
       * @return {Object} DOMEvents object.
       */

    }, {
      key: "DOMEvents",
      get: function get() {
        return this.options.DOMEvents || {};
      }
      /**
       * get events to be called on lifecycle methods.
       * @return {Object} events object.
       */

    }, {
      key: "events",
      get: function get() {
        return this.options.events || {};
      }
      /**
       * get classes for component and any components it contains as determined by manifest.
       * @return {Object} class keys and names.
       */

    }, {
      key: "classes",
      get: function get() {
        var _this2 = this;

        return this.options.manifest.filter(function (component) {
          return _this2.config[component].classes;
        }).reduce(function (hash, component) {
          hash[component] = _this2.config[component].classes;
          return hash;
        }, {});
      }
      /**
       * get classes formatted as CSS selectors.
       * @return {Object} class keys and selectors.
       */

    }, {
      key: "selectors",
      get: function get() {
        var _this3 = this;

        return this.options.manifest.filter(function (component) {
          return _this3.config[component].classes;
        }).reduce(function (hash, component) {
          hash[component] = Object.keys(_this3.config[component].classes).reduce(function (classes, classKey) {
            classes[classKey] = ".".concat(_this3.classes[component][classKey].split(' ').join('.'));
            return classes;
          }, {});
          return hash;
        }, {});
      }
      /**
       * get styles for component and any components it contains as determined by manifest.
       * @return {Object} key-value pairs of CSS styles.
       */

    }, {
      key: "styles",
      get: function get() {
        var _this4 = this;

        return this.options.manifest.filter(function (component) {
          return _this4.config[component].styles;
        }).reduce(function (hash, component) {
          hash[component] = _this4.config[component].styles;
          return hash;
        }, {});
      }
      /**
       * get google fonts for component and any components it contains as determined by manifest.
       * @return {Array} array of names of fonts to be loaded.
       */

    }, {
      key: "googleFonts",
      get: function get() {
        var _this5 = this;

        return this.options.manifest.filter(function (component) {
          return _this5.config[component].googleFonts;
        }).reduce(function (fonts, component) {
          return fonts.concat(_this5.config[component].googleFonts);
        }, []);
      }
      /**
       * get data to be passed to view.
       * @return {Object} viewData object.
       */

    }, {
      key: "viewData",
      get: function get() {
        return merge(this.model, this.options.viewData, {
          classes: this.classes,
          text: this.options.text
        });
      }
      /**
       * get callbacks for morphdom lifecycle events.
       * @return {Object} object.
       */

    }, {
      key: "morphCallbacks",
      get: function get() {
        return {
          onBeforeElUpdated: function onBeforeElUpdated(fromEl, toEl) {
            if (fromEl.tagName === 'IMG') {
              if (fromEl.src === toEl.getAttribute('data-src')) {
                return false;
              }
            }

            return true;
          }
        };
      }
    }]);

    return Component;
  }();

  var CheckoutNavigator =
  /*#__PURE__*/
  function () {
    function CheckoutNavigator(config) {
      this.config = config;
    }

    var _proto = CheckoutNavigator.prototype;

    _proto.open = function open(url) {
      if (this.config.cart.popup) {
        window.open(url, 'checkout', this.params);
      } else {
        window.location = url;
      }
    };

    _createClass(CheckoutNavigator, [{
      key: "params",
      get: function get() {
        var config = Object.assign({}, this.config.window, {
          left: window.outerWidth / 2 - 200,
          top: window.outerHeight / 2 - 300
        });
        return Object.keys(config).reduce(function (acc, key) {
          return "".concat(acc).concat(key, "=").concat(config[key], ",");
        }, '');
      }
    }]);

    return CheckoutNavigator;
  }();

  var windowUtils = {
    location: function location() {
      return window.location.href;
    }
  };

  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var thousandsRegex = /(\d)(?=(\d\d\d)+(?!\d))/g;

  function formatWithDelimiters(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var thousands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
    var decimal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

    if (isNaN(number) || number == null) {
      return 0;
    }

    var fixedNumber = (number / 100.0).toFixed(precision);
    var parts = fixedNumber.split('.');
    var dollars = parts[0].replace(thousandsRegex, "$1".concat(thousands));
    var cents = parts[1] ? decimal + parts[1] : '';
    return dollars + cents;
  }

  function formatMoney(amount, format) {
    var cents = amount * 100;

    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }

    var value = '';
    var formatString = format || defaultMoneyFormat;
    var placeholderMatch = formatString.match(placeholderRegex);

    if (!placeholderMatch) {
      formatString = defaultMoneyFormat;
      placeholderMatch = formatString.match(placeholderRegex);
    }

    switch (placeholderMatch[1]) {
      case 'amount':
        value = formatWithDelimiters(cents);
        break;

      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;

      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;

      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;

      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;

      default:
        value = formatWithDelimiters(cents);
    }

    return formatString.replace(placeholderRegex, value);
  }

  function normalizeId(type, databaseKey) {
    return "gid://shopify/".concat(type, "/").concat(databaseKey);
  }

  function getNormalizedIdFromConfig(type, config, databaseKey, storefrontKey) {
    var denormalizedValue = config[databaseKey];
    var normalizedValue = config[storefrontKey];

    if (normalizedValue) {
      return normalizedValue;
    } else if (denormalizedValue) {
      if (Array.isArray(denormalizedValue)) {
        return denormalizedValue.map(function (value) {
          return normalizeId(type, value);
        });
      } else {
        return normalizeId(type, denormalizedValue);
      }
    } else {
      return null;
    }
  }

  function normalizeConfig(config) {
    var baseResourceType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Product';

    if (config.id || config.storefrontId) {
      config.storefrontId = getNormalizedIdFromConfig(baseResourceType, config, 'id', 'storefrontId');
    }

    if (config.variantId || config.storefrontVariantId) {
      config.storefrontVariantId = getNormalizedIdFromConfig('ProductVariant', config, 'variantId', 'storefrontVariantId');
    }

    return config;
  }

  function detectCSSFeature(featurename) {
    var feature = false,
        domPrefixes = 'Webkit Moz ms O'.split(' '),
        elm = document.createElement('div'),
        featurenameCapital = null;
    featurename = featurename.toLowerCase();

    if (elm.style[featurename] !== undefined) {
      feature = true;
    }

    if (feature === false) {
      featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);

      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + featurenameCapital] !== undefined) {
          feature = true;
          break;
        }
      }
    }

    return feature;
  }

  var supportsAnimations = function supportsAnimations() {
    return detectCSSFeature('animation');
  };

  var supportsTransitions = function supportsTransitions() {
    return detectCSSFeature('transition');
  };

  var supportsTransforms = function supportsTransforms() {
    return detectCSSFeature('transform');
  };

  var supportsWindowOpen = function supportsWindowOpen() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (userAgent.indexOf('Mac OS X') === -1) {
      return true;
    }

    var unSupportedApps = ['Instagram', 'Pinterest/iOS', 'FBAN/FBIOS', 'FBAN/MessengerForiOS'];
    return !unSupportedApps.some(function (appName) {
      return userAgent.indexOf(appName) > -1;
    });
  };

  var browserFeatures = {
    animation: supportsAnimations(),
    transition: supportsTransitions(),
    transform: supportsTransforms(),
    windowOpen: supportsWindowOpen
  };

  function getUnitString(unitEnum) {
    if (unitEnum === 'L') {
      return 'L';
    } else if (unitEnum === 'M3') {
      return 'm³';
    } else if (unitEnum === 'M2') {
      return 'm²';
    } else {
      return unitEnum.toLowerCase();
    }
  }

  function getUnitPriceBaseUnit(referenceValue, referenceUnit) {
    var unitString = getUnitString(referenceUnit);

    if (referenceValue === 1) {
      return "".concat(unitString);
    }

    return "".concat(referenceValue).concat(unitString);
  }

  var ProductView =
  /*#__PURE__*/
  function (_View) {
    _inheritsLoose(ProductView, _View);

    function ProductView() {
      return _View.apply(this, arguments) || this;
    }

    var _proto = ProductView.prototype;

    /**
     * add event listener which triggers resize when the product image is loaded.
     */
    _proto.resizeOnLoad = function resizeOnLoad() {
      var _this = this;

      var productContents = this.component.config.product.contents;

      if (!(productContents.img || productContents.imgWithCarousel)) {
        return;
      }

      var image = this.wrapper.getElementsByClassName(this.component.classes.product.img)[0];

      if (!image) {
        return;
      }

      image.addEventListener('load', function () {
        _this.resize();
      });
    }
    /**
     * renders string template using viewData to wrapper element.
     * Resizes iframe to match image size.
     */
    ;

    _proto.render = function render() {
      _View.prototype.render.call(this);

      this.resizeOnLoad();
    };

    _proto.wrapTemplate = function wrapTemplate(html) {
      var ariaLabel;

      switch (this.component.options.buttonDestination) {
        case 'modal':
          ariaLabel = 'View details';
          break;

        case 'cart':
          ariaLabel = 'Add to cart';
          break;

        default:
          ariaLabel = 'Buy Now';
      }

      if (this.component.isButton) {
        return "<div class=\"".concat(this.wrapperClass, " ").concat(this.component.classes.product.product, "\"><div tabindex=\"0\" role=\"button\" aria-label=\"").concat(ariaLabel, "\" class=\"").concat(this.component.classes.product.blockButton, "\">").concat(html, "</div></div>");
      } else {
        return "<div class=\"".concat(this.wrapperClass, " ").concat(this.component.classes.product.product, "\">").concat(html, "</div>");
      }
    };

    _createClass(ProductView, [{
      key: "className",
      get: function get() {
        return this.component.classes.product[this.component.options.layout];
      }
    }, {
      key: "shouldResizeX",
      get: function get() {
        return false;
      }
    }, {
      key: "shouldResizeY",
      get: function get() {
        return true;
      }
    }, {
      key: "outerHeight",
      get: function get() {
        return "".concat(this.wrapper.clientHeight, "px");
      }
    }, {
      key: "wrapperClass",
      get: function get() {
        return "".concat(this.component.currentImage ? 'has-image' : 'no-image', " ").concat(this.component.classes.product[this.component.options.layout]);
      }
    }]);

    return ProductView;
  }(View);

  var MAX_WIDTH = '950px';

  var ProductUpdater =
  /*#__PURE__*/
  function (_Updater) {
    _inheritsLoose(ProductUpdater, _Updater);

    function ProductUpdater() {
      return _Updater.apply(this, arguments) || this;
    }

    var _proto = ProductUpdater.prototype;

    _proto.updateConfig = function updateConfig(config) {
      var _this = this;

      var newConfig = normalizeConfig(config);

      if (newConfig.storefrontId || newConfig.storefrontVariantId) {
        this.component.storefrontId = newConfig.storefrontId || this.component.storefrontId;
        this.component.defaultStorefrontVariantId = newConfig.storefrontVariantId || this.component.defaultStorefrontVariantId;
        this.component.init();
        return;
      }

      var layout = this.component.options.layout;

      if (config.options && config.options.product) {
        if (config.options.product.layout) {
          layout = config.options.product.layout;
        }

        if (this.component.view.iframe) {
          if (layout === 'vertical' && this.component.view.iframe.width === MAX_WIDTH) {
            this.component.view.iframe.setWidth(this.component.options.width);
          }

          if (layout === 'horizontal' && this.component.view.iframe.width && this.component.view.iframe.width !== MAX_WIDTH) {
            this.component.view.iframe.setWidth(MAX_WIDTH);
          }

          if (config.options.product.width && layout === 'vertical') {
            this.component.view.iframe.setWidth(config.options.product.width);
          }

          if (config.options.product.layout) {
            this.component.view.iframe.el.style.width = '100%';
          }
        }
      }

      if (this.component.view.iframe) {
        this.component.view.iframe.removeClass(this.component.classes.product.vertical);
        this.component.view.iframe.removeClass(this.component.classes.product.horizontal);
        this.component.view.iframe.addClass(this.component.classes.product[layout]);
        this.component.view.resize();
      }

      _toConsumableArray(this.component.view.wrapper.querySelectorAll('img')).forEach(function (img) {
        img.addEventListener('load', function () {
          _this.component.view.resize();
        });
      });

      _Updater.prototype.updateConfig.call(this, config);

      if (this.component.cart) {
        this.component.cart.updateConfig(config);
      }

      if (this.component.modal) {
        this.component.modal.updateConfig(Object.assign({}, config, {
          options: Object.assign({}, this.component.config, {
            product: this.component.modalProductConfig
          })
        }));
      }
    };

    return ProductUpdater;
  }(Updater);

  function isFunction$1(obj) {
    return Boolean(obj && obj.constructor && obj.call && obj.apply);
  }

  function isPseudoSelector$1(key) {
    return key.charAt(0) === ':';
  }

  function isMedia$1(key) {
    return key.charAt(0) === '@';
  }

  var ENTER_KEY = 13;
  var propertiesWhitelist = ['background', 'background-color', 'border', 'border-radius', 'color', 'border-color', 'border-width', 'border-style', 'transition', 'text-transform', 'text-shadow', 'box-shadow', 'font-size', 'font-family'];

  function whitelistedProperties(selectorStyles) {
    return Object.keys(selectorStyles).reduce(function (filteredStyles, propertyName) {
      if (isPseudoSelector$1(propertyName) || isMedia$1(propertyName)) {
        filteredStyles[propertyName] = whitelistedProperties(selectorStyles[propertyName]);
        return filteredStyles;
      }

      if (propertiesWhitelist.indexOf(propertyName) > -1) {
        filteredStyles[propertyName] = selectorStyles[propertyName];
      }

      return filteredStyles;
    }, {});
  }
  /**
   * Renders and fetches data for product embed.
   * @extends Component.
   */


  var Product$1 =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Product, _Component);

    /**
     * create Product.
     * @param {Object} config - configuration object.
     * @param {Object} props - data and utilities passed down from UI instance.
     */
    function Product(config, props) {
      var _this;

      // eslint-disable-next-line no-param-reassign
      config = normalizeConfig(config);
      _this = _Component.call(this, config, props) || this;
      _this.typeKey = 'product';
      _this.defaultStorefrontVariantId = config.storefrontVariantId;
      _this.cachedImage = null;
      _this.childTemplate = new Template(_this.config.option.templates, _this.config.option.contents, _this.config.option.order);
      _this.cart = null;
      _this.modal = null;
      _this.imgStyle = '';
      _this.selectedQuantity = 1;
      _this.selectedVariant = {};
      _this.selectedOptions = {};
      _this.selectedImage = null;
      _this.modalProduct = Boolean(config.modalProduct);
      _this.updater = new ProductUpdater(_assertThisInitialized(_this));
      _this.view = new ProductView(_assertThisInitialized(_this));
      return _this;
    }
    /**
     * determines when image src should be updated
     * @return {Boolean}
     */


    var _proto = Product.prototype;

    /**
     * prevent events from bubbling if entire product is being treated as button.
     */
    _proto.stopPropagation = function stopPropagation(evt) {
      if (this.isButton) {
        evt.stopImmediatePropagation();
      }
    }
    /**
     * get HTML for product options selector.
     * @return {String} HTML
     */
    ;

    /**
     * determines whether an option can resolve to an available variant given current selections
     * @return {Boolean}
     */
    _proto.optionValueCanBeSelected = function optionValueCanBeSelected(selections, name, value) {
      var variants = this.variantArray;
      var selectableValues = Object.assign({}, selections, _defineProperty({}, name, value));
      var satisfactoryVariants = variants.filter(function (variant) {
        var matchingOptions = Object.keys(selectableValues).filter(function (key) {
          return variant.optionValues[key] === selectableValues[key];
        });
        return matchingOptions.length === Object.keys(selectableValues).length;
      });
      var variantSelectable = false;
      variantSelectable = satisfactoryVariants.reduce(function (variantExists, variant) {
        var variantAvailable = variant.available;

        if (!variantExists) {
          return variantAvailable;
        }

        return variantExists;
      }, false);
      return variantSelectable;
    }
    /**
     * get options for product with selected value.
     * @return {Array}
     */
    ;

    /**
     * open online store in new tab.
     */
    _proto.openOnlineStore = function openOnlineStore() {
      this._userEvent('openOnlineStore');

      window.open(this.onlineStoreURL);
    }
    /**
     * initializes component by creating model and rendering view.
     * Creates and initalizes cart if necessary.
     * @param {Object} [data] - data to initialize model with.
     * @return {Promise} promise resolving to instance.
     */
    ;

    _proto.init = function init(data) {
      var _this2 = this;

      return this.createCart().then(function (cart) {
        _this2.cart = cart;
        return _Component.prototype.init.call(_this2, data).then(function (model) {
          if (model) {
            _this2.view.render();
          }

          return model;
        });
      });
    }
    /**
     * creates cart if necessary.
     * @return {Promise}
     */
    ;

    _proto.createCart = function createCart() {
      var cartConfig = Object.assign({}, this.globalConfig, {
        node: this.globalConfig.cartNode,
        options: this.config
      });
      return this.props.createCart(cartConfig);
    }
    /**
     * fetches data if necessary.
     * Sets default variant for product.
     * @param {Object} [data] - data to initialize model with.
     */
    ;

    _proto.setupModel = function setupModel(data) {
      var _this3 = this;

      return _Component.prototype.setupModel.call(this, data).then(function (model) {
        return _this3.setDefaultVariant(model);
      });
    }
    /**
     * fetch product data from API.
     * @return {Promise} promise resolving to model data.
     */
    ;

    _proto.sdkFetch = function sdkFetch() {
      if (this.storefrontId && Array.isArray(this.storefrontId) && this.storefrontId[0]) {
        return this.props.client.product.fetch(this.storefrontId[0]);
      } else if (this.storefrontId && !Array.isArray(this.storefrontId)) {
        return this.props.client.product.fetch(this.storefrontId);
      } else if (this.handle) {
        return this.props.client.product.fetchByHandle(this.handle).then(function (product) {
          return product;
        });
      }

      return Promise.reject(new Error('SDK Fetch Failed'));
    }
    /**
     * call sdkFetch and set selected quantity to 0.
     * @throw 'Not Found' if model not returned.
     * @return {Promise} promise resolving to model data.
     */
    ;

    _proto.fetchData = function fetchData() {
      var _this4 = this;

      return this.sdkFetch().then(function (model) {
        if (model) {
          _this4.storefrontId = model.id;
          _this4.handle = model.handle;
          return model;
        }

        throw new Error('Not Found');
      });
    };

    _proto.onButtonClick = function onButtonClick(evt, target) {
      evt.stopPropagation();

      if (isFunction$1(this.options.buttonDestination)) {
        this.options.buttonDestination(this);
      } else if (this.options.buttonDestination === 'cart') {
        this.props.closeModal();

        this._userEvent('addVariantToCart');

        this.props.tracker.trackMethod(this.cart.addVariantToCart.bind(this), 'Update Cart', this.selectedVariantTrackingInfo)(this.selectedVariant, this.selectedQuantity);

        if (!this.modalProduct) {
          this.props.setActiveEl(target);
        }
      } else if (this.options.buttonDestination === 'modal') {
        this.props.setActiveEl(target);
        this.props.tracker.track('Open modal', this.productTrackingInfo);
        this.openModal();
      } else if (this.options.buttonDestination === 'onlineStore') {
        this.openOnlineStore();
      } else {
        this._userEvent('openCheckout');

        this.props.tracker.track('Direct Checkout', {});
        var checkoutWindow;

        if (this.config.cart.popup && browserFeatures.windowOpen()) {
          var params = new CheckoutNavigator(this.config).params;
          checkoutWindow = window.open('', 'checkout', params);
        } else {
          checkoutWindow = window;
        }

        var input = {
          lineItems: [{
            variantId: this.selectedVariant.id,
            quantity: this.selectedQuantity
          }]
        };
        this.props.client.checkout.create(input).then(function (checkout) {
          checkoutWindow.location = checkout.webUrl;
        });
      }
    };

    _proto.onBlockButtonKeyup = function onBlockButtonKeyup(evt, target) {
      if (evt.keyCode === ENTER_KEY) {
        this.onButtonClick(evt, target);
      }
    };

    _proto.onOptionSelect = function onOptionSelect(evt) {
      var target = evt.target;
      var value = target.options[target.selectedIndex].value;
      var name = target.getAttribute('name');
      this.updateVariant(name, value);
    };

    _proto.onQuantityBlur = function onQuantityBlur(evt, target) {
      this.updateQuantity(function () {
        return parseInt(target.value, 10);
      });
    };

    _proto.onQuantityIncrement = function onQuantityIncrement(qty) {
      this.updateQuantity(function (prevQty) {
        return prevQty + qty;
      });
    };

    _proto.closeCartOnBgClick = function closeCartOnBgClick() {
      if (this.cart && this.cart.isVisible) {
        this.cart.close();
      }
    };

    _proto.onCarouselItemClick = function onCarouselItemClick(evt, target) {
      evt.preventDefault();
      var selectedImageId = target.getAttribute('data-image-id');
      var imageList = this.model.images;
      var foundImage = imageList.find(function (image) {
        return image.id === selectedImageId;
      });

      if (foundImage) {
        this.selectedImage = foundImage;
        this.cachedImage = foundImage;
      }

      this.view.render();
    };

    _proto.nextIndex = function nextIndex(currentIndex, offset) {
      var nextIndex = currentIndex + offset;

      if (nextIndex >= this.model.images.length) {
        return 0;
      }

      if (nextIndex < 0) {
        return this.model.images.length - 1;
      }

      return nextIndex;
    };

    _proto.onCarouselChange = function onCarouselChange(offset) {
      var _this5 = this;

      var imageList = this.model.images;
      var currentImage = imageList.filter(function (image) {
        return image.id === _this5.currentImage.id;
      })[0];
      var currentImageIndex = imageList.indexOf(currentImage);
      this.selectedImage = imageList[this.nextIndex(currentImageIndex, offset)];
      this.cachedImage = this.selectedImage;
      this.view.render();
    }
    /**
     * create modal instance and initialize.
     * @return {Promise} promise resolving to modal instance
     */
    ;

    _proto.openModal = function openModal() {
      if (!this.modal) {
        var modalConfig = Object.assign({}, this.globalConfig, {
          node: this.globalConfig.modalNode,
          options: Object.assign({}, this.config, {
            product: this.modalProductConfig,
            modal: Object.assign({}, this.config.modal, {
              googleFonts: this.options.googleFonts
            })
          })
        });
        this.modal = this.props.createModal(modalConfig, this.props);
      }

      this._userEvent('openModal');

      return this.modal.init(this.model);
    }
    /**
     * update quantity of selected variant and rerender.
     * @param {Function} fn - function which returns new quantity given current quantity.
     */
    ;

    _proto.updateQuantity = function updateQuantity(fn) {
      var quantity = fn(this.selectedQuantity);

      if (quantity < 0) {
        quantity = 0;
      }

      this.selectedQuantity = quantity;

      this._userEvent('updateQuantity');

      this.view.render();
    }
    /**
     * Update variant based on option value.
     * @param {String} optionName - name of option being modified.
     * @param {String} value - value of selected option.
     * @return {Object} updated option object.
     */
    ;

    _proto.updateVariant = function updateVariant(optionName, value) {
      var _this6 = this;

      var updatedOption = this.model.options.find(function (option) {
        return option.name === optionName;
      });

      if (updatedOption) {
        this.selectedOptions[updatedOption.name] = value;
        this.selectedVariant = this.props.client.product.helpers.variantForOptions(this.model, this.selectedOptions);
      }

      if (this.variantExists) {
        this.cachedImage = this.selectedVariant.image;

        if (this.selectedVariant.image) {
          this.selectedImage = null;
        } else {
          this.selectedImage = this.model.images[0]; // get cached image
        }
      } else {
        this.selectedImage = this.model.images.find(function (image) {
          return image.id === _this6.cachedImage.id;
        });
      }

      this.view.render();

      this._userEvent('updateVariant');

      return updatedOption;
    }
    /**
     * set default variant to be selected on initialization.
     * @param {Object} model - model to be modified.
     */
    ;

    _proto.setDefaultVariant = function setDefaultVariant(model) {
      var _this7 = this;

      var selectedVariant;

      if (this.defaultStorefrontVariantId) {
        selectedVariant = model.variants.find(function (variant) {
          return variant.id === _this7.defaultStorefrontVariantId;
        });
      } else {
        this.defaultStorefrontVariantId = model.variants[0].id;
        selectedVariant = model.variants[0];
        this.selectedImage = model.images[0];
      }

      if (!selectedVariant) {
        selectedVariant = model.variants[0];
      }

      this.selectedOptions = selectedVariant.selectedOptions.reduce(function (acc, option) {
        acc[option.name] = option.value;
        return acc;
      }, {});
      this.selectedVariant = selectedVariant;
      return model;
    };

    _proto.imageAltText = function imageAltText(altText) {
      return altText || this.model.title;
    };

    _createClass(Product, [{
      key: "shouldUpdateImage",
      get: function get() {
        return !this.cachedImage || this.image && this.image.src !== this.cachedImage;
      }
      /**
       * get image for product and cache it. Return caches image if shouldUpdateImage is false.
       * @return {Object} image objcet.
       */

    }, {
      key: "currentImage",
      get: function get() {
        if (this.shouldUpdateImage) {
          this.cachedImage = this.image;
        }

        return this.cachedImage;
      }
      /**
       * get image for selected variant and size based on options or layout.
       * @return {Object} image object.
       */

    }, {
      key: "image",
      get: function get() {
        var DEFAULT_IMAGE_SIZE = 480;
        var MODAL_IMAGE_SIZE = 550;

        if (!(this.selectedVariant || this.options.contents.imgWithCarousel)) {
          return null;
        }

        var imageSize;

        if (this.options.width && this.options.width.slice(-1) === '%') {
          imageSize = 1000;
        } else {
          imageSize = parseInt(this.options.width, 10) || DEFAULT_IMAGE_SIZE;
        }

        var id;
        var src;
        var srcLarge;
        var srcOriginal;
        var altText;
        var imageOptions = {
          maxWidth: imageSize,
          maxHeight: imageSize * 1.5
        };
        var imageOptionsLarge = {
          maxWidth: MODAL_IMAGE_SIZE,
          maxHeight: MODAL_IMAGE_SIZE * 1.5
        };

        if (this.selectedImage) {
          id = this.selectedImage.id;
          src = this.props.client.image.helpers.imageForSize(this.selectedImage, imageOptions);
          srcLarge = this.props.client.image.helpers.imageForSize(this.selectedImage, imageOptionsLarge);
          srcOriginal = this.selectedImage.src;
          altText = this.imageAltText(this.selectedImage.altText);
        } else if (this.selectedVariant.image == null && this.model.images[0] == null) {
          id = null;
          src = '';
          srcLarge = '';
          srcOriginal = '';
          altText = '';
        } else if (this.selectedVariant.image == null) {
          id = this.model.images[0].id;
          src = this.model.images[0].src;
          srcLarge = this.props.client.image.helpers.imageForSize(this.model.images[0], imageOptionsLarge);
          srcOriginal = this.model.images[0].src;
          altText = this.imageAltText(this.model.images[0].altText);
        } else {
          id = this.selectedVariant.image.id;
          src = this.props.client.image.helpers.imageForSize(this.selectedVariant.image, imageOptions);
          srcLarge = this.props.client.image.helpers.imageForSize(this.selectedVariant.image, imageOptionsLarge);
          srcOriginal = this.selectedVariant.image.src;
          altText = this.imageAltText(this.selectedVariant.image.altText);
        }

        return {
          id: id,
          src: src,
          srcLarge: srcLarge,
          srcOriginal: srcOriginal,
          altText: altText
        };
      }
      /**
       * get formatted cart subtotal based on moneyFormat
       * @return {String}
       */

    }, {
      key: "formattedPrice",
      get: function get() {
        if (!this.selectedVariant) {
          return '';
        }

        return formatMoney(this.selectedVariant.priceV2.amount, this.globalConfig.moneyFormat);
      }
      /**
       * get formatted cart subtotal based on moneyFormat
       * @return {String}
       */

    }, {
      key: "formattedCompareAtPrice",
      get: function get() {
        if (!this.hasCompareAtPrice) {
          return '';
        }

        return formatMoney(this.selectedVariant.compareAtPriceV2.amount, this.globalConfig.moneyFormat);
      }
      /**
       * get whether unit price string should be displayed
       * @return {Boolean}
       */

    }, {
      key: "showUnitPrice",
      get: function get() {
        if (!this.selectedVariant || !this.selectedVariant.unitPrice || !this.options.contents.unitPrice) {
          return false;
        }

        return true;
      }
      /**
       * get formatted variant unit price amount based on moneyFormat
       * @return {String}
       */

    }, {
      key: "formattedUnitPrice",
      get: function get() {
        if (!this.showUnitPrice) {
          return '';
        }

        return formatMoney(this.selectedVariant.unitPrice.amount, this.globalConfig.moneyFormat);
      }
      /**
       * get formatted variant unit price base unit
       * @return {String}
       */

    }, {
      key: "formattedUnitPriceBaseUnit",
      get: function get() {
        if (!this.showUnitPrice) {
          return '';
        }

        var unitPriceMeasurement = this.selectedVariant.unitPriceMeasurement;
        return getUnitPriceBaseUnit(unitPriceMeasurement.referenceValue, unitPriceMeasurement.referenceUnit);
      }
      /**
       * get data to be passed to view.
       * @return {Object} viewData object.
       */

    }, {
      key: "viewData",
      get: function get() {
        return Object.assign({}, this.model, this.options.viewData, {
          classes: this.classes,
          contents: this.options.contents,
          text: this.options.text,
          optionsHtml: this.optionsHtml,
          decoratedOptions: this.decoratedOptions,
          currentImage: this.currentImage,
          buttonClass: this.buttonClass,
          hasVariants: this.hasVariants,
          buttonDisabled: !this.buttonEnabled,
          selectedVariant: this.selectedVariant,
          selectedQuantity: this.selectedQuantity,
          buttonText: this.buttonText,
          imgStyle: this.imgStyle,
          quantityClass: this.quantityClass,
          priceClass: this.priceClass,
          formattedPrice: this.formattedPrice,
          priceAccessibilityLabel: this.priceAccessibilityLabel,
          hasCompareAtPrice: this.hasCompareAtPrice,
          formattedCompareAtPrice: this.formattedCompareAtPrice,
          compareAtPriceAccessibilityLabel: this.compareAtPriceAccessibilityLabel,
          showUnitPrice: this.showUnitPrice,
          formattedUnitPrice: this.formattedUnitPrice,
          formattedUnitPriceBaseUnit: this.formattedUnitPriceBaseUnit,
          carouselIndex: 0,
          carouselImages: this.carouselImages
        });
      }
    }, {
      key: "carouselImages",
      get: function get() {
        var _this8 = this;

        return this.model.images.map(function (image) {
          return {
            id: image.id,
            src: image.src,
            carouselSrc: _this8.props.client.image.helpers.imageForSize(image, {
              maxWidth: 100,
              maxHeight: 100
            }),
            isSelected: image.id === _this8.currentImage.id,
            altText: _this8.imageAltText(image.altText)
          };
        });
      }
    }, {
      key: "buttonClass",
      get: function get() {
        var disabledClass = this.buttonEnabled ? '' : this.classes.product.disabled;
        var quantityClass = this.options.contents.buttonWithQuantity ? this.classes.product.buttonBesideQty : '';
        return "".concat(disabledClass, " ").concat(quantityClass);
      }
    }, {
      key: "quantityClass",
      get: function get() {
        return this.options.contents.quantityIncrement || this.options.contents.quantityDecrement ? this.classes.product.quantityWithButtons : '';
      }
    }, {
      key: "buttonText",
      get: function get() {
        if (this.options.buttonDestination === 'modal') {
          return this.options.text.button;
        }

        if (!this.variantExists) {
          return this.options.text.unavailable;
        }

        if (!this.variantInStock) {
          return this.options.text.outOfStock;
        }

        return this.options.text.button;
      }
    }, {
      key: "buttonEnabled",
      get: function get() {
        return this.options.buttonDestination === 'modal' || this.buttonActionAvailable && this.variantExists && this.variantInStock;
      }
    }, {
      key: "variantExists",
      get: function get() {
        var _this9 = this;

        return this.model.variants.some(function (variant) {
          if (_this9.selectedVariant) {
            return variant.id === _this9.selectedVariant.id;
          } else {
            return false;
          }
        });
      }
    }, {
      key: "variantInStock",
      get: function get() {
        return this.variantExists && this.selectedVariant.available;
      }
    }, {
      key: "hasVariants",
      get: function get() {
        return this.model.variants.length > 1;
      }
    }, {
      key: "requiresCart",
      get: function get() {
        return this.options.buttonDestination === 'cart';
      }
    }, {
      key: "buttonActionAvailable",
      get: function get() {
        return !this.requiresCart || Boolean(this.cart);
      }
    }, {
      key: "hasQuantity",
      get: function get() {
        return this.options.contents.quantityInput;
      }
    }, {
      key: "priceClass",
      get: function get() {
        return this.hasCompareAtPrice ? this.classes.product.loweredPrice : '';
      }
    }, {
      key: "isButton",
      get: function get() {
        return this.options.isButton && !(this.options.contents.button || this.options.contents.buttonWithQuantity);
      }
      /**
       * get events to be bound to DOM.
       * @return {Object}
       */

    }, {
      key: "DOMEvents",
      get: function get() {
        var _merge;

        return merge({}, (_merge = {
          click: this.closeCartOnBgClick.bind(this)
        }, _defineProperty(_merge, "click ".concat(this.selectors.option.select), this.stopPropagation.bind(this)), _defineProperty(_merge, "focus ".concat(this.selectors.option.select), this.stopPropagation.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.option.wrapper), this.stopPropagation.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.quantityInput), this.stopPropagation.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.quantityButton), this.stopPropagation.bind(this)), _defineProperty(_merge, "change ".concat(this.selectors.option.select), this.onOptionSelect.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.button), this.onButtonClick.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.blockButton), this.onButtonClick.bind(this)), _defineProperty(_merge, "keyup ".concat(this.selectors.product.blockButton), this.onBlockButtonKeyup.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.quantityIncrement), this.onQuantityIncrement.bind(this, 1)), _defineProperty(_merge, "click ".concat(this.selectors.product.quantityDecrement), this.onQuantityIncrement.bind(this, -1)), _defineProperty(_merge, "blur ".concat(this.selectors.product.quantityInput), this.onQuantityBlur.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.carouselItem), this.onCarouselItemClick.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.product.carouselNext), this.onCarouselChange.bind(this, 1)), _defineProperty(_merge, "click ".concat(this.selectors.product.carouselPrevious), this.onCarouselChange.bind(this, -1)), _merge), this.options.DOMEvents);
      }
    }, {
      key: "optionsHtml",
      get: function get() {
        var _this10 = this;

        if (!this.options.contents.options) {
          return '';
        }

        var uniqueId = Date.now();
        return this.decoratedOptions.reduce(function (acc, option, index) {
          var data = merge(option, _this10.options.viewData);
          data.classes = _this10.classes;
          data.selectId = "Option-".concat(uniqueId, "-").concat(index);
          data.onlyOption = _this10.model.options.length === 1;
          return acc + _this10.childTemplate.render({
            data: data
          });
        }, '');
      }
      /**
       * get product variants with embedded options
       * @return {Array} array of variants
       */

    }, {
      key: "variantArray",
      get: function get() {
        delete this.variantArrayMemo;
        this.variantArrayMemo = this.model.variants.map(function (variant) {
          var betterVariant = {
            id: variant.id,
            available: variant.available,
            optionValues: {}
          };
          variant.optionValues.forEach(function (optionValue) {
            betterVariant.optionValues[optionValue.name] = optionValue.value;
          });
          return betterVariant;
        });
        return this.variantArrayMemo;
      }
    }, {
      key: "decoratedOptions",
      get: function get() {
        var _this11 = this;

        return this.model.options.map(function (option) {
          return {
            name: option.name,
            values: option.values.map(function (value) {
              return {
                name: value.value,
                selected: _this11.selectedOptions[option.name] === value.value
              };
            })
          };
        });
      }
      /**
       * get info about product to be sent to tracker
       * @return {Object}
       */

    }, {
      key: "trackingInfo",
      get: function get() {
        var variant = this.selectedVariant || this.model.variants[0];
        var contents = this.options.contents;
        var contentString = Object.keys(contents).filter(function (key) {
          return contents[key];
        }).toString();
        return {
          id: this.model.id,
          name: this.model.title,
          variantId: variant.id,
          variantName: variant.title,
          price: variant.priceV2.amount,
          destination: this.options.buttonDestination,
          layout: this.options.layout,
          contents: contentString,
          checkoutPopup: this.config.cart.popup,
          sku: null
        };
      }
      /**
       * get info about variant to be sent to tracker
       * @return {Object}
       */

    }, {
      key: "selectedVariantTrackingInfo",
      get: function get() {
        var variant = this.selectedVariant;
        return {
          id: variant.id,
          name: variant.title,
          productId: this.model.id,
          productName: this.model.title,
          quantity: this.selectedQuantity,
          price: variant.priceV2.amount,
          sku: null
        };
      }
      /**
       * get info about product to be sent to tracker
       * @return {Object}
       */

    }, {
      key: "productTrackingInfo",
      get: function get() {
        return {
          id: this.model.id
        };
      }
      /**
       * get configuration object for product details modal based on product config and modalProduct config.
       * @return {Object} configuration object.
       */

    }, {
      key: "modalProductConfig",
      get: function get() {
        var _this12 = this;

        var modalProductStyles;

        if (this.config.product.styles) {
          modalProductStyles = merge({}, Object.keys(this.config.product.styles).reduce(function (productStyles, selectorKey) {
            productStyles[selectorKey] = whitelistedProperties(_this12.config.product.styles[selectorKey]);
            return productStyles;
          }, {}), this.config.modalProduct.styles);
        } else {
          modalProductStyles = {};
        }

        return Object.assign({}, this.config.modalProduct, {
          styles: modalProductStyles
        });
      }
      /**
       * get params for online store URL.
       * @return {Object}
       */

    }, {
      key: "onlineStoreParams",
      get: function get() {
        return {
          channel: 'buy_button',
          referrer: encodeURIComponent(windowUtils.location()),
          variant: this.selectedVariant.id.split('/')[4]
        };
      }
      /**
       * get query string for online store URL from params
       * @return {String}
       */

    }, {
      key: "onlineStoreQueryString",
      get: function get() {
        var _this13 = this;

        return Object.keys(this.onlineStoreParams).reduce(function (string, key) {
          return "".concat(string).concat(key, "=").concat(_this13.onlineStoreParams[key], "&");
        }, '?');
      }
      /**
       * get URL to open online store page for product.
       * @return {String}
       */

    }, {
      key: "onlineStoreURL",
      get: function get() {
        return "".concat(this.model.onlineStoreUrl).concat(this.onlineStoreQueryString);
      }
    }, {
      key: "priceAccessibilityLabel",
      get: function get() {
        return this.hasCompareAtPrice ? this.options.text.salePriceAccessibilityLabel : this.options.text.regularPriceAccessibilityLabel;
      }
    }, {
      key: "compareAtPriceAccessibilityLabel",
      get: function get() {
        return this.hasCompareAtPrice ? this.options.text.regularPriceAccessibilityLabel : '';
      }
    }, {
      key: "hasCompareAtPrice",
      get: function get() {
        return Boolean(this.selectedVariant && this.selectedVariant.compareAtPriceV2);
      }
    }]);

    return Product;
  }(Component);

  var ModalView =
  /*#__PURE__*/
  function (_View) {
    _inheritsLoose(ModalView, _View);

    function ModalView() {
      return _View.apply(this, arguments) || this;
    }

    var _proto = ModalView.prototype;

    _proto.wrapTemplate = function wrapTemplate(html) {
      return "<div class=\"".concat(this.component.classes.modal.overlay, "\"><div class=\"").concat(this.component.classes.modal.modal, "\">").concat(html, "</div></div>");
    }
    /**
     * close modal.
     */
    ;

    _proto.close = function close() {
      var _this = this;

      this.component.isVisible = false;
      removeTrapFocus(this.wrapper);

      if (this.wrapper && this._closeOnBgClick) {
        this.wrapper.removeEventListener('click', this._closeOnBgClick);
      }

      removeClassFromElement('is-active', this.wrapper);
      removeClassFromElement('is-active', this.document.body);
      removeClassFromElement('shopify-buy-modal-is-active', document.body);
      removeClassFromElement('shopify-buy-modal-is-active', document.getElementsByTagName('html')[0]);

      if (!this.iframe) {
        removeClassFromElement('is-active', this.component.node);
        removeClassFromElement('is-block', this.component.node);
        return;
      }

      this.iframe.removeClass('is-block');

      if (this.component.props.browserFeatures.transition) {
        this.iframe.parent.addEventListener('transitionend', function () {
          _this.iframe.removeClass('is-active');
        });
      } else {
        this.iframe.removeClass('is-active');
      }
    }
    /**
     * delegates DOM events to event listeners.
     * Adds event listener to wrapper to close modal on click.
     */
    ;

    _proto.delegateEvents = function delegateEvents() {
      _View.prototype.delegateEvents.call(this);

      this._closeOnBgClick = this.component.closeOnBgClick.bind(this.component);
      this.wrapper.addEventListener('click', this._closeOnBgClick);
    };

    _proto.render = function render() {
      if (!this.component.isVisible) {
        return;
      }

      _View.prototype.render.call(this);

      addClassToElement('is-active', this.document.body);
      addClassToElement('shopify-buy-modal-is-active', document.body);
      addClassToElement('shopify-buy-modal-is-active', document.getElementsByTagName('html')[0]);
      addClassToElement('is-active', this.wrapper);

      if (this.iframe) {
        this.iframe.addClass('is-active');
        this.iframe.addClass('is-block');
      } else {
        addClassToElement('is-active', this.component.node);
        addClassToElement('is-block', this.component.node);
      }
    };

    return ModalView;
  }(View);

  var ModalUpdater =
  /*#__PURE__*/
  function (_Updater) {
    _inheritsLoose(ModalUpdater, _Updater);

    function ModalUpdater() {
      return _Updater.apply(this, arguments) || this;
    }

    var _proto = ModalUpdater.prototype;

    _proto.updateConfig = function updateConfig(config) {
      var _this = this;

      _Updater.prototype.updateConfig.call(this, config);

      this.component.product = new Product$1(this.component.productConfig, this.component.props);
      return this.component.product.init(this.component.model).then(function () {
        return _this.component.view.resize();
      });
    };

    return ModalUpdater;
  }(Updater);

  /**
   * Renders product modal.
   * @extends Component.
   */

  var Modal =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Modal, _Component);

    /**
     * create Modal.
     * @param {Object} config - configuration object.
     * @param {Object} props - data and utilities passed down from UI instance.
     */
    function Modal(config, props) {
      var _this;

      _this = _Component.call(this, config, props) || this;
      _this.typeKey = 'modal';
      _this.node = config.node ? config.node.appendChild(document.createElement('div')) : document.body.appendChild(document.createElement('div'));
      _this.node.className = 'shopify-buy-modal-wrapper';
      _this.product = null;
      _this.updater = new ModalUpdater(_assertThisInitialized(_this));
      _this.view = new ModalView(_assertThisInitialized(_this));
      return _this;
    }
    /**
     * get events to be bound to DOM.
     * Combines Product events with modal events.
     * @return {Object}
     */


    var _proto = Modal.prototype;

    _proto.closeOnBgClick = function closeOnBgClick(evt) {
      if (!this.productWrapper.contains(evt.target)) {
        this.props.closeModal();
      }
    }
    /**
     * initializes component by creating model and rendering view.
     * Creates and initializes product component.
     * @param {Object} [data] - data to initialize model with.
     * @return {Promise} promise resolving to instance.
    */
    ;

    _proto.init = function init(data) {
      var _this2 = this;

      this.isVisible = true;
      return _Component.prototype.init.call(this, data).then(function () {
        _this2.productWrapper = _this2.view.wrapper.getElementsByClassName(_this2.classes.modal.modal)[0];
        _this2.product = new Product$1(_this2.productConfig, _this2.props);
        return _this2.product.init(_this2.model).then(function () {
          _this2.view.setFocus();

          return _this2.view.resize();
        });
      });
    }
    /**
     * close modal.
     */
    ;

    _proto.close = function close() {
      this._userEvent('closeModal');

      this.view.close();
    };

    _createClass(Modal, [{
      key: "DOMEvents",
      get: function get() {
        return Object.assign({}, _defineProperty({}, "click ".concat(this.selectors.modal.close), this.props.closeModal.bind(this)), this.options.DOMEvents);
      }
      /**
       * get configuration object for product within modal. Set product node to modal contents.
       * @return {Object}
       */

    }, {
      key: "productConfig",
      get: function get() {
        return Object.assign({}, this.globalConfig, {
          node: this.productWrapper,
          options: merge({}, this.config),
          modalProduct: true
        });
      }
    }]);

    return Modal;
  }(Component);

  var ProductSetUpdater =
  /*#__PURE__*/
  function (_Updater) {
    _inheritsLoose(ProductSetUpdater, _Updater);

    function ProductSetUpdater() {
      return _Updater.apply(this, arguments) || this;
    }

    var _proto = ProductSetUpdater.prototype;

    _proto.updateConfig = function updateConfig(config) {
      _Updater.prototype.updateConfig.call(this, config);

      this.component.products[0].updateConfig({
        options: Object.assign({}, config.options)
      });
      this.component.cart.updateConfig(config);
      this.component.renderProducts();
    };

    return ProductSetUpdater;
  }(Updater);

  var pollInterval = 200;

  var ProductSetView =
  /*#__PURE__*/
  function (_View) {
    _inheritsLoose(ProductSetView, _View);

    function ProductSetView(component) {
      var _this;

      _this = _View.call(this, component) || this;
      _this.height = 0;
      _this.resizeCompleted = false;
      return _this;
    }

    var _proto = ProductSetView.prototype;

    _proto.wrapTemplate = function wrapTemplate(html) {
      return "<div class=\"".concat(this.component.classes.productSet.productSet, "\">").concat(html, "</div>");
    }
    /**
     * resize iframe until it is tall enough to contain all products.
     */
    ;

    _proto.resizeUntilFits = function resizeUntilFits() {
      var _this2 = this;

      if (!this.iframe || this.resizeCompleted) {
        return;
      }

      var maxResizes = this.component.products.length;
      var resizes = 0;
      this.height = this.outerHeight;
      this.resize();
      var productSetResize = setInterval(function () {
        var currentHeight = _this2.outerHeight;

        if (parseInt(currentHeight, 10) > parseInt(_this2.height, 10)) {
          resizes++;
          _this2.height = currentHeight;

          _this2.resize(currentHeight);
        }

        if (resizes > maxResizes) {
          _this2.resizeCompleted = true;
          clearInterval(productSetResize);
        }
      }, pollInterval);
    };

    _createClass(ProductSetView, [{
      key: "shouldResizeY",
      get: function get() {
        return true;
      }
    }]);

    return ProductSetView;
  }(View);

  function isArray$1(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  /**
   * Renders and fetches data for collection and product set embed.
   * @extends Component.
   */


  var ProductSet =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ProductSet, _Component);

    /**
     * create ProductSet
     * @param {Object} config - configuration object.
     * @param {Object} props - data and utilities passed down from UI instance.
     */
    function ProductSet(config, props) {
      var _this;

      if (Array.isArray(config.id)) {
        // eslint-disable-next-line no-param-reassign
        config = normalizeConfig(config);
      } else {
        // eslint-disable-next-line no-param-reassign
        config = normalizeConfig(config, 'Collection');
      }

      _this = _Component.call(this, config, props) || this;
      _this.typeKey = 'productSet';
      _this.products = [];
      _this.cart = null;
      _this.page = 1;
      _this.nextModel = {
        products: []
      };
      _this.updater = new ProductSetUpdater(_assertThisInitialized(_this));
      _this.view = new ProductSetView(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = ProductSet.prototype;

    /**
     * initializes component by creating model and rendering view.
     * Creates and initalizes cart if necessary.
     * Calls renderProducts.
     * @param {Object} [data] - data to initialize model with.
     * @return {Promise} promise resolving to instance.
     */
    _proto.init = function init(data) {
      var _this2 = this;

      var cartConfig = Object.assign({}, this.globalConfig, {
        node: this.globalConfig.cartNode,
        options: this.config
      });
      return this.props.createCart(cartConfig).then(function (cart) {
        _this2.cart = cart;
        return _Component.prototype.init.call(_this2, data).then(function (model) {
          if (model) {
            return _this2.renderProducts(_this2.model.products);
          }

          return _this2;
        });
      });
    }
    /**
     * fetches products from SDK based on provided config information.
     * @param {Object} options - query options for request
     * @return {Promise} promise resolving to collection data.
     */
    ;

    _proto.sdkFetch = function sdkFetch() {
      var _this3 = this;

      var promise;

      if (this.storefrontId) {
        if (Array.isArray(this.storefrontId)) {
          promise = this.props.client.product.fetchMultiple(this.storefrontId);
        } else {
          promise = this.props.client.collection.fetchWithProducts(this.storefrontId);
        }
      } else if (this.handle) {
        promise = this.props.client.collection.fetchByHandle(this.handle).then(function (collection) {
          _this3.storefrontId = collection.id;
          return _this3.props.client.collection.fetchWithProducts(_this3.storefrontId);
        });
      }

      return promise.then(function (collectionOrProducts) {
        var products;

        if (Array.isArray(collectionOrProducts)) {
          products = collectionOrProducts;
        } else {
          products = collectionOrProducts.products;
        }

        return products;
      });
    }
    /**
     * call sdkFetch and set model.products to products array.
     * @throw 'Not Found' if model not returned.
     * @return {Promise} promise resolving to model data.
     */
    ;

    _proto.fetchData = function fetchData() {
      return this.sdkFetch().then(function (products) {
        if (products.length) {
          return {
            products: products
          };
        }

        throw new Error('Not Found');
      });
    }
    /**
     * make request to SDK for next page. Render button if products on next page exist.
     * @return {Promise} promise resolving when button is rendered or not.
     */
    ;

    _proto.showPagination = function showPagination() {
      var _this4 = this;

      return this.props.client.fetchNextPage(this.model.products).then(function (data) {
        _this4.nextModel = {
          products: data.model
        };

        _this4.view.renderChild(_this4.classes.productSet.paginationButton, _this4.paginationTemplate);

        _this4.view.resize();

        return;
      });
    }
    /**
     * append next page worth of products into the DOM
     */
    ;

    _proto.nextPage = function nextPage() {
      this.model = this.nextModel;

      this._userEvent('loadNextPage');

      this.renderProducts();
    }
    /**
     * render product components into productSet container. Show pagination button if necessary.
     * @return {Promise} promise resolving to instance.
     */
    ;

    _proto.renderProducts = function renderProducts() {
      var _this5 = this;

      if (!this.model.products.length) {
        return Promise.resolve();
      }

      var productConfig = Object.assign({}, this.globalConfig, {
        node: this.view.document.querySelector(".".concat(this.classes.productSet.products)),
        options: merge({}, this.config, {
          product: {
            iframe: false,
            classes: {
              wrapper: this.classes.productSet.product
            }
          }
        })
      });

      if (this.config.productSet.iframe === false) {
        productConfig.node = this.node.querySelector(".".concat(this.classes.productSet.products));
      }

      var promises = this.model.products.map(function (productModel) {
        var product = new Product$1(productConfig, _this5.props);

        _this5.products.push(product);

        return product.init(productModel);
      });
      return Promise.all(promises).then(function () {
        _this5.view.resizeUntilFits();

        var hasPagination = _this5.model.products[0].hasOwnProperty('hasNextPage');

        if (_this5.options.contents.pagination && hasPagination) {
          _this5.showPagination();
        }

        return _this5;
      });
    };

    _createClass(ProductSet, [{
      key: "nextButtonClass",
      get: function get() {
        return this.nextModel.products.length ? 'is-active' : '';
      }
      /**
       * get data to be passed to view.
       * @return {Object} viewData object.
       */

    }, {
      key: "viewData",
      get: function get() {
        return Object.assign({}, this.options.viewData, {
          classes: this.classes,
          text: this.options.text,
          nextButtonClass: this.nextButtonClass
        });
      }
      /**
       * get events to be bound to DOM.
       * @return {Object}
       */

    }, {
      key: "DOMEvents",
      get: function get() {
        return Object.assign({}, _defineProperty({
          click: this.props.closeCart.bind(this)
        }, "click ".concat(this.selectors.productSet.paginationButton), this.nextPage.bind(this)), this.options.DOMEvents);
      }
      /**
       * get template for rendering pagination button.
       * @return {Object} Template instance
       */

    }, {
      key: "paginationTemplate",
      get: function get() {
        this._paginationTemplate = this._paginationTemplate || new Template({
          pagination: this.options.templates.pagination
        }, {
          pagination: true
        }, ['pagination']);
        return this._paginationTemplate;
      }
      /**
       * get info about collection or set to be sent to tracker
       * @return {Object|Array}
       */

    }, {
      key: "trackingInfo",
      get: function get() {
        var contents = this.config.product.contents;
        var contentString = Object.keys(contents).filter(function (key) {
          return contents[key];
        }).toString();
        var config = {
          destination: this.config.product.buttonDestination,
          layout: this.config.product.layout,
          contents: contentString,
          checkoutPopup: this.config.cart.popup
        };

        if (isArray$1(this.id)) {
          return this.model.products.map(function (product) {
            var variant = product.variants[0];
            return Object.assign({}, config, {
              id: product.id,
              name: product.title,
              variantId: variant.id,
              variantName: variant.title,
              price: variant.priceV2.amount,
              sku: null,
              isProductSet: true
            });
          });
        }

        return Object.assign(config, {
          id: this.storefrontId
        });
      }
    }]);

    return ProductSet;
  }(Component);

  var ENTER_KEY$1 = 13;
  var SPACE_KEY = 32;

  var ToggleView =
  /*#__PURE__*/
  function (_View) {
    _inheritsLoose(ToggleView, _View);

    function ToggleView() {
      return _View.apply(this, arguments) || this;
    }

    var _proto = ToggleView.prototype;

    _proto.render = function render() {
      _View.prototype.render.call(this);

      if (this.component.options.sticky) {
        this.addClass('is-sticky');
      }

      if (this.isVisible) {
        this.addClass('is-active');
      } else {
        this.removeClass('is-active');
      }

      if (this.iframe) {
        this.iframe.parent.setAttribute('tabindex', 0);
        this.iframe.parent.setAttribute('role', 'button');
        this.iframe.parent.setAttribute('aria-label', this.component.options.text.title);
        this.resize();
      }
    };

    _proto.delegateEvents = function delegateEvents() {
      var _this = this;

      _View.prototype.delegateEvents.call(this);

      if (!this.iframe) {
        return;
      }

      this.iframe.parent.addEventListener('keydown', function (evt) {
        if (evt.keyCode !== ENTER_KEY$1 && evt.keyCode !== SPACE_KEY) {
          return;
        }

        evt.preventDefault();

        _this.component.props.setActiveEl(_this.node);

        _this.component.props.cart.toggleVisibility(_this.component.props.cart);
      });
    };

    _proto.wrapTemplate = function wrapTemplate(html) {
      return "<div class=\"".concat(this.stickyClass, " ").concat(this.component.classes.toggle.toggle, "\">\n      ").concat(html, "\n      ").concat(this.readableLabel, "\n    </div>");
    };

    _proto._resizeX = function _resizeX() {
      this.iframe.el.style.width = "".concat(this.wrapper.clientWidth, "px");
    };

    _createClass(ToggleView, [{
      key: "shouldResizeY",
      get: function get() {
        return true;
      }
    }, {
      key: "shouldResizeX",
      get: function get() {
        return true;
      }
    }, {
      key: "isVisible",
      get: function get() {
        return this.component.count > 0;
      }
    }, {
      key: "stickyClass",
      get: function get() {
        return this.component.options.sticky ? 'is-sticky' : 'is-inline';
      }
    }, {
      key: "outerHeight",
      get: function get() {
        return "".concat(this.wrapper.clientHeight, "px");
      }
    }, {
      key: "readableLabel",
      get: function get() {
        if (this.component.options.contents.title) {
          return '';
        }

        return "<p class=\"shopify-buy--visually-hidden\">".concat(this.component.options.text.title, "</p>");
      }
    }]);

    return ToggleView;
  }(View);

  var CartToggle =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(CartToggle, _Component);

    function CartToggle(config, props) {
      var _this;

      _this = _Component.call(this, config, props) || this;
      _this.typeKey = 'toggle';
      _this.node = config.node || _this.props.cart.node.parentNode.insertBefore(document.createElement('div'), _this.props.cart.node);
      _this.view = new ToggleView(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = CartToggle.prototype;

    _proto.toggleCart = function toggleCart(evt) {
      evt.stopPropagation();
      this.props.setActiveEl(this.view.node);
      this.props.cart.toggleVisibility();
    };

    _createClass(CartToggle, [{
      key: "count",
      get: function get() {
        if (!this.props.cart.model) {
          return 0;
        }

        return this.props.cart.model.lineItems.reduce(function (acc, lineItem) {
          return acc + lineItem.quantity;
        }, 0);
      }
    }, {
      key: "viewData",
      get: function get() {
        return Object.assign({}, this.options.viewData, {
          classes: this.classes,
          text: this.options.text,
          count: this.count
        });
      }
    }, {
      key: "DOMEvents",
      get: function get() {
        return merge({}, {
          click: this.toggleCart.bind(this)
        }, this.options.DOMEvents);
      }
    }]);

    return CartToggle;
  }(Component);

  var CartView =
  /*#__PURE__*/
  function (_View) {
    _inheritsLoose(CartView, _View);

    function CartView(component) {
      var _this;

      _this = _View.call(this, component) || this;
      _this.node.className = 'shopify-buy-cart-wrapper';
      return _this;
    }

    var _proto = CartView.prototype;

    _proto.render = function render() {
      _View.prototype.render.call(this);

      if (this.component.isVisible) {
        this.addClass('is-active');
        this.addClass('is-visible');
        this.addClass('is-initialized');

        if (this.iframe) {
          addClassToElement('is-block', this.iframe.el);
        }
      } else {
        this.removeClass('is-active');

        if (!this.component.props.browserFeatures.transition) {
          this.removeClass('is-visible');

          if (this.iframe) {
            removeClassFromElement('is-block', this.iframe.el);
          }
        }
      }
    };

    _proto.delegateEvents = function delegateEvents() {
      var _this2 = this;

      _View.prototype.delegateEvents.call(this);

      if (this.component.props.browserFeatures.transition) {
        this.node.addEventListener('transitionend', function () {
          if (_this2.component.isVisible) {
            return;
          }

          _this2.removeClass('is-visible');

          if (_this2.iframe) {
            removeClassFromElement('is-block', _this2.iframe.el);
          }
        });
      }
    };

    _proto.wrapTemplate = function wrapTemplate(html) {
      return "<div class=\"".concat(this.component.classes.cart.cart, "\">").concat(html, "</div>");
    };

    _createClass(CartView, [{
      key: "wrapperClass",
      get: function get() {
        return this.component.isVisible ? 'is-active' : '';
      }
    }]);

    return CartView;
  }(View);

  var CartUpdater =
  /*#__PURE__*/
  function (_Updater) {
    _inheritsLoose(CartUpdater, _Updater);

    function CartUpdater() {
      return _Updater.apply(this, arguments) || this;
    }

    var _proto = CartUpdater.prototype;

    _proto.updateConfig = function updateConfig(config) {
      _Updater.prototype.updateConfig.call(this, config);

      this.component.toggles.forEach(function (toggle) {
        return toggle.updateConfig(config);
      });
    };

    return CartUpdater;
  }(Updater);

  var NO_IMG_URL = '//sdks.shopifycdn.com/buy-button/latest/no-image.jpg';
  var LINE_ITEM_TARGET_SELECTIONS = ['ENTITLED', 'EXPLICIT'];
  var CART_TARGET_SELECTION = 'ALL';
  /**
   * Renders and cart embed.
   * @extends Component.
   */

  var Cart =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Cart, _Component);

    /**
     * create Cart.
     * @param {Object} config - configuration object.
     * @param {Object} props - data and utilities passed down from UI instance.
     */
    function Cart(config, props) {
      var _this;

      _this = _Component.call(this, config, props) || this;
      _this.addVariantToCart = _this.addVariantToCart.bind(_assertThisInitialized(_this));
      _this.childTemplate = new Template(_this.config.lineItem.templates, _this.config.lineItem.contents, _this.config.lineItem.order);
      _this.node = config.node || document.body.appendChild(document.createElement('div'));
      _this.isVisible = _this.options.startOpen;
      _this.lineItemCache = [];
      _this.moneyFormat = _this.globalConfig.moneyFormat;
      _this.checkout = new CheckoutNavigator(_this.config);
      var toggles = _this.globalConfig.toggles || [{
        node: _this.node.parentNode.insertBefore(document.createElement('div'), _this.node)
      }];
      _this.toggles = toggles.map(function (toggle) {
        return new CartToggle(merge({}, config, toggle), Object.assign({}, _this.props, {
          cart: _assertThisInitialized(_this)
        }));
      });
      _this.updater = new CartUpdater(_assertThisInitialized(_this));
      _this.view = new CartView(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = Cart.prototype;

    _proto.createToggles = function createToggles(config) {
      var _this2 = this;

      this.toggles = this.toggles.concat(config.toggles.map(function (toggle) {
        return new CartToggle(merge({}, config, toggle), Object.assign({}, _this2.props, {
          cart: _this2
        }));
      }));
      return Promise.all(this.toggles.map(function (toggle) {
        return toggle.init({
          lineItems: _this2.lineItems
        });
      }));
    }
    /**
     * get key for configuration object.
     * @return {String}
     */
    ;

    _proto.imageForLineItem = function imageForLineItem(lineItem) {
      var imageSize = 180;
      var imageOptions = {
        maxWidth: imageSize,
        maxHeight: imageSize
      };

      if (lineItem.variant.image) {
        return this.props.client.image.helpers.imageForSize(lineItem.variant.image, imageOptions);
      } else {
        return NO_IMG_URL;
      }
    }
    /**
     * sets model to null and removes checkout from localStorage
     * @return {Promise} promise resolving to the cart model
     */
    ;

    _proto.removeCheckout = function removeCheckout() {
      this.model = null;
      localStorage.removeItem(this.localStorageCheckoutKey);
      return this.model;
    }
    /**
     * get model data either by calling client.createCart or loading from localStorage.
     * @return {Promise} promise resolving to cart instance.
     */
    ;

    _proto.fetchData = function fetchData() {
      var _this3 = this;

      var checkoutId = localStorage.getItem(this.localStorageCheckoutKey);

      if (checkoutId) {
        return this.props.client.checkout.fetch(checkoutId).then(function (checkout) {
          _this3.model = checkout;

          if (checkout.completedAt) {
            return _this3.removeCheckout();
          }

          return _this3.sanitizeCheckout(checkout).then(function (newCheckout) {
            _this3.updateCache(newCheckout.lineItems);

            return newCheckout;
          });
        }).catch(function () {
          return _this3.removeCheckout();
        });
      } else {
        return Promise.resolve(null);
      }
    };

    _proto.sanitizeCheckout = function sanitizeCheckout(checkout) {
      var lineItemsToDelete = checkout.lineItems.filter(function (item) {
        return !item.variant;
      });

      if (!lineItemsToDelete.length) {
        return Promise.resolve(checkout);
      }

      var lineItemIds = lineItemsToDelete.map(function (item) {
        return item.id;
      });
      return this.props.client.checkout.removeLineItems(checkout.id, lineItemIds).then(function (newCheckout) {
        return newCheckout;
      });
    };

    _proto.fetchMoneyFormat = function fetchMoneyFormat() {
      return this.props.client.shop.fetchInfo().then(function (res) {
        return res.moneyFormat;
      });
    }
    /**
     * initializes component by creating model and rendering view.
     * Creates and initalizes toggle component.
     * @param {Object} [data] - data to initialize model with.
     * @return {Promise} promise resolving to instance.
     */
    ;

    _proto.init = function init(data) {
      var _this4 = this;

      if (!this.moneyFormat) {
        this.fetchMoneyFormat().then(function (moneyFormat) {
          _this4.moneyFormat = moneyFormat;
        });
      }

      return _Component.prototype.init.call(this, data).then(function (cart) {
        return _this4.toggles.map(function (toggle) {
          var lineItems = cart.model ? cart.model.lineItems : [];
          return toggle.init({
            lineItems: lineItems
          });
        });
      }).then(function () {
        return _this4;
      });
    };

    _proto.destroy = function destroy() {
      _Component.prototype.destroy.call(this);

      this.toggles.forEach(function (toggle) {
        return toggle.destroy();
      });
    }
    /**
     * closes cart
     */
    ;

    _proto.close = function close() {
      this.isVisible = false;
      this.view.render();
      removeTrapFocus(this.view.wrapper);
    }
    /**
     * opens cart
     */
    ;

    _proto.open = function open() {
      this.isVisible = true;
      this.view.render();
      this.setFocus();
    }
    /**
     * toggles cart visibility
     * @param {Boolean} visible - desired state.
     */
    ;

    _proto.toggleVisibility = function toggleVisibility(visible) {
      this.isVisible = visible || !this.isVisible;
      this.view.render();

      if (this.isVisible) {
        this.setFocus();
      }
    };

    _proto.onQuantityBlur = function onQuantityBlur(evt, target) {
      this.setQuantity(target, function () {
        return parseInt(target.value, 10);
      });
    };

    _proto.onQuantityIncrement = function onQuantityIncrement(qty, evt, target) {
      this.setQuantity(target, function (prevQty) {
        return prevQty + qty;
      });
    };

    _proto.onCheckout = function onCheckout() {
      this._userEvent('openCheckout');

      this.props.tracker.track('Open cart checkout', {});
      this.checkout.open(this.model.webUrl);
    }
    /**
     * set quantity for a line item.
     * @param {Object} target - DOM node of line item
     * @param {Function} fn - function to return new quantity given currrent quantity.
     */
    ;

    _proto.setQuantity = function setQuantity(target, fn) {
      var id = target.getAttribute('data-line-item-id');
      var item = this.model.lineItems.find(function (lineItem) {
        return lineItem.id === id;
      });
      var newQty = fn(item.quantity);
      return this.props.tracker.trackMethod(this.updateItem.bind(this), 'Update Cart', this.cartItemTrackingInfo(item, newQty))(id, newQty);
    };

    _proto.setNote = function setNote(evt) {
      var _this5 = this;

      var note = evt.target.value;
      return this.props.client.checkout.updateAttributes(this.model.id, {
        note: note
      }).then(function (checkout) {
        _this5.model = checkout;
        return checkout;
      });
    }
    /**
     * set cache using line items.
     * @param {Array} lineItems - array of GraphModel line item objects.
     */
    ;

    _proto.updateCache = function updateCache(lineItems) {
      var cachedLineItems = this.lineItemCache.reduce(function (acc, item) {
        acc[item.id] = item;
        return acc;
      }, {});
      this.lineItemCache = lineItems.map(function (item) {
        return Object.assign({}, cachedLineItems[item.id], item);
      });
      return this.lineItemCache;
    }
    /**
     * update cached line item.
     * @param {Number} id - lineItem id.
     * @param {Number} qty - quantity for line item.
     */
    ;

    _proto.updateCacheItem = function updateCacheItem(lineItemId, quantity) {
      if (this.lineItemCache.length === 0) {
        return;
      }

      var lineItem = this.lineItemCache.find(function (item) {
        return lineItemId === item.id;
      });
      lineItem.quantity = quantity;
      this.view.render();
    }
    /**
     * update line item.
     * @param {Number} id - lineItem id.
     * @param {Number} qty - quantity for line item.
     */
    ;

    _proto.updateItem = function updateItem(id, quantity) {
      var _this6 = this;

      this._userEvent('updateItemQuantity');

      var lineItem = {
        id: id,
        quantity: quantity
      };
      var lineItemEl = this.view.document.getElementById(id);

      if (lineItemEl) {
        var quantityEl = lineItemEl.getElementsByClassName(this.classes.lineItem.quantity)[0];

        if (quantityEl) {
          addClassToElement('is-loading', quantityEl);
        }
      }

      return this.props.client.checkout.updateLineItems(this.model.id, [lineItem]).then(function (checkout) {
        _this6.model = checkout;

        _this6.updateCache(_this6.model.lineItems);

        _this6.toggles.forEach(function (toggle) {
          return toggle.view.render();
        });

        if (quantity > 0) {
          _this6.view.render();
        } else {
          _this6.view.animateRemoveNode(id);
        }

        return checkout;
      });
    }
    /**
     * add variant to cart.
     * @param {Object} variant - variant object.
     * @param {Number} [quantity=1] - quantity to be added.
     */
    ;

    _proto.addVariantToCart = function addVariantToCart(variant) {
      var _this7 = this;

      var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var openCart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (quantity <= 0) {
        return null;
      }

      if (openCart) {
        this.open();
      }

      var lineItem = {
        variantId: variant.id,
        quantity: quantity
      };

      if (this.model) {
        return this.props.client.checkout.addLineItems(this.model.id, [lineItem]).then(function (checkout) {
          _this7.model = checkout;

          _this7.updateCache(_this7.model.lineItems);

          _this7.view.render();

          _this7.toggles.forEach(function (toggle) {
            return toggle.view.render();
          });

          if (!openCart) {
            _this7.setFocus();
          }

          return checkout;
        });
      } else {
        var input = {
          lineItems: [lineItem]
        };
        return this.props.client.checkout.create(input).then(function (checkout) {
          localStorage.setItem(_this7.localStorageCheckoutKey, checkout.id);
          _this7.model = checkout;

          _this7.updateCache(_this7.model.lineItems);

          _this7.view.render();

          _this7.toggles.forEach(function (toggle) {
            return toggle.view.render();
          });

          if (!openCart) {
            _this7.setFocus();
          }

          return checkout;
        });
      }
    }
    /**
     * Remove all lineItems in the cart
     */
    ;

    _proto.empty = function empty() {
      var _this8 = this;

      var lineItemIds = this.model.lineItems ? this.model.lineItems.map(function (item) {
        return item.id;
      }) : [];
      return this.props.client.checkout.removeLineItems(this.model.id, lineItemIds).then(function (checkout) {
        _this8.model = checkout;

        _this8.view.render();

        _this8.toggles.forEach(function (toggle) {
          return toggle.view.render();
        });

        return checkout;
      });
    }
    /**
     * get info about line item to be sent to tracker
     * @return {Object}
     */
    ;

    _proto.cartItemTrackingInfo = function cartItemTrackingInfo(item, quantity) {
      return {
        id: item.variant.id,
        variantName: item.variant.title,
        productId: item.variant.product.id,
        name: item.title,
        price: item.variant.priceV2.amount,
        prevQuantity: item.quantity,
        quantity: parseFloat(quantity),
        sku: null
      };
    };

    _proto.setFocus = function setFocus() {
      var _this9 = this;

      setTimeout(function () {
        _this9.view.setFocus();
      }, 0);
    };

    _createClass(Cart, [{
      key: "typeKey",
      get: function get() {
        return 'cart';
      }
      /**
       * get events to be bound to DOM.
       * @return {Object}
       */

    }, {
      key: "DOMEvents",
      get: function get() {
        var _merge;

        return merge({}, (_merge = {}, _defineProperty(_merge, "click ".concat(this.selectors.cart.close), this.props.closeCart.bind(this)), _defineProperty(_merge, "click ".concat(this.selectors.lineItem.quantityIncrement), this.onQuantityIncrement.bind(this, 1)), _defineProperty(_merge, "click ".concat(this.selectors.lineItem.quantityDecrement), this.onQuantityIncrement.bind(this, -1)), _defineProperty(_merge, "click ".concat(this.selectors.cart.button), this.onCheckout.bind(this)), _defineProperty(_merge, "blur ".concat(this.selectors.lineItem.quantityInput), this.onQuantityBlur.bind(this)), _defineProperty(_merge, "blur ".concat(this.selectors.cart.note), this.setNote.bind(this)), _merge), this.options.DOMEvents);
      }
      /**
       * get cart line items.
       * @return {Array} HTML
       */

    }, {
      key: "lineItems",
      get: function get() {
        return this.model ? this.model.lineItems : [];
      }
      /**
       * get HTML for cart line items.
       * @return {String} HTML
       */

    }, {
      key: "lineItemsHtml",
      get: function get() {
        var _this10 = this;

        return this.lineItemCache.reduce(function (acc, lineItem) {
          var data = Object.assign({}, lineItem, _this10.options.viewData);
          var fullPrice = data.variant.priceV2.amount * data.quantity;
          var formattedPrice = formatMoney(fullPrice, _this10.moneyFormat);
          var discountAllocations = data.discountAllocations;

          var _discountAllocations$ = discountAllocations.reduce(function (discountAcc, discount) {
            var targetSelection = discount.discountApplication.targetSelection;

            if (LINE_ITEM_TARGET_SELECTIONS.indexOf(targetSelection) > -1) {
              var discountAmount = discount.allocatedAmount.amount;
              var discountDisplayText = discount.discountApplication.title || discount.discountApplication.code;
              discountAcc.totalDiscount += discountAmount;
              discountAcc.discounts.push({
                discount: "".concat(discountDisplayText, " (-").concat(formatMoney(discountAmount, _this10.moneyFormat), ")")
              });
            }

            return discountAcc;
          }, {
            discounts: [],
            totalDiscount: 0
          }),
              discounts = _discountAllocations$.discounts,
              totalDiscount = _discountAllocations$.totalDiscount;

          data.discounts = discounts.length > 0 ? discounts : null;
          data.formattedFullPrice = totalDiscount > 0 ? formattedPrice : null;
          data.formattedActualPrice = formatMoney(fullPrice - totalDiscount, _this10.moneyFormat);
          data.formattedPrice = formattedPrice;
          data.classes = _this10.classes;
          data.text = _this10.config.lineItem.text;
          data.lineItemImage = _this10.imageForLineItem(data);
          data.variantTitle = data.variant.title === 'Default Title' ? '' : data.variant.title;
          return acc + _this10.childTemplate.render({
            data: data
          }, function (output) {
            return "<li id=\"".concat(lineItem.id, "\" class=").concat(_this10.classes.lineItem.lineItem, ">").concat(output, "</li>");
          });
        }, '');
      }
      /**
       * get data to be passed to view.
       * @return {Object} viewData object.
       */

    }, {
      key: "viewData",
      get: function get() {
        var modelData = this.model || {};
        return merge(modelData, this.options.viewData, {
          text: this.options.text,
          classes: this.classes,
          lineItemsHtml: this.lineItemsHtml,
          isEmpty: this.isEmpty,
          formattedTotal: this.formattedTotal,
          discounts: this.cartDiscounts,
          contents: this.options.contents,
          cartNote: this.cartNote,
          cartNoteId: this.cartNoteId
        });
      }
      /**
       * get formatted cart subtotal based on moneyFormat
       * @return {String}
       */

    }, {
      key: "formattedTotal",
      get: function get() {
        if (!this.model) {
          return formatMoney(0, this.moneyFormat);
        }

        var total = this.options.contents.discounts ? this.model.subtotalPriceV2.amount : this.model.lineItemsSubtotalPrice.amount;
        return formatMoney(total, this.moneyFormat);
      }
    }, {
      key: "cartDiscounts",
      get: function get() {
        var _this11 = this;

        if (!this.options.contents.discounts || !this.model) {
          return [];
        }

        return this.model.discountApplications.reduce(function (discountArr, discount) {
          if (discount.targetSelection === CART_TARGET_SELECTION) {
            var discountValue = 0;

            if (discount.value.amount) {
              discountValue = discount.value.amount;
            } else if (discount.value.percentage) {
              discountValue = discount.value.percentage / 100 * _this11.model.lineItemsSubtotalPrice.amount;
            }

            if (discountValue > 0) {
              var discountDisplayText = discount.title || discount.code;
              discountArr.push({
                text: discountDisplayText,
                amount: "-".concat(formatMoney(discountValue, _this11.moneyFormat))
              });
            }
          }

          return discountArr;
        }, []);
      }
      /**
       * whether cart is empty
       * @return {Boolean}
       */

    }, {
      key: "isEmpty",
      get: function get() {
        if (!this.model) {
          return true;
        }

        return this.model.lineItems.length < 1;
      }
    }, {
      key: "cartNote",
      get: function get() {
        return this.model && this.model.note;
      }
    }, {
      key: "cartNoteId",
      get: function get() {
        return "CartNote-".concat(Date.now());
      }
    }, {
      key: "wrapperClass",
      get: function get() {
        return this.isVisible ? 'is-active' : '';
      }
    }, {
      key: "localStorageCheckoutKey",
      get: function get() {
        return "".concat(this.props.client.config.storefrontAccessToken, ".").concat(this.props.client.config.domain, ".checkoutId");
      }
    }]);

    return Cart;
  }(Component);

  var Tracker =
  /*#__PURE__*/
  function () {
    function Tracker(lib, clientConfig) {
      this.lib = lib || null;
      this.clientConfig = clientConfig;
    }

    var _proto = Tracker.prototype;

    _proto.trackMethod = function trackMethod(fn, event, properties) {
      var self = this;
      return function () {
        var returnValue = fn.apply(void 0, arguments);

        if (returnValue && returnValue.then) {
          return returnValue.then(function (val) {
            self.callLib(event, properties);
            return val;
          });
        }

        self.callLib(event, properties);
        return returnValue;
      };
    };

    _proto.callLib = function callLib(eventName, properties) {
      switch (eventName) {
        case 'Update Cart':
          if (properties.quantity < 1) {
            return this.track('Removed Product', properties);
          }

          if (properties.prevQuantity && properties.quantity < properties.prevQuantity) {
            return;
          }

          return this.track('Added Product', properties);

        default:
          return this.track(eventName, properties);
      }
    };

    _proto.trackPageview = function trackPageview() {
      if (this.lib && this.lib.page) {
        this.lib.page();
      }
    };

    _proto.trackComponent = function trackComponent(type, properties) {
      switch (type) {
        case 'product':
          return this.track('Viewed Product', properties);

        case 'collection':
          return this.track('Viewed Product Category', properties);
      }
    };

    _proto.track = function track(eventName, properties) {
      properties.pageurl = document.location.href;
      properties.referrer = document.referrer;
      properties.subdomain = this.clientConfig.domain;

      if (this.lib && this.lib.track) {
        this.lib.track(eventName, properties);
      }
    };

    return Tracker;
  }();

  var hostStyles = ".shopify-buy-modal-is-active {\n  height: 100%;\n  overflow: auto;\n}\n\n.shopify-buy-frame {\n  display: inline-block\n}\n\n.shopify-buy-frame iframe {\n    width: 100%;\n    display: block;\n    height: 0;\n    overflow: hidden;\n  }\n\n.shopify-buy-frame--cart {\n  width: 100%;\n  max-width: 350px;\n  position: fixed;\n  top: 0;\n  right: 0;\n  height: 100%;\n  z-index: 2147483647;\n  transform: translateX(100%);\n  -webkit-transform: translateX(100%);\n  visibility: hidden\n}\n\n.shopify-buy-frame--cart iframe {\n    height: 100%;\n    display: none\n  }\n\n.shopify-buy-frame--cart iframe.is-block {\n      display: block;\n    }\n\n.shopify-buy-frame--cart.is-initialized {\n    -webkit-transition: -webkit-transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);\n    transition: -webkit-transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);\n    transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);\n    transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);\n  }\n\n.shopify-buy-frame--cart.is-active {\n    transform: translateX(0);\n    -webkit-transform: translateX(0);\n  }\n\n.shopify-buy-frame--cart.is-visible {\n    visibility: visible;\n  }\n\n.shopify-buy-frame--product {\n  display: block\n}\n\n.shopify-buy-frame--product.shopify-buy__layout-horizontal {\n    display: block;\n    margin-left: auto;\n\n    margin-right: auto\n  }\n\n.shopify-buy-frame--product.shopify-buy__layout-horizontal iframe {\n      max-width: 100%\n    }\n\n@media (min-width: 950px) {\n\n.shopify-buy-frame--product.shopify-buy__layout-horizontal iframe {\n        max-width: 950px;\n        margin-left: auto;\n        margin-right: auto\n    }\n      }\n\n.shopify-buy-frame--toggle {\n  display: inline-block\n}\n\n.shopify-buy-frame--toggle:not(.is-sticky) {\n    overflow: hidden;\n    padding: 5px;\n  }\n\n.shopify-buy-frame--toggle.is-sticky {\n    display: none;\n    position: fixed;\n    right: 0;\n    top: 50%;\n    transform: translateY(-50%);\n    -webkit-transform: translateY(-50%);\n    z-index: 2147483645;\n  }\n\n.shopify-buy-frame--toggle.is-active.is-sticky {\n    display: block;\n  }\n\n.is-active .shopify-buy-frame--toggle iframe {\n      min-height: 67px;\n    }\n\n.shopify-buy-frame--productSet {\n  width: 100%;\n}\n\n.shopify-buy-frame--modal {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 2147483646;\n  display: none;\n  -webkit-transition: background 300ms ease;\n  transition: background 300ms ease\n}\n\n.shopify-buy-frame--modal iframe {\n    height: 100%;\n    width: 100%;\n    max-width: none;\n  }\n\n.shopify-buy-frame--modal.is-active {\n    background: rgba(0,0,0,0.6);\n  }\n\n.shopify-buy-frame--modal.is-block {\n    display: block;\n  }\n";

  var conditionalStyles$1 = ".shopify-buy-frame--cart {\n  display: none\n}\n.shopify-buy-frame--cart.is-active {\n    display: block;\n  }\n";

  var frameUtils = {};
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  if (window.requestAnimationFrame && window.cancelAnimationFrame) {
    frameUtils.requestAnimationFrame = window.requestAnimationFrame;
    frameUtils.cancelAnimationFrame = window.cancelAnimationFrame;
  } else {
    for (var x = 0; x < vendors.length && !frameUtils.requestAnimationFrame; ++x) {
      frameUtils.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      frameUtils.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!frameUtils.requestAnimationFrame) frameUtils.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    if (!frameUtils.cancelAnimationFrame) frameUtils.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;

  var throttle = function throttle(type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function func() {
      if (running) {
        return;
      }

      running = true;
      frameUtils.requestAnimationFrame.call(window, function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  var DATA_ATTRIBUTE = 'data-shopify-buy-ui';
  var ESC_KEY$1 = 27;
  /** Initializes and coordinates components. */

  var UI =
  /*#__PURE__*/
  function () {
    /**
     * create a UI instance
     * @param {Object} client - Instance of ShopifyBuy Client
     * @param {Object} integrations - optional tracker and logger integrations
     * @param {String} styleOverrides - additional CSS to be added to _host_ style tag
     */
    function UI(client) {
      var integrations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var styleOverrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      this.client = client;
      this.config = {};
      this.config.domain = this.client.config.domain;
      this.iframeComponents = [];
      this.components = {
        product: [],
        cart: [],
        collection: [],
        productSet: [],
        modal: [],
        toggle: []
      };
      this.componentTypes = {
        product: Product$1,
        cart: Cart,
        collection: ProductSet,
        productSet: ProductSet,
        toggle: CartToggle
      };
      this.errorReporter = integrations.errorReporter;
      this.tracker = new Tracker(integrations.tracker, this.config);
      this.styleOverrides = styleOverrides;
      this.tracker.trackPageview();
      this.activeEl = null;

      this._appendStyleTag();

      this._bindResize();

      this._bindHostClick();

      this._bindEsc(window);

      this._bindPostMessage();
    }
    /**
     * create a component of a type.
     * @param {String} type - one of 'product', 'productSet', 'collection', 'cart'.
     * @param {Object} config - configuration object
     * @return {Promise} resolves to instance of newly created component.
     */


    var _proto = UI.prototype;

    _proto.createComponent = function createComponent(type, config) {
      var _this = this;

      config.node = config.node || this._queryEntryNode();
      var component = new this.componentTypes[type](config, this.componentProps);

      if (component.iframe) {
        this._bindEsc(component.iframe.el.contentWindow || component.iframe.el);
      }

      this.components[type].push(component);
      return component.init().then(function () {
        _this.trackComponent(type, component);

        return component;
      }).catch(function (error) {
        if (_this.errorReporter) {
          _this.errorReporter.notifyException(error);
        } // eslint-disable-next-line


        console.error(error);
      });
    };

    _proto.trackComponent = function trackComponent(type, component) {
      var _this2 = this;

      if (type === 'productSet') {
        component.trackingInfo.forEach(function (product) {
          _this2.tracker.trackComponent('product', product);
        });
      } else {
        this.tracker.trackComponent(type, component.trackingInfo);
      }
    }
    /**
     * destroy a component
     * @param {String} type - one of 'product', 'productSet', 'collection', 'cart'.
     * @param {Number} id - ID of the component's model.
     */
    ;

    _proto.destroyComponent = function destroyComponent(type, id) {
      var _this3 = this;

      this.components[type].forEach(function (component, index) {
        if (id && !component.model.id === id) {
          return;
        }

        _this3.components[type][index].destroy();

        _this3.components[type].splice(index, 1);
      });
    }
    /**
     * create a cart object to be shared between components.
     * @param {Object} config - configuration object.
     * @return {Promise} a promise which resolves once the cart has been initialized.
     */
    ;

    _proto.createCart = function createCart(config) {
      var _this4 = this;

      if (this.components.cart.length) {
        if (config.toggles && config.toggles.length > this.components.cart[0].toggles.length) {
          return this.components.cart[0].createToggles(config).then(function () {
            return _this4.components.cart[0];
          });
        }

        return Promise.resolve(this.components.cart[0]);
      } else {
        var cart = new Cart(config, this.componentProps);
        this.components.cart.push(cart);
        return cart.init();
      }
    }
    /**
     * close any cart.
     */
    ;

    _proto.closeCart = function closeCart() {
      var _this5 = this;

      if (!this.components.cart.length) {
        return;
      }

      this.components.cart.forEach(function (cart) {
        if (!cart.isVisible) {
          return;
        }

        cart.close();

        _this5.restoreFocus();
      });
    }
    /**
     * open any cart.
     */
    ;

    _proto.openCart = function openCart() {
      if (this.components.cart.length) {
        this.components.cart.forEach(function (cart) {
          cart.open();
        });
      }
    }
    /**
     * toggle visibility of cart.
     * @param {Boolean} [visibility] - desired state of cart.
     */
    ;

    _proto.toggleCart = function toggleCart(visibility) {
      if (this.components.cart.length) {
        this.components.cart.forEach(function (cart) {
          cart.toggleVisibility(visibility);
        });
      }

      if (!visibility) {
        this.restoreFocus();
      }
    }
    /**
     * create a modal object to be shared between components.
     * @param {Object} config - configuration object.
     * @return {Modal} a Modal instance.
     */
    ;

    _proto.createModal = function createModal(config) {
      if (this.components.modal.length) {
        return this.components.modal[0];
      } else {
        var modal = new Modal(config, this.componentProps);
        this.components.modal.push(modal);
        return modal;
      }
    };

    _proto.setActiveEl = function setActiveEl(el) {
      this.activeEl = el;
    }
    /**
     * close any modals.
     */
    ;

    _proto.closeModal = function closeModal() {
      if (!this.components.modal.length) {
        return;
      }

      this.components.modal.forEach(function (modal) {
        return modal.close();
      });
      this.restoreFocus();
    };

    _proto.restoreFocus = function restoreFocus() {
      if (this.activeEl && !this.modalOpen && !this.cartOpen) {
        this.activeEl.focus();
      }
    }
    /**
     * get properties to be passed to any component.
     * @return {Object} props object.
     */
    ;

    _proto._queryEntryNode = function _queryEntryNode() {
      this.entry = this.entry || window.document.querySelectorAll("script[".concat(DATA_ATTRIBUTE, "]"))[0];
      var div = document.createElement('div');

      if (this.entry) {
        var parentNode = this.entry.parentNode;

        if (parentNode.tagName === 'HEAD' || parentNode.tagName === 'HTML') {
          this._appendToBody(div);
        } else {
          this.entry.removeAttribute(DATA_ATTRIBUTE);
          parentNode.insertBefore(div, this.entry);
        }
      } else {
        this._appendToBody(div);
      }

      return div;
    };

    _proto._appendToBody = function _appendToBody(el) {
      if (!document.body) {
        document.body = document.createElement('body');
      }

      document.body.appendChild(el);
    };

    _proto._appendStyleTag = function _appendStyleTag() {
      var styleTag = document.createElement('style');

      if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = this.styleText;
      } else {
        styleTag.appendChild(document.createTextNode(this.styleText));
      }

      document.head.appendChild(styleTag);
    };

    _proto._bindHostClick = function _bindHostClick() {
      var _this6 = this;

      document.addEventListener('click', function (evt) {
        if (_this6.components.cart.length < 1) {
          return;
        }

        var cartNode = _this6.components.cart[0].node;

        if (evt.target === cartNode || cartNode.contains(evt.target)) {
          return;
        }

        _this6.closeCart();
      });
    };

    _proto._bindResize = function _bindResize() {
      var _this7 = this;

      throttle('resize', 'safeResize');
      window.addEventListener('safeResize', function () {
        _this7.components.collection.forEach(function (collection) {
          return collection.view.resize();
        });

        _this7.components.productSet.forEach(function (set) {
          return set.view.resize();
        });

        _this7.components.product.forEach(function (product) {
          return product.view.resize();
        });
      });
    };

    _proto._bindEsc = function _bindEsc(context) {
      var _this8 = this;

      context.addEventListener('keydown', function (evt) {
        if (evt.keyCode !== ESC_KEY$1) {
          return;
        }

        _this8.closeModal();

        _this8.closeCart();
      });
    };

    _proto._bindPostMessage = function _bindPostMessage() {
      window.addEventListener('message', function (msg) {
        var data;

        try {
          data = JSON.parse(msg.data);
        } catch (err) {
          data = {};
        }

        if (data.syncCart || data.current_checkout_page && data.current_checkout_page === '/checkout/thank_you') {
          location.reload();
        }
      });
    };

    _createClass(UI, [{
      key: "modalOpen",
      get: function get() {
        return this.components.modal.reduce(function (isOpen, modal) {
          return isOpen || modal.isVisible;
        }, false);
      }
    }, {
      key: "cartOpen",
      get: function get() {
        return this.components.cart.reduce(function (isOpen, cart) {
          return isOpen || cart.isVisible;
        }, false);
      }
    }, {
      key: "componentProps",
      get: function get() {
        return {
          client: this.client,
          createCart: this.createCart.bind(this),
          closeCart: this.closeCart.bind(this),
          toggleCart: this.toggleCart.bind(this),
          createModal: this.createModal.bind(this),
          closeModal: this.closeModal.bind(this),
          setActiveEl: this.setActiveEl.bind(this),
          destroyComponent: this.destroyComponent.bind(this),
          tracker: this.tracker,
          errorReporter: this.errorReporter,
          browserFeatures: browserFeatures
        };
      }
      /**
       * get string of CSS to be inserted into host style tag.
       */

    }, {
      key: "styleText",
      get: function get() {
        if (browserFeatures.transition && browserFeatures.transform && browserFeatures.animation) {
          return hostStyles + this.styleOverrides;
        }

        return hostStyles + conditionalStyles$1 + this.styleOverrides;
      }
    }]);

    return UI;
  }();

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode$1)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode$1(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  var DOMException = self.DOMException;
  try {
    new DOMException();
  } catch (err) {
    DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }

  function fetch$1(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch$1.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch$1;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  var O = 'object';
  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == O && globalThis) ||
    check(typeof window == O && window) ||
    check(typeof self == O && self) ||
    check(typeof commonjsGlobal == O && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var isObject$1 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$1(document$1) && isObject$1(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject$1(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject$1(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$1(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var isPure = false;

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.1.3',
    mode:  'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store = new WeakMap$1();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var Symbol$1 = global_1.Symbol;
  var store$1 = shared('wks');

  var wellKnownSymbol = function (name) {
    return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$1] = 'z';

  // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  var objectToString = String(test) !== '[object z]' ? function toString() {
    return '[object ' + classof(this) + ']';
  } : test.toString;

  var ObjectPrototype = Object.prototype;

  // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  if (objectToString !== ObjectPrototype.toString) {
    redefine(ObjectPrototype, 'toString', objectToString, { unsafe: true });
  }

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var PROTOTYPE = 'prototype';
  var Empty = function () { /* empty */ };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var length = enumBugKeys.length;
    var lt = '<';
    var script = 'script';
    var gt = '>';
    var js = 'java' + script + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = String(js);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    return createDict();
  };

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  hiddenKeys[IE_PROTO$1] = true;

  var defineProperty = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
      defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  var iterators = {};

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject$1(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
      hide(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.github.io/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  for (var COLLECTION_NAME in domIterables) {
    var Collection$1 = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
        hide(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG$3]) hide(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          hide(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  }

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var SPECIES = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$3] === it);
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$4]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
      throw error;
    }
  };

  var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES
            ? boundFunction(anObject(step = iterable[index])[0], step[1])
            : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    while (!(step = iterator.next()).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (result && result instanceof Result) return result;
    } return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
  });

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$5] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$5] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var SPECIES$1 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.github.io/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var location$1 = global_1.location;
  var set$1 = global_1.setImmediate;
  var clear = global_1.clearImmediate;
  var process = global_1.process;
  var MessageChannel = global_1.MessageChannel;
  var Dispatch = global_1.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global_1.postMessage(id + '', location$1.protocol + '//' + location$1.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (classofRaw(process) == 'process') {
      defer = function (id) {
        process.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bindContext(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
      defer = post;
      global_1.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task = {
    set: set$1,
    clear: clear
  };

  var userAgent = getBuiltIn('navigator', 'userAgent') || '';

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

  var macrotask = task.set;


  var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
  var process$1 = global_1.process;
  var Promise$1 = global_1.Promise;
  var IS_NODE = classofRaw(process$1) == 'process';
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify, toggle, node, promise;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (IS_NODE) {
      notify = function () {
        process$1.nextTick(flush);
      };
    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
      toggle = true;
      node = document.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      notify = function () {
        promise.then(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global_1, flush);
      };
    }
  }

  var microtask = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$1(resolve);
    this.reject = aFunction$1(reject);
  };

  // 25.4.1.5 NewPromiseCapability(C)
  var f$5 = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability = {
  	f: f$5
  };

  var promiseResolve = function (C, x) {
    anObject(C);
    if (isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var hostReportErrors = function (a, b) {
    var console = global_1.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var task$1 = task.set;










  var SPECIES$2 = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState$2 = internalState.get;
  var setInternalState$2 = internalState.set;
  var getInternalPromiseState = internalState.getterFor(PROMISE);
  var PromiseConstructor = global_1[PROMISE];
  var TypeError$1 = global_1.TypeError;
  var document$2 = global_1.document;
  var process$2 = global_1.process;
  var $fetch = global_1.fetch;
  var versions = process$2 && process$2.versions;
  var v8 = versions && versions.v8 || '';
  var newPromiseCapability$1 = newPromiseCapability.f;
  var newGenericPromiseCapability = newPromiseCapability$1;
  var IS_NODE$1 = classofRaw(process$2) == 'process';
  var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var Internal, OwnPromiseCapability, PromiseWrapper;

  var FORCED = isForced_1(PROMISE, function () {
    // correct subclassing with @@species support
    var promise = PromiseConstructor.resolve(1);
    var empty = function () { /* empty */ };
    var FakePromise = (promise.constructor = {})[SPECIES$2] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !((IS_NODE$1 || typeof PromiseRejectionEvent == 'function')
      && (!isPure || promise['finally'])
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1);
  });

  var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify$1 = function (promise, state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(promise, state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$2.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global_1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (handler = global_1['on' + name]) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (promise, state) {
    task$1.call(global_1, function () {
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE$1) {
            process$2.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (promise, state) {
    task$1.call(global_1, function () {
      if (IS_NODE$1) {
        process$2.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, promise, state, unwrap) {
    return function (value) {
      fn(promise, state, value, unwrap);
    };
  };

  var internalReject = function (promise, state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify$1(promise, state, true);
  };

  var internalResolve = function (promise, state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(value,
              bind(internalResolve, promise, wrapper, state),
              bind(internalReject, promise, wrapper, state)
            );
          } catch (error) {
            internalReject(promise, wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify$1(promise, state, false);
      }
    } catch (error) {
      internalReject(promise, { done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction$1(executor);
      Internal.call(this);
      var state = getInternalState$2(this);
      try {
        executor(bind(internalResolve, this, state), bind(internalReject, this, state));
      } catch (error) {
        internalReject(this, state, error);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      setInternalState$2(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll(PromiseConstructor.prototype, {
      // `Promise.prototype.then` method
      // https://tc39.github.io/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE$1 ? process$2.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify$1(this, state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState$2(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, promise, state);
      this.reject = bind(internalReject, promise, state);
    };
    newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    // wrap fetch result
    if ( typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
      }
    });
  }

  _export({ global: true, wrap: true, forced: FORCED }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = path[PROMISE];

  // statics
  _export({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.reject` method
    // https://tc39.github.io/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability$1(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  _export({ target: PROMISE, stat: true, forced:  FORCED }, {
    // `Promise.resolve` method
    // https://tc39.github.io/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve( this, x);
    }
  });

  _export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.github.io/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate_1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.github.io/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        iterate_1(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  // `Promise.prototype.finally` method
  // https://tc39.github.io/ecma262/#sec-promise.prototype.finally
  _export({ target: 'Promise', proto: true, real: true }, {
    'finally': function (onFinally) {
      var C = speciesConstructor(this, getBuiltIn('Promise'));
      var isFunction = typeof onFinally == 'function';
      return this.then(
        isFunction ? function (x) {
          return promiseResolve(C, onFinally()).then(function () { return x; });
        } : onFinally,
        isFunction ? function (e) {
          return promiseResolve(C, onFinally()).then(function () { throw e; });
        } : onFinally
      );
    }
  });

  var promise$1 = path.Promise;

  var $AggregateError = function AggregateError(errors, message) {
    var that = this;
    if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
    if (objectSetPrototypeOf) {
      that = objectSetPrototypeOf(new Error(message), objectGetPrototypeOf(that));
    }
    var errorsArray = [];
    iterate_1(errors, errorsArray.push, errorsArray);
    that.errors = errorsArray;
    if (message !== undefined) hide(that, 'message', String(message));
    return that;
  };

  $AggregateError.prototype = objectCreate(Error.prototype, {
    constructor: createPropertyDescriptor(5, $AggregateError),
    name: createPropertyDescriptor(5, 'AggregateError')
  });

  _export({ global: true }, {
    AggregateError: $AggregateError
  });

  // `Promise.allSettled` method
  // https://github.com/tc39/proposal-promise-allSettled
  _export({ target: 'Promise', stat: true }, {
    allSettled: function allSettled(iterable) {
      var C = this;
      var capability = newPromiseCapability.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var promiseResolve = aFunction$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate_1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'fulfilled', value: value };
            --remaining || resolve(values);
          }, function (e) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'rejected', reason: e };
            --remaining || resolve(values);
          });
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  // `Promise.try` method
  // https://github.com/tc39/proposal-promise-try
  _export({ target: 'Promise', stat: true }, {
    'try': function (callbackfn) {
      var promiseCapability = newPromiseCapability.f(this);
      var result = perform(callbackfn);
      (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
      return promiseCapability.promise;
    }
  });

  var PROMISE_ANY_ERROR = 'No one promise resolved';

  // `Promise.any` method
  // https://github.com/tc39/proposal-promise-any
  _export({ target: 'Promise', stat: true }, {
    any: function any(iterable) {
      var C = this;
      var capability = newPromiseCapability.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var promiseResolve = aFunction$1(C.resolve);
        var errors = [];
        var counter = 0;
        var remaining = 1;
        var alreadyResolved = false;
        iterate_1(iterable, function (promise) {
          var index = counter++;
          var alreadyRejected = false;
          errors.push(undefined);
          remaining++;
          promiseResolve.call(C, promise).then(function (value) {
            if (alreadyRejected || alreadyResolved) return;
            alreadyResolved = true;
            resolve(value);
          }, function (e) {
            if (alreadyRejected || alreadyResolved) return;
            alreadyRejected = true;
            errors[index] = e;
            --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
          });
        });
        --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$1(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (e) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (f) { /* empty */ }
    } return false;
  };

  var nativeEndsWith = ''.endsWith;
  var min$2 = Math.min;

  // `String.prototype.endsWith` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.endswith
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('endsWith') }, {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      var that = String(requireObjectCoercible(this));
      notARegexp(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = toLength(that.length);
      var end = endPosition === undefined ? len : min$2(toLength(endPosition), len);
      var search = String(searchString);
      return nativeEndsWith
        ? nativeEndsWith.call(that, search, end)
        : that.slice(end - search.length, end) === search;
    }
  });

  var call = Function.call;

  var entryUnbind = function (CONSTRUCTOR, METHOD, length) {
    return bindContext(call, global_1[CONSTRUCTOR].prototype[METHOD], length);
  };

  var endsWith = entryUnbind('String', 'endsWith');

  var iterator = entryUnbind('Array', 'values');

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray$2 = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var SPECIES$3 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray$2(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = bindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6)
  };

  var $find = arrayIteration.find;


  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var find = entryUnbind('Array', 'find');

  var nativeAssign = Object.assign;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  // should work with symbols and should have deterministic property order (V8 bug)
  var objectAssign = !nativeAssign || fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : nativeAssign;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  var assign = path.Object.assign;

  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  // `Object.{ entries, values }` methods implementation
  var createMethod$3 = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;
      while (length > i) {
        key = keys[i++];
        if (!descriptors || propertyIsEnumerable.call(O, key)) {
          result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.github.io/ecma262/#sec-object.entries
    entries: createMethod$3(true),
    // `Object.values` method
    // https://tc39.github.io/ecma262/#sec-object.values
    values: createMethod$3(false)
  };

  var $values = objectToArray.values;

  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  _export({ target: 'Object', stat: true }, {
    values: function values(O) {
      return $values(O);
    }
  });

  var values = path.Object.values;

  var UpdatedShopifyBuy =
  /*#__PURE__*/
  function (_ShopifyBuy) {
    _inheritsLoose(UpdatedShopifyBuy, _ShopifyBuy);

    function UpdatedShopifyBuy() {
      return _ShopifyBuy.apply(this, arguments) || this;
    }

    UpdatedShopifyBuy.buildClient = function buildClient(config) {
      var newConfig = Object.assign({}, config, {
        source: 'buy-button-js'
      });
      return _ShopifyBuy.buildClient.call(this, newConfig);
    };

    return UpdatedShopifyBuy;
  }(shopifyBuy);

  window.ShopifyBuy = window.ShopifyBuy || UpdatedShopifyBuy;
  UpdatedShopifyBuy.UI = window.ShopifyBuy.UI || {
    domains: {},
    init: function init(client) {
      var integrations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var styleOverrides = arguments.length > 2 ? arguments[2] : undefined;
      var uniqueClientKey = "".concat(client.config.domain, ".").concat(client.config.storefrontAccessToken);

      if (!this.domains[uniqueClientKey]) {
        this.domains[uniqueClientKey] = new UI(client, integrations, styleOverrides);
      }

      return this.domains[uniqueClientKey];
    },
    adapterHelpers: {
      templates: {
        product: productTemplate
      }
    }
  };

  return UpdatedShopifyBuy;

}());
