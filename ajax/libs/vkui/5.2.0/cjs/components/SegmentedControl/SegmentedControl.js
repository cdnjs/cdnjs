"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControl = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _useId = require("../../hooks/useId");
var _warnOnce = require("../../lib/warnOnce");
var _SegmentedControlOption = require("./SegmentedControlOption/SegmentedControlOption");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _excluded = ["size", "name", "options", "getRootRef", "defaultValue", "children", "className", "onChange", "value"],
  _excluded2 = ["label", "className"];
var warn = (0, _warnOnce.warnOnce)('SegmentedControl');

/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */
var SegmentedControl = function SegmentedControl(_ref) {
  var _options$;
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'l' : _ref$size,
    name = _ref.name,
    options = _ref.options,
    getRootRef = _ref.getRootRef,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? (_options$ = options[0]) === null || _options$ === void 0 ? void 0 : _options$.value : _ref$defaultValue,
    children = _ref.children,
    className = _ref.className,
    onChangeProp = _ref.onChange,
    valueProp = _ref.value,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var id = (0, _useId.useId)();
  var _useCustomEnsuredCont = (0, _useEnsuredControl.useCustomEnsuredControl)({
      onChange: onChangeProp,
      value: valueProp,
      defaultValue: defaultValue
    }),
    _useCustomEnsuredCont2 = (0, _slicedToArray2.default)(_useCustomEnsuredCont, 2),
    value = _useCustomEnsuredCont2[0],
    _onChange = _useCustomEnsuredCont2[1];
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useState = React.useState(0),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    activeOptionIdx = _React$useState2[0],
    updateActiveOptionIdx = _React$useState2[1];
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _activeOptionIdx = options.findIndex(function (option) {
      return option.value === value;
    });
    if (_activeOptionIdx === -1 && process.env.NODE_ENV === 'development') {
      warn('defaultValue: такого значения нет среди опций!', 'error');
    }
    updateActiveOptionIdx(_activeOptionIdx);
  }, [value, options]);
  var translateX = "translateX(".concat(100 * activeOptionIdx, "%)");
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiSegmentedControl", (0, _getSizeYClassName.getSizeYClassName)("vkuiSegmentedControl", sizeY), styles["SegmentedControl--size-".concat(size)], className),
    ref: getRootRef
  }), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    className: "vkuiSegmentedControl__in"
  }, activeOptionIdx > -1 && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "vkuiSegmentedControl__slider",
    style: {
      width: "".concat(100 / options.length, "%"),
      transform: translateX,
      WebkitTransform: translateX
    }
  }), options.map(function (_ref2) {
    var label = _ref2.label,
      optionClassName = _ref2.className,
      optionProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
    return /*#__PURE__*/React.createElement(_SegmentedControlOption.SegmentedControlOption, (0, _extends2.default)({
      key: "".concat(optionProps.value)
    }, optionProps, {
      className: (0, _vkjs.classNames)("vkuiSegmentedControl__option", optionClassName),
      name: name !== null && name !== void 0 ? name : id,
      checked: value === optionProps.value,
      onChange: function onChange() {
        return _onChange(optionProps.value);
      }
    }), label);
  })));
};
exports.SegmentedControl = SegmentedControl;
var styles = {
  "SegmentedControl--size-l": "vkuiSegmentedControl--size-l",
  "SegmentedControl--size-m": "vkuiSegmentedControl--size-m"
};
//# sourceMappingURL=SegmentedControl.js.map