import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { CustomScrollView } from '../CustomScrollView/CustomScrollView';
import { Popper } from '../Popper/Popper';
import { Spinner } from '../Spinner/Spinner';
const calcIsTop = (placement)=>placement.startsWith('top');
export const CustomSelectDropdown = (_param)=>{
    var { children, targetRef, scrollBoxRef, placement = 'bottom', fetching, onPlacementChange: parentOnPlacementChange, offsetDistance = 0, autoWidth = false, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false } = _param, restProps = _object_without_properties(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "onPlacementChange",
        "offsetDistance",
        "autoWidth",
        "forcePortal",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "className",
        "noMaxHeight"
    ]);
    const [isTop, setIsTop] = React.useState(()=>calcIsTop(placement));
    const onPlacementChange = React.useCallback((placement)=>{
        setIsTop(calcIsTop(placement));
        if (parentOnPlacementChange) {
            parentOnPlacementChange(placement);
        }
    }, [
        parentOnPlacementChange
    ]);
    return /*#__PURE__*/ React.createElement(Popper, _object_spread({
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: classNames("vkuiCustomSelectDropdown", 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), autoWidth && classNames("vkuiCustomSelectDropdown--wide", 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), /*#__PURE__*/ React.createElement(CustomScrollView, {
        boxRef: scrollBoxRef,
        className: noMaxHeight ? undefined : "vkuiCustomSelectDropdown__in--withMaxHeight",
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay
    }, fetching ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectDropdown__fetching"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        size: "small"
    })) : children));
};

//# sourceMappingURL=CustomSelectDropdown.js.map