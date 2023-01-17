"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectMimicry = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _FormField = require("../FormField/FormField");
var _usePlatform = require("../../hooks/usePlatform");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _select = require("../../lib/select");
var _Select = require("../Select/Select");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "before", "after", "selectType", "status", "className"];
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
    after = _ref$after === void 0 ? /*#__PURE__*/React.createElement(_DropdownIcon.DropdownIcon, null) : _ref$after,
    _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    status = _ref.status,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX,
    sizeY = _useAdaptivity.sizeY;
  var title = children || placeholder;
  return /*#__PURE__*/React.createElement(_FormField.FormField, (0, _extends2.default)({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    className: (0, _vkjs.classNames)("vkuiSelect", (0, _getPlatformClassName.getPlatformClassName)("vkuiSelect", platform), (0, _getSizeXClassName.getSizeXClassName)("vkuiSelect", sizeX), (0, _getSizeYClassName.getSizeYClassName)("vkuiSelect", sizeY), multiline && "vkuiSelect--multiline", align && styles["Select--align-".concat(align)], before && "vkuiSelect--hasBefore", after && "vkuiSelect--hasAfter", className),
    getRootRef: getRootRef,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    before: before,
    after: after,
    mode: (0, _select.getFormFieldModeFromSelectType)(selectType),
    status: status
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSelect__container"
  }, /*#__PURE__*/React.createElement(_Select.SelectTypography, {
    selectType: selectType,
    className: "vkuiSelect__title"
  }, title)));
};
exports.SelectMimicry = SelectMimicry;
var styles = {
  "Select--align-right": "vkuiSelect--align-right",
  "Select--align-center": "vkuiSelect--align-center",
  "Select--align-left": "vkuiSelect--align-left"
};
//# sourceMappingURL=SelectMimicry.js.map