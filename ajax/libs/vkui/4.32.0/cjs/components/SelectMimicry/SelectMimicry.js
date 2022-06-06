"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectMimicry = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _DropdownIcon = require("../DropdownIcon/DropdownIcon");

var _FormField = require("../FormField/FormField");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _select = require("../../lib/select");

var _Select = require("../Select/Select");

var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "sizeX", "sizeY", "before", "after", "selectType"];

var SelectMimicryComponent = function SelectMimicryComponent(_ref) {
  var _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
      placeholder = _ref.placeholder,
      children = _ref.children,
      align = _ref.align,
      getRootRef = _ref.getRootRef,
      multiline = _ref.multiline,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      sizeX = _ref.sizeX,
      sizeY = _ref.sizeY,
      before = _ref.before,
      _ref$after = _ref.after,
      after = _ref$after === void 0 ? (0, _jsxRuntime.createScopedElement)(_DropdownIcon.DropdownIcon, null) : _ref$after,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? _Select.SelectType.default : _ref$selectType,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var title = children || placeholder;
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, (0, _extends2.default)({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Select", platform), "Select--".concat(selectType), !children && "Select--empty", multiline && "Select--multiline", align && "Select--align-".concat(align), "Select--sizeX-".concat(sizeX), "Select--sizeY-".concat(sizeY)),
    getRootRef: getRootRef,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    before: before,
    after: after,
    mode: (0, _select.getFormFieldModeFromSelectType)(selectType)
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Select__container"
  }, (0, _jsxRuntime.createScopedElement)(_Select.SelectTypography, {
    selectType: selectType,
    vkuiClass: "Select__title"
  }, title)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */


var SelectMimicry = (0, _withAdaptivity.withAdaptivity)(SelectMimicryComponent, {
  sizeX: true,
  sizeY: true
});
exports.SelectMimicry = SelectMimicry;
//# sourceMappingURL=SelectMimicry.js.map