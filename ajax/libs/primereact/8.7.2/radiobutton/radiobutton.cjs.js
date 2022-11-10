'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
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

var RadioButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];

  var elementRef = React__namespace.useRef(null);
  var inputRef = React__namespace.useRef(props.inputRef);

  var select = function select(e) {
    onClick(e);
  };

  var onClick = function onClick(e) {
    if (!props.disabled && props.onChange) {
      var checked = props.checked;
      var radioClicked = e.target instanceof HTMLDivElement;
      var inputClicked = e.target === inputRef.current;
      var isInputToggled = inputClicked && e.target.checked !== checked;
      var isRadioToggled = radioClicked && !e.target.checked;

      if (isInputToggled || isRadioToggled) {
        var value = !checked;
        props.onChange({
          originalEvent: e,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            type: 'radio',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        });
      }

      utils.DomHandler.focus(inputRef.current);
      e.preventDefault();
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

  React__namespace.useEffect(function () {
    if (inputRef.current) {
      inputRef.current.checked = props.checked;
    }
  }, [props.checked]);
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      select: select,
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = utils.ObjectUtils.findDiffKeys(props, RadioButton.defaultProps);
  var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
  var className = utils.classNames('p-radiobutton p-component', {
    'p-radiobutton-checked': props.checked,
    'p-radiobutton-disabled': props.disabled,
    'p-radiobutton-focused': focusedState
  }, props.className);
  var boxClassName = utils.classNames('p-radiobutton-box', {
    'p-highlight': props.checked,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-hidden-accessible"
  }, /*#__PURE__*/React__namespace.createElement("input", _extends({
    ref: inputRef,
    id: props.inputId,
    type: "radio",
    name: props.name,
    defaultChecked: props.checked,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    disabled: props.disabled,
    required: props.required,
    tabIndex: props.tabIndex
  }, ariaProps))), /*#__PURE__*/React__namespace.createElement("div", {
    className: boxClassName
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-radiobutton-icon"
  }))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
RadioButton.displayName = 'RadioButton';
RadioButton.defaultProps = {
  __TYPE: 'RadioButton',
  id: null,
  inputRef: null,
  inputId: null,
  name: null,
  value: null,
  checked: false,
  style: null,
  className: null,
  disabled: false,
  required: false,
  tabIndex: null,
  tooltip: null,
  tooltipOptions: null,
  onChange: null
};

exports.RadioButton = RadioButton;
