import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../../hooks/useAdaptivityHasPointer";
import { useExternRef } from "../../../hooks/useExternRef";
import { useGlobalEventListener } from "../../../hooks/useGlobalEventListener";
import { useDOM } from "../../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../../lib/warnOnce";
import { RootComponent } from "../../RootComponent/RootComponent";
import { ScrollArrow } from "../../ScrollArrow/ScrollArrow";
import { Touch } from "../../Touch/Touch";
import { ANIMATION_DURATION, CONTROL_ELEMENTS_STATE, SLIDES_MANAGER_STATE } from "./constants";
import { calculateIndent, getLoopPoints, getTargetIndex } from "./helpers";
import { useSlideAnimation } from "./hooks";
var stylesBullets = {
    dark: "vkuiBaseGallery__bullets--dark",
    light: "vkuiBaseGallery__bullets--light"
};
var warn = warnOnce("Gallery");
export var CarouselBase = function(_param) {
    var _param_bullets = _param.bullets, bullets = _param_bullets === void 0 ? false : _param_bullets, getRootRef = _param.getRootRef, children = _param.children, _param_slideWidth = _param.slideWidth, slideWidth = _param_slideWidth === void 0 ? "100%" : _param_slideWidth, _param_slideIndex = _param.slideIndex, slideIndex = _param_slideIndex === void 0 ? 0 : _param_slideIndex, tmp = _param.isDraggable, isDraggableProp = tmp === void 0 ? true : tmp, onDragStart = _param.onDragStart, onDragEnd = _param.onDragEnd, onChange = _param.onChange, onPrevClick = _param.onPrevClick, onNextClick = _param.onNextClick, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, showArrows = _param.showArrows, getRef = _param.getRef, _param_arrowSize = _param.arrowSize, arrowSize = _param_arrowSize === void 0 ? "l" : _param_arrowSize, restProps = _object_without_properties(_param, [
        "bullets",
        "getRootRef",
        "children",
        "slideWidth",
        "slideIndex",
        "isDraggable",
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
    var slidesStore = React.useRef({});
    var slidesManager = React.useRef(SLIDES_MANAGER_STATE);
    var rootRef = useExternRef(getRootRef);
    var viewportRef = useExternRef(getRef);
    var layerRef = React.useRef(null);
    var animationFrameRef = React.useRef(null);
    var shiftXCurrentRef = React.useRef(0);
    var shiftXDeltaRef = React.useRef(0);
    var initialized = React.useRef(false);
    var _useSlideAnimation = useSlideAnimation(), addToAnimationQueue = _useSlideAnimation.addToAnimationQueue, getAnimateFunction = _useSlideAnimation.getAnimateFunction, startAnimation = _useSlideAnimation.startAnimation;
    var _React_useState = _sliced_to_array(React.useState(CONTROL_ELEMENTS_STATE), 2), controlElementsState = _React_useState[0], setControlElementsState = _React_useState[1];
    var window = useDOM().window;
    var hasPointer = useAdaptivityHasPointer();
    var isCenterWithCustomWidth = slideWidth === "custom" && align === "center";
    var transformCssStyles = function(shiftX) {
        var animation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        slidesManager.current.loopPoints.forEach(function(loopPoint) {
            var target = loopPoint.target, index = loopPoint.index;
            var slide = slidesStore.current[index];
            if (slide) {
                slide.style.transform = "translate3d(".concat(target(shiftX), "px, 0, 0)");
            }
        });
        if (layerRef.current) {
            layerRef.current.style.transform = "translate3d(".concat(shiftX, "px, 0, 0)");
            layerRef.current.style.transition = animation ? "transform ".concat(ANIMATION_DURATION, "ms cubic-bezier(.1, 0, .25, 1)") : "";
        }
    };
    var requestTransform = function(shiftX) {
        var animation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var _slidesManager_current = slidesManager.current, snaps = _slidesManager_current.snaps, contentSize = _slidesManager_current.contentSize, slides = _slidesManager_current.slides;
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(function() {
            if (shiftX > snaps[0]) {
                shiftXCurrentRef.current = -contentSize + snaps[0];
                shiftX = shiftXCurrentRef.current + shiftXDeltaRef.current;
            }
            var lastPoint = slides[slides.length - 1].width + slides[slides.length - 1].coordX;
            if (shiftX <= -lastPoint) {
                shiftXCurrentRef.current = Math.abs(shiftXDeltaRef.current) + snaps[0];
            }
            transformCssStyles(shiftX, animation);
        });
    };
    var initializeSlides = function() {
        if (!rootRef.current || !viewportRef.current) {
            return;
        }
        var localSlides = React.Children.map(children, function(_item, i) {
            var elem = slidesStore.current[i] || {
                offsetLeft: 0,
                offsetWidth: 0
            };
            return {
                coordX: elem.offsetLeft,
                width: elem.offsetWidth
            };
        }) || [];
        var containerWidth = rootRef.current.offsetWidth;
        var viewportOffsetWidth = viewportRef.current.offsetWidth;
        var layerWidth = localSlides.reduce(function(val, slide) {
            return slide.width + val;
        }, 0);
        if (process.env.NODE_ENV === "development") {
            var remainingWidth = containerWidth;
            var slideIndex1 = 0;
            while(remainingWidth > 0 && slideIndex1 < localSlides.length){
                remainingWidth -= localSlides[slideIndex1].width;
                slideIndex1++;
            }
            if (remainingWidth <= 0 && slideIndex1 === localSlides.length) {
                warn('Ширины слайдов недостаточно для корректной работы свойства "looped". Пожалуйста, сделайте её больше."');
            }
        }
        if (align === "center") {
            var firstSlideShift = (containerWidth - localSlides[0].width) / 2;
            localSlides = localSlides.map(function(item) {
                return {
                    width: item.width,
                    coordX: item.coordX - firstSlideShift
                };
            });
        }
        slidesManager.current = _object_spread_props(_object_spread({}, slidesManager.current), {
            viewportOffsetWidth: viewportOffsetWidth,
            slides: localSlides,
            isFullyVisible: layerWidth <= containerWidth
        });
        var snaps = localSlides.map(function(_, index) {
            return calculateIndent(index, slidesManager.current, isCenterWithCustomWidth);
        });
        var contentSize = -snaps[snaps.length - 1] + localSlides[localSlides.length - 1].width;
        if (align === "center") {
            contentSize += snaps[0];
        }
        slidesManager.current.snaps = snaps;
        slidesManager.current.contentSize = contentSize;
        slidesManager.current.loopPoints = getLoopPoints(slidesManager.current, containerWidth);
        setControlElementsState({
            canSlideLeft: !slidesManager.current.isFullyVisible,
            canSlideRight: !slidesManager.current.isFullyVisible,
            isDraggable: isDraggableProp && !slidesManager.current.isFullyVisible
        });
        shiftXCurrentRef.current = snaps[slideIndex];
        initialized.current = true;
        requestTransform(shiftXCurrentRef.current);
    };
    var onResize = function() {
        if (initialized.current) {
            initializeSlides();
        }
    };
    useGlobalEventListener(window, "resize", onResize);
    useIsomorphicLayoutEffect(function performSlideChange() {
        if (!initialized.current) {
            return;
        }
        var _slidesManager_current = slidesManager.current, snaps = _slidesManager_current.snaps, slides = _slidesManager_current.slides;
        var indent = snaps[slideIndex];
        var startPoint = shiftXCurrentRef.current;
        /**
       * Переключаемся с последнего элемента на первый
       * Для корректной анимации мы прокручиваем последний слайд на всю длину (shiftX) "вперед"
       * В конце анимации при отрисовке следующего кадра задаем всем слайдам начальные значения
       */ if (indent === snaps[0] && shiftXCurrentRef.current <= snaps[snaps.length - 1]) {
            var distance = Math.abs(snaps[snaps.length - 1]) + slides[slides.length - 1].width + startPoint;
            addToAnimationQueue(getAnimateFunction(function(progress) {
                var shiftX = startPoint + progress * distance * -1;
                transformCssStyles(shiftX);
                if (shiftX <= snaps[snaps.length - 1] - slides[slides.length - 1].width) {
                    requestAnimationFrame(function() {
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
            addToAnimationQueue(function() {
                requestAnimationFrame(function() {
                    var shiftX = indent - slides[slides.length - 1].width;
                    transformCssStyles(shiftX);
                    getAnimateFunction(function(progress) {
                        transformCssStyles(startPoint + progress * slides[slides.length - 1].width);
                    })();
                });
            });
        /**
         * Если не обработаны `corner`-кейсы выше, то просто проигрываем анимацию смещения
         */ } else {
            addToAnimationQueue(function() {
                var distance = Math.abs(indent - startPoint);
                var direction = startPoint <= indent ? 1 : -1;
                getAnimateFunction(function(progress) {
                    var shiftX = startPoint + progress * distance * direction;
                    transformCssStyles(shiftX);
                })();
            });
        }
        startAnimation();
        shiftXCurrentRef.current = indent;
    }, [
        slideIndex
    ]);
    useIsomorphicLayoutEffect(function() {
        initializeSlides();
    }, [
        children,
        align,
        slideWidth
    ]);
    var slideLeft = function(event) {
        onChange === null || onChange === void 0 ? void 0 : onChange((slideIndex - 1 + slidesManager.current.slides.length) % slidesManager.current.slides.length);
        onPrevClick === null || onPrevClick === void 0 ? void 0 : onPrevClick(event);
    };
    var slideRight = function(event) {
        onChange === null || onChange === void 0 ? void 0 : onChange((slideIndex + 1) % slidesManager.current.slides.length);
        onNextClick === null || onNextClick === void 0 ? void 0 : onNextClick(event);
    };
    var onStart = function(e) {
        e.originalEvent.stopPropagation();
        onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(e);
        shiftXCurrentRef.current = slidesManager.current.snaps[slideIndex];
        shiftXDeltaRef.current = 0;
    };
    var onMoveX = function(e) {
        if (isDraggableProp && !slidesManager.current.isFullyVisible) {
            e.originalEvent.preventDefault();
            if (e.isSlideX) {
                if (shiftXDeltaRef.current !== e.shiftX) {
                    shiftXDeltaRef.current = e.shiftX;
                    requestTransform(shiftXCurrentRef.current + shiftXDeltaRef.current);
                }
            }
        }
    };
    var onEnd = function(e) {
        var targetIndex = slideIndex;
        if (e.isSlide) {
            targetIndex = getTargetIndex(slidesManager.current.slides, slideIndex, shiftXCurrentRef.current, shiftXDeltaRef.current);
        }
        onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(e, targetIndex);
        if (targetIndex !== slideIndex) {
            shiftXCurrentRef.current = shiftXCurrentRef.current + shiftXDeltaRef.current;
            onChange === null || onChange === void 0 ? void 0 : onChange(targetIndex);
        } else {
            var initialShiftX = slidesManager.current.snaps[targetIndex];
            requestTransform(initialShiftX, true);
        }
    };
    var setSlideRef = function(slideRef, slideIndex) {
        slidesStore.current[slideIndex] = slideRef;
    };
    var canSlideLeft = controlElementsState.canSlideLeft, canSlideRight = controlElementsState.canSlideRight, isDraggable = controlElementsState.isDraggable;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiBaseGallery", slideWidth === "custom" && "vkuiBaseGallery--custom-width", isDraggable && "vkuiBaseGallery--draggable"),
        getRootRef: rootRef
    }), /*#__PURE__*/ React.createElement(Touch, {
        className: "vkuiBaseGallery__viewport",
        onStartX: onStart,
        onMoveX: onMoveX,
        onEnd: onEnd,
        style: {
            width: slideWidth === "custom" ? "100%" : slideWidth
        },
        getRootRef: viewportRef,
        noSlideClick: true
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBaseGallery__layer",
        ref: layerRef
    }, React.Children.map(children, function(item, i) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "vkuiBaseGallery__slide",
            key: "slide-".concat(i),
            ref: function(el) {
                return setSlideRef(el, i);
            }
        }, item);
    }))), bullets && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: classNames("vkuiBaseGallery__bullets", stylesBullets[bullets])
    }, React.Children.map(children, function(_item, index) {
        return /*#__PURE__*/ React.createElement("div", {
            className: classNames("vkuiBaseGallery__bullet", index === slideIndex && "vkuiBaseGallery__bullet--active"),
            key: index
        });
    })), showArrows && hasPointer && canSlideLeft && /*#__PURE__*/ React.createElement(ScrollArrow, {
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