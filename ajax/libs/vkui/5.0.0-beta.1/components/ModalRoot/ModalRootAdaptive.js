import { createScopedElement } from "../../lib/jsxRuntime";
import { ModalRootTouch } from "./ModalRoot";
import { ModalRootDesktop } from "./ModalRootDesktop";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";

/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */
export var ModalRoot = function ModalRoot(props) {
  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  useScrollLock(!!props.activeModal);
  var RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;
  return createScopedElement(RootComponent, props);
};
//# sourceMappingURL=ModalRootAdaptive.js.map