import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { mergeCalls } from '../../lib/mergeCalls';
import { checkClickable, Clickable } from '../Clickable/Clickable';
import { Ripple, useMaybeNeedRipple, useRipple } from './Ripple';
import { activeClass, DEFAULT_STATE_MODE, hoverClass } from './state';
const sizeXClassNames = {
    none: "vkuiTappable--sizeX-none",
    compact: "vkuiTappable--sizeX-compact"
};
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case undefined:
            return "vkuiTappable--hasPointer-none";
        case false:
            return "vkuiTappable--hasPointer-false";
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
    return /*#__PURE__*/ React.createElement(Clickable, _object_spread({
        baseClassName: classNames(baseClassName, "vkuiTappable", sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], borderRadiusMode === 'inherit' && "vkuiTappable--borderRadiusInherit", hasPointerClassName(hasPointer)),
        hoverClassName: hoverClass(hoverMode),
        activeClassName: activeClass(activeMode)
    }, typeProps, handlers, restProps), children, isClickable && (hoverMode === 'background' || activeMode === 'background') && /*#__PURE__*/ React.createElement(Ripple, {
        needRipple: needRipple,
        clicks: clicks
    }));
};

//# sourceMappingURL=Tappable.js.map