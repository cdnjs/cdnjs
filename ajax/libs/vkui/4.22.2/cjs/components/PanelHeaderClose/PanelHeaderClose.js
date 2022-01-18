"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@vkontakte/icons");

var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");

var _platform = require("../../lib/platform");

var _utils = require("../../lib/utils");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["children"];

var PanelHeaderClose = function PanelHeaderClose(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({
    "aria-label": (0, _utils.getTitleFromChildren)(children)
  }, restProps), platform === _platform.ANDROID || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon28CancelOutline, null) : children);
};

PanelHeaderClose.defaultProps = {
  children: 'Отмена'
};
var _default = PanelHeaderClose;
exports.default = _default;
//# sourceMappingURL=PanelHeaderClose.js.map