'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

var Checkbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];

  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);

  var onClick = function onClick(event) {
    if (!props.disabled && !props.readOnly && props.onChange) {
      var _checked = isChecked();

      var checkboxClicked = event.target instanceof HTMLDivElement || event.target instanceof HTMLSpanElement;
      var isInputToggled = event.target === inputRef.current;
      var isCheckboxToggled = checkboxClicked && event.target.checked !== _checked;

      if (isInputToggled || isCheckboxToggled) {
        var value = _checked ? props.falseValue : props.trueValue;
        props.onChange({
          originalEvent: event,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            type: 'checkbox',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        });
      }

      utils.DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };

  var onFocus = function onFocus() {
    setFocusedState(true);
  };

  var onBlur = function onBlur() {
    setFocusedState(false);
  };

  var onKeyDown = function onKeyDown(event) {
    if (event.code === 'Space') {
      onClick(event);
    }
  };

  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
  };

  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
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
  var checked = isChecked();
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, Checkbox.defaultProps);
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
  var icon = utils.IconUtils.getJSXIcon(checked ? props.icon : '', {
    className: 'p-checkbox-icon p-c'
  }, {
    props: props,
    checked: checked
  });
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick,
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }), /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-hidden-accessible"
  }, /*#__PURE__*/React__namespace.createElement("input", _extends({
    ref: inputRef,
    type: "checkbox",
    id: props.inputId,
    name: props.name,
    tabIndex: props.tabIndex,
    defaultChecked: checked,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: props.required
  }, ariaProps))), /*#__PURE__*/React__namespace.createElement("div", {
    className: boxClass
  }, icon)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  __TYPE: 'Checkbox',
  id: null,
  inputRef: null,
  inputId: null,
  value: null,
  name: null,
  checked: false,
  trueValue: true,
  falseValue: false,
  style: null,
  className: null,
  disabled: false,
  required: false,
  readOnly: false,
  tabIndex: null,
  icon: 'pi pi-check',
  tooltip: null,
  tooltipOptions: null,
  onChange: null,
  onMouseDown: null,
  onContextMenu: null
};

exports.Checkbox = Checkbox;
