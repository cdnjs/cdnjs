"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Gallery", {
    enumerable: true,
    get: function() {
        return Gallery;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _math = require("../../helpers/math");
const _useIsClient = require("../../hooks/useIsClient");
const _callMultiple = require("../../lib/callMultiple");
const _BaseGallery = require("../BaseGallery/BaseGallery");
const _CarouselBase = require("../BaseGallery/CarouselBase/CarouselBase");
const _hooks = require("./hooks");
const Gallery = (_param)=>{
    var { initialSlideIndex = 0, children, timeout = 0, onChange, bullets, looped, onDragStart, onDragEnd } = _param, props = _object_without_properties._(_param, [
        "initialSlideIndex",
        "children",
        "timeout",
        "onChange",
        "bullets",
        "looped",
        "onDragStart",
        "onDragEnd"
    ]);
    const [localSlideIndex, setSlideIndex] = _react.useState(initialSlideIndex);
    const isControlled = typeof props.slideIndex === 'number';
    var _props_slideIndex;
    const slideIndex = isControlled ? (_props_slideIndex = props.slideIndex) !== null && _props_slideIndex !== void 0 ? _props_slideIndex : 0 : localSlideIndex;
    const slides = _react.useMemo(()=>_react.Children.toArray(children).filter((item)=>Boolean(item)), [
        children
    ]);
    const childCount = slides.length;
    const isClient = (0, _useIsClient.useIsClient)();
    const handleChange = _react.useCallback((current)=>{
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
    const autoPlayControls = (0, _hooks.useAutoPlay)({
        timeout,
        slideIndex,
        onNext: ()=>handleChange((slideIndex + 1) % childCount)
    });
    // prevent invalid slideIndex
    // any slide index is invalid with no slides, just keep it as is
    const safeSlideIndex = childCount > 0 ? (0, _math.clamp)(slideIndex, 0, childCount - 1) : slideIndex;
    // notify parent in controlled mode
    _react.useEffect(()=>{
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
    const Component = looped ? _CarouselBase.CarouselBase : _BaseGallery.BaseGallery;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, _object_spread_props._(_object_spread._({
        dragDisabled: isControlled && !onChange
    }, props), {
        onDragStart: (0, _callMultiple.callMultiple)(onDragStart, autoPlayControls.pause),
        onDragEnd: (0, _callMultiple.callMultiple)(onDragEnd, autoPlayControls.resume),
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange,
        children: slides
    }));
};

//# sourceMappingURL=Gallery.js.map