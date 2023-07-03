import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { clamp } from "../../helpers/math";
import { useTimeout } from "../../hooks/useTimeout";
import { BaseGallery } from "../BaseGallery/BaseGallery";
/**
 * @see https://vkcom.github.io/VKUI/#/Gallery
 */ export var Gallery = function(_param) {
    var _param_initialSlideIndex = _param.initialSlideIndex, initialSlideIndex = _param_initialSlideIndex === void 0 ? 0 : _param_initialSlideIndex, children = _param.children, _param_timeout = _param.timeout, timeout = _param_timeout === void 0 ? 0 : _param_timeout, onChange = _param.onChange, bullets = _param.bullets, props = _object_without_properties(_param, [
        "initialSlideIndex",
        "children",
        "timeout",
        "onChange",
        "bullets"
    ]);
    var _React_useState = _sliced_to_array(React.useState(initialSlideIndex), 2), localSlideIndex = _React_useState[0], setSlideIndex = _React_useState[1];
    var isControlled = typeof props.slideIndex === "number";
    var _props_slideIndex;
    var slideIndex = isControlled ? (_props_slideIndex = props.slideIndex) !== null && _props_slideIndex !== void 0 ? _props_slideIndex : 0 : localSlideIndex;
    var isDraggable = !isControlled || Boolean(onChange);
    var slides = React.useMemo(function() {
        return React.Children.toArray(children).filter(function(item) {
            return Boolean(item);
        });
    }, [
        children
    ]);
    var childCount = slides.length;
    var handleChange = React.useCallback(function(current) {
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
    var autoplay = useTimeout(function() {
        return handleChange((slideIndex + 1) % childCount);
    }, timeout);
    React.useEffect(function() {
        return timeout ? autoplay.set() : autoplay.clear();
    }, [
        timeout,
        slideIndex,
        autoplay
    ]);
    // prevent invalid slideIndex
    // any slide index is invalid with no slides, just keep it as is
    var safeSlideIndex = childCount > 0 ? clamp(slideIndex, 0, childCount - 1) : slideIndex;
    // notify parent in controlled mode
    React.useEffect(function() {
        if (onChange && safeSlideIndex !== slideIndex) {
            onChange(safeSlideIndex);
        }
        setSlideIndex(safeSlideIndex);
    }, [
        onChange,
        safeSlideIndex,
        slideIndex
    ]);
    return /*#__PURE__*/ React.createElement(BaseGallery, _object_spread_props(_object_spread({
        isDraggable: isDraggable
    }, props), {
        bullets: childCount > 0 && bullets,
        slideIndex: safeSlideIndex,
        onChange: handleChange
    }), slides);
};

//# sourceMappingURL=Gallery.js.map