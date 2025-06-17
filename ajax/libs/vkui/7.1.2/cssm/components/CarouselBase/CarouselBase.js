'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer.js";
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
import { calcMax, calcMin, calculateIndent, getLoopPoints, getTargetIndex } from "./helpers.js";
import { useSlideAnimation } from "./hooks.js";
import styles from "./CarouselBase.module.css";
const warn = warnOnce('Gallery');
export const CarouselBase = ({ bullets = false, getRootRef, children, slideWidth = '100%', slideIndex = 0, dragDisabled = false, resizeSource = 'window', onDragStart, onDragEnd, onChange, onPrevClick, onNextClick, align = 'left', showArrows, getRef, arrowSize, arrowAreaHeight, slideTestId, bulletTestId, nextArrowTestId, prevArrowTestId, looped = false, ...restProps })=>{
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
    const isDragging = React.useRef(false);
    const [controlElementsState, setControlElementsState] = React.useState(CONTROL_ELEMENTS_STATE);
    const hasPointer = useAdaptivityHasPointer();
    const isCenterAlign = align === 'center';
    /*
   * Считает отступ слоя галереи во время драга
   * Используется только для looped=false галереи
   * так как только у нее есть пределы по краям
   */ const calculateDragIndent = ()=>{
        const localMax = slidesManager.current.max ?? 0;
        const localMin = slidesManager.current.min ?? 0;
        const indent = shiftXCurrentRef.current + shiftXDeltaRef.current;
        if (indent > localMax) {
            return localMax + Number((indent - localMax) / 3);
        } else if (indent < localMin) {
            return localMin + Number((indent - localMin) / 3);
        }
        return indent;
    };
    const calculateCanSlideLeft = ()=>{
        if (looped) {
            return !slidesManager.current.isFullyVisible;
        }
        return !slidesManager.current.isFullyVisible && shiftXCurrentRef.current < 0;
    };
    const calculateCanSlideRight = ()=>{
        if (looped) {
            return !slidesManager.current.isFullyVisible;
        }
        return !slidesManager.current.isFullyVisible && // we can't move right when gallery layer fully scrolled right, if gallery aligned by left side
        (align === 'left' && slidesManager.current.containerWidth - shiftXCurrentRef.current < (slidesManager.current.layerWidth ?? 0) || // otherwise we need to check current slide index (align = right or align = center)
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
            const indent = isDragging.current && !looped ? calculateDragIndent() : shiftX;
            layerRef.current.style.transform = `translate3d(${indent}px, 0, 0)`;
            layerRef.current.style.transition = animation ? `transform ${ANIMATION_DURATION}ms cubic-bezier(.1, 0, .25, 1)` : '';
        }
    };
    const requestTransform = (shiftX, animation = false)=>{
        const { snaps, contentSize, slides } = slidesManager.current;
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(()=>{
            if (looped && shiftX > snaps[0]) {
                shiftXCurrentRef.current = -contentSize + snaps[0];
                shiftX = shiftXCurrentRef.current + shiftXDeltaRef.current;
            }
            const lastPoint = slides[slides.length - 1].width + slides[slides.length - 1].coordX;
            if (looped && shiftX <= -lastPoint) {
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
        const currentSlideOffsetOnCenterAlignment = (containerWidth - (localSlides[slideIndex]?.width ?? 0)) / 2;
        const isFullyVisible = align === 'center' ? layerWidth + currentSlideOffsetOnCenterAlignment <= containerWidth : layerWidth <= containerWidth;
        const onlyOneSlide = localSlides.length === 1;
        slidesManager.current = {
            ...slidesManager.current,
            layerWidth,
            containerWidth,
            viewportOffsetWidth,
            slides: localSlides,
            isFullyVisible,
            max: looped || onlyOneSlide ? null : calcMax({
                slides: localSlides,
                containerWidth,
                isCenterAlign
            }),
            min: looped || onlyOneSlide ? null : calcMin({
                containerWidth,
                layerWidth,
                slides: localSlides,
                viewportOffsetWidth,
                isFullyVisible,
                align
            })
        };
        const snaps = localSlides.map((_, index)=>calculateIndent(index, slidesManager.current, isCenterAlign, looped));
        let contentSize = -snaps[snaps.length - 1] + localSlides[localSlides.length - 1].width;
        if (align === 'center') {
            contentSize += snaps[0];
        }
        slidesManager.current.snaps = snaps;
        slidesManager.current.contentSize = contentSize;
        // Если галерея не зациклена и слайд всего один, то рассчитывать loopPoints тоже не надо
        if (looped && !onlyOneSlide && !isFullyVisible) {
            slidesManager.current.loopPoints = getLoopPoints(slidesManager.current, containerWidth);
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
    };
    const simpleSlideChangePerform = ()=>{
        const { snaps } = slidesManager.current;
        const startPoint = shiftXCurrentRef.current;
        const endPoint = snaps[slideIndex];
        const distance = endPoint - startPoint;
        addToAnimationQueue(getAnimateFunction((progress)=>transformCssStyles(startPoint + distance * progress)));
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
        setControlElementsState((v)=>({
                ...v,
                canSlideLeft: calculateCanSlideLeft(),
                canSlideRight: calculateCanSlideRight()
            }));
    }, [
        slideIndex
    ]);
    useIsomorphicLayoutEffect(function updateIsDraggable() {
        setControlElementsState((v)=>({
                ...v,
                isDraggable: !(dragDisabled || slidesManager.current.isFullyVisible)
            }));
    }, [
        dragDisabled
    ]);
    useMutationObserver(layerRef, initializeSlides);
    useIsomorphicLayoutEffect(initializeSlides, [
        align,
        slideWidth,
        looped
    ]);
    const calculateMinDeltaXToSlide = ()=>{
        return slidesManager.current.slides[slideIndex].width * SLIDE_THRESHOLD;
    };
    const slideLeft = (event)=>{
        if (slideIndex > 0) {
            shiftXCurrentRef.current += calculateMinDeltaXToSlide();
        }
        onChange?.((slideIndex - 1 + slidesManager.current.slides.length) % slidesManager.current.slides.length);
        onPrevClick?.(event);
    };
    const slideRight = (event)=>{
        if (slideIndex < slidesManager.current.slides.length - 1) {
            shiftXCurrentRef.current -= calculateMinDeltaXToSlide();
        }
        onChange?.((slideIndex + 1) % slidesManager.current.slides.length);
        onNextClick?.(event);
    };
    const onStart = (e)=>{
        e.originalEvent.stopPropagation();
        if (controlElementsState.isDraggable) {
            onDragStart?.(e);
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
                    looped
                });
            }
            onDragEnd?.(e, targetIndex);
            if (targetIndex !== slideIndex) {
                shiftXCurrentRef.current = shiftXCurrentRef.current + shiftXDeltaRef.current;
                onChange?.(targetIndex);
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
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, slideWidth === 'custom' && styles.customWidth, isDraggable && styles.draggable),
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
    });
};

//# sourceMappingURL=CarouselBase.js.map