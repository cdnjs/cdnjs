import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["left", "children", "right", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "sizeX", "sizeY", "fixed"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import FixedLayout from "../FixedLayout/FixedLayout";
import Separator from "../Separator/Separator";
import { Platform, VKCOM } from "../../lib/platform";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import { isPrimitiveReactNode } from "../../lib/utils";
import Text from "../Typography/Text/Text";
import { TooltipContainer } from "../Tooltip/TooltipContainer";

var PanelHeaderInTypography = function PanelHeaderInTypography(_ref) {
  var children = _ref.children;
  var platform = usePlatform();
  return platform === VKCOM ? createScopedElement(Text, {
    weight: "medium"
  }, children) : createScopedElement("span", {
    vkuiClass: "PanelHeader__content-in"
  }, children);
};

var PanelHeaderIn = function PanelHeaderIn(_ref2) {
  var children = _ref2.children,
      left = _ref2.left,
      right = _ref2.right;

  var _React$useContext = React.useContext(ConfigProviderContext),
      webviewType = _React$useContext.webviewType;

  var isPrimitive = isPrimitiveReactNode(children);
  return createScopedElement(TooltipContainer, {
    fixed: true,
    vkuiClass: "PanelHeader__in"
  }, createScopedElement("div", {
    vkuiClass: "PanelHeader__left"
  }, left), createScopedElement("div", {
    vkuiClass: "PanelHeader__content"
  }, isPrimitive ? createScopedElement(PanelHeaderInTypography, null, children) : children), createScopedElement("div", {
    vkuiClass: "PanelHeader__right"
  }, webviewType !== WebviewType.VKAPPS && right));
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

  var _React$useContext2 = React.useContext(ConfigProviderContext),
      webviewType = _React$useContext2.webviewType;

  var needShadow = shadow && sizeX === SizeType.REGULAR;
  var isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('PanelHeader', platform), {
      'PanelHeader--trnsp': transparent,
      'PanelHeader--shadow': needShadow,
      'PanelHeader--vis': visor,
      'PanelHeader--sep': separator && visor,
      'PanelHeader--vkapps': webviewType === WebviewType.VKAPPS,
      'PanelHeader--no-left': !left,
      'PanelHeader--no-right': !right,
      'PanelHeader--fixed': isFixed
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
};
export default withAdaptivity(PanelHeader, {
  sizeX: true,
  sizeY: true
});
//# sourceMappingURL=PanelHeader.js.map