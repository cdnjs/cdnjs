import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../../hooks/useAdaptivityHasPointer';
import { useExternRef } from '../../../hooks/useExternRef';
import { useGlobalEventListener } from '../../../hooks/useGlobalEventListener';
import { useDOM } from '../../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../../lib/warnOnce';
import { RootComponent } from '../../RootComponent/RootComponent';
import { ScrollArrow } from '../../ScrollArrow/ScrollArrow';
import { Touch } from '../../Touch/Touch';
import { ANIMATION_DURATION, CONTROL_ELEMENTS_STATE, SLIDES_MANAGER_STATE } from './constants';
import { calculateIndent, getLoopPoints, getTargetIndex } from './helpers';
import { useSlideAnimation } from './hooks';
const stylesBullets = {
    dark: "vkuiBaseGallery__bullets--dark",
    light: "vkuiBaseGallery__bullets--light"
};
const warn = warnOnce('Gallery');
export const CarouselBase = (_param)=>{
    var { bullets = false, getRootRef, children, slideWidth = '100%', slideIndex = 0, dragDisabled = false, onDragStart, onDragEnd, onChange, onPrevClick, onNextClick, align = 'left', showArrows, getRef, arrowSize = 'l' } = _param, restProps = _object_without_properties(_param, [
        "bullets",
        "getRootRef",
        "children",
        "slideWidth",
        "slideIndex",
        "dragDisabled",
        "onDragStart",
        "onDragEnd",
        "onChange",
        "onPrevClick",
        "onNextClick",
        "align",
        "showArrows",
        "getRef",
        "arrowSize"
    ]);
    const slidesStore = React.useRef({});
    const slidesManager = React.useRef(SLIDES_MANAGER_STATE);
    const rootRef = useExternRef(getRootRef);
    const viewportRef = useExternRef(getRef);
    const layerRef = React.useRef(null);
    const animationFrameRef = React.useRef(null);
    const shiftXCurrentRef = React.useRef(0);
    const shiftXDeltaRef = React.useRef(0);
    const initialized = React.useRef(false);
    const { addToAnimationQueue, getAnimateFunction, startAnimation } = useSlideAnimation();
    const [controlElementsState, setControlElementsState] = React.useState(CONTROL_ELEMENTS_STATE);
    const { window } = useDOM();
    const hasPointer = useAdaptivityHasPointer();
    const isCenterWithCustomWidth = slideWidth === 'custom' && align === 'center';
    const transformCssStyles = (shiftX, animation = false)=>{
        slidesManager.current.loopPoints.forEach((loopPoint)=>{
            const { target, index } = loopPoint;
            const slide = slidesStore.current[index];
            if (slide) {
                slide.style.transform = `translate3d(${target(shiftX)}px, 0, 0)`;
            }
        });
        if (layerRef.current) {
            layerRef.current.style.transform = `translate3d(${shiftX}px, 0, 0)`;
            layerRef.current.style.transition = animation ? `transform ${ANIMATION_DURATION}ms cubic-bezier(.1, 0, .25, 1)` : '';
        }
    };
    const requestTransform = (shiftX, animation = false)=>{
        const { snaps, contentSize, slides } = slidesManager.current;
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(()=>{
            if (shiftX > snaps[0]) {
                shiftXCurrentRef.current = -contentSize + snaps[0];
                shiftX = shiftXCurrentRef.current + shiftXDeltaRef.current;
            }
            const lastPoint = slides[slides.length - 1].width + slides[slides.length - 1].coordX;
            if (shiftX <= -lastPoint) {
                shiftXCurrentRef.current = Math.abs(shiftXDeltaRef.current) + snaps[0];
            }
            transformCssStyles(shiftX, animation);
        });
    };
    const initializeSlides = ()=>{
        if (!rootRef.current || !viewportRef.current) {
            return;
        }
        let localSlides = React.Children.map(children, (_item, i)=>{
            const elem = slidesStore.current[i] || {
                offsetLeft: 0,
                offsetWidth: 0
            };
            return {
                coordX: elem.offsetLeft,
                width: elem.offsetWidth
            };
        }) || [];
        const containerWidth = rootRef.current.offsetWidth;
        const viewportOffsetWidth = viewportRef.current.offsetWidth;
        const layerWidth = localSlides.reduce((val, slide)=>slide.width + val, 0);
        if (process.env.NODE_ENV === 'development') {
            let remainingWidth = containerWidth;
            let slideIndex = 0;
            while(remainingWidth > 0 && slideIndex < localSlides.length){
                remainingWidth -= localSlides[slideIndex].width;
                slideIndex++;
            }
            if (remainingWidth <= 0 && slideIndex === localSlides.length) {
                warn('Ширины слайдов недостаточно для корректной работы свойства "looped". Пожалуйста, сделайте её больше."');
            }
        }
        if (align === 'center') {
            const firstSlideShift = (containerWidth - localSlides[0].width) / 2;
            localSlides = localSlides.map((item)=>{
                return {
                    width: item.width,
                    coordX: item.coordX - firstSlideShift
                };
            });
        }
        slidesManager.current = _object_spread_props(_object_spread({}, slidesManager.current), {
            viewportOffsetWidth,
            slides: localSlides,
            isFullyVisible: layerWidth <= containerWidth
        });
        const snaps = localSlides.map((_, index)=>calculateIndent(index, slidesManager.current, isCenterWithCustomWidth));
        let contentSize = -snaps[snaps.length - 1] + localSlides[localSlides.length - 1].width;
        if (align === 'center') {
            contentSize += snaps[0];
        }
        slidesManager.current.snaps = snaps;
        slidesManager.current.contentSize = contentSize;
        slidesManager.current.loopPoints = getLoopPoints(slidesManager.current, containerWidth);
        setControlElementsState({
            canSlideLeft: !slidesManager.current.isFullyVisible,
            canSlideRight: !slidesManager.current.isFullyVisible,
            isDraggable: !(dragDisabled || slidesManager.current.isFullyVisible)
        });
        shiftXCurrentRef.current = snaps[slideIndex];
        initialized.current = true;
        requestTransform(shiftXCurrentRef.current);
    };
    const onResize = ()=>{
        if (initialized.current) {
            initializeSlides();
        }
    };
    useGlobalEventListener(window, 'resize', onResize);
    useIsomorphicLayoutEffect(function performSlideChange() {
        if (!initialized.current) {
            return;
        }
        const { snaps, slides } = slidesManager.current;
        const indent = snaps[slideIndex];
        let startPoint = shiftXCurrentRef.current;
        /**
       * Переключаемся с последнего элемента на первый
       * Для корректной анимации мы прокручиваем последний слайд на всю длину (shiftX) "вперед"
       * В конце анимации при отрисовке следующего кадра задаем всем слайдам начальные значения
       */ if (indent === snaps[0] && shiftXCurrentRef.current <= snaps[snaps.length - 1]) {
            const distance = Math.abs(snaps[snaps.length - 1]) + slides[slides.length - 1].width + startPoint;
            addToAnimationQueue(getAnimateFunction((progress)=>{
                const shiftX = startPoint + progress * distance * -1;
                transformCssStyles(shiftX);
                if (shiftX <= snaps[snaps.length - 1] - slides[slides.length - 1].width) {
                    requestAnimationFrame(()=>{
                        shiftXCurrentRef.current = indent;
                        transformCssStyles(snaps[0]);
                    });
                }
            }));
        /**
         * Переключаемся с первого слайда на последний
         * Для корректной анимации сначала задаем первым видимым слайдам смещение
         * В следующем кадре начинаем анимация прокрутки "назад"
         */ } else if (indent === snaps[snaps.length - 1] && shiftXCurrentRef.current === snaps[0]) {
            startPoint = indent - slides[slides.length - 1].width;
            addToAnimationQueue(()=>{
                requestAnimationFrame(()=>{
                    const shiftX = indent - slides[slides.length - 1].width;
                    transformCssStyles(shiftX);
                    getAnimateFunction((progress)=>{
                        transformCssStyles(startPoint + progress * slides[slides.length - 1].width);
                    })();
                });
            });
        /**
         * Если не обработаны `corner`-кейсы выше, то просто проигрываем анимацию смещения
         */ } else {
            addToAnimationQueue(()=>{
                const distance = Math.abs(indent - startPoint);
                let direction = startPoint <= indent ? 1 : -1;
                getAnimateFunction((progress)=>{
                    const shiftX = startPoint + progress * distance * direction;
                    transformCssStyles(shiftX);
                })();
            });
        }
        startAnimation();
        shiftXCurrentRef.current = indent;
    }, [
        slideIndex
    ]);
    useIsomorphicLayoutEffect(()=>{
        initializeSlides();
    }, [
        children,
        align,
        slideWidth
    ]);
    const slideLeft = (event)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange((slideIndex - 1 + slidesManager.current.slides.length) % slidesManager.current.slides.length);
        onPrevClick === null || onPrevClick === void 0 ? void 0 : onPrevClick(event);
    };
    const slideRight = (event)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange((slideIndex + 1) % slidesManager.current.slides.length);
        onNextClick === null || onNextClick === void 0 ? void 0 : onNextClick(event);
    };
    const onStart = (e)=>{
        e.originalEvent.stopPropagation();
        if (controlElementsState.isDraggable) {
            onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(e);
            shiftXCurrentRef.current = slidesManager.current.snaps[slideIndex];
            shiftXDeltaRef.current = 0;
        }
    };
    const onMoveX = (e)=>{
        if (controlElementsState.isDraggable) {
            e.originalEvent.preventDefault();
            if (e.isSlideX) {
                if (shiftXDeltaRef.current !== e.shiftX) {
                    shiftXDeltaRef.current = e.shiftX;
                    requestTransform(shiftXCurrentRef.current + shiftXDeltaRef.current);
                }
            }
        }
    };
    const onEnd = (e)=>{
        if (controlElementsState.isDraggable) {
            let targetIndex = slideIndex;
            if (e.isSlide) {
                targetIndex = getTargetIndex(slidesManager.current.slides, slideIndex, shiftXCurrentRef.current, shiftXDeltaRef.current);
            }
            onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(e, targetIndex);
            if (targetIndex !== slideIndex) {
                shiftXCurrentRef.current = shiftXCurrentRef.current + shiftXDeltaRef.current;
                onChange === null || onChange === void 0 ? void 0 : onChange(targetIndex);
            } else {
                const initialShiftX = slidesManager.current.snaps[targetIndex];
                requestTransform(initialShiftX, true);
            }
        }
    };
    const setSlideRef = (slideRef, slideIndex)=>{
        slidesStore.current[slideIndex] = slideRef;
    };
    const { canSlideLeft, canSlideRight, isDraggable } = controlElementsState;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiBaseGallery", slideWidth === 'custom' && "vkuiBaseGallery--custom-width", isDraggable && "vkuiBaseGallery--draggable"),
        getRootRef: rootRef
    }), /*#__PURE__*/ React.createElement(Touch, {
        className: "vkuiBaseGallery__viewport",
        onStartX: onStart,
        onMoveX: onMoveX,
        onEnd: onEnd,
        style: {
            width: slideWidth === 'custom' ? '100%' : slideWidth
        },
        getRootRef: viewportRef,
        noSlideClick: true
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBaseGallery__layer",
        ref: layerRef
    }, React.Children.map(children, (item, i)=>/*#__PURE__*/ React.createElement("div", {
            className: "vkuiBaseGallery__slide",
            key: `slide-${i}`,
            ref: (el)=>setSlideRef(el, i)
        }, item)))), bullets && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: classNames("vkuiBaseGallery__bullets", stylesBullets[bullets])
    }, React.Children.map(children, (_item, index)=>/*#__PURE__*/ React.createElement("div", {
            className: classNames("vkuiBaseGallery__bullet", index === slideIndex && "vkuiBaseGallery__bullet--active"),
            key: index
        }))), showArrows && hasPointer && canSlideLeft && /*#__PURE__*/ React.createElement(ScrollArrow, {
        className: "vkuiBaseGallery__arrow",
        direction: "left",
        onClick: slideLeft,
        size: arrowSize
    }), showArrows && hasPointer && canSlideRight && /*#__PURE__*/ React.createElement(ScrollArrow, {
        className: "vkuiBaseGallery__arrow",
        direction: "right",
        onClick: slideRight,
        size: arrowSize
    }));
};

//# sourceMappingURL=CarouselBase.js.map