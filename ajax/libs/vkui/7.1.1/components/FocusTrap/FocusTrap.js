'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusTrap } from "../../hooks/useFocusTrap.js";
/**
 * @see https://vkcom.github.io/VKUI/#/FocusTrap
 */ export const FocusTrap = (_param)=>{
    var { Component = 'div', onClose, autoFocus = true, restoreFocus = true, disabled = false, mount = true, timeout = 0, getRootRef, children } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "onClose",
        "autoFocus",
        "restoreFocus",
        "disabled",
        "mount",
        "timeout",
        "getRootRef",
        "children"
    ]);
    const ref = useExternRef(getRootRef);
    useFocusTrap(ref, {
        autoFocus,
        restoreFocus,
        disabled,
        mount,
        timeout,
        onClose
    });
    return /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({
        tabIndex: -1,
        ref: ref
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=FocusTrap.js.map