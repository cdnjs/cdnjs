'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useMutationObserver } from "../../hooks/useMutationObserver.js";
import { useResizeObserver } from "../../hooks/useResizeObserver.js";
import { useDOM } from "../../lib/dom.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Bullets } from "./Bullets.js";
import { CarouselViewPort } from "./CarouselViewPort.js";
import { ScrollArrows } from "./ScrollArrows.js";
import { ANIMATION_DURATION, CONTROL_ELEMENTS_STATE, SLIDE_THRESHOLD, SLIDES_MANAGER_STATE } from "./constants.js";
import { calcMax, calcMin, calculateIndent, getLoopPoints, getTargetIndex, isBigger, isBiggerOrEqual, isLowerOrEqual, revertRtlValue, validateIndent } from "./helpers.js";
import { useSlideAnimation } from "./hooks.js";
const warn = warnOnce('Gallery');
export const CarouselBase = (_param)=>{
    var { bullets = false, getRootRef, children, slideWidth = '100%', slideIndex = 0, dragDisabled = false, resizeSource = 'window', onDragStart, onDragEnd, onChange, onPrevClick, onNextClick, align = 'left', showArrows, getRef, arrowSize, arrowAreaHeight, slideTestId, bulletTestId, nextArrowTestId, prevArrowTestId, looped = false } = _param, restProps = _object_without_properties(_param, [
        "bullets",
        "getRootRef",
        "children",
        "slideWidth",
        "slideIndex",
        "dragDisabled",
        "resizeSource",
        "onDragStart",
        "onDragEnd",
        "onChange",
        "onPrevClick",
        "onNextClick",
        "align",
        "showArrows",
        "getRef",
        "arrowSize",
        "arrowAreaHeight",
        "slideTestId",
        "bulletTestId",
        "nextArrowTestId",
        "prevArrowTestId",
        "looped"
    ]);
    const slidesStore = React.useRef({});
    const slidesManager = React.useRef(SLIDES_MANAGER_STATE);
    const textDirection = useConfigDirection();
    const isRtl = textDirection === 'rtl';
    const rootRef = useExternRef(getRootRef);
    const viewportRef = useExternRef(getRef);
    const layerRef = React.useRef(null);
    const animationFrameRef = React.useRef(null);
    const shiftXCurrentRef = React.useRef(0);
    const shiftXDeltaRef = React.useRef(0);
    const initialized = React.useRef(false);
    const { addToAnimationQueue, getAnimateFunction, startAnimation } = useSlideAnimation();
    const isDragging = React.useRef(false);
    const [controlElementsState, setControlElementsState] = React.useState(CONTROL_ELEMENTS_STATE);
    const hasPointer = useAdaptivityHasPointer();
    const isCenterAlign = align === 'center';
    const calculateCanSlideLeft = ()=>{
        if (looped) {
            return !slidesManager.current.isFullyVisible;
        }
        const isStartShiftX = isBiggerOrEqual(shiftXCurrentRef.current, 0, isRtl);
        return !slidesManager.current.isFullyVisible && !isStartShiftX;
    };
    const calculateCanSlideRight = ()=>{
        if (looped) {
            return !slidesManager.current.isFullyVisible;
        }
        var _slidesManager_current_layerWidth;
        return !slidesManager.current.isFullyVisible && // we can't move right when gallery layer fully scrolled right, if gallery aligned by left side
        (align === 'left' && slidesManager.current.containerWidth - revertRtlValue(shiftXCurrentRef.current, isRtl) < ((_slidesManager_current_layerWidth = slidesManager.current.layerWidth) !== null && _slidesManager_current_layerWidth !== void 0 ? _slidesManager_current_layerWidth : 0) || // otherwise we need to check current slide index (align = right or align = center)
        align !== 'left' && slideIndex < slidesManager.current.slides.length - 1);
    };
    const transformCssStyles = (shiftX, animation = false)=>{
        shiftX = Math.round(shiftX);
        if (looped) {
            slidesManager.current.loopPoints.forEach((loopPoint)=>{
                const { target, index } = loopPoint;
                const slide = slidesStore.current[index];
                if (slide) {
                    slide.style.transform = `translate3d(${target(shiftX)}px, 0, 0)`;
                }
            });
        } else {
            Object.values(slidesStore.current).forEach((slide)=>{
                if (slide) {
                    slide.style.transform = '';
                }
            });
        }
        if (layerRef.current) {
            const indent = isDragging.current && !looped ? validateIndent(slidesManager.current, shiftXCurrentRef.current + shiftXDeltaRef.current, isRtl, false) : shiftX;
            layerRef.current.style.transform = `translate3d(${indent}px, 0, 0)`;
            layerRef.current.style.transition = animation ? `transform ${ANIMATION_DURATION}ms cubic-bezier(.1, 0, .25, 1)` : '';
        }
    };
    const checkShiftOutOfBoundsFromStart = (shiftX, snaps)=>isBigger(shiftX, snaps[0], isRtl);
    const checkShiftOutOfBoundsFromEnd = (shiftX, slides)=>{
        /**
     * Поскольку при `align="center"` слайды сдвинуты, прежде чем рассчитать крайнюю правую точку,
     * нужно вычесть сдвиг слайдов
     */ const firstSlideShift = align === 'center' ? (slidesManager.current.containerWidth - slidesManager.current.slides[0].width) / 2 : 0;
        const lastPoint = slides[slides.length - 1].width + slides[slides.length - 1].coordX - firstSlideShift;
        return isRtl ? shiftX >= lastPoint : shiftX <= -lastPoint;
    };
    const requestTransform = (shiftX, animation = false)=>{
        const { snaps, contentSize, slides } = slidesManager.current;
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(()=>{
            /**
       * Для бесконечной галереи проверяем, что при dnd мы прокрутили левее, чем первый слайд,
       * чтобы сбросить `shiftXCurrentRef`
       */ if (looped && checkShiftOutOfBoundsFromStart(shiftX, snaps)) {
                const firstSnap = revertRtlValue(snaps[0], isRtl);
                shiftXCurrentRef.current = revertRtlValue(-contentSize + firstSnap, isRtl);
                shiftX = shiftXCurrentRef.current + shiftXDeltaRef.current;
            }
            /**
       * Для бесконечной галереи проверяем, что при dnd мы прокрутили правее, чем последний слайд,
       * чтобы правильно пересчитать `shiftXCurrentRef`
       */ if (looped && checkShiftOutOfBoundsFromEnd(shiftX, slides)) {
                shiftXCurrentRef.current = Math.abs(shiftXDeltaRef.current) + snaps[0];
            }
            transformCssStyles(shiftX, animation);
        });
    };
    const initializeSlides = ()=>{
        var _localSlides_slideIndex;
        if (!rootRef.current || !viewportRef.current || !layerRef.current) {
            return;
        }
        const layerOffsetWidth = layerRef.current.offsetWidth;
        const calcRtlCoord = (element)=>{
            const offsetLeft = element.offsetLeft;
            const offsetWidth = element.offsetWidth;
            return layerOffsetWidth - offsetLeft - offsetWidth;
        };
        let localSlides = React.Children.map(children, (_item, i)=>{
            const elem = slidesStore.current[i];
            if (!elem) {
                return {
                    coordX: 0,
                    width: 0
                };
            }
            const coordX = isRtl ? calcRtlCoord(elem) : elem.offsetLeft;
            return {
                coordX,
                width: elem.offsetWidth
            };
        }) || [];
        if (localSlides.length === 0) {
            initialized.current = false;
            return;
        }
        const containerWidth = rootRef.current.offsetWidth;
        const viewportOffsetWidth = viewportRef.current.offsetWidth;
        const layerWidth = localSlides.reduce((val, slide)=>slide.width + val, 0);
        if (process.env.NODE_ENV === 'development' && looped) {
            let remainingWidth = containerWidth;
            let slideIndex = 0;
            while(remainingWidth > 0 && slideIndex < localSlides.length){
                remainingWidth -= localSlides[slideIndex].width;
                slideIndex++;
            }
            if (remainingWidth <= 0 && slideIndex === localSlides.length) {
                warn('Ширины слайдов недостаточно для корректной работы свойства "looped". Пожалуйста, сделайте её больше.');
            }
        }
        var _localSlides_slideIndex_width;
        const currentSlideOffsetOnCenterAlignment = (containerWidth - ((_localSlides_slideIndex_width = (_localSlides_slideIndex = localSlides[slideIndex]) === null || _localSlides_slideIndex === void 0 ? void 0 : _localSlides_slideIndex.width) !== null && _localSlides_slideIndex_width !== void 0 ? _localSlides_slideIndex_width : 0)) / 2;
        const isFullyVisible = align === 'center' ? layerWidth + currentSlideOffsetOnCenterAlignment <= containerWidth : layerWidth <= containerWidth;
        const onlyOneSlide = localSlides.length === 1;
        slidesManager.current = _object_spread_props(_object_spread({}, slidesManager.current), {
            layerWidth,
            containerWidth,
            viewportOffsetWidth,
            slides: localSlides,
            isFullyVisible,
            max: looped || onlyOneSlide ? null : calcMax({
                slides: localSlides,
                containerWidth,
                isCenterAlign,
                isRtl
            }),
            min: looped || onlyOneSlide ? null : calcMin({
                containerWidth,
                layerWidth,
                slides: localSlides,
                viewportOffsetWidth,
                isFullyVisible,
                align,
                isRtl
            })
        });
        const snaps = localSlides.map((_, index)=>calculateIndent({
                targetIndex: index,
                slidesManager: slidesManager.current,
                isCenter: isCenterAlign,
                looped,
                isRtl
            }));
        let contentSize = Math.abs(snaps[snaps.length - 1]) + localSlides[localSlides.length - 1].width;
        if (align === 'center') {
            contentSize += revertRtlValue(snaps[0], isRtl);
        }
        slidesManager.current.snaps = snaps;
        slidesManager.current.contentSize = contentSize;
        // Если галерея не зациклена и слайд всего один, то рассчитывать loopPoints тоже не надо
        if (looped && !onlyOneSlide && !isFullyVisible) {
            slidesManager.current.loopPoints = getLoopPoints(slidesManager.current, containerWidth, isRtl);
        }
        shiftXCurrentRef.current = snaps[slideIndex];
        initialized.current = true;
        setControlElementsState({
            canSlideLeft: calculateCanSlideLeft(),
            canSlideRight: calculateCanSlideRight(),
            isDraggable: !(dragDisabled || slidesManager.current.isFullyVisible)
        });
        requestTransform(shiftXCurrentRef.current);
    };
    const onResize = ()=>{
        if (initialized.current) {
            initializeSlides();
        }
    };
    const { window } = useDOM();
    useResizeObserver(resizeSource === 'element' ? rootRef : window, onResize);
    const loopedSlideChangePerform = ()=>{
        const { snaps, slides } = slidesManager.current;
        const indent = snaps[slideIndex];
        let startPoint = shiftXCurrentRef.current;
        const fromLastToFirst = isLowerOrEqual(shiftXCurrentRef.current, snaps[snaps.length - 1], isRtl);
        /**
     * Переключаемся с последнего элемента на первый
     * Для корректной анимации мы прокручиваем последний слайд на всю длину (shiftX) "вперед"
     * В конце анимации при отрисовке следующего кадра задаем всем слайдам начальные значения
     */ if (indent === snaps[0] && fromLastToFirst) {
            const endEdge = revertRtlValue(Math.abs(snaps[snaps.length - 1]) + slides[slides.length - 1].width, isRtl);
            const distance = endEdge + startPoint;
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
            startPoint = indent - revertRtlValue(slides[slides.length - 1].width, isRtl);
            addToAnimationQueue(()=>{
                requestAnimationFrame(()=>{
                    const shiftX = indent - revertRtlValue(slides[slides.length - 1].width, isRtl);
                    transformCssStyles(shiftX);
                    getAnimateFunction((progress)=>{
                        const diff = revertRtlValue(progress * slides[slides.length - 1].width, isRtl);
                        transformCssStyles(startPoint + diff);
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
    };
    const simpleSlideChangePerform = ()=>{
        const { snaps } = slidesManager.current;
        requestTransform(snaps[slideIndex], true);
    };
    useIsomorphicLayoutEffect(function performSlideChange() {
        if (!initialized.current) {
            return;
        }
        const { snaps } = slidesManager.current;
        const indent = snaps[slideIndex];
        if (looped) {
            loopedSlideChangePerform();
        } else {
            simpleSlideChangePerform();
        }
        startAnimation();
        shiftXCurrentRef.current = indent;
        setControlElementsState((v)=>_object_spread_props(_object_spread({}, v), {
                canSlideLeft: calculateCanSlideLeft(),
                canSlideRight: calculateCanSlideRight()
            }));
    }, [
        slideIndex
    ]);
    useIsomorphicLayoutEffect(function updateIsDraggable() {
        setControlElementsState((v)=>_object_spread_props(_object_spread({}, v), {
                isDraggable: !(dragDisabled || slidesManager.current.isFullyVisible)
            }));
    }, [
        dragDisabled
    ]);
    useMutationObserver(layerRef, initializeSlides);
    useIsomorphicLayoutEffect(initializeSlides, [
        align,
        slideWidth,
        looped,
        isRtl
    ]);
    const calculateMinDeltaXToSlide = ()=>{
        return slidesManager.current.slides[slideIndex].width * SLIDE_THRESHOLD;
    };
    const slideLeft = (event)=>{
        if (slideIndex > 0) {
            shiftXCurrentRef.current += revertRtlValue(calculateMinDeltaXToSlide(), isRtl);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange((slideIndex - 1 + slidesManager.current.slides.length) % slidesManager.current.slides.length);
        onPrevClick === null || onPrevClick === void 0 ? void 0 : onPrevClick(event);
    };
    const slideRight = (event)=>{
        if (slideIndex < slidesManager.current.slides.length - 1) {
            shiftXCurrentRef.current -= revertRtlValue(calculateMinDeltaXToSlide(), isRtl);
        }
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
                isDragging.current = true;
                if (shiftXDeltaRef.current !== e.shiftX) {
                    shiftXDeltaRef.current = e.shiftX;
                    requestTransform(shiftXCurrentRef.current + shiftXDeltaRef.current);
                }
            }
        }
    };
    const onEnd = (e)=>{
        if (controlElementsState.isDraggable) {
            isDragging.current = false;
            let targetIndex = slideIndex;
            if (e.isSlide) {
                targetIndex = getTargetIndex({
                    slides: slidesManager.current.slides,
                    slideIndex,
                    currentShiftX: shiftXCurrentRef.current,
                    currentShiftXDelta: shiftXDeltaRef.current,
                    max: slidesManager.current.max,
                    looped,
                    isRtl
                });
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
    const { isDraggable, canSlideRight, canSlideLeft } = controlElementsState;
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiCarouselBase__host", slideWidth === 'custom' && "vkuiCarouselBase__customWidth", isDraggable && "vkuiCarouselBase__draggable"),
        getRootRef: rootRef,
        children: [
            /*#__PURE__*/ _jsx(CarouselViewPort, {
                slideWidth: slideWidth,
                slideTestId: slideTestId,
                onStart: onStart,
                onMoveX: onMoveX,
                onEnd: onEnd,
                getRootRef: viewportRef,
                layerRef: layerRef,
                setSlideRef: setSlideRef,
                children: children
            }),
            bullets && /*#__PURE__*/ _jsx(Bullets, {
                bullets: bullets,
                slideIndex: slideIndex,
                count: React.Children.count(children),
                bulletTestId: bulletTestId
            }),
            /*#__PURE__*/ _jsx(ScrollArrows, {
                hasPointer: hasPointer,
                canSlideLeft: canSlideLeft,
                canSlideRight: canSlideRight,
                onSlideRight: slideRight,
                onSlideLeft: slideLeft,
                showArrows: showArrows,
                arrowSize: arrowSize,
                arrowAreaHeight: arrowAreaHeight,
                prevArrowTestId: prevArrowTestId,
                nextArrowTestId: nextArrowTestId
            })
        ]
    }));
};

//# sourceMappingURL=CarouselBase.js.map