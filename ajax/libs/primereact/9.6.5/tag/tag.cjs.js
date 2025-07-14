'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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

var TagBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Tag',
    value: null,
    severity: null,
    rounded: false,
    icon: null,
    style: null,
    className: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Tag = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var _classNames;
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = TagBase.getProps(inProps, context);
  var _TagBase$setMetaData = TagBase.setMetaData({
      props: props
    }),
    ptm = _TagBase$setMetaData.ptm;
  var elementRef = React__namespace.useRef(null);
  var className = utils.classNames('p-tag p-component', (_classNames = {}, _defineProperty(_classNames, "p-tag-".concat(props.severity), props.severity !== null), _defineProperty(_classNames, 'p-tag-rounded', props.rounded), _classNames), props.className);
  var iconProps = utils.mergeProps({
    className: 'p-tag-icon'
  }, ptm('icon'));
  var icon = utils.IconUtils.getJSXIcon(props.icon, _objectSpread({}, iconProps), {
    props: props
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var rootProps = utils.mergeProps({
    ref: elementRef,
    className: className,
    style: props.style
  }, TagBase.getOtherProps(props), ptm('root'));
  var valueProps = utils.mergeProps({
    className: 'p-tag-value'
  }, ptm('value'));
  return /*#__PURE__*/React__namespace.createElement("span", rootProps, icon, /*#__PURE__*/React__namespace.createElement("span", valueProps, props.value), /*#__PURE__*/React__namespace.createElement("span", null, props.children));
});
Tag.displayName = 'Tag';

exports.Tag = Tag;
