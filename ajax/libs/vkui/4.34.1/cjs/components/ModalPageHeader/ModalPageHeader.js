"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalPageHeader = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivity = require("../../hooks/useAdaptivity");

var _platform = require("../../lib/platform");

var _Separator = require("../Separator/Separator");

var _PanelHeader = require("../PanelHeader/PanelHeader");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _excluded = ["children", "separator", "getRef"];

/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */
var ModalPageHeader = function ModalPageHeader(_ref) {
  var children = _ref.children,
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? true : _ref$separator,
      getRef = _ref.getRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var hasSeparator = separator && platform === _platform.VKCOM;
  var isDesktop = (0, _useAdaptivity.useAdaptivityIsDesktop)();
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ModalPageHeader", platform), isDesktop && "ModalPageHeader--desktop"),
    ref: getRef
  }, (0, _jsxRuntime.createScopedElement)(_PanelHeader.PanelHeader, (0, _extends2.default)({
    vkuiClass: "ModalPageHeader__in"
  }, restProps, {
    fixed: false,
    separator: false,
    transparent: true
  }), children), hasSeparator && (0, _jsxRuntime.createScopedElement)(_Separator.Separator, {
    wide: true
  }));
};

exports.ModalPageHeader = ModalPageHeader;
//# sourceMappingURL=ModalPageHeader.js.map