"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CardScroll", {
    enumerable: true,
    get: function() {
        return CardScroll;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("../../lib/dom");
const _HorizontalScroll = require("../HorizontalScroll/HorizontalScroll");
const _RootComponent = require("../RootComponent/RootComponent");
const stylesSize = {
    s: 'vkuiInternalCardScroll--size-s',
    m: 'vkuiInternalCardScroll--size-m',
    l: 'vkuiInternalCardScroll--size-l'
};
const CardScroll = (_param)=>{
    var { children, size = 's', showArrows = true, noSpaces = false } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "size",
        "showArrows",
        "noSpaces"
    ]);
    const refContainer = _react.useRef(null);
    const gapRef = _react.useRef(null);
    const { window } = (0, _dom.useDOM)();
    function getScrollToLeft(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slideIndex = [
            ...refContainer.current.children
        ].findIndex((el)=>el.offsetLeft + el.offsetWidth + parseInt(window.getComputedStyle(el).marginRight) - offset >= 0);
        if (slideIndex === -1) {
            return offset;
        }
        if (slideIndex === 0) {
            return 0;
        }
        const slide = refContainer.current.children[slideIndex];
        const scrollTo = slide.offsetLeft - (containerWidth - slide.offsetWidth) + gapRef.current.offsetWidth;
        if (scrollTo <= 2 * gapRef.current.offsetWidth) {
            return 0;
        }
        return scrollTo;
    }
    function getScrollToRight(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slide = Array.prototype.find.call(refContainer.current.children, (el)=>el.offsetLeft + el.offsetWidth - offset > containerWidth);
        if (!slide) {
            return offset;
        }
        return slide.offsetLeft - gapRef.current.offsetWidth;
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiCardScroll", 'vkuiInternalCardScroll', size !== false && stylesSize[size], !noSpaces && "vkuiCardScroll--withSpaces")
    }), /*#__PURE__*/ _react.createElement(_HorizontalScroll.HorizontalScroll, {
        getScrollToLeft: getScrollToLeft,
        getScrollToRight: getScrollToRight,
        showArrows: showArrows
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCardScroll__in",
        ref: refContainer
    }, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiCardScroll__gap",
        ref: gapRef
    }), children, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiCardScroll__gap"
    }))));
};

//# sourceMappingURL=CardScroll.js.map