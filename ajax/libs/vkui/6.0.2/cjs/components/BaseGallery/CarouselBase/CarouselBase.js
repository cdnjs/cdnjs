"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CarouselBase", {
    enumerable: true,
    get: function() {
        return CarouselBase;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityHasPointer = require("../../../hooks/useAdaptivityHasPointer");
const _useExternRef = require("../../../hooks/useExternRef");
const _useGlobalEventListener = require("../../../hooks/useGlobalEventListener");
const _dom = require("../../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../../lib/warnOnce");
const _RootComponent = require("../../RootComponent/RootComponent");
const _ScrollArrow = require("../../ScrollArrow/ScrollArrow");
const _Touch = require("../../Touch/Touch");
const _constants = require("./constants");
const _helpers = require("./helpers");
const _hooks = require("./hooks");
const stylesBullets = {
    dark: "vkuiBaseGallery__bullets--dark",
    light: "vkuiBaseGallery__bullets--light"
};
const warn = (0, _warnOnce.warnOnce)('Gallery');
const CarouselBase = (_param)=>{
    var { bullets = false, getRootRef, children, slideWidth = '100%', slideIndex = 0, dragDisabled = false, onDragStart, onDragEnd, onChange, onPrevClick, onNextClick, align = 'left', showArrows, getRef, arrowSize = 'l' } = _param, restProps = _object_without_properties._(_param, [
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
    const slidesStore = _react.useRef({});
    const slidesManager = _react.useRef(_constants.SLIDES_MANAGER_STATE);
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const viewportRef = (0, _useExternRef.useExternRef)(getRef);
    const layerRef = _react.useRef(null);
    const animationFrameRef = _react.useRef(null);
    const shiftXCurrentRef = _react.useRef(0);
    const shiftXDeltaRef = _react.useRef(0);
    const initialized = _react.useRef(false);
    const { addToAnimationQueue, getAnimateFunction, startAnimation } = (0, _hooks.useSlideAnimation)();
    const [controlElementsState, setControlElementsState] = _react.useState(_constants.CONTROL_ELEMENTS_STATE);
    const { window } = (0, _dom.useDOM)();
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
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
            layerRef.current.style.transition = animation ? `transform ${_constants.ANIMATION_DURATION}ms cubic-bezier(.1, 0, .25, 1)` : '';
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
        let localSlides = _react.Children.map(children, (_item, i)=>{
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
        slidesManager.current = _object_spread_props._(_object_spread._({}, slidesManager.current), {
            viewportOffsetWidth,
            slides: localSlides,
            isFullyVisible: layerWidth <= containerWidth
        });
        const snaps = localSlides.map((_, index)=>(0, _helpers.calculateIndent)(index, slidesManager.current, isCenterWithCustomWidth));
        let contentSize = -snaps[snaps.length - 1] + localSlides[localSlides.length - 1].width;
        if (align === 'center') {
            contentSize += snaps[0];
        }
        slidesManager.current.snaps = snaps;
        slidesManager.current.contentSize = contentSize;
        slidesManager.current.loopPoints = (0, _helpers.getLoopPoints)(slidesManager.current, containerWidth);
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
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', onResize);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function performSlideChange() {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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
                targetIndex = (0, _helpers.getTargetIndex)(slidesManager.current.slides, slideIndex, shiftXCurrentRef.current, shiftXDeltaRef.current);
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
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiBaseGallery", slideWidth === 'custom' && "vkuiBaseGallery--custom-width", isDraggable && "vkuiBaseGallery--draggable"),
        getRootRef: rootRef
    }), /*#__PURE__*/ _react.createElement(_Touch.Touch, {
        className: "vkuiBaseGallery__viewport",
        onStartX: onStart,
        onMoveX: onMoveX,
        onEnd: onEnd,
        style: {
            width: slideWidth === 'custom' ? '100%' : slideWidth
        },
        getRootRef: viewportRef,
        noSlideClick: true
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiBaseGallery__layer",
        ref: layerRef
    }, _react.Children.map(children, (item, i)=>/*#__PURE__*/ _react.createElement("div", {
            className: "vkuiBaseGallery__slide",
            key: `slide-${i}`,
            ref: (el)=>setSlideRef(el, i)
        }, item)))), bullets && /*#__PURE__*/ _react.createElement("div", {
        "aria-hidden": true,
        className: (0, _vkjs.classNames)("vkuiBaseGallery__bullets", stylesBullets[bullets])
    }, _react.Children.map(children, (_item, index)=>/*#__PURE__*/ _react.createElement("div", {
            className: (0, _vkjs.classNames)("vkuiBaseGallery__bullet", index === slideIndex && "vkuiBaseGallery__bullet--active"),
            key: index
        }))), showArrows && hasPointer && canSlideLeft && /*#__PURE__*/ _react.createElement(_ScrollArrow.ScrollArrow, {
        className: "vkuiBaseGallery__arrow",
        direction: "left",
        onClick: slideLeft,
        size: arrowSize
    }), showArrows && hasPointer && canSlideRight && /*#__PURE__*/ _react.createElement(_ScrollArrow.ScrollArrow, {
        className: "vkuiBaseGallery__arrow",
        direction: "right",
        onClick: slideRight,
        size: arrowSize
    }));
};

//# sourceMappingURL=CarouselBase.js.map