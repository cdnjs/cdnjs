"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderSubmit = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var _icons = require("@vkontakte/icons");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("../../lib/utils");
var _excluded = ["children"];
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderSubmit
 */
var PanelHeaderSubmit = function PanelHeaderSubmit(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? 'Готово' : _ref$children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({
    "aria-label": (0, _utils.getTitleFromChildren)(children),
    primary: true
  }, restProps), platform === _platform.Platform.IOS ? children : /*#__PURE__*/React.createElement(_icons.Icon28DoneOutline, null));
};
exports.PanelHeaderSubmit = PanelHeaderSubmit;
//# sourceMappingURL=PanelHeaderSubmit.js.map