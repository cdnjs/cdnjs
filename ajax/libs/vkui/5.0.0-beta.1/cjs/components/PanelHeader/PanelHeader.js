"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _usePlatform = require("../../hooks/usePlatform");

var _getPlatformClassName = require("../../helpers/getPlatformClassName");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _classNames = require("../../lib/classNames");

var _FixedLayout = require("../FixedLayout/FixedLayout");

var _Separator = require("../Separator/Separator");

var _platform = require("../../lib/platform");

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _Text = require("../Typography/Text/Text");

var _TooltipContainer = require("../Tooltip/TooltipContainer");

var _ModalRootContext = require("../ModalRoot/ModalRootContext");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _Spacing = require("../Spacing/Spacing");

var _SizeXConditionalRender = require("../SizeXConditionalRender/SizeXConditionalRender");

var _excluded = ["before", "children", "after", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "fixed"];

var PanelHeaderIn = function PanelHeaderIn(_ref) {
  var before = _ref.before,
      after = _ref.after,
      separator = _ref.separator,
      children = _ref.children;

  var _React$useContext = React.useContext(_ConfigProviderContext.ConfigProviderContext),
      webviewType = _React$useContext.webviewType;

  var _React$useContext2 = React.useContext(_ModalRootContext.ModalRootContext),
      isInsideModal = _React$useContext2.isInsideModal;

  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)(_TooltipContainer.TooltipContainer, {
    fixed: true,
    vkuiClass: "PanelHeader__in"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeader__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeader__content"
  }, platform === _platform.Platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    weight: "2"
  }, children) : (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "PanelHeader__content-in"
  }, children)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeader__after"
  }, (webviewType === _ConfigProviderContext.WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === _platform.Platform.VKCOM && (0, _jsxRuntime.createScopedElement)(_Separator.Separator, {
    wide: true
  }));
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */


var PanelHeader = function PanelHeader(_ref2) {
  var before = _ref2.before,
      children = _ref2.children,
      after = _ref2.after,
      _ref2$separator = _ref2.separator,
      separator = _ref2$separator === void 0 ? true : _ref2$separator,
      _ref2$visor = _ref2.visor,
      visor = _ref2$visor === void 0 ? true : _ref2$visor,
      _ref2$transparent = _ref2.transparent,
      transparent = _ref2$transparent === void 0 ? false : _ref2$transparent,
      shadow = _ref2.shadow,
      getRef = _ref2.getRef,
      getRootRef = _ref2.getRootRef,
      fixed = _ref2.fixed,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useContext3 = React.useContext(_ConfigProviderContext.ConfigProviderContext),
      webviewType = _React$useContext3.webviewType;

  var _React$useContext4 = React.useContext(_ModalRootContext.ModalRootContext),
      isInsideModal = _React$useContext4.isInsideModal;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  var isFixed = fixed !== undefined ? fixed : platform !== _platform.Platform.VKCOM;
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)("PanelHeader", (0, _getPlatformClassName.getPlatformClassName)("PanelHeader", platform), transparent && "PanelHeader--trnsp", shadow && "PanelHeader--shadow", visor && "PanelHeader--vis", separator && visor && "PanelHeader--sep", webviewType === _ConfigProviderContext.WebviewType.VKAPPS && !isInsideModal && "PanelHeader--vkapps", !before && "PanelHeader--no-before", !after && "PanelHeader--no-after", isFixed && "PanelHeader--fixed", (0, _getSizeXClassName.getSizeXClassName)("PanelHeader", sizeX)),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? (0, _jsxRuntime.createScopedElement)(_FixedLayout.FixedLayout, {
    vkuiClass: "PanelHeader__fixed",
    vertical: "top",
    getRootRef: getRef
  }, (0, _jsxRuntime.createScopedElement)(PanelHeaderIn, {
    before: before,
    after: after,
    separator: separator
  }, children)) : (0, _jsxRuntime.createScopedElement)(PanelHeaderIn, {
    before: before,
    after: after,
    separator: separator
  }, children), separator && visor && platform !== _platform.Platform.VKCOM && (0, _jsxRuntime.createScopedElement)(_SizeXConditionalRender.SizeXConditionalRender, {
    compact: (0, _jsxRuntime.createScopedElement)(_Separator.Separator, null),
    regular: (0, _jsxRuntime.createScopedElement)(_Spacing.Spacing, {
      size: 16
    })
  }));
};

exports.PanelHeader = PanelHeader;
//# sourceMappingURL=PanelHeader.js.map