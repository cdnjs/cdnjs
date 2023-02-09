import * as React from 'react';
import { ariaLabel } from 'primereact/api';
import { useMountEffect } from 'primereact/hooks';
import { Tooltip } from 'primereact/tooltip';
import { ObjectUtils, DomHandler, classNames } from 'primereact/utils';

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

var MultiStateCheckboxBase = {
  defaultProps: {
    __TYPE: 'MultiStateCheckbox',
    id: null,
    value: null,
    options: null,
    optionValue: null,
    optionLabel: null,
    optionIcon: null,
    iconTemplate: null,
    dataKey: null,
    style: null,
    className: null,
    disabled: false,
    readOnly: false,
    empty: true,
    tabIndex: '0',
    tooltip: null,
    tooltipOptions: null,
    onChange: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, MultiStateCheckboxBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, MultiStateCheckboxBase.defaultProps);
  }
};

var MultiStateCheckbox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = MultiStateCheckboxBase.getProps(inProps);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var equalityKey = props.optionValue ? null : props.dataKey;
  var onClick = function onClick(event) {
    if (!props.disabled && !props.readOnly) {
      toggle(event);
    }
  };
  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? ObjectUtils.resolveFieldData(option, props.optionValue) : option;
  };
  var getOptionIcon = function getOptionIcon(option) {
    return ObjectUtils.resolveFieldData(option, props.optionIcon || 'icon');
  };
  var getOptionAriaLabel = function getOptionAriaLabel(option) {
    var ariaField = props.optionLabel || props.optionValue;
    return ariaField ? ObjectUtils.resolveFieldData(option, ariaField) : option;
  };
  var findNextOption = function findNextOption() {
    if (props.options) {
      return selectedOptionIndex === props.options.length - 1 ? props.empty ? null : props.options[0] : props.options[selectedOptionIndex + 1];
    }
    return null;
  };
  var toggle = function toggle(event) {
    if (props.onChange) {
      var newValue = getOptionValue(findNextOption());
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
  var getSelectedOptionMap = function getSelectedOptionMap() {
    var option, index;
    if (props.options) {
      index = props.options.findIndex(function (option) {
        return ObjectUtils.equals(props.value, getOptionValue(option), equalityKey);
      });
      option = props.options[index];
    }
    return {
      option: option,
      index: index
    };
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focusFirstElement(elementRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (!props.empty && props.value === null) {
      toggle();
    }
  });
  var createIcon = function createIcon() {
    var icon = selectedOption && getOptionIcon(selectedOption) || '';
    var className = classNames('p-checkbox-icon p-c', _defineProperty({}, "".concat(icon), true));
    var content = /*#__PURE__*/React.createElement("span", {
      className: className
    });
    if (props.iconTemplate) {
      var defaultOptions = {
        option: selectedOption,
        className: className,
        element: content,
        props: props
      };
      return ObjectUtils.getJSXElement(props.iconTemplate, defaultOptions);
    }
    return content;
  };
  var _getSelectedOptionMap = getSelectedOptionMap(),
    selectedOption = _getSelectedOptionMap.option,
    selectedOptionIndex = _getSelectedOptionMap.index;
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = MultiStateCheckboxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var className = classNames('p-multistatecheckbox p-checkbox p-component', props.className, {
    'p-checkbox-disabled': props.disabled
  });
  var boxClassName = classNames('p-checkbox-box', {
    'p-highlight': !!selectedOption,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  }, selectedOption && selectedOption.className);
  var icon = createIcon();
  var ariaValueLabel = !!selectedOption ? getOptionAriaLabel(selectedOption) : ariaLabel('nullLabel');
  var ariaChecked = !!selectedOption ? 'true' : 'false';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", _extends({
    className: boxClassName,
    style: selectedOption && selectedOption.style,
    tabIndex: props.tabIndex,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: "checkbox",
    "aria-checked": ariaChecked
  }, ariaProps), icon), focusedState && /*#__PURE__*/React.createElement("span", {
    className: "p-sr-only",
    "aria-live": "polite"
  }, ariaValueLabel)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
MultiStateCheckbox.displayName = 'MultiStateCheckbox';

export { MultiStateCheckbox };
