'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return utils.classNames('p-icon-field', {
      'p-icon-field-right': props.iconPosition === 'right',
      'p-icon-field-left': props.iconPosition === 'left'
    });
  }
};
var IconFieldBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'IconField',
    __parentMetadata: null,
    children: undefined,
    className: null,
    iconPosition: 'right'
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var IconField = /*#__PURE__*/React__default["default"].memo(/*#__PURE__*/React__default["default"].forwardRef(function (inProps, ref) {
  var elementRef = React.useRef(ref);
  var mergeProps = hooks.useMergeProps();
  var context = React.useContext(api.PrimeReactContext);
  var props = IconFieldBase.getProps(inProps, context);
  var _IconFieldBase$setMet = IconFieldBase.setMetaData(_objectSpread(_objectSpread({
      props: props
    }, props.__parentMetadata), {}, {
      context: {
        iconPosition: props.iconPosition
      }
    })),
    ptm = _IconFieldBase$setMet.ptm,
    cx = _IconFieldBase$setMet.cx;
  var rootProps = mergeProps({
    className: utils.classNames(props.className, cx('root', {
      iconPosition: props.iconPosition
    }))
  }, IconFieldBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__default["default"].createElement("div", _extends({}, rootProps, {
    ref: elementRef
  }), React.Children.map(props.children, function (child, index) {
    return /*#__PURE__*/React.cloneElement(child, {
      iconPosition: props.iconPosition
    });
  }));
}));
IconField.displayName = 'IconField';

exports.IconField = IconField;
