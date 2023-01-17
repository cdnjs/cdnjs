"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeSelect = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _FormField = require("../FormField/FormField");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _Select = require("../Select/Select");
var _excluded = ["style", "defaultValue", "align", "placeholder", "children", "className", "getRef", "getRootRef", "disabled", "multiline", "selectType", "status", "onChange", "value"];
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */
var NativeSelect = function NativeSelect(_ref) {
  var style = _ref.style,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? '' : _ref$defaultValue,
    align = _ref.align,
    placeholder = _ref.placeholder,
    children = _ref.children,
    className = _ref.className,
    getRef = _ref.getRef,
    getRootRef = _ref.getRootRef,
    disabled = _ref.disabled,
    multiline = _ref.multiline,
    _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    status = _ref.status,
    onChangeProp = _ref.onChange,
    valueProp = _ref.value,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _React$useState = React.useState(''),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    title = _React$useState2[0],
    setTitle = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    empty = _React$useState4[0],
    setEmpty = _React$useState4[1];
  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)({
      defaultValue: defaultValue,
      disabled: disabled,
      onChange: onChangeProp,
      value: valueProp
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
      setEmpty(selectedOption.value === '' && placeholder != null);
    }
  }, [value, children]);
  return /*#__PURE__*/React.createElement(_FormField.FormField, {
    Component: "label",
    className: (0, _vkjs.classNames)("vkuiSelect", (0, _getPlatformClassName.getPlatformClassName)("vkuiSelect", platform), empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align && styles["Select--align-".concat(align)], (0, _getSizeXClassName.getSizeXClassName)("vkuiSelect", sizeX), (0, _getSizeYClassName.getSizeYClassName)("vkuiSelect", sizeY), className),
    style: style,
    getRootRef: getRootRef,
    disabled: disabled,
    after: /*#__PURE__*/React.createElement(_DropdownIcon.DropdownIcon, null),
    status: status
  }, /*#__PURE__*/React.createElement("select", (0, _extends2.default)({}, restProps, {
    disabled: disabled,
    className: "vkuiSelect__el",
    onChange: onChange,
    value: value,
    ref: selectRef
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), children), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSelect__container"
  }, /*#__PURE__*/React.createElement(_Select.SelectTypography, {
    className: "vkuiSelect__title",
    selectType: selectType
  }, title)));
};
exports.NativeSelect = NativeSelect;
var styles = {
  "Select--align-right": "vkuiSelect--align-right",
  "Select--align-center": "vkuiSelect--align-center",
  "Select--align-left": "vkuiSelect--align-left"
};
//# sourceMappingURL=NativeSelect.js.map