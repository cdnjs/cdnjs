import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { RootComponent } from '../RootComponent/RootComponent';
import { ScrollArrow } from '../ScrollArrow/ScrollArrow';
import { Touch } from '../Touch/Touch';
import { calcMax, calcMin } from './helpers';
import styles from './BaseGallery.module.css';
const ANIMATION_DURATION = 0.24;
const LAYOUT_DEFAULT_STATE = {
    containerWidth: 0,
    viewportOffsetWidth: 0,
    layerWidth: 0,
    min: 0,
    max: 0,
    slides: [],
    isFullyVisible: true
};
const SHIFT_DEFAULT_STATE = {
    animation: undefined,
    shiftX: 0,
    dragging: false,
    deltaX: 0,
    indent: 0
};
const stylesBullets = {
    dark: styles['BaseGallery__bullets--dark'],
    light: styles['BaseGallery__bullets--light']
};
export const BaseGallery = ({ bullets = false, getRootRef, children, slideWidth = '100%', slideIndex = 0, dragDisabled = false, onDragStart, onDragEnd, onChange, onPrevClick, onNextClick, align = 'left', showArrows, getRef, arrowSize = 'l', ...restProps })=>{
    const slidesStore = React.useRef({});
    const layoutState = React.useRef(LAYOUT_DEFAULT_STATE);
    const [shiftState, setShiftState] = React.useState(SHIFT_DEFAULT_STATE);
    const rootRef = useExternRef(getRootRef);
    const viewportRef = useExternRef(getRef);
    const { window } = useDOM();
    const hasPointer = useAdaptivityHasPointer();
    const isCenterWithCustomWidth = slideWidth === 'custom' && align === 'center';
    const validateIndent = (value)=>{
        const localMax = layoutState.current.max ?? 0;
        const localMin = layoutState.current.min ?? 0;
        if (value < localMin) {
            return localMin;
        } else if (value > localMax) {
            return localMax;
        }
        return value;
    };
    /*
   * Считает отступ слоя галереи
   */ const calculateIndent = (targetIndex)=>{
        if (layoutState.current.isFullyVisible) {
            return 0;
        }
        const targetSlide = layoutState.current.slides?.length ? layoutState.current.slides[targetIndex] : null;
        if (targetSlide) {
            const { coordX, width } = targetSlide;
            if (isCenterWithCustomWidth) {
                const viewportWidth = layoutState.current.viewportOffsetWidth ?? 0;
                return viewportWidth / 2 - coordX - width / 2;
            }
            return validateIndent(-1 * coordX);
        }
        return 0;
    };
    /*
   * Считает отступ слоя галереи во время драга
   */ const calculateDragIndent = ()=>{
        const localMax = layoutState.current.max ?? 0;
        const localMin = layoutState.current.min ?? 0;
        const indent = shiftState.shiftX + shiftState.deltaX;
        if (indent > localMax) {
            return localMax + Number((indent - localMax) / 3);
        } else if (indent < localMin) {
            return localMin + Number((indent - localMin) / 3);
        }
        return indent;
    };
    const initializeSlides = (options = {})=>{
        const localSlides = React.Children.map(children, (_item, i)=>{
            const elem = slidesStore.current[`slide-${i}`];
            return {
                coordX: elem?.offsetLeft ?? 0,
                width: elem?.offsetWidth ?? 0
            };
        }) ?? [];
        const localContainerWidth = rootRef.current?.offsetWidth ?? 0;
        const localViewportOffsetWidth = viewportRef.current?.offsetWidth ?? 0;
        const localLayerWidth = localSlides.reduce((val, slide)=>slide.width + val, 0);
        const adjustShiftX = localSlides.length <= layoutState.current.slides.length || layoutState.current.slides[slideIndex]?.coordX !== localSlides[slideIndex]?.coordX;
        layoutState.current = {
            containerWidth: localContainerWidth,
            viewportOffsetWidth: localViewportOffsetWidth,
            layerWidth: localLayerWidth,
            max: calcMax({
                slides: localSlides,
                viewportOffsetWidth: localViewportOffsetWidth,
                isCenterWithCustomWidth
            }),
            min: calcMin({
                containerWidth: localContainerWidth,
                layerWidth: localLayerWidth,
                slides: localSlides,
                viewportOffsetWidth: localViewportOffsetWidth,
                isCenterWithCustomWidth,
                align
            }),
            slides: localSlides,
            isFullyVisible: localLayerWidth <= localContainerWidth
        };
        setShiftState((prevState)=>({
                ...prevState,
                shiftX: adjustShiftX ? calculateIndent(slideIndex) : prevState.shiftX,
                animation: options.animation ?? prevState.shiftX === validateIndent(prevState.shiftX)
            }));
    };
    const onResize = ()=>{
        if (shiftState.animation !== undefined) {
            initializeSlides({
                animation: false
            });
        }
    };
    useGlobalEventListener(window, 'resize', onResize);
    useIsomorphicLayoutEffect(()=>{
        initializeSlides({
            animation: false
        });
    }, [
        children,
        align,
        slideWidth
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (shiftState.animation !== undefined) {
            setShiftState((prevState)=>({
                    ...prevState,
                    animation: true,
                    deltaX: 0,
                    shiftX: calculateIndent(slideIndex ?? 0)
                }));
        }
    }, [
        slideIndex
    ]);
    const slideLeft = (event)=>{
        onChange?.(slideIndex - 1);
        onPrevClick?.(event);
    };
    const slideRight = (event)=>{
        onChange?.(slideIndex + 1);
        onNextClick?.(event);
    };
    /*
   * Получает индекс слайда, к которому будет осуществлен переход
   */ const getTarget = (e)=>{
        const expectDeltaX = shiftState.deltaX / e.duration * 240 * 0.6;
        const shift = shiftState.shiftX + shiftState.deltaX + expectDeltaX - (layoutState.current.max ?? 0);
        const direction = shiftState.deltaX < 0 ? 1 : -1;
        // Находим ближайшую границу слайда к текущему отступу
        let targetIndex = layoutState.current.slides.reduce((val, item, index)=>{
            const previousValue = Math.abs(layoutState.current.slides[val].coordX + shift);
            const currentValue = Math.abs(item.coordX + shift);
            return previousValue < currentValue ? val : index;
        }, slideIndex);
        if (targetIndex === slideIndex) {
            let targetSlide = slideIndex + direction;
            if (targetSlide >= 0 && targetSlide < layoutState.current.slides.length) {
                if (Math.abs(shiftState.deltaX) > layoutState.current.slides[targetSlide].width * 0.05) {
                    targetIndex = targetSlide;
                }
            }
        }
        return targetIndex;
    };
    const isDraggable = !dragDisabled && !layoutState.current.isFullyVisible;
    const onStart = (e)=>{
        e.originalEvent.stopPropagation();
        if (isDraggable) {
            onDragStart?.(e);
            setShiftState((prevState)=>({
                    ...prevState,
                    animation: false
                }));
        }
    };
    const onMoveX = (e)=>{
        if (isDraggable) {
            e.originalEvent.preventDefault();
            if (e.isSlideX) {
                if (shiftState.deltaX !== e.shiftX) {
                    setShiftState((prevState)=>({
                            ...prevState,
                            deltaX: e.shiftX,
                            dragging: e.isSlideX
                        }));
                }
            }
        }
    };
    const onEnd = (e)=>{
        if (isDraggable) {
            const targetIndex = e.isSlide ? getTarget(e) : slideIndex ?? 0;
            onDragEnd?.(e, targetIndex);
            const nextShiftState = {
                animation: true,
                dragging: false,
                deltaX: 0
            };
            const shiftXStick = calculateDragIndent();
            if (targetIndex !== slideIndex) {
                // Сохраняем сдвиг слайда в том положении, в каком его оставили после драга (fix issue #2185)
                nextShiftState.shiftX = shiftXStick;
            }
            setShiftState((prevState)=>({
                    ...prevState,
                    ...nextShiftState
                }));
            if (targetIndex !== slideIndex) {
                onChange?.(targetIndex);
            }
        }
    };
    const indent = shiftState.dragging ? calculateDragIndent() : shiftState.shiftX;
    const layerStyle = {
        WebkitTransform: `translateX(${indent}px)`,
        transform: `translateX(${indent}px)`,
        WebkitTransition: shiftState.animation ? `-webkit-transform ${ANIMATION_DURATION}s cubic-bezier(.1, 0, .25, 1)` : 'none',
        transition: shiftState.animation ? `transform ${ANIMATION_DURATION}s cubic-bezier(.1, 0, .25, 1)` : 'none'
    };
    const setSlideRef = (slideRef, slideIndex)=>{
        slidesStore.current[`slide-${slideIndex}`] = slideRef;
    };
    // shiftX is negative number <= 0, we can swipe back only if it is < 0
    const canSlideLeft = !layoutState.current.isFullyVisible && shiftState.shiftX < 0;
    const canSlideRight = !layoutState.current.isFullyVisible && // we can't move right when gallery layer fully scrolled right, if gallery aligned by left side
    (align === 'left' && layoutState.current.containerWidth - shiftState.shiftX < (layoutState.current.layerWidth ?? 0) || // otherwise we need to check current slide index (align = right or align = center)
    align !== 'left' && slideIndex < layoutState.current.slides.length - 1);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['BaseGallery'], align === 'center' && styles['BaseGallery--align-center'], slideWidth === 'custom' && styles['BaseGallery--custom-width'], isDraggable && styles['BaseGallery--draggable']),
        getRootRef: rootRef
    }, /*#__PURE__*/ React.createElement(Touch, {
        className: styles['BaseGallery__viewport'],
        onStartX: onStart,
        onMoveX: onMoveX,
        onEnd: onEnd,
        style: {
            width: slideWidth === 'custom' ? '100%' : slideWidth
        },
        getRootRef: viewportRef,
        noSlideClick: true
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['BaseGallery__layer'],
        style: layerStyle
    }, React.Children.map(children, (item, i)=>/*#__PURE__*/ React.createElement("div", {
            className: styles['BaseGallery__slide'],
            key: `slide-${i}`,
            ref: (el)=>setSlideRef(el, i)
        }, item)))), bullets && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: classNames(styles['BaseGallery__bullets'], stylesBullets[bullets])
    }, React.Children.map(children, (_item, index)=>/*#__PURE__*/ React.createElement("div", {
            className: classNames(styles['BaseGallery__bullet'], index === slideIndex && styles['BaseGallery__bullet--active']),
            key: index
        }))), showArrows && hasPointer && canSlideLeft && /*#__PURE__*/ React.createElement(ScrollArrow, {
        className: styles['BaseGallery__arrow'],
        direction: "left",
        onClick: slideLeft,
        size: arrowSize
    }), showArrows && hasPointer && canSlideRight && /*#__PURE__*/ React.createElement(ScrollArrow, {
        className: styles['BaseGallery__arrow'],
        direction: "right",
        onClick: slideRight,
        size: arrowSize
    }));
};

//# sourceMappingURL=BaseGallery.js.map