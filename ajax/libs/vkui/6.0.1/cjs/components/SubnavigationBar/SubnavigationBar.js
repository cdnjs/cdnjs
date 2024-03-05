"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubnavigationBar", {
    enumerable: true,
    get: function() {
        return SubnavigationBar;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _HorizontalScroll = require("../HorizontalScroll/HorizontalScroll");
const _RootComponent = require("../RootComponent/RootComponent");
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
const SubnavigationBar = (_param)=>{
    var { mode = 'overflow', children, showArrows = true, getScrollToLeft = defaultScrollToLeft, getScrollToRight = defaultScrollToRight, scrollAnimationDuration } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "children",
        "showArrows",
        "getScrollToLeft",
        "getScrollToRight",
        "scrollAnimationDuration"
    ]);
    let ScrollWrapper;
    let scrollWrapperProps = {};
    if (mode === 'fixed') {
        ScrollWrapper = 'div';
    } else {
        ScrollWrapper = _HorizontalScroll.HorizontalScroll;
        scrollWrapperProps = {
            showArrows,
            getScrollToLeft,
            getScrollToRight,
            scrollAnimationDuration
        };
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: mode === 'fixed' && "vkuiSubnavigationBar--mode-fixed"
    }, restProps), /*#__PURE__*/ _react.createElement(ScrollWrapper, _object_spread._({
        className: "vkuiSubnavigationBar__in"
    }, scrollWrapperProps), /*#__PURE__*/ _react.createElement("ul", {
        className: "vkuiSubnavigationBar__scrollIn"
    }, _react.Children.map(children, (child, idx)=>(0, _vkjs.hasReactNode)(child) ? /*#__PURE__*/ _react.createElement("li", {
            key: idx,
            className: "vkuiSubnavigationBar__item"
        }, child) : null))));
};

//# sourceMappingURL=SubnavigationBar.js.map