'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
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
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
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

var TriStateCheckbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var onClick = function onClick(event) {
    if (!props.disabled && !props.readOnly) {
      toggle(event);
    }
  };
  var toggle = function toggle(event) {
    var newValue;
    if (props.value === null || props.value === undefined) newValue = true;else if (props.value === true) newValue = false;else if (props.value === false) newValue = null;
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: newValue,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: props.name,
          id: props.id,
          value: newValue
        }
      });
    }
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown(e) {
    if (e.keyCode === 32) {
      toggle(e);
      e.preventDefault();
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, TriStateCheckbox.defaultProps);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var className = utils.classNames('p-tristatecheckbox p-checkbox p-component', props.className, {
    'p-checkbox-disabled': props.disabled
  });
  var boxClassName = utils.classNames('p-checkbox-box', {
    'p-highlight': (props.value || !props.value) && props.value !== null,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  var iconClassName = utils.classNames('p-checkbox-icon p-c', {
    'pi pi-check': props.value === true,
    'pi pi-times': props.value === false
  });
  var ariaValueLabel = props.value ? api.ariaLabel('trueLabel') : props.value === false ? api.ariaLabel('falseLabel') : api.ariaLabel('nullLabel');
  var ariaChecked = props.value ? 'true' : 'false';
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), /*#__PURE__*/React__namespace.createElement("div", _extends({
    className: boxClassName,
    tabIndex: props.tabIndex,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: "checkbox",
    "aria-checked": ariaChecked
  }, ariaProps), /*#__PURE__*/React__namespace.createElement("span", {
    className: iconClassName
  })), focusedState && /*#__PURE__*/React__namespace.createElement("span", {
    className: "p-sr-only",
    "aria-live": "polite"
  }, ariaValueLabel)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
TriStateCheckbox.displayName = 'TriStateCheckbox';
TriStateCheckbox.defaultProps = {
  __TYPE: 'TriStateCheckbox',
  id: null,
  value: null,
  style: null,
  className: null,
  disabled: false,
  readOnly: false,
  tabIndex: '0',
  tooltip: null,
  tooltipOptions: null,
  onChange: null
};

exports.TriStateCheckbox = TriStateCheckbox;
