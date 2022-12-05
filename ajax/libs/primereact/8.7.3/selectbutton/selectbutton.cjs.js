'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');
var ripple = require('primereact/ripple');

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var SelectButtonItem = /*#__PURE__*/React__namespace.memo(function (props) {
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        option: props.option
      });
    }
  };
  var onFocus = function onFocus() {
    setFocusedState(true);
  };
  var onBlur = function onBlur() {
    setFocusedState(false);
  };
  var onKeyDown = function onKeyDown(event) {
    var keyCode = event.which;
    if (keyCode === 32) {
      onClick(event);
      event.preventDefault();
    }
  };
  var createContent = function createContent() {
    return props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-button-label p-c"
    }, props.label);
  };
  var className = utils.classNames('p-button p-component', {
    'p-highlight': props.selected,
    'p-disabled': props.disabled,
    'p-focus': focusedState
  }, props.className);
  var content = createContent();
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: className,
    role: "button",
    "aria-label": props.label,
    "aria-pressed": props.selected,
    onClick: onClick,
    onKeyDown: onKeyDown,
    tabIndex: props.tabIndex,
    onFocus: onFocus,
    onBlur: onBlur
  }, content, !props.disabled && /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
});
SelectButtonItem.displayName = 'SelectButtonItem';

var SelectButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var onOptionClick = function onOptionClick(event) {
    if (props.disabled || isOptionDisabled(event.option)) {
      return;
    }
    var selected = isSelected(event.option);
    if (selected && !props.unselectable) {
      return;
    }
    var optionValue = getOptionValue(event.option);
    var newValue;
    if (props.multiple) {
      var currentValue = props.value ? _toConsumableArray(props.value) : [];
      newValue = selected ? currentValue.filter(function (val) {
        return !utils.ObjectUtils.equals(val, optionValue, props.dataKey);
      }) : [].concat(_toConsumableArray(currentValue), [optionValue]);
    } else {
      newValue = selected ? null : optionValue;
    }
    if (props.onChange) {
      props.onChange({
        originalEvent: event.originalEvent,
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
  var getOptionLabel = function getOptionLabel(option) {
    return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
  };
  var getOptionValue = function getOptionValue(option) {
    return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    if (props.optionDisabled) {
      return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
    }
    return option && option['disabled'] !== undefined ? option['disabled'] : false;
  };
  var isSelected = function isSelected(option) {
    var optionValue = getOptionValue(option);
    if (props.multiple) {
      if (props.value && props.value.length) {
        return props.value.some(function (val) {
          return utils.ObjectUtils.equals(val, optionValue, props.dataKey);
        });
      }
    } else {
      return utils.ObjectUtils.equals(props.value, optionValue, props.dataKey);
    }
    return false;
  };
  var createItems = function createItems() {
    if (props.options && props.options.length) {
      return props.options.map(function (option, index) {
        var isDisabled = props.disabled || isOptionDisabled(option);
        var optionLabel = getOptionLabel(option);
        var tabIndex = isDisabled ? null : 0;
        var selected = isSelected(option);
        var key = optionLabel + '_' + index;
        return /*#__PURE__*/React__namespace.createElement(SelectButtonItem, {
          key: key,
          label: optionLabel,
          className: option.className,
          option: option,
          onClick: onOptionClick,
          template: props.itemTemplate,
          selected: selected,
          tabIndex: tabIndex,
          disabled: isDisabled
        });
      });
    }
    return null;
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
  var otherProps = utils.ObjectUtils.findDiffKeys(props, SelectButton.defaultProps);
  var className = utils.classNames('p-selectbutton p-buttonset p-component', props.className);
  var items = createItems();
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps, {
    role: "group"
  }), items), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
SelectButton.displayName = 'SelectButton';
SelectButton.defaultProps = {
  __TYPE: 'SelectButton',
  id: null,
  value: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionDisabled: null,
  tabIndex: null,
  multiple: false,
  unselectable: true,
  disabled: false,
  style: null,
  className: null,
  dataKey: null,
  tooltip: null,
  tooltipOptions: null,
  itemTemplate: null,
  onChange: null
};

exports.SelectButton = SelectButton;
