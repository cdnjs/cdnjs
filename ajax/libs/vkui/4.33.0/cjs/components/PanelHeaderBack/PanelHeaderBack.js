"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderBackComponent = exports.PanelHeaderBack = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _PanelHeaderButton = require("../PanelHeaderButton/PanelHeaderButton");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _excluded = ["label", "sizeX", "aria-label"];

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderBack
 */
var PanelHeaderBackComponent = function PanelHeaderBackComponent(_ref) {
  var label = _ref.label,
      sizeX = _ref.sizeX,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Назад" : _ref$ariaLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var showLabel = platform === _platform.VKCOM || platform === _platform.IOS && sizeX === _withAdaptivity.SizeType.REGULAR;
  return (0, _jsxRuntime.createScopedElement)(_PanelHeaderButton.PanelHeaderButton, (0, _extends2.default)({}, restProps, {
    "aria-label": ariaLabel // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("PanelHeaderBack", platform), {
      "PanelHeaderBack--has-label": showLabel && !!label
    }),
    label: showLabel && label
  }), platform === _platform.ANDROID && (0, _jsxRuntime.createScopedElement)(_icons.Icon28ArrowLeftOutline, null), platform === _platform.VKCOM && (0, _jsxRuntime.createScopedElement)(_icons.Icon28ChevronLeftOutline, null), platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(_icons.Icon28ChevronBack, null));
};

exports.PanelHeaderBackComponent = PanelHeaderBackComponent;
var PanelHeaderBack = /*#__PURE__*/React.memo((0, _withAdaptivity.withAdaptivity)(PanelHeaderBackComponent, {
  sizeX: true
}));
exports.PanelHeaderBack = PanelHeaderBack;
PanelHeaderBack.displayName = "PanelHeaderBack";
//# sourceMappingURL=PanelHeaderBack.js.map