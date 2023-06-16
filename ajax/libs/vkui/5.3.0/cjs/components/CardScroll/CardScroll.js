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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _toConsumableArray = require("@swc/helpers/lib/_to_consumable_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("../../lib/dom");
var _horizontalScroll = require("../HorizontalScroll/HorizontalScroll");
var CardScroll = function(_param) {
    var getScrollToLeft = function getScrollToLeft(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        var containerWidth = refContainer.current.offsetWidth;
        var slideIndex = _toConsumableArray(refContainer.current.children).findIndex(function(el) {
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
    var children = _param.children, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_withSpaces = _param.withSpaces, withSpaces = _param_withSpaces === void 0 ? true : _param_withSpaces, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "size",
        "showArrows",
        "withSpaces",
        "className"
    ]);
    var refContainer = _react.useRef(null);
    var gapRef = _react.useRef(null);
    var window = (0, _dom.useDOM)().window;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiCardScroll", "vkuiInternalCardScroll", size !== false && ({
            s: "vkuiInternalCardScroll--size-s",
            m: "vkuiInternalCardScroll--size-m",
            l: "vkuiInternalCardScroll--size-l"
        })[size], withSpaces && "vkuiCardScroll--withSpaces", className)
    }), /*#__PURE__*/ _react.createElement(_horizontalScroll.HorizontalScroll, {
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