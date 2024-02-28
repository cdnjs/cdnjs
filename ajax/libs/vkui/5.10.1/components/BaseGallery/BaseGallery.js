import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer";
import { useExternRef } from "../../hooks/useExternRef";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { useDOM } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { RootComponent } from "../RootComponent/RootComponent";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow";
import { Touch } from "../Touch/Touch";
import { calcMax, calcMin } from "./helpers";
var ANIMATION_DURATION = 0.24;
var LAYOUT_DEFAULT_STATE = {
    containerWidth: 0,
    viewportOffsetWidth: 0,
    layerWidth: 0,
    min: 0,
    max: 0,
    slides: [],
    isFullyVisible: true
};
var SHIFT_DEFAULT_STATE = {
    animation: undefined,
    shiftX: 0,
    dragging: false,
    deltaX: 0,
    indent: 0
};
var stylesBullets = {
    dark: "vkuiBaseGallery__bullets--dark",
    light: "vkuiBaseGallery__bullets--light"
};
export var BaseGallery = function(_param) {
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
    var layoutState = React.useRef(LAYOUT_DEFAULT_STATE);
    var _React_useState = _sliced_to_array(React.useState(SHIFT_DEFAULT_STATE), 2), shiftState = _React_useState[0], setShiftState = _React_useState[1];
    var rootRef = useExternRef(getRootRef);
    var viewportRef = useExternRef(getRef);
    var window = useDOM().window;
    var hasPointer = useAdaptivityHasPointer();
    var isCenterWithCustomWidth = slideWidth === "custom" && align === "center";
    var validateIndent = function(value) {
        var _layoutState_current_max;
        var localMax = (_layoutState_current_max = layoutState.current.max) !== null && _layoutState_current_max !== void 0 ? _layoutState_current_max : 0;
        var _layoutState_current_min;
        var localMin = (_layoutState_current_min = layoutState.current.min) !== null && _layoutState_current_min !== void 0 ? _layoutState_current_min : 0;
        if (value < localMin) {
            return localMin;
        } else if (value > localMax) {
            return localMax;
        }
        return value;
    };
    /*
   * Считает отступ слоя галереи
   */ var calculateIndent = function(targetIndex) {
        var _layoutState_current_slides;
        if (layoutState.current.isFullyVisible) {
            return 0;
        }
        var targetSlide = ((_layoutState_current_slides = layoutState.current.slides) === null || _layoutState_current_slides === void 0 ? void 0 : _layoutState_current_slides.length) ? layoutState.current.slides[targetIndex] : null;
        if (targetSlide) {
            var coordX = targetSlide.coordX, width = targetSlide.width;
            if (isCenterWithCustomWidth) {
                var _layoutState_current_viewportOffsetWidth;
                var viewportWidth = (_layoutState_current_viewportOffsetWidth = layoutState.current.viewportOffsetWidth) !== null && _layoutState_current_viewportOffsetWidth !== void 0 ? _layoutState_current_viewportOffsetWidth : 0;
                return viewportWidth / 2 - coordX - width / 2;
            }
            return validateIndent(-1 * coordX);
        }
        return 0;
    };
    /*
   * Считает отступ слоя галереи во время драга
   */ var calculateDragIndent = function() {
        var _layoutState_current_max;
        var localMax = (_layoutState_current_max = layoutState.current.max) !== null && _layoutState_current_max !== void 0 ? _layoutState_current_max : 0;
        var _layoutState_current_min;
        var localMin = (_layoutState_current_min = layoutState.current.min) !== null && _layoutState_current_min !== void 0 ? _layoutState_current_min : 0;
        var indent = shiftState.shiftX + shiftState.deltaX;
        if (indent > localMax) {
            return localMax + Number((indent - localMax) / 3);
        } else if (indent < localMin) {
            return localMin + Number((indent - localMin) / 3);
        }
        return indent;
    };
    var initializeSlides = function() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _rootRef_current, _viewportRef_current, _layoutState_current_slides_slideIndex, _localSlides_slideIndex;
        var _React_Children_map;
        var localSlides = (_React_Children_map = React.Children.map(children, function(_item, i) {
            var elem = slidesStore.current["slide-".concat(i)];
            var _elem_offsetLeft, _elem_offsetWidth;
            return {
                coordX: (_elem_offsetLeft = elem === null || elem === void 0 ? void 0 : elem.offsetLeft) !== null && _elem_offsetLeft !== void 0 ? _elem_offsetLeft : 0,
                width: (_elem_offsetWidth = elem === null || elem === void 0 ? void 0 : elem.offsetWidth) !== null && _elem_offsetWidth !== void 0 ? _elem_offsetWidth : 0
            };
        })) !== null && _React_Children_map !== void 0 ? _React_Children_map : [];
        var _rootRef_current_offsetWidth;
        var localContainerWidth = (_rootRef_current_offsetWidth = (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.offsetWidth) !== null && _rootRef_current_offsetWidth !== void 0 ? _rootRef_current_offsetWidth : 0;
        var _viewportRef_current_offsetWidth;
        var localViewportOffsetWidth = (_viewportRef_current_offsetWidth = (_viewportRef_current = viewportRef.current) === null || _viewportRef_current === void 0 ? void 0 : _viewportRef_current.offsetWidth) !== null && _viewportRef_current_offsetWidth !== void 0 ? _viewportRef_current_offsetWidth : 0;
        var localLayerWidth = localSlides.reduce(function(val, slide) {
            return slide.width + val;
        }, 0);
        var adjustShiftX = localSlides.length <= layoutState.current.slides.length || ((_layoutState_current_slides_slideIndex = layoutState.current.slides[slideIndex]) === null || _layoutState_current_slides_slideIndex === void 0 ? void 0 : _layoutState_current_slides_slideIndex.coordX) !== ((_localSlides_slideIndex = localSlides[slideIndex]) === null || _localSlides_slideIndex === void 0 ? void 0 : _localSlides_slideIndex.coordX);
        layoutState.current = {
            containerWidth: localContainerWidth,
            viewportOffsetWidth: localViewportOffsetWidth,
            layerWidth: localLayerWidth,
            max: calcMax({
                slides: localSlides,
                viewportOffsetWidth: localViewportOffsetWidth,
                isCenterWithCustomWidth: isCenterWithCustomWidth
            }),
            min: calcMin({
                containerWidth: localContainerWidth,
                layerWidth: localLayerWidth,
                slides: localSlides,
                viewportOffsetWidth: localViewportOffsetWidth,
                isCenterWithCustomWidth: isCenterWithCustomWidth,
                align: align
            }),
            slides: localSlides,
            isFullyVisible: localLayerWidth <= localContainerWidth
        };
        setShiftState(function(prevState) {
            var _options_animation;
            return _object_spread_props(_object_spread({}, prevState), {
                shiftX: adjustShiftX ? calculateIndent(slideIndex) : prevState.shiftX,
                animation: (_options_animation = options.animation) !== null && _options_animation !== void 0 ? _options_animation : prevState.shiftX === validateIndent(prevState.shiftX)
            });
        });
    };
    var onResize = function() {
        if (shiftState.animation !== undefined) {
            initializeSlides({
                animation: false
            });
        }
    };
    useGlobalEventListener(window, "resize", onResize);
    useIsomorphicLayoutEffect(function() {
        initializeSlides({
            animation: false
        });
    }, [
        children,
        align,
        slideWidth
    ]);
    useIsomorphicLayoutEffect(function() {
        if (shiftState.animation !== undefined) {
            setShiftState(function(prevState) {
                return _object_spread_props(_object_spread({}, prevState), {
                    animation: true,
                    deltaX: 0,
                    shiftX: calculateIndent(slideIndex !== null && slideIndex !== void 0 ? slideIndex : 0)
                });
            });
        }
    }, [
        slideIndex
    ]);
    var slideLeft = function(event) {
        onChange === null || onChange === void 0 ? void 0 : onChange(slideIndex - 1);
        onPrevClick === null || onPrevClick === void 0 ? void 0 : onPrevClick(event);
    };
    var slideRight = function(event) {
        onChange === null || onChange === void 0 ? void 0 : onChange(slideIndex + 1);
        onNextClick === null || onNextClick === void 0 ? void 0 : onNextClick(event);
    };
    /*
   * Получает индекс слайда, к которому будет осуществлен переход
   */ var getTarget = function(e) {
        var expectDeltaX = shiftState.deltaX / e.duration * 240 * 0.6;
        var _layoutState_current_max;
        var shift = shiftState.shiftX + shiftState.deltaX + expectDeltaX - ((_layoutState_current_max = layoutState.current.max) !== null && _layoutState_current_max !== void 0 ? _layoutState_current_max : 0);
        var direction = shiftState.deltaX < 0 ? 1 : -1;
        // Находим ближайшую границу слайда к текущему отступу
        var targetIndex = layoutState.current.slides.reduce(function(val, item, index) {
            var previousValue = Math.abs(layoutState.current.slides[val].coordX + shift);
            var currentValue = Math.abs(item.coordX + shift);
            return previousValue < currentValue ? val : index;
        }, slideIndex);
        if (targetIndex === slideIndex) {
            var targetSlide = slideIndex + direction;
            if (targetSlide >= 0 && targetSlide < layoutState.current.slides.length) {
                if (Math.abs(shiftState.deltaX) > layoutState.current.slides[targetSlide].width * 0.05) {
                    targetIndex = targetSlide;
                }
            }
        }
        return targetIndex;
    };
    var onStart = function(e) {
        e.originalEvent.stopPropagation();
        onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(e);
        setShiftState(function(prevState) {
            return _object_spread_props(_object_spread({}, prevState), {
                animation: false
            });
        });
    };
    var onMoveX = function(e) {
        if (isDraggableProp && !layoutState.current.isFullyVisible) {
            e.originalEvent.preventDefault();
            if (e.isSlideX) {
                if (shiftState.deltaX !== e.shiftX) {
                    setShiftState(function(prevState) {
                        return _object_spread_props(_object_spread({}, prevState), {
                            deltaX: e.shiftX,
                            dragging: e.isSlideX
                        });
                    });
                }
            }
        }
    };
    var onEnd = function(e) {
        var targetIndex = e.isSlide ? getTarget(e) : slideIndex !== null && slideIndex !== void 0 ? slideIndex : 0;
        onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(e, targetIndex);
        var nextShiftState = {
            animation: true,
            dragging: false,
            deltaX: 0
        };
        var shiftXStick = calculateDragIndent();
        if (targetIndex !== slideIndex) {
            // Сохраняем сдвиг слайда в том положении, в каком его оставили после драга (fix issue #2185)
            nextShiftState.shiftX = shiftXStick;
        }
        setShiftState(function(prevState) {
            return _object_spread({}, prevState, nextShiftState);
        });
        if (targetIndex !== slideIndex) {
            onChange === null || onChange === void 0 ? void 0 : onChange(targetIndex);
        }
    };
    var indent = shiftState.dragging ? calculateDragIndent() : shiftState.shiftX;
    var layerStyle = {
        WebkitTransform: "translateX(".concat(indent, "px)"),
        transform: "translateX(".concat(indent, "px)"),
        WebkitTransition: shiftState.animation ? "-webkit-transform ".concat(ANIMATION_DURATION, "s cubic-bezier(.1, 0, .25, 1)") : "none",
        transition: shiftState.animation ? "transform ".concat(ANIMATION_DURATION, "s cubic-bezier(.1, 0, .25, 1)") : "none"
    };
    var setSlideRef = function(slideRef, slideIndex) {
        slidesStore.current["slide-".concat(slideIndex)] = slideRef;
    };
    // shiftX is negative number <= 0, we can swipe back only if it is < 0
    var canSlideLeft = !layoutState.current.isFullyVisible && shiftState.shiftX < 0;
    var _layoutState_current_layerWidth;
    var canSlideRight = !layoutState.current.isFullyVisible && // we can't move right when gallery layer fully scrolled right, if gallery aligned by left side
    (align === "left" && layoutState.current.containerWidth - shiftState.shiftX < ((_layoutState_current_layerWidth = layoutState.current.layerWidth) !== null && _layoutState_current_layerWidth !== void 0 ? _layoutState_current_layerWidth : 0) || // otherwise we need to check current slide index (align = right or align = center)
    align !== "left" && slideIndex < layoutState.current.slides.length - 1);
    var isDraggable = isDraggableProp && !layoutState.current.isFullyVisible;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiBaseGallery", align === "center" && "vkuiBaseGallery--align-center", slideWidth === "custom" && "vkuiBaseGallery--custom-width", isDraggable && "vkuiBaseGallery--draggable"),
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
        style: layerStyle
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

//# sourceMappingURL=BaseGallery.js.map