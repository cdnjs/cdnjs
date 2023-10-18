import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useDOM } from "../../lib/dom";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesSize = {
    s: "vkuiInternalCardScroll--size-s",
    m: "vkuiInternalCardScroll--size-m",
    l: "vkuiInternalCardScroll--size-l"
};
/**
 * @see https://vkcom.github.io/VKUI/#/CardScroll
 */ export var CardScroll = function(_param) {
    var getScrollToLeft = function getScrollToLeft(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        var containerWidth = refContainer.current.offsetWidth;
        var slideIndex = _to_consumable_array(refContainer.current.children).findIndex(function(el) {
            return el.offsetLeft + el.offsetWidth + parseInt(window.getComputedStyle(el).marginRight) - offset >= 0;
        });
        if (slideIndex === -1) {
            return offset;
        }
        if (slideIndex === 0) {
            return 0;
        }
        var slide = refContainer.current.children[slideIndex];
        var scrollTo = slide.offsetLeft - (containerWidth - slide.offsetWidth) + gapRef.current.offsetWidth;
        if (scrollTo <= 2 * gapRef.current.offsetWidth) {
            return 0;
        }
        return scrollTo;
    };
    var getScrollToRight = function getScrollToRight(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        var containerWidth = refContainer.current.offsetWidth;
        var slide = Array.prototype.find.call(refContainer.current.children, function(el) {
            return el.offsetLeft + el.offsetWidth - offset > containerWidth;
        });
        if (!slide) {
            return offset;
        }
        return slide.offsetLeft - gapRef.current.offsetWidth;
    };
    var children = _param.children, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_withSpaces = _param.withSpaces, withSpaces = _param_withSpaces === void 0 ? true : _param_withSpaces, restProps = _object_without_properties(_param, [
        "children",
        "size",
        "showArrows",
        "withSpaces"
    ]);
    var refContainer = React.useRef(null);
    var gapRef = React.useRef(null);
    var window = useDOM().window;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiCardScroll", "vkuiInternalCardScroll", size !== false && stylesSize[size], withSpaces && "vkuiCardScroll--withSpaces")
    }), /*#__PURE__*/ React.createElement(HorizontalScroll, {
        getScrollToLeft: getScrollToLeft,
        getScrollToRight: getScrollToRight,
        showArrows: showArrows
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCardScroll__in",
        ref: refContainer
    }, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiCardScroll__gap",
        ref: gapRef
    }), children, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiCardScroll__gap"
    }))));
};

//# sourceMappingURL=CardScroll.js.map