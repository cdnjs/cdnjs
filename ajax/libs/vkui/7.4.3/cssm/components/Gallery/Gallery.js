'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { clamp } from "../../helpers/math.js";
import { useIsClient } from "../../hooks/useIsClient.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { CarouselBase } from "../CarouselBase/CarouselBase.js";
import { useAutoPlay } from "./hooks.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Gallery
 */ export const Gallery = ({ initialSlideIndex = 0, children, timeout = 0, onChange, bullets, onDragStart, onDragEnd, ...props })=>{
    const [localSlideIndex, setSlideIndex] = React.useState(initialSlideIndex);
    const isControlled = typeof props.slideIndex === 'number';
    const slideIndex = isControlled ? props.slideIndex ?? 0 : localSlideIndex;
    const slides = React.useMemo(()=>React.Children.toArray(children).filter((item)=>Boolean(item)), [
        children
    ]);
    const childCount = slides.length;
    const isClient = useIsClient();
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
    if (!isClient) {
        return null;
    }
    return /*#__PURE__*/ _jsx(CarouselBase, {
        dragDisabled: isControlled && !onChange,
        ...props,
        onDragStart: callMultiple(onDragStart, autoPlayControls.pause),
        onDragEnd: callMultiple(onDragEnd, autoPlayControls.resume),
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange,
        children: slides
    });
};

//# sourceMappingURL=Gallery.js.map