import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["left", "right", "children", "separator", "getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { isPrimitiveReactNode } from "../../lib/utils";
import { VKCOM } from "../../lib/platform";
import Separator from "../Separator/Separator";
import { useAdaptivity } from "../../hooks/useAdaptivity";

var ModalPageHeader = function ModalPageHeader(props) {
  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  var left = props.left,
      right = props.right,
      children = props.children,
      separator = props.separator,
      getRef = props.getRef,
      restProps = _objectWithoutProperties(props, _excluded);

  var isPrimitive = isPrimitiveReactNode(children);
  var hasSeparator = separator && platform === VKCOM;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('ModalPageHeader', platform), "ModalPageHeader--sizeX-".concat(sizeX)),
    ref: getRef
  }), createScopedElement("div", {
    vkuiClass: "ModalPageHeader__in"
  }, createScopedElement("div", {
    vkuiClass: "ModalPageHeader__left"
  }, left), createScopedElement("div", {
    vkuiClass: "ModalPageHeader__content"
  }, createScopedElement("div", {
    vkuiClass: "ModalPageHeader__content-in"
  }, isPrimitive ? createScopedElement("span", null, children) : children)), createScopedElement("div", {
    vkuiClass: "ModalPageHeader__right"
  }, right)), hasSeparator && createScopedElement(Separator, {
    wide: true,
    vkuiClass: "ModalPageHeader__separator"
  }));
};

ModalPageHeader.defaultProps = {
  separator: true
};
export default ModalPageHeader;
//# sourceMappingURL=ModalPageHeader.js.map