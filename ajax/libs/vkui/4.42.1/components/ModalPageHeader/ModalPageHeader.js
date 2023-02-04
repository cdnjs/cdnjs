import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "separator", "getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";
import { VKCOM } from "../../lib/platform";
import { Separator } from "../Separator/Separator";
import { PanelHeader } from "../PanelHeader/PanelHeader";
import { classNames } from "../../lib/classNames";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPageHeader
 */
export var ModalPageHeader = function ModalPageHeader(_ref) {
  var children = _ref.children,
    _ref$separator = _ref.separator,
    separator = _ref$separator === void 0 ? true : _ref$separator,
    getRef = _ref.getRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var hasSeparator = separator && platform === VKCOM;
  // TODO v5.0.0 поправить под новую адаптивность
  var isDesktop = useAdaptivityIsDesktop();
  return createScopedElement("div", {
    vkuiClass: classNames("ModalPageHeader", platform !== VKCOM && "ModalPageHeader--withGaps", isDesktop && "ModalPageHeader--desktop"),
    ref: getRef
  }, createScopedElement(PanelHeader, _extends({
    vkuiClass: "ModalPageHeader__in"
  }, restProps, {
    fixed: false,
    separator: false,
    transparent: true
  }), children), hasSeparator && createScopedElement(Separator, {
    wide: true
  }));
};
//# sourceMappingURL=ModalPageHeader.js.map