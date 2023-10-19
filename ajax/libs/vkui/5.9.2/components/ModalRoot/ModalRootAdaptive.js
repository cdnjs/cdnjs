import * as React from "react";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { ModalRootTouch } from "./ModalRoot";
import { ModalRootDesktop } from "./ModalRootDesktop";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */ export var ModalRoot = function(props) {
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    useScrollLock(!!props.activeModal);
    var RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;
    return /*#__PURE__*/ React.createElement(RootComponent, props);
};

//# sourceMappingURL=ModalRootAdaptive.js.map