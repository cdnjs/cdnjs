import { createScopedElement } from "../../lib/jsxRuntime";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { ModalRootTouch } from "./ModalRoot";
import { ModalRootDesktop } from "./ModalRootDesktop";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";

var ModalRootComponent = function ModalRootComponent(props) {
  var isDesktop = useAdaptivityIsDesktop();
  useScrollLock(!!props.activeModal);
  var RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;
  return createScopedElement(RootComponent, props);
};

ModalRootComponent.displayName = "ModalRoot";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */

export var ModalRoot = withAdaptivity(ModalRootComponent, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
//# sourceMappingURL=ModalRootAdaptive.js.map