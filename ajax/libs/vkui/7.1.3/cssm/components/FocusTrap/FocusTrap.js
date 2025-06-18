'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusTrap } from "../../hooks/useFocusTrap.js";
/**
 * @see https://vkcom.github.io/VKUI/#/FocusTrap
 */ export const FocusTrap = ({ Component = 'div', onClose, autoFocus = true, restoreFocus = true, disabled = false, mount = true, timeout = 0, getRootRef, children, ...restProps })=>{
    const ref = useExternRef(getRootRef);
    useFocusTrap(ref, {
        autoFocus,
        restoreFocus,
        disabled,
        mount,
        timeout,
        onClose
    });
    return /*#__PURE__*/ _jsx(Component, {
        tabIndex: -1,
        ref: ref,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=FocusTrap.js.map