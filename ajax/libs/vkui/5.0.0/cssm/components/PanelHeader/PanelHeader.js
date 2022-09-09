import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "children", "after", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "fixed"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform";
import { getPlatformClassName } from "../../helpers/getPlatformClassName";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { classNames } from "../../lib/classNames";
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
import "./PanelHeader.css";

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
  return createScopedElement(React.Fragment, null, createScopedElement(TooltipContainer, {
    fixed: true,
    vkuiClass: "PanelHeader__in"
  }, createScopedElement("div", {
    vkuiClass: "PanelHeader__before"
  }, before), createScopedElement("div", {
    vkuiClass: "PanelHeader__content"
  }, platform === Platform.VKCOM ? createScopedElement(Text, {
    weight: "2"
  }, children) : createScopedElement("span", {
    vkuiClass: "PanelHeader__content-in"
  }, children)), createScopedElement("div", {
    vkuiClass: "PanelHeader__after"
  }, (webviewType === WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === Platform.VKCOM && createScopedElement(Separator, {
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
      restProps = _objectWithoutProperties(_ref2, _excluded);

  var platform = usePlatform();

  var _React$useContext3 = React.useContext(ConfigProviderContext),
      webviewType = _React$useContext3.webviewType;

  var _React$useContext4 = React.useContext(ModalRootContext),
      isInsideModal = _React$useContext4.isInsideModal;

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  var isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("PanelHeader", getPlatformClassName("PanelHeader", platform), transparent && "PanelHeader--trnsp", shadow && "PanelHeader--shadow", visor && "PanelHeader--vis", separator && visor && "PanelHeader--sep", webviewType === WebviewType.VKAPPS && !isInsideModal && "PanelHeader--vkapps", !before && "PanelHeader--no-before", !after && "PanelHeader--no-after", isFixed && "PanelHeader--fixed", getSizeXClassName("PanelHeader", sizeX)),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? createScopedElement(FixedLayout, {
    vkuiClass: "PanelHeader__fixed",
    vertical: "top",
    getRootRef: getRef
  }, createScopedElement(PanelHeaderIn, {
    before: before,
    after: after,
    separator: separator
  }, children)) : createScopedElement(PanelHeaderIn, {
    before: before,
    after: after,
    separator: separator
  }, children), separator && visor && platform !== Platform.VKCOM && createScopedElement(SizeXConditionalRender, {
    compact: createScopedElement(Separator, null),
    regular: createScopedElement(Spacing, {
      size: 16
    })
  }));
};
//# sourceMappingURL=PanelHeader.js.map