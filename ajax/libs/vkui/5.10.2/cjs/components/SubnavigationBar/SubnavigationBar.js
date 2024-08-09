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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _HorizontalScroll = require("../HorizontalScroll/HorizontalScroll");
var _RootComponent = require("../RootComponent/RootComponent");
var defaultScrollToLeft = function(x) {
    return x - 240;
};
var defaultScrollToRight = function(x) {
    return x + 240;
};
var SubnavigationBar = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "overflow" : _param_mode, children = _param.children, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_getScrollToLeft = _param.getScrollToLeft, getScrollToLeft = _param_getScrollToLeft === void 0 ? defaultScrollToLeft : _param_getScrollToLeft, _param_getScrollToRight = _param.getScrollToRight, getScrollToRight = _param_getScrollToRight === void 0 ? defaultScrollToRight : _param_getScrollToRight, scrollAnimationDuration = _param.scrollAnimationDuration, restProps = _object_without_properties._(_param, [
        "mode",
        "children",
        "showArrows",
        "getScrollToLeft",
        "getScrollToRight",
        "scrollAnimationDuration"
    ]);
    var ScrollWrapper;
    var scrollWrapperProps = {};
    if (mode === "fixed") {
        ScrollWrapper = "div";
    } else {
        ScrollWrapper = _HorizontalScroll.HorizontalScroll;
        scrollWrapperProps = {
            showArrows: showArrows,
            getScrollToLeft: getScrollToLeft,
            getScrollToRight: getScrollToRight,
            scrollAnimationDuration: scrollAnimationDuration
        };
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        // TODO: [>=6]
        // Заменить у SubnavigationButton `display: inline-block` на `width: 100%`
        // и удалить применение селектора в `SubnavigationButton.module.css`.
        // 2. Заменить глобальный селектор на CSS Modules `styles['SubnavigationBar--mode-fixed']`
        // mode !== 'fixed' && classNames('vkuiInternalSubnavigationBar--mode-fixed')
        baseClassName: mode === "fixed" ? "vkuiInternalSubnavigationBar--mode-fixed" : undefined
    }, restProps), /*#__PURE__*/ _react.createElement(ScrollWrapper, _object_spread._({
        className: "vkuiSubnavigationBar__in"
    }, scrollWrapperProps), /*#__PURE__*/ _react.createElement("ul", {
        className: "vkuiSubnavigationBar__scrollIn"
    }, _react.Children.map(children, function(child, idx) {
        return /*#__PURE__*/ _react.createElement("li", {
            key: idx,
            className: "vkuiSubnavigationBar__item"
        }, child);
    }))));
};

//# sourceMappingURL=SubnavigationBar.js.map