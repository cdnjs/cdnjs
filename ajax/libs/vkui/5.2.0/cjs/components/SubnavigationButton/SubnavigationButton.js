"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubnavigationButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _vkjs = require("@vkontakte/vkjs");
var _utils = require("../../lib/utils");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _Tappable = require("../Tappable/Tappable");
var _icons = require("@vkontakte/icons");
var _Caption = require("../Typography/Caption/Caption");
var _Subhead = require("../Typography/Subhead/Subhead");
var _excluded = ["textLevel"],
  _excluded2 = ["mode", "size", "selected", "textLevel", "before", "after", "expandable", "children", "className"];
var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (textLevel === '1') {
    return /*#__PURE__*/React.createElement(_Subhead.Subhead, restProps);
  }
  return /*#__PURE__*/React.createElement(_Caption.Caption, (0, _extends2.default)({
    level: textLevel === '2' ? '1' : '2'
  }, restProps));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */
var SubnavigationButton = function SubnavigationButton(_ref2) {
  var _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? 'primary' : _ref2$mode,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 'm' : _ref2$size,
    selected = _ref2.selected,
    _ref2$textLevel = _ref2.textLevel,
    textLevel = _ref2$textLevel === void 0 ? '1' : _ref2$textLevel,
    before = _ref2.before,
    after = _ref2.after,
    expandable = _ref2.expandable,
    children = _ref2.children,
    className = _ref2.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside",
    className: (0, _vkjs.classNames)("vkuiSubnavigationButton", styles["SubnavigationButton--size-".concat(size)], styles["SubnavigationButton--mode-".concat(mode)], selected && "vkuiSubnavigationButton--selected", (0, _getSizeYClassName.getSizeYClassName)("vkuiSubnavigationButton", sizeY), className),
    "aria-label": (0, _utils.getTitleFromChildren)(children)
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiSubnavigationButton__in"
  }, before && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSubnavigationButton__before"
  }, before), /*#__PURE__*/React.createElement(SubnavigationButtonTypography, {
    textLevel: textLevel,
    className: "vkuiSubnavigationButton__label",
    Component: "span"
  }, children), after && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSubnavigationButton__after"
  }, after), expandable && /*#__PURE__*/React.createElement(_icons.Icon16Dropdown, {
    className: "vkuiSubnavigationButton__expandableIcon"
  })));
};
exports.SubnavigationButton = SubnavigationButton;
var styles = {
  "SubnavigationButton--size-s": "vkuiSubnavigationButton--size-s",
  "SubnavigationButton--size-m": "vkuiSubnavigationButton--size-m",
  "SubnavigationButton--size-l": "vkuiSubnavigationButton--size-l",
  "SubnavigationButton--mode-primary": "vkuiSubnavigationButton--mode-primary",
  "SubnavigationButton--mode-outline": "vkuiSubnavigationButton--mode-outline",
  "SubnavigationButton--mode-tertiary": "vkuiSubnavigationButton--mode-tertiary"
};
//# sourceMappingURL=SubnavigationButton.js.map