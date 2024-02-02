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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("../../lib/dom");
var _HorizontalScroll = require("../HorizontalScroll/HorizontalScroll");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesSize = {
    s: "vkuiInternalCardScroll--size-s",
    m: "vkuiInternalCardScroll--size-m",
    l: "vkuiInternalCardScroll--size-l"
};
var CardScroll = function(_param) {
    var getScrollToLeft = function getScrollToLeft(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        var containerWidth = refContainer.current.offsetWidth;
        var slideIndex = _to_consumable_array._(refContainer.current.children).findIndex(function(el) {
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
    var children = _param.children, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_withSpaces = _param.withSpaces, withSpaces = _param_withSpaces === void 0 ? true : _param_withSpaces, restProps = _object_without_properties._(_param, [
        "children",
        "size",
        "showArrows",
        "withSpaces"
    ]);
    var refContainer = _react.useRef(null);
    var gapRef = _react.useRef(null);
    var window = (0, _dom.useDOM)().window;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiCardScroll", "vkuiInternalCardScroll", size !== false && stylesSize[size], withSpaces && "vkuiCardScroll--withSpaces")
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