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

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _warnOnce = require("../../lib/warnOnce");

var _FixedLayout = require("../FixedLayout/FixedLayout");

var _Separator = require("../Separator/Separator");

var _platform = require("../../lib/platform");

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Text = require("../Typography/Text/Text");

var _TooltipContainer = require("../Tooltip/TooltipContainer");

var _ModalRootContext = require("../ModalRoot/ModalRootContext");

var _Spacing = require("../Spacing/Spacing");

var _excluded = ["before", "left", "after", "right", "children", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "sizeX", "sizeY", "fixed"];

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
  }, platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    weight: "2"
  }, children) : (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "PanelHeader__content-in"
  }, children)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeader__after"
  }, (webviewType === _ConfigProviderContext.WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === _platform.VKCOM && (0, _jsxRuntime.createScopedElement)(_Separator.Separator, {
    wide: true
  }));
};

var warn = (0, _warnOnce.warnOnce)("PanelHeader");

var PanelHeaderComponent = function PanelHeaderComponent(_ref2) {
  var propsBefore = _ref2.before,
      left = _ref2.left,
      propsAfter = _ref2.after,
      right = _ref2.right,
      children = _ref2.children,
      _ref2$separator = _ref2.separator,
      separator = _ref2$separator === void 0 ? true : _ref2$separator,
      _ref2$visor = _ref2.visor,
      visor = _ref2$visor === void 0 ? true : _ref2$visor,
      _ref2$transparent = _ref2.transparent,
      transparent = _ref2$transparent === void 0 ? false : _ref2$transparent,
      shadow = _ref2.shadow,
      getRef = _ref2.getRef,
      getRootRef = _ref2.getRootRef,
      sizeX = _ref2.sizeX,
      sizeY = _ref2.sizeY,
      fixed = _ref2.fixed,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useContext3 = React.useContext(_ConfigProviderContext.ConfigProviderContext),
      webviewType = _React$useContext3.webviewType;

  var _React$useContext4 = React.useContext(_ModalRootContext.ModalRootContext),
      isInsideModal = _React$useContext4.isInsideModal;

  var needShadow = shadow && sizeX === _withAdaptivity.SizeType.REGULAR;
  var isFixed = fixed !== undefined ? fixed : platform !== _platform.Platform.VKCOM; // TODO: удалить перед 5.0.0

  var before = propsBefore !== null && propsBefore !== void 0 ? propsBefore : left;
  var after = propsAfter !== null && propsAfter !== void 0 ? propsAfter : right;

  if (process.env.NODE_ENV === "development") {
    right && warn("Свойство right устарелo и будет удалено в 5.0.0. Используйте after.");
    left && warn("Свойство left устарелo и будет удалено в 5.0.0. Используйте before.");
  } // /end TODO


  var innerProps = {
    before: before,
    after: after,
    separator: separator,
    children: children
  };
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("PanelHeader", platform), {
      "PanelHeader--trnsp": transparent,
      "PanelHeader--shadow": needShadow,
      "PanelHeader--vis": visor,
      "PanelHeader--sep": separator && visor,
      "PanelHeader--vkapps": webviewType === _ConfigProviderContext.WebviewType.VKAPPS && !isInsideModal,
      "PanelHeader--no-before": !before,
      "PanelHeader--no-after": !after,
      "PanelHeader--fixed": isFixed
    }, "PanelHeader--sizeX-".concat(sizeX)),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? (0, _jsxRuntime.createScopedElement)(_FixedLayout.FixedLayout, {
    vkuiClass: "PanelHeader__fixed",
    vertical: "top",
    getRootRef: getRef
  }, (0, _jsxRuntime.createScopedElement)(PanelHeaderIn, innerProps)) : (0, _jsxRuntime.createScopedElement)(PanelHeaderIn, innerProps), separator && visor && platform !== _platform.VKCOM && (sizeX === _withAdaptivity.SizeType.REGULAR ? (0, _jsxRuntime.createScopedElement)(_Spacing.Spacing, {
    size: 16
  }) : (0, _jsxRuntime.createScopedElement)(_Separator.Separator, null)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */


var PanelHeader = (0, _withAdaptivity.withAdaptivity)(PanelHeaderComponent, {
  sizeX: true,
  sizeY: true
});
exports.PanelHeader = PanelHeader;
//# sourceMappingURL=PanelHeader.js.map