"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _PanelHeader = _interopRequireDefault(require("../PanelHeader/PanelHeader"));

var _Separator = _interopRequireDefault(require("../Separator/Separator"));

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");

var _excluded = ["children", "separator", "getRef"];

var ModalPageHeader = function ModalPageHeader(_ref) {
  var children = _ref.children,
      separator = _ref.separator,
      getRef = _ref.getRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      viewWidth = _useAdaptivity.viewWidth,
      viewHeight = _useAdaptivity.viewHeight,
      hasMouse = _useAdaptivity.hasMouse;

  var hasSeparator = separator && platform === _platform.VKCOM;
  var isDesktop = viewWidth >= _AdaptivityContext.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _AdaptivityContext.ViewHeight.MEDIUM);
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ModalPageHeader", platform), {
      "ModalPageHeader--desktop": isDesktop
    }),
    ref: getRef
  }, (0, _jsxRuntime.createScopedElement)(_PanelHeader.default, (0, _extends2.default)({
    vkuiClass: "ModalPageHeader__in"
  }, restProps, {
    fixed: false,
    separator: false,
    transparent: true
  }), children), hasSeparator && (0, _jsxRuntime.createScopedElement)(_Separator.default, {
    wide: true
  }));
};

ModalPageHeader.defaultProps = {
  separator: true
}; // eslint-disable-next-line import/no-default-export

var _default = ModalPageHeader;
exports.default = _default;
//# sourceMappingURL=ModalPageHeader.js.map