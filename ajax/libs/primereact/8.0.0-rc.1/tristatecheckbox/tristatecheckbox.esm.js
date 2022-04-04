import * as React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, classNames } from 'primereact/utils';

function _extends() {
  _extends = Object.assign || function (target) {
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

var TriStateCheckbox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];

  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);

  var onClick = function onClick(event) {
    if (!props.disabled) {
      toggle(event);
      inputRef.current.focus();
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

  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = ObjectUtils.findDiffKeys(props, TriStateCheckbox.defaultProps);
  var className = classNames('p-tristatecheckbox p-checkbox p-component', props.className);
  var boxClassName = classNames('p-checkbox-box', {
    'p-highlight': (props.value || !props.value) && props.value !== null,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  });
  var iconClassName = classNames('p-checkbox-icon p-c', {
    'pi pi-check': props.value === true,
    'pi pi-times': props.value === false
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-hidden-accessible"
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "checkbox",
    "aria-labelledby": props.ariaLabelledBy,
    id: props.inputId,
    name: props.name,
    onFocus: onFocus,
    onBlur: onBlur,
    disabled: props.disabled,
    defaultChecked: props.value
  })), /*#__PURE__*/React.createElement("div", {
    className: boxClassName,
    role: "checkbox",
    "aria-checked": props.value === true
  }, /*#__PURE__*/React.createElement("span", {
    className: iconClassName
  }))), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
TriStateCheckbox.displayName = 'TriStateCheckbox';
TriStateCheckbox.defaultProps = {
  __TYPE: 'TriStateCheckbox',
  id: null,
  inputRef: null,
  inputId: null,
  value: null,
  name: null,
  style: null,
  className: null,
  disabled: false,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onChange: null
};

export { TriStateCheckbox };
