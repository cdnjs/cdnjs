"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _vkjs = require("@vkontakte/vkjs");
var _FixedLayout = require("../FixedLayout/FixedLayout");
var _Separator = require("../Separator/Separator");
var _platform = require("../../lib/platform");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _Text = require("../Typography/Text/Text");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var _Spacing = require("../Spacing/Spacing");
var _excluded = ["before", "children", "after", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "fixed", "className"];
var PanelHeaderIn = function PanelHeaderIn(_ref) {
  var before = _ref.before,
    after = _ref.after,
    separator = _ref.separator,
    children = _ref.children;
  var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
    webviewType = _useConfigProvider.webviewType;
  var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
    isInsideModal = _React$useContext.isInsideModal;
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_TooltipContainer.TooltipContainer, {
    fixed: true,
    className: "vkuiPanelHeader__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeader__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeader__content"
  }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/React.createElement(_Text.Text, {
    weight: "2"
  }, children) : /*#__PURE__*/React.createElement("span", {
    className: "vkuiPanelHeader__content-in"
  }, children)), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeader__after"
  }, (webviewType === _ConfigProviderContext.WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === _platform.Platform.VKCOM && /*#__PURE__*/React.createElement(_Separator.Separator, {
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
    className = _ref2.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useConfigProvider2 = (0, _ConfigProviderContext.useConfigProvider)(),
    webviewType = _useConfigProvider2.webviewType;
  var _React$useContext2 = React.useContext(_ModalRootContext.ModalRootContext),
    isInsideModal = _React$useContext2.isInsideModal;
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX;
  var _useAdaptivityConditi = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(),
    adaptiveSizeX = _useAdaptivityConditi.sizeX;
  var isFixed = fixed !== undefined ? fixed : platform !== _platform.Platform.VKCOM;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiPanelHeader", (0, _getPlatformClassName.getPlatformClassName)("vkuiPanelHeader", platform), transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", visor && "vkuiPanelHeader--vis", separator && visor && "vkuiPanelHeader--sep", webviewType === _ConfigProviderContext.WebviewType.VKAPPS && !isInsideModal && "vkuiPanelHeader--vkapps", !before && "vkuiPanelHeader--no-before", !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", (0, _getSizeXClassName.getSizeXClassName)("vkuiPanelHeader", sizeX), className),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? /*#__PURE__*/React.createElement(_FixedLayout.FixedLayout, {
    className: "vkuiPanelHeader__fixed",
    vertical: "top",
    getRootRef: getRef
  }, /*#__PURE__*/React.createElement(PanelHeaderIn, {
    before: before,
    after: after,
    separator: separator
  }, children)) : /*#__PURE__*/React.createElement(PanelHeaderIn, {
    before: before,
    after: after,
    separator: separator
  }, children), separator && visor && platform !== _platform.Platform.VKCOM && /*#__PURE__*/React.createElement(React.Fragment, null, adaptiveSizeX.compact && /*#__PURE__*/React.createElement(_Separator.Separator, {
    className: adaptiveSizeX.compact.className
  }), adaptiveSizeX.regular && /*#__PURE__*/React.createElement(_Spacing.Spacing, {
    className: adaptiveSizeX.regular.className,
    size: 16
  })));
};
exports.PanelHeader = PanelHeader;
//# sourceMappingURL=PanelHeader.js.map