import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "left", "after", "right", "children", "separator", "visor", "transparent", "shadow", "getRef", "getRootRef", "sizeX", "sizeY", "fixed"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { warnOnce } from "../../lib/warnOnce";
import { FixedLayout } from "../FixedLayout/FixedLayout";
import { Separator } from "../Separator/Separator";
import { Platform, VKCOM } from "../../lib/platform";
import { ConfigProviderContext, WebviewType } from "../ConfigProvider/ConfigProviderContext";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import { Text } from "../Typography/Text/Text";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";
import { Spacing } from "../Spacing/Spacing";
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
  }, platform === VKCOM ? createScopedElement(Text, {
    weight: "2"
  }, children) : createScopedElement("span", {
    vkuiClass: "PanelHeader__content-in"
  }, children)), createScopedElement("div", {
    vkuiClass: "PanelHeader__after"
  }, (webviewType === WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === VKCOM && createScopedElement(Separator, {
    wide: true
  }));
};
var warn = warnOnce("PanelHeader");
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
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var platform = usePlatform();
  var _React$useContext3 = React.useContext(ConfigProviderContext),
    webviewType = _React$useContext3.webviewType;
  var _React$useContext4 = React.useContext(ModalRootContext),
    isInsideModal = _React$useContext4.isInsideModal;
  var needShadow = shadow && sizeX === SizeType.REGULAR;
  var isFixed = fixed !== undefined ? fixed : platform !== Platform.VKCOM;

  // TODO: удалить перед 5.0.0
  var before = propsBefore !== null && propsBefore !== void 0 ? propsBefore : left;
  var after = propsAfter !== null && propsAfter !== void 0 ? propsAfter : right;
  if (process.env.NODE_ENV === "development") {
    right && warn("Свойство right устарелo и будет удалено в 5.0.0. Используйте after.");
    left && warn("Свойство left устарелo и будет удалено в 5.0.0. Используйте before.");
  }
  // /end TODO

  var innerProps = {
    before: before,
    after: after,
    separator: separator,
    children: children
  };
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("PanelHeader", platform), transparent && "PanelHeader--trnsp", needShadow && "PanelHeader--shadow", visor && "PanelHeader--vis", separator && visor && "PanelHeader--sep", webviewType === WebviewType.VKAPPS && !isInsideModal && "PanelHeader--vkapps", !before && "PanelHeader--no-before", !after && "PanelHeader--no-after", isFixed && "PanelHeader--fixed", // TODO v5.0.0 поправить под новую адаптивность
    "PanelHeader--sizeX-".concat(sizeX)),
    ref: isFixed ? getRootRef : getRef
  }), isFixed ? createScopedElement(FixedLayout, {
    vkuiClass: "PanelHeader__fixed",
    vertical: "top",
    getRootRef: getRef
  }, createScopedElement(PanelHeaderIn, innerProps)) : createScopedElement(PanelHeaderIn, innerProps), separator && visor && platform !== VKCOM && (sizeX === SizeType.REGULAR ? createScopedElement(Spacing, {
    size: 16
  }) : createScopedElement(Separator, null)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeader
 */
export var PanelHeader = withAdaptivity(PanelHeaderComponent, {
  sizeX: true,
  sizeY: true
});
PanelHeader.displayName = "PanelHeader";
//# sourceMappingURL=PanelHeader.js.map