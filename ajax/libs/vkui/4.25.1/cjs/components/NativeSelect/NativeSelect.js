"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames2 = require("../../lib/classNames");

var _DropdownIcon = require("../DropdownIcon/DropdownIcon");

var _FormField = require("../FormField/FormField");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _getClassName = require("../../helpers/getClassName");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _platform = require("../../lib/platform");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "sizeX", "sizeY", "multiline"];

var NativeSelect = function NativeSelect(_ref) {
  var _classNames;

  var style = _ref.style,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? "" : _ref$defaultValue,
      align = _ref.align,
      placeholder = _ref.placeholder,
      children = _ref.children,
      className = _ref.className,
      getRef = _ref.getRef,
      getRootRef = _ref.getRootRef,
      disabled = _ref.disabled,
      sizeX = _ref.sizeX,
      sizeY = _ref.sizeY,
      multiline = _ref.multiline,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(""),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      title = _React$useState2[0],
      setTitle = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      notSelected = _React$useState4[0],
      setNotSelected = _React$useState4[1];

  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)(restProps, {
    defaultValue: defaultValue
  }),
      _useEnsuredControl2 = (0, _slicedToArray2.default)(_useEnsuredControl, 2),
      value = _useEnsuredControl2[0],
      onChange = _useEnsuredControl2[1];

  var selectRef = (0, _useExternRef.useExternRef)(getRef);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _selectRef$current;

    var selectedOption = (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.options[selectRef.current.selectedIndex];

    if (selectedOption) {
      setTitle(selectedOption.text);
      setNotSelected(selectedOption.value === "" && placeholder != null);
    }
  }, [value, children]);
  var TypographyComponent = platform === _platform.VKCOM || sizeY === _withAdaptivity.SizeType.COMPACT ? _Text.default : _Headline.default;
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, {
    Component: "label",
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)("Select", platform), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "Select--not-selected", notSelected), (0, _defineProperty2.default)(_classNames, "Select--align-".concat(align), !!align), (0, _defineProperty2.default)(_classNames, "Select--sizeX--".concat(sizeX), !!sizeX), (0, _defineProperty2.default)(_classNames, "Select--sizeY--".concat(sizeY), !!sizeY), (0, _defineProperty2.default)(_classNames, "Select--multiline", multiline), _classNames)),
    className: className,
    style: style,
    getRootRef: getRootRef,
    disabled: disabled,
    after: (0, _jsxRuntime.createScopedElement)(_DropdownIcon.DropdownIcon, null)
  }, (0, _jsxRuntime.createScopedElement)("select", (0, _extends2.default)({}, restProps, {
    disabled: disabled,
    vkuiClass: "Select__el",
    onChange: onChange,
    value: value,
    ref: selectRef
  }), placeholder && (0, _jsxRuntime.createScopedElement)("option", {
    value: ""
  }, placeholder), children), (0, _jsxRuntime.createScopedElement)(TypographyComponent, {
    Component: "div",
    weight: "regular",
    vkuiClass: "Select__container"
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Select__title"
  }, title)));
}; // eslint-disable-next-line import/no-default-export


var _default = (0, _withAdaptivity.withAdaptivity)(NativeSelect, {
  sizeX: true,
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=NativeSelect.js.map