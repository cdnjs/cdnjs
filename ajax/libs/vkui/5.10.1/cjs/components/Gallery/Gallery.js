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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _math = require("../../helpers/math");
var _useIsClient = require("../../hooks/useIsClient");
var _BaseGallery = require("../BaseGallery/BaseGallery");
var _CarouselBase = require("../BaseGallery/CarouselBase/CarouselBase");
var _hooks = require("./hooks");
var Gallery = function(_param) {
    var _param_initialSlideIndex = _param.initialSlideIndex, initialSlideIndex = _param_initialSlideIndex === void 0 ? 0 : _param_initialSlideIndex, children = _param.children, _param_timeout = _param.timeout, timeout = _param_timeout === void 0 ? 0 : _param_timeout, onChange = _param.onChange, bullets = _param.bullets, looped = _param.looped, props = _object_without_properties._(_param, [
        "initialSlideIndex",
        "children",
        "timeout",
        "onChange",
        "bullets",
        "looped"
    ]);
    var _React_useState = _sliced_to_array._(_react.useState(initialSlideIndex), 2), localSlideIndex = _React_useState[0], setSlideIndex = _React_useState[1];
    var isControlled = typeof props.slideIndex === "number";
    var _props_slideIndex;
    var slideIndex = isControlled ? (_props_slideIndex = props.slideIndex) !== null && _props_slideIndex !== void 0 ? _props_slideIndex : 0 : localSlideIndex;
    var isDraggable = !isControlled || Boolean(onChange);
    var slides = _react.useMemo(function() {
        return _react.Children.toArray(children).filter(function(item) {
            return Boolean(item);
        });
    }, [
        children
    ]);
    var childCount = slides.length;
    var isClient = (0, _useIsClient.useIsClient)();
    var handleChange = _react.useCallback(function(current) {
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
    (0, _hooks.useAutoPlay)(timeout, slideIndex, function() {
        return handleChange((slideIndex + 1) % childCount);
    });
    // prevent invalid slideIndex
    // any slide index is invalid with no slides, just keep it as is
    var safeSlideIndex = childCount > 0 ? (0, _math.clamp)(slideIndex, 0, childCount - 1) : slideIndex;
    // notify parent in controlled mode
    _react.useEffect(function() {
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
    var Component = looped ? _CarouselBase.CarouselBase : _BaseGallery.BaseGallery;
    return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({
        isDraggable: isDraggable
    }, props), {
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange
    }), slides);
};

//# sourceMappingURL=Gallery.js.map