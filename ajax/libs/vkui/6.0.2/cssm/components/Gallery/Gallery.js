import * as React from 'react';
import { clamp } from '../../helpers/math';
import { useIsClient } from '../../hooks/useIsClient';
import { BaseGallery } from '../BaseGallery/BaseGallery';
import { CarouselBase } from '../BaseGallery/CarouselBase/CarouselBase';
import { useAutoPlay } from './hooks';
/**
 * @see https://vkcom.github.io/VKUI/#/Gallery
 */ export const Gallery = ({ initialSlideIndex = 0, children, timeout = 0, onChange, bullets, looped, ...props })=>{
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
    useAutoPlay(timeout, slideIndex, ()=>handleChange((slideIndex + 1) % childCount));
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
    const Component = looped ? CarouselBase : BaseGallery;
    return /*#__PURE__*/ React.createElement(Component, {
        dragDisabled: isControlled && !onChange,
        ...props,
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange
    }, slides);
};

//# sourceMappingURL=Gallery.js.map