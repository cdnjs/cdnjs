(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GraphiQLExplorer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.defaultValue = defaultValue;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var React = _interopRequireWildcard(_react);

var _graphql = require('graphql');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: 1. Add default fields recursively
// TODO: 2. Add default fields for all selections (not just fragments)
// TODO: 3. Add stylesheet and remove inline styles
// TODO: 4. Indication of when query in explorer diverges from query in editor pane
// TODO: 5. Separate section for deprecated args, with support for 'beta' fields
// TODO: 6. Custom default arg fields

// Note: Attempted 1. and 2., but they were more annoying than helpful

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Names match class names in graphiql app.css
// https://github.com/graphql/graphiql/blob/master/packages/graphiql/css/app.css
var defaultColors = {
  keyword: '#B11A04',
  // OperationName, FragmentName
  def: '#D2054E',
  // FieldName
  property: '#1F61A0',
  // FieldAlias
  qualifier: '#1C92A9',
  // ArgumentName and ObjectFieldName
  attribute: '#8B2BB9',
  number: '#2882F9',
  string: '#D64292',
  // Boolean
  builtin: '#D47509',
  // Enum
  string2: '#0B7FC7',
  variable: '#397D13',
  // Type
  atom: '#CA9800'
};

var defaultArrowOpen = React.createElement(
  'svg',
  { width: '12', height: '9' },
  React.createElement('path', { fill: '#666', d: 'M 0 2 L 9 2 L 4.5 7.5 z' })
);

var defaultArrowClosed = React.createElement(
  'svg',
  { width: '12', height: '9' },
  React.createElement('path', { fill: '#666', d: 'M 0 0 L 0 9 L 5.5 4.5 z' })
);

var defaultCheckboxChecked = React.createElement(
  'svg',
  {
    style: { marginRight: '3px', marginLeft: '-3px' },
    width: '12',
    height: '12',
    viewBox: '0 0 18 18',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg' },
  React.createElement('path', {
    d: 'M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM14.99 6L13.58 4.58L6.99 11.17L4.41 8.6L2.99 10.01L6.99 14L14.99 6Z',
    fill: '#666'
  })
);

var defaultCheckboxUnchecked = React.createElement(
  'svg',
  {
    style: { marginRight: '3px', marginLeft: '-3px' },
    width: '12',
    height: '12',
    viewBox: '0 0 18 18',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg' },
  React.createElement('path', {
    d: 'M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z',
    fill: '#CCC'
  })
);

function Checkbox(props) {
  return props.checked ? props.styleConfig.checkboxChecked : props.styleConfig.checkboxUnchecked;
}

function defaultGetDefaultFieldNames(type) {
  var fields = type.getFields();

  // Is there an `id` field?
  if (fields['id']) {
    var res = ['id'];
    if (fields['email']) {
      res.push('email');
    } else if (fields['name']) {
      res.push('name');
    }
    return res;
  }

  // Is there an `edges` field?
  if (fields['edges']) {
    return ['edges'];
  }

  // Is there an `node` field?
  if (fields['node']) {
    return ['node'];
  }

  if (fields['nodes']) {
    return ['nodes'];
  }

  // Include all leaf-type fields.
  var leafFieldNames = [];
  Object.keys(fields).forEach(function (fieldName) {
    if ((0, _graphql.isLeafType)(fields[fieldName].type)) {
      leafFieldNames.push(fieldName);
    }
  });

  if (!leafFieldNames.length) {
    // No leaf fields, add typename so that the query stays valid
    return ['__typename'];
  }
  return leafFieldNames.slice(0, 2); // Prevent too many fields from being added
}

function isRequiredArgument(arg) {
  return (0, _graphql.isNonNullType)(arg.type) && arg.defaultValue === undefined;
}

function unwrapOutputType(outputType) {
  var unwrappedType = outputType;
  while ((0, _graphql.isWrappingType)(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
}

function unwrapInputType(inputType) {
  var unwrappedType = inputType;
  while ((0, _graphql.isWrappingType)(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
}

function coerceArgValue(argType, value) {
  if ((0, _graphql.isScalarType)(argType)) {
    try {
      switch (argType.name) {
        case 'String':
          return {
            kind: 'StringValue',
            value: String(argType.parseValue(value))
          };
        case 'Float':
          return {
            kind: 'FloatValue',
            value: String(argType.parseValue(parseFloat(value)))
          };
        case 'Int':
          return {
            kind: 'IntValue',
            value: String(argType.parseValue(parseInt(value, 10)))
          };
        case 'Boolean':
          try {
            var parsed = JSON.parse(value);
            if (typeof parsed === 'boolean') {
              return { kind: 'BooleanValue', value: parsed };
            } else {
              return { kind: 'BooleanValue', value: false };
            }
          } catch (e) {
            return {
              kind: 'BooleanValue',
              value: false
            };
          }
        default:
          return {
            kind: 'StringValue',
            value: String(argType.parseValue(value))
          };
      }
    } catch (e) {
      console.error('error coercing arg value', e, value);
      return { kind: 'StringValue', value: value };
    }
  } else {
    try {
      var parsedValue = argType.parseValue(value);
      if (parsedValue) {
        return { kind: 'EnumValue', value: String(parsedValue) };
      } else {
        return { kind: 'EnumValue', value: argType.getValues()[0].name };
      }
    } catch (e) {
      return { kind: 'EnumValue', value: argType.getValues()[0].name };
    }
  }
}

var InputArgView = function (_React$PureComponent) {
  _inherits(InputArgView, _React$PureComponent);

  function InputArgView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InputArgView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputArgView.__proto__ || Object.getPrototypeOf(InputArgView)).call.apply(_ref, [this].concat(args))), _this), _this._getArgSelection = function () {
      return _this.props.selection.fields.find(function (field) {
        return field.name.value === _this.props.arg.name;
      });
    }, _this._removeArg = function () {
      var selection = _this.props.selection;

      var argSelection = _this._getArgSelection();
      _this._previousArgSelection = argSelection;
      _this.props.modifyFields(selection.fields.filter(function (field) {
        return field !== argSelection;
      }));
    }, _this._addArg = function () {
      var _this$props = _this.props,
          selection = _this$props.selection,
          arg = _this$props.arg,
          getDefaultScalarArgValue = _this$props.getDefaultScalarArgValue,
          parentField = _this$props.parentField,
          makeDefaultArg = _this$props.makeDefaultArg;

      var argType = unwrapInputType(arg.type);

      var argSelection = null;
      if (_this._previousArgSelection) {
        argSelection = _this._previousArgSelection;
      } else if ((0, _graphql.isInputObjectType)(argType)) {
        var _fields = argType.getFields();
        argSelection = {
          kind: 'ObjectField',
          name: { kind: 'Name', value: arg.name },
          value: {
            kind: 'ObjectValue',
            fields: defaultInputObjectFields(getDefaultScalarArgValue, makeDefaultArg, parentField, Object.keys(_fields).map(function (k) {
              return _fields[k];
            }))
          }
        };
      } else if ((0, _graphql.isLeafType)(argType)) {
        argSelection = {
          kind: 'ObjectField',
          name: { kind: 'Name', value: arg.name },
          value: getDefaultScalarArgValue(parentField, arg, argType)
        };
      }

      if (!argSelection) {
        console.error('Unable to add arg for argType', argType);
      } else {
        _this.props.modifyFields([].concat(_toConsumableArray(selection.fields || []), [argSelection]));
      }
    }, _this._setArgValue = function (event) {
      var selection = _this.props.selection;

      var argSelection = _this._getArgSelection();
      if (!argSelection) {
        console.error('missing arg selection when setting arg value');
        return;
      }
      var argType = unwrapInputType(_this.props.arg.type);
      if (!(0, _graphql.isLeafType)(argType)) {
        console.warn('Unable to handle non leaf types in setArgValue');
        return;
      }
      var targetValue = event.target.value;

      _this.props.modifyFields((selection.fields || []).map(function (field) {
        return field === argSelection ? _extends({}, field, {
          value: coerceArgValue(argType, targetValue)
        }) : field;
      }));
    }, _this._modifyChildFields = function (fields) {
      _this.props.modifyFields(_this.props.selection.fields.map(function (field) {
        return field.name.value === _this.props.arg.name ? _extends({}, field, {
          value: {
            kind: 'ObjectValue',
            fields: fields
          }
        }) : field;
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputArgView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          arg = _props.arg,
          parentField = _props.parentField;

      var argSelection = this._getArgSelection();

      return React.createElement(AbstractArgView, {
        argValue: argSelection ? argSelection.value : null,
        arg: arg,
        parentField: parentField,
        addArg: this._addArg,
        removeArg: this._removeArg,
        setArgFields: this._modifyChildFields,
        setArgValue: this._setArgValue,
        getDefaultScalarArgValue: this.props.getDefaultScalarArgValue,
        makeDefaultArg: this.props.makeDefaultArg,
        onRunOperation: this.props.onRunOperation,
        styleConfig: this.props.styleConfig
      });
    }
  }]);

  return InputArgView;
}(React.PureComponent);

function defaultValue(argType) {
  if ((0, _graphql.isEnumType)(argType)) {
    return { kind: 'EnumValue', value: argType.getValues()[0].name };
  } else {
    switch (argType.name) {
      case 'String':
        return { kind: 'StringValue', value: '' };
      case 'Float':
        return { kind: 'FloatValue', value: '1.5' };
      case 'Int':
        return { kind: 'IntValue', value: '10' };
      case 'Boolean':
        return { kind: 'BooleanValue', value: false };
      default:
        return { kind: 'StringValue', value: '' };
    }
  }
}

function defaultGetDefaultScalarArgValue(parentField, arg, argType) {
  return defaultValue(argType);
}

var ArgView = function (_React$PureComponent2) {
  _inherits(ArgView, _React$PureComponent2);

  function ArgView() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, ArgView);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = ArgView.__proto__ || Object.getPrototypeOf(ArgView)).call.apply(_ref2, [this].concat(args))), _this2), _this2._getArgSelection = function () {
      var selection = _this2.props.selection;


      return (selection.arguments || []).find(function (arg) {
        return arg.name.value === _this2.props.arg.name;
      });
    }, _this2._removeArg = function () {
      var selection = _this2.props.selection;

      var argSelection = _this2._getArgSelection();
      _this2._previousArgSelection = argSelection;
      _this2.props.modifyArguments((selection.arguments || []).filter(function (arg) {
        return arg !== argSelection;
      }));
    }, _this2._addArg = function () {
      var _this2$props = _this2.props,
          selection = _this2$props.selection,
          getDefaultScalarArgValue = _this2$props.getDefaultScalarArgValue,
          makeDefaultArg = _this2$props.makeDefaultArg,
          parentField = _this2$props.parentField,
          arg = _this2$props.arg;

      var argType = unwrapInputType(arg.type);

      var argSelection = null;
      if (_this2._previousArgSelection) {
        argSelection = _this2._previousArgSelection;
      } else if ((0, _graphql.isInputObjectType)(argType)) {
        var _fields2 = argType.getFields();
        argSelection = {
          kind: 'Argument',
          name: { kind: 'Name', value: arg.name },
          value: {
            kind: 'ObjectValue',
            fields: defaultInputObjectFields(getDefaultScalarArgValue, makeDefaultArg, parentField, Object.keys(_fields2).map(function (k) {
              return _fields2[k];
            }))
          }
        };
      } else if ((0, _graphql.isLeafType)(argType)) {
        argSelection = {
          kind: 'Argument',
          name: { kind: 'Name', value: arg.name },
          value: getDefaultScalarArgValue(parentField, arg, argType)
        };
      }

      if (!argSelection) {
        console.error('Unable to add arg for argType', argType);
      } else {
        _this2.props.modifyArguments([].concat(_toConsumableArray(selection.arguments || []), [argSelection]));
      }
    }, _this2._setArgValue = function (event) {
      var selection = _this2.props.selection;

      var argSelection = _this2._getArgSelection();
      if (!argSelection) {
        console.error('missing arg selection when setting arg value');
        return;
      }
      var argType = unwrapInputType(_this2.props.arg.type);
      if (!(0, _graphql.isLeafType)(argType)) {
        console.warn('Unable to handle non leaf types in setArgValue');
        return;
      }

      var targetValue = event.target.value;

      _this2.props.modifyArguments((selection.arguments || []).map(function (a) {
        return a === argSelection ? _extends({}, a, {
          value: coerceArgValue(argType, targetValue)
        }) : a;
      }));
    }, _this2._setArgFields = function (fields) {
      var selection = _this2.props.selection;

      var argSelection = _this2._getArgSelection();
      if (!argSelection) {
        console.error('missing arg selection when setting arg value');
        return;
      }

      _this2.props.modifyArguments((selection.arguments || []).map(function (a) {
        return a === argSelection ? _extends({}, a, {
          value: {
            kind: 'ObjectValue',
            fields: fields
          }
        }) : a;
      }));
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(ArgView, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          arg = _props2.arg,
          parentField = _props2.parentField;

      var argSelection = this._getArgSelection();

      return React.createElement(AbstractArgView, {
        argValue: argSelection ? argSelection.value : null,
        arg: arg,
        parentField: parentField,
        addArg: this._addArg,
        removeArg: this._removeArg,
        setArgFields: this._setArgFields,
        setArgValue: this._setArgValue,
        getDefaultScalarArgValue: this.props.getDefaultScalarArgValue,
        makeDefaultArg: this.props.makeDefaultArg,
        onRunOperation: this.props.onRunOperation,
        styleConfig: this.props.styleConfig
      });
    }
  }]);

  return ArgView;
}(React.PureComponent);

function isRunShortcut(event) {
  return event.metaKey && event.key === 'Enter';
}

var ScalarInput = function (_React$PureComponent3) {
  _inherits(ScalarInput, _React$PureComponent3);

  function ScalarInput() {
    var _ref3;

    var _temp3, _this3, _ret3;

    _classCallCheck(this, ScalarInput);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = ScalarInput.__proto__ || Object.getPrototypeOf(ScalarInput)).call.apply(_ref3, [this].concat(args))), _this3), _this3._handleChange = function (event) {
      _this3.props.setArgValue(event);
    }, _temp3), _possibleConstructorReturn(_this3, _ret3);
  }

  _createClass(ScalarInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var input = this._ref;
      var activeElement = document.activeElement;
      if (input && activeElement && !(activeElement instanceof HTMLTextAreaElement)) {
        input.focus();
        input.setSelectionRange(0, input.value.length);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props,
          arg = _props3.arg,
          argValue = _props3.argValue,
          styleConfig = _props3.styleConfig;

      var argType = unwrapInputType(arg.type);
      var value = typeof argValue.value === 'string' ? argValue.value : '';
      var color = this.props.argValue.kind === 'StringValue' ? styleConfig.colors.string : styleConfig.colors.number;
      return React.createElement(
        'span',
        { style: { color: color } },
        argType.name === 'String' ? '"' : '',
        React.createElement('input', {
          style: {
            border: 'none',
            borderBottom: '1px solid #888',
            outline: 'none',
            width: Math.max(1, value.length) + 'ch',
            color: color
          },
          ref: function ref(_ref4) {
            _this4._ref = _ref4;
          },
          type: 'text',
          onKeyDown: function onKeyDown(event) {
            if (isRunShortcut(event)) {
              _this4.props.onRunOperation(event);
            }
          },
          onChange: this._handleChange,
          value: value
        }),
        argType.name === 'String' ? '"' : ''
      );
    }
  }]);

  return ScalarInput;
}(React.PureComponent);

var AbstractArgView = function (_React$PureComponent4) {
  _inherits(AbstractArgView, _React$PureComponent4);

  function AbstractArgView() {
    _classCallCheck(this, AbstractArgView);

    return _possibleConstructorReturn(this, (AbstractArgView.__proto__ || Object.getPrototypeOf(AbstractArgView)).apply(this, arguments));
  }

  _createClass(AbstractArgView, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props4 = this.props,
          argValue = _props4.argValue,
          arg = _props4.arg,
          styleConfig = _props4.styleConfig;
      /* TODO: handle List types*/

      var argType = unwrapInputType(arg.type);

      var input = null;
      if (argValue) {
        if (argValue.kind === 'Variable') {
          input = React.createElement(
            'span',
            { style: { color: styleConfig.colors.variable } },
            '$',
            argValue.name.value
          );
        } else if ((0, _graphql.isScalarType)(argType)) {
          if (argType.name === 'Boolean') {
            input = React.createElement(
              'select',
              {
                style: {
                  color: styleConfig.colors.builtin
                },
                onChange: this.props.setArgValue,
                value: argValue.kind === 'BooleanValue' ? argValue.value : undefined },
              React.createElement(
                'option',
                { key: 'true', value: 'true' },
                'true'
              ),
              React.createElement(
                'option',
                { key: 'false', value: 'false' },
                'false'
              )
            );
          } else {
            input = React.createElement(ScalarInput, {
              setArgValue: this.props.setArgValue,
              arg: arg,
              argValue: argValue,
              onRunOperation: this.props.onRunOperation,
              styleConfig: this.props.styleConfig
            });
          }
        } else if ((0, _graphql.isEnumType)(argType)) {
          if (argValue.kind === 'EnumValue') {
            input = React.createElement(
              'select',
              {
                style: {
                  backgroundColor: 'white',
                  color: styleConfig.colors.string2
                },
                onChange: this.props.setArgValue,
                value: argValue.value },
              argType.getValues().map(function (value) {
                return React.createElement(
                  'option',
                  { key: value.name, value: value.name },
                  value.name
                );
              })
            );
          } else {
            console.error('arg mismatch between arg and selection', argType, argValue);
          }
        } else if ((0, _graphql.isInputObjectType)(argType)) {
          if (argValue.kind === 'ObjectValue') {
            var _fields3 = argType.getFields();
            input = React.createElement(
              'div',
              { style: { marginLeft: 16 } },
              Object.keys(_fields3).sort().map(function (fieldName) {
                return React.createElement(InputArgView, {
                  key: fieldName,
                  arg: _fields3[fieldName],
                  parentField: _this6.props.parentField,
                  selection: argValue,
                  modifyFields: _this6.props.setArgFields,
                  getDefaultScalarArgValue: _this6.props.getDefaultScalarArgValue,
                  makeDefaultArg: _this6.props.makeDefaultArg,
                  onRunOperation: _this6.props.onRunOperation,
                  styleConfig: _this6.props.styleConfig
                });
              })
            );
          } else {
            console.error('arg mismatch between arg and selection', argType, argValue);
          }
        }
      }

      return React.createElement(
        'div',
        {
          style: {
            cursor: 'pointer',
            minHeight: '16px',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          },
          'data-arg-name': arg.name,
          'data-arg-type': argType.name },
        React.createElement(
          'span',
          {
            style: { cursor: 'pointer' },
            onClick: argValue ? this.props.removeArg : this.props.addArg },
          (0, _graphql.isInputObjectType)(argType) ? React.createElement(
            'span',
            null,
            !!argValue ? this.props.styleConfig.arrowOpen : this.props.styleConfig.arrowClosed
          ) : React.createElement(Checkbox, {
            checked: !!argValue,
            styleConfig: this.props.styleConfig
          }),
          React.createElement(
            'span',
            {
              style: { color: styleConfig.colors.attribute },
              title: arg.description },
            arg.name,
            isRequiredArgument(arg) ? '*' : '',
            ':'
          )
        ),
        ' ',
        input || React.createElement('span', null)
      );
    }
  }]);

  return AbstractArgView;
}(React.PureComponent);

var AbstractView = function (_React$PureComponent5) {
  _inherits(AbstractView, _React$PureComponent5);

  function AbstractView() {
    var _ref5;

    var _temp4, _this7, _ret4;

    _classCallCheck(this, AbstractView);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp4 = (_this7 = _possibleConstructorReturn(this, (_ref5 = AbstractView.__proto__ || Object.getPrototypeOf(AbstractView)).call.apply(_ref5, [this].concat(args))), _this7), _this7._addFragment = function () {
      _this7.props.modifySelections([].concat(_toConsumableArray(_this7.props.selections), [_this7._previousSelection || {
        kind: 'InlineFragment',
        typeCondition: {
          kind: 'NamedType',
          name: { kind: 'Name', value: _this7.props.implementingType.name }
        },
        selectionSet: {
          kind: 'SelectionSet',
          selections: _this7.props.getDefaultFieldNames(_this7.props.implementingType).map(function (fieldName) {
            return {
              kind: 'Field',
              name: { kind: 'Name', value: fieldName }
            };
          })
        }
      }]));
    }, _this7._removeFragment = function () {
      var thisSelection = _this7._getSelection();
      _this7._previousSelection = thisSelection;
      _this7.props.modifySelections(_this7.props.selections.filter(function (s) {
        return s !== thisSelection;
      }));
    }, _this7._getSelection = function () {
      var selection = _this7.props.selections.find(function (selection) {
        return selection.kind === 'InlineFragment' && selection.typeCondition && _this7.props.implementingType.name === selection.typeCondition.name.value;
      });
      if (!selection) {
        return null;
      }
      if (selection.kind === 'InlineFragment') {
        return selection;
      }
    }, _this7._modifyChildSelections = function (selections) {
      var thisSelection = _this7._getSelection();
      _this7.props.modifySelections(_this7.props.selections.map(function (selection) {
        if (selection === thisSelection) {
          return {
            directives: selection.directives,
            kind: 'InlineFragment',
            typeCondition: {
              kind: 'NamedType',
              name: { kind: 'Name', value: _this7.props.implementingType.name }
            },
            selectionSet: {
              kind: 'SelectionSet',
              selections: selections
            }
          };
        }
        return selection;
      }));
    }, _temp4), _possibleConstructorReturn(_this7, _ret4);
  }

  _createClass(AbstractView, [{
    key: 'render',
    value: function render() {
      var _this8 = this;

      var _props5 = this.props,
          implementingType = _props5.implementingType,
          schema = _props5.schema,
          getDefaultFieldNames = _props5.getDefaultFieldNames,
          styleConfig = _props5.styleConfig;

      var selection = this._getSelection();
      var fields = implementingType.getFields();
      var childSelections = selection ? selection.selectionSet ? selection.selectionSet.selections : [] : [];
      return React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          {
            style: { cursor: 'pointer' },
            onClick: selection ? this._removeFragment : this._addFragment },
          React.createElement(Checkbox, {
            checked: !!selection,
            styleConfig: this.props.styleConfig
          }),
          React.createElement(
            'span',
            { style: { color: styleConfig.colors.atom } },
            this.props.implementingType.name
          )
        ),
        selection ? React.createElement(
          'div',
          { style: { marginLeft: 16 } },
          Object.keys(fields).sort().map(function (fieldName) {
            return React.createElement(FieldView, {
              key: fieldName,
              field: fields[fieldName],
              selections: childSelections,
              modifySelections: _this8._modifyChildSelections,
              schema: schema,
              getDefaultFieldNames: getDefaultFieldNames,
              getDefaultScalarArgValue: _this8.props.getDefaultScalarArgValue,
              makeDefaultArg: _this8.props.makeDefaultArg,
              onRunOperation: _this8.props.onRunOperation,
              styleConfig: _this8.props.styleConfig
            });
          })
        ) : null
      );
    }
  }]);

  return AbstractView;
}(React.PureComponent);

function defaultInputObjectFields(getDefaultScalarArgValue, makeDefaultArg, parentField, fields) {
  var nodes = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _field = _step.value;

      if ((0, _graphql.isRequiredInputField)(_field) || makeDefaultArg && makeDefaultArg(parentField, _field)) {
        var fieldType = unwrapInputType(_field.type);
        if ((0, _graphql.isInputObjectType)(fieldType)) {
          (function () {
            var fields = fieldType.getFields();
            nodes.push({
              kind: 'ObjectField',
              name: { kind: 'Name', value: _field.name },
              value: {
                kind: 'ObjectValue',
                fields: defaultInputObjectFields(getDefaultScalarArgValue, makeDefaultArg, parentField, Object.keys(fields).map(function (k) {
                  return fields[k];
                }))
              }
            });
          })();
        } else if ((0, _graphql.isLeafType)(fieldType)) {
          nodes.push({
            kind: 'ObjectField',
            name: { kind: 'Name', value: _field.name },
            value: getDefaultScalarArgValue(parentField, _field, fieldType)
          });
        }
      }
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

  return nodes;
}

function defaultArgs(getDefaultScalarArgValue, makeDefaultArg, field) {
  var args = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = field.args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _arg = _step2.value;

      if (isRequiredArgument(_arg) || makeDefaultArg && makeDefaultArg(field, _arg)) {
        var argType = unwrapInputType(_arg.type);
        if ((0, _graphql.isInputObjectType)(argType)) {
          (function () {
            var fields = argType.getFields();
            args.push({
              kind: 'Argument',
              name: { kind: 'Name', value: _arg.name },
              value: {
                kind: 'ObjectValue',
                fields: defaultInputObjectFields(getDefaultScalarArgValue, makeDefaultArg, field, Object.keys(fields).map(function (k) {
                  return fields[k];
                }))
              }
            });
          })();
        } else if ((0, _graphql.isLeafType)(argType)) {
          args.push({
            kind: 'Argument',
            name: { kind: 'Name', value: _arg.name },
            value: getDefaultScalarArgValue(field, _arg, argType)
          });
        }
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

  return args;
}

var FieldView = function (_React$PureComponent6) {
  _inherits(FieldView, _React$PureComponent6);

  function FieldView() {
    var _ref6;

    var _temp5, _this9, _ret7;

    _classCallCheck(this, FieldView);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _ret7 = (_temp5 = (_this9 = _possibleConstructorReturn(this, (_ref6 = FieldView.__proto__ || Object.getPrototypeOf(FieldView)).call.apply(_ref6, [this].concat(args))), _this9), _this9._addAllFieldsToSelections = function (rawSubfields) {
      var subFields = !!rawSubfields ? Object.keys(rawSubfields).map(function (fieldName) {
        return {
          kind: 'Field',
          name: { kind: 'Name', value: fieldName },
          arguments: []
        };
      }) : [];

      var subSelectionSet = {
        kind: 'SelectionSet',
        selections: subFields
      };

      var nextSelections = [].concat(_toConsumableArray(_this9.props.selections.filter(function (selection) {
        if (selection.kind === 'InlineFragment') {
          return true;
        } else {
          // Remove the current selection set for the target field
          return selection.name.value !== _this9.props.field.name;
        }
      })), [{
        kind: 'Field',
        name: { kind: 'Name', value: _this9.props.field.name },
        arguments: defaultArgs(_this9.props.getDefaultScalarArgValue, _this9.props.makeDefaultArg, _this9.props.field),
        selectionSet: subSelectionSet
      }]);

      _this9.props.modifySelections(nextSelections);
    }, _this9._addFieldToSelections = function (rawSubfields) {
      var nextSelections = [].concat(_toConsumableArray(_this9.props.selections), [_this9._previousSelection || {
        kind: 'Field',
        name: { kind: 'Name', value: _this9.props.field.name },
        arguments: defaultArgs(_this9.props.getDefaultScalarArgValue, _this9.props.makeDefaultArg, _this9.props.field)
      }]);

      _this9.props.modifySelections(nextSelections);
    }, _this9._handleUpdateSelections = function (event) {
      var selection = _this9._getSelection();
      if (selection && !event.altKey) {
        _this9._removeFieldFromSelections();
      } else {
        var fieldType = (0, _graphql.getNamedType)(_this9.props.field.type);
        var rawSubfields = (0, _graphql.isObjectType)(fieldType) && fieldType.getFields();

        var shouldSelectAllSubfields = !!rawSubfields && event.altKey;

        shouldSelectAllSubfields ? _this9._addAllFieldsToSelections(rawSubfields) : _this9._addFieldToSelections(rawSubfields);
      }
    }, _this9._removeFieldFromSelections = function () {
      var previousSelection = _this9._getSelection();
      _this9._previousSelection = previousSelection;
      _this9.props.modifySelections(_this9.props.selections.filter(function (selection) {
        return selection !== previousSelection;
      }));
    }, _this9._getSelection = function () {
      var selection = _this9.props.selections.find(function (selection) {
        return selection.kind === 'Field' && _this9.props.field.name === selection.name.value;
      });
      if (!selection) {
        return null;
      }
      if (selection.kind === 'Field') {
        return selection;
      }
    }, _this9._setArguments = function (argumentNodes) {
      var selection = _this9._getSelection();
      if (!selection) {
        console.error('Missing selection when setting arguments', argumentNodes);
        return;
      }
      _this9.props.modifySelections(_this9.props.selections.map(function (s) {
        return s === selection ? {
          alias: selection.alias,
          arguments: argumentNodes,
          directives: selection.directives,
          kind: 'Field',
          name: selection.name,
          selectionSet: selection.selectionSet
        } : s;
      }));
    }, _this9._modifyChildSelections = function (selections) {
      _this9.props.modifySelections(_this9.props.selections.map(function (selection) {
        if (selection.kind === 'Field' && _this9.props.field.name === selection.name.value) {
          if (selection.kind !== 'Field') {
            throw new Error('invalid selection');
          }
          return {
            alias: selection.alias,
            arguments: selection.arguments,
            directives: selection.directives,
            kind: 'Field',
            name: selection.name,
            selectionSet: {
              kind: 'SelectionSet',
              selections: selections
            }
          };
        }
        return selection;
      }));
    }, _temp5), _possibleConstructorReturn(_this9, _ret7);
  }

  _createClass(FieldView, [{
    key: 'render',
    value: function render() {
      var _this10 = this;

      var _props6 = this.props,
          field = _props6.field,
          schema = _props6.schema,
          getDefaultFieldNames = _props6.getDefaultFieldNames,
          styleConfig = _props6.styleConfig;

      var selection = this._getSelection();
      var type = unwrapOutputType(field.type);
      var args = field.args.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      var node = React.createElement(
        'div',
        { className: 'graphiql-explorer-node' },
        React.createElement(
          'span',
          {
            title: field.description,
            style: {
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '16px',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            },
            'data-field-name': field.name,
            'data-field-type': type.name,
            onClick: this._handleUpdateSelections },
          (0, _graphql.isObjectType)(type) ? React.createElement(
            'span',
            null,
            !!selection ? this.props.styleConfig.arrowOpen : this.props.styleConfig.arrowClosed
          ) : null,
          (0, _graphql.isObjectType)(type) ? null : React.createElement(Checkbox, {
            checked: !!selection,
            styleConfig: this.props.styleConfig
          }),
          React.createElement(
            'span',
            { style: { color: styleConfig.colors.property } },
            field.name
          )
        ),
        selection && args.length ? React.createElement(
          'div',
          { style: { marginLeft: 16 } },
          args.map(function (arg) {
            return React.createElement(ArgView, {
              key: arg.name,
              parentField: field,
              arg: arg,
              selection: selection,
              modifyArguments: _this10._setArguments,
              getDefaultScalarArgValue: _this10.props.getDefaultScalarArgValue,
              makeDefaultArg: _this10.props.makeDefaultArg,
              onRunOperation: _this10.props.onRunOperation,
              styleConfig: _this10.props.styleConfig
            });
          })
        ) : null
      );

      if (selection && ((0, _graphql.isObjectType)(type) || (0, _graphql.isInterfaceType)(type) || (0, _graphql.isUnionType)(type))) {
        var _fields4 = (0, _graphql.isUnionType)(type) ? {} : type.getFields();
        var childSelections = selection ? selection.selectionSet ? selection.selectionSet.selections : [] : [];
        return React.createElement(
          'div',
          null,
          node,
          React.createElement(
            'div',
            { style: { marginLeft: 16 } },
            Object.keys(_fields4).sort().map(function (fieldName) {
              return React.createElement(FieldView, {
                key: fieldName,
                field: _fields4[fieldName],
                selections: childSelections,
                modifySelections: _this10._modifyChildSelections,
                schema: schema,
                getDefaultFieldNames: getDefaultFieldNames,
                getDefaultScalarArgValue: _this10.props.getDefaultScalarArgValue,
                makeDefaultArg: _this10.props.makeDefaultArg,
                onRunOperation: _this10.props.onRunOperation,
                styleConfig: _this10.props.styleConfig
              });
            }),
            (0, _graphql.isInterfaceType)(type) || (0, _graphql.isUnionType)(type) ? schema.getPossibleTypes(type).map(function (type) {
              return React.createElement(AbstractView, {
                key: type.name,
                implementingType: type,
                selections: childSelections,
                modifySelections: _this10._modifyChildSelections,
                schema: schema,
                getDefaultFieldNames: getDefaultFieldNames,
                getDefaultScalarArgValue: _this10.props.getDefaultScalarArgValue,
                makeDefaultArg: _this10.props.makeDefaultArg,
                onRunOperation: _this10.props.onRunOperation,
                styleConfig: _this10.props.styleConfig
              });
            }) : null
          )
        );
      }
      return node;
    }
  }]);

  return FieldView;
}(React.PureComponent);

function parseQuery(text) {
  try {
    if (!text.trim()) {
      return null;
    }
    return (0, _graphql.parse)(text,
    // Tell graphql to not bother track locations when parsing, we don't need
    // it and it's a tiny bit more expensive.
    { noLocation: true });
  } catch (e) {
    return new Error(e);
  }
}

var DEFAULT_OPERATION = {
  kind: 'OperationDefinition',
  operation: 'query',
  variableDefinitions: [],
  name: { kind: 'Name', value: 'MyQuery' },
  directives: [],
  selectionSet: {
    kind: 'SelectionSet',
    selections: []
  }
};
var DEFAULT_DOCUMENT = {
  kind: 'Document',
  definitions: [DEFAULT_OPERATION]
};
var parseQueryMemoize = null;
function memoizeParseQuery(query) {
  if (parseQueryMemoize && parseQueryMemoize[0] === query) {
    return parseQueryMemoize[1];
  } else {
    var result = parseQuery(query);
    if (!result) {
      return DEFAULT_DOCUMENT;
    } else if (result instanceof Error) {
      if (parseQueryMemoize) {
        // Most likely a temporarily invalid query while they type
        return parseQueryMemoize[1];
      } else {
        return DEFAULT_DOCUMENT;
      }
    } else {
      parseQueryMemoize = [query, result];
      return result;
    }
  }
}

var defaultStyles = {
  buttonStyle: {
    fontSize: '1.2em',
    padding: '0px',
    backgroundColor: 'white',
    border: 'none',
    margin: '5px 0px',
    height: '40px',
    width: '100%',
    display: 'block',
    maxWidth: 'none'
  },

  explorerActionsStyle: {
    margin: '4px -8px -8px',
    paddingLeft: '8px',
    bottom: '0px',
    width: '100%',
    textAlign: 'center',
    background: 'none',
    borderTop: 'none',
    borderBottom: 'none'
  }
};

var RootView = function (_React$PureComponent7) {
  _inherits(RootView, _React$PureComponent7);

  function RootView() {
    var _ref7;

    var _temp6, _this11, _ret8;

    _classCallCheck(this, RootView);

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _ret8 = (_temp6 = (_this11 = _possibleConstructorReturn(this, (_ref7 = RootView.__proto__ || Object.getPrototypeOf(RootView)).call.apply(_ref7, [this].concat(args))), _this11), _this11._modifySelections = function (selections) {
      var operationDef = _this11.props.definition;

      if (operationDef.selectionSet.selections.length === 0 && _this11._previousOperationDef) {
        operationDef = _this11._previousOperationDef;
      }

      var newOperationDef = void 0;

      if (selections.length === 0) {
        _this11._previousOperationDef = operationDef;
        newOperationDef = null;
      } else if (operationDef.kind === 'FragmentDefinition') {
        newOperationDef = _extends({}, operationDef, {
          selectionSet: _extends({}, operationDef.selectionSet, {
            selections: selections
          })
        });
      } else if (operationDef.kind === 'OperationDefinition') {
        newOperationDef = _extends({}, operationDef, {
          selectionSet: _extends({}, operationDef.selectionSet, {
            selections: selections
          })
        });
      }

      _this11.props.onEdit(newOperationDef);
    }, _this11._onOperationRename = function (event) {
      return _this11.props.onOperationRename(event.target.value);
    }, _this11._handlePotentialRun = function (event) {
      if (isRunShortcut(event)) {
        _this11.props.onRunOperation(_this11.props.name);
      }
    }, _temp6), _possibleConstructorReturn(_this11, _ret8);
  }

  _createClass(RootView, [{
    key: 'render',
    value: function render() {
      var _this12 = this;

      var _props7 = this.props,
          operation = _props7.operation,
          name = _props7.name,
          definition = _props7.definition,
          schema = _props7.schema,
          getDefaultFieldNames = _props7.getDefaultFieldNames,
          styleConfig = _props7.styleConfig;

      var fields = this.props.fields || {};
      var operationDef = definition;
      var selections = operationDef.selectionSet.selections;

      var operationDisplayName = this.props.name || capitalize(operation) + ' Name';

      return React.createElement(
        'div',
        {
          id: operation + '-' + (name || 'unknown'),
          style: {
            borderBottom: '1px solid #d6d6d6',
            marginBottom: '0em',
            paddingBottom: '1em'
          } },
        React.createElement(
          'div',
          { style: { color: styleConfig.colors.keyword, paddingBottom: 4 } },
          operation,
          ' ',
          React.createElement(
            'span',
            { style: { color: styleConfig.colors.def } },
            React.createElement('input', {
              style: {
                color: styleConfig.colors.def,
                border: 'none',
                borderBottom: '1px solid #888',
                outline: 'none',
                width: Math.max(4, operationDisplayName.length) + 'ch'
              },
              autoComplete: 'false',
              placeholder: capitalize(operation) + ' Name',
              value: this.props.name,
              onKeyDown: this._handlePotentialRun,
              onChange: this._onOperationRename
            })
          ),
          !!this.props.onTypeName ? React.createElement(
            'span',
            null,
            React.createElement('br', null),
            'on ' + this.props.onTypeName
          ) : ''
        ),
        Object.keys(fields).sort().map(function (fieldName) {
          return React.createElement(FieldView, {
            key: fieldName,
            field: fields[fieldName],
            selections: selections,
            modifySelections: _this12._modifySelections,
            schema: schema,
            getDefaultFieldNames: getDefaultFieldNames,
            getDefaultScalarArgValue: _this12.props.getDefaultScalarArgValue,
            makeDefaultArg: _this12.props.makeDefaultArg,
            onRunOperation: _this12.props.onRunOperation,
            styleConfig: _this12.props.styleConfig
          });
        })
      );
    }
  }]);

  return RootView;
}(React.PureComponent);

var Explorer = function (_React$PureComponent8) {
  _inherits(Explorer, _React$PureComponent8);

  function Explorer() {
    var _ref8;

    var _temp7, _this13, _ret9;

    _classCallCheck(this, Explorer);

    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return _ret9 = (_temp7 = (_this13 = _possibleConstructorReturn(this, (_ref8 = Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call.apply(_ref8, [this].concat(args))), _this13), _this13._resetScroll = function () {
      var container = _this13._ref;
      if (container) {
        container.scrollLeft = 0;
      }
    }, _this13._onEdit = function (query) {
      return _this13.props.onEdit(query);
    }, _temp7), _possibleConstructorReturn(_this13, _ret9);
  }

  _createClass(Explorer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._resetScroll();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this14 = this;

      var _props8 = this.props,
          schema = _props8.schema,
          query = _props8.query,
          makeDefaultArg = _props8.makeDefaultArg;


      if (!schema) {
        return React.createElement(
          'div',
          { style: { fontFamily: 'sans-serif' }, className: 'error-container' },
          'No Schema Available'
        );
      }
      var styleConfig = {
        colors: this.props.colors || defaultColors,
        checkboxChecked: this.props.checkboxChecked || defaultCheckboxChecked,
        checkboxUnchecked: this.props.checkboxUnchecked || defaultCheckboxUnchecked,
        arrowClosed: this.props.arrowClosed || defaultArrowClosed,
        arrowOpen: this.props.arrowOpen || defaultArrowOpen,
        styles: this.props.styles ? _extends({}, defaultStyles, this.props.styles) : defaultStyles
      };
      var queryType = schema.getQueryType();
      var mutationType = schema.getMutationType();
      var subscriptionType = schema.getSubscriptionType();
      if (!queryType && !mutationType && !subscriptionType) {
        return React.createElement(
          'div',
          null,
          'Missing query type'
        );
      }
      var queryFields = queryType && queryType.getFields();
      var mutationFields = mutationType && mutationType.getFields();
      var subscriptionFields = subscriptionType && subscriptionType.getFields();

      var parsedQuery = memoizeParseQuery(query);
      var getDefaultFieldNames = this.props.getDefaultFieldNames || defaultGetDefaultFieldNames;
      var getDefaultScalarArgValue = this.props.getDefaultScalarArgValue || defaultGetDefaultScalarArgValue;

      var definitions = parsedQuery.definitions;

      var _relevantOperations = definitions.map(function (definition) {
        if (definition.kind === 'FragmentDefinition') {
          return definition;
        } else if (definition.kind === 'OperationDefinition') {
          return definition;
        } else {
          return null;
        }
      }).filter(Boolean);

      var relevantOperations =
      // If we don't have any relevant definitions from the parsed document,
      // then at least show an expanded Query selection
      _relevantOperations.length === 0 ? DEFAULT_DOCUMENT.definitions : _relevantOperations;

      var renameOperation = function renameOperation(targetOperation, name) {
        var newName = name == null || name === '' ? null : { kind: 'Name', value: name, loc: undefined };
        var newOperation = _extends({}, targetOperation, { name: newName });

        var existingDefs = parsedQuery.definitions;

        var newDefinitions = existingDefs.map(function (existingOperation) {
          if (targetOperation === existingOperation) {
            return newOperation;
          } else {
            return existingOperation;
          }
        });

        return _extends({}, parsedQuery, {
          definitions: newDefinitions
        });
      };

      var addOperation = function addOperation(kind) {
        var existingDefs = parsedQuery.definitions;

        var viewingDefaultOperation = parsedQuery.definitions.length === 1 && parsedQuery.definitions[0] === DEFAULT_DOCUMENT.definitions[0];

        var MySiblingDefs = viewingDefaultOperation ? [] : existingDefs.filter(function (def) {
          if (def.kind === 'OperationDefinition') {
            return def.operation === kind;
          } else {
            // Don't support adding fragments from explorer
            return false;
          }
        });

        var newOperationName = 'My' + capitalize(kind) + (MySiblingDefs.length === 0 ? '' : MySiblingDefs.length + 1);

        // Add this as the default field as it guarantees a valid selectionSet
        var firstFieldName = '__typename # Placeholder value';

        var selectionSet = {
          kind: 'SelectionSet',
          selections: [{
            kind: 'Field',
            name: {
              kind: 'Name',
              value: firstFieldName,
              loc: null
            },
            arguments: [],
            directives: [],
            selectionSet: null,
            loc: null
          }],
          loc: null
        };

        var newDefinition = {
          kind: 'OperationDefinition',
          operation: kind,
          name: { kind: 'Name', value: newOperationName },
          variableDefinitions: [],
          directives: [],
          selectionSet: selectionSet,
          loc: null
        };

        var newDefinitions =
        // If we only have our default operation in the document right now, then
        // just replace it with our new definition
        viewingDefaultOperation ? [newDefinition] : [].concat(_toConsumableArray(parsedQuery.definitions), [newDefinition]);

        var newOperationDef = _extends({}, parsedQuery, {
          definitions: newDefinitions
        });

        _this14.props.onEdit((0, _graphql.print)(newOperationDef));
      };

      return React.createElement(
        'div',
        {
          ref: function ref(_ref9) {
            _this14._ref = _ref9;
          },
          style: {
            fontSize: 12,
            overflow: 'scroll',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            margin: 0,
            padding: 8,
            fontFamily: 'Consolas, Inconsolata, "Droid Sans Mono", Monaco, monospace'
          },
          className: 'graphiql-explorer-root' },
        relevantOperations.map(function (operation, index) {
          var operationName = operation && operation.name && operation.name.value;

          var operationKind = operation.kind === 'FragmentDefinition' ? 'fragment' : operation && operation.operation || 'query';

          var onOperationRename = function onOperationRename(newName) {
            var newOperationDef = renameOperation(operation, newName);
            _this14.props.onEdit((0, _graphql.print)(newOperationDef));
          };

          var fragmentType = operation.kind === 'FragmentDefinition' && operation.typeCondition.kind === 'NamedType' && schema.getType(operation.typeCondition.name.value);

          var fragmentFields = fragmentType instanceof _graphql.GraphQLObjectType ? fragmentType.getFields() : null;

          var fields = operationKind === 'query' ? queryFields : operationKind === 'mutation' ? mutationFields : operationKind === 'subscription' ? subscriptionFields : operation.kind === 'FragmentDefinition' ? fragmentFields : null;

          var fragmentTypeName = operation.kind === 'FragmentDefinition' ? operation.typeCondition.name.value : null;

          return React.createElement(RootView, {
            key: index,
            fields: fields,
            operation: operationKind,
            name: operationName,
            definition: operation,
            onOperationRename: onOperationRename,
            onTypeName: fragmentTypeName,
            onEdit: function onEdit(newDefinition) {
              var newQuery = _extends({}, parsedQuery, {
                definitions: parsedQuery.definitions.map(function (existingDefinition) {
                  return existingDefinition === operation ? newDefinition : existingDefinition;
                })
              });

              var textualNewQuery = (0, _graphql.print)(newQuery);

              _this14.props.onEdit(textualNewQuery);
            },
            schema: schema,
            getDefaultFieldNames: getDefaultFieldNames,
            getDefaultScalarArgValue: getDefaultScalarArgValue,
            makeDefaultArg: makeDefaultArg,
            onRunOperation: function onRunOperation() {
              if (!!_this14.props.onRunOperation) {
                _this14.props.onRunOperation(operationName);
              }
            },
            styleConfig: styleConfig
          });
        }),
        React.createElement(
          'div',
          {
            className: 'variable-editor-title',
            style: styleConfig.styles.explorerActionsStyle },
          !!queryFields ? React.createElement(
            'button',
            {
              className: 'toolbar-button',
              style: styleConfig.styles.buttonStyle,
              type: 'link',
              onClick: function onClick() {
                return addOperation('query');
              } },
            '+ ADD NEW QUERY'
          ) : null,
          !!mutationFields ? React.createElement(
            'button',
            {
              className: 'toolbar-button',
              style: styleConfig.styles.buttonStyle,
              type: 'link',
              onClick: function onClick() {
                return addOperation('mutation');
              } },
            '+ ADD NEW MUTATION'
          ) : null,
          !!subscriptionFields ? React.createElement(
            'button',
            {
              className: 'toolbar-button',
              style: styleConfig.styles.buttonStyle,
              type: 'link',
              onClick: function onClick() {
                return addOperation('subscription');
              } },
            '+ ADD NEW SUBSCRIPTION'
          ) : null
        )
      );
    }
  }]);

  return Explorer;
}(React.PureComponent);

Explorer.defaultProps = {
  getDefaultFieldNames: defaultGetDefaultFieldNames,
  getDefaultScalarArgValue: defaultGetDefaultScalarArgValue
};

var ErrorBoundary = function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  function ErrorBoundary() {
    var _ref10;

    var _temp8, _this15, _ret10;

    _classCallCheck(this, ErrorBoundary);

    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return _ret10 = (_temp8 = (_this15 = _possibleConstructorReturn(this, (_ref10 = ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call.apply(_ref10, [this].concat(args))), _this15), _this15.state = { hasError: false, error: null, errorInfo: null }, _temp8), _possibleConstructorReturn(_this15, _ret10);
  }

  _createClass(ErrorBoundary, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true, error: error, errorInfo: errorInfo });
      console.error('Error in component', error, errorInfo);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.hasError) {
        return React.createElement(
          'div',
          { style: { padding: 18, fontFamily: 'sans-serif' } },
          React.createElement(
            'div',
            null,
            'Something went wrong'
          ),
          React.createElement(
            'details',
            { style: { whiteSpace: 'pre-wrap' } },
            this.state.error ? this.state.error.toString() : null,
            React.createElement('br', null),
            this.state.errorInfo ? this.state.errorInfo.componentStack : null
          )
        );
      }
      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(React.Component);

var ExplorerWrapper = function (_React$PureComponent9) {
  _inherits(ExplorerWrapper, _React$PureComponent9);

  function ExplorerWrapper() {
    _classCallCheck(this, ExplorerWrapper);

    return _possibleConstructorReturn(this, (ExplorerWrapper.__proto__ || Object.getPrototypeOf(ExplorerWrapper)).apply(this, arguments));
  }

  _createClass(ExplorerWrapper, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        {
          className: 'historyPaneWrap',
          style: {
            height: '100%',
            width: this.props.width,
            zIndex: 7,
            display: this.props.explorerIsOpen ? 'block' : 'none'
          } },
        React.createElement(
          'div',
          { className: 'history-title-bar' },
          React.createElement(
            'div',
            { className: 'history-title' },
            this.props.title
          ),
          React.createElement(
            'div',
            { className: 'doc-explorer-rhs' },
            React.createElement(
              'div',
              {
                className: 'docExplorerHide',
                onClick: this.props.onToggleExplorer },
              '\u2715'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'history-contents' },
          React.createElement(
            ErrorBoundary,
            null,
            React.createElement(Explorer, this.props)
          )
        )
      );
    }
  }]);

  return ExplorerWrapper;
}(React.PureComponent);

ExplorerWrapper.defaultValue = defaultValue;
ExplorerWrapper.defaultProps = {
  width: 380,
  title: 'Explorer'
};
exports.default = ExplorerWrapper;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"graphql":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explorer = undefined;

var _Explorer = require('./Explorer');

var _Explorer2 = _interopRequireDefault(_Explorer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Explorer = _Explorer2.default;
exports.default = _Explorer2.default;
},{"./Explorer":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLError = GraphQLError;

var _printError = require("./printError");

var _location = require("../language/location");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function GraphQLError( // eslint-disable-line no-redeclare
message, nodes, source, positions, path, originalError, extensions) {
  // Compute list of blame nodes.
  var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.


  var _source = source;

  if (!_source && _nodes) {
    var node = _nodes[0];
    _source = node && node.loc && node.loc.source;
  }

  var _positions = positions;

  if (!_positions && _nodes) {
    _positions = _nodes.reduce(function (list, node) {
      if (node.loc) {
        list.push(node.loc.start);
      }

      return list;
    }, []);
  }

  if (_positions && _positions.length === 0) {
    _positions = undefined;
  }

  var _locations;

  if (positions && source) {
    _locations = positions.map(function (pos) {
      return (0, _location.getLocation)(source, pos);
    });
  } else if (_nodes) {
    _locations = _nodes.reduce(function (list, node) {
      if (node.loc) {
        list.push((0, _location.getLocation)(node.loc.source, node.loc.start));
      }

      return list;
    }, []);
  }

  var _extensions = extensions || originalError && originalError.extensions;

  Object.defineProperties(this, {
    message: {
      value: message,
      // By being enumerable, JSON.stringify will include `message` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: true,
      writable: true
    },
    locations: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _locations || undefined,
      // By being enumerable, JSON.stringify will include `locations` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: Boolean(_locations)
    },
    path: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: path || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: Boolean(path)
    },
    nodes: {
      value: _nodes || undefined
    },
    source: {
      value: _source || undefined
    },
    positions: {
      value: _positions || undefined
    },
    originalError: {
      value: originalError
    },
    extensions: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _extensions || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplest possible GraphQL
      // service adheres to the spec.
      enumerable: Boolean(_extensions)
    }
  }); // Include (non-enumerable) stack trace.

  if (originalError && originalError.stack) {
    Object.defineProperty(this, 'stack', {
      value: originalError.stack,
      writable: true,
      configurable: true
    });
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, GraphQLError);
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true,
      configurable: true
    });
  }
}

GraphQLError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: GraphQLError
  },
  name: {
    value: 'GraphQLError'
  },
  toString: {
    value: function toString() {
      return (0, _printError.printError)(this);
    }
  }
});
},{"../language/location":39,"./printError":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = formatError;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error) {
  !error ? (0, _invariant.default)(0, 'Received null or undefined error.') : void 0;
  var message = error.message || 'An unknown error occurred.';
  var locations = error.locations;
  var path = error.path;
  var extensions = error.extensions;
  return extensions ? {
    message: message,
    locations: locations,
    path: path,
    extensions: extensions
  } : {
    message: message,
    locations: locations,
    path: path
  };
}
},{"../jsutils/invariant":19}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GraphQLError", {
  enumerable: true,
  get: function get() {
    return _GraphQLError.GraphQLError;
  }
});
Object.defineProperty(exports, "syntaxError", {
  enumerable: true,
  get: function get() {
    return _syntaxError.syntaxError;
  }
});
Object.defineProperty(exports, "locatedError", {
  enumerable: true,
  get: function get() {
    return _locatedError.locatedError;
  }
});
Object.defineProperty(exports, "printError", {
  enumerable: true,
  get: function get() {
    return _printError.printError;
  }
});
Object.defineProperty(exports, "formatError", {
  enumerable: true,
  get: function get() {
    return _formatError.formatError;
  }
});

var _GraphQLError = require("./GraphQLError");

var _syntaxError = require("./syntaxError");

var _locatedError = require("./locatedError");

var _printError = require("./printError");

var _formatError = require("./formatError");
},{"./GraphQLError":3,"./formatError":4,"./locatedError":6,"./printError":7,"./syntaxError":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locatedError = locatedError;

var _GraphQLError = require("./GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(originalError, nodes, path) {
  // Note: this uses a brand-check to support GraphQL errors originating from
  // other contexts.
  if (originalError && Array.isArray(originalError.path)) {
    return originalError;
  }

  return new _GraphQLError.GraphQLError(originalError && originalError.message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
}
},{"./GraphQLError":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printError = printError;

var _location = require("../language/location");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 */
function printError(error) {
  var printedLocations = [];

  if (error.nodes) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = error.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;

        if (node.loc) {
          printedLocations.push(highlightSourceAtLocation(node.loc.source, (0, _location.getLocation)(node.loc.source, node.loc.start)));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else if (error.source && error.locations) {
    var source = error.source;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = error.locations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var location = _step2.value;
        printedLocations.push(highlightSourceAtLocation(source, location));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return printedLocations.length === 0 ? error.message : [error.message].concat(printedLocations).join('\n\n') + '\n';
}
/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */


function highlightSourceAtLocation(source, location) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = location.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = location.line + lineOffset;
  var columnOffset = location.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = location.column + columnOffset;
  var lines = body.split(/\r\n|[\n\r]/g);
  return "".concat(source.name, " (").concat(lineNum, ":").concat(columnNum, ")\n") + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
  ["".concat(lineNum - 1, ": "), lines[lineIndex - 1]], ["".concat(lineNum, ": "), lines[lineIndex]], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1, ": "), lines[lineIndex + 1]]]);
}

function printPrefixedLines(lines) {
  var existingLines = lines.filter(function (_ref) {
    var _ = _ref[0],
        line = _ref[1];
    return line !== undefined;
  });
  var padLen = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = existingLines[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref4 = _step3.value;
      var prefix = _ref4[0];
      padLen = Math.max(padLen, prefix.length);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return existingLines.map(function (_ref3) {
    var prefix = _ref3[0],
        line = _ref3[1];
    return lpad(padLen, prefix) + line;
  }).join('\n');
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function lpad(len, str) {
  return whitespace(len - str.length) + str;
}
},{"../language/location":39}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxError = syntaxError;

var _GraphQLError = require("./GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */
function syntaxError(source, position, description) {
  return new _GraphQLError.GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
}
},{"./GraphQLError":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.responsePathAsArray = responsePathAsArray;
exports.addPath = addPath;
exports.assertValidExecutionArguments = assertValidExecutionArguments;
exports.buildExecutionContext = buildExecutionContext;
exports.collectFields = collectFields;
exports.buildResolveInfo = buildResolveInfo;
exports.resolveFieldValueOrError = resolveFieldValueOrError;
exports.getFieldDef = getFieldDef;
exports.defaultFieldResolver = void 0;

var _iterall = require("iterall");

var _GraphQLError = require("../error/GraphQLError");

var _locatedError = require("../error/locatedError");

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _isNullish = _interopRequireDefault(require("../jsutils/isNullish"));

var _isPromise = _interopRequireDefault(require("../jsutils/isPromise"));

var _memoize = _interopRequireDefault(require("../jsutils/memoize3"));

var _promiseForObject = _interopRequireDefault(require("../jsutils/promiseForObject"));

var _promiseReduce = _interopRequireDefault(require("../jsutils/promiseReduce"));

var _getOperationRootType = require("../utilities/getOperationRootType");

var _typeFromAST = require("../utilities/typeFromAST");

var _kinds = require("../language/kinds");

var _values = require("./values");

var _definition = require("../type/definition");

var _introspection = require("../type/introspection");

var _directives = require("../type/directives");

var _validate = require("../type/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function execute(argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  /* eslint-enable no-redeclare */
  // Extract arguments from object args if provided.
  return arguments.length === 1 ? executeImpl(argsOrSchema.schema, argsOrSchema.document, argsOrSchema.rootValue, argsOrSchema.contextValue, argsOrSchema.variableValues, argsOrSchema.operationName, argsOrSchema.fieldResolver) : executeImpl(argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver);
}

function executeImpl(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  // If arguments are missing or incorrect, throw an error.
  assertValidExecutionArguments(schema, document, variableValues); // If a valid execution context cannot be created due to incorrect arguments,
  // a "Response" with only errors is returned.

  var exeContext = buildExecutionContext(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver); // Return early errors if execution context failed.

  if (Array.isArray(exeContext)) {
    return {
      errors: exeContext
    };
  } // Return a Promise that will eventually resolve to the data described by
  // The "Response" section of the GraphQL specification.
  //
  // If errors are encountered while executing a GraphQL field, only that
  // field and its descendants will be omitted, and sibling fields will still
  // be executed. An execution which encounters errors will still result in a
  // resolved Promise.


  var data = executeOperation(exeContext, exeContext.operation, rootValue);
  return buildResponse(exeContext, data);
}
/**
 * Given a completed execution context and data, build the { errors, data }
 * response defined by the "Response" section of the GraphQL specification.
 */


function buildResponse(exeContext, data) {
  if ((0, _isPromise.default)(data)) {
    return data.then(function (resolved) {
      return buildResponse(exeContext, resolved);
    });
  }

  return exeContext.errors.length === 0 ? {
    data: data
  } : {
    errors: exeContext.errors,
    data: data
  };
}
/**
 * Given a ResponsePath (found in the `path` entry in the information provided
 * as the last argument to a field resolver), return an Array of the path keys.
 */


function responsePathAsArray(path) {
  var flattened = [];
  var curr = path;

  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }

  return flattened.reverse();
}
/**
 * Given a ResponsePath and a key, return a new ResponsePath containing the
 * new key.
 */


function addPath(prev, key) {
  return {
    prev: prev,
    key: key
  };
}
/**
 * Essential assertions before executing to provide developer feedback for
 * improper use of the GraphQL library.
 */


function assertValidExecutionArguments(schema, document, rawVariableValues) {
  !document ? (0, _invariant.default)(0, 'Must provide document') : void 0; // If the schema used for execution is invalid, throw an error.

  (0, _validate.assertValidSchema)(schema); // Variables, if provided, must be an object.

  !(!rawVariableValues || _typeof(rawVariableValues) === 'object') ? (0, _invariant.default)(0, 'Variables must be provided as an Object where each property is a ' + 'variable value. Perhaps look to see if an unparsed JSON string ' + 'was provided.') : void 0;
}
/**
 * Constructs a ExecutionContext object from the arguments passed to
 * execute, which we will pass throughout the other execution methods.
 *
 * Throws a GraphQLError if a valid execution context cannot be created.
 */


function buildExecutionContext(schema, document, rootValue, contextValue, rawVariableValues, operationName, fieldResolver) {
  var errors = [];
  var operation;
  var hasMultipleAssumedOperations = false;
  var fragments = Object.create(null);

  for (var i = 0; i < document.definitions.length; i++) {
    var definition = document.definitions[i];

    switch (definition.kind) {
      case _kinds.Kind.OPERATION_DEFINITION:
        if (!operationName && operation) {
          hasMultipleAssumedOperations = true;
        } else if (!operationName || definition.name && definition.name.value === operationName) {
          operation = definition;
        }

        break;

      case _kinds.Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;
    }
  }

  if (!operation) {
    if (operationName) {
      errors.push(new _GraphQLError.GraphQLError("Unknown operation named \"".concat(operationName, "\".")));
    } else {
      errors.push(new _GraphQLError.GraphQLError('Must provide an operation.'));
    }
  } else if (hasMultipleAssumedOperations) {
    errors.push(new _GraphQLError.GraphQLError('Must provide operation name if query contains multiple operations.'));
  }

  var variableValues;

  if (operation) {
    var coercedVariableValues = (0, _values.getVariableValues)(schema, operation.variableDefinitions || [], rawVariableValues || {});

    if (coercedVariableValues.errors) {
      errors.push.apply(errors, coercedVariableValues.errors);
    } else {
      variableValues = coercedVariableValues.coerced;
    }
  }

  if (errors.length !== 0) {
    return errors;
  }

  !operation ? (0, _invariant.default)(0, 'Has operation if no errors.') : void 0;
  !variableValues ? (0, _invariant.default)(0, 'Has variables if no errors.') : void 0;
  return {
    schema: schema,
    fragments: fragments,
    rootValue: rootValue,
    contextValue: contextValue,
    operation: operation,
    variableValues: variableValues,
    fieldResolver: fieldResolver || defaultFieldResolver,
    errors: errors
  };
}
/**
 * Implements the "Evaluating operations" section of the spec.
 */


function executeOperation(exeContext, operation, rootValue) {
  var type = (0, _getOperationRootType.getOperationRootType)(exeContext.schema, operation);
  var fields = collectFields(exeContext, type, operation.selectionSet, Object.create(null), Object.create(null));
  var path = undefined; // Errors from sub-fields of a NonNull type may propagate to the top level,
  // at which point we still log the error and null the parent field, which
  // in this case is the entire response.
  //
  // Similar to completeValueCatchingError.

  try {
    var result = operation.operation === 'mutation' ? executeFieldsSerially(exeContext, type, rootValue, path, fields) : executeFields(exeContext, type, rootValue, path, fields);

    if ((0, _isPromise.default)(result)) {
      return result.then(undefined, function (error) {
        exeContext.errors.push(error);
        return Promise.resolve(null);
      });
    }

    return result;
  } catch (error) {
    exeContext.errors.push(error);
    return null;
  }
}
/**
 * Implements the "Evaluating selection sets" section of the spec
 * for "write" mode.
 */


function executeFieldsSerially(exeContext, parentType, sourceValue, path, fields) {
  return (0, _promiseReduce.default)(Object.keys(fields), function (results, responseName) {
    var fieldNodes = fields[responseName];
    var fieldPath = addPath(path, responseName);
    var result = resolveField(exeContext, parentType, sourceValue, fieldNodes, fieldPath);

    if (result === undefined) {
      return results;
    }

    if ((0, _isPromise.default)(result)) {
      return result.then(function (resolvedResult) {
        results[responseName] = resolvedResult;
        return results;
      });
    }

    results[responseName] = result;
    return results;
  }, Object.create(null));
}
/**
 * Implements the "Evaluating selection sets" section of the spec
 * for "read" mode.
 */


function executeFields(exeContext, parentType, sourceValue, path, fields) {
  var results = Object.create(null);
  var containsPromise = false;

  for (var i = 0, keys = Object.keys(fields); i < keys.length; ++i) {
    var responseName = keys[i];
    var fieldNodes = fields[responseName];
    var fieldPath = addPath(path, responseName);
    var result = resolveField(exeContext, parentType, sourceValue, fieldNodes, fieldPath);

    if (result !== undefined) {
      results[responseName] = result;

      if (!containsPromise && (0, _isPromise.default)(result)) {
        containsPromise = true;
      }
    }
  } // If there are no promises, we can just return the object


  if (!containsPromise) {
    return results;
  } // Otherwise, results is a map from field name to the result of resolving that
  // field, which is possibly a promise. Return a promise that will return this
  // same map, but with any promises replaced with the values they resolved to.


  return (0, _promiseForObject.default)(results);
}
/**
 * Given a selectionSet, adds all of the fields in that selection to
 * the passed in map of fields, and returns it at the end.
 *
 * CollectFields requires the "runtime type" of an object. For a field which
 * returns an Interface or Union type, the "runtime type" will be the actual
 * Object type returned by that field.
 */


function collectFields(exeContext, runtimeType, selectionSet, fields, visitedFragmentNames) {
  for (var i = 0; i < selectionSet.selections.length; i++) {
    var selection = selectionSet.selections[i];

    switch (selection.kind) {
      case _kinds.Kind.FIELD:
        if (!shouldIncludeNode(exeContext, selection)) {
          continue;
        }

        var name = getFieldEntryKey(selection);

        if (!fields[name]) {
          fields[name] = [];
        }

        fields[name].push(selection);
        break;

      case _kinds.Kind.INLINE_FRAGMENT:
        if (!shouldIncludeNode(exeContext, selection) || !doesFragmentConditionMatch(exeContext, selection, runtimeType)) {
          continue;
        }

        collectFields(exeContext, runtimeType, selection.selectionSet, fields, visitedFragmentNames);
        break;

      case _kinds.Kind.FRAGMENT_SPREAD:
        var fragName = selection.name.value;

        if (visitedFragmentNames[fragName] || !shouldIncludeNode(exeContext, selection)) {
          continue;
        }

        visitedFragmentNames[fragName] = true;
        var fragment = exeContext.fragments[fragName];

        if (!fragment || !doesFragmentConditionMatch(exeContext, fragment, runtimeType)) {
          continue;
        }

        collectFields(exeContext, runtimeType, fragment.selectionSet, fields, visitedFragmentNames);
        break;
    }
  }

  return fields;
}
/**
 * Determines if a field should be included based on the @include and @skip
 * directives, where @skip has higher precedence than @include.
 */


function shouldIncludeNode(exeContext, node) {
  var skip = (0, _values.getDirectiveValues)(_directives.GraphQLSkipDirective, node, exeContext.variableValues);

  if (skip && skip.if === true) {
    return false;
  }

  var include = (0, _values.getDirectiveValues)(_directives.GraphQLIncludeDirective, node, exeContext.variableValues);

  if (include && include.if === false) {
    return false;
  }

  return true;
}
/**
 * Determines if a fragment is applicable to the given type.
 */


function doesFragmentConditionMatch(exeContext, fragment, type) {
  var typeConditionNode = fragment.typeCondition;

  if (!typeConditionNode) {
    return true;
  }

  var conditionalType = (0, _typeFromAST.typeFromAST)(exeContext.schema, typeConditionNode);

  if (conditionalType === type) {
    return true;
  }

  if ((0, _definition.isAbstractType)(conditionalType)) {
    return exeContext.schema.isPossibleType(conditionalType, type);
  }

  return false;
}
/**
 * Implements the logic to compute the key of a given field's entry
 */


function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}
/**
 * Resolves the field on the given source object. In particular, this
 * figures out the value that the field returns by calling its resolve function,
 * then calls completeValue to complete promises, serialize scalars, or execute
 * the sub-selection-set for objects.
 */


function resolveField(exeContext, parentType, source, fieldNodes, path) {
  var fieldNode = fieldNodes[0];
  var fieldName = fieldNode.name.value;
  var fieldDef = getFieldDef(exeContext.schema, parentType, fieldName);

  if (!fieldDef) {
    return;
  }

  var resolveFn = fieldDef.resolve || exeContext.fieldResolver;
  var info = buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path); // Get the resolve function, regardless of if its result is normal
  // or abrupt (error).

  var result = resolveFieldValueOrError(exeContext, fieldDef, fieldNodes, resolveFn, source, info);
  return completeValueCatchingError(exeContext, fieldDef.type, fieldNodes, info, path, result);
}

function buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path) {
  // The resolve function's optional fourth argument is a collection of
  // information about the current execution state.
  return {
    fieldName: fieldDef.name,
    fieldNodes: fieldNodes,
    returnType: fieldDef.type,
    parentType: parentType,
    path: path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues
  };
} // Isolates the "ReturnOrAbrupt" behavior to not de-opt the `resolveField`
// function. Returns the result of resolveFn or the abrupt-return Error object.


function resolveFieldValueOrError(exeContext, fieldDef, fieldNodes, resolveFn, source, info) {
  try {
    // Build a JS object of arguments from the field.arguments AST, using the
    // variables scope to fulfill any variable references.
    // TODO: find a way to memoize, in case this field is within a List type.
    var args = (0, _values.getArgumentValues)(fieldDef, fieldNodes[0], exeContext.variableValues); // The resolve function's optional third argument is a context value that
    // is provided to every resolve function within an execution. It is commonly
    // used to represent an authenticated user, or request-specific caches.

    var _contextValue = exeContext.contextValue;
    var result = resolveFn(source, args, _contextValue, info);
    return (0, _isPromise.default)(result) ? result.then(undefined, asErrorInstance) : result;
  } catch (error) {
    return asErrorInstance(error);
  }
} // Sometimes a non-error is thrown, wrap it as an Error instance to ensure a
// consistent Error interface.


function asErrorInstance(error) {
  return error instanceof Error ? error : new Error(error || undefined);
} // This is a small wrapper around completeValue which detects and logs errors
// in the execution context.


function completeValueCatchingError(exeContext, returnType, fieldNodes, info, path, result) {
  try {
    var completed;

    if ((0, _isPromise.default)(result)) {
      completed = result.then(function (resolved) {
        return completeValue(exeContext, returnType, fieldNodes, info, path, resolved);
      });
    } else {
      completed = completeValue(exeContext, returnType, fieldNodes, info, path, result);
    }

    if ((0, _isPromise.default)(completed)) {
      // Note: we don't rely on a `catch` method, but we do expect "thenable"
      // to take a second callback for the error case.
      return completed.then(undefined, function (error) {
        return handleFieldError(error, fieldNodes, path, returnType, exeContext);
      });
    }

    return completed;
  } catch (error) {
    return handleFieldError(error, fieldNodes, path, returnType, exeContext);
  }
}

function handleFieldError(rawError, fieldNodes, path, returnType, exeContext) {
  var error = (0, _locatedError.locatedError)(asErrorInstance(rawError), fieldNodes, responsePathAsArray(path)); // If the field type is non-nullable, then it is resolved without any
  // protection from errors, however it still properly locates the error.

  if ((0, _definition.isNonNullType)(returnType)) {
    throw error;
  } // Otherwise, error protection is applied, logging the error and resolving
  // a null value for this field if one is encountered.


  exeContext.errors.push(error);
  return null;
}
/**
 * Implements the instructions for completeValue as defined in the
 * "Field entries" section of the spec.
 *
 * If the field type is Non-Null, then this recursively completes the value
 * for the inner type. It throws a field error if that completion returns null,
 * as per the "Nullability" section of the spec.
 *
 * If the field type is a List, then this recursively completes the value
 * for the inner type on each item in the list.
 *
 * If the field type is a Scalar or Enum, ensures the completed value is a legal
 * value of the type by calling the `serialize` method of GraphQL type
 * definition.
 *
 * If the field is an abstract type, determine the runtime type of the value
 * and then complete based on that type
 *
 * Otherwise, the field type expects a sub-selection set, and will complete the
 * value by evaluating all sub-selections.
 */


function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
  // If result is an Error, throw a located error.
  if (result instanceof Error) {
    throw result;
  } // If field type is NonNull, complete for inner type, and throw field error
  // if result is null.


  if ((0, _definition.isNonNullType)(returnType)) {
    var completed = completeValue(exeContext, returnType.ofType, fieldNodes, info, path, result);

    if (completed === null) {
      throw new Error("Cannot return null for non-nullable field ".concat(info.parentType.name, ".").concat(info.fieldName, "."));
    }

    return completed;
  } // If result value is null-ish (null, undefined, or NaN) then return null.


  if ((0, _isNullish.default)(result)) {
    return null;
  } // If field type is List, complete each item in the list with the inner type


  if ((0, _definition.isListType)(returnType)) {
    return completeListValue(exeContext, returnType, fieldNodes, info, path, result);
  } // If field type is a leaf type, Scalar or Enum, serialize to a valid value,
  // returning null if serialization is not possible.


  if ((0, _definition.isLeafType)(returnType)) {
    return completeLeafValue(returnType, result);
  } // If field type is an abstract type, Interface or Union, determine the
  // runtime Object type and complete for that type.


  if ((0, _definition.isAbstractType)(returnType)) {
    return completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result);
  } // If field type is Object, execute and complete all sub-selections.


  if ((0, _definition.isObjectType)(returnType)) {
    return completeObjectValue(exeContext, returnType, fieldNodes, info, path, result);
  } // Not reachable. All possible output types have been considered.

  /* istanbul ignore next */


  throw new Error("Cannot complete value of unexpected type \"".concat((0, _inspect.default)(returnType), "\"."));
}
/**
 * Complete a list value by completing each item in the list with the
 * inner type
 */


function completeListValue(exeContext, returnType, fieldNodes, info, path, result) {
  !(0, _iterall.isCollection)(result) ? (0, _invariant.default)(0, "Expected Iterable, but did not find one for field ".concat(info.parentType.name, ".").concat(info.fieldName, ".")) : void 0; // This is specified as a simple map, however we're optimizing the path
  // where the list contains no Promises by avoiding creating another Promise.

  var itemType = returnType.ofType;
  var containsPromise = false;
  var completedResults = [];
  (0, _iterall.forEach)(result, function (item, index) {
    // No need to modify the info object containing the path,
    // since from here on it is not ever accessed by resolver functions.
    var fieldPath = addPath(path, index);
    var completedItem = completeValueCatchingError(exeContext, itemType, fieldNodes, info, fieldPath, item);

    if (!containsPromise && (0, _isPromise.default)(completedItem)) {
      containsPromise = true;
    }

    completedResults.push(completedItem);
  });
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
/**
 * Complete a Scalar or Enum by serializing to a valid value, returning
 * null if serialization is not possible.
 */


function completeLeafValue(returnType, result) {
  !returnType.serialize ? (0, _invariant.default)(0, 'Missing serialize method on type') : void 0;
  var serializedResult = returnType.serialize(result);

  if ((0, _isInvalid.default)(serializedResult)) {
    throw new Error("Expected a value of type \"".concat((0, _inspect.default)(returnType), "\" but ") + "received: ".concat((0, _inspect.default)(result)));
  }

  return serializedResult;
}
/**
 * Complete a value of an abstract type by determining the runtime object type
 * of that value, then complete the value for that type.
 */


function completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result) {
  var runtimeType = returnType.resolveType ? returnType.resolveType(result, exeContext.contextValue, info) : defaultResolveTypeFn(result, exeContext.contextValue, info, returnType);

  if ((0, _isPromise.default)(runtimeType)) {
    return runtimeType.then(function (resolvedRuntimeType) {
      return completeObjectValue(exeContext, ensureValidRuntimeType(resolvedRuntimeType, exeContext, returnType, fieldNodes, info, result), fieldNodes, info, path, result);
    });
  }

  return completeObjectValue(exeContext, ensureValidRuntimeType(runtimeType, exeContext, returnType, fieldNodes, info, result), fieldNodes, info, path, result);
}

function ensureValidRuntimeType(runtimeTypeOrName, exeContext, returnType, fieldNodes, info, result) {
  var runtimeType = typeof runtimeTypeOrName === 'string' ? exeContext.schema.getType(runtimeTypeOrName) : runtimeTypeOrName;

  if (!(0, _definition.isObjectType)(runtimeType)) {
    throw new _GraphQLError.GraphQLError("Abstract type ".concat(returnType.name, " must resolve to an Object type at ") + "runtime for field ".concat(info.parentType.name, ".").concat(info.fieldName, " with ") + "value ".concat((0, _inspect.default)(result), ", received \"").concat((0, _inspect.default)(runtimeType), "\". ") + "Either the ".concat(returnType.name, " type should provide a \"resolveType\" ") + 'function or each possible type should provide an "isTypeOf" function.', fieldNodes);
  }

  if (!exeContext.schema.isPossibleType(returnType, runtimeType)) {
    throw new _GraphQLError.GraphQLError("Runtime Object type \"".concat(runtimeType.name, "\" is not a possible type ") + "for \"".concat(returnType.name, "\"."), fieldNodes);
  }

  return runtimeType;
}
/**
 * Complete an Object value by executing all sub-selections.
 */


function completeObjectValue(exeContext, returnType, fieldNodes, info, path, result) {
  // If there is an isTypeOf predicate function, call it with the
  // current result. If isTypeOf returns false, then raise an error rather
  // than continuing execution.
  if (returnType.isTypeOf) {
    var isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);

    if ((0, _isPromise.default)(isTypeOf)) {
      return isTypeOf.then(function (resolvedIsTypeOf) {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result, fieldNodes);
        }

        return collectAndExecuteSubfields(exeContext, returnType, fieldNodes, path, result);
      });
    }

    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result, fieldNodes);
    }
  }

  return collectAndExecuteSubfields(exeContext, returnType, fieldNodes, path, result);
}

function invalidReturnTypeError(returnType, result, fieldNodes) {
  return new _GraphQLError.GraphQLError("Expected value of type \"".concat(returnType.name, "\" but got: ").concat((0, _inspect.default)(result), "."), fieldNodes);
}

function collectAndExecuteSubfields(exeContext, returnType, fieldNodes, path, result) {
  // Collect sub-fields to execute to complete this value.
  var subFieldNodes = collectSubfields(exeContext, returnType, fieldNodes);
  return executeFields(exeContext, returnType, result, path, subFieldNodes);
}
/**
 * A memoized collection of relevant subfields with regard to the return
 * type. Memoizing ensures the subfields are not repeatedly calculated, which
 * saves overhead when resolving lists of values.
 */


var collectSubfields = (0, _memoize.default)(_collectSubfields);

function _collectSubfields(exeContext, returnType, fieldNodes) {
  var subFieldNodes = Object.create(null);
  var visitedFragmentNames = Object.create(null);

  for (var i = 0; i < fieldNodes.length; i++) {
    var selectionSet = fieldNodes[i].selectionSet;

    if (selectionSet) {
      subFieldNodes = collectFields(exeContext, returnType, selectionSet, subFieldNodes, visitedFragmentNames);
    }
  }

  return subFieldNodes;
}
/**
 * If a resolveType function is not given, then a default resolve behavior is
 * used which attempts two strategies:
 *
 * First, See if the provided value has a `__typename` field defined, if so, use
 * that value as name of the resolved type.
 *
 * Otherwise, test each possible type for the abstract type by calling
 * isTypeOf for the object being coerced, returning the first type that matches.
 */


function defaultResolveTypeFn(value, contextValue, info, abstractType) {
  // First, look for `__typename`.
  if (value !== null && _typeof(value) === 'object' && typeof value.__typename === 'string') {
    return value.__typename;
  } // Otherwise, test each possible type.


  var possibleTypes = info.schema.getPossibleTypes(abstractType);
  var promisedIsTypeOfResults = [];

  for (var i = 0; i < possibleTypes.length; i++) {
    var type = possibleTypes[i];

    if (type.isTypeOf) {
      var isTypeOfResult = type.isTypeOf(value, contextValue, info);

      if ((0, _isPromise.default)(isTypeOfResult)) {
        promisedIsTypeOfResults[i] = isTypeOfResult;
      } else if (isTypeOfResult) {
        return type;
      }
    }
  }

  if (promisedIsTypeOfResults.length) {
    return Promise.all(promisedIsTypeOfResults).then(function (isTypeOfResults) {
      for (var _i = 0; _i < isTypeOfResults.length; _i++) {
        if (isTypeOfResults[_i]) {
          return possibleTypes[_i];
        }
      }
    });
  }
}
/**
 * If a resolve function is not given, then a default resolve behavior is used
 * which takes the property of the source object of the same name as the field
 * and returns it as the result, or if it's a function, returns the result
 * of calling that function while passing along args and context value.
 */


var defaultFieldResolver = function defaultFieldResolver(source, args, contextValue, info) {
  // ensure source is a value for which property access is acceptable.
  if (_typeof(source) === 'object' || typeof source === 'function') {
    var property = source[info.fieldName];

    if (typeof property === 'function') {
      return source[info.fieldName](args, contextValue, info);
    }

    return property;
  }
};
/**
 * This method looks up the field on the given type definition.
 * It has special casing for the two introspection fields, __schema
 * and __typename. __typename is special because it can always be
 * queried as a field, even in situations where no other fields
 * are allowed, like on a Union. __schema could get automatically
 * added to the query type, but that would require mutating type
 * definitions, which would cause issues.
 */


exports.defaultFieldResolver = defaultFieldResolver;

function getFieldDef(schema, parentType, fieldName) {
  if (fieldName === _introspection.SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return _introspection.SchemaMetaFieldDef;
  } else if (fieldName === _introspection.TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return _introspection.TypeMetaFieldDef;
  } else if (fieldName === _introspection.TypeNameMetaFieldDef.name) {
    return _introspection.TypeNameMetaFieldDef;
  }

  return parentType.getFields()[fieldName];
}
},{"../error/GraphQLError":3,"../error/locatedError":6,"../jsutils/inspect":17,"../jsutils/invariant":19,"../jsutils/isInvalid":22,"../jsutils/isNullish":23,"../jsutils/isPromise":24,"../jsutils/memoize3":27,"../jsutils/promiseForObject":30,"../jsutils/promiseReduce":31,"../language/kinds":37,"../type/definition":48,"../type/directives":49,"../type/introspection":51,"../type/validate":54,"../utilities/getOperationRootType":66,"../utilities/typeFromAST":76,"./values":11,"iterall":110}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "execute", {
  enumerable: true,
  get: function get() {
    return _execute.execute;
  }
});
Object.defineProperty(exports, "defaultFieldResolver", {
  enumerable: true,
  get: function get() {
    return _execute.defaultFieldResolver;
  }
});
Object.defineProperty(exports, "responsePathAsArray", {
  enumerable: true,
  get: function get() {
    return _execute.responsePathAsArray;
  }
});
Object.defineProperty(exports, "getDirectiveValues", {
  enumerable: true,
  get: function get() {
    return _values.getDirectiveValues;
  }
});

var _execute = require("./execute");

var _values = require("./values");
},{"./execute":9,"./values":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVariableValues = getVariableValues;
exports.getArgumentValues = getArgumentValues;
exports.getDirectiveValues = getDirectiveValues;

var _GraphQLError = require("../error/GraphQLError");

var _find = _interopRequireDefault(require("../jsutils/find"));

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

var _coerceValue = require("../utilities/coerceValue");

var _typeFromAST = require("../utilities/typeFromAST");

var _valueFromAST = require("../utilities/valueFromAST");

var _kinds = require("../language/kinds");

var _printer = require("../language/printer");

var _definition = require("../type/definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Prepares an object map of variableValues of the correct type based on the
 * provided variable definitions and arbitrary input. If the input cannot be
 * parsed to match the variable definitions, a GraphQLError will be thrown.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
function getVariableValues(schema, varDefNodes, inputs) {
  var errors = [];
  var coercedValues = {};

  for (var i = 0; i < varDefNodes.length; i++) {
    var varDefNode = varDefNodes[i];
    var varName = varDefNode.variable.name.value;
    var varType = (0, _typeFromAST.typeFromAST)(schema, varDefNode.type);

    if (!(0, _definition.isInputType)(varType)) {
      // Must use input types for variables. This should be caught during
      // validation, however is checked again here for safety.
      errors.push(new _GraphQLError.GraphQLError("Variable \"$".concat(varName, "\" expected value of type ") + "\"".concat((0, _printer.print)(varDefNode.type), "\" which cannot be used as an input type."), [varDefNode.type]));
    } else {
      var hasValue = hasOwnProperty(inputs, varName);
      var value = hasValue ? inputs[varName] : undefined;

      if (!hasValue && varDefNode.defaultValue) {
        // If no value was provided to a variable with a default value,
        // use the default value.
        coercedValues[varName] = (0, _valueFromAST.valueFromAST)(varDefNode.defaultValue, varType);
      } else if ((!hasValue || value === null) && (0, _definition.isNonNullType)(varType)) {
        // If no value or a nullish value was provided to a variable with a
        // non-null type (required), produce an error.
        errors.push(new _GraphQLError.GraphQLError(hasValue ? "Variable \"$".concat(varName, "\" of non-null type ") + "\"".concat((0, _inspect.default)(varType), "\" must not be null.") : "Variable \"$".concat(varName, "\" of required type ") + "\"".concat((0, _inspect.default)(varType), "\" was not provided."), [varDefNode]));
      } else if (hasValue) {
        if (value === null) {
          // If the explicit value `null` was provided, an entry in the coerced
          // values must exist as the value `null`.
          coercedValues[varName] = null;
        } else {
          // Otherwise, a non-null value was provided, coerce it to the expected
          // type or report an error if coercion fails.
          var coerced = (0, _coerceValue.coerceValue)(value, varType, varDefNode);
          var coercionErrors = coerced.errors;

          if (coercionErrors) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = coercionErrors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var error = _step.value;
                error.message = "Variable \"$".concat(varName, "\" got invalid value ").concat((0, _inspect.default)(value), "; ") + error.message;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            errors.push.apply(errors, coercionErrors);
          } else {
            coercedValues[varName] = coerced.value;
          }
        }
      }
    }
  }

  return errors.length === 0 ? {
    errors: undefined,
    coerced: coercedValues
  } : {
    errors: errors,
    coerced: undefined
  };
}
/**
 * Prepares an object map of argument values given a list of argument
 * definitions and list of argument AST nodes.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */


function getArgumentValues(def, node, variableValues) {
  var coercedValues = {};
  var argDefs = def.args;
  var argNodes = node.arguments;

  if (!argDefs || !argNodes) {
    return coercedValues;
  }

  var argNodeMap = (0, _keyMap.default)(argNodes, function (arg) {
    return arg.name.value;
  });

  for (var i = 0; i < argDefs.length; i++) {
    var argDef = argDefs[i];
    var name = argDef.name;
    var argType = argDef.type;
    var argumentNode = argNodeMap[name];
    var hasValue = void 0;
    var isNull = void 0;

    if (argumentNode && argumentNode.value.kind === _kinds.Kind.VARIABLE) {
      var variableName = argumentNode.value.name.value;
      hasValue = variableValues && hasOwnProperty(variableValues, variableName);
      isNull = variableValues && variableValues[variableName] === null;
    } else {
      hasValue = argumentNode != null;
      isNull = argumentNode && argumentNode.value.kind === _kinds.Kind.NULL;
    }

    if (!hasValue && argDef.defaultValue !== undefined) {
      // If no argument was provided where the definition has a default value,
      // use the default value.
      coercedValues[name] = argDef.defaultValue;
    } else if ((!hasValue || isNull) && (0, _definition.isNonNullType)(argType)) {
      // If no argument or a null value was provided to an argument with a
      // non-null type (required), produce a field error.
      if (isNull) {
        throw new _GraphQLError.GraphQLError("Argument \"".concat(name, "\" of non-null type \"").concat((0, _inspect.default)(argType), "\" ") + 'must not be null.', [argumentNode.value]);
      } else if (argumentNode && argumentNode.value.kind === _kinds.Kind.VARIABLE) {
        var _variableName = argumentNode.value.name.value;
        throw new _GraphQLError.GraphQLError("Argument \"".concat(name, "\" of required type \"").concat((0, _inspect.default)(argType), "\" ") + "was provided the variable \"$".concat(_variableName, "\" ") + 'which was not provided a runtime value.', [argumentNode.value]);
      } else {
        throw new _GraphQLError.GraphQLError("Argument \"".concat(name, "\" of required type \"").concat((0, _inspect.default)(argType), "\" ") + 'was not provided.', [node]);
      }
    } else if (hasValue) {
      if (argumentNode.value.kind === _kinds.Kind.NULL) {
        // If the explicit value `null` was provided, an entry in the coerced
        // values must exist as the value `null`.
        coercedValues[name] = null;
      } else if (argumentNode.value.kind === _kinds.Kind.VARIABLE) {
        var _variableName2 = argumentNode.value.name.value;
        !variableValues ? (0, _invariant.default)(0, 'Must exist for hasValue to be true.') : void 0; // Note: This does no further checking that this variable is correct.
        // This assumes that this query has been validated and the variable
        // usage here is of the correct type.

        coercedValues[name] = variableValues[_variableName2];
      } else {
        var valueNode = argumentNode.value;
        var coercedValue = (0, _valueFromAST.valueFromAST)(valueNode, argType, variableValues);

        if (coercedValue === undefined) {
          // Note: ValuesOfCorrectType validation should catch this before
          // execution. This is a runtime check to ensure execution does not
          // continue with an invalid argument value.
          throw new _GraphQLError.GraphQLError("Argument \"".concat(name, "\" has invalid value ").concat((0, _printer.print)(valueNode), "."), [argumentNode.value]);
        }

        coercedValues[name] = coercedValue;
      }
    }
  }

  return coercedValues;
}
/**
 * Prepares an object map of argument values given a directive definition
 * and a AST node which may contain directives. Optionally also accepts a map
 * of variable values.
 *
 * If the directive does not exist on the node, returns undefined.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */


function getDirectiveValues(directiveDef, node, variableValues) {
  var directiveNode = node.directives && (0, _find.default)(node.directives, function (directive) {
    return directive.name.value === directiveDef.name;
  });

  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
},{"../error/GraphQLError":3,"../jsutils/find":16,"../jsutils/inspect":17,"../jsutils/invariant":19,"../jsutils/keyMap":25,"../language/kinds":37,"../language/printer":42,"../type/definition":48,"../utilities/coerceValue":60,"../utilities/typeFromAST":76,"../utilities/valueFromAST":77}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphql = graphql;
exports.graphqlSync = graphqlSync;

var _validate = require("./type/validate");

var _parser = require("./language/parser");

var _validate2 = require("./validation/validate");

var _execute = require("./execution/execute");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function graphql(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  var _arguments = arguments;

  /* eslint-enable no-redeclare */
  // Always return a Promise for a consistent API.
  return new Promise(function (resolve) {
    return resolve( // Extract arguments from object args if provided.
    _arguments.length === 1 ? graphqlImpl(argsOrSchema.schema, argsOrSchema.source, argsOrSchema.rootValue, argsOrSchema.contextValue, argsOrSchema.variableValues, argsOrSchema.operationName, argsOrSchema.fieldResolver) : graphqlImpl(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver));
  });
}
/**
 * The graphqlSync function also fulfills GraphQL operations by parsing,
 * validating, and executing a GraphQL document along side a GraphQL schema.
 * However, it guarantees to complete synchronously (or throw an error) assuming
 * that all field resolvers are also synchronous.
 */


function graphqlSync(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  /* eslint-enable no-redeclare */
  // Extract arguments from object args if provided.
  var result = arguments.length === 1 ? graphqlImpl(argsOrSchema.schema, argsOrSchema.source, argsOrSchema.rootValue, argsOrSchema.contextValue, argsOrSchema.variableValues, argsOrSchema.operationName, argsOrSchema.fieldResolver) : graphqlImpl(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver); // Assert that the execution was synchronous.

  if (result.then) {
    throw new Error('GraphQL execution failed to complete synchronously.');
  }

  return result;
}

function graphqlImpl(schema, source, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  // Validate Schema
  var schemaValidationErrors = (0, _validate.validateSchema)(schema);

  if (schemaValidationErrors.length > 0) {
    return {
      errors: schemaValidationErrors
    };
  } // Parse


  var document;

  try {
    document = (0, _parser.parse)(source);
  } catch (syntaxError) {
    return {
      errors: [syntaxError]
    };
  } // Validate


  var validationErrors = (0, _validate2.validate)(schema, document);

  if (validationErrors.length > 0) {
    return {
      errors: validationErrors
    };
  } // Execute


  return (0, _execute.execute)(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver);
}
},{"./execution/execute":9,"./language/parser":40,"./type/validate":54,"./validation/validate":109}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "graphql", {
  enumerable: true,
  get: function get() {
    return _graphql.graphql;
  }
});
Object.defineProperty(exports, "graphqlSync", {
  enumerable: true,
  get: function get() {
    return _graphql.graphqlSync;
  }
});
Object.defineProperty(exports, "GraphQLSchema", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLSchema;
  }
});
Object.defineProperty(exports, "GraphQLScalarType", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLScalarType;
  }
});
Object.defineProperty(exports, "GraphQLObjectType", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLObjectType;
  }
});
Object.defineProperty(exports, "GraphQLInterfaceType", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLInterfaceType;
  }
});
Object.defineProperty(exports, "GraphQLUnionType", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLUnionType;
  }
});
Object.defineProperty(exports, "GraphQLEnumType", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLEnumType;
  }
});
Object.defineProperty(exports, "GraphQLInputObjectType", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLInputObjectType;
  }
});
Object.defineProperty(exports, "GraphQLList", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLList;
  }
});
Object.defineProperty(exports, "GraphQLNonNull", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLNonNull;
  }
});
Object.defineProperty(exports, "GraphQLDirective", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLDirective;
  }
});
Object.defineProperty(exports, "TypeKind", {
  enumerable: true,
  get: function get() {
    return _type.TypeKind;
  }
});
Object.defineProperty(exports, "specifiedScalarTypes", {
  enumerable: true,
  get: function get() {
    return _type.specifiedScalarTypes;
  }
});
Object.defineProperty(exports, "GraphQLInt", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLInt;
  }
});
Object.defineProperty(exports, "GraphQLFloat", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLFloat;
  }
});
Object.defineProperty(exports, "GraphQLString", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLString;
  }
});
Object.defineProperty(exports, "GraphQLBoolean", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLBoolean;
  }
});
Object.defineProperty(exports, "GraphQLID", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLID;
  }
});
Object.defineProperty(exports, "specifiedDirectives", {
  enumerable: true,
  get: function get() {
    return _type.specifiedDirectives;
  }
});
Object.defineProperty(exports, "GraphQLIncludeDirective", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLIncludeDirective;
  }
});
Object.defineProperty(exports, "GraphQLSkipDirective", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLSkipDirective;
  }
});
Object.defineProperty(exports, "GraphQLDeprecatedDirective", {
  enumerable: true,
  get: function get() {
    return _type.GraphQLDeprecatedDirective;
  }
});
Object.defineProperty(exports, "DEFAULT_DEPRECATION_REASON", {
  enumerable: true,
  get: function get() {
    return _type.DEFAULT_DEPRECATION_REASON;
  }
});
Object.defineProperty(exports, "SchemaMetaFieldDef", {
  enumerable: true,
  get: function get() {
    return _type.SchemaMetaFieldDef;
  }
});
Object.defineProperty(exports, "TypeMetaFieldDef", {
  enumerable: true,
  get: function get() {
    return _type.TypeMetaFieldDef;
  }
});
Object.defineProperty(exports, "TypeNameMetaFieldDef", {
  enumerable: true,
  get: function get() {
    return _type.TypeNameMetaFieldDef;
  }
});
Object.defineProperty(exports, "introspectionTypes", {
  enumerable: true,
  get: function get() {
    return _type.introspectionTypes;
  }
});
Object.defineProperty(exports, "__Schema", {
  enumerable: true,
  get: function get() {
    return _type.__Schema;
  }
});
Object.defineProperty(exports, "__Directive", {
  enumerable: true,
  get: function get() {
    return _type.__Directive;
  }
});
Object.defineProperty(exports, "__DirectiveLocation", {
  enumerable: true,
  get: function get() {
    return _type.__DirectiveLocation;
  }
});
Object.defineProperty(exports, "__Type", {
  enumerable: true,
  get: function get() {
    return _type.__Type;
  }
});
Object.defineProperty(exports, "__Field", {
  enumerable: true,
  get: function get() {
    return _type.__Field;
  }
});
Object.defineProperty(exports, "__InputValue", {
  enumerable: true,
  get: function get() {
    return _type.__InputValue;
  }
});
Object.defineProperty(exports, "__EnumValue", {
  enumerable: true,
  get: function get() {
    return _type.__EnumValue;
  }
});
Object.defineProperty(exports, "__TypeKind", {
  enumerable: true,
  get: function get() {
    return _type.__TypeKind;
  }
});
Object.defineProperty(exports, "isSchema", {
  enumerable: true,
  get: function get() {
    return _type.isSchema;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function get() {
    return _type.isDirective;
  }
});
Object.defineProperty(exports, "isType", {
  enumerable: true,
  get: function get() {
    return _type.isType;
  }
});
Object.defineProperty(exports, "isScalarType", {
  enumerable: true,
  get: function get() {
    return _type.isScalarType;
  }
});
Object.defineProperty(exports, "isObjectType", {
  enumerable: true,
  get: function get() {
    return _type.isObjectType;
  }
});
Object.defineProperty(exports, "isInterfaceType", {
  enumerable: true,
  get: function get() {
    return _type.isInterfaceType;
  }
});
Object.defineProperty(exports, "isUnionType", {
  enumerable: true,
  get: function get() {
    return _type.isUnionType;
  }
});
Object.defineProperty(exports, "isEnumType", {
  enumerable: true,
  get: function get() {
    return _type.isEnumType;
  }
});
Object.defineProperty(exports, "isInputObjectType", {
  enumerable: true,
  get: function get() {
    return _type.isInputObjectType;
  }
});
Object.defineProperty(exports, "isListType", {
  enumerable: true,
  get: function get() {
    return _type.isListType;
  }
});
Object.defineProperty(exports, "isNonNullType", {
  enumerable: true,
  get: function get() {
    return _type.isNonNullType;
  }
});
Object.defineProperty(exports, "isInputType", {
  enumerable: true,
  get: function get() {
    return _type.isInputType;
  }
});
Object.defineProperty(exports, "isOutputType", {
  enumerable: true,
  get: function get() {
    return _type.isOutputType;
  }
});
Object.defineProperty(exports, "isLeafType", {
  enumerable: true,
  get: function get() {
    return _type.isLeafType;
  }
});
Object.defineProperty(exports, "isCompositeType", {
  enumerable: true,
  get: function get() {
    return _type.isCompositeType;
  }
});
Object.defineProperty(exports, "isAbstractType", {
  enumerable: true,
  get: function get() {
    return _type.isAbstractType;
  }
});
Object.defineProperty(exports, "isWrappingType", {
  enumerable: true,
  get: function get() {
    return _type.isWrappingType;
  }
});
Object.defineProperty(exports, "isNullableType", {
  enumerable: true,
  get: function get() {
    return _type.isNullableType;
  }
});
Object.defineProperty(exports, "isNamedType", {
  enumerable: true,
  get: function get() {
    return _type.isNamedType;
  }
});
Object.defineProperty(exports, "isRequiredArgument", {
  enumerable: true,
  get: function get() {
    return _type.isRequiredArgument;
  }
});
Object.defineProperty(exports, "isRequiredInputField", {
  enumerable: true,
  get: function get() {
    return _type.isRequiredInputField;
  }
});
Object.defineProperty(exports, "isSpecifiedScalarType", {
  enumerable: true,
  get: function get() {
    return _type.isSpecifiedScalarType;
  }
});
Object.defineProperty(exports, "isIntrospectionType", {
  enumerable: true,
  get: function get() {
    return _type.isIntrospectionType;
  }
});
Object.defineProperty(exports, "isSpecifiedDirective", {
  enumerable: true,
  get: function get() {
    return _type.isSpecifiedDirective;
  }
});
Object.defineProperty(exports, "assertType", {
  enumerable: true,
  get: function get() {
    return _type.assertType;
  }
});
Object.defineProperty(exports, "assertScalarType", {
  enumerable: true,
  get: function get() {
    return _type.assertScalarType;
  }
});
Object.defineProperty(exports, "assertObjectType", {
  enumerable: true,
  get: function get() {
    return _type.assertObjectType;
  }
});
Object.defineProperty(exports, "assertInterfaceType", {
  enumerable: true,
  get: function get() {
    return _type.assertInterfaceType;
  }
});
Object.defineProperty(exports, "assertUnionType", {
  enumerable: true,
  get: function get() {
    return _type.assertUnionType;
  }
});
Object.defineProperty(exports, "assertEnumType", {
  enumerable: true,
  get: function get() {
    return _type.assertEnumType;
  }
});
Object.defineProperty(exports, "assertInputObjectType", {
  enumerable: true,
  get: function get() {
    return _type.assertInputObjectType;
  }
});
Object.defineProperty(exports, "assertListType", {
  enumerable: true,
  get: function get() {
    return _type.assertListType;
  }
});
Object.defineProperty(exports, "assertNonNullType", {
  enumerable: true,
  get: function get() {
    return _type.assertNonNullType;
  }
});
Object.defineProperty(exports, "assertInputType", {
  enumerable: true,
  get: function get() {
    return _type.assertInputType;
  }
});
Object.defineProperty(exports, "assertOutputType", {
  enumerable: true,
  get: function get() {
    return _type.assertOutputType;
  }
});
Object.defineProperty(exports, "assertLeafType", {
  enumerable: true,
  get: function get() {
    return _type.assertLeafType;
  }
});
Object.defineProperty(exports, "assertCompositeType", {
  enumerable: true,
  get: function get() {
    return _type.assertCompositeType;
  }
});
Object.defineProperty(exports, "assertAbstractType", {
  enumerable: true,
  get: function get() {
    return _type.assertAbstractType;
  }
});
Object.defineProperty(exports, "assertWrappingType", {
  enumerable: true,
  get: function get() {
    return _type.assertWrappingType;
  }
});
Object.defineProperty(exports, "assertNullableType", {
  enumerable: true,
  get: function get() {
    return _type.assertNullableType;
  }
});
Object.defineProperty(exports, "assertNamedType", {
  enumerable: true,
  get: function get() {
    return _type.assertNamedType;
  }
});
Object.defineProperty(exports, "getNullableType", {
  enumerable: true,
  get: function get() {
    return _type.getNullableType;
  }
});
Object.defineProperty(exports, "getNamedType", {
  enumerable: true,
  get: function get() {
    return _type.getNamedType;
  }
});
Object.defineProperty(exports, "validateSchema", {
  enumerable: true,
  get: function get() {
    return _type.validateSchema;
  }
});
Object.defineProperty(exports, "assertValidSchema", {
  enumerable: true,
  get: function get() {
    return _type.assertValidSchema;
  }
});
Object.defineProperty(exports, "Source", {
  enumerable: true,
  get: function get() {
    return _language.Source;
  }
});
Object.defineProperty(exports, "getLocation", {
  enumerable: true,
  get: function get() {
    return _language.getLocation;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _language.parse;
  }
});
Object.defineProperty(exports, "parseValue", {
  enumerable: true,
  get: function get() {
    return _language.parseValue;
  }
});
Object.defineProperty(exports, "parseType", {
  enumerable: true,
  get: function get() {
    return _language.parseType;
  }
});
Object.defineProperty(exports, "print", {
  enumerable: true,
  get: function get() {
    return _language.print;
  }
});
Object.defineProperty(exports, "visit", {
  enumerable: true,
  get: function get() {
    return _language.visit;
  }
});
Object.defineProperty(exports, "visitInParallel", {
  enumerable: true,
  get: function get() {
    return _language.visitInParallel;
  }
});
Object.defineProperty(exports, "visitWithTypeInfo", {
  enumerable: true,
  get: function get() {
    return _language.visitWithTypeInfo;
  }
});
Object.defineProperty(exports, "getVisitFn", {
  enumerable: true,
  get: function get() {
    return _language.getVisitFn;
  }
});
Object.defineProperty(exports, "Kind", {
  enumerable: true,
  get: function get() {
    return _language.Kind;
  }
});
Object.defineProperty(exports, "TokenKind", {
  enumerable: true,
  get: function get() {
    return _language.TokenKind;
  }
});
Object.defineProperty(exports, "DirectiveLocation", {
  enumerable: true,
  get: function get() {
    return _language.DirectiveLocation;
  }
});
Object.defineProperty(exports, "BREAK", {
  enumerable: true,
  get: function get() {
    return _language.BREAK;
  }
});
Object.defineProperty(exports, "isDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _language.isDefinitionNode;
  }
});
Object.defineProperty(exports, "isExecutableDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _language.isExecutableDefinitionNode;
  }
});
Object.defineProperty(exports, "isSelectionNode", {
  enumerable: true,
  get: function get() {
    return _language.isSelectionNode;
  }
});
Object.defineProperty(exports, "isValueNode", {
  enumerable: true,
  get: function get() {
    return _language.isValueNode;
  }
});
Object.defineProperty(exports, "isTypeNode", {
  enumerable: true,
  get: function get() {
    return _language.isTypeNode;
  }
});
Object.defineProperty(exports, "isTypeSystemDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _language.isTypeSystemDefinitionNode;
  }
});
Object.defineProperty(exports, "isTypeDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _language.isTypeDefinitionNode;
  }
});
Object.defineProperty(exports, "isTypeSystemExtensionNode", {
  enumerable: true,
  get: function get() {
    return _language.isTypeSystemExtensionNode;
  }
});
Object.defineProperty(exports, "isTypeExtensionNode", {
  enumerable: true,
  get: function get() {
    return _language.isTypeExtensionNode;
  }
});
Object.defineProperty(exports, "execute", {
  enumerable: true,
  get: function get() {
    return _execution.execute;
  }
});
Object.defineProperty(exports, "defaultFieldResolver", {
  enumerable: true,
  get: function get() {
    return _execution.defaultFieldResolver;
  }
});
Object.defineProperty(exports, "responsePathAsArray", {
  enumerable: true,
  get: function get() {
    return _execution.responsePathAsArray;
  }
});
Object.defineProperty(exports, "getDirectiveValues", {
  enumerable: true,
  get: function get() {
    return _execution.getDirectiveValues;
  }
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function get() {
    return _subscription.subscribe;
  }
});
Object.defineProperty(exports, "createSourceEventStream", {
  enumerable: true,
  get: function get() {
    return _subscription.createSourceEventStream;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function get() {
    return _validation.validate;
  }
});
Object.defineProperty(exports, "ValidationContext", {
  enumerable: true,
  get: function get() {
    return _validation.ValidationContext;
  }
});
Object.defineProperty(exports, "specifiedRules", {
  enumerable: true,
  get: function get() {
    return _validation.specifiedRules;
  }
});
Object.defineProperty(exports, "FieldsOnCorrectTypeRule", {
  enumerable: true,
  get: function get() {
    return _validation.FieldsOnCorrectTypeRule;
  }
});
Object.defineProperty(exports, "FragmentsOnCompositeTypesRule", {
  enumerable: true,
  get: function get() {
    return _validation.FragmentsOnCompositeTypesRule;
  }
});
Object.defineProperty(exports, "KnownArgumentNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.KnownArgumentNamesRule;
  }
});
Object.defineProperty(exports, "KnownDirectivesRule", {
  enumerable: true,
  get: function get() {
    return _validation.KnownDirectivesRule;
  }
});
Object.defineProperty(exports, "KnownFragmentNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.KnownFragmentNamesRule;
  }
});
Object.defineProperty(exports, "KnownTypeNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.KnownTypeNamesRule;
  }
});
Object.defineProperty(exports, "LoneAnonymousOperationRule", {
  enumerable: true,
  get: function get() {
    return _validation.LoneAnonymousOperationRule;
  }
});
Object.defineProperty(exports, "NoFragmentCyclesRule", {
  enumerable: true,
  get: function get() {
    return _validation.NoFragmentCyclesRule;
  }
});
Object.defineProperty(exports, "NoUndefinedVariablesRule", {
  enumerable: true,
  get: function get() {
    return _validation.NoUndefinedVariablesRule;
  }
});
Object.defineProperty(exports, "NoUnusedFragmentsRule", {
  enumerable: true,
  get: function get() {
    return _validation.NoUnusedFragmentsRule;
  }
});
Object.defineProperty(exports, "NoUnusedVariablesRule", {
  enumerable: true,
  get: function get() {
    return _validation.NoUnusedVariablesRule;
  }
});
Object.defineProperty(exports, "OverlappingFieldsCanBeMergedRule", {
  enumerable: true,
  get: function get() {
    return _validation.OverlappingFieldsCanBeMergedRule;
  }
});
Object.defineProperty(exports, "PossibleFragmentSpreadsRule", {
  enumerable: true,
  get: function get() {
    return _validation.PossibleFragmentSpreadsRule;
  }
});
Object.defineProperty(exports, "ProvidedRequiredArgumentsRule", {
  enumerable: true,
  get: function get() {
    return _validation.ProvidedRequiredArgumentsRule;
  }
});
Object.defineProperty(exports, "ScalarLeafsRule", {
  enumerable: true,
  get: function get() {
    return _validation.ScalarLeafsRule;
  }
});
Object.defineProperty(exports, "SingleFieldSubscriptionsRule", {
  enumerable: true,
  get: function get() {
    return _validation.SingleFieldSubscriptionsRule;
  }
});
Object.defineProperty(exports, "UniqueArgumentNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.UniqueArgumentNamesRule;
  }
});
Object.defineProperty(exports, "UniqueDirectivesPerLocationRule", {
  enumerable: true,
  get: function get() {
    return _validation.UniqueDirectivesPerLocationRule;
  }
});
Object.defineProperty(exports, "UniqueFragmentNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.UniqueFragmentNamesRule;
  }
});
Object.defineProperty(exports, "UniqueInputFieldNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.UniqueInputFieldNamesRule;
  }
});
Object.defineProperty(exports, "UniqueOperationNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.UniqueOperationNamesRule;
  }
});
Object.defineProperty(exports, "UniqueVariableNamesRule", {
  enumerable: true,
  get: function get() {
    return _validation.UniqueVariableNamesRule;
  }
});
Object.defineProperty(exports, "ValuesOfCorrectTypeRule", {
  enumerable: true,
  get: function get() {
    return _validation.ValuesOfCorrectTypeRule;
  }
});
Object.defineProperty(exports, "VariablesAreInputTypesRule", {
  enumerable: true,
  get: function get() {
    return _validation.VariablesAreInputTypesRule;
  }
});
Object.defineProperty(exports, "VariablesInAllowedPositionRule", {
  enumerable: true,
  get: function get() {
    return _validation.VariablesInAllowedPositionRule;
  }
});
Object.defineProperty(exports, "GraphQLError", {
  enumerable: true,
  get: function get() {
    return _error.GraphQLError;
  }
});
Object.defineProperty(exports, "formatError", {
  enumerable: true,
  get: function get() {
    return _error.formatError;
  }
});
Object.defineProperty(exports, "printError", {
  enumerable: true,
  get: function get() {
    return _error.printError;
  }
});
Object.defineProperty(exports, "getIntrospectionQuery", {
  enumerable: true,
  get: function get() {
    return _utilities.getIntrospectionQuery;
  }
});
Object.defineProperty(exports, "introspectionQuery", {
  enumerable: true,
  get: function get() {
    return _utilities.introspectionQuery;
  }
});
Object.defineProperty(exports, "getOperationAST", {
  enumerable: true,
  get: function get() {
    return _utilities.getOperationAST;
  }
});
Object.defineProperty(exports, "getOperationRootType", {
  enumerable: true,
  get: function get() {
    return _utilities.getOperationRootType;
  }
});
Object.defineProperty(exports, "introspectionFromSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.introspectionFromSchema;
  }
});
Object.defineProperty(exports, "buildClientSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.buildClientSchema;
  }
});
Object.defineProperty(exports, "buildASTSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.buildASTSchema;
  }
});
Object.defineProperty(exports, "buildSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.buildSchema;
  }
});
Object.defineProperty(exports, "getDescription", {
  enumerable: true,
  get: function get() {
    return _utilities.getDescription;
  }
});
Object.defineProperty(exports, "extendSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.extendSchema;
  }
});
Object.defineProperty(exports, "lexicographicSortSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.lexicographicSortSchema;
  }
});
Object.defineProperty(exports, "printSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.printSchema;
  }
});
Object.defineProperty(exports, "printIntrospectionSchema", {
  enumerable: true,
  get: function get() {
    return _utilities.printIntrospectionSchema;
  }
});
Object.defineProperty(exports, "printType", {
  enumerable: true,
  get: function get() {
    return _utilities.printType;
  }
});
Object.defineProperty(exports, "typeFromAST", {
  enumerable: true,
  get: function get() {
    return _utilities.typeFromAST;
  }
});
Object.defineProperty(exports, "valueFromAST", {
  enumerable: true,
  get: function get() {
    return _utilities.valueFromAST;
  }
});
Object.defineProperty(exports, "valueFromASTUntyped", {
  enumerable: true,
  get: function get() {
    return _utilities.valueFromASTUntyped;
  }
});
Object.defineProperty(exports, "astFromValue", {
  enumerable: true,
  get: function get() {
    return _utilities.astFromValue;
  }
});
Object.defineProperty(exports, "TypeInfo", {
  enumerable: true,
  get: function get() {
    return _utilities.TypeInfo;
  }
});
Object.defineProperty(exports, "coerceValue", {
  enumerable: true,
  get: function get() {
    return _utilities.coerceValue;
  }
});
Object.defineProperty(exports, "isValidJSValue", {
  enumerable: true,
  get: function get() {
    return _utilities.isValidJSValue;
  }
});
Object.defineProperty(exports, "isValidLiteralValue", {
  enumerable: true,
  get: function get() {
    return _utilities.isValidLiteralValue;
  }
});
Object.defineProperty(exports, "concatAST", {
  enumerable: true,
  get: function get() {
    return _utilities.concatAST;
  }
});
Object.defineProperty(exports, "separateOperations", {
  enumerable: true,
  get: function get() {
    return _utilities.separateOperations;
  }
});
Object.defineProperty(exports, "isEqualType", {
  enumerable: true,
  get: function get() {
    return _utilities.isEqualType;
  }
});
Object.defineProperty(exports, "isTypeSubTypeOf", {
  enumerable: true,
  get: function get() {
    return _utilities.isTypeSubTypeOf;
  }
});
Object.defineProperty(exports, "doTypesOverlap", {
  enumerable: true,
  get: function get() {
    return _utilities.doTypesOverlap;
  }
});
Object.defineProperty(exports, "assertValidName", {
  enumerable: true,
  get: function get() {
    return _utilities.assertValidName;
  }
});
Object.defineProperty(exports, "isValidNameError", {
  enumerable: true,
  get: function get() {
    return _utilities.isValidNameError;
  }
});
Object.defineProperty(exports, "findBreakingChanges", {
  enumerable: true,
  get: function get() {
    return _utilities.findBreakingChanges;
  }
});
Object.defineProperty(exports, "findDangerousChanges", {
  enumerable: true,
  get: function get() {
    return _utilities.findDangerousChanges;
  }
});
Object.defineProperty(exports, "BreakingChangeType", {
  enumerable: true,
  get: function get() {
    return _utilities.BreakingChangeType;
  }
});
Object.defineProperty(exports, "DangerousChangeType", {
  enumerable: true,
  get: function get() {
    return _utilities.DangerousChangeType;
  }
});
Object.defineProperty(exports, "findDeprecatedUsages", {
  enumerable: true,
  get: function get() {
    return _utilities.findDeprecatedUsages;
  }
});

var _graphql = require("./graphql");

var _type = require("./type");

var _language = require("./language");

var _execution = require("./execution");

var _subscription = require("./subscription");

var _validation = require("./validation");

var _error = require("./error");

var _utilities = require("./utilities");
},{"./error":5,"./execution":10,"./graphql":12,"./language":36,"./subscription":45,"./type":50,"./utilities":67,"./validation":80}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyToJSON;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * The `applyToJSON()` function defines toJSON() and inspect() prototype
 * methods which are aliases for toString().
 */
function applyToJSON(classObject) {
  classObject.prototype.toJSON = classObject.prototype.inspect = classObject.prototype.toString;
}
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyToStringTag;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * The `applyToStringTag()` function checks first to see if the runtime
 * supports the `Symbol` class and then if the `Symbol.toStringTag` constant
 * is defined as a `Symbol` instance. If both conditions are met, the
 * Symbol.toStringTag property is defined as a getter that returns the
 * supplied class constructor's name.
 *
 * @method applyToStringTag
 *
 * @param {Class<any>} classObject a class such as Object, String, Number but
 * typically one of your own creation through the class keyword; `class A {}`,
 * for example.
 */
function applyToStringTag(classObject) {
  if (typeof Symbol === 'function' && Symbol.toStringTag) {
    Object.defineProperty(classObject.prototype, Symbol.toStringTag, {
      get: function get() {
        return this.constructor.name;
      }
    });
  }
}
},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function find(list, predicate) {
  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      return list[i];
    }
  }
}
},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inspect;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Used to print values in error messages.
 */
function inspect(value) {
  switch (_typeof(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      if (value) {
        if (typeof value.inspect === 'function') {
          return value.inspect();
        } else if (Array.isArray(value)) {
          return '[' + value.map(inspect).join(', ') + ']';
        }

        var properties = Object.keys(value).map(function (k) {
          return "".concat(k, ": ").concat(inspect(value[k]));
        }).join(', ');
        return properties ? '{ ' + properties + ' }' : '{}';
      }

      return String(value);

    default:
      return String(value);
  }
}
},{}],18:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 */
// See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
// See: https://webpack.js.org/guides/production/
var _default = process.env.NODE_ENV === 'production' ? // eslint-disable-next-line no-shadow
function instanceOf(value, constructor) {
  return value instanceof constructor;
} : // eslint-disable-next-line no-shadow
function instanceOf(value, constructor) {
  if (value instanceof constructor) {
    return true;
  }

  if (value) {
    var valueClass = value.constructor;
    var className = constructor.name;

    if (className && valueClass && valueClass.name === className) {
      throw new Error("Cannot use ".concat(className, " \"").concat(value, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
    }
  }

  return false;
};

exports.default = _default;
}).call(this,require('_process'))
},{"_process":111}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function invariant(condition, message) {
  /* istanbul ignore else */
  if (!condition) {
    throw new Error(message);
  }
}
},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) 2018-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
var isFinite = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};

var _default = isFinite;
exports.default = _default;
},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) 2018-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
var isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

var _default = isInteger;
exports.default = _default;
},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInvalid;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Returns true if a value is undefined, or NaN.
 */
function isInvalid(value) {
  return value === undefined || value !== value;
}
},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullish;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Returns true if a value is null, undefined, or NaN.
 */
function isNullish(value) {
  return value === null || value === undefined || value !== value;
}
},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPromise;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 */
// eslint-disable-next-line no-redeclare
function isPromise(value) {
  return Boolean(value && typeof value.then === 'function');
}
},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyMap;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Creates a keyed JS object from an array, given a function to produce the keys
 * for each value in the array.
 *
 * This provides a convenient lookup for the array items if the key function
 * produces unique results.
 *
 *     const phoneBook = [
 *       { name: 'Jon', num: '555-1234' },
 *       { name: 'Jenny', num: '867-5309' }
 *     ]
 *
 *     // { Jon: { name: 'Jon', num: '555-1234' },
 *     //   Jenny: { name: 'Jenny', num: '867-5309' } }
 *     const entriesByName = keyMap(
 *       phoneBook,
 *       entry => entry.name
 *     )
 *
 *     // { name: 'Jenny', num: '857-6309' }
 *     const jennyEntry = entriesByName['Jenny']
 *
 */
function keyMap(list, keyFn) {
  return list.reduce(function (map, item) {
    return map[keyFn(item)] = item, map;
  }, Object.create(null));
}
},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyValMap;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Creates a keyed JS object from an array, given a function to produce the keys
 * and a function to produce the values from each item in the array.
 *
 *     const phoneBook = [
 *       { name: 'Jon', num: '555-1234' },
 *       { name: 'Jenny', num: '867-5309' }
 *     ]
 *
 *     // { Jon: '555-1234', Jenny: '867-5309' }
 *     const phonesByName = keyValMap(
 *       phoneBook,
 *       entry => entry.name,
 *       entry => entry.num
 *     )
 *
 */
function keyValMap(list, keyFn, valFn) {
  return list.reduce(function (map, item) {
    return map[keyFn(item)] = valFn(item), map;
  }, Object.create(null));
}
},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize3;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Memoizes the provided three-argument function.
 */
function memoize3(fn) {
  var cache0;

  function memoized(a1, a2, a3) {
    if (!cache0) {
      cache0 = new WeakMap();
    }

    var cache1 = cache0.get(a1);
    var cache2;

    if (cache1) {
      cache2 = cache1.get(a2);

      if (cache2) {
        var cachedValue = cache2.get(a3);

        if (cachedValue !== undefined) {
          return cachedValue;
        }
      }
    } else {
      cache1 = new WeakMap();
      cache0.set(a1, cache1);
    }

    if (!cache2) {
      cache2 = new WeakMap();
      cache1.set(a2, cache2);
    }

    var newValue = fn.apply(this, arguments);
    cache2.set(a3, newValue);
    return newValue;
  }

  return memoized;
}
},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/2221
var objectValues = Object.values || function (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};

var _default = objectValues;
exports.default = _default;
},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = orList;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
var MAX_LENGTH = 5;
/**
 * Given [ A, B, C ] return 'A, B, or C'.
 */

function orList(items) {
  var selected = items.slice(0, MAX_LENGTH);
  return selected.reduce(function (list, quoted, index) {
    return list + (selected.length > 2 ? ', ' : ' ') + (index === selected.length - 1 ? 'or ' : '') + quoted;
  });
}
},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promiseForObject;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * This function transforms a JS object `ObjMap<Promise<T>>` into
 * a `Promise<ObjMap<T>>`
 *
 * This is akin to bluebird's `Promise.props`, but implemented only using
 * `Promise.all` so it will work with any implementation of ES6 promises.
 */
function promiseForObject(object) {
  var keys = Object.keys(object);
  var valuesAndPromises = keys.map(function (name) {
    return object[name];
  });
  return Promise.all(valuesAndPromises).then(function (values) {
    return values.reduce(function (resolvedObject, value, i) {
      resolvedObject[keys[i]] = value;
      return resolvedObject;
    }, Object.create(null));
  });
}
},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promiseReduce;

var _isPromise = _interopRequireDefault(require("./isPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Similar to Array.prototype.reduce(), however the reducing callback may return
 * a Promise, in which case reduction will continue after each promise resolves.
 *
 * If the callback does not return a Promise, then this function will also not
 * return a Promise.
 */
function promiseReduce(values, callback, initialValue) {
  return values.reduce(function (previous, value) {
    return (0, _isPromise.default)(previous) ? previous.then(function (resolved) {
      return callback(resolved, value);
    }) : callback(previous, value);
  }, initialValue);
}
},{"./isPromise":24}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quotedOrList;

var _orList = _interopRequireDefault(require("./orList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Given [ A, B, C ] return '"A", "B", or "C"'.
 */
function quotedOrList(items) {
  return (0, _orList.default)(items.map(function (item) {
    return "\"".concat(item, "\"");
  }));
}
},{"./orList":29}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = suggestionList;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Given an invalid input string and a list of valid options, returns a filtered
 * list of valid options sorted based on their similarity with the input.
 */
function suggestionList(input, options) {
  var optionsByDistance = Object.create(null);
  var oLength = options.length;
  var inputThreshold = input.length / 2;

  for (var i = 0; i < oLength; i++) {
    var distance = lexicalDistance(input, options[i]);
    var threshold = Math.max(inputThreshold, options[i].length / 2, 1);

    if (distance <= threshold) {
      optionsByDistance[options[i]] = distance;
    }
  }

  return Object.keys(optionsByDistance).sort(function (a, b) {
    return optionsByDistance[a] - optionsByDistance[b];
  });
}
/**
 * Computes the lexical distance between strings A and B.
 *
 * The "distance" between two strings is given by counting the minimum number
 * of edits needed to transform string A into string B. An edit can be an
 * insertion, deletion, or substitution of a single character, or a swap of two
 * adjacent characters.
 *
 * Includes a custom alteration from Damerau-Levenshtein to treat case changes
 * as a single edit which helps identify mis-cased values with an edit distance
 * of 1.
 *
 * This distance can be useful for detecting typos in input or sorting
 *
 * @param {string} a
 * @param {string} b
 * @return {int} distance in number of edits
 */


function lexicalDistance(aStr, bStr) {
  if (aStr === bStr) {
    return 0;
  }

  var i;
  var j;
  var d = [];
  var a = aStr.toLowerCase();
  var b = bStr.toLowerCase();
  var aLength = a.length;
  var bLength = b.length; // Any case change counts as a single edit

  if (a === b) {
    return 1;
  }

  for (i = 0; i <= aLength; i++) {
    d[i] = [i];
  }

  for (j = 1; j <= bLength; j++) {
    d[0][j] = j;
  }

  for (i = 1; i <= aLength; i++) {
    for (j = 1; j <= bLength; j++) {
      var cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }

  return d[aLength][bLength];
}
},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blockStringValue;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 */
function blockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

  var commonIndent = null;

  for (var i = 1; i < lines.length; i++) {
    var line = lines[i];
    var indent = leadingWhitespace(line);

    if (indent < line.length && (commonIndent === null || indent < commonIndent)) {
      commonIndent = indent;

      if (commonIndent === 0) {
        break;
      }
    }
  }

  if (commonIndent) {
    for (var _i = 1; _i < lines.length; _i++) {
      lines[_i] = lines[_i].slice(commonIndent);
    }
  } // Remove leading and trailing blank lines.


  while (lines.length > 0 && isBlank(lines[0])) {
    lines.shift();
  }

  while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
    lines.pop();
  } // Return a string of the lines joined with U+000A.


  return lines.join('\n');
}

function leadingWhitespace(str) {
  var i = 0;

  while (i < str.length && (str[i] === ' ' || str[i] === '\t')) {
    i++;
  }

  return i;
}

function isBlank(str) {
  return leadingWhitespace(str) === str.length;
}
},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectiveLocation = void 0;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: 'QUERY',
  MUTATION: 'MUTATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FIELD: 'FIELD',
  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
  VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
  // Type System Definitions
  SCHEMA: 'SCHEMA',
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  FIELD_DEFINITION: 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  ENUM_VALUE: 'ENUM_VALUE',
  INPUT_OBJECT: 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
});
/**
 * The enum type representing the directive location values.
 */

exports.DirectiveLocation = DirectiveLocation;
},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getLocation", {
  enumerable: true,
  get: function get() {
    return _location.getLocation;
  }
});
Object.defineProperty(exports, "Kind", {
  enumerable: true,
  get: function get() {
    return _kinds.Kind;
  }
});
Object.defineProperty(exports, "createLexer", {
  enumerable: true,
  get: function get() {
    return _lexer.createLexer;
  }
});
Object.defineProperty(exports, "TokenKind", {
  enumerable: true,
  get: function get() {
    return _lexer.TokenKind;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return _parser.parse;
  }
});
Object.defineProperty(exports, "parseValue", {
  enumerable: true,
  get: function get() {
    return _parser.parseValue;
  }
});
Object.defineProperty(exports, "parseType", {
  enumerable: true,
  get: function get() {
    return _parser.parseType;
  }
});
Object.defineProperty(exports, "print", {
  enumerable: true,
  get: function get() {
    return _printer.print;
  }
});
Object.defineProperty(exports, "Source", {
  enumerable: true,
  get: function get() {
    return _source.Source;
  }
});
Object.defineProperty(exports, "visit", {
  enumerable: true,
  get: function get() {
    return _visitor.visit;
  }
});
Object.defineProperty(exports, "visitInParallel", {
  enumerable: true,
  get: function get() {
    return _visitor.visitInParallel;
  }
});
Object.defineProperty(exports, "visitWithTypeInfo", {
  enumerable: true,
  get: function get() {
    return _visitor.visitWithTypeInfo;
  }
});
Object.defineProperty(exports, "getVisitFn", {
  enumerable: true,
  get: function get() {
    return _visitor.getVisitFn;
  }
});
Object.defineProperty(exports, "BREAK", {
  enumerable: true,
  get: function get() {
    return _visitor.BREAK;
  }
});
Object.defineProperty(exports, "isDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isDefinitionNode;
  }
});
Object.defineProperty(exports, "isExecutableDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isExecutableDefinitionNode;
  }
});
Object.defineProperty(exports, "isSelectionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isSelectionNode;
  }
});
Object.defineProperty(exports, "isValueNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isValueNode;
  }
});
Object.defineProperty(exports, "isTypeNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isTypeNode;
  }
});
Object.defineProperty(exports, "isTypeSystemDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isTypeSystemDefinitionNode;
  }
});
Object.defineProperty(exports, "isTypeDefinitionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isTypeDefinitionNode;
  }
});
Object.defineProperty(exports, "isTypeSystemExtensionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isTypeSystemExtensionNode;
  }
});
Object.defineProperty(exports, "isTypeExtensionNode", {
  enumerable: true,
  get: function get() {
    return _predicates.isTypeExtensionNode;
  }
});
Object.defineProperty(exports, "DirectiveLocation", {
  enumerable: true,
  get: function get() {
    return _directiveLocation.DirectiveLocation;
  }
});

var _location = require("./location");

var _kinds = require("./kinds");

var _lexer = require("./lexer");

var _parser = require("./parser");

var _printer = require("./printer");

var _source = require("./source");

var _visitor = require("./visitor");

var _predicates = require("./predicates");

var _directiveLocation = require("./directiveLocation");
},{"./directiveLocation":35,"./kinds":37,"./lexer":38,"./location":39,"./parser":40,"./predicates":41,"./printer":42,"./source":43,"./visitor":44}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Kind = void 0;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * The set of allowed kind values for AST nodes.
 */
var Kind = Object.freeze({
  // Name
  NAME: 'Name',
  // Document
  DOCUMENT: 'Document',
  OPERATION_DEFINITION: 'OperationDefinition',
  VARIABLE_DEFINITION: 'VariableDefinition',
  SELECTION_SET: 'SelectionSet',
  FIELD: 'Field',
  ARGUMENT: 'Argument',
  // Fragments
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_FRAGMENT: 'InlineFragment',
  FRAGMENT_DEFINITION: 'FragmentDefinition',
  // Values
  VARIABLE: 'Variable',
  INT: 'IntValue',
  FLOAT: 'FloatValue',
  STRING: 'StringValue',
  BOOLEAN: 'BooleanValue',
  NULL: 'NullValue',
  ENUM: 'EnumValue',
  LIST: 'ListValue',
  OBJECT: 'ObjectValue',
  OBJECT_FIELD: 'ObjectField',
  // Directives
  DIRECTIVE: 'Directive',
  // Types
  NAMED_TYPE: 'NamedType',
  LIST_TYPE: 'ListType',
  NON_NULL_TYPE: 'NonNullType',
  // Type System Definitions
  SCHEMA_DEFINITION: 'SchemaDefinition',
  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
  // Type Definitions
  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
  FIELD_DEFINITION: 'FieldDefinition',
  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
  // Directive Definitions
  DIRECTIVE_DEFINITION: 'DirectiveDefinition',
  // Type System Extensions
  SCHEMA_EXTENSION: 'SchemaExtension',
  // Type Extensions
  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
});
/**
 * The enum type representing the possible kind values of AST nodes.
 */

exports.Kind = Kind;
},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLexer = createLexer;
exports.getTokenDesc = getTokenDesc;
exports.TokenKind = void 0;

var _error = require("../error");

var _blockStringValue = _interopRequireDefault(require("./blockStringValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Given a Source object, this returns a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
function createLexer(source, options) {
  var startOfFileToken = new Tok(TokenKind.SOF, 0, 0, 0, 0, null);
  var lexer = {
    source: source,
    options: options,
    lastToken: startOfFileToken,
    token: startOfFileToken,
    line: 1,
    lineStart: 0,
    advance: advanceLexer,
    lookahead: lookahead
  };
  return lexer;
}

function advanceLexer() {
  this.lastToken = this.token;
  var token = this.token = this.lookahead();
  return token;
}

function lookahead() {
  var token = this.token;

  if (token.kind !== TokenKind.EOF) {
    do {
      // Note: next is only mutable during parsing, so we cast to allow this.
      token = token.next || (token.next = readToken(this, token));
    } while (token.kind === TokenKind.COMMENT);
  }

  return token;
}
/**
 * The return type of createLexer.
 */


/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = Object.freeze({
  SOF: '<SOF>',
  EOF: '<EOF>',
  BANG: '!',
  DOLLAR: '$',
  AMP: '&',
  PAREN_L: '(',
  PAREN_R: ')',
  SPREAD: '...',
  COLON: ':',
  EQUALS: '=',
  AT: '@',
  BRACKET_L: '[',
  BRACKET_R: ']',
  BRACE_L: '{',
  PIPE: '|',
  BRACE_R: '}',
  NAME: 'Name',
  INT: 'Int',
  FLOAT: 'Float',
  STRING: 'String',
  BLOCK_STRING: 'BlockString',
  COMMENT: 'Comment'
});
/**
 * The enum type representing the token kinds values.
 */

exports.TokenKind = TokenKind;

/**
 * A helper function to describe a token as a string for debugging
 */
function getTokenDesc(token) {
  var value = token.value;
  return value ? "".concat(token.kind, " \"").concat(value, "\"") : token.kind;
}

var charCodeAt = String.prototype.charCodeAt;
var slice = String.prototype.slice;
/**
 * Helper function for constructing the Token object.
 */

function Tok(kind, start, end, line, column, prev, value) {
  this.kind = kind;
  this.start = start;
  this.end = end;
  this.line = line;
  this.column = column;
  this.value = value;
  this.prev = prev;
  this.next = null;
} // Print a simplified form when appearing in JSON/util.inspect.


Tok.prototype.toJSON = Tok.prototype.inspect = function toJSON() {
  return {
    kind: this.kind,
    value: this.value,
    line: this.line,
    column: this.column
  };
};

function printCharCode(code) {
  return (// NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? TokenKind.EOF : // Trust JSON for ASCII.
    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
    "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
  );
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace and comments until it finds the next lexable
 * token, then lexes punctuators immediately or calls the appropriate helper
 * function for more complicated tokens.
 */


function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;

  if (pos >= bodyLength) {
    return new Tok(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = charCodeAt.call(body, pos); // SourceCharacter

  switch (code) {
    // !
    case 33:
      return new Tok(TokenKind.BANG, pos, pos + 1, line, col, prev);
    // #

    case 35:
      return readComment(source, pos, line, col, prev);
    // $

    case 36:
      return new Tok(TokenKind.DOLLAR, pos, pos + 1, line, col, prev);
    // &

    case 38:
      return new Tok(TokenKind.AMP, pos, pos + 1, line, col, prev);
    // (

    case 40:
      return new Tok(TokenKind.PAREN_L, pos, pos + 1, line, col, prev);
    // )

    case 41:
      return new Tok(TokenKind.PAREN_R, pos, pos + 1, line, col, prev);
    // .

    case 46:
      if (charCodeAt.call(body, pos + 1) === 46 && charCodeAt.call(body, pos + 2) === 46) {
        return new Tok(TokenKind.SPREAD, pos, pos + 3, line, col, prev);
      }

      break;
    // :

    case 58:
      return new Tok(TokenKind.COLON, pos, pos + 1, line, col, prev);
    // =

    case 61:
      return new Tok(TokenKind.EQUALS, pos, pos + 1, line, col, prev);
    // @

    case 64:
      return new Tok(TokenKind.AT, pos, pos + 1, line, col, prev);
    // [

    case 91:
      return new Tok(TokenKind.BRACKET_L, pos, pos + 1, line, col, prev);
    // ]

    case 93:
      return new Tok(TokenKind.BRACKET_R, pos, pos + 1, line, col, prev);
    // {

    case 123:
      return new Tok(TokenKind.BRACE_L, pos, pos + 1, line, col, prev);
    // |

    case 124:
      return new Tok(TokenKind.PIPE, pos, pos + 1, line, col, prev);
    // }

    case 125:
      return new Tok(TokenKind.BRACE_R, pos, pos + 1, line, col, prev);
    // A-Z _ a-z

    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
    case 95:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
      return readName(source, pos, line, col, prev);
    // - 0-9

    case 45:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return readNumber(source, pos, code, line, col, prev);
    // "

    case 34:
      if (charCodeAt.call(body, pos + 1) === 34 && charCodeAt.call(body, pos + 2) === 34) {
        return readBlockString(source, pos, line, col, prev);
      }

      return readString(source, pos, line, col, prev);
  }

  throw (0, _error.syntaxError)(source, pos, unexpectedCharacterMessage(code));
}
/**
 * Report a message that an unexpected character was encountered.
 */


function unexpectedCharacterMessage(code) {
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }

  if (code === 39) {
    // '
    return "Unexpected single quote character ('), did you mean to use " + 'a double quote (")?';
  }

  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * or commented character, then returns the position of that character for
 * lexing.
 */


function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;

  while (position < bodyLength) {
    var code = charCodeAt.call(body, position); // tab | space | comma | BOM

    if (code === 9 || code === 32 || code === 44 || code === 0xfeff) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (charCodeAt.call(body, position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }

      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }

  return position;
}
/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */


function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;

  do {
    code = charCodeAt.call(body, ++position);
  } while (code !== null && ( // SourceCharacter but not LineTerminator
  code > 0x001f || code === 0x0009));

  return new Tok(TokenKind.COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
}
/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */


function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = charCodeAt.call(body, ++position);
  }

  if (code === 48) {
    // 0
    code = charCodeAt.call(body, ++position);

    if (code >= 48 && code <= 57) {
      throw (0, _error.syntaxError)(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 46) {
    // .
    isFloat = true;
    code = charCodeAt.call(body, ++position);
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;
    code = charCodeAt.call(body, ++position);

    if (code === 43 || code === 45) {
      // + -
      code = charCodeAt.call(body, ++position);
    }

    position = readDigits(source, position, code);
  }

  return new Tok(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, slice.call(body, start, position));
}
/**
 * Returns the new position in the source after reading digits.
 */


function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;

  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = charCodeAt.call(body, ++position);
    } while (code >= 48 && code <= 57); // 0 - 9


    return position;
  }

  throw (0, _error.syntaxError)(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */


function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null && // not LineTerminator
  code !== 0x000a && code !== 0x000d) {
    // Closing Quote (")
    if (code === 34) {
      value += slice.call(body, chunkStart, position);
      return new Tok(TokenKind.STRING, start, position + 1, line, col, prev, value);
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009) {
      throw (0, _error.syntaxError)(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    ++position;

    if (code === 92) {
      // \
      value += slice.call(body, chunkStart, position - 1);
      code = charCodeAt.call(body, position);

      switch (code) {
        case 34:
          value += '"';
          break;

        case 47:
          value += '/';
          break;

        case 92:
          value += '\\';
          break;

        case 98:
          value += '\b';
          break;

        case 102:
          value += '\f';
          break;

        case 110:
          value += '\n';
          break;

        case 114:
          value += '\r';
          break;

        case 116:
          value += '\t';
          break;

        case 117:
          // u
          var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));

          if (charCode < 0) {
            throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: ' + "\\u".concat(body.slice(position + 1, position + 5), "."));
          }

          value += String.fromCharCode(charCode);
          position += 4;
          break;

        default:
          throw (0, _error.syntaxError)(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }

      ++position;
      chunkStart = position;
    }
  }

  throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
}
/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */


function readBlockString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null) {
    // Closing Triple-Quote (""")
    if (code === 34 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34) {
      rawValue += slice.call(body, chunkStart, position);
      return new Tok(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, (0, _blockStringValue.default)(rawValue));
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
      throw (0, _error.syntaxError)(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    } // Escape Triple-Quote (\""")


    if (code === 92 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34 && charCodeAt.call(body, position + 3) === 34) {
      rawValue += slice.call(body, chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }

  throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
}
/**
 * Converts four hexadecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */


function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */


function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 // 0-9
  : a >= 65 && a <= 70 ? a - 55 // A-F
  : a >= 97 && a <= 102 ? a - 87 // a-f
  : -1;
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */


function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;

  while (position !== bodyLength && (code = charCodeAt.call(body, position)) !== null && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122) // a-z
  ) {
    ++position;
  }

  return new Tok(TokenKind.NAME, start, position, line, col, prev, slice.call(body, start, position));
}
},{"../error":5,"./blockStringValue":34}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;

  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }

  return {
    line: line,
    column: column
  };
}
},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;
exports.parseConstValue = parseConstValue;
exports.parseTypeReference = parseTypeReference;
exports.parseNamedType = parseNamedType;

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _source = require("./source");

var _error = require("../error");

var _lexer = require("./lexer");

var _kinds = require("./kinds");

var _directiveLocation = require("./directiveLocation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;

  if (!(sourceObj instanceof _source.Source)) {
    throw new TypeError("Must provide Source. Received: ".concat((0, _inspect.default)(sourceObj)));
  }

  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  return parseDocument(lexer);
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */


function parseValue(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var value = parseValueLiteral(lexer, false);
  expect(lexer, _lexer.TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */


function parseType(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var type = parseTypeReference(lexer);
  expect(lexer, _lexer.TokenKind.EOF);
  return type;
}
/**
 * Converts a name lex token into a name parse node.
 */


function parseName(lexer) {
  var token = expect(lexer, _lexer.TokenKind.NAME);
  return {
    kind: _kinds.Kind.NAME,
    value: token.value,
    loc: loc(lexer, token)
  };
} // Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */


function parseDocument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.DOCUMENT,
    definitions: many(lexer, _lexer.TokenKind.SOF, parseDefinition, _lexer.TokenKind.EOF),
    loc: loc(lexer, start)
  };
}
/**
 * Definition :
 *   - ExecutableDefinition
 *   - TypeSystemDefinition
 *   - TypeSystemExtension
 */


function parseDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
      case 'fragment':
        return parseExecutableDefinition(lexer);

      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'directive':
        return parseTypeSystemDefinition(lexer);

      case 'extend':
        return parseTypeSystemExtension(lexer);
    }
  } else if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseExecutableDefinition(lexer);
  } else if (peekDescription(lexer)) {
    return parseTypeSystemDefinition(lexer);
  }

  throw unexpected(lexer);
}
/**
 * ExecutableDefinition :
 *   - OperationDefinition
 *   - FragmentDefinition
 */


function parseExecutableDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer);

      case 'fragment':
        return parseFragmentDefinition(lexer);
    }
  } else if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer);
  }

  throw unexpected(lexer);
} // Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */


function parseOperationDefinition(lexer) {
  var start = lexer.token;

  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return {
      kind: _kinds.Kind.OPERATION_DEFINITION,
      operation: 'query',
      name: undefined,
      variableDefinitions: [],
      directives: [],
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }

  var operation = parseOperationType(lexer);
  var name;

  if (peek(lexer, _lexer.TokenKind.NAME)) {
    name = parseName(lexer);
  }

  return {
    kind: _kinds.Kind.OPERATION_DEFINITION,
    operation: operation,
    name: name,
    variableDefinitions: parseVariableDefinitions(lexer),
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}
/**
 * OperationType : one of query mutation subscription
 */


function parseOperationType(lexer) {
  var operationToken = expect(lexer, _lexer.TokenKind.NAME);

  switch (operationToken.value) {
    case 'query':
      return 'query';

    case 'mutation':
      return 'mutation';

    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer, operationToken);
}
/**
 * VariableDefinitions : ( VariableDefinition+ )
 */


function parseVariableDefinitions(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseVariableDefinition, _lexer.TokenKind.PAREN_R) : [];
}
/**
 * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
 */


function parseVariableDefinition(lexer) {
  var start = lexer.token;

  if (lexer.options.experimentalVariableDefinitionDirectives) {
    return {
      kind: _kinds.Kind.VARIABLE_DEFINITION,
      variable: parseVariable(lexer),
      type: (expect(lexer, _lexer.TokenKind.COLON), parseTypeReference(lexer)),
      defaultValue: skip(lexer, _lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : undefined,
      directives: parseDirectives(lexer, true),
      loc: loc(lexer, start)
    };
  }

  return {
    kind: _kinds.Kind.VARIABLE_DEFINITION,
    variable: parseVariable(lexer),
    type: (expect(lexer, _lexer.TokenKind.COLON), parseTypeReference(lexer)),
    defaultValue: skip(lexer, _lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : undefined,
    loc: loc(lexer, start)
  };
}
/**
 * Variable : $ Name
 */


function parseVariable(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.DOLLAR);
  return {
    kind: _kinds.Kind.VARIABLE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}
/**
 * SelectionSet : { Selection+ }
 */


function parseSelectionSet(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.SELECTION_SET,
    selections: many(lexer, _lexer.TokenKind.BRACE_L, parseSelection, _lexer.TokenKind.BRACE_R),
    loc: loc(lexer, start)
  };
}
/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */


function parseSelection(lexer) {
  return peek(lexer, _lexer.TokenKind.SPREAD) ? parseFragment(lexer) : parseField(lexer);
}
/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */


function parseField(lexer) {
  var start = lexer.token;
  var nameOrAlias = parseName(lexer);
  var alias;
  var name;

  if (skip(lexer, _lexer.TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer);
  } else {
    name = nameOrAlias;
  }

  return {
    kind: _kinds.Kind.FIELD,
    alias: alias,
    name: name,
    arguments: parseArguments(lexer, false),
    directives: parseDirectives(lexer, false),
    selectionSet: peek(lexer, _lexer.TokenKind.BRACE_L) ? parseSelectionSet(lexer) : undefined,
    loc: loc(lexer, start)
  };
}
/**
 * Arguments[Const] : ( Argument[?Const]+ )
 */


function parseArguments(lexer, isConst) {
  var item = isConst ? parseConstArgument : parseArgument;
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, item, _lexer.TokenKind.PAREN_R) : [];
}
/**
 * Argument[Const] : Name : Value[?Const]
 */


function parseArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, false)),
    loc: loc(lexer, start)
  };
}

function parseConstArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseConstValue(lexer)),
    loc: loc(lexer, start)
  };
} // Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */


function parseFragment(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SPREAD);

  if (peek(lexer, _lexer.TokenKind.NAME) && lexer.token.value !== 'on') {
    return {
      kind: _kinds.Kind.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer),
      directives: parseDirectives(lexer, false),
      loc: loc(lexer, start)
    };
  }

  var typeCondition;

  if (lexer.token.value === 'on') {
    lexer.advance();
    typeCondition = parseNamedType(lexer);
  }

  return {
    kind: _kinds.Kind.INLINE_FRAGMENT,
    typeCondition: typeCondition,
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}
/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */


function parseFragmentDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'fragment'); // Experimental support for defining variables within fragments changes
  // the grammar of FragmentDefinition:
  //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

  if (lexer.options.experimentalFragmentVariables) {
    return {
      kind: _kinds.Kind.FRAGMENT_DEFINITION,
      name: parseFragmentName(lexer),
      variableDefinitions: parseVariableDefinitions(lexer),
      typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
      directives: parseDirectives(lexer, false),
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }

  return {
    kind: _kinds.Kind.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer),
    typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}
/**
 * FragmentName : Name but not `on`
 */


function parseFragmentName(lexer) {
  if (lexer.token.value === 'on') {
    throw unexpected(lexer);
  }

  return parseName(lexer);
} // Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */


function parseValueLiteral(lexer, isConst) {
  var token = lexer.token;

  switch (token.kind) {
    case _lexer.TokenKind.BRACKET_L:
      return parseList(lexer, isConst);

    case _lexer.TokenKind.BRACE_L:
      return parseObject(lexer, isConst);

    case _lexer.TokenKind.INT:
      lexer.advance();
      return {
        kind: _kinds.Kind.INT,
        value: token.value,
        loc: loc(lexer, token)
      };

    case _lexer.TokenKind.FLOAT:
      lexer.advance();
      return {
        kind: _kinds.Kind.FLOAT,
        value: token.value,
        loc: loc(lexer, token)
      };

    case _lexer.TokenKind.STRING:
    case _lexer.TokenKind.BLOCK_STRING:
      return parseStringLiteral(lexer);

    case _lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer.advance();
        return {
          kind: _kinds.Kind.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer, token)
        };
      } else if (token.value === 'null') {
        lexer.advance();
        return {
          kind: _kinds.Kind.NULL,
          loc: loc(lexer, token)
        };
      }

      lexer.advance();
      return {
        kind: _kinds.Kind.ENUM,
        value: token.value,
        loc: loc(lexer, token)
      };

    case _lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer);
      }

      break;
  }

  throw unexpected(lexer);
}

function parseStringLiteral(lexer) {
  var token = lexer.token;
  lexer.advance();
  return {
    kind: _kinds.Kind.STRING,
    value: token.value,
    block: token.kind === _lexer.TokenKind.BLOCK_STRING,
    loc: loc(lexer, token)
  };
}

function parseConstValue(lexer) {
  return parseValueLiteral(lexer, true);
}

function parseValueValue(lexer) {
  return parseValueLiteral(lexer, false);
}
/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */


function parseList(lexer, isConst) {
  var start = lexer.token;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: _kinds.Kind.LIST,
    values: any(lexer, _lexer.TokenKind.BRACKET_L, item, _lexer.TokenKind.BRACKET_R),
    loc: loc(lexer, start)
  };
}
/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */


function parseObject(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.BRACE_L);
  var fields = [];

  while (!skip(lexer, _lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(lexer, isConst));
  }

  return {
    kind: _kinds.Kind.OBJECT,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * ObjectField[Const] : Name : Value[?Const]
 */


function parseObjectField(lexer, isConst) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.OBJECT_FIELD,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, isConst)),
    loc: loc(lexer, start)
  };
} // Implements the parsing rules in the Directives section.

/**
 * Directives[Const] : Directive[?Const]+
 */


function parseDirectives(lexer, isConst) {
  var directives = [];

  while (peek(lexer, _lexer.TokenKind.AT)) {
    directives.push(parseDirective(lexer, isConst));
  }

  return directives;
}
/**
 * Directive[Const] : @ Name Arguments[?Const]?
 */


function parseDirective(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.AT);
  return {
    kind: _kinds.Kind.DIRECTIVE,
    name: parseName(lexer),
    arguments: parseArguments(lexer, isConst),
    loc: loc(lexer, start)
  };
} // Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */


function parseTypeReference(lexer) {
  var start = lexer.token;
  var type;

  if (skip(lexer, _lexer.TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer);
    expect(lexer, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.Kind.LIST_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  } else {
    type = parseNamedType(lexer);
  }

  if (skip(lexer, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.Kind.NON_NULL_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  }

  return type;
}
/**
 * NamedType : Name
 */


function parseNamedType(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.Kind.NAMED_TYPE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
} // Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */


function parseTypeSystemDefinition(lexer) {
  // Many definitions begin with a description and require a lookahead.
  var keywordToken = peekDescription(lexer) ? lexer.lookahead() : lexer.token;

  if (keywordToken.kind === _lexer.TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'schema':
        return parseSchemaDefinition(lexer);

      case 'scalar':
        return parseScalarTypeDefinition(lexer);

      case 'type':
        return parseObjectTypeDefinition(lexer);

      case 'interface':
        return parseInterfaceTypeDefinition(lexer);

      case 'union':
        return parseUnionTypeDefinition(lexer);

      case 'enum':
        return parseEnumTypeDefinition(lexer);

      case 'input':
        return parseInputObjectTypeDefinition(lexer);

      case 'directive':
        return parseDirectiveDefinition(lexer);
    }
  }

  throw unexpected(lexer, keywordToken);
}

function peekDescription(lexer) {
  return peek(lexer, _lexer.TokenKind.STRING) || peek(lexer, _lexer.TokenKind.BLOCK_STRING);
}
/**
 * Description : StringValue
 */


function parseDescription(lexer) {
  if (peekDescription(lexer)) {
    return parseStringLiteral(lexer);
  }
}
/**
 * SchemaDefinition : schema Directives[Const]? { OperationTypeDefinition+ }
 */


function parseSchemaDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'schema');
  var directives = parseDirectives(lexer, true);
  var operationTypes = many(lexer, _lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.Kind.SCHEMA_DEFINITION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer, start)
  };
}
/**
 * OperationTypeDefinition : OperationType : NamedType
 */


function parseOperationTypeDefinition(lexer) {
  var start = lexer.token;
  var operation = parseOperationType(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseNamedType(lexer);
  return {
    kind: _kinds.Kind.OPERATION_TYPE_DEFINITION,
    operation: operation,
    type: type,
    loc: loc(lexer, start)
  };
}
/**
 * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
 */


function parseScalarTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.SCALAR_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}
/**
 * ObjectTypeDefinition :
 *   Description?
 *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
 */


function parseObjectTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);
  return {
    kind: _kinds.Kind.OBJECT_TYPE_DEFINITION,
    description: description,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * ImplementsInterfaces :
 *   - implements `&`? NamedType
 *   - ImplementsInterfaces & NamedType
 */


function parseImplementsInterfaces(lexer) {
  var types = [];

  if (lexer.token.value === 'implements') {
    lexer.advance(); // Optional leading ampersand

    skip(lexer, _lexer.TokenKind.AMP);

    do {
      types.push(parseNamedType(lexer));
    } while (skip(lexer, _lexer.TokenKind.AMP) || // Legacy support for the SDL?
    lexer.options.allowLegacySDLImplementsInterfaces && peek(lexer, _lexer.TokenKind.NAME));
  }

  return types;
}
/**
 * FieldsDefinition : { FieldDefinition+ }
 */


function parseFieldsDefinition(lexer) {
  // Legacy support for the SDL?
  if (lexer.options.allowLegacySDLEmptyFields && peek(lexer, _lexer.TokenKind.BRACE_L) && lexer.lookahead().kind === _lexer.TokenKind.BRACE_R) {
    lexer.advance();
    lexer.advance();
    return [];
  }

  return peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R) : [];
}
/**
 * FieldDefinition :
 *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
 */


function parseFieldDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.FIELD_DEFINITION,
    description: description,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(lexer, start)
  };
}
/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */


function parseArgumentDefs(lexer) {
  if (!peek(lexer, _lexer.TokenKind.PAREN_L)) {
    return [];
  }

  return many(lexer, _lexer.TokenKind.PAREN_L, parseInputValueDef, _lexer.TokenKind.PAREN_R);
}
/**
 * InputValueDefinition :
 *   - Description? Name : Type DefaultValue? Directives[Const]?
 */


function parseInputValueDef(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  var name = parseName(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var defaultValue;

  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer);
  }

  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.INPUT_VALUE_DEFINITION,
    description: description,
    name: name,
    type: type,
    defaultValue: defaultValue,
    directives: directives,
    loc: loc(lexer, start)
  };
}
/**
 * InterfaceTypeDefinition :
 *   - Description? interface Name Directives[Const]? FieldsDefinition?
 */


function parseInterfaceTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);
  return {
    kind: _kinds.Kind.INTERFACE_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * UnionTypeDefinition :
 *   - Description? union Name Directives[Const]? UnionMemberTypes?
 */


function parseUnionTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var types = parseUnionMemberTypes(lexer);
  return {
    kind: _kinds.Kind.UNION_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}
/**
 * UnionMemberTypes :
 *   - = `|`? NamedType
 *   - UnionMemberTypes | NamedType
 */


function parseUnionMemberTypes(lexer) {
  var types = [];

  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    // Optional leading pipe
    skip(lexer, _lexer.TokenKind.PIPE);

    do {
      types.push(parseNamedType(lexer));
    } while (skip(lexer, _lexer.TokenKind.PIPE));
  }

  return types;
}
/**
 * EnumTypeDefinition :
 *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
 */


function parseEnumTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var values = parseEnumValuesDefinition(lexer);
  return {
    kind: _kinds.Kind.ENUM_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}
/**
 * EnumValuesDefinition : { EnumValueDefinition+ }
 */


function parseEnumValuesDefinition(lexer) {
  return peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseEnumValueDefinition, _lexer.TokenKind.BRACE_R) : [];
}
/**
 * EnumValueDefinition : Description? EnumValue Directives[Const]?
 *
 * EnumValue : Name
 */


function parseEnumValueDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  return {
    kind: _kinds.Kind.ENUM_VALUE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}
/**
 * InputObjectTypeDefinition :
 *   - Description? input Name Directives[Const]? InputFieldsDefinition?
 */


function parseInputObjectTypeDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseInputFieldsDefinition(lexer);
  return {
    kind: _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION,
    description: description,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * InputFieldsDefinition : { InputValueDefinition+ }
 */


function parseInputFieldsDefinition(lexer) {
  return peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseInputValueDef, _lexer.TokenKind.BRACE_R) : [];
}
/**
 * TypeSystemExtension :
 *   - SchemaExtension
 *   - TypeExtension
 *
 * TypeExtension :
 *   - ScalarTypeExtension
 *   - ObjectTypeExtension
 *   - InterfaceTypeExtension
 *   - UnionTypeExtension
 *   - EnumTypeExtension
 *   - InputObjectTypeDefinition
 */


function parseTypeSystemExtension(lexer) {
  var keywordToken = lexer.lookahead();

  if (keywordToken.kind === _lexer.TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'schema':
        return parseSchemaExtension(lexer);

      case 'scalar':
        return parseScalarTypeExtension(lexer);

      case 'type':
        return parseObjectTypeExtension(lexer);

      case 'interface':
        return parseInterfaceTypeExtension(lexer);

      case 'union':
        return parseUnionTypeExtension(lexer);

      case 'enum':
        return parseEnumTypeExtension(lexer);

      case 'input':
        return parseInputObjectTypeExtension(lexer);
    }
  }

  throw unexpected(lexer, keywordToken);
}
/**
 * SchemaExtension :
 *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
 *  - extend schema Directives[Const]
 */


function parseSchemaExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'schema');
  var directives = parseDirectives(lexer, true);
  var operationTypes = peek(lexer, _lexer.TokenKind.BRACE_L) ? many(lexer, _lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, _lexer.TokenKind.BRACE_R) : [];

  if (directives.length === 0 && operationTypes.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.SCHEMA_EXTENSION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer, start)
  };
}
/**
 * ScalarTypeExtension :
 *   - extend scalar Name Directives[Const]
 */


function parseScalarTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);

  if (directives.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.SCALAR_TYPE_EXTENSION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}
/**
 * ObjectTypeExtension :
 *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
 *  - extend type Name ImplementsInterfaces? Directives[Const]
 *  - extend type Name ImplementsInterfaces
 */


function parseObjectTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);

  if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.OBJECT_TYPE_EXTENSION,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * InterfaceTypeExtension :
 *   - extend interface Name Directives[Const]? FieldsDefinition
 *   - extend interface Name Directives[Const]
 */


function parseInterfaceTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseFieldsDefinition(lexer);

  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * UnionTypeExtension :
 *   - extend union Name Directives[Const]? UnionMemberTypes
 *   - extend union Name Directives[Const]
 */


function parseUnionTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var types = parseUnionMemberTypes(lexer);

  if (directives.length === 0 && types.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.UNION_TYPE_EXTENSION,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}
/**
 * EnumTypeExtension :
 *   - extend enum Name Directives[Const]? EnumValuesDefinition
 *   - extend enum Name Directives[Const]
 */


function parseEnumTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var values = parseEnumValuesDefinition(lexer);

  if (directives.length === 0 && values.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.ENUM_TYPE_EXTENSION,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}
/**
 * InputObjectTypeExtension :
 *   - extend input Name Directives[Const]? InputFieldsDefinition
 *   - extend input Name Directives[Const]
 */


function parseInputObjectTypeExtension(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer, true);
  var fields = parseInputFieldsDefinition(lexer);

  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }

  return {
    kind: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}
/**
 * DirectiveDefinition :
 *   - Description? directive @ Name ArgumentsDefinition? on DirectiveLocations
 */


function parseDirectiveDefinition(lexer) {
  var start = lexer.token;
  var description = parseDescription(lexer);
  expectKeyword(lexer, 'directive');
  expect(lexer, _lexer.TokenKind.AT);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expectKeyword(lexer, 'on');
  var locations = parseDirectiveLocations(lexer);
  return {
    kind: _kinds.Kind.DIRECTIVE_DEFINITION,
    description: description,
    name: name,
    arguments: args,
    locations: locations,
    loc: loc(lexer, start)
  };
}
/**
 * DirectiveLocations :
 *   - `|`? DirectiveLocation
 *   - DirectiveLocations | DirectiveLocation
 */


function parseDirectiveLocations(lexer) {
  // Optional leading pipe
  skip(lexer, _lexer.TokenKind.PIPE);
  var locations = [];

  do {
    locations.push(parseDirectiveLocation(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));

  return locations;
}
/*
 * DirectiveLocation :
 *   - ExecutableDirectiveLocation
 *   - TypeSystemDirectiveLocation
 *
 * ExecutableDirectiveLocation : one of
 *   `QUERY`
 *   `MUTATION`
 *   `SUBSCRIPTION`
 *   `FIELD`
 *   `FRAGMENT_DEFINITION`
 *   `FRAGMENT_SPREAD`
 *   `INLINE_FRAGMENT`
 *
 * TypeSystemDirectiveLocation : one of
 *   `SCHEMA`
 *   `SCALAR`
 *   `OBJECT`
 *   `FIELD_DEFINITION`
 *   `ARGUMENT_DEFINITION`
 *   `INTERFACE`
 *   `UNION`
 *   `ENUM`
 *   `ENUM_VALUE`
 *   `INPUT_OBJECT`
 *   `INPUT_FIELD_DEFINITION`
 */


function parseDirectiveLocation(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);

  if (_directiveLocation.DirectiveLocation.hasOwnProperty(name.value)) {
    return name;
  }

  throw unexpected(lexer, start);
} // Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */


function loc(lexer, startToken) {
  if (!lexer.options.noLocation) {
    return new Loc(startToken, lexer.lastToken, lexer.source);
  }
}

function Loc(startToken, endToken, source) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source;
} // Print a simplified form when appearing in JSON/util.inspect.


Loc.prototype.toJSON = Loc.prototype.inspect = function toJSON() {
  return {
    start: this.start,
    end: this.end
  };
};
/**
 * Determines if the next token is of a given kind
 */


function peek(lexer, kind) {
  return lexer.token.kind === kind;
}
/**
 * If the next token is of the given kind, return true after advancing
 * the lexer. Otherwise, do not change the parser state and return false.
 */


function skip(lexer, kind) {
  var match = lexer.token.kind === kind;

  if (match) {
    lexer.advance();
  }

  return match;
}
/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */


function expect(lexer, kind) {
  var token = lexer.token;

  if (token.kind === kind) {
    lexer.advance();
    return token;
  }

  throw (0, _error.syntaxError)(lexer.source, token.start, "Expected ".concat(kind, ", found ").concat((0, _lexer.getTokenDesc)(token)));
}
/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the lexer. Otherwise, do not change the parser state and return
 * false.
 */


function expectKeyword(lexer, value) {
  var token = lexer.token;

  if (token.kind === _lexer.TokenKind.NAME && token.value === value) {
    lexer.advance();
    return token;
  }

  throw (0, _error.syntaxError)(lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat((0, _lexer.getTokenDesc)(token)));
}
/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */


function unexpected(lexer, atToken) {
  var token = atToken || lexer.token;
  return (0, _error.syntaxError)(lexer.source, token.start, "Unexpected ".concat((0, _lexer.getTokenDesc)(token)));
}
/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */


function any(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [];

  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }

  return nodes;
}
/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */


function many(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [parseFn(lexer)];

  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }

  return nodes;
}
},{"../error":5,"../jsutils/inspect":17,"./directiveLocation":35,"./kinds":37,"./lexer":38,"./source":43}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefinitionNode = isDefinitionNode;
exports.isExecutableDefinitionNode = isExecutableDefinitionNode;
exports.isSelectionNode = isSelectionNode;
exports.isValueNode = isValueNode;
exports.isTypeNode = isTypeNode;
exports.isTypeSystemDefinitionNode = isTypeSystemDefinitionNode;
exports.isTypeDefinitionNode = isTypeDefinitionNode;
exports.isTypeSystemExtensionNode = isTypeSystemExtensionNode;
exports.isTypeExtensionNode = isTypeExtensionNode;

var _kinds = require("./kinds");

/**
 * Copyright (c) 2018-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function isDefinitionNode(node) {
  return isExecutableDefinitionNode(node) || isTypeSystemDefinitionNode(node) || isTypeSystemExtensionNode(node);
}

function isExecutableDefinitionNode(node) {
  return node.kind === _kinds.Kind.OPERATION_DEFINITION || node.kind === _kinds.Kind.FRAGMENT_DEFINITION;
}

function isSelectionNode(node) {
  return node.kind === _kinds.Kind.FIELD || node.kind === _kinds.Kind.FRAGMENT_SPREAD || node.kind === _kinds.Kind.INLINE_FRAGMENT;
}

function isValueNode(node) {
  return node.kind === _kinds.Kind.VARIABLE || node.kind === _kinds.Kind.INT || node.kind === _kinds.Kind.FLOAT || node.kind === _kinds.Kind.STRING || node.kind === _kinds.Kind.BOOLEAN || node.kind === _kinds.Kind.NULL || node.kind === _kinds.Kind.ENUM || node.kind === _kinds.Kind.LIST || node.kind === _kinds.Kind.OBJECT;
}

function isTypeNode(node) {
  return node.kind === _kinds.Kind.NAMED_TYPE || node.kind === _kinds.Kind.LIST_TYPE || node.kind === _kinds.Kind.NON_NULL_TYPE;
}

function isTypeSystemDefinitionNode(node) {
  return node.kind === _kinds.Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === _kinds.Kind.DIRECTIVE_DEFINITION;
}

function isTypeDefinitionNode(node) {
  return node.kind === _kinds.Kind.SCALAR_TYPE_DEFINITION || node.kind === _kinds.Kind.OBJECT_TYPE_DEFINITION || node.kind === _kinds.Kind.INTERFACE_TYPE_DEFINITION || node.kind === _kinds.Kind.UNION_TYPE_DEFINITION || node.kind === _kinds.Kind.ENUM_TYPE_DEFINITION || node.kind === _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION;
}

function isTypeSystemExtensionNode(node) {
  return node.kind === _kinds.Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}

function isTypeExtensionNode(node) {
  return node.kind === _kinds.Kind.SCALAR_TYPE_EXTENSION || node.kind === _kinds.Kind.OBJECT_TYPE_EXTENSION || node.kind === _kinds.Kind.INTERFACE_TYPE_EXTENSION || node.kind === _kinds.Kind.UNION_TYPE_EXTENSION || node.kind === _kinds.Kind.ENUM_TYPE_EXTENSION || node.kind === _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
},{"./kinds":37}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _visitor = require("./visitor");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, {
    leave: printDocASTReducer
  });
}

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
    // the query short form.

    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue,
        directives = _ref.directives;
    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (// Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === 'description') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },
  // Type System Definitions
  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },
  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),
  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + (args.every(function (arg) {
      return arg.indexOf('\n') === -1;
    }) ? wrap('(', join(args, ', '), ')') : wrap('(\n', indent(join(args, '\n')), '\n)')) + ': ' + type + wrap(' ', join(directives, ' '));
  }),
  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),
  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  }),
  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),
  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),
  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),
  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),
  DirectiveDefinition: addDescription(function (_ref31) {
    var name = _ref31.name,
        args = _ref31.arguments,
        locations = _ref31.locations;
    return 'directive @' + name + (args.every(function (arg) {
      return arg.indexOf('\n') === -1;
    }) ? wrap('(', join(args, ', '), ')') : wrap('(\n', indent(join(args, '\n')), '\n)')) + ' on ' + join(locations, ' | ');
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives,
        operationTypes = _ref32.operationTypes;
    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name,
        interfaces = _ref34.interfaces,
        directives = _ref34.directives,
        fields = _ref34.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name,
        directives = _ref35.directives,
        fields = _ref35.fields;
    return join(['extend interface', name, join(directives, ' '), block(fields)], ' ');
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        types = _ref36.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name,
        directives = _ref37.directives,
        values = _ref37.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name,
        directives = _ref38.directives,
        fields = _ref38.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  }
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */


function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */


function block(array) {
  return array && array.length !== 0 ? '{\n' + indent(join(array, '\n')) + '\n}' : '';
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */


function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && '  ' + maybeString.replace(/\n/g, '\n  ');
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 */


function printBlockString(value, isDescription) {
  var escaped = value.replace(/"""/g, '\\"""');
  return (value[0] === ' ' || value[0] === '\t') && value.indexOf('\n') === -1 ? "\"\"\"".concat(escaped.replace(/"$/, '"\n'), "\"\"\"") : "\"\"\"\n".concat(isDescription ? escaped : indent(escaped), "\n\"\"\"");
}
},{"./visitor":44}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = void 0;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _defineToStringTag = _interopRequireDefault(require("../jsutils/defineToStringTag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A representation of source input to GraphQL.
 * `name` and `locationOffset` are optional. They are useful for clients who
 * store GraphQL documents in source files; for example, if the GraphQL input
 * starts at line 40 in a file named Foo.graphql, it might be useful for name to
 * be "Foo.graphql" and location to be `{ line: 40, column: 0 }`.
 * line and column in locationOffset are 1-indexed
 */
var Source = function Source(body, name, locationOffset) {
  _defineProperty(this, "body", void 0);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "locationOffset", void 0);

  this.body = body;
  this.name = name || 'GraphQL request';
  this.locationOffset = locationOffset || {
    line: 1,
    column: 1
  };
  !(this.locationOffset.line > 0) ? (0, _invariant.default)(0, 'line in locationOffset is 1-indexed and must be positive') : void 0;
  !(this.locationOffset.column > 0) ? (0, _invariant.default)(0, 'column in locationOffset is 1-indexed and must be positive') : void 0;
}; // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.Source = Source;
(0, _defineToStringTag.default)(Source);
},{"../jsutils/defineToStringTag":15,"../jsutils/invariant":19}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.visitWithTypeInfo = visitWithTypeInfo;
exports.getVisitFn = getVisitFn;
exports.BREAK = exports.QueryDocumentKeys = void 0;

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
exports.QueryDocumentKeys = QueryDocumentKeys;
var BREAK = {};
/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

exports.BREAK = BREAK;

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + (0, _inspect.default)(node));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return Boolean(maybeNode && typeof maybeNode.kind === 'string');
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */


function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          false);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          true);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */


function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind,
      /* isLeaving */
      false);

      if (fn) {
        var result = fn.apply(visitor, arguments);

        if (result !== undefined) {
          typeInfo.leave(node);

          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }

        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind,
      /* isLeaving */
      true);
      var result;

      if (fn) {
        result = fn.apply(visitor, arguments);
      }

      typeInfo.leave(node);
      return result;
    }
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */


function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}
},{"../jsutils/inspect":17}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function get() {
    return _subscribe.subscribe;
  }
});
Object.defineProperty(exports, "createSourceEventStream", {
  enumerable: true,
  get: function get() {
    return _subscribe.createSourceEventStream;
  }
});

var _subscribe = require("./subscribe");
},{"./subscribe":47}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapAsyncIterator;

var _iterall = require("iterall");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */
function mapAsyncIterator(iterable, callback, rejectCallback) {
  var iterator = (0, _iterall.getAsyncIterator)(iterable);
  var $return;
  var abruptClose; // $FlowFixMe(>=0.68.0)

  if (typeof iterator.return === 'function') {
    $return = iterator.return;

    abruptClose = function abruptClose(error) {
      var rethrow = function rethrow() {
        return Promise.reject(error);
      };

      return $return.call(iterator).then(rethrow, rethrow);
    };
  }

  function mapResult(result) {
    return result.done ? result : asyncMapValue(result.value, callback).then(iteratorResult, abruptClose);
  }

  var mapReject;

  if (rejectCallback) {
    // Capture rejectCallback to ensure it cannot be null.
    var reject = rejectCallback;

    mapReject = function mapReject(error) {
      return asyncMapValue(error, reject).then(iteratorResult, abruptClose);
    };
  }
  /* TODO: Flow doesn't support symbols as keys:
     https://github.com/facebook/flow/issues/3258 */


  return _defineProperty({
    next: function next() {
      return iterator.next().then(mapResult, mapReject);
    },
    return: function _return() {
      return $return ? $return.call(iterator).then(mapResult, mapReject) : Promise.resolve({
        value: undefined,
        done: true
      });
    },
    throw: function _throw(error) {
      // $FlowFixMe(>=0.68.0)
      if (typeof iterator.throw === 'function') {
        return iterator.throw(error).then(mapResult, mapReject);
      }

      return Promise.reject(error).catch(abruptClose);
    }
  }, _iterall.$$asyncIterator, function () {
    return this;
  });
}

function asyncMapValue(value, callback) {
  return new Promise(function (resolve) {
    return resolve(callback(value));
  });
}

function iteratorResult(value) {
  return {
    value: value,
    done: false
  };
}
},{"iterall":110}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = subscribe;
exports.createSourceEventStream = createSourceEventStream;

var _iterall = require("iterall");

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _GraphQLError = require("../error/GraphQLError");

var _locatedError = require("../error/locatedError");

var _execute = require("../execution/execute");

var _mapAsyncIterator = _interopRequireDefault(require("./mapAsyncIterator"));

var _getOperationRootType = require("../utilities/getOperationRootType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function subscribe(argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, subscribeFieldResolver) {
  /* eslint-enable no-redeclare */
  // Extract arguments from object args if provided.
  return arguments.length === 1 ? subscribeImpl(argsOrSchema.schema, argsOrSchema.document, argsOrSchema.rootValue, argsOrSchema.contextValue, argsOrSchema.variableValues, argsOrSchema.operationName, argsOrSchema.fieldResolver, argsOrSchema.subscribeFieldResolver) : subscribeImpl(argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, subscribeFieldResolver);
}
/**
 * This function checks if the error is a GraphQLError. If it is, report it as
 * an ExecutionResult, containing only errors and no data. Otherwise treat the
 * error as a system-class error and re-throw it.
 */


function reportGraphQLError(error) {
  if (error instanceof _GraphQLError.GraphQLError) {
    return {
      errors: [error]
    };
  }

  throw error;
}

function subscribeImpl(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, subscribeFieldResolver) {
  var sourcePromise = createSourceEventStream(schema, document, rootValue, contextValue, variableValues, operationName, subscribeFieldResolver); // For each payload yielded from a subscription, map it over the normal
  // GraphQL `execute` function, with `payload` as the rootValue.
  // This implements the "MapSourceToResponseEvent" algorithm described in
  // the GraphQL specification. The `execute` function provides the
  // "ExecuteSubscriptionEvent" algorithm, as it is nearly identical to the
  // "ExecuteQuery" algorithm, for which `execute` is also used.

  var mapSourceToResponse = function mapSourceToResponse(payload) {
    return (0, _execute.execute)(schema, document, payload, contextValue, variableValues, operationName, fieldResolver);
  }; // Resolve the Source Stream, then map every source value to a
  // ExecutionResult value as described above.


  return sourcePromise.then(function (resultOrStream) {
    return (// Note: Flow can't refine isAsyncIterable, so explicit casts are used.
      (0, _iterall.isAsyncIterable)(resultOrStream) ? (0, _mapAsyncIterator.default)(resultOrStream, mapSourceToResponse, reportGraphQLError) : resultOrStream
    );
  }, reportGraphQLError);
}
/**
 * Implements the "CreateSourceEventStream" algorithm described in the
 * GraphQL specification, resolving the subscription source event stream.
 *
 * Returns a Promise<AsyncIterable>.
 *
 * If the client-provided invalid arguments, the source stream could not be
 * created, or the resolver did not return an AsyncIterable, this function will
 * will throw an error, which should be caught and handled by the caller.
 *
 * A Source Event Stream represents a sequence of events, each of which triggers
 * a GraphQL execution for that event.
 *
 * This may be useful when hosting the stateful subscription service in a
 * different process or machine than the stateless GraphQL execution engine,
 * or otherwise separating these two steps. For more on this, see the
 * "Supporting Subscriptions at Scale" information in the GraphQL specification.
 */


function createSourceEventStream(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  // If arguments are missing or incorrectly typed, this is an internal
  // developer mistake which should throw an early error.
  (0, _execute.assertValidExecutionArguments)(schema, document, variableValues);

  try {
    // If a valid context cannot be created due to incorrect arguments,
    // this will throw an error.
    var exeContext = (0, _execute.buildExecutionContext)(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver); // Return early errors if execution context failed.

    if (Array.isArray(exeContext)) {
      return Promise.resolve({
        errors: exeContext
      });
    }

    var type = (0, _getOperationRootType.getOperationRootType)(schema, exeContext.operation);
    var fields = (0, _execute.collectFields)(exeContext, type, exeContext.operation.selectionSet, Object.create(null), Object.create(null));
    var responseNames = Object.keys(fields);
    var responseName = responseNames[0];
    var fieldNodes = fields[responseName];
    var fieldNode = fieldNodes[0];
    var fieldName = fieldNode.name.value;
    var fieldDef = (0, _execute.getFieldDef)(schema, type, fieldName);

    if (!fieldDef) {
      throw new _GraphQLError.GraphQLError("The subscription field \"".concat(fieldName, "\" is not defined."), fieldNodes);
    } // Call the `subscribe()` resolver or the default resolver to produce an
    // AsyncIterable yielding raw payloads.


    var resolveFn = fieldDef.subscribe || exeContext.fieldResolver;
    var path = (0, _execute.addPath)(undefined, responseName);
    var info = (0, _execute.buildResolveInfo)(exeContext, fieldDef, fieldNodes, type, path); // resolveFieldValueOrError implements the "ResolveFieldEventStream"
    // algorithm from GraphQL specification. It differs from
    // "ResolveFieldValue" due to providing a different `resolveFn`.

    var result = (0, _execute.resolveFieldValueOrError)(exeContext, fieldDef, fieldNodes, resolveFn, rootValue, info); // Coerce to Promise for easier error handling and consistent return type.

    return Promise.resolve(result).then(function (eventStream) {
      // If eventStream is an Error, rethrow a located error.
      if (eventStream instanceof Error) {
        throw (0, _locatedError.locatedError)(eventStream, fieldNodes, (0, _execute.responsePathAsArray)(path));
      } // Assert field returned an event stream, otherwise yield an error.


      if ((0, _iterall.isAsyncIterable)(eventStream)) {
        // Note: isAsyncIterable above ensures this will be correct.
        return eventStream;
      }

      throw new Error('Subscription field must return Async Iterable. Received: ' + (0, _inspect.default)(eventStream));
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
},{"../error/GraphQLError":3,"../error/locatedError":6,"../execution/execute":9,"../jsutils/inspect":17,"../utilities/getOperationRootType":66,"./mapAsyncIterator":46,"iterall":110}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isType = isType;
exports.assertType = assertType;
exports.isScalarType = isScalarType;
exports.assertScalarType = assertScalarType;
exports.isObjectType = isObjectType;
exports.assertObjectType = assertObjectType;
exports.isInterfaceType = isInterfaceType;
exports.assertInterfaceType = assertInterfaceType;
exports.isUnionType = isUnionType;
exports.assertUnionType = assertUnionType;
exports.isEnumType = isEnumType;
exports.assertEnumType = assertEnumType;
exports.isInputObjectType = isInputObjectType;
exports.assertInputObjectType = assertInputObjectType;
exports.isListType = isListType;
exports.assertListType = assertListType;
exports.isNonNullType = isNonNullType;
exports.assertNonNullType = assertNonNullType;
exports.isInputType = isInputType;
exports.assertInputType = assertInputType;
exports.isOutputType = isOutputType;
exports.assertOutputType = assertOutputType;
exports.isLeafType = isLeafType;
exports.assertLeafType = assertLeafType;
exports.isCompositeType = isCompositeType;
exports.assertCompositeType = assertCompositeType;
exports.isAbstractType = isAbstractType;
exports.assertAbstractType = assertAbstractType;
exports.GraphQLList = GraphQLList;
exports.GraphQLNonNull = GraphQLNonNull;
exports.isWrappingType = isWrappingType;
exports.assertWrappingType = assertWrappingType;
exports.isNullableType = isNullableType;
exports.assertNullableType = assertNullableType;
exports.getNullableType = getNullableType;
exports.isNamedType = isNamedType;
exports.assertNamedType = assertNamedType;
exports.getNamedType = getNamedType;
exports.isRequiredArgument = isRequiredArgument;
exports.isRequiredInputField = isRequiredInputField;
exports.GraphQLInputObjectType = exports.GraphQLEnumType = exports.GraphQLUnionType = exports.GraphQLInterfaceType = exports.GraphQLObjectType = exports.GraphQLScalarType = void 0;

var _defineToJSON = _interopRequireDefault(require("../jsutils/defineToJSON"));

var _defineToStringTag = _interopRequireDefault(require("../jsutils/defineToStringTag"));

var _instanceOf = _interopRequireDefault(require("../jsutils/instanceOf"));

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

var _kinds = require("../language/kinds");

var _valueFromASTUntyped = require("../utilities/valueFromASTUntyped");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}

function assertType(type) {
  !isType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL type.")) : void 0;
  return type;
}
/**
 * There are predicates for each kind of GraphQL type.
 */


// eslint-disable-next-line no-redeclare
function isScalarType(type) {
  return (0, _instanceOf.default)(type, GraphQLScalarType);
}

function assertScalarType(type) {
  !isScalarType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Scalar type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isObjectType(type) {
  return (0, _instanceOf.default)(type, GraphQLObjectType);
}

function assertObjectType(type) {
  !isObjectType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Object type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isInterfaceType(type) {
  return (0, _instanceOf.default)(type, GraphQLInterfaceType);
}

function assertInterfaceType(type) {
  !isInterfaceType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Interface type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isUnionType(type) {
  return (0, _instanceOf.default)(type, GraphQLUnionType);
}

function assertUnionType(type) {
  !isUnionType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Union type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isEnumType(type) {
  return (0, _instanceOf.default)(type, GraphQLEnumType);
}

function assertEnumType(type) {
  !isEnumType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Enum type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isInputObjectType(type) {
  return (0, _instanceOf.default)(type, GraphQLInputObjectType);
}

function assertInputObjectType(type) {
  !isInputObjectType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Input Object type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isListType(type) {
  return (0, _instanceOf.default)(type, GraphQLList);
}

function assertListType(type) {
  !isListType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL List type.")) : void 0;
  return type;
}

// eslint-disable-next-line no-redeclare
function isNonNullType(type) {
  return (0, _instanceOf.default)(type, GraphQLNonNull);
}

function assertNonNullType(type) {
  !isNonNullType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL Non-Null type.")) : void 0;
  return type;
}
/**
 * These types may be used as input types for arguments and directives.
 */


function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}

function assertInputType(type) {
  !isInputType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL input type.")) : void 0;
  return type;
}
/**
 * These types may be used as output types as the result of fields.
 */


function isOutputType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
}

function assertOutputType(type) {
  !isOutputType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL output type.")) : void 0;
  return type;
}
/**
 * These types may describe types which may be leaf values.
 */


function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}

function assertLeafType(type) {
  !isLeafType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL leaf type.")) : void 0;
  return type;
}
/**
 * These types may describe the parent context of a selection set.
 */


function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}

function assertCompositeType(type) {
  !isCompositeType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL composite type.")) : void 0;
  return type;
}
/**
 * These types may describe the parent context of a selection set.
 */


function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}

function assertAbstractType(type) {
  !isAbstractType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL abstract type.")) : void 0;
  return type;
}
/**
 * List Type Wrapper
 *
 * A list is a wrapping type which points to another type.
 * Lists are often created within the context of defining the fields of
 * an object type.
 *
 * Example:
 *
 *     const PersonType = new GraphQLObjectType({
 *       name: 'Person',
 *       fields: () => ({
 *         parents: { type: GraphQLList(PersonType) },
 *         children: { type: GraphQLList(PersonType) },
 *       })
 *     })
 *
 */


// eslint-disable-next-line no-redeclare
function GraphQLList(ofType) {
  if (this instanceof GraphQLList) {
    this.ofType = assertType(ofType);
  } else {
    return new GraphQLList(ofType);
  }
} // Need to cast through any to alter the prototype.


GraphQLList.prototype.toString = function toString() {
  return '[' + String(this.ofType) + ']';
};

(0, _defineToJSON.default)(GraphQLList);
/**
 * Non-Null Type Wrapper
 *
 * A non-null is a wrapping type which points to another type.
 * Non-null types enforce that their values are never null and can ensure
 * an error is raised if this ever occurs during a request. It is useful for
 * fields which you can make a strong guarantee on non-nullability, for example
 * usually the id field of a database row will never be null.
 *
 * Example:
 *
 *     const RowType = new GraphQLObjectType({
 *       name: 'Row',
 *       fields: () => ({
 *         id: { type: GraphQLNonNull(GraphQLString) },
 *       })
 *     })
 *
 * Note: the enforcement of non-nullability occurs within the executor.
 */

// eslint-disable-next-line no-redeclare
function GraphQLNonNull(ofType) {
  if (this instanceof GraphQLNonNull) {
    this.ofType = assertNullableType(ofType);
  } else {
    return new GraphQLNonNull(ofType);
  }
} // Need to cast through any to alter the prototype.


GraphQLNonNull.prototype.toString = function toString() {
  return String(this.ofType) + '!';
};

(0, _defineToJSON.default)(GraphQLNonNull);
/**
 * These types wrap and modify other types
 */

function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}

function assertWrappingType(type) {
  !isWrappingType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL wrapping type.")) : void 0;
  return type;
}
/**
 * These types can all accept null as a value.
 */


function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}

function assertNullableType(type) {
  !isNullableType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL nullable type.")) : void 0;
  return type;
}
/* eslint-disable no-redeclare */


function getNullableType(type) {
  /* eslint-enable no-redeclare */
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
/**
 * These named types do not include modifiers like List or NonNull.
 */


function isNamedType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type);
}

function assertNamedType(type) {
  !isNamedType(type) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(type), " to be a GraphQL named type.")) : void 0;
  return type;
}
/* eslint-disable no-redeclare */


function getNamedType(type) {
  /* eslint-enable no-redeclare */
  if (type) {
    var unwrappedType = type;

    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }

    return unwrappedType;
  }
}
/**
 * Used while defining GraphQL types to allow for circular references in
 * otherwise immutable type definitions.
 */


function resolveThunk(thunk) {
  return typeof thunk === 'function' ? thunk() : thunk;
}
/**
 * Scalar Type Definition
 *
 * The leaf values of any request and input values to arguments are
 * Scalars (or Enums) and are defined with a name and a series of functions
 * used to parse input from ast or variables and to ensure validity.
 *
 * If a type's serialize function does not return a value (i.e. it returns
 * `undefined`) then an error will be raised and a `null` value will be returned
 * in the response. If the serialize function returns `null`, then no error will
 * be included in the response.
 *
 * Example:
 *
 *     const OddType = new GraphQLScalarType({
 *       name: 'Odd',
 *       serialize(value) {
 *         if (value % 2 === 1) {
 *           return value;
 *         }
 *       }
 *     });
 *
 */


var GraphQLScalarType =
/*#__PURE__*/
function () {
  function GraphQLScalarType(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "serialize", void 0);

    _defineProperty(this, "parseValue", void 0);

    _defineProperty(this, "parseLiteral", void 0);

    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    this.name = config.name;
    this.description = config.description;
    this.serialize = config.serialize;

    this.parseValue = config.parseValue || function (value) {
      return value;
    };

    this.parseLiteral = config.parseLiteral || _valueFromASTUntyped.valueFromASTUntyped;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    !(typeof config.name === 'string') ? (0, _invariant.default)(0, 'Must provide name.') : void 0;
    !(typeof config.serialize === 'function') ? (0, _invariant.default)(0, "".concat(this.name, " must provide \"serialize\" function. If this custom Scalar ") + 'is also used as an input type, ensure "parseValue" and "parseLiteral" ' + 'functions are also provided.') : void 0;

    if (config.parseValue || config.parseLiteral) {
      !(typeof config.parseValue === 'function' && typeof config.parseLiteral === 'function') ? (0, _invariant.default)(0, "".concat(this.name, " must provide both \"parseValue\" and \"parseLiteral\" ") + 'functions.') : void 0;
    }
  }

  var _proto = GraphQLScalarType.prototype;

  _proto.toString = function toString() {
    return this.name;
  };

  return GraphQLScalarType;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLScalarType = GraphQLScalarType;
(0, _defineToStringTag.default)(GraphQLScalarType);
(0, _defineToJSON.default)(GraphQLScalarType);

/**
 * Object Type Definition
 *
 * Almost all of the GraphQL types you define will be object types. Object types
 * have a name, but most importantly describe their fields.
 *
 * Example:
 *
 *     const AddressType = new GraphQLObjectType({
 *       name: 'Address',
 *       fields: {
 *         street: { type: GraphQLString },
 *         number: { type: GraphQLInt },
 *         formatted: {
 *           type: GraphQLString,
 *           resolve(obj) {
 *             return obj.number + ' ' + obj.street
 *           }
 *         }
 *       }
 *     });
 *
 * When two types need to refer to each other, or a type needs to refer to
 * itself in a field, you can use a function expression (aka a closure or a
 * thunk) to supply the fields lazily.
 *
 * Example:
 *
 *     const PersonType = new GraphQLObjectType({
 *       name: 'Person',
 *       fields: () => ({
 *         name: { type: GraphQLString },
 *         bestFriend: { type: PersonType },
 *       })
 *     });
 *
 */
var GraphQLObjectType =
/*#__PURE__*/
function () {
  function GraphQLObjectType(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    _defineProperty(this, "isTypeOf", void 0);

    _defineProperty(this, "_fields", void 0);

    _defineProperty(this, "_interfaces", void 0);

    this.name = config.name;
    this.description = config.description;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this.isTypeOf = config.isTypeOf;
    this._fields = defineFieldMap.bind(undefined, config);
    this._interfaces = defineInterfaces.bind(undefined, config);
    !(typeof config.name === 'string') ? (0, _invariant.default)(0, 'Must provide name.') : void 0;
    !(config.isTypeOf == null || typeof config.isTypeOf === 'function') ? (0, _invariant.default)(0, "".concat(this.name, " must provide \"isTypeOf\" as a function, ") + "but got: ".concat((0, _inspect.default)(config.isTypeOf), ".")) : void 0;
  }

  var _proto2 = GraphQLObjectType.prototype;

  _proto2.getFields = function getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  };

  _proto2.getInterfaces = function getInterfaces() {
    if (typeof this._interfaces === 'function') {
      this._interfaces = this._interfaces();
    }

    return this._interfaces;
  };

  _proto2.toString = function toString() {
    return this.name;
  };

  return GraphQLObjectType;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLObjectType = GraphQLObjectType;
(0, _defineToStringTag.default)(GraphQLObjectType);
(0, _defineToJSON.default)(GraphQLObjectType);

function defineInterfaces(config) {
  var interfaces = resolveThunk(config.interfaces) || [];
  !Array.isArray(interfaces) ? (0, _invariant.default)(0, "".concat(config.name, " interfaces must be an Array or a function which returns ") + 'an Array.') : void 0;
  return interfaces;
}

function defineFieldMap(config) {
  var fieldMap = resolveThunk(config.fields) || {};
  !isPlainObj(fieldMap) ? (0, _invariant.default)(0, "".concat(config.name, " fields must be an object with field names as keys or a ") + 'function which returns such an object.') : void 0;
  var resultFieldMap = Object.create(null);

  var _arr = Object.keys(fieldMap);

  var _loop = function _loop() {
    var fieldName = _arr[_i];
    var fieldConfig = fieldMap[fieldName];
    !isPlainObj(fieldConfig) ? (0, _invariant.default)(0, "".concat(config.name, ".").concat(fieldName, " field config must be an object")) : void 0;
    !!fieldConfig.hasOwnProperty('isDeprecated') ? (0, _invariant.default)(0, "".concat(config.name, ".").concat(fieldName, " should provide \"deprecationReason\" ") + 'instead of "isDeprecated".') : void 0;

    var field = _objectSpread({}, fieldConfig, {
      isDeprecated: Boolean(fieldConfig.deprecationReason),
      name: fieldName
    });

    !(field.resolve == null || typeof field.resolve === 'function') ? (0, _invariant.default)(0, "".concat(config.name, ".").concat(fieldName, " field resolver must be a function if ") + "provided, but got: ".concat((0, _inspect.default)(field.resolve), ".")) : void 0;
    var argsConfig = fieldConfig.args;

    if (!argsConfig) {
      field.args = [];
    } else {
      !isPlainObj(argsConfig) ? (0, _invariant.default)(0, "".concat(config.name, ".").concat(fieldName, " args must be an object with argument ") + 'names as keys.') : void 0;
      field.args = Object.keys(argsConfig).map(function (argName) {
        var arg = argsConfig[argName];
        return {
          name: argName,
          description: arg.description === undefined ? null : arg.description,
          type: arg.type,
          defaultValue: arg.defaultValue,
          astNode: arg.astNode
        };
      });
    }

    resultFieldMap[fieldName] = field;
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
  }

  return resultFieldMap;
}

function isPlainObj(obj) {
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj);
}

function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === undefined;
}

/**
 * Interface Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Interface type
 * is used to describe what types are possible, what fields are in common across
 * all types, as well as a function to determine which type is actually used
 * when the field is resolved.
 *
 * Example:
 *
 *     const EntityType = new GraphQLInterfaceType({
 *       name: 'Entity',
 *       fields: {
 *         name: { type: GraphQLString }
 *       }
 *     });
 *
 */
var GraphQLInterfaceType =
/*#__PURE__*/
function () {
  function GraphQLInterfaceType(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    _defineProperty(this, "resolveType", void 0);

    _defineProperty(this, "_fields", void 0);

    this.name = config.name;
    this.description = config.description;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this.resolveType = config.resolveType;
    this._fields = defineFieldMap.bind(undefined, config);
    !(typeof config.name === 'string') ? (0, _invariant.default)(0, 'Must provide name.') : void 0;
    !(config.resolveType == null || typeof config.resolveType === 'function') ? (0, _invariant.default)(0, "".concat(this.name, " must provide \"resolveType\" as a function, ") + "but got: ".concat((0, _inspect.default)(config.resolveType), ".")) : void 0;
  }

  var _proto3 = GraphQLInterfaceType.prototype;

  _proto3.getFields = function getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  };

  _proto3.toString = function toString() {
    return this.name;
  };

  return GraphQLInterfaceType;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLInterfaceType = GraphQLInterfaceType;
(0, _defineToStringTag.default)(GraphQLInterfaceType);
(0, _defineToJSON.default)(GraphQLInterfaceType);

/**
 * Union Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Union type
 * is used to describe what types are possible as well as providing a function
 * to determine which type is actually used when the field is resolved.
 *
 * Example:
 *
 *     const PetType = new GraphQLUnionType({
 *       name: 'Pet',
 *       types: [ DogType, CatType ],
 *       resolveType(value) {
 *         if (value instanceof Dog) {
 *           return DogType;
 *         }
 *         if (value instanceof Cat) {
 *           return CatType;
 *         }
 *       }
 *     });
 *
 */
var GraphQLUnionType =
/*#__PURE__*/
function () {
  function GraphQLUnionType(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    _defineProperty(this, "resolveType", void 0);

    _defineProperty(this, "_types", void 0);

    this.name = config.name;
    this.description = config.description;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this.resolveType = config.resolveType;
    this._types = defineTypes.bind(undefined, config);
    !(typeof config.name === 'string') ? (0, _invariant.default)(0, 'Must provide name.') : void 0;
    !(config.resolveType == null || typeof config.resolveType === 'function') ? (0, _invariant.default)(0, "".concat(this.name, " must provide \"resolveType\" as a function, ") + "but got: ".concat((0, _inspect.default)(config.resolveType), ".")) : void 0;
  }

  var _proto4 = GraphQLUnionType.prototype;

  _proto4.getTypes = function getTypes() {
    if (typeof this._types === 'function') {
      this._types = this._types();
    }

    return this._types;
  };

  _proto4.toString = function toString() {
    return this.name;
  };

  return GraphQLUnionType;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLUnionType = GraphQLUnionType;
(0, _defineToStringTag.default)(GraphQLUnionType);
(0, _defineToJSON.default)(GraphQLUnionType);

function defineTypes(config) {
  var types = resolveThunk(config.types) || [];
  !Array.isArray(types) ? (0, _invariant.default)(0, 'Must provide Array of types or a function which returns ' + "such an array for Union ".concat(config.name, ".")) : void 0;
  return types;
}

/**
 * Enum Type Definition
 *
 * Some leaf values of requests and input values are Enums. GraphQL serializes
 * Enum values as strings, however internally Enums can be represented by any
 * kind of type, often integers.
 *
 * Example:
 *
 *     const RGBType = new GraphQLEnumType({
 *       name: 'RGB',
 *       values: {
 *         RED: { value: 0 },
 *         GREEN: { value: 1 },
 *         BLUE: { value: 2 }
 *       }
 *     });
 *
 * Note: If a value is not provided in a definition, the name of the enum value
 * will be used as its internal value.
 */
var GraphQLEnumType
/* <T> */
=
/*#__PURE__*/
function () {
  function GraphQLEnumType(config
  /* <T> */
  ) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    _defineProperty(this, "_values", void 0);

    _defineProperty(this, "_valueLookup", void 0);

    _defineProperty(this, "_nameLookup", void 0);

    this.name = config.name;
    this.description = config.description;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this._values = defineEnumValues(this, config.values);
    this._valueLookup = new Map(this._values.map(function (enumValue) {
      return [enumValue.value, enumValue];
    }));
    this._nameLookup = (0, _keyMap.default)(this._values, function (value) {
      return value.name;
    });
    !(typeof config.name === 'string') ? (0, _invariant.default)(0, 'Must provide name.') : void 0;
  }

  var _proto5 = GraphQLEnumType.prototype;

  _proto5.getValues = function getValues() {
    return this._values;
  };

  _proto5.getValue = function getValue(name) {
    return this._nameLookup[name];
  };

  _proto5.serialize = function serialize(value
  /* T */
  ) {
    var enumValue = this._valueLookup.get(value);

    if (enumValue) {
      return enumValue.name;
    }
  };

  _proto5.parseValue = function parseValue(value)
  /* T */
  {
    if (typeof value === 'string') {
      var enumValue = this.getValue(value);

      if (enumValue) {
        return enumValue.value;
      }
    }
  };

  _proto5.parseLiteral = function parseLiteral(valueNode, _variables)
  /* T */
  {
    // Note: variables will be resolved to a value before calling this function.
    if (valueNode.kind === _kinds.Kind.ENUM) {
      var enumValue = this.getValue(valueNode.value);

      if (enumValue) {
        return enumValue.value;
      }
    }
  };

  _proto5.toString = function toString() {
    return this.name;
  };

  return GraphQLEnumType;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLEnumType = GraphQLEnumType;
(0, _defineToStringTag.default)(GraphQLEnumType);
(0, _defineToJSON.default)(GraphQLEnumType);

function defineEnumValues(type, valueMap
/* <T> */
) {
  !isPlainObj(valueMap) ? (0, _invariant.default)(0, "".concat(type.name, " values must be an object with value names as keys.")) : void 0;
  return Object.keys(valueMap).map(function (valueName) {
    var value = valueMap[valueName];
    !isPlainObj(value) ? (0, _invariant.default)(0, "".concat(type.name, ".").concat(valueName, " must refer to an object with a \"value\" key ") + "representing an internal value but got: ".concat((0, _inspect.default)(value), ".")) : void 0;
    !!value.hasOwnProperty('isDeprecated') ? (0, _invariant.default)(0, "".concat(type.name, ".").concat(valueName, " should provide \"deprecationReason\" instead ") + 'of "isDeprecated".') : void 0;
    return {
      name: valueName,
      description: value.description,
      isDeprecated: Boolean(value.deprecationReason),
      deprecationReason: value.deprecationReason,
      astNode: value.astNode,
      value: value.hasOwnProperty('value') ? value.value : valueName
    };
  });
}

/**
 * Input Object Type Definition
 *
 * An input object defines a structured collection of fields which may be
 * supplied to a field argument.
 *
 * Using `NonNull` will ensure that a value must be provided by the query
 *
 * Example:
 *
 *     const GeoPoint = new GraphQLInputObjectType({
 *       name: 'GeoPoint',
 *       fields: {
 *         lat: { type: GraphQLNonNull(GraphQLFloat) },
 *         lon: { type: GraphQLNonNull(GraphQLFloat) },
 *         alt: { type: GraphQLFloat, defaultValue: 0 },
 *       }
 *     });
 *
 */
var GraphQLInputObjectType =
/*#__PURE__*/
function () {
  function GraphQLInputObjectType(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    _defineProperty(this, "_fields", void 0);

    this.name = config.name;
    this.description = config.description;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this._fields = defineInputFieldMap.bind(undefined, config);
    !(typeof config.name === 'string') ? (0, _invariant.default)(0, 'Must provide name.') : void 0;
  }

  var _proto6 = GraphQLInputObjectType.prototype;

  _proto6.getFields = function getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  };

  _proto6.toString = function toString() {
    return this.name;
  };

  return GraphQLInputObjectType;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLInputObjectType = GraphQLInputObjectType;
(0, _defineToStringTag.default)(GraphQLInputObjectType);
(0, _defineToJSON.default)(GraphQLInputObjectType);

function defineInputFieldMap(config) {
  var fieldMap = resolveThunk(config.fields) || {};
  !isPlainObj(fieldMap) ? (0, _invariant.default)(0, "".concat(config.name, " fields must be an object with field names as keys or a ") + 'function which returns such an object.') : void 0;
  var resultFieldMap = Object.create(null);

  var _arr2 = Object.keys(fieldMap);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var fieldName = _arr2[_i2];

    var field = _objectSpread({}, fieldMap[fieldName], {
      name: fieldName
    });

    !!field.hasOwnProperty('resolve') ? (0, _invariant.default)(0, "".concat(config.name, ".").concat(fieldName, " field has a resolve property, but ") + 'Input Types cannot define resolvers.') : void 0;
    resultFieldMap[fieldName] = field;
  }

  return resultFieldMap;
}

function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === undefined;
}
},{"../jsutils/defineToJSON":14,"../jsutils/defineToStringTag":15,"../jsutils/inspect":17,"../jsutils/instanceOf":18,"../jsutils/invariant":19,"../jsutils/keyMap":25,"../language/kinds":37,"../utilities/valueFromASTUntyped":78}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = isDirective;
exports.isSpecifiedDirective = isSpecifiedDirective;
exports.specifiedDirectives = exports.GraphQLDeprecatedDirective = exports.DEFAULT_DEPRECATION_REASON = exports.GraphQLSkipDirective = exports.GraphQLIncludeDirective = exports.GraphQLDirective = void 0;

var _definition = require("./definition");

var _scalars = require("./scalars");

var _defineToStringTag = _interopRequireDefault(require("../jsutils/defineToStringTag"));

var _defineToJSON = _interopRequireDefault(require("../jsutils/defineToJSON"));

var _instanceOf = _interopRequireDefault(require("../jsutils/instanceOf"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _directiveLocation = require("../language/directiveLocation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line no-redeclare
function isDirective(directive) {
  return (0, _instanceOf.default)(directive, GraphQLDirective);
}
/**
 * Directives are used by the GraphQL runtime as a way of modifying execution
 * behavior. Type system creators will usually not create these directly.
 */


var GraphQLDirective =
/*#__PURE__*/
function () {
  function GraphQLDirective(config) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "locations", void 0);

    _defineProperty(this, "args", void 0);

    _defineProperty(this, "astNode", void 0);

    this.name = config.name;
    this.description = config.description;
    this.locations = config.locations;
    this.astNode = config.astNode;
    !config.name ? (0, _invariant.default)(0, 'Directive must be named.') : void 0;
    !Array.isArray(config.locations) ? (0, _invariant.default)(0, 'Must provide locations for directive.') : void 0;
    var args = config.args;

    if (!args) {
      this.args = [];
    } else {
      !!Array.isArray(args) ? (0, _invariant.default)(0, "@".concat(config.name, " args must be an object with argument names as keys.")) : void 0;
      this.args = Object.keys(args).map(function (argName) {
        var arg = args[argName];
        return {
          name: argName,
          description: arg.description === undefined ? null : arg.description,
          type: arg.type,
          defaultValue: arg.defaultValue,
          astNode: arg.astNode
        };
      });
    }
  }

  var _proto = GraphQLDirective.prototype;

  _proto.toString = function toString() {
    return '@' + this.name;
  };

  return GraphQLDirective;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLDirective = GraphQLDirective;
(0, _defineToStringTag.default)(GraphQLDirective);
(0, _defineToJSON.default)(GraphQLDirective);

/**
 * Used to conditionally include fields or fragments.
 */
var GraphQLIncludeDirective = new GraphQLDirective({
  name: 'include',
  description: 'Directs the executor to include this field or fragment only when ' + 'the `if` argument is true.',
  locations: [_directiveLocation.DirectiveLocation.FIELD, _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD, _directiveLocation.DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLBoolean),
      description: 'Included when true.'
    }
  }
});
/**
 * Used to conditionally skip (exclude) fields or fragments.
 */

exports.GraphQLIncludeDirective = GraphQLIncludeDirective;
var GraphQLSkipDirective = new GraphQLDirective({
  name: 'skip',
  description: 'Directs the executor to skip this field or fragment when the `if` ' + 'argument is true.',
  locations: [_directiveLocation.DirectiveLocation.FIELD, _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD, _directiveLocation.DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLBoolean),
      description: 'Skipped when true.'
    }
  }
});
/**
 * Constant string used for default reason for a deprecation.
 */

exports.GraphQLSkipDirective = GraphQLSkipDirective;
var DEFAULT_DEPRECATION_REASON = 'No longer supported';
/**
 * Used to declare element of a GraphQL schema as deprecated.
 */

exports.DEFAULT_DEPRECATION_REASON = DEFAULT_DEPRECATION_REASON;
var GraphQLDeprecatedDirective = new GraphQLDirective({
  name: 'deprecated',
  description: 'Marks an element of a GraphQL schema as no longer supported.',
  locations: [_directiveLocation.DirectiveLocation.FIELD_DEFINITION, _directiveLocation.DirectiveLocation.ENUM_VALUE],
  args: {
    reason: {
      type: _scalars.GraphQLString,
      description: 'Explains why this element was deprecated, usually also including a ' + 'suggestion for how to access supported similar data. Formatted using ' + 'the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).',
      defaultValue: DEFAULT_DEPRECATION_REASON
    }
  }
});
/**
 * The full list of specified directives.
 */

exports.GraphQLDeprecatedDirective = GraphQLDeprecatedDirective;
var specifiedDirectives = [GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective];
exports.specifiedDirectives = specifiedDirectives;

function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(function (specifiedDirective) {
    return specifiedDirective.name === directive.name;
  });
}
},{"../jsutils/defineToJSON":14,"../jsutils/defineToStringTag":15,"../jsutils/instanceOf":18,"../jsutils/invariant":19,"../language/directiveLocation":35,"./definition":48,"./scalars":52}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isSchema", {
  enumerable: true,
  get: function get() {
    return _schema.isSchema;
  }
});
Object.defineProperty(exports, "GraphQLSchema", {
  enumerable: true,
  get: function get() {
    return _schema.GraphQLSchema;
  }
});
Object.defineProperty(exports, "isType", {
  enumerable: true,
  get: function get() {
    return _definition.isType;
  }
});
Object.defineProperty(exports, "isScalarType", {
  enumerable: true,
  get: function get() {
    return _definition.isScalarType;
  }
});
Object.defineProperty(exports, "isObjectType", {
  enumerable: true,
  get: function get() {
    return _definition.isObjectType;
  }
});
Object.defineProperty(exports, "isInterfaceType", {
  enumerable: true,
  get: function get() {
    return _definition.isInterfaceType;
  }
});
Object.defineProperty(exports, "isUnionType", {
  enumerable: true,
  get: function get() {
    return _definition.isUnionType;
  }
});
Object.defineProperty(exports, "isEnumType", {
  enumerable: true,
  get: function get() {
    return _definition.isEnumType;
  }
});
Object.defineProperty(exports, "isInputObjectType", {
  enumerable: true,
  get: function get() {
    return _definition.isInputObjectType;
  }
});
Object.defineProperty(exports, "isListType", {
  enumerable: true,
  get: function get() {
    return _definition.isListType;
  }
});
Object.defineProperty(exports, "isNonNullType", {
  enumerable: true,
  get: function get() {
    return _definition.isNonNullType;
  }
});
Object.defineProperty(exports, "isInputType", {
  enumerable: true,
  get: function get() {
    return _definition.isInputType;
  }
});
Object.defineProperty(exports, "isOutputType", {
  enumerable: true,
  get: function get() {
    return _definition.isOutputType;
  }
});
Object.defineProperty(exports, "isLeafType", {
  enumerable: true,
  get: function get() {
    return _definition.isLeafType;
  }
});
Object.defineProperty(exports, "isCompositeType", {
  enumerable: true,
  get: function get() {
    return _definition.isCompositeType;
  }
});
Object.defineProperty(exports, "isAbstractType", {
  enumerable: true,
  get: function get() {
    return _definition.isAbstractType;
  }
});
Object.defineProperty(exports, "isWrappingType", {
  enumerable: true,
  get: function get() {
    return _definition.isWrappingType;
  }
});
Object.defineProperty(exports, "isNullableType", {
  enumerable: true,
  get: function get() {
    return _definition.isNullableType;
  }
});
Object.defineProperty(exports, "isNamedType", {
  enumerable: true,
  get: function get() {
    return _definition.isNamedType;
  }
});
Object.defineProperty(exports, "isRequiredArgument", {
  enumerable: true,
  get: function get() {
    return _definition.isRequiredArgument;
  }
});
Object.defineProperty(exports, "isRequiredInputField", {
  enumerable: true,
  get: function get() {
    return _definition.isRequiredInputField;
  }
});
Object.defineProperty(exports, "assertType", {
  enumerable: true,
  get: function get() {
    return _definition.assertType;
  }
});
Object.defineProperty(exports, "assertScalarType", {
  enumerable: true,
  get: function get() {
    return _definition.assertScalarType;
  }
});
Object.defineProperty(exports, "assertObjectType", {
  enumerable: true,
  get: function get() {
    return _definition.assertObjectType;
  }
});
Object.defineProperty(exports, "assertInterfaceType", {
  enumerable: true,
  get: function get() {
    return _definition.assertInterfaceType;
  }
});
Object.defineProperty(exports, "assertUnionType", {
  enumerable: true,
  get: function get() {
    return _definition.assertUnionType;
  }
});
Object.defineProperty(exports, "assertEnumType", {
  enumerable: true,
  get: function get() {
    return _definition.assertEnumType;
  }
});
Object.defineProperty(exports, "assertInputObjectType", {
  enumerable: true,
  get: function get() {
    return _definition.assertInputObjectType;
  }
});
Object.defineProperty(exports, "assertListType", {
  enumerable: true,
  get: function get() {
    return _definition.assertListType;
  }
});
Object.defineProperty(exports, "assertNonNullType", {
  enumerable: true,
  get: function get() {
    return _definition.assertNonNullType;
  }
});
Object.defineProperty(exports, "assertInputType", {
  enumerable: true,
  get: function get() {
    return _definition.assertInputType;
  }
});
Object.defineProperty(exports, "assertOutputType", {
  enumerable: true,
  get: function get() {
    return _definition.assertOutputType;
  }
});
Object.defineProperty(exports, "assertLeafType", {
  enumerable: true,
  get: function get() {
    return _definition.assertLeafType;
  }
});
Object.defineProperty(exports, "assertCompositeType", {
  enumerable: true,
  get: function get() {
    return _definition.assertCompositeType;
  }
});
Object.defineProperty(exports, "assertAbstractType", {
  enumerable: true,
  get: function get() {
    return _definition.assertAbstractType;
  }
});
Object.defineProperty(exports, "assertWrappingType", {
  enumerable: true,
  get: function get() {
    return _definition.assertWrappingType;
  }
});
Object.defineProperty(exports, "assertNullableType", {
  enumerable: true,
  get: function get() {
    return _definition.assertNullableType;
  }
});
Object.defineProperty(exports, "assertNamedType", {
  enumerable: true,
  get: function get() {
    return _definition.assertNamedType;
  }
});
Object.defineProperty(exports, "getNullableType", {
  enumerable: true,
  get: function get() {
    return _definition.getNullableType;
  }
});
Object.defineProperty(exports, "getNamedType", {
  enumerable: true,
  get: function get() {
    return _definition.getNamedType;
  }
});
Object.defineProperty(exports, "GraphQLScalarType", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLScalarType;
  }
});
Object.defineProperty(exports, "GraphQLObjectType", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLObjectType;
  }
});
Object.defineProperty(exports, "GraphQLInterfaceType", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLInterfaceType;
  }
});
Object.defineProperty(exports, "GraphQLUnionType", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLUnionType;
  }
});
Object.defineProperty(exports, "GraphQLEnumType", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLEnumType;
  }
});
Object.defineProperty(exports, "GraphQLInputObjectType", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLInputObjectType;
  }
});
Object.defineProperty(exports, "GraphQLList", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLList;
  }
});
Object.defineProperty(exports, "GraphQLNonNull", {
  enumerable: true,
  get: function get() {
    return _definition.GraphQLNonNull;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function get() {
    return _directives.isDirective;
  }
});
Object.defineProperty(exports, "GraphQLDirective", {
  enumerable: true,
  get: function get() {
    return _directives.GraphQLDirective;
  }
});
Object.defineProperty(exports, "isSpecifiedDirective", {
  enumerable: true,
  get: function get() {
    return _directives.isSpecifiedDirective;
  }
});
Object.defineProperty(exports, "specifiedDirectives", {
  enumerable: true,
  get: function get() {
    return _directives.specifiedDirectives;
  }
});
Object.defineProperty(exports, "GraphQLIncludeDirective", {
  enumerable: true,
  get: function get() {
    return _directives.GraphQLIncludeDirective;
  }
});
Object.defineProperty(exports, "GraphQLSkipDirective", {
  enumerable: true,
  get: function get() {
    return _directives.GraphQLSkipDirective;
  }
});
Object.defineProperty(exports, "GraphQLDeprecatedDirective", {
  enumerable: true,
  get: function get() {
    return _directives.GraphQLDeprecatedDirective;
  }
});
Object.defineProperty(exports, "DEFAULT_DEPRECATION_REASON", {
  enumerable: true,
  get: function get() {
    return _directives.DEFAULT_DEPRECATION_REASON;
  }
});
Object.defineProperty(exports, "isSpecifiedScalarType", {
  enumerable: true,
  get: function get() {
    return _scalars.isSpecifiedScalarType;
  }
});
Object.defineProperty(exports, "specifiedScalarTypes", {
  enumerable: true,
  get: function get() {
    return _scalars.specifiedScalarTypes;
  }
});
Object.defineProperty(exports, "GraphQLInt", {
  enumerable: true,
  get: function get() {
    return _scalars.GraphQLInt;
  }
});
Object.defineProperty(exports, "GraphQLFloat", {
  enumerable: true,
  get: function get() {
    return _scalars.GraphQLFloat;
  }
});
Object.defineProperty(exports, "GraphQLString", {
  enumerable: true,
  get: function get() {
    return _scalars.GraphQLString;
  }
});
Object.defineProperty(exports, "GraphQLBoolean", {
  enumerable: true,
  get: function get() {
    return _scalars.GraphQLBoolean;
  }
});
Object.defineProperty(exports, "GraphQLID", {
  enumerable: true,
  get: function get() {
    return _scalars.GraphQLID;
  }
});
Object.defineProperty(exports, "TypeKind", {
  enumerable: true,
  get: function get() {
    return _introspection.TypeKind;
  }
});
Object.defineProperty(exports, "isIntrospectionType", {
  enumerable: true,
  get: function get() {
    return _introspection.isIntrospectionType;
  }
});
Object.defineProperty(exports, "introspectionTypes", {
  enumerable: true,
  get: function get() {
    return _introspection.introspectionTypes;
  }
});
Object.defineProperty(exports, "__Schema", {
  enumerable: true,
  get: function get() {
    return _introspection.__Schema;
  }
});
Object.defineProperty(exports, "__Directive", {
  enumerable: true,
  get: function get() {
    return _introspection.__Directive;
  }
});
Object.defineProperty(exports, "__DirectiveLocation", {
  enumerable: true,
  get: function get() {
    return _introspection.__DirectiveLocation;
  }
});
Object.defineProperty(exports, "__Type", {
  enumerable: true,
  get: function get() {
    return _introspection.__Type;
  }
});
Object.defineProperty(exports, "__Field", {
  enumerable: true,
  get: function get() {
    return _introspection.__Field;
  }
});
Object.defineProperty(exports, "__InputValue", {
  enumerable: true,
  get: function get() {
    return _introspection.__InputValue;
  }
});
Object.defineProperty(exports, "__EnumValue", {
  enumerable: true,
  get: function get() {
    return _introspection.__EnumValue;
  }
});
Object.defineProperty(exports, "__TypeKind", {
  enumerable: true,
  get: function get() {
    return _introspection.__TypeKind;
  }
});
Object.defineProperty(exports, "SchemaMetaFieldDef", {
  enumerable: true,
  get: function get() {
    return _introspection.SchemaMetaFieldDef;
  }
});
Object.defineProperty(exports, "TypeMetaFieldDef", {
  enumerable: true,
  get: function get() {
    return _introspection.TypeMetaFieldDef;
  }
});
Object.defineProperty(exports, "TypeNameMetaFieldDef", {
  enumerable: true,
  get: function get() {
    return _introspection.TypeNameMetaFieldDef;
  }
});
Object.defineProperty(exports, "validateSchema", {
  enumerable: true,
  get: function get() {
    return _validate.validateSchema;
  }
});
Object.defineProperty(exports, "assertValidSchema", {
  enumerable: true,
  get: function get() {
    return _validate.assertValidSchema;
  }
});

var _schema = require("./schema");

var _definition = require("./definition");

var _directives = require("./directives");

var _scalars = require("./scalars");

var _introspection = require("./introspection");

var _validate = require("./validate");
},{"./definition":48,"./directives":49,"./introspection":51,"./scalars":52,"./schema":53,"./validate":54}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIntrospectionType = isIntrospectionType;
exports.introspectionTypes = exports.TypeNameMetaFieldDef = exports.TypeMetaFieldDef = exports.SchemaMetaFieldDef = exports.__TypeKind = exports.TypeKind = exports.__EnumValue = exports.__InputValue = exports.__Field = exports.__Type = exports.__DirectiveLocation = exports.__Directive = exports.__Schema = void 0;

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _astFromValue = require("../utilities/astFromValue");

var _printer = require("../language/printer");

var _definition = require("./definition");

var _scalars = require("./scalars");

var _directiveLocation = require("../language/directiveLocation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
var __Schema = new _definition.GraphQLObjectType({
  name: '__Schema',
  description: 'A GraphQL Schema defines the capabilities of a GraphQL server. It ' + 'exposes all available types and directives on the server, as well as ' + 'the entry points for query, mutation, and subscription operations.',
  fields: function fields() {
    return {
      types: {
        description: 'A list of all types supported by this server.',
        type: (0, _definition.GraphQLNonNull)((0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__Type))),
        resolve: function resolve(schema) {
          return (0, _objectValues.default)(schema.getTypeMap());
        }
      },
      queryType: {
        description: 'The type that query operations will be rooted at.',
        type: (0, _definition.GraphQLNonNull)(__Type),
        resolve: function resolve(schema) {
          return schema.getQueryType();
        }
      },
      mutationType: {
        description: 'If this server supports mutation, the type that ' + 'mutation operations will be rooted at.',
        type: __Type,
        resolve: function resolve(schema) {
          return schema.getMutationType();
        }
      },
      subscriptionType: {
        description: 'If this server support subscription, the type that ' + 'subscription operations will be rooted at.',
        type: __Type,
        resolve: function resolve(schema) {
          return schema.getSubscriptionType();
        }
      },
      directives: {
        description: 'A list of all directives supported by this server.',
        type: (0, _definition.GraphQLNonNull)((0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__Directive))),
        resolve: function resolve(schema) {
          return schema.getDirectives();
        }
      }
    };
  }
});

exports.__Schema = __Schema;

var __Directive = new _definition.GraphQLObjectType({
  name: '__Directive',
  description: 'A Directive provides a way to describe alternate runtime execution and ' + 'type validation behavior in a GraphQL document.' + "\n\nIn some cases, you need to provide options to alter GraphQL's " + 'execution behavior in ways field arguments will not suffice, such as ' + 'conditionally including or skipping a field. Directives provide this by ' + 'describing additional information to the executor.',
  fields: function fields() {
    return {
      name: {
        type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLString),
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.description;
        }
      },
      locations: {
        type: (0, _definition.GraphQLNonNull)((0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__DirectiveLocation))),
        resolve: function resolve(obj) {
          return obj.locations;
        }
      },
      args: {
        type: (0, _definition.GraphQLNonNull)((0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__InputValue))),
        resolve: function resolve(directive) {
          return directive.args || [];
        }
      }
    };
  }
});

exports.__Directive = __Directive;

var __DirectiveLocation = new _definition.GraphQLEnumType({
  name: '__DirectiveLocation',
  description: 'A Directive can be adjacent to many parts of the GraphQL language, a ' + '__DirectiveLocation describes one such possible adjacencies.',
  values: {
    QUERY: {
      value: _directiveLocation.DirectiveLocation.QUERY,
      description: 'Location adjacent to a query operation.'
    },
    MUTATION: {
      value: _directiveLocation.DirectiveLocation.MUTATION,
      description: 'Location adjacent to a mutation operation.'
    },
    SUBSCRIPTION: {
      value: _directiveLocation.DirectiveLocation.SUBSCRIPTION,
      description: 'Location adjacent to a subscription operation.'
    },
    FIELD: {
      value: _directiveLocation.DirectiveLocation.FIELD,
      description: 'Location adjacent to a field.'
    },
    FRAGMENT_DEFINITION: {
      value: _directiveLocation.DirectiveLocation.FRAGMENT_DEFINITION,
      description: 'Location adjacent to a fragment definition.'
    },
    FRAGMENT_SPREAD: {
      value: _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD,
      description: 'Location adjacent to a fragment spread.'
    },
    INLINE_FRAGMENT: {
      value: _directiveLocation.DirectiveLocation.INLINE_FRAGMENT,
      description: 'Location adjacent to an inline fragment.'
    },
    VARIABLE_DEFINITION: {
      value: _directiveLocation.DirectiveLocation.VARIABLE_DEFINITION,
      description: 'Location adjacent to a variable definition.'
    },
    SCHEMA: {
      value: _directiveLocation.DirectiveLocation.SCHEMA,
      description: 'Location adjacent to a schema definition.'
    },
    SCALAR: {
      value: _directiveLocation.DirectiveLocation.SCALAR,
      description: 'Location adjacent to a scalar definition.'
    },
    OBJECT: {
      value: _directiveLocation.DirectiveLocation.OBJECT,
      description: 'Location adjacent to an object type definition.'
    },
    FIELD_DEFINITION: {
      value: _directiveLocation.DirectiveLocation.FIELD_DEFINITION,
      description: 'Location adjacent to a field definition.'
    },
    ARGUMENT_DEFINITION: {
      value: _directiveLocation.DirectiveLocation.ARGUMENT_DEFINITION,
      description: 'Location adjacent to an argument definition.'
    },
    INTERFACE: {
      value: _directiveLocation.DirectiveLocation.INTERFACE,
      description: 'Location adjacent to an interface definition.'
    },
    UNION: {
      value: _directiveLocation.DirectiveLocation.UNION,
      description: 'Location adjacent to a union definition.'
    },
    ENUM: {
      value: _directiveLocation.DirectiveLocation.ENUM,
      description: 'Location adjacent to an enum definition.'
    },
    ENUM_VALUE: {
      value: _directiveLocation.DirectiveLocation.ENUM_VALUE,
      description: 'Location adjacent to an enum value definition.'
    },
    INPUT_OBJECT: {
      value: _directiveLocation.DirectiveLocation.INPUT_OBJECT,
      description: 'Location adjacent to an input object type definition.'
    },
    INPUT_FIELD_DEFINITION: {
      value: _directiveLocation.DirectiveLocation.INPUT_FIELD_DEFINITION,
      description: 'Location adjacent to an input object field definition.'
    }
  }
});

exports.__DirectiveLocation = __DirectiveLocation;

var __Type = new _definition.GraphQLObjectType({
  name: '__Type',
  description: 'The fundamental unit of any GraphQL Schema is the type. There are ' + 'many kinds of types in GraphQL as represented by the `__TypeKind` enum.' + '\n\nDepending on the kind of a type, certain fields describe ' + 'information about that type. Scalar types provide no information ' + 'beyond a name and description, while Enum types provide their values. ' + 'Object and Interface types provide the fields they describe. Abstract ' + 'types, Union and Interface, provide the Object types possible ' + 'at runtime. List and NonNull types compose other types.',
  fields: function fields() {
    return {
      kind: {
        type: (0, _definition.GraphQLNonNull)(__TypeKind),
        resolve: function resolve(type) {
          if ((0, _definition.isScalarType)(type)) {
            return TypeKind.SCALAR;
          } else if ((0, _definition.isObjectType)(type)) {
            return TypeKind.OBJECT;
          } else if ((0, _definition.isInterfaceType)(type)) {
            return TypeKind.INTERFACE;
          } else if ((0, _definition.isUnionType)(type)) {
            return TypeKind.UNION;
          } else if ((0, _definition.isEnumType)(type)) {
            return TypeKind.ENUM;
          } else if ((0, _definition.isInputObjectType)(type)) {
            return TypeKind.INPUT_OBJECT;
          } else if ((0, _definition.isListType)(type)) {
            return TypeKind.LIST;
          } else if ((0, _definition.isNonNullType)(type)) {
            return TypeKind.NON_NULL;
          }

          throw new Error('Unknown kind of type: ' + type);
        }
      },
      name: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.description;
        }
      },
      fields: {
        type: (0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__Field)),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve(type, _ref) {
          var includeDeprecated = _ref.includeDeprecated;

          if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type)) {
            var fields = (0, _objectValues.default)(type.getFields());

            if (!includeDeprecated) {
              fields = fields.filter(function (field) {
                return !field.deprecationReason;
              });
            }

            return fields;
          }

          return null;
        }
      },
      interfaces: {
        type: (0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__Type)),
        resolve: function resolve(type) {
          if ((0, _definition.isObjectType)(type)) {
            return type.getInterfaces();
          }
        }
      },
      possibleTypes: {
        type: (0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__Type)),
        resolve: function resolve(type, args, context, _ref2) {
          var schema = _ref2.schema;

          if ((0, _definition.isAbstractType)(type)) {
            return schema.getPossibleTypes(type);
          }
        }
      },
      enumValues: {
        type: (0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__EnumValue)),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve(type, _ref3) {
          var includeDeprecated = _ref3.includeDeprecated;

          if ((0, _definition.isEnumType)(type)) {
            var values = type.getValues();

            if (!includeDeprecated) {
              values = values.filter(function (value) {
                return !value.deprecationReason;
              });
            }

            return values;
          }
        }
      },
      inputFields: {
        type: (0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__InputValue)),
        resolve: function resolve(type) {
          if ((0, _definition.isInputObjectType)(type)) {
            return (0, _objectValues.default)(type.getFields());
          }
        }
      },
      ofType: {
        type: __Type,
        resolve: function resolve(obj) {
          return obj.ofType;
        }
      }
    };
  }
});

exports.__Type = __Type;

var __Field = new _definition.GraphQLObjectType({
  name: '__Field',
  description: 'Object and Interface types are described by a list of Fields, each of ' + 'which has a name, potentially a list of arguments, and a return type.',
  fields: function fields() {
    return {
      name: {
        type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLString),
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.description;
        }
      },
      args: {
        type: (0, _definition.GraphQLNonNull)((0, _definition.GraphQLList)((0, _definition.GraphQLNonNull)(__InputValue))),
        resolve: function resolve(field) {
          return field.args || [];
        }
      },
      type: {
        type: (0, _definition.GraphQLNonNull)(__Type),
        resolve: function resolve(obj) {
          return obj.type;
        }
      },
      isDeprecated: {
        type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLBoolean),
        resolve: function resolve(obj) {
          return obj.isDeprecated;
        }
      },
      deprecationReason: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.deprecationReason;
        }
      }
    };
  }
});

exports.__Field = __Field;

var __InputValue = new _definition.GraphQLObjectType({
  name: '__InputValue',
  description: 'Arguments provided to Fields or Directives and the input fields of an ' + 'InputObject are represented as Input Values which describe their type ' + 'and optionally a default value.',
  fields: function fields() {
    return {
      name: {
        type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLString),
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.description;
        }
      },
      type: {
        type: (0, _definition.GraphQLNonNull)(__Type),
        resolve: function resolve(obj) {
          return obj.type;
        }
      },
      defaultValue: {
        type: _scalars.GraphQLString,
        description: 'A GraphQL-formatted string representing the default value for this ' + 'input value.',
        resolve: function resolve(inputVal) {
          return (0, _isInvalid.default)(inputVal.defaultValue) ? null : (0, _printer.print)((0, _astFromValue.astFromValue)(inputVal.defaultValue, inputVal.type));
        }
      }
    };
  }
});

exports.__InputValue = __InputValue;

var __EnumValue = new _definition.GraphQLObjectType({
  name: '__EnumValue',
  description: 'One possible value for a given Enum. Enum values are unique values, not ' + 'a placeholder for a string or numeric value. However an Enum value is ' + 'returned in a JSON response as a string.',
  fields: function fields() {
    return {
      name: {
        type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLString),
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.description;
        }
      },
      isDeprecated: {
        type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLBoolean),
        resolve: function resolve(obj) {
          return obj.isDeprecated;
        }
      },
      deprecationReason: {
        type: _scalars.GraphQLString,
        resolve: function resolve(obj) {
          return obj.deprecationReason;
        }
      }
    };
  }
});

exports.__EnumValue = __EnumValue;
var TypeKind = {
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  INPUT_OBJECT: 'INPUT_OBJECT',
  LIST: 'LIST',
  NON_NULL: 'NON_NULL'
};
exports.TypeKind = TypeKind;

var __TypeKind = new _definition.GraphQLEnumType({
  name: '__TypeKind',
  description: 'An enum describing what kind of type a given `__Type` is.',
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: 'Indicates this type is a scalar.'
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description: 'Indicates this type is an object. ' + '`fields` and `interfaces` are valid fields.'
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description: 'Indicates this type is an interface. ' + '`fields` and `possibleTypes` are valid fields.'
    },
    UNION: {
      value: TypeKind.UNION,
      description: 'Indicates this type is a union. `possibleTypes` is a valid field.'
    },
    ENUM: {
      value: TypeKind.ENUM,
      description: 'Indicates this type is an enum. `enumValues` is a valid field.'
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description: 'Indicates this type is an input object. ' + '`inputFields` is a valid field.'
    },
    LIST: {
      value: TypeKind.LIST,
      description: 'Indicates this type is a list. `ofType` is a valid field.'
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description: 'Indicates this type is a non-null. `ofType` is a valid field.'
    }
  }
});
/**
 * Note that these are GraphQLField and not GraphQLFieldConfig,
 * so the format for args is different.
 */


exports.__TypeKind = __TypeKind;
var SchemaMetaFieldDef = {
  name: '__schema',
  type: (0, _definition.GraphQLNonNull)(__Schema),
  description: 'Access the current type schema of this server.',
  args: [],
  resolve: function resolve(source, args, context, _ref4) {
    var schema = _ref4.schema;
    return schema;
  }
};
exports.SchemaMetaFieldDef = SchemaMetaFieldDef;
var TypeMetaFieldDef = {
  name: '__type',
  type: __Type,
  description: 'Request the type information of a single type.',
  args: [{
    name: 'name',
    type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLString)
  }],
  resolve: function resolve(source, _ref5, context, _ref6) {
    var name = _ref5.name;
    var schema = _ref6.schema;
    return schema.getType(name);
  }
};
exports.TypeMetaFieldDef = TypeMetaFieldDef;
var TypeNameMetaFieldDef = {
  name: '__typename',
  type: (0, _definition.GraphQLNonNull)(_scalars.GraphQLString),
  description: 'The name of the current Object type at runtime.',
  args: [],
  resolve: function resolve(source, args, context, _ref7) {
    var parentType = _ref7.parentType;
    return parentType.name;
  }
};
exports.TypeNameMetaFieldDef = TypeNameMetaFieldDef;
var introspectionTypes = [__Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, __TypeKind];
exports.introspectionTypes = introspectionTypes;

function isIntrospectionType(type) {
  return (0, _definition.isNamedType)(type) && ( // Would prefer to use introspectionTypes.some(), however %checks needs
  // a simple expression.
  type.name === __Schema.name || type.name === __Directive.name || type.name === __DirectiveLocation.name || type.name === __Type.name || type.name === __Field.name || type.name === __InputValue.name || type.name === __EnumValue.name || type.name === __TypeKind.name);
}
},{"../jsutils/isInvalid":22,"../jsutils/objectValues":28,"../language/directiveLocation":35,"../language/printer":42,"../utilities/astFromValue":57,"./definition":48,"./scalars":52}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSpecifiedScalarType = isSpecifiedScalarType;
exports.specifiedScalarTypes = exports.GraphQLID = exports.GraphQLBoolean = exports.GraphQLString = exports.GraphQLFloat = exports.GraphQLInt = void 0;

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _isFinite = _interopRequireDefault(require("../jsutils/isFinite"));

var _isInteger = _interopRequireDefault(require("../jsutils/isInteger"));

var _definition = require("./definition");

var _kinds = require("../language/kinds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
// As per the GraphQL Spec, Integers are only treated as valid when a valid
// 32-bit signed integer, providing the broadest support across platforms.
//
// n.b. JavaScript's integers are safe between -(2^53 - 1) and 2^53 - 1 because
// they are internally represented as IEEE 754 doubles.
var MAX_INT = 2147483647;
var MIN_INT = -2147483648;

function serializeInt(value) {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }

  var num = value;

  if (typeof value === 'string' && value !== '') {
    num = Number(value);
  }

  if (!(0, _isInteger.default)(num)) {
    throw new TypeError("Int cannot represent non-integer value: ".concat((0, _inspect.default)(value)));
  }

  if (num > MAX_INT || num < MIN_INT) {
    throw new TypeError("Int cannot represent non 32-bit signed integer value: ".concat((0, _inspect.default)(value)));
  }

  return num;
}

function coerceInt(value) {
  if (!(0, _isInteger.default)(value)) {
    throw new TypeError("Int cannot represent non-integer value: ".concat((0, _inspect.default)(value)));
  }

  if (value > MAX_INT || value < MIN_INT) {
    throw new TypeError("Int cannot represent non 32-bit signed integer value: ".concat((0, _inspect.default)(value)));
  }

  return value;
}

var GraphQLInt = new _definition.GraphQLScalarType({
  name: 'Int',
  description: 'The `Int` scalar type represents non-fractional signed whole numeric ' + 'values. Int can represent values between -(2^31) and 2^31 - 1. ',
  serialize: serializeInt,
  parseValue: coerceInt,
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind === _kinds.Kind.INT) {
      var num = parseInt(ast.value, 10);

      if (num <= MAX_INT && num >= MIN_INT) {
        return num;
      }
    }

    return undefined;
  }
});
exports.GraphQLInt = GraphQLInt;

function serializeFloat(value) {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }

  var num = value;

  if (typeof value === 'string' && value !== '') {
    num = Number(value);
  }

  if (!(0, _isFinite.default)(num)) {
    throw new TypeError("Float cannot represent non numeric value: ".concat((0, _inspect.default)(value)));
  }

  return num;
}

function coerceFloat(value) {
  if (!(0, _isFinite.default)(value)) {
    throw new TypeError("Float cannot represent non numeric value: ".concat((0, _inspect.default)(value)));
  }

  return value;
}

var GraphQLFloat = new _definition.GraphQLScalarType({
  name: 'Float',
  description: 'The `Float` scalar type represents signed double-precision fractional ' + 'values as specified by ' + '[IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). ',
  serialize: serializeFloat,
  parseValue: coerceFloat,
  parseLiteral: function parseLiteral(ast) {
    return ast.kind === _kinds.Kind.FLOAT || ast.kind === _kinds.Kind.INT ? parseFloat(ast.value) : undefined;
  }
});
exports.GraphQLFloat = GraphQLFloat;

function serializeString(value) {
  // Support serializing objects with custom valueOf() functions - a common way
  // to represent an complex value which can be represented as a string
  // (ex: MongoDB id objects).
  var result = value && typeof value.valueOf === 'function' ? value.valueOf() : value; // Serialize string, boolean and number values to a string, but do not
  // attempt to coerce object, function, symbol, or other types as strings.

  if (typeof result === 'string') {
    return result;
  }

  if (typeof result === 'boolean') {
    return result ? 'true' : 'false';
  }

  if ((0, _isFinite.default)(result)) {
    return result.toString();
  }

  throw new TypeError("String cannot represent value: ".concat((0, _inspect.default)(value)));
}

function coerceString(value) {
  if (typeof value !== 'string') {
    throw new TypeError("String cannot represent a non string value: ".concat((0, _inspect.default)(value)));
  }

  return value;
}

var GraphQLString = new _definition.GraphQLScalarType({
  name: 'String',
  description: 'The `String` scalar type represents textual data, represented as UTF-8 ' + 'character sequences. The String type is most often used by GraphQL to ' + 'represent free-form human-readable text.',
  serialize: serializeString,
  parseValue: coerceString,
  parseLiteral: function parseLiteral(ast) {
    return ast.kind === _kinds.Kind.STRING ? ast.value : undefined;
  }
});
exports.GraphQLString = GraphQLString;

function serializeBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  if ((0, _isFinite.default)(value)) {
    return value !== 0;
  }

  throw new TypeError("Boolean cannot represent a non boolean value: ".concat((0, _inspect.default)(value)));
}

function coerceBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new TypeError("Boolean cannot represent a non boolean value: ".concat((0, _inspect.default)(value)));
  }

  return value;
}

var GraphQLBoolean = new _definition.GraphQLScalarType({
  name: 'Boolean',
  description: 'The `Boolean` scalar type represents `true` or `false`.',
  serialize: serializeBoolean,
  parseValue: coerceBoolean,
  parseLiteral: function parseLiteral(ast) {
    return ast.kind === _kinds.Kind.BOOLEAN ? ast.value : undefined;
  }
});
exports.GraphQLBoolean = GraphQLBoolean;

function serializeID(value) {
  // Support serializing objects with custom valueOf() functions - a common way
  // to represent an object identifier (ex. MongoDB).
  var result = value && typeof value.valueOf === 'function' ? value.valueOf() : value;

  if (typeof result === 'string') {
    return result;
  }

  if ((0, _isInteger.default)(result)) {
    return String(result);
  }

  throw new TypeError("ID cannot represent value: ".concat((0, _inspect.default)(value)));
}

function coerceID(value) {
  if (typeof value === 'string') {
    return value;
  }

  if ((0, _isInteger.default)(value)) {
    return value.toString();
  }

  throw new TypeError("ID cannot represent value: ".concat((0, _inspect.default)(value)));
}

var GraphQLID = new _definition.GraphQLScalarType({
  name: 'ID',
  description: 'The `ID` scalar type represents a unique identifier, often used to ' + 'refetch an object or as key for a cache. The ID type appears in a JSON ' + 'response as a String; however, it is not intended to be human-readable. ' + 'When expected as an input type, any string (such as `"4"`) or integer ' + '(such as `4`) input value will be accepted as an ID.',
  serialize: serializeID,
  parseValue: coerceID,
  parseLiteral: function parseLiteral(ast) {
    return ast.kind === _kinds.Kind.STRING || ast.kind === _kinds.Kind.INT ? ast.value : undefined;
  }
});
exports.GraphQLID = GraphQLID;
var specifiedScalarTypes = [GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLID];
exports.specifiedScalarTypes = specifiedScalarTypes;

function isSpecifiedScalarType(type) {
  return (0, _definition.isNamedType)(type) && ( // Would prefer to use specifiedScalarTypes.some(), however %checks needs
  // a simple expression.
  type.name === GraphQLString.name || type.name === GraphQLInt.name || type.name === GraphQLFloat.name || type.name === GraphQLBoolean.name || type.name === GraphQLID.name);
}
},{"../jsutils/inspect":17,"../jsutils/isFinite":20,"../jsutils/isInteger":21,"../language/kinds":37,"./definition":48}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSchema = isSchema;
exports.GraphQLSchema = void 0;

var _definition = require("./definition");

var _directives = require("./directives");

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _introspection = require("./introspection");

var _defineToStringTag = _interopRequireDefault(require("../jsutils/defineToStringTag"));

var _find = _interopRequireDefault(require("../jsutils/find"));

var _instanceOf = _interopRequireDefault(require("../jsutils/instanceOf"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line no-redeclare
function isSchema(schema) {
  return (0, _instanceOf.default)(schema, GraphQLSchema);
}
/**
 * Schema Definition
 *
 * A Schema is created by supplying the root types of each type of operation,
 * query and mutation (optional). A schema definition is then supplied to the
 * validator and executor.
 *
 * Example:
 *
 *     const MyAppSchema = new GraphQLSchema({
 *       query: MyAppQueryRootType,
 *       mutation: MyAppMutationRootType,
 *     })
 *
 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
 * the exact list of directives represented and allowed. If `directives` is not
 * provided then a default set of the specified directives (e.g. @include and
 * @skip) will be used. If you wish to provide *additional* directives to these
 * specified directives, you must explicitly declare them. Example:
 *
 *     const MyAppSchema = new GraphQLSchema({
 *       ...
 *       directives: specifiedDirectives.concat([ myCustomDirective ]),
 *     })
 *
 */


var GraphQLSchema =
/*#__PURE__*/
function () {
  // Used as a cache for validateSchema().
  // Referenced by validateSchema().
  function GraphQLSchema(config) {
    _defineProperty(this, "astNode", void 0);

    _defineProperty(this, "extensionASTNodes", void 0);

    _defineProperty(this, "_queryType", void 0);

    _defineProperty(this, "_mutationType", void 0);

    _defineProperty(this, "_subscriptionType", void 0);

    _defineProperty(this, "_directives", void 0);

    _defineProperty(this, "_typeMap", void 0);

    _defineProperty(this, "_implementations", void 0);

    _defineProperty(this, "_possibleTypeMap", void 0);

    _defineProperty(this, "__validationErrors", void 0);

    _defineProperty(this, "__allowedLegacyNames", void 0);

    // If this schema was built from a source known to be valid, then it may be
    // marked with assumeValid to avoid an additional type system validation.
    if (config && config.assumeValid) {
      this.__validationErrors = [];
    } else {
      // Otherwise check for common mistakes during construction to produce
      // clear and early error messages.
      !(_typeof(config) === 'object') ? (0, _invariant.default)(0, 'Must provide configuration object.') : void 0;
      !(!config.types || Array.isArray(config.types)) ? (0, _invariant.default)(0, "\"types\" must be Array if provided but got: ".concat((0, _inspect.default)(config.types), ".")) : void 0;
      !(!config.directives || Array.isArray(config.directives)) ? (0, _invariant.default)(0, '"directives" must be Array if provided but got: ' + "".concat((0, _inspect.default)(config.directives), ".")) : void 0;
      !(!config.allowedLegacyNames || Array.isArray(config.allowedLegacyNames)) ? (0, _invariant.default)(0, '"allowedLegacyNames" must be Array if provided but got: ' + "".concat((0, _inspect.default)(config.allowedLegacyNames), ".")) : void 0;
    }

    this.__allowedLegacyNames = config.allowedLegacyNames || [];
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription; // Provide specified directives (e.g. @include and @skip) by default.

    this._directives = config.directives || _directives.specifiedDirectives;
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes; // Build type map now to detect any errors within this schema.

    var initialTypes = [this.getQueryType(), this.getMutationType(), this.getSubscriptionType(), _introspection.__Schema];
    var types = config.types;

    if (types) {
      initialTypes = initialTypes.concat(types);
    } // Keep track of all types referenced within the schema.


    var typeMap = Object.create(null); // First by deeply visiting all initial types.

    typeMap = initialTypes.reduce(typeMapReducer, typeMap); // Then by deeply visiting all directive types.

    typeMap = this._directives.reduce(typeMapDirectiveReducer, typeMap); // Storing the resulting map for reference by the schema.

    this._typeMap = typeMap; // Keep track of all implementations by interface name.

    this._implementations = Object.create(null);

    var _arr = Object.keys(this._typeMap);

    for (var _i = 0; _i < _arr.length; _i++) {
      var typeName = _arr[_i];
      var type = this._typeMap[typeName];

      if ((0, _definition.isObjectType)(type)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = type.getInterfaces()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var iface = _step.value;

            if ((0, _definition.isInterfaceType)(iface)) {
              var impls = this._implementations[iface.name];

              if (impls) {
                impls.push(type);
              } else {
                this._implementations[iface.name] = [type];
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else if ((0, _definition.isAbstractType)(type) && !this._implementations[type.name]) {
        this._implementations[type.name] = [];
      }
    }
  }

  var _proto = GraphQLSchema.prototype;

  _proto.getQueryType = function getQueryType() {
    return this._queryType;
  };

  _proto.getMutationType = function getMutationType() {
    return this._mutationType;
  };

  _proto.getSubscriptionType = function getSubscriptionType() {
    return this._subscriptionType;
  };

  _proto.getTypeMap = function getTypeMap() {
    return this._typeMap;
  };

  _proto.getType = function getType(name) {
    return this.getTypeMap()[name];
  };

  _proto.getPossibleTypes = function getPossibleTypes(abstractType) {
    if ((0, _definition.isUnionType)(abstractType)) {
      return abstractType.getTypes();
    }

    return this._implementations[abstractType.name];
  };

  _proto.isPossibleType = function isPossibleType(abstractType, possibleType) {
    var possibleTypeMap = this._possibleTypeMap;

    if (!possibleTypeMap) {
      this._possibleTypeMap = possibleTypeMap = Object.create(null);
    }

    if (!possibleTypeMap[abstractType.name]) {
      var possibleTypes = this.getPossibleTypes(abstractType);
      possibleTypeMap[abstractType.name] = possibleTypes.reduce(function (map, type) {
        return map[type.name] = true, map;
      }, Object.create(null));
    }

    return Boolean(possibleTypeMap[abstractType.name][possibleType.name]);
  };

  _proto.getDirectives = function getDirectives() {
    return this._directives;
  };

  _proto.getDirective = function getDirective(name) {
    return (0, _find.default)(this.getDirectives(), function (directive) {
      return directive.name === name;
    });
  };

  return GraphQLSchema;
}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported


exports.GraphQLSchema = GraphQLSchema;
(0, _defineToStringTag.default)(GraphQLSchema);

function typeMapReducer(map, type) {
  if (!type) {
    return map;
  }

  if ((0, _definition.isWrappingType)(type)) {
    return typeMapReducer(map, type.ofType);
  }

  if (map[type.name]) {
    !(map[type.name] === type) ? (0, _invariant.default)(0, 'Schema must contain unique named types but contains multiple ' + "types named \"".concat(type.name, "\".")) : void 0;
    return map;
  }

  map[type.name] = type;
  var reducedMap = map;

  if ((0, _definition.isUnionType)(type)) {
    reducedMap = type.getTypes().reduce(typeMapReducer, reducedMap);
  }

  if ((0, _definition.isObjectType)(type)) {
    reducedMap = type.getInterfaces().reduce(typeMapReducer, reducedMap);
  }

  if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type)) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _objectValues.default)(type.getFields())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var field = _step2.value;

        if (field.args) {
          var fieldArgTypes = field.args.map(function (arg) {
            return arg.type;
          });
          reducedMap = fieldArgTypes.reduce(typeMapReducer, reducedMap);
        }

        reducedMap = typeMapReducer(reducedMap, field.type);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  if ((0, _definition.isInputObjectType)(type)) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = (0, _objectValues.default)(type.getFields())[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _field = _step3.value;
        reducedMap = typeMapReducer(reducedMap, _field.type);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return reducedMap;
}

function typeMapDirectiveReducer(map, directive) {
  // Directives are not validated until validateSchema() is called.
  if (!(0, _directives.isDirective)(directive)) {
    return map;
  }

  return directive.args.reduce(function (_map, arg) {
    return typeMapReducer(_map, arg.type);
  }, map);
}
},{"../jsutils/defineToStringTag":15,"../jsutils/find":16,"../jsutils/inspect":17,"../jsutils/instanceOf":18,"../jsutils/invariant":19,"../jsutils/objectValues":28,"./definition":48,"./directives":49,"./introspection":51}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSchema = validateSchema;
exports.assertValidSchema = assertValidSchema;

var _definition = require("./definition");

var _directives = require("./directives");

var _introspection = require("./introspection");

var _schema = require("./schema");

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _find = _interopRequireDefault(require("../jsutils/find"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _GraphQLError = require("../error/GraphQLError");

var _assertValidName = require("../utilities/assertValidName");

var _typeComparators = require("../utilities/typeComparators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Implements the "Type Validation" sub-sections of the specification's
 * "Type System" section.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the Schema is valid.
 */
function validateSchema(schema) {
  // First check to ensure the provided value is in fact a GraphQLSchema.
  !(0, _schema.isSchema)(schema) ? (0, _invariant.default)(0, "Expected ".concat((0, _inspect.default)(schema), " to be a GraphQL schema.")) : void 0; // If this Schema has already been validated, return the previous results.

  if (schema.__validationErrors) {
    return schema.__validationErrors;
  } // Validate the schema, producing a list of errors.


  var context = new SchemaValidationContext(schema);
  validateRootTypes(context);
  validateDirectives(context);
  validateTypes(context); // Persist the results of validation before returning to ensure validation
  // does not run multiple times for this schema.

  var errors = context.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
/**
 * Utility function which asserts a schema is valid by throwing an error if
 * it is invalid.
 */


function assertValidSchema(schema) {
  var errors = validateSchema(schema);

  if (errors.length !== 0) {
    throw new Error(errors.map(function (error) {
      return error.message;
    }).join('\n\n'));
  }
}

var SchemaValidationContext =
/*#__PURE__*/
function () {
  function SchemaValidationContext(schema) {
    _defineProperty(this, "_errors", void 0);

    _defineProperty(this, "schema", void 0);

    this._errors = [];
    this.schema = schema;
  }

  var _proto = SchemaValidationContext.prototype;

  _proto.reportError = function reportError(message, nodes) {
    var _nodes = (Array.isArray(nodes) ? nodes : [nodes]).filter(Boolean);

    this.addError(new _GraphQLError.GraphQLError(message, _nodes));
  };

  _proto.addError = function addError(error) {
    this._errors.push(error);
  };

  _proto.getErrors = function getErrors() {
    return this._errors;
  };

  return SchemaValidationContext;
}();

function validateRootTypes(context) {
  var schema = context.schema;
  var queryType = schema.getQueryType();

  if (!queryType) {
    context.reportError("Query root type must be provided.", schema.astNode);
  } else if (!(0, _definition.isObjectType)(queryType)) {
    context.reportError("Query root type must be Object type, it cannot be ".concat((0, _inspect.default)(queryType), "."), getOperationTypeNode(schema, queryType, 'query'));
  }

  var mutationType = schema.getMutationType();

  if (mutationType && !(0, _definition.isObjectType)(mutationType)) {
    context.reportError('Mutation root type must be Object type if provided, it cannot be ' + "".concat((0, _inspect.default)(mutationType), "."), getOperationTypeNode(schema, mutationType, 'mutation'));
  }

  var subscriptionType = schema.getSubscriptionType();

  if (subscriptionType && !(0, _definition.isObjectType)(subscriptionType)) {
    context.reportError('Subscription root type must be Object type if provided, it cannot be ' + "".concat((0, _inspect.default)(subscriptionType), "."), getOperationTypeNode(schema, subscriptionType, 'subscription'));
  }
}

function getOperationTypeNode(schema, type, operation) {
  var operationNodes = getAllSubNodes(schema, function (node) {
    return node.operationTypes;
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = operationNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      if (node.operation === operation) {
        return node.type;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return type.astNode;
}

function validateDirectives(context) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = context.schema.getDirectives()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var directive = _step2.value;

      // Ensure all directives are in fact GraphQL directives.
      if (!(0, _directives.isDirective)(directive)) {
        context.reportError("Expected directive but got: ".concat((0, _inspect.default)(directive), "."), directive && directive.astNode);
        continue;
      } // Ensure they are named correctly.


      validateName(context, directive); // TODO: Ensure proper locations.
      // Ensure the arguments are valid.

      var argNames = Object.create(null);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = directive.args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var arg = _step3.value;
          var argName = arg.name; // Ensure they are named correctly.

          validateName(context, arg); // Ensure they are unique per directive.

          if (argNames[argName]) {
            context.reportError("Argument @".concat(directive.name, "(").concat(argName, ":) can only be defined once."), getAllDirectiveArgNodes(directive, argName));
            continue;
          }

          argNames[argName] = true; // Ensure the type is an input type.

          if (!(0, _definition.isInputType)(arg.type)) {
            context.reportError("The type of @".concat(directive.name, "(").concat(argName, ":) must be Input Type ") + "but got: ".concat((0, _inspect.default)(arg.type), "."), getDirectiveArgTypeNode(directive, argName));
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function validateName(context, node) {
  // If a schema explicitly allows some legacy name which is no longer valid,
  // allow it to be assumed valid.
  if (context.schema.__allowedLegacyNames.indexOf(node.name) !== -1) {
    return;
  } // Ensure names are valid, however introspection types opt out.


  var error = (0, _assertValidName.isValidNameError)(node.name, node.astNode || undefined);

  if (error) {
    context.addError(error);
  }
}

function validateTypes(context) {
  var typeMap = context.schema.getTypeMap();
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = (0, _objectValues.default)(typeMap)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var type = _step4.value;

      // Ensure all provided types are in fact GraphQL type.
      if (!(0, _definition.isNamedType)(type)) {
        context.reportError("Expected GraphQL named type but got: ".concat((0, _inspect.default)(type), "."), type && type.astNode);
        continue;
      } // Ensure it is named correctly (excluding introspection types).


      if (!(0, _introspection.isIntrospectionType)(type)) {
        validateName(context, type);
      }

      if ((0, _definition.isObjectType)(type)) {
        // Ensure fields are valid
        validateFields(context, type); // Ensure objects implement the interfaces they claim to.

        validateObjectInterfaces(context, type);
      } else if ((0, _definition.isInterfaceType)(type)) {
        // Ensure fields are valid.
        validateFields(context, type);
      } else if ((0, _definition.isUnionType)(type)) {
        // Ensure Unions include valid member types.
        validateUnionMembers(context, type);
      } else if ((0, _definition.isEnumType)(type)) {
        // Ensure Enums have valid values.
        validateEnumValues(context, type);
      } else if ((0, _definition.isInputObjectType)(type)) {
        // Ensure Input Object fields are valid.
        validateInputFields(context, type);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function validateFields(context, type) {
  var fields = (0, _objectValues.default)(type.getFields()); // Objects and Interfaces both must define one or more fields.

  if (fields.length === 0) {
    context.reportError("Type ".concat(type.name, " must define one or more fields."), getAllNodes(type));
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = fields[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var field = _step5.value;
      // Ensure they are named correctly.
      validateName(context, field); // Ensure they were defined at most once.

      var fieldNodes = getAllFieldNodes(type, field.name);

      if (fieldNodes.length > 1) {
        context.reportError("Field ".concat(type.name, ".").concat(field.name, " can only be defined once."), fieldNodes);
        continue;
      } // Ensure the type is an output type


      if (!(0, _definition.isOutputType)(field.type)) {
        context.reportError("The type of ".concat(type.name, ".").concat(field.name, " must be Output Type ") + "but got: ".concat((0, _inspect.default)(field.type), "."), getFieldTypeNode(type, field.name));
      } // Ensure the arguments are valid


      var argNames = Object.create(null);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = field.args[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var arg = _step6.value;
          var argName = arg.name; // Ensure they are named correctly.

          validateName(context, arg); // Ensure they are unique per field.

          if (argNames[argName]) {
            context.reportError("Field argument ".concat(type.name, ".").concat(field.name, "(").concat(argName, ":) can only ") + 'be defined once.', getAllFieldArgNodes(type, field.name, argName));
          }

          argNames[argName] = true; // Ensure the type is an input type

          if (!(0, _definition.isInputType)(arg.type)) {
            context.reportError("The type of ".concat(type.name, ".").concat(field.name, "(").concat(argName, ":) must be Input ") + "Type but got: ".concat((0, _inspect.default)(arg.type), "."), getFieldArgTypeNode(type, field.name, argName));
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

function validateObjectInterfaces(context, object) {
  var implementedTypeNames = Object.create(null);
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = object.getInterfaces()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var iface = _step7.value;

      if (!(0, _definition.isInterfaceType)(iface)) {
        context.reportError("Type ".concat((0, _inspect.default)(object), " must only implement Interface types, ") + "it cannot implement ".concat((0, _inspect.default)(iface), "."), getImplementsInterfaceNode(object, iface));
        continue;
      }

      if (implementedTypeNames[iface.name]) {
        context.reportError("Type ".concat(object.name, " can only implement ").concat(iface.name, " once."), getAllImplementsInterfaceNodes(object, iface));
        continue;
      }

      implementedTypeNames[iface.name] = true;
      validateObjectImplementsInterface(context, object, iface);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }
}

function validateObjectImplementsInterface(context, object, iface) {
  var objectFieldMap = object.getFields();
  var ifaceFieldMap = iface.getFields(); // Assert each interface field is implemented.

  var _arr = Object.keys(ifaceFieldMap);

  for (var _i = 0; _i < _arr.length; _i++) {
    var fieldName = _arr[_i];
    var objectField = objectFieldMap[fieldName];
    var ifaceField = ifaceFieldMap[fieldName]; // Assert interface field exists on object.

    if (!objectField) {
      context.reportError("Interface field ".concat(iface.name, ".").concat(fieldName, " expected but ") + "".concat(object.name, " does not provide it."), [getFieldNode(iface, fieldName)].concat(getAllNodes(object)));
      continue;
    } // Assert interface field type is satisfied by object field type, by being
    // a valid subtype. (covariant)


    if (!(0, _typeComparators.isTypeSubTypeOf)(context.schema, objectField.type, ifaceField.type)) {
      context.reportError("Interface field ".concat(iface.name, ".").concat(fieldName, " expects type ") + "".concat((0, _inspect.default)(ifaceField.type), " but ").concat(object.name, ".").concat(fieldName, " ") + "is type ".concat((0, _inspect.default)(objectField.type), "."), [getFieldTypeNode(iface, fieldName), getFieldTypeNode(object, fieldName)]);
    } // Assert each interface field arg is implemented.


    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      var _loop = function _loop() {
        var ifaceArg = _step8.value;
        var argName = ifaceArg.name;
        var objectArg = (0, _find.default)(objectField.args, function (arg) {
          return arg.name === argName;
        }); // Assert interface field arg exists on object field.

        if (!objectArg) {
          context.reportError("Interface field argument ".concat(iface.name, ".").concat(fieldName, "(").concat(argName, ":) ") + "expected but ".concat(object.name, ".").concat(fieldName, " does not provide it."), [getFieldArgNode(iface, fieldName, argName), getFieldNode(object, fieldName)]);
          return "continue";
        } // Assert interface field arg type matches object field arg type.
        // (invariant)
        // TODO: change to contravariant?


        if (!(0, _typeComparators.isEqualType)(ifaceArg.type, objectArg.type)) {
          context.reportError("Interface field argument ".concat(iface.name, ".").concat(fieldName, "(").concat(argName, ":) ") + "expects type ".concat((0, _inspect.default)(ifaceArg.type), " but ") + "".concat(object.name, ".").concat(fieldName, "(").concat(argName, ":) is type ") + "".concat((0, _inspect.default)(objectArg.type), "."), [getFieldArgTypeNode(iface, fieldName, argName), getFieldArgTypeNode(object, fieldName, argName)]);
        } // TODO: validate default values?

      };

      for (var _iterator8 = ifaceField.args[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      } // Assert additional arguments must not be required.

    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
          _iterator8.return();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      var _loop2 = function _loop2() {
        var objectArg = _step9.value;
        var argName = objectArg.name;
        var ifaceArg = (0, _find.default)(ifaceField.args, function (arg) {
          return arg.name === argName;
        });

        if (!ifaceArg && (0, _definition.isRequiredArgument)(objectArg)) {
          context.reportError("Object field ".concat(object.name, ".").concat(fieldName, " includes required ") + "argument ".concat(argName, " that is missing from the Interface field ") + "".concat(iface.name, ".").concat(fieldName, "."), [getFieldArgNode(object, fieldName, argName), getFieldNode(iface, fieldName)]);
        }
      };

      for (var _iterator9 = objectField.args[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
          _iterator9.return();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  }
}

function validateUnionMembers(context, union) {
  var memberTypes = union.getTypes();

  if (memberTypes.length === 0) {
    context.reportError("Union type ".concat(union.name, " must define one or more member types."), getAllNodes(union));
  }

  var includedTypeNames = Object.create(null);
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = memberTypes[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var memberType = _step10.value;

      if (includedTypeNames[memberType.name]) {
        context.reportError("Union type ".concat(union.name, " can only include type ") + "".concat(memberType.name, " once."), getUnionMemberTypeNodes(union, memberType.name));
        continue;
      }

      includedTypeNames[memberType.name] = true;

      if (!(0, _definition.isObjectType)(memberType)) {
        context.reportError("Union type ".concat(union.name, " can only include Object types, ") + "it cannot include ".concat((0, _inspect.default)(memberType), "."), getUnionMemberTypeNodes(union, String(memberType)));
      }
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
        _iterator10.return();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }
}

function validateEnumValues(context, enumType) {
  var enumValues = enumType.getValues();

  if (enumValues.length === 0) {
    context.reportError("Enum type ".concat(enumType.name, " must define one or more values."), getAllNodes(enumType));
  }

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = enumValues[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var enumValue = _step11.value;
      var valueName = enumValue.name; // Ensure no duplicates.

      var allNodes = getEnumValueNodes(enumType, valueName);

      if (allNodes && allNodes.length > 1) {
        context.reportError("Enum type ".concat(enumType.name, " can include value ").concat(valueName, " only once."), allNodes);
      } // Ensure valid name.


      validateName(context, enumValue);

      if (valueName === 'true' || valueName === 'false' || valueName === 'null') {
        context.reportError("Enum type ".concat(enumType.name, " cannot include value: ").concat(valueName, "."), enumValue.astNode);
      }
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
        _iterator11.return();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }
}

function validateInputFields(context, inputObj) {
  var fields = (0, _objectValues.default)(inputObj.getFields());

  if (fields.length === 0) {
    context.reportError("Input Object type ".concat(inputObj.name, " must define one or more fields."), getAllNodes(inputObj));
  } // Ensure the arguments are valid


  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = fields[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var field = _step12.value;
      // Ensure they are named correctly.
      validateName(context, field); // TODO: Ensure they are unique per field.
      // Ensure the type is an input type

      if (!(0, _definition.isInputType)(field.type)) {
        context.reportError("The type of ".concat(inputObj.name, ".").concat(field.name, " must be Input Type ") + "but got: ".concat((0, _inspect.default)(field.type), "."), field.astNode && field.astNode.type);
      }
    }
  } catch (err) {
    _didIteratorError12 = true;
    _iteratorError12 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
        _iterator12.return();
      }
    } finally {
      if (_didIteratorError12) {
        throw _iteratorError12;
      }
    }
  }
}

function getAllNodes(object) {
  var astNode = object.astNode,
      extensionASTNodes = object.extensionASTNodes;
  return astNode ? extensionASTNodes ? [astNode].concat(extensionASTNodes) : [astNode] : extensionASTNodes || [];
}

function getAllSubNodes(object, getter) {
  var result = [];
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = getAllNodes(object)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var astNode = _step13.value;

      if (astNode) {
        var subNodes = getter(astNode);

        if (subNodes) {
          result = result.concat(subNodes);
        }
      }
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
        _iterator13.return();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return result;
}

function getImplementsInterfaceNode(type, iface) {
  return getAllImplementsInterfaceNodes(type, iface)[0];
}

function getAllImplementsInterfaceNodes(type, iface) {
  return getAllSubNodes(type, function (typeNode) {
    return typeNode.interfaces;
  }).filter(function (ifaceNode) {
    return ifaceNode.name.value === iface.name;
  });
}

function getFieldNode(type, fieldName) {
  return getAllFieldNodes(type, fieldName)[0];
}

function getAllFieldNodes(type, fieldName) {
  return getAllSubNodes(type, function (typeNode) {
    return typeNode.fields;
  }).filter(function (fieldNode) {
    return fieldNode.name.value === fieldName;
  });
}

function getFieldTypeNode(type, fieldName) {
  var fieldNode = getFieldNode(type, fieldName);
  return fieldNode && fieldNode.type;
}

function getFieldArgNode(type, fieldName, argName) {
  return getAllFieldArgNodes(type, fieldName, argName)[0];
}

function getAllFieldArgNodes(type, fieldName, argName) {
  var argNodes = [];
  var fieldNode = getFieldNode(type, fieldName);

  if (fieldNode && fieldNode.arguments) {
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
      for (var _iterator14 = fieldNode.arguments[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
        var node = _step14.value;

        if (node.name.value === argName) {
          argNodes.push(node);
        }
      }
    } catch (err) {
      _didIteratorError14 = true;
      _iteratorError14 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
          _iterator14.return();
        }
      } finally {
        if (_didIteratorError14) {
          throw _iteratorError14;
        }
      }
    }
  }

  return argNodes;
}

function getFieldArgTypeNode(type, fieldName, argName) {
  var fieldArgNode = getFieldArgNode(type, fieldName, argName);
  return fieldArgNode && fieldArgNode.type;
}

function getAllDirectiveArgNodes(directive, argName) {
  return getAllSubNodes(directive, function (directiveNode) {
    return directiveNode.arguments;
  }).filter(function (argNode) {
    return argNode.name.value === argName;
  });
}

function getDirectiveArgTypeNode(directive, argName) {
  var argNode = getAllDirectiveArgNodes(directive, argName)[0];
  return argNode && argNode.type;
}

function getUnionMemberTypeNodes(union, typeName) {
  return getAllSubNodes(union, function (unionNode) {
    return unionNode.types;
  }).filter(function (typeNode) {
    return typeNode.name.value === typeName;
  });
}

function getEnumValueNodes(enumType, valueName) {
  return getAllSubNodes(enumType, function (enumNode) {
    return enumNode.values;
  }).filter(function (valueNode) {
    return valueNode.name.value === valueName;
  });
}
},{"../error/GraphQLError":3,"../jsutils/find":16,"../jsutils/inspect":17,"../jsutils/invariant":19,"../jsutils/objectValues":28,"../utilities/assertValidName":56,"../utilities/typeComparators":75,"./definition":48,"./directives":49,"./introspection":51,"./schema":53}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeInfo = void 0;

var _kinds = require("../language/kinds");

var _definition = require("../type/definition");

var _introspection = require("../type/introspection");

var _typeFromAST = require("./typeFromAST");

var _find = _interopRequireDefault(require("../jsutils/find"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * TypeInfo is a utility class which, given a GraphQL schema, can keep track
 * of the current field and type definitions at any point in a GraphQL document
 * AST during a recursive descent by calling `enter(node)` and `leave(node)`.
 */
var TypeInfo =
/*#__PURE__*/
function () {
  function TypeInfo(schema, // NOTE: this experimental optional second parameter is only needed in order
  // to support non-spec-compliant codebases. You should never need to use it.
  getFieldDefFn, // Initial type may be provided in rare cases to facilitate traversals
  initialType) {
    _defineProperty(this, "_schema", void 0);

    _defineProperty(this, "_typeStack", void 0);

    _defineProperty(this, "_parentTypeStack", void 0);

    _defineProperty(this, "_inputTypeStack", void 0);

    _defineProperty(this, "_fieldDefStack", void 0);

    _defineProperty(this, "_defaultValueStack", void 0);

    _defineProperty(this, "_directive", void 0);

    _defineProperty(this, "_argument", void 0);

    _defineProperty(this, "_enumValue", void 0);

    _defineProperty(this, "_getFieldDef", void 0);

    this._schema = schema;
    this._typeStack = [];
    this._parentTypeStack = [];
    this._inputTypeStack = [];
    this._fieldDefStack = [];
    this._defaultValueStack = [];
    this._directive = null;
    this._argument = null;
    this._enumValue = null;
    this._getFieldDef = getFieldDefFn || getFieldDef;

    if (initialType) {
      if ((0, _definition.isInputType)(initialType)) {
        this._inputTypeStack.push(initialType);
      }

      if ((0, _definition.isCompositeType)(initialType)) {
        this._parentTypeStack.push(initialType);
      }

      if ((0, _definition.isOutputType)(initialType)) {
        this._typeStack.push(initialType);
      }
    }
  }

  var _proto = TypeInfo.prototype;

  _proto.getType = function getType() {
    if (this._typeStack.length > 0) {
      return this._typeStack[this._typeStack.length - 1];
    }
  };

  _proto.getParentType = function getParentType() {
    if (this._parentTypeStack.length > 0) {
      return this._parentTypeStack[this._parentTypeStack.length - 1];
    }
  };

  _proto.getInputType = function getInputType() {
    if (this._inputTypeStack.length > 0) {
      return this._inputTypeStack[this._inputTypeStack.length - 1];
    }
  };

  _proto.getParentInputType = function getParentInputType() {
    if (this._inputTypeStack.length > 1) {
      return this._inputTypeStack[this._inputTypeStack.length - 2];
    }
  };

  _proto.getFieldDef = function getFieldDef() {
    if (this._fieldDefStack.length > 0) {
      return this._fieldDefStack[this._fieldDefStack.length - 1];
    }
  };

  _proto.getDefaultValue = function getDefaultValue() {
    if (this._defaultValueStack.length > 0) {
      return this._defaultValueStack[this._defaultValueStack.length - 1];
    }
  };

  _proto.getDirective = function getDirective() {
    return this._directive;
  };

  _proto.getArgument = function getArgument() {
    return this._argument;
  };

  _proto.getEnumValue = function getEnumValue() {
    return this._enumValue;
  };

  _proto.enter = function enter(node) {
    var schema = this._schema; // Note: many of the types below are explicitly typed as "mixed" to drop
    // any assumptions of a valid schema to ensure runtime types are properly
    // checked before continuing since TypeInfo is used as part of validation
    // which occurs before guarantees of schema and document validity.

    switch (node.kind) {
      case _kinds.Kind.SELECTION_SET:
        var namedType = (0, _definition.getNamedType)(this.getType());

        this._parentTypeStack.push((0, _definition.isCompositeType)(namedType) ? namedType : undefined);

        break;

      case _kinds.Kind.FIELD:
        var parentType = this.getParentType();
        var fieldDef;
        var fieldType;

        if (parentType) {
          fieldDef = this._getFieldDef(schema, parentType, node);

          if (fieldDef) {
            fieldType = fieldDef.type;
          }
        }

        this._fieldDefStack.push(fieldDef);

        this._typeStack.push((0, _definition.isOutputType)(fieldType) ? fieldType : undefined);

        break;

      case _kinds.Kind.DIRECTIVE:
        this._directive = schema.getDirective(node.name.value);
        break;

      case _kinds.Kind.OPERATION_DEFINITION:
        var type;

        if (node.operation === 'query') {
          type = schema.getQueryType();
        } else if (node.operation === 'mutation') {
          type = schema.getMutationType();
        } else if (node.operation === 'subscription') {
          type = schema.getSubscriptionType();
        }

        this._typeStack.push((0, _definition.isObjectType)(type) ? type : undefined);

        break;

      case _kinds.Kind.INLINE_FRAGMENT:
      case _kinds.Kind.FRAGMENT_DEFINITION:
        var typeConditionAST = node.typeCondition;
        var outputType = typeConditionAST ? (0, _typeFromAST.typeFromAST)(schema, typeConditionAST) : (0, _definition.getNamedType)(this.getType());

        this._typeStack.push((0, _definition.isOutputType)(outputType) ? outputType : undefined);

        break;

      case _kinds.Kind.VARIABLE_DEFINITION:
        var inputType = (0, _typeFromAST.typeFromAST)(schema, node.type);

        this._inputTypeStack.push((0, _definition.isInputType)(inputType) ? inputType : undefined);

        break;

      case _kinds.Kind.ARGUMENT:
        var argDef;
        var argType;
        var fieldOrDirective = this.getDirective() || this.getFieldDef();

        if (fieldOrDirective) {
          argDef = (0, _find.default)(fieldOrDirective.args, function (arg) {
            return arg.name === node.name.value;
          });

          if (argDef) {
            argType = argDef.type;
          }
        }

        this._argument = argDef;

        this._defaultValueStack.push(argDef ? argDef.defaultValue : undefined);

        this._inputTypeStack.push((0, _definition.isInputType)(argType) ? argType : undefined);

        break;

      case _kinds.Kind.LIST:
        var listType = (0, _definition.getNullableType)(this.getInputType());
        var itemType = (0, _definition.isListType)(listType) ? listType.ofType : listType; // List positions never have a default value.

        this._defaultValueStack.push(undefined);

        this._inputTypeStack.push((0, _definition.isInputType)(itemType) ? itemType : undefined);

        break;

      case _kinds.Kind.OBJECT_FIELD:
        var objectType = (0, _definition.getNamedType)(this.getInputType());
        var inputFieldType;
        var inputField;

        if ((0, _definition.isInputObjectType)(objectType)) {
          inputField = objectType.getFields()[node.name.value];

          if (inputField) {
            inputFieldType = inputField.type;
          }
        }

        this._defaultValueStack.push(inputField ? inputField.defaultValue : undefined);

        this._inputTypeStack.push((0, _definition.isInputType)(inputFieldType) ? inputFieldType : undefined);

        break;

      case _kinds.Kind.ENUM:
        var enumType = (0, _definition.getNamedType)(this.getInputType());
        var enumValue;

        if ((0, _definition.isEnumType)(enumType)) {
          enumValue = enumType.getValue(node.value);
        }

        this._enumValue = enumValue;
        break;
    }
  };

  _proto.leave = function leave(node) {
    switch (node.kind) {
      case _kinds.Kind.SELECTION_SET:
        this._parentTypeStack.pop();

        break;

      case _kinds.Kind.FIELD:
        this._fieldDefStack.pop();

        this._typeStack.pop();

        break;

      case _kinds.Kind.DIRECTIVE:
        this._directive = null;
        break;

      case _kinds.Kind.OPERATION_DEFINITION:
      case _kinds.Kind.INLINE_FRAGMENT:
      case _kinds.Kind.FRAGMENT_DEFINITION:
        this._typeStack.pop();

        break;

      case _kinds.Kind.VARIABLE_DEFINITION:
        this._inputTypeStack.pop();

        break;

      case _kinds.Kind.ARGUMENT:
        this._argument = null;

        this._defaultValueStack.pop();

        this._inputTypeStack.pop();

        break;

      case _kinds.Kind.LIST:
      case _kinds.Kind.OBJECT_FIELD:
        this._defaultValueStack.pop();

        this._inputTypeStack.pop();

        break;

      case _kinds.Kind.ENUM:
        this._enumValue = null;
        break;
    }
  };

  return TypeInfo;
}();
/**
 * Not exactly the same as the executor's definition of getFieldDef, in this
 * statically evaluated environment we do not always have an Object type,
 * and need to handle Interface and Union types.
 */


exports.TypeInfo = TypeInfo;

function getFieldDef(schema, parentType, fieldNode) {
  var name = fieldNode.name.value;

  if (name === _introspection.SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return _introspection.SchemaMetaFieldDef;
  }

  if (name === _introspection.TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return _introspection.TypeMetaFieldDef;
  }

  if (name === _introspection.TypeNameMetaFieldDef.name && (0, _definition.isCompositeType)(parentType)) {
    return _introspection.TypeNameMetaFieldDef;
  }

  if ((0, _definition.isObjectType)(parentType) || (0, _definition.isInterfaceType)(parentType)) {
    return parentType.getFields()[name];
  }
}
},{"../jsutils/find":16,"../language/kinds":37,"../type/definition":48,"../type/introspection":51,"./typeFromAST":76}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertValidName = assertValidName;
exports.isValidNameError = isValidNameError;

var _GraphQLError = require("../error/GraphQLError");

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
var NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/**
 * Upholds the spec rules about naming.
 */

function assertValidName(name) {
  var error = isValidNameError(name);

  if (error) {
    throw error;
  }

  return name;
}
/**
 * Returns an Error if a name is invalid.
 */


function isValidNameError(name, node) {
  !(typeof name === 'string') ? (0, _invariant.default)(0, 'Expected string') : void 0;

  if (name.length > 1 && name[0] === '_' && name[1] === '_') {
    return new _GraphQLError.GraphQLError("Name \"".concat(name, "\" must not begin with \"__\", which is reserved by ") + 'GraphQL introspection.', node);
  }

  if (!NAME_RX.test(name)) {
    return new _GraphQLError.GraphQLError("Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but \"".concat(name, "\" does not."), node);
  }
}
},{"../error/GraphQLError":3,"../jsutils/invariant":19}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.astFromValue = astFromValue;

var _iterall = require("iterall");

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _isNullish = _interopRequireDefault(require("../jsutils/isNullish"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _kinds = require("../language/kinds");

var _definition = require("../type/definition");

var _scalars = require("../type/scalars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Produces a GraphQL Value AST given a JavaScript value.
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * JavaScript values.
 *
 * | JSON Value    | GraphQL Value        |
 * | ------------- | -------------------- |
 * | Object        | Input Object         |
 * | Array         | List                 |
 * | Boolean       | Boolean              |
 * | String        | String / Enum Value  |
 * | Number        | Int / Float          |
 * | Mixed         | Enum Value           |
 * | null          | NullValue            |
 *
 */
function astFromValue(value, type) {
  if ((0, _definition.isNonNullType)(type)) {
    var astValue = astFromValue(value, type.ofType);

    if (astValue && astValue.kind === _kinds.Kind.NULL) {
      return null;
    }

    return astValue;
  } // only explicit null, not undefined, NaN


  if (value === null) {
    return {
      kind: _kinds.Kind.NULL
    };
  } // undefined, NaN


  if ((0, _isInvalid.default)(value)) {
    return null;
  } // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
  // the value is not an array, convert the value using the list's item type.


  if ((0, _definition.isListType)(type)) {
    var itemType = type.ofType;

    if ((0, _iterall.isCollection)(value)) {
      var valuesNodes = [];
      (0, _iterall.forEach)(value, function (item) {
        var itemNode = astFromValue(item, itemType);

        if (itemNode) {
          valuesNodes.push(itemNode);
        }
      });
      return {
        kind: _kinds.Kind.LIST,
        values: valuesNodes
      };
    }

    return astFromValue(value, itemType);
  } // Populate the fields of the input object by creating ASTs from each value
  // in the JavaScript object according to the fields in the input type.


  if ((0, _definition.isInputObjectType)(type)) {
    if (value === null || _typeof(value) !== 'object') {
      return null;
    }

    var fields = (0, _objectValues.default)(type.getFields());
    var fieldNodes = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var field = _step.value;
        var fieldValue = astFromValue(value[field.name], field.type);

        if (fieldValue) {
          fieldNodes.push({
            kind: _kinds.Kind.OBJECT_FIELD,
            name: {
              kind: _kinds.Kind.NAME,
              value: field.name
            },
            value: fieldValue
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return {
      kind: _kinds.Kind.OBJECT,
      fields: fieldNodes
    };
  }

  if ((0, _definition.isScalarType)(type) || (0, _definition.isEnumType)(type)) {
    // Since value is an internally represented value, it must be serialized
    // to an externally represented value before converting into an AST.
    var serialized = type.serialize(value);

    if ((0, _isNullish.default)(serialized)) {
      return null;
    } // Others serialize based on their corresponding JavaScript scalar types.


    if (typeof serialized === 'boolean') {
      return {
        kind: _kinds.Kind.BOOLEAN,
        value: serialized
      };
    } // JavaScript numbers can be Int or Float values.


    if (typeof serialized === 'number') {
      var stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: _kinds.Kind.INT,
        value: stringNum
      } : {
        kind: _kinds.Kind.FLOAT,
        value: stringNum
      };
    }

    if (typeof serialized === 'string') {
      // Enum types use Enum literals.
      if ((0, _definition.isEnumType)(type)) {
        return {
          kind: _kinds.Kind.ENUM,
          value: serialized
        };
      } // ID types can use Int literals.


      if (type === _scalars.GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: _kinds.Kind.INT,
          value: serialized
        };
      }

      return {
        kind: _kinds.Kind.STRING,
        value: serialized
      };
    }

    throw new TypeError("Cannot convert value to AST: ".concat((0, _inspect.default)(serialized)));
  }
  /* istanbul ignore next */


  throw new Error("Unknown type: ".concat(type, "."));
}
/**
 * IntValue:
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit ( Digit+ )?
 */


var integerStringRegExp = /^-?(0|[1-9][0-9]*)$/;
},{"../jsutils/inspect":17,"../jsutils/isInvalid":22,"../jsutils/isNullish":23,"../jsutils/objectValues":28,"../language/kinds":37,"../type/definition":48,"../type/scalars":52,"iterall":110}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildASTSchema = buildASTSchema;
exports.getDescription = getDescription;
exports.buildSchema = buildSchema;
exports.ASTDefinitionBuilder = void 0;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _valueFromAST = require("./valueFromAST");

var _validate = require("../validation/validate");

var _blockStringValue = _interopRequireDefault(require("../language/blockStringValue"));

var _lexer = require("../language/lexer");

var _parser = require("../language/parser");

var _values = require("../execution/values");

var _kinds = require("../language/kinds");

var _predicates = require("../language/predicates");

var _definition = require("../type/definition");

var _directives = require("../type/directives");

var _introspection = require("../type/introspection");

var _scalars = require("../type/scalars");

var _schema = require("../type/schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This takes the ast of a schema document produced by the parse function in
 * src/language/parser.js.
 *
 * If no schema definition is provided, then it will look for types named Query
 * and Mutation.
 *
 * Given that AST it constructs a GraphQLSchema. The resulting schema
 * has no resolve methods, so execution will use default resolvers.
 *
 * Accepts options as a second argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */
function buildASTSchema(documentAST, options) {
  !(documentAST && documentAST.kind === _kinds.Kind.DOCUMENT) ? (0, _invariant.default)(0, 'Must provide valid Document AST') : void 0;

  if (!options || !(options.assumeValid || options.assumeValidSDL)) {
    (0, _validate.assertValidSDL)(documentAST);
  }

  var schemaDef;
  var typeDefs = [];
  var nodeMap = Object.create(null);
  var directiveDefs = [];

  for (var i = 0; i < documentAST.definitions.length; i++) {
    var def = documentAST.definitions[i];

    if (def.kind === _kinds.Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if ((0, _predicates.isTypeDefinitionNode)(def)) {
      var typeName = def.name.value;

      if (nodeMap[typeName]) {
        throw new Error("Type \"".concat(typeName, "\" was defined more than once."));
      }

      typeDefs.push(def);
      nodeMap[typeName] = def;
    } else if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }

  var operationTypes = schemaDef ? getOperationTypes(schemaDef) : {
    query: nodeMap.Query,
    mutation: nodeMap.Mutation,
    subscription: nodeMap.Subscription
  };
  var definitionBuilder = new ASTDefinitionBuilder(nodeMap, options, function (typeRef) {
    throw new Error("Type \"".concat(typeRef.name.value, "\" not found in document."));
  });
  var directives = directiveDefs.map(function (def) {
    return definitionBuilder.buildDirective(def);
  }); // If specified directives were not explicitly declared, add them.

  if (!directives.some(function (directive) {
    return directive.name === 'skip';
  })) {
    directives.push(_directives.GraphQLSkipDirective);
  }

  if (!directives.some(function (directive) {
    return directive.name === 'include';
  })) {
    directives.push(_directives.GraphQLIncludeDirective);
  }

  if (!directives.some(function (directive) {
    return directive.name === 'deprecated';
  })) {
    directives.push(_directives.GraphQLDeprecatedDirective);
  } // Note: While this could make early assertions to get the correctly
  // typed values below, that would throw immediately while type system
  // validation with validateSchema() will produce more actionable results.


  return new _schema.GraphQLSchema({
    query: operationTypes.query ? definitionBuilder.buildType(operationTypes.query) : null,
    mutation: operationTypes.mutation ? definitionBuilder.buildType(operationTypes.mutation) : null,
    subscription: operationTypes.subscription ? definitionBuilder.buildType(operationTypes.subscription) : null,
    types: typeDefs.map(function (node) {
      return definitionBuilder.buildType(node);
    }),
    directives: directives,
    astNode: schemaDef,
    assumeValid: options && options.assumeValid,
    allowedLegacyNames: options && options.allowedLegacyNames
  });

  function getOperationTypes(schema) {
    var opTypes = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = schema.operationTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var operationType = _step.value;
        var _typeName = operationType.type.name.value;
        var operation = operationType.operation;

        if (opTypes[operation]) {
          throw new Error("Must provide only one ".concat(operation, " type in schema."));
        }

        if (!nodeMap[_typeName]) {
          throw new Error("Specified ".concat(operation, " type \"").concat(_typeName, "\" not found in document."));
        }

        opTypes[operation] = operationType.type;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return opTypes;
  }
}

var ASTDefinitionBuilder =
/*#__PURE__*/
function () {
  function ASTDefinitionBuilder(typeDefinitionsMap, options, resolveType) {
    _defineProperty(this, "_typeDefinitionsMap", void 0);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_resolveType", void 0);

    _defineProperty(this, "_cache", void 0);

    this._typeDefinitionsMap = typeDefinitionsMap;
    this._options = options;
    this._resolveType = resolveType; // Initialize to the GraphQL built in scalars and introspection types.

    this._cache = (0, _keyMap.default)(_scalars.specifiedScalarTypes.concat(_introspection.introspectionTypes), function (type) {
      return type.name;
    });
  }

  var _proto = ASTDefinitionBuilder.prototype;

  _proto.buildType = function buildType(node) {
    var typeName = node.name.value;

    if (!this._cache[typeName]) {
      if (node.kind === _kinds.Kind.NAMED_TYPE) {
        var defNode = this._typeDefinitionsMap[typeName];
        this._cache[typeName] = defNode ? this._makeSchemaDef(defNode) : this._resolveType(node);
      } else {
        this._cache[typeName] = this._makeSchemaDef(node);
      }
    }

    return this._cache[typeName];
  };

  _proto._buildWrappedType = function _buildWrappedType(typeNode) {
    if (typeNode.kind === _kinds.Kind.LIST_TYPE) {
      return (0, _definition.GraphQLList)(this._buildWrappedType(typeNode.type));
    }

    if (typeNode.kind === _kinds.Kind.NON_NULL_TYPE) {
      return (0, _definition.GraphQLNonNull)( // Note: GraphQLNonNull constructor validates this type
      this._buildWrappedType(typeNode.type));
    }

    return this.buildType(typeNode);
  };

  _proto.buildDirective = function buildDirective(directiveNode) {
    return new _directives.GraphQLDirective({
      name: directiveNode.name.value,
      description: getDescription(directiveNode, this._options),
      locations: directiveNode.locations.map(function (node) {
        return node.value;
      }),
      args: directiveNode.arguments && this._makeInputValues(directiveNode.arguments),
      astNode: directiveNode
    });
  };

  _proto.buildField = function buildField(field) {
    return {
      // Note: While this could make assertions to get the correctly typed
      // value, that would throw immediately while type system validation
      // with validateSchema() will produce more actionable results.
      type: this._buildWrappedType(field.type),
      description: getDescription(field, this._options),
      args: field.arguments && this._makeInputValues(field.arguments),
      deprecationReason: getDeprecationReason(field),
      astNode: field
    };
  };

  _proto.buildInputField = function buildInputField(value) {
    // Note: While this could make assertions to get the correctly typed
    // value, that would throw immediately while type system validation
    var type = this._buildWrappedType(value.type);

    return {
      name: value.name.value,
      type: type,
      description: getDescription(value, this._options),
      defaultValue: (0, _valueFromAST.valueFromAST)(value.defaultValue, type),
      astNode: value
    };
  };

  _proto.buildEnumValue = function buildEnumValue(value) {
    return {
      description: getDescription(value, this._options),
      deprecationReason: getDeprecationReason(value),
      astNode: value
    };
  };

  _proto._makeSchemaDef = function _makeSchemaDef(def) {
    switch (def.kind) {
      case _kinds.Kind.OBJECT_TYPE_DEFINITION:
        return this._makeTypeDef(def);

      case _kinds.Kind.INTERFACE_TYPE_DEFINITION:
        return this._makeInterfaceDef(def);

      case _kinds.Kind.ENUM_TYPE_DEFINITION:
        return this._makeEnumDef(def);

      case _kinds.Kind.UNION_TYPE_DEFINITION:
        return this._makeUnionDef(def);

      case _kinds.Kind.SCALAR_TYPE_DEFINITION:
        return this._makeScalarDef(def);

      case _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION:
        return this._makeInputObjectDef(def);

      default:
        throw new Error("Type kind \"".concat(def.kind, "\" not supported."));
    }
  };

  _proto._makeTypeDef = function _makeTypeDef(def) {
    var _this = this;

    var interfaces = def.interfaces;
    return new _definition.GraphQLObjectType({
      name: def.name.value,
      description: getDescription(def, this._options),
      fields: function fields() {
        return _this._makeFieldDefMap(def);
      },
      // Note: While this could make early assertions to get the correctly
      // typed values, that would throw immediately while type system
      // validation with validateSchema() will produce more actionable results.
      interfaces: interfaces ? function () {
        return interfaces.map(function (ref) {
          return _this.buildType(ref);
        });
      } : [],
      astNode: def
    });
  };

  _proto._makeFieldDefMap = function _makeFieldDefMap(def) {
    var _this2 = this;

    return def.fields ? (0, _keyValMap.default)(def.fields, function (field) {
      return field.name.value;
    }, function (field) {
      return _this2.buildField(field);
    }) : {};
  };

  _proto._makeInputValues = function _makeInputValues(values) {
    var _this3 = this;

    return (0, _keyValMap.default)(values, function (value) {
      return value.name.value;
    }, function (value) {
      return _this3.buildInputField(value);
    });
  };

  _proto._makeInterfaceDef = function _makeInterfaceDef(def) {
    var _this4 = this;

    return new _definition.GraphQLInterfaceType({
      name: def.name.value,
      description: getDescription(def, this._options),
      fields: function fields() {
        return _this4._makeFieldDefMap(def);
      },
      astNode: def
    });
  };

  _proto._makeEnumDef = function _makeEnumDef(def) {
    return new _definition.GraphQLEnumType({
      name: def.name.value,
      description: getDescription(def, this._options),
      values: this._makeValueDefMap(def),
      astNode: def
    });
  };

  _proto._makeValueDefMap = function _makeValueDefMap(def) {
    var _this5 = this;

    return def.values ? (0, _keyValMap.default)(def.values, function (enumValue) {
      return enumValue.name.value;
    }, function (enumValue) {
      return _this5.buildEnumValue(enumValue);
    }) : {};
  };

  _proto._makeUnionDef = function _makeUnionDef(def) {
    var _this6 = this;

    var types = def.types;
    return new _definition.GraphQLUnionType({
      name: def.name.value,
      description: getDescription(def, this._options),
      // Note: While this could make assertions to get the correctly typed
      // values below, that would throw immediately while type system
      // validation with validateSchema() will produce more actionable results.
      types: types ? function () {
        return types.map(function (ref) {
          return _this6.buildType(ref);
        });
      } : [],
      astNode: def
    });
  };

  _proto._makeScalarDef = function _makeScalarDef(def) {
    return new _definition.GraphQLScalarType({
      name: def.name.value,
      description: getDescription(def, this._options),
      astNode: def,
      serialize: function serialize(value) {
        return value;
      }
    });
  };

  _proto._makeInputObjectDef = function _makeInputObjectDef(def) {
    var _this7 = this;

    return new _definition.GraphQLInputObjectType({
      name: def.name.value,
      description: getDescription(def, this._options),
      fields: function fields() {
        return def.fields ? _this7._makeInputValues(def.fields) : {};
      },
      astNode: def
    });
  };

  return ASTDefinitionBuilder;
}();
/**
 * Given a field or enum value node, returns the string value for the
 * deprecation reason.
 */


exports.ASTDefinitionBuilder = ASTDefinitionBuilder;

function getDeprecationReason(node) {
  var deprecated = (0, _values.getDirectiveValues)(_directives.GraphQLDeprecatedDirective, node);
  return deprecated && deprecated.reason;
}
/**
 * Given an ast node, returns its string description.
 * @deprecated: provided to ease adoption and will be removed in v16.
 *
 * Accepts options as a second argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */


function getDescription(node, options) {
  if (node.description) {
    return node.description.value;
  }

  if (options && options.commentDescriptions) {
    var rawValue = getLeadingCommentBlock(node);

    if (rawValue !== undefined) {
      return (0, _blockStringValue.default)('\n' + rawValue);
    }
  }
}

function getLeadingCommentBlock(node) {
  var loc = node.loc;

  if (!loc) {
    return;
  }

  var comments = [];
  var token = loc.startToken.prev;

  while (token && token.kind === _lexer.TokenKind.COMMENT && token.next && token.prev && token.line + 1 === token.next.line && token.line !== token.prev.line) {
    var value = String(token.value);
    comments.push(value);
    token = token.prev;
  }

  return comments.reverse().join('\n');
}
/**
 * A helper function to build a GraphQLSchema directly from a source
 * document.
 */


function buildSchema(source, options) {
  return buildASTSchema((0, _parser.parse)(source, options), options);
}
},{"../execution/values":11,"../jsutils/invariant":19,"../jsutils/keyMap":25,"../jsutils/keyValMap":26,"../language/blockStringValue":34,"../language/kinds":37,"../language/lexer":38,"../language/parser":40,"../language/predicates":41,"../type/definition":48,"../type/directives":49,"../type/introspection":51,"../type/scalars":52,"../type/schema":53,"../validation/validate":109,"./valueFromAST":77}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildClientSchema = buildClientSchema;

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _valueFromAST = require("./valueFromAST");

var _parser = require("../language/parser");

var _schema = require("../type/schema");

var _definition = require("../type/definition");

var _directives = require("../type/directives");

var _introspection = require("../type/introspection");

var _scalars = require("../type/scalars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Build a GraphQLSchema for use by client tools.
 *
 * Given the result of a client running the introspection query, creates and
 * returns a GraphQLSchema instance which can be then used with all graphql-js
 * tools, but cannot be used to execute a query, as introspection does not
 * represent the "resolver", "parse" or "serialize" functions or any other
 * server-internal mechanisms.
 *
 * This function expects a complete introspection result. Don't forget to check
 * the "errors" field of a server response before calling this function.
 */
function buildClientSchema(introspection, options) {
  // Get the schema from the introspection result.
  var schemaIntrospection = introspection.__schema; // Converts the list of types into a keyMap based on the type names.

  var typeIntrospectionMap = (0, _keyMap.default)(schemaIntrospection.types, function (type) {
    return type.name;
  }); // A cache to use to store the actual GraphQLType definition objects by name.
  // Initialize to the GraphQL built in scalars. All functions below are inline
  // so that this type def cache is within the scope of the closure.

  var typeDefCache = (0, _keyMap.default)(_scalars.specifiedScalarTypes.concat(_introspection.introspectionTypes), function (type) {
    return type.name;
  }); // Given a type reference in introspection, return the GraphQLType instance.
  // preferring cached instances before building new instances.

  function getType(typeRef) {
    if (typeRef.kind === _introspection.TypeKind.LIST) {
      var itemRef = typeRef.ofType;

      if (!itemRef) {
        throw new Error('Decorated type deeper than introspection query.');
      }

      return (0, _definition.GraphQLList)(getType(itemRef));
    }

    if (typeRef.kind === _introspection.TypeKind.NON_NULL) {
      var nullableRef = typeRef.ofType;

      if (!nullableRef) {
        throw new Error('Decorated type deeper than introspection query.');
      }

      var nullableType = getType(nullableRef);
      return (0, _definition.GraphQLNonNull)((0, _definition.assertNullableType)(nullableType));
    }

    if (!typeRef.name) {
      throw new Error('Unknown type reference: ' + (0, _inspect.default)(typeRef));
    }

    return getNamedType(typeRef.name);
  }

  function getNamedType(typeName) {
    if (typeDefCache[typeName]) {
      return typeDefCache[typeName];
    }

    var typeIntrospection = typeIntrospectionMap[typeName];

    if (!typeIntrospection) {
      throw new Error("Invalid or incomplete schema, unknown type: ".concat(typeName, ". Ensure ") + 'that a full introspection query is used in order to build a ' + 'client schema.');
    }

    var typeDef = buildType(typeIntrospection);
    typeDefCache[typeName] = typeDef;
    return typeDef;
  }

  function getInputType(typeRef) {
    var type = getType(typeRef);
    !(0, _definition.isInputType)(type) ? (0, _invariant.default)(0, 'Introspection must provide input type for arguments.') : void 0;
    return type;
  }

  function getOutputType(typeRef) {
    var type = getType(typeRef);
    !(0, _definition.isOutputType)(type) ? (0, _invariant.default)(0, 'Introspection must provide output type for fields.') : void 0;
    return type;
  }

  function getObjectType(typeRef) {
    var type = getType(typeRef);
    return (0, _definition.assertObjectType)(type);
  }

  function getInterfaceType(typeRef) {
    var type = getType(typeRef);
    return (0, _definition.assertInterfaceType)(type);
  } // Given a type's introspection result, construct the correct
  // GraphQLType instance.


  function buildType(type) {
    if (type && type.name && type.kind) {
      switch (type.kind) {
        case _introspection.TypeKind.SCALAR:
          return buildScalarDef(type);

        case _introspection.TypeKind.OBJECT:
          return buildObjectDef(type);

        case _introspection.TypeKind.INTERFACE:
          return buildInterfaceDef(type);

        case _introspection.TypeKind.UNION:
          return buildUnionDef(type);

        case _introspection.TypeKind.ENUM:
          return buildEnumDef(type);

        case _introspection.TypeKind.INPUT_OBJECT:
          return buildInputObjectDef(type);
      }
    }

    throw new Error('Invalid or incomplete introspection result. Ensure that a full ' + 'introspection query is used in order to build a client schema:' + (0, _inspect.default)(type));
  }

  function buildScalarDef(scalarIntrospection) {
    return new _definition.GraphQLScalarType({
      name: scalarIntrospection.name,
      description: scalarIntrospection.description,
      serialize: function serialize(value) {
        return value;
      }
    });
  }

  function buildObjectDef(objectIntrospection) {
    if (!objectIntrospection.interfaces) {
      throw new Error('Introspection result missing interfaces: ' + (0, _inspect.default)(objectIntrospection));
    }

    return new _definition.GraphQLObjectType({
      name: objectIntrospection.name,
      description: objectIntrospection.description,
      interfaces: function interfaces() {
        return objectIntrospection.interfaces.map(getInterfaceType);
      },
      fields: function fields() {
        return buildFieldDefMap(objectIntrospection);
      }
    });
  }

  function buildInterfaceDef(interfaceIntrospection) {
    return new _definition.GraphQLInterfaceType({
      name: interfaceIntrospection.name,
      description: interfaceIntrospection.description,
      fields: function fields() {
        return buildFieldDefMap(interfaceIntrospection);
      }
    });
  }

  function buildUnionDef(unionIntrospection) {
    if (!unionIntrospection.possibleTypes) {
      throw new Error('Introspection result missing possibleTypes: ' + (0, _inspect.default)(unionIntrospection));
    }

    return new _definition.GraphQLUnionType({
      name: unionIntrospection.name,
      description: unionIntrospection.description,
      types: function types() {
        return unionIntrospection.possibleTypes.map(getObjectType);
      }
    });
  }

  function buildEnumDef(enumIntrospection) {
    if (!enumIntrospection.enumValues) {
      throw new Error('Introspection result missing enumValues: ' + (0, _inspect.default)(enumIntrospection));
    }

    return new _definition.GraphQLEnumType({
      name: enumIntrospection.name,
      description: enumIntrospection.description,
      values: (0, _keyValMap.default)(enumIntrospection.enumValues, function (valueIntrospection) {
        return valueIntrospection.name;
      }, function (valueIntrospection) {
        return {
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason
        };
      })
    });
  }

  function buildInputObjectDef(inputObjectIntrospection) {
    if (!inputObjectIntrospection.inputFields) {
      throw new Error('Introspection result missing inputFields: ' + (0, _inspect.default)(inputObjectIntrospection));
    }

    return new _definition.GraphQLInputObjectType({
      name: inputObjectIntrospection.name,
      description: inputObjectIntrospection.description,
      fields: function fields() {
        return buildInputValueDefMap(inputObjectIntrospection.inputFields);
      }
    });
  }

  function buildFieldDefMap(typeIntrospection) {
    if (!typeIntrospection.fields) {
      throw new Error('Introspection result missing fields: ' + (0, _inspect.default)(typeIntrospection));
    }

    return (0, _keyValMap.default)(typeIntrospection.fields, function (fieldIntrospection) {
      return fieldIntrospection.name;
    }, function (fieldIntrospection) {
      if (!fieldIntrospection.args) {
        throw new Error('Introspection result missing field args: ' + (0, _inspect.default)(fieldIntrospection));
      }

      return {
        description: fieldIntrospection.description,
        deprecationReason: fieldIntrospection.deprecationReason,
        type: getOutputType(fieldIntrospection.type),
        args: buildInputValueDefMap(fieldIntrospection.args)
      };
    });
  }

  function buildInputValueDefMap(inputValueIntrospections) {
    return (0, _keyValMap.default)(inputValueIntrospections, function (inputValue) {
      return inputValue.name;
    }, buildInputValue);
  }

  function buildInputValue(inputValueIntrospection) {
    var type = getInputType(inputValueIntrospection.type);
    var defaultValue = inputValueIntrospection.defaultValue ? (0, _valueFromAST.valueFromAST)((0, _parser.parseValue)(inputValueIntrospection.defaultValue), type) : undefined;
    return {
      description: inputValueIntrospection.description,
      type: type,
      defaultValue: defaultValue
    };
  }

  function buildDirective(directiveIntrospection) {
    if (!directiveIntrospection.args) {
      throw new Error('Introspection result missing directive args: ' + (0, _inspect.default)(directiveIntrospection));
    }

    if (!directiveIntrospection.locations) {
      throw new Error('Introspection result missing directive locations: ' + (0, _inspect.default)(directiveIntrospection));
    }

    return new _directives.GraphQLDirective({
      name: directiveIntrospection.name,
      description: directiveIntrospection.description,
      locations: directiveIntrospection.locations.slice(),
      args: buildInputValueDefMap(directiveIntrospection.args)
    });
  } // Iterate through all types, getting the type definition for each, ensuring
  // that any type not directly referenced by a field will get created.


  var types = schemaIntrospection.types.map(function (typeIntrospection) {
    return getNamedType(typeIntrospection.name);
  }); // Get the root Query, Mutation, and Subscription types.

  var queryType = schemaIntrospection.queryType ? getObjectType(schemaIntrospection.queryType) : null;
  var mutationType = schemaIntrospection.mutationType ? getObjectType(schemaIntrospection.mutationType) : null;
  var subscriptionType = schemaIntrospection.subscriptionType ? getObjectType(schemaIntrospection.subscriptionType) : null; // Get the directives supported by Introspection, assuming empty-set if
  // directives were not queried for.

  var directives = schemaIntrospection.directives ? schemaIntrospection.directives.map(buildDirective) : []; // Then produce and return a Schema with these types.

  return new _schema.GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    types: types,
    directives: directives,
    assumeValid: options && options.assumeValid,
    allowedLegacyNames: options && options.allowedLegacyNames
  });
}
},{"../jsutils/inspect":17,"../jsutils/invariant":19,"../jsutils/keyMap":25,"../jsutils/keyValMap":26,"../language/parser":40,"../type/definition":48,"../type/directives":49,"../type/introspection":51,"../type/scalars":52,"../type/schema":53,"./valueFromAST":77}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coerceValue = coerceValue;

var _iterall = require("iterall");

var _inspect = _interopRequireDefault(require("../jsutils/inspect"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _orList = _interopRequireDefault(require("../jsutils/orList"));

var _suggestionList = _interopRequireDefault(require("../jsutils/suggestionList"));

var _GraphQLError = require("../error/GraphQLError");

var _definition = require("../type/definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Coerces a JavaScript value given a GraphQL Type.
 *
 * Returns either a value which is valid for the provided type or a list of
 * encountered coercion errors.
 *
 */
function coerceValue(value, type, blameNode, path) {
  // A value must be provided if the type is non-null.
  if ((0, _definition.isNonNullType)(type)) {
    if (value == null) {
      return ofErrors([coercionError("Expected non-nullable type ".concat((0, _inspect.default)(type), " not to be null"), blameNode, path)]);
    }

    return coerceValue(value, type.ofType, blameNode, path);
  }

  if (value == null) {
    // Explicitly return the value null.
    return ofValue(null);
  }

  if ((0, _definition.isScalarType)(type)) {
    // Scalars determine if a value is valid via parseValue(), which can
    // throw to indicate failure. If it throws, maintain a reference to
    // the original error.
    try {
      var parseResult = type.parseValue(value);

      if ((0, _isInvalid.default)(parseResult)) {
        return ofErrors([coercionError("Expected type ".concat(type.name), blameNode, path)]);
      }

      return ofValue(parseResult);
    } catch (error) {
      return ofErrors([coercionError("Expected type ".concat(type.name), blameNode, path, error.message, error)]);
    }
  }

  if ((0, _definition.isEnumType)(type)) {
    if (typeof value === 'string') {
      var enumValue = type.getValue(value);

      if (enumValue) {
        return ofValue(enumValue.value);
      }
    }

    var suggestions = (0, _suggestionList.default)(String(value), type.getValues().map(function (enumValue) {
      return enumValue.name;
    }));
    var didYouMean = suggestions.length !== 0 ? "did you mean ".concat((0, _orList.default)(suggestions), "?") : undefined;
    return ofErrors([coercionError("Expected type ".concat(type.name), blameNode, path, didYouMean)]);
  }

  if ((0, _definition.isListType)(type)) {
    var itemType = type.ofType;

    if ((0, _iterall.isCollection)(value)) {
      var errors;
      var coercedValue = [];
      (0, _iterall.forEach)(value, function (itemValue, index) {
        var coercedItem = coerceValue(itemValue, itemType, blameNode, atPath(path, index));

        if (coercedItem.errors) {
          errors = add(errors, coercedItem.errors);
        } else if (!errors) {
          coercedValue.push(coercedItem.value);
        }
      });
      return errors ? ofErrors(errors) : ofValue(coercedValue);
    } // Lists accept a non-list value as a list of one.


    var coercedItem = coerceValue(value, itemType, blameNode);
    return coercedItem.errors ? coercedItem : ofValue([coercedItem.value]);
  }

  if ((0, _definition.isInputObjectType)(type)) {
    if (_typeof(value) !== 'object') {
      return ofErrors([coercionError("Expected type ".concat(type.name, " to be an object"), blameNode, path)]);
    }

    var _errors;

    var _coercedValue = {};
    var fields = type.getFields(); // Ensure every defined field is valid.

    for (var fieldName in fields) {
      if (hasOwnProperty.call(fields, fieldName)) {
        var field = fields[fieldName];
        var fieldValue = value[fieldName];

        if ((0, _isInvalid.default)(fieldValue)) {
          if (!(0, _isInvalid.default)(field.defaultValue)) {
            _coercedValue[fieldName] = field.defaultValue;
          } else if ((0, _definition.isNonNullType)(field.type)) {
            _errors = add(_errors, coercionError("Field ".concat(printPath(atPath(path, fieldName)), " of required ") + "type ".concat((0, _inspect.default)(field.type), " was not provided"), blameNode));
          }
        } else {
          var coercedField = coerceValue(fieldValue, field.type, blameNode, atPath(path, fieldName));

          if (coercedField.errors) {
            _errors = add(_errors, coercedField.errors);
          } else if (!_errors) {
            _coercedValue[fieldName] = coercedField.value;
          }
        }
      }
    } // Ensure every provided field is defined.


    for (var _fieldName in value) {
      if (hasOwnProperty.call(value, _fieldName)) {
        if (!fields[_fieldName]) {
          var _suggestions = (0, _suggestionList.default)(_fieldName, Object.keys(fields));

          var _didYouMean = _suggestions.length !== 0 ? "did you mean ".concat((0, _orList.default)(_suggestions), "?") : undefined;

          _errors = add(_errors, coercionError("Field \"".concat(_fieldName, "\" is not defined by type ").concat(type.name), blameNode, path, _didYouMean));
        }
      }
    }

    return _errors ? ofErrors(_errors) : ofValue(_coercedValue);
  }
  /* istanbul ignore next */


  throw new Error("Unexpected type: ".concat(type, "."));
}

function ofValue(value) {
  return {
    errors: undefined,
    value: value
  };
}

function ofErrors(errors) {
  return {
    errors: errors,
    value: undefined
  };
}

function add(errors, moreErrors) {
  return (errors || []).concat(moreErrors);
}

function atPath(prev, key) {
  return {
    prev: prev,
    key: key
  };
}

function coercionError(message, blameNode, path, subMessage, originalError) {
  var pathStr = printPath(path); // Return a GraphQLError instance

  return new _GraphQLError.GraphQLError(message + (pathStr ? ' at ' + pathStr : '') + (subMessage ? '; ' + subMessage : '.'), blameNode, undefined, undefined, undefined, originalError);
} // Build a string describing the path into the value where the error was found


function printPath(path) {
  var pathStr = '';
  var currentPath = path;

  while (currentPath) {
    pathStr = (typeof currentPath.key === 'string' ? '.' + currentPath.key : '[' + String(currentPath.key) + ']') + pathStr;
    currentPath = currentPath.prev;
  }

  return pathStr ? 'value' + pathStr : '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
},{"../error/GraphQLError":3,"../jsutils/inspect":17,"../jsutils/isInvalid":22,"../jsutils/orList":29,"../jsutils/suggestionList":33,"../type/definition":48,"iterall":110}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatAST = concatAST;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Provided a collection of ASTs, presumably each from different files,
 * concatenate the ASTs together into batched AST, useful for validating many
 * GraphQL source files which together represent one conceptual application.
 */
function concatAST(asts) {
  var batchDefinitions = [];

  for (var i = 0; i < asts.length; i++) {
    var definitions = asts[i].definitions;

    for (var j = 0; j < definitions.length; j++) {
      batchDefinitions.push(definitions[j]);
    }
  }

  return {
    kind: 'Document',
    definitions: batchDefinitions
  };
}
},{}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendSchema = extendSchema;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _buildASTSchema = require("./buildASTSchema");

var _validate = require("../validation/validate");

var _GraphQLError = require("../error/GraphQLError");

var _schema = require("../type/schema");

var _introspection = require("../type/introspection");

var _scalars = require("../type/scalars");

var _definition = require("../type/definition");

var _directives = require("../type/directives");

var _kinds = require("../language/kinds");

var _predicates = require("../language/predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Produces a new schema given an existing schema and a document which may
 * contain GraphQL type extensions and definitions. The original schema will
 * remain unaltered.
 *
 * Because a schema represents a graph of references, a schema cannot be
 * extended without effectively making an entire copy. We do not know until it's
 * too late if subgraphs remain unchanged.
 *
 * This algorithm copies the provided schema, applying extensions while
 * producing the copy. The original schema remains unaltered.
 *
 * Accepts options as a third argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */
function extendSchema(schema, documentAST, options) {
  !(0, _schema.isSchema)(schema) ? (0, _invariant.default)(0, 'Must provide valid GraphQLSchema') : void 0;
  !(documentAST && documentAST.kind === _kinds.Kind.DOCUMENT) ? (0, _invariant.default)(0, 'Must provide valid Document AST') : void 0;

  if (!options || !(options.assumeValid || options.assumeValidSDL)) {
    (0, _validate.assertValidSDLExtension)(documentAST, schema);
  } // Collect the type definitions and extensions found in the document.


  var typeDefinitionMap = Object.create(null);
  var typeExtensionsMap = Object.create(null); // New directives and types are separate because a directives and types can
  // have the same name. For example, a type named "skip".

  var directiveDefinitions = [];
  var schemaDef; // Schema extensions are collected which may add additional operation types.

  var schemaExtensions = [];

  for (var i = 0; i < documentAST.definitions.length; i++) {
    var def = documentAST.definitions[i];

    if (def.kind === _kinds.Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === _kinds.Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if ((0, _predicates.isTypeDefinitionNode)(def)) {
      // Sanity check that none of the defined types conflict with the
      // schema's existing types.
      var typeName = def.name.value;

      if (schema.getType(typeName)) {
        throw new _GraphQLError.GraphQLError("Type \"".concat(typeName, "\" already exists in the schema. It cannot also ") + 'be defined in this type definition.', [def]);
      }

      typeDefinitionMap[typeName] = def;
    } else if ((0, _predicates.isTypeExtensionNode)(def)) {
      // Sanity check that this type extension exists within the
      // schema's existing types.
      var extendedTypeName = def.name.value;
      var existingType = schema.getType(extendedTypeName);

      if (!existingType) {
        throw new _GraphQLError.GraphQLError("Cannot extend type \"".concat(extendedTypeName, "\" because it does not ") + 'exist in the existing schema.', [def]);
      }

      checkExtensionNode(existingType, def);
      var existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
    } else if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
      var directiveName = def.name.value;
      var existingDirective = schema.getDirective(directiveName);

      if (existingDirective) {
        throw new _GraphQLError.GraphQLError("Directive \"".concat(directiveName, "\" already exists in the schema. It ") + 'cannot be redefined.', [def]);
      }

      directiveDefinitions.push(def);
    }
  } // If this document contains no new types, extensions, or directives then
  // return the same unmodified GraphQLSchema instance.


  if (Object.keys(typeExtensionsMap).length === 0 && Object.keys(typeDefinitionMap).length === 0 && directiveDefinitions.length === 0 && schemaExtensions.length === 0 && !schemaDef) {
    return schema;
  }

  var astBuilder = new _buildASTSchema.ASTDefinitionBuilder(typeDefinitionMap, options, function (typeRef) {
    var typeName = typeRef.name.value;
    var existingType = schema.getType(typeName);

    if (existingType) {
      return extendNamedType(existingType);
    }

    throw new _GraphQLError.GraphQLError("Unknown type: \"".concat(typeName, "\". Ensure that this type exists ") + 'either in the original schema, or is added in a type definition.', [typeRef]);
  });
  var extendTypeCache = Object.create(null); // Get the extended root operation types.

  var operationTypes = {
    query: extendMaybeNamedType(schema.getQueryType()),
    mutation: extendMaybeNamedType(schema.getMutationType()),
    subscription: extendMaybeNamedType(schema.getSubscriptionType())
  };

  if (schemaDef) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = schemaDef.operationTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref2 = _step.value;
        var operation = _ref2.operation,
            type = _ref2.type;

        if (operationTypes[operation]) {
          throw new Error("Must provide only one ".concat(operation, " type in schema."));
        } // Note: While this could make early assertions to get the correctly
        // typed values, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.


        operationTypes[operation] = astBuilder.buildType(type);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } // Then, incorporate schema definition and all schema extensions.


  for (var _i = 0; _i < schemaExtensions.length; _i++) {
    var schemaExtension = schemaExtensions[_i];

    if (schemaExtension.operationTypes) {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = schemaExtension.operationTypes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _ref4 = _step12.value;
          var operation = _ref4.operation,
              type = _ref4.type;

          if (operationTypes[operation]) {
            throw new Error("Must provide only one ".concat(operation, " type in schema."));
          } // Note: While this could make early assertions to get the correctly
          // typed values, that would throw immediately while type system
          // validation with validateSchema() will produce more actionable results.


          operationTypes[operation] = astBuilder.buildType(type);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  }

  var schemaExtensionASTNodes = schemaExtensions ? schema.extensionASTNodes ? schema.extensionASTNodes.concat(schemaExtensions) : schemaExtensions : schema.extensionASTNodes;
  var types = (0, _objectValues.default)(schema.getTypeMap()).map(function (type) {
    return extendNamedType(type);
  }).concat((0, _objectValues.default)(typeDefinitionMap).map(function (type) {
    return astBuilder.buildType(type);
  })); // Support both original legacy names and extended legacy names.

  var allowedLegacyNames = schema.__allowedLegacyNames.concat(options && options.allowedLegacyNames || []); // Then produce and return a Schema with these types.


  return new _schema.GraphQLSchema(_objectSpread({}, operationTypes, {
    types: types,
    directives: getMergedDirectives(),
    astNode: schema.astNode,
    extensionASTNodes: schemaExtensionASTNodes,
    allowedLegacyNames: allowedLegacyNames
  })); // Below are functions used for producing this schema that have closed over
  // this scope and have access to the schema, cache, and newly defined types.

  function getMergedDirectives() {
    var existingDirectives = schema.getDirectives().map(extendDirective);
    !existingDirectives ? (0, _invariant.default)(0, 'schema must have default directives') : void 0;
    return existingDirectives.concat(directiveDefinitions.map(function (node) {
      return astBuilder.buildDirective(node);
    }));
  }

  function extendMaybeNamedType(type) {
    return type ? extendNamedType(type) : null;
  }

  function extendNamedType(type) {
    if ((0, _introspection.isIntrospectionType)(type) || (0, _scalars.isSpecifiedScalarType)(type)) {
      // Builtin types are not extended.
      return type;
    }

    var name = type.name;

    if (!extendTypeCache[name]) {
      if ((0, _definition.isScalarType)(type)) {
        extendTypeCache[name] = extendScalarType(type);
      } else if ((0, _definition.isObjectType)(type)) {
        extendTypeCache[name] = extendObjectType(type);
      } else if ((0, _definition.isInterfaceType)(type)) {
        extendTypeCache[name] = extendInterfaceType(type);
      } else if ((0, _definition.isUnionType)(type)) {
        extendTypeCache[name] = extendUnionType(type);
      } else if ((0, _definition.isEnumType)(type)) {
        extendTypeCache[name] = extendEnumType(type);
      } else if ((0, _definition.isInputObjectType)(type)) {
        extendTypeCache[name] = extendInputObjectType(type);
      }
    }

    return extendTypeCache[name];
  }

  function extendDirective(directive) {
    return new _directives.GraphQLDirective({
      name: directive.name,
      description: directive.description,
      locations: directive.locations,
      args: extendArgs(directive.args),
      astNode: directive.astNode
    });
  }

  function extendInputObjectType(type) {
    var name = type.name;
    var extensionASTNodes = typeExtensionsMap[name] ? type.extensionASTNodes ? type.extensionASTNodes.concat(typeExtensionsMap[name]) : typeExtensionsMap[name] : type.extensionASTNodes;
    return new _definition.GraphQLInputObjectType({
      name: name,
      description: type.description,
      fields: function fields() {
        return extendInputFieldMap(type);
      },
      astNode: type.astNode,
      extensionASTNodes: extensionASTNodes
    });
  }

  function extendInputFieldMap(type) {
    var newFieldMap = Object.create(null);
    var oldFieldMap = type.getFields();

    var _arr = Object.keys(oldFieldMap);

    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
      var _fieldName = _arr[_i2];
      var _field = oldFieldMap[_fieldName];
      newFieldMap[_fieldName] = {
        description: _field.description,
        type: extendType(_field.type),
        defaultValue: _field.defaultValue,
        astNode: _field.astNode
      };
    } // If there are any extensions to the fields, apply those here.


    var extensions = typeExtensionsMap[type.name];

    if (extensions) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = extensions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var extension = _step2.value;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = extension.fields[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var field = _step3.value;
              var fieldName = field.name.value;

              if (oldFieldMap[fieldName]) {
                throw new _GraphQLError.GraphQLError("Field \"".concat(type.name, ".").concat(fieldName, "\" already exists in the ") + 'schema. It cannot also be defined in this type extension.', [field]);
              }

              newFieldMap[fieldName] = astBuilder.buildInputField(field);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    return newFieldMap;
  }

  function extendEnumType(type) {
    var name = type.name;
    var extensionASTNodes = typeExtensionsMap[name] ? type.extensionASTNodes ? type.extensionASTNodes.concat(typeExtensionsMap[name]) : typeExtensionsMap[name] : type.extensionASTNodes;
    return new _definition.GraphQLEnumType({
      name: name,
      description: type.description,
      values: extendValueMap(type),
      astNode: type.astNode,
      extensionASTNodes: extensionASTNodes
    });
  }

  function extendValueMap(type) {
    var newValueMap = Object.create(null);
    var oldValueMap = (0, _keyMap.default)(type.getValues(), function (value) {
      return value.name;
    });

    var _arr2 = Object.keys(oldValueMap);

    for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
      var _valueName = _arr2[_i3];
      var _value = oldValueMap[_valueName];
      newValueMap[_valueName] = {
        name: _value.name,
        description: _value.description,
        value: _value.value,
        deprecationReason: _value.deprecationReason,
        astNode: _value.astNode
      };
    } // If there are any extensions to the values, apply those here.


    var extensions = typeExtensionsMap[type.name];

    if (extensions) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = extensions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var extension = _step4.value;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = extension.values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var value = _step5.value;
              var valueName = value.name.value;

              if (oldValueMap[valueName]) {
                throw new _GraphQLError.GraphQLError("Enum value \"".concat(type.name, ".").concat(valueName, "\" already exists in the ") + 'schema. It cannot also be defined in this type extension.', [value]);
              }

              newValueMap[valueName] = astBuilder.buildEnumValue(value);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    return newValueMap;
  }

  function extendScalarType(type) {
    var name = type.name;
    var extensionASTNodes = typeExtensionsMap[name] ? type.extensionASTNodes ? type.extensionASTNodes.concat(typeExtensionsMap[name]) : typeExtensionsMap[name] : type.extensionASTNodes;
    return new _definition.GraphQLScalarType({
      name: name,
      description: type.description,
      astNode: type.astNode,
      extensionASTNodes: extensionASTNodes,
      serialize: type.serialize,
      parseValue: type.parseValue,
      parseLiteral: type.parseLiteral
    });
  }

  function extendObjectType(type) {
    var name = type.name;
    var extensionASTNodes = typeExtensionsMap[name] ? type.extensionASTNodes ? type.extensionASTNodes.concat(typeExtensionsMap[name]) : typeExtensionsMap[name] : type.extensionASTNodes;
    return new _definition.GraphQLObjectType({
      name: name,
      description: type.description,
      interfaces: function interfaces() {
        return extendImplementedInterfaces(type);
      },
      fields: function fields() {
        return extendFieldMap(type);
      },
      astNode: type.astNode,
      extensionASTNodes: extensionASTNodes,
      isTypeOf: type.isTypeOf
    });
  }

  function extendArgs(args) {
    return (0, _keyValMap.default)(args, function (arg) {
      return arg.name;
    }, function (arg) {
      return {
        type: extendType(arg.type),
        defaultValue: arg.defaultValue,
        description: arg.description,
        astNode: arg.astNode
      };
    });
  }

  function extendInterfaceType(type) {
    var name = type.name;
    var extensionASTNodes = typeExtensionsMap[name] ? type.extensionASTNodes ? type.extensionASTNodes.concat(typeExtensionsMap[name]) : typeExtensionsMap[name] : type.extensionASTNodes;
    return new _definition.GraphQLInterfaceType({
      name: type.name,
      description: type.description,
      fields: function fields() {
        return extendFieldMap(type);
      },
      astNode: type.astNode,
      extensionASTNodes: extensionASTNodes,
      resolveType: type.resolveType
    });
  }

  function extendUnionType(type) {
    var name = type.name;
    var extensionASTNodes = typeExtensionsMap[name] ? type.extensionASTNodes ? type.extensionASTNodes.concat(typeExtensionsMap[name]) : typeExtensionsMap[name] : type.extensionASTNodes;
    return new _definition.GraphQLUnionType({
      name: name,
      description: type.description,
      types: function types() {
        return extendPossibleTypes(type);
      },
      astNode: type.astNode,
      resolveType: type.resolveType,
      extensionASTNodes: extensionASTNodes
    });
  }

  function extendPossibleTypes(type) {
    var possibleTypes = type.getTypes().map(extendNamedType); // If there are any extensions to the union, apply those here.

    var extensions = typeExtensionsMap[type.name];

    if (extensions) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = extensions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var extension = _step6.value;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = extension.types[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var namedType = _step7.value;
              // Note: While this could make early assertions to get the correctly
              // typed values, that would throw immediately while type system
              // validation with validateSchema() will produce more actionable results.
              possibleTypes.push(astBuilder.buildType(namedType));
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    return possibleTypes;
  }

  function extendImplementedInterfaces(type) {
    var interfaces = type.getInterfaces().map(extendNamedType); // If there are any extensions to the interfaces, apply those here.

    var extensions = typeExtensionsMap[type.name];

    if (extensions) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = extensions[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var extension = _step8.value;
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = extension.interfaces[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var namedType = _step9.value;
              // Note: While this could make early assertions to get the correctly
              // typed values, that would throw immediately while type system
              // validation with validateSchema() will produce more actionable results.
              interfaces.push(astBuilder.buildType(namedType));
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }

    return interfaces;
  }

  function extendFieldMap(type) {
    var newFieldMap = Object.create(null);
    var oldFieldMap = type.getFields();

    var _arr3 = Object.keys(oldFieldMap);

    for (var _i4 = 0; _i4 < _arr3.length; _i4++) {
      var _fieldName2 = _arr3[_i4];
      var _field2 = oldFieldMap[_fieldName2];
      newFieldMap[_fieldName2] = {
        description: _field2.description,
        deprecationReason: _field2.deprecationReason,
        type: extendType(_field2.type),
        args: extendArgs(_field2.args),
        astNode: _field2.astNode,
        resolve: _field2.resolve
      };
    } // If there are any extensions to the fields, apply those here.


    var extensions = typeExtensionsMap[type.name];

    if (extensions) {
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = extensions[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var extension = _step10.value;
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = extension.fields[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var field = _step11.value;
              var fieldName = field.name.value;

              if (oldFieldMap[fieldName]) {
                throw new _GraphQLError.GraphQLError("Field \"".concat(type.name, ".").concat(fieldName, "\" already exists in the ") + 'schema. It cannot also be defined in this type extension.', [field]);
              }

              newFieldMap[fieldName] = astBuilder.buildField(field);
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
                _iterator11.return();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }

    return newFieldMap;
  }

  function extendType(typeDef) {
    if ((0, _definition.isListType)(typeDef)) {
      return (0, _definition.GraphQLList)(extendType(typeDef.ofType));
    }

    if ((0, _definition.isNonNullType)(typeDef)) {
      return (0, _definition.GraphQLNonNull)(extendType(typeDef.ofType));
    }

    return extendNamedType(typeDef);
  }
}

function checkExtensionNode(type, node) {
  switch (node.kind) {
    case _kinds.Kind.OBJECT_TYPE_EXTENSION:
      if (!(0, _definition.isObjectType)(type)) {
        throw new _GraphQLError.GraphQLError("Cannot extend non-object type \"".concat(type.name, "\"."), [node]);
      }

      break;

    case _kinds.Kind.INTERFACE_TYPE_EXTENSION:
      if (!(0, _definition.isInterfaceType)(type)) {
        throw new _GraphQLError.GraphQLError("Cannot extend non-interface type \"".concat(type.name, "\"."), [node]);
      }

      break;

    case _kinds.Kind.ENUM_TYPE_EXTENSION:
      if (!(0, _definition.isEnumType)(type)) {
        throw new _GraphQLError.GraphQLError("Cannot extend non-enum type \"".concat(type.name, "\"."), [node]);
      }

      break;

    case _kinds.Kind.UNION_TYPE_EXTENSION:
      if (!(0, _definition.isUnionType)(type)) {
        throw new _GraphQLError.GraphQLError("Cannot extend non-union type \"".concat(type.name, "\"."), [node]);
      }

      break;

    case _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION:
      if (!(0, _definition.isInputObjectType)(type)) {
        throw new _GraphQLError.GraphQLError("Cannot extend non-input object type \"".concat(type.name, "\"."), [node]);
      }

      break;
  }
}
},{"../error/GraphQLError":3,"../jsutils/invariant":19,"../jsutils/keyMap":25,"../jsutils/keyValMap":26,"../jsutils/objectValues":28,"../language/kinds":37,"../language/predicates":41,"../type/definition":48,"../type/directives":49,"../type/introspection":51,"../type/scalars":52,"../type/schema":53,"../validation/validate":109,"./buildASTSchema":58}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBreakingChanges = findBreakingChanges;
exports.findDangerousChanges = findDangerousChanges;
exports.findRemovedTypes = findRemovedTypes;
exports.findTypesThatChangedKind = findTypesThatChangedKind;
exports.findArgChanges = findArgChanges;
exports.findFieldsThatChangedTypeOnObjectOrInterfaceTypes = findFieldsThatChangedTypeOnObjectOrInterfaceTypes;
exports.findFieldsThatChangedTypeOnInputObjectTypes = findFieldsThatChangedTypeOnInputObjectTypes;
exports.findTypesRemovedFromUnions = findTypesRemovedFromUnions;
exports.findTypesAddedToUnions = findTypesAddedToUnions;
exports.findValuesRemovedFromEnums = findValuesRemovedFromEnums;
exports.findValuesAddedToEnums = findValuesAddedToEnums;
exports.findInterfacesRemovedFromObjectTypes = findInterfacesRemovedFromObjectTypes;
exports.findInterfacesAddedToObjectTypes = findInterfacesAddedToObjectTypes;
exports.findRemovedDirectives = findRemovedDirectives;
exports.findRemovedDirectiveArgs = findRemovedDirectiveArgs;
exports.findAddedNonNullDirectiveArgs = findAddedNonNullDirectiveArgs;
exports.findRemovedLocationsForDirective = findRemovedLocationsForDirective;
exports.findRemovedDirectiveLocations = findRemovedDirectiveLocations;
exports.DangerousChangeType = exports.BreakingChangeType = void 0;

var _definition = require("../type/definition");

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
var BreakingChangeType = {
  FIELD_CHANGED_KIND: 'FIELD_CHANGED_KIND',
  FIELD_REMOVED: 'FIELD_REMOVED',
  TYPE_CHANGED_KIND: 'TYPE_CHANGED_KIND',
  TYPE_REMOVED: 'TYPE_REMOVED',
  TYPE_REMOVED_FROM_UNION: 'TYPE_REMOVED_FROM_UNION',
  VALUE_REMOVED_FROM_ENUM: 'VALUE_REMOVED_FROM_ENUM',
  ARG_REMOVED: 'ARG_REMOVED',
  ARG_CHANGED_KIND: 'ARG_CHANGED_KIND',
  REQUIRED_ARG_ADDED: 'REQUIRED_ARG_ADDED',
  REQUIRED_INPUT_FIELD_ADDED: 'REQUIRED_INPUT_FIELD_ADDED',
  INTERFACE_REMOVED_FROM_OBJECT: 'INTERFACE_REMOVED_FROM_OBJECT',
  DIRECTIVE_REMOVED: 'DIRECTIVE_REMOVED',
  DIRECTIVE_ARG_REMOVED: 'DIRECTIVE_ARG_REMOVED',
  DIRECTIVE_LOCATION_REMOVED: 'DIRECTIVE_LOCATION_REMOVED',
  REQUIRED_DIRECTIVE_ARG_ADDED: 'REQUIRED_DIRECTIVE_ARG_ADDED'
};
exports.BreakingChangeType = BreakingChangeType;
var DangerousChangeType = {
  ARG_DEFAULT_VALUE_CHANGE: 'ARG_DEFAULT_VALUE_CHANGE',
  VALUE_ADDED_TO_ENUM: 'VALUE_ADDED_TO_ENUM',
  INTERFACE_ADDED_TO_OBJECT: 'INTERFACE_ADDED_TO_OBJECT',
  TYPE_ADDED_TO_UNION: 'TYPE_ADDED_TO_UNION',
  OPTIONAL_INPUT_FIELD_ADDED: 'OPTIONAL_INPUT_FIELD_ADDED',
  OPTIONAL_ARG_ADDED: 'OPTIONAL_ARG_ADDED'
};
exports.DangerousChangeType = DangerousChangeType;

/**
 * Given two schemas, returns an Array containing descriptions of all the types
 * of breaking changes covered by the other functions down below.
 */
function findBreakingChanges(oldSchema, newSchema) {
  return findRemovedTypes(oldSchema, newSchema).concat(findTypesThatChangedKind(oldSchema, newSchema), findFieldsThatChangedTypeOnObjectOrInterfaceTypes(oldSchema, newSchema), findFieldsThatChangedTypeOnInputObjectTypes(oldSchema, newSchema).breakingChanges, findTypesRemovedFromUnions(oldSchema, newSchema), findValuesRemovedFromEnums(oldSchema, newSchema), findArgChanges(oldSchema, newSchema).breakingChanges, findInterfacesRemovedFromObjectTypes(oldSchema, newSchema), findRemovedDirectives(oldSchema, newSchema), findRemovedDirectiveArgs(oldSchema, newSchema), findAddedNonNullDirectiveArgs(oldSchema, newSchema), findRemovedDirectiveLocations(oldSchema, newSchema));
}
/**
 * Given two schemas, returns an Array containing descriptions of all the types
 * of potentially dangerous changes covered by the other functions down below.
 */


function findDangerousChanges(oldSchema, newSchema) {
  return findArgChanges(oldSchema, newSchema).dangerousChanges.concat(findValuesAddedToEnums(oldSchema, newSchema), findInterfacesAddedToObjectTypes(oldSchema, newSchema), findTypesAddedToUnions(oldSchema, newSchema), findFieldsThatChangedTypeOnInputObjectTypes(oldSchema, newSchema).dangerousChanges);
}
/**
 * Given two schemas, returns an Array containing descriptions of any breaking
 * changes in the newSchema related to removing an entire type.
 */


function findRemovedTypes(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var breakingChanges = [];

  var _arr = Object.keys(oldTypeMap);

  for (var _i = 0; _i < _arr.length; _i++) {
    var typeName = _arr[_i];

    if (!newTypeMap[typeName]) {
      breakingChanges.push({
        type: BreakingChangeType.TYPE_REMOVED,
        description: "".concat(typeName, " was removed.")
      });
    }
  }

  return breakingChanges;
}
/**
 * Given two schemas, returns an Array containing descriptions of any breaking
 * changes in the newSchema related to changing the type of a type.
 */


function findTypesThatChangedKind(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var breakingChanges = [];

  var _arr2 = Object.keys(oldTypeMap);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var typeName = _arr2[_i2];

    if (!newTypeMap[typeName]) {
      continue;
    }

    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (oldType.constructor !== newType.constructor) {
      breakingChanges.push({
        type: BreakingChangeType.TYPE_CHANGED_KIND,
        description: "".concat(typeName, " changed from ") + "".concat(typeKindName(oldType), " to ").concat(typeKindName(newType), ".")
      });
    }
  }

  return breakingChanges;
}
/**
 * Given two schemas, returns an Array containing descriptions of any
 * breaking or dangerous changes in the newSchema related to arguments
 * (such as removal or change of type of an argument, or a change in an
 * argument's default value).
 */


function findArgChanges(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var breakingChanges = [];
  var dangerousChanges = [];

  var _arr3 = Object.keys(oldTypeMap);

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var typeName = _arr3[_i3];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!((0, _definition.isObjectType)(oldType) || (0, _definition.isInterfaceType)(oldType)) || !((0, _definition.isObjectType)(newType) || (0, _definition.isInterfaceType)(newType)) || newType.constructor !== oldType.constructor) {
      continue;
    }

    var oldTypeFields = oldType.getFields();
    var newTypeFields = newType.getFields();

    var _arr4 = Object.keys(oldTypeFields);

    for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
      var fieldName = _arr4[_i4];

      if (!newTypeFields[fieldName]) {
        continue;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var oldArgDef = _step.value;
          var newArgs = newTypeFields[fieldName].args;
          var newArgDef = newArgs.find(function (arg) {
            return arg.name === oldArgDef.name;
          }); // Arg not present

          if (!newArgDef) {
            breakingChanges.push({
              type: BreakingChangeType.ARG_REMOVED,
              description: "".concat(oldType.name, ".").concat(fieldName, " arg ") + "".concat(oldArgDef.name, " was removed")
            });
          } else {
            var isSafe = isChangeSafeForInputObjectFieldOrFieldArg(oldArgDef.type, newArgDef.type);

            if (!isSafe) {
              breakingChanges.push({
                type: BreakingChangeType.ARG_CHANGED_KIND,
                description: "".concat(oldType.name, ".").concat(fieldName, " arg ") + "".concat(oldArgDef.name, " has changed type from ") + "".concat(oldArgDef.type.toString(), " to ").concat(newArgDef.type.toString())
              });
            } else if (oldArgDef.defaultValue !== undefined && oldArgDef.defaultValue !== newArgDef.defaultValue) {
              dangerousChanges.push({
                type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
                description: "".concat(oldType.name, ".").concat(fieldName, " arg ") + "".concat(oldArgDef.name, " has changed defaultValue")
              });
            }
          }
        };

        for (var _iterator = oldTypeFields[fieldName].args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        } // Check if arg was added to the field

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop2 = function _loop2() {
          var newArgDef = _step2.value;
          var oldArgs = oldTypeFields[fieldName].args;
          var oldArgDef = oldArgs.find(function (arg) {
            return arg.name === newArgDef.name;
          });

          if (!oldArgDef) {
            var argName = newArgDef.name;

            if ((0, _definition.isRequiredArgument)(newArgDef)) {
              breakingChanges.push({
                type: BreakingChangeType.REQUIRED_ARG_ADDED,
                description: "A required arg ".concat(argName, " on ") + "".concat(typeName, ".").concat(fieldName, " was added")
              });
            } else {
              dangerousChanges.push({
                type: DangerousChangeType.OPTIONAL_ARG_ADDED,
                description: "An optional arg ".concat(argName, " on ") + "".concat(typeName, ".").concat(fieldName, " was added")
              });
            }
          }
        };

        for (var _iterator2 = newTypeFields[fieldName].args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop2();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }

  return {
    breakingChanges: breakingChanges,
    dangerousChanges: dangerousChanges
  };
}

function typeKindName(type) {
  if ((0, _definition.isScalarType)(type)) {
    return 'a Scalar type';
  }

  if ((0, _definition.isObjectType)(type)) {
    return 'an Object type';
  }

  if ((0, _definition.isInterfaceType)(type)) {
    return 'an Interface type';
  }

  if ((0, _definition.isUnionType)(type)) {
    return 'a Union type';
  }

  if ((0, _definition.isEnumType)(type)) {
    return 'an Enum type';
  }

  if ((0, _definition.isInputObjectType)(type)) {
    return 'an Input type';
  }

  throw new TypeError('Unknown type ' + type.constructor.name);
}

function findFieldsThatChangedTypeOnObjectOrInterfaceTypes(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var breakingChanges = [];

  var _arr5 = Object.keys(oldTypeMap);

  for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
    var typeName = _arr5[_i5];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!((0, _definition.isObjectType)(oldType) || (0, _definition.isInterfaceType)(oldType)) || !((0, _definition.isObjectType)(newType) || (0, _definition.isInterfaceType)(newType)) || newType.constructor !== oldType.constructor) {
      continue;
    }

    var oldTypeFieldsDef = oldType.getFields();
    var newTypeFieldsDef = newType.getFields();

    var _arr6 = Object.keys(oldTypeFieldsDef);

    for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
      var fieldName = _arr6[_i6];

      // Check if the field is missing on the type in the new schema.
      if (!(fieldName in newTypeFieldsDef)) {
        breakingChanges.push({
          type: BreakingChangeType.FIELD_REMOVED,
          description: "".concat(typeName, ".").concat(fieldName, " was removed.")
        });
      } else {
        var oldFieldType = oldTypeFieldsDef[fieldName].type;
        var newFieldType = newTypeFieldsDef[fieldName].type;
        var isSafe = isChangeSafeForObjectOrInterfaceField(oldFieldType, newFieldType);

        if (!isSafe) {
          var oldFieldTypeString = (0, _definition.isNamedType)(oldFieldType) ? oldFieldType.name : oldFieldType.toString();
          var newFieldTypeString = (0, _definition.isNamedType)(newFieldType) ? newFieldType.name : newFieldType.toString();
          breakingChanges.push({
            type: BreakingChangeType.FIELD_CHANGED_KIND,
            description: "".concat(typeName, ".").concat(fieldName, " changed type from ") + "".concat(oldFieldTypeString, " to ").concat(newFieldTypeString, ".")
          });
        }
      }
    }
  }

  return breakingChanges;
}

function findFieldsThatChangedTypeOnInputObjectTypes(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var breakingChanges = [];
  var dangerousChanges = [];

  var _arr7 = Object.keys(oldTypeMap);

  for (var _i7 = 0; _i7 < _arr7.length; _i7++) {
    var typeName = _arr7[_i7];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isInputObjectType)(oldType) || !(0, _definition.isInputObjectType)(newType)) {
      continue;
    }

    var oldTypeFieldsDef = oldType.getFields();
    var newTypeFieldsDef = newType.getFields();

    var _arr8 = Object.keys(oldTypeFieldsDef);

    for (var _i8 = 0; _i8 < _arr8.length; _i8++) {
      var fieldName = _arr8[_i8];

      // Check if the field is missing on the type in the new schema.
      if (!(fieldName in newTypeFieldsDef)) {
        breakingChanges.push({
          type: BreakingChangeType.FIELD_REMOVED,
          description: "".concat(typeName, ".").concat(fieldName, " was removed.")
        });
      } else {
        var oldFieldType = oldTypeFieldsDef[fieldName].type;
        var newFieldType = newTypeFieldsDef[fieldName].type;
        var isSafe = isChangeSafeForInputObjectFieldOrFieldArg(oldFieldType, newFieldType);

        if (!isSafe) {
          var oldFieldTypeString = (0, _definition.isNamedType)(oldFieldType) ? oldFieldType.name : oldFieldType.toString();
          var newFieldTypeString = (0, _definition.isNamedType)(newFieldType) ? newFieldType.name : newFieldType.toString();
          breakingChanges.push({
            type: BreakingChangeType.FIELD_CHANGED_KIND,
            description: "".concat(typeName, ".").concat(fieldName, " changed type from ") + "".concat(oldFieldTypeString, " to ").concat(newFieldTypeString, ".")
          });
        }
      }
    } // Check if a field was added to the input object type


    var _arr9 = Object.keys(newTypeFieldsDef);

    for (var _i9 = 0; _i9 < _arr9.length; _i9++) {
      var _fieldName = _arr9[_i9];

      if (!(_fieldName in oldTypeFieldsDef)) {
        if ((0, _definition.isRequiredInputField)(newTypeFieldsDef[_fieldName])) {
          breakingChanges.push({
            type: BreakingChangeType.REQUIRED_INPUT_FIELD_ADDED,
            description: "A required field ".concat(_fieldName, " on ") + "input type ".concat(typeName, " was added.")
          });
        } else {
          dangerousChanges.push({
            type: DangerousChangeType.OPTIONAL_INPUT_FIELD_ADDED,
            description: "An optional field ".concat(_fieldName, " on ") + "input type ".concat(typeName, " was added.")
          });
        }
      }
    }
  }

  return {
    breakingChanges: breakingChanges,
    dangerousChanges: dangerousChanges
  };
}

function isChangeSafeForObjectOrInterfaceField(oldType, newType) {
  if ((0, _definition.isNamedType)(oldType)) {
    return (// if they're both named types, see if their names are equivalent
      (0, _definition.isNamedType)(newType) && oldType.name === newType.name || // moving from nullable to non-null of the same underlying type is safe
      (0, _definition.isNonNullType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType)
    );
  } else if ((0, _definition.isListType)(oldType)) {
    return (// if they're both lists, make sure the underlying types are compatible
      (0, _definition.isListType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType) || // moving from nullable to non-null of the same underlying type is safe
      (0, _definition.isNonNullType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType)
    );
  } else if ((0, _definition.isNonNullType)(oldType)) {
    // if they're both non-null, make sure the underlying types are compatible
    return (0, _definition.isNonNullType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType);
  }

  return false;
}

function isChangeSafeForInputObjectFieldOrFieldArg(oldType, newType) {
  if ((0, _definition.isNamedType)(oldType)) {
    // if they're both named types, see if their names are equivalent
    return (0, _definition.isNamedType)(newType) && oldType.name === newType.name;
  } else if ((0, _definition.isListType)(oldType)) {
    // if they're both lists, make sure the underlying types are compatible
    return (0, _definition.isListType)(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType);
  } else if ((0, _definition.isNonNullType)(oldType)) {
    return (// if they're both non-null, make sure the underlying types are
      // compatible
      (0, _definition.isNonNullType)(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType) || // moving from non-null to nullable of the same underlying type is safe
      !(0, _definition.isNonNullType)(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType)
    );
  }

  return false;
}
/**
 * Given two schemas, returns an Array containing descriptions of any breaking
 * changes in the newSchema related to removing types from a union type.
 */


function findTypesRemovedFromUnions(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var typesRemovedFromUnion = [];

  var _arr10 = Object.keys(oldTypeMap);

  for (var _i10 = 0; _i10 < _arr10.length; _i10++) {
    var typeName = _arr10[_i10];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isUnionType)(oldType) || !(0, _definition.isUnionType)(newType)) {
      continue;
    }

    var typeNamesInNewUnion = Object.create(null);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = newType.getTypes()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var type = _step3.value;
        typeNamesInNewUnion[type.name] = true;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = oldType.getTypes()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _type = _step4.value;

        if (!typeNamesInNewUnion[_type.name]) {
          typesRemovedFromUnion.push({
            type: BreakingChangeType.TYPE_REMOVED_FROM_UNION,
            description: "".concat(_type.name, " was removed from union type ").concat(typeName, ".")
          });
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  return typesRemovedFromUnion;
}
/**
 * Given two schemas, returns an Array containing descriptions of any dangerous
 * changes in the newSchema related to adding types to a union type.
 */


function findTypesAddedToUnions(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var typesAddedToUnion = [];

  var _arr11 = Object.keys(newTypeMap);

  for (var _i11 = 0; _i11 < _arr11.length; _i11++) {
    var typeName = _arr11[_i11];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isUnionType)(oldType) || !(0, _definition.isUnionType)(newType)) {
      continue;
    }

    var typeNamesInOldUnion = Object.create(null);
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = oldType.getTypes()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var type = _step5.value;
        typeNamesInOldUnion[type.name] = true;
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = newType.getTypes()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _type2 = _step6.value;

        if (!typeNamesInOldUnion[_type2.name]) {
          typesAddedToUnion.push({
            type: DangerousChangeType.TYPE_ADDED_TO_UNION,
            description: "".concat(_type2.name, " was added to union type ").concat(typeName, ".")
          });
        }
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }

  return typesAddedToUnion;
}
/**
 * Given two schemas, returns an Array containing descriptions of any breaking
 * changes in the newSchema related to removing values from an enum type.
 */


function findValuesRemovedFromEnums(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var valuesRemovedFromEnums = [];

  var _arr12 = Object.keys(oldTypeMap);

  for (var _i12 = 0; _i12 < _arr12.length; _i12++) {
    var typeName = _arr12[_i12];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isEnumType)(oldType) || !(0, _definition.isEnumType)(newType)) {
      continue;
    }

    var valuesInNewEnum = Object.create(null);
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = newType.getValues()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var value = _step7.value;
        valuesInNewEnum[value.name] = true;
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = oldType.getValues()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var _value = _step8.value;

        if (!valuesInNewEnum[_value.name]) {
          valuesRemovedFromEnums.push({
            type: BreakingChangeType.VALUE_REMOVED_FROM_ENUM,
            description: "".concat(_value.name, " was removed from enum type ").concat(typeName, ".")
          });
        }
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
          _iterator8.return();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  }

  return valuesRemovedFromEnums;
}
/**
 * Given two schemas, returns an Array containing descriptions of any dangerous
 * changes in the newSchema related to adding values to an enum type.
 */


function findValuesAddedToEnums(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var valuesAddedToEnums = [];

  var _arr13 = Object.keys(oldTypeMap);

  for (var _i13 = 0; _i13 < _arr13.length; _i13++) {
    var typeName = _arr13[_i13];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isEnumType)(oldType) || !(0, _definition.isEnumType)(newType)) {
      continue;
    }

    var valuesInOldEnum = Object.create(null);
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = oldType.getValues()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var value = _step9.value;
        valuesInOldEnum[value.name] = true;
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
          _iterator9.return();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }

    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = newType.getValues()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var _value2 = _step10.value;

        if (!valuesInOldEnum[_value2.name]) {
          valuesAddedToEnums.push({
            type: DangerousChangeType.VALUE_ADDED_TO_ENUM,
            description: "".concat(_value2.name, " was added to enum type ").concat(typeName, ".")
          });
        }
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
          _iterator10.return();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
    }
  }

  return valuesAddedToEnums;
}

function findInterfacesRemovedFromObjectTypes(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var breakingChanges = [];

  var _arr14 = Object.keys(oldTypeMap);

  for (var _i14 = 0; _i14 < _arr14.length; _i14++) {
    var typeName = _arr14[_i14];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isObjectType)(oldType) || !(0, _definition.isObjectType)(newType)) {
      continue;
    }

    var oldInterfaces = oldType.getInterfaces();
    var newInterfaces = newType.getInterfaces();
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      var _loop3 = function _loop3() {
        var oldInterface = _step11.value;

        if (!newInterfaces.some(function (int) {
          return int.name === oldInterface.name;
        })) {
          breakingChanges.push({
            type: BreakingChangeType.INTERFACE_REMOVED_FROM_OBJECT,
            description: "".concat(typeName, " no longer implements interface ") + "".concat(oldInterface.name, ".")
          });
        }
      };

      for (var _iterator11 = oldInterfaces[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        _loop3();
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
          _iterator11.return();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }
  }

  return breakingChanges;
}

function findInterfacesAddedToObjectTypes(oldSchema, newSchema) {
  var oldTypeMap = oldSchema.getTypeMap();
  var newTypeMap = newSchema.getTypeMap();
  var interfacesAddedToObjectTypes = [];

  var _arr15 = Object.keys(newTypeMap);

  for (var _i15 = 0; _i15 < _arr15.length; _i15++) {
    var typeName = _arr15[_i15];
    var oldType = oldTypeMap[typeName];
    var newType = newTypeMap[typeName];

    if (!(0, _definition.isObjectType)(oldType) || !(0, _definition.isObjectType)(newType)) {
      continue;
    }

    var oldInterfaces = oldType.getInterfaces();
    var newInterfaces = newType.getInterfaces();
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      var _loop4 = function _loop4() {
        var newInterface = _step12.value;

        if (!oldInterfaces.some(function (int) {
          return int.name === newInterface.name;
        })) {
          interfacesAddedToObjectTypes.push({
            type: DangerousChangeType.INTERFACE_ADDED_TO_OBJECT,
            description: "".concat(newInterface.name, " added to interfaces implemented ") + "by ".concat(typeName, ".")
          });
        }
      };

      for (var _iterator12 = newInterfaces[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        _loop4();
      }
    } catch (err) {
      _didIteratorError12 = true;
      _iteratorError12 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
          _iterator12.return();
        }
      } finally {
        if (_didIteratorError12) {
          throw _iteratorError12;
        }
      }
    }
  }

  return interfacesAddedToObjectTypes;
}

function findRemovedDirectives(oldSchema, newSchema) {
  var removedDirectives = [];
  var newSchemaDirectiveMap = getDirectiveMapForSchema(newSchema);
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = oldSchema.getDirectives()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var directive = _step13.value;

      if (!newSchemaDirectiveMap[directive.name]) {
        removedDirectives.push({
          type: BreakingChangeType.DIRECTIVE_REMOVED,
          description: "".concat(directive.name, " was removed")
        });
      }
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
        _iterator13.return();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return removedDirectives;
}

function findRemovedArgsForDirective(oldDirective, newDirective) {
  var removedArgs = [];
  var newArgMap = getArgumentMapForDirective(newDirective);
  var _iteratorNormalCompletion14 = true;
  var _didIteratorError14 = false;
  var _iteratorError14 = undefined;

  try {
    for (var _iterator14 = oldDirective.args[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
      var arg = _step14.value;

      if (!newArgMap[arg.name]) {
        removedArgs.push(arg);
      }
    }
  } catch (err) {
    _didIteratorError14 = true;
    _iteratorError14 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
        _iterator14.return();
      }
    } finally {
      if (_didIteratorError14) {
        throw _iteratorError14;
      }
    }
  }

  return removedArgs;
}

function findRemovedDirectiveArgs(oldSchema, newSchema) {
  var removedDirectiveArgs = [];
  var oldSchemaDirectiveMap = getDirectiveMapForSchema(oldSchema);
  var _iteratorNormalCompletion15 = true;
  var _didIteratorError15 = false;
  var _iteratorError15 = undefined;

  try {
    for (var _iterator15 = newSchema.getDirectives()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
      var newDirective = _step15.value;
      var oldDirective = oldSchemaDirectiveMap[newDirective.name];

      if (!oldDirective) {
        continue;
      }

      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = findRemovedArgsForDirective(oldDirective, newDirective)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var arg = _step16.value;
          removedDirectiveArgs.push({
            type: BreakingChangeType.DIRECTIVE_ARG_REMOVED,
            description: "".concat(arg.name, " was removed from ").concat(newDirective.name)
          });
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return != null) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError15 = true;
    _iteratorError15 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion15 && _iterator15.return != null) {
        _iterator15.return();
      }
    } finally {
      if (_didIteratorError15) {
        throw _iteratorError15;
      }
    }
  }

  return removedDirectiveArgs;
}

function findAddedArgsForDirective(oldDirective, newDirective) {
  var addedArgs = [];
  var oldArgMap = getArgumentMapForDirective(oldDirective);
  var _iteratorNormalCompletion17 = true;
  var _didIteratorError17 = false;
  var _iteratorError17 = undefined;

  try {
    for (var _iterator17 = newDirective.args[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
      var arg = _step17.value;

      if (!oldArgMap[arg.name]) {
        addedArgs.push(arg);
      }
    }
  } catch (err) {
    _didIteratorError17 = true;
    _iteratorError17 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion17 && _iterator17.return != null) {
        _iterator17.return();
      }
    } finally {
      if (_didIteratorError17) {
        throw _iteratorError17;
      }
    }
  }

  return addedArgs;
}

function findAddedNonNullDirectiveArgs(oldSchema, newSchema) {
  var addedNonNullableArgs = [];
  var oldSchemaDirectiveMap = getDirectiveMapForSchema(oldSchema);
  var _iteratorNormalCompletion18 = true;
  var _didIteratorError18 = false;
  var _iteratorError18 = undefined;

  try {
    for (var _iterator18 = newSchema.getDirectives()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
      var newDirective = _step18.value;
      var oldDirective = oldSchemaDirectiveMap[newDirective.name];

      if (!oldDirective) {
        continue;
      }

      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = findAddedArgsForDirective(oldDirective, newDirective)[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var arg = _step19.value;

          if ((0, _definition.isRequiredArgument)(arg)) {
            addedNonNullableArgs.push({
              type: BreakingChangeType.REQUIRED_DIRECTIVE_ARG_ADDED,
              description: "A required arg ".concat(arg.name, " on directive ") + "".concat(newDirective.name, " was added")
            });
          }
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19.return != null) {
            _iterator19.return();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError18 = true;
    _iteratorError18 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion18 && _iterator18.return != null) {
        _iterator18.return();
      }
    } finally {
      if (_didIteratorError18) {
        throw _iteratorError18;
      }
    }
  }

  return addedNonNullableArgs;
}

function findRemovedLocationsForDirective(oldDirective, newDirective) {
  var removedLocations = [];
  var newLocationSet = new Set(newDirective.locations);
  var _iteratorNormalCompletion20 = true;
  var _didIteratorError20 = false;
  var _iteratorError20 = undefined;

  try {
    for (var _iterator20 = oldDirective.locations[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
      var oldLocation = _step20.value;

      if (!newLocationSet.has(oldLocation)) {
        removedLocations.push(oldLocation);
      }
    }
  } catch (err) {
    _didIteratorError20 = true;
    _iteratorError20 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion20 && _iterator20.return != null) {
        _iterator20.return();
      }
    } finally {
      if (_didIteratorError20) {
        throw _iteratorError20;
      }
    }
  }

  return removedLocations;
}

function findRemovedDirectiveLocations(oldSchema, newSchema) {
  var removedLocations = [];
  var oldSchemaDirectiveMap = getDirectiveMapForSchema(oldSchema);
  var _iteratorNormalCompletion21 = true;
  var _didIteratorError21 = false;
  var _iteratorError21 = undefined;

  try {
    for (var _iterator21 = newSchema.getDirectives()[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
      var newDirective = _step21.value;
      var oldDirective = oldSchemaDirectiveMap[newDirective.name];

      if (!oldDirective) {
        continue;
      }

      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = findRemovedLocationsForDirective(oldDirective, newDirective)[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var location = _step22.value;
          removedLocations.push({
            type: BreakingChangeType.DIRECTIVE_LOCATION_REMOVED,
            description: "".concat(location, " was removed from ").concat(newDirective.name)
          });
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22.return != null) {
            _iterator22.return();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError21 = true;
    _iteratorError21 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion21 && _iterator21.return != null) {
        _iterator21.return();
      }
    } finally {
      if (_didIteratorError21) {
        throw _iteratorError21;
      }
    }
  }

  return removedLocations;
}

function getDirectiveMapForSchema(schema) {
  return (0, _keyMap.default)(schema.getDirectives(), function (dir) {
    return dir.name;
  });
}

function getArgumentMapForDirective(directive) {
  return (0, _keyMap.default)(directive.args, function (arg) {
    return arg.name;
  });
}
},{"../jsutils/keyMap":25,"../type/definition":48}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDeprecatedUsages = findDeprecatedUsages;

var _GraphQLError = require("../error/GraphQLError");

var _visitor = require("../language/visitor");

var _definition = require("../type/definition");

var _TypeInfo = require("./TypeInfo");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * A validation rule which reports deprecated usages.
 *
 * Returns a list of GraphQLError instances describing each deprecated use.
 */
function findDeprecatedUsages(schema, ast) {
  var errors = [];
  var typeInfo = new _TypeInfo.TypeInfo(schema);
  (0, _visitor.visit)(ast, (0, _visitor.visitWithTypeInfo)(typeInfo, {
    Field: function Field(node) {
      var fieldDef = typeInfo.getFieldDef();

      if (fieldDef && fieldDef.isDeprecated) {
        var parentType = typeInfo.getParentType();

        if (parentType) {
          var reason = fieldDef.deprecationReason;
          errors.push(new _GraphQLError.GraphQLError("The field ".concat(parentType.name, ".").concat(fieldDef.name, " is deprecated.") + (reason ? ' ' + reason : ''), [node]));
        }
      }
    },
    EnumValue: function EnumValue(node) {
      var enumVal = typeInfo.getEnumValue();

      if (enumVal && enumVal.isDeprecated) {
        var type = (0, _definition.getNamedType)(typeInfo.getInputType());

        if (type) {
          var reason = enumVal.deprecationReason;
          errors.push(new _GraphQLError.GraphQLError("The enum value ".concat(type.name, ".").concat(enumVal.name, " is deprecated.") + (reason ? ' ' + reason : ''), [node]));
        }
      }
    }
  }));
  return errors;
}
},{"../error/GraphQLError":3,"../language/visitor":44,"../type/definition":48,"./TypeInfo":55}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperationAST = getOperationAST;

var _kinds = require("../language/kinds");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Returns an operation AST given a document AST and optionally an operation
 * name. If a name is not provided, an operation is only returned if only one is
 * provided in the document.
 */
function getOperationAST(documentAST, operationName) {
  var operation = null;

  for (var i = 0; i < documentAST.definitions.length; i++) {
    var definition = documentAST.definitions[i];

    if (definition.kind === _kinds.Kind.OPERATION_DEFINITION) {
      if (!operationName) {
        // If no operation name was provided, only return an Operation if there
        // is one defined in the document. Upon encountering the second, return
        // null.
        if (operation) {
          return null;
        }

        operation = definition;
      } else if (definition.name && definition.name.value === operationName) {
        return definition;
      }
    }
  }

  return operation;
}
},{"../language/kinds":37}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperationRootType = getOperationRootType;

var _GraphQLError = require("../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Extracts the root type of the operation from the schema.
 */
function getOperationRootType(schema, operation) {
  switch (operation.operation) {
    case 'query':
      var queryType = schema.getQueryType();

      if (!queryType) {
        throw new _GraphQLError.GraphQLError('Schema does not define the required query root type.', [operation]);
      }

      return queryType;

    case 'mutation':
      var mutationType = schema.getMutationType();

      if (!mutationType) {
        throw new _GraphQLError.GraphQLError('Schema is not configured for mutations.', [operation]);
      }

      return mutationType;

    case 'subscription':
      var subscriptionType = schema.getSubscriptionType();

      if (!subscriptionType) {
        throw new _GraphQLError.GraphQLError('Schema is not configured for subscriptions.', [operation]);
      }

      return subscriptionType;

    default:
      throw new _GraphQLError.GraphQLError('Can only have query, mutation and subscription operations.', [operation]);
  }
}
},{"../error/GraphQLError":3}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getIntrospectionQuery", {
  enumerable: true,
  get: function get() {
    return _introspectionQuery.getIntrospectionQuery;
  }
});
Object.defineProperty(exports, "introspectionQuery", {
  enumerable: true,
  get: function get() {
    return _introspectionQuery.introspectionQuery;
  }
});
Object.defineProperty(exports, "getOperationAST", {
  enumerable: true,
  get: function get() {
    return _getOperationAST.getOperationAST;
  }
});
Object.defineProperty(exports, "getOperationRootType", {
  enumerable: true,
  get: function get() {
    return _getOperationRootType.getOperationRootType;
  }
});
Object.defineProperty(exports, "introspectionFromSchema", {
  enumerable: true,
  get: function get() {
    return _introspectionFromSchema.introspectionFromSchema;
  }
});
Object.defineProperty(exports, "buildClientSchema", {
  enumerable: true,
  get: function get() {
    return _buildClientSchema.buildClientSchema;
  }
});
Object.defineProperty(exports, "buildASTSchema", {
  enumerable: true,
  get: function get() {
    return _buildASTSchema.buildASTSchema;
  }
});
Object.defineProperty(exports, "buildSchema", {
  enumerable: true,
  get: function get() {
    return _buildASTSchema.buildSchema;
  }
});
Object.defineProperty(exports, "getDescription", {
  enumerable: true,
  get: function get() {
    return _buildASTSchema.getDescription;
  }
});
Object.defineProperty(exports, "extendSchema", {
  enumerable: true,
  get: function get() {
    return _extendSchema.extendSchema;
  }
});
Object.defineProperty(exports, "lexicographicSortSchema", {
  enumerable: true,
  get: function get() {
    return _lexicographicSortSchema.lexicographicSortSchema;
  }
});
Object.defineProperty(exports, "printSchema", {
  enumerable: true,
  get: function get() {
    return _schemaPrinter.printSchema;
  }
});
Object.defineProperty(exports, "printType", {
  enumerable: true,
  get: function get() {
    return _schemaPrinter.printType;
  }
});
Object.defineProperty(exports, "printIntrospectionSchema", {
  enumerable: true,
  get: function get() {
    return _schemaPrinter.printIntrospectionSchema;
  }
});
Object.defineProperty(exports, "typeFromAST", {
  enumerable: true,
  get: function get() {
    return _typeFromAST.typeFromAST;
  }
});
Object.defineProperty(exports, "valueFromAST", {
  enumerable: true,
  get: function get() {
    return _valueFromAST.valueFromAST;
  }
});
Object.defineProperty(exports, "valueFromASTUntyped", {
  enumerable: true,
  get: function get() {
    return _valueFromASTUntyped.valueFromASTUntyped;
  }
});
Object.defineProperty(exports, "astFromValue", {
  enumerable: true,
  get: function get() {
    return _astFromValue.astFromValue;
  }
});
Object.defineProperty(exports, "TypeInfo", {
  enumerable: true,
  get: function get() {
    return _TypeInfo.TypeInfo;
  }
});
Object.defineProperty(exports, "coerceValue", {
  enumerable: true,
  get: function get() {
    return _coerceValue.coerceValue;
  }
});
Object.defineProperty(exports, "isValidJSValue", {
  enumerable: true,
  get: function get() {
    return _isValidJSValue.isValidJSValue;
  }
});
Object.defineProperty(exports, "isValidLiteralValue", {
  enumerable: true,
  get: function get() {
    return _isValidLiteralValue.isValidLiteralValue;
  }
});
Object.defineProperty(exports, "concatAST", {
  enumerable: true,
  get: function get() {
    return _concatAST.concatAST;
  }
});
Object.defineProperty(exports, "separateOperations", {
  enumerable: true,
  get: function get() {
    return _separateOperations.separateOperations;
  }
});
Object.defineProperty(exports, "isEqualType", {
  enumerable: true,
  get: function get() {
    return _typeComparators.isEqualType;
  }
});
Object.defineProperty(exports, "isTypeSubTypeOf", {
  enumerable: true,
  get: function get() {
    return _typeComparators.isTypeSubTypeOf;
  }
});
Object.defineProperty(exports, "doTypesOverlap", {
  enumerable: true,
  get: function get() {
    return _typeComparators.doTypesOverlap;
  }
});
Object.defineProperty(exports, "assertValidName", {
  enumerable: true,
  get: function get() {
    return _assertValidName.assertValidName;
  }
});
Object.defineProperty(exports, "isValidNameError", {
  enumerable: true,
  get: function get() {
    return _assertValidName.isValidNameError;
  }
});
Object.defineProperty(exports, "BreakingChangeType", {
  enumerable: true,
  get: function get() {
    return _findBreakingChanges.BreakingChangeType;
  }
});
Object.defineProperty(exports, "DangerousChangeType", {
  enumerable: true,
  get: function get() {
    return _findBreakingChanges.DangerousChangeType;
  }
});
Object.defineProperty(exports, "findBreakingChanges", {
  enumerable: true,
  get: function get() {
    return _findBreakingChanges.findBreakingChanges;
  }
});
Object.defineProperty(exports, "findDangerousChanges", {
  enumerable: true,
  get: function get() {
    return _findBreakingChanges.findDangerousChanges;
  }
});
Object.defineProperty(exports, "findDeprecatedUsages", {
  enumerable: true,
  get: function get() {
    return _findDeprecatedUsages.findDeprecatedUsages;
  }
});

var _introspectionQuery = require("./introspectionQuery");

var _getOperationAST = require("./getOperationAST");

var _getOperationRootType = require("./getOperationRootType");

var _introspectionFromSchema = require("./introspectionFromSchema");

var _buildClientSchema = require("./buildClientSchema");

var _buildASTSchema = require("./buildASTSchema");

var _extendSchema = require("./extendSchema");

var _lexicographicSortSchema = require("./lexicographicSortSchema");

var _schemaPrinter = require("./schemaPrinter");

var _typeFromAST = require("./typeFromAST");

var _valueFromAST = require("./valueFromAST");

var _valueFromASTUntyped = require("./valueFromASTUntyped");

var _astFromValue = require("./astFromValue");

var _TypeInfo = require("./TypeInfo");

var _coerceValue = require("./coerceValue");

var _isValidJSValue = require("./isValidJSValue");

var _isValidLiteralValue = require("./isValidLiteralValue");

var _concatAST = require("./concatAST");

var _separateOperations = require("./separateOperations");

var _typeComparators = require("./typeComparators");

var _assertValidName = require("./assertValidName");

var _findBreakingChanges = require("./findBreakingChanges");

var _findDeprecatedUsages = require("./findDeprecatedUsages");
},{"./TypeInfo":55,"./assertValidName":56,"./astFromValue":57,"./buildASTSchema":58,"./buildClientSchema":59,"./coerceValue":60,"./concatAST":61,"./extendSchema":62,"./findBreakingChanges":63,"./findDeprecatedUsages":64,"./getOperationAST":65,"./getOperationRootType":66,"./introspectionFromSchema":68,"./introspectionQuery":69,"./isValidJSValue":70,"./isValidLiteralValue":71,"./lexicographicSortSchema":72,"./schemaPrinter":73,"./separateOperations":74,"./typeComparators":75,"./typeFromAST":76,"./valueFromAST":77,"./valueFromASTUntyped":78}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.introspectionFromSchema = introspectionFromSchema;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _introspectionQuery = require("./introspectionQuery");

var _execute = require("../execution/execute");

var _parser = require("../language/parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Build an IntrospectionQuery from a GraphQLSchema
 *
 * IntrospectionQuery is useful for utilities that care about type and field
 * relationships, but do not need to traverse through those relationships.
 *
 * This is the inverse of buildClientSchema. The primary use case is outside
 * of the server context, for instance when doing schema comparisons.
 */
function introspectionFromSchema(schema, options) {
  var queryAST = (0, _parser.parse)((0, _introspectionQuery.getIntrospectionQuery)(options));
  var result = (0, _execute.execute)(schema, queryAST);
  !(!result.then && !result.errors && result.data) ? (0, _invariant.default)(0) : void 0;
  return result.data;
}
},{"../execution/execute":9,"../jsutils/invariant":19,"../language/parser":40,"./introspectionQuery":69}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntrospectionQuery = getIntrospectionQuery;
exports.introspectionQuery = void 0;

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function getIntrospectionQuery(options) {
  var descriptions = !(options && options.descriptions === false);
  return "\n    query IntrospectionQuery {\n      __schema {\n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          ".concat(descriptions ? 'description' : '', "\n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      ").concat(descriptions ? 'description' : '', "\n      fields(includeDeprecated: true) {\n        name\n        ").concat(descriptions ? 'description' : '', "\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        ").concat(descriptions ? 'description' : '', "\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      ").concat(descriptions ? 'description' : '', "\n      type { ...TypeRef }\n      defaultValue\n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ");
}
/**
 * Deprecated, call getIntrospectionQuery directly.
 *
 * This function will be removed in v15
 */


var introspectionQuery = getIntrospectionQuery();
exports.introspectionQuery = introspectionQuery;
},{}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidJSValue = isValidJSValue;

var _coerceValue = require("./coerceValue");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Deprecated. Use coerceValue() directly for richer information.
 *
 * This function will be removed in v15
 */
function isValidJSValue(value, type) {
  var errors = (0, _coerceValue.coerceValue)(value, type).errors;
  return errors ? errors.map(function (error) {
    return error.message;
  }) : [];
}
},{"./coerceValue":60}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidLiteralValue = isValidLiteralValue;

var _TypeInfo = require("./TypeInfo");

var _kinds = require("../language/kinds");

var _visitor = require("../language/visitor");

var _schema = require("../type/schema");

var _ValuesOfCorrectType = require("../validation/rules/ValuesOfCorrectType");

var _ValidationContext = require("../validation/ValidationContext");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Utility which determines if a value literal node is valid for an input type.
 *
 * Deprecated. Rely on validation for documents containing literal values.
 *
 * This function will be removed in v15
 */
function isValidLiteralValue(type, valueNode) {
  var emptySchema = new _schema.GraphQLSchema({});
  var emptyDoc = {
    kind: _kinds.Kind.DOCUMENT,
    definitions: []
  };
  var typeInfo = new _TypeInfo.TypeInfo(emptySchema, undefined, type);
  var context = new _ValidationContext.ValidationContext(emptySchema, emptyDoc, typeInfo);
  var visitor = (0, _ValuesOfCorrectType.ValuesOfCorrectType)(context);
  (0, _visitor.visit)(valueNode, (0, _visitor.visitWithTypeInfo)(typeInfo, visitor));
  return context.getErrors();
}
},{"../language/kinds":37,"../language/visitor":44,"../type/schema":53,"../validation/ValidationContext":79,"../validation/rules/ValuesOfCorrectType":105,"./TypeInfo":55}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lexicographicSortSchema = lexicographicSortSchema;

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _schema = require("../type/schema");

var _directives = require("../type/directives");

var _definition = require("../type/definition");

var _scalars = require("../type/scalars");

var _introspection = require("../type/introspection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Sort GraphQLSchema.
 */
function lexicographicSortSchema(schema) {
  var cache = Object.create(null);

  var sortMaybeType = function sortMaybeType(maybeType) {
    return maybeType && sortNamedType(maybeType);
  };

  return new _schema.GraphQLSchema({
    types: sortTypes((0, _objectValues.default)(schema.getTypeMap())),
    directives: sortByName(schema.getDirectives()).map(sortDirective),
    query: sortMaybeType(schema.getQueryType()),
    mutation: sortMaybeType(schema.getMutationType()),
    subscription: sortMaybeType(schema.getSubscriptionType()),
    astNode: schema.astNode
  });

  function sortDirective(directive) {
    return new _directives.GraphQLDirective({
      name: directive.name,
      description: directive.description,
      locations: sortBy(directive.locations, function (x) {
        return x;
      }),
      args: sortArgs(directive.args),
      astNode: directive.astNode
    });
  }

  function sortArgs(args) {
    return (0, _keyValMap.default)(sortByName(args), function (arg) {
      return arg.name;
    }, function (arg) {
      return _objectSpread({}, arg, {
        type: sortType(arg.type)
      });
    });
  }

  function sortFields(fieldsMap) {
    return sortObjMap(fieldsMap, function (field) {
      return {
        type: sortType(field.type),
        args: sortArgs(field.args),
        resolve: field.resolve,
        subscribe: field.subscribe,
        deprecationReason: field.deprecationReason,
        description: field.description,
        astNode: field.astNode
      };
    });
  }

  function sortInputFields(fieldsMap) {
    return sortObjMap(fieldsMap, function (field) {
      return {
        type: sortType(field.type),
        defaultValue: field.defaultValue,
        description: field.description,
        astNode: field.astNode
      };
    });
  }

  function sortType(type) {
    if ((0, _definition.isListType)(type)) {
      return new _definition.GraphQLList(sortType(type.ofType));
    } else if ((0, _definition.isNonNullType)(type)) {
      return new _definition.GraphQLNonNull(sortType(type.ofType));
    }

    return sortNamedType(type);
  }

  function sortTypes(arr) {
    return sortByName(arr).map(sortNamedType);
  }

  function sortNamedType(type) {
    if ((0, _scalars.isSpecifiedScalarType)(type) || (0, _introspection.isIntrospectionType)(type)) {
      return type;
    }

    var sortedType = cache[type.name];

    if (!sortedType) {
      sortedType = sortNamedTypeImpl(type);
      cache[type.name] = sortedType;
    }

    return sortedType;
  }

  function sortNamedTypeImpl(type) {
    if ((0, _definition.isScalarType)(type)) {
      return type;
    } else if ((0, _definition.isObjectType)(type)) {
      return new _definition.GraphQLObjectType({
        name: type.name,
        interfaces: function interfaces() {
          return sortTypes(type.getInterfaces());
        },
        fields: function fields() {
          return sortFields(type.getFields());
        },
        isTypeOf: type.isTypeOf,
        description: type.description,
        astNode: type.astNode,
        extensionASTNodes: type.extensionASTNodes
      });
    } else if ((0, _definition.isInterfaceType)(type)) {
      return new _definition.GraphQLInterfaceType({
        name: type.name,
        fields: function fields() {
          return sortFields(type.getFields());
        },
        resolveType: type.resolveType,
        description: type.description,
        astNode: type.astNode,
        extensionASTNodes: type.extensionASTNodes
      });
    } else if ((0, _definition.isUnionType)(type)) {
      return new _definition.GraphQLUnionType({
        name: type.name,
        types: function types() {
          return sortTypes(type.getTypes());
        },
        resolveType: type.resolveType,
        description: type.description,
        astNode: type.astNode
      });
    } else if ((0, _definition.isEnumType)(type)) {
      return new _definition.GraphQLEnumType({
        name: type.name,
        values: (0, _keyValMap.default)(sortByName(type.getValues()), function (val) {
          return val.name;
        }, function (val) {
          return {
            value: val.value,
            deprecationReason: val.deprecationReason,
            description: val.description,
            astNode: val.astNode
          };
        }),
        description: type.description,
        astNode: type.astNode
      });
    } else if ((0, _definition.isInputObjectType)(type)) {
      return new _definition.GraphQLInputObjectType({
        name: type.name,
        fields: function fields() {
          return sortInputFields(type.getFields());
        },
        description: type.description,
        astNode: type.astNode
      });
    }

    throw new Error("Unknown type: \"".concat(type, "\""));
  }
}

function sortObjMap(map, sortValueFn) {
  var sortedMap = Object.create(null);
  var sortedKeys = sortBy(Object.keys(map), function (x) {
    return x;
  });

  for (var _i = 0; _i < sortedKeys.length; _i++) {
    var key = sortedKeys[_i];
    var value = map[key];
    sortedMap[key] = sortValueFn ? sortValueFn(value) : value;
  }

  return sortedMap;
}

function sortByName(array) {
  return sortBy(array, function (obj) {
    return obj.name;
  });
}

function sortBy(array, mapToKey) {
  return array.slice().sort(function (obj1, obj2) {
    var key1 = mapToKey(obj1);
    var key2 = mapToKey(obj2);
    return key1.localeCompare(key2);
  });
}
},{"../jsutils/keyValMap":26,"../jsutils/objectValues":28,"../type/definition":48,"../type/directives":49,"../type/introspection":51,"../type/scalars":52,"../type/schema":53}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printSchema = printSchema;
exports.printIntrospectionSchema = printIntrospectionSchema;
exports.printType = printType;

var _isNullish = _interopRequireDefault(require("../jsutils/isNullish"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _astFromValue = require("../utilities/astFromValue");

var _printer = require("../language/printer");

var _definition = require("../type/definition");

var _scalars = require("../type/scalars");

var _directives = require("../type/directives");

var _introspection = require("../type/introspection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Accepts options as a second argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */
function printSchema(schema, options) {
  return printFilteredSchema(schema, function (n) {
    return !(0, _directives.isSpecifiedDirective)(n);
  }, isDefinedType, options);
}

function printIntrospectionSchema(schema, options) {
  return printFilteredSchema(schema, _directives.isSpecifiedDirective, _introspection.isIntrospectionType, options);
}

function isDefinedType(type) {
  return !(0, _scalars.isSpecifiedScalarType)(type) && !(0, _introspection.isIntrospectionType)(type);
}

function printFilteredSchema(schema, directiveFilter, typeFilter, options) {
  var directives = schema.getDirectives().filter(directiveFilter);
  var typeMap = schema.getTypeMap();
  var types = (0, _objectValues.default)(typeMap).sort(function (type1, type2) {
    return type1.name.localeCompare(type2.name);
  }).filter(typeFilter);
  return [printSchemaDefinition(schema)].concat(directives.map(function (directive) {
    return printDirective(directive, options);
  }), types.map(function (type) {
    return printType(type, options);
  })).filter(Boolean).join('\n\n') + '\n';
}

function printSchemaDefinition(schema) {
  if (isSchemaOfCommonNames(schema)) {
    return;
  }

  var operationTypes = [];
  var queryType = schema.getQueryType();

  if (queryType) {
    operationTypes.push("  query: ".concat(queryType.name));
  }

  var mutationType = schema.getMutationType();

  if (mutationType) {
    operationTypes.push("  mutation: ".concat(mutationType.name));
  }

  var subscriptionType = schema.getSubscriptionType();

  if (subscriptionType) {
    operationTypes.push("  subscription: ".concat(subscriptionType.name));
  }

  return "schema {\n".concat(operationTypes.join('\n'), "\n}");
}
/**
 * GraphQL schema define root types for each type of operation. These types are
 * the same as any other type and can be named in any manner, however there is
 * a common naming convention:
 *
 *   schema {
 *     query: Query
 *     mutation: Mutation
 *   }
 *
 * When using this naming convention, the schema description can be omitted.
 */


function isSchemaOfCommonNames(schema) {
  var queryType = schema.getQueryType();

  if (queryType && queryType.name !== 'Query') {
    return false;
  }

  var mutationType = schema.getMutationType();

  if (mutationType && mutationType.name !== 'Mutation') {
    return false;
  }

  var subscriptionType = schema.getSubscriptionType();

  if (subscriptionType && subscriptionType.name !== 'Subscription') {
    return false;
  }

  return true;
}

function printType(type, options) {
  if ((0, _definition.isScalarType)(type)) {
    return printScalar(type, options);
  } else if ((0, _definition.isObjectType)(type)) {
    return printObject(type, options);
  } else if ((0, _definition.isInterfaceType)(type)) {
    return printInterface(type, options);
  } else if ((0, _definition.isUnionType)(type)) {
    return printUnion(type, options);
  } else if ((0, _definition.isEnumType)(type)) {
    return printEnum(type, options);
  } else if ((0, _definition.isInputObjectType)(type)) {
    return printInputObject(type, options);
  }
  /* istanbul ignore next */


  throw new Error("Unknown type: ".concat(type, "."));
}

function printScalar(type, options) {
  return printDescription(options, type) + "scalar ".concat(type.name);
}

function printObject(type, options) {
  var interfaces = type.getInterfaces();
  var implementedInterfaces = interfaces.length ? ' implements ' + interfaces.map(function (i) {
    return i.name;
  }).join(' & ') : '';
  return printDescription(options, type) + "type ".concat(type.name).concat(implementedInterfaces, " {\n") + printFields(options, type) + '\n' + '}';
}

function printInterface(type, options) {
  return printDescription(options, type) + "interface ".concat(type.name, " {\n") + printFields(options, type) + '\n' + '}';
}

function printUnion(type, options) {
  return printDescription(options, type) + "union ".concat(type.name, " = ").concat(type.getTypes().join(' | '));
}

function printEnum(type, options) {
  return printDescription(options, type) + "enum ".concat(type.name, " {\n") + printEnumValues(type.getValues(), options) + '\n' + '}';
}

function printEnumValues(values, options) {
  return values.map(function (value, i) {
    return printDescription(options, value, '  ', !i) + '  ' + value.name + printDeprecated(value);
  }).join('\n');
}

function printInputObject(type, options) {
  var fields = (0, _objectValues.default)(type.getFields());
  return printDescription(options, type) + "input ".concat(type.name, " {\n") + fields.map(function (f, i) {
    return printDescription(options, f, '  ', !i) + '  ' + printInputValue(f);
  }).join('\n') + '\n' + '}';
}

function printFields(options, type) {
  var fields = (0, _objectValues.default)(type.getFields());
  return fields.map(function (f, i) {
    return printDescription(options, f, '  ', !i) + '  ' + f.name + printArgs(options, f.args, '  ') + ': ' + String(f.type) + printDeprecated(f);
  }).join('\n');
}

function printArgs(options, args) {
  var indentation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (args.length === 0) {
    return '';
  } // If every arg does not have a description, print them on one line.


  if (args.every(function (arg) {
    return !arg.description;
  })) {
    return '(' + args.map(printInputValue).join(', ') + ')';
  }

  return '(\n' + args.map(function (arg, i) {
    return printDescription(options, arg, '  ' + indentation, !i) + '  ' + indentation + printInputValue(arg);
  }).join('\n') + '\n' + indentation + ')';
}

function printInputValue(arg) {
  var argDecl = arg.name + ': ' + String(arg.type);

  if (!(0, _isInvalid.default)(arg.defaultValue)) {
    argDecl += " = ".concat((0, _printer.print)((0, _astFromValue.astFromValue)(arg.defaultValue, arg.type)));
  }

  return argDecl;
}

function printDirective(directive, options) {
  return printDescription(options, directive) + 'directive @' + directive.name + printArgs(options, directive.args) + ' on ' + directive.locations.join(' | ');
}

function printDeprecated(fieldOrEnumVal) {
  if (!fieldOrEnumVal.isDeprecated) {
    return '';
  }

  var reason = fieldOrEnumVal.deprecationReason;

  if ((0, _isNullish.default)(reason) || reason === '' || reason === _directives.DEFAULT_DEPRECATION_REASON) {
    return ' @deprecated';
  }

  return ' @deprecated(reason: ' + (0, _printer.print)((0, _astFromValue.astFromValue)(reason, _scalars.GraphQLString)) + ')';
}

function printDescription(options, def) {
  var indentation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var firstInBlock = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (!def.description) {
    return '';
  }

  var lines = descriptionLines(def.description, 120 - indentation.length);

  if (options && options.commentDescriptions) {
    return printDescriptionWithComments(lines, indentation, firstInBlock);
  }

  var description = indentation && !firstInBlock ? '\n' + indentation + '"""' : indentation + '"""'; // In some circumstances, a single line can be used for the description.

  if (lines.length === 1 && lines[0].length < 70 && lines[0][lines[0].length - 1] !== '"') {
    return description + escapeQuote(lines[0]) + '"""\n';
  } // Format a multi-line block quote to account for leading space.


  var hasLeadingSpace = lines[0][0] === ' ' || lines[0][0] === '\t';

  if (!hasLeadingSpace) {
    description += '\n';
  }

  for (var i = 0; i < lines.length; i++) {
    if (i !== 0 || !hasLeadingSpace) {
      description += indentation;
    }

    description += escapeQuote(lines[i]) + '\n';
  }

  description += indentation + '"""\n';
  return description;
}

function escapeQuote(line) {
  return line.replace(/"""/g, '\\"""');
}

function printDescriptionWithComments(lines, indentation, firstInBlock) {
  var description = indentation && !firstInBlock ? '\n' : '';

  for (var i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      description += indentation + '#\n';
    } else {
      description += indentation + '# ' + lines[i] + '\n';
    }
  }

  return description;
}

function descriptionLines(description, maxLen) {
  var lines = [];
  var rawLines = description.split('\n');

  for (var i = 0; i < rawLines.length; i++) {
    if (rawLines[i] === '') {
      lines.push(rawLines[i]);
    } else {
      // For > 120 character long lines, cut at space boundaries into sublines
      // of ~80 chars.
      var sublines = breakLine(rawLines[i], maxLen);

      for (var j = 0; j < sublines.length; j++) {
        lines.push(sublines[j]);
      }
    }
  }

  return lines;
}

function breakLine(line, maxLen) {
  if (line.length < maxLen + 5) {
    return [line];
  }

  var parts = line.split(new RegExp("((?: |^).{15,".concat(maxLen - 40, "}(?= |$))")));

  if (parts.length < 4) {
    return [line];
  }

  var sublines = [parts[0] + parts[1] + parts[2]];

  for (var i = 3; i < parts.length; i += 2) {
    sublines.push(parts[i].slice(1) + parts[i + 1]);
  }

  return sublines;
}
},{"../jsutils/isInvalid":22,"../jsutils/isNullish":23,"../jsutils/objectValues":28,"../language/printer":42,"../type/definition":48,"../type/directives":49,"../type/introspection":51,"../type/scalars":52,"../utilities/astFromValue":57}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.separateOperations = separateOperations;

var _visitor = require("../language/visitor");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * separateOperations accepts a single AST document which may contain many
 * operations and fragments and returns a collection of AST documents each of
 * which contains a single operation as well the fragment definitions it
 * refers to.
 */
function separateOperations(documentAST) {
  var operations = [];
  var fragments = Object.create(null);
  var positions = new Map();
  var depGraph = Object.create(null);
  var fromName;
  var idx = 0; // Populate metadata and build a dependency graph.

  (0, _visitor.visit)(documentAST, {
    OperationDefinition: function OperationDefinition(node) {
      fromName = opName(node);
      operations.push(node);
      positions.set(node, idx++);
    },
    FragmentDefinition: function FragmentDefinition(node) {
      fromName = node.name.value;
      fragments[fromName] = node;
      positions.set(node, idx++);
    },
    FragmentSpread: function FragmentSpread(node) {
      var toName = node.name.value;
      (depGraph[fromName] || (depGraph[fromName] = Object.create(null)))[toName] = true;
    }
  }); // For each operation, produce a new synthesized AST which includes only what
  // is necessary for completing that operation.

  var separatedDocumentASTs = Object.create(null);

  for (var _i = 0; _i < operations.length; _i++) {
    var operation = operations[_i];
    var operationName = opName(operation);
    var dependencies = Object.create(null);
    collectTransitiveDependencies(dependencies, depGraph, operationName); // The list of definition nodes to be included for this operation, sorted
    // to retain the same order as the original document.

    var definitions = [operation];

    var _arr = Object.keys(dependencies);

    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
      var name = _arr[_i2];
      definitions.push(fragments[name]);
    }

    definitions.sort(function (n1, n2) {
      return (positions.get(n1) || 0) - (positions.get(n2) || 0);
    });
    separatedDocumentASTs[operationName] = {
      kind: 'Document',
      definitions: definitions
    };
  }

  return separatedDocumentASTs;
}

// Provides the empty string for anonymous operations.
function opName(operation) {
  return operation.name ? operation.name.value : '';
} // From a dependency graph, collects a list of transitive dependencies by
// recursing through a dependency graph.


function collectTransitiveDependencies(collected, depGraph, fromName) {
  var immediateDeps = depGraph[fromName];

  if (immediateDeps) {
    var _arr2 = Object.keys(immediateDeps);

    for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
      var toName = _arr2[_i3];

      if (!collected[toName]) {
        collected[toName] = true;
        collectTransitiveDependencies(collected, depGraph, toName);
      }
    }
  }
}
},{"../language/visitor":44}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqualType = isEqualType;
exports.isTypeSubTypeOf = isTypeSubTypeOf;
exports.doTypesOverlap = doTypesOverlap;

var _definition = require("../type/definition");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Provided two types, return true if the types are equal (invariant).
 */
function isEqualType(typeA, typeB) {
  // Equivalent types are equal.
  if (typeA === typeB) {
    return true;
  } // If either type is non-null, the other must also be non-null.


  if ((0, _definition.isNonNullType)(typeA) && (0, _definition.isNonNullType)(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  } // If either type is a list, the other must also be a list.


  if ((0, _definition.isListType)(typeA) && (0, _definition.isListType)(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  } // Otherwise the types are not equal.


  return false;
}
/**
 * Provided a type and a super type, return true if the first type is either
 * equal or a subset of the second super type (covariant).
 */


function isTypeSubTypeOf(schema, maybeSubType, superType) {
  // Equivalent type is a valid subtype
  if (maybeSubType === superType) {
    return true;
  } // If superType is non-null, maybeSubType must also be non-null.


  if ((0, _definition.isNonNullType)(superType)) {
    if ((0, _definition.isNonNullType)(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }

    return false;
  }

  if ((0, _definition.isNonNullType)(maybeSubType)) {
    // If superType is nullable, maybeSubType may be non-null or nullable.
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  } // If superType type is a list, maybeSubType type must also be a list.


  if ((0, _definition.isListType)(superType)) {
    if ((0, _definition.isListType)(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }

    return false;
  }

  if ((0, _definition.isListType)(maybeSubType)) {
    // If superType is not a list, maybeSubType must also be not a list.
    return false;
  } // If superType type is an abstract type, maybeSubType type may be a currently
  // possible object type.


  if ((0, _definition.isAbstractType)(superType) && (0, _definition.isObjectType)(maybeSubType) && schema.isPossibleType(superType, maybeSubType)) {
    return true;
  } // Otherwise, the child type is not a valid subtype of the parent type.


  return false;
}
/**
 * Provided two composite types, determine if they "overlap". Two composite
 * types overlap when the Sets of possible concrete types for each intersect.
 *
 * This is often used to determine if a fragment of a given type could possibly
 * be visited in a context of another type.
 *
 * This function is commutative.
 */


function doTypesOverlap(schema, typeA, typeB) {
  // Equivalent types overlap
  if (typeA === typeB) {
    return true;
  }

  if ((0, _definition.isAbstractType)(typeA)) {
    if ((0, _definition.isAbstractType)(typeB)) {
      // If both types are abstract, then determine if there is any intersection
      // between possible concrete types of each.
      return schema.getPossibleTypes(typeA).some(function (type) {
        return schema.isPossibleType(typeB, type);
      });
    } // Determine if the latter type is a possible concrete type of the former.


    return schema.isPossibleType(typeA, typeB);
  }

  if ((0, _definition.isAbstractType)(typeB)) {
    // Determine if the former type is a possible concrete type of the latter.
    return schema.isPossibleType(typeB, typeA);
  } // Otherwise the types do not overlap.


  return false;
}
},{"../type/definition":48}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeFromAST = typeFromAST;

var _kinds = require("../language/kinds");

var _definition = require("../type/definition");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function typeFromAST(schema, typeNode) {
  /* eslint-enable no-redeclare */
  var innerType;

  if (typeNode.kind === _kinds.Kind.LIST_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && (0, _definition.GraphQLList)(innerType);
  }

  if (typeNode.kind === _kinds.Kind.NON_NULL_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && (0, _definition.GraphQLNonNull)(innerType);
  }

  if (typeNode.kind === _kinds.Kind.NAMED_TYPE) {
    return schema.getType(typeNode.name.value);
  }
  /* istanbul ignore next */


  throw new Error("Unexpected type kind: ".concat(typeNode.kind, "."));
}
},{"../language/kinds":37,"../type/definition":48}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueFromAST = valueFromAST;

var _keyMap = _interopRequireDefault(require("../jsutils/keyMap"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _objectValues = _interopRequireDefault(require("../jsutils/objectValues"));

var _kinds = require("../language/kinds");

var _definition = require("../type/definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * GraphQL Value literals.
 *
 * Returns `undefined` when the value could not be validly coerced according to
 * the provided type.
 *
 * | GraphQL Value        | JSON Value    |
 * | -------------------- | ------------- |
 * | Input Object         | Object        |
 * | List                 | Array         |
 * | Boolean              | Boolean       |
 * | String               | String        |
 * | Int / Float          | Number        |
 * | Enum Value           | Mixed         |
 * | NullValue            | null          |
 *
 */
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    // When there is no node, then there is also no value.
    // Importantly, this is different from returning the value null.
    return;
  }

  if ((0, _definition.isNonNullType)(type)) {
    if (valueNode.kind === _kinds.Kind.NULL) {
      return; // Invalid: intentionally return no value.
    }

    return valueFromAST(valueNode, type.ofType, variables);
  }

  if (valueNode.kind === _kinds.Kind.NULL) {
    // This is explicitly returning the value null.
    return null;
  }

  if (valueNode.kind === _kinds.Kind.VARIABLE) {
    var variableName = valueNode.name.value;

    if (!variables || (0, _isInvalid.default)(variables[variableName])) {
      // No valid return value.
      return;
    }

    var variableValue = variables[variableName];

    if (variableValue === null && (0, _definition.isNonNullType)(type)) {
      return; // Invalid: intentionally return no value.
    } // Note: This does no further checking that this variable is correct.
    // This assumes that this query has been validated and the variable
    // usage here is of the correct type.


    return variableValue;
  }

  if ((0, _definition.isListType)(type)) {
    var itemType = type.ofType;

    if (valueNode.kind === _kinds.Kind.LIST) {
      var coercedValues = [];
      var itemNodes = valueNode.values;

      for (var i = 0; i < itemNodes.length; i++) {
        if (isMissingVariable(itemNodes[i], variables)) {
          // If an array contains a missing variable, it is either coerced to
          // null or if the item type is non-null, it considered invalid.
          if ((0, _definition.isNonNullType)(itemType)) {
            return; // Invalid: intentionally return no value.
          }

          coercedValues.push(null);
        } else {
          var itemValue = valueFromAST(itemNodes[i], itemType, variables);

          if ((0, _isInvalid.default)(itemValue)) {
            return; // Invalid: intentionally return no value.
          }

          coercedValues.push(itemValue);
        }
      }

      return coercedValues;
    }

    var coercedValue = valueFromAST(valueNode, itemType, variables);

    if ((0, _isInvalid.default)(coercedValue)) {
      return; // Invalid: intentionally return no value.
    }

    return [coercedValue];
  }

  if ((0, _definition.isInputObjectType)(type)) {
    if (valueNode.kind !== _kinds.Kind.OBJECT) {
      return; // Invalid: intentionally return no value.
    }

    var coercedObj = Object.create(null);
    var fieldNodes = (0, _keyMap.default)(valueNode.fields, function (field) {
      return field.name.value;
    });
    var fields = (0, _objectValues.default)(type.getFields());

    for (var _i = 0; _i < fields.length; _i++) {
      var field = fields[_i];
      var fieldNode = fieldNodes[field.name];

      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== undefined) {
          coercedObj[field.name] = field.defaultValue;
        } else if ((0, _definition.isNonNullType)(field.type)) {
          return; // Invalid: intentionally return no value.
        }

        continue;
      }

      var fieldValue = valueFromAST(fieldNode.value, field.type, variables);

      if ((0, _isInvalid.default)(fieldValue)) {
        return; // Invalid: intentionally return no value.
      }

      coercedObj[field.name] = fieldValue;
    }

    return coercedObj;
  }

  if ((0, _definition.isEnumType)(type)) {
    if (valueNode.kind !== _kinds.Kind.ENUM) {
      return; // Invalid: intentionally return no value.
    }

    var enumValue = type.getValue(valueNode.value);

    if (!enumValue) {
      return; // Invalid: intentionally return no value.
    }

    return enumValue.value;
  }

  if ((0, _definition.isScalarType)(type)) {
    // Scalars fulfill parsing a literal value via parseLiteral().
    // Invalid values represent a failure to parse correctly, in which case
    // no value is returned.
    var result;

    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return; // Invalid: intentionally return no value.
    }

    if ((0, _isInvalid.default)(result)) {
      return; // Invalid: intentionally return no value.
    }

    return result;
  }
  /* istanbul ignore next */


  throw new Error("Unknown type: ".concat(type, "."));
} // Returns true if the provided valueNode is a variable which is not defined
// in the set of variables.


function isMissingVariable(valueNode, variables) {
  return valueNode.kind === _kinds.Kind.VARIABLE && (!variables || (0, _isInvalid.default)(variables[valueNode.name.value]));
}
},{"../jsutils/isInvalid":22,"../jsutils/keyMap":25,"../jsutils/objectValues":28,"../language/kinds":37,"../type/definition":48}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueFromASTUntyped = valueFromASTUntyped;

var _keyValMap = _interopRequireDefault(require("../jsutils/keyValMap"));

var _isInvalid = _interopRequireDefault(require("../jsutils/isInvalid"));

var _kinds = require("../language/kinds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * Unlike `valueFromAST()`, no type is provided. The resulting JavaScript value
 * will reflect the provided GraphQL value AST.
 *
 * | GraphQL Value        | JavaScript Value |
 * | -------------------- | ---------------- |
 * | Input Object         | Object           |
 * | List                 | Array            |
 * | Boolean              | Boolean          |
 * | String / Enum        | String           |
 * | Int / Float          | Number           |
 * | Null                 | null             |
 *
 */
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case _kinds.Kind.NULL:
      return null;

    case _kinds.Kind.INT:
      return parseInt(valueNode.value, 10);

    case _kinds.Kind.FLOAT:
      return parseFloat(valueNode.value);

    case _kinds.Kind.STRING:
    case _kinds.Kind.ENUM:
    case _kinds.Kind.BOOLEAN:
      return valueNode.value;

    case _kinds.Kind.LIST:
      return valueNode.values.map(function (node) {
        return valueFromASTUntyped(node, variables);
      });

    case _kinds.Kind.OBJECT:
      return (0, _keyValMap.default)(valueNode.fields, function (field) {
        return field.name.value;
      }, function (field) {
        return valueFromASTUntyped(field.value, variables);
      });

    case _kinds.Kind.VARIABLE:
      var variableName = valueNode.name.value;
      return variables && !(0, _isInvalid.default)(variables[variableName]) ? variables[variableName] : undefined;
  }
  /* istanbul ignore next */


  throw new Error('Unexpected value kind: ' + valueNode.kind);
}
},{"../jsutils/isInvalid":22,"../jsutils/keyValMap":26,"../language/kinds":37}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationContext = exports.SDLValidationContext = exports.ASTValidationContext = void 0;

var _visitor = require("../language/visitor");

var _kinds = require("../language/kinds");

var _TypeInfo = require("../utilities/TypeInfo");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An instance of this class is passed as the "this" context to all validators,
 * allowing access to commonly useful contextual information from within a
 * validation rule.
 */
var ASTValidationContext =
/*#__PURE__*/
function () {
  function ASTValidationContext(ast) {
    _defineProperty(this, "_ast", void 0);

    _defineProperty(this, "_errors", void 0);

    this._ast = ast;
    this._errors = [];
  }

  var _proto = ASTValidationContext.prototype;

  _proto.reportError = function reportError(error) {
    this._errors.push(error);
  };

  _proto.getErrors = function getErrors() {
    return this._errors;
  };

  _proto.getDocument = function getDocument() {
    return this._ast;
  };

  return ASTValidationContext;
}();

exports.ASTValidationContext = ASTValidationContext;

var SDLValidationContext =
/*#__PURE__*/
function (_ASTValidationContext) {
  _inheritsLoose(SDLValidationContext, _ASTValidationContext);

  function SDLValidationContext(ast, schema) {
    var _this;

    _this = _ASTValidationContext.call(this, ast) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_schema", void 0);

    _this._schema = schema;
    return _this;
  }

  var _proto2 = SDLValidationContext.prototype;

  _proto2.getSchema = function getSchema() {
    return this._schema;
  };

  return SDLValidationContext;
}(ASTValidationContext);

exports.SDLValidationContext = SDLValidationContext;

var ValidationContext =
/*#__PURE__*/
function (_ASTValidationContext2) {
  _inheritsLoose(ValidationContext, _ASTValidationContext2);

  function ValidationContext(schema, ast, typeInfo) {
    var _this2;

    _this2 = _ASTValidationContext2.call(this, ast) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_schema", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_typeInfo", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_fragments", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_fragmentSpreads", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_recursivelyReferencedFragments", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_variableUsages", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "_recursiveVariableUsages", void 0);

    _this2._schema = schema;
    _this2._typeInfo = typeInfo;
    _this2._fragmentSpreads = new Map();
    _this2._recursivelyReferencedFragments = new Map();
    _this2._variableUsages = new Map();
    _this2._recursiveVariableUsages = new Map();
    return _this2;
  }

  var _proto3 = ValidationContext.prototype;

  _proto3.getSchema = function getSchema() {
    return this._schema;
  };

  _proto3.getFragment = function getFragment(name) {
    var fragments = this._fragments;

    if (!fragments) {
      this._fragments = fragments = this.getDocument().definitions.reduce(function (frags, statement) {
        if (statement.kind === _kinds.Kind.FRAGMENT_DEFINITION) {
          frags[statement.name.value] = statement;
        }

        return frags;
      }, Object.create(null));
    }

    return fragments[name];
  };

  _proto3.getFragmentSpreads = function getFragmentSpreads(node) {
    var spreads = this._fragmentSpreads.get(node);

    if (!spreads) {
      spreads = [];
      var setsToVisit = [node];

      while (setsToVisit.length !== 0) {
        var set = setsToVisit.pop();

        for (var i = 0; i < set.selections.length; i++) {
          var selection = set.selections[i];

          if (selection.kind === _kinds.Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }

      this._fragmentSpreads.set(node, spreads);
    }

    return spreads;
  };

  _proto3.getRecursivelyReferencedFragments = function getRecursivelyReferencedFragments(operation) {
    var fragments = this._recursivelyReferencedFragments.get(operation);

    if (!fragments) {
      fragments = [];
      var collectedNames = Object.create(null);
      var nodesToVisit = [operation.selectionSet];

      while (nodesToVisit.length !== 0) {
        var node = nodesToVisit.pop();
        var spreads = this.getFragmentSpreads(node);

        for (var i = 0; i < spreads.length; i++) {
          var fragName = spreads[i].name.value;

          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            var fragment = this.getFragment(fragName);

            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }

      this._recursivelyReferencedFragments.set(operation, fragments);
    }

    return fragments;
  };

  _proto3.getVariableUsages = function getVariableUsages(node) {
    var usages = this._variableUsages.get(node);

    if (!usages) {
      var newUsages = [];
      var typeInfo = new _TypeInfo.TypeInfo(this._schema);
      (0, _visitor.visit)(node, (0, _visitor.visitWithTypeInfo)(typeInfo, {
        VariableDefinition: function VariableDefinition() {
          return false;
        },
        Variable: function Variable(variable) {
          newUsages.push({
            node: variable,
            type: typeInfo.getInputType(),
            defaultValue: typeInfo.getDefaultValue()
          });
        }
      }));
      usages = newUsages;

      this._variableUsages.set(node, usages);
    }

    return usages;
  };

  _proto3.getRecursiveVariableUsages = function getRecursiveVariableUsages(operation) {
    var usages = this._recursiveVariableUsages.get(operation);

    if (!usages) {
      usages = this.getVariableUsages(operation);
      var fragments = this.getRecursivelyReferencedFragments(operation);

      for (var i = 0; i < fragments.length; i++) {
        Array.prototype.push.apply(usages, this.getVariableUsages(fragments[i]));
      }

      this._recursiveVariableUsages.set(operation, usages);
    }

    return usages;
  };

  _proto3.getType = function getType() {
    return this._typeInfo.getType();
  };

  _proto3.getParentType = function getParentType() {
    return this._typeInfo.getParentType();
  };

  _proto3.getInputType = function getInputType() {
    return this._typeInfo.getInputType();
  };

  _proto3.getParentInputType = function getParentInputType() {
    return this._typeInfo.getParentInputType();
  };

  _proto3.getFieldDef = function getFieldDef() {
    return this._typeInfo.getFieldDef();
  };

  _proto3.getDirective = function getDirective() {
    return this._typeInfo.getDirective();
  };

  _proto3.getArgument = function getArgument() {
    return this._typeInfo.getArgument();
  };

  return ValidationContext;
}(ASTValidationContext);

exports.ValidationContext = ValidationContext;
},{"../language/kinds":37,"../language/visitor":44,"../utilities/TypeInfo":55}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function get() {
    return _validate.validate;
  }
});
Object.defineProperty(exports, "ValidationContext", {
  enumerable: true,
  get: function get() {
    return _ValidationContext.ValidationContext;
  }
});
Object.defineProperty(exports, "specifiedRules", {
  enumerable: true,
  get: function get() {
    return _specifiedRules.specifiedRules;
  }
});
Object.defineProperty(exports, "FieldsOnCorrectTypeRule", {
  enumerable: true,
  get: function get() {
    return _FieldsOnCorrectType.FieldsOnCorrectType;
  }
});
Object.defineProperty(exports, "FragmentsOnCompositeTypesRule", {
  enumerable: true,
  get: function get() {
    return _FragmentsOnCompositeTypes.FragmentsOnCompositeTypes;
  }
});
Object.defineProperty(exports, "KnownArgumentNamesRule", {
  enumerable: true,
  get: function get() {
    return _KnownArgumentNames.KnownArgumentNames;
  }
});
Object.defineProperty(exports, "KnownDirectivesRule", {
  enumerable: true,
  get: function get() {
    return _KnownDirectives.KnownDirectives;
  }
});
Object.defineProperty(exports, "KnownFragmentNamesRule", {
  enumerable: true,
  get: function get() {
    return _KnownFragmentNames.KnownFragmentNames;
  }
});
Object.defineProperty(exports, "KnownTypeNamesRule", {
  enumerable: true,
  get: function get() {
    return _KnownTypeNames.KnownTypeNames;
  }
});
Object.defineProperty(exports, "LoneAnonymousOperationRule", {
  enumerable: true,
  get: function get() {
    return _LoneAnonymousOperation.LoneAnonymousOperation;
  }
});
Object.defineProperty(exports, "NoFragmentCyclesRule", {
  enumerable: true,
  get: function get() {
    return _NoFragmentCycles.NoFragmentCycles;
  }
});
Object.defineProperty(exports, "NoUndefinedVariablesRule", {
  enumerable: true,
  get: function get() {
    return _NoUndefinedVariables.NoUndefinedVariables;
  }
});
Object.defineProperty(exports, "NoUnusedFragmentsRule", {
  enumerable: true,
  get: function get() {
    return _NoUnusedFragments.NoUnusedFragments;
  }
});
Object.defineProperty(exports, "NoUnusedVariablesRule", {
  enumerable: true,
  get: function get() {
    return _NoUnusedVariables.NoUnusedVariables;
  }
});
Object.defineProperty(exports, "OverlappingFieldsCanBeMergedRule", {
  enumerable: true,
  get: function get() {
    return _OverlappingFieldsCanBeMerged.OverlappingFieldsCanBeMerged;
  }
});
Object.defineProperty(exports, "PossibleFragmentSpreadsRule", {
  enumerable: true,
  get: function get() {
    return _PossibleFragmentSpreads.PossibleFragmentSpreads;
  }
});
Object.defineProperty(exports, "ProvidedRequiredArgumentsRule", {
  enumerable: true,
  get: function get() {
    return _ProvidedRequiredArguments.ProvidedRequiredArguments;
  }
});
Object.defineProperty(exports, "ScalarLeafsRule", {
  enumerable: true,
  get: function get() {
    return _ScalarLeafs.ScalarLeafs;
  }
});
Object.defineProperty(exports, "SingleFieldSubscriptionsRule", {
  enumerable: true,
  get: function get() {
    return _SingleFieldSubscriptions.SingleFieldSubscriptions;
  }
});
Object.defineProperty(exports, "UniqueArgumentNamesRule", {
  enumerable: true,
  get: function get() {
    return _UniqueArgumentNames.UniqueArgumentNames;
  }
});
Object.defineProperty(exports, "UniqueDirectivesPerLocationRule", {
  enumerable: true,
  get: function get() {
    return _UniqueDirectivesPerLocation.UniqueDirectivesPerLocation;
  }
});
Object.defineProperty(exports, "UniqueFragmentNamesRule", {
  enumerable: true,
  get: function get() {
    return _UniqueFragmentNames.UniqueFragmentNames;
  }
});
Object.defineProperty(exports, "UniqueInputFieldNamesRule", {
  enumerable: true,
  get: function get() {
    return _UniqueInputFieldNames.UniqueInputFieldNames;
  }
});
Object.defineProperty(exports, "UniqueOperationNamesRule", {
  enumerable: true,
  get: function get() {
    return _UniqueOperationNames.UniqueOperationNames;
  }
});
Object.defineProperty(exports, "UniqueVariableNamesRule", {
  enumerable: true,
  get: function get() {
    return _UniqueVariableNames.UniqueVariableNames;
  }
});
Object.defineProperty(exports, "ValuesOfCorrectTypeRule", {
  enumerable: true,
  get: function get() {
    return _ValuesOfCorrectType.ValuesOfCorrectType;
  }
});
Object.defineProperty(exports, "VariablesAreInputTypesRule", {
  enumerable: true,
  get: function get() {
    return _VariablesAreInputTypes.VariablesAreInputTypes;
  }
});
Object.defineProperty(exports, "VariablesInAllowedPositionRule", {
  enumerable: true,
  get: function get() {
    return _VariablesInAllowedPosition.VariablesInAllowedPosition;
  }
});

var _validate = require("./validate");

var _ValidationContext = require("./ValidationContext");

var _specifiedRules = require("./specifiedRules");

var _FieldsOnCorrectType = require("./rules/FieldsOnCorrectType");

var _FragmentsOnCompositeTypes = require("./rules/FragmentsOnCompositeTypes");

var _KnownArgumentNames = require("./rules/KnownArgumentNames");

var _KnownDirectives = require("./rules/KnownDirectives");

var _KnownFragmentNames = require("./rules/KnownFragmentNames");

var _KnownTypeNames = require("./rules/KnownTypeNames");

var _LoneAnonymousOperation = require("./rules/LoneAnonymousOperation");

var _NoFragmentCycles = require("./rules/NoFragmentCycles");

var _NoUndefinedVariables = require("./rules/NoUndefinedVariables");

var _NoUnusedFragments = require("./rules/NoUnusedFragments");

var _NoUnusedVariables = require("./rules/NoUnusedVariables");

var _OverlappingFieldsCanBeMerged = require("./rules/OverlappingFieldsCanBeMerged");

var _PossibleFragmentSpreads = require("./rules/PossibleFragmentSpreads");

var _ProvidedRequiredArguments = require("./rules/ProvidedRequiredArguments");

var _ScalarLeafs = require("./rules/ScalarLeafs");

var _SingleFieldSubscriptions = require("./rules/SingleFieldSubscriptions");

var _UniqueArgumentNames = require("./rules/UniqueArgumentNames");

var _UniqueDirectivesPerLocation = require("./rules/UniqueDirectivesPerLocation");

var _UniqueFragmentNames = require("./rules/UniqueFragmentNames");

var _UniqueInputFieldNames = require("./rules/UniqueInputFieldNames");

var _UniqueOperationNames = require("./rules/UniqueOperationNames");

var _UniqueVariableNames = require("./rules/UniqueVariableNames");

var _ValuesOfCorrectType = require("./rules/ValuesOfCorrectType");

var _VariablesAreInputTypes = require("./rules/VariablesAreInputTypes");

var _VariablesInAllowedPosition = require("./rules/VariablesInAllowedPosition");
},{"./ValidationContext":79,"./rules/FieldsOnCorrectType":82,"./rules/FragmentsOnCompositeTypes":83,"./rules/KnownArgumentNames":84,"./rules/KnownDirectives":85,"./rules/KnownFragmentNames":86,"./rules/KnownTypeNames":87,"./rules/LoneAnonymousOperation":88,"./rules/NoFragmentCycles":90,"./rules/NoUndefinedVariables":91,"./rules/NoUnusedFragments":92,"./rules/NoUnusedVariables":93,"./rules/OverlappingFieldsCanBeMerged":94,"./rules/PossibleFragmentSpreads":95,"./rules/ProvidedRequiredArguments":96,"./rules/ScalarLeafs":97,"./rules/SingleFieldSubscriptions":98,"./rules/UniqueArgumentNames":99,"./rules/UniqueDirectivesPerLocation":100,"./rules/UniqueFragmentNames":101,"./rules/UniqueInputFieldNames":102,"./rules/UniqueOperationNames":103,"./rules/UniqueVariableNames":104,"./rules/ValuesOfCorrectType":105,"./rules/VariablesAreInputTypes":106,"./rules/VariablesInAllowedPosition":107,"./specifiedRules":108,"./validate":109}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonExecutableDefinitionMessage = nonExecutableDefinitionMessage;
exports.ExecutableDefinitions = ExecutableDefinitions;

var _GraphQLError = require("../../error/GraphQLError");

var _kinds = require("../../language/kinds");

var _predicates = require("../../language/predicates");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function nonExecutableDefinitionMessage(defName) {
  return "The ".concat(defName, " definition is not executable.");
}
/**
 * Executable definitions
 *
 * A GraphQL document is only valid for execution if all definitions are either
 * operation or fragment definitions.
 */


function ExecutableDefinitions(context) {
  return {
    Document: function Document(node) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = node.definitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var definition = _step.value;

          if (!(0, _predicates.isExecutableDefinitionNode)(definition)) {
            context.reportError(new _GraphQLError.GraphQLError(nonExecutableDefinitionMessage(definition.kind === _kinds.Kind.SCHEMA_DEFINITION || definition.kind === _kinds.Kind.SCHEMA_EXTENSION ? 'schema' : definition.name.value), [definition]));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  };
}
},{"../../error/GraphQLError":3,"../../language/kinds":37,"../../language/predicates":41}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undefinedFieldMessage = undefinedFieldMessage;
exports.FieldsOnCorrectType = FieldsOnCorrectType;

var _GraphQLError = require("../../error/GraphQLError");

var _suggestionList = _interopRequireDefault(require("../../jsutils/suggestionList"));

var _quotedOrList = _interopRequireDefault(require("../../jsutils/quotedOrList"));

var _definition = require("../../type/definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function undefinedFieldMessage(fieldName, type, suggestedTypeNames, suggestedFieldNames) {
  var message = "Cannot query field \"".concat(fieldName, "\" on type \"").concat(type, "\".");

  if (suggestedTypeNames.length !== 0) {
    var suggestions = (0, _quotedOrList.default)(suggestedTypeNames);
    message += " Did you mean to use an inline fragment on ".concat(suggestions, "?");
  } else if (suggestedFieldNames.length !== 0) {
    message += " Did you mean ".concat((0, _quotedOrList.default)(suggestedFieldNames), "?");
  }

  return message;
}
/**
 * Fields on correct type
 *
 * A GraphQL document is only valid if all fields selected are defined by the
 * parent type, or are an allowed meta field such as __typename.
 */


function FieldsOnCorrectType(context) {
  return {
    Field: function Field(node) {
      var type = context.getParentType();

      if (type) {
        var fieldDef = context.getFieldDef();

        if (!fieldDef) {
          // This field doesn't exist, lets look for suggestions.
          var schema = context.getSchema();
          var fieldName = node.name.value; // First determine if there are any suggested types to condition on.

          var suggestedTypeNames = getSuggestedTypeNames(schema, type, fieldName); // If there are no suggested types, then perhaps this was a typo?

          var suggestedFieldNames = suggestedTypeNames.length !== 0 ? [] : getSuggestedFieldNames(schema, type, fieldName); // Report an error, including helpful suggestions.

          context.reportError(new _GraphQLError.GraphQLError(undefinedFieldMessage(fieldName, type.name, suggestedTypeNames, suggestedFieldNames), [node]));
        }
      }
    }
  };
}
/**
 * Go through all of the implementations of type, as well as the interfaces that
 * they implement. If any of those types include the provided field, suggest
 * them, sorted by how often the type is referenced, starting with Interfaces.
 */


function getSuggestedTypeNames(schema, type, fieldName) {
  if ((0, _definition.isAbstractType)(type)) {
    var suggestedObjectTypes = [];
    var interfaceUsageCount = Object.create(null);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = schema.getPossibleTypes(type)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var possibleType = _step.value;

        if (!possibleType.getFields()[fieldName]) {
          continue;
        } // This object type defines this field.


        suggestedObjectTypes.push(possibleType.name);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = possibleType.getInterfaces()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var possibleInterface = _step2.value;

            if (!possibleInterface.getFields()[fieldName]) {
              continue;
            } // This interface type defines this field.


            interfaceUsageCount[possibleInterface.name] = (interfaceUsageCount[possibleInterface.name] || 0) + 1;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } // Suggest interface types based on how common they are.

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var suggestedInterfaceTypes = Object.keys(interfaceUsageCount).sort(function (a, b) {
      return interfaceUsageCount[b] - interfaceUsageCount[a];
    }); // Suggest both interface and object types.

    return suggestedInterfaceTypes.concat(suggestedObjectTypes);
  } // Otherwise, must be an Object type, which does not have possible fields.


  return [];
}
/**
 * For the field name provided, determine if there are any similar field names
 * that may be the result of a typo.
 */


function getSuggestedFieldNames(schema, type, fieldName) {
  if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type)) {
    var possibleFieldNames = Object.keys(type.getFields());
    return (0, _suggestionList.default)(fieldName, possibleFieldNames);
  } // Otherwise, must be a Union type, which does not define fields.


  return [];
}
},{"../../error/GraphQLError":3,"../../jsutils/quotedOrList":32,"../../jsutils/suggestionList":33,"../../type/definition":48}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inlineFragmentOnNonCompositeErrorMessage = inlineFragmentOnNonCompositeErrorMessage;
exports.fragmentOnNonCompositeErrorMessage = fragmentOnNonCompositeErrorMessage;
exports.FragmentsOnCompositeTypes = FragmentsOnCompositeTypes;

var _GraphQLError = require("../../error/GraphQLError");

var _printer = require("../../language/printer");

var _definition = require("../../type/definition");

var _typeFromAST = require("../../utilities/typeFromAST");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function inlineFragmentOnNonCompositeErrorMessage(type) {
  return "Fragment cannot condition on non composite type \"".concat(type, "\".");
}

function fragmentOnNonCompositeErrorMessage(fragName, type) {
  return "Fragment \"".concat(fragName, "\" cannot condition on non composite ") + "type \"".concat(type, "\".");
}
/**
 * Fragments on composite type
 *
 * Fragments use a type condition to determine if they apply, since fragments
 * can only be spread into a composite type (object, interface, or union), the
 * type condition must also be a composite type.
 */


function FragmentsOnCompositeTypes(context) {
  return {
    InlineFragment: function InlineFragment(node) {
      var typeCondition = node.typeCondition;

      if (typeCondition) {
        var type = (0, _typeFromAST.typeFromAST)(context.getSchema(), typeCondition);

        if (type && !(0, _definition.isCompositeType)(type)) {
          context.reportError(new _GraphQLError.GraphQLError(inlineFragmentOnNonCompositeErrorMessage((0, _printer.print)(typeCondition)), [typeCondition]));
        }
      }
    },
    FragmentDefinition: function FragmentDefinition(node) {
      var type = (0, _typeFromAST.typeFromAST)(context.getSchema(), node.typeCondition);

      if (type && !(0, _definition.isCompositeType)(type)) {
        context.reportError(new _GraphQLError.GraphQLError(fragmentOnNonCompositeErrorMessage(node.name.value, (0, _printer.print)(node.typeCondition)), [node.typeCondition]));
      }
    }
  };
}
},{"../../error/GraphQLError":3,"../../language/printer":42,"../../type/definition":48,"../../utilities/typeFromAST":76}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknownArgMessage = unknownArgMessage;
exports.unknownDirectiveArgMessage = unknownDirectiveArgMessage;
exports.KnownArgumentNames = KnownArgumentNames;
exports.KnownArgumentNamesOnDirectives = KnownArgumentNamesOnDirectives;

var _GraphQLError = require("../../error/GraphQLError");

var _suggestionList = _interopRequireDefault(require("../../jsutils/suggestionList"));

var _quotedOrList = _interopRequireDefault(require("../../jsutils/quotedOrList"));

var _kinds = require("../../language/kinds");

var _directives = require("../../type/directives");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function unknownArgMessage(argName, fieldName, typeName, suggestedArgs) {
  var message = "Unknown argument \"".concat(argName, "\" on field \"").concat(fieldName, "\" of ") + "type \"".concat(typeName, "\".");

  if (suggestedArgs.length) {
    message += " Did you mean ".concat((0, _quotedOrList.default)(suggestedArgs), "?");
  }

  return message;
}

function unknownDirectiveArgMessage(argName, directiveName, suggestedArgs) {
  var message = "Unknown argument \"".concat(argName, "\" on directive \"@").concat(directiveName, "\".");

  if (suggestedArgs.length) {
    message += " Did you mean ".concat((0, _quotedOrList.default)(suggestedArgs), "?");
  }

  return message;
}
/**
 * Known argument names
 *
 * A GraphQL field is only valid if all supplied arguments are defined by
 * that field.
 */


function KnownArgumentNames(context) {
  return _objectSpread({}, KnownArgumentNamesOnDirectives(context), {
    Argument: function Argument(argNode) {
      var argDef = context.getArgument();
      var fieldDef = context.getFieldDef();
      var parentType = context.getParentType();

      if (!argDef && fieldDef && parentType) {
        var argName = argNode.name.value;
        var knownArgsNames = fieldDef.args.map(function (arg) {
          return arg.name;
        });
        context.reportError(new _GraphQLError.GraphQLError(unknownArgMessage(argName, fieldDef.name, parentType.name, (0, _suggestionList.default)(argName, knownArgsNames)), argNode));
      }
    }
  });
} // @internal


function KnownArgumentNamesOnDirectives(context) {
  var directiveArgs = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : _directives.specifiedDirectives;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = definedDirectives[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var directive = _step.value;
      directiveArgs[directive.name] = directive.args.map(function (arg) {
        return arg.name;
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var astDefinitions = context.getDocument().definitions;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = astDefinitions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var def = _step2.value;

      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        directiveArgs[def.name.value] = def.arguments ? def.arguments.map(function (arg) {
          return arg.name.value;
        }) : [];
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {
    Directive: function Directive(directiveNode) {
      var directiveName = directiveNode.name.value;
      var knownArgs = directiveArgs[directiveName];

      if (directiveNode.arguments && knownArgs) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = directiveNode.arguments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var argNode = _step3.value;
            var argName = argNode.name.value;

            if (knownArgs.indexOf(argName) === -1) {
              var suggestions = (0, _suggestionList.default)(argName, knownArgs);
              context.reportError(new _GraphQLError.GraphQLError(unknownDirectiveArgMessage(argName, directiveName, suggestions), argNode));
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return false;
    }
  };
}
},{"../../error/GraphQLError":3,"../../jsutils/quotedOrList":32,"../../jsutils/suggestionList":33,"../../language/kinds":37,"../../type/directives":49}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknownDirectiveMessage = unknownDirectiveMessage;
exports.misplacedDirectiveMessage = misplacedDirectiveMessage;
exports.KnownDirectives = KnownDirectives;

var _GraphQLError = require("../../error/GraphQLError");

var _kinds = require("../../language/kinds");

var _directiveLocation = require("../../language/directiveLocation");

var _directives = require("../../type/directives");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function unknownDirectiveMessage(directiveName) {
  return "Unknown directive \"".concat(directiveName, "\".");
}

function misplacedDirectiveMessage(directiveName, location) {
  return "Directive \"".concat(directiveName, "\" may not be used on ").concat(location, ".");
}
/**
 * Known directives
 *
 * A GraphQL document is only valid if all `@directives` are known by the
 * schema and legally positioned.
 */


function KnownDirectives(context) {
  var locationsMap = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : _directives.specifiedDirectives;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = definedDirectives[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var directive = _step.value;
      locationsMap[directive.name] = directive.locations;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var astDefinitions = context.getDocument().definitions;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = astDefinitions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var def = _step2.value;

      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        locationsMap[def.name.value] = def.locations.map(function (name) {
          return name.value;
        });
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {
    Directive: function Directive(node, key, parent, path, ancestors) {
      var name = node.name.value;
      var locations = locationsMap[name];

      if (!locations) {
        context.reportError(new _GraphQLError.GraphQLError(unknownDirectiveMessage(name), [node]));
        return;
      }

      var candidateLocation = getDirectiveLocationForASTPath(ancestors);

      if (candidateLocation && locations.indexOf(candidateLocation) === -1) {
        context.reportError(new _GraphQLError.GraphQLError(misplacedDirectiveMessage(name, candidateLocation), [node]));
      }
    }
  };
}

function getDirectiveLocationForASTPath(ancestors) {
  var appliedTo = ancestors[ancestors.length - 1];

  if (!Array.isArray(appliedTo)) {
    switch (appliedTo.kind) {
      case _kinds.Kind.OPERATION_DEFINITION:
        switch (appliedTo.operation) {
          case 'query':
            return _directiveLocation.DirectiveLocation.QUERY;

          case 'mutation':
            return _directiveLocation.DirectiveLocation.MUTATION;

          case 'subscription':
            return _directiveLocation.DirectiveLocation.SUBSCRIPTION;
        }

        break;

      case _kinds.Kind.FIELD:
        return _directiveLocation.DirectiveLocation.FIELD;

      case _kinds.Kind.FRAGMENT_SPREAD:
        return _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD;

      case _kinds.Kind.INLINE_FRAGMENT:
        return _directiveLocation.DirectiveLocation.INLINE_FRAGMENT;

      case _kinds.Kind.FRAGMENT_DEFINITION:
        return _directiveLocation.DirectiveLocation.FRAGMENT_DEFINITION;

      case _kinds.Kind.VARIABLE_DEFINITION:
        return _directiveLocation.DirectiveLocation.VARIABLE_DEFINITION;

      case _kinds.Kind.SCHEMA_DEFINITION:
      case _kinds.Kind.SCHEMA_EXTENSION:
        return _directiveLocation.DirectiveLocation.SCHEMA;

      case _kinds.Kind.SCALAR_TYPE_DEFINITION:
      case _kinds.Kind.SCALAR_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.SCALAR;

      case _kinds.Kind.OBJECT_TYPE_DEFINITION:
      case _kinds.Kind.OBJECT_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.OBJECT;

      case _kinds.Kind.FIELD_DEFINITION:
        return _directiveLocation.DirectiveLocation.FIELD_DEFINITION;

      case _kinds.Kind.INTERFACE_TYPE_DEFINITION:
      case _kinds.Kind.INTERFACE_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.INTERFACE;

      case _kinds.Kind.UNION_TYPE_DEFINITION:
      case _kinds.Kind.UNION_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.UNION;

      case _kinds.Kind.ENUM_TYPE_DEFINITION:
      case _kinds.Kind.ENUM_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.ENUM;

      case _kinds.Kind.ENUM_VALUE_DEFINITION:
        return _directiveLocation.DirectiveLocation.ENUM_VALUE;

      case _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION:
      case _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.INPUT_OBJECT;

      case _kinds.Kind.INPUT_VALUE_DEFINITION:
        var parentNode = ancestors[ancestors.length - 3];
        return parentNode.kind === _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION ? _directiveLocation.DirectiveLocation.INPUT_FIELD_DEFINITION : _directiveLocation.DirectiveLocation.ARGUMENT_DEFINITION;
    }
  }
}
},{"../../error/GraphQLError":3,"../../language/directiveLocation":35,"../../language/kinds":37,"../../type/directives":49}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknownFragmentMessage = unknownFragmentMessage;
exports.KnownFragmentNames = KnownFragmentNames;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function unknownFragmentMessage(fragName) {
  return "Unknown fragment \"".concat(fragName, "\".");
}
/**
 * Known fragment names
 *
 * A GraphQL document is only valid if all `...Fragment` fragment spreads refer
 * to fragments defined in the same document.
 */


function KnownFragmentNames(context) {
  return {
    FragmentSpread: function FragmentSpread(node) {
      var fragmentName = node.name.value;
      var fragment = context.getFragment(fragmentName);

      if (!fragment) {
        context.reportError(new _GraphQLError.GraphQLError(unknownFragmentMessage(fragmentName), [node.name]));
      }
    }
  };
}
},{"../../error/GraphQLError":3}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknownTypeMessage = unknownTypeMessage;
exports.KnownTypeNames = KnownTypeNames;

var _GraphQLError = require("../../error/GraphQLError");

var _suggestionList = _interopRequireDefault(require("../../jsutils/suggestionList"));

var _quotedOrList = _interopRequireDefault(require("../../jsutils/quotedOrList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function unknownTypeMessage(typeName, suggestedTypes) {
  var message = "Unknown type \"".concat(typeName, "\".");

  if (suggestedTypes.length) {
    message += " Did you mean ".concat((0, _quotedOrList.default)(suggestedTypes), "?");
  }

  return message;
}
/**
 * Known type names
 *
 * A GraphQL document is only valid if referenced types (specifically
 * variable definitions and fragment conditions) are defined by the type schema.
 */


function KnownTypeNames(context) {
  return {
    // TODO: when validating IDL, re-enable these. Experimental version does not
    // add unreferenced types, resulting in false-positive errors. Squelched
    // errors for now.
    ObjectTypeDefinition: function ObjectTypeDefinition() {
      return false;
    },
    InterfaceTypeDefinition: function InterfaceTypeDefinition() {
      return false;
    },
    UnionTypeDefinition: function UnionTypeDefinition() {
      return false;
    },
    InputObjectTypeDefinition: function InputObjectTypeDefinition() {
      return false;
    },
    NamedType: function NamedType(node) {
      var schema = context.getSchema();
      var typeName = node.name.value;
      var type = schema.getType(typeName);

      if (!type) {
        context.reportError(new _GraphQLError.GraphQLError(unknownTypeMessage(typeName, (0, _suggestionList.default)(typeName, Object.keys(schema.getTypeMap()))), [node]));
      }
    }
  };
}
},{"../../error/GraphQLError":3,"../../jsutils/quotedOrList":32,"../../jsutils/suggestionList":33}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anonOperationNotAloneMessage = anonOperationNotAloneMessage;
exports.LoneAnonymousOperation = LoneAnonymousOperation;

var _GraphQLError = require("../../error/GraphQLError");

var _kinds = require("../../language/kinds");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function anonOperationNotAloneMessage() {
  return 'This anonymous operation must be the only defined operation.';
}
/**
 * Lone anonymous operation
 *
 * A GraphQL document is only valid if when it contains an anonymous operation
 * (the query short-hand) that it contains only that one operation definition.
 */


function LoneAnonymousOperation(context) {
  var operationCount = 0;
  return {
    Document: function Document(node) {
      operationCount = node.definitions.filter(function (definition) {
        return definition.kind === _kinds.Kind.OPERATION_DEFINITION;
      }).length;
    },
    OperationDefinition: function OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(new _GraphQLError.GraphQLError(anonOperationNotAloneMessage(), [node]));
      }
    }
  };
}
},{"../../error/GraphQLError":3,"../../language/kinds":37}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaDefinitionNotAloneMessage = schemaDefinitionNotAloneMessage;
exports.canNotDefineSchemaWithinExtensionMessage = canNotDefineSchemaWithinExtensionMessage;
exports.LoneSchemaDefinition = LoneSchemaDefinition;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2018-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function schemaDefinitionNotAloneMessage() {
  return 'Must provide only one schema definition.';
}

function canNotDefineSchemaWithinExtensionMessage() {
  return 'Cannot define a new schema within a schema extension.';
}
/**
 * Lone Schema definition
 *
 * A GraphQL document is only valid if it contains only one schema definition.
 */


function LoneSchemaDefinition(context) {
  var oldSchema = context.getSchema();
  var alreadyDefined = oldSchema && (oldSchema.astNode || oldSchema.getQueryType() || oldSchema.getMutationType() || oldSchema.getSubscriptionType());
  var schemaDefinitionsCount = 0;
  return {
    SchemaDefinition: function SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(new _GraphQLError.GraphQLError(canNotDefineSchemaWithinExtensionMessage(), node));
        return;
      }

      if (schemaDefinitionsCount > 0) {
        context.reportError(new _GraphQLError.GraphQLError(schemaDefinitionNotAloneMessage(), node));
      }

      ++schemaDefinitionsCount;
    }
  };
}
},{"../../error/GraphQLError":3}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cycleErrorMessage = cycleErrorMessage;
exports.NoFragmentCycles = NoFragmentCycles;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function cycleErrorMessage(fragName, spreadNames) {
  var via = spreadNames.length ? ' via ' + spreadNames.join(', ') : '';
  return "Cannot spread fragment \"".concat(fragName, "\" within itself").concat(via, ".");
}

function NoFragmentCycles(context) {
  // Tracks already visited fragments to maintain O(N) and to ensure that cycles
  // are not redundantly reported.
  var visitedFrags = Object.create(null); // Array of AST nodes used to produce meaningful errors

  var spreadPath = []; // Position in the spread path

  var spreadPathIndexByName = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    }
  }; // This does a straight-forward DFS to find cycles.
  // It does not terminate when a cycle was found but continues to explore
  // the graph to find all possible cycles.

  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }

    var fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    var spreadNodes = context.getFragmentSpreads(fragment.selectionSet);

    if (spreadNodes.length === 0) {
      return;
    }

    spreadPathIndexByName[fragmentName] = spreadPath.length;

    for (var i = 0; i < spreadNodes.length; i++) {
      var spreadNode = spreadNodes[i];
      var spreadName = spreadNode.name.value;
      var cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);

      if (cycleIndex === undefined) {
        var spreadFragment = context.getFragment(spreadName);

        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        var cyclePath = spreadPath.slice(cycleIndex);
        var fragmentNames = cyclePath.slice(0, -1).map(function (s) {
          return s.name.value;
        });
        context.reportError(new _GraphQLError.GraphQLError(cycleErrorMessage(spreadName, fragmentNames), cyclePath));
      }

      spreadPath.pop();
    }

    spreadPathIndexByName[fragmentName] = undefined;
  }
}
},{"../../error/GraphQLError":3}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undefinedVarMessage = undefinedVarMessage;
exports.NoUndefinedVariables = NoUndefinedVariables;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function undefinedVarMessage(varName, opName) {
  return opName ? "Variable \"$".concat(varName, "\" is not defined by operation \"").concat(opName, "\".") : "Variable \"$".concat(varName, "\" is not defined.");
}
/**
 * No undefined variables
 *
 * A GraphQL operation is only valid if all variables encountered, both directly
 * and via fragment spreads, are defined by that operation.
 */


function NoUndefinedVariables(context) {
  var variableNameDefined = Object.create(null);
  return {
    OperationDefinition: {
      enter: function enter() {
        variableNameDefined = Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = usages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;
            var node = _ref2.node;
            var varName = node.name.value;

            if (variableNameDefined[varName] !== true) {
              context.reportError(new _GraphQLError.GraphQLError(undefinedVarMessage(varName, operation.name && operation.name.value), [node, operation]));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}
},{"../../error/GraphQLError":3}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unusedFragMessage = unusedFragMessage;
exports.NoUnusedFragments = NoUnusedFragments;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function unusedFragMessage(fragName) {
  return "Fragment \"".concat(fragName, "\" is never used.");
}
/**
 * No unused fragments
 *
 * A GraphQL document is only valid if all fragment definitions are spread
 * within operations, or spread within other fragments spread within operations.
 */


function NoUnusedFragments(context) {
  var operationDefs = [];
  var fragmentDefs = [];
  return {
    OperationDefinition: function OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition: function FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave: function leave() {
        var fragmentNameUsed = Object.create(null);

        for (var _i = 0; _i < operationDefs.length; _i++) {
          var operation = operationDefs[_i];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = context.getRecursivelyReferencedFragments(operation)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var fragment = _step.value;
              fragmentNameUsed[fragment.name.value] = true;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        for (var _i2 = 0; _i2 < fragmentDefs.length; _i2++) {
          var fragmentDef = fragmentDefs[_i2];
          var fragName = fragmentDef.name.value;

          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(new _GraphQLError.GraphQLError(unusedFragMessage(fragName), [fragmentDef]));
          }
        }
      }
    }
  };
}
},{"../../error/GraphQLError":3}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unusedVariableMessage = unusedVariableMessage;
exports.NoUnusedVariables = NoUnusedVariables;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function unusedVariableMessage(varName, opName) {
  return opName ? "Variable \"$".concat(varName, "\" is never used in operation \"").concat(opName, "\".") : "Variable \"$".concat(varName, "\" is never used.");
}
/**
 * No unused variables
 *
 * A GraphQL operation is only valid if all variables defined by an operation
 * are used, either directly or within a spread fragment.
 */


function NoUnusedVariables(context) {
  var variableDefs = [];
  return {
    OperationDefinition: {
      enter: function enter() {
        variableDefs = [];
      },
      leave: function leave(operation) {
        var variableNameUsed = Object.create(null);
        var usages = context.getRecursiveVariableUsages(operation);
        var opName = operation.name ? operation.name.value : null;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = usages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;
            var node = _ref2.node;
            variableNameUsed[node.name.value] = true;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        for (var _i = 0; _i < variableDefs.length; _i++) {
          var variableDef = variableDefs[_i];
          var variableName = variableDef.variable.name.value;

          if (variableNameUsed[variableName] !== true) {
            context.reportError(new _GraphQLError.GraphQLError(unusedVariableMessage(variableName, opName), [variableDef]));
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition(def) {
      variableDefs.push(def);
    }
  };
}
},{"../../error/GraphQLError":3}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldsConflictMessage = fieldsConflictMessage;
exports.OverlappingFieldsCanBeMerged = OverlappingFieldsCanBeMerged;

var _GraphQLError = require("../../error/GraphQLError");

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _find = _interopRequireDefault(require("../../jsutils/find"));

var _kinds = require("../../language/kinds");

var _printer = require("../../language/printer");

var _definition = require("../../type/definition");

var _typeFromAST = require("../../utilities/typeFromAST");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fieldsConflictMessage(responseName, reason) {
  return "Fields \"".concat(responseName, "\" conflict because ").concat(reasonMessage(reason), ". ") + 'Use different aliases on the fields to fetch both if this was intentional.';
}

function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(function (_ref) {
      var responseName = _ref[0],
          subreason = _ref[1];
      return "subfields \"".concat(responseName, "\" conflict because ").concat(reasonMessage(subreason));
    }).join(' and ');
  }

  return reason;
}
/**
 * Overlapping fields can be merged
 *
 * A selection set is only valid if all fields (including spreading any
 * fragments) either correspond to distinct response names or can be merged
 * without ambiguity.
 */


function OverlappingFieldsCanBeMerged(context) {
  // A memoization for when two fragments are compared "between" each other for
  // conflicts. Two fragments may be compared many times, so memoizing this can
  // dramatically improve the performance of this validator.
  var comparedFragmentPairs = new PairSet(); // A cache for the "field map" and list of fragment names found in any given
  // selection set. Selection sets may be asked for this information multiple
  // times, so this improves the performance of this validator.

  var cachedFieldsAndFragmentNames = new Map();
  return {
    SelectionSet: function SelectionSet(selectionSet) {
      var conflicts = findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, context.getParentType(), selectionSet);

      for (var _i = 0; _i < conflicts.length; _i++) {
        var _ref3 = conflicts[_i];
        var _ref2$ = _ref3[0];
        var responseName = _ref2$[0];
        var reason = _ref2$[1];
        var fields1 = _ref3[1];
        var fields2 = _ref3[2];
        context.reportError(new _GraphQLError.GraphQLError(fieldsConflictMessage(responseName, reason), fields1.concat(fields2)));
      }
    }
  };
}

/**
 * Algorithm:
 *
 * Conflicts occur when two fields exist in a query which will produce the same
 * response name, but represent differing values, thus creating a conflict.
 * The algorithm below finds all conflicts via making a series of comparisons
 * between fields. In order to compare as few fields as possible, this makes
 * a series of comparisons "within" sets of fields and "between" sets of fields.
 *
 * Given any selection set, a collection produces both a set of fields by
 * also including all inline fragments, as well as a list of fragments
 * referenced by fragment spreads.
 *
 * A) Each selection set represented in the document first compares "within" its
 * collected set of fields, finding any conflicts between every pair of
 * overlapping fields.
 * Note: This is the *only time* that a the fields "within" a set are compared
 * to each other. After this only fields "between" sets are compared.
 *
 * B) Also, if any fragment is referenced in a selection set, then a
 * comparison is made "between" the original set of fields and the
 * referenced fragment.
 *
 * C) Also, if multiple fragments are referenced, then comparisons
 * are made "between" each referenced fragment.
 *
 * D) When comparing "between" a set of fields and a referenced fragment, first
 * a comparison is made between each field in the original set of fields and
 * each field in the the referenced set of fields.
 *
 * E) Also, if any fragment is referenced in the referenced selection set,
 * then a comparison is made "between" the original set of fields and the
 * referenced fragment (recursively referring to step D).
 *
 * F) When comparing "between" two fragments, first a comparison is made between
 * each field in the first referenced set of fields and each field in the the
 * second referenced set of fields.
 *
 * G) Also, any fragments referenced by the first must be compared to the
 * second, and any fragments referenced by the second must be compared to the
 * first (recursively referring to step F).
 *
 * H) When comparing two fields, if both have selection sets, then a comparison
 * is made "between" both selection sets, first comparing the set of fields in
 * the first selection set with the set of fields in the second.
 *
 * I) Also, if any fragment is referenced in either selection set, then a
 * comparison is made "between" the other set of fields and the
 * referenced fragment.
 *
 * J) Also, if two fragments are referenced in both selection sets, then a
 * comparison is made "between" the two fragments.
 *
 */
// Find all conflicts found "within" a selection set, including those found
// via spreading in fragments. Called when visiting each SelectionSet in the
// GraphQL Document.
function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentType, selectionSet) {
  var conflicts = [];

  var _getFieldsAndFragment = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet),
      fieldMap = _getFieldsAndFragment[0],
      fragmentNames = _getFieldsAndFragment[1]; // (A) Find find all conflicts "within" the fields of this selection set.
  // Note: this is the *only place* `collectConflictsWithin` is called.


  collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap);

  if (fragmentNames.length !== 0) {
    // (B) Then collect conflicts between these fields and those represented by
    // each spread fragment name found.
    var comparedFragments = Object.create(null);

    for (var i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragments, comparedFragmentPairs, false, fieldMap, fragmentNames[i]); // (C) Then compare this fragment with all other fragments found in this
      // selection set to collect conflicts between fragments spread together.
      // This compares each item in the list of fragment names to every other
      // item in that same list (except for itself).

      for (var j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fragmentNames[i], fragmentNames[j]);
      }
    }
  }

  return conflicts;
} // Collect all conflicts found between a set of fields and a fragment reference
// including via spreading in any nested fragments.


function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragments, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  // Memoize so a fragment is not compared for conflicts more than once.
  if (comparedFragments[fragmentName]) {
    return;
  }

  comparedFragments[fragmentName] = true;
  var fragment = context.getFragment(fragmentName);

  if (!fragment) {
    return;
  }

  var _getReferencedFieldsA = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment),
      fieldMap2 = _getReferencedFieldsA[0],
      fragmentNames2 = _getReferencedFieldsA[1]; // Do not compare a fragment's fieldMap to itself.


  if (fieldMap === fieldMap2) {
    return;
  } // (D) First collect any conflicts between the provided collection of fields
  // and the collection of fields represented by the given fragment.


  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fieldMap2); // (E) Then collect any conflicts between the provided collection of fields
  // and any fragment names found in the given fragment.

  for (var i = 0; i < fragmentNames2.length; i++) {
    collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragments, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentNames2[i]);
  }
} // Collect all conflicts found between two fragments, including via spreading in
// any nested fragments.


function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  // No need to compare a fragment to itself.
  if (fragmentName1 === fragmentName2) {
    return;
  } // Memoize so two fragments are not compared for conflicts more than once.


  if (comparedFragmentPairs.has(fragmentName1, fragmentName2, areMutuallyExclusive)) {
    return;
  }

  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  var fragment1 = context.getFragment(fragmentName1);
  var fragment2 = context.getFragment(fragmentName2);

  if (!fragment1 || !fragment2) {
    return;
  }

  var _getReferencedFieldsA2 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment1),
      fieldMap1 = _getReferencedFieldsA2[0],
      fragmentNames1 = _getReferencedFieldsA2[1];

  var _getReferencedFieldsA3 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment2),
      fieldMap2 = _getReferencedFieldsA3[0],
      fragmentNames2 = _getReferencedFieldsA3[1]; // (F) First, collect all conflicts between these two collections of fields
  // (not including any nested fragments).


  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2); // (G) Then collect conflicts between the first fragment and any nested
  // fragments spread in the second fragment.

  for (var j = 0; j < fragmentNames2.length; j++) {
    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentNames2[j]);
  } // (G) Then collect conflicts between the second fragment and any nested
  // fragments spread in the first fragment.


  for (var i = 0; i < fragmentNames1.length; i++) {
    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[i], fragmentName2);
  }
} // Find all conflicts found between two selection sets, including those found
// via spreading in fragments. Called when determining if conflicts exist
// between the sub-fields of two overlapping fields.


function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  var conflicts = [];

  var _getFieldsAndFragment2 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType1, selectionSet1),
      fieldMap1 = _getFieldsAndFragment2[0],
      fragmentNames1 = _getFieldsAndFragment2[1];

  var _getFieldsAndFragment3 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType2, selectionSet2),
      fieldMap2 = _getFieldsAndFragment3[0],
      fragmentNames2 = _getFieldsAndFragment3[1]; // (H) First, collect all conflicts between these two collections of field.


  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2); // (I) Then collect conflicts between the first collection of fields and
  // those referenced by each fragment name associated with the second.

  if (fragmentNames2.length !== 0) {
    var comparedFragments = Object.create(null);

    for (var j = 0; j < fragmentNames2.length; j++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragments, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fragmentNames2[j]);
    }
  } // (I) Then collect conflicts between the second collection of fields and
  // those referenced by each fragment name associated with the first.


  if (fragmentNames1.length !== 0) {
    var _comparedFragments = Object.create(null);

    for (var i = 0; i < fragmentNames1.length; i++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, _comparedFragments, comparedFragmentPairs, areMutuallyExclusive, fieldMap2, fragmentNames1[i]);
    }
  } // (J) Also collect conflicts between any fragment names by the first and
  // fragment names by the second. This compares each item in the first set of
  // names to each item in the second set of names.


  for (var _i2 = 0; _i2 < fragmentNames1.length; _i2++) {
    for (var _j = 0; _j < fragmentNames2.length; _j++) {
      collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[_i2], fragmentNames2[_j]);
    }
  }

  return conflicts;
} // Collect all Conflicts "within" one collection of fields.


function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap) {
  // A field map is a keyed collection, where each key represents a response
  // name and the value at that key is a list of all fields which provide that
  // response name. For every response name, if there are multiple fields, they
  // must be compared to find a potential conflict.
  var _arr = Object.keys(fieldMap);

  for (var _i3 = 0; _i3 < _arr.length; _i3++) {
    var responseName = _arr[_i3];
    var fields = fieldMap[responseName]; // This compares every field in the list to every other field in this list
    // (except to itself). If the list only has one item, nothing needs to
    // be compared.

    if (fields.length > 1) {
      for (var i = 0; i < fields.length; i++) {
        for (var j = i + 1; j < fields.length; j++) {
          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, // within one collection is never mutually exclusive
          responseName, fields[i], fields[j]);

          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
} // Collect all Conflicts between two collections of fields. This is similar to,
// but different from the `collectConflictsWithin` function above. This check
// assumes that `collectConflictsWithin` has already been called on each
// provided collection of fields. This is true because this validator traverses
// each individual selection set.


function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  // A field map is a keyed collection, where each key represents a response
  // name and the value at that key is a list of all fields which provide that
  // response name. For any response name which appears in both provided field
  // maps, each field from the first field map must be compared to every field
  // in the second field map to find potential conflicts.
  var _arr2 = Object.keys(fieldMap1);

  for (var _i4 = 0; _i4 < _arr2.length; _i4++) {
    var responseName = _arr2[_i4];
    var fields2 = fieldMap2[responseName];

    if (fields2) {
      var fields1 = fieldMap1[responseName];

      for (var i = 0; i < fields1.length; i++) {
        for (var j = 0; j < fields2.length; j++) {
          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, fields1[i], fields2[j]);

          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
} // Determines if there is a conflict between two particular fields, including
// comparing their sub-fields.


function findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  var parentType1 = field1[0],
      node1 = field1[1],
      def1 = field1[2];
  var parentType2 = field2[0],
      node2 = field2[1],
      def2 = field2[2]; // If it is known that two fields could not possibly apply at the same
  // time, due to the parent types, then it is safe to permit them to diverge
  // in aliased field or arguments used as they will not present any ambiguity
  // by differing.
  // It is known that two parent types could never overlap if they are
  // different Object types. Interface or Union types might overlap - if not
  // in the current state of the schema, then perhaps in some future version,
  // thus may not safely diverge.

  var areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && (0, _definition.isObjectType)(parentType1) && (0, _definition.isObjectType)(parentType2); // The return type for each field.

  var type1 = def1 && def1.type;
  var type2 = def2 && def2.type;

  if (!areMutuallyExclusive) {
    // Two aliases must refer to the same field.
    var name1 = node1.name.value;
    var name2 = node2.name.value;

    if (name1 !== name2) {
      return [[responseName, "".concat(name1, " and ").concat(name2, " are different fields")], [node1], [node2]];
    } // Two field calls must have the same arguments.


    if (!sameArguments(node1.arguments || [], node2.arguments || [])) {
      return [[responseName, 'they have differing arguments'], [node1], [node2]];
    }
  }

  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [[responseName, "they return conflicting types ".concat((0, _inspect.default)(type1), " and ").concat((0, _inspect.default)(type2))], [node1], [node2]];
  } // Collect and compare sub-fields. Use the same "visited fragment names" list
  // for both collections so fields in a fragment reference are never
  // compared to themselves.


  var selectionSet1 = node1.selectionSet;
  var selectionSet2 = node2.selectionSet;

  if (selectionSet1 && selectionSet2) {
    var conflicts = findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, (0, _definition.getNamedType)(type1), selectionSet1, (0, _definition.getNamedType)(type2), selectionSet2);
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}

function sameArguments(arguments1, arguments2) {
  if (arguments1.length !== arguments2.length) {
    return false;
  }

  return arguments1.every(function (argument1) {
    var argument2 = (0, _find.default)(arguments2, function (argument) {
      return argument.name.value === argument1.name.value;
    });

    if (!argument2) {
      return false;
    }

    return sameValue(argument1.value, argument2.value);
  });
}

function sameValue(value1, value2) {
  return !value1 && !value2 || (0, _printer.print)(value1) === (0, _printer.print)(value2);
} // Two types conflict if both types could not apply to a value simultaneously.
// Composite types are ignored as their individual field types will be compared
// later recursively. However List and Non-Null types must match.


function doTypesConflict(type1, type2) {
  if ((0, _definition.isListType)(type1)) {
    return (0, _definition.isListType)(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }

  if ((0, _definition.isListType)(type2)) {
    return true;
  }

  if ((0, _definition.isNonNullType)(type1)) {
    return (0, _definition.isNonNullType)(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }

  if ((0, _definition.isNonNullType)(type2)) {
    return true;
  }

  if ((0, _definition.isLeafType)(type1) || (0, _definition.isLeafType)(type2)) {
    return type1 !== type2;
  }

  return false;
} // Given a selection set, return the collection of fields (a mapping of response
// name to field nodes and definitions) as well as a list of fragment names
// referenced via fragment spreads.


function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  var cached = cachedFieldsAndFragmentNames.get(selectionSet);

  if (!cached) {
    var nodeAndDefs = Object.create(null);
    var fragmentNames = Object.create(null);

    _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames);

    cached = [nodeAndDefs, Object.keys(fragmentNames)];
    cachedFieldsAndFragmentNames.set(selectionSet, cached);
  }

  return cached;
} // Given a reference to a fragment, return the represented collection of fields
// as well as a list of nested fragment names referenced via fragment spreads.


function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
  // Short-circuit building a type from the node if possible.
  var cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);

  if (cached) {
    return cached;
  }

  var fragmentType = (0, _typeFromAST.typeFromAST)(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragmentType, fragment.selectionSet);
}

function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (var i = 0; i < selectionSet.selections.length; i++) {
    var selection = selectionSet.selections[i];

    switch (selection.kind) {
      case _kinds.Kind.FIELD:
        var fieldName = selection.name.value;
        var fieldDef = void 0;

        if ((0, _definition.isObjectType)(parentType) || (0, _definition.isInterfaceType)(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }

        var responseName = selection.alias ? selection.alias.value : fieldName;

        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }

        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;

      case _kinds.Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;

      case _kinds.Kind.INLINE_FRAGMENT:
        var typeCondition = selection.typeCondition;
        var inlineFragmentType = typeCondition ? (0, _typeFromAST.typeFromAST)(context.getSchema(), typeCondition) : parentType;

        _collectFieldsAndFragmentNames(context, inlineFragmentType, selection.selectionSet, nodeAndDefs, fragmentNames);

        break;
    }
  }
} // Given a series of Conflicts which occurred between two sub-fields, generate
// a single Conflict.


function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [[responseName, conflicts.map(function (_ref4) {
      var reason = _ref4[0];
      return reason;
    })], conflicts.reduce(function (allFields, _ref5) {
      var fields1 = _ref5[1];
      return allFields.concat(fields1);
    }, [node1]), conflicts.reduce(function (allFields, _ref6) {
      var fields2 = _ref6[2];
      return allFields.concat(fields2);
    }, [node2])];
  }
}
/**
 * A way to keep track of pairs of things when the ordering of the pair does
 * not matter. We do this by maintaining a sort of double adjacency sets.
 */


var PairSet =
/*#__PURE__*/
function () {
  function PairSet() {
    _defineProperty(this, "_data", void 0);

    this._data = Object.create(null);
  }

  var _proto = PairSet.prototype;

  _proto.has = function has(a, b, areMutuallyExclusive) {
    var first = this._data[a];
    var result = first && first[b];

    if (result === undefined) {
      return false;
    } // areMutuallyExclusive being false is a superset of being true,
    // hence if we want to know if this PairSet "has" these two with no
    // exclusivity, we have to ensure it was added as such.


    if (areMutuallyExclusive === false) {
      return result === false;
    }

    return true;
  };

  _proto.add = function add(a, b, areMutuallyExclusive) {
    _pairSetAdd(this._data, a, b, areMutuallyExclusive);

    _pairSetAdd(this._data, b, a, areMutuallyExclusive);
  };

  return PairSet;
}();

function _pairSetAdd(data, a, b, areMutuallyExclusive) {
  var map = data[a];

  if (!map) {
    map = Object.create(null);
    data[a] = map;
  }

  map[b] = areMutuallyExclusive;
}
},{"../../error/GraphQLError":3,"../../jsutils/find":16,"../../jsutils/inspect":17,"../../language/kinds":37,"../../language/printer":42,"../../type/definition":48,"../../utilities/typeFromAST":76}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeIncompatibleSpreadMessage = typeIncompatibleSpreadMessage;
exports.typeIncompatibleAnonSpreadMessage = typeIncompatibleAnonSpreadMessage;
exports.PossibleFragmentSpreads = PossibleFragmentSpreads;

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _GraphQLError = require("../../error/GraphQLError");

var _typeComparators = require("../../utilities/typeComparators");

var _typeFromAST = require("../../utilities/typeFromAST");

var _definition = require("../../type/definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function typeIncompatibleSpreadMessage(fragName, parentType, fragType) {
  return "Fragment \"".concat(fragName, "\" cannot be spread here as objects of ") + "type \"".concat(parentType, "\" can never be of type \"").concat(fragType, "\".");
}

function typeIncompatibleAnonSpreadMessage(parentType, fragType) {
  return 'Fragment cannot be spread here as objects of ' + "type \"".concat(parentType, "\" can never be of type \"").concat(fragType, "\".");
}
/**
 * Possible fragment spread
 *
 * A fragment spread is only valid if the type condition could ever possibly
 * be true: if there is a non-empty intersection of the possible parent types,
 * and possible types which pass the type condition.
 */


function PossibleFragmentSpreads(context) {
  return {
    InlineFragment: function InlineFragment(node) {
      var fragType = context.getType();
      var parentType = context.getParentType();

      if ((0, _definition.isCompositeType)(fragType) && (0, _definition.isCompositeType)(parentType) && !(0, _typeComparators.doTypesOverlap)(context.getSchema(), fragType, parentType)) {
        context.reportError(new _GraphQLError.GraphQLError(typeIncompatibleAnonSpreadMessage((0, _inspect.default)(parentType), (0, _inspect.default)(fragType)), [node]));
      }
    },
    FragmentSpread: function FragmentSpread(node) {
      var fragName = node.name.value;
      var fragType = getFragmentType(context, fragName);
      var parentType = context.getParentType();

      if (fragType && parentType && !(0, _typeComparators.doTypesOverlap)(context.getSchema(), fragType, parentType)) {
        context.reportError(new _GraphQLError.GraphQLError(typeIncompatibleSpreadMessage(fragName, (0, _inspect.default)(parentType), (0, _inspect.default)(fragType)), [node]));
      }
    }
  };
}

function getFragmentType(context, name) {
  var frag = context.getFragment(name);

  if (frag) {
    var type = (0, _typeFromAST.typeFromAST)(context.getSchema(), frag.typeCondition);

    if ((0, _definition.isCompositeType)(type)) {
      return type;
    }
  }
}
},{"../../error/GraphQLError":3,"../../jsutils/inspect":17,"../../type/definition":48,"../../utilities/typeComparators":75,"../../utilities/typeFromAST":76}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.missingFieldArgMessage = missingFieldArgMessage;
exports.missingDirectiveArgMessage = missingDirectiveArgMessage;
exports.ProvidedRequiredArguments = ProvidedRequiredArguments;
exports.ProvidedRequiredArgumentsOnDirectives = ProvidedRequiredArgumentsOnDirectives;

var _GraphQLError = require("../../error/GraphQLError");

var _kinds = require("../../language/kinds");

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _keyMap = _interopRequireDefault(require("../../jsutils/keyMap"));

var _definition = require("../../type/definition");

var _printer = require("../../language/printer");

var _directives = require("../../type/directives");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function missingFieldArgMessage(fieldName, argName, type) {
  return "Field \"".concat(fieldName, "\" argument \"").concat(argName, "\" of type ") + "\"".concat(type, "\" is required but not provided.");
}

function missingDirectiveArgMessage(directiveName, argName, type) {
  return "Directive \"@".concat(directiveName, "\" argument \"").concat(argName, "\" of type ") + "\"".concat(type, "\" is required but not provided.");
}
/**
 * Provided required arguments
 *
 * A field or directive is only valid if all required (non-null without a
 * default value) field arguments have been provided.
 */


function ProvidedRequiredArguments(context) {
  return _objectSpread({}, ProvidedRequiredArgumentsOnDirectives(context), {
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave: function leave(fieldNode) {
        var fieldDef = context.getFieldDef();

        if (!fieldDef) {
          return false;
        }

        var argNodes = fieldNode.arguments || [];
        var argNodeMap = (0, _keyMap.default)(argNodes, function (arg) {
          return arg.name.value;
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = fieldDef.args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var argDef = _step.value;
            var argNode = argNodeMap[argDef.name];

            if (!argNode && (0, _definition.isRequiredArgument)(argDef)) {
              context.reportError(new _GraphQLError.GraphQLError(missingFieldArgMessage(fieldDef.name, argDef.name, (0, _inspect.default)(argDef.type)), [fieldNode]));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  });
} // @internal


function ProvidedRequiredArgumentsOnDirectives(context) {
  var requiredArgsMap = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : _directives.specifiedDirectives;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = definedDirectives[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var directive = _step2.value;
      requiredArgsMap[directive.name] = (0, _keyMap.default)(directive.args.filter(_definition.isRequiredArgument), function (arg) {
        return arg.name;
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var astDefinitions = context.getDocument().definitions;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = astDefinitions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var def = _step3.value;

      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        requiredArgsMap[def.name.value] = (0, _keyMap.default)(def.arguments ? def.arguments.filter(isRequiredArgumentNode) : [], function (arg) {
          return arg.name.value;
        });
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave: function leave(directiveNode) {
        var directiveName = directiveNode.name.value;
        var requiredArgs = requiredArgsMap[directiveName];

        if (requiredArgs) {
          var argNodes = directiveNode.arguments || [];
          var argNodeMap = (0, _keyMap.default)(argNodes, function (arg) {
            return arg.name.value;
          });

          var _arr = Object.keys(requiredArgs);

          for (var _i = 0; _i < _arr.length; _i++) {
            var argName = _arr[_i];

            if (!argNodeMap[argName]) {
              var argType = requiredArgs[argName].type;
              context.reportError(new _GraphQLError.GraphQLError(missingDirectiveArgMessage(directiveName, argName, (0, _definition.isType)(argType) ? (0, _inspect.default)(argType) : (0, _printer.print)(argType)), directiveNode));
            }
          }
        }
      }
    }
  };
}

function isRequiredArgumentNode(arg) {
  return arg.type.kind === _kinds.Kind.NON_NULL_TYPE && arg.defaultValue == null;
}
},{"../../error/GraphQLError":3,"../../jsutils/inspect":17,"../../jsutils/keyMap":25,"../../language/kinds":37,"../../language/printer":42,"../../type/definition":48,"../../type/directives":49}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noSubselectionAllowedMessage = noSubselectionAllowedMessage;
exports.requiredSubselectionMessage = requiredSubselectionMessage;
exports.ScalarLeafs = ScalarLeafs;

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _GraphQLError = require("../../error/GraphQLError");

var _definition = require("../../type/definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function noSubselectionAllowedMessage(fieldName, type) {
  return "Field \"".concat(fieldName, "\" must not have a selection since ") + "type \"".concat(type, "\" has no subfields.");
}

function requiredSubselectionMessage(fieldName, type) {
  return "Field \"".concat(fieldName, "\" of type \"").concat(type, "\" must have a ") + "selection of subfields. Did you mean \"".concat(fieldName, " { ... }\"?");
}
/**
 * Scalar leafs
 *
 * A GraphQL document is valid only if all leaf fields (fields without
 * sub selections) are of scalar or enum types.
 */


function ScalarLeafs(context) {
  return {
    Field: function Field(node) {
      var type = context.getType();
      var selectionSet = node.selectionSet;

      if (type) {
        if ((0, _definition.isLeafType)((0, _definition.getNamedType)(type))) {
          if (selectionSet) {
            context.reportError(new _GraphQLError.GraphQLError(noSubselectionAllowedMessage(node.name.value, (0, _inspect.default)(type)), [selectionSet]));
          }
        } else if (!selectionSet) {
          context.reportError(new _GraphQLError.GraphQLError(requiredSubselectionMessage(node.name.value, (0, _inspect.default)(type)), [node]));
        }
      }
    }
  };
}
},{"../../error/GraphQLError":3,"../../jsutils/inspect":17,"../../type/definition":48}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleFieldOnlyMessage = singleFieldOnlyMessage;
exports.SingleFieldSubscriptions = SingleFieldSubscriptions;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function singleFieldOnlyMessage(name) {
  return (name ? "Subscription \"".concat(name, "\" ") : 'Anonymous Subscription ') + 'must select only one top level field.';
}
/**
 * Subscriptions must only include one field.
 *
 * A GraphQL subscription is valid only if it contains a single root field.
 */


function SingleFieldSubscriptions(context) {
  return {
    OperationDefinition: function OperationDefinition(node) {
      if (node.operation === 'subscription') {
        if (node.selectionSet.selections.length !== 1) {
          context.reportError(new _GraphQLError.GraphQLError(singleFieldOnlyMessage(node.name && node.name.value), node.selectionSet.selections.slice(1)));
        }
      }
    }
  };
}
},{"../../error/GraphQLError":3}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateArgMessage = duplicateArgMessage;
exports.UniqueArgumentNames = UniqueArgumentNames;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function duplicateArgMessage(argName) {
  return "There can be only one argument named \"".concat(argName, "\".");
}
/**
 * Unique argument names
 *
 * A GraphQL field or directive is only valid if all supplied arguments are
 * uniquely named.
 */


function UniqueArgumentNames(context) {
  var knownArgNames = Object.create(null);
  return {
    Field: function Field() {
      knownArgNames = Object.create(null);
    },
    Directive: function Directive() {
      knownArgNames = Object.create(null);
    },
    Argument: function Argument(node) {
      var argName = node.name.value;

      if (knownArgNames[argName]) {
        context.reportError(new _GraphQLError.GraphQLError(duplicateArgMessage(argName), [knownArgNames[argName], node.name]));
      } else {
        knownArgNames[argName] = node.name;
      }

      return false;
    }
  };
}
},{"../../error/GraphQLError":3}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateDirectiveMessage = duplicateDirectiveMessage;
exports.UniqueDirectivesPerLocation = UniqueDirectivesPerLocation;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function duplicateDirectiveMessage(directiveName) {
  return "The directive \"".concat(directiveName, "\" can only be used once at ") + 'this location.';
}
/**
 * Unique directive names per location
 *
 * A GraphQL document is only valid if all directives at a given location
 * are uniquely named.
 */


function UniqueDirectivesPerLocation(context) {
  return {
    // Many different AST nodes may contain directives. Rather than listing
    // them all, just listen for entering any node, and check to see if it
    // defines any directives.
    enter: function enter(node) {
      // Flow can't refine that node.directives will only contain directives,
      var directives = node.directives;

      if (directives) {
        var knownDirectives = Object.create(null);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = directives[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var directive = _step.value;
            var directiveName = directive.name.value;

            if (knownDirectives[directiveName]) {
              context.reportError(new _GraphQLError.GraphQLError(duplicateDirectiveMessage(directiveName), [knownDirectives[directiveName], directive]));
            } else {
              knownDirectives[directiveName] = directive;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  };
}
},{"../../error/GraphQLError":3}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateFragmentNameMessage = duplicateFragmentNameMessage;
exports.UniqueFragmentNames = UniqueFragmentNames;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function duplicateFragmentNameMessage(fragName) {
  return "There can be only one fragment named \"".concat(fragName, "\".");
}
/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 */


function UniqueFragmentNames(context) {
  var knownFragmentNames = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition(node) {
      var fragmentName = node.name.value;

      if (knownFragmentNames[fragmentName]) {
        context.reportError(new _GraphQLError.GraphQLError(duplicateFragmentNameMessage(fragmentName), [knownFragmentNames[fragmentName], node.name]));
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }

      return false;
    }
  };
}
},{"../../error/GraphQLError":3}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateInputFieldMessage = duplicateInputFieldMessage;
exports.UniqueInputFieldNames = UniqueInputFieldNames;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function duplicateInputFieldMessage(fieldName) {
  return "There can be only one input field named \"".concat(fieldName, "\".");
}
/**
 * Unique input field names
 *
 * A GraphQL input object value is only valid if all supplied fields are
 * uniquely named.
 */


function UniqueInputFieldNames(context) {
  var knownNameStack = [];
  var knownNames = Object.create(null);
  return {
    ObjectValue: {
      enter: function enter() {
        knownNameStack.push(knownNames);
        knownNames = Object.create(null);
      },
      leave: function leave() {
        knownNames = knownNameStack.pop();
      }
    },
    ObjectField: function ObjectField(node) {
      var fieldName = node.name.value;

      if (knownNames[fieldName]) {
        context.reportError(new _GraphQLError.GraphQLError(duplicateInputFieldMessage(fieldName), [knownNames[fieldName], node.name]));
      } else {
        knownNames[fieldName] = node.name;
      }

      return false;
    }
  };
}
},{"../../error/GraphQLError":3}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateOperationNameMessage = duplicateOperationNameMessage;
exports.UniqueOperationNames = UniqueOperationNames;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function duplicateOperationNameMessage(operationName) {
  return "There can be only one operation named \"".concat(operationName, "\".");
}
/**
 * Unique operation names
 *
 * A GraphQL document is only valid if all defined operations have unique names.
 */


function UniqueOperationNames(context) {
  var knownOperationNames = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition(node) {
      var operationName = node.name;

      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(new _GraphQLError.GraphQLError(duplicateOperationNameMessage(operationName.value), [knownOperationNames[operationName.value], operationName]));
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }

      return false;
    },
    FragmentDefinition: function FragmentDefinition() {
      return false;
    }
  };
}
},{"../../error/GraphQLError":3}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateVariableMessage = duplicateVariableMessage;
exports.UniqueVariableNames = UniqueVariableNames;

var _GraphQLError = require("../../error/GraphQLError");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function duplicateVariableMessage(variableName) {
  return "There can be only one variable named \"".concat(variableName, "\".");
}
/**
 * Unique variable names
 *
 * A GraphQL operation is only valid if all its variables are uniquely named.
 */


function UniqueVariableNames(context) {
  var knownVariableNames = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition() {
      knownVariableNames = Object.create(null);
    },
    VariableDefinition: function VariableDefinition(node) {
      var variableName = node.variable.name.value;

      if (knownVariableNames[variableName]) {
        context.reportError(new _GraphQLError.GraphQLError(duplicateVariableMessage(variableName), [knownVariableNames[variableName], node.variable.name]));
      } else {
        knownVariableNames[variableName] = node.variable.name;
      }
    }
  };
}
},{"../../error/GraphQLError":3}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badValueMessage = badValueMessage;
exports.requiredFieldMessage = requiredFieldMessage;
exports.unknownFieldMessage = unknownFieldMessage;
exports.ValuesOfCorrectType = ValuesOfCorrectType;

var _GraphQLError = require("../../error/GraphQLError");

var _printer = require("../../language/printer");

var _definition = require("../../type/definition");

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _isInvalid = _interopRequireDefault(require("../../jsutils/isInvalid"));

var _keyMap = _interopRequireDefault(require("../../jsutils/keyMap"));

var _orList = _interopRequireDefault(require("../../jsutils/orList"));

var _suggestionList = _interopRequireDefault(require("../../jsutils/suggestionList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function badValueMessage(typeName, valueName, message) {
  return "Expected type ".concat(typeName, ", found ").concat(valueName) + (message ? "; ".concat(message) : '.');
}

function requiredFieldMessage(typeName, fieldName, fieldTypeName) {
  return "Field ".concat(typeName, ".").concat(fieldName, " of required type ") + "".concat(fieldTypeName, " was not provided.");
}

function unknownFieldMessage(typeName, fieldName, message) {
  return "Field \"".concat(fieldName, "\" is not defined by type ").concat(typeName) + (message ? "; ".concat(message) : '.');
}
/**
 * Value literals of correct type
 *
 * A GraphQL document is only valid if all value literals are of the type
 * expected at their position.
 */


function ValuesOfCorrectType(context) {
  return {
    NullValue: function NullValue(node) {
      var type = context.getInputType();

      if ((0, _definition.isNonNullType)(type)) {
        context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(type), (0, _printer.print)(node)), node));
      }
    },
    ListValue: function ListValue(node) {
      // Note: TypeInfo will traverse into a list's item type, so look to the
      // parent input type to check if it is a list.
      var type = (0, _definition.getNullableType)(context.getParentInputType());

      if (!(0, _definition.isListType)(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      }
    },
    ObjectValue: function ObjectValue(node) {
      var type = (0, _definition.getNamedType)(context.getInputType());

      if (!(0, _definition.isInputObjectType)(type)) {
        isValidScalar(context, node);
        return false; // Don't traverse further.
      } // Ensure every required field exists.


      var inputFields = type.getFields();
      var fieldNodeMap = (0, _keyMap.default)(node.fields, function (field) {
        return field.name.value;
      });

      var _arr = Object.keys(inputFields);

      for (var _i = 0; _i < _arr.length; _i++) {
        var fieldName = _arr[_i];
        var fieldDef = inputFields[fieldName];
        var fieldNode = fieldNodeMap[fieldName];

        if (!fieldNode && (0, _definition.isRequiredInputField)(fieldDef)) {
          var typeStr = (0, _inspect.default)(fieldDef.type);
          context.reportError(new _GraphQLError.GraphQLError(requiredFieldMessage(type.name, fieldName, typeStr), node));
        }
      }
    },
    ObjectField: function ObjectField(node) {
      var parentType = (0, _definition.getNamedType)(context.getParentInputType());
      var fieldType = context.getInputType();

      if (!fieldType && (0, _definition.isInputObjectType)(parentType)) {
        var suggestions = (0, _suggestionList.default)(node.name.value, Object.keys(parentType.getFields()));
        var didYouMean = suggestions.length !== 0 ? "Did you mean ".concat((0, _orList.default)(suggestions), "?") : undefined;
        context.reportError(new _GraphQLError.GraphQLError(unknownFieldMessage(parentType.name, node.name.value, didYouMean), node));
      }
    },
    EnumValue: function EnumValue(node) {
      var type = (0, _definition.getNamedType)(context.getInputType());

      if (!(0, _definition.isEnumType)(type)) {
        isValidScalar(context, node);
      } else if (!type.getValue(node.value)) {
        context.reportError(new _GraphQLError.GraphQLError(badValueMessage(type.name, (0, _printer.print)(node), enumTypeSuggestion(type, node)), node));
      }
    },
    IntValue: function IntValue(node) {
      return isValidScalar(context, node);
    },
    FloatValue: function FloatValue(node) {
      return isValidScalar(context, node);
    },
    StringValue: function StringValue(node) {
      return isValidScalar(context, node);
    },
    BooleanValue: function BooleanValue(node) {
      return isValidScalar(context, node);
    }
  };
}
/**
 * Any value literal may be a valid representation of a Scalar, depending on
 * that scalar type.
 */


function isValidScalar(context, node) {
  // Report any error at the full type expected by the location.
  var locationType = context.getInputType();

  if (!locationType) {
    return;
  }

  var type = (0, _definition.getNamedType)(locationType);

  if (!(0, _definition.isScalarType)(type)) {
    context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node), enumTypeSuggestion(type, node)), node));
    return;
  } // Scalars determine if a literal value is valid via parseLiteral() which
  // may throw or return an invalid value to indicate failure.


  try {
    var parseResult = type.parseLiteral(node, undefined
    /* variables */
    );

    if ((0, _isInvalid.default)(parseResult)) {
      context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node)), node));
    }
  } catch (error) {
    // Ensure a reference to the original error is maintained.
    context.reportError(new _GraphQLError.GraphQLError(badValueMessage((0, _inspect.default)(locationType), (0, _printer.print)(node), error.message), node, undefined, undefined, undefined, error));
  }
}

function enumTypeSuggestion(type, node) {
  if ((0, _definition.isEnumType)(type)) {
    var suggestions = (0, _suggestionList.default)((0, _printer.print)(node), type.getValues().map(function (value) {
      return value.name;
    }));

    if (suggestions.length !== 0) {
      return "Did you mean the enum value ".concat((0, _orList.default)(suggestions), "?");
    }
  }
}
},{"../../error/GraphQLError":3,"../../jsutils/inspect":17,"../../jsutils/isInvalid":22,"../../jsutils/keyMap":25,"../../jsutils/orList":29,"../../jsutils/suggestionList":33,"../../language/printer":42,"../../type/definition":48}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonInputTypeOnVarMessage = nonInputTypeOnVarMessage;
exports.VariablesAreInputTypes = VariablesAreInputTypes;

var _GraphQLError = require("../../error/GraphQLError");

var _printer = require("../../language/printer");

var _definition = require("../../type/definition");

var _typeFromAST = require("../../utilities/typeFromAST");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function nonInputTypeOnVarMessage(variableName, typeName) {
  return "Variable \"$".concat(variableName, "\" cannot be non-input type \"").concat(typeName, "\".");
}
/**
 * Variables are input types
 *
 * A GraphQL operation is only valid if all the variables it defines are of
 * input types (scalar, enum, or input object).
 */


function VariablesAreInputTypes(context) {
  return {
    VariableDefinition: function VariableDefinition(node) {
      var type = (0, _typeFromAST.typeFromAST)(context.getSchema(), node.type); // If the variable type is not an input type, return an error.

      if (type && !(0, _definition.isInputType)(type)) {
        var variableName = node.variable.name.value;
        context.reportError(new _GraphQLError.GraphQLError(nonInputTypeOnVarMessage(variableName, (0, _printer.print)(node.type)), [node.type]));
      }
    }
  };
}
},{"../../error/GraphQLError":3,"../../language/printer":42,"../../type/definition":48,"../../utilities/typeFromAST":76}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badVarPosMessage = badVarPosMessage;
exports.VariablesInAllowedPosition = VariablesInAllowedPosition;

var _inspect = _interopRequireDefault(require("../../jsutils/inspect"));

var _GraphQLError = require("../../error/GraphQLError");

var _kinds = require("../../language/kinds");

var _definition = require("../../type/definition");

var _typeComparators = require("../../utilities/typeComparators");

var _typeFromAST = require("../../utilities/typeFromAST");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
function badVarPosMessage(varName, varType, expectedType) {
  return "Variable \"$".concat(varName, "\" of type \"").concat(varType, "\" used in ") + "position expecting type \"".concat(expectedType, "\".");
}
/**
 * Variables passed to field arguments conform to type
 */


function VariablesInAllowedPosition(context) {
  var varDefMap = Object.create(null);
  return {
    OperationDefinition: {
      enter: function enter() {
        varDefMap = Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = usages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;
            var node = _ref2.node,
                type = _ref2.type,
                defaultValue = _ref2.defaultValue;
            var varName = node.name.value;
            var varDef = varDefMap[varName];

            if (varDef && type) {
              // A var type is allowed if it is the same or more strict (e.g. is
              // a subtype of) than the expected type. It can be more strict if
              // the variable type is non-null when the expected type is nullable.
              // If both are list types, the variable item type can be more strict
              // than the expected item type (contravariant).
              var schema = context.getSchema();
              var varType = (0, _typeFromAST.typeFromAST)(schema, varDef.type);

              if (varType && !allowedVariableUsage(schema, varType, varDef.defaultValue, type, defaultValue)) {
                context.reportError(new _GraphQLError.GraphQLError(badVarPosMessage(varName, (0, _inspect.default)(varType), (0, _inspect.default)(type)), [varDef, node]));
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
/**
 * Returns true if the variable is allowed in the location it was found,
 * which includes considering if default values exist for either the variable
 * or the location at which it is located.
 */


function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if ((0, _definition.isNonNullType)(locationType) && !(0, _definition.isNonNullType)(varType)) {
    var hasNonNullVariableDefaultValue = varDefaultValue && varDefaultValue.kind !== _kinds.Kind.NULL;
    var hasLocationDefaultValue = locationDefaultValue !== undefined;

    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }

    var nullableLocationType = locationType.ofType;
    return (0, _typeComparators.isTypeSubTypeOf)(schema, varType, nullableLocationType);
  }

  return (0, _typeComparators.isTypeSubTypeOf)(schema, varType, locationType);
}
},{"../../error/GraphQLError":3,"../../jsutils/inspect":17,"../../language/kinds":37,"../../type/definition":48,"../../utilities/typeComparators":75,"../../utilities/typeFromAST":76}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specifiedSDLRules = exports.specifiedRules = void 0;

var _ExecutableDefinitions = require("./rules/ExecutableDefinitions");

var _UniqueOperationNames = require("./rules/UniqueOperationNames");

var _LoneAnonymousOperation = require("./rules/LoneAnonymousOperation");

var _SingleFieldSubscriptions = require("./rules/SingleFieldSubscriptions");

var _KnownTypeNames = require("./rules/KnownTypeNames");

var _FragmentsOnCompositeTypes = require("./rules/FragmentsOnCompositeTypes");

var _VariablesAreInputTypes = require("./rules/VariablesAreInputTypes");

var _ScalarLeafs = require("./rules/ScalarLeafs");

var _FieldsOnCorrectType = require("./rules/FieldsOnCorrectType");

var _UniqueFragmentNames = require("./rules/UniqueFragmentNames");

var _KnownFragmentNames = require("./rules/KnownFragmentNames");

var _NoUnusedFragments = require("./rules/NoUnusedFragments");

var _PossibleFragmentSpreads = require("./rules/PossibleFragmentSpreads");

var _NoFragmentCycles = require("./rules/NoFragmentCycles");

var _UniqueVariableNames = require("./rules/UniqueVariableNames");

var _NoUndefinedVariables = require("./rules/NoUndefinedVariables");

var _NoUnusedVariables = require("./rules/NoUnusedVariables");

var _KnownDirectives = require("./rules/KnownDirectives");

var _UniqueDirectivesPerLocation = require("./rules/UniqueDirectivesPerLocation");

var _KnownArgumentNames = require("./rules/KnownArgumentNames");

var _UniqueArgumentNames = require("./rules/UniqueArgumentNames");

var _ValuesOfCorrectType = require("./rules/ValuesOfCorrectType");

var _ProvidedRequiredArguments = require("./rules/ProvidedRequiredArguments");

var _VariablesInAllowedPosition = require("./rules/VariablesInAllowedPosition");

var _OverlappingFieldsCanBeMerged = require("./rules/OverlappingFieldsCanBeMerged");

var _UniqueInputFieldNames = require("./rules/UniqueInputFieldNames");

var _LoneSchemaDefinition = require("./rules/LoneSchemaDefinition");

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
// Spec Section: "Executable Definitions"
// Spec Section: "Operation Name Uniqueness"
// Spec Section: "Lone Anonymous Operation"
// Spec Section: "Subscriptions with Single Root Field"
// Spec Section: "Fragment Spread Type Existence"
// Spec Section: "Fragments on Composite Types"
// Spec Section: "Variables are Input Types"
// Spec Section: "Leaf Field Selections"
// Spec Section: "Field Selections on Objects, Interfaces, and Unions Types"
// Spec Section: "Fragment Name Uniqueness"
// Spec Section: "Fragment spread target defined"
// Spec Section: "Fragments must be used"
// Spec Section: "Fragment spread is possible"
// Spec Section: "Fragments must not form cycles"
// Spec Section: "Variable Uniqueness"
// Spec Section: "All Variable Used Defined"
// Spec Section: "All Variables Used"
// Spec Section: "Directives Are Defined"
// Spec Section: "Directives Are Unique Per Location"
// Spec Section: "Argument Names"
// Spec Section: "Argument Uniqueness"
// Spec Section: "Value Type Correctness"
// Spec Section: "Argument Optionality"
// Spec Section: "All Variable Usages Are Allowed"
// Spec Section: "Field Selection Merging"
// Spec Section: "Input Object Field Uniqueness"

/**
 * This set includes all validation rules defined by the GraphQL spec.
 *
 * The order of the rules in this list has been adjusted to lead to the
 * most clear output when encountering multiple validation errors.
 */
var specifiedRules = [_ExecutableDefinitions.ExecutableDefinitions, _UniqueOperationNames.UniqueOperationNames, _LoneAnonymousOperation.LoneAnonymousOperation, _SingleFieldSubscriptions.SingleFieldSubscriptions, _KnownTypeNames.KnownTypeNames, _FragmentsOnCompositeTypes.FragmentsOnCompositeTypes, _VariablesAreInputTypes.VariablesAreInputTypes, _ScalarLeafs.ScalarLeafs, _FieldsOnCorrectType.FieldsOnCorrectType, _UniqueFragmentNames.UniqueFragmentNames, _KnownFragmentNames.KnownFragmentNames, _NoUnusedFragments.NoUnusedFragments, _PossibleFragmentSpreads.PossibleFragmentSpreads, _NoFragmentCycles.NoFragmentCycles, _UniqueVariableNames.UniqueVariableNames, _NoUndefinedVariables.NoUndefinedVariables, _NoUnusedVariables.NoUnusedVariables, _KnownDirectives.KnownDirectives, _UniqueDirectivesPerLocation.UniqueDirectivesPerLocation, _KnownArgumentNames.KnownArgumentNames, _UniqueArgumentNames.UniqueArgumentNames, _ValuesOfCorrectType.ValuesOfCorrectType, _ProvidedRequiredArguments.ProvidedRequiredArguments, _VariablesInAllowedPosition.VariablesInAllowedPosition, _OverlappingFieldsCanBeMerged.OverlappingFieldsCanBeMerged, _UniqueInputFieldNames.UniqueInputFieldNames];
exports.specifiedRules = specifiedRules;
// @internal
var specifiedSDLRules = [_LoneSchemaDefinition.LoneSchemaDefinition, _KnownDirectives.KnownDirectives, _UniqueDirectivesPerLocation.UniqueDirectivesPerLocation, _KnownArgumentNames.KnownArgumentNamesOnDirectives, _UniqueArgumentNames.UniqueArgumentNames, _UniqueInputFieldNames.UniqueInputFieldNames, _ProvidedRequiredArguments.ProvidedRequiredArgumentsOnDirectives];
exports.specifiedSDLRules = specifiedSDLRules;
},{"./rules/ExecutableDefinitions":81,"./rules/FieldsOnCorrectType":82,"./rules/FragmentsOnCompositeTypes":83,"./rules/KnownArgumentNames":84,"./rules/KnownDirectives":85,"./rules/KnownFragmentNames":86,"./rules/KnownTypeNames":87,"./rules/LoneAnonymousOperation":88,"./rules/LoneSchemaDefinition":89,"./rules/NoFragmentCycles":90,"./rules/NoUndefinedVariables":91,"./rules/NoUnusedFragments":92,"./rules/NoUnusedVariables":93,"./rules/OverlappingFieldsCanBeMerged":94,"./rules/PossibleFragmentSpreads":95,"./rules/ProvidedRequiredArguments":96,"./rules/ScalarLeafs":97,"./rules/SingleFieldSubscriptions":98,"./rules/UniqueArgumentNames":99,"./rules/UniqueDirectivesPerLocation":100,"./rules/UniqueFragmentNames":101,"./rules/UniqueInputFieldNames":102,"./rules/UniqueOperationNames":103,"./rules/UniqueVariableNames":104,"./rules/ValuesOfCorrectType":105,"./rules/VariablesAreInputTypes":106,"./rules/VariablesInAllowedPosition":107}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.validateSDL = validateSDL;
exports.assertValidSDL = assertValidSDL;
exports.assertValidSDLExtension = assertValidSDLExtension;

var _invariant = _interopRequireDefault(require("../jsutils/invariant"));

var _visitor = require("../language/visitor");

var _validate = require("../type/validate");

var _TypeInfo = require("../utilities/TypeInfo");

var _specifiedRules = require("./specifiedRules");

var _ValidationContext = require("./ValidationContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Implements the "Validation" section of the spec.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the document is valid.
 *
 * A list of specific validation rules may be provided. If not provided, the
 * default list of rules defined by the GraphQL specification will be used.
 *
 * Each validation rules is a function which returns a visitor
 * (see the language/visitor API). Visitor methods are expected to return
 * GraphQLErrors, or Arrays of GraphQLErrors when invalid.
 *
 * Optionally a custom TypeInfo instance may be provided. If not provided, one
 * will be created from the provided schema.
 */
function validate(schema, documentAST) {
  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _specifiedRules.specifiedRules;
  var typeInfo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _TypeInfo.TypeInfo(schema);
  !documentAST ? (0, _invariant.default)(0, 'Must provide document') : void 0; // If the schema used for validation is invalid, throw an error.

  (0, _validate.assertValidSchema)(schema);
  var context = new _ValidationContext.ValidationContext(schema, documentAST, typeInfo); // This uses a specialized visitor which runs multiple visitors in parallel,
  // while maintaining the visitor skip and break API.

  var visitor = (0, _visitor.visitInParallel)(rules.map(function (rule) {
    return rule(context);
  })); // Visit the whole document with each instance of all provided rules.

  (0, _visitor.visit)(documentAST, (0, _visitor.visitWithTypeInfo)(typeInfo, visitor));
  return context.getErrors();
} // @internal


function validateSDL(documentAST, schemaToExtend) {
  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _specifiedRules.specifiedSDLRules;
  var context = new _ValidationContext.SDLValidationContext(documentAST, schemaToExtend);
  var visitors = rules.map(function (rule) {
    return rule(context);
  });
  (0, _visitor.visit)(documentAST, (0, _visitor.visitInParallel)(visitors));
  return context.getErrors();
}
/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */


function assertValidSDL(documentAST) {
  var errors = validateSDL(documentAST);

  if (errors.length !== 0) {
    throw new Error(errors.map(function (error) {
      return error.message;
    }).join('\n\n'));
  }
}
/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */


function assertValidSDLExtension(documentAST, schema) {
  var errors = validateSDL(documentAST, schema);

  if (errors.length !== 0) {
    throw new Error(errors.map(function (error) {
      return error.message;
    }).join('\n\n'));
  }
}
},{"../jsutils/invariant":19,"../language/visitor":44,"../type/validate":54,"../utilities/TypeInfo":55,"./ValidationContext":79,"./specifiedRules":108}],110:[function(require,module,exports){
'use strict';

exports.isIterable = isIterable;
exports.isArrayLike = isArrayLike;
exports.isCollection = isCollection;
exports.getIterator = getIterator;
exports.getIteratorMethod = getIteratorMethod;
exports.createIterator = createIterator;
exports.forEach = forEach;
exports.isAsyncIterable = isAsyncIterable;
exports.getAsyncIterator = getAsyncIterator;
exports.getAsyncIteratorMethod = getAsyncIteratorMethod;
exports.createAsyncIterator = createAsyncIterator;
exports.forAwaitEach = forAwaitEach;

var SYMBOL = typeof Symbol === 'function' ? Symbol : void 0;

var SYMBOL_ITERATOR = SYMBOL && SYMBOL.iterator;

var $$iterator = exports.$$iterator = SYMBOL_ITERATOR || '@@iterator';

function isIterable(obj) {
  return !!getIteratorMethod(obj);
}

function isArrayLike(obj) {
  var length = obj != null && obj.length;
  return typeof length === 'number' && length >= 0 && length % 1 === 0;
}

function isCollection(obj) {
  return Object(obj) === obj && (isArrayLike(obj) || isIterable(obj));
}

function getIterator(iterable) {
  var method = getIteratorMethod(iterable);
  if (method) {
    return method.call(iterable);
  }
}

function getIteratorMethod(iterable) {
  if (iterable != null) {
    var method = SYMBOL_ITERATOR && iterable[SYMBOL_ITERATOR] || iterable['@@iterator'];
    if (typeof method === 'function') {
      return method;
    }
  }
}

function createIterator(collection) {
  if (collection != null) {
    var iterator = getIterator(collection);
    if (iterator) {
      return iterator;
    }
    if (isArrayLike(collection)) {
      return new ArrayLikeIterator(collection);
    }
  }
}

function ArrayLikeIterator(obj) {
  this._o = obj;
  this._i = 0;
}

ArrayLikeIterator.prototype[$$iterator] = function () {
  return this;
};

ArrayLikeIterator.prototype.next = function () {
  if (this._o === void 0 || this._i >= this._o.length) {
    this._o = void 0;
    return { value: void 0, done: true };
  }
  return { value: this._o[this._i++], done: false };
};

function forEach(collection, callback, thisArg) {
  if (collection != null) {
    if (typeof collection.forEach === 'function') {
      return collection.forEach(callback, thisArg);
    }
    var i = 0;
    var iterator = getIterator(collection);
    if (iterator) {
      var step;
      while (!(step = iterator.next()).done) {
        callback.call(thisArg, step.value, i++, collection);

        if (i > 9999999) {
          throw new TypeError('Near-infinite iteration.');
        }
      }
    } else if (isArrayLike(collection)) {
      for (; i < collection.length; i++) {
        if (collection.hasOwnProperty(i)) {
          callback.call(thisArg, collection[i], i, collection);
        }
      }
    }
  }
}

var SYMBOL_ASYNC_ITERATOR = SYMBOL && SYMBOL.asyncIterator;

var $$asyncIterator = exports.$$asyncIterator = SYMBOL_ASYNC_ITERATOR || '@@asyncIterator';

function isAsyncIterable(obj) {
  return !!getAsyncIteratorMethod(obj);
}

function getAsyncIterator(asyncIterable) {
  var method = getAsyncIteratorMethod(asyncIterable);
  if (method) {
    return method.call(asyncIterable);
  }
}

function getAsyncIteratorMethod(asyncIterable) {
  if (asyncIterable != null) {
    var method = SYMBOL_ASYNC_ITERATOR && asyncIterable[SYMBOL_ASYNC_ITERATOR] || asyncIterable['@@asyncIterator'];
    if (typeof method === 'function') {
      return method;
    }
  }
}

function createAsyncIterator(source) {
  if (source != null) {
    var asyncIterator = getAsyncIterator(source);
    if (asyncIterator) {
      return asyncIterator;
    }
    var iterator = createIterator(source);
    if (iterator) {
      return new AsyncFromSyncIterator(iterator);
    }
  }
}

function AsyncFromSyncIterator(iterator) {
  this._i = iterator;
}

AsyncFromSyncIterator.prototype[$$asyncIterator] = function () {
  return this;
};

AsyncFromSyncIterator.prototype.next = function () {
  var step = this._i.next();
  return Promise.resolve(step.value).then(function (value) {
    return { value: value, done: step.done };
  });
};

function forAwaitEach(source, callback, thisArg) {
  var asyncIterator = createAsyncIterator(source);
  if (asyncIterator) {
    var i = 0;
    return new Promise(function (resolve, reject) {
      function next() {
        asyncIterator.next().then(function (step) {
          if (!step.done) {
            Promise.resolve(callback.call(thisArg, step.value, i++, source)).then(next).catch(reject);
          } else {
            resolve();
          }

          return null;
        }).catch(reject);

        return null;
      }
      next();
    });
  }
}


},{}],111:[function(require,module,exports){
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2])(2)
});
