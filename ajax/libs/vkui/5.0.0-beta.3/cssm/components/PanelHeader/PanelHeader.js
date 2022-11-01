import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "children", "after", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "fixed", "className"];
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform";
import { getPlatformClassName } from "../../helpers/getPlatformClassName";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { classNamesString } from "../../lib/classNames";
import { FixedLayout } from "../FixedLayout/FixedLayout";
import { Separator } from "../Separator/Separator";
import { Platform } from "../../lib/platform";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { Text } from "../Typography/Text/Text";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { Spacing } from "../Spacing/Spacing";
import { SizeXConditionalRender } from "../SizeXConditionalRender/SizeXConditionalRender";
import "./PanelHeader.module.css";
var PanelHeaderIn = function PanelHeaderIn(_ref) {
  var before = _ref.before,
    after = _ref.after,
    separator = _ref.separator,
    children = _ref.children;
  var _React$useContext = React.useContext(ConfigProviderContext),
    webviewType = _React$useContext.webviewType;
  var _React$useContext2 = React.useContext(ModalRootContext),
    isInsideModal = _React$useContext2.isInsideModal;
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TooltipContainer, {
    fixed: true,
    className: "vkuiPanelHeader__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeader__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeader__content"
  }, platform === Platform.VKCOM ? /*#__PURE__*/React.createElement(Text, {
    weight: "2"
  }, children) : /*#__PURE__*/React.createElement("span", {
    className: "vkuiPanelHeader__content-in"
  }, children)), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeader__after"
  }, (webviewType === WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === Platform.VKCOM && /*#__PURE__*/React.createElement(Separator, {
    wide: true
  }));
};

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */
export var PanelHeader = function PanelHeader(_ref2) {
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
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var platform = usePlatform();
  var _React$useContext3 = React.useContext(ConfigProviderContext),
    webviewType = _React$useContext3.webviewType;
  var _React$useContext4 = React.useContext(ModalRootContext),
    isInsideModal = _React$useContext4.isInsideModal;
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX;
  var isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNamesString("vkuiPanelHeader", getPlatformClassName("vkuiPanelHeader", platform), transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", visor && "vkuiPanelHeader--vis", separator && visor && "vkuiPanelHeader--sep", webviewType === WebviewType.VKAPPS && !isInsideModal && "vkuiPanelHeader--vkapps", !before && "vkuiPanelHeader--no-before", !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", getSizeXClassName("vkuiPanelHeader", sizeX), className),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? /*#__PURE__*/React.createElement(FixedLayout, {
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
  }, children), separator && visor && platform !== Platform.VKCOM && /*#__PURE__*/React.createElement(SizeXConditionalRender, {
    compact: /*#__PURE__*/React.createElement(Separator, null),
    regular: /*#__PURE__*/React.createElement(Spacing, {
      size: 16
    })
  }));
};
//# sourceMappingURL=PanelHeader.js.map