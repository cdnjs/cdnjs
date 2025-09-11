'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { clamp } from "../../helpers/math.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusWithin } from "../../hooks/useFocusWithin.js";
import { useIsClient } from "../../hooks/useIsClient.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { CarouselBase } from "../CarouselBase/CarouselBase.js";
import { useAutoPlay } from "./hooks.js";
/**
 * @see https://vkui.io/components/gallery
 */ export const Gallery = (_param)=>{
    var { initialSlideIndex = 0, children, timeout = 0, onChange, bullets, onDragStart, onDragEnd, getRootRef, onMouseOver, onMouseOut } = _param, props = _object_without_properties(_param, [
        "initialSlideIndex",
        "children",
        "timeout",
        "onChange",
        "bullets",
        "onDragStart",
        "onDragEnd",
        "getRootRef",
        "onMouseOver",
        "onMouseOut"
    ]);
    const rootRef = useExternRef(getRootRef);
    const [localSlideIndex, setSlideIndex] = React.useState(initialSlideIndex);
    const isControlled = typeof props.slideIndex === 'number';
    var _props_slideIndex;
    const slideIndex = isControlled ? (_props_slideIndex = props.slideIndex) !== null && _props_slideIndex !== void 0 ? _props_slideIndex : 0 : localSlideIndex;
    const slides = React.useMemo(()=>React.Children.toArray(children).filter((item)=>Boolean(item)), [
        children
    ]);
    const childCount = slides.length;
    const isClient = useIsClient();
    const focusWithin = useFocusWithin(rootRef);
    const handleChange = React.useCallback((current)=>{
        if (current === slideIndex) {
            return;
        }
        !isControlled && setSlideIndex(current);
        onChange && onChange(current);
    }, [
        isControlled,
        onChange,
        slideIndex
    ]);
    const autoPlayControls = useAutoPlay({
        timeout,
        slideIndex,
        onNext: ()=>handleChange((slideIndex + 1) % childCount)
    });
    // prevent invalid slideIndex
    // any slide index is invalid with no slides, just keep it as is
    const safeSlideIndex = childCount > 0 ? clamp(slideIndex, 0, childCount - 1) : slideIndex;
    // notify parent in controlled mode
    React.useEffect(()=>{
        if (onChange && safeSlideIndex !== slideIndex) {
            onChange(safeSlideIndex);
        }
        setSlideIndex(safeSlideIndex);
    }, [
        onChange,
        safeSlideIndex,
        slideIndex
    ]);
    useIsomorphicLayoutEffect(()=>focusWithin ? autoPlayControls.pause() : autoPlayControls.resume(), [
        focusWithin,
        autoPlayControls.pause,
        autoPlayControls.resume
    ]);
    if (!isClient) {
        return null;
    }
    return /*#__PURE__*/ _jsx(CarouselBase, _object_spread_props(_object_spread({
        dragDisabled: isControlled && !onChange,
        getRootRef: rootRef
    }, props), {
        onDragStart: callMultiple(onDragStart, autoPlayControls.pause),
        onDragEnd: callMultiple(onDragEnd, autoPlayControls.resume),
        onMouseEnter: callMultiple(onMouseOver, autoPlayControls.pause),
        onMouseLeave: callMultiple(onMouseOut, autoPlayControls.resume),
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange,
        children: slides
    }));
};

//# sourceMappingURL=Gallery.js.map