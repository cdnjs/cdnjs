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

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _select = require("../../lib/select");

var _Select = require("../Select/Select");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _getSizeYClassName = require("../../helpers/getSizeYClassName");

var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "before", "after", "selectType", "status"];

/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */
var SelectMimicry = function SelectMimicry(_ref) {
  var _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
      placeholder = _ref.placeholder,
      children = _ref.children,
      align = _ref.align,
      getRootRef = _ref.getRootRef,
      multiline = _ref.multiline,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      before = _ref.before,
      _ref$after = _ref.after,
      after = _ref$after === void 0 ? (0, _jsxRuntime.createScopedElement)(_DropdownIcon.DropdownIcon, null) : _ref$after,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? "default" : _ref$selectType,
      status = _ref.status,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX,
      sizeY = _useAdaptivity.sizeY;

  var title = children || placeholder;
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, (0, _extends2.default)({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Select", platform), (0, _getSizeXClassName.getSizeXClassName)("Select", sizeX), (0, _getSizeYClassName.getSizeYClassName)("Select", sizeY), multiline && "Select--multiline", align && "Select--align-".concat(align), before && "Select--hasBefore", after && "Select--hasAfter"),
    getRootRef: getRootRef,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    before: before,
    after: after,
    mode: (0, _select.getFormFieldModeFromSelectType)(selectType),
    status: status
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Select__container"
  }, (0, _jsxRuntime.createScopedElement)(_Select.SelectTypography, {
    selectType: selectType,
    vkuiClass: "Select__title"
  }, title)));
};

exports.SelectMimicry = SelectMimicry;
//# sourceMappingURL=SelectMimicry.js.map