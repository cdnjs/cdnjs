import * as React from 'react';
import { clamp } from '../../helpers/math';
import { useTimeout } from '../../hooks/useTimeout';
import { BaseGallery } from '../BaseGallery/BaseGallery';
/**
 * @see https://vkcom.github.io/VKUI/#/Gallery
 */ export const Gallery = ({ initialSlideIndex = 0, children, timeout = 0, onChange, bullets, ...props })=>{
    const [localSlideIndex, setSlideIndex] = React.useState(initialSlideIndex);
    const isControlled = typeof props.slideIndex === 'number';
    const slideIndex = isControlled ? props.slideIndex ?? 0 : localSlideIndex;
    const isDraggable = !isControlled || Boolean(onChange);
    const slides = React.useMemo(()=>React.Children.toArray(children).filter((item)=>Boolean(item)), [
        children
    ]);
    const childCount = slides.length;
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
    const autoplay = useTimeout(()=>handleChange((slideIndex + 1) % childCount), timeout);
    React.useEffect(()=>timeout ? autoplay.set() : autoplay.clear(), [
        timeout,
        slideIndex,
        autoplay
    ]);
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
    return /*#__PURE__*/ React.createElement(BaseGallery, {
        isDraggable: isDraggable,
        ...props,
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange
    }, slides);
};

//# sourceMappingURL=Gallery.js.map