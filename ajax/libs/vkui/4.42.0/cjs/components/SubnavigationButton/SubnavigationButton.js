"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubnavigationButton = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _utils = require("../../lib/utils");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _Tappable = require("../Tappable/Tappable");
var _icons = require("@vkontakte/icons");
var _Caption = require("../Typography/Caption/Caption");
var _Subhead = require("../Typography/Subhead/Subhead");
var _excluded = ["textLevel"],
  _excluded2 = ["mode", "size", "selected", "textLevel", "before", "after", "expandable", "children"];
var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (textLevel === 1) {
    return (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, restProps);
  }
  return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
    level: textLevel === 2 ? "2" : "3"
  }, restProps));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */
var SubnavigationButton = function SubnavigationButton(_ref2) {
  var _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? "primary" : _ref2$mode,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? "m" : _ref2$size,
    selected = _ref2.selected,
    _ref2$textLevel = _ref2.textLevel,
    textLevel = _ref2$textLevel === void 0 ? 1 : _ref2$textLevel,
    before = _ref2.before,
    after = _ref2.after,
    expandable = _ref2.expandable,
    children = _ref2.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside",
    vkuiClass: (0, _classNames.classNames)("SubnavigationButton", "SubnavigationButton--".concat(size), "SubnavigationButton--mode-".concat(mode), selected && "SubnavigationButton--selected", "SubnavigationButton--sizeY-".concat(sizeY)),
    "aria-label": (0, _utils.getTitleFromChildren)(children)
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SubnavigationButton__in"
  }, before && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SubnavigationButton__before"
  }, before), (0, _jsxRuntime.createScopedElement)(SubnavigationButtonTypography, {
    textLevel: textLevel,
    vkuiClass: "SubnavigationButton__label",
    Component: "span"
  }, children), after && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SubnavigationButton__after"
  }, after), expandable && (0, _jsxRuntime.createScopedElement)(_icons.Icon16Dropdown, {
    vkuiClass: "SubnavigationButton__expandableIcon",
    "aria-hidden": true
  })));
};
exports.SubnavigationButton = SubnavigationButton;
//# sourceMappingURL=SubnavigationButton.js.map