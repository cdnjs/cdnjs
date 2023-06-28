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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _useTimeout = require("../../hooks/useTimeout");
var _baseGallery = require("../BaseGallery/BaseGallery");
var Gallery = function(_param) {
    var _param_initialSlideIndex = _param.initialSlideIndex, initialSlideIndex = _param_initialSlideIndex === void 0 ? 0 : _param_initialSlideIndex, children = _param.children, _param_timeout = _param.timeout, timeout = _param_timeout === void 0 ? 0 : _param_timeout, onChange = _param.onChange, bullets = _param.bullets, props = _objectWithoutProperties(_param, [
        "initialSlideIndex",
        "children",
        "timeout",
        "onChange",
        "bullets"
    ]);
    var _React_useState = _slicedToArray(_react.useState(initialSlideIndex), 2), localSlideIndex = _React_useState[0], setSlideIndex = _React_useState[1];
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
    var autoplay = (0, _useTimeout.useTimeout)(function() {
        return handleChange((slideIndex + 1) % childCount);
    }, timeout);
    _react.useEffect(function() {
        return timeout ? autoplay.set() : autoplay.clear();
    }, [
        timeout,
        slideIndex,
        autoplay
    ]);
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
    return /*#__PURE__*/ _react.createElement(_baseGallery.BaseGallery, _objectSpreadProps(_objectSpread({
        isDraggable: isDraggable
    }, props), {
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange
    }), slides);
};

//# sourceMappingURL=Gallery.js.map