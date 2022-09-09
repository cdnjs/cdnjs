"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeSelect = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _DropdownIcon = require("../DropdownIcon/DropdownIcon");

var _FormField = require("../FormField/FormField");

var _getClassName = require("../../helpers/getClassName");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _getSizeYClassName = require("../../helpers/getSizeYClassName");

var _Select = require("../Select/Select");

var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "multiline", "selectType", "status"];

/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */
var NativeSelect = function NativeSelect(_ref) {
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
      multiline = _ref.multiline,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? "default" : _ref$selectType,
      status = _ref.status,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(""),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      title = _React$useState2[0],
      setTitle = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      empty = _React$useState4[0],
      setEmpty = _React$useState4[1];

  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)(restProps, {
    defaultValue: defaultValue
  }),
      _useEnsuredControl2 = (0, _slicedToArray2.default)(_useEnsuredControl, 2),
      value = _useEnsuredControl2[0],
      onChange = _useEnsuredControl2[1];

  var selectRef = (0, _useExternRef.useExternRef)(getRef);

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX,
      sizeY = _useAdaptivity.sizeY;

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _selectRef$current;

    var selectedOption = (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.options[selectRef.current.selectedIndex];

    if (selectedOption) {
      setTitle(selectedOption.text);
      setEmpty(selectedOption.value === "" && placeholder != null);
    }
  }, [value, children]);
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, {
    Component: "label",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Select", platform), empty && "Select--empty", multiline && "Select--multiline", align && "Select--align-".concat(align), (0, _getSizeXClassName.getSizeXClassName)("Select", sizeX), (0, _getSizeYClassName.getSizeYClassName)("Select", sizeY)),
    className: className,
    style: style,
    getRootRef: getRootRef,
    disabled: disabled,
    after: (0, _jsxRuntime.createScopedElement)(_DropdownIcon.DropdownIcon, null),
    status: status
  }, (0, _jsxRuntime.createScopedElement)("select", (0, _extends2.default)({}, restProps, {
    disabled: disabled,
    vkuiClass: "Select__el",
    onChange: onChange,
    value: value,
    ref: selectRef
  }), placeholder && (0, _jsxRuntime.createScopedElement)("option", {
    value: ""
  }, placeholder), children), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Select__container"
  }, (0, _jsxRuntime.createScopedElement)(_Select.SelectTypography, {
    vkuiClass: "Select__title",
    selectType: selectType
  }, title)));
};

exports.NativeSelect = NativeSelect;
//# sourceMappingURL=NativeSelect.js.map