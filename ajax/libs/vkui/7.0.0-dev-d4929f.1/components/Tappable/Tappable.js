'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { SizeType } from "../../lib/adaptivity/index.js";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { checkClickable, Clickable } from "../Clickable/Clickable.js";
import { Ripple, useMaybeNeedRipple, useRipple } from "./Ripple.js";
import { activeClass, DEFAULT_STATE_MODE, hoverClass } from "./state.js";
const sizeXClassNames = {
    none: "Tappable__sizeXNone--Nyk3M",
    compact: "Tappable__sizeXCompact--8EB9o"
};
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case undefined:
            return "Tappable__hasPointerNone--ae-DU";
        case false:
            return "Tappable__hasPointerFalse--hbCG6";
    }
    return undefined;
}
export const Tappable = (_param)=>{
    var { baseClassName, borderRadiusMode = 'auto', children, hoverMode = DEFAULT_STATE_MODE, activeMode = DEFAULT_STATE_MODE, onPointerDown, onPointerCancel } = _param, restProps = _object_without_properties(_param, [
        "baseClassName",
        "borderRadiusMode",
        "children",
        "hoverMode",
        "activeMode",
        "onPointerDown",
        "onPointerCancel"
    ]);
    const isClickable = checkClickable(restProps);
    const { sizeX = 'none', hasPointer } = useAdaptivity();
    const needRipple = useMaybeNeedRipple(activeMode, hasPointer);
    const _useRipple = useRipple(needRipple, hasPointer), { clicks } = _useRipple, rippleEvents = _object_without_properties(_useRipple, [
        "clicks"
    ]);
    const handlers = mergeCalls(rippleEvents, {
        onPointerDown,
        onPointerCancel
    });
    const typeProps = restProps.Component === 'button' ? {
        type: 'button'
    } : {};
    return /*#__PURE__*/ _jsxs(Clickable, _object_spread_props(_object_spread({
        baseClassName: classNames(baseClassName, "Tappable__host--F3rY9", sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], borderRadiusMode === 'inherit' && "Tappable__borderRadiusInherit--fJQSQ", hasPointerClassName(hasPointer)),
        hoverClassName: hoverClass(hoverMode),
        activeClassName: activeClass(activeMode)
    }, typeProps, handlers, restProps), {
        children: [
            children,
            isClickable && (hoverMode === 'background' || activeMode === 'background') && /*#__PURE__*/ _jsx(Ripple, {
                needRipple: needRipple,
                clicks: clicks
            })
        ]
    }));
};

//# sourceMappingURL=Tappable.js.map