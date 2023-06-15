"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownIcon = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var _excluded = ["opened", "className"];
var DropdownIcon = function DropdownIcon(_ref) {
  var _ref$opened = _ref.opened,
    opened = _ref$opened === void 0 ? false : _ref$opened,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivityConditi = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(),
    sizeY = _useAdaptivityConditi.sizeY;
  var IconCompact = opened ? _icons.Icon20ChevronUp : _icons.Icon20Dropdown;
  var IconRegular = opened ? _icons.Icon24ChevronUp : _icons.Icon24ChevronDown;
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/React.createElement(IconCompact, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiDropdownIcon", sizeY.compact.className, className)
  }, restProps)), sizeY.regular && /*#__PURE__*/React.createElement(IconRegular, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiDropdownIcon", sizeY.regular.className, className)
  }, restProps)));
};
exports.DropdownIcon = DropdownIcon;
//# sourceMappingURL=DropdownIcon.js.map