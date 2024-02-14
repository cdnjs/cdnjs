'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');

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

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      focusedState = _ref.focusedState,
      checked = _ref.checked;
    return utils.classNames('p-inputswitch p-component', {
      'p-inputswitch-checked': checked,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    });
  },
  slider: 'p-inputswitch-slider'
};
var styles = "\n@layer primereact {\n    .p-inputswitch {\n        position: relative;\n        display: inline-block;\n    }\n    \n    .p-inputswitch-slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        border: 1px solid transparent;\n    }\n    \n    .p-inputswitch-slider:before {\n        position: absolute;\n        content: \"\";\n        top: 50%;\n    }\n}\n";
var InputSwitchBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'InputSwitch',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    id: null,
    inputId: null,
    inputRef: null,
    name: null,
    onBlur: null,
    onChange: null,
    onFocus: null,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var InputSwitch = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = InputSwitchBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _InputSwitchBase$setM = InputSwitchBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      }
    }),
    ptm = _InputSwitchBase$setM.ptm,
    cx = _InputSwitchBase$setM.cx,
    isUnstyled = _InputSwitchBase$setM.isUnstyled;
  componentbase.useHandleStyle(InputSwitchBase.css.styles, isUnstyled, {
    name: 'inputswitch'
  });
  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var checked = props.checked === props.trueValue;
  var onClick = function onClick(event) {
    if (props.disabled) {
      return;
    }
    toggle(event);
    utils.DomHandler.focus(inputRef.current);
    event.preventDefault();
  };
  var toggle = function toggle(event) {
    if (props.onChange) {
      var value = checked ? props.falseValue : props.trueValue;
      props.onChange({
        originalEvent: event,
        value: value,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    props.onBlur && props.onBlur(event);
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return utils.DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = InputSwitchBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var rootProps = mergeProps({
    className: utils.classNames(props.className, cx('root', {
      focusedState: focusedState,
      checked: checked
    })),
    style: props.style,
    onClick: onClick,
    role: 'checkbox',
    'aria-checked': checked,
    'data-p-highlight': checked,
    'data-p-disabled': props.disabled
  }, otherProps, ptm('root'));
  var hiddenInputWrapperProps = mergeProps({
    className: 'p-hidden-accessible'
  }, ptm('hiddenInputWrapper'));
  var hiddenInputProps = mergeProps(_objectSpread({
    type: 'checkbox',
    id: props.inputId,
    name: props.name,
    checked: checked,
    onChange: toggle,
    onFocus: onFocus,
    onBlur: onBlur,
    disabled: props.disabled,
    role: 'switch',
    tabIndex: props.tabIndex,
    'aria-checked': checked
  }, ariaProps), ptm('hiddenInput'));
  var sliderProps = mergeProps({
    className: cx('slider')
  }, ptm('slider'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), /*#__PURE__*/React__namespace.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React__namespace.createElement("input", _extends({
    ref: inputRef
  }, hiddenInputProps))), /*#__PURE__*/React__namespace.createElement("span", sliderProps)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
InputSwitch.displayName = 'InputSwitch';

exports.InputSwitch = InputSwitch;
