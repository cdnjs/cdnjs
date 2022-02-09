import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "separator", "getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { usePlatform } from "../../hooks/usePlatform";
import { VKCOM } from "../../lib/platform";
import PanelHeader from "../PanelHeader/PanelHeader";
import Separator from "../Separator/Separator";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { ViewHeight, ViewWidth } from "../AdaptivityProvider/AdaptivityContext";

var ModalPageHeader = function ModalPageHeader(_ref) {
  var children = _ref.children,
      separator = _ref.separator,
      getRef = _ref.getRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      viewWidth = _useAdaptivity.viewWidth,
      viewHeight = _useAdaptivity.viewHeight,
      hasMouse = _useAdaptivity.hasMouse;

  var hasSeparator = separator && platform === VKCOM;
  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM);
  return createScopedElement("div", {
    vkuiClass: classNames(getClassName("ModalPageHeader", platform), {
      "ModalPageHeader--desktop": isDesktop
    }),
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

ModalPageHeader.defaultProps = {
  separator: true
}; // eslint-disable-next-line import/no-default-export

export default ModalPageHeader;
//# sourceMappingURL=ModalPageHeader.js.map