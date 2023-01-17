"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderBack = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");
var _platform = require("../../lib/platform");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _usePlatform = require("../../hooks/usePlatform");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["label", "aria-label", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderBack
 */
var PanelHeaderBack = function PanelHeaderBack(_ref) {
  var label = _ref.label,
    _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Назад' : _ref$ariaLabel,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX;
  // так-же label нужно скрывать при platform === Platform.IOS && sizeX === regular
  // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104
  var showLabel = platform === _platform.Platform.VKCOM || platform === _platform.Platform.IOS;
  var icon = /*#__PURE__*/React.createElement(_icons.Icon28ArrowLeftOutline, null);
  switch (platform) {
    case _platform.Platform.IOS:
      icon = /*#__PURE__*/React.createElement(_icons.Icon28ChevronBack, null);
      break;
    case _platform.Platform.VKCOM:
      icon = /*#__PURE__*/React.createElement(_icons.Icon28ChevronLeftOutline, null);
      break;
  }
  return /*#__PURE__*/React.createElement(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiPanelHeaderBack", (0, _getSizeXClassName.getSizeXClassName)("vkuiPanelHeaderBack", sizeX), platform === _platform.Platform.IOS && "vkuiPanelHeaderBack--ios", platform === _platform.Platform.VKCOM && "vkuiPanelHeaderBack--vkcom", showLabel && !!label && "vkuiPanelHeaderBack--has-label", className),
    label: showLabel && label,
    "aria-label": ariaLabel
  }), icon);
};
exports.PanelHeaderBack = PanelHeaderBack;
//# sourceMappingURL=PanelHeaderBack.js.map