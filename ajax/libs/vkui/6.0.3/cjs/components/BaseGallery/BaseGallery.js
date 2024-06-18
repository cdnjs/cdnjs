"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BaseGallery", {
    enumerable: true,
    get: function() {
        return BaseGallery;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _RootComponent = require("../RootComponent/RootComponent");
const _ScrollArrow = require("../ScrollArrow/ScrollArrow");
const _Touch = require("../Touch/Touch");
const _helpers = require("./helpers");
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
    dark: "vkuiBaseGallery__bullets--dark",
    light: "vkuiBaseGallery__bullets--light"
};
const BaseGallery = (_param)=>{
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
    const layoutState = _react.useRef(LAYOUT_DEFAULT_STATE);
    const [shiftState, setShiftState] = _react.useState(SHIFT_DEFAULT_STATE);
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const viewportRef = (0, _useExternRef.useExternRef)(getRef);
    const { window } = (0, _dom.useDOM)();
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const isCenterWithCustomWidth = slideWidth === 'custom' && align === 'center';
    const validateIndent = (value)=>{
        var _layoutState_current_max;
        const localMax = (_layoutState_current_max = layoutState.current.max) !== null && _layoutState_current_max !== void 0 ? _layoutState_current_max : 0;
        var _layoutState_current_min;
        const localMin = (_layoutState_current_min = layoutState.current.min) !== null && _layoutState_current_min !== void 0 ? _layoutState_current_min : 0;
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
        var _layoutState_current_slides;
        if (layoutState.current.isFullyVisible) {
            return 0;
        }
        const targetSlide = ((_layoutState_current_slides = layoutState.current.slides) === null || _layoutState_current_slides === void 0 ? void 0 : _layoutState_current_slides.length) ? layoutState.current.slides[targetIndex] : null;
        if (targetSlide) {
            const { coordX, width } = targetSlide;
            if (isCenterWithCustomWidth) {
                var _layoutState_current_viewportOffsetWidth;
                const viewportWidth = (_layoutState_current_viewportOffsetWidth = layoutState.current.viewportOffsetWidth) !== null && _layoutState_current_viewportOffsetWidth !== void 0 ? _layoutState_current_viewportOffsetWidth : 0;
                return viewportWidth / 2 - coordX - width / 2;
            }
            return validateIndent(-1 * coordX);
        }
        return 0;
    };
    /*
   * Считает отступ слоя галереи во время драга
   */ const calculateDragIndent = ()=>{
        var _layoutState_current_max;
        const localMax = (_layoutState_current_max = layoutState.current.max) !== null && _layoutState_current_max !== void 0 ? _layoutState_current_max : 0;
        var _layoutState_current_min;
        const localMin = (_layoutState_current_min = layoutState.current.min) !== null && _layoutState_current_min !== void 0 ? _layoutState_current_min : 0;
        const indent = shiftState.shiftX + shiftState.deltaX;
        if (indent > localMax) {
            return localMax + Number((indent - localMax) / 3);
        } else if (indent < localMin) {
            return localMin + Number((indent - localMin) / 3);
        }
        return indent;
    };
    const initializeSlides = (options = {})=>{
        var _rootRef_current, _viewportRef_current, _layoutState_current_slides_slideIndex, _localSlides_slideIndex;
        var _React_Children_map;
        const localSlides = (_React_Children_map = _react.Children.map(children, (_item, i)=>{
            const elem = slidesStore.current[`slide-${i}`];
            var _elem_offsetLeft, _elem_offsetWidth;
            return {
                coordX: (_elem_offsetLeft = elem === null || elem === void 0 ? void 0 : elem.offsetLeft) !== null && _elem_offsetLeft !== void 0 ? _elem_offsetLeft : 0,
                width: (_elem_offsetWidth = elem === null || elem === void 0 ? void 0 : elem.offsetWidth) !== null && _elem_offsetWidth !== void 0 ? _elem_offsetWidth : 0
            };
        })) !== null && _React_Children_map !== void 0 ? _React_Children_map : [];
        var _rootRef_current_offsetWidth;
        const localContainerWidth = (_rootRef_current_offsetWidth = (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.offsetWidth) !== null && _rootRef_current_offsetWidth !== void 0 ? _rootRef_current_offsetWidth : 0;
        var _viewportRef_current_offsetWidth;
        const localViewportOffsetWidth = (_viewportRef_current_offsetWidth = (_viewportRef_current = viewportRef.current) === null || _viewportRef_current === void 0 ? void 0 : _viewportRef_current.offsetWidth) !== null && _viewportRef_current_offsetWidth !== void 0 ? _viewportRef_current_offsetWidth : 0;
        const localLayerWidth = localSlides.reduce((val, slide)=>slide.width + val, 0);
        const adjustShiftX = localSlides.length <= layoutState.current.slides.length || ((_layoutState_current_slides_slideIndex = layoutState.current.slides[slideIndex]) === null || _layoutState_current_slides_slideIndex === void 0 ? void 0 : _layoutState_current_slides_slideIndex.coordX) !== ((_localSlides_slideIndex = localSlides[slideIndex]) === null || _localSlides_slideIndex === void 0 ? void 0 : _localSlides_slideIndex.coordX);
        layoutState.current = {
            containerWidth: localContainerWidth,
            viewportOffsetWidth: localViewportOffsetWidth,
            layerWidth: localLayerWidth,
            max: (0, _helpers.calcMax)({
                slides: localSlides,
                viewportOffsetWidth: localViewportOffsetWidth,
                isCenterWithCustomWidth
            }),
            min: (0, _helpers.calcMin)({
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
        setShiftState((prevState)=>{
            var _options_animation;
            return _object_spread_props._(_object_spread._({}, prevState), {
                shiftX: adjustShiftX ? calculateIndent(slideIndex) : prevState.shiftX,
                animation: (_options_animation = options.animation) !== null && _options_animation !== void 0 ? _options_animation : prevState.shiftX === validateIndent(prevState.shiftX)
            });
        });
    };
    const onResize = ()=>{
        if (shiftState.animation !== undefined) {
            initializeSlides({
                animation: false
            });
        }
    };
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'resize', onResize);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        initializeSlides({
            animation: false
        });
    }, [
        children,
        align,
        slideWidth
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (shiftState.animation !== undefined) {
            setShiftState((prevState)=>_object_spread_props._(_object_spread._({}, prevState), {
                    animation: true,
                    deltaX: 0,
                    shiftX: calculateIndent(slideIndex !== null && slideIndex !== void 0 ? slideIndex : 0)
                }));
        }
    }, [
        slideIndex
    ]);
    const slideLeft = (event)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange(slideIndex - 1);
        onPrevClick === null || onPrevClick === void 0 ? void 0 : onPrevClick(event);
    };
    const slideRight = (event)=>{
        onChange === null || onChange === void 0 ? void 0 : onChange(slideIndex + 1);
        onNextClick === null || onNextClick === void 0 ? void 0 : onNextClick(event);
    };
    /*
   * Получает индекс слайда, к которому будет осуществлен переход
   */ const getTarget = (e)=>{
        const expectDeltaX = shiftState.deltaX / e.duration * 240 * 0.6;
        var _layoutState_current_max;
        const shift = shiftState.shiftX + shiftState.deltaX + expectDeltaX - ((_layoutState_current_max = layoutState.current.max) !== null && _layoutState_current_max !== void 0 ? _layoutState_current_max : 0);
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
            onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(e);
            setShiftState((prevState)=>_object_spread_props._(_object_spread._({}, prevState), {
                    animation: false
                }));
        }
    };
    const onMoveX = (e)=>{
        if (isDraggable) {
            e.originalEvent.preventDefault();
            if (e.isSlideX) {
                if (shiftState.deltaX !== e.shiftX) {
                    setShiftState((prevState)=>_object_spread_props._(_object_spread._({}, prevState), {
                            deltaX: e.shiftX,
                            dragging: e.isSlideX
                        }));
                }
            }
        }
    };
    const onEnd = (e)=>{
        if (isDraggable) {
            const targetIndex = e.isSlide ? getTarget(e) : slideIndex !== null && slideIndex !== void 0 ? slideIndex : 0;
            onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(e, targetIndex);
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
            setShiftState((prevState)=>_object_spread._({}, prevState, nextShiftState));
            if (targetIndex !== slideIndex) {
                onChange === null || onChange === void 0 ? void 0 : onChange(targetIndex);
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
    var _layoutState_current_layerWidth;
    const canSlideRight = !layoutState.current.isFullyVisible && // we can't move right when gallery layer fully scrolled right, if gallery aligned by left side
    (align === 'left' && layoutState.current.containerWidth - shiftState.shiftX < ((_layoutState_current_layerWidth = layoutState.current.layerWidth) !== null && _layoutState_current_layerWidth !== void 0 ? _layoutState_current_layerWidth : 0) || // otherwise we need to check current slide index (align = right or align = center)
    align !== 'left' && slideIndex < layoutState.current.slides.length - 1);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiBaseGallery", align === 'center' && "vkuiBaseGallery--align-center", slideWidth === 'custom' && "vkuiBaseGallery--custom-width", isDraggable && "vkuiBaseGallery--draggable"),
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
        style: layerStyle
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

//# sourceMappingURL=BaseGallery.js.map