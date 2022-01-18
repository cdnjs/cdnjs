import { createScopedElement } from "../../lib/jsxRuntime";
import { withAdaptivity, ViewHeight, ViewWidth } from "../../hoc/withAdaptivity";
import { ModalRootTouch } from "./ModalRoot";
import { ModalRootDesktop } from "./ModalRootDesktop";

var ModalRootComponent = function ModalRootComponent(props) {
  var viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      hasMouse = props.hasMouse;
  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM);
  var RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;
  return createScopedElement(RootComponent, props);
};

ModalRootComponent.displayName = 'ModalRoot';
export var ModalRoot = withAdaptivity(ModalRootComponent, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
//# sourceMappingURL=ModalRootAdaptive.js.map