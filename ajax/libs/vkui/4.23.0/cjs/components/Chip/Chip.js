"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _utils = require("../../lib/utils");

var _classNames = require("../../lib/classNames");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _excluded = ["value", "option", "removable", "onRemove", "removeAriaLabel", "before", "after", "children"];

var Chip = function Chip(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      option = _ref.option,
      _ref$removable = _ref.removable,
      removable = _ref$removable === void 0 ? true : _ref$removable,
      _ref$onRemove = _ref.onRemove,
      onRemove = _ref$onRemove === void 0 ? _utils.noop : _ref$onRemove,
      _ref$removeAriaLabel = _ref.removeAriaLabel,
      removeAriaLabel = _ref$removeAriaLabel === void 0 ? 'Удалить' : _ref$removeAriaLabel,
      _ref$before = _ref.before,
      before = _ref$before === void 0 ? null : _ref$before,
      after = _ref.after,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var onRemoveWrapper = React.useCallback(function (event) {
    onRemove(event, value);
  }, [onRemove, value]);
  var title = (0, _utils.getTitleFromChildren)(children);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)('Chip', {
      'Chip--removable': removable
    }),
    role: "option",
    "aria-label": title
  }, restProps), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Chip__in",
    role: "presentation"
  }, (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Chip__before"
  }, before), (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular",
    vkuiClass: "Chip__content",
    title: title,
    "aria-hidden": "true"
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Chip__after"
  }, after), removable && (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "button",
    vkuiClass: "Chip__remove",
    onClick: onRemoveWrapper,
    hasHover: false,
    hasActive: false,
    "aria-label": "".concat(removeAriaLabel, " ").concat(title)
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon16Cancel, {
    "aria-hidden": true
  }))));
};

var _default = Chip;
exports.default = _default;
//# sourceMappingURL=Chip.js.map