"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControl = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _utils = require("../../lib/utils");

var _warnOnce = require("../../lib/warnOnce");

var _SegmentedControlOption = require("./SegmentedControlOption/SegmentedControlOption");

var _excluded = ["size", "name", "options", "getRootRef", "onChange", "value", "defaultValue", "children"],
    _excluded2 = ["label"];
var warn = (0, _warnOnce.warnOnce)("SegmentedControl");

var SegmentedControl = function SegmentedControl(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? "l" : _ref$size,
      name = _ref.name,
      options = _ref.options,
      getRootRef = _ref.getRootRef,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _utils.noop : _ref$onChange,
      value = _ref.value,
      defaultValue = _ref.defaultValue,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var initialValue = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value;

  if (!initialValue) {
    var _options$;

    initialValue = (_options$ = options[0]) === null || _options$ === void 0 ? void 0 : _options$.value;
  }

  var _React$useState = React.useState(0),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      activeOptionIdx = _React$useState2[0],
      updateActiveOptionIdx = _React$useState2[1];

  var _React$useState3 = React.useState(initialValue),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      activeValue = _React$useState4[0],
      updateActiveValue = _React$useState4[1];

  var nameRef = React.useRef(name !== null && name !== void 0 ? name : (0, _utils.generateRandomId)());
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _activeOptionIdx = options.findIndex(function (option) {
      return option.value === activeValue;
    });

    if (_activeOptionIdx === -1 && process.env.NODE_ENV === "development") {
      warn("defaultValue: такого значения нет среди опций!");
    }

    updateActiveOptionIdx(_activeOptionIdx);
  }, [activeValue, options]);
  var translateX = "translateX(".concat(100 * activeOptionIdx, "%)");

  var handleOnChange = function handleOnChange(value) {
    updateActiveValue(value);
    onChange(value);
  };

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("SegmentedControl", "SegmentedControl--".concat(size)),
    ref: getRootRef
  }), (0, _jsxRuntime.createScopedElement)("div", {
    role: "radiogroup",
    vkuiClass: "SegmentedControl__in"
  }, activeOptionIdx > -1 && (0, _jsxRuntime.createScopedElement)("div", {
    "aria-hidden": "true",
    vkuiClass: "SegmentedControl__slider",
    style: {
      width: "".concat(100 / options.length, "%"),
      transform: translateX,
      WebkitTransform: translateX
    }
  }), options.map(function (_ref2) {
    var label = _ref2.label,
        optionProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
    return (0, _jsxRuntime.createScopedElement)(_SegmentedControlOption.SegmentedControlOption, (0, _extends2.default)({
      key: "".concat(optionProps.value)
    }, optionProps, {
      vkuiClass: "SegmentedControl__option",
      name: nameRef.current,
      checked: activeValue === optionProps.value,
      onChange: function onChange() {
        return handleOnChange(optionProps.value);
      }
    }), label);
  })));
};

exports.SegmentedControl = SegmentedControl;
//# sourceMappingURL=SegmentedControl.js.map