"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalPageHeader = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _platform = require("../../lib/platform");
var _Separator = require("../Separator/Separator");
var _PanelHeader = require("../PanelHeader/PanelHeader");
var _vkjs = require("@vkontakte/vkjs");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _excluded = ["children", "separator", "getRef", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */
var ModalPageHeader = function ModalPageHeader(_ref) {
  var children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? true : _ref$separator,
    getRef = _ref.getRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var hasSeparator = separator && platform === _platform.Platform.VKCOM;
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiModalPageHeader", (0, _getPlatformClassName.getPlatformClassName)("vkuiModalPageHeader", platform), platform !== _platform.Platform.VKCOM && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
    ref: getRef
  }, /*#__PURE__*/React.createElement(_PanelHeader.PanelHeader, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiModalPageHeader__in", className)
  }, restProps, {
    fixed: false,
    separator: false,
    transparent: true
  }), children), hasSeparator && /*#__PURE__*/React.createElement(_Separator.Separator, {
    wide: true
  }));
};
exports.ModalPageHeader = ModalPageHeader;
//# sourceMappingURL=ModalPageHeader.js.map