'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var check = require('primereact/icons/check');
var times = require('primereact/icons/times');
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
      context = _ref.context;
    return utils.classNames('p-tristatecheckbox p-checkbox p-component', {
      'p-highlight': props.value !== '' && props.value !== null,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
    });
  },
  checkIcon: 'p-checkbox-icon p-c',
  box: 'p-checkbox-box',
  input: 'p-checkbox-input'
};
var TriStateCheckboxBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'TriStateCheckbox',
    autoFocus: false,
    checkIcon: null,
    className: null,
    disabled: false,
    id: null,
    invalid: false,
    variant: null,
    onChange: null,
    readOnly: false,
    style: null,
    tabIndex: '0',
    tooltip: null,
    tooltipOptions: null,
    uncheckIcon: null,
    value: '',
    children: undefined
  },
  css: {
    classes: classes
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var TriStateCheckbox = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = TriStateCheckboxBase.getProps(inProps, context);
  var _useState = React.useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    checkBoxValue = _useState2[0],
    setCheckBoxValue = _useState2[1];
  var elementRef = React__namespace.useRef(null);
  var _TriStateCheckboxBase = TriStateCheckboxBase.setMetaData({
      props: props
    }),
    ptm = _TriStateCheckboxBase.ptm,
    cx = _TriStateCheckboxBase.cx,
    isUnstyled = _TriStateCheckboxBase.isUnstyled;
  componentbase.useHandleStyle(TriStateCheckboxBase.css.styles, isUnstyled, {
    name: 'tristatecheckbox'
  });
  React.useEffect(function () {
    if ([true, false, ''].includes(props.value)) {
      setCheckBoxValue(props.value);
    } else {
      setCheckBoxValue('');
    }
  }, [props.value]);
  var onChange = function onChange(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    var newValue;
    if (checkBoxValue === '') {
      newValue = true;
    } else if (checkBoxValue === true) {
      newValue = false;
    } else if (checkBoxValue === false) {
      newValue = '';
    }
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: newValue,
        stopPropagation: function stopPropagation() {
          event === null || event === void 0 || event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event === null || event === void 0 || event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: newValue
        }
      });
    }
  };
  var onFocus = function onFocus(event) {
    var _props$onFocus;
    props === null || props === void 0 || (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, event);
  };
  var onBlur = function onBlur(event) {
    var _props$onBlur;
    props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, event);
  };
  var onKeyDown = function onKeyDown(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Space') {
      onChange(e);
      e.preventDefault();
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return utils.DomHandler.focusFirstElement(elementRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focusFirstElement(elementRef.current);
    }
  });
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = TriStateCheckboxBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var checkIconProps = mergeProps({
    className: cx('checkIcon')
  }, ptm('checkIcon'));
  var uncheckIconProps = mergeProps({
    className: cx('checkIcon')
  }, ptm('uncheckIcon'));
  var icon;
  if (checkBoxValue === false) {
    icon = props.uncheckIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, uncheckIconProps);
  } else if (checkBoxValue === true) {
    icon = props.checkIcon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, checkIconProps);
  }
  var checkIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, checkIconProps), {
    props: props
  });
  var ariaValueLabel = checkBoxValue ? api.ariaLabel('trueLabel') : checkBoxValue === false ? api.ariaLabel('falseLabel') : api.ariaLabel('nullLabel');
  var ariaChecked = checkBoxValue ? 'true' : 'false';
  var boxProps = mergeProps(_objectSpread({
    className: cx('box'),
    tabIndex: props.disabled ? '-1' : props.tabIndex,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: 'checkbox',
    'aria-checked': ariaChecked
  }, ariaProps), ptm('box'));
  var srOnlyAriaProps = mergeProps({
    className: 'p-hidden-accessible',
    'aria-live': 'polite'
  }, ptm('srOnlyAria'));
  var rootProps = mergeProps({
    className: utils.classNames(props.className, cx('root', {
      context: context
    })),
    style: props.style,
    'data-p-disabled': props.disabled
  }, TriStateCheckboxBase.getOtherProps(props), ptm('root'));
  var inputProps = mergeProps({
    id: props.inputId,
    className: cx('input'),
    type: 'checkbox',
    'aria-invalid': props.invalid,
    disabled: props.disabled,
    readOnly: props.readOnly,
    value: checkBoxValue,
    checked: checkBoxValue,
    onChange: onChange
  }, ptm('input'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef
  }, rootProps), /*#__PURE__*/React__namespace.createElement("input", inputProps), /*#__PURE__*/React__namespace.createElement("span", srOnlyAriaProps, ariaValueLabel), /*#__PURE__*/React__namespace.createElement("div", boxProps, checkIcon)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip,
    pt: ptm('tooltip')
  }, props.tooltipOptions)));
}));
TriStateCheckbox.displayName = 'TriStateCheckbox';

exports.TriStateCheckbox = TriStateCheckbox;
