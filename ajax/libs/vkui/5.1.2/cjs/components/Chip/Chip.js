"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _utils = require("../../lib/utils");
var _vkjs = require("@vkontakte/vkjs");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Tappable = require("../Tappable/Tappable");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["value", "option", "removable", "onRemove", "removeAriaLabel", "before", "after", "children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Chip
 */
var Chip = function Chip(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    option = _ref.option,
    _ref$removable = _ref.removable,
    removable = _ref$removable === void 0 ? true : _ref$removable,
    _ref$onRemove = _ref.onRemove,
    onRemove = _ref$onRemove === void 0 ? _vkjs.noop : _ref$onRemove,
    _ref$removeAriaLabel = _ref.removeAriaLabel,
    removeAriaLabel = _ref$removeAriaLabel === void 0 ? 'Удалить' : _ref$removeAriaLabel,
    _ref$before = _ref.before,
    before = _ref$before === void 0 ? null : _ref$before,
    after = _ref.after,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var onRemoveWrapper = React.useCallback(function (event) {
    onRemove(event, value);
  }, [onRemove, value]);
  var title = (0, _utils.getTitleFromChildren)(children);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiChip", (0, _getSizeYClassName.getSizeYClassName)("vkuiChip", sizeY), removable && "vkuiChip--removable", className),
    role: "option",
    "aria-label": title
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiChip__in",
    role: "presentation"
  }, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiChip__before"
  }, before), /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiChip__content",
    title: title,
    "aria-hidden": true
  }, children), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiChip__after"
  }, after), removable && /*#__PURE__*/React.createElement(_Tappable.Tappable, {
    Component: "button",
    className: "vkuiChip__remove",
    onClick: onRemoveWrapper,
    hasHover: false,
    hasActive: false,
    "aria-label": "".concat(removeAriaLabel, " ").concat(title)
  }, /*#__PURE__*/React.createElement(_icons.Icon16Cancel, null))));
};
exports.Chip = Chip;
//# sourceMappingURL=Chip.js.map