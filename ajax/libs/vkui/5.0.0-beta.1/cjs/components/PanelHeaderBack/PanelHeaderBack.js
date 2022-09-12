"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderBack = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@vkontakte/icons");

var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");

var _platform = require("../../lib/platform");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _classNames = require("../../lib/classNames");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["label", "aria-label"];

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderBack
 */
var PanelHeaderBack = function PanelHeaderBack(_ref) {
  var label = _ref.label,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Назад" : _ref$ariaLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX; // так-же label нужно скрывать при platform === Platform.IOS && sizeX === regular
  // https://github.com/VKCOM/VKUI/blob/master/src/components/PanelHeaderButton/PanelHeaderButton.css#L104


  var showLabel = platform === _platform.Platform.VKCOM || platform === _platform.Platform.IOS;
  var icon = (0, _jsxRuntime.createScopedElement)(_icons.Icon28ArrowLeftOutline, null);

  switch (platform) {
    case _platform.Platform.IOS:
      icon = (0, _jsxRuntime.createScopedElement)(_icons.Icon28ChevronBack, null);
      break;

    case _platform.Platform.VKCOM:
      icon = (0, _jsxRuntime.createScopedElement)(_icons.Icon28ChevronLeftOutline, null);
      break;
  }

  return (0, _jsxRuntime.createScopedElement)(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("PanelHeaderBack", (0, _getSizeXClassName.getSizeXClassName)("PanelHeaderBack", sizeX), platform === _platform.Platform.IOS && "PanelHeaderBack--ios", platform === _platform.Platform.VKCOM && "PanelHeaderBack--vkcom", showLabel && !!label && "PanelHeaderBack--has-label"),
    label: showLabel && label,
    "aria-label": ariaLabel
  }), icon);
};

exports.PanelHeaderBack = PanelHeaderBack;
//# sourceMappingURL=PanelHeaderBack.js.map