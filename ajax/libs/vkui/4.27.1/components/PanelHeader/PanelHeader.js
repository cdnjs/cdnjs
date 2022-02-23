import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["left", "children", "right", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "sizeX", "sizeY", "fixed"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import FixedLayout from "../FixedLayout/FixedLayout";
import Separator from "../Separator/Separator";
import { Platform, VKCOM } from "../../lib/platform";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import Text from "../Typography/Text/Text";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import ModalRootContext from "../ModalRoot/ModalRootContext";

var PanelHeaderIn = function PanelHeaderIn(_ref) {
  var children = _ref.children,
      left = _ref.left,
      right = _ref.right;

  var _React$useContext = React.useContext(ConfigProviderContext),
      webviewType = _React$useContext.webviewType;

  var _React$useContext2 = React.useContext(ModalRootContext),
      isInsideModal = _React$useContext2.isInsideModal;

  var platform = usePlatform();
  return createScopedElement(TooltipContainer, {
    fixed: true,
    vkuiClass: "PanelHeader__in"
  }, createScopedElement("div", {
    vkuiClass: "PanelHeader__left"
  }, left), createScopedElement("div", {
    vkuiClass: "PanelHeader__content"
  }, platform === VKCOM ? createScopedElement(Text, {
    weight: "medium"
  }, children) : createScopedElement("span", {
    vkuiClass: "PanelHeader__content-in"
  }, children)), createScopedElement("div", {
    vkuiClass: "PanelHeader__right"
  }, (webviewType === WebviewType.INTERNAL || isInsideModal) && right));
};

var PanelHeader = function PanelHeader(props) {
  var left = props.left,
      children = props.children,
      right = props.right,
      separator = props.separator,
      visor = props.visor,
      transparent = props.transparent,
      shadow = props.shadow,
      getRef = props.getRef,
      getRootRef = props.getRootRef,
      sizeX = props.sizeX,
      sizeY = props.sizeY,
      fixed = props.fixed,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();

  var _React$useContext3 = React.useContext(ConfigProviderContext),
      webviewType = _React$useContext3.webviewType;

  var _React$useContext4 = React.useContext(ModalRootContext),
      isInsideModal = _React$useContext4.isInsideModal;

  var needShadow = shadow && sizeX === SizeType.REGULAR;
  var isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("PanelHeader", platform), {
      "PanelHeader--trnsp": transparent,
      "PanelHeader--shadow": needShadow,
      "PanelHeader--vis": visor,
      "PanelHeader--sep": separator && visor,
      "PanelHeader--vkapps": webviewType === WebviewType.VKAPPS && !isInsideModal,
      "PanelHeader--no-left": !left,
      "PanelHeader--no-right": !right,
      "PanelHeader--fixed": isFixed
    }, "PanelHeader--sizeX-".concat(sizeX)),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? createScopedElement(FixedLayout, {
    vkuiClass: "PanelHeader__fixed",
    vertical: "top",
    getRootRef: getRef
  }, createScopedElement(PanelHeaderIn, props)) : createScopedElement(PanelHeaderIn, props), separator && visor && platform !== VKCOM && createScopedElement(Separator, {
    vkuiClass: "PanelHeader__separator",
    expanded: sizeX === SizeType.REGULAR
  }));
};

PanelHeader.defaultProps = {
  separator: true,
  transparent: false,
  visor: true
}; // eslint-disable-next-line import/no-default-export

export default withAdaptivity(PanelHeader, {
  sizeX: true,
  sizeY: true
});
//# sourceMappingURL=PanelHeader.js.map