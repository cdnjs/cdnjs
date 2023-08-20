'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var check = require('primereact/icons/check');
var tooltip = require('primereact/tooltip');
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
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

var CheckboxBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Checkbox',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    icon: null,
    id: null,
    inputId: null,
    inputRef: null,
    name: null,
    onChange: null,
    onClick: null,
    onContextMenu: null,
    onMouseDown: null,
    readOnly: false,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    value: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Checkbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = CheckboxBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _CheckboxBase$setMeta = CheckboxBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      }
    }),
    ptm = _CheckboxBase$setMeta.ptm;
  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);
  var _onClick = function onClick(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (props.onChange || props.onClick) {
      var _checked = isChecked();
      var checkboxClicked = event.target instanceof HTMLDivElement || event.target instanceof HTMLSpanElement || event.target instanceof Object;
      var isInputToggled = event.target === inputRef.current;
      var isCheckboxToggled = checkboxClicked && event.target.checked !== _checked;
      if (isInputToggled || isCheckboxToggled) {
        var value = _checked ? props.falseValue : props.trueValue;
        var eventData = {
          originalEvent: event,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
          target: {
            type: 'checkbox',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        };
        props.onClick && props.onClick(eventData);

        // do not continue if the user defined click wants to prevent
        if (event.defaultPrevented) {
          return;
        }
        props.onChange && props.onChange(eventData);
      }
      utils.DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };
  var _onFocus = function onFocus() {
    setFocusedState(true);
  };
  var _onBlur = function onBlur() {
    setFocusedState(false);
  };
  var _onKeyDown = function onKeyDown(event) {
    if (event.code === 'Space' || event.key === ' ') {
      // event.key is for Android support
      _onClick(event);
    }
  };
  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
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
  hooks.useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  hooks.useMountEffect(function () {
    if (props.autoFocus) {
      utils.DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var checked = isChecked();
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var className = utils.classNames('p-checkbox p-component', {
    'p-checkbox-checked': checked,
    'p-checkbox-disabled': props.disabled,
    'p-checkbox-focused': focusedState
  }, props.className);
  var boxClass = utils.classNames('p-checkbox-box', {
    'p-highlight': checked,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  var iconClassName = 'p-checkbox-icon p-c';
  var iconProps = utils.mergeProps({
    className: iconClassName
  }, ptm('icon'));
  var icon = checked ? props.icon || /*#__PURE__*/React__namespace.createElement(check.CheckIcon, iconProps) : null;
  var checkboxIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
    props: props,
    checked: checked
  });
  var rootProps = utils.mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style,
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }, otherProps, ptm('root'));
  var hiddenInputWrapperProps = utils.mergeProps({
    className: 'p-hidden-accessible'
  }, ptm('hiddenInputWrapper'));
  var hiddenInputProps = utils.mergeProps(_objectSpread({
    id: props.inputId,
    ref: inputRef,
    type: 'checkbox',
    name: props.name,
    tabIndex: props.tabIndex,
    defaultChecked: checked,
    onFocus: function onFocus(e) {
      return _onFocus();
    },
    onBlur: function onBlur(e) {
      return _onBlur();
    },
    onKeyDown: function onKeyDown(e) {
      return _onKeyDown(e);
    },
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: props.required
  }, ariaProps), ptm('hiddenInput'));
  var inputProps = utils.mergeProps({
    className: boxClass
  }, ptm('input'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React__namespace.createElement("input", hiddenInputProps)), /*#__PURE__*/React__namespace.createElement("div", inputProps, checkboxIcon)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
Checkbox.displayName = 'Checkbox';

exports.Checkbox = Checkbox;
