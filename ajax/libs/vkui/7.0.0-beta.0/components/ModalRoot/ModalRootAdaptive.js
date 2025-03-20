import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { ModalRootTouch } from "./ModalRoot.js";
import { ModalRootDesktop } from "./ModalRootDesktop.js";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */ export const ModalRoot = (props)=>{
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    useScrollLock(!!props.activeModal);
    const RootComponent = isDesktop ? ModalRootDesktop : ModalRootTouch;
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({}, props));
};

//# sourceMappingURL=ModalRootAdaptive.js.map